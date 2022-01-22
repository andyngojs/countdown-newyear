const songs = [
    {
        name: "Năm qua tôi đã làm gì",
        path: './assets/music/NamQuaToiDaLamGi.mp3',
    },
    {
        name: "1 năm mới bình an",
        path: './assets/music/1nammoibinhan.mp3',
    }
];
let isPlaying = false
let currSong, flag = 0
const audio = new Audio()

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

function selectTrack(flag) {
    songs.forEach((song, index) => {
        if (flag === index) {
            initPlayer(song.path);
        } else {
            playBtn.classList.add("hide")
            pauseBtn.classList.remove("hide")
        }
    })
}

function initPlayer(url) {
    audio.src = url
    audio.play()
    audio.volume = 0.3
    audio.onplay = () => {
        console.log("playingg", flag)
        isPlaying = true
        currSong = audio
    }

    audio.onpause = () => {
        console.log('paused...')
        isPlaying = false
        currSong = null
    }

    audio.onended = () => {
        isPlaying = false
        currSong = null
        flag++
        musicPlay.click()
    }
}
