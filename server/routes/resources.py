# handles CRUD
# requires @jwt_required() & get_jwt_identity(): ensure user accesses their own data

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Asset, Log

res_bp = Blueprint('res_bp', __name__)

# ASSET routes 
@res_bp.route('/assets', methods=['GET'])
@jwt_required()
def get_assets():
    user_id = get_jwt_identity()
    assets = Asset.query.filter_by(user_id=user_id).all()
    return jsonify([a.to_dict() for a in assets]), 200

@res_bp.route('/assets', methods=['POST'])
@jwt_required()
def create_asset():
    user_id = get_jwt_identity()
    data = request.json
    new_asset = Asset(
        name=data['name'], 
        purchase_date=data.get('purchase_date'), 
        document_url=data.get('document_url'),
        user_id=user_id
    )
    db.session.add(new_asset)
    db.session.commit()
    return jsonify(new_asset.to_dict()), 201

@res_bp.route('/assets/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_asset(id): 
    user_id = get_jwt_identity()
    asset = Asset.query.filter_by(id=id, user_id=user_id).first()

    if not asset: 
        return jsonify({"message": "Asset not found"}), 404

    db.session.delete(asset)
    db.session.commit()
    return jsonify({"message": "Asset deleted"}), 200

# LOG routes 
@res_bp.route('/assets/<int:asset_id>/logs', methods=['GET'])
@jwt_required()
def get_logs(asset_id): 
    # ensure asset exists & belongs to user
    Asset.query.filter_by(id=asset_id, user_id=get_jwt_identity()).first_or_404()
    
    logs = Log.query.filter_by(asset_id=asset_id).all()
    return jsonify([l.to_dict() for l in logs]), 200

@res_bp.route('/assets/<int:asset_id>/logs', methods=['POST'])
@jwt_required()
def create_log(asset_id): 
    # ensure asset exists & belongs to user
    Asset.query.filter_by(id=asset_id, user_id=get_jwt_identity()).first_or_404()
    
    data = request.json 
    new_log = Log(asset_id=asset_id, **data)
    db.session.add(new_log)
    db.session.commit()
    return jsonify(new_log.to_dict()), 201

@res_bp.route('/logs/<int:log_id>', methods=['DELETE'])
@jwt_required()
def delete_log(log_id): 
    # ensure log belongs to asset owned by current user 
    log = Log.query.join(Asset).filter(Log.id == log_id, Asset.user_id == get_jwt_identity()).first_or_404()
    db.session.delete(log)
    db.session.commit()
    return jsonify({"message": "Log deleted successfully"}), 200