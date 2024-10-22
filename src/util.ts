export default function getNeighbors<T>(grid: Array<T>, cellIndex: number): Array<T>{
    const gridSize = grid.length / 2;

    if(cellIndex < 0){
        return [];
    }

    const results: T[] = [];
    for(let index of getNeighborIndices(cellIndex, gridSize)){
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

function getNeighborIndices(cellIndex: number, gridSize: number): number[]
{
    const cords: [number, ((cord: number, gridSize: number, cellIndex: number) => boolean) | null][]= [
        // above
        [(cellIndex - gridSize - 1), checkLeftBound],
        [(cellIndex - gridSize), null],
        [(cellIndex - gridSize + 1), checkRightBound],

        // horizontal
        [(cellIndex - 1), null],
        [(cellIndex + 1), null],

        // below
        [(cellIndex + gridSize - 1), checkLeftBound],
        [(cellIndex + gridSize), null],
        [(cellIndex + gridSize + 1), checkRightBound]
    ];

    return cords
        .filter(([index, boundCheck]) =>
            isIndexInBounds(index, gridSize, boundCheck, cellIndex)
        )
        .map(([index]) => index);
}

function isIndexInBounds(
    index: number, gridSize: number,
    callback: ((cord: number, gridSize: number, cellIndex: number) => boolean) | null,
    cellIndex: number
): boolean{
    if(index < 0){
        return false;
    }

    if(index > gridSize){
        return false;
    }

    if(callback !== null){
        return callback(index, gridSize, cellIndex);
    }

    return true;
}

function checkLeftBound(cord: number, gridSize: number, cellIndex: number): boolean
{
    return (cord % gridSize < cellIndex % gridSize);
}

function checkRightBound(cord: number, gridSize: number, cellIndex: number): boolean
{
    return (cord % gridSize > cellIndex % gridSize);
}
