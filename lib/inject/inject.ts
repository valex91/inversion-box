import { ContainerInstance } from '../container/container';
import { Metadata } from '../metadata/metadata';

export function inject<T = any>(element: any | string): T {
  const _symbol = Metadata.getSymbolFor(element);
  const _instance = ContainerInstance.get(_symbol);

  if (_instance) {
    return _instance;
  } else {
    throw new Error('You need to register a provider before injecting it');
  }
}