# -*- coding: utf-8 -*-

import imp
from flask.views import View
from flask import json
from server import mysql,app
from server.views.utils.templateresponse import Response

class StudentAcceptFriend(View):

    def dispatch_request(self):
        cursor = mysql.connection.cursor()
        cursor.execute(''' SELECT * FROM USUARIO''')
        data = cursor.fetchall()
        response = Response()
        return response.Succesfully(data)