import { ProgremConfig } from "./ProgremService";
import { EvalScope } from "./EvalService";
import { ProgremScheduler, VerseIterator, ProgremCode, ProgremVerse, StartIteratingCodeListener, CodeExecutionListener, GridChangeListener, LineChangeListener, FrameChangeListener, ProgremState, ProgremTempo } from "./Types";

class SimpleProgremScheduler implements ProgremScheduler {
    
    private state: ProgremState;
    private codeIterator: VerseIterator<any> | null = null;

    private startIteratingCodeListeners: StartIteratingCodeListener[] = [];
    private codeExecutionListeners: CodeExecutionListener[] = [];
    private gridChangeListeners: GridChangeListener[] = [];
    private lineChangeListeners: LineChangeListener[] = [];
    private frameChangeListeners: FrameChangeListener[] = [];

    public tempo: ProgremTempo = ProgremTempo.ByLine;

    constructor(private config: ProgremConfig, private code: ProgremCode<any>) {
        this.state = this.reset();
    }

    subscribeStartIteratingCode(listener: StartIteratingCodeListener): void {
        this.startIteratingCodeListeners.push(listener);
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

    next(): ProgremState[] {
        if (!this.state) throw new Error('Inconsistent Progrem state !');

        //console.log(this.state);

        if (this.tempo === ProgremTempo.ByVerse) {
            if (this.codeIterator == null) {
                this.codeIterator = this.code.iterator(this.state);
                this.startIteratingCodeListeners.map(l => l.fireStartIteratingCode(this.state));
            }

            //console.log('hasNext:', this.codeIterator.hasNext());

            if (this.codeIterator.hasNext()) {
                let statement = this.codeIterator.executeNext();
                let newState = new ProgremState(this.state.colonne, this.state.ligne, this.state.frame, this.state.contexte, statement);
                this.state = newState;
                this.codeExecutionListeners.map(l => l.fireCodeExecution(newState));
                return [newState];
            }

            //console.log('Finished iterating over code.')
        }

        
        let notifyPixelChange = false;
        let notifyLineChange = false;
        let notifyFrameChange = false;
        let bufferedStates: ProgremState[] = [];
        do {
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

            if (_ligne >= this.config.lignes) {
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

            bufferedStates.push(this.state);
            this.state = newState;
            //this.codeIterator = this.code.iterator(newState);
            
        } while(this.tempo === ProgremTempo.ByLine && !notifyLineChange || this.tempo === ProgremTempo.ByFrame && !notifyFrameChange);

        this.codeIterator = null;

        return bufferedStates;
    }

    public getProgrem(): ProgremCode<any> {
        return this.code;
    }
}

export namespace SchedulingService {

    export function buildProgremScheduler(config: ProgremConfig, code: ProgremCode<any>) {
        return new SimpleProgremScheduler(config, code);
    }

}