from flask import Blueprint, request, jsonify
from db import get_db_connection
import bcrypt
from flask_jwt_extended import create_access_token
from datetime import datetime, timedelta

auth_bp = Blueprint("auth", __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Missing data"}), 400

    # Connect to DB
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("USE skill_swap")

    # Check if user already exists
    cursor.execute("SELECT * FROM users WHERE email = %s", (data['email'],))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        return jsonify({"error": "User already exists"}), 409

    # Hash password
    hashed_pw = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    # Extract fields
    name = data['name']
    email = data['email']
    location = data.get('location', None)
    profile_photo = data.get('profile_photo', "")
    is_public = data.get('is_public', True)
    roles = data.get('roles', "user")  # default
    banned = False
    created_at = datetime.utcnow()
    updated_at = created_at

    # Insert into DB
    cursor.execute("""
        INSERT INTO users (name, location, profile_photo, email, password_hash, is_public, roles, banned, created_at, updated_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        name, location, profile_photo, email, hashed_pw.decode('utf-8'),
        is_public, roles, banned, created_at, updated_at
    ))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "User registered successfully"}), 201


# ============================
# 🔑 Login Route
# ============================
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Missing data"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # Fetch user
    cursor.execute("SELECT * FROM users WHERE email = %s", (data['email']))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if not user or not bcrypt.checkpw(data['password'].encode('utf-8'), user['password_hash'].encode('utf-8')):
        return jsonify({"error": "Invalid email or password"}), 401

    # Generate JWT
    token = create_access_token(identity=user['id'], expires_delta=timedelta(hours=2))

    return jsonify({
        "token": token,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "location": user["location"],
            "profile_photo": user["profile_photo"],
            "is_public": user["is_public"],
            "roles": user["roles"],
            "banned": user["banned"]
        }
    })
