from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import get_db_connection

swap_bp = Blueprint('swap', __name__)

@swap_bp.route('/', methods=['POST'])
@jwt_required()
def request_swap():
    data = request.json
    user_id = get_jwt_identity()
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO swaps (requester_id, responder_id, skill_offered_id, skill_wanted_id, status) VALUES (%s, %s, %s, %s, %s)",
            (user_id, data['responder_id'], data['skill_offered_id'], data['skill_wanted_id'], 'pending')
        )
        conn.commit()
        return jsonify({'message': 'Swap request sent'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    finally:
        cur.close()
        conn.close()

@swap_bp.route('/', methods=['GET'])
@jwt_required()
def get_swaps():
    user_id = get_jwt_identity()
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)
    cur.execute("SELECT * FROM swaps WHERE requester_id=%s OR responder_id=%s", (user_id, user_id))
    swaps = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(swaps)
