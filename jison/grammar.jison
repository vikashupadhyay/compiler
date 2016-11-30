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
"+"						return '+'
"*"						return '*'
"="						return '='
"^"						return '^'
"if"                    return 'if'
"else"                  return 'else'
"{"                     return '{'
"}"                     return '}'
"true"                  return 'BOOLEAN'
"false"                 return 'BOOLEAN'
"-"                     return '-'
"/"                     return '/'
";"                     return ';'
"("						return '('
")"						return ')'
[a-zA-Z_$]+             return 'VARIABLE'
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
            currentTrees.addTree($1);
        }

        | CONDITION ';'{
            currentTrees.addTree($1);
        }

        ;

ASSIGNMENT

      : EXPRESSION '=' EXPRESSION {
            $2 = Node.createNodeForOperator($2);
            $$  = new Tree($1,$2,$3);

      }

      ;

CONDITION

        : IfCONDITION
        | IfCONDITION 'else' '{' BLOCK '}' {
            $$ = Node.createElseNode($1,$4);
        }

        ;


IfCONDITION
            :'if' '(' 'BOOLEAN' ')' '{' BLOCK '}'{
                $$ = Node.createIfNode($3,$6);
            }

            ;
BLOCK

     : STATEMENTS

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
