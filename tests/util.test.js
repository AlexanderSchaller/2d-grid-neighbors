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
});
