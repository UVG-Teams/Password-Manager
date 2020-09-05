from rest_framework import serializers

from keychains.models import Keychain, Key

class KeychainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keychain
        fileds = '__all__'


class KeySerializer(serializers.ModelSerializer):
    class Meta:
        model = Key
        fileds = '__all__'
