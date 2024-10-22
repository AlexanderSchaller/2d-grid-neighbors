import {describe, expect, test} from '@jest/globals';
import getNeighbors from "../src/index";

const sixteenGrid = [
    0,  1,  2,  3,
    4,  5,  6,  7,
    8,  9,  10, 11,
    12, 13, 14, 15
];

describe('Utils', () => {
    test('below bounds', () => {
        expect(
            ()=>{
                getNeighbors(sixteenGrid, -1)
            }
        ).toThrowError();
    });

    test('over bounds', () => {
        expect(
            ()=>{
                getNeighbors(sixteenGrid, 17)
            }
        ).toThrowError();
    });

    test('top left', ()=>{
        const result = getNeighbors(sixteenGrid, 0);
        expect(result).toContain(1);
        expect(result).toContain(5);
        expect(result).toContain(4);
    });

    test('top fifth index', ()=>{
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
});
