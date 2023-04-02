from flask import jsonify, Response
def responseErrorJson(message: str, status: int = 200 ) -> Response:
    response = jsonify({
        "message:": message
    })
    response.status_code = status
    return response 

def responseJson(message: str, data: str, status: int = 409) -> Response:
    response = jsonify({
        "message:": message
    })
    response.status_code = status
    return response