import { Metadata } from './metadata';

describe('metadata', () => {
  describe('when generating a symbol for a named function', () => {
    let namedFunction: () => void;
    beforeEach(() => {
      namedFunction = () => 'FN';
    });

    it('should generate the expected unique symbol using the function name', () => {
      expect(Metadata.registerSymbolFor(namedFunction)).toBe(Symbol.for(`__IOC__META__:namedFunction`));
    });
  });

  describe('when generating a symbol for an anonymous function', () => {
    it('should throw', () => {
      expect(() => Metadata.registerSymbolFor(() => {
      })).toThrowError();
    });
  });

  describe('when generating a symbol for a non function type', () => {
    describe('when generating it with a provider name', () => {
      it('should generate the expected unique symbol', () => {
        expect(Metadata.registerSymbolFor({}, 'asd')).toBe(Symbol.for(`__IOC__META__:__TKN:asd`));
      });
    });

    describe('when a token is not provided', () => {
      it('should throw', () => {
        expect(() => Metadata.registerSymbolFor({}, null)).toThrowError()
      });
    });

    describe('when registering an array', () => {
      it('should return the correct symbol', () => {
        expect(Metadata.registerSymbolFor([], 'constantArray')).toBe(Symbol.for(`__IOC__META__:__TKN:constantArray`));
      });
    });
  });

  describe('when getting a symbol', () => {
    let symbolToken: symbol;
    describe('when getting a symbol for a function element', () => {
      class MyClass {
      }

      beforeEach(() => {
        symbolToken = Metadata.registerSymbolFor(MyClass)
      });

      it('should retrieve the same symbol reference', () => {
        expect(symbolToken === Metadata.getSymbolFor(MyClass)).toBe(true)
      });
    });

    describe('when getting a symbol for a non function element', () => {
      describe('when getting a symbol for a constant', () => {
        beforeEach(() => {
          symbolToken = Metadata.registerSymbolFor([1, 2, 3, 4], 'constantArray')
        });

        it('should retrieve the same symbol reference', () => {
          expect(symbolToken === Metadata.getSymbolFor('constantArray')).toBe(true);
        });
      });
    });
  });
});