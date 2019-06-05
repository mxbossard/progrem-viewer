import * as Escodegen from 'escodegen';
import { ProgremCode } from "./CodeService";
import { FunctionDeclaration, BaseNode, BlockStatement, IfStatement, Expression, VariableDeclaration, VariableDeclarator, ExpressionStatement, AssignmentExpression, ReturnStatement, ConditionalExpression, BinaryExpression } from 'estree';
import { Dictionary } from 'typescript-collections';
import { ProgremScheduler, ProgremState, CodeExecutionListener } from './SchedulingService';


export interface ProgremInspector {
    clear(): void;
    attach(element: Element | null): void
}

export class BasicHtmlEsprimaProgremInspector implements ProgremInspector, CodeExecutionListener {

    private progremCodeLines: HTMLElement[] = [];
    private attachedElement: Element | null = null;
    private mapping: Dictionary<BaseNode, HTMLElement> = new Dictionary(x => Escodegen.generate(x));

    constructor(
        private progremCode: ProgremCode, 
        private scheduler: ProgremScheduler
        ) {
            scheduler.subscribeCodeExecution(this);
        this.buildHtmlTree2();
    }

    attach(element: Element | null): void {
        this.attachedElement = element;

        if (element) {
            this.progremCodeLines.map(elt => {element.appendChild(elt)});
        }
    }

    public fireCodeExecution(state: ProgremState) {
        if (state.codeStatement === null) {
            throw new Error('Received a null statement !');
        }
        
        this.mapping.forEach((node, elt) => elt.classList.remove('highlight'));

        let executedNode = state.codeStatement.node;
        let htmlNode = this.mapping.getValue(executedNode);
        if (!htmlNode) {
            throw new Error('Unable to found a HTML element mapped for received statement !')
        }
        htmlNode.classList.add('highlight');
    }

    private appendCodeLine(parent: HTMLElement, padding: number): HTMLElement {
        let elt = document.createElement("pre");
        elt.classList.add('padding-' + padding);
        parent.appendChild(elt);

        return elt;
    }

    private appendSpan(parent: HTMLElement, htmlClass: string[]): HTMLElement {
        let elt = document.createElement("span");
        htmlClass.forEach(c => elt.classList.add(c));
        parent.appendChild(elt);

        return elt;
    }

    // Build HTML Inspector by crawling recursively AST stacks
    private unstackAst(parentElement: HTMLElement, stack: BaseNode[], padding: number): void {
        stack.forEach( node => {
            if (! node) throw new Error('Should not be able to shift a null node !');

            switch (node.type) {
                case 'BlockStatement':
                    let block = node as BlockStatement;
                    this.unstackAst(parentElement, block.body, padding + 1);
                    break;

                case 'FunctionDeclaration':
                    let func = node as FunctionDeclaration;
                    let startLine = this.appendCodeLine(parentElement, padding);
                    if (func.id) {
                        startLine.innerHTML = 'function ' + func.id.name + ' () {';// + func.params.map(x => x.name).join(', ') + ' ) {';
                    } else {
                        startLine.innerHTML = 'function () {';// + func.params.map(x => x.name).join(', ') + ' ) {';
                    }

                    this.unstackAst(parentElement, func.body.body, padding + 1);

                    let endLine = this.appendCodeLine(parentElement, padding);
                    endLine.innerHTML = '}';
                    break;

                case 'IfStatement':
                    let ifstmt = node as IfStatement;
                    startLine = this.appendCodeLine(parentElement, padding);
                    this.mapping.setValue(ifstmt.test, startLine);
                    //startLine.innerHTML = 'if ( <span>' + Escodegen.generate(ifstmt.test) + '</span> ) {';
                    startLine.innerHTML = 'if ( ';
                    this.unstackAst(startLine, [ifstmt.test], 0);
                    startLine.innerHTML += ' ) {';

                    this.unstackAst(parentElement, [ifstmt.consequent], padding);

                    let midLine = this.appendCodeLine(parentElement, padding);
                    
                    if (ifstmt.alternate) {
                        midLine.innerHTML = '} else {';
                        this.unstackAst(parentElement, [ifstmt.alternate], padding);
                    } 

                    endLine = this.appendCodeLine(parentElement, padding);
                    endLine.innerHTML = '}';
                    break;
                
                case 'VariableDeclaration':
                    let declaration = node as VariableDeclaration;
                    let line = this.appendCodeLine(parentElement, padding);
                    this.mapping.setValue(node, line);
                    line.innerHTML = declaration.kind + ' ';
                    this.unstackAst(line, declaration.declarations, 0);
                    break;

                case 'VariableDeclarator':
                    let declarator = node as VariableDeclarator;
                    
                    let varSpan = this.appendSpan(parentElement, ['varId']);
                    switch (declarator.id.type) {
                        case 'Identifier':
                            varSpan.innerHTML = declarator.id.name;
                            if (declarator.init) {
                                parentElement.innerHTML += ' = ';
                                let initSpan = this.appendSpan(parentElement, ['varInit']);
                                //let init = Escodegen.generate(declarator.init);
                                this.unstackAst(initSpan, [declarator.init], 0);
                            }
                            parentElement.innerHTML += ';';
                            break;
                    }
                    break;

                case 'AssignmentExpression':
                    let assign = node as AssignmentExpression;
                    let leftSpan = this.appendSpan(parentElement, ['varId']);
                    this.unstackAst(leftSpan, [assign.left], 0);
                    parentElement.innerHTML += ' = ';
                    let rightSpan = this.appendSpan(parentElement, ['varInit']);
                    this.unstackAst(rightSpan, [assign.right], 0);
                    parentElement.innerHTML += ';';
                    break;

                case 'BinaryExpression':
                    let bin = node as BinaryExpression;
                    leftSpan = this.appendSpan(parentElement, ['leftBin']);
                    this.unstackAst(leftSpan, [bin.left], 0);
                    parentElement.innerHTML += ' ';
                    parentElement.innerHTML += bin.operator;
                    parentElement.innerHTML += ' ';
                    rightSpan = this.appendSpan(parentElement, ['rightBin']);
                    this.unstackAst(rightSpan, [bin.right], 0);
                    break;
        
                case 'ExpressionStatement':
                    let expr = node as ExpressionStatement;
                    line = this.appendCodeLine(parentElement, padding);
                    this.mapping.setValue(node, line);
                    this.unstackAst(line, [expr.expression], 0);
                    break;

                case 'ReturnStatement':
                    line = this.appendCodeLine(parentElement, padding);
                    line.innerHTML = Escodegen.generate(node);
                    this.mapping.setValue(node, line);
                    break;
        
                default:
                    console.log('default:', node);
                    line = this.appendSpan(parentElement, []);
                    line.textContent = Escodegen.generate(node);
                    line.classList.add('nsy-' + node.type);
                    this.mapping.setValue(node, line);
                    break;
            }
        });
    }

