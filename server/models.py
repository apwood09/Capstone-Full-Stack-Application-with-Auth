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

# Asset
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

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "purchase_date": self.purchase_date,
            "user_id": self.user_id
        }

# Log
class Log(db.Model): 
    __tablename__ = 'log'
    
    id = db.Column(db.Integer, primary_key=True)
    asset_id = db.Column(db.Integer, db.ForeignKey('asset.id'), nullable=False)
    description = db.Column(db.String(200))
    service_date = db.Column(db.String(20))
    document_url = db.Column(db.String(500))

    def to_dict(self): 
        return {
            "id": self.id,
            "description": self.description, 
            "service_date": self.service_date, 
            "document_url": self.document_url
        }