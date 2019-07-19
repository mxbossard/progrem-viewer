import { VerseInstruction, VerseIterator, ProgremCode } from "./Types";
import { BaseNode } from "estree";

export class EsprimaVerseInstruction implements VerseInstruction<BaseNode> {
    constructor(
        public astRootNode: BaseNode,
    ) {};
}

export interface EsprimaVerseIteraor extends VerseIterator<BaseNode> {

}

export interface EsprimaProgremCode extends ProgremCode<BaseNode> {
    
}