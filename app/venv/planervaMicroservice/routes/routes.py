from flask import Blueprint, request, Flask, jsonify
from werkzeug.utils import secure_filename
from respones.responses import emptyFile, processError, alreadyExists, extensionNotAllowed, responseOkJson, requestsError, sizeError, removeFile
import pandas as pd
import os
import requests
import json
import uuid
import logging

app = Flask(__name__)
route = Blueprint('route',__name__)

logs = []

loggers = logging.basicConfig(format='%(asctime)s %(levelname)s %(message)s', level=logging.INFO, datefmt='%Y-%m-%d %H:%M:%S')

logs.append(loggers)

print(logs)

#*Extensiones permitidas
EXTENSIONESPERMITIDAS = {'xlsx'}

PATHFILE = os.getcwd() + "/files/"

if not os.path.exists(PATHFILE):
    os.makedirs(PATHFILE)
    
app.config['UPLOAD_FOLDER'] = PATHFILE


#* Ruta receptora de archivos validación de extensiones
@route.route("/upload", methods=('GET', 'POST'))
def upload():
    archivo = request.files['file']
    if archivo.filename == '':
        return emptyFile(404)
    
    nombreArchivo = secure_filename(os.path.basename(archivo.filename))
    archivoId = str(uuid.uuid4())
    nombreArchivoID  = archivoId + '_' + nombreArchivo
    rutaArchivo = os.path.join(PATHFILE, nombreArchivoID)
    
    extension = os.path.splitext(nombreArchivo)[1][1:].lower()
    if extension not in EXTENSIONESPERMITIDAS:
        removeFile(PATHFILE, nombreArchivoID)
        return extensionNotAllowed(409)
    
    if os.path.exists(rutaArchivo):
        removeFile(PATHFILE, nombreArchivoID)
        return alreadyExists(400)
    archivo.save(os.path.join(app.config['UPLOAD_FOLDER'], rutaArchivo))
    print(rutaArchivo)
    print(archivo)
    logging.info(f'se subió el archivo correctamente {nombreArchivo}')
    
    df = pd.read_excel(os.path.join(PATHFILE, nombreArchivoID))
    #print(df)
    data = df.to_dict(orient='records')
    jsonData = json.dumps(data)
   # print(data)
    try:
        if data:
            url = "http://127.0.0.1:3000/recibirDatos"
            headers = {'Content-Type': 'application/json'}
            response = requests.post(url,data=jsonData, headers=headers)
            logging.info(response.status_code)
            #print(response.content)
            try:
                if response.ok:
                    return responseOkJson("Se envió el archivo correctamente", 200, nombreArchivoID)
                elif response.status_code == 413:
                  removeFile(PATHFILE, nombreArchivoID)
                  return sizeError(413)
            except FileExistsError as e:
                removeFile(PATHFILE, nombreArchivoID)
                print("error: no se pudo hacer la carga del archivo correctamente", e)
                return processError(e)   
        else:
            print(data)
            removeFile(PATHFILE, nombreArchivoID)
            return processError(400) 
    except requests.exceptions.ConnectionError as e:
        print("error: no se pudo conectar con el servidor exitosamente, intenta nuevamente más tarde", e)
        return requestsError(e)