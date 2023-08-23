const UrlArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/"
const topSongs = "/top?limit=50"

let myUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q="

let searchUrl =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=rock"

const coverImgRef = document.getElementById("coverImageArtist")
const artistNameRef = document.getElementById("artistName")
const monthlyListenersRef = document.getElementById("monthlyListeners")
const centerDiv = document.getElementById("center")

const addressBarContent = new URLSearchParams(location.search)
const artistId = addressBarContent.get("id")

const randomNumber = function () {
  let num = Math.floor(Math.random() * 5)
  return num
}

let convert = function (value) {
  return Math.floor(value / 60) + ":" + (value % 60)
}

fetch(UrlArtist + artistId)
  .then((artist) => {
    if (artist.ok) {
      return artist.json()
    } else {
      throw new Error("Errore nella chiamata API")
    }
  })
  .then((artists) => {
    console.log("artists", artists)
    centerDiv.style.backgroundImage = `url(${artists.picture_xl})`
    centerDiv.style.backgroundRepeat = "no-repeat"
    centerDiv.style.backgroundSize = "150%"
    centerDiv.style.backgroundPositionY = "80%"
    centerDiv.style.backgroundPositionX = "50%"
    artistNameRef.innerHTML = `
        <h2 class="artistTitle text-light">${artists.name}</h2>
        `
    monthlyListenersRef.innerHTML = `
        <p class="fs-6 text-light">${artists.nb_fan} ascoltatori mensili</p>
        `
  })
  .catch((err) => {
    console.log(err)
  })

fetch(UrlArtist + artistId + topSongs)
  .then((songs) => {
    if (songs.ok) {
      return songs.json()
    } else {
      throw new Error("Errore nel caricamento delle canzoni")
    }
  })
  .then((songs) => {
    console.log(songs)
    songs.data.forEach((song) => {
      console.log("song", song)
      let singleSong = document.createElement("div")
      singleSong.classList.add("d-flex", "align-items-center", "mt-4")
      singleSong.innerHTML = `
        <div style="width:56px; height:56px; background-image:url('${
          song.album.cover_small
        }')"></div>
        <p class="text-light mb-0 ps-3">${song.title}</p>
        <p class="text-secondary ms-auto">${convert(song.duration)}</p>
        `
      songColumn = document.getElementById("songs-column")
      songColumn.appendChild(singleSong)
    })
    console.log("Array", songs)
    let createLiked = function () {
      const randNumber = randomNumber()
      let likedSong = document.createElement("div")
      likedSong.classList.add("d-flex", "align-items-center", "mt-4")
      likedSong.innerHTML = `
        <div style="width:56px; height:56px; background-image:url('${songs.data[randNumber].album.cover_small}')"></div>
        <p class="text-light mb-0 ps-3">${songs.data[randNumber].title}</p>
        `
      likedColumn = document.getElementById("liked-songs")
      likedColumn.appendChild(likedSong)
    }
    createLiked()
  })
  .catch((err) => {
    console.log(err)
  })

fetch(UrlArtist + artistId)
  .then((data) => {
    if (data.ok) {
      return data.json()
    } else {
      throw new Error("Errore nel caricamento delle canzoni")
    }
  })
  .then((albums) => {
    console.log("ALBUMS", albums)
  })
  .catch((err) => {
    console.log(err)
  })

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
]

// const showPlaylist = function () {
//   let ulPlaylist = document.getElementById("lista-playlist")
//   playlist.forEach((playlist) => {
//     let newPlaylist = document.createElement("li")
//     newPlaylist.classList.add("text-secondary")
//     newPlaylist.innerHTML = `
//         <a href="#" class="link-secondary link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover ms-2">${playlist}</a>
//         `
//     ulPlaylist.appendChild(newPlaylist)
//   })
// }

// showPlaylist()

const sezioneCentrale = document.getElementById("center")
// ANIMAZIONE COVER
sezioneCentrale.addEventListener("scroll", () => {
  let scrollTop = sezioneCentrale.pageYOffset || sezioneCentrale.scrollTop
  console.log("scrollTOP", scrollTop)
  document.getElementById("coverImageArtist").style.opacity =
    1 - scrollTop / 250
})

const iconX = document.querySelector(".bi-x-lg")
const aside = document.querySelector("aside")
iconX.addEventListener("click", function () {
  aside.classList.remove("d-xl-block")
})

const library = document.querySelector("#library")
const spanH = document.querySelector("#homeB span")
const spanS = document.querySelector("#searchB span")
const spanF = document.querySelector("#searchB form")
const ulSpan = document.querySelector("#second-ul span")
const navLinks = document.querySelector("#nav-links")
const playlistS = document.querySelector("#playlist-section")
const mySearchBox = document.querySelector("#my-search")
const libIcons = document.querySelector("#library-icons")
const nav = document.querySelector("nav")
library.addEventListener("click", function () {
  spanH.classList.toggle("d-none")
  spanS.classList.toggle("d-none")
  // spanF.classList.add('d-none')
  ulSpan.classList.toggle("d-none")
  navLinks.classList.toggle("d-none")
  playlistS.classList.toggle("d-none")
  mySearchBox.classList.toggle("d-none")
  libIcons.classList.toggle("d-none")
  nav.classList.toggle("nav-width")
})

