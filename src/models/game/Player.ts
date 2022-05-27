import { Constants } from "./Constants";

export class Player {
  x: number;
  y: number;
  isMovingLeft = false;
  isMovingRight = false;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = "#DADBC1";
    ctx.fillRect(this.x, this.y, Constants.playerWidth, Constants.playerHeight);
    ctx.closePath();
  }

  processKeyboardDownInput(e: KeyboardEvent) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      this.isMovingRight = true;
      this.isMovingLeft = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
      this.isMovingLeft = true;
      this.isMovingRight = false;
    }
  }

  processKeyboardUpInput(e: KeyboardEvent) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      this.isMovingRight = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
      this.isMovingLeft = false;
    } else {
      this.isMovingLeft = false;
      this.isMovingRight = false;
    }
  }

  processTouchEvent(e: TouchEvent) {

  }

  processMouseEvent(e: MouseEvent) {

  }

  update(deltaTime: number, canvasWidth: number) {
    if (this.isMovingRight) {
      this.x += Constants.playerMoveSpeed;

      if (this.x + (Constants.playerWidth + Constants.playerMoveSpeed) > canvasWidth) {
        this.x = canvasWidth - Constants.playerWidth;
      }
    } else if (this.isMovingLeft){
      this.x -= Constants.playerMoveSpeed;

      if (this.x < 0) {
        this.x = 0;
      }
    }
  }
}
