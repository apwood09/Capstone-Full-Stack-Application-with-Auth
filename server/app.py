from flask import Flask 
from models import db
from flask_jwt_extended import JWTManager 
from routes.auth import auth_bp
from routes.resources import res_bp
from extensions import bcrypt

# initialize Flaksl application
app = Flask(__name__)
bcrypt.init_app(app)

# CONFIGURATION
# specifies db files (SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///homeKeep.db'
# require to  sign & verify JWT tokens
app.config['JWT_SECRET_KEY'] = 'super-secret'

# INITIALIZATION
# connects db instance -> Flask app
db.init_app(app)
# sets up JWT (JSON Web Token): handles authentication 
jwt = JWTManager(app)

# BLUEPRINTS
# registers modular route files -> organize application logic 
# 'url_prefix' ensures routes are accessed ('/api')
app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(res_bp, url_prefix='/api')
app.register_blueprint(auth_bp, name='auth_blueprint_unique')

# start development server
if __name__ == '__main__': 
    # port 5555 runs app
    # debug=True: enables automatic reloads & error reporting 
    app.run(port=5555, debug=True)