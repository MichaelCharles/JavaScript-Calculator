/* global $ */

var calculator = {
  prevVal: 0,
  results: 0,
  display: $(".results"),
  op: $(".op"),
  clearMe: false,
  pastResults: [],
  ans: function() {
    this.display.text(this.pastResults[this.pastResults.length - 1])
  },
  ac: function() {
    this.prevVal = 0;
    this.results = 0
    this.display.text("");
    this.op.text("");
    this.clearMe = false;
    this.pastResults = [];
  },
  ce: function() {
    if (this.clearMe === true) {
      this.display.text("")
    } else {
      this.display.text(this.display.text().slice(0, -1));
    }
  },
  fcc: function() {
    $(".fcc").css({
      visibility: "visible"
    });
  },
  add: function() {
    this.checkPrevious();
    this.op.text("+");
    this.clearMe = true;
    this.prevVal = Number(this.display.text());
  },
  subtract: function() {
    
    if (this.display.text() === "") {
      this.press("98");
    } else {
      this.checkPrevious();
      this.op.text("-");
      this.clearMe = true;
      this.prevVal = Number(this.display.text());
    }
  },
  multiply: function() {
    this.checkPrevious();
    this.op.text("X");
    this.clearMe = true;
    this.prevVal = Number(this.display.text());
  },
  divide: function() {
    this.checkPrevious();
    this.op.text("/");
    this.clearMe = true;
    this.prevVal = Number(this.display.text());
  },
  remainder: function() {
    this.checkPrevious();
    this.op.text("%");
    this.clearMe = true;
    this.prevVal = Number(this.display.text());
  },
  checkPrevious: function() {
    if (this.op.text() !== "") {
      this.press("equals");
    }
  },
  equals: function(y, op) {
    var x = this.prevVal;

    if (op === "+") {
      this.results = x + y;
    } else if (op === "-") {
      this.results = x - y;
    } else if (op === "X") {
      this.results = x * y;
    } else if (op === "/") {
      this.results = x / y;
    } else if (op === "%") {
      this.results = x % y;
    }
    this.results = this.round(this.results, 6);
    this.pastResults.push(this.results);
    this.display.text(this.results);
    this.op.text("");
    this.clearMe = true;

  },
  round: function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
  },
  press: function(button) {
    if (this.clearMe === true && !isNaN(Number(button))) {
      calculator.display.text("");
      this.clearMe = false;
    }
    if (!isNaN(Number(button))) {
      switch (button) {
        case "99":
          button = ".";
          break;
        case "98":
          button = "-";
          break;
        default:
          //do nothing
      }
      calculator.display.text(calculator.display.text() + button);
    } else {
      calculator[button](Number(calculator.display.text()), calculator.op.text());
    }
  }
}

$(document).ready(function() {
  $(".button").on("click", function() {
    var button = $(this);
    if (button.hasClass("btn-ac")) {
      calculator.press("ac");
    } else if (button.hasClass("btn-ce")) {
      calculator.press("ce");
    } else if (button.hasClass("btn-remainder")) {
      calculator.press("remainder");
    } else if (button.hasClass("btn-divide")) {
      calculator.press("divide");
    } else if (button.hasClass("btn-1")) {
      calculator.press("1");
    } else if (button.hasClass("btn-2")) {
      calculator.press("2");
    } else if (button.hasClass("btn-3")) {
      calculator.press("3");
    } else if (button.hasClass("btn-multiply")) {
      calculator.press("multiply");
    } else if (button.hasClass("btn-4")) {
      calculator.press("4");
    } else if (button.hasClass("btn-5")) {
      calculator.press("5");
    } else if (button.hasClass("btn-6")) {
      calculator.press("6");
    } else if (button.hasClass("btn-subtract")) {
      calculator.press("subtract");
    } else if (button.hasClass("btn-7")) {
      calculator.press("7");
    } else if (button.hasClass("btn-8")) {
      calculator.press("8");
    } else if (button.hasClass("btn-9")) {
      calculator.press("9");
    } else if (button.hasClass("btn-add")) {
      calculator.press("add");
    } else if (button.hasClass("btn-empty")) {
      calculator.press("fcc");
    } else if (button.hasClass("btn-0")) {
      calculator.press("0");
    } else if (button.hasClass("btn-ans")) {
      calculator.press("ans");
    } else if (button.hasClass("btn-equals")) {
      calculator.press("equals");
    } else if (button.hasClass("btn-decimal")) {
      calculator.press("99"); // I decided I wanted the decimal button to work the same as a number button. Since that behavior is decided by evaluating !NaN in an if statement, I'm just passing 99 so that it'll enter that group of code.
    }
  });
  $("#dismiss").on("click", function() {
    $(".fcc").css({
      visibility: "hidden"
    });
  });
});