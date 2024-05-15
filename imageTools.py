from PIL import Image, ImageFilter

def makeBlur(imgPath):
    img = Image.open(imgPath)
    img.filter(ImageFilter.BLUR)



