# handles creation of new user & JWT tokens

from flask import Blueprint, request, jsonify
from models import db, User, Bcrypt
from flask_jwt_extended import create_access_token
from extensions import bcrypt

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup(): 
    data = request.json
    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password_hash=hashed_pw)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfuly"}), 201

@auth_bp.route('/login', methods=['POST'])
def login(): 
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password_hash, data['password']): 
        token = create_access_token(identity=str(user.id))
        return jsonify(access_token=token), 200
    return jsonify({"message": "Invalid credentials"}), 401