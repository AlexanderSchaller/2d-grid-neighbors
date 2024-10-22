import {describe, expect, test} from '@jest/globals';
import getNeighbors from "../src/index";

const sixteenGrid = [
    0, 1, 2, 3,
    4, 5, 6, 7,
    8, 9, 10, 11,
    12, 13, 14, 15
];

const nineGrid = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8,
];

test('invalid grid size', () => {
    expect(
        () => {
            getNeighbors([0, 1, 2], 0)
        }
    ).toThrowError();
});

test('invalid grid size', () => {
    expect(
        () => {
            getNeighbors([0, 1, 2, 3, 4, 5], 0)
        }
    ).toThrowError();
});

describe('9 Grid Tests', () => {
    test('top left', () => {
        const result = getNeighbors(nineGrid, 0);
        expect(result).toContain(1);
        expect(result).toContain(3);
        expect(result).toContain(4);
    });

    test('middle', () => {
        const result = getNeighbors(nineGrid, 4);
        expect(result).toContain(0);
        expect(result).toContain(1);
        expect(result).toContain(2);
        expect(result).toContain(3);
        expect(result).toContain(5);
        expect(result).toContain(6);
        expect(result).toContain(7);
        expect(result).toContain(8);
    });
});

describe('16 Grid Tests', () => {
    test('below bounds', () => {
        expect(
            () => {
                getNeighbors(sixteenGrid, -1)
            }
        ).toThrowError();
    });

    test('over bounds', () => {
        expect(
            () => {
                getNeighbors(sixteenGrid, 17)
            }
        ).toThrowError();
    });

    test('top left', () => {
        const result = getNeighbors(sixteenGrid, 0);
        expect(result).toContain(1);
        expect(result).toContain(5);
        expect(result).toContain(4);
    });

    test('top right', () => {
        const result = getNeighbors(sixteenGrid, 3);
        expect(result).toContain(2);
        expect(result).toContain(6);
        expect(result).toContain(7);
    });

    test('bottom left', () => {
        const result = getNeighbors(sixteenGrid, 12);
        expect(result).toContain(8);
        expect(result).toContain(9);
        expect(result).toContain(13);
    });

    test('bottom right', () => {
        const result = getNeighbors(sixteenGrid, 15);
        expect(result).toContain(10);
        expect(result).toContain(11);
        expect(result).toContain(14);
    });

    test('top fifth index', () => {
        const result = getNeighbors(sixteenGrid, 5);
        expect(result).toContain(0);
        expect(result).toContain(1);
        expect(result).toContain(2);
        expect(result).toContain(4);
        expect(result).toContain(6);
        expect(result).toContain(8);
        expect(result).toContain(9);
        expect(result).toContain(10);
    });

    test('left wall', () => {
        const result = getNeighbors(sixteenGrid, 4);
        expect(result).toContain(0);
        expect(result).toContain(1);
        expect(result).toContain(5);
        expect(result).toContain(8);
        expect(result).toContain(9);
    });
});
