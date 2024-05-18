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
        fields = ['id', 'name', 'description', 'price', 'image']

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
    class Meta:
        model = PrenotazioneProdotto
        fields = ['prodotto', 'quantita']

"""
Create a serializer class for the Prenotazione model
This class will be used to serialize and deserialize Prenotazione objects
"""
class PrenotazioneSerializer(serializers.ModelSerializer):
    prodotti = PrenotazioneProdottoSerializer(many=True, read_only=True)

    class Meta:
        model = Prenotazione
        fields = ['id_prenotazione', 'utente', 'data_prenotazione', 'prodotti']
        read_only_fields = ['id_prenotazione', 'utente', 'data_prenotazione', 'prodotti']

    def create(self, clean_data):
        prodotti = clean_data.pop('prodotti')
        prenotazione = Prenotazione.objects.create(**clean_data)
        for prodotto in prodotti:
            PrenotazioneProdotto.objects.create(prenotazione=prenotazione, **prodotto)
        return prenotazione

    


