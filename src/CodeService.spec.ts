import 'jasmine';
//import 'jasmine-ajax';
import { generate as escodegenerate } from 'escodegen';
import { CodeService } from './CodeService';
import { ProgremState } from './SchedulingService';
//import { ProgremCodeFactory } from './CodeService';

describe('CodeService', () => {
    /*
    beforeEach(function() {
        jasmine.Ajax.install();
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });
    */
    /*
    it('should build the service', () => {
        let service = new CodeService();
        expect(service).toBeTruthy();
    });
    */
    /*
    it('should load a progrem', (done) => {

        jasmine.Ajax.stubRequest('/foo').andReturn({
            status: 200,
            contentType: 'text/plain',
            responseText: 'console.log(42);'
        });
        
        let service = new CodeService();
        service.loadProgrem('/foo').then(code => {
            expect(code).toBeTruthy('No code returned');
            done();
        });
    });
    */

});

describe('BasicEsprimaCodeIterator', () => {

    let dumbProgram = `
        function colorerProgrem() {
            {
                {
                    var a = 1; 
                }
            }
            {
                {
                    
                }
            }
        }
    `;

    let programWithReturn = `
        function colorerProgrem() {
            var a = 1; var b = 2; 
            var c = a + b; 
            return c;
        }
    `;

    let programWithIf = `
        function colorerProgrem() {
            var c = 3; 
            var d;
            if (c < 3) {
                d = 0;
            } else {
                c = 0;
                d = 1;
            }
            return d;
        }
    `;

    let programWithReturnInIf = `
        function colorerProgrem() {
            var c = 3; 
            if (c < 3) {
                return 0;
            } else {
                return 1;
            }
        }
    `;
  
    it('should build an iterator', () => {
        let progremCodeFactory = CodeService.progremCodeFactory;
        let progremCode = progremCodeFactory.build('function colorerProgrem() {var a = 1;}');
        let state = new ProgremState(0, 0, 0, {}, null);
        let codeIterator = progremCode.iterator(state);

        expect(codeIterator).toBeTruthy();
    });

    it('should iterate over dumbProgram code', () => {
        let progremCodeFactory = CodeService.progremCodeFactory;
        let progremCode = progremCodeFactory.build(dumbProgram);
        let state = new ProgremState(0, 0, 0, {}, null);
        let codeIterator = progremCode.iterator(state);

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        let statement = codeIterator.executeNext();
        expect(escodegenerate(statement.node)).toBe('var a = 1;');

        expect(codeIterator.hasNext()).toBeFalsy('hasNext() should return false');
    });

    it('should iterate over programWithReturn code', () => {
        let progremCodeFactory = CodeService.progremCodeFactory;
        let progremCode = progremCodeFactory.build(programWithReturn);
        let state = new ProgremState(0, 0, 0, {}, null);
        let codeIterator = progremCode.iterator(state);

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        let statement = codeIterator.executeNext();
        expect(escodegenerate(statement.node)).toBe('var a = 1;');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        statement = codeIterator.executeNext();
        expect(escodegenerate(statement.node)).toBe('var b = 2;');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        statement = codeIterator.executeNext();
        expect(escodegenerate(statement.node)).toBe('var c = a + b;');
        
        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        statement = codeIterator.executeNext();
        expect(escodegenerate(statement.node)).toBe('return c;');

        expect(codeIterator.hasNext()).toBeFalsy('hasNext() should return false');
    });

    it('should iterate over programWithIf code', () => {
        let progremCodeFactory = CodeService.progremCodeFactory;
        let progremCode = progremCodeFactory.build(programWithIf);
        let state = new ProgremState(0, 0, 0, {}, null);
        let codeIterator = progremCode.iterator(state);

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        let statement = codeIterator.executeNext();
        expect(escodegenerate(statement.node)).toBe('var c = 3;');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        statement = codeIterator.executeNext();
        expect(escodegenerate(statement.node)).toBe('var d;');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        statement = codeIterator.executeNext();
        expect(escodegenerate(statement.node)).toBe('c < 3');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        statement = codeIterator.executeNext();
        expect(escodegenerate(statement.node)).toBe('c = 0;');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        statement = codeIterator.executeNext();
        expect(escodegenerate(statement.node)).toBe('d = 1;');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        statement = codeIterator.executeNext();
        expect(escodegenerate(statement.node)).toBe('return d;');

        expect(codeIterator.hasNext()).toBeFalsy('hasNext() should return false');
    });

    it('should iterate over programWithReturnInIf code', () => {
        let progremCodeFactory = CodeService.progremCodeFactory;
        let progremCode = progremCodeFactory.build(programWithReturnInIf);
        let state = new ProgremState(0, 0, 0, {}, null);
        let codeIterator = progremCode.iterator(state);

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        let statement = codeIterator.executeNext();
        expect(escodegenerate(statement.node)).toBe('var c = 3;');
        
        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        statement = codeIterator.executeNext();
        expect(escodegenerate(statement.node)).toBe('c < 3');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        statement = codeIterator.executeNext();
        expect(escodegenerate(statement.node)).toBe('return 1;');

        expect(codeIterator.hasNext()).toBeFalsy('hasNext() should return false');
    });
});