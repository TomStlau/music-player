const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const audioElement = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const currentTimeElement = document.getElementById('current-time')
const durationElement = document.getElementById('duration')
const progress = document.getElementById('progress')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
let isPlaying = false

// Song titles

const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design'
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (remix)',
    artist: 'Jacinto Design'
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design'
  },
  {
    name: 'metric-1',
    displayName: 'Front Row /Remix ',
    artist: 'Metric/Jacinto Design'
  }
]

function loadSong (song) {
  title.textContent = song.displayName
  artist.textContent = song.artist
  audioElement.src = `music/${song.name}.mp3`
  image.src = `img/${song.name}.jpg`
}

function formatTime (time) {
  const minutes = Math.floor(time / 60)
  time %= 60
  const seconds = Math.floor(time)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

function updateProgress (e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
    currentTimeElement.textContent = formatTime(currentTime)
    if (duration) {
      durationElement.textContent = formatTime(duration)
    }
  }
}

function setProgress (e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audioElement.duration
  audioElement.currentTime = (clickX / width) * duration
  progress.style.width = `${(clickX / width) * 100}%`
}

let songIndex = 0

function nextSong () {
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadSong(songs[songIndex])
  playSong()
}

function prevSong () {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex])
  playSong()
}

loadSong(songs[songIndex])

function playSong () {
  audioElement.play()
  playBtn.classList.replace('fa-play', 'fa-pause')
  playBtn.setAttribute('title', 'Pause')
  isPlaying = true
}

function pauseSong () {
  audioElement.pause()
  playBtn.classList.replace('fa-pause', 'fa-play')
  playBtn.setAttribute('title', 'Play')
  isPlaying = false
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong()
})

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audioElement.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)
audioElement.addEventListener('ended', nextSong)
