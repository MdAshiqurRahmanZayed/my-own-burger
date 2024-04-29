from django.urls import path
from Account.views import *
from Order.views import *
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
router =  routers.SimpleRouter()
router.register(r'user',UserViewSet)
router.register(r'order',OrderViewSet,basename='orders')


urlpatterns = [
     path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]+router.urls
