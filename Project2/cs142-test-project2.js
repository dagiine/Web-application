"use strict";

// Хувьсагчид local scope-т үлдэнэ
(function() {
  /**
   * This file tests the CS142 Project 2 JavaScript assignment problems. It prints
   * what it finds to the console log and updates the text being displayed in the
   * window with a summary of the results.
   */

  /* eslint-env browser, node */

  // Result message for Problems 1-3
  var p1Message = "SUCCESS";
  var p2Message = "SUCCESS";
  var p3Message = "SUCCESS";

  // Keep track of all the var statements
  // Глобал хувьсагчуудаа шууд оруулсанг болиулсан
  var varDeclared = [];

  // Utility functions
  function arraysAreTheSame(a1, a2) {
    if (!Array.isArray(a1) || !Array.isArray(a2) || a1.length !== a2.length) {
      return false;
    }
    for (var i = 0; i < a1.length; i += 1) {
      if (a1[i] !== a2[i]) {
        return false;
      }
    }
    return true;
  }

  // ************************* Test cs142MakeMultiFilter *************************
  if (typeof window.cs142MakeMultiFilter !== "function") {
    console.error("cs142MakeMultiFilter is not a function", typeof cs142MakeMultiFilter);
    p1Message = "FAILURE";
  } else {
    var originalArray = [1, 2, 3];
    var filterFunc = window.cs142MakeMultiFilter(originalArray);

    var secondArray = [1, 2, 3, 4];
    var filterFuncTwo = window.cs142MakeMultiFilter(secondArray);

    if (typeof filterFunc !== "function") {
      console.error("cs142MakeMultiFilter does not return a function", filterFunc);
      p1Message = "FAILURE";
    } else {
      var result = filterFunc();
      if (!arraysAreTheSame([1, 2, 3], result)) {
        console.error("filter function with no args does not return the original array", result);
        p1Message = "FAILURE";
      }

      var callbackPerformed = false;
      result = filterFunc(
        function (item) {
          return item !== 2;
        },
        function (callbackResult) {
          callbackPerformed = true;
          if (!arraysAreTheSame([1, 3], callbackResult)) {
            console.error("filter function callback does not filter 2 correctly", callbackResult);
            p1Message = "FAILURE";
          }
          if (!arraysAreTheSame([1, 2, 3], this)) {
            console.error("filter function callback does not pass original array as this", this);
            p1Message = "FAILURE";
          }
        },
      );

      if (!callbackPerformed) {
        console.error("filter function callback not performed");
        p1Message = "FAILURE";
      }

      if (result !== filterFunc) {
        console.error("filter function does not return itself", result);
        p1Message = "FAILURE";
      }

      result = filterFunc(function (item) {
        return item !== 3;
      });
      if (result !== filterFunc) {
        console.error("filter function does not return itself 2", result);
        p1Message = "FAILURE";
      }

      result = filterFunc();
      if (!arraysAreTheSame([1], result)) {
        console.error("filter function callback does not filter 3 correctly", result);
        p1Message = "FAILURE";
      }
      result = filterFuncTwo(
        function (item) {
          return item !== 1;
        },
        function (callbackResult) {
          if (!arraysAreTheSame([2, 3, 4], callbackResult)) {
            console.error("second filter does not filter 1 (check for global variable usage)", callbackResult);
            p1Message = "FAILURE";
          }
          if (!arraysAreTheSame([1, 2, 3, 4], this)) {
            console.error("filter function callback does not pass original array as this", this);
            p1Message = "FAILURE";
          }
        },
      );
    }
  }
  console.log("Test cs142MakeMultiFilter:", p1Message);

  // ************************ Test Cs142TemplateProcessor ************************
  if (typeof window.Cs142TemplateProcessor !== "function") {
    console.error("Cs142TemplateProcessor is not a function", typeof Cs142TemplateProcessor);
    p2Message = "FAILURE";
  } else {
    var template = "My favorite month is {{month}} but not the day {{day}} or the year {{year}}";
    var dateTemplate = new window.Cs142TemplateProcessor(template);

    var dictionary = { month: "July", day: "1", year: "2016" };
    var str = dateTemplate.fillIn(dictionary);

    if (str !== "My favorite month is July but not the day 1 or the year 2016") {
      console.error("Cs142TemplateProcessor didn't work");
      p2Message = "FAILURE";
    }
  }
  console.log("Test Cs142TemplateProcessor:", p2Message);

  // *** Test to see if the symbols we defined are in the global address space ***

  varDeclared.forEach(function (sym) {
    if (window[sym] !== undefined) {
      console.error("Found my symbol", sym, "in DOM");
      p3Message = "FAILURE";
    }
  });
  console.log("Test Problem 3:", p3Message);

  // Store the result back into the global space under the object name
  // cs142Project2Results
  window.cs142Project2Results = {
    p1Message: p1Message,
    p2Message: p2Message,
    p3Message: p3Message,
  };

  // Once the browser loads our companion HTML in cs142-test-project2.html we
  // update it with the results of our testing. This code will make more
  // sense after the next project.
  window.onload = function () {
    document.getElementById("cs142p1").innerHTML = p1Message;
    document.getElementById("cs142p2").innerHTML = p2Message;
    document.getElementById("cs142p3").innerHTML = p3Message;
  };
}());