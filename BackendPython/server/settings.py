"""
settings.py
Configuration for Flask app
Important: Place your keys in the secret_keys.py module, 
           which should be kept out of version control.
"""

import os
class Config(object):
    CACHE_TYPE = 'gaememcached'


class Development(Config):
    DEBUG = True
    # Flask-DebugToolbar settings
    DEBUG_TB_PROFILER_ENABLED = True
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = ''
    MYSQL_DB = 'flask'
class Testing(Config):
    TESTING = True
    DEBUG = True
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = ''
    MYSQL_DB = 'flask'

class Production(Config):
    print("Iniciar Configuracion de produccion...")
    DEBUG = False
    MYSQL_HOST = '108.59.84.236'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = 'p@ssw0rd'
    MYSQL_DB = 'Proyecto1'
    PORT = os.environ.get("PORT") if os.environ.get("PORT")  else '8000'
    HOST = os.environ.get("HOST") if os.environ.get("HOST")  else 'localhost'
    SERVER_NAME="{}:{}".format(HOST,PORT)
    