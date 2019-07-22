import * as ESTree from "estree";

export type NodeWithParent = ESTree.Node & { parent?: ESTree.Node };

export abstract class EsprimaHelper {

    public static isChildNodeOf(node: NodeWithParent, parent: ESTree.BaseNode): boolean {
        if (node.parent === parent) {
            return true;
        } else if (!node.parent) {
            return false;
        }

        return EsprimaHelper.isChildNodeOf(node.parent as NodeWithParent, parent);
    }

    public static isNotChildNodeOf(node: NodeWithParent, parents: ESTree.BaseNode[]): boolean {
        if (parents.find(p => p === node.parent)) {
            return false;
        } else if (!node.parent) {
            return true;
        }

        return EsprimaHelper.isNotChildNodeOf(node.parent as NodeWithParent, parents);
    }

}