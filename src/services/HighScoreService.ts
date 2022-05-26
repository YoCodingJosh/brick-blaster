import type { HighScoreData, HighScoreDataEvent } from "@/models/HighScoreData";

export abstract class HighScoreService {
  public static updateScore(newScore?: number, newLevelReached?: number): void {
    const highScore = this.getHighScore();

    if (newScore && newScore > highScore.highScore) {
      let jsonString = localStorage.getItem('HighScore') ?? JSON.stringify(this.zeroScoreData());
      let obj = JSON.parse(jsonString) as HighScoreData;
      obj.highScore = newScore;
      localStorage.setItem('HighScore', JSON.stringify(obj));
    }

    if (newLevelReached && newLevelReached > highScore.highestLevelReached) {
      let jsonString = localStorage.getItem('HighScore') ?? JSON.stringify(this.zeroScoreData());
      let obj = JSON.parse(jsonString) as HighScoreData;
      obj.highestLevelReached = newLevelReached;
      localStorage.setItem('HighScore', JSON.stringify(obj));
    }

    this.dispatchScoreUpdate();
  }

  public static dispatchScoreUpdate(): void {
    window.dispatchEvent(new CustomEvent<HighScoreDataEvent>('highscore-localstorage-changed', {
      detail: {
        jsonDataString: localStorage.getItem('HighScore') ?? undefined,
      },
    }));
  }

  public static getHighScore(): HighScoreData {
    return localStorage.getItem('HighScore') ? JSON.parse(localStorage.getItem('HighScore')!) : this.zeroScoreData();
  }

  public static blankScoreData(): HighScoreData | null {
    return null;
  }

  public static zeroScoreData(): HighScoreData {
    return {
      highScore: 0,
      highestLevelReached: 0,
    };
  }

  public static clearHighScoreData(): void {
    localStorage.clear();
    this.dispatchScoreUpdate();
  }
}
