class Operator {
    constructor(operator) {
        this.operator = operator;
    }

    toWords() {
        var operators = {'+': 'plus', '*': 'times', '=': 'equals', '^': 'power', '-': 'subtraction', '/': 'division'};
        return operators[this.operator];
    }

    eval(lc, rc) {
        var op = this.toWords();
        return this[op](lc, rc);

    }

    plus(num1, num2) {
        return num1 + num2;
    }

    times(num1, num2) {
        return num1 * num2;
    };

    equals(lc, rc) {
        return rc;
    }

    power(num1, num2) {
        return Math.pow(num1, num2);
    }

    subtraction(num1, num2) {
        return num1 - num2;
    }

    division(num1, num2) {
        return num1 / num2;
    }
}

module.exports = Operator;