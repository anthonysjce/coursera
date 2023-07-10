/* node module example */
module.exports = (x, y, callback) => {
    if (x <= 0 || y <= 0) {
        setTimeout(() => { 
            callback(null, new Error(`Rectangle dimensions should be greater than zero: l = "
            ${x}, and b = " ${y} `));
        },2000);
    } else {
        setTimeout(() => { 
            callback( {
                perimeter: () => (2*(x+y)),
                area:() => (x*y)
            }, null);
        },2000);
    }
}