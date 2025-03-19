from rest_framework_simplejwt.tokens import AccessToken
from .serializers import UserSerializer, PictureSerializer
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Picture

@api_view (["POST"])
def register_user(request):
    serializer=UserSerializer(data=request.data)
    if serializer.is_valid():
        user=serializer.save()
        access=AccessToken.for_user(user)
        return Response({
            "user":serializer.data,
            "access":str(access)
        },
        status=status.HTTP_201_CREATED
    )
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    username=request.data.get('username')
    password=request.data.get('password')
    user=authenticate(username=username,password=password)
    if user is not None:
        access=AccessToken.for_user(user)
        return Response(
            {"access":str(access),
             "username":user.username
             }
        )
    return Response({"error":"Invalid credentails"},status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET','POST'])
def picture_list_create(request):
    if request.method=="GET":
        pictures=Picture.objects.filter(user=request.user)  #ORM object relational mapping
        serializer=PictureSerializer(pictures,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    elif request.method=="POST":
        serializer=PictureSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)