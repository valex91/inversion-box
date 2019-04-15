import { inject } from '../inject/inject';
import { register } from './register';

describe('register', () => {
  describe('when registering a class', () => {
    let classReference: any;

    beforeEach(() => {
      class TestClass {
        private name: string;
        private surname: string;

        constructor(name: string, surname: string) {
          this.name = name;
          this.surname = surname;
        }

        public greet(): string {
          return `${this.name} ${this.surname}`;
        }
      }

      classReference = TestClass;

      register({
        element: classReference,
        args: ['vale', 'sha']
      });
    });

    it('should initialize the instance and always return that instance', () => {
      expect(inject(classReference)).toBe(inject(classReference));
    });

    describe('when attempting to register the same class twice', () => {
      beforeEach(() => {
        register({
          element: classReference,
          args: ['vale', 'losito']
        });
      });

      it('should store the most recent registered instance', () => {
        expect((inject(classReference) as { greet(): string }).greet()).toBe('vale losito');
      });
    });
  });

  describe('when registering a token', () => {
    beforeEach(() => {
      register({
        element: [1, 2, 3, 4, 5],
        providerName: 'mySpecialArray'
      });

      register({
        element: { 1: 2, 3: 4 },
        providerName: 'mySpecialObject'
      });

      register({
        element: 'constant',
        providerName: 'mySpecialString'
      });
    });

    it('should always return the same reference', () => {
      expect(inject('mySpecialArray') === inject('mySpecialArray')).toBe(true);
      expect(inject('mySpecialObject') === inject('mySpecialObject')).toBe(true);
      expect(inject('mySpecialString') === inject('mySpecialString')).toBe(true);
    });
  });

  describe('when registering the same token twice', () => {
    beforeEach(() => {
      register({
        element: [1, 2, 3, 4, 5],
        providerName: 'mySpecialArray'
      });
      register({
        element: [6, 7, 8, 9],
        providerName: 'mySpecialArray'
      });
    });

    it('should return and store the latest', () => {
      expect(inject('mySpecialArray')).toEqual([6, 7, 8, 9]);
    });
  });
});