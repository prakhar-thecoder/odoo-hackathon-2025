from flask import Flask
from flask_cors import CORS
from config import Config
from routes.auth import auth_bp
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY
app.config["SECRET_KEY"] = Config.SECRET_KEY

jwt = JWTManager(app)
CORS(app)

app.register_blueprint(auth_bp, url_prefix="/api/auth")

if __name__ == "__main__":
    app.run(debug=True)
