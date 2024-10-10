from django.urls import path
from .views import UserRegisterView, UserListView, UserDetailView, UpdateUserAPIView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', UserListView.as_view(), name='user-list'),
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('update/', UpdateUserAPIView.as_view(), name='update-user'),
]