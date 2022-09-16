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
    MYSQL_HOST =  os.environ.get("MYSQL_HOST") if os.environ.get("MYSQL_HOST")  else 'localhost'
    MYSQL_USER = os.environ.get("MYSQL_USER") if os.environ.get("MYSQL_USER")  else 'root'
    MYSQL_PASSWORD = os.environ.get("MYSQL_PASSWORD") if os.environ.get("MYSQL_PASSWORD")  else 'p@ssw0rd' 
    MYSQL_DB = os.environ.get("MYSQL_DB") if os.environ.get("MYSQL_DB")  else 'Proyecto1' 
    PORT = os.environ.get("PORT") if os.environ.get("PORT")  else '8000'
    HOST = os.environ.get("HOST") if os.environ.get("HOST")  else 'localhost'
    SERVER_NAME="{}:{}".format(HOST,PORT)
    