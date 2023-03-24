from flask import Flask, flash, render_template, redirect, Response, jsonify, request
from flask_cors import CORS, cross_origin
import requests
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

url = "http://localhost:5000/obtenerArchivo"


@app.route('/obtenerArchivo', methods=['POST', 'GET'])
@cross_origin(methods=['POST', 'GET'])
def obtenerArchivo():
    if 'file' not in request.files:
        return jsonify({'error': 'No se proporcionó'})
    archivo = request.files['file']
    if archivo.filename == '':
        return jsonify({'error': 'El archivo no tiene nombre'})

    archivo = {'file': request.files['file']}
    respuesta = requests.post(url=url, files=archivo)
    return jsonify({'message': 'Archivo recibido correctamente'}, respuesta)


if __name__ == '__main__':
    app.run(debug=True)
