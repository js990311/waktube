from flask import Blueprint, render_template, request, current_app, redirect, url_for
from app.utils import Database
from threading import Thread, Lock
from datetime import datetime
bp = Blueprint('update', __name__, url_prefix='/update', template_folder='views')

@bp.route('/')
def updateViews():
  now = datetime.now()
  diff = now - current_app.config['Last_Update_Time']
  if diff.seconds > 60*60*2:
    # 쓰레드로 인한 위험 방지를 위해 시간을 두고 생성하기로 함
    updateThread = Thread(target=Database.updateViews)
    updateThread.start()
    current_app.config['Last_Update_Time'] = now
    return "<h1><a href='/videos'>무사히 갱신됨</a></h1>"
  
  return "<h1><a href='/videos'>기달려 제발</a><br>최근 갱신시간 : {}<br>현재시간 : {}<br>남은시간={}초</h1>".format(current_app.config['Last_Update_Time'], now, 60*60*2 - diff.seconds)
