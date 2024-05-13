import os

from PIL import Image, ImageFilter
from flask import Flask, render_template, request

current_dir = os.getcwd()

app = Flask(__name__)


#название страницы
@app.route("/index")
@app.route("/")
def index():
    return render_template("index.html")

img_folder = 'static/image/'
@app.route('/', methods=['GET', 'POST'])
def upload_image():
    if request.method == 'POST':
        # Получаем файл из запроса
        uploaded_file = request.files['file']
        if uploaded_file.filename != '':
            if len(os.listdir(img_folder)) == 0:
                uploaded_file.save('static/image/' + uploaded_file.filename)
            else:
                for filename in os.listdir(img_folder):
                    file_path = os.path.join(img_folder, filename)
                    os.remove(file_path)
                uploaded_file.save('static/image/' + uploaded_file.filename)


    return render_template('index.html')
@app.route("/info")
def info():
    return render_template("info.html")
if __name__ == "__main__":
    app.run(debug=True)