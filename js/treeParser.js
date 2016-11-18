class TreeParser{
	constructor(parantNode,leftChild,rightChild){
		this.parantNode = parantNode;
		this.leftChild = leftChild;
		this.rightChild = rightChild;
	}

	toString(){
		return '(' + this.leftChild + this.parantNode + this.rightChild + ')';
	}
}

module.exports = TreeParser;