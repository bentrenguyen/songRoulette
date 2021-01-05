// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player1;
var player2;
var player3;
var player4;
var rmPlayer;

var lT = 'playlist';
var l = '';
var aP = 0;
var r = 0;
var s = 20;
var h = '0';
var w = '0';

var playing = false;
var showing = false;
var firstPlay = true;

var playlistLen = 4;

var urlList = ["1", "2", "3", "4"];

var titleList = ["", "", "", ""];

var playlistInputText;

document.getElementById("playlistInput").addEventListener('keyup', event => {
  if (event.code == "Enter") {
    playlistInputText = document.getElementById("playlistInput").value;
    l = playlistInputText.split("list=")[1];
  
    player1.destroy();
    player2.destroy();
    player3.destroy();
    player4.destroy();

    player1 = createPlayer('player1');
    player2 = createPlayer('player2');
    player3 = createPlayer('player3');
    player4 = createPlayer('player4');
    firstPlay = true;
    document.querySelector('#loadMsg').innerText = "Playlist loading...";
    document.querySelector("#loadMsg").style.color = "#ededed";
    titleList = ["", "", "", ""];
  }
})

function createPlayer(name) {
  player = new YT.Player(name, {
    height: h,
    width: w,
    events: {
        'onReady': onPlayerReady,
        'onError': onPlayerError,
        'onStateChange': onPlayerStateChange,
    },
    playerVars: 
      {
        listType: lT,
        list: l,
        autoplay: aP, 
        rel: r, 
      }
  });
  return player;
}



function onPlayerStateChange(event) {
  if (event.data == 3) {
    document.querySelector('#loadMsg').innerText = "Playlist loaded successfully!";
    document.querySelector("#loadMsg").style.color = "#ededed";
  }
  if (event.data == 1) {
    document.querySelector('#loadMsg').innerText = "Playing...";
    document.querySelector("#loadMsg").style.color = "#ededed";
    getTitles();
  }
  if (event.data == 2) {
    document.querySelector('#loadMsg').innerText = "Paused";
    document.querySelector("#loadMsg").style.color = "#ededed";
  }
}

function editPlayer(player) {
  player.loadPlaylist({
    listType: lT,
    list: l,
    startSeconds: s,
  });
  player.pauseVideo();
}

