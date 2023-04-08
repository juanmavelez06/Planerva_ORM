from flask import Flask
from routes.routes import nombreRutas 

app = Flask(__name__)
app.register_blueprint(nombreRutas)

if __name__ == '__main__':
    app.run()