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
