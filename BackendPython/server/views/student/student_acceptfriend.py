
from flask.views import MethodView
from flask import request,json,jsonify
from server.views.utils.templateresponse import Response
from server import mysql

class StudentAcceptFriend(MethodView):

    def post(self):
        request_data = request.get_json()
        id_usuario_f = request_data.get('id_usuario_f',None)
        id_friend_f = request_data.get('id_friend_f',None)
        cursor = mysql.connection.cursor()
        cursor.execute('''call aceptFriend({},{});'''.format(id_usuario_f,id_friend_f))
        data = cursor.fetchall()
        response = Response()
        return response.Succesfully(data)