from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import get_db_connection

admin_bp = Blueprint('admin', __name__)

def is_admin(user_id):
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)
    cur.execute("SELECT roles FROM users WHERE id=%s", (user_id,))
    user = cur.fetchone()
    cur.close()
    conn.close()
    return user and 'admin' in user['roles']

@admin_bp.route('/users/<int:user_id>/ban', methods=['PUT'])
@jwt_required()
def ban_user(user_id):
    admin_id = get_jwt_identity()
    if not is_admin(admin_id):
        return jsonify({'error': 'Unauthorized'}), 403
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("UPDATE users SET banned=1 WHERE id=%s", (user_id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'User banned'})

@admin_bp.route('/skills/<int:skill_id>/approve', methods=['PUT'])
@jwt_required()
def approve_skill(skill_id):
    admin_id = get_jwt_identity()
    if not is_admin(admin_id):
        return jsonify({'error': 'Unauthorized'}), 403
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("UPDATE skills SET approved=1 WHERE id=%s", (skill_id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Skill approved'})
