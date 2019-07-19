import { HtmlVerseFactory, StyleDecorator, VerseInstruction } from "./Types";
import { BaseNode } from "estree";

class EstreeProgremInspectorHtmlFactory implements HtmlVerseFactory<BaseNode> {

    constructor(private decorator: StyleDecorator<BaseNode>) {}

    build(verse: VerseInstruction<BaseNode>): HTMLElement {
        throw new Error("Method not implemented.");
    }

    protected buildNode(node: BaseNode): HTMLElement {
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

    }

    protected buildBlockStatement(node: BaseNode): HTMLElement {

    }

    protected buildIfStatement(node: BaseNode): HTMLElement {

    }

    protected buildVariableDeclaration(node: BaseNode): HTMLElement {

    }

    protected buildVariableDeclarator(node: BaseNode): HTMLElement {

    }

    protected buildAssignmentExpression(node: BaseNode): HTMLElement {

    }

    protected buildBinaryExpression(node: BaseNode): HTMLElement {

    }

    protected buildExpressionStatement(node: BaseNode): HTMLElement {

    }

    protected buildReturnStatement(node: BaseNode): HTMLElement {

    }

    protected buildDefault(node: BaseNode): HTMLElement {

    }
}