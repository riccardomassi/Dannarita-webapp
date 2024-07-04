from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

"""
Represents a product in the system.

Attributes:
  id (AutoField): The primary key for the product.
  name (CharField): The name of the product.
  description (TextField): The description of the product.
  price (DecimalField): The price of the product.
  image (ImageField): The image of the product.
"""
class Product(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=100)
  description = models.TextField()
  price = models.DecimalField(max_digits=10, decimal_places=2)
  brand = models.CharField(max_length=100, null=True, blank=True)
  image = models.ImageField(upload_to='static/', null=True, blank=True)

  def __str__(self):
    return self.name 

"""
Custom user manager for the CustomUser model.

This manager provides methods to create regular users and superusers.

Methods:
  create_user(username, password=None): Creates a regular user with the given username and password.
  create_superuser(username, password=None): Creates a superuser with the given username and password.
"""
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

"""
Represents a custom user in the system.

Attributes:
  user_id (AutoField): The primary key for the user.
  username (CharField): The username of the user.
  is_superuser (BooleanField): Indicates if the user is a superuser.
  is_staff (BooleanField): Indicates if the user is a staff member.
"""
class CustomUser(AbstractBaseUser, PermissionsMixin):
  user_id = models.AutoField(primary_key=True)
  username = models.CharField(max_length=150, unique=True)
  is_superuser = models.BooleanField(default=False)
  is_staff = models.BooleanField(default=False)

  USERNAME_FIELD = 'username'

  objects = CustomUserManager()

  def __str__(self):
      return self.username

"""
Represents a shopping cart in the system.

Attributes:
  utente (OneToOneField): The user associated with the shopping cart.
  prodotti (ManyToManyField): The products added to the shopping cart.
"""
class Carrello(models.Model):
  utente = models.OneToOneField('CustomUser', on_delete=models.CASCADE)
  prodotti = models.ManyToManyField('Product', through='CarrelloProdotto')

  def __str__(self):
    return f"Carrello di {self.utente.username}"
  
  class Meta:
    verbose_name_plural = 'Carrelli'

"""
Represents a product in a shopping cart.

Attributes:
  carrello (ForeignKey): The shopping cart the product belongs to.
  prodotto (ForeignKey): The product in the shopping cart.
  quantita (PositiveIntegerField): The quantity of the product in the shopping cart.
"""
class CarrelloProdotto(models.Model):
  carrello = models.ForeignKey('Carrello', on_delete=models.CASCADE)
  prodotto = models.ForeignKey('Product', on_delete=models.CASCADE)
  quantita = models.PositiveIntegerField(default=1)

  class Meta:
    unique_together = ('carrello', 'prodotto')
    verbose_name_plural = 'Prodotti Carrello'

"""
Represents a reservation in the system.

Attributes:
  id_prenotazione (AutoField): The primary key for the reservation.
  utente (ForeignKey): The user who made the reservation.
  data_prenotazione (DateTimeField): The date and time when the reservation was made.
  prodotti (ManyToManyField): The products included in the reservation.
"""
class Prenotazione(models.Model):
  id_prenotazione = models.AutoField(primary_key=True)
  utente = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  data_prenotazione = models.DateTimeField(auto_now_add=True)
  prodotti = models.ManyToManyField(Product, through='PrenotazioneProdotto')

  def __str__(self):
    return f"Prenotazione {self.id_prenotazione} di {self.utente.username}"
  
  class Meta:
    verbose_name_plural = 'Prenotazioni'

"""
Represents a product in a reservation.

Attributes:
  prenotazione (ForeignKey): The reservation the product belongs to.
  prodotto (ForeignKey): The product in the reservation.
  quantita (PositiveIntegerField): The quantity of the product in the reservation.
"""
class PrenotazioneProdotto(models.Model):
  prenotazione = models.ForeignKey(Prenotazione, on_delete=models.CASCADE)
  prodotto = models.ForeignKey(Product, on_delete=models.CASCADE)
  quantita = models.PositiveIntegerField(default=1)

  class Meta:
    unique_together = ('prenotazione', 'prodotto')
    verbose_name_plural = "Prodotti Prenotazione"



  
  
    


