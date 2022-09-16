
from flask.views import MethodView
from flask import request,json,jsonify
from server.views.utils.templateresponse import Response
from server import mysql
import hashlib

class StudentRegister(MethodView):
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
        email = request_data.get('email',None)
        password_str = request_data.get('password',None)
        password_sha1 = hashlib.sha1(str.encode(password_str)).hexdigest()
        user = request_data.get('user',None)
        photo = request_data.get('photo',None)
        print(password_sha1)
        cursor = mysql.connection.cursor()
        cursor.callproc('newUser',(email,password_sha1,user,photo))
        data = cursor.fetchall()
        response = Response()
        return response.Succesfully(data)

        