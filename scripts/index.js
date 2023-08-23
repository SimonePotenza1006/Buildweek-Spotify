let firstRow = document.getElementById("first-row");
let secondRow = document.getElementById("second-row");
let thirdRow = document.getElementById("third-row");
let fourthRow = document.getElementById("fourth-row");
let searchUrl =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=rock";
let myUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
let albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";

let choosenAlbums = [];
let forYouAlbum = [];
let mixAlbum = [];
let recentAlbum = [];

const randomNumber = function () {
  let num = Math.floor(Math.random() * 25);
  return num;
};

const randomAlbums = function () {
  fetch(searchUrl)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    })
    .then((data) => {
      for (let i = 0; i < 6; i++) {
        const randomN = function () {
          let random = randomNumber();
          if (choosenAlbums.includes(data.data[random].album.id)) {
            randomN();
          } else {
            choosenAlbums.push(data.data[random].album.id);
          }
        };
        randomN();
      }
      getAlbum();
    })
    .catch((err) => {
      console.log(err);
    });
};
randomAlbums();

const randomForYou = function () {
  fetch(searchUrl)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    })
    .then((data) => {
      for (let i = 0; i < 4; i++) {
        const randomN = function () {
          let random = randomNumber();
          if (forYouAlbum.includes(data.data[random].album.id)) {
            randomN();
          } else {
            forYouAlbum.push(data.data[random].album.id);
          }
        };
        randomN();
      }
      createForYou();
    })
    .catch((err) => {
      console.log(err);
    });
};
randomForYou();

const showPlaylist = function (playlist) {
  console.log(playlist);
  let ulPlaylist = document.getElementById("lista-playlist");
  ulPlaylist.innerHTML = "";
  playlist.forEach((playlistItem) => {
    let newPlaylist = document.createElement("li");
    newPlaylist.classList.add(
      "text-secondary",
      "d-flex",
      "align-items-center",
      "mb-3"
    );
    newPlaylist.innerHTML = `
      <img class="imgPlaylist" src="${playlistItem.cover_small}" alt="cover"/>
      <div class="ps-2 d-flex flex-column justify-content-center">
      <p class="artistPlaylist text-light m-0 p-0">${playlistItem.artist}</p> 
      <a href="#" class="artistPlaylist link-secondary link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover">${playlistItem.title}</a>
      </div>
      `;
    ulPlaylist.appendChild(newPlaylist);
  });
};

const createPlaylist = function () {
  console.log(searchUrl);
  fetch(searchUrl)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel recupero dei dati");
      }
    })
    .then((data) => {
      const albumList = data.data.map((item) => {
        return {
          title: item.album.title,
          artist: item.artist.name,
          cover_small: item.album.cover_small,
        };
      });
      showPlaylist(albumList);
    })
    .catch((error) => {
      console.log(error);
    });
};

createPlaylist();

const getAlbum = function () {
  choosenAlbums.forEach((el) => {
    fetch(albumUrl + el)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel recupero dei dati");
        }
      })
      .then((data) => {
        let newCol = document.createElement("div");
        newCol.classList.add("col", "col-12", "col-md-6", "col-lg-4");
        newCol.innerHTML = `
                <div class="d-flex align-items-center justify-content-between rounded shadow prima-riga spotify-div">
                    <div class="d-flex align-items-center">
                        <img class="rounded-start" src="${data.cover_small}" alt="cover" />
                        <h6 class="m-0 ps-1"> ${data.title}</h6>
                    </div>
                    <img class="spotify-play" src="assets/imgs/Spotify-Play-Button-removebg-preview.png" alt="spotify-play" />
                </div>
                `;
        firstRow.appendChild(newCol);
        const firstRowDivs = document.querySelectorAll(".spotify-div");
        const firstRowDiv = firstRowDivs[firstRowDivs.length - 1];
        const spotyPlays = document.querySelectorAll(".spotify-play");
        const spotyPlay = spotyPlays[spotyPlays.length - 1];
        firstRowDiv.addEventListener("mouseover", function () {
          spotyPlay.style.opacity = 1;
        });
        firstRowDiv.addEventListener("mouseleave", function () {
          spotyPlay.style.opacity = 0;
        });

        // RECUPERO DATI PLAYER
        const playerImageSongSmall =
          document.getElementById("playerImageSmall");
        const playerImageSongBig = document.getElementById("playerImageBig");
        const ArtistNamePlayer = document.getElementById("artistNameForPlayer");
        const titleSongSmall = document.getElementById(
          "songNameForPlayerSmall"
        );
        const titleElementBig = document.getElementById("songNameForPlayerBig");
        const subtitleElement = document.getElementById("artistNameForPlayer");

        // SOURCE SONG
        const songSource = document.getElementById("audioSource");
        const audioElement = document.querySelector("audio");
        const playPauseIcon = document.getElementById("playPause");
        firstRowDiv.addEventListener("dblclick", function () {
          songSource.setAttribute("src", `${data.tracks.data[0].preview}`);

          if (playPauseIcon.classList.contains("bi-play-circle-fill")) {
            playPauseIcon.classList.toggle("bi-play-circle-fill");
            playPauseIcon.classList.toggle("bi-pause-circle-fill");
          }

          //check audio is playing
          if (!audioElement.paused) {
            audioElement.pause();
          } else {
            audioElement.play();
          }

          // caricamento e avvio song
          audioElement.load();
          audioElement.play();

          // Recupero dati per player
          playerImageSongSmall.setAttribute("src", `${data.cover_small}`);
          playerImageSongBig.setAttribute("src", `${data.cover_small}`);
          let songTitle = data.tracks.data[0].title;
          let artistName = data.artist.name;
          titleSongSmall.innerText = songTitle;
          titleElementBig.innerText = songTitle;
          ArtistNamePlayer.innerText = artistName;
        });
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  });
};

