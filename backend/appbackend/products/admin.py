from django.contrib import admin
from .models import Product, CustomUser, Carrello, CarrelloProdotto, Prenotazione

admin.site.register(Product)
admin.site.register(CustomUser)
admin.site.register(Carrello)
admin.site.register(CarrelloProdotto)
admin.site.register(Prenotazione)
