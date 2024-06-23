from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import CustomUser, Product, Prenotazione, PrenotazioneProdotto
from .serializers import UserRegisterSerializer

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
    # Di default il database contiene 10 prodotti creati con il comando create_random_products(10)
    # I due prodotti creati in setUp() sono i prodotti 11 e 12
    self.assertEqual(len(response.data), 12)
    self.assertEqual(response.data[10]['name'], 'Product 1')
    self.assertEqual(response.data[11]['name'], 'Product 2')

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
    self.product1 = Product.objects.create(name='Product 1', description='Description 1', price=10.00)
    self.product2 = Product.objects.create(name='Product 2', description='Description 2', price=20.00)

    # Creare delle prenotazioni per l'utente
    self.prenotazione1 = Prenotazione.objects.create(utente=self.user)
    PrenotazioneProdotto.objects.create(prenotazione=self.prenotazione1, prodotto=self.product1, quantita=1)
    PrenotazioneProdotto.objects.create(prenotazione=self.prenotazione1, prodotto=self.product2, quantita=2)

    # Creare una prenotazione per un altro utente
    self.prenotazione2 = Prenotazione.objects.create(utente=self.other_user)
    PrenotazioneProdotto.objects.create(prenotazione=self.prenotazione2, prodotto=self.product1, quantita=3)

  def test_get_prenotazioni(self):
    response = self.client.get(self.url, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(len(response.data), 1)
    
    # Verificare i dettagli della prenotazione
    prenotazione = response.data[0]
    self.assertEqual(prenotazione['utente'], self.user.user_id)
    
    # Verificare i prodotti nella prenotazione
    prodotti = prenotazione['prodotti']
    self.assertEqual(len(prodotti), 2)
    
    product_ids = [p['prodotto']['id'] for p in prodotti]
    self.assertIn(self.product1.id, product_ids)
    self.assertIn(self.product2.id, product_ids)

    # Verificare le quantità dei prodotti
    for p in prodotti:
      if p['prodotto']['id'] == self.product1.id:
        self.assertEqual(p['quantita'], 1)
      elif p['prodotto']['id'] == self.product2.id:
        self.assertEqual(p['quantita'], 2)

  def test_superuser_get_all_prenotazioni(self):
    self.user.is_superuser = True
    self.user.save()
    response = self.client.get(self.url, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(len(response.data), 2)

    # Verificare i dettagli della prima prenotazione
    prenotazione1 = response.data[0]
    self.assertEqual(prenotazione1['utente'], self.user.user_id)
    prodotti1 = prenotazione1['prodotti']
    self.assertEqual(len(prodotti1), 2)
    
    product_ids1 = [p['prodotto']['id'] for p in prodotti1]
    self.assertIn(self.product1.id, product_ids1)
    self.assertIn(self.product2.id, product_ids1)

    for p in prodotti1:
      if p['prodotto']['id'] == self.product1.id:
        self.assertEqual(p['quantita'], 1)
      elif p['prodotto']['id'] == self.product2.id:
        self.assertEqual(p['quantita'], 2)

    # Verificare i dettagli della seconda prenotazione
    prenotazione2 = response.data[1]
    self.assertEqual(prenotazione2['utente'], self.other_user.user_id)
    prodotti2 = prenotazione2['prodotti']
    self.assertEqual(len(prodotti2), 1)

    product_ids2 = [p['prodotto']['id'] for p in prodotti2]
    self.assertIn(self.product1.id, product_ids2)

    for p in prodotti2:
      if p['prodotto']['id'] == self.product1.id:
        self.assertEqual(p['quantita'], 3)

  def test_unauthenticated_user(self):
    self.client.force_authenticate(user=None)
    response = self.client.get(self.url, format='json')
    self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
