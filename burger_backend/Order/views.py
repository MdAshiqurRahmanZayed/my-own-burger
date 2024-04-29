from django.shortcuts import render
from rest_framework import viewsets 
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated,]
    def get_queryset(self):
        user = self.request.user
        queryset = Order.objects.filter(user__id = user.id)
        # id = self.request.query_params.get('id',None)
        
        # if id is not None:
        #     queryset = queryset.filter(user__id = id) 
        return queryset


