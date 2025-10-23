# =========================================================
#   BuckDuit Backend (Flask API)
# =========================================================
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os

# =========================================================
#   Flask App Initialization
# =========================================================
app = Flask(__name__, static_folder='../buckduit-frontend/build', static_url_path='/')
CORS(app)  # Allow frontend to communicate with backend


# =========================================================
#   Example API Routes
# =========================================================

@app.route('/api/health', methods=['GET'])
def api_health_check():
    """Simple API health check endpoint."""
    return jsonify({"status": "ok", "message": "BuckDuit backend is alive!"}), 200


@app.route('/api/data', methods=['GET'])
def get_data():
    """Example API route returning JSON."""
    sample_data = {
        "title": "BuckDuit API",
        "description": "Flask + React deployment successful",
        "version": "1.0.0"
    }
    return jsonify(sample_data), 200


@app.route('/api/echo', methods=['POST'])
def echo():
    """Echo back POST data."""
    data = request.get_json(silent=True) or {}
    return jsonify({
        "you_sent": data,
        "status": "received"
    }), 200


# =========================================================
#   Serve React Frontend (Build Folder)
# =========================================================
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    """Serve React build files."""
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


# =========================================================
#   Health Check for Render (Internal)
# =========================================================
@app.route('/health', methods=['GET'])
def render_health_check():
    """Render's internal health endpoint."""
    return jsonify({"status": "ok", "message": "Render health check passed"}), 200


# =========================================================
#   Main Entrypoint
# =========================================================
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    print(f"Running on port {port} ...")
    app.run(host='0.0.0.0', port=port, debug=True)