const createForYou = function () {
  forYouAlbum.forEach((el, i) => {
    fetch(albumUrl + el)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel recupero dei dati");
        }
      })
      .then((data) => {
        let newCol = document.createElement("div");
        newCol.classList.add("col", "col-6", "col-lg-3");
        newCol.innerHTML = `
                <div class="card rounded-2 h-100 p-3 text-bg-dark">
                    <img src="${
                      data.cover_medium
                    }" class="card-img rounded-2" alt="cover">
                    <div class="card-body p-0 mt-2">
                        <h5 class="card-title p-0">Daily Mix ${i + 1}</h5>
                        <a href="albumPage.html?id=${
                          data.id
                        }" class="link-light fs-6 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover">${
          data.title
        }</a>
                        <a href="artistPage.html?id=${
                          data.artist.id
                        }" class="link-secondary link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover d-block">${
          data.artist.name
        }</a>
                    </div>
                </div>
                `;
        secondRow.appendChild(newCol);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  });
};

const mixAlbums = function () {
  fetch(searchUrl)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    })
    .then((data) => {
      for (let i = 0; i < 4; i++) {
        const randomN = function () {
          let random = randomNumber();
          if (mixAlbum.includes(data.data[random].album.id)) {
            randomN();
          } else {
            mixAlbum.push(data.data[random].album.id);
          }
        };
        randomN();
      }
      mixForYou();
    })
    .catch((err) => {
      console.log(err);
    });
};
mixAlbums();

const mixForYou = function () {
  mixAlbum.forEach((el) => {
    fetch(albumUrl + el)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel recupero dei dati");
        }
      })
      .then((data) => {
        let newCol = document.createElement("div");
        newCol.classList.add("col", "col-6", "col-lg-3");
        newCol.innerHTML = `
                <div class="card rounded-2 h-100 p-3 text-bg-dark">
                    <img src="${data.cover_medium}" class="card-img rounded-2" alt="cover">
                    <div class="card-body p-0 mt-2">
                        <h5 class="card-title p-0">Mix ${data.artist.name}</h5>
                        <a href="albumPage.html?id=${data.id}" class="link-light fs-6 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover">${data.title}</a>
                        <a href="artistPage.html?id=${data.artist.id}" class="link-secondary link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover d-block">${data.artist.name}</a>
                    </div>
                </div>
                `;
        thirdRow.appendChild(newCol);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  });
};

const recentAlbums = function () {
  fetch(searchUrl)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    })
    .then((data) => {
      for (let i = 0; i < 4; i++) {
        const randomN = function () {
          let random = randomNumber();
          if (recentAlbum.includes(data.data[random].album.id)) {
            randomN();
          } else {
            recentAlbum.push(data.data[random].album.id);
          }
        };
        randomN();
      }
      recentForYou();
    })
    .catch((err) => {
      console.log(err);
    });
};
recentAlbums();

const recentForYou = function () {
  recentAlbum.forEach((el) => {
    fetch(albumUrl + el)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel recupero dei dati");
        }
      })
      .then((data) => {
        let newCol = document.createElement("div");
        newCol.classList.add("col", "col-6", "col-lg-3");
        newCol.innerHTML = `
                <div class="card rounded-2 h-100 p-3 text-bg-dark">
                    <img src="${data.cover_medium}" class="card-img rounded-2" alt="cover">
                    <div class="card-body p-0 mt-2">
                        <h5 class="card-title p-0">${data.artist.name}</h5>
                        <a href="albumPage.html?id=${data.id}" class="link-light fs-6 link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover">${data.title}</a>
                        <a href="artistPage.html?id=${data.artist.id}" class="link-secondary link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover d-block">${data.artist.name}</a>
                    </div>
                </div>
                `;

        fourthRow.appendChild(newCol);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  });
};

const searchForm = document.querySelector("header form");
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mySearch = document.querySelector("#searchF");
  const myValue = mySearch.value;
  searchResult(myValue);
  mySearch.value = "";
});

