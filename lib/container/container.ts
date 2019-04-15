class Container {
  private _providers: Map<symbol, any> = new Map();

  public set(key: symbol, value: any): void {
    this._providers.set(key, value);
  }

  public get(value: any): any {
    return this._providers.get(value)
  }
}

export const ContainerInstance = new Container();