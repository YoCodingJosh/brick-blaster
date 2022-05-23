import { Level } from "@/models/game/Level";

const MAX_LEVEL_WIDTH = 13;

export abstract class LevelGenerationService {
  public static generate(level: number): Level {
    return new Level();
  }
}
