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
        img.src = 'static/image/modPicture/blurred_image.jpg'
    } else {
        console.log('Чекбокс не нажат');

        const folderPath = 'static/image/origPicture/';
        const fs = require('fs');
        const files = fs.readdirSync(folderPath);

        img.src = 'static/image/origPicture/' + files[0];

    }
    fetch('/process_blur_checkbox', {
        method: 'POST',
        body: JSON.stringify({ my_checkbox: blur_checkbox.checked }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
});






});