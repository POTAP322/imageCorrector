from flask import Flask, render_template

app = Flask(__name__)


#название страницы
@app.route("/index")
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/info")
def info():
    return render_template("info.html")
if __name__ == "__main__":
    app.run(debug=True)