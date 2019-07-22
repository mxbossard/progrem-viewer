import { StyleDecorator, ColorProvider } from "../../core/Types";
import { BaseNode, Identifier } from "estree";

import { ProgremInspectorComponent } from "./ProgremInspectorComponent";
import { ColorService } from "../../core/ColorService";

export class ColorVerseVariableDecorator implements StyleDecorator<BaseNode> {

    private variableMap: Map<string, number> = new Map();
    private colorProvider: ColorProvider = ColorService.colorProvideractory.build();

    decorate(node: BaseNode, element: HTMLElement): HTMLElement {
        let varId;

        if (node.type === 'Identifier') {
            let n = node as Identifier;
            varId = n.name;
        }

        if (varId) {
            let varIndex = this.variableMap.get(varId);
            if (!varIndex) {
                varIndex = this.variableMap.size + 1;
                this.variableMap.set(varId, varIndex);
            }

            element.classList.add('variable');
            element.classList.add('variable-' + varIndex);
        }

        return element;
    }    
    
    buildStyleSheet(): string {
        let style = '';
        //console.log('variable count:', this.variableMap.size);
        this.variableMap.forEach((index, id) => {
            let color = this.colorProvider.hashStringToColor(id, 16); //this.variableMap.size
            //console.log('building color #', id, '=>', color);
            style += `
                .variable {
                    padding: 0.1em 0.5em 0.1em 0.5em;
                    border: 1px solid transparent;
                    border-radius: 0.8em;
                }
                .${ProgremInspectorComponent.EXECUTING_CLASS} .variable-${index}.identifier, 
                .${ProgremInspectorComponent.EXECUTED_CLASS} .variable-${index}.identifier {
                    background-color: ${color};
                    border: 1px solid black;
                }
            `;
        });
        return style;
    }
}

export class PadVerseDecorator implements StyleDecorator<BaseNode> {

    decorate(node: BaseNode, element: HTMLElement): HTMLElement {
        if (node.type === 'BlockStatement') {
            element.classList.add('code-padding')
        }

        return element;
    }    
    
    buildStyleSheet(): string {
        return `
        .code-padding {
            margin-left: 32px;
        }
        `;
    }

}
