from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/send-image', methods=['POST'])
def receive_image():
    imageData = request.json.get('imageData')
    # Save the image data as a file
    with open('image.jpg', 'wb') as f:
        f.write(imageData.encode('utf-8'))
    return jsonify({'status': 'success'})


