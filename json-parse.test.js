import { expect, test, describe } from 'vitest';
import { parseJson } from './json-parse';
describe('my json parser', () => {
  test('can parse a simple json', () => {
    const json = '{"name": "Alice"}';
    const obj = parseJson(json);
    expect(obj.name).toBe('Alice');
  });

  test('can parse a multiline json', () => {
    const json = `{
      "name": "Alice",
      "age": "25"
    }`;
    const obj = parseJson(json);
    expect(obj.name).toBe('Alice');
    expect(obj.age).toBe('25');
  });

  test('can parse a json that starts on the second line', () => {
    const json = `
    {
      "name": "Alice",
      "age": "25"
    }`;
    const obj = parseJson(json);
    expect(obj.name).toBe('Alice');
    expect(obj.age).toBe('25');
  });
});
