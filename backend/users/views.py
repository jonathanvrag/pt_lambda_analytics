from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserCreateSerializer

User = get_user_model()

class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

class UserLoginView(generics.GenericAPIView):
    serializer_class = UserCreateSerializer

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email y contraseña son requeridos'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            if not user.estado:
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