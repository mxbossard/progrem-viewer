import { ProgremComponent, GridChangeListener, CodeExecutionListener, ProgremState, ColorProvider, ProgremScheduler, HtmlCoupletFactory } from "../../core/Types";
import { EsprimaHelper } from "../../esprima/EsprimaHelper";
import { VariableDeclaration, AssignmentExpression, FunctionDeclaration } from "estree";
import { ColorService } from "../../core/ColorService";
import { generate as escodeGenerate } from 'escodegen';
import { EsprimaVariableScopeHtmlFactory } from "./EsprimaVariableScopeHtmlFactory";

export class VariableScopeComponent implements ProgremComponent, CodeExecutionListener, GridChangeListener {

    private htmlContainer: HTMLElement|null = null;
    private colorProvider: ColorProvider = ColorService.colorProvideractory.build();
    
    constructor(
        private scheduler: ProgremScheduler,
        private htmlFactory: EsprimaVariableScopeHtmlFactory
    ) {
        scheduler.subscribeCodeExecution(this);
        scheduler.subscribeGridChange(this);
    }

    renderHtml(): HTMLElement {
        let htmlComponent = this.htmlFactory.buildCouplet();
        this.htmlContainer = htmlComponent;
        return htmlComponent;
    }

    fireCodeExecution(oldState: ProgremState, newState: ProgremState): void {
        if (!newState.verse) {
            return;
        }

        let htmlVerse = this.htmlFactory.getHtmlVerse(newState.verse);
        // if (this.htmlContainer && htmlVerse) {
        //     this.htmlContainer.appendChild(htmlVerse);
        // }
    }

    fireGridChange(state: ProgremState): void {
        this.htmlFactory.clearView();
    }

}