from django.contrib import admin
from keychains.models import Keychain, Key

# Register your models here.

admin.site.register(Keychain)
admin.site.register(Key)
