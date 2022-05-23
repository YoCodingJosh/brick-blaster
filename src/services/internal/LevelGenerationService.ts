import { Brick } from "@/models/game/Brick";
import { Level } from "@/models/game/Level";

const MAX_LEVEL_WIDTH = 13;

export abstract class LevelGenerationService {
  public static generate(currentLevel: number): Level {
    const level = new Level();

    const levelHeight = 2 * (currentLevel % 3);

    for (let i = 0; i < levelHeight; i++) {
      level.bricks[i] = [];
      for (let j = 0; j < MAX_LEVEL_WIDTH; j++) {
        level.bricks[i][j] = new Brick();
      }
    }

    return level;
  }
}
