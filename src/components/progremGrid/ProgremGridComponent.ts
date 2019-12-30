import { ProgremComponent, ProgremScheduler, StartIteratingCodeListener, GridChangeListener, ProgremState, ProgremConfig, FrameChangeListener, PaintingListener, EndAnimationListener, Subscription } from "../../core/Types";
import { ScreenConfig } from "../../core/ScreenService";
import { HtmlHelper } from "../../core/HtmlHelper";
import { Observable } from 'rxjs/Rx';
import { animationFrameScheduler } from "rxjs";

export class ProgremGridComponent implements ProgremComponent, StartIteratingCodeListener, GridChangeListener, FrameChangeListener, PaintingListener, EndAnimationListener {
    
    private renderingContainer: HTMLElement = HtmlHelper.span('progrem-grid');
    private displayedCanvas: HTMLCanvasElement;
    private displayedCtx: CanvasRenderingContext2D;
    private hiddenCanvas: HTMLCanvasElement;
    private hiddenCtx: CanvasRenderingContext2D;
    private subscription: Subscription | null = null;
    private blinkInterval = 200;
    
    // FIXME: le colorsCache ne devrait pas de trouver dans le ProgremGridComponent !
    private colorsCacheEnabled: boolean = true;
    private colorsCache: Map<string, string> = new Map();

    private framesCacheEnabed: boolean = true;
    private framesCache: Map<number, CanvasRenderingContext2D> = new Map();
    private currentCachedFrame: HTMLCanvasElement|null = null;

    private calculatingColorerProgrem: (c:number, l:number, f:number, ctx:any) => string;
    private cachedColorerProgrem: (c:number, l:number, f:number, ctx:any) => string = (c: number, l: number, f: number, ctx:any) => {
        let color = this.getCachedColor(c, l, f);
        if (color) {
            //console.log('Retrieving color from cache.');
        } else {
            color = this.calculatingColorerProgrem(c, l, f, ctx);
            this.cacheColor(c, l, f, color);
        }
        return color;
    }
    
    private startIteratingCodeSub: Subscription;
    private gridChangeSub: Subscription;
    private frameChangeSub: Subscription;
    private paintingSub: Subscription;
    private endAnimationSub: Subscription;

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

        this.hiddenCanvas = this.buildFrameCanvas();
        let hiddenCtx = this.hiddenCanvas.getContext('2d');
        
        if (!ctx || !hiddenCtx) {
            throw new Error('Unable to obtain 2D Canvas context !');
        }
        this.displayedCtx = ctx;
        this.hiddenCtx = hiddenCtx;

        // @ts-ignore
        this.calculatingColorerProgrem = colorerProgrem;

        this.clear();
        
        this.startIteratingCodeSub = scheduler.subscribeStartIteratingCode(this);
        this.gridChangeSub = scheduler.subscribeGridChange(this);
        this.frameChangeSub = scheduler.subscribeFrameChange(this);
        this.paintingSub = scheduler.subscribePainting(this);
        this. endAnimationSub = scheduler.subscribeEndAnimation(this);
    }

    protected buildFrameCanvas(): HTMLCanvasElement {
        let canvas = document.createElement('canvas');
        canvas.width = this.progremConfig.nombreColonnes * this.screenConfig.boxSize;
        canvas.height = this.progremConfig.nombreLignes * this.screenConfig.boxSize;
        return canvas;
    }

    renderHtml(): HTMLElement {
        this.renderingContainer.innerHTML = "";
        this.renderingContainer.appendChild(this.displayedCanvas);

        return this.renderingContainer;
    }

    protected colorCurrentPixel(state: ProgremState, color: string, context: CanvasRenderingContext2D): void {
        let boxSize = this.screenConfig.boxSize;
        let c = state.colonne;
        let l = state.ligne;
        
        // Paint pixel if it changed
        context.fillStyle = color;
        context.fillRect(c * boxSize, l * boxSize, boxSize, boxSize);
    }

    protected blinkCurrentPixel(state: ProgremState, incremnt: number) {
        let color = 'black';
        if (incremnt % 2 === 0) {
            color = 'antiquewhite';
        }
        this.colorCurrentPixel(state, color, this.displayedCtx);
        
    }
    
    fireStartIteratingCode (state: ProgremState): void {
        //console.log('fireStartIteratingCode');
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = Observable.interval(this.blinkInterval, animationFrameScheduler).subscribe(t => {
            this.blinkCurrentPixel(state, t);
        });
    }

    fireGridChange (oldState: ProgremState, newState: ProgremState): void {
        //console.log('fireGridChange');
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        if (this.framesCacheEnabed) {
            let cachedCurrentFrame = this.getCachedFrame(oldState.frame);
            if (cachedCurrentFrame) {
                // If current frame is in cache, we stop work here.
                return;
            }
        }

        let c = oldState.colonne;
        let l = oldState.ligne;
        let f = oldState.frame;
        
        if (this.colorsCacheEnabled) {
            // @ts-ignore
            colorerProgrem = this.cachedColorerProgrem
        }

        // @ts-ignore
        let couleur = colorerProgrem(c, l, f, oldState.contexte);
        //console.log(`(${c}, ${l}, ${f}, ${state.contexte} => ${couleur}`);
        
        this.colorCurrentPixel(oldState, couleur, this.hiddenCtx);
    }

    fireFrameChange (oldState: ProgremState, newState: ProgremState): void {
        //console.log('fireFrameChange');
        
        if (this.framesCacheEnabed) {
            let cachedOldFrame = this.getCachedFrame(oldState.frame);
            if (!cachedOldFrame) {
                //console.log('Caching frame #', oldState.frame);
                let frameCanvas = this.buildFrameCanvas();
                frameCanvas.hidden = true;
                let frameCanvasCtx = frameCanvas.getContext('2d');
                if (frameCanvasCtx) {
                    frameCanvasCtx.drawImage(this.hiddenCanvas, 0, 0);
                    this.cacheFrame(oldState.frame, frameCanvasCtx);
                    this.renderingContainer.appendChild(frameCanvas);
                }
            } else {
                cachedOldFrame.canvas.hidden = true;
            }

            let cachedNewFrame = this.getCachedFrame(newState.frame);
            if (cachedNewFrame) {
                //console.log('Retrieving from cache frame #', newState.frame);
                this.currentCachedFrame = cachedNewFrame.canvas;
                this.currentCachedFrame.hidden = true;
            }
        }
    
    }

    firePainting(): void {
        if (this.currentCachedFrame) {
            //console.log(new Date(),'Painting pre rendered canvas.');
            //this.renderingContainer.innerHTML = "";
            
            //this.displayedCtx.drawImage(this.currentCachedFrame, 0, 0);
            this.currentCachedFrame.hidden = false;
        }else {
            //console.log(new Date(),'Painting hidden canvas.');
            this.displayedCtx.drawImage(this.hiddenCanvas, 0, 0);
        }
    }

    fireEndAnimation(): void {
        console.log('fireEndAnimation');

        if (this.currentCachedFrame) {
            this.displayedCanvas.hidden = true;
        }

        this.startIteratingCodeSub.unsubscribe();
        this.gridChangeSub.unsubscribe();
        this.endAnimationSub.unsubscribe();
    }

    protected clear(): void {
        let width = this.screenConfig.boxSize * this.progremConfig.nombreColonnes;
        let height = this.screenConfig.boxSize * this.progremConfig.nombreLignes;
        this.displayedCtx.clearRect(0, 0, width, height);
        this.displayedCtx.fillStyle = 'antiquewhite';
        this.displayedCtx.fillRect(0, 0, width, height);
    }

    protected buildColorsCacheKey(colonne: number, ligne: number, frame: number): string {
        return colonne + '_' + ligne + '_' + frame;
    }

    protected getCachedColor(colonne: number, ligne: number, frame: number): string|undefined {
        let key = this.buildColorsCacheKey(colonne, ligne, frame);
        let value = this.colorsCache.get(key);
        return value;
    }

    protected cacheColor(colonne: number, ligne: number, frame: number, value: string): void {
        let key = this.buildColorsCacheKey(colonne, ligne, frame);
        this.colorsCache.set(key, value);
    }


    protected getCachedFrame(frame: number): CanvasRenderingContext2D|undefined {
        let value = this.framesCache.get(frame);
        return value;
    }

    protected cacheFrame(frame: number, value: CanvasRenderingContext2D): void {
        this.framesCache.set(frame, value);
    }
}