from rest_framework import serializers
from .models import CustomUser, Picture

class UserSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True,min_length=8)
    class Meta:
        model=CustomUser
        fields=['id','username','password','email']
        
    def create(self, validated_data):
        return CustomUser.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        
class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model=Picture
        fields=['id','image','uploaded_at']
        