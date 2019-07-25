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
        console.log('default:', node);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9yU3R5bGVEZWNvcmF0b3JzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92YXJpYWJsZVNjb3BlL1ZhcmlhYmxlU2NvcGVDb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUVkaXRvci9Qcm9ncmVtRWRpdG9yQ29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL0h0bWxIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VzcHJpbWEvQmFzaWNFc3ByaW1hUHJvZ3JlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9FdmFsU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9TY2hlZHVsaW5nU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Qcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZhcmlhYmxlU2NvcGUvRXNwcmltYVZhcmlhYmxlU2NvcGVTdHlsZURlY29yYXRvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvUHJvZ3JlbVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdmFyaWFibGVTY29wZS9Fc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL1R5cGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL0NvZGVTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL1NjcmVlblNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VzcHJpbWEvRXNwcmltYUhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9Db2xvclNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUdyaWQvUHJvZ3JlbUdyaWRDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUdBLG1HQUF3RTtBQUN4RSxrRkFBdUQ7QUFFdkQsTUFBYSwyQkFBMkI7SUFBeEM7UUFFWSxnQkFBVyxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzdDLGtCQUFhLEdBQWtCLDJCQUFZLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLENBQUM7SUE2Q3BGLENBQUM7SUEzQ0csUUFBUSxDQUFDLElBQWMsRUFBRSxPQUFvQjtRQUN6QyxJQUFJLEtBQUssQ0FBQztRQUVWLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7WUFDNUIsSUFBSSxDQUFDLEdBQUcsSUFBa0IsQ0FBQztZQUMzQixLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUNsQjtRQUVELElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDWCxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDekM7WUFFRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFP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QUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztRQUMxRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztRQUN6RSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7UUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUVKO0FBMUZELG9EQTBGQyIsImZpbGUiOiJpbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdHlsZURlY29yYXRvciwgQ29sb3JQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNlTm9kZSwgSWRlbnRpZmllciB9IGZyb20gXCJlc3RyZWVcIjtcblxuaW1wb3J0IHsgUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudCB9IGZyb20gXCIuL1Byb2dyZW1JbnNwZWN0b3JDb21wb25lbnRcIjtcbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb3JlL0NvbG9yU2VydmljZVwiO1xuXG5leHBvcnQgY2xhc3MgQ29sb3JWZXJzZVZhcmlhYmxlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8QmFzZU5vZGU+IHtcblxuICAgIHByaXZhdGUgdmFyaWFibGVNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBjb2xvclByb3ZpZGVyOiBDb2xvclByb3ZpZGVyID0gQ29sb3JTZXJ2aWNlLmNvbG9yUHJvdmlkZXJhY3RvcnkuYnVpbGQoKTtcblxuICAgIGRlY29yYXRlKG5vZGU6IEJhc2VOb2RlLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IHZhcklkO1xuXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdJZGVudGlmaWVyJykge1xuICAgICAgICAgICAgbGV0IG4gPSBub2RlIGFzIElkZW50aWZpZXI7XG4gICAgICAgICAgICB2YXJJZCA9IG4ubmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YXJJZCkge1xuICAgICAgICAgICAgbGV0IHZhckluZGV4ID0gdGhpcy52YXJpYWJsZU1hcC5nZXQodmFySWQpO1xuICAgICAgICAgICAgaWYgKCF2YXJJbmRleCkge1xuICAgICAgICAgICAgICAgIHZhckluZGV4ID0gdGhpcy52YXJpYWJsZU1hcC5zaXplICsgMTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhcmlhYmxlTWFwLnNldCh2YXJJZCwgdmFySW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3ZhcmlhYmxlJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3ZhcmlhYmxlLScgKyB2YXJJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9ICAgIFxuICAgIFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc3R5bGUgPSAnJztcbiAgICAgICAgLy9jb25zb2xlLmxvZygndmFyaWFibGUgY291bnQ6JywgdGhpcy52YXJpYWJsZU1hcC5zaXplKTtcbiAgICAgICAgdGhpcy52YXJpYWJsZU1hcC5mb3JFYWNoKChpbmRleCwgaWQpID0+IHtcbiAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMuY29sb3JQcm92aWRlci5oYXNoU3RyaW5nVG9Db2xvcihpZCwgMTYpOyAvL3RoaXMudmFyaWFibGVNYXAuc2l6ZVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYnVpbGRpbmcgY29sb3IgIycsIGlkLCAnPT4nLCBjb2xvcik7XG4gICAgICAgICAgICBzdHlsZSArPSBgXG4gICAgICAgICAgICAgICAgLnZhcmlhYmxlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMC4xZW0gMC41ZW0gMC4xZW0gMC41ZW07XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwLjhlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLiR7UHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRJTkdfQ0xBU1N9IC52YXJpYWJsZS0ke2luZGV4fS5pZGVudGlmaWVyLCBcbiAgICAgICAgICAgICAgICAuJHtQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVEVEX0NMQVNTfSAudmFyaWFibGUtJHtpbmRleH0uaWRlbnRpZmllciB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBgO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBhZFZlcnNlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8QmFzZU5vZGU+IHtcblxuICAgIGRlY29yYXRlKG5vZGU6IEJhc2VOb2RlLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb2RlLXBhZGRpbmcnKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSAgICBcbiAgICBcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgLmNvZGUtcGFkZGluZyB7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMzJweDtcbiAgICAgICAgfVxuICAgICAgICBgO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgUHJvZ3JlbVNlcnZpY2V9IGZyb20gXCIuL2NvcmUvUHJvZ3JlbVNlcnZpY2VcIjtcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gXCIuL2NvcmUvU2NyZWVuU2VydmljZVwiO1xuXG5sZXQgc2NyZWVuQ29uZmlnID0gbmV3IFNjcmVlbkNvbmZpZygyMCk7XG5cblByb2dyZW1TZXJ2aWNlLmJ1aWxkUHJvZ3JlbSgnLi9wcm9ncmVtcy9jb2V1cl9wcm9ncmVtLmpzJywgc2NyZWVuQ29uZmlnKTsiLCJpbXBvcnQgeyBQcm9ncmVtQ29tcG9uZW50LCBHcmlkQ2hhbmdlTGlzdGVuZXIsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgUHJvZ3JlbVN0YXRlLCBDb2xvclByb3ZpZGVyLCBQcm9ncmVtU2NoZWR1bGVyLCBIdG1sQ291cGxldEZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgRXNwcmltYUhlbHBlciB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFIZWxwZXJcIjtcbmltcG9ydCB7IFZhcmlhYmxlRGVjbGFyYXRpb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBGdW5jdGlvbkRlY2xhcmF0aW9uIH0gZnJvbSBcImVzdHJlZVwiO1xuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvQ29sb3JTZXJ2aWNlXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBFc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5IH0gZnJvbSBcIi4vRXNwcmltYVZhcmlhYmxlU2NvcGVIdG1sRmFjdG9yeVwiO1xuXG5leHBvcnQgY2xhc3MgVmFyaWFibGVTY29wZUNvbXBvbmVudCBpbXBsZW1lbnRzIFByb2dyZW1Db21wb25lbnQsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyIHtcblxuICAgIHByaXZhdGUgaHRtbENvbnRhaW5lcjogSFRNTEVsZW1lbnR8bnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBjb2xvclByb3ZpZGVyOiBDb2xvclByb3ZpZGVyID0gQ29sb3JTZXJ2aWNlLmNvbG9yUHJvdmlkZXJhY3RvcnkuYnVpbGQoKTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXIsXG4gICAgICAgIHByaXZhdGUgaHRtbEZhY3Rvcnk6IEVzcHJpbWFWYXJpYWJsZVNjb3BlSHRtbEZhY3RvcnlcbiAgICApIHtcbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUNvZGVFeGVjdXRpb24odGhpcyk7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVHcmlkQ2hhbmdlKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbmRlckh0bWwoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgaHRtbENvbXBvbmVudCA9IHRoaXMuaHRtbEZhY3RvcnkuYnVpbGRDb3VwbGV0KCk7XG4gICAgICAgIHRoaXMuaHRtbENvbnRhaW5lciA9IGh0bWxDb21wb25lbnQ7XG4gICAgICAgIHJldHVybiBodG1sQ29tcG9uZW50O1xuICAgIH1cblxuICAgIGZpcmVDb2RlRXhlY3V0aW9uKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFzdGF0ZS52ZXJzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0bWxWZXJzZSA9IHRoaXMuaHRtbEZhY3RvcnkuZ2V0SHRtbFZlcnNlKHN0YXRlLnZlcnNlKTtcbiAgICAgICAgLy8gaWYgKHRoaXMuaHRtbENvbnRhaW5lciAmJiBodG1sVmVyc2UpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuaHRtbENvbnRhaW5lci5hcHBlbmRDaGlsZChodG1sVmVyc2UpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgZmlyZUdyaWRDaGFuZ2Uoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmh0bWxGYWN0b3J5LmNsZWFyVmlldygpO1xuICAgIH1cblxufSIsImltcG9ydCB7IEVzcHJpbWFQcm9ncmVtIH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYVR5cGVzXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1FZGl0b3JDb21wb25lbnQge1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBDT01QT05FTlRfQ0xBU1MgPSAncHJvZ3JlbS1lZGl0b3ItY29tcG9uZW50JztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IElOSVRfRlVOQ19DTEFTUyA9ICdpbml0LXByb2dyZW0tZWRpdG9yJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IENPTE9SRVJfRlVOQ19DTEFTUyA9ICdjb2xvcmVyLXByb2dyZW0tZWRpdG9yJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IENPREVfTElCUkVfQ0xBU1MgPSAnY29kZS1saWJyZS1lZGl0b3InO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUkVGUkVTSF9BQ1RJT05fQ0xBU1MgPSAncmVmcmVzaC1hY3Rpb24nO1xuXG4gICAgcHJpdmF0ZSBpbml0UHJvZ3JlbVRleHRhcmVhITogSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICBwcml2YXRlIGNvbG9yZXJQcm9ncmVtVGV4dGFyZWEhOiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgIHByaXZhdGUgY29kZUxpYnJlVGV4dGFyZWEhOiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgIHByaXZhdGUgcmVmcmVzaE9ic2VydmFibGUkITogT2JzZXJ2YWJsZTxFdmVudD47XG5cbiAgICBwcml2YXRlIGF0dGFjaGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwdWJsaWMgYXR0YWNoKGRvY3VtZW50OkRvY3VtZW50KSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7UHJvZ3JlbUVkaXRvckNvbXBvbmVudC5DT01QT05FTlRfQ0xBU1N9IC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuSU5JVF9GVU5DX0NMQVNTfSB0ZXh0YXJlYWApO1xuICAgICAgICBjb25zb2xlLmxvZygnZWxlbWVudHMnLCBlbGVtZW50KTtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHRoaXMuaW5pdFByb2dyZW1UZXh0YXJlYSA9IGVsZW1lbnQgYXMgSFRNTFRleHRBcmVhRWxlbWVudDtcblxuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7UHJvZ3JlbUVkaXRvckNvbXBvbmVudC5DT01QT05FTlRfQ0xBU1N9IC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuQ09MT1JFUl9GVU5DX0NMQVNTfSB0ZXh0YXJlYWApO1xuICAgICAgICBpZiAoZWxlbWVudCkgdGhpcy5jb2xvcmVyUHJvZ3JlbVRleHRhcmVhID0gZWxlbWVudCBhcyBIVE1MVGV4dEFyZWFFbGVtZW50O1xuXG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtQcm9ncmVtRWRpdG9yQ29tcG9uZW50LkNPTVBPTkVOVF9DTEFTU30gLiR7UHJvZ3JlbUVkaXRvckNvbXBvbmVudC5DT0RFX0xJQlJFX0NMQVNTfSB0ZXh0YXJlYWApO1xuICAgICAgICBpZiAoZWxlbWVudCkgdGhpcy5jb2RlTGlicmVUZXh0YXJlYSA9IGVsZW1lbnQgYXMgSFRNTFRleHRBcmVhRWxlbWVudDtcblxuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7UHJvZ3JlbUVkaXRvckNvbXBvbmVudC5DT01QT05FTlRfQ0xBU1N9IC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuUkVGUkVTSF9BQ1RJT05fQ0xBU1N9YCk7XG4gICAgICAgIHRoaXMucmVmcmVzaE9ic2VydmFibGUkID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZWxlbWVudCBhcyBIVE1MQnV0dG9uRWxlbWVudCwgJ2NsaWNrJyk7XG5cbiAgICAgICAgdGhpcy5hdHRhY2hlZCA9IHRoaXMuaW5pdFByb2dyZW1UZXh0YXJlYSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29sb3JlclByb2dyZW1UZXh0YXJlYSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29kZUxpYnJlVGV4dGFyZWEgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnJlZnJlc2hPYnNlcnZhYmxlJCAhPT0gdW5kZWZpbmVkO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2hlY2tJc0F0dGFjaGVkKCkge1xuICAgICAgICBpZiAoIXRoaXMuYXR0YWNoZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvZ3JlbUVkaXRvckNvbXBvbmVudCBpcyBub3QgYXR0YWNoZWQgIScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWRQcm9ncmVtKHByb2dyZW06IEVzcHJpbWFQcm9ncmVtKSB7XG4gICAgICAgIHRoaXMuY2hlY2tJc0F0dGFjaGVkKCk7XG5cbiAgICAgICAgbGV0IGZ1bmNCb2R5QmxvY2sgPSBwcm9ncmVtLmluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCkuZnVuY3Rpb25Sb290Tm9kZS5ib2R5O1xuICAgICAgICBsZXQgZnVuY0JvZHlDb2RlID0gZXNjb2RlR2VuZXJhdGUoZnVuY0JvZHlCbG9jayk7XG4gICAgICAgIGxldCBjbGVhbmVkQ29kZSA9IGZ1bmNCb2R5Q29kZS5zdWJzdHJpbmcoMSwgZnVuY0JvZHlDb2RlLmxlbmd0aCAtIDIpO1xuICAgICAgICB0aGlzLmluaXRQcm9ncmVtVGV4dGFyZWEuaW5uZXJIVE1MID0gY2xlYW5lZENvZGU7XG5cbiAgICAgICAgZnVuY0JvZHlCbG9jayA9IHByb2dyZW0uY29sb3JlclByb2dyZW1GdW5jdGlvbigpLmZ1bmN0aW9uUm9vdE5vZGUuYm9keTtcbiAgICAgICAgZnVuY0JvZHlDb2RlID0gZXNjb2RlR2VuZXJhdGUoZnVuY0JvZHlCbG9jayk7XG4gICAgICAgIGNsZWFuZWRDb2RlID0gZnVuY0JvZHlDb2RlLnN1YnN0cmluZygxLCBmdW5jQm9keUNvZGUubGVuZ3RoIC0gMik7XG4gICAgICAgIHRoaXMuY29sb3JlclByb2dyZW1UZXh0YXJlYS5pbm5lckhUTUwgPSBjbGVhbmVkQ29kZTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHVibGljIGJ1aWxkUHJvZ3JlbSgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgY29sb3JlclByb2dyZW1GdW5jID0gYFxuICAgICAgICBmdW5jdGlvbiBjb2xvcmVyUHJvZ3JlbShjb2xvbm5lLCBsaWduZSwgZnJhbWUsIGNvbnRleHRlKSB7XG4gICAgICAgICAgICAke3RoaXMuY29sb3JlclByb2dyZW1UZXh0YXJlYS52YWx1ZX1cbiAgICAgICAgfVxuICAgICAgICBgO1xuXG4gICAgICAgIGxldCBpbml0UHJvZ3JlbUZ1bmMgPSBgXG4gICAgICAgIGZ1bmN0aW9uIGluaXRpYWxpc2VyUHJvZ3JlbShjb25maWcsIGluaXRDb250ZXh0ZSkge1xuICAgICAgICAgICAgJHt0aGlzLmluaXRQcm9ncmVtVGV4dGFyZWEudmFsdWV9XG4gICAgICAgIH1cbiAgICAgICAgYDtcblxuICAgICAgICBsZXQgY29kZUxpYnJlRnVuYyA9IHRoaXMuY29kZUxpYnJlVGV4dGFyZWEudmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgJHtjb2RlTGlicmVGdW5jfVxuXG4gICAgICAgICR7aW5pdFByb2dyZW1GdW5jfVxuXG4gICAgICAgICR7Y29sb3JlclByb2dyZW1GdW5jfVxuICAgICAgICBgO1xuICAgIH1cblxuICAgIHB1YmxpYyBiaW5kUmVmcmVzaChhY3Rpb246IChjb2RlOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoT2JzZXJ2YWJsZSQuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGFjdGlvbih0aGlzLmJ1aWxkUHJvZ3JlbSgpKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbn0iLCJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBIdG1sSGVscGVyIHtcblxuICAgIHN0YXRpYyBhZGRDbGFzc2VzKGVsdDogSFRNTEVsZW1lbnQsIGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBpZiAodHlwZW9mIGNsYXNzZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnNwbGl0KCcgJykuZm9yRWFjaChjID0+IGVsdC5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjbGFzc2VzKSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5mb3JFYWNoKGMgPT4gZWx0LmNsYXNzTGlzdC5hZGQoYykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHNwYW4oY2xhc3Nlczogc3RyaW5nfHN0cmluZ1tdLCBjb250ZW50Pzogc3RyaW5nfEhUTUxFbGVtZW50fChIVE1MRWxlbWVudHxzdHJpbmcpW10pOiBIVE1MU3BhbkVsZW1lbnQge1xuICAgICAgICByZXR1cm4gSHRtbEhlbHBlci50YWcoJ3NwYW4nLCBjbGFzc2VzLCBjb250ZW50KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcChjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxQYXJhZ3JhcGhFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIudGFnKCdwJywgY2xhc3NlcywgY29udGVudCkgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpdihjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxEaXZFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIudGFnKCdkaXYnLCBjbGFzc2VzLCBjb250ZW50KSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2FudmFzKGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSwgY29udGVudD86IHN0cmluZ3xIVE1MRWxlbWVudHwoSFRNTEVsZW1lbnR8c3RyaW5nKVtdKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICAgICAgICByZXR1cm4gSHRtbEhlbHBlci50YWcoJ2NhbnZhcycsIGNsYXNzZXMsIGNvbnRlbnQpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHRhZyh0YWdOYW1lOiBzdHJpbmcsIGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSwgY29udGVudD86IHN0cmluZ3xIVE1MRWxlbWVudHwoSFRNTEVsZW1lbnR8c3RyaW5nKVtdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgZWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICAgICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgICAgIEh0bWxIZWxwZXIuYWRkQ2xhc3NlcyhlbHQsIGNsYXNzZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZWx0LmlubmVyVGV4dCA9IGNvbnRlbnQ7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBlbHQuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjb250ZW50KSkge1xuICAgICAgICAgICAgY29udGVudC5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgZWx0LmlubmVySFRNTCArPSBjO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYykge1xuICAgICAgICAgICAgICAgICAgICBlbHQuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBhZGQgY29udGVudDonLCBjKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWZpbmVDc3NSdWxlcyhpZDogc3RyaW5nLCBjc3NSdWxlczogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBjc3NJZCA9ICdjc3MtJyArIGlkO1xuICAgICAgICBsZXQgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3NzSWQpO1xuICAgICAgICBpZighc3R5bGVFbGVtZW50KSB7XG4gICAgICAgICAgICBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICB9XG4gICAgICAgIHN0eWxlRWxlbWVudC5pZCA9IGNzc0lkO1xuICAgICAgICAvKiBhZGQgc3R5bGUgcnVsZXMgdG8gdGhlIHN0eWxlIGVsZW1lbnQgKi9cbiAgICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzc1J1bGVzKSk7XG4gICAgICAgIFxuICAgICAgICAvKiBhdHRhY2ggdGhlIHN0eWxlIGVsZW1lbnQgdG8gdGhlIGRvY3VtZW50IGhlYWQgKi9cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbn0iLCJcbmltcG9ydCB7IFByb2dyYW0sIHBhcnNlTW9kdWxlLCBQYXJzZU9wdGlvbnMgfSBmcm9tICdlc3ByaW1hJztcbmltcG9ydCB7IHdhbGsgYXMgZXNwcmltYVdhbGssIHdhbGtBZGRQYXJlbnQgYXMgZXNwcmltYVdhbGtBZGRQYXJlbnQgfSBmcm9tICdlc3ByaW1hLXdhbGsnO1xuaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgQmFzZU5vZGUsIEZ1bmN0aW9uRGVjbGFyYXRpb24sIEJsb2NrU3RhdGVtZW50LCBJZlN0YXRlbWVudCwgUmV0dXJuU3RhdGVtZW50LCBTdGF0ZW1lbnQgfSBmcm9tICdlc3RyZWUnO1xuaW1wb3J0IHsgRXNwcmltYVZlcnNlSXRlcmFvciwgRXNwcmltYVZlcnNlLCBFc3ByaW1hQ291cGxldCwgRXNwcmltYVByb2dyZW1GYWN0b3J5LCBFc3ByaW1hUHJvZ3JlbSB9IGZyb20gJy4vRXNwcmltYVR5cGVzJztcbmltcG9ydCB7IEVzcHJpbWFIZWxwZXIgfSBmcm9tICcuL0VzcHJpbWFIZWxwZXInO1xuaW1wb3J0IHsgQ29kZVNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL0NvZGVTZXJ2aWNlJztcbmltcG9ydCB7IFByb2dyZW1TdGF0ZSB9IGZyb20gJy4uL2NvcmUvVHlwZXMnO1xuXG5jbGFzcyBCYXNpY0VzcHJpbWFDb2RlSXRlcmF0b3IgaW1wbGVtZW50cyBFc3ByaW1hVmVyc2VJdGVyYW9yIHtcblxuICAgIHByaXZhdGUgc3RhY2s6IEJhc2VOb2RlW10gPSBbXTtcbiAgICBwcml2YXRlIHJldHVyblZhbHVlOiBhbnkgPSBudWxsO1xuICAgIHByaXZhdGUgZmluaXNoZWQgPSBmYWxzZVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgICAgICBwcml2YXRlIHJvb3ROb2RlOiBCYXNlTm9kZSwgXG4gICAgICAgICAgICBwcml2YXRlIHN0YXRlOiBQcm9ncmVtU3RhdGUpIHtcbiAgICAgICAgdGhpcy5zdGFjay5wdXNoKHJvb3ROb2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlY2xhcmVQcm9ncmVtQXJndW1lbnRzKCkge1xuICAgICAgICBsZXQgX2NvbG9ubmUgPSB0aGlzLnN0YXRlLmNvbG9ubmU7XG4gICAgICAgIGxldCBfbGlnbmUgPSB0aGlzLnN0YXRlLmxpZ25lO1xuICAgICAgICBsZXQgX2ZyYW1lID0gdGhpcy5zdGF0ZS5mcmFtZTtcbiAgICAgICAgbGV0IF9jb250ZXh0ZSA9IHRoaXMuc3RhdGUuY29udGV4dGU7XG5cbiAgICAgICAgdGhpcy5zdGF0ZS5ldmFsKCd2YXIgY29sb25uZSA9ICcgKyBfY29sb25uZSArICcsIGxpZ25lID0gJyArIF9saWduZSArICcsIGZyYW1lID0gJyArIF9mcmFtZSArICc7Jyk7XG4gICAgICAgIHRoaXMuc3RhdGUuZXZhbCgndmFyIGNvbnRleHRlID0gJyArIEpTT04uc3RyaW5naWZ5KF9jb250ZXh0ZSkpO1xuICAgIH1cblxuICAgIGV4ZWN1dGVOZXh0KCk6IEVzcHJpbWFWZXJzZSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgZmlyc3Qgbm9kZSBvbiB0aGUgc3RhY2tcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5zdGFjay5zaGlmdCgpO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdOb2RlOicsIG5vZGUpO1xuXG4gICAgICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0YWNrIHNob3VsZCBub3QgYmUgZW1wdHkgIScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3RtdDtcblxuICAgICAgICAgICAgc3dpdGNoKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Z1bmN0aW9uRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KGZ1bmMuYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjbGFyZVByb2dyZW1Bcmd1bWVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkVmVyc2UoZnVuYyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2sgPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBibG9jay5ib2R5LnNsaWNlKCkucmV2ZXJzZSgpLm1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0Jsb2NrU3RhdGVtZW50IHVuc2hpZnRpbmc6JywgeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoeClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnSWZTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBzdG10ID0gbm9kZSBhcyBJZlN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3RDb2RlID0gZXNjb2RlR2VuZXJhdGUoc3RtdC50ZXN0KTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdFJlc3VsdCA9IHRoaXMuc3RhdGUuZXZhbCh0ZXN0Q29kZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0lmU3RhdGVtZW50IHRlc3QgZXZhbHVhdGUgdG86ICcsIHRlc3RSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVzdFJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnVGhlbiB1bnNoaWZ0aW5nOicsIHN0bXQuY29uc2VxdWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoc3RtdC5jb25zZXF1ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdG10LmFsdGVybmF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0Vsc2UgdW5zaGlmdGluZzonLCBzdG10LmFsdGVybmF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KHN0bXQuYWx0ZXJuYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFZlcnNlKHN0bXQpO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnUmV0dXJuU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgc3RtdCA9IG5vZGUgYXMgUmV0dXJuU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlID0gdGhpcy5zdGF0ZS5ldmFsKGVzY29kZUdlbmVyYXRlKHN0bXQuYXJndW1lbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFZlcnNlKHN0bXQpO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnTm9kZTonLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvZGUgPSBlc2NvZGVHZW5lcmF0ZShub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnR2VuZXJhdGVkIGNvZGU6JywgY29kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBldmFsUmVzdWx0ID0gdGhpcy5zdGF0ZS5ldmFsKGNvZGUpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdFdmFsdWF0ZSB0bzonLCBldmFsUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkVmVyc2Uobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuc3RhY2subGVuZ3RoID4gMCk7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJdGVyYXRvciBoYXMgbm8gbW9yZSBjb2RlIHRvIGV4ZWN1dGUgIScpO1xuICAgIH0gICAgXG4gICAgXG4gICAgaGFzTmV4dCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuZmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBub2RlcyA9IHRoaXMuc3RhY2suc2xpY2UoMCk7XG4gICAgICAgIHdoaWxlIChub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5vZGVzLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLnR5cGUgIT09ICdCbG9ja1N0YXRlbWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrczogQmxvY2tTdGF0ZW1lbnRbXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2sgPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBibG9ja3MucHVzaChibG9jayk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhcnNvdXJzIHJlY3Vyc2l2ZW1lbnQgbGVzIGJsb2NrcyDDoCBsYSByZWNoZXJjaGUgZGUgbm9ldWQgcXVpIG5lIHNvbnQgcGFzIGRlcyBibG9ja3NcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhhc05leHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFoYXNOZXh0ICYmIGJsb2Nrcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYiA9IGJsb2Nrcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiLmJvZHkubWFwKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeC50eXBlICE9PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNOZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhc05leHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBjbGFzcyBCYXNpY0VzcHJpbWFQcm9ncmVtIGltcGxlbWVudHMgRXNwcmltYVByb2dyZW0ge1xuXG4gICAgcHJpdmF0ZSBlc3ByaW1hUHJvZ3JhbTogUHJvZ3JhbTtcblxuICAgIHByaXZhdGUgaW5pdENvdXBsZXQ6IEVzcHJpbWFDb3VwbGV0O1xuICAgIHByaXZhdGUgY29sb3JlckNvdXBsZXQ6IEVzcHJpbWFDb3VwbGV0O1xuXG4gICAgY29uc3RydWN0b3IoY29kZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBjb25maWc6IFBhcnNlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbW1lbnQ6IHRydWUsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lc3ByaW1hUHJvZ3JhbSA9IHBhcnNlTW9kdWxlKGNvZGUsIGNvbmZpZyk7XG4gICAgICAgIHRoaXMuaW5pdENvdXBsZXQgPSB0aGlzLndhbGtQcm9ncmVtQ291cGxldCgnaW5pdGlhbGlzZXJQcm9ncmVtJyk7XG4gICAgICAgIHRoaXMuY29sb3JlckNvdXBsZXQgPSB0aGlzLndhbGtQcm9ncmVtQ291cGxldCgnY29sb3JlclByb2dyZW0nKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgd2Fsa1Byb2dyZW1Db3VwbGV0KGZ1bmN0aW9uTmFtZTogc3RyaW5nKTogRXNwcmltYUNvdXBsZXQge1xuICAgICAgICB2YXIgZnVuY05vZGU6IEZ1bmN0aW9uRGVjbGFyYXRpb24gfCBudWxsID0gbnVsbDtcbiAgICAgICAgdmFyIHZlcnNlczogQmFzZU5vZGVbXSA9IFtdO1xuICAgICAgICBlc3ByaW1hV2Fsa0FkZFBhcmVudCh0aGlzLmVzcHJpbWFQcm9ncmFtLCBub2RlID0+IHtcbiAgICAgICAgICAgIGlmKCBub2RlLnR5cGUgPT09ICdGdW5jdGlvbkRlY2xhcmF0aW9uJyAmJiBub2RlLmlkICYmIG5vZGUuaWQubmFtZSA9PT0gZnVuY3Rpb25OYW1lKSB7XG4gICAgICAgICAgICAgICAgZnVuY05vZGUgPSBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZ1bmNOb2RlICYmIEVzcHJpbWFIZWxwZXIuaXNDaGlsZE5vZGVPZihub2RlLCBmdW5jTm9kZSkpIHsgLy8gJiYgRXNwcmltYUhlbHBlci5pc05vdENoaWxkTm9kZU9mKG5vZGUsIHZlcnNlcylcbiAgICAgICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicgXG4gICAgICAgICAgICAgICAgICAgIHx8IG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nXG4gICAgICAgICAgICAgICAgICAgIHx8IG5vZGUudHlwZSA9PT0gJ0V4cHJlc3Npb25TdGF0ZW1lbnQnXG4gICAgICAgICAgICAgICAgICAgIHx8IG5vZGUudHlwZSA9PT0gJ1JldHVyblN0YXRlbWVudCdcbiAgICAgICAgICAgICAgICAgICAgfHwgbm9kZS50eXBlID09PSAnSWZTdGF0ZW1lbnQnICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2VzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9ICk7XG4gICAgICAgIGlmIChmdW5jTm9kZSkge1xuICAgICAgICAgICAgdmVyc2VzLnVuc2hpZnQoZnVuY05vZGUpO1xuICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkQ291cGxldChmdW5jTm9kZSwgdmVyc2VzKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEltcG9zc2libGUgZGUgdHJvdXZlciBsYSBmb25jdGlvbiAke2Z1bmN0aW9uTmFtZX0oKSAhYCk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCk6IEVzcHJpbWFDb3VwbGV0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdENvdXBsZXQ7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKTogRXNwcmltYUNvdXBsZXQge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xvcmVyQ291cGxldDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXRlcmF0b3Ioc3RhdGU6IFByb2dyZW1TdGF0ZSk6IEVzcHJpbWFWZXJzZUl0ZXJhb3Ige1xuICAgICAgICByZXR1cm4gbmV3IEJhc2ljRXNwcmltYUNvZGVJdGVyYXRvcih0aGlzLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKS5mdW5jdGlvblJvb3ROb2RlLCBzdGF0ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQmFzaWNFc3ByaW1hUHJvZ3JlbUZhY3RvcnkgaW1wbGVtZW50cyBFc3ByaW1hUHJvZ3JlbUZhY3Rvcnkge1xuXG4gICAgYnVpbGRQcm9ncmVtKGNvZGU6IHN0cmluZyk6IEVzcHJpbWFQcm9ncmVtIHtcbiAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcG9zc2libGUgdG8gYnVpbGQgUHJvZ3JlbSB3aXRob3V0IGNvZGUgIScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgQmFzaWNFc3ByaW1hUHJvZ3JlbShjb2RlKTtcbiAgICB9XG5cbiAgICBidWlsZENvdXBsZXQobm9kZTogRnVuY3Rpb25EZWNsYXJhdGlvbiwgdmVyc2VzOiBCYXNlTm9kZVtdKTogRXNwcmltYUNvdXBsZXQge1xuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW1wb3NzaWJsZSB0byBidWlsZCBlbXB0eSBDb3VwbGV0ICEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlc3ByaW1hVmVyc2VzID0gdmVyc2VzLm1hcCh0aGlzLmJ1aWxkVmVyc2UpO1xuXG4gICAgICAgIGxldCBjb3VwbGV0OiBFc3ByaW1hQ291cGxldCA9IHtcbiAgICAgICAgICAgIGZ1bmN0aW9uUm9vdE5vZGU6IG5vZGUsXG4gICAgICAgICAgICB2ZXJzZXM6IGVzcHJpbWFWZXJzZXNcbiAgICAgICAgfVxuICAgICAgICAvL2NvbnNvbGUubG9nKCdCdWlsdCBjb3VwbGV0OicsIGNvdXBsZXQpO1xuICAgICAgICByZXR1cm4gY291cGxldDtcbiAgICB9XG5cbiAgICBidWlsZFZlcnNlKG5vZGU6IEJhc2VOb2RlKTogRXNwcmltYVZlcnNlIHtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcG9zc2libGUgdG8gYnVpbGQgZW1wdHkgVmVyc2UgIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvZGUgPSBub2RlO1xuICAgICAgICBpZihub2RlLnR5cGUgPT09ICdJZlN0YXRlbWVudCcpIHtcbiAgICAgICAgICAgIGNvZGUgPSAobm9kZSBhcyBJZlN0YXRlbWVudCkudGVzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2ZXJzZTogRXNwcmltYVZlcnNlID0geyBcbiAgICAgICAgICAgIG5vZGU6IG5vZGUsXG4gICAgICAgICAgICBjb2RlOiBjb2RlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB2ZXJzZTtcbiAgICB9XG59XG4iLCJcbmV4cG9ydCBjbGFzcyBFdmFsU2NvcGUge1xuXG4gICAgLy8gU2VlIGh0dHA6Ly9wZXJmZWN0aW9ua2lsbHMuY29tL2dsb2JhbC1ldmFsLXdoYXQtYXJlLXRoZS1vcHRpb25zL1xuICAgIC8vIFdpbGwgcmV0dXJuIGFuIGV2YWwgYWJsZSB0byBldmFsdWF0ZSBqcyBjb2RlIGluIHRoZSBnbG9iYWwgc2NvcGUuXG4gICAgcHVibGljIHJlYWRvbmx5IGdsb2JhbEV2YWwgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciBpc0luZGlyZWN0RXZhbEdsb2JhbCA9IChmdW5jdGlvbiAob3JpZ2luYWwsIE9iamVjdCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvLyBEb2VzIGBPYmplY3RgIHJlc29sdmUgdG8gYSBsb2NhbCB2YXJpYWJsZSwgb3IgdG8gYSBnbG9iYWwsIGJ1aWx0LWluIGBPYmplY3RgLFxuICAgICAgICAgICAgICAgIC8vIHJlZmVyZW5jZSB0byB3aGljaCB3ZSBwYXNzZWQgYXMgYSBmaXJzdCBhcmd1bWVudD9cbiAgICAgICAgICAgICAgICByZXR1cm4gKDEsIGV2YWwpKCdPYmplY3QnKSA9PT0gb3JpZ2luYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgaW5kaXJlY3QgZXZhbCBlcnJvcnMgb3V0IChhcyBhbGxvd2VkIHBlciBFUzMpLCB0aGVuIGp1c3QgYmFpbCBvdXQgd2l0aCBgZmFsc2VgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KShPYmplY3QsIDEyMyk7XG5cbiAgICAgICAgaWYgKGlzSW5kaXJlY3RFdmFsR2xvYmFsKSB7XG4gICAgICAgICAgICAvLyBpZiBpbmRpcmVjdCBldmFsIGV4ZWN1dGVzIGNvZGUgZ2xvYmFsbHksIHVzZSBpdFxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChleHByZXNzaW9uOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDEsIGV2YWwpKGV4cHJlc3Npb24pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cuZXhlY1NjcmlwdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIC8vIGlmIGB3aW5kb3cuZXhlY1NjcmlwdCBleGlzdHNgLCB1c2UgaXRcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXhwcmVzc2lvbjogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuZXhlY1NjcmlwdChleHByZXNzaW9uKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdGhlcndpc2UsIGdsb2JhbEV2YWwgaXMgYHVuZGVmaW5lZGAgc2luY2Ugbm90aGluZyBpcyByZXR1cm5lZFxuICAgICAgICByZXR1cm4gKGV4cHI6IHN0cmluZykgPT4ge3Rocm93IG5ldyBFcnJvcignTm8gZ2xvYmFsIGV2YWwgYXZhaWxhYmxlICEnKTt9XG4gICAgfSkoKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxufVxuIiwiaW1wb3J0IHsgUHJvZ3JlbVNjaGVkdWxlciwgVmVyc2VJdGVyYXRvciwgUHJvZ3JlbUNvZGUsIFByb2dyZW1WZXJzZSwgU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyLCBMaW5lQ2hhbmdlTGlzdGVuZXIsIEZyYW1lQ2hhbmdlTGlzdGVuZXIsIFByb2dyZW1TdGF0ZSwgUHJvZ3JlbVRlbXBvLCBQcm9ncmVtQ29uZmlnIH0gZnJvbSBcIi4vVHlwZXNcIjtcblxuY2xhc3MgU2ltcGxlUHJvZ3JlbVNjaGVkdWxlciBpbXBsZW1lbnRzIFByb2dyZW1TY2hlZHVsZXIge1xuICAgIFxuICAgIHByaXZhdGUgc3RhdGU6IFByb2dyZW1TdGF0ZTtcbiAgICBwcml2YXRlIGNvZGVJdGVyYXRvcjogVmVyc2VJdGVyYXRvcjxhbnk+IHwgbnVsbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIHN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyczogU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgY29kZUV4ZWN1dGlvbkxpc3RlbmVyczogQ29kZUV4ZWN1dGlvbkxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGdyaWRDaGFuZ2VMaXN0ZW5lcnM6IEdyaWRDaGFuZ2VMaXN0ZW5lcltdID0gW107XG4gICAgcHJpdmF0ZSBsaW5lQ2hhbmdlTGlzdGVuZXJzOiBMaW5lQ2hhbmdlTGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgZnJhbWVDaGFuZ2VMaXN0ZW5lcnM6IEZyYW1lQ2hhbmdlTGlzdGVuZXJbXSA9IFtdO1xuXG4gICAgcHVibGljIHRlbXBvOiBQcm9ncmVtVGVtcG8gPSBQcm9ncmVtVGVtcG8uQnlMaW5lO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IFByb2dyZW1Db25maWcsIHByaXZhdGUgY29kZTogUHJvZ3JlbUNvZGU8YW55Pikge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5yZXNldCgpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZVN0YXJ0SXRlcmF0aW5nQ29kZShsaXN0ZW5lcjogU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfSAgICBcblxuICAgIHN1YnNjcmliZUNvZGVFeGVjdXRpb24obGlzdGVuZXI6IENvZGVFeGVjdXRpb25MaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvZGVFeGVjdXRpb25MaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfSAgICBcbiAgICBcbiAgICBzdWJzY3JpYmVHcmlkQ2hhbmdlKGxpc3RlbmVyOiBHcmlkQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ncmlkQ2hhbmdlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZUxpbmVDaGFuZ2UobGlzdGVuZXI6IExpbmVDaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmxpbmVDaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlRnJhbWVDaGFuZ2UobGlzdGVuZXI6IEZyYW1lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mcmFtZUNoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICByZXNldCgpOiBQcm9ncmVtU3RhdGUge1xuICAgICAgICBsZXQgaW5pdGlhbENvbnRleHRlID0ge307XG4gICAgICAgIC8vIENhbGwganVzdCBldmFsdWF0ZWQgaW5pdGlhbGlzZXJQcm9ncmVtIGZ1bmN0aW9uXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaW5pdGlhbGlzZXJQcm9ncmVtKHRoaXMuY29uZmlnLCBpbml0aWFsQ29udGV4dGUpO1xuICAgICAgICBjb25zb2xlLmxvZygnTG9hZGVkIGluaXRpYWwgY29udGV4dGU6ICcsIGluaXRpYWxDb250ZXh0ZSk7XG4gICAgICAgIGxldCBzdGF0ZSA9IG5ldyBQcm9ncmVtU3RhdGUoMCwgMCwgMCwgaW5pdGlhbENvbnRleHRlLCBudWxsKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIGN1cnJlbnQoKTogUHJvZ3JlbVN0YXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxuXG4gICAgbmV4dCgpOiBQcm9ncmVtU3RhdGVbXSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZSkgdGhyb3cgbmV3IEVycm9yKCdJbmNvbnNpc3RlbnQgUHJvZ3JlbSBzdGF0ZSAhJyk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcblxuICAgICAgICBpZiAodGhpcy50ZW1wbyA9PT0gUHJvZ3JlbVRlbXBvLkJ5VmVyc2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvZGVJdGVyYXRvciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlSXRlcmF0b3IgPSB0aGlzLmNvZGUuaXRlcmF0b3IodGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlU3RhcnRJdGVyYXRpbmdDb2RlKHRoaXMuc3RhdGUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnaGFzTmV4dDonLCB0aGlzLmNvZGVJdGVyYXRvci5oYXNOZXh0KCkpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb2RlSXRlcmF0b3IuaGFzTmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZlcnNlID0gdGhpcy5jb2RlSXRlcmF0b3IuZXhlY3V0ZU5leHQoKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSBuZXcgUHJvZ3JlbVN0YXRlKHRoaXMuc3RhdGUuY29sb25uZSwgdGhpcy5zdGF0ZS5saWduZSwgdGhpcy5zdGF0ZS5mcmFtZSwgdGhpcy5zdGF0ZS5jb250ZXh0ZSwgdmVyc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGVFeGVjdXRpb25MaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlQ29kZUV4ZWN1dGlvbihuZXdTdGF0ZSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbbmV3U3RhdGVdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdGaW5pc2hlZCBpdGVyYXRpbmcgb3ZlciBjb2RlLicpXG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgbGV0IG5vdGlmeVBpeGVsQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIGxldCBub3RpZnlMaW5lQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIGxldCBub3RpZnlGcmFtZUNoYW5nZSA9IGZhbHNlO1xuICAgICAgICBsZXQgYnVmZmVyZWRTdGF0ZXM6IFByb2dyZW1TdGF0ZVtdID0gW107XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGxldCBfY29sb25uZSA9IHRoaXMuc3RhdGUuY29sb25uZTtcbiAgICAgICAgICAgIGxldCBfbGlnbmUgPSB0aGlzLnN0YXRlLmxpZ25lO1xuICAgICAgICAgICAgbGV0IF9mcmFtZSA9IHRoaXMuc3RhdGUuZnJhbWU7XG5cbiAgICAgICAgICAgIF9jb2xvbm5lICsrO1xuICAgICAgICAgICAgbm90aWZ5UGl4ZWxDaGFuZ2UgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoX2NvbG9ubmUgPj0gdGhpcy5jb25maWcubm9tYnJlQ29sb25uZXMpIHtcbiAgICAgICAgICAgICAgICBfY29sb25uZSA9IDA7XG4gICAgICAgICAgICAgICAgX2xpZ25lICsrO1xuICAgICAgICAgICAgICAgIG5vdGlmeUxpbmVDaGFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoX2xpZ25lID49IHRoaXMuY29uZmlnLm5vbWJyZUxpZ25lcykge1xuICAgICAgICAgICAgICAgIF9saWduZSA9IDA7XG4gICAgICAgICAgICAgICAgX2ZyYW1lICsrO1xuICAgICAgICAgICAgICAgIG5vdGlmeUZyYW1lQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF9mcmFtZSA+PSB0aGlzLmNvbmZpZy5ub21icmVGcmFtZXMpIHtcbiAgICAgICAgICAgICAgICBfZnJhbWUgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSBuZXcgUHJvZ3JlbVN0YXRlKF9jb2xvbm5lLCBfbGlnbmUsIF9mcmFtZSwgdGhpcy5zdGF0ZS5jb250ZXh0ZSwgbnVsbCk7XG4gICAgXG4gICAgICAgICAgICBpZiAobm90aWZ5UGl4ZWxDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRDaGFuZ2VMaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlR3JpZENoYW5nZSh0aGlzLnN0YXRlKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChub3RpZnlMaW5lQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5lQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUxpbmVDaGFuZ2UodGhpcy5zdGF0ZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm90aWZ5RnJhbWVDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUZyYW1lQ2hhbmdlKHRoaXMuc3RhdGUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnVmZmVyZWRTdGF0ZXMucHVzaCh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgIC8vdGhpcy5jb2RlSXRlcmF0b3IgPSB0aGlzLmNvZGUuaXRlcmF0b3IobmV3U3RhdGUpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0gd2hpbGUodGhpcy50ZW1wbyA9PT0gUHJvZ3JlbVRlbXBvLkJ5TGluZSAmJiAhbm90aWZ5TGluZUNoYW5nZSB8fCB0aGlzLnRlbXBvID09PSBQcm9ncmVtVGVtcG8uQnlGcmFtZSAmJiAhbm90aWZ5RnJhbWVDaGFuZ2UpO1xuXG4gICAgICAgIHRoaXMuY29kZUl0ZXJhdG9yID0gbnVsbDtcblxuICAgICAgICByZXR1cm4gYnVmZmVyZWRTdGF0ZXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFByb2dyZW0oKTogUHJvZ3JlbUNvZGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvZGU7XG4gICAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFNjaGVkdWxpbmdTZXJ2aWNlIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFByb2dyZW1TY2hlZHVsZXIoY29uZmlnOiBQcm9ncmVtQ29uZmlnLCBjb2RlOiBQcm9ncmVtQ29kZTxhbnk+LCB0ZW1wbzogUHJvZ3JlbVRlbXBvKSB7XG4gICAgICAgIGxldCBzY2hlZHVsZXIgPSBuZXcgU2ltcGxlUHJvZ3JlbVNjaGVkdWxlcihjb25maWcsIGNvZGUpO1xuICAgICAgICBzY2hlZHVsZXIudGVtcG8gPSB0ZW1wbztcbiAgICAgICAgcmV0dXJuIHNjaGVkdWxlcjtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBTdHlsZURlY29yYXRvciB9IGZyb20gXCIuLi8uLi9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNlTm9kZSwgRnVuY3Rpb25EZWNsYXJhdGlvbiwgQmxvY2tTdGF0ZW1lbnQsIElmU3RhdGVtZW50LCBWYXJpYWJsZURlY2xhcmF0b3IsIFZhcmlhYmxlRGVjbGFyYXRpb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBFeHByZXNzaW9uU3RhdGVtZW50LCBSZXR1cm5TdGF0ZW1lbnQsIElkZW50aWZpZXIsIE1lbWJlckV4cHJlc3Npb24gfSBmcm9tIFwiZXN0cmVlXCI7XG5pbXBvcnQgeyBIdG1sSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvSHRtbEhlbHBlclwiO1xuaW1wb3J0IHsgRXNwcmltYUhlbHBlciB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFIZWxwZXJcIjtcbmltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcbmltcG9ydCB7IEVzcHJpbWFWZXJzZSwgRXNwcmltYUh0bWxDb3VwbGV0RmFjdG9yeSwgRXNwcmltYUNvdXBsZXQgfSBmcm9tIFwiLi4vLi4vZXNwcmltYS9Fc3ByaW1hVHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIEVzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkgaW1wbGVtZW50cyBFc3ByaW1hSHRtbENvdXBsZXRGYWN0b3J5IHtcblxuICAgIHByaXZhdGUgaHRtbFZlcnNlc01hcDogTWFwPEJhc2VOb2RlLCBIVE1MRWxlbWVudD4gPSBuZXcgTWFwKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb3VwbGV0OiBFc3ByaW1hQ291cGxldCxcbiAgICAgICAgcHJpdmF0ZSBkZWNvcmF0b3I6IFN0eWxlRGVjb3JhdG9yPEJhc2VOb2RlPlxuICAgICkge31cblxuICAgIGJ1aWxkQ291cGxldCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBodG1sQ291cGxldCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuY291cGxldC5mdW5jdGlvblJvb3ROb2RlKTtcbiAgICAgICAgaHRtbENvdXBsZXQuY2xhc3NMaXN0LmFkZCgncHJvZ3JlbS1pbnNwZWN0b3ItY29tcG9uZW50Jyk7XG4gICAgICAgIHJldHVybiBodG1sQ291cGxldDtcbiAgICB9XG5cbiAgICBnZXRIdG1sVmVyc2UodmVyc2U6IEVzcHJpbWFWZXJzZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKHRoaXMuaHRtbFZlcnNlc01hcC5zaXplID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWxTdGF0ZUVycm9yOiBjb3VwbGV0IG11c3QgYmUgYnVpbHQgYmVmb3JlIGNhbGxpbmcgZ2V0SHRtbFZlcnNlKCkgIScpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHRtbEVsZW1lbnQgPSB0aGlzLmh0bWxWZXJzZXNNYXAuZ2V0KHZlcnNlLm5vZGUpO1xuICAgICAgICBpZiAoIWh0bWxFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gSFRNTEVsZW1lbnQgZm91bmQgbWF0Y2hpbmcgdmVyc2U6JywgdmVyc2UsICchJylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gSFRNTEVsZW1lbnQgZm91bmQgbWF0Y2hpbmcgc3VwcGxpZWQgdmVyc2UgIWApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaHRtbEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGQgTm9kZSBhcHBseWluZyBkZWNvcmF0b3JzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBub2RlIHRoZSBub2RlIGZvciB3aGljaCB0byBwcm9kdWNlIEhUTUxcbiAgICAgKiBAcGFyYW0gc2libGluZ3MgdGhlIG5vZGVzIHRvIGFkZCBhcyBzaWJsaW5ncyBvZiB0aGUgbm9kZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBidWlsZE5vZGUobm9kZTogQmFzZU5vZGUgfCB1bmRlZmluZWQgfCBudWxsKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBIdG1sSGVscGVyLnNwYW4oJ2VtcHR5JywgJycpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzaWJsaW5nczogSFRNTEVsZW1lbnRbXSA9IFtdXG4gICAgICAgIGxldCBodG1sT3V0cHV0ID0gdGhpcy5idWlsZE5vZGVJbnRlcm5hbChub2RlLCBzaWJsaW5ncyk7XG4gICAgICAgIGh0bWxPdXRwdXQgPSB0aGlzLmRlY29yYXRvci5kZWNvcmF0ZShub2RlLCBodG1sT3V0cHV0KTtcblxuICAgICAgICBsZXQgbWF0Y2hpbmdWZXJzZSA9IHRoaXMuY291cGxldC52ZXJzZXMuZmluZCh2ID0+IHYubm9kZSA9PT0gbm9kZSk7XG4gICAgICAgIGlmIChtYXRjaGluZ1ZlcnNlKSB7XG4gICAgICAgICAgICBodG1sT3V0cHV0ID0gdGhpcy5lbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGh0bWxPdXRwdXQpO1xuICAgICAgICAgICAgLy8gVGhpcyBub2RlIGlzIHRoZSByb290IG5vZGUgb2YgYSBWZXJzZVxuICAgICAgICAgICAgdGhpcy5odG1sVmVyc2VzTWFwLnNldChtYXRjaGluZ1ZlcnNlLm5vZGUsIGh0bWxPdXRwdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpYmxpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIElmIHNpYmxpbmdzLCBidWlsZCBlYWNoIHNpYmxpbmdcbiAgICAgICAgICAgIGh0bWxPdXRwdXQgPSBIdG1sSGVscGVyLnNwYW4oJ3NpYmxpbmctY29udGFpbmVyJywgaHRtbE91dHB1dCk7XG4gICAgICAgICAgICB3aGlsZShzaWJsaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNpYmxpbmcgPSBzaWJsaW5ncy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIGlmIChzaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IHNpYmxpbmdPdXQgPSB0aGlzLmJ1aWxkTm9kZShzaWJsaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgaHRtbE91dHB1dC5hcHBlbmRDaGlsZChzaWJsaW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaHRtbE91dHB1dDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZW5jYXBzdWxhdGVOb2RlSW5WZXJzZUNvbnRhaW5lcihodG1sRWx0OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZlcnNlLWNvbnRlbnQnLCBodG1sRWx0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbigndmVyc2UgdmVyc2UtY29udGFpbmVyJywgY29udGVudCk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGQgbm9kZS5cbiAgICAgKiBAcGFyYW0gbm9kZSBcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYnVpbGROb2RlSW50ZXJuYWwobm9kZTogQmFzZU5vZGUsIHNpYmxpbmdzOiBIVE1MRWxlbWVudFtdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdCdWlsZGluZyBub2RlJywgbm9kZSwgJy4uLicpO1xuICAgICAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRGdW5jdGlvbkRlY2xhcmF0aW9uKG5vZGUsIHNpYmxpbmdzKTtcbiAgICAgICAgICAgIGNhc2UgJ0Jsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEJsb2NrU3RhdGVtZW50KG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnSWZTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkSWZTdGF0ZW1lbnQobm9kZSwgc2libGluZ3MpO1xuICAgICAgICAgICAgY2FzZSAnVmFyaWFibGVEZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRWYXJpYWJsZURlY2xhcmF0aW9uKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnVmFyaWFibGVEZWNsYXJhdG9yJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZFZhcmlhYmxlRGVjbGFyYXRvcihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEFzc2lnbm1lbnRFeHByZXNzaW9uKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnQmluYXJ5RXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRCaW5hcnlFeHByZXNzaW9uKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnRXhwcmVzc2lvblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRFeHByZXNzaW9uU3RhdGVtZW50KG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnUmV0dXJuU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZFJldHVyblN0YXRlbWVudChub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0lkZW50aWZpZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkSWRlbnRpZmllcihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ01lbWJlckV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkTWVtYmVyRXhwcmVzc2lvbihub2RlKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGREZWZhdWx0KG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkRnVuY3Rpb25EZWNsYXJhdGlvbihub2RlOiBCYXNlTm9kZSwgc2libGluZ3M6IEhUTUxFbGVtZW50W10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICBcbiAgICAgICAgbGV0IGRlY2xTdGFydEl0ZW1zOiAoc3RyaW5nIHwgSFRNTEVsZW1lbnQpW107XG4gICAgICAgIGlmIChuLmlkKSB7XG4gICAgICAgICAgICBsZXQgZnVuY0lkID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLWlkJywgbi5pZC5uYW1lKTtcbiAgICAgICAgICAgIGRlY2xTdGFydEl0ZW1zID0gWydmdW5jdGlvbiAnLCBmdW5jSWQsICcgKCAnXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlY2xTdGFydEl0ZW1zID0gWydmdW5jdGlvbiAoICddOy8vICsgZnVuYy5wYXJhbXMubWFwKHggPT4geC5uYW1lKS5qb2luKCcsICcpICsgJyApIHsnO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhcmFtQ291bnQgPSBuLnBhcmFtcy5sZW5ndGg7XG4gICAgICAgIG4ucGFyYW1zLmZvckVhY2goKHBhcmFtLCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEVzcHJpbWFIZWxwZXIucGF0dGVyblRvU3RyaW5nKHBhcmFtKTtcbiAgICAgICAgICAgIGxldCBmdW5jUGFyYW0gPSB0aGlzLmJ1aWxkTm9kZShwYXJhbSk7Ly9IdG1sSGVscGVyLnNwYW4oJ2Z1bmMtcGFyYW0nLCB2YXJOYW1lKTtcbiAgICAgICAgICAgIGRlY2xTdGFydEl0ZW1zLnB1c2goZnVuY1BhcmFtKTtcbiAgICAgICAgICAgIGlmIChpIDwgcGFyYW1Db3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICBkZWNsU3RhcnRJdGVtcy5wdXNoKCcsICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBkZWNsU3RhcnRJdGVtcy5wdXNoKCcgKSB7Jyk7XG5cbiAgICAgICAgbGV0IGRlY2xTdGFydCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1zdGFydCcsIGRlY2xTdGFydEl0ZW1zKTtcbiAgICAgICAgbGV0IGZ1bmNCb2R5ID0gdGhpcy5idWlsZE5vZGUobi5ib2R5KTtcbiAgICAgICAgbGV0IGRlY2xFbmQgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtZW5kJywgJ30nKTtcbiAgICAgICAgZGVjbEVuZCA9IHRoaXMuZW5jYXBzdWxhdGVOb2RlSW5WZXJzZUNvbnRhaW5lcihkZWNsRW5kKTtcbiAgICAgICAgLy9sZXQgZGVjbCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1kZWNsYXJhdGlvbicsIFtkZWNsU3RhcnQsIGZ1bmNCb2R5LCBkZWNsRW5kXSk7XG4gICAgICAgIGxldCBkZWNsID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLWRlY2xhcmF0aW9uJywgZGVjbFN0YXJ0KTtcbiAgICAgICAgc2libGluZ3MucHVzaChmdW5jQm9keSk7XG4gICAgICAgIHNpYmxpbmdzLnB1c2goZGVjbEVuZCk7XG4gICAgICAgIHJldHVybiBkZWNsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEJsb2NrU3RhdGVtZW50KG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgQmxvY2tTdGF0ZW1lbnQ7XG4gICAgICAgIGxldCBib2R5U3RhdGVtZW50cyA9IG4uYm9keS5tYXAoc3RhdGVtZW50ID0+IHRoaXMuYnVpbGROb2RlKHN0YXRlbWVudCkpXG4gICAgICAgIHJldHVybiBIdG1sSGVscGVyLnNwYW4oJ2Jsb2NrJywgYm9keVN0YXRlbWVudHMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZElmU3RhdGVtZW50KG5vZGU6IEJhc2VOb2RlLCBzaWJsaW5nczogSFRNTEVsZW1lbnRbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIElmU3RhdGVtZW50O1xuICAgICAgICBsZXQgY29udGVudDogSFRNTEVsZW1lbnRbXSA9IFtdXG4gICAgICAgIGxldCB0ZXN0ID0gdGhpcy5idWlsZE5vZGUobi50ZXN0KTtcbiAgICAgICAgbGV0IGlmU3RhcnRUZXh0ID0gWydpZiAoICcsIHRlc3QsICcgKSB7J107XG4gICAgICAgIGxldCBpZlN0YXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtc3RhdGVtZW50LXN0YXJ0JywgaWZTdGFydFRleHQpO1xuICAgICAgICBjb250ZW50LnB1c2goaWZTdGFydCk7XG5cbiAgICAgICAgbGV0IHRoZW5CbG9jayA9IHRoaXMuYnVpbGROb2RlKG4uY29uc2VxdWVudCk7XG4gICAgICAgIGxldCBpZlRoZW4gPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1ibG9jay10aGVuJywgdGhlbkJsb2NrKTtcbiAgICAgICAgY29udGVudC5wdXNoKGlmVGhlbik7XG4gICAgICAgIHNpYmxpbmdzLnB1c2godGhlbkJsb2NrKTtcblxuICAgICAgICBpZiAobi5hbHRlcm5hdGUpIHtcbiAgICAgICAgICAgIGxldCBpZkVsc2VEZWNsID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtc3RhdGVtZW50LWVsc2UnLCAnfSBlbHNlIHsnKTtcbiAgICAgICAgICAgIGlmRWxzZURlY2wgPSB0aGlzLmVuY2Fwc3VsYXRlTm9kZUluVmVyc2VDb250YWluZXIoaWZFbHNlRGVjbCk7XG4gICAgICAgICAgICBjb250ZW50LnB1c2goaWZFbHNlRGVjbCk7XG4gICAgICAgICAgICBzaWJsaW5ncy5wdXNoKGlmRWxzZURlY2wpO1xuXG4gICAgICAgICAgICBsZXQgZWxzZUJsb2NrID0gdGhpcy5idWlsZE5vZGUobi5hbHRlcm5hdGUpO1xuICAgICAgICAgICAgbGV0IGlmRWxzZSA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLWJsb2NrLWVsc2UnLCBlbHNlQmxvY2spO1xuICAgICAgICAgICAgY29udGVudC5wdXNoKGlmRWxzZSk7XG4gICAgICAgICAgICBzaWJsaW5ncy5wdXNoKGlmRWxzZSk7XG4gICAgICAgIH0gXG4gICAgICAgIGxldCBpZkVuZCA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLXN0YXRlbWVudC1lbmQnLCAnfScpO1xuICAgICAgICBpZkVuZCA9IHRoaXMuZW5jYXBzdWxhdGVOb2RlSW5WZXJzZUNvbnRhaW5lcihpZkVuZCk7XG4gICAgICAgIGNvbnRlbnQucHVzaChpZkVuZCk7XG4gICAgICAgIHNpYmxpbmdzLnB1c2goaWZFbmQpO1xuXG4gICAgICAgIC8vbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLXN0YXRlbWVudCcsIGNvbnRlbnQpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGlmU3RhcnQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkVmFyaWFibGVEZWNsYXJhdGlvbihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgIGxldCBkZWNsYXJhdGlvbnMgPSBuLmRlY2xhcmF0aW9ucy5tYXAoZCA9PiB0aGlzLmJ1aWxkTm9kZShkKSk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2RlY2xhcmF0aW9uIHZhcmlhYmxlLWRlY2xhcmF0aW9uJyk7XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBuLmtpbmQgKyAnICc7XG4gICAgICAgIGRlY2xhcmF0aW9ucy5mb3JFYWNoKGQgPT4gY29udGFpbmVyLmFwcGVuZENoaWxkKGQpKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRWYXJpYWJsZURlY2xhcmF0b3Iobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0b3I7XG4gICAgICAgIGxldCBsZWZ0UGFydCA9IHRoaXMuYnVpbGROb2RlKG4uaWQpO1xuICAgICAgICBsZXQgY29udGFpbmVyO1xuICAgICAgICBpZiAobi5pbml0KSB7XG4gICAgICAgICAgICBsZXQgYXNzaWduUGFydCA9IEh0bWxIZWxwZXIuc3Bhbignb3BlcmF0b3IgYXNzaWduLW9wZXJhdG9yJywgJz0nKTtcbiAgICAgICAgICAgIGxldCByaWdodCA9IHRoaXMuYnVpbGROb2RlKG4uaW5pdCk7XG4gICAgICAgICAgICBsZXQgcmlnaHRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS12YWx1ZScsIHJpZ2h0KTtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiB2YXJpYWJsZS1kZWNsYXJhdG9yJywgW2xlZnRQYXJ0LCBhc3NpZ25QYXJ0LCByaWdodFBhcnRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiB2YXJpYWJsZS1kZWNsYXJhdG9yJywgbGVmdFBhcnQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEFzc2lnbm1lbnRFeHByZXNzaW9uKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgQXNzaWdubWVudEV4cHJlc3Npb247XG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5idWlsZE5vZGUobi5sZWZ0KTtcbiAgICAgICAgbGV0IGxlZnRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS1pZCcsIGxlZnQpO1xuICAgICAgICBsZXQgYXNzaWduUGFydCA9IEh0bWxIZWxwZXIuc3Bhbignb3BlcmF0b3IgYXNzaWduLW9wZXJhdG9yJywgJz0nKTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5idWlsZE5vZGUobi5yaWdodCk7XG4gICAgICAgIGxldCByaWdodFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLXZhbHVlJywgcmlnaHQpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIGFzc2lnbm1lbnQtZXhwcmVzc2lvbicsIFtsZWZ0UGFydCwgYXNzaWduUGFydCwgcmlnaHRQYXJ0XSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkQmluYXJ5RXhwcmVzc2lvbihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEJpbmFyeUV4cHJlc3Npb247XG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5idWlsZE5vZGUobi5sZWZ0KTtcbiAgICAgICAgbGV0IGxlZnRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uJywgbGVmdCk7XG4gICAgICAgIGxldCBvcGVyYXRvclBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ29wZXJhdG9yIGV4cHJlc3Npb24tb3BlcmF0b3InLCBuLm9wZXJhdG9yKTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5idWlsZE5vZGUobi5yaWdodCk7XG4gICAgICAgIGxldCByaWdodFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24nLCByaWdodCk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gYmluYXJ5LWV4cHJlc3Npb24nLCBbbGVmdFBhcnQsIG9wZXJhdG9yUGFydCwgcmlnaHRQYXJ0XSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkRXhwcmVzc2lvblN0YXRlbWVudChub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEV4cHJlc3Npb25TdGF0ZW1lbnQ7XG4gICAgICAgIGxldCBjb2RlID0gdGhpcy5idWlsZE5vZGUobi5leHByZXNzaW9uKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGV4cHJlc3Npb24tc3RhdGVtZW50JywgY29kZSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkUmV0dXJuU3RhdGVtZW50KG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgUmV0dXJuU3RhdGVtZW50O1xuICAgICAgICBsZXQgYXJnID0gdGhpcy5idWlsZE5vZGUobi5hcmd1bWVudCk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCByZXR1cm4tc3RhdGVtZW50JywgWydyZXR1cm4gJywgYXJnXSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkSWRlbnRpZmllcihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIElkZW50aWZpZXI7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2lkZW50aWZpZXInLCBFc3ByaW1hSGVscGVyLnBhdHRlcm5Ub1N0cmluZyhuKSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkTWVtYmVyRXhwcmVzc2lvbihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIE1lbWJlckV4cHJlc3Npb247XG4gICAgICAgIGxldCBvYmplY3QgPSB0aGlzLmJ1aWxkTm9kZShuLm9iamVjdCk7XG4gICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMuYnVpbGROb2RlKG4ucHJvcGVydHkpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIG1lbWJlci1leHByZXNzaW9uJywgW29iamVjdCwgJy4nLCBwcm9wZXJ0eV0pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZERlZmF1bHQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkZWZhdWx0OicsIG5vZGUpO1xuICAgICAgICBsZXQgY29kZSA9IGVzY29kZUdlbmVyYXRlKG5vZGUpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdkZWZhdWx0LScgKyBub2RlLnR5cGUsIGNvZGUpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBQcm9ncmVtQ29tcG9uZW50LCBQcm9ncmVtU2NoZWR1bGVyLCBIdG1sQ291cGxldEZhY3RvcnksIFByb2dyZW1TdGF0ZSwgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyLCBHcmlkQ2hhbmdlTGlzdGVuZXIgfSBmcm9tICcuLi8uLi9jb3JlL1R5cGVzJztcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBQcm9ncmVtQ29tcG9uZW50LCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciB7XG5cbiAgICBwcml2YXRlIGV4ZWN1dGluZ0VsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgcHJpdmF0ZSBleGVjdXRlZEVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVYRUNVVElOR19DTEFTUyA9ICd2ZXJzZS1leGVjdXRpbmcnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVhFQ1VURURfQ0xBU1MgPSAndmVyc2UtZXhlY3V0ZWQnO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyLFxuICAgICAgICBwcml2YXRlIGh0bWxGYWN0b3J5OiBIdG1sQ291cGxldEZhY3Rvcnk8YW55PlxuICAgICkge1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlQ29kZUV4ZWN1dGlvbih0aGlzKTtcbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUdyaWRDaGFuZ2UodGhpcyk7XG4gICAgfVxuXG4gICAgcmVuZGVySHRtbCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBodG1sQ29tcG9uZW50ID0gdGhpcy5odG1sRmFjdG9yeS5idWlsZENvdXBsZXQoKTtcbiAgICAgICAgcmV0dXJuIGh0bWxDb21wb25lbnQ7XG4gICAgfVxuICAgIFxuICAgIGZpcmVDb2RlRXhlY3V0aW9uKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFzdGF0ZS52ZXJzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgbGV0IGh0bWxWZXJzZSA9IHRoaXMuaHRtbEZhY3RvcnkuZ2V0SHRtbFZlcnNlKHN0YXRlLnZlcnNlKTtcbiAgICAgICAgaWYoaHRtbFZlcnNlKSB7XG4gICAgICAgICAgICBodG1sVmVyc2UuY2xhc3NMaXN0LmFkZChQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRoaXMuZXhlY3V0aW5nRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGVsdCA9IHRoaXMuZXhlY3V0aW5nRWxlbWVudHMucG9wKCk7XG4gICAgICAgICAgICBpZiAoZWx0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlZEVsZW1lbnRzLnB1c2goZWx0KTtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5hZGQoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRFRF9DTEFTUyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFodG1sVmVyc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZXhlY3V0aW5nRWxlbWVudHMucHVzaChodG1sVmVyc2UpO1xuICAgICAgICBodG1sVmVyc2UuY2xhc3NMaXN0LmFkZChQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgfVxuXG4gICAgZmlyZUdyaWRDaGFuZ2Uoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICB3aGlsZSAodGhpcy5leGVjdXRpbmdFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgZWx0ID0gdGhpcy5leGVjdXRpbmdFbGVtZW50cy5wb3AoKTtcbiAgICAgICAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVEVEX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAodGhpcy5leGVjdXRlZEVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBlbHQgPSB0aGlzLmV4ZWN1dGVkRWxlbWVudHMucG9wKCk7XG4gICAgICAgICAgICBpZiAoZWx0KSB7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5yZW1vdmUoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRFRF9DTEFTUyk7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5yZW1vdmUoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRJTkdfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBTdHlsZURlY29yYXRvciwgQ29sb3JQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNlTm9kZSwgSWRlbnRpZmllciB9IGZyb20gXCJlc3RyZWVcIjtcblxuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvQ29sb3JTZXJ2aWNlXCI7XG5pbXBvcnQgeyBFc3ByaW1hSGVscGVyIH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYUhlbHBlclwiO1xuaW1wb3J0IHsgSHRtbEhlbHBlciB9IGZyb20gXCIuLi8uLi9jb3JlL0h0bWxIZWxwZXJcIjtcblxuZXhwb3J0IGNsYXNzIENvbG9yVmFyaWFibGVTY29wZURlY29yYXRvciBpbXBsZW1lbnRzIFN0eWxlRGVjb3JhdG9yPHN0cmluZz4ge1xuXG4gICAgcHJpdmF0ZSB2YXJpYWJsZU1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKTtcbiAgICBwcml2YXRlIGNvbG9yUHJvdmlkZXI6IENvbG9yUHJvdmlkZXIgPSBDb2xvclNlcnZpY2UuY29sb3JQcm92aWRlcmFjdG9yeS5idWlsZCgpO1xuXG4gICAgZGVjb3JhdGUodmFySWQ6IHN0cmluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCB2YXJJbmRleCA9IHRoaXMudmFyaWFibGVNYXAuZ2V0KHZhcklkKTtcbiAgICAgICAgaWYgKCF2YXJJbmRleCkge1xuICAgICAgICAgICAgdmFySW5kZXggPSB0aGlzLnZhcmlhYmxlTWFwLnNpemUgKyAxO1xuICAgICAgICAgICAgdGhpcy52YXJpYWJsZU1hcC5zZXQodmFySWQsIHZhckluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndmFyaWFibGUtaGludCcpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3ZhcmlhYmxlLScgKyB2YXJJbmRleCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS1oaW50LWNvbnRhaW5lcicsIGVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH0gICAgXG4gICAgXG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBzdHlsZSA9ICcnO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCd2YXJpYWJsZSBjb3VudDonLCB0aGlzLnZhcmlhYmxlTWFwLnNpemUpO1xuICAgICAgICB0aGlzLnZhcmlhYmxlTWFwLmZvckVhY2goKGluZGV4LCBpZCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5jb2xvclByb3ZpZGVyLmhhc2hTdHJpbmdUb0NvbG9yKGlkLCAxNik7IC8vdGhpcy52YXJpYWJsZU1hcC5zaXplXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdidWlsZGluZyBjb2xvciAjJywgaWQsICc9PicsIGNvbG9yKTtcbiAgICAgICAgICAgIHN0eWxlICs9IGBcbiAgICAgICAgICAgICAgICAudmFyaWFibGUtc2NvcGUtY29tcG9uZW50IC52YXJpYWJsZS1oaW50LWNvbnRhaW5lciB7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogMC44ZW0gMCAwLjhlbSAwO1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLnZhcmlhYmxlLXNjb3BlLWNvbXBvbmVudCAudmFyaWFibGUtaGludCB7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAuMWVtIDAuNWVtIDAuMWVtIDAuNWVtO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMC44ZW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC52YXJpYWJsZS1zY29wZS1jb21wb25lbnQgLnZhcmlhYmxlLSR7aW5kZXh9LCBcbiAgICAgICAgICAgICAgICAudmFyaWFibGUtc2NvcGUtY29tcG9uZW50IC52YXJpYWJsZS0ke2luZGV4fSB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGA7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGFkVmVyc2VEZWNvcmF0b3IgaW1wbGVtZW50cyBTdHlsZURlY29yYXRvcjxCYXNlTm9kZT4ge1xuXG4gICAgZGVjb3JhdGUobm9kZTogQmFzZU5vZGUsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvZGUtcGFkZGluZycpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9ICAgIFxuICAgIFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYFxuICAgICAgICAuY29kZS1wYWRkaW5nIHtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAzMnB4O1xuICAgICAgICB9XG4gICAgICAgIGA7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBTY2hlZHVsaW5nU2VydmljZSB9IGZyb20gJy4vU2NoZWR1bGluZ1NlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Qcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50JztcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gJy4vU2NyZWVuU2VydmljZSc7XG5pbXBvcnQgeyBCYXNlTm9kZSB9IGZyb20gJ2VzdHJlZSc7XG5pbXBvcnQgeyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uLCBQcm9ncmVtU2NoZWR1bGVyLCBQcm9ncmVtQ29kZSwgUHJvZ3JlbVRlbXBvLCBQcm9ncmVtQ29uZmlnIH0gZnJvbSAnLi9UeXBlcyc7XG5pbXBvcnQgeyBQYWRWZXJzZURlY29yYXRvciwgQ29sb3JWZXJzZVZhcmlhYmxlRGVjb3JhdG9yIH0gZnJvbSAnLi4vY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9yU3R5bGVEZWNvcmF0b3JzJztcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tICcuL0h0bWxIZWxwZXInO1xuaW1wb3J0IHsgRXNwcmltYVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeSB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Fc3ByaW1hUHJvZ3JlbUluc3BlY3Rvckh0bWxGYWN0b3J5JztcbmltcG9ydCB7IENvZGVTZXJ2aWNlIH0gZnJvbSAnLi9Db2RlU2VydmljZSc7XG5pbXBvcnQgeyBQcm9ncmVtR3JpZENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUdyaWQvUHJvZ3JlbUdyaWRDb21wb25lbnQnO1xuaW1wb3J0IHsgVmFyaWFibGVTY29wZUNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvdmFyaWFibGVTY29wZS9WYXJpYWJsZVNjb3BlQ29tcG9uZW50JztcbmltcG9ydCB7IEVzcHJpbWFWYXJpYWJsZVNjb3BlSHRtbEZhY3RvcnkgfSBmcm9tICcuLi9jb21wb25lbnRzL3ZhcmlhYmxlU2NvcGUvRXNwcmltYVZhcmlhYmxlU2NvcGVIdG1sRmFjdG9yeSc7XG5pbXBvcnQgeyBDb2xvclZhcmlhYmxlU2NvcGVEZWNvcmF0b3IgfSBmcm9tICcuLi9jb21wb25lbnRzL3ZhcmlhYmxlU2NvcGUvRXNwcmltYVZhcmlhYmxlU2NvcGVTdHlsZURlY29yYXRvcnMnO1xuaW1wb3J0IHsgUHJvZ3JlbUVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUVkaXRvci9Qcm9ncmVtRWRpdG9yQ29tcG9uZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvZ3JlbUhlbHBlciB7XG5cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBQcm9ncmVtU2VydmljZSB7XG5cbiAgICB2YXIgcHJldmlvdXNSZXBhaW50VGltZSA9IDA7XG4gICAgdmFyIHNjaGVkdWxlcjogUHJvZ3JlbVNjaGVkdWxlcjtcbiAgICB2YXIgcHJvZ3JlbUFuaW1hdGlvblNwZWVkID0gMjtcbiAgICB2YXIgcHJvZ3JlbUFuaW1hdGlvbkludGVydmFscyA9IFs2MDAwMCwgNTAwMCwgMTAwMCwgNTAwLCAxMDAsIDEwLCAxXTtcbiAgICB2YXIgcHJvZ3JlbU1vZGUgPSBQcm9ncmVtVGVtcG8uQnlMaW5lO1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRGVmYXVsdENvbmZpZygpOiBQcm9ncmVtQ29uZmlnIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9ncmVtQ29uZmlnKCdTYW5zIHRpdHJlJywgMTcsIDE3LCAxKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gY3VycmVudFNjaGVkdWxlcigpOiBQcm9ncmVtU2NoZWR1bGVyIHtcbiAgICAgICAgcmV0dXJuIHNjaGVkdWxlcjtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtR3JpZENvbXBvbmVudChzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZzogUHJvZ3JlbUNvbmZpZywgY29udGFpbmVyOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGxldCBwcm9ncmVtR3JpZENvbXBvbmVudCA9IG5ldyBQcm9ncmVtR3JpZENvbXBvbmVudChzY3JlZW5Db25maWcsIHByb2dyZW1Db25maWcsIHNjaGVkdWxlciwgZG9jdW1lbnQpO1xuICAgICAgICBsZXQgcHJvZ3JlbUdyaWRIdG1sID0gcHJvZ3JlbUdyaWRDb21wb25lbnQucmVuZGVySHRtbCgpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocHJvZ3JlbUdyaWRIdG1sKTtcblxuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQocHJvZ3JlbUNvZGU6IFByb2dyZW1Db2RlPGFueT4sIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBsZXQgcHJvZ3JlbUNvdXBsZXQgPSBwcm9ncmVtQ29kZS5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk7XG4gICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9yRGVjb3JhdG9ycyA9IG5ldyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uPEJhc2VOb2RlPihbXG4gICAgICAgICAgICBuZXcgUGFkVmVyc2VEZWNvcmF0b3IoKSxcbiAgICAgICAgICAgIG5ldyBDb2xvclZlcnNlVmFyaWFibGVEZWNvcmF0b3IoKSxcbiAgICAgICAgICAgIC8vbmV3IEhpZ2hsaWdodEV4ZWN1dGluZ1ZlcnNlRGVjb3JhdG9yKHNjaGVkdWxlciksXG4gICAgICAgIF0pO1xuICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3RvckZhY3RvcnkgPSBuZXcgRXNwcmltYVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeShwcm9ncmVtQ291cGxldCwgcHJvZ3JlbUluc3BlY3RvckRlY29yYXRvcnMpO1xuICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3RvclZpZXcgPSBuZXcgUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudChzY2hlZHVsZXIsIHByb2dyZW1JbnNwZWN0b3JGYWN0b3J5KTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKCdjb2RlRWxlbWVudCcsIGNvZGVFbGVtZW50KTtcbiAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JIdG1sID0gcHJvZ3JlbUluc3BlY3RvclZpZXcucmVuZGVySHRtbCgpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocHJvZ3JlbUluc3BlY3Rvckh0bWwpO1xuXG4gICAgICAgIGxldCBkZWNvcmF0b3JTdHlsZSA9IHByb2dyZW1JbnNwZWN0b3JEZWNvcmF0b3JzLmJ1aWxkU3R5bGVTaGVldCgpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdkZWNvcmF0b3JTdHlsZTonLCBkZWNvcmF0b3JTdHlsZSlcbiAgICAgICAgSHRtbEhlbHBlci5kZWZpbmVDc3NSdWxlcygncHJvZ3JlbS1pbnNwZWN0b3ItY29tcG9uZW50JywgZGVjb3JhdG9yU3R5bGUpO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFZhcmlhYmxlU2NvcGVDb21wb25lbnQocHJvZ3JlbUNvZGU6IFByb2dyZW1Db2RlPGFueT4sIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBsZXQgcHJvZ3JlbUNvdXBsZXQgPSBwcm9ncmVtQ29kZS5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk7XG4gICAgICAgIGxldCB2YXJpYWJsZVNjb3BlRGVjb3JhdG9ycyA9IG5ldyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uPHN0cmluZz4oW1xuICAgICAgICAgICAgbmV3IENvbG9yVmFyaWFibGVTY29wZURlY29yYXRvcigpXG4gICAgICAgIF0pXG4gICAgICAgIGxldCBodG1sRmFjdG9yeSA9IG5ldyBFc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5KHByb2dyZW1Db3VwbGV0LCB2YXJpYWJsZVNjb3BlRGVjb3JhdG9ycywgc2NoZWR1bGVyKTtcbiAgICAgICAgbGV0IHZhcmlhYmxlU2NvcGVDb21wb25lbnQgPSBuZXcgVmFyaWFibGVTY29wZUNvbXBvbmVudChzY2hlZHVsZXIsIGh0bWxGYWN0b3J5KTtcbiAgICAgICAgbGV0IHZhcmlhYmxlU2NvcGVIdG1sID0gdmFyaWFibGVTY29wZUNvbXBvbmVudC5yZW5kZXJIdG1sKCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh2YXJpYWJsZVNjb3BlSHRtbCk7XG5cbiAgICAgICAgbGV0IGRlY29yYXRvclN0eWxlID0gdmFyaWFibGVTY29wZURlY29yYXRvcnMuYnVpbGRTdHlsZVNoZWV0KCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2RlY29yYXRvclN0eWxlOicsIGRlY29yYXRvclN0eWxlKVxuICAgICAgICBIdG1sSGVscGVyLmRlZmluZUNzc1J1bGVzKCd2YXJpYWJsZS1zY29wZS1jb21wb25lbnQnLCBkZWNvcmF0b3JTdHlsZSk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJvZ3JlbUVkaXRvckNvbXBvbmVudChwcm9ncmVtQ29kZTogUHJvZ3JlbUNvZGU8YW55Piwgc2NyZWVuQ29uZmlnOiBTY3JlZW5Db25maWcpOiB2b2lkIHtcbiAgICAgICAgbGV0IHByb2dyZW1FZGl0b3JDb21wb25lbnQgPSBuZXcgUHJvZ3JlbUVkaXRvckNvbXBvbmVudCgpO1xuICAgICAgICBwcm9ncmVtRWRpdG9yQ29tcG9uZW50LmF0dGFjaChkb2N1bWVudCk7XG4gICAgICAgIHByb2dyZW1FZGl0b3JDb21wb25lbnQubG9hZFByb2dyZW0ocHJvZ3JlbUNvZGUpO1xuICAgICAgICBwcm9ncmVtRWRpdG9yQ29tcG9uZW50LmJpbmRSZWZyZXNoKGNvZGUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ25ldyBwcm9ncmVtIGNvZGU6JywgY29kZSk7XG4gICAgICAgICAgICBsZXQgcHJvZ3JlbUNvZGUgPSBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFByb2dyZW0oY29kZSk7XG5cbiAgICAgICAgICAgIGxldCBzY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZW0tc2NyaXB0LXRhZycpIGFzIEhUTUxTY3JpcHRFbGVtZW50O1xuICAgICAgICAgICAgc2NyaXB0RWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICAgICAgc2NyaXB0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwcm9ncmVtLXNjcmlwdC10YWcnKVxuICAgICAgICAgICAgc2NyaXB0RWxlbWVudC50ZXh0ID0gY29kZTtcbiAgICAgICAgICAgIGxldCBib2R5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgICAgICAgIGlmIChib2R5RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGJvZHlFbGVtZW50LmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnVpbGRQcm9ncmVtVmlld2VyKHByb2dyZW1Db2RlLCBzY3JlZW5Db25maWcsIGJ1aWxkRGVmYXVsdENvbmZpZygpKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtVmlld2VyKHByb2dyZW1Db2RlOiBQcm9ncmVtQ29kZTxhbnk+LCBzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZzogUHJvZ3JlbUNvbmZpZykge1xuICAgICAgICAvLyBMb2FkIGluaXRQcm9ncmVtIEZ1bmN0aW9uIGNvZGVcbiAgICAgICAgbGV0IGluaXRQcm9ncmVtRnVuY3Rpb25Db2RlID0gZXNjb2RlR2VuZXJhdGUocHJvZ3JlbUNvZGUuaW5pdGlhbGlzZXJQcm9ncmVtRnVuY3Rpb24oKS5mdW5jdGlvblJvb3ROb2RlKTtcbiAgICAgICAgKHdpbmRvdyBhcyBhbnkpLmV2YWwoaW5pdFByb2dyZW1GdW5jdGlvbkNvZGUpO1xuXG4gICAgICAgIHNjaGVkdWxlciA9IFNjaGVkdWxpbmdTZXJ2aWNlLmJ1aWxkUHJvZ3JlbVNjaGVkdWxlcihwcm9ncmVtQ29uZmlnLCBwcm9ncmVtQ29kZSwgcHJvZ3JlbU1vZGUpO1xuICAgICAgICBjb25zdCB0aXRyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aXRyZScpO1xuICAgICAgICBpZiAodGl0cmUpIHtcbiAgICAgICAgICAgIHRpdHJlLmlubmVySFRNTCA9IHByb2dyZW1Db25maWcudGl0cmU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvZ3JlbUdyaWRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignLnByb2dyZW0tZ3JpZC1jb21wb25lbnQnKTtcbiAgICAgICAgaWYgKHByb2dyZW1HcmlkQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBidWlsZFByb2dyZW1HcmlkQ29tcG9uZW50KHNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZywgcHJvZ3JlbUdyaWRDb250YWluZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignLnByb2dyZW0taW5zcGVjdG9yLWNvbXBvbmVudCcpO1xuICAgICAgICBpZiAocHJvZ3JlbUluc3BlY3RvckNvbnRhaW5lcikge1xuICAgICAgICAgICAgYnVpbGRQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50KHByb2dyZW1Db2RlLCBwcm9ncmVtSW5zcGVjdG9yQ29udGFpbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2YXJpYWJsZVNjb3BlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJy52YXJpYWJsZS1zY29wZS1jb21wb25lbnQnKTtcbiAgICAgICAgaWYgKHZhcmlhYmxlU2NvcGVDb250YWluZXIpIHtcbiAgICAgICAgICAgIGJ1aWxkVmFyaWFibGVTY29wZUNvbXBvbmVudChwcm9ncmVtQ29kZSwgdmFyaWFibGVTY29wZUNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRDb250cm9sUGFuZWxDb21wb25lbnQoKSB7XG4gICAgICAgIGxldCBzcGVlZENvbnRyb2xFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNvbnRyb2wtcGFuZWwtY29tcG9uZW50IC5zcGVlZC1zZWxlY3RvcmApYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgc3BlZWRDb250cm9sRWxlbWVudC52YWx1ZSA9IFN0cmluZyhwcm9ncmVtQW5pbWF0aW9uU3BlZWQpO1xuICAgICAgICBsZXQgc3BlZWRTZWxlY3Rvck9ic2VydmFibGUgPSBPYnNlcnZhYmxlLmZyb21FdmVudChzcGVlZENvbnRyb2xFbGVtZW50LCAnY2hhbmdlJyk7XG4gICAgICAgIHNwZWVkU2VsZWN0b3JPYnNlcnZhYmxlLnN1YnNjcmliZShldmVudCA9PiBwcm9ncmVtQW5pbWF0aW9uU3BlZWQgPSBOdW1iZXIoKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSkpO1xuXG4gICAgICAgIGxldCBtb2RlQ29udHJvbEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29udHJvbC1wYW5lbC1jb21wb25lbnQgLm1vZGUtc2VsZWN0b3JgKWFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIG1vZGVDb250cm9sRWxlbWVudC52YWx1ZSA9IFN0cmluZyhzY2hlZHVsZXIudGVtcG8pO1xuICAgICAgICBsZXQgbW9kZVNlbGVjdG9yT2JzZXJ2YWJsZSA9IE9ic2VydmFibGUuZnJvbUV2ZW50KG1vZGVDb250cm9sRWxlbWVudCwgJ2NoYW5nZScpO1xuICAgICAgICBtb2RlU2VsZWN0b3JPYnNlcnZhYmxlLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICBwcm9ncmVtTW9kZSA9IE51bWJlcigoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcbiAgICAgICAgICAgIGN1cnJlbnRTY2hlZHVsZXIoKS50ZW1wbyA9IHByb2dyZW1Nb2RlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtKHVybDogc3RyaW5nLCBzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZykge1xuICAgICAgICBsZXQgcHJvZ3JlbUNvbmZpZyA9IGJ1aWxkRGVmYXVsdENvbmZpZygpO1xuICAgICAgICBsZXQgcHJvZ3JlbVNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBwcm9ncmVtU2NyaXB0LmNsYXNzTGlzdC5hZGQoJ3Byb2dyZW0tc2NyaXB0LXRhZycpXG4gICAgICAgIHByb2dyZW1TY3JpcHQuc3JjID0gdXJsO1xuICAgICAgICBsZXQgYm9keUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICAgIGlmIChib2R5RWxlbWVudCkge1xuICAgICAgICAgICAgYm9keUVsZW1lbnQuYXBwZW5kQ2hpbGQocHJvZ3JlbVNjcmlwdCk7XG4gICAgICAgIH1cblxuICAgICAgICBDb2RlU2VydmljZS5sb2FkUHJvZ3JlbSh1cmwpLnRoZW4oY29kZSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJvZ3JlbUNvZGUgPSBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFByb2dyZW0oY29kZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJ1aWxkUHJvZ3JlbVZpZXdlcihwcm9ncmVtQ29kZSwgc2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnKTtcblxuICAgICAgICAgICAgYnVpbGRDb250cm9sUGFuZWxDb21wb25lbnQoKTtcblxuICAgICAgICAgICAgYnVpbGRQcm9ncmVtRWRpdG9yQ29tcG9uZW50KHByb2dyZW1Db2RlLCBzY3JlZW5Db25maWcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aW1lcigwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGltZXIodGltZXN0YW1wOiBudW1iZXIpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aW1lcik7XG5cbiAgICAgICAgaWYgKHRpbWVzdGFtcCAtIHByZXZpb3VzUmVwYWludFRpbWUgPCBwcm9ncmVtQW5pbWF0aW9uSW50ZXJ2YWxzW3Byb2dyZW1BbmltYXRpb25TcGVlZF0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZpb3VzUmVwYWludFRpbWUgPSB0aW1lc3RhbXA7XG5cbiAgICAgICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgICAgICAgc2NoZWR1bGVyLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCB7IFN0eWxlRGVjb3JhdG9yLCBQcm9ncmVtU2NoZWR1bGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IEJhc2VOb2RlLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBCbG9ja1N0YXRlbWVudCwgSWZTdGF0ZW1lbnQsIFZhcmlhYmxlRGVjbGFyYXRvciwgVmFyaWFibGVEZWNsYXJhdGlvbiwgQXNzaWdubWVudEV4cHJlc3Npb24sIEJpbmFyeUV4cHJlc3Npb24sIEV4cHJlc3Npb25TdGF0ZW1lbnQsIFJldHVyblN0YXRlbWVudCwgSWRlbnRpZmllciwgTWVtYmVyRXhwcmVzc2lvbiB9IGZyb20gXCJlc3RyZWVcIjtcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9IdG1sSGVscGVyXCI7XG5pbXBvcnQgeyBFc3ByaW1hSGVscGVyIH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYUhlbHBlclwiO1xuaW1wb3J0IHsgRXNwcmltYVZlcnNlLCBFc3ByaW1hSHRtbENvdXBsZXRGYWN0b3J5LCBFc3ByaW1hQ291cGxldCB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFUeXBlc1wiO1xuaW1wb3J0IHsgc3RyaW5naWZ5IH0gZnJvbSBcInF1ZXJ5c3RyaW5nXCI7XG5cbmV4cG9ydCBjbGFzcyBFc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5IGltcGxlbWVudHMgRXNwcmltYUh0bWxDb3VwbGV0RmFjdG9yeSB7XG5cbiAgICBwcml2YXRlIHZhckhpbnRCeVZlcnNlc01hcDogTWFwPEJhc2VOb2RlLCBIVE1MRWxlbWVudFtdPiA9IG5ldyBNYXAoKTtcbiAgICBwcml2YXRlIHZhckhpbnRVcGRhdGVyTWFwOiBNYXA8QmFzZU5vZGUsICh2YWx1ZTogYW55KSA9PiB2b2lkPiA9IG5ldyBNYXAoKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvdXBsZXQ6IEVzcHJpbWFDb3VwbGV0LFxuICAgICAgICBwcml2YXRlIGRlY29yYXRvcjogU3R5bGVEZWNvcmF0b3I8c3RyaW5nPixcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXJcbiAgICApIHt9XG5cbiAgICBidWlsZENvdXBsZXQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS1zY29wZS1jb21wb25lbnQnKVxuXG4gICAgICAgIC8vIEZJWE1FIGlsIGZhdWRyYWl0IHBhcmNvdXJpciBsJ2FyYnJlIEFTVCBhdmVjIHVuIHdhbGtlciBvdSB1biB0cnVjIGR1IGdlbnJlLlxuICAgICAgICAvLyBGSVhNRSBncm9zIGhhY2sgZHUgc3lzdMOobWUgZGUgSHRtbEZhY3RvcnkgZXQgZGUgRGVjb3JhdG9yIHBvdXIgcmVhbGlzZXIgY2UgY29tcG9zYW50LlxuICAgICAgICAvLyBCdWlsZCBhbGwgVmFyaWFibGVIaW50IHdoaWNoIHdpbGwgYmUgYWRkZWQgaW4gdmlldyBjb250YWluZXIgb25lIGJ5IG9uZSBieSBnZXRIdG1sVmVyc2UoKVxuICAgICAgICB0aGlzLmNvdXBsZXQudmVyc2VzLmZvckVhY2godiA9PiB7XG4gICAgICAgICAgICBsZXQgdmFySGludHMgPSB0aGlzLmJ1aWxkVmFyaWFibGVIaW50cyh2Lm5vZGUpO1xuICAgICAgICAgICAgbGV0IGRlY29yYXRlZFZhckhpbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgICAgICAgICB2YXJIaW50cy5mb3JFYWNoKCh2YXJIaW50LCB2YXJOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGRlY29yYXRlZCA9IHRoaXMuZGVjb3JhdG9yLmRlY29yYXRlKHZhck5hbWUsIHZhckhpbnQpO1xuICAgICAgICAgICAgICAgIGRlY29yYXRlZFZhckhpbnRzLnB1c2goZGVjb3JhdGVkKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGVjb3JhdGVkKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLnZhckhpbnRCeVZlcnNlc01hcC5zZXQodi5ub2RlLCBkZWNvcmF0ZWRWYXJIaW50cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2xlYXJWaWV3KCk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9ICAgIFxuICAgIFxuICAgIGdldEh0bWxWZXJzZSh2ZXJzZTogRXNwcmltYVZlcnNlKTogSFRNTEVsZW1lbnR8dW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRoaXMudmFySGludEJ5VmVyc2VzTWFwLnNpemUgPT09IDAgfHwgIXZlcnNlLm5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodG1sRWxlbWVudHMgPSB0aGlzLnZhckhpbnRCeVZlcnNlc01hcC5nZXQodmVyc2Uubm9kZSk7XG4gICAgICAgIGlmICghaHRtbEVsZW1lbnRzIHx8IGh0bWxFbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuc2NoZWR1bGVyLmN1cnJlbnQoKTtcbiAgICAgICAgbGV0IHZhbHVlc01hcCA9IEVzcHJpbWFIZWxwZXIuZ2V0VmFyaWFibGVWYWx1ZXMoc3RhdGUsIHZlcnNlLm5vZGUpO1xuICAgICAgICBsZXQgdmFySGludFVwZGF0ZXIgPSB0aGlzLnZhckhpbnRVcGRhdGVyTWFwLmdldCh2ZXJzZS5ub2RlKTtcbiAgICAgICAgaWYgKHZhckhpbnRVcGRhdGVyKSB7XG4gICAgICAgICAgICB2YXJIaW50VXBkYXRlcih2YWx1ZXNNYXApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBTaG93IGVsZW1lbnRzXG4gICAgICAgIGh0bWxFbGVtZW50cy5mb3JFYWNoKGhpbnQgPT4gaGludC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKSk7XG5cbiAgICAgICAgLy9sZXQgdmVyc2VDb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3ZlcnNlLWNvbnRhaW5lcicsIGh0bWxFbGVtZW50cyk7XG4gICAgICAgIC8vcmV0dXJuIHZlcnNlQ29udGFpbmVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhclZpZXcoKTogdm9pZCB7XG4gICAgICAgIC8vIEhpZGUgZWxlbWVudHNcbiAgICAgICAgdGhpcy52YXJIaW50QnlWZXJzZXNNYXAuZm9yRWFjaChoaW50cyA9PiBoaW50cy5mb3JFYWNoKGhpbnQgPT4gaGludC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKSkpO1xuICAgICAgICAvLyBSZXNldCB2YWx1ZVxuICAgICAgICB0aGlzLnZhckhpbnRVcGRhdGVyTWFwLmZvckVhY2goKHZhckhpbnRVcGRhdGVyLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHZhckhpbnRVcGRhdGVyKG5ldyBNYXAoKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkIGEgVmFyaWFibGUgSGludCBpZiB0aGUgc3VwcGxpZWQgbm9kZSBjb250YWlucyBhIFZhcmlhYmxlIGFmZmVjdGF0aW9uLlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHJldHVybnMgYW4gSFRNTEVsZW1lbnQgb3IgbnVsbCBpZiBubyBoaW50IHNob3VsZCBhcHBlYXIgZm9yIHRoaXMgbm9kZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBidWlsZFZhcmlhYmxlSGludHMobm9kZTogQmFzZU5vZGUpOiBNYXA8c3RyaW5nLCBIVE1MRWxlbWVudD4ge1xuICAgICAgICBsZXQgdmFyTm9kZSA9IEVzcHJpbWFIZWxwZXIucmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24obm9kZSk7XG4gICAgICAgIGlmICghdmFyTm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNYXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2YXJOYW1lcyA9IEVzcHJpbWFIZWxwZXIuZ2V0VmFyaWFibGVOYW1lcyh2YXJOb2RlKTtcbiAgICAgICAgbGV0IHZhckhpbnRzID0gdmFyTmFtZXMubWFwKHZhck5hbWUgPT4ge1xuICAgICAgICAgICAgbGV0IHZhclZhbHVlID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS1oaW50LXZhbHVlJyk7XG4gICAgICAgICAgICBsZXQgdmFySGludCA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtaGludCcsIFtgJHt2YXJOYW1lfTogYCwgdmFyVmFsdWVdKTtcbiAgICAgICAgICAgIHJldHVybiB7dmFyTmFtZSwgdmFySGludCwgdmFyVmFsdWV9O1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdmFsVXBkYXRlciA9ICh2YWxzQnlWYXJOYW1lOiBNYXA8c3RyaW5nLCBhbnk+KSA9PiB7XG4gICAgICAgICAgICB2YXJIaW50cy5mb3JFYWNoKHZhckhpbnQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YWwgPSB2YWxzQnlWYXJOYW1lLmdldCh2YXJIaW50LnZhck5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICB2YXJIaW50LnZhclZhbHVlLmlubmVyVGV4dCA9IHZhbC50b0ZpeGVkKDIpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFySGludC52YXJWYWx1ZS5pbm5lclRleHQgPSB2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudmFySGludFVwZGF0ZXJNYXAuc2V0KG5vZGUsIHZhbFVwZGF0ZXIpO1xuXG4gICAgICAgIGxldCB2YXJIaW50c0J5TmFtZSA9IG5ldyBNYXA8c3RyaW5nLCBIVE1MRWxlbWVudD4oKTtcbiAgICAgICAgdmFySGludHMuZm9yRWFjaCh2YXJIaW50ID0+IHZhckhpbnRzQnlOYW1lLnNldCh2YXJIaW50LnZhck5hbWUsIHZhckhpbnQudmFySGludCkpO1xuXG4gICAgICAgIHJldHVybiB2YXJIaW50c0J5TmFtZTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBFdmFsU2NvcGUgfSBmcm9tIFwiLi9FdmFsU2VydmljZVwiO1xuXG5leHBvcnQgY2xhc3MgUHJvZ3JlbUNvbmZpZyB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB0aXRyZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgbm9tYnJlQ29sb25uZXM6IG51bWJlcixcbiAgICAgICAgcHVibGljIG5vbWJyZUxpZ25lczogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgbm9tYnJlRnJhbWVzOiBudW1iZXIsXG4gICAgKSB7IH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+IHtcbiAgICBub2RlOiBBc3RCYXNlVHlwZVxuICAgIGNvZGU6IEFzdEJhc2VUeXBlXG59XG4vKlxuZXhwb3J0IGludGVyZmFjZSBWZXJzZUluc3RydWN0aW9uRmFjdG9yeTxBc3RCYXNlVHlwZT4ge1xuICAgIGJ1aWxkKHBhcmFtOiBBc3RCYXNlVHlwZSk6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT47XG59XG4qL1xuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtQ291cGxldDxBc3RCYXNlVHlwZT4ge1xuICAgIGZ1bmN0aW9uUm9vdE5vZGU6IEFzdEJhc2VUeXBlXG4gICAgdmVyc2VzOiBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+W11cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtRmFjdG9yeTxBc3RCYXNlVHlwZT4ge1xuICAgIGJ1aWxkUHJvZ3JlbShjb2RlOiBzdHJpbmcpOiBQcm9ncmVtQ29kZTxBc3RCYXNlVHlwZT5cbiAgICBidWlsZENvdXBsZXQobm9kZTogQXN0QmFzZVR5cGUsIHZlcnNlczogQXN0QmFzZVR5cGVbXSk6IFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPlxuICAgIGJ1aWxkVmVyc2Uobm9kZTogQXN0QmFzZVR5cGUpOiBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmVyc2VJdGVyYXRvcjxBc3RCYXNlVHlwZT4ge1xuICAgIGV4ZWN1dGVOZXh0KCk6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT5cbiAgICBoYXNOZXh0KCk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbUNvZGU8QXN0QmFzZVR5cGU+IHtcbiAgICBpbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpOiBQcm9ncmVtQ291cGxldDxBc3RCYXNlVHlwZT5cbiAgICBjb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk6IFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPlxuICAgIGl0ZXJhdG9yKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiBWZXJzZUl0ZXJhdG9yPEFzdEJhc2VUeXBlPlxufVxuXG5leHBvcnQgY2xhc3MgUHJvZ3JlbVN0YXRlIHtcblxuICAgIHB1YmxpYyByZWFkb25seSBldmFsU2NvcGUgPSBuZXcgRXZhbFNjb3BlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjb2xvbm5lOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBsaWduZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZnJhbWU6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvbnRleHRlOiBvYmplY3QsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB2ZXJzZTogUHJvZ3JlbVZlcnNlPGFueT4gfCBudWxsLFxuICAgICkge31cblxuICAgIHB1YmxpYyBldmFsKGV4cHI6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2YWxTY29wZS5nbG9iYWxFdmFsKGV4cHIpO1xuICAgIH1cbn1cblxudHlwZSBOZXdTdGF0ZUNhbGxiYWNrID0gKHN0YXRlOiBQcm9ncmVtU3RhdGUpID0+IHZvaWQ7XG5leHBvcnQgaW50ZXJmYWNlIFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyIHtmaXJlU3RhcnRJdGVyYXRpbmdDb2RlOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyIHtmaXJlQ29kZUV4ZWN1dGlvbjogTmV3U3RhdGVDYWxsYmFja307XG5leHBvcnQgaW50ZXJmYWNlIEdyaWRDaGFuZ2VMaXN0ZW5lciB7ZmlyZUdyaWRDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBMaW5lQ2hhbmdlTGlzdGVuZXIge2ZpcmVMaW5lQ2hhbmdlOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgRnJhbWVDaGFuZ2VMaXN0ZW5lciB7ZmlyZUZyYW1lQ2hhbmdlOiBOZXdTdGF0ZUNhbGxiYWNrfTtcblxuZXhwb3J0IGVudW0gUHJvZ3JlbVRlbXBvIHtcbiAgICBCeVZlcnNlID0gMCxcbiAgICBCeVBpeGVsLFxuICAgIEJ5TGluZSxcbiAgICBCeUZyYW1lXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbVNjaGVkdWxlciB7XG4gICAgc3Vic2NyaWJlU3RhcnRJdGVyYXRpbmdDb2RlKGxpc3RlbmVyOiBTdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVDb2RlRXhlY3V0aW9uKGxpc3RlbmVyOiBDb2RlRXhlY3V0aW9uTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlR3JpZENoYW5nZShsaXN0ZW5lcjogR3JpZENoYW5nZUxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUxpbmVDaGFuZ2UobGlzdGVuZXI6IExpbmVDaGFuZ2VMaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVGcmFtZUNoYW5nZShsaXN0ZW5lcjogRnJhbWVDaGFuZ2VMaXN0ZW5lcik6IHZvaWRcbiAgICByZXNldCgpOiBQcm9ncmVtU3RhdGVcbiAgICBjdXJyZW50KCk6IFByb2dyZW1TdGF0ZVxuICAgIG5leHQoKTogUHJvZ3JlbVN0YXRlW11cbiAgICBnZXRQcm9ncmVtKCk6IFByb2dyZW1Db2RlPGFueT5cbiAgICB0ZW1wbzogUHJvZ3JlbVRlbXBvXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbUNvbXBvbmVudCB7XG4gICAgcmVuZGVySHRtbCgpOiBIVE1MRWxlbWVudFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0eWxlRGVjb3JhdG9yPFQ+IHtcbiAgICBkZWNvcmF0ZShub2RlOiBULCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50XG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEh0bWxDb3VwbGV0RmFjdG9yeTxBc3RCYXNlVHlwZT4ge1xuICAgIGJ1aWxkQ291cGxldCgpOiBIVE1MRWxlbWVudFxuICAgIGdldEh0bWxWZXJzZSh2ZXJzZTogUHJvZ3JlbVZlcnNlPEFzdEJhc2VUeXBlPik6IEhUTUxFbGVtZW50fHVuZGVmaW5lZFxufVxuXG5leHBvcnQgY2xhc3MgU3R5bGVEZWNvcmF0b3JBZ2dyZWdhdGlvbjxUPiBpbXBsZW1lbnRzIFN0eWxlRGVjb3JhdG9yPFQ+IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjb3JhdG9yczogU3R5bGVEZWNvcmF0b3I8VD5bXSkge31cblxuICAgIGRlY29yYXRlKG5vZGU6IFQsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgdGVtcDogSFRNTEVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmRlY29yYXRvcnMuZm9yRWFjaChkID0+IHRlbXAgPSBkLmRlY29yYXRlKG5vZGUsIHRlbXApKTtcbiAgICAgICAgcmV0dXJuIHRlbXA7XG4gICAgfVxuXG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29yYXRvcnMubWFwKGQgPT4gZC5idWlsZFN0eWxlU2hlZXQoKSkuam9pbignXFxuJyk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29sb3JQcm92aWRlciB7XG4gICAgaHNsQ29sb3IoaHVlOiBudW1iZXIpOiBzdHJpbmc7XG4gICAgaGFzaFN0cmluZ1RvQ29sb3Ioa2V5OiBzdHJpbmcsIGNvbG9yQ291bnQ6IG51bWJlciwgc2hpZnQ/OiBudW1iZXIpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29sb3JQcm92aWRlckZhY3Rvcnkge1xuICAgIGJ1aWxkKGtleT86IHN0cmluZyk6IENvbG9yUHJvdmlkZXI7XG59IiwiaW1wb3J0IHsgUHJvZ3JlbUZhY3RvcnkgfSBmcm9tIFwiLi9UeXBlc1wiO1xuaW1wb3J0IHsgQmFzaWNFc3ByaW1hUHJvZ3JlbUZhY3RvcnkgfSBmcm9tIFwiLi4vZXNwcmltYS9CYXNpY0VzcHJpbWFQcm9ncmVtXCI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29kZVNlcnZpY2Uge1xuXG4gICAgZXhwb3J0IGNvbnN0IHByb2dyZW1GYWN0b3J5OiBQcm9ncmVtRmFjdG9yeTxhbnk+ID0gbmV3IEJhc2ljRXNwcmltYVByb2dyZW1GYWN0b3J5KCk7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gbG9hZFByb2dyZW0oZmlsZVVybDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsaWVudCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgY2xpZW50Lm9wZW4oJ0dFVCcsIGZpbGVVcmwpO1xuICAgICAgICAgICAgY2xpZW50Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29kZSA9IGNsaWVudC5yZXNwb25zZVRleHQ7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29kZVNlcnZpY2U6IFByb2dyZW0gbG9hZGVkIHN1Y2Nlc3NmdWxseS4nLCBjb2RlKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGNvZGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNsaWVudC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KGNsaWVudC5zdGF0dXNUZXh0KTtcbiAgICAgICAgICAgIGNsaWVudC5zZW5kKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSIsIlxuZXhwb3J0IGNsYXNzIFNjcmVlbkNvbmZpZyB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBib3hTaXplOiBudW1iZXJcbiAgICApIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBTY3JlZW5TZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBnZXRTY3JlZW5GcmFtZSgpOiBhbnkge1xuXG4gICAgfVxuXG59IiwiaW1wb3J0IHsgUGF0dGVybiwgSWRlbnRpZmllciwgQmFzZU5vZGUsIFZhcmlhYmxlRGVjbGFyYXRpb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBOb2RlIH0gZnJvbSBcImVzdHJlZVwiO1xuaW1wb3J0IHsgUHJvZ3JlbVN0YXRlIH0gZnJvbSBcIi4uL2NvcmUvVHlwZXNcIjtcblxuZXhwb3J0IHR5cGUgTm9kZVdpdGhQYXJlbnQgPSBOb2RlICYgeyBwYXJlbnQ/OiBOb2RlIH07XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFc3ByaW1hSGVscGVyIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgcGF0dGVyblRvU3RyaW5nKHBhdHRlcm46IFBhdHRlcm4pOiBzdHJpbmcge1xuICAgICAgICB2YXIgbm9kZTtcbiAgICAgICAgc3dpdGNoIChwYXR0ZXJuLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0lkZW50aWZpZXInOlxuICAgICAgICAgICAgICAgIG5vZGUgPSBwYXR0ZXJuIGFzIElkZW50aWZpZXI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUubmFtZTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGNvbnZlcnQgcGF0dGVybiBvZiB0eXBlICcgKyBwYXR0ZXJuLnR5cGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24obm9kZTogQmFzZU5vZGUpOiBWYXJpYWJsZURlY2xhcmF0aW9uIHwgQXNzaWdubWVudEV4cHJlc3Npb24gfCBGdW5jdGlvbkRlY2xhcmF0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgbGV0IGRlY2wgPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gZGVjbDtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgIGxldCBleHByID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgICAgIHJldHVybiBleHByO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBmdW5jO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHAgPT09ICdsZWZ0JyB8fCBwID09PSAncmlnaHQnIHx8IHAgPT09ICdhcmd1bWVudCcgfHwgcCA9PT0gJ2NhbGxlZScgfHwgcCA9PT0gJ2JvZHknIHx8IHAgPT09ICdleHByZXNzaW9uJykge1xuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkOiBCYXNlTm9kZSA9IG5vZGVbcF0gYXMgQmFzZU5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBFc3ByaW1hSGVscGVyLnJlZHVjZU5vZGVUb1ZhckRlY2xhcmF0aW9uKGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdmFyaWFibGUgbmFtZXMgb2YgZGVjbGFyYXRpb24gb3IgYXNzaWdubWVudCBjb250YWluZWQgaW4gbm9kZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbm9kZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFZhcmlhYmxlTmFtZXMobm9kZTogVmFyaWFibGVEZWNsYXJhdGlvbiB8IEFzc2lnbm1lbnRFeHByZXNzaW9uIHwgRnVuY3Rpb25EZWNsYXJhdGlvbik6IHN0cmluZ1tdIHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICBsZXQgZGVjbCA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBkZWNsLmRlY2xhcmF0aW9ucy5tYXAoZCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBFc3ByaW1hSGVscGVyLnBhdHRlcm5Ub1N0cmluZyhkLmlkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJykge1xuICAgICAgICAgICAgbGV0IGRlY2wgPSBub2RlIGFzIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBFc3ByaW1hSGVscGVyLnBhdHRlcm5Ub1N0cmluZyhkZWNsLmxlZnQpO1xuICAgICAgICAgICAgcmV0dXJuIFt2YXJOYW1lXTtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdGdW5jdGlvbkRlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgbGV0IGZ1bmMgPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gZnVuYy5wYXJhbXMubWFwKHAgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YXJOYW1lID0gRXNwcmltYUhlbHBlci5wYXR0ZXJuVG9TdHJpbmcocCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhck5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHZhcmlhYmxlIHZhbHVlcyBvZiBkZWNsYXJhdGlvbiBvciBhc3NpZ25tZW50IGNvbnRhaW5lZCBpbiBub2RlLlxuICAgICAqIFNhbWUgYXMgZ2V0VmFyaWFibGVOYW1lcyBidXQgZXZhbHVhdGUgdmFyaWFibGVzIHRvIGRpc2NvdmVyIHRoZWlyIHZhbHVlcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbm9kZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFZhcmlhYmxlVmFsdWVzKHN0YXRlOiBQcm9ncmVtU3RhdGUsIG5vZGU6IEJhc2VOb2RlKTogTWFwPHN0cmluZywgYW55PiB7XG4gICAgICAgIGxldCB2YWx1ZXNNYXAgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICBsZXQgdmFyTm9kZXMgPSB0aGlzLnJlZHVjZU5vZGVUb1ZhckRlY2xhcmF0aW9uKG5vZGUpO1xuICAgICAgICBpZiAoIXZhck5vZGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzTWFwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0VmFyaWFibGVOYW1lcyh2YXJOb2RlcykubWFwKHZhck5hbWUgPT4gdmFsdWVzTWFwLnNldCh2YXJOYW1lLCBzdGF0ZS5ldmFsKHZhck5hbWUpKSk7XG4gICAgICAgIHJldHVybiB2YWx1ZXNNYXA7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpc0NoaWxkTm9kZU9mKG5vZGU6IE5vZGVXaXRoUGFyZW50LCBwYXJlbnQ6IEJhc2VOb2RlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChub2RlLnBhcmVudCA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICghbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBFc3ByaW1hSGVscGVyLmlzQ2hpbGROb2RlT2Yobm9kZS5wYXJlbnQgYXMgTm9kZVdpdGhQYXJlbnQsIHBhcmVudCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpc05vdENoaWxkTm9kZU9mKG5vZGU6IE5vZGVXaXRoUGFyZW50LCBwYXJlbnRzOiBCYXNlTm9kZVtdKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChwYXJlbnRzLmZpbmQocCA9PiBwID09PSBub2RlLnBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICghbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEVzcHJpbWFIZWxwZXIuaXNOb3RDaGlsZE5vZGVPZihub2RlLnBhcmVudCBhcyBOb2RlV2l0aFBhcmVudCwgcGFyZW50cyk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgQ29sb3JQcm92aWRlciwgQ29sb3JQcm92aWRlckZhY3RvcnkgfSBmcm9tIFwiLi9UeXBlc1wiO1xuaW1wb3J0IHsgY3JlYXRlIGFzIG1kNUNyZWF0ZSB9IGZyb20gJ2pzLW1kNSc7XG5cbmV4cG9ydCBjbGFzcyBCYXNpY0NvbG9yUHJvdmlkZXJGYWN0b3J5IGltcGxlbWVudHMgQ29sb3JQcm92aWRlckZhY3Rvcnkge1xuICAgIGJ1aWxkKGtleT86IHN0cmluZyk6IENvbG9yUHJvdmlkZXIge1xuICAgICAgICByZXR1cm4gbmV3IEJhc2ljQ29sb3JQcm92aWRlcigpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljQ29sb3JQcm92aWRlciBpbXBsZW1lbnRzIENvbG9yUHJvdmlkZXIge1xuXG4gICAgcHJpdmF0ZSBjb2xvck1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKTtcblxuICAgIHB1YmxpYyBoc2xDb2xvcihodWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnaHNsKCcgKyBodWUgKyAnLCAxMDAlLCA4MCUpJztcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFzaFN0cmluZ1RvQ29sb3Ioa2V5OiBzdHJpbmcsIGNvbG9yQ291bnQ6IG51bWJlciwgc2hpZnQ6IG51bWJlciA9IDIpIHtcbiAgICAgICAgdmFyIGh1ZSA9IHRoaXMuY29sb3JNYXAuZ2V0KGtleSk7XG4gICAgICAgIGlmIChodWUpIHJldHVybiB0aGlzLmhzbENvbG9yKGh1ZSk7XG5cbiAgICAgICAgdmFyIGhhc2ggPSBtZDVDcmVhdGUoKS51cGRhdGUoa2V5KS50b1N0cmluZygpO1xuICAgICAgICBcbiAgICAgICAgaHVlID0gKCBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDAsIHNoaWZ0ICsgMSksIDE2KSArIDE2ICogcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAxLCBzaGlmdCArIDIpLCAxNikgKyAyNTYgKiBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDIsIHNoaWZ0ICsgMyksIDE2KSApO1xuICAgICAgICBodWUgPSBNYXRoLmZsb29yKGh1ZSAlIGNvbG9yQ291bnQpICogMzYwIC8gY29sb3JDb3VudDtcbiAgICAgICAgaHVlID0gaHVlICUgMzYwO1xuXG4gICAgICAgIC8vIENvbG9yIGRlZHVwbGljYXRpb25cbiAgICAgICAgd2hpbGUgKCF0aGlzLmNvbG9yTWFwLmdldChrZXkpKSB7XG4gICAgICAgICAgICBsZXQgZHVwbGljYXRlQ29sb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGMgb2YgdGhpcy5jb2xvck1hcC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhjIC0gaHVlKSA8IE1hdGguZmxvb3IoMTgwIC8gY29sb3JDb3VudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZHVwbGljYXRlQ29sb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBodWUgKz0gTWF0aC5mbG9vcigyNzAgLyBjb2xvckNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgaHVlID0gaHVlICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWR1cGxpY2F0ZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvck1hcC5zZXQoa2V5LCBodWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL3ZhciBwYXN0ZWwgPSAnaHNsKCcgKyBodWUgKyAnLCAxMDAlLCA4Ny41JSknO1xuICAgICAgICByZXR1cm4gdGhpcy5oc2xDb2xvcihodWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBDb2xvclNlcnZpY2Uge1xuXG4gICAgZXhwb3J0IGNvbnN0IGNvbG9yUHJvdmlkZXJhY3Rvcnk6IENvbG9yUHJvdmlkZXJGYWN0b3J5ID0gbmV3IEJhc2ljQ29sb3JQcm92aWRlckZhY3RvcnkoKTtcblxufVxuIiwiaW1wb3J0IHsgUHJvZ3JlbUNvbXBvbmVudCwgUHJvZ3JlbVNjaGVkdWxlciwgU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciwgUHJvZ3JlbVN0YXRlLCBQcm9ncmVtQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gXCIuLi8uLi9jb3JlL1NjcmVlblNlcnZpY2VcIjtcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9IdG1sSGVscGVyXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyIH0gZnJvbSBcInJ4anNcIjtcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1HcmlkQ29tcG9uZW50IGltcGxlbWVudHMgUHJvZ3JlbUNvbXBvbmVudCwgU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciB7XG4gICAgXG4gICAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgYmxpbmtJbnRlcnZhbCA9IDIwMDtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZywgXG4gICAgICAgIHByaXZhdGUgcHJvZ3JlbUNvbmZpZzogUHJvZ3JlbUNvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXIsXG4gICAgICAgIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50XG4gICAgICAgICkge1xuICAgICAgICBsZXQgZW5XYXJuaW5nID0gSHRtbEhlbHBlci5wKCd3YXJuaW5nJywgXCJZb3VyIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IGNhbnZhcy5cIik7XG4gICAgICAgIGxldCBmcldhcm5pbmcgPSBIdG1sSGVscGVyLnAoJ3dhcm5pbmcnLCBcIlZvdHJlIG5hdmlnYXRldXIgbmUgc3VwcG9ydGUgcGFzIGxlcyBjYW52YXMuXCIpO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IEh0bWxIZWxwZXIuY2FudmFzKCcnLCBbZW5XYXJuaW5nLCBmcldhcm5pbmddKTtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLnByb2dyZW1Db25maWcubm9tYnJlQ29sb25uZXMgKiB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLnByb2dyZW1Db25maWcubm9tYnJlTGlnbmVzICogdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcblxuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgaWYgKCFjdHgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIG9idGFpbiAyRCBDYW52YXMgY29udGV4dCAhJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcblxuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlU3RhcnRJdGVyYXRpbmdDb2RlKHRoaXMpO1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlR3JpZENoYW5nZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZW5kZXJIdG1sKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbigncHJvZ3JlbS1ncmlkJywgdGhpcy5jYW52YXMpO1xuXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNvbG9yQ3VycmVudFBpeGVsKHN0YXRlOiBQcm9ncmVtU3RhdGUsIGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgbGV0IGJveFNpemUgPSB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplO1xuICAgICAgICBsZXQgYyA9IHN0YXRlLmNvbG9ubmU7XG4gICAgICAgIGxldCBsID0gc3RhdGUubGlnbmU7XG5cbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KGMgKiBib3hTaXplLCBsICogYm94U2l6ZSwgYm94U2l6ZSwgYm94U2l6ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJsaW5rQ3VycmVudFBpeGVsKHN0YXRlOiBQcm9ncmVtU3RhdGUsIGluY3JlbW50OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGNvbG9yID0gJ2JsYWNrJztcbiAgICAgICAgaWYgKGluY3JlbW50ICUgMiA9PT0gMCkge1xuICAgICAgICAgICAgY29sb3IgPSAnYW50aXF1ZXdoaXRlJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbG9yQ3VycmVudFBpeGVsKHN0YXRlLCBjb2xvcik7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBmaXJlU3RhcnRJdGVyYXRpbmdDb2RlIChzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IE9ic2VydmFibGUuaW50ZXJ2YWwodGhpcy5ibGlua0ludGVydmFsLCBhbmltYXRpb25GcmFtZVNjaGVkdWxlcikuc3Vic2NyaWJlKHQgPT4ge1xuICAgICAgICAgICAgdGhpcy5ibGlua0N1cnJlbnRQaXhlbChzdGF0ZSwgdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZpcmVHcmlkQ2hhbmdlIChzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBib3hTaXplID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcbiAgICAgICAgbGV0IGMgPSBzdGF0ZS5jb2xvbm5lO1xuICAgICAgICBsZXQgbCA9IHN0YXRlLmxpZ25lO1xuICAgICAgICBsZXQgZiA9IHN0YXRlLmZyYW1lO1xuXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgbGV0IGNvdWxldXIgPSBjb2xvcmVyUHJvZ3JlbShjLCBsLCBmLCBzdGF0ZS5jb250ZXh0ZSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coYCgke2N9LCAke2x9LCAke2Z9LCAke3N0YXRlLmNvbnRleHRlfSA9PiAke2NvdWxldXJ9YCk7XG4gICAgICAgIGlmIChjb3VsZXVyKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb3VsZXVyO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoYyAqIGJveFNpemUsIGwgKiBib3hTaXplLCBib3hTaXplLCBib3hTaXplKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZSAqIHRoaXMucHJvZ3JlbUNvbmZpZy5ub21icmVDb2xvbm5lcztcbiAgICAgICAgbGV0IGhlaWdodCA9IHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemUgKiB0aGlzLnByb2dyZW1Db25maWcubm9tYnJlTGlnbmVzO1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICdhbnRpcXVld2hpdGUnO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbn0iXSwic291cmNlUm9vdCI6IiJ9