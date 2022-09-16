import imp
from flask.views import MethodView
from flask import json
from server import mysql,app
from server.views.utils.templateresponse import Response
import hashlib

class HomeEditFile(MethodView):
    def post(self):
        request_data = request.get_json()
        id_usuario = request_data.get('id_usuario',None)
        name = request_data.get('name',None)
        new_name = request_data.get('new_name',None)
        visibility = request_data.get('visibility',None)
        password_str = request_data.get('password',None)
        password_sha1 = hashlib.sha1(password_str).digest()
        cursor = mysql.connection.cursor()
        cursor.execute('''call editPublication({},{},{},{},{});'''.format(id_usuario,name,new_name,visibility,password_sha1))
        data = cursor.fetchall()
        response = Response()
        return response.Succesfully(data)

        