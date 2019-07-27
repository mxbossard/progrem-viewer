import { ProgremComponent, ProgremScheduler, StartIteratingCodeListener, GridChangeListener, ProgremState, ProgremConfig, FrameChangeListener, PaintingListener } from "../../core/Types";
import { ScreenConfig } from "../../core/ScreenService";
import { HtmlHelper } from "../../core/HtmlHelper";
import { Observable, Subscription } from 'rxjs/Rx';
import { animationFrameScheduler } from "rxjs";

export class ProgremGridComponent implements ProgremComponent, StartIteratingCodeListener, GridChangeListener, FrameChangeListener, PaintingListener {
    
    private displayedCanvas: HTMLCanvasElement;
    private displayedCtx: CanvasRenderingContext2D;
    private hiddenCanvas: HTMLCanvasElement;
    private hiddenCtx: CanvasRenderingContext2D;
    private subscription: Subscription | null = null;
    private blinkInterval = 200;
    
    private cachingColors: boolean = true;
    private previousFrame: string[] = [];
    private currentFrame: string[] = [];

    constructor(
        private screenConfig: ScreenConfig, 
        private progremConfig: ProgremConfig,
        private scheduler: ProgremScheduler,
        private document: Document
        ) {
        let enWarning = HtmlHelper.p('warning', "Your browser doesn't support canvas.");
        let frWarning = HtmlHelper.p('warning', "Votre navigateur ne supporte pas les canvas.");
        this.displayedCanvas = HtmlHelper.canvas('', [enWarning, frWarning]);
        this.displayedCanvas.width = this.progremConfig.nombreColonnes * this.screenConfig.boxSize;
        this.displayedCanvas.height = this.progremConfig.nombreLignes * this.screenConfig.boxSize;
        let ctx = this.displayedCanvas.getContext('2d');

        this.hiddenCanvas = document.createElement('canvas');
        this.hiddenCanvas.width = this.progremConfig.nombreColonnes * this.screenConfig.boxSize;
        this.hiddenCanvas.height = this.progremConfig.nombreLignes * this.screenConfig.boxSize;
        let hiddenCtx = this.hiddenCanvas.getContext('2d');
        
        if (!ctx || !hiddenCtx) {
            throw new Error('Unable to obtain 2D Canvas context !');
        }
        this.displayedCtx = ctx;
        this.hiddenCtx = hiddenCtx;

        this.clear();
        
        scheduler.subscribeStartIteratingCode(this);
        scheduler.subscribeGridChange(this);
        scheduler.subscribeFrameChange(this);
        scheduler.subscribePainting(this);
    }

    renderHtml(): HTMLElement {
        let container = HtmlHelper.span('progrem-grid', this.displayedCanvas);

        return container;
    }

    protected colorCurrentPixel(state: ProgremState, color: string): void {
        let boxSize = this.screenConfig.boxSize;
        let c = state.colonne;
        let l = state.ligne;
        
        // Paint pixel if it changed
        this.hiddenCtx.fillStyle = color;
        this.hiddenCtx.fillRect(c * boxSize, l * boxSize, boxSize, boxSize);
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

        if (this.cachingColors) {
            let flatFrameCoordinate = l * this.progremConfig.nombreColonnes + c;
            this.currentFrame[flatFrameCoordinate] = couleur;
    
            if (couleur && this.previousFrame[flatFrameCoordinate] !== couleur) {
                this.colorCurrentPixel(state, couleur);
            }
        } else if (couleur) {
            this.colorCurrentPixel(state, couleur);
        }
        
    }

    fireFrameChange (state: ProgremState): void {
        //this.clear();
        if (this.cachingColors) {
            this.previousFrame = this.currentFrame;
            this.currentFrame = [];
        }
    }

    firePainting(): void {
        this.displayedCtx.drawImage(this.hiddenCanvas, 0, 0);
    }

    protected clear(): void {
        let width = this.screenConfig.boxSize * this.progremConfig.nombreColonnes;
        let height = this.screenConfig.boxSize * this.progremConfig.nombreLignes;
        this.hiddenCtx.clearRect(0, 0, width, height);
        this.hiddenCtx.fillStyle = 'antiquewhite';
        this.hiddenCtx.fillRect(0, 0, width, height);
    }

}