import { ProgremComponent, ProgremScheduler, StartIteratingCodeListener, GridChangeListener, ProgremState, ProgremConfig, FrameChangeListener } from "../../core/Types";
import { ScreenConfig } from "../../core/ScreenService";
import { HtmlHelper } from "../../core/HtmlHelper";
import { Observable, Subscription } from 'rxjs/Rx';
import { animationFrameScheduler } from "rxjs";

export class ProgremGridComponent implements ProgremComponent, StartIteratingCodeListener, GridChangeListener, FrameChangeListener {
    
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private subscription: Subscription | null = null;
    private blinkInterval = 200;
    
    constructor(
        private screenConfig: ScreenConfig, 
        private progremConfig: ProgremConfig,
        private scheduler: ProgremScheduler,
        private document: Document
        ) {
        let enWarning = HtmlHelper.p('warning', "Your browser doesn't support canvas.");
        let frWarning = HtmlHelper.p('warning', "Votre navigateur ne supporte pas les canvas.");
        this.canvas = HtmlHelper.canvas('', [enWarning, frWarning]);
        this.canvas.width = this.progremConfig.nombreColonnes * this.screenConfig.boxSize;
        this.canvas.height = this.progremConfig.nombreLignes * this.screenConfig.boxSize;

        let ctx = this.canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Unable to obtain 2D Canvas context !');
        }
        this.ctx = ctx;
        this.clear();

        scheduler.subscribeStartIteratingCode(this);
        scheduler.subscribeGridChange(this);
        scheduler.subscribeFrameChange(this);
    }

    renderHtml(): HTMLElement {
        let container = HtmlHelper.span('progrem-grid', this.canvas);

        return container;
    }

    protected colorCurrentPixel(state: ProgremState, color: string): void {
        let boxSize = this.screenConfig.boxSize;
        let c = state.colonne;
        let l = state.ligne;

        this.ctx.fillStyle = color;
        this.ctx.fillRect(c * boxSize, l * boxSize, boxSize, boxSize);
    }

    protected blinkCurrentPixel(state: ProgremState, incremnt: number) {
        let color = 'black';
        if (incremnt % 2 === 0) {
            color = 'antiquewhite';
        }
        this.colorCurrentPixel(state, color);
        
    }
    
    fireStartIteratingCode (state: ProgremState): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = Observable.interval(this.blinkInterval, animationFrameScheduler).subscribe(t => {
            this.blinkCurrentPixel(state, t);
        });
    }

    fireGridChange (state: ProgremState): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        let boxSize = this.screenConfig.boxSize;
        let c = state.colonne;
        let l = state.ligne;
        let f = state.frame;

        // @ts-ignore
        let couleur = colorerProgrem(c, l, f, state.contexte);
        //console.log(`(${c}, ${l}, ${f}, ${state.contexte} => ${couleur}`);
        if (couleur) {
            this.ctx.fillStyle = couleur;
            this.ctx.fillRect(c * boxSize, l * boxSize, boxSize, boxSize);
        }
    }

    fireFrameChange (state: ProgremState): void {
        //this.clear();
    }

    protected clear(): void {
        let width = this.screenConfig.boxSize * this.progremConfig.nombreColonnes;
        let height = this.screenConfig.boxSize * this.progremConfig.nombreLignes;
        this.ctx.clearRect(0, 0, width, height);
        this.ctx.fillStyle = 'antiquewhite';
        this.ctx.fillRect(0, 0, width, height);
    }

}