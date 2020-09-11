from django.http import Http404, JsonResponse, HttpResponse
from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
import json

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
                    'init_keychain': True,
                    'load': True,
                },
                'instance': {
                    'retrieve': True,
                    'update': True,
                    'partial_update': True,
                    'destroy': True,
                    'dump': True,
                    'setKey': True,
                    'get': True,
                    'remove': True,
                    'keys': True,
                }
            }
        ),
    )

    @action(detail=False, methods=['post'])
    def init_keychain(self, request):
        password = request.data['password']
        keychain = Keychain.init(password = password)
        serialized_keychain = KeychainSerializer(keychain).data
        serialized_keychain['derived_password'] = keychain.derived_password.hex()
        return Response(serialized_keychain)

    @action(detail=False, methods=['post'])
    def load(self, request):
        return Response(
            KeychainSerializer(
                Keychain.load(
                    password = request.data['password'],
                    representation = request.data['keys'],
                    trustedDataCheck = request.data['sha256']
                )
            ).data
        )

    @action(detail=False, methods=['get'])
    def dump(self, request):
        keychain_id = self.request.query_params.get('id')
        keychain = Keychain.objects.get(id=keychain_id)
        # Se autentica para poder realizar acciones por medio del API
        derived_password = self.request.query_params.get('dp')
        keychain.derived_password = bytes.fromhex(derived_password)
        keys, hmac = keychain.dump()

        with open('dump.json', 'w') as dump_file:
            json.dump(
                {
                    "keys": keys,
                    "hmac": hmac,
                },
                dump_file,
                indent = 4
            )

        with open('dump.json') as dump_file:
            response = HttpResponse(dump_file.read(), content_type="application/json")
            response['status_code'] = 200
            response['Content-Disposition'] = 'attachment; filename="dump.json"'

        return response

    @action(detail=True, methods=['post'])
    def setKey(self, request, pk=None):
        keychain = self.get_object()
        # Se autentica para poder realizar acciones por medio del API
        derived_password = request.data['derived_password']
        keychain.derived_password = bytes.fromhex(derived_password)
        name = request.data['name']
        value = request.data['value']
        keychain.setKey(name, value)
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def get(self, request, pk=None):
        keychain = self.get_object()
        name = request.data['keyName']
        # Se autentica para poder realizar acciones por medio del API
        derived_password = request.data['derived_password']
        keychain.derived_password = bytes.fromhex(derived_password)
        return Response(
            keychain.get(
                name = name
            )
        )

    @action(detail=True, methods=['post'])
    def remove(self, request, pk=None):
        keychain = self.get_object()
        name = request.data['keyName']
        # Se autentica para poder realizar acciones por medio del API
        derived_password = request.data['derived_password']
        keychain.derived_password = bytes.fromhex(derived_password)
        return Response(
            keychain.remove(
                name = name
            )
        )

    @action(detail=True, methods=['get'])
    def keys(self, request, pk=None):
        keychain = self.get_object()
        keys = keychain.key_set.all()
        return Response(
            [KeySerializer(key).data for key in keys]
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
