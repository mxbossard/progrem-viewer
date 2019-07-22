import { ProgremComponent, ProgremScheduler } from "../../core/Types";
import { GridChangeListener, ProgremState } from "../../core/SchedulingService";
import { ScreenConfig } from "../../core/ScreenService";
import { ProgremConfig } from "../../core/ProgremService";
import { HtmlHelper } from "../../core/HtmlHelper";

export class ProgremGridComponent implements ProgremComponent, GridChangeListener {
    
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    
    constructor(
        private screenConfig: ScreenConfig, 
        private progremConfig: ProgremConfig,
        private scheduler: ProgremScheduler,
        private document: Document
        ) {
        let enWarning = HtmlHelper.p('warning', "Your browser doesn't support canvas.");
        let frWarning = HtmlHelper.p('warning', "Votre navigateur ne supporte pas les canvas.");
        this.canvas = HtmlHelper.canvas('', [enWarning, frWarning]);
        this.canvas.width = this.progremConfig.colonnes * this.screenConfig.boxSize;
        this.canvas.height = this.progremConfig.colonnes * this.screenConfig.boxSize;

        let ctx = this.canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Unable to obtain 2D Canvas context !');
        }
        this.ctx = ctx;
        this.clear();

        scheduler.subscribeGridChange(this);
    }

    renderHtml(): HTMLElement {
        let container = HtmlHelper.span('progrem-grid', this.canvas);
        return container;
    }
    
    fireGridChange (state: ProgremState): void {
        console.log('grid change: ', state);

        let boxSize = this.screenConfig.boxSize;
        let c = state.colonne;
        let l = state.ligne;

        // @ts-ignore
        let couleur = colorerProgrem(c, l, state.contexte);
        if (couleur) {
            this.ctx.fillStyle = couleur;
            this.ctx.fillRect(c * boxSize, l * boxSize, boxSize, boxSize);
        }
    }

    protected clear(): void {
        let width = this.screenConfig.boxSize * this.progremConfig.colonnes;
        let height = this.screenConfig.boxSize * this.progremConfig.lignes;
        this.ctx.clearRect(0, 0, width, height);
    }

}