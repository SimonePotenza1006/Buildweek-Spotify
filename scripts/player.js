/* -----------------------THIS FUNCTION CHANGES ICON OF THE HEART ICON AT BIGGER BREAKPOINTS FROM "EMPTY" to "FILLED" ---------------------*/

const heartIconBig = document.getElementById("heartIconBig");
let isFilledBig = false;

heartIconBig.addEventListener("click", function () {
  if (isFilledBig) {
    heartIconBig.classList.remove("bi-heart-fill");

    heartIconBig.innerHTML = "";
    heartIconBig.className = "bi bi-heart mx-2";

    isFilledBig = false;
  } else {
    heartIconBig.classList.add("bi-heart-fill");

    heartIconBig.innerHTML = "";
    heartIconBig.className = "bi bi-heart-fill mx-2";

    isFilledBig = true;
  }
});

/* -----------------------THIS FUNCTION CHANGES ICON OF THE HEART AT SMALLER BREAKPOINTS FROM "EMPTY" to "FILLED" ---------------------*/

const heartIcon = document.getElementById("heartIcon");
let isFilled = false;

heartIcon.addEventListener("click", function () {
  if (isFilled) {
    heartIcon.classList.remove("bi-heart-fill");

    heartIcon.innerHTML = "";
    heartIcon.className = "bi bi-heart mx-2";

    isFilled = false;
  } else {
    heartIcon.classList.add("bi-heart-fill");

    heartIcon.innerHTML = "";
    heartIcon.className = "bi bi-heart-fill mx-2";

    isFilled = true;
  }
});

/* -------------------THIS FUNCTION CHANGES THE REPEAT ICON COLOR FROM WHITE TO GREEN, TO REPEAT-1, TO REPEAT WHITE  ------------------*/

const repeatIcon = document.getElementById("repeatIcon");
let iconValue = 0;

repeatIcon.addEventListener("click", function () {
  if (iconValue === 0) {
    repeatIcon.classList.remove("bi-repeat-1");
    repeatIcon.classList.add("bi-repeat");
    repeatIcon.style.color = "#34cb1d";
    iconValue = 1;
  } else if (iconValue === 1) {
    repeatIcon.classList.remove("bi-repeat");
    repeatIcon.classList.add("bi-repeat-1");
    repeatIcon.style.color = "#34cb1d";
    iconValue = 2;
  } else {
    repeatIcon.classList.remove("bi-repeat-1");
    repeatIcon.classList.add("bi-repeat");
    repeatIcon.style.color = "white";
    iconValue = 0;
  }
});

/* -----------------------THIS FUNCTION CHANGES THE SHUFFLE ICON COLOR FROM WHITE TO GREEN (AND VICE VERSA) ---------------------*/

const shuffleIcon = document.getElementById("shuffleIcon");
const colorToggleShuffle = document.getElementById("colorToggleShuffle");
let isWhiteShuffle = true;

colorToggleShuffle.addEventListener("click", function () {
  if (isWhiteShuffle) {
    shuffleIcon.style.color = "#34cb1d";
    isWhiteShuffle = false;
  } else {
    shuffleIcon.style.color = "#ffffff";
    isWhiteShuffle = true;
  }
});

//
//
// FUNZIONI PLAYER
const audioElement = document.querySelector("audio");

const playPauseIcon = document.getElementById("playPause");
playPauseIcon.addEventListener("click", () => {
  //check audio is playing
  if (!audioElement.paused) {
    audioElement.pause();
  } else {
    audioElement.play();
  }
});

// ICONA PLAY/PAUSA

const playPauseSmallIcon = document.getElementById("playPauseSmall");
playPauseIcon.addEventListener("click", function () {
  playPauseIcon.classList.toggle("bi-play-circle-fill");
  playPauseIcon.classList.toggle("bi-pause-circle-fill");
});
// Bottone su mobile
// playPauseSmallIcon.addEventListener("click", function () {
//   playPauseIcon.classList.toggle("bi-play-circle-fill");
//   playPauseIcon.classList.toggle("bi-pause-circle-fill");
// });

// VOLUME
const input = document.querySelector("#volume");
audioElement.volume = 0.2;
input.addEventListener("change", (event) => {
  audioElement.volume = event.target.value / 100;
});

// TIME SONG
const playerCurrentTime = document.querySelector("#songStartPoint");
const playerSongDuration = document.querySelector("#songEndPoint");

audioElement.addEventListener("timeupdate", () => {
  /////Song duration////
  let minutes = parseInt(audioElement.duration / 60, 10);
  let seconds = parseInt(audioElement.duration % 60);
  if (minutes < 10) {
    minutes = minutes;
  }
  playerSongDuration.textContent = minutes + ":" + seconds;

  /////Passed time////
  let mins = Math.floor(audioElement.currentTime / 60);
  if (mins < 10) {
    mins = String(mins);
  }
  let secs = Math.floor(audioElement.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }
  playerCurrentTime.textContent = mins + ":" + secs;
  /////Progress////
  progressUpdate();
});

// PLAYER PROGRESS
const progressFilled = document.querySelector(".player-progress-filled");
function progressUpdate() {
  const percent = (audioElement.currentTime / audioElement.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

// RESET PLAYER
audioElement.addEventListener("ended", () => {
  btnPlay.dataset.playing = "false";
  // playPauseIcon.classList.toggle("bi-play-circle-fill");
  // playPauseIcon.classList.toggle("bi-pause-fill");
  progressFilled.style.flexBasis = "0%";
  audioElement.currentTime = 0;
  audioElement.duration = audioElement.duration;
});

// SCRUB PLAYER TIMELINE
const progress = document.querySelector(".player-progress");

let mousedown = false;
function scrub(event) {
  const scrubTime =
    (event.offsetX / progress.offsetWidth) * audioElement.duration;
  audioElement.currentTime = scrubTime;
}
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

/* THIS JS PIECE OF CODE CHANGES THE VOLUME ICON WHEN THE VALUE GOES TO 60/100 OR ABOVE */
const volumeRange = document.getElementById("volume");
const volumeIcon = document.getElementById("volumeIcon");

volumeRange.addEventListener("input", function () {
  const value = parseInt(volumeRange.value);
  if (value >= 101) {
    volumeIcon.className = "bi bi-volume-down px-2";
  } else if (value >= 60) {
    volumeIcon.className = "bi bi-volume-up px-2";
  } else {
    volumeIcon.className = "bi bi-volume-down px-2";
  }
});
