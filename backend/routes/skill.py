from flask import Blueprint, request, jsonify
from db import get_db_connection

skill_bp = Blueprint('skill', __name__)

@skill_bp.route('/', methods=['GET'])
def get_skills():
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)
    cur.execute("SELECT * FROM skills WHERE approved=1")
    skills = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(skills)

@skill_bp.route('/', methods=['POST'])
def add_skill():
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO skills (name, tags, approved) VALUES (%s, %s, %s)",
            (data['name'], data.get('tags', ''), False)
        )
        conn.commit()
        return jsonify({'message': 'Skill submitted for approval'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    finally:
        cur.close()
        conn.close()
