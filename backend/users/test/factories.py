import factory
from faker import Faker

from ..models import User


fake = Faker('es_CO')

class UserFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = User

    nombre = fake.name()
    apellido = fake.last_name()
    email = fake.email()
    password = fake.password()
    is_staff = False
    is_active = True