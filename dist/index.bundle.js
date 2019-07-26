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
            let n = node;
            varId = n.name;
        }
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
        let enWarning = HtmlHelper_1.HtmlHelper.p('warning', "Your browser doesn't support canvas.");
        let frWarning = HtmlHelper_1.HtmlHelper.p('warning', "Votre navigateur ne supporte pas les canvas.");
        this.canvas = HtmlHelper_1.HtmlHelper.canvas('', [enWarning, frWarning]);
        this.canvas.width = this.progremConfig.nombreColonnes * this.screenConfig.boxSize;
        this.canvas.height = this.progremConfig.nombreLignes * this.screenConfig.boxSize;
        let ctx = this.canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Unable to obtain 2D Canvas context !');
        }
        this.ctx = ctx;
        this.clear();
        scheduler.subscribeStartIteratingCode(this);
        scheduler.subscribeGridChange(this);
        scheduler.subscribeFrameChange(this);
    }
    renderHtml() {
        let container = HtmlHelper_1.HtmlHelper.span('progrem-grid', this.canvas);
        return container;
    }
    colorCurrentPixel(state, color) {
        let boxSize = this.screenConfig.boxSize;
        let c = state.colonne;
        let l = state.ligne;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(c * boxSize, l * boxSize, boxSize, boxSize);
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
        if (couleur) {
            this.ctx.fillStyle = couleur;
            this.ctx.fillRect(c * boxSize, l * boxSize, boxSize, boxSize);
        }
    }
    fireFrameChange(state) {
        //this.clear();
    }
    clear() {
        let width = this.screenConfig.boxSize * this.progremConfig.nombreColonnes;
        let height = this.screenConfig.boxSize * this.progremConfig.nombreLignes;
        this.ctx.clearRect(0, 0, width, height);
        this.ctx.fillStyle = 'antiquewhite';
        this.ctx.fillRect(0, 0, width, height);
    }
}
exports.ProgremGridComponent = ProgremGridComponent;


/***/ })

},[["/7QA","runtime","npm.rxjs-compat","npm.rxjs","npm.escodegen","npm.esutils","npm.estraverse","npm.webpack","npm.esprima-walk","npm.esprima","npm.js-md5","npm.process","npm.tslib"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9yU3R5bGVEZWNvcmF0b3JzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92YXJpYWJsZVNjb3BlL1ZhcmlhYmxlU2NvcGVDb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUVkaXRvci9Qcm9ncmVtRWRpdG9yQ29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL0h0bWxIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VzcHJpbWEvQmFzaWNFc3ByaW1hUHJvZ3JlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9FdmFsU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9TY2hlZHVsaW5nU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Qcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZhcmlhYmxlU2NvcGUvRXNwcmltYVZhcmlhYmxlU2NvcGVTdHlsZURlY29yYXRvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvUHJvZ3JlbVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdmFyaWFibGVTY29wZS9Fc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL1R5cGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL0NvZGVTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL1NjcmVlblNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VzcHJpbWEvRXNwcmltYUhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9Db2xvclNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUdyaWQvUHJvZ3JlbUdyaWRDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUdBLG1HQUF3RTtBQUN4RSxrRkFBdUQ7QUFFdkQsTUFBYSwyQkFBMkI7SUFBeEM7UUFFWSxnQkFBVyxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzdDLGtCQUFhLEdBQWtCLDJCQUFZLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLENBQUM7SUE2Q3BGLENBQUM7SUEzQ0csUUFBUSxDQUFDLElBQWMsRUFBRSxPQUFvQjtRQUN6QyxJQUFJLEtBQUssQ0FBQztRQUVWLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7WUFDNUIsSUFBSSxDQUFDLEdBQUcsSUFBa0IsQ0FBQztZQUMzQixLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUNsQjtRQUVELElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDWCxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDekM7WUFFRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFP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LEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztRQUMxRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztRQUN6RSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7UUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUVKO0FBL0ZELG9EQStGQyIsImZpbGUiOiJpbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdHlsZURlY29yYXRvciwgQ29sb3JQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNlTm9kZSwgSWRlbnRpZmllciB9IGZyb20gXCJlc3RyZWVcIjtcblxuaW1wb3J0IHsgUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudCB9IGZyb20gXCIuL1Byb2dyZW1JbnNwZWN0b3JDb21wb25lbnRcIjtcbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb3JlL0NvbG9yU2VydmljZVwiO1xuXG5leHBvcnQgY2xhc3MgQ29sb3JWZXJzZVZhcmlhYmxlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8QmFzZU5vZGU+IHtcblxuICAgIHByaXZhdGUgdmFyaWFibGVNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBjb2xvclByb3ZpZGVyOiBDb2xvclByb3ZpZGVyID0gQ29sb3JTZXJ2aWNlLmNvbG9yUHJvdmlkZXJhY3RvcnkuYnVpbGQoKTtcblxuICAgIGRlY29yYXRlKG5vZGU6IEJhc2VOb2RlLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IHZhcklkO1xuXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdJZGVudGlmaWVyJykge1xuICAgICAgICAgICAgbGV0IG4gPSBub2RlIGFzIElkZW50aWZpZXI7XG4gICAgICAgICAgICB2YXJJZCA9IG4ubmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YXJJZCkge1xuICAgICAgICAgICAgbGV0IHZhckluZGV4ID0gdGhpcy52YXJpYWJsZU1hcC5nZXQodmFySWQpO1xuICAgICAgICAgICAgaWYgKCF2YXJJbmRleCkge1xuICAgICAgICAgICAgICAgIHZhckluZGV4ID0gdGhpcy52YXJpYWJsZU1hcC5zaXplICsgMTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhcmlhYmxlTWFwLnNldCh2YXJJZCwgdmFySW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3ZhcmlhYmxlJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3ZhcmlhYmxlLScgKyB2YXJJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9ICAgIFxuICAgIFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc3R5bGUgPSAnJztcbiAgICAgICAgLy9jb25zb2xlLmxvZygndmFyaWFibGUgY291bnQ6JywgdGhpcy52YXJpYWJsZU1hcC5zaXplKTtcbiAgICAgICAgdGhpcy52YXJpYWJsZU1hcC5mb3JFYWNoKChpbmRleCwgaWQpID0+IHtcbiAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMuY29sb3JQcm92aWRlci5oYXNoU3RyaW5nVG9Db2xvcihpZCwgMTYpOyAvL3RoaXMudmFyaWFibGVNYXAuc2l6ZVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYnVpbGRpbmcgY29sb3IgIycsIGlkLCAnPT4nLCBjb2xvcik7XG4gICAgICAgICAgICBzdHlsZSArPSBgXG4gICAgICAgICAgICAgICAgLnZhcmlhYmxlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMC4xZW0gMC41ZW0gMC4xZW0gMC41ZW07XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwLjhlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLiR7UHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRJTkdfQ0xBU1N9IC52YXJpYWJsZS0ke2luZGV4fS5pZGVudGlmaWVyLCBcbiAgICAgICAgICAgICAgICAuJHtQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVEVEX0NMQVNTfSAudmFyaWFibGUtJHtpbmRleH0uaWRlbnRpZmllciB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBgO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBhZFZlcnNlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8QmFzZU5vZGU+IHtcblxuICAgIGRlY29yYXRlKG5vZGU6IEJhc2VOb2RlLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb2RlLXBhZGRpbmcnKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSAgICBcbiAgICBcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgLmNvZGUtcGFkZGluZyB7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMzJweDtcbiAgICAgICAgfVxuICAgICAgICBgO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgUHJvZ3JlbVNlcnZpY2V9IGZyb20gXCIuL2NvcmUvUHJvZ3JlbVNlcnZpY2VcIjtcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gXCIuL2NvcmUvU2NyZWVuU2VydmljZVwiO1xuXG5sZXQgc2NyZWVuQ29uZmlnID0gbmV3IFNjcmVlbkNvbmZpZygyMCk7XG5cblByb2dyZW1TZXJ2aWNlLmJ1aWxkUHJvZ3JlbSgnLi9wcm9ncmVtcy9tYW5kZWxicm90X3NldF9wcm9ncmVtLmpzJywgc2NyZWVuQ29uZmlnKTsiLCJpbXBvcnQgeyBQcm9ncmVtQ29tcG9uZW50LCBHcmlkQ2hhbmdlTGlzdGVuZXIsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgUHJvZ3JlbVN0YXRlLCBDb2xvclByb3ZpZGVyLCBQcm9ncmVtU2NoZWR1bGVyLCBIdG1sQ291cGxldEZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgRXNwcmltYUhlbHBlciB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFIZWxwZXJcIjtcbmltcG9ydCB7IFZhcmlhYmxlRGVjbGFyYXRpb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBGdW5jdGlvbkRlY2xhcmF0aW9uIH0gZnJvbSBcImVzdHJlZVwiO1xuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvQ29sb3JTZXJ2aWNlXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBFc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5IH0gZnJvbSBcIi4vRXNwcmltYVZhcmlhYmxlU2NvcGVIdG1sRmFjdG9yeVwiO1xuXG5leHBvcnQgY2xhc3MgVmFyaWFibGVTY29wZUNvbXBvbmVudCBpbXBsZW1lbnRzIFByb2dyZW1Db21wb25lbnQsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyIHtcblxuICAgIHByaXZhdGUgaHRtbENvbnRhaW5lcjogSFRNTEVsZW1lbnR8bnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBjb2xvclByb3ZpZGVyOiBDb2xvclByb3ZpZGVyID0gQ29sb3JTZXJ2aWNlLmNvbG9yUHJvdmlkZXJhY3RvcnkuYnVpbGQoKTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXIsXG4gICAgICAgIHByaXZhdGUgaHRtbEZhY3Rvcnk6IEVzcHJpbWFWYXJpYWJsZVNjb3BlSHRtbEZhY3RvcnlcbiAgICApIHtcbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUNvZGVFeGVjdXRpb24odGhpcyk7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVHcmlkQ2hhbmdlKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbmRlckh0bWwoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgaHRtbENvbXBvbmVudCA9IHRoaXMuaHRtbEZhY3RvcnkuYnVpbGRDb3VwbGV0KCk7XG4gICAgICAgIHRoaXMuaHRtbENvbnRhaW5lciA9IGh0bWxDb21wb25lbnQ7XG4gICAgICAgIHJldHVybiBodG1sQ29tcG9uZW50O1xuICAgIH1cblxuICAgIGZpcmVDb2RlRXhlY3V0aW9uKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFzdGF0ZS52ZXJzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0bWxWZXJzZSA9IHRoaXMuaHRtbEZhY3RvcnkuZ2V0SHRtbFZlcnNlKHN0YXRlLnZlcnNlKTtcbiAgICAgICAgLy8gaWYgKHRoaXMuaHRtbENvbnRhaW5lciAmJiBodG1sVmVyc2UpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuaHRtbENvbnRhaW5lci5hcHBlbmRDaGlsZChodG1sVmVyc2UpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgZmlyZUdyaWRDaGFuZ2Uoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmh0bWxGYWN0b3J5LmNsZWFyVmlldygpO1xuICAgIH1cblxufSIsImltcG9ydCB7IEVzcHJpbWFQcm9ncmVtIH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYVR5cGVzXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1FZGl0b3JDb21wb25lbnQge1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBDT01QT05FTlRfQ0xBU1MgPSAncHJvZ3JlbS1lZGl0b3ItY29tcG9uZW50JztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IElOSVRfRlVOQ19DTEFTUyA9ICdpbml0LXByb2dyZW0tZWRpdG9yJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IENPTE9SRVJfRlVOQ19DTEFTUyA9ICdjb2xvcmVyLXByb2dyZW0tZWRpdG9yJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IENPREVfTElCUkVfQ0xBU1MgPSAnY29kZS1saWJyZS1lZGl0b3InO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUkVGUkVTSF9BQ1RJT05fQ0xBU1MgPSAncmVmcmVzaC1hY3Rpb24nO1xuXG4gICAgcHJpdmF0ZSBpbml0UHJvZ3JlbVRleHRhcmVhITogSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICBwcml2YXRlIGNvbG9yZXJQcm9ncmVtVGV4dGFyZWEhOiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgIHByaXZhdGUgY29kZUxpYnJlVGV4dGFyZWEhOiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgIHByaXZhdGUgcmVmcmVzaE9ic2VydmFibGUkITogT2JzZXJ2YWJsZTxFdmVudD47XG5cbiAgICBwcml2YXRlIGF0dGFjaGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwdWJsaWMgYXR0YWNoKGRvY3VtZW50OkRvY3VtZW50KSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7UHJvZ3JlbUVkaXRvckNvbXBvbmVudC5DT01QT05FTlRfQ0xBU1N9IC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuSU5JVF9GVU5DX0NMQVNTfSB0ZXh0YXJlYWApO1xuICAgICAgICBjb25zb2xlLmxvZygnZWxlbWVudHMnLCBlbGVtZW50KTtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHRoaXMuaW5pdFByb2dyZW1UZXh0YXJlYSA9IGVsZW1lbnQgYXMgSFRNTFRleHRBcmVhRWxlbWVudDtcblxuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7UHJvZ3JlbUVkaXRvckNvbXBvbmVudC5DT01QT05FTlRfQ0xBU1N9IC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuQ09MT1JFUl9GVU5DX0NMQVNTfSB0ZXh0YXJlYWApO1xuICAgICAgICBpZiAoZWxlbWVudCkgdGhpcy5jb2xvcmVyUHJvZ3JlbVRleHRhcmVhID0gZWxlbWVudCBhcyBIVE1MVGV4dEFyZWFFbGVtZW50O1xuXG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtQcm9ncmVtRWRpdG9yQ29tcG9uZW50LkNPTVBPTkVOVF9DTEFTU30gLiR7UHJvZ3JlbUVkaXRvckNvbXBvbmVudC5DT0RFX0xJQlJFX0NMQVNTfSB0ZXh0YXJlYWApO1xuICAgICAgICBpZiAoZWxlbWVudCkgdGhpcy5jb2RlTGlicmVUZXh0YXJlYSA9IGVsZW1lbnQgYXMgSFRNTFRleHRBcmVhRWxlbWVudDtcblxuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7UHJvZ3JlbUVkaXRvckNvbXBvbmVudC5DT01QT05FTlRfQ0xBU1N9IC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuUkVGUkVTSF9BQ1RJT05fQ0xBU1N9YCk7XG4gICAgICAgIHRoaXMucmVmcmVzaE9ic2VydmFibGUkID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZWxlbWVudCBhcyBIVE1MQnV0dG9uRWxlbWVudCwgJ2NsaWNrJyk7XG5cbiAgICAgICAgdGhpcy5hdHRhY2hlZCA9IHRoaXMuaW5pdFByb2dyZW1UZXh0YXJlYSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29sb3JlclByb2dyZW1UZXh0YXJlYSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29kZUxpYnJlVGV4dGFyZWEgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnJlZnJlc2hPYnNlcnZhYmxlJCAhPT0gdW5kZWZpbmVkO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2hlY2tJc0F0dGFjaGVkKCkge1xuICAgICAgICBpZiAoIXRoaXMuYXR0YWNoZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvZ3JlbUVkaXRvckNvbXBvbmVudCBpcyBub3QgYXR0YWNoZWQgIScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWRQcm9ncmVtKHByb2dyZW06IEVzcHJpbWFQcm9ncmVtKSB7XG4gICAgICAgIHRoaXMuY2hlY2tJc0F0dGFjaGVkKCk7XG5cbiAgICAgICAgbGV0IGZ1bmNCb2R5QmxvY2sgPSBwcm9ncmVtLmluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCkuZnVuY3Rpb25Sb290Tm9kZS5ib2R5O1xuICAgICAgICBsZXQgZnVuY0JvZHlDb2RlID0gZXNjb2RlR2VuZXJhdGUoZnVuY0JvZHlCbG9jayk7XG4gICAgICAgIGxldCBjbGVhbmVkQ29kZSA9IGZ1bmNCb2R5Q29kZS5zdWJzdHJpbmcoMSwgZnVuY0JvZHlDb2RlLmxlbmd0aCAtIDIpO1xuICAgICAgICB0aGlzLmluaXRQcm9ncmVtVGV4dGFyZWEuaW5uZXJIVE1MID0gY2xlYW5lZENvZGU7XG5cbiAgICAgICAgZnVuY0JvZHlCbG9jayA9IHByb2dyZW0uY29sb3JlclByb2dyZW1GdW5jdGlvbigpLmZ1bmN0aW9uUm9vdE5vZGUuYm9keTtcbiAgICAgICAgZnVuY0JvZHlDb2RlID0gZXNjb2RlR2VuZXJhdGUoZnVuY0JvZHlCbG9jayk7XG4gICAgICAgIGNsZWFuZWRDb2RlID0gZnVuY0JvZHlDb2RlLnN1YnN0cmluZygxLCBmdW5jQm9keUNvZGUubGVuZ3RoIC0gMik7XG4gICAgICAgIHRoaXMuY29sb3JlclByb2dyZW1UZXh0YXJlYS5pbm5lckhUTUwgPSBjbGVhbmVkQ29kZTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHVibGljIGJ1aWxkUHJvZ3JlbSgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgY29sb3JlclByb2dyZW1GdW5jID0gYFxuICAgICAgICBmdW5jdGlvbiBjb2xvcmVyUHJvZ3JlbShjb2xvbm5lLCBsaWduZSwgZnJhbWUsIGNvbnRleHRlKSB7XG4gICAgICAgICAgICAke3RoaXMuY29sb3JlclByb2dyZW1UZXh0YXJlYS52YWx1ZX1cbiAgICAgICAgfVxuICAgICAgICBgO1xuXG4gICAgICAgIGxldCBpbml0UHJvZ3JlbUZ1bmMgPSBgXG4gICAgICAgIGZ1bmN0aW9uIGluaXRpYWxpc2VyUHJvZ3JlbShjb25maWcsIGluaXRDb250ZXh0ZSkge1xuICAgICAgICAgICAgJHt0aGlzLmluaXRQcm9ncmVtVGV4dGFyZWEudmFsdWV9XG4gICAgICAgIH1cbiAgICAgICAgYDtcblxuICAgICAgICBsZXQgY29kZUxpYnJlRnVuYyA9IHRoaXMuY29kZUxpYnJlVGV4dGFyZWEudmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgJHtjb2RlTGlicmVGdW5jfVxuXG4gICAgICAgICR7aW5pdFByb2dyZW1GdW5jfVxuXG4gICAgICAgICR7Y29sb3JlclByb2dyZW1GdW5jfVxuICAgICAgICBgO1xuICAgIH1cblxuICAgIHB1YmxpYyBiaW5kUmVmcmVzaChhY3Rpb246IChjb2RlOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoT2JzZXJ2YWJsZSQuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGFjdGlvbih0aGlzLmJ1aWxkUHJvZ3JlbSgpKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbn0iLCJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBIdG1sSGVscGVyIHtcblxuICAgIHN0YXRpYyBhZGRDbGFzc2VzKGVsdDogSFRNTEVsZW1lbnQsIGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBpZiAodHlwZW9mIGNsYXNzZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnNwbGl0KCcgJykuZm9yRWFjaChjID0+IGVsdC5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjbGFzc2VzKSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5mb3JFYWNoKGMgPT4gZWx0LmNsYXNzTGlzdC5hZGQoYykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHNwYW4oY2xhc3Nlczogc3RyaW5nfHN0cmluZ1tdLCBjb250ZW50Pzogc3RyaW5nfEhUTUxFbGVtZW50fChIVE1MRWxlbWVudHxzdHJpbmcpW10pOiBIVE1MU3BhbkVsZW1lbnQge1xuICAgICAgICByZXR1cm4gSHRtbEhlbHBlci50YWcoJ3NwYW4nLCBjbGFzc2VzLCBjb250ZW50KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcChjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxQYXJhZ3JhcGhFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIudGFnKCdwJywgY2xhc3NlcywgY29udGVudCkgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpdihjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxEaXZFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIudGFnKCdkaXYnLCBjbGFzc2VzLCBjb250ZW50KSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2FudmFzKGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSwgY29udGVudD86IHN0cmluZ3xIVE1MRWxlbWVudHwoSFRNTEVsZW1lbnR8c3RyaW5nKVtdKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICAgICAgICByZXR1cm4gSHRtbEhlbHBlci50YWcoJ2NhbnZhcycsIGNsYXNzZXMsIGNvbnRlbnQpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHRhZyh0YWdOYW1lOiBzdHJpbmcsIGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSwgY29udGVudD86IHN0cmluZ3xIVE1MRWxlbWVudHwoSFRNTEVsZW1lbnR8c3RyaW5nKVtdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgZWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICAgICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgICAgIEh0bWxIZWxwZXIuYWRkQ2xhc3NlcyhlbHQsIGNsYXNzZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZWx0LmlubmVyVGV4dCA9IGNvbnRlbnQ7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBlbHQuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjb250ZW50KSkge1xuICAgICAgICAgICAgY29udGVudC5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgZWx0LmlubmVySFRNTCArPSBjO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYykge1xuICAgICAgICAgICAgICAgICAgICBlbHQuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBhZGQgY29udGVudDonLCBjKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWZpbmVDc3NSdWxlcyhpZDogc3RyaW5nLCBjc3NSdWxlczogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBjc3NJZCA9ICdjc3MtJyArIGlkO1xuICAgICAgICBsZXQgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3NzSWQpO1xuICAgICAgICBpZighc3R5bGVFbGVtZW50KSB7XG4gICAgICAgICAgICBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICB9XG4gICAgICAgIHN0eWxlRWxlbWVudC5pZCA9IGNzc0lkO1xuICAgICAgICAvKiBhZGQgc3R5bGUgcnVsZXMgdG8gdGhlIHN0eWxlIGVsZW1lbnQgKi9cbiAgICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzc1J1bGVzKSk7XG4gICAgICAgIFxuICAgICAgICAvKiBhdHRhY2ggdGhlIHN0eWxlIGVsZW1lbnQgdG8gdGhlIGRvY3VtZW50IGhlYWQgKi9cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbn0iLCJcbmltcG9ydCB7IFByb2dyYW0sIHBhcnNlTW9kdWxlLCBQYXJzZU9wdGlvbnMgfSBmcm9tICdlc3ByaW1hJztcbmltcG9ydCB7IHdhbGsgYXMgZXNwcmltYVdhbGssIHdhbGtBZGRQYXJlbnQgYXMgZXNwcmltYVdhbGtBZGRQYXJlbnQgfSBmcm9tICdlc3ByaW1hLXdhbGsnO1xuaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgQmFzZU5vZGUsIEZ1bmN0aW9uRGVjbGFyYXRpb24sIEJsb2NrU3RhdGVtZW50LCBJZlN0YXRlbWVudCwgUmV0dXJuU3RhdGVtZW50LCBTdGF0ZW1lbnQgfSBmcm9tICdlc3RyZWUnO1xuaW1wb3J0IHsgRXNwcmltYVZlcnNlSXRlcmFvciwgRXNwcmltYVZlcnNlLCBFc3ByaW1hQ291cGxldCwgRXNwcmltYVByb2dyZW1GYWN0b3J5LCBFc3ByaW1hUHJvZ3JlbSB9IGZyb20gJy4vRXNwcmltYVR5cGVzJztcbmltcG9ydCB7IEVzcHJpbWFIZWxwZXIgfSBmcm9tICcuL0VzcHJpbWFIZWxwZXInO1xuaW1wb3J0IHsgQ29kZVNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL0NvZGVTZXJ2aWNlJztcbmltcG9ydCB7IFByb2dyZW1TdGF0ZSB9IGZyb20gJy4uL2NvcmUvVHlwZXMnO1xuXG5jbGFzcyBCYXNpY0VzcHJpbWFDb2RlSXRlcmF0b3IgaW1wbGVtZW50cyBFc3ByaW1hVmVyc2VJdGVyYW9yIHtcblxuICAgIHByaXZhdGUgc3RhY2s6IEJhc2VOb2RlW10gPSBbXTtcbiAgICBwcml2YXRlIHJldHVyblZhbHVlOiBhbnkgPSBudWxsO1xuICAgIHByaXZhdGUgZmluaXNoZWQgPSBmYWxzZVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgICAgICBwcml2YXRlIHJvb3ROb2RlOiBCYXNlTm9kZSwgXG4gICAgICAgICAgICBwcml2YXRlIHN0YXRlOiBQcm9ncmVtU3RhdGUpIHtcbiAgICAgICAgdGhpcy5zdGFjay5wdXNoKHJvb3ROb2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlY2xhcmVQcm9ncmVtQXJndW1lbnRzKCkge1xuICAgICAgICBsZXQgX2NvbG9ubmUgPSB0aGlzLnN0YXRlLmNvbG9ubmU7XG4gICAgICAgIGxldCBfbGlnbmUgPSB0aGlzLnN0YXRlLmxpZ25lO1xuICAgICAgICBsZXQgX2ZyYW1lID0gdGhpcy5zdGF0ZS5mcmFtZTtcbiAgICAgICAgbGV0IF9jb250ZXh0ZSA9IHRoaXMuc3RhdGUuY29udGV4dGU7XG5cbiAgICAgICAgdGhpcy5zdGF0ZS5ldmFsKCd2YXIgY29sb25uZSA9ICcgKyBfY29sb25uZSArICcsIGxpZ25lID0gJyArIF9saWduZSArICcsIGZyYW1lID0gJyArIF9mcmFtZSArICc7Jyk7XG4gICAgICAgIHRoaXMuc3RhdGUuZXZhbCgndmFyIGNvbnRleHRlID0gJyArIEpTT04uc3RyaW5naWZ5KF9jb250ZXh0ZSkpO1xuICAgIH1cblxuICAgIGV4ZWN1dGVOZXh0KCk6IEVzcHJpbWFWZXJzZSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgZmlyc3Qgbm9kZSBvbiB0aGUgc3RhY2tcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5zdGFjay5zaGlmdCgpO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdOb2RlOicsIG5vZGUpO1xuXG4gICAgICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0YWNrIHNob3VsZCBub3QgYmUgZW1wdHkgIScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3RtdDtcblxuICAgICAgICAgICAgc3dpdGNoKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Z1bmN0aW9uRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KGZ1bmMuYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjbGFyZVByb2dyZW1Bcmd1bWVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkVmVyc2UoZnVuYyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2sgPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBibG9jay5ib2R5LnNsaWNlKCkucmV2ZXJzZSgpLm1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0Jsb2NrU3RhdGVtZW50IHVuc2hpZnRpbmc6JywgeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoeClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnSWZTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBzdG10ID0gbm9kZSBhcyBJZlN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3RDb2RlID0gZXNjb2RlR2VuZXJhdGUoc3RtdC50ZXN0KTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdFJlc3VsdCA9IHRoaXMuc3RhdGUuZXZhbCh0ZXN0Q29kZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0lmU3RhdGVtZW50IHRlc3QgZXZhbHVhdGUgdG86ICcsIHRlc3RSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVzdFJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnVGhlbiB1bnNoaWZ0aW5nOicsIHN0bXQuY29uc2VxdWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoc3RtdC5jb25zZXF1ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdG10LmFsdGVybmF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0Vsc2UgdW5zaGlmdGluZzonLCBzdG10LmFsdGVybmF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KHN0bXQuYWx0ZXJuYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFZlcnNlKHN0bXQpO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnUmV0dXJuU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgc3RtdCA9IG5vZGUgYXMgUmV0dXJuU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlID0gdGhpcy5zdGF0ZS5ldmFsKGVzY29kZUdlbmVyYXRlKHN0bXQuYXJndW1lbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFZlcnNlKHN0bXQpO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnTm9kZTonLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvZGUgPSBlc2NvZGVHZW5lcmF0ZShub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnR2VuZXJhdGVkIGNvZGU6JywgY29kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBldmFsUmVzdWx0ID0gdGhpcy5zdGF0ZS5ldmFsKGNvZGUpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdFdmFsdWF0ZSB0bzonLCBldmFsUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkVmVyc2Uobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuc3RhY2subGVuZ3RoID4gMCk7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJdGVyYXRvciBoYXMgbm8gbW9yZSBjb2RlIHRvIGV4ZWN1dGUgIScpO1xuICAgIH0gICAgXG4gICAgXG4gICAgaGFzTmV4dCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuZmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBub2RlcyA9IHRoaXMuc3RhY2suc2xpY2UoMCk7XG4gICAgICAgIHdoaWxlIChub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5vZGVzLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLnR5cGUgIT09ICdCbG9ja1N0YXRlbWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrczogQmxvY2tTdGF0ZW1lbnRbXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2sgPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBibG9ja3MucHVzaChibG9jayk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhcnNvdXJzIHJlY3Vyc2l2ZW1lbnQgbGVzIGJsb2NrcyDDoCBsYSByZWNoZXJjaGUgZGUgbm9ldWQgcXVpIG5lIHNvbnQgcGFzIGRlcyBibG9ja3NcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhhc05leHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFoYXNOZXh0ICYmIGJsb2Nrcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYiA9IGJsb2Nrcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiLmJvZHkubWFwKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeC50eXBlICE9PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNOZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhc05leHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBjbGFzcyBCYXNpY0VzcHJpbWFQcm9ncmVtIGltcGxlbWVudHMgRXNwcmltYVByb2dyZW0ge1xuXG4gICAgcHJpdmF0ZSBlc3ByaW1hUHJvZ3JhbTogUHJvZ3JhbTtcblxuICAgIHByaXZhdGUgaW5pdENvdXBsZXQ6IEVzcHJpbWFDb3VwbGV0O1xuICAgIHByaXZhdGUgY29sb3JlckNvdXBsZXQ6IEVzcHJpbWFDb3VwbGV0O1xuXG4gICAgY29uc3RydWN0b3IoY29kZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBjb25maWc6IFBhcnNlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbW1lbnQ6IHRydWUsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lc3ByaW1hUHJvZ3JhbSA9IHBhcnNlTW9kdWxlKGNvZGUsIGNvbmZpZyk7XG4gICAgICAgIHRoaXMuaW5pdENvdXBsZXQgPSB0aGlzLndhbGtQcm9ncmVtQ291cGxldCgnaW5pdGlhbGlzZXJQcm9ncmVtJyk7XG4gICAgICAgIHRoaXMuY29sb3JlckNvdXBsZXQgPSB0aGlzLndhbGtQcm9ncmVtQ291cGxldCgnY29sb3JlclByb2dyZW0nKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgd2Fsa1Byb2dyZW1Db3VwbGV0KGZ1bmN0aW9uTmFtZTogc3RyaW5nKTogRXNwcmltYUNvdXBsZXQge1xuICAgICAgICB2YXIgZnVuY05vZGU6IEZ1bmN0aW9uRGVjbGFyYXRpb24gfCBudWxsID0gbnVsbDtcbiAgICAgICAgdmFyIHZlcnNlczogQmFzZU5vZGVbXSA9IFtdO1xuICAgICAgICBlc3ByaW1hV2Fsa0FkZFBhcmVudCh0aGlzLmVzcHJpbWFQcm9ncmFtLCBub2RlID0+IHtcbiAgICAgICAgICAgIGlmKCBub2RlLnR5cGUgPT09ICdGdW5jdGlvbkRlY2xhcmF0aW9uJyAmJiBub2RlLmlkICYmIG5vZGUuaWQubmFtZSA9PT0gZnVuY3Rpb25OYW1lKSB7XG4gICAgICAgICAgICAgICAgZnVuY05vZGUgPSBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZ1bmNOb2RlICYmIEVzcHJpbWFIZWxwZXIuaXNDaGlsZE5vZGVPZihub2RlLCBmdW5jTm9kZSkpIHsgLy8gJiYgRXNwcmltYUhlbHBlci5pc05vdENoaWxkTm9kZU9mKG5vZGUsIHZlcnNlcylcbiAgICAgICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicgXG4gICAgICAgICAgICAgICAgICAgIHx8IG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nXG4gICAgICAgICAgICAgICAgICAgIHx8IG5vZGUudHlwZSA9PT0gJ0V4cHJlc3Npb25TdGF0ZW1lbnQnXG4gICAgICAgICAgICAgICAgICAgIHx8IG5vZGUudHlwZSA9PT0gJ1JldHVyblN0YXRlbWVudCdcbiAgICAgICAgICAgICAgICAgICAgfHwgbm9kZS50eXBlID09PSAnSWZTdGF0ZW1lbnQnICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2VzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9ICk7XG4gICAgICAgIGlmIChmdW5jTm9kZSkge1xuICAgICAgICAgICAgdmVyc2VzLnVuc2hpZnQoZnVuY05vZGUpO1xuICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkQ291cGxldChmdW5jTm9kZSwgdmVyc2VzKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEltcG9zc2libGUgZGUgdHJvdXZlciBsYSBmb25jdGlvbiAke2Z1bmN0aW9uTmFtZX0oKSAhYCk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCk6IEVzcHJpbWFDb3VwbGV0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdENvdXBsZXQ7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKTogRXNwcmltYUNvdXBsZXQge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xvcmVyQ291cGxldDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXRlcmF0b3Ioc3RhdGU6IFByb2dyZW1TdGF0ZSk6IEVzcHJpbWFWZXJzZUl0ZXJhb3Ige1xuICAgICAgICByZXR1cm4gbmV3IEJhc2ljRXNwcmltYUNvZGVJdGVyYXRvcih0aGlzLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKS5mdW5jdGlvblJvb3ROb2RlLCBzdGF0ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQmFzaWNFc3ByaW1hUHJvZ3JlbUZhY3RvcnkgaW1wbGVtZW50cyBFc3ByaW1hUHJvZ3JlbUZhY3Rvcnkge1xuXG4gICAgYnVpbGRQcm9ncmVtKGNvZGU6IHN0cmluZyk6IEVzcHJpbWFQcm9ncmVtIHtcbiAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcG9zc2libGUgdG8gYnVpbGQgUHJvZ3JlbSB3aXRob3V0IGNvZGUgIScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgQmFzaWNFc3ByaW1hUHJvZ3JlbShjb2RlKTtcbiAgICB9XG5cbiAgICBidWlsZENvdXBsZXQobm9kZTogRnVuY3Rpb25EZWNsYXJhdGlvbiwgdmVyc2VzOiBCYXNlTm9kZVtdKTogRXNwcmltYUNvdXBsZXQge1xuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW1wb3NzaWJsZSB0byBidWlsZCBlbXB0eSBDb3VwbGV0ICEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlc3ByaW1hVmVyc2VzID0gdmVyc2VzLm1hcCh0aGlzLmJ1aWxkVmVyc2UpO1xuXG4gICAgICAgIGxldCBjb3VwbGV0OiBFc3ByaW1hQ291cGxldCA9IHtcbiAgICAgICAgICAgIGZ1bmN0aW9uUm9vdE5vZGU6IG5vZGUsXG4gICAgICAgICAgICB2ZXJzZXM6IGVzcHJpbWFWZXJzZXNcbiAgICAgICAgfVxuICAgICAgICAvL2NvbnNvbGUubG9nKCdCdWlsdCBjb3VwbGV0OicsIGNvdXBsZXQpO1xuICAgICAgICByZXR1cm4gY291cGxldDtcbiAgICB9XG5cbiAgICBidWlsZFZlcnNlKG5vZGU6IEJhc2VOb2RlKTogRXNwcmltYVZlcnNlIHtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcG9zc2libGUgdG8gYnVpbGQgZW1wdHkgVmVyc2UgIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvZGUgPSBub2RlO1xuICAgICAgICBpZihub2RlLnR5cGUgPT09ICdJZlN0YXRlbWVudCcpIHtcbiAgICAgICAgICAgIGNvZGUgPSAobm9kZSBhcyBJZlN0YXRlbWVudCkudGVzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2ZXJzZTogRXNwcmltYVZlcnNlID0geyBcbiAgICAgICAgICAgIG5vZGU6IG5vZGUsXG4gICAgICAgICAgICBjb2RlOiBjb2RlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB2ZXJzZTtcbiAgICB9XG59XG4iLCJcbmV4cG9ydCBjbGFzcyBFdmFsU2NvcGUge1xuXG4gICAgLy8gU2VlIGh0dHA6Ly9wZXJmZWN0aW9ua2lsbHMuY29tL2dsb2JhbC1ldmFsLXdoYXQtYXJlLXRoZS1vcHRpb25zL1xuICAgIC8vIFdpbGwgcmV0dXJuIGFuIGV2YWwgYWJsZSB0byBldmFsdWF0ZSBqcyBjb2RlIGluIHRoZSBnbG9iYWwgc2NvcGUuXG4gICAgcHVibGljIHJlYWRvbmx5IGdsb2JhbEV2YWwgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciBpc0luZGlyZWN0RXZhbEdsb2JhbCA9IChmdW5jdGlvbiAob3JpZ2luYWwsIE9iamVjdCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvLyBEb2VzIGBPYmplY3RgIHJlc29sdmUgdG8gYSBsb2NhbCB2YXJpYWJsZSwgb3IgdG8gYSBnbG9iYWwsIGJ1aWx0LWluIGBPYmplY3RgLFxuICAgICAgICAgICAgICAgIC8vIHJlZmVyZW5jZSB0byB3aGljaCB3ZSBwYXNzZWQgYXMgYSBmaXJzdCBhcmd1bWVudD9cbiAgICAgICAgICAgICAgICByZXR1cm4gKDEsIGV2YWwpKCdPYmplY3QnKSA9PT0gb3JpZ2luYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgaW5kaXJlY3QgZXZhbCBlcnJvcnMgb3V0IChhcyBhbGxvd2VkIHBlciBFUzMpLCB0aGVuIGp1c3QgYmFpbCBvdXQgd2l0aCBgZmFsc2VgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KShPYmplY3QsIDEyMyk7XG5cbiAgICAgICAgaWYgKGlzSW5kaXJlY3RFdmFsR2xvYmFsKSB7XG4gICAgICAgICAgICAvLyBpZiBpbmRpcmVjdCBldmFsIGV4ZWN1dGVzIGNvZGUgZ2xvYmFsbHksIHVzZSBpdFxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChleHByZXNzaW9uOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDEsIGV2YWwpKGV4cHJlc3Npb24pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cuZXhlY1NjcmlwdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIC8vIGlmIGB3aW5kb3cuZXhlY1NjcmlwdCBleGlzdHNgLCB1c2UgaXRcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXhwcmVzc2lvbjogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuZXhlY1NjcmlwdChleHByZXNzaW9uKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdGhlcndpc2UsIGdsb2JhbEV2YWwgaXMgYHVuZGVmaW5lZGAgc2luY2Ugbm90aGluZyBpcyByZXR1cm5lZFxuICAgICAgICByZXR1cm4gKGV4cHI6IHN0cmluZykgPT4ge3Rocm93IG5ldyBFcnJvcignTm8gZ2xvYmFsIGV2YWwgYXZhaWxhYmxlICEnKTt9XG4gICAgfSkoKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxufVxuIiwiaW1wb3J0IHsgUHJvZ3JlbVNjaGVkdWxlciwgVmVyc2VJdGVyYXRvciwgUHJvZ3JlbUNvZGUsIFByb2dyZW1WZXJzZSwgU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyLCBMaW5lQ2hhbmdlTGlzdGVuZXIsIEZyYW1lQ2hhbmdlTGlzdGVuZXIsIFByb2dyZW1TdGF0ZSwgUHJvZ3JlbVRlbXBvLCBQcm9ncmVtQ29uZmlnIH0gZnJvbSBcIi4vVHlwZXNcIjtcblxuY2xhc3MgU2ltcGxlUHJvZ3JlbVNjaGVkdWxlciBpbXBsZW1lbnRzIFByb2dyZW1TY2hlZHVsZXIge1xuICAgIFxuICAgIHByaXZhdGUgc3RhdGU6IFByb2dyZW1TdGF0ZTtcbiAgICBwcml2YXRlIGNvZGVJdGVyYXRvcjogVmVyc2VJdGVyYXRvcjxhbnk+IHwgbnVsbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIHN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyczogU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgY29kZUV4ZWN1dGlvbkxpc3RlbmVyczogQ29kZUV4ZWN1dGlvbkxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGdyaWRDaGFuZ2VMaXN0ZW5lcnM6IEdyaWRDaGFuZ2VMaXN0ZW5lcltdID0gW107XG4gICAgcHJpdmF0ZSBsaW5lQ2hhbmdlTGlzdGVuZXJzOiBMaW5lQ2hhbmdlTGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgZnJhbWVDaGFuZ2VMaXN0ZW5lcnM6IEZyYW1lQ2hhbmdlTGlzdGVuZXJbXSA9IFtdO1xuXG4gICAgcHVibGljIHRlbXBvOiBQcm9ncmVtVGVtcG8gPSBQcm9ncmVtVGVtcG8uQnlMaW5lO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IFByb2dyZW1Db25maWcsIHByaXZhdGUgY29kZTogUHJvZ3JlbUNvZGU8YW55Pikge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5yZXNldCgpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZVN0YXJ0SXRlcmF0aW5nQ29kZShsaXN0ZW5lcjogU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfSAgICBcblxuICAgIHN1YnNjcmliZUNvZGVFeGVjdXRpb24obGlzdGVuZXI6IENvZGVFeGVjdXRpb25MaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvZGVFeGVjdXRpb25MaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfSAgICBcbiAgICBcbiAgICBzdWJzY3JpYmVHcmlkQ2hhbmdlKGxpc3RlbmVyOiBHcmlkQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ncmlkQ2hhbmdlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZUxpbmVDaGFuZ2UobGlzdGVuZXI6IExpbmVDaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmxpbmVDaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlRnJhbWVDaGFuZ2UobGlzdGVuZXI6IEZyYW1lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mcmFtZUNoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICByZXNldCgpOiBQcm9ncmVtU3RhdGUge1xuICAgICAgICBsZXQgaW5pdGlhbENvbnRleHRlID0ge307XG4gICAgICAgIC8vIENhbGwganVzdCBldmFsdWF0ZWQgaW5pdGlhbGlzZXJQcm9ncmVtIGZ1bmN0aW9uXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaW5pdGlhbGlzZXJQcm9ncmVtKHRoaXMuY29uZmlnLCBpbml0aWFsQ29udGV4dGUpO1xuICAgICAgICBjb25zb2xlLmxvZygnTG9hZGVkIGluaXRpYWwgY29udGV4dGU6ICcsIGluaXRpYWxDb250ZXh0ZSk7XG4gICAgICAgIGxldCBzdGF0ZSA9IG5ldyBQcm9ncmVtU3RhdGUoMCwgMCwgMCwgaW5pdGlhbENvbnRleHRlLCBudWxsKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIGN1cnJlbnQoKTogUHJvZ3JlbVN0YXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxuXG4gICAgbmV4dCgpOiBQcm9ncmVtU3RhdGVbXSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZSkgdGhyb3cgbmV3IEVycm9yKCdJbmNvbnNpc3RlbnQgUHJvZ3JlbSBzdGF0ZSAhJyk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcblxuICAgICAgICBpZiAodGhpcy50ZW1wbyA9PT0gUHJvZ3JlbVRlbXBvLkJ5VmVyc2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvZGVJdGVyYXRvciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlSXRlcmF0b3IgPSB0aGlzLmNvZGUuaXRlcmF0b3IodGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlU3RhcnRJdGVyYXRpbmdDb2RlKHRoaXMuc3RhdGUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnaGFzTmV4dDonLCB0aGlzLmNvZGVJdGVyYXRvci5oYXNOZXh0KCkpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb2RlSXRlcmF0b3IuaGFzTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZlcnNlID0gdGhpcy5jb2RlSXRlcmF0b3IuZXhlY3V0ZU5leHQoKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSBuZXcgUHJvZ3JlbVN0YXRlKHRoaXMuc3RhdGUuY29sb25uZSwgdGhpcy5zdGF0ZS5saWduZSwgdGhpcy5zdGF0ZS5mcmFtZSwgdGhpcy5zdGF0ZS5jb250ZXh0ZSwgdmVyc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGVFeGVjdXRpb25MaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlQ29kZUV4ZWN1dGlvbihuZXdTdGF0ZSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbbmV3U3RhdGVdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdGaW5pc2hlZCBpdGVyYXRpbmcgb3ZlciBjb2RlLicpXG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgbGV0IG5vdGlmeVBpeGVsQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIGxldCBub3RpZnlMaW5lQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIGxldCBub3RpZnlGcmFtZUNoYW5nZSA9IGZhbHNlO1xuICAgICAgICBsZXQgYnVmZmVyZWRTdGF0ZXM6IFByb2dyZW1TdGF0ZVtdID0gW107XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGxldCBfY29sb25uZSA9IHRoaXMuc3RhdGUuY29sb25uZTtcbiAgICAgICAgICAgIGxldCBfbGlnbmUgPSB0aGlzLnN0YXRlLmxpZ25lO1xuICAgICAgICAgICAgbGV0IF9mcmFtZSA9IHRoaXMuc3RhdGUuZnJhbWU7XG5cbiAgICAgICAgICAgIF9jb2xvbm5lICsrO1xuICAgICAgICAgICAgbm90aWZ5UGl4ZWxDaGFuZ2UgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoX2NvbG9ubmUgPj0gdGhpcy5jb25maWcubm9tYnJlQ29sb25uZXMpIHtcbiAgICAgICAgICAgICAgICBfY29sb25uZSA9IDA7XG4gICAgICAgICAgICAgICAgX2xpZ25lICsrO1xuICAgICAgICAgICAgICAgIG5vdGlmeUxpbmVDaGFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoX2xpZ25lID49IHRoaXMuY29uZmlnLm5vbWJyZUxpZ25lcykge1xuICAgICAgICAgICAgICAgIF9saWduZSA9IDA7XG4gICAgICAgICAgICAgICAgX2ZyYW1lICsrO1xuICAgICAgICAgICAgICAgIG5vdGlmeUZyYW1lQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF9mcmFtZSA+PSB0aGlzLmNvbmZpZy5ub21icmVGcmFtZXMpIHtcbiAgICAgICAgICAgICAgICBfZnJhbWUgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSBuZXcgUHJvZ3JlbVN0YXRlKF9jb2xvbm5lLCBfbGlnbmUsIF9mcmFtZSwgdGhpcy5zdGF0ZS5jb250ZXh0ZSwgbnVsbCk7XG4gICAgXG4gICAgICAgICAgICBpZiAobm90aWZ5UGl4ZWxDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRDaGFuZ2VMaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlR3JpZENoYW5nZSh0aGlzLnN0YXRlKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChub3RpZnlMaW5lQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5lQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUxpbmVDaGFuZ2UodGhpcy5zdGF0ZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm90aWZ5RnJhbWVDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUZyYW1lQ2hhbmdlKHRoaXMuc3RhdGUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnVmZmVyZWRTdGF0ZXMucHVzaCh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgIC8vdGhpcy5jb2RlSXRlcmF0b3IgPSB0aGlzLmNvZGUuaXRlcmF0b3IobmV3U3RhdGUpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0gd2hpbGUodGhpcy50ZW1wbyA9PT0gUHJvZ3JlbVRlbXBvLkJ5TGluZSAmJiAhbm90aWZ5TGluZUNoYW5nZSB8fCB0aGlzLnRlbXBvID09PSBQcm9ncmVtVGVtcG8uQnlGcmFtZSAmJiAhbm90aWZ5RnJhbWVDaGFuZ2UpO1xuXG4gICAgICAgIHRoaXMuY29kZUl0ZXJhdG9yID0gbnVsbDtcblxuICAgICAgICByZXR1cm4gYnVmZmVyZWRTdGF0ZXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFByb2dyZW0oKTogUHJvZ3JlbUNvZGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvZGU7XG4gICAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFNjaGVkdWxpbmdTZXJ2aWNlIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFByb2dyZW1TY2hlZHVsZXIoY29uZmlnOiBQcm9ncmVtQ29uZmlnLCBjb2RlOiBQcm9ncmVtQ29kZTxhbnk+LCB0ZW1wbzogUHJvZ3JlbVRlbXBvKSB7XG4gICAgICAgIGxldCBzY2hlZHVsZXIgPSBuZXcgU2ltcGxlUHJvZ3JlbVNjaGVkdWxlcihjb25maWcsIGNvZGUpO1xuICAgICAgICBzY2hlZHVsZXIudGVtcG8gPSB0ZW1wbztcbiAgICAgICAgcmV0dXJuIHNjaGVkdWxlcjtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBTdHlsZURlY29yYXRvciB9IGZyb20gXCIuLi8uLi9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNlTm9kZSwgRnVuY3Rpb25EZWNsYXJhdGlvbiwgQmxvY2tTdGF0ZW1lbnQsIElmU3RhdGVtZW50LCBWYXJpYWJsZURlY2xhcmF0b3IsIFZhcmlhYmxlRGVjbGFyYXRpb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBFeHByZXNzaW9uU3RhdGVtZW50LCBSZXR1cm5TdGF0ZW1lbnQsIElkZW50aWZpZXIsIE1lbWJlckV4cHJlc3Npb24gfSBmcm9tIFwiZXN0cmVlXCI7XG5pbXBvcnQgeyBIdG1sSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvSHRtbEhlbHBlclwiO1xuaW1wb3J0IHsgRXNwcmltYUhlbHBlciB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFIZWxwZXJcIjtcbmltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcbmltcG9ydCB7IEVzcHJpbWFWZXJzZSwgRXNwcmltYUh0bWxDb3VwbGV0RmFjdG9yeSwgRXNwcmltYUNvdXBsZXQgfSBmcm9tIFwiLi4vLi4vZXNwcmltYS9Fc3ByaW1hVHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIEVzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkgaW1wbGVtZW50cyBFc3ByaW1hSHRtbENvdXBsZXRGYWN0b3J5IHtcblxuICAgIHByaXZhdGUgaHRtbFZlcnNlc01hcDogTWFwPEJhc2VOb2RlLCBIVE1MRWxlbWVudD4gPSBuZXcgTWFwKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb3VwbGV0OiBFc3ByaW1hQ291cGxldCxcbiAgICAgICAgcHJpdmF0ZSBkZWNvcmF0b3I6IFN0eWxlRGVjb3JhdG9yPEJhc2VOb2RlPlxuICAgICkge31cblxuICAgIGJ1aWxkQ291cGxldCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBodG1sQ291cGxldCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuY291cGxldC5mdW5jdGlvblJvb3ROb2RlKTtcbiAgICAgICAgaHRtbENvdXBsZXQuY2xhc3NMaXN0LmFkZCgncHJvZ3JlbS1pbnNwZWN0b3ItY29tcG9uZW50Jyk7XG4gICAgICAgIHJldHVybiBodG1sQ291cGxldDtcbiAgICB9XG5cbiAgICBnZXRIdG1sVmVyc2UodmVyc2U6IEVzcHJpbWFWZXJzZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKHRoaXMuaHRtbFZlcnNlc01hcC5zaXplID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWxTdGF0ZUVycm9yOiBjb3VwbGV0IG11c3QgYmUgYnVpbHQgYmVmb3JlIGNhbGxpbmcgZ2V0SHRtbFZlcnNlKCkgIScpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHRtbEVsZW1lbnQgPSB0aGlzLmh0bWxWZXJzZXNNYXAuZ2V0KHZlcnNlLm5vZGUpO1xuICAgICAgICBpZiAoIWh0bWxFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gSFRNTEVsZW1lbnQgZm91bmQgbWF0Y2hpbmcgdmVyc2U6JywgdmVyc2UsICchJylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gSFRNTEVsZW1lbnQgZm91bmQgbWF0Y2hpbmcgc3VwcGxpZWQgdmVyc2UgIWApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaHRtbEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGQgTm9kZSBhcHBseWluZyBkZWNvcmF0b3JzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBub2RlIHRoZSBub2RlIGZvciB3aGljaCB0byBwcm9kdWNlIEhUTUxcbiAgICAgKiBAcGFyYW0gc2libGluZ3MgdGhlIG5vZGVzIHRvIGFkZCBhcyBzaWJsaW5ncyBvZiB0aGUgbm9kZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBidWlsZE5vZGUobm9kZTogQmFzZU5vZGUgfCB1bmRlZmluZWQgfCBudWxsKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBIdG1sSGVscGVyLnNwYW4oJ2VtcHR5JywgJycpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzaWJsaW5nczogSFRNTEVsZW1lbnRbXSA9IFtdXG4gICAgICAgIGxldCBodG1sT3V0cHV0ID0gdGhpcy5idWlsZE5vZGVJbnRlcm5hbChub2RlLCBzaWJsaW5ncyk7XG4gICAgICAgIGh0bWxPdXRwdXQgPSB0aGlzLmRlY29yYXRvci5kZWNvcmF0ZShub2RlLCBodG1sT3V0cHV0KTtcblxuICAgICAgICBsZXQgbWF0Y2hpbmdWZXJzZSA9IHRoaXMuY291cGxldC52ZXJzZXMuZmluZCh2ID0+IHYubm9kZSA9PT0gbm9kZSk7XG4gICAgICAgIGlmIChtYXRjaGluZ1ZlcnNlKSB7XG4gICAgICAgICAgICBodG1sT3V0cHV0ID0gdGhpcy5lbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGh0bWxPdXRwdXQpO1xuICAgICAgICAgICAgLy8gVGhpcyBub2RlIGlzIHRoZSByb290IG5vZGUgb2YgYSBWZXJzZVxuICAgICAgICAgICAgdGhpcy5odG1sVmVyc2VzTWFwLnNldChtYXRjaGluZ1ZlcnNlLm5vZGUsIGh0bWxPdXRwdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpYmxpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIElmIHNpYmxpbmdzLCBidWlsZCBlYWNoIHNpYmxpbmdcbiAgICAgICAgICAgIGh0bWxPdXRwdXQgPSBIdG1sSGVscGVyLnNwYW4oJ3NpYmxpbmctY29udGFpbmVyJywgaHRtbE91dHB1dCk7XG4gICAgICAgICAgICB3aGlsZShzaWJsaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNpYmxpbmcgPSBzaWJsaW5ncy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIGlmIChzaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IHNpYmxpbmdPdXQgPSB0aGlzLmJ1aWxkTm9kZShzaWJsaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgaHRtbE91dHB1dC5hcHBlbmRDaGlsZChzaWJsaW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaHRtbE91dHB1dDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZW5jYXBzdWxhdGVOb2RlSW5WZXJzZUNvbnRhaW5lcihodG1sRWx0OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZlcnNlLWNvbnRlbnQnLCBodG1sRWx0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbigndmVyc2UgdmVyc2UtY29udGFpbmVyJywgY29udGVudCk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGQgbm9kZS5cbiAgICAgKiBAcGFyYW0gbm9kZSBcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYnVpbGROb2RlSW50ZXJuYWwobm9kZTogQmFzZU5vZGUsIHNpYmxpbmdzOiBIVE1MRWxlbWVudFtdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdCdWlsZGluZyBub2RlJywgbm9kZSwgJy4uLicpO1xuICAgICAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRGdW5jdGlvbkRlY2xhcmF0aW9uKG5vZGUsIHNpYmxpbmdzKTtcbiAgICAgICAgICAgIGNhc2UgJ0Jsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEJsb2NrU3RhdGVtZW50KG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnSWZTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkSWZTdGF0ZW1lbnQobm9kZSwgc2libGluZ3MpO1xuICAgICAgICAgICAgY2FzZSAnVmFyaWFibGVEZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRWYXJpYWJsZURlY2xhcmF0aW9uKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnVmFyaWFibGVEZWNsYXJhdG9yJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZFZhcmlhYmxlRGVjbGFyYXRvcihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEFzc2lnbm1lbnRFeHByZXNzaW9uKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnQmluYXJ5RXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRCaW5hcnlFeHByZXNzaW9uKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnRXhwcmVzc2lvblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRFeHByZXNzaW9uU3RhdGVtZW50KG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnUmV0dXJuU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZFJldHVyblN0YXRlbWVudChub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0lkZW50aWZpZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkSWRlbnRpZmllcihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ01lbWJlckV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkTWVtYmVyRXhwcmVzc2lvbihub2RlKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGREZWZhdWx0KG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkRnVuY3Rpb25EZWNsYXJhdGlvbihub2RlOiBCYXNlTm9kZSwgc2libGluZ3M6IEhUTUxFbGVtZW50W10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICBcbiAgICAgICAgbGV0IGRlY2xTdGFydEl0ZW1zOiAoc3RyaW5nIHwgSFRNTEVsZW1lbnQpW107XG4gICAgICAgIGlmIChuLmlkKSB7XG4gICAgICAgICAgICBsZXQgZnVuY0lkID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLWlkJywgbi5pZC5uYW1lKTtcbiAgICAgICAgICAgIGRlY2xTdGFydEl0ZW1zID0gWydmdW5jdGlvbiAnLCBmdW5jSWQsICcgKCAnXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlY2xTdGFydEl0ZW1zID0gWydmdW5jdGlvbiAoICddOy8vICsgZnVuYy5wYXJhbXMubWFwKHggPT4geC5uYW1lKS5qb2luKCcsICcpICsgJyApIHsnO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhcmFtQ291bnQgPSBuLnBhcmFtcy5sZW5ndGg7XG4gICAgICAgIG4ucGFyYW1zLmZvckVhY2goKHBhcmFtLCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEVzcHJpbWFIZWxwZXIucGF0dGVyblRvU3RyaW5nKHBhcmFtKTtcbiAgICAgICAgICAgIGxldCBmdW5jUGFyYW0gPSB0aGlzLmJ1aWxkTm9kZShwYXJhbSk7Ly9IdG1sSGVscGVyLnNwYW4oJ2Z1bmMtcGFyYW0nLCB2YXJOYW1lKTtcbiAgICAgICAgICAgIGRlY2xTdGFydEl0ZW1zLnB1c2goZnVuY1BhcmFtKTtcbiAgICAgICAgICAgIGlmIChpIDwgcGFyYW1Db3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICBkZWNsU3RhcnRJdGVtcy5wdXNoKCcsICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBkZWNsU3RhcnRJdGVtcy5wdXNoKCcgKSB7Jyk7XG5cbiAgICAgICAgbGV0IGRlY2xTdGFydCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1zdGFydCcsIGRlY2xTdGFydEl0ZW1zKTtcbiAgICAgICAgbGV0IGZ1bmNCb2R5ID0gdGhpcy5idWlsZE5vZGUobi5ib2R5KTtcbiAgICAgICAgbGV0IGRlY2xFbmQgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtZW5kJywgJ30nKTtcbiAgICAgICAgZGVjbEVuZCA9IHRoaXMuZW5jYXBzdWxhdGVOb2RlSW5WZXJzZUNvbnRhaW5lcihkZWNsRW5kKTtcbiAgICAgICAgLy9sZXQgZGVjbCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1kZWNsYXJhdGlvbicsIFtkZWNsU3RhcnQsIGZ1bmNCb2R5LCBkZWNsRW5kXSk7XG4gICAgICAgIGxldCBkZWNsID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLWRlY2xhcmF0aW9uJywgZGVjbFN0YXJ0KTtcbiAgICAgICAgc2libGluZ3MucHVzaChmdW5jQm9keSk7XG4gICAgICAgIHNpYmxpbmdzLnB1c2goZGVjbEVuZCk7XG4gICAgICAgIHJldHVybiBkZWNsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEJsb2NrU3RhdGVtZW50KG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgQmxvY2tTdGF0ZW1lbnQ7XG4gICAgICAgIGxldCBib2R5U3RhdGVtZW50cyA9IG4uYm9keS5tYXAoc3RhdGVtZW50ID0+IHRoaXMuYnVpbGROb2RlKHN0YXRlbWVudCkpXG4gICAgICAgIHJldHVybiBIdG1sSGVscGVyLnNwYW4oJ2Jsb2NrJywgYm9keVN0YXRlbWVudHMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZElmU3RhdGVtZW50KG5vZGU6IEJhc2VOb2RlLCBzaWJsaW5nczogSFRNTEVsZW1lbnRbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIElmU3RhdGVtZW50O1xuICAgICAgICBsZXQgY29udGVudDogSFRNTEVsZW1lbnRbXSA9IFtdXG4gICAgICAgIGxldCB0ZXN0ID0gdGhpcy5idWlsZE5vZGUobi50ZXN0KTtcbiAgICAgICAgbGV0IGlmU3RhcnRUZXh0ID0gWydpZiAoICcsIHRlc3QsICcgKSB7J107XG4gICAgICAgIGxldCBpZlN0YXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtc3RhdGVtZW50LXN0YXJ0JywgaWZTdGFydFRleHQpO1xuICAgICAgICBjb250ZW50LnB1c2goaWZTdGFydCk7XG5cbiAgICAgICAgbGV0IHRoZW5CbG9jayA9IHRoaXMuYnVpbGROb2RlKG4uY29uc2VxdWVudCk7XG4gICAgICAgIGxldCBpZlRoZW4gPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1ibG9jay10aGVuJywgdGhlbkJsb2NrKTtcbiAgICAgICAgY29udGVudC5wdXNoKGlmVGhlbik7XG4gICAgICAgIHNpYmxpbmdzLnB1c2godGhlbkJsb2NrKTtcblxuICAgICAgICBpZiAobi5hbHRlcm5hdGUpIHtcbiAgICAgICAgICAgIGxldCBpZkVsc2VEZWNsID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtc3RhdGVtZW50LWVsc2UnLCAnfSBlbHNlIHsnKTtcbiAgICAgICAgICAgIGlmRWxzZURlY2wgPSB0aGlzLmVuY2Fwc3VsYXRlTm9kZUluVmVyc2VDb250YWluZXIoaWZFbHNlRGVjbCk7XG4gICAgICAgICAgICBjb250ZW50LnB1c2goaWZFbHNlRGVjbCk7XG4gICAgICAgICAgICBzaWJsaW5ncy5wdXNoKGlmRWxzZURlY2wpO1xuXG4gICAgICAgICAgICBsZXQgZWxzZUJsb2NrID0gdGhpcy5idWlsZE5vZGUobi5hbHRlcm5hdGUpO1xuICAgICAgICAgICAgbGV0IGlmRWxzZSA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLWJsb2NrLWVsc2UnLCBlbHNlQmxvY2spO1xuICAgICAgICAgICAgY29udGVudC5wdXNoKGlmRWxzZSk7XG4gICAgICAgICAgICBzaWJsaW5ncy5wdXNoKGlmRWxzZSk7XG4gICAgICAgIH0gXG4gICAgICAgIGxldCBpZkVuZCA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLXN0YXRlbWVudC1lbmQnLCAnfScpO1xuICAgICAgICBpZkVuZCA9IHRoaXMuZW5jYXBzdWxhdGVOb2RlSW5WZXJzZUNvbnRhaW5lcihpZkVuZCk7XG4gICAgICAgIGNvbnRlbnQucHVzaChpZkVuZCk7XG4gICAgICAgIHNpYmxpbmdzLnB1c2goaWZFbmQpO1xuXG4gICAgICAgIC8vbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLXN0YXRlbWVudCcsIGNvbnRlbnQpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGlmU3RhcnQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkVmFyaWFibGVEZWNsYXJhdGlvbihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgIGxldCBkZWNsYXJhdGlvbnMgPSBuLmRlY2xhcmF0aW9ucy5tYXAoZCA9PiB0aGlzLmJ1aWxkTm9kZShkKSk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2RlY2xhcmF0aW9uIHZhcmlhYmxlLWRlY2xhcmF0aW9uJyk7XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBuLmtpbmQgKyAnICc7XG4gICAgICAgIGRlY2xhcmF0aW9ucy5mb3JFYWNoKGQgPT4gY29udGFpbmVyLmFwcGVuZENoaWxkKGQpKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRWYXJpYWJsZURlY2xhcmF0b3Iobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0b3I7XG4gICAgICAgIGxldCBsZWZ0UGFydCA9IHRoaXMuYnVpbGROb2RlKG4uaWQpO1xuICAgICAgICBsZXQgY29udGFpbmVyO1xuICAgICAgICBpZiAobi5pbml0KSB7XG4gICAgICAgICAgICBsZXQgYXNzaWduUGFydCA9IEh0bWxIZWxwZXIuc3Bhbignb3BlcmF0b3IgYXNzaWduLW9wZXJhdG9yJywgJz0nKTtcbiAgICAgICAgICAgIGxldCByaWdodCA9IHRoaXMuYnVpbGROb2RlKG4uaW5pdCk7XG4gICAgICAgICAgICBsZXQgcmlnaHRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS12YWx1ZScsIHJpZ2h0KTtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiB2YXJpYWJsZS1kZWNsYXJhdG9yJywgW2xlZnRQYXJ0LCBhc3NpZ25QYXJ0LCByaWdodFBhcnRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiB2YXJpYWJsZS1kZWNsYXJhdG9yJywgbGVmdFBhcnQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEFzc2lnbm1lbnRFeHByZXNzaW9uKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgQXNzaWdubWVudEV4cHJlc3Npb247XG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5idWlsZE5vZGUobi5sZWZ0KTtcbiAgICAgICAgbGV0IGxlZnRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS1pZCcsIGxlZnQpO1xuICAgICAgICBsZXQgYXNzaWduUGFydCA9IEh0bWxIZWxwZXIuc3Bhbignb3BlcmF0b3IgYXNzaWduLW9wZXJhdG9yJywgJz0nKTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5idWlsZE5vZGUobi5yaWdodCk7XG4gICAgICAgIGxldCByaWdodFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLXZhbHVlJywgcmlnaHQpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIGFzc2lnbm1lbnQtZXhwcmVzc2lvbicsIFtsZWZ0UGFydCwgYXNzaWduUGFydCwgcmlnaHRQYXJ0XSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkQmluYXJ5RXhwcmVzc2lvbihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEJpbmFyeUV4cHJlc3Npb247XG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5idWlsZE5vZGUobi5sZWZ0KTtcbiAgICAgICAgbGV0IGxlZnRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uJywgbGVmdCk7XG4gICAgICAgIGxldCBvcGVyYXRvclBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ29wZXJhdG9yIGV4cHJlc3Npb24tb3BlcmF0b3InLCBuLm9wZXJhdG9yKTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5idWlsZE5vZGUobi5yaWdodCk7XG4gICAgICAgIGxldCByaWdodFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24nLCByaWdodCk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gYmluYXJ5LWV4cHJlc3Npb24nLCBbbGVmdFBhcnQsIG9wZXJhdG9yUGFydCwgcmlnaHRQYXJ0XSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkRXhwcmVzc2lvblN0YXRlbWVudChub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEV4cHJlc3Npb25TdGF0ZW1lbnQ7XG4gICAgICAgIGxldCBjb2RlID0gdGhpcy5idWlsZE5vZGUobi5leHByZXNzaW9uKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGV4cHJlc3Npb24tc3RhdGVtZW50JywgY29kZSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkUmV0dXJuU3RhdGVtZW50KG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgUmV0dXJuU3RhdGVtZW50O1xuICAgICAgICBsZXQgYXJnID0gdGhpcy5idWlsZE5vZGUobi5hcmd1bWVudCk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCByZXR1cm4tc3RhdGVtZW50JywgWydyZXR1cm4gJywgYXJnXSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkSWRlbnRpZmllcihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIElkZW50aWZpZXI7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2lkZW50aWZpZXInLCBFc3ByaW1hSGVscGVyLnBhdHRlcm5Ub1N0cmluZyhuKSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkTWVtYmVyRXhwcmVzc2lvbihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIE1lbWJlckV4cHJlc3Npb247XG4gICAgICAgIGxldCBvYmplY3QgPSB0aGlzLmJ1aWxkTm9kZShuLm9iamVjdCk7XG4gICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMuYnVpbGROb2RlKG4ucHJvcGVydHkpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIG1lbWJlci1leHByZXNzaW9uJywgW29iamVjdCwgJy4nLCBwcm9wZXJ0eV0pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZERlZmF1bHQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2RlZmF1bHQ6Jywgbm9kZSk7XG4gICAgICAgIGxldCBjb2RlID0gZXNjb2RlR2VuZXJhdGUobm9kZSk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2RlZmF1bHQtJyArIG5vZGUudHlwZSwgY29kZSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxufSIsImltcG9ydCB7IFByb2dyZW1Db21wb25lbnQsIFByb2dyZW1TY2hlZHVsZXIsIEh0bWxDb3VwbGV0RmFjdG9yeSwgUHJvZ3JlbVN0YXRlLCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciB9IGZyb20gJy4uLy4uL2NvcmUvVHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudCBpbXBsZW1lbnRzIFByb2dyZW1Db21wb25lbnQsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyIHtcblxuICAgIHByaXZhdGUgZXhlY3V0aW5nRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcbiAgICBwcml2YXRlIGV4ZWN1dGVkRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVhFQ1VUSU5HX0NMQVNTID0gJ3ZlcnNlLWV4ZWN1dGluZyc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBFWEVDVVRFRF9DTEFTUyA9ICd2ZXJzZS1leGVjdXRlZCc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXIsXG4gICAgICAgIHByaXZhdGUgaHRtbEZhY3Rvcnk6IEh0bWxDb3VwbGV0RmFjdG9yeTxhbnk+XG4gICAgKSB7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVDb2RlRXhlY3V0aW9uKHRoaXMpO1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlR3JpZENoYW5nZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZW5kZXJIdG1sKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGh0bWxDb21wb25lbnQgPSB0aGlzLmh0bWxGYWN0b3J5LmJ1aWxkQ291cGxldCgpO1xuICAgICAgICByZXR1cm4gaHRtbENvbXBvbmVudDtcbiAgICB9XG4gICAgXG4gICAgZmlyZUNvZGVFeGVjdXRpb24oc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAoIXN0YXRlLnZlcnNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICBsZXQgaHRtbFZlcnNlID0gdGhpcy5odG1sRmFjdG9yeS5nZXRIdG1sVmVyc2Uoc3RhdGUudmVyc2UpO1xuICAgICAgICBpZihodG1sVmVyc2UpIHtcbiAgICAgICAgICAgIGh0bWxWZXJzZS5jbGFzc0xpc3QuYWRkKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VUSU5HX0NMQVNTKTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodGhpcy5leGVjdXRpbmdFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgZWx0ID0gdGhpcy5leGVjdXRpbmdFbGVtZW50cy5wb3AoKTtcbiAgICAgICAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVkRWxlbWVudHMucHVzaChlbHQpO1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QucmVtb3ZlKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VUSU5HX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LmFkZChQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVEVEX0NMQVNTKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWh0bWxWZXJzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5leGVjdXRpbmdFbGVtZW50cy5wdXNoKGh0bWxWZXJzZSk7XG4gICAgICAgIGh0bWxWZXJzZS5jbGFzc0xpc3QuYWRkKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VUSU5HX0NMQVNTKTtcbiAgICB9XG5cbiAgICBmaXJlR3JpZENoYW5nZShzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIHdoaWxlICh0aGlzLmV4ZWN1dGluZ0VsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBlbHQgPSB0aGlzLmV4ZWN1dGluZ0VsZW1lbnRzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKGVsdCkge1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QucmVtb3ZlKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VURURfQ0xBU1MpO1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QucmVtb3ZlKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VUSU5HX0NMQVNTKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlICh0aGlzLmV4ZWN1dGVkRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGVsdCA9IHRoaXMuZXhlY3V0ZWRFbGVtZW50cy5wb3AoKTtcbiAgICAgICAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVEVEX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IFN0eWxlRGVjb3JhdG9yLCBDb2xvclByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IEJhc2VOb2RlLCBJZGVudGlmaWVyIH0gZnJvbSBcImVzdHJlZVwiO1xuXG5pbXBvcnQgeyBDb2xvclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9Db2xvclNlcnZpY2VcIjtcbmltcG9ydCB7IEVzcHJpbWFIZWxwZXIgfSBmcm9tIFwiLi4vLi4vZXNwcmltYS9Fc3ByaW1hSGVscGVyXCI7XG5pbXBvcnQgeyBIdG1sSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvSHRtbEhlbHBlclwiO1xuXG5leHBvcnQgY2xhc3MgQ29sb3JWYXJpYWJsZVNjb3BlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8c3RyaW5nPiB7XG5cbiAgICBwcml2YXRlIHZhcmlhYmxlTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgY29sb3JQcm92aWRlcjogQ29sb3JQcm92aWRlciA9IENvbG9yU2VydmljZS5jb2xvclByb3ZpZGVyYWN0b3J5LmJ1aWxkKCk7XG5cbiAgICBkZWNvcmF0ZSh2YXJJZDogc3RyaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IHZhckluZGV4ID0gdGhpcy52YXJpYWJsZU1hcC5nZXQodmFySWQpO1xuICAgICAgICBpZiAoIXZhckluZGV4KSB7XG4gICAgICAgICAgICB2YXJJbmRleCA9IHRoaXMudmFyaWFibGVNYXAuc2l6ZSArIDE7XG4gICAgICAgICAgICB0aGlzLnZhcmlhYmxlTWFwLnNldCh2YXJJZCwgdmFySW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd2YXJpYWJsZS1oaW50Jyk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndmFyaWFibGUtJyArIHZhckluZGV4KTtcbiAgICAgICAgXG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLWhpbnQtY29udGFpbmVyJywgZWxlbWVudCk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfSAgICBcbiAgICBcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHN0eWxlID0gJyc7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ3ZhcmlhYmxlIGNvdW50OicsIHRoaXMudmFyaWFibGVNYXAuc2l6ZSk7XG4gICAgICAgIHRoaXMudmFyaWFibGVNYXAuZm9yRWFjaCgoaW5kZXgsIGlkKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmNvbG9yUHJvdmlkZXIuaGFzaFN0cmluZ1RvQ29sb3IoaWQsIDE2KTsgLy90aGlzLnZhcmlhYmxlTWFwLnNpemVcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2J1aWxkaW5nIGNvbG9yICMnLCBpZCwgJz0+JywgY29sb3IpO1xuICAgICAgICAgICAgc3R5bGUgKz0gYFxuICAgICAgICAgICAgICAgIC52YXJpYWJsZS1zY29wZS1jb21wb25lbnQgLnZhcmlhYmxlLWhpbnQtY29udGFpbmVyIHtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAwLjhlbSAwIDAuOGVtIDA7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAudmFyaWFibGUtc2NvcGUtY29tcG9uZW50IC52YXJpYWJsZS1oaW50IHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMC4xZW0gMC41ZW0gMC4xZW0gMC41ZW07XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwLjhlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLnZhcmlhYmxlLXNjb3BlLWNvbXBvbmVudCAudmFyaWFibGUtJHtpbmRleH0sIFxuICAgICAgICAgICAgICAgIC52YXJpYWJsZS1zY29wZS1jb21wb25lbnQgLnZhcmlhYmxlLSR7aW5kZXh9IHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcn07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYWRWZXJzZURlY29yYXRvciBpbXBsZW1lbnRzIFN0eWxlRGVjb3JhdG9yPEJhc2VOb2RlPiB7XG5cbiAgICBkZWNvcmF0ZShub2RlOiBCYXNlTm9kZSwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdCbG9ja1N0YXRlbWVudCcpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY29kZS1wYWRkaW5nJylcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0gICAgXG4gICAgXG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgIC5jb2RlLXBhZGRpbmcge1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDMycHg7XG4gICAgICAgIH1cbiAgICAgICAgYDtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcbmltcG9ydCB7IFNjaGVkdWxpbmdTZXJ2aWNlIH0gZnJvbSAnLi9TY2hlZHVsaW5nU2VydmljZSc7XG5pbXBvcnQgeyBQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL1Byb2dyZW1JbnNwZWN0b3JDb21wb25lbnQnO1xuaW1wb3J0IHsgU2NyZWVuQ29uZmlnIH0gZnJvbSAnLi9TY3JlZW5TZXJ2aWNlJztcbmltcG9ydCB7IEJhc2VOb2RlIH0gZnJvbSAnZXN0cmVlJztcbmltcG9ydCB7IFN0eWxlRGVjb3JhdG9yQWdncmVnYXRpb24sIFByb2dyZW1TY2hlZHVsZXIsIFByb2dyZW1Db2RlLCBQcm9ncmVtVGVtcG8sIFByb2dyZW1Db25maWcgfSBmcm9tICcuL1R5cGVzJztcbmltcG9ydCB7IFBhZFZlcnNlRGVjb3JhdG9yLCBDb2xvclZlcnNlVmFyaWFibGVEZWNvcmF0b3IgfSBmcm9tICcuLi9jb21wb25lbnRzL3Byb2dyZW1JbnNwZWN0b3IvRXNwcmltYVByb2dyZW1JbnNwZWN0b3JTdHlsZURlY29yYXRvcnMnO1xuaW1wb3J0IHsgSHRtbEhlbHBlciB9IGZyb20gJy4vSHRtbEhlbHBlcic7XG5pbXBvcnQgeyBFc3ByaW1hUHJvZ3JlbUluc3BlY3Rvckh0bWxGYWN0b3J5IH0gZnJvbSAnLi4vY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnknO1xuaW1wb3J0IHsgQ29kZVNlcnZpY2UgfSBmcm9tICcuL0NvZGVTZXJ2aWNlJztcbmltcG9ydCB7IFByb2dyZW1HcmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9wcm9ncmVtR3JpZC9Qcm9ncmVtR3JpZENvbXBvbmVudCc7XG5pbXBvcnQgeyBWYXJpYWJsZVNjb3BlQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy92YXJpYWJsZVNjb3BlL1ZhcmlhYmxlU2NvcGVDb21wb25lbnQnO1xuaW1wb3J0IHsgRXNwcmltYVZhcmlhYmxlU2NvcGVIdG1sRmFjdG9yeSB9IGZyb20gJy4uL2NvbXBvbmVudHMvdmFyaWFibGVTY29wZS9Fc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5JztcbmltcG9ydCB7IENvbG9yVmFyaWFibGVTY29wZURlY29yYXRvciB9IGZyb20gJy4uL2NvbXBvbmVudHMvdmFyaWFibGVTY29wZS9Fc3ByaW1hVmFyaWFibGVTY29wZVN0eWxlRGVjb3JhdG9ycyc7XG5pbXBvcnQgeyBQcm9ncmVtRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9wcm9ncmVtRWRpdG9yL1Byb2dyZW1FZGl0b3JDb21wb25lbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcm9ncmVtSGVscGVyIHtcblxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFByb2dyZW1TZXJ2aWNlIHtcblxuICAgIHZhciBwcmV2aW91c1JlcGFpbnRUaW1lID0gMDtcbiAgICB2YXIgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyO1xuICAgIHZhciBwcm9ncmVtQW5pbWF0aW9uU3BlZWQgPSAyO1xuICAgIHZhciBwcm9ncmVtQW5pbWF0aW9uSW50ZXJ2YWxzID0gWzYwMDAwLCA1MDAwLCAxMDAwLCA1MDAsIDEwMCwgMTAsIDFdO1xuICAgIHZhciBwcm9ncmVtTW9kZSA9IFByb2dyZW1UZW1wby5CeUxpbmU7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGREZWZhdWx0Q29uZmlnKCk6IFByb2dyZW1Db25maWcge1xuICAgICAgICByZXR1cm4gbmV3IFByb2dyZW1Db25maWcoJ1NhbnMgdGl0cmUnLCAxNywgMTcsIDEpO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBjdXJyZW50U2NoZWR1bGVyKCk6IFByb2dyZW1TY2hlZHVsZXIge1xuICAgICAgICByZXR1cm4gc2NoZWR1bGVyO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFByb2dyZW1HcmlkQ29tcG9uZW50KHNjcmVlbkNvbmZpZzogU2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnOiBQcm9ncmVtQ29uZmlnLCBjb250YWluZXI6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgbGV0IHByb2dyZW1HcmlkQ29tcG9uZW50ID0gbmV3IFByb2dyZW1HcmlkQ29tcG9uZW50KHNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZywgc2NoZWR1bGVyLCBkb2N1bWVudCk7XG4gICAgICAgIGxldCBwcm9ncmVtR3JpZEh0bWwgPSBwcm9ncmVtR3JpZENvbXBvbmVudC5yZW5kZXJIdG1sKCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9ncmVtR3JpZEh0bWwpO1xuXG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudChwcm9ncmVtQ29kZTogUHJvZ3JlbUNvZGU8YW55PiwgY29udGFpbmVyOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGxldCBwcm9ncmVtQ291cGxldCA9IHByb2dyZW1Db2RlLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKTtcbiAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JEZWNvcmF0b3JzID0gbmV3IFN0eWxlRGVjb3JhdG9yQWdncmVnYXRpb248QmFzZU5vZGU+KFtcbiAgICAgICAgICAgIG5ldyBQYWRWZXJzZURlY29yYXRvcigpLFxuICAgICAgICAgICAgbmV3IENvbG9yVmVyc2VWYXJpYWJsZURlY29yYXRvcigpLFxuICAgICAgICAgICAgLy9uZXcgSGlnaGxpZ2h0RXhlY3V0aW5nVmVyc2VEZWNvcmF0b3Ioc2NoZWR1bGVyKSxcbiAgICAgICAgXSk7XG4gICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9yRmFjdG9yeSA9IG5ldyBFc3ByaW1hUHJvZ3JlbUluc3BlY3Rvckh0bWxGYWN0b3J5KHByb2dyZW1Db3VwbGV0LCBwcm9ncmVtSW5zcGVjdG9yRGVjb3JhdG9ycyk7XG4gICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9yVmlldyA9IG5ldyBQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50KHNjaGVkdWxlciwgcHJvZ3JlbUluc3BlY3RvckZhY3RvcnkpO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2NvZGVFbGVtZW50JywgY29kZUVsZW1lbnQpO1xuICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3Rvckh0bWwgPSBwcm9ncmVtSW5zcGVjdG9yVmlldy5yZW5kZXJIdG1sKCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9ncmVtSW5zcGVjdG9ySHRtbCk7XG5cbiAgICAgICAgbGV0IGRlY29yYXRvclN0eWxlID0gcHJvZ3JlbUluc3BlY3RvckRlY29yYXRvcnMuYnVpbGRTdHlsZVNoZWV0KCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2RlY29yYXRvclN0eWxlOicsIGRlY29yYXRvclN0eWxlKVxuICAgICAgICBIdG1sSGVscGVyLmRlZmluZUNzc1J1bGVzKCdwcm9ncmVtLWluc3BlY3Rvci1jb21wb25lbnQnLCBkZWNvcmF0b3JTdHlsZSk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkVmFyaWFibGVTY29wZUNvbXBvbmVudChwcm9ncmVtQ29kZTogUHJvZ3JlbUNvZGU8YW55PiwgY29udGFpbmVyOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGxldCBwcm9ncmVtQ291cGxldCA9IHByb2dyZW1Db2RlLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKTtcbiAgICAgICAgbGV0IHZhcmlhYmxlU2NvcGVEZWNvcmF0b3JzID0gbmV3IFN0eWxlRGVjb3JhdG9yQWdncmVnYXRpb248c3RyaW5nPihbXG4gICAgICAgICAgICBuZXcgQ29sb3JWYXJpYWJsZVNjb3BlRGVjb3JhdG9yKClcbiAgICAgICAgXSlcbiAgICAgICAgbGV0IGh0bWxGYWN0b3J5ID0gbmV3IEVzcHJpbWFWYXJpYWJsZVNjb3BlSHRtbEZhY3RvcnkocHJvZ3JlbUNvdXBsZXQsIHZhcmlhYmxlU2NvcGVEZWNvcmF0b3JzLCBzY2hlZHVsZXIpO1xuICAgICAgICBsZXQgdmFyaWFibGVTY29wZUNvbXBvbmVudCA9IG5ldyBWYXJpYWJsZVNjb3BlQ29tcG9uZW50KHNjaGVkdWxlciwgaHRtbEZhY3RvcnkpO1xuICAgICAgICBsZXQgdmFyaWFibGVTY29wZUh0bWwgPSB2YXJpYWJsZVNjb3BlQ29tcG9uZW50LnJlbmRlckh0bWwoKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHZhcmlhYmxlU2NvcGVIdG1sKTtcblxuICAgICAgICBsZXQgZGVjb3JhdG9yU3R5bGUgPSB2YXJpYWJsZVNjb3BlRGVjb3JhdG9ycy5idWlsZFN0eWxlU2hlZXQoKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnZGVjb3JhdG9yU3R5bGU6JywgZGVjb3JhdG9yU3R5bGUpXG4gICAgICAgIEh0bWxIZWxwZXIuZGVmaW5lQ3NzUnVsZXMoJ3ZhcmlhYmxlLXNjb3BlLWNvbXBvbmVudCcsIGRlY29yYXRvclN0eWxlKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtRWRpdG9yQ29tcG9uZW50KHByb2dyZW1Db2RlOiBQcm9ncmVtQ29kZTxhbnk+LCBzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZyk6IHZvaWQge1xuICAgICAgICBsZXQgcHJvZ3JlbUVkaXRvckNvbXBvbmVudCA9IG5ldyBQcm9ncmVtRWRpdG9yQ29tcG9uZW50KCk7XG4gICAgICAgIHByb2dyZW1FZGl0b3JDb21wb25lbnQuYXR0YWNoKGRvY3VtZW50KTtcbiAgICAgICAgcHJvZ3JlbUVkaXRvckNvbXBvbmVudC5sb2FkUHJvZ3JlbShwcm9ncmVtQ29kZSk7XG4gICAgICAgIHByb2dyZW1FZGl0b3JDb21wb25lbnQuYmluZFJlZnJlc2goY29kZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbmV3IHByb2dyZW0gY29kZTonLCBjb2RlKTtcbiAgICAgICAgICAgIGxldCBwcm9ncmVtQ29kZSA9IENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkUHJvZ3JlbShjb2RlKTtcblxuICAgICAgICAgICAgbGV0IHNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZ3JlbS1zY3JpcHQtdGFnJykgYXMgSFRNTFNjcmlwdEVsZW1lbnQ7XG4gICAgICAgICAgICBzY3JpcHRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgc2NyaXB0RWxlbWVudC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgICAgICAgICBzY3JpcHRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Byb2dyZW0tc2NyaXB0LXRhZycpXG4gICAgICAgICAgICBzY3JpcHRFbGVtZW50LnRleHQgPSBjb2RlO1xuICAgICAgICAgICAgbGV0IGJvZHlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICAgICAgICAgaWYgKGJvZHlFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgYm9keUVsZW1lbnQuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidWlsZFByb2dyZW1WaWV3ZXIocHJvZ3JlbUNvZGUsIHNjcmVlbkNvbmZpZywgYnVpbGREZWZhdWx0Q29uZmlnKCkpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFByb2dyZW1WaWV3ZXIocHJvZ3JlbUNvZGU6IFByb2dyZW1Db2RlPGFueT4sIHNjcmVlbkNvbmZpZzogU2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnOiBQcm9ncmVtQ29uZmlnKSB7XG4gICAgICAgIC8vIExvYWQgaW5pdFByb2dyZW0gRnVuY3Rpb24gY29kZVxuICAgICAgICBsZXQgaW5pdFByb2dyZW1GdW5jdGlvbkNvZGUgPSBlc2NvZGVHZW5lcmF0ZShwcm9ncmVtQ29kZS5pbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpLmZ1bmN0aW9uUm9vdE5vZGUpO1xuICAgICAgICAod2luZG93IGFzIGFueSkuZXZhbChpbml0UHJvZ3JlbUZ1bmN0aW9uQ29kZSk7XG5cbiAgICAgICAgc2NoZWR1bGVyID0gU2NoZWR1bGluZ1NlcnZpY2UuYnVpbGRQcm9ncmVtU2NoZWR1bGVyKHByb2dyZW1Db25maWcsIHByb2dyZW1Db2RlLCBwcm9ncmVtTW9kZSk7XG4gICAgICAgIGNvbnN0IHRpdHJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpdHJlJyk7XG4gICAgICAgIGlmICh0aXRyZSkge1xuICAgICAgICAgICAgdGl0cmUuaW5uZXJIVE1MID0gcHJvZ3JlbUNvbmZpZy50aXRyZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9ncmVtR3JpZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCcucHJvZ3JlbS1ncmlkLWNvbXBvbmVudCcpO1xuICAgICAgICBpZiAocHJvZ3JlbUdyaWRDb250YWluZXIpIHtcbiAgICAgICAgICAgIGJ1aWxkUHJvZ3JlbUdyaWRDb21wb25lbnQoc2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnLCBwcm9ncmVtR3JpZENvbnRhaW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3RvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCcucHJvZ3JlbS1pbnNwZWN0b3ItY29tcG9uZW50Jyk7XG4gICAgICAgIGlmIChwcm9ncmVtSW5zcGVjdG9yQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBidWlsZFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQocHJvZ3JlbUNvZGUsIHByb2dyZW1JbnNwZWN0b3JDb250YWluZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhcmlhYmxlU2NvcGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignLnZhcmlhYmxlLXNjb3BlLWNvbXBvbmVudCcpO1xuICAgICAgICBpZiAodmFyaWFibGVTY29wZUNvbnRhaW5lcikge1xuICAgICAgICAgICAgYnVpbGRWYXJpYWJsZVNjb3BlQ29tcG9uZW50KHByb2dyZW1Db2RlLCB2YXJpYWJsZVNjb3BlQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZENvbnRyb2xQYW5lbENvbXBvbmVudCgpIHtcbiAgICAgICAgbGV0IHNwZWVkQ29udHJvbEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29udHJvbC1wYW5lbC1jb21wb25lbnQgLnNwZWVkLXNlbGVjdG9yYClhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICBzcGVlZENvbnRyb2xFbGVtZW50LnZhbHVlID0gU3RyaW5nKHByb2dyZW1BbmltYXRpb25TcGVlZCk7XG4gICAgICAgIGxldCBzcGVlZFNlbGVjdG9yT2JzZXJ2YWJsZSA9IE9ic2VydmFibGUuZnJvbUV2ZW50KHNwZWVkQ29udHJvbEVsZW1lbnQsICdjaGFuZ2UnKTtcbiAgICAgICAgc3BlZWRTZWxlY3Rvck9ic2VydmFibGUuc3Vic2NyaWJlKGV2ZW50ID0+IHByb2dyZW1BbmltYXRpb25TcGVlZCA9IE51bWJlcigoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKSk7XG5cbiAgICAgICAgbGV0IG1vZGVDb250cm9sRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jb250cm9sLXBhbmVsLWNvbXBvbmVudCAubW9kZS1zZWxlY3RvcmApYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgbW9kZUNvbnRyb2xFbGVtZW50LnZhbHVlID0gU3RyaW5nKHNjaGVkdWxlci50ZW1wbyk7XG4gICAgICAgIGxldCBtb2RlU2VsZWN0b3JPYnNlcnZhYmxlID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQobW9kZUNvbnRyb2xFbGVtZW50LCAnY2hhbmdlJyk7XG4gICAgICAgIG1vZGVTZWxlY3Rvck9ic2VydmFibGUuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHByb2dyZW1Nb2RlID0gTnVtYmVyKChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpO1xuICAgICAgICAgICAgY3VycmVudFNjaGVkdWxlcigpLnRlbXBvID0gcHJvZ3JlbU1vZGU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFByb2dyZW0odXJsOiBzdHJpbmcsIHNjcmVlbkNvbmZpZzogU2NyZWVuQ29uZmlnKSB7XG4gICAgICAgIGxldCBwcm9ncmVtQ29uZmlnID0gYnVpbGREZWZhdWx0Q29uZmlnKCk7XG4gICAgICAgIGxldCBwcm9ncmVtU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHByb2dyZW1TY3JpcHQuY2xhc3NMaXN0LmFkZCgncHJvZ3JlbS1zY3JpcHQtdGFnJylcbiAgICAgICAgcHJvZ3JlbVNjcmlwdC5zcmMgPSB1cmw7XG4gICAgICAgIGxldCBib2R5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgICAgaWYgKGJvZHlFbGVtZW50KSB7XG4gICAgICAgICAgICBib2R5RWxlbWVudC5hcHBlbmRDaGlsZChwcm9ncmVtU2NyaXB0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIENvZGVTZXJ2aWNlLmxvYWRQcm9ncmVtKHVybCkudGhlbihjb2RlID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9ncmVtQ29kZSA9IENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkUHJvZ3JlbShjb2RlKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYnVpbGRQcm9ncmVtVmlld2VyKHByb2dyZW1Db2RlLCBzY3JlZW5Db25maWcsIHByb2dyZW1Db25maWcpO1xuXG4gICAgICAgICAgICBidWlsZENvbnRyb2xQYW5lbENvbXBvbmVudCgpO1xuXG4gICAgICAgICAgICBidWlsZFByb2dyZW1FZGl0b3JDb21wb25lbnQocHJvZ3JlbUNvZGUsIHNjcmVlbkNvbmZpZyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRpbWVyKDApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0aW1lcih0aW1lc3RhbXA6IG51bWJlcikge1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpbWVyKTtcblxuICAgICAgICBpZiAodGltZXN0YW1wIC0gcHJldmlvdXNSZXBhaW50VGltZSA8IHByb2dyZW1BbmltYXRpb25JbnRlcnZhbHNbcHJvZ3JlbUFuaW1hdGlvblNwZWVkXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJldmlvdXNSZXBhaW50VGltZSA9IHRpbWVzdGFtcDtcblxuICAgICAgICBpZiAoc2NoZWR1bGVyKSB7XG4gICAgICAgICAgICBzY2hlZHVsZXIubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgU3R5bGVEZWNvcmF0b3IsIFByb2dyZW1TY2hlZHVsZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgQmFzZU5vZGUsIEZ1bmN0aW9uRGVjbGFyYXRpb24sIEJsb2NrU3RhdGVtZW50LCBJZlN0YXRlbWVudCwgVmFyaWFibGVEZWNsYXJhdG9yLCBWYXJpYWJsZURlY2xhcmF0aW9uLCBBc3NpZ25tZW50RXhwcmVzc2lvbiwgQmluYXJ5RXhwcmVzc2lvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgUmV0dXJuU3RhdGVtZW50LCBJZGVudGlmaWVyLCBNZW1iZXJFeHByZXNzaW9uIH0gZnJvbSBcImVzdHJlZVwiO1xuaW1wb3J0IHsgSHRtbEhlbHBlciB9IGZyb20gXCIuLi8uLi9jb3JlL0h0bWxIZWxwZXJcIjtcbmltcG9ydCB7IEVzcHJpbWFIZWxwZXIgfSBmcm9tIFwiLi4vLi4vZXNwcmltYS9Fc3ByaW1hSGVscGVyXCI7XG5pbXBvcnQgeyBFc3ByaW1hVmVyc2UsIEVzcHJpbWFIdG1sQ291cGxldEZhY3RvcnksIEVzcHJpbWFDb3VwbGV0IH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYVR5cGVzXCI7XG5pbXBvcnQgeyBzdHJpbmdpZnkgfSBmcm9tIFwicXVlcnlzdHJpbmdcIjtcblxuZXhwb3J0IGNsYXNzIEVzcHJpbWFWYXJpYWJsZVNjb3BlSHRtbEZhY3RvcnkgaW1wbGVtZW50cyBFc3ByaW1hSHRtbENvdXBsZXRGYWN0b3J5IHtcblxuICAgIHByaXZhdGUgdmFySGludEJ5VmVyc2VzTWFwOiBNYXA8QmFzZU5vZGUsIEhUTUxFbGVtZW50W10+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgdmFySGludFVwZGF0ZXJNYXA6IE1hcDxCYXNlTm9kZSwgKHZhbHVlOiBhbnkpID0+IHZvaWQ+ID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY291cGxldDogRXNwcmltYUNvdXBsZXQsXG4gICAgICAgIHByaXZhdGUgZGVjb3JhdG9yOiBTdHlsZURlY29yYXRvcjxzdHJpbmc+LFxuICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogUHJvZ3JlbVNjaGVkdWxlclxuICAgICkge31cblxuICAgIGJ1aWxkQ291cGxldCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLXNjb3BlLWNvbXBvbmVudCcpXG5cbiAgICAgICAgLy8gRklYTUUgaWwgZmF1ZHJhaXQgcGFyY291cmlyIGwnYXJicmUgQVNUIGF2ZWMgdW4gd2Fsa2VyIG91IHVuIHRydWMgZHUgZ2VucmUuXG4gICAgICAgIC8vIEZJWE1FIGdyb3MgaGFjayBkdSBzeXN0w6htZSBkZSBIdG1sRmFjdG9yeSBldCBkZSBEZWNvcmF0b3IgcG91ciByZWFsaXNlciBjZSBjb21wb3NhbnQuXG4gICAgICAgIC8vIEJ1aWxkIGFsbCBWYXJpYWJsZUhpbnQgd2hpY2ggd2lsbCBiZSBhZGRlZCBpbiB2aWV3IGNvbnRhaW5lciBvbmUgYnkgb25lIGJ5IGdldEh0bWxWZXJzZSgpXG4gICAgICAgIHRoaXMuY291cGxldC52ZXJzZXMuZm9yRWFjaCh2ID0+IHtcbiAgICAgICAgICAgIGxldCB2YXJIaW50cyA9IHRoaXMuYnVpbGRWYXJpYWJsZUhpbnRzKHYubm9kZSk7XG4gICAgICAgICAgICBsZXQgZGVjb3JhdGVkVmFySGludHM6IEhUTUxFbGVtZW50W10gPSBbXTtcbiAgICAgICAgICAgIHZhckhpbnRzLmZvckVhY2goKHZhckhpbnQsIHZhck5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZGVjb3JhdGVkID0gdGhpcy5kZWNvcmF0b3IuZGVjb3JhdGUodmFyTmFtZSwgdmFySGludCk7XG4gICAgICAgICAgICAgICAgZGVjb3JhdGVkVmFySGludHMucHVzaChkZWNvcmF0ZWQpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWNvcmF0ZWQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMudmFySGludEJ5VmVyc2VzTWFwLnNldCh2Lm5vZGUsIGRlY29yYXRlZFZhckhpbnRzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jbGVhclZpZXcoKTtcblxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH0gICAgXG4gICAgXG4gICAgZ2V0SHRtbFZlcnNlKHZlcnNlOiBFc3ByaW1hVmVyc2UpOiBIVE1MRWxlbWVudHx1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy52YXJIaW50QnlWZXJzZXNNYXAuc2l6ZSA9PT0gMCB8fCAhdmVyc2Uubm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0bWxFbGVtZW50cyA9IHRoaXMudmFySGludEJ5VmVyc2VzTWFwLmdldCh2ZXJzZS5ub2RlKTtcbiAgICAgICAgaWYgKCFodG1sRWxlbWVudHMgfHwgaHRtbEVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5zY2hlZHVsZXIuY3VycmVudCgpO1xuICAgICAgICBsZXQgdmFsdWVzTWFwID0gRXNwcmltYUhlbHBlci5nZXRWYXJpYWJsZVZhbHVlcyhzdGF0ZSwgdmVyc2Uubm9kZSk7XG4gICAgICAgIGxldCB2YXJIaW50VXBkYXRlciA9IHRoaXMudmFySGludFVwZGF0ZXJNYXAuZ2V0KHZlcnNlLm5vZGUpO1xuICAgICAgICBpZiAodmFySGludFVwZGF0ZXIpIHtcbiAgICAgICAgICAgIHZhckhpbnRVcGRhdGVyKHZhbHVlc01hcCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIFNob3cgZWxlbWVudHNcbiAgICAgICAgaHRtbEVsZW1lbnRzLmZvckVhY2goaGludCA9PiBoaW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpKTtcblxuICAgICAgICAvL2xldCB2ZXJzZUNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbigndmVyc2UtY29udGFpbmVyJywgaHRtbEVsZW1lbnRzKTtcbiAgICAgICAgLy9yZXR1cm4gdmVyc2VDb250YWluZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyVmlldygpOiB2b2lkIHtcbiAgICAgICAgLy8gSGlkZSBlbGVtZW50c1xuICAgICAgICB0aGlzLnZhckhpbnRCeVZlcnNlc01hcC5mb3JFYWNoKGhpbnRzID0+IGhpbnRzLmZvckVhY2goaGludCA9PiBoaW50LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpKSk7XG4gICAgICAgIC8vIFJlc2V0IHZhbHVlXG4gICAgICAgIHRoaXMudmFySGludFVwZGF0ZXJNYXAuZm9yRWFjaCgodmFySGludFVwZGF0ZXIsIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFySGludFVwZGF0ZXIobmV3IE1hcCgpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGQgYSBWYXJpYWJsZSBIaW50IGlmIHRoZSBzdXBwbGllZCBub2RlIGNvbnRhaW5zIGEgVmFyaWFibGUgYWZmZWN0YXRpb24uXG4gICAgICogQHBhcmFtIG5vZGVcbiAgICAgKiBAcmV0dXJucyBhbiBIVE1MRWxlbWVudCBvciBudWxsIGlmIG5vIGhpbnQgc2hvdWxkIGFwcGVhciBmb3IgdGhpcyBub2RlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGJ1aWxkVmFyaWFibGVIaW50cyhub2RlOiBCYXNlTm9kZSk6IE1hcDxzdHJpbmcsIEhUTUxFbGVtZW50PiB7XG4gICAgICAgIGxldCB2YXJOb2RlID0gRXNwcmltYUhlbHBlci5yZWR1Y2VOb2RlVG9WYXJEZWNsYXJhdGlvbihub2RlKTtcbiAgICAgICAgaWYgKCF2YXJOb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1hcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhck5hbWVzID0gRXNwcmltYUhlbHBlci5nZXRWYXJpYWJsZU5hbWVzKHZhck5vZGUpO1xuICAgICAgICBsZXQgdmFySGludHMgPSB2YXJOYW1lcy5tYXAodmFyTmFtZSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFyVmFsdWUgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLWhpbnQtdmFsdWUnKTtcbiAgICAgICAgICAgIGxldCB2YXJIaW50ID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS1oaW50JywgW2Ake3Zhck5hbWV9OiBgLCB2YXJWYWx1ZV0pO1xuICAgICAgICAgICAgcmV0dXJuIHt2YXJOYW1lLCB2YXJIaW50LCB2YXJWYWx1ZX07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCB2YWxVcGRhdGVyID0gKHZhbHNCeVZhck5hbWU6IE1hcDxzdHJpbmcsIGFueT4pID0+IHtcbiAgICAgICAgICAgIHZhckhpbnRzLmZvckVhY2godmFySGludCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IHZhbHNCeVZhck5hbWUuZ2V0KHZhckhpbnQudmFyTmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhckhpbnQudmFyVmFsdWUuaW5uZXJUZXh0ID0gdmFsLnRvRml4ZWQoMikudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXJIaW50LnZhclZhbHVlLmlubmVyVGV4dCA9IHZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy52YXJIaW50VXBkYXRlck1hcC5zZXQobm9kZSwgdmFsVXBkYXRlcik7XG5cbiAgICAgICAgbGV0IHZhckhpbnRzQnlOYW1lID0gbmV3IE1hcDxzdHJpbmcsIEhUTUxFbGVtZW50PigpO1xuICAgICAgICB2YXJIaW50cy5mb3JFYWNoKHZhckhpbnQgPT4gdmFySGludHNCeU5hbWUuc2V0KHZhckhpbnQudmFyTmFtZSwgdmFySGludC52YXJIaW50KSk7XG5cbiAgICAgICAgcmV0dXJuIHZhckhpbnRzQnlOYW1lO1xuICAgIH1cblxufSIsImltcG9ydCB7IEV2YWxTY29wZSB9IGZyb20gXCIuL0V2YWxTZXJ2aWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVtQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHRpdHJlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBub21icmVDb2xvbm5lczogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgbm9tYnJlTGlnbmVzOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBub21icmVGcmFtZXM6IG51bWJlcixcbiAgICApIHsgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT4ge1xuICAgIG5vZGU6IEFzdEJhc2VUeXBlXG4gICAgY29kZTogQXN0QmFzZVR5cGVcbn1cbi8qXG5leHBvcnQgaW50ZXJmYWNlIFZlcnNlSW5zdHJ1Y3Rpb25GYWN0b3J5PEFzdEJhc2VUeXBlPiB7XG4gICAgYnVpbGQocGFyYW06IEFzdEJhc2VUeXBlKTogUHJvZ3JlbVZlcnNlPEFzdEJhc2VUeXBlPjtcbn1cbiovXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPiB7XG4gICAgZnVuY3Rpb25Sb290Tm9kZTogQXN0QmFzZVR5cGVcbiAgICB2ZXJzZXM6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT5bXVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1GYWN0b3J5PEFzdEJhc2VUeXBlPiB7XG4gICAgYnVpbGRQcm9ncmVtKGNvZGU6IHN0cmluZyk6IFByb2dyZW1Db2RlPEFzdEJhc2VUeXBlPlxuICAgIGJ1aWxkQ291cGxldChub2RlOiBBc3RCYXNlVHlwZSwgdmVyc2VzOiBBc3RCYXNlVHlwZVtdKTogUHJvZ3JlbUNvdXBsZXQ8QXN0QmFzZVR5cGU+XG4gICAgYnVpbGRWZXJzZShub2RlOiBBc3RCYXNlVHlwZSk6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBWZXJzZUl0ZXJhdG9yPEFzdEJhc2VUeXBlPiB7XG4gICAgZXhlY3V0ZU5leHQoKTogUHJvZ3JlbVZlcnNlPEFzdEJhc2VUeXBlPlxuICAgIGhhc05leHQoKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtQ29kZTxBc3RCYXNlVHlwZT4ge1xuICAgIGluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCk6IFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPlxuICAgIGNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKTogUHJvZ3JlbUNvdXBsZXQ8QXN0QmFzZVR5cGU+XG4gICAgaXRlcmF0b3Ioc3RhdGU6IFByb2dyZW1TdGF0ZSk6IFZlcnNlSXRlcmF0b3I8QXN0QmFzZVR5cGU+XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVtU3RhdGUge1xuXG4gICAgcHVibGljIHJlYWRvbmx5IGV2YWxTY29wZSA9IG5ldyBFdmFsU2NvcGU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvbG9ubmU6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGxpZ25lOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBmcmFtZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY29udGV4dGU6IG9iamVjdCxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHZlcnNlOiBQcm9ncmVtVmVyc2U8YW55PiB8IG51bGwsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGV2YWwoZXhwcjogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZhbFNjb3BlLmdsb2JhbEV2YWwoZXhwcik7XG4gICAgfVxufVxuXG50eXBlIE5ld1N0YXRlQ2FsbGJhY2sgPSAoc3RhdGU6IFByb2dyZW1TdGF0ZSkgPT4gdm9pZDtcbmV4cG9ydCBpbnRlcmZhY2UgU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIge2ZpcmVTdGFydEl0ZXJhdGluZ0NvZGU6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBDb2RlRXhlY3V0aW9uTGlzdGVuZXIge2ZpcmVDb2RlRXhlY3V0aW9uOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgR3JpZENoYW5nZUxpc3RlbmVyIHtmaXJlR3JpZENoYW5nZTogTmV3U3RhdGVDYWxsYmFja307XG5leHBvcnQgaW50ZXJmYWNlIExpbmVDaGFuZ2VMaXN0ZW5lciB7ZmlyZUxpbmVDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBGcmFtZUNoYW5nZUxpc3RlbmVyIHtmaXJlRnJhbWVDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuXG5leHBvcnQgZW51bSBQcm9ncmVtVGVtcG8ge1xuICAgIEJ5VmVyc2UgPSAwLFxuICAgIEJ5UGl4ZWwsXG4gICAgQnlMaW5lLFxuICAgIEJ5RnJhbWVcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtU2NoZWR1bGVyIHtcbiAgICBzdWJzY3JpYmVTdGFydEl0ZXJhdGluZ0NvZGUobGlzdGVuZXI6IFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUNvZGVFeGVjdXRpb24obGlzdGVuZXI6IENvZGVFeGVjdXRpb25MaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVHcmlkQ2hhbmdlKGxpc3RlbmVyOiBHcmlkQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlTGluZUNoYW5nZShsaXN0ZW5lcjogTGluZUNoYW5nZUxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUZyYW1lQ2hhbmdlKGxpc3RlbmVyOiBGcmFtZUNoYW5nZUxpc3RlbmVyKTogdm9pZFxuICAgIHJlc2V0KCk6IFByb2dyZW1TdGF0ZVxuICAgIGN1cnJlbnQoKTogUHJvZ3JlbVN0YXRlXG4gICAgbmV4dCgpOiBQcm9ncmVtU3RhdGVbXVxuICAgIGdldFByb2dyZW0oKTogUHJvZ3JlbUNvZGU8YW55PlxuICAgIHRlbXBvOiBQcm9ncmVtVGVtcG9cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtQ29tcG9uZW50IHtcbiAgICByZW5kZXJIdG1sKCk6IEhUTUxFbGVtZW50XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3R5bGVEZWNvcmF0b3I8VD4ge1xuICAgIGRlY29yYXRlKG5vZGU6IFQsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnRcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSHRtbENvdXBsZXRGYWN0b3J5PEFzdEJhc2VUeXBlPiB7XG4gICAgYnVpbGRDb3VwbGV0KCk6IEhUTUxFbGVtZW50XG4gICAgZ2V0SHRtbFZlcnNlKHZlcnNlOiBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+KTogSFRNTEVsZW1lbnR8dW5kZWZpbmVkXG59XG5cbmV4cG9ydCBjbGFzcyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uPFQ+IGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8VD4ge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNvcmF0b3JzOiBTdHlsZURlY29yYXRvcjxUPltdKSB7fVxuXG4gICAgZGVjb3JhdGUobm9kZTogVCwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCB0ZW1wOiBIVE1MRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuZGVjb3JhdG9ycy5mb3JFYWNoKGQgPT4gdGVtcCA9IGQuZGVjb3JhdGUobm9kZSwgdGVtcCkpO1xuICAgICAgICByZXR1cm4gdGVtcDtcbiAgICB9XG5cbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjb3JhdG9ycy5tYXAoZCA9PiBkLmJ1aWxkU3R5bGVTaGVldCgpKS5qb2luKCdcXG4nKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2xvclByb3ZpZGVyIHtcbiAgICBoc2xDb2xvcihodWU6IG51bWJlcik6IHN0cmluZztcbiAgICBoYXNoU3RyaW5nVG9Db2xvcihrZXk6IHN0cmluZywgY29sb3JDb3VudDogbnVtYmVyLCBzaGlmdD86IG51bWJlcik6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2xvclByb3ZpZGVyRmFjdG9yeSB7XG4gICAgYnVpbGQoa2V5Pzogc3RyaW5nKTogQ29sb3JQcm92aWRlcjtcbn0iLCJpbXBvcnQgeyBQcm9ncmVtRmFjdG9yeSB9IGZyb20gXCIuL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNpY0VzcHJpbWFQcm9ncmVtRmFjdG9yeSB9IGZyb20gXCIuLi9lc3ByaW1hL0Jhc2ljRXNwcmltYVByb2dyZW1cIjtcblxuZXhwb3J0IG5hbWVzcGFjZSBDb2RlU2VydmljZSB7XG5cbiAgICBleHBvcnQgY29uc3QgcHJvZ3JlbUZhY3Rvcnk6IFByb2dyZW1GYWN0b3J5PGFueT4gPSBuZXcgQmFzaWNFc3ByaW1hUHJvZ3JlbUZhY3RvcnkoKTtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBsb2FkUHJvZ3JlbShmaWxlVXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2xpZW50ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICBjbGllbnQub3BlbignR0VUJywgZmlsZVVybCk7XG4gICAgICAgICAgICBjbGllbnQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb2RlID0gY2xpZW50LnJlc3BvbnNlVGV4dDtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb2RlU2VydmljZTogUHJvZ3JlbSBsb2FkZWQgc3VjY2Vzc2Z1bGx5LicsIGNvZGUpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoY29kZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2xpZW50Lm9uZXJyb3IgPSAoKSA9PiByZWplY3QoY2xpZW50LnN0YXR1c1RleHQpO1xuICAgICAgICAgICAgY2xpZW50LnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59IiwiXG5leHBvcnQgY2xhc3MgU2NyZWVuQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGJveFNpemU6IG51bWJlclxuICAgICkge31cbn1cblxuZXhwb3J0IGNsYXNzIFNjcmVlblNlcnZpY2Uge1xuXG4gICAgcHVibGljIGdldFNjcmVlbkZyYW1lKCk6IGFueSB7XG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBQYXR0ZXJuLCBJZGVudGlmaWVyLCBCYXNlTm9kZSwgVmFyaWFibGVEZWNsYXJhdGlvbiwgQXNzaWdubWVudEV4cHJlc3Npb24sIEZ1bmN0aW9uRGVjbGFyYXRpb24sIE5vZGUgfSBmcm9tIFwiZXN0cmVlXCI7XG5pbXBvcnQgeyBQcm9ncmVtU3RhdGUgfSBmcm9tIFwiLi4vY29yZS9UeXBlc1wiO1xuXG5leHBvcnQgdHlwZSBOb2RlV2l0aFBhcmVudCA9IE5vZGUgJiB7IHBhcmVudD86IE5vZGUgfTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEVzcHJpbWFIZWxwZXIge1xuXG4gICAgcHVibGljIHN0YXRpYyBwYXR0ZXJuVG9TdHJpbmcocGF0dGVybjogUGF0dGVybik6IHN0cmluZyB7XG4gICAgICAgIHZhciBub2RlO1xuICAgICAgICBzd2l0Y2ggKHBhdHRlcm4udHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnSWRlbnRpZmllcic6XG4gICAgICAgICAgICAgICAgbm9kZSA9IHBhdHRlcm4gYXMgSWRlbnRpZmllcjtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5uYW1lO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gY29udmVydCBwYXR0ZXJuIG9mIHR5cGUgJyArIHBhdHRlcm4udHlwZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZWR1Y2VOb2RlVG9WYXJEZWNsYXJhdGlvbihub2RlOiBCYXNlTm9kZSk6IFZhcmlhYmxlRGVjbGFyYXRpb24gfCBBc3NpZ25tZW50RXhwcmVzc2lvbiB8IEZ1bmN0aW9uRGVjbGFyYXRpb24gfCB1bmRlZmluZWQge1xuICAgICAgICBcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICBsZXQgZGVjbCA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBkZWNsO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJykge1xuICAgICAgICAgICAgbGV0IGV4cHIgPSBub2RlIGFzIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuICAgICAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgIGxldCBmdW5jID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwIGluIG5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAocCA9PT0gJ2xlZnQnIHx8IHAgPT09ICdyaWdodCcgfHwgcCA9PT0gJ2FyZ3VtZW50JyB8fCBwID09PSAnY2FsbGVlJyB8fCBwID09PSAnYm9keScgfHwgcCA9PT0gJ2V4cHJlc3Npb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQ6IEJhc2VOb2RlID0gbm9kZVtwXSBhcyBCYXNlTm9kZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEVzcHJpbWFIZWxwZXIucmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24oY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB2YXJpYWJsZSBuYW1lcyBvZiBkZWNsYXJhdGlvbiBvciBhc3NpZ25tZW50IGNvbnRhaW5lZCBpbiBub2RlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBub2RlIFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VmFyaWFibGVOYW1lcyhub2RlOiBWYXJpYWJsZURlY2xhcmF0aW9uIHwgQXNzaWdubWVudEV4cHJlc3Npb24gfCBGdW5jdGlvbkRlY2xhcmF0aW9uKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnVmFyaWFibGVEZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgIGxldCBkZWNsID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0aW9uO1xuICAgICAgICAgICAgcmV0dXJuIGRlY2wuZGVjbGFyYXRpb25zLm1hcChkID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEVzcHJpbWFIZWxwZXIucGF0dGVyblRvU3RyaW5nKGQuaWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YXJOYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnQXNzaWdubWVudEV4cHJlc3Npb24nKSB7XG4gICAgICAgICAgICBsZXQgZGVjbCA9IG5vZGUgYXMgQXNzaWdubWVudEV4cHJlc3Npb247XG4gICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEVzcHJpbWFIZWxwZXIucGF0dGVyblRvU3RyaW5nKGRlY2wubGVmdCk7XG4gICAgICAgICAgICByZXR1cm4gW3Zhck5hbWVdO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBmdW5jLnBhcmFtcy5tYXAocCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBFc3ByaW1hSGVscGVyLnBhdHRlcm5Ub1N0cmluZyhwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdmFyaWFibGUgdmFsdWVzIG9mIGRlY2xhcmF0aW9uIG9yIGFzc2lnbm1lbnQgY29udGFpbmVkIGluIG5vZGUuXG4gICAgICogU2FtZSBhcyBnZXRWYXJpYWJsZU5hbWVzIGJ1dCBldmFsdWF0ZSB2YXJpYWJsZXMgdG8gZGlzY292ZXIgdGhlaXIgdmFsdWVzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBub2RlIFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VmFyaWFibGVWYWx1ZXMoc3RhdGU6IFByb2dyZW1TdGF0ZSwgbm9kZTogQmFzZU5vZGUpOiBNYXA8c3RyaW5nLCBhbnk+IHtcbiAgICAgICAgbGV0IHZhbHVlc01hcCA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgIGxldCB2YXJOb2RlcyA9IHRoaXMucmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24obm9kZSk7XG4gICAgICAgIGlmICghdmFyTm9kZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXNNYXA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXRWYXJpYWJsZU5hbWVzKHZhck5vZGVzKS5tYXAodmFyTmFtZSA9PiB2YWx1ZXNNYXAuc2V0KHZhck5hbWUsIHN0YXRlLmV2YWwodmFyTmFtZSkpKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlc01hcDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzQ2hpbGROb2RlT2Yobm9kZTogTm9kZVdpdGhQYXJlbnQsIHBhcmVudDogQmFzZU5vZGUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKG5vZGUucGFyZW50ID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCFub2RlLnBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEVzcHJpbWFIZWxwZXIuaXNDaGlsZE5vZGVPZihub2RlLnBhcmVudCBhcyBOb2RlV2l0aFBhcmVudCwgcGFyZW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzTm90Q2hpbGROb2RlT2Yobm9kZTogTm9kZVdpdGhQYXJlbnQsIHBhcmVudHM6IEJhc2VOb2RlW10pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHBhcmVudHMuZmluZChwID0+IHAgPT09IG5vZGUucGFyZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKCFub2RlLnBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gRXNwcmltYUhlbHBlci5pc05vdENoaWxkTm9kZU9mKG5vZGUucGFyZW50IGFzIE5vZGVXaXRoUGFyZW50LCBwYXJlbnRzKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBDb2xvclByb3ZpZGVyLCBDb2xvclByb3ZpZGVyRmFjdG9yeSB9IGZyb20gXCIuL1R5cGVzXCI7XG5pbXBvcnQgeyBjcmVhdGUgYXMgbWQ1Q3JlYXRlIH0gZnJvbSAnanMtbWQ1JztcblxuZXhwb3J0IGNsYXNzIEJhc2ljQ29sb3JQcm92aWRlckZhY3RvcnkgaW1wbGVtZW50cyBDb2xvclByb3ZpZGVyRmFjdG9yeSB7XG4gICAgYnVpbGQoa2V5Pzogc3RyaW5nKTogQ29sb3JQcm92aWRlciB7XG4gICAgICAgIHJldHVybiBuZXcgQmFzaWNDb2xvclByb3ZpZGVyKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQmFzaWNDb2xvclByb3ZpZGVyIGltcGxlbWVudHMgQ29sb3JQcm92aWRlciB7XG5cbiAgICBwcml2YXRlIGNvbG9yTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuXG4gICAgcHVibGljIGhzbENvbG9yKGh1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdoc2woJyArIGh1ZSArICcsIDEwMCUsIDgwJSknO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYXNoU3RyaW5nVG9Db2xvcihrZXk6IHN0cmluZywgY29sb3JDb3VudDogbnVtYmVyLCBzaGlmdDogbnVtYmVyID0gMikge1xuICAgICAgICB2YXIgaHVlID0gdGhpcy5jb2xvck1hcC5nZXQoa2V5KTtcbiAgICAgICAgaWYgKGh1ZSkgcmV0dXJuIHRoaXMuaHNsQ29sb3IoaHVlKTtcblxuICAgICAgICB2YXIgaGFzaCA9IG1kNUNyZWF0ZSgpLnVwZGF0ZShrZXkpLnRvU3RyaW5nKCk7XG4gICAgICAgIFxuICAgICAgICBodWUgPSAoIHBhcnNlSW50KGhhc2guc3Vic3RyaW5nKHNoaWZ0ICsgMCwgc2hpZnQgKyAxKSwgMTYpICsgMTYgKiBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDEsIHNoaWZ0ICsgMiksIDE2KSArIDI1NiAqIHBhcnNlSW50KGhhc2guc3Vic3RyaW5nKHNoaWZ0ICsgMiwgc2hpZnQgKyAzKSwgMTYpICk7XG4gICAgICAgIGh1ZSA9IE1hdGguZmxvb3IoaHVlICUgY29sb3JDb3VudCkgKiAzNjAgLyBjb2xvckNvdW50O1xuICAgICAgICBodWUgPSBodWUgJSAzNjA7XG5cbiAgICAgICAgLy8gQ29sb3IgZGVkdXBsaWNhdGlvblxuICAgICAgICB3aGlsZSAoIXRoaXMuY29sb3JNYXAuZ2V0KGtleSkpIHtcbiAgICAgICAgICAgIGxldCBkdXBsaWNhdGVDb2xvciA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yIChsZXQgYyBvZiB0aGlzLmNvbG9yTWFwLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGMgLSBodWUpIDwgTWF0aC5mbG9vcigxODAgLyBjb2xvckNvdW50KSkge1xuICAgICAgICAgICAgICAgICAgICBkdXBsaWNhdGVDb2xvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGh1ZSArPSBNYXRoLmZsb29yKDI3MCAvIGNvbG9yQ291bnQpO1xuICAgICAgICAgICAgICAgICAgICBodWUgPSBodWUgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZHVwbGljYXRlQ29sb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yTWFwLnNldChrZXksIGh1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vdmFyIHBhc3RlbCA9ICdoc2woJyArIGh1ZSArICcsIDEwMCUsIDg3LjUlKSc7XG4gICAgICAgIHJldHVybiB0aGlzLmhzbENvbG9yKGh1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIENvbG9yU2VydmljZSB7XG5cbiAgICBleHBvcnQgY29uc3QgY29sb3JQcm92aWRlcmFjdG9yeTogQ29sb3JQcm92aWRlckZhY3RvcnkgPSBuZXcgQmFzaWNDb2xvclByb3ZpZGVyRmFjdG9yeSgpO1xuXG59XG4iLCJpbXBvcnQgeyBQcm9ncmVtQ29tcG9uZW50LCBQcm9ncmVtU2NoZWR1bGVyLCBTdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyLCBQcm9ncmVtU3RhdGUsIFByb2dyZW1Db25maWcsIEZyYW1lQ2hhbmdlTGlzdGVuZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgU2NyZWVuQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvcmUvU2NyZWVuU2VydmljZVwiO1xuaW1wb3J0IHsgSHRtbEhlbHBlciB9IGZyb20gXCIuLi8uLi9jb3JlL0h0bWxIZWxwZXJcIjtcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIgfSBmcm9tIFwicnhqc1wiO1xuXG5leHBvcnQgY2xhc3MgUHJvZ3JlbUdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBQcm9ncmVtQ29tcG9uZW50LCBTdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyLCBGcmFtZUNoYW5nZUxpc3RlbmVyIHtcbiAgICBcbiAgICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgcHJpdmF0ZSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBibGlua0ludGVydmFsID0gMjAwO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNjcmVlbkNvbmZpZzogU2NyZWVuQ29uZmlnLCBcbiAgICAgICAgcHJpdmF0ZSBwcm9ncmVtQ29uZmlnOiBQcm9ncmVtQ29uZmlnLFxuICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogUHJvZ3JlbVNjaGVkdWxlcixcbiAgICAgICAgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnRcbiAgICAgICAgKSB7XG4gICAgICAgIGxldCBlbldhcm5pbmcgPSBIdG1sSGVscGVyLnAoJ3dhcm5pbmcnLCBcIllvdXIgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgY2FudmFzLlwiKTtcbiAgICAgICAgbGV0IGZyV2FybmluZyA9IEh0bWxIZWxwZXIucCgnd2FybmluZycsIFwiVm90cmUgbmF2aWdhdGV1ciBuZSBzdXBwb3J0ZSBwYXMgbGVzIGNhbnZhcy5cIik7XG4gICAgICAgIHRoaXMuY2FudmFzID0gSHRtbEhlbHBlci5jYW52YXMoJycsIFtlbldhcm5pbmcsIGZyV2FybmluZ10pO1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMucHJvZ3JlbUNvbmZpZy5ub21icmVDb2xvbm5lcyAqIHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMucHJvZ3JlbUNvbmZpZy5ub21icmVMaWduZXMgKiB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplO1xuXG4gICAgICAgIGxldCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBpZiAoIWN0eCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gb2J0YWluIDJEIENhbnZhcyBjb250ZXh0ICEnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuXG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVTdGFydEl0ZXJhdGluZ0NvZGUodGhpcyk7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVHcmlkQ2hhbmdlKHRoaXMpO1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlRnJhbWVDaGFuZ2UodGhpcyk7XG4gICAgfVxuXG4gICAgcmVuZGVySHRtbCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3Byb2dyZW0tZ3JpZCcsIHRoaXMuY2FudmFzKTtcblxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjb2xvckN1cnJlbnRQaXhlbChzdGF0ZTogUHJvZ3JlbVN0YXRlLCBjb2xvcjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBib3hTaXplID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcbiAgICAgICAgbGV0IGMgPSBzdGF0ZS5jb2xvbm5lO1xuICAgICAgICBsZXQgbCA9IHN0YXRlLmxpZ25lO1xuXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdChjICogYm94U2l6ZSwgbCAqIGJveFNpemUsIGJveFNpemUsIGJveFNpemUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBibGlua0N1cnJlbnRQaXhlbChzdGF0ZTogUHJvZ3JlbVN0YXRlLCBpbmNyZW1udDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBjb2xvciA9ICdibGFjayc7XG4gICAgICAgIGlmIChpbmNyZW1udCAlIDIgPT09IDApIHtcbiAgICAgICAgICAgIGNvbG9yID0gJ2FudGlxdWV3aGl0ZSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb2xvckN1cnJlbnRQaXhlbChzdGF0ZSwgY29sb3IpO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgZmlyZVN0YXJ0SXRlcmF0aW5nQ29kZSAoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBPYnNlcnZhYmxlLmludGVydmFsKHRoaXMuYmxpbmtJbnRlcnZhbCwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIpLnN1YnNjcmliZSh0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuYmxpbmtDdXJyZW50UGl4ZWwoc3RhdGUsIHQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmaXJlR3JpZENoYW5nZSAoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYm94U2l6ZSA9IHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG4gICAgICAgIGxldCBjID0gc3RhdGUuY29sb25uZTtcbiAgICAgICAgbGV0IGwgPSBzdGF0ZS5saWduZTtcbiAgICAgICAgbGV0IGYgPSBzdGF0ZS5mcmFtZTtcblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGxldCBjb3VsZXVyID0gY29sb3JlclByb2dyZW0oYywgbCwgZiwgc3RhdGUuY29udGV4dGUpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGAoJHtjfSwgJHtsfSwgJHtmfSwgJHtzdGF0ZS5jb250ZXh0ZX0gPT4gJHtjb3VsZXVyfWApO1xuICAgICAgICBpZiAoY291bGV1cikge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY291bGV1cjtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KGMgKiBib3hTaXplLCBsICogYm94U2l6ZSwgYm94U2l6ZSwgYm94U2l6ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaXJlRnJhbWVDaGFuZ2UgKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgLy90aGlzLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICBsZXQgd2lkdGggPSB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplICogdGhpcy5wcm9ncmVtQ29uZmlnLm5vbWJyZUNvbG9ubmVzO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZSAqIHRoaXMucHJvZ3JlbUNvbmZpZy5ub21icmVMaWduZXM7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJ2FudGlxdWV3aGl0ZSc7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxufSJdLCJzb3VyY2VSb290IjoiIn0=