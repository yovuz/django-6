from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email=models.EmailField(unique=True)
    
class Picture(models.Model):
    user=models.ForeignKey(CustomUser, related_name='pictures',on_delete=models.CASCADE)
    image=models.ImageField(upload_to='user_pictures/')
    uploaded_at=models.DateTimeField(auto_now_add=True)