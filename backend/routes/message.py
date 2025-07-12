from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import get_db_connection

message_bp = Blueprint('message', __name__)

@message_bp.route('/', methods=['POST'])
@jwt_required()
def send_message():
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO messages (title, body, recipients, expires_at) VALUES (%s, %s, %s, %s)",
            (data['title'], data['body'], data.get('recipients', 'all'), data.get('expires_at'))
        )
        conn.commit()
        return jsonify({'message': 'Message sent'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    finally:
        cur.close()
        conn.close()

@message_bp.route('/', methods=['GET'])
def get_messages():
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)
    cur.execute("SELECT * FROM messages")
    messages = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(messages)
