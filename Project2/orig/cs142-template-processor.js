"use strict";

function Cs142TemplateProcessor(template) {
    this.template = template;
}

Cs142TemplateProcessor.prototype.fillIn = function (dictionary) {
    return this.template.replace(/{{(.*?)}}/g, function (match, prop) {
        // Use Object.prototype.hasOwnProperty.call to avoid no-prototype-builtins error
        return Object.prototype.hasOwnProperty.call(dictionary, prop) ? dictionary[prop] : "";
    });
};

// Example usage
var template = "My favorite month is {{month}} but not the day {{day}} or the year {{year}}";
var dateTemplate = new Cs142TemplateProcessor(template);

var dictionary = { month: "July", day: "1", year: "2016" };
console.log(
    dateTemplate.fillIn(dictionary), // Add trailing comma
); // "My favorite month is July but not the day 1 or the year 2016"

var dictionary2 = { day: "1", year: "2016" };
console.log(
    dateTemplate.fillIn(dictionary2), // Add trailing comma
); // "My favorite month is  but not the day 1 or the year 2016"