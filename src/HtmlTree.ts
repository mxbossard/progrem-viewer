import { BaseNode, BlockStatement, FunctionDeclaration, IfStatement, VariableDeclaration, VariableDeclarator, AssignmentExpression, BinaryExpression, ExpressionStatement, ReturnStatement } from "estree";
import { ProgremCode } from "./CodeService";
import { AstHelper } from "./AstHelper";
import { generate as escodeGenerate } from 'escodegen';

export interface EsToHtmlTreeStore {
    paintInto(element: HTMLElement): void
    styleClasses(): string[]
    addStyleClasses(node: BaseNode, classes: string[]): void
    removeStyleClasses(classes: string[]): void
    setStyleProperty(node: BaseNode, propName: string, value: string): void
    resetStyle(): void
}

export interface EsToHtmlTreeStoreFactory {
    build(code: ProgremCode): EsToHtmlTreeStore
}

export interface EsToHtmlFactory {
    build(node: BaseNode): Map<BaseNode, HTMLElement>;
}

export class BasicEsToHtmlTreeStore implements EsToHtmlTreeStore {

    private backingMap: Map<BaseNode, HTMLElement> = new Map();
    private addedClasses: Map<BaseNode, string[]> = new Map();
    private addedStyleProps: Map<BaseNode, string[]> = new Map();

    constructor(private nodes: BaseNode[], private htmlFactory: EsToHtmlFactory) {
        nodes.forEach(n => {
            let mapping = htmlFactory.build(n);
            let iterator = mapping.entries();
            let entry = iterator.next();
            while(!entry.done) {
                let val = entry.value;
                this.backingMap.set(val[0], val[1]);
                entry = iterator.next();
            }
        })
    }

    paintInto(element: HTMLElement): void {
        this.nodes.forEach(n => {
            let elt = this.backingMap.get(n);
            if (elt) {
                element.appendChild(elt);
            }
        })
    }    
    
    styleClasses(): string[] {
        let result: string[] = [];
        let iterator = this.backingMap.values();
        let res = iterator.next();
        while(!res.done) {
            let elt = res.value;
            elt.classList.forEach(c => result.push(c));
        }

        return result;
    }

    setStyleProperty(node: BaseNode, propName: string, value: string): void {
        let elt = this.backingMap.get(node);
        if (elt) {
            elt.style.setProperty(propName, value);
            this.addedStyleProps.set(node, [propName, value]);
        }
    }

    addStyleClasses(node: BaseNode, classes: string[]): void {
        let elt = this.backingMap.get(node);
        if (elt) {
            // @ts-ignore
            classes.forEach(c => elt.classList.add(c));
            this.addedClasses.set(node, classes);
        }
    }

    removeStyleClasses(classes: string[]): void {
        // FIXME clean the this.addedClasses map
        let iterator = this.addedClasses.entries();
        let entry = iterator.next();
        while(!entry.done) {
            let node = entry.value[0];
            let classes = entry.value[1];
            let elt = this.backingMap.get(node);
            if (elt) {
                // @ts-ignore
                classes.forEach( c => elt.classList.remove(c))
            }
            entry = iterator.next();
        }
    }

    resetStyle(): void {
        let iterator = this.addedClasses.entries();
        let entry = iterator.next();
        while(!entry.done) {
            let node = entry.value[0];
            let classes = entry.value[1];
            let elt = this.backingMap.get(node);
            if (elt) {
                // @ts-ignore
                classes.forEach( c => elt.classList.remove(c))
            }
            entry = iterator.next();
        }

        this.addedStyleProps.entries();
        entry = iterator.next();
        while(!entry.done) {
            let node = entry.value[0];
            let propName = entry.value[1][0];
            let elt = this.backingMap.get(node);
            if (elt) {
                elt.style.removeProperty(propName);
            }
            entry = iterator.next();
        }
    }

}

export class CodeSpoolerEsToHtmlFactory implements EsToHtmlFactory {

    private appendCodeLine(parent: HTMLElement, padding: number): HTMLElement {
        let elt = document.createElement("pre");
        elt.classList.add('padding-' + padding);
        parent.appendChild(elt);

        return elt;
    }

    private appendSpan(parent: HTMLElement, htmlClass: string[], text = ""): HTMLElement {
        let elt = document.createElement("span");
        htmlClass.forEach(c => elt.classList.add(c));
        parent.appendChild(elt);
        elt.innerText = text;
        return elt;
    }

    private appendHint(parent: HTMLElement, htmlClass: string[]): HTMLElement {
        let pre = document.createElement("pre");
        let span = document.createElement("span");
        htmlClass.forEach(c => pre.classList.add(c));
        parent.appendChild(pre);
        pre.appendChild(span);
        return span;
    }

