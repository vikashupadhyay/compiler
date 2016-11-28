var assert = require("assert");
var chai = require("chai");
var Node = require("../js/node.js");

describe("node", function () {
    it("should create node for number", function () {
        var node = Node.createNodeForNumber(2);
        chai.expect(node.evaluate()).to.be.equal(2);
    });
    it("should represent node in words", function () {
        var node = Node.createNodeForNumber(2);
        chai.expect(node.toWords()).to.be.equal("two");
    });
    it("should represent operator node in words", function () {
        var node = Node.createNodeForOperator('+');
        var numberNode1 = Node.createNodeForNumber(2).toWords();
        var numberNode2 = Node.createNodeForNumber(3).toWords();
        chai.expect(node.toWords(numberNode1, numberNode2)).to.be.equal("two plus three");
    });

    it("should create node for operator", function () {
        var node = Node.createNodeForOperator('+');
        chai.expect(node.evaluate(Node.createNodeForNumber(2).evaluate(), Node.createNodeForNumber(3).evaluate())).to.be.equal(5);
    });
});
