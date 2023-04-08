from flask import Flask, Blueprint, jsonify, Response

app = Flask(__name__)

error = Blueprint("error", __name__)

@error.errorhandler(404)
def emptyFile(err):
    return jsonify({'mensaje': 'error, el campo archivo no puede estar vacío'}), 404

@error.errorhandler(500)
def requestsError(err):
    return jsonify({'mensaje': 'error al realizar la solicitd, intenta de nuevo más tarde'}), 500

@error.errorhandler(400)
def alreadyExists(err):
    return jsonify({'mensaje': 'error, el archivo ya existe'}), 400

@error.errorhandler(409)
def extensionNotAllowed(err):
    return jsonify({'mensaje': 'Error, la extensión no es valida, por favor carga un archivo con extensión XLSX'}), 409

@error.errorhandler(413)
def processError(err):
    return jsonify({'mensaje': 'no se pudo procesar el archivo, por favor revisa el tamaño'}), 413

@app.errorhandler(500)
def loadError(err):
    return jsonify({'mensaje': 'Error, no se pudo realizar la carga del archivo'}), 500


def responseOkJson(message: str, status_code: int = 200) -> Response:
    response = jsonify({
        "message": message
    })
    response.status_code = status_code
    return response 
