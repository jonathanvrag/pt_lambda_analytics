from django.urls import path
from .views import ProductsSearchView


urlpatterns = [
    path('search/', ProductsSearchView.as_view(), name='products-search'), 
]