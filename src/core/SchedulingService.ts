import { ProgremScheduler, VerseIterator, ProgremCode, ProgremVerse, StartIteratingCodeListener, CodeExecutionListener, GridChangeListener, LineChangeListener, FrameChangeListener, ProgremState, ProgremTempo, ProgremConfig, PaintingListener, Subscription, EndAnimationListener } from "./Types";

class SimpleProgremScheduler implements ProgremScheduler {
    
    private state: ProgremState;
    private codeIterator: VerseIterator<any> | null = null;

    private startIteratingCodeListeners: StartIteratingCodeListener[] = [];
    private codeExecutionListeners: CodeExecutionListener[] = [];
    private gridChangeListeners: GridChangeListener[] = [];
    private lineChangeListeners: LineChangeListener[] = [];
    private frameChangeListeners: FrameChangeListener[] = [];
    private paintingListeners: PaintingListener[] = [];
    private endAnimationListeners: EndAnimationListener[] = [];

    public tempo: ProgremTempo = ProgremTempo.ByLine;

    constructor(private config: ProgremConfig, private code: ProgremCode<any>) {
        this.state = this.reset();
    }

    subscribeStartIteratingCode(listener: StartIteratingCodeListener): Subscription {
        console.log('Adding StartIteratingCodeListener:', listener);
        let listeners = this.startIteratingCodeListeners;
        listeners.push(listener);
        let sub: Subscription = {
            unsubscribe() {
                listeners.find((l, i) => {
                    if (l === listener) {
                        listeners.splice(i, 1)
                    }
                });
            }
        };
        return sub;
    }    

    subscribeCodeExecution(listener: CodeExecutionListener): Subscription {
        console.log('Adding CodeExecutionListener:', listener);
        let listeners = this.codeExecutionListeners;
        listeners.push(listener);
        let sub: Subscription = {
            unsubscribe() {
                listeners.find((l, i) => {
                    if (l === listener) {
                        listeners.splice(i, 1)
                    }
                });
            }
        };
        return sub;
    }    
    
    subscribeGridChange(listener: GridChangeListener): Subscription {
        console.log('Adding GridChangeListener:', listener);
        let listeners = this.gridChangeListeners;
        listeners.push(listener);
        let sub: Subscription = {
            unsubscribe() {
                listeners.find((l, i) => {
                    if (l === listener) {
                        listeners.splice(i, 1)
                    }
                });
            }
        };
        return sub;
    }

    subscribeLineChange(listener: LineChangeListener): Subscription {
        console.log('Adding LineChangeListener:', listener);
        let listeners = this.lineChangeListeners;
        listeners.push(listener);
        let sub: Subscription = {
            unsubscribe() {
                listeners.find((l, i) => {
                    if (l === listener) {
                        listeners.splice(i, 1)
                    }
                });
            }
        };
        return sub;
    }

    subscribeFrameChange(listener: FrameChangeListener): Subscription {
        console.log('Adding FrameChangeListener:', listener);
        let listeners = this.frameChangeListeners;
        listeners.push(listener);
        let sub: Subscription = {
            unsubscribe() {
                listeners.find((l, i) => {
                    if (l === listener) {
                        listeners.splice(i, 1)
                    }
                });
            }
        };
        return sub;
    }

    subscribePainting(listener: PaintingListener): Subscription {
        console.log('Adding PaintingListener:', listener);
        let listeners = this.paintingListeners;
        listeners.push(listener);
        let sub: Subscription = {
            unsubscribe() {
                listeners.find((l, i) => {
                    if (l === listener) {
                        listeners.splice(i, 1)
                    }
                });
            }
        };
        return sub;
    }

    subscribeEndAnimation(listener: EndAnimationListener): Subscription {
        console.log('Adding EndAnimationListener:', listener);
        let listeners = this.endAnimationListeners;
        listeners.push(listener);
        let sub: Subscription = {
            unsubscribe() {
                listeners.find((l, i) => {
                    if (l === listener) {
                        listeners.splice(i, 1)
                    }
                });
            }
        };
        return sub;
    }

    reset(): ProgremState {
        let initialContexte = {};
        // Call just evaluated initialiserProgrem function
        // @ts-ignore
        initialiserProgrem(this.config, initialContexte);
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
                let verse = this.codeIterator.executeNext();
                let newState = new ProgremState(this.state.colonne, this.state.ligne, this.state.frame, this.state.contexte, verse);
                this.codeExecutionListeners.map(l => l.fireCodeExecution(this.state, newState));
                this.state = newState;
                this.paintingListeners.map(l => l.firePainting());
                return [newState];
            }

            //console.log('Finished iterating over code.')
        }

        
        let notifyPixelChange = false;
        let notifyLineChange = false;
        let notifyFrameChange = false;
        let notifyEndAnimation = false;
        let bufferedStates: ProgremState[] = [];
        do {
            let _colonne = this.state.colonne;
            let _ligne = this.state.ligne;
            let _frame = this.state.frame;

            _colonne ++;
            notifyPixelChange = true;

            if (_colonne >= this.config.nombreColonnes) {
                _colonne = 0;
                _ligne ++;
                notifyLineChange = true;
            }

            if (_ligne >= this.config.nombreLignes) {
                _ligne = 0;
                _frame ++;
                notifyFrameChange = true;
            }

            if (_frame >= this.config.nombreFrames) {
                _frame = 0;
                notifyEndAnimation = true;
            }

            let newState = new ProgremState(_colonne, _ligne, _frame, this.state.contexte, null);
    
            if (notifyPixelChange) {
                this.gridChangeListeners.map(l => l.fireGridChange(this.state, newState));
            }

            if (notifyLineChange) {
                this.lineChangeListeners.map(l => l.fireLineChange(this.state, newState));
            }

            if (notifyFrameChange) {
                this.frameChangeListeners.map(l => l.fireFrameChange(this.state, newState));
            }

            if (notifyEndAnimation) {
                this.endAnimationListeners.map(l => l.fireEndAnimation());
            }

            bufferedStates.push(this.state);
            this.state = newState;
            //this.codeIterator = this.code.iterator(newState);
            
        } while(this.tempo === ProgremTempo.ByLine && !notifyLineChange || this.tempo === ProgremTempo.ByFrame && !notifyFrameChange);

        this.codeIterator = null;
        this.paintingListeners.map(l => l.firePainting());
        
        return bufferedStates;
    }

    public getProgrem(): ProgremCode<any> {
        return this.code;
    }
}

export namespace SchedulingService {

    export function buildProgremScheduler(config: ProgremConfig, code: ProgremCode<any>, tempo: ProgremTempo) {
        let scheduler = new SimpleProgremScheduler(config, code);
        scheduler.tempo = tempo;
        return scheduler;
    }

}