var Tree = require('./tree');
var Node = require('./node');
class Lib {

    static parenthesis(trees) {
        return this.parenthesisForExp(trees[0]);
    }

    static changeToWords(trees) {
        return this.changeToWordsForExp(trees[0]);
    }

    static isEqualOperator(eachTree) {
        return !(eachTree instanceof Node) && eachTree.parantNode.value == '=';
    };

    static parenthesisForExp(tree) {
        var withParanthesis = '';
        for (var node in tree) {
            if (tree[node] instanceof Tree) {
                withParanthesis += this.parenthesisForExp(tree[node]);
            } else {
                withParanthesis += tree[node].value;
            }
        }
        return `(${withParanthesis})`;
    }

    static changeToWordsForExp(tree) {
        var inWords = [];
        for (var node in tree) {
            if (tree[node] instanceof Tree) {
                inWords.push(this.changeToWordsForExp(tree[node]));
            } else {
                inWords.push(tree[node].toWords());
            }
        }
        return `(${inWords.join(" ")})`;
    }

    static lookupTable(tree) {
        var table = {};
        let self = this;
        tree.forEach(function (eachTree) {
            if (self.isEqualOperator(eachTree))
                table[eachTree.leftChild.value] = eachTree.rightChild.evaluate();
        });
        return table;
    }

    static  evaluate(tree) {

        var lookupTable = this.lookupTable(tree);
        // if (tree.leftChild instanceof Tree)
        //     this.evaluate(tree.leftChild, lookupTable);
        // if (tree.rightChild instanceof Tree)
        //     this.evaluate(tree.rightChild, lookupTable);
        // return tree.parantNode.evaluate(tree.leftChild, tree.rightChild, lookupTable);
    }

}


module.exports = Lib;