import __assetData from '@/assets/game/manifest.json';
import type { GameAssetManifest } from '@/models/GameAssetManifest';

// Loads and manages game assets.
export abstract class GameAssetService {
  private static imagesMap = new Map<string, HTMLImageElement>();

  public static async loadAssets(): Promise<void> {
    const assetData: GameAssetManifest = __assetData;

    const promises: Promise<void>[] = [];

    assetData.images.forEach(async (image) => {
      const imageElement = new Image();
      
      imageElement.src = image.value;
      promises.push(imageElement.decode());
      
      this.imagesMap.set(image.key, imageElement);
    });

    await Promise.all(promises);
  }

  public static fetchImage(id: string): HTMLImageElement | undefined {
    return this.imagesMap.get(id);
  }
}
