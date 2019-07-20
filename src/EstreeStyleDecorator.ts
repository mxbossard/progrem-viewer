import { StyleDecorator } from "./Types";
import { BaseNode, VariableDeclarator, AssignmentExpression, Identifier } from "estree";
import { AstHelper } from "./AstHelper";
import { create as md5Create } from 'js-md5';

export class ColorVerseVariableDecorator implements StyleDecorator<BaseNode> {

    private variableMap: Map<string, number> = new Map();

    decorate(node: BaseNode, element: HTMLElement): void {
        let varId;
        if (node.type === 'VariableDeclarator') {
            let n = node as VariableDeclarator;
            varId = AstHelper.patternToString(n.id);
        }
        if (node.type === 'AssignmentExpression') {
            let n = node as AssignmentExpression;
            varId = AstHelper.patternToString(n.left);
        }
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

            element.classList.add('variable-' + varIndex);
        }
    }    
    
    buildStyleSheet(): string {
        let style = '';
        this.variableMap.forEach((index, id) => {
            let color = this.hashStringToColor(id, this.variableMap.size);
            style += `
                .variable-${index} .variable-id, .func-start .variable-${index} {
                    background-color: ${color};
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

        while (!this.colorMap.get(key)) {
            let duplicateColor = false;
            for (let c of this.colorMap.values()) {
                if (c === hue) {
                    duplicateColor = true;
                    hue += Math.floor(360 / colorCount);
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

    decorate(node: BaseNode, element: HTMLElement): void {
        if (node.type === 'BlockStatement') {
            element.classList.add('code-padding')
        }
    }    
    
    buildStyleSheet(): string {
        return `
        .code-padding {
            margin-left: 32px;
        }

        .block {
            display: block;
        }

        .statement, .declaration {
            display: block;
        }
        `;
    }

}
