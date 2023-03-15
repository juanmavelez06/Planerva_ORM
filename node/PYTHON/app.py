import os
from flask import Flask, redirect, render_template, request, Response, jsonify
import pandas as pd
import json
import requests

app = Flask(__name__)

EXTENSIONES_PERMITIDAS = {'.csv', '.xlsx'}

# variable para almacenar el diccionario/Json
datosJson = {}

# servidor de node
# url = 'http://localhost:3000/receptorDatos'
url = 'http://localhost:8000/receptorDatos'


@app.route('/')
def main():
    # return render_template("app.js")
    return "Hola Mundo Cruel"

# validar las extensiones


def extensionPermitida(filename):
    _, ext = os.path.splitext(filename)
    return ext.lower() in EXTENSIONES_PERMITIDAS


def mensajeErrorArchivos(mensaje):
    response = jsonify({"mensaje": mensaje})
    response.status_code = 409
    return response

# ruta/función para recepcionar el archivo


@app.route('/prueba', methods=['POST', 'GET'])
def recibir_archivo():
    archivo = request.files.get('file') 
    global datosJson
    if archivo and extensionPermitida(archivo.filename):
        if archivo.filename.endswith('.csv'):
            datos = pd.read_csv(archivo, encoding='ISO-8859-1')
        elif archivo.filename.endswith('xlsx'):
            datos = pd.read_excel(archivo)   
        datosJson = {
            "datos": datos.to_json()
        }
        print(datosJson)
        return "Archivo cargado con éxito (:"
    else:
        print(mensajeErrorArchivos())
        return mensajeErrorArchivos("Archivo no permitido :(, solo se pueden cargar archivos CSV y XLSX")


if __name__ == '__main__':
    app.run(debug=True)
