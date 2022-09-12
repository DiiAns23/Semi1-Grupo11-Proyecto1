import imp
from flask.views import MethodView
from flask import request,json,jsonify
from server.views.utils.templateresponse import Response
from server import mysql


class StudentCRUD(MethodView):
    def get(self):
        request_data = request.get_json()
        id = request_data.get('id',None)
        cursor = mysql.connection.cursor()
        cursor.execute(''' SELECT * FROM USUARIO WHERE id_usuario={}'''.format(id))
        data = cursor.fetchall()
        response = Response()
        return response.Succesfully(data)

    #def post(self):
    #    session["counter"] = session.get("counter", 0) + 1
    #    return redirect(url_for("counter"))