from django.urls import path
from . import views

urlpatterns = [
    path('partners/', views.partner_list, name='partner_list'),
]