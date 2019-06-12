import { ProgremConfig } from "./ProgremService";
import { ProgremCode, CodeIterator, CodeStatement } from "./CodeService";
import { EvalScope } from "./EvalService";

export class ProgremState {

    public readonly evalScope = new EvalScope;

    constructor(
        public readonly colonne: number,
        public readonly ligne: number,
        public readonly frame: number,
        public contexte: object,
        public readonly codeStatement: CodeStatement | null,
    ) {}

    public eval(expr: string): any {
        return this.evalScope.globalEval(expr);
    }
}

type NewStateCallback = (state: ProgremState) => void;
export interface CodeExecutionListener {fireCodeExecution: NewStateCallback};
export interface GridChangeListener {fireGridChange: NewStateCallback};
export interface LineChangeListener {fireLineChange: NewStateCallback};
export interface FrameChangeListener {fireFrameChange: NewStateCallback};

export interface ProgremScheduler {
    subscribeCodeExecution(listener: CodeExecutionListener): void
    subscribeGridChange(listener: GridChangeListener): void
    subscribeLineChange(listener: LineChangeListener): void
    subscribeFrameChange(listener: FrameChangeListener): void

    reset(): ProgremState
    current(): ProgremState
    next(): ProgremState
}

class SimpleProgremScheduler implements ProgremScheduler {
    
    private state: ProgremState;
    private codeIterator: CodeIterator | null = null;

    private codeExecutionListeners: CodeExecutionListener[] = [];
    private gridChangeListeners: GridChangeListener[] = [];
    private lineChangeListeners: LineChangeListener[] = [];
    private frameChangeListeners: FrameChangeListener[] = [];

    constructor(private config: ProgremConfig, private code: ProgremCode) {
        this.state = this.reset();
    }

    subscribeCodeExecution(listener: CodeExecutionListener): void {
        this.codeExecutionListeners.push(listener);
    }    
    
    subscribeGridChange(listener: GridChangeListener): void {
        this.gridChangeListeners.push(listener);
    }

    subscribeLineChange(listener: LineChangeListener): void {
        this.lineChangeListeners.push(listener);
    }

    subscribeFrameChange(listener: FrameChangeListener): void {
        this.frameChangeListeners.push(listener);
    }

    reset(): ProgremState {
        // Call just evaluated initialiserProgrem function
        // @ts-ignore
        let initialContexte: object = initialiserProgrem(this.config.colonnes, this.config.lignes);
        console.log('Loaded initial contexte: ', initialContexte);
        let state = new ProgremState(0, 0, 0, initialContexte, null);
        return state;
    }

    current(): ProgremState {
        return this.state;
    }

    next(): ProgremState {
        if (!this.state) throw new Error('Inconsistent Progrem state !');

        //console.log(this.state);

        if (this.codeIterator == null) {
            this.codeIterator = this.code.iterator(this.state);
        }

        //console.log('hasNext:', this.codeIterator.hasNext());

        if (this.codeIterator.hasNext()) {
            let statement = this.codeIterator.executeNext();
            let newState = new ProgremState(this.state.colonne, this.state.ligne, this.state.frame, this.state.contexte, statement);
            this.state = newState;
            this.codeExecutionListeners.map(l => l.fireCodeExecution(newState));
            return newState;
        }

        //console.log('Finished iterating over code.')

        let notifyPixelChange = false;
        let notifyLineChange = false;
        let notifyFrameChange = false;

        let _colonne = this.state.colonne;
        let _ligne = this.state.ligne;
        let _frame = this.state.frame;

        _colonne ++;
        notifyPixelChange = true;

        if (_colonne >= this.config.colonnes) {
            _colonne = 0;
            _ligne ++;
            notifyLineChange = true;
        }

        if (_ligne > this.config.lignes) {
            _ligne = 0;
            _frame ++;
            notifyFrameChange = true;
        }

        if (_frame > this.config.frames) {
            _frame = 0;
        }

        let newState = new ProgremState(_colonne, _ligne, _frame, this.state.contexte, null);
 
        if (notifyPixelChange) {
            this.gridChangeListeners.map(l => l.fireGridChange(this.state));
        }

        if (notifyLineChange) {
            this.lineChangeListeners.map(l => l.fireLineChange(this.state));
        }

        if (notifyFrameChange) {
            this.frameChangeListeners.map(l => l.fireFrameChange(this.state));
        }

        this.state = newState;
        this.codeIterator = this.code.iterator(newState);

        return newState;
    }
    
}

export namespace SchedulingService {

    export function buildProgremScheduler(config: ProgremConfig, code: ProgremCode) {
        return new SimpleProgremScheduler(config, code);
    }

}