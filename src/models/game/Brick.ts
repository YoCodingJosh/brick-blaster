import { BrickType} from './BrickType';

export class Brick {
  x: number;
  y: number;
  type: BrickType;

  constructor(x: number = 0, y: number = 0, type: BrickType = BrickType.Normal) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
}
