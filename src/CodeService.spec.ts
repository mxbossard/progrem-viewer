import 'jasmine';
//import 'jasmine-ajax';
import * as Escodegen from 'escodegen';
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

/*
describe('BasicEsprimaCodeIterator', () => {
    it('should build an iterator', () => {
        let progremCodeFactory = new ProgremCodeFactory();
        let progremCode = progremCodeFactory.build('function colorerProgrem() {let a = 1;}');
        let codeIterator = progremCode.iterator(0, 0, {});

        expect(codeIterator).toBeTruthy();
    });

    it('should iterate over code', () => {
        let progremCodeFactory = new ProgremCodeFactory();
        let progremCode = progremCodeFactory.build('function colorerProgrem() {let a = 1; let b = 2;}');
        let codeIterator = progremCode.iterator(0, 0, {});

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        let statement = codeIterator.executeNext();
        expect(Escodegen.generate(statement.node)).toBe('let a = 1;');

        expect(codeIterator.hasNext()).toBeTruthy('hasNext() should return true');
        statement = codeIterator.executeNext();
        expect(Escodegen.generate(statement.node)).toBe('let b = 2;');

        expect(codeIterator.hasNext()).toBeFalsy('hasNext() should return false');
    });
});
*/