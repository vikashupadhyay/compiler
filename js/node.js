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
        var self = this;
        var node = new Node("identifier", identifier);
        node.text = "var " + identifier;
        node.evaluate = function (table) {
            if (table == undefined)
                throw new Error(identifier + " is undefined");
            return table[identifier];
        };
        return node;
    }

    static isTableEmpty(object) {
        var isEmpty = true;
        for (keys in object) {
            isEmpty = false;
            break; // exiting since we found that the object is not empty
        }
        return isEmpty;
    }

    static createIfNode(boolean,expression){
        var node  = new Node("if",boolean);
        node.expression = expression;

        return node;
    }

    static createElseNode(ifBlock,expression){
        var node  = new Node("else",ifBlock);
        node.expression = expression;

        return node;
    }

}


module.exports = Node;