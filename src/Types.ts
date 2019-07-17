import { ProgremState, CodeExecutionListener, GridChangeListener, LineChangeListener, FrameChangeListener } from "./SchedulingService";
import { BaseNode } from "estree";

interface VerseInstruction<AstBaseType> {
    rootNode():  AstBaseType
}
    

interface VerseIterator<AstBaseType> {
    executeNext(): VerseInstruction<AstBaseType>
    hasNext(): boolean;
}

interface ProgremCode {
    iterator(): VerseIterator<any>
}

interface ProgremScheduler {
    subscribeCodeExecution(listener: CodeExecutionListener): void
    subscribeGridChange(listener: GridChangeListener): void
    subscribeLineChange(listener: LineChangeListener): void
    subscribeFrameChange(listener: FrameChangeListener): void
    reset(): ProgremState
    current(): ProgremState
    next(): ProgremState
    progrem(): ProgremCode
}

interface ProgremView {
    buildView(scheduler: ProgremScheduler): HTMLElement
}

interface StyleDecorator<T> {
    decorate(node: T, element: HTMLElement): void
    buildStyleSheet(): string
}

interface HtmlVerseFactory<AstBaseType> {
    build(verse: VerseInstruction<AstBaseType>): HTMLElement
}

class StyleDecoratorAggregation<T> implements StyleDecorator<T> {

    constructor(private decorators: StyleDecorator<T>[]) {}

    decorate(node: T, element: HTMLElement): void {
        this.decorators.forEach(d => d.decorate(node, element));
    }

    buildStyleSheet(): string {
        return this.decorators.map(d => d.buildStyleSheet()).join('\n');
    }

}

class HighlightExecutingVerseDecorator implements StyleDecorator<VerseInstruction<any>> {

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

class ColorVerseVariableDecorator implements StyleDecorator<BaseNode> {

    private variableCounter: number = 0;

    decorate(node: BaseNode, element: HTMLElement): void {
        throw new Error("Method not implemented.");
    }    
    
    buildStyleSheet(): string {
        throw new Error("Method not implemented.");
    }

}

class BasicProgremInspectorHtmlFactory implements HtmlVerseFactory<BaseNode> {

    constructor(private decorator: StyleDecorator<BaseNode>) {}

    build(verse: VerseInstruction<BaseNode>): HTMLElement {
        throw new Error("Method not implemented.");
    }

}

class ProgremInspector implements ProgremView {

    constructor(private htmlFactory: BasicProgremInspectorHtmlFactory) {}

    buildView(scheduler: ProgremScheduler): HTMLElement {
        throw new Error("Method not implemented.");
    }
    
}

