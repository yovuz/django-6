from django.db import models

class Partner(models.Model):
    name = models.CharField(max_length=100)
    language = models.CharField(max_length=50)
    interests = models.TextField()
    about = models.TextField()
    profile_picture = models.ImageField(upload_to='user_pictures/')