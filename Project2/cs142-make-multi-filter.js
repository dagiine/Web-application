'use strict';

function cs142MakeMultiFilter(originalArray) {
    // currentArray нь originalArray-ийн хуулбарыг хадгална.
    let currentArray = [];  
    for (var i = 0; i < originalArray.length; i++) {
        currentArray[i] = originalArray[i];  
    }

    var arrayFilter = function(filterCriteria, callback) {
        // Хэрэв filterCriteria функц өгөгдсөн бол шүүлт хийнэ.
        if (typeof filterCriteria === 'function') {
            const  filteredArray = [];

            for (var j = 0; j < currentArray.length; j++) { 
                if (filterCriteria(currentArray[j])) {
                    filteredArray.push(currentArray[j]); 
                }
            }
            // Шүүлт хийсэн массивыг шинэчилнэ.
            currentArray = filteredArray; 

            // Хэрэв callback функц өгөгдсөн бол дуудаж, эх массивыг this утгаар дамжуулна.
            if (typeof callback === 'function') {
                callback.call(originalArray, currentArray);
            }
            return arrayFilter;
        } else {
            // Хэрэв filterCriteria функц өгөгдөөгүй бол currentArray-г буцаана.
            return currentArray;
        }
    };
    return arrayFilter;
}