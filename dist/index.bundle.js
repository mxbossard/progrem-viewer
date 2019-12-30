(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index"],{

/***/ "+Su8":
/*!***********************************************************************************!*\
  !*** ./src/components/progremInspector/EsprimaProgremInspectorStyleDecorators.ts ***!
  \***********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ProgremInspectorComponent_1 = __webpack_require__(/*! ./ProgremInspectorComponent */ "OFPY");
const ColorService_1 = __webpack_require__(/*! ../../core/ColorService */ "voyP");
class ColorVerseVariableDecorator {
    constructor() {
        this.variableMap = new Map();
        this.colorProvider = ColorService_1.ColorService.colorProvideractory.build();
    }
    decorate(node, element) {
        let varId;
        if (node.type === 'Identifier') {
            // let isParentNotAlreadyVariable = HtmlHelper.testHierachy(element, elt => !elt.classList.contains('variable'));
            // if (!isParentNotAlreadyVariable) {
            //     return element;
            // }
            let n = node;
            varId = n.name;
        }
        /*
        if (node.type === 'MemberExpression') {
            let n = node as MemberExpression;
            varId = escodeGenerate(n);
        }
        */
        if (varId) {
            let varIndex = this.variableMap.get(varId);
            if (!varIndex) {
                varIndex = this.variableMap.size + 1;
                this.variableMap.set(varId, varIndex);
            }
            element.classList.add('variable');
            element.classList.add('variable-' + varIndex);
        }
        return element;
    }
    buildStyleSheet() {
        let style = '';
        //console.log('variable count:', this.variableMap.size);
        this.variableMap.forEach((index, id) => {
            let color = this.colorProvider.hashStringToColor(id, 16); //this.variableMap.size
            //console.log('building color #', id, '=>', color);
            style += `
                .variable {
                    padding: 0.1em 0.5em 0.1em 0.5em;
                    border: 1px solid transparent;
                    border-radius: 0.8em;
                }
                .${ProgremInspectorComponent_1.ProgremInspectorComponent.EXECUTING_CLASS} .variable-${index}.identifier, 
                .${ProgremInspectorComponent_1.ProgremInspectorComponent.EXECUTED_CLASS} .variable-${index}.identifier {
                    background-color: ${color};
                    border: 1px solid black;
                }
            `;
        });
        return style;
    }
}
exports.ColorVerseVariableDecorator = ColorVerseVariableDecorator;
class PadVerseDecorator {
    decorate(node, element) {
        if (node.type === 'BlockStatement') {
            element.classList.add('code-padding');
        }
        return element;
    }
    buildStyleSheet() {
        return `
        .code-padding {
            margin-left: 32px;
        }
        `;
    }
}
exports.PadVerseDecorator = PadVerseDecorator;


/***/ }),

/***/ "/7QA":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ProgremService_1 = __webpack_require__(/*! ./core/ProgremService */ "WO1K");
const ScreenService_1 = __webpack_require__(/*! ./core/ScreenService */ "iSqq");
let screenConfig = new ScreenService_1.ScreenConfig(20);
//ProgremService.buildProgrem('./progrems/mandelbrot_set_progrem.js', screenConfig);
ProgremService_1.ProgremService.buildProgrem('./progrems/diagonale_glissante_progrem.js', screenConfig);


/***/ }),

/***/ "7BoH":
/*!****************************************************************!*\
  !*** ./src/components/variableScope/VariableScopeComponent.ts ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ColorService_1 = __webpack_require__(/*! ../../core/ColorService */ "voyP");
class VariableScopeComponent {
    constructor(scheduler, htmlFactory) {
        this.scheduler = scheduler;
        this.htmlFactory = htmlFactory;
        this.htmlContainer = null;
        this.colorProvider = ColorService_1.ColorService.colorProvideractory.build();
        scheduler.subscribeCodeExecution(this);
        scheduler.subscribeGridChange(this);
    }
    renderHtml() {
        let htmlComponent = this.htmlFactory.buildCouplet();
        this.htmlContainer = htmlComponent;
        return htmlComponent;
    }
    fireCodeExecution(oldState, newState) {
        if (!newState.verse) {
            return;
        }
        let htmlVerse = this.htmlFactory.getHtmlVerse(newState.verse);
        // if (this.htmlContainer && htmlVerse) {
        //     this.htmlContainer.appendChild(htmlVerse);
        // }
    }
    fireGridChange(state) {
        this.htmlFactory.clearView();
    }
}
exports.VariableScopeComponent = VariableScopeComponent;


/***/ }),

/***/ "ABAx":
/*!****************************************************************!*\
  !*** ./src/components/progremEditor/ProgremEditorComponent.ts ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const escodegen_1 = __webpack_require__(/*! escodegen */ "aMAw");
const rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
class ProgremEditorComponent {
    constructor() {
        this.attached = false;
    }
    attach(document) {
        let element = document.querySelector(`.${ProgremEditorComponent.COMPONENT_CLASS} .${ProgremEditorComponent.INIT_FUNC_CLASS} textarea`);
        console.log('elements', element);
        if (element)
            this.initProgremTextarea = element;
        element = document.querySelector(`.${ProgremEditorComponent.COMPONENT_CLASS} .${ProgremEditorComponent.COLORER_FUNC_CLASS} textarea`);
        if (element)
            this.colorerProgremTextarea = element;
        element = document.querySelector(`.${ProgremEditorComponent.COMPONENT_CLASS} .${ProgremEditorComponent.CODE_LIBRE_CLASS} textarea`);
        if (element)
            this.codeLibreTextarea = element;
        element = document.querySelector(`.${ProgremEditorComponent.COMPONENT_CLASS} .${ProgremEditorComponent.REFRESH_ACTION_CLASS}`);
        this.refreshObservable$ = rxjs_1.Observable.fromEvent(element, 'click');
        this.attached = this.initProgremTextarea !== undefined && this.colorerProgremTextarea !== undefined && this.codeLibreTextarea !== undefined && this.refreshObservable$ !== undefined;
    }
    checkIsAttached() {
        if (!this.attached) {
            throw new Error('ProgremEditorComponent is not attached !');
        }
    }
    loadProgrem(progrem) {
        this.checkIsAttached();
        let funcBodyBlock = progrem.initialiserProgremFunction().functionRootNode.body;
        let funcBodyCode = escodegen_1.generate(funcBodyBlock);
        let cleanedCode = funcBodyCode.substring(1, funcBodyCode.length - 2);
        this.initProgremTextarea.innerHTML = cleanedCode;
        funcBodyBlock = progrem.colorerProgremFunction().functionRootNode.body;
        funcBodyCode = escodegen_1.generate(funcBodyBlock);
        cleanedCode = funcBodyCode.substring(1, funcBodyCode.length - 2);
        this.colorerProgremTextarea.innerHTML = cleanedCode;
    }
    buildProgrem() {
        let colorerProgremFunc = `
        function colorerProgrem(colonne, ligne, frame, contexte) {
            ${this.colorerProgremTextarea.value}
        }
        `;
        let initProgremFunc = `
        function initialiserProgrem(config, initContexte) {
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
    bindRefresh(action) {
        this.refreshObservable$.subscribe(event => {
            action(this.buildProgrem());
        });
    }
}
ProgremEditorComponent.COMPONENT_CLASS = 'progrem-editor-component';
ProgremEditorComponent.INIT_FUNC_CLASS = 'init-progrem-editor';
ProgremEditorComponent.COLORER_FUNC_CLASS = 'colorer-progrem-editor';
ProgremEditorComponent.CODE_LIBRE_CLASS = 'code-libre-editor';
ProgremEditorComponent.REFRESH_ACTION_CLASS = 'refresh-action';
exports.ProgremEditorComponent = ProgremEditorComponent;


/***/ }),

/***/ "DKfW":
/*!********************************!*\
  !*** ./src/core/HtmlHelper.ts ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class HtmlHelper {
    static addClasses(elt, classes) {
        if (typeof classes === 'string') {
            classes.split(' ').forEach(c => elt.classList.add(c));
        }
        if (Array.isArray(classes)) {
            classes.forEach(c => elt.classList.add(c));
        }
    }
    /**
     * Test an element and it's hierarchy. Return false when the test fail for an element.
     *
     * @param element
     * @param test
     */
    static testHierachy(element, test) {
        while (element.parentElement) {
            console.log('testHierachy:', element);
            let value = test(element);
            if (!value) {
                return false;
            }
            element = element.parentElement;
        }
        return true;
    }
    static span(classes, content) {
        return HtmlHelper.tag('span', classes, content);
    }
    static p(classes, content) {
        return HtmlHelper.tag('p', classes, content);
    }
    static div(classes, content) {
        return HtmlHelper.tag('div', classes, content);
    }
    static canvas(classes, content) {
        return HtmlHelper.tag('canvas', classes, content);
    }
    static tag(tagName, classes, content) {
        let elt = document.createElement(tagName);
        if (classes) {
            HtmlHelper.addClasses(elt, classes);
        }
        if (typeof content === 'string') {
            elt.innerText = content;
        }
        else if (content instanceof HTMLElement) {
            elt.appendChild(content);
        }
        else if (Array.isArray(content)) {
            content.forEach(c => {
                if (typeof c === 'string') {
                    elt.innerHTML += c;
                }
                else if (c) {
                    elt.appendChild(c);
                }
                else {
                    console.log('Unable to add content:', c);
                }
            });
        }
        return elt;
    }
    static defineCssRules(id, cssRules) {
        let cssId = 'css-' + id;
        let styleElement = document.getElementById(cssId);
        if (!styleElement) {
            styleElement = document.createElement('style');
        }
        styleElement.id = cssId;
        /* add style rules to the style element */
        styleElement.appendChild(document.createTextNode(cssRules));
        /* attach the style element to the document head */
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
}
exports.HtmlHelper = HtmlHelper;


/***/ }),

/***/ "Fc6L":
/*!********************************************!*\
  !*** ./src/esprima/BasicEsprimaProgrem.ts ***!
  \********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const esprima_1 = __webpack_require__(/*! esprima */ "+U4B");
const esprima_walk_1 = __webpack_require__(/*! esprima-walk */ "DEE3");
const escodegen_1 = __webpack_require__(/*! escodegen */ "aMAw");
const EsprimaHelper_1 = __webpack_require__(/*! ./EsprimaHelper */ "rlvf");
const CodeService_1 = __webpack_require__(/*! ../core/CodeService */ "gYsH");
class BasicEsprimaCodeIterator {
    constructor(rootNode, state) {
        this.rootNode = rootNode;
        this.state = state;
        this.stack = [];
        this.returnValue = null;
        this.finished = false;
        this.stack.push(rootNode);
    }
    declareProgremArguments() {
        let _colonne = this.state.colonne;
        let _ligne = this.state.ligne;
        let _frame = this.state.frame;
        let _contexte = this.state.contexte;
        this.state.eval('var colonne = ' + _colonne + ', ligne = ' + _ligne + ', frame = ' + _frame + ';');
        this.state.eval('var contexte = ' + JSON.stringify(_contexte));
    }
    executeNext() {
        do {
            // Get the first node on the stack
            let node = this.stack.shift();
            //console.log('Node:', node);
            if (!node) {
                throw new Error('Stack should not be empty !');
            }
            var stmt;
            switch (node.type) {
                case 'FunctionDeclaration':
                    let func = node;
                    this.stack.unshift(func.body);
                    this.declareProgremArguments();
                    return CodeService_1.CodeService.progremFactory.buildVerse(func);
                    break;
                case 'BlockStatement':
                    let block = node;
                    block.body.slice().reverse().map(x => {
                        //console.log('BlockStatement unshifting:', x);
                        this.stack.unshift(x);
                    });
                    break;
                case 'IfStatement':
                    stmt = node;
                    let testCode = escodegen_1.generate(stmt.test);
                    let testResult = this.state.eval(testCode);
                    //console.log('IfStatement test evaluate to: ', testResult);
                    if (testResult) {
                        //console.log('Then unshifting:', stmt.consequent);
                        this.stack.unshift(stmt.consequent);
                    }
                    else {
                        if (stmt.alternate) {
                            //console.log('Else unshifting:', stmt.alternate);
                            this.stack.unshift(stmt.alternate);
                        }
                    }
                    return CodeService_1.CodeService.progremFactory.buildVerse(stmt);
                case 'ReturnStatement':
                    stmt = node;
                    this.returnValue = this.state.eval(escodegen_1.generate(stmt.argument));
                    this.finished = true;
                    return CodeService_1.CodeService.progremFactory.buildVerse(stmt);
                default:
                    //console.log('Node:', node);
                    let code = escodegen_1.generate(node);
                    //console.log('Generated code:', code);
                    let evalResult = this.state.eval(code);
                    //console.log('Evaluate to:', evalResult);
                    return CodeService_1.CodeService.progremFactory.buildVerse(node);
            }
        } while (this.stack.length > 0);
        throw new Error('Iterator has no more code to execute !');
    }
    hasNext() {
        if (this.finished) {
            return false;
        }
        let nodes = this.stack.slice(0);
        while (nodes.length > 0) {
            let node = nodes.shift();
            if (node) {
                if (node.type !== 'BlockStatement') {
                    return true;
                }
                else {
                    let blocks = [];
                    let block = node;
                    blocks.push(block);
                    // Parsours recursivement les blocks à la recherche de noeud qui ne sont pas des blocks
                    let hasNext = false;
                    while (!hasNext && blocks.length > 0) {
                        let b = blocks.shift();
                        if (b) {
                            b.body.map(x => {
                                if (x.type !== 'BlockStatement') {
                                    hasNext = true;
                                }
                                else {
                                    blocks.push(x);
                                }
                            });
                        }
                    }
                    return hasNext;
                }
            }
        }
        return false;
    }
}
class BasicEsprimaProgrem {
    constructor(code) {
        let config = {
            comment: true,
        };
        this.esprimaProgram = esprima_1.parseModule(code, config);
        this.initCouplet = this.walkProgremCouplet('initialiserProgrem');
        this.colorerCouplet = this.walkProgremCouplet('colorerProgrem');
    }
    walkProgremCouplet(functionName) {
        var funcNode = null;
        var verses = [];
        esprima_walk_1.walkAddParent(this.esprimaProgram, node => {
            if (node.type === 'FunctionDeclaration' && node.id && node.id.name === functionName) {
                funcNode = node;
            }
            if (funcNode && EsprimaHelper_1.EsprimaHelper.isChildNodeOf(node, funcNode)) { // && EsprimaHelper.isNotChildNodeOf(node, verses)
                if (node.type === 'FunctionDeclaration'
                    || node.type === 'VariableDeclaration'
                    || node.type === 'ExpressionStatement'
                    || node.type === 'ReturnStatement'
                    || node.type === 'IfStatement') {
                    verses.push(node);
                }
            }
        });
        if (funcNode) {
            verses.unshift(funcNode);
            return CodeService_1.CodeService.progremFactory.buildCouplet(funcNode, verses);
        }
        throw new Error(`Impossible de trouver la fonction ${functionName}() !`);
    }
    initialiserProgremFunction() {
        return this.initCouplet;
    }
    colorerProgremFunction() {
        return this.colorerCouplet;
    }
    iterator(state) {
        return new BasicEsprimaCodeIterator(this.colorerProgremFunction().functionRootNode, state);
    }
}
exports.BasicEsprimaProgrem = BasicEsprimaProgrem;
class BasicEsprimaProgremFactory {
    buildProgrem(code) {
        if (!code) {
            throw new Error('Impossible to build Progrem without code !');
        }
        return new BasicEsprimaProgrem(code);
    }
    buildCouplet(node, verses) {
        if (!node) {
            throw new Error('Impossible to build empty Couplet !');
        }
        let esprimaVerses = verses.map(this.buildVerse);
        let couplet = {
            functionRootNode: node,
            verses: esprimaVerses
        };
        //console.log('Built couplet:', couplet);
        return couplet;
    }
    buildVerse(node) {
        if (!node) {
            throw new Error('Impossible to build empty Verse !');
        }
        let code = node;
        if (node.type === 'IfStatement') {
            code = node.test;
        }
        let verse = {
            node: node,
            code: code
        };
        return verse;
    }
}
exports.BasicEsprimaProgremFactory = BasicEsprimaProgremFactory;


/***/ }),

/***/ "Js6l":
/*!*********************************!*\
  !*** ./src/core/EvalService.ts ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class EvalScope {
    constructor() {
        // See http://perfectionkills.com/global-eval-what-are-the-options/
        // Will return an eval able to evaluate js code in the global scope.
        this.globalEval = (function () {
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
                return function (expression) {
                    return (1, eval)(expression);
                };
            }
            // @ts-ignore
            else if (typeof window.execScript !== 'undefined') {
                // if `window.execScript exists`, use it
                return function (expression) {
                    // @ts-ignore
                    return window.execScript(expression);
                };
            }
            // otherwise, globalEval is `undefined` since nothing is returned
            return (expr) => { throw new Error('No global eval available !'); };
        })();
    }
}
exports.EvalScope = EvalScope;


/***/ }),

/***/ "M25W":
/*!***************************************!*\
  !*** ./src/core/SchedulingService.ts ***!
  \***************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = __webpack_require__(/*! ./Types */ "XyZ9");
class SimpleProgremScheduler {
    constructor(config, code) {
        this.config = config;
        this.code = code;
        this.codeIterator = null;
        this.startIteratingCodeListeners = [];
        this.codeExecutionListeners = [];
        this.gridChangeListeners = [];
        this.lineChangeListeners = [];
        this.frameChangeListeners = [];
        this.paintingListeners = [];
        this.endAnimationListeners = [];
        this.tempo = Types_1.ProgremTempo.ByLine;
        this.state = this.reset();
    }
    subscribeStartIteratingCode(listener) {
        console.log('Adding StartIteratingCodeListener:', listener);
        let listeners = this.startIteratingCodeListeners;
        listeners.push(listener);
        let sub = {
            unsubscribe() {
                listeners.find((l, i) => {
                    if (l === listener) {
                        listeners.splice(i, 1);
                    }
                });
            }
        };
        return sub;
    }
    subscribeCodeExecution(listener) {
        console.log('Adding CodeExecutionListener:', listener);
        let listeners = this.codeExecutionListeners;
        listeners.push(listener);
        let sub = {
            unsubscribe() {
                listeners.find((l, i) => {
                    if (l === listener) {
                        listeners.splice(i, 1);
                    }
                });
            }
        };
        return sub;
    }
    subscribeGridChange(listener) {
        console.log('Adding GridChangeListener:', listener);
        let listeners = this.gridChangeListeners;
        listeners.push(listener);
        let sub = {
            unsubscribe() {
                listeners.find((l, i) => {
                    if (l === listener) {
                        listeners.splice(i, 1);
                    }
                });
            }
        };
        return sub;
    }
    subscribeLineChange(listener) {
        console.log('Adding LineChangeListener:', listener);
        let listeners = this.lineChangeListeners;
        listeners.push(listener);
        let sub = {
            unsubscribe() {
                listeners.find((l, i) => {
                    if (l === listener) {
                        listeners.splice(i, 1);
                    }
                });
            }
        };
        return sub;
    }
    subscribeFrameChange(listener) {
        console.log('Adding FrameChangeListener:', listener);
        let listeners = this.frameChangeListeners;
        listeners.push(listener);
        let sub = {
            unsubscribe() {
                listeners.find((l, i) => {
                    if (l === listener) {
                        listeners.splice(i, 1);
                    }
                });
            }
        };
        return sub;
    }
    subscribePainting(listener) {
        console.log('Adding PaintingListener:', listener);
        let listeners = this.paintingListeners;
        listeners.push(listener);
        let sub = {
            unsubscribe() {
                listeners.find((l, i) => {
                    if (l === listener) {
                        listeners.splice(i, 1);
                    }
                });
            }
        };
        return sub;
    }
    subscribeEndAnimation(listener) {
        console.log('Adding EndAnimationListener:', listener);
        let listeners = this.endAnimationListeners;
        listeners.push(listener);
        let sub = {
            unsubscribe() {
                listeners.find((l, i) => {
                    if (l === listener) {
                        listeners.splice(i, 1);
                    }
                });
            }
        };
        return sub;
    }
    reset() {
        let initialContexte = {};
        // Call just evaluated initialiserProgrem function
        // @ts-ignore
        initialiserProgrem(this.config, initialContexte);
        console.log('Loaded initial contexte: ', initialContexte);
        let state = new Types_1.ProgremState(0, 0, 0, initialContexte, null);
        return state;
    }
    current() {
        return this.state;
    }
    next() {
        if (!this.state)
            throw new Error('Inconsistent Progrem state !');
        //console.log(this.state);
        if (this.tempo === Types_1.ProgremTempo.ByVerse) {
            if (this.codeIterator == null) {
                this.codeIterator = this.code.iterator(this.state);
                this.startIteratingCodeListeners.map(l => l.fireStartIteratingCode(this.state));
            }
            //console.log('hasNext:', this.codeIterator.hasNext());
            if (this.codeIterator.hasNext()) {
                let verse = this.codeIterator.executeNext();
                let newState = new Types_1.ProgremState(this.state.colonne, this.state.ligne, this.state.frame, this.state.contexte, verse);
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
        let bufferedStates = [];
        do {
            let _colonne = this.state.colonne;
            let _ligne = this.state.ligne;
            let _frame = this.state.frame;
            _colonne++;
            notifyPixelChange = true;
            if (_colonne >= this.config.nombreColonnes) {
                _colonne = 0;
                _ligne++;
                notifyLineChange = true;
            }
            if (_ligne >= this.config.nombreLignes) {
                _ligne = 0;
                _frame++;
                notifyFrameChange = true;
            }
            if (_frame >= this.config.nombreFrames) {
                _frame = 0;
                notifyEndAnimation = true;
            }
            let newState = new Types_1.ProgremState(_colonne, _ligne, _frame, this.state.contexte, null);
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
        } while (this.tempo === Types_1.ProgremTempo.ByLine && !notifyLineChange || this.tempo === Types_1.ProgremTempo.ByFrame && !notifyFrameChange);
        this.codeIterator = null;
        this.paintingListeners.map(l => l.firePainting());
        return bufferedStates;
    }
    getProgrem() {
        return this.code;
    }
}
var SchedulingService;
(function (SchedulingService) {
    function buildProgremScheduler(config, code, tempo) {
        let scheduler = new SimpleProgremScheduler(config, code);
        scheduler.tempo = tempo;
        return scheduler;
    }
    SchedulingService.buildProgremScheduler = buildProgremScheduler;
})(SchedulingService = exports.SchedulingService || (exports.SchedulingService = {}));


/***/ }),

/***/ "Nf4G":
/*!*******************************************************************************!*\
  !*** ./src/components/progremInspector/EsprimaProgremInspectorHtmlFactory.ts ***!
  \*******************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HtmlHelper_1 = __webpack_require__(/*! ../../core/HtmlHelper */ "DKfW");
const EsprimaHelper_1 = __webpack_require__(/*! ../../esprima/EsprimaHelper */ "rlvf");
const escodegen_1 = __webpack_require__(/*! escodegen */ "aMAw");
class EsprimaProgremInspectorHtmlFactory {
    constructor(couplet, decorator) {
        this.couplet = couplet;
        this.decorator = decorator;
        this.htmlVersesMap = new Map();
    }
    buildCouplet() {
        let htmlCouplet = this.buildNode(this.couplet.functionRootNode);
        htmlCouplet.classList.add('progrem-inspector-component');
        return htmlCouplet;
    }
    getHtmlVerse(verse) {
        if (this.htmlVersesMap.size === 0) {
            throw new Error('IllegalStateError: couplet must be built before calling getHtmlVerse() !');
        }
        let htmlElement = this.htmlVersesMap.get(verse.node);
        if (!htmlElement) {
            console.log('No HTMLElement found matching verse:', verse, '!');
            throw new Error(`No HTMLElement found matching supplied verse !`);
        }
        return htmlElement;
    }
    /**
     * Build Node applying decorators.
     *
     * @param node the node for which to produce HTML
     * @param siblings the nodes to add as siblings of the node
     */
    buildNode(node) {
        if (!node) {
            return HtmlHelper_1.HtmlHelper.span('empty', '');
        }
        let siblings = [];
        let htmlOutput = this.buildNodeInternal(node, siblings);
        htmlOutput = this.decorator.decorate(node, htmlOutput);
        let matchingVerse = this.couplet.verses.find(v => v.node === node);
        if (matchingVerse) {
            htmlOutput = this.encapsulateNodeInVerseContainer(htmlOutput);
            // This node is the root node of a Verse
            this.htmlVersesMap.set(matchingVerse.node, htmlOutput);
        }
        if (siblings.length > 0) {
            // If siblings, build each sibling
            htmlOutput = HtmlHelper_1.HtmlHelper.span('sibling-container', htmlOutput);
            while (siblings.length > 0) {
                let sibling = siblings.shift();
                if (sibling) {
                    //let siblingOut = this.buildNode(sibling);
                    htmlOutput.appendChild(sibling);
                }
            }
        }
        return htmlOutput;
    }
    encapsulateNodeInVerseContainer(htmlElt) {
        let content = HtmlHelper_1.HtmlHelper.span('verse-content', htmlElt);
        let container = HtmlHelper_1.HtmlHelper.span('verse verse-container', content);
        return container;
    }
    /**
     * Build node.
     * @param node
     */
    buildNodeInternal(node, siblings) {
        //console.log('Building node', node, '...');
        switch (node.type) {
            case 'FunctionDeclaration':
                return this.buildFunctionDeclaration(node, siblings);
            case 'BlockStatement':
                return this.buildBlockStatement(node);
            case 'IfStatement':
                return this.buildIfStatement(node, siblings);
            case 'VariableDeclaration':
                return this.buildVariableDeclaration(node);
            case 'VariableDeclarator':
                return this.buildVariableDeclarator(node);
            case 'AssignmentExpression':
                return this.buildAssignmentExpression(node);
            case 'BinaryExpression':
                return this.buildBinaryExpression(node);
            case 'ExpressionStatement':
                return this.buildExpressionStatement(node);
            case 'ReturnStatement':
                return this.buildReturnStatement(node);
            case 'Identifier':
                return this.buildIdentifier(node);
            case 'MemberExpression':
                return this.buildMemberExpression(node);
            default:
                return this.buildDefault(node);
        }
    }
    buildFunctionDeclaration(node, siblings) {
        let n = node;
        let declStartItems;
        if (n.id) {
            let funcId = HtmlHelper_1.HtmlHelper.span('func-id', n.id.name);
            declStartItems = ['function ', funcId, ' ( '];
        }
        else {
            declStartItems = ['function ( ']; // + func.params.map(x => x.name).join(', ') + ' ) {';
        }
        let paramCount = n.params.length;
        n.params.forEach((param, i) => {
            let varName = EsprimaHelper_1.EsprimaHelper.patternToString(param);
            let funcParam = this.buildNode(param); //HtmlHelper.span('func-param', varName);
            declStartItems.push(funcParam);
            if (i < paramCount - 1) {
                declStartItems.push(', ');
            }
        });
        declStartItems.push(' ) {');
        let declStart = HtmlHelper_1.HtmlHelper.span('func-start', declStartItems);
        let funcBody = this.buildNode(n.body);
        let declEnd = HtmlHelper_1.HtmlHelper.span('func-end', '}');
        declEnd = this.encapsulateNodeInVerseContainer(declEnd);
        //let decl = HtmlHelper.span('func-declaration', [declStart, funcBody, declEnd]);
        let decl = HtmlHelper_1.HtmlHelper.span('func-declaration', declStart);
        siblings.push(funcBody);
        siblings.push(declEnd);
        return decl;
    }
    buildBlockStatement(node) {
        let n = node;
        let bodyStatements = n.body.map(statement => this.buildNode(statement));
        return HtmlHelper_1.HtmlHelper.span('block', bodyStatements);
    }
    buildIfStatement(node, siblings) {
        let n = node;
        let content = [];
        let test = this.buildNode(n.test);
        let ifStartText = ['if ( ', test, ' ) {'];
        let ifStart = HtmlHelper_1.HtmlHelper.span('statement if-statement-start', ifStartText);
        content.push(ifStart);
        let thenBlock = this.buildNode(n.consequent);
        let ifThen = HtmlHelper_1.HtmlHelper.span('statement if-block-then', thenBlock);
        content.push(ifThen);
        siblings.push(thenBlock);
        if (n.alternate) {
            let ifElseDecl = HtmlHelper_1.HtmlHelper.span('statement if-statement-else', '} else {');
            ifElseDecl = this.encapsulateNodeInVerseContainer(ifElseDecl);
            content.push(ifElseDecl);
            siblings.push(ifElseDecl);
            let elseBlock = this.buildNode(n.alternate);
            let ifElse = HtmlHelper_1.HtmlHelper.span('statement if-block-else', elseBlock);
            content.push(ifElse);
            siblings.push(ifElse);
        }
        let ifEnd = HtmlHelper_1.HtmlHelper.span('statement if-statement-end', '}');
        ifEnd = this.encapsulateNodeInVerseContainer(ifEnd);
        content.push(ifEnd);
        siblings.push(ifEnd);
        //let container = HtmlHelper.span('statement if-statement', content);
        return ifStart;
    }
    buildVariableDeclaration(node) {
        let n = node;
        let declarations = n.declarations.map(d => this.buildNode(d));
        let container = HtmlHelper_1.HtmlHelper.span('declaration variable-declaration');
        container.innerHTML = n.kind + ' ';
        declarations.forEach(d => container.appendChild(d));
        return container;
    }
    buildVariableDeclarator(node) {
        let n = node;
        let leftPart = this.buildNode(n.id);
        let container;
        if (n.init) {
            let assignPart = HtmlHelper_1.HtmlHelper.span('operator assign-operator', '=');
            let right = this.buildNode(n.init);
            let rightPart = HtmlHelper_1.HtmlHelper.span('variable-value', right);
            container = HtmlHelper_1.HtmlHelper.span('expression variable-declarator', [leftPart, assignPart, rightPart]);
        }
        else {
            container = HtmlHelper_1.HtmlHelper.span('expression variable-declarator', leftPart);
        }
        return container;
    }
    buildAssignmentExpression(node) {
        let n = node;
        let left = this.buildNode(n.left);
        let leftPart = HtmlHelper_1.HtmlHelper.span('variable-id', left);
        let assignPart = HtmlHelper_1.HtmlHelper.span('operator assign-operator', '=');
        let right = this.buildNode(n.right);
        let rightPart = HtmlHelper_1.HtmlHelper.span('variable-value', right);
        let container = HtmlHelper_1.HtmlHelper.span('expression assignment-expression', [leftPart, assignPart, rightPart]);
        return container;
    }
    buildBinaryExpression(node) {
        let n = node;
        let left = this.buildNode(n.left);
        let leftPart = HtmlHelper_1.HtmlHelper.span('expression', left);
        let operatorPart = HtmlHelper_1.HtmlHelper.span('operator expression-operator', n.operator);
        let right = this.buildNode(n.right);
        let rightPart = HtmlHelper_1.HtmlHelper.span('expression', right);
        let container = HtmlHelper_1.HtmlHelper.span('expression binary-expression', [leftPart, operatorPart, rightPart]);
        return container;
    }
    buildExpressionStatement(node) {
        let n = node;
        let code = this.buildNode(n.expression);
        let container = HtmlHelper_1.HtmlHelper.span('statement expression-statement', code);
        return container;
    }
    buildReturnStatement(node) {
        let n = node;
        let arg = this.buildNode(n.argument);
        let container = HtmlHelper_1.HtmlHelper.span('statement return-statement', ['return ', arg]);
        return container;
    }
    buildIdentifier(node) {
        let n = node;
        let container = HtmlHelper_1.HtmlHelper.span('identifier', EsprimaHelper_1.EsprimaHelper.patternToString(n));
        return container;
    }
    buildMemberExpression(node) {
        let n = node;
        let object = this.buildNode(n.object);
        let property = this.buildNode(n.property);
        let container = HtmlHelper_1.HtmlHelper.span('expression member-expression', [object, '.', property]);
        return container;
    }
    buildDefault(node) {
        //console.log('default:', node);
        let code = escodegen_1.generate(node);
        let container = HtmlHelper_1.HtmlHelper.span('default-' + node.type, code);
        return container;
    }
}
exports.EsprimaProgremInspectorHtmlFactory = EsprimaProgremInspectorHtmlFactory;


/***/ }),

/***/ "OFPY":
/*!**********************************************************************!*\
  !*** ./src/components/progremInspector/ProgremInspectorComponent.ts ***!
  \**********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ProgremInspectorComponent {
    constructor(scheduler, htmlFactory) {
        this.scheduler = scheduler;
        this.htmlFactory = htmlFactory;
        this.executingElements = [];
        this.executedElements = [];
        scheduler.subscribeCodeExecution(this);
        scheduler.subscribeGridChange(this);
    }
    renderHtml() {
        let htmlComponent = this.htmlFactory.buildCouplet();
        return htmlComponent;
    }
    fireCodeExecution(oldState, newState) {
        if (!newState.verse) {
            return;
        }
        let htmlVerse = this.htmlFactory.getHtmlVerse(newState.verse);
        if (htmlVerse) {
            htmlVerse.classList.add(ProgremInspectorComponent.EXECUTING_CLASS);
        }
        while (this.executingElements.length > 0) {
            let elt = this.executingElements.pop();
            if (elt) {
                this.executedElements.push(elt);
                elt.classList.remove(ProgremInspectorComponent.EXECUTING_CLASS);
                elt.classList.add(ProgremInspectorComponent.EXECUTED_CLASS);
            }
        }
        if (!htmlVerse) {
            return;
        }
        this.executingElements.push(htmlVerse);
        htmlVerse.classList.add(ProgremInspectorComponent.EXECUTING_CLASS);
    }
    fireGridChange(state) {
        while (this.executingElements.length > 0) {
            let elt = this.executingElements.pop();
            if (elt) {
                elt.classList.remove(ProgremInspectorComponent.EXECUTED_CLASS);
                elt.classList.remove(ProgremInspectorComponent.EXECUTING_CLASS);
            }
        }
        while (this.executedElements.length > 0) {
            let elt = this.executedElements.pop();
            if (elt) {
                elt.classList.remove(ProgremInspectorComponent.EXECUTED_CLASS);
                elt.classList.remove(ProgremInspectorComponent.EXECUTING_CLASS);
            }
        }
    }
}
ProgremInspectorComponent.EXECUTING_CLASS = 'verse-executing';
ProgremInspectorComponent.EXECUTED_CLASS = 'verse-executed';
exports.ProgremInspectorComponent = ProgremInspectorComponent;


/***/ }),

/***/ "W4hG":
/*!*****************************************************************************!*\
  !*** ./src/components/variableScope/EsprimaVariableScopeStyleDecorators.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ColorService_1 = __webpack_require__(/*! ../../core/ColorService */ "voyP");
const HtmlHelper_1 = __webpack_require__(/*! ../../core/HtmlHelper */ "DKfW");
class ColorVariableScopeDecorator {
    constructor() {
        this.variableMap = new Map();
        this.colorProvider = ColorService_1.ColorService.colorProvideractory.build();
    }
    decorate(varId, element) {
        let varIndex = this.variableMap.get(varId);
        if (!varIndex) {
            varIndex = this.variableMap.size + 1;
            this.variableMap.set(varId, varIndex);
        }
        element.classList.add('variable-hint');
        element.classList.add('variable-' + varIndex);
        let container = HtmlHelper_1.HtmlHelper.span('variable-hint-container', element);
        return container;
    }
    buildStyleSheet() {
        let style = '';
        //console.log('variable count:', this.variableMap.size);
        this.variableMap.forEach((index, id) => {
            let color = this.colorProvider.hashStringToColor(id, 16); //this.variableMap.size
            //console.log('building color #', id, '=>', color);
            style += `
                .variable-scope-component .variable-hint-container {
                    margin: 0.8em 0 0.8em 0;
                    display: block;
                }
                .variable-scope-component .variable-hint {
                    padding: 0.1em 0.5em 0.1em 0.5em;
                    border: 1px solid black;
                    border-radius: 0.8em;
                }
                .variable-scope-component .variable-${index}, 
                .variable-scope-component .variable-${index} {
                    background-color: ${color};
                }
            `;
        });
        return style;
    }
}
exports.ColorVariableScopeDecorator = ColorVariableScopeDecorator;
class PadVerseDecorator {
    decorate(node, element) {
        if (node.type === 'BlockStatement') {
            element.classList.add('code-padding');
        }
        return element;
    }
    buildStyleSheet() {
        return `
        .code-padding {
            margin-left: 32px;
        }
        `;
    }
}
exports.PadVerseDecorator = PadVerseDecorator;


/***/ }),

/***/ "WO1K":
/*!************************************!*\
  !*** ./src/core/ProgremService.ts ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const escodegen_1 = __webpack_require__(/*! escodegen */ "aMAw");
const SchedulingService_1 = __webpack_require__(/*! ./SchedulingService */ "M25W");
const ProgremInspectorComponent_1 = __webpack_require__(/*! ../components/progremInspector/ProgremInspectorComponent */ "OFPY");
const Types_1 = __webpack_require__(/*! ./Types */ "XyZ9");
const EsprimaProgremInspectorStyleDecorators_1 = __webpack_require__(/*! ../components/progremInspector/EsprimaProgremInspectorStyleDecorators */ "+Su8");
const HtmlHelper_1 = __webpack_require__(/*! ./HtmlHelper */ "DKfW");
const EsprimaProgremInspectorHtmlFactory_1 = __webpack_require__(/*! ../components/progremInspector/EsprimaProgremInspectorHtmlFactory */ "Nf4G");
const CodeService_1 = __webpack_require__(/*! ./CodeService */ "gYsH");
const ProgremGridComponent_1 = __webpack_require__(/*! ../components/progremGrid/ProgremGridComponent */ "xzS5");
const VariableScopeComponent_1 = __webpack_require__(/*! ../components/variableScope/VariableScopeComponent */ "7BoH");
const EsprimaVariableScopeHtmlFactory_1 = __webpack_require__(/*! ../components/variableScope/EsprimaVariableScopeHtmlFactory */ "X7+x");
const EsprimaVariableScopeStyleDecorators_1 = __webpack_require__(/*! ../components/variableScope/EsprimaVariableScopeStyleDecorators */ "W4hG");
const ProgremEditorComponent_1 = __webpack_require__(/*! ../components/progremEditor/ProgremEditorComponent */ "ABAx");
const rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
class ProgremHelper {
}
exports.ProgremHelper = ProgremHelper;
var ProgremService;
(function (ProgremService) {
    var previousRepaintTime = 0;
    var scheduler;
    var progremAnimationSpeed = 2;
    var progremAnimationIntervals = [60000, 5000, 1000, 500, 100, 10, 1];
    var progremMode = Types_1.ProgremTempo.ByLine;
    function buildDefaultConfig() {
        return new Types_1.ProgremConfig('Sans titre', 17, 17, 1);
    }
    ProgremService.buildDefaultConfig = buildDefaultConfig;
    function currentScheduler() {
        return scheduler;
    }
    ProgremService.currentScheduler = currentScheduler;
    function buildProgremGridComponent(screenConfig, progremConfig, container) {
        container.innerHTML = '';
        let progremGridComponent = new ProgremGridComponent_1.ProgremGridComponent(screenConfig, progremConfig, scheduler, document);
        let progremGridHtml = progremGridComponent.renderHtml();
        container.appendChild(progremGridHtml);
    }
    ProgremService.buildProgremGridComponent = buildProgremGridComponent;
    function buildProgremInspectorComponent(progremCode, container) {
        container.innerHTML = '';
        let progremCouplet = progremCode.colorerProgremFunction();
        let progremInspectorDecorators = new Types_1.StyleDecoratorAggregation([
            new EsprimaProgremInspectorStyleDecorators_1.PadVerseDecorator(),
            new EsprimaProgremInspectorStyleDecorators_1.ColorVerseVariableDecorator(),
        ]);
        let progremInspectorFactory = new EsprimaProgremInspectorHtmlFactory_1.EsprimaProgremInspectorHtmlFactory(progremCouplet, progremInspectorDecorators);
        let progremInspectorView = new ProgremInspectorComponent_1.ProgremInspectorComponent(scheduler, progremInspectorFactory);
        //console.log('codeElement', codeElement);
        let progremInspectorHtml = progremInspectorView.renderHtml();
        container.appendChild(progremInspectorHtml);
        let decoratorStyle = progremInspectorDecorators.buildStyleSheet();
        //console.log('decoratorStyle:', decoratorStyle)
        HtmlHelper_1.HtmlHelper.defineCssRules('progrem-inspector-component', decoratorStyle);
    }
    ProgremService.buildProgremInspectorComponent = buildProgremInspectorComponent;
    function buildVariableScopeComponent(progremCode, container) {
        container.innerHTML = '';
        let progremCouplet = progremCode.colorerProgremFunction();
        let variableScopeDecorators = new Types_1.StyleDecoratorAggregation([
            new EsprimaVariableScopeStyleDecorators_1.ColorVariableScopeDecorator()
        ]);
        let htmlFactory = new EsprimaVariableScopeHtmlFactory_1.EsprimaVariableScopeHtmlFactory(progremCouplet, variableScopeDecorators, scheduler);
        let variableScopeComponent = new VariableScopeComponent_1.VariableScopeComponent(scheduler, htmlFactory);
        let variableScopeHtml = variableScopeComponent.renderHtml();
        container.appendChild(variableScopeHtml);
        let decoratorStyle = variableScopeDecorators.buildStyleSheet();
        //console.log('decoratorStyle:', decoratorStyle)
        HtmlHelper_1.HtmlHelper.defineCssRules('variable-scope-component', decoratorStyle);
    }
    ProgremService.buildVariableScopeComponent = buildVariableScopeComponent;
    function buildProgremEditorComponent(progremCode, screenConfig) {
        let progremEditorComponent = new ProgremEditorComponent_1.ProgremEditorComponent();
        progremEditorComponent.attach(document);
        progremEditorComponent.loadProgrem(progremCode);
        progremEditorComponent.bindRefresh(code => {
            console.log('new progrem code:', code);
            let progremCode = CodeService_1.CodeService.progremFactory.buildProgrem(code);
            let scriptElement = document.querySelector('.progrem-script-tag');
            scriptElement.remove();
            scriptElement = document.createElement('script');
            scriptElement.type = 'text/javascript';
            scriptElement.classList.add('progrem-script-tag');
            scriptElement.text = code;
            let bodyElement = document.querySelector('body');
            if (bodyElement) {
                bodyElement.appendChild(scriptElement);
            }
            buildProgremViewer(progremCode, screenConfig, buildDefaultConfig());
        });
    }
    ProgremService.buildProgremEditorComponent = buildProgremEditorComponent;
    function buildProgremViewer(progremCode, screenConfig, progremConfig) {
        // Load initProgrem Function code
        let initProgremFunctionCode = escodegen_1.generate(progremCode.initialiserProgremFunction().functionRootNode);
        window.eval(initProgremFunctionCode);
        scheduler = SchedulingService_1.SchedulingService.buildProgremScheduler(progremConfig, progremCode, progremMode);
        const titre = document.querySelector('.titre');
        if (titre) {
            titre.innerHTML = progremConfig.titre;
        }
        let progremGridContainer = document.querySelector('.progrem-grid-component');
        if (progremGridContainer) {
            buildProgremGridComponent(screenConfig, progremConfig, progremGridContainer);
        }
        let progremInspectorContainer = document.querySelector('.progrem-inspector-component');
        if (progremInspectorContainer) {
            buildProgremInspectorComponent(progremCode, progremInspectorContainer);
        }
        let variableScopeContainer = document.querySelector('.variable-scope-component');
        if (variableScopeContainer) {
            buildVariableScopeComponent(progremCode, variableScopeContainer);
        }
    }
    ProgremService.buildProgremViewer = buildProgremViewer;
    function buildControlPanelComponent() {
        let speedControlElement = document.querySelector(`.control-panel-component .speed-selector`);
        speedControlElement.value = String(progremAnimationSpeed);
        let speedSelectorObservable = rxjs_1.Observable.fromEvent(speedControlElement, 'change');
        speedSelectorObservable.subscribe(event => progremAnimationSpeed = Number(event.target.value));
        let modeControlElement = document.querySelector(`.control-panel-component .mode-selector`);
        modeControlElement.value = String(scheduler.tempo);
        let modeSelectorObservable = rxjs_1.Observable.fromEvent(modeControlElement, 'change');
        modeSelectorObservable.subscribe(event => {
            progremMode = Number(event.target.value);
            currentScheduler().tempo = progremMode;
        });
    }
    ProgremService.buildControlPanelComponent = buildControlPanelComponent;
    function buildProgrem(url, screenConfig) {
        let progremConfig = buildDefaultConfig();
        let progremScript = document.createElement('script');
        progremScript.classList.add('progrem-script-tag');
        progremScript.src = url;
        let bodyElement = document.querySelector('body');
        if (bodyElement) {
            bodyElement.appendChild(progremScript);
        }
        console.log('Loading progrem at URL:', url);
        CodeService_1.CodeService.loadProgrem(url).then(code => {
            let progremCode = CodeService_1.CodeService.progremFactory.buildProgrem(code);
            buildProgremViewer(progremCode, screenConfig, progremConfig);
            buildControlPanelComponent();
            buildProgremEditorComponent(progremCode, screenConfig);
            timer(0);
        });
    }
    ProgremService.buildProgrem = buildProgrem;
    function timer(timestamp) {
        window.requestAnimationFrame(timer);
        if (timestamp - previousRepaintTime < progremAnimationIntervals[progremAnimationSpeed]) {
            return;
        }
        previousRepaintTime = timestamp;
        if (scheduler) {
            scheduler.next();
        }
    }
})(ProgremService = exports.ProgremService || (exports.ProgremService = {}));


/***/ }),

/***/ "X7+x":
/*!*************************************************************************!*\
  !*** ./src/components/variableScope/EsprimaVariableScopeHtmlFactory.ts ***!
  \*************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HtmlHelper_1 = __webpack_require__(/*! ../../core/HtmlHelper */ "DKfW");
const EsprimaHelper_1 = __webpack_require__(/*! ../../esprima/EsprimaHelper */ "rlvf");
class EsprimaVariableScopeHtmlFactory {
    constructor(couplet, decorator, scheduler) {
        this.couplet = couplet;
        this.decorator = decorator;
        this.scheduler = scheduler;
        this.varHintByVersesMap = new Map();
        this.varHintUpdaterMap = new Map();
    }
    buildCouplet() {
        let container = HtmlHelper_1.HtmlHelper.span('variable-scope-component');
        // FIXME il faudrait parcourir l'arbre AST avec un walker ou un truc du genre.
        // FIXME gros hack du système de HtmlFactory et de Decorator pour realiser ce composant.
        // Build all VariableHint which will be added in view container one by one by getHtmlVerse()
        this.couplet.verses.forEach(v => {
            let varHints = this.buildVariableHints(v.node);
            let decoratedVarHints = [];
            varHints.forEach((varHint, varName) => {
                let decorated = this.decorator.decorate(varName, varHint);
                decoratedVarHints.push(decorated);
                container.appendChild(decorated);
            });
            this.varHintByVersesMap.set(v.node, decoratedVarHints);
        });
        this.clearView();
        return container;
    }
    getHtmlVerse(verse) {
        if (this.varHintByVersesMap.size === 0 || !verse.node) {
            return;
        }
        let htmlElements = this.varHintByVersesMap.get(verse.node);
        if (!htmlElements || htmlElements.length === 0) {
            return;
        }
        let state = this.scheduler.current();
        let valuesMap = EsprimaHelper_1.EsprimaHelper.getVariableValues(state, verse.node);
        let varHintUpdater = this.varHintUpdaterMap.get(verse.node);
        if (varHintUpdater) {
            varHintUpdater(valuesMap);
        }
        // Show elements
        htmlElements.forEach(hint => hint.classList.remove('hidden'));
        //let verseContainer = HtmlHelper.span('verse-container', htmlElements);
        //return verseContainer;
    }
    clearView() {
        // Hide elements
        this.varHintByVersesMap.forEach(hints => hints.forEach(hint => hint.classList.add('hidden')));
        // Reset value
        this.varHintUpdaterMap.forEach((varHintUpdater, key) => {
            varHintUpdater(new Map());
        });
    }
    /**
     * Build a Variable Hint if the supplied node contains a Variable affectation.
     * @param node
     * @returns an HTMLElement or null if no hint should appear for this node
     */
    buildVariableHints(node) {
        let varNode = EsprimaHelper_1.EsprimaHelper.reduceNodeToVarDeclaration(node);
        if (!varNode) {
            return new Map();
        }
        let varNames = EsprimaHelper_1.EsprimaHelper.getVariableNames(varNode);
        let varHints = varNames.map(varName => {
            let varValue = HtmlHelper_1.HtmlHelper.span('variable-hint-value');
            let varHint = HtmlHelper_1.HtmlHelper.span('variable-hint', [`${varName}: `, varValue]);
            return { varName, varHint, varValue };
        });
        let valUpdater = (valsByVarName) => {
            varHints.forEach(varHint => {
                let val = valsByVarName.get(varHint.varName);
                if (typeof val === 'number') {
                    varHint.varValue.innerText = val.toFixed(2).toString();
                }
                else {
                    varHint.varValue.innerText = val;
                }
            });
        };
        this.varHintUpdaterMap.set(node, valUpdater);
        let varHintsByName = new Map();
        varHints.forEach(varHint => varHintsByName.set(varHint.varName, varHint.varHint));
        return varHintsByName;
    }
}
exports.EsprimaVariableScopeHtmlFactory = EsprimaVariableScopeHtmlFactory;


/***/ }),

/***/ "XyZ9":
/*!***************************!*\
  !*** ./src/core/Types.ts ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EvalService_1 = __webpack_require__(/*! ./EvalService */ "Js6l");
class ProgremConfig {
    constructor(titre, nombreColonnes, nombreLignes, nombreFrames) {
        this.titre = titre;
        this.nombreColonnes = nombreColonnes;
        this.nombreLignes = nombreLignes;
        this.nombreFrames = nombreFrames;
    }
}
exports.ProgremConfig = ProgremConfig;
class ProgremState {
    constructor(colonne, ligne, frame, contexte, verse) {
        this.colonne = colonne;
        this.ligne = ligne;
        this.frame = frame;
        this.contexte = contexte;
        this.verse = verse;
        this.evalScope = new EvalService_1.EvalScope;
    }
    eval(expr) {
        return this.evalScope.globalEval(expr);
    }
}
exports.ProgremState = ProgremState;
;
;
;
;
;
;
;
var ProgremTempo;
(function (ProgremTempo) {
    ProgremTempo[ProgremTempo["ByVerse"] = 0] = "ByVerse";
    ProgremTempo[ProgremTempo["ByPixel"] = 1] = "ByPixel";
    ProgremTempo[ProgremTempo["ByLine"] = 2] = "ByLine";
    ProgremTempo[ProgremTempo["ByFrame"] = 3] = "ByFrame";
})(ProgremTempo = exports.ProgremTempo || (exports.ProgremTempo = {}));
class Subscription {
}
exports.Subscription = Subscription;
class StyleDecoratorAggregation {
    constructor(decorators) {
        this.decorators = decorators;
    }
    decorate(node, element) {
        let temp = element;
        this.decorators.forEach(d => temp = d.decorate(node, temp));
        return temp;
    }
    buildStyleSheet() {
        return this.decorators.map(d => d.buildStyleSheet()).join('\n');
    }
}
exports.StyleDecoratorAggregation = StyleDecoratorAggregation;


/***/ }),

/***/ "gYsH":
/*!*********************************!*\
  !*** ./src/core/CodeService.ts ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BasicEsprimaProgrem_1 = __webpack_require__(/*! ../esprima/BasicEsprimaProgrem */ "Fc6L");
var CodeService;
(function (CodeService) {
    CodeService.progremFactory = new BasicEsprimaProgrem_1.BasicEsprimaProgremFactory();
    function loadProgrem(fileUrl) {
        return new Promise((resolve, reject) => {
            const client = new XMLHttpRequest();
            client.open('GET', fileUrl);
            client.onload = () => {
                let code = client.responseText;
                console.log('CodeService: Progrem loaded successfully.', code);
                resolve(code);
            };
            client.onerror = () => reject(client.statusText);
            client.send();
        });
    }
    CodeService.loadProgrem = loadProgrem;
})(CodeService = exports.CodeService || (exports.CodeService = {}));


/***/ }),

/***/ "iSqq":
/*!***********************************!*\
  !*** ./src/core/ScreenService.ts ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ScreenConfig {
    constructor(boxSize) {
        this.boxSize = boxSize;
    }
}
exports.ScreenConfig = ScreenConfig;
class ScreenService {
    getScreenFrame() {
    }
}
exports.ScreenService = ScreenService;


/***/ }),

/***/ "rlvf":
/*!**************************************!*\
  !*** ./src/esprima/EsprimaHelper.ts ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class EsprimaHelper {
    static patternToString(pattern) {
        var node;
        switch (pattern.type) {
            case 'Identifier':
                node = pattern;
                return node.name;
        }
        throw new Error('Unable to convert pattern of type ' + pattern.type);
    }
    static reduceNodeToVarDeclaration(node) {
        if (node.type === 'VariableDeclaration') {
            let decl = node;
            return decl;
        }
        else if (node.type === 'AssignmentExpression') {
            let expr = node;
            return expr;
        }
        else if (node.type === 'FunctionDeclaration') {
            let func = node;
            return func;
        }
        else {
            for (let p in node) {
                if (p === 'left' || p === 'right' || p === 'argument' || p === 'callee' || p === 'body' || p === 'expression') {
                    //@ts-ignore
                    let child = node[p];
                    let result = EsprimaHelper.reduceNodeToVarDeclaration(child);
                    if (result)
                        return result;
                }
            }
        }
    }
    /**
     * Return variable names of declaration or assignment contained in node.
     *
     * @param node
     */
    static getVariableNames(node) {
        if (node.type === 'VariableDeclaration') {
            let decl = node;
            return decl.declarations.map(d => {
                let varName = EsprimaHelper.patternToString(d.id);
                return varName;
            });
        }
        else if (node.type === 'AssignmentExpression') {
            let decl = node;
            let varName = EsprimaHelper.patternToString(decl.left);
            return [varName];
        }
        else if (node.type === 'FunctionDeclaration') {
            let func = node;
            return func.params.map(p => {
                let varName = EsprimaHelper.patternToString(p);
                return varName;
            });
        }
        return [];
    }
    /**
     * Return variable values of declaration or assignment contained in node.
     * Same as getVariableNames but evaluate variables to discover their values.
     *
     * @param node
     */
    static getVariableValues(state, node) {
        let valuesMap = new Map();
        let varNodes = this.reduceNodeToVarDeclaration(node);
        if (!varNodes) {
            return valuesMap;
        }
        this.getVariableNames(varNodes).map(varName => valuesMap.set(varName, state.eval(varName)));
        return valuesMap;
    }
    static isChildNodeOf(node, parent) {
        if (node.parent === parent) {
            return true;
        }
        else if (!node.parent) {
            return false;
        }
        return EsprimaHelper.isChildNodeOf(node.parent, parent);
    }
    static isNotChildNodeOf(node, parents) {
        if (parents.find(p => p === node.parent)) {
            return false;
        }
        else if (!node.parent) {
            return true;
        }
        return EsprimaHelper.isNotChildNodeOf(node.parent, parents);
    }
}
exports.EsprimaHelper = EsprimaHelper;


/***/ }),

/***/ "voyP":
/*!**********************************!*\
  !*** ./src/core/ColorService.ts ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const js_md5_1 = __webpack_require__(/*! js-md5 */ "gjeX");
class BasicColorProviderFactory {
    build(key) {
        return new BasicColorProvider();
    }
}
exports.BasicColorProviderFactory = BasicColorProviderFactory;
class BasicColorProvider {
    constructor() {
        this.colorMap = new Map();
    }
    hslColor(hue) {
        return 'hsl(' + hue + ', 100%, 80%)';
    }
    hashStringToColor(key, colorCount, shift = 2) {
        var hue = this.colorMap.get(key);
        if (hue)
            return this.hslColor(hue);
        var hash = js_md5_1.create().update(key).toString();
        hue = (parseInt(hash.substring(shift + 0, shift + 1), 16) + 16 * parseInt(hash.substring(shift + 1, shift + 2), 16) + 256 * parseInt(hash.substring(shift + 2, shift + 3), 16));
        hue = Math.floor(hue % colorCount) * 360 / colorCount;
        hue = hue % 360;
        // Color deduplication
        while (!this.colorMap.get(key)) {
            let duplicateColor = false;
            for (let c of this.colorMap.values()) {
                if (Math.abs(c - hue) < Math.floor(180 / colorCount)) {
                    duplicateColor = true;
                    hue += Math.floor(270 / colorCount);
                    hue = hue % 360;
                    break;
                }
            }
            if (!duplicateColor) {
                this.colorMap.set(key, hue);
            }
        }
        //var pastel = 'hsl(' + hue + ', 100%, 87.5%)';
        return this.hslColor(hue);
    }
}
exports.BasicColorProvider = BasicColorProvider;
var ColorService;
(function (ColorService) {
    ColorService.colorProvideractory = new BasicColorProviderFactory();
})(ColorService = exports.ColorService || (exports.ColorService = {}));


/***/ }),

/***/ "xzS5":
/*!************************************************************!*\
  !*** ./src/components/progremGrid/ProgremGridComponent.ts ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HtmlHelper_1 = __webpack_require__(/*! ../../core/HtmlHelper */ "DKfW");
const Rx_1 = __webpack_require__(/*! rxjs/Rx */ "M6kn");
const rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
class ProgremGridComponent {
    constructor(screenConfig, progremConfig, scheduler, document) {
        this.screenConfig = screenConfig;
        this.progremConfig = progremConfig;
        this.scheduler = scheduler;
        this.document = document;
        this.renderingContainer = HtmlHelper_1.HtmlHelper.span('progrem-grid');
        this.subscription = null;
        this.blinkInterval = 200;
        // FIXME: le colorsCache ne devrait pas de trouver dans le ProgremGridComponent !
        this.colorsCacheEnabled = true;
        this.colorsCache = new Map();
        this.framesCacheEnabed = true;
        this.framesCache = new Map();
        this.currentCachedFrame = null;
        this.cachedColorerProgrem = (c, l, f, ctx) => {
            let color = this.getCachedColor(c, l, f);
            if (color) {
                //console.log('Retrieving color from cache.');
            }
            else {
                color = this.calculatingColorerProgrem(c, l, f, ctx);
                this.cacheColor(c, l, f, color);
            }
            return color;
        };
        let enWarning = HtmlHelper_1.HtmlHelper.p('warning', "Your browser doesn't support canvas.");
        let frWarning = HtmlHelper_1.HtmlHelper.p('warning', "Votre navigateur ne supporte pas les canvas.");
        this.displayedCanvas = HtmlHelper_1.HtmlHelper.canvas('', [enWarning, frWarning]);
        this.displayedCanvas.width = this.progremConfig.nombreColonnes * this.screenConfig.boxSize;
        this.displayedCanvas.height = this.progremConfig.nombreLignes * this.screenConfig.boxSize;
        let ctx = this.displayedCanvas.getContext('2d');
        this.hiddenCanvas = this.buildFrameCanvas();
        let hiddenCtx = this.hiddenCanvas.getContext('2d');
        if (!ctx || !hiddenCtx) {
            throw new Error('Unable to obtain 2D Canvas context !');
        }
        this.displayedCtx = ctx;
        this.hiddenCtx = hiddenCtx;
        // @ts-ignore
        this.calculatingColorerProgrem = colorerProgrem;
        this.clear();
        this.startIteratingCodeSub = scheduler.subscribeStartIteratingCode(this);
        this.gridChangeSub = scheduler.subscribeGridChange(this);
        this.frameChangeSub = scheduler.subscribeFrameChange(this);
        this.paintingSub = scheduler.subscribePainting(this);
        this.endAnimationSub = scheduler.subscribeEndAnimation(this);
    }
    buildFrameCanvas() {
        let canvas = document.createElement('canvas');
        canvas.width = this.progremConfig.nombreColonnes * this.screenConfig.boxSize;
        canvas.height = this.progremConfig.nombreLignes * this.screenConfig.boxSize;
        return canvas;
    }
    renderHtml() {
        this.renderingContainer.innerHTML = "";
        this.renderingContainer.appendChild(this.displayedCanvas);
        return this.renderingContainer;
    }
    colorCurrentPixel(state, color, context) {
        let boxSize = this.screenConfig.boxSize;
        let c = state.colonne;
        let l = state.ligne;
        // Paint pixel if it changed
        context.fillStyle = color;
        context.fillRect(c * boxSize, l * boxSize, boxSize, boxSize);
    }
    blinkCurrentPixel(state, incremnt) {
        let color = 'black';
        if (incremnt % 2 === 0) {
            color = 'antiquewhite';
        }
        this.colorCurrentPixel(state, color, this.displayedCtx);
    }
    fireStartIteratingCode(state) {
        //console.log('fireStartIteratingCode');
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = Rx_1.Observable.interval(this.blinkInterval, rxjs_1.animationFrameScheduler).subscribe(t => {
            this.blinkCurrentPixel(state, t);
        });
    }
    fireGridChange(oldState, newState) {
        //console.log('fireGridChange');
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.framesCacheEnabed) {
            let cachedCurrentFrame = this.getCachedFrame(oldState.frame);
            if (cachedCurrentFrame) {
                // If current frame is in cache, we stop work here.
                return;
            }
        }
        let c = oldState.colonne;
        let l = oldState.ligne;
        let f = oldState.frame;
        if (this.colorsCacheEnabled) {
            // @ts-ignore
            colorerProgrem = this.cachedColorerProgrem;
        }
        // @ts-ignore
        let couleur = colorerProgrem(c, l, f, oldState.contexte);
        //console.log(`(${c}, ${l}, ${f}, ${state.contexte} => ${couleur}`);
        this.colorCurrentPixel(oldState, couleur, this.hiddenCtx);
    }
    fireFrameChange(oldState, newState) {
        //console.log('fireFrameChange');
        if (this.framesCacheEnabed) {
            let cachedOldFrame = this.getCachedFrame(oldState.frame);
            if (!cachedOldFrame) {
                //console.log('Caching frame #', oldState.frame);
                let frameCanvas = this.buildFrameCanvas();
                frameCanvas.hidden = true;
                let frameCanvasCtx = frameCanvas.getContext('2d');
                if (frameCanvasCtx) {
                    frameCanvasCtx.drawImage(this.hiddenCanvas, 0, 0);
                    this.cacheFrame(oldState.frame, frameCanvasCtx);
                    this.renderingContainer.appendChild(frameCanvas);
                }
            }
            else {
                cachedOldFrame.canvas.hidden = true;
            }
            let cachedNewFrame = this.getCachedFrame(newState.frame);
            if (cachedNewFrame) {
                //console.log('Retrieving from cache frame #', newState.frame);
                this.currentCachedFrame = cachedNewFrame.canvas;
                this.currentCachedFrame.hidden = true;
            }
        }
    }
    firePainting() {
        if (this.currentCachedFrame) {
            //console.log(new Date(),'Painting pre rendered canvas.');
            //this.renderingContainer.innerHTML = "";
            //this.displayedCtx.drawImage(this.currentCachedFrame, 0, 0);
            this.currentCachedFrame.hidden = false;
        }
        else {
            //console.log(new Date(),'Painting hidden canvas.');
            this.displayedCtx.drawImage(this.hiddenCanvas, 0, 0);
        }
    }
    fireEndAnimation() {
        console.log('fireEndAnimation');
        if (this.currentCachedFrame) {
            this.displayedCanvas.hidden = true;
        }
        this.startIteratingCodeSub.unsubscribe();
        this.gridChangeSub.unsubscribe();
        this.endAnimationSub.unsubscribe();
    }
    clear() {
        let width = this.screenConfig.boxSize * this.progremConfig.nombreColonnes;
        let height = this.screenConfig.boxSize * this.progremConfig.nombreLignes;
        this.displayedCtx.clearRect(0, 0, width, height);
        this.displayedCtx.fillStyle = 'antiquewhite';
        this.displayedCtx.fillRect(0, 0, width, height);
    }
    buildColorsCacheKey(colonne, ligne, frame) {
        return colonne + '_' + ligne + '_' + frame;
    }
    getCachedColor(colonne, ligne, frame) {
        let key = this.buildColorsCacheKey(colonne, ligne, frame);
        let value = this.colorsCache.get(key);
        return value;
    }
    cacheColor(colonne, ligne, frame, value) {
        let key = this.buildColorsCacheKey(colonne, ligne, frame);
        this.colorsCache.set(key, value);
    }
    getCachedFrame(frame) {
        let value = this.framesCache.get(frame);
        return value;
    }
    cacheFrame(frame, value) {
        this.framesCache.set(frame, value);
    }
}
exports.ProgremGridComponent = ProgremGridComponent;


/***/ })

},[["/7QA","runtime","npm.rxjs-compat","npm.rxjs","npm.escodegen","npm.esutils","npm.estraverse","npm.webpack","npm.esprima-walk","npm.esprima","npm.js-md5","npm.process","npm.tslib"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9yU3R5bGVEZWNvcmF0b3JzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92YXJpYWJsZVNjb3BlL1ZhcmlhYmxlU2NvcGVDb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUVkaXRvci9Qcm9ncmVtRWRpdG9yQ29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL0h0bWxIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VzcHJpbWEvQmFzaWNFc3ByaW1hUHJvZ3JlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9FdmFsU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9TY2hlZHVsaW5nU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Qcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZhcmlhYmxlU2NvcGUvRXNwcmltYVZhcmlhYmxlU2NvcGVTdHlsZURlY29yYXRvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvUHJvZ3JlbVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdmFyaWFibGVTY29wZS9Fc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL1R5cGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL0NvZGVTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL1NjcmVlblNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VzcHJpbWEvRXNwcmltYUhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9Db2xvclNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUdyaWQvUHJvZ3JlbUdyaWRDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUdBLG1HQUF3RTtBQUN4RSxrRkFBdUQ7QUFJdkQsTUFBYSwyQkFBMkI7SUFBeEM7UUFFWSxnQkFBVyxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzdDLGtCQUFhLEdBQWtCLDJCQUFZLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLENBQUM7SUFzRHBGLENBQUM7SUFwREcsUUFBUSxDQUFDLElBQWMsRUFBRSxPQUFvQjtRQUN6QyxJQUFJLEtBQUssQ0FBQztRQUVWLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7WUFDNUIsaUhBQWlIO1lBQ2pILHFDQUFxQztZQUNyQyxzQkFBc0I7WUFDdEIsSUFBSTtZQUNKLElBQUksQ0FBQyxHQUFHLElBQWtCLENBQUM7WUFDM0IsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDbEI7UUFDRDs7Ozs7VUFLRTtRQUNGLElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDWCxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDekM7WUFFRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsQyxPQUFPLENB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QUM7SUFFUyxVQUFVLENBQUMsS0FBYSxFQUFFLEtBQStCO1FBQy9ELElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0NBQ0o7QUFyT0Qsb0RBcU9DIiwiZmlsZSI6ImluZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0eWxlRGVjb3JhdG9yLCBDb2xvclByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IEJhc2VOb2RlLCBJZGVudGlmaWVyLCBNZW1iZXJFeHByZXNzaW9uIH0gZnJvbSBcImVzdHJlZVwiO1xuXG5pbXBvcnQgeyBQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50IH0gZnJvbSBcIi4vUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvQ29sb3JTZXJ2aWNlXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBIdG1sSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvSHRtbEhlbHBlclwiO1xuXG5leHBvcnQgY2xhc3MgQ29sb3JWZXJzZVZhcmlhYmxlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8QmFzZU5vZGU+IHtcblxuICAgIHByaXZhdGUgdmFyaWFibGVNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBjb2xvclByb3ZpZGVyOiBDb2xvclByb3ZpZGVyID0gQ29sb3JTZXJ2aWNlLmNvbG9yUHJvdmlkZXJhY3RvcnkuYnVpbGQoKTtcblxuICAgIGRlY29yYXRlKG5vZGU6IEJhc2VOb2RlLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IHZhcklkO1xuXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdJZGVudGlmaWVyJykge1xuICAgICAgICAgICAgLy8gbGV0IGlzUGFyZW50Tm90QWxyZWFkeVZhcmlhYmxlID0gSHRtbEhlbHBlci50ZXN0SGllcmFjaHkoZWxlbWVudCwgZWx0ID0+ICFlbHQuY2xhc3NMaXN0LmNvbnRhaW5zKCd2YXJpYWJsZScpKTtcbiAgICAgICAgICAgIC8vIGlmICghaXNQYXJlbnROb3RBbHJlYWR5VmFyaWFibGUpIHtcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGxldCBuID0gbm9kZSBhcyBJZGVudGlmaWVyO1xuICAgICAgICAgICAgdmFySWQgPSBuLm5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgLypcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ01lbWJlckV4cHJlc3Npb24nKSB7XG4gICAgICAgICAgICBsZXQgbiA9IG5vZGUgYXMgTWVtYmVyRXhwcmVzc2lvbjtcbiAgICAgICAgICAgIHZhcklkID0gZXNjb2RlR2VuZXJhdGUobik7XG4gICAgICAgIH1cbiAgICAgICAgKi9cbiAgICAgICAgaWYgKHZhcklkKSB7XG4gICAgICAgICAgICBsZXQgdmFySW5kZXggPSB0aGlzLnZhcmlhYmxlTWFwLmdldCh2YXJJZCk7XG4gICAgICAgICAgICBpZiAoIXZhckluZGV4KSB7XG4gICAgICAgICAgICAgICAgdmFySW5kZXggPSB0aGlzLnZhcmlhYmxlTWFwLnNpemUgKyAxO1xuICAgICAgICAgICAgICAgIHRoaXMudmFyaWFibGVNYXAuc2V0KHZhcklkLCB2YXJJbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndmFyaWFibGUnKTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndmFyaWFibGUtJyArIHZhckluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0gICAgXG4gICAgXG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBzdHlsZSA9ICcnO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCd2YXJpYWJsZSBjb3VudDonLCB0aGlzLnZhcmlhYmxlTWFwLnNpemUpO1xuICAgICAgICB0aGlzLnZhcmlhYmxlTWFwLmZvckVhY2goKGluZGV4LCBpZCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5jb2xvclByb3ZpZGVyLmhhc2hTdHJpbmdUb0NvbG9yKGlkLCAxNik7IC8vdGhpcy52YXJpYWJsZU1hcC5zaXplXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdidWlsZGluZyBjb2xvciAjJywgaWQsICc9PicsIGNvbG9yKTtcbiAgICAgICAgICAgIHN0eWxlICs9IGBcbiAgICAgICAgICAgICAgICAudmFyaWFibGUge1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLjFlbSAwLjVlbSAwLjFlbSAwLjVlbTtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDAuOGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAuJHtQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTU30gLnZhcmlhYmxlLSR7aW5kZXh9LmlkZW50aWZpZXIsIFxuICAgICAgICAgICAgICAgIC4ke1Byb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VURURfQ0xBU1N9IC52YXJpYWJsZS0ke2luZGV4fS5pZGVudGlmaWVyIHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcn07XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGA7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGFkVmVyc2VEZWNvcmF0b3IgaW1wbGVtZW50cyBTdHlsZURlY29yYXRvcjxCYXNlTm9kZT4ge1xuXG4gICAgZGVjb3JhdGUobm9kZTogQmFzZU5vZGUsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvZGUtcGFkZGluZycpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9ICAgIFxuICAgIFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYFxuICAgICAgICAuY29kZS1wYWRkaW5nIHtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAzMnB4O1xuICAgICAgICB9XG4gICAgICAgIGA7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBQcm9ncmVtU2VydmljZX0gZnJvbSBcIi4vY29yZS9Qcm9ncmVtU2VydmljZVwiO1xuaW1wb3J0IHsgU2NyZWVuQ29uZmlnIH0gZnJvbSBcIi4vY29yZS9TY3JlZW5TZXJ2aWNlXCI7XG5cbmxldCBzY3JlZW5Db25maWcgPSBuZXcgU2NyZWVuQ29uZmlnKDIwKTtcblxuLy9Qcm9ncmVtU2VydmljZS5idWlsZFByb2dyZW0oJy4vcHJvZ3JlbXMvbWFuZGVsYnJvdF9zZXRfcHJvZ3JlbS5qcycsIHNjcmVlbkNvbmZpZyk7XG5Qcm9ncmVtU2VydmljZS5idWlsZFByb2dyZW0oJy4vcHJvZ3JlbXMvZGlhZ29uYWxlX2dsaXNzYW50ZV9wcm9ncmVtLmpzJywgc2NyZWVuQ29uZmlnKTsiLCJpbXBvcnQgeyBQcm9ncmVtQ29tcG9uZW50LCBHcmlkQ2hhbmdlTGlzdGVuZXIsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgUHJvZ3JlbVN0YXRlLCBDb2xvclByb3ZpZGVyLCBQcm9ncmVtU2NoZWR1bGVyLCBIdG1sQ291cGxldEZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgRXNwcmltYUhlbHBlciB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFIZWxwZXJcIjtcbmltcG9ydCB7IFZhcmlhYmxlRGVjbGFyYXRpb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBGdW5jdGlvbkRlY2xhcmF0aW9uIH0gZnJvbSBcImVzdHJlZVwiO1xuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvQ29sb3JTZXJ2aWNlXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBFc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5IH0gZnJvbSBcIi4vRXNwcmltYVZhcmlhYmxlU2NvcGVIdG1sRmFjdG9yeVwiO1xuXG5leHBvcnQgY2xhc3MgVmFyaWFibGVTY29wZUNvbXBvbmVudCBpbXBsZW1lbnRzIFByb2dyZW1Db21wb25lbnQsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyIHtcblxuICAgIHByaXZhdGUgaHRtbENvbnRhaW5lcjogSFRNTEVsZW1lbnR8bnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBjb2xvclByb3ZpZGVyOiBDb2xvclByb3ZpZGVyID0gQ29sb3JTZXJ2aWNlLmNvbG9yUHJvdmlkZXJhY3RvcnkuYnVpbGQoKTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXIsXG4gICAgICAgIHByaXZhdGUgaHRtbEZhY3Rvcnk6IEVzcHJpbWFWYXJpYWJsZVNjb3BlSHRtbEZhY3RvcnlcbiAgICApIHtcbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUNvZGVFeGVjdXRpb24odGhpcyk7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVHcmlkQ2hhbmdlKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbmRlckh0bWwoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgaHRtbENvbXBvbmVudCA9IHRoaXMuaHRtbEZhY3RvcnkuYnVpbGRDb3VwbGV0KCk7XG4gICAgICAgIHRoaXMuaHRtbENvbnRhaW5lciA9IGh0bWxDb21wb25lbnQ7XG4gICAgICAgIHJldHVybiBodG1sQ29tcG9uZW50O1xuICAgIH1cblxuICAgIGZpcmVDb2RlRXhlY3V0aW9uKG9sZFN0YXRlOiBQcm9ncmVtU3RhdGUsIG5ld1N0YXRlOiBQcm9ncmVtU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFuZXdTdGF0ZS52ZXJzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0bWxWZXJzZSA9IHRoaXMuaHRtbEZhY3RvcnkuZ2V0SHRtbFZlcnNlKG5ld1N0YXRlLnZlcnNlKTtcbiAgICAgICAgLy8gaWYgKHRoaXMuaHRtbENvbnRhaW5lciAmJiBodG1sVmVyc2UpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuaHRtbENvbnRhaW5lci5hcHBlbmRDaGlsZChodG1sVmVyc2UpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgZmlyZUdyaWRDaGFuZ2Uoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmh0bWxGYWN0b3J5LmNsZWFyVmlldygpO1xuICAgIH1cblxufSIsImltcG9ydCB7IEVzcHJpbWFQcm9ncmVtIH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYVR5cGVzXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1FZGl0b3JDb21wb25lbnQge1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBDT01QT05FTlRfQ0xBU1MgPSAncHJvZ3JlbS1lZGl0b3ItY29tcG9uZW50JztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IElOSVRfRlVOQ19DTEFTUyA9ICdpbml0LXByb2dyZW0tZWRpdG9yJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IENPTE9SRVJfRlVOQ19DTEFTUyA9ICdjb2xvcmVyLXByb2dyZW0tZWRpdG9yJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IENPREVfTElCUkVfQ0xBU1MgPSAnY29kZS1saWJyZS1lZGl0b3InO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUkVGUkVTSF9BQ1RJT05fQ0xBU1MgPSAncmVmcmVzaC1hY3Rpb24nO1xuXG4gICAgcHJpdmF0ZSBpbml0UHJvZ3JlbVRleHRhcmVhITogSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICBwcml2YXRlIGNvbG9yZXJQcm9ncmVtVGV4dGFyZWEhOiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgIHByaXZhdGUgY29kZUxpYnJlVGV4dGFyZWEhOiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgIHByaXZhdGUgcmVmcmVzaE9ic2VydmFibGUkITogT2JzZXJ2YWJsZTxFdmVudD47XG5cbiAgICBwcml2YXRlIGF0dGFjaGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwdWJsaWMgYXR0YWNoKGRvY3VtZW50OkRvY3VtZW50KSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7UHJvZ3JlbUVkaXRvckNvbXBvbmVudC5DT01QT05FTlRfQ0xBU1N9IC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuSU5JVF9GVU5DX0NMQVNTfSB0ZXh0YXJlYWApO1xuICAgICAgICBjb25zb2xlLmxvZygnZWxlbWVudHMnLCBlbGVtZW50KTtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHRoaXMuaW5pdFByb2dyZW1UZXh0YXJlYSA9IGVsZW1lbnQgYXMgSFRNTFRleHRBcmVhRWxlbWVudDtcblxuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7UHJvZ3JlbUVkaXRvckNvbXBvbmVudC5DT01QT05FTlRfQ0xBU1N9IC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuQ09MT1JFUl9GVU5DX0NMQVNTfSB0ZXh0YXJlYWApO1xuICAgICAgICBpZiAoZWxlbWVudCkgdGhpcy5jb2xvcmVyUHJvZ3JlbVRleHRhcmVhID0gZWxlbWVudCBhcyBIVE1MVGV4dEFyZWFFbGVtZW50O1xuXG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtQcm9ncmVtRWRpdG9yQ29tcG9uZW50LkNPTVBPTkVOVF9DTEFTU30gLiR7UHJvZ3JlbUVkaXRvckNvbXBvbmVudC5DT0RFX0xJQlJFX0NMQVNTfSB0ZXh0YXJlYWApO1xuICAgICAgICBpZiAoZWxlbWVudCkgdGhpcy5jb2RlTGlicmVUZXh0YXJlYSA9IGVsZW1lbnQgYXMgSFRNTFRleHRBcmVhRWxlbWVudDtcblxuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7UHJvZ3JlbUVkaXRvckNvbXBvbmVudC5DT01QT05FTlRfQ0xBU1N9IC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuUkVGUkVTSF9BQ1RJT05fQ0xBU1N9YCk7XG4gICAgICAgIHRoaXMucmVmcmVzaE9ic2VydmFibGUkID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZWxlbWVudCBhcyBIVE1MQnV0dG9uRWxlbWVudCwgJ2NsaWNrJyk7XG5cbiAgICAgICAgdGhpcy5hdHRhY2hlZCA9IHRoaXMuaW5pdFByb2dyZW1UZXh0YXJlYSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29sb3JlclByb2dyZW1UZXh0YXJlYSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29kZUxpYnJlVGV4dGFyZWEgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnJlZnJlc2hPYnNlcnZhYmxlJCAhPT0gdW5kZWZpbmVkO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2hlY2tJc0F0dGFjaGVkKCkge1xuICAgICAgICBpZiAoIXRoaXMuYXR0YWNoZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvZ3JlbUVkaXRvckNvbXBvbmVudCBpcyBub3QgYXR0YWNoZWQgIScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWRQcm9ncmVtKHByb2dyZW06IEVzcHJpbWFQcm9ncmVtKSB7XG4gICAgICAgIHRoaXMuY2hlY2tJc0F0dGFjaGVkKCk7XG5cbiAgICAgICAgbGV0IGZ1bmNCb2R5QmxvY2sgPSBwcm9ncmVtLmluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCkuZnVuY3Rpb25Sb290Tm9kZS5ib2R5O1xuICAgICAgICBsZXQgZnVuY0JvZHlDb2RlID0gZXNjb2RlR2VuZXJhdGUoZnVuY0JvZHlCbG9jayk7XG4gICAgICAgIGxldCBjbGVhbmVkQ29kZSA9IGZ1bmNCb2R5Q29kZS5zdWJzdHJpbmcoMSwgZnVuY0JvZHlDb2RlLmxlbmd0aCAtIDIpO1xuICAgICAgICB0aGlzLmluaXRQcm9ncmVtVGV4dGFyZWEuaW5uZXJIVE1MID0gY2xlYW5lZENvZGU7XG5cbiAgICAgICAgZnVuY0JvZHlCbG9jayA9IHByb2dyZW0uY29sb3JlclByb2dyZW1GdW5jdGlvbigpLmZ1bmN0aW9uUm9vdE5vZGUuYm9keTtcbiAgICAgICAgZnVuY0JvZHlDb2RlID0gZXNjb2RlR2VuZXJhdGUoZnVuY0JvZHlCbG9jayk7XG4gICAgICAgIGNsZWFuZWRDb2RlID0gZnVuY0JvZHlDb2RlLnN1YnN0cmluZygxLCBmdW5jQm9keUNvZGUubGVuZ3RoIC0gMik7XG4gICAgICAgIHRoaXMuY29sb3JlclByb2dyZW1UZXh0YXJlYS5pbm5lckhUTUwgPSBjbGVhbmVkQ29kZTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHVibGljIGJ1aWxkUHJvZ3JlbSgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgY29sb3JlclByb2dyZW1GdW5jID0gYFxuICAgICAgICBmdW5jdGlvbiBjb2xvcmVyUHJvZ3JlbShjb2xvbm5lLCBsaWduZSwgZnJhbWUsIGNvbnRleHRlKSB7XG4gICAgICAgICAgICAke3RoaXMuY29sb3JlclByb2dyZW1UZXh0YXJlYS52YWx1ZX1cbiAgICAgICAgfVxuICAgICAgICBgO1xuXG4gICAgICAgIGxldCBpbml0UHJvZ3JlbUZ1bmMgPSBgXG4gICAgICAgIGZ1bmN0aW9uIGluaXRpYWxpc2VyUHJvZ3JlbShjb25maWcsIGluaXRDb250ZXh0ZSkge1xuICAgICAgICAgICAgJHt0aGlzLmluaXRQcm9ncmVtVGV4dGFyZWEudmFsdWV9XG4gICAgICAgIH1cbiAgICAgICAgYDtcblxuICAgICAgICBsZXQgY29kZUxpYnJlRnVuYyA9IHRoaXMuY29kZUxpYnJlVGV4dGFyZWEudmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgJHtjb2RlTGlicmVGdW5jfVxuXG4gICAgICAgICR7aW5pdFByb2dyZW1GdW5jfVxuXG4gICAgICAgICR7Y29sb3JlclByb2dyZW1GdW5jfVxuICAgICAgICBgO1xuICAgIH1cblxuICAgIHB1YmxpYyBiaW5kUmVmcmVzaChhY3Rpb246IChjb2RlOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoT2JzZXJ2YWJsZSQuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGFjdGlvbih0aGlzLmJ1aWxkUHJvZ3JlbSgpKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbn0iLCJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBIdG1sSGVscGVyIHtcblxuICAgIHN0YXRpYyBhZGRDbGFzc2VzKGVsdDogSFRNTEVsZW1lbnQsIGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBpZiAodHlwZW9mIGNsYXNzZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnNwbGl0KCcgJykuZm9yRWFjaChjID0+IGVsdC5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjbGFzc2VzKSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5mb3JFYWNoKGMgPT4gZWx0LmNsYXNzTGlzdC5hZGQoYykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGVzdCBhbiBlbGVtZW50IGFuZCBpdCdzIGhpZXJhcmNoeS4gUmV0dXJuIGZhbHNlIHdoZW4gdGhlIHRlc3QgZmFpbCBmb3IgYW4gZWxlbWVudC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZWxlbWVudCBcbiAgICAgKiBAcGFyYW0gdGVzdCBcbiAgICAgKi9cbiAgICBzdGF0aWMgdGVzdEhpZXJhY2h5KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCB0ZXN0OiAoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rlc3RIaWVyYWNoeTonLCBlbGVtZW50KTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRlc3QoZWxlbWVudCk7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBzcGFuKGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSwgY29udGVudD86IHN0cmluZ3xIVE1MRWxlbWVudHwoSFRNTEVsZW1lbnR8c3RyaW5nKVtdKTogSFRNTFNwYW5FbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIudGFnKCdzcGFuJywgY2xhc3NlcywgY29udGVudCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHAoY2xhc3Nlczogc3RyaW5nfHN0cmluZ1tdLCBjb250ZW50Pzogc3RyaW5nfEhUTUxFbGVtZW50fChIVE1MRWxlbWVudHxzdHJpbmcpW10pOiBIVE1MUGFyYWdyYXBoRWxlbWVudCB7XG4gICAgICAgIHJldHVybiBIdG1sSGVscGVyLnRhZygncCcsIGNsYXNzZXMsIGNvbnRlbnQpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgIH1cblxuICAgIHN0YXRpYyBkaXYoY2xhc3Nlczogc3RyaW5nfHN0cmluZ1tdLCBjb250ZW50Pzogc3RyaW5nfEhUTUxFbGVtZW50fChIVE1MRWxlbWVudHxzdHJpbmcpW10pOiBIVE1MRGl2RWxlbWVudCB7XG4gICAgICAgIHJldHVybiBIdG1sSGVscGVyLnRhZygnZGl2JywgY2xhc3NlcywgY29udGVudCkgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGNhbnZhcyhjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxDYW52YXNFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIudGFnKCdjYW52YXMnLCBjbGFzc2VzLCBjb250ZW50KSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyB0YWcodGFnTmFtZTogc3RyaW5nLCBjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGVsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgICAgIGlmIChjbGFzc2VzKSB7XG4gICAgICAgICAgICBIdG1sSGVscGVyLmFkZENsYXNzZXMoZWx0LCBjbGFzc2VzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGVsdC5pbm5lclRleHQgPSBjb250ZW50O1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgZWx0LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY29udGVudCkpIHtcbiAgICAgICAgICAgIGNvbnRlbnQuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsdC5pbm5lckhUTUwgKz0gYztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgZWx0LmFwcGVuZENoaWxkKGMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gYWRkIGNvbnRlbnQ6JywgYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGVsdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmaW5lQ3NzUnVsZXMoaWQ6IHN0cmluZywgY3NzUnVsZXM6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBsZXQgY3NzSWQgPSAnY3NzLScgKyBpZDtcbiAgICAgICAgbGV0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNzc0lkKTtcbiAgICAgICAgaWYoIXN0eWxlRWxlbWVudCkge1xuICAgICAgICAgICAgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgfVxuICAgICAgICBzdHlsZUVsZW1lbnQuaWQgPSBjc3NJZDtcbiAgICAgICAgLyogYWRkIHN0eWxlIHJ1bGVzIHRvIHRoZSBzdHlsZSBlbGVtZW50ICovXG4gICAgICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3NSdWxlcykpO1xuICAgICAgICBcbiAgICAgICAgLyogYXR0YWNoIHRoZSBzdHlsZSBlbGVtZW50IHRvIHRoZSBkb2N1bWVudCBoZWFkICovXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG59IiwiXG5pbXBvcnQgeyBQcm9ncmFtLCBwYXJzZU1vZHVsZSwgUGFyc2VPcHRpb25zIH0gZnJvbSAnZXNwcmltYSc7XG5pbXBvcnQgeyB3YWxrIGFzIGVzcHJpbWFXYWxrLCB3YWxrQWRkUGFyZW50IGFzIGVzcHJpbWFXYWxrQWRkUGFyZW50IH0gZnJvbSAnZXNwcmltYS13YWxrJztcbmltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcbmltcG9ydCB7IEJhc2VOb2RlLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBCbG9ja1N0YXRlbWVudCwgSWZTdGF0ZW1lbnQsIFJldHVyblN0YXRlbWVudCwgU3RhdGVtZW50IH0gZnJvbSAnZXN0cmVlJztcbmltcG9ydCB7IEVzcHJpbWFWZXJzZUl0ZXJhb3IsIEVzcHJpbWFWZXJzZSwgRXNwcmltYUNvdXBsZXQsIEVzcHJpbWFQcm9ncmVtRmFjdG9yeSwgRXNwcmltYVByb2dyZW0gfSBmcm9tICcuL0VzcHJpbWFUeXBlcyc7XG5pbXBvcnQgeyBFc3ByaW1hSGVscGVyIH0gZnJvbSAnLi9Fc3ByaW1hSGVscGVyJztcbmltcG9ydCB7IENvZGVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9Db2RlU2VydmljZSc7XG5pbXBvcnQgeyBQcm9ncmVtU3RhdGUgfSBmcm9tICcuLi9jb3JlL1R5cGVzJztcblxuY2xhc3MgQmFzaWNFc3ByaW1hQ29kZUl0ZXJhdG9yIGltcGxlbWVudHMgRXNwcmltYVZlcnNlSXRlcmFvciB7XG5cbiAgICBwcml2YXRlIHN0YWNrOiBCYXNlTm9kZVtdID0gW107XG4gICAgcHJpdmF0ZSByZXR1cm5WYWx1ZTogYW55ID0gbnVsbDtcbiAgICBwcml2YXRlIGZpbmlzaGVkID0gZmFsc2VcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgcHJpdmF0ZSByb290Tm9kZTogQmFzZU5vZGUsIFxuICAgICAgICAgICAgcHJpdmF0ZSBzdGF0ZTogUHJvZ3JlbVN0YXRlKSB7XG4gICAgICAgIHRoaXMuc3RhY2sucHVzaChyb290Tm9kZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWNsYXJlUHJvZ3JlbUFyZ3VtZW50cygpIHtcbiAgICAgICAgbGV0IF9jb2xvbm5lID0gdGhpcy5zdGF0ZS5jb2xvbm5lO1xuICAgICAgICBsZXQgX2xpZ25lID0gdGhpcy5zdGF0ZS5saWduZTtcbiAgICAgICAgbGV0IF9mcmFtZSA9IHRoaXMuc3RhdGUuZnJhbWU7XG4gICAgICAgIGxldCBfY29udGV4dGUgPSB0aGlzLnN0YXRlLmNvbnRleHRlO1xuXG4gICAgICAgIHRoaXMuc3RhdGUuZXZhbCgndmFyIGNvbG9ubmUgPSAnICsgX2NvbG9ubmUgKyAnLCBsaWduZSA9ICcgKyBfbGlnbmUgKyAnLCBmcmFtZSA9ICcgKyBfZnJhbWUgKyAnOycpO1xuICAgICAgICB0aGlzLnN0YXRlLmV2YWwoJ3ZhciBjb250ZXh0ZSA9ICcgKyBKU09OLnN0cmluZ2lmeShfY29udGV4dGUpKTtcbiAgICB9XG5cbiAgICBleGVjdXRlTmV4dCgpOiBFc3ByaW1hVmVyc2Uge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGZpcnN0IG5vZGUgb24gdGhlIHN0YWNrXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuc3RhY2suc2hpZnQoKTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnTm9kZTonLCBub2RlKTtcblxuICAgICAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGFjayBzaG91bGQgbm90IGJlIGVtcHR5ICEnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHN0bXQ7XG5cbiAgICAgICAgICAgIHN3aXRjaChub2RlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdGdW5jdGlvbkRlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZ1bmMgPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdChmdW5jLmJvZHkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY2xhcmVQcm9ncmVtQXJndW1lbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFZlcnNlKGZ1bmMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Jsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suYm9keS5zbGljZSgpLnJldmVyc2UoKS5tYXAoeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdCbG9ja1N0YXRlbWVudCB1bnNoaWZ0aW5nOicsIHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KHgpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0lmU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgc3RtdCA9IG5vZGUgYXMgSWZTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0Q29kZSA9IGVzY29kZUdlbmVyYXRlKHN0bXQudGVzdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3RSZXN1bHQgPSB0aGlzLnN0YXRlLmV2YWwodGVzdENvZGUpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdJZlN0YXRlbWVudCB0ZXN0IGV2YWx1YXRlIHRvOiAnLCB0ZXN0UmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlc3RSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ1RoZW4gdW5zaGlmdGluZzonLCBzdG10LmNvbnNlcXVlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KHN0bXQuY29uc2VxdWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RtdC5hbHRlcm5hdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdFbHNlIHVuc2hpZnRpbmc6Jywgc3RtdC5hbHRlcm5hdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdChzdG10LmFsdGVybmF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRWZXJzZShzdG10KTtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1JldHVyblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIHN0bXQgPSBub2RlIGFzIFJldHVyblN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXR1cm5WYWx1ZSA9IHRoaXMuc3RhdGUuZXZhbChlc2NvZGVHZW5lcmF0ZShzdG10LmFyZ3VtZW50KSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRWZXJzZShzdG10KTtcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ05vZGU6Jywgbm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2RlID0gZXNjb2RlR2VuZXJhdGUobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0dlbmVyYXRlZCBjb2RlOicsIGNvZGUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXZhbFJlc3VsdCA9IHRoaXMuc3RhdGUuZXZhbChjb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnRXZhbHVhdGUgdG86JywgZXZhbFJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFZlcnNlKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICh0aGlzLnN0YWNrLmxlbmd0aCA+IDApO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSXRlcmF0b3IgaGFzIG5vIG1vcmUgY29kZSB0byBleGVjdXRlICEnKTtcbiAgICB9ICAgIFxuICAgIFxuICAgIGhhc05leHQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbm9kZXMgPSB0aGlzLnN0YWNrLnNsaWNlKDApO1xuICAgICAgICB3aGlsZSAobm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBub2Rlcy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS50eXBlICE9PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9ja3M6IEJsb2NrU3RhdGVtZW50W10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tzLnB1c2goYmxvY2spO1xuICAgICAgICAgICAgICAgICAgICAvLyBQYXJzb3VycyByZWN1cnNpdmVtZW50IGxlcyBibG9ja3Mgw6AgbGEgcmVjaGVyY2hlIGRlIG5vZXVkIHF1aSBuZSBzb250IHBhcyBkZXMgYmxvY2tzXG4gICAgICAgICAgICAgICAgICAgIGxldCBoYXNOZXh0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghaGFzTmV4dCAmJiBibG9ja3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGIgPSBibG9ja3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYi5ib2R5Lm1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHgudHlwZSAhPT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzTmV4dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja3MucHVzaCh4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNOZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgY2xhc3MgQmFzaWNFc3ByaW1hUHJvZ3JlbSBpbXBsZW1lbnRzIEVzcHJpbWFQcm9ncmVtIHtcblxuICAgIHByaXZhdGUgZXNwcmltYVByb2dyYW06IFByb2dyYW07XG5cbiAgICBwcml2YXRlIGluaXRDb3VwbGV0OiBFc3ByaW1hQ291cGxldDtcbiAgICBwcml2YXRlIGNvbG9yZXJDb3VwbGV0OiBFc3ByaW1hQ291cGxldDtcblxuICAgIGNvbnN0cnVjdG9yKGNvZGU6IHN0cmluZykge1xuICAgICAgICBsZXQgY29uZmlnOiBQYXJzZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjb21tZW50OiB0cnVlLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXNwcmltYVByb2dyYW0gPSBwYXJzZU1vZHVsZShjb2RlLCBjb25maWcpO1xuICAgICAgICB0aGlzLmluaXRDb3VwbGV0ID0gdGhpcy53YWxrUHJvZ3JlbUNvdXBsZXQoJ2luaXRpYWxpc2VyUHJvZ3JlbScpO1xuICAgICAgICB0aGlzLmNvbG9yZXJDb3VwbGV0ID0gdGhpcy53YWxrUHJvZ3JlbUNvdXBsZXQoJ2NvbG9yZXJQcm9ncmVtJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHdhbGtQcm9ncmVtQ291cGxldChmdW5jdGlvbk5hbWU6IHN0cmluZyk6IEVzcHJpbWFDb3VwbGV0IHtcbiAgICAgICAgdmFyIGZ1bmNOb2RlOiBGdW5jdGlvbkRlY2xhcmF0aW9uIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIHZhciB2ZXJzZXM6IEJhc2VOb2RlW10gPSBbXTtcbiAgICAgICAgZXNwcmltYVdhbGtBZGRQYXJlbnQodGhpcy5lc3ByaW1hUHJvZ3JhbSwgbm9kZSA9PiB7XG4gICAgICAgICAgICBpZiggbm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicgJiYgbm9kZS5pZCAmJiBub2RlLmlkLm5hbWUgPT09IGZ1bmN0aW9uTmFtZSkge1xuICAgICAgICAgICAgICAgIGZ1bmNOb2RlID0gbm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmdW5jTm9kZSAmJiBFc3ByaW1hSGVscGVyLmlzQ2hpbGROb2RlT2Yobm9kZSwgZnVuY05vZGUpKSB7IC8vICYmIEVzcHJpbWFIZWxwZXIuaXNOb3RDaGlsZE5vZGVPZihub2RlLCB2ZXJzZXMpXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nIFxuICAgICAgICAgICAgICAgICAgICB8fCBub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJ1xuICAgICAgICAgICAgICAgICAgICB8fCBub2RlLnR5cGUgPT09ICdFeHByZXNzaW9uU3RhdGVtZW50J1xuICAgICAgICAgICAgICAgICAgICB8fCBub2RlLnR5cGUgPT09ICdSZXR1cm5TdGF0ZW1lbnQnXG4gICAgICAgICAgICAgICAgICAgIHx8IG5vZGUudHlwZSA9PT0gJ0lmU3RhdGVtZW50JyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSApO1xuICAgICAgICBpZiAoZnVuY05vZGUpIHtcbiAgICAgICAgICAgIHZlcnNlcy51bnNoaWZ0KGZ1bmNOb2RlKTtcbiAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZENvdXBsZXQoZnVuY05vZGUsIHZlcnNlcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbXBvc3NpYmxlIGRlIHRyb3V2ZXIgbGEgZm9uY3Rpb24gJHtmdW5jdGlvbk5hbWV9KCkgIWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpOiBFc3ByaW1hQ291cGxldCB7XG4gICAgICAgIHJldHVybiB0aGlzLmluaXRDb3VwbGV0O1xuICAgIH1cblxuICAgIHB1YmxpYyBjb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk6IEVzcHJpbWFDb3VwbGV0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JlckNvdXBsZXQ7XG4gICAgfVxuXG4gICAgcHVibGljIGl0ZXJhdG9yKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiBFc3ByaW1hVmVyc2VJdGVyYW9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCYXNpY0VzcHJpbWFDb2RlSXRlcmF0b3IodGhpcy5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCkuZnVuY3Rpb25Sb290Tm9kZSwgc3RhdGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljRXNwcmltYVByb2dyZW1GYWN0b3J5IGltcGxlbWVudHMgRXNwcmltYVByb2dyZW1GYWN0b3J5IHtcblxuICAgIGJ1aWxkUHJvZ3JlbShjb2RlOiBzdHJpbmcpOiBFc3ByaW1hUHJvZ3JlbSB7XG4gICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBvc3NpYmxlIHRvIGJ1aWxkIFByb2dyZW0gd2l0aG91dCBjb2RlICEnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEJhc2ljRXNwcmltYVByb2dyZW0oY29kZSk7XG4gICAgfVxuXG4gICAgYnVpbGRDb3VwbGV0KG5vZGU6IEZ1bmN0aW9uRGVjbGFyYXRpb24sIHZlcnNlczogQmFzZU5vZGVbXSk6IEVzcHJpbWFDb3VwbGV0IHtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcG9zc2libGUgdG8gYnVpbGQgZW1wdHkgQ291cGxldCAhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZXNwcmltYVZlcnNlcyA9IHZlcnNlcy5tYXAodGhpcy5idWlsZFZlcnNlKTtcblxuICAgICAgICBsZXQgY291cGxldDogRXNwcmltYUNvdXBsZXQgPSB7XG4gICAgICAgICAgICBmdW5jdGlvblJvb3ROb2RlOiBub2RlLFxuICAgICAgICAgICAgdmVyc2VzOiBlc3ByaW1hVmVyc2VzXG4gICAgICAgIH1cbiAgICAgICAgLy9jb25zb2xlLmxvZygnQnVpbHQgY291cGxldDonLCBjb3VwbGV0KTtcbiAgICAgICAgcmV0dXJuIGNvdXBsZXQ7XG4gICAgfVxuXG4gICAgYnVpbGRWZXJzZShub2RlOiBCYXNlTm9kZSk6IEVzcHJpbWFWZXJzZSB7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBvc3NpYmxlIHRvIGJ1aWxkIGVtcHR5IFZlcnNlICEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb2RlID0gbm9kZTtcbiAgICAgICAgaWYobm9kZS50eXBlID09PSAnSWZTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICBjb2RlID0gKG5vZGUgYXMgSWZTdGF0ZW1lbnQpLnRlc3Q7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmVyc2U6IEVzcHJpbWFWZXJzZSA9IHsgXG4gICAgICAgICAgICBub2RlOiBub2RlLFxuICAgICAgICAgICAgY29kZTogY29kZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdmVyc2U7XG4gICAgfVxufVxuIiwiXG5leHBvcnQgY2xhc3MgRXZhbFNjb3BlIHtcblxuICAgIC8vIFNlZSBodHRwOi8vcGVyZmVjdGlvbmtpbGxzLmNvbS9nbG9iYWwtZXZhbC13aGF0LWFyZS10aGUtb3B0aW9ucy9cbiAgICAvLyBXaWxsIHJldHVybiBhbiBldmFsIGFibGUgdG8gZXZhbHVhdGUganMgY29kZSBpbiB0aGUgZ2xvYmFsIHNjb3BlLlxuICAgIHB1YmxpYyByZWFkb25seSBnbG9iYWxFdmFsID0gKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXIgaXNJbmRpcmVjdEV2YWxHbG9iYWwgPSAoZnVuY3Rpb24gKG9yaWdpbmFsLCBPYmplY3QpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gRG9lcyBgT2JqZWN0YCByZXNvbHZlIHRvIGEgbG9jYWwgdmFyaWFibGUsIG9yIHRvIGEgZ2xvYmFsLCBidWlsdC1pbiBgT2JqZWN0YCxcbiAgICAgICAgICAgICAgICAvLyByZWZlcmVuY2UgdG8gd2hpY2ggd2UgcGFzc2VkIGFzIGEgZmlyc3QgYXJndW1lbnQ/XG4gICAgICAgICAgICAgICAgcmV0dXJuICgxLCBldmFsKSgnT2JqZWN0JykgPT09IG9yaWdpbmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIC8vIGlmIGluZGlyZWN0IGV2YWwgZXJyb3JzIG91dCAoYXMgYWxsb3dlZCBwZXIgRVMzKSwgdGhlbiBqdXN0IGJhaWwgb3V0IHdpdGggYGZhbHNlYFxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoT2JqZWN0LCAxMjMpO1xuXG4gICAgICAgIGlmIChpc0luZGlyZWN0RXZhbEdsb2JhbCkge1xuICAgICAgICAgICAgLy8gaWYgaW5kaXJlY3QgZXZhbCBleGVjdXRlcyBjb2RlIGdsb2JhbGx5LCB1c2UgaXRcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXhwcmVzc2lvbjogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgxLCBldmFsKShleHByZXNzaW9uKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygd2luZG93LmV4ZWNTY3JpcHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvLyBpZiBgd2luZG93LmV4ZWNTY3JpcHQgZXhpc3RzYCwgdXNlIGl0XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV4cHJlc3Npb246IHN0cmluZykge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LmV4ZWNTY3JpcHQoZXhwcmVzc2lvbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3RoZXJ3aXNlLCBnbG9iYWxFdmFsIGlzIGB1bmRlZmluZWRgIHNpbmNlIG5vdGhpbmcgaXMgcmV0dXJuZWRcbiAgICAgICAgcmV0dXJuIChleHByOiBzdHJpbmcpID0+IHt0aHJvdyBuZXcgRXJyb3IoJ05vIGdsb2JhbCBldmFsIGF2YWlsYWJsZSAhJyk7fVxuICAgIH0pKCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbn1cbiIsImltcG9ydCB7IFByb2dyZW1TY2hlZHVsZXIsIFZlcnNlSXRlcmF0b3IsIFByb2dyZW1Db2RlLCBQcm9ncmVtVmVyc2UsIFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyLCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciwgTGluZUNoYW5nZUxpc3RlbmVyLCBGcmFtZUNoYW5nZUxpc3RlbmVyLCBQcm9ncmVtU3RhdGUsIFByb2dyZW1UZW1wbywgUHJvZ3JlbUNvbmZpZywgUGFpbnRpbmdMaXN0ZW5lciwgU3Vic2NyaXB0aW9uLCBFbmRBbmltYXRpb25MaXN0ZW5lciB9IGZyb20gXCIuL1R5cGVzXCI7XG5cbmNsYXNzIFNpbXBsZVByb2dyZW1TY2hlZHVsZXIgaW1wbGVtZW50cyBQcm9ncmVtU2NoZWR1bGVyIHtcbiAgICBcbiAgICBwcml2YXRlIHN0YXRlOiBQcm9ncmVtU3RhdGU7XG4gICAgcHJpdmF0ZSBjb2RlSXRlcmF0b3I6IFZlcnNlSXRlcmF0b3I8YW55PiB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBzdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lcnM6IFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGNvZGVFeGVjdXRpb25MaXN0ZW5lcnM6IENvZGVFeGVjdXRpb25MaXN0ZW5lcltdID0gW107XG4gICAgcHJpdmF0ZSBncmlkQ2hhbmdlTGlzdGVuZXJzOiBHcmlkQ2hhbmdlTGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgbGluZUNoYW5nZUxpc3RlbmVyczogTGluZUNoYW5nZUxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGZyYW1lQ2hhbmdlTGlzdGVuZXJzOiBGcmFtZUNoYW5nZUxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIHBhaW50aW5nTGlzdGVuZXJzOiBQYWludGluZ0xpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGVuZEFuaW1hdGlvbkxpc3RlbmVyczogRW5kQW5pbWF0aW9uTGlzdGVuZXJbXSA9IFtdO1xuXG4gICAgcHVibGljIHRlbXBvOiBQcm9ncmVtVGVtcG8gPSBQcm9ncmVtVGVtcG8uQnlMaW5lO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IFByb2dyZW1Db25maWcsIHByaXZhdGUgY29kZTogUHJvZ3JlbUNvZGU8YW55Pikge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5yZXNldCgpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZVN0YXJ0SXRlcmF0aW5nQ29kZShsaXN0ZW5lcjogU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIpOiBTdWJzY3JpcHRpb24ge1xuICAgICAgICBjb25zb2xlLmxvZygnQWRkaW5nIFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyOicsIGxpc3RlbmVyKTtcbiAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMuc3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXJzO1xuICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgIGxldCBzdWI6IFN1YnNjcmlwdGlvbiA9IHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVycy5maW5kKChsLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBzdWI7XG4gICAgfSAgICBcblxuICAgIHN1YnNjcmliZUNvZGVFeGVjdXRpb24obGlzdGVuZXI6IENvZGVFeGVjdXRpb25MaXN0ZW5lcik6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdBZGRpbmcgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyOicsIGxpc3RlbmVyKTtcbiAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMuY29kZUV4ZWN1dGlvbkxpc3RlbmVycztcbiAgICAgICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICBsZXQgc3ViOiBTdWJzY3JpcHRpb24gPSB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSgpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuZmluZCgobCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobCA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gc3ViO1xuICAgIH0gICAgXG4gICAgXG4gICAgc3Vic2NyaWJlR3JpZENoYW5nZShsaXN0ZW5lcjogR3JpZENoYW5nZUxpc3RlbmVyKTogU3Vic2NyaXB0aW9uIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0FkZGluZyBHcmlkQ2hhbmdlTGlzdGVuZXI6JywgbGlzdGVuZXIpO1xuICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5ncmlkQ2hhbmdlTGlzdGVuZXJzO1xuICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgIGxldCBzdWI6IFN1YnNjcmlwdGlvbiA9IHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVycy5maW5kKChsLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBzdWI7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlTGluZUNoYW5nZShsaXN0ZW5lcjogTGluZUNoYW5nZUxpc3RlbmVyKTogU3Vic2NyaXB0aW9uIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0FkZGluZyBMaW5lQ2hhbmdlTGlzdGVuZXI6JywgbGlzdGVuZXIpO1xuICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5saW5lQ2hhbmdlTGlzdGVuZXJzO1xuICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgIGxldCBzdWI6IFN1YnNjcmlwdGlvbiA9IHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVycy5maW5kKChsLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBzdWI7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlRnJhbWVDaGFuZ2UobGlzdGVuZXI6IEZyYW1lQ2hhbmdlTGlzdGVuZXIpOiBTdWJzY3JpcHRpb24ge1xuICAgICAgICBjb25zb2xlLmxvZygnQWRkaW5nIEZyYW1lQ2hhbmdlTGlzdGVuZXI6JywgbGlzdGVuZXIpO1xuICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5mcmFtZUNoYW5nZUxpc3RlbmVycztcbiAgICAgICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICBsZXQgc3ViOiBTdWJzY3JpcHRpb24gPSB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSgpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuZmluZCgobCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobCA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gc3ViO1xuICAgIH1cblxuICAgIHN1YnNjcmliZVBhaW50aW5nKGxpc3RlbmVyOiBQYWludGluZ0xpc3RlbmVyKTogU3Vic2NyaXB0aW9uIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0FkZGluZyBQYWludGluZ0xpc3RlbmVyOicsIGxpc3RlbmVyKTtcbiAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMucGFpbnRpbmdMaXN0ZW5lcnM7XG4gICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgbGV0IHN1YjogU3Vic2NyaXB0aW9uID0ge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLmZpbmQoKGwsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGwgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHN1YjtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVFbmRBbmltYXRpb24obGlzdGVuZXI6IEVuZEFuaW1hdGlvbkxpc3RlbmVyKTogU3Vic2NyaXB0aW9uIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0FkZGluZyBFbmRBbmltYXRpb25MaXN0ZW5lcjonLCBsaXN0ZW5lcik7XG4gICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmVuZEFuaW1hdGlvbkxpc3RlbmVycztcbiAgICAgICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICBsZXQgc3ViOiBTdWJzY3JpcHRpb24gPSB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSgpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuZmluZCgobCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobCA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gc3ViO1xuICAgIH1cblxuICAgIHJlc2V0KCk6IFByb2dyZW1TdGF0ZSB7XG4gICAgICAgIGxldCBpbml0aWFsQ29udGV4dGUgPSB7fTtcbiAgICAgICAgLy8gQ2FsbCBqdXN0IGV2YWx1YXRlZCBpbml0aWFsaXNlclByb2dyZW0gZnVuY3Rpb25cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpbml0aWFsaXNlclByb2dyZW0odGhpcy5jb25maWcsIGluaXRpYWxDb250ZXh0ZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdMb2FkZWQgaW5pdGlhbCBjb250ZXh0ZTogJywgaW5pdGlhbENvbnRleHRlKTtcbiAgICAgICAgbGV0IHN0YXRlID0gbmV3IFByb2dyZW1TdGF0ZSgwLCAwLCAwLCBpbml0aWFsQ29udGV4dGUsIG51bGwpO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgY3VycmVudCgpOiBQcm9ncmVtU3RhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG5cbiAgICBuZXh0KCk6IFByb2dyZW1TdGF0ZVtdIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlKSB0aHJvdyBuZXcgRXJyb3IoJ0luY29uc2lzdGVudCBQcm9ncmVtIHN0YXRlICEnKTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuXG4gICAgICAgIGlmICh0aGlzLnRlbXBvID09PSBQcm9ncmVtVGVtcG8uQnlWZXJzZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29kZUl0ZXJhdG9yID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGVJdGVyYXRvciA9IHRoaXMuY29kZS5pdGVyYXRvcih0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVTdGFydEl0ZXJhdGluZ0NvZGUodGhpcy5zdGF0ZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdoYXNOZXh0OicsIHRoaXMuY29kZUl0ZXJhdG9yLmhhc05leHQoKSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNvZGVJdGVyYXRvci5oYXNOZXh0KCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmVyc2UgPSB0aGlzLmNvZGVJdGVyYXRvci5leGVjdXRlTmV4dCgpO1xuICAgICAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IG5ldyBQcm9ncmVtU3RhdGUodGhpcy5zdGF0ZS5jb2xvbm5lLCB0aGlzLnN0YXRlLmxpZ25lLCB0aGlzLnN0YXRlLmZyYW1lLCB0aGlzLnN0YXRlLmNvbnRleHRlLCB2ZXJzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlRXhlY3V0aW9uTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUNvZGVFeGVjdXRpb24odGhpcy5zdGF0ZSwgbmV3U3RhdGUpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWludGluZ0xpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVQYWludGluZygpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW25ld1N0YXRlXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnRmluaXNoZWQgaXRlcmF0aW5nIG92ZXIgY29kZS4nKVxuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgICAgIGxldCBub3RpZnlQaXhlbENoYW5nZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbm90aWZ5TGluZUNoYW5nZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbm90aWZ5RnJhbWVDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgbGV0IG5vdGlmeUVuZEFuaW1hdGlvbiA9IGZhbHNlO1xuICAgICAgICBsZXQgYnVmZmVyZWRTdGF0ZXM6IFByb2dyZW1TdGF0ZVtdID0gW107XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGxldCBfY29sb25uZSA9IHRoaXMuc3RhdGUuY29sb25uZTtcbiAgICAgICAgICAgIGxldCBfbGlnbmUgPSB0aGlzLnN0YXRlLmxpZ25lO1xuICAgICAgICAgICAgbGV0IF9mcmFtZSA9IHRoaXMuc3RhdGUuZnJhbWU7XG5cbiAgICAgICAgICAgIF9jb2xvbm5lICsrO1xuICAgICAgICAgICAgbm90aWZ5UGl4ZWxDaGFuZ2UgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoX2NvbG9ubmUgPj0gdGhpcy5jb25maWcubm9tYnJlQ29sb25uZXMpIHtcbiAgICAgICAgICAgICAgICBfY29sb25uZSA9IDA7XG4gICAgICAgICAgICAgICAgX2xpZ25lICsrO1xuICAgICAgICAgICAgICAgIG5vdGlmeUxpbmVDaGFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoX2xpZ25lID49IHRoaXMuY29uZmlnLm5vbWJyZUxpZ25lcykge1xuICAgICAgICAgICAgICAgIF9saWduZSA9IDA7XG4gICAgICAgICAgICAgICAgX2ZyYW1lICsrO1xuICAgICAgICAgICAgICAgIG5vdGlmeUZyYW1lQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF9mcmFtZSA+PSB0aGlzLmNvbmZpZy5ub21icmVGcmFtZXMpIHtcbiAgICAgICAgICAgICAgICBfZnJhbWUgPSAwO1xuICAgICAgICAgICAgICAgIG5vdGlmeUVuZEFuaW1hdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IG5ldyBQcm9ncmVtU3RhdGUoX2NvbG9ubmUsIF9saWduZSwgX2ZyYW1lLCB0aGlzLnN0YXRlLmNvbnRleHRlLCBudWxsKTtcbiAgICBcbiAgICAgICAgICAgIGlmIChub3RpZnlQaXhlbENoYW5nZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZENoYW5nZUxpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVHcmlkQ2hhbmdlKHRoaXMuc3RhdGUsIG5ld1N0YXRlKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChub3RpZnlMaW5lQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5lQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUxpbmVDaGFuZ2UodGhpcy5zdGF0ZSwgbmV3U3RhdGUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vdGlmeUZyYW1lQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZUNoYW5nZUxpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVGcmFtZUNoYW5nZSh0aGlzLnN0YXRlLCBuZXdTdGF0ZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm90aWZ5RW5kQW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRBbmltYXRpb25MaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlRW5kQW5pbWF0aW9uKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBidWZmZXJlZFN0YXRlcy5wdXNoKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICAgICAgLy90aGlzLmNvZGVJdGVyYXRvciA9IHRoaXMuY29kZS5pdGVyYXRvcihuZXdTdGF0ZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSB3aGlsZSh0aGlzLnRlbXBvID09PSBQcm9ncmVtVGVtcG8uQnlMaW5lICYmICFub3RpZnlMaW5lQ2hhbmdlIHx8IHRoaXMudGVtcG8gPT09IFByb2dyZW1UZW1wby5CeUZyYW1lICYmICFub3RpZnlGcmFtZUNoYW5nZSk7XG5cbiAgICAgICAgdGhpcy5jb2RlSXRlcmF0b3IgPSBudWxsO1xuICAgICAgICB0aGlzLnBhaW50aW5nTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZVBhaW50aW5nKCkpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcmVkU3RhdGVzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQcm9ncmVtKCk6IFByb2dyZW1Db2RlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2RlO1xuICAgIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBTY2hlZHVsaW5nU2VydmljZSB7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtU2NoZWR1bGVyKGNvbmZpZzogUHJvZ3JlbUNvbmZpZywgY29kZTogUHJvZ3JlbUNvZGU8YW55PiwgdGVtcG86IFByb2dyZW1UZW1wbykge1xuICAgICAgICBsZXQgc2NoZWR1bGVyID0gbmV3IFNpbXBsZVByb2dyZW1TY2hlZHVsZXIoY29uZmlnLCBjb2RlKTtcbiAgICAgICAgc2NoZWR1bGVyLnRlbXBvID0gdGVtcG87XG4gICAgICAgIHJldHVybiBzY2hlZHVsZXI7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgU3R5bGVEZWNvcmF0b3IgfSBmcm9tIFwiLi4vLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgQmFzZU5vZGUsIEZ1bmN0aW9uRGVjbGFyYXRpb24sIEJsb2NrU3RhdGVtZW50LCBJZlN0YXRlbWVudCwgVmFyaWFibGVEZWNsYXJhdG9yLCBWYXJpYWJsZURlY2xhcmF0aW9uLCBBc3NpZ25tZW50RXhwcmVzc2lvbiwgQmluYXJ5RXhwcmVzc2lvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgUmV0dXJuU3RhdGVtZW50LCBJZGVudGlmaWVyLCBNZW1iZXJFeHByZXNzaW9uIH0gZnJvbSBcImVzdHJlZVwiO1xuaW1wb3J0IHsgSHRtbEhlbHBlciB9IGZyb20gXCIuLi8uLi9jb3JlL0h0bWxIZWxwZXJcIjtcbmltcG9ydCB7IEVzcHJpbWFIZWxwZXIgfSBmcm9tIFwiLi4vLi4vZXNwcmltYS9Fc3ByaW1hSGVscGVyXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBFc3ByaW1hVmVyc2UsIEVzcHJpbWFIdG1sQ291cGxldEZhY3RvcnksIEVzcHJpbWFDb3VwbGV0IH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYVR5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBFc3ByaW1hUHJvZ3JlbUluc3BlY3Rvckh0bWxGYWN0b3J5IGltcGxlbWVudHMgRXNwcmltYUh0bWxDb3VwbGV0RmFjdG9yeSB7XG5cbiAgICBwcml2YXRlIGh0bWxWZXJzZXNNYXA6IE1hcDxCYXNlTm9kZSwgSFRNTEVsZW1lbnQ+ID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY291cGxldDogRXNwcmltYUNvdXBsZXQsXG4gICAgICAgIHByaXZhdGUgZGVjb3JhdG9yOiBTdHlsZURlY29yYXRvcjxCYXNlTm9kZT5cbiAgICApIHt9XG5cbiAgICBidWlsZENvdXBsZXQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgaHRtbENvdXBsZXQgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLmNvdXBsZXQuZnVuY3Rpb25Sb290Tm9kZSk7XG4gICAgICAgIGh0bWxDb3VwbGV0LmNsYXNzTGlzdC5hZGQoJ3Byb2dyZW0taW5zcGVjdG9yLWNvbXBvbmVudCcpO1xuICAgICAgICByZXR1cm4gaHRtbENvdXBsZXQ7XG4gICAgfVxuXG4gICAgZ2V0SHRtbFZlcnNlKHZlcnNlOiBFc3ByaW1hVmVyc2UpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICh0aGlzLmh0bWxWZXJzZXNNYXAuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbGxlZ2FsU3RhdGVFcnJvcjogY291cGxldCBtdXN0IGJlIGJ1aWx0IGJlZm9yZSBjYWxsaW5nIGdldEh0bWxWZXJzZSgpICEnKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0bWxFbGVtZW50ID0gdGhpcy5odG1sVmVyc2VzTWFwLmdldCh2ZXJzZS5ub2RlKTtcbiAgICAgICAgaWYgKCFodG1sRWxlbWVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIEhUTUxFbGVtZW50IGZvdW5kIG1hdGNoaW5nIHZlcnNlOicsIHZlcnNlLCAnIScpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIEhUTUxFbGVtZW50IGZvdW5kIG1hdGNoaW5nIHN1cHBsaWVkIHZlcnNlICFgKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGh0bWxFbGVtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkIE5vZGUgYXBwbHlpbmcgZGVjb3JhdG9ycy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbm9kZSB0aGUgbm9kZSBmb3Igd2hpY2ggdG8gcHJvZHVjZSBIVE1MXG4gICAgICogQHBhcmFtIHNpYmxpbmdzIHRoZSBub2RlcyB0byBhZGQgYXMgc2libGluZ3Mgb2YgdGhlIG5vZGVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYnVpbGROb2RlKG5vZGU6IEJhc2VOb2RlIHwgdW5kZWZpbmVkIHwgbnVsbCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gSHRtbEhlbHBlci5zcGFuKCdlbXB0eScsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2libGluZ3M6IEhUTUxFbGVtZW50W10gPSBbXVxuICAgICAgICBsZXQgaHRtbE91dHB1dCA9IHRoaXMuYnVpbGROb2RlSW50ZXJuYWwobm9kZSwgc2libGluZ3MpO1xuICAgICAgICBodG1sT3V0cHV0ID0gdGhpcy5kZWNvcmF0b3IuZGVjb3JhdGUobm9kZSwgaHRtbE91dHB1dCk7XG5cbiAgICAgICAgbGV0IG1hdGNoaW5nVmVyc2UgPSB0aGlzLmNvdXBsZXQudmVyc2VzLmZpbmQodiA9PiB2Lm5vZGUgPT09IG5vZGUpO1xuICAgICAgICBpZiAobWF0Y2hpbmdWZXJzZSkge1xuICAgICAgICAgICAgaHRtbE91dHB1dCA9IHRoaXMuZW5jYXBzdWxhdGVOb2RlSW5WZXJzZUNvbnRhaW5lcihodG1sT3V0cHV0KTtcbiAgICAgICAgICAgIC8vIFRoaXMgbm9kZSBpcyB0aGUgcm9vdCBub2RlIG9mIGEgVmVyc2VcbiAgICAgICAgICAgIHRoaXMuaHRtbFZlcnNlc01hcC5zZXQobWF0Y2hpbmdWZXJzZS5ub2RlLCBodG1sT3V0cHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaWJsaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBJZiBzaWJsaW5ncywgYnVpbGQgZWFjaCBzaWJsaW5nXG4gICAgICAgICAgICBodG1sT3V0cHV0ID0gSHRtbEhlbHBlci5zcGFuKCdzaWJsaW5nLWNvbnRhaW5lcicsIGh0bWxPdXRwdXQpO1xuICAgICAgICAgICAgd2hpbGUoc2libGluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBzaWJsaW5nID0gc2libGluZ3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBpZiAoc2libGluZykge1xuICAgICAgICAgICAgICAgICAgICAvL2xldCBzaWJsaW5nT3V0ID0gdGhpcy5idWlsZE5vZGUoc2libGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGh0bWxPdXRwdXQuYXBwZW5kQ2hpbGQoc2libGluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGh0bWxPdXRwdXQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGVuY2Fwc3VsYXRlTm9kZUluVmVyc2VDb250YWluZXIoaHRtbEVsdDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBjb250ZW50ID0gSHRtbEhlbHBlci5zcGFuKCd2ZXJzZS1jb250ZW50JywgaHRtbEVsdCk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3ZlcnNlIHZlcnNlLWNvbnRhaW5lcicsIGNvbnRlbnQpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkIG5vZGUuXG4gICAgICogQHBhcmFtIG5vZGUgXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGJ1aWxkTm9kZUludGVybmFsKG5vZGU6IEJhc2VOb2RlLCBzaWJsaW5nczogSFRNTEVsZW1lbnRbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQnVpbGRpbmcgbm9kZScsIG5vZGUsICcuLi4nKTtcbiAgICAgICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Z1bmN0aW9uRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkRnVuY3Rpb25EZWNsYXJhdGlvbihub2RlLCBzaWJsaW5ncyk7XG4gICAgICAgICAgICBjYXNlICdCbG9ja1N0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRCbG9ja1N0YXRlbWVudChub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0lmU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZElmU3RhdGVtZW50KG5vZGUsIHNpYmxpbmdzKTtcbiAgICAgICAgICAgIGNhc2UgJ1ZhcmlhYmxlRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkVmFyaWFibGVEZWNsYXJhdGlvbihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ1ZhcmlhYmxlRGVjbGFyYXRvcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRWYXJpYWJsZURlY2xhcmF0b3Iobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdBc3NpZ25tZW50RXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRBc3NpZ25tZW50RXhwcmVzc2lvbihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0JpbmFyeUV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQmluYXJ5RXhwcmVzc2lvbihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0V4cHJlc3Npb25TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkRXhwcmVzc2lvblN0YXRlbWVudChub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ1JldHVyblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRSZXR1cm5TdGF0ZW1lbnQobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdJZGVudGlmaWVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZElkZW50aWZpZXIobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdNZW1iZXJFeHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZE1lbWJlckV4cHJlc3Npb24obm9kZSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkRGVmYXVsdChub2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEZ1bmN0aW9uRGVjbGFyYXRpb24obm9kZTogQmFzZU5vZGUsIHNpYmxpbmdzOiBIVE1MRWxlbWVudFtdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgXG4gICAgICAgIGxldCBkZWNsU3RhcnRJdGVtczogKHN0cmluZyB8IEhUTUxFbGVtZW50KVtdO1xuICAgICAgICBpZiAobi5pZCkge1xuICAgICAgICAgICAgbGV0IGZ1bmNJZCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1pZCcsIG4uaWQubmFtZSk7XG4gICAgICAgICAgICBkZWNsU3RhcnRJdGVtcyA9IFsnZnVuY3Rpb24gJywgZnVuY0lkLCAnICggJ107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWNsU3RhcnRJdGVtcyA9IFsnZnVuY3Rpb24gKCAnXTsvLyArIGZ1bmMucGFyYW1zLm1hcCh4ID0+IHgubmFtZSkuam9pbignLCAnKSArICcgKSB7JztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJhbUNvdW50ID0gbi5wYXJhbXMubGVuZ3RoO1xuICAgICAgICBuLnBhcmFtcy5mb3JFYWNoKChwYXJhbSwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBFc3ByaW1hSGVscGVyLnBhdHRlcm5Ub1N0cmluZyhwYXJhbSk7XG4gICAgICAgICAgICBsZXQgZnVuY1BhcmFtID0gdGhpcy5idWlsZE5vZGUocGFyYW0pOy8vSHRtbEhlbHBlci5zcGFuKCdmdW5jLXBhcmFtJywgdmFyTmFtZSk7XG4gICAgICAgICAgICBkZWNsU3RhcnRJdGVtcy5wdXNoKGZ1bmNQYXJhbSk7XG4gICAgICAgICAgICBpZiAoaSA8IHBhcmFtQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgZGVjbFN0YXJ0SXRlbXMucHVzaCgnLCAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVjbFN0YXJ0SXRlbXMucHVzaCgnICkgeycpO1xuXG4gICAgICAgIGxldCBkZWNsU3RhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtc3RhcnQnLCBkZWNsU3RhcnRJdGVtcyk7XG4gICAgICAgIGxldCBmdW5jQm9keSA9IHRoaXMuYnVpbGROb2RlKG4uYm9keSk7XG4gICAgICAgIGxldCBkZWNsRW5kID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLWVuZCcsICd9Jyk7XG4gICAgICAgIGRlY2xFbmQgPSB0aGlzLmVuY2Fwc3VsYXRlTm9kZUluVmVyc2VDb250YWluZXIoZGVjbEVuZCk7XG4gICAgICAgIC8vbGV0IGRlY2wgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtZGVjbGFyYXRpb24nLCBbZGVjbFN0YXJ0LCBmdW5jQm9keSwgZGVjbEVuZF0pO1xuICAgICAgICBsZXQgZGVjbCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1kZWNsYXJhdGlvbicsIGRlY2xTdGFydCk7XG4gICAgICAgIHNpYmxpbmdzLnB1c2goZnVuY0JvZHkpO1xuICAgICAgICBzaWJsaW5ncy5wdXNoKGRlY2xFbmQpO1xuICAgICAgICByZXR1cm4gZGVjbDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRCbG9ja1N0YXRlbWVudChub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICBsZXQgYm9keVN0YXRlbWVudHMgPSBuLmJvZHkubWFwKHN0YXRlbWVudCA9PiB0aGlzLmJ1aWxkTm9kZShzdGF0ZW1lbnQpKVxuICAgICAgICByZXR1cm4gSHRtbEhlbHBlci5zcGFuKCdibG9jaycsIGJvZHlTdGF0ZW1lbnRzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRJZlN0YXRlbWVudChub2RlOiBCYXNlTm9kZSwgc2libGluZ3M6IEhUTUxFbGVtZW50W10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBJZlN0YXRlbWVudDtcbiAgICAgICAgbGV0IGNvbnRlbnQ6IEhUTUxFbGVtZW50W10gPSBbXVxuICAgICAgICBsZXQgdGVzdCA9IHRoaXMuYnVpbGROb2RlKG4udGVzdCk7XG4gICAgICAgIGxldCBpZlN0YXJ0VGV4dCA9IFsnaWYgKCAnLCB0ZXN0LCAnICkgeyddO1xuICAgICAgICBsZXQgaWZTdGFydCA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLXN0YXRlbWVudC1zdGFydCcsIGlmU3RhcnRUZXh0KTtcbiAgICAgICAgY29udGVudC5wdXNoKGlmU3RhcnQpO1xuXG4gICAgICAgIGxldCB0aGVuQmxvY2sgPSB0aGlzLmJ1aWxkTm9kZShuLmNvbnNlcXVlbnQpO1xuICAgICAgICBsZXQgaWZUaGVuID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtYmxvY2stdGhlbicsIHRoZW5CbG9jayk7XG4gICAgICAgIGNvbnRlbnQucHVzaChpZlRoZW4pO1xuICAgICAgICBzaWJsaW5ncy5wdXNoKHRoZW5CbG9jayk7XG5cbiAgICAgICAgaWYgKG4uYWx0ZXJuYXRlKSB7XG4gICAgICAgICAgICBsZXQgaWZFbHNlRGVjbCA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLXN0YXRlbWVudC1lbHNlJywgJ30gZWxzZSB7Jyk7XG4gICAgICAgICAgICBpZkVsc2VEZWNsID0gdGhpcy5lbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGlmRWxzZURlY2wpO1xuICAgICAgICAgICAgY29udGVudC5wdXNoKGlmRWxzZURlY2wpO1xuICAgICAgICAgICAgc2libGluZ3MucHVzaChpZkVsc2VEZWNsKTtcblxuICAgICAgICAgICAgbGV0IGVsc2VCbG9jayA9IHRoaXMuYnVpbGROb2RlKG4uYWx0ZXJuYXRlKTtcbiAgICAgICAgICAgIGxldCBpZkVsc2UgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1ibG9jay1lbHNlJywgZWxzZUJsb2NrKTtcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaChpZkVsc2UpO1xuICAgICAgICAgICAgc2libGluZ3MucHVzaChpZkVsc2UpO1xuICAgICAgICB9IFxuICAgICAgICBsZXQgaWZFbmQgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1zdGF0ZW1lbnQtZW5kJywgJ30nKTtcbiAgICAgICAgaWZFbmQgPSB0aGlzLmVuY2Fwc3VsYXRlTm9kZUluVmVyc2VDb250YWluZXIoaWZFbmQpO1xuICAgICAgICBjb250ZW50LnB1c2goaWZFbmQpO1xuICAgICAgICBzaWJsaW5ncy5wdXNoKGlmRW5kKTtcblxuICAgICAgICAvL2xldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1zdGF0ZW1lbnQnLCBjb250ZW50KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBpZlN0YXJ0O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZFZhcmlhYmxlRGVjbGFyYXRpb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0aW9uO1xuICAgICAgICBsZXQgZGVjbGFyYXRpb25zID0gbi5kZWNsYXJhdGlvbnMubWFwKGQgPT4gdGhpcy5idWlsZE5vZGUoZCkpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdkZWNsYXJhdGlvbiB2YXJpYWJsZS1kZWNsYXJhdGlvbicpO1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gbi5raW5kICsgJyAnO1xuICAgICAgICBkZWNsYXJhdGlvbnMuZm9yRWFjaChkID0+IGNvbnRhaW5lci5hcHBlbmRDaGlsZChkKSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkVmFyaWFibGVEZWNsYXJhdG9yKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdG9yO1xuICAgICAgICBsZXQgbGVmdFBhcnQgPSB0aGlzLmJ1aWxkTm9kZShuLmlkKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lcjtcbiAgICAgICAgaWYgKG4uaW5pdCkge1xuICAgICAgICAgICAgbGV0IGFzc2lnblBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ29wZXJhdG9yIGFzc2lnbi1vcGVyYXRvcicsICc9Jyk7XG4gICAgICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmJ1aWxkTm9kZShuLmluaXQpO1xuICAgICAgICAgICAgbGV0IHJpZ2h0UGFydCA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtdmFsdWUnLCByaWdodCk7XG4gICAgICAgICAgICBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gdmFyaWFibGUtZGVjbGFyYXRvcicsIFtsZWZ0UGFydCwgYXNzaWduUGFydCwgcmlnaHRQYXJ0XSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gdmFyaWFibGUtZGVjbGFyYXRvcicsIGxlZnRQYXJ0KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRBc3NpZ25tZW50RXhwcmVzc2lvbihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuYnVpbGROb2RlKG4ubGVmdCk7XG4gICAgICAgIGxldCBsZWZ0UGFydCA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtaWQnLCBsZWZ0KTtcbiAgICAgICAgbGV0IGFzc2lnblBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ29wZXJhdG9yIGFzc2lnbi1vcGVyYXRvcicsICc9Jyk7XG4gICAgICAgIGxldCByaWdodCA9IHRoaXMuYnVpbGROb2RlKG4ucmlnaHQpO1xuICAgICAgICBsZXQgcmlnaHRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS12YWx1ZScsIHJpZ2h0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiBhc3NpZ25tZW50LWV4cHJlc3Npb24nLCBbbGVmdFBhcnQsIGFzc2lnblBhcnQsIHJpZ2h0UGFydF0pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEJpbmFyeUV4cHJlc3Npb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBCaW5hcnlFeHByZXNzaW9uO1xuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuYnVpbGROb2RlKG4ubGVmdCk7XG4gICAgICAgIGxldCBsZWZ0UGFydCA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbicsIGxlZnQpO1xuICAgICAgICBsZXQgb3BlcmF0b3JQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdvcGVyYXRvciBleHByZXNzaW9uLW9wZXJhdG9yJywgbi5vcGVyYXRvcik7XG4gICAgICAgIGxldCByaWdodCA9IHRoaXMuYnVpbGROb2RlKG4ucmlnaHQpO1xuICAgICAgICBsZXQgcmlnaHRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uJywgcmlnaHQpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIGJpbmFyeS1leHByZXNzaW9uJywgW2xlZnRQYXJ0LCBvcGVyYXRvclBhcnQsIHJpZ2h0UGFydF0pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEV4cHJlc3Npb25TdGF0ZW1lbnQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBFeHByZXNzaW9uU3RhdGVtZW50O1xuICAgICAgICBsZXQgY29kZSA9IHRoaXMuYnVpbGROb2RlKG4uZXhwcmVzc2lvbik7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBleHByZXNzaW9uLXN0YXRlbWVudCcsIGNvZGUpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZFJldHVyblN0YXRlbWVudChub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIFJldHVyblN0YXRlbWVudDtcbiAgICAgICAgbGV0IGFyZyA9IHRoaXMuYnVpbGROb2RlKG4uYXJndW1lbnQpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgcmV0dXJuLXN0YXRlbWVudCcsIFsncmV0dXJuICcsIGFyZ10pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZElkZW50aWZpZXIobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBJZGVudGlmaWVyO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdpZGVudGlmaWVyJywgRXNwcmltYUhlbHBlci5wYXR0ZXJuVG9TdHJpbmcobikpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZE1lbWJlckV4cHJlc3Npb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBNZW1iZXJFeHByZXNzaW9uO1xuICAgICAgICBsZXQgb2JqZWN0ID0gdGhpcy5idWlsZE5vZGUobi5vYmplY3QpO1xuICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLmJ1aWxkTm9kZShuLnByb3BlcnR5KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiBtZW1iZXItZXhwcmVzc2lvbicsIFtvYmplY3QsICcuJywgcHJvcGVydHldKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGREZWZhdWx0KG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdkZWZhdWx0OicsIG5vZGUpO1xuICAgICAgICBsZXQgY29kZSA9IGVzY29kZUdlbmVyYXRlKG5vZGUpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdkZWZhdWx0LScgKyBub2RlLnR5cGUsIGNvZGUpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBQcm9ncmVtQ29tcG9uZW50LCBQcm9ncmVtU2NoZWR1bGVyLCBIdG1sQ291cGxldEZhY3RvcnksIFByb2dyZW1TdGF0ZSwgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyLCBHcmlkQ2hhbmdlTGlzdGVuZXIgfSBmcm9tICcuLi8uLi9jb3JlL1R5cGVzJztcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBQcm9ncmVtQ29tcG9uZW50LCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciB7XG5cbiAgICBwcml2YXRlIGV4ZWN1dGluZ0VsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgcHJpdmF0ZSBleGVjdXRlZEVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVYRUNVVElOR19DTEFTUyA9ICd2ZXJzZS1leGVjdXRpbmcnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVhFQ1VURURfQ0xBU1MgPSAndmVyc2UtZXhlY3V0ZWQnO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyLFxuICAgICAgICBwcml2YXRlIGh0bWxGYWN0b3J5OiBIdG1sQ291cGxldEZhY3Rvcnk8YW55PlxuICAgICkge1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlQ29kZUV4ZWN1dGlvbih0aGlzKTtcbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUdyaWRDaGFuZ2UodGhpcyk7XG4gICAgfVxuXG4gICAgcmVuZGVySHRtbCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBodG1sQ29tcG9uZW50ID0gdGhpcy5odG1sRmFjdG9yeS5idWlsZENvdXBsZXQoKTtcbiAgICAgICAgcmV0dXJuIGh0bWxDb21wb25lbnQ7XG4gICAgfVxuICAgIFxuICAgIGZpcmVDb2RlRXhlY3V0aW9uKG9sZFN0YXRlOiBQcm9ncmVtU3RhdGUsIG5ld1N0YXRlOiBQcm9ncmVtU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFuZXdTdGF0ZS52ZXJzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgbGV0IGh0bWxWZXJzZSA9IHRoaXMuaHRtbEZhY3RvcnkuZ2V0SHRtbFZlcnNlKG5ld1N0YXRlLnZlcnNlKTtcbiAgICAgICAgaWYoaHRtbFZlcnNlKSB7XG4gICAgICAgICAgICBodG1sVmVyc2UuY2xhc3NMaXN0LmFkZChQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRoaXMuZXhlY3V0aW5nRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGVsdCA9IHRoaXMuZXhlY3V0aW5nRWxlbWVudHMucG9wKCk7XG4gICAgICAgICAgICBpZiAoZWx0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlZEVsZW1lbnRzLnB1c2goZWx0KTtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5hZGQoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRFRF9DTEFTUyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFodG1sVmVyc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZXhlY3V0aW5nRWxlbWVudHMucHVzaChodG1sVmVyc2UpO1xuICAgICAgICBodG1sVmVyc2UuY2xhc3NMaXN0LmFkZChQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgfVxuXG4gICAgZmlyZUdyaWRDaGFuZ2Uoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICB3aGlsZSAodGhpcy5leGVjdXRpbmdFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgZWx0ID0gdGhpcy5leGVjdXRpbmdFbGVtZW50cy5wb3AoKTtcbiAgICAgICAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVEVEX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAodGhpcy5leGVjdXRlZEVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBlbHQgPSB0aGlzLmV4ZWN1dGVkRWxlbWVudHMucG9wKCk7XG4gICAgICAgICAgICBpZiAoZWx0KSB7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5yZW1vdmUoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRFRF9DTEFTUyk7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5yZW1vdmUoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRJTkdfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBTdHlsZURlY29yYXRvciwgQ29sb3JQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNlTm9kZSwgSWRlbnRpZmllciB9IGZyb20gXCJlc3RyZWVcIjtcblxuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvQ29sb3JTZXJ2aWNlXCI7XG5pbXBvcnQgeyBFc3ByaW1hSGVscGVyIH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYUhlbHBlclwiO1xuaW1wb3J0IHsgSHRtbEhlbHBlciB9IGZyb20gXCIuLi8uLi9jb3JlL0h0bWxIZWxwZXJcIjtcblxuZXhwb3J0IGNsYXNzIENvbG9yVmFyaWFibGVTY29wZURlY29yYXRvciBpbXBsZW1lbnRzIFN0eWxlRGVjb3JhdG9yPHN0cmluZz4ge1xuXG4gICAgcHJpdmF0ZSB2YXJpYWJsZU1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKTtcbiAgICBwcml2YXRlIGNvbG9yUHJvdmlkZXI6IENvbG9yUHJvdmlkZXIgPSBDb2xvclNlcnZpY2UuY29sb3JQcm92aWRlcmFjdG9yeS5idWlsZCgpO1xuXG4gICAgZGVjb3JhdGUodmFySWQ6IHN0cmluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCB2YXJJbmRleCA9IHRoaXMudmFyaWFibGVNYXAuZ2V0KHZhcklkKTtcbiAgICAgICAgaWYgKCF2YXJJbmRleCkge1xuICAgICAgICAgICAgdmFySW5kZXggPSB0aGlzLnZhcmlhYmxlTWFwLnNpemUgKyAxO1xuICAgICAgICAgICAgdGhpcy52YXJpYWJsZU1hcC5zZXQodmFySWQsIHZhckluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndmFyaWFibGUtaGludCcpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3ZhcmlhYmxlLScgKyB2YXJJbmRleCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS1oaW50LWNvbnRhaW5lcicsIGVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH0gICAgXG4gICAgXG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBzdHlsZSA9ICcnO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCd2YXJpYWJsZSBjb3VudDonLCB0aGlzLnZhcmlhYmxlTWFwLnNpemUpO1xuICAgICAgICB0aGlzLnZhcmlhYmxlTWFwLmZvckVhY2goKGluZGV4LCBpZCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5jb2xvclByb3ZpZGVyLmhhc2hTdHJpbmdUb0NvbG9yKGlkLCAxNik7IC8vdGhpcy52YXJpYWJsZU1hcC5zaXplXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdidWlsZGluZyBjb2xvciAjJywgaWQsICc9PicsIGNvbG9yKTtcbiAgICAgICAgICAgIHN0eWxlICs9IGBcbiAgICAgICAgICAgICAgICAudmFyaWFibGUtc2NvcGUtY29tcG9uZW50IC52YXJpYWJsZS1oaW50LWNvbnRhaW5lciB7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogMC44ZW0gMCAwLjhlbSAwO1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLnZhcmlhYmxlLXNjb3BlLWNvbXBvbmVudCAudmFyaWFibGUtaGludCB7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAuMWVtIDAuNWVtIDAuMWVtIDAuNWVtO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMC44ZW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC52YXJpYWJsZS1zY29wZS1jb21wb25lbnQgLnZhcmlhYmxlLSR7aW5kZXh9LCBcbiAgICAgICAgICAgICAgICAudmFyaWFibGUtc2NvcGUtY29tcG9uZW50IC52YXJpYWJsZS0ke2luZGV4fSB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGA7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGFkVmVyc2VEZWNvcmF0b3IgaW1wbGVtZW50cyBTdHlsZURlY29yYXRvcjxCYXNlTm9kZT4ge1xuXG4gICAgZGVjb3JhdGUobm9kZTogQmFzZU5vZGUsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvZGUtcGFkZGluZycpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9ICAgIFxuICAgIFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYFxuICAgICAgICAuY29kZS1wYWRkaW5nIHtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAzMnB4O1xuICAgICAgICB9XG4gICAgICAgIGA7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBTY2hlZHVsaW5nU2VydmljZSB9IGZyb20gJy4vU2NoZWR1bGluZ1NlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Qcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50JztcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gJy4vU2NyZWVuU2VydmljZSc7XG5pbXBvcnQgeyBCYXNlTm9kZSB9IGZyb20gJ2VzdHJlZSc7XG5pbXBvcnQgeyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uLCBQcm9ncmVtU2NoZWR1bGVyLCBQcm9ncmVtQ29kZSwgUHJvZ3JlbVRlbXBvLCBQcm9ncmVtQ29uZmlnIH0gZnJvbSAnLi9UeXBlcyc7XG5pbXBvcnQgeyBQYWRWZXJzZURlY29yYXRvciwgQ29sb3JWZXJzZVZhcmlhYmxlRGVjb3JhdG9yIH0gZnJvbSAnLi4vY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9yU3R5bGVEZWNvcmF0b3JzJztcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tICcuL0h0bWxIZWxwZXInO1xuaW1wb3J0IHsgRXNwcmltYVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeSB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Fc3ByaW1hUHJvZ3JlbUluc3BlY3Rvckh0bWxGYWN0b3J5JztcbmltcG9ydCB7IENvZGVTZXJ2aWNlIH0gZnJvbSAnLi9Db2RlU2VydmljZSc7XG5pbXBvcnQgeyBQcm9ncmVtR3JpZENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUdyaWQvUHJvZ3JlbUdyaWRDb21wb25lbnQnO1xuaW1wb3J0IHsgVmFyaWFibGVTY29wZUNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvdmFyaWFibGVTY29wZS9WYXJpYWJsZVNjb3BlQ29tcG9uZW50JztcbmltcG9ydCB7IEVzcHJpbWFWYXJpYWJsZVNjb3BlSHRtbEZhY3RvcnkgfSBmcm9tICcuLi9jb21wb25lbnRzL3ZhcmlhYmxlU2NvcGUvRXNwcmltYVZhcmlhYmxlU2NvcGVIdG1sRmFjdG9yeSc7XG5pbXBvcnQgeyBDb2xvclZhcmlhYmxlU2NvcGVEZWNvcmF0b3IgfSBmcm9tICcuLi9jb21wb25lbnRzL3ZhcmlhYmxlU2NvcGUvRXNwcmltYVZhcmlhYmxlU2NvcGVTdHlsZURlY29yYXRvcnMnO1xuaW1wb3J0IHsgUHJvZ3JlbUVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUVkaXRvci9Qcm9ncmVtRWRpdG9yQ29tcG9uZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvZ3JlbUhlbHBlciB7XG5cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBQcm9ncmVtU2VydmljZSB7XG5cbiAgICB2YXIgcHJldmlvdXNSZXBhaW50VGltZSA9IDA7XG4gICAgdmFyIHNjaGVkdWxlcjogUHJvZ3JlbVNjaGVkdWxlcjtcbiAgICB2YXIgcHJvZ3JlbUFuaW1hdGlvblNwZWVkID0gMjtcbiAgICB2YXIgcHJvZ3JlbUFuaW1hdGlvbkludGVydmFscyA9IFs2MDAwMCwgNTAwMCwgMTAwMCwgNTAwLCAxMDAsIDEwLCAxXTtcbiAgICB2YXIgcHJvZ3JlbU1vZGUgPSBQcm9ncmVtVGVtcG8uQnlMaW5lO1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRGVmYXVsdENvbmZpZygpOiBQcm9ncmVtQ29uZmlnIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9ncmVtQ29uZmlnKCdTYW5zIHRpdHJlJywgMTcsIDE3LCAxKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gY3VycmVudFNjaGVkdWxlcigpOiBQcm9ncmVtU2NoZWR1bGVyIHtcbiAgICAgICAgcmV0dXJuIHNjaGVkdWxlcjtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtR3JpZENvbXBvbmVudChzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZzogUHJvZ3JlbUNvbmZpZywgY29udGFpbmVyOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGxldCBwcm9ncmVtR3JpZENvbXBvbmVudCA9IG5ldyBQcm9ncmVtR3JpZENvbXBvbmVudChzY3JlZW5Db25maWcsIHByb2dyZW1Db25maWcsIHNjaGVkdWxlciwgZG9jdW1lbnQpO1xuICAgICAgICBsZXQgcHJvZ3JlbUdyaWRIdG1sID0gcHJvZ3JlbUdyaWRDb21wb25lbnQucmVuZGVySHRtbCgpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocHJvZ3JlbUdyaWRIdG1sKTtcblxuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQocHJvZ3JlbUNvZGU6IFByb2dyZW1Db2RlPGFueT4sIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBsZXQgcHJvZ3JlbUNvdXBsZXQgPSBwcm9ncmVtQ29kZS5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk7XG4gICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9yRGVjb3JhdG9ycyA9IG5ldyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uPEJhc2VOb2RlPihbXG4gICAgICAgICAgICBuZXcgUGFkVmVyc2VEZWNvcmF0b3IoKSxcbiAgICAgICAgICAgIG5ldyBDb2xvclZlcnNlVmFyaWFibGVEZWNvcmF0b3IoKSxcbiAgICAgICAgICAgIC8vbmV3IEhpZ2hsaWdodEV4ZWN1dGluZ1ZlcnNlRGVjb3JhdG9yKHNjaGVkdWxlciksXG4gICAgICAgIF0pO1xuICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3RvckZhY3RvcnkgPSBuZXcgRXNwcmltYVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeShwcm9ncmVtQ291cGxldCwgcHJvZ3JlbUluc3BlY3RvckRlY29yYXRvcnMpO1xuICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3RvclZpZXcgPSBuZXcgUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudChzY2hlZHVsZXIsIHByb2dyZW1JbnNwZWN0b3JGYWN0b3J5KTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKCdjb2RlRWxlbWVudCcsIGNvZGVFbGVtZW50KTtcbiAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JIdG1sID0gcHJvZ3JlbUluc3BlY3RvclZpZXcucmVuZGVySHRtbCgpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocHJvZ3JlbUluc3BlY3Rvckh0bWwpO1xuXG4gICAgICAgIGxldCBkZWNvcmF0b3JTdHlsZSA9IHByb2dyZW1JbnNwZWN0b3JEZWNvcmF0b3JzLmJ1aWxkU3R5bGVTaGVldCgpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdkZWNvcmF0b3JTdHlsZTonLCBkZWNvcmF0b3JTdHlsZSlcbiAgICAgICAgSHRtbEhlbHBlci5kZWZpbmVDc3NSdWxlcygncHJvZ3JlbS1pbnNwZWN0b3ItY29tcG9uZW50JywgZGVjb3JhdG9yU3R5bGUpO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFZhcmlhYmxlU2NvcGVDb21wb25lbnQocHJvZ3JlbUNvZGU6IFByb2dyZW1Db2RlPGFueT4sIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBsZXQgcHJvZ3JlbUNvdXBsZXQgPSBwcm9ncmVtQ29kZS5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk7XG4gICAgICAgIGxldCB2YXJpYWJsZVNjb3BlRGVjb3JhdG9ycyA9IG5ldyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uPHN0cmluZz4oW1xuICAgICAgICAgICAgbmV3IENvbG9yVmFyaWFibGVTY29wZURlY29yYXRvcigpXG4gICAgICAgIF0pXG4gICAgICAgIGxldCBodG1sRmFjdG9yeSA9IG5ldyBFc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5KHByb2dyZW1Db3VwbGV0LCB2YXJpYWJsZVNjb3BlRGVjb3JhdG9ycywgc2NoZWR1bGVyKTtcbiAgICAgICAgbGV0IHZhcmlhYmxlU2NvcGVDb21wb25lbnQgPSBuZXcgVmFyaWFibGVTY29wZUNvbXBvbmVudChzY2hlZHVsZXIsIGh0bWxGYWN0b3J5KTtcbiAgICAgICAgbGV0IHZhcmlhYmxlU2NvcGVIdG1sID0gdmFyaWFibGVTY29wZUNvbXBvbmVudC5yZW5kZXJIdG1sKCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh2YXJpYWJsZVNjb3BlSHRtbCk7XG5cbiAgICAgICAgbGV0IGRlY29yYXRvclN0eWxlID0gdmFyaWFibGVTY29wZURlY29yYXRvcnMuYnVpbGRTdHlsZVNoZWV0KCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2RlY29yYXRvclN0eWxlOicsIGRlY29yYXRvclN0eWxlKVxuICAgICAgICBIdG1sSGVscGVyLmRlZmluZUNzc1J1bGVzKCd2YXJpYWJsZS1zY29wZS1jb21wb25lbnQnLCBkZWNvcmF0b3JTdHlsZSk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJvZ3JlbUVkaXRvckNvbXBvbmVudChwcm9ncmVtQ29kZTogUHJvZ3JlbUNvZGU8YW55Piwgc2NyZWVuQ29uZmlnOiBTY3JlZW5Db25maWcpOiB2b2lkIHtcbiAgICAgICAgbGV0IHByb2dyZW1FZGl0b3JDb21wb25lbnQgPSBuZXcgUHJvZ3JlbUVkaXRvckNvbXBvbmVudCgpO1xuICAgICAgICBwcm9ncmVtRWRpdG9yQ29tcG9uZW50LmF0dGFjaChkb2N1bWVudCk7XG4gICAgICAgIHByb2dyZW1FZGl0b3JDb21wb25lbnQubG9hZFByb2dyZW0ocHJvZ3JlbUNvZGUpO1xuICAgICAgICBwcm9ncmVtRWRpdG9yQ29tcG9uZW50LmJpbmRSZWZyZXNoKGNvZGUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ25ldyBwcm9ncmVtIGNvZGU6JywgY29kZSk7XG4gICAgICAgICAgICBsZXQgcHJvZ3JlbUNvZGUgPSBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFByb2dyZW0oY29kZSk7XG5cbiAgICAgICAgICAgIGxldCBzY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZW0tc2NyaXB0LXRhZycpIGFzIEhUTUxTY3JpcHRFbGVtZW50O1xuICAgICAgICAgICAgc2NyaXB0RWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICAgICAgc2NyaXB0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwcm9ncmVtLXNjcmlwdC10YWcnKVxuICAgICAgICAgICAgc2NyaXB0RWxlbWVudC50ZXh0ID0gY29kZTtcbiAgICAgICAgICAgIGxldCBib2R5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgICAgICAgIGlmIChib2R5RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGJvZHlFbGVtZW50LmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnVpbGRQcm9ncmVtVmlld2VyKHByb2dyZW1Db2RlLCBzY3JlZW5Db25maWcsIGJ1aWxkRGVmYXVsdENvbmZpZygpKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtVmlld2VyKHByb2dyZW1Db2RlOiBQcm9ncmVtQ29kZTxhbnk+LCBzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZzogUHJvZ3JlbUNvbmZpZykge1xuICAgICAgICAvLyBMb2FkIGluaXRQcm9ncmVtIEZ1bmN0aW9uIGNvZGVcbiAgICAgICAgbGV0IGluaXRQcm9ncmVtRnVuY3Rpb25Db2RlID0gZXNjb2RlR2VuZXJhdGUocHJvZ3JlbUNvZGUuaW5pdGlhbGlzZXJQcm9ncmVtRnVuY3Rpb24oKS5mdW5jdGlvblJvb3ROb2RlKTtcbiAgICAgICAgKHdpbmRvdyBhcyBhbnkpLmV2YWwoaW5pdFByb2dyZW1GdW5jdGlvbkNvZGUpO1xuXG4gICAgICAgIHNjaGVkdWxlciA9IFNjaGVkdWxpbmdTZXJ2aWNlLmJ1aWxkUHJvZ3JlbVNjaGVkdWxlcihwcm9ncmVtQ29uZmlnLCBwcm9ncmVtQ29kZSwgcHJvZ3JlbU1vZGUpO1xuICAgICAgICBjb25zdCB0aXRyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aXRyZScpO1xuICAgICAgICBpZiAodGl0cmUpIHtcbiAgICAgICAgICAgIHRpdHJlLmlubmVySFRNTCA9IHByb2dyZW1Db25maWcudGl0cmU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvZ3JlbUdyaWRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignLnByb2dyZW0tZ3JpZC1jb21wb25lbnQnKTtcbiAgICAgICAgaWYgKHByb2dyZW1HcmlkQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBidWlsZFByb2dyZW1HcmlkQ29tcG9uZW50KHNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZywgcHJvZ3JlbUdyaWRDb250YWluZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignLnByb2dyZW0taW5zcGVjdG9yLWNvbXBvbmVudCcpO1xuICAgICAgICBpZiAocHJvZ3JlbUluc3BlY3RvckNvbnRhaW5lcikge1xuICAgICAgICAgICAgYnVpbGRQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50KHByb2dyZW1Db2RlLCBwcm9ncmVtSW5zcGVjdG9yQ29udGFpbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2YXJpYWJsZVNjb3BlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJy52YXJpYWJsZS1zY29wZS1jb21wb25lbnQnKTtcbiAgICAgICAgaWYgKHZhcmlhYmxlU2NvcGVDb250YWluZXIpIHtcbiAgICAgICAgICAgIGJ1aWxkVmFyaWFibGVTY29wZUNvbXBvbmVudChwcm9ncmVtQ29kZSwgdmFyaWFibGVTY29wZUNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRDb250cm9sUGFuZWxDb21wb25lbnQoKSB7XG4gICAgICAgIGxldCBzcGVlZENvbnRyb2xFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNvbnRyb2wtcGFuZWwtY29tcG9uZW50IC5zcGVlZC1zZWxlY3RvcmApYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgc3BlZWRDb250cm9sRWxlbWVudC52YWx1ZSA9IFN0cmluZyhwcm9ncmVtQW5pbWF0aW9uU3BlZWQpO1xuICAgICAgICBsZXQgc3BlZWRTZWxlY3Rvck9ic2VydmFibGUgPSBPYnNlcnZhYmxlLmZyb21FdmVudChzcGVlZENvbnRyb2xFbGVtZW50LCAnY2hhbmdlJyk7XG4gICAgICAgIHNwZWVkU2VsZWN0b3JPYnNlcnZhYmxlLnN1YnNjcmliZShldmVudCA9PiBwcm9ncmVtQW5pbWF0aW9uU3BlZWQgPSBOdW1iZXIoKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSkpO1xuXG4gICAgICAgIGxldCBtb2RlQ29udHJvbEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29udHJvbC1wYW5lbC1jb21wb25lbnQgLm1vZGUtc2VsZWN0b3JgKWFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIG1vZGVDb250cm9sRWxlbWVudC52YWx1ZSA9IFN0cmluZyhzY2hlZHVsZXIudGVtcG8pO1xuICAgICAgICBsZXQgbW9kZVNlbGVjdG9yT2JzZXJ2YWJsZSA9IE9ic2VydmFibGUuZnJvbUV2ZW50KG1vZGVDb250cm9sRWxlbWVudCwgJ2NoYW5nZScpO1xuICAgICAgICBtb2RlU2VsZWN0b3JPYnNlcnZhYmxlLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICBwcm9ncmVtTW9kZSA9IE51bWJlcigoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcbiAgICAgICAgICAgIGN1cnJlbnRTY2hlZHVsZXIoKS50ZW1wbyA9IHByb2dyZW1Nb2RlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtKHVybDogc3RyaW5nLCBzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZykge1xuICAgICAgICBsZXQgcHJvZ3JlbUNvbmZpZyA9IGJ1aWxkRGVmYXVsdENvbmZpZygpO1xuICAgICAgICBsZXQgcHJvZ3JlbVNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBwcm9ncmVtU2NyaXB0LmNsYXNzTGlzdC5hZGQoJ3Byb2dyZW0tc2NyaXB0LXRhZycpXG4gICAgICAgIHByb2dyZW1TY3JpcHQuc3JjID0gdXJsO1xuICAgICAgICBsZXQgYm9keUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICAgIGlmIChib2R5RWxlbWVudCkge1xuICAgICAgICAgICAgYm9keUVsZW1lbnQuYXBwZW5kQ2hpbGQocHJvZ3JlbVNjcmlwdCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZygnTG9hZGluZyBwcm9ncmVtIGF0IFVSTDonLCB1cmwpO1xuICAgICAgICBDb2RlU2VydmljZS5sb2FkUHJvZ3JlbSh1cmwpLnRoZW4oY29kZSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJvZ3JlbUNvZGUgPSBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFByb2dyZW0oY29kZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJ1aWxkUHJvZ3JlbVZpZXdlcihwcm9ncmVtQ29kZSwgc2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnKTtcblxuICAgICAgICAgICAgYnVpbGRDb250cm9sUGFuZWxDb21wb25lbnQoKTtcblxuICAgICAgICAgICAgYnVpbGRQcm9ncmVtRWRpdG9yQ29tcG9uZW50KHByb2dyZW1Db2RlLCBzY3JlZW5Db25maWcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aW1lcigwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGltZXIodGltZXN0YW1wOiBudW1iZXIpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aW1lcik7XG5cbiAgICAgICAgaWYgKHRpbWVzdGFtcCAtIHByZXZpb3VzUmVwYWludFRpbWUgPCBwcm9ncmVtQW5pbWF0aW9uSW50ZXJ2YWxzW3Byb2dyZW1BbmltYXRpb25TcGVlZF0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZpb3VzUmVwYWludFRpbWUgPSB0aW1lc3RhbXA7XG5cbiAgICAgICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgICAgICAgc2NoZWR1bGVyLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCB7IFN0eWxlRGVjb3JhdG9yLCBQcm9ncmVtU2NoZWR1bGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IEJhc2VOb2RlLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBCbG9ja1N0YXRlbWVudCwgSWZTdGF0ZW1lbnQsIFZhcmlhYmxlRGVjbGFyYXRvciwgVmFyaWFibGVEZWNsYXJhdGlvbiwgQXNzaWdubWVudEV4cHJlc3Npb24sIEJpbmFyeUV4cHJlc3Npb24sIEV4cHJlc3Npb25TdGF0ZW1lbnQsIFJldHVyblN0YXRlbWVudCwgSWRlbnRpZmllciwgTWVtYmVyRXhwcmVzc2lvbiB9IGZyb20gXCJlc3RyZWVcIjtcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9IdG1sSGVscGVyXCI7XG5pbXBvcnQgeyBFc3ByaW1hSGVscGVyIH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYUhlbHBlclwiO1xuaW1wb3J0IHsgRXNwcmltYVZlcnNlLCBFc3ByaW1hSHRtbENvdXBsZXRGYWN0b3J5LCBFc3ByaW1hQ291cGxldCB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFUeXBlc1wiO1xuaW1wb3J0IHsgc3RyaW5naWZ5IH0gZnJvbSBcInF1ZXJ5c3RyaW5nXCI7XG5cbmV4cG9ydCBjbGFzcyBFc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5IGltcGxlbWVudHMgRXNwcmltYUh0bWxDb3VwbGV0RmFjdG9yeSB7XG5cbiAgICBwcml2YXRlIHZhckhpbnRCeVZlcnNlc01hcDogTWFwPEJhc2VOb2RlLCBIVE1MRWxlbWVudFtdPiA9IG5ldyBNYXAoKTtcbiAgICBwcml2YXRlIHZhckhpbnRVcGRhdGVyTWFwOiBNYXA8QmFzZU5vZGUsICh2YWx1ZTogYW55KSA9PiB2b2lkPiA9IG5ldyBNYXAoKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvdXBsZXQ6IEVzcHJpbWFDb3VwbGV0LFxuICAgICAgICBwcml2YXRlIGRlY29yYXRvcjogU3R5bGVEZWNvcmF0b3I8c3RyaW5nPixcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXJcbiAgICApIHt9XG5cbiAgICBidWlsZENvdXBsZXQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS1zY29wZS1jb21wb25lbnQnKVxuXG4gICAgICAgIC8vIEZJWE1FIGlsIGZhdWRyYWl0IHBhcmNvdXJpciBsJ2FyYnJlIEFTVCBhdmVjIHVuIHdhbGtlciBvdSB1biB0cnVjIGR1IGdlbnJlLlxuICAgICAgICAvLyBGSVhNRSBncm9zIGhhY2sgZHUgc3lzdMOobWUgZGUgSHRtbEZhY3RvcnkgZXQgZGUgRGVjb3JhdG9yIHBvdXIgcmVhbGlzZXIgY2UgY29tcG9zYW50LlxuICAgICAgICAvLyBCdWlsZCBhbGwgVmFyaWFibGVIaW50IHdoaWNoIHdpbGwgYmUgYWRkZWQgaW4gdmlldyBjb250YWluZXIgb25lIGJ5IG9uZSBieSBnZXRIdG1sVmVyc2UoKVxuICAgICAgICB0aGlzLmNvdXBsZXQudmVyc2VzLmZvckVhY2godiA9PiB7XG4gICAgICAgICAgICBsZXQgdmFySGludHMgPSB0aGlzLmJ1aWxkVmFyaWFibGVIaW50cyh2Lm5vZGUpO1xuICAgICAgICAgICAgbGV0IGRlY29yYXRlZFZhckhpbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgICAgICAgICB2YXJIaW50cy5mb3JFYWNoKCh2YXJIaW50LCB2YXJOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGRlY29yYXRlZCA9IHRoaXMuZGVjb3JhdG9yLmRlY29yYXRlKHZhck5hbWUsIHZhckhpbnQpO1xuICAgICAgICAgICAgICAgIGRlY29yYXRlZFZhckhpbnRzLnB1c2goZGVjb3JhdGVkKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGVjb3JhdGVkKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLnZhckhpbnRCeVZlcnNlc01hcC5zZXQodi5ub2RlLCBkZWNvcmF0ZWRWYXJIaW50cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2xlYXJWaWV3KCk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9ICAgIFxuICAgIFxuICAgIGdldEh0bWxWZXJzZSh2ZXJzZTogRXNwcmltYVZlcnNlKTogSFRNTEVsZW1lbnR8dW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRoaXMudmFySGludEJ5VmVyc2VzTWFwLnNpemUgPT09IDAgfHwgIXZlcnNlLm5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodG1sRWxlbWVudHMgPSB0aGlzLnZhckhpbnRCeVZlcnNlc01hcC5nZXQodmVyc2Uubm9kZSk7XG4gICAgICAgIGlmICghaHRtbEVsZW1lbnRzIHx8IGh0bWxFbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuc2NoZWR1bGVyLmN1cnJlbnQoKTtcbiAgICAgICAgbGV0IHZhbHVlc01hcCA9IEVzcHJpbWFIZWxwZXIuZ2V0VmFyaWFibGVWYWx1ZXMoc3RhdGUsIHZlcnNlLm5vZGUpO1xuICAgICAgICBsZXQgdmFySGludFVwZGF0ZXIgPSB0aGlzLnZhckhpbnRVcGRhdGVyTWFwLmdldCh2ZXJzZS5ub2RlKTtcbiAgICAgICAgaWYgKHZhckhpbnRVcGRhdGVyKSB7XG4gICAgICAgICAgICB2YXJIaW50VXBkYXRlcih2YWx1ZXNNYXApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBTaG93IGVsZW1lbnRzXG4gICAgICAgIGh0bWxFbGVtZW50cy5mb3JFYWNoKGhpbnQgPT4gaGludC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKSk7XG5cbiAgICAgICAgLy9sZXQgdmVyc2VDb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3ZlcnNlLWNvbnRhaW5lcicsIGh0bWxFbGVtZW50cyk7XG4gICAgICAgIC8vcmV0dXJuIHZlcnNlQ29udGFpbmVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhclZpZXcoKTogdm9pZCB7XG4gICAgICAgIC8vIEhpZGUgZWxlbWVudHNcbiAgICAgICAgdGhpcy52YXJIaW50QnlWZXJzZXNNYXAuZm9yRWFjaChoaW50cyA9PiBoaW50cy5mb3JFYWNoKGhpbnQgPT4gaGludC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKSkpO1xuICAgICAgICAvLyBSZXNldCB2YWx1ZVxuICAgICAgICB0aGlzLnZhckhpbnRVcGRhdGVyTWFwLmZvckVhY2goKHZhckhpbnRVcGRhdGVyLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHZhckhpbnRVcGRhdGVyKG5ldyBNYXAoKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkIGEgVmFyaWFibGUgSGludCBpZiB0aGUgc3VwcGxpZWQgbm9kZSBjb250YWlucyBhIFZhcmlhYmxlIGFmZmVjdGF0aW9uLlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHJldHVybnMgYW4gSFRNTEVsZW1lbnQgb3IgbnVsbCBpZiBubyBoaW50IHNob3VsZCBhcHBlYXIgZm9yIHRoaXMgbm9kZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBidWlsZFZhcmlhYmxlSGludHMobm9kZTogQmFzZU5vZGUpOiBNYXA8c3RyaW5nLCBIVE1MRWxlbWVudD4ge1xuICAgICAgICBsZXQgdmFyTm9kZSA9IEVzcHJpbWFIZWxwZXIucmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24obm9kZSk7XG4gICAgICAgIGlmICghdmFyTm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNYXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2YXJOYW1lcyA9IEVzcHJpbWFIZWxwZXIuZ2V0VmFyaWFibGVOYW1lcyh2YXJOb2RlKTtcbiAgICAgICAgbGV0IHZhckhpbnRzID0gdmFyTmFtZXMubWFwKHZhck5hbWUgPT4ge1xuICAgICAgICAgICAgbGV0IHZhclZhbHVlID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS1oaW50LXZhbHVlJyk7XG4gICAgICAgICAgICBsZXQgdmFySGludCA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtaGludCcsIFtgJHt2YXJOYW1lfTogYCwgdmFyVmFsdWVdKTtcbiAgICAgICAgICAgIHJldHVybiB7dmFyTmFtZSwgdmFySGludCwgdmFyVmFsdWV9O1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdmFsVXBkYXRlciA9ICh2YWxzQnlWYXJOYW1lOiBNYXA8c3RyaW5nLCBhbnk+KSA9PiB7XG4gICAgICAgICAgICB2YXJIaW50cy5mb3JFYWNoKHZhckhpbnQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YWwgPSB2YWxzQnlWYXJOYW1lLmdldCh2YXJIaW50LnZhck5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICB2YXJIaW50LnZhclZhbHVlLmlubmVyVGV4dCA9IHZhbC50b0ZpeGVkKDIpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFySGludC52YXJWYWx1ZS5pbm5lclRleHQgPSB2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudmFySGludFVwZGF0ZXJNYXAuc2V0KG5vZGUsIHZhbFVwZGF0ZXIpO1xuXG4gICAgICAgIGxldCB2YXJIaW50c0J5TmFtZSA9IG5ldyBNYXA8c3RyaW5nLCBIVE1MRWxlbWVudD4oKTtcbiAgICAgICAgdmFySGludHMuZm9yRWFjaCh2YXJIaW50ID0+IHZhckhpbnRzQnlOYW1lLnNldCh2YXJIaW50LnZhck5hbWUsIHZhckhpbnQudmFySGludCkpO1xuXG4gICAgICAgIHJldHVybiB2YXJIaW50c0J5TmFtZTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBFdmFsU2NvcGUgfSBmcm9tIFwiLi9FdmFsU2VydmljZVwiO1xuXG5leHBvcnQgY2xhc3MgUHJvZ3JlbUNvbmZpZyB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB0aXRyZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgbm9tYnJlQ29sb25uZXM6IG51bWJlcixcbiAgICAgICAgcHVibGljIG5vbWJyZUxpZ25lczogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgbm9tYnJlRnJhbWVzOiBudW1iZXIsXG4gICAgKSB7IH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+IHtcbiAgICBub2RlOiBBc3RCYXNlVHlwZVxuICAgIGNvZGU6IEFzdEJhc2VUeXBlXG59XG4vKlxuZXhwb3J0IGludGVyZmFjZSBWZXJzZUluc3RydWN0aW9uRmFjdG9yeTxBc3RCYXNlVHlwZT4ge1xuICAgIGJ1aWxkKHBhcmFtOiBBc3RCYXNlVHlwZSk6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT47XG59XG4qL1xuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtQ291cGxldDxBc3RCYXNlVHlwZT4ge1xuICAgIGZ1bmN0aW9uUm9vdE5vZGU6IEFzdEJhc2VUeXBlXG4gICAgdmVyc2VzOiBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+W11cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtRmFjdG9yeTxBc3RCYXNlVHlwZT4ge1xuICAgIGJ1aWxkUHJvZ3JlbShjb2RlOiBzdHJpbmcpOiBQcm9ncmVtQ29kZTxBc3RCYXNlVHlwZT5cbiAgICBidWlsZENvdXBsZXQobm9kZTogQXN0QmFzZVR5cGUsIHZlcnNlczogQXN0QmFzZVR5cGVbXSk6IFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPlxuICAgIGJ1aWxkVmVyc2Uobm9kZTogQXN0QmFzZVR5cGUpOiBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmVyc2VJdGVyYXRvcjxBc3RCYXNlVHlwZT4ge1xuICAgIGV4ZWN1dGVOZXh0KCk6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT5cbiAgICBoYXNOZXh0KCk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbUNvZGU8QXN0QmFzZVR5cGU+IHtcbiAgICBpbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpOiBQcm9ncmVtQ291cGxldDxBc3RCYXNlVHlwZT5cbiAgICBjb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk6IFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPlxuICAgIGl0ZXJhdG9yKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiBWZXJzZUl0ZXJhdG9yPEFzdEJhc2VUeXBlPlxufVxuXG5leHBvcnQgY2xhc3MgUHJvZ3JlbVN0YXRlIHtcblxuICAgIHB1YmxpYyByZWFkb25seSBldmFsU2NvcGUgPSBuZXcgRXZhbFNjb3BlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjb2xvbm5lOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBsaWduZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZnJhbWU6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvbnRleHRlOiBvYmplY3QsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB2ZXJzZTogUHJvZ3JlbVZlcnNlPGFueT4gfCBudWxsLFxuICAgICkge31cblxuICAgIHB1YmxpYyBldmFsKGV4cHI6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2YWxTY29wZS5nbG9iYWxFdmFsKGV4cHIpO1xuICAgIH1cbn1cbnR5cGUgU3RhdGVDYWxsYmFjayA9IChzdGF0ZTogUHJvZ3JlbVN0YXRlKSA9PiB2b2lkO1xudHlwZSBOZXdTdGF0ZUNhbGxiYWNrID0gKG9sZFN0YXRlOiBQcm9ncmVtU3RhdGUsIG5ld1N0YXRlOiBQcm9ncmVtU3RhdGUpID0+IHZvaWQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIge2ZpcmVTdGFydEl0ZXJhdGluZ0NvZGU6IFN0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBDb2RlRXhlY3V0aW9uTGlzdGVuZXIge2ZpcmVDb2RlRXhlY3V0aW9uOiBOZXdTdGF0ZUNhbGxiYWNrfTtcblxuLyoqXG4gKiBMaXN0ZW4gZm9yIGdyaWQgY2hhbmdlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRDaGFuZ2VMaXN0ZW5lciB7ZmlyZUdyaWRDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBMaW5lQ2hhbmdlTGlzdGVuZXIge2ZpcmVMaW5lQ2hhbmdlOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgRnJhbWVDaGFuZ2VMaXN0ZW5lciB7ZmlyZUZyYW1lQ2hhbmdlOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgUGFpbnRpbmdMaXN0ZW5lciB7ZmlyZVBhaW50aW5nOiAoKSA9PiB2b2lkfTtcbmV4cG9ydCBpbnRlcmZhY2UgRW5kQW5pbWF0aW9uTGlzdGVuZXIge2ZpcmVFbmRBbmltYXRpb246ICgpID0+IHZvaWR9O1xuXG5leHBvcnQgZW51bSBQcm9ncmVtVGVtcG8ge1xuICAgIEJ5VmVyc2UgPSAwLFxuICAgIEJ5UGl4ZWwsXG4gICAgQnlMaW5lLFxuICAgIEJ5RnJhbWVcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN1YnNjcmlwdGlvbiB7XG4gICAgYWJzdHJhY3QgdW5zdWJzY3JpYmUoKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtU2NoZWR1bGVyIHtcbiAgICBzdWJzY3JpYmVTdGFydEl0ZXJhdGluZ0NvZGUobGlzdGVuZXI6IFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyKTogU3Vic2NyaXB0aW9uXG4gICAgc3Vic2NyaWJlQ29kZUV4ZWN1dGlvbihsaXN0ZW5lcjogQ29kZUV4ZWN1dGlvbkxpc3RlbmVyKTogU3Vic2NyaXB0aW9uXG4gICAgc3Vic2NyaWJlR3JpZENoYW5nZShsaXN0ZW5lcjogR3JpZENoYW5nZUxpc3RlbmVyKTogU3Vic2NyaXB0aW9uXG4gICAgc3Vic2NyaWJlTGluZUNoYW5nZShsaXN0ZW5lcjogTGluZUNoYW5nZUxpc3RlbmVyKTogU3Vic2NyaXB0aW9uXG4gICAgc3Vic2NyaWJlRnJhbWVDaGFuZ2UobGlzdGVuZXI6IEZyYW1lQ2hhbmdlTGlzdGVuZXIpOiBTdWJzY3JpcHRpb25cbiAgICBzdWJzY3JpYmVQYWludGluZyhsaXN0ZW5lcjogUGFpbnRpbmdMaXN0ZW5lcik6IFN1YnNjcmlwdGlvblxuICAgIHN1YnNjcmliZUVuZEFuaW1hdGlvbihsaXN0ZW5lcjogRW5kQW5pbWF0aW9uTGlzdGVuZXIpOiBTdWJzY3JpcHRpb25cblxuICAgIHJlc2V0KCk6IFByb2dyZW1TdGF0ZVxuICAgIGN1cnJlbnQoKTogUHJvZ3JlbVN0YXRlXG4gICAgbmV4dCgpOiBQcm9ncmVtU3RhdGVbXVxuICAgIGdldFByb2dyZW0oKTogUHJvZ3JlbUNvZGU8YW55PlxuICAgIHRlbXBvOiBQcm9ncmVtVGVtcG9cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtQ29tcG9uZW50IHtcbiAgICByZW5kZXJIdG1sKCk6IEhUTUxFbGVtZW50XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3R5bGVEZWNvcmF0b3I8VD4ge1xuICAgIGRlY29yYXRlKG5vZGU6IFQsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnRcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSHRtbENvdXBsZXRGYWN0b3J5PEFzdEJhc2VUeXBlPiB7XG4gICAgYnVpbGRDb3VwbGV0KCk6IEhUTUxFbGVtZW50XG4gICAgZ2V0SHRtbFZlcnNlKHZlcnNlOiBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+KTogSFRNTEVsZW1lbnR8dW5kZWZpbmVkXG59XG5cbmV4cG9ydCBjbGFzcyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uPFQ+IGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8VD4ge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNvcmF0b3JzOiBTdHlsZURlY29yYXRvcjxUPltdKSB7fVxuXG4gICAgZGVjb3JhdGUobm9kZTogVCwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCB0ZW1wOiBIVE1MRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuZGVjb3JhdG9ycy5mb3JFYWNoKGQgPT4gdGVtcCA9IGQuZGVjb3JhdGUobm9kZSwgdGVtcCkpO1xuICAgICAgICByZXR1cm4gdGVtcDtcbiAgICB9XG5cbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjb3JhdG9ycy5tYXAoZCA9PiBkLmJ1aWxkU3R5bGVTaGVldCgpKS5qb2luKCdcXG4nKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2xvclByb3ZpZGVyIHtcbiAgICBoc2xDb2xvcihodWU6IG51bWJlcik6IHN0cmluZztcbiAgICBoYXNoU3RyaW5nVG9Db2xvcihrZXk6IHN0cmluZywgY29sb3JDb3VudDogbnVtYmVyLCBzaGlmdD86IG51bWJlcik6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2xvclByb3ZpZGVyRmFjdG9yeSB7XG4gICAgYnVpbGQoa2V5Pzogc3RyaW5nKTogQ29sb3JQcm92aWRlcjtcbn0iLCJpbXBvcnQgeyBQcm9ncmVtRmFjdG9yeSB9IGZyb20gXCIuL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNpY0VzcHJpbWFQcm9ncmVtRmFjdG9yeSB9IGZyb20gXCIuLi9lc3ByaW1hL0Jhc2ljRXNwcmltYVByb2dyZW1cIjtcblxuZXhwb3J0IG5hbWVzcGFjZSBDb2RlU2VydmljZSB7XG5cbiAgICBleHBvcnQgY29uc3QgcHJvZ3JlbUZhY3Rvcnk6IFByb2dyZW1GYWN0b3J5PGFueT4gPSBuZXcgQmFzaWNFc3ByaW1hUHJvZ3JlbUZhY3RvcnkoKTtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBsb2FkUHJvZ3JlbShmaWxlVXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2xpZW50ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICBjbGllbnQub3BlbignR0VUJywgZmlsZVVybCk7XG4gICAgICAgICAgICBjbGllbnQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb2RlID0gY2xpZW50LnJlc3BvbnNlVGV4dDtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb2RlU2VydmljZTogUHJvZ3JlbSBsb2FkZWQgc3VjY2Vzc2Z1bGx5LicsIGNvZGUpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoY29kZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2xpZW50Lm9uZXJyb3IgPSAoKSA9PiByZWplY3QoY2xpZW50LnN0YXR1c1RleHQpO1xuICAgICAgICAgICAgY2xpZW50LnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59IiwiXG5leHBvcnQgY2xhc3MgU2NyZWVuQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGJveFNpemU6IG51bWJlclxuICAgICkge31cbn1cblxuZXhwb3J0IGNsYXNzIFNjcmVlblNlcnZpY2Uge1xuXG4gICAgcHVibGljIGdldFNjcmVlbkZyYW1lKCk6IGFueSB7XG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBQYXR0ZXJuLCBJZGVudGlmaWVyLCBCYXNlTm9kZSwgVmFyaWFibGVEZWNsYXJhdGlvbiwgQXNzaWdubWVudEV4cHJlc3Npb24sIEZ1bmN0aW9uRGVjbGFyYXRpb24sIE5vZGUgfSBmcm9tIFwiZXN0cmVlXCI7XG5pbXBvcnQgeyBQcm9ncmVtU3RhdGUgfSBmcm9tIFwiLi4vY29yZS9UeXBlc1wiO1xuXG5leHBvcnQgdHlwZSBOb2RlV2l0aFBhcmVudCA9IE5vZGUgJiB7IHBhcmVudD86IE5vZGUgfTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEVzcHJpbWFIZWxwZXIge1xuXG4gICAgcHVibGljIHN0YXRpYyBwYXR0ZXJuVG9TdHJpbmcocGF0dGVybjogUGF0dGVybik6IHN0cmluZyB7XG4gICAgICAgIHZhciBub2RlO1xuICAgICAgICBzd2l0Y2ggKHBhdHRlcm4udHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnSWRlbnRpZmllcic6XG4gICAgICAgICAgICAgICAgbm9kZSA9IHBhdHRlcm4gYXMgSWRlbnRpZmllcjtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5uYW1lO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gY29udmVydCBwYXR0ZXJuIG9mIHR5cGUgJyArIHBhdHRlcm4udHlwZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZWR1Y2VOb2RlVG9WYXJEZWNsYXJhdGlvbihub2RlOiBCYXNlTm9kZSk6IFZhcmlhYmxlRGVjbGFyYXRpb24gfCBBc3NpZ25tZW50RXhwcmVzc2lvbiB8IEZ1bmN0aW9uRGVjbGFyYXRpb24gfCB1bmRlZmluZWQge1xuICAgICAgICBcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICBsZXQgZGVjbCA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBkZWNsO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJykge1xuICAgICAgICAgICAgbGV0IGV4cHIgPSBub2RlIGFzIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuICAgICAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgIGxldCBmdW5jID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwIGluIG5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAocCA9PT0gJ2xlZnQnIHx8IHAgPT09ICdyaWdodCcgfHwgcCA9PT0gJ2FyZ3VtZW50JyB8fCBwID09PSAnY2FsbGVlJyB8fCBwID09PSAnYm9keScgfHwgcCA9PT0gJ2V4cHJlc3Npb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQ6IEJhc2VOb2RlID0gbm9kZVtwXSBhcyBCYXNlTm9kZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEVzcHJpbWFIZWxwZXIucmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24oY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB2YXJpYWJsZSBuYW1lcyBvZiBkZWNsYXJhdGlvbiBvciBhc3NpZ25tZW50IGNvbnRhaW5lZCBpbiBub2RlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBub2RlIFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VmFyaWFibGVOYW1lcyhub2RlOiBWYXJpYWJsZURlY2xhcmF0aW9uIHwgQXNzaWdubWVudEV4cHJlc3Npb24gfCBGdW5jdGlvbkRlY2xhcmF0aW9uKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnVmFyaWFibGVEZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgIGxldCBkZWNsID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0aW9uO1xuICAgICAgICAgICAgcmV0dXJuIGRlY2wuZGVjbGFyYXRpb25zLm1hcChkID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEVzcHJpbWFIZWxwZXIucGF0dGVyblRvU3RyaW5nKGQuaWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YXJOYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnQXNzaWdubWVudEV4cHJlc3Npb24nKSB7XG4gICAgICAgICAgICBsZXQgZGVjbCA9IG5vZGUgYXMgQXNzaWdubWVudEV4cHJlc3Npb247XG4gICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEVzcHJpbWFIZWxwZXIucGF0dGVyblRvU3RyaW5nKGRlY2wubGVmdCk7XG4gICAgICAgICAgICByZXR1cm4gW3Zhck5hbWVdO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBmdW5jLnBhcmFtcy5tYXAocCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBFc3ByaW1hSGVscGVyLnBhdHRlcm5Ub1N0cmluZyhwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdmFyaWFibGUgdmFsdWVzIG9mIGRlY2xhcmF0aW9uIG9yIGFzc2lnbm1lbnQgY29udGFpbmVkIGluIG5vZGUuXG4gICAgICogU2FtZSBhcyBnZXRWYXJpYWJsZU5hbWVzIGJ1dCBldmFsdWF0ZSB2YXJpYWJsZXMgdG8gZGlzY292ZXIgdGhlaXIgdmFsdWVzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBub2RlIFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VmFyaWFibGVWYWx1ZXMoc3RhdGU6IFByb2dyZW1TdGF0ZSwgbm9kZTogQmFzZU5vZGUpOiBNYXA8c3RyaW5nLCBhbnk+IHtcbiAgICAgICAgbGV0IHZhbHVlc01hcCA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgIGxldCB2YXJOb2RlcyA9IHRoaXMucmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24obm9kZSk7XG4gICAgICAgIGlmICghdmFyTm9kZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXNNYXA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXRWYXJpYWJsZU5hbWVzKHZhck5vZGVzKS5tYXAodmFyTmFtZSA9PiB2YWx1ZXNNYXAuc2V0KHZhck5hbWUsIHN0YXRlLmV2YWwodmFyTmFtZSkpKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlc01hcDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzQ2hpbGROb2RlT2Yobm9kZTogTm9kZVdpdGhQYXJlbnQsIHBhcmVudDogQmFzZU5vZGUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKG5vZGUucGFyZW50ID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCFub2RlLnBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEVzcHJpbWFIZWxwZXIuaXNDaGlsZE5vZGVPZihub2RlLnBhcmVudCBhcyBOb2RlV2l0aFBhcmVudCwgcGFyZW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzTm90Q2hpbGROb2RlT2Yobm9kZTogTm9kZVdpdGhQYXJlbnQsIHBhcmVudHM6IEJhc2VOb2RlW10pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHBhcmVudHMuZmluZChwID0+IHAgPT09IG5vZGUucGFyZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKCFub2RlLnBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gRXNwcmltYUhlbHBlci5pc05vdENoaWxkTm9kZU9mKG5vZGUucGFyZW50IGFzIE5vZGVXaXRoUGFyZW50LCBwYXJlbnRzKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBDb2xvclByb3ZpZGVyLCBDb2xvclByb3ZpZGVyRmFjdG9yeSB9IGZyb20gXCIuL1R5cGVzXCI7XG5pbXBvcnQgeyBjcmVhdGUgYXMgbWQ1Q3JlYXRlIH0gZnJvbSAnanMtbWQ1JztcblxuZXhwb3J0IGNsYXNzIEJhc2ljQ29sb3JQcm92aWRlckZhY3RvcnkgaW1wbGVtZW50cyBDb2xvclByb3ZpZGVyRmFjdG9yeSB7XG4gICAgYnVpbGQoa2V5Pzogc3RyaW5nKTogQ29sb3JQcm92aWRlciB7XG4gICAgICAgIHJldHVybiBuZXcgQmFzaWNDb2xvclByb3ZpZGVyKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQmFzaWNDb2xvclByb3ZpZGVyIGltcGxlbWVudHMgQ29sb3JQcm92aWRlciB7XG5cbiAgICBwcml2YXRlIGNvbG9yTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuXG4gICAgcHVibGljIGhzbENvbG9yKGh1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdoc2woJyArIGh1ZSArICcsIDEwMCUsIDgwJSknO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYXNoU3RyaW5nVG9Db2xvcihrZXk6IHN0cmluZywgY29sb3JDb3VudDogbnVtYmVyLCBzaGlmdDogbnVtYmVyID0gMikge1xuICAgICAgICB2YXIgaHVlID0gdGhpcy5jb2xvck1hcC5nZXQoa2V5KTtcbiAgICAgICAgaWYgKGh1ZSkgcmV0dXJuIHRoaXMuaHNsQ29sb3IoaHVlKTtcblxuICAgICAgICB2YXIgaGFzaCA9IG1kNUNyZWF0ZSgpLnVwZGF0ZShrZXkpLnRvU3RyaW5nKCk7XG4gICAgICAgIFxuICAgICAgICBodWUgPSAoIHBhcnNlSW50KGhhc2guc3Vic3RyaW5nKHNoaWZ0ICsgMCwgc2hpZnQgKyAxKSwgMTYpICsgMTYgKiBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDEsIHNoaWZ0ICsgMiksIDE2KSArIDI1NiAqIHBhcnNlSW50KGhhc2guc3Vic3RyaW5nKHNoaWZ0ICsgMiwgc2hpZnQgKyAzKSwgMTYpICk7XG4gICAgICAgIGh1ZSA9IE1hdGguZmxvb3IoaHVlICUgY29sb3JDb3VudCkgKiAzNjAgLyBjb2xvckNvdW50O1xuICAgICAgICBodWUgPSBodWUgJSAzNjA7XG5cbiAgICAgICAgLy8gQ29sb3IgZGVkdXBsaWNhdGlvblxuICAgICAgICB3aGlsZSAoIXRoaXMuY29sb3JNYXAuZ2V0KGtleSkpIHtcbiAgICAgICAgICAgIGxldCBkdXBsaWNhdGVDb2xvciA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yIChsZXQgYyBvZiB0aGlzLmNvbG9yTWFwLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGMgLSBodWUpIDwgTWF0aC5mbG9vcigxODAgLyBjb2xvckNvdW50KSkge1xuICAgICAgICAgICAgICAgICAgICBkdXBsaWNhdGVDb2xvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGh1ZSArPSBNYXRoLmZsb29yKDI3MCAvIGNvbG9yQ291bnQpO1xuICAgICAgICAgICAgICAgICAgICBodWUgPSBodWUgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZHVwbGljYXRlQ29sb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yTWFwLnNldChrZXksIGh1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vdmFyIHBhc3RlbCA9ICdoc2woJyArIGh1ZSArICcsIDEwMCUsIDg3LjUlKSc7XG4gICAgICAgIHJldHVybiB0aGlzLmhzbENvbG9yKGh1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIENvbG9yU2VydmljZSB7XG5cbiAgICBleHBvcnQgY29uc3QgY29sb3JQcm92aWRlcmFjdG9yeTogQ29sb3JQcm92aWRlckZhY3RvcnkgPSBuZXcgQmFzaWNDb2xvclByb3ZpZGVyRmFjdG9yeSgpO1xuXG59XG4iLCJpbXBvcnQgeyBQcm9ncmVtQ29tcG9uZW50LCBQcm9ncmVtU2NoZWR1bGVyLCBTdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyLCBQcm9ncmVtU3RhdGUsIFByb2dyZW1Db25maWcsIEZyYW1lQ2hhbmdlTGlzdGVuZXIsIFBhaW50aW5nTGlzdGVuZXIsIEVuZEFuaW1hdGlvbkxpc3RlbmVyLCBTdWJzY3JpcHRpb24gfSBmcm9tIFwiLi4vLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgU2NyZWVuQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvcmUvU2NyZWVuU2VydmljZVwiO1xuaW1wb3J0IHsgSHRtbEhlbHBlciB9IGZyb20gXCIuLi8uLi9jb3JlL0h0bWxIZWxwZXJcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyIH0gZnJvbSBcInJ4anNcIjtcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1HcmlkQ29tcG9uZW50IGltcGxlbWVudHMgUHJvZ3JlbUNvbXBvbmVudCwgU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciwgRnJhbWVDaGFuZ2VMaXN0ZW5lciwgUGFpbnRpbmdMaXN0ZW5lciwgRW5kQW5pbWF0aW9uTGlzdGVuZXIge1xuICAgIFxuICAgIHByaXZhdGUgcmVuZGVyaW5nQ29udGFpbmVyOiBIVE1MRWxlbWVudCA9IEh0bWxIZWxwZXIuc3BhbigncHJvZ3JlbS1ncmlkJyk7XG4gICAgcHJpdmF0ZSBkaXNwbGF5ZWRDYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgZGlzcGxheWVkQ3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHJpdmF0ZSBoaWRkZW5DYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgaGlkZGVuQ3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgYmxpbmtJbnRlcnZhbCA9IDIwMDtcbiAgICBcbiAgICAvLyBGSVhNRTogbGUgY29sb3JzQ2FjaGUgbmUgZGV2cmFpdCBwYXMgZGUgdHJvdXZlciBkYW5zIGxlIFByb2dyZW1HcmlkQ29tcG9uZW50ICFcbiAgICBwcml2YXRlIGNvbG9yc0NhY2hlRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gICAgcHJpdmF0ZSBjb2xvcnNDYWNoZTogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcblxuICAgIHByaXZhdGUgZnJhbWVzQ2FjaGVFbmFiZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHByaXZhdGUgZnJhbWVzQ2FjaGU6IE1hcDxudW1iZXIsIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRD4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBjdXJyZW50Q2FjaGVkRnJhbWU6IEhUTUxDYW52YXNFbGVtZW50fG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGluZ0NvbG9yZXJQcm9ncmVtOiAoYzpudW1iZXIsIGw6bnVtYmVyLCBmOm51bWJlciwgY3R4OmFueSkgPT4gc3RyaW5nO1xuICAgIHByaXZhdGUgY2FjaGVkQ29sb3JlclByb2dyZW06IChjOm51bWJlciwgbDpudW1iZXIsIGY6bnVtYmVyLCBjdHg6YW55KSA9PiBzdHJpbmcgPSAoYzogbnVtYmVyLCBsOiBudW1iZXIsIGY6IG51bWJlciwgY3R4OmFueSkgPT4ge1xuICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmdldENhY2hlZENvbG9yKGMsIGwsIGYpO1xuICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ1JldHJpZXZpbmcgY29sb3IgZnJvbSBjYWNoZS4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbG9yID0gdGhpcy5jYWxjdWxhdGluZ0NvbG9yZXJQcm9ncmVtKGMsIGwsIGYsIGN0eCk7XG4gICAgICAgICAgICB0aGlzLmNhY2hlQ29sb3IoYywgbCwgZiwgY29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xvcjtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBzdGFydEl0ZXJhdGluZ0NvZGVTdWI6IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIGdyaWRDaGFuZ2VTdWI6IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIGZyYW1lQ2hhbmdlU3ViOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBwYWludGluZ1N1YjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgZW5kQW5pbWF0aW9uU3ViOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZywgXG4gICAgICAgIHByaXZhdGUgcHJvZ3JlbUNvbmZpZzogUHJvZ3JlbUNvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXIsXG4gICAgICAgIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50XG4gICAgICAgICkge1xuICAgICAgICBsZXQgZW5XYXJuaW5nID0gSHRtbEhlbHBlci5wKCd3YXJuaW5nJywgXCJZb3VyIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IGNhbnZhcy5cIik7XG4gICAgICAgIGxldCBmcldhcm5pbmcgPSBIdG1sSGVscGVyLnAoJ3dhcm5pbmcnLCBcIlZvdHJlIG5hdmlnYXRldXIgbmUgc3VwcG9ydGUgcGFzIGxlcyBjYW52YXMuXCIpO1xuICAgICAgICB0aGlzLmRpc3BsYXllZENhbnZhcyA9IEh0bWxIZWxwZXIuY2FudmFzKCcnLCBbZW5XYXJuaW5nLCBmcldhcm5pbmddKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRDYW52YXMud2lkdGggPSB0aGlzLnByb2dyZW1Db25maWcubm9tYnJlQ29sb25uZXMgKiB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplO1xuICAgICAgICB0aGlzLmRpc3BsYXllZENhbnZhcy5oZWlnaHQgPSB0aGlzLnByb2dyZW1Db25maWcubm9tYnJlTGlnbmVzICogdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuZGlzcGxheWVkQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgdGhpcy5oaWRkZW5DYW52YXMgPSB0aGlzLmJ1aWxkRnJhbWVDYW52YXMoKTtcbiAgICAgICAgbGV0IGhpZGRlbkN0eCA9IHRoaXMuaGlkZGVuQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIWN0eCB8fCAhaGlkZGVuQ3R4KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBvYnRhaW4gMkQgQ2FudmFzIGNvbnRleHQgIScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlzcGxheWVkQ3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmhpZGRlbkN0eCA9IGhpZGRlbkN0eDtcblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuY2FsY3VsYXRpbmdDb2xvcmVyUHJvZ3JlbSA9IGNvbG9yZXJQcm9ncmVtO1xuXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc3RhcnRJdGVyYXRpbmdDb2RlU3ViID0gc2NoZWR1bGVyLnN1YnNjcmliZVN0YXJ0SXRlcmF0aW5nQ29kZSh0aGlzKTtcbiAgICAgICAgdGhpcy5ncmlkQ2hhbmdlU3ViID0gc2NoZWR1bGVyLnN1YnNjcmliZUdyaWRDaGFuZ2UodGhpcyk7XG4gICAgICAgIHRoaXMuZnJhbWVDaGFuZ2VTdWIgPSBzY2hlZHVsZXIuc3Vic2NyaWJlRnJhbWVDaGFuZ2UodGhpcyk7XG4gICAgICAgIHRoaXMucGFpbnRpbmdTdWIgPSBzY2hlZHVsZXIuc3Vic2NyaWJlUGFpbnRpbmcodGhpcyk7XG4gICAgICAgIHRoaXMuIGVuZEFuaW1hdGlvblN1YiA9IHNjaGVkdWxlci5zdWJzY3JpYmVFbmRBbmltYXRpb24odGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkRnJhbWVDYW52YXMoKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHRoaXMucHJvZ3JlbUNvbmZpZy5ub21icmVDb2xvbm5lcyAqIHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLnByb2dyZW1Db25maWcubm9tYnJlTGlnbmVzICogdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcbiAgICAgICAgcmV0dXJuIGNhbnZhcztcbiAgICB9XG5cbiAgICByZW5kZXJIdG1sKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kaXNwbGF5ZWRDYW52YXMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmluZ0NvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY29sb3JDdXJyZW50UGl4ZWwoc3RhdGU6IFByb2dyZW1TdGF0ZSwgY29sb3I6IHN0cmluZywgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XG4gICAgICAgIGxldCBib3hTaXplID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcbiAgICAgICAgbGV0IGMgPSBzdGF0ZS5jb2xvbm5lO1xuICAgICAgICBsZXQgbCA9IHN0YXRlLmxpZ25lO1xuICAgICAgICBcbiAgICAgICAgLy8gUGFpbnQgcGl4ZWwgaWYgaXQgY2hhbmdlZFxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KGMgKiBib3hTaXplLCBsICogYm94U2l6ZSwgYm94U2l6ZSwgYm94U2l6ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJsaW5rQ3VycmVudFBpeGVsKHN0YXRlOiBQcm9ncmVtU3RhdGUsIGluY3JlbW50OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGNvbG9yID0gJ2JsYWNrJztcbiAgICAgICAgaWYgKGluY3JlbW50ICUgMiA9PT0gMCkge1xuICAgICAgICAgICAgY29sb3IgPSAnYW50aXF1ZXdoaXRlJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbG9yQ3VycmVudFBpeGVsKHN0YXRlLCBjb2xvciwgdGhpcy5kaXNwbGF5ZWRDdHgpO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgZmlyZVN0YXJ0SXRlcmF0aW5nQ29kZSAoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdmaXJlU3RhcnRJdGVyYXRpbmdDb2RlJyk7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IE9ic2VydmFibGUuaW50ZXJ2YWwodGhpcy5ibGlua0ludGVydmFsLCBhbmltYXRpb25GcmFtZVNjaGVkdWxlcikuc3Vic2NyaWJlKHQgPT4ge1xuICAgICAgICAgICAgdGhpcy5ibGlua0N1cnJlbnRQaXhlbChzdGF0ZSwgdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZpcmVHcmlkQ2hhbmdlIChvbGRTdGF0ZTogUHJvZ3JlbVN0YXRlLCBuZXdTdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2ZpcmVHcmlkQ2hhbmdlJyk7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZyYW1lc0NhY2hlRW5hYmVkKSB7XG4gICAgICAgICAgICBsZXQgY2FjaGVkQ3VycmVudEZyYW1lID0gdGhpcy5nZXRDYWNoZWRGcmFtZShvbGRTdGF0ZS5mcmFtZSk7XG4gICAgICAgICAgICBpZiAoY2FjaGVkQ3VycmVudEZyYW1lKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgY3VycmVudCBmcmFtZSBpcyBpbiBjYWNoZSwgd2Ugc3RvcCB3b3JrIGhlcmUuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGMgPSBvbGRTdGF0ZS5jb2xvbm5lO1xuICAgICAgICBsZXQgbCA9IG9sZFN0YXRlLmxpZ25lO1xuICAgICAgICBsZXQgZiA9IG9sZFN0YXRlLmZyYW1lO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuY29sb3JzQ2FjaGVFbmFibGVkKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBjb2xvcmVyUHJvZ3JlbSA9IHRoaXMuY2FjaGVkQ29sb3JlclByb2dyZW1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgbGV0IGNvdWxldXIgPSBjb2xvcmVyUHJvZ3JlbShjLCBsLCBmLCBvbGRTdGF0ZS5jb250ZXh0ZSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coYCgke2N9LCAke2x9LCAke2Z9LCAke3N0YXRlLmNvbnRleHRlfSA9PiAke2NvdWxldXJ9YCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbG9yQ3VycmVudFBpeGVsKG9sZFN0YXRlLCBjb3VsZXVyLCB0aGlzLmhpZGRlbkN0eCk7XG4gICAgfVxuXG4gICAgZmlyZUZyYW1lQ2hhbmdlIChvbGRTdGF0ZTogUHJvZ3JlbVN0YXRlLCBuZXdTdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2ZpcmVGcmFtZUNoYW5nZScpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuZnJhbWVzQ2FjaGVFbmFiZWQpIHtcbiAgICAgICAgICAgIGxldCBjYWNoZWRPbGRGcmFtZSA9IHRoaXMuZ2V0Q2FjaGVkRnJhbWUob2xkU3RhdGUuZnJhbWUpO1xuICAgICAgICAgICAgaWYgKCFjYWNoZWRPbGRGcmFtZSkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0NhY2hpbmcgZnJhbWUgIycsIG9sZFN0YXRlLmZyYW1lKTtcbiAgICAgICAgICAgICAgICBsZXQgZnJhbWVDYW52YXMgPSB0aGlzLmJ1aWxkRnJhbWVDYW52YXMoKTtcbiAgICAgICAgICAgICAgICBmcmFtZUNhbnZhcy5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBmcmFtZUNhbnZhc0N0eCA9IGZyYW1lQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICAgICAgaWYgKGZyYW1lQ2FudmFzQ3R4KSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lQ2FudmFzQ3R4LmRyYXdJbWFnZSh0aGlzLmhpZGRlbkNhbnZhcywgMCwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVGcmFtZShvbGRTdGF0ZS5mcmFtZSwgZnJhbWVDYW52YXNDdHgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmluZ0NvbnRhaW5lci5hcHBlbmRDaGlsZChmcmFtZUNhbnZhcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWNoZWRPbGRGcmFtZS5jYW52YXMuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGNhY2hlZE5ld0ZyYW1lID0gdGhpcy5nZXRDYWNoZWRGcmFtZShuZXdTdGF0ZS5mcmFtZSk7XG4gICAgICAgICAgICBpZiAoY2FjaGVkTmV3RnJhbWUpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdSZXRyaWV2aW5nIGZyb20gY2FjaGUgZnJhbWUgIycsIG5ld1N0YXRlLmZyYW1lKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZWRGcmFtZSA9IGNhY2hlZE5ld0ZyYW1lLmNhbnZhcztcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZWRGcmFtZS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgfVxuXG4gICAgZmlyZVBhaW50aW5nKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50Q2FjaGVkRnJhbWUpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobmV3IERhdGUoKSwnUGFpbnRpbmcgcHJlIHJlbmRlcmVkIGNhbnZhcy4nKTtcbiAgICAgICAgICAgIC8vdGhpcy5yZW5kZXJpbmdDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy90aGlzLmRpc3BsYXllZEN0eC5kcmF3SW1hZ2UodGhpcy5jdXJyZW50Q2FjaGVkRnJhbWUsIDAsIDApO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGVkRnJhbWUuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobmV3IERhdGUoKSwnUGFpbnRpbmcgaGlkZGVuIGNhbnZhcy4nKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQ3R4LmRyYXdJbWFnZSh0aGlzLmhpZGRlbkNhbnZhcywgMCwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaXJlRW5kQW5pbWF0aW9uKCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnZmlyZUVuZEFuaW1hdGlvbicpO1xuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRDYWNoZWRGcmFtZSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRDYW52YXMuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhcnRJdGVyYXRpbmdDb2RlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuZ3JpZENoYW5nZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmVuZEFuaW1hdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZSAqIHRoaXMucHJvZ3JlbUNvbmZpZy5ub21icmVDb2xvbm5lcztcbiAgICAgICAgbGV0IGhlaWdodCA9IHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemUgKiB0aGlzLnByb2dyZW1Db25maWcubm9tYnJlTGlnbmVzO1xuICAgICAgICB0aGlzLmRpc3BsYXllZEN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkQ3R4LmZpbGxTdHlsZSA9ICdhbnRpcXVld2hpdGUnO1xuICAgICAgICB0aGlzLmRpc3BsYXllZEN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRDb2xvcnNDYWNoZUtleShjb2xvbm5lOiBudW1iZXIsIGxpZ25lOiBudW1iZXIsIGZyYW1lOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gY29sb25uZSArICdfJyArIGxpZ25lICsgJ18nICsgZnJhbWU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldENhY2hlZENvbG9yKGNvbG9ubmU6IG51bWJlciwgbGlnbmU6IG51bWJlciwgZnJhbWU6IG51bWJlcik6IHN0cmluZ3x1bmRlZmluZWQge1xuICAgICAgICBsZXQga2V5ID0gdGhpcy5idWlsZENvbG9yc0NhY2hlS2V5KGNvbG9ubmUsIGxpZ25lLCBmcmFtZSk7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuY29sb3JzQ2FjaGUuZ2V0KGtleSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2FjaGVDb2xvcihjb2xvbm5lOiBudW1iZXIsIGxpZ25lOiBudW1iZXIsIGZyYW1lOiBudW1iZXIsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgbGV0IGtleSA9IHRoaXMuYnVpbGRDb2xvcnNDYWNoZUtleShjb2xvbm5lLCBsaWduZSwgZnJhbWUpO1xuICAgICAgICB0aGlzLmNvbG9yc0NhY2hlLnNldChrZXksIHZhbHVlKTtcbiAgICB9XG5cblxuICAgIHByb3RlY3RlZCBnZXRDYWNoZWRGcmFtZShmcmFtZTogbnVtYmVyKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfHVuZGVmaW5lZCB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZnJhbWVzQ2FjaGUuZ2V0KGZyYW1lKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjYWNoZUZyYW1lKGZyYW1lOiBudW1iZXIsIHZhbHVlOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mcmFtZXNDYWNoZS5zZXQoZnJhbWUsIHZhbHVlKTtcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==