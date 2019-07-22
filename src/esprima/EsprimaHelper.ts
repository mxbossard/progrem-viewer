import { Pattern, Identifier, BaseNode, VariableDeclaration, AssignmentExpression, FunctionDeclaration, Node } from "estree";

export type NodeWithParent = Node & { parent?: Node };

export abstract class EsprimaHelper {

    public static patternToString(pattern: Pattern): string {
        var node;
        switch (pattern.type) {
            case 'Identifier':
                node = pattern as Identifier;
                return node.name;
                
        }

        throw new Error('Unable to convert pattern of type ' + pattern.type);
    }

    public static reduceNodeToVarDeclaration(node: BaseNode): VariableDeclaration | AssignmentExpression | FunctionDeclaration | void {
        
        if (node.type === 'VariableDeclaration') {
            let decl = node as VariableDeclaration;
            return decl;
        } else if (node.type === 'AssignmentExpression') {
            let expr = node as AssignmentExpression;
            return expr;
        } else if (node.type === 'FunctionDeclaration') {
            let func = node as FunctionDeclaration;
            return func;
        } else {
            for (let p in node) {
                if (p === 'left' || p === 'right' || p === 'argument' || p === 'callee' || p === 'body' || p === 'expression') {
                    //@ts-ignore
                    let child: BaseNode = node[p] as BaseNode;
                    let result = EsprimaHelper.reduceNodeToVarDeclaration(child);
                    if (result) return result;
                }
            }
        }
    }

    public static isChildNodeOf(node: NodeWithParent, parent: BaseNode): boolean {
        if (node.parent === parent) {
            return true;
        } else if (!node.parent) {
            return false;
        }

        return EsprimaHelper.isChildNodeOf(node.parent as NodeWithParent, parent);
    }

    public static isNotChildNodeOf(node: NodeWithParent, parents: BaseNode[]): boolean {
        if (parents.find(p => p === node.parent)) {
            return false;
        } else if (!node.parent) {
            return true;
        }

        return EsprimaHelper.isNotChildNodeOf(node.parent as NodeWithParent, parents);
    }

}