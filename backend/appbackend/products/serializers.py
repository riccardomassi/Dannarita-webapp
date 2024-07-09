from rest_framework import serializers
from .models import Product, CustomUser, Carrello, CarrelloProdotto, PrenotazioneProdotto, Prenotazione
from django.contrib.auth import authenticate
from rest_framework.exceptions import ValidationError

"""
Create a serializer class for the Product model
This class will be used to serialize and deserialize Product objects
"""
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'brand', 'price', 'image']

    def create(self, clean_data):
        product = Product.objects.create(**clean_data)
        product.save()
        return product
    
    def update(self, instance, clean_data):
        instance.name = clean_data.get('name', instance.name)
        instance.description = clean_data.get('description', instance.description)
        instance.price = clean_data.get('price', instance.price)
        instance.brand = clean_data.get('brand', instance.brand)
        image = clean_data.pop('image', None)
        if image:
            instance.image = image
        instance.save()
        return instance

"""
Create a serializer class for the CustomUser registration
"""
class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

    def create(self, clean_data):
        user = CustomUser.objects.create_user(username=clean_data['username'], password=clean_data['password'])
        user.save()
        return user
    
"""
Create a serializer class for the CustomUser login
"""
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(username=clean_data['username'], password=clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user
            
"""
Create a serializer class for the CustomUser model
"""
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'is_superuser', 'is_staff']

"""
Create a serializer class for the CarrelloProdotto model
This class will be used to serialize and deserialize CarrelloProdotto objects
"""
class CarrelloProdottoSerializer(serializers.ModelSerializer):
    prodotto = ProductSerializer()

    class Meta:
        model = CarrelloProdotto
        fields = ['prodotto', 'quantita']

"""
Create a serializer class for the Carrello model
This class will be used to serialize and deserialize Carrello objects
"""
class CarrelloSerializer(serializers.ModelSerializer):
    prodotti = CarrelloProdottoSerializer(source='carrelloprodotto_set', many=True)

    class Meta:
        model = Carrello
        fields = ['id', 'utente', 'prodotti']

"""
Create a serializer class for the PrenotazioneProdotto model
This class will be used to serialize and deserialize PrenotazioneProdotto objects
"""
class PrenotazioneProdottoSerializer(serializers.ModelSerializer):
    prodotto = ProductSerializer()

    class Meta:
        model = PrenotazioneProdotto
        fields = ['prodotto', 'quantita']

"""
Create a serializer class for the Prenotazione model
This class will be used to serialize and deserialize Prenotazione objects
"""
class PrenotazioneSerializer(serializers.ModelSerializer):
    prodotti = PrenotazioneProdottoSerializer(source='prenotazioneprodotto_set', many=True, read_only=True)
    utente_nome = serializers.SerializerMethodField()

    class Meta:
        model = Prenotazione
        fields = ['id_prenotazione', 'utente', 'utente_nome', 'data_prenotazione', 'prodotti']

    def get_utente_nome(self, obj):
        # Distinzione per le view PrenotaProdottiView e VisualizzaPrenotazioniView
        # Passano due obj differenti
        if isinstance(obj, dict):
            return obj['utente'].username
        return obj.utente.username if obj.utente else None

    def create(self, clean_data):
        utente_id = clean_data.pop('utente')
        utente = CustomUser.objects.get(pk=utente_id)
        prodotti_data = clean_data.pop('prodotti')

        # Controllo che la prenotazione contenga almeno un prodotto
        if not prodotti_data:
            raise ValidationError('Una prenotazione deve contenere almeno un prodotto.')
        
        # Controllo che l'utente non abbia già effettuato 3 prenotazioni
        if utente.prenotazione_set.count() >= 3:
            raise ValidationError('Non puoi effettuare più di 3 prenotazioni.')
        
        prenotazione = Prenotazione.objects.create(utente=utente,**clean_data)
        for prodotto_data in prodotti_data:
            prodotto = Product.objects.get(pk=prodotto_data['prodotto'])
            PrenotazioneProdotto.objects.create(prenotazione=prenotazione, prodotto=prodotto, quantita=prodotto_data['quantita'])
        return prenotazione
