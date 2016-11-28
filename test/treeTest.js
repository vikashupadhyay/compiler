var chai = require("chai");
var fs = require('fs');
var Node = require("../js/node.js");
var Tree = require("../js/tree.js");

describe("Tree", function () {
    it("should return string representation of 2+3", function () {
        var lc = Node.createNodeForNumber(2);
        var rc = Node.createNodeForNumber(3);
        var parantNode = Node.createNodeForOperator("+");
        var tree = new Tree(lc, parantNode, rc);
        chai.expect(tree.parenthesis()).to.be.equal("(2+3)");
    });

    it("should return word representation of 2+3", function () {
        var lc = Node.createNodeForNumber(2);
        var rc = Node.createNodeForNumber(3);
        var parantNode = Node.createNodeForOperator("+");
        var tree = new Tree(lc, parantNode, rc);
        chai.expect(tree.toWords()).to.be.equal("(two plus three)");
    });

    it("should return 5 as result of 2+3", function () {
        var lc = Node.createNodeForNumber(2);
        var rc = Node.createNodeForNumber(3);
        var parantNode = Node.createNodeForOperator("+");
        var tree = new Tree(lc, parantNode, rc);
        chai.expect(tree.evaluate()).to.be.equal(5);
    });

    it("should return 9 as result of 2+3+4", function () {
        var lc = Node.createNodeForNumber(2);
        var parantNode = Node.createNodeForOperator("+");
        var childTree = new Tree(Node.createNodeForNumber(3), Node.createNodeForOperator("+"), Node.createNodeForNumber(4));
        var tree = new Tree(lc, parantNode, childTree);
        chai.expect(tree.evaluate()).to.be.equal(9);
    });

});