export default class Ball {
  constructor(context) {
    this.context = context;
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.direction = 1;
    this.dirty = false;
    this.diameter = 20;
    this.color = '#DD3333';
    this.highlightColor = '#fa6565';
    this.rollTimer = setInterval(() => this.updateRoll(), 1000 / 25);
  }

  roll(pSpeed, pDirection) {
    this.speed = pSpeed;
    if (pDirection) {
      this.direction = pDirection;
    }
  }

  stop() {
    this.speed = 0;
  }

  updateRoll() {
    this.x += this.direction * this.speed;
  }

  draw() {
    let centerX = this.x;
    let centerY = this.y + (((this.diameter + 10) / 2) - 2);
    const width = this.diameter + 30;
    const height = 6;

    this.context.beginPath();
    this.context.moveTo(centerX, centerY);
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

    this.context.beginPath();
    this.context.moveTo(this.x, this.y - ((this.diameter + 10) / 2));
    this.context.arc(this.x, this.y, (this.diameter + 10) / 2, 0, 2 * Math.PI, false);
    this.context.fillStyle = '#000000';
    this.context.fill();
    this.context.closePath();

    this.context.beginPath();
    this.context.moveTo(this.x, this.y - (this.diameter / 2));
    this.context.arc(this.x, this.y, this.diameter / 2, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();

    centerX = this.x + 3;
    centerY = this.y - 3;
    this.context.beginPath();
    this.context.moveTo(centerX, centerY);
    this.context.arc(centerX, centerY, this.diameter / 3 / 2, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.highlightColor;
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
}
