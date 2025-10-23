import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

# =========================================================
#   Flask App Initialization
# =========================================================
# IMPORTANT: This points to your React build folder
# If your React folder is named "buckduit-frontend", keep this as-is.
# If you renamed it to "frontend", change the path below accordingly.
app = Flask(__name__, static_folder='buckduit-frontend/build', static_url_path='/')
CORS(app)


# =========================================================
#   Example API Routes
# =========================================================
@app.route('/api/health', methods=['GET'])
def health_check():
    """Simple health check endpoint."""
    return jsonify({"status": "ok", "message": "BuckDuit backend is alive!"}), 200


@app.route('/api/data', methods=['GET'])
def get_data():
    """Example API route returning JSON."""
    sample_data = {
        "title": "BuckDuit API",
        "description": "Flask + React deployment test",
        "version": "1.0.0"
    }
    return jsonify(sample_data), 200


@app.route('/api/echo', methods=['POST'])
def echo():
    """Echo back POST data."""
    data = request.get_json(silent=True) or {}
    return jsonify({"you_sent": data, "status": "received"}), 200


# =========================================================
#   Serve React Frontend (Build Folder)
# =========================================================
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    """
    Serves the React frontend build files.
    If a route doesn't match an API endpoint, return index.html.
    """
    build_dir = app.static_folder  # e.g. buckduit-frontend/build
    requested_path = os.path.join(build_dir, path)

    # Helpful debug in logs
    print(f"[serve] static_folder={build_dir}  path={path}  resolved={requested_path}")

    if path and os.path.exists(requested_path):
        return send_from_directory(build_dir, path)
    # Fallback to SPA index.html
    return send_from_directory(build_dir, 'index.html')


# =========================================================
#   Main Entrypoint
# =========================================================
if __name__ == '__main__':
    # Works locally and on Render (Render sets $PORT)
    port = int(os.environ.get("PORT", 5000))
    print(f"Static folder path: {app.static_folder}")
    print(f"Running on port {port} ...")

    app.run(
        host='0.0.0.0',
        port=port,
        debug=True
    )
