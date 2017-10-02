/* eslint-disable no-undef */
const camelCaseToSnakeCase = require('../camel-case-to-snake-case');

describe('Camel case to snake case', () => {
  test('Transforms camel case string to snake case', () => {
    expect(camelCaseToSnakeCase('helloWorld')).toBe('hello_world');
  });

  test('Does not transform snake case string', () => {
    expect(camelCaseToSnakeCase('hello_world')).toBe('hello_world');
  });

  test('Transforms camel case object keys to snake case', () => {
    original = {
      someProp: 1,
      anotherProp: 2
    };

    expected = {
      some_prop: 1,
      another_prop: 2
    };

    expect(camelCaseToSnakeCase(original)).toMatchObject(expected);
  });

  test('Does not transform snake case object keys', () => {
    original = {
      some_prop: 1,
      another_prop: 2
    };

    expected = {
      some_prop: 1,
      another_prop: 2
    };

    expect(camelCaseToSnakeCase(original)).toMatchObject(expected);
  });
});
