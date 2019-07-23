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
        this.ctx.fillStyle = 'antiquewhite';
        this.ctx.fillRect(0, 0, width, height);
    }
}
exports.ProgremGridComponent = ProgremGridComponent;


/***/ })

},[["/7QA","runtime","npm.rxjs-compat","npm.rxjs","npm.escodegen","npm.esutils","npm.estraverse","npm.webpack","npm.esprima-walk","npm.esprima","npm.js-md5","npm.process","npm.tslib"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9yU3R5bGVEZWNvcmF0b3JzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92YXJpYWJsZVNjb3BlL1ZhcmlhYmxlU2NvcGVDb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvSHRtbEhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXNwcmltYS9CYXNpY0VzcHJpbWFQcm9ncmVtLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL0V2YWxTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL1NjaGVkdWxpbmdTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3Byb2dyZW1JbnNwZWN0b3IvRXNwcmltYVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL1Byb2dyZW1JbnNwZWN0b3JDb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdmFyaWFibGVTY29wZS9Fc3ByaW1hVmFyaWFibGVTY29wZVN0eWxlRGVjb3JhdG9ycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9Qcm9ncmVtU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92YXJpYWJsZVNjb3BlL0VzcHJpbWFWYXJpYWJsZVNjb3BlSHRtbEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvVHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvQ29kZVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvU2NyZWVuU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXNwcmltYS9Fc3ByaW1hSGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL0NvbG9yU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtR3JpZC9Qcm9ncmVtR3JpZENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBR0EsbUdBQXdFO0FBQ3hFLGtGQUF1RDtBQUV2RCxNQUFhLDJCQUEyQjtJQUF4QztRQUVZLGdCQUFXLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDN0Msa0JBQWEsR0FBa0IsMkJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQTZDcEYsQ0FBQztJQTNDRyxRQUFRLENBQUMsSUFBYyxFQUFFLE9BQW9CO1FBQ3pDLElBQUksS0FBSyxDQUFDO1FBRVYsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRTtZQUM1QixJQUFJLENBQUMsR0FBRyxJQUFrQixDQUFDO1lBQzNCLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ2xCO1FBRUQsSUFBSSxLQUFLLEVBQUU7WUFDUCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNYLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN6QztZQUVELE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsQ0FBQztTQUNqRDtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2Ysd0RB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Q0FBQyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztZQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsR0FBRyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2pFO0lBQ0wsQ0FBQztJQUVTLEtBQUs7UUFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUNwRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUNuRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7UUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUVKO0FBeEZELG9EQXdGQyIsImZpbGUiOiJpbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdHlsZURlY29yYXRvciwgQ29sb3JQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNlTm9kZSwgSWRlbnRpZmllciB9IGZyb20gXCJlc3RyZWVcIjtcblxuaW1wb3J0IHsgUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudCB9IGZyb20gXCIuL1Byb2dyZW1JbnNwZWN0b3JDb21wb25lbnRcIjtcbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb3JlL0NvbG9yU2VydmljZVwiO1xuXG5leHBvcnQgY2xhc3MgQ29sb3JWZXJzZVZhcmlhYmxlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8QmFzZU5vZGU+IHtcblxuICAgIHByaXZhdGUgdmFyaWFibGVNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBjb2xvclByb3ZpZGVyOiBDb2xvclByb3ZpZGVyID0gQ29sb3JTZXJ2aWNlLmNvbG9yUHJvdmlkZXJhY3RvcnkuYnVpbGQoKTtcblxuICAgIGRlY29yYXRlKG5vZGU6IEJhc2VOb2RlLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IHZhcklkO1xuXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdJZGVudGlmaWVyJykge1xuICAgICAgICAgICAgbGV0IG4gPSBub2RlIGFzIElkZW50aWZpZXI7XG4gICAgICAgICAgICB2YXJJZCA9IG4ubmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YXJJZCkge1xuICAgICAgICAgICAgbGV0IHZhckluZGV4ID0gdGhpcy52YXJpYWJsZU1hcC5nZXQodmFySWQpO1xuICAgICAgICAgICAgaWYgKCF2YXJJbmRleCkge1xuICAgICAgICAgICAgICAgIHZhckluZGV4ID0gdGhpcy52YXJpYWJsZU1hcC5zaXplICsgMTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhcmlhYmxlTWFwLnNldCh2YXJJZCwgdmFySW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3ZhcmlhYmxlJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3ZhcmlhYmxlLScgKyB2YXJJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9ICAgIFxuICAgIFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc3R5bGUgPSAnJztcbiAgICAgICAgLy9jb25zb2xlLmxvZygndmFyaWFibGUgY291bnQ6JywgdGhpcy52YXJpYWJsZU1hcC5zaXplKTtcbiAgICAgICAgdGhpcy52YXJpYWJsZU1hcC5mb3JFYWNoKChpbmRleCwgaWQpID0+IHtcbiAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMuY29sb3JQcm92aWRlci5oYXNoU3RyaW5nVG9Db2xvcihpZCwgMTYpOyAvL3RoaXMudmFyaWFibGVNYXAuc2l6ZVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYnVpbGRpbmcgY29sb3IgIycsIGlkLCAnPT4nLCBjb2xvcik7XG4gICAgICAgICAgICBzdHlsZSArPSBgXG4gICAgICAgICAgICAgICAgLnZhcmlhYmxlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMC4xZW0gMC41ZW0gMC4xZW0gMC41ZW07XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwLjhlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLiR7UHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRJTkdfQ0xBU1N9IC52YXJpYWJsZS0ke2luZGV4fS5pZGVudGlmaWVyLCBcbiAgICAgICAgICAgICAgICAuJHtQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVEVEX0NMQVNTfSAudmFyaWFibGUtJHtpbmRleH0uaWRlbnRpZmllciB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBgO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBhZFZlcnNlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8QmFzZU5vZGU+IHtcblxuICAgIGRlY29yYXRlKG5vZGU6IEJhc2VOb2RlLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb2RlLXBhZGRpbmcnKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSAgICBcbiAgICBcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgLmNvZGUtcGFkZGluZyB7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMzJweDtcbiAgICAgICAgfVxuICAgICAgICBgO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgUHJvZ3JlbVNlcnZpY2UsIFByb2dyZW1Db25maWcgfSBmcm9tIFwiLi9jb3JlL1Byb2dyZW1TZXJ2aWNlXCI7XG5pbXBvcnQgeyBTY3JlZW5Db25maWcgfSBmcm9tIFwiLi9jb3JlL1NjcmVlblNlcnZpY2VcIjtcblxubGV0IHNjcmVlbkNvbmZpZyA9IG5ldyBTY3JlZW5Db25maWcoMjApO1xubGV0IHByb2dyZW1Db25maWcgPSBuZXcgUHJvZ3JlbUNvbmZpZygxNywgMTcsIDEpO1xuXG5Qcm9ncmVtU2VydmljZS5idWlsZFByb2dyZW0oJy4vcHJvZ3JlbXMvY29ldXJfcHJvZ3JlbS5qcycsIHNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZyk7IiwiaW1wb3J0IHsgUHJvZ3JlbUNvbXBvbmVudCwgR3JpZENoYW5nZUxpc3RlbmVyLCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIFByb2dyZW1TdGF0ZSwgQ29sb3JQcm92aWRlciwgUHJvZ3JlbVNjaGVkdWxlciwgSHRtbENvdXBsZXRGYWN0b3J5IH0gZnJvbSBcIi4uLy4uL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IEVzcHJpbWFIZWxwZXIgfSBmcm9tIFwiLi4vLi4vZXNwcmltYS9Fc3ByaW1hSGVscGVyXCI7XG5pbXBvcnQgeyBWYXJpYWJsZURlY2xhcmF0aW9uLCBBc3NpZ25tZW50RXhwcmVzc2lvbiwgRnVuY3Rpb25EZWNsYXJhdGlvbiB9IGZyb20gXCJlc3RyZWVcIjtcbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb3JlL0NvbG9yU2VydmljZVwiO1xuaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuXG5leHBvcnQgY2xhc3MgVmFyaWFibGVTY29wZUNvbXBvbmVudCBpbXBsZW1lbnRzIFByb2dyZW1Db21wb25lbnQsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyIHtcblxuICAgIHByaXZhdGUgaHRtbENvbnRhaW5lcjogSFRNTEVsZW1lbnR8bnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBjb2xvclByb3ZpZGVyOiBDb2xvclByb3ZpZGVyID0gQ29sb3JTZXJ2aWNlLmNvbG9yUHJvdmlkZXJhY3RvcnkuYnVpbGQoKTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXIsXG4gICAgICAgIHByaXZhdGUgaHRtbEZhY3Rvcnk6IEh0bWxDb3VwbGV0RmFjdG9yeTxhbnk+XG4gICAgKSB7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVDb2RlRXhlY3V0aW9uKHRoaXMpO1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlR3JpZENoYW5nZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZW5kZXJIdG1sKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGh0bWxDb21wb25lbnQgPSB0aGlzLmh0bWxGYWN0b3J5LmJ1aWxkQ291cGxldCgpO1xuICAgICAgICB0aGlzLmh0bWxDb250YWluZXIgPSBodG1sQ29tcG9uZW50O1xuICAgICAgICByZXR1cm4gaHRtbENvbXBvbmVudDtcbiAgICB9XG5cbiAgICBmaXJlQ29kZUV4ZWN1dGlvbihzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIGlmICghc3RhdGUudmVyc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodG1sVmVyc2UgPSB0aGlzLmh0bWxGYWN0b3J5LmdldEh0bWxWZXJzZShzdGF0ZS52ZXJzZSk7XG4gICAgICAgIGlmICh0aGlzLmh0bWxDb250YWluZXIgJiYgaHRtbFZlcnNlKSB7XG4gICAgICAgICAgICB0aGlzLmh0bWxDb250YWluZXIuYXBwZW5kQ2hpbGQoaHRtbFZlcnNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpcmVHcmlkQ2hhbmdlKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaHRtbENvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5odG1sQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSHRtbEhlbHBlciB7XG5cbiAgICBzdGF0aWMgYWRkQ2xhc3NlcyhlbHQ6IEhUTUxFbGVtZW50LCBjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGFzc2VzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY2xhc3Nlcy5zcGxpdCgnICcpLmZvckVhY2goYyA9PiBlbHQuY2xhc3NMaXN0LmFkZChjKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2xhc3NlcykpIHtcbiAgICAgICAgICAgIGNsYXNzZXMuZm9yRWFjaChjID0+IGVsdC5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBzcGFuKGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSwgY29udGVudD86IHN0cmluZ3xIVE1MRWxlbWVudHwoSFRNTEVsZW1lbnR8c3RyaW5nKVtdKTogSFRNTFNwYW5FbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIudGFnKCdzcGFuJywgY2xhc3NlcywgY29udGVudCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHAoY2xhc3Nlczogc3RyaW5nfHN0cmluZ1tdLCBjb250ZW50Pzogc3RyaW5nfEhUTUxFbGVtZW50fChIVE1MRWxlbWVudHxzdHJpbmcpW10pOiBIVE1MUGFyYWdyYXBoRWxlbWVudCB7XG4gICAgICAgIHJldHVybiBIdG1sSGVscGVyLnRhZygncCcsIGNsYXNzZXMsIGNvbnRlbnQpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgIH1cblxuICAgIHN0YXRpYyBkaXYoY2xhc3Nlczogc3RyaW5nfHN0cmluZ1tdLCBjb250ZW50Pzogc3RyaW5nfEhUTUxFbGVtZW50fChIVE1MRWxlbWVudHxzdHJpbmcpW10pOiBIVE1MRGl2RWxlbWVudCB7XG4gICAgICAgIHJldHVybiBIdG1sSGVscGVyLnRhZygnZGl2JywgY2xhc3NlcywgY29udGVudCkgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGNhbnZhcyhjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxDYW52YXNFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIudGFnKCdjYW52YXMnLCBjbGFzc2VzLCBjb250ZW50KSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyB0YWcodGFnTmFtZTogc3RyaW5nLCBjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGVsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgICAgIGlmIChjbGFzc2VzKSB7XG4gICAgICAgICAgICBIdG1sSGVscGVyLmFkZENsYXNzZXMoZWx0LCBjbGFzc2VzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGVsdC5pbm5lclRleHQgPSBjb250ZW50O1xuICAgICAgICAgICAgY29uc29sZS5sb2coYGNvbnRlbnQ6IFske2NvbnRlbnR9XWApO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgZWx0LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY29udGVudCkpIHtcbiAgICAgICAgICAgIGNvbnRlbnQuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsdC5pbm5lckhUTUwgKz0gYztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgZWx0LmFwcGVuZENoaWxkKGMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gYWRkIGNvbnRlbnQ6JywgYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGVsdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmaW5lQ3NzUnVsZXMoaWQ6IHN0cmluZywgY3NzUnVsZXM6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBsZXQgY3NzSWQgPSAnY3NzLScgKyBpZDtcbiAgICAgICAgbGV0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNzc0lkKTtcbiAgICAgICAgaWYoIXN0eWxlRWxlbWVudCkge1xuICAgICAgICAgICAgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgfVxuICAgICAgICBzdHlsZUVsZW1lbnQuaWQgPSBjc3NJZDtcbiAgICAgICAgLyogYWRkIHN0eWxlIHJ1bGVzIHRvIHRoZSBzdHlsZSBlbGVtZW50ICovXG4gICAgICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3NSdWxlcykpO1xuICAgICAgICBcbiAgICAgICAgLyogYXR0YWNoIHRoZSBzdHlsZSBlbGVtZW50IHRvIHRoZSBkb2N1bWVudCBoZWFkICovXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG59IiwiXG5pbXBvcnQgeyBQcm9ncmFtLCBwYXJzZU1vZHVsZSwgUGFyc2VPcHRpb25zIH0gZnJvbSAnZXNwcmltYSc7XG5pbXBvcnQgeyB3YWxrIGFzIGVzcHJpbWFXYWxrLCB3YWxrQWRkUGFyZW50IGFzIGVzcHJpbWFXYWxrQWRkUGFyZW50IH0gZnJvbSAnZXNwcmltYS13YWxrJztcbmltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcbmltcG9ydCB7IEJhc2VOb2RlLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBCbG9ja1N0YXRlbWVudCwgSWZTdGF0ZW1lbnQsIFJldHVyblN0YXRlbWVudCwgU3RhdGVtZW50IH0gZnJvbSAnZXN0cmVlJztcbmltcG9ydCB7IEVzcHJpbWFWZXJzZUl0ZXJhb3IsIEVzcHJpbWFWZXJzZSwgRXNwcmltYUNvdXBsZXQsIEVzcHJpbWFQcm9ncmVtRmFjdG9yeSwgRXNwcmltYVByb2dyZW0gfSBmcm9tICcuL0VzcHJpbWFUeXBlcyc7XG5pbXBvcnQgeyBFc3ByaW1hSGVscGVyIH0gZnJvbSAnLi9Fc3ByaW1hSGVscGVyJztcbmltcG9ydCB7IENvZGVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9Db2RlU2VydmljZSc7XG5pbXBvcnQgeyBQcm9ncmVtU3RhdGUgfSBmcm9tICcuLi9jb3JlL1R5cGVzJztcblxuY2xhc3MgQmFzaWNFc3ByaW1hQ29kZUl0ZXJhdG9yIGltcGxlbWVudHMgRXNwcmltYVZlcnNlSXRlcmFvciB7XG5cbiAgICBwcml2YXRlIHN0YWNrOiBCYXNlTm9kZVtdID0gW107XG4gICAgcHJpdmF0ZSByZXR1cm5WYWx1ZTogYW55ID0gbnVsbDtcbiAgICBwcml2YXRlIGZpbmlzaGVkID0gZmFsc2VcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgcHJpdmF0ZSByb290Tm9kZTogQmFzZU5vZGUsIFxuICAgICAgICAgICAgcHJpdmF0ZSBzdGF0ZTogUHJvZ3JlbVN0YXRlKSB7XG4gICAgICAgIHRoaXMuc3RhY2sucHVzaChyb290Tm9kZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWNsYXJlUHJvZ3JlbUFyZ3VtZW50cygpIHtcbiAgICAgICAgbGV0IF9jb2xvbm5lID0gdGhpcy5zdGF0ZS5jb2xvbm5lO1xuICAgICAgICBsZXQgX2xpZ25lID0gdGhpcy5zdGF0ZS5saWduZTtcbiAgICAgICAgbGV0IF9jb250ZXh0ZSA9IHRoaXMuc3RhdGUuY29udGV4dGU7XG5cbiAgICAgICAgdGhpcy5zdGF0ZS5ldmFsKCd2YXIgY29sb25uZSA9ICcgKyBfY29sb25uZSArICcsIGxpZ25lID0gJyArIF9saWduZSArICc7Jyk7XG4gICAgICAgIHRoaXMuc3RhdGUuZXZhbCgndmFyIGNvbnRleHRlID0gJyArIEpTT04uc3RyaW5naWZ5KF9jb250ZXh0ZSkpO1xuICAgIH1cblxuICAgIGV4ZWN1dGVOZXh0KCk6IEVzcHJpbWFWZXJzZSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgZmlyc3Qgbm9kZSBvbiB0aGUgc3RhY2tcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5zdGFjay5zaGlmdCgpO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdOb2RlOicsIG5vZGUpO1xuXG4gICAgICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0YWNrIHNob3VsZCBub3QgYmUgZW1wdHkgIScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3RtdDtcblxuICAgICAgICAgICAgc3dpdGNoKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Z1bmN0aW9uRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KGZ1bmMuYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjbGFyZVByb2dyZW1Bcmd1bWVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkVmVyc2UoZnVuYyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2sgPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBibG9jay5ib2R5LnNsaWNlKCkucmV2ZXJzZSgpLm1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0Jsb2NrU3RhdGVtZW50IHVuc2hpZnRpbmc6JywgeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoeClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnSWZTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBzdG10ID0gbm9kZSBhcyBJZlN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3RDb2RlID0gZXNjb2RlR2VuZXJhdGUoc3RtdC50ZXN0KTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdFJlc3VsdCA9IHRoaXMuc3RhdGUuZXZhbCh0ZXN0Q29kZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0lmU3RhdGVtZW50IHRlc3QgZXZhbHVhdGUgdG86ICcsIHRlc3RSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVzdFJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnVGhlbiB1bnNoaWZ0aW5nOicsIHN0bXQuY29uc2VxdWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoc3RtdC5jb25zZXF1ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdG10LmFsdGVybmF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0Vsc2UgdW5zaGlmdGluZzonLCBzdG10LmFsdGVybmF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KHN0bXQuYWx0ZXJuYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFZlcnNlKHN0bXQpO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnUmV0dXJuU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgc3RtdCA9IG5vZGUgYXMgUmV0dXJuU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlID0gdGhpcy5zdGF0ZS5ldmFsKGVzY29kZUdlbmVyYXRlKHN0bXQuYXJndW1lbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFZlcnNlKHN0bXQpO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnTm9kZTonLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvZGUgPSBlc2NvZGVHZW5lcmF0ZShub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnR2VuZXJhdGVkIGNvZGU6JywgY29kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBldmFsUmVzdWx0ID0gdGhpcy5zdGF0ZS5ldmFsKGNvZGUpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdFdmFsdWF0ZSB0bzonLCBldmFsUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkVmVyc2Uobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuc3RhY2subGVuZ3RoID4gMCk7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJdGVyYXRvciBoYXMgbm8gbW9yZSBjb2RlIHRvIGV4ZWN1dGUgIScpO1xuICAgIH0gICAgXG4gICAgXG4gICAgaGFzTmV4dCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuZmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBub2RlcyA9IHRoaXMuc3RhY2suc2xpY2UoMCk7XG4gICAgICAgIHdoaWxlIChub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5vZGVzLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLnR5cGUgIT09ICdCbG9ja1N0YXRlbWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrczogQmxvY2tTdGF0ZW1lbnRbXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2sgPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBibG9ja3MucHVzaChibG9jayk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhcnNvdXJzIHJlY3Vyc2l2ZW1lbnQgbGVzIGJsb2NrcyDDoCBsYSByZWNoZXJjaGUgZGUgbm9ldWQgcXVpIG5lIHNvbnQgcGFzIGRlcyBibG9ja3NcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhhc05leHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFoYXNOZXh0ICYmIGJsb2Nrcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYiA9IGJsb2Nrcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiLmJvZHkubWFwKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeC50eXBlICE9PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNOZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhc05leHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBjbGFzcyBCYXNpY0VzcHJpbWFQcm9ncmVtIGltcGxlbWVudHMgRXNwcmltYVByb2dyZW0ge1xuXG4gICAgcHJpdmF0ZSBlc3ByaW1hUHJvZ3JhbTogUHJvZ3JhbTtcblxuICAgIGNvbnN0cnVjdG9yKGNvZGU6IHN0cmluZykge1xuICAgICAgICBsZXQgY29uZmlnOiBQYXJzZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjb21tZW50OiB0cnVlLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXNwcmltYVByb2dyYW0gPSBwYXJzZU1vZHVsZShjb2RlLCBjb25maWcpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB3YWxrUHJvZ3JlbUNvdXBsZXQoZnVuY3Rpb25OYW1lOiBzdHJpbmcpOiBFc3ByaW1hQ291cGxldCB7XG4gICAgICAgIHZhciBmdW5jTm9kZTogRnVuY3Rpb25EZWNsYXJhdGlvbiB8IG51bGwgPSBudWxsO1xuICAgICAgICB2YXIgdmVyc2VzOiBCYXNlTm9kZVtdID0gW107XG4gICAgICAgIGVzcHJpbWFXYWxrQWRkUGFyZW50KHRoaXMuZXNwcmltYVByb2dyYW0sIG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYoIG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nICYmIG5vZGUuaWQgJiYgbm9kZS5pZC5uYW1lID09PSBmdW5jdGlvbk5hbWUpIHtcbiAgICAgICAgICAgICAgICBmdW5jTm9kZSA9IG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZnVuY05vZGUgJiYgRXNwcmltYUhlbHBlci5pc0NoaWxkTm9kZU9mKG5vZGUsIGZ1bmNOb2RlKSkgeyAvLyAmJiBFc3ByaW1hSGVscGVyLmlzTm90Q2hpbGROb2RlT2Yobm9kZSwgdmVyc2VzKVxuICAgICAgICAgICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdGdW5jdGlvbkRlY2xhcmF0aW9uJyBcbiAgICAgICAgICAgICAgICAgICAgfHwgbm9kZS50eXBlID09PSAnVmFyaWFibGVEZWNsYXJhdGlvbidcbiAgICAgICAgICAgICAgICAgICAgfHwgbm9kZS50eXBlID09PSAnRXhwcmVzc2lvblN0YXRlbWVudCdcbiAgICAgICAgICAgICAgICAgICAgfHwgbm9kZS50eXBlID09PSAnUmV0dXJuU3RhdGVtZW50J1xuICAgICAgICAgICAgICAgICAgICB8fCBub2RlLnR5cGUgPT09ICdJZlN0YXRlbWVudCcgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJzZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gKTtcbiAgICAgICAgaWYgKGZ1bmNOb2RlKSB7XG4gICAgICAgICAgICB2ZXJzZXMudW5zaGlmdChmdW5jTm9kZSk7XG4gICAgICAgICAgICByZXR1cm4gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRDb3VwbGV0KGZ1bmNOb2RlLCB2ZXJzZXMpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW1wb3NzaWJsZSBkZSB0cm91dmVyIGxhIGZvbmN0aW9uICR7ZnVuY3Rpb25OYW1lfSgpICFgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdGlhbGlzZXJQcm9ncmVtRnVuY3Rpb24oKTogRXNwcmltYUNvdXBsZXQge1xuICAgICAgICByZXR1cm4gdGhpcy53YWxrUHJvZ3JlbUNvdXBsZXQoJ2luaXRpYWxpc2VyUHJvZ3JlbScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk6IEVzcHJpbWFDb3VwbGV0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2Fsa1Byb2dyZW1Db3VwbGV0KCdjb2xvcmVyUHJvZ3JlbScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpdGVyYXRvcihzdGF0ZTogUHJvZ3JlbVN0YXRlKTogRXNwcmltYVZlcnNlSXRlcmFvciB7XG4gICAgICAgIHJldHVybiBuZXcgQmFzaWNFc3ByaW1hQ29kZUl0ZXJhdG9yKHRoaXMuY29sb3JlclByb2dyZW1GdW5jdGlvbigpLmZ1bmN0aW9uUm9vdE5vZGUsIHN0YXRlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBCYXNpY0VzcHJpbWFQcm9ncmVtRmFjdG9yeSBpbXBsZW1lbnRzIEVzcHJpbWFQcm9ncmVtRmFjdG9yeSB7XG5cbiAgICBidWlsZFByb2dyZW0oY29kZTogc3RyaW5nKTogRXNwcmltYVByb2dyZW0ge1xuICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW1wb3NzaWJsZSB0byBidWlsZCBQcm9ncmVtIHdpdGhvdXQgY29kZSAhJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBCYXNpY0VzcHJpbWFQcm9ncmVtKGNvZGUpO1xuICAgIH1cblxuICAgIGJ1aWxkQ291cGxldChub2RlOiBGdW5jdGlvbkRlY2xhcmF0aW9uLCB2ZXJzZXM6IEJhc2VOb2RlW10pOiBFc3ByaW1hQ291cGxldCB7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBvc3NpYmxlIHRvIGJ1aWxkIGVtcHR5IENvdXBsZXQgIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVzcHJpbWFWZXJzZXMgPSB2ZXJzZXMubWFwKHRoaXMuYnVpbGRWZXJzZSk7XG5cbiAgICAgICAgbGV0IGNvdXBsZXQ6IEVzcHJpbWFDb3VwbGV0ID0ge1xuICAgICAgICAgICAgZnVuY3Rpb25Sb290Tm9kZTogbm9kZSxcbiAgICAgICAgICAgIHZlcnNlczogZXNwcmltYVZlcnNlc1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdCdWlsdCBjb3VwbGV0OicsIGNvdXBsZXQpO1xuICAgICAgICByZXR1cm4gY291cGxldDtcbiAgICB9XG5cbiAgICBidWlsZFZlcnNlKG5vZGU6IEJhc2VOb2RlKTogRXNwcmltYVZlcnNlIHtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcG9zc2libGUgdG8gYnVpbGQgZW1wdHkgVmVyc2UgIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvZGUgPSBub2RlO1xuICAgICAgICBpZihub2RlLnR5cGUgPT09ICdJZlN0YXRlbWVudCcpIHtcbiAgICAgICAgICAgIGNvZGUgPSAobm9kZSBhcyBJZlN0YXRlbWVudCkudGVzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2ZXJzZTogRXNwcmltYVZlcnNlID0geyBcbiAgICAgICAgICAgIG5vZGU6IG5vZGUsXG4gICAgICAgICAgICBjb2RlOiBjb2RlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB2ZXJzZTtcbiAgICB9XG59XG4iLCJcbmV4cG9ydCBjbGFzcyBFdmFsU2NvcGUge1xuXG4gICAgLy8gU2VlIGh0dHA6Ly9wZXJmZWN0aW9ua2lsbHMuY29tL2dsb2JhbC1ldmFsLXdoYXQtYXJlLXRoZS1vcHRpb25zL1xuICAgIC8vIFdpbGwgcmV0dXJuIGFuIGV2YWwgYWJsZSB0byBldmFsdWF0ZSBqcyBjb2RlIGluIHRoZSBnbG9iYWwgc2NvcGUuXG4gICAgcHVibGljIHJlYWRvbmx5IGdsb2JhbEV2YWwgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciBpc0luZGlyZWN0RXZhbEdsb2JhbCA9IChmdW5jdGlvbiAob3JpZ2luYWwsIE9iamVjdCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvLyBEb2VzIGBPYmplY3RgIHJlc29sdmUgdG8gYSBsb2NhbCB2YXJpYWJsZSwgb3IgdG8gYSBnbG9iYWwsIGJ1aWx0LWluIGBPYmplY3RgLFxuICAgICAgICAgICAgICAgIC8vIHJlZmVyZW5jZSB0byB3aGljaCB3ZSBwYXNzZWQgYXMgYSBmaXJzdCBhcmd1bWVudD9cbiAgICAgICAgICAgICAgICByZXR1cm4gKDEsIGV2YWwpKCdPYmplY3QnKSA9PT0gb3JpZ2luYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgaW5kaXJlY3QgZXZhbCBlcnJvcnMgb3V0IChhcyBhbGxvd2VkIHBlciBFUzMpLCB0aGVuIGp1c3QgYmFpbCBvdXQgd2l0aCBgZmFsc2VgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KShPYmplY3QsIDEyMyk7XG5cbiAgICAgICAgaWYgKGlzSW5kaXJlY3RFdmFsR2xvYmFsKSB7XG4gICAgICAgICAgICAvLyBpZiBpbmRpcmVjdCBldmFsIGV4ZWN1dGVzIGNvZGUgZ2xvYmFsbHksIHVzZSBpdFxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChleHByZXNzaW9uOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDEsIGV2YWwpKGV4cHJlc3Npb24pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cuZXhlY1NjcmlwdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIC8vIGlmIGB3aW5kb3cuZXhlY1NjcmlwdCBleGlzdHNgLCB1c2UgaXRcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXhwcmVzc2lvbjogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuZXhlY1NjcmlwdChleHByZXNzaW9uKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdGhlcndpc2UsIGdsb2JhbEV2YWwgaXMgYHVuZGVmaW5lZGAgc2luY2Ugbm90aGluZyBpcyByZXR1cm5lZFxuICAgICAgICByZXR1cm4gKGV4cHI6IHN0cmluZykgPT4ge3Rocm93IG5ldyBFcnJvcignTm8gZ2xvYmFsIGV2YWwgYXZhaWxhYmxlICEnKTt9XG4gICAgfSkoKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxufVxuIiwiaW1wb3J0IHsgUHJvZ3JlbUNvbmZpZyB9IGZyb20gXCIuL1Byb2dyZW1TZXJ2aWNlXCI7XG5pbXBvcnQgeyBFdmFsU2NvcGUgfSBmcm9tIFwiLi9FdmFsU2VydmljZVwiO1xuaW1wb3J0IHsgUHJvZ3JlbVNjaGVkdWxlciwgVmVyc2VJdGVyYXRvciwgUHJvZ3JlbUNvZGUsIFByb2dyZW1WZXJzZSwgU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyLCBMaW5lQ2hhbmdlTGlzdGVuZXIsIEZyYW1lQ2hhbmdlTGlzdGVuZXIsIFByb2dyZW1TdGF0ZSB9IGZyb20gXCIuL1R5cGVzXCI7XG5cbmNsYXNzIFNpbXBsZVByb2dyZW1TY2hlZHVsZXIgaW1wbGVtZW50cyBQcm9ncmVtU2NoZWR1bGVyIHtcbiAgICBcbiAgICBwcml2YXRlIHN0YXRlOiBQcm9ncmVtU3RhdGU7XG4gICAgcHJpdmF0ZSBjb2RlSXRlcmF0b3I6IFZlcnNlSXRlcmF0b3I8YW55PiB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBzdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lcnM6IFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGNvZGVFeGVjdXRpb25MaXN0ZW5lcnM6IENvZGVFeGVjdXRpb25MaXN0ZW5lcltdID0gW107XG4gICAgcHJpdmF0ZSBncmlkQ2hhbmdlTGlzdGVuZXJzOiBHcmlkQ2hhbmdlTGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgbGluZUNoYW5nZUxpc3RlbmVyczogTGluZUNoYW5nZUxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGZyYW1lQ2hhbmdlTGlzdGVuZXJzOiBGcmFtZUNoYW5nZUxpc3RlbmVyW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBQcm9ncmVtQ29uZmlnLCBwcml2YXRlIGNvZGU6IFByb2dyZW1Db2RlPGFueT4pIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVTdGFydEl0ZXJhdGluZ0NvZGUobGlzdGVuZXI6IFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gICAgXG5cbiAgICBzdWJzY3JpYmVDb2RlRXhlY3V0aW9uKGxpc3RlbmVyOiBDb2RlRXhlY3V0aW9uTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb2RlRXhlY3V0aW9uTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gICAgXG4gICAgXG4gICAgc3Vic2NyaWJlR3JpZENoYW5nZShsaXN0ZW5lcjogR3JpZENoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ3JpZENoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVMaW5lQ2hhbmdlKGxpc3RlbmVyOiBMaW5lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5lQ2hhbmdlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZUZyYW1lQ2hhbmdlKGxpc3RlbmVyOiBGcmFtZUNoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZnJhbWVDaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmVzZXQoKTogUHJvZ3JlbVN0YXRlIHtcbiAgICAgICAgLy8gQ2FsbCBqdXN0IGV2YWx1YXRlZCBpbml0aWFsaXNlclByb2dyZW0gZnVuY3Rpb25cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBsZXQgaW5pdGlhbENvbnRleHRlOiBvYmplY3QgPSBpbml0aWFsaXNlclByb2dyZW0odGhpcy5jb25maWcuY29sb25uZXMsIHRoaXMuY29uZmlnLmxpZ25lcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdMb2FkZWQgaW5pdGlhbCBjb250ZXh0ZTogJywgaW5pdGlhbENvbnRleHRlKTtcbiAgICAgICAgbGV0IHN0YXRlID0gbmV3IFByb2dyZW1TdGF0ZSgwLCAwLCAwLCBpbml0aWFsQ29udGV4dGUsIG51bGwpO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgY3VycmVudCgpOiBQcm9ncmVtU3RhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG5cbiAgICBuZXh0KCk6IFByb2dyZW1TdGF0ZSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZSkgdGhyb3cgbmV3IEVycm9yKCdJbmNvbnNpc3RlbnQgUHJvZ3JlbSBzdGF0ZSAhJyk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcblxuICAgICAgICBpZiAodGhpcy5jb2RlSXRlcmF0b3IgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jb2RlSXRlcmF0b3IgPSB0aGlzLmNvZGUuaXRlcmF0b3IodGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVTdGFydEl0ZXJhdGluZ0NvZGUodGhpcy5zdGF0ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZygnaGFzTmV4dDonLCB0aGlzLmNvZGVJdGVyYXRvci5oYXNOZXh0KCkpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvZGVJdGVyYXRvci5oYXNOZXh0KCkpIHtcbiAgICAgICAgICAgIGxldCBzdGF0ZW1lbnQgPSB0aGlzLmNvZGVJdGVyYXRvci5leGVjdXRlTmV4dCgpO1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0gbmV3IFByb2dyZW1TdGF0ZSh0aGlzLnN0YXRlLmNvbG9ubmUsIHRoaXMuc3RhdGUubGlnbmUsIHRoaXMuc3RhdGUuZnJhbWUsIHRoaXMuc3RhdGUuY29udGV4dGUsIHN0YXRlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgICAgICB0aGlzLmNvZGVFeGVjdXRpb25MaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlQ29kZUV4ZWN1dGlvbihuZXdTdGF0ZSkpO1xuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZygnRmluaXNoZWQgaXRlcmF0aW5nIG92ZXIgY29kZS4nKVxuXG4gICAgICAgIGxldCBub3RpZnlQaXhlbENoYW5nZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbm90aWZ5TGluZUNoYW5nZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbm90aWZ5RnJhbWVDaGFuZ2UgPSBmYWxzZTtcblxuICAgICAgICBsZXQgX2NvbG9ubmUgPSB0aGlzLnN0YXRlLmNvbG9ubmU7XG4gICAgICAgIGxldCBfbGlnbmUgPSB0aGlzLnN0YXRlLmxpZ25lO1xuICAgICAgICBsZXQgX2ZyYW1lID0gdGhpcy5zdGF0ZS5mcmFtZTtcblxuICAgICAgICBfY29sb25uZSArKztcbiAgICAgICAgbm90aWZ5UGl4ZWxDaGFuZ2UgPSB0cnVlO1xuXG4gICAgICAgIGlmIChfY29sb25uZSA+PSB0aGlzLmNvbmZpZy5jb2xvbm5lcykge1xuICAgICAgICAgICAgX2NvbG9ubmUgPSAwO1xuICAgICAgICAgICAgX2xpZ25lICsrO1xuICAgICAgICAgICAgbm90aWZ5TGluZUNoYW5nZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX2xpZ25lID4gdGhpcy5jb25maWcubGlnbmVzKSB7XG4gICAgICAgICAgICBfbGlnbmUgPSAwO1xuICAgICAgICAgICAgX2ZyYW1lICsrO1xuICAgICAgICAgICAgbm90aWZ5RnJhbWVDaGFuZ2UgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9mcmFtZSA+IHRoaXMuY29uZmlnLmZyYW1lcykge1xuICAgICAgICAgICAgX2ZyYW1lID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuZXdTdGF0ZSA9IG5ldyBQcm9ncmVtU3RhdGUoX2NvbG9ubmUsIF9saWduZSwgX2ZyYW1lLCB0aGlzLnN0YXRlLmNvbnRleHRlLCBudWxsKTtcbiBcbiAgICAgICAgaWYgKG5vdGlmeVBpeGVsQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmdyaWRDaGFuZ2VMaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlR3JpZENoYW5nZSh0aGlzLnN0YXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm90aWZ5TGluZUNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5saW5lQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUxpbmVDaGFuZ2UodGhpcy5zdGF0ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vdGlmeUZyYW1lQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUZyYW1lQ2hhbmdlKHRoaXMuc3RhdGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgLy90aGlzLmNvZGVJdGVyYXRvciA9IHRoaXMuY29kZS5pdGVyYXRvcihuZXdTdGF0ZSk7XG4gICAgICAgIHRoaXMuY29kZUl0ZXJhdG9yID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UHJvZ3JlbSgpOiBQcm9ncmVtQ29kZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29kZTtcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgU2NoZWR1bGluZ1NlcnZpY2Uge1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJvZ3JlbVNjaGVkdWxlcihjb25maWc6IFByb2dyZW1Db25maWcsIGNvZGU6IFByb2dyZW1Db2RlPGFueT4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTaW1wbGVQcm9ncmVtU2NoZWR1bGVyKGNvbmZpZywgY29kZSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgU3R5bGVEZWNvcmF0b3IgfSBmcm9tIFwiLi4vLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgQmFzZU5vZGUsIEZ1bmN0aW9uRGVjbGFyYXRpb24sIEJsb2NrU3RhdGVtZW50LCBJZlN0YXRlbWVudCwgVmFyaWFibGVEZWNsYXJhdG9yLCBWYXJpYWJsZURlY2xhcmF0aW9uLCBBc3NpZ25tZW50RXhwcmVzc2lvbiwgQmluYXJ5RXhwcmVzc2lvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgUmV0dXJuU3RhdGVtZW50LCBJZGVudGlmaWVyLCBNZW1iZXJFeHByZXNzaW9uIH0gZnJvbSBcImVzdHJlZVwiO1xuaW1wb3J0IHsgSHRtbEhlbHBlciB9IGZyb20gXCIuLi8uLi9jb3JlL0h0bWxIZWxwZXJcIjtcbmltcG9ydCB7IEVzcHJpbWFIZWxwZXIgfSBmcm9tIFwiLi4vLi4vZXNwcmltYS9Fc3ByaW1hSGVscGVyXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBFc3ByaW1hVmVyc2UsIEVzcHJpbWFIdG1sQ291cGxldEZhY3RvcnksIEVzcHJpbWFDb3VwbGV0IH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYVR5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBFc3ByaW1hUHJvZ3JlbUluc3BlY3Rvckh0bWxGYWN0b3J5IGltcGxlbWVudHMgRXNwcmltYUh0bWxDb3VwbGV0RmFjdG9yeSB7XG5cbiAgICBwcml2YXRlIGh0bWxWZXJzZXNNYXA6IE1hcDxCYXNlTm9kZSwgSFRNTEVsZW1lbnQ+ID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY291cGxldDogRXNwcmltYUNvdXBsZXQsXG4gICAgICAgIHByaXZhdGUgZGVjb3JhdG9yOiBTdHlsZURlY29yYXRvcjxCYXNlTm9kZT5cbiAgICApIHt9XG5cbiAgICBidWlsZENvdXBsZXQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgaHRtbENvdXBsZXQgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLmNvdXBsZXQuZnVuY3Rpb25Sb290Tm9kZSk7XG4gICAgICAgIGh0bWxDb3VwbGV0LmNsYXNzTGlzdC5hZGQoJ3Byb2dyZW0taW5zcGVjdG9yLWNvbXBvbmVudCcpO1xuICAgICAgICByZXR1cm4gaHRtbENvdXBsZXQ7XG4gICAgfVxuXG4gICAgZ2V0SHRtbFZlcnNlKHZlcnNlOiBFc3ByaW1hVmVyc2UpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICh0aGlzLmh0bWxWZXJzZXNNYXAuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbGxlZ2FsU3RhdGVFcnJvcjogY291cGxldCBtdXN0IGJlIGJ1aWx0IGJlZm9yZSBjYWxsaW5nIGdldEh0bWxWZXJzZSgpICEnKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0bWxFbGVtZW50ID0gdGhpcy5odG1sVmVyc2VzTWFwLmdldCh2ZXJzZS5ub2RlKTtcbiAgICAgICAgaWYgKCFodG1sRWxlbWVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIEhUTUxFbGVtZW50IGZvdW5kIG1hdGNoaW5nIHZlcnNlOicsIHZlcnNlLCAnIScpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIEhUTUxFbGVtZW50IGZvdW5kIG1hdGNoaW5nIHN1cHBsaWVkIHZlcnNlICFgKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGh0bWxFbGVtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkIE5vZGUgYXBwbHlpbmcgZGVjb3JhdG9ycy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbm9kZSB0aGUgbm9kZSBmb3Igd2hpY2ggdG8gcHJvZHVjZSBIVE1MXG4gICAgICogQHBhcmFtIHNpYmxpbmdzIHRoZSBub2RlcyB0byBhZGQgYXMgc2libGluZ3Mgb2YgdGhlIG5vZGVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYnVpbGROb2RlKG5vZGU6IEJhc2VOb2RlIHwgdW5kZWZpbmVkIHwgbnVsbCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gSHRtbEhlbHBlci5zcGFuKCdlbXB0eScsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2libGluZ3M6IEhUTUxFbGVtZW50W10gPSBbXVxuICAgICAgICBsZXQgaHRtbE91dHB1dCA9IHRoaXMuYnVpbGROb2RlSW50ZXJuYWwobm9kZSwgc2libGluZ3MpO1xuICAgICAgICBodG1sT3V0cHV0ID0gdGhpcy5kZWNvcmF0b3IuZGVjb3JhdGUobm9kZSwgaHRtbE91dHB1dCk7XG5cbiAgICAgICAgbGV0IG1hdGNoaW5nVmVyc2UgPSB0aGlzLmNvdXBsZXQudmVyc2VzLmZpbmQodiA9PiB2Lm5vZGUgPT09IG5vZGUpO1xuICAgICAgICBpZiAobWF0Y2hpbmdWZXJzZSkge1xuICAgICAgICAgICAgaHRtbE91dHB1dCA9IHRoaXMuZW5jYXBzdWxhdGVOb2RlSW5WZXJzZUNvbnRhaW5lcihodG1sT3V0cHV0KTtcbiAgICAgICAgICAgIC8vIFRoaXMgbm9kZSBpcyB0aGUgcm9vdCBub2RlIG9mIGEgVmVyc2VcbiAgICAgICAgICAgIHRoaXMuaHRtbFZlcnNlc01hcC5zZXQobWF0Y2hpbmdWZXJzZS5ub2RlLCBodG1sT3V0cHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaWJsaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBJZiBzaWJsaW5ncywgYnVpbGQgZWFjaCBzaWJsaW5nXG4gICAgICAgICAgICBodG1sT3V0cHV0ID0gSHRtbEhlbHBlci5zcGFuKCdzaWJsaW5nLWNvbnRhaW5lcicsIGh0bWxPdXRwdXQpO1xuICAgICAgICAgICAgd2hpbGUoc2libGluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBzaWJsaW5nID0gc2libGluZ3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBpZiAoc2libGluZykge1xuICAgICAgICAgICAgICAgICAgICAvL2xldCBzaWJsaW5nT3V0ID0gdGhpcy5idWlsZE5vZGUoc2libGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGh0bWxPdXRwdXQuYXBwZW5kQ2hpbGQoc2libGluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGh0bWxPdXRwdXQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGVuY2Fwc3VsYXRlTm9kZUluVmVyc2VDb250YWluZXIoaHRtbEVsdDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBjb250ZW50ID0gSHRtbEhlbHBlci5zcGFuKCd2ZXJzZS1jb250ZW50JywgaHRtbEVsdCk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3ZlcnNlIHZlcnNlLWNvbnRhaW5lcicsIGNvbnRlbnQpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkIG5vZGUuXG4gICAgICogQHBhcmFtIG5vZGUgXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGJ1aWxkTm9kZUludGVybmFsKG5vZGU6IEJhc2VOb2RlLCBzaWJsaW5nczogSFRNTEVsZW1lbnRbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQnVpbGRpbmcgbm9kZScsIG5vZGUsICcuLi4nKTtcbiAgICAgICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Z1bmN0aW9uRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkRnVuY3Rpb25EZWNsYXJhdGlvbihub2RlLCBzaWJsaW5ncyk7XG4gICAgICAgICAgICBjYXNlICdCbG9ja1N0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRCbG9ja1N0YXRlbWVudChub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0lmU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZElmU3RhdGVtZW50KG5vZGUsIHNpYmxpbmdzKTtcbiAgICAgICAgICAgIGNhc2UgJ1ZhcmlhYmxlRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkVmFyaWFibGVEZWNsYXJhdGlvbihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ1ZhcmlhYmxlRGVjbGFyYXRvcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRWYXJpYWJsZURlY2xhcmF0b3Iobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdBc3NpZ25tZW50RXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRBc3NpZ25tZW50RXhwcmVzc2lvbihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0JpbmFyeUV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQmluYXJ5RXhwcmVzc2lvbihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0V4cHJlc3Npb25TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkRXhwcmVzc2lvblN0YXRlbWVudChub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ1JldHVyblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRSZXR1cm5TdGF0ZW1lbnQobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdJZGVudGlmaWVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZElkZW50aWZpZXIobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdNZW1iZXJFeHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZE1lbWJlckV4cHJlc3Npb24obm9kZSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkRGVmYXVsdChub2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEZ1bmN0aW9uRGVjbGFyYXRpb24obm9kZTogQmFzZU5vZGUsIHNpYmxpbmdzOiBIVE1MRWxlbWVudFtdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgXG4gICAgICAgIGxldCBkZWNsU3RhcnRJdGVtczogKHN0cmluZyB8IEhUTUxFbGVtZW50KVtdO1xuICAgICAgICBpZiAobi5pZCkge1xuICAgICAgICAgICAgbGV0IGZ1bmNJZCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1pZCcsIG4uaWQubmFtZSk7XG4gICAgICAgICAgICBkZWNsU3RhcnRJdGVtcyA9IFsnZnVuY3Rpb24gJywgZnVuY0lkLCAnICggJ107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWNsU3RhcnRJdGVtcyA9IFsnZnVuY3Rpb24gKCAnXTsvLyArIGZ1bmMucGFyYW1zLm1hcCh4ID0+IHgubmFtZSkuam9pbignLCAnKSArICcgKSB7JztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJhbUNvdW50ID0gbi5wYXJhbXMubGVuZ3RoO1xuICAgICAgICBuLnBhcmFtcy5mb3JFYWNoKChwYXJhbSwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBFc3ByaW1hSGVscGVyLnBhdHRlcm5Ub1N0cmluZyhwYXJhbSk7XG4gICAgICAgICAgICBsZXQgZnVuY1BhcmFtID0gdGhpcy5idWlsZE5vZGUocGFyYW0pOy8vSHRtbEhlbHBlci5zcGFuKCdmdW5jLXBhcmFtJywgdmFyTmFtZSk7XG4gICAgICAgICAgICBkZWNsU3RhcnRJdGVtcy5wdXNoKGZ1bmNQYXJhbSk7XG4gICAgICAgICAgICBpZiAoaSA8IHBhcmFtQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgZGVjbFN0YXJ0SXRlbXMucHVzaCgnLCAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVjbFN0YXJ0SXRlbXMucHVzaCgnICkgeycpO1xuXG4gICAgICAgIGxldCBkZWNsU3RhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtc3RhcnQnLCBkZWNsU3RhcnRJdGVtcyk7XG4gICAgICAgIGxldCBmdW5jQm9keSA9IHRoaXMuYnVpbGROb2RlKG4uYm9keSk7XG4gICAgICAgIGxldCBkZWNsRW5kID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLWVuZCcsICd9Jyk7XG4gICAgICAgIGRlY2xFbmQgPSB0aGlzLmVuY2Fwc3VsYXRlTm9kZUluVmVyc2VDb250YWluZXIoZGVjbEVuZCk7XG4gICAgICAgIC8vbGV0IGRlY2wgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtZGVjbGFyYXRpb24nLCBbZGVjbFN0YXJ0LCBmdW5jQm9keSwgZGVjbEVuZF0pO1xuICAgICAgICBsZXQgZGVjbCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1kZWNsYXJhdGlvbicsIGRlY2xTdGFydCk7XG4gICAgICAgIHNpYmxpbmdzLnB1c2goZnVuY0JvZHkpO1xuICAgICAgICBzaWJsaW5ncy5wdXNoKGRlY2xFbmQpO1xuICAgICAgICByZXR1cm4gZGVjbDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRCbG9ja1N0YXRlbWVudChub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICBsZXQgYm9keVN0YXRlbWVudHMgPSBuLmJvZHkubWFwKHN0YXRlbWVudCA9PiB0aGlzLmJ1aWxkTm9kZShzdGF0ZW1lbnQpKVxuICAgICAgICByZXR1cm4gSHRtbEhlbHBlci5zcGFuKCdibG9jaycsIGJvZHlTdGF0ZW1lbnRzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRJZlN0YXRlbWVudChub2RlOiBCYXNlTm9kZSwgc2libGluZ3M6IEhUTUxFbGVtZW50W10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBJZlN0YXRlbWVudDtcbiAgICAgICAgbGV0IGNvbnRlbnQ6IEhUTUxFbGVtZW50W10gPSBbXVxuICAgICAgICBsZXQgdGVzdCA9IHRoaXMuYnVpbGROb2RlKG4udGVzdCk7XG4gICAgICAgIGxldCBpZlN0YXJ0VGV4dCA9IFsnaWYgKCAnLCB0ZXN0LCAnICkgeyddO1xuICAgICAgICBsZXQgaWZTdGFydCA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLXN0YXRlbWVudC1zdGFydCcsIGlmU3RhcnRUZXh0KTtcbiAgICAgICAgY29udGVudC5wdXNoKGlmU3RhcnQpO1xuXG4gICAgICAgIGxldCB0aGVuQmxvY2sgPSB0aGlzLmJ1aWxkTm9kZShuLmNvbnNlcXVlbnQpO1xuICAgICAgICBsZXQgaWZUaGVuID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtYmxvY2stdGhlbicsIHRoZW5CbG9jayk7XG4gICAgICAgIGNvbnRlbnQucHVzaChpZlRoZW4pO1xuICAgICAgICBzaWJsaW5ncy5wdXNoKHRoZW5CbG9jayk7XG5cbiAgICAgICAgaWYgKG4uYWx0ZXJuYXRlKSB7XG4gICAgICAgICAgICBsZXQgaWZFbHNlRGVjbCA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLXN0YXRlbWVudC1lbHNlJywgJ30gZWxzZSB7Jyk7XG4gICAgICAgICAgICBpZkVsc2VEZWNsID0gdGhpcy5lbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGlmRWxzZURlY2wpO1xuICAgICAgICAgICAgY29udGVudC5wdXNoKGlmRWxzZURlY2wpO1xuICAgICAgICAgICAgc2libGluZ3MucHVzaChpZkVsc2VEZWNsKTtcblxuICAgICAgICAgICAgbGV0IGVsc2VCbG9jayA9IHRoaXMuYnVpbGROb2RlKG4uYWx0ZXJuYXRlKTtcbiAgICAgICAgICAgIGxldCBpZkVsc2UgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1ibG9jay1lbHNlJywgZWxzZUJsb2NrKTtcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaChpZkVsc2UpO1xuICAgICAgICAgICAgc2libGluZ3MucHVzaChpZkVsc2UpO1xuICAgICAgICB9IFxuICAgICAgICBsZXQgaWZFbmQgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1zdGF0ZW1lbnQtZW5kJywgJ30nKTtcbiAgICAgICAgaWZFbmQgPSB0aGlzLmVuY2Fwc3VsYXRlTm9kZUluVmVyc2VDb250YWluZXIoaWZFbmQpO1xuICAgICAgICBjb250ZW50LnB1c2goaWZFbmQpO1xuICAgICAgICBzaWJsaW5ncy5wdXNoKGlmRW5kKTtcblxuICAgICAgICAvL2xldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1zdGF0ZW1lbnQnLCBjb250ZW50KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBpZlN0YXJ0O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZFZhcmlhYmxlRGVjbGFyYXRpb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0aW9uO1xuICAgICAgICBsZXQgZGVjbGFyYXRpb25zID0gbi5kZWNsYXJhdGlvbnMubWFwKGQgPT4gdGhpcy5idWlsZE5vZGUoZCkpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdkZWNsYXJhdGlvbiB2YXJpYWJsZS1kZWNsYXJhdGlvbicpO1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gbi5raW5kICsgJyAnO1xuICAgICAgICBkZWNsYXJhdGlvbnMuZm9yRWFjaChkID0+IGNvbnRhaW5lci5hcHBlbmRDaGlsZChkKSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkVmFyaWFibGVEZWNsYXJhdG9yKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdG9yO1xuICAgICAgICBsZXQgbGVmdFBhcnQgPSB0aGlzLmJ1aWxkTm9kZShuLmlkKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lcjtcbiAgICAgICAgaWYgKG4uaW5pdCkge1xuICAgICAgICAgICAgbGV0IGFzc2lnblBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ29wZXJhdG9yIGFzc2lnbi1vcGVyYXRvcicsICc9Jyk7XG4gICAgICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmJ1aWxkTm9kZShuLmluaXQpO1xuICAgICAgICAgICAgbGV0IHJpZ2h0UGFydCA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtdmFsdWUnLCByaWdodCk7XG4gICAgICAgICAgICBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gdmFyaWFibGUtZGVjbGFyYXRvcicsIFtsZWZ0UGFydCwgYXNzaWduUGFydCwgcmlnaHRQYXJ0XSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gdmFyaWFibGUtZGVjbGFyYXRvcicsIGxlZnRQYXJ0KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRBc3NpZ25tZW50RXhwcmVzc2lvbihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuYnVpbGROb2RlKG4ubGVmdCk7XG4gICAgICAgIGxldCBsZWZ0UGFydCA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtaWQnLCBsZWZ0KTtcbiAgICAgICAgbGV0IGFzc2lnblBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ29wZXJhdG9yIGFzc2lnbi1vcGVyYXRvcicsICc9Jyk7XG4gICAgICAgIGxldCByaWdodCA9IHRoaXMuYnVpbGROb2RlKG4ucmlnaHQpO1xuICAgICAgICBsZXQgcmlnaHRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS12YWx1ZScsIHJpZ2h0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiBhc3NpZ25tZW50LWV4cHJlc3Npb24nLCBbbGVmdFBhcnQsIGFzc2lnblBhcnQsIHJpZ2h0UGFydF0pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEJpbmFyeUV4cHJlc3Npb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBCaW5hcnlFeHByZXNzaW9uO1xuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuYnVpbGROb2RlKG4ubGVmdCk7XG4gICAgICAgIGxldCBsZWZ0UGFydCA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbicsIGxlZnQpO1xuICAgICAgICBsZXQgb3BlcmF0b3JQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdvcGVyYXRvciBleHByZXNzaW9uLW9wZXJhdG9yJywgbi5vcGVyYXRvcik7XG4gICAgICAgIGxldCByaWdodCA9IHRoaXMuYnVpbGROb2RlKG4ucmlnaHQpO1xuICAgICAgICBsZXQgcmlnaHRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uJywgcmlnaHQpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIGJpbmFyeS1leHByZXNzaW9uJywgW2xlZnRQYXJ0LCBvcGVyYXRvclBhcnQsIHJpZ2h0UGFydF0pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEV4cHJlc3Npb25TdGF0ZW1lbnQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBFeHByZXNzaW9uU3RhdGVtZW50O1xuICAgICAgICBsZXQgY29kZSA9IHRoaXMuYnVpbGROb2RlKG4uZXhwcmVzc2lvbik7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBleHByZXNzaW9uLXN0YXRlbWVudCcsIGNvZGUpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZFJldHVyblN0YXRlbWVudChub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIFJldHVyblN0YXRlbWVudDtcbiAgICAgICAgbGV0IGFyZyA9IHRoaXMuYnVpbGROb2RlKG4uYXJndW1lbnQpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgcmV0dXJuLXN0YXRlbWVudCcsIFsncmV0dXJuICcsIGFyZ10pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZElkZW50aWZpZXIobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBJZGVudGlmaWVyO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdpZGVudGlmaWVyJywgRXNwcmltYUhlbHBlci5wYXR0ZXJuVG9TdHJpbmcobikpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZE1lbWJlckV4cHJlc3Npb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBNZW1iZXJFeHByZXNzaW9uO1xuICAgICAgICBsZXQgb2JqZWN0ID0gdGhpcy5idWlsZE5vZGUobi5vYmplY3QpO1xuICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLmJ1aWxkTm9kZShuLnByb3BlcnR5KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiBtZW1iZXItZXhwcmVzc2lvbicsIFtvYmplY3QsICcuJywgcHJvcGVydHldKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGREZWZhdWx0KG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zb2xlLmxvZygnZGVmYXVsdDonLCBub2RlKTtcbiAgICAgICAgbGV0IGNvZGUgPSBlc2NvZGVHZW5lcmF0ZShub2RlKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZGVmYXVsdC0nICsgbm9kZS50eXBlLCBjb2RlKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG59IiwiaW1wb3J0IHsgUHJvZ3JlbUNvbXBvbmVudCwgUHJvZ3JlbVNjaGVkdWxlciwgSHRtbENvdXBsZXRGYWN0b3J5LCBQcm9ncmVtU3RhdGUsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyIH0gZnJvbSAnLi4vLi4vY29yZS9UeXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50IGltcGxlbWVudHMgUHJvZ3JlbUNvbXBvbmVudCwgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyLCBHcmlkQ2hhbmdlTGlzdGVuZXIge1xuXG4gICAgcHJpdmF0ZSBleGVjdXRpbmdFbGVtZW50czogSFRNTEVsZW1lbnRbXSA9IFtdO1xuICAgIHByaXZhdGUgZXhlY3V0ZWRFbGVtZW50czogSFRNTEVsZW1lbnRbXSA9IFtdO1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBFWEVDVVRJTkdfQ0xBU1MgPSAndmVyc2UtZXhlY3V0aW5nJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVYRUNVVEVEX0NMQVNTID0gJ3ZlcnNlLWV4ZWN1dGVkJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogUHJvZ3JlbVNjaGVkdWxlcixcbiAgICAgICAgcHJpdmF0ZSBodG1sRmFjdG9yeTogSHRtbENvdXBsZXRGYWN0b3J5PGFueT5cbiAgICApIHtcbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUNvZGVFeGVjdXRpb24odGhpcyk7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVHcmlkQ2hhbmdlKHRoaXMpO1xuICAgIH1cblxuICAgIHJlbmRlckh0bWwoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgaHRtbENvbXBvbmVudCA9IHRoaXMuaHRtbEZhY3RvcnkuYnVpbGRDb3VwbGV0KCk7XG4gICAgICAgIHJldHVybiBodG1sQ29tcG9uZW50O1xuICAgIH1cbiAgICBcbiAgICBmaXJlQ29kZUV4ZWN1dGlvbihzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIGlmICghc3RhdGUudmVyc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIGxldCBodG1sVmVyc2UgPSB0aGlzLmh0bWxGYWN0b3J5LmdldEh0bWxWZXJzZShzdGF0ZS52ZXJzZSk7XG4gICAgICAgIGlmKGh0bWxWZXJzZSkge1xuICAgICAgICAgICAgaHRtbFZlcnNlLmNsYXNzTGlzdC5hZGQoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRJTkdfQ0xBU1MpO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0aGlzLmV4ZWN1dGluZ0VsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBlbHQgPSB0aGlzLmV4ZWN1dGluZ0VsZW1lbnRzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKGVsdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhlY3V0ZWRFbGVtZW50cy5wdXNoKGVsdCk7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5yZW1vdmUoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRJTkdfQ0xBU1MpO1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QuYWRkKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VURURfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghaHRtbFZlcnNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmV4ZWN1dGluZ0VsZW1lbnRzLnB1c2goaHRtbFZlcnNlKTtcbiAgICAgICAgaHRtbFZlcnNlLmNsYXNzTGlzdC5hZGQoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRJTkdfQ0xBU1MpO1xuICAgIH1cblxuICAgIGZpcmVHcmlkQ2hhbmdlKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuZXhlY3V0aW5nRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGVsdCA9IHRoaXMuZXhlY3V0aW5nRWxlbWVudHMucG9wKCk7XG4gICAgICAgICAgICBpZiAoZWx0KSB7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5yZW1vdmUoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRFRF9DTEFTUyk7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5yZW1vdmUoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRJTkdfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuZXhlY3V0ZWRFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgZWx0ID0gdGhpcy5leGVjdXRlZEVsZW1lbnRzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKGVsdCkge1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QucmVtb3ZlKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VURURfQ0xBU1MpO1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QucmVtb3ZlKFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQuRVhFQ1VUSU5HX0NMQVNTKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgU3R5bGVEZWNvcmF0b3IsIENvbG9yUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgQmFzZU5vZGUsIElkZW50aWZpZXIgfSBmcm9tIFwiZXN0cmVlXCI7XG5cbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb3JlL0NvbG9yU2VydmljZVwiO1xuaW1wb3J0IHsgRXNwcmltYUhlbHBlciB9IGZyb20gXCIuLi8uLi9lc3ByaW1hL0VzcHJpbWFIZWxwZXJcIjtcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9IdG1sSGVscGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBDb2xvclZhcmlhYmxlU2NvcGVEZWNvcmF0b3IgaW1wbGVtZW50cyBTdHlsZURlY29yYXRvcjxzdHJpbmc+IHtcblxuICAgIHByaXZhdGUgdmFyaWFibGVNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBjb2xvclByb3ZpZGVyOiBDb2xvclByb3ZpZGVyID0gQ29sb3JTZXJ2aWNlLmNvbG9yUHJvdmlkZXJhY3RvcnkuYnVpbGQoKTtcblxuICAgIGRlY29yYXRlKHZhcklkOiBzdHJpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgdmFySW5kZXggPSB0aGlzLnZhcmlhYmxlTWFwLmdldCh2YXJJZCk7XG4gICAgICAgIGlmICghdmFySW5kZXgpIHtcbiAgICAgICAgICAgIHZhckluZGV4ID0gdGhpcy52YXJpYWJsZU1hcC5zaXplICsgMTtcbiAgICAgICAgICAgIHRoaXMudmFyaWFibGVNYXAuc2V0KHZhcklkLCB2YXJJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3ZhcmlhYmxlLWhpbnQnKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd2YXJpYWJsZS0nICsgdmFySW5kZXgpO1xuICAgICAgICBcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtaGludC1jb250YWluZXInLCBlbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9ICAgIFxuICAgIFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc3R5bGUgPSAnJztcbiAgICAgICAgLy9jb25zb2xlLmxvZygndmFyaWFibGUgY291bnQ6JywgdGhpcy52YXJpYWJsZU1hcC5zaXplKTtcbiAgICAgICAgdGhpcy52YXJpYWJsZU1hcC5mb3JFYWNoKChpbmRleCwgaWQpID0+IHtcbiAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMuY29sb3JQcm92aWRlci5oYXNoU3RyaW5nVG9Db2xvcihpZCwgMTYpOyAvL3RoaXMudmFyaWFibGVNYXAuc2l6ZVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYnVpbGRpbmcgY29sb3IgIycsIGlkLCAnPT4nLCBjb2xvcik7XG4gICAgICAgICAgICBzdHlsZSArPSBgXG4gICAgICAgICAgICAgICAgLnZhcmlhYmxlLXNjb3BlLWNvbXBvbmVudCAudmFyaWFibGUtaGludC1jb250YWluZXIge1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDAuOGVtIDAgMC44ZW0gMDtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC52YXJpYWJsZS1zY29wZS1jb21wb25lbnQgLnZhcmlhYmxlLWhpbnQge1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLjFlbSAwLjVlbSAwLjFlbSAwLjVlbTtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDAuOGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAudmFyaWFibGUtc2NvcGUtY29tcG9uZW50IC52YXJpYWJsZS0ke2luZGV4fSwgXG4gICAgICAgICAgICAgICAgLnZhcmlhYmxlLXNjb3BlLWNvbXBvbmVudCAudmFyaWFibGUtJHtpbmRleH0ge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBgO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coJ3N0eWxlJywgc3R5bGUpO1xuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGFkVmVyc2VEZWNvcmF0b3IgaW1wbGVtZW50cyBTdHlsZURlY29yYXRvcjxCYXNlTm9kZT4ge1xuXG4gICAgZGVjb3JhdGUobm9kZTogQmFzZU5vZGUsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvZGUtcGFkZGluZycpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9ICAgIFxuICAgIFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYFxuICAgICAgICAuY29kZS1wYWRkaW5nIHtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAzMnB4O1xuICAgICAgICB9XG4gICAgICAgIGA7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBTY2hlZHVsaW5nU2VydmljZSB9IGZyb20gJy4vU2NoZWR1bGluZ1NlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Qcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50JztcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gJy4vU2NyZWVuU2VydmljZSc7XG5pbXBvcnQgeyBCYXNlTm9kZSB9IGZyb20gJ2VzdHJlZSc7XG5pbXBvcnQgeyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uLCBQcm9ncmVtU2NoZWR1bGVyIH0gZnJvbSAnLi9UeXBlcyc7XG5pbXBvcnQgeyBQYWRWZXJzZURlY29yYXRvciwgQ29sb3JWZXJzZVZhcmlhYmxlRGVjb3JhdG9yIH0gZnJvbSAnLi4vY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9yU3R5bGVEZWNvcmF0b3JzJztcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tICcuL0h0bWxIZWxwZXInO1xuaW1wb3J0IHsgRXNwcmltYVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeSB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Fc3ByaW1hUHJvZ3JlbUluc3BlY3Rvckh0bWxGYWN0b3J5JztcbmltcG9ydCB7IENvZGVTZXJ2aWNlIH0gZnJvbSAnLi9Db2RlU2VydmljZSc7XG5pbXBvcnQgeyBQcm9ncmVtR3JpZENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUdyaWQvUHJvZ3JlbUdyaWRDb21wb25lbnQnO1xuaW1wb3J0IHsgVmFyaWFibGVTY29wZUNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvdmFyaWFibGVTY29wZS9WYXJpYWJsZVNjb3BlQ29tcG9uZW50JztcbmltcG9ydCB7IEVzcHJpbWFWYXJpYWJsZVNjb3BlSHRtbEZhY3RvcnkgfSBmcm9tICcuLi9jb21wb25lbnRzL3ZhcmlhYmxlU2NvcGUvRXNwcmltYVZhcmlhYmxlU2NvcGVIdG1sRmFjdG9yeSc7XG5pbXBvcnQgeyBDb2xvclZhcmlhYmxlU2NvcGVEZWNvcmF0b3IgfSBmcm9tICcuLi9jb21wb25lbnRzL3ZhcmlhYmxlU2NvcGUvRXNwcmltYVZhcmlhYmxlU2NvcGVTdHlsZURlY29yYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgUHJvZ3JlbUNvbmZpZyB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjb2xvbm5lczogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbGlnbmVzOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBmcmFtZXM6IG51bWJlcixcbiAgICApIHt9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgUHJvZ3JlbVNlcnZpY2Uge1xuXG4gICAgdmFyIHByZXZpb3VzUmVwYWludFRpbWUgPSAwO1xuICAgIHZhciBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXI7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtKHVybDogc3RyaW5nLCBzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZzogUHJvZ3JlbUNvbmZpZykge1xuICAgICAgICBsZXQgcHJvZ3JlbVNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBwcm9ncmVtU2NyaXB0LnNyYyA9IHVybDtcbiAgICAgICAgbGV0IGJvZHlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICAgICBpZiAoYm9keUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGJvZHlFbGVtZW50LmFwcGVuZENoaWxkKHByb2dyZW1TY3JpcHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgQ29kZVNlcnZpY2UubG9hZFByb2dyZW0odXJsKS50aGVuKGNvZGUgPT4ge1xuICAgICAgICAgICAgbGV0IHByb2dyZW1Db2RlID0gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRQcm9ncmVtKGNvZGUpO1xuICAgICAgICAgICAgbGV0IHByb2dyZW1Db3VwbGV0ID0gcHJvZ3JlbUNvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbigpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncHJvZ3JlbSBBU1Q6JywgcHJvZ3JlbUNvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbik7XG5cbiAgICAgICAgICAgIC8vIExvYWQgaW5pdFByb2dyZW0gRnVuY3Rpb24gY29kZVxuICAgICAgICAgICAgbGV0IGluaXRQcm9ncmVtRnVuY3Rpb25Db2RlID0gZXNjb2RlR2VuZXJhdGUocHJvZ3JlbUNvZGUuaW5pdGlhbGlzZXJQcm9ncmVtRnVuY3Rpb24oKS5mdW5jdGlvblJvb3ROb2RlKTtcbiAgICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5ldmFsKGluaXRQcm9ncmVtRnVuY3Rpb25Db2RlKTtcblxuICAgICAgICAgICAgc2NoZWR1bGVyID0gU2NoZWR1bGluZ1NlcnZpY2UuYnVpbGRQcm9ncmVtU2NoZWR1bGVyKHByb2dyZW1Db25maWcsIHByb2dyZW1Db2RlKTtcblxuICAgICAgICAgICAgLy9sZXQgcHJvZ3JlbUluc3BlY3RvciA9IG5ldyBCYXNpY0h0bWxFc3ByaW1hUHJvZ3JlbUluc3BlY3Rvcihwcm9ncmVtQ29kZSwgc2NoZWR1bGVyLCBkb2N1bWVudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJy5wcm9ncmVtLWluc3BlY3Rvci1jb21wb25lbnQnKTtcbiAgICAgICAgICAgIGlmIChwcm9ncmVtSW5zcGVjdG9yQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JEZWNvcmF0b3JzID0gbmV3IFN0eWxlRGVjb3JhdG9yQWdncmVnYXRpb248QmFzZU5vZGU+KFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFBhZFZlcnNlRGVjb3JhdG9yKCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBDb2xvclZlcnNlVmFyaWFibGVEZWNvcmF0b3IoKSxcbiAgICAgICAgICAgICAgICAgICAgLy9uZXcgSGlnaGxpZ2h0RXhlY3V0aW5nVmVyc2VEZWNvcmF0b3Ioc2NoZWR1bGVyKSxcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3RvckZhY3RvcnkgPSBuZXcgRXNwcmltYVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeShwcm9ncmVtQ291cGxldCwgcHJvZ3JlbUluc3BlY3RvckRlY29yYXRvcnMpO1xuICAgICAgICAgICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9yVmlldyA9IG5ldyBQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50KHNjaGVkdWxlciwgcHJvZ3JlbUluc3BlY3RvckZhY3RvcnkpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2NvZGVFbGVtZW50JywgY29kZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9ySHRtbCA9IHByb2dyZW1JbnNwZWN0b3JWaWV3LnJlbmRlckh0bWwoKTtcbiAgICAgICAgICAgICAgICBwcm9ncmVtSW5zcGVjdG9yQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2dyZW1JbnNwZWN0b3JIdG1sKTtcblxuICAgICAgICAgICAgICAgIGxldCBkZWNvcmF0b3JTdHlsZSA9IHByb2dyZW1JbnNwZWN0b3JEZWNvcmF0b3JzLmJ1aWxkU3R5bGVTaGVldCgpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2RlY29yYXRvclN0eWxlOicsIGRlY29yYXRvclN0eWxlKVxuICAgICAgICAgICAgICAgIEh0bWxIZWxwZXIuZGVmaW5lQ3NzUnVsZXMoJ3Byb2dyZW0taW5zcGVjdG9yLWNvbXBvbmVudCcsIGRlY29yYXRvclN0eWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICBsZXQgcHJvZ3JlbUdyaWRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignLnByb2dyZW0tZ3JpZC1jb21wb25lbnQnKTtcbiAgICAgICAgICAgaWYgKHByb2dyZW1HcmlkQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByb2dyZW1HcmlkQ29tcG9uZW50ID0gbmV3IFByb2dyZW1HcmlkQ29tcG9uZW50KHNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZywgc2NoZWR1bGVyLCBkb2N1bWVudCk7XG4gICAgICAgICAgICAgICAgbGV0IHByb2dyZW1HcmlkSHRtbCA9IHByb2dyZW1HcmlkQ29tcG9uZW50LnJlbmRlckh0bWwoKTtcbiAgICAgICAgICAgICAgICBwcm9ncmVtR3JpZENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9ncmVtR3JpZEh0bWwpO1xuICAgICAgICAgICB9XG5cbiAgICAgICAgICAgbGV0IHZhcmlhYmxlU2NvcGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignLnZhcmlhYmxlLXNjb3BlLWNvbXBvbmVudCcpO1xuICAgICAgICAgICBpZiAodmFyaWFibGVTY29wZUNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIGxldCB2YXJpYWJsZVNjb3BlRGVjb3JhdG9ycyA9IG5ldyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uPHN0cmluZz4oW1xuICAgICAgICAgICAgICAgICAgICBuZXcgQ29sb3JWYXJpYWJsZVNjb3BlRGVjb3JhdG9yKClcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgbGV0IGh0bWxGYWN0b3J5ID0gbmV3IEVzcHJpbWFWYXJpYWJsZVNjb3BlSHRtbEZhY3RvcnkocHJvZ3JlbUNvdXBsZXQsIHZhcmlhYmxlU2NvcGVEZWNvcmF0b3JzLCBzY2hlZHVsZXIpO1xuICAgICAgICAgICAgICAgIGxldCB2YXJpYWJsZVNjb3BlQ29tcG9uZW50ID0gbmV3IFZhcmlhYmxlU2NvcGVDb21wb25lbnQoc2NoZWR1bGVyLCBodG1sRmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgbGV0IHZhcmlhYmxlU2NvcGVIdG1sID0gdmFyaWFibGVTY29wZUNvbXBvbmVudC5yZW5kZXJIdG1sKCk7XG4gICAgICAgICAgICAgICAgdmFyaWFibGVTY29wZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh2YXJpYWJsZVNjb3BlSHRtbCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGVjb3JhdG9yU3R5bGUgPSB2YXJpYWJsZVNjb3BlRGVjb3JhdG9ycy5idWlsZFN0eWxlU2hlZXQoKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdkZWNvcmF0b3JTdHlsZTonLCBkZWNvcmF0b3JTdHlsZSlcbiAgICAgICAgICAgICAgICBIdG1sSGVscGVyLmRlZmluZUNzc1J1bGVzKCd2YXJpYWJsZS1zY29wZS1jb21wb25lbnQnLCBkZWNvcmF0b3JTdHlsZSk7XG4gICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGltZXIoMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRpbWVyKHRpbWVzdGFtcDogbnVtYmVyKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGltZXIpO1xuXG4gICAgICAgIGlmICh0aW1lc3RhbXAgLSBwcmV2aW91c1JlcGFpbnRUaW1lIDwgMTAwMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJldmlvdXNSZXBhaW50VGltZSA9IHRpbWVzdGFtcDtcblxuICAgICAgICBpZiAoc2NoZWR1bGVyKSB7XG4gICAgICAgICAgICBzY2hlZHVsZXIubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgU3R5bGVEZWNvcmF0b3IsIFByb2dyZW1TY2hlZHVsZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgQmFzZU5vZGUsIEZ1bmN0aW9uRGVjbGFyYXRpb24sIEJsb2NrU3RhdGVtZW50LCBJZlN0YXRlbWVudCwgVmFyaWFibGVEZWNsYXJhdG9yLCBWYXJpYWJsZURlY2xhcmF0aW9uLCBBc3NpZ25tZW50RXhwcmVzc2lvbiwgQmluYXJ5RXhwcmVzc2lvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgUmV0dXJuU3RhdGVtZW50LCBJZGVudGlmaWVyLCBNZW1iZXJFeHByZXNzaW9uIH0gZnJvbSBcImVzdHJlZVwiO1xuaW1wb3J0IHsgSHRtbEhlbHBlciB9IGZyb20gXCIuLi8uLi9jb3JlL0h0bWxIZWxwZXJcIjtcbmltcG9ydCB7IEVzcHJpbWFIZWxwZXIgfSBmcm9tIFwiLi4vLi4vZXNwcmltYS9Fc3ByaW1hSGVscGVyXCI7XG5pbXBvcnQgeyBFc3ByaW1hVmVyc2UsIEVzcHJpbWFIdG1sQ291cGxldEZhY3RvcnksIEVzcHJpbWFDb3VwbGV0IH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYVR5cGVzXCI7XG5pbXBvcnQgeyBzdHJpbmdpZnkgfSBmcm9tIFwicXVlcnlzdHJpbmdcIjtcblxuZXhwb3J0IGNsYXNzIEVzcHJpbWFWYXJpYWJsZVNjb3BlSHRtbEZhY3RvcnkgaW1wbGVtZW50cyBFc3ByaW1hSHRtbENvdXBsZXRGYWN0b3J5IHtcblxuICAgIHByaXZhdGUgdmFySGludEJ5VmVyc2VzTWFwOiBNYXA8QmFzZU5vZGUsIEhUTUxFbGVtZW50W10+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgdmFySGludFVwZGF0ZXJNYXA6IE1hcDxCYXNlTm9kZSwgKHZhbHVlOiBhbnkpID0+IHZvaWQ+ID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY291cGxldDogRXNwcmltYUNvdXBsZXQsXG4gICAgICAgIHByaXZhdGUgZGVjb3JhdG9yOiBTdHlsZURlY29yYXRvcjxzdHJpbmc+LFxuICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogUHJvZ3JlbVNjaGVkdWxlclxuICAgICkge31cblxuICAgIGJ1aWxkQ291cGxldCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIC8vIEZJWE1FIGlsIGZhdWRyYWl0IHBhcmNvdXJpciBsJ2FyYnJlIEFTVCBhdmVjIHVuIHdhbGtlciBvdSB1biB0cnVjIGR1IGdlbnJlLlxuICAgICAgICAvLyBGSVhNRSBncm9zIGhhY2sgZHUgc3lzdMOobWUgZGUgSHRtbEZhY3RvcnkgZXQgZGUgRGVjb3JhdG9yIHBvdXIgcmVhbGlzZXIgY2UgY29tcG9zYW50LlxuICAgICAgICAvLyBCdWlsZCBhbGwgVmFyaWFibGVIaW50IHdoaWNoIHdpbGwgYmUgYWRkZWQgaW4gdmlldyBjb250YWluZXIgb25lIGJ5IG9uZSBieSBnZXRIdG1sVmVyc2UoKVxuICAgICAgICB0aGlzLmNvdXBsZXQudmVyc2VzLmZvckVhY2godiA9PiB7XG4gICAgICAgICAgICBsZXQgdmFySGludHMgPSB0aGlzLmJ1aWxkVmFyaWFibGVIaW50cyh2Lm5vZGUpO1xuICAgICAgICAgICAgbGV0IGRlY29yYXRlZFZhckhpbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgICAgICAgICB2YXJIaW50cy5mb3JFYWNoKCh2YXJIaW50LCB2YXJOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGRlY29yYXRlZCA9IHRoaXMuZGVjb3JhdG9yLmRlY29yYXRlKHZhck5hbWUsIHZhckhpbnQpO1xuICAgICAgICAgICAgICAgIGRlY29yYXRlZFZhckhpbnRzLnB1c2goZGVjb3JhdGVkKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLnZhckhpbnRCeVZlcnNlc01hcC5zZXQodi5ub2RlLCBkZWNvcmF0ZWRWYXJIaW50cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLXNjb3BlLWNvbXBvbmVudCcpO1xuICAgIH0gICAgXG4gICAgXG4gICAgZ2V0SHRtbFZlcnNlKHZlcnNlOiBFc3ByaW1hVmVyc2UpOiBIVE1MRWxlbWVudHx1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy52YXJIaW50QnlWZXJzZXNNYXAuc2l6ZSA9PT0gMCB8fCAhdmVyc2Uubm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0bWxFbGVtZW50cyA9IHRoaXMudmFySGludEJ5VmVyc2VzTWFwLmdldCh2ZXJzZS5ub2RlKTtcbiAgICAgICAgaWYgKCFodG1sRWxlbWVudHMgfHwgaHRtbEVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5zY2hlZHVsZXIuY3VycmVudCgpO1xuICAgICAgICBsZXQgdmFsdWVzTWFwID0gRXNwcmltYUhlbHBlci5nZXRWYXJpYWJsZVZhbHVlcyhzdGF0ZSwgdmVyc2Uubm9kZSk7XG4gICAgICAgIGxldCB2YXJIaW50VXBkYXRlciA9IHRoaXMudmFySGludFVwZGF0ZXJNYXAuZ2V0KHZlcnNlLm5vZGUpO1xuICAgICAgICBpZiAodmFySGludFVwZGF0ZXIpIHtcbiAgICAgICAgICAgIHZhckhpbnRVcGRhdGVyKHZhbHVlc01hcCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCB2ZXJzZUNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbigndmVyc2UtY29udGFpbmVyJywgaHRtbEVsZW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIHZlcnNlQ29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkIGEgVmFyaWFibGUgSGludCBpZiB0aGUgc3VwcGxpZWQgbm9kZSBjb250YWlucyBhIFZhcmlhYmxlIGFmZmVjdGF0aW9uLlxuICAgICAqIEBwYXJhbSBub2RlXG4gICAgICogQHJldHVybnMgYW4gSFRNTEVsZW1lbnQgb3IgbnVsbCBpZiBubyBoaW50IHNob3VsZCBhcHBlYXIgZm9yIHRoaXMgbm9kZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBidWlsZFZhcmlhYmxlSGludHMobm9kZTogQmFzZU5vZGUpOiBNYXA8c3RyaW5nLCBIVE1MRWxlbWVudD4ge1xuICAgICAgICBsZXQgdmFyTm9kZSA9IEVzcHJpbWFIZWxwZXIucmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24obm9kZSk7XG4gICAgICAgIGlmICghdmFyTm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNYXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2YXJOYW1lcyA9IEVzcHJpbWFIZWxwZXIuZ2V0VmFyaWFibGVOYW1lcyh2YXJOb2RlKTtcbiAgICAgICAgbGV0IHZhckhpbnRzID0gdmFyTmFtZXMubWFwKHZhck5hbWUgPT4ge1xuICAgICAgICAgICAgbGV0IHZhclZhbHVlID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS1oaW50LXZhbHVlJyk7XG4gICAgICAgICAgICBsZXQgdmFySGludCA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtaGludCcsIFtgJHt2YXJOYW1lfTogYCwgdmFyVmFsdWVdKTtcbiAgICAgICAgICAgIHJldHVybiB7dmFyTmFtZSwgdmFySGludCwgdmFyVmFsdWV9O1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdmFsVXBkYXRlciA9ICh2YWxzQnlWYXJOYW1lOiBNYXA8c3RyaW5nLCBhbnk+KSA9PiB7XG4gICAgICAgICAgICB2YXJIaW50cy5mb3JFYWNoKHZhckhpbnQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YWwgPSB2YWxzQnlWYXJOYW1lLmdldCh2YXJIaW50LnZhck5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICB2YXJIaW50LnZhclZhbHVlLmlubmVyVGV4dCA9IHZhbC50b0ZpeGVkKDIpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFySGludC52YXJWYWx1ZS5pbm5lclRleHQgPSB2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudmFySGludFVwZGF0ZXJNYXAuc2V0KG5vZGUsIHZhbFVwZGF0ZXIpO1xuXG4gICAgICAgIGxldCB2YXJIaW50c0J5TmFtZSA9IG5ldyBNYXA8c3RyaW5nLCBIVE1MRWxlbWVudD4oKTtcbiAgICAgICAgdmFySGludHMuZm9yRWFjaCh2YXJIaW50ID0+IHZhckhpbnRzQnlOYW1lLnNldCh2YXJIaW50LnZhck5hbWUsIHZhckhpbnQudmFySGludCkpO1xuXG4gICAgICAgIHJldHVybiB2YXJIaW50c0J5TmFtZTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBFdmFsU2NvcGUgfSBmcm9tIFwiLi9FdmFsU2VydmljZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT4ge1xuICAgIG5vZGU6IEFzdEJhc2VUeXBlXG4gICAgY29kZTogQXN0QmFzZVR5cGVcbn1cbi8qXG5leHBvcnQgaW50ZXJmYWNlIFZlcnNlSW5zdHJ1Y3Rpb25GYWN0b3J5PEFzdEJhc2VUeXBlPiB7XG4gICAgYnVpbGQocGFyYW06IEFzdEJhc2VUeXBlKTogUHJvZ3JlbVZlcnNlPEFzdEJhc2VUeXBlPjtcbn1cbiovXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPiB7XG4gICAgZnVuY3Rpb25Sb290Tm9kZTogQXN0QmFzZVR5cGVcbiAgICB2ZXJzZXM6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT5bXVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1GYWN0b3J5PEFzdEJhc2VUeXBlPiB7XG4gICAgYnVpbGRQcm9ncmVtKGNvZGU6IHN0cmluZyk6IFByb2dyZW1Db2RlPEFzdEJhc2VUeXBlPlxuICAgIGJ1aWxkQ291cGxldChub2RlOiBBc3RCYXNlVHlwZSwgdmVyc2VzOiBBc3RCYXNlVHlwZVtdKTogUHJvZ3JlbUNvdXBsZXQ8QXN0QmFzZVR5cGU+XG4gICAgYnVpbGRWZXJzZShub2RlOiBBc3RCYXNlVHlwZSk6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBWZXJzZUl0ZXJhdG9yPEFzdEJhc2VUeXBlPiB7XG4gICAgZXhlY3V0ZU5leHQoKTogUHJvZ3JlbVZlcnNlPEFzdEJhc2VUeXBlPlxuICAgIGhhc05leHQoKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtQ29kZTxBc3RCYXNlVHlwZT4ge1xuICAgIGluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCk6IFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPlxuICAgIGNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKTogUHJvZ3JlbUNvdXBsZXQ8QXN0QmFzZVR5cGU+XG4gICAgaXRlcmF0b3Ioc3RhdGU6IFByb2dyZW1TdGF0ZSk6IFZlcnNlSXRlcmF0b3I8QXN0QmFzZVR5cGU+XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVtU3RhdGUge1xuXG4gICAgcHVibGljIHJlYWRvbmx5IGV2YWxTY29wZSA9IG5ldyBFdmFsU2NvcGU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvbG9ubmU6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGxpZ25lOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBmcmFtZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgY29udGV4dGU6IG9iamVjdCxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHZlcnNlOiBQcm9ncmVtVmVyc2U8YW55PiB8IG51bGwsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGV2YWwoZXhwcjogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZhbFNjb3BlLmdsb2JhbEV2YWwoZXhwcik7XG4gICAgfVxufVxuXG50eXBlIE5ld1N0YXRlQ2FsbGJhY2sgPSAoc3RhdGU6IFByb2dyZW1TdGF0ZSkgPT4gdm9pZDtcbmV4cG9ydCBpbnRlcmZhY2UgU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIge2ZpcmVTdGFydEl0ZXJhdGluZ0NvZGU6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBDb2RlRXhlY3V0aW9uTGlzdGVuZXIge2ZpcmVDb2RlRXhlY3V0aW9uOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgR3JpZENoYW5nZUxpc3RlbmVyIHtmaXJlR3JpZENoYW5nZTogTmV3U3RhdGVDYWxsYmFja307XG5leHBvcnQgaW50ZXJmYWNlIExpbmVDaGFuZ2VMaXN0ZW5lciB7ZmlyZUxpbmVDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBGcmFtZUNoYW5nZUxpc3RlbmVyIHtmaXJlRnJhbWVDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1TY2hlZHVsZXIge1xuICAgIHN1YnNjcmliZVN0YXJ0SXRlcmF0aW5nQ29kZShsaXN0ZW5lcjogU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlQ29kZUV4ZWN1dGlvbihsaXN0ZW5lcjogQ29kZUV4ZWN1dGlvbkxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUdyaWRDaGFuZ2UobGlzdGVuZXI6IEdyaWRDaGFuZ2VMaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVMaW5lQ2hhbmdlKGxpc3RlbmVyOiBMaW5lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlRnJhbWVDaGFuZ2UobGlzdGVuZXI6IEZyYW1lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG4gICAgcmVzZXQoKTogUHJvZ3JlbVN0YXRlXG4gICAgY3VycmVudCgpOiBQcm9ncmVtU3RhdGVcbiAgICBuZXh0KCk6IFByb2dyZW1TdGF0ZVxuICAgIGdldFByb2dyZW0oKTogUHJvZ3JlbUNvZGU8YW55PlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1Db21wb25lbnQge1xuICAgIHJlbmRlckh0bWwoKTogSFRNTEVsZW1lbnRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdHlsZURlY29yYXRvcjxUPiB7XG4gICAgZGVjb3JhdGUobm9kZTogVCwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIdG1sQ291cGxldEZhY3Rvcnk8QXN0QmFzZVR5cGU+IHtcbiAgICBidWlsZENvdXBsZXQoKTogSFRNTEVsZW1lbnRcbiAgICBnZXRIdG1sVmVyc2UodmVyc2U6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT4pOiBIVE1MRWxlbWVudHx1bmRlZmluZWRcbn1cblxuZXhwb3J0IGNsYXNzIFN0eWxlRGVjb3JhdG9yQWdncmVnYXRpb248VD4gaW1wbGVtZW50cyBTdHlsZURlY29yYXRvcjxUPiB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY29yYXRvcnM6IFN0eWxlRGVjb3JhdG9yPFQ+W10pIHt9XG5cbiAgICBkZWNvcmF0ZShub2RlOiBULCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IHRlbXA6IEhUTUxFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5kZWNvcmF0b3JzLmZvckVhY2goZCA9PiB0ZW1wID0gZC5kZWNvcmF0ZShub2RlLCB0ZW1wKSk7XG4gICAgICAgIHJldHVybiB0ZW1wO1xuICAgIH1cblxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvcmF0b3JzLm1hcChkID0+IGQuYnVpbGRTdHlsZVNoZWV0KCkpLmpvaW4oJ1xcbicpO1xuICAgIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbG9yUHJvdmlkZXIge1xuICAgIGhzbENvbG9yKGh1ZTogbnVtYmVyKTogc3RyaW5nO1xuICAgIGhhc2hTdHJpbmdUb0NvbG9yKGtleTogc3RyaW5nLCBjb2xvckNvdW50OiBudW1iZXIsIHNoaWZ0PzogbnVtYmVyKTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbG9yUHJvdmlkZXJGYWN0b3J5IHtcbiAgICBidWlsZChrZXk/OiBzdHJpbmcpOiBDb2xvclByb3ZpZGVyO1xufSIsImltcG9ydCB7IFByb2dyZW1GYWN0b3J5IH0gZnJvbSBcIi4vVHlwZXNcIjtcbmltcG9ydCB7IEJhc2ljRXNwcmltYVByb2dyZW1GYWN0b3J5IH0gZnJvbSBcIi4uL2VzcHJpbWEvQmFzaWNFc3ByaW1hUHJvZ3JlbVwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvZGVTZXJ2aWNlIHtcblxuICAgIGV4cG9ydCBjb25zdCBwcm9ncmVtRmFjdG9yeTogUHJvZ3JlbUZhY3Rvcnk8YW55PiA9IG5ldyBCYXNpY0VzcHJpbWFQcm9ncmVtRmFjdG9yeSgpO1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGxvYWRQcm9ncmVtKGZpbGVVcmw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjbGllbnQgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIGNsaWVudC5vcGVuKCdHRVQnLCBmaWxlVXJsKTtcbiAgICAgICAgICAgIGNsaWVudC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvZGUgPSBjbGllbnQucmVzcG9uc2VUZXh0O1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvZGVTZXJ2aWNlOiBQcm9ncmVtIGxvYWRlZCBzdWNjZXNzZnVsbHkuJywgY29kZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShjb2RlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjbGllbnQub25lcnJvciA9ICgpID0+IHJlamVjdChjbGllbnQuc3RhdHVzVGV4dCk7XG4gICAgICAgICAgICBjbGllbnQuc2VuZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0iLCJcbmV4cG9ydCBjbGFzcyBTY3JlZW5Db25maWcge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm94U2l6ZTogbnVtYmVyXG4gICAgKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgU2NyZWVuU2VydmljZSB7XG5cbiAgICBwdWJsaWMgZ2V0U2NyZWVuRnJhbWUoKTogYW55IHtcblxuICAgIH1cblxufSIsImltcG9ydCB7IFBhdHRlcm4sIElkZW50aWZpZXIsIEJhc2VOb2RlLCBWYXJpYWJsZURlY2xhcmF0aW9uLCBBc3NpZ25tZW50RXhwcmVzc2lvbiwgRnVuY3Rpb25EZWNsYXJhdGlvbiwgTm9kZSB9IGZyb20gXCJlc3RyZWVcIjtcbmltcG9ydCB7IFByb2dyZW1TdGF0ZSB9IGZyb20gXCIuLi9jb3JlL1R5cGVzXCI7XG5pbXBvcnQgeyBzdHJpbmdpZnkgfSBmcm9tIFwicXVlcnlzdHJpbmdcIjtcblxuZXhwb3J0IHR5cGUgTm9kZVdpdGhQYXJlbnQgPSBOb2RlICYgeyBwYXJlbnQ/OiBOb2RlIH07XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFc3ByaW1hSGVscGVyIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgcGF0dGVyblRvU3RyaW5nKHBhdHRlcm46IFBhdHRlcm4pOiBzdHJpbmcge1xuICAgICAgICB2YXIgbm9kZTtcbiAgICAgICAgc3dpdGNoIChwYXR0ZXJuLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0lkZW50aWZpZXInOlxuICAgICAgICAgICAgICAgIG5vZGUgPSBwYXR0ZXJuIGFzIElkZW50aWZpZXI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUubmFtZTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGNvbnZlcnQgcGF0dGVybiBvZiB0eXBlICcgKyBwYXR0ZXJuLnR5cGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24obm9kZTogQmFzZU5vZGUpOiBWYXJpYWJsZURlY2xhcmF0aW9uIHwgQXNzaWdubWVudEV4cHJlc3Npb24gfCBGdW5jdGlvbkRlY2xhcmF0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgbGV0IGRlY2wgPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gZGVjbDtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgIGxldCBleHByID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgICAgIHJldHVybiBleHByO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBmdW5jO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHAgPT09ICdsZWZ0JyB8fCBwID09PSAncmlnaHQnIHx8IHAgPT09ICdhcmd1bWVudCcgfHwgcCA9PT0gJ2NhbGxlZScgfHwgcCA9PT0gJ2JvZHknIHx8IHAgPT09ICdleHByZXNzaW9uJykge1xuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkOiBCYXNlTm9kZSA9IG5vZGVbcF0gYXMgQmFzZU5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBFc3ByaW1hSGVscGVyLnJlZHVjZU5vZGVUb1ZhckRlY2xhcmF0aW9uKGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdmFyaWFibGUgbmFtZXMgb2YgZGVjbGFyYXRpb24gb3IgYXNzaWdubWVudCBjb250YWluZWQgaW4gbm9kZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbm9kZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFZhcmlhYmxlTmFtZXMobm9kZTogVmFyaWFibGVEZWNsYXJhdGlvbiB8IEFzc2lnbm1lbnRFeHByZXNzaW9uIHwgRnVuY3Rpb25EZWNsYXJhdGlvbik6IHN0cmluZ1tdIHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICBsZXQgZGVjbCA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBkZWNsLmRlY2xhcmF0aW9ucy5tYXAoZCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBFc3ByaW1hSGVscGVyLnBhdHRlcm5Ub1N0cmluZyhkLmlkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFyTmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJykge1xuICAgICAgICAgICAgbGV0IGRlY2wgPSBub2RlIGFzIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBFc3ByaW1hSGVscGVyLnBhdHRlcm5Ub1N0cmluZyhkZWNsLmxlZnQpO1xuICAgICAgICAgICAgcmV0dXJuIFt2YXJOYW1lXTtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdGdW5jdGlvbkRlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgbGV0IGZ1bmMgPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gZnVuYy5wYXJhbXMubWFwKHAgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YXJOYW1lID0gRXNwcmltYUhlbHBlci5wYXR0ZXJuVG9TdHJpbmcocCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhck5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHZhcmlhYmxlIHZhbHVlcyBvZiBkZWNsYXJhdGlvbiBvciBhc3NpZ25tZW50IGNvbnRhaW5lZCBpbiBub2RlLlxuICAgICAqIFNhbWUgYXMgZ2V0VmFyaWFibGVOYW1lcyBidXQgZXZhbHVhdGUgdmFyaWFibGVzIHRvIGRpc2NvdmVyIHRoZWlyIHZhbHVlcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbm9kZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFZhcmlhYmxlVmFsdWVzKHN0YXRlOiBQcm9ncmVtU3RhdGUsIG5vZGU6IEJhc2VOb2RlKTogTWFwPHN0cmluZywgYW55PiB7XG4gICAgICAgIGxldCB2YWx1ZXNNYXAgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICBsZXQgdmFyTm9kZXMgPSB0aGlzLnJlZHVjZU5vZGVUb1ZhckRlY2xhcmF0aW9uKG5vZGUpO1xuICAgICAgICBpZiAoIXZhck5vZGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzTWFwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0VmFyaWFibGVOYW1lcyh2YXJOb2RlcykubWFwKHZhck5hbWUgPT4gdmFsdWVzTWFwLnNldCh2YXJOYW1lLCBzdGF0ZS5ldmFsKHZhck5hbWUpKSk7XG4gICAgICAgIHJldHVybiB2YWx1ZXNNYXA7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpc0NoaWxkTm9kZU9mKG5vZGU6IE5vZGVXaXRoUGFyZW50LCBwYXJlbnQ6IEJhc2VOb2RlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChub2RlLnBhcmVudCA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICghbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBFc3ByaW1hSGVscGVyLmlzQ2hpbGROb2RlT2Yobm9kZS5wYXJlbnQgYXMgTm9kZVdpdGhQYXJlbnQsIHBhcmVudCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpc05vdENoaWxkTm9kZU9mKG5vZGU6IE5vZGVXaXRoUGFyZW50LCBwYXJlbnRzOiBCYXNlTm9kZVtdKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChwYXJlbnRzLmZpbmQocCA9PiBwID09PSBub2RlLnBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICghbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEVzcHJpbWFIZWxwZXIuaXNOb3RDaGlsZE5vZGVPZihub2RlLnBhcmVudCBhcyBOb2RlV2l0aFBhcmVudCwgcGFyZW50cyk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgQ29sb3JQcm92aWRlciwgQ29sb3JQcm92aWRlckZhY3RvcnkgfSBmcm9tIFwiLi9UeXBlc1wiO1xuaW1wb3J0IHsgY3JlYXRlIGFzIG1kNUNyZWF0ZSB9IGZyb20gJ2pzLW1kNSc7XG5cbmV4cG9ydCBjbGFzcyBCYXNpY0NvbG9yUHJvdmlkZXJGYWN0b3J5IGltcGxlbWVudHMgQ29sb3JQcm92aWRlckZhY3Rvcnkge1xuICAgIGJ1aWxkKGtleT86IHN0cmluZyk6IENvbG9yUHJvdmlkZXIge1xuICAgICAgICByZXR1cm4gbmV3IEJhc2ljQ29sb3JQcm92aWRlcigpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljQ29sb3JQcm92aWRlciBpbXBsZW1lbnRzIENvbG9yUHJvdmlkZXIge1xuXG4gICAgcHJpdmF0ZSBjb2xvck1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKTtcblxuICAgIHB1YmxpYyBoc2xDb2xvcihodWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnaHNsKCcgKyBodWUgKyAnLCAxMDAlLCA4MCUpJztcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFzaFN0cmluZ1RvQ29sb3Ioa2V5OiBzdHJpbmcsIGNvbG9yQ291bnQ6IG51bWJlciwgc2hpZnQ6IG51bWJlciA9IDIpIHtcbiAgICAgICAgdmFyIGh1ZSA9IHRoaXMuY29sb3JNYXAuZ2V0KGtleSk7XG4gICAgICAgIGlmIChodWUpIHJldHVybiB0aGlzLmhzbENvbG9yKGh1ZSk7XG5cbiAgICAgICAgdmFyIGhhc2ggPSBtZDVDcmVhdGUoKS51cGRhdGUoa2V5KS50b1N0cmluZygpO1xuICAgICAgICBcbiAgICAgICAgaHVlID0gKCBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDAsIHNoaWZ0ICsgMSksIDE2KSArIDE2ICogcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAxLCBzaGlmdCArIDIpLCAxNikgKyAyNTYgKiBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDIsIHNoaWZ0ICsgMyksIDE2KSApO1xuICAgICAgICBodWUgPSBNYXRoLmZsb29yKGh1ZSAlIGNvbG9yQ291bnQpICogMzYwIC8gY29sb3JDb3VudDtcbiAgICAgICAgaHVlID0gaHVlICUgMzYwO1xuXG4gICAgICAgIC8vIENvbG9yIGRlZHVwbGljYXRpb25cbiAgICAgICAgd2hpbGUgKCF0aGlzLmNvbG9yTWFwLmdldChrZXkpKSB7XG4gICAgICAgICAgICBsZXQgZHVwbGljYXRlQ29sb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGMgb2YgdGhpcy5jb2xvck1hcC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhjIC0gaHVlKSA8IE1hdGguZmxvb3IoMTgwIC8gY29sb3JDb3VudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZHVwbGljYXRlQ29sb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBodWUgKz0gTWF0aC5mbG9vcigyNzAgLyBjb2xvckNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgaHVlID0gaHVlICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWR1cGxpY2F0ZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvck1hcC5zZXQoa2V5LCBodWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL3ZhciBwYXN0ZWwgPSAnaHNsKCcgKyBodWUgKyAnLCAxMDAlLCA4Ny41JSknO1xuICAgICAgICByZXR1cm4gdGhpcy5oc2xDb2xvcihodWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBDb2xvclNlcnZpY2Uge1xuXG4gICAgZXhwb3J0IGNvbnN0IGNvbG9yUHJvdmlkZXJhY3Rvcnk6IENvbG9yUHJvdmlkZXJGYWN0b3J5ID0gbmV3IEJhc2ljQ29sb3JQcm92aWRlckZhY3RvcnkoKTtcblxufVxuIiwiaW1wb3J0IHsgUHJvZ3JlbUNvbXBvbmVudCwgUHJvZ3JlbVNjaGVkdWxlciwgU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciwgUHJvZ3JlbVN0YXRlIH0gZnJvbSBcIi4uLy4uL2NvcmUvVHlwZXNcIjtcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gXCIuLi8uLi9jb3JlL1NjcmVlblNlcnZpY2VcIjtcbmltcG9ydCB7IFByb2dyZW1Db25maWcgfSBmcm9tIFwiLi4vLi4vY29yZS9Qcm9ncmVtU2VydmljZVwiO1xuaW1wb3J0IHsgSHRtbEhlbHBlciB9IGZyb20gXCIuLi8uLi9jb3JlL0h0bWxIZWxwZXJcIjtcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIgfSBmcm9tIFwicnhqc1wiO1xuXG5leHBvcnQgY2xhc3MgUHJvZ3JlbUdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBQcm9ncmVtQ29tcG9uZW50LCBTdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyIHtcbiAgICBcbiAgICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgcHJpdmF0ZSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBibGlua0ludGVydmFsID0gMjAwO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNjcmVlbkNvbmZpZzogU2NyZWVuQ29uZmlnLCBcbiAgICAgICAgcHJpdmF0ZSBwcm9ncmVtQ29uZmlnOiBQcm9ncmVtQ29uZmlnLFxuICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogUHJvZ3JlbVNjaGVkdWxlcixcbiAgICAgICAgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnRcbiAgICAgICAgKSB7XG4gICAgICAgIGxldCBlbldhcm5pbmcgPSBIdG1sSGVscGVyLnAoJ3dhcm5pbmcnLCBcIllvdXIgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgY2FudmFzLlwiKTtcbiAgICAgICAgbGV0IGZyV2FybmluZyA9IEh0bWxIZWxwZXIucCgnd2FybmluZycsIFwiVm90cmUgbmF2aWdhdGV1ciBuZSBzdXBwb3J0ZSBwYXMgbGVzIGNhbnZhcy5cIik7XG4gICAgICAgIHRoaXMuY2FudmFzID0gSHRtbEhlbHBlci5jYW52YXMoJycsIFtlbldhcm5pbmcsIGZyV2FybmluZ10pO1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMucHJvZ3JlbUNvbmZpZy5jb2xvbm5lcyAqIHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMucHJvZ3JlbUNvbmZpZy5jb2xvbm5lcyAqIHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG5cbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmICghY3R4KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBvYnRhaW4gMkQgQ2FudmFzIGNvbnRleHQgIScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG5cbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZVN0YXJ0SXRlcmF0aW5nQ29kZSh0aGlzKTtcbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUdyaWRDaGFuZ2UodGhpcyk7XG4gICAgfVxuXG4gICAgcmVuZGVySHRtbCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3Byb2dyZW0tZ3JpZCcsIHRoaXMuY2FudmFzKTtcblxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjb2xvckN1cnJlbnRQaXhlbChzdGF0ZTogUHJvZ3JlbVN0YXRlLCBjb2xvcjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBib3hTaXplID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcbiAgICAgICAgbGV0IGMgPSBzdGF0ZS5jb2xvbm5lO1xuICAgICAgICBsZXQgbCA9IHN0YXRlLmxpZ25lO1xuXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdChjICogYm94U2l6ZSwgbCAqIGJveFNpemUsIGJveFNpemUsIGJveFNpemUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBibGlua0N1cnJlbnRQaXhlbChzdGF0ZTogUHJvZ3JlbVN0YXRlLCBpbmNyZW1udDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBjb2xvciA9ICdibGFjayc7XG4gICAgICAgIGlmIChpbmNyZW1udCAlIDIgPT09IDApIHtcbiAgICAgICAgICAgIGNvbG9yID0gJ2FudGlxdWV3aGl0ZSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb2xvckN1cnJlbnRQaXhlbChzdGF0ZSwgY29sb3IpO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgZmlyZVN0YXJ0SXRlcmF0aW5nQ29kZSAoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBPYnNlcnZhYmxlLmludGVydmFsKHRoaXMuYmxpbmtJbnRlcnZhbCwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIpLnN1YnNjcmliZSh0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuYmxpbmtDdXJyZW50UGl4ZWwoc3RhdGUsIHQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmaXJlR3JpZENoYW5nZSAoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYm94U2l6ZSA9IHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG4gICAgICAgIGxldCBjID0gc3RhdGUuY29sb25uZTtcbiAgICAgICAgbGV0IGwgPSBzdGF0ZS5saWduZTtcblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGxldCBjb3VsZXVyID0gY29sb3JlclByb2dyZW0oYywgbCwgc3RhdGUuY29udGV4dGUpO1xuICAgICAgICBpZiAoY291bGV1cikge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY291bGV1cjtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KGMgKiBib3hTaXplLCBsICogYm94U2l6ZSwgYm94U2l6ZSwgYm94U2l6ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemUgKiB0aGlzLnByb2dyZW1Db25maWcuY29sb25uZXM7XG4gICAgICAgIGxldCBoZWlnaHQgPSB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplICogdGhpcy5wcm9ncmVtQ29uZmlnLmxpZ25lcztcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnYW50aXF1ZXdoaXRlJztcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuXG59Il0sInNvdXJjZVJvb3QiOiIifQ==