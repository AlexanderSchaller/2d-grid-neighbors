export default function getNeighbors<T>(grid: Array<T>, point: T): Array<T>{
    const gridSize = grid.length / 2;

    const pointIndex = grid.indexOf(point);
    if(pointIndex < 0){
        return [];
    }

    const results: T[] = [];
    for(let index of getNeighborIndices(pointIndex, gridSize)){
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

function getNeighborIndices(pointIndex: number, gridSize: number): number[]
{
    const cords: [number, ((cord: number, gridSize: number, pointIndex: number) => boolean) | null][]= [
        // above
        [(pointIndex - gridSize - 1), checkLeftBound],
        [(pointIndex - gridSize), null],
        [(pointIndex - gridSize + 1), checkRightBound],

        // horizontal
        [(pointIndex - 1), null],
        [(pointIndex + 1), null],

        // below
        [(pointIndex + gridSize - 1), checkLeftBound],
        [(pointIndex + gridSize), null],
        [(pointIndex + gridSize + 1), checkRightBound]
    ];

    return cords
        .filter(([index, boundCheck]) =>
            isIndexInBounds(index, gridSize, boundCheck, pointIndex)
        )
        .map(([index]) => index);
}

function isIndexInBounds(
    index: number, gridSize: number,
    callback: ((cord: number, gridSize: number, pointIndex: number) => boolean) | null,
    pointIndex: number
): boolean{
    if(index < 0){
        return false;
    }

    if(index > gridSize){
        return false;
    }

    if(callback !== null){
        return callback(index, gridSize, pointIndex);
    }

    return true;
}

function checkLeftBound(cord: number, gridSize: number, pointIndex: number): boolean
{
    return (cord % gridSize < pointIndex % gridSize);
}

function checkRightBound(cord: number, gridSize: number, pointIndex: number): boolean
{
    return (cord % gridSize > pointIndex % gridSize);
}
