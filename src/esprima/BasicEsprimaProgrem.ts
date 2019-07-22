
import { Program, parseModule, ParseOptions } from 'esprima';
import { walk as esprimaWalk, walkAddParent as esprimaWalkAddParent } from 'esprima-walk';
import { generate as escodeGenerate } from 'escodegen';
import { BaseNode, FunctionDeclaration, BlockStatement, IfStatement, ReturnStatement, Statement } from 'estree';
import { ProgremState } from '../core/SchedulingService';
import { EsprimaVerseIteraor, EsprimaVerse, EsprimaCouplet, EsprimaProgremFactory, EsprimaProgrem } from './EsprimaTypes';
import { EsprimaHelper } from './EsprimaHelper';
import { CodeService } from '../core/CodeService';

class BasicEsprimaCodeIterator implements EsprimaVerseIteraor {

    private stack: BaseNode[] = [];
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

    executeNext(): EsprimaVerse {
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
                    return CodeService.progremFactory.buildVerse(func);
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
                    let testCode = escodeGenerate(stmt.test);

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

                    return CodeService.progremFactory.buildVerse(stmt);

                case 'ReturnStatement':
                    stmt = node as ReturnStatement;
                    this.returnValue = this.state.eval(escodeGenerate(stmt.argument));
                    this.finished = true;
                    return CodeService.progremFactory.buildVerse(stmt);

                default:
                    //console.log('Node:', node);
                    let code = escodeGenerate(node);
                    //console.log('Generated code:', code);
                    let evalResult = this.state.eval(code);
                    //console.log('Evaluate to:', evalResult);
                    return CodeService.progremFactory.buildVerse(node);
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

export class BasicEsprimaProgrem implements EsprimaProgrem {

    private esprimaProgram: Program;

    constructor(code: string) {
        let config: ParseOptions = {
            comment: true,
        }
        this.esprimaProgram = parseModule(code, config);
    }

    protected walkProgremCouplet(functionName: string): EsprimaCouplet {
        var funcNode: FunctionDeclaration | null = null;
        var verses: BaseNode[] = [];
        esprimaWalkAddParent(this.esprimaProgram, node => {
            if( node.type === 'FunctionDeclaration' && node.id && node.id.name === functionName) {
                funcNode = node;
            }
            if (funcNode && EsprimaHelper.isChildNodeOf(node, funcNode)) { // && EsprimaHelper.isNotChildNodeOf(node, verses)
                if (node.type === 'FunctionDeclaration' 
                    || node.type === 'VariableDeclaration'
                    || node.type === 'ExpressionStatement'
                    || node.type === 'ReturnStatement'
                    || node.type === 'IfStatement' ) {
                        verses.push(node);
                }
            }
        } );
        if (funcNode) {
            verses.unshift(funcNode);
            return CodeService.progremFactory.buildCouplet(funcNode, verses);
        }
        throw new Error(`Impossible de trouver la fonction ${functionName}() !`);
    }

    public initialiserProgremFunction(): EsprimaCouplet {
        return this.walkProgremCouplet('initialiserProgrem');
    }

    public colorerProgremFunction(): EsprimaCouplet {
        return this.walkProgremCouplet('colorerProgrem');
    }

    public iterator(state: ProgremState): EsprimaVerseIteraor {
        return new BasicEsprimaCodeIterator(this.colorerProgremFunction().functionRootNode, state);
    }
}

export class BasicEsprimaProgremFactory implements EsprimaProgremFactory {

    buildProgrem(code: string): EsprimaProgrem {
        if (!code) {
            throw new Error('Impossible to build Progrem without code !');
        }
        return new BasicEsprimaProgrem(code);
    }

    buildCouplet(node: FunctionDeclaration, verses: BaseNode[]): EsprimaCouplet {
        if (!node) {
            throw new Error('Impossible to build empty Couplet !');
        }

        let esprimaVerses = verses.map(this.buildVerse);

        let couplet: EsprimaCouplet = {
            functionRootNode: node,
            verses: esprimaVerses
        }
        console.log('Built couplet:', couplet);
        return couplet;
    }

    buildVerse(node: BaseNode): EsprimaVerse {
        if (!node) {
            throw new Error('Impossible to build empty Verse !');
        }

        let code = node;
        if(node.type === 'IfStatement') {
            code = (node as IfStatement).test;
        }

        let verse: EsprimaVerse = { 
            node: node,
            code: code
        };
        return verse;
    }
}
