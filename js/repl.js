const readline = require('readline');
var fs = require('fs');
var chalk = require("chalk");
var Parser = require('jison').Parser;
var grammar = fs.readFileSync("../jison/grammar.jison", 'utf-8');
var parser = new Parser(grammar);
var expression = '';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.setPrompt(">");
rl.prompt();
rl.on('line', (input) => {
    expression += input;
    var trees = parser.parse(expression);
    console.log(chalk.yellow(trees.evaluate()));
    rl.prompt();


});

rl.on('pause', () => {
    rl.close();
});
