from flask import Flask, request, jsonify
from flask_cors import CORS
from chatgpt import get_chatgpt_response

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message')
    
    # Call the function that interacts with ChatGPT
    bot_reply = get_chatgpt_response(user_message)
    
    return jsonify({'reply': bot_reply})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)