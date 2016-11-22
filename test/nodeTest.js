var assert = require("assert");
var chai = require("chai");
var fs = require('fs');
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
        chai.expect(node.toWords()).to.be.equal("plus");
    });

    it("should create node for operator", function () {
        var node = Node.createNodeForOperator('+');
        chai.expect(node.evaluate(Node.createNodeForNumber(2), Node.createNodeForNumber(3))).to.be.equal(5);
    });
});
