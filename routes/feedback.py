from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import get_db_connection

feedback_bp = Blueprint('feedback', __name__)

@feedback_bp.route('/', methods=['POST'])
@jwt_required()
def submit_feedback():
    data = request.json
    user_id = get_jwt_identity()
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO feedbacks (swap_id, from_user, to_user, rating, comment) VALUES (%s, %s, %s, %s, %s)",
            (data['swap_id'], user_id, data['to_user'], data['rating'], data.get('comment', ''))
        )
        conn.commit()
        return jsonify({'message': 'Feedback submitted'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    finally:
        cur.close()
        conn.close()

@feedback_bp.route('/user/<int:user_id>', methods=['GET'])
def get_user_feedback(user_id):
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)
    cur.execute("SELECT * FROM feedbacks WHERE to_user=%s", (user_id,))
    feedbacks = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(feedbacks)
