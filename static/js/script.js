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


    const checkbox1 = document.getElementById('checkbox1');
    const myForm = document.getElementById('myForm');




    checkbox1.addEventListener('click', () => {
    if (checkbox1.checked) {
        console.log('Чекбокс нажат');
        // Отправка данных на сервер
    } else {
        console.log('Чекбокс не нажат');

    }
    fetch('/process_checkbox', {
        method: 'POST',
        body: JSON.stringify({ my_checkbox: checkbox1.checked }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
});






});