from flask import Flask, request, Response,render_template
from werkzeug.utils import secure_filename
import json
from db import db_init, db
from model import Img

app = Flask(__name__)
# SQLAlchemy config. Read more: https://flask-sqlalchemy.palletsprojects.com/en/2.x/
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///img.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db_init(app)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/uploadFile')
def uploadFile():
    return render_template("upload.html")


@app.route('/upload', methods=['POST'])
def upload():
    pic = request.files['pic']
    # # class_type=json.loads(request.form.get('attrib'))
    # data=json.loads(request.data)
    # print(data)
    #return
    if not pic:
        return 'No pic uploaded!', 400

    filename = secure_filename(pic.filename)
    mimetype = pic.mimetype
    if not filename or not mimetype:
        return 'Bad upload!', 400

    img = Img(img=pic.read(), name=filename, mimetype=mimetype , class_type=class_type)
    db.session.add(img)
    db.session.commit()

    return 'Img Uploaded!', 200


@app.route('/<int:id>')
def get_img(id):
    img = Img.query.filter_by(id=id).first()
    if not img:
        return 'Img Not Found!', 404

    return Response(img.img, mimetype=img.mimetype)

if __name__ == "__main__":
    app.run(debug=True)
