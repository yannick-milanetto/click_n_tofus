import Hero from './hero';
import Ball from './ball';

export default class GameManager {
  constructor() {
    this.images = {};
    this.fps = 30;
    this.drawing = false;
    this.numFramesDrawn = 0;
    this.curFPS = 0;
    this.level = 1;
    this.maxLevel = 10;
    this.speed = 15;
    this.curLoadResNum = 0;
    this.totalLoadResources = 9;
    this.displayList = [];

    this.prepareCanvas();
  }

  start() {
    this.frameInterval = setInterval(() => this.update(), 1000 / this.fps);
    this.fpsInterval = setInterval(() => this.updateFPS(), 1000);
  }

  resourceLoaded() {
    this.curLoadResNum += 1;
    if (this.curLoadResNum === this.totalLoadResources) {
      this.start();
    }
  }

  loadImage(name) {
    this.images[name] = new Image();
    this.images[name].onload = () => this.resourceLoaded();
    this.images[name].src = `images/${name}.png`;
  }

  prepareCanvas() {
    this.canvas = global.document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.context.font = 'bold 32px "Reenie Beanie"';
    try {
      this.context.fillText('loading...', 40, 140);
    } catch (ex) {}

    // Load images
    this.loadImage('leftArm');
    this.loadImage('legs');
    this.loadImage('torso');
    this.loadImage('rightArm');
    this.loadImage('head');
    this.loadImage('hair');
    this.loadImage('leftArm-jump');
    this.loadImage('legs-jump');
    this.loadImage('rightArm-jump');

    // background = new Background();
    // displayList.push(background);

    this.hero = new Hero(this.context, this.images);
    this.hero.setX(200);
    this.hero.setY(185);
    this.displayList.push(this.hero);

    this.ball = new Ball(this.context);
    this.ball.setX(this.canvas.width);
    this.ball.setY(200);
    this.ball.roll(this.speed, -1);
    this.displayList.push(this.ball);
  }

  clearCanvas() {
    this.canvas.width = this.canvas.width;
  }

  update() {
    this.numFramesDrawn += 1;

    if (this.level < this.maxLevel) {
      if (this.ball.getX() < 0) {
        this.speed += 2;
        this.level += 1;

        if (this.level > this.maxLevel) {
          this.ball.stop();
          this.ball.setX(2000);
        } else {
          this.ball.stop();
          this.ball.setX(this.canvas.width + 20);
          setTimeout(() => this.throwBall(), Math.random() * 3000);
        }
      } else if (this.ball.getX() > this.canvas.width + 30) {
        this.ball.roll(this.speed, -1);
      } else if (this.ball.getX() > this.hero.getX()
          && this.ball.getX() < this.hero.getX() + 110
          && !this.hero.getJumping()) {
        this.ball.roll(this.speed * 2, 1);
      }
    } else {
      this.ball.stop();
      this.ball.setX(2000);
    }

    this.redraw();
  }

  redraw() {
    this.clearCanvas();

    for (let i = 0; i < this.displayList.length; i += 1) {
      this.displayList[i].draw();
    }

    this.context.fillStyle = '#000000';
    this.context.font = 'bold 12px sans-serif';
    this.context.fillText(`fps: ${this.curFPS}/${this.fps} (${this.numFramesDrawn})`, 40, 200);

    this.context.font = 'bold 32px "Reenie Beanie"';
    try {
      if (this.level < this.maxLevel) {
        this.context.fillText(`Level: ${this.level} of ${this.maxLevel}`, 300, 40);
      } else {
        this.context.fillText('You Win!', 300, 100);
      }
    } catch (ex) {}
  }

  updateFPS() {
    this.curFPS = this.numFramesDrawn;
    this.numFramesDrawn = 0;
  }

  jump() {
    this.hero.jump();
  }

  blink() {
    this.hero.blink();
  }

  throwBall() {
    this.ball.roll(this.speed, -1);
  }
}
