from rest_framework import serializers

from keychains.models import Keychain, Key


class KeySerializer(serializers.ModelSerializer):
    class Meta:
        model = Key
        fields = "__all__"


class KeychainSerializer(serializers.ModelSerializer):
    # keys = KeySerializer(many=True, read_only=True)
    class Meta:
        model = Keychain
        fields = (
            "id",
        )
