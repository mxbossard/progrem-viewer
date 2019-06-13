import { BaseNode } from "estree";

export interface HtmlTree {
    paintInto(element: HTMLElement): void
    styleClasses(): string[]
    addStyleClasses(node: BaseNode, classes: string[]): void
    resetStyle(): void
}