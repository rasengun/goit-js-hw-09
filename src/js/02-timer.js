import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputRef = document.querySelector('#datetime-picker');
const startButtonRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

startButtonRef.setAttribute('disabled', true);

let userSelectedDate = null;

flatpickr(inputRef, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notify.failure('Please choose a date in the future');
      startButtonRef.setAttribute('disabled', true);
    } else {
      userSelectedDate = selectedDates[0];
      startButtonRef.removeAttribute('disabled');
    }
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onStartButtonClick() {
  const timerId = setInterval(() => {
    const currentTime = new Date();
    let leftoverTime = userSelectedDate - currentTime;

    if (leftoverTime <= 0) {
      clearInterval(timerId);
      leftoverTime = 0;
    }

    const resultTime = convertMs(leftoverTime);
    updateUserInterface(resultTime);
    inputRef.setAttribute('disabled', true);
    startButtonRef.setAttribute('disabled', true);
  }, 1000);
}

startButtonRef.addEventListener('click', onStartButtonClick);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateUserInterface({ days, hours, minutes, seconds }) {
  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}
