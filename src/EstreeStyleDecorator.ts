import { StyleDecorator } from "./Types";
import { BaseNode } from "estree";

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
        if (node.type === 'BlockStatement') {
            element.classList.add('code-padding')
        }
    }    
    
    buildStyleSheet(): string {
        return `
        .code-padding {
            margin-left: 16px;
        }
        `;
    }

}
