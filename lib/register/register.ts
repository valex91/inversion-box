import { ContainerInstance } from '../container/container';
import { Metadata } from '../metadata/metadata';
import { IRegister } from './register.interface';

export function register(config: IRegister): void {
  const _symbol: symbol = Metadata.registerSymbolFor(config.element, config.providerName);
  if (config.providerName) {
    return ContainerInstance.set(_symbol, config.element);
  } else {
    const _Class: { new(...args: Array<any>): any } = config.element as { new(...args: Array<any>): any },
      _instance = new _Class(...(config.args || [] ));
    ContainerInstance.set(_symbol, _instance);
  }
}