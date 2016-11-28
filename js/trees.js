var Node = require('./node');
var Tree = require('./tree');
class Trees {
    constructor() {
        this.trees = [];
    }

    addTree(tree) {
        this.trees.push(tree);
    }

    wipeOut() {
        return new Trees();
    }

    parenthesis() {
        return this.trees.map(function (tree) {
            return tree.parenthesis();
        }).join("\n")
    }

    toWords() {
        return this.trees.map(function (tree) {
            return tree.toWords();
        }).join("\n")
    }

    isEqualOperator(eachTree) {
        return !(eachTree instanceof Node) && eachTree.parantNode.value == '=';
    };

    lookupTable() {
        var table = {};
        let self = this;
        this.trees.forEach(function (eachTree) {
            if (self.isEqualOperator(eachTree)) {
                table[eachTree.leftChild.evaluate()] = eachTree.rightChild.value;
            }

        });
        return table;
    };

    evaluate() {
        
        // return this.trees.reduce(function (previousTree, nextTree) {
        //     return
        // },new Tree())
    }

}

module.exports = Trees;