class Operator {
    constructor(operator) {
        this.operator = operator;
    }

    toString() {
        var operators = {'+': 'plus', '*': 'times'};
        return operators[this.operator];
    }

    eval(num1, num2) {
        var op = this.toString();
        return this[op](num1, num2);

    }

    plus(num1, num2) {
        return num1 + num2;
    }

    times(num1, num2) {
        return num1 * num2;
    };
}

module.exports = Operator;