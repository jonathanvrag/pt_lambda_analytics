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
            rol=validated_data.get('rol', 'usuario'),
            is_active=validated_data.get('is_active', True),
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'nombre', 'apellido', 'telefono', 'genero', 'rol', 'is_active', 'user_id']

    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), 
        source='id',
        write_only=True,
        error_messages={'does_not_exist': 'Usuario no encontrado.'}
    )

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.apellido = validated_data.get('apellido', instance.apellido)
        instance.telefono = validated_data.get('telefono', instance.telefono)
        instance.genero = validated_data.get('genero', instance.genero)
        instance.rol = validated_data.get('rol', instance.rol)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()
        return instance
