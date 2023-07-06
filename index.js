rect = {
    perimeter: (x,y) => 2*(x + y),
    area: (x, y) => x * y
}

function solveRect(l, b) {
    console.log(`area of the rectangle length ${l} and breadth ${b} is ${rect.area(l,b)}`);
    console.log(`Perimeter of the rectangle length ${l} and breadth ${b} is ${rect.perimeter(l,b)}`);
}

solveRect(2,4);
solveRect(2,5);
solveRect(2,6);
solveRect(2,7);
