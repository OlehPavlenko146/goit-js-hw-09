import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
intervalId = null;

const refs = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.input.addEventListener('input', onInput);
refs.btn.addEventListener('click', onBtnClick);

notActive(refs.btn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
  },
};

const fp = flatpickr('#datetime-picker', options);

function isActive(element) {
  element.disabled = false;
}

function notActive(element) {
  element.disabled = true;
}

function onInput() {
  if (fp.selectedDates[0].getTime() < Date.now()) {
    notActive(refs.btn);
    return alert('Please choose a date in the future');
  }
  isActive(refs.btn);
}

let isActiveReverseTimer;

function onBtnClick() {
  if (isActiveReverseTimer) {
    return;
  }
  notActive(refs.btn);
  notActive(refs.input);
  reverseTimer();
}

function reverseTimer() {
  isActiveReverseTimer = true;
  const chosenDateMs = fp.selectedDates[0].getTime();
  intervalId = setInterval(() => {
    const currentDateMs = Date.now();
    const deltaTime = chosenDateMs - currentDateMs;
    if (deltaTime > 0) {
      console.log(convertMs(deltaTime));
      updateReverseTimerFace(convertMs(deltaTime));
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateReverseTimerFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
