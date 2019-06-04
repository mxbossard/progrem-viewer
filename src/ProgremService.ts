import * as Escodegen from 'escodegen';
import { ProgremCode, CodeService, CodeIterator } from "./CodeService";
import { FunctionDeclaration, BaseNode, BlockStatement, IfStatement } from 'estree';
import { Dictionary, arrays } from 'typescript-collections';
import { SchedulingService, ProgremScheduler, ProgremState, CodeExecutionListener } from './SchedulingService';

export class ProgremConfig {
    constructor(
        public readonly colonnes: number,
        public readonly lignes: number,
        public readonly frames: number,
    ) {}
}

export interface ProgremGrid {
    clear(): void;
}

export interface ProgremInspector {
    clear(): void;
    attach(parentElement: HTMLElement): void
}

class BasicCanvasProgremGrid implements ProgremGrid {
    
    clear(): void {
        throw new Error("Method not implemented.");
    }    
    
    nextFrame(): void {
        throw new Error("Method not implemented.");
    }

}

class BasicHtmlEsprimaProgremInspector implements ProgremInspector, CodeExecutionListener {

    private progremCodeLines: HTMLElement[] = [];
    private attachedElement: Element | null = null;
    private mapping: Dictionary<BaseNode, HTMLElement> = new Dictionary(x => Escodegen.generate(x));

    constructor(
        private progremCode: ProgremCode, 
        private scheduler: ProgremScheduler
        ) {
            scheduler.subscribeCodeExecution(this);
        this.buildHtmlTree();
    }

    attach(parentElement: Element | null): void {
        this.attachedElement = parentElement;

        if (parentElement) {
            this.progremCodeLines.map(elt => {parentElement.appendChild(elt)});
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
        //parent.appendChild(elt);
        this.progremCodeLines.push(elt);

        return elt;
    }

    private buildHtmlTree() {
        const codeRoot = document.createElement("div");
        const stack: BaseNode[] = [];
        let padding = 0;

        this.progremCode.colorerProgremFunction().body.body.map(n => stack.push(n));
        
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

export namespace ProgremService {

    var previousRepaintTime = 0;
    var scheduler: ProgremScheduler;

    export function buildProgrem(url: string, progremConfig: ProgremConfig) {
        CodeService.loadProgrem(url).then(code => {
            let progremCode = CodeService.progremCodeFactory.build(code);
            
            // Load initProgrem Function code
            let initProgremFunctionCode = Escodegen.generate(progremCode.initialiserProgremFunction());
            (window as any).eval(initProgremFunctionCode);

            scheduler = SchedulingService.buildProgremScheduler(progremConfig, progremCode);

            let progremInspector = new BasicHtmlEsprimaProgremInspector(progremCode, scheduler);

            let codeElement = document.querySelector('.code');
            console.log('codeElement', codeElement);
            progremInspector.attach(codeElement);
            
            timer(0);
        });
    }

    function timer(timestamp: number) {
        window.requestAnimationFrame(timer);

        if (timestamp - previousRepaintTime < 500) {
            return;
        }

        previousRepaintTime = timestamp;

        if (scheduler) {
            scheduler.next();
        }
    }

}