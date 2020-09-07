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

    @action(detail=False, methods=['post'])
    def init(self, request):
        print(self)
        print(request)
        return Response(
            KeychainSerializer(
                Keychain.init(
                    user = request.user,
                    password = request.data['password']
                ).data
            )
        )

    @action(detail=False, methods=['post'])
    def load(self, request):
        return Response(
            KeychainSerializer(
                Keychain.load(
                    user = request.user,
                    password = request.data['password'],
                    representation = request.data['keys'],
                    trustedDataCheck = request.data['sha256']
                ).data
            )
        )

    @action(detail=True, methods=['post'])
    def dump(self, request):
        keychain = self.get_object()
        return keychain.dump()

    @action(detail=True, methods=['post'])
    def setKey(self, request):
        keychain = self.get_object()
        return Response(
            keychain.setKey(
                name = request.data['name'],
                value = request.data['value']
            )
        )

    @action(detail=True, methods=['post'])
    def get(self, request):
        keychain = self.get_object()
        return Response(
            keychain.get(
                name = request.data['name']
            )
        )

    @action(detail=False, methods=['post'])
    def remove(self, request):
        keychain = self.get_object()
        return Response(
            keychain.remove(
                name = request.data['name']
            )
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