const searchResult = function (value) {
  fetch(myUrl + value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    })
    .then((data) => {
      firstRow.innerHTML = "";
      secondRow.innerHTML = "";
      thirdRow.innerHTML = "";
      fourthRow.innerHTML = "";
      choosenAlbums = [];
      for (let i = 0; i < 6; i++) {
        const randomN = function () {
          let random = randomNumber();
          if (choosenAlbums.includes(data.data[random].album.id)) {
            randomN();
          } else {
            choosenAlbums.push(data.data[random].album.id);
          }
        };
        randomN();
      }
      getAlbum();
      forYouAlbum = [];
      for (let i = 0; i < 4; i++) {
        const randomN = function () {
          let random = randomNumber();
          if (forYouAlbum.includes(data.data[random].album.id)) {
            randomN();
          } else {
            forYouAlbum.push(data.data[random].album.id);
          }
        };
        randomN();
      }
      createForYou();
      mixAlbum = [];
      for (let i = 0; i < 4; i++) {
        const randomN = function () {
          let random = randomNumber();
          if (mixAlbum.includes(data.data[random].album.id)) {
            randomN();
          } else {
            mixAlbum.push(data.data[random].album.id);
          }
        };
        randomN();
      }
      mixForYou();
      recentAlbum = [];
      for (let i = 0; i < 4; i++) {
        console.log("DATA", data.data.length);
        const randomN = function () {
          let random = randomNumber();
          if (recentAlbum.includes(data.data[random].album.id)) {
            randomN();
          } else {
            recentAlbum.push(data.data[random].album.id);
          }
        };
        randomN();
      }
      recentForYou();
    })
    .catch((err) => {
      console.log(err);
    });
};

const homeB = function () {
  const iconHomeEmpty = document.querySelector("#home-empty");
  iconHomeEmpty.classList.add("d-none");
  const iconHomeFill = document.querySelector(".bi-house-door-fill");
  iconHomeFill.classList.remove("d-none");
};

const homeButton = document.querySelector("#homeB a");
homeButton.addEventListener("click", homeB);

const searchB = function () {
  const searchForm = document.querySelector("header form");
  searchForm.classList.remove("d-none");
};

const searchButton = document.querySelector("#searchB a");
searchButton.addEventListener("click", searchB);

const center = document.getElementById("center");
const header = document.querySelector("header");
center.addEventListener("scroll", function (e) {
  if (center.scrollTop > 80) {
    header.classList.add("header-color");
  } else {
    header.classList.remove("header-color");
  }
});

const firstRowDiv = document.querySelectorAll(".spotify-div");
firstRowDiv.forEach((el) => {
  console.log(firstRowDiv);
  const spotyPlay = document.querySelector(".spotify-play");
  el.addEventListener("mouseover", function () {
    spotyPlay.classList.remove("d-none");
  });
});

const iconX = document.querySelector(".bi-x-lg");
const aside = document.querySelector("aside");
iconX.addEventListener("click", function () {
  aside.classList.remove("d-xl-block");
});

const library = document.querySelector("#library");
const spanH = document.querySelector("#homeB span");
const spanS = document.querySelector("#searchB span");
const spanF = document.querySelector("#searchB form");
const ulSpan = document.querySelector("#second-ul span");
const navLinks = document.querySelector("#nav-links");
const playlistS = document.querySelector("#playlist-section");
const mySearchBox = document.querySelector("#my-search");
const libIcons = document.querySelector("#library-icons");
const nav = document.querySelector("nav");
library.addEventListener("click", function () {
  spanH.classList.toggle("d-none");
  spanS.classList.toggle("d-none");
  // spanF.classList.add('d-none')
  ulSpan.classList.toggle("d-none");
  navLinks.classList.toggle("d-none");
  playlistS.classList.toggle("d-none");
  mySearchBox.classList.toggle("d-none");
  libIcons.classList.toggle("d-none");
  nav.classList.toggle("nav-width");
});

const arrow = document.querySelector(".bi-arrow-right-short");
const arrowLeft = document.querySelector(".bi-arrow-left-short");
arrow.addEventListener("click", function () {
  nav.classList.add("nav-expand");
  arrow.classList.add("d-none");
  arrowLeft.classList.remove("d-none");
});

arrowLeft.addEventListener("click", function () {
  nav.classList.remove("nav-expand");
  arrow.classList.remove("d-none");
  arrowLeft.classList.add("d-none");
});

const buttonLeft = document.querySelector(".bi-chevron-left");
const buttonRight = document.querySelector(".bi-chevron-right");

buttonLeft.addEventListener("click", function () {
  history.back();
});

buttonRight.addEventListener("click", function () {
  history.go(+1);
});

const year = function () {
  const date = new Date();
  const currentYear = date.getFullYear();
  return currentYear;
};

const myYear = year();

const yearSpan = document.querySelector("#year");
yearSpan.innerHTML = myYear;

const hours = function(){
  const today = new Date();
  const now = today.toLocaleTimeString();
  const hour = now.split(':')[0]
  const numHour = Number(hour)
  return numHour
}

let actualHour = hours()
 const mainTitle = document.querySelector('main h2')

 const setTitle = function(){
  if(actualHour < 12){
    mainTitle.innerHTML = 'Buongiorno'
  }else if(actualHour < 18){
    mainTitle.innerHTML = 'Buon pomeriggio'
  }else{
    mainTitle.innerHTML = 'Buonasera'
  }
 }

 setTitle()
