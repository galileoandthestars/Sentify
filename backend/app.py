import os
import re
import jwt
import cv2
import base64
import spotipy
import numpy as np
from deepface import DeepFace
from flask_mysqldb import MySQL
from hashlib import pbkdf2_hmac
from pyembed.core import PyEmbed
from flask_mysqldb import MySQLdb
from spotipy import SpotifyClientCredentials
from flask import Flask, Blueprint, request, Response, jsonify
from settings import MYSQL_DB, MYSQL_PASSWORD, MYSQL_USER, JWT_SECRET_KEY, CLIENT_ID, CLIENT_SECRET

app = Flask(__name__)

app.config["MYSQL_USER"] = MYSQL_USER
app.config["MYSQL_PASSWORD"] = MYSQL_PASSWORD
app.config["MYSQL_DB"] = MYSQL_DB
app.config["MYSQL_CURSORCLASS"] = "DictCursor"

db = MySQL(app)

auth_manager = SpotifyClientCredentials(
    client_id=CLIENT_ID, client_secret=CLIENT_SECRET
)
sp = spotipy.Spotify(auth_manager=auth_manager)

# faceCascade = cv2.CascadeClassifier(
#     cv2.data.haarcascades + "haarcascade_frontalface_default.xml")


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


def fetch_song(emotion):
    # TODO
    # FETCH USER INFO (LIKED SONGS, FAVORITE GENRES, ...)
    # REMEMBER TO CALL THE RECOMMENDATION ENDPOINT MULTIPLE TIMES
    # WITH DIFFERENT SEEDS FOR MORE SONGS

    min_valence, min_arousal = 0, 0
    max_valence, max_arousal = 1, 1
    if emotion == "happy":
        min_valence, min_arousal = 0.5, 0.5
        # max_valence, max_arousal = 1, 1
    elif emotion == "sad":
        # min_valence, min_arousal = 0, 0
        max_valence, max_arousal = 0.5, 0.5
    elif emotion == "angry":
        min_valence, min_arousal = 0, 0.5
        max_valence, max_arousal = 0.5, 1
    elif emotion == "neutral":
        min_valence, min_arousal = 0.5, 0
        max_valence, max_arousal = 1, 0.5

    recommendations = sp.recommendations(
        seed_artists=["3nlpTZci9O5W8RsNoNH559"], seed_genres=["classical", "rock"], seed_tracks=["6YwqziI3H71IMishKRTHHg"],
        min_energy=min_arousal, max_energy=max_arousal,
        min_valence=min_valence, max_valence=max_valence,
        limit=1
    )

    song_ids = [recommendation["id"]
                for recommendation in recommendations["tracks"]]

    htmls = [PyEmbed().embed("https://open.spotify.com/track/" + song_id)
             for song_id in song_ids]

    embed_info = {"title": [], "src": []}
    for html in htmls:
        embed_info["title"].append(
            re.search(r"\"(S.*?)\"", html).group(1))
        embed_info["src"].append(re.search(r"\"(h.*?)\"", html).group(1))

    return embed_info

    # result = db_read(
    #     """SELECT s.songId, m.MoodName FROM song s, song_mood sm, mood m WHERE s.songId=sm.songID AND m.MoodId=sm.MoodID"""
    # )
    # songs = [song for song in result if song["MoodName"] == emotion]
    # index = np.random.randint(len(songs) - 1)
    # selectedSong = songs[index]["songId"]

    # songURL = db_read(
    #     "Select s.songURL from Song s WHERE s.songId = " + str(selectedSong)
    # )
    # print(songURL)
    # return songURL[0]["songURL"]


authentication = Blueprint("authentication", __name__)


@authentication.route("/register", methods=["POST", "GET"])
def register_user():
    username = request.json["name"]
    user_password = request.json["pass"]
    user_confirm_password = request.json["confPass"]

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
            return jsonify({"username": username})
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


@authentication.route("/send-image", methods=['POST', 'GET'])
def receive_image():
    imageData = request.json.get('imageData')
    splitData = imageData.split(',')
    imageData = splitData[1].replace(' ', '+')
    imageData = base64.b64decode(imageData)
    # Save the image data as a file
    with open('image.png', 'wb') as f:
        f.write(imageData)

    imageData = cv2.imread("./image.png")

    # gray = cv2.cvtColor(imageData, cv2.COLOR_BGR2GRAY)
    # faces = faceCascade.detectMultiScale(gray, 1.05, 6)

    # count = 0
    # for (x, y, w, h) in faces:
    #     face = imageData[y:y + h, x:x + w]  # slice the face from the image
    #     cv2.imwrite(str(count) + '.png', face)  # save the image
    #     count += 1

    # imageData = cv2.imread("./0.png")

    result = DeepFace.analyze(
        imageData, actions=['emotion'], enforce_detection=False)

    recog_emotion = result['dominant_emotion']

    return jsonify({'emotion': recog_emotion, 'status': 'success'})


@authentication.route("/recommend-song", methods=['POST'])
def recommend_song():
    embed_info = fetch_song(request.json.get('emotion'))
    return jsonify({"embed-info": embed_info})


app.register_blueprint(authentication, url_prefix="/api/auth")

if __name__ == "__main__":
    app.run()
