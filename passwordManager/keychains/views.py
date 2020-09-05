from django.http import Http404
from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from keychains.models import Keychain, Key
from keychains.serializers import KeychainSerializer, KeySerializer
from permissions.services import APIPermissionClassFactory


class KeychainViewSet(viewsets.ModelViewSet):
    queryset = Keychain.objects.all()
    serializer_class = KeychainSerializer
    permission_classes = (
        APIPermissionClassFactory(
            name='KeychainPermission',
            permission_configuration={
                'base': {
                    'create': True,
                    'list': True,
                },
                'instance': {
                    'retrieve': True,
                    'update': True,
                    'partial_update': True,
                    'destroy': True,
                }
            }
        ),
    )


class KeyViewSet(viewsets.ModelViewSet):
    queryset = Key.objects.all()
    serializer_class = KeySerializer
    permission_classes = (
        APIPermissionClassFactory(
            name='KeyPermission',
            permission_configuration={
                'base': {
                    'create': True,
                    'list': True,
                },
                'instance': {
                    'retrieve': True,
                    'update': True,
                    'partial_update': True,
                    'destroy': True,
                }
            }
        ),
    )
