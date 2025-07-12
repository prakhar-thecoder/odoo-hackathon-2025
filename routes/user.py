from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import get_db_connection

user_bp = Blueprint('user', __name__)

@user_bp.route('/me', methods=['GET'])
@jwt_required()
def get_my_profile():
    user_id = get_jwt_identity()
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)
    cur.execute("SELECT * FROM users WHERE id=%s", (user_id,))
    user = cur.fetchone()
    cur.close()
    conn.close()
    if user:
        user.pop('password_hash', None)
        return jsonify(user)
    else:
        return jsonify({'error': 'User not found'}), 404

@user_bp.route('/me', methods=['PUT'])
@jwt_required()
def update_my_profile():
    user_id = get_jwt_identity()
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "UPDATE users SET name=%s, location=%s, profile_photo=%s, is_public=%s, updated_at=NOW() WHERE id=%s",
        (data.get('name'), data.get('location'), data.get('profile_photo'), data.get('is_public', True), user_id)
    )
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Profile updated'})
