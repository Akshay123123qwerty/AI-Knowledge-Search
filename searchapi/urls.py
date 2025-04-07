from django.urls import path
from .views import search,RegisterView,logout_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('search/', search, name='search'),
    path('register/',RegisterView.as_view(),name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/',logout_view,name="logout"),
]
