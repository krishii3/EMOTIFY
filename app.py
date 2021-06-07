from flask import Flask, request, Response,render_template
from werkzeug.utils import secure_filename
import json
from db import db_init, db
from model import Img
import random

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///img.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db_init(app)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/game')
def gamePlay():
    return render_template("start.html")

@app.route('/uploadFile')
def uploadFile():
    return render_template("upload.html")


@app.route('/upload', methods=['POST'])
def upload():
    pic = request.files['pic']
    class_type = (request.form.to_dict()['attrib'])
    if not pic:
        return {
        'success': False,
        'message': 'File not uploaded',
        'resCode': 400
    }

    filename = secure_filename(pic.filename)
    mimetype = pic.mimetype
    if not filename or not mimetype:
        return {
        'success': False,
        'message': 'Bad upload.',
        'resCode': 400
    }

    img = Img(img=pic.read(), name=filename, mimetype=mimetype, class_type = class_type)
    db.session.add(img)
    db.session.commit()

    return {
        'success': True,
        'message': 'Hogyi h upload.',
        'resCode': 200
    }


@app.route('/getImage/<int:id>')
def get_img(id):
    img = Img.query.filter_by(id=id).first()
    if not img:
        return 'Img Not Found!', 404
    print(img.img)

    return Response(img.img, mimetype=img.mimetype)

attribute = ''

@app.route('/getRandomImage')
def getRandom():
    queryLen = len(Img.query.all())
    id_random = random.randint(1,queryLen)
    img = Img.query.filter_by(id=id_random).first()
    global attribute 
    attribute = img.class_type
    return Response(img.img, mimetype=img.mimetype)

@app.route('/getRandomImage/attribute', methods=['GET'])
def getAttrib():
    return {
        'attrib': attribute
    }
if __name__ == "__main__":
    app.run(debug=True)
