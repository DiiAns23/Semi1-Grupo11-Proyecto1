
from flask.views import MethodView
from flask import request,json,jsonify
from server.views.utils.templateresponse import Response
from server import mysql

class StudentAddFriend(MethodView):

    def post(self):
        request_data = request.get_json()
        # Data
        id_usuario_f = request_data.get('id_usuario_f',None)
        id_friend_f = request_data.get('id_friend_f',None)
        # Send Data
        response = Response()
        try:
            cursor = mysql.connection.cursor()
            cursor.execute('''call addFriend({},{});'''.format(id_usuario_f,id_friend_f))
            row_headers=[x[0] for x in cursor.description]
            data = cursor.fetchall()
            json_data=[]
            for result in data:
                    json_data.append(dict(zip(row_headers,result)))
            return response.Succesfully(json_data)
        except mysql.connector.Error as err:
            return response.Bad_Request(err)
