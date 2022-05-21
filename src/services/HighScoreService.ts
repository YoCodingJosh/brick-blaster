import type { HighScoreData, HighScoreDataEvent } from "@/models/HighScoreData";

export abstract class HighScoreService {
  public static updateScore(newScore?: number, newLevelReached?: number): void {
    // TODO:
    this.dispatchScoreUpdate();
  }

  public static dispatchScoreUpdate(): void {
    window.dispatchEvent(new CustomEvent<HighScoreDataEvent>('highscore-localstorage-changed', {
      detail: {
        jsonDataString: localStorage.getItem('HighScore') ?? undefined,
      },
    }));
  }

  public static blankScoreData(): HighScoreData | null {
    return null;
  }

  public static clearHighScoreData(): void {
    localStorage.clear();
    this.dispatchScoreUpdate();
  }
}
