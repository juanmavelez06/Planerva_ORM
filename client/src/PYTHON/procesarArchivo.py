from flask import Flask, render_template, redirect
import time
import pandas as pd

app = Flask(__name__)

@app.route('/procesarArchivoCSV')
def procesarCsv():
    pass


if __name__ == '__main__':
    app.run(debug=True)