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
        let _contexte = this.state.contexte;
        this.state.eval('var colonne = ' + _colonne + ', ligne = ' + _ligne + ';');
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
        return this.walkProgremCouplet('initialiserProgrem');
    }
    colorerProgremFunction() {
        return this.walkProgremCouplet('colorerProgrem');
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
                let statement = this.codeIterator.executeNext();
                let newState = new Types_1.ProgremState(this.state.colonne, this.state.ligne, this.state.frame, this.state.contexte, statement);
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
    function buildProgremScheduler(config, code) {
        return new SimpleProgremScheduler(config, code);
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
    var defaultProgremConfig = new Types_1.ProgremConfig('Sans titre', 17, 17, 1);
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
    function buildProgremEditorComponent(progremCode, screenConfig, progremConfig) {
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
            buildProgremViewer(progremCode, screenConfig, progremConfig);
        });
    }
    ProgremService.buildProgremEditorComponent = buildProgremEditorComponent;
    function buildProgremViewer(progremCode, screenConfig, progremConfig) {
        // Load initProgrem Function code
        let initProgremFunctionCode = escodegen_1.generate(progremCode.initialiserProgremFunction().functionRootNode);
        window.eval(initProgremFunctionCode);
        scheduler = SchedulingService_1.SchedulingService.buildProgremScheduler(progremConfig, progremCode);
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
        modeSelectorObservable.subscribe(event => currentScheduler().tempo = Number(event.target.value));
    }
    ProgremService.buildControlPanelComponent = buildControlPanelComponent;
    function buildProgrem(url, screenConfig) {
        let progremConfig = defaultProgremConfig;
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
            buildProgremEditorComponent(progremCode, screenConfig, progremConfig);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9yU3R5bGVEZWNvcmF0b3JzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92YXJpYWJsZVNjb3BlL1ZhcmlhYmxlU2NvcGVDb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUVkaXRvci9Qcm9ncmVtRWRpdG9yQ29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL0h0bWxIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VzcHJpbWEvQmFzaWNFc3ByaW1hUHJvZ3JlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9FdmFsU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9TY2hlZHVsaW5nU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Qcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ZhcmlhYmxlU2NvcGUvRXNwcmltYVZhcmlhYmxlU2NvcGVTdHlsZURlY29yYXRvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvUHJvZ3JlbVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdmFyaWFibGVTY29wZS9Fc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL1R5cGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL0NvZGVTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL1NjcmVlblNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VzcHJpbWEvRXNwcmltYUhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9Db2xvclNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUdyaWQvUHJvZ3JlbUdyaWRDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUdBLG1HQUF3RTtBQUN4RSxrRkFBdUQ7QUFFdkQsTUFBYSwyQkFBMkI7SUFBeEM7UUFFWSxnQkFBVyxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzdDLGtCQUFhLEdBQWtCLDJCQUFZLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLENBQUM7SUE2Q3BGLENBQUM7SUEzQ0csUUFBUSxDQUFDLElBQWMsRUFBRSxPQUFvQjtRQUN6QyxJQUFJLEtBQUssQ0FBQztRQUVWLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7WUFDNUIsSUFBSSxDQUFDLEdBQUcsSUFBa0IsQ0FBQztZQUMzQixLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUNsQjtRQUVELElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDWCxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDekM7WUFFRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFP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LG9EQXlGQyIsImZpbGUiOiJpbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdHlsZURlY29yYXRvciwgQ29sb3JQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNlTm9kZSwgSWRlbnRpZmllciB9IGZyb20gXCJlc3RyZWVcIjtcblxuaW1wb3J0IHsgUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudCB9IGZyb20gXCIuL1Byb2dyZW1JbnNwZWN0b3JDb21wb25lbnRcIjtcbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb3JlL0NvbG9yU2VydmljZVwiO1xuXG5leHBvcnQgY2xhc3MgQ29sb3JWZXJzZVZhcmlhYmxlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8QmFzZU5vZGU+IHtcblxuICAgIHByaXZhdGUgdmFyaWFibGVNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBjb2xvclByb3ZpZGVyOiBDb2xvclByb3ZpZGVyID0gQ29sb3JTZXJ2aWNlLmNvbG9yUHJvdmlkZXJhY3RvcnkuYnVpbGQoKTtcblxuICAgIGRlY29yYXRlKG5vZGU6IEJhc2VOb2RlLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IHZhcklkO1xuXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdJZGVudGlmaWVyJykge1xuICAgICAgICAgICAgbGV0IG4gPSBub2RlIGFzIElkZW50aWZpZXI7XG4gICAgICAgICAgICB2YXJJZCA9IG4ubmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YXJJZCkge1xuICAgICAgICAgICAgbGV0IHZhckluZGV4ID0gdGhpcy52YXJpYWJsZU1hcC5nZXQodmFySWQpO1xuICAgICAgICAgICAgaWYgKCF2YXJJbmRleCkge1xuICAgICAgICAgICAgICAgIHZhckluZGV4ID0gdGhpcy52YXJpYWJsZU1hcC5zaXplICsgMTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhcmlhYmxlTWFwLnNldCh2YXJJZCwgdmFySW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3ZhcmlhYmxlJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3ZhcmlhYmxlLScgKyB2YXJJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9ICAgIFxuICAgIFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc3R5bGUgPSAnJztcbiAgICAgICAgLy9jb25zb2xlLmxvZygndmFyaWFibGUgY291bnQ6JywgdGhpcy52YXJpYWJsZU1hcC5zaXplKTtcbiAgICAgICAgdGhpcy52YXJpYWJsZU1hcC5mb3JFYWNoKChpbmRleCwgaWQpID0+IHtcbiAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMuY29sb3JQcm92aWRlci5oYXNoU3RyaW5nVG9Db2xvcihpZCwgMTYpOyAvL3RoaXMudmFyaWFibGVNYXAuc2l6ZVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYnVpbGRpbmcgY29sb3IgIycsIGlkLCAnPT4nLCBjb2xvcik7XG4gICAgICAgICAgICBzdHlsZSArPSBgXG4gICAgICAgICAgICAgICAgLnZhcmlhYmxlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMC4xZW0gMC41ZW0gMC4xZW0gMC41ZW07XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwLjhlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLiR7UHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRJTkdfQ0xBU1N9IC52YXJpYWJsZS0ke2luZGV4fS5pZGVudGlmaWVyLCBcbiAgICAgICAgICAgICAgICAuJHtQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVEVEX0NMQVNTfSAudmFyaWFibGUtJHtpbmRleH0uaWRlbnRpZmllciB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBgO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBhZFZlcnNlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8QmFzZU5vZGU+IHtcblxuICAgIGRlY29yYXRlKG5vZGU6IEJhc2VOb2RlLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb2RlLXBhZGRpbmcnKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSAgICBcbiAgICBcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgLmNvZGUtcGFkZGluZyB7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMzJweDtcbiAgICAgICAgfVxuICAgICAgICBgO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgUHJvZ3JlbVNlcnZpY2V9IGZyb20gXCIuL2NvcmUvUHJvZ3JlbVNlcnZpY2VcIjtcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gXCIuL2NvcmUvU2NyZWVuU2VydmljZVwiO1xuXG5sZXQgc2NyZWVuQ29uZmlnID0gbmV3IFNjcmVlbkNvbmZpZygyMCk7XG5cblByb2dyZW1TZXJ2aWNlLmJ1aWxkUHJvZ3JlbSgnLi9wcm9ncmVtcy9jb2V1cl9wcm9ncmVtLmpzJywgc2NyZWVuQ29uZmlnKTsiLCJpbXBvcnQgeyBQcm9ncmVtQ29tcG9uZW50LCBHcmlkQ2hhbmdlTGlzdGVuZXIsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgUHJvZ3JlbVN0YXRlLCBDb2xvclByb3ZpZGVyLCBQcm9ncmVtU2NoZWR1bGVyLCBIdG1sQ291cGxldEZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgRXNwcmltYUhlbHBlciB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFIZWxwZXJcIjtcbmltcG9ydCB7IFZhcmlhYmxlRGVjbGFyYXRpb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBGdW5jdGlvbkRlY2xhcmF0aW9uIH0gZnJvbSBcImVzdHJlZVwiO1xuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvQ29sb3JTZXJ2aWNlXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBFc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5IH0gZnJvbSBcIi4vRXNwcmltYVZhcmlhYmxlU2NvcGVIdG1sRmFjdG9yeVwiO1xuXG5leHBvcnQgY2xhc3MgVmFyaWFibGVTY29wZUNvbXBvbmVudCBpbXBsZW1lbnRzIFByb2dyZW1Db21wb25lbnQsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyIHtcblxuICAgIHByaXZhdGUgaHRtbENvbnRhaW5lcjogSFRNTEVsZW1lbnR8bnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBjb2xvclByb3ZpZGVyOiBDb2xvclByb3ZpZGVyID0gQ29sb3JTZXJ2aWNlLmNvbG9yUHJvdmlkZXJhY3RvcnkuYnVpbGQoKTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXIsXG4gICAgICAgIHByaXZhdGUgaHRtbEZhY3Rvcnk6IEVzcHJpbWFWYXJpYWJsZVNjb3BlSHRtbEZhY3RvcnlcbiAgICApIHtcbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUNvZGVFeGVjdXRpb24odGhpcyk7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVHcmlkQ2hhbmdlKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbmRlckh0bWwoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgaHRtbENvbXBvbmVudCA9IHRoaXMuaHRtbEZhY3RvcnkuYnVpbGRDb3VwbGV0KCk7XG4gICAgICAgIHRoaXMuaHRtbENvbnRhaW5lciA9IGh0bWxDb21wb25lbnQ7XG4gICAgICAgIHJldHVybiBodG1sQ29tcG9uZW50O1xuICAgIH1cblxuICAgIGZpcmVDb2RlRXhlY3V0aW9uKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFzdGF0ZS52ZXJzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0bWxWZXJzZSA9IHRoaXMuaHRtbEZhY3RvcnkuZ2V0SHRtbFZlcnNlKHN0YXRlLnZlcnNlKTtcbiAgICAgICAgLy8gaWYgKHRoaXMuaHRtbENvbnRhaW5lciAmJiBodG1sVmVyc2UpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuaHRtbENvbnRhaW5lci5hcHBlbmRDaGlsZChodG1sVmVyc2UpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgZmlyZUdyaWRDaGFuZ2Uoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmh0bWxGYWN0b3J5LmNsZWFyVmlldygpO1xuICAgIH1cblxufSIsImltcG9ydCB7IEVzcHJpbWFQcm9ncmVtIH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYVR5cGVzXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1FZGl0b3JDb21wb25lbnQge1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBDT01QT05FTlRfQ0xBU1MgPSAncHJvZ3JlbS1lZGl0b3ItY29tcG9uZW50JztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IElOSVRfRlVOQ19DTEFTUyA9ICdpbml0LXByb2dyZW0tZWRpdG9yJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IENPTE9SRVJfRlVOQ19DTEFTUyA9ICdjb2xvcmVyLXByb2dyZW0tZWRpdG9yJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IENPREVfTElCUkVfQ0xBU1MgPSAnY29kZS1saWJyZS1lZGl0b3InO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUkVGUkVTSF9BQ1RJT05fQ0xBU1MgPSAncmVmcmVzaC1hY3Rpb24nO1xuXG4gICAgcHJpdmF0ZSBpbml0UHJvZ3JlbVRleHRhcmVhITogSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICBwcml2YXRlIGNvbG9yZXJQcm9ncmVtVGV4dGFyZWEhOiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgIHByaXZhdGUgY29kZUxpYnJlVGV4dGFyZWEhOiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgIHByaXZhdGUgcmVmcmVzaE9ic2VydmFibGUkITogT2JzZXJ2YWJsZTxFdmVudD47XG5cbiAgICBwcml2YXRlIGF0dGFjaGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwdWJsaWMgYXR0YWNoKGRvY3VtZW50OkRvY3VtZW50KSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7UHJvZ3JlbUVkaXRvckNvbXBvbmVudC5DT01QT05FTlRfQ0xBU1N9IC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuSU5JVF9GVU5DX0NMQVNTfSB0ZXh0YXJlYWApO1xuICAgICAgICBjb25zb2xlLmxvZygnZWxlbWVudHMnLCBlbGVtZW50KTtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHRoaXMuaW5pdFByb2dyZW1UZXh0YXJlYSA9IGVsZW1lbnQgYXMgSFRNTFRleHRBcmVhRWxlbWVudDtcblxuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7UHJvZ3JlbUVkaXRvckNvbXBvbmVudC5DT01QT05FTlRfQ0xBU1N9IC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuQ09MT1JFUl9GVU5DX0NMQVNTfSB0ZXh0YXJlYWApO1xuICAgICAgICBpZiAoZWxlbWVudCkgdGhpcy5jb2xvcmVyUHJvZ3JlbVRleHRhcmVhID0gZWxlbWVudCBhcyBIVE1MVGV4dEFyZWFFbGVtZW50O1xuXG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtQcm9ncmVtRWRpdG9yQ29tcG9uZW50LkNPTVBPTkVOVF9DTEFTU30gLiR7UHJvZ3JlbUVkaXRvckNvbXBvbmVudC5DT0RFX0xJQlJFX0NMQVNTfSB0ZXh0YXJlYWApO1xuICAgICAgICBpZiAoZWxlbWVudCkgdGhpcy5jb2RlTGlicmVUZXh0YXJlYSA9IGVsZW1lbnQgYXMgSFRNTFRleHRBcmVhRWxlbWVudDtcblxuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7UHJvZ3JlbUVkaXRvckNvbXBvbmVudC5DT01QT05FTlRfQ0xBU1N9IC4ke1Byb2dyZW1FZGl0b3JDb21wb25lbnQuUkVGUkVTSF9BQ1RJT05fQ0xBU1N9YCk7XG4gICAgICAgIHRoaXMucmVmcmVzaE9ic2VydmFibGUkID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZWxlbWVudCBhcyBIVE1MQnV0dG9uRWxlbWVudCwgJ2NsaWNrJyk7XG5cbiAgICAgICAgdGhpcy5hdHRhY2hlZCA9IHRoaXMuaW5pdFByb2dyZW1UZXh0YXJlYSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29sb3JlclByb2dyZW1UZXh0YXJlYSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29kZUxpYnJlVGV4dGFyZWEgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnJlZnJlc2hPYnNlcnZhYmxlJCAhPT0gdW5kZWZpbmVkO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2hlY2tJc0F0dGFjaGVkKCkge1xuICAgICAgICBpZiAoIXRoaXMuYXR0YWNoZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvZ3JlbUVkaXRvckNvbXBvbmVudCBpcyBub3QgYXR0YWNoZWQgIScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWRQcm9ncmVtKHByb2dyZW06IEVzcHJpbWFQcm9ncmVtKSB7XG4gICAgICAgIHRoaXMuY2hlY2tJc0F0dGFjaGVkKCk7XG5cbiAgICAgICAgbGV0IGZ1bmNCb2R5QmxvY2sgPSBwcm9ncmVtLmluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCkuZnVuY3Rpb25Sb290Tm9kZS5ib2R5O1xuICAgICAgICBsZXQgZnVuY0JvZHlDb2RlID0gZXNjb2RlR2VuZXJhdGUoZnVuY0JvZHlCbG9jayk7XG4gICAgICAgIGxldCBjbGVhbmVkQ29kZSA9IGZ1bmNCb2R5Q29kZS5zdWJzdHJpbmcoMSwgZnVuY0JvZHlDb2RlLmxlbmd0aCAtIDIpO1xuICAgICAgICB0aGlzLmluaXRQcm9ncmVtVGV4dGFyZWEuaW5uZXJIVE1MID0gY2xlYW5lZENvZGU7XG5cbiAgICAgICAgZnVuY0JvZHlCbG9jayA9IHByb2dyZW0uY29sb3JlclByb2dyZW1GdW5jdGlvbigpLmZ1bmN0aW9uUm9vdE5vZGUuYm9keTtcbiAgICAgICAgZnVuY0JvZHlDb2RlID0gZXNjb2RlR2VuZXJhdGUoZnVuY0JvZHlCbG9jayk7XG4gICAgICAgIGNsZWFuZWRDb2RlID0gZnVuY0JvZHlDb2RlLnN1YnN0cmluZygxLCBmdW5jQm9keUNvZGUubGVuZ3RoIC0gMik7XG4gICAgICAgIHRoaXMuY29sb3JlclByb2dyZW1UZXh0YXJlYS5pbm5lckhUTUwgPSBjbGVhbmVkQ29kZTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHVibGljIGJ1aWxkUHJvZ3JlbSgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgY29sb3JlclByb2dyZW1GdW5jID0gYFxuICAgICAgICBmdW5jdGlvbiBjb2xvcmVyUHJvZ3JlbShjb2xvbm5lLCBsaWduZSwgZnJhbWUsIGNvbnRleHRlKSB7XG4gICAgICAgICAgICAke3RoaXMuY29sb3JlclByb2dyZW1UZXh0YXJlYS52YWx1ZX1cbiAgICAgICAgfVxuICAgICAgICBgO1xuXG4gICAgICAgIGxldCBpbml0UHJvZ3JlbUZ1bmMgPSBgXG4gICAgICAgIGZ1bmN0aW9uIGluaXRpYWxpc2VyUHJvZ3JlbShjb25maWcsIGluaXRDb250ZXh0ZSkge1xuICAgICAgICAgICAgJHt0aGlzLmluaXRQcm9ncmVtVGV4dGFyZWEudmFsdWV9XG4gICAgICAgIH1cbiAgICAgICAgYDtcblxuICAgICAgICBsZXQgY29kZUxpYnJlRnVuYyA9IHRoaXMuY29kZUxpYnJlVGV4dGFyZWEudmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgJHtjb2RlTGlicmVGdW5jfVxuXG4gICAgICAgICR7aW5pdFByb2dyZW1GdW5jfVxuXG4gICAgICAgICR7Y29sb3JlclByb2dyZW1GdW5jfVxuICAgICAgICBgO1xuICAgIH1cblxuICAgIHB1YmxpYyBiaW5kUmVmcmVzaChhY3Rpb246IChjb2RlOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoT2JzZXJ2YWJsZSQuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGFjdGlvbih0aGlzLmJ1aWxkUHJvZ3JlbSgpKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbn0iLCJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBIdG1sSGVscGVyIHtcblxuICAgIHN0YXRpYyBhZGRDbGFzc2VzKGVsdDogSFRNTEVsZW1lbnQsIGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBpZiAodHlwZW9mIGNsYXNzZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnNwbGl0KCcgJykuZm9yRWFjaChjID0+IGVsdC5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjbGFzc2VzKSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5mb3JFYWNoKGMgPT4gZWx0LmNsYXNzTGlzdC5hZGQoYykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHNwYW4oY2xhc3Nlczogc3RyaW5nfHN0cmluZ1tdLCBjb250ZW50Pzogc3RyaW5nfEhUTUxFbGVtZW50fChIVE1MRWxlbWVudHxzdHJpbmcpW10pOiBIVE1MU3BhbkVsZW1lbnQge1xuICAgICAgICByZXR1cm4gSHRtbEhlbHBlci50YWcoJ3NwYW4nLCBjbGFzc2VzLCBjb250ZW50KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcChjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxQYXJhZ3JhcGhFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIudGFnKCdwJywgY2xhc3NlcywgY29udGVudCkgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpdihjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxEaXZFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIudGFnKCdkaXYnLCBjbGFzc2VzLCBjb250ZW50KSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2FudmFzKGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSwgY29udGVudD86IHN0cmluZ3xIVE1MRWxlbWVudHwoSFRNTEVsZW1lbnR8c3RyaW5nKVtdKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICAgICAgICByZXR1cm4gSHRtbEhlbHBlci50YWcoJ2NhbnZhcycsIGNsYXNzZXMsIGNvbnRlbnQpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHRhZyh0YWdOYW1lOiBzdHJpbmcsIGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSwgY29udGVudD86IHN0cmluZ3xIVE1MRWxlbWVudHwoSFRNTEVsZW1lbnR8c3RyaW5nKVtdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgZWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICAgICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgICAgIEh0bWxIZWxwZXIuYWRkQ2xhc3NlcyhlbHQsIGNsYXNzZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZWx0LmlubmVyVGV4dCA9IGNvbnRlbnQ7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBlbHQuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjb250ZW50KSkge1xuICAgICAgICAgICAgY29udGVudC5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgZWx0LmlubmVySFRNTCArPSBjO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYykge1xuICAgICAgICAgICAgICAgICAgICBlbHQuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBhZGQgY29udGVudDonLCBjKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWZpbmVDc3NSdWxlcyhpZDogc3RyaW5nLCBjc3NSdWxlczogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBjc3NJZCA9ICdjc3MtJyArIGlkO1xuICAgICAgICBsZXQgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3NzSWQpO1xuICAgICAgICBpZighc3R5bGVFbGVtZW50KSB7XG4gICAgICAgICAgICBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICB9XG4gICAgICAgIHN0eWxlRWxlbWVudC5pZCA9IGNzc0lkO1xuICAgICAgICAvKiBhZGQgc3R5bGUgcnVsZXMgdG8gdGhlIHN0eWxlIGVsZW1lbnQgKi9cbiAgICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzc1J1bGVzKSk7XG4gICAgICAgIFxuICAgICAgICAvKiBhdHRhY2ggdGhlIHN0eWxlIGVsZW1lbnQgdG8gdGhlIGRvY3VtZW50IGhlYWQgKi9cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbn0iLCJcbmltcG9ydCB7IFByb2dyYW0sIHBhcnNlTW9kdWxlLCBQYXJzZU9wdGlvbnMgfSBmcm9tICdlc3ByaW1hJztcbmltcG9ydCB7IHdhbGsgYXMgZXNwcmltYVdhbGssIHdhbGtBZGRQYXJlbnQgYXMgZXNwcmltYVdhbGtBZGRQYXJlbnQgfSBmcm9tICdlc3ByaW1hLXdhbGsnO1xuaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgQmFzZU5vZGUsIEZ1bmN0aW9uRGVjbGFyYXRpb24sIEJsb2NrU3RhdGVtZW50LCBJZlN0YXRlbWVudCwgUmV0dXJuU3RhdGVtZW50LCBTdGF0ZW1lbnQgfSBmcm9tICdlc3RyZWUnO1xuaW1wb3J0IHsgRXNwcmltYVZlcnNlSXRlcmFvciwgRXNwcmltYVZlcnNlLCBFc3ByaW1hQ291cGxldCwgRXNwcmltYVByb2dyZW1GYWN0b3J5LCBFc3ByaW1hUHJvZ3JlbSB9IGZyb20gJy4vRXNwcmltYVR5cGVzJztcbmltcG9ydCB7IEVzcHJpbWFIZWxwZXIgfSBmcm9tICcuL0VzcHJpbWFIZWxwZXInO1xuaW1wb3J0IHsgQ29kZVNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL0NvZGVTZXJ2aWNlJztcbmltcG9ydCB7IFByb2dyZW1TdGF0ZSB9IGZyb20gJy4uL2NvcmUvVHlwZXMnO1xuXG5jbGFzcyBCYXNpY0VzcHJpbWFDb2RlSXRlcmF0b3IgaW1wbGVtZW50cyBFc3ByaW1hVmVyc2VJdGVyYW9yIHtcblxuICAgIHByaXZhdGUgc3RhY2s6IEJhc2VOb2RlW10gPSBbXTtcbiAgICBwcml2YXRlIHJldHVyblZhbHVlOiBhbnkgPSBudWxsO1xuICAgIHByaXZhdGUgZmluaXNoZWQgPSBmYWxzZVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgICAgICBwcml2YXRlIHJvb3ROb2RlOiBCYXNlTm9kZSwgXG4gICAgICAgICAgICBwcml2YXRlIHN0YXRlOiBQcm9ncmVtU3RhdGUpIHtcbiAgICAgICAgdGhpcy5zdGFjay5wdXNoKHJvb3ROb2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlY2xhcmVQcm9ncmVtQXJndW1lbnRzKCkge1xuICAgICAgICBsZXQgX2NvbG9ubmUgPSB0aGlzLnN0YXRlLmNvbG9ubmU7XG4gICAgICAgIGxldCBfbGlnbmUgPSB0aGlzLnN0YXRlLmxpZ25lO1xuICAgICAgICBsZXQgX2NvbnRleHRlID0gdGhpcy5zdGF0ZS5jb250ZXh0ZTtcblxuICAgICAgICB0aGlzLnN0YXRlLmV2YWwoJ3ZhciBjb2xvbm5lID0gJyArIF9jb2xvbm5lICsgJywgbGlnbmUgPSAnICsgX2xpZ25lICsgJzsnKTtcbiAgICAgICAgdGhpcy5zdGF0ZS5ldmFsKCd2YXIgY29udGV4dGUgPSAnICsgSlNPTi5zdHJpbmdpZnkoX2NvbnRleHRlKSk7XG4gICAgfVxuXG4gICAgZXhlY3V0ZU5leHQoKTogRXNwcmltYVZlcnNlIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBmaXJzdCBub2RlIG9uIHRoZSBzdGFja1xuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnN0YWNrLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ05vZGU6Jywgbm9kZSk7XG5cbiAgICAgICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RhY2sgc2hvdWxkIG5vdCBiZSBlbXB0eSAhJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzdG10O1xuXG4gICAgICAgICAgICBzd2l0Y2gobm9kZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIGxldCBmdW5jID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoZnVuYy5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWNsYXJlUHJvZ3JlbUFyZ3VtZW50cygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRWZXJzZShmdW5jKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdCbG9ja1N0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9jayA9IG5vZGUgYXMgQmxvY2tTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrLmJvZHkuc2xpY2UoKS5yZXZlcnNlKCkubWFwKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnQmxvY2tTdGF0ZW1lbnQgdW5zaGlmdGluZzonLCB4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdCh4KVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdJZlN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIHN0bXQgPSBub2RlIGFzIElmU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdENvZGUgPSBlc2NvZGVHZW5lcmF0ZShzdG10LnRlc3QpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0UmVzdWx0ID0gdGhpcy5zdGF0ZS5ldmFsKHRlc3RDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnSWZTdGF0ZW1lbnQgdGVzdCBldmFsdWF0ZSB0bzogJywgdGVzdFJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXN0UmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdUaGVuIHVuc2hpZnRpbmc6Jywgc3RtdC5jb25zZXF1ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdChzdG10LmNvbnNlcXVlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0bXQuYWx0ZXJuYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnRWxzZSB1bnNoaWZ0aW5nOicsIHN0bXQuYWx0ZXJuYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoc3RtdC5hbHRlcm5hdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkVmVyc2Uoc3RtdCk7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdSZXR1cm5TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBzdG10ID0gbm9kZSBhcyBSZXR1cm5TdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV0dXJuVmFsdWUgPSB0aGlzLnN0YXRlLmV2YWwoZXNjb2RlR2VuZXJhdGUoc3RtdC5hcmd1bWVudCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkVmVyc2Uoc3RtdCk7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdOb2RlOicsIG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29kZSA9IGVzY29kZUdlbmVyYXRlKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdHZW5lcmF0ZWQgY29kZTonLCBjb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGV2YWxSZXN1bHQgPSB0aGlzLnN0YXRlLmV2YWwoY29kZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0V2YWx1YXRlIHRvOicsIGV2YWxSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRWZXJzZShub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAodGhpcy5zdGFjay5sZW5ndGggPiAwKTtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0l0ZXJhdG9yIGhhcyBubyBtb3JlIGNvZGUgdG8gZXhlY3V0ZSAhJyk7XG4gICAgfSAgICBcbiAgICBcbiAgICBoYXNOZXh0KCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5maW5pc2hlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5vZGVzID0gdGhpcy5zdGFjay5zbGljZSgwKTtcbiAgICAgICAgd2hpbGUgKG5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gbm9kZXMuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudHlwZSAhPT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2tzOiBCbG9ja1N0YXRlbWVudFtdID0gW107XG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9jayA9IG5vZGUgYXMgQmxvY2tTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKGJsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGFyc291cnMgcmVjdXJzaXZlbWVudCBsZXMgYmxvY2tzIMOgIGxhIHJlY2hlcmNoZSBkZSBub2V1ZCBxdWkgbmUgc29udCBwYXMgZGVzIGJsb2Nrc1xuICAgICAgICAgICAgICAgICAgICBsZXQgaGFzTmV4dCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIWhhc05leHQgJiYgYmxvY2tzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiID0gYmxvY2tzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGIuYm9keS5tYXAoeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4LnR5cGUgIT09ICdCbG9ja1N0YXRlbWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc05leHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzTmV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljRXNwcmltYVByb2dyZW0gaW1wbGVtZW50cyBFc3ByaW1hUHJvZ3JlbSB7XG5cbiAgICBwcml2YXRlIGVzcHJpbWFQcm9ncmFtOiBQcm9ncmFtO1xuXG4gICAgY29uc3RydWN0b3IoY29kZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBjb25maWc6IFBhcnNlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbW1lbnQ6IHRydWUsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lc3ByaW1hUHJvZ3JhbSA9IHBhcnNlTW9kdWxlKGNvZGUsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHdhbGtQcm9ncmVtQ291cGxldChmdW5jdGlvbk5hbWU6IHN0cmluZyk6IEVzcHJpbWFDb3VwbGV0IHtcbiAgICAgICAgdmFyIGZ1bmNOb2RlOiBGdW5jdGlvbkRlY2xhcmF0aW9uIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIHZhciB2ZXJzZXM6IEJhc2VOb2RlW10gPSBbXTtcbiAgICAgICAgZXNwcmltYVdhbGtBZGRQYXJlbnQodGhpcy5lc3ByaW1hUHJvZ3JhbSwgbm9kZSA9PiB7XG4gICAgICAgICAgICBpZiggbm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicgJiYgbm9kZS5pZCAmJiBub2RlLmlkLm5hbWUgPT09IGZ1bmN0aW9uTmFtZSkge1xuICAgICAgICAgICAgICAgIGZ1bmNOb2RlID0gbm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmdW5jTm9kZSAmJiBFc3ByaW1hSGVscGVyLmlzQ2hpbGROb2RlT2Yobm9kZSwgZnVuY05vZGUpKSB7IC8vICYmIEVzcHJpbWFIZWxwZXIuaXNOb3RDaGlsZE5vZGVPZihub2RlLCB2ZXJzZXMpXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nIFxuICAgICAgICAgICAgICAgICAgICB8fCBub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJ1xuICAgICAgICAgICAgICAgICAgICB8fCBub2RlLnR5cGUgPT09ICdFeHByZXNzaW9uU3RhdGVtZW50J1xuICAgICAgICAgICAgICAgICAgICB8fCBub2RlLnR5cGUgPT09ICdSZXR1cm5TdGF0ZW1lbnQnXG4gICAgICAgICAgICAgICAgICAgIHx8IG5vZGUudHlwZSA9PT0gJ0lmU3RhdGVtZW50JyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSApO1xuICAgICAgICBpZiAoZnVuY05vZGUpIHtcbiAgICAgICAgICAgIHZlcnNlcy51bnNoaWZ0KGZ1bmNOb2RlKTtcbiAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZENvdXBsZXQoZnVuY05vZGUsIHZlcnNlcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbXBvc3NpYmxlIGRlIHRyb3V2ZXIgbGEgZm9uY3Rpb24gJHtmdW5jdGlvbk5hbWV9KCkgIWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpOiBFc3ByaW1hQ291cGxldCB7XG4gICAgICAgIHJldHVybiB0aGlzLndhbGtQcm9ncmVtQ291cGxldCgnaW5pdGlhbGlzZXJQcm9ncmVtJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKTogRXNwcmltYUNvdXBsZXQge1xuICAgICAgICByZXR1cm4gdGhpcy53YWxrUHJvZ3JlbUNvdXBsZXQoJ2NvbG9yZXJQcm9ncmVtJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGl0ZXJhdG9yKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiBFc3ByaW1hVmVyc2VJdGVyYW9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCYXNpY0VzcHJpbWFDb2RlSXRlcmF0b3IodGhpcy5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCkuZnVuY3Rpb25Sb290Tm9kZSwgc3RhdGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljRXNwcmltYVByb2dyZW1GYWN0b3J5IGltcGxlbWVudHMgRXNwcmltYVByb2dyZW1GYWN0b3J5IHtcblxuICAgIGJ1aWxkUHJvZ3JlbShjb2RlOiBzdHJpbmcpOiBFc3ByaW1hUHJvZ3JlbSB7XG4gICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBvc3NpYmxlIHRvIGJ1aWxkIFByb2dyZW0gd2l0aG91dCBjb2RlICEnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEJhc2ljRXNwcmltYVByb2dyZW0oY29kZSk7XG4gICAgfVxuXG4gICAgYnVpbGRDb3VwbGV0KG5vZGU6IEZ1bmN0aW9uRGVjbGFyYXRpb24sIHZlcnNlczogQmFzZU5vZGVbXSk6IEVzcHJpbWFDb3VwbGV0IHtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcG9zc2libGUgdG8gYnVpbGQgZW1wdHkgQ291cGxldCAhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZXNwcmltYVZlcnNlcyA9IHZlcnNlcy5tYXAodGhpcy5idWlsZFZlcnNlKTtcblxuICAgICAgICBsZXQgY291cGxldDogRXNwcmltYUNvdXBsZXQgPSB7XG4gICAgICAgICAgICBmdW5jdGlvblJvb3ROb2RlOiBub2RlLFxuICAgICAgICAgICAgdmVyc2VzOiBlc3ByaW1hVmVyc2VzXG4gICAgICAgIH1cbiAgICAgICAgLy9jb25zb2xlLmxvZygnQnVpbHQgY291cGxldDonLCBjb3VwbGV0KTtcbiAgICAgICAgcmV0dXJuIGNvdXBsZXQ7XG4gICAgfVxuXG4gICAgYnVpbGRWZXJzZShub2RlOiBCYXNlTm9kZSk6IEVzcHJpbWFWZXJzZSB7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBvc3NpYmxlIHRvIGJ1aWxkIGVtcHR5IFZlcnNlICEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb2RlID0gbm9kZTtcbiAgICAgICAgaWYobm9kZS50eXBlID09PSAnSWZTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICBjb2RlID0gKG5vZGUgYXMgSWZTdGF0ZW1lbnQpLnRlc3Q7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmVyc2U6IEVzcHJpbWFWZXJzZSA9IHsgXG4gICAgICAgICAgICBub2RlOiBub2RlLFxuICAgICAgICAgICAgY29kZTogY29kZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdmVyc2U7XG4gICAgfVxufVxuIiwiXG5leHBvcnQgY2xhc3MgRXZhbFNjb3BlIHtcblxuICAgIC8vIFNlZSBodHRwOi8vcGVyZmVjdGlvbmtpbGxzLmNvbS9nbG9iYWwtZXZhbC13aGF0LWFyZS10aGUtb3B0aW9ucy9cbiAgICAvLyBXaWxsIHJldHVybiBhbiBldmFsIGFibGUgdG8gZXZhbHVhdGUganMgY29kZSBpbiB0aGUgZ2xvYmFsIHNjb3BlLlxuICAgIHB1YmxpYyByZWFkb25seSBnbG9iYWxFdmFsID0gKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXIgaXNJbmRpcmVjdEV2YWxHbG9iYWwgPSAoZnVuY3Rpb24gKG9yaWdpbmFsLCBPYmplY3QpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gRG9lcyBgT2JqZWN0YCByZXNvbHZlIHRvIGEgbG9jYWwgdmFyaWFibGUsIG9yIHRvIGEgZ2xvYmFsLCBidWlsdC1pbiBgT2JqZWN0YCxcbiAgICAgICAgICAgICAgICAvLyByZWZlcmVuY2UgdG8gd2hpY2ggd2UgcGFzc2VkIGFzIGEgZmlyc3QgYXJndW1lbnQ/XG4gICAgICAgICAgICAgICAgcmV0dXJuICgxLCBldmFsKSgnT2JqZWN0JykgPT09IG9yaWdpbmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIC8vIGlmIGluZGlyZWN0IGV2YWwgZXJyb3JzIG91dCAoYXMgYWxsb3dlZCBwZXIgRVMzKSwgdGhlbiBqdXN0IGJhaWwgb3V0IHdpdGggYGZhbHNlYFxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoT2JqZWN0LCAxMjMpO1xuXG4gICAgICAgIGlmIChpc0luZGlyZWN0RXZhbEdsb2JhbCkge1xuICAgICAgICAgICAgLy8gaWYgaW5kaXJlY3QgZXZhbCBleGVjdXRlcyBjb2RlIGdsb2JhbGx5LCB1c2UgaXRcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXhwcmVzc2lvbjogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgxLCBldmFsKShleHByZXNzaW9uKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygd2luZG93LmV4ZWNTY3JpcHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvLyBpZiBgd2luZG93LmV4ZWNTY3JpcHQgZXhpc3RzYCwgdXNlIGl0XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV4cHJlc3Npb246IHN0cmluZykge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LmV4ZWNTY3JpcHQoZXhwcmVzc2lvbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3RoZXJ3aXNlLCBnbG9iYWxFdmFsIGlzIGB1bmRlZmluZWRgIHNpbmNlIG5vdGhpbmcgaXMgcmV0dXJuZWRcbiAgICAgICAgcmV0dXJuIChleHByOiBzdHJpbmcpID0+IHt0aHJvdyBuZXcgRXJyb3IoJ05vIGdsb2JhbCBldmFsIGF2YWlsYWJsZSAhJyk7fVxuICAgIH0pKCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbn1cbiIsImltcG9ydCB7IFByb2dyZW1TY2hlZHVsZXIsIFZlcnNlSXRlcmF0b3IsIFByb2dyZW1Db2RlLCBQcm9ncmVtVmVyc2UsIFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyLCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciwgTGluZUNoYW5nZUxpc3RlbmVyLCBGcmFtZUNoYW5nZUxpc3RlbmVyLCBQcm9ncmVtU3RhdGUsIFByb2dyZW1UZW1wbywgUHJvZ3JlbUNvbmZpZyB9IGZyb20gXCIuL1R5cGVzXCI7XG5cbmNsYXNzIFNpbXBsZVByb2dyZW1TY2hlZHVsZXIgaW1wbGVtZW50cyBQcm9ncmVtU2NoZWR1bGVyIHtcbiAgICBcbiAgICBwcml2YXRlIHN0YXRlOiBQcm9ncmVtU3RhdGU7XG4gICAgcHJpdmF0ZSBjb2RlSXRlcmF0b3I6IFZlcnNlSXRlcmF0b3I8YW55PiB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBzdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lcnM6IFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGNvZGVFeGVjdXRpb25MaXN0ZW5lcnM6IENvZGVFeGVjdXRpb25MaXN0ZW5lcltdID0gW107XG4gICAgcHJpdmF0ZSBncmlkQ2hhbmdlTGlzdGVuZXJzOiBHcmlkQ2hhbmdlTGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgbGluZUNoYW5nZUxpc3RlbmVyczogTGluZUNoYW5nZUxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGZyYW1lQ2hhbmdlTGlzdGVuZXJzOiBGcmFtZUNoYW5nZUxpc3RlbmVyW10gPSBbXTtcblxuICAgIHB1YmxpYyB0ZW1wbzogUHJvZ3JlbVRlbXBvID0gUHJvZ3JlbVRlbXBvLkJ5TGluZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBQcm9ncmVtQ29uZmlnLCBwcml2YXRlIGNvZGU6IFByb2dyZW1Db2RlPGFueT4pIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVTdGFydEl0ZXJhdGluZ0NvZGUobGlzdGVuZXI6IFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gICAgXG5cbiAgICBzdWJzY3JpYmVDb2RlRXhlY3V0aW9uKGxpc3RlbmVyOiBDb2RlRXhlY3V0aW9uTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb2RlRXhlY3V0aW9uTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gICAgXG4gICAgXG4gICAgc3Vic2NyaWJlR3JpZENoYW5nZShsaXN0ZW5lcjogR3JpZENoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ3JpZENoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVMaW5lQ2hhbmdlKGxpc3RlbmVyOiBMaW5lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5lQ2hhbmdlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZUZyYW1lQ2hhbmdlKGxpc3RlbmVyOiBGcmFtZUNoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZnJhbWVDaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmVzZXQoKTogUHJvZ3JlbVN0YXRlIHtcbiAgICAgICAgbGV0IGluaXRpYWxDb250ZXh0ZSA9IHt9O1xuICAgICAgICAvLyBDYWxsIGp1c3QgZXZhbHVhdGVkIGluaXRpYWxpc2VyUHJvZ3JlbSBmdW5jdGlvblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGluaXRpYWxpc2VyUHJvZ3JlbSh0aGlzLmNvbmZpZywgaW5pdGlhbENvbnRleHRlKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0xvYWRlZCBpbml0aWFsIGNvbnRleHRlOiAnLCBpbml0aWFsQ29udGV4dGUpO1xuICAgICAgICBsZXQgc3RhdGUgPSBuZXcgUHJvZ3JlbVN0YXRlKDAsIDAsIDAsIGluaXRpYWxDb250ZXh0ZSwgbnVsbCk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBjdXJyZW50KCk6IFByb2dyZW1TdGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cblxuICAgIG5leHQoKTogUHJvZ3JlbVN0YXRlW10ge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUpIHRocm93IG5ldyBFcnJvcignSW5jb25zaXN0ZW50IFByb2dyZW0gc3RhdGUgIScpO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMudGVtcG8gPT09IFByb2dyZW1UZW1wby5CeVZlcnNlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb2RlSXRlcmF0b3IgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29kZUl0ZXJhdG9yID0gdGhpcy5jb2RlLml0ZXJhdG9yKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZVN0YXJ0SXRlcmF0aW5nQ29kZSh0aGlzLnN0YXRlKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2hhc05leHQ6JywgdGhpcy5jb2RlSXRlcmF0b3IuaGFzTmV4dCgpKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY29kZUl0ZXJhdG9yLmhhc05leHQoKSkge1xuICAgICAgICAgICAgICAgIGxldCBzdGF0ZW1lbnQgPSB0aGlzLmNvZGVJdGVyYXRvci5leGVjdXRlTmV4dCgpO1xuICAgICAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IG5ldyBQcm9ncmVtU3RhdGUodGhpcy5zdGF0ZS5jb2xvbm5lLCB0aGlzLnN0YXRlLmxpZ25lLCB0aGlzLnN0YXRlLmZyYW1lLCB0aGlzLnN0YXRlLmNvbnRleHRlLCBzdGF0ZW1lbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGVFeGVjdXRpb25MaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlQ29kZUV4ZWN1dGlvbihuZXdTdGF0ZSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbbmV3U3RhdGVdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdGaW5pc2hlZCBpdGVyYXRpbmcgb3ZlciBjb2RlLicpXG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgbGV0IG5vdGlmeVBpeGVsQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIGxldCBub3RpZnlMaW5lQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIGxldCBub3RpZnlGcmFtZUNoYW5nZSA9IGZhbHNlO1xuICAgICAgICBsZXQgYnVmZmVyZWRTdGF0ZXM6IFByb2dyZW1TdGF0ZVtdID0gW107XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGxldCBfY29sb25uZSA9IHRoaXMuc3RhdGUuY29sb25uZTtcbiAgICAgICAgICAgIGxldCBfbGlnbmUgPSB0aGlzLnN0YXRlLmxpZ25lO1xuICAgICAgICAgICAgbGV0IF9mcmFtZSA9IHRoaXMuc3RhdGUuZnJhbWU7XG5cbiAgICAgICAgICAgIF9jb2xvbm5lICsrO1xuICAgICAgICAgICAgbm90aWZ5UGl4ZWxDaGFuZ2UgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoX2NvbG9ubmUgPj0gdGhpcy5jb25maWcubm9tYnJlQ29sb25uZXMpIHtcbiAgICAgICAgICAgICAgICBfY29sb25uZSA9IDA7XG4gICAgICAgICAgICAgICAgX2xpZ25lICsrO1xuICAgICAgICAgICAgICAgIG5vdGlmeUxpbmVDaGFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoX2xpZ25lID49IHRoaXMuY29uZmlnLm5vbWJyZUxpZ25lcykge1xuICAgICAgICAgICAgICAgIF9saWduZSA9IDA7XG4gICAgICAgICAgICAgICAgX2ZyYW1lICsrO1xuICAgICAgICAgICAgICAgIG5vdGlmeUZyYW1lQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF9mcmFtZSA+PSB0aGlzLmNvbmZpZy5ub21icmVGcmFtZXMpIHtcbiAgICAgICAgICAgICAgICBfZnJhbWUgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSBuZXcgUHJvZ3JlbVN0YXRlKF9jb2xvbm5lLCBfbGlnbmUsIF9mcmFtZSwgdGhpcy5zdGF0ZS5jb250ZXh0ZSwgbnVsbCk7XG4gICAgXG4gICAgICAgICAgICBpZiAobm90aWZ5UGl4ZWxDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRDaGFuZ2VMaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlR3JpZENoYW5nZSh0aGlzLnN0YXRlKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChub3RpZnlMaW5lQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5lQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUxpbmVDaGFuZ2UodGhpcy5zdGF0ZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm90aWZ5RnJhbWVDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUZyYW1lQ2hhbmdlKHRoaXMuc3RhdGUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnVmZmVyZWRTdGF0ZXMucHVzaCh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgIC8vdGhpcy5jb2RlSXRlcmF0b3IgPSB0aGlzLmNvZGUuaXRlcmF0b3IobmV3U3RhdGUpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0gd2hpbGUodGhpcy50ZW1wbyA9PT0gUHJvZ3JlbVRlbXBvLkJ5TGluZSAmJiAhbm90aWZ5TGluZUNoYW5nZSB8fCB0aGlzLnRlbXBvID09PSBQcm9ncmVtVGVtcG8uQnlGcmFtZSAmJiAhbm90aWZ5RnJhbWVDaGFuZ2UpO1xuXG4gICAgICAgIHRoaXMuY29kZUl0ZXJhdG9yID0gbnVsbDtcblxuICAgICAgICByZXR1cm4gYnVmZmVyZWRTdGF0ZXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFByb2dyZW0oKTogUHJvZ3JlbUNvZGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvZGU7XG4gICAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFNjaGVkdWxpbmdTZXJ2aWNlIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFByb2dyZW1TY2hlZHVsZXIoY29uZmlnOiBQcm9ncmVtQ29uZmlnLCBjb2RlOiBQcm9ncmVtQ29kZTxhbnk+KSB7XG4gICAgICAgIHJldHVybiBuZXcgU2ltcGxlUHJvZ3JlbVNjaGVkdWxlcihjb25maWcsIGNvZGUpO1xuICAgIH1cblxufSIsImltcG9ydCB7IFN0eWxlRGVjb3JhdG9yIH0gZnJvbSBcIi4uLy4uL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IEJhc2VOb2RlLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBCbG9ja1N0YXRlbWVudCwgSWZTdGF0ZW1lbnQsIFZhcmlhYmxlRGVjbGFyYXRvciwgVmFyaWFibGVEZWNsYXJhdGlvbiwgQXNzaWdubWVudEV4cHJlc3Npb24sIEJpbmFyeUV4cHJlc3Npb24sIEV4cHJlc3Npb25TdGF0ZW1lbnQsIFJldHVyblN0YXRlbWVudCwgSWRlbnRpZmllciwgTWVtYmVyRXhwcmVzc2lvbiB9IGZyb20gXCJlc3RyZWVcIjtcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9IdG1sSGVscGVyXCI7XG5pbXBvcnQgeyBFc3ByaW1hSGVscGVyIH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYUhlbHBlclwiO1xuaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgRXNwcmltYVZlcnNlLCBFc3ByaW1hSHRtbENvdXBsZXRGYWN0b3J5LCBFc3ByaW1hQ291cGxldCB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFUeXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgRXNwcmltYVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeSBpbXBsZW1lbnRzIEVzcHJpbWFIdG1sQ291cGxldEZhY3Rvcnkge1xuXG4gICAgcHJpdmF0ZSBodG1sVmVyc2VzTWFwOiBNYXA8QmFzZU5vZGUsIEhUTUxFbGVtZW50PiA9IG5ldyBNYXAoKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvdXBsZXQ6IEVzcHJpbWFDb3VwbGV0LFxuICAgICAgICBwcml2YXRlIGRlY29yYXRvcjogU3R5bGVEZWNvcmF0b3I8QmFzZU5vZGU+XG4gICAgKSB7fVxuXG4gICAgYnVpbGRDb3VwbGV0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGh0bWxDb3VwbGV0ID0gdGhpcy5idWlsZE5vZGUodGhpcy5jb3VwbGV0LmZ1bmN0aW9uUm9vdE5vZGUpO1xuICAgICAgICBodG1sQ291cGxldC5jbGFzc0xpc3QuYWRkKCdwcm9ncmVtLWluc3BlY3Rvci1jb21wb25lbnQnKTtcbiAgICAgICAgcmV0dXJuIGh0bWxDb3VwbGV0O1xuICAgIH1cblxuICAgIGdldEh0bWxWZXJzZSh2ZXJzZTogRXNwcmltYVZlcnNlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAodGhpcy5odG1sVmVyc2VzTWFwLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbFN0YXRlRXJyb3I6IGNvdXBsZXQgbXVzdCBiZSBidWlsdCBiZWZvcmUgY2FsbGluZyBnZXRIdG1sVmVyc2UoKSAhJylcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodG1sRWxlbWVudCA9IHRoaXMuaHRtbFZlcnNlc01hcC5nZXQodmVyc2Uubm9kZSk7XG4gICAgICAgIGlmICghaHRtbEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBIVE1MRWxlbWVudCBmb3VuZCBtYXRjaGluZyB2ZXJzZTonLCB2ZXJzZSwgJyEnKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBIVE1MRWxlbWVudCBmb3VuZCBtYXRjaGluZyBzdXBwbGllZCB2ZXJzZSAhYCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBodG1sRWxlbWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZCBOb2RlIGFwcGx5aW5nIGRlY29yYXRvcnMuXG4gICAgICogXG4gICAgICogQHBhcmFtIG5vZGUgdGhlIG5vZGUgZm9yIHdoaWNoIHRvIHByb2R1Y2UgSFRNTFxuICAgICAqIEBwYXJhbSBzaWJsaW5ncyB0aGUgbm9kZXMgdG8gYWRkIGFzIHNpYmxpbmdzIG9mIHRoZSBub2RlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGJ1aWxkTm9kZShub2RlOiBCYXNlTm9kZSB8IHVuZGVmaW5lZCB8IG51bGwpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIuc3BhbignZW1wdHknLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNpYmxpbmdzOiBIVE1MRWxlbWVudFtdID0gW11cbiAgICAgICAgbGV0IGh0bWxPdXRwdXQgPSB0aGlzLmJ1aWxkTm9kZUludGVybmFsKG5vZGUsIHNpYmxpbmdzKTtcbiAgICAgICAgaHRtbE91dHB1dCA9IHRoaXMuZGVjb3JhdG9yLmRlY29yYXRlKG5vZGUsIGh0bWxPdXRwdXQpO1xuXG4gICAgICAgIGxldCBtYXRjaGluZ1ZlcnNlID0gdGhpcy5jb3VwbGV0LnZlcnNlcy5maW5kKHYgPT4gdi5ub2RlID09PSBub2RlKTtcbiAgICAgICAgaWYgKG1hdGNoaW5nVmVyc2UpIHtcbiAgICAgICAgICAgIGh0bWxPdXRwdXQgPSB0aGlzLmVuY2Fwc3VsYXRlTm9kZUluVmVyc2VDb250YWluZXIoaHRtbE91dHB1dCk7XG4gICAgICAgICAgICAvLyBUaGlzIG5vZGUgaXMgdGhlIHJvb3Qgbm9kZSBvZiBhIFZlcnNlXG4gICAgICAgICAgICB0aGlzLmh0bWxWZXJzZXNNYXAuc2V0KG1hdGNoaW5nVmVyc2Uubm9kZSwgaHRtbE91dHB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2libGluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gSWYgc2libGluZ3MsIGJ1aWxkIGVhY2ggc2libGluZ1xuICAgICAgICAgICAgaHRtbE91dHB1dCA9IEh0bWxIZWxwZXIuc3Bhbignc2libGluZy1jb250YWluZXInLCBodG1sT3V0cHV0KTtcbiAgICAgICAgICAgIHdoaWxlKHNpYmxpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgc2libGluZyA9IHNpYmxpbmdzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgc2libGluZ091dCA9IHRoaXMuYnVpbGROb2RlKHNpYmxpbmcpO1xuICAgICAgICAgICAgICAgICAgICBodG1sT3V0cHV0LmFwcGVuZENoaWxkKHNpYmxpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBodG1sT3V0cHV0O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBlbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGh0bWxFbHQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgY29udGVudCA9IEh0bWxIZWxwZXIuc3BhbigndmVyc2UtY29udGVudCcsIGh0bWxFbHQpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCd2ZXJzZSB2ZXJzZS1jb250YWluZXInLCBjb250ZW50KTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZCBub2RlLlxuICAgICAqIEBwYXJhbSBub2RlIFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBidWlsZE5vZGVJbnRlcm5hbChub2RlOiBCYXNlTm9kZSwgc2libGluZ3M6IEhUTUxFbGVtZW50W10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ0J1aWxkaW5nIG5vZGUnLCBub2RlLCAnLi4uJyk7XG4gICAgICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdGdW5jdGlvbkRlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEZ1bmN0aW9uRGVjbGFyYXRpb24obm9kZSwgc2libGluZ3MpO1xuICAgICAgICAgICAgY2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQmxvY2tTdGF0ZW1lbnQobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdJZlN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRJZlN0YXRlbWVudChub2RlLCBzaWJsaW5ncyk7XG4gICAgICAgICAgICBjYXNlICdWYXJpYWJsZURlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZFZhcmlhYmxlRGVjbGFyYXRpb24obm9kZSk7XG4gICAgICAgICAgICBjYXNlICdWYXJpYWJsZURlY2xhcmF0b3InOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkVmFyaWFibGVEZWNsYXJhdG9yKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnQXNzaWdubWVudEV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQXNzaWdubWVudEV4cHJlc3Npb24obm9kZSk7XG4gICAgICAgICAgICBjYXNlICdCaW5hcnlFeHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEJpbmFyeUV4cHJlc3Npb24obm9kZSk7XG4gICAgICAgICAgICBjYXNlICdFeHByZXNzaW9uU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEV4cHJlc3Npb25TdGF0ZW1lbnQobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdSZXR1cm5TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkUmV0dXJuU3RhdGVtZW50KG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnSWRlbnRpZmllcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRJZGVudGlmaWVyKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnTWVtYmVyRXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRNZW1iZXJFeHByZXNzaW9uKG5vZGUpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZERlZmF1bHQobm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRGdW5jdGlvbkRlY2xhcmF0aW9uKG5vZGU6IEJhc2VOb2RlLCBzaWJsaW5nczogSFRNTEVsZW1lbnRbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgICAgIFxuICAgICAgICBsZXQgZGVjbFN0YXJ0SXRlbXM6IChzdHJpbmcgfCBIVE1MRWxlbWVudClbXTtcbiAgICAgICAgaWYgKG4uaWQpIHtcbiAgICAgICAgICAgIGxldCBmdW5jSWQgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtaWQnLCBuLmlkLm5hbWUpO1xuICAgICAgICAgICAgZGVjbFN0YXJ0SXRlbXMgPSBbJ2Z1bmN0aW9uICcsIGZ1bmNJZCwgJyAoICddO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVjbFN0YXJ0SXRlbXMgPSBbJ2Z1bmN0aW9uICggJ107Ly8gKyBmdW5jLnBhcmFtcy5tYXAoeCA9PiB4Lm5hbWUpLmpvaW4oJywgJykgKyAnICkgeyc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFyYW1Db3VudCA9IG4ucGFyYW1zLmxlbmd0aDtcbiAgICAgICAgbi5wYXJhbXMuZm9yRWFjaCgocGFyYW0sIGkpID0+IHtcbiAgICAgICAgICAgIGxldCB2YXJOYW1lID0gRXNwcmltYUhlbHBlci5wYXR0ZXJuVG9TdHJpbmcocGFyYW0pO1xuICAgICAgICAgICAgbGV0IGZ1bmNQYXJhbSA9IHRoaXMuYnVpbGROb2RlKHBhcmFtKTsvL0h0bWxIZWxwZXIuc3BhbignZnVuYy1wYXJhbScsIHZhck5hbWUpO1xuICAgICAgICAgICAgZGVjbFN0YXJ0SXRlbXMucHVzaChmdW5jUGFyYW0pO1xuICAgICAgICAgICAgaWYgKGkgPCBwYXJhbUNvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgIGRlY2xTdGFydEl0ZW1zLnB1c2goJywgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlY2xTdGFydEl0ZW1zLnB1c2goJyApIHsnKTtcblxuICAgICAgICBsZXQgZGVjbFN0YXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLXN0YXJ0JywgZGVjbFN0YXJ0SXRlbXMpO1xuICAgICAgICBsZXQgZnVuY0JvZHkgPSB0aGlzLmJ1aWxkTm9kZShuLmJvZHkpO1xuICAgICAgICBsZXQgZGVjbEVuZCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1lbmQnLCAnfScpO1xuICAgICAgICBkZWNsRW5kID0gdGhpcy5lbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGRlY2xFbmQpO1xuICAgICAgICAvL2xldCBkZWNsID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLWRlY2xhcmF0aW9uJywgW2RlY2xTdGFydCwgZnVuY0JvZHksIGRlY2xFbmRdKTtcbiAgICAgICAgbGV0IGRlY2wgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtZGVjbGFyYXRpb24nLCBkZWNsU3RhcnQpO1xuICAgICAgICBzaWJsaW5ncy5wdXNoKGZ1bmNCb2R5KTtcbiAgICAgICAgc2libGluZ3MucHVzaChkZWNsRW5kKTtcbiAgICAgICAgcmV0dXJuIGRlY2w7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkQmxvY2tTdGF0ZW1lbnQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgbGV0IGJvZHlTdGF0ZW1lbnRzID0gbi5ib2R5Lm1hcChzdGF0ZW1lbnQgPT4gdGhpcy5idWlsZE5vZGUoc3RhdGVtZW50KSlcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIuc3BhbignYmxvY2snLCBib2R5U3RhdGVtZW50cyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkSWZTdGF0ZW1lbnQobm9kZTogQmFzZU5vZGUsIHNpYmxpbmdzOiBIVE1MRWxlbWVudFtdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgSWZTdGF0ZW1lbnQ7XG4gICAgICAgIGxldCBjb250ZW50OiBIVE1MRWxlbWVudFtdID0gW11cbiAgICAgICAgbGV0IHRlc3QgPSB0aGlzLmJ1aWxkTm9kZShuLnRlc3QpO1xuICAgICAgICBsZXQgaWZTdGFydFRleHQgPSBbJ2lmICggJywgdGVzdCwgJyApIHsnXTtcbiAgICAgICAgbGV0IGlmU3RhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1zdGF0ZW1lbnQtc3RhcnQnLCBpZlN0YXJ0VGV4dCk7XG4gICAgICAgIGNvbnRlbnQucHVzaChpZlN0YXJ0KTtcblxuICAgICAgICBsZXQgdGhlbkJsb2NrID0gdGhpcy5idWlsZE5vZGUobi5jb25zZXF1ZW50KTtcbiAgICAgICAgbGV0IGlmVGhlbiA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLWJsb2NrLXRoZW4nLCB0aGVuQmxvY2spO1xuICAgICAgICBjb250ZW50LnB1c2goaWZUaGVuKTtcbiAgICAgICAgc2libGluZ3MucHVzaCh0aGVuQmxvY2spO1xuXG4gICAgICAgIGlmIChuLmFsdGVybmF0ZSkge1xuICAgICAgICAgICAgbGV0IGlmRWxzZURlY2wgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1zdGF0ZW1lbnQtZWxzZScsICd9IGVsc2UgeycpO1xuICAgICAgICAgICAgaWZFbHNlRGVjbCA9IHRoaXMuZW5jYXBzdWxhdGVOb2RlSW5WZXJzZUNvbnRhaW5lcihpZkVsc2VEZWNsKTtcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaChpZkVsc2VEZWNsKTtcbiAgICAgICAgICAgIHNpYmxpbmdzLnB1c2goaWZFbHNlRGVjbCk7XG5cbiAgICAgICAgICAgIGxldCBlbHNlQmxvY2sgPSB0aGlzLmJ1aWxkTm9kZShuLmFsdGVybmF0ZSk7XG4gICAgICAgICAgICBsZXQgaWZFbHNlID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtYmxvY2stZWxzZScsIGVsc2VCbG9jayk7XG4gICAgICAgICAgICBjb250ZW50LnB1c2goaWZFbHNlKTtcbiAgICAgICAgICAgIHNpYmxpbmdzLnB1c2goaWZFbHNlKTtcbiAgICAgICAgfSBcbiAgICAgICAgbGV0IGlmRW5kID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtc3RhdGVtZW50LWVuZCcsICd9Jyk7XG4gICAgICAgIGlmRW5kID0gdGhpcy5lbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGlmRW5kKTtcbiAgICAgICAgY29udGVudC5wdXNoKGlmRW5kKTtcbiAgICAgICAgc2libGluZ3MucHVzaChpZkVuZCk7XG5cbiAgICAgICAgLy9sZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtc3RhdGVtZW50JywgY29udGVudCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaWZTdGFydDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRWYXJpYWJsZURlY2xhcmF0aW9uKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdGlvbjtcbiAgICAgICAgbGV0IGRlY2xhcmF0aW9ucyA9IG4uZGVjbGFyYXRpb25zLm1hcChkID0+IHRoaXMuYnVpbGROb2RlKGQpKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZGVjbGFyYXRpb24gdmFyaWFibGUtZGVjbGFyYXRpb24nKTtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IG4ua2luZCArICcgJztcbiAgICAgICAgZGVjbGFyYXRpb25zLmZvckVhY2goZCA9PiBjb250YWluZXIuYXBwZW5kQ2hpbGQoZCkpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZFZhcmlhYmxlRGVjbGFyYXRvcihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRvcjtcbiAgICAgICAgbGV0IGxlZnRQYXJ0ID0gdGhpcy5idWlsZE5vZGUobi5pZCk7XG4gICAgICAgIGxldCBjb250YWluZXI7XG4gICAgICAgIGlmIChuLmluaXQpIHtcbiAgICAgICAgICAgIGxldCBhc3NpZ25QYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdvcGVyYXRvciBhc3NpZ24tb3BlcmF0b3InLCAnPScpO1xuICAgICAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5idWlsZE5vZGUobi5pbml0KTtcbiAgICAgICAgICAgIGxldCByaWdodFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLXZhbHVlJywgcmlnaHQpO1xuICAgICAgICAgICAgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIHZhcmlhYmxlLWRlY2xhcmF0b3InLCBbbGVmdFBhcnQsIGFzc2lnblBhcnQsIHJpZ2h0UGFydF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIHZhcmlhYmxlLWRlY2xhcmF0b3InLCBsZWZ0UGFydCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkQXNzaWdubWVudEV4cHJlc3Npb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLmJ1aWxkTm9kZShuLmxlZnQpO1xuICAgICAgICBsZXQgbGVmdFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLWlkJywgbGVmdCk7XG4gICAgICAgIGxldCBhc3NpZ25QYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdvcGVyYXRvciBhc3NpZ24tb3BlcmF0b3InLCAnPScpO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmJ1aWxkTm9kZShuLnJpZ2h0KTtcbiAgICAgICAgbGV0IHJpZ2h0UGFydCA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtdmFsdWUnLCByaWdodCk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gYXNzaWdubWVudC1leHByZXNzaW9uJywgW2xlZnRQYXJ0LCBhc3NpZ25QYXJ0LCByaWdodFBhcnRdKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRCaW5hcnlFeHByZXNzaW9uKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgQmluYXJ5RXhwcmVzc2lvbjtcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLmJ1aWxkTm9kZShuLmxlZnQpO1xuICAgICAgICBsZXQgbGVmdFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24nLCBsZWZ0KTtcbiAgICAgICAgbGV0IG9wZXJhdG9yUGFydCA9IEh0bWxIZWxwZXIuc3Bhbignb3BlcmF0b3IgZXhwcmVzc2lvbi1vcGVyYXRvcicsIG4ub3BlcmF0b3IpO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmJ1aWxkTm9kZShuLnJpZ2h0KTtcbiAgICAgICAgbGV0IHJpZ2h0UGFydCA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbicsIHJpZ2h0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiBiaW5hcnktZXhwcmVzc2lvbicsIFtsZWZ0UGFydCwgb3BlcmF0b3JQYXJ0LCByaWdodFBhcnRdKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRFeHByZXNzaW9uU3RhdGVtZW50KG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgRXhwcmVzc2lvblN0YXRlbWVudDtcbiAgICAgICAgbGV0IGNvZGUgPSB0aGlzLmJ1aWxkTm9kZShuLmV4cHJlc3Npb24pO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgZXhwcmVzc2lvbi1zdGF0ZW1lbnQnLCBjb2RlKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRSZXR1cm5TdGF0ZW1lbnQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBSZXR1cm5TdGF0ZW1lbnQ7XG4gICAgICAgIGxldCBhcmcgPSB0aGlzLmJ1aWxkTm9kZShuLmFyZ3VtZW50KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IHJldHVybi1zdGF0ZW1lbnQnLCBbJ3JldHVybiAnLCBhcmddKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRJZGVudGlmaWVyKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgSWRlbnRpZmllcjtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignaWRlbnRpZmllcicsIEVzcHJpbWFIZWxwZXIucGF0dGVyblRvU3RyaW5nKG4pKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRNZW1iZXJFeHByZXNzaW9uKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgTWVtYmVyRXhwcmVzc2lvbjtcbiAgICAgICAgbGV0IG9iamVjdCA9IHRoaXMuYnVpbGROb2RlKG4ub2JqZWN0KTtcbiAgICAgICAgbGV0IHByb3BlcnR5ID0gdGhpcy5idWlsZE5vZGUobi5wcm9wZXJ0eSk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gbWVtYmVyLWV4cHJlc3Npb24nLCBbb2JqZWN0LCAnLicsIHByb3BlcnR5XSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkRGVmYXVsdChub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2RlZmF1bHQ6Jywgbm9kZSk7XG4gICAgICAgIGxldCBjb2RlID0gZXNjb2RlR2VuZXJhdGUobm9kZSk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2RlZmF1bHQtJyArIG5vZGUudHlwZSwgY29kZSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxufSIsImltcG9ydCB7IFByb2dyZW1Db21wb25lbnQsIFByb2dyZW1TY2hlZHVsZXIsIEh0bWxDb3VwbGV0RmFjdG9yeSwgUHJvZ3JlbVN0YXRlLCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciB9IGZyb20gJy4uLy4uL2NvcmUvVHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudCBpbXBsZW1lbnRzIFByb2dyZW1Db21wb25lbnQsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyIHtcblxuICAgIHByaXZhdGUgZXhlY3V0aW5nRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcbiAgICBwcml2YXRlIGV4ZWN1dGVkRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVhFQ1VUSU5HX0NMQVNTID0gJ3ZlcnNlLWV4ZWN1dGluZyc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBFWEVDVVRFRF9DTEFTUyA9ICd2ZXJzZS1leGVjdXRlZCc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXIsXG4gICAgICAgIHByaXZhdGUgaHRtbEZhY3Rvcnk6IEh0bWxDb3VwbGV0RmFjdG9yeTxhbnk+XG4gICAgKSB7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVDb2RlRXhlY3V0aW9uKHRoaXMpO1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlR3JpZENoYW5nZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZW5kZXJIdG1sKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGh0bWxDb21wb25lbnQgPSB0aGlzLmh0bWxGYWN0b3J5LmJ1aWxkQ291cGxldCgpO1xuICAgICAgICByZXR1cm4gaHRtbENvbXBvbmVudDtcbiAgICB9XG4gICAgXG4gICAgZmlyZUNvZGVFeGVjdXRpb24oc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAoIXN0YXRlLnZlcnNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICBsZXQgaHRtbFZlcnNlID0gdGhpcy5odG1sRmFjdG9yeS5nZXRIdG1sVmVyc2Uoc3RhdGUudmVyc2UpO1xuICAgICAgICBpZihodG1sVmVyc2UpIHtcbiAgICAgICAgICAgIGh0bWxWZXJzZS5jbGFzc0xpc3QuYWRkKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VUSU5HX0NMQVNTKTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodGhpcy5leGVjdXRpbmdFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgZWx0ID0gdGhpcy5leGVjdXRpbmdFbGVtZW50cy5wb3AoKTtcbiAgICAgICAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVkRWxlbWVudHMucHVzaChlbHQpO1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QucmVtb3ZlKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VUSU5HX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LmFkZChQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVEVEX0NMQVNTKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWh0bWxWZXJzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5leGVjdXRpbmdFbGVtZW50cy5wdXNoKGh0bWxWZXJzZSk7XG4gICAgICAgIGh0bWxWZXJzZS5jbGFzc0xpc3QuYWRkKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VUSU5HX0NMQVNTKTtcbiAgICB9XG5cbiAgICBmaXJlR3JpZENoYW5nZShzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIHdoaWxlICh0aGlzLmV4ZWN1dGluZ0VsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBlbHQgPSB0aGlzLmV4ZWN1dGluZ0VsZW1lbnRzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKGVsdCkge1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QucmVtb3ZlKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VURURfQ0xBU1MpO1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QucmVtb3ZlKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VUSU5HX0NMQVNTKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlICh0aGlzLmV4ZWN1dGVkRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGVsdCA9IHRoaXMuZXhlY3V0ZWRFbGVtZW50cy5wb3AoKTtcbiAgICAgICAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVEVEX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IFN0eWxlRGVjb3JhdG9yLCBDb2xvclByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IEJhc2VOb2RlLCBJZGVudGlmaWVyIH0gZnJvbSBcImVzdHJlZVwiO1xuXG5pbXBvcnQgeyBDb2xvclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9Db2xvclNlcnZpY2VcIjtcbmltcG9ydCB7IEVzcHJpbWFIZWxwZXIgfSBmcm9tIFwiLi4vLi4vZXNwcmltYS9Fc3ByaW1hSGVscGVyXCI7XG5pbXBvcnQgeyBIdG1sSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvSHRtbEhlbHBlclwiO1xuXG5leHBvcnQgY2xhc3MgQ29sb3JWYXJpYWJsZVNjb3BlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8c3RyaW5nPiB7XG5cbiAgICBwcml2YXRlIHZhcmlhYmxlTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgY29sb3JQcm92aWRlcjogQ29sb3JQcm92aWRlciA9IENvbG9yU2VydmljZS5jb2xvclByb3ZpZGVyYWN0b3J5LmJ1aWxkKCk7XG5cbiAgICBkZWNvcmF0ZSh2YXJJZDogc3RyaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IHZhckluZGV4ID0gdGhpcy52YXJpYWJsZU1hcC5nZXQodmFySWQpO1xuICAgICAgICBpZiAoIXZhckluZGV4KSB7XG4gICAgICAgICAgICB2YXJJbmRleCA9IHRoaXMudmFyaWFibGVNYXAuc2l6ZSArIDE7XG4gICAgICAgICAgICB0aGlzLnZhcmlhYmxlTWFwLnNldCh2YXJJZCwgdmFySW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd2YXJpYWJsZS1oaW50Jyk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndmFyaWFibGUtJyArIHZhckluZGV4KTtcbiAgICAgICAgXG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLWhpbnQtY29udGFpbmVyJywgZWxlbWVudCk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfSAgICBcbiAgICBcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHN0eWxlID0gJyc7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ3ZhcmlhYmxlIGNvdW50OicsIHRoaXMudmFyaWFibGVNYXAuc2l6ZSk7XG4gICAgICAgIHRoaXMudmFyaWFibGVNYXAuZm9yRWFjaCgoaW5kZXgsIGlkKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmNvbG9yUHJvdmlkZXIuaGFzaFN0cmluZ1RvQ29sb3IoaWQsIDE2KTsgLy90aGlzLnZhcmlhYmxlTWFwLnNpemVcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2J1aWxkaW5nIGNvbG9yICMnLCBpZCwgJz0+JywgY29sb3IpO1xuICAgICAgICAgICAgc3R5bGUgKz0gYFxuICAgICAgICAgICAgICAgIC52YXJpYWJsZS1zY29wZS1jb21wb25lbnQgLnZhcmlhYmxlLWhpbnQtY29udGFpbmVyIHtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAwLjhlbSAwIDAuOGVtIDA7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAudmFyaWFibGUtc2NvcGUtY29tcG9uZW50IC52YXJpYWJsZS1oaW50IHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMC4xZW0gMC41ZW0gMC4xZW0gMC41ZW07XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwLjhlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLnZhcmlhYmxlLXNjb3BlLWNvbXBvbmVudCAudmFyaWFibGUtJHtpbmRleH0sIFxuICAgICAgICAgICAgICAgIC52YXJpYWJsZS1zY29wZS1jb21wb25lbnQgLnZhcmlhYmxlLSR7aW5kZXh9IHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcn07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYWRWZXJzZURlY29yYXRvciBpbXBsZW1lbnRzIFN0eWxlRGVjb3JhdG9yPEJhc2VOb2RlPiB7XG5cbiAgICBkZWNvcmF0ZShub2RlOiBCYXNlTm9kZSwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdCbG9ja1N0YXRlbWVudCcpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY29kZS1wYWRkaW5nJylcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0gICAgXG4gICAgXG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgIC5jb2RlLXBhZGRpbmcge1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDMycHg7XG4gICAgICAgIH1cbiAgICAgICAgYDtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcbmltcG9ydCB7IFNjaGVkdWxpbmdTZXJ2aWNlIH0gZnJvbSAnLi9TY2hlZHVsaW5nU2VydmljZSc7XG5pbXBvcnQgeyBQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL1Byb2dyZW1JbnNwZWN0b3JDb21wb25lbnQnO1xuaW1wb3J0IHsgU2NyZWVuQ29uZmlnIH0gZnJvbSAnLi9TY3JlZW5TZXJ2aWNlJztcbmltcG9ydCB7IEJhc2VOb2RlIH0gZnJvbSAnZXN0cmVlJztcbmltcG9ydCB7IFN0eWxlRGVjb3JhdG9yQWdncmVnYXRpb24sIFByb2dyZW1TY2hlZHVsZXIsIFByb2dyZW1Db2RlLCBQcm9ncmVtVGVtcG8sIFByb2dyZW1Db25maWcgfSBmcm9tICcuL1R5cGVzJztcbmltcG9ydCB7IFBhZFZlcnNlRGVjb3JhdG9yLCBDb2xvclZlcnNlVmFyaWFibGVEZWNvcmF0b3IgfSBmcm9tICcuLi9jb21wb25lbnRzL3Byb2dyZW1JbnNwZWN0b3IvRXNwcmltYVByb2dyZW1JbnNwZWN0b3JTdHlsZURlY29yYXRvcnMnO1xuaW1wb3J0IHsgSHRtbEhlbHBlciB9IGZyb20gJy4vSHRtbEhlbHBlcic7XG5pbXBvcnQgeyBFc3ByaW1hUHJvZ3JlbUluc3BlY3Rvckh0bWxGYWN0b3J5IH0gZnJvbSAnLi4vY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnknO1xuaW1wb3J0IHsgQ29kZVNlcnZpY2UgfSBmcm9tICcuL0NvZGVTZXJ2aWNlJztcbmltcG9ydCB7IFByb2dyZW1HcmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9wcm9ncmVtR3JpZC9Qcm9ncmVtR3JpZENvbXBvbmVudCc7XG5pbXBvcnQgeyBWYXJpYWJsZVNjb3BlQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy92YXJpYWJsZVNjb3BlL1ZhcmlhYmxlU2NvcGVDb21wb25lbnQnO1xuaW1wb3J0IHsgRXNwcmltYVZhcmlhYmxlU2NvcGVIdG1sRmFjdG9yeSB9IGZyb20gJy4uL2NvbXBvbmVudHMvdmFyaWFibGVTY29wZS9Fc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5JztcbmltcG9ydCB7IENvbG9yVmFyaWFibGVTY29wZURlY29yYXRvciB9IGZyb20gJy4uL2NvbXBvbmVudHMvdmFyaWFibGVTY29wZS9Fc3ByaW1hVmFyaWFibGVTY29wZVN0eWxlRGVjb3JhdG9ycyc7XG5pbXBvcnQgeyBQcm9ncmVtRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9wcm9ncmVtRWRpdG9yL1Byb2dyZW1FZGl0b3JDb21wb25lbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcm9ncmVtSGVscGVyIHtcblxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFByb2dyZW1TZXJ2aWNlIHtcblxuICAgIHZhciBwcmV2aW91c1JlcGFpbnRUaW1lID0gMDtcbiAgICB2YXIgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyO1xuICAgIHZhciBwcm9ncmVtQW5pbWF0aW9uU3BlZWQgPSAyO1xuICAgIHZhciBwcm9ncmVtQW5pbWF0aW9uSW50ZXJ2YWxzID0gWzYwMDAwLCA1MDAwLCAxMDAwLCA1MDAsIDEwMCwgMTAsIDFdO1xuICAgIHZhciBwcm9ncmVtTW9kZSA9IFByb2dyZW1UZW1wby5CeUxpbmU7XG4gICAgdmFyIGRlZmF1bHRQcm9ncmVtQ29uZmlnID0gbmV3IFByb2dyZW1Db25maWcoJ1NhbnMgdGl0cmUnLCAxNywgMTcsIDEpO1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGN1cnJlbnRTY2hlZHVsZXIoKTogUHJvZ3JlbVNjaGVkdWxlciB7XG4gICAgICAgIHJldHVybiBzY2hlZHVsZXI7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJvZ3JlbUdyaWRDb21wb25lbnQoc2NyZWVuQ29uZmlnOiBTY3JlZW5Db25maWcsIHByb2dyZW1Db25maWc6IFByb2dyZW1Db25maWcsIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBsZXQgcHJvZ3JlbUdyaWRDb21wb25lbnQgPSBuZXcgUHJvZ3JlbUdyaWRDb21wb25lbnQoc2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnLCBzY2hlZHVsZXIsIGRvY3VtZW50KTtcbiAgICAgICAgbGV0IHByb2dyZW1HcmlkSHRtbCA9IHByb2dyZW1HcmlkQ29tcG9uZW50LnJlbmRlckh0bWwoKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHByb2dyZW1HcmlkSHRtbCk7XG5cbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50KHByb2dyZW1Db2RlOiBQcm9ncmVtQ29kZTxhbnk+LCBjb250YWluZXI6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgbGV0IHByb2dyZW1Db3VwbGV0ID0gcHJvZ3JlbUNvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbigpO1xuICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3RvckRlY29yYXRvcnMgPSBuZXcgU3R5bGVEZWNvcmF0b3JBZ2dyZWdhdGlvbjxCYXNlTm9kZT4oW1xuICAgICAgICAgICAgbmV3IFBhZFZlcnNlRGVjb3JhdG9yKCksXG4gICAgICAgICAgICBuZXcgQ29sb3JWZXJzZVZhcmlhYmxlRGVjb3JhdG9yKCksXG4gICAgICAgICAgICAvL25ldyBIaWdobGlnaHRFeGVjdXRpbmdWZXJzZURlY29yYXRvcihzY2hlZHVsZXIpLFxuICAgICAgICBdKTtcbiAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JGYWN0b3J5ID0gbmV3IEVzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkocHJvZ3JlbUNvdXBsZXQsIHByb2dyZW1JbnNwZWN0b3JEZWNvcmF0b3JzKTtcbiAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JWaWV3ID0gbmV3IFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQoc2NoZWR1bGVyLCBwcm9ncmVtSW5zcGVjdG9yRmFjdG9yeSk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZygnY29kZUVsZW1lbnQnLCBjb2RlRWxlbWVudCk7XG4gICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9ySHRtbCA9IHByb2dyZW1JbnNwZWN0b3JWaWV3LnJlbmRlckh0bWwoKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHByb2dyZW1JbnNwZWN0b3JIdG1sKTtcblxuICAgICAgICBsZXQgZGVjb3JhdG9yU3R5bGUgPSBwcm9ncmVtSW5zcGVjdG9yRGVjb3JhdG9ycy5idWlsZFN0eWxlU2hlZXQoKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnZGVjb3JhdG9yU3R5bGU6JywgZGVjb3JhdG9yU3R5bGUpXG4gICAgICAgIEh0bWxIZWxwZXIuZGVmaW5lQ3NzUnVsZXMoJ3Byb2dyZW0taW5zcGVjdG9yLWNvbXBvbmVudCcsIGRlY29yYXRvclN0eWxlKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRWYXJpYWJsZVNjb3BlQ29tcG9uZW50KHByb2dyZW1Db2RlOiBQcm9ncmVtQ29kZTxhbnk+LCBjb250YWluZXI6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgbGV0IHByb2dyZW1Db3VwbGV0ID0gcHJvZ3JlbUNvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbigpO1xuICAgICAgICBsZXQgdmFyaWFibGVTY29wZURlY29yYXRvcnMgPSBuZXcgU3R5bGVEZWNvcmF0b3JBZ2dyZWdhdGlvbjxzdHJpbmc+KFtcbiAgICAgICAgICAgIG5ldyBDb2xvclZhcmlhYmxlU2NvcGVEZWNvcmF0b3IoKVxuICAgICAgICBdKVxuICAgICAgICBsZXQgaHRtbEZhY3RvcnkgPSBuZXcgRXNwcmltYVZhcmlhYmxlU2NvcGVIdG1sRmFjdG9yeShwcm9ncmVtQ291cGxldCwgdmFyaWFibGVTY29wZURlY29yYXRvcnMsIHNjaGVkdWxlcik7XG4gICAgICAgIGxldCB2YXJpYWJsZVNjb3BlQ29tcG9uZW50ID0gbmV3IFZhcmlhYmxlU2NvcGVDb21wb25lbnQoc2NoZWR1bGVyLCBodG1sRmFjdG9yeSk7XG4gICAgICAgIGxldCB2YXJpYWJsZVNjb3BlSHRtbCA9IHZhcmlhYmxlU2NvcGVDb21wb25lbnQucmVuZGVySHRtbCgpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodmFyaWFibGVTY29wZUh0bWwpO1xuXG4gICAgICAgIGxldCBkZWNvcmF0b3JTdHlsZSA9IHZhcmlhYmxlU2NvcGVEZWNvcmF0b3JzLmJ1aWxkU3R5bGVTaGVldCgpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdkZWNvcmF0b3JTdHlsZTonLCBkZWNvcmF0b3JTdHlsZSlcbiAgICAgICAgSHRtbEhlbHBlci5kZWZpbmVDc3NSdWxlcygndmFyaWFibGUtc2NvcGUtY29tcG9uZW50JywgZGVjb3JhdG9yU3R5bGUpO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFByb2dyZW1FZGl0b3JDb21wb25lbnQocHJvZ3JlbUNvZGU6IFByb2dyZW1Db2RlPGFueT4sIHNjcmVlbkNvbmZpZzogU2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnOiBQcm9ncmVtQ29uZmlnKTogdm9pZCB7XG4gICAgICAgIGxldCBwcm9ncmVtRWRpdG9yQ29tcG9uZW50ID0gbmV3IFByb2dyZW1FZGl0b3JDb21wb25lbnQoKTtcbiAgICAgICAgcHJvZ3JlbUVkaXRvckNvbXBvbmVudC5hdHRhY2goZG9jdW1lbnQpO1xuICAgICAgICBwcm9ncmVtRWRpdG9yQ29tcG9uZW50LmxvYWRQcm9ncmVtKHByb2dyZW1Db2RlKTtcbiAgICAgICAgcHJvZ3JlbUVkaXRvckNvbXBvbmVudC5iaW5kUmVmcmVzaChjb2RlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCduZXcgcHJvZ3JlbSBjb2RlOicsIGNvZGUpO1xuICAgICAgICAgICAgbGV0IHByb2dyZW1Db2RlID0gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRQcm9ncmVtKGNvZGUpO1xuXG4gICAgICAgICAgICBsZXQgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVtLXNjcmlwdC10YWcnKSBhcyBIVE1MU2NyaXB0RWxlbWVudDtcbiAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICBzY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgICAgICBzY3JpcHRFbGVtZW50LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncHJvZ3JlbS1zY3JpcHQtdGFnJylcbiAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQudGV4dCA9IGNvZGU7XG4gICAgICAgICAgICBsZXQgYm9keUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICAgICAgICBpZiAoYm9keUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBib2R5RWxlbWVudC5hcHBlbmRDaGlsZChzY3JpcHRFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ1aWxkUHJvZ3JlbVZpZXdlcihwcm9ncmVtQ29kZSwgc2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtVmlld2VyKHByb2dyZW1Db2RlOiBQcm9ncmVtQ29kZTxhbnk+LCBzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZzogUHJvZ3JlbUNvbmZpZykge1xuICAgICAgICAvLyBMb2FkIGluaXRQcm9ncmVtIEZ1bmN0aW9uIGNvZGVcbiAgICAgICAgbGV0IGluaXRQcm9ncmVtRnVuY3Rpb25Db2RlID0gZXNjb2RlR2VuZXJhdGUocHJvZ3JlbUNvZGUuaW5pdGlhbGlzZXJQcm9ncmVtRnVuY3Rpb24oKS5mdW5jdGlvblJvb3ROb2RlKTtcbiAgICAgICAgKHdpbmRvdyBhcyBhbnkpLmV2YWwoaW5pdFByb2dyZW1GdW5jdGlvbkNvZGUpO1xuXG4gICAgICAgIHNjaGVkdWxlciA9IFNjaGVkdWxpbmdTZXJ2aWNlLmJ1aWxkUHJvZ3JlbVNjaGVkdWxlcihwcm9ncmVtQ29uZmlnLCBwcm9ncmVtQ29kZSk7XG4gICAgICAgIGNvbnN0IHRpdHJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpdHJlJyk7XG4gICAgICAgIGlmICh0aXRyZSkge1xuICAgICAgICAgICAgdGl0cmUuaW5uZXJIVE1MID0gcHJvZ3JlbUNvbmZpZy50aXRyZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9ncmVtR3JpZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCcucHJvZ3JlbS1ncmlkLWNvbXBvbmVudCcpO1xuICAgICAgICBpZiAocHJvZ3JlbUdyaWRDb250YWluZXIpIHtcbiAgICAgICAgICAgIGJ1aWxkUHJvZ3JlbUdyaWRDb21wb25lbnQoc2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnLCBwcm9ncmVtR3JpZENvbnRhaW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3RvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCcucHJvZ3JlbS1pbnNwZWN0b3ItY29tcG9uZW50Jyk7XG4gICAgICAgIGlmIChwcm9ncmVtSW5zcGVjdG9yQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBidWlsZFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQocHJvZ3JlbUNvZGUsIHByb2dyZW1JbnNwZWN0b3JDb250YWluZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhcmlhYmxlU2NvcGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignLnZhcmlhYmxlLXNjb3BlLWNvbXBvbmVudCcpO1xuICAgICAgICBpZiAodmFyaWFibGVTY29wZUNvbnRhaW5lcikge1xuICAgICAgICAgICAgYnVpbGRWYXJpYWJsZVNjb3BlQ29tcG9uZW50KHByb2dyZW1Db2RlLCB2YXJpYWJsZVNjb3BlQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZENvbnRyb2xQYW5lbENvbXBvbmVudCgpIHtcbiAgICAgICAgbGV0IHNwZWVkQ29udHJvbEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29udHJvbC1wYW5lbC1jb21wb25lbnQgLnNwZWVkLXNlbGVjdG9yYClhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICBzcGVlZENvbnRyb2xFbGVtZW50LnZhbHVlID0gU3RyaW5nKHByb2dyZW1BbmltYXRpb25TcGVlZCk7XG4gICAgICAgIGxldCBzcGVlZFNlbGVjdG9yT2JzZXJ2YWJsZSA9IE9ic2VydmFibGUuZnJvbUV2ZW50KHNwZWVkQ29udHJvbEVsZW1lbnQsICdjaGFuZ2UnKTtcbiAgICAgICAgc3BlZWRTZWxlY3Rvck9ic2VydmFibGUuc3Vic2NyaWJlKGV2ZW50ID0+IHByb2dyZW1BbmltYXRpb25TcGVlZCA9IE51bWJlcigoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKSk7XG5cbiAgICAgICAgbGV0IG1vZGVDb250cm9sRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jb250cm9sLXBhbmVsLWNvbXBvbmVudCAubW9kZS1zZWxlY3RvcmApYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgbW9kZUNvbnRyb2xFbGVtZW50LnZhbHVlID0gU3RyaW5nKHNjaGVkdWxlci50ZW1wbyk7XG4gICAgICAgIGxldCBtb2RlU2VsZWN0b3JPYnNlcnZhYmxlID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQobW9kZUNvbnRyb2xFbGVtZW50LCAnY2hhbmdlJyk7XG4gICAgICAgIG1vZGVTZWxlY3Rvck9ic2VydmFibGUuc3Vic2NyaWJlKGV2ZW50ID0+IGN1cnJlbnRTY2hlZHVsZXIoKS50ZW1wbyA9IE51bWJlcigoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKSk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJvZ3JlbSh1cmw6IHN0cmluZywgc2NyZWVuQ29uZmlnOiBTY3JlZW5Db25maWcpIHtcbiAgICAgICAgbGV0IHByb2dyZW1Db25maWcgPSBkZWZhdWx0UHJvZ3JlbUNvbmZpZztcbiAgICAgICAgbGV0IHByb2dyZW1TY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgcHJvZ3JlbVNjcmlwdC5jbGFzc0xpc3QuYWRkKCdwcm9ncmVtLXNjcmlwdC10YWcnKVxuICAgICAgICBwcm9ncmVtU2NyaXB0LnNyYyA9IHVybDtcbiAgICAgICAgbGV0IGJvZHlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICAgICBpZiAoYm9keUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGJvZHlFbGVtZW50LmFwcGVuZENoaWxkKHByb2dyZW1TY3JpcHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgQ29kZVNlcnZpY2UubG9hZFByb2dyZW0odXJsKS50aGVuKGNvZGUgPT4ge1xuICAgICAgICAgICAgbGV0IHByb2dyZW1Db2RlID0gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRQcm9ncmVtKGNvZGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBidWlsZFByb2dyZW1WaWV3ZXIocHJvZ3JlbUNvZGUsIHNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZyk7XG5cbiAgICAgICAgICAgIGJ1aWxkQ29udHJvbFBhbmVsQ29tcG9uZW50KCk7XG5cbiAgICAgICAgICAgIGJ1aWxkUHJvZ3JlbUVkaXRvckNvbXBvbmVudChwcm9ncmVtQ29kZSwgc2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGltZXIoMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRpbWVyKHRpbWVzdGFtcDogbnVtYmVyKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGltZXIpO1xuXG4gICAgICAgIGlmICh0aW1lc3RhbXAgLSBwcmV2aW91c1JlcGFpbnRUaW1lIDwgcHJvZ3JlbUFuaW1hdGlvbkludGVydmFsc1twcm9ncmVtQW5pbWF0aW9uU3BlZWRdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2aW91c1JlcGFpbnRUaW1lID0gdGltZXN0YW1wO1xuXG4gICAgICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgICAgICAgIHNjaGVkdWxlci5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBTdHlsZURlY29yYXRvciwgUHJvZ3JlbVNjaGVkdWxlciB9IGZyb20gXCIuLi8uLi9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNlTm9kZSwgRnVuY3Rpb25EZWNsYXJhdGlvbiwgQmxvY2tTdGF0ZW1lbnQsIElmU3RhdGVtZW50LCBWYXJpYWJsZURlY2xhcmF0b3IsIFZhcmlhYmxlRGVjbGFyYXRpb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBFeHByZXNzaW9uU3RhdGVtZW50LCBSZXR1cm5TdGF0ZW1lbnQsIElkZW50aWZpZXIsIE1lbWJlckV4cHJlc3Npb24gfSBmcm9tIFwiZXN0cmVlXCI7XG5pbXBvcnQgeyBIdG1sSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvSHRtbEhlbHBlclwiO1xuaW1wb3J0IHsgRXNwcmltYUhlbHBlciB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFIZWxwZXJcIjtcbmltcG9ydCB7IEVzcHJpbWFWZXJzZSwgRXNwcmltYUh0bWxDb3VwbGV0RmFjdG9yeSwgRXNwcmltYUNvdXBsZXQgfSBmcm9tIFwiLi4vLi4vZXNwcmltYS9Fc3ByaW1hVHlwZXNcIjtcbmltcG9ydCB7IHN0cmluZ2lmeSB9IGZyb20gXCJxdWVyeXN0cmluZ1wiO1xuXG5leHBvcnQgY2xhc3MgRXNwcmltYVZhcmlhYmxlU2NvcGVIdG1sRmFjdG9yeSBpbXBsZW1lbnRzIEVzcHJpbWFIdG1sQ291cGxldEZhY3Rvcnkge1xuXG4gICAgcHJpdmF0ZSB2YXJIaW50QnlWZXJzZXNNYXA6IE1hcDxCYXNlTm9kZSwgSFRNTEVsZW1lbnRbXT4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSB2YXJIaW50VXBkYXRlck1hcDogTWFwPEJhc2VOb2RlLCAodmFsdWU6IGFueSkgPT4gdm9pZD4gPSBuZXcgTWFwKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb3VwbGV0OiBFc3ByaW1hQ291cGxldCxcbiAgICAgICAgcHJpdmF0ZSBkZWNvcmF0b3I6IFN0eWxlRGVjb3JhdG9yPHN0cmluZz4sXG4gICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyXG4gICAgKSB7fVxuXG4gICAgYnVpbGRDb3VwbGV0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtc2NvcGUtY29tcG9uZW50JylcblxuICAgICAgICAvLyBGSVhNRSBpbCBmYXVkcmFpdCBwYXJjb3VyaXIgbCdhcmJyZSBBU1QgYXZlYyB1biB3YWxrZXIgb3UgdW4gdHJ1YyBkdSBnZW5yZS5cbiAgICAgICAgLy8gRklYTUUgZ3JvcyBoYWNrIGR1IHN5c3TDqG1lIGRlIEh0bWxGYWN0b3J5IGV0IGRlIERlY29yYXRvciBwb3VyIHJlYWxpc2VyIGNlIGNvbXBvc2FudC5cbiAgICAgICAgLy8gQnVpbGQgYWxsIFZhcmlhYmxlSGludCB3aGljaCB3aWxsIGJlIGFkZGVkIGluIHZpZXcgY29udGFpbmVyIG9uZSBieSBvbmUgYnkgZ2V0SHRtbFZlcnNlKClcbiAgICAgICAgdGhpcy5jb3VwbGV0LnZlcnNlcy5mb3JFYWNoKHYgPT4ge1xuICAgICAgICAgICAgbGV0IHZhckhpbnRzID0gdGhpcy5idWlsZFZhcmlhYmxlSGludHModi5ub2RlKTtcbiAgICAgICAgICAgIGxldCBkZWNvcmF0ZWRWYXJIaW50czogSFRNTEVsZW1lbnRbXSA9IFtdO1xuICAgICAgICAgICAgdmFySGludHMuZm9yRWFjaCgodmFySGludCwgdmFyTmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBkZWNvcmF0ZWQgPSB0aGlzLmRlY29yYXRvci5kZWNvcmF0ZSh2YXJOYW1lLCB2YXJIaW50KTtcbiAgICAgICAgICAgICAgICBkZWNvcmF0ZWRWYXJIaW50cy5wdXNoKGRlY29yYXRlZCk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRlY29yYXRlZCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy52YXJIaW50QnlWZXJzZXNNYXAuc2V0KHYubm9kZSwgZGVjb3JhdGVkVmFySGludHMpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNsZWFyVmlldygpO1xuXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfSAgICBcbiAgICBcbiAgICBnZXRIdG1sVmVyc2UodmVyc2U6IEVzcHJpbWFWZXJzZSk6IEhUTUxFbGVtZW50fHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICh0aGlzLnZhckhpbnRCeVZlcnNlc01hcC5zaXplID09PSAwIHx8ICF2ZXJzZS5ub2RlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHRtbEVsZW1lbnRzID0gdGhpcy52YXJIaW50QnlWZXJzZXNNYXAuZ2V0KHZlcnNlLm5vZGUpO1xuICAgICAgICBpZiAoIWh0bWxFbGVtZW50cyB8fCBodG1sRWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5zY2hlZHVsZXIuY3VycmVudCgpO1xuICAgICAgICBsZXQgdmFsdWVzTWFwID0gRXNwcmltYUhlbHBlci5nZXRWYXJpYWJsZVZhbHVlcyhzdGF0ZSwgdmVyc2Uubm9kZSk7XG4gICAgICAgIGxldCB2YXJIaW50VXBkYXRlciA9IHRoaXMudmFySGludFVwZGF0ZXJNYXAuZ2V0KHZlcnNlLm5vZGUpO1xuICAgICAgICBpZiAodmFySGludFVwZGF0ZXIpIHtcbiAgICAgICAgICAgIHZhckhpbnRVcGRhdGVyKHZhbHVlc01hcCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIFNob3cgZWxlbWVudHNcbiAgICAgICAgaHRtbEVsZW1lbnRzLmZvckVhY2goaGludCA9PiBoaW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpKTtcblxuICAgICAgICAvL2xldCB2ZXJzZUNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbigndmVyc2UtY29udGFpbmVyJywgaHRtbEVsZW1lbnRzKTtcbiAgICAgICAgLy9yZXR1cm4gdmVyc2VDb250YWluZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyVmlldygpOiB2b2lkIHtcbiAgICAgICAgLy8gSGlkZSBlbGVtZW50c1xuICAgICAgICB0aGlzLnZhckhpbnRCeVZlcnNlc01hcC5mb3JFYWNoKGhpbnRzID0+IGhpbnRzLmZvckVhY2goaGludCA9PiBoaW50LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpKSk7XG4gICAgICAgIC8vIFJlc2V0IHZhbHVlXG4gICAgICAgIHRoaXMudmFySGludFVwZGF0ZXJNYXAuZm9yRWFjaCgodmFySGludFVwZGF0ZXIsIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFySGludFVwZGF0ZXIobmV3IE1hcCgpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGQgYSBWYXJpYWJsZSBIaW50IGlmIHRoZSBzdXBwbGllZCBub2RlIGNvbnRhaW5zIGEgVmFyaWFibGUgYWZmZWN0YXRpb24uXG4gICAgICogQHBhcmFtIG5vZGVcbiAgICAgKiBAcmV0dXJucyBhbiBIVE1MRWxlbWVudCBvciBudWxsIGlmIG5vIGhpbnQgc2hvdWxkIGFwcGVhciBmb3IgdGhpcyBub2RlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGJ1aWxkVmFyaWFibGVIaW50cyhub2RlOiBCYXNlTm9kZSk6IE1hcDxzdHJpbmcsIEhUTUxFbGVtZW50PiB7XG4gICAgICAgIGxldCB2YXJOb2RlID0gRXNwcmltYUhlbHBlci5yZWR1Y2VOb2RlVG9WYXJEZWNsYXJhdGlvbihub2RlKTtcbiAgICAgICAgaWYgKCF2YXJOb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1hcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhck5hbWVzID0gRXNwcmltYUhlbHBlci5nZXRWYXJpYWJsZU5hbWVzKHZhck5vZGUpO1xuICAgICAgICBsZXQgdmFySGludHMgPSB2YXJOYW1lcy5tYXAodmFyTmFtZSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFyVmFsdWUgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLWhpbnQtdmFsdWUnKTtcbiAgICAgICAgICAgIGxldCB2YXJIaW50ID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS1oaW50JywgW2Ake3Zhck5hbWV9OiBgLCB2YXJWYWx1ZV0pO1xuICAgICAgICAgICAgcmV0dXJuIHt2YXJOYW1lLCB2YXJIaW50LCB2YXJWYWx1ZX07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCB2YWxVcGRhdGVyID0gKHZhbHNCeVZhck5hbWU6IE1hcDxzdHJpbmcsIGFueT4pID0+IHtcbiAgICAgICAgICAgIHZhckhpbnRzLmZvckVhY2godmFySGludCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IHZhbHNCeVZhck5hbWUuZ2V0KHZhckhpbnQudmFyTmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhckhpbnQudmFyVmFsdWUuaW5uZXJUZXh0ID0gdmFsLnRvRml4ZWQoMikudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXJIaW50LnZhclZhbHVlLmlubmVyVGV4dCA9IHZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy52YXJIaW50VXBkYXRlck1hcC5zZXQobm9kZSwgdmFsVXBkYXRlcik7XG5cbiAgICAgICAgbGV0IHZhckhpbnRzQnlOYW1lID0gbmV3IE1hcDxzdHJpbmcsIEhUTUxFbGVtZW50PigpO1xuICAgICAgICB2YXJIaW50cy5mb3JFYWNoKHZhckhpbnQgPT4gdmFySGludHNCeU5hbWUuc2V0KHZhckhpbnQudmFyTmFtZSwgdmFySGludC52YXJIaW50KSk7XG5cbiAgICAgICAgcmV0dXJuIHZhckhpbnRzQnlOYW1lO1xuICAgIH1cblxufSIsImltcG9ydCB7IEV2YWxTY29wZSB9IGZyb20gXCIuL0V2YWxTZXJ2aWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVtQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHRpdHJlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBub21icmVDb2xvbm5lczogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgbm9tYnJlTGlnbmVzOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBub21icmVGcmFtZXM6IG51bWJlcixcbiAgICApIHsgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT4ge1xuICAgIG5vZGU6IEFzdEJhc2VUeXBlXG4gICAgY29kZTogQXN0QmFzZVR5cGVcbn1cbi8qXG5leHBvcnQgaW50ZXJmYWNlIFZlcnNlSW5zdHJ1Y3Rpb25GYWN0b3J5PEFzdEJhc2VUeXBlPiB7XG4gICAgYnVpbGQocGFyYW06IEFzdEJhc2VUeXBlKTogUHJvZ3JlbVZlcnNlPEFzdEJhc2VUeXBlPjtcbn1cbiovXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPiB7XG4gICAgZnVuY3Rpb25Sb290Tm9kZTogQXN0QmFzZVR5cGVcbiAgICB2ZXJzZXM6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT5bXVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1GYWN0b3J5PEFzdEJhc2VUeXBlPiB7XG4gICAgYnVpbGRQcm9ncmVtKGNvZGU6IHN0cmluZyk6IFByb2dyZW1Db2RlPEFzdEJhc2VUeXBlPlxuICAgIGJ1aWxkQ291cGxldChub2RlOiBBc3RCYXNlVHlwZSwgdmVyc2VzOiBBc3RCYXNlVHlwZVtdKTogUHJvZ3JlbUNvdXBsZXQ8QXN0QmFzZVR5cGU+XG4gICAgYnVpbGRWZXJzZShub2RlOiBBc3RCYXNlVHlwZSk6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBWZXJzZUl0ZXJhdG9yPEFzdEJhc2VUeXBlPiB7XG4gICAgZXhlY3V0ZU5leHQoKTogUHJvZ3JlbVZlcnNlPEFzdEJhc2VUeXBlPlxuICAgIGhhc05leHQoKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtQ29kZTxBc3RCYXNlVHlwZT4ge1xuICAgIGluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCk6IFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPlxuICAgIGNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKTogUHJvZ3JlbUNvdXBsZXQ8QXN0QmFzZVR5cGU+XG4gICAgaXRlcmF0b3Ioc3RhdGU6IFByb2dyZW1TdGF0ZSk6IFZlcnNlSXRlcmF0b3I8QXN0QmFzZVR5cGU+XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVtU3RhdGUge1xuXG4gICAgcHVibGljIHJlYWRvbmx5IGV2YWxTY29wZSA9IG5ldyBFdmFsU2NvcGU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvbG9ubmU6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGxpZ25lOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBmcmFtZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgY29udGV4dGU6IG9iamVjdCxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHZlcnNlOiBQcm9ncmVtVmVyc2U8YW55PiB8IG51bGwsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGV2YWwoZXhwcjogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZhbFNjb3BlLmdsb2JhbEV2YWwoZXhwcik7XG4gICAgfVxufVxuXG50eXBlIE5ld1N0YXRlQ2FsbGJhY2sgPSAoc3RhdGU6IFByb2dyZW1TdGF0ZSkgPT4gdm9pZDtcbmV4cG9ydCBpbnRlcmZhY2UgU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIge2ZpcmVTdGFydEl0ZXJhdGluZ0NvZGU6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBDb2RlRXhlY3V0aW9uTGlzdGVuZXIge2ZpcmVDb2RlRXhlY3V0aW9uOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgR3JpZENoYW5nZUxpc3RlbmVyIHtmaXJlR3JpZENoYW5nZTogTmV3U3RhdGVDYWxsYmFja307XG5leHBvcnQgaW50ZXJmYWNlIExpbmVDaGFuZ2VMaXN0ZW5lciB7ZmlyZUxpbmVDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBGcmFtZUNoYW5nZUxpc3RlbmVyIHtmaXJlRnJhbWVDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuXG5leHBvcnQgZW51bSBQcm9ncmVtVGVtcG8ge1xuICAgIEJ5VmVyc2UgPSAwLFxuICAgIEJ5UGl4ZWwsXG4gICAgQnlMaW5lLFxuICAgIEJ5RnJhbWVcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtU2NoZWR1bGVyIHtcbiAgICBzdWJzY3JpYmVTdGFydEl0ZXJhdGluZ0NvZGUobGlzdGVuZXI6IFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUNvZGVFeGVjdXRpb24obGlzdGVuZXI6IENvZGVFeGVjdXRpb25MaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVHcmlkQ2hhbmdlKGxpc3RlbmVyOiBHcmlkQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlTGluZUNoYW5nZShsaXN0ZW5lcjogTGluZUNoYW5nZUxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUZyYW1lQ2hhbmdlKGxpc3RlbmVyOiBGcmFtZUNoYW5nZUxpc3RlbmVyKTogdm9pZFxuICAgIHJlc2V0KCk6IFByb2dyZW1TdGF0ZVxuICAgIGN1cnJlbnQoKTogUHJvZ3JlbVN0YXRlXG4gICAgbmV4dCgpOiBQcm9ncmVtU3RhdGVbXVxuICAgIGdldFByb2dyZW0oKTogUHJvZ3JlbUNvZGU8YW55PlxuICAgIHRlbXBvOiBQcm9ncmVtVGVtcG9cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtQ29tcG9uZW50IHtcbiAgICByZW5kZXJIdG1sKCk6IEhUTUxFbGVtZW50XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3R5bGVEZWNvcmF0b3I8VD4ge1xuICAgIGRlY29yYXRlKG5vZGU6IFQsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnRcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSHRtbENvdXBsZXRGYWN0b3J5PEFzdEJhc2VUeXBlPiB7XG4gICAgYnVpbGRDb3VwbGV0KCk6IEhUTUxFbGVtZW50XG4gICAgZ2V0SHRtbFZlcnNlKHZlcnNlOiBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+KTogSFRNTEVsZW1lbnR8dW5kZWZpbmVkXG59XG5cbmV4cG9ydCBjbGFzcyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uPFQ+IGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8VD4ge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNvcmF0b3JzOiBTdHlsZURlY29yYXRvcjxUPltdKSB7fVxuXG4gICAgZGVjb3JhdGUobm9kZTogVCwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCB0ZW1wOiBIVE1MRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuZGVjb3JhdG9ycy5mb3JFYWNoKGQgPT4gdGVtcCA9IGQuZGVjb3JhdGUobm9kZSwgdGVtcCkpO1xuICAgICAgICByZXR1cm4gdGVtcDtcbiAgICB9XG5cbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjb3JhdG9ycy5tYXAoZCA9PiBkLmJ1aWxkU3R5bGVTaGVldCgpKS5qb2luKCdcXG4nKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2xvclByb3ZpZGVyIHtcbiAgICBoc2xDb2xvcihodWU6IG51bWJlcik6IHN0cmluZztcbiAgICBoYXNoU3RyaW5nVG9Db2xvcihrZXk6IHN0cmluZywgY29sb3JDb3VudDogbnVtYmVyLCBzaGlmdD86IG51bWJlcik6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2xvclByb3ZpZGVyRmFjdG9yeSB7XG4gICAgYnVpbGQoa2V5Pzogc3RyaW5nKTogQ29sb3JQcm92aWRlcjtcbn0iLCJpbXBvcnQgeyBQcm9ncmVtRmFjdG9yeSB9IGZyb20gXCIuL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNpY0VzcHJpbWFQcm9ncmVtRmFjdG9yeSB9IGZyb20gXCIuLi9lc3ByaW1hL0Jhc2ljRXNwcmltYVByb2dyZW1cIjtcblxuZXhwb3J0IG5hbWVzcGFjZSBDb2RlU2VydmljZSB7XG5cbiAgICBleHBvcnQgY29uc3QgcHJvZ3JlbUZhY3Rvcnk6IFByb2dyZW1GYWN0b3J5PGFueT4gPSBuZXcgQmFzaWNFc3ByaW1hUHJvZ3JlbUZhY3RvcnkoKTtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBsb2FkUHJvZ3JlbShmaWxlVXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2xpZW50ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICBjbGllbnQub3BlbignR0VUJywgZmlsZVVybCk7XG4gICAgICAgICAgICBjbGllbnQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb2RlID0gY2xpZW50LnJlc3BvbnNlVGV4dDtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb2RlU2VydmljZTogUHJvZ3JlbSBsb2FkZWQgc3VjY2Vzc2Z1bGx5LicsIGNvZGUpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoY29kZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2xpZW50Lm9uZXJyb3IgPSAoKSA9PiByZWplY3QoY2xpZW50LnN0YXR1c1RleHQpO1xuICAgICAgICAgICAgY2xpZW50LnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59IiwiXG5leHBvcnQgY2xhc3MgU2NyZWVuQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGJveFNpemU6IG51bWJlclxuICAgICkge31cbn1cblxuZXhwb3J0IGNsYXNzIFNjcmVlblNlcnZpY2Uge1xuXG4gICAgcHVibGljIGdldFNjcmVlbkZyYW1lKCk6IGFueSB7XG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBQYXR0ZXJuLCBJZGVudGlmaWVyLCBCYXNlTm9kZSwgVmFyaWFibGVEZWNsYXJhdGlvbiwgQXNzaWdubWVudEV4cHJlc3Npb24sIEZ1bmN0aW9uRGVjbGFyYXRpb24sIE5vZGUgfSBmcm9tIFwiZXN0cmVlXCI7XG5pbXBvcnQgeyBQcm9ncmVtU3RhdGUgfSBmcm9tIFwiLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgc3RyaW5naWZ5IH0gZnJvbSBcInF1ZXJ5c3RyaW5nXCI7XG5cbmV4cG9ydCB0eXBlIE5vZGVXaXRoUGFyZW50ID0gTm9kZSAmIHsgcGFyZW50PzogTm9kZSB9O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRXNwcmltYUhlbHBlciB7XG5cbiAgICBwdWJsaWMgc3RhdGljIHBhdHRlcm5Ub1N0cmluZyhwYXR0ZXJuOiBQYXR0ZXJuKTogc3RyaW5nIHtcbiAgICAgICAgdmFyIG5vZGU7XG4gICAgICAgIHN3aXRjaCAocGF0dGVybi50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdJZGVudGlmaWVyJzpcbiAgICAgICAgICAgICAgICBub2RlID0gcGF0dGVybiBhcyBJZGVudGlmaWVyO1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlLm5hbWU7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBjb252ZXJ0IHBhdHRlcm4gb2YgdHlwZSAnICsgcGF0dGVybi50eXBlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlZHVjZU5vZGVUb1ZhckRlY2xhcmF0aW9uKG5vZGU6IEJhc2VOb2RlKTogVmFyaWFibGVEZWNsYXJhdGlvbiB8IEFzc2lnbm1lbnRFeHByZXNzaW9uIHwgRnVuY3Rpb25EZWNsYXJhdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIFxuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnVmFyaWFibGVEZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgIGxldCBkZWNsID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0aW9uO1xuICAgICAgICAgICAgcmV0dXJuIGRlY2w7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnQXNzaWdubWVudEV4cHJlc3Npb24nKSB7XG4gICAgICAgICAgICBsZXQgZXhwciA9IG5vZGUgYXMgQXNzaWdubWVudEV4cHJlc3Npb247XG4gICAgICAgICAgICByZXR1cm4gZXhwcjtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdGdW5jdGlvbkRlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgbGV0IGZ1bmMgPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gZnVuYztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IHAgaW4gbm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChwID09PSAnbGVmdCcgfHwgcCA9PT0gJ3JpZ2h0JyB8fCBwID09PSAnYXJndW1lbnQnIHx8IHAgPT09ICdjYWxsZWUnIHx8IHAgPT09ICdib2R5JyB8fCBwID09PSAnZXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZDogQmFzZU5vZGUgPSBub2RlW3BdIGFzIEJhc2VOb2RlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gRXNwcmltYUhlbHBlci5yZWR1Y2VOb2RlVG9WYXJEZWNsYXJhdGlvbihjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHZhcmlhYmxlIG5hbWVzIG9mIGRlY2xhcmF0aW9uIG9yIGFzc2lnbm1lbnQgY29udGFpbmVkIGluIG5vZGUuXG4gICAgICogXG4gICAgICogQHBhcmFtIG5vZGUgXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRWYXJpYWJsZU5hbWVzKG5vZGU6IFZhcmlhYmxlRGVjbGFyYXRpb24gfCBBc3NpZ25tZW50RXhwcmVzc2lvbiB8IEZ1bmN0aW9uRGVjbGFyYXRpb24pOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgbGV0IGRlY2wgPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gZGVjbC5kZWNsYXJhdGlvbnMubWFwKGQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YXJOYW1lID0gRXNwcmltYUhlbHBlci5wYXR0ZXJuVG9TdHJpbmcoZC5pZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhck5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgIGxldCBkZWNsID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgICAgIGxldCB2YXJOYW1lID0gRXNwcmltYUhlbHBlci5wYXR0ZXJuVG9TdHJpbmcoZGVjbC5sZWZ0KTtcbiAgICAgICAgICAgIHJldHVybiBbdmFyTmFtZV07XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgIGxldCBmdW5jID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmMucGFyYW1zLm1hcChwID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEVzcHJpbWFIZWxwZXIucGF0dGVyblRvU3RyaW5nKHApO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YXJOYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB2YXJpYWJsZSB2YWx1ZXMgb2YgZGVjbGFyYXRpb24gb3IgYXNzaWdubWVudCBjb250YWluZWQgaW4gbm9kZS5cbiAgICAgKiBTYW1lIGFzIGdldFZhcmlhYmxlTmFtZXMgYnV0IGV2YWx1YXRlIHZhcmlhYmxlcyB0byBkaXNjb3ZlciB0aGVpciB2YWx1ZXMuXG4gICAgICogXG4gICAgICogQHBhcmFtIG5vZGUgXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRWYXJpYWJsZVZhbHVlcyhzdGF0ZTogUHJvZ3JlbVN0YXRlLCBub2RlOiBCYXNlTm9kZSk6IE1hcDxzdHJpbmcsIGFueT4ge1xuICAgICAgICBsZXQgdmFsdWVzTWFwID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgbGV0IHZhck5vZGVzID0gdGhpcy5yZWR1Y2VOb2RlVG9WYXJEZWNsYXJhdGlvbihub2RlKTtcbiAgICAgICAgaWYgKCF2YXJOb2Rlcykge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlc01hcDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldFZhcmlhYmxlTmFtZXModmFyTm9kZXMpLm1hcCh2YXJOYW1lID0+IHZhbHVlc01hcC5zZXQodmFyTmFtZSwgc3RhdGUuZXZhbCh2YXJOYW1lKSkpO1xuICAgICAgICByZXR1cm4gdmFsdWVzTWFwO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNDaGlsZE5vZGVPZihub2RlOiBOb2RlV2l0aFBhcmVudCwgcGFyZW50OiBCYXNlTm9kZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAobm9kZS5wYXJlbnQgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoIW5vZGUucGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gRXNwcmltYUhlbHBlci5pc0NoaWxkTm9kZU9mKG5vZGUucGFyZW50IGFzIE5vZGVXaXRoUGFyZW50LCBwYXJlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNOb3RDaGlsZE5vZGVPZihub2RlOiBOb2RlV2l0aFBhcmVudCwgcGFyZW50czogQmFzZU5vZGVbXSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAocGFyZW50cy5maW5kKHAgPT4gcCA9PT0gbm9kZS5wYXJlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoIW5vZGUucGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBFc3ByaW1hSGVscGVyLmlzTm90Q2hpbGROb2RlT2Yobm9kZS5wYXJlbnQgYXMgTm9kZVdpdGhQYXJlbnQsIHBhcmVudHMpO1xuICAgIH1cblxufSIsImltcG9ydCB7IENvbG9yUHJvdmlkZXIsIENvbG9yUHJvdmlkZXJGYWN0b3J5IH0gZnJvbSBcIi4vVHlwZXNcIjtcbmltcG9ydCB7IGNyZWF0ZSBhcyBtZDVDcmVhdGUgfSBmcm9tICdqcy1tZDUnO1xuXG5leHBvcnQgY2xhc3MgQmFzaWNDb2xvclByb3ZpZGVyRmFjdG9yeSBpbXBsZW1lbnRzIENvbG9yUHJvdmlkZXJGYWN0b3J5IHtcbiAgICBidWlsZChrZXk/OiBzdHJpbmcpOiBDb2xvclByb3ZpZGVyIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCYXNpY0NvbG9yUHJvdmlkZXIoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBCYXNpY0NvbG9yUHJvdmlkZXIgaW1wbGVtZW50cyBDb2xvclByb3ZpZGVyIHtcblxuICAgIHByaXZhdGUgY29sb3JNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwKCk7XG5cbiAgICBwdWJsaWMgaHNsQ29sb3IoaHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2hzbCgnICsgaHVlICsgJywgMTAwJSwgODAlKSc7XG4gICAgfVxuXG4gICAgcHVibGljIGhhc2hTdHJpbmdUb0NvbG9yKGtleTogc3RyaW5nLCBjb2xvckNvdW50OiBudW1iZXIsIHNoaWZ0OiBudW1iZXIgPSAyKSB7XG4gICAgICAgIHZhciBodWUgPSB0aGlzLmNvbG9yTWFwLmdldChrZXkpO1xuICAgICAgICBpZiAoaHVlKSByZXR1cm4gdGhpcy5oc2xDb2xvcihodWUpO1xuXG4gICAgICAgIHZhciBoYXNoID0gbWQ1Q3JlYXRlKCkudXBkYXRlKGtleSkudG9TdHJpbmcoKTtcbiAgICAgICAgXG4gICAgICAgIGh1ZSA9ICggcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAwLCBzaGlmdCArIDEpLCAxNikgKyAxNiAqIHBhcnNlSW50KGhhc2guc3Vic3RyaW5nKHNoaWZ0ICsgMSwgc2hpZnQgKyAyKSwgMTYpICsgMjU2ICogcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAyLCBzaGlmdCArIDMpLCAxNikgKTtcbiAgICAgICAgaHVlID0gTWF0aC5mbG9vcihodWUgJSBjb2xvckNvdW50KSAqIDM2MCAvIGNvbG9yQ291bnQ7XG4gICAgICAgIGh1ZSA9IGh1ZSAlIDM2MDtcblxuICAgICAgICAvLyBDb2xvciBkZWR1cGxpY2F0aW9uXG4gICAgICAgIHdoaWxlICghdGhpcy5jb2xvck1hcC5nZXQoa2V5KSkge1xuICAgICAgICAgICAgbGV0IGR1cGxpY2F0ZUNvbG9yID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGxldCBjIG9mIHRoaXMuY29sb3JNYXAudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoYyAtIGh1ZSkgPCBNYXRoLmZsb29yKDE4MCAvIGNvbG9yQ291bnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGR1cGxpY2F0ZUNvbG9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaHVlICs9IE1hdGguZmxvb3IoMjcwIC8gY29sb3JDb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIGh1ZSA9IGh1ZSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkdXBsaWNhdGVDb2xvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JNYXAuc2V0KGtleSwgaHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy92YXIgcGFzdGVsID0gJ2hzbCgnICsgaHVlICsgJywgMTAwJSwgODcuNSUpJztcbiAgICAgICAgcmV0dXJuIHRoaXMuaHNsQ29sb3IoaHVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29sb3JTZXJ2aWNlIHtcblxuICAgIGV4cG9ydCBjb25zdCBjb2xvclByb3ZpZGVyYWN0b3J5OiBDb2xvclByb3ZpZGVyRmFjdG9yeSA9IG5ldyBCYXNpY0NvbG9yUHJvdmlkZXJGYWN0b3J5KCk7XG5cbn1cbiIsImltcG9ydCB7IFByb2dyZW1Db21wb25lbnQsIFByb2dyZW1TY2hlZHVsZXIsIFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyLCBHcmlkQ2hhbmdlTGlzdGVuZXIsIFByb2dyZW1TdGF0ZSwgUHJvZ3JlbUNvbmZpZyB9IGZyb20gXCIuLi8uLi9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBTY3JlZW5Db25maWcgfSBmcm9tIFwiLi4vLi4vY29yZS9TY3JlZW5TZXJ2aWNlXCI7XG5pbXBvcnQgeyBIdG1sSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvSHRtbEhlbHBlclwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBhbmltYXRpb25GcmFtZVNjaGVkdWxlciB9IGZyb20gXCJyeGpzXCI7XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVtR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIFByb2dyZW1Db21wb25lbnQsIFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyLCBHcmlkQ2hhbmdlTGlzdGVuZXIge1xuICAgIFxuICAgIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIGJsaW5rSW50ZXJ2YWwgPSAyMDA7XG4gICAgXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2NyZWVuQ29uZmlnOiBTY3JlZW5Db25maWcsIFxuICAgICAgICBwcml2YXRlIHByb2dyZW1Db25maWc6IFByb2dyZW1Db25maWcsXG4gICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyLFxuICAgICAgICBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudFxuICAgICAgICApIHtcbiAgICAgICAgbGV0IGVuV2FybmluZyA9IEh0bWxIZWxwZXIucCgnd2FybmluZycsIFwiWW91ciBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBjYW52YXMuXCIpO1xuICAgICAgICBsZXQgZnJXYXJuaW5nID0gSHRtbEhlbHBlci5wKCd3YXJuaW5nJywgXCJWb3RyZSBuYXZpZ2F0ZXVyIG5lIHN1cHBvcnRlIHBhcyBsZXMgY2FudmFzLlwiKTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBIdG1sSGVscGVyLmNhbnZhcygnJywgW2VuV2FybmluZywgZnJXYXJuaW5nXSk7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5wcm9ncmVtQ29uZmlnLm5vbWJyZUNvbG9ubmVzICogdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5wcm9ncmVtQ29uZmlnLm5vbWJyZUxpZ25lcyAqIHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG5cbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmICghY3R4KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBvYnRhaW4gMkQgQ2FudmFzIGNvbnRleHQgIScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG5cbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZVN0YXJ0SXRlcmF0aW5nQ29kZSh0aGlzKTtcbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUdyaWRDaGFuZ2UodGhpcyk7XG4gICAgfVxuXG4gICAgcmVuZGVySHRtbCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3Byb2dyZW0tZ3JpZCcsIHRoaXMuY2FudmFzKTtcblxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjb2xvckN1cnJlbnRQaXhlbChzdGF0ZTogUHJvZ3JlbVN0YXRlLCBjb2xvcjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBib3hTaXplID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcbiAgICAgICAgbGV0IGMgPSBzdGF0ZS5jb2xvbm5lO1xuICAgICAgICBsZXQgbCA9IHN0YXRlLmxpZ25lO1xuXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdChjICogYm94U2l6ZSwgbCAqIGJveFNpemUsIGJveFNpemUsIGJveFNpemUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBibGlua0N1cnJlbnRQaXhlbChzdGF0ZTogUHJvZ3JlbVN0YXRlLCBpbmNyZW1udDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBjb2xvciA9ICdibGFjayc7XG4gICAgICAgIGlmIChpbmNyZW1udCAlIDIgPT09IDApIHtcbiAgICAgICAgICAgIGNvbG9yID0gJ2FudGlxdWV3aGl0ZSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb2xvckN1cnJlbnRQaXhlbChzdGF0ZSwgY29sb3IpO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgZmlyZVN0YXJ0SXRlcmF0aW5nQ29kZSAoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBPYnNlcnZhYmxlLmludGVydmFsKHRoaXMuYmxpbmtJbnRlcnZhbCwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIpLnN1YnNjcmliZSh0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuYmxpbmtDdXJyZW50UGl4ZWwoc3RhdGUsIHQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmaXJlR3JpZENoYW5nZSAoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYm94U2l6ZSA9IHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG4gICAgICAgIGxldCBjID0gc3RhdGUuY29sb25uZTtcbiAgICAgICAgbGV0IGwgPSBzdGF0ZS5saWduZTtcbiAgICAgICAgbGV0IGYgPSBzdGF0ZS5mcmFtZTtcblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGxldCBjb3VsZXVyID0gY29sb3JlclByb2dyZW0oYywgbCwgZiwgc3RhdGUuY29udGV4dGUpO1xuICAgICAgICBpZiAoY291bGV1cikge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY291bGV1cjtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KGMgKiBib3hTaXplLCBsICogYm94U2l6ZSwgYm94U2l6ZSwgYm94U2l6ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemUgKiB0aGlzLnByb2dyZW1Db25maWcubm9tYnJlQ29sb25uZXM7XG4gICAgICAgIGxldCBoZWlnaHQgPSB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplICogdGhpcy5wcm9ncmVtQ29uZmlnLm5vbWJyZUxpZ25lcztcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnYW50aXF1ZXdoaXRlJztcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuXG59Il0sInNvdXJjZVJvb3QiOiIifQ==