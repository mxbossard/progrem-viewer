import { StyleDecorator, ProgremScheduler } from "../../core/Types";
import { BaseNode, FunctionDeclaration, BlockStatement, IfStatement, VariableDeclarator, VariableDeclaration, AssignmentExpression, BinaryExpression, ExpressionStatement, ReturnStatement, Identifier, MemberExpression } from "estree";
import { HtmlHelper } from "../../core/HtmlHelper";
import { EsprimaHelper } from "../../esprima/EsprimaHelper";
import { EsprimaVerse, EsprimaHtmlCoupletFactory, EsprimaCouplet } from "../../esprima/EsprimaTypes";
import { stringify } from "querystring";

export class EsprimaVariableScopeHtmlFactory implements EsprimaHtmlCoupletFactory {

    private varHintByVersesMap: Map<BaseNode, HTMLElement[]> = new Map();
    private varHintUpdaterMap: Map<BaseNode, (value: any) => void> = new Map();

    constructor(
        private couplet: EsprimaCouplet,
        private decorator: StyleDecorator<string>,
        private scheduler: ProgremScheduler
    ) {}

    buildCouplet(): HTMLElement {
        let container = HtmlHelper.span('variable-scope-component')

        // FIXME il faudrait parcourir l'arbre AST avec un walker ou un truc du genre.
        // FIXME gros hack du système de HtmlFactory et de Decorator pour realiser ce composant.
        // Build all VariableHint which will be added in view container one by one by getHtmlVerse()
        this.couplet.verses.forEach(v => {
            let varHints = this.buildVariableHints(v.node);
            let decoratedVarHints: HTMLElement[] = [];
            varHints.forEach((varHint, varName) => {
                let decorated = this.decorator.decorate(varName, varHint);
                decoratedVarHints.push(decorated);
                container.appendChild(decorated);
            })
            this.varHintByVersesMap.set(v.node, decoratedVarHints);
        });

        this.clearView();

        return container;
    }    
    
    getHtmlVerse(verse: EsprimaVerse): HTMLElement|undefined {
        if (this.varHintByVersesMap.size === 0 || !verse.node) {
            return;
        }

        let htmlElements = this.varHintByVersesMap.get(verse.node);
        if (!htmlElements || htmlElements.length === 0) {
            return;
        }

        let state = this.scheduler.current();
        let valuesMap = EsprimaHelper.getVariableValues(state, verse.node);
        let varHintUpdater = this.varHintUpdaterMap.get(verse.node);
        if (varHintUpdater) {
            varHintUpdater(valuesMap);
        }
        
        // Show elements
        htmlElements.forEach(hint => hint.classList.remove('hidden'));

        //let verseContainer = HtmlHelper.span('verse-container', htmlElements);
        //return verseContainer;
    }

    public clearView(): void {
        // Hide elements
        this.varHintByVersesMap.forEach(hints => hints.forEach(hint => hint.classList.add('hidden')));
        // Reset value
        this.varHintUpdaterMap.forEach((varHintUpdater, key) => {
            varHintUpdater(new Map());
        });
    }

    /**
     * Build a Variable Hint if the supplied node contains a Variable affectation.
     * @param node
     * @returns an HTMLElement or null if no hint should appear for this node
     */
    protected buildVariableHints(node: BaseNode): Map<string, HTMLElement> {
        let varNode = EsprimaHelper.reduceNodeToVarDeclaration(node);
        if (!varNode) {
            return new Map();
        }

        let varNames = EsprimaHelper.getVariableNames(varNode);
        let varHints = varNames.map(varName => {
            let varValue = HtmlHelper.span('variable-hint-value');
            let varHint = HtmlHelper.span('variable-hint', [`${varName}: `, varValue]);
            return {varName, varHint, varValue};
        });

        let valUpdater = (valsByVarName: Map<string, any>) => {
            varHints.forEach(varHint => {
                let val = valsByVarName.get(varHint.varName);
                if (typeof val === 'number') {
                    varHint.varValue.innerText = val.toFixed(2).toString();
                } else {
                    varHint.varValue.innerText = val;
                }
            });
        };
        this.varHintUpdaterMap.set(node, valUpdater);

        let varHintsByName = new Map<string, HTMLElement>();
        varHints.forEach(varHint => varHintsByName.set(varHint.varName, varHint.varHint));

        return varHintsByName;
    }

}