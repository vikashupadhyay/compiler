'use strict';
var assert = require("assert");
var chai = require("chai");
var fs = require('fs');
var Parser = require('jison').Parser;
var grammar = fs.readFileSync("./jison/grammar.jison", 'utf-8');
var parser = new Parser(grammar);


describe("tree parser", function () {

    it("should return string representation of 2+3", function () {
        var trees = parser.parse("2+3;");
        chai.expect(trees.parenthesis()).to.equal("(2+3)");
    });

    it("should return string representation of 3+2+3", function () {
        var parser = new Parser(grammar);
        var trees = parser.parse("3+2+3;");
        chai.expect(trees.parenthesis()).to.equal("((3+2)+3)");
    });

    it("should return string representation of 3+2+3+4", function () {
        var trees = parser.parse("3+2+3+4;");
        chai.expect(trees.parenthesis()).to.equal("(((3+2)+3)+4)");
    });

    it("should return word representation of 2+3", function () {
        var trees = parser.parse("2+3;");
        chai.expect(trees.toWords()).to.equal("(two plus three)");
    });

    it("should return word representation of 1000000000+2", function () {
        var trees = parser.parse("1000000000+2;");
        chai.expect(trees.toWords()).to.equal("(one billion plus two)");
    });

    it("should return word representation of 2*3", function () {
        var trees = parser.parse("2*3;");
        chai.expect(trees.toWords()).to.equal("(two times three)");
    });
    it("should return string representation of 2*3", function () {
        var trees = parser.parse("2*3;");
        chai.expect(trees.parenthesis()).to.equal("(2*3)");
    });
    it("should return string representation of 2+3*4", function () {
        var trees = parser.parse("2+3*4;");
        chai.expect(trees.parenthesis()).to.equal("(2+(3*4))");
    });
    it("should return string representation of 3*4+4", function () {
        var trees = parser.parse("3*4+4;");
        chai.expect(trees.parenthesis()).to.equal("((3*4)+4)");
    });
    it("should return word representation of 3*4+4", function () {
        var trees = parser.parse("3*4+4;");
        chai.expect(trees.toWords()).to.equal("((three times four) plus four)");
    });
    it("should return word representation of 3*4+4*5", function () {
        var trees = parser.parse("3*4+4*5;");
        chai.expect(trees.toWords()).to.equal("((three times four) plus (four times five))");
    });

    it("should return word representation of 2+3*4", function () {
        var trees = parser.parse("2+3*4;");
        chai.expect(trees.toWords()).to.equal("(two plus (three times four))");
    });

    it("should create lookupTable for : a=2;b=3;a+b;", function () {
        var trees = parser.parse("a=2;b=3;a+b;");
        var table = trees.lookupTable();
        chai.expect(table["a"]).to.equal(2);
    });
    it("should create lookupTable for : a;a=2;", function () {
        var trees = parser.parse("a=2;a;");
        var table = trees.lookupTable();
        chai.expect(table["a"]).to.equal(2);
    });

    it("should create lookupTable x=10;y=x+20;y+5;", function () {
        var trees = parser.parse("x=10;y=x+20;y+5;");
        var table = trees.lookupTable();
        chai.expect(table).to.deep.equal({x: 10, y: 30});
    });


    it("should evaluate a=2;a+2", function () {
        var trees = parser.parse("a=2;a+2;");
        chai.expect(trees.evaluate()).to.be.equal(4);
    });

    it("should evaluate a=10;5+a*2", function () {
        var trees = parser.parse("a=10;5+a*2;");
        chai.expect(trees.evaluate()).to.be.equal(25);
    });

    it("should evaluate x=10;y=x+20;y+5;", function () {
        var trees = parser.parse("x=10;y=x+20;y+5;");
        chai.expect(trees.evaluate()).to.be.equal(35);
    });

    it("should evaluate x=10;y=x+20;y+5;", function () {
        var trees = parser.parse("x=2;x=2^5;x;");
        chai.expect(trees.evaluate()).to.be.equal(32);
    });

    it.skip("throw error if identifier is undefined", function () {
        var trees = parser.parse("x;");
        chai.expect(trees.evaluate()).to.be.equal(32);
    });

});