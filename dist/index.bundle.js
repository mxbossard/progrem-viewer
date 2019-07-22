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
const js_md5_1 = __webpack_require__(/*! js-md5 */ "gjeX");
const ProgremInspectorComponent_1 = __webpack_require__(/*! ./ProgremInspectorComponent */ "OFPY");
class ColorVerseVariableDecorator {
    constructor() {
        this.variableMap = new Map();
        this.colorMap = new Map();
    }
    decorate(node, element) {
        let varId;
        /*
        if (node.type === 'VariableDeclarator') {
            let n = node as VariableDeclarator;
            varId = EsprimaHelper.patternToString(n.id);
        }
        if (node.type === 'AssignmentExpression') {
            let n = node as AssignmentExpression;
            varId = EsprimaHelper.patternToString(n.left);
        }
        */
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
            let color = this.hashStringToColor(id, this.variableMap.size);
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
    hslColor(hue) {
        return 'hsl(' + hue + ', 100%, 80%)';
    }
    hashStringToColor(key, colorCount = 12, shift = 2) {
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
                let progremInspectorFactory = new EsprimaProgremInspectorHtmlFactory_1.EsprimaProgremInspectorHtmlFactory(progremCode.colorerProgremFunction(), progremInspectorDecorators);
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
            timer(0);
        });
    }
    ProgremService.buildProgrem = buildProgrem;
    function timer(timestamp) {
        window.requestAnimationFrame(timer);
        if (timestamp - previousRepaintTime < 500) {
            return;
        }
        previousRepaintTime = timestamp;
        if (scheduler) {
            scheduler.next();
        }
    }
})(ProgremService = exports.ProgremService || (exports.ProgremService = {}));


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9yU3R5bGVEZWNvcmF0b3JzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9IdG1sSGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9lc3ByaW1hL0Jhc2ljRXNwcmltYVByb2dyZW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvRXZhbFNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvU2NoZWR1bGluZ1NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Fc3ByaW1hUHJvZ3JlbUluc3BlY3Rvckh0bWxGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3Byb2dyZW1JbnNwZWN0b3IvUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9Qcm9ncmVtU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9UeXBlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9Db2RlU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9TY3JlZW5TZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9lc3ByaW1hL0VzcHJpbWFIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZ3JlbUdyaWQvUHJvZ3JlbUdyaWRDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUdBLDJEQUE2QztBQUM3QyxtR0FBd0U7QUFFeEUsTUFBYSwyQkFBMkI7SUFBeEM7UUFFWSxnQkFBVyxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBd0Q3QyxhQUFRLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7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LEVBQUUsQ0FBQztTQUNuQztRQUVELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUVwQixhQUFhO1FBQ2IsSUFBSSxPQUFPLEdBQUcsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1lBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDakU7SUFDTCxDQUFDO0lBRVMsS0FBSztRQUNYLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQ3BFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ25FLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FFSjtBQXRGRCxvREFzRkMiLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3R5bGVEZWNvcmF0b3IsIFByb2dyZW1TY2hlZHVsZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgQmFzZU5vZGUsIFZhcmlhYmxlRGVjbGFyYXRvciwgQXNzaWdubWVudEV4cHJlc3Npb24sIElkZW50aWZpZXIgfSBmcm9tIFwiZXN0cmVlXCI7XG5pbXBvcnQgeyBFc3ByaW1hSGVscGVyIH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYUhlbHBlclwiO1xuaW1wb3J0IHsgY3JlYXRlIGFzIG1kNUNyZWF0ZSB9IGZyb20gJ2pzLW1kNSc7XG5pbXBvcnQgeyBQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50IH0gZnJvbSBcIi4vUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudFwiO1xuXG5leHBvcnQgY2xhc3MgQ29sb3JWZXJzZVZhcmlhYmxlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8QmFzZU5vZGU+IHtcblxuICAgIHByaXZhdGUgdmFyaWFibGVNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwKCk7XG5cbiAgICBkZWNvcmF0ZShub2RlOiBCYXNlTm9kZSwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCB2YXJJZDtcbiAgICAgICAgLypcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRvcicpIHtcbiAgICAgICAgICAgIGxldCBuID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0b3I7XG4gICAgICAgICAgICB2YXJJZCA9IEVzcHJpbWFIZWxwZXIucGF0dGVyblRvU3RyaW5nKG4uaWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgIGxldCBuID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgICAgIHZhcklkID0gRXNwcmltYUhlbHBlci5wYXR0ZXJuVG9TdHJpbmcobi5sZWZ0KTtcbiAgICAgICAgfVxuICAgICAgICAqL1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnSWRlbnRpZmllcicpIHtcbiAgICAgICAgICAgIGxldCBuID0gbm9kZSBhcyBJZGVudGlmaWVyO1xuICAgICAgICAgICAgdmFySWQgPSBuLm5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFySWQpIHtcbiAgICAgICAgICAgIGxldCB2YXJJbmRleCA9IHRoaXMudmFyaWFibGVNYXAuZ2V0KHZhcklkKTtcbiAgICAgICAgICAgIGlmICghdmFySW5kZXgpIHtcbiAgICAgICAgICAgICAgICB2YXJJbmRleCA9IHRoaXMudmFyaWFibGVNYXAuc2l6ZSArIDE7XG4gICAgICAgICAgICAgICAgdGhpcy52YXJpYWJsZU1hcC5zZXQodmFySWQsIHZhckluZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd2YXJpYWJsZScpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd2YXJpYWJsZS0nICsgdmFySW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSAgICBcbiAgICBcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHN0eWxlID0gJyc7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ3ZhcmlhYmxlIGNvdW50OicsIHRoaXMudmFyaWFibGVNYXAuc2l6ZSk7XG4gICAgICAgIHRoaXMudmFyaWFibGVNYXAuZm9yRWFjaCgoaW5kZXgsIGlkKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKGlkLCB0aGlzLnZhcmlhYmxlTWFwLnNpemUpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYnVpbGRpbmcgY29sb3IgIycsIGlkLCAnPT4nLCBjb2xvcik7XG4gICAgICAgICAgICBzdHlsZSArPSBgXG4gICAgICAgICAgICAgICAgLnZhcmlhYmxlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMC4xZW0gMC41ZW0gMC4xZW0gMC41ZW07XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwLjhlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLiR7UHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRJTkdfQ0xBU1N9IC52YXJpYWJsZS0ke2luZGV4fS5pZGVudGlmaWVyLCBcbiAgICAgICAgICAgICAgICAuJHtQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVEVEX0NMQVNTfSAudmFyaWFibGUtJHtpbmRleH0uaWRlbnRpZmllciB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBgO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBjb2xvck1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKTtcblxuICAgIHByaXZhdGUgaHNsQ29sb3IoaHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2hzbCgnICsgaHVlICsgJywgMTAwJSwgODAlKSc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNoU3RyaW5nVG9Db2xvcihrZXk6IHN0cmluZywgY29sb3JDb3VudDogbnVtYmVyID0gMTIsIHNoaWZ0OiBudW1iZXIgPSAyKSB7XG4gICAgICAgIHZhciBodWUgPSB0aGlzLmNvbG9yTWFwLmdldChrZXkpO1xuICAgICAgICBpZiAoaHVlKSByZXR1cm4gdGhpcy5oc2xDb2xvcihodWUpO1xuXG4gICAgICAgIHZhciBoYXNoID0gbWQ1Q3JlYXRlKCkudXBkYXRlKGtleSkudG9TdHJpbmcoKTtcbiAgICAgICAgXG4gICAgICAgIGh1ZSA9ICggcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAwLCBzaGlmdCArIDEpLCAxNikgKyAxNiAqIHBhcnNlSW50KGhhc2guc3Vic3RyaW5nKHNoaWZ0ICsgMSwgc2hpZnQgKyAyKSwgMTYpICsgMjU2ICogcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAyLCBzaGlmdCArIDMpLCAxNikgKTtcbiAgICAgICAgaHVlID0gTWF0aC5mbG9vcihodWUgJSBjb2xvckNvdW50KSAqIDM2MCAvIGNvbG9yQ291bnQ7XG4gICAgICAgIGh1ZSA9IGh1ZSAlIDM2MDtcblxuICAgICAgICAvLyBDb2xvciBkZWR1cGxpY2F0aW9uXG4gICAgICAgIHdoaWxlICghdGhpcy5jb2xvck1hcC5nZXQoa2V5KSkge1xuICAgICAgICAgICAgbGV0IGR1cGxpY2F0ZUNvbG9yID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGxldCBjIG9mIHRoaXMuY29sb3JNYXAudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoYyAtIGh1ZSkgPCBNYXRoLmZsb29yKDE4MCAvIGNvbG9yQ291bnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGR1cGxpY2F0ZUNvbG9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaHVlICs9IE1hdGguZmxvb3IoMjcwIC8gY29sb3JDb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIGh1ZSA9IGh1ZSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkdXBsaWNhdGVDb2xvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JNYXAuc2V0KGtleSwgaHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy92YXIgcGFzdGVsID0gJ2hzbCgnICsgaHVlICsgJywgMTAwJSwgODcuNSUpJztcbiAgICAgICAgcmV0dXJuIHRoaXMuaHNsQ29sb3IoaHVlKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIFBhZFZlcnNlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8QmFzZU5vZGU+IHtcblxuICAgIGRlY29yYXRlKG5vZGU6IEJhc2VOb2RlLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb2RlLXBhZGRpbmcnKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSAgICBcbiAgICBcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgLmNvZGUtcGFkZGluZyB7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMzJweDtcbiAgICAgICAgfVxuICAgICAgICBgO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgUHJvZ3JlbVNlcnZpY2UsIFByb2dyZW1Db25maWcgfSBmcm9tIFwiLi9jb3JlL1Byb2dyZW1TZXJ2aWNlXCI7XG5pbXBvcnQgeyBTY3JlZW5Db25maWcgfSBmcm9tIFwiLi9jb3JlL1NjcmVlblNlcnZpY2VcIjtcblxubGV0IHNjcmVlbkNvbmZpZyA9IG5ldyBTY3JlZW5Db25maWcoMjApO1xubGV0IHByb2dyZW1Db25maWcgPSBuZXcgUHJvZ3JlbUNvbmZpZygxNywgMTcsIDEpO1xuXG5Qcm9ncmVtU2VydmljZS5idWlsZFByb2dyZW0oJy4vcHJvZ3JlbXMvY29ldXJfcHJvZ3JlbS5qcycsIHNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZyk7IiwiXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSHRtbEhlbHBlciB7XG5cbiAgICBzdGF0aWMgYWRkQ2xhc3NlcyhlbHQ6IEhUTUxFbGVtZW50LCBjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGFzc2VzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY2xhc3Nlcy5zcGxpdCgnICcpLmZvckVhY2goYyA9PiBlbHQuY2xhc3NMaXN0LmFkZChjKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2xhc3NlcykpIHtcbiAgICAgICAgICAgIGNsYXNzZXMuZm9yRWFjaChjID0+IGVsdC5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBzcGFuKGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSwgY29udGVudD86IHN0cmluZ3xIVE1MRWxlbWVudHwoSFRNTEVsZW1lbnR8c3RyaW5nKVtdKTogSFRNTFNwYW5FbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIudGFnKCdzcGFuJywgY2xhc3NlcywgY29udGVudCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHAoY2xhc3Nlczogc3RyaW5nfHN0cmluZ1tdLCBjb250ZW50Pzogc3RyaW5nfEhUTUxFbGVtZW50fChIVE1MRWxlbWVudHxzdHJpbmcpW10pOiBIVE1MUGFyYWdyYXBoRWxlbWVudCB7XG4gICAgICAgIHJldHVybiBIdG1sSGVscGVyLnRhZygncCcsIGNsYXNzZXMsIGNvbnRlbnQpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgIH1cblxuICAgIHN0YXRpYyBkaXYoY2xhc3Nlczogc3RyaW5nfHN0cmluZ1tdLCBjb250ZW50Pzogc3RyaW5nfEhUTUxFbGVtZW50fChIVE1MRWxlbWVudHxzdHJpbmcpW10pOiBIVE1MRGl2RWxlbWVudCB7XG4gICAgICAgIHJldHVybiBIdG1sSGVscGVyLnRhZygnZGl2JywgY2xhc3NlcywgY29udGVudCkgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGNhbnZhcyhjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxDYW52YXNFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIudGFnKCdjYW52YXMnLCBjbGFzc2VzLCBjb250ZW50KSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyB0YWcodGFnTmFtZTogc3RyaW5nLCBjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGVsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgICAgIGlmIChjbGFzc2VzKSB7XG4gICAgICAgICAgICBIdG1sSGVscGVyLmFkZENsYXNzZXMoZWx0LCBjbGFzc2VzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGVsdC5pbm5lclRleHQgPSBjb250ZW50O1xuICAgICAgICAgICAgY29uc29sZS5sb2coYGNvbnRlbnQ6IFske2NvbnRlbnR9XWApO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgZWx0LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY29udGVudCkpIHtcbiAgICAgICAgICAgIGNvbnRlbnQuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsdC5pbm5lckhUTUwgKz0gYztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgZWx0LmFwcGVuZENoaWxkKGMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gYWRkIGNvbnRlbnQ6JywgYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGVsdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmaW5lQ3NzUnVsZXMoaWQ6IHN0cmluZywgY3NzUnVsZXM6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBsZXQgY3NzSWQgPSAnY3NzLScgKyBpZDtcbiAgICAgICAgbGV0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNzc0lkKTtcbiAgICAgICAgaWYoIXN0eWxlRWxlbWVudCkge1xuICAgICAgICAgICAgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgfVxuICAgICAgICBzdHlsZUVsZW1lbnQuaWQgPSBjc3NJZDtcbiAgICAgICAgLyogYWRkIHN0eWxlIHJ1bGVzIHRvIHRoZSBzdHlsZSBlbGVtZW50ICovXG4gICAgICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3NSdWxlcykpO1xuICAgICAgICBcbiAgICAgICAgLyogYXR0YWNoIHRoZSBzdHlsZSBlbGVtZW50IHRvIHRoZSBkb2N1bWVudCBoZWFkICovXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG59IiwiXG5pbXBvcnQgeyBQcm9ncmFtLCBwYXJzZU1vZHVsZSwgUGFyc2VPcHRpb25zIH0gZnJvbSAnZXNwcmltYSc7XG5pbXBvcnQgeyB3YWxrIGFzIGVzcHJpbWFXYWxrLCB3YWxrQWRkUGFyZW50IGFzIGVzcHJpbWFXYWxrQWRkUGFyZW50IH0gZnJvbSAnZXNwcmltYS13YWxrJztcbmltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcbmltcG9ydCB7IEJhc2VOb2RlLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBCbG9ja1N0YXRlbWVudCwgSWZTdGF0ZW1lbnQsIFJldHVyblN0YXRlbWVudCwgU3RhdGVtZW50IH0gZnJvbSAnZXN0cmVlJztcbmltcG9ydCB7IEVzcHJpbWFWZXJzZUl0ZXJhb3IsIEVzcHJpbWFWZXJzZSwgRXNwcmltYUNvdXBsZXQsIEVzcHJpbWFQcm9ncmVtRmFjdG9yeSwgRXNwcmltYVByb2dyZW0gfSBmcm9tICcuL0VzcHJpbWFUeXBlcyc7XG5pbXBvcnQgeyBFc3ByaW1hSGVscGVyIH0gZnJvbSAnLi9Fc3ByaW1hSGVscGVyJztcbmltcG9ydCB7IENvZGVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9Db2RlU2VydmljZSc7XG5pbXBvcnQgeyBQcm9ncmVtU3RhdGUgfSBmcm9tICcuLi9jb3JlL1R5cGVzJztcblxuY2xhc3MgQmFzaWNFc3ByaW1hQ29kZUl0ZXJhdG9yIGltcGxlbWVudHMgRXNwcmltYVZlcnNlSXRlcmFvciB7XG5cbiAgICBwcml2YXRlIHN0YWNrOiBCYXNlTm9kZVtdID0gW107XG4gICAgcHJpdmF0ZSByZXR1cm5WYWx1ZTogYW55ID0gbnVsbDtcbiAgICBwcml2YXRlIGZpbmlzaGVkID0gZmFsc2VcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgcHJpdmF0ZSByb290Tm9kZTogQmFzZU5vZGUsIFxuICAgICAgICAgICAgcHJpdmF0ZSBzdGF0ZTogUHJvZ3JlbVN0YXRlKSB7XG4gICAgICAgIHRoaXMuc3RhY2sucHVzaChyb290Tm9kZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWNsYXJlUHJvZ3JlbUFyZ3VtZW50cygpIHtcbiAgICAgICAgbGV0IF9jb2xvbm5lID0gdGhpcy5zdGF0ZS5jb2xvbm5lO1xuICAgICAgICBsZXQgX2xpZ25lID0gdGhpcy5zdGF0ZS5saWduZTtcbiAgICAgICAgbGV0IF9jb250ZXh0ZSA9IHRoaXMuc3RhdGUuY29udGV4dGU7XG5cbiAgICAgICAgdGhpcy5zdGF0ZS5ldmFsKCd2YXIgY29sb25uZSA9ICcgKyBfY29sb25uZSArICcsIGxpZ25lID0gJyArIF9saWduZSArICc7Jyk7XG4gICAgICAgIHRoaXMuc3RhdGUuZXZhbCgndmFyIGNvbnRleHRlID0gJyArIEpTT04uc3RyaW5naWZ5KF9jb250ZXh0ZSkpO1xuICAgIH1cblxuICAgIGV4ZWN1dGVOZXh0KCk6IEVzcHJpbWFWZXJzZSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgZmlyc3Qgbm9kZSBvbiB0aGUgc3RhY2tcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5zdGFjay5zaGlmdCgpO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdOb2RlOicsIG5vZGUpO1xuXG4gICAgICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0YWNrIHNob3VsZCBub3QgYmUgZW1wdHkgIScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3RtdDtcblxuICAgICAgICAgICAgc3dpdGNoKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Z1bmN0aW9uRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KGZ1bmMuYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjbGFyZVByb2dyZW1Bcmd1bWVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkVmVyc2UoZnVuYyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2sgPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBibG9jay5ib2R5LnNsaWNlKCkucmV2ZXJzZSgpLm1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0Jsb2NrU3RhdGVtZW50IHVuc2hpZnRpbmc6JywgeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoeClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnSWZTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBzdG10ID0gbm9kZSBhcyBJZlN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3RDb2RlID0gZXNjb2RlR2VuZXJhdGUoc3RtdC50ZXN0KTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdFJlc3VsdCA9IHRoaXMuc3RhdGUuZXZhbCh0ZXN0Q29kZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0lmU3RhdGVtZW50IHRlc3QgZXZhbHVhdGUgdG86ICcsIHRlc3RSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVzdFJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnVGhlbiB1bnNoaWZ0aW5nOicsIHN0bXQuY29uc2VxdWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoc3RtdC5jb25zZXF1ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdG10LmFsdGVybmF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0Vsc2UgdW5zaGlmdGluZzonLCBzdG10LmFsdGVybmF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KHN0bXQuYWx0ZXJuYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFZlcnNlKHN0bXQpO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnUmV0dXJuU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgc3RtdCA9IG5vZGUgYXMgUmV0dXJuU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlID0gdGhpcy5zdGF0ZS5ldmFsKGVzY29kZUdlbmVyYXRlKHN0bXQuYXJndW1lbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFZlcnNlKHN0bXQpO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnTm9kZTonLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvZGUgPSBlc2NvZGVHZW5lcmF0ZShub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnR2VuZXJhdGVkIGNvZGU6JywgY29kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBldmFsUmVzdWx0ID0gdGhpcy5zdGF0ZS5ldmFsKGNvZGUpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdFdmFsdWF0ZSB0bzonLCBldmFsUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkVmVyc2Uobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuc3RhY2subGVuZ3RoID4gMCk7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJdGVyYXRvciBoYXMgbm8gbW9yZSBjb2RlIHRvIGV4ZWN1dGUgIScpO1xuICAgIH0gICAgXG4gICAgXG4gICAgaGFzTmV4dCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuZmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBub2RlcyA9IHRoaXMuc3RhY2suc2xpY2UoMCk7XG4gICAgICAgIHdoaWxlIChub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5vZGVzLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLnR5cGUgIT09ICdCbG9ja1N0YXRlbWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrczogQmxvY2tTdGF0ZW1lbnRbXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2sgPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBibG9ja3MucHVzaChibG9jayk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhcnNvdXJzIHJlY3Vyc2l2ZW1lbnQgbGVzIGJsb2NrcyDDoCBsYSByZWNoZXJjaGUgZGUgbm9ldWQgcXVpIG5lIHNvbnQgcGFzIGRlcyBibG9ja3NcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhhc05leHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFoYXNOZXh0ICYmIGJsb2Nrcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYiA9IGJsb2Nrcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiLmJvZHkubWFwKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeC50eXBlICE9PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNOZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhc05leHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBjbGFzcyBCYXNpY0VzcHJpbWFQcm9ncmVtIGltcGxlbWVudHMgRXNwcmltYVByb2dyZW0ge1xuXG4gICAgcHJpdmF0ZSBlc3ByaW1hUHJvZ3JhbTogUHJvZ3JhbTtcblxuICAgIGNvbnN0cnVjdG9yKGNvZGU6IHN0cmluZykge1xuICAgICAgICBsZXQgY29uZmlnOiBQYXJzZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjb21tZW50OiB0cnVlLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXNwcmltYVByb2dyYW0gPSBwYXJzZU1vZHVsZShjb2RlLCBjb25maWcpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB3YWxrUHJvZ3JlbUNvdXBsZXQoZnVuY3Rpb25OYW1lOiBzdHJpbmcpOiBFc3ByaW1hQ291cGxldCB7XG4gICAgICAgIHZhciBmdW5jTm9kZTogRnVuY3Rpb25EZWNsYXJhdGlvbiB8IG51bGwgPSBudWxsO1xuICAgICAgICB2YXIgdmVyc2VzOiBCYXNlTm9kZVtdID0gW107XG4gICAgICAgIGVzcHJpbWFXYWxrQWRkUGFyZW50KHRoaXMuZXNwcmltYVByb2dyYW0sIG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYoIG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nICYmIG5vZGUuaWQgJiYgbm9kZS5pZC5uYW1lID09PSBmdW5jdGlvbk5hbWUpIHtcbiAgICAgICAgICAgICAgICBmdW5jTm9kZSA9IG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZnVuY05vZGUgJiYgRXNwcmltYUhlbHBlci5pc0NoaWxkTm9kZU9mKG5vZGUsIGZ1bmNOb2RlKSkgeyAvLyAmJiBFc3ByaW1hSGVscGVyLmlzTm90Q2hpbGROb2RlT2Yobm9kZSwgdmVyc2VzKVxuICAgICAgICAgICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdGdW5jdGlvbkRlY2xhcmF0aW9uJyBcbiAgICAgICAgICAgICAgICAgICAgfHwgbm9kZS50eXBlID09PSAnVmFyaWFibGVEZWNsYXJhdGlvbidcbiAgICAgICAgICAgICAgICAgICAgfHwgbm9kZS50eXBlID09PSAnRXhwcmVzc2lvblN0YXRlbWVudCdcbiAgICAgICAgICAgICAgICAgICAgfHwgbm9kZS50eXBlID09PSAnUmV0dXJuU3RhdGVtZW50J1xuICAgICAgICAgICAgICAgICAgICB8fCBub2RlLnR5cGUgPT09ICdJZlN0YXRlbWVudCcgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJzZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gKTtcbiAgICAgICAgaWYgKGZ1bmNOb2RlKSB7XG4gICAgICAgICAgICB2ZXJzZXMudW5zaGlmdChmdW5jTm9kZSk7XG4gICAgICAgICAgICByZXR1cm4gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRDb3VwbGV0KGZ1bmNOb2RlLCB2ZXJzZXMpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW1wb3NzaWJsZSBkZSB0cm91dmVyIGxhIGZvbmN0aW9uICR7ZnVuY3Rpb25OYW1lfSgpICFgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdGlhbGlzZXJQcm9ncmVtRnVuY3Rpb24oKTogRXNwcmltYUNvdXBsZXQge1xuICAgICAgICByZXR1cm4gdGhpcy53YWxrUHJvZ3JlbUNvdXBsZXQoJ2luaXRpYWxpc2VyUHJvZ3JlbScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk6IEVzcHJpbWFDb3VwbGV0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2Fsa1Byb2dyZW1Db3VwbGV0KCdjb2xvcmVyUHJvZ3JlbScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpdGVyYXRvcihzdGF0ZTogUHJvZ3JlbVN0YXRlKTogRXNwcmltYVZlcnNlSXRlcmFvciB7XG4gICAgICAgIHJldHVybiBuZXcgQmFzaWNFc3ByaW1hQ29kZUl0ZXJhdG9yKHRoaXMuY29sb3JlclByb2dyZW1GdW5jdGlvbigpLmZ1bmN0aW9uUm9vdE5vZGUsIHN0YXRlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBCYXNpY0VzcHJpbWFQcm9ncmVtRmFjdG9yeSBpbXBsZW1lbnRzIEVzcHJpbWFQcm9ncmVtRmFjdG9yeSB7XG5cbiAgICBidWlsZFByb2dyZW0oY29kZTogc3RyaW5nKTogRXNwcmltYVByb2dyZW0ge1xuICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW1wb3NzaWJsZSB0byBidWlsZCBQcm9ncmVtIHdpdGhvdXQgY29kZSAhJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBCYXNpY0VzcHJpbWFQcm9ncmVtKGNvZGUpO1xuICAgIH1cblxuICAgIGJ1aWxkQ291cGxldChub2RlOiBGdW5jdGlvbkRlY2xhcmF0aW9uLCB2ZXJzZXM6IEJhc2VOb2RlW10pOiBFc3ByaW1hQ291cGxldCB7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBvc3NpYmxlIHRvIGJ1aWxkIGVtcHR5IENvdXBsZXQgIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVzcHJpbWFWZXJzZXMgPSB2ZXJzZXMubWFwKHRoaXMuYnVpbGRWZXJzZSk7XG5cbiAgICAgICAgbGV0IGNvdXBsZXQ6IEVzcHJpbWFDb3VwbGV0ID0ge1xuICAgICAgICAgICAgZnVuY3Rpb25Sb290Tm9kZTogbm9kZSxcbiAgICAgICAgICAgIHZlcnNlczogZXNwcmltYVZlcnNlc1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdCdWlsdCBjb3VwbGV0OicsIGNvdXBsZXQpO1xuICAgICAgICByZXR1cm4gY291cGxldDtcbiAgICB9XG5cbiAgICBidWlsZFZlcnNlKG5vZGU6IEJhc2VOb2RlKTogRXNwcmltYVZlcnNlIHtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcG9zc2libGUgdG8gYnVpbGQgZW1wdHkgVmVyc2UgIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvZGUgPSBub2RlO1xuICAgICAgICBpZihub2RlLnR5cGUgPT09ICdJZlN0YXRlbWVudCcpIHtcbiAgICAgICAgICAgIGNvZGUgPSAobm9kZSBhcyBJZlN0YXRlbWVudCkudGVzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2ZXJzZTogRXNwcmltYVZlcnNlID0geyBcbiAgICAgICAgICAgIG5vZGU6IG5vZGUsXG4gICAgICAgICAgICBjb2RlOiBjb2RlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB2ZXJzZTtcbiAgICB9XG59XG4iLCJcbmV4cG9ydCBjbGFzcyBFdmFsU2NvcGUge1xuXG4gICAgLy8gU2VlIGh0dHA6Ly9wZXJmZWN0aW9ua2lsbHMuY29tL2dsb2JhbC1ldmFsLXdoYXQtYXJlLXRoZS1vcHRpb25zL1xuICAgIC8vIFdpbGwgcmV0dXJuIGFuIGV2YWwgYWJsZSB0byBldmFsdWF0ZSBqcyBjb2RlIGluIHRoZSBnbG9iYWwgc2NvcGUuXG4gICAgcHVibGljIHJlYWRvbmx5IGdsb2JhbEV2YWwgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciBpc0luZGlyZWN0RXZhbEdsb2JhbCA9IChmdW5jdGlvbiAob3JpZ2luYWwsIE9iamVjdCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvLyBEb2VzIGBPYmplY3RgIHJlc29sdmUgdG8gYSBsb2NhbCB2YXJpYWJsZSwgb3IgdG8gYSBnbG9iYWwsIGJ1aWx0LWluIGBPYmplY3RgLFxuICAgICAgICAgICAgICAgIC8vIHJlZmVyZW5jZSB0byB3aGljaCB3ZSBwYXNzZWQgYXMgYSBmaXJzdCBhcmd1bWVudD9cbiAgICAgICAgICAgICAgICByZXR1cm4gKDEsIGV2YWwpKCdPYmplY3QnKSA9PT0gb3JpZ2luYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgaW5kaXJlY3QgZXZhbCBlcnJvcnMgb3V0IChhcyBhbGxvd2VkIHBlciBFUzMpLCB0aGVuIGp1c3QgYmFpbCBvdXQgd2l0aCBgZmFsc2VgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KShPYmplY3QsIDEyMyk7XG5cbiAgICAgICAgaWYgKGlzSW5kaXJlY3RFdmFsR2xvYmFsKSB7XG4gICAgICAgICAgICAvLyBpZiBpbmRpcmVjdCBldmFsIGV4ZWN1dGVzIGNvZGUgZ2xvYmFsbHksIHVzZSBpdFxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChleHByZXNzaW9uOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDEsIGV2YWwpKGV4cHJlc3Npb24pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cuZXhlY1NjcmlwdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIC8vIGlmIGB3aW5kb3cuZXhlY1NjcmlwdCBleGlzdHNgLCB1c2UgaXRcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXhwcmVzc2lvbjogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuZXhlY1NjcmlwdChleHByZXNzaW9uKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdGhlcndpc2UsIGdsb2JhbEV2YWwgaXMgYHVuZGVmaW5lZGAgc2luY2Ugbm90aGluZyBpcyByZXR1cm5lZFxuICAgICAgICByZXR1cm4gKGV4cHI6IHN0cmluZykgPT4ge3Rocm93IG5ldyBFcnJvcignTm8gZ2xvYmFsIGV2YWwgYXZhaWxhYmxlICEnKTt9XG4gICAgfSkoKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxufVxuIiwiaW1wb3J0IHsgUHJvZ3JlbUNvbmZpZyB9IGZyb20gXCIuL1Byb2dyZW1TZXJ2aWNlXCI7XG5pbXBvcnQgeyBFdmFsU2NvcGUgfSBmcm9tIFwiLi9FdmFsU2VydmljZVwiO1xuaW1wb3J0IHsgUHJvZ3JlbVNjaGVkdWxlciwgVmVyc2VJdGVyYXRvciwgUHJvZ3JlbUNvZGUsIFByb2dyZW1WZXJzZSwgU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyLCBMaW5lQ2hhbmdlTGlzdGVuZXIsIEZyYW1lQ2hhbmdlTGlzdGVuZXIsIFByb2dyZW1TdGF0ZSB9IGZyb20gXCIuL1R5cGVzXCI7XG5cbmNsYXNzIFNpbXBsZVByb2dyZW1TY2hlZHVsZXIgaW1wbGVtZW50cyBQcm9ncmVtU2NoZWR1bGVyIHtcbiAgICBcbiAgICBwcml2YXRlIHN0YXRlOiBQcm9ncmVtU3RhdGU7XG4gICAgcHJpdmF0ZSBjb2RlSXRlcmF0b3I6IFZlcnNlSXRlcmF0b3I8YW55PiB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBzdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lcnM6IFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGNvZGVFeGVjdXRpb25MaXN0ZW5lcnM6IENvZGVFeGVjdXRpb25MaXN0ZW5lcltdID0gW107XG4gICAgcHJpdmF0ZSBncmlkQ2hhbmdlTGlzdGVuZXJzOiBHcmlkQ2hhbmdlTGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgbGluZUNoYW5nZUxpc3RlbmVyczogTGluZUNoYW5nZUxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGZyYW1lQ2hhbmdlTGlzdGVuZXJzOiBGcmFtZUNoYW5nZUxpc3RlbmVyW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBQcm9ncmVtQ29uZmlnLCBwcml2YXRlIGNvZGU6IFByb2dyZW1Db2RlPGFueT4pIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVTdGFydEl0ZXJhdGluZ0NvZGUobGlzdGVuZXI6IFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gICAgXG5cbiAgICBzdWJzY3JpYmVDb2RlRXhlY3V0aW9uKGxpc3RlbmVyOiBDb2RlRXhlY3V0aW9uTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb2RlRXhlY3V0aW9uTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gICAgXG4gICAgXG4gICAgc3Vic2NyaWJlR3JpZENoYW5nZShsaXN0ZW5lcjogR3JpZENoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ3JpZENoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVMaW5lQ2hhbmdlKGxpc3RlbmVyOiBMaW5lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5lQ2hhbmdlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZUZyYW1lQ2hhbmdlKGxpc3RlbmVyOiBGcmFtZUNoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZnJhbWVDaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmVzZXQoKTogUHJvZ3JlbVN0YXRlIHtcbiAgICAgICAgLy8gQ2FsbCBqdXN0IGV2YWx1YXRlZCBpbml0aWFsaXNlclByb2dyZW0gZnVuY3Rpb25cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBsZXQgaW5pdGlhbENvbnRleHRlOiBvYmplY3QgPSBpbml0aWFsaXNlclByb2dyZW0odGhpcy5jb25maWcuY29sb25uZXMsIHRoaXMuY29uZmlnLmxpZ25lcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdMb2FkZWQgaW5pdGlhbCBjb250ZXh0ZTogJywgaW5pdGlhbENvbnRleHRlKTtcbiAgICAgICAgbGV0IHN0YXRlID0gbmV3IFByb2dyZW1TdGF0ZSgwLCAwLCAwLCBpbml0aWFsQ29udGV4dGUsIG51bGwpO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgY3VycmVudCgpOiBQcm9ncmVtU3RhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG5cbiAgICBuZXh0KCk6IFByb2dyZW1TdGF0ZSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZSkgdGhyb3cgbmV3IEVycm9yKCdJbmNvbnNpc3RlbnQgUHJvZ3JlbSBzdGF0ZSAhJyk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcblxuICAgICAgICBpZiAodGhpcy5jb2RlSXRlcmF0b3IgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jb2RlSXRlcmF0b3IgPSB0aGlzLmNvZGUuaXRlcmF0b3IodGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVTdGFydEl0ZXJhdGluZ0NvZGUodGhpcy5zdGF0ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZygnaGFzTmV4dDonLCB0aGlzLmNvZGVJdGVyYXRvci5oYXNOZXh0KCkpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvZGVJdGVyYXRvci5oYXNOZXh0KCkpIHtcbiAgICAgICAgICAgIGxldCBzdGF0ZW1lbnQgPSB0aGlzLmNvZGVJdGVyYXRvci5leGVjdXRlTmV4dCgpO1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0gbmV3IFByb2dyZW1TdGF0ZSh0aGlzLnN0YXRlLmNvbG9ubmUsIHRoaXMuc3RhdGUubGlnbmUsIHRoaXMuc3RhdGUuZnJhbWUsIHRoaXMuc3RhdGUuY29udGV4dGUsIHN0YXRlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgICAgICB0aGlzLmNvZGVFeGVjdXRpb25MaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlQ29kZUV4ZWN1dGlvbihuZXdTdGF0ZSkpO1xuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZygnRmluaXNoZWQgaXRlcmF0aW5nIG92ZXIgY29kZS4nKVxuXG4gICAgICAgIGxldCBub3RpZnlQaXhlbENoYW5nZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbm90aWZ5TGluZUNoYW5nZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbm90aWZ5RnJhbWVDaGFuZ2UgPSBmYWxzZTtcblxuICAgICAgICBsZXQgX2NvbG9ubmUgPSB0aGlzLnN0YXRlLmNvbG9ubmU7XG4gICAgICAgIGxldCBfbGlnbmUgPSB0aGlzLnN0YXRlLmxpZ25lO1xuICAgICAgICBsZXQgX2ZyYW1lID0gdGhpcy5zdGF0ZS5mcmFtZTtcblxuICAgICAgICBfY29sb25uZSArKztcbiAgICAgICAgbm90aWZ5UGl4ZWxDaGFuZ2UgPSB0cnVlO1xuXG4gICAgICAgIGlmIChfY29sb25uZSA+PSB0aGlzLmNvbmZpZy5jb2xvbm5lcykge1xuICAgICAgICAgICAgX2NvbG9ubmUgPSAwO1xuICAgICAgICAgICAgX2xpZ25lICsrO1xuICAgICAgICAgICAgbm90aWZ5TGluZUNoYW5nZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX2xpZ25lID4gdGhpcy5jb25maWcubGlnbmVzKSB7XG4gICAgICAgICAgICBfbGlnbmUgPSAwO1xuICAgICAgICAgICAgX2ZyYW1lICsrO1xuICAgICAgICAgICAgbm90aWZ5RnJhbWVDaGFuZ2UgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9mcmFtZSA+IHRoaXMuY29uZmlnLmZyYW1lcykge1xuICAgICAgICAgICAgX2ZyYW1lID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuZXdTdGF0ZSA9IG5ldyBQcm9ncmVtU3RhdGUoX2NvbG9ubmUsIF9saWduZSwgX2ZyYW1lLCB0aGlzLnN0YXRlLmNvbnRleHRlLCBudWxsKTtcbiBcbiAgICAgICAgaWYgKG5vdGlmeVBpeGVsQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmdyaWRDaGFuZ2VMaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlR3JpZENoYW5nZSh0aGlzLnN0YXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm90aWZ5TGluZUNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5saW5lQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUxpbmVDaGFuZ2UodGhpcy5zdGF0ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vdGlmeUZyYW1lQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUZyYW1lQ2hhbmdlKHRoaXMuc3RhdGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgLy90aGlzLmNvZGVJdGVyYXRvciA9IHRoaXMuY29kZS5pdGVyYXRvcihuZXdTdGF0ZSk7XG4gICAgICAgIHRoaXMuY29kZUl0ZXJhdG9yID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UHJvZ3JlbSgpOiBQcm9ncmVtQ29kZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29kZTtcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgU2NoZWR1bGluZ1NlcnZpY2Uge1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJvZ3JlbVNjaGVkdWxlcihjb25maWc6IFByb2dyZW1Db25maWcsIGNvZGU6IFByb2dyZW1Db2RlPGFueT4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTaW1wbGVQcm9ncmVtU2NoZWR1bGVyKGNvbmZpZywgY29kZSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgU3R5bGVEZWNvcmF0b3IgfSBmcm9tIFwiLi4vLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgQmFzZU5vZGUsIEZ1bmN0aW9uRGVjbGFyYXRpb24sIEJsb2NrU3RhdGVtZW50LCBJZlN0YXRlbWVudCwgVmFyaWFibGVEZWNsYXJhdG9yLCBWYXJpYWJsZURlY2xhcmF0aW9uLCBBc3NpZ25tZW50RXhwcmVzc2lvbiwgQmluYXJ5RXhwcmVzc2lvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgUmV0dXJuU3RhdGVtZW50LCBJZGVudGlmaWVyLCBNZW1iZXJFeHByZXNzaW9uIH0gZnJvbSBcImVzdHJlZVwiO1xuaW1wb3J0IHsgSHRtbEhlbHBlciB9IGZyb20gXCIuLi8uLi9jb3JlL0h0bWxIZWxwZXJcIjtcbmltcG9ydCB7IEVzcHJpbWFIZWxwZXIgfSBmcm9tIFwiLi4vLi4vZXNwcmltYS9Fc3ByaW1hSGVscGVyXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBFc3ByaW1hVmVyc2UsIEVzcHJpbWFIdG1sQ291cGxldEZhY3RvcnksIEVzcHJpbWFDb3VwbGV0IH0gZnJvbSBcIi4uLy4uL2VzcHJpbWEvRXNwcmltYVR5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBFc3ByaW1hUHJvZ3JlbUluc3BlY3Rvckh0bWxGYWN0b3J5IGltcGxlbWVudHMgRXNwcmltYUh0bWxDb3VwbGV0RmFjdG9yeSB7XG5cbiAgICBwcml2YXRlIGh0bWxWZXJzZXNNYXA6IE1hcDxCYXNlTm9kZSwgSFRNTEVsZW1lbnQ+ID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY291cGxldDogRXNwcmltYUNvdXBsZXQsXG4gICAgICAgIHByaXZhdGUgZGVjb3JhdG9yOiBTdHlsZURlY29yYXRvcjxCYXNlTm9kZT5cbiAgICApIHt9XG5cbiAgICBidWlsZENvdXBsZXQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgaHRtbENvdXBsZXQgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLmNvdXBsZXQuZnVuY3Rpb25Sb290Tm9kZSk7XG4gICAgICAgIGh0bWxDb3VwbGV0LmNsYXNzTGlzdC5hZGQoJ3Byb2dyZW0taW5zcGVjdG9yJyk7XG4gICAgICAgIC8vbGV0IGh0bWxWZXJzZXMgPSB0aGlzLmNvdXBsZXQudmVyc2VzLm1hcCh2ID0+IHRoaXMuYnVpbGROb2RlKHYubm9kZSkpO1xuICAgICAgICAvL2xldCBodG1sQ291cGxldCA9IEh0bWxIZWxwZXIuc3BhbignY291cGxldCcsIGh0bWxWZXJzZXMpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdodG1sVmVyc2VzTWFwOicsIHRoaXMuaHRtbFZlcnNlc01hcCk7XG4gICAgICAgIHJldHVybiBodG1sQ291cGxldDtcbiAgICB9XG5cbiAgICBnZXRIdG1sVmVyc2UodmVyc2U6IEVzcHJpbWFWZXJzZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKHRoaXMuaHRtbFZlcnNlc01hcC5zaXplID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWxTdGF0ZUVycm9yOiBjb3VwbGV0IG11c3QgYmUgYnVpbHQgYmVmb3JlIGNhbGxpbmcgZ2V0SHRtbFZlcnNlKCkgIScpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHRtbEVsZW1lbnQgPSB0aGlzLmh0bWxWZXJzZXNNYXAuZ2V0KHZlcnNlLm5vZGUpO1xuICAgICAgICBpZiAoIWh0bWxFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gSFRNTEVsZW1lbnQgZm91bmQgbWF0Y2hpbmcgdmVyc2U6JywgdmVyc2UsICchJylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gSFRNTEVsZW1lbnQgZm91bmQgbWF0Y2hpbmcgc3VwcGxpZWQgdmVyc2UgIWApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaHRtbEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGQgTm9kZSBhcHBseWluZyBkZWNvcmF0b3JzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBub2RlIHRoZSBub2RlIGZvciB3aGljaCB0byBwcm9kdWNlIEhUTUxcbiAgICAgKiBAcGFyYW0gc2libGluZ3MgdGhlIG5vZGVzIHRvIGFkZCBhcyBzaWJsaW5ncyBvZiB0aGUgbm9kZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBidWlsZE5vZGUobm9kZTogQmFzZU5vZGUgfCB1bmRlZmluZWQgfCBudWxsKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBIdG1sSGVscGVyLnNwYW4oJ2VtcHR5JywgJycpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzaWJsaW5nczogSFRNTEVsZW1lbnRbXSA9IFtdXG4gICAgICAgIGxldCBodG1sT3V0cHV0ID0gdGhpcy5idWlsZE5vZGVJbnRlcm5hbChub2RlLCBzaWJsaW5ncyk7XG4gICAgICAgIGh0bWxPdXRwdXQgPSB0aGlzLmRlY29yYXRvci5kZWNvcmF0ZShub2RlLCBodG1sT3V0cHV0KTtcblxuICAgICAgICBsZXQgbWF0Y2hpbmdWZXJzZSA9IHRoaXMuY291cGxldC52ZXJzZXMuZmluZCh2ID0+IHYubm9kZSA9PT0gbm9kZSk7XG4gICAgICAgIGlmIChtYXRjaGluZ1ZlcnNlKSB7XG4gICAgICAgICAgICBodG1sT3V0cHV0ID0gdGhpcy5lbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGh0bWxPdXRwdXQpO1xuICAgICAgICAgICAgLy8gVGhpcyBub2RlIGlzIHRoZSByb290IG5vZGUgb2YgYSBWZXJzZVxuICAgICAgICAgICAgdGhpcy5odG1sVmVyc2VzTWFwLnNldChtYXRjaGluZ1ZlcnNlLm5vZGUsIGh0bWxPdXRwdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpYmxpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIElmIHNpYmxpbmdzLCBidWlsZCBlYWNoIHNpYmxpbmdcbiAgICAgICAgICAgIGh0bWxPdXRwdXQgPSBIdG1sSGVscGVyLnNwYW4oJ3NpYmxpbmctY29udGFpbmVyJywgaHRtbE91dHB1dCk7XG4gICAgICAgICAgICB3aGlsZShzaWJsaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNpYmxpbmcgPSBzaWJsaW5ncy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIGlmIChzaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IHNpYmxpbmdPdXQgPSB0aGlzLmJ1aWxkTm9kZShzaWJsaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgaHRtbE91dHB1dC5hcHBlbmRDaGlsZChzaWJsaW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaHRtbE91dHB1dDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZW5jYXBzdWxhdGVOb2RlSW5WZXJzZUNvbnRhaW5lcihodG1sRWx0OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZlcnNlLWNvbnRlbnQnLCBodG1sRWx0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbigndmVyc2UgdmVyc2UtY29udGFpbmVyJywgY29udGVudCk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGQgbm9kZS5cbiAgICAgKiBAcGFyYW0gbm9kZSBcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYnVpbGROb2RlSW50ZXJuYWwobm9kZTogQmFzZU5vZGUsIHNpYmxpbmdzOiBIVE1MRWxlbWVudFtdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdCdWlsZGluZyBub2RlJywgbm9kZSwgJy4uLicpO1xuICAgICAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRGdW5jdGlvbkRlY2xhcmF0aW9uKG5vZGUsIHNpYmxpbmdzKTtcbiAgICAgICAgICAgIGNhc2UgJ0Jsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEJsb2NrU3RhdGVtZW50KG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnSWZTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkSWZTdGF0ZW1lbnQobm9kZSwgc2libGluZ3MpO1xuICAgICAgICAgICAgY2FzZSAnVmFyaWFibGVEZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRWYXJpYWJsZURlY2xhcmF0aW9uKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnVmFyaWFibGVEZWNsYXJhdG9yJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZFZhcmlhYmxlRGVjbGFyYXRvcihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEFzc2lnbm1lbnRFeHByZXNzaW9uKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnQmluYXJ5RXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRCaW5hcnlFeHByZXNzaW9uKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnRXhwcmVzc2lvblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRFeHByZXNzaW9uU3RhdGVtZW50KG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnUmV0dXJuU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZFJldHVyblN0YXRlbWVudChub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0lkZW50aWZpZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkSWRlbnRpZmllcihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ01lbWJlckV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkTWVtYmVyRXhwcmVzc2lvbihub2RlKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGREZWZhdWx0KG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkRnVuY3Rpb25EZWNsYXJhdGlvbihub2RlOiBCYXNlTm9kZSwgc2libGluZ3M6IEhUTUxFbGVtZW50W10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICBcbiAgICAgICAgbGV0IGRlY2xTdGFydEl0ZW1zOiAoc3RyaW5nIHwgSFRNTEVsZW1lbnQpW107XG4gICAgICAgIGlmIChuLmlkKSB7XG4gICAgICAgICAgICBsZXQgZnVuY0lkID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLWlkJywgbi5pZC5uYW1lKTtcbiAgICAgICAgICAgIGRlY2xTdGFydEl0ZW1zID0gWydmdW5jdGlvbiAnLCBmdW5jSWQsICcgKCAnXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlY2xTdGFydEl0ZW1zID0gWydmdW5jdGlvbiAoICddOy8vICsgZnVuYy5wYXJhbXMubWFwKHggPT4geC5uYW1lKS5qb2luKCcsICcpICsgJyApIHsnO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhcmFtQ291bnQgPSBuLnBhcmFtcy5sZW5ndGg7XG4gICAgICAgIG4ucGFyYW1zLmZvckVhY2goKHBhcmFtLCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEVzcHJpbWFIZWxwZXIucGF0dGVyblRvU3RyaW5nKHBhcmFtKTtcbiAgICAgICAgICAgIGxldCBmdW5jUGFyYW0gPSB0aGlzLmJ1aWxkTm9kZShwYXJhbSk7Ly9IdG1sSGVscGVyLnNwYW4oJ2Z1bmMtcGFyYW0nLCB2YXJOYW1lKTtcbiAgICAgICAgICAgIGRlY2xTdGFydEl0ZW1zLnB1c2goZnVuY1BhcmFtKTtcbiAgICAgICAgICAgIGlmIChpIDwgcGFyYW1Db3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICBkZWNsU3RhcnRJdGVtcy5wdXNoKCcsICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBkZWNsU3RhcnRJdGVtcy5wdXNoKCcgKSB7Jyk7XG5cbiAgICAgICAgbGV0IGRlY2xTdGFydCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1zdGFydCcsIGRlY2xTdGFydEl0ZW1zKTtcbiAgICAgICAgbGV0IGZ1bmNCb2R5ID0gdGhpcy5idWlsZE5vZGUobi5ib2R5KTtcbiAgICAgICAgbGV0IGRlY2xFbmQgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtZW5kJywgJ30nKTtcbiAgICAgICAgZGVjbEVuZCA9IHRoaXMuZW5jYXBzdWxhdGVOb2RlSW5WZXJzZUNvbnRhaW5lcihkZWNsRW5kKTtcbiAgICAgICAgLy9sZXQgZGVjbCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1kZWNsYXJhdGlvbicsIFtkZWNsU3RhcnQsIGZ1bmNCb2R5LCBkZWNsRW5kXSk7XG4gICAgICAgIGxldCBkZWNsID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLWRlY2xhcmF0aW9uJywgZGVjbFN0YXJ0KTtcbiAgICAgICAgc2libGluZ3MucHVzaChmdW5jQm9keSk7XG4gICAgICAgIHNpYmxpbmdzLnB1c2goZGVjbEVuZCk7XG4gICAgICAgIHJldHVybiBkZWNsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEJsb2NrU3RhdGVtZW50KG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgQmxvY2tTdGF0ZW1lbnQ7XG4gICAgICAgIGxldCBib2R5U3RhdGVtZW50cyA9IG4uYm9keS5tYXAoc3RhdGVtZW50ID0+IHRoaXMuYnVpbGROb2RlKHN0YXRlbWVudCkpXG4gICAgICAgIHJldHVybiBIdG1sSGVscGVyLnNwYW4oJ2Jsb2NrJywgYm9keVN0YXRlbWVudHMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZElmU3RhdGVtZW50KG5vZGU6IEJhc2VOb2RlLCBzaWJsaW5nczogSFRNTEVsZW1lbnRbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIElmU3RhdGVtZW50O1xuICAgICAgICBsZXQgY29udGVudDogSFRNTEVsZW1lbnRbXSA9IFtdXG4gICAgICAgIGxldCB0ZXN0ID0gdGhpcy5idWlsZE5vZGUobi50ZXN0KTtcbiAgICAgICAgbGV0IGlmU3RhcnRUZXh0ID0gWydpZiAoICcsIHRlc3QsICcgKSB7J107XG4gICAgICAgIGxldCBpZlN0YXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtc3RhdGVtZW50LXN0YXJ0JywgaWZTdGFydFRleHQpO1xuICAgICAgICBjb250ZW50LnB1c2goaWZTdGFydCk7XG5cbiAgICAgICAgbGV0IHRoZW5CbG9jayA9IHRoaXMuYnVpbGROb2RlKG4uY29uc2VxdWVudCk7XG4gICAgICAgIGxldCBpZlRoZW4gPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1ibG9jay10aGVuJywgdGhlbkJsb2NrKTtcbiAgICAgICAgY29udGVudC5wdXNoKGlmVGhlbik7XG4gICAgICAgIHNpYmxpbmdzLnB1c2godGhlbkJsb2NrKTtcblxuICAgICAgICBpZiAobi5hbHRlcm5hdGUpIHtcbiAgICAgICAgICAgIGxldCBpZkVsc2VEZWNsID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtc3RhdGVtZW50LWVsc2UnLCAnfSBlbHNlIHsnKTtcbiAgICAgICAgICAgIGlmRWxzZURlY2wgPSB0aGlzLmVuY2Fwc3VsYXRlTm9kZUluVmVyc2VDb250YWluZXIoaWZFbHNlRGVjbCk7XG4gICAgICAgICAgICBjb250ZW50LnB1c2goaWZFbHNlRGVjbCk7XG4gICAgICAgICAgICBzaWJsaW5ncy5wdXNoKGlmRWxzZURlY2wpO1xuXG4gICAgICAgICAgICBsZXQgZWxzZUJsb2NrID0gdGhpcy5idWlsZE5vZGUobi5hbHRlcm5hdGUpO1xuICAgICAgICAgICAgbGV0IGlmRWxzZSA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLWJsb2NrLWVsc2UnLCBlbHNlQmxvY2spO1xuICAgICAgICAgICAgY29udGVudC5wdXNoKGlmRWxzZSk7XG4gICAgICAgICAgICBzaWJsaW5ncy5wdXNoKGlmRWxzZSk7XG4gICAgICAgIH0gXG4gICAgICAgIGxldCBpZkVuZCA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLXN0YXRlbWVudC1lbmQnLCAnfScpO1xuICAgICAgICBpZkVuZCA9IHRoaXMuZW5jYXBzdWxhdGVOb2RlSW5WZXJzZUNvbnRhaW5lcihpZkVuZCk7XG4gICAgICAgIGNvbnRlbnQucHVzaChpZkVuZCk7XG4gICAgICAgIHNpYmxpbmdzLnB1c2goaWZFbmQpO1xuXG4gICAgICAgIC8vbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLXN0YXRlbWVudCcsIGNvbnRlbnQpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGlmU3RhcnQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkVmFyaWFibGVEZWNsYXJhdGlvbihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgIGxldCBkZWNsYXJhdGlvbnMgPSBuLmRlY2xhcmF0aW9ucy5tYXAoZCA9PiB0aGlzLmJ1aWxkTm9kZShkKSk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2RlY2xhcmF0aW9uIHZhcmlhYmxlLWRlY2xhcmF0aW9uJyk7XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBuLmtpbmQgKyAnICc7XG4gICAgICAgIGRlY2xhcmF0aW9ucy5mb3JFYWNoKGQgPT4gY29udGFpbmVyLmFwcGVuZENoaWxkKGQpKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRWYXJpYWJsZURlY2xhcmF0b3Iobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0b3I7XG4gICAgICAgIGxldCBsZWZ0UGFydCA9IHRoaXMuYnVpbGROb2RlKG4uaWQpO1xuICAgICAgICBsZXQgY29udGFpbmVyO1xuICAgICAgICBpZiAobi5pbml0KSB7XG4gICAgICAgICAgICBsZXQgYXNzaWduUGFydCA9IEh0bWxIZWxwZXIuc3Bhbignb3BlcmF0b3IgYXNzaWduLW9wZXJhdG9yJywgJz0nKTtcbiAgICAgICAgICAgIGxldCByaWdodCA9IHRoaXMuYnVpbGROb2RlKG4uaW5pdCk7XG4gICAgICAgICAgICBsZXQgcmlnaHRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS12YWx1ZScsIHJpZ2h0KTtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiB2YXJpYWJsZS1kZWNsYXJhdG9yJywgW2xlZnRQYXJ0LCBhc3NpZ25QYXJ0LCByaWdodFBhcnRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiB2YXJpYWJsZS1kZWNsYXJhdG9yJywgbGVmdFBhcnQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEFzc2lnbm1lbnRFeHByZXNzaW9uKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgQXNzaWdubWVudEV4cHJlc3Npb247XG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5idWlsZE5vZGUobi5sZWZ0KTtcbiAgICAgICAgbGV0IGxlZnRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS1pZCcsIGxlZnQpO1xuICAgICAgICBsZXQgYXNzaWduUGFydCA9IEh0bWxIZWxwZXIuc3Bhbignb3BlcmF0b3IgYXNzaWduLW9wZXJhdG9yJywgJz0nKTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5idWlsZE5vZGUobi5yaWdodCk7XG4gICAgICAgIGxldCByaWdodFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLXZhbHVlJywgcmlnaHQpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIGFzc2lnbm1lbnQtZXhwcmVzc2lvbicsIFtsZWZ0UGFydCwgYXNzaWduUGFydCwgcmlnaHRQYXJ0XSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkQmluYXJ5RXhwcmVzc2lvbihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEJpbmFyeUV4cHJlc3Npb247XG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5idWlsZE5vZGUobi5sZWZ0KTtcbiAgICAgICAgbGV0IGxlZnRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uJywgbGVmdCk7XG4gICAgICAgIGxldCBvcGVyYXRvclBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ29wZXJhdG9yIGV4cHJlc3Npb24tb3BlcmF0b3InLCBuLm9wZXJhdG9yKTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5idWlsZE5vZGUobi5yaWdodCk7XG4gICAgICAgIGxldCByaWdodFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24nLCByaWdodCk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gYmluYXJ5LWV4cHJlc3Npb24nLCBbbGVmdFBhcnQsIG9wZXJhdG9yUGFydCwgcmlnaHRQYXJ0XSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkRXhwcmVzc2lvblN0YXRlbWVudChub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEV4cHJlc3Npb25TdGF0ZW1lbnQ7XG4gICAgICAgIGxldCBjb2RlID0gdGhpcy5idWlsZE5vZGUobi5leHByZXNzaW9uKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGV4cHJlc3Npb24tc3RhdGVtZW50JywgY29kZSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkUmV0dXJuU3RhdGVtZW50KG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgUmV0dXJuU3RhdGVtZW50O1xuICAgICAgICBsZXQgYXJnID0gdGhpcy5idWlsZE5vZGUobi5hcmd1bWVudCk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCByZXR1cm4tc3RhdGVtZW50JywgWydyZXR1cm4gJywgYXJnXSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkSWRlbnRpZmllcihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIElkZW50aWZpZXI7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2lkZW50aWZpZXInLCBFc3ByaW1hSGVscGVyLnBhdHRlcm5Ub1N0cmluZyhuKSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkTWVtYmVyRXhwcmVzc2lvbihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIE1lbWJlckV4cHJlc3Npb247XG4gICAgICAgIGxldCBvYmplY3QgPSB0aGlzLmJ1aWxkTm9kZShuLm9iamVjdCk7XG4gICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMuYnVpbGROb2RlKG4ucHJvcGVydHkpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIG1lbWJlci1leHByZXNzaW9uJywgW29iamVjdCwgJy4nLCBwcm9wZXJ0eV0pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZERlZmF1bHQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkZWZhdWx0OicsIG5vZGUpO1xuICAgICAgICBsZXQgY29kZSA9IGVzY29kZUdlbmVyYXRlKG5vZGUpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdkZWZhdWx0LScgKyBub2RlLnR5cGUsIGNvZGUpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBQcm9ncmVtQ29tcG9uZW50LCBQcm9ncmVtU2NoZWR1bGVyLCBIdG1sQ291cGxldEZhY3RvcnksIFByb2dyZW1TdGF0ZSwgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyLCBHcmlkQ2hhbmdlTGlzdGVuZXIgfSBmcm9tICcuLi8uLi9jb3JlL1R5cGVzJztcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBQcm9ncmVtQ29tcG9uZW50LCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciB7XG5cbiAgICBwcml2YXRlIGV4ZWN1dGluZ0VsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgcHJpdmF0ZSBleGVjdXRlZEVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVYRUNVVElOR19DTEFTUyA9ICd2ZXJzZS1leGVjdXRpbmcnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVhFQ1VURURfQ0xBU1MgPSAndmVyc2UtZXhlY3V0ZWQnO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyLFxuICAgICAgICBwcml2YXRlIGh0bWxGYWN0b3J5OiBIdG1sQ291cGxldEZhY3Rvcnk8YW55PlxuICAgICkge1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlQ29kZUV4ZWN1dGlvbih0aGlzKTtcbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUdyaWRDaGFuZ2UodGhpcyk7XG4gICAgfVxuXG4gICAgcmVuZGVySHRtbCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBodG1sQ29tcG9uZW50ID0gdGhpcy5odG1sRmFjdG9yeS5idWlsZENvdXBsZXQoKTtcbiAgICAgICAgcmV0dXJuIGh0bWxDb21wb25lbnQ7XG4gICAgfVxuICAgIFxuICAgIGZpcmVDb2RlRXhlY3V0aW9uKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFzdGF0ZS52ZXJzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgbGV0IGh0bWxWZXJzZSA9IHRoaXMuaHRtbEZhY3RvcnkuZ2V0SHRtbFZlcnNlKHN0YXRlLnZlcnNlKTtcbiAgICAgICAgaWYoaHRtbFZlcnNlKSB7XG4gICAgICAgICAgICBodG1sVmVyc2UuY2xhc3NMaXN0LmFkZChQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRoaXMuZXhlY3V0aW5nRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGVsdCA9IHRoaXMuZXhlY3V0aW5nRWxlbWVudHMucG9wKCk7XG4gICAgICAgICAgICBpZiAoZWx0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlZEVsZW1lbnRzLnB1c2goZWx0KTtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5hZGQoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRFRF9DTEFTUyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFodG1sVmVyc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZXhlY3V0aW5nRWxlbWVudHMucHVzaChodG1sVmVyc2UpO1xuICAgICAgICBodG1sVmVyc2UuY2xhc3NMaXN0LmFkZChQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgfVxuXG4gICAgZmlyZUdyaWRDaGFuZ2Uoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICB3aGlsZSAodGhpcy5leGVjdXRpbmdFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgZWx0ID0gdGhpcy5leGVjdXRpbmdFbGVtZW50cy5wb3AoKTtcbiAgICAgICAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVEVEX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50LkVYRUNVVElOR19DTEFTUyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAodGhpcy5leGVjdXRlZEVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBlbHQgPSB0aGlzLmV4ZWN1dGVkRWxlbWVudHMucG9wKCk7XG4gICAgICAgICAgICBpZiAoZWx0KSB7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5yZW1vdmUoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRFRF9DTEFTUyk7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5yZW1vdmUoUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudC5FWEVDVVRJTkdfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBTY2hlZHVsaW5nU2VydmljZSB9IGZyb20gJy4vU2NoZWR1bGluZ1NlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Qcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50JztcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gJy4vU2NyZWVuU2VydmljZSc7XG5pbXBvcnQgeyBCYXNlTm9kZSB9IGZyb20gJ2VzdHJlZSc7XG5pbXBvcnQgeyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uLCBQcm9ncmVtU2NoZWR1bGVyIH0gZnJvbSAnLi9UeXBlcyc7XG5pbXBvcnQgeyBQYWRWZXJzZURlY29yYXRvciwgQ29sb3JWZXJzZVZhcmlhYmxlRGVjb3JhdG9yIH0gZnJvbSAnLi4vY29tcG9uZW50cy9wcm9ncmVtSW5zcGVjdG9yL0VzcHJpbWFQcm9ncmVtSW5zcGVjdG9yU3R5bGVEZWNvcmF0b3JzJztcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tICcuL0h0bWxIZWxwZXInO1xuaW1wb3J0IHsgRXNwcmltYVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeSB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUluc3BlY3Rvci9Fc3ByaW1hUHJvZ3JlbUluc3BlY3Rvckh0bWxGYWN0b3J5JztcbmltcG9ydCB7IENvZGVTZXJ2aWNlIH0gZnJvbSAnLi9Db2RlU2VydmljZSc7XG5pbXBvcnQgeyBQcm9ncmVtR3JpZENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcHJvZ3JlbUdyaWQvUHJvZ3JlbUdyaWRDb21wb25lbnQnO1xuXG5leHBvcnQgY2xhc3MgUHJvZ3JlbUNvbmZpZyB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjb2xvbm5lczogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbGlnbmVzOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBmcmFtZXM6IG51bWJlcixcbiAgICApIHt9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgUHJvZ3JlbVNlcnZpY2Uge1xuXG4gICAgdmFyIHByZXZpb3VzUmVwYWludFRpbWUgPSAwO1xuICAgIHZhciBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXI7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtKHVybDogc3RyaW5nLCBzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZzogUHJvZ3JlbUNvbmZpZykge1xuICAgICAgICBsZXQgcHJvZ3JlbVNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBwcm9ncmVtU2NyaXB0LnNyYyA9IHVybDtcbiAgICAgICAgbGV0IGJvZHlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICAgICBpZiAoYm9keUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGJvZHlFbGVtZW50LmFwcGVuZENoaWxkKHByb2dyZW1TY3JpcHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgQ29kZVNlcnZpY2UubG9hZFByb2dyZW0odXJsKS50aGVuKGNvZGUgPT4ge1xuICAgICAgICAgICAgbGV0IHByb2dyZW1Db2RlID0gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRQcm9ncmVtKGNvZGUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb2dyZW0gQVNUOicsIHByb2dyZW1Db2RlLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24pO1xuXG4gICAgICAgICAgICAvLyBMb2FkIGluaXRQcm9ncmVtIEZ1bmN0aW9uIGNvZGVcbiAgICAgICAgICAgIGxldCBpbml0UHJvZ3JlbUZ1bmN0aW9uQ29kZSA9IGVzY29kZUdlbmVyYXRlKHByb2dyZW1Db2RlLmluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCkuZnVuY3Rpb25Sb290Tm9kZSk7XG4gICAgICAgICAgICAod2luZG93IGFzIGFueSkuZXZhbChpbml0UHJvZ3JlbUZ1bmN0aW9uQ29kZSk7XG5cbiAgICAgICAgICAgIHNjaGVkdWxlciA9IFNjaGVkdWxpbmdTZXJ2aWNlLmJ1aWxkUHJvZ3JlbVNjaGVkdWxlcihwcm9ncmVtQ29uZmlnLCBwcm9ncmVtQ29kZSk7XG5cbiAgICAgICAgICAgIC8vbGV0IHByb2dyZW1JbnNwZWN0b3IgPSBuZXcgQmFzaWNIdG1sRXNwcmltYVByb2dyZW1JbnNwZWN0b3IocHJvZ3JlbUNvZGUsIHNjaGVkdWxlciwgZG9jdW1lbnQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3RvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCcucHJvZ3JlbS1pbnNwZWN0b3ItY29tcG9uZW50Jyk7XG4gICAgICAgICAgICBpZiAocHJvZ3JlbUluc3BlY3RvckNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9yRGVjb3JhdG9ycyA9IG5ldyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uPEJhc2VOb2RlPihbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBQYWRWZXJzZURlY29yYXRvcigpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgQ29sb3JWZXJzZVZhcmlhYmxlRGVjb3JhdG9yKCksXG4gICAgICAgICAgICAgICAgICAgIC8vbmV3IEhpZ2hsaWdodEV4ZWN1dGluZ1ZlcnNlRGVjb3JhdG9yKHNjaGVkdWxlciksXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JGYWN0b3J5ID0gbmV3IEVzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkocHJvZ3JlbUNvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbigpLCBwcm9ncmVtSW5zcGVjdG9yRGVjb3JhdG9ycyk7XG4gICAgICAgICAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JWaWV3ID0gbmV3IFByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQoc2NoZWR1bGVyLCBwcm9ncmVtSW5zcGVjdG9yRmFjdG9yeSk7XG4gICAgXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnY29kZUVsZW1lbnQnLCBjb2RlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JIdG1sID0gcHJvZ3JlbUluc3BlY3RvclZpZXcucmVuZGVySHRtbCgpO1xuICAgICAgICAgICAgICAgIHByb2dyZW1JbnNwZWN0b3JDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvZ3JlbUluc3BlY3Rvckh0bWwpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGRlY29yYXRvclN0eWxlID0gcHJvZ3JlbUluc3BlY3RvckRlY29yYXRvcnMuYnVpbGRTdHlsZVNoZWV0KCk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnZGVjb3JhdG9yU3R5bGU6JywgZGVjb3JhdG9yU3R5bGUpXG4gICAgICAgICAgICAgICAgSHRtbEhlbHBlci5kZWZpbmVDc3NSdWxlcygncHJvZ3JlbS1pbnNwZWN0b3ItY29tcG9uZW50JywgZGVjb3JhdG9yU3R5bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgIGxldCBwcm9ncmVtR3JpZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCcucHJvZ3JlbS1ncmlkLWNvbXBvbmVudCcpO1xuICAgICAgICAgICBpZiAocHJvZ3JlbUdyaWRDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJvZ3JlbUdyaWRDb21wb25lbnQgPSBuZXcgUHJvZ3JlbUdyaWRDb21wb25lbnQoc2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnLCBzY2hlZHVsZXIsIGRvY3VtZW50KTtcbiAgICAgICAgICAgICAgICBsZXQgcHJvZ3JlbUdyaWRIdG1sID0gcHJvZ3JlbUdyaWRDb21wb25lbnQucmVuZGVySHRtbCgpO1xuICAgICAgICAgICAgICAgIHByb2dyZW1HcmlkQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2dyZW1HcmlkSHRtbCk7XG4gICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGltZXIoMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRpbWVyKHRpbWVzdGFtcDogbnVtYmVyKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGltZXIpO1xuXG4gICAgICAgIGlmICh0aW1lc3RhbXAgLSBwcmV2aW91c1JlcGFpbnRUaW1lIDwgNTAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2aW91c1JlcGFpbnRUaW1lID0gdGltZXN0YW1wO1xuXG4gICAgICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgICAgICAgIHNjaGVkdWxlci5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBFdmFsU2NvcGUgfSBmcm9tIFwiLi9FdmFsU2VydmljZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT4ge1xuICAgIG5vZGU6IEFzdEJhc2VUeXBlXG4gICAgY29kZTogQXN0QmFzZVR5cGVcbn1cbi8qXG5leHBvcnQgaW50ZXJmYWNlIFZlcnNlSW5zdHJ1Y3Rpb25GYWN0b3J5PEFzdEJhc2VUeXBlPiB7XG4gICAgYnVpbGQocGFyYW06IEFzdEJhc2VUeXBlKTogUHJvZ3JlbVZlcnNlPEFzdEJhc2VUeXBlPjtcbn1cbiovXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPiB7XG4gICAgZnVuY3Rpb25Sb290Tm9kZTogQXN0QmFzZVR5cGVcbiAgICB2ZXJzZXM6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT5bXVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1GYWN0b3J5PEFzdEJhc2VUeXBlPiB7XG4gICAgYnVpbGRQcm9ncmVtKGNvZGU6IHN0cmluZyk6IFByb2dyZW1Db2RlPEFzdEJhc2VUeXBlPlxuICAgIGJ1aWxkQ291cGxldChub2RlOiBBc3RCYXNlVHlwZSwgdmVyc2VzOiBBc3RCYXNlVHlwZVtdKTogUHJvZ3JlbUNvdXBsZXQ8QXN0QmFzZVR5cGU+XG4gICAgYnVpbGRWZXJzZShub2RlOiBBc3RCYXNlVHlwZSk6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBWZXJzZUl0ZXJhdG9yPEFzdEJhc2VUeXBlPiB7XG4gICAgZXhlY3V0ZU5leHQoKTogUHJvZ3JlbVZlcnNlPEFzdEJhc2VUeXBlPlxuICAgIGhhc05leHQoKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtQ29kZTxBc3RCYXNlVHlwZT4ge1xuICAgIGluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCk6IFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPlxuICAgIGNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKTogUHJvZ3JlbUNvdXBsZXQ8QXN0QmFzZVR5cGU+XG4gICAgaXRlcmF0b3Ioc3RhdGU6IFByb2dyZW1TdGF0ZSk6IFZlcnNlSXRlcmF0b3I8QXN0QmFzZVR5cGU+XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVtU3RhdGUge1xuXG4gICAgcHVibGljIHJlYWRvbmx5IGV2YWxTY29wZSA9IG5ldyBFdmFsU2NvcGU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvbG9ubmU6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGxpZ25lOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBmcmFtZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgY29udGV4dGU6IG9iamVjdCxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHZlcnNlOiBQcm9ncmVtVmVyc2U8YW55PiB8IG51bGwsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGV2YWwoZXhwcjogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZhbFNjb3BlLmdsb2JhbEV2YWwoZXhwcik7XG4gICAgfVxufVxuXG50eXBlIE5ld1N0YXRlQ2FsbGJhY2sgPSAoc3RhdGU6IFByb2dyZW1TdGF0ZSkgPT4gdm9pZDtcbmV4cG9ydCBpbnRlcmZhY2UgU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIge2ZpcmVTdGFydEl0ZXJhdGluZ0NvZGU6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBDb2RlRXhlY3V0aW9uTGlzdGVuZXIge2ZpcmVDb2RlRXhlY3V0aW9uOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgR3JpZENoYW5nZUxpc3RlbmVyIHtmaXJlR3JpZENoYW5nZTogTmV3U3RhdGVDYWxsYmFja307XG5leHBvcnQgaW50ZXJmYWNlIExpbmVDaGFuZ2VMaXN0ZW5lciB7ZmlyZUxpbmVDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBGcmFtZUNoYW5nZUxpc3RlbmVyIHtmaXJlRnJhbWVDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1TY2hlZHVsZXIge1xuICAgIHN1YnNjcmliZVN0YXJ0SXRlcmF0aW5nQ29kZShsaXN0ZW5lcjogU3RhcnRJdGVyYXRpbmdDb2RlTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlQ29kZUV4ZWN1dGlvbihsaXN0ZW5lcjogQ29kZUV4ZWN1dGlvbkxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUdyaWRDaGFuZ2UobGlzdGVuZXI6IEdyaWRDaGFuZ2VMaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVMaW5lQ2hhbmdlKGxpc3RlbmVyOiBMaW5lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlRnJhbWVDaGFuZ2UobGlzdGVuZXI6IEZyYW1lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG4gICAgcmVzZXQoKTogUHJvZ3JlbVN0YXRlXG4gICAgY3VycmVudCgpOiBQcm9ncmVtU3RhdGVcbiAgICBuZXh0KCk6IFByb2dyZW1TdGF0ZVxuICAgIGdldFByb2dyZW0oKTogUHJvZ3JlbUNvZGU8YW55PlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1Db21wb25lbnQge1xuICAgIHJlbmRlckh0bWwoKTogSFRNTEVsZW1lbnRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdHlsZURlY29yYXRvcjxUPiB7XG4gICAgZGVjb3JhdGUobm9kZTogVCwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIdG1sQ291cGxldEZhY3Rvcnk8QXN0QmFzZVR5cGU+IHtcbiAgICBidWlsZENvdXBsZXQoKTogSFRNTEVsZW1lbnRcbiAgICBnZXRIdG1sVmVyc2UodmVyc2U6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT4pOiBIVE1MRWxlbWVudFxufVxuXG5leHBvcnQgY2xhc3MgU3R5bGVEZWNvcmF0b3JBZ2dyZWdhdGlvbjxUPiBpbXBsZW1lbnRzIFN0eWxlRGVjb3JhdG9yPFQ+IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjb3JhdG9yczogU3R5bGVEZWNvcmF0b3I8VD5bXSkge31cblxuICAgIGRlY29yYXRlKG5vZGU6IFQsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgdGVtcDogSFRNTEVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmRlY29yYXRvcnMuZm9yRWFjaChkID0+IHRlbXAgPSBkLmRlY29yYXRlKG5vZGUsIHRlbXApKTtcbiAgICAgICAgcmV0dXJuIHRlbXA7XG4gICAgfVxuXG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29yYXRvcnMubWFwKGQgPT4gZC5idWlsZFN0eWxlU2hlZXQoKSkuam9pbignXFxuJyk7XG4gICAgfVxuXG59XG5cblxuIiwiaW1wb3J0IHsgUHJvZ3JlbUZhY3RvcnkgfSBmcm9tIFwiLi9UeXBlc1wiO1xuaW1wb3J0IHsgQmFzaWNFc3ByaW1hUHJvZ3JlbUZhY3RvcnkgfSBmcm9tIFwiLi4vZXNwcmltYS9CYXNpY0VzcHJpbWFQcm9ncmVtXCI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29kZVNlcnZpY2Uge1xuXG4gICAgZXhwb3J0IGNvbnN0IHByb2dyZW1GYWN0b3J5OiBQcm9ncmVtRmFjdG9yeTxhbnk+ID0gbmV3IEJhc2ljRXNwcmltYVByb2dyZW1GYWN0b3J5KCk7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gbG9hZFByb2dyZW0oZmlsZVVybDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsaWVudCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgY2xpZW50Lm9wZW4oJ0dFVCcsIGZpbGVVcmwpO1xuICAgICAgICAgICAgY2xpZW50Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29kZSA9IGNsaWVudC5yZXNwb25zZVRleHQ7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29kZVNlcnZpY2U6IFByb2dyZW0gbG9hZGVkIHN1Y2Nlc3NmdWxseS4nLCBjb2RlKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGNvZGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNsaWVudC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KGNsaWVudC5zdGF0dXNUZXh0KTtcbiAgICAgICAgICAgIGNsaWVudC5zZW5kKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSIsIlxuZXhwb3J0IGNsYXNzIFNjcmVlbkNvbmZpZyB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBib3hTaXplOiBudW1iZXJcbiAgICApIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBTY3JlZW5TZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBnZXRTY3JlZW5GcmFtZSgpOiBhbnkge1xuXG4gICAgfVxuXG59IiwiaW1wb3J0IHsgUGF0dGVybiwgSWRlbnRpZmllciwgQmFzZU5vZGUsIFZhcmlhYmxlRGVjbGFyYXRpb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBOb2RlIH0gZnJvbSBcImVzdHJlZVwiO1xuXG5leHBvcnQgdHlwZSBOb2RlV2l0aFBhcmVudCA9IE5vZGUgJiB7IHBhcmVudD86IE5vZGUgfTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEVzcHJpbWFIZWxwZXIge1xuXG4gICAgcHVibGljIHN0YXRpYyBwYXR0ZXJuVG9TdHJpbmcocGF0dGVybjogUGF0dGVybik6IHN0cmluZyB7XG4gICAgICAgIHZhciBub2RlO1xuICAgICAgICBzd2l0Y2ggKHBhdHRlcm4udHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnSWRlbnRpZmllcic6XG4gICAgICAgICAgICAgICAgbm9kZSA9IHBhdHRlcm4gYXMgSWRlbnRpZmllcjtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5uYW1lO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gY29udmVydCBwYXR0ZXJuIG9mIHR5cGUgJyArIHBhdHRlcm4udHlwZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZWR1Y2VOb2RlVG9WYXJEZWNsYXJhdGlvbihub2RlOiBCYXNlTm9kZSk6IFZhcmlhYmxlRGVjbGFyYXRpb24gfCBBc3NpZ25tZW50RXhwcmVzc2lvbiB8IEZ1bmN0aW9uRGVjbGFyYXRpb24gfCB2b2lkIHtcbiAgICAgICAgXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgbGV0IGRlY2wgPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gZGVjbDtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgIGxldCBleHByID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgICAgIHJldHVybiBleHByO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBmdW5jO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHAgPT09ICdsZWZ0JyB8fCBwID09PSAncmlnaHQnIHx8IHAgPT09ICdhcmd1bWVudCcgfHwgcCA9PT0gJ2NhbGxlZScgfHwgcCA9PT0gJ2JvZHknIHx8IHAgPT09ICdleHByZXNzaW9uJykge1xuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkOiBCYXNlTm9kZSA9IG5vZGVbcF0gYXMgQmFzZU5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBFc3ByaW1hSGVscGVyLnJlZHVjZU5vZGVUb1ZhckRlY2xhcmF0aW9uKGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzQ2hpbGROb2RlT2Yobm9kZTogTm9kZVdpdGhQYXJlbnQsIHBhcmVudDogQmFzZU5vZGUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKG5vZGUucGFyZW50ID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCFub2RlLnBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEVzcHJpbWFIZWxwZXIuaXNDaGlsZE5vZGVPZihub2RlLnBhcmVudCBhcyBOb2RlV2l0aFBhcmVudCwgcGFyZW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzTm90Q2hpbGROb2RlT2Yobm9kZTogTm9kZVdpdGhQYXJlbnQsIHBhcmVudHM6IEJhc2VOb2RlW10pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHBhcmVudHMuZmluZChwID0+IHAgPT09IG5vZGUucGFyZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKCFub2RlLnBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gRXNwcmltYUhlbHBlci5pc05vdENoaWxkTm9kZU9mKG5vZGUucGFyZW50IGFzIE5vZGVXaXRoUGFyZW50LCBwYXJlbnRzKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBQcm9ncmVtQ29tcG9uZW50LCBQcm9ncmVtU2NoZWR1bGVyLCBTdGFydEl0ZXJhdGluZ0NvZGVMaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyLCBQcm9ncmVtU3RhdGUgfSBmcm9tIFwiLi4vLi4vY29yZS9UeXBlc1wiO1xuaW1wb3J0IHsgU2NyZWVuQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvcmUvU2NyZWVuU2VydmljZVwiO1xuaW1wb3J0IHsgUHJvZ3JlbUNvbmZpZyB9IGZyb20gXCIuLi8uLi9jb3JlL1Byb2dyZW1TZXJ2aWNlXCI7XG5pbXBvcnQgeyBIdG1sSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvSHRtbEhlbHBlclwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBTY2hlZHVsZXIgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IHNjaGVkdWxlZCwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIsIHRpbWVyIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IHRha2VVbnRpbCwgcmVwZWF0LCBjb3VudCwgdGFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVtR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIFByb2dyZW1Db21wb25lbnQsIFN0YXJ0SXRlcmF0aW5nQ29kZUxpc3RlbmVyLCBHcmlkQ2hhbmdlTGlzdGVuZXIge1xuICAgIFxuICAgIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIGJsaW5rSW50ZXJ2YWwgPSAyMDA7XG4gICAgXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2NyZWVuQ29uZmlnOiBTY3JlZW5Db25maWcsIFxuICAgICAgICBwcml2YXRlIHByb2dyZW1Db25maWc6IFByb2dyZW1Db25maWcsXG4gICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyLFxuICAgICAgICBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudFxuICAgICAgICApIHtcbiAgICAgICAgbGV0IGVuV2FybmluZyA9IEh0bWxIZWxwZXIucCgnd2FybmluZycsIFwiWW91ciBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBjYW52YXMuXCIpO1xuICAgICAgICBsZXQgZnJXYXJuaW5nID0gSHRtbEhlbHBlci5wKCd3YXJuaW5nJywgXCJWb3RyZSBuYXZpZ2F0ZXVyIG5lIHN1cHBvcnRlIHBhcyBsZXMgY2FudmFzLlwiKTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBIdG1sSGVscGVyLmNhbnZhcygnJywgW2VuV2FybmluZywgZnJXYXJuaW5nXSk7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5wcm9ncmVtQ29uZmlnLmNvbG9ubmVzICogdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5wcm9ncmVtQ29uZmlnLmNvbG9ubmVzICogdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcblxuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgaWYgKCFjdHgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIG9idGFpbiAyRCBDYW52YXMgY29udGV4dCAhJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcblxuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlU3RhcnRJdGVyYXRpbmdDb2RlKHRoaXMpO1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlR3JpZENoYW5nZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZW5kZXJIdG1sKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbigncHJvZ3JlbS1ncmlkJywgdGhpcy5jYW52YXMpO1xuXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNvbG9yQ3VycmVudFBpeGVsKHN0YXRlOiBQcm9ncmVtU3RhdGUsIGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgbGV0IGJveFNpemUgPSB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplO1xuICAgICAgICBsZXQgYyA9IHN0YXRlLmNvbG9ubmU7XG4gICAgICAgIGxldCBsID0gc3RhdGUubGlnbmU7XG5cbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KGMgKiBib3hTaXplLCBsICogYm94U2l6ZSwgYm94U2l6ZSwgYm94U2l6ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJsaW5rQ3VycmVudFBpeGVsKHN0YXRlOiBQcm9ncmVtU3RhdGUsIGluY3JlbW50OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGNvbG9yID0gJ2JsYWNrJztcbiAgICAgICAgaWYgKGluY3JlbW50ICUgMiA9PT0gMCkge1xuICAgICAgICAgICAgY29sb3IgPSAnd2hpdGUnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29sb3JDdXJyZW50UGl4ZWwoc3RhdGUsIGNvbG9yKTtcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIGZpcmVTdGFydEl0ZXJhdGluZ0NvZGUgKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gT2JzZXJ2YWJsZS5pbnRlcnZhbCh0aGlzLmJsaW5rSW50ZXJ2YWwsIGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyKS5zdWJzY3JpYmUodCA9PiB7XG4gICAgICAgICAgICB0aGlzLmJsaW5rQ3VycmVudFBpeGVsKHN0YXRlLCB0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZmlyZUdyaWRDaGFuZ2UgKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJveFNpemUgPSB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplO1xuICAgICAgICBsZXQgYyA9IHN0YXRlLmNvbG9ubmU7XG4gICAgICAgIGxldCBsID0gc3RhdGUubGlnbmU7XG5cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBsZXQgY291bGV1ciA9IGNvbG9yZXJQcm9ncmVtKGMsIGwsIHN0YXRlLmNvbnRleHRlKTtcbiAgICAgICAgaWYgKGNvdWxldXIpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvdWxldXI7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdChjICogYm94U2l6ZSwgbCAqIGJveFNpemUsIGJveFNpemUsIGJveFNpemUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICBsZXQgd2lkdGggPSB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplICogdGhpcy5wcm9ncmVtQ29uZmlnLmNvbG9ubmVzO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZSAqIHRoaXMucHJvZ3JlbUNvbmZpZy5saWduZXM7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbn0iXSwic291cmNlUm9vdCI6IiJ9