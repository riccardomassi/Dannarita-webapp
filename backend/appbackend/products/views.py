from rest_framework import generics, permissions
from .validations import custom_validation
from .models import Product, Carrello, CarrelloProdotto, Prenotazione, PrenotazioneProdotto
from .serializers import ProductSerializer, CustomUserSerializer, CarrelloSerializer, PrenotazioneSerializer, UserLoginSerializer, UserRegisterSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from django.shortcuts import get_object_or_404
from django.contrib.auth import login, logout
from .permissions import IsSuperUser
from rest_framework.exceptions import NotFound
from django.core.mail import send_mail
from django.template.loader import render_to_string
from appbackend import settings

"""
API view for registering a new user.
"""
class UserRegisterAPIView(APIView):
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		if custom_validation(request.data):
			clean_data = request.data
			serializer = UserRegisterSerializer(data=clean_data)
			if serializer.is_valid(raise_exception=True):
				user = serializer.create(clean_data)
				if user:
					return Response(serializer.data, status=status.HTTP_201_CREATED)
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		return Response({'error': 'username già esistente'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

"""
API view for logging in a user.
"""
class UserLoginAPIView(APIView):
	permission_classes = [permissions.AllowAny]
	authentication_classes = [SessionAuthentication]

	def post(self, request):
		serializer = UserLoginSerializer(data=request.data)
		try:
			if serializer.is_valid(raise_exception=True):
				user = serializer.check_user(request.data)
				login(request, user)
				return Response(serializer.data, status=status.HTTP_200_OK)
		except Exception as e:
			return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

"""
API view for logging out a user.
"""
class UserLogoutAPIView(APIView):
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)
	
"""
API view for retrieving the authenticated user.
"""
class CustomUserAPIView(APIView):
	permission_classes = [permissions.IsAuthenticated]
	authentication_classes = [SessionAuthentication]

	def get(self, request):
		serializer = CustomUserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)

"""
API view for retrieving a list of products.
"""
class ProductListAPIView(generics.ListAPIView):
	permission_classes = [permissions.AllowAny]
	queryset = Product.objects.all()
	serializer_class = ProductSerializer

	def list(self, request, *args, **kwargs):
		queryset = self.get_queryset()
		serializer = self.get_serializer(queryset, many=True)
		return Response(serializer.data)

"""
API view for retrieving a single product.
"""
class ProductRetrieveAPIView(generics.RetrieveAPIView):
	permission_classes = [permissions.AllowAny]
	queryset = Product.objects.all()
	serializer_class = ProductSerializer

	def retrieve(self, request, *args, **kwargs):
		instance = self.get_object()
		serializer = self.get_serializer(instance)
		return Response(serializer.data)

"""
API view for retrieving the cart of the authenticated user.
"""
class CarrelloView(generics.RetrieveAPIView):
	serializer_class = CarrelloSerializer
	permission_classes = [permissions.IsAuthenticated]
	authentication_classes = [SessionAuthentication]

	def get_object(self):
		carrello, created = Carrello.objects.get_or_create(utente=self.request.user)
		return carrello

