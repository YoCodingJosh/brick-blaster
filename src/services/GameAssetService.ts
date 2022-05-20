import __assetData from '@/assets/game/manifest.json';
import type { GameAssetManifest } from '@/models/GameAssetManifest';

// Loads and manages game assets.
export abstract class GameAssetService {
  private static imagesMap = new Map<string, HTMLImageElement>();

  public static async loadAssets(): Promise<void> {
    const assetData: GameAssetManifest = __assetData;

    let promises: Promise<void>[] = [];

    const devBasePath = './src/assets/game/';
    const prodBasePath = './assets/game/';

    assetData.images.forEach(async (image) => {
      this.imagesMap.set(image.key, new Image());

      this.imagesMap.get(image.key)!.src = (process.env['NODE_ENV'] === 'production' ? prodBasePath : devBasePath) + image.value;
      promises.push(this.imagesMap.get(image.key)!.decode());
    });

    await Promise.all(promises);
  }

  public static fetchImage(id: string): HTMLImageElement | undefined {
    return this.imagesMap.get(id);
  }
};
