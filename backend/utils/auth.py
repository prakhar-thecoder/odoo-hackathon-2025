from flask_jwt_extended import get_jwt_identity
from db import get_db_connection

def is_admin():
    user_id = get_jwt_identity()
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)
    cur.execute("SELECT roles FROM users WHERE id=%s", (user_id,))
    user = cur.fetchone()
    cur.close()
    conn.close()
    return user and 'admin' in user['roles']
