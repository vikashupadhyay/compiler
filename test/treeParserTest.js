'use strict';
var assert = require("assert");
var chai = require("chai");
var fs = require('fs');
var Parser = require('jison').Parser;
var grammar = fs.readFileSync("./jison/grammar.jison", 'utf-8');
var parser = new Parser(grammar);
var lib = require('../js/lib');

describe("tree parser", function () {

    it("should return string representation of 2+3", function () {
        var tree = parser.parse("2+3");
        chai.expect(lib.parenthesis(tree)).to.equal("(2+3)");
    });

    it("should return string representation of 3+2+3", function () {
        var tree = parser.parse("3+2+3");
        chai.expect(lib.parenthesis(tree)).to.equal("(3+(2+3))");
    });

    it("should return string representation of 3+2+3+4", function () {
        var tree = parser.parse("3+2+3+4");
        chai.expect(lib.parenthesis(tree)).to.equal("(3+(2+(3+4)))");
    });

    it("should return word representation of 2+3", function () {
        var tree = parser.parse("2+3");
        chai.expect(lib.changeToWords(tree)).to.equal("(two plus three)");
    });

    it("should return string representation of 1000000000+2", function () {
        var tree = parser.parse("1000000000+2");
        chai.expect(lib.changeToWords(tree)).to.equal("(one billion plus two)");
    });

    it("should return word representation of 2*3", function () {
        var tree = parser.parse("2*3");
        chai.expect(lib.changeToWords(tree)).to.equal("(two times three)");
    });
    it("should return string representation of 2*3", function () {
        var tree = parser.parse("2*3");
        chai.expect(lib.parenthesis(tree)).to.equal("(2*3)");
    });
    it("should return string representation of 2+3*4", function () {
        var tree = parser.parse("2+3*4");
        chai.expect(lib.parenthesis(tree)).to.equal("(2+(3*4))");
    });
    it("should return string representation of 3*4+4", function () {
        var tree = parser.parse("3*4+4");
        chai.expect(lib.parenthesis(tree)).to.equal("((3*4)+4)");
    });
    it("should return word representation of 3*4+4", function () {
        var tree = parser.parse("3*4+4");
        chai.expect(lib.changeToWords(tree)).to.equal("((three times four) plus four)");
    });

    it("should return word representation of 2+3*4", function () {
        var tree = parser.parse("2+3*4");
        chai.expect(lib.changeToWords(tree)).to.equal("(two plus (three times four))");
    });
});