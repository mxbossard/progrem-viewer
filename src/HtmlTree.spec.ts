import 'jasmine';
import { JSDOM } from 'jsdom';
import { FunctionDeclarationToHtmlTreeStore, FunctionSpoolerEsToHtmlFactory } from './HtmlTree';
import { CodeService } from './CodeService';

describe('BasicEsToHtmlTreeStore', () => {
    let programWithReturn = `
        function colorerProgrem() {
            var a = 1; var b = 2; 
            var c = a + b; 
            return c;
        }
    `;

    let window: Window;
    let document: Document;

    beforeEach(() => {
        window = new JSDOM('', {}).window;
        document = window.document;
    })

    it('should store a small progrem code', () => {
        let progremCode = CodeService.progremCodeFactory.build(programWithReturn);
        let func = progremCode.colorerProgremFunction();
        let htmlFactory = new FunctionSpoolerEsToHtmlFactory(document);
        let treeStore = new FunctionDeclarationToHtmlTreeStore(func, htmlFactory);

        //let container = jasmine.createSpyObj("HTML Element", ["appendChild"]);
        let box = document.createElement('div');
        treeStore.paintInto(box);
        
        expect(box.children.length).toBe(6);
    });

});