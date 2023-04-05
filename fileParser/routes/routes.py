#** impportación de librerías y módulos necesarios para el correcto funcionamiento del programa
from flask import Blueprint, request, jsonify, Flask, redirect, abort
from werkzeug.utils import secure_filename
from responses.responses import responseErrorJson
from responses.responses import responseJson
import pandas as pd
from os import getcwd
import os
import requests
import csv
import json

app = Flask(__name__)

#* definir tamaños de archivos permitidos 
#!!en prueba!! INVESTIGAR LA FUNCIONALIDAD DE ESTA
configTamanio = app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

#*BluePrint
nombreRutas = Blueprint("nombreRutas", __name__)

#** Constantes para guardar los tipos de extensiones y la ruta donde se guardara la trazabilidad de los archivos cargados
EXTENSIONESPERMITIDAS = set(['xlsx'])

#!! trazabilidad de archivos
PATHFILE = os.getcwd() + "/files/"
if not os.path.exists(PATHFILE):
    os.makedirs(PATHFILE)

#** función la cual  obtiene el archivo y valida los tipos de extensiones y si el campo archivo se encuentra vacío 
@nombreRutas.post("/subirArchivos")
def subirArchivo():
    archivo = request.files['file']
    nombreArchivo = secure_filename(archivo.filename)
    extension = os.path.splitext(nombreArchivo)[1][1:].lower()
    if archivo.filename == '':
        return responseErrorJson("el campo archivo no puede estar vacío", 409)
    tamanioArchivo = archivo.content_length
    if tamanioArchivo > configTamanio:
        abort(413, "Tamaño de archivo muy grande, no puede superar las 16 Megas, carga uno con el mismo tamaño o menor")
    if extension not in EXTENSIONESPERMITIDAS:
        return responseErrorJson("Extensión no permitida, por favor carga archivos con extensiones de tipo XLSX", 400)
    nombreRutaArchivo = PATHFILE + nombreArchivo
    if os.path.exists(nombreRutaArchivo):
        return responseErrorJson("El archivo ya existe, se procesó y guardó correctamente", 400)
    else:
        return obtenerArchivo(nombreArchivo)

##** Función la cual procesa el archivo y lo envía al servidor de node
def obtenerArchivo(nombreArchivo):
    try:
        archivo = request.files['file']
        archivo.save(PATHFILE + nombreArchivo)
        if nombreArchivo.endswith('.xlsx'):
            datos = pd.read_excel(PATHFILE + nombreArchivo, engine="openpyxl")
            archivoProcesado = [{"data": row} for index, row in datos.iterrows()]
        else:
            return responseErrorJson("tipo de archivo no permitido", 409)
        if archivo:
            ##** Enviar los datos al servidor Js
            url = "http://127.0.0.1:3000/recibirDatos"
            headers = {'Content-Type': 'application/json'}
            archivoProcesado = json.dumps(archivoProcesado, default=str)
            response = requests.post(url, data=archivoProcesado, headers=headers)
            print(response)
            if response.ok:
                return responseJson("Se envió el archivo correctamente", archivoProcesado, 200)
            else:
                return responseErrorJson("Error al enviar los datos", response.status_code)
        else:
            return responseErrorJson("error, no se pudo procesar el archivo", 409) 
    except FileNotFoundError as e:
        print("error", e)
        return f"error: {e}, 500"