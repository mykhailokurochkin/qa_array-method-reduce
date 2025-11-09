'use strict';

const { reduce } = require('./reduce');
const arr = [0, 1, 2, 3, 4];
const sumCb = (acc, current) => acc + current;

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should return a number', () => {
    expect(typeof arr.reduce2(sumCb, 0)).toBe('number');
  });

  it('should return an accumulated value', () => {
    expect(arr.reduce2(sumCb, 0)).toBe(10);
  });

  it('should return an initial value if array is empty', () => {
    expect([].reduce2(sumCb, 0)).toBe(0);
  });

  it('should call cb for every item', () => {
    const cb = jest.fn();

    arr.reduce2(cb, 0);
    expect(cb).toHaveBeenCalledTimes(5);
  });

  it('should call cb with all params', () => {
    const cb = jest.fn();

    arr.reduce2(cb, 0);
    expect(cb).toHaveBeenCalledWith(0, 0, 0, arr);
  });
});
