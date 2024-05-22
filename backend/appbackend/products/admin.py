from django.contrib import admin
from .models import Product, CustomUser, Carrello, CarrelloProdotto, Prenotazione, PrenotazioneProdotto

admin.site.register(Product)
admin.site.register(CustomUser)
admin.site.register(Carrello)
admin.site.register(CarrelloProdotto)
admin.site.register(Prenotazione)
admin.site.register(PrenotazioneProdotto)
