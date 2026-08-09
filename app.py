from flask import Flask, request, send_file

app = Flask(__name__)


@app.route("/", methods=["GET"])
def dashboard():
    return send_file("index.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return send_file("login.html")

    username = (request.form.get("username") or "").strip()
    password = request.form.get("password") or ""

    # TODO: Replace this stub with database-backed credential lookup.
    # TODO: Hash and verify passwords with werkzeug.security.

    if not username or not password:
        return {"status": "error", "message": "Username and password are required."}, 400

    if len(password) < 8:
        return {"status": "error", "message": "Password must be 8+ characters long."}, 400

    return {
        "status": "success",
        "message": f"Authentication request received for {username}.",
        "remember_me": request.form.get("rememberMe") == "on",
    }


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
