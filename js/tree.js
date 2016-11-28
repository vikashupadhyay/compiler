class Tree {
    constructor(leftChild, parantNode, rightChild) {
        this.leftChild = leftChild;
        this.parantNode = parantNode;
        this.rightChild = rightChild;
    }


    parenthesis() {
        return '(' + this.parantNode.parenthesis(this.leftChild.parenthesis(), this.rightChild.parenthesis()) + ')';
    }

    toWords() {
        return '(' + this.parantNode.toWords(this.leftChild.toWords(), this.rightChild.toWords()) + ')'
    }

    evaluate() {
        return this.parantNode.evaluate(this.leftChild.evaluate(), this.rightChild.evaluate());
    }

}

module.exports = Tree;