const songs = [
    {
        name: "Năm qua tôi đã làm gì",
        path: './assets/music/NamQuaToiDaLamGi.mp3',
    },
    {
        name: "1 năm mới bình an",
        path: './assets/music/1nammoibinhan.mp3',
    },
    {
        name: "Happy New Year",
        path: "./assets/music/HappyNewYear-ABBA.mp3"
    }
];
let isPlaying = false
let currSong, flag = 0
const audio = new Audio()

window.addEventListener("load", () => {
    selectTrack(flag);
    playBtn.classList.add("hide")
    pauseBtn.classList.remove("hide")
    pauseBtn.style.animation = 'rotateBtn 2s linear 0.2s infinite'
})

const handleEvent = () => {
    musicPlay.addEventListener("click", (e) => {
        if (isPlaying) {
            playBtn.classList.remove("hide")
            pauseBtn.classList.add("hide")
            currSong.pause()
        } else {
            playBtn.classList.add("hide")
            pauseBtn.classList.remove("hide")
            pauseBtn.style.animation = 'rotateBtn 2s linear 0.2s infinite'
            selectTrack(flag)
        }
    })
}

function  selectTrack(flag) {
    songs.forEach((song, index) => {
        if (flag === index) {
            initPlayer(song.path);
        } 
    })
}

function initPlayer(url) {
    audio.src = url
    audio.play()
    audio.volume = 0.3
    audio.onplay = () => {
        isPlaying = true
        currSong = audio
    }
    audio.onpause = () => {
        isPlaying = false
        currSong = null
    }
    audio.onended = () => {
        isPlaying = false
        currSong = null
        if (flag < songs.length - 1 ) {
            selectTrack(++flag)
        } else {
            flag = 0
            selectTrack(flag)
        }
    }
}