"""
API view for updating the cart of the authenticated user.
"""
class AggiornaCarrelloView(generics.UpdateAPIView):
	serializer_class = CarrelloSerializer
	permission_classes = [permissions.IsAuthenticated]
	authentication_classes = [SessionAuthentication]

	def put(self, request, prodotto_id):
		prodotto = get_object_or_404(Product, id=prodotto_id)
		carrello, createdCarrello = Carrello.objects.get_or_create(utente=request.user)
		carrello_prodotto, createdProdotto = CarrelloProdotto.objects.get_or_create(carrello=carrello, prodotto=prodotto)

		# Controllo se il prodotto è stato creato
		# Se il prodotto è stato creato, controllo se il carrello contiene già 5 prodotti
		# Se il carrello contiene già 5 prodotti, sollevo un'eccezione
		if createdProdotto:
			if carrello.prodotti.count() > 5:
				carrello_prodotto.delete()
				return Response({'error': 'Il carrello non può contenere più di 5 prodotti unici'}, status=status.HTTP_400_BAD_REQUEST)
			
		# Controllo se il prodotto è già presente nel carrello
		# Se il prodotto è già presente, controllo se la quantità è maggiore di 3
		# Se la quantità è maggiore di 3, sollevo un'eccezione
		# Altrimenti, incremento la quantità del prodotto nel carrello
		if not createdProdotto:
			if carrello_prodotto.quantita >= 3:
				return Response({'error': 'Non puoi aggiungere più di 3 unità di un prodotto'}, status=status.HTTP_400_BAD_REQUEST)
			carrello_prodotto.quantita += 1
			carrello_prodotto.save()

		serializer = CarrelloSerializer(carrello)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def delete(self, request, prodotto_id):
		carrello = get_object_or_404(Carrello, utente=request.user)
		prodotto = get_object_or_404(Product, id=prodotto_id)
		carrello_prodotto = get_object_or_404(CarrelloProdotto, carrello=carrello, prodotto=prodotto)

		if carrello_prodotto.quantita > 1:
			carrello_prodotto.quantita -= 1
			carrello_prodotto.save()
		else:
			carrello_prodotto.delete()

		serializer = CarrelloSerializer(carrello)
		return Response(serializer.data, status=status.HTTP_200_OK)

"""
API view for removing a product from the cart of the authenticated user.
"""
class RimuoviDalCarrelloView(generics.DestroyAPIView):
	serializer_class = CarrelloSerializer
	permission_classes = [permissions.IsAuthenticated]
	authentication_classes = [SessionAuthentication]

	def delete(self, request, prodotto_id):
		carrello = get_object_or_404(Carrello, utente=request.user)
		prodotto = get_object_or_404(Product, id=prodotto_id)
		carrello_prodotto = get_object_or_404(CarrelloProdotto, carrello=carrello, prodotto=prodotto)

		carrello_prodotto.delete()
		return Response(status=status.HTTP_200_OK)

"""
Function to send an email to the user with the reservation details.
"""
def prenotazione_effettuata_email(user, prenotazione_prodotti):
	subject = 'Dettagli della tua prenotazione'
	message = render_to_string('prenotazione_effetuata.html', {
		'user': user,
		'prenotazione_prodotti': prenotazione_prodotti,
	})
	send_mail(subject, '', settings.EMAIL_HOST_USER, [user.email], html_message=message)

"""
API view for creating a new reservation.
"""
class PrenotaProdottiView(generics.CreateAPIView):
	serializer_class = PrenotazioneSerializer
	permission_classes = [permissions.IsAuthenticated]
	authentication_classes = [SessionAuthentication]

	def post(self, request, *args, **kwargs):
		carrello = get_object_or_404(Carrello, utente=request.user)
		prodotti_data = []

		# Quando stai creando o aggiornando un'istanza di un modello, 
		# DRF si aspetta che i campi di chiave esterna (FK) siano rappresentati 
		# dai loro valori di chiave primaria (ID) nei dati di input.
		
		# Estrai i dati dei prodotti dal carrello
		for carrello_prodotto in carrello.carrelloprodotto_set.all():
			prodotto_data = {
				'prodotto': carrello_prodotto.prodotto.id,
				'quantita': carrello_prodotto.quantita
			}
			prodotti_data.append(prodotto_data)

		# Crea un dizionario con i dati necessari per la creazione della prenotazione
		prenotazione_data = {
			'utente': request.user.user_id,
			'prodotti': prodotti_data
		}

		# Crea un'istanza del serializer con i dati estratti e il contesto della richiesta
		serializer = PrenotazioneSerializer(data=prenotazione_data)

		# Effettua la validazione dei dati
		if serializer.is_valid(raise_exception=True):
			# Salva la prenotazione e i prodotti associati
			prenotazione = serializer.create(prenotazione_data)
			if prenotazione:
				# Pulisci il carrello dopo la creazione della prenotazione
				carrello.prodotti.clear()

				# Retrieve all PrenotazioneProdotto associated with the prenotazione
				prenotazione_prodotti = PrenotazioneProdotto.objects.filter(prenotazione=prenotazione)

				# Invia un'email all'utente con i dettagli della prenotazione
				prenotazione_effettuata_email(request.user, prenotazione_prodotti)

				# Restituisci la risposta con i dati della prenotazione creata
				return Response(serializer.data, status=status.HTTP_201_CREATED)
			else:
				# Se la validazione fallisce, restituisci gli errori di validazione
				return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""
