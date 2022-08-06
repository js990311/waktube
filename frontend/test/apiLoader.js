let tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
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

let globalTimeOut;
let timeAttack = () => {
  document.getElementById("front").classList.add("timeAttack");
  globalTimeOut = setTimeout( () => {
    failEvent();
  }, 10000);
  
};

let stopTimeAttack = () => {
  document.getElementById("front").classList.remove("timeAttack");
  clearTimeout(globalTimeOut);
};

idTest = 0
idList = [
  "OssGOAiU4qk",
  "Hkg6Vu2Um5k",
  "dIItlUWYeJ0",
  "grhJIUYSNvE"
];

let getJson = (newInfo) =>{
  let req = new XMLHttpRequest();
  lastViews = (parseViews(document.getElementsByClassName("views")[2].childNodes[0].innerText) / 1000)

  req.open("POST", "/test?lastViews=" + lastViews);
  req.send();

  req.onreadystatechange = () => {
    console.log(req.responseText);
    newInfo = JSON.parse(req.responseText);
  }
}

let newDocument =() =>{
  newInfo = {};
  getJson(newInfo);

  // 메인박스
  newDiv = document.createElement("div");
  newDiv.dataset['location']='0';
  newDiv.classList.add("test-box");

  // 뒷배경
  blurDiv = document.createElement("div");
  blurDiv.classList.add("blur-layer");

  playerDiv = document.createElement("div");
  playerDiv.setAttribute("id", newInfo['vid']);
  playerDiv.classList.add("player");

  // 설명 추가
  /*  div.info-layer  */
  infoDiv = document.createElement("div");
  infoDiv.classList.add("info-layer");
  /* p.title */
  pTitle = document.createElement("p");
  pTitle.classList.add("title");
  pTitle.innerHTML = newInfo['title'];
  /* 
    p.views
      span 조회수
  */
  pViews = document.createElement("p");
  pViews.classList.add("views");
  newViews = String(newInfo['views']);
  if(newViews.length <= 2){
    views = newViews + '0,000';
  }else{
    views = newViews[0] + "," + newViews.substring(1,) + '0,000';
  }
  spanViews = document.createElement("span");spanViews.innerHTML = views;
  pViews.appendChild(spanViews);
  /* 
    p.extra-info
      span uploader
      span , 
      span uploadDate
  */
  pExtra = document.createElement("p");
  uploaderSpan = document.createElement("span");uploaderSpan.innerHTML=newInfo['uploader'];
  dotSpan = document.createElement("span");dotSpan.innerHTML=', ';
  dateSpan = document.createElement("span");dateSpan.innerHTML=newInfo['uploadDate']
  pExtra.appendChild(uploaderSpan);
  pExtra.appendChild(dotSpan);
  pExtra.appendChild(dateSpan);


  // 패키징
  infoDiv.appendChild(pExtra);
  infoDiv.appendChild(pTitle);
  infoDiv.appendChild(pViews);
  newDiv.appendChild(infoDiv);
  newDiv.appendChild(blurDiv);
  newDiv.appendChild(playerDiv);

  // HTML로 추가
  targetBox = document.getElementsByClassName("box")[0];
  targetBox.appendChild(newDiv);
  ytFunc(newInfo['vid']);
};

let toggleBtn = (state) => {
  btns = document.getElementsByClassName('btn');
  btns[0].classList.toggle("hidden");
  btns[1].classList.toggle("hidden");
};

let moveFunc = () =>{
  toggleBtn();
  b0 = document.querySelector("[data-location='0']");
  b50 = document.querySelector("[data-location='50']");
  b100 = document.querySelector("[data-location='100']");
  b0.dataset['location'] = '50';
  newDocument();
  b50.dataset['location'] = '100';
  b100.dataset['location'] = '150';
  setTimeout(()=>{
    changeCircle("normal");
    b100.remove();
    toggleBtn();
    timeAttack();
  }, 400)
};

let soundPlay = (option) =>{
  if(option == "success"){
    audio = document.getElementById("successAudio");
    audio.play();
  }
  if(option == "fail"){
    audio = document.getElementById("failAudio");
    audio.play();
  }
}

let parseViews = (row) => {
  cooked = ''
  for(let i of row){
      if(i!=',') cooked += i;
  }
  return parseInt(cooked);
}

let successEvent = () => {
  console.log("성공");
  score = document.getElementById("score");
  setTimeout(()=>{
    soundPlay('success');
    changeCircle("success");
    score.innerHTML = parseInt(score.innerHTML) + 1;
    setTimeout(()=>{
      moveFunc();
    },200);
  },200);
}

let changeCircle = (state) => {
  box = document.getElementsByClassName("circle-box")[0];
  back = document.getElementById("back");
  if(state == "success"){
    back.classList.add("success");
    box.classList.add('circle-rotate');
  }else if(state == "fail"){
    back.classList.add("fail");
    box.classList.add('circle-rotate');
  }else{
    box.classList.remove('circle-rotate');
    back.classList.remove("success");
    back.classList.remove("fail");
  }
};

let failEvent = () =>{
  console.log("실패");
  score = document.getElementById("score");
  changeCircle("fail");
  soundPlay("fail");
  toggleBtn();
  // setTimeout(()=>{
  //   window.location.href = "/result";
  // }, 900);
};

let grading = (self, anti) => {
  document.getElementsByClassName("views")[1].childNodes[0].classList.add('display');
  console.log(self, anti);
  stopTimeAttack();
  if(self < anti){
    failEvent();
  }else{
    successEvent();
  }
};

let leftBtnEvent = () =>{
  self = parseViews(document.getElementsByClassName("views")[0].childNodes[0].innerHTML)
  anti = parseViews(document.getElementsByClassName("views")[1].childNodes[0].innerHTML)
  grading(self,anti);
};

let rightBtnEvent = () => {
  anti = parseViews(document.getElementsByClassName("views")[0].childNodes[0].innerHTML)
  self = parseViews(document.getElementsByClassName("views")[1].childNodes[0].innerHTML)
  grading(self,anti);
};
