from flask import Flask, render_template, jsonify
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app = Flask(
    __name__,
    template_folder=os.path.join(BASE_DIR, 'templates'),
    static_folder=os.path.join(BASE_DIR, 'static')
)

@app.route('/')
def home():
    return render_template('index.html')

# ✅ New JSON API
@app.route('/api/tools')
def get_tools():
    tools = [
        {"name": "Google AdSense", "category": "Advertising", "status": "Active"},
        {"name": "Upwork", "category": "Freelance", "status": "Verified"},
        {"name": "YouTube Partner Program", "category": "Content", "status": "Trusted"},
        {"name": "Fiverr", "category": "Freelance", "status": "Trusted"},
        {"name": "Tiktok Creator Fund", "category": "Social", "status": "Pending"},
    ]
    return jsonify({"success": True, "count": len(tools), "data": tools})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
