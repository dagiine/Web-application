'use strict';

function cs142MakeMultiFilter(originalArray) {
	var currentArray = originalArray.slice();


	var arrayFilter = function(filterCriteria, callback) {
		if (typeof filterCriteria === 'function') {
			currentArray = currentArray.filter(filterCriteria);

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