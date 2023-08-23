const UrlAlbums = "https://striveschool-api.herokuapp.com/api/deezer/album/";
let myUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
let searchUrl =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=rock";
const addressBarContent = new URLSearchParams(location.search);
const albumId = addressBarContent.get("id");
const coverAlbumRef = document.querySelector("#cover-album img");
const albumNameRef = document.getElementById("album-name");
const albumInfoRef = document.getElementById("album-info");
const songNumberRef = document.getElementById("song-number");
const songTitleRef = document.getElementById("song-title");
const songDurationRef = document.getElementById("song-duration");
const containerCenter = document.getElementById("center");
const headerPage = document.querySelector("#headerClone");

// FUNZIONE COLORE MEDIO
const draw = function (img) {
  let canvas = document.createElement("canvas");
  let c = canvas.getContext("2d");
  c.width = canvas.width = img.clientWidth;
  c.height = canvas.height = img.clientHeight;
  c.clearRect(0, 0, c.width, c.height);
  c.drawImage(img, 0, 0, img.clientWidth, img.clientHeight);
  return c;
};

// scompone pixel per pixel e ritorna un oggetto con una mappa della loro frequenza nell'immagine
const getColors = function (c) {
  let col,
    colors = {};
  let pixels, r, g, b, a;
  r = g = b = a = 0;
  pixels = c.getImageData(0, 0, c.width, c.height);
  for (let i = 0, data = pixels.data; i < data.length; i += 4) {
    r = data[i];
    g = data[i + 1];
    b = data[i + 2];
    a = data[i + 3];
    if (a < 255 / 2) continue;
    col = rgbToHex(r, g, b);
    if (!colors[col]) colors[col] = 0;
    colors[col]++;
  }
  return colors;
};

// trova il colore più ricorrente data una mappa di frequenza dei colori
const findMostRecurrentColor = function (colorMap) {
  let highestValue = 0;
  let mostRecurrent = null;
  for (const hexColor in colorMap) {
    if (colorMap[hexColor] > highestValue) {
      mostRecurrent = hexColor;
      highestValue = colorMap[hexColor];
    }
  }
  return mostRecurrent;
};

// converte un valore in rgb a un valore esadecimale
const rgbToHex = function (r, g, b) {
  if (r > 255 || g > 255 || b > 255) {
    throw "Invalid color component";
  } else {
    return ((r << 16) | (g << 8) | b).toString(16);
  }
};

// inserisce degli '0' se necessario davanti al colore in esadecimale per renderlo di 6 caratteri
const pad = function (hex) {
  return ("000000" + hex).slice(-6);
};

const start = function () {
  // prendo il riferimento all'immagine del dom
  let imgReference = coverAlbumRef;

  // creo il context 2d dell'immagine selezionata
  let context = draw(imgReference);

  // creo la mappa dei colori più ricorrenti nell'immagine
  let allColors = getColors(context);

  // trovo colore più ricorrente in esadecimale
  let mostRecurrent = findMostRecurrentColor(allColors);

  // se necessario, aggiunge degli '0' per rendere il risultato un valido colore esadecimale
  let mostRecurrentHex = pad(mostRecurrent);

  // risultato colore medio
  containerCenter.style.background = `linear-gradient(180deg, #${mostRecurrentHex} 0%, #1e1f1e 25%, #0e0d0d 100%)`;
  headerPage.style.background = `#${mostRecurrentHex}`;
  console.log(mostRecurrentHex);
};

let convert = function (value) {
  return Math.floor(value / 60) + ":" + (value % 60);
};

fetch(UrlAlbums + albumId)
  .then((data) => {
    if (data.ok) {
      return data.json();
    } else {
      throw new Error("Errore nella chiamata API");
    }
  })
  .then((album) => {
    let i = 0;
    console.log("album", album.cover_medium);
    coverAlbumRef.setAttribute("src", album.cover_medium);
    coverAlbumRef.style.height = "250px";
    coverAlbumRef.style.width = "250px";
    albumNameRef.innerText = `${album.title}`;
    albumInfoRef.innerText = `${album.artist.name} • ${album.release_date} • ${album.nb_tracks} brani`;
    console.log("tracks", album.tracks);

    album.tracks.data.forEach((song) => {
      i += 1;
      console.log("SONGS", song.duration);
      let songNumber = document.createElement("p");
      let songTitle = document.createElement("p");
      let songDuration = document.createElement("p");
      songNumber.classList.add("text-light");
      songTitle.classList.add("text-light");
      songDuration.classList.add("text-light");
      songTitle.innerText = `${song.title}`;
      songTitleRef.appendChild(songTitle);
      songDuration.innerText = `${convert(song.duration)}`;
      songDurationRef.appendChild(songDuration);
      songNumber.innerText = i;
      songNumberRef.appendChild(songNumber);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const playlist = [
  "culetto 2021",
  "Frah Quintale",
  "Be the young",
  "minecraft&nintendo switch",
  "Trallallero",
  "saggio vibes",
  "2021 lol",
  "Come trovare gli album",
  "Appendi sto child",
  "Che schifo Bootstrap",
  "Le bestemmine degli Epicoders",
  "Fetchati questo",
  "Francesco Guccini Mix",
  "Lucio Dalla e non fare la preziosa",
  "Bombe a confindustria",
  "Cercasi decimo per il calcetto",
  "Siamo tutti antifascisti",
  "Le magliette belle di Paolo",
  "La partita IVA di Paolo",
  "Sole a mezzanotte di Nino",
  "Torneo di calcetto di Antonio",
  "Pullman di Berlusconi",
  "Vacanza a Gubbio",
  "Saga completa Silent Hill",
  "Budokai Tenkaichi 2",
  "Radio Los Santos",
];

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

// ANIMAZIONE HEADER
const sezioneCentrale = document.getElementById("center");

sezioneCentrale.addEventListener("scroll", () => {
  let scrollTop = sezioneCentrale.pageYOffset || sezioneCentrale.scrollTop;
  headerPage.style.opacity = 0 + scrollTop / 400;
});

const searchB = function () {
  const searchForm = document.querySelector("header form");
  searchForm.classList.remove("d-none");
};

const searchButton = document.querySelector("#searchB a");
searchButton.addEventListener("click", searchB);

const homeB = function () {
  const iconHomeEmpty = document.querySelector("#home-empty");
  iconHomeEmpty.classList.add("d-none");
  const iconHomeFill = document.querySelector(".bi-house-door-fill");
  iconHomeFill.classList.remove("d-none");
};

const homeButton = document.querySelector("#homeB a");
homeButton.addEventListener("click", homeB);

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

const hours = function () {
  const today = new Date();
  const now = today.toLocaleTimeString();
  const hour = now.split(":")[0];
  const numHour = Number(hour);
  return numHour;
};

let actualHour = hours();
const mainTitle = document.querySelector("main h2");

const setTitle = function () {
  if (actualHour < 12) {
    mainTitle.innerHTML = "Buongiorno";
  } else if (actualHour < 18) {
    mainTitle.innerHTML = "Buon pomeriggio";
  } else {
    mainTitle.innerHTML = "Buonasera";
  }
};

// setTitle()

const center = document.getElementById("center");
const header = document.querySelector("header");
center.addEventListener("scroll", function (e) {
  if (center.scrollTop > 80) {
    header.classList.add("header-color");
  } else {
    header.classList.remove("header-color");
  }
})