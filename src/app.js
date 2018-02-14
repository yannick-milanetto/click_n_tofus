// import MainLoop from 'mainloop.js';
import GameManager from './manager';

const game = new GameManager();

document.querySelector('.blinkButton').addEventListener('mousedown', () => game.blink());
document.querySelector('.jumpButton').addEventListener('mousedown', () => game.jump());
