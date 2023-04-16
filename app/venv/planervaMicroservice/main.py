from flask import Flask
from routes.routes import route
from respones.responses import error

app = Flask(__name__)

app.register_blueprint(route)
app.register_blueprint(error)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

