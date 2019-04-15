import { MetadataPrefix } from './metadata-prefix.enum';

export class Metadata {
  private static _prefix = MetadataPrefix.Generic;
  private static _tokenPrefix = MetadataPrefix.Token;

  public static registerSymbolFor(element: Function): symbol;
  public static registerSymbolFor(element: Array<any> | Object | string, providerName: string): symbol
  public static registerSymbolFor(element: any, providerName?: string): Symbol {
    let _symbol: string,
      _type = this._generateIdentifier(element);
    _symbol = `${this._prefix}${_type}`;
    if (!providerName && _type && !this.isFunction(element)) {
      throw new Error('to create a symbol for a non function type provide a name');
    }

    if (!_type && this.isFunction(element)) {
      throw new Error('is not accepted to provide an anonymous function as a singleton');
    }

    if (providerName) {
      _symbol = _symbol + providerName;
    }

    return Symbol.for(_symbol);
  }

  public static getSymbolFor(element: string | Function): symbol {
    if (this.isFunction(element)) {
      return Symbol.for(`${this._prefix}${this._generateIdentifier(element)}`);
    }

    if (typeof element === 'string') {
      return Symbol.for(`${this._prefix}${this._tokenPrefix}${element}`);
    }
  }

  private static isFunction(element: any): boolean {
    return typeof element === 'function';
  }

  private static _generateIdentifier(element: any): string {
    switch (typeof element) {
      case 'function':
        return (element as Function).name;
      case 'object':
      case 'string':
        return this._tokenPrefix;
    }
  }
}