const fireWorkContainer = document.querySelector(".firework-container");
const daySpan = document.querySelector("#days");
const hourSpan = document.querySelector("#hours");
const minuteSpan = document.querySelector("#minutes");
const secondSpan = document.querySelector("#seconds");
const newYearPositive = document.querySelector("#newyear-positive");
const newYearLunar = document.querySelector(".newyear");

const firework = new Fireworks(fireWorkContainer, {
  speech: 4,
  acceleration: 2,
  friction: 1,
  gravity: 4,
  particles: 600,
  explosion: 10,
});

const nowYear = new Date();
newYearPositive.innerHTML = nowYear.getFullYear();
newYearLunar.innerHTML = `Tết ${getYearCanChi(nowYear.getFullYear())}`;

const datePos = nowYear.getDate();
const monthPos = months[nowYear.getMonth()];

const dayLunar = getLunarDate(datePos, monthPos, nowYear.getFullYear()).day
const monthLunar = getLunarDate(datePos, monthPos, nowYear.getFullYear()).month
const yearLunar = getLunarDate(datePos, monthPos, nowYear.getFullYear()).year

const countDateTime = new Date(yearLunar + 1, months[0], 1).getTime();
const countdown = () => {
  const nowTime = new Date().getTime();
  const distance = countDateTime - nowTime;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daySpan.innerHTML = days;
  hourSpan.innerHTML = hours;
  minuteSpan.innerHTML = minutes;
  secondSpan.innerHTML = seconds;

    if (distance < 0) {
      clearInterval(countdownInterval);
    }
};

firework.start();
countdown();
const countdownInterval = setInterval(countdown, 1000);
