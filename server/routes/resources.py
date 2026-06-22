# handles CRUD
# requires @jwt_required() & get_jwt_identity(): ensure user accesses their own data

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Asset

res_bp = Blueprint('res_bp', __name__)

@res_bp.route('/assets', methods=['GET', 'POST'])
@jwt_required()
def handle_assets(): 
    user_id = get_jwt_identity()

    if request.method == 'GET': 
        assets = Asset.query.filter_by(user_id=user_id).all()
        return jsonify([a.to.dict() for a in assets]), 200

    if request.method == 'POST': 
        data = request.json
        new_assest = Asset(name=data['name'], user_id=user_id)
        db.session.add(new_assest)
        db.session.commit()
        return jsonify(new_assest.to_dict()), 201

@res_bp.routes('/assets/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_asset(id): 
    user_id = get_jwt_identity()
    asset = Asset.query.filter_by(id=id, user_id=user_id).first()

    if not asset: 
        return jsonify({"message": "Asset not found"}), 404

    db.session.delete(asset)
    db.session.commit()
    return jsonify({"message": "Asset deleted"}), 200