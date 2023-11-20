import { Brick } from "@/models/game/Brick";
import { Constants } from "@/models/game/Constants";
import { Level } from "@/models/game/Level";
import { GameAssetService } from "../GameAssetService";

export abstract class LevelGenerationService {
  public static generate(currentLevel: number, canvasWidth: number, canvasHeight: number): Level {
    const level = new Level();

    const levelHeight = 3 * (currentLevel % 4) + ((currentLevel % 3) * 2) + 1;

    for (let i = 0; i < levelHeight; i++) {
      level.bricks[i] = [];
      for (let j = 0; j < Constants.maxLevelWidth; j++) {
        const brick = new Brick();

        const brickSpriteIndex = 1 + (currentLevel * (j + i + 2)) + (3 + currentLevel);
        const brickRandomizer = j * brickSpriteIndex + 69 - i + currentLevel;

        switch (brickSpriteIndex * brickRandomizer % (currentLevel + i + j)) {
          case 0:
            brick.sprite = GameAssetService.fetchImage("purpleBrick");
            break;
          case 1:
            brick.sprite = GameAssetService.fetchImage("greenBrick");
            break;
          case 2:
            brick.sprite = GameAssetService.fetchImage("redBrick");
            break;
          case 3:
            brick.sprite = GameAssetService.fetchImage("blueBrick");
            break;
          case 4:
            brick.sprite = GameAssetService.fetchImage("pinkBrick");
            break;
          case 5:
            brick.sprite = GameAssetService.fetchImage("orangeBrick");
            break;
        }

        brick.y = Constants.levelStartY + (i * Constants.brickHeight);
        brick.x = Constants.levelPaddingX + (j * Constants.brickWidth);

        level.bricks[i][j] = brick;
      }
    }

    return level;
  }
}
