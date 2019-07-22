import { ProgremVerse, VerseIterator, ProgremCode, ProgremCouplet, ProgremFactory, HtmlCoupletFactory } from "./Types";
import { BaseNode, FunctionDeclaration } from "estree";
import { ProgremState } from "./SchedulingService";

export interface EsprimaProgrem extends ProgremCode<BaseNode> {
    initialiserProgremFunction(): EsprimaCouplet
    colorerProgremFunction(): EsprimaCouplet
    iterator(state: ProgremState): EsprimaVerseIteraor
}

export interface EsprimaVerseIteraor extends VerseIterator<BaseNode> {

}

export interface EsprimaProgremCode extends ProgremCode<BaseNode> {
    
}

export interface EsprimaProgremFactory extends ProgremFactory<BaseNode> {
    buildProgrem(code: string): EsprimaProgrem
    buildCouplet(node: FunctionDeclaration, verses: BaseNode[]): EsprimaCouplet
    buildVerse(node: BaseNode): EsprimaVerse
}

export interface EsprimaHtmlCoupletFactory extends HtmlCoupletFactory<BaseNode> {
    buildCouplet(): HTMLElement
    getHtmlVerse(verse: EsprimaVerse): HTMLElement
}

export class EsprimaVerse implements ProgremVerse<BaseNode> {
    constructor(
        public readonly node: BaseNode,
        public readonly code: BaseNode
    ) {};
}

export class EsprimaCouplet implements ProgremCouplet<BaseNode> {
    constructor(
        public readonly functionRootNode: FunctionDeclaration,
        public readonly verses: EsprimaVerse[]
    ) {}
}
