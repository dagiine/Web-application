"use strict";

function cs142MakeMultiFilter(originalArray) {
    let currentArray = originalArray.slice(); // Copy original array to avoid modifying it

    function arrayFilterer(filterCriteria, callback) {
        if (typeof filterCriteria !== 'function') {
            return currentArray; // Return current array if filterCriteria is not a function
        }

        // Apply the filter
        currentArray = currentArray.filter(filterCriteria);

        // Call the callback function if it's provided and a function
        if (typeof callback === 'function') {
            callback.call(originalArray, currentArray);
        }

        return arrayFilterer; // Return itself for chaining
    }

    return arrayFilterer;
}

// Example usage
var arrayFilterer1 = cs142MakeMultiFilter([1, 2, 3]);

arrayFilterer1(
    function (elem) {
        return elem !== 2;
    },
    function (currentArray) {
        console.log(this); // [1, 2, 3]
        console.log(currentArray); // [1, 3]
    },
);

arrayFilterer1(function (elem) {
    return elem !== 3;
});

console.log("currentArray", arrayFilterer1()); // [1]

var arrayFilterer2 = cs142MakeMultiFilter([1, 2, 3]);
var currentArray2 = arrayFilterer2(
    function (elem) {
        return elem !== 2;
    },
)(
    function (elem) {
        return elem !== 3;
    },
)();
console.log("currentArray2", currentArray2); // [1]

var arrayFilterer3 = cs142MakeMultiFilter([1, 2, 3]);
var arrayFilterer4 = cs142MakeMultiFilter([4, 5, 6]);

console.log(arrayFilterer3(function (elem) {
    return elem !== 2;
})()); // [1, 3]
console.log(arrayFilterer4(function (elem) {
    return elem !== 3;
})());