import imp
from flask.views import MethodView
from flask import json,request
from server import mysql,app
from server.views.utils.templateresponse import Response
import hashlib

class HomeGetPublications(MethodView):
    def get(self):
        request_data = request.get_json()
        # Data
        id = request_data.get('id_usuario',None)
        response = Response()
        # Send Data
        try:
            cursor = mysql.connection.cursor()
            cursor.execute('''call getDataUser({});'''.format(id))
            row_headers=[x[0] for x in cursor.description]
            data = cursor.fetchall()
            json_data=[]
            for result in data:
                    json_data.append(dict(zip(row_headers,result)))
            return response.Succesfully(json_data)
        except mysql.connector.Error as err:
            return response.Bad_Request(err)
    def post(self):
        pass

        