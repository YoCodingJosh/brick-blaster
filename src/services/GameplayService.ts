export interface MainMenuCallback {
  (): void;
};

export abstract class GameplayService {
  private static ctx: CanvasRenderingContext2D;
  private static renderRequestId: number;

  private static processFrame() {
    this.ctx.fillStyle = 'rgb(200, 0, 0)';
    this.ctx.fillRect(10, 10, 50, 50);

    this.ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    this.ctx.fillRect(30, 30, 50, 50);

    this.renderRequestId = window.requestAnimationFrame(this.processFrame.bind(this));
  }

  public static start(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;

    this.renderRequestId = window.requestAnimationFrame(this.processFrame.bind(this));
  }

  public static stop() {
    window.cancelAnimationFrame(this.renderRequestId);
  }
};