    private buildHtmlTree2() {
        const codeRoot = document.createElement("div");
        this.progremCodeLines.push(codeRoot);
        this.unstackAst(codeRoot, [this.progremCode.colorerProgremFunction()], 0);
    }

    private buildHtmlTree() {
        const codeRoot = document.createElement("div");
        const stack: BaseNode[] = [this.progremCode.colorerProgremFunction()];
        let padding = 0;

        //this.progremCode.colorerProgremFunction().body.body.map(n => stack.push(n));
        
        do {
            let node = stack.shift();
            if (! node) throw new Error('Should not be able to shift a null node !');
            var line;

            switch (node.type) {
                case 'BlockStatement':
                    let block = node as BlockStatement;
                    padding ++
                    block.body.slice(0).reverse().map(x => stack.unshift(x));
                    break;
                case 'EndBlockStatement':
                    // This is a hack to close an opened block
                    padding --;
                    line = this.appendCodeLine(codeRoot, padding);
                    line.innerHTML = '}';
                    break;
                case 'FunctionDeclaration':
                    let func = node as FunctionDeclaration;
                    line = this.appendCodeLine(codeRoot, padding);
                    if (func.id) {
                        line.innerHTML = 'function ' + func.id.name + ' () {';// + func.params.map(x => x.name).join(', ') + ' ) {';
                    } else {
                        line.innerHTML = 'function () {';// + func.params.map(x => x.name).join(', ') + ' ) {';
                    }
                    stack.unshift({type: 'EndBlockStatement'}); // Hack to delay a block end
                    stack.unshift(func.body);
                    break;
                case 'IfStatement':
                    let ifstmt = node as IfStatement;
                    line = this.appendCodeLine(codeRoot, padding);
                    line.innerHTML = 'if ( <span>' + Escodegen.generate(ifstmt.test) + '</span> ) {';
                    this.mapping.setValue(ifstmt.test, line);
    
                    if (ifstmt.alternate) {
                        stack.unshift({type: 'EndBlockStatement'}); // Hack to delay a block end
                        stack.unshift(ifstmt.alternate);
                    }
                    stack.unshift({type: 'ElseBlockStatement'}); // Hack to delay an else block
                    stack.unshift(ifstmt.consequent);
                    break;
                case 'ElseBlockStatement':
                    // This is a hack to close an opened block
                    padding --;
                    line = this.appendCodeLine(codeRoot, padding);
                    line.innerHTML = '} else {';
                    break;
                default:
                    line = this.appendCodeLine(codeRoot, padding);
                    line.textContent = Escodegen.generate(node);
                    line.classList.add('statement');
                    this.mapping.setValue(node, line);
                    break;
            }
        
        } while (stack.length > 0);
    }

    clear(): void {
        throw new Error("Method not implemented.");
    }    

}
