'use strict';

function cs142MakeMultiFilter(originalArray) {
    let currentArray = [];  
    for (var i = 0; i < originalArray.length; i++) {
        currentArray[i] = originalArray[i];  
    }

    var arrayFilter = function(filterCriteria, callback) {
        if (typeof filterCriteria === 'function') {
            const  filteredArray = [];
            for (var j = 0; j < currentArray.length; j++) { 
                if (filterCriteria(currentArray[j])) {
                    filteredArray.push(currentArray[j]);
                }
            }
            currentArray = filteredArray;

            if (typeof callback === 'function') {
                callback.call(originalArray, currentArray);
            }
            return arrayFilter;
        } else {
            return currentArray;
        }
    };
    return arrayFilter;
}