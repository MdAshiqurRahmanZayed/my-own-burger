from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,PermissionManager,BaseUserManager

class UserManager(BaseUserManager):
     def create_user(self,email,password):
          if not email:
               raise ValueError("Please insert value")
          email = self.normalize_email(email)
          user = self.model(email=email)
          user.set_password(password)
          user.save(using=self.db)
          return user
     def create_superuser(self,email,password):
          user = self.create_user(email,password)
          user.is_staff = True
          user.is_superuser = True
          user.save(using=self.db)


class User(AbstractBaseUser,PermissionsMixin):
     email = models.EmailField( max_length=254,unique=True)
     is_staff = models.BooleanField(default=False)
     is_active = models.BooleanField(default=True)
     is_superuser = models.BooleanField(default=False)
     
     objects = UserManager()
     
     USERNAME_FIELD = 'email'
     
     def __str__(self):
          return self.email
     
     
     

