export default class Hero {
  constructor(context, images) {
    this.context = context;
    this.images = images;
    this.x = 400;
    this.y = 0;
    this.jumping = false;
    this.blinking = false;
    this.blinkUpdateTime = 100;
    this.blinkTimer = setInterval(() => this.updateBlink(), this.blinkUpdateTime);
    this.breathTimer = setInterval(() => this.updateBreath(), 1000 / 25);
    this.breathInc = 0.1;
    this.breathDir = 1;
    this.breathAmt = 0;
    this.breathMax = 2;
    this.eyeOpenTime = 0;
    this.timeBtwBlinks = 4000;
    this.maxEyeHeight = 14;
    this.curEyeHeight = this.maxEyeHeight;
  }

  updateBreath() {
    // breath in
    if (this.breathDir === 1) {
      this.breathAmt -= this.breathInc;
      if (this.breathAmt < -this.breathMax) {
        this.breathDir = -1;
      }
    } else { // breath out
      this.breathAmt += this.breathInc;
      if (this.breathAmt > this.breathMax) {
        this.breathDir = 1;
      }
    }
  }

  updateBlink() {
    this.eyeOpenTime += this.blinkUpdateTime;
    if (this.eyeOpenTime >= this.timeBtwBlinks) {
      this.blink();
    }
  }

  blink() {
    if (this.blinking === false) {
      this.blinking = true;
      this.blinkLoop();
    }
  }

  blinkLoop() {
    this.curEyeHeight -= 1;
    if (this.curEyeHeight <= 0) {
      this.curEyeHeight = this.maxEyeHeight;
      this.eyeOpenTime = 0;
      this.blinking = false;
    } else {
      setTimeout(() => this.blinkLoop(), 10);
    }
  }

  jump() {
    if (this.jumping === false) {
      this.jumping = true;
      this.y -= 45;
      setTimeout(() => this.land(), 500);
    }
  }

  land() {
    if (this.jumping === true) {
      this.y += 45;
      this.jumping = false;
    }
  }

  draw() {
    this.drawShadow(this.x + 40, this.jumping ? this.y + 29 + 45 : this.y + 29);

    if (this.jumping) {
      this.context.drawImage(this.images['leftArm-jump'], this.x + 40, this.y - 42 - this.breathAmt);
      this.context.drawImage(this.images['legs-jump'], this.x, this.y - 6);
    } else {
      this.context.drawImage(this.images.leftArm, this.x + 40, this.y - 42 - this.breathAmt);
      this.context.drawImage(this.images.legs, this.x, this.y);
    }

    this.context.drawImage(this.images.torso, this.x, this.y - 50);
    this.context.drawImage(this.images.head, this.x - 10, this.y - 125 - this.breathAmt);
    this.context.drawImage(this.images.hair, this.x - 37, this.y - 138 - this.breathAmt);

    if (this.jumping) {
      this.context.drawImage(this.images['rightArm-jump'], this.x - 35, this.y - 42 - this.breathAmt);
    } else {
      this.context.drawImage(this.images.rightArm, this.x - 15, this.y - 42 - this.breathAmt);
    }

    this.drawEye(this.x + 47, this.y - 68 - this.breathAmt);
    this.drawEye(this.x + 58, this.y - 68 - this.breathAmt);
  }

  drawEye(centerX, centerY) {
    const height = this.curEyeHeight;
    const width = 8;

    this.context.beginPath();
    this.context.moveTo(centerX, centerY - (height / 2));

    this.context.bezierCurveTo(
      centerX - (width / 2), centerY - (height / 2),
      centerX - (width / 2), centerY + (height / 2),
      centerX, centerY + (height / 2)
    );

    this.context.bezierCurveTo(
      centerX + (width / 2), centerY + (height / 2),
      centerX + (width / 2), centerY - (height / 2),
      centerX, centerY - (height / 2)
    );

    this.context.fillStyle = '#000000';
    this.context.fill();
    this.context.closePath();
  }

  drawShadow(centerX, centerY) {
    const height = this.jumping ? 4 : 6;
    const width = this.jumping ? 100 : 160 - (this.breathAmt * 2);

    this.context.beginPath();
    this.context.moveTo(centerX, centerY - (height / 2));

    this.context.bezierCurveTo(
      centerX - (width / 2), centerY - (height / 2),
      centerX - (width / 2), centerY + (height / 2),
      centerX, centerY + (height / 2)
    );

    this.context.bezierCurveTo(
      centerX + (width / 2), centerY + (height / 2),
      centerX + (width / 2), centerY - (height / 2),
      centerX, centerY - (height / 2)
    );

    this.context.fillStyle = '#000000';
    this.context.fill();
    this.context.closePath();
  }

  getX() {
    return this.x;
  }

  setX(pX) {
    this.x = pX;
  }

  getY() {
    return this.y;
  }

  setY(pY) {
    this.y = pY;
  }

  getJumping() {
    return this.jumping;
  }
}