const arrow = document.querySelector(".bi-arrow-right-short")
const arrowLeft = document.querySelector(".bi-arrow-left-short")
arrow.addEventListener("click", function () {
  nav.classList.add("nav-expand")
  arrow.classList.add("d-none")
  arrowLeft.classList.remove("d-none")
})

arrowLeft.addEventListener("click", function () {
  nav.classList.remove("nav-expand")
  arrow.classList.remove("d-none")
  arrowLeft.classList.add("d-none")
})

const buttonLeft = document.querySelector('.bi-chevron-left')
const buttonRight = document.querySelector('.bi-chevron-right')

buttonLeft.addEventListener('click', function(){
  history.back();
})

buttonRight.addEventListener('click', function(){
  history.go(+1)
})

const year = function(){
  const date = new Date()
  const currentYear = date.getFullYear()
  return currentYear
}

const myYear = year()

const yearSpan = document.querySelector('#year')
yearSpan.innerHTML = myYear

const showPlaylist = function (playlist) {
  console.log(playlist)
  let ulPlaylist = document.getElementById("lista-playlist")
  ulPlaylist.innerHTML = ""
  playlist.forEach((playlistItem) => {
    let newPlaylist = document.createElement("li")
    newPlaylist.classList.add(
      "text-secondary",
      "d-flex",
      "align-items-center",
      "mb-3"
    )
    newPlaylist.innerHTML = `
      <img class="imgPlaylist" src="${playlistItem.cover_small}" alt="cover"/>
      <div class="ps-2 d-flex flex-column justify-content-center">
      <p class="artistPlaylist text-light m-0 p-0">${playlistItem.artist}</p> 
      <a href="#" class="artistPlaylist link-secondary link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover">${playlistItem.title}</a>
      </div>
      `
    ulPlaylist.appendChild(newPlaylist)
  })
}

const createPlaylist = function () {
  fetch(searchUrl)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error("Errore nel recupero dei dati")
      }
    })
    .then((data) => {
      const albumList = data.data.map((item) => {
        return {
          title: item.album.title,
          artist: item.artist.name,
          cover_small: item.album.cover_small,
        }
      })
      showPlaylist(albumList)
    })
    .catch((error) => {
      console.log(error)
    })
}

createPlaylist()

const searchB = function () {
  const searchForm = document.querySelector("header form")
  searchForm.classList.remove("d-none")
}

const searchButton = document.querySelector("#searchB a")
searchButton.addEventListener("click", searchB)

const homeB = function () {
  const iconHomeEmpty = document.querySelector("#home-empty")
  iconHomeEmpty.classList.add("d-none")
  const iconHomeFill = document.querySelector(".bi-house-door-fill")
  iconHomeFill.classList.remove("d-none")
}

const homeButton = document.querySelector("#homeB a")
homeButton.addEventListener("click", homeB)

const searchForm = document.querySelector("header form")
searchForm.addEventListener("submit", function (e) {
  e.preventDefault()
  const mySearch = document.querySelector("#searchF")
  const myValue = mySearch.value
  searchResult(myValue)
  mySearch.value = ""
})

const searchResult = function (value) {
  fetch(myUrl + value)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error()
      }
    })
    .then((data) => {
      firstRow.innerHTML = ""
      secondRow.innerHTML = ""
      thirdRow.innerHTML = ""
      fourthRow.innerHTML = ""
      choosenAlbums = []
      for (let i = 0; i < 6; i++) {
        const randomN = function () {
          let random = randomNumber()
          if (choosenAlbums.includes(data.data[random].album.id)) {
            randomN()
          } else {
            choosenAlbums.push(data.data[random].album.id)
          }
        }
        randomN()
      }
      getAlbum()
      forYouAlbum = []
      for (let i = 0; i < 4; i++) {
        const randomN = function () {
          let random = randomNumber()
          if (forYouAlbum.includes(data.data[random].album.id)) {
            randomN()
          } else {
            forYouAlbum.push(data.data[random].album.id)
          }
        }
        randomN()
      }
      createForYou()
      mixAlbum = []
      for (let i = 0; i < 4; i++) {
        const randomN = function () {
          let random = randomNumber()
          if (mixAlbum.includes(data.data[random].album.id)) {
            randomN()
          } else {
            mixAlbum.push(data.data[random].album.id)
          }
        }
        randomN()
      }
      mixForYou()
      recentAlbum = []
      for (let i = 0; i < 4; i++) {
        console.log("DATA", data.data.length)
        const randomN = function () {
          let random = randomNumber()
          if (recentAlbum.includes(data.data[random].album.id)) {
            randomN()
          } else {
            recentAlbum.push(data.data[random].album.id)
          }
        }
        randomN()
      }
      recentForYou()
    })
    .catch((err) => {
      console.log(err)
    })
}

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

//  setTitle()

const center = document.getElementById("center");
const header = document.querySelector("header");
center.addEventListener("scroll", function (e) {
  if (center.scrollTop > 80) {
    header.classList.add("header-color");
  } else {
    header.classList.remove("header-color");
  }
})

//  // ANIMAZIONE HEADER
// const sezioneCentrale = document.getElementById("center");

// sezioneCentrale.addEventListener("scroll", () => {
//   let scrollTop = sezioneCentrale.pageYOffset || sezioneCentrale.scrollTop;
//   headerPage.style.opacity = 0 + scrollTop / 400;
// });