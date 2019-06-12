import { Pattern, Identifier, BaseNode, VariableDeclaration, AssignmentExpression, FunctionDeclaration, VariableDeclarator } from "estree";

export namespace AstHelper {

    export function patternToString(pattern: Pattern): string {
        var node;
        switch (pattern.type) {
            case 'Identifier':
                node = pattern as Identifier;
                return node.name;
                
        }

        throw new Error('Unable to convert pattern of type ' + pattern.type);
    }

    export function reduceNodeToVarDeclaration(node: BaseNode): VariableDeclaration | AssignmentExpression | FunctionDeclaration | void {
        
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
                    let result = reduceNodeToVarDeclaration(child);
                    if (result) return result;
                }
            }
        }
    }
}