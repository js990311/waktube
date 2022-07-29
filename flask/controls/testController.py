from flask import Blueprint, render_template, request, current_app
from app.models import TestModel

bp = Blueprint('test', __name__, url_prefix='/test', template_folder='views')

@bp.route('/')
def upload():
  ret = [
    TestModel.TestModel(1,1),
    TestModel.TestModel(2,2),
    TestModel.TestModel(3,3),
  ]
  return render_template('test.html', ret=ret)