import { generate as escodeGenerate } from 'escodegen';
import { SchedulingService } from './SchedulingService';
import { ProgremInspectorComponent } from '../components/progremInspector/ProgremInspectorComponent';
import { ScreenConfig } from './ScreenService';
import { BaseNode } from 'estree';
import { StyleDecoratorAggregation, ProgremScheduler } from './Types';
import { PadVerseDecorator, ColorVerseVariableDecorator } from '../components/progremInspector/EsprimaProgremInspectorStyleDecorators';
import { HtmlHelper } from './HtmlHelper';
import { EsprimaProgremInspectorHtmlFactory } from '../components/progremInspector/EsprimaProgremInspectorHtmlFactory';
import { CodeService } from './CodeService';
import { ProgremGridComponent } from '../components/progremGrid/ProgremGridComponent';
import { VariableScopeComponent } from '../components/variableScope/VariableScopeComponent';
import { EsprimaVariableScopeHtmlFactory } from '../components/variableScope/EsprimaVariableScopeHtmlFactory';
import { ColorVariableScopeDecorator } from '../components/variableScope/EsprimaVariableScopeStyleDecorators';

export class ProgremConfig {
    constructor(
        public readonly colonnes: number,
        public readonly lignes: number,
        public readonly frames: number,
    ) {}
}

export namespace ProgremService {

    var previousRepaintTime = 0;
    var scheduler: ProgremScheduler;

    export function buildProgrem(url: string, screenConfig: ScreenConfig, progremConfig: ProgremConfig) {
        let progremScript = document.createElement('script');
        progremScript.src = url;
        let bodyElement = document.querySelector('body');
        if (bodyElement) {
            bodyElement.appendChild(progremScript);
        }

        CodeService.loadProgrem(url).then(code => {
            let progremCode = CodeService.progremFactory.buildProgrem(code);
            let progremCouplet = progremCode.colorerProgremFunction();

            console.log('progrem AST:', progremCode.colorerProgremFunction);

            // Load initProgrem Function code
            let initProgremFunctionCode = escodeGenerate(progremCode.initialiserProgremFunction().functionRootNode);
            (window as any).eval(initProgremFunctionCode);

            scheduler = SchedulingService.buildProgremScheduler(progremConfig, progremCode);

            //let progremInspector = new BasicHtmlEsprimaProgremInspector(progremCode, scheduler, document);
            
            let progremInspectorContainer = document.querySelector<HTMLElement>('.progrem-inspector-component');
            if (progremInspectorContainer) {
                let progremInspectorDecorators = new StyleDecoratorAggregation<BaseNode>([
                    new PadVerseDecorator(),
                    new ColorVerseVariableDecorator(),
                    //new HighlightExecutingVerseDecorator(scheduler),
                ]);
                let progremInspectorFactory = new EsprimaProgremInspectorHtmlFactory(progremCouplet, progremInspectorDecorators);
                let progremInspectorView = new ProgremInspectorComponent(scheduler, progremInspectorFactory);
    
                //console.log('codeElement', codeElement);
                let progremInspectorHtml = progremInspectorView.renderHtml();
                progremInspectorContainer.appendChild(progremInspectorHtml);

                let decoratorStyle = progremInspectorDecorators.buildStyleSheet();
                //console.log('decoratorStyle:', decoratorStyle)
                HtmlHelper.defineCssRules('progrem-inspector-component', decoratorStyle);
            }
            
           let progremGridContainer = document.querySelector<HTMLElement>('.progrem-grid-component');
           if (progremGridContainer) {
                let progremGridComponent = new ProgremGridComponent(screenConfig, progremConfig, scheduler, document);
                let progremGridHtml = progremGridComponent.renderHtml();
                progremGridContainer.appendChild(progremGridHtml);
           }

           let variableScopeContainer = document.querySelector<HTMLElement>('.variable-scope-component');
           if (variableScopeContainer) {
                let variableScopeDecorators = new StyleDecoratorAggregation<string>([
                    new ColorVariableScopeDecorator()
                ])
               let htmlFactory = new EsprimaVariableScopeHtmlFactory(progremCouplet, variableScopeDecorators, scheduler);
                let variableScopeComponent = new VariableScopeComponent(scheduler, htmlFactory);
                let variableScopeHtml = variableScopeComponent.renderHtml();
                variableScopeContainer.appendChild(variableScopeHtml);

                let decoratorStyle = variableScopeDecorators.buildStyleSheet();
                //console.log('decoratorStyle:', decoratorStyle)
                HtmlHelper.defineCssRules('variable-scope-component', decoratorStyle);
           }

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