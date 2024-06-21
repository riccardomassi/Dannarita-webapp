from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import CustomUser, Product, Carrello, CarrelloProdotto, Prenotazione
from .serializers import UserRegisterSerializer, PrenotazioneSerializer

"""
Testing Functions
"""
class UserRegisterSerializerTest(TestCase):
  def setUp(self):
    self.user_data = {
        'username': 'testuser',
        'password': 'testpassword'
    }

  def test_create_user(self):
    serializer = UserRegisterSerializer(data=self.user_data)
    self.assertTrue(serializer.is_valid())
    user = serializer.save()
    self.assertEqual(user.username, self.user_data['username'])
    self.assertTrue(user.check_password(self.user_data['password']))


"""
Testing Views
"""
class UserRegisterAPIViewTest(TestCase):
  def setUp(self):
    self.client = APIClient()
    self.url = reverse('user-register')

  def test_register_user(self):
    data = {
        'username': 'newuser',
        'password': 'newpassword',
    }
    response = self.client.post(self.url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(CustomUser.objects.count(), 1)
    self.assertEqual(CustomUser.objects.get().username, 'newuser')

class UserLoginAPIViewTest(TestCase):
  def setUp(self):
    self.client = APIClient()
    self.user = CustomUser.objects.create_user(username='testuser', password='testpassword')
    self.url = reverse('user-login')

  def test_login_user(self):
    data = {
        'username': 'testuser',
        'password': 'testpassword'
    }
    response = self.client.post(self.url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

class ProductListAPIViewTest(TestCase):
  def setUp(self):
    self.client = APIClient()
    self.url = reverse('product-list')
    Product.objects.create(name='Product 1', description='Description 1', price=10.00)
    Product.objects.create(name='Product 2', description='Description 2', price=20.00)

  def test_get_product_list(self):
    response = self.client.get(self.url, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(len(response.data), 2)
    self.assertEqual(response.data[0]['name'], 'Product 1')
    self.assertEqual(response.data[1]['name'], 'Product 2')

class CarrelloViewTest(TestCase):
  def setUp(self):
    self.client = APIClient()
    self.user = CustomUser.objects.create_user(username='testuser', password='testpassword')
    self.client.force_authenticate(user=self.user)
    self.url = reverse('cart')

  def test_get_carrello(self):
    response = self.client.get(self.url, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data['utente'], self.user.user_id)

class VisualizzaPrenotazioniViewTest(TestCase):
  def setUp(self):
    self.client = APIClient()
    self.user = CustomUser.objects.create_user(username='testuser', password='testpassword')
    self.other_user = CustomUser.objects.create_user(username='otheruser', password='otherpassword')
    self.client.force_authenticate(user=self.user)
    self.url = reverse('reservation-detail')

    # Creare dei prodotti
    product1 = Product.objects.create(name='Product 1', description='Description 1', price=10.00)
    product2 = Product.objects.create(name='Product 2', description='Description 2', price=20.00)

    # Creare un carrello per l'utente
    carrello = Carrello.objects.create(utente=self.user)
    CarrelloProdotto.objects.create(carrello=carrello, prodotto=product1, quantita=1)
    CarrelloProdotto.objects.create(carrello=carrello, prodotto=product2, quantita=2)

    # Creare delle prenotazioni per l'utente
    self.prenotazione1 = Prenotazione.objects.create(utente=self.user)
    self.prenotazione1.prodotti.set([product1, product2])

    # Creare una prenotazione per un altro utente
    self.prenotazione2 = Prenotazione.objects.create(utente=self.other_user)
    self.prenotazione2.prodotti.set([product1])

  def test_get_prenotazioni(self):
    response = self.client.get(self.url, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(len(response.data), 1)
    self.assertEqual(response.data[0]['utente'], self.user.user_id)

  def test_superuser_get_all_prenotazioni(self):
    self.user.is_superuser = True
    self.user.save()
    response = self.client.get(self.url, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(len(response.data), 2)

  def test_unauthenticated_user(self):
    self.client.force_authenticate(user=None)
    response = self.client.get(self.url, format='json')
    self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)






