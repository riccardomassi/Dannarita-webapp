import random
from faker import Faker
from products.models import Product, CustomUser

fake = Faker()

"""
Create a function to delete all products
"""
def delete_all_products():
  Product.objects.all().delete()

"""
Create a function to create random products
"""
def create_random_products(num_products=10):
  for _ in range(num_products):
    name = fake.company()
    description = fake.text()
    price = round(random.uniform(10, 1000), 2)
    image_path = "static/phon.jpg"
    Product.objects.create(name=name, description=description, price=price, image=image_path)
 

