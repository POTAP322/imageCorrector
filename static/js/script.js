document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const fileBtn = document.getElementById('file-btn');
    const img = document.getElementById("selected-image")

    fileBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const selectedFile = event.target.files[0];
        img.src = URL.createObjectURL(selectedFile);

    });
    document.getElementById('file-input').addEventListener('change', function() {
           document.getElementById('upload-button').click();
       });
});