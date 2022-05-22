interface PauseGameCallback {
  (): void; 
}

export abstract class GameplayService {
  private static ctx: CanvasRenderingContext2D;
  private static renderRequestId: number;
  private static processKeyboardEventThunk: (e: KeyboardEvent) => void;
  private static isPaused: boolean;
  private static pauseGame: PauseGameCallback;

  private static processFrame() {
    this.ctx.fillStyle = 'rgb(200, 0, 0)';
    this.ctx.fillRect(10, 10, 50, 50);

    this.ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    this.ctx.fillRect(30, 30, 50, 50);

    this.renderRequestId = window.requestAnimationFrame(this.processFrame.bind(this));
  }

  private static processKeyboardInput(e: KeyboardEvent): void {
    if (e.defaultPrevented || this.isPaused) {
      return;
    }

    switch (e.code) {
      case 'Escape':
        this.isPaused = true;
        this.pauseGame();
        break;
      default:
        return;
    }
  }

  public static start(ctx: CanvasRenderingContext2D, pauseCallback: PauseGameCallback) {
    this.ctx = ctx;
    this.isPaused = false;
    this.pauseGame = pauseCallback;

    // Set up input handling.
    this.processKeyboardEventThunk = this.processKeyboardInput.bind(this);
    window.addEventListener('keydown', this.processKeyboardEventThunk);

    // Start rendering.
    this.renderRequestId = window.requestAnimationFrame(this.processFrame.bind(this));
  }

  public static stop() {
    window.removeEventListener('keydown', this.processKeyboardEventThunk);
    window.cancelAnimationFrame(this.renderRequestId);
  }

  public static unpause() {
    this.isPaused = false;
  }
}
