export interface IRegister {
  element: any | { new(...args: Array<any>): any };
  providerName?: string;
  args?: Array<any>
}