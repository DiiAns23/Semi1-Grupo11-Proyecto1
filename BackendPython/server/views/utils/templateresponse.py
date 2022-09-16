from server import app
from flask import json
class Response:
    def __init__(self):
        pass

    def Succesfully(self,data):
        response = app.response_class(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
        )
        return response
    
    def Bad_Request(self):
        response = app.response_class(
            response="BAD REQUEST",
            status=404,
            mimetype='application/json'
        )
        return response   
        