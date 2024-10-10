import factory
from faker import Faker
from decimal import Decimal

from ..models import Articulo

fake = Faker('es_CO')

class productsFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = Articulo

    usuario = fake.random_int()
    nombre = fake.word()
    imagen = fake.image_url()
    precio_venta = round(Decimal(fake.pydecimal(left_digits=8, right_digits=2, positive=True)), 2)
    url_mercadolibre = fake.url()