import { GameAssetService } from "@/services/GameAssetService";

export class Background {
  pattern: CanvasPattern;

  constructor(ctx: CanvasRenderingContext2D, backgroundName: string, repeat: string | undefined) {
    this.pattern = ctx.createPattern(GameAssetService.fetchImage(backgroundName)!, repeat ?? 'no-repeat')!;
  }

  draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
    ctx.fillStyle = this.pattern;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }
}
