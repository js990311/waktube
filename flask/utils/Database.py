import pymysql
from app.models import videoModel
from app.utils import ApiUtils
import os

DB = pymysql.connect(
  host='db', 
  port=3306,
  user=os.environ['flask_id'], 
  password=os.environ['flask_pw'],                       
  db=os.environ['useDB'], 
  charset='utf8',
  autocommit=True,
)

def getCursor():
  if not DB.open:
    DB.ping(reconnect=True)
  return DB.cursor()

INSERT_LINE = "insert into waktube(vid, views, title, uploadDate, uploader) values ('{}',{},'{}', '{}','{}')"
SELECT_BY_VID = "SELECT * FROM waktube where vid='{}'"
SELECT_ALL = "SELECT * FROM waktube ORDER BY views DESC"
UPDATE_VIEWS = "UPDATE waktube SET views={} WHERE vid='{}'"
UPDATE_TITLE = "UPDATE waktube SET title='{}' WHERE vid='{}'"
DELETE_BY_VID = "DELETE FROM waktube where vid='{}'"
SELECT_VID = "SELECT vid FROM waktube"

def insertDB(vid, title):
  # 업로드
  cursor = getCursor()
  if cursor.execute(SELECT_BY_VID.format(vid)): # 중복해서 업로드 하는 것인지 체크하고 올리기
    return
  ret = ApiUtils.insertSearch(vid)
  views = ret['views']
  uploader = ret['uploader']
  uploadDate = ret['uploadDate']
  isql = INSERT_LINE.format(vid,views, title,uploadDate, uploader)
  cursor.execute(isql)

def countDB():
  cursor = getCursor()
  cursor.execute("SELECT COUNT(vid) FROM waktube")
  ret = cursor.fetchone()
  return ret

def listDB():
  cursor = getCursor()
  cursor.execute(SELECT_ALL)
  ret = []
  tmp = cursor.fetchall()
  for i in tmp:
    vid, views, title, uploadDate, uploader = i 
    ret.append(videoModel.VideoModel(vid=vid, views=views, title=title, uploader=uploader, uploadDate=uploadDate))
  
  return ret

def searchByVid(vid):
  cursor = getCursor()
  cursor.execute(SELECT_BY_VID.format(vid))
  tmp = cursor.fetchone()
  vid, views, title, uploadDate, uploader = tmp 
  return videoModel.VideoModel(vid=vid, views=views, title=title, uploader=uploader, uploadDate=uploadDate)

def updateViews():
  cursor = getCursor()
  cursor.execute(SELECT_VID)
  ret = cursor.fetchall()
  for vid in ret: 
    views = ApiUtils.updateSearch(vid[0])
    isql = UPDATE_VIEWS.format(views, vid[0])
    cursor.execute(isql)


def deleteDB(vid):
  cursor = getCursor() 
  isql = DELETE_BY_VID.format(vid)
  cursor.execute(isql)

def updateTitle(vid, title):
  cursor = getCursor() 
  isql = UPDATE_TITLE.format(title, vid)
  cursor.execute(isql)
