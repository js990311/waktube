from flask import Blueprint, render_template, request, current_app
from werkzeug.utils import secure_filename
from app.utils import Database
import csv, os

bp = Blueprint('uploadCSV', __name__, url_prefix='/csv', template_folder='views')

def isCsv(fname):
  return fname.split('.')[1] == 'csv'

@bp.route('/')
def csvIndex():
  return render_template('csvUpload.html')

@bp.route('upload', methods=["POST"])
def csvUpload():
  if request.method == "POST":
    file = request.files['file']
    if not isCsv(file.filename):
      return "<h1>허용되지 않는 파일형식입니다.</h1><p>csv파일만 올리십시오</p>"

    # 파일저장
    filename = secure_filename(file.filename)
    longFileName = os.path.join(current_app.config['CSV_FOLDER'], filename)
    file.save(longFileName)

    # CSV에 데이터 입력
    querys = []
    with open(longFileName, 'r') as f:
      csvReader = csv.reader(f)
      for i in csvReader:
        querys.append(i)
    
    # DB랑 연결하기
    for query in querys:
      vid, title = query
      Database.insertDB(vid, title)
    
    return "<h1><a href='/videos'>무사히 업로드됨</a></h1>"
