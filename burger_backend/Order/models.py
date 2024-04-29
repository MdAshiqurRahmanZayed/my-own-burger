from django.db import models
from Account.models import User

class Ingredient(models.Model):
     salad = models.IntegerField(default=0)
     cheese = models.IntegerField(default=0)
     meat = models.IntegerField(default=0)

     def __str__(self):
          return f"Salad:{self.salad}, Cheese:{self.cheese}, Meat:{self.meat} "
    
class CustomerDetail(models.Model):
     deliveryAddress = models.TextField(blank=True)
     phone = models.CharField( max_length=20)
     paymentType = models.CharField( max_length=50,blank=True)
     
     def __str__(self):
          return f"Customer Details: {self.deliveryAddress} Phone: {self.phone}" 

class Order(models.Model):
     user = models.ForeignKey(User, on_delete=models.CASCADE)
     ingredients = models.OneToOneField(Ingredient, on_delete=models.CASCADE)
     customer = models.OneToOneField(CustomerDetail, on_delete=models.CASCADE)
     price = models.CharField(max_length=10,default="0")
     orderTime = models.CharField( max_length=50,blank=True)
     
     def __str__(self):
          return f"Order:{self.user.email}"
     