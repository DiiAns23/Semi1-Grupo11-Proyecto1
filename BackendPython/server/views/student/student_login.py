from flask.views import MethodView
from flask import request,json,jsonify
from server.views.utils.templateresponse import Response
from server import mysql
import hashlib

class StudentLogin(MethodView):
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
        name = request_data.get('name',None)
        password_str = request_data.get('password',None)
        password_sha1 = hashlib.sha1(str.encode(password_str)).hexdigest()
        cursor = mysql.connection.cursor()
        cursor.callproc('loginUser',(name,password_sha1))
        data = cursor.fetchall()
        response = Response()
        return response.Succesfully(data)

        