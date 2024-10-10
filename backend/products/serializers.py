from rest_framework import serializers
from .models import Articulo

class ArticuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articulo
        fields = ['usuario', 'nombre', 'imagen', 'precio_venta', 'url_mercadolibre']

class CreateArticuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articulo
        fields = ['usuario', 'nombre', 'imagen', 'precio_venta', 'url_mercadolibre']
        extra_kwargs = {
            'usuario': {'required': True},
        }