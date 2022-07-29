from xml.etree.ElementInclude import DEFAULT_MAX_INCLUSION_DEPTH
from flask import Flask, render_template
from datetime import datetime

def create_app():
 
  app = Flask(__name__, template_folder='views')  

  app.config['CSV_FOLDER'] = './app/static/csv/'
  app.config['Last_Update_Time'] = datetime.now()
  from app.controls import testController, CsvControl, ListControl, UpdateControl


  app.register_blueprint(testController.bp)
  app.register_blueprint(CsvControl.bp)
  app.register_blueprint(ListControl.bp)
  app.register_blueprint(UpdateControl.bp)

  @app.route('/')
  def index():
    return render_template('index.html')
  
  return app

