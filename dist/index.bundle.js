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
ProgremService_1.ProgremService.buildProgrem('./progrems/coeur_progrem.js', screenConfig);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9yU3R5bGVEZWNvcmF0b3JzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92YXJpYWJsZVNjb3BlL1ZhcmlhYmxlU2NvcGVDb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUVkaXRvci9Qcm9ncmVtRWRpdG9yQ29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL0h0bWxIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VzcHJpbWEvQmFzaWNFc3ByaW1hUHJvZ3JlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9FdmFsU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9TY2hlZHVsaW5nU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Qcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZhcmlhYmxlU2NvcGUvRXNwcmltYVZhcmlhYmxlU2NvcGVTdHlsZURlY29yYXRvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvUHJvZ3JlbVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdmFyaWFibGVTY29wZS9Fc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL1R5cGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL0NvZGVTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL1NjcmVlblNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VzcHJpbWEvRXNwcmltYUhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9Db2xvclNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUdyaWQvUHJvZ3JlbUdyaWRDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUdBLG1HQUF3RTtBQUN4RSxrRkFBdUQ7QUFFdkQsTUFBYSwyQkFBMkI7SUFBeEM7UUFFWSxnQkFBVyxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzdDLGtCQUFhLEdBQWtCLDJCQUFZLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLENBQUM7SUE2Q3BGLENBQUM7SUEzQ0csUUFBUSxDQUFDLElBQWMsRUFBRSxPQUFvQjtRQUN6QyxJQUFJLEtBQUssQ0FBQztRQUVWLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7WUFDNUIsSUFBSSxDQUFDLEdBQUcsSUFBa0IsQ0FBQztZQUMzQixLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUNsQjtRQUVELElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDWCxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDekM7WUFFRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFP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LEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7UUFDekUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FFSjtBQTFGRCxvREEwRkMiLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3R5bGVEZWNvcmF0b3IsIENvbG9yUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgQmFzZU5vZGUsIElkZW50aWZpZXIgfSBmcm9tIFwiZXN0cmVlXCI7XG5cbmltcG9ydCB7IFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQgfSBmcm9tIFwiLi9Qcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50XCI7XG5pbXBvcnQgeyBDb2xvclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9Db2xvclNlcnZpY2VcIjtcblxuZXhwb3J0IGNsYXNzIENvbG9yVmVyc2VWYXJpYWJsZURlY29yYXRvciBpbXBsZW1lbnRzIFN0eWxlRGVjb3JhdG9yPEJhc2VOb2RlPiB7XG5cbiAgICBwcml2YXRlIHZhcmlhYmxlTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgY29sb3JQcm92aWRlcjogQ29sb3JQcm92aWRlciA9IENvbG9yU2VydmljZS5jb2xvclByb3ZpZGVyYWN0b3J5LmJ1aWxkKCk7XG5cbiAgICBkZWNvcmF0ZShub2RlOiBCYXNlTm9kZSwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCB2YXJJZDtcblxuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnSWRlbnRpZmllcicpIHtcbiAgICAgICAgICAgIGxldCBuID0gbm9kZSBhcyBJZGVudGlmaWVyO1xuICAgICAgICAgICAgdmFySWQgPSBuLm5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFySWQpIHtcbiAgICAgICAgICAgIGxldCB2YXJJbmRleCA9IHRoaXMudmFyaWFibGVNYXAuZ2V0KHZhcklkKTtcbiAgICAgICAgICAgIGlmICghdmFySW5kZXgpIHtcbiAgICAgICAgICAgICAgICB2YXJJbmRleCA9IHRoaXMudmFyaWFibGVNYXAuc2l6ZSArIDE7XG4gICAgICAgICAgICAgICAgdGhpcy52YXJpYWJsZU1hcC5zZXQodmFySWQsIHZhckluZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd2YXJpYWJsZScpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd2YXJpYWJsZS0nICsgdmFySW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSAgICBcbiAgICBcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHN0eWxlID0gJyc7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ3ZhcmlhYmxlIGNvdW50OicsIHRoaXMudmFyaWFibGVNYXAuc2l6ZSk7XG4gICAgICAgIHRoaXMudmFyaWFibGVNYXAuZm9yRWFjaCgoaW5kZXgsIGlkKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmNvbG9yUHJvdmlkZXIuaGFzaFN0cmluZ1RvQ29sb3IoaWQsIDE2KTsgLy90aGlzLnZhcmlhYmxlTWFwLnNpemVcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2J1aWxkaW5nIGNvbG9yICMnLCBpZCwgJz0+JywgY29sb3IpO1xuICAgICAgICAgICAgc3R5bGUgKz0gYFxuICAgICAgICAgICAgICAgIC52YXJpYWJsZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAuMWVtIDAuNWVtIDAuMWVtIDAuNWVtO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMC44ZW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC4ke1Byb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VUSU5HX0NMQVNTfSAudmFyaWFibGUtJHtpbmRleH0uaWRlbnRpZmllciwgXG4gICAgICAgICAgICAgICAgLiR7UHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRFRF9DTEFTU30gLnZhcmlhYmxlLSR7aW5kZXh9LmlkZW50aWZpZXIge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yfTtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYWRWZXJzZURlY29yYXRvciBpbXBsZW1lbnRzIFN0eWxlRGVjb3JhdG9yPEJhc2VOb2RlPiB7XG5cbiAgICBkZWNvcmF0ZShub2RlOiBCYXNlTm9kZSwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdCbG9ja1N0YXRlbWVudCcpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY29kZS1wYWRkaW5nJylcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0gICAgXG4gICAgXG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgIC5jb2RlLXBhZGRpbmcge1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDMycHg7XG4gICAgICAgIH1cbiAgICAgICAgYDtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IFByb2dyZW1TZXJ2aWNlfSBmcm9tIFwiLi9jb3JlL1Byb2dyZW1TZXJ2aWNlXCI7XG5pbXBvcnQgeyBTY3JlZW5Db25maWcgfSBmcm9tIFwiLi9jb3JlL1NjcmVlblNlcnZpY2VcIjtcblxubGV0IHNjcmVlbkNvbmZpZyA9IG5ldyBTY3JlZW5Db25maWcoMjApO1xuXG5Qcm9ncmVtU2VydmljZS5idWlsZFByb2dyZW0oJy4vcHJvZ3JlbXMvY29ldXJfcHJvZ3JlbS5qcycsIHNjcmVlbkNvbmZpZyk7IiwiaW1wb3J0IHsgUHJvZ3JlbUNvbXBvbmVudCwgR3JpZENoYW5nZUxpc3RlbmVyLCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIFByb2dyZW1TdGF0ZSwgQ29sb3JQcm92aWRlciwgUHJvZ3JlbVNjaGVkdWxlciwgSHRtbENvdXBsZXRGYWN0b3J5IH0gZnJvbSBcIi4uLy4uL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IEVzcHJpbWFIZWxwZXIgfSBmcm9tIFwiLi4vLi4vZXNwcmltYS9Fc3ByaW1hSGVscGVyXCI7XG5pbXBvcnQgeyBWYXJpYWJsZURlY2xhcmF0aW9uLCBBc3NpZ25tZW50RXhwcmVzc2lvbiwgRnVuY3Rpb25EZWNsYXJhdGlvbiB9IGZyb20gXCJlc3RyZWVcIjtcbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb3JlL0NvbG9yU2VydmljZVwiO1xuaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgRXNwcmltYVZhcmlhYmxlU2NvcGVIdG1sRmFjdG9yeSB9IGZyb20gXCIuL0VzcHJpbWFWYXJpYWJsZVNjb3BlSHRtbEZhY3RvcnlcIjtcblxuZXhwb3J0IGNsYXNzIFZhcmlhYmxlU2NvcGVDb21wb25lbnQgaW1wbGVtZW50cyBQcm9ncmVtQ29tcG9uZW50LCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciB7XG5cbiAgICBwcml2YXRlIGh0bWxDb250YWluZXI6IEhUTUxFbGVtZW50fG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgY29sb3JQcm92aWRlcjogQ29sb3JQcm92aWRlciA9IENvbG9yU2VydmljZS5jb2xvclByb3ZpZGVyYWN0b3J5LmJ1aWxkKCk7XG4gICAgXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyLFxuICAgICAgICBwcml2YXRlIGh0bWxGYWN0b3J5OiBFc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5XG4gICAgKSB7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVDb2RlRXhlY3V0aW9uKHRoaXMpO1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlR3JpZENoYW5nZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZW5kZXJIdG1sKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGh0bWxDb21wb25lbnQgPSB0aGlzLmh0bWxGYWN0b3J5LmJ1aWxkQ291cGxldCgpO1xuICAgICAgICB0aGlzLmh0bWxDb250YWluZXIgPSBodG1sQ29tcG9uZW50O1xuICAgICAgICByZXR1cm4gaHRtbENvbXBvbmVudDtcbiAgICB9XG5cbiAgICBmaXJlQ29kZUV4ZWN1dGlvbihzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIGlmICghc3RhdGUudmVyc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodG1sVmVyc2UgPSB0aGlzLmh0bWxGYWN0b3J5LmdldEh0bWxWZXJzZShzdGF0ZS52ZXJzZSk7XG4gICAgICAgIC8vIGlmICh0aGlzLmh0bWxDb250YWluZXIgJiYgaHRtbFZlcnNlKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmh0bWxDb250YWluZXIuYXBwZW5kQ2hpbGQoaHRtbFZlcnNlKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIGZpcmVHcmlkQ2hhbmdlKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5odG1sRmFjdG9yeS5jbGVhclZpZXcoKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBFc3ByaW1hUHJvZ3JlbSB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFUeXBlc1wiO1xuaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVtRWRpdG9yQ29tcG9uZW50IHtcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQ09NUE9ORU5UX0NMQVNTID0gJ3Byb2dyZW0tZWRpdG9yLWNvbXBvbmVudCc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBJTklUX0ZVTkNfQ0xBU1MgPSAnaW5pdC1wcm9ncmVtLWVkaXRvcic7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBDT0xPUkVSX0ZVTkNfQ0xBU1MgPSAnY29sb3Jlci1wcm9ncmVtLWVkaXRvcic7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBDT0RFX0xJQlJFX0NMQVNTID0gJ2NvZGUtbGlicmUtZWRpdG9yJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJFRlJFU0hfQUNUSU9OX0NMQVNTID0gJ3JlZnJlc2gtYWN0aW9uJztcblxuICAgIHByaXZhdGUgaW5pdFByb2dyZW1UZXh0YXJlYSE6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBjb2xvcmVyUHJvZ3JlbVRleHRhcmVhITogSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICBwcml2YXRlIGNvZGVMaWJyZVRleHRhcmVhITogSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICBwcml2YXRlIHJlZnJlc2hPYnNlcnZhYmxlJCE6IE9ic2VydmFibGU8RXZlbnQ+O1xuXG4gICAgcHJpdmF0ZSBhdHRhY2hlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcHVibGljIGF0dGFjaChkb2N1bWVudDpEb2N1bWVudCkge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuQ09NUE9ORU5UX0NMQVNTfSAuJHtQcm9ncmVtRWRpdG9yQ29tcG9uZW50LklOSVRfRlVOQ19DTEFTU30gdGV4dGFyZWFgKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2VsZW1lbnRzJywgZWxlbWVudCk7XG4gICAgICAgIGlmIChlbGVtZW50KSB0aGlzLmluaXRQcm9ncmVtVGV4dGFyZWEgPSBlbGVtZW50IGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG5cbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuQ09NUE9ORU5UX0NMQVNTfSAuJHtQcm9ncmVtRWRpdG9yQ29tcG9uZW50LkNPTE9SRVJfRlVOQ19DTEFTU30gdGV4dGFyZWFgKTtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHRoaXMuY29sb3JlclByb2dyZW1UZXh0YXJlYSA9IGVsZW1lbnQgYXMgSFRNTFRleHRBcmVhRWxlbWVudDtcblxuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7UHJvZ3JlbUVkaXRvckNvbXBvbmVudC5DT01QT05FTlRfQ0xBU1N9IC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuQ09ERV9MSUJSRV9DTEFTU30gdGV4dGFyZWFgKTtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHRoaXMuY29kZUxpYnJlVGV4dGFyZWEgPSBlbGVtZW50IGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG5cbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuQ09NUE9ORU5UX0NMQVNTfSAuJHtQcm9ncmVtRWRpdG9yQ29tcG9uZW50LlJFRlJFU0hfQUNUSU9OX0NMQVNTfWApO1xuICAgICAgICB0aGlzLnJlZnJlc2hPYnNlcnZhYmxlJCA9IE9ic2VydmFibGUuZnJvbUV2ZW50KGVsZW1lbnQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQsICdjbGljaycpO1xuXG4gICAgICAgIHRoaXMuYXR0YWNoZWQgPSB0aGlzLmluaXRQcm9ncmVtVGV4dGFyZWEgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbG9yZXJQcm9ncmVtVGV4dGFyZWEgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvZGVMaWJyZVRleHRhcmVhICE9PSB1bmRlZmluZWQgJiYgdGhpcy5yZWZyZXNoT2JzZXJ2YWJsZSQgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNoZWNrSXNBdHRhY2hlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmF0dGFjaGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2dyZW1FZGl0b3JDb21wb25lbnQgaXMgbm90IGF0dGFjaGVkICEnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkUHJvZ3JlbShwcm9ncmVtOiBFc3ByaW1hUHJvZ3JlbSkge1xuICAgICAgICB0aGlzLmNoZWNrSXNBdHRhY2hlZCgpO1xuXG4gICAgICAgIGxldCBmdW5jQm9keUJsb2NrID0gcHJvZ3JlbS5pbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpLmZ1bmN0aW9uUm9vdE5vZGUuYm9keTtcbiAgICAgICAgbGV0IGZ1bmNCb2R5Q29kZSA9IGVzY29kZUdlbmVyYXRlKGZ1bmNCb2R5QmxvY2spO1xuICAgICAgICBsZXQgY2xlYW5lZENvZGUgPSBmdW5jQm9keUNvZGUuc3Vic3RyaW5nKDEsIGZ1bmNCb2R5Q29kZS5sZW5ndGggLSAyKTtcbiAgICAgICAgdGhpcy5pbml0UHJvZ3JlbVRleHRhcmVhLmlubmVySFRNTCA9IGNsZWFuZWRDb2RlO1xuXG4gICAgICAgIGZ1bmNCb2R5QmxvY2sgPSBwcm9ncmVtLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKS5mdW5jdGlvblJvb3ROb2RlLmJvZHk7XG4gICAgICAgIGZ1bmNCb2R5Q29kZSA9IGVzY29kZUdlbmVyYXRlKGZ1bmNCb2R5QmxvY2spO1xuICAgICAgICBjbGVhbmVkQ29kZSA9IGZ1bmNCb2R5Q29kZS5zdWJzdHJpbmcoMSwgZnVuY0JvZHlDb2RlLmxlbmd0aCAtIDIpO1xuICAgICAgICB0aGlzLmNvbG9yZXJQcm9ncmVtVGV4dGFyZWEuaW5uZXJIVE1MID0gY2xlYW5lZENvZGU7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBidWlsZFByb2dyZW0oKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGNvbG9yZXJQcm9ncmVtRnVuYyA9IGBcbiAgICAgICAgZnVuY3Rpb24gY29sb3JlclByb2dyZW0oY29sb25uZSwgbGlnbmUsIGZyYW1lLCBjb250ZXh0ZSkge1xuICAgICAgICAgICAgJHt0aGlzLmNvbG9yZXJQcm9ncmVtVGV4dGFyZWEudmFsdWV9XG4gICAgICAgIH1cbiAgICAgICAgYDtcblxuICAgICAgICBsZXQgaW5pdFByb2dyZW1GdW5jID0gYFxuICAgICAgICBmdW5jdGlvbiBpbml0aWFsaXNlclByb2dyZW0oY29uZmlnLCBpbml0Q29udGV4dGUpIHtcbiAgICAgICAgICAgICR7dGhpcy5pbml0UHJvZ3JlbVRleHRhcmVhLnZhbHVlfVxuICAgICAgICB9XG4gICAgICAgIGA7XG5cbiAgICAgICAgbGV0IGNvZGVMaWJyZUZ1bmMgPSB0aGlzLmNvZGVMaWJyZVRleHRhcmVhLnZhbHVlO1xuXG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICR7Y29kZUxpYnJlRnVuY31cblxuICAgICAgICAke2luaXRQcm9ncmVtRnVuY31cblxuICAgICAgICAke2NvbG9yZXJQcm9ncmVtRnVuY31cbiAgICAgICAgYDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYmluZFJlZnJlc2goYWN0aW9uOiAoY29kZTogc3RyaW5nKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaE9ic2VydmFibGUkLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICBhY3Rpb24odGhpcy5idWlsZFByb2dyZW0oKSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG59IiwiXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSHRtbEhlbHBlciB7XG5cbiAgICBzdGF0aWMgYWRkQ2xhc3NlcyhlbHQ6IEhUTUxFbGVtZW50LCBjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGFzc2VzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY2xhc3Nlcy5zcGxpdCgnICcpLmZvckVhY2goYyA9PiBlbHQuY2xhc3NMaXN0LmFkZChjKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2xhc3NlcykpIHtcbiAgICAgICAgICAgIGNsYXNzZXMuZm9yRWFjaChjID0+IGVsdC5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBzcGFuKGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSwgY29udGVudD86IHN0cmluZ3xIVE1MRWxlbWVudHwoSFRNTEVsZW1lbnR8c3RyaW5nKVtdKTogSFRNTFNwYW5FbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIudGFnKCdzcGFuJywgY2xhc3NlcywgY29udGVudCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHAoY2xhc3Nlczogc3RyaW5nfHN0cmluZ1tdLCBjb250ZW50Pzogc3RyaW5nfEhUTUxFbGVtZW50fChIVE1MRWxlbWVudHxzdHJpbmcpW10pOiBIVE1MUGFyYWdyYXBoRWxlbWVudCB7XG4gICAgICAgIHJldHVybiBIdG1sSGVscGVyLnRhZygncCcsIGNsYXNzZXMsIGNvbnRlbnQpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgIH1cblxuICAgIHN0YXRpYyBkaXYoY2xhc3Nlczogc3RyaW5nfHN0cmluZ1tdLCBjb250ZW50Pzogc3RyaW5nfEhUTUxFbGVtZW50fChIVE1MRWxlbWVudHxzdHJpbmcpW10pOiBIVE1MRGl2RWxlbWVudCB7XG4gICAgICAgIHJldHVybiBIdG1sSGVscGVyLnRhZygnZGl2JywgY2xhc3NlcywgY29udGVudCkgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGNhbnZhcyhjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxDYW52YXNFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIudGFnKCdjYW52YXMnLCBjbGFzc2VzLCBjb250ZW50KSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyB0YWcodGFnTmFtZTogc3RyaW5nLCBjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGVsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgICAgIGlmIChjbGFzc2VzKSB7XG4gICAgICAgICAgICBIdG1sSGVscGVyLmFkZENsYXNzZXMoZWx0LCBjbGFzc2VzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGVsdC5pbm5lclRleHQgPSBjb250ZW50O1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgZWx0LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY29udGVudCkpIHtcbiAgICAgICAgICAgIGNvbnRlbnQuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsdC5pbm5lckhUTUwgKz0gYztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgZWx0LmFwcGVuZENoaWxkKGMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gYWRkIGNvbnRlbnQ6JywgYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGVsdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmaW5lQ3NzUnVsZXMoaWQ6IHN0cmluZywgY3NzUnVsZXM6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBsZXQgY3NzSWQgPSAnY3NzLScgKyBpZDtcbiAgICAgICAgbGV0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNzc0lkKTtcbiAgICAgICAgaWYoIXN0eWxlRWxlbWVudCkge1xuICAgICAgICAgICAgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgfVxuICAgICAgICBzdHlsZUVsZW1lbnQuaWQgPSBjc3NJZDtcbiAgICAgICAgLyogYWRkIHN0eWxlIHJ1bGVzIHRvIHRoZSBzdHlsZSBlbGVtZW50ICovXG4gICAgICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3NSdWxlcykpO1xuICAgICAgICBcbiAgICAgICAgLyogYXR0YWNoIHRoZSBzdHlsZSBlbGVtZW50IHRvIHRoZSBkb2N1bWVudCBoZWFkICovXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG59IiwiXG5pbXBvcnQgeyBQcm9ncmFtLCBwYXJzZU1vZHVsZSwgUGFyc2VPcHRpb25zIH0gZnJvbSAnZXNwcmltYSc7XG5pbXBvcnQgeyB3YWxrIGFzIGVzcHJpbWFXYWxrLCB3YWxrQWRkUGFyZW50IGFzIGVzcHJpbWFXYWxrQWRkUGFyZW50IH0gZnJvbSAnZXNwcmltYS13YWxrJztcbmltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcbmltcG9ydCB7IEJhc2VOb2RlLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBCbG9ja1N0YXRlbWVudCwgSWZTdGF0ZW1lbnQsIFJldHVyblN0YXRlbWVudCwgU3RhdGVtZW50IH0gZnJvbSAnZXN0cmVlJztcbmltcG9ydCB7IEVzcHJpbWFWZXJzZUl0ZXJhb3IsIEVzcHJpbWFWZXJzZSwgRXNwcmltYUNvdXBsZXQsIEVzcHJpbWFQcm9ncmVtRmFjdG9yeSwgRXNwcmltYVByb2dyZW0gfSBmcm9tICcuL0VzcHJpbWFUeXBlcyc7XG5pbXBvcnQgeyBFc3ByaW1hSGVscGVyIH0gZnJvbSAnLi9Fc3ByaW1hSGVscGVyJztcbmltcG9ydCB7IENvZGVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9Db2RlU2VydmljZSc7XG5pbXBvcnQgeyBQcm9ncmVtU3RhdGUgfSBmcm9tICcuLi9jb3JlL1R5cGVzJztcblxuY2xhc3MgQmFzaWNFc3ByaW1hQ29kZUl0ZXJhdG9yIGltcGxlbWVudHMgRXNwcmltYVZlcnNlSXRlcmFvciB7XG5cbiAgICBwcml2YXRlIHN0YWNrOiBCYXNlTm9kZVtdID0gW107XG4gICAgcHJpdmF0ZSByZXR1cm5WYWx1ZTogYW55ID0gbnVsbDtcbiAgICBwcml2YXRlIGZpbmlzaGVkID0gZmFsc2VcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgcHJpdmF0ZSByb290Tm9kZTogQmFzZU5vZGUsIFxuICAgICAgICAgICAgcHJpdmF0ZSBzdGF0ZTogUHJvZ3JlbVN0YXRlKSB7XG4gICAgICAgIHRoaXMuc3RhY2sucHVzaChyb290Tm9kZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWNsYXJlUHJvZ3JlbUFyZ3VtZW50cygpIHtcbiAgICAgICAgbGV0IF9jb2xvbm5lID0gdGhpcy5zdGF0ZS5jb2xvbm5lO1xuICAgICAgICBsZXQgX2xpZ25lID0gdGhpcy5zdGF0ZS5saWduZTtcbiAgICAgICAgbGV0IF9mcmFtZSA9IHRoaXMuc3RhdGUuZnJhbWU7XG4gICAgICAgIGxldCBfY29udGV4dGUgPSB0aGlzLnN0YXRlLmNvbnRleHRlO1xuXG4gICAgICAgIHRoaXMuc3RhdGUuZXZhbCgndmFyIGNvbG9ubmUgPSAnICsgX2NvbG9ubmUgKyAnLCBsaWduZSA9ICcgKyBfbGlnbmUgKyAnLCBmcmFtZSA9ICcgKyBfZnJhbWUgKyAnOycpO1xuICAgICAgICB0aGlzLnN0YXRlLmV2YWwoJ3ZhciBjb250ZXh0ZSA9ICcgKyBKU09OLnN0cmluZ2lmeShfY29udGV4dGUpKTtcbiAgICB9XG5cbiAgICBleGVjdXRlTmV4dCgpOiBFc3ByaW1hVmVyc2Uge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGZpcnN0IG5vZGUgb24gdGhlIHN0YWNrXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuc3RhY2suc2hpZnQoKTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnTm9kZTonLCBub2RlKTtcblxuICAgICAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGFjayBzaG91bGQgbm90IGJlIGVtcHR5ICEnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHN0bXQ7XG5cbiAgICAgICAgICAgIHN3aXRjaChub2RlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdGdW5jdGlvbkRlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZ1bmMgPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdChmdW5jLmJvZHkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY2xhcmVQcm9ncmVtQXJndW1lbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFZlcnNlKGZ1bmMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Jsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suYm9keS5zbGljZSgpLnJldmVyc2UoKS5tYXAoeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdCbG9ja1N0YXRlbWVudCB1bnNoaWZ0aW5nOicsIHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KHgpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0lmU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgc3RtdCA9IG5vZGUgYXMgSWZTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0Q29kZSA9IGVzY29kZUdlbmVyYXRlKHN0bXQudGVzdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3RSZXN1bHQgPSB0aGlzLnN0YXRlLmV2YWwodGVzdENvZGUpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdJZlN0YXRlbWVudCB0ZXN0IGV2YWx1YXRlIHRvOiAnLCB0ZXN0UmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlc3RSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ1RoZW4gdW5zaGlmdGluZzonLCBzdG10LmNvbnNlcXVlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KHN0bXQuY29uc2VxdWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RtdC5hbHRlcm5hdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdFbHNlIHVuc2hpZnRpbmc6Jywgc3RtdC5hbHRlcm5hdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdChzdG10LmFsdGVybmF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRWZXJzZShzdG10KTtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1JldHVyblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIHN0bXQgPSBub2RlIGFzIFJldHVyblN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXR1cm5WYWx1ZSA9IHRoaXMuc3RhdGUuZXZhbChlc2NvZGVHZW5lcmF0ZShzdG10LmFyZ3VtZW50KSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRWZXJzZShzdG10KTtcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ05vZGU6Jywgbm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2RlID0gZXNjb2RlR2VuZXJhdGUobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0dlbmVyYXRlZCBjb2RlOicsIGNvZGUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXZhbFJlc3VsdCA9IHRoaXMuc3RhdGUuZXZhbChjb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnRXZhbHVhdGUgdG86JywgZXZhbFJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFZlcnNlKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICh0aGlzLnN0YWNrLmxlbmd0aCA+IDApO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSXRlcmF0b3IgaGFzIG5vIG1vcmUgY29kZSB0byBleGVjdXRlICEnKTtcbiAgICB9ICAgIFxuICAgIFxuICAgIGhhc05leHQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbm9kZXMgPSB0aGlzLnN0YWNrLnNsaWNlKDApO1xuICAgICAgICB3aGlsZSAobm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBub2Rlcy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS50eXBlICE9PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9ja3M6IEJsb2NrU3RhdGVtZW50W10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tzLnB1c2goYmxvY2spO1xuICAgICAgICAgICAgICAgICAgICAvLyBQYXJzb3VycyByZWN1cnNpdmVtZW50IGxlcyBibG9ja3Mgw6AgbGEgcmVjaGVyY2hlIGRlIG5vZXVkIHF1aSBuZSBzb250IHBhcyBkZXMgYmxvY2tzXG4gICAgICAgICAgICAgICAgICAgIGxldCBoYXNOZXh0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghaGFzTmV4dCAmJiBibG9ja3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGIgPSBibG9ja3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYi5ib2R5Lm1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHgudHlwZSAhPT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzTmV4dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja3MucHVzaCh4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNOZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgY2xhc3MgQmFzaWNFc3ByaW1hUHJvZ3JlbSBpbXBsZW1lbnRzIEVzcHJpbWFQcm9ncmVtIHtcblxuICAgIHByaXZhdGUgZXNwcmltYVByb2dyYW06IFByb2dyYW07XG5cbiAgICBwcml2YXRlIGluaXRDb3VwbGV0OiBFc3ByaW1hQ291cGxldDtcbiAgICBwcml2YXRlIGNvbG9yZXJDb3VwbGV0OiBFc3ByaW1hQ291cGxldDtcblxuICAgIGNvbnN0cnVjdG9yKGNvZGU6IHN0cmluZykge1xuICAgICAgICBsZXQgY29uZmlnOiBQYXJzZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjb21tZW50OiB0cnVlLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXNwcmltYVByb2dyYW0gPSBwYXJzZU1vZHVsZShjb2RlLCBjb25maWcpO1xuICAgICAgICB0aGlzLmluaXRDb3VwbGV0ID0gdGhpcy53YWxrUHJvZ3JlbUNvdXBsZXQoJ2luaXRpYWxpc2VyUHJvZ3JlbScpO1xuICAgICAgICB0aGlzLmNvbG9yZXJDb3VwbGV0ID0gdGhpcy53YWxrUHJvZ3JlbUNvdXBsZXQoJ2NvbG9yZXJQcm9ncmVtJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHdhbGtQcm9ncmVtQ291cGxldChmdW5jdGlvbk5hbWU6IHN0cmluZyk6IEVzcHJpbWFDb3VwbGV0IHtcbiAgICAgICAgdmFyIGZ1bmNOb2RlOiBGdW5jdGlvbkRlY2xhcmF0aW9uIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIHZhciB2ZXJzZXM6IEJhc2VOb2RlW10gPSBbXTtcbiAgICAgICAgZXNwcmltYVdhbGtBZGRQYXJlbnQodGhpcy5lc3ByaW1hUHJvZ3JhbSwgbm9kZSA9PiB7XG4gICAgICAgICAgICBpZiggbm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicgJiYgbm9kZS5pZCAmJiBub2RlLmlkLm5hbWUgPT09IGZ1bmN0aW9uTmFtZSkge1xuICAgICAgICAgICAgICAgIGZ1bmNOb2RlID0gbm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmdW5jTm9kZSAmJiBFc3ByaW1hSGVscGVyLmlzQ2hpbGROb2RlT2Yobm9kZSwgZnVuY05vZGUpKSB7IC8vICYmIEVzcHJpbWFIZWxwZXIuaXNOb3RDaGlsZE5vZGVPZihub2RlLCB2ZXJzZXMpXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nIFxuICAgICAgICAgICAgICAgICAgICB8fCBub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJ1xuICAgICAgICAgICAgICAgICAgICB8fCBub2RlLnR5cGUgPT09ICdFeHByZXNzaW9uU3RhdGVtZW50J1xuICAgICAgICAgICAgICAgICAgICB8fCBub2RlLnR5cGUgPT09ICdSZXR1cm5TdGF0ZW1lbnQnXG4gICAgICAgICAgICAgICAgICAgIHx8IG5vZGUudHlwZSA9PT0gJ0lmU3RhdGVtZW50JyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSApO1xuICAgICAgICBpZiAoZnVuY05vZGUpIHtcbiAgICAgICAgICAgIHZlcnNlcy51bnNoaWZ0KGZ1bmNOb2RlKTtcbiAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZENvdXBsZXQoZnVuY05vZGUsIHZlcnNlcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbXBvc3NpYmxlIGRlIHRyb3V2ZXIgbGEgZm9uY3Rpb24gJHtmdW5jdGlvbk5hbWV9KCkgIWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpOiBFc3ByaW1hQ291cGxldCB7XG4gICAgICAgIHJldHVybiB0aGlzLmluaXRDb3VwbGV0O1xuICAgIH1cblxuICAgIHB1YmxpYyBjb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk6IEVzcHJpbWFDb3VwbGV0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JlckNvdXBsZXQ7XG4gICAgfVxuXG4gICAgcHVibGljIGl0ZXJhdG9yKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiBFc3ByaW1hVmVyc2VJdGVyYW9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCYXNpY0VzcHJpbWFDb2RlSXRlcmF0b3IodGhpcy5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCkuZnVuY3Rpb25Sb290Tm9kZSwgc3RhdGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljRXNwcmltYVByb2dyZW1GYWN0b3J5IGltcGxlbWVudHMgRXNwcmltYVByb2dyZW1GYWN0b3J5IHtcblxuICAgIGJ1aWxkUHJvZ3JlbShjb2RlOiBzdHJpbmcpOiBFc3ByaW1hUHJvZ3JlbSB7XG4gICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBvc3NpYmxlIHRvIGJ1aWxkIFByb2dyZW0gd2l0aG91dCBjb2RlICEnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEJhc2ljRXNwcmltYVByb2dyZW0oY29kZSk7XG4gICAgfVxuXG4gICAgYnVpbGRDb3VwbGV0KG5vZGU6IEZ1bmN0aW9uRGVjbGFyYXRpb24sIHZlcnNlczogQmFzZU5vZGVbXSk6IEVzcHJpbWFDb3VwbGV0IHtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcG9zc2libGUgdG8gYnVpbGQgZW1wdHkgQ291cGxldCAhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZXNwcmltYVZlcnNlcyA9IHZlcnNlcy5tYXAodGhpcy5idWlsZFZlcnNlKTtcblxuICAgICAgICBsZXQgY291cGxldDogRXNwcmltYUNvdXBsZXQgPSB7XG4gICAgICAgICAgICBmdW5jdGlvblJvb3ROb2RlOiBub2RlLFxuICAgICAgICAgICAgdmVyc2VzOiBlc3ByaW1hVmVyc2VzXG4gICAgICAgIH1cbiAgICAgICAgLy9jb25zb2xlLmxvZygnQnVpbHQgY291cGxldDonLCBjb3VwbGV0KTtcbiAgICAgICAgcmV0dXJuIGNvdXBsZXQ7XG4gICAgfVxuXG4gICAgYnVpbGRWZXJzZShub2RlOiBCYXNlTm9kZSk6IEVzcHJpbWFWZXJzZSB7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBvc3NpYmxlIHRvIGJ1aWxkIGVtcHR5IFZlcnNlICEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb2RlID0gbm9kZTtcbiAgICAgICAgaWYobm9kZS50eXBlID09PSAnSWZTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICBjb2RlID0gKG5vZGUgYXMgSWZTdGF0ZW1lbnQpLnRlc3Q7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmVyc2U6IEVzcHJpbWFWZXJzZSA9IHsgXG4gICAgICAgICAgICBub2RlOiBub2RlLFxuICAgICAgICAgICAgY29kZTogY29kZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdmVyc2U7XG4gICAgfVxufVxuIiwiXG5leHBvcnQgY2xhc3MgRXZhbFNjb3BlIHtcblxuICAgIC8vIFNlZSBodHRwOi8vcGVyZmVjdGlvbmtpbGxzLmNvbS9nbG9iYWwtZXZhbC13aGF0LWFyZS10aGUtb3B0aW9ucy9cbiAgICAvLyBXaWxsIHJldHVybiBhbiBldmFsIGFibGUgdG8gZXZhbHVhdGUganMgY29kZSBpbiB0aGUgZ2xvYmFsIHNjb3BlLlxuICAgIHB1YmxpYyByZWFkb25seSBnbG9iYWxFdmFsID0gKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXIgaXNJbmRpcmVjdEV2YWxHbG9iYWwgPSAoZnVuY3Rpb24gKG9yaWdpbmFsLCBPYmplY3QpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gRG9lcyBgT2JqZWN0YCByZXNvbHZlIHRvIGEgbG9jYWwgdmFyaWFibGUsIG9yIHRvIGEgZ2xvYmFsLCBidWlsdC1pbiBgT2JqZWN0YCxcbiAgICAgICAgICAgICAgICAvLyByZWZlcmVuY2UgdG8gd2hpY2ggd2UgcGFzc2VkIGFzIGEgZmlyc3QgYXJndW1lbnQ/XG4gICAgICAgICAgICAgICAgcmV0dXJuICgxLCBldmFsKSgnT2JqZWN0JykgPT09IG9yaWdpbmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIC8vIGlmIGluZGlyZWN0IGV2YWwgZXJyb3JzIG91dCAoYXMgYWxsb3dlZCBwZXIgRVMzKSwgdGhlbiBqdXN0IGJhaWwgb3V0IHdpdGggYGZhbHNlYFxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoT2JqZWN0LCAxMjMpO1xuXG4gICAgICAgIGlmIChpc0luZGlyZWN0RXZhbEdsb2JhbCkge1xuICAgICAgICAgICAgLy8gaWYgaW5kaXJlY3QgZXZhbCBleGVjdXRlcyBjb2RlIGdsb2JhbGx5LCB1c2UgaXRcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXhwcmVzc2lvbjogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgxLCBldmFsKShleHByZXNzaW9uKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygd2luZG93LmV4ZWNTY3JpcHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvLyBpZiBgd2luZG93LmV4ZWNTY3JpcHQgZXhpc3RzYCwgdXNlIGl0XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV4cHJlc3Npb246IHN0cmluZykge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LmV4ZWNTY3JpcHQoZXhwcmVzc2lvbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3RoZXJ3aXNlLCBnbG9iYWxFdmFsIGlzIGB1bmRlZmluZWRgIHNpbmNlIG5vdGhpbmcgaXMgcmV0dXJuZWRcbiAgICAgICAgcmV0dXJuIChleHByOiBzdHJpbmcpID0+IHt0aHJvdyBuZXcgRXJyb3IoJ05vIGdsb2JhbCBldmFsIGF2YWlsYWJsZSAhJyk7fVxuICAgIH0pKCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbn1cbiIsImltcG9ydCB7IFByb2dyZW1TY2hlZHVsZXIsIFZlcnNlSXRlcmF0b3IsIFByb2dyZW1Db2RlLCBQcm9ncmVtVmVyc2UsIFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyLCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciwgTGluZUNoYW5nZUxpc3RlbmVyLCBGcmFtZUNoYW5nZUxpc3RlbmVyLCBQcm9ncmVtU3RhdGUsIFByb2dyZW1UZW1wbywgUHJvZ3JlbUNvbmZpZyB9IGZyb20gXCIuL1R5cGVzXCI7XG5cbmNsYXNzIFNpbXBsZVByb2dyZW1TY2hlZHVsZXIgaW1wbGVtZW50cyBQcm9ncmVtU2NoZWR1bGVyIHtcbiAgICBcbiAgICBwcml2YXRlIHN0YXRlOiBQcm9ncmVtU3RhdGU7XG4gICAgcHJpdmF0ZSBjb2RlSXRlcmF0b3I6IFZlcnNlSXRlcmF0b3I8YW55PiB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBzdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lcnM6IFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGNvZGVFeGVjdXRpb25MaXN0ZW5lcnM6IENvZGVFeGVjdXRpb25MaXN0ZW5lcltdID0gW107XG4gICAgcHJpdmF0ZSBncmlkQ2hhbmdlTGlzdGVuZXJzOiBHcmlkQ2hhbmdlTGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgbGluZUNoYW5nZUxpc3RlbmVyczogTGluZUNoYW5nZUxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGZyYW1lQ2hhbmdlTGlzdGVuZXJzOiBGcmFtZUNoYW5nZUxpc3RlbmVyW10gPSBbXTtcblxuICAgIHB1YmxpYyB0ZW1wbzogUHJvZ3JlbVRlbXBvID0gUHJvZ3JlbVRlbXBvLkJ5TGluZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBQcm9ncmVtQ29uZmlnLCBwcml2YXRlIGNvZGU6IFByb2dyZW1Db2RlPGFueT4pIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVTdGFydEl0ZXJhdGluZ0NvZGUobGlzdGVuZXI6IFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gICAgXG5cbiAgICBzdWJzY3JpYmVDb2RlRXhlY3V0aW9uKGxpc3RlbmVyOiBDb2RlRXhlY3V0aW9uTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb2RlRXhlY3V0aW9uTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gICAgXG4gICAgXG4gICAgc3Vic2NyaWJlR3JpZENoYW5nZShsaXN0ZW5lcjogR3JpZENoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ3JpZENoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVMaW5lQ2hhbmdlKGxpc3RlbmVyOiBMaW5lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5lQ2hhbmdlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZUZyYW1lQ2hhbmdlKGxpc3RlbmVyOiBGcmFtZUNoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZnJhbWVDaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmVzZXQoKTogUHJvZ3JlbVN0YXRlIHtcbiAgICAgICAgbGV0IGluaXRpYWxDb250ZXh0ZSA9IHt9O1xuICAgICAgICAvLyBDYWxsIGp1c3QgZXZhbHVhdGVkIGluaXRpYWxpc2VyUHJvZ3JlbSBmdW5jdGlvblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGluaXRpYWxpc2VyUHJvZ3JlbSh0aGlzLmNvbmZpZywgaW5pdGlhbENvbnRleHRlKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0xvYWRlZCBpbml0aWFsIGNvbnRleHRlOiAnLCBpbml0aWFsQ29udGV4dGUpO1xuICAgICAgICBsZXQgc3RhdGUgPSBuZXcgUHJvZ3JlbVN0YXRlKDAsIDAsIDAsIGluaXRpYWxDb250ZXh0ZSwgbnVsbCk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBjdXJyZW50KCk6IFByb2dyZW1TdGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cblxuICAgIG5leHQoKTogUHJvZ3JlbVN0YXRlW10ge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUpIHRocm93IG5ldyBFcnJvcignSW5jb25zaXN0ZW50IFByb2dyZW0gc3RhdGUgIScpO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMudGVtcG8gPT09IFByb2dyZW1UZW1wby5CeVZlcnNlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb2RlSXRlcmF0b3IgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29kZUl0ZXJhdG9yID0gdGhpcy5jb2RlLml0ZXJhdG9yKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZVN0YXJ0SXRlcmF0aW5nQ29kZSh0aGlzLnN0YXRlKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2hhc05leHQ6JywgdGhpcy5jb2RlSXRlcmF0b3IuaGFzTmV4dCgpKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY29kZUl0ZXJhdG9yLmhhc05leHQoKSkge1xuICAgICAgICAgICAgICAgIGxldCB2ZXJzZSA9IHRoaXMuY29kZUl0ZXJhdG9yLmV4ZWN1dGVOZXh0KCk7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0gbmV3IFByb2dyZW1TdGF0ZSh0aGlzLnN0YXRlLmNvbG9ubmUsIHRoaXMuc3RhdGUubGlnbmUsIHRoaXMuc3RhdGUuZnJhbWUsIHRoaXMuc3RhdGUuY29udGV4dGUsIHZlcnNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlRXhlY3V0aW9uTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUNvZGVFeGVjdXRpb24obmV3U3RhdGUpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW25ld1N0YXRlXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnRmluaXNoZWQgaXRlcmF0aW5nIG92ZXIgY29kZS4nKVxuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgICAgIGxldCBub3RpZnlQaXhlbENoYW5nZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbm90aWZ5TGluZUNoYW5nZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbm90aWZ5RnJhbWVDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgbGV0IGJ1ZmZlcmVkU3RhdGVzOiBQcm9ncmVtU3RhdGVbXSA9IFtdO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBsZXQgX2NvbG9ubmUgPSB0aGlzLnN0YXRlLmNvbG9ubmU7XG4gICAgICAgICAgICBsZXQgX2xpZ25lID0gdGhpcy5zdGF0ZS5saWduZTtcbiAgICAgICAgICAgIGxldCBfZnJhbWUgPSB0aGlzLnN0YXRlLmZyYW1lO1xuXG4gICAgICAgICAgICBfY29sb25uZSArKztcbiAgICAgICAgICAgIG5vdGlmeVBpeGVsQ2hhbmdlID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKF9jb2xvbm5lID49IHRoaXMuY29uZmlnLm5vbWJyZUNvbG9ubmVzKSB7XG4gICAgICAgICAgICAgICAgX2NvbG9ubmUgPSAwO1xuICAgICAgICAgICAgICAgIF9saWduZSArKztcbiAgICAgICAgICAgICAgICBub3RpZnlMaW5lQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF9saWduZSA+PSB0aGlzLmNvbmZpZy5ub21icmVMaWduZXMpIHtcbiAgICAgICAgICAgICAgICBfbGlnbmUgPSAwO1xuICAgICAgICAgICAgICAgIF9mcmFtZSArKztcbiAgICAgICAgICAgICAgICBub3RpZnlGcmFtZUNoYW5nZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfZnJhbWUgPj0gdGhpcy5jb25maWcubm9tYnJlRnJhbWVzKSB7XG4gICAgICAgICAgICAgICAgX2ZyYW1lID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0gbmV3IFByb2dyZW1TdGF0ZShfY29sb25uZSwgX2xpZ25lLCBfZnJhbWUsIHRoaXMuc3RhdGUuY29udGV4dGUsIG51bGwpO1xuICAgIFxuICAgICAgICAgICAgaWYgKG5vdGlmeVBpeGVsQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUdyaWRDaGFuZ2UodGhpcy5zdGF0ZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm90aWZ5TGluZUNoYW5nZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGluZUNoYW5nZUxpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVMaW5lQ2hhbmdlKHRoaXMuc3RhdGUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vdGlmeUZyYW1lQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZUNoYW5nZUxpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVGcmFtZUNoYW5nZSh0aGlzLnN0YXRlKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJ1ZmZlcmVkU3RhdGVzLnB1c2godGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgICAgICAvL3RoaXMuY29kZUl0ZXJhdG9yID0gdGhpcy5jb2RlLml0ZXJhdG9yKG5ld1N0YXRlKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9IHdoaWxlKHRoaXMudGVtcG8gPT09IFByb2dyZW1UZW1wby5CeUxpbmUgJiYgIW5vdGlmeUxpbmVDaGFuZ2UgfHwgdGhpcy50ZW1wbyA9PT0gUHJvZ3JlbVRlbXBvLkJ5RnJhbWUgJiYgIW5vdGlmeUZyYW1lQ2hhbmdlKTtcblxuICAgICAgICB0aGlzLmNvZGVJdGVyYXRvciA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIGJ1ZmZlcmVkU3RhdGVzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQcm9ncmVtKCk6IFByb2dyZW1Db2RlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2RlO1xuICAgIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBTY2hlZHVsaW5nU2VydmljZSB7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtU2NoZWR1bGVyKGNvbmZpZzogUHJvZ3JlbUNvbmZpZywgY29kZTogUHJvZ3JlbUNvZGU8YW55PiwgdGVtcG86IFByb2dyZW1UZW1wbykge1xuICAgICAgICBsZXQgc2NoZWR1bGVyID0gbmV3IFNpbXBsZVByb2dyZW1TY2hlZHVsZXIoY29uZmlnLCBjb2RlKTtcbiAgICAgICAgc2NoZWR1bGVyLnRlbXBvID0gdGVtcG87XG4gICAgICAgIHJldHVybiBzY2hlZHVsZXI7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgU3R5bGVEZWNvcmF0b3IgfSBmcm9tIFwiLi4vLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgQmFzZU5vZGUsIEZ1bmN0aW9uRGVjbGFyYXRpb24sIEJsb2NrU3RhdGVtZW50LCBJZlN0YXRlbWVudCwgVmFyaWFibGVEZWNsYXJhdG9yLCBWYXJpYWJsZURlY2xhcmF0aW9uLCBBc3NpZ25tZW50RXhwcmVzc2lvbiwgQmluYXJ5RXhwcmVzc2lvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgUmV0dXJuU3RhdGVtZW50LCBJZGVudGlmaWVyLCBNZW1iZXJFeHByZXNzaW9uIH0gZnJvbSBcImVzdHJlZVwiO1xuaW1wb3J0IHsgSHRtbEhlbHBlciB9IGZyb20gXCIuLi8uLi9jb3JlL0h0bWxIZWxwZXJcIjtcbmltcG9ydCB7IEVzcHJpbWFIZWxwZXIgfSBmcm9tIFwiLi4vLi4vZXNwcmltYS9Fc3ByaW1hSGVscGVyXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBFc3ByaW1hVmVyc2UsIEVzcHJpbWFIdG1sQ291cGxldEZhY3RvcnksIEVzcHJpbWFDb3VwbGV0IH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYVR5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBFc3ByaW1hUHJvZ3JlbUluc3BlY3Rvckh0bWxGYWN0b3J5IGltcGxlbWVudHMgRXNwcmltYUh0bWxDb3VwbGV0RmFjdG9yeSB7XG5cbiAgICBwcml2YXRlIGh0bWxWZXJzZXNNYXA6IE1hcDxCYXNlTm9kZSwgSFRNTEVsZW1lbnQ+ID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY291cGxldDogRXNwcmltYUNvdXBsZXQsXG4gICAgICAgIHByaXZhdGUgZGVjb3JhdG9yOiBTdHlsZURlY29yYXRvcjxCYXNlTm9kZT5cbiAgICApIHt9XG5cbiAgICBidWlsZENvdXBsZXQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgaHRtbENvdXBsZXQgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLmNvdXBsZXQuZnVuY3Rpb25Sb290Tm9kZSk7XG4gICAgICAgIGh0bWxDb3VwbGV0LmNsYXNzTGlzdC5hZGQoJ3Byb2dyZW0taW5zcGVjdG9yLWNvbXBvbmVudCcpO1xuICAgICAgICByZXR1cm4gaHRtbENvdXBsZXQ7XG4gICAgfVxuXG4gICAgZ2V0SHRtbFZlcnNlKHZlcnNlOiBFc3ByaW1hVmVyc2UpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICh0aGlzLmh0bWxWZXJzZXNNYXAuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbGxlZ2FsU3RhdGVFcnJvcjogY291cGxldCBtdXN0IGJlIGJ1aWx0IGJlZm9yZSBjYWxsaW5nIGdldEh0bWxWZXJzZSgpICEnKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0bWxFbGVtZW50ID0gdGhpcy5odG1sVmVyc2VzTWFwLmdldCh2ZXJzZS5ub2RlKTtcbiAgICAgICAgaWYgKCFodG1sRWxlbWVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIEhUTUxFbGVtZW50IGZvdW5kIG1hdGNoaW5nIHZlcnNlOicsIHZlcnNlLCAnIScpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIEhUTUxFbGVtZW50IGZvdW5kIG1hdGNoaW5nIHN1cHBsaWVkIHZlcnNlICFgKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGh0bWxFbGVtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkIE5vZGUgYXBwbHlpbmcgZGVjb3JhdG9ycy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbm9kZSB0aGUgbm9kZSBmb3Igd2hpY2ggdG8gcHJvZHVjZSBIVE1MXG4gICAgICogQHBhcmFtIHNpYmxpbmdzIHRoZSBub2RlcyB0byBhZGQgYXMgc2libGluZ3Mgb2YgdGhlIG5vZGVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYnVpbGROb2RlKG5vZGU6IEJhc2VOb2RlIHwgdW5kZWZpbmVkIHwgbnVsbCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gSHRtbEhlbHBlci5zcGFuKCdlbXB0eScsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2libGluZ3M6IEhUTUxFbGVtZW50W10gPSBbXVxuICAgICAgICBsZXQgaHRtbE91dHB1dCA9IHRoaXMuYnVpbGROb2RlSW50ZXJuYWwobm9kZSwgc2libGluZ3MpO1xuICAgICAgICBodG1sT3V0cHV0ID0gdGhpcy5kZWNvcmF0b3IuZGVjb3JhdGUobm9kZSwgaHRtbE91dHB1dCk7XG5cbiAgICAgICAgbGV0IG1hdGNoaW5nVmVyc2UgPSB0aGlzLmNvdXBsZXQudmVyc2VzLmZpbmQodiA9PiB2Lm5vZGUgPT09IG5vZGUpO1xuICAgICAgICBpZiAobWF0Y2hpbmdWZXJzZSkge1xuICAgICAgICAgICAgaHRtbE91dHB1dCA9IHRoaXMuZW5jYXBzdWxhdGVOb2RlSW5WZXJzZUNvbnRhaW5lcihodG1sT3V0cHV0KTtcbiAgICAgICAgICAgIC8vIFRoaXMgbm9kZSBpcyB0aGUgcm9vdCBub2RlIG9mIGEgVmVyc2VcbiAgICAgICAgICAgIHRoaXMuaHRtbFZlcnNlc01hcC5zZXQobWF0Y2hpbmdWZXJzZS5ub2RlLCBodG1sT3V0cHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaWJsaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBJZiBzaWJsaW5ncywgYnVpbGQgZWFjaCBzaWJsaW5nXG4gICAgICAgICAgICBodG1sT3V0cHV0ID0gSHRtbEhlbHBlci5zcGFuKCdzaWJsaW5nLWNvbnRhaW5lcicsIGh0bWxPdXRwdXQpO1xuICAgICAgICAgICAgd2hpbGUoc2libGluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBzaWJsaW5nID0gc2libGluZ3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBpZiAoc2libGluZykge1xuICAgICAgICAgICAgICAgICAgICAvL2xldCBzaWJsaW5nT3V0ID0gdGhpcy5idWlsZE5vZGUoc2libGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGh0bWxPdXRwdXQuYXBwZW5kQ2hpbGQoc2libGluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGh0bWxPdXRwdXQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGVuY2Fwc3VsYXRlTm9kZUluVmVyc2VDb250YWluZXIoaHRtbEVsdDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBjb250ZW50ID0gSHRtbEhlbHBlci5zcGFuKCd2ZXJzZS1jb250ZW50JywgaHRtbEVsdCk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3ZlcnNlIHZlcnNlLWNvbnRhaW5lcicsIGNvbnRlbnQpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkIG5vZGUuXG4gICAgICogQHBhcmFtIG5vZGUgXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGJ1aWxkTm9kZUludGVybmFsKG5vZGU6IEJhc2VOb2RlLCBzaWJsaW5nczogSFRNTEVsZW1lbnRbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQnVpbGRpbmcgbm9kZScsIG5vZGUsICcuLi4nKTtcbiAgICAgICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Z1bmN0aW9uRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkRnVuY3Rpb25EZWNsYXJhdGlvbihub2RlLCBzaWJsaW5ncyk7XG4gICAgICAgICAgICBjYXNlICdCbG9ja1N0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRCbG9ja1N0YXRlbWVudChub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0lmU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZElmU3RhdGVtZW50KG5vZGUsIHNpYmxpbmdzKTtcbiAgICAgICAgICAgIGNhc2UgJ1ZhcmlhYmxlRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkVmFyaWFibGVEZWNsYXJhdGlvbihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ1ZhcmlhYmxlRGVjbGFyYXRvcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRWYXJpYWJsZURlY2xhcmF0b3Iobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdBc3NpZ25tZW50RXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRBc3NpZ25tZW50RXhwcmVzc2lvbihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0JpbmFyeUV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQmluYXJ5RXhwcmVzc2lvbihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0V4cHJlc3Npb25TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkRXhwcmVzc2lvblN0YXRlbWVudChub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ1JldHVyblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRSZXR1cm5TdGF0ZW1lbnQobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdJZGVudGlmaWVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZElkZW50aWZpZXIobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdNZW1iZXJFeHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZE1lbWJlckV4cHJlc3Npb24obm9kZSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkRGVmYXVsdChub2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEZ1bmN0aW9uRGVjbGFyYXRpb24obm9kZTogQmFzZU5vZGUsIHNpYmxpbmdzOiBIVE1MRWxlbWVudFtdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgXG4gICAgICAgIGxldCBkZWNsU3RhcnRJdGVtczogKHN0cmluZyB8IEhUTUxFbGVtZW50KVtdO1xuICAgICAgICBpZiAobi5pZCkge1xuICAgICAgICAgICAgbGV0IGZ1bmNJZCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1pZCcsIG4uaWQubmFtZSk7XG4gICAgICAgICAgICBkZWNsU3RhcnRJdGVtcyA9IFsnZnVuY3Rpb24gJywgZnVuY0lkLCAnICggJ107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWNsU3RhcnRJdGVtcyA9IFsnZnVuY3Rpb24gKCAnXTsvLyArIGZ1bmMucGFyYW1zLm1hcCh4ID0+IHgubmFtZSkuam9pbignLCAnKSArICcgKSB7JztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJhbUNvdW50ID0gbi5wYXJhbXMubGVuZ3RoO1xuICAgICAgICBuLnBhcmFtcy5mb3JFYWNoKChwYXJhbSwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBFc3ByaW1hSGVscGVyLnBhdHRlcm5Ub1N0cmluZyhwYXJhbSk7XG4gICAgICAgICAgICBsZXQgZnVuY1BhcmFtID0gdGhpcy5idWlsZE5vZGUocGFyYW0pOy8vSHRtbEhlbHBlci5zcGFuKCdmdW5jLXBhcmFtJywgdmFyTmFtZSk7XG4gICAgICAgICAgICBkZWNsU3RhcnRJdGVtcy5wdXNoKGZ1bmNQYXJhbSk7XG4gICAgICAgICAgICBpZiAoaSA8IHBhcmFtQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgZGVjbFN0YXJ0SXRlbXMucHVzaCgnLCAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVjbFN0YXJ0SXRlbXMucHVzaCgnICkgeycpO1xuXG4gICAgICAgIGxldCBkZWNsU3RhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtc3RhcnQnLCBkZWNsU3RhcnRJdGVtcyk7XG4gICAgICAgIGxldCBmdW5jQm9keSA9IHRoaXMuYnVpbGROb2RlKG4uYm9keSk7XG4gICAgICAgIGxldCBkZWNsRW5kID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLWVuZCcsICd9Jyk7XG4gICAgICAgIGRlY2xFbmQgPSB0aGlzLmVuY2Fwc3VsYXRlTm9kZUluVmVyc2VDb250YWluZXIoZGVjbEVuZCk7XG4gICAgICAgIC8vbGV0IGRlY2wgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtZGVjbGFyYXRpb24nLCBbZGVjbFN0YXJ0LCBmdW5jQm9keSwgZGVjbEVuZF0pO1xuICAgICAgICBsZXQgZGVjbCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1kZWNsYXJhdGlvbicsIGRlY2xTdGFydCk7XG4gICAgICAgIHNpYmxpbmdzLnB1c2goZnVuY0JvZHkpO1xuICAgICAgICBzaWJsaW5ncy5wdXNoKGRlY2xFbmQpO1xuICAgICAgICByZXR1cm4gZGVjbDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRCbG9ja1N0YXRlbWVudChub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICBsZXQgYm9keVN0YXRlbWVudHMgPSBuLmJvZHkubWFwKHN0YXRlbWVudCA9PiB0aGlzLmJ1aWxkTm9kZShzdGF0ZW1lbnQpKVxuICAgICAgICByZXR1cm4gSHRtbEhlbHBlci5zcGFuKCdibG9jaycsIGJvZHlTdGF0ZW1lbnRzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRJZlN0YXRlbWVudChub2RlOiBCYXNlTm9kZSwgc2libGluZ3M6IEhUTUxFbGVtZW50W10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBJZlN0YXRlbWVudDtcbiAgICAgICAgbGV0IGNvbnRlbnQ6IEhUTUxFbGVtZW50W10gPSBbXVxuICAgICAgICBsZXQgdGVzdCA9IHRoaXMuYnVpbGROb2RlKG4udGVzdCk7XG4gICAgICAgIGxldCBpZlN0YXJ0VGV4dCA9IFsnaWYgKCAnLCB0ZXN0LCAnICkgeyddO1xuICAgICAgICBsZXQgaWZTdGFydCA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLXN0YXRlbWVudC1zdGFydCcsIGlmU3RhcnRUZXh0KTtcbiAgICAgICAgY29udGVudC5wdXNoKGlmU3RhcnQpO1xuXG4gICAgICAgIGxldCB0aGVuQmxvY2sgPSB0aGlzLmJ1aWxkTm9kZShuLmNvbnNlcXVlbnQpO1xuICAgICAgICBsZXQgaWZUaGVuID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtYmxvY2stdGhlbicsIHRoZW5CbG9jayk7XG4gICAgICAgIGNvbnRlbnQucHVzaChpZlRoZW4pO1xuICAgICAgICBzaWJsaW5ncy5wdXNoKHRoZW5CbG9jayk7XG5cbiAgICAgICAgaWYgKG4uYWx0ZXJuYXRlKSB7XG4gICAgICAgICAgICBsZXQgaWZFbHNlRGVjbCA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLXN0YXRlbWVudC1lbHNlJywgJ30gZWxzZSB7Jyk7XG4gICAgICAgICAgICBpZkVsc2VEZWNsID0gdGhpcy5lbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGlmRWxzZURlY2wpO1xuICAgICAgICAgICAgY29udGVudC5wdXNoKGlmRWxzZURlY2wpO1xuICAgICAgICAgICAgc2libGluZ3MucHVzaChpZkVsc2VEZWNsKTtcblxuICAgICAgICAgICAgbGV0IGVsc2VCbG9jayA9IHRoaXMuYnVpbGROb2RlKG4uYWx0ZXJuYXRlKTtcbiAgICAgICAgICAgIGxldCBpZkVsc2UgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1ibG9jay1lbHNlJywgZWxzZUJsb2NrKTtcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaChpZkVsc2UpO1xuICAgICAgICAgICAgc2libGluZ3MucHVzaChpZkVsc2UpO1xuICAgICAgICB9IFxuICAgICAgICBsZXQgaWZFbmQgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1zdGF0ZW1lbnQtZW5kJywgJ30nKTtcbiAgICAgICAgaWZFbmQgPSB0aGlzLmVuY2Fwc3VsYXRlTm9kZUluVmVyc2VDb250YWluZXIoaWZFbmQpO1xuICAgICAgICBjb250ZW50LnB1c2goaWZFbmQpO1xuICAgICAgICBzaWJsaW5ncy5wdXNoKGlmRW5kKTtcblxuICAgICAgICAvL2xldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1zdGF0ZW1lbnQnLCBjb250ZW50KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBpZlN0YXJ0O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZFZhcmlhYmxlRGVjbGFyYXRpb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0aW9uO1xuICAgICAgICBsZXQgZGVjbGFyYXRpb25zID0gbi5kZWNsYXJhdGlvbnMubWFwKGQgPT4gdGhpcy5idWlsZE5vZGUoZCkpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdkZWNsYXJhdGlvbiB2YXJpYWJsZS1kZWNsYXJhdGlvbicpO1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gbi5raW5kICsgJyAnO1xuICAgICAgICBkZWNsYXJhdGlvbnMuZm9yRWFjaChkID0+IGNvbnRhaW5lci5hcHBlbmRDaGlsZChkKSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkVmFyaWFibGVEZWNsYXJhdG9yKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdG9yO1xuICAgICAgICBsZXQgbGVmdFBhcnQgPSB0aGlzLmJ1aWxkTm9kZShuLmlkKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lcjtcbiAgICAgICAgaWYgKG4uaW5pdCkge1xuICAgICAgICAgICAgbGV0IGFzc2lnblBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ29wZXJhdG9yIGFzc2lnbi1vcGVyYXRvcicsICc9Jyk7XG4gICAgICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmJ1aWxkTm9kZShuLmluaXQpO1xuICAgICAgICAgICAgbGV0IHJpZ2h0UGFydCA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtdmFsdWUnLCByaWdodCk7XG4gICAgICAgICAgICBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gdmFyaWFibGUtZGVjbGFyYXRvcicsIFtsZWZ0UGFydCwgYXNzaWduUGFydCwgcmlnaHRQYXJ0XSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gdmFyaWFibGUtZGVjbGFyYXRvcicsIGxlZnRQYXJ0KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRBc3NpZ25tZW50RXhwcmVzc2lvbihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuYnVpbGROb2RlKG4ubGVmdCk7XG4gICAgICAgIGxldCBsZWZ0UGFydCA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtaWQnLCBsZWZ0KTtcbiAgICAgICAgbGV0IGFzc2lnblBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ29wZXJhdG9yIGFzc2lnbi1vcGVyYXRvcicsICc9Jyk7XG4gICAgICAgIGxldCByaWdodCA9IHRoaXMuYnVpbGROb2RlKG4ucmlnaHQpO1xuICAgICAgICBsZXQgcmlnaHRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS12YWx1ZScsIHJpZ2h0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiBhc3NpZ25tZW50LWV4cHJlc3Npb24nLCBbbGVmdFBhcnQsIGFzc2lnblBhcnQsIHJpZ2h0UGFydF0pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEJpbmFyeUV4cHJlc3Npb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBCaW5hcnlFeHByZXNzaW9uO1xuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuYnVpbGROb2RlKG4ubGVmdCk7XG4gICAgICAgIGxldCBsZWZ0UGFydCA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbicsIGxlZnQpO1xuICAgICAgICBsZXQgb3BlcmF0b3JQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdvcGVyYXRvciBleHByZXNzaW9uLW9wZXJhdG9yJywgbi5vcGVyYXRvcik7XG4gICAgICAgIGxldCByaWdodCA9IHRoaXMuYnVpbGROb2RlKG4ucmlnaHQpO1xuICAgICAgICBsZXQgcmlnaHRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uJywgcmlnaHQpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIGJpbmFyeS1leHByZXNzaW9uJywgW2xlZnRQYXJ0LCBvcGVyYXRvclBhcnQsIHJpZ2h0UGFydF0pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEV4cHJlc3Npb25TdGF0ZW1lbnQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBFeHByZXNzaW9uU3RhdGVtZW50O1xuICAgICAgICBsZXQgY29kZSA9IHRoaXMuYnVpbGROb2RlKG4uZXhwcmVzc2lvbik7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBleHByZXNzaW9uLXN0YXRlbWVudCcsIGNvZGUpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZFJldHVyblN0YXRlbWVudChub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIFJldHVyblN0YXRlbWVudDtcbiAgICAgICAgbGV0IGFyZyA9IHRoaXMuYnVpbGROb2RlKG4uYXJndW1lbnQpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgcmV0dXJuLXN0YXRlbWVudCcsIFsncmV0dXJuICcsIGFyZ10pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZElkZW50aWZpZXIobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBJZGVudGlmaWVyO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdpZGVudGlmaWVyJywgRXNwcmltYUhlbHBlci5wYXR0ZXJuVG9TdHJpbmcobikpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZE1lbWJlckV4cHJlc3Npb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBNZW1iZXJFeHByZXNzaW9uO1xuICAgICAgICBsZXQgb2JqZWN0ID0gdGhpcy5idWlsZE5vZGUobi5vYmplY3QpO1xuICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLmJ1aWxkTm9kZShuLnByb3BlcnR5KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiBtZW1iZXItZXhwcmVzc2lvbicsIFtvYmplY3QsICcuJywgcHJvcGVydHldKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGREZWZhdWx0KG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdkZWZhdWx0OicsIG5vZGUpO1xuICAgICAgICBsZXQgY29kZSA9IGVzY29kZUdlbmVyYXRlKG5vZGUpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdkZWZhdWx0LScgKyBub2RlLnR5cGUsIGNvZGUpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBQcm9ncmVtQ29tcG9uZW50LCBQcm9ncmVtU2NoZWR1bGVyLCBIdG1sQ291cGxldEZhY3RvcnksIFByb2dyZW1TdGF0ZSwgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyLCBHcmlkQ2hhbmdlTGlzdGVuZXIgfSBmcm9tICcuLi8uLi9jb3JlL1R5cGVzJztcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBQcm9ncmVtQ29tcG9uZW50LCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciB7XG5cbiAgICBwcml2YXRlIGV4ZWN1dGluZ0VsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgcHJpdmF0ZSBleGVjdXRlZEVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVYRUNVVElOR19DTEFTUyA9ICd2ZXJzZS1leGVjdXRpbmcnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVhFQ1VURURfQ0xBU1MgPSAndmVyc2UtZXhlY3V0ZWQnO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyLFxuICAgICAgICBwcml2YXRlIGh0bWxGYWN0b3J5OiBIdG1sQ291cGxldEZhY3Rvcnk8YW55PlxuICAgICkge1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlQ29kZUV4ZWN1dGlvbih0aGlzKTtcbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUdyaWRDaGFuZ2UodGhpcyk7XG4gICAgfVxuXG4gICAgcmVuZGVySHRtbCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBodG1sQ29tcG9uZW50ID0gdGhpcy5odG1sRmFjdG9yeS5idWlsZENvdXBsZXQoKTtcbiAgICAgICAgcmV0dXJuIGh0bWxDb21wb25lbnQ7XG4gICAgfVxuICAgIFxuICAgIGZpcmVDb2RlRXhlY3V0aW9uKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFzdGF0ZS52ZXJzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgbGV0IGh0bWxWZXJzZSA9IHRoaXMuaHRtbEZhY3RvcnkuZ2V0SHRtbFZlcnNlKHN0YXRlLnZlcnNlKTtcbiAgICAgICAgaWYoaHRtbFZlcnNlKSB7XG4gICAgICAgICAgICBodG1sVmVyc2UuY2xhc3NMaXN0LmFkZChQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRoaXMuZXhlY3V0aW5nRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGVsdCA9IHRoaXMuZXhlY3V0aW5nRWxlbWVudHMucG9wKCk7XG4gICAgICAgICAgICBpZiAoZWx0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlZEVsZW1lbnRzLnB1c2goZWx0KTtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5hZGQoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRFRF9DTEFTUyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFodG1sVmVyc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZXhlY3V0aW5nRWxlbWVudHMucHVzaChodG1sVmVyc2UpO1xuICAgICAgICBodG1sVmVyc2UuY2xhc3NMaXN0LmFkZChQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgfVxuXG4gICAgZmlyZUdyaWRDaGFuZ2Uoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICB3aGlsZSAodGhpcy5leGVjdXRpbmdFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgZWx0ID0gdGhpcy5leGVjdXRpbmdFbGVtZW50cy5wb3AoKTtcbiAgICAgICAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVEVEX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAodGhpcy5leGVjdXRlZEVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBlbHQgPSB0aGlzLmV4ZWN1dGVkRWxlbWVudHMucG9wKCk7XG4gICAgICAgICAgICBpZiAoZWx0KSB7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5yZW1vdmUoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRFRF9DTEFTUyk7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5yZW1vdmUoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRJTkdfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBTdHlsZURlY29yYXRvciwgQ29sb3JQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNlTm9kZSwgSWRlbnRpZmllciB9IGZyb20gXCJlc3RyZWVcIjtcblxuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvQ29sb3JTZXJ2aWNlXCI7XG5pbXBvcnQgeyBFc3ByaW1hSGVscGVyIH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYUhlbHBlclwiO1xuaW1wb3J0IHsgSHRtbEhlbHBlciB9IGZyb20gXCIuLi8uLi9jb3JlL0h0bWxIZWxwZXJcIjtcblxuZXhwb3J0IGNsYXNzIENvbG9yVmFyaWFibGVTY29wZURlY29yYXRvciBpbXBsZW1lbnRzIFN0eWxlRGVjb3JhdG9yPHN0cmluZz4ge1xuXG4gICAgcHJpdmF0ZSB2YXJpYWJsZU1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKTtcbiAgICBwcml2YXRlIGNvbG9yUHJvdmlkZXI6IENvbG9yUHJvdmlkZXIgPSBDb2xvclNlcnZpY2UuY29sb3JQcm92aWRlcmFjdG9yeS5idWlsZCgpO1xuXG4gICAgZGVjb3JhdGUodmFySWQ6IHN0cmluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCB2YXJJbmRleCA9IHRoaXMudmFyaWFibGVNYXAuZ2V0KHZhcklkKTtcbiAgICAgICAgaWYgKCF2YXJJbmRleCkge1xuICAgICAgICAgICAgdmFySW5kZXggPSB0aGlzLnZhcmlhYmxlTWFwLnNpemUgKyAxO1xuICAgICAgICAgICAgdGhpcy52YXJpYWJsZU1hcC5zZXQodmFySWQsIHZhckluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndmFyaWFibGUtaGludCcpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3ZhcmlhYmxlLScgKyB2YXJJbmRleCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS1oaW50LWNvbnRhaW5lcicsIGVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH0gICAgXG4gICAgXG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBzdHlsZSA9ICcnO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCd2YXJpYWJsZSBjb3VudDonLCB0aGlzLnZhcmlhYmxlTWFwLnNpemUpO1xuICAgICAgICB0aGlzLnZhcmlhYmxlTWFwLmZvckVhY2goKGluZGV4LCBpZCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5jb2xvclByb3ZpZGVyLmhhc2hTdHJpbmdUb0NvbG9yKGlkLCAxNik7IC8vdGhpcy52YXJpYWJsZU1hcC5zaXplXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdidWlsZGluZyBjb2xvciAjJywgaWQsICc9PicsIGNvbG9yKTtcbiAgICAgICAgICAgIHN0eWxlICs9IGBcbiAgICAgICAgICAgICAgICAudmFyaWFibGUtc2NvcGUtY29tcG9uZW50IC52YXJpYWJsZS1oaW50LWNvbnRhaW5lciB7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogMC44ZW0gMCAwLjhlbSAwO1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLnZhcmlhYmxlLXNjb3BlLWNvbXBvbmVudCAudmFyaWFibGUtaGludCB7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAuMWVtIDAuNWVtIDAuMWVtIDAuNWVtO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMC44ZW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC52YXJpYWJsZS1zY29wZS1jb21wb25lbnQgLnZhcmlhYmxlLSR7aW5kZXh9LCBcbiAgICAgICAgICAgICAgICAudmFyaWFibGUtc2NvcGUtY29tcG9uZW50IC52YXJpYWJsZS0ke2luZGV4fSB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGA7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGFkVmVyc2VEZWNvcmF0b3IgaW1wbGVtZW50cyBTdHlsZURlY29yYXRvcjxCYXNlTm9kZT4ge1xuXG4gICAgZGVjb3JhdGUobm9kZTogQmFzZU5vZGUsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvZGUtcGFkZGluZycpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9ICAgIFxuICAgIFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYFxuICAgICAgICAuY29kZS1wYWRkaW5nIHtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAzMnB4O1xuICAgICAgICB9XG4gICAgICAgIGA7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBTY2hlZHVsaW5nU2VydmljZSB9IGZyb20gJy4vU2NoZWR1bGluZ1NlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Qcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50JztcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gJy4vU2NyZWVuU2VydmljZSc7XG5pbXBvcnQgeyBCYXNlTm9kZSB9IGZyb20gJ2VzdHJlZSc7XG5pbXBvcnQgeyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uLCBQcm9ncmVtU2NoZWR1bGVyLCBQcm9ncmVtQ29kZSwgUHJvZ3JlbVRlbXBvLCBQcm9ncmVtQ29uZmlnIH0gZnJvbSAnLi9UeXBlcyc7XG5pbXBvcnQgeyBQYWRWZXJzZURlY29yYXRvciwgQ29sb3JWZXJzZVZhcmlhYmxlRGVjb3JhdG9yIH0gZnJvbSAnLi4vY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9yU3R5bGVEZWNvcmF0b3JzJztcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tICcuL0h0bWxIZWxwZXInO1xuaW1wb3J0IHsgRXNwcmltYVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeSB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Fc3ByaW1hUHJvZ3JlbUluc3BlY3Rvckh0bWxGYWN0b3J5JztcbmltcG9ydCB7IENvZGVTZXJ2aWNlIH0gZnJvbSAnLi9Db2RlU2VydmljZSc7XG5pbXBvcnQgeyBQcm9ncmVtR3JpZENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUdyaWQvUHJvZ3JlbUdyaWRDb21wb25lbnQnO1xuaW1wb3J0IHsgVmFyaWFibGVTY29wZUNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvdmFyaWFibGVTY29wZS9WYXJpYWJsZVNjb3BlQ29tcG9uZW50JztcbmltcG9ydCB7IEVzcHJpbWFWYXJpYWJsZVNjb3BlSHRtbEZhY3RvcnkgfSBmcm9tICcuLi9jb21wb25lbnRzL3ZhcmlhYmxlU2NvcGUvRXNwcmltYVZhcmlhYmxlU2NvcGVIdG1sRmFjdG9yeSc7XG5pbXBvcnQgeyBDb2xvclZhcmlhYmxlU2NvcGVEZWNvcmF0b3IgfSBmcm9tICcuLi9jb21wb25lbnRzL3ZhcmlhYmxlU2NvcGUvRXNwcmltYVZhcmlhYmxlU2NvcGVTdHlsZURlY29yYXRvcnMnO1xuaW1wb3J0IHsgUHJvZ3JlbUVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUVkaXRvci9Qcm9ncmVtRWRpdG9yQ29tcG9uZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvZ3JlbUhlbHBlciB7XG5cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBQcm9ncmVtU2VydmljZSB7XG5cbiAgICB2YXIgcHJldmlvdXNSZXBhaW50VGltZSA9IDA7XG4gICAgdmFyIHNjaGVkdWxlcjogUHJvZ3JlbVNjaGVkdWxlcjtcbiAgICB2YXIgcHJvZ3JlbUFuaW1hdGlvblNwZWVkID0gMjtcbiAgICB2YXIgcHJvZ3JlbUFuaW1hdGlvbkludGVydmFscyA9IFs2MDAwMCwgNTAwMCwgMTAwMCwgNTAwLCAxMDAsIDEwLCAxXTtcbiAgICB2YXIgcHJvZ3JlbU1vZGUgPSBQcm9ncmVtVGVtcG8uQnlMaW5lO1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRGVmYXVsdENvbmZpZygpOiBQcm9ncmVtQ29uZmlnIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9ncmVtQ29uZmlnKCdTYW5zIHRpdHJlJywgMTcsIDE3LCAxKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gY3VycmVudFNjaGVkdWxlcigpOiBQcm9ncmVtU2NoZWR1bGVyIHtcbiAgICAgICAgcmV0dXJuIHNjaGVkdWxlcjtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtR3JpZENvbXBvbmVudChzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZzogUHJvZ3JlbUNvbmZpZywgY29udGFpbmVyOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGxldCBwcm9ncmVtR3JpZENvbXBvbmVudCA9IG5ldyBQcm9ncmVtR3JpZENvbXBvbmVudChzY3JlZW5Db25maWcsIHByb2dyZW1Db25maWcsIHNjaGVkdWxlciwgZG9jdW1lbnQpO1xuICAgICAgICBsZXQgcHJvZ3JlbUdyaWRIdG1sID0gcHJvZ3JlbUdyaWRDb21wb25lbnQucmVuZGVySHRtbCgpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocHJvZ3JlbUdyaWRIdG1sKTtcblxuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQocHJvZ3JlbUNvZGU6IFByb2dyZW1Db2RlPGFueT4sIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBsZXQgcHJvZ3JlbUNvdXBsZXQgPSBwcm9ncmVtQ29kZS5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk7XG4gICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9yRGVjb3JhdG9ycyA9IG5ldyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uPEJhc2VOb2RlPihbXG4gICAgICAgICAgICBuZXcgUGFkVmVyc2VEZWNvcmF0b3IoKSxcbiAgICAgICAgICAgIG5ldyBDb2xvclZlcnNlVmFyaWFibGVEZWNvcmF0b3IoKSxcbiAgICAgICAgICAgIC8vbmV3IEhpZ2hsaWdodEV4ZWN1dGluZ1ZlcnNlRGVjb3JhdG9yKHNjaGVkdWxlciksXG4gICAgICAgIF0pO1xuICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3RvckZhY3RvcnkgPSBuZXcgRXNwcmltYVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeShwcm9ncmVtQ291cGxldCwgcHJvZ3JlbUluc3BlY3RvckRlY29yYXRvcnMpO1xuICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3RvclZpZXcgPSBuZXcgUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudChzY2hlZHVsZXIsIHByb2dyZW1JbnNwZWN0b3JGYWN0b3J5KTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKCdjb2RlRWxlbWVudCcsIGNvZGVFbGVtZW50KTtcbiAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JIdG1sID0gcHJvZ3JlbUluc3BlY3RvclZpZXcucmVuZGVySHRtbCgpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocHJvZ3JlbUluc3BlY3Rvckh0bWwpO1xuXG4gICAgICAgIGxldCBkZWNvcmF0b3JTdHlsZSA9IHByb2dyZW1JbnNwZWN0b3JEZWNvcmF0b3JzLmJ1aWxkU3R5bGVTaGVldCgpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdkZWNvcmF0b3JTdHlsZTonLCBkZWNvcmF0b3JTdHlsZSlcbiAgICAgICAgSHRtbEhlbHBlci5kZWZpbmVDc3NSdWxlcygncHJvZ3JlbS1pbnNwZWN0b3ItY29tcG9uZW50JywgZGVjb3JhdG9yU3R5bGUpO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFZhcmlhYmxlU2NvcGVDb21wb25lbnQocHJvZ3JlbUNvZGU6IFByb2dyZW1Db2RlPGFueT4sIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBsZXQgcHJvZ3JlbUNvdXBsZXQgPSBwcm9ncmVtQ29kZS5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk7XG4gICAgICAgIGxldCB2YXJpYWJsZVNjb3BlRGVjb3JhdG9ycyA9IG5ldyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uPHN0cmluZz4oW1xuICAgICAgICAgICAgbmV3IENvbG9yVmFyaWFibGVTY29wZURlY29yYXRvcigpXG4gICAgICAgIF0pXG4gICAgICAgIGxldCBodG1sRmFjdG9yeSA9IG5ldyBFc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5KHByb2dyZW1Db3VwbGV0LCB2YXJpYWJsZVNjb3BlRGVjb3JhdG9ycywgc2NoZWR1bGVyKTtcbiAgICAgICAgbGV0IHZhcmlhYmxlU2NvcGVDb21wb25lbnQgPSBuZXcgVmFyaWFibGVTY29wZUNvbXBvbmVudChzY2hlZHVsZXIsIGh0bWxGYWN0b3J5KTtcbiAgICAgICAgbGV0IHZhcmlhYmxlU2NvcGVIdG1sID0gdmFyaWFibGVTY29wZUNvbXBvbmVudC5yZW5kZXJIdG1sKCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh2YXJpYWJsZVNjb3BlSHRtbCk7XG5cbiAgICAgICAgbGV0IGRlY29yYXRvclN0eWxlID0gdmFyaWFibGVTY29wZURlY29yYXRvcnMuYnVpbGRTdHlsZVNoZWV0KCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2RlY29yYXRvclN0eWxlOicsIGRlY29yYXRvclN0eWxlKVxuICAgICAgICBIdG1sSGVscGVyLmRlZmluZUNzc1J1bGVzKCd2YXJpYWJsZS1zY29wZS1jb21wb25lbnQnLCBkZWNvcmF0b3JTdHlsZSk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJvZ3JlbUVkaXRvckNvbXBvbmVudChwcm9ncmVtQ29kZTogUHJvZ3JlbUNvZGU8YW55Piwgc2NyZWVuQ29uZmlnOiBTY3JlZW5Db25maWcpOiB2b2lkIHtcbiAgICAgICAgbGV0IHByb2dyZW1FZGl0b3JDb21wb25lbnQgPSBuZXcgUHJvZ3JlbUVkaXRvckNvbXBvbmVudCgpO1xuICAgICAgICBwcm9ncmVtRWRpdG9yQ29tcG9uZW50LmF0dGFjaChkb2N1bWVudCk7XG4gICAgICAgIHByb2dyZW1FZGl0b3JDb21wb25lbnQubG9hZFByb2dyZW0ocHJvZ3JlbUNvZGUpO1xuICAgICAgICBwcm9ncmVtRWRpdG9yQ29tcG9uZW50LmJpbmRSZWZyZXNoKGNvZGUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ25ldyBwcm9ncmVtIGNvZGU6JywgY29kZSk7XG4gICAgICAgICAgICBsZXQgcHJvZ3JlbUNvZGUgPSBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFByb2dyZW0oY29kZSk7XG5cbiAgICAgICAgICAgIGxldCBzY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZW0tc2NyaXB0LXRhZycpIGFzIEhUTUxTY3JpcHRFbGVtZW50O1xuICAgICAgICAgICAgc2NyaXB0RWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICAgICAgc2NyaXB0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwcm9ncmVtLXNjcmlwdC10YWcnKVxuICAgICAgICAgICAgc2NyaXB0RWxlbWVudC50ZXh0ID0gY29kZTtcbiAgICAgICAgICAgIGxldCBib2R5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgICAgICAgIGlmIChib2R5RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGJvZHlFbGVtZW50LmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnVpbGRQcm9ncmVtVmlld2VyKHByb2dyZW1Db2RlLCBzY3JlZW5Db25maWcsIGJ1aWxkRGVmYXVsdENvbmZpZygpKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtVmlld2VyKHByb2dyZW1Db2RlOiBQcm9ncmVtQ29kZTxhbnk+LCBzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZzogUHJvZ3JlbUNvbmZpZykge1xuICAgICAgICAvLyBMb2FkIGluaXRQcm9ncmVtIEZ1bmN0aW9uIGNvZGVcbiAgICAgICAgbGV0IGluaXRQcm9ncmVtRnVuY3Rpb25Db2RlID0gZXNjb2RlR2VuZXJhdGUocHJvZ3JlbUNvZGUuaW5pdGlhbGlzZXJQcm9ncmVtRnVuY3Rpb24oKS5mdW5jdGlvblJvb3ROb2RlKTtcbiAgICAgICAgKHdpbmRvdyBhcyBhbnkpLmV2YWwoaW5pdFByb2dyZW1GdW5jdGlvbkNvZGUpO1xuXG4gICAgICAgIHNjaGVkdWxlciA9IFNjaGVkdWxpbmdTZXJ2aWNlLmJ1aWxkUHJvZ3JlbVNjaGVkdWxlcihwcm9ncmVtQ29uZmlnLCBwcm9ncmVtQ29kZSwgcHJvZ3JlbU1vZGUpO1xuICAgICAgICBjb25zdCB0aXRyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aXRyZScpO1xuICAgICAgICBpZiAodGl0cmUpIHtcbiAgICAgICAgICAgIHRpdHJlLmlubmVySFRNTCA9IHByb2dyZW1Db25maWcudGl0cmU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvZ3JlbUdyaWRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignLnByb2dyZW0tZ3JpZC1jb21wb25lbnQnKTtcbiAgICAgICAgaWYgKHByb2dyZW1HcmlkQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBidWlsZFByb2dyZW1HcmlkQ29tcG9uZW50KHNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZywgcHJvZ3JlbUdyaWRDb250YWluZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignLnByb2dyZW0taW5zcGVjdG9yLWNvbXBvbmVudCcpO1xuICAgICAgICBpZiAocHJvZ3JlbUluc3BlY3RvckNvbnRhaW5lcikge1xuICAgICAgICAgICAgYnVpbGRQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50KHByb2dyZW1Db2RlLCBwcm9ncmVtSW5zcGVjdG9yQ29udGFpbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2YXJpYWJsZVNjb3BlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJy52YXJpYWJsZS1zY29wZS1jb21wb25lbnQnKTtcbiAgICAgICAgaWYgKHZhcmlhYmxlU2NvcGVDb250YWluZXIpIHtcbiAgICAgICAgICAgIGJ1aWxkVmFyaWFibGVTY29wZUNvbXBvbmVudChwcm9ncmVtQ29kZSwgdmFyaWFibGVTY29wZUNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRDb250cm9sUGFuZWxDb21wb25lbnQoKSB7XG4gICAgICAgIGxldCBzcGVlZENvbnRyb2xFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNvbnRyb2wtcGFuZWwtY29tcG9uZW50IC5zcGVlZC1zZWxlY3RvcmApYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgc3BlZWRDb250cm9sRWxlbWVudC52YWx1ZSA9IFN0cmluZyhwcm9ncmVtQW5pbWF0aW9uU3BlZWQpO1xuICAgICAgICBsZXQgc3BlZWRTZWxlY3Rvck9ic2VydmFibGUgPSBPYnNlcnZhYmxlLmZyb21FdmVudChzcGVlZENvbnRyb2xFbGVtZW50LCAnY2hhbmdlJyk7XG4gICAgICAgIHNwZWVkU2VsZWN0b3JPYnNlcnZhYmxlLnN1YnNjcmliZShldmVudCA9PiBwcm9ncmVtQW5pbWF0aW9uU3BlZWQgPSBOdW1iZXIoKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSkpO1xuXG4gICAgICAgIGxldCBtb2RlQ29udHJvbEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29udHJvbC1wYW5lbC1jb21wb25lbnQgLm1vZGUtc2VsZWN0b3JgKWFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIG1vZGVDb250cm9sRWxlbWVudC52YWx1ZSA9IFN0cmluZyhzY2hlZHVsZXIudGVtcG8pO1xuICAgICAgICBsZXQgbW9kZVNlbGVjdG9yT2JzZXJ2YWJsZSA9IE9ic2VydmFibGUuZnJvbUV2ZW50KG1vZGVDb250cm9sRWxlbWVudCwgJ2NoYW5nZScpO1xuICAgICAgICBtb2RlU2VsZWN0b3JPYnNlcnZhYmxlLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICBwcm9ncmVtTW9kZSA9IE51bWJlcigoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcbiAgICAgICAgICAgIGN1cnJlbnRTY2hlZHVsZXIoKS50ZW1wbyA9IHByb2dyZW1Nb2RlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtKHVybDogc3RyaW5nLCBzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZykge1xuICAgICAgICBsZXQgcHJvZ3JlbUNvbmZpZyA9IGJ1aWxkRGVmYXVsdENvbmZpZygpO1xuICAgICAgICBsZXQgcHJvZ3JlbVNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBwcm9ncmVtU2NyaXB0LmNsYXNzTGlzdC5hZGQoJ3Byb2dyZW0tc2NyaXB0LXRhZycpXG4gICAgICAgIHByb2dyZW1TY3JpcHQuc3JjID0gdXJsO1xuICAgICAgICBsZXQgYm9keUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICAgIGlmIChib2R5RWxlbWVudCkge1xuICAgICAgICAgICAgYm9keUVsZW1lbnQuYXBwZW5kQ2hpbGQocHJvZ3JlbVNjcmlwdCk7XG4gICAgICAgIH1cblxuICAgICAgICBDb2RlU2VydmljZS5sb2FkUHJvZ3JlbSh1cmwpLnRoZW4oY29kZSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJvZ3JlbUNvZGUgPSBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFByb2dyZW0oY29kZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJ1aWxkUHJvZ3JlbVZpZXdlcihwcm9ncmVtQ29kZSwgc2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnKTtcblxuICAgICAgICAgICAgYnVpbGRDb250cm9sUGFuZWxDb21wb25lbnQoKTtcblxuICAgICAgICAgICAgYnVpbGRQcm9ncmVtRWRpdG9yQ29tcG9uZW50KHByb2dyZW1Db2RlLCBzY3JlZW5Db25maWcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aW1lcigwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGltZXIodGltZXN0YW1wOiBudW1iZXIpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aW1lcik7XG5cbiAgICAgICAgaWYgKHRpbWVzdGFtcCAtIHByZXZpb3VzUmVwYWludFRpbWUgPCBwcm9ncmVtQW5pbWF0aW9uSW50ZXJ2YWxzW3Byb2dyZW1BbmltYXRpb25TcGVlZF0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZpb3VzUmVwYWludFRpbWUgPSB0aW1lc3RhbXA7XG5cbiAgICAgICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgICAgICAgc2NoZWR1bGVyLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCB7IFN0eWxlRGVjb3JhdG9yLCBQcm9ncmVtU2NoZWR1bGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IEJhc2VOb2RlLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBCbG9ja1N0YXRlbWVudCwgSWZTdGF0ZW1lbnQsIFZhcmlhYmxlRGVjbGFyYXRvciwgVmFyaWFibGVEZWNsYXJhdGlvbiwgQXNzaWdubWVudEV4cHJlc3Npb24sIEJpbmFyeUV4cHJlc3Npb24sIEV4cHJlc3Npb25TdGF0ZW1lbnQsIFJldHVyblN0YXRlbWVudCwgSWRlbnRpZmllciwgTWVtYmVyRXhwcmVzc2lvbiB9IGZyb20gXCJlc3RyZWVcIjtcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9IdG1sSGVscGVyXCI7XG5pbXBvcnQgeyBFc3ByaW1hSGVscGVyIH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYUhlbHBlclwiO1xuaW1wb3J0IHsgRXNwcmltYVZlcnNlLCBFc3ByaW1hSHRtbENvdXBsZXRGYWN0b3J5LCBFc3ByaW1hQ291cGxldCB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFUeXBlc1wiO1xuaW1wb3J0IHsgc3RyaW5naWZ5IH0gZnJvbSBcInF1ZXJ5c3RyaW5nXCI7XG5cbmV4cG9ydCBjbGFzcyBFc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5IGltcGxlbWVudHMgRXNwcmltYUh0bWxDb3VwbGV0RmFjdG9yeSB7XG5cbiAgICBwcml2YXRlIHZhckhpbnRCeVZlcnNlc01hcDogTWFwPEJhc2VOb2RlLCBIVE1MRWxlbWVudFtdPiA9IG5ldyBNYXAoKTtcbiAgICBwcml2YXRlIHZhckhpbnRVcGRhdGVyTWFwOiBNYXA8QmFzZU5vZGUsICh2YWx1ZTogYW55KSA9PiB2b2lkPiA9IG5ldyBNYXAoKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvdXBsZXQ6IEVzcHJpbWFDb3VwbGV0LFxuICAgICAgICBwcml2YXRlIGRlY29yYXRvcjogU3R5bGVEZWNvcmF0b3I8c3RyaW5nPixcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXJcbiAgICApIHt9XG5cbiAgICBidWlsZENvdXBsZXQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS1zY29wZS1jb21wb25lbnQnKVxuXG4gICAgICAgIC8vIEZJWE1FIGlsIGZhdWRyYWl0IHBhcmNvdXJpciBsJ2FyYnJlIEFTVCBhdmVjIHVuIHdhbGtlciBvdSB1biB0cnVjIGR1IGdlbnJlLlxuICAgICAgICAvLyBGSVhNRSBncm9zIGhhY2sgZHUgc3lzdMOobWUgZGUgSHRtbEZhY3RvcnkgZXQgZGUgRGVjb3JhdG9yIHBvdXIgcmVhbGlzZXIgY2UgY29tcG9zYW50LlxuICAgICAgICAvLyBCdWlsZCBhbGwgVmFyaWFibGVIaW50IHdoaWNoIHdpbGwgYmUgYWRkZWQgaW4gdmlldyBjb250YWluZXIgb25lIGJ5IG9uZSBieSBnZXRIdG1sVmVyc2UoKVxuICAgICAgICB0aGlzLmNvdXBsZXQudmVyc2VzLmZvckVhY2godiA9PiB7XG4gICAgICAgICAgICBsZXQgdmFySGludHMgPSB0aGlzLmJ1aWxkVmFyaWFibGVIaW50cyh2Lm5vZGUpO1xuICAgICAgICAgICAgbGV0IGRlY29yYXRlZFZhckhpbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgICAgICAgICB2YXJIaW50cy5mb3JFYWNoKCh2YXJIaW50LCB2YXJOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGRlY29yYXRlZCA9IHRoaXMuZGVjb3JhdG9yLmRlY29yYXRlKHZhck5hbWUsIHZhckhpbnQpO1xuICAgICAgICAgICAgICAgIGRlY29yYXRlZFZhckhpbnRzLnB1c2goZGVjb3JhdGVkKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGVjb3JhdGVkKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLnZhckhpbnRCeVZlcnNlc01hcC5zZXQodi5ub2RlLCBkZWNvcmF0ZWRWYXJIaW50cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2xlYXJWaWV3KCk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9ICAgIFxuICAgIFxuICAgIGdldEh0bWxWZXJzZSh2ZXJzZTogRXNwcmltYVZlcnNlKTogSFRNTEVsZW1lbnR8dW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRoaXMudmFySGludEJ5VmVyc2VzTWFwLnNpemUgPT09IDAgfHwgIXZlcnNlLm5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodG1sRWxlbWVudHMgPSB0aGlzLnZhckhpbnRCeVZlcnNlc01hcC5nZXQodmVyc2Uubm9kZSk7XG4gICAgICAgIGlmICghaHRtbEVsZW1lbnRzIHx8IGh0bWxFbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuc2NoZWR1bGVyLmN1cnJlbnQoKTtcbiAgICAgICAgbGV0IHZhbHVlc01hcCA9IEVzcHJpbWFIZWxwZXIuZ2V0VmFyaWFibGVWYWx1ZXMoc3RhdGUsIHZlcnNlLm5vZGUpO1xuICAgICAgICBsZXQgdmFySGludFVwZGF0ZXIgPSB0aGlzLnZhckhpbnRVcGRhdGVyTWFwLmdldCh2ZXJzZS5ub2RlKTtcbiAgICAgICAgaWYgKHZhckhpbnRVcGRhdGVyKSB7XG4gICAgICAgICAgICB2YXJIaW50VXBkYXRlcih2YWx1ZXNNYXApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBTaG93IGVsZW1lbnRzXG4gICAgICAgIGh0bWxFbGVtZW50cy5mb3JFYWNoKGhpbnQgPT4gaGludC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKSk7XG5cbiAgICAgICAgLy9sZXQgdmVyc2VDb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3ZlcnNlLWNvbnRhaW5lcicsIGh0bWxFbGVtZW50cyk7XG4gICAgICAgIC8vcmV0dXJuIHZlcnNlQ29udGFpbmVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhclZpZXcoKTogdm9pZCB7XG4gICAgICAgIC8vIEhpZGUgZWxlbWVudHNcbiAgICAgICAgdGhpcy52YXJIaW50QnlWZXJzZXNNYXAuZm9yRWFjaChoaW50cyA9PiBoaW50cy5mb3JFYWNoKGhpbnQgPT4gaGludC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKSkpO1xuICAgICAgICAvLyBSZXNldCB2YWx1ZVxuICAgICAgICB0aGlzLnZhckhpbnRVcGRhdGVyTWFwLmZvckVhY2goKHZhckhpbnRVcGRhdGVyLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHZhckhpbnRVcGRhdGVyKG5ldyBNYXAoKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkIGEgVmFyaWFibGUgSGludCBpZiB0aGUgc3VwcGxpZWQgbm9kZSBjb250YWlucyBhIFZhcmlhYmxlIGFmZmVjdGF0aW9uLlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHJldHVybnMgYW4gSFRNTEVsZW1lbnQgb3IgbnVsbCBpZiBubyBoaW50IHNob3VsZCBhcHBlYXIgZm9yIHRoaXMgbm9kZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBidWlsZFZhcmlhYmxlSGludHMobm9kZTogQmFzZU5vZGUpOiBNYXA8c3RyaW5nLCBIVE1MRWxlbWVudD4ge1xuICAgICAgICBsZXQgdmFyTm9kZSA9IEVzcHJpbWFIZWxwZXIucmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24obm9kZSk7XG4gICAgICAgIGlmICghdmFyTm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNYXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2YXJOYW1lcyA9IEVzcHJpbWFIZWxwZXIuZ2V0VmFyaWFibGVOYW1lcyh2YXJOb2RlKTtcbiAgICAgICAgbGV0IHZhckhpbnRzID0gdmFyTmFtZXMubWFwKHZhck5hbWUgPT4ge1xuICAgICAgICAgICAgbGV0IHZhclZhbHVlID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS1oaW50LXZhbHVlJyk7XG4gICAgICAgICAgICBsZXQgdmFySGludCA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtaGludCcsIFtgJHt2YXJOYW1lfTogYCwgdmFyVmFsdWVdKTtcbiAgICAgICAgICAgIHJldHVybiB7dmFyTmFtZSwgdmFySGludCwgdmFyVmFsdWV9O1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdmFsVXBkYXRlciA9ICh2YWxzQnlWYXJOYW1lOiBNYXA8c3RyaW5nLCBhbnk+KSA9PiB7XG4gICAgICAgICAgICB2YXJIaW50cy5mb3JFYWNoKHZhckhpbnQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YWwgPSB2YWxzQnlWYXJOYW1lLmdldCh2YXJIaW50LnZhck5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICB2YXJIaW50LnZhclZhbHVlLmlubmVyVGV4dCA9IHZhbC50b0ZpeGVkKDIpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFySGludC52YXJWYWx1ZS5pbm5lclRleHQgPSB2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudmFySGludFVwZGF0ZXJNYXAuc2V0KG5vZGUsIHZhbFVwZGF0ZXIpO1xuXG4gICAgICAgIGxldCB2YXJIaW50c0J5TmFtZSA9IG5ldyBNYXA8c3RyaW5nLCBIVE1MRWxlbWVudD4oKTtcbiAgICAgICAgdmFySGludHMuZm9yRWFjaCh2YXJIaW50ID0+IHZhckhpbnRzQnlOYW1lLnNldCh2YXJIaW50LnZhck5hbWUsIHZhckhpbnQudmFySGludCkpO1xuXG4gICAgICAgIHJldHVybiB2YXJIaW50c0J5TmFtZTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBFdmFsU2NvcGUgfSBmcm9tIFwiLi9FdmFsU2VydmljZVwiO1xuXG5leHBvcnQgY2xhc3MgUHJvZ3JlbUNvbmZpZyB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB0aXRyZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgbm9tYnJlQ29sb25uZXM6IG51bWJlcixcbiAgICAgICAgcHVibGljIG5vbWJyZUxpZ25lczogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgbm9tYnJlRnJhbWVzOiBudW1iZXIsXG4gICAgKSB7IH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+IHtcbiAgICBub2RlOiBBc3RCYXNlVHlwZVxuICAgIGNvZGU6IEFzdEJhc2VUeXBlXG59XG4vKlxuZXhwb3J0IGludGVyZmFjZSBWZXJzZUluc3RydWN0aW9uRmFjdG9yeTxBc3RCYXNlVHlwZT4ge1xuICAgIGJ1aWxkKHBhcmFtOiBBc3RCYXNlVHlwZSk6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT47XG59XG4qL1xuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtQ291cGxldDxBc3RCYXNlVHlwZT4ge1xuICAgIGZ1bmN0aW9uUm9vdE5vZGU6IEFzdEJhc2VUeXBlXG4gICAgdmVyc2VzOiBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+W11cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtRmFjdG9yeTxBc3RCYXNlVHlwZT4ge1xuICAgIGJ1aWxkUHJvZ3JlbShjb2RlOiBzdHJpbmcpOiBQcm9ncmVtQ29kZTxBc3RCYXNlVHlwZT5cbiAgICBidWlsZENvdXBsZXQobm9kZTogQXN0QmFzZVR5cGUsIHZlcnNlczogQXN0QmFzZVR5cGVbXSk6IFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPlxuICAgIGJ1aWxkVmVyc2Uobm9kZTogQXN0QmFzZVR5cGUpOiBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmVyc2VJdGVyYXRvcjxBc3RCYXNlVHlwZT4ge1xuICAgIGV4ZWN1dGVOZXh0KCk6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT5cbiAgICBoYXNOZXh0KCk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbUNvZGU8QXN0QmFzZVR5cGU+IHtcbiAgICBpbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpOiBQcm9ncmVtQ291cGxldDxBc3RCYXNlVHlwZT5cbiAgICBjb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk6IFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPlxuICAgIGl0ZXJhdG9yKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiBWZXJzZUl0ZXJhdG9yPEFzdEJhc2VUeXBlPlxufVxuXG5leHBvcnQgY2xhc3MgUHJvZ3JlbVN0YXRlIHtcblxuICAgIHB1YmxpYyByZWFkb25seSBldmFsU2NvcGUgPSBuZXcgRXZhbFNjb3BlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjb2xvbm5lOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBsaWduZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZnJhbWU6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvbnRleHRlOiBvYmplY3QsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB2ZXJzZTogUHJvZ3JlbVZlcnNlPGFueT4gfCBudWxsLFxuICAgICkge31cblxuICAgIHB1YmxpYyBldmFsKGV4cHI6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2YWxTY29wZS5nbG9iYWxFdmFsKGV4cHIpO1xuICAgIH1cbn1cblxudHlwZSBOZXdTdGF0ZUNhbGxiYWNrID0gKHN0YXRlOiBQcm9ncmVtU3RhdGUpID0+IHZvaWQ7XG5leHBvcnQgaW50ZXJmYWNlIFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyIHtmaXJlU3RhcnRJdGVyYXRpbmdDb2RlOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyIHtmaXJlQ29kZUV4ZWN1dGlvbjogTmV3U3RhdGVDYWxsYmFja307XG5leHBvcnQgaW50ZXJmYWNlIEdyaWRDaGFuZ2VMaXN0ZW5lciB7ZmlyZUdyaWRDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBMaW5lQ2hhbmdlTGlzdGVuZXIge2ZpcmVMaW5lQ2hhbmdlOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgRnJhbWVDaGFuZ2VMaXN0ZW5lciB7ZmlyZUZyYW1lQ2hhbmdlOiBOZXdTdGF0ZUNhbGxiYWNrfTtcblxuZXhwb3J0IGVudW0gUHJvZ3JlbVRlbXBvIHtcbiAgICBCeVZlcnNlID0gMCxcbiAgICBCeVBpeGVsLFxuICAgIEJ5TGluZSxcbiAgICBCeUZyYW1lXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbVNjaGVkdWxlciB7XG4gICAgc3Vic2NyaWJlU3RhcnRJdGVyYXRpbmdDb2RlKGxpc3RlbmVyOiBTdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVDb2RlRXhlY3V0aW9uKGxpc3RlbmVyOiBDb2RlRXhlY3V0aW9uTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlR3JpZENoYW5nZShsaXN0ZW5lcjogR3JpZENoYW5nZUxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUxpbmVDaGFuZ2UobGlzdGVuZXI6IExpbmVDaGFuZ2VMaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVGcmFtZUNoYW5nZShsaXN0ZW5lcjogRnJhbWVDaGFuZ2VMaXN0ZW5lcik6IHZvaWRcbiAgICByZXNldCgpOiBQcm9ncmVtU3RhdGVcbiAgICBjdXJyZW50KCk6IFByb2dyZW1TdGF0ZVxuICAgIG5leHQoKTogUHJvZ3JlbVN0YXRlW11cbiAgICBnZXRQcm9ncmVtKCk6IFByb2dyZW1Db2RlPGFueT5cbiAgICB0ZW1wbzogUHJvZ3JlbVRlbXBvXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbUNvbXBvbmVudCB7XG4gICAgcmVuZGVySHRtbCgpOiBIVE1MRWxlbWVudFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0eWxlRGVjb3JhdG9yPFQ+IHtcbiAgICBkZWNvcmF0ZShub2RlOiBULCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50XG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEh0bWxDb3VwbGV0RmFjdG9yeTxBc3RCYXNlVHlwZT4ge1xuICAgIGJ1aWxkQ291cGxldCgpOiBIVE1MRWxlbWVudFxuICAgIGdldEh0bWxWZXJzZSh2ZXJzZTogUHJvZ3JlbVZlcnNlPEFzdEJhc2VUeXBlPik6IEhUTUxFbGVtZW50fHVuZGVmaW5lZFxufVxuXG5leHBvcnQgY2xhc3MgU3R5bGVEZWNvcmF0b3JBZ2dyZWdhdGlvbjxUPiBpbXBsZW1lbnRzIFN0eWxlRGVjb3JhdG9yPFQ+IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjb3JhdG9yczogU3R5bGVEZWNvcmF0b3I8VD5bXSkge31cblxuICAgIGRlY29yYXRlKG5vZGU6IFQsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgdGVtcDogSFRNTEVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmRlY29yYXRvcnMuZm9yRWFjaChkID0+IHRlbXAgPSBkLmRlY29yYXRlKG5vZGUsIHRlbXApKTtcbiAgICAgICAgcmV0dXJuIHRlbXA7XG4gICAgfVxuXG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29yYXRvcnMubWFwKGQgPT4gZC5idWlsZFN0eWxlU2hlZXQoKSkuam9pbignXFxuJyk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29sb3JQcm92aWRlciB7XG4gICAgaHNsQ29sb3IoaHVlOiBudW1iZXIpOiBzdHJpbmc7XG4gICAgaGFzaFN0cmluZ1RvQ29sb3Ioa2V5OiBzdHJpbmcsIGNvbG9yQ291bnQ6IG51bWJlciwgc2hpZnQ/OiBudW1iZXIpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29sb3JQcm92aWRlckZhY3Rvcnkge1xuICAgIGJ1aWxkKGtleT86IHN0cmluZyk6IENvbG9yUHJvdmlkZXI7XG59IiwiaW1wb3J0IHsgUHJvZ3JlbUZhY3RvcnkgfSBmcm9tIFwiLi9UeXBlc1wiO1xuaW1wb3J0IHsgQmFzaWNFc3ByaW1hUHJvZ3JlbUZhY3RvcnkgfSBmcm9tIFwiLi4vZXNwcmltYS9CYXNpY0VzcHJpbWFQcm9ncmVtXCI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29kZVNlcnZpY2Uge1xuXG4gICAgZXhwb3J0IGNvbnN0IHByb2dyZW1GYWN0b3J5OiBQcm9ncmVtRmFjdG9yeTxhbnk+ID0gbmV3IEJhc2ljRXNwcmltYVByb2dyZW1GYWN0b3J5KCk7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gbG9hZFByb2dyZW0oZmlsZVVybDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsaWVudCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgY2xpZW50Lm9wZW4oJ0dFVCcsIGZpbGVVcmwpO1xuICAgICAgICAgICAgY2xpZW50Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29kZSA9IGNsaWVudC5yZXNwb25zZVRleHQ7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29kZVNlcnZpY2U6IFByb2dyZW0gbG9hZGVkIHN1Y2Nlc3NmdWxseS4nLCBjb2RlKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGNvZGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNsaWVudC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KGNsaWVudC5zdGF0dXNUZXh0KTtcbiAgICAgICAgICAgIGNsaWVudC5zZW5kKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSIsIlxuZXhwb3J0IGNsYXNzIFNjcmVlbkNvbmZpZyB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBib3hTaXplOiBudW1iZXJcbiAgICApIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBTY3JlZW5TZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBnZXRTY3JlZW5GcmFtZSgpOiBhbnkge1xuXG4gICAgfVxuXG59IiwiaW1wb3J0IHsgUGF0dGVybiwgSWRlbnRpZmllciwgQmFzZU5vZGUsIFZhcmlhYmxlRGVjbGFyYXRpb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBOb2RlIH0gZnJvbSBcImVzdHJlZVwiO1xuaW1wb3J0IHsgUHJvZ3JlbVN0YXRlIH0gZnJvbSBcIi4uL2NvcmUvVHlwZXNcIjtcblxuZXhwb3J0IHR5cGUgTm9kZVdpdGhQYXJlbnQgPSBOb2RlICYgeyBwYXJlbnQ/OiBOb2RlIH07XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFc3ByaW1hSGVscGVyIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgcGF0dGVyblRvU3RyaW5nKHBhdHRlcm46IFBhdHRlcm4pOiBzdHJpbmcge1xuICAgICAgICB2YXIgbm9kZTtcbiAgICAgICAgc3dpdGNoIChwYXR0ZXJuLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0lkZW50aWZpZXInOlxuICAgICAgICAgICAgICAgIG5vZGUgPSBwYXR0ZXJuIGFzIElkZW50aWZpZXI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUubmFtZTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGNvbnZlcnQgcGF0dGVybiBvZiB0eXBlICcgKyBwYXR0ZXJuLnR5cGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24obm9kZTogQmFzZU5vZGUpOiBWYXJpYWJsZURlY2xhcmF0aW9uIHwgQXNzaWdubWVudEV4cHJlc3Npb24gfCBGdW5jdGlvbkRlY2xhcmF0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgbGV0IGRlY2wgPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gZGVjbDtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgIGxldCBleHByID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgICAgIHJldHVybiBleHByO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBmdW5jO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHAgPT09ICdsZWZ0JyB8fCBwID09PSAncmlnaHQnIHx8IHAgPT09ICdhcmd1bWVudCcgfHwgcCA9PT0gJ2NhbGxlZScgfHwgcCA9PT0gJ2JvZHknIHx8IHAgPT09ICdleHByZXNzaW9uJykge1xuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkOiBCYXNlTm9kZSA9IG5vZGVbcF0gYXMgQmFzZU5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBFc3ByaW1hSGVscGVyLnJlZHVjZU5vZGVUb1ZhckRlY2xhcmF0aW9uKGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdmFyaWFibGUgbmFtZXMgb2YgZGVjbGFyYXRpb24gb3IgYXNzaWdubWVudCBjb250YWluZWQgaW4gbm9kZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbm9kZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFZhcmlhYmxlTmFtZXMobm9kZTogVmFyaWFibGVEZWNsYXJhdGlvbiB8IEFzc2lnbm1lbnRFeHByZXNzaW9uIHwgRnVuY3Rpb25EZWNsYXJhdGlvbik6IHN0cmluZ1tdIHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICBsZXQgZGVjbCA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBkZWNsLmRlY2xhcmF0aW9ucy5tYXAoZCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBFc3ByaW1hSGVscGVyLnBhdHRlcm5Ub1N0cmluZyhkLmlkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJykge1xuICAgICAgICAgICAgbGV0IGRlY2wgPSBub2RlIGFzIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBFc3ByaW1hSGVscGVyLnBhdHRlcm5Ub1N0cmluZyhkZWNsLmxlZnQpO1xuICAgICAgICAgICAgcmV0dXJuIFt2YXJOYW1lXTtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdGdW5jdGlvbkRlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgbGV0IGZ1bmMgPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gZnVuYy5wYXJhbXMubWFwKHAgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YXJOYW1lID0gRXNwcmltYUhlbHBlci5wYXR0ZXJuVG9TdHJpbmcocCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhck5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHZhcmlhYmxlIHZhbHVlcyBvZiBkZWNsYXJhdGlvbiBvciBhc3NpZ25tZW50IGNvbnRhaW5lZCBpbiBub2RlLlxuICAgICAqIFNhbWUgYXMgZ2V0VmFyaWFibGVOYW1lcyBidXQgZXZhbHVhdGUgdmFyaWFibGVzIHRvIGRpc2NvdmVyIHRoZWlyIHZhbHVlcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbm9kZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFZhcmlhYmxlVmFsdWVzKHN0YXRlOiBQcm9ncmVtU3RhdGUsIG5vZGU6IEJhc2VOb2RlKTogTWFwPHN0cmluZywgYW55PiB7XG4gICAgICAgIGxldCB2YWx1ZXNNYXAgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICBsZXQgdmFyTm9kZXMgPSB0aGlzLnJlZHVjZU5vZGVUb1ZhckRlY2xhcmF0aW9uKG5vZGUpO1xuICAgICAgICBpZiAoIXZhck5vZGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzTWFwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0VmFyaWFibGVOYW1lcyh2YXJOb2RlcykubWFwKHZhck5hbWUgPT4gdmFsdWVzTWFwLnNldCh2YXJOYW1lLCBzdGF0ZS5ldmFsKHZhck5hbWUpKSk7XG4gICAgICAgIHJldHVybiB2YWx1ZXNNYXA7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpc0NoaWxkTm9kZU9mKG5vZGU6IE5vZGVXaXRoUGFyZW50LCBwYXJlbnQ6IEJhc2VOb2RlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChub2RlLnBhcmVudCA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICghbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBFc3ByaW1hSGVscGVyLmlzQ2hpbGROb2RlT2Yobm9kZS5wYXJlbnQgYXMgTm9kZVdpdGhQYXJlbnQsIHBhcmVudCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpc05vdENoaWxkTm9kZU9mKG5vZGU6IE5vZGVXaXRoUGFyZW50LCBwYXJlbnRzOiBCYXNlTm9kZVtdKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChwYXJlbnRzLmZpbmQocCA9PiBwID09PSBub2RlLnBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICghbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEVzcHJpbWFIZWxwZXIuaXNOb3RDaGlsZE5vZGVPZihub2RlLnBhcmVudCBhcyBOb2RlV2l0aFBhcmVudCwgcGFyZW50cyk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgQ29sb3JQcm92aWRlciwgQ29sb3JQcm92aWRlckZhY3RvcnkgfSBmcm9tIFwiLi9UeXBlc1wiO1xuaW1wb3J0IHsgY3JlYXRlIGFzIG1kNUNyZWF0ZSB9IGZyb20gJ2pzLW1kNSc7XG5cbmV4cG9ydCBjbGFzcyBCYXNpY0NvbG9yUHJvdmlkZXJGYWN0b3J5IGltcGxlbWVudHMgQ29sb3JQcm92aWRlckZhY3Rvcnkge1xuICAgIGJ1aWxkKGtleT86IHN0cmluZyk6IENvbG9yUHJvdmlkZXIge1xuICAgICAgICByZXR1cm4gbmV3IEJhc2ljQ29sb3JQcm92aWRlcigpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljQ29sb3JQcm92aWRlciBpbXBsZW1lbnRzIENvbG9yUHJvdmlkZXIge1xuXG4gICAgcHJpdmF0ZSBjb2xvck1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKTtcblxuICAgIHB1YmxpYyBoc2xDb2xvcihodWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnaHNsKCcgKyBodWUgKyAnLCAxMDAlLCA4MCUpJztcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFzaFN0cmluZ1RvQ29sb3Ioa2V5OiBzdHJpbmcsIGNvbG9yQ291bnQ6IG51bWJlciwgc2hpZnQ6IG51bWJlciA9IDIpIHtcbiAgICAgICAgdmFyIGh1ZSA9IHRoaXMuY29sb3JNYXAuZ2V0KGtleSk7XG4gICAgICAgIGlmIChodWUpIHJldHVybiB0aGlzLmhzbENvbG9yKGh1ZSk7XG5cbiAgICAgICAgdmFyIGhhc2ggPSBtZDVDcmVhdGUoKS51cGRhdGUoa2V5KS50b1N0cmluZygpO1xuICAgICAgICBcbiAgICAgICAgaHVlID0gKCBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDAsIHNoaWZ0ICsgMSksIDE2KSArIDE2ICogcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAxLCBzaGlmdCArIDIpLCAxNikgKyAyNTYgKiBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDIsIHNoaWZ0ICsgMyksIDE2KSApO1xuICAgICAgICBodWUgPSBNYXRoLmZsb29yKGh1ZSAlIGNvbG9yQ291bnQpICogMzYwIC8gY29sb3JDb3VudDtcbiAgICAgICAgaHVlID0gaHVlICUgMzYwO1xuXG4gICAgICAgIC8vIENvbG9yIGRlZHVwbGljYXRpb25cbiAgICAgICAgd2hpbGUgKCF0aGlzLmNvbG9yTWFwLmdldChrZXkpKSB7XG4gICAgICAgICAgICBsZXQgZHVwbGljYXRlQ29sb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGMgb2YgdGhpcy5jb2xvck1hcC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhjIC0gaHVlKSA8IE1hdGguZmxvb3IoMTgwIC8gY29sb3JDb3VudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZHVwbGljYXRlQ29sb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBodWUgKz0gTWF0aC5mbG9vcigyNzAgLyBjb2xvckNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgaHVlID0gaHVlICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWR1cGxpY2F0ZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvck1hcC5zZXQoa2V5LCBodWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL3ZhciBwYXN0ZWwgPSAnaHNsKCcgKyBodWUgKyAnLCAxMDAlLCA4Ny41JSknO1xuICAgICAgICByZXR1cm4gdGhpcy5oc2xDb2xvcihodWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBDb2xvclNlcnZpY2Uge1xuXG4gICAgZXhwb3J0IGNvbnN0IGNvbG9yUHJvdmlkZXJhY3Rvcnk6IENvbG9yUHJvdmlkZXJGYWN0b3J5ID0gbmV3IEJhc2ljQ29sb3JQcm92aWRlckZhY3RvcnkoKTtcblxufVxuIiwiaW1wb3J0IHsgUHJvZ3JlbUNvbXBvbmVudCwgUHJvZ3JlbVNjaGVkdWxlciwgU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciwgUHJvZ3JlbVN0YXRlLCBQcm9ncmVtQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gXCIuLi8uLi9jb3JlL1NjcmVlblNlcnZpY2VcIjtcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9IdG1sSGVscGVyXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyIH0gZnJvbSBcInJ4anNcIjtcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1HcmlkQ29tcG9uZW50IGltcGxlbWVudHMgUHJvZ3JlbUNvbXBvbmVudCwgU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciB7XG4gICAgXG4gICAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgYmxpbmtJbnRlcnZhbCA9IDIwMDtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZywgXG4gICAgICAgIHByaXZhdGUgcHJvZ3JlbUNvbmZpZzogUHJvZ3JlbUNvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXIsXG4gICAgICAgIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50XG4gICAgICAgICkge1xuICAgICAgICBsZXQgZW5XYXJuaW5nID0gSHRtbEhlbHBlci5wKCd3YXJuaW5nJywgXCJZb3VyIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IGNhbnZhcy5cIik7XG4gICAgICAgIGxldCBmcldhcm5pbmcgPSBIdG1sSGVscGVyLnAoJ3dhcm5pbmcnLCBcIlZvdHJlIG5hdmlnYXRldXIgbmUgc3VwcG9ydGUgcGFzIGxlcyBjYW52YXMuXCIpO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IEh0bWxIZWxwZXIuY2FudmFzKCcnLCBbZW5XYXJuaW5nLCBmcldhcm5pbmddKTtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLnByb2dyZW1Db25maWcubm9tYnJlQ29sb25uZXMgKiB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLnByb2dyZW1Db25maWcubm9tYnJlTGlnbmVzICogdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcblxuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgaWYgKCFjdHgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIG9idGFpbiAyRCBDYW52YXMgY29udGV4dCAhJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcblxuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlU3RhcnRJdGVyYXRpbmdDb2RlKHRoaXMpO1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlR3JpZENoYW5nZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZW5kZXJIdG1sKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbigncHJvZ3JlbS1ncmlkJywgdGhpcy5jYW52YXMpO1xuXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNvbG9yQ3VycmVudFBpeGVsKHN0YXRlOiBQcm9ncmVtU3RhdGUsIGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgbGV0IGJveFNpemUgPSB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplO1xuICAgICAgICBsZXQgYyA9IHN0YXRlLmNvbG9ubmU7XG4gICAgICAgIGxldCBsID0gc3RhdGUubGlnbmU7XG5cbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KGMgKiBib3hTaXplLCBsICogYm94U2l6ZSwgYm94U2l6ZSwgYm94U2l6ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJsaW5rQ3VycmVudFBpeGVsKHN0YXRlOiBQcm9ncmVtU3RhdGUsIGluY3JlbW50OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGNvbG9yID0gJ2JsYWNrJztcbiAgICAgICAgaWYgKGluY3JlbW50ICUgMiA9PT0gMCkge1xuICAgICAgICAgICAgY29sb3IgPSAnYW50aXF1ZXdoaXRlJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbG9yQ3VycmVudFBpeGVsKHN0YXRlLCBjb2xvcik7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBmaXJlU3RhcnRJdGVyYXRpbmdDb2RlIChzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IE9ic2VydmFibGUuaW50ZXJ2YWwodGhpcy5ibGlua0ludGVydmFsLCBhbmltYXRpb25GcmFtZVNjaGVkdWxlcikuc3Vic2NyaWJlKHQgPT4ge1xuICAgICAgICAgICAgdGhpcy5ibGlua0N1cnJlbnRQaXhlbChzdGF0ZSwgdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZpcmVHcmlkQ2hhbmdlIChzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBib3hTaXplID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcbiAgICAgICAgbGV0IGMgPSBzdGF0ZS5jb2xvbm5lO1xuICAgICAgICBsZXQgbCA9IHN0YXRlLmxpZ25lO1xuICAgICAgICBsZXQgZiA9IHN0YXRlLmZyYW1lO1xuXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgbGV0IGNvdWxldXIgPSBjb2xvcmVyUHJvZ3JlbShjLCBsLCBmLCBzdGF0ZS5jb250ZXh0ZSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coYCgke2N9LCAke2x9LCAke2Z9LCAke3N0YXRlLmNvbnRleHRlfSA9PiAke2NvdWxldXJ9YCk7XG4gICAgICAgIGlmIChjb3VsZXVyKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb3VsZXVyO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoYyAqIGJveFNpemUsIGwgKiBib3hTaXplLCBib3hTaXplLCBib3hTaXplKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZSAqIHRoaXMucHJvZ3JlbUNvbmZpZy5ub21icmVDb2xvbm5lcztcbiAgICAgICAgbGV0IGhlaWdodCA9IHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemUgKiB0aGlzLnByb2dyZW1Db25maWcubm9tYnJlTGlnbmVzO1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICdhbnRpcXVld2hpdGUnO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbn0iXSwic291cmNlUm9vdCI6IiJ9