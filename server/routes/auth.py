# handles creation of new user & JWT tokens

from flask import Blueprint, request, jsonify
from models import db, User, Bcrypt
from flask_jwt_extended import create_access_token
from extensions import bcrypt

# Blueprint: organize auth routes separately from rest of app
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup(): 
    data = request.json

    # generate hash using bcrypt 
    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    # create user object with hashed password 
    new_user = User(username=data['username'], password_hash=hashed_pw)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfuly"}), 201

@auth_bp.route('/login', methods=['POST'])
def login(): 
    data = request.json

    # find user by username 
    user = User.query.filter_by(username=data['username']).first()

    # verify user exist AND provided password matches stored hash 
    if user and bcrypt.check_password_hash(user.password_hash, data['password']): 
        # generate unique JWT token keep user logged in 
        # store user's ID inside token as ID 
        token = create_access_token(identity=str(user.id))
        return jsonify(access_token=token), 200
    
    # return 401: unauthorized (login fails)
    return jsonify({"message": "Invalid credentials"}), 401