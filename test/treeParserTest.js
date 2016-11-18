var assert = require("assert");
var chai  = require("chai");
var TreeParser = require("../js/treeParser.js");

describe("tree parser",function() {
	it("should return string form object",function(){
        var treeParser = new TreeParser("+","2","3");
        chai.expect(treeParser.toString()).to.equal("(2+3)");
	})
});