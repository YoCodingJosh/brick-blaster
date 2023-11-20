import type { HighScoreData } from "../HighScoreData";
import type { Ball } from "./Ball";
import type { Brick } from "./Brick";
import { BrickType } from "./BrickType";
import { Constants } from "./Constants";

export class Level {
  bricks: Brick[][] = [];
  private _isComplete = false;
  private remainingBricks: number = -1;

  constructor(bricks: Brick[][]) {
    this.bricks = bricks;
    this.remainingBricks = this.bricks.flat().filter(brick => brick.type != BrickType.Unbreakable).length;
    this._isComplete = false;
  }

  update(deltaTime: number, ball: Ball, score: HighScoreData) {
    for (let i = 0; i < this.bricks.length; i++) {
      for (let j = 0; j < this.bricks[i].length; j++) {
        if (this.bricks[i][j].removed) continue;

        // this.bricks[i][j].update(deltaTime);
        
        if (ball.handleBrickCollision(this.bricks[i][j], deltaTime)) {
          this.bricks[i][j].removed = true;
          score.highScore += Constants.brickDestroyPoints;

          this.remainingBricks--;

          if (this.remainingBricks === 0) {
            this._isComplete = true;
          }
        }
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.bricks.length; i++) {
      for (let j = 0; j < this.bricks[i].length; j++) {
        if (this.bricks[i][j].removed) continue;

        this.bricks[i][j].draw(ctx);
      }
    }
  }

  public get isComplete() {
    return this._isComplete;
  }
}