    // Build HTML Inspector by crawling recursively AST stacks
    private unstackAst(parentElement: HTMLElement, stack: BaseNode[], mapping: Map<BaseNode, HTMLElement>, padding: number): void {
        stack.forEach(node => {
            if (!node) throw new Error('Should not be able to shift a null node !');

            let line, startLine: HTMLElement, endLine, n, varSpan, leftSpan, rightSpan;
            switch (node.type) {
                case 'BlockStatement':
                    n = node as BlockStatement;
                    this.unstackAst(parentElement, n.body, mapping, padding + 1);
                    break;

                case 'FunctionDeclaration':
                    n = node as FunctionDeclaration;
                    startLine = this.appendCodeLine(parentElement, padding);
                    mapping.set(node, startLine);
                    if (n.id) {
                        let span = this.appendSpan(startLine, []);
                        span.innerHTML = 'function ' + n.id.name + ' ( ';// + func.params.map(x => x.name).join(', ') + ' ) {';
                    } else {
                        let span = this.appendSpan(startLine, []);
                        span.innerHTML = 'function ( ';// + func.params.map(x => x.name).join(', ') + ' ) {';
                    }

                    let paramCount = n.params.length;
                    n.params.forEach((param, i) => {
                        let varName = AstHelper.patternToString(param);
                        let span = this.appendSpan(startLine, ['varId'], varName);
                        mapping.set(param, span);
                        if (i < paramCount - 1) {
                            let span = this.appendSpan(startLine, []);
                            span.innerHTML = ', ';
                        }
                    });

                    let span = this.appendSpan(startLine, []);
                    span.innerHTML += ' ) {';

                    this.unstackAst(parentElement, n.body.body, mapping, padding + 1);

                    endLine = this.appendCodeLine(parentElement, padding);
                    endLine.innerHTML = '}';
                    break;

                case 'IfStatement':
                    n = node as IfStatement;
                    startLine = this.appendCodeLine(parentElement, padding);
                    mapping.set(n.test, startLine);
                    //startLine.innerHTML = 'if ( <span>' + Escodegen.generate(ifstmt.test) + '</span> ) {';
                    startLine.innerHTML = 'if ( ';
                    this.unstackAst(startLine, [n.test], mapping, 0);
                    startLine.innerHTML += ' ) {';

                    this.unstackAst(parentElement, [n.consequent], mapping, padding);

                    let midLine = this.appendCodeLine(parentElement, padding);

                    if (n.alternate) {
                        midLine.innerHTML = '} else {';
                        this.unstackAst(parentElement, [n.alternate], mapping, padding);
                    }

                    endLine = this.appendCodeLine(parentElement, padding);
                    endLine.innerHTML = '}';
                    break;

                case 'VariableDeclaration':
                    n = node as VariableDeclaration;
                    line = this.appendCodeLine(parentElement, padding);
                    mapping.set(node, line);
                    line.innerHTML = n.kind + ' ';
                    this.unstackAst(line, n.declarations, mapping, 0);
                    break;

                case 'VariableDeclarator':
                    n = node as VariableDeclarator;
                    varSpan = this.appendSpan(parentElement, ['varId']);
                    mapping.set(node, varSpan);
                    varSpan.innerHTML = AstHelper.patternToString(n.id);
                    if (n.init) {
                        this.appendSpan(parentElement, [], ' = ');
                        let initSpan = this.appendSpan(parentElement, ['varInit']);
                        this.unstackAst(initSpan, [n.init], mapping, 0);
                    }
                    this.appendSpan(parentElement, [], ';');
                    break;

                case 'AssignmentExpression':
                    n = node as AssignmentExpression;
                    leftSpan = this.appendSpan(parentElement, ['varId']);
                    mapping.set(node, leftSpan);
                    this.unstackAst(leftSpan, [n.left], mapping, 0);
                    this.appendSpan(parentElement, [], ' = ');
                    rightSpan = this.appendSpan(parentElement, ['varInit']);
                    this.unstackAst(rightSpan, [n.right], mapping, 0);
                    this.appendSpan(parentElement, [], ';');
                    break;

                case 'BinaryExpression':
                    n = node as BinaryExpression;
                    leftSpan = this.appendSpan(parentElement, ['leftBin']);
                    this.unstackAst(leftSpan, [n.left], mapping, 0);
                    this.appendSpan(parentElement, [], ' ' + n.operator + ' ');
                    rightSpan = this.appendSpan(parentElement, ['rightBin']);
                    this.unstackAst(rightSpan, [n.right], mapping, 0);
                    break;

                case 'ExpressionStatement':
                    n = node as ExpressionStatement;
                    line = this.appendCodeLine(parentElement, padding);
                    mapping.set(node, line);
                    this.unstackAst(line, [n.expression], mapping, 0);
                    break;

                case 'ReturnStatement':
                    n = node as ReturnStatement
                    line = this.appendCodeLine(parentElement, padding);
                    mapping.set(node, line);
                    line.innerHTML = escodeGenerate(node);
                    break;

                default:
                    console.log('default:', node);
                    line = this.appendSpan(parentElement, ['nsy-' + node.type], escodeGenerate(node));
                    mapping.set(node, line);
                    break;
            }
        });
    }

    build(node: BaseNode): Map<BaseNode, HTMLElement> {
        const codeRoot = document.createElement("div");
        let mapping = new Map();
        this.unstackAst(codeRoot, [node], mapping, 0);
        console.log('mapping:', mapping);
        return mapping;
    }
    
}

export class CodeSpoolerEsToHtmlTreeMapperFactory implements EsToHtmlTreeStoreFactory {
    
    private htmlFactory = new CodeSpoolerEsToHtmlFactory();

    build(code: ProgremCode): EsToHtmlTreeStore {
        let store = new BasicEsToHtmlTreeStore([code.colorerProgremFunction()], this.htmlFactory);
        return store;
    }
    
}