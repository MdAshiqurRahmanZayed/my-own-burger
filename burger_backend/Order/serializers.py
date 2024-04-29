from rest_framework import serializers
from .models import *

class IngredientSerializer(serializers.ModelSerializer):
     
     class Meta:
          model = Ingredient
          fields = '__all__'
          
          
class CustomerDetailSerializer(serializers.ModelSerializer):
     
     class Meta:
          model = CustomerDetail
          fields = '__all__'
          
          
class OrderSerializer(serializers.ModelSerializer):
     ingredients = IngredientSerializer()
     customer = CustomerDetailSerializer()
     
     
     class Meta:
          model = Order
          fields = '__all__'
          
     def create(self,validated_data):
          ingredient = validated_data['ingredients']
          customer = validated_data['customer']
          price = validated_data['price']
          orderTime = validated_data['orderTime']
          user = validated_data['user']
          order = Order.objects.create(
               ingredients=IngredientSerializer.create(IngredientSerializer(),ingredient),
               customer=CustomerDetailSerializer.create(CustomerDetailSerializer(),customer),
               orderTime= orderTime,
               price=price,
               user=user,
               
          )
          return order