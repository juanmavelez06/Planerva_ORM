from flask import Flask, Blueprint, jsonify, Response
import os

app = Flask(__name__)

error = Blueprint("error", __name__)

@error.errorhandler(400)
def alreadyExists(err):
    return jsonify({'mensaje': 'error, el archivo ya existe'}), 400

@error.errorhandler(404)
def emptyFile(err):
    return jsonify({'mensaje': 'error, el campo archivo no puede estar vacío'}), 404

@error.errorhandler(409)
def extensionNotAllowed(err):
    return jsonify({'mensaje': 'Error, la extensión no es valida, por favor carga un archivo con extensión XLSX'}), 409

@error.errorhandler(409)
def sizeError(err):
    return jsonify({'mensaje': 'no se pudo procesar el archivo, por favor revisa el tamaño'}), 413


@error.errorhandler(413)
def processError(err):
    return jsonify({'mensaje': 'no encontramos datos para enviar.'}), 413


@error.errorhandler(500)
def requestsError(err):
    return jsonify({'mensaje': 'error al realizar la solicitd, intenta de nuevo más tarde'}), 500

def responseOkJson(message: str, status_code: int = 200, data: str = None) -> Response:
    response_data = {"message": message}
    if data is not None:
        response_data["data"] = data
    response = jsonify(response_data)
    response.status_code = status_code
    return response

def removeFile(path: any, nameFileId: any) -> Response:
    os.remove(os.path.join(path, nameFileId))