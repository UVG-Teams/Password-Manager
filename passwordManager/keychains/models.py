from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from backports.pbkdf2 import pbkdf2_hmac
from base64 import b64encode
import hashlib
import hmac
import json
import os


class CorruptError(Exception):
    pass

class Keychain(models.Model):
    salt = models.CharField(
        max_length = 250,
        null = False,
        blank = False,
    )

    derived_password = None

    # Este método deberá crear un nuevo objeto de clave-valor. Esta función es responsable de generar las llaves necesarias 
    # para proveer varias funcionalidades dentro del manejador de contraseñas. Una vez iniciado, el manejador de contraseñas 
    # deberá estar listo para soportar otras funcionalidades descritas en esta parte.
    @staticmethod
    def init(password):
        salt = os.urandom(64)
        keychain = Keychain.objects.create(salt=salt)
        keychain.derived_password = pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 50000, 64)
        return keychain


    # Este método carga el estado del manejador (conjunto de aplicación-contraseñas) de una representación serializada. 
    # Pueden asumir que la ​representación​ es una serialización válida generada por una llamada a keychain.dump(). 
    # Esta función deberá verificar que la contraseña (password) dada es válida para el conjunto de aplicación-contraseñas. 
    # Si el parámetro trustedDataCheck es dado, esta función deberá también afirmar la integridad de los objetos clave-valor. 
    # Si una manipulación es detectada, esta función deberá lanzar un error o excepción. Si todo pasa bien, esta función deberá 
    # regresar el valor booleano verdadero y el manejador junto con el conjunto de aplicación-contraseñas deberán estar listos 
    # para soportar las otras funcionalidades descritas en el API. Si este método es llamado con la contraseña maestra equivocada,
    # su código debe regresar el valor booleano de falso, y no se deberán poder realizar ninguna otra consulta 
    # (keychain.get, keychain.set o keychain.remove) dentro del manejador de contraseñas.
    @staticmethod
    def load(password, representation, trustedDataCheck):
        salt = Keychain.get_salts()[trustedDataCheck].encode("ISO-8859-1")
        derived_password = pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 50000, 64)

        if trustedDataCheck:
            try:
                if Keychain.hmac_sha256(msg=representation, key=derived_password) != trustedDataCheck:
                    raise CorruptError
            except CorruptError:
                print('The representation was corrupted')

        # Verificar si la contrase;a es valida para la representacion(keys)
        if password:
            keychain = Keychain.objects.create(salt=salt)
            for name, value in representation.items():
                keychain.setKey(name, value)
            return True, keychain

        return False, None


    # Si el conjunto de aplicación-contraseñas no se ha iniciado o no se ha cargado correctamente en la memoria, 
    # este método debería devolver un valor ​null​. De otra manera, este método crea un objeto de serialización codificada
    # del conjunto de aplicación-contraseñas, de modo que pueda volver a cargarse en la memoria mediante una llamada
    # posterior a keychain.load. Deberá regresar un ​array ​que consta de esto, y también del hash SHA-256 del contenido
    # del conjunto de aplicación-contraseñas (que se guardará en un almacenamiento confiable y se usará para evitar ataques de ​rollback​).
    def dump(self):
        keys_set = self.key_set.all()
        keys = {}

        for key in keys_set:
            keys[key.application] = key.password

        Keychain.save_salt(Keychain.hmac_sha256(msg=keys, key=self.derived_password), self.salt)
        return keys, Keychain.hmac_sha256(msg=keys, key=self.derived_password)

    # Si el conjunto de aplicación-contraseñas no ha sido iniciado o cargado a memoria exitosamente, este método
    # debería lanzar una excepción o error. Caso contrario, este método deberá insertar el nombre de la aplicación y los
    # datos asociados al objeto de clave-valor. Si la aplicación ya existe en el manejador de contraseñas, este método
    # deberá actualizar su valor; de otra manera, deberá crear una nueva entrada
    # No se puede usar set ya que es una palabra reservada de python
    def setKey(self, name, value):
        keys = self.key_set.all()
        try:
            key = keys.get(application = Keychain.hmac_sha256(name, self.derived_password))
            key.password = value
            key.save()
        except ObjectDoesNotExist:
            Key.objects.create(
                application = Keychain.hmac_sha256(name, self.derived_password),
                password = value,
                keychain = self
            )
        return None


    # Si el conjunto de aplicación-contraseñas no ha sido iniciado o cargado a memoria exitosamente, este método
    # debería lanzar una excepción o error. Caso contrario, si la aplicación solicitada existe en el objeto de clave-valor,
    # entonces este método deberá retornar los datos guardados asociados a dicha aplicación. Si la aplicación no existeen 
    # el objeto de clave-valor, deberá regresar ​null​.
    def get(self, name):
        keys = self.key_set.all()
        try:
            key = keys.get(application = Keychain.hmac_sha256(name, self.derived_password))
            return key.password
        except ObjectDoesNotExist:
            return None


    # Si el conjunto de aplicación-contraseñas no ha sido iniciado o cargado a memoria exitosamente, este método
    # debería lanzar una excepción o error. Caso contrario, si la aplicación solicitada existe en el objeto de clave-valor,
    # entonces este método deberá eliminar el registro del objeto clave-valor. Este método retorna el valor booleano
    # verdadero en este caso. Por otro lado, si la aplicación especificada no existe, retornará el valor booleano de falso.
    def remove(self, name):
        keys = self.key_set.all()
        try:
            key = keys.get(application = Keychain.hmac_sha256(name, self.derived_password))
            key.delete()
            return True
        except ObjectDoesNotExist:
            return False


    # Utils
    @staticmethod
    def get_salts():
        secrets = {}
        with open('secret.json') as secret_file:
            secrets = json.load(secret_file)
            return secrets

    @staticmethod
    def save_salt(keys_hmac, salt):
        secrets = Keychain.get_salts()
        secrets[keys_hmac] = salt.decode("ISO-8859-1")
        with open('secret.json', 'w') as secret_file:
            json.dump(secrets, secret_file, indent=4)

    @staticmethod
    def hmac_sha256(msg, key):
        return hmac.new(
            msg = bytes(str(msg), 'utf-8'),
            key = bytes(str(key), 'utf-8'),
            digestmod = hashlib.sha256
        ).hexdigest()


class Key(models.Model):
    application = models.CharField(
        max_length = 200,
        null = False,
        blank = False,
    )

    password = models.CharField(
        max_length = 200,
        null = False,
        blank = False,
    )

    keychain = models.ForeignKey(
        Keychain,
        null = False,
        blank = False,
        on_delete = models.CASCADE,
    )
