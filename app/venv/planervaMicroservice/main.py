from flask import Flask
from routes.routes import route
from respones.responses import error

app = Flask(__name__)

app.register_blueprint(route)
app.register_blueprint(error)


if __name__ == '__main__':
    app.run(debug=True, host='54.211.106.35')
