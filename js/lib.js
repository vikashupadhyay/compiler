var Tree = require('../js/treeParser');
class Lib {

    static parenthesis(tree) {
        var withParanthesis = [];
        for (var node in tree) {
            if (tree[node] instanceof Tree) {
                withParanthesis += this.parenthesis(tree[node]);
            } else {
                withParanthesis += tree[node].value;
            }
        }
        return `(${withParanthesis})`;
    }

    static changeToWords(tree) {
        var inWords = [];
        for (var node in tree) {
            if (tree[node] instanceof Tree) {
                inWords.push(this.changeToWords(tree[node]));
            } else {
                inWords.push(tree[node].toWords());
            }
        }
        return `(${inWords.join(" ")})`;
    }
}

module.exports = Lib;