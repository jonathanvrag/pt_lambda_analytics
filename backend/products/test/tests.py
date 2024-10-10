from django.test import TestCase, Client

from .factories import productsFactory, fake
from ..models import Articulo


class ProductTest(TestCase):

    def setUp(self):
        self.client = Client()
        self.product = productsFactory.create()

    def test_model_product(self):
        self.assertIsInstance(self.product, Articulo)
        self.assertTrue(self.product.nombre)

    def test_get_product(self):
        response = self.client.get('/api/products/search/?query=television')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.data, list)

    def test_bad_get_product(self):
        response = self.client.get('/api/products/search/')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['error'], 'Please provide a search term using the "query" parameter.')