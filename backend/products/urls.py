from django.urls import path
from .views import ProductsSearchView, ProductsMetricsView

urlpatterns = [
    path('search/', ProductsSearchView.as_view(), name='products-search'), 
    path('metrics/', ProductsMetricsView.as_view(), name='products-metrics'),
]