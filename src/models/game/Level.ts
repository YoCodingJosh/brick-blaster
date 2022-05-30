import type { Brick } from "./Brick";

export class Level {
  bricks: Brick[][] = [];

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.bricks.length; i++) {
      for (let j = 0; j < this.bricks[i].length; j++) {
        this.bricks[i][j].draw(ctx);
      }
    }
  }
}
