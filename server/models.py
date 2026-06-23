# models.py: define structures of db for db table 

# db.Model: classes recognized by SQLAlchemy as db tables 
# SerializerMixin: helper class, easy to convert SQLAlchemy model instances into dictionaries (return JSON from Flask API)
# nullable=False: db constraint ensures a record cannot be saved unless specific fields have a value; cannot be empty OR null 

from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy_serializer import SerializerMixin 

# initialize extensions 
db = SQLAlchemy() # db interaction 
bcrypt = Bcrypt() # secure password hashing 

# CLASSES 
# User 
class User(db.Model, SerializerMixin): 
    __tablename__ = 'users'

    # primary key 
    id = db.Column(db.Integer, primary_key=True)

    # User credentials
    username = db.Column(db.String, unique=True, nullable=False)
    # store hashed password 
    password_hash = db.Column(db.String, nullable=False)

class Asset(db.Model, SerializerMixin): 
    __tablename__= 'assets'

    # primary key 
    id = db.Column(db.Integer, primary_key=True)

    # asset detials 
    name = db.Column(db.String, nullable=False)

    purchase_date = db.Column(db.String, nullable=True)

    # foreign key: one-to-many relationship
    # one user -> many assets
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)