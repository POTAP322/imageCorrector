import os

from PIL import Image, ImageFilter
from flask import Flask, render_template, request

current_dir = os.getcwd()

app = Flask(__name__)


# название страницы
@app.route("/index")
@app.route("/")
def index():
    return render_template("index.html")


orig_img_folder = 'static/image/origPicture/'
mod_img_folder = 'static/image/modPicture/'


@app.route('/process_img_sender', methods=['GET', 'POST'])
def upload_image():
    if request.method == 'POST':
        # Получаем файл из запроса
        uploaded_file = request.files['file']
        if uploaded_file.filename != '':
            if len(os.listdir(orig_img_folder)) == 0:
                uploaded_file.save(orig_img_folder + uploaded_file.filename)
            else:
                for filename in os.listdir(orig_img_folder):
                    file_path = os.path.join(orig_img_folder, filename)
                    os.remove(file_path)
                uploaded_file.save(orig_img_folder + uploaded_file.filename)

    return render_template('index.html')


@app.route('/process_checkbox', methods=['POST'])
def process_checkbox():
    data = request.get_json()
    print(data)

    if 'my_checkbox' in data and data['my_checkbox'] is True:
        print("Галочка нажата")
    else:
        print("Галочка не нажата")
    return 'OK'


@app.route("/info")
def info():
    return render_template("info.html")


if __name__ == "__main__":
    app.run(debug=True)
