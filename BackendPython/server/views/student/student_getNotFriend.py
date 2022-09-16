import numpy as np
from flask.views import MethodView
from flask import request,json,jsonify
from server.views.utils.templateresponse import Response
from server import mysql
import hashlib

class StudentGetNotFriends(MethodView):
    def get(self):
        request_data = request.get_json()
        # Data
        id_usuario = request_data.get('id_usuario',None)
        response = Response()
        try:
            cursor = mysql.connection.cursor()
            cursor.execute('''call getUsers({});'''.format(id_usuario))
            row_headers=[x[0] for x in cursor.description]
            data = cursor.fetchall()
            users_data=[]
            for result in data:
                    users_data.append(dict(zip(row_headers,result)))
            
            cursor2 = mysql.connection.cursor()
            cursor2.execute('''call getFriends({});'''.format(id_usuario))
            row_headers=[x[0] for x in cursor2.description]
            data = cursor2.fetchall()
            friends_data=[]
            for result in data:
                friends_data.append(dict(zip(row_headers,result)))

            for i,user in enumerate(users_data):
                for j,friend in enumerate(friends_data):
                    if(user['id_usuario'] == friend['id_usuario_f'] or user['id_usuario'] == friend['id_friend_f']):
                        users_data = users_data[i:1]
                        
            return response.Succesfully(users_data)
        except mysql.connector.Error as err:
            return response.Bad_Request(err)

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
                if id_usuario != user['id_usuario_f']:
                    id_friends.append(user['id_usuario_f'])
                else:
                    id_friends.append(user['id_friend_f'])
            data_response = []

            for friend in id_friends:
                cursor2 = mysql.connection.cursor()
                cursor2.execute('''call getNames({});'''.format(friend))
                row_headers=['username','email']
                data = cursor2.fetchall()
                json_data=[]
                for result in data:
                    json_data.append(dict(zip(row_headers,result)))
                json_data[0]['id_usuario'] = friend
                data_response.append(json_data[0])

            return response.Succesfully(data_response)
        except mysql.connector.Error as err:
            return response.Bad_Request(err)