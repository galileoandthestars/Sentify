import os
import jwt
from flask import Flask, redirect
from flask_cors import CORS
from flask_mysqldb import MySQL
from hashlib import pbkdf2_hmac
from flask_mysqldb import MySQLdb
from flask import Blueprint, request, Response, jsonify
from settings import MYSQL_DB, MYSQL_PASSWORD, MYSQL_USER, JWT_SECRET_KEY

app = Flask(__name__)

app.config["MYSQL_USER"] = MYSQL_USER
app.config["MYSQL_PASSWORD"] = MYSQL_PASSWORD
app.config["MYSQL_DB"] = MYSQL_DB
app.config["MYSQL_CURSORCLASS"] = "DictCursor"

db = MySQL(app)


def validate_user_input(input_type, **kwargs):
    if input_type == "authentication":
        if len(kwargs["username"]) <= 45 and len(kwargs["password"]) <= 255:
            return True
        else:
            return False


def generate_salt():
    salt = os.urandom(16)
    return salt.hex()


def generate_hash(plain_password, password_salt):
    password_hash = pbkdf2_hmac(
        "sha256",
        b"%b" % bytes(plain_password, "utf-8"),
        b"%b" % bytes(password_salt, "utf-8"),
        10000,
    )
    return password_hash.hex()


def db_write(query, params):
    cursor = db.connection.cursor()
    try:
        cursor.execute(query, params)
        db.connection.commit()
        cursor.close()

        return True

    except MySQLdb._exceptions.IntegrityError:
        cursor.close()
        return False


def db_read(query, params=None):
    cursor = db.connection.cursor()
    if params:
        cursor.execute(query, params)
    else:
        cursor.execute(query)

    entries = cursor.fetchall()
    cursor.close()

    content = []

    for entry in entries:
        content.append(entry)

    return content


def generate_jwt_token(content):
    return jwt.encode(content, JWT_SECRET_KEY, algorithm="HS256")


def validate_user(username, password):
    current_user = db_read(
        """SELECT * FROM users WHERE Username = %s""", (username,))

    if len(current_user) == 1:
        saved_password_hash = current_user[0]["password_hash"]
        saved_password_salt = current_user[0]["password_salt"]
        password_hash = generate_hash(password, saved_password_salt)

        if password_hash == saved_password_hash:
            user_id = current_user[0]["UserId"]
            jwt_token = generate_jwt_token({"UserId": user_id})
            return jwt_token
        else:
            return False
    else:
        return False


authentication = Blueprint("authentication", __name__)


@authentication.route("/register", methods=["POST", "GET"])
def register_user():
    username = request.form.get("username")
    user_password = request.form.get("password")
    user_confirm_password = request.form.get("confirmation_password")

    if user_password == user_confirm_password and validate_user_input(
        "authentication", username=username, password=user_password
    ):
        password_salt = generate_salt()
        password_hash = generate_hash(user_password, password_salt)

        if db_write(
            """INSERT INTO users (Username, password_salt, password_hash) VALUES (%s, %s, %s)""",
            (username, password_salt, password_hash)
        ):
            # Registration Successful
            # 201 = CREATED
            return redirect("http://localhost:3000/login")
        else:
            # Registration Failed
            # 409 = CONFLICT
            return Response(status=409)
    else:
        # Registration Failed
        # 400 - BAD REQUEST
        return Response(status=400)


@authentication.route("/login", methods=["POST"])
def login_user():
    username = request.json["email"]
    user_password = request.json["pass"]

    user_token = validate_user(username, user_password)

    if user_token:
        return jsonify({"jwt_token": user_token})
    else:
        # 401 = UNAUTHORIZED
        return Response(status=401)


app.register_blueprint(authentication, url_prefix="/api/auth")

if __name__ == "__main__":
    app.run()
