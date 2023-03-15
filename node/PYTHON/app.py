import os
from flask import Flask, redirect, render_template, request, Response, jsonify
import pandas as pd
import json
import requests

app = Flask(__name__, template_folder="templates", static_folder="static")

EXTENSIONES_PERMITIDAS = {'.csv', '.xlsx'}

#variable para almacenar el diccionario/Json
datosJson = {}

# servidor de node
url = 'http://localhost:3000/receptorDatos'

@app.route('/')
def main():
    return render_template("index.html")

#validar las extensiones
def extensionPermitida(filename):
    _, ext = os.path.splitext(filename)
    return ext.lower() in EXTENSIONES_PERMITIDAS

def mensajeErrorArchivos(mensaje):
    response = jsonify({"mensaje": mensaje})
    response.status_code = 409
    return response

#ruta/función para recepcionar el archivo
@app.route('/cargarCsv', methods=['POST', 'GET'])
def recibir_archivo():
    archivo = request.files['file']
    global datosJson
    if archivo and extensionPermitida(archivo.filename):
        if archivo.filename.endswith('.csv'):
            datos = pd.read_csv(archivo, encoding='ISO-8859-1')
        elif archivo.filename.endswith('xlsx'):
            datos = pd.read_excel(archivo)   
        datosJson = {
            "datos": datos.to_json()
        }
        return "Archivo cargado con éxito (:"
    
    ##Enviar el archivo al servidor de node
    try:
            headers = {'Content-type': 'application/json'}
            response = requests.post(url, data=json.dumps(datosJson), headers=headers)
            print(response)
            if response.status_code == 200:
                print("Datos enviados al servidor con éxito")
            else:
                print("No se pudo enviar los datos al servidor")
    except ConnectionError as e:
            print(f"error al enviar los datos {e}")
            
    ##Error si no coincide la extensión con las permitidas
    else:
        return mensajeErrorArchivos("Archivo no permitido :(, solo se pueden cargar archivos CSV y XLSX")

if __name__ == '__main__':
    app.run(debug=True)