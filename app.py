from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

# --- Enable CORS (allow React frontend to access API) ---
CORS(app)

# --- Root route (test connection) ---
@app.route('/')
def home():
    return '''
        <div style="font-family: Arial; text-align:center; margin-top: 80px;">
            <h2 style="color: green;">✅ BuckDuit Flask is working locally!</h2>
            <p>If you see this message, your Flask app is fully functional 💡</p>
        </div>
    '''

# --- API route for tools ---
@app.route('/api/tools', methods=['GET'])
def get_tools():
    tools_data = {
        "success": True,
        "count": 5,
        "data": [
            {"name": "Google Adsense", "category": "Advertising", "status": "Active"},
            {"name": "Upwork", "category": "Freelance", "status": "Verified"},
            {"name": "YouTube Partner Program", "category": "Content", "status": "Trusted"},
            {"name": "Fiverr", "category": "Freelance", "status": "Trusted"},
            {"name": "TikTok Creator Fund", "category": "Social", "status": "Pending"}
        ]
    }
    return jsonify(tools_data)

# --- Health Check (used by Render) ---
@app.route('/health')
def health():
    return {"status": "ok"}, 200

# --- Entry point ---
if __name__ == "__main__":
    # Local development server
    app.run(host="0.0.0.0", port=5000, debug=True)
