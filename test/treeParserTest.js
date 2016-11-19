var assert = require("assert");
var chai = require("chai");
var TreeParser = require("../js/treeParser.js");

describe("tree parser", function () {
    it("should return string representation of 2+3", function () {
        var treeParser = new TreeParser("+", 2, 3);
        chai.expect(treeParser.toString()).to.equal("(two plus three)");
    });

    it("should return string representation of 3+(2+3)", function () {
        var childTree = new TreeParser("+", 2, 3);
        var parantTree = new TreeParser("+", 3, childTree);
        chai.expect(parantTree.toString()).to.equal("(three plus (two plus three))");
    });

    it("should return string representation of ((3+2)+3)", function () {
        var childTree = new TreeParser("+", 3, 2);
        var parantTree = new TreeParser("+", childTree, 3);
        chai.expect(parantTree.toString()).to.equal("((three plus two) plus three)");
    });

    it("should return string representation of ((3+2)+(3+4))", function () {
        var childTree1 = new TreeParser("+", 3, 2);
        var childTree2 = new TreeParser("+", 3, 4);
        var parantTree = new TreeParser("+", childTree1, childTree2);
        chai.expect(parantTree.toString()).to.equal("((three plus two) plus (three plus four))");
    });

    it("should return string representation of ((3+2)+(3+(4+2)))", function () {
        var leftChildForParantNode = new TreeParser("+", 3, 2);
        var childTree = new TreeParser("+", 4, 2);
        var rightChildForParantNode = new TreeParser("+", 3, childTree);
        var parantTree = new TreeParser("+", leftChildForParantNode, rightChildForParantNode);
        chai.expect(parantTree.toString()).to.equal("((three plus two) plus (three plus (four plus two)))");
    })
});