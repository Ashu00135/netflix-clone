document.getElementById('ocr-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    const formData = new FormData();
    const imageFile = document.getElementById('image').files[0];

    if (!imageFile) {
        alert('Please select an image file!');
        return;
    }

    formData.append('image', imageFile);

    // Disable the form during the request to prevent multiple submissions
    const button = document.querySelector('button');
    button.disabled = true;
    button.innerText = 'Processing...';

    // Perform the POST request to the /api endpoint
    fetch('/api', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())  // Parse the response as JSON
    .then(data => {
        button.disabled = false;  // Re-enable the button after the request

        // Check if the response contains the extracted text
        if (data.extracted_text) {
            document.getElementById('result').classList.remove('hidden');
            document.getElementById('output').innerText = data.extracted_text;
            document.getElementById('error').classList.add('hidden');
        } else {
            // If no extracted text, show error
            document.getElementById('error').classList.remove('hidden');
            document.getElementById('error-message').innerText = 'Failed to extract text.';
            document.getElementById('result').classList.add('hidden');
        }
    })
    .catch(error => {
        // In case of an error during the fetch request
        button.disabled = false;
        button.innerText = 'Extract Text';
        document.getElementById('error').classList.remove('hidden');
        document.getElementById('error-message').innerText = 'An error occurred: ' + error;
        document.getElementById('result').classList.add('hidden');
    });
});
