import { generate as escodeGenerate } from 'escodegen';
import { SchedulingService } from './SchedulingService';
import { ProgremInspectorComponent } from '../components/progremInspector/ProgremInspectorComponent';
import { ScreenConfig } from './ScreenService';
import { BaseNode } from 'estree';
import { StyleDecoratorAggregation, ProgremScheduler, ProgremCode } from './Types';
import { PadVerseDecorator, ColorVerseVariableDecorator } from '../components/progremInspector/EsprimaProgremInspectorStyleDecorators';
import { HtmlHelper } from './HtmlHelper';
import { EsprimaProgremInspectorHtmlFactory } from '../components/progremInspector/EsprimaProgremInspectorHtmlFactory';
import { CodeService } from './CodeService';
import { ProgremGridComponent } from '../components/progremGrid/ProgremGridComponent';
import { VariableScopeComponent } from '../components/variableScope/VariableScopeComponent';
import { EsprimaVariableScopeHtmlFactory } from '../components/variableScope/EsprimaVariableScopeHtmlFactory';
import { ColorVariableScopeDecorator } from '../components/variableScope/EsprimaVariableScopeStyleDecorators';
import { ProgremEditorComponent } from '../components/progremEditor/ProgremEditorComponent';

export class ProgremConfig {
    constructor(
        public readonly colonnes: number,
        public readonly lignes: number,
        public readonly frames: number,
    ) { }
}

export abstract class ProgremHelper {

}

export namespace ProgremService {

    var previousRepaintTime = 0;
    var scheduler: ProgremScheduler;

    export function buildProgremGridComponent(screenConfig: ScreenConfig, progremConfig: ProgremConfig, container: HTMLElement): void {
        container.innerHTML = '';
        let progremGridComponent = new ProgremGridComponent(screenConfig, progremConfig, scheduler, document);
        let progremGridHtml = progremGridComponent.renderHtml();
        container.appendChild(progremGridHtml);

    }

    export function buildProgremInspectorComponent(progremCode: ProgremCode<any>, container: HTMLElement): void {
        container.innerHTML = '';
        let progremCouplet = progremCode.colorerProgremFunction();
        let progremInspectorDecorators = new StyleDecoratorAggregation<BaseNode>([
            new PadVerseDecorator(),
            new ColorVerseVariableDecorator(),
            //new HighlightExecutingVerseDecorator(scheduler),
        ]);
        let progremInspectorFactory = new EsprimaProgremInspectorHtmlFactory(progremCouplet, progremInspectorDecorators);
        let progremInspectorView = new ProgremInspectorComponent(scheduler, progremInspectorFactory);

        //console.log('codeElement', codeElement);
        let progremInspectorHtml = progremInspectorView.renderHtml();
        container.appendChild(progremInspectorHtml);

        let decoratorStyle = progremInspectorDecorators.buildStyleSheet();
        //console.log('decoratorStyle:', decoratorStyle)
        HtmlHelper.defineCssRules('progrem-inspector-component', decoratorStyle);
    }

    export function buildVariableScopeComponent(progremCode: ProgremCode<any>, container: HTMLElement): void {
        container.innerHTML = '';
        let progremCouplet = progremCode.colorerProgremFunction();
        let variableScopeDecorators = new StyleDecoratorAggregation<string>([
            new ColorVariableScopeDecorator()
        ])
        let htmlFactory = new EsprimaVariableScopeHtmlFactory(progremCouplet, variableScopeDecorators, scheduler);
        let variableScopeComponent = new VariableScopeComponent(scheduler, htmlFactory);
        let variableScopeHtml = variableScopeComponent.renderHtml();
        container.appendChild(variableScopeHtml);

        let decoratorStyle = variableScopeDecorators.buildStyleSheet();
        //console.log('decoratorStyle:', decoratorStyle)
        HtmlHelper.defineCssRules('variable-scope-component', decoratorStyle);
    }

    export function buildProgremEditorComponent(progremCode: ProgremCode<any>, screenConfig: ScreenConfig, progremConfig: ProgremConfig): void {
        let progremEditorComponent = new ProgremEditorComponent();
        progremEditorComponent.attach(document);
        progremEditorComponent.loadProgrem(progremCode);
        progremEditorComponent.bindRefresh(code => {
            console.log('new progrem code:', code);
            let progremCode = CodeService.progremFactory.buildProgrem(code);

            let scriptElement = document.querySelector('.progrem-script-tag') as HTMLScriptElement;
            scriptElement.remove();
            scriptElement = document.createElement('script');
            scriptElement.type = 'text/javascript';
            scriptElement.classList.add('progrem-script-tag')
            scriptElement.text = code;
            let bodyElement = document.querySelector('body');
            if (bodyElement) {
                bodyElement.appendChild(scriptElement);
            }
            buildProgremViewer(progremCode, screenConfig, progremConfig)
        });
    }

    export function buildProgremViewer(progremCode: ProgremCode<any>, screenConfig: ScreenConfig, progremConfig: ProgremConfig) {
        // Load initProgrem Function code
        let initProgremFunctionCode = escodeGenerate(progremCode.initialiserProgremFunction().functionRootNode);
        (window as any).eval(initProgremFunctionCode);

        scheduler = SchedulingService.buildProgremScheduler(progremConfig, progremCode);

        let progremGridContainer = document.querySelector<HTMLElement>('.progrem-grid-component');
        if (progremGridContainer) {
            buildProgremGridComponent(screenConfig, progremConfig, progremGridContainer);
        }

        let progremInspectorContainer = document.querySelector<HTMLElement>('.progrem-inspector-component');
        if (progremInspectorContainer) {
            buildProgremInspectorComponent(progremCode, progremInspectorContainer);
        }

        let variableScopeContainer = document.querySelector<HTMLElement>('.variable-scope-component');
        if (variableScopeContainer) {
            buildVariableScopeComponent(progremCode, variableScopeContainer);
        }
    }

    export function buildProgrem(url: string, screenConfig: ScreenConfig, progremConfig: ProgremConfig) {
        let progremScript = document.createElement('script');
        progremScript.classList.add('progrem-script-tag')
        progremScript.src = url;
        let bodyElement = document.querySelector('body');
        if (bodyElement) {
            bodyElement.appendChild(progremScript);
        }

        CodeService.loadProgrem(url).then(code => {
            let progremCode = CodeService.progremFactory.buildProgrem(code);

            buildProgremViewer(progremCode, screenConfig, progremConfig)

            buildProgremEditorComponent(progremCode, screenConfig, progremConfig);

            timer(0);
        });
    }

    function timer(timestamp: number) {
        window.requestAnimationFrame(timer);

        if (timestamp - previousRepaintTime < 1000) {
            return;
        }

        previousRepaintTime = timestamp;

        if (scheduler) {
            scheduler.next();
        }
    }

}