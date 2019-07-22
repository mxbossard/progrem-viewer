import { StyleDecorator, ColorProvider } from "../../core/Types";
import { BaseNode, Identifier } from "estree";

import { ColorService } from "../../core/ColorService";
import { EsprimaHelper } from "../../esprima/EsprimaHelper";
import { HtmlHelper } from "../../core/HtmlHelper";

export class ColorVariableScopeDecorator implements StyleDecorator<string> {

    private variableMap: Map<string, number> = new Map();
    private colorProvider: ColorProvider = ColorService.colorProvideractory.build();

    decorate(varId: string, element: HTMLElement): HTMLElement {
        let varIndex = this.variableMap.get(varId);
        if (!varIndex) {
            varIndex = this.variableMap.size + 1;
            this.variableMap.set(varId, varIndex);
        }

        element.classList.add('variable-hint');
        element.classList.add('variable-' + varIndex);
        
        let container = HtmlHelper.span('variable-hint-container', element);
        return container;
    }    
    
    buildStyleSheet(): string {
        let style = '';
        //console.log('variable count:', this.variableMap.size);
        this.variableMap.forEach((index, id) => {
            let color = this.colorProvider.hashStringToColor(id, 16); //this.variableMap.size
            //console.log('building color #', id, '=>', color);
            style += `
                .variable-scope-component .variable-hint-container {
                    margin: 0.8em 0 0.8em 0;
                    display: block;
                }
                .variable-scope-component .variable-hint {
                    padding: 0.1em 0.5em 0.1em 0.5em;
                    border: 1px solid black;
                    border-radius: 0.8em;
                }
                .variable-scope-component .variable-${index}, 
                .variable-scope-component .variable-${index} {
                    background-color: ${color};
                }
            `;
        });
        console.log('style', style);
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
