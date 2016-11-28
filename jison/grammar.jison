/* parses and mathematical expressions. */

/* laxical grammar */

%{

        var Tree = require('/Users/kvikas/step2Sem/compiler/js/tree.js');
    var Trees = require('/Users/kvikas/step2Sem/compiler/js/trees.js');
    var Node = require('/Users/kvikas/step2Sem/compiler/js/node.js');
    var currentTrees = new Trees();


%}


%lex
%%

\s+						/* skip spaces */
[0-9]+("."[0-9]+)?\b	return 'NUMBER'
[a-zA-Z_$]+             return 'VARIABLE'
"+"						return '+'
"*"						return '*'
"="						return '='
"^"						return '^'
"-"                     return '-'
"/"                     return '/'
";"                     return ';'
"("						return '('
")"						return ')'
<<EOF>>					return 'EOF'
.						return 'INVALID'

/lex

/* operator associations and precedence */
%right ';'
%right '='
%left '+' '-'
%left '*' '/'
%left '^'




%start setOfProgram
%% /* langauge grammar  */

setOfProgram
	: STATEMENTS EOF{
	    {
            var resultantTree = currentTrees;
            currentTrees = currentTrees.wipeOut();
	        return resultantTree;
	    }
	}

	;

STATEMENTS

        : STATEMENT
        | STATEMENTS STATEMENT

        ;

STATEMENT

        : ASSIGNMENT ';'{
            currentTrees.addTree($1);
        }
        | EXPRESSION ';'{
            currentTrees.addTree($1)
        }

        ;

ASSIGNMENT

      : EXPRESSION '=' EXPRESSION {
            $2 = Node.createNodeForOperator($2);
            $$  = new Tree($1,$2,$3);

      }

      ;


EXPRESSION
    : EXPRESSION '+' EXPRESSION
		{

            $2 = Node.createNodeForOperator($2);
            $$ = new Tree($1,$2,$3);
		}

	| EXPRESSION '^' EXPRESSION

		{
            $2 = Node.createNodeForOperator($2);
            $$ = new Tree($1,$2,$3);
		}

	| EXPRESSION '-' EXPRESSION

        {
            $2 = Node.createNodeForOperator($2);
            $$ = new Tree($1,$2,$3);
        }

    | EXPRESSION '*' EXPRESSION

        {
            $2 = Node.createNodeForOperator($2);
            $$ = new Tree($1,$2,$3);
        }

    | EXPRESSION '/' EXPRESSION

            {
                $2 = Node.createNodeForOperator($2);
                $$ = new Tree($1,$2,$3);
            }


	| NUMBER
		{
		$$ = Node.createNodeForNumber(Number(yytext));

		}

	}
    | VARIABLE{
            $$ = Node.createNodeForVar($$);
    }

	;
