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
        return node;
    };

    static createNodeForOperator(op) {
        var operator = new Operator(op);
        var node = new Node('op', op);
        node.toWords = function () {
            return operator.toString();
        };
        node.evaluate = function (lc, rc, lookupTable) {
            return operator.eval(lc.evaluate(), rc.evaluate());
        };
        return node;
    }

    static createNodeForVar(identifier) {
        var node = new Node("identifier", identifier);
        node.text = "var " + identifier;
        return node;
    }
}


module.exports = Node;