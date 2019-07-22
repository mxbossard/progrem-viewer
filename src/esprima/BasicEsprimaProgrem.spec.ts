import 'jasmine';
//import 'jasmine-ajax';
import { generate as escodegenerate } from 'escodegen';
import { CodeService } from '../core/CodeService';
import { ProgremState } from '../core/Types';

describe('BasicEsprimaCodeIterator', () => {

    it('should build an iterator', () => {
        let progremCodeFactory = CodeService.progremFactory;
        let progremCode = progremCodeFactory.buildProgrem('function colorerProgrem() {var a = 1;}');
        let state = new ProgremState(0, 0, 0, {}, null);
        let codeIterator = progremCode.iterator(state);

        expect(codeIterator).toBeTruthy();

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        let verse = codeIterator.executeNext();
        expect(verse.node.type).toBe('FunctionDeclaration');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        verse = codeIterator.executeNext();
        expect(verse.node.type).toBe('VariableDeclaration');
        expect(escodegenerate(verse.node)).toBe('var a = 1;');
        

        expect(codeIterator.hasNext()).toBeFalsy('hasNext() should return false');
    });

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

    it('should iterate over dumbProgram code', () => {
        let progremCodeFactory = CodeService.progremFactory;
        let progremCode = progremCodeFactory.buildProgrem(dumbProgram);
        let state = new ProgremState(0, 0, 0, {}, null);
        let codeIterator = progremCode.iterator(state);

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        let verse = codeIterator.executeNext();
        expect(verse.node.type).toBe('FunctionDeclaration');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        verse = codeIterator.executeNext();
        expect(verse.node.type).toBe('VariableDeclaration');
        expect(escodegenerate(verse.node)).toBe('var a = 1;');

        expect(codeIterator.hasNext()).toBeFalsy('hasNext() should return false');
    });

    let programWithReturn = `
        function colorerProgrem() {
            var a = 1; var b = 2; 
            var c = a + b; 
            return c;
        }
    `;

    it('should iterate over programWithReturn code', () => {
        let progremCodeFactory = CodeService.progremFactory;
        let progremCode = progremCodeFactory.buildProgrem(programWithReturn);
        let state = new ProgremState(0, 0, 0, {}, null);
        let codeIterator = progremCode.iterator(state);

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        let verse = codeIterator.executeNext();
        expect(verse.node.type).toBe('FunctionDeclaration');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        verse = codeIterator.executeNext();
        expect(escodegenerate(verse.node)).toBe('var a = 1;');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        verse = codeIterator.executeNext();
        expect(escodegenerate(verse.node)).toBe('var b = 2;');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        verse = codeIterator.executeNext();
        expect(escodegenerate(verse.node)).toBe('var c = a + b;');
        
        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        verse = codeIterator.executeNext();
        expect(escodegenerate(verse.node)).toBe('return c;');

        expect(codeIterator.hasNext()).toBeFalsy('hasNext() should return false');
    });

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

    it('should iterate over programWithIf code', () => {
        let progremCodeFactory = CodeService.progremFactory;
        let progremCode = progremCodeFactory.buildProgrem(programWithIf);
        let state = new ProgremState(0, 0, 0, {}, null);
        let codeIterator = progremCode.iterator(state);

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        let verse = codeIterator.executeNext();
        expect(verse.node.type).toBe('FunctionDeclaration');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        verse = codeIterator.executeNext();
        expect(escodegenerate(verse.node)).toBe('var c = 3;');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        verse = codeIterator.executeNext();
        expect(escodegenerate(verse.node)).toBe('var d;');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        verse = codeIterator.executeNext();
        expect(escodegenerate(verse.node)).toBe('c < 3');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        verse = codeIterator.executeNext();
        expect(escodegenerate(verse.node)).toBe('c = 0;');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        verse = codeIterator.executeNext();
        expect(escodegenerate(verse.node)).toBe('d = 1;');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        verse = codeIterator.executeNext();
        expect(escodegenerate(verse.node)).toBe('return d;');

        expect(codeIterator.hasNext()).toBeFalsy('hasNext() should return false');
    });

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
  
    it('should iterate over programWithReturnInIf code', () => {
        let progremCodeFactory = CodeService.progremFactory;
        let progremCode = progremCodeFactory.buildProgrem(programWithReturnInIf);
        let state = new ProgremState(0, 0, 0, {}, null);
        let codeIterator = progremCode.iterator(state);

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        let verse = codeIterator.executeNext();
        expect(verse.node.type).toBe('FunctionDeclaration');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        verse = codeIterator.executeNext();
        expect(escodegenerate(verse.node)).toBe('var c = 3;');
        
        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        verse = codeIterator.executeNext();
        expect(escodegenerate(verse.node)).toBe('c < 3');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        verse = codeIterator.executeNext();
        expect(escodegenerate(verse.node)).toBe('return 1;');

        expect(codeIterator.hasNext()).toBeFalsy('hasNext() should return false');
    });

});