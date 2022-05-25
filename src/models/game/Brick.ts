import { GameAssetService } from '@/services/GameAssetService';
import { BrickType} from './BrickType';

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

  }
}
