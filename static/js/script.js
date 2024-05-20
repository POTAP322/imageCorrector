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



    const blur_checkbox = document.getElementById('checkbox1');
    const myForm = document.getElementById('myForm');

    blur_checkbox.addEventListener('click', () => {
    if (checkbox1.checked) {
        console.log('Чекбокс нажат');
        // Отправка данных на сервер
        fetch('/process_blur_checkbox', {
            method: 'POST',
            body: JSON.stringify({ my_checkbox: blur_checkbox.checked }),
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

});