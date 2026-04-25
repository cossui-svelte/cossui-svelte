import { describe, expect, it } from 'vitest';
import { extractErrorArray } from './errors.js';
import { getValueAtPath } from './path.js';

const errorsCases = [
  {
    expected: ['error'],
    input: { urls: [{ name: ['error'] }] },
    path: 'urls[0].name'
  },
  {
    expected: ['error'],
    input: { urls: [{ nested: { name: ['error'] } }] },
    path: 'urls[0].nested.name'
  },
  {
    expected: undefined,
    input: { urls: [{ name: ['error'] }] },
    path: 'urls[1].name[0]'
  },
  {
    expected: undefined,
    input: { urls: [{ name: ['error'] }] },
    path: 'urls[0].name[1]'
  },
  {
    expected: ['error2'],
    input: { urls: [{ names: [['error1'], ['error2']] }] },
    path: 'urls[0].names[1]'
  },
  {
    expected: undefined,
    input: { urls: [{ name: ['error'] }] },
    path: 'urls[1].name[0]'
  },
  {
    expected: ['error'],
    input: { a: { b: { c: { d: { e: ['error'] } } } } },
    path: 'a.b.c.d.e'
  },
  {
    expected: ['error3', 'error4'],
    input: {
      data: [
        {
          messages: [
            ['error1', 'error2'],
            ['error3', 'error4']
          ]
        }
      ]
    },
    path: 'data[0].messages[1]'
  },
  {
    expected: ['error3', 'error4'],
    input: {
      data: {
        messages: {
          errors: {
            nested: [
              ['error1', 'error2'],
              ['error3', 'error4']
            ]
          },
          info: ['info1', 'info2']
        }
      }
    },
    path: 'data.messages.errors.nested[1]'
  },
  {
    expected: ['error3', 'error4'],
    input: {
      data: {
        items: [
          {
            messages: {
              errors: [
                ['error1', 'error2'],
                ['error3', 'error4']
              ]
            }
          }
        ]
      }
    },
    path: 'data.items[0].messages.errors[1]'
  },
  {
    expected: ['error3', 'error4'],
    input: {
      a: {
        b: {
          c: {
            d: {
              e: [
                ['error1', 'error2'],
                ['error3', 'error4']
              ]
            }
          }
        }
      }
    },
    path: 'a.b.c.d.e[1]'
  },
  {
    expected: ['error3', 'error4'],
    input: {
      data: [
        {
          messages: {
            errors: {
              nested: [
                ['error1', 'error2'],
                ['error3', 'error4']
              ]
            }
          }
        }
      ]
    },
    path: 'data[0].messages.errors.nested[1]'
  }

  // more test cases for nested tainted paths
];

const taintedCases = [
  {
    expected: true,
    input: {
      urls: {
        1: true
      }
    },
    path: 'urls[1]'
  },
  {
    expected: true,
    input: {
      data: [
        {
          messages: {
            errors: {
              nested: {
                1: true
              }
            }
          }
        }
      ]
    },
    path: 'data[0].messages.errors.nested[1]'
  },
  {
    expected: undefined,
    input: {
      data: [
        {
          messages: {
            errors: {
              nested: {
                1: true
              }
            }
          }
        }
      ]
    },
    path: 'data[0].messages.errors.nested[2]'
  },
  {
    expected: true,
    input: {
      name: true
    },
    path: 'name'
  },
  {
    expected: undefined,
    input: {},
    path: 'name'
  }
];

describe('getValueAtPath', () => {
  it.each(errorsCases)('should return the correct value for the given errors path - %#', ({
    input,
    path,
    expected
  }) => {
    expect(getValueAtPath(path, input)).toEqual(expected);
  });
  it.each(taintedCases)('should return the correct value for the given tainted path - %#', ({
    input,
    path,
    expected
  }) => {
    expect(getValueAtPath(path, input)).toEqual(expected);
  });
});

describe('extractErrorArray', () => {
  it.each(errorsCases)('should extract the correct error array for the given path - %#', ({
    input,
    path,
    expected
  }) => {
    const realExpected = expected === undefined ? [] : expected;
    expect(extractErrorArray(getValueAtPath(path, input))).toEqual(realExpected);
  });
});
