import { ProgremComponent, ProgremScheduler, HtmlCoupletFactory, ProgremState, CodeExecutionListener, GridChangeListener } from '../../core/Types';

export class ProgremInspectorComponent implements ProgremComponent, CodeExecutionListener, GridChangeListener {

    private executingElements: HTMLElement[] = [];
    private executedElements: HTMLElement[] = [];

    public static readonly EXECUTING_CLASS = 'verse-executing';
    public static readonly EXECUTED_CLASS = 'verse-executed';

    constructor(
        private scheduler: ProgremScheduler,
        private htmlFactory: HtmlCoupletFactory<any>
    ) {
        scheduler.subscribeCodeExecution(this);
        scheduler.subscribeGridChange(this);
    }

    renderHtml(): HTMLElement {
        let htmlComponent = this.htmlFactory.buildCouplet();
        return htmlComponent;
    }
    
    fireCodeExecution(state: ProgremState): void {
        if (!state.verse) {
            return;
        }
            
        let htmlVerse = this.htmlFactory.getHtmlVerse(state.verse);
        if(htmlVerse) {
            htmlVerse.classList.add(ProgremInspectorComponent.EXECUTING_CLASS);
        }
        while (this.executingElements.length > 0) {
            let elt = this.executingElements.pop();
            if (elt) {
                this.executedElements.push(elt);
                elt.classList.remove(ProgremInspectorComponent.EXECUTING_CLASS);
                elt.classList.add(ProgremInspectorComponent.EXECUTED_CLASS);
            }
        }
        if (!htmlVerse) {
            return;
        }

        this.executingElements.push(htmlVerse);
        htmlVerse.classList.add(ProgremInspectorComponent.EXECUTING_CLASS);
    }

    fireGridChange(state: ProgremState): void {
        while (this.executingElements.length > 0) {
            let elt = this.executingElements.pop();
            if (elt) {
                elt.classList.remove(ProgremInspectorComponent.EXECUTED_CLASS);
                elt.classList.remove(ProgremInspectorComponent.EXECUTING_CLASS);
            }
        }

        while (this.executedElements.length > 0) {
            let elt = this.executedElements.pop();
            if (elt) {
                elt.classList.remove(ProgremInspectorComponent.EXECUTED_CLASS);
                elt.classList.remove(ProgremInspectorComponent.EXECUTING_CLASS);
            }
        }
    }

}
