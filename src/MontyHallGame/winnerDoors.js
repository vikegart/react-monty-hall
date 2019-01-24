//const doors = [2,];
const doors = [2,1,0,2,2,1,2,0,2,0,2,1,0,0,1,0,2,1,1,0,0,2,0,1,0,1,1,2,1,2,2,0,2,2,2,0,2,1,2,0,1,0,1,1,1,0,0,0,0,0,2,0,0,0,2,0,0,1,0,0,0,0,0,2,0,0,1,1,0,0,1,0,1,2,1,1,0,2,1,1,0,1,2,2,0,1,2,0,1,1,2,1,0,1,1,0,2,0,0,1];
function MyTraversableArray() { //needed for doing arr.next()
    if (typeof arguments[0] === "number")
        this.length = arguments[0];
    else this.push.apply(this, arguments);

    this.current = 0;
}
MyTraversableArray.prototype = [];
MyTraversableArray.prototype.constructor = MyTraversableArray;
MyTraversableArray.prototype.next = function() {
    return this[++this.current];
};

const arrayWithNext = new MyTraversableArray();
arrayWithNext.push(...doors);

export default arrayWithNext;