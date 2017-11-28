import Square from './square.js';
import Keyboard from './keyboard.js';

class Hero extends Square {
  constructor(game, color) {
    super(game, color);
    this.setMovementAxis = this.setMovementAxis.bind(this);
    this.resetMovementAxis = this.resetMovementAxis.bind(this);
    this.movement = {
      x: 0, y: 0
    };
    this.keys = {
      [Keyboard.DOWN]: {
        isPressed: false, 
        opposite: Keyboard.UP, 
        movement: {axis: 'y', direction: 1}
      },
      [Keyboard.UP]: {
        isPressed: false, 
        opposite: Keyboard.DOWN, 
        movement: {axis: 'y', direction: -1}
      },
      [Keyboard.LEFT]: {
        isPressed: false, 
        opposite: Keyboard.RIGHT, 
        movement: {axis: 'x', direction: -1}
      },
      [Keyboard.RIGHT]: {
        isPressed: false, 
        opposite: Keyboard.LEFT, 
        movement: {axis: 'x', direction: 1}
      },
    };
    window.addEventListener('keydown', this.setMovementAxis);
    window.addEventListener('keyup', this.resetMovementAxis);
  }

  setMovementAxis(e) {
    const key = this.keys[e.keyCode];
    key.isPressed = true;
    this.movement[key.movement.axis] = key.movement.direction;
  }

  resetMovementAxis(e) {
    const key = this.keys[e.keyCode];
    key.isPressed = false;
    if (this.keys[key.opposite].isPressed) {
      this.setMovementAxis({keyCode: key.opposite});
    } else {
      this.movement[key.movement.axis] = 0;
    }
  }

  isCornered() {
    return (
      this._area.x + this._area.width - Square.SIZE === this.x ||
      this._area.y + this._area.height - Square.SIZE === this.y ||
      this._area.x === this.x ||
      this._area.y === this.y
    );
  }

  isStandingStill() {
    return (this.movement.x + this.movement.y === 0);
  };

  update(ctx) {
    this.x += this.movement.x * this._game.speed;
    this.y += this.movement.y * this._game.speed;
    if (this.isCornered() || this.isStandingStill()) {
      window.dispatchEvent(new CustomEvent('stallscore'));
    } else {
      window.dispatchEvent(new CustomEvent('startscore'));
    }
    super.update(ctx);
  }

  destroy() {
    window.removeEventListener('keydown', this.onKeuUp);
  }
}

export default Hero;