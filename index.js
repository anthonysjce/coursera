/* node module example below */
rect = require('./rectangle');

/* normal example
rect = {
    perimeter: (x,y) => 2*(x + y),
    area: (x, y) => x * y
} */

function solveRect(l, b) {
     rect(l,b, (data, error) => {
        if(error) {
            console.log("ERROR: ", error.message);
        } else {
            console.log(`area of the rectangle length ${l} and breadth ${b} is ${data.area()}`);
            console.log(`Perimeter of the dataangle length ${l} and breadth ${b} is ${data.perimeter()}`);
        }
     });   
}

solveRect(2,0);
solveRect(2,5);
solveRect(2,6);
solveRect(2,7);
