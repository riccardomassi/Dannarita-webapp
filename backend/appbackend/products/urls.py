from django.urls import path
from .views import *

urlpatterns = [
  path('', ProductListAPIView.as_view(), name='product-list'),
  path('<int:pk>/', ProductRetrieveAPIView.as_view(), name='product-detail'),
  path('create/', ProductCreateAPIView.as_view(), name='product-create'),
  path('update/<int:pk>/', ProductUpdateAPIView.as_view(), name='product-update'),
  path('delete/<int:pk>/', ProductDestroyAPIView.as_view(), name='product-delete'),
  path('register/', UserRegisterAPIView.as_view(), name='user-register'),
  path('login/', UserLoginAPIView.as_view(), name='user-login'),
  path('logout/', UserLogoutAPIView.as_view(), name='user-logout'),
  path('user/', CustomUserAPIView.as_view(), name='user-detail'),
  path('cart/', CarrelloView.as_view(), name='cart'),
  path('cart/update/<int:prodotto_id>/', AggiornaCarrelloView.as_view(), name='cart-add'),
  path('cart/remove/<int:prodotto_id>/', RimuoviDalCarrelloView.as_view(), name='cart-remove'),
  path('cart/reservation/', PrenotaProdottiView.as_view(), name='cart-checkout'),
  path('reservation/products/', VisualizzaPrenotazioniView.as_view(), name='reservation-detail'),
]