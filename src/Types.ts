import { ProgremState, CodeExecutionListener, GridChangeListener, LineChangeListener, FrameChangeListener } from "./SchedulingService";
import { BaseNode, FunctionDeclaration } from "estree";

export interface VerseInstruction<AstBaseType> {
    getAstRootNode():  AstBaseType
}
    

export interface VerseIterator<AstBaseType> {
    executeNext(): VerseInstruction<AstBaseType>
    hasNext(): boolean;
}

export interface ProgremCode {
    initialiserProgremFunction(): VerseInstruction<any>
    colorerProgremFunction(): VerseInstruction<any>
    iterator(): VerseIterator<any>
}

export interface ProgremScheduler {
    subscribeCodeExecution(listener: CodeExecutionListener): void
    subscribeGridChange(listener: GridChangeListener): void
    subscribeLineChange(listener: LineChangeListener): void
    subscribeFrameChange(listener: FrameChangeListener): void
    reset(): ProgremState
    current(): ProgremState
    next(): ProgremState
    getProgrem(): ProgremCode
}

export interface ProgremView {
    buildView(scheduler: ProgremScheduler): HTMLElement
}

export interface StyleDecorator<T> {
    decorate(node: T, element: HTMLElement): void
    buildStyleSheet(): string
}

export interface HtmlVerseFactory<AstBaseType> {
    build(verse: VerseInstruction<AstBaseType>): HTMLElement
}

export class StyleDecoratorAggregation<T> implements StyleDecorator<T> {

    constructor(private decorators: StyleDecorator<T>[]) {}

    decorate(node: T, element: HTMLElement): void {
        this.decorators.forEach(d => d.decorate(node, element));
    }

    buildStyleSheet(): string {
        return this.decorators.map(d => d.buildStyleSheet()).join('\n');
    }

}

export class HighlightExecutingVerseDecorator implements StyleDecorator<VerseInstruction<any>> {

    public static readonly NOT_EXECUTED_CLASS = 'verse-not-executed';
    public static readonly EXECUTING_CLASS = 'verse-executing';
    public static readonly EXECUTED_CLASS = 'verse-executed';

    decorate(node: VerseInstruction<any>, element: HTMLElement): void {
        element.classList.add(HighlightExecutingVerseDecorator.NOT_EXECUTED_CLASS);
    }    
    
    buildStyleSheet(): string {
        return `
        /** ----- HighlightExecutingVerseDecorator style ----- */
        ${HighlightExecutingVerseDecorator.NOT_EXECUTED_CLASS}: {

        }
        ${HighlightExecutingVerseDecorator.EXECUTING_CLASS}: {
            background-color: yellow;
        }
        ${HighlightExecutingVerseDecorator.EXECUTED_CLASS}: {

        }
        `;
    }

}

export class ColorVerseVariableDecorator implements StyleDecorator<BaseNode> {

    private variableCounter: number = 0;

    decorate(node: BaseNode, element: HTMLElement): void {
        throw new Error("Method not implemented.");
    }    
    
    buildStyleSheet(): string {
        throw new Error("Method not implemented.");
    }

}

export class PadVerseDecorator implements StyleDecorator<BaseNode> {

    decorate(node: BaseNode, element: HTMLElement): void {
        throw new Error("Method not implemented.");
    }    
    
    buildStyleSheet(): string {
        throw new Error("Method not implemented.");
    }

}

export class ProgremInspector implements ProgremView, CodeExecutionListener {

    constructor(private htmlFactory: HtmlVerseFactory<any>) {}

    buildView(scheduler: ProgremScheduler): HTMLElement {
        let colorerProgremFunc = scheduler.getProgrem().colorerProgremFunction();
        let astRootNode = colorerProgremFunc.getAstRootNode();
        let htmlComponent = this.htmlFactory.build(astRootNode);
        return htmlComponent;
    }
    
    fireCodeExecution(state: ProgremState): void {

    }

    fireGridChange(state: ProgremState): void {

    }

}

