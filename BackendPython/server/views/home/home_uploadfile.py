import imp
from flask.views import View
from flask import json
from server import mysql,app
from server.views.utils.templateresponse import Response
import hashlib

class HomeUploadFile(MethodView):
    def get(self):
        request_data = request.get_json()
        id = request_data.get('id',None)
        cursor = mysql.connection.cursor()
        cursor.execute(''' SELECT * FROM USUARIO WHERE id_usuario={}'''.format(id))
        data = cursor.fetchall()
        response = Response()
        return response.Succesfully(data)

    def post(self):
        request_data = request.get_json()
        id_usuario = request_data.get('id_usuario',None)
        name = request_data.get('name',None)
        file = request_data.get('file',None)
        visibility = request_data.get('visibility',None)
        password_str = request_data.get('password',None)
        password_sha1 = hashlib.sha1(password_str).digest()
        cursor = mysql.connection.cursor()
        cursor.execute('''call newPublication({},{},{},{},{});'''.format(id_usuario,name,file,visibility,password_sha1))
        data = cursor.fetchall()
        response = Response()
        return response.Succesfully(data)

        