from flask import Blueprint, render_template, request, current_app, redirect, url_for
from app.utils import Database
bp = Blueprint('videoList', __name__, url_prefix='/videos', template_folder='views')

@bp.route('/')
def listIndex():
  videoList = Database.listDB()
  count = Database.countDB()
  return render_template('vList.html', counts = count[0], videos=videoList)

@bp.route('/<vid>', methods=["GET", "POST"])
def vidInfo(vid):
  if request.method=="GET":
    params = request.args.to_dict()
    if len(params) == 0:
      video = Database.searchByVid(vid)
      return render_template('vInfo.html', video=video)
    if 'delete' in params:
      Database.deleteDB(vid)
      return redirect(url_for('videoList.listIndex'))
  if request.method=="POST":
    title = request.form.get('title')
    Database.updateTitle(vid, title)
    return redirect(url_for('videoList.vidInfo', vid=vid))

