import { ProgremState, CodeExecutionListener, GridChangeListener, LineChangeListener, FrameChangeListener } from "./SchedulingService";

export interface ProgremVerse<AstBaseType> {
    node: AstBaseType
    code: AstBaseType
}
/*
export interface VerseInstructionFactory<AstBaseType> {
    build(param: AstBaseType): ProgremVerse<AstBaseType>;
}
*/
export interface ProgremCouplet<AstBaseType> {
    functionRootNode: AstBaseType
    verses: ProgremVerse<AstBaseType>[]
}

export interface ProgremFactory<AstBaseType> {
    buildProgrem(code: string): ProgremCode<AstBaseType>
    buildCouplet(node: AstBaseType, verses: AstBaseType[]): ProgremCouplet<AstBaseType>
    buildVerse(node: AstBaseType): ProgremVerse<AstBaseType>
}

export interface VerseIterator<AstBaseType> {
    executeNext(): ProgremVerse<AstBaseType>
    hasNext(): boolean;
}

export interface ProgremCode<AstBaseType> {
    initialiserProgremFunction(): ProgremCouplet<AstBaseType>
    colorerProgremFunction(): ProgremCouplet<AstBaseType>
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
    decorate(node: T, element: HTMLElement): HTMLElement
    buildStyleSheet(): string
}

export interface HtmlCoupletFactory<AstBaseType> {
    buildCouplet(): HTMLElement
    getHtmlVerse(verse: ProgremVerse<AstBaseType>): HTMLElement
}

export class StyleDecoratorAggregation<T> implements StyleDecorator<T> {

    constructor(private decorators: StyleDecorator<T>[]) {}

    decorate(node: T, element: HTMLElement): HTMLElement {
        let temp: HTMLElement = element;
        this.decorators.forEach(d => temp = d.decorate(node, temp));
        return temp;
    }

    buildStyleSheet(): string {
        return this.decorators.map(d => d.buildStyleSheet()).join('\n');
    }

}


