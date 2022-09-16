import imp
from flask.views import MethodView
from flask import request,json,jsonify
from server.views.utils.templateresponse import Response
from server import mysql
import hashlib

class StudentRequest(MethodView):
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
        # Data
        id_usuario = request_data.get('id_usuario',None)
        response = Response()
        try:
            cursor = mysql.connection.cursor()
            cursor.execute('''call getRequestF({});'''.format(id_usuario))
            row_headers=[x[0] for x in cursor.description]
            data = cursor.fetchall()
            json_data=[]
            for result in data:
                    json_data.append(dict(zip(row_headers,result)))
            
            id_friends = []
            for user in json_data:
                if id_usuario != user.id_usuario_f:
                    id_friends.append(user.id_usuario_f)
                else:
                    id_friends.append(user.id_friend_f)
            data_response = {}

            for friend in id_friends:
                cursor2 = mysql.connection.cursor()
                cursor2.execute('''call getNames({});'''.format(friend))
                data_response[friend] = cursor2.fetchall()[0]

            return response.Succesfully(data_response)
        except mysql.connector.Error as err:
            return response.Bad_Request(err)