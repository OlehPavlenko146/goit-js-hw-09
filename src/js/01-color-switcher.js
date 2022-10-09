let intervalId = null;
const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

refs.btnStart.addEventListener('click', onBtnStartClick);
refs.btnStop.addEventListener('click', onBtnStopClick);

notActiveBtn(refs.btnStop);

function isActiveBtn(element) {
  element.disabled = false;
}

function notActiveBtn(element) {
  element.disabled = true;
}

function onBtnStartClick(event) {
  changeBgColor();
  notActiveBtn(event.target);
  isActiveBtn(refs.btnStop);
  intervalId = setInterval(changeBgColor, 1000);
}

function onBtnStopClick(event) {
  notActiveBtn(event.target);
  isActiveBtn(refs.btnStart);
  clearInterval(intervalId);
}

function changeBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
