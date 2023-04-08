from flask import Blueprint, request, Flask, jsonify
from werkzeug.utils import secure_filename
from respones.responses import emptyFile, processError, alreadyExists, extensionNotAllowed, responseOkJson, requestsError
import pandas as pd
import os
import requests


app = Flask(__name__)
route = Blueprint('route',__name__)


#*Extensiones permitidas
EXTENSIONESPERMITIDAS = {'xlsx'}

PATHFILE = os.getcwd() + "/files/"

if not os.path.exists(PATHFILE):
    os.makedirs(PATHFILE)
    
app.config['UPLOAD_FOLDER'] = PATHFILE


#* Ruta receptora de archivos validación de extensiones
@route.post("/upload")
def upload():
    archivo = request.files['file']
    if archivo.filename == '':
        return emptyFile(404)

    nombreArchivo = secure_filename(archivo.filename)
    rutaArchivo = PATHFILE + nombreArchivo
    
    extension = os.path.splitext(nombreArchivo)[1][1:].lower()
    if extension not in EXTENSIONESPERMITIDAS:
        return extensionNotAllowed(409)
    
    if os.path.exists(rutaArchivo):
        return alreadyExists(400)
    archivo.save(os.path.join(app.config['UPLOAD_FOLDER'], rutaArchivo))
    print(rutaArchivo)
    print(archivo)
    print(nombreArchivo)
    df = pd.read_excel(os.path.join(PATHFILE, nombreArchivo))
    print(df)
    data = df.to_json()
    print(data)
    try:
        if data:
            url = "http://127.0.0.1:3000/recibirDatos"
            headers = {'Content-Type': 'application/json'}
            response = requests.post(url,data=data, headers=headers)
            print(response)
            try:
                if response.ok:
                    return responseOkJson("Se envió el archivo correctamente", 200)
                else:
                    return f"error al enviar los datos"
            except FileExistsError as e:
                print("error: no se pudo hacer la carga del archivo correctamente", e)
                return processError(e)   
        else:
            print(data)
            return requestsError(400)  
    except FileExistsError as e:
        print("error: no se pudo hacer la carga del archivo correctamente", e)
        return processError(e)