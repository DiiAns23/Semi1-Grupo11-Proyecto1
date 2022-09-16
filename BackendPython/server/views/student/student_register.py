
from flask.views import MethodView
from flask import request,json,jsonify
from server.views.utils.templateresponse import Response
from server import mysql
import hashlib

class StudentRegister(MethodView):
    def get(self):
        response = Response()
        try:
            cursor = mysql.connection.cursor()
            cursor.execute(''' SELECT * FROM USUARIO;''')
            row_headers=[x[0] for x in cursor.description]
            data = cursor.fetchall()
            json_data=[]
            for result in data:
                    json_data.append(dict(zip(row_headers,result)))                    
            return response.Succesfully(json_data)
        except mysql.connector.Error as err:
            return response.Bad_Request(err)

    def post(self):
        request_data = request.get_json()
        # Data
        email = request_data.get('email',None)
        password_str = request_data.get('password',None)
        password_sha1 = hashlib.sha1(str.encode(password_str)).hexdigest()
        user = request_data.get('user',None)
        photo = request_data.get('photo','none')
        ext = request_data.get('ext',None)
        response = Response()
        # Send Data
        try:
            cursor = mysql.connection.cursor()
            cursor.callproc('newUser',(email,password_sha1,user,photo))
            row_headers=[x[0] for x in cursor.description]
            data = cursor.fetchall()
            json_data=[]
            for result in data:
                    json_data.append(dict(zip(row_headers,result)))
            return response.Succesfully(json_data)
        except mysql.connector.Error as err:
            return response.Bad_Request(err)
        