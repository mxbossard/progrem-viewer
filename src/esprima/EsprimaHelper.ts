import { Pattern, Identifier, BaseNode, VariableDeclaration, AssignmentExpression, FunctionDeclaration, Node } from "estree";
import { ProgremState } from "../core/Types";

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

    public static reduceNodeToVarDeclaration(node: BaseNode): VariableDeclaration | AssignmentExpression | FunctionDeclaration | undefined {
        
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

    /**
     * Return variable names of declaration or assignment contained in node.
     * 
     * @param node 
     */
    public static getVariableNames(node: VariableDeclaration | AssignmentExpression | FunctionDeclaration): string[] {
        if (node.type === 'VariableDeclaration') {
            let decl = node as VariableDeclaration;
            return decl.declarations.map(d => {
                let varName = EsprimaHelper.patternToString(d.id);
                return varName;
            });
        } else if (node.type === 'AssignmentExpression') {
            let decl = node as AssignmentExpression;
            let varName = EsprimaHelper.patternToString(decl.left);
            return [varName];
        } else if (node.type === 'FunctionDeclaration') {
            let func = node as FunctionDeclaration;
            return func.params.map(p => {
                let varName = EsprimaHelper.patternToString(p);
                return varName;
            });
        }
        return [];
    }

    /**
     * Return variable values of declaration or assignment contained in node.
     * Same as getVariableNames but evaluate variables to discover their values.
     * 
     * @param node 
     */
    public static getVariableValues(state: ProgremState, node: BaseNode): Map<string, any> {
        let valuesMap = new Map<string, any>();
        let varNodes = this.reduceNodeToVarDeclaration(node);
        if (!varNodes) {
            return valuesMap;
        }
        this.getVariableNames(varNodes).map(varName => valuesMap.set(varName, state.eval(varName)));
        return valuesMap;
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