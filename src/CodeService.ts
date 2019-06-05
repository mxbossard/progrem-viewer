
import * as Esprima from 'esprima';
import * as EsprimaWalk from 'esprima-walk';
import * as Escodegen from 'escodegen';
import { BaseNode, FunctionDeclaration, BlockStatement, IfStatement, ReturnStatement, Statement } from 'estree';
import { ProgremState } from './SchedulingService';
import { Stack } from 'typescript-collections';

export class CodeStatement {
    constructor(
        public node: BaseNode,
        //public code: string
    ) {};
}

export interface CodeStatementFactory<T> {
    build(param: T): CodeStatement;
}

export interface CodeIterator {
    executeNext(): CodeStatement;
    hasNext(): boolean;
}

export interface ProgremCode {
    initialiserProgremFunction(): FunctionDeclaration
    colorerProgremFunction(): FunctionDeclaration
    iterator(state: ProgremState): CodeIterator;
}

class BasicEsprimaCodeStatementFactory implements CodeStatementFactory<Statement> {

    build(param: BaseNode): CodeStatement {
        /*
        if (param.type === 'ReturnStatement') {
            let stmt = param as ReturnStatement;
            let code = Escodegen.generate(stmt);
            return new CodeStatement(code);
        } else if (param.type === 'IfStatement') {
            let stmt = param as IfStatement;
            let code = Escodegen.generate(stmt.test);
            return new CodeStatement(code);
        } else {
            let code = Escodegen.generate(param);
            return new CodeStatement(code);
        }*/

        if (param) 
            return new CodeStatement(param);

        throw new Error('Unable to build non statement code !');
    }
}

class BasicEsprimaCodeIterator implements CodeIterator {

    private stack: BaseNode[] = [];
    private codeStatementFactory = new BasicEsprimaCodeStatementFactory();
    private returnValue: any = null;
    private finished = false

    constructor(
            private rootNode: BaseNode, 
            private state: ProgremState) {
        this.stack.push(rootNode);
    }

    private declareProgremArguments() {
        let _colonne = this.state.colonne;
        let _ligne = this.state.ligne;
        let _contexte = this.state.contexte;

        this.state.eval('var colonne = ' + _colonne + ', ligne = ' + _ligne + ';');
        this.state.eval('var contexte = ' + JSON.stringify(_contexte));
    }

    executeNext(): CodeStatement {
        do {
            // Get the first node on the stack
            let node = this.stack.shift();

            //console.log('Node:', node);

            if (!node) {
                throw new Error('Stack should not be empty !');
            }

            var stmt;

            switch(node.type) {
                case 'FunctionDeclaration':
                    let func = node as FunctionDeclaration;
                    this.stack.unshift(func.body);
                    this.declareProgremArguments();
                    break;

                case 'BlockStatement':
                    let block = node as BlockStatement;
                    block.body.slice().reverse().map(x => {
                        //console.log('BlockStatement unshifting:', x);
                        this.stack.unshift(x)
                    });
                    break;

                case 'IfStatement':
                    stmt = node as IfStatement;
                    let testCode = Escodegen.generate(stmt.test);

                    let testResult = this.state.eval(testCode);
                    //console.log('IfStatement test evaluate to: ', testResult);
                    if (testResult) {
                        //console.log('Then unshifting:', stmt.consequent);
                        this.stack.unshift(stmt.consequent);
                    } else {
                        if (stmt.alternate) {
                            //console.log('Else unshifting:', stmt.alternate);
                            this.stack.unshift(stmt.alternate);
                        }
                    }

                    return this.codeStatementFactory.build(stmt.test);

                case 'ReturnStatement':
                    stmt = node as ReturnStatement;
                    this.returnValue = this.state.eval(Escodegen.generate(stmt.argument));
                    this.finished = true;
                    return this.codeStatementFactory.build(stmt);

                default:
                    //console.log('Node:', node);
                    let code = Escodegen.generate(node);
                    //console.log('Generated code:', code);
                    let evalResult = this.state.eval(code);
                    //console.log('Evaluate to:', evalResult);
                    return this.codeStatementFactory.build(node);
            }
        } while (this.stack.length > 0);

        throw new Error('Iterator has no more code to execute !');
    }    
    
    hasNext(): boolean {
        if (this.finished) {
            return false;
        }

        let nodes = this.stack.slice(0);
        while (nodes.length > 0) {
            let node = nodes.shift();
            if (node) {
                if (node.type !== 'BlockStatement') {
                    return true;
                } else {
                    let blocks: BlockStatement[] = [];
                    let block = node as BlockStatement;
                    blocks.push(block);
                    // Parsours recursivement les blocks à la recherche de noeud qui ne sont pas des blocks
                    let hasNext = false;
                    while (!hasNext && blocks.length > 0) {
                        let b = blocks.shift();
                        if (b) {
                            b.body.map(x => {
                                if (x.type !== 'BlockStatement') {
                                    hasNext = true;
                                } else {
                                    blocks.push(x);
                                }
                            });
                        }
                    }
                    return hasNext;
                }
            }
        }
        return false;
    }
    
}

export class EsprimaProgremCode implements ProgremCode {

    private esprimaProgram: Esprima.Program;

    constructor(code: string) {
        this.esprimaProgram = Esprima.parseModule(code);
    }


    public initialiserProgremFunction(): FunctionDeclaration {
        var result: FunctionDeclaration | null = null;
        EsprimaWalk.walk(this.esprimaProgram, node => {
            if( node.type === 'FunctionDeclaration' && node.id && node.id.name === 'initialiserProgrem' ) {
                result = node;
            }
        } );
        if (result) {
            return result;
        }
        throw new Error('Impossible de trouver une fonction colorerProgrem() !');
    }

    public colorerProgremFunction(): FunctionDeclaration {
        var result: FunctionDeclaration | null = null;
        EsprimaWalk.walk(this.esprimaProgram, node => {
            if( node.type === 'FunctionDeclaration' && node.id && node.id.name === 'colorerProgrem' ) {
                result = node;
            }
        } );
        if (result) {
            return result;
        }
        throw new Error('Impossible de trouver une fonction colorerProgrem() !');
    }

    iterator(state: ProgremState): CodeIterator {
        return new BasicEsprimaCodeIterator(this.colorerProgremFunction(), state);
    }
}

class ProgremCodeFactory {
    public build(code: string): ProgremCode {
        return new EsprimaProgremCode(code);
    }
}

export namespace CodeService {

    export const progremCodeFactory = new ProgremCodeFactory();

    export function loadProgrem(fileUrl: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const client = new XMLHttpRequest();
            client.open('GET', fileUrl);
            client.onload = () => {
                let code = client.responseText;

                console.log('CodeService: Progrem loaded successfully.', code);
                resolve(code);
            };
            client.onerror = () => reject(client.statusText);
            client.send();
        });
    }

}