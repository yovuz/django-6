from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Partner
from .serializers import PartnerSerializer
from rest_framework import status

@api_view(['GET'])  # Specify that this view only handles GET requests
def partner_list(request):
    # Retrieve all Partner instances from the database
    partners = Partner.objects.all()
    
    # Serialize the queryset
    serializer = PartnerSerializer(partners, many=True)
    
    # Return the serialized data as a JSON response
    return Response(serializer.data,status=status.HTTP_200_OK)