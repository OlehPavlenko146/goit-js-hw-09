import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const setTime = function (data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
};

player.on('timeupdate', throttle(setTime, 1000));

const onPlay = function (data) {
  if (localStorage.length !== 0) {
    player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
  }
  if (localStorage.length === 0) {
    player.setCurrentTime(data.seconds);
  }
};

player.on('play', onPlay);
