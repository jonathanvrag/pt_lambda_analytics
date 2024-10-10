from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserCreateSerializer, UpdateUserSerializer, CustomTokenObtainPairSerializer
from rest_framework.permissions import BasePermission
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class IsOtherSuperUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_staff)

class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

    def perform_update(self, serializer):
        user = self.get_object()
        if user.rol == 'admin' and self.request.user.rol == 'admin':
            raise serializers.ValidationError('Un administrador no puede editarse a sí mismo.')
        serializer.save()

    def perform_destroy(self, instance):
        if instance.rol == 'admin' and self.request.user.rol == 'admin':
            raise serializers.ValidationError('Un administrador no puede desactivarse a sí mismo.')
        instance.estado = False
        instance.save()

class UpdateUserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        try:
            body_user_id = request.data.get('id')
            if not body_user_id:
                return Response({'error': 'Se requiere el ID del usuario.'}, status=status.HTTP_400_BAD_REQUEST)

            body_user = User.objects.get(id=body_user_id)
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        except KeyError:
            return Response({'error': 'Cuerpo de la solicitud inválido.'}, status=status.HTTP_400_BAD_REQUEST)

        if request.user == body_user:
            return Response({'error': 'No puedes actualizar los datos de tu propio usuario.'}, status=status.HTTP_403_FORBIDDEN)
        
        # import pdb; pdb.set_trace()
        usuario = UpdateUserSerializer(body_user, data=request.data, partial=True)
        if usuario.is_valid():
            usuario.save()
            return Response(usuario.data, status=status.HTTP_200_OK)
        else: 
            return Response(usuario.errors, status=status.HTTP_400_BAD_REQUEST)
