var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let ytFunc = (tagId) => {
  new YT.Player(document.getElementById(tagId), {
    videoId: tagId, // 재생할 유튜브 영상 ID
    playerVars: {
      autoplay: true, // 자동 재생 옵션
      loop: 1, playlist: tagId // 반복 재생 옵션
    },
    events: {
      onReady: function (event) {
        event.target.mute(); // 배경화면으로 쓸 거니까 음소거
        event.target.playVideo(); // autoplay 씹어먹을까바 걱정되니까
      }
    }
  });
};

idTest = 0
idList = [
  "OssGOAiU4qk",
  "Hkg6Vu2Um5k",
  "dIItlUWYeJ0",
  "grhJIUYSNvE"
];

let getID = () =>{
  //api로 연결되어야함
  if(idTest <= 3){
    ret = idList[idTest];
    idTest+=1;
    return ret;
  }else{
    return "Hkg6Vu2Um5k";
  }
}

let newDocument =() =>{
  nowID = getID();

  // 메인박스
  newDiv = document.createElement("div");
  newDiv.dataset['location']='0';
  newDiv.classList.add("test-box");

  // 뒷배경
  playerDiv = document.createElement("div");
  playerDiv.setAttribute("id", nowID);
  playerDiv.classList.add("player");

  // 설명 추가
  /*  div.info-layer  */
  infoDiv = document.createElement("div");
  infoDiv.classList.add("info-layer");
  /* p.title */
  pTitle = document.createElement("p");
  pTitle.classList.add("title");
  pTitle.innerHTML = '테스트 제목4';
  /* 
    p.views
      span 조회수
  */
  pViews = document.createElement("p");
  pViews.classList.add("views");
  spanViews = document.createElement("span");spanViews.innerHTML = '9546854';
  pViews.appendChild(spanViews);
  /* 
    p.extra-info
      span uploader
      span , 
      span uploadDate
  */
  pExtra = document.createElement("p");
  uploaderSpan = document.createElement("span");uploaderSpan.innerHTML='왁타버스';
  dotSpan = document.createElement("span");dotSpan.innerHTML=', ';
  dateSpan = document.createElement("span");dateSpan.innerHTML='2022-07-29'
  pExtra.appendChild(uploaderSpan);
  pExtra.appendChild(dotSpan);
  pExtra.appendChild(dateSpan);


  // 패키징
  infoDiv.appendChild(pTitle);
  infoDiv.appendChild(pViews);
  infoDiv.appendChild(pExtra);
  newDiv.appendChild(infoDiv);
  newDiv.appendChild(playerDiv);

  // HTML로 추가
  targetBox = document.getElementsByClassName("box")[0];
  targetBox.appendChild(newDiv);
  ytFunc(nowID);
};

let moveFunc = () =>{
  btns = document.getElementsByClassName('btn');
  btns[0].classList.add("hidden");
  btns[1].classList.add("hidden");
  b0 = document.querySelector("[data-location='0']");
  b50 = document.querySelector("[data-location='50']");
  b100 = document.querySelector("[data-location='100']");
  b0.dataset['location'] = '50';
  newDocument();
  b50.dataset['location'] = '100';
  b100.dataset['location'] = '150';
  setTimeout(()=>{
    b100.remove();
    btns[0].classList.remove("hidden");
    btns[1].classList.remove("hidden");  
  }, 400)
};

let soundPlay = (option) =>{
  if(option == "success"){
    audio = document.getElementById("successAudio");
    audio.play();
  }
}

let grading = (self, anti) => {
  document.getElementsByClassName("views")[1].childNodes[0].classList.add('display');
  // if(self-4999 < anti){
  //   return "실패 이벤트"
  // }else;{
  //   return "성공 이벤트"
  // }
  setTimeout(()=>{
    soundPlay('success');
    setTimeout(()=>{
      moveFunc();
    },200);
  },400);
};

let leftBtnEvent = () =>{
  self = parseInt(document.getElementsByClassName("views")[0].childNodes[0].innerHTML)
  anti = parseInt(document.getElementsByClassName("views")[1].childNodes[0].innerHTML)
  grading(self,anti);
};

let rightBtnEvent = () => {
  anti = parseInt(document.getElementsByClassName("views")[0].childNodes[0].innerHTML)
  self = parseInt(document.getElementsByClassName("views")[1].childNodes[0].innerHTML)
  grading(self,anti);
};
