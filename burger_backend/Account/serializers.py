from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
     password = serializers.CharField(write_only = True ,required = True,style={'input_type':'password'})
     class Meta:
          model = User
          fields = ['id','email','password']
          
     def create(self,validated_data):
          email = validated_data['email']
          password = validated_data['password']
          user = User.objects.create_user(email,password)
          return user
