import type { HighScoreData } from "../HighScoreData";
import type { Ball } from "./Ball";
import type { Brick } from "./Brick";
import { BrickType } from "./BrickType";
import { Constants } from "./Constants";

export class Level {
  bricks: Brick[][] = [];
  private _isComplete: boolean = false;

  

  update(deltaTime: number, ball: Ball, score: HighScoreData) {
    for (let i = 0; i < this.bricks.length; i++) {
      for (let j = 0; j < this.bricks[i].length; j++) {
        if (this.bricks[i][j].removed) continue;

        this.bricks[i][j].update(deltaTime);
        
        if (ball.handleBrickCollision(this.bricks[i][j])) {
          this.bricks[i][j].removed = true;
          score.highScore += Constants.brickDestroyPoints;

          this.memoizeComplete();
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

  // Don't want to do this every frame.
  private memoizeComplete() {
    for (let i = 0; i < this.bricks.length; i++) {
      for (let j = 0; j < this.bricks[i].length; j++) {
        if (this.bricks[i][j].removed || this.bricks[i][j].type == BrickType.Unbreakable) continue;
        this._isComplete = false;
        return;
      }
    }

    this._isComplete = true;
  }

  public get isComplete() {
    return this._isComplete;
  }
}