function onYouTubeIframeAPIReady() {
  player1 = createPlayer('player1');
  player2 = createPlayer('player2');
  player3 = createPlayer('player3');
  player4 = createPlayer('player4');

  rmPlayer = new YT.Player('rmPlayer', {
    height: '360',
    width: '640',
    videoId: 'p-yaw1ftZAQ',
    playerVars: {
      rel: 0,
    }

  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
/* debugger */;
  ready();
}

function onRMPlayerReady(event) {
  event.target.PlayVideo();
}

function onPlayerError(event) {
  if (l!="") {
    document.querySelector('#loadMsg').innerText = "There was an error loading your playlist";
    document.querySelector("#loadMsg").style.color = "#f32853";
    l = "";
  }
}

function mutePlayer(player) {
  player.mute();
}

function unmutePlayer(player) {
  player.unMute();
}

function ready() {
  setTimeout(() => {
    player1.playVideoAt(0);
    player2.playVideoAt(1);
    player3.playVideoAt(2);
    player4.playVideoAt(3);
    
  
    var playerList = [player1, player2, player3, player4];
    playerList.forEach(pauseFn);
    playerList.forEach(mutePlayer);
  
    player1.seekTo(s);
    player2.seekTo(s);
    player3.seekTo(s);
    player4.seekTo(s);
    }, 1000);
  hideTitles();
}

function shuffle(first=false) {
  if (playing) {
    pauseButton();
  }
  playlistLen = player1.getPlaylist().length;
  num1 = Math.floor(Math.random() * playlistLen);
  num2 = Math.floor(Math.random() * playlistLen);
  while (num2 == num1) {
    num2 = Math.floor(Math.random() * playlistLen);
  }
  num3 = Math.floor(Math.random() * playlistLen);
  while (num3 == num2 || num3 == num1) {
    num3 = Math.floor(Math.random() * playlistLen);
  }
  num4 = Math.floor(Math.random() * playlistLen);
  while (num4 == num3 || num4 == num2 || num4 == num1) {
    num4 = Math.floor(Math.random() * playlistLen);
  }
  
  setTimeout(() => {
  player1.playVideoAt(num1);
  player2.playVideoAt(num2);
  player3.playVideoAt(num3);
  player4.playVideoAt(num4);
  
  
  var playerList = [player1, player2, player3, player4];
  if (!first) {
    playerList.forEach(pauseFn); 
  }
  if (first) {
    playerList.forEach(unmutePlayer);
  }
  

  player1.seekTo(s);
  player2.seekTo(s);
  player3.seekTo(s);
  player4.seekTo(s);
  }, 1000);
  hideTitles();
}

function allPlayers(player) {
    player.playVideo();
}

function playPause() {
  if (l == "") {
    document.querySelector('#loadMsg').innerText = "No playlist loaded yet";
    document.querySelector("#loadMsg").style.color = "#f32853";

  }
  if (firstPlay) {
    shuffle(true);
    var playerList = [player1, player2, player3, player4];
    //playerList.forEach(unmutePlayer);
    firstPlay = false;
    playing = true;
    document.querySelector("#loadMsg").style.color = "#ededed";
    document.querySelector('#gif').src="musicPlayingGray.gif";
  } else if (player1.getPlayerState()!=1) {
    var playerList = [player1, player2, player3, player4];
    playerList.forEach(unmutePlayer);
    playButton();
    document.querySelector('#loadMsg').innerText = "Playing...";
    document.querySelector("#loadMsg").style.color = "#ededed";
  } else {
    pauseButton();
    document.querySelector('#loadMsg').innerText = "Paused";
    document.querySelector("#loadMsg").style.color = "#ededed";
  }
}

function getTitles() {
  var playerList = [player1, player2, player3, player4];
  playerList.forEach(allPlayers);
  urlList[0] = player1.getVideoUrl();
  urlList[1] = player2.getVideoUrl();
  urlList[2] = player3.getVideoUrl();
  urlList[3] = player4.getVideoUrl();
  callAjax();
}

function playButton() {
  getTitles();
  playing = true;
  document.querySelector('#gif').src="musicPlayingGray.gif";
}

function pauseFn(player) {
  player.pauseVideo();
}

function pauseButton() {
  var playerList = [player1, player2, player3, player4];
  playerList.forEach(pauseFn);
  //document.querySelector('#playPause').innerText = "Play";
  playing = false;
  document.querySelector('#gif').src="musicPlayingStill.gif";
}


function showTitles() {
  //document.querySelector('#ShowButton').innerText = titleList[1];
  document.querySelector('#Video1').innerText = "#1: " + titleList[0].slice(0, -14);
  document.querySelector('#Video2').innerText = "#2: " + titleList[1].slice(0, -14);
  document.querySelector('#Video3').innerText = "#3: " + titleList[2].slice(0, -14);
  document.querySelector('#Video4').innerText = "#4: " + titleList[3].slice(0, -14);
  //document.querySelector('#showTitlesButton').innerText = "Hide Titles";
  showing = true;
}

function hideTitles() {
  document.querySelector('#Video1').innerText = "#1:";
  document.querySelector('#Video2').innerText = "#2:";
  document.querySelector('#Video3').innerText = "#3:";
  document.querySelector('#Video4').innerText = "#4:";
  //document.querySelector('#showTitlesButton').innerText = "Show Titles";
  showing = false;
}

function showHide() {
  if (l == "") {
    document.querySelector('#loadMsg').innerText = "No playlist loaded yet";
    document.querySelector("#loadMsg").style.color = "#f32853";
  }
  else if (!showing) {
    showTitles();
  } else {
    hideTitles();
  }
}

function callAjax() {
  for (i = 0; i < 4; i++) {
    (function (i) {
      $.getJSON('https://noembed.com/embed',
      {format: 'json', url: urlList[i]}, function (data) {
        titleList[i] = data.title;
      });
    })(i);
  }
}

function shuffleButton() {
  if (l == "") {
    document.querySelector('#loadMsg').innerText = "No playlist loaded yet";
    document.querySelector("#loadMsg").style.color = "#f32853";
  } else if (!firstPlay) {
    shuffle();
    document.querySelector('#loadMsg').innerText = "Playlist shuffling...";
    document.querySelector("#loadMsg").style.color = "#ededed";
  }
  
}