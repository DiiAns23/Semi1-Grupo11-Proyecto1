from flask.views import MethodView
from flask import request,json,jsonify
from server.views.utils.templateresponse import Response
from server import mysql


class StudentAddFriend(MethodView):
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
        user = request_data.get('user',None)
        email = request_data.get('email',None)
        password = request_data.get('password',None)
        photo = request_data.get('photo',None)