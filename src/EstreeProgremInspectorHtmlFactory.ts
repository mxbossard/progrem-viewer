import { HtmlVerseFactory, StyleDecorator, VerseInstruction } from "./Types";
import { BaseNode, FunctionDeclaration, BlockStatement, IfStatement, VariableDeclarator, VariableDeclaration, AssignmentExpression, BinaryExpression, ExpressionStatement, ReturnStatement } from "estree";
import { HtmlHelper } from "./HtmlHelper";
import { AstHelper } from "./AstHelper";
import { generate as escodeGenerate } from 'escodegen';

export class EstreeProgremInspectorHtmlFactory implements HtmlVerseFactory<BaseNode> {

    constructor(private decorator: StyleDecorator<BaseNode>) {}

    build(verse: VerseInstruction<BaseNode>): HTMLElement {
        return this.buildNode(verse.astRootNode);
    }

    /**
     * Build Node applying decorators.
     * 
     * @param node 
     */
    protected buildNode(node: BaseNode): HTMLElement {
        let res = this.buildNodeInternal(node);
        this.decorator.decorate(node, res);
        return res;
    }

    /**
     * Build node.
     * @param node 
     */
    protected buildNodeInternal(node: BaseNode): HTMLElement {
        console.log('Building node', node, '...');
        switch (node.type) {
            case 'FunctionDeclaration':
                return this.buildFunctionDeclaration(node);
            case 'BlockStatement':
                return this.buildBlockStatement(node);
            case 'IfStatement':
                return this.buildIfStatement(node);
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
            default:
                return this.buildDefault(node);
        }
    }

    protected buildFunctionDeclaration(node: BaseNode): HTMLElement {
        let n = node as FunctionDeclaration;
        
        let declStartText: string;
        if (n.id) {
            let funcId = HtmlHelper.span('func-id', n.id.name);
            declStartText = 'function ' + funcId.textContent + ' ( ';
        } else {
            declStartText = 'function ( ';// + func.params.map(x => x.name).join(', ') + ' ) {';
        }

        let paramCount = n.params.length;
        n.params.forEach((param, i) => {
            let varName = AstHelper.patternToString(param);
            let funcParam = HtmlHelper.span('func-param', varName);
            declStartText += funcParam.textContent
            if (i < paramCount - 1) {
                declStartText += ', ';
            }
        });

        declStartText += ' ) {';

        let declStart = HtmlHelper.span('func-start', declStartText);
        let funcBody = this.buildNode(n.body);
        let declEnd = HtmlHelper.span('func-end', '}');
        let decl = HtmlHelper.span('func-declaration', [declStart, funcBody, declEnd]);

        return decl;
    }

    protected buildBlockStatement(node: BaseNode): HTMLElement {
        let n = node as BlockStatement;
        let bodyStatements = n.body.map(statement => this.buildNode(statement))
        return HtmlHelper.span('block', bodyStatements);
                    
    }

    protected buildIfStatement(node: BaseNode): HTMLElement {
        let n = node as IfStatement;
        let content: HTMLElement[] = []
        let test = this.buildNode(n.test);
        let ifStartText: string = 'if ( ' + test.textContent + ' ) {';
        let ifStart = HtmlHelper.span('statement if-statement-start', ifStartText);
        content.push(ifStart);

        let thenBlock = this.buildNode(n.consequent);
        let ifThen = HtmlHelper.span('statement if-block-then', thenBlock);
        content.push(ifThen);

        if (n.alternate) {
            content.push(ifStart);
            let ifElseDecl = HtmlHelper.span('statement if-statement-else', '} else {');
            content.push(ifElseDecl);

            let elseBlock = this.buildNode(n.alternate);
            let ifElse = HtmlHelper.span('statement if-block-else', elseBlock);
            content.push(ifElse);
            
        } 
        let ifEnd = HtmlHelper.span('statement if-statement-end', '}');
        content.push(ifEnd);


        let container = HtmlHelper.span('statement if-statement', content);
        return container;
    }

    protected buildVariableDeclaration(node: BaseNode): HTMLElement {
        let n = node as VariableDeclaration;
        let declarations = n.declarations.map(d => this.buildNode(d));
        let container = HtmlHelper.span('declaration variable-declaration', declarations);
        return container;
    }

    protected buildVariableDeclarator(node: BaseNode): HTMLElement {
        let n = node as VariableDeclarator;
        let left = AstHelper.patternToString(n.id);
        let leftPart = HtmlHelper.span('variable-id', left);
        let container;
        if (n.init) {
            let assignPart = HtmlHelper.span('assign-operator', ' = ');
            let right = this.buildNode(n.init);
            let rightPart = HtmlHelper.span('variable-value', right);
            container = HtmlHelper.span('expression variable-expression', [leftPart, assignPart, rightPart]);
        } else {
            container = HtmlHelper.span('expression variable-expression', leftPart);
        }
        
        return container;
    }

    protected buildAssignmentExpression(node: BaseNode): HTMLElement {
        let n = node as AssignmentExpression;
        let left = this.buildNode(n.left);
        let leftPart = HtmlHelper.span('variable-id', left);
        let assignPart = HtmlHelper.span('assign-operator', ' = ');
        let right = this.buildNode(n.right);
        let rightPart = HtmlHelper.span('variable-value', right);
        let container = HtmlHelper.span('expression variable-expression', [leftPart, assignPart, rightPart]);
        return container;
    }

    protected buildBinaryExpression(node: BaseNode): HTMLElement {
        let n = node as BinaryExpression;
        let left = this.buildNode(n.left);
        let leftPart = HtmlHelper.span('expression', left);
        let right = this.buildNode(n.left);
        let rightPart = HtmlHelper.span('expression', right);
        let container = HtmlHelper.span('expression binary-expression', [leftPart, rightPart]);
        return container;
    }

    protected buildExpressionStatement(node: BaseNode): HTMLElement {
        let n = node as ExpressionStatement;
        let code = escodeGenerate(n);
        let container = HtmlHelper.span('statement expression-statement', code);
        return container;
    }

    protected buildReturnStatement(node: BaseNode): HTMLElement {
        let n = node as ReturnStatement;
        let code = escodeGenerate(n);
        let container = HtmlHelper.span('statement return-statement', code);
        return container;
    }

    protected buildDefault(node: BaseNode): HTMLElement {
        console.log('default:', node);
        let code = escodeGenerate(node);
        let container = HtmlHelper.span('default-' + node.type, code);
        return container;
    }
}