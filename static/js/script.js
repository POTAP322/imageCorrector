document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const fileBtn = document.getElementById('file-btn');
    const img = document.getElementById("selected-image");

    fileBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const selectedFile = event.target.files[0];
        img.src = URL.createObjectURL(selectedFile);
        uploadFile(selectedFile);
        resetTools()
    });

    function uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('/process_img_sender', {
            method: 'POST',
            body: formData
        }).then(response => {
            console.log('Файл успешно отправлен на сервер');
        }).catch(error => {
            console.error('Ошибка при отправке файла на сервер:', error);
        });
    }
    function resetTools() {
        const blur_checkbox = document.getElementById('checkbox1');
        const sharpnessSlider = document.getElementById('sharpnessSlider');
        const contrastSlider = document.getElementById('contrastSlider');
        sharpnessSlider.value = 0;
        contrastSlider.value = 0;
        brightnessSlider.value = 0;
        checkbox1.checked = false;
        checkbox1.disabled = false;
        checkbox2.checked = false;
        checkbox2.disabled = false;
        sharpnessCurValue = 0;
        brightnessCurValue = 0;
        contrastCurValue = 0;

    }

const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', async (event) => {
    const response = await fetch('/process_reset', { method: 'POST' });
    if (response.ok) {
        // Обработка успешного ответа
        img.src = 'static/image/modPicture/mod_image.jpg?' + Math.random();
        resetTools()
    } else {
        console.error('Ошибка при выполнении запроса');
    }
});



    const blur_checkbox = document.getElementById('checkbox1');
    const myForm = document.getElementById('blurForm');

    blur_checkbox.addEventListener('click', () => {
    if (checkbox1.checked) {
        console.log('Чекбокс нажат');
        // Отправка данных на сервер
        fetch('/process_blur_checkbox', {
            method: 'POST',
            body: JSON.stringify({ blured_checkbox: blur_checkbox.checked }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            //обновление изображения на веб-странице

            //math что бы не кешировал браузер старую версию картинки
            img.src = 'static/image/modPicture/mod_image.jpg?' + Math.random();
        }).catch(error => {
            console.error('Ошибка при отправке данных на сервер:', error);
        });
    } else {
        console.log('Чекбокс не нажат');
        img.src = 'static/image/origPicture/orig_image.jpg?' + Math.random();
    }
});


    const negative_checkbox = document.getElementById('checkbox2');
    const myForm2 = document.getElementById('negativeForm');

    negative_checkbox.addEventListener('click', () => {
    if (checkbox2.checked) {
        console.log('Чекбокс нажат');
        // Отправка данных на сервер
        fetch('/process_negative_checkbox', {
            method: 'POST',
            body: JSON.stringify({ negative_checkbox: negative_checkbox.checked }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            //обновление изображения на веб-странице

            //math что бы не кешировал браузер старую версию картинки
            img.src = 'static/image/modPicture/mod_image.jpg?' + Math.random();
        }).catch(error => {
            console.error('Ошибка при отправке данных на сервер:', error);
        });
    } else {
        console.log('Чекбокс не нажат');
        img.src = 'static/image/origPicture/orig_image.jpg?' + Math.random();
    }
});



    const sharpnessSlider = document.getElementById('sharpnessSlider');
    const sharpnessValue = document.getElementById('sharpnessValue');

    let sharpnessCurValue = parseInt(sharpnessSlider.value);

    sharpnessSlider.addEventListener('input', () => {

        const newValue = parseInt(sharpnessSlider.value);
        if (newValue-sharpnessCurValue <=4 && newValue > sharpnessCurValue){
            sharpnessCurValue = newValue;

            sharpnessValue.value = sharpnessSlider.value;
    //console.log(sharpnessValue.value);
            fetch('/process_sharpness_slider', {
            method: 'POST',
            body: JSON.stringify({ sharpnessValue: sharpnessValue.value }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            //обновление изображения на веб-странице
            img.src = 'static/image/modPicture/mod_image.jpg?' + Math.random();
        }).catch(error => {
            console.error('Ошибка при отправке данных на сервер:', error);
        });
        }
        else {
        // то ползунок на старое значение
        sharpnessSlider.value = sharpnessCurValue;
    }



});



    const contrastSlider = document.getElementById('contrastSlider');
    const contrastValue = document.getElementById('contrastValue');

    let contrastCurValue = parseInt(contrastSlider.value);

    contrastSlider.addEventListener('input', () => {

        const newValue = parseInt(contrastSlider.value);
        if (newValue-contrastCurValue <=4 && newValue>contrastCurValue){
            contrastCurValue = newValue;

            contrastValue.value = contrastCurValue;
            fetch('/process_contrast_slider', {
            method: 'POST',
            body: JSON.stringify({ contrastValue: contrastValue.value }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            //обновление изображения на веб-странице
            img.src = 'static/image/modPicture/mod_image.jpg?' + Math.random();
        }).catch(error => {
            console.error('Ошибка при отправке данных на сервер:', error);
        });
        }
        else {
        // то ползунок на старое значение
        contrastSlider.value = contrastCurValue;
    }

});

    const brightnessSlider = document.getElementById('brightnessSlider');
    const brightnessValue = document.getElementById('brightnessValue');

    let brightnessCurValue = parseInt(brightnessSlider.value);

    brightnessSlider.addEventListener('input', () => {

        const newValue = parseInt(brightnessSlider.value);
        if (newValue-brightnessCurValue <=4 && newValue > brightnessCurValue){
            brightnessCurValue = newValue;

            brightnessValue.value = brightnessCurValue;
            fetch('/process_brightness_slider', {
            method: 'POST',
            body: JSON.stringify({ brightnessValue: brightnessValue.value }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            //обновление изображения на веб-странице
            img.src = 'static/image/modPicture/mod_image.jpg?' + Math.random();
        }).catch(error => {
            console.error('Ошибка при отправке данных на сервер:', error);
        });
        }
        else {
        // то ползунок на старое значение
        brightnessSlider.value = brightnessCurValue;
    }

});





});