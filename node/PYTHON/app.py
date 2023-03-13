from flask import Flask, request, render_template, Response
import requests
import pandas as pd
import json

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/cargarCsv', methods=['POST'])
def cargarArchivo():
    #obtener el archivo
    file = request.files['file']
    #validar si el archivo si fue cargado
    if not file:
        return Response(json.dumps({"error": "no se cargó ningún archivo"}), status=400, mimetype='application/json')
    #procesa el archivo y valida si es un csv
    datos =  pd.read_csv(file)
    
    # TODO: CAMBIAR EL NOMBRE DE LAS VARIABLES
    """Varaible datos1 de preuba, cuando @alejose me envíe el archivo empiezo a cambiar las variables por nombre reales más dicientes"""
    datos1 = datos['dato'].mean()
    #convertir los datos procesados en un diccionario (json) para enviarla
    datosJson = {
        'dato': datos1
    }
    
    #enviar los datos procesados al ednpoint (api, microservicio, la monda que sea que esté haciendo/haga vargas)
    urlVarguitas = 'https:localhost:3000/VarguitasDatos'
    response = requests.post(urlVarguitas, Response(json.dumps({datosJson})))
    #validación de que sea ok
    if response.ok:
        return "<p>Datos enviados con extio</p>"
    else:
        return "Varguitas, no te pude enviar los datos, que sad :("

if __name__ == '__main__':
    app.run(debug=True)
    
    