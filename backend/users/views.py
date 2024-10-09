from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserCreateSerializer, UpdateUserSerializer
from rest_framework.permissions import BasePermission
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

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

class UserLoginView(generics.GenericAPIView):
    serializer_class = UserCreateSerializer

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email y contraseña son requeridos'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            if not user.is_active:
                return Response({'error': 'Usuario inactivo'}, status=status.HTTP_400_BAD_REQUEST)
            if not user.check_password(password):
                return Response({'error': 'Contraseña incorrecta'}, status=status.HTTP_400_BAD_REQUEST)

            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
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
        instance.estado = False  # Desactivar en lugar de eliminar
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


        # body_user.nombre = request.data.get('nombre', body_user.nombre)
        # body_user.apellido = request.data.get('apellido', body_user.apellido)
        # body_user.email = request.data.get('email', body_user.email)
        # body_user.telefono = request.data.get('telefono', body_user.telefono)
        # body_user.genero = request.data.get('genero', body_user.genero)
        # body_user.rol = request.data.get('rol', body_user.rol)
        # body_user.is_active = request.data.get('is_active', body_user.is_active)

        # body_user.save()

        # return Response({'message': 'Usuario actualizado correctamente.'}, status=status.HTTP_200_OK)