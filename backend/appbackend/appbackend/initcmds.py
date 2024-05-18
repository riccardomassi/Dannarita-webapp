import random
from faker import Faker
from products.models import Product, CustomUser
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile

fake = Faker()

def delete_all_products():
  Product.objects.all().delete()

def create_random_products(num_products=10):
  for _ in range(num_products):
    name = fake.company()
    description = fake.text()
    price = round(random.uniform(10, 1000), 2)
    image_path = "static/phon.jpg"
    Product.objects.create(name=name, description=description, price=price, image=image_path)

def create_superuser():
  CustomUser.objects.create_superuser('ricky', 'massi')
 

