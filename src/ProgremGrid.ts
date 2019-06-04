import { GridChangeListener, ProgremState } from "./SchedulingService";
import { ScreenConfig } from "./ScreenService";
import { ProgremConfig } from "./ProgremService";

export interface ProgremGrid {
    clear(): void;
    attach(element: Element | null): void
}

export class BasicCanvasProgremGrid implements ProgremGrid, GridChangeListener {
    
    private attachedElement: Element | null = null;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(
        private screenConfig: ScreenConfig, 
        private progremConfig: ProgremConfig
        ) {
        let elt = document.querySelector('.progrem');
        if (!elt) {
            throw new Error('Unable to find .progrem Canvas element !');
        }
        this.canvas = elt as HTMLCanvasElement;

        let ctx = this.canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Unable to get 2D Canvas context !');
        }
        this.ctx = ctx;
    }

    private attachToCanvas(canvas: HTMLCanvasElement): void {
        this.canvas = canvas;
        canvas.width = this.progremConfig.colonnes * this.screenConfig.boxSize;
        canvas.height = this.progremConfig.colonnes * this.screenConfig.boxSize;

        let ctx = this.canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Unable to get 2D Canvas context !');
        }
        this.ctx = ctx;
    }

    clear(): void {
        let width = this.screenConfig.boxSize * this.progremConfig.colonnes;
        let height = this.screenConfig.boxSize * this.progremConfig.lignes;
        this.ctx.clearRect(0, 0, width, height);
    }

    attach(element: Element | null): void {
        this.attachedElement = element;
        if (element) {
            if (element.nodeName === 'CANVAS') {
                this.attachToCanvas(element as HTMLCanvasElement);
                return;
            } else {
                element.childNodes.forEach(c => {
                    if (c.nodeName === 'CANVAS') {
                        this.attachToCanvas(element as HTMLCanvasElement);
                        return;
                    }
                });
            }

            // No Canvas found so we create one
            let canvas = document.createElement("canvas");
            this.attachToCanvas(canvas);
            element.appendChild(canvas);
        }
    }
    
    fireBoxChange (state: ProgremState): void {
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

}
