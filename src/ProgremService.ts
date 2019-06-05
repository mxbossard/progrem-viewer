import * as Escodegen from 'escodegen';
import { CodeService } from "./CodeService";
import { SchedulingService, ProgremScheduler } from './SchedulingService';
import { BasicHtmlEsprimaProgremInspector } from './ProgremInspector';
import { BasicCanvasProgremGrid } from './ProgremGrid';
import { ScreenConfig } from './ScreenService';

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
            let progremCode = CodeService.progremCodeFactory.build(code);
            console.log('progrem AST:', progremCode.colorerProgremFunction);

            // Load initProgrem Function code
            let initProgremFunctionCode = Escodegen.generate(progremCode.initialiserProgremFunction());
            (window as any).eval(initProgremFunctionCode);

            scheduler = SchedulingService.buildProgremScheduler(progremConfig, progremCode);

            let progremInspector = new BasicHtmlEsprimaProgremInspector(progremCode, scheduler);

            let codeElement = document.querySelector('.code');
            console.log('codeElement', codeElement);
            progremInspector.attach(codeElement);
            
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