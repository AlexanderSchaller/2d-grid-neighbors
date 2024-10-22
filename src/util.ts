export default function getNeighbors<T>(grid: Array<T>, cellIndex: number): Array<T>{
    const rowLength = Math.sqrt(grid.length);
    if(grid.length < 4 || rowLength % 1 !== 0){
        throw Error(
            'Grid array is an invalid length.  Your grid must have an even number of rows and columns.'
        );
    }

    if(cellIndex < 0 || cellIndex > (grid.length - 1)){
        throw Error('Cell index is out of bounds.');
    }

    const results: T[] = [];
    for(let index of getNeighborIndices(cellIndex, rowLength)){
        addToResults(results, grid, index);
    }
    return results;
}

function addToResults<T>(results: any[], grid: Array<T>, targetIndex: number) {
    const item = grid[targetIndex];
    if(item === undefined){
        return;
    }
    results.push(item);
}

export function getNeighborIndices(cellIndex: number, rowLength: number): number[]
{
    const cords: [number, ((cord: number, rowLength: number, cellIndex: number) => boolean) | null][]= [
        // above
        [(cellIndex - rowLength - 1), checkLeftBound],
        [(cellIndex - rowLength), null],
        [(cellIndex - rowLength + 1), checkRightBound],

        // horizontal
        [(cellIndex - 1), null],
        [(cellIndex + 1), null],

        // below
        [(cellIndex + rowLength - 1), checkLeftBound],
        [(cellIndex + rowLength), null],
        [(cellIndex + rowLength + 1), checkRightBound]
    ];

    return cords
        .filter(([index, boundCheck]) =>
            isIndexInBounds(index, rowLength, boundCheck, cellIndex)
        )
        .map(([index]) => index);
}

function isIndexInBounds(
    index: number,
    rowLength: number,
    callback: ((cord: number, rowLength: number, cellIndex: number) => boolean) | null,
    cellIndex: number
): boolean{
    if(index < 0){
        return false;
    }

    if(index >= Math.pow(rowLength, rowLength)){
        return false;
    }

    if(callback !== null){
        return callback(index, rowLength, cellIndex);
    }

    return true;
}

function checkLeftBound(cord: number, rowLength: number, cellIndex: number): boolean
{
    return (cord % rowLength < cellIndex % rowLength);
}

function checkRightBound(cord: number, rowLength: number, cellIndex: number): boolean
{
    return (cord % rowLength > cellIndex % rowLength);
}
