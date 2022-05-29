interface Key {
  pressed: boolean;
}

export class Keyboard {
  private keys: Map<string, Key>;

  constructor() {
    this.keys = new Map<string, Key>()
  }

  clear() {
    this.keys.clear();
  }

  set(name: string, keyToSet: Key) {
    this.keys.set(name, keyToSet);
  }

  isKeyPressed(code: string) : boolean {
    let value = this.keys.get(code);

    return !value ? false : value!.pressed;
  }

  getKeys(): Map<string, Key> {
    return this.keys;
  }
}
