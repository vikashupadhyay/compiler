/* parses and mathematical expressions. */

/* laxical grammar */

%{
var TreeParser = require('./js/treeParser.js');

%}

%lex
%%

\s+						/* skip spaces */
[0-9]+("."[0-9]+)?\b	return 'NUMBER'
"+"						return '+'
"*"						return '*'
"("						return '('
")"						return ')'
<<EOF>>					return 'EOF'
.						return 'INVALID'

/lex

/* operator associations and precedence */

%left '+'
%left '*'

%start expressions
%% /* langauge grammar  */

expressions
	: e EOF
		{console.log("result==> ",$$.toString());}
	;

e
	:e '+' e
		{ $$ = new TreeParser($2,$1,$3);}

	| e '*' e
		{$$ = new TreeParser($2,$1,$3);}

	| '(' e ')'
		{$$ =$2;}

	| NUMBER
		{$$=Number(yytext);}
	;
