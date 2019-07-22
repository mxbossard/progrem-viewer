import 'jasmine';
import { EvalScope } from './EvalService';

describe('JS eval', () => {
    var evalScope: EvalScope;

    beforeEach(() => {
        /*
        local_eval = function() {
            let local_eval = eval;
            return local_eval;
        }();
        */
        evalScope = new EvalScope();
    })

    it('do not evaluate const keyword', () => {
        evalScope.globalEval('const constVal = 1;');
        try {
            //let result = eval.call(evalScope, 'constVal');
            let result = evalScope.globalEval('constVal');
        } catch(error) {
            return;
        }
        fail();
    });

    it('do not evaluate let keyword', () => {
        evalScope.globalEval('let letVal = 2;');
        try {
            let result = evalScope.globalEval('letVal');
        } catch(error) {
            return;
        }
        fail();
    });

    it('should evaluate var keyword', () => {
        evalScope.globalEval('var varVal = 3;');
        let result = evalScope.globalEval('varVal');
        expect(result).toBe(3);
    });

    it('should evaluate no keyword affectation', () => {
        evalScope.globalEval('noVal = 4;');
        let result = evalScope.globalEval('noVal');
        expect(result).toBe(4);
    });


    it('do not keep separate differents scopes', () => {
        let scope1 = new EvalScope();
        let globalEval = scope1.globalEval;
        globalEval('var value = 5;');
        let result = globalEval('value;');
        
        expect(result).toBe(5);

        let scope2 = new EvalScope();
        let result2 = scope2.globalEval('value;');
        expect(result2).toBe(5);
    });

});