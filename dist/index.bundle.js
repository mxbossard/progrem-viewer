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
ProgremService_1.ProgremService.buildProgrem('./progrems/mandelbrot_set_progrem.js', screenConfig);
//ProgremService.buildProgrem('./progrems/diagonale_glissante_progrem.js', screenConfig);


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
    fireCodeExecution(state) {
        if (!state.verse) {
            return;
        }
        let htmlVerse = this.htmlFactory.getHtmlVerse(state.verse);
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
        this.tempo = Types_1.ProgremTempo.ByLine;
        this.state = this.reset();
    }
    subscribeStartIteratingCode(listener) {
        this.startIteratingCodeListeners.push(listener);
    }
    subscribeCodeExecution(listener) {
        this.codeExecutionListeners.push(listener);
    }
    subscribeGridChange(listener) {
        this.gridChangeListeners.push(listener);
    }
    subscribeLineChange(listener) {
        this.lineChangeListeners.push(listener);
    }
    subscribeFrameChange(listener) {
        this.frameChangeListeners.push(listener);
    }
    subscribePainting(listener) {
        this.paintingListeners.push(listener);
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
                this.state = newState;
                this.codeExecutionListeners.map(l => l.fireCodeExecution(newState));
                this.paintingListeners.map(l => l.firePainting());
                return [newState];
            }
            //console.log('Finished iterating over code.')
        }
        let notifyPixelChange = false;
        let notifyLineChange = false;
        let notifyFrameChange = false;
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
            }
            let newState = new Types_1.ProgremState(_colonne, _ligne, _frame, this.state.contexte, null);
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
    fireCodeExecution(state) {
        if (!state.verse) {
            return;
        }
        let htmlVerse = this.htmlFactory.getHtmlVerse(state.verse);
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
var ProgremTempo;
(function (ProgremTempo) {
    ProgremTempo[ProgremTempo["ByVerse"] = 0] = "ByVerse";
    ProgremTempo[ProgremTempo["ByPixel"] = 1] = "ByPixel";
    ProgremTempo[ProgremTempo["ByLine"] = 2] = "ByLine";
    ProgremTempo[ProgremTempo["ByFrame"] = 3] = "ByFrame";
})(ProgremTempo = exports.ProgremTempo || (exports.ProgremTempo = {}));
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
        this.subscription = null;
        this.blinkInterval = 200;
        this.cachingColors = true;
        this.previousFrame = [];
        this.currentFrame = [];
        let enWarning = HtmlHelper_1.HtmlHelper.p('warning', "Your browser doesn't support canvas.");
        let frWarning = HtmlHelper_1.HtmlHelper.p('warning', "Votre navigateur ne supporte pas les canvas.");
        this.displayedCanvas = HtmlHelper_1.HtmlHelper.canvas('', [enWarning, frWarning]);
        this.displayedCanvas.width = this.progremConfig.nombreColonnes * this.screenConfig.boxSize;
        this.displayedCanvas.height = this.progremConfig.nombreLignes * this.screenConfig.boxSize;
        let ctx = this.displayedCanvas.getContext('2d');
        this.hiddenCanvas = document.createElement('canvas');
        this.hiddenCanvas.width = this.progremConfig.nombreColonnes * this.screenConfig.boxSize;
        this.hiddenCanvas.height = this.progremConfig.nombreLignes * this.screenConfig.boxSize;
        let hiddenCtx = this.hiddenCanvas.getContext('2d');
        if (!ctx || !hiddenCtx) {
            throw new Error('Unable to obtain 2D Canvas context !');
        }
        this.displayedCtx = ctx;
        this.hiddenCtx = hiddenCtx;
        this.clear();
        scheduler.subscribeStartIteratingCode(this);
        scheduler.subscribeGridChange(this);
        scheduler.subscribeFrameChange(this);
        scheduler.subscribePainting(this);
    }
    renderHtml() {
        let container = HtmlHelper_1.HtmlHelper.span('progrem-grid', this.displayedCanvas);
        return container;
    }
    colorCurrentPixel(state, color) {
        let boxSize = this.screenConfig.boxSize;
        let c = state.colonne;
        let l = state.ligne;
        // Paint pixel if it changed
        this.hiddenCtx.fillStyle = color;
        this.hiddenCtx.fillRect(c * boxSize, l * boxSize, boxSize, boxSize);
    }
    blinkCurrentPixel(state, incremnt) {
        let color = 'black';
        if (incremnt % 2 === 0) {
            color = 'antiquewhite';
        }
        this.colorCurrentPixel(state, color);
    }
    fireStartIteratingCode(state) {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = Rx_1.Observable.interval(this.blinkInterval, rxjs_1.animationFrameScheduler).subscribe(t => {
            this.blinkCurrentPixel(state, t);
        });
    }
    fireGridChange(state) {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        let boxSize = this.screenConfig.boxSize;
        let c = state.colonne;
        let l = state.ligne;
        let f = state.frame;
        // @ts-ignore
        let couleur = colorerProgrem(c, l, f, state.contexte);
        //console.log(`(${c}, ${l}, ${f}, ${state.contexte} => ${couleur}`);
        if (this.cachingColors) {
            let flatFrameCoordinate = l * this.progremConfig.nombreColonnes + c;
            this.currentFrame[flatFrameCoordinate] = couleur;
            if (couleur && this.previousFrame[flatFrameCoordinate] !== couleur) {
                this.colorCurrentPixel(state, couleur);
            }
        }
        else if (couleur) {
            this.colorCurrentPixel(state, couleur);
        }
    }
    fireFrameChange(state) {
        //this.clear();
        if (this.cachingColors) {
            this.previousFrame = this.currentFrame;
            this.currentFrame = [];
        }
    }
    firePainting() {
        this.displayedCtx.drawImage(this.hiddenCanvas, 0, 0);
    }
    clear() {
        let width = this.screenConfig.boxSize * this.progremConfig.nombreColonnes;
        let height = this.screenConfig.boxSize * this.progremConfig.nombreLignes;
        this.hiddenCtx.clearRect(0, 0, width, height);
        this.hiddenCtx.fillStyle = 'antiquewhite';
        this.hiddenCtx.fillRect(0, 0, width, height);
    }
}
exports.ProgremGridComponent = ProgremGridComponent;


/***/ })

},[["/7QA","runtime","npm.rxjs-compat","npm.rxjs","npm.escodegen","npm.esutils","npm.estraverse","npm.webpack","npm.esprima-walk","npm.esprima","npm.js-md5","npm.process","npm.tslib"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9yU3R5bGVEZWNvcmF0b3JzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92YXJpYWJsZVNjb3BlL1ZhcmlhYmxlU2NvcGVDb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUVkaXRvci9Qcm9ncmVtRWRpdG9yQ29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL0h0bWxIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VzcHJpbWEvQmFzaWNFc3ByaW1hUHJvZ3JlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9FdmFsU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9TY2hlZHVsaW5nU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Qcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZhcmlhYmxlU2NvcGUvRXNwcmltYVZhcmlhYmxlU2NvcGVTdHlsZURlY29yYXRvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvUHJvZ3JlbVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdmFyaWFibGVTY29wZS9Fc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL1R5cGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL0NvZGVTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL1NjcmVlblNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VzcHJpbWEvRXNwcmltYUhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9Db2xvclNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUdyaWQvUHJvZ3JlbUdyaWRDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUdBLG1HQUF3RTtBQUN4RSxrRkFBdUQ7QUFJdkQsTUFBYSwyQkFBMkI7SUFBeEM7UUFFWSxnQkFBVyxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzdDLGtCQUFhLEdBQWtCLDJCQUFZLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLENBQUM7SUFzRHBGLENBQUM7SUFwREcsUUFBUSxDQUFDLElBQWMsRUFBRSxPQUFvQjtRQUN6QyxJQUFJLEtBQUssQ0FBQztRQUVWLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7WUFDNUIsaUhBQWlIO1lBQ2pILHFDQUFxQztZQUNyQyxzQkFBc0I7WUFDdEIsSUFBSTtZQUNKLElBQUksQ0FBQyxHQUFHLElBQWtCLENBQUM7WUFDM0IsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDbEI7UUFDRDs7Ozs7VUFLRTtRQUNGLElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDWCxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDekM7WUFFRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsQyxPQUFPLENB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QUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7UUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUVKO0FBOUhELG9EQThIQyIsImZpbGUiOiJpbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdHlsZURlY29yYXRvciwgQ29sb3JQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNlTm9kZSwgSWRlbnRpZmllciwgTWVtYmVyRXhwcmVzc2lvbiB9IGZyb20gXCJlc3RyZWVcIjtcblxuaW1wb3J0IHsgUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudCB9IGZyb20gXCIuL1Byb2dyZW1JbnNwZWN0b3JDb21wb25lbnRcIjtcbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb3JlL0NvbG9yU2VydmljZVwiO1xuaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgSHRtbEhlbHBlciB9IGZyb20gXCIuLi8uLi9jb3JlL0h0bWxIZWxwZXJcIjtcblxuZXhwb3J0IGNsYXNzIENvbG9yVmVyc2VWYXJpYWJsZURlY29yYXRvciBpbXBsZW1lbnRzIFN0eWxlRGVjb3JhdG9yPEJhc2VOb2RlPiB7XG5cbiAgICBwcml2YXRlIHZhcmlhYmxlTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgY29sb3JQcm92aWRlcjogQ29sb3JQcm92aWRlciA9IENvbG9yU2VydmljZS5jb2xvclByb3ZpZGVyYWN0b3J5LmJ1aWxkKCk7XG5cbiAgICBkZWNvcmF0ZShub2RlOiBCYXNlTm9kZSwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCB2YXJJZDtcblxuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnSWRlbnRpZmllcicpIHtcbiAgICAgICAgICAgIC8vIGxldCBpc1BhcmVudE5vdEFscmVhZHlWYXJpYWJsZSA9IEh0bWxIZWxwZXIudGVzdEhpZXJhY2h5KGVsZW1lbnQsIGVsdCA9PiAhZWx0LmNsYXNzTGlzdC5jb250YWlucygndmFyaWFibGUnKSk7XG4gICAgICAgICAgICAvLyBpZiAoIWlzUGFyZW50Tm90QWxyZWFkeVZhcmlhYmxlKSB7XG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBsZXQgbiA9IG5vZGUgYXMgSWRlbnRpZmllcjtcbiAgICAgICAgICAgIHZhcklkID0gbi5uYW1lO1xuICAgICAgICB9XG4gICAgICAgIC8qXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdNZW1iZXJFeHByZXNzaW9uJykge1xuICAgICAgICAgICAgbGV0IG4gPSBub2RlIGFzIE1lbWJlckV4cHJlc3Npb247XG4gICAgICAgICAgICB2YXJJZCA9IGVzY29kZUdlbmVyYXRlKG4pO1xuICAgICAgICB9XG4gICAgICAgICovXG4gICAgICAgIGlmICh2YXJJZCkge1xuICAgICAgICAgICAgbGV0IHZhckluZGV4ID0gdGhpcy52YXJpYWJsZU1hcC5nZXQodmFySWQpO1xuICAgICAgICAgICAgaWYgKCF2YXJJbmRleCkge1xuICAgICAgICAgICAgICAgIHZhckluZGV4ID0gdGhpcy52YXJpYWJsZU1hcC5zaXplICsgMTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhcmlhYmxlTWFwLnNldCh2YXJJZCwgdmFySW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3ZhcmlhYmxlJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3ZhcmlhYmxlLScgKyB2YXJJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9ICAgIFxuICAgIFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc3R5bGUgPSAnJztcbiAgICAgICAgLy9jb25zb2xlLmxvZygndmFyaWFibGUgY291bnQ6JywgdGhpcy52YXJpYWJsZU1hcC5zaXplKTtcbiAgICAgICAgdGhpcy52YXJpYWJsZU1hcC5mb3JFYWNoKChpbmRleCwgaWQpID0+IHtcbiAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMuY29sb3JQcm92aWRlci5oYXNoU3RyaW5nVG9Db2xvcihpZCwgMTYpOyAvL3RoaXMudmFyaWFibGVNYXAuc2l6ZVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYnVpbGRpbmcgY29sb3IgIycsIGlkLCAnPT4nLCBjb2xvcik7XG4gICAgICAgICAgICBzdHlsZSArPSBgXG4gICAgICAgICAgICAgICAgLnZhcmlhYmxlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMC4xZW0gMC41ZW0gMC4xZW0gMC41ZW07XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwLjhlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLiR7UHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRJTkdfQ0xBU1N9IC52YXJpYWJsZS0ke2luZGV4fS5pZGVudGlmaWVyLCBcbiAgICAgICAgICAgICAgICAuJHtQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVEVEX0NMQVNTfSAudmFyaWFibGUtJHtpbmRleH0uaWRlbnRpZmllciB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBgO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBhZFZlcnNlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8QmFzZU5vZGU+IHtcblxuICAgIGRlY29yYXRlKG5vZGU6IEJhc2VOb2RlLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb2RlLXBhZGRpbmcnKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSAgICBcbiAgICBcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgLmNvZGUtcGFkZGluZyB7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMzJweDtcbiAgICAgICAgfVxuICAgICAgICBgO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgUHJvZ3JlbVNlcnZpY2V9IGZyb20gXCIuL2NvcmUvUHJvZ3JlbVNlcnZpY2VcIjtcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gXCIuL2NvcmUvU2NyZWVuU2VydmljZVwiO1xuXG5sZXQgc2NyZWVuQ29uZmlnID0gbmV3IFNjcmVlbkNvbmZpZygyMCk7XG5cblByb2dyZW1TZXJ2aWNlLmJ1aWxkUHJvZ3JlbSgnLi9wcm9ncmVtcy9tYW5kZWxicm90X3NldF9wcm9ncmVtLmpzJywgc2NyZWVuQ29uZmlnKTtcbi8vUHJvZ3JlbVNlcnZpY2UuYnVpbGRQcm9ncmVtKCcuL3Byb2dyZW1zL2RpYWdvbmFsZV9nbGlzc2FudGVfcHJvZ3JlbS5qcycsIHNjcmVlbkNvbmZpZyk7IiwiaW1wb3J0IHsgUHJvZ3JlbUNvbXBvbmVudCwgR3JpZENoYW5nZUxpc3RlbmVyLCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIFByb2dyZW1TdGF0ZSwgQ29sb3JQcm92aWRlciwgUHJvZ3JlbVNjaGVkdWxlciwgSHRtbENvdXBsZXRGYWN0b3J5IH0gZnJvbSBcIi4uLy4uL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IEVzcHJpbWFIZWxwZXIgfSBmcm9tIFwiLi4vLi4vZXNwcmltYS9Fc3ByaW1hSGVscGVyXCI7XG5pbXBvcnQgeyBWYXJpYWJsZURlY2xhcmF0aW9uLCBBc3NpZ25tZW50RXhwcmVzc2lvbiwgRnVuY3Rpb25EZWNsYXJhdGlvbiB9IGZyb20gXCJlc3RyZWVcIjtcbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb3JlL0NvbG9yU2VydmljZVwiO1xuaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgRXNwcmltYVZhcmlhYmxlU2NvcGVIdG1sRmFjdG9yeSB9IGZyb20gXCIuL0VzcHJpbWFWYXJpYWJsZVNjb3BlSHRtbEZhY3RvcnlcIjtcblxuZXhwb3J0IGNsYXNzIFZhcmlhYmxlU2NvcGVDb21wb25lbnQgaW1wbGVtZW50cyBQcm9ncmVtQ29tcG9uZW50LCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciB7XG5cbiAgICBwcml2YXRlIGh0bWxDb250YWluZXI6IEhUTUxFbGVtZW50fG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgY29sb3JQcm92aWRlcjogQ29sb3JQcm92aWRlciA9IENvbG9yU2VydmljZS5jb2xvclByb3ZpZGVyYWN0b3J5LmJ1aWxkKCk7XG4gICAgXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyLFxuICAgICAgICBwcml2YXRlIGh0bWxGYWN0b3J5OiBFc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5XG4gICAgKSB7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVDb2RlRXhlY3V0aW9uKHRoaXMpO1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlR3JpZENoYW5nZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZW5kZXJIdG1sKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGh0bWxDb21wb25lbnQgPSB0aGlzLmh0bWxGYWN0b3J5LmJ1aWxkQ291cGxldCgpO1xuICAgICAgICB0aGlzLmh0bWxDb250YWluZXIgPSBodG1sQ29tcG9uZW50O1xuICAgICAgICByZXR1cm4gaHRtbENvbXBvbmVudDtcbiAgICB9XG5cbiAgICBmaXJlQ29kZUV4ZWN1dGlvbihzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIGlmICghc3RhdGUudmVyc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodG1sVmVyc2UgPSB0aGlzLmh0bWxGYWN0b3J5LmdldEh0bWxWZXJzZShzdGF0ZS52ZXJzZSk7XG4gICAgICAgIC8vIGlmICh0aGlzLmh0bWxDb250YWluZXIgJiYgaHRtbFZlcnNlKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmh0bWxDb250YWluZXIuYXBwZW5kQ2hpbGQoaHRtbFZlcnNlKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIGZpcmVHcmlkQ2hhbmdlKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5odG1sRmFjdG9yeS5jbGVhclZpZXcoKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBFc3ByaW1hUHJvZ3JlbSB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFUeXBlc1wiO1xuaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVtRWRpdG9yQ29tcG9uZW50IHtcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQ09NUE9ORU5UX0NMQVNTID0gJ3Byb2dyZW0tZWRpdG9yLWNvbXBvbmVudCc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBJTklUX0ZVTkNfQ0xBU1MgPSAnaW5pdC1wcm9ncmVtLWVkaXRvcic7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBDT0xPUkVSX0ZVTkNfQ0xBU1MgPSAnY29sb3Jlci1wcm9ncmVtLWVkaXRvcic7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBDT0RFX0xJQlJFX0NMQVNTID0gJ2NvZGUtbGlicmUtZWRpdG9yJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJFRlJFU0hfQUNUSU9OX0NMQVNTID0gJ3JlZnJlc2gtYWN0aW9uJztcblxuICAgIHByaXZhdGUgaW5pdFByb2dyZW1UZXh0YXJlYSE6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBjb2xvcmVyUHJvZ3JlbVRleHRhcmVhITogSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICBwcml2YXRlIGNvZGVMaWJyZVRleHRhcmVhITogSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICBwcml2YXRlIHJlZnJlc2hPYnNlcnZhYmxlJCE6IE9ic2VydmFibGU8RXZlbnQ+O1xuXG4gICAgcHJpdmF0ZSBhdHRhY2hlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcHVibGljIGF0dGFjaChkb2N1bWVudDpEb2N1bWVudCkge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuQ09NUE9ORU5UX0NMQVNTfSAuJHtQcm9ncmVtRWRpdG9yQ29tcG9uZW50LklOSVRfRlVOQ19DTEFTU30gdGV4dGFyZWFgKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2VsZW1lbnRzJywgZWxlbWVudCk7XG4gICAgICAgIGlmIChlbGVtZW50KSB0aGlzLmluaXRQcm9ncmVtVGV4dGFyZWEgPSBlbGVtZW50IGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG5cbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuQ09NUE9ORU5UX0NMQVNTfSAuJHtQcm9ncmVtRWRpdG9yQ29tcG9uZW50LkNPTE9SRVJfRlVOQ19DTEFTU30gdGV4dGFyZWFgKTtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHRoaXMuY29sb3JlclByb2dyZW1UZXh0YXJlYSA9IGVsZW1lbnQgYXMgSFRNTFRleHRBcmVhRWxlbWVudDtcblxuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7UHJvZ3JlbUVkaXRvckNvbXBvbmVudC5DT01QT05FTlRfQ0xBU1N9IC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuQ09ERV9MSUJSRV9DTEFTU30gdGV4dGFyZWFgKTtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHRoaXMuY29kZUxpYnJlVGV4dGFyZWEgPSBlbGVtZW50IGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG5cbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuQ09NUE9ORU5UX0NMQVNTfSAuJHtQcm9ncmVtRWRpdG9yQ29tcG9uZW50LlJFRlJFU0hfQUNUSU9OX0NMQVNTfWApO1xuICAgICAgICB0aGlzLnJlZnJlc2hPYnNlcnZhYmxlJCA9IE9ic2VydmFibGUuZnJvbUV2ZW50KGVsZW1lbnQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQsICdjbGljaycpO1xuXG4gICAgICAgIHRoaXMuYXR0YWNoZWQgPSB0aGlzLmluaXRQcm9ncmVtVGV4dGFyZWEgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbG9yZXJQcm9ncmVtVGV4dGFyZWEgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvZGVMaWJyZVRleHRhcmVhICE9PSB1bmRlZmluZWQgJiYgdGhpcy5yZWZyZXNoT2JzZXJ2YWJsZSQgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNoZWNrSXNBdHRhY2hlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmF0dGFjaGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2dyZW1FZGl0b3JDb21wb25lbnQgaXMgbm90IGF0dGFjaGVkICEnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkUHJvZ3JlbShwcm9ncmVtOiBFc3ByaW1hUHJvZ3JlbSkge1xuICAgICAgICB0aGlzLmNoZWNrSXNBdHRhY2hlZCgpO1xuXG4gICAgICAgIGxldCBmdW5jQm9keUJsb2NrID0gcHJvZ3JlbS5pbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpLmZ1bmN0aW9uUm9vdE5vZGUuYm9keTtcbiAgICAgICAgbGV0IGZ1bmNCb2R5Q29kZSA9IGVzY29kZUdlbmVyYXRlKGZ1bmNCb2R5QmxvY2spO1xuICAgICAgICBsZXQgY2xlYW5lZENvZGUgPSBmdW5jQm9keUNvZGUuc3Vic3RyaW5nKDEsIGZ1bmNCb2R5Q29kZS5sZW5ndGggLSAyKTtcbiAgICAgICAgdGhpcy5pbml0UHJvZ3JlbVRleHRhcmVhLmlubmVySFRNTCA9IGNsZWFuZWRDb2RlO1xuXG4gICAgICAgIGZ1bmNCb2R5QmxvY2sgPSBwcm9ncmVtLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKS5mdW5jdGlvblJvb3ROb2RlLmJvZHk7XG4gICAgICAgIGZ1bmNCb2R5Q29kZSA9IGVzY29kZUdlbmVyYXRlKGZ1bmNCb2R5QmxvY2spO1xuICAgICAgICBjbGVhbmVkQ29kZSA9IGZ1bmNCb2R5Q29kZS5zdWJzdHJpbmcoMSwgZnVuY0JvZHlDb2RlLmxlbmd0aCAtIDIpO1xuICAgICAgICB0aGlzLmNvbG9yZXJQcm9ncmVtVGV4dGFyZWEuaW5uZXJIVE1MID0gY2xlYW5lZENvZGU7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBidWlsZFByb2dyZW0oKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGNvbG9yZXJQcm9ncmVtRnVuYyA9IGBcbiAgICAgICAgZnVuY3Rpb24gY29sb3JlclByb2dyZW0oY29sb25uZSwgbGlnbmUsIGZyYW1lLCBjb250ZXh0ZSkge1xuICAgICAgICAgICAgJHt0aGlzLmNvbG9yZXJQcm9ncmVtVGV4dGFyZWEudmFsdWV9XG4gICAgICAgIH1cbiAgICAgICAgYDtcblxuICAgICAgICBsZXQgaW5pdFByb2dyZW1GdW5jID0gYFxuICAgICAgICBmdW5jdGlvbiBpbml0aWFsaXNlclByb2dyZW0oY29uZmlnLCBpbml0Q29udGV4dGUpIHtcbiAgICAgICAgICAgICR7dGhpcy5pbml0UHJvZ3JlbVRleHRhcmVhLnZhbHVlfVxuICAgICAgICB9XG4gICAgICAgIGA7XG5cbiAgICAgICAgbGV0IGNvZGVMaWJyZUZ1bmMgPSB0aGlzLmNvZGVMaWJyZVRleHRhcmVhLnZhbHVlO1xuXG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICR7Y29kZUxpYnJlRnVuY31cblxuICAgICAgICAke2luaXRQcm9ncmVtRnVuY31cblxuICAgICAgICAke2NvbG9yZXJQcm9ncmVtRnVuY31cbiAgICAgICAgYDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYmluZFJlZnJlc2goYWN0aW9uOiAoY29kZTogc3RyaW5nKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaE9ic2VydmFibGUkLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICBhY3Rpb24odGhpcy5idWlsZFByb2dyZW0oKSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG59IiwiXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSHRtbEhlbHBlciB7XG5cbiAgICBzdGF0aWMgYWRkQ2xhc3NlcyhlbHQ6IEhUTUxFbGVtZW50LCBjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGFzc2VzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY2xhc3Nlcy5zcGxpdCgnICcpLmZvckVhY2goYyA9PiBlbHQuY2xhc3NMaXN0LmFkZChjKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2xhc3NlcykpIHtcbiAgICAgICAgICAgIGNsYXNzZXMuZm9yRWFjaChjID0+IGVsdC5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRlc3QgYW4gZWxlbWVudCBhbmQgaXQncyBoaWVyYXJjaHkuIFJldHVybiBmYWxzZSB3aGVuIHRoZSB0ZXN0IGZhaWwgZm9yIGFuIGVsZW1lbnQuXG4gICAgICogXG4gICAgICogQHBhcmFtIGVsZW1lbnQgXG4gICAgICogQHBhcmFtIHRlc3QgXG4gICAgICovXG4gICAgc3RhdGljIHRlc3RIaWVyYWNoeShlbGVtZW50OiBIVE1MRWxlbWVudCwgdGVzdDogKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIHdoaWxlIChlbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0ZXN0SGllcmFjaHk6JywgZWxlbWVudCk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0ZXN0KGVsZW1lbnQpO1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3BhbihjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxTcGFuRWxlbWVudCB7XG4gICAgICAgIHJldHVybiBIdG1sSGVscGVyLnRhZygnc3BhbicsIGNsYXNzZXMsIGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBwKGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSwgY29udGVudD86IHN0cmluZ3xIVE1MRWxlbWVudHwoSFRNTEVsZW1lbnR8c3RyaW5nKVtdKTogSFRNTFBhcmFncmFwaEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gSHRtbEhlbHBlci50YWcoJ3AnLCBjbGFzc2VzLCBjb250ZW50KSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGl2KGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSwgY29udGVudD86IHN0cmluZ3xIVE1MRWxlbWVudHwoSFRNTEVsZW1lbnR8c3RyaW5nKVtdKTogSFRNTERpdkVsZW1lbnQge1xuICAgICAgICByZXR1cm4gSHRtbEhlbHBlci50YWcoJ2RpdicsIGNsYXNzZXMsIGNvbnRlbnQpIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgIH1cblxuICAgIHN0YXRpYyBjYW52YXMoY2xhc3Nlczogc3RyaW5nfHN0cmluZ1tdLCBjb250ZW50Pzogc3RyaW5nfEhUTUxFbGVtZW50fChIVE1MRWxlbWVudHxzdHJpbmcpW10pOiBIVE1MQ2FudmFzRWxlbWVudCB7XG4gICAgICAgIHJldHVybiBIdG1sSGVscGVyLnRhZygnY2FudmFzJywgY2xhc3NlcywgY29udGVudCkgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgdGFnKHRhZ05hbWU6IHN0cmluZywgY2xhc3Nlczogc3RyaW5nfHN0cmluZ1tdLCBjb250ZW50Pzogc3RyaW5nfEhUTUxFbGVtZW50fChIVE1MRWxlbWVudHxzdHJpbmcpW10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBlbHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgICAgICBpZiAoY2xhc3Nlcykge1xuICAgICAgICAgICAgSHRtbEhlbHBlci5hZGRDbGFzc2VzKGVsdCwgY2xhc3Nlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBlbHQuaW5uZXJUZXh0ID0gY29udGVudDtcbiAgICAgICAgfSBlbHNlIGlmIChjb250ZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsdC5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNvbnRlbnQpKSB7XG4gICAgICAgICAgICBjb250ZW50LmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBlbHQuaW5uZXJIVE1MICs9IGM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsdC5hcHBlbmRDaGlsZChjKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIGFkZCBjb250ZW50OicsIGMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBlbHQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmluZUNzc1J1bGVzKGlkOiBzdHJpbmcsIGNzc1J1bGVzOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgbGV0IGNzc0lkID0gJ2Nzcy0nICsgaWQ7XG4gICAgICAgIGxldCBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjc3NJZCk7XG4gICAgICAgIGlmKCFzdHlsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgc3R5bGVFbGVtZW50LmlkID0gY3NzSWQ7XG4gICAgICAgIC8qIGFkZCBzdHlsZSBydWxlcyB0byB0aGUgc3R5bGUgZWxlbWVudCAqL1xuICAgICAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzUnVsZXMpKTtcbiAgICAgICAgXG4gICAgICAgIC8qIGF0dGFjaCB0aGUgc3R5bGUgZWxlbWVudCB0byB0aGUgZG9jdW1lbnQgaGVhZCAqL1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG4gICAgfVxufSIsIlxuaW1wb3J0IHsgUHJvZ3JhbSwgcGFyc2VNb2R1bGUsIFBhcnNlT3B0aW9ucyB9IGZyb20gJ2VzcHJpbWEnO1xuaW1wb3J0IHsgd2FsayBhcyBlc3ByaW1hV2Fsaywgd2Fsa0FkZFBhcmVudCBhcyBlc3ByaW1hV2Fsa0FkZFBhcmVudCB9IGZyb20gJ2VzcHJpbWEtd2Fsayc7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBCYXNlTm9kZSwgRnVuY3Rpb25EZWNsYXJhdGlvbiwgQmxvY2tTdGF0ZW1lbnQsIElmU3RhdGVtZW50LCBSZXR1cm5TdGF0ZW1lbnQsIFN0YXRlbWVudCB9IGZyb20gJ2VzdHJlZSc7XG5pbXBvcnQgeyBFc3ByaW1hVmVyc2VJdGVyYW9yLCBFc3ByaW1hVmVyc2UsIEVzcHJpbWFDb3VwbGV0LCBFc3ByaW1hUHJvZ3JlbUZhY3RvcnksIEVzcHJpbWFQcm9ncmVtIH0gZnJvbSAnLi9Fc3ByaW1hVHlwZXMnO1xuaW1wb3J0IHsgRXNwcmltYUhlbHBlciB9IGZyb20gJy4vRXNwcmltYUhlbHBlcic7XG5pbXBvcnQgeyBDb2RlU2VydmljZSB9IGZyb20gJy4uL2NvcmUvQ29kZVNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZ3JlbVN0YXRlIH0gZnJvbSAnLi4vY29yZS9UeXBlcyc7XG5cbmNsYXNzIEJhc2ljRXNwcmltYUNvZGVJdGVyYXRvciBpbXBsZW1lbnRzIEVzcHJpbWFWZXJzZUl0ZXJhb3Ige1xuXG4gICAgcHJpdmF0ZSBzdGFjazogQmFzZU5vZGVbXSA9IFtdO1xuICAgIHByaXZhdGUgcmV0dXJuVmFsdWU6IGFueSA9IG51bGw7XG4gICAgcHJpdmF0ZSBmaW5pc2hlZCA9IGZhbHNlXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgICAgIHByaXZhdGUgcm9vdE5vZGU6IEJhc2VOb2RlLCBcbiAgICAgICAgICAgIHByaXZhdGUgc3RhdGU6IFByb2dyZW1TdGF0ZSkge1xuICAgICAgICB0aGlzLnN0YWNrLnB1c2gocm9vdE5vZGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVjbGFyZVByb2dyZW1Bcmd1bWVudHMoKSB7XG4gICAgICAgIGxldCBfY29sb25uZSA9IHRoaXMuc3RhdGUuY29sb25uZTtcbiAgICAgICAgbGV0IF9saWduZSA9IHRoaXMuc3RhdGUubGlnbmU7XG4gICAgICAgIGxldCBfZnJhbWUgPSB0aGlzLnN0YXRlLmZyYW1lO1xuICAgICAgICBsZXQgX2NvbnRleHRlID0gdGhpcy5zdGF0ZS5jb250ZXh0ZTtcblxuICAgICAgICB0aGlzLnN0YXRlLmV2YWwoJ3ZhciBjb2xvbm5lID0gJyArIF9jb2xvbm5lICsgJywgbGlnbmUgPSAnICsgX2xpZ25lICsgJywgZnJhbWUgPSAnICsgX2ZyYW1lICsgJzsnKTtcbiAgICAgICAgdGhpcy5zdGF0ZS5ldmFsKCd2YXIgY29udGV4dGUgPSAnICsgSlNPTi5zdHJpbmdpZnkoX2NvbnRleHRlKSk7XG4gICAgfVxuXG4gICAgZXhlY3V0ZU5leHQoKTogRXNwcmltYVZlcnNlIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBmaXJzdCBub2RlIG9uIHRoZSBzdGFja1xuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnN0YWNrLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ05vZGU6Jywgbm9kZSk7XG5cbiAgICAgICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RhY2sgc2hvdWxkIG5vdCBiZSBlbXB0eSAhJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzdG10O1xuXG4gICAgICAgICAgICBzd2l0Y2gobm9kZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIGxldCBmdW5jID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoZnVuYy5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWNsYXJlUHJvZ3JlbUFyZ3VtZW50cygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRWZXJzZShmdW5jKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdCbG9ja1N0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9jayA9IG5vZGUgYXMgQmxvY2tTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrLmJvZHkuc2xpY2UoKS5yZXZlcnNlKCkubWFwKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnQmxvY2tTdGF0ZW1lbnQgdW5zaGlmdGluZzonLCB4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdCh4KVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdJZlN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIHN0bXQgPSBub2RlIGFzIElmU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdENvZGUgPSBlc2NvZGVHZW5lcmF0ZShzdG10LnRlc3QpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0UmVzdWx0ID0gdGhpcy5zdGF0ZS5ldmFsKHRlc3RDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnSWZTdGF0ZW1lbnQgdGVzdCBldmFsdWF0ZSB0bzogJywgdGVzdFJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXN0UmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdUaGVuIHVuc2hpZnRpbmc6Jywgc3RtdC5jb25zZXF1ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdChzdG10LmNvbnNlcXVlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0bXQuYWx0ZXJuYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnRWxzZSB1bnNoaWZ0aW5nOicsIHN0bXQuYWx0ZXJuYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoc3RtdC5hbHRlcm5hdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkVmVyc2Uoc3RtdCk7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdSZXR1cm5TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBzdG10ID0gbm9kZSBhcyBSZXR1cm5TdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV0dXJuVmFsdWUgPSB0aGlzLnN0YXRlLmV2YWwoZXNjb2RlR2VuZXJhdGUoc3RtdC5hcmd1bWVudCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkVmVyc2Uoc3RtdCk7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdOb2RlOicsIG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29kZSA9IGVzY29kZUdlbmVyYXRlKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdHZW5lcmF0ZWQgY29kZTonLCBjb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGV2YWxSZXN1bHQgPSB0aGlzLnN0YXRlLmV2YWwoY29kZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0V2YWx1YXRlIHRvOicsIGV2YWxSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRWZXJzZShub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAodGhpcy5zdGFjay5sZW5ndGggPiAwKTtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0l0ZXJhdG9yIGhhcyBubyBtb3JlIGNvZGUgdG8gZXhlY3V0ZSAhJyk7XG4gICAgfSAgICBcbiAgICBcbiAgICBoYXNOZXh0KCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5maW5pc2hlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5vZGVzID0gdGhpcy5zdGFjay5zbGljZSgwKTtcbiAgICAgICAgd2hpbGUgKG5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gbm9kZXMuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudHlwZSAhPT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2tzOiBCbG9ja1N0YXRlbWVudFtdID0gW107XG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9jayA9IG5vZGUgYXMgQmxvY2tTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKGJsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGFyc291cnMgcmVjdXJzaXZlbWVudCBsZXMgYmxvY2tzIMOgIGxhIHJlY2hlcmNoZSBkZSBub2V1ZCBxdWkgbmUgc29udCBwYXMgZGVzIGJsb2Nrc1xuICAgICAgICAgICAgICAgICAgICBsZXQgaGFzTmV4dCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIWhhc05leHQgJiYgYmxvY2tzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiID0gYmxvY2tzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGIuYm9keS5tYXAoeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4LnR5cGUgIT09ICdCbG9ja1N0YXRlbWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc05leHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzTmV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljRXNwcmltYVByb2dyZW0gaW1wbGVtZW50cyBFc3ByaW1hUHJvZ3JlbSB7XG5cbiAgICBwcml2YXRlIGVzcHJpbWFQcm9ncmFtOiBQcm9ncmFtO1xuXG4gICAgcHJpdmF0ZSBpbml0Q291cGxldDogRXNwcmltYUNvdXBsZXQ7XG4gICAgcHJpdmF0ZSBjb2xvcmVyQ291cGxldDogRXNwcmltYUNvdXBsZXQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGNvbmZpZzogUGFyc2VPcHRpb25zID0ge1xuICAgICAgICAgICAgY29tbWVudDogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVzcHJpbWFQcm9ncmFtID0gcGFyc2VNb2R1bGUoY29kZSwgY29uZmlnKTtcbiAgICAgICAgdGhpcy5pbml0Q291cGxldCA9IHRoaXMud2Fsa1Byb2dyZW1Db3VwbGV0KCdpbml0aWFsaXNlclByb2dyZW0nKTtcbiAgICAgICAgdGhpcy5jb2xvcmVyQ291cGxldCA9IHRoaXMud2Fsa1Byb2dyZW1Db3VwbGV0KCdjb2xvcmVyUHJvZ3JlbScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB3YWxrUHJvZ3JlbUNvdXBsZXQoZnVuY3Rpb25OYW1lOiBzdHJpbmcpOiBFc3ByaW1hQ291cGxldCB7XG4gICAgICAgIHZhciBmdW5jTm9kZTogRnVuY3Rpb25EZWNsYXJhdGlvbiB8IG51bGwgPSBudWxsO1xuICAgICAgICB2YXIgdmVyc2VzOiBCYXNlTm9kZVtdID0gW107XG4gICAgICAgIGVzcHJpbWFXYWxrQWRkUGFyZW50KHRoaXMuZXNwcmltYVByb2dyYW0sIG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYoIG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nICYmIG5vZGUuaWQgJiYgbm9kZS5pZC5uYW1lID09PSBmdW5jdGlvbk5hbWUpIHtcbiAgICAgICAgICAgICAgICBmdW5jTm9kZSA9IG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZnVuY05vZGUgJiYgRXNwcmltYUhlbHBlci5pc0NoaWxkTm9kZU9mKG5vZGUsIGZ1bmNOb2RlKSkgeyAvLyAmJiBFc3ByaW1hSGVscGVyLmlzTm90Q2hpbGROb2RlT2Yobm9kZSwgdmVyc2VzKVxuICAgICAgICAgICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdGdW5jdGlvbkRlY2xhcmF0aW9uJyBcbiAgICAgICAgICAgICAgICAgICAgfHwgbm9kZS50eXBlID09PSAnVmFyaWFibGVEZWNsYXJhdGlvbidcbiAgICAgICAgICAgICAgICAgICAgfHwgbm9kZS50eXBlID09PSAnRXhwcmVzc2lvblN0YXRlbWVudCdcbiAgICAgICAgICAgICAgICAgICAgfHwgbm9kZS50eXBlID09PSAnUmV0dXJuU3RhdGVtZW50J1xuICAgICAgICAgICAgICAgICAgICB8fCBub2RlLnR5cGUgPT09ICdJZlN0YXRlbWVudCcgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJzZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gKTtcbiAgICAgICAgaWYgKGZ1bmNOb2RlKSB7XG4gICAgICAgICAgICB2ZXJzZXMudW5zaGlmdChmdW5jTm9kZSk7XG4gICAgICAgICAgICByZXR1cm4gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRDb3VwbGV0KGZ1bmNOb2RlLCB2ZXJzZXMpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW1wb3NzaWJsZSBkZSB0cm91dmVyIGxhIGZvbmN0aW9uICR7ZnVuY3Rpb25OYW1lfSgpICFgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdGlhbGlzZXJQcm9ncmVtRnVuY3Rpb24oKTogRXNwcmltYUNvdXBsZXQge1xuICAgICAgICByZXR1cm4gdGhpcy5pbml0Q291cGxldDtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29sb3JlclByb2dyZW1GdW5jdGlvbigpOiBFc3ByaW1hQ291cGxldCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbG9yZXJDb3VwbGV0O1xuICAgIH1cblxuICAgIHB1YmxpYyBpdGVyYXRvcihzdGF0ZTogUHJvZ3JlbVN0YXRlKTogRXNwcmltYVZlcnNlSXRlcmFvciB7XG4gICAgICAgIHJldHVybiBuZXcgQmFzaWNFc3ByaW1hQ29kZUl0ZXJhdG9yKHRoaXMuY29sb3JlclByb2dyZW1GdW5jdGlvbigpLmZ1bmN0aW9uUm9vdE5vZGUsIHN0YXRlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBCYXNpY0VzcHJpbWFQcm9ncmVtRmFjdG9yeSBpbXBsZW1lbnRzIEVzcHJpbWFQcm9ncmVtRmFjdG9yeSB7XG5cbiAgICBidWlsZFByb2dyZW0oY29kZTogc3RyaW5nKTogRXNwcmltYVByb2dyZW0ge1xuICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW1wb3NzaWJsZSB0byBidWlsZCBQcm9ncmVtIHdpdGhvdXQgY29kZSAhJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBCYXNpY0VzcHJpbWFQcm9ncmVtKGNvZGUpO1xuICAgIH1cblxuICAgIGJ1aWxkQ291cGxldChub2RlOiBGdW5jdGlvbkRlY2xhcmF0aW9uLCB2ZXJzZXM6IEJhc2VOb2RlW10pOiBFc3ByaW1hQ291cGxldCB7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBvc3NpYmxlIHRvIGJ1aWxkIGVtcHR5IENvdXBsZXQgIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVzcHJpbWFWZXJzZXMgPSB2ZXJzZXMubWFwKHRoaXMuYnVpbGRWZXJzZSk7XG5cbiAgICAgICAgbGV0IGNvdXBsZXQ6IEVzcHJpbWFDb3VwbGV0ID0ge1xuICAgICAgICAgICAgZnVuY3Rpb25Sb290Tm9kZTogbm9kZSxcbiAgICAgICAgICAgIHZlcnNlczogZXNwcmltYVZlcnNlc1xuICAgICAgICB9XG4gICAgICAgIC8vY29uc29sZS5sb2coJ0J1aWx0IGNvdXBsZXQ6JywgY291cGxldCk7XG4gICAgICAgIHJldHVybiBjb3VwbGV0O1xuICAgIH1cblxuICAgIGJ1aWxkVmVyc2Uobm9kZTogQmFzZU5vZGUpOiBFc3ByaW1hVmVyc2Uge1xuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW1wb3NzaWJsZSB0byBidWlsZCBlbXB0eSBWZXJzZSAhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY29kZSA9IG5vZGU7XG4gICAgICAgIGlmKG5vZGUudHlwZSA9PT0gJ0lmU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgY29kZSA9IChub2RlIGFzIElmU3RhdGVtZW50KS50ZXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZlcnNlOiBFc3ByaW1hVmVyc2UgPSB7IFxuICAgICAgICAgICAgbm9kZTogbm9kZSxcbiAgICAgICAgICAgIGNvZGU6IGNvZGVcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHZlcnNlO1xuICAgIH1cbn1cbiIsIlxuZXhwb3J0IGNsYXNzIEV2YWxTY29wZSB7XG5cbiAgICAvLyBTZWUgaHR0cDovL3BlcmZlY3Rpb25raWxscy5jb20vZ2xvYmFsLWV2YWwtd2hhdC1hcmUtdGhlLW9wdGlvbnMvXG4gICAgLy8gV2lsbCByZXR1cm4gYW4gZXZhbCBhYmxlIHRvIGV2YWx1YXRlIGpzIGNvZGUgaW4gdGhlIGdsb2JhbCBzY29wZS5cbiAgICBwdWJsaWMgcmVhZG9ubHkgZ2xvYmFsRXZhbCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdmFyIGlzSW5kaXJlY3RFdmFsR2xvYmFsID0gKGZ1bmN0aW9uIChvcmlnaW5hbCwgT2JqZWN0KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vIERvZXMgYE9iamVjdGAgcmVzb2x2ZSB0byBhIGxvY2FsIHZhcmlhYmxlLCBvciB0byBhIGdsb2JhbCwgYnVpbHQtaW4gYE9iamVjdGAsXG4gICAgICAgICAgICAgICAgLy8gcmVmZXJlbmNlIHRvIHdoaWNoIHdlIHBhc3NlZCBhcyBhIGZpcnN0IGFyZ3VtZW50P1xuICAgICAgICAgICAgICAgIHJldHVybiAoMSwgZXZhbCkoJ09iamVjdCcpID09PSBvcmlnaW5hbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBpbmRpcmVjdCBldmFsIGVycm9ycyBvdXQgKGFzIGFsbG93ZWQgcGVyIEVTMyksIHRoZW4ganVzdCBiYWlsIG91dCB3aXRoIGBmYWxzZWBcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKE9iamVjdCwgMTIzKTtcblxuICAgICAgICBpZiAoaXNJbmRpcmVjdEV2YWxHbG9iYWwpIHtcbiAgICAgICAgICAgIC8vIGlmIGluZGlyZWN0IGV2YWwgZXhlY3V0ZXMgY29kZSBnbG9iYWxseSwgdXNlIGl0XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV4cHJlc3Npb246IHN0cmluZykge1xuICAgICAgICAgICAgICAgIHJldHVybiAoMSwgZXZhbCkoZXhwcmVzc2lvbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHdpbmRvdy5leGVjU2NyaXB0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gaWYgYHdpbmRvdy5leGVjU2NyaXB0IGV4aXN0c2AsIHVzZSBpdFxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChleHByZXNzaW9uOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5leGVjU2NyaXB0KGV4cHJlc3Npb24pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG90aGVyd2lzZSwgZ2xvYmFsRXZhbCBpcyBgdW5kZWZpbmVkYCBzaW5jZSBub3RoaW5nIGlzIHJldHVybmVkXG4gICAgICAgIHJldHVybiAoZXhwcjogc3RyaW5nKSA9PiB7dGhyb3cgbmV3IEVycm9yKCdObyBnbG9iYWwgZXZhbCBhdmFpbGFibGUgIScpO31cbiAgICB9KSgpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG59XG4iLCJpbXBvcnQgeyBQcm9ncmVtU2NoZWR1bGVyLCBWZXJzZUl0ZXJhdG9yLCBQcm9ncmVtQ29kZSwgUHJvZ3JlbVZlcnNlLCBTdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lciwgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyLCBHcmlkQ2hhbmdlTGlzdGVuZXIsIExpbmVDaGFuZ2VMaXN0ZW5lciwgRnJhbWVDaGFuZ2VMaXN0ZW5lciwgUHJvZ3JlbVN0YXRlLCBQcm9ncmVtVGVtcG8sIFByb2dyZW1Db25maWcsIFBhaW50aW5nTGlzdGVuZXIgfSBmcm9tIFwiLi9UeXBlc1wiO1xuXG5jbGFzcyBTaW1wbGVQcm9ncmVtU2NoZWR1bGVyIGltcGxlbWVudHMgUHJvZ3JlbVNjaGVkdWxlciB7XG4gICAgXG4gICAgcHJpdmF0ZSBzdGF0ZTogUHJvZ3JlbVN0YXRlO1xuICAgIHByaXZhdGUgY29kZUl0ZXJhdG9yOiBWZXJzZUl0ZXJhdG9yPGFueT4gfCBudWxsID0gbnVsbDtcblxuICAgIHByaXZhdGUgc3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXJzOiBTdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lcltdID0gW107XG4gICAgcHJpdmF0ZSBjb2RlRXhlY3V0aW9uTGlzdGVuZXJzOiBDb2RlRXhlY3V0aW9uTGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgZ3JpZENoYW5nZUxpc3RlbmVyczogR3JpZENoYW5nZUxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGxpbmVDaGFuZ2VMaXN0ZW5lcnM6IExpbmVDaGFuZ2VMaXN0ZW5lcltdID0gW107XG4gICAgcHJpdmF0ZSBmcmFtZUNoYW5nZUxpc3RlbmVyczogRnJhbWVDaGFuZ2VMaXN0ZW5lcltdID0gW107XG4gICAgcHJpdmF0ZSBwYWludGluZ0xpc3RlbmVyczogUGFpbnRpbmdMaXN0ZW5lcltdID0gW107XG5cbiAgICBwdWJsaWMgdGVtcG86IFByb2dyZW1UZW1wbyA9IFByb2dyZW1UZW1wby5CeUxpbmU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogUHJvZ3JlbUNvbmZpZywgcHJpdmF0ZSBjb2RlOiBQcm9ncmVtQ29kZTxhbnk+KSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLnJlc2V0KCk7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlU3RhcnRJdGVyYXRpbmdDb2RlKGxpc3RlbmVyOiBTdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9ICAgIFxuXG4gICAgc3Vic2NyaWJlQ29kZUV4ZWN1dGlvbihsaXN0ZW5lcjogQ29kZUV4ZWN1dGlvbkxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29kZUV4ZWN1dGlvbkxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9ICAgIFxuICAgIFxuICAgIHN1YnNjcmliZUdyaWRDaGFuZ2UobGlzdGVuZXI6IEdyaWRDaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmdyaWRDaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlTGluZUNoYW5nZShsaXN0ZW5lcjogTGluZUNoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGluZUNoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVGcmFtZUNoYW5nZShsaXN0ZW5lcjogRnJhbWVDaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmZyYW1lQ2hhbmdlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZVBhaW50aW5nKGxpc3RlbmVyOiBQYWludGluZ0xpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGFpbnRpbmdMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmVzZXQoKTogUHJvZ3JlbVN0YXRlIHtcbiAgICAgICAgbGV0IGluaXRpYWxDb250ZXh0ZSA9IHt9O1xuICAgICAgICAvLyBDYWxsIGp1c3QgZXZhbHVhdGVkIGluaXRpYWxpc2VyUHJvZ3JlbSBmdW5jdGlvblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGluaXRpYWxpc2VyUHJvZ3JlbSh0aGlzLmNvbmZpZywgaW5pdGlhbENvbnRleHRlKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0xvYWRlZCBpbml0aWFsIGNvbnRleHRlOiAnLCBpbml0aWFsQ29udGV4dGUpO1xuICAgICAgICBsZXQgc3RhdGUgPSBuZXcgUHJvZ3JlbVN0YXRlKDAsIDAsIDAsIGluaXRpYWxDb250ZXh0ZSwgbnVsbCk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBjdXJyZW50KCk6IFByb2dyZW1TdGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cblxuICAgIG5leHQoKTogUHJvZ3JlbVN0YXRlW10ge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUpIHRocm93IG5ldyBFcnJvcignSW5jb25zaXN0ZW50IFByb2dyZW0gc3RhdGUgIScpO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMudGVtcG8gPT09IFByb2dyZW1UZW1wby5CeVZlcnNlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb2RlSXRlcmF0b3IgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29kZUl0ZXJhdG9yID0gdGhpcy5jb2RlLml0ZXJhdG9yKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZVN0YXJ0SXRlcmF0aW5nQ29kZSh0aGlzLnN0YXRlKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2hhc05leHQ6JywgdGhpcy5jb2RlSXRlcmF0b3IuaGFzTmV4dCgpKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY29kZUl0ZXJhdG9yLmhhc05leHQoKSkge1xuICAgICAgICAgICAgICAgIGxldCB2ZXJzZSA9IHRoaXMuY29kZUl0ZXJhdG9yLmV4ZWN1dGVOZXh0KCk7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0gbmV3IFByb2dyZW1TdGF0ZSh0aGlzLnN0YXRlLmNvbG9ubmUsIHRoaXMuc3RhdGUubGlnbmUsIHRoaXMuc3RhdGUuZnJhbWUsIHRoaXMuc3RhdGUuY29udGV4dGUsIHZlcnNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlRXhlY3V0aW9uTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUNvZGVFeGVjdXRpb24obmV3U3RhdGUpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhaW50aW5nTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZVBhaW50aW5nKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbbmV3U3RhdGVdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdGaW5pc2hlZCBpdGVyYXRpbmcgb3ZlciBjb2RlLicpXG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgbGV0IG5vdGlmeVBpeGVsQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIGxldCBub3RpZnlMaW5lQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIGxldCBub3RpZnlGcmFtZUNoYW5nZSA9IGZhbHNlO1xuICAgICAgICBsZXQgYnVmZmVyZWRTdGF0ZXM6IFByb2dyZW1TdGF0ZVtdID0gW107XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGxldCBfY29sb25uZSA9IHRoaXMuc3RhdGUuY29sb25uZTtcbiAgICAgICAgICAgIGxldCBfbGlnbmUgPSB0aGlzLnN0YXRlLmxpZ25lO1xuICAgICAgICAgICAgbGV0IF9mcmFtZSA9IHRoaXMuc3RhdGUuZnJhbWU7XG5cbiAgICAgICAgICAgIF9jb2xvbm5lICsrO1xuICAgICAgICAgICAgbm90aWZ5UGl4ZWxDaGFuZ2UgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoX2NvbG9ubmUgPj0gdGhpcy5jb25maWcubm9tYnJlQ29sb25uZXMpIHtcbiAgICAgICAgICAgICAgICBfY29sb25uZSA9IDA7XG4gICAgICAgICAgICAgICAgX2xpZ25lICsrO1xuICAgICAgICAgICAgICAgIG5vdGlmeUxpbmVDaGFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoX2xpZ25lID49IHRoaXMuY29uZmlnLm5vbWJyZUxpZ25lcykge1xuICAgICAgICAgICAgICAgIF9saWduZSA9IDA7XG4gICAgICAgICAgICAgICAgX2ZyYW1lICsrO1xuICAgICAgICAgICAgICAgIG5vdGlmeUZyYW1lQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF9mcmFtZSA+PSB0aGlzLmNvbmZpZy5ub21icmVGcmFtZXMpIHtcbiAgICAgICAgICAgICAgICBfZnJhbWUgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSBuZXcgUHJvZ3JlbVN0YXRlKF9jb2xvbm5lLCBfbGlnbmUsIF9mcmFtZSwgdGhpcy5zdGF0ZS5jb250ZXh0ZSwgbnVsbCk7XG4gICAgXG4gICAgICAgICAgICBpZiAobm90aWZ5UGl4ZWxDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRDaGFuZ2VMaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlR3JpZENoYW5nZSh0aGlzLnN0YXRlKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChub3RpZnlMaW5lQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5lQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUxpbmVDaGFuZ2UodGhpcy5zdGF0ZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm90aWZ5RnJhbWVDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUZyYW1lQ2hhbmdlKHRoaXMuc3RhdGUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnVmZmVyZWRTdGF0ZXMucHVzaCh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgIC8vdGhpcy5jb2RlSXRlcmF0b3IgPSB0aGlzLmNvZGUuaXRlcmF0b3IobmV3U3RhdGUpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0gd2hpbGUodGhpcy50ZW1wbyA9PT0gUHJvZ3JlbVRlbXBvLkJ5TGluZSAmJiAhbm90aWZ5TGluZUNoYW5nZSB8fCB0aGlzLnRlbXBvID09PSBQcm9ncmVtVGVtcG8uQnlGcmFtZSAmJiAhbm90aWZ5RnJhbWVDaGFuZ2UpO1xuXG4gICAgICAgIHRoaXMuY29kZUl0ZXJhdG9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5wYWludGluZ0xpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVQYWludGluZygpKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBidWZmZXJlZFN0YXRlcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UHJvZ3JlbSgpOiBQcm9ncmVtQ29kZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29kZTtcbiAgICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgU2NoZWR1bGluZ1NlcnZpY2Uge1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJvZ3JlbVNjaGVkdWxlcihjb25maWc6IFByb2dyZW1Db25maWcsIGNvZGU6IFByb2dyZW1Db2RlPGFueT4sIHRlbXBvOiBQcm9ncmVtVGVtcG8pIHtcbiAgICAgICAgbGV0IHNjaGVkdWxlciA9IG5ldyBTaW1wbGVQcm9ncmVtU2NoZWR1bGVyKGNvbmZpZywgY29kZSk7XG4gICAgICAgIHNjaGVkdWxlci50ZW1wbyA9IHRlbXBvO1xuICAgICAgICByZXR1cm4gc2NoZWR1bGVyO1xuICAgIH1cblxufSIsImltcG9ydCB7IFN0eWxlRGVjb3JhdG9yIH0gZnJvbSBcIi4uLy4uL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IEJhc2VOb2RlLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBCbG9ja1N0YXRlbWVudCwgSWZTdGF0ZW1lbnQsIFZhcmlhYmxlRGVjbGFyYXRvciwgVmFyaWFibGVEZWNsYXJhdGlvbiwgQXNzaWdubWVudEV4cHJlc3Npb24sIEJpbmFyeUV4cHJlc3Npb24sIEV4cHJlc3Npb25TdGF0ZW1lbnQsIFJldHVyblN0YXRlbWVudCwgSWRlbnRpZmllciwgTWVtYmVyRXhwcmVzc2lvbiB9IGZyb20gXCJlc3RyZWVcIjtcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9IdG1sSGVscGVyXCI7XG5pbXBvcnQgeyBFc3ByaW1hSGVscGVyIH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYUhlbHBlclwiO1xuaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgRXNwcmltYVZlcnNlLCBFc3ByaW1hSHRtbENvdXBsZXRGYWN0b3J5LCBFc3ByaW1hQ291cGxldCB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFUeXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgRXNwcmltYVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeSBpbXBsZW1lbnRzIEVzcHJpbWFIdG1sQ291cGxldEZhY3Rvcnkge1xuXG4gICAgcHJpdmF0ZSBodG1sVmVyc2VzTWFwOiBNYXA8QmFzZU5vZGUsIEhUTUxFbGVtZW50PiA9IG5ldyBNYXAoKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvdXBsZXQ6IEVzcHJpbWFDb3VwbGV0LFxuICAgICAgICBwcml2YXRlIGRlY29yYXRvcjogU3R5bGVEZWNvcmF0b3I8QmFzZU5vZGU+XG4gICAgKSB7fVxuXG4gICAgYnVpbGRDb3VwbGV0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGh0bWxDb3VwbGV0ID0gdGhpcy5idWlsZE5vZGUodGhpcy5jb3VwbGV0LmZ1bmN0aW9uUm9vdE5vZGUpO1xuICAgICAgICBodG1sQ291cGxldC5jbGFzc0xpc3QuYWRkKCdwcm9ncmVtLWluc3BlY3Rvci1jb21wb25lbnQnKTtcbiAgICAgICAgcmV0dXJuIGh0bWxDb3VwbGV0O1xuICAgIH1cblxuICAgIGdldEh0bWxWZXJzZSh2ZXJzZTogRXNwcmltYVZlcnNlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAodGhpcy5odG1sVmVyc2VzTWFwLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbFN0YXRlRXJyb3I6IGNvdXBsZXQgbXVzdCBiZSBidWlsdCBiZWZvcmUgY2FsbGluZyBnZXRIdG1sVmVyc2UoKSAhJylcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodG1sRWxlbWVudCA9IHRoaXMuaHRtbFZlcnNlc01hcC5nZXQodmVyc2Uubm9kZSk7XG4gICAgICAgIGlmICghaHRtbEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBIVE1MRWxlbWVudCBmb3VuZCBtYXRjaGluZyB2ZXJzZTonLCB2ZXJzZSwgJyEnKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBIVE1MRWxlbWVudCBmb3VuZCBtYXRjaGluZyBzdXBwbGllZCB2ZXJzZSAhYCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBodG1sRWxlbWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZCBOb2RlIGFwcGx5aW5nIGRlY29yYXRvcnMuXG4gICAgICogXG4gICAgICogQHBhcmFtIG5vZGUgdGhlIG5vZGUgZm9yIHdoaWNoIHRvIHByb2R1Y2UgSFRNTFxuICAgICAqIEBwYXJhbSBzaWJsaW5ncyB0aGUgbm9kZXMgdG8gYWRkIGFzIHNpYmxpbmdzIG9mIHRoZSBub2RlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGJ1aWxkTm9kZShub2RlOiBCYXNlTm9kZSB8IHVuZGVmaW5lZCB8IG51bGwpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIuc3BhbignZW1wdHknLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNpYmxpbmdzOiBIVE1MRWxlbWVudFtdID0gW11cbiAgICAgICAgbGV0IGh0bWxPdXRwdXQgPSB0aGlzLmJ1aWxkTm9kZUludGVybmFsKG5vZGUsIHNpYmxpbmdzKTtcbiAgICAgICAgaHRtbE91dHB1dCA9IHRoaXMuZGVjb3JhdG9yLmRlY29yYXRlKG5vZGUsIGh0bWxPdXRwdXQpO1xuXG4gICAgICAgIGxldCBtYXRjaGluZ1ZlcnNlID0gdGhpcy5jb3VwbGV0LnZlcnNlcy5maW5kKHYgPT4gdi5ub2RlID09PSBub2RlKTtcbiAgICAgICAgaWYgKG1hdGNoaW5nVmVyc2UpIHtcbiAgICAgICAgICAgIGh0bWxPdXRwdXQgPSB0aGlzLmVuY2Fwc3VsYXRlTm9kZUluVmVyc2VDb250YWluZXIoaHRtbE91dHB1dCk7XG4gICAgICAgICAgICAvLyBUaGlzIG5vZGUgaXMgdGhlIHJvb3Qgbm9kZSBvZiBhIFZlcnNlXG4gICAgICAgICAgICB0aGlzLmh0bWxWZXJzZXNNYXAuc2V0KG1hdGNoaW5nVmVyc2Uubm9kZSwgaHRtbE91dHB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2libGluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gSWYgc2libGluZ3MsIGJ1aWxkIGVhY2ggc2libGluZ1xuICAgICAgICAgICAgaHRtbE91dHB1dCA9IEh0bWxIZWxwZXIuc3Bhbignc2libGluZy1jb250YWluZXInLCBodG1sT3V0cHV0KTtcbiAgICAgICAgICAgIHdoaWxlKHNpYmxpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgc2libGluZyA9IHNpYmxpbmdzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgc2libGluZ091dCA9IHRoaXMuYnVpbGROb2RlKHNpYmxpbmcpO1xuICAgICAgICAgICAgICAgICAgICBodG1sT3V0cHV0LmFwcGVuZENoaWxkKHNpYmxpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBodG1sT3V0cHV0O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBlbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGh0bWxFbHQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgY29udGVudCA9IEh0bWxIZWxwZXIuc3BhbigndmVyc2UtY29udGVudCcsIGh0bWxFbHQpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCd2ZXJzZSB2ZXJzZS1jb250YWluZXInLCBjb250ZW50KTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZCBub2RlLlxuICAgICAqIEBwYXJhbSBub2RlIFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBidWlsZE5vZGVJbnRlcm5hbChub2RlOiBCYXNlTm9kZSwgc2libGluZ3M6IEhUTUxFbGVtZW50W10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ0J1aWxkaW5nIG5vZGUnLCBub2RlLCAnLi4uJyk7XG4gICAgICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdGdW5jdGlvbkRlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEZ1bmN0aW9uRGVjbGFyYXRpb24obm9kZSwgc2libGluZ3MpO1xuICAgICAgICAgICAgY2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQmxvY2tTdGF0ZW1lbnQobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdJZlN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRJZlN0YXRlbWVudChub2RlLCBzaWJsaW5ncyk7XG4gICAgICAgICAgICBjYXNlICdWYXJpYWJsZURlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZFZhcmlhYmxlRGVjbGFyYXRpb24obm9kZSk7XG4gICAgICAgICAgICBjYXNlICdWYXJpYWJsZURlY2xhcmF0b3InOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkVmFyaWFibGVEZWNsYXJhdG9yKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnQXNzaWdubWVudEV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQXNzaWdubWVudEV4cHJlc3Npb24obm9kZSk7XG4gICAgICAgICAgICBjYXNlICdCaW5hcnlFeHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEJpbmFyeUV4cHJlc3Npb24obm9kZSk7XG4gICAgICAgICAgICBjYXNlICdFeHByZXNzaW9uU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEV4cHJlc3Npb25TdGF0ZW1lbnQobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdSZXR1cm5TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkUmV0dXJuU3RhdGVtZW50KG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnSWRlbnRpZmllcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRJZGVudGlmaWVyKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnTWVtYmVyRXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRNZW1iZXJFeHByZXNzaW9uKG5vZGUpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZERlZmF1bHQobm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRGdW5jdGlvbkRlY2xhcmF0aW9uKG5vZGU6IEJhc2VOb2RlLCBzaWJsaW5nczogSFRNTEVsZW1lbnRbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgICAgIFxuICAgICAgICBsZXQgZGVjbFN0YXJ0SXRlbXM6IChzdHJpbmcgfCBIVE1MRWxlbWVudClbXTtcbiAgICAgICAgaWYgKG4uaWQpIHtcbiAgICAgICAgICAgIGxldCBmdW5jSWQgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtaWQnLCBuLmlkLm5hbWUpO1xuICAgICAgICAgICAgZGVjbFN0YXJ0SXRlbXMgPSBbJ2Z1bmN0aW9uICcsIGZ1bmNJZCwgJyAoICddO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVjbFN0YXJ0SXRlbXMgPSBbJ2Z1bmN0aW9uICggJ107Ly8gKyBmdW5jLnBhcmFtcy5tYXAoeCA9PiB4Lm5hbWUpLmpvaW4oJywgJykgKyAnICkgeyc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFyYW1Db3VudCA9IG4ucGFyYW1zLmxlbmd0aDtcbiAgICAgICAgbi5wYXJhbXMuZm9yRWFjaCgocGFyYW0sIGkpID0+IHtcbiAgICAgICAgICAgIGxldCB2YXJOYW1lID0gRXNwcmltYUhlbHBlci5wYXR0ZXJuVG9TdHJpbmcocGFyYW0pO1xuICAgICAgICAgICAgbGV0IGZ1bmNQYXJhbSA9IHRoaXMuYnVpbGROb2RlKHBhcmFtKTsvL0h0bWxIZWxwZXIuc3BhbignZnVuYy1wYXJhbScsIHZhck5hbWUpO1xuICAgICAgICAgICAgZGVjbFN0YXJ0SXRlbXMucHVzaChmdW5jUGFyYW0pO1xuICAgICAgICAgICAgaWYgKGkgPCBwYXJhbUNvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgIGRlY2xTdGFydEl0ZW1zLnB1c2goJywgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlY2xTdGFydEl0ZW1zLnB1c2goJyApIHsnKTtcblxuICAgICAgICBsZXQgZGVjbFN0YXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLXN0YXJ0JywgZGVjbFN0YXJ0SXRlbXMpO1xuICAgICAgICBsZXQgZnVuY0JvZHkgPSB0aGlzLmJ1aWxkTm9kZShuLmJvZHkpO1xuICAgICAgICBsZXQgZGVjbEVuZCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1lbmQnLCAnfScpO1xuICAgICAgICBkZWNsRW5kID0gdGhpcy5lbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGRlY2xFbmQpO1xuICAgICAgICAvL2xldCBkZWNsID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLWRlY2xhcmF0aW9uJywgW2RlY2xTdGFydCwgZnVuY0JvZHksIGRlY2xFbmRdKTtcbiAgICAgICAgbGV0IGRlY2wgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtZGVjbGFyYXRpb24nLCBkZWNsU3RhcnQpO1xuICAgICAgICBzaWJsaW5ncy5wdXNoKGZ1bmNCb2R5KTtcbiAgICAgICAgc2libGluZ3MucHVzaChkZWNsRW5kKTtcbiAgICAgICAgcmV0dXJuIGRlY2w7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkQmxvY2tTdGF0ZW1lbnQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgbGV0IGJvZHlTdGF0ZW1lbnRzID0gbi5ib2R5Lm1hcChzdGF0ZW1lbnQgPT4gdGhpcy5idWlsZE5vZGUoc3RhdGVtZW50KSlcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIuc3BhbignYmxvY2snLCBib2R5U3RhdGVtZW50cyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkSWZTdGF0ZW1lbnQobm9kZTogQmFzZU5vZGUsIHNpYmxpbmdzOiBIVE1MRWxlbWVudFtdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgSWZTdGF0ZW1lbnQ7XG4gICAgICAgIGxldCBjb250ZW50OiBIVE1MRWxlbWVudFtdID0gW11cbiAgICAgICAgbGV0IHRlc3QgPSB0aGlzLmJ1aWxkTm9kZShuLnRlc3QpO1xuICAgICAgICBsZXQgaWZTdGFydFRleHQgPSBbJ2lmICggJywgdGVzdCwgJyApIHsnXTtcbiAgICAgICAgbGV0IGlmU3RhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1zdGF0ZW1lbnQtc3RhcnQnLCBpZlN0YXJ0VGV4dCk7XG4gICAgICAgIGNvbnRlbnQucHVzaChpZlN0YXJ0KTtcblxuICAgICAgICBsZXQgdGhlbkJsb2NrID0gdGhpcy5idWlsZE5vZGUobi5jb25zZXF1ZW50KTtcbiAgICAgICAgbGV0IGlmVGhlbiA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLWJsb2NrLXRoZW4nLCB0aGVuQmxvY2spO1xuICAgICAgICBjb250ZW50LnB1c2goaWZUaGVuKTtcbiAgICAgICAgc2libGluZ3MucHVzaCh0aGVuQmxvY2spO1xuXG4gICAgICAgIGlmIChuLmFsdGVybmF0ZSkge1xuICAgICAgICAgICAgbGV0IGlmRWxzZURlY2wgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1zdGF0ZW1lbnQtZWxzZScsICd9IGVsc2UgeycpO1xuICAgICAgICAgICAgaWZFbHNlRGVjbCA9IHRoaXMuZW5jYXBzdWxhdGVOb2RlSW5WZXJzZUNvbnRhaW5lcihpZkVsc2VEZWNsKTtcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaChpZkVsc2VEZWNsKTtcbiAgICAgICAgICAgIHNpYmxpbmdzLnB1c2goaWZFbHNlRGVjbCk7XG5cbiAgICAgICAgICAgIGxldCBlbHNlQmxvY2sgPSB0aGlzLmJ1aWxkTm9kZShuLmFsdGVybmF0ZSk7XG4gICAgICAgICAgICBsZXQgaWZFbHNlID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtYmxvY2stZWxzZScsIGVsc2VCbG9jayk7XG4gICAgICAgICAgICBjb250ZW50LnB1c2goaWZFbHNlKTtcbiAgICAgICAgICAgIHNpYmxpbmdzLnB1c2goaWZFbHNlKTtcbiAgICAgICAgfSBcbiAgICAgICAgbGV0IGlmRW5kID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtc3RhdGVtZW50LWVuZCcsICd9Jyk7XG4gICAgICAgIGlmRW5kID0gdGhpcy5lbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGlmRW5kKTtcbiAgICAgICAgY29udGVudC5wdXNoKGlmRW5kKTtcbiAgICAgICAgc2libGluZ3MucHVzaChpZkVuZCk7XG5cbiAgICAgICAgLy9sZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtc3RhdGVtZW50JywgY29udGVudCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaWZTdGFydDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRWYXJpYWJsZURlY2xhcmF0aW9uKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdGlvbjtcbiAgICAgICAgbGV0IGRlY2xhcmF0aW9ucyA9IG4uZGVjbGFyYXRpb25zLm1hcChkID0+IHRoaXMuYnVpbGROb2RlKGQpKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZGVjbGFyYXRpb24gdmFyaWFibGUtZGVjbGFyYXRpb24nKTtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IG4ua2luZCArICcgJztcbiAgICAgICAgZGVjbGFyYXRpb25zLmZvckVhY2goZCA9PiBjb250YWluZXIuYXBwZW5kQ2hpbGQoZCkpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZFZhcmlhYmxlRGVjbGFyYXRvcihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRvcjtcbiAgICAgICAgbGV0IGxlZnRQYXJ0ID0gdGhpcy5idWlsZE5vZGUobi5pZCk7XG4gICAgICAgIGxldCBjb250YWluZXI7XG4gICAgICAgIGlmIChuLmluaXQpIHtcbiAgICAgICAgICAgIGxldCBhc3NpZ25QYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdvcGVyYXRvciBhc3NpZ24tb3BlcmF0b3InLCAnPScpO1xuICAgICAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5idWlsZE5vZGUobi5pbml0KTtcbiAgICAgICAgICAgIGxldCByaWdodFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLXZhbHVlJywgcmlnaHQpO1xuICAgICAgICAgICAgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIHZhcmlhYmxlLWRlY2xhcmF0b3InLCBbbGVmdFBhcnQsIGFzc2lnblBhcnQsIHJpZ2h0UGFydF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIHZhcmlhYmxlLWRlY2xhcmF0b3InLCBsZWZ0UGFydCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkQXNzaWdubWVudEV4cHJlc3Npb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLmJ1aWxkTm9kZShuLmxlZnQpO1xuICAgICAgICBsZXQgbGVmdFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLWlkJywgbGVmdCk7XG4gICAgICAgIGxldCBhc3NpZ25QYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdvcGVyYXRvciBhc3NpZ24tb3BlcmF0b3InLCAnPScpO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmJ1aWxkTm9kZShuLnJpZ2h0KTtcbiAgICAgICAgbGV0IHJpZ2h0UGFydCA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtdmFsdWUnLCByaWdodCk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gYXNzaWdubWVudC1leHByZXNzaW9uJywgW2xlZnRQYXJ0LCBhc3NpZ25QYXJ0LCByaWdodFBhcnRdKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRCaW5hcnlFeHByZXNzaW9uKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgQmluYXJ5RXhwcmVzc2lvbjtcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLmJ1aWxkTm9kZShuLmxlZnQpO1xuICAgICAgICBsZXQgbGVmdFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24nLCBsZWZ0KTtcbiAgICAgICAgbGV0IG9wZXJhdG9yUGFydCA9IEh0bWxIZWxwZXIuc3Bhbignb3BlcmF0b3IgZXhwcmVzc2lvbi1vcGVyYXRvcicsIG4ub3BlcmF0b3IpO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmJ1aWxkTm9kZShuLnJpZ2h0KTtcbiAgICAgICAgbGV0IHJpZ2h0UGFydCA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbicsIHJpZ2h0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiBiaW5hcnktZXhwcmVzc2lvbicsIFtsZWZ0UGFydCwgb3BlcmF0b3JQYXJ0LCByaWdodFBhcnRdKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRFeHByZXNzaW9uU3RhdGVtZW50KG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgRXhwcmVzc2lvblN0YXRlbWVudDtcbiAgICAgICAgbGV0IGNvZGUgPSB0aGlzLmJ1aWxkTm9kZShuLmV4cHJlc3Npb24pO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgZXhwcmVzc2lvbi1zdGF0ZW1lbnQnLCBjb2RlKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRSZXR1cm5TdGF0ZW1lbnQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBSZXR1cm5TdGF0ZW1lbnQ7XG4gICAgICAgIGxldCBhcmcgPSB0aGlzLmJ1aWxkTm9kZShuLmFyZ3VtZW50KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IHJldHVybi1zdGF0ZW1lbnQnLCBbJ3JldHVybiAnLCBhcmddKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRJZGVudGlmaWVyKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgSWRlbnRpZmllcjtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignaWRlbnRpZmllcicsIEVzcHJpbWFIZWxwZXIucGF0dGVyblRvU3RyaW5nKG4pKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRNZW1iZXJFeHByZXNzaW9uKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgTWVtYmVyRXhwcmVzc2lvbjtcbiAgICAgICAgbGV0IG9iamVjdCA9IHRoaXMuYnVpbGROb2RlKG4ub2JqZWN0KTtcbiAgICAgICAgbGV0IHByb3BlcnR5ID0gdGhpcy5idWlsZE5vZGUobi5wcm9wZXJ0eSk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gbWVtYmVyLWV4cHJlc3Npb24nLCBbb2JqZWN0LCAnLicsIHByb3BlcnR5XSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkRGVmYXVsdChub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnZGVmYXVsdDonLCBub2RlKTtcbiAgICAgICAgbGV0IGNvZGUgPSBlc2NvZGVHZW5lcmF0ZShub2RlKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZGVmYXVsdC0nICsgbm9kZS50eXBlLCBjb2RlKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG59IiwiaW1wb3J0IHsgUHJvZ3JlbUNvbXBvbmVudCwgUHJvZ3JlbVNjaGVkdWxlciwgSHRtbENvdXBsZXRGYWN0b3J5LCBQcm9ncmVtU3RhdGUsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyIH0gZnJvbSAnLi4vLi4vY29yZS9UeXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50IGltcGxlbWVudHMgUHJvZ3JlbUNvbXBvbmVudCwgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyLCBHcmlkQ2hhbmdlTGlzdGVuZXIge1xuXG4gICAgcHJpdmF0ZSBleGVjdXRpbmdFbGVtZW50czogSFRNTEVsZW1lbnRbXSA9IFtdO1xuICAgIHByaXZhdGUgZXhlY3V0ZWRFbGVtZW50czogSFRNTEVsZW1lbnRbXSA9IFtdO1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBFWEVDVVRJTkdfQ0xBU1MgPSAndmVyc2UtZXhlY3V0aW5nJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVYRUNVVEVEX0NMQVNTID0gJ3ZlcnNlLWV4ZWN1dGVkJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogUHJvZ3JlbVNjaGVkdWxlcixcbiAgICAgICAgcHJpdmF0ZSBodG1sRmFjdG9yeTogSHRtbENvdXBsZXRGYWN0b3J5PGFueT5cbiAgICApIHtcbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUNvZGVFeGVjdXRpb24odGhpcyk7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVHcmlkQ2hhbmdlKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbmRlckh0bWwoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgaHRtbENvbXBvbmVudCA9IHRoaXMuaHRtbEZhY3RvcnkuYnVpbGRDb3VwbGV0KCk7XG4gICAgICAgIHJldHVybiBodG1sQ29tcG9uZW50O1xuICAgIH1cbiAgICBcbiAgICBmaXJlQ29kZUV4ZWN1dGlvbihzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIGlmICghc3RhdGUudmVyc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIGxldCBodG1sVmVyc2UgPSB0aGlzLmh0bWxGYWN0b3J5LmdldEh0bWxWZXJzZShzdGF0ZS52ZXJzZSk7XG4gICAgICAgIGlmKGh0bWxWZXJzZSkge1xuICAgICAgICAgICAgaHRtbFZlcnNlLmNsYXNzTGlzdC5hZGQoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRJTkdfQ0xBU1MpO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0aGlzLmV4ZWN1dGluZ0VsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBlbHQgPSB0aGlzLmV4ZWN1dGluZ0VsZW1lbnRzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKGVsdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhlY3V0ZWRFbGVtZW50cy5wdXNoKGVsdCk7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5yZW1vdmUoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRJTkdfQ0xBU1MpO1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QuYWRkKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VURURfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghaHRtbFZlcnNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmV4ZWN1dGluZ0VsZW1lbnRzLnB1c2goaHRtbFZlcnNlKTtcbiAgICAgICAgaHRtbFZlcnNlLmNsYXNzTGlzdC5hZGQoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRJTkdfQ0xBU1MpO1xuICAgIH1cblxuICAgIGZpcmVHcmlkQ2hhbmdlKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuZXhlY3V0aW5nRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGVsdCA9IHRoaXMuZXhlY3V0aW5nRWxlbWVudHMucG9wKCk7XG4gICAgICAgICAgICBpZiAoZWx0KSB7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5yZW1vdmUoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRFRF9DTEFTUyk7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5yZW1vdmUoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRJTkdfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuZXhlY3V0ZWRFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgZWx0ID0gdGhpcy5leGVjdXRlZEVsZW1lbnRzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKGVsdCkge1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QucmVtb3ZlKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VURURfQ0xBU1MpO1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QucmVtb3ZlKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VUSU5HX0NMQVNTKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgU3R5bGVEZWNvcmF0b3IsIENvbG9yUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgQmFzZU5vZGUsIElkZW50aWZpZXIgfSBmcm9tIFwiZXN0cmVlXCI7XG5cbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb3JlL0NvbG9yU2VydmljZVwiO1xuaW1wb3J0IHsgRXNwcmltYUhlbHBlciB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFIZWxwZXJcIjtcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9IdG1sSGVscGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBDb2xvclZhcmlhYmxlU2NvcGVEZWNvcmF0b3IgaW1wbGVtZW50cyBTdHlsZURlY29yYXRvcjxzdHJpbmc+IHtcblxuICAgIHByaXZhdGUgdmFyaWFibGVNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBjb2xvclByb3ZpZGVyOiBDb2xvclByb3ZpZGVyID0gQ29sb3JTZXJ2aWNlLmNvbG9yUHJvdmlkZXJhY3RvcnkuYnVpbGQoKTtcblxuICAgIGRlY29yYXRlKHZhcklkOiBzdHJpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgdmFySW5kZXggPSB0aGlzLnZhcmlhYmxlTWFwLmdldCh2YXJJZCk7XG4gICAgICAgIGlmICghdmFySW5kZXgpIHtcbiAgICAgICAgICAgIHZhckluZGV4ID0gdGhpcy52YXJpYWJsZU1hcC5zaXplICsgMTtcbiAgICAgICAgICAgIHRoaXMudmFyaWFibGVNYXAuc2V0KHZhcklkLCB2YXJJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3ZhcmlhYmxlLWhpbnQnKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd2YXJpYWJsZS0nICsgdmFySW5kZXgpO1xuICAgICAgICBcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtaGludC1jb250YWluZXInLCBlbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9ICAgIFxuICAgIFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc3R5bGUgPSAnJztcbiAgICAgICAgLy9jb25zb2xlLmxvZygndmFyaWFibGUgY291bnQ6JywgdGhpcy52YXJpYWJsZU1hcC5zaXplKTtcbiAgICAgICAgdGhpcy52YXJpYWJsZU1hcC5mb3JFYWNoKChpbmRleCwgaWQpID0+IHtcbiAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMuY29sb3JQcm92aWRlci5oYXNoU3RyaW5nVG9Db2xvcihpZCwgMTYpOyAvL3RoaXMudmFyaWFibGVNYXAuc2l6ZVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYnVpbGRpbmcgY29sb3IgIycsIGlkLCAnPT4nLCBjb2xvcik7XG4gICAgICAgICAgICBzdHlsZSArPSBgXG4gICAgICAgICAgICAgICAgLnZhcmlhYmxlLXNjb3BlLWNvbXBvbmVudCAudmFyaWFibGUtaGludC1jb250YWluZXIge1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDAuOGVtIDAgMC44ZW0gMDtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC52YXJpYWJsZS1zY29wZS1jb21wb25lbnQgLnZhcmlhYmxlLWhpbnQge1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLjFlbSAwLjVlbSAwLjFlbSAwLjVlbTtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDAuOGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAudmFyaWFibGUtc2NvcGUtY29tcG9uZW50IC52YXJpYWJsZS0ke2luZGV4fSwgXG4gICAgICAgICAgICAgICAgLnZhcmlhYmxlLXNjb3BlLWNvbXBvbmVudCAudmFyaWFibGUtJHtpbmRleH0ge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBgO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBhZFZlcnNlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8QmFzZU5vZGU+IHtcblxuICAgIGRlY29yYXRlKG5vZGU6IEJhc2VOb2RlLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb2RlLXBhZGRpbmcnKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSAgICBcbiAgICBcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgLmNvZGUtcGFkZGluZyB7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMzJweDtcbiAgICAgICAgfVxuICAgICAgICBgO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgU2NoZWR1bGluZ1NlcnZpY2UgfSBmcm9tICcuL1NjaGVkdWxpbmdTZXJ2aWNlJztcbmltcG9ydCB7IFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3Byb2dyZW1JbnNwZWN0b3IvUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY3JlZW5Db25maWcgfSBmcm9tICcuL1NjcmVlblNlcnZpY2UnO1xuaW1wb3J0IHsgQmFzZU5vZGUgfSBmcm9tICdlc3RyZWUnO1xuaW1wb3J0IHsgU3R5bGVEZWNvcmF0b3JBZ2dyZWdhdGlvbiwgUHJvZ3JlbVNjaGVkdWxlciwgUHJvZ3JlbUNvZGUsIFByb2dyZW1UZW1wbywgUHJvZ3JlbUNvbmZpZyB9IGZyb20gJy4vVHlwZXMnO1xuaW1wb3J0IHsgUGFkVmVyc2VEZWNvcmF0b3IsIENvbG9yVmVyc2VWYXJpYWJsZURlY29yYXRvciB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Fc3ByaW1hUHJvZ3JlbUluc3BlY3RvclN0eWxlRGVjb3JhdG9ycyc7XG5pbXBvcnQgeyBIdG1sSGVscGVyIH0gZnJvbSAnLi9IdG1sSGVscGVyJztcbmltcG9ydCB7IEVzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkgfSBmcm9tICcuLi9jb21wb25lbnRzL3Byb2dyZW1JbnNwZWN0b3IvRXNwcmltYVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeSc7XG5pbXBvcnQgeyBDb2RlU2VydmljZSB9IGZyb20gJy4vQ29kZVNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZ3JlbUdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3Byb2dyZW1HcmlkL1Byb2dyZW1HcmlkQ29tcG9uZW50JztcbmltcG9ydCB7IFZhcmlhYmxlU2NvcGVDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3ZhcmlhYmxlU2NvcGUvVmFyaWFibGVTY29wZUNvbXBvbmVudCc7XG5pbXBvcnQgeyBFc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5IH0gZnJvbSAnLi4vY29tcG9uZW50cy92YXJpYWJsZVNjb3BlL0VzcHJpbWFWYXJpYWJsZVNjb3BlSHRtbEZhY3RvcnknO1xuaW1wb3J0IHsgQ29sb3JWYXJpYWJsZVNjb3BlRGVjb3JhdG9yIH0gZnJvbSAnLi4vY29tcG9uZW50cy92YXJpYWJsZVNjb3BlL0VzcHJpbWFWYXJpYWJsZVNjb3BlU3R5bGVEZWNvcmF0b3JzJztcbmltcG9ydCB7IFByb2dyZW1FZGl0b3JDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3Byb2dyZW1FZGl0b3IvUHJvZ3JlbUVkaXRvckNvbXBvbmVudCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb2dyZW1IZWxwZXIge1xuXG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgUHJvZ3JlbVNlcnZpY2Uge1xuXG4gICAgdmFyIHByZXZpb3VzUmVwYWludFRpbWUgPSAwO1xuICAgIHZhciBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXI7XG4gICAgdmFyIHByb2dyZW1BbmltYXRpb25TcGVlZCA9IDI7XG4gICAgdmFyIHByb2dyZW1BbmltYXRpb25JbnRlcnZhbHMgPSBbNjAwMDAsIDUwMDAsIDEwMDAsIDUwMCwgMTAwLCAxMCwgMV07XG4gICAgdmFyIHByb2dyZW1Nb2RlID0gUHJvZ3JlbVRlbXBvLkJ5TGluZTtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZERlZmF1bHRDb25maWcoKTogUHJvZ3JlbUNvbmZpZyB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvZ3JlbUNvbmZpZygnU2FucyB0aXRyZScsIDE3LCAxNywgMSk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGN1cnJlbnRTY2hlZHVsZXIoKTogUHJvZ3JlbVNjaGVkdWxlciB7XG4gICAgICAgIHJldHVybiBzY2hlZHVsZXI7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJvZ3JlbUdyaWRDb21wb25lbnQoc2NyZWVuQ29uZmlnOiBTY3JlZW5Db25maWcsIHByb2dyZW1Db25maWc6IFByb2dyZW1Db25maWcsIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBsZXQgcHJvZ3JlbUdyaWRDb21wb25lbnQgPSBuZXcgUHJvZ3JlbUdyaWRDb21wb25lbnQoc2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnLCBzY2hlZHVsZXIsIGRvY3VtZW50KTtcbiAgICAgICAgbGV0IHByb2dyZW1HcmlkSHRtbCA9IHByb2dyZW1HcmlkQ29tcG9uZW50LnJlbmRlckh0bWwoKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHByb2dyZW1HcmlkSHRtbCk7XG5cbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50KHByb2dyZW1Db2RlOiBQcm9ncmVtQ29kZTxhbnk+LCBjb250YWluZXI6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgbGV0IHByb2dyZW1Db3VwbGV0ID0gcHJvZ3JlbUNvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbigpO1xuICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3RvckRlY29yYXRvcnMgPSBuZXcgU3R5bGVEZWNvcmF0b3JBZ2dyZWdhdGlvbjxCYXNlTm9kZT4oW1xuICAgICAgICAgICAgbmV3IFBhZFZlcnNlRGVjb3JhdG9yKCksXG4gICAgICAgICAgICBuZXcgQ29sb3JWZXJzZVZhcmlhYmxlRGVjb3JhdG9yKCksXG4gICAgICAgICAgICAvL25ldyBIaWdobGlnaHRFeGVjdXRpbmdWZXJzZURlY29yYXRvcihzY2hlZHVsZXIpLFxuICAgICAgICBdKTtcbiAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JGYWN0b3J5ID0gbmV3IEVzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkocHJvZ3JlbUNvdXBsZXQsIHByb2dyZW1JbnNwZWN0b3JEZWNvcmF0b3JzKTtcbiAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JWaWV3ID0gbmV3IFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQoc2NoZWR1bGVyLCBwcm9ncmVtSW5zcGVjdG9yRmFjdG9yeSk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZygnY29kZUVsZW1lbnQnLCBjb2RlRWxlbWVudCk7XG4gICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9ySHRtbCA9IHByb2dyZW1JbnNwZWN0b3JWaWV3LnJlbmRlckh0bWwoKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHByb2dyZW1JbnNwZWN0b3JIdG1sKTtcblxuICAgICAgICBsZXQgZGVjb3JhdG9yU3R5bGUgPSBwcm9ncmVtSW5zcGVjdG9yRGVjb3JhdG9ycy5idWlsZFN0eWxlU2hlZXQoKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnZGVjb3JhdG9yU3R5bGU6JywgZGVjb3JhdG9yU3R5bGUpXG4gICAgICAgIEh0bWxIZWxwZXIuZGVmaW5lQ3NzUnVsZXMoJ3Byb2dyZW0taW5zcGVjdG9yLWNvbXBvbmVudCcsIGRlY29yYXRvclN0eWxlKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRWYXJpYWJsZVNjb3BlQ29tcG9uZW50KHByb2dyZW1Db2RlOiBQcm9ncmVtQ29kZTxhbnk+LCBjb250YWluZXI6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgbGV0IHByb2dyZW1Db3VwbGV0ID0gcHJvZ3JlbUNvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbigpO1xuICAgICAgICBsZXQgdmFyaWFibGVTY29wZURlY29yYXRvcnMgPSBuZXcgU3R5bGVEZWNvcmF0b3JBZ2dyZWdhdGlvbjxzdHJpbmc+KFtcbiAgICAgICAgICAgIG5ldyBDb2xvclZhcmlhYmxlU2NvcGVEZWNvcmF0b3IoKVxuICAgICAgICBdKVxuICAgICAgICBsZXQgaHRtbEZhY3RvcnkgPSBuZXcgRXNwcmltYVZhcmlhYmxlU2NvcGVIdG1sRmFjdG9yeShwcm9ncmVtQ291cGxldCwgdmFyaWFibGVTY29wZURlY29yYXRvcnMsIHNjaGVkdWxlcik7XG4gICAgICAgIGxldCB2YXJpYWJsZVNjb3BlQ29tcG9uZW50ID0gbmV3IFZhcmlhYmxlU2NvcGVDb21wb25lbnQoc2NoZWR1bGVyLCBodG1sRmFjdG9yeSk7XG4gICAgICAgIGxldCB2YXJpYWJsZVNjb3BlSHRtbCA9IHZhcmlhYmxlU2NvcGVDb21wb25lbnQucmVuZGVySHRtbCgpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodmFyaWFibGVTY29wZUh0bWwpO1xuXG4gICAgICAgIGxldCBkZWNvcmF0b3JTdHlsZSA9IHZhcmlhYmxlU2NvcGVEZWNvcmF0b3JzLmJ1aWxkU3R5bGVTaGVldCgpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdkZWNvcmF0b3JTdHlsZTonLCBkZWNvcmF0b3JTdHlsZSlcbiAgICAgICAgSHRtbEhlbHBlci5kZWZpbmVDc3NSdWxlcygndmFyaWFibGUtc2NvcGUtY29tcG9uZW50JywgZGVjb3JhdG9yU3R5bGUpO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFByb2dyZW1FZGl0b3JDb21wb25lbnQocHJvZ3JlbUNvZGU6IFByb2dyZW1Db2RlPGFueT4sIHNjcmVlbkNvbmZpZzogU2NyZWVuQ29uZmlnKTogdm9pZCB7XG4gICAgICAgIGxldCBwcm9ncmVtRWRpdG9yQ29tcG9uZW50ID0gbmV3IFByb2dyZW1FZGl0b3JDb21wb25lbnQoKTtcbiAgICAgICAgcHJvZ3JlbUVkaXRvckNvbXBvbmVudC5hdHRhY2goZG9jdW1lbnQpO1xuICAgICAgICBwcm9ncmVtRWRpdG9yQ29tcG9uZW50LmxvYWRQcm9ncmVtKHByb2dyZW1Db2RlKTtcbiAgICAgICAgcHJvZ3JlbUVkaXRvckNvbXBvbmVudC5iaW5kUmVmcmVzaChjb2RlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCduZXcgcHJvZ3JlbSBjb2RlOicsIGNvZGUpO1xuICAgICAgICAgICAgbGV0IHByb2dyZW1Db2RlID0gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRQcm9ncmVtKGNvZGUpO1xuXG4gICAgICAgICAgICBsZXQgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVtLXNjcmlwdC10YWcnKSBhcyBIVE1MU2NyaXB0RWxlbWVudDtcbiAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICBzY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgICAgICBzY3JpcHRFbGVtZW50LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncHJvZ3JlbS1zY3JpcHQtdGFnJylcbiAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQudGV4dCA9IGNvZGU7XG4gICAgICAgICAgICBsZXQgYm9keUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICAgICAgICBpZiAoYm9keUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBib2R5RWxlbWVudC5hcHBlbmRDaGlsZChzY3JpcHRFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ1aWxkUHJvZ3JlbVZpZXdlcihwcm9ncmVtQ29kZSwgc2NyZWVuQ29uZmlnLCBidWlsZERlZmF1bHRDb25maWcoKSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJvZ3JlbVZpZXdlcihwcm9ncmVtQ29kZTogUHJvZ3JlbUNvZGU8YW55Piwgc2NyZWVuQ29uZmlnOiBTY3JlZW5Db25maWcsIHByb2dyZW1Db25maWc6IFByb2dyZW1Db25maWcpIHtcbiAgICAgICAgLy8gTG9hZCBpbml0UHJvZ3JlbSBGdW5jdGlvbiBjb2RlXG4gICAgICAgIGxldCBpbml0UHJvZ3JlbUZ1bmN0aW9uQ29kZSA9IGVzY29kZUdlbmVyYXRlKHByb2dyZW1Db2RlLmluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCkuZnVuY3Rpb25Sb290Tm9kZSk7XG4gICAgICAgICh3aW5kb3cgYXMgYW55KS5ldmFsKGluaXRQcm9ncmVtRnVuY3Rpb25Db2RlKTtcblxuICAgICAgICBzY2hlZHVsZXIgPSBTY2hlZHVsaW5nU2VydmljZS5idWlsZFByb2dyZW1TY2hlZHVsZXIocHJvZ3JlbUNvbmZpZywgcHJvZ3JlbUNvZGUsIHByb2dyZW1Nb2RlKTtcbiAgICAgICAgY29uc3QgdGl0cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGl0cmUnKTtcbiAgICAgICAgaWYgKHRpdHJlKSB7XG4gICAgICAgICAgICB0aXRyZS5pbm5lckhUTUwgPSBwcm9ncmVtQ29uZmlnLnRpdHJlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb2dyZW1HcmlkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJy5wcm9ncmVtLWdyaWQtY29tcG9uZW50Jyk7XG4gICAgICAgIGlmIChwcm9ncmVtR3JpZENvbnRhaW5lcikge1xuICAgICAgICAgICAgYnVpbGRQcm9ncmVtR3JpZENvbXBvbmVudChzY3JlZW5Db25maWcsIHByb2dyZW1Db25maWcsIHByb2dyZW1HcmlkQ29udGFpbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJy5wcm9ncmVtLWluc3BlY3Rvci1jb21wb25lbnQnKTtcbiAgICAgICAgaWYgKHByb2dyZW1JbnNwZWN0b3JDb250YWluZXIpIHtcbiAgICAgICAgICAgIGJ1aWxkUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudChwcm9ncmVtQ29kZSwgcHJvZ3JlbUluc3BlY3RvckNvbnRhaW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFyaWFibGVTY29wZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCcudmFyaWFibGUtc2NvcGUtY29tcG9uZW50Jyk7XG4gICAgICAgIGlmICh2YXJpYWJsZVNjb3BlQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBidWlsZFZhcmlhYmxlU2NvcGVDb21wb25lbnQocHJvZ3JlbUNvZGUsIHZhcmlhYmxlU2NvcGVDb250YWluZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQ29udHJvbFBhbmVsQ29tcG9uZW50KCkge1xuICAgICAgICBsZXQgc3BlZWRDb250cm9sRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jb250cm9sLXBhbmVsLWNvbXBvbmVudCAuc3BlZWQtc2VsZWN0b3JgKWFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIHNwZWVkQ29udHJvbEVsZW1lbnQudmFsdWUgPSBTdHJpbmcocHJvZ3JlbUFuaW1hdGlvblNwZWVkKTtcbiAgICAgICAgbGV0IHNwZWVkU2VsZWN0b3JPYnNlcnZhYmxlID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQoc3BlZWRDb250cm9sRWxlbWVudCwgJ2NoYW5nZScpO1xuICAgICAgICBzcGVlZFNlbGVjdG9yT2JzZXJ2YWJsZS5zdWJzY3JpYmUoZXZlbnQgPT4gcHJvZ3JlbUFuaW1hdGlvblNwZWVkID0gTnVtYmVyKChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpKTtcblxuICAgICAgICBsZXQgbW9kZUNvbnRyb2xFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNvbnRyb2wtcGFuZWwtY29tcG9uZW50IC5tb2RlLXNlbGVjdG9yYClhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICBtb2RlQ29udHJvbEVsZW1lbnQudmFsdWUgPSBTdHJpbmcoc2NoZWR1bGVyLnRlbXBvKTtcbiAgICAgICAgbGV0IG1vZGVTZWxlY3Rvck9ic2VydmFibGUgPSBPYnNlcnZhYmxlLmZyb21FdmVudChtb2RlQ29udHJvbEVsZW1lbnQsICdjaGFuZ2UnKTtcbiAgICAgICAgbW9kZVNlbGVjdG9yT2JzZXJ2YWJsZS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAgICAgcHJvZ3JlbU1vZGUgPSBOdW1iZXIoKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XG4gICAgICAgICAgICBjdXJyZW50U2NoZWR1bGVyKCkudGVtcG8gPSBwcm9ncmVtTW9kZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJvZ3JlbSh1cmw6IHN0cmluZywgc2NyZWVuQ29uZmlnOiBTY3JlZW5Db25maWcpIHtcbiAgICAgICAgbGV0IHByb2dyZW1Db25maWcgPSBidWlsZERlZmF1bHRDb25maWcoKTtcbiAgICAgICAgbGV0IHByb2dyZW1TY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgcHJvZ3JlbVNjcmlwdC5jbGFzc0xpc3QuYWRkKCdwcm9ncmVtLXNjcmlwdC10YWcnKVxuICAgICAgICBwcm9ncmVtU2NyaXB0LnNyYyA9IHVybDtcbiAgICAgICAgbGV0IGJvZHlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICAgICBpZiAoYm9keUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGJvZHlFbGVtZW50LmFwcGVuZENoaWxkKHByb2dyZW1TY3JpcHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgQ29kZVNlcnZpY2UubG9hZFByb2dyZW0odXJsKS50aGVuKGNvZGUgPT4ge1xuICAgICAgICAgICAgbGV0IHByb2dyZW1Db2RlID0gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRQcm9ncmVtKGNvZGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBidWlsZFByb2dyZW1WaWV3ZXIocHJvZ3JlbUNvZGUsIHNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZyk7XG5cbiAgICAgICAgICAgIGJ1aWxkQ29udHJvbFBhbmVsQ29tcG9uZW50KCk7XG5cbiAgICAgICAgICAgIGJ1aWxkUHJvZ3JlbUVkaXRvckNvbXBvbmVudChwcm9ncmVtQ29kZSwgc2NyZWVuQ29uZmlnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGltZXIoMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRpbWVyKHRpbWVzdGFtcDogbnVtYmVyKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGltZXIpO1xuXG4gICAgICAgIGlmICh0aW1lc3RhbXAgLSBwcmV2aW91c1JlcGFpbnRUaW1lIDwgcHJvZ3JlbUFuaW1hdGlvbkludGVydmFsc1twcm9ncmVtQW5pbWF0aW9uU3BlZWRdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2aW91c1JlcGFpbnRUaW1lID0gdGltZXN0YW1wO1xuXG4gICAgICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgICAgICAgIHNjaGVkdWxlci5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBTdHlsZURlY29yYXRvciwgUHJvZ3JlbVNjaGVkdWxlciB9IGZyb20gXCIuLi8uLi9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNlTm9kZSwgRnVuY3Rpb25EZWNsYXJhdGlvbiwgQmxvY2tTdGF0ZW1lbnQsIElmU3RhdGVtZW50LCBWYXJpYWJsZURlY2xhcmF0b3IsIFZhcmlhYmxlRGVjbGFyYXRpb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBFeHByZXNzaW9uU3RhdGVtZW50LCBSZXR1cm5TdGF0ZW1lbnQsIElkZW50aWZpZXIsIE1lbWJlckV4cHJlc3Npb24gfSBmcm9tIFwiZXN0cmVlXCI7XG5pbXBvcnQgeyBIdG1sSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvSHRtbEhlbHBlclwiO1xuaW1wb3J0IHsgRXNwcmltYUhlbHBlciB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFIZWxwZXJcIjtcbmltcG9ydCB7IEVzcHJpbWFWZXJzZSwgRXNwcmltYUh0bWxDb3VwbGV0RmFjdG9yeSwgRXNwcmltYUNvdXBsZXQgfSBmcm9tIFwiLi4vLi4vZXNwcmltYS9Fc3ByaW1hVHlwZXNcIjtcbmltcG9ydCB7IHN0cmluZ2lmeSB9IGZyb20gXCJxdWVyeXN0cmluZ1wiO1xuXG5leHBvcnQgY2xhc3MgRXNwcmltYVZhcmlhYmxlU2NvcGVIdG1sRmFjdG9yeSBpbXBsZW1lbnRzIEVzcHJpbWFIdG1sQ291cGxldEZhY3Rvcnkge1xuXG4gICAgcHJpdmF0ZSB2YXJIaW50QnlWZXJzZXNNYXA6IE1hcDxCYXNlTm9kZSwgSFRNTEVsZW1lbnRbXT4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSB2YXJIaW50VXBkYXRlck1hcDogTWFwPEJhc2VOb2RlLCAodmFsdWU6IGFueSkgPT4gdm9pZD4gPSBuZXcgTWFwKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb3VwbGV0OiBFc3ByaW1hQ291cGxldCxcbiAgICAgICAgcHJpdmF0ZSBkZWNvcmF0b3I6IFN0eWxlRGVjb3JhdG9yPHN0cmluZz4sXG4gICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyXG4gICAgKSB7fVxuXG4gICAgYnVpbGRDb3VwbGV0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtc2NvcGUtY29tcG9uZW50JylcblxuICAgICAgICAvLyBGSVhNRSBpbCBmYXVkcmFpdCBwYXJjb3VyaXIgbCdhcmJyZSBBU1QgYXZlYyB1biB3YWxrZXIgb3UgdW4gdHJ1YyBkdSBnZW5yZS5cbiAgICAgICAgLy8gRklYTUUgZ3JvcyBoYWNrIGR1IHN5c3TDqG1lIGRlIEh0bWxGYWN0b3J5IGV0IGRlIERlY29yYXRvciBwb3VyIHJlYWxpc2VyIGNlIGNvbXBvc2FudC5cbiAgICAgICAgLy8gQnVpbGQgYWxsIFZhcmlhYmxlSGludCB3aGljaCB3aWxsIGJlIGFkZGVkIGluIHZpZXcgY29udGFpbmVyIG9uZSBieSBvbmUgYnkgZ2V0SHRtbFZlcnNlKClcbiAgICAgICAgdGhpcy5jb3VwbGV0LnZlcnNlcy5mb3JFYWNoKHYgPT4ge1xuICAgICAgICAgICAgbGV0IHZhckhpbnRzID0gdGhpcy5idWlsZFZhcmlhYmxlSGludHModi5ub2RlKTtcbiAgICAgICAgICAgIGxldCBkZWNvcmF0ZWRWYXJIaW50czogSFRNTEVsZW1lbnRbXSA9IFtdO1xuICAgICAgICAgICAgdmFySGludHMuZm9yRWFjaCgodmFySGludCwgdmFyTmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBkZWNvcmF0ZWQgPSB0aGlzLmRlY29yYXRvci5kZWNvcmF0ZSh2YXJOYW1lLCB2YXJIaW50KTtcbiAgICAgICAgICAgICAgICBkZWNvcmF0ZWRWYXJIaW50cy5wdXNoKGRlY29yYXRlZCk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRlY29yYXRlZCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy52YXJIaW50QnlWZXJzZXNNYXAuc2V0KHYubm9kZSwgZGVjb3JhdGVkVmFySGludHMpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNsZWFyVmlldygpO1xuXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfSAgICBcbiAgICBcbiAgICBnZXRIdG1sVmVyc2UodmVyc2U6IEVzcHJpbWFWZXJzZSk6IEhUTUxFbGVtZW50fHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICh0aGlzLnZhckhpbnRCeVZlcnNlc01hcC5zaXplID09PSAwIHx8ICF2ZXJzZS5ub2RlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHRtbEVsZW1lbnRzID0gdGhpcy52YXJIaW50QnlWZXJzZXNNYXAuZ2V0KHZlcnNlLm5vZGUpO1xuICAgICAgICBpZiAoIWh0bWxFbGVtZW50cyB8fCBodG1sRWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLnNjaGVkdWxlci5jdXJyZW50KCk7XG4gICAgICAgIGxldCB2YWx1ZXNNYXAgPSBFc3ByaW1hSGVscGVyLmdldFZhcmlhYmxlVmFsdWVzKHN0YXRlLCB2ZXJzZS5ub2RlKTtcbiAgICAgICAgbGV0IHZhckhpbnRVcGRhdGVyID0gdGhpcy52YXJIaW50VXBkYXRlck1hcC5nZXQodmVyc2Uubm9kZSk7XG4gICAgICAgIGlmICh2YXJIaW50VXBkYXRlcikge1xuICAgICAgICAgICAgdmFySGludFVwZGF0ZXIodmFsdWVzTWFwKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gU2hvdyBlbGVtZW50c1xuICAgICAgICBodG1sRWxlbWVudHMuZm9yRWFjaChoaW50ID0+IGhpbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJykpO1xuXG4gICAgICAgIC8vbGV0IHZlcnNlQ29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCd2ZXJzZS1jb250YWluZXInLCBodG1sRWxlbWVudHMpO1xuICAgICAgICAvL3JldHVybiB2ZXJzZUNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJWaWV3KCk6IHZvaWQge1xuICAgICAgICAvLyBIaWRlIGVsZW1lbnRzXG4gICAgICAgIHRoaXMudmFySGludEJ5VmVyc2VzTWFwLmZvckVhY2goaGludHMgPT4gaGludHMuZm9yRWFjaChoaW50ID0+IGhpbnQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJykpKTtcbiAgICAgICAgLy8gUmVzZXQgdmFsdWVcbiAgICAgICAgdGhpcy52YXJIaW50VXBkYXRlck1hcC5mb3JFYWNoKCh2YXJIaW50VXBkYXRlciwga2V5KSA9PiB7XG4gICAgICAgICAgICB2YXJIaW50VXBkYXRlcihuZXcgTWFwKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZCBhIFZhcmlhYmxlIEhpbnQgaWYgdGhlIHN1cHBsaWVkIG5vZGUgY29udGFpbnMgYSBWYXJpYWJsZSBhZmZlY3RhdGlvbi5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEByZXR1cm5zIGFuIEhUTUxFbGVtZW50IG9yIG51bGwgaWYgbm8gaGludCBzaG91bGQgYXBwZWFyIGZvciB0aGlzIG5vZGVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYnVpbGRWYXJpYWJsZUhpbnRzKG5vZGU6IEJhc2VOb2RlKTogTWFwPHN0cmluZywgSFRNTEVsZW1lbnQ+IHtcbiAgICAgICAgbGV0IHZhck5vZGUgPSBFc3ByaW1hSGVscGVyLnJlZHVjZU5vZGVUb1ZhckRlY2xhcmF0aW9uKG5vZGUpO1xuICAgICAgICBpZiAoIXZhck5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTWFwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFyTmFtZXMgPSBFc3ByaW1hSGVscGVyLmdldFZhcmlhYmxlTmFtZXModmFyTm9kZSk7XG4gICAgICAgIGxldCB2YXJIaW50cyA9IHZhck5hbWVzLm1hcCh2YXJOYW1lID0+IHtcbiAgICAgICAgICAgIGxldCB2YXJWYWx1ZSA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtaGludC12YWx1ZScpO1xuICAgICAgICAgICAgbGV0IHZhckhpbnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLWhpbnQnLCBbYCR7dmFyTmFtZX06IGAsIHZhclZhbHVlXSk7XG4gICAgICAgICAgICByZXR1cm4ge3Zhck5hbWUsIHZhckhpbnQsIHZhclZhbHVlfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHZhbFVwZGF0ZXIgPSAodmFsc0J5VmFyTmFtZTogTWFwPHN0cmluZywgYW55PikgPT4ge1xuICAgICAgICAgICAgdmFySGludHMuZm9yRWFjaCh2YXJIaW50ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gdmFsc0J5VmFyTmFtZS5nZXQodmFySGludC52YXJOYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFySGludC52YXJWYWx1ZS5pbm5lclRleHQgPSB2YWwudG9GaXhlZCgyKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhckhpbnQudmFyVmFsdWUuaW5uZXJUZXh0ID0gdmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnZhckhpbnRVcGRhdGVyTWFwLnNldChub2RlLCB2YWxVcGRhdGVyKTtcblxuICAgICAgICBsZXQgdmFySGludHNCeU5hbWUgPSBuZXcgTWFwPHN0cmluZywgSFRNTEVsZW1lbnQ+KCk7XG4gICAgICAgIHZhckhpbnRzLmZvckVhY2godmFySGludCA9PiB2YXJIaW50c0J5TmFtZS5zZXQodmFySGludC52YXJOYW1lLCB2YXJIaW50LnZhckhpbnQpKTtcblxuICAgICAgICByZXR1cm4gdmFySGludHNCeU5hbWU7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgRXZhbFNjb3BlIH0gZnJvbSBcIi4vRXZhbFNlcnZpY2VcIjtcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1Db25maWcge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgdGl0cmU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIG5vbWJyZUNvbG9ubmVzOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBub21icmVMaWduZXM6IG51bWJlcixcbiAgICAgICAgcHVibGljIG5vbWJyZUZyYW1lczogbnVtYmVyLFxuICAgICkgeyB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbVZlcnNlPEFzdEJhc2VUeXBlPiB7XG4gICAgbm9kZTogQXN0QmFzZVR5cGVcbiAgICBjb2RlOiBBc3RCYXNlVHlwZVxufVxuLypcbmV4cG9ydCBpbnRlcmZhY2UgVmVyc2VJbnN0cnVjdGlvbkZhY3Rvcnk8QXN0QmFzZVR5cGU+IHtcbiAgICBidWlsZChwYXJhbTogQXN0QmFzZVR5cGUpOiBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+O1xufVxuKi9cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbUNvdXBsZXQ8QXN0QmFzZVR5cGU+IHtcbiAgICBmdW5jdGlvblJvb3ROb2RlOiBBc3RCYXNlVHlwZVxuICAgIHZlcnNlczogUHJvZ3JlbVZlcnNlPEFzdEJhc2VUeXBlPltdXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbUZhY3Rvcnk8QXN0QmFzZVR5cGU+IHtcbiAgICBidWlsZFByb2dyZW0oY29kZTogc3RyaW5nKTogUHJvZ3JlbUNvZGU8QXN0QmFzZVR5cGU+XG4gICAgYnVpbGRDb3VwbGV0KG5vZGU6IEFzdEJhc2VUeXBlLCB2ZXJzZXM6IEFzdEJhc2VUeXBlW10pOiBQcm9ncmVtQ291cGxldDxBc3RCYXNlVHlwZT5cbiAgICBidWlsZFZlcnNlKG5vZGU6IEFzdEJhc2VUeXBlKTogUHJvZ3JlbVZlcnNlPEFzdEJhc2VUeXBlPlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZlcnNlSXRlcmF0b3I8QXN0QmFzZVR5cGU+IHtcbiAgICBleGVjdXRlTmV4dCgpOiBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+XG4gICAgaGFzTmV4dCgpOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1Db2RlPEFzdEJhc2VUeXBlPiB7XG4gICAgaW5pdGlhbGlzZXJQcm9ncmVtRnVuY3Rpb24oKTogUHJvZ3JlbUNvdXBsZXQ8QXN0QmFzZVR5cGU+XG4gICAgY29sb3JlclByb2dyZW1GdW5jdGlvbigpOiBQcm9ncmVtQ291cGxldDxBc3RCYXNlVHlwZT5cbiAgICBpdGVyYXRvcihzdGF0ZTogUHJvZ3JlbVN0YXRlKTogVmVyc2VJdGVyYXRvcjxBc3RCYXNlVHlwZT5cbn1cblxuZXhwb3J0IGNsYXNzIFByb2dyZW1TdGF0ZSB7XG5cbiAgICBwdWJsaWMgcmVhZG9ubHkgZXZhbFNjb3BlID0gbmV3IEV2YWxTY29wZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY29sb25uZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbGlnbmU6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGZyYW1lOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjb250ZXh0ZTogb2JqZWN0LFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdmVyc2U6IFByb2dyZW1WZXJzZTxhbnk+IHwgbnVsbCxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZXZhbChleHByOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmFsU2NvcGUuZ2xvYmFsRXZhbChleHByKTtcbiAgICB9XG59XG5cbnR5cGUgTmV3U3RhdGVDYWxsYmFjayA9IChzdGF0ZTogUHJvZ3JlbVN0YXRlKSA9PiB2b2lkO1xuZXhwb3J0IGludGVyZmFjZSBTdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lciB7ZmlyZVN0YXJ0SXRlcmF0aW5nQ29kZTogTmV3U3RhdGVDYWxsYmFja307XG5leHBvcnQgaW50ZXJmYWNlIENvZGVFeGVjdXRpb25MaXN0ZW5lciB7ZmlyZUNvZGVFeGVjdXRpb246IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBHcmlkQ2hhbmdlTGlzdGVuZXIge2ZpcmVHcmlkQ2hhbmdlOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgTGluZUNoYW5nZUxpc3RlbmVyIHtmaXJlTGluZUNoYW5nZTogTmV3U3RhdGVDYWxsYmFja307XG5leHBvcnQgaW50ZXJmYWNlIEZyYW1lQ2hhbmdlTGlzdGVuZXIge2ZpcmVGcmFtZUNoYW5nZTogTmV3U3RhdGVDYWxsYmFja307XG5leHBvcnQgaW50ZXJmYWNlIFBhaW50aW5nTGlzdGVuZXIge2ZpcmVQYWludGluZzogKCkgPT4gdm9pZH07XG5cbmV4cG9ydCBlbnVtIFByb2dyZW1UZW1wbyB7XG4gICAgQnlWZXJzZSA9IDAsXG4gICAgQnlQaXhlbCxcbiAgICBCeUxpbmUsXG4gICAgQnlGcmFtZVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1TY2hlZHVsZXIge1xuICAgIHN1YnNjcmliZVN0YXJ0SXRlcmF0aW5nQ29kZShsaXN0ZW5lcjogU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlQ29kZUV4ZWN1dGlvbihsaXN0ZW5lcjogQ29kZUV4ZWN1dGlvbkxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUdyaWRDaGFuZ2UobGlzdGVuZXI6IEdyaWRDaGFuZ2VMaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVMaW5lQ2hhbmdlKGxpc3RlbmVyOiBMaW5lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlRnJhbWVDaGFuZ2UobGlzdGVuZXI6IEZyYW1lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlUGFpbnRpbmcobGlzdGVuZXI6IFBhaW50aW5nTGlzdGVuZXIpOiB2b2lkXG5cbiAgICByZXNldCgpOiBQcm9ncmVtU3RhdGVcbiAgICBjdXJyZW50KCk6IFByb2dyZW1TdGF0ZVxuICAgIG5leHQoKTogUHJvZ3JlbVN0YXRlW11cbiAgICBnZXRQcm9ncmVtKCk6IFByb2dyZW1Db2RlPGFueT5cbiAgICB0ZW1wbzogUHJvZ3JlbVRlbXBvXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbUNvbXBvbmVudCB7XG4gICAgcmVuZGVySHRtbCgpOiBIVE1MRWxlbWVudFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0eWxlRGVjb3JhdG9yPFQ+IHtcbiAgICBkZWNvcmF0ZShub2RlOiBULCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50XG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEh0bWxDb3VwbGV0RmFjdG9yeTxBc3RCYXNlVHlwZT4ge1xuICAgIGJ1aWxkQ291cGxldCgpOiBIVE1MRWxlbWVudFxuICAgIGdldEh0bWxWZXJzZSh2ZXJzZTogUHJvZ3JlbVZlcnNlPEFzdEJhc2VUeXBlPik6IEhUTUxFbGVtZW50fHVuZGVmaW5lZFxufVxuXG5leHBvcnQgY2xhc3MgU3R5bGVEZWNvcmF0b3JBZ2dyZWdhdGlvbjxUPiBpbXBsZW1lbnRzIFN0eWxlRGVjb3JhdG9yPFQ+IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjb3JhdG9yczogU3R5bGVEZWNvcmF0b3I8VD5bXSkge31cblxuICAgIGRlY29yYXRlKG5vZGU6IFQsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgdGVtcDogSFRNTEVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmRlY29yYXRvcnMuZm9yRWFjaChkID0+IHRlbXAgPSBkLmRlY29yYXRlKG5vZGUsIHRlbXApKTtcbiAgICAgICAgcmV0dXJuIHRlbXA7XG4gICAgfVxuXG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29yYXRvcnMubWFwKGQgPT4gZC5idWlsZFN0eWxlU2hlZXQoKSkuam9pbignXFxuJyk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29sb3JQcm92aWRlciB7XG4gICAgaHNsQ29sb3IoaHVlOiBudW1iZXIpOiBzdHJpbmc7XG4gICAgaGFzaFN0cmluZ1RvQ29sb3Ioa2V5OiBzdHJpbmcsIGNvbG9yQ291bnQ6IG51bWJlciwgc2hpZnQ/OiBudW1iZXIpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29sb3JQcm92aWRlckZhY3Rvcnkge1xuICAgIGJ1aWxkKGtleT86IHN0cmluZyk6IENvbG9yUHJvdmlkZXI7XG59IiwiaW1wb3J0IHsgUHJvZ3JlbUZhY3RvcnkgfSBmcm9tIFwiLi9UeXBlc1wiO1xuaW1wb3J0IHsgQmFzaWNFc3ByaW1hUHJvZ3JlbUZhY3RvcnkgfSBmcm9tIFwiLi4vZXNwcmltYS9CYXNpY0VzcHJpbWFQcm9ncmVtXCI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29kZVNlcnZpY2Uge1xuXG4gICAgZXhwb3J0IGNvbnN0IHByb2dyZW1GYWN0b3J5OiBQcm9ncmVtRmFjdG9yeTxhbnk+ID0gbmV3IEJhc2ljRXNwcmltYVByb2dyZW1GYWN0b3J5KCk7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gbG9hZFByb2dyZW0oZmlsZVVybDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsaWVudCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgY2xpZW50Lm9wZW4oJ0dFVCcsIGZpbGVVcmwpO1xuICAgICAgICAgICAgY2xpZW50Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29kZSA9IGNsaWVudC5yZXNwb25zZVRleHQ7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29kZVNlcnZpY2U6IFByb2dyZW0gbG9hZGVkIHN1Y2Nlc3NmdWxseS4nLCBjb2RlKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGNvZGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNsaWVudC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KGNsaWVudC5zdGF0dXNUZXh0KTtcbiAgICAgICAgICAgIGNsaWVudC5zZW5kKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSIsIlxuZXhwb3J0IGNsYXNzIFNjcmVlbkNvbmZpZyB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBib3hTaXplOiBudW1iZXJcbiAgICApIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBTY3JlZW5TZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBnZXRTY3JlZW5GcmFtZSgpOiBhbnkge1xuXG4gICAgfVxuXG59IiwiaW1wb3J0IHsgUGF0dGVybiwgSWRlbnRpZmllciwgQmFzZU5vZGUsIFZhcmlhYmxlRGVjbGFyYXRpb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBOb2RlIH0gZnJvbSBcImVzdHJlZVwiO1xuaW1wb3J0IHsgUHJvZ3JlbVN0YXRlIH0gZnJvbSBcIi4uL2NvcmUvVHlwZXNcIjtcblxuZXhwb3J0IHR5cGUgTm9kZVdpdGhQYXJlbnQgPSBOb2RlICYgeyBwYXJlbnQ/OiBOb2RlIH07XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFc3ByaW1hSGVscGVyIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgcGF0dGVyblRvU3RyaW5nKHBhdHRlcm46IFBhdHRlcm4pOiBzdHJpbmcge1xuICAgICAgICB2YXIgbm9kZTtcbiAgICAgICAgc3dpdGNoIChwYXR0ZXJuLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0lkZW50aWZpZXInOlxuICAgICAgICAgICAgICAgIG5vZGUgPSBwYXR0ZXJuIGFzIElkZW50aWZpZXI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUubmFtZTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGNvbnZlcnQgcGF0dGVybiBvZiB0eXBlICcgKyBwYXR0ZXJuLnR5cGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24obm9kZTogQmFzZU5vZGUpOiBWYXJpYWJsZURlY2xhcmF0aW9uIHwgQXNzaWdubWVudEV4cHJlc3Npb24gfCBGdW5jdGlvbkRlY2xhcmF0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgbGV0IGRlY2wgPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gZGVjbDtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgIGxldCBleHByID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgICAgIHJldHVybiBleHByO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBmdW5jO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHAgPT09ICdsZWZ0JyB8fCBwID09PSAncmlnaHQnIHx8IHAgPT09ICdhcmd1bWVudCcgfHwgcCA9PT0gJ2NhbGxlZScgfHwgcCA9PT0gJ2JvZHknIHx8IHAgPT09ICdleHByZXNzaW9uJykge1xuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkOiBCYXNlTm9kZSA9IG5vZGVbcF0gYXMgQmFzZU5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBFc3ByaW1hSGVscGVyLnJlZHVjZU5vZGVUb1ZhckRlY2xhcmF0aW9uKGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdmFyaWFibGUgbmFtZXMgb2YgZGVjbGFyYXRpb24gb3IgYXNzaWdubWVudCBjb250YWluZWQgaW4gbm9kZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbm9kZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFZhcmlhYmxlTmFtZXMobm9kZTogVmFyaWFibGVEZWNsYXJhdGlvbiB8IEFzc2lnbm1lbnRFeHByZXNzaW9uIHwgRnVuY3Rpb25EZWNsYXJhdGlvbik6IHN0cmluZ1tdIHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICBsZXQgZGVjbCA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBkZWNsLmRlY2xhcmF0aW9ucy5tYXAoZCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBFc3ByaW1hSGVscGVyLnBhdHRlcm5Ub1N0cmluZyhkLmlkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJykge1xuICAgICAgICAgICAgbGV0IGRlY2wgPSBub2RlIGFzIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBFc3ByaW1hSGVscGVyLnBhdHRlcm5Ub1N0cmluZyhkZWNsLmxlZnQpO1xuICAgICAgICAgICAgcmV0dXJuIFt2YXJOYW1lXTtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdGdW5jdGlvbkRlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgbGV0IGZ1bmMgPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gZnVuYy5wYXJhbXMubWFwKHAgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YXJOYW1lID0gRXNwcmltYUhlbHBlci5wYXR0ZXJuVG9TdHJpbmcocCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhck5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHZhcmlhYmxlIHZhbHVlcyBvZiBkZWNsYXJhdGlvbiBvciBhc3NpZ25tZW50IGNvbnRhaW5lZCBpbiBub2RlLlxuICAgICAqIFNhbWUgYXMgZ2V0VmFyaWFibGVOYW1lcyBidXQgZXZhbHVhdGUgdmFyaWFibGVzIHRvIGRpc2NvdmVyIHRoZWlyIHZhbHVlcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbm9kZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFZhcmlhYmxlVmFsdWVzKHN0YXRlOiBQcm9ncmVtU3RhdGUsIG5vZGU6IEJhc2VOb2RlKTogTWFwPHN0cmluZywgYW55PiB7XG4gICAgICAgIGxldCB2YWx1ZXNNYXAgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICBsZXQgdmFyTm9kZXMgPSB0aGlzLnJlZHVjZU5vZGVUb1ZhckRlY2xhcmF0aW9uKG5vZGUpO1xuICAgICAgICBpZiAoIXZhck5vZGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzTWFwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0VmFyaWFibGVOYW1lcyh2YXJOb2RlcykubWFwKHZhck5hbWUgPT4gdmFsdWVzTWFwLnNldCh2YXJOYW1lLCBzdGF0ZS5ldmFsKHZhck5hbWUpKSk7XG4gICAgICAgIHJldHVybiB2YWx1ZXNNYXA7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpc0NoaWxkTm9kZU9mKG5vZGU6IE5vZGVXaXRoUGFyZW50LCBwYXJlbnQ6IEJhc2VOb2RlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChub2RlLnBhcmVudCA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICghbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBFc3ByaW1hSGVscGVyLmlzQ2hpbGROb2RlT2Yobm9kZS5wYXJlbnQgYXMgTm9kZVdpdGhQYXJlbnQsIHBhcmVudCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpc05vdENoaWxkTm9kZU9mKG5vZGU6IE5vZGVXaXRoUGFyZW50LCBwYXJlbnRzOiBCYXNlTm9kZVtdKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChwYXJlbnRzLmZpbmQocCA9PiBwID09PSBub2RlLnBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICghbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEVzcHJpbWFIZWxwZXIuaXNOb3RDaGlsZE5vZGVPZihub2RlLnBhcmVudCBhcyBOb2RlV2l0aFBhcmVudCwgcGFyZW50cyk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgQ29sb3JQcm92aWRlciwgQ29sb3JQcm92aWRlckZhY3RvcnkgfSBmcm9tIFwiLi9UeXBlc1wiO1xuaW1wb3J0IHsgY3JlYXRlIGFzIG1kNUNyZWF0ZSB9IGZyb20gJ2pzLW1kNSc7XG5cbmV4cG9ydCBjbGFzcyBCYXNpY0NvbG9yUHJvdmlkZXJGYWN0b3J5IGltcGxlbWVudHMgQ29sb3JQcm92aWRlckZhY3Rvcnkge1xuICAgIGJ1aWxkKGtleT86IHN0cmluZyk6IENvbG9yUHJvdmlkZXIge1xuICAgICAgICByZXR1cm4gbmV3IEJhc2ljQ29sb3JQcm92aWRlcigpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljQ29sb3JQcm92aWRlciBpbXBsZW1lbnRzIENvbG9yUHJvdmlkZXIge1xuXG4gICAgcHJpdmF0ZSBjb2xvck1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKTtcblxuICAgIHB1YmxpYyBoc2xDb2xvcihodWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnaHNsKCcgKyBodWUgKyAnLCAxMDAlLCA4MCUpJztcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFzaFN0cmluZ1RvQ29sb3Ioa2V5OiBzdHJpbmcsIGNvbG9yQ291bnQ6IG51bWJlciwgc2hpZnQ6IG51bWJlciA9IDIpIHtcbiAgICAgICAgdmFyIGh1ZSA9IHRoaXMuY29sb3JNYXAuZ2V0KGtleSk7XG4gICAgICAgIGlmIChodWUpIHJldHVybiB0aGlzLmhzbENvbG9yKGh1ZSk7XG5cbiAgICAgICAgdmFyIGhhc2ggPSBtZDVDcmVhdGUoKS51cGRhdGUoa2V5KS50b1N0cmluZygpO1xuICAgICAgICBcbiAgICAgICAgaHVlID0gKCBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDAsIHNoaWZ0ICsgMSksIDE2KSArIDE2ICogcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAxLCBzaGlmdCArIDIpLCAxNikgKyAyNTYgKiBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDIsIHNoaWZ0ICsgMyksIDE2KSApO1xuICAgICAgICBodWUgPSBNYXRoLmZsb29yKGh1ZSAlIGNvbG9yQ291bnQpICogMzYwIC8gY29sb3JDb3VudDtcbiAgICAgICAgaHVlID0gaHVlICUgMzYwO1xuXG4gICAgICAgIC8vIENvbG9yIGRlZHVwbGljYXRpb25cbiAgICAgICAgd2hpbGUgKCF0aGlzLmNvbG9yTWFwLmdldChrZXkpKSB7XG4gICAgICAgICAgICBsZXQgZHVwbGljYXRlQ29sb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGMgb2YgdGhpcy5jb2xvck1hcC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhjIC0gaHVlKSA8IE1hdGguZmxvb3IoMTgwIC8gY29sb3JDb3VudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZHVwbGljYXRlQ29sb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBodWUgKz0gTWF0aC5mbG9vcigyNzAgLyBjb2xvckNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgaHVlID0gaHVlICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWR1cGxpY2F0ZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvck1hcC5zZXQoa2V5LCBodWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL3ZhciBwYXN0ZWwgPSAnaHNsKCcgKyBodWUgKyAnLCAxMDAlLCA4Ny41JSknO1xuICAgICAgICByZXR1cm4gdGhpcy5oc2xDb2xvcihodWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBDb2xvclNlcnZpY2Uge1xuXG4gICAgZXhwb3J0IGNvbnN0IGNvbG9yUHJvdmlkZXJhY3Rvcnk6IENvbG9yUHJvdmlkZXJGYWN0b3J5ID0gbmV3IEJhc2ljQ29sb3JQcm92aWRlckZhY3RvcnkoKTtcblxufVxuIiwiaW1wb3J0IHsgUHJvZ3JlbUNvbXBvbmVudCwgUHJvZ3JlbVNjaGVkdWxlciwgU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciwgUHJvZ3JlbVN0YXRlLCBQcm9ncmVtQ29uZmlnLCBGcmFtZUNoYW5nZUxpc3RlbmVyLCBQYWludGluZ0xpc3RlbmVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gXCIuLi8uLi9jb3JlL1NjcmVlblNlcnZpY2VcIjtcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9IdG1sSGVscGVyXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyIH0gZnJvbSBcInJ4anNcIjtcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1HcmlkQ29tcG9uZW50IGltcGxlbWVudHMgUHJvZ3JlbUNvbXBvbmVudCwgU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciwgRnJhbWVDaGFuZ2VMaXN0ZW5lciwgUGFpbnRpbmdMaXN0ZW5lciB7XG4gICAgXG4gICAgcHJpdmF0ZSBkaXNwbGF5ZWRDYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgZGlzcGxheWVkQ3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHJpdmF0ZSBoaWRkZW5DYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgaGlkZGVuQ3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgYmxpbmtJbnRlcnZhbCA9IDIwMDtcbiAgICBcbiAgICBwcml2YXRlIGNhY2hpbmdDb2xvcnM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHByaXZhdGUgcHJldmlvdXNGcmFtZTogc3RyaW5nW10gPSBbXTtcbiAgICBwcml2YXRlIGN1cnJlbnRGcmFtZTogc3RyaW5nW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNjcmVlbkNvbmZpZzogU2NyZWVuQ29uZmlnLCBcbiAgICAgICAgcHJpdmF0ZSBwcm9ncmVtQ29uZmlnOiBQcm9ncmVtQ29uZmlnLFxuICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogUHJvZ3JlbVNjaGVkdWxlcixcbiAgICAgICAgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnRcbiAgICAgICAgKSB7XG4gICAgICAgIGxldCBlbldhcm5pbmcgPSBIdG1sSGVscGVyLnAoJ3dhcm5pbmcnLCBcIllvdXIgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgY2FudmFzLlwiKTtcbiAgICAgICAgbGV0IGZyV2FybmluZyA9IEh0bWxIZWxwZXIucCgnd2FybmluZycsIFwiVm90cmUgbmF2aWdhdGV1ciBuZSBzdXBwb3J0ZSBwYXMgbGVzIGNhbnZhcy5cIik7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkQ2FudmFzID0gSHRtbEhlbHBlci5jYW52YXMoJycsIFtlbldhcm5pbmcsIGZyV2FybmluZ10pO1xuICAgICAgICB0aGlzLmRpc3BsYXllZENhbnZhcy53aWR0aCA9IHRoaXMucHJvZ3JlbUNvbmZpZy5ub21icmVDb2xvbm5lcyAqIHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkQ2FudmFzLmhlaWdodCA9IHRoaXMucHJvZ3JlbUNvbmZpZy5ub21icmVMaWduZXMgKiB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplO1xuICAgICAgICBsZXQgY3R4ID0gdGhpcy5kaXNwbGF5ZWRDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICB0aGlzLmhpZGRlbkNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLmhpZGRlbkNhbnZhcy53aWR0aCA9IHRoaXMucHJvZ3JlbUNvbmZpZy5ub21icmVDb2xvbm5lcyAqIHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG4gICAgICAgIHRoaXMuaGlkZGVuQ2FudmFzLmhlaWdodCA9IHRoaXMucHJvZ3JlbUNvbmZpZy5ub21icmVMaWduZXMgKiB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplO1xuICAgICAgICBsZXQgaGlkZGVuQ3R4ID0gdGhpcy5oaWRkZW5DYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghY3R4IHx8ICFoaWRkZW5DdHgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIG9idGFpbiAyRCBDYW52YXMgY29udGV4dCAhJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRDdHggPSBjdHg7XG4gICAgICAgIHRoaXMuaGlkZGVuQ3R4ID0gaGlkZGVuQ3R4O1xuXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgXG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVTdGFydEl0ZXJhdGluZ0NvZGUodGhpcyk7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVHcmlkQ2hhbmdlKHRoaXMpO1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlRnJhbWVDaGFuZ2UodGhpcyk7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVQYWludGluZyh0aGlzKTtcbiAgICB9XG5cbiAgICByZW5kZXJIdG1sKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbigncHJvZ3JlbS1ncmlkJywgdGhpcy5kaXNwbGF5ZWRDYW52YXMpO1xuXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNvbG9yQ3VycmVudFBpeGVsKHN0YXRlOiBQcm9ncmVtU3RhdGUsIGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgbGV0IGJveFNpemUgPSB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplO1xuICAgICAgICBsZXQgYyA9IHN0YXRlLmNvbG9ubmU7XG4gICAgICAgIGxldCBsID0gc3RhdGUubGlnbmU7XG4gICAgICAgIFxuICAgICAgICAvLyBQYWludCBwaXhlbCBpZiBpdCBjaGFuZ2VkXG4gICAgICAgIHRoaXMuaGlkZGVuQ3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICB0aGlzLmhpZGRlbkN0eC5maWxsUmVjdChjICogYm94U2l6ZSwgbCAqIGJveFNpemUsIGJveFNpemUsIGJveFNpemUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBibGlua0N1cnJlbnRQaXhlbChzdGF0ZTogUHJvZ3JlbVN0YXRlLCBpbmNyZW1udDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBjb2xvciA9ICdibGFjayc7XG4gICAgICAgIGlmIChpbmNyZW1udCAlIDIgPT09IDApIHtcbiAgICAgICAgICAgIGNvbG9yID0gJ2FudGlxdWV3aGl0ZSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb2xvckN1cnJlbnRQaXhlbChzdGF0ZSwgY29sb3IpO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgZmlyZVN0YXJ0SXRlcmF0aW5nQ29kZSAoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBPYnNlcnZhYmxlLmludGVydmFsKHRoaXMuYmxpbmtJbnRlcnZhbCwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIpLnN1YnNjcmliZSh0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuYmxpbmtDdXJyZW50UGl4ZWwoc3RhdGUsIHQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmaXJlR3JpZENoYW5nZSAoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYm94U2l6ZSA9IHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG4gICAgICAgIGxldCBjID0gc3RhdGUuY29sb25uZTtcbiAgICAgICAgbGV0IGwgPSBzdGF0ZS5saWduZTtcbiAgICAgICAgbGV0IGYgPSBzdGF0ZS5mcmFtZTtcbiAgICAgICAgXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgbGV0IGNvdWxldXIgPSBjb2xvcmVyUHJvZ3JlbShjLCBsLCBmLCBzdGF0ZS5jb250ZXh0ZSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coYCgke2N9LCAke2x9LCAke2Z9LCAke3N0YXRlLmNvbnRleHRlfSA9PiAke2NvdWxldXJ9YCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FjaGluZ0NvbG9ycykge1xuICAgICAgICAgICAgbGV0IGZsYXRGcmFtZUNvb3JkaW5hdGUgPSBsICogdGhpcy5wcm9ncmVtQ29uZmlnLm5vbWJyZUNvbG9ubmVzICsgYztcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEZyYW1lW2ZsYXRGcmFtZUNvb3JkaW5hdGVdID0gY291bGV1cjtcbiAgICBcbiAgICAgICAgICAgIGlmIChjb3VsZXVyICYmIHRoaXMucHJldmlvdXNGcmFtZVtmbGF0RnJhbWVDb29yZGluYXRlXSAhPT0gY291bGV1cikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JDdXJyZW50UGl4ZWwoc3RhdGUsIGNvdWxldXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGNvdWxldXIpIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3JDdXJyZW50UGl4ZWwoc3RhdGUsIGNvdWxldXIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIGZpcmVGcmFtZUNoYW5nZSAoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICAvL3RoaXMuY2xlYXIoKTtcbiAgICAgICAgaWYgKHRoaXMuY2FjaGluZ0NvbG9ycykge1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c0ZyYW1lID0gdGhpcy5jdXJyZW50RnJhbWU7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRGcmFtZSA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmlyZVBhaW50aW5nKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc3BsYXllZEN0eC5kcmF3SW1hZ2UodGhpcy5oaWRkZW5DYW52YXMsIDAsIDApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZSAqIHRoaXMucHJvZ3JlbUNvbmZpZy5ub21icmVDb2xvbm5lcztcbiAgICAgICAgbGV0IGhlaWdodCA9IHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemUgKiB0aGlzLnByb2dyZW1Db25maWcubm9tYnJlTGlnbmVzO1xuICAgICAgICB0aGlzLmhpZGRlbkN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMuaGlkZGVuQ3R4LmZpbGxTdHlsZSA9ICdhbnRpcXVld2hpdGUnO1xuICAgICAgICB0aGlzLmhpZGRlbkN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbn0iXSwic291cmNlUm9vdCI6IiJ9