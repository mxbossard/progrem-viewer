import { StyleDecorator } from "../../core/Types";
import { BaseNode, FunctionDeclaration, BlockStatement, IfStatement, VariableDeclarator, VariableDeclaration, AssignmentExpression, BinaryExpression, ExpressionStatement, ReturnStatement, Identifier, MemberExpression } from "estree";
import { HtmlHelper } from "../../core/HtmlHelper";
import { EsprimaHelper } from "../../esprima/EsprimaHelper";
import { generate as escodeGenerate } from 'escodegen';
import { EsprimaVerse, EsprimaHtmlCoupletFactory, EsprimaCouplet } from "../../esprima/EsprimaTypes";

export class EsprimaProgremInspectorHtmlFactory implements EsprimaHtmlCoupletFactory {

    private htmlVersesMap: Map<BaseNode, HTMLElement> = new Map();

    constructor(
        private couplet: EsprimaCouplet,
        private decorator: StyleDecorator<BaseNode>
    ) {}

    buildCouplet(): HTMLElement {
        let htmlCouplet = this.buildNode(this.couplet.functionRootNode);
        htmlCouplet.classList.add('progrem-inspector-component');
        return htmlCouplet;
    }

    getHtmlVerse(verse: EsprimaVerse): HTMLElement {
        if (this.htmlVersesMap.size === 0) {
            throw new Error('IllegalStateError: couplet must be built before calling getHtmlVerse() !')
        }

        let htmlElement = this.htmlVersesMap.get(verse.node);
        if (!htmlElement) {
            console.log('No HTMLElement found matching verse:', verse, '!')
            throw new Error(`No HTMLElement found matching supplied verse !`);
        }
        
        return htmlElement;
    }

    /**
     * Build Node applying decorators.
     * 
     * @param node the node for which to produce HTML
     * @param siblings the nodes to add as siblings of the node
     */
    protected buildNode(node: BaseNode | undefined | null): HTMLElement {
        if (!node) {
            return HtmlHelper.span('empty', '');
        }
        let siblings: HTMLElement[] = []
        let htmlOutput = this.buildNodeInternal(node, siblings);
        htmlOutput = this.decorator.decorate(node, htmlOutput);

        let matchingVerse = this.couplet.verses.find(v => v.node === node);
        if (matchingVerse) {
            htmlOutput = this.encapsulateNodeInVerseContainer(htmlOutput);
            // This node is the root node of a Verse
            this.htmlVersesMap.set(matchingVerse.node, htmlOutput);
        }

        if (siblings.length > 0) {
            // If siblings, build each sibling
            htmlOutput = HtmlHelper.span('sibling-container', htmlOutput);
            while(siblings.length > 0) {
                let sibling = siblings.shift();
                if (sibling) {
                    //let siblingOut = this.buildNode(sibling);
                    htmlOutput.appendChild(sibling);
                }
            }
        }

        return htmlOutput;
    }

    protected encapsulateNodeInVerseContainer(htmlElt: HTMLElement): HTMLElement {
        let content = HtmlHelper.span('verse-content', htmlElt);
        let container = HtmlHelper.span('verse verse-container', content);
        return container;
    }

    /**
     * Build node.
     * @param node 
     */
    protected buildNodeInternal(node: BaseNode, siblings: HTMLElement[]): HTMLElement {
        //console.log('Building node', node, '...');
        switch (node.type) {
            case 'FunctionDeclaration':
                return this.buildFunctionDeclaration(node, siblings);
            case 'BlockStatement':
                return this.buildBlockStatement(node);
            case 'IfStatement':
                return this.buildIfStatement(node, siblings);
            case 'VariableDeclaration':
                return this.buildVariableDeclaration(node);
            case 'VariableDeclarator':
                return this.buildVariableDeclarator(node);
            case 'AssignmentExpression':
                return this.buildAssignmentExpression(node);
            case 'BinaryExpression':
                return this.buildBinaryExpression(node);
            case 'ExpressionStatement':
                return this.buildExpressionStatement(node);
            case 'ReturnStatement':
                return this.buildReturnStatement(node);
            case 'Identifier':
                return this.buildIdentifier(node);
            case 'MemberExpression':
                return this.buildMemberExpression(node);
            default:
                return this.buildDefault(node);
        }
    }

    protected buildFunctionDeclaration(node: BaseNode, siblings: HTMLElement[]): HTMLElement {
        let n = node as FunctionDeclaration;
        
        let declStartItems: (string | HTMLElement)[];
        if (n.id) {
            let funcId = HtmlHelper.span('func-id', n.id.name);
            declStartItems = ['function ', funcId, ' ( '];
        } else {
            declStartItems = ['function ( '];// + func.params.map(x => x.name).join(', ') + ' ) {';
        }

        let paramCount = n.params.length;
        n.params.forEach((param, i) => {
            let varName = EsprimaHelper.patternToString(param);
            let funcParam = this.buildNode(param);//HtmlHelper.span('func-param', varName);
            declStartItems.push(funcParam);
            if (i < paramCount - 1) {
                declStartItems.push(', ');
            }
        });

        declStartItems.push(' ) {');

        let declStart = HtmlHelper.span('func-start', declStartItems);
        let funcBody = this.buildNode(n.body);
        let declEnd = HtmlHelper.span('func-end', '}');
        declEnd = this.encapsulateNodeInVerseContainer(declEnd);
        //let decl = HtmlHelper.span('func-declaration', [declStart, funcBody, declEnd]);
        let decl = HtmlHelper.span('func-declaration', declStart);
        siblings.push(funcBody);
        siblings.push(declEnd);
        return decl;
    }

    protected buildBlockStatement(node: BaseNode): HTMLElement {
        let n = node as BlockStatement;
        let bodyStatements = n.body.map(statement => this.buildNode(statement))
        return HtmlHelper.span('block', bodyStatements);
    }

    protected buildIfStatement(node: BaseNode, siblings: HTMLElement[]): HTMLElement {
        let n = node as IfStatement;
        let content: HTMLElement[] = []
        let test = this.buildNode(n.test);
        let ifStartText = ['if ( ', test, ' ) {'];
        let ifStart = HtmlHelper.span('statement if-statement-start', ifStartText);
        content.push(ifStart);

        let thenBlock = this.buildNode(n.consequent);
        let ifThen = HtmlHelper.span('statement if-block-then', thenBlock);
        content.push(ifThen);
        siblings.push(thenBlock);

        if (n.alternate) {
            let ifElseDecl = HtmlHelper.span('statement if-statement-else', '} else {');
            ifElseDecl = this.encapsulateNodeInVerseContainer(ifElseDecl);
            content.push(ifElseDecl);
            siblings.push(ifElseDecl);

            let elseBlock = this.buildNode(n.alternate);
            let ifElse = HtmlHelper.span('statement if-block-else', elseBlock);
            content.push(ifElse);
            siblings.push(ifElse);
        } 
        let ifEnd = HtmlHelper.span('statement if-statement-end', '}');
        ifEnd = this.encapsulateNodeInVerseContainer(ifEnd);
        content.push(ifEnd);
        siblings.push(ifEnd);

        //let container = HtmlHelper.span('statement if-statement', content);
        
        return ifStart;
    }

    protected buildVariableDeclaration(node: BaseNode): HTMLElement {
        let n = node as VariableDeclaration;
        let declarations = n.declarations.map(d => this.buildNode(d));
        let container = HtmlHelper.span('declaration variable-declaration');
        container.innerHTML = n.kind + ' ';
        declarations.forEach(d => container.appendChild(d));
        return container;
    }

    protected buildVariableDeclarator(node: BaseNode): HTMLElement {
        let n = node as VariableDeclarator;
        let leftPart = this.buildNode(n.id);
        let container;
        if (n.init) {
            let assignPart = HtmlHelper.span('operator assign-operator', '=');
            let right = this.buildNode(n.init);
            let rightPart = HtmlHelper.span('variable-value', right);
            container = HtmlHelper.span('expression variable-declarator', [leftPart, assignPart, rightPart]);
        } else {
            container = HtmlHelper.span('expression variable-declarator', leftPart);
        }
        
        return container;
    }

    protected buildAssignmentExpression(node: BaseNode): HTMLElement {
        let n = node as AssignmentExpression;
        let left = this.buildNode(n.left);
        let leftPart = HtmlHelper.span('variable-id', left);
        let assignPart = HtmlHelper.span('operator assign-operator', '=');
        let right = this.buildNode(n.right);
        let rightPart = HtmlHelper.span('variable-value', right);
        let container = HtmlHelper.span('expression assignment-expression', [leftPart, assignPart, rightPart]);
        return container;
    }

    protected buildBinaryExpression(node: BaseNode): HTMLElement {
        let n = node as BinaryExpression;
        let left = this.buildNode(n.left);
        let leftPart = HtmlHelper.span('expression', left);
        let operatorPart = HtmlHelper.span('operator expression-operator', n.operator);
        let right = this.buildNode(n.right);
        let rightPart = HtmlHelper.span('expression', right);
        let container = HtmlHelper.span('expression binary-expression', [leftPart, operatorPart, rightPart]);
        return container;
    }

    protected buildExpressionStatement(node: BaseNode): HTMLElement {
        let n = node as ExpressionStatement;
        let code = this.buildNode(n.expression);
        let container = HtmlHelper.span('statement expression-statement', code);
        return container;
    }

    protected buildReturnStatement(node: BaseNode): HTMLElement {
        let n = node as ReturnStatement;
        let arg = this.buildNode(n.argument);
        let container = HtmlHelper.span('statement return-statement', ['return ', arg]);
        return container;
    }

    protected buildIdentifier(node: BaseNode): HTMLElement {
        let n = node as Identifier;
        let container = HtmlHelper.span('identifier', EsprimaHelper.patternToString(n));
        return container;
    }

    protected buildMemberExpression(node: BaseNode): HTMLElement {
        let n = node as MemberExpression;
        let object = this.buildNode(n.object);
        let property = this.buildNode(n.property);
        let container = HtmlHelper.span('expression member-expression', [object, '.', property]);
        return container;
    }

    protected buildDefault(node: BaseNode): HTMLElement {
        //console.log('default:', node);
        let code = escodeGenerate(node);
        let container = HtmlHelper.span('default-' + node.type, code);
        return container;
    }
}