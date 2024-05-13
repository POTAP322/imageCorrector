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

        fetch('/', {
            method: 'POST',
            body: formData
        }).then(response => {
            // Обработка успешной отправки файла
            console.log('Файл успешно отправлен на сервер');
        }).catch(error => {
            // Обработка ошибок
            console.error('Ошибка при отправке файла на сервер:', error);
        });
    }
});