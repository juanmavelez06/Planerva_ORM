from flask import Blueprint, request, Flask, jsonify
from werkzeug.utils import secure_filename
from respones.responses import emptyFile, processError, alreadyExists, extensionNotAllowed, responseOkJson, requestsError, sizeError, removeFile
import pandas as pd
from flask_cors import CORS, cross_origin
import os
import requests
import json
import uuid
import logging

app = Flask(__name__)
route = Blueprint('route', __name__)
cors = CORS(app,resources={r"/upload": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
loggers = logging.basicConfig(format='%(asctime)s %(levelname)s %(message)s',
                              level=logging.INFO, datefmt='%Y-%m-%d %H:%M:%S')


# *Extensiones permitidas
EXTENSIONESPERMITIDAS = {'xlsx'}

PATHFILE = os.getcwd() + "/files/"

if not os.path.exists(PATHFILE):
    os.makedirs(PATHFILE)

app.config['UPLOAD_FOLDER'] = PATHFILE

@route.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    logging.info('Adding CORS headers')
    return response

# * Ruta receptora de archivos validación de extensiones 
@route.route("/upload", methods=('GET', 'POST'))
def upload():
    logging.info('Se recibio peticion')
    archivo = request.files['file']
    if archivo.filename == '':
        logging.info('Se cargó un archivo con el value archivo vacío, la key es file')
        logging.error('El campo archivo está vacío')
        return emptyFile(404)

    nombreArchivo = secure_filename(os.path.basename(archivo.filename))
    archivoId = str(uuid.uuid4())
    nombreArchivoID = archivoId + '_' + nombreArchivo
    rutaArchivo = os.path.join(PATHFILE, nombreArchivoID)

    extension = os.path.splitext(nombreArchivo)[1][1:].lower()
    if extension not in EXTENSIONESPERMITIDAS:
        logging.info('Se cargó un archivo con una extensión no permitida')
        logging.error('Extensión no permitida, no se pudo eliminar el archivo porque no existe')
        removeFile(PATHFILE, nombreArchivoID)
        return extensionNotAllowed(409)

    if os.path.exists(rutaArchivo):
        removeFile(PATHFILE, nombreArchivoID)
        logging.error("Ya existe un archivo con este nombre")
        return alreadyExists(400)
    archivo.save(os.path.join(app.config['UPLOAD_FOLDER'], rutaArchivo))
    # print(rutaArchivo)
    # print(archivo)

    df = pd.read_excel(os.path.join(PATHFILE, nombreArchivoID))
    data = df.to_dict(orient='records')
    last_row_index = len(data)-1
    data[last_row_index]["uuid"] = nombreArchivoID
    jsonData = json.dumps(data)
   # print(data)
    try:
        if data:
            url = "http://127.0.0.1:3001/recibirDatos"
            headers = {'Content-Type': 'application/json'}
            response = requests.post(url, data=jsonData, headers=headers)
            logging.info(f" Código de estado de la solicitud {response.status_code}")
            # print(response.content)
            try:
                if response.ok:
                    logging.info(
                        f'Se subió el archivo correctamente: {nombreArchivo}')
                    return responseOkJson("Se envió el archivo correctamente:", 200, nombreArchivoID)
                elif response.status_code == 413:
                    logging.error(
                        f'No se pudo subir el archivo correctamente debido a que el tamaño es muy grande, {nombreArchivo}')
                    removeFile(PATHFILE, nombreArchivoID)
                    return sizeError(413)

            except FileExistsError as e:
                removeFile(PATHFILE, nombreArchivoID)
                logging.error("error: no se pudo hacer la carga del archivo correctamente", e)
                return processError(e)
        else:
            print(data)
            removeFile(PATHFILE, nombreArchivoID)
            return processError(400)

    except requests.exceptions.ConnectionError as e:
        logging.error(f'Error en la conexión {e}')
    return requestsError("error al cargar el archivo, revisa las condiciones establecidas para la carga de archivos")