import { EsprimaProgrem } from "../../esprima/EsprimaTypes";
import { generate as escodeGenerate } from 'escodegen';
import { Observable } from "rxjs";

export class ProgremEditorComponent {

    public static readonly COMPONENT_CLASS = 'progrem-editor-component';
    public static readonly INIT_FUNC_CLASS = 'init-progrem-editor';
    public static readonly COLORER_FUNC_CLASS = 'colorer-progrem-editor';
    public static readonly CODE_LIBRE_CLASS = 'code-libre-editor';
    public static readonly REFRESH_ACTION_CLASS = 'refresh-action';

    private initProgremTextarea!: HTMLTextAreaElement;
    private colorerProgremTextarea!: HTMLTextAreaElement;
    private codeLibreTextarea!: HTMLTextAreaElement;
    private refreshObservable$!: Observable<Event>;

    private attached: boolean = false;

    constructor() {}

    public attach(document:Document) {
        let element = document.querySelector(`.${ProgremEditorComponent.COMPONENT_CLASS} .${ProgremEditorComponent.INIT_FUNC_CLASS} textarea`);
        console.log('elements', element);
        if (element) this.initProgremTextarea = element as HTMLTextAreaElement;

        element = document.querySelector(`.${ProgremEditorComponent.COMPONENT_CLASS} .${ProgremEditorComponent.COLORER_FUNC_CLASS} textarea`);
        if (element) this.colorerProgremTextarea = element as HTMLTextAreaElement;

        element = document.querySelector(`.${ProgremEditorComponent.COMPONENT_CLASS} .${ProgremEditorComponent.CODE_LIBRE_CLASS} textarea`);
        if (element) this.codeLibreTextarea = element as HTMLTextAreaElement;

        element = document.querySelector(`.${ProgremEditorComponent.COMPONENT_CLASS} .${ProgremEditorComponent.REFRESH_ACTION_CLASS}`);
        this.refreshObservable$ = Observable.fromEvent(element as HTMLButtonElement, 'click');

        this.attached = this.initProgremTextarea !== undefined && this.colorerProgremTextarea !== undefined && this.codeLibreTextarea !== undefined && this.refreshObservable$ !== undefined;
        
    }

    protected checkIsAttached() {
        if (!this.attached) {
            throw new Error('ProgremEditorComponent is not attached !');
        }
    }

    public loadProgrem(progrem: EsprimaProgrem) {
        this.checkIsAttached();

        let funcBodyBlock = progrem.initialiserProgremFunction().functionRootNode.body;
        let funcBodyCode = escodeGenerate(funcBodyBlock);
        let cleanedCode = funcBodyCode.substring(1, funcBodyCode.length - 2);
        this.initProgremTextarea.innerHTML = cleanedCode;

        funcBodyBlock = progrem.colorerProgremFunction().functionRootNode.body;
        funcBodyCode = escodeGenerate(funcBodyBlock);
        cleanedCode = funcBodyCode.substring(1, funcBodyCode.length - 2);
        this.colorerProgremTextarea.innerHTML = cleanedCode;
        
    }

    public buildProgrem(): string {
        let colorerProgremFunc = `
        function colorerProgrem(colonne, ligne, contexte) {
            ${this.colorerProgremTextarea.value}
        }
        `;

        let initProgremFunc = `
        function initialiserProgrem(cadreLargeur, cadreHauteur) {
            ${this.initProgremTextarea.value}
        }
        `;

        let codeLibreFunc = this.codeLibreTextarea.value;

        return `
        ${codeLibreFunc}

        ${initProgremFunc}

        ${colorerProgremFunc}
        `;
    }

    public bindRefresh(action: (code: string) => void) {
        this.refreshObservable$.subscribe(event => {
            action(this.buildProgrem());
        })
    }

}