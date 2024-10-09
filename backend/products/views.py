from rest_framework.views import APIView
from rest_framework.response import Response
from products.services import get_products

class ProductsSearchView(APIView):
    def get(self, request):
        search_term = request.query_params.get('query')
        if not search_term:
            return Response({'error': 'Please provide a search term using the "query" parameter.'}, status=400)

        get_products(search_term)
        response = get_products(search_term)

        
        return Response(response)
