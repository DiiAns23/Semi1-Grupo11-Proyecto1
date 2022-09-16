import imp
from flask.views import MethodView
from flask import json
from server import mysql,app
from server.views.utils.templateresponse import Response
import hashlib

class HomeEditFile(MethodView):
    def post(self):
        request_data = request.get_json()
        # Data
        id_usuario = request_data.get('id_usuario',None)
        name = request_data.get('name',None)
        new_name = request_data.get('new_name',None)
        visibility = request_data.get('visibility',None)
        password_str = request_data.get('password',None)
        password_sha1 = hashlib.sha1(password_str).digest()
        # Send Data
        response = Response()
        try:
            cursor = mysql.connection.cursor()
            cursor.execute('''call editPublication({},{},{},{},{});'''.format(id_usuario,name,new_name,visibility,password_sha1))
            row_headers=[x[0] for x in cursor.description]
            data = cursor.fetchall()
            json_data=[]
            for result in data:
                    json_data.append(dict(zip(row_headers,result)))
            return response.Succesfully(json_data)
        except mysql.connector.Error as err:
            return response.Bad_Request(err)
        