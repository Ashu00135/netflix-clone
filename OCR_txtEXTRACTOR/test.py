from flask import Flask, request, jsonify, render_template, redirect, url_for
import cv2
import pytesseract
import os

app = Flask(__name__)

# OCR function
def ocr_core(img):
    text = pytesseract.image_to_string(img)
    return text

# Preprocessing functions
def get_grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

#def remove_noise(image):
 #   return cv2.medianBlur(image, 4)
def remove_noise(image):
    return cv2.bilateralFilter(image, 9, 75, 75)



def threshold(image):
    return cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

@app.route('/', methods=['GET'])
def index():
    return render_template('index1.html')  # Serve the main page at root URL

@app.route('/api', methods=['GET', 'POST'])
def process_image():
    if request.method == 'GET':
        return render_template('index1.html')  # Return the HTML template for GET request

    elif request.method == 'POST':
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        file = request.files['image']
        
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Save the uploaded file temporarily
        file_path = os.path.join('temp_image.jpg')
        file.save(file_path)

        # Load the image using OpenCV
        img = cv2.imread(file_path)

        # Apply preprocessing
        img = get_grayscale(img)
        img = threshold(img)
        img = remove_noise(img)

        # Perform OCR
        extracted_text = ocr_core(img)

        # Clean up the temporary file
        os.remove(file_path)

        return jsonify({'extracted_text': extracted_text})

if __name__ == '__main__':
    app.run(debug=True)
