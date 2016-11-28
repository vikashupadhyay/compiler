var number_to_words = require('number-to-words');
var Operator = require('../js/operator');
class Node {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }

    static createNodeForNumber(number) {
        var node = new Node('number', number);
        node.evaluate = function () {
            return this.value;
        };

        node.toWords = function () {
            return number_to_words.toWords(this.value);
        };

        node.parenthesis = function () {
            return this.value;
        };
        return node;
    };

    static createNodeForOperator(op) {
        var operator = new Operator(op);
        var node = new Node('op', op);
        node.toWords = function (lc, rc) {
            return `${lc} ${operator.toWords()} ${rc}`;
        };
        node.evaluate = function (lc, rc) {
            return operator.eval(lc, rc);
        };
        node.parenthesis = function (lc, rc) {
            return lc + this.value + rc;
        };
        return node;
    }

    static createNodeForVar(identifier) {
        var node = new Node("identifier", identifier);
        node.text = "var " + identifier;
        node.evaluate = function () {
            return identifier;
        };
        return node;
    }

    // static parenthesis(){
    //     return this.value;
    // }
}


module.exports = Node;