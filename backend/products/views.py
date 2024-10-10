from rest_framework.views import APIView
from rest_framework.response import Response
from products.services import get_products, filtroArticulos

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