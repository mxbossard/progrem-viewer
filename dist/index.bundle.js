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
let progremConfig = new ProgremService_1.ProgremConfig(17, 17, 1);
ProgremService_1.ProgremService.buildProgrem('./progrems/coeur_progrem.js', screenConfig, progremConfig);


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
        if (this.htmlContainer && htmlVerse) {
            this.htmlContainer.appendChild(htmlVerse);
        }
    }
    fireGridChange(state) {
        if (this.htmlContainer) {
            this.htmlContainer.innerHTML = '';
        }
    }
}
exports.VariableScopeComponent = VariableScopeComponent;


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
            console.log(`content: [${content}]`);
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
        console.log('Built couplet:', couplet);
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
        // Call just evaluated initialiserProgrem function
        // @ts-ignore
        let initialContexte = initialiserProgrem(this.config.colonnes, this.config.lignes);
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
            return newState;
        }
        //console.log('Finished iterating over code.')
        let notifyPixelChange = false;
        let notifyLineChange = false;
        let notifyFrameChange = false;
        let _colonne = this.state.colonne;
        let _ligne = this.state.ligne;
        let _frame = this.state.frame;
        _colonne++;
        notifyPixelChange = true;
        if (_colonne >= this.config.colonnes) {
            _colonne = 0;
            _ligne++;
            notifyLineChange = true;
        }
        if (_ligne > this.config.lignes) {
            _ligne = 0;
            _frame++;
            notifyFrameChange = true;
        }
        if (_frame > this.config.frames) {
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
        this.state = newState;
        //this.codeIterator = this.code.iterator(newState);
        this.codeIterator = null;
        return newState;
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
        htmlCouplet.classList.add('progrem-inspector');
        //let htmlVerses = this.couplet.verses.map(v => this.buildNode(v.node));
        //let htmlCouplet = HtmlHelper.span('couplet', htmlVerses);
        //console.log('htmlVersesMap:', this.htmlVersesMap);
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
        console.log('style', style);
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
class ProgremConfig {
    constructor(colonnes, lignes, frames) {
        this.colonnes = colonnes;
        this.lignes = lignes;
        this.frames = frames;
    }
}
exports.ProgremConfig = ProgremConfig;
var ProgremService;
(function (ProgremService) {
    var previousRepaintTime = 0;
    var scheduler;
    function buildProgrem(url, screenConfig, progremConfig) {
        let progremScript = document.createElement('script');
        progremScript.src = url;
        let bodyElement = document.querySelector('body');
        if (bodyElement) {
            bodyElement.appendChild(progremScript);
        }
        CodeService_1.CodeService.loadProgrem(url).then(code => {
            let progremCode = CodeService_1.CodeService.progremFactory.buildProgrem(code);
            let progremCouplet = progremCode.colorerProgremFunction();
            console.log('progrem AST:', progremCode.colorerProgremFunction);
            // Load initProgrem Function code
            let initProgremFunctionCode = escodegen_1.generate(progremCode.initialiserProgremFunction().functionRootNode);
            window.eval(initProgremFunctionCode);
            scheduler = SchedulingService_1.SchedulingService.buildProgremScheduler(progremConfig, progremCode);
            //let progremInspector = new BasicHtmlEsprimaProgremInspector(progremCode, scheduler, document);
            let progremInspectorContainer = document.querySelector('.progrem-inspector-component');
            if (progremInspectorContainer) {
                let progremInspectorDecorators = new Types_1.StyleDecoratorAggregation([
                    new EsprimaProgremInspectorStyleDecorators_1.PadVerseDecorator(),
                    new EsprimaProgremInspectorStyleDecorators_1.ColorVerseVariableDecorator(),
                ]);
                let progremInspectorFactory = new EsprimaProgremInspectorHtmlFactory_1.EsprimaProgremInspectorHtmlFactory(progremCouplet, progremInspectorDecorators);
                let progremInspectorView = new ProgremInspectorComponent_1.ProgremInspectorComponent(scheduler, progremInspectorFactory);
                //console.log('codeElement', codeElement);
                let progremInspectorHtml = progremInspectorView.renderHtml();
                progremInspectorContainer.appendChild(progremInspectorHtml);
                let decoratorStyle = progremInspectorDecorators.buildStyleSheet();
                //console.log('decoratorStyle:', decoratorStyle)
                HtmlHelper_1.HtmlHelper.defineCssRules('progrem-inspector-component', decoratorStyle);
            }
            let progremGridContainer = document.querySelector('.progrem-grid-component');
            if (progremGridContainer) {
                let progremGridComponent = new ProgremGridComponent_1.ProgremGridComponent(screenConfig, progremConfig, scheduler, document);
                let progremGridHtml = progremGridComponent.renderHtml();
                progremGridContainer.appendChild(progremGridHtml);
            }
            let variableScopeContainer = document.querySelector('.variable-scope-component');
            if (variableScopeContainer) {
                let variableScopeDecorators = new Types_1.StyleDecoratorAggregation([
                    new EsprimaVariableScopeStyleDecorators_1.ColorVariableScopeDecorator()
                ]);
                let htmlFactory = new EsprimaVariableScopeHtmlFactory_1.EsprimaVariableScopeHtmlFactory(progremCouplet, variableScopeDecorators, scheduler);
                let variableScopeComponent = new VariableScopeComponent_1.VariableScopeComponent(scheduler, htmlFactory);
                let variableScopeHtml = variableScopeComponent.renderHtml();
                variableScopeContainer.appendChild(variableScopeHtml);
                let decoratorStyle = variableScopeDecorators.buildStyleSheet();
                //console.log('decoratorStyle:', decoratorStyle)
                HtmlHelper_1.HtmlHelper.defineCssRules('variable-scope-component', decoratorStyle);
            }
            timer(0);
        });
    }
    ProgremService.buildProgrem = buildProgrem;
    function timer(timestamp) {
        window.requestAnimationFrame(timer);
        if (timestamp - previousRepaintTime < 1000) {
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
        // FIXME il faudrait parcourir l'arbre AST avec un walker ou un truc du genre.
        // FIXME gros hack du système de HtmlFactory et de Decorator pour realiser ce composant.
        // Build all VariableHint which will be added in view container one by one by getHtmlVerse()
        this.couplet.verses.forEach(v => {
            let varHints = this.buildVariableHints(v.node);
            let decoratedVarHints = [];
            varHints.forEach((varHint, varName) => {
                let decorated = this.decorator.decorate(varName, varHint);
                decoratedVarHints.push(decorated);
            });
            this.varHintByVersesMap.set(v.node, decoratedVarHints);
        });
        return HtmlHelper_1.HtmlHelper.span('variable-scope-component');
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
        let verseContainer = HtmlHelper_1.HtmlHelper.span('verse-container', htmlElements);
        return verseContainer;
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
        this.canvas.width = this.progremConfig.colonnes * this.screenConfig.boxSize;
        this.canvas.height = this.progremConfig.colonnes * this.screenConfig.boxSize;
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
            color = 'white';
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
        // @ts-ignore
        let couleur = colorerProgrem(c, l, state.contexte);
        if (couleur) {
            this.ctx.fillStyle = couleur;
            this.ctx.fillRect(c * boxSize, l * boxSize, boxSize, boxSize);
        }
    }
    clear() {
        let width = this.screenConfig.boxSize * this.progremConfig.colonnes;
        let height = this.screenConfig.boxSize * this.progremConfig.lignes;
        this.ctx.clearRect(0, 0, width, height);
    }
}
exports.ProgremGridComponent = ProgremGridComponent;


/***/ })

},[["/7QA","runtime","npm.rxjs-compat","npm.rxjs","npm.escodegen","npm.esutils","npm.estraverse","npm.webpack","npm.esprima-walk","npm.esprima","npm.js-md5","npm.process","npm.tslib"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9yU3R5bGVEZWNvcmF0b3JzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92YXJpYWJsZVNjb3BlL1ZhcmlhYmxlU2NvcGVDb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvSHRtbEhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXNwcmltYS9CYXNpY0VzcHJpbWFQcm9ncmVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL0V2YWxTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL1NjaGVkdWxpbmdTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3Byb2dyZW1JbnNwZWN0b3IvRXNwcmltYVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL1Byb2dyZW1JbnNwZWN0b3JDb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdmFyaWFibGVTY29wZS9Fc3ByaW1hVmFyaWFibGVTY29wZVN0eWxlRGVjb3JhdG9ycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9Qcm9ncmVtU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92YXJpYWJsZVNjb3BlL0VzcHJpbWFWYXJpYWJsZVNjb3BlSHRtbEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvVHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvQ29kZVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvU2NyZWVuU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXNwcmltYS9Fc3ByaW1hSGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL0NvbG9yU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtR3JpZC9Qcm9ncmVtR3JpZENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBR0EsbUdBQXdFO0FBQ3hFLGtGQUF1RDtBQUV2RCxNQUFhLDJCQUEyQjtJQUF4QztRQUVZLGdCQUFXLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDN0Msa0JBQWEsR0FBa0IsMkJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQTZDcEYsQ0FBQztJQTNDRyxRQUFRLENBQUMsSUFBYyxFQUFFLE9BQW9CO1FBQ3pDLElBQUksS0FBSyxDQUFDO1FBRVYsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRTtZQUM1QixJQUFJLENBQUMsR0FBRyxJQUFrQixDQUFDO1lBQzNCLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ2xCO1FBRUQsSUFBSSxLQUFLLEVBQUU7WUFDUCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNYLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN6QztZQUVELE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsQ0FBQztTQUNqRDtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2Ysd0RB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QUNiLElBQUksT0FBTyxHQUFHLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztZQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsR0FBRyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2pFO0lBQ0wsQ0FBQztJQUVTLEtBQUs7UUFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUNwRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUNuRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDO0NBRUo7QUF0RkQsb0RBc0ZDIiwiZmlsZSI6ImluZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0eWxlRGVjb3JhdG9yLCBDb2xvclByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IEJhc2VOb2RlLCBJZGVudGlmaWVyIH0gZnJvbSBcImVzdHJlZVwiO1xuXG5pbXBvcnQgeyBQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50IH0gZnJvbSBcIi4vUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvQ29sb3JTZXJ2aWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBDb2xvclZlcnNlVmFyaWFibGVEZWNvcmF0b3IgaW1wbGVtZW50cyBTdHlsZURlY29yYXRvcjxCYXNlTm9kZT4ge1xuXG4gICAgcHJpdmF0ZSB2YXJpYWJsZU1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKTtcbiAgICBwcml2YXRlIGNvbG9yUHJvdmlkZXI6IENvbG9yUHJvdmlkZXIgPSBDb2xvclNlcnZpY2UuY29sb3JQcm92aWRlcmFjdG9yeS5idWlsZCgpO1xuXG4gICAgZGVjb3JhdGUobm9kZTogQmFzZU5vZGUsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgdmFySWQ7XG5cbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0lkZW50aWZpZXInKSB7XG4gICAgICAgICAgICBsZXQgbiA9IG5vZGUgYXMgSWRlbnRpZmllcjtcbiAgICAgICAgICAgIHZhcklkID0gbi5uYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhcklkKSB7XG4gICAgICAgICAgICBsZXQgdmFySW5kZXggPSB0aGlzLnZhcmlhYmxlTWFwLmdldCh2YXJJZCk7XG4gICAgICAgICAgICBpZiAoIXZhckluZGV4KSB7XG4gICAgICAgICAgICAgICAgdmFySW5kZXggPSB0aGlzLnZhcmlhYmxlTWFwLnNpemUgKyAxO1xuICAgICAgICAgICAgICAgIHRoaXMudmFyaWFibGVNYXAuc2V0KHZhcklkLCB2YXJJbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndmFyaWFibGUnKTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndmFyaWFibGUtJyArIHZhckluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0gICAgXG4gICAgXG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBzdHlsZSA9ICcnO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCd2YXJpYWJsZSBjb3VudDonLCB0aGlzLnZhcmlhYmxlTWFwLnNpemUpO1xuICAgICAgICB0aGlzLnZhcmlhYmxlTWFwLmZvckVhY2goKGluZGV4LCBpZCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5jb2xvclByb3ZpZGVyLmhhc2hTdHJpbmdUb0NvbG9yKGlkLCAxNik7IC8vdGhpcy52YXJpYWJsZU1hcC5zaXplXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdidWlsZGluZyBjb2xvciAjJywgaWQsICc9PicsIGNvbG9yKTtcbiAgICAgICAgICAgIHN0eWxlICs9IGBcbiAgICAgICAgICAgICAgICAudmFyaWFibGUge1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLjFlbSAwLjVlbSAwLjFlbSAwLjVlbTtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDAuOGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAuJHtQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTU30gLnZhcmlhYmxlLSR7aW5kZXh9LmlkZW50aWZpZXIsIFxuICAgICAgICAgICAgICAgIC4ke1Byb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VURURfQ0xBU1N9IC52YXJpYWJsZS0ke2luZGV4fS5pZGVudGlmaWVyIHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcn07XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGA7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGFkVmVyc2VEZWNvcmF0b3IgaW1wbGVtZW50cyBTdHlsZURlY29yYXRvcjxCYXNlTm9kZT4ge1xuXG4gICAgZGVjb3JhdGUobm9kZTogQmFzZU5vZGUsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvZGUtcGFkZGluZycpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9ICAgIFxuICAgIFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYFxuICAgICAgICAuY29kZS1wYWRkaW5nIHtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAzMnB4O1xuICAgICAgICB9XG4gICAgICAgIGA7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBQcm9ncmVtU2VydmljZSwgUHJvZ3JlbUNvbmZpZyB9IGZyb20gXCIuL2NvcmUvUHJvZ3JlbVNlcnZpY2VcIjtcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gXCIuL2NvcmUvU2NyZWVuU2VydmljZVwiO1xuXG5sZXQgc2NyZWVuQ29uZmlnID0gbmV3IFNjcmVlbkNvbmZpZygyMCk7XG5sZXQgcHJvZ3JlbUNvbmZpZyA9IG5ldyBQcm9ncmVtQ29uZmlnKDE3LCAxNywgMSk7XG5cblByb2dyZW1TZXJ2aWNlLmJ1aWxkUHJvZ3JlbSgnLi9wcm9ncmVtcy9jb2V1cl9wcm9ncmVtLmpzJywgc2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnKTsiLCJpbXBvcnQgeyBQcm9ncmVtQ29tcG9uZW50LCBHcmlkQ2hhbmdlTGlzdGVuZXIsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgUHJvZ3JlbVN0YXRlLCBDb2xvclByb3ZpZGVyLCBQcm9ncmVtU2NoZWR1bGVyLCBIdG1sQ291cGxldEZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgRXNwcmltYUhlbHBlciB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFIZWxwZXJcIjtcbmltcG9ydCB7IFZhcmlhYmxlRGVjbGFyYXRpb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBGdW5jdGlvbkRlY2xhcmF0aW9uIH0gZnJvbSBcImVzdHJlZVwiO1xuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvQ29sb3JTZXJ2aWNlXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5cbmV4cG9ydCBjbGFzcyBWYXJpYWJsZVNjb3BlQ29tcG9uZW50IGltcGxlbWVudHMgUHJvZ3JlbUNvbXBvbmVudCwgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyLCBHcmlkQ2hhbmdlTGlzdGVuZXIge1xuXG4gICAgcHJpdmF0ZSBodG1sQ29udGFpbmVyOiBIVE1MRWxlbWVudHxudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIGNvbG9yUHJvdmlkZXI6IENvbG9yUHJvdmlkZXIgPSBDb2xvclNlcnZpY2UuY29sb3JQcm92aWRlcmFjdG9yeS5idWlsZCgpO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogUHJvZ3JlbVNjaGVkdWxlcixcbiAgICAgICAgcHJpdmF0ZSBodG1sRmFjdG9yeTogSHRtbENvdXBsZXRGYWN0b3J5PGFueT5cbiAgICApIHtcbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUNvZGVFeGVjdXRpb24odGhpcyk7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVHcmlkQ2hhbmdlKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbmRlckh0bWwoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgaHRtbENvbXBvbmVudCA9IHRoaXMuaHRtbEZhY3RvcnkuYnVpbGRDb3VwbGV0KCk7XG4gICAgICAgIHRoaXMuaHRtbENvbnRhaW5lciA9IGh0bWxDb21wb25lbnQ7XG4gICAgICAgIHJldHVybiBodG1sQ29tcG9uZW50O1xuICAgIH1cblxuICAgIGZpcmVDb2RlRXhlY3V0aW9uKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFzdGF0ZS52ZXJzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0bWxWZXJzZSA9IHRoaXMuaHRtbEZhY3RvcnkuZ2V0SHRtbFZlcnNlKHN0YXRlLnZlcnNlKTtcbiAgICAgICAgaWYgKHRoaXMuaHRtbENvbnRhaW5lciAmJiBodG1sVmVyc2UpIHtcbiAgICAgICAgICAgIHRoaXMuaHRtbENvbnRhaW5lci5hcHBlbmRDaGlsZChodG1sVmVyc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmlyZUdyaWRDaGFuZ2Uoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5odG1sQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmh0bWxDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBIdG1sSGVscGVyIHtcblxuICAgIHN0YXRpYyBhZGRDbGFzc2VzKGVsdDogSFRNTEVsZW1lbnQsIGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBpZiAodHlwZW9mIGNsYXNzZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnNwbGl0KCcgJykuZm9yRWFjaChjID0+IGVsdC5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjbGFzc2VzKSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5mb3JFYWNoKGMgPT4gZWx0LmNsYXNzTGlzdC5hZGQoYykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHNwYW4oY2xhc3Nlczogc3RyaW5nfHN0cmluZ1tdLCBjb250ZW50Pzogc3RyaW5nfEhUTUxFbGVtZW50fChIVE1MRWxlbWVudHxzdHJpbmcpW10pOiBIVE1MU3BhbkVsZW1lbnQge1xuICAgICAgICByZXR1cm4gSHRtbEhlbHBlci50YWcoJ3NwYW4nLCBjbGFzc2VzLCBjb250ZW50KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcChjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxQYXJhZ3JhcGhFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIudGFnKCdwJywgY2xhc3NlcywgY29udGVudCkgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpdihjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxEaXZFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIudGFnKCdkaXYnLCBjbGFzc2VzLCBjb250ZW50KSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2FudmFzKGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSwgY29udGVudD86IHN0cmluZ3xIVE1MRWxlbWVudHwoSFRNTEVsZW1lbnR8c3RyaW5nKVtdKTogSFRNTENhbnZhc0VsZW1lbnQge1xuICAgICAgICByZXR1cm4gSHRtbEhlbHBlci50YWcoJ2NhbnZhcycsIGNsYXNzZXMsIGNvbnRlbnQpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHRhZyh0YWdOYW1lOiBzdHJpbmcsIGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSwgY29udGVudD86IHN0cmluZ3xIVE1MRWxlbWVudHwoSFRNTEVsZW1lbnR8c3RyaW5nKVtdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgZWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICAgICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgICAgIEh0bWxIZWxwZXIuYWRkQ2xhc3NlcyhlbHQsIGNsYXNzZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZWx0LmlubmVyVGV4dCA9IGNvbnRlbnQ7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgY29udGVudDogWyR7Y29udGVudH1dYCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBlbHQuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjb250ZW50KSkge1xuICAgICAgICAgICAgY29udGVudC5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgZWx0LmlubmVySFRNTCArPSBjO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYykge1xuICAgICAgICAgICAgICAgICAgICBlbHQuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBhZGQgY29udGVudDonLCBjKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWZpbmVDc3NSdWxlcyhpZDogc3RyaW5nLCBjc3NSdWxlczogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBjc3NJZCA9ICdjc3MtJyArIGlkO1xuICAgICAgICBsZXQgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3NzSWQpO1xuICAgICAgICBpZighc3R5bGVFbGVtZW50KSB7XG4gICAgICAgICAgICBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICB9XG4gICAgICAgIHN0eWxlRWxlbWVudC5pZCA9IGNzc0lkO1xuICAgICAgICAvKiBhZGQgc3R5bGUgcnVsZXMgdG8gdGhlIHN0eWxlIGVsZW1lbnQgKi9cbiAgICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzc1J1bGVzKSk7XG4gICAgICAgIFxuICAgICAgICAvKiBhdHRhY2ggdGhlIHN0eWxlIGVsZW1lbnQgdG8gdGhlIGRvY3VtZW50IGhlYWQgKi9cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbn0iLCJcbmltcG9ydCB7IFByb2dyYW0sIHBhcnNlTW9kdWxlLCBQYXJzZU9wdGlvbnMgfSBmcm9tICdlc3ByaW1hJztcbmltcG9ydCB7IHdhbGsgYXMgZXNwcmltYVdhbGssIHdhbGtBZGRQYXJlbnQgYXMgZXNwcmltYVdhbGtBZGRQYXJlbnQgfSBmcm9tICdlc3ByaW1hLXdhbGsnO1xuaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgQmFzZU5vZGUsIEZ1bmN0aW9uRGVjbGFyYXRpb24sIEJsb2NrU3RhdGVtZW50LCBJZlN0YXRlbWVudCwgUmV0dXJuU3RhdGVtZW50LCBTdGF0ZW1lbnQgfSBmcm9tICdlc3RyZWUnO1xuaW1wb3J0IHsgRXNwcmltYVZlcnNlSXRlcmFvciwgRXNwcmltYVZlcnNlLCBFc3ByaW1hQ291cGxldCwgRXNwcmltYVByb2dyZW1GYWN0b3J5LCBFc3ByaW1hUHJvZ3JlbSB9IGZyb20gJy4vRXNwcmltYVR5cGVzJztcbmltcG9ydCB7IEVzcHJpbWFIZWxwZXIgfSBmcm9tICcuL0VzcHJpbWFIZWxwZXInO1xuaW1wb3J0IHsgQ29kZVNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL0NvZGVTZXJ2aWNlJztcbmltcG9ydCB7IFByb2dyZW1TdGF0ZSB9IGZyb20gJy4uL2NvcmUvVHlwZXMnO1xuXG5jbGFzcyBCYXNpY0VzcHJpbWFDb2RlSXRlcmF0b3IgaW1wbGVtZW50cyBFc3ByaW1hVmVyc2VJdGVyYW9yIHtcblxuICAgIHByaXZhdGUgc3RhY2s6IEJhc2VOb2RlW10gPSBbXTtcbiAgICBwcml2YXRlIHJldHVyblZhbHVlOiBhbnkgPSBudWxsO1xuICAgIHByaXZhdGUgZmluaXNoZWQgPSBmYWxzZVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgICAgICBwcml2YXRlIHJvb3ROb2RlOiBCYXNlTm9kZSwgXG4gICAgICAgICAgICBwcml2YXRlIHN0YXRlOiBQcm9ncmVtU3RhdGUpIHtcbiAgICAgICAgdGhpcy5zdGFjay5wdXNoKHJvb3ROb2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlY2xhcmVQcm9ncmVtQXJndW1lbnRzKCkge1xuICAgICAgICBsZXQgX2NvbG9ubmUgPSB0aGlzLnN0YXRlLmNvbG9ubmU7XG4gICAgICAgIGxldCBfbGlnbmUgPSB0aGlzLnN0YXRlLmxpZ25lO1xuICAgICAgICBsZXQgX2NvbnRleHRlID0gdGhpcy5zdGF0ZS5jb250ZXh0ZTtcblxuICAgICAgICB0aGlzLnN0YXRlLmV2YWwoJ3ZhciBjb2xvbm5lID0gJyArIF9jb2xvbm5lICsgJywgbGlnbmUgPSAnICsgX2xpZ25lICsgJzsnKTtcbiAgICAgICAgdGhpcy5zdGF0ZS5ldmFsKCd2YXIgY29udGV4dGUgPSAnICsgSlNPTi5zdHJpbmdpZnkoX2NvbnRleHRlKSk7XG4gICAgfVxuXG4gICAgZXhlY3V0ZU5leHQoKTogRXNwcmltYVZlcnNlIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBmaXJzdCBub2RlIG9uIHRoZSBzdGFja1xuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnN0YWNrLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ05vZGU6Jywgbm9kZSk7XG5cbiAgICAgICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RhY2sgc2hvdWxkIG5vdCBiZSBlbXB0eSAhJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzdG10O1xuXG4gICAgICAgICAgICBzd2l0Y2gobm9kZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIGxldCBmdW5jID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoZnVuYy5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWNsYXJlUHJvZ3JlbUFyZ3VtZW50cygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRWZXJzZShmdW5jKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdCbG9ja1N0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9jayA9IG5vZGUgYXMgQmxvY2tTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrLmJvZHkuc2xpY2UoKS5yZXZlcnNlKCkubWFwKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnQmxvY2tTdGF0ZW1lbnQgdW5zaGlmdGluZzonLCB4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdCh4KVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdJZlN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIHN0bXQgPSBub2RlIGFzIElmU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdENvZGUgPSBlc2NvZGVHZW5lcmF0ZShzdG10LnRlc3QpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0UmVzdWx0ID0gdGhpcy5zdGF0ZS5ldmFsKHRlc3RDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnSWZTdGF0ZW1lbnQgdGVzdCBldmFsdWF0ZSB0bzogJywgdGVzdFJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXN0UmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdUaGVuIHVuc2hpZnRpbmc6Jywgc3RtdC5jb25zZXF1ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdChzdG10LmNvbnNlcXVlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0bXQuYWx0ZXJuYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnRWxzZSB1bnNoaWZ0aW5nOicsIHN0bXQuYWx0ZXJuYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoc3RtdC5hbHRlcm5hdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkVmVyc2Uoc3RtdCk7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdSZXR1cm5TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBzdG10ID0gbm9kZSBhcyBSZXR1cm5TdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV0dXJuVmFsdWUgPSB0aGlzLnN0YXRlLmV2YWwoZXNjb2RlR2VuZXJhdGUoc3RtdC5hcmd1bWVudCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkVmVyc2Uoc3RtdCk7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdOb2RlOicsIG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29kZSA9IGVzY29kZUdlbmVyYXRlKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdHZW5lcmF0ZWQgY29kZTonLCBjb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGV2YWxSZXN1bHQgPSB0aGlzLnN0YXRlLmV2YWwoY29kZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0V2YWx1YXRlIHRvOicsIGV2YWxSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRWZXJzZShub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAodGhpcy5zdGFjay5sZW5ndGggPiAwKTtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0l0ZXJhdG9yIGhhcyBubyBtb3JlIGNvZGUgdG8gZXhlY3V0ZSAhJyk7XG4gICAgfSAgICBcbiAgICBcbiAgICBoYXNOZXh0KCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5maW5pc2hlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5vZGVzID0gdGhpcy5zdGFjay5zbGljZSgwKTtcbiAgICAgICAgd2hpbGUgKG5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gbm9kZXMuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudHlwZSAhPT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2tzOiBCbG9ja1N0YXRlbWVudFtdID0gW107XG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9jayA9IG5vZGUgYXMgQmxvY2tTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKGJsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGFyc291cnMgcmVjdXJzaXZlbWVudCBsZXMgYmxvY2tzIMOgIGxhIHJlY2hlcmNoZSBkZSBub2V1ZCBxdWkgbmUgc29udCBwYXMgZGVzIGJsb2Nrc1xuICAgICAgICAgICAgICAgICAgICBsZXQgaGFzTmV4dCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIWhhc05leHQgJiYgYmxvY2tzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiID0gYmxvY2tzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGIuYm9keS5tYXAoeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4LnR5cGUgIT09ICdCbG9ja1N0YXRlbWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc05leHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzTmV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljRXNwcmltYVByb2dyZW0gaW1wbGVtZW50cyBFc3ByaW1hUHJvZ3JlbSB7XG5cbiAgICBwcml2YXRlIGVzcHJpbWFQcm9ncmFtOiBQcm9ncmFtO1xuXG4gICAgY29uc3RydWN0b3IoY29kZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBjb25maWc6IFBhcnNlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbW1lbnQ6IHRydWUsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lc3ByaW1hUHJvZ3JhbSA9IHBhcnNlTW9kdWxlKGNvZGUsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHdhbGtQcm9ncmVtQ291cGxldChmdW5jdGlvbk5hbWU6IHN0cmluZyk6IEVzcHJpbWFDb3VwbGV0IHtcbiAgICAgICAgdmFyIGZ1bmNOb2RlOiBGdW5jdGlvbkRlY2xhcmF0aW9uIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIHZhciB2ZXJzZXM6IEJhc2VOb2RlW10gPSBbXTtcbiAgICAgICAgZXNwcmltYVdhbGtBZGRQYXJlbnQodGhpcy5lc3ByaW1hUHJvZ3JhbSwgbm9kZSA9PiB7XG4gICAgICAgICAgICBpZiggbm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicgJiYgbm9kZS5pZCAmJiBub2RlLmlkLm5hbWUgPT09IGZ1bmN0aW9uTmFtZSkge1xuICAgICAgICAgICAgICAgIGZ1bmNOb2RlID0gbm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmdW5jTm9kZSAmJiBFc3ByaW1hSGVscGVyLmlzQ2hpbGROb2RlT2Yobm9kZSwgZnVuY05vZGUpKSB7IC8vICYmIEVzcHJpbWFIZWxwZXIuaXNOb3RDaGlsZE5vZGVPZihub2RlLCB2ZXJzZXMpXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nIFxuICAgICAgICAgICAgICAgICAgICB8fCBub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJ1xuICAgICAgICAgICAgICAgICAgICB8fCBub2RlLnR5cGUgPT09ICdFeHByZXNzaW9uU3RhdGVtZW50J1xuICAgICAgICAgICAgICAgICAgICB8fCBub2RlLnR5cGUgPT09ICdSZXR1cm5TdGF0ZW1lbnQnXG4gICAgICAgICAgICAgICAgICAgIHx8IG5vZGUudHlwZSA9PT0gJ0lmU3RhdGVtZW50JyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSApO1xuICAgICAgICBpZiAoZnVuY05vZGUpIHtcbiAgICAgICAgICAgIHZlcnNlcy51bnNoaWZ0KGZ1bmNOb2RlKTtcbiAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZENvdXBsZXQoZnVuY05vZGUsIHZlcnNlcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbXBvc3NpYmxlIGRlIHRyb3V2ZXIgbGEgZm9uY3Rpb24gJHtmdW5jdGlvbk5hbWV9KCkgIWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpOiBFc3ByaW1hQ291cGxldCB7XG4gICAgICAgIHJldHVybiB0aGlzLndhbGtQcm9ncmVtQ291cGxldCgnaW5pdGlhbGlzZXJQcm9ncmVtJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKTogRXNwcmltYUNvdXBsZXQge1xuICAgICAgICByZXR1cm4gdGhpcy53YWxrUHJvZ3JlbUNvdXBsZXQoJ2NvbG9yZXJQcm9ncmVtJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGl0ZXJhdG9yKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiBFc3ByaW1hVmVyc2VJdGVyYW9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCYXNpY0VzcHJpbWFDb2RlSXRlcmF0b3IodGhpcy5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCkuZnVuY3Rpb25Sb290Tm9kZSwgc3RhdGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljRXNwcmltYVByb2dyZW1GYWN0b3J5IGltcGxlbWVudHMgRXNwcmltYVByb2dyZW1GYWN0b3J5IHtcblxuICAgIGJ1aWxkUHJvZ3JlbShjb2RlOiBzdHJpbmcpOiBFc3ByaW1hUHJvZ3JlbSB7XG4gICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBvc3NpYmxlIHRvIGJ1aWxkIFByb2dyZW0gd2l0aG91dCBjb2RlICEnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEJhc2ljRXNwcmltYVByb2dyZW0oY29kZSk7XG4gICAgfVxuXG4gICAgYnVpbGRDb3VwbGV0KG5vZGU6IEZ1bmN0aW9uRGVjbGFyYXRpb24sIHZlcnNlczogQmFzZU5vZGVbXSk6IEVzcHJpbWFDb3VwbGV0IHtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcG9zc2libGUgdG8gYnVpbGQgZW1wdHkgQ291cGxldCAhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZXNwcmltYVZlcnNlcyA9IHZlcnNlcy5tYXAodGhpcy5idWlsZFZlcnNlKTtcblxuICAgICAgICBsZXQgY291cGxldDogRXNwcmltYUNvdXBsZXQgPSB7XG4gICAgICAgICAgICBmdW5jdGlvblJvb3ROb2RlOiBub2RlLFxuICAgICAgICAgICAgdmVyc2VzOiBlc3ByaW1hVmVyc2VzXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ0J1aWx0IGNvdXBsZXQ6JywgY291cGxldCk7XG4gICAgICAgIHJldHVybiBjb3VwbGV0O1xuICAgIH1cblxuICAgIGJ1aWxkVmVyc2Uobm9kZTogQmFzZU5vZGUpOiBFc3ByaW1hVmVyc2Uge1xuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW1wb3NzaWJsZSB0byBidWlsZCBlbXB0eSBWZXJzZSAhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY29kZSA9IG5vZGU7XG4gICAgICAgIGlmKG5vZGUudHlwZSA9PT0gJ0lmU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgY29kZSA9IChub2RlIGFzIElmU3RhdGVtZW50KS50ZXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZlcnNlOiBFc3ByaW1hVmVyc2UgPSB7IFxuICAgICAgICAgICAgbm9kZTogbm9kZSxcbiAgICAgICAgICAgIGNvZGU6IGNvZGVcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHZlcnNlO1xuICAgIH1cbn1cbiIsIlxuZXhwb3J0IGNsYXNzIEV2YWxTY29wZSB7XG5cbiAgICAvLyBTZWUgaHR0cDovL3BlcmZlY3Rpb25raWxscy5jb20vZ2xvYmFsLWV2YWwtd2hhdC1hcmUtdGhlLW9wdGlvbnMvXG4gICAgLy8gV2lsbCByZXR1cm4gYW4gZXZhbCBhYmxlIHRvIGV2YWx1YXRlIGpzIGNvZGUgaW4gdGhlIGdsb2JhbCBzY29wZS5cbiAgICBwdWJsaWMgcmVhZG9ubHkgZ2xvYmFsRXZhbCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdmFyIGlzSW5kaXJlY3RFdmFsR2xvYmFsID0gKGZ1bmN0aW9uIChvcmlnaW5hbCwgT2JqZWN0KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vIERvZXMgYE9iamVjdGAgcmVzb2x2ZSB0byBhIGxvY2FsIHZhcmlhYmxlLCBvciB0byBhIGdsb2JhbCwgYnVpbHQtaW4gYE9iamVjdGAsXG4gICAgICAgICAgICAgICAgLy8gcmVmZXJlbmNlIHRvIHdoaWNoIHdlIHBhc3NlZCBhcyBhIGZpcnN0IGFyZ3VtZW50P1xuICAgICAgICAgICAgICAgIHJldHVybiAoMSwgZXZhbCkoJ09iamVjdCcpID09PSBvcmlnaW5hbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBpbmRpcmVjdCBldmFsIGVycm9ycyBvdXQgKGFzIGFsbG93ZWQgcGVyIEVTMyksIHRoZW4ganVzdCBiYWlsIG91dCB3aXRoIGBmYWxzZWBcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKE9iamVjdCwgMTIzKTtcblxuICAgICAgICBpZiAoaXNJbmRpcmVjdEV2YWxHbG9iYWwpIHtcbiAgICAgICAgICAgIC8vIGlmIGluZGlyZWN0IGV2YWwgZXhlY3V0ZXMgY29kZSBnbG9iYWxseSwgdXNlIGl0XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV4cHJlc3Npb246IHN0cmluZykge1xuICAgICAgICAgICAgICAgIHJldHVybiAoMSwgZXZhbCkoZXhwcmVzc2lvbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHdpbmRvdy5leGVjU2NyaXB0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gaWYgYHdpbmRvdy5leGVjU2NyaXB0IGV4aXN0c2AsIHVzZSBpdFxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChleHByZXNzaW9uOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5leGVjU2NyaXB0KGV4cHJlc3Npb24pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG90aGVyd2lzZSwgZ2xvYmFsRXZhbCBpcyBgdW5kZWZpbmVkYCBzaW5jZSBub3RoaW5nIGlzIHJldHVybmVkXG4gICAgICAgIHJldHVybiAoZXhwcjogc3RyaW5nKSA9PiB7dGhyb3cgbmV3IEVycm9yKCdObyBnbG9iYWwgZXZhbCBhdmFpbGFibGUgIScpO31cbiAgICB9KSgpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG59XG4iLCJpbXBvcnQgeyBQcm9ncmVtQ29uZmlnIH0gZnJvbSBcIi4vUHJvZ3JlbVNlcnZpY2VcIjtcbmltcG9ydCB7IEV2YWxTY29wZSB9IGZyb20gXCIuL0V2YWxTZXJ2aWNlXCI7XG5pbXBvcnQgeyBQcm9ncmVtU2NoZWR1bGVyLCBWZXJzZUl0ZXJhdG9yLCBQcm9ncmVtQ29kZSwgUHJvZ3JlbVZlcnNlLCBTdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lciwgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyLCBHcmlkQ2hhbmdlTGlzdGVuZXIsIExpbmVDaGFuZ2VMaXN0ZW5lciwgRnJhbWVDaGFuZ2VMaXN0ZW5lciwgUHJvZ3JlbVN0YXRlIH0gZnJvbSBcIi4vVHlwZXNcIjtcblxuY2xhc3MgU2ltcGxlUHJvZ3JlbVNjaGVkdWxlciBpbXBsZW1lbnRzIFByb2dyZW1TY2hlZHVsZXIge1xuICAgIFxuICAgIHByaXZhdGUgc3RhdGU6IFByb2dyZW1TdGF0ZTtcbiAgICBwcml2YXRlIGNvZGVJdGVyYXRvcjogVmVyc2VJdGVyYXRvcjxhbnk+IHwgbnVsbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIHN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyczogU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgY29kZUV4ZWN1dGlvbkxpc3RlbmVyczogQ29kZUV4ZWN1dGlvbkxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGdyaWRDaGFuZ2VMaXN0ZW5lcnM6IEdyaWRDaGFuZ2VMaXN0ZW5lcltdID0gW107XG4gICAgcHJpdmF0ZSBsaW5lQ2hhbmdlTGlzdGVuZXJzOiBMaW5lQ2hhbmdlTGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgZnJhbWVDaGFuZ2VMaXN0ZW5lcnM6IEZyYW1lQ2hhbmdlTGlzdGVuZXJbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IFByb2dyZW1Db25maWcsIHByaXZhdGUgY29kZTogUHJvZ3JlbUNvZGU8YW55Pikge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5yZXNldCgpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZVN0YXJ0SXRlcmF0aW5nQ29kZShsaXN0ZW5lcjogU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfSAgICBcblxuICAgIHN1YnNjcmliZUNvZGVFeGVjdXRpb24obGlzdGVuZXI6IENvZGVFeGVjdXRpb25MaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvZGVFeGVjdXRpb25MaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfSAgICBcbiAgICBcbiAgICBzdWJzY3JpYmVHcmlkQ2hhbmdlKGxpc3RlbmVyOiBHcmlkQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ncmlkQ2hhbmdlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZUxpbmVDaGFuZ2UobGlzdGVuZXI6IExpbmVDaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmxpbmVDaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlRnJhbWVDaGFuZ2UobGlzdGVuZXI6IEZyYW1lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mcmFtZUNoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICByZXNldCgpOiBQcm9ncmVtU3RhdGUge1xuICAgICAgICAvLyBDYWxsIGp1c3QgZXZhbHVhdGVkIGluaXRpYWxpc2VyUHJvZ3JlbSBmdW5jdGlvblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGxldCBpbml0aWFsQ29udGV4dGU6IG9iamVjdCA9IGluaXRpYWxpc2VyUHJvZ3JlbSh0aGlzLmNvbmZpZy5jb2xvbm5lcywgdGhpcy5jb25maWcubGlnbmVzKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0xvYWRlZCBpbml0aWFsIGNvbnRleHRlOiAnLCBpbml0aWFsQ29udGV4dGUpO1xuICAgICAgICBsZXQgc3RhdGUgPSBuZXcgUHJvZ3JlbVN0YXRlKDAsIDAsIDAsIGluaXRpYWxDb250ZXh0ZSwgbnVsbCk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBjdXJyZW50KCk6IFByb2dyZW1TdGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cblxuICAgIG5leHQoKTogUHJvZ3JlbVN0YXRlIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlKSB0aHJvdyBuZXcgRXJyb3IoJ0luY29uc2lzdGVudCBQcm9ncmVtIHN0YXRlICEnKTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvZGVJdGVyYXRvciA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNvZGVJdGVyYXRvciA9IHRoaXMuY29kZS5pdGVyYXRvcih0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZVN0YXJ0SXRlcmF0aW5nQ29kZSh0aGlzLnN0YXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2NvbnNvbGUubG9nKCdoYXNOZXh0OicsIHRoaXMuY29kZUl0ZXJhdG9yLmhhc05leHQoKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29kZUl0ZXJhdG9yLmhhc05leHQoKSkge1xuICAgICAgICAgICAgbGV0IHN0YXRlbWVudCA9IHRoaXMuY29kZUl0ZXJhdG9yLmV4ZWN1dGVOZXh0KCk7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSBuZXcgUHJvZ3JlbVN0YXRlKHRoaXMuc3RhdGUuY29sb25uZSwgdGhpcy5zdGF0ZS5saWduZSwgdGhpcy5zdGF0ZS5mcmFtZSwgdGhpcy5zdGF0ZS5jb250ZXh0ZSwgc3RhdGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgIHRoaXMuY29kZUV4ZWN1dGlvbkxpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVDb2RlRXhlY3V0aW9uKG5ld1N0YXRlKSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgICAgIH1cblxuICAgICAgICAvL2NvbnNvbGUubG9nKCdGaW5pc2hlZCBpdGVyYXRpbmcgb3ZlciBjb2RlLicpXG5cbiAgICAgICAgbGV0IG5vdGlmeVBpeGVsQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIGxldCBub3RpZnlMaW5lQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIGxldCBub3RpZnlGcmFtZUNoYW5nZSA9IGZhbHNlO1xuXG4gICAgICAgIGxldCBfY29sb25uZSA9IHRoaXMuc3RhdGUuY29sb25uZTtcbiAgICAgICAgbGV0IF9saWduZSA9IHRoaXMuc3RhdGUubGlnbmU7XG4gICAgICAgIGxldCBfZnJhbWUgPSB0aGlzLnN0YXRlLmZyYW1lO1xuXG4gICAgICAgIF9jb2xvbm5lICsrO1xuICAgICAgICBub3RpZnlQaXhlbENoYW5nZSA9IHRydWU7XG5cbiAgICAgICAgaWYgKF9jb2xvbm5lID49IHRoaXMuY29uZmlnLmNvbG9ubmVzKSB7XG4gICAgICAgICAgICBfY29sb25uZSA9IDA7XG4gICAgICAgICAgICBfbGlnbmUgKys7XG4gICAgICAgICAgICBub3RpZnlMaW5lQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfbGlnbmUgPiB0aGlzLmNvbmZpZy5saWduZXMpIHtcbiAgICAgICAgICAgIF9saWduZSA9IDA7XG4gICAgICAgICAgICBfZnJhbWUgKys7XG4gICAgICAgICAgICBub3RpZnlGcmFtZUNoYW5nZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX2ZyYW1lID4gdGhpcy5jb25maWcuZnJhbWVzKSB7XG4gICAgICAgICAgICBfZnJhbWUgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5ld1N0YXRlID0gbmV3IFByb2dyZW1TdGF0ZShfY29sb25uZSwgX2xpZ25lLCBfZnJhbWUsIHRoaXMuc3RhdGUuY29udGV4dGUsIG51bGwpO1xuIFxuICAgICAgICBpZiAobm90aWZ5UGl4ZWxDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JpZENoYW5nZUxpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVHcmlkQ2hhbmdlKHRoaXMuc3RhdGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub3RpZnlMaW5lQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmVDaGFuZ2VMaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlTGluZUNoYW5nZSh0aGlzLnN0YXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm90aWZ5RnJhbWVDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVDaGFuZ2VMaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlRnJhbWVDaGFuZ2UodGhpcy5zdGF0ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICAvL3RoaXMuY29kZUl0ZXJhdG9yID0gdGhpcy5jb2RlLml0ZXJhdG9yKG5ld1N0YXRlKTtcbiAgICAgICAgdGhpcy5jb2RlSXRlcmF0b3IgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQcm9ncmVtKCk6IFByb2dyZW1Db2RlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2RlO1xuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBTY2hlZHVsaW5nU2VydmljZSB7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtU2NoZWR1bGVyKGNvbmZpZzogUHJvZ3JlbUNvbmZpZywgY29kZTogUHJvZ3JlbUNvZGU8YW55Pikge1xuICAgICAgICByZXR1cm4gbmV3IFNpbXBsZVByb2dyZW1TY2hlZHVsZXIoY29uZmlnLCBjb2RlKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBTdHlsZURlY29yYXRvciB9IGZyb20gXCIuLi8uLi9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNlTm9kZSwgRnVuY3Rpb25EZWNsYXJhdGlvbiwgQmxvY2tTdGF0ZW1lbnQsIElmU3RhdGVtZW50LCBWYXJpYWJsZURlY2xhcmF0b3IsIFZhcmlhYmxlRGVjbGFyYXRpb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBFeHByZXNzaW9uU3RhdGVtZW50LCBSZXR1cm5TdGF0ZW1lbnQsIElkZW50aWZpZXIsIE1lbWJlckV4cHJlc3Npb24gfSBmcm9tIFwiZXN0cmVlXCI7XG5pbXBvcnQgeyBIdG1sSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvSHRtbEhlbHBlclwiO1xuaW1wb3J0IHsgRXNwcmltYUhlbHBlciB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFIZWxwZXJcIjtcbmltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcbmltcG9ydCB7IEVzcHJpbWFWZXJzZSwgRXNwcmltYUh0bWxDb3VwbGV0RmFjdG9yeSwgRXNwcmltYUNvdXBsZXQgfSBmcm9tIFwiLi4vLi4vZXNwcmltYS9Fc3ByaW1hVHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIEVzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkgaW1wbGVtZW50cyBFc3ByaW1hSHRtbENvdXBsZXRGYWN0b3J5IHtcblxuICAgIHByaXZhdGUgaHRtbFZlcnNlc01hcDogTWFwPEJhc2VOb2RlLCBIVE1MRWxlbWVudD4gPSBuZXcgTWFwKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb3VwbGV0OiBFc3ByaW1hQ291cGxldCxcbiAgICAgICAgcHJpdmF0ZSBkZWNvcmF0b3I6IFN0eWxlRGVjb3JhdG9yPEJhc2VOb2RlPlxuICAgICkge31cblxuICAgIGJ1aWxkQ291cGxldCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBodG1sQ291cGxldCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuY291cGxldC5mdW5jdGlvblJvb3ROb2RlKTtcbiAgICAgICAgaHRtbENvdXBsZXQuY2xhc3NMaXN0LmFkZCgncHJvZ3JlbS1pbnNwZWN0b3InKTtcbiAgICAgICAgLy9sZXQgaHRtbFZlcnNlcyA9IHRoaXMuY291cGxldC52ZXJzZXMubWFwKHYgPT4gdGhpcy5idWlsZE5vZGUodi5ub2RlKSk7XG4gICAgICAgIC8vbGV0IGh0bWxDb3VwbGV0ID0gSHRtbEhlbHBlci5zcGFuKCdjb3VwbGV0JywgaHRtbFZlcnNlcyk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2h0bWxWZXJzZXNNYXA6JywgdGhpcy5odG1sVmVyc2VzTWFwKTtcbiAgICAgICAgcmV0dXJuIGh0bWxDb3VwbGV0O1xuICAgIH1cblxuICAgIGdldEh0bWxWZXJzZSh2ZXJzZTogRXNwcmltYVZlcnNlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAodGhpcy5odG1sVmVyc2VzTWFwLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbFN0YXRlRXJyb3I6IGNvdXBsZXQgbXVzdCBiZSBidWlsdCBiZWZvcmUgY2FsbGluZyBnZXRIdG1sVmVyc2UoKSAhJylcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodG1sRWxlbWVudCA9IHRoaXMuaHRtbFZlcnNlc01hcC5nZXQodmVyc2Uubm9kZSk7XG4gICAgICAgIGlmICghaHRtbEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBIVE1MRWxlbWVudCBmb3VuZCBtYXRjaGluZyB2ZXJzZTonLCB2ZXJzZSwgJyEnKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBIVE1MRWxlbWVudCBmb3VuZCBtYXRjaGluZyBzdXBwbGllZCB2ZXJzZSAhYCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBodG1sRWxlbWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZCBOb2RlIGFwcGx5aW5nIGRlY29yYXRvcnMuXG4gICAgICogXG4gICAgICogQHBhcmFtIG5vZGUgdGhlIG5vZGUgZm9yIHdoaWNoIHRvIHByb2R1Y2UgSFRNTFxuICAgICAqIEBwYXJhbSBzaWJsaW5ncyB0aGUgbm9kZXMgdG8gYWRkIGFzIHNpYmxpbmdzIG9mIHRoZSBub2RlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGJ1aWxkTm9kZShub2RlOiBCYXNlTm9kZSB8IHVuZGVmaW5lZCB8IG51bGwpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIuc3BhbignZW1wdHknLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNpYmxpbmdzOiBIVE1MRWxlbWVudFtdID0gW11cbiAgICAgICAgbGV0IGh0bWxPdXRwdXQgPSB0aGlzLmJ1aWxkTm9kZUludGVybmFsKG5vZGUsIHNpYmxpbmdzKTtcbiAgICAgICAgaHRtbE91dHB1dCA9IHRoaXMuZGVjb3JhdG9yLmRlY29yYXRlKG5vZGUsIGh0bWxPdXRwdXQpO1xuXG4gICAgICAgIGxldCBtYXRjaGluZ1ZlcnNlID0gdGhpcy5jb3VwbGV0LnZlcnNlcy5maW5kKHYgPT4gdi5ub2RlID09PSBub2RlKTtcbiAgICAgICAgaWYgKG1hdGNoaW5nVmVyc2UpIHtcbiAgICAgICAgICAgIGh0bWxPdXRwdXQgPSB0aGlzLmVuY2Fwc3VsYXRlTm9kZUluVmVyc2VDb250YWluZXIoaHRtbE91dHB1dCk7XG4gICAgICAgICAgICAvLyBUaGlzIG5vZGUgaXMgdGhlIHJvb3Qgbm9kZSBvZiBhIFZlcnNlXG4gICAgICAgICAgICB0aGlzLmh0bWxWZXJzZXNNYXAuc2V0KG1hdGNoaW5nVmVyc2Uubm9kZSwgaHRtbE91dHB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2libGluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gSWYgc2libGluZ3MsIGJ1aWxkIGVhY2ggc2libGluZ1xuICAgICAgICAgICAgaHRtbE91dHB1dCA9IEh0bWxIZWxwZXIuc3Bhbignc2libGluZy1jb250YWluZXInLCBodG1sT3V0cHV0KTtcbiAgICAgICAgICAgIHdoaWxlKHNpYmxpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgc2libGluZyA9IHNpYmxpbmdzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgc2libGluZ091dCA9IHRoaXMuYnVpbGROb2RlKHNpYmxpbmcpO1xuICAgICAgICAgICAgICAgICAgICBodG1sT3V0cHV0LmFwcGVuZENoaWxkKHNpYmxpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBodG1sT3V0cHV0O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBlbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGh0bWxFbHQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgY29udGVudCA9IEh0bWxIZWxwZXIuc3BhbigndmVyc2UtY29udGVudCcsIGh0bWxFbHQpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCd2ZXJzZSB2ZXJzZS1jb250YWluZXInLCBjb250ZW50KTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZCBub2RlLlxuICAgICAqIEBwYXJhbSBub2RlIFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBidWlsZE5vZGVJbnRlcm5hbChub2RlOiBCYXNlTm9kZSwgc2libGluZ3M6IEhUTUxFbGVtZW50W10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ0J1aWxkaW5nIG5vZGUnLCBub2RlLCAnLi4uJyk7XG4gICAgICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdGdW5jdGlvbkRlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEZ1bmN0aW9uRGVjbGFyYXRpb24obm9kZSwgc2libGluZ3MpO1xuICAgICAgICAgICAgY2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQmxvY2tTdGF0ZW1lbnQobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdJZlN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRJZlN0YXRlbWVudChub2RlLCBzaWJsaW5ncyk7XG4gICAgICAgICAgICBjYXNlICdWYXJpYWJsZURlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZFZhcmlhYmxlRGVjbGFyYXRpb24obm9kZSk7XG4gICAgICAgICAgICBjYXNlICdWYXJpYWJsZURlY2xhcmF0b3InOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkVmFyaWFibGVEZWNsYXJhdG9yKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnQXNzaWdubWVudEV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQXNzaWdubWVudEV4cHJlc3Npb24obm9kZSk7XG4gICAgICAgICAgICBjYXNlICdCaW5hcnlFeHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEJpbmFyeUV4cHJlc3Npb24obm9kZSk7XG4gICAgICAgICAgICBjYXNlICdFeHByZXNzaW9uU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEV4cHJlc3Npb25TdGF0ZW1lbnQobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdSZXR1cm5TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkUmV0dXJuU3RhdGVtZW50KG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnSWRlbnRpZmllcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRJZGVudGlmaWVyKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnTWVtYmVyRXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRNZW1iZXJFeHByZXNzaW9uKG5vZGUpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZERlZmF1bHQobm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRGdW5jdGlvbkRlY2xhcmF0aW9uKG5vZGU6IEJhc2VOb2RlLCBzaWJsaW5nczogSFRNTEVsZW1lbnRbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgICAgIFxuICAgICAgICBsZXQgZGVjbFN0YXJ0SXRlbXM6IChzdHJpbmcgfCBIVE1MRWxlbWVudClbXTtcbiAgICAgICAgaWYgKG4uaWQpIHtcbiAgICAgICAgICAgIGxldCBmdW5jSWQgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtaWQnLCBuLmlkLm5hbWUpO1xuICAgICAgICAgICAgZGVjbFN0YXJ0SXRlbXMgPSBbJ2Z1bmN0aW9uICcsIGZ1bmNJZCwgJyAoICddO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVjbFN0YXJ0SXRlbXMgPSBbJ2Z1bmN0aW9uICggJ107Ly8gKyBmdW5jLnBhcmFtcy5tYXAoeCA9PiB4Lm5hbWUpLmpvaW4oJywgJykgKyAnICkgeyc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFyYW1Db3VudCA9IG4ucGFyYW1zLmxlbmd0aDtcbiAgICAgICAgbi5wYXJhbXMuZm9yRWFjaCgocGFyYW0sIGkpID0+IHtcbiAgICAgICAgICAgIGxldCB2YXJOYW1lID0gRXNwcmltYUhlbHBlci5wYXR0ZXJuVG9TdHJpbmcocGFyYW0pO1xuICAgICAgICAgICAgbGV0IGZ1bmNQYXJhbSA9IHRoaXMuYnVpbGROb2RlKHBhcmFtKTsvL0h0bWxIZWxwZXIuc3BhbignZnVuYy1wYXJhbScsIHZhck5hbWUpO1xuICAgICAgICAgICAgZGVjbFN0YXJ0SXRlbXMucHVzaChmdW5jUGFyYW0pO1xuICAgICAgICAgICAgaWYgKGkgPCBwYXJhbUNvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgIGRlY2xTdGFydEl0ZW1zLnB1c2goJywgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlY2xTdGFydEl0ZW1zLnB1c2goJyApIHsnKTtcblxuICAgICAgICBsZXQgZGVjbFN0YXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLXN0YXJ0JywgZGVjbFN0YXJ0SXRlbXMpO1xuICAgICAgICBsZXQgZnVuY0JvZHkgPSB0aGlzLmJ1aWxkTm9kZShuLmJvZHkpO1xuICAgICAgICBsZXQgZGVjbEVuZCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1lbmQnLCAnfScpO1xuICAgICAgICBkZWNsRW5kID0gdGhpcy5lbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGRlY2xFbmQpO1xuICAgICAgICAvL2xldCBkZWNsID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLWRlY2xhcmF0aW9uJywgW2RlY2xTdGFydCwgZnVuY0JvZHksIGRlY2xFbmRdKTtcbiAgICAgICAgbGV0IGRlY2wgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtZGVjbGFyYXRpb24nLCBkZWNsU3RhcnQpO1xuICAgICAgICBzaWJsaW5ncy5wdXNoKGZ1bmNCb2R5KTtcbiAgICAgICAgc2libGluZ3MucHVzaChkZWNsRW5kKTtcbiAgICAgICAgcmV0dXJuIGRlY2w7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkQmxvY2tTdGF0ZW1lbnQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgbGV0IGJvZHlTdGF0ZW1lbnRzID0gbi5ib2R5Lm1hcChzdGF0ZW1lbnQgPT4gdGhpcy5idWlsZE5vZGUoc3RhdGVtZW50KSlcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIuc3BhbignYmxvY2snLCBib2R5U3RhdGVtZW50cyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkSWZTdGF0ZW1lbnQobm9kZTogQmFzZU5vZGUsIHNpYmxpbmdzOiBIVE1MRWxlbWVudFtdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgSWZTdGF0ZW1lbnQ7XG4gICAgICAgIGxldCBjb250ZW50OiBIVE1MRWxlbWVudFtdID0gW11cbiAgICAgICAgbGV0IHRlc3QgPSB0aGlzLmJ1aWxkTm9kZShuLnRlc3QpO1xuICAgICAgICBsZXQgaWZTdGFydFRleHQgPSBbJ2lmICggJywgdGVzdCwgJyApIHsnXTtcbiAgICAgICAgbGV0IGlmU3RhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1zdGF0ZW1lbnQtc3RhcnQnLCBpZlN0YXJ0VGV4dCk7XG4gICAgICAgIGNvbnRlbnQucHVzaChpZlN0YXJ0KTtcblxuICAgICAgICBsZXQgdGhlbkJsb2NrID0gdGhpcy5idWlsZE5vZGUobi5jb25zZXF1ZW50KTtcbiAgICAgICAgbGV0IGlmVGhlbiA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLWJsb2NrLXRoZW4nLCB0aGVuQmxvY2spO1xuICAgICAgICBjb250ZW50LnB1c2goaWZUaGVuKTtcbiAgICAgICAgc2libGluZ3MucHVzaCh0aGVuQmxvY2spO1xuXG4gICAgICAgIGlmIChuLmFsdGVybmF0ZSkge1xuICAgICAgICAgICAgbGV0IGlmRWxzZURlY2wgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1zdGF0ZW1lbnQtZWxzZScsICd9IGVsc2UgeycpO1xuICAgICAgICAgICAgaWZFbHNlRGVjbCA9IHRoaXMuZW5jYXBzdWxhdGVOb2RlSW5WZXJzZUNvbnRhaW5lcihpZkVsc2VEZWNsKTtcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaChpZkVsc2VEZWNsKTtcbiAgICAgICAgICAgIHNpYmxpbmdzLnB1c2goaWZFbHNlRGVjbCk7XG5cbiAgICAgICAgICAgIGxldCBlbHNlQmxvY2sgPSB0aGlzLmJ1aWxkTm9kZShuLmFsdGVybmF0ZSk7XG4gICAgICAgICAgICBsZXQgaWZFbHNlID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtYmxvY2stZWxzZScsIGVsc2VCbG9jayk7XG4gICAgICAgICAgICBjb250ZW50LnB1c2goaWZFbHNlKTtcbiAgICAgICAgICAgIHNpYmxpbmdzLnB1c2goaWZFbHNlKTtcbiAgICAgICAgfSBcbiAgICAgICAgbGV0IGlmRW5kID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtc3RhdGVtZW50LWVuZCcsICd9Jyk7XG4gICAgICAgIGlmRW5kID0gdGhpcy5lbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGlmRW5kKTtcbiAgICAgICAgY29udGVudC5wdXNoKGlmRW5kKTtcbiAgICAgICAgc2libGluZ3MucHVzaChpZkVuZCk7XG5cbiAgICAgICAgLy9sZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtc3RhdGVtZW50JywgY29udGVudCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaWZTdGFydDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRWYXJpYWJsZURlY2xhcmF0aW9uKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdGlvbjtcbiAgICAgICAgbGV0IGRlY2xhcmF0aW9ucyA9IG4uZGVjbGFyYXRpb25zLm1hcChkID0+IHRoaXMuYnVpbGROb2RlKGQpKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZGVjbGFyYXRpb24gdmFyaWFibGUtZGVjbGFyYXRpb24nKTtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IG4ua2luZCArICcgJztcbiAgICAgICAgZGVjbGFyYXRpb25zLmZvckVhY2goZCA9PiBjb250YWluZXIuYXBwZW5kQ2hpbGQoZCkpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZFZhcmlhYmxlRGVjbGFyYXRvcihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRvcjtcbiAgICAgICAgbGV0IGxlZnRQYXJ0ID0gdGhpcy5idWlsZE5vZGUobi5pZCk7XG4gICAgICAgIGxldCBjb250YWluZXI7XG4gICAgICAgIGlmIChuLmluaXQpIHtcbiAgICAgICAgICAgIGxldCBhc3NpZ25QYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdvcGVyYXRvciBhc3NpZ24tb3BlcmF0b3InLCAnPScpO1xuICAgICAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5idWlsZE5vZGUobi5pbml0KTtcbiAgICAgICAgICAgIGxldCByaWdodFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLXZhbHVlJywgcmlnaHQpO1xuICAgICAgICAgICAgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIHZhcmlhYmxlLWRlY2xhcmF0b3InLCBbbGVmdFBhcnQsIGFzc2lnblBhcnQsIHJpZ2h0UGFydF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIHZhcmlhYmxlLWRlY2xhcmF0b3InLCBsZWZ0UGFydCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkQXNzaWdubWVudEV4cHJlc3Npb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLmJ1aWxkTm9kZShuLmxlZnQpO1xuICAgICAgICBsZXQgbGVmdFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLWlkJywgbGVmdCk7XG4gICAgICAgIGxldCBhc3NpZ25QYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdvcGVyYXRvciBhc3NpZ24tb3BlcmF0b3InLCAnPScpO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmJ1aWxkTm9kZShuLnJpZ2h0KTtcbiAgICAgICAgbGV0IHJpZ2h0UGFydCA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtdmFsdWUnLCByaWdodCk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gYXNzaWdubWVudC1leHByZXNzaW9uJywgW2xlZnRQYXJ0LCBhc3NpZ25QYXJ0LCByaWdodFBhcnRdKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRCaW5hcnlFeHByZXNzaW9uKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgQmluYXJ5RXhwcmVzc2lvbjtcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLmJ1aWxkTm9kZShuLmxlZnQpO1xuICAgICAgICBsZXQgbGVmdFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24nLCBsZWZ0KTtcbiAgICAgICAgbGV0IG9wZXJhdG9yUGFydCA9IEh0bWxIZWxwZXIuc3Bhbignb3BlcmF0b3IgZXhwcmVzc2lvbi1vcGVyYXRvcicsIG4ub3BlcmF0b3IpO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmJ1aWxkTm9kZShuLnJpZ2h0KTtcbiAgICAgICAgbGV0IHJpZ2h0UGFydCA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbicsIHJpZ2h0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiBiaW5hcnktZXhwcmVzc2lvbicsIFtsZWZ0UGFydCwgb3BlcmF0b3JQYXJ0LCByaWdodFBhcnRdKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRFeHByZXNzaW9uU3RhdGVtZW50KG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgRXhwcmVzc2lvblN0YXRlbWVudDtcbiAgICAgICAgbGV0IGNvZGUgPSB0aGlzLmJ1aWxkTm9kZShuLmV4cHJlc3Npb24pO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgZXhwcmVzc2lvbi1zdGF0ZW1lbnQnLCBjb2RlKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRSZXR1cm5TdGF0ZW1lbnQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBSZXR1cm5TdGF0ZW1lbnQ7XG4gICAgICAgIGxldCBhcmcgPSB0aGlzLmJ1aWxkTm9kZShuLmFyZ3VtZW50KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IHJldHVybi1zdGF0ZW1lbnQnLCBbJ3JldHVybiAnLCBhcmddKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRJZGVudGlmaWVyKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgSWRlbnRpZmllcjtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignaWRlbnRpZmllcicsIEVzcHJpbWFIZWxwZXIucGF0dGVyblRvU3RyaW5nKG4pKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRNZW1iZXJFeHByZXNzaW9uKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgTWVtYmVyRXhwcmVzc2lvbjtcbiAgICAgICAgbGV0IG9iamVjdCA9IHRoaXMuYnVpbGROb2RlKG4ub2JqZWN0KTtcbiAgICAgICAgbGV0IHByb3BlcnR5ID0gdGhpcy5idWlsZE5vZGUobi5wcm9wZXJ0eSk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gbWVtYmVyLWV4cHJlc3Npb24nLCBbb2JqZWN0LCAnLicsIHByb3BlcnR5XSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkRGVmYXVsdChub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2RlZmF1bHQ6Jywgbm9kZSk7XG4gICAgICAgIGxldCBjb2RlID0gZXNjb2RlR2VuZXJhdGUobm9kZSk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2RlZmF1bHQtJyArIG5vZGUudHlwZSwgY29kZSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxufSIsImltcG9ydCB7IFByb2dyZW1Db21wb25lbnQsIFByb2dyZW1TY2hlZHVsZXIsIEh0bWxDb3VwbGV0RmFjdG9yeSwgUHJvZ3JlbVN0YXRlLCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciB9IGZyb20gJy4uLy4uL2NvcmUvVHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudCBpbXBsZW1lbnRzIFByb2dyZW1Db21wb25lbnQsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyIHtcblxuICAgIHByaXZhdGUgZXhlY3V0aW5nRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcbiAgICBwcml2YXRlIGV4ZWN1dGVkRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVhFQ1VUSU5HX0NMQVNTID0gJ3ZlcnNlLWV4ZWN1dGluZyc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBFWEVDVVRFRF9DTEFTUyA9ICd2ZXJzZS1leGVjdXRlZCc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXIsXG4gICAgICAgIHByaXZhdGUgaHRtbEZhY3Rvcnk6IEh0bWxDb3VwbGV0RmFjdG9yeTxhbnk+XG4gICAgKSB7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVDb2RlRXhlY3V0aW9uKHRoaXMpO1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlR3JpZENoYW5nZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZW5kZXJIdG1sKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGh0bWxDb21wb25lbnQgPSB0aGlzLmh0bWxGYWN0b3J5LmJ1aWxkQ291cGxldCgpO1xuICAgICAgICByZXR1cm4gaHRtbENvbXBvbmVudDtcbiAgICB9XG4gICAgXG4gICAgZmlyZUNvZGVFeGVjdXRpb24oc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAoIXN0YXRlLnZlcnNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICBsZXQgaHRtbFZlcnNlID0gdGhpcy5odG1sRmFjdG9yeS5nZXRIdG1sVmVyc2Uoc3RhdGUudmVyc2UpO1xuICAgICAgICBpZihodG1sVmVyc2UpIHtcbiAgICAgICAgICAgIGh0bWxWZXJzZS5jbGFzc0xpc3QuYWRkKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VUSU5HX0NMQVNTKTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodGhpcy5leGVjdXRpbmdFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgZWx0ID0gdGhpcy5leGVjdXRpbmdFbGVtZW50cy5wb3AoKTtcbiAgICAgICAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVkRWxlbWVudHMucHVzaChlbHQpO1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QucmVtb3ZlKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VUSU5HX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LmFkZChQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVEVEX0NMQVNTKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWh0bWxWZXJzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5leGVjdXRpbmdFbGVtZW50cy5wdXNoKGh0bWxWZXJzZSk7XG4gICAgICAgIGh0bWxWZXJzZS5jbGFzc0xpc3QuYWRkKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VUSU5HX0NMQVNTKTtcbiAgICB9XG5cbiAgICBmaXJlR3JpZENoYW5nZShzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIHdoaWxlICh0aGlzLmV4ZWN1dGluZ0VsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBlbHQgPSB0aGlzLmV4ZWN1dGluZ0VsZW1lbnRzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKGVsdCkge1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QucmVtb3ZlKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VURURfQ0xBU1MpO1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QucmVtb3ZlKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VUSU5HX0NMQVNTKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlICh0aGlzLmV4ZWN1dGVkRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGVsdCA9IHRoaXMuZXhlY3V0ZWRFbGVtZW50cy5wb3AoKTtcbiAgICAgICAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVEVEX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IFN0eWxlRGVjb3JhdG9yLCBDb2xvclByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IEJhc2VOb2RlLCBJZGVudGlmaWVyIH0gZnJvbSBcImVzdHJlZVwiO1xuXG5pbXBvcnQgeyBDb2xvclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9Db2xvclNlcnZpY2VcIjtcbmltcG9ydCB7IEVzcHJpbWFIZWxwZXIgfSBmcm9tIFwiLi4vLi4vZXNwcmltYS9Fc3ByaW1hSGVscGVyXCI7XG5pbXBvcnQgeyBIdG1sSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvSHRtbEhlbHBlclwiO1xuXG5leHBvcnQgY2xhc3MgQ29sb3JWYXJpYWJsZVNjb3BlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8c3RyaW5nPiB7XG5cbiAgICBwcml2YXRlIHZhcmlhYmxlTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgY29sb3JQcm92aWRlcjogQ29sb3JQcm92aWRlciA9IENvbG9yU2VydmljZS5jb2xvclByb3ZpZGVyYWN0b3J5LmJ1aWxkKCk7XG5cbiAgICBkZWNvcmF0ZSh2YXJJZDogc3RyaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IHZhckluZGV4ID0gdGhpcy52YXJpYWJsZU1hcC5nZXQodmFySWQpO1xuICAgICAgICBpZiAoIXZhckluZGV4KSB7XG4gICAgICAgICAgICB2YXJJbmRleCA9IHRoaXMudmFyaWFibGVNYXAuc2l6ZSArIDE7XG4gICAgICAgICAgICB0aGlzLnZhcmlhYmxlTWFwLnNldCh2YXJJZCwgdmFySW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd2YXJpYWJsZS1oaW50Jyk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndmFyaWFibGUtJyArIHZhckluZGV4KTtcbiAgICAgICAgXG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLWhpbnQtY29udGFpbmVyJywgZWxlbWVudCk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfSAgICBcbiAgICBcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHN0eWxlID0gJyc7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ3ZhcmlhYmxlIGNvdW50OicsIHRoaXMudmFyaWFibGVNYXAuc2l6ZSk7XG4gICAgICAgIHRoaXMudmFyaWFibGVNYXAuZm9yRWFjaCgoaW5kZXgsIGlkKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmNvbG9yUHJvdmlkZXIuaGFzaFN0cmluZ1RvQ29sb3IoaWQsIDE2KTsgLy90aGlzLnZhcmlhYmxlTWFwLnNpemVcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2J1aWxkaW5nIGNvbG9yICMnLCBpZCwgJz0+JywgY29sb3IpO1xuICAgICAgICAgICAgc3R5bGUgKz0gYFxuICAgICAgICAgICAgICAgIC52YXJpYWJsZS1zY29wZS1jb21wb25lbnQgLnZhcmlhYmxlLWhpbnQtY29udGFpbmVyIHtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAwLjhlbSAwIDAuOGVtIDA7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAudmFyaWFibGUtc2NvcGUtY29tcG9uZW50IC52YXJpYWJsZS1oaW50IHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMC4xZW0gMC41ZW0gMC4xZW0gMC41ZW07XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwLjhlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLnZhcmlhYmxlLXNjb3BlLWNvbXBvbmVudCAudmFyaWFibGUtJHtpbmRleH0sIFxuICAgICAgICAgICAgICAgIC52YXJpYWJsZS1zY29wZS1jb21wb25lbnQgLnZhcmlhYmxlLSR7aW5kZXh9IHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcn07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYDtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzdHlsZScsIHN0eWxlKTtcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBhZFZlcnNlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8QmFzZU5vZGU+IHtcblxuICAgIGRlY29yYXRlKG5vZGU6IEJhc2VOb2RlLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb2RlLXBhZGRpbmcnKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSAgICBcbiAgICBcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgLmNvZGUtcGFkZGluZyB7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMzJweDtcbiAgICAgICAgfVxuICAgICAgICBgO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgU2NoZWR1bGluZ1NlcnZpY2UgfSBmcm9tICcuL1NjaGVkdWxpbmdTZXJ2aWNlJztcbmltcG9ydCB7IFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3Byb2dyZW1JbnNwZWN0b3IvUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY3JlZW5Db25maWcgfSBmcm9tICcuL1NjcmVlblNlcnZpY2UnO1xuaW1wb3J0IHsgQmFzZU5vZGUgfSBmcm9tICdlc3RyZWUnO1xuaW1wb3J0IHsgU3R5bGVEZWNvcmF0b3JBZ2dyZWdhdGlvbiwgUHJvZ3JlbVNjaGVkdWxlciB9IGZyb20gJy4vVHlwZXMnO1xuaW1wb3J0IHsgUGFkVmVyc2VEZWNvcmF0b3IsIENvbG9yVmVyc2VWYXJpYWJsZURlY29yYXRvciB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Fc3ByaW1hUHJvZ3JlbUluc3BlY3RvclN0eWxlRGVjb3JhdG9ycyc7XG5pbXBvcnQgeyBIdG1sSGVscGVyIH0gZnJvbSAnLi9IdG1sSGVscGVyJztcbmltcG9ydCB7IEVzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkgfSBmcm9tICcuLi9jb21wb25lbnRzL3Byb2dyZW1JbnNwZWN0b3IvRXNwcmltYVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeSc7XG5pbXBvcnQgeyBDb2RlU2VydmljZSB9IGZyb20gJy4vQ29kZVNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZ3JlbUdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3Byb2dyZW1HcmlkL1Byb2dyZW1HcmlkQ29tcG9uZW50JztcbmltcG9ydCB7IFZhcmlhYmxlU2NvcGVDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3ZhcmlhYmxlU2NvcGUvVmFyaWFibGVTY29wZUNvbXBvbmVudCc7XG5pbXBvcnQgeyBFc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5IH0gZnJvbSAnLi4vY29tcG9uZW50cy92YXJpYWJsZVNjb3BlL0VzcHJpbWFWYXJpYWJsZVNjb3BlSHRtbEZhY3RvcnknO1xuaW1wb3J0IHsgQ29sb3JWYXJpYWJsZVNjb3BlRGVjb3JhdG9yIH0gZnJvbSAnLi4vY29tcG9uZW50cy92YXJpYWJsZVNjb3BlL0VzcHJpbWFWYXJpYWJsZVNjb3BlU3R5bGVEZWNvcmF0b3JzJztcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1Db25maWcge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY29sb25uZXM6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGxpZ25lczogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZnJhbWVzOiBudW1iZXIsXG4gICAgKSB7fVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFByb2dyZW1TZXJ2aWNlIHtcblxuICAgIHZhciBwcmV2aW91c1JlcGFpbnRUaW1lID0gMDtcbiAgICB2YXIgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyO1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJvZ3JlbSh1cmw6IHN0cmluZywgc2NyZWVuQ29uZmlnOiBTY3JlZW5Db25maWcsIHByb2dyZW1Db25maWc6IFByb2dyZW1Db25maWcpIHtcbiAgICAgICAgbGV0IHByb2dyZW1TY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgcHJvZ3JlbVNjcmlwdC5zcmMgPSB1cmw7XG4gICAgICAgIGxldCBib2R5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgICAgaWYgKGJvZHlFbGVtZW50KSB7XG4gICAgICAgICAgICBib2R5RWxlbWVudC5hcHBlbmRDaGlsZChwcm9ncmVtU2NyaXB0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIENvZGVTZXJ2aWNlLmxvYWRQcm9ncmVtKHVybCkudGhlbihjb2RlID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9ncmVtQ29kZSA9IENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkUHJvZ3JlbShjb2RlKTtcbiAgICAgICAgICAgIGxldCBwcm9ncmVtQ291cGxldCA9IHByb2dyZW1Db2RlLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb2dyZW0gQVNUOicsIHByb2dyZW1Db2RlLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24pO1xuXG4gICAgICAgICAgICAvLyBMb2FkIGluaXRQcm9ncmVtIEZ1bmN0aW9uIGNvZGVcbiAgICAgICAgICAgIGxldCBpbml0UHJvZ3JlbUZ1bmN0aW9uQ29kZSA9IGVzY29kZUdlbmVyYXRlKHByb2dyZW1Db2RlLmluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCkuZnVuY3Rpb25Sb290Tm9kZSk7XG4gICAgICAgICAgICAod2luZG93IGFzIGFueSkuZXZhbChpbml0UHJvZ3JlbUZ1bmN0aW9uQ29kZSk7XG5cbiAgICAgICAgICAgIHNjaGVkdWxlciA9IFNjaGVkdWxpbmdTZXJ2aWNlLmJ1aWxkUHJvZ3JlbVNjaGVkdWxlcihwcm9ncmVtQ29uZmlnLCBwcm9ncmVtQ29kZSk7XG5cbiAgICAgICAgICAgIC8vbGV0IHByb2dyZW1JbnNwZWN0b3IgPSBuZXcgQmFzaWNIdG1sRXNwcmltYVByb2dyZW1JbnNwZWN0b3IocHJvZ3JlbUNvZGUsIHNjaGVkdWxlciwgZG9jdW1lbnQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3RvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCcucHJvZ3JlbS1pbnNwZWN0b3ItY29tcG9uZW50Jyk7XG4gICAgICAgICAgICBpZiAocHJvZ3JlbUluc3BlY3RvckNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9yRGVjb3JhdG9ycyA9IG5ldyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uPEJhc2VOb2RlPihbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBQYWRWZXJzZURlY29yYXRvcigpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgQ29sb3JWZXJzZVZhcmlhYmxlRGVjb3JhdG9yKCksXG4gICAgICAgICAgICAgICAgICAgIC8vbmV3IEhpZ2hsaWdodEV4ZWN1dGluZ1ZlcnNlRGVjb3JhdG9yKHNjaGVkdWxlciksXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JGYWN0b3J5ID0gbmV3IEVzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkocHJvZ3JlbUNvdXBsZXQsIHByb2dyZW1JbnNwZWN0b3JEZWNvcmF0b3JzKTtcbiAgICAgICAgICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3RvclZpZXcgPSBuZXcgUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudChzY2hlZHVsZXIsIHByb2dyZW1JbnNwZWN0b3JGYWN0b3J5KTtcbiAgICBcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdjb2RlRWxlbWVudCcsIGNvZGVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3Rvckh0bWwgPSBwcm9ncmVtSW5zcGVjdG9yVmlldy5yZW5kZXJIdG1sKCk7XG4gICAgICAgICAgICAgICAgcHJvZ3JlbUluc3BlY3RvckNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9ncmVtSW5zcGVjdG9ySHRtbCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGVjb3JhdG9yU3R5bGUgPSBwcm9ncmVtSW5zcGVjdG9yRGVjb3JhdG9ycy5idWlsZFN0eWxlU2hlZXQoKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdkZWNvcmF0b3JTdHlsZTonLCBkZWNvcmF0b3JTdHlsZSlcbiAgICAgICAgICAgICAgICBIdG1sSGVscGVyLmRlZmluZUNzc1J1bGVzKCdwcm9ncmVtLWluc3BlY3Rvci1jb21wb25lbnQnLCBkZWNvcmF0b3JTdHlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgbGV0IHByb2dyZW1HcmlkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJy5wcm9ncmVtLWdyaWQtY29tcG9uZW50Jyk7XG4gICAgICAgICAgIGlmIChwcm9ncmVtR3JpZENvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIGxldCBwcm9ncmVtR3JpZENvbXBvbmVudCA9IG5ldyBQcm9ncmVtR3JpZENvbXBvbmVudChzY3JlZW5Db25maWcsIHByb2dyZW1Db25maWcsIHNjaGVkdWxlciwgZG9jdW1lbnQpO1xuICAgICAgICAgICAgICAgIGxldCBwcm9ncmVtR3JpZEh0bWwgPSBwcm9ncmVtR3JpZENvbXBvbmVudC5yZW5kZXJIdG1sKCk7XG4gICAgICAgICAgICAgICAgcHJvZ3JlbUdyaWRDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvZ3JlbUdyaWRIdG1sKTtcbiAgICAgICAgICAgfVxuXG4gICAgICAgICAgIGxldCB2YXJpYWJsZVNjb3BlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJy52YXJpYWJsZS1zY29wZS1jb21wb25lbnQnKTtcbiAgICAgICAgICAgaWYgKHZhcmlhYmxlU2NvcGVDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFyaWFibGVTY29wZURlY29yYXRvcnMgPSBuZXcgU3R5bGVEZWNvcmF0b3JBZ2dyZWdhdGlvbjxzdHJpbmc+KFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IENvbG9yVmFyaWFibGVTY29wZURlY29yYXRvcigpXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgIGxldCBodG1sRmFjdG9yeSA9IG5ldyBFc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5KHByb2dyZW1Db3VwbGV0LCB2YXJpYWJsZVNjb3BlRGVjb3JhdG9ycywgc2NoZWR1bGVyKTtcbiAgICAgICAgICAgICAgICBsZXQgdmFyaWFibGVTY29wZUNvbXBvbmVudCA9IG5ldyBWYXJpYWJsZVNjb3BlQ29tcG9uZW50KHNjaGVkdWxlciwgaHRtbEZhY3RvcnkpO1xuICAgICAgICAgICAgICAgIGxldCB2YXJpYWJsZVNjb3BlSHRtbCA9IHZhcmlhYmxlU2NvcGVDb21wb25lbnQucmVuZGVySHRtbCgpO1xuICAgICAgICAgICAgICAgIHZhcmlhYmxlU2NvcGVDb250YWluZXIuYXBwZW5kQ2hpbGQodmFyaWFibGVTY29wZUh0bWwpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGRlY29yYXRvclN0eWxlID0gdmFyaWFibGVTY29wZURlY29yYXRvcnMuYnVpbGRTdHlsZVNoZWV0KCk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnZGVjb3JhdG9yU3R5bGU6JywgZGVjb3JhdG9yU3R5bGUpXG4gICAgICAgICAgICAgICAgSHRtbEhlbHBlci5kZWZpbmVDc3NSdWxlcygndmFyaWFibGUtc2NvcGUtY29tcG9uZW50JywgZGVjb3JhdG9yU3R5bGUpO1xuICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRpbWVyKDApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0aW1lcih0aW1lc3RhbXA6IG51bWJlcikge1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpbWVyKTtcblxuICAgICAgICBpZiAodGltZXN0YW1wIC0gcHJldmlvdXNSZXBhaW50VGltZSA8IDEwMDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZpb3VzUmVwYWludFRpbWUgPSB0aW1lc3RhbXA7XG5cbiAgICAgICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgICAgICAgc2NoZWR1bGVyLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCB7IFN0eWxlRGVjb3JhdG9yLCBQcm9ncmVtU2NoZWR1bGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IEJhc2VOb2RlLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBCbG9ja1N0YXRlbWVudCwgSWZTdGF0ZW1lbnQsIFZhcmlhYmxlRGVjbGFyYXRvciwgVmFyaWFibGVEZWNsYXJhdGlvbiwgQXNzaWdubWVudEV4cHJlc3Npb24sIEJpbmFyeUV4cHJlc3Npb24sIEV4cHJlc3Npb25TdGF0ZW1lbnQsIFJldHVyblN0YXRlbWVudCwgSWRlbnRpZmllciwgTWVtYmVyRXhwcmVzc2lvbiB9IGZyb20gXCJlc3RyZWVcIjtcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9IdG1sSGVscGVyXCI7XG5pbXBvcnQgeyBFc3ByaW1hSGVscGVyIH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYUhlbHBlclwiO1xuaW1wb3J0IHsgRXNwcmltYVZlcnNlLCBFc3ByaW1hSHRtbENvdXBsZXRGYWN0b3J5LCBFc3ByaW1hQ291cGxldCB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFUeXBlc1wiO1xuaW1wb3J0IHsgc3RyaW5naWZ5IH0gZnJvbSBcInF1ZXJ5c3RyaW5nXCI7XG5cbmV4cG9ydCBjbGFzcyBFc3ByaW1hVmFyaWFibGVTY29wZUh0bWxGYWN0b3J5IGltcGxlbWVudHMgRXNwcmltYUh0bWxDb3VwbGV0RmFjdG9yeSB7XG5cbiAgICBwcml2YXRlIHZhckhpbnRCeVZlcnNlc01hcDogTWFwPEJhc2VOb2RlLCBIVE1MRWxlbWVudFtdPiA9IG5ldyBNYXAoKTtcbiAgICBwcml2YXRlIHZhckhpbnRVcGRhdGVyTWFwOiBNYXA8QmFzZU5vZGUsICh2YWx1ZTogYW55KSA9PiB2b2lkPiA9IG5ldyBNYXAoKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvdXBsZXQ6IEVzcHJpbWFDb3VwbGV0LFxuICAgICAgICBwcml2YXRlIGRlY29yYXRvcjogU3R5bGVEZWNvcmF0b3I8c3RyaW5nPixcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXJcbiAgICApIHt9XG5cbiAgICBidWlsZENvdXBsZXQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAvLyBGSVhNRSBpbCBmYXVkcmFpdCBwYXJjb3VyaXIgbCdhcmJyZSBBU1QgYXZlYyB1biB3YWxrZXIgb3UgdW4gdHJ1YyBkdSBnZW5yZS5cbiAgICAgICAgLy8gRklYTUUgZ3JvcyBoYWNrIGR1IHN5c3TDqG1lIGRlIEh0bWxGYWN0b3J5IGV0IGRlIERlY29yYXRvciBwb3VyIHJlYWxpc2VyIGNlIGNvbXBvc2FudC5cbiAgICAgICAgLy8gQnVpbGQgYWxsIFZhcmlhYmxlSGludCB3aGljaCB3aWxsIGJlIGFkZGVkIGluIHZpZXcgY29udGFpbmVyIG9uZSBieSBvbmUgYnkgZ2V0SHRtbFZlcnNlKClcbiAgICAgICAgdGhpcy5jb3VwbGV0LnZlcnNlcy5mb3JFYWNoKHYgPT4ge1xuICAgICAgICAgICAgbGV0IHZhckhpbnRzID0gdGhpcy5idWlsZFZhcmlhYmxlSGludHModi5ub2RlKTtcbiAgICAgICAgICAgIGxldCBkZWNvcmF0ZWRWYXJIaW50czogSFRNTEVsZW1lbnRbXSA9IFtdO1xuICAgICAgICAgICAgdmFySGludHMuZm9yRWFjaCgodmFySGludCwgdmFyTmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBkZWNvcmF0ZWQgPSB0aGlzLmRlY29yYXRvci5kZWNvcmF0ZSh2YXJOYW1lLCB2YXJIaW50KTtcbiAgICAgICAgICAgICAgICBkZWNvcmF0ZWRWYXJIaW50cy5wdXNoKGRlY29yYXRlZCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy52YXJIaW50QnlWZXJzZXNNYXAuc2V0KHYubm9kZSwgZGVjb3JhdGVkVmFySGludHMpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS1zY29wZS1jb21wb25lbnQnKTtcbiAgICB9ICAgIFxuICAgIFxuICAgIGdldEh0bWxWZXJzZSh2ZXJzZTogRXNwcmltYVZlcnNlKTogSFRNTEVsZW1lbnR8dW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRoaXMudmFySGludEJ5VmVyc2VzTWFwLnNpemUgPT09IDAgfHwgIXZlcnNlLm5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodG1sRWxlbWVudHMgPSB0aGlzLnZhckhpbnRCeVZlcnNlc01hcC5nZXQodmVyc2Uubm9kZSk7XG4gICAgICAgIGlmICghaHRtbEVsZW1lbnRzIHx8IGh0bWxFbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuc2NoZWR1bGVyLmN1cnJlbnQoKTtcbiAgICAgICAgbGV0IHZhbHVlc01hcCA9IEVzcHJpbWFIZWxwZXIuZ2V0VmFyaWFibGVWYWx1ZXMoc3RhdGUsIHZlcnNlLm5vZGUpO1xuICAgICAgICBsZXQgdmFySGludFVwZGF0ZXIgPSB0aGlzLnZhckhpbnRVcGRhdGVyTWFwLmdldCh2ZXJzZS5ub2RlKTtcbiAgICAgICAgaWYgKHZhckhpbnRVcGRhdGVyKSB7XG4gICAgICAgICAgICB2YXJIaW50VXBkYXRlcih2YWx1ZXNNYXApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgdmVyc2VDb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3ZlcnNlLWNvbnRhaW5lcicsIGh0bWxFbGVtZW50cyk7XG4gICAgICAgIHJldHVybiB2ZXJzZUNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZCBhIFZhcmlhYmxlIEhpbnQgaWYgdGhlIHN1cHBsaWVkIG5vZGUgY29udGFpbnMgYSBWYXJpYWJsZSBhZmZlY3RhdGlvbi5cbiAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAqIEByZXR1cm5zIGFuIEhUTUxFbGVtZW50IG9yIG51bGwgaWYgbm8gaGludCBzaG91bGQgYXBwZWFyIGZvciB0aGlzIG5vZGVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYnVpbGRWYXJpYWJsZUhpbnRzKG5vZGU6IEJhc2VOb2RlKTogTWFwPHN0cmluZywgSFRNTEVsZW1lbnQ+IHtcbiAgICAgICAgbGV0IHZhck5vZGUgPSBFc3ByaW1hSGVscGVyLnJlZHVjZU5vZGVUb1ZhckRlY2xhcmF0aW9uKG5vZGUpO1xuICAgICAgICBpZiAoIXZhck5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTWFwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFyTmFtZXMgPSBFc3ByaW1hSGVscGVyLmdldFZhcmlhYmxlTmFtZXModmFyTm9kZSk7XG4gICAgICAgIGxldCB2YXJIaW50cyA9IHZhck5hbWVzLm1hcCh2YXJOYW1lID0+IHtcbiAgICAgICAgICAgIGxldCB2YXJWYWx1ZSA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtaGludC12YWx1ZScpO1xuICAgICAgICAgICAgbGV0IHZhckhpbnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLWhpbnQnLCBbYCR7dmFyTmFtZX06IGAsIHZhclZhbHVlXSk7XG4gICAgICAgICAgICByZXR1cm4ge3Zhck5hbWUsIHZhckhpbnQsIHZhclZhbHVlfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHZhbFVwZGF0ZXIgPSAodmFsc0J5VmFyTmFtZTogTWFwPHN0cmluZywgYW55PikgPT4ge1xuICAgICAgICAgICAgdmFySGludHMuZm9yRWFjaCh2YXJIaW50ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gdmFsc0J5VmFyTmFtZS5nZXQodmFySGludC52YXJOYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFySGludC52YXJWYWx1ZS5pbm5lclRleHQgPSB2YWwudG9GaXhlZCgyKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhckhpbnQudmFyVmFsdWUuaW5uZXJUZXh0ID0gdmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnZhckhpbnRVcGRhdGVyTWFwLnNldChub2RlLCB2YWxVcGRhdGVyKTtcblxuICAgICAgICBsZXQgdmFySGludHNCeU5hbWUgPSBuZXcgTWFwPHN0cmluZywgSFRNTEVsZW1lbnQ+KCk7XG4gICAgICAgIHZhckhpbnRzLmZvckVhY2godmFySGludCA9PiB2YXJIaW50c0J5TmFtZS5zZXQodmFySGludC52YXJOYW1lLCB2YXJIaW50LnZhckhpbnQpKTtcblxuICAgICAgICByZXR1cm4gdmFySGludHNCeU5hbWU7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgRXZhbFNjb3BlIH0gZnJvbSBcIi4vRXZhbFNlcnZpY2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+IHtcbiAgICBub2RlOiBBc3RCYXNlVHlwZVxuICAgIGNvZGU6IEFzdEJhc2VUeXBlXG59XG4vKlxuZXhwb3J0IGludGVyZmFjZSBWZXJzZUluc3RydWN0aW9uRmFjdG9yeTxBc3RCYXNlVHlwZT4ge1xuICAgIGJ1aWxkKHBhcmFtOiBBc3RCYXNlVHlwZSk6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT47XG59XG4qL1xuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtQ291cGxldDxBc3RCYXNlVHlwZT4ge1xuICAgIGZ1bmN0aW9uUm9vdE5vZGU6IEFzdEJhc2VUeXBlXG4gICAgdmVyc2VzOiBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+W11cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtRmFjdG9yeTxBc3RCYXNlVHlwZT4ge1xuICAgIGJ1aWxkUHJvZ3JlbShjb2RlOiBzdHJpbmcpOiBQcm9ncmVtQ29kZTxBc3RCYXNlVHlwZT5cbiAgICBidWlsZENvdXBsZXQobm9kZTogQXN0QmFzZVR5cGUsIHZlcnNlczogQXN0QmFzZVR5cGVbXSk6IFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPlxuICAgIGJ1aWxkVmVyc2Uobm9kZTogQXN0QmFzZVR5cGUpOiBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmVyc2VJdGVyYXRvcjxBc3RCYXNlVHlwZT4ge1xuICAgIGV4ZWN1dGVOZXh0KCk6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT5cbiAgICBoYXNOZXh0KCk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbUNvZGU8QXN0QmFzZVR5cGU+IHtcbiAgICBpbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpOiBQcm9ncmVtQ291cGxldDxBc3RCYXNlVHlwZT5cbiAgICBjb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk6IFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPlxuICAgIGl0ZXJhdG9yKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiBWZXJzZUl0ZXJhdG9yPEFzdEJhc2VUeXBlPlxufVxuXG5leHBvcnQgY2xhc3MgUHJvZ3JlbVN0YXRlIHtcblxuICAgIHB1YmxpYyByZWFkb25seSBldmFsU2NvcGUgPSBuZXcgRXZhbFNjb3BlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjb2xvbm5lOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBsaWduZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZnJhbWU6IG51bWJlcixcbiAgICAgICAgcHVibGljIGNvbnRleHRlOiBvYmplY3QsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB2ZXJzZTogUHJvZ3JlbVZlcnNlPGFueT4gfCBudWxsLFxuICAgICkge31cblxuICAgIHB1YmxpYyBldmFsKGV4cHI6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2YWxTY29wZS5nbG9iYWxFdmFsKGV4cHIpO1xuICAgIH1cbn1cblxudHlwZSBOZXdTdGF0ZUNhbGxiYWNrID0gKHN0YXRlOiBQcm9ncmVtU3RhdGUpID0+IHZvaWQ7XG5leHBvcnQgaW50ZXJmYWNlIFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyIHtmaXJlU3RhcnRJdGVyYXRpbmdDb2RlOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyIHtmaXJlQ29kZUV4ZWN1dGlvbjogTmV3U3RhdGVDYWxsYmFja307XG5leHBvcnQgaW50ZXJmYWNlIEdyaWRDaGFuZ2VMaXN0ZW5lciB7ZmlyZUdyaWRDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBMaW5lQ2hhbmdlTGlzdGVuZXIge2ZpcmVMaW5lQ2hhbmdlOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgRnJhbWVDaGFuZ2VMaXN0ZW5lciB7ZmlyZUZyYW1lQ2hhbmdlOiBOZXdTdGF0ZUNhbGxiYWNrfTtcblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtU2NoZWR1bGVyIHtcbiAgICBzdWJzY3JpYmVTdGFydEl0ZXJhdGluZ0NvZGUobGlzdGVuZXI6IFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUNvZGVFeGVjdXRpb24obGlzdGVuZXI6IENvZGVFeGVjdXRpb25MaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVHcmlkQ2hhbmdlKGxpc3RlbmVyOiBHcmlkQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlTGluZUNoYW5nZShsaXN0ZW5lcjogTGluZUNoYW5nZUxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUZyYW1lQ2hhbmdlKGxpc3RlbmVyOiBGcmFtZUNoYW5nZUxpc3RlbmVyKTogdm9pZFxuICAgIHJlc2V0KCk6IFByb2dyZW1TdGF0ZVxuICAgIGN1cnJlbnQoKTogUHJvZ3JlbVN0YXRlXG4gICAgbmV4dCgpOiBQcm9ncmVtU3RhdGVcbiAgICBnZXRQcm9ncmVtKCk6IFByb2dyZW1Db2RlPGFueT5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtQ29tcG9uZW50IHtcbiAgICByZW5kZXJIdG1sKCk6IEhUTUxFbGVtZW50XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3R5bGVEZWNvcmF0b3I8VD4ge1xuICAgIGRlY29yYXRlKG5vZGU6IFQsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnRcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSHRtbENvdXBsZXRGYWN0b3J5PEFzdEJhc2VUeXBlPiB7XG4gICAgYnVpbGRDb3VwbGV0KCk6IEhUTUxFbGVtZW50XG4gICAgZ2V0SHRtbFZlcnNlKHZlcnNlOiBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+KTogSFRNTEVsZW1lbnR8dW5kZWZpbmVkXG59XG5cbmV4cG9ydCBjbGFzcyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uPFQ+IGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8VD4ge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNvcmF0b3JzOiBTdHlsZURlY29yYXRvcjxUPltdKSB7fVxuXG4gICAgZGVjb3JhdGUobm9kZTogVCwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCB0ZW1wOiBIVE1MRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuZGVjb3JhdG9ycy5mb3JFYWNoKGQgPT4gdGVtcCA9IGQuZGVjb3JhdGUobm9kZSwgdGVtcCkpO1xuICAgICAgICByZXR1cm4gdGVtcDtcbiAgICB9XG5cbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjb3JhdG9ycy5tYXAoZCA9PiBkLmJ1aWxkU3R5bGVTaGVldCgpKS5qb2luKCdcXG4nKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2xvclByb3ZpZGVyIHtcbiAgICBoc2xDb2xvcihodWU6IG51bWJlcik6IHN0cmluZztcbiAgICBoYXNoU3RyaW5nVG9Db2xvcihrZXk6IHN0cmluZywgY29sb3JDb3VudDogbnVtYmVyLCBzaGlmdD86IG51bWJlcik6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2xvclByb3ZpZGVyRmFjdG9yeSB7XG4gICAgYnVpbGQoa2V5Pzogc3RyaW5nKTogQ29sb3JQcm92aWRlcjtcbn0iLCJpbXBvcnQgeyBQcm9ncmVtRmFjdG9yeSB9IGZyb20gXCIuL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNpY0VzcHJpbWFQcm9ncmVtRmFjdG9yeSB9IGZyb20gXCIuLi9lc3ByaW1hL0Jhc2ljRXNwcmltYVByb2dyZW1cIjtcblxuZXhwb3J0IG5hbWVzcGFjZSBDb2RlU2VydmljZSB7XG5cbiAgICBleHBvcnQgY29uc3QgcHJvZ3JlbUZhY3Rvcnk6IFByb2dyZW1GYWN0b3J5PGFueT4gPSBuZXcgQmFzaWNFc3ByaW1hUHJvZ3JlbUZhY3RvcnkoKTtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBsb2FkUHJvZ3JlbShmaWxlVXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2xpZW50ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICBjbGllbnQub3BlbignR0VUJywgZmlsZVVybCk7XG4gICAgICAgICAgICBjbGllbnQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb2RlID0gY2xpZW50LnJlc3BvbnNlVGV4dDtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb2RlU2VydmljZTogUHJvZ3JlbSBsb2FkZWQgc3VjY2Vzc2Z1bGx5LicsIGNvZGUpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoY29kZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2xpZW50Lm9uZXJyb3IgPSAoKSA9PiByZWplY3QoY2xpZW50LnN0YXR1c1RleHQpO1xuICAgICAgICAgICAgY2xpZW50LnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59IiwiXG5leHBvcnQgY2xhc3MgU2NyZWVuQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGJveFNpemU6IG51bWJlclxuICAgICkge31cbn1cblxuZXhwb3J0IGNsYXNzIFNjcmVlblNlcnZpY2Uge1xuXG4gICAgcHVibGljIGdldFNjcmVlbkZyYW1lKCk6IGFueSB7XG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBQYXR0ZXJuLCBJZGVudGlmaWVyLCBCYXNlTm9kZSwgVmFyaWFibGVEZWNsYXJhdGlvbiwgQXNzaWdubWVudEV4cHJlc3Npb24sIEZ1bmN0aW9uRGVjbGFyYXRpb24sIE5vZGUgfSBmcm9tIFwiZXN0cmVlXCI7XG5pbXBvcnQgeyBQcm9ncmVtU3RhdGUgfSBmcm9tIFwiLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgc3RyaW5naWZ5IH0gZnJvbSBcInF1ZXJ5c3RyaW5nXCI7XG5cbmV4cG9ydCB0eXBlIE5vZGVXaXRoUGFyZW50ID0gTm9kZSAmIHsgcGFyZW50PzogTm9kZSB9O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRXNwcmltYUhlbHBlciB7XG5cbiAgICBwdWJsaWMgc3RhdGljIHBhdHRlcm5Ub1N0cmluZyhwYXR0ZXJuOiBQYXR0ZXJuKTogc3RyaW5nIHtcbiAgICAgICAgdmFyIG5vZGU7XG4gICAgICAgIHN3aXRjaCAocGF0dGVybi50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdJZGVudGlmaWVyJzpcbiAgICAgICAgICAgICAgICBub2RlID0gcGF0dGVybiBhcyBJZGVudGlmaWVyO1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlLm5hbWU7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBjb252ZXJ0IHBhdHRlcm4gb2YgdHlwZSAnICsgcGF0dGVybi50eXBlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlZHVjZU5vZGVUb1ZhckRlY2xhcmF0aW9uKG5vZGU6IEJhc2VOb2RlKTogVmFyaWFibGVEZWNsYXJhdGlvbiB8IEFzc2lnbm1lbnRFeHByZXNzaW9uIHwgRnVuY3Rpb25EZWNsYXJhdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIFxuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnVmFyaWFibGVEZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgIGxldCBkZWNsID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0aW9uO1xuICAgICAgICAgICAgcmV0dXJuIGRlY2w7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnQXNzaWdubWVudEV4cHJlc3Npb24nKSB7XG4gICAgICAgICAgICBsZXQgZXhwciA9IG5vZGUgYXMgQXNzaWdubWVudEV4cHJlc3Npb247XG4gICAgICAgICAgICByZXR1cm4gZXhwcjtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdGdW5jdGlvbkRlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgbGV0IGZ1bmMgPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gZnVuYztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IHAgaW4gbm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChwID09PSAnbGVmdCcgfHwgcCA9PT0gJ3JpZ2h0JyB8fCBwID09PSAnYXJndW1lbnQnIHx8IHAgPT09ICdjYWxsZWUnIHx8IHAgPT09ICdib2R5JyB8fCBwID09PSAnZXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZDogQmFzZU5vZGUgPSBub2RlW3BdIGFzIEJhc2VOb2RlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gRXNwcmltYUhlbHBlci5yZWR1Y2VOb2RlVG9WYXJEZWNsYXJhdGlvbihjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHZhcmlhYmxlIG5hbWVzIG9mIGRlY2xhcmF0aW9uIG9yIGFzc2lnbm1lbnQgY29udGFpbmVkIGluIG5vZGUuXG4gICAgICogXG4gICAgICogQHBhcmFtIG5vZGUgXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRWYXJpYWJsZU5hbWVzKG5vZGU6IFZhcmlhYmxlRGVjbGFyYXRpb24gfCBBc3NpZ25tZW50RXhwcmVzc2lvbiB8IEZ1bmN0aW9uRGVjbGFyYXRpb24pOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgbGV0IGRlY2wgPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gZGVjbC5kZWNsYXJhdGlvbnMubWFwKGQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YXJOYW1lID0gRXNwcmltYUhlbHBlci5wYXR0ZXJuVG9TdHJpbmcoZC5pZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhck5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgIGxldCBkZWNsID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgICAgIGxldCB2YXJOYW1lID0gRXNwcmltYUhlbHBlci5wYXR0ZXJuVG9TdHJpbmcoZGVjbC5sZWZ0KTtcbiAgICAgICAgICAgIHJldHVybiBbdmFyTmFtZV07XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgIGxldCBmdW5jID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmMucGFyYW1zLm1hcChwID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEVzcHJpbWFIZWxwZXIucGF0dGVyblRvU3RyaW5nKHApO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YXJOYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB2YXJpYWJsZSB2YWx1ZXMgb2YgZGVjbGFyYXRpb24gb3IgYXNzaWdubWVudCBjb250YWluZWQgaW4gbm9kZS5cbiAgICAgKiBTYW1lIGFzIGdldFZhcmlhYmxlTmFtZXMgYnV0IGV2YWx1YXRlIHZhcmlhYmxlcyB0byBkaXNjb3ZlciB0aGVpciB2YWx1ZXMuXG4gICAgICogXG4gICAgICogQHBhcmFtIG5vZGUgXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRWYXJpYWJsZVZhbHVlcyhzdGF0ZTogUHJvZ3JlbVN0YXRlLCBub2RlOiBCYXNlTm9kZSk6IE1hcDxzdHJpbmcsIGFueT4ge1xuICAgICAgICBsZXQgdmFsdWVzTWFwID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgbGV0IHZhck5vZGVzID0gdGhpcy5yZWR1Y2VOb2RlVG9WYXJEZWNsYXJhdGlvbihub2RlKTtcbiAgICAgICAgaWYgKCF2YXJOb2Rlcykge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlc01hcDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldFZhcmlhYmxlTmFtZXModmFyTm9kZXMpLm1hcCh2YXJOYW1lID0+IHZhbHVlc01hcC5zZXQodmFyTmFtZSwgc3RhdGUuZXZhbCh2YXJOYW1lKSkpO1xuICAgICAgICByZXR1cm4gdmFsdWVzTWFwO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNDaGlsZE5vZGVPZihub2RlOiBOb2RlV2l0aFBhcmVudCwgcGFyZW50OiBCYXNlTm9kZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAobm9kZS5wYXJlbnQgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoIW5vZGUucGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gRXNwcmltYUhlbHBlci5pc0NoaWxkTm9kZU9mKG5vZGUucGFyZW50IGFzIE5vZGVXaXRoUGFyZW50LCBwYXJlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNOb3RDaGlsZE5vZGVPZihub2RlOiBOb2RlV2l0aFBhcmVudCwgcGFyZW50czogQmFzZU5vZGVbXSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAocGFyZW50cy5maW5kKHAgPT4gcCA9PT0gbm9kZS5wYXJlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoIW5vZGUucGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBFc3ByaW1hSGVscGVyLmlzTm90Q2hpbGROb2RlT2Yobm9kZS5wYXJlbnQgYXMgTm9kZVdpdGhQYXJlbnQsIHBhcmVudHMpO1xuICAgIH1cblxufSIsImltcG9ydCB7IENvbG9yUHJvdmlkZXIsIENvbG9yUHJvdmlkZXJGYWN0b3J5IH0gZnJvbSBcIi4vVHlwZXNcIjtcbmltcG9ydCB7IGNyZWF0ZSBhcyBtZDVDcmVhdGUgfSBmcm9tICdqcy1tZDUnO1xuXG5leHBvcnQgY2xhc3MgQmFzaWNDb2xvclByb3ZpZGVyRmFjdG9yeSBpbXBsZW1lbnRzIENvbG9yUHJvdmlkZXJGYWN0b3J5IHtcbiAgICBidWlsZChrZXk/OiBzdHJpbmcpOiBDb2xvclByb3ZpZGVyIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCYXNpY0NvbG9yUHJvdmlkZXIoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBCYXNpY0NvbG9yUHJvdmlkZXIgaW1wbGVtZW50cyBDb2xvclByb3ZpZGVyIHtcblxuICAgIHByaXZhdGUgY29sb3JNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwKCk7XG5cbiAgICBwdWJsaWMgaHNsQ29sb3IoaHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2hzbCgnICsgaHVlICsgJywgMTAwJSwgODAlKSc7XG4gICAgfVxuXG4gICAgcHVibGljIGhhc2hTdHJpbmdUb0NvbG9yKGtleTogc3RyaW5nLCBjb2xvckNvdW50OiBudW1iZXIsIHNoaWZ0OiBudW1iZXIgPSAyKSB7XG4gICAgICAgIHZhciBodWUgPSB0aGlzLmNvbG9yTWFwLmdldChrZXkpO1xuICAgICAgICBpZiAoaHVlKSByZXR1cm4gdGhpcy5oc2xDb2xvcihodWUpO1xuXG4gICAgICAgIHZhciBoYXNoID0gbWQ1Q3JlYXRlKCkudXBkYXRlKGtleSkudG9TdHJpbmcoKTtcbiAgICAgICAgXG4gICAgICAgIGh1ZSA9ICggcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAwLCBzaGlmdCArIDEpLCAxNikgKyAxNiAqIHBhcnNlSW50KGhhc2guc3Vic3RyaW5nKHNoaWZ0ICsgMSwgc2hpZnQgKyAyKSwgMTYpICsgMjU2ICogcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAyLCBzaGlmdCArIDMpLCAxNikgKTtcbiAgICAgICAgaHVlID0gTWF0aC5mbG9vcihodWUgJSBjb2xvckNvdW50KSAqIDM2MCAvIGNvbG9yQ291bnQ7XG4gICAgICAgIGh1ZSA9IGh1ZSAlIDM2MDtcblxuICAgICAgICAvLyBDb2xvciBkZWR1cGxpY2F0aW9uXG4gICAgICAgIHdoaWxlICghdGhpcy5jb2xvck1hcC5nZXQoa2V5KSkge1xuICAgICAgICAgICAgbGV0IGR1cGxpY2F0ZUNvbG9yID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGxldCBjIG9mIHRoaXMuY29sb3JNYXAudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoYyAtIGh1ZSkgPCBNYXRoLmZsb29yKDE4MCAvIGNvbG9yQ291bnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGR1cGxpY2F0ZUNvbG9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaHVlICs9IE1hdGguZmxvb3IoMjcwIC8gY29sb3JDb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIGh1ZSA9IGh1ZSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkdXBsaWNhdGVDb2xvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JNYXAuc2V0KGtleSwgaHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy92YXIgcGFzdGVsID0gJ2hzbCgnICsgaHVlICsgJywgMTAwJSwgODcuNSUpJztcbiAgICAgICAgcmV0dXJuIHRoaXMuaHNsQ29sb3IoaHVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29sb3JTZXJ2aWNlIHtcblxuICAgIGV4cG9ydCBjb25zdCBjb2xvclByb3ZpZGVyYWN0b3J5OiBDb2xvclByb3ZpZGVyRmFjdG9yeSA9IG5ldyBCYXNpY0NvbG9yUHJvdmlkZXJGYWN0b3J5KCk7XG5cbn1cbiIsImltcG9ydCB7IFByb2dyZW1Db21wb25lbnQsIFByb2dyZW1TY2hlZHVsZXIsIFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyLCBHcmlkQ2hhbmdlTGlzdGVuZXIsIFByb2dyZW1TdGF0ZSB9IGZyb20gXCIuLi8uLi9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBTY3JlZW5Db25maWcgfSBmcm9tIFwiLi4vLi4vY29yZS9TY3JlZW5TZXJ2aWNlXCI7XG5pbXBvcnQgeyBQcm9ncmVtQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvcmUvUHJvZ3JlbVNlcnZpY2VcIjtcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9IdG1sSGVscGVyXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyIH0gZnJvbSBcInJ4anNcIjtcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1HcmlkQ29tcG9uZW50IGltcGxlbWVudHMgUHJvZ3JlbUNvbXBvbmVudCwgU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciB7XG4gICAgXG4gICAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgYmxpbmtJbnRlcnZhbCA9IDIwMDtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZywgXG4gICAgICAgIHByaXZhdGUgcHJvZ3JlbUNvbmZpZzogUHJvZ3JlbUNvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXIsXG4gICAgICAgIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50XG4gICAgICAgICkge1xuICAgICAgICBsZXQgZW5XYXJuaW5nID0gSHRtbEhlbHBlci5wKCd3YXJuaW5nJywgXCJZb3VyIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IGNhbnZhcy5cIik7XG4gICAgICAgIGxldCBmcldhcm5pbmcgPSBIdG1sSGVscGVyLnAoJ3dhcm5pbmcnLCBcIlZvdHJlIG5hdmlnYXRldXIgbmUgc3VwcG9ydGUgcGFzIGxlcyBjYW52YXMuXCIpO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IEh0bWxIZWxwZXIuY2FudmFzKCcnLCBbZW5XYXJuaW5nLCBmcldhcm5pbmddKTtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLnByb2dyZW1Db25maWcuY29sb25uZXMgKiB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLnByb2dyZW1Db25maWcuY29sb25uZXMgKiB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplO1xuXG4gICAgICAgIGxldCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBpZiAoIWN0eCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gb2J0YWluIDJEIENhbnZhcyBjb250ZXh0ICEnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuXG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVTdGFydEl0ZXJhdGluZ0NvZGUodGhpcyk7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVHcmlkQ2hhbmdlKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbmRlckh0bWwoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdwcm9ncmVtLWdyaWQnLCB0aGlzLmNhbnZhcyk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY29sb3JDdXJyZW50UGl4ZWwoc3RhdGU6IFByb2dyZW1TdGF0ZSwgY29sb3I6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBsZXQgYm94U2l6ZSA9IHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG4gICAgICAgIGxldCBjID0gc3RhdGUuY29sb25uZTtcbiAgICAgICAgbGV0IGwgPSBzdGF0ZS5saWduZTtcblxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoYyAqIGJveFNpemUsIGwgKiBib3hTaXplLCBib3hTaXplLCBib3hTaXplKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYmxpbmtDdXJyZW50UGl4ZWwoc3RhdGU6IFByb2dyZW1TdGF0ZSwgaW5jcmVtbnQ6IG51bWJlcikge1xuICAgICAgICBsZXQgY29sb3IgPSAnYmxhY2snO1xuICAgICAgICBpZiAoaW5jcmVtbnQgJSAyID09PSAwKSB7XG4gICAgICAgICAgICBjb2xvciA9ICd3aGl0ZSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb2xvckN1cnJlbnRQaXhlbChzdGF0ZSwgY29sb3IpO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgZmlyZVN0YXJ0SXRlcmF0aW5nQ29kZSAoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBPYnNlcnZhYmxlLmludGVydmFsKHRoaXMuYmxpbmtJbnRlcnZhbCwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIpLnN1YnNjcmliZSh0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuYmxpbmtDdXJyZW50UGl4ZWwoc3RhdGUsIHQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmaXJlR3JpZENoYW5nZSAoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYm94U2l6ZSA9IHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG4gICAgICAgIGxldCBjID0gc3RhdGUuY29sb25uZTtcbiAgICAgICAgbGV0IGwgPSBzdGF0ZS5saWduZTtcblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGxldCBjb3VsZXVyID0gY29sb3JlclByb2dyZW0oYywgbCwgc3RhdGUuY29udGV4dGUpO1xuICAgICAgICBpZiAoY291bGV1cikge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY291bGV1cjtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KGMgKiBib3hTaXplLCBsICogYm94U2l6ZSwgYm94U2l6ZSwgYm94U2l6ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemUgKiB0aGlzLnByb2dyZW1Db25maWcuY29sb25uZXM7XG4gICAgICAgIGxldCBoZWlnaHQgPSB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplICogdGhpcy5wcm9ncmVtQ29uZmlnLmxpZ25lcztcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxufSJdLCJzb3VyY2VSb290IjoiIn0=