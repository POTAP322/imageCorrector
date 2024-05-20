import os

from PIL import Image, ImageFilter
from flask import Flask, render_template, request

current_dir = os.getcwd()

app = Flask(__name__)


# название страницы
@app.route("/index")
@app.route("/")
def index():
    #очищаем папки с картинками
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
        if uploaded_file.filename != '':
            if len(os.listdir(orig_img_folder)) == 0:
                uploaded_file.save(orig_img_folder + uploaded_file.filename)
            else:
                for filename in os.listdir(orig_img_folder):
                    file_path = os.path.join(orig_img_folder, filename)
                    os.remove(file_path)
                uploaded_file.save(orig_img_folder + uploaded_file.filename)

    return render_template('index.html')


@app.route('/process_blur_checkbox', methods=['POST'])
def process_blur_checkbox():
    data = request.get_json()
    print(data)

    if 'my_checkbox' in data and data['my_checkbox'] is True:
        if len(os.listdir(mod_img_folder)) == 0:
            files_in_folder = os.listdir(orig_img_folder)
            file_name = files_in_folder[0]
            orig_image_path = os.path.join(orig_img_folder, file_name)
            orig_image = Image.open(orig_image_path)

            blurred_image = orig_image.filter(ImageFilter.BLUR)
            blurred_image_path = os.path.join(mod_img_folder, 'blurred_image.jpg')
            blurred_image.convert('RGB').save(blurred_image_path)
    else:
        print("Галочка не нажата")
    return 'OK'


@app.route("/info")
def info():
    return render_template("info.html")


if __name__ == "__main__":
    app.run(debug=True)
