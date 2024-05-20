import os
import shutil

from PIL import Image, ImageFilter
from flask import Flask, render_template, request, send_file

current_dir = os.getcwd()

app = Flask(__name__)


# название страницы
@app.route("/index")
@app.route("/")
def index():
    # очищаем папки с картинками
    for filename in os.listdir(orig_img_folder):
        file_path = os.path.join(orig_img_folder, filename)
        if os.path.isfile(file_path):
            os.remove(file_path)
    for filename in os.listdir(mod_img_folder):
        file_path = os.path.join(mod_img_folder, filename)
        if os.path.isfile(file_path):
            os.remove(file_path)

    return render_template("index.html")


orig_img_folder = 'static/image/origPicture/'
mod_img_folder = 'static/image/modPicture/'


@app.route('/process_img_sender', methods=['GET', 'POST'])
def upload_image():
    if request.method == 'POST':
        # Получаем файл из запроса
        uploaded_file = request.files['file']
        if len(os.listdir(orig_img_folder)) <= 1:
            uploaded_file.save(orig_img_folder + 'orig_image.jpg')
            shutil.copy(orig_img_folder + 'orig_image.jpg', os.path.join(mod_img_folder, 'mod_image.jpg'))

    return render_template('index.html')


@app.route('/process_blur_checkbox', methods=['POST'])
def process_blur_checkbox():
    data = request.get_json()
    print(data)

    if 'my_checkbox' in data and data['my_checkbox'] is True:
        mod_image_path = os.path.join(mod_img_folder, 'mod_image.jpg')
        mod_image = Image.open(mod_image_path)
        blurred_image = mod_image.filter(ImageFilter.BLUR)

        blurred_image.convert('RGB').save(mod_image_path)
    else:
        print("Галочка не нажата")

    # отправляем ответ
    return send_file(mod_image_path, mimetype='image/jpeg')


@app.route("/info")
def info():
    return render_template("info.html")


if __name__ == "__main__":
    app.run(debug=True)