API view for retrieving the reservations of the authenticated user.
"""
class VisualizzaPrenotazioniView(generics.ListAPIView):
	serializer_class = PrenotazioneSerializer
	permission_classes = [permissions.IsAuthenticated]
	authentication_classes = [SessionAuthentication]

	def get_queryset(self):
		user = self.request.user
		if user.is_superuser:
			return Prenotazione.objects.all()
		else:
			return Prenotazione.objects.filter(utente=user)

"""
Function to send an email to the user saying that he took is reservation.
"""
def prenotazione_ritirata_email(user, prenotazione_prodotti):
	subject = 'Dettagli della tua prenotazione'
	message = render_to_string('prenotazione_ritirata.html', {
		'user': user,
		'prenotazione_prodotti': prenotazione_prodotti,
	})
	send_mail(subject, '', settings.EMAIL_HOST_USER, [user.email], html_message=message)

"""
API view for deleting a reservation.
"""
class EliminaPrenotazioneView(generics.DestroyAPIView):
	queryset = Prenotazione.objects.all()
	serializer_class = PrenotazioneSerializer

	def delete(self, request, *args, **kwargs):
		pk = self.kwargs.get('pk')
		try:
			prenotazione = self.get_object(pk)

			# Retrieve all PrenotazioneProdotto associated with the prenotazione
			prenotazione_prodotti = PrenotazioneProdotto.objects.filter(prenotazione=prenotazione)

			# Ottenere l'utente associato alla prenotazione
			utente_associato = prenotazione.utente

			print(utente_associato)

			# Invia un'email all'utente dicendo che la prenotazione è stata ritirata
			prenotazione_ritirata_email(utente_associato, prenotazione_prodotti)

			# Elimina la prenotazione
			prenotazione.delete()

			return Response(status=status.HTTP_204_NO_CONTENT)
		except Prenotazione.DoesNotExist:
			raise NotFound(detail="Prenotazione non trovata")

	def get_object(self, pk):
		try:
			return self.queryset.get(pk=pk)
		except Prenotazione.DoesNotExist:
			raise NotFound(detail="Prenotazione non trovata")


"""
ADMIN VIEWS START HERE
"""

"""
API view for creating a new product.
Only accessible to admin users.
"""
class ProductCreateAPIView(generics.CreateAPIView):
	queryset = Product.objects.all()
	serializer_class = ProductSerializer
	parser_classes = (MultiPartParser, FormParser) # Per consentire l'upload di file
	permission_classes = [permissions.IsAuthenticated, IsSuperUser]
	authentication_classes = [SessionAuthentication]

	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		if serializer.is_valid():
			self.perform_create(serializer)
			headers = self.get_success_headers(serializer.data)
			return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
		else:
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""
API view for updating an existing product.
Only accessible to admin users.
"""
class ProductUpdateAPIView(generics.UpdateAPIView):
	queryset = Product.objects.all()
	serializer_class = ProductSerializer
	parser_classes = (MultiPartParser, FormParser) # Per consentire l'upload di file
	permission_classes = [permissions.IsAuthenticated, IsSuperUser]
	authentication_classes = [SessionAuthentication]

	def update(self, request, *args, **kwargs):
		partial = kwargs.pop('partial', False)
		instance = self.get_object()
		serializer = self.get_serializer(instance, data=request.data, partial=partial)
		if serializer.is_valid():
			self.perform_update(serializer)
			return Response(serializer.data, status=status.HTTP_200_OK)
		else:
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""
API view for deleting an existing product.
Only accessible to admin users.
"""
class ProductDeleteAPIView(generics.DestroyAPIView):
	queryset = Product.objects.all()
	serializer_class = ProductSerializer
	permission_classes = [permissions.IsAdminUser]
	permission_classes = [permissions.IsAuthenticated, IsSuperUser]
	authentication_classes = [SessionAuthentication]

	def destroy(self, request, *args, **kwargs):
		instance = self.get_object()
		self.perform_destroy(instance)
		return Response(status=status.HTTP_204_NO_CONTENT) 
	
