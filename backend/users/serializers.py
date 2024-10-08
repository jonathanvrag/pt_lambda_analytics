from rest_framework import serializers
from .models import User
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'nombre', 'apellido', 'email', 'telefono', 'genero', 'rol', 'is_active']

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['nombre', 'apellido', 'email', 'telefono', 'genero', 'password', 'rol', 'is_active']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Ya existe un usuario con este correo electrónico.")
        return value

    def validate_password(self, value):
        try:
            validate_password(value)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value

    def create(self, validated_data):
        user = User(
            nombre=validated_data['nombre'],
            apellido=validated_data['apellido'],
            email=validated_data['email'],
            telefono=validated_data['telefono'],
            genero=validated_data['genero'],
            rol=validated_data.get('rol', 'user'),
            is_active=validated_data.get('is_active', True),
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email']

    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), 
        source='id',
        write_only=True,
        error_messages={'does_not_exist': 'Usuario no encontrado.'}
    )
    username = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)

    def update(self, instance, validated_data):
        """Actualiza el usuario con los datos validados."""
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance
