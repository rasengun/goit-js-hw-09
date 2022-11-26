function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButtonChangeBcgColor = document.querySelector('button[data-start]');
const stopButtonChangeBcgColor = document.querySelector('button[data-stop]');

let timerId = null;

stopButtonChangeBcgColor.setAttribute('disabled', true);

startButtonChangeBcgColor.addEventListener('click', () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    stopButtonChangeBcgColor.removeAttribute('disabled');
    startButtonChangeBcgColor.setAttribute('disabled', true);
  }, 1000);
});

stopButtonChangeBcgColor.addEventListener('click', () => {
  clearInterval(timerId);
  startButtonChangeBcgColor.removeAttribute('disabled');
  stopButtonChangeBcgColor.setAttribute('disabled', true);
});
