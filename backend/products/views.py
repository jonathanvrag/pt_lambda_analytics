from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from products.services import get_products, filtroArticulos
from products.serializers import ArticuloSerializer, CreateArticuloSerializer
from products.models import Articulo

class ProductsSearchView(APIView):
    def get(self, request):
        search_term = request.query_params.get('query')
        if not search_term:
            return Response({'error': 'Please provide a search term using the "query" parameter.'}, status=400)

        get_products(search_term)
        response = get_products(search_term)

        return Response(response)

class ProductsMetricsView(APIView):
    def post(self, request):
        articulos = request.data.get('articulos')
        if not articulos:
            return Response({'error': 'Por favor, proporciona una lista de articulos'}, status=400)
        
        metricas = filtroArticulos(articulos)
        return Response(metricas)

class WishlistView(APIView):
    def post(self, request):
        serializer = CreateArticuloSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, user_id):
        articulos = Articulo.objects.filter(usuario=user_id)
        serializer = ArticuloSerializer(articulos, many=True)
        return Response(serializer.data)
    
    def delete(self, request, id):
        try:
            articulo = Articulo.objects.get(pk=id)
        except Articulo.DoesNotExist:
            return Response({'error': 'El artículo no existe.'}, status=status.HTTP_404_NOT_FOUND)

        articulo.delete()
        return Response({'message': 'Artículo eliminado de la lista de deseos.'}, status=status.HTTP_204_NO_CONTENT)