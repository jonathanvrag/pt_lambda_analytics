from django.urls import path
from .views import ProductsSearchView, ProductsMetricsView, WishlistView

urlpatterns = [
    path('search/', ProductsSearchView.as_view(), name='products-search'), 
    path('metrics/', ProductsMetricsView.as_view(), name='products-metrics'),
    path('wishlist/', WishlistView.as_view(), name='wishlist'),
    path('wishlist/<int:user_id>/', WishlistView.as_view(), name='wishlist-list'),
    path('wishlist/delete/<int:id>/', WishlistView.as_view(), name='wishlist-delete'),
]