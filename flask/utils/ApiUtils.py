import os
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import os

class ApiConfig:
  API_KEY= os.environ['YTB_API']
  SERVICE_NAME="youtube"
  VERSION="v3"
  uploaders = {
    "UCBkyj16n2snkRg1BAzpovXQ": "우왁굳",
    "UCzh4yY8rl38knH33XpNqXbQ": "왁타버스",
    "UChCqDNXQddSr0ncjs_78duA": "계륵",
    "UCroM00J2ahCN6k-0-oAiDxg": "아이네",
    "UC-oCJP9t47v7-DmsnmXV38Q": "릴파",
    "UCHE7GBQVtdh-c1m3tjFdevQ": "징버거",
    "UCTifMx1ONpElK5x6B4ng8eg": "주르르",
    "UCV9WL7sW6_KjanYkUUaIDfQ": "고세구",
    "UCs6EwgxKLY9GG4QNUrP5hoQ": "비챤",
  }

def insertSearch(vid):
    ytb = build(ApiConfig.SERVICE_NAME, ApiConfig.VERSION, developerKey=ApiConfig.API_KEY)
    row = ytb.videos().list(
        part=["snippet", "statistics"],
        id=vid,
    ).execute()
    uploader = ApiConfig.uploaders[row['items'][0]['snippet']['channelId']]
    ret ={
      "views" : row['items'][0]['statistics']['viewCount'],
      "uploader" : uploader,
      "uploadDate" : row['items'][0]['snippet']['publishedAt'][:10],
    }
    ytb.close()
    return ret
  
def updateSearch(vid):
    ytb = build(ApiConfig.SERVICE_NAME, ApiConfig.VERSION, developerKey=ApiConfig.API_KEY)
    row = ytb.videos().list(
        part=["snippet", "statistics"],
        id=vid,
    ).execute()
    ret = row['items'][0]['statistics']['viewCount']
    ytb.close()
    return ret