from flask import Flask
from flask_jwt_extended import JWTManager
from config import Config

app = Flask(__name__)
app.config['SECRET_KEY'] = Config.SECRET_KEY
app.config['JWT_SECRET_KEY'] = Config.JWT_SECRET_KEY

jwt = JWTManager(app)

# Register Blueprints
from routes.auth import auth_bp
from routes.user import user_bp
from routes.skill import skill_bp
from routes.swap import swap_bp
from routes.feedback import feedback_bp
from routes.admin import admin_bp
from routes.message import message_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(user_bp, url_prefix='/api/users')
app.register_blueprint(skill_bp, url_prefix='/api/skills')
app.register_blueprint(swap_bp, url_prefix='/api/swaps')
app.register_blueprint(feedback_bp, url_prefix='/api/feedbacks')
app.register_blueprint(admin_bp, url_prefix='/api/admin')
app.register_blueprint(message_bp, url_prefix='/api/messages')

if __name__ == '__main__':
    app.run(debug=True)
