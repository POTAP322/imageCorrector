import os
import shutil

import psutil
from PIL import Image, ImageFilter, ImageEnhance, ImageOps
from flask import Flask, render_template, request, send_file




current_dir = os.getcwd()

app = Flask(__name__)
def clear_image_folders():

    for folder in [orig_img_folder, mod_img_folder]:
        for filename in os.listdir(folder):
            file_path = os.path.join(folder, filename)
            if os.path.isfile(file_path):
                os.remove(file_path)
# название страницы
@app.route("/index")
@app.route("/")
def index():
    # очищаем папки с картинками
    clear_image_folders()
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
            uploaded_file.close()




    return render_template('index.html')
@app.route('/process_reset', methods=['GET', 'POST'])
def reset():
    shutil.copy(orig_img_folder + 'orig_image.jpg', os.path.join(mod_img_folder, 'mod_image.jpg'))
    return 'Success'


@app.route('/process_blur_checkbox', methods=['POST'])
def process_blur_checkbox():
    data = request.get_json()
    print(data)
    mod_image_path = os.path.join(mod_img_folder, 'mod_image.jpg')
    mod_image = Image.open(mod_image_path)
    if 'blured_checkbox' in data and data['blured_checkbox'] is True:
        blurred_image = mod_image.filter(ImageFilter.BLUR)

        blurred_image.convert('RGB').save(mod_image_path)
    else:
        print("Галочка не нажата")

    # отправляем ответ в js
    return send_file(mod_image_path, mimetype='image/jpeg')

@app.route('/process_negative_checkbox', methods=['POST'])
def process_negative_checkbox():
    data = request.get_json()
    mod_image_path = os.path.join(mod_img_folder, 'mod_image.jpg')
    mod_image = Image.open(mod_image_path)

    # Преобразование изображения в режим RGB
    mod_image = mod_image.convert('RGB')

    if 'negative_checkbox' in data and data['negative_checkbox'] is True:
        negative_image = ImageOps.invert(mod_image)
        negative_image.save(mod_image_path)
    else:
        print("Галочка не нажата")

    # Отправляем ответ в js
    return send_file(mod_image_path, mimetype='image/jpeg')
@app.route('/process_sharpness_slider', methods=['POST'])
def process_sharpness_slider():
    data = request.get_json()
    # print(data)

    mod_image_path = os.path.join(mod_img_folder, 'mod_image.jpg')
    mod_image = Image.open(mod_image_path)
    mod_image_tmp = mod_image

    sharpness = int(data['sharpnessValue']) / 100.0
    sharped_image = ImageEnhance.Sharpness(mod_image_tmp).enhance(sharpness)

    mod_image.close()
    sharped_image.convert('RGB').save(mod_image_path)


    return send_file(mod_image_path, mimetype='image/jpeg')


@app.route('/process_contrast_slider', methods=['POST'])
def process_contrast_slider():
    data = request.get_json()

    mod_image_path = os.path.join(mod_img_folder, 'mod_image.jpg')
    mod_image = Image.open(mod_image_path)
    contrast = int(data['contrastValue']) / 100.0

    contrast_image = ImageEnhance.Contrast(mod_image).enhance(1 + contrast/4)

    mod_image.close()
    contrast_image.convert('RGB').save(mod_image_path)


    return send_file(mod_image_path, mimetype='image/jpeg')


@app.route('/process_brightness_slider', methods=['POST'])
def process_brightness_slider():
    data = request.get_json()

    mod_image_path = os.path.join(mod_img_folder, 'mod_image.jpg')
    mod_image = Image.open(mod_image_path)
    brightness = int(data['brightnessValue']) / 100.0

    max_brightness_change = 0.5

    contrast_image = ImageEnhance.Brightness(mod_image).enhance(1 + brightness * max_brightness_change)

    mod_image.close()
    contrast_image.convert('RGB').save(mod_image_path)

    return send_file(mod_image_path, mimetype='image/jpeg')



@app.route("/info")
def info():
    return render_template("info.html")


if __name__ == "__main__":
    app.run(debug=True)
