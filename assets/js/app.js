const fireWorkContainer = document.querySelector(".firework-container");
const daySpan = document.querySelector("#days");
const hourSpan = document.querySelector("#hours");
const minuteSpan = document.querySelector("#minutes");
const secondSpan = document.querySelector("#seconds");
const lunarTimeSpan = document.querySelector(".date-lunar");
const positiveTimeSpan = document.querySelector(".date-positive");
const newYearPositive = document.querySelector("#newyear-positive");
const newYearLunar = document.querySelector(".newyear");
const musicPlay = document.querySelector(".musics");
const playBtn = document.querySelector(".play-btn");
const pauseBtn = document.querySelector(".pause-btn");
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

const firework = new Fireworks(fireWorkContainer, {
  speech: 4,
  acceleration: 2,
  friction: 1,
  gravity: 4,
  particles: 600,
  explosion: 10,
});

// Handle timer and calendar lunar

const nowYear = new Date();
const nextYear = nowYear.getFullYear() + 1
newYearPositive.innerHTML = nextYear;
newYearLunar.innerHTML = getYearCanChi(nextYear);

const countdown = () => {
  const currDate = nowYear.getDate();
  const currMonth = months[nowYear.getMonth()];
  const currYear = nowYear.getFullYear();

  const currDayLunar = getLunarDate(currDate, currMonth, currYear).day
  const currMonthLunar = getLunarDate(currDate, currMonth, currYear).month
  const currYearLunar = getLunarDate(currDate, currMonth, currYear).year
  const currYearCanChi = getYearCanChi(currYearLunar)

  const countDateTime = new Date(currYearLunar + 1, months[0], 1).getTime();
  const nowTime = new Date().getTime();
  const distance = countDateTime - nowTime;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daySpan.innerHTML = days;
  hourSpan.innerHTML = hours;
  minuteSpan.innerHTML = minutes;
  secondSpan.innerHTML = seconds;
  positiveTimeSpan.innerHTML = `Ngày ${currDate} / ${currMonth} / ${currYear} - `
  lunarTimeSpan.innerHTML = `Âm lịch: ${currDayLunar} Tháng ${currMonthLunar} Năm ${currYearLunar} 
    (Năm ${currYearCanChi})`;
  if (distance < 0) {
    clearInterval(countdownInterval);
  }
};

// Handle Music 

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
          initPlayer(song.path, (flag) => {
              selectTrack(flag)
          });
      } 
  })
}

function initPlayer(url, callback) {
  audio.src = url
  if (audio.src !== undefined) {
      audio.play()
  }
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
          callback(++flag)
      } else {
          flag = 0
          callback(flag)
      }
  }
}

// Run Program

firework.start();
countdown();
handleEvent();
const countdownInterval = setInterval(countdown, 1000);
