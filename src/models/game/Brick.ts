import { GameAssetService } from '@/services/GameAssetService';
import { BrickType} from './BrickType';
import { Constants } from './Constants';

export class Brick {
  x: number;
  y: number;
  type: BrickType;
  sprite: HTMLImageElement;

  constructor(x: number = 0, y: number = 0, type: BrickType = BrickType.Normal) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.sprite = GameAssetService.fetchImage('greenBrick');
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.sprite, this.x, this.y, Constants.brickWidth, Constants.brickHeight);
  }
}
