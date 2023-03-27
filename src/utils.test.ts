import { compareStatusCode, DEFAULT_RESPONSE_KEY, toTitleCase } from "./utils";

describe('Utils', () => {
  describe('compareStatusCode', () => {
    test('returns 1 when A is the default response key', () => {
      const result = compareStatusCode(DEFAULT_RESPONSE_KEY, '200');
      expect(result).toBe(1);
    });

    test('returns -1 when B is the default response key', () => {
      const result = compareStatusCode('200', DEFAULT_RESPONSE_KEY);
      expect(result).toBe(-1);
    });

    test('returns a positive number when a > b', () => {
      const result = compareStatusCode('400', '200');
      expect(result).toBeGreaterThan(0);
    });

    test('returns a negative number when a < b', () => {
      const result = compareStatusCode('200', '400');
      expect(result).toBeLessThan(0);
    });
  });

  describe('toTitleCase', () => {
    test('returns an empty string when the input is an empty string', () => {
      const result = toTitleCase('');
      expect(result).toEqual('');
    });

    test('returns the correct string when the input is a single letter', () => {
      const result = toTitleCase('a');
      expect(result).toEqual('A');
    });

    test('returns the correct string when the input is a full word', () => {
      const result = toTitleCase('apple');
      expect(result).toEqual('Apple');
    });

    test('returns the input string when the input is already in title case', () => {
      const result = toTitleCase('Apple');
      expect(result).toEqual('Apple');
    });
  });
});
