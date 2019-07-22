import { StyleDecorator, ProgremScheduler } from "../../core/Types";
import { BaseNode, VariableDeclarator, AssignmentExpression, Identifier } from "estree";
import { EsprimaHelper } from "../../esprima/EsprimaHelper";
import { create as md5Create } from 'js-md5';
import { ProgremInspectorComponent } from "./ProgremInspectorComponent";

export class ColorVerseVariableDecorator implements StyleDecorator<BaseNode> {

    private variableMap: Map<string, number> = new Map();

    decorate(node: BaseNode, element: HTMLElement): HTMLElement {
        let varId;
        /*
        if (node.type === 'VariableDeclarator') {
            let n = node as VariableDeclarator;
            varId = EsprimaHelper.patternToString(n.id);
        }
        if (node.type === 'AssignmentExpression') {
            let n = node as AssignmentExpression;
            varId = EsprimaHelper.patternToString(n.left);
        }
        */
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
            let color = this.hashStringToColor(id, this.variableMap.size);
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


    private colorMap: Map<string, number> = new Map();

    private hslColor(hue: number): string {
        return 'hsl(' + hue + ', 100%, 80%)';
    }

    private hashStringToColor(key: string, colorCount: number = 12, shift: number = 2) {
        var hue = this.colorMap.get(key);
        if (hue) return this.hslColor(hue);

        var hash = md5Create().update(key).toString();
        
        hue = ( parseInt(hash.substring(shift + 0, shift + 1), 16) + 16 * parseInt(hash.substring(shift + 1, shift + 2), 16) + 256 * parseInt(hash.substring(shift + 2, shift + 3), 16) );
        hue = Math.floor(hue % colorCount) * 360 / colorCount;
        hue = hue % 360;

        // Color deduplication
        while (!this.colorMap.get(key)) {
            let duplicateColor = false;
            for (let c of this.colorMap.values()) {
                if (Math.abs(c - hue) < Math.floor(180 / colorCount)) {
                    duplicateColor = true;
                    hue += Math.floor(270 / colorCount);
                    hue = hue % 360;
                    break;
                }
            }
            if (!duplicateColor) {
                this.colorMap.set(key, hue);
            }
        }
        
        //var pastel = 'hsl(' + hue + ', 100%, 87.5%)';
        return this.hslColor(hue);
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
