from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class Product(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=100)
  description = models.TextField()
  price = models.DecimalField(max_digits=10, decimal_places=2)
  image = models.ImageField(upload_to='static/', null=True, blank=True)

  def __str__(self):
    return self.name

class CustomUserManager(BaseUserManager):
  def create_user(self, username, password=None):
    if not username:
      raise ValueError('The Username field must be set')
    if not password:
      raise ValueError('The Password field must be set')
    user = self.model(username=username)
    user.set_password(password)
    user.save()
    return user
  
  def create_superuser(self, username, password=None):
    user = self.create_user(username, password)
    user.is_superuser = True
    user.is_staff = True
    user.save()
    return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
  user_id = models.AutoField(primary_key=True)
  username = models.CharField(max_length=150, unique=True)
  is_superuser = models.BooleanField(default=False)
  is_staff = models.BooleanField(default=False)

  USERNAME_FIELD = 'username'
  REQUIRED_FIELDS = ['']

  objects = CustomUserManager()

  def __str__(self):
      return self.username
  
class Carrello(models.Model):
  utente = models.OneToOneField('CustomUser', on_delete=models.CASCADE)
  prodotti = models.ManyToManyField('Product', through='CarrelloProdotto')

  def __str__(self):
    return f"Carrello di {self.utente.username}"

class CarrelloProdotto(models.Model):
  carrello = models.ForeignKey('Carrello', on_delete=models.CASCADE)
  prodotto = models.ForeignKey('Product', on_delete=models.CASCADE)
  quantita = models.PositiveIntegerField(default=1)

  class Meta:
    unique_together = ('carrello', 'prodotto')

class Prenotazione(models.Model):
  id_prenotazione = models.AutoField(primary_key=True)
  utente = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  data_prenotazione = models.DateTimeField(auto_now_add=True)
  prodotti = models.ManyToManyField(Product, through='PrenotazioneProdotto')

  def __str__(self):
    return f"Prenotazione {self.id_prenotazione} di {self.utente.username}"

class PrenotazioneProdotto(models.Model):
  prenotazione = models.ForeignKey(Prenotazione, on_delete=models.CASCADE)
  prodotto = models.ForeignKey(Product, on_delete=models.CASCADE)
  quantita = models.PositiveIntegerField(default=1)

  class Meta:
    unique_together = ('prenotazione', 'prodotto')


  
  
    


