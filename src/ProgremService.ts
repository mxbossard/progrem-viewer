import { generate as escodeGenerate } from 'escodegen';
import { CodeService } from "./CodeService";
import { SchedulingService } from './SchedulingService';
import { ProgremInspectorView } from './ProgremInspector';
import { BasicCanvasProgremGrid } from './ProgremGrid';
import { ScreenConfig } from './ScreenService';
import { BaseNode } from 'estree';
import { StyleDecoratorAggregation, ProgremScheduler } from './Types';
import { PadVerseDecorator, ColorVerseVariableDecorator, HighlightExecutingVerseDecorator } from './EstreeStyleDecorator';
import { HtmlHelper } from './HtmlHelper';
import { EsprimaProgremInspectorHtmlFactory } from './EstreeProgremInspectorHtmlFactory';

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
            console.log('progrem AST:', progremCode.colorerProgremFunction);

            // Load initProgrem Function code
            let initProgremFunctionCode = escodeGenerate(progremCode.initialiserProgremFunction().functionRootNode);
            (window as any).eval(initProgremFunctionCode);

            scheduler = SchedulingService.buildProgremScheduler(progremConfig, progremCode);

            //let progremInspector = new BasicHtmlEsprimaProgremInspector(progremCode, scheduler, document);
            
            let progremInspectorDecorators = new StyleDecoratorAggregation<BaseNode>([
                new PadVerseDecorator(),
                new ColorVerseVariableDecorator(),
                //new HighlightExecutingVerseDecorator(scheduler),
            ]);
            let progremInspectorFactory = new EsprimaProgremInspectorHtmlFactory(progremCode.colorerProgremFunction(), progremInspectorDecorators);
            let progremInspectorView = new ProgremInspectorView(scheduler, progremInspectorFactory);

            let codeElement = document.querySelector<HTMLElement>('.code');
            if (codeElement) {
                //console.log('codeElement', codeElement);
                let progremInspectorComponent = progremInspectorView.buildView(scheduler);
                codeElement.appendChild(progremInspectorComponent);

                let decoratorStyle = progremInspectorDecorators.buildStyleSheet();
                //console.log('decoratorStyle:', decoratorStyle)
                HtmlHelper.defineCssRules('progrem-inspector', decoratorStyle);
            }
            
            let gridElement = document.querySelector('.progrem');
            console.log('gridElement', gridElement);
            let progremGrid = new BasicCanvasProgremGrid(screenConfig, progremConfig);
            progremGrid.attach(gridElement);
            progremGrid.clear();
            scheduler.subscribeGridChange(progremGrid);

            timer(0);
        });
    }

    function timer(timestamp: number) {
        window.requestAnimationFrame(timer);

        if (timestamp - previousRepaintTime < 1500) {
            return;
        }

        previousRepaintTime = timestamp;

        if (scheduler) {
            scheduler.next();
        }
    }

}