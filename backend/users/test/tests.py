from django.test import TestCase, Client

from .factories import UserFactory, fake
from ..models import User

class UserTest(TestCase):

    def setUp(self):
        self.client = Client()
        self.user = UserFactory.create()

    def test_model_user(self):
        self.assertIsInstance(self.user, User)
        self.assertTrue(self.user.nombre)

    def ramdon_user(self):
        user = {
            "nombre": fake.name(),
            "apellido": fake.last_name(),
            "password": fake.password(),
            "email": fake.email(),
            "telefono": fake.numerify(text='##########'),
            "genero": fake.random_element(elements=('femenino', 'masculino')),
            "is_staff": fake.boolean(),
            "is_active": True
        }
        return user

    def test_user_register(self):
        data = self.ramdon_user()
        response = self.client.post('/api/users/register/', data=data, content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_user_login(self):
        user = self.ramdon_user()
        self.client.post('/api/users/register/', data=user, content_type='application/json')
        login = {
            "email": user['email'],
            "password": user['password']
        }
        response = self.client.post('/api/users/login/', data=login, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.data, dict)