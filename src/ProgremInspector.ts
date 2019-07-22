import { generate as escodeGenerate } from 'escodegen';
import { create as md5Create } from 'js-md5';
import { FunctionDeclaration, BaseNode, BlockStatement, IfStatement, Expression, VariableDeclaration, VariableDeclarator, ExpressionStatement, AssignmentExpression, ReturnStatement, ConditionalExpression, BinaryExpression } from 'estree';
import { ProgremState, CodeExecutionListener, GridChangeListener } from './SchedulingService';
import { AstHelper } from './AstHelper';
import { FunctionDeclarationToHtmlTreeStore, CodeSpoolerEsToHtmlTreeMapperFactory, EsToHtmlTreeStore } from './HtmlTree';
import { ProgremCode, ProgremView, ProgremScheduler, HtmlCoupletFactory } from './Types';

export interface ProgremInspector {
    clear(): void;
    attach(element: HTMLElement | null): void
}

/*
export class BasicHtmlEsprimaProgremInspector implements ProgremInspector, CodeExecutionListener, GridChangeListener {
    
    private progremCodeLines: HTMLElement[] = [];
    private attachedElement: HTMLElement | null = null;
    private mapping: Map<BaseNode, HTMLElement> = new Map();
    private hintStackContainer: HTMLElement | null = null;

    private treeStore1: EsToHtmlTreeStore;

    constructor(
        private progremCode: EsprimaProgremCode,
        private scheduler: ProgremScheduler,
        private _document: Document
    ) {
        scheduler.subscribeCodeExecution(this);
        scheduler.subscribeGridChange(this);
        //this.buildHtmlTree2();
        this.treeStore1 = this.buildHtmlTree3();
    }

    attach0(element: HTMLElement | null): void {
        this.attachedElement = element;

        if (element) {
            let codeContainer = document.createElement('div');
            codeContainer.classList.add('codeContainer');
            this.hintStackContainer = document.createElement('div');
            this.hintStackContainer.classList.add('hintContainer');
            element.appendChild(codeContainer);
            element.appendChild(this.hintStackContainer);

            this.progremCodeLines.map(elt => { codeContainer.appendChild(elt) });
        }
    }

    attach(element: HTMLElement): void {
        this.attachedElement = element;

        if (element) {
            this.treeStore1.paintInto(element);
        }
    }

    clear0(): void {
        this.colorMap = new Map();
        if (this.hintStackContainer)
            this.hintStackContainer.innerHTML = "";
        this.mapping.forEach((elt, node) => elt.classList.remove('highlight'));
    }

    clear(): void {
        this.colorMap = new Map();
        this.treeStore1.resetStyle();
        if (this.hintStackContainer) {
            this.hintStackContainer.innerHTML = "";
        }
    }

    private colorMap: Map<string, number> = new Map();

    private hslColor(hue: number): string {
        return 'hsl(' + hue + ', 100%, 80%)';
    }

    private hashStringToColor(key: string) {
        let shift = 2;
        let colorCount = 12;

        var hue = this.colorMap.get(key);
        if (hue) return this.hslColor(hue);

        var hash = md5Create().update(key).toString();
        
        hue = ( parseInt(hash.substring(shift + 0, shift + 1), 16) + 16 * parseInt(hash.substring(shift + 1, shift + 2), 16) + 256 * parseInt(hash.substring(shift + 2, shift + 3), 16) );
        hue = Math.floor(hue % colorCount) * 360 / colorCount;

        while (!this.colorMap.get(key)) {
            let duplicateColor = false;
            for (let c of this.colorMap.values()) {
                if (c === hue) {
                    duplicateColor = true;
                    hue += Math.floor(360 / colorCount);
                    break;
                }
            }
            if (!duplicateColor) {
                this.colorMap.set(key, hue);
            }
        }
        
        //var pastel = 'hsl(' + hue + ', 100%, 87.5%)';
        return this.hslColor(hue);
    }

    public fireCodeExecution(state: ProgremState) {
        if (state.verse === null) {
            throw new Error('Received a null statement !');
        }

        //this.mapping.forEach((elt, node) => elt.classList.remove('highlight'));
        this.treeStore1.removeStyleClasses(['highlight']);

        let executedNode = state.verse.astRootNode;
        //let htmlNode = this.mapping.get(executedNode);
        //if (!htmlNode) {
        //    throw new Error('Unable to found a HTML element mapped for received statement !')
        //}
        //htmlNode.classList.add('highlight');
        this.treeStore1.addStyleClasses(executedNode, ['highlight']);

        if (this.hintStackContainer) {
            let node = AstHelper.reduceNodeToVarDeclaration(executedNode);
            if (node) {
                if (node.type === 'VariableDeclaration') {
                    let decl = node as VariableDeclaration;
                    
                    decl.declarations.map(d => {
                        //@ts-ignore
                        let hint = this.appendHint(this.hintStackContainer, []);
                        let varName = AstHelper.patternToString(d.id);
                        let varValue = undefined;
                        if (d.init) {
                            varValue = state.evalScope.globalEval(escodeGenerate(d.init));
                        }
                        hint.innerHTML = varName + ' = ' + varValue;
                        hint.style.backgroundColor = this.hashStringToColor(varName);

                        //let pElt = this.mapping.get(d);
                        //if (pElt) pElt.style.backgroundColor = this.hashStringToColor(varName);
                        this.treeStore1.setStyleProperty(d, 'backgroundColor', this.hashStringToColor(varName));
                    });
                } else if (node.type === 'AssignmentExpression') {
                    let decl = node as AssignmentExpression;

                    //@ts-ignore
                    let hint = this.appendHint(this.hintStackContainer, []);
                    let varName = AstHelper.patternToString(decl.left);
                    hint.innerHTML = varName + ' = ' + state.evalScope.globalEval(varName);
                    hint.style.backgroundColor = this.hashStringToColor(varName);

                    //let pElt = this.mapping.get(decl);
                    //if (pElt) pElt.style.backgroundColor = this.hashStringToColor(varName);
                    this.treeStore1.setStyleProperty(decl, 'backgroundColor', this.hashStringToColor(varName));
                } else if (node.type === 'FunctionDeclaration') {
                    let func = node as FunctionDeclaration;

                    func.params.forEach(p => {
                        let varName = AstHelper.patternToString(p);
                        let varValue = state.evalScope.globalEval(varName);
                        //@ts-ignore
                        let hint = this.appendHint(this.hintStackContainer, []);
                        hint.innerHTML = varName + ' = ' + varValue;
                        hint.style.backgroundColor = this.hashStringToColor(varName);

                        //let pElt = this.mapping.get(p);
                        //if (pElt) pElt.style.backgroundColor = this.hashStringToColor(varName);
                        this.treeStore1.setStyleProperty(p, 'backgroundColor', this.hashStringToColor(varName));
                    });
                }
            }
        }

    }

    public fireGridChange(state: ProgremState) {
        this.clear();
    }

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
    private unstackAst(parentElement: HTMLElement, stack: BaseNode[], padding: number): void {
        stack.forEach(node => {
            if (!node) throw new Error('Should not be able to shift a null node !');

            let line, startLine: HTMLElement, endLine, n, varSpan, leftSpan, rightSpan;
            switch (node.type) {
                case 'BlockStatement':
                    n = node as BlockStatement;
                    this.unstackAst(parentElement, n.body, padding + 1);
                    break;

                case 'FunctionDeclaration':
                    n = node as FunctionDeclaration;
                    startLine = this.appendCodeLine(parentElement, padding);
                    this.mapping.set(node, startLine);
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
                        this.mapping.set(param, span);
                        if (i < paramCount - 1) {
                            let span = this.appendSpan(startLine, []);
                            span.innerHTML = ', ';
                        }
                    });

                    let span = this.appendSpan(startLine, []);
                    span.innerHTML += ' ) {';

                    this.unstackAst(parentElement, n.body.body, padding + 1);

                    endLine = this.appendCodeLine(parentElement, padding);
                    endLine.innerHTML = '}';
                    break;

                case 'IfStatement':
                    n = node as IfStatement;
                    startLine = this.appendCodeLine(parentElement, padding);
                    this.mapping.set(n.test, startLine);
                    //startLine.innerHTML = 'if ( <span>' + Escodegen.generate(ifstmt.test) + '</span> ) {';
                    startLine.innerHTML = 'if ( ';
                    this.unstackAst(startLine, [n.test], 0);
                    startLine.innerHTML += ' ) {';

                    this.unstackAst(parentElement, [n.consequent], padding);

                    let midLine = this.appendCodeLine(parentElement, padding);

                    if (n.alternate) {
                        midLine.innerHTML = '} else {';
                        this.unstackAst(parentElement, [n.alternate], padding);
                    }

                    endLine = this.appendCodeLine(parentElement, padding);
                    endLine.innerHTML = '}';
                    break;

                case 'VariableDeclaration':
                    n = node as VariableDeclaration;
                    line = this.appendCodeLine(parentElement, padding);
                    this.mapping.set(node, line);
                    line.innerHTML = n.kind + ' ';
                    this.unstackAst(line, n.declarations, 0);
                    break;

                case 'VariableDeclarator':
                    n = node as VariableDeclarator;
                    varSpan = this.appendSpan(parentElement, ['varId']);
                    this.mapping.set(node, varSpan);
                    varSpan.innerHTML = AstHelper.patternToString(n.id);
                    if (n.init) {
                        this.appendSpan(parentElement, [], ' = ');
                        let initSpan = this.appendSpan(parentElement, ['varInit']);
                        this.unstackAst(initSpan, [n.init], 0);
                    }
                    this.appendSpan(parentElement, [], ';');
                    break;

                case 'AssignmentExpression':
                    n = node as AssignmentExpression;
                    leftSpan = this.appendSpan(parentElement, ['varId']);
                    this.mapping.set(node, leftSpan);
                    this.unstackAst(leftSpan, [n.left], 0);
                    this.appendSpan(parentElement, [], ' = ');
                    rightSpan = this.appendSpan(parentElement, ['varInit']);
                    this.unstackAst(rightSpan, [n.right], 0);
                    this.appendSpan(parentElement, [], ';');
                    break;

                case 'BinaryExpression':
                    n = node as BinaryExpression;
                    leftSpan = this.appendSpan(parentElement, ['leftBin']);
                    this.unstackAst(leftSpan, [n.left], 0);
                    this.appendSpan(parentElement, [], ' ' + n.operator + ' ');
                    rightSpan = this.appendSpan(parentElement, ['rightBin']);
                    this.unstackAst(rightSpan, [n.right], 0);
                    break;

                case 'ExpressionStatement':
                    n = node as ExpressionStatement;
                    line = this.appendCodeLine(parentElement, padding);
                    this.mapping.set(node, line);
                    this.unstackAst(line, [n.expression], 0);
                    break;

                case 'ReturnStatement':
                    n = node as ReturnStatement
                    line = this.appendCodeLine(parentElement, padding);
                    this.mapping.set(node, line);
                    line.innerHTML = escodeGenerate(node);
                    break;

                default:
                    console.log('default:', node);
                    line = this.appendSpan(parentElement, ['nsy-' + node.type], escodeGenerate(node));
                    this.mapping.set(node, line);
                    break;
            }
        });
    }

    private buildHtmlTree2() {
        const codeRoot = document.createElement("div");
        this.progremCodeLines.push(codeRoot);
        this.unstackAst(codeRoot, [this.progremCode.colorerProgremFunction().astRootNode], 0);
    }

    private buildHtmlTree3(): EsToHtmlTreeStore {
        const codeRoot = document.createElement("div");
        this.progremCodeLines.push(codeRoot);
        
        let factory = new CodeSpoolerEsToHtmlTreeMapperFactory(this._document);
        let treeStore = factory.build(this.progremCode);

        treeStore.paintInto(codeRoot);

        return treeStore;
    }

    private buildHtmlTree() {
        const codeRoot = document.createElement("div");
        const stack: BaseNode[] = [this.progremCode.colorerProgremFunction().astRootNode];
        let padding = 0;

        //this.progremCode.colorerProgremFunction().body.body.map(n => stack.push(n));

        do {
            let node = stack.shift();
            if (!node) throw new Error('Should not be able to shift a null node !');
            var line;

            switch (node.type) {
                case 'BlockStatement':
                    let block = node as BlockStatement;
                    padding++
                    block.body.slice(0).reverse().map(x => stack.unshift(x));
                    break;
                case 'EndBlockStatement':
                    // This is a hack to close an opened block
                    padding--;
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
                    stack.unshift({ type: 'EndBlockStatement' }); // Hack to delay a block end
                    stack.unshift(func.body);
                    break;
                case 'IfStatement':
                    let ifstmt = node as IfStatement;
                    line = this.appendCodeLine(codeRoot, padding);
                    line.innerHTML = 'if ( <span>' + escodeGenerate(ifstmt.test) + '</span> ) {';
                    this.mapping.set(ifstmt.test, line);

                    if (ifstmt.alternate) {
                        stack.unshift({ type: 'EndBlockStatement' }); // Hack to delay a block end
                        stack.unshift(ifstmt.alternate);
                    }
                    stack.unshift({ type: 'ElseBlockStatement' }); // Hack to delay an else block
                    stack.unshift(ifstmt.consequent);
                    break;
                case 'ElseBlockStatement':
                    // This is a hack to close an opened block
                    padding--;
                    line = this.appendCodeLine(codeRoot, padding);
                    line.innerHTML = '} else {';
                    break;
                default:
                    line = this.appendCodeLine(codeRoot, padding);
                    line.textContent = escodeGenerate(node);
                    line.classList.add('statement');
                    this.mapping.set(node, line);
                    break;
            }
        } while (stack.length > 0);
    }
}

*/

export class ProgremInspectorView implements ProgremView, CodeExecutionListener, GridChangeListener {

    private executingElements: HTMLElement[] = [];
    private executedElements: HTMLElement[] = [];

    public static readonly EXECUTING_CLASS = 'verse-executing';
    public static readonly EXECUTED_CLASS = 'verse-executed';

    constructor(
        private scheduler: ProgremScheduler,
        private htmlFactory: HtmlCoupletFactory<any>
    ) {
        scheduler.subscribeCodeExecution(this);
        scheduler.subscribeGridChange(this);
    }

    buildView(scheduler: ProgremScheduler): HTMLElement {
        let htmlComponent = this.htmlFactory.buildCouplet();
        return htmlComponent;
    }
    
    fireCodeExecution(state: ProgremState): void {
        let htmlVerse = this.htmlFactory.getHtmlVerse(state.verse);
        if(htmlVerse) {
            htmlVerse.classList.add(ProgremInspectorView.EXECUTING_CLASS);
        }
        while (this.executingElements.length > 0) {
            let elt = this.executingElements.pop();
            if (elt) {
                this.executedElements.push(elt);
                elt.classList.remove(ProgremInspectorView.EXECUTING_CLASS);
                elt.classList.add(ProgremInspectorView.EXECUTED_CLASS);
            }
        }
        if (!htmlVerse) {
            return;
        }

        this.executingElements.push(htmlVerse);
        htmlVerse.classList.add(ProgremInspectorView.EXECUTING_CLASS);
    }

    fireGridChange(state: ProgremState): void {
        while (this.executingElements.length > 0) {
            let elt = this.executingElements.pop();
            if (elt) {
                elt.classList.remove(ProgremInspectorView.EXECUTED_CLASS);
                elt.classList.remove(ProgremInspectorView.EXECUTING_CLASS);
            }
        }

        while (this.executedElements.length > 0) {
            let elt = this.executedElements.pop();
            if (elt) {
                elt.classList.remove(ProgremInspectorView.EXECUTED_CLASS);
                elt.classList.remove(ProgremInspectorView.EXECUTING_CLASS);
            }
        }
    }

}
