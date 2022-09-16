import imp
from flask.views import MethodView
from flask import json
from server import mysql,app
from server.views.utils.templateresponse import Response
import hashlib

class HomeDeleteFile(MethodView):
    def post(self):
        request_data = request.get_json()
        # Data
        id_usuario = request_data.get('id_usuario',None)
        name = request_data.get('name',None)
        password_str = request_data.get('password',None)
        password_sha1 = hashlib.sha1(password_str).digest()
        response = Response()
        # Send Data
        try:
            cursor = mysql.connection.cursor()
            cursor.execute('''call deletePublication({},{},{});'''.format(id_usuario,name,password_sha1))
            row_headers=[x[0] for x in cursor.description]
            data = cursor.fetchall()
            json_data=[]
            for result in data:
                    json_data.append(dict(zip(row_headers,result)))
            return response.Succesfully(json_data)
        except mysql.connector.Error as err:
            return response.Bad_Request(err)
       
        
        
        

        