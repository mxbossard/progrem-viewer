import { ProgremState, CodeExecutionListener, GridChangeListener, LineChangeListener, FrameChangeListener } from "./SchedulingService";

export interface VerseInstruction<AstBaseType> {
    astRootNode: AstBaseType
}

export interface VerseInstructionFactory<AstBaseType> {
    build(param: AstBaseType): VerseInstruction<AstBaseType>;
}

export interface ProgremCodeFactory<AstBaseType> {
    build(code: string): ProgremCode<AstBaseType>
}

export interface VerseIterator<AstBaseType> {
    executeNext(): VerseInstruction<AstBaseType>
    hasNext(): boolean;
}

export interface ProgremCode<AstBaseType> {
    initialiserProgremFunction(): VerseInstruction<AstBaseType>
    colorerProgremFunction(): VerseInstruction<AstBaseType>
    iterator(state: ProgremState): VerseIterator<AstBaseType>
}

export interface ProgremScheduler {
    subscribeCodeExecution(listener: CodeExecutionListener): void
    subscribeGridChange(listener: GridChangeListener): void
    subscribeLineChange(listener: LineChangeListener): void
    subscribeFrameChange(listener: FrameChangeListener): void
    reset(): ProgremState
    current(): ProgremState
    next(): ProgremState
    getProgrem(): ProgremCode<any>
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

