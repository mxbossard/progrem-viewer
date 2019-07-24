import { EvalScope } from "./EvalService";

export class ProgremConfig {
    constructor(
        public titre: string,
        public nombreColonnes: number,
        public nombreLignes: number,
        public nombreFrames: number,
    ) { }
}

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

export class ProgremState {

    public readonly evalScope = new EvalScope;

    constructor(
        public readonly colonne: number,
        public readonly ligne: number,
        public readonly frame: number,
        public contexte: object,
        public readonly verse: ProgremVerse<any> | null,
    ) {}

    public eval(expr: string): any {
        return this.evalScope.globalEval(expr);
    }
}

type NewStateCallback = (state: ProgremState) => void;
export interface StartIteratingCodeListener {fireStartIteratingCode: NewStateCallback};
export interface CodeExecutionListener {fireCodeExecution: NewStateCallback};
export interface GridChangeListener {fireGridChange: NewStateCallback};
export interface LineChangeListener {fireLineChange: NewStateCallback};
export interface FrameChangeListener {fireFrameChange: NewStateCallback};

export enum ProgremTempo {
    ByVerse = 0,
    ByPixel,
    ByLine,
    ByFrame
}

export interface ProgremScheduler {
    subscribeStartIteratingCode(listener: StartIteratingCodeListener): void
    subscribeCodeExecution(listener: CodeExecutionListener): void
    subscribeGridChange(listener: GridChangeListener): void
    subscribeLineChange(listener: LineChangeListener): void
    subscribeFrameChange(listener: FrameChangeListener): void
    reset(): ProgremState
    current(): ProgremState
    next(): ProgremState[]
    getProgrem(): ProgremCode<any>
    tempo: ProgremTempo
}

export interface ProgremComponent {
    renderHtml(): HTMLElement
}

export interface StyleDecorator<T> {
    decorate(node: T, element: HTMLElement): HTMLElement
    buildStyleSheet(): string
}

export interface HtmlCoupletFactory<AstBaseType> {
    buildCouplet(): HTMLElement
    getHtmlVerse(verse: ProgremVerse<AstBaseType>): HTMLElement|undefined
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

export interface ColorProvider {
    hslColor(hue: number): string;
    hashStringToColor(key: string, colorCount: number, shift?: number): string;
}

export interface ColorProviderFactory {
    build(key?: string): ColorProvider;
}