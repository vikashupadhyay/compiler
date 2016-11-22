/* parses and mathematical expressions. */

/* laxical grammar */

%{
var TreeParser = require('/Users/kvikas/step2Sem/compiler/js/treeParser.js');
var Node = require('/Users/kvikas/step2Sem/compiler/js/node.js');

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

%right '+'
%left '*'

%start expressions
%% /* langauge grammar  */

expressions
	: e EOF
		{return $1;}
	;

e
	:e '+' e
		{

        $2 = Node.createNodeForOperator($2);
		$$ = new TreeParser($1,$2,$3);

		}

	| e '*' e

		{

		$2 = Node.createNodeForOperator($2);
		$$ = new TreeParser($1,$2,$3);

		}

	| '(' e ')'
		{$$ =$2;}

	| NUMBER
		{
		$$ = Node.createNodeForNumber(Number(yytext));

		}
	;
