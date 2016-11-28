class Operator {
    constructor(operator) {
        this.operator = operator;
    }

    toWords() {
        var operators = {'+': 'plus', '*': 'times', '=': 'equals'};
        return operators[this.operator];
    }

    eval(num1, num2) {
        var op = this.toWords();
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