
export class EvalScope {

    // See http://perfectionkills.com/global-eval-what-are-the-options/
    // Will return an eval able to evaluate js code in the global scope.
    public readonly globalEval = (function () {

        var isIndirectEvalGlobal = (function (original, Object) {
            try {
                // Does `Object` resolve to a local variable, or to a global, built-in `Object`,
                // reference to which we passed as a first argument?
                return (1, eval)('Object') === original;
            }
            catch (err) {
                // if indirect eval errors out (as allowed per ES3), then just bail out with `false`
                return false;
            }
        })(Object, 123);

        if (isIndirectEvalGlobal) {
            // if indirect eval executes code globally, use it
            return function (expression: string) {
                return (1, eval)(expression);
            };
        }
        // @ts-ignore
        else if (typeof window.execScript !== 'undefined') {
            // if `window.execScript exists`, use it
            return function (expression: string) {
                // @ts-ignore
                return window.execScript(expression);
            };
        }

        // otherwise, globalEval is `undefined` since nothing is returned
        return (expr: string) => {throw new Error('No global eval available !');}
    })();

    constructor() {}

}
