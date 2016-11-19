var numberToWords = require("number-to-words");
class TreeParser {
    constructor(parantNode, leftChild, rightChild) {
        this.parantNode = parantNode;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }

    toString() {

        if (this.leftChild instanceof TreeParser && this.rightChild instanceof TreeParser) {
            return '(' + this.leftChild.toString() + ' ' + TreeParser.getOperator(this.parantNode) + ' ' + this.rightChild.toString() + ')';
        }

        if (this.rightChild instanceof TreeParser && typeof this.leftChild == 'number') {
            return '(' + numberToWords.toWords(this.leftChild) + ' ' + TreeParser.getOperator(this.parantNode) + ' ' + this.rightChild.toString() + ')';
        }

        if (this.leftChild instanceof TreeParser && typeof this.rightChild == 'number') {
            return '(' + this.leftChild.toString() + ' ' + TreeParser.getOperator(this.parantNode) + ' ' + numberToWords.toWords(this.rightChild) + ')';
        }


        return '(' + numberToWords.toWords(this.leftChild) + " " + TreeParser.getOperator(this.parantNode) + " " + numberToWords.toWords(this.rightChild) + ')';
    }

    static getOperator(operator) {
        var operators = {"+": "plus", "*": "minus"};
        return operators[operator];
    }
}

module.exports = TreeParser;