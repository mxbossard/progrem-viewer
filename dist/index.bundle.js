(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index"],{

/***/ "+mJ7":
/*!******************************!*\
  !*** ./src/EsprimaHelper.ts ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class EsprimaHelper {
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

/***/ "/7QA":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ProgremService_1 = __webpack_require__(/*! ./ProgremService */ "acSo");
const ScreenService_1 = __webpack_require__(/*! ./ScreenService */ "gMHh");
let screenConfig = new ScreenService_1.ScreenConfig(20);
let progremConfig = new ProgremService_1.ProgremConfig(17, 17, 1);
ProgremService_1.ProgremService.buildProgrem('./progrems/coeur_progrem.js', screenConfig, progremConfig);


/***/ }),

/***/ "3l8x":
/*!****************************!*\
  !*** ./src/ProgremGrid.ts ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class BasicCanvasProgremGrid {
    constructor(screenConfig, progremConfig) {
        this.screenConfig = screenConfig;
        this.progremConfig = progremConfig;
        this.attachedElement = null;
        let elt = document.querySelector('.progrem');
        if (!elt) {
            throw new Error('Unable to find .progrem Canvas element !');
        }
        this.canvas = elt;
        let ctx = this.canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Unable to get 2D Canvas context !');
        }
        this.ctx = ctx;
    }
    attachToCanvas(canvas) {
        this.canvas = canvas;
        canvas.width = this.progremConfig.colonnes * this.screenConfig.boxSize;
        canvas.height = this.progremConfig.colonnes * this.screenConfig.boxSize;
        let ctx = this.canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Unable to get 2D Canvas context !');
        }
        this.ctx = ctx;
    }
    clear() {
        let width = this.screenConfig.boxSize * this.progremConfig.colonnes;
        let height = this.screenConfig.boxSize * this.progremConfig.lignes;
        this.ctx.clearRect(0, 0, width, height);
    }
    attach(element) {
        this.attachedElement = element;
        if (element) {
            if (element.nodeName === 'CANVAS') {
                this.attachToCanvas(element);
                return;
            }
            else {
                element.childNodes.forEach(c => {
                    if (c.nodeName === 'CANVAS') {
                        this.attachToCanvas(element);
                        return;
                    }
                });
            }
            // No Canvas found so we create one
            let canvas = document.createElement("canvas");
            this.attachToCanvas(canvas);
            element.appendChild(canvas);
        }
    }
    fireGridChange(state) {
        console.log('grid change: ', state);
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
}
exports.BasicCanvasProgremGrid = BasicCanvasProgremGrid;


/***/ }),

/***/ "55B8":
/*!****************************!*\
  !*** ./src/EvalService.ts ***!
  \****************************/
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

/***/ "8yvk":
/*!**************************!*\
  !*** ./src/AstHelper.ts ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AstHelper;
(function (AstHelper) {
    function patternToString(pattern) {
        var node;
        switch (pattern.type) {
            case 'Identifier':
                node = pattern;
                return node.name;
        }
        throw new Error('Unable to convert pattern of type ' + pattern.type);
    }
    AstHelper.patternToString = patternToString;
    function reduceNodeToVarDeclaration(node) {
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
                    let result = reduceNodeToVarDeclaration(child);
                    if (result)
                        return result;
                }
            }
        }
    }
    AstHelper.reduceNodeToVarDeclaration = reduceNodeToVarDeclaration;
})(AstHelper = exports.AstHelper || (exports.AstHelper = {}));


/***/ }),

/***/ "EzQx":
/*!**************************************************!*\
  !*** ./src/EstreeProgremInspectorHtmlFactory.ts ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HtmlHelper_1 = __webpack_require__(/*! ./HtmlHelper */ "l2U1");
const AstHelper_1 = __webpack_require__(/*! ./AstHelper */ "8yvk");
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
            let varName = AstHelper_1.AstHelper.patternToString(param);
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
        let container = HtmlHelper_1.HtmlHelper.span('identifier', AstHelper_1.AstHelper.patternToString(n));
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

/***/ "SMdn":
/*!**********************!*\
  !*** ./src/Types.ts ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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

/***/ "acSo":
/*!*******************************!*\
  !*** ./src/ProgremService.ts ***!
  \*******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const escodegen_1 = __webpack_require__(/*! escodegen */ "aMAw");
const CodeService_1 = __webpack_require__(/*! ./CodeService */ "xuGg");
const SchedulingService_1 = __webpack_require__(/*! ./SchedulingService */ "sDTU");
const ProgremInspector_1 = __webpack_require__(/*! ./ProgremInspector */ "tFKc");
const ProgremGrid_1 = __webpack_require__(/*! ./ProgremGrid */ "3l8x");
const Types_1 = __webpack_require__(/*! ./Types */ "SMdn");
const EstreeStyleDecorator_1 = __webpack_require__(/*! ./EstreeStyleDecorator */ "vMkM");
const HtmlHelper_1 = __webpack_require__(/*! ./HtmlHelper */ "l2U1");
const EstreeProgremInspectorHtmlFactory_1 = __webpack_require__(/*! ./EstreeProgremInspectorHtmlFactory */ "EzQx");
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
            let progremInspectorDecorators = new Types_1.StyleDecoratorAggregation([
                new EstreeStyleDecorator_1.PadVerseDecorator(),
                new EstreeStyleDecorator_1.ColorVerseVariableDecorator(),
            ]);
            let progremInspectorFactory = new EstreeProgremInspectorHtmlFactory_1.EsprimaProgremInspectorHtmlFactory(progremCode.colorerProgremFunction(), progremInspectorDecorators);
            let progremInspectorView = new ProgremInspector_1.ProgremInspectorView(scheduler, progremInspectorFactory);
            let codeElement = document.querySelector('.code');
            if (codeElement) {
                //console.log('codeElement', codeElement);
                let progremInspectorComponent = progremInspectorView.buildView(scheduler);
                codeElement.appendChild(progremInspectorComponent);
                let decoratorStyle = progremInspectorDecorators.buildStyleSheet();
                //console.log('decoratorStyle:', decoratorStyle)
                HtmlHelper_1.HtmlHelper.defineCssRules('progrem-inspector', decoratorStyle);
            }
            let gridElement = document.querySelector('.progrem');
            console.log('gridElement', gridElement);
            let progremGrid = new ProgremGrid_1.BasicCanvasProgremGrid(screenConfig, progremConfig);
            progremGrid.attach(gridElement);
            progremGrid.clear();
            scheduler.subscribeGridChange(progremGrid);
            timer(0);
        });
    }
    ProgremService.buildProgrem = buildProgrem;
    function timer(timestamp) {
        window.requestAnimationFrame(timer);
        if (timestamp - previousRepaintTime < 1500) {
            return;
        }
        previousRepaintTime = timestamp;
        if (scheduler) {
            scheduler.next();
        }
    }
})(ProgremService = exports.ProgremService || (exports.ProgremService = {}));


/***/ }),

/***/ "gMHh":
/*!******************************!*\
  !*** ./src/ScreenService.ts ***!
  \******************************/
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

/***/ "l2U1":
/*!***************************!*\
  !*** ./src/HtmlHelper.ts ***!
  \***************************/
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
        let elt = document.createElement("span");
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

/***/ "sDTU":
/*!**********************************!*\
  !*** ./src/SchedulingService.ts ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EvalService_1 = __webpack_require__(/*! ./EvalService */ "55B8");
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
/*
export interface ProgremScheduler {
    subscribeCodeExecution(listener: CodeExecutionListener): void
    subscribeGridChange(listener: GridChangeListener): void
    subscribeLineChange(listener: LineChangeListener): void
    subscribeFrameChange(listener: FrameChangeListener): void

    reset(): ProgremState
    current(): ProgremState
    next(): ProgremState
}
*/
class SimpleProgremScheduler {
    constructor(config, code) {
        this.config = config;
        this.code = code;
        this.codeIterator = null;
        this.codeExecutionListeners = [];
        this.gridChangeListeners = [];
        this.lineChangeListeners = [];
        this.frameChangeListeners = [];
        this.state = this.reset();
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
        let state = new ProgremState(0, 0, 0, initialContexte, null);
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
        }
        //console.log('hasNext:', this.codeIterator.hasNext());
        if (this.codeIterator.hasNext()) {
            let statement = this.codeIterator.executeNext();
            let newState = new ProgremState(this.state.colonne, this.state.ligne, this.state.frame, this.state.contexte, statement);
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
        let newState = new ProgremState(_colonne, _ligne, _frame, this.state.contexte, null);
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
        this.codeIterator = this.code.iterator(newState);
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

/***/ "tFKc":
/*!*********************************!*\
  !*** ./src/ProgremInspector.ts ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
export class BasicHtmlEsprimaProgremInspector implements ProgremInspector, CodeExecutionListener, GridChangeListener {
    
    private progremCodeLines: HTMLElement[] = [];
    private attachedElement: HTMLElement | null = null;
    private mapping: Map<BaseNode, HTMLElement> = new Map();
    private hintStackContainer: HTMLElement | null = null;

    private treeStore1: EsToHtmlTreeStore;

    constructor(
        private progremCode: EsprimaProgremCode,
        private scheduler: ProgremScheduler,
        private _document: Document
    ) {
        scheduler.subscribeCodeExecution(this);
        scheduler.subscribeGridChange(this);
        //this.buildHtmlTree2();
        this.treeStore1 = this.buildHtmlTree3();
    }

    attach0(element: HTMLElement | null): void {
        this.attachedElement = element;

        if (element) {
            let codeContainer = document.createElement('div');
            codeContainer.classList.add('codeContainer');
            this.hintStackContainer = document.createElement('div');
            this.hintStackContainer.classList.add('hintContainer');
            element.appendChild(codeContainer);
            element.appendChild(this.hintStackContainer);

            this.progremCodeLines.map(elt => { codeContainer.appendChild(elt) });
        }
    }

    attach(element: HTMLElement): void {
        this.attachedElement = element;

        if (element) {
            this.treeStore1.paintInto(element);
        }
    }

    clear0(): void {
        this.colorMap = new Map();
        if (this.hintStackContainer)
            this.hintStackContainer.innerHTML = "";
        this.mapping.forEach((elt, node) => elt.classList.remove('highlight'));
    }

    clear(): void {
        this.colorMap = new Map();
        this.treeStore1.resetStyle();
        if (this.hintStackContainer) {
            this.hintStackContainer.innerHTML = "";
        }
    }

    private colorMap: Map<string, number> = new Map();

    private hslColor(hue: number): string {
        return 'hsl(' + hue + ', 100%, 80%)';
    }

    private hashStringToColor(key: string) {
        let shift = 2;
        let colorCount = 12;

        var hue = this.colorMap.get(key);
        if (hue) return this.hslColor(hue);

        var hash = md5Create().update(key).toString();
        
        hue = ( parseInt(hash.substring(shift + 0, shift + 1), 16) + 16 * parseInt(hash.substring(shift + 1, shift + 2), 16) + 256 * parseInt(hash.substring(shift + 2, shift + 3), 16) );
        hue = Math.floor(hue % colorCount) * 360 / colorCount;

        while (!this.colorMap.get(key)) {
            let duplicateColor = false;
            for (let c of this.colorMap.values()) {
                if (c === hue) {
                    duplicateColor = true;
                    hue += Math.floor(360 / colorCount);
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

    public fireCodeExecution(state: ProgremState) {
        if (state.verse === null) {
            throw new Error('Received a null statement !');
        }

        //this.mapping.forEach((elt, node) => elt.classList.remove('highlight'));
        this.treeStore1.removeStyleClasses(['highlight']);

        let executedNode = state.verse.astRootNode;
        //let htmlNode = this.mapping.get(executedNode);
        //if (!htmlNode) {
        //    throw new Error('Unable to found a HTML element mapped for received statement !')
        //}
        //htmlNode.classList.add('highlight');
        this.treeStore1.addStyleClasses(executedNode, ['highlight']);

        if (this.hintStackContainer) {
            let node = AstHelper.reduceNodeToVarDeclaration(executedNode);
            if (node) {
                if (node.type === 'VariableDeclaration') {
                    let decl = node as VariableDeclaration;
                    
                    decl.declarations.map(d => {
                        //@ts-ignore
                        let hint = this.appendHint(this.hintStackContainer, []);
                        let varName = AstHelper.patternToString(d.id);
                        let varValue = undefined;
                        if (d.init) {
                            varValue = state.evalScope.globalEval(escodeGenerate(d.init));
                        }
                        hint.innerHTML = varName + ' = ' + varValue;
                        hint.style.backgroundColor = this.hashStringToColor(varName);

                        //let pElt = this.mapping.get(d);
                        //if (pElt) pElt.style.backgroundColor = this.hashStringToColor(varName);
                        this.treeStore1.setStyleProperty(d, 'backgroundColor', this.hashStringToColor(varName));
                    });
                } else if (node.type === 'AssignmentExpression') {
                    let decl = node as AssignmentExpression;

                    //@ts-ignore
                    let hint = this.appendHint(this.hintStackContainer, []);
                    let varName = AstHelper.patternToString(decl.left);
                    hint.innerHTML = varName + ' = ' + state.evalScope.globalEval(varName);
                    hint.style.backgroundColor = this.hashStringToColor(varName);

                    //let pElt = this.mapping.get(decl);
                    //if (pElt) pElt.style.backgroundColor = this.hashStringToColor(varName);
                    this.treeStore1.setStyleProperty(decl, 'backgroundColor', this.hashStringToColor(varName));
                } else if (node.type === 'FunctionDeclaration') {
                    let func = node as FunctionDeclaration;

                    func.params.forEach(p => {
                        let varName = AstHelper.patternToString(p);
                        let varValue = state.evalScope.globalEval(varName);
                        //@ts-ignore
                        let hint = this.appendHint(this.hintStackContainer, []);
                        hint.innerHTML = varName + ' = ' + varValue;
                        hint.style.backgroundColor = this.hashStringToColor(varName);

                        //let pElt = this.mapping.get(p);
                        //if (pElt) pElt.style.backgroundColor = this.hashStringToColor(varName);
                        this.treeStore1.setStyleProperty(p, 'backgroundColor', this.hashStringToColor(varName));
                    });
                }
            }
        }

    }

    public fireGridChange(state: ProgremState) {
        this.clear();
    }

    private appendCodeLine(parent: HTMLElement, padding: number): HTMLElement {
        let elt = document.createElement("pre");
        elt.classList.add('padding-' + padding);
        parent.appendChild(elt);

        return elt;
    }

    private appendSpan(parent: HTMLElement, htmlClass: string[], text = ""): HTMLElement {
        let elt = document.createElement("span");
        htmlClass.forEach(c => elt.classList.add(c));
        parent.appendChild(elt);
        elt.innerText = text;
        return elt;
    }

    private appendHint(parent: HTMLElement, htmlClass: string[]): HTMLElement {
        let pre = document.createElement("pre");
        let span = document.createElement("span");
        htmlClass.forEach(c => pre.classList.add(c));
        parent.appendChild(pre);
        pre.appendChild(span);
        return span;
    }

    // Build HTML Inspector by crawling recursively AST stacks
    private unstackAst(parentElement: HTMLElement, stack: BaseNode[], padding: number): void {
        stack.forEach(node => {
            if (!node) throw new Error('Should not be able to shift a null node !');

            let line, startLine: HTMLElement, endLine, n, varSpan, leftSpan, rightSpan;
            switch (node.type) {
                case 'BlockStatement':
                    n = node as BlockStatement;
                    this.unstackAst(parentElement, n.body, padding + 1);
                    break;

                case 'FunctionDeclaration':
                    n = node as FunctionDeclaration;
                    startLine = this.appendCodeLine(parentElement, padding);
                    this.mapping.set(node, startLine);
                    if (n.id) {
                        let span = this.appendSpan(startLine, []);
                        span.innerHTML = 'function ' + n.id.name + ' ( ';// + func.params.map(x => x.name).join(', ') + ' ) {';
                    } else {
                        let span = this.appendSpan(startLine, []);
                        span.innerHTML = 'function ( ';// + func.params.map(x => x.name).join(', ') + ' ) {';
                    }

                    let paramCount = n.params.length;
                    n.params.forEach((param, i) => {
                        let varName = AstHelper.patternToString(param);
                        let span = this.appendSpan(startLine, ['varId'], varName);
                        this.mapping.set(param, span);
                        if (i < paramCount - 1) {
                            let span = this.appendSpan(startLine, []);
                            span.innerHTML = ', ';
                        }
                    });

                    let span = this.appendSpan(startLine, []);
                    span.innerHTML += ' ) {';

                    this.unstackAst(parentElement, n.body.body, padding + 1);

                    endLine = this.appendCodeLine(parentElement, padding);
                    endLine.innerHTML = '}';
                    break;

                case 'IfStatement':
                    n = node as IfStatement;
                    startLine = this.appendCodeLine(parentElement, padding);
                    this.mapping.set(n.test, startLine);
                    //startLine.innerHTML = 'if ( <span>' + Escodegen.generate(ifstmt.test) + '</span> ) {';
                    startLine.innerHTML = 'if ( ';
                    this.unstackAst(startLine, [n.test], 0);
                    startLine.innerHTML += ' ) {';

                    this.unstackAst(parentElement, [n.consequent], padding);

                    let midLine = this.appendCodeLine(parentElement, padding);

                    if (n.alternate) {
                        midLine.innerHTML = '} else {';
                        this.unstackAst(parentElement, [n.alternate], padding);
                    }

                    endLine = this.appendCodeLine(parentElement, padding);
                    endLine.innerHTML = '}';
                    break;

                case 'VariableDeclaration':
                    n = node as VariableDeclaration;
                    line = this.appendCodeLine(parentElement, padding);
                    this.mapping.set(node, line);
                    line.innerHTML = n.kind + ' ';
                    this.unstackAst(line, n.declarations, 0);
                    break;

                case 'VariableDeclarator':
                    n = node as VariableDeclarator;
                    varSpan = this.appendSpan(parentElement, ['varId']);
                    this.mapping.set(node, varSpan);
                    varSpan.innerHTML = AstHelper.patternToString(n.id);
                    if (n.init) {
                        this.appendSpan(parentElement, [], ' = ');
                        let initSpan = this.appendSpan(parentElement, ['varInit']);
                        this.unstackAst(initSpan, [n.init], 0);
                    }
                    this.appendSpan(parentElement, [], ';');
                    break;

                case 'AssignmentExpression':
                    n = node as AssignmentExpression;
                    leftSpan = this.appendSpan(parentElement, ['varId']);
                    this.mapping.set(node, leftSpan);
                    this.unstackAst(leftSpan, [n.left], 0);
                    this.appendSpan(parentElement, [], ' = ');
                    rightSpan = this.appendSpan(parentElement, ['varInit']);
                    this.unstackAst(rightSpan, [n.right], 0);
                    this.appendSpan(parentElement, [], ';');
                    break;

                case 'BinaryExpression':
                    n = node as BinaryExpression;
                    leftSpan = this.appendSpan(parentElement, ['leftBin']);
                    this.unstackAst(leftSpan, [n.left], 0);
                    this.appendSpan(parentElement, [], ' ' + n.operator + ' ');
                    rightSpan = this.appendSpan(parentElement, ['rightBin']);
                    this.unstackAst(rightSpan, [n.right], 0);
                    break;

                case 'ExpressionStatement':
                    n = node as ExpressionStatement;
                    line = this.appendCodeLine(parentElement, padding);
                    this.mapping.set(node, line);
                    this.unstackAst(line, [n.expression], 0);
                    break;

                case 'ReturnStatement':
                    n = node as ReturnStatement
                    line = this.appendCodeLine(parentElement, padding);
                    this.mapping.set(node, line);
                    line.innerHTML = escodeGenerate(node);
                    break;

                default:
                    console.log('default:', node);
                    line = this.appendSpan(parentElement, ['nsy-' + node.type], escodeGenerate(node));
                    this.mapping.set(node, line);
                    break;
            }
        });
    }

    private buildHtmlTree2() {
        const codeRoot = document.createElement("div");
        this.progremCodeLines.push(codeRoot);
        this.unstackAst(codeRoot, [this.progremCode.colorerProgremFunction().astRootNode], 0);
    }

    private buildHtmlTree3(): EsToHtmlTreeStore {
        const codeRoot = document.createElement("div");
        this.progremCodeLines.push(codeRoot);
        
        let factory = new CodeSpoolerEsToHtmlTreeMapperFactory(this._document);
        let treeStore = factory.build(this.progremCode);

        treeStore.paintInto(codeRoot);

        return treeStore;
    }

    private buildHtmlTree() {
        const codeRoot = document.createElement("div");
        const stack: BaseNode[] = [this.progremCode.colorerProgremFunction().astRootNode];
        let padding = 0;

        //this.progremCode.colorerProgremFunction().body.body.map(n => stack.push(n));

        do {
            let node = stack.shift();
            if (!node) throw new Error('Should not be able to shift a null node !');
            var line;

            switch (node.type) {
                case 'BlockStatement':
                    let block = node as BlockStatement;
                    padding++
                    block.body.slice(0).reverse().map(x => stack.unshift(x));
                    break;
                case 'EndBlockStatement':
                    // This is a hack to close an opened block
                    padding--;
                    line = this.appendCodeLine(codeRoot, padding);
                    line.innerHTML = '}';
                    break;
                case 'FunctionDeclaration':
                    let func = node as FunctionDeclaration;
                    line = this.appendCodeLine(codeRoot, padding);
                    if (func.id) {
                        line.innerHTML = 'function ' + func.id.name + ' () {';// + func.params.map(x => x.name).join(', ') + ' ) {';
                    } else {
                        line.innerHTML = 'function () {';// + func.params.map(x => x.name).join(', ') + ' ) {';
                    }
                    stack.unshift({ type: 'EndBlockStatement' }); // Hack to delay a block end
                    stack.unshift(func.body);
                    break;
                case 'IfStatement':
                    let ifstmt = node as IfStatement;
                    line = this.appendCodeLine(codeRoot, padding);
                    line.innerHTML = 'if ( <span>' + escodeGenerate(ifstmt.test) + '</span> ) {';
                    this.mapping.set(ifstmt.test, line);

                    if (ifstmt.alternate) {
                        stack.unshift({ type: 'EndBlockStatement' }); // Hack to delay a block end
                        stack.unshift(ifstmt.alternate);
                    }
                    stack.unshift({ type: 'ElseBlockStatement' }); // Hack to delay an else block
                    stack.unshift(ifstmt.consequent);
                    break;
                case 'ElseBlockStatement':
                    // This is a hack to close an opened block
                    padding--;
                    line = this.appendCodeLine(codeRoot, padding);
                    line.innerHTML = '} else {';
                    break;
                default:
                    line = this.appendCodeLine(codeRoot, padding);
                    line.textContent = escodeGenerate(node);
                    line.classList.add('statement');
                    this.mapping.set(node, line);
                    break;
            }
        } while (stack.length > 0);
    }
}

*/
class ProgremInspectorView {
    constructor(scheduler, htmlFactory) {
        this.scheduler = scheduler;
        this.htmlFactory = htmlFactory;
        this.executingElements = [];
        this.executedElements = [];
        scheduler.subscribeCodeExecution(this);
        scheduler.subscribeGridChange(this);
    }
    buildView(scheduler) {
        let htmlComponent = this.htmlFactory.buildCouplet();
        return htmlComponent;
    }
    fireCodeExecution(state) {
        let htmlVerse = this.htmlFactory.getHtmlVerse(state.verse);
        if (htmlVerse) {
            htmlVerse.classList.add(ProgremInspectorView.EXECUTING_CLASS);
        }
        while (this.executingElements.length > 0) {
            let elt = this.executingElements.pop();
            if (elt) {
                this.executedElements.push(elt);
                elt.classList.remove(ProgremInspectorView.EXECUTING_CLASS);
                elt.classList.add(ProgremInspectorView.EXECUTED_CLASS);
            }
        }
        if (!htmlVerse) {
            return;
        }
        this.executingElements.push(htmlVerse);
        htmlVerse.classList.add(ProgremInspectorView.EXECUTING_CLASS);
    }
    fireGridChange(state) {
        while (this.executingElements.length > 0) {
            let elt = this.executingElements.pop();
            if (elt) {
                elt.classList.remove(ProgremInspectorView.EXECUTED_CLASS);
                elt.classList.remove(ProgremInspectorView.EXECUTING_CLASS);
            }
        }
        while (this.executedElements.length > 0) {
            let elt = this.executedElements.pop();
            if (elt) {
                elt.classList.remove(ProgremInspectorView.EXECUTED_CLASS);
                elt.classList.remove(ProgremInspectorView.EXECUTING_CLASS);
            }
        }
    }
}
ProgremInspectorView.EXECUTING_CLASS = 'verse-executing';
ProgremInspectorView.EXECUTED_CLASS = 'verse-executed';
exports.ProgremInspectorView = ProgremInspectorView;


/***/ }),

/***/ "vMkM":
/*!*************************************!*\
  !*** ./src/EstreeStyleDecorator.ts ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AstHelper_1 = __webpack_require__(/*! ./AstHelper */ "8yvk");
const js_md5_1 = __webpack_require__(/*! js-md5 */ "gjeX");
const ProgremInspector_1 = __webpack_require__(/*! ./ProgremInspector */ "tFKc");
class ColorVerseVariableDecorator {
    constructor() {
        this.variableMap = new Map();
        this.colorMap = new Map();
    }
    decorate(node, element) {
        let varId;
        if (node.type === 'VariableDeclarator') {
            let n = node;
            varId = AstHelper_1.AstHelper.patternToString(n.id);
        }
        if (node.type === 'AssignmentExpression') {
            let n = node;
            varId = AstHelper_1.AstHelper.patternToString(n.left);
        }
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
                    padding: 2px 5px;
                    border: 1px solid transparent;
                }
                .${ProgremInspector_1.ProgremInspectorView.EXECUTING_CLASS} .variable-${index}.identifier, 
                .${ProgremInspector_1.ProgremInspectorView.EXECUTED_CLASS} .variable-${index}.identifier {
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

/***/ "xuGg":
/*!****************************!*\
  !*** ./src/CodeService.ts ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const esprima_1 = __webpack_require__(/*! esprima */ "+U4B");
const esprima_walk_1 = __webpack_require__(/*! esprima-walk */ "DEE3");
const escodegen_1 = __webpack_require__(/*! escodegen */ "aMAw");
const EsprimaHelper_1 = __webpack_require__(/*! ./EsprimaHelper */ "+mJ7");
/*
export class CodeStatement {
    constructor(
        public node: BaseNode,
        //public code: string
    ) {};
}

export interface CodeStatementFactory<T> {
    build(param: T): CodeStatement;
}

export interface CodeIterator {
    executeNext(): CodeStatement;
    hasNext(): boolean;
}

export interface ProgremCode {
    initialiserProgremFunction(): FunctionDeclaration
    colorerProgremFunction(): FunctionDeclaration
    iterator(state: ProgremState): CodeIterator;
}

class EsprimaCodeStatementFactory implements VerseInstructionFactory<BaseNode> {

    build(param: BaseNode): EsprimaVerseInstruction {
        if (param)
            return new EsprimaVerseInstruction(param);
        
        throw new Error('Unable to build non statement code !');
    }
}
*/
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
                    return CodeService.progremFactory.buildVerse(func);
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
                    return CodeService.progremFactory.buildVerse(stmt);
                case 'ReturnStatement':
                    stmt = node;
                    this.returnValue = this.state.eval(escodegen_1.generate(stmt.argument));
                    this.finished = true;
                    return CodeService.progremFactory.buildVerse(stmt);
                default:
                    //console.log('Node:', node);
                    let code = escodegen_1.generate(node);
                    //console.log('Generated code:', code);
                    let evalResult = this.state.eval(code);
                    //console.log('Evaluate to:', evalResult);
                    return CodeService.progremFactory.buildVerse(node);
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
            return CodeService.progremFactory.buildCouplet(funcNode, verses);
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
var CodeService;
(function (CodeService) {
    CodeService.progremFactory = new BasicEsprimaProgremFactory();
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


/***/ })

},[["/7QA","runtime","npm.escodegen","npm.esutils","npm.estraverse","npm.webpack","npm.esprima-walk","npm.esprima","npm.js-md5","npm.process"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvRXNwcmltYUhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb2dyZW1HcmlkLnRzIiwid2VicGFjazovLy8uL3NyYy9FdmFsU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQXN0SGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9Fc3RyZWVQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1R5cGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9Qcm9ncmVtU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2NyZWVuU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvSHRtbEhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2NoZWR1bGluZ1NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb2dyZW1JbnNwZWN0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0VzdHJlZVN0eWxlRGVjb3JhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9Db2RlU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBSUEsTUFBc0IsYUFBYTtJQUV4QixNQUFNLENBQUMsYUFBYSxDQUFDLElBQW9CLEVBQUUsTUFBdUI7UUFDckUsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUN4QixPQUFPLElBQUksQ0FBQztTQUNmO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDckIsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxPQUFPLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQXdCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVNLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFvQixFQUFFLE9BQTBCO1FBQzNFLElBQUksT0FBTyxDQUFD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Q0FBQyxFQW5CZ0IsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFtQjNCIiwiZmlsZSI6ImluZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEVTVHJlZSBmcm9tIFwiZXN0cmVlXCI7XG5cbmV4cG9ydCB0eXBlIE5vZGVXaXRoUGFyZW50ID0gRVNUcmVlLk5vZGUgJiB7IHBhcmVudD86IEVTVHJlZS5Ob2RlIH07XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFc3ByaW1hSGVscGVyIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgaXNDaGlsZE5vZGVPZihub2RlOiBOb2RlV2l0aFBhcmVudCwgcGFyZW50OiBFU1RyZWUuQmFzZU5vZGUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKG5vZGUucGFyZW50ID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCFub2RlLnBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEVzcHJpbWFIZWxwZXIuaXNDaGlsZE5vZGVPZihub2RlLnBhcmVudCBhcyBOb2RlV2l0aFBhcmVudCwgcGFyZW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzTm90Q2hpbGROb2RlT2Yobm9kZTogTm9kZVdpdGhQYXJlbnQsIHBhcmVudHM6IEVTVHJlZS5CYXNlTm9kZVtdKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChwYXJlbnRzLmZpbmQocCA9PiBwID09PSBub2RlLnBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICghbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEVzcHJpbWFIZWxwZXIuaXNOb3RDaGlsZE5vZGVPZihub2RlLnBhcmVudCBhcyBOb2RlV2l0aFBhcmVudCwgcGFyZW50cyk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgUHJvZ3JlbVNlcnZpY2UsIFByb2dyZW1Db25maWcgfSBmcm9tIFwiLi9Qcm9ncmVtU2VydmljZVwiO1xuaW1wb3J0IHsgU2NyZWVuQ29uZmlnIH0gZnJvbSBcIi4vU2NyZWVuU2VydmljZVwiO1xuXG5sZXQgc2NyZWVuQ29uZmlnID0gbmV3IFNjcmVlbkNvbmZpZygyMCk7XG5sZXQgcHJvZ3JlbUNvbmZpZyA9IG5ldyBQcm9ncmVtQ29uZmlnKDE3LCAxNywgMSk7XG5cblByb2dyZW1TZXJ2aWNlLmJ1aWxkUHJvZ3JlbSgnLi9wcm9ncmVtcy9jb2V1cl9wcm9ncmVtLmpzJywgc2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnKTsiLCJpbXBvcnQgeyBHcmlkQ2hhbmdlTGlzdGVuZXIsIFByb2dyZW1TdGF0ZSB9IGZyb20gXCIuL1NjaGVkdWxpbmdTZXJ2aWNlXCI7XG5pbXBvcnQgeyBTY3JlZW5Db25maWcgfSBmcm9tIFwiLi9TY3JlZW5TZXJ2aWNlXCI7XG5pbXBvcnQgeyBQcm9ncmVtQ29uZmlnIH0gZnJvbSBcIi4vUHJvZ3JlbVNlcnZpY2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtR3JpZCB7XG4gICAgY2xlYXIoKTogdm9pZDtcbiAgICBhdHRhY2goZWxlbWVudDogRWxlbWVudCB8IG51bGwpOiB2b2lkXG59XG5cbmV4cG9ydCBjbGFzcyBCYXNpY0NhbnZhc1Byb2dyZW1HcmlkIGltcGxlbWVudHMgUHJvZ3JlbUdyaWQsIEdyaWRDaGFuZ2VMaXN0ZW5lciB7XG4gICAgXG4gICAgcHJpdmF0ZSBhdHRhY2hlZEVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgcHJpdmF0ZSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNjcmVlbkNvbmZpZzogU2NyZWVuQ29uZmlnLCBcbiAgICAgICAgcHJpdmF0ZSBwcm9ncmVtQ29uZmlnOiBQcm9ncmVtQ29uZmlnXG4gICAgICAgICkge1xuICAgICAgICBsZXQgZWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZW0nKTtcbiAgICAgICAgaWYgKCFlbHQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZpbmQgLnByb2dyZW0gQ2FudmFzIGVsZW1lbnQgIScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FudmFzID0gZWx0IGFzIEhUTUxDYW52YXNFbGVtZW50O1xuXG4gICAgICAgIGxldCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBpZiAoIWN0eCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZ2V0IDJEIENhbnZhcyBjb250ZXh0ICEnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGF0dGFjaFRvQ2FudmFzKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHRoaXMucHJvZ3JlbUNvbmZpZy5jb2xvbm5lcyAqIHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLnByb2dyZW1Db25maWcuY29sb25uZXMgKiB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplO1xuXG4gICAgICAgIGxldCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBpZiAoIWN0eCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZ2V0IDJEIENhbnZhcyBjb250ZXh0ICEnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB9XG5cbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZSAqIHRoaXMucHJvZ3JlbUNvbmZpZy5jb2xvbm5lcztcbiAgICAgICAgbGV0IGhlaWdodCA9IHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemUgKiB0aGlzLnByb2dyZW1Db25maWcubGlnbmVzO1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuXG4gICAgYXR0YWNoKGVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXR0YWNoZWRFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnQ0FOVkFTJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoVG9DYW52YXMoZWxlbWVudCBhcyBIVE1MQ2FudmFzRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNoaWxkTm9kZXMuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGMubm9kZU5hbWUgPT09ICdDQU5WQVMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFjaFRvQ2FudmFzKGVsZW1lbnQgYXMgSFRNTENhbnZhc0VsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE5vIENhbnZhcyBmb3VuZCBzbyB3ZSBjcmVhdGUgb25lXG4gICAgICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNoVG9DYW52YXMoY2FudmFzKTtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmaXJlR3JpZENoYW5nZSAoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnZ3JpZCBjaGFuZ2U6ICcsIHN0YXRlKTtcblxuICAgICAgICBsZXQgYm94U2l6ZSA9IHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG4gICAgICAgIGxldCBjID0gc3RhdGUuY29sb25uZTtcbiAgICAgICAgbGV0IGwgPSBzdGF0ZS5saWduZTtcblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGxldCBjb3VsZXVyID0gY29sb3JlclByb2dyZW0oYywgbCwgc3RhdGUuY29udGV4dGUpO1xuICAgICAgICBpZiAoY291bGV1cikge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY291bGV1cjtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KGMgKiBib3hTaXplLCBsICogYm94U2l6ZSwgYm94U2l6ZSwgYm94U2l6ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsIlxuZXhwb3J0IGNsYXNzIEV2YWxTY29wZSB7XG5cbiAgICAvLyBTZWUgaHR0cDovL3BlcmZlY3Rpb25raWxscy5jb20vZ2xvYmFsLWV2YWwtd2hhdC1hcmUtdGhlLW9wdGlvbnMvXG4gICAgLy8gV2lsbCByZXR1cm4gYW4gZXZhbCBhYmxlIHRvIGV2YWx1YXRlIGpzIGNvZGUgaW4gdGhlIGdsb2JhbCBzY29wZS5cbiAgICBwdWJsaWMgcmVhZG9ubHkgZ2xvYmFsRXZhbCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdmFyIGlzSW5kaXJlY3RFdmFsR2xvYmFsID0gKGZ1bmN0aW9uIChvcmlnaW5hbCwgT2JqZWN0KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vIERvZXMgYE9iamVjdGAgcmVzb2x2ZSB0byBhIGxvY2FsIHZhcmlhYmxlLCBvciB0byBhIGdsb2JhbCwgYnVpbHQtaW4gYE9iamVjdGAsXG4gICAgICAgICAgICAgICAgLy8gcmVmZXJlbmNlIHRvIHdoaWNoIHdlIHBhc3NlZCBhcyBhIGZpcnN0IGFyZ3VtZW50P1xuICAgICAgICAgICAgICAgIHJldHVybiAoMSwgZXZhbCkoJ09iamVjdCcpID09PSBvcmlnaW5hbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBpbmRpcmVjdCBldmFsIGVycm9ycyBvdXQgKGFzIGFsbG93ZWQgcGVyIEVTMyksIHRoZW4ganVzdCBiYWlsIG91dCB3aXRoIGBmYWxzZWBcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKE9iamVjdCwgMTIzKTtcblxuICAgICAgICBpZiAoaXNJbmRpcmVjdEV2YWxHbG9iYWwpIHtcbiAgICAgICAgICAgIC8vIGlmIGluZGlyZWN0IGV2YWwgZXhlY3V0ZXMgY29kZSBnbG9iYWxseSwgdXNlIGl0XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV4cHJlc3Npb246IHN0cmluZykge1xuICAgICAgICAgICAgICAgIHJldHVybiAoMSwgZXZhbCkoZXhwcmVzc2lvbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHdpbmRvdy5leGVjU2NyaXB0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gaWYgYHdpbmRvdy5leGVjU2NyaXB0IGV4aXN0c2AsIHVzZSBpdFxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChleHByZXNzaW9uOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5leGVjU2NyaXB0KGV4cHJlc3Npb24pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG90aGVyd2lzZSwgZ2xvYmFsRXZhbCBpcyBgdW5kZWZpbmVkYCBzaW5jZSBub3RoaW5nIGlzIHJldHVybmVkXG4gICAgICAgIHJldHVybiAoZXhwcjogc3RyaW5nKSA9PiB7dGhyb3cgbmV3IEVycm9yKCdObyBnbG9iYWwgZXZhbCBhdmFpbGFibGUgIScpO31cbiAgICB9KSgpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG59XG4iLCJpbXBvcnQgeyBQYXR0ZXJuLCBJZGVudGlmaWVyLCBCYXNlTm9kZSwgVmFyaWFibGVEZWNsYXJhdGlvbiwgQXNzaWdubWVudEV4cHJlc3Npb24sIEZ1bmN0aW9uRGVjbGFyYXRpb24sIFZhcmlhYmxlRGVjbGFyYXRvciB9IGZyb20gXCJlc3RyZWVcIjtcblxuZXhwb3J0IG5hbWVzcGFjZSBBc3RIZWxwZXIge1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHBhdHRlcm5Ub1N0cmluZyhwYXR0ZXJuOiBQYXR0ZXJuKTogc3RyaW5nIHtcbiAgICAgICAgdmFyIG5vZGU7XG4gICAgICAgIHN3aXRjaCAocGF0dGVybi50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdJZGVudGlmaWVyJzpcbiAgICAgICAgICAgICAgICBub2RlID0gcGF0dGVybiBhcyBJZGVudGlmaWVyO1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlLm5hbWU7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBjb252ZXJ0IHBhdHRlcm4gb2YgdHlwZSAnICsgcGF0dGVybi50eXBlKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gcmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24obm9kZTogQmFzZU5vZGUpOiBWYXJpYWJsZURlY2xhcmF0aW9uIHwgQXNzaWdubWVudEV4cHJlc3Npb24gfCBGdW5jdGlvbkRlY2xhcmF0aW9uIHwgdm9pZCB7XG4gICAgICAgIFxuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnVmFyaWFibGVEZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgIGxldCBkZWNsID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0aW9uO1xuICAgICAgICAgICAgcmV0dXJuIGRlY2w7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnQXNzaWdubWVudEV4cHJlc3Npb24nKSB7XG4gICAgICAgICAgICBsZXQgZXhwciA9IG5vZGUgYXMgQXNzaWdubWVudEV4cHJlc3Npb247XG4gICAgICAgICAgICByZXR1cm4gZXhwcjtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdGdW5jdGlvbkRlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgbGV0IGZ1bmMgPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gZnVuYztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IHAgaW4gbm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChwID09PSAnbGVmdCcgfHwgcCA9PT0gJ3JpZ2h0JyB8fCBwID09PSAnYXJndW1lbnQnIHx8IHAgPT09ICdjYWxsZWUnIHx8IHAgPT09ICdib2R5JyB8fCBwID09PSAnZXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZDogQmFzZU5vZGUgPSBub2RlW3BdIGFzIEJhc2VOb2RlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gcmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24oY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBTdHlsZURlY29yYXRvciB9IGZyb20gXCIuL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNlTm9kZSwgRnVuY3Rpb25EZWNsYXJhdGlvbiwgQmxvY2tTdGF0ZW1lbnQsIElmU3RhdGVtZW50LCBWYXJpYWJsZURlY2xhcmF0b3IsIFZhcmlhYmxlRGVjbGFyYXRpb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBFeHByZXNzaW9uU3RhdGVtZW50LCBSZXR1cm5TdGF0ZW1lbnQsIElkZW50aWZpZXIsIE1lbWJlckV4cHJlc3Npb24gfSBmcm9tIFwiZXN0cmVlXCI7XG5pbXBvcnQgeyBIdG1sSGVscGVyIH0gZnJvbSBcIi4vSHRtbEhlbHBlclwiO1xuaW1wb3J0IHsgQXN0SGVscGVyIH0gZnJvbSBcIi4vQXN0SGVscGVyXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBFc3ByaW1hVmVyc2UsIEVzcHJpbWFIdG1sQ291cGxldEZhY3RvcnksIEVzcHJpbWFDb3VwbGV0IH0gZnJvbSBcIi4vRXNwcmltYVR5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBFc3ByaW1hUHJvZ3JlbUluc3BlY3Rvckh0bWxGYWN0b3J5IGltcGxlbWVudHMgRXNwcmltYUh0bWxDb3VwbGV0RmFjdG9yeSB7XG5cbiAgICBwcml2YXRlIGh0bWxWZXJzZXNNYXA6IE1hcDxCYXNlTm9kZSwgSFRNTEVsZW1lbnQ+ID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY291cGxldDogRXNwcmltYUNvdXBsZXQsXG4gICAgICAgIHByaXZhdGUgZGVjb3JhdG9yOiBTdHlsZURlY29yYXRvcjxCYXNlTm9kZT5cbiAgICApIHt9XG5cbiAgICBidWlsZENvdXBsZXQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgaHRtbENvdXBsZXQgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLmNvdXBsZXQuZnVuY3Rpb25Sb290Tm9kZSk7XG4gICAgICAgIGh0bWxDb3VwbGV0LmNsYXNzTGlzdC5hZGQoJ3Byb2dyZW0taW5zcGVjdG9yJyk7XG4gICAgICAgIC8vbGV0IGh0bWxWZXJzZXMgPSB0aGlzLmNvdXBsZXQudmVyc2VzLm1hcCh2ID0+IHRoaXMuYnVpbGROb2RlKHYubm9kZSkpO1xuICAgICAgICAvL2xldCBodG1sQ291cGxldCA9IEh0bWxIZWxwZXIuc3BhbignY291cGxldCcsIGh0bWxWZXJzZXMpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdodG1sVmVyc2VzTWFwOicsIHRoaXMuaHRtbFZlcnNlc01hcCk7XG4gICAgICAgIHJldHVybiBodG1sQ291cGxldDtcbiAgICB9XG5cbiAgICBnZXRIdG1sVmVyc2UodmVyc2U6IEVzcHJpbWFWZXJzZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKHRoaXMuaHRtbFZlcnNlc01hcC5zaXplID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWxTdGF0ZUVycm9yOiBjb3VwbGV0IG11c3QgYmUgYnVpbHQgYmVmb3JlIGNhbGxpbmcgZ2V0SHRtbFZlcnNlKCkgIScpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHRtbEVsZW1lbnQgPSB0aGlzLmh0bWxWZXJzZXNNYXAuZ2V0KHZlcnNlLm5vZGUpO1xuICAgICAgICBpZiAoIWh0bWxFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gSFRNTEVsZW1lbnQgZm91bmQgbWF0Y2hpbmcgdmVyc2U6JywgdmVyc2UsICchJylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gSFRNTEVsZW1lbnQgZm91bmQgbWF0Y2hpbmcgc3VwcGxpZWQgdmVyc2UgIWApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaHRtbEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGQgTm9kZSBhcHBseWluZyBkZWNvcmF0b3JzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBub2RlIHRoZSBub2RlIGZvciB3aGljaCB0byBwcm9kdWNlIEhUTUxcbiAgICAgKiBAcGFyYW0gc2libGluZ3MgdGhlIG5vZGVzIHRvIGFkZCBhcyBzaWJsaW5ncyBvZiB0aGUgbm9kZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBidWlsZE5vZGUobm9kZTogQmFzZU5vZGUgfCB1bmRlZmluZWQgfCBudWxsKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBIdG1sSGVscGVyLnNwYW4oJ2VtcHR5JywgJycpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzaWJsaW5nczogSFRNTEVsZW1lbnRbXSA9IFtdXG4gICAgICAgIGxldCBodG1sT3V0cHV0ID0gdGhpcy5idWlsZE5vZGVJbnRlcm5hbChub2RlLCBzaWJsaW5ncyk7XG4gICAgICAgIGh0bWxPdXRwdXQgPSB0aGlzLmRlY29yYXRvci5kZWNvcmF0ZShub2RlLCBodG1sT3V0cHV0KTtcblxuICAgICAgICBsZXQgbWF0Y2hpbmdWZXJzZSA9IHRoaXMuY291cGxldC52ZXJzZXMuZmluZCh2ID0+IHYubm9kZSA9PT0gbm9kZSk7XG4gICAgICAgIGlmIChtYXRjaGluZ1ZlcnNlKSB7XG4gICAgICAgICAgICBodG1sT3V0cHV0ID0gdGhpcy5lbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGh0bWxPdXRwdXQpO1xuICAgICAgICAgICAgLy8gVGhpcyBub2RlIGlzIHRoZSByb290IG5vZGUgb2YgYSBWZXJzZVxuICAgICAgICAgICAgdGhpcy5odG1sVmVyc2VzTWFwLnNldChtYXRjaGluZ1ZlcnNlLm5vZGUsIGh0bWxPdXRwdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpYmxpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIElmIHNpYmxpbmdzLCBidWlsZCBlYWNoIHNpYmxpbmdcbiAgICAgICAgICAgIGh0bWxPdXRwdXQgPSBIdG1sSGVscGVyLnNwYW4oJ3NpYmxpbmctY29udGFpbmVyJywgaHRtbE91dHB1dCk7XG4gICAgICAgICAgICB3aGlsZShzaWJsaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNpYmxpbmcgPSBzaWJsaW5ncy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIGlmIChzaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IHNpYmxpbmdPdXQgPSB0aGlzLmJ1aWxkTm9kZShzaWJsaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgaHRtbE91dHB1dC5hcHBlbmRDaGlsZChzaWJsaW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaHRtbE91dHB1dDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZW5jYXBzdWxhdGVOb2RlSW5WZXJzZUNvbnRhaW5lcihodG1sRWx0OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZlcnNlLWNvbnRlbnQnLCBodG1sRWx0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbigndmVyc2UgdmVyc2UtY29udGFpbmVyJywgY29udGVudCk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGQgbm9kZS5cbiAgICAgKiBAcGFyYW0gbm9kZSBcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYnVpbGROb2RlSW50ZXJuYWwobm9kZTogQmFzZU5vZGUsIHNpYmxpbmdzOiBIVE1MRWxlbWVudFtdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdCdWlsZGluZyBub2RlJywgbm9kZSwgJy4uLicpO1xuICAgICAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRGdW5jdGlvbkRlY2xhcmF0aW9uKG5vZGUsIHNpYmxpbmdzKTtcbiAgICAgICAgICAgIGNhc2UgJ0Jsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEJsb2NrU3RhdGVtZW50KG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnSWZTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkSWZTdGF0ZW1lbnQobm9kZSwgc2libGluZ3MpO1xuICAgICAgICAgICAgY2FzZSAnVmFyaWFibGVEZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRWYXJpYWJsZURlY2xhcmF0aW9uKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnVmFyaWFibGVEZWNsYXJhdG9yJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZFZhcmlhYmxlRGVjbGFyYXRvcihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEFzc2lnbm1lbnRFeHByZXNzaW9uKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnQmluYXJ5RXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRCaW5hcnlFeHByZXNzaW9uKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnRXhwcmVzc2lvblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRFeHByZXNzaW9uU3RhdGVtZW50KG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnUmV0dXJuU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZFJldHVyblN0YXRlbWVudChub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0lkZW50aWZpZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkSWRlbnRpZmllcihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ01lbWJlckV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkTWVtYmVyRXhwcmVzc2lvbihub2RlKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGREZWZhdWx0KG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkRnVuY3Rpb25EZWNsYXJhdGlvbihub2RlOiBCYXNlTm9kZSwgc2libGluZ3M6IEhUTUxFbGVtZW50W10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICBcbiAgICAgICAgbGV0IGRlY2xTdGFydEl0ZW1zOiAoc3RyaW5nIHwgSFRNTEVsZW1lbnQpW107XG4gICAgICAgIGlmIChuLmlkKSB7XG4gICAgICAgICAgICBsZXQgZnVuY0lkID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLWlkJywgbi5pZC5uYW1lKTtcbiAgICAgICAgICAgIGRlY2xTdGFydEl0ZW1zID0gWydmdW5jdGlvbiAnLCBmdW5jSWQsICcgKCAnXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlY2xTdGFydEl0ZW1zID0gWydmdW5jdGlvbiAoICddOy8vICsgZnVuYy5wYXJhbXMubWFwKHggPT4geC5uYW1lKS5qb2luKCcsICcpICsgJyApIHsnO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhcmFtQ291bnQgPSBuLnBhcmFtcy5sZW5ndGg7XG4gICAgICAgIG4ucGFyYW1zLmZvckVhY2goKHBhcmFtLCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcocGFyYW0pO1xuICAgICAgICAgICAgbGV0IGZ1bmNQYXJhbSA9IHRoaXMuYnVpbGROb2RlKHBhcmFtKTsvL0h0bWxIZWxwZXIuc3BhbignZnVuYy1wYXJhbScsIHZhck5hbWUpO1xuICAgICAgICAgICAgZGVjbFN0YXJ0SXRlbXMucHVzaChmdW5jUGFyYW0pO1xuICAgICAgICAgICAgaWYgKGkgPCBwYXJhbUNvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgIGRlY2xTdGFydEl0ZW1zLnB1c2goJywgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlY2xTdGFydEl0ZW1zLnB1c2goJyApIHsnKTtcblxuICAgICAgICBsZXQgZGVjbFN0YXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLXN0YXJ0JywgZGVjbFN0YXJ0SXRlbXMpO1xuICAgICAgICBsZXQgZnVuY0JvZHkgPSB0aGlzLmJ1aWxkTm9kZShuLmJvZHkpO1xuICAgICAgICBsZXQgZGVjbEVuZCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1lbmQnLCAnfScpO1xuICAgICAgICBkZWNsRW5kID0gdGhpcy5lbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGRlY2xFbmQpO1xuICAgICAgICAvL2xldCBkZWNsID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLWRlY2xhcmF0aW9uJywgW2RlY2xTdGFydCwgZnVuY0JvZHksIGRlY2xFbmRdKTtcbiAgICAgICAgbGV0IGRlY2wgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtZGVjbGFyYXRpb24nLCBkZWNsU3RhcnQpO1xuICAgICAgICBzaWJsaW5ncy5wdXNoKGZ1bmNCb2R5KTtcbiAgICAgICAgc2libGluZ3MucHVzaChkZWNsRW5kKTtcbiAgICAgICAgcmV0dXJuIGRlY2w7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkQmxvY2tTdGF0ZW1lbnQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgbGV0IGJvZHlTdGF0ZW1lbnRzID0gbi5ib2R5Lm1hcChzdGF0ZW1lbnQgPT4gdGhpcy5idWlsZE5vZGUoc3RhdGVtZW50KSlcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIuc3BhbignYmxvY2snLCBib2R5U3RhdGVtZW50cyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkSWZTdGF0ZW1lbnQobm9kZTogQmFzZU5vZGUsIHNpYmxpbmdzOiBIVE1MRWxlbWVudFtdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgSWZTdGF0ZW1lbnQ7XG4gICAgICAgIGxldCBjb250ZW50OiBIVE1MRWxlbWVudFtdID0gW11cbiAgICAgICAgbGV0IHRlc3QgPSB0aGlzLmJ1aWxkTm9kZShuLnRlc3QpO1xuICAgICAgICBsZXQgaWZTdGFydFRleHQgPSBbJ2lmICggJywgdGVzdCwgJyApIHsnXTtcbiAgICAgICAgbGV0IGlmU3RhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1zdGF0ZW1lbnQtc3RhcnQnLCBpZlN0YXJ0VGV4dCk7XG4gICAgICAgIGNvbnRlbnQucHVzaChpZlN0YXJ0KTtcblxuICAgICAgICBsZXQgdGhlbkJsb2NrID0gdGhpcy5idWlsZE5vZGUobi5jb25zZXF1ZW50KTtcbiAgICAgICAgbGV0IGlmVGhlbiA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLWJsb2NrLXRoZW4nLCB0aGVuQmxvY2spO1xuICAgICAgICBjb250ZW50LnB1c2goaWZUaGVuKTtcbiAgICAgICAgc2libGluZ3MucHVzaCh0aGVuQmxvY2spO1xuXG4gICAgICAgIGlmIChuLmFsdGVybmF0ZSkge1xuICAgICAgICAgICAgbGV0IGlmRWxzZURlY2wgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1zdGF0ZW1lbnQtZWxzZScsICd9IGVsc2UgeycpO1xuICAgICAgICAgICAgaWZFbHNlRGVjbCA9IHRoaXMuZW5jYXBzdWxhdGVOb2RlSW5WZXJzZUNvbnRhaW5lcihpZkVsc2VEZWNsKTtcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaChpZkVsc2VEZWNsKTtcbiAgICAgICAgICAgIHNpYmxpbmdzLnB1c2goaWZFbHNlRGVjbCk7XG5cbiAgICAgICAgICAgIGxldCBlbHNlQmxvY2sgPSB0aGlzLmJ1aWxkTm9kZShuLmFsdGVybmF0ZSk7XG4gICAgICAgICAgICBsZXQgaWZFbHNlID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtYmxvY2stZWxzZScsIGVsc2VCbG9jayk7XG4gICAgICAgICAgICBjb250ZW50LnB1c2goaWZFbHNlKTtcbiAgICAgICAgICAgIHNpYmxpbmdzLnB1c2goaWZFbHNlKTtcbiAgICAgICAgfSBcbiAgICAgICAgbGV0IGlmRW5kID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtc3RhdGVtZW50LWVuZCcsICd9Jyk7XG4gICAgICAgIGlmRW5kID0gdGhpcy5lbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGlmRW5kKTtcbiAgICAgICAgY29udGVudC5wdXNoKGlmRW5kKTtcbiAgICAgICAgc2libGluZ3MucHVzaChpZkVuZCk7XG5cbiAgICAgICAgLy9sZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtc3RhdGVtZW50JywgY29udGVudCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaWZTdGFydDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRWYXJpYWJsZURlY2xhcmF0aW9uKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdGlvbjtcbiAgICAgICAgbGV0IGRlY2xhcmF0aW9ucyA9IG4uZGVjbGFyYXRpb25zLm1hcChkID0+IHRoaXMuYnVpbGROb2RlKGQpKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZGVjbGFyYXRpb24gdmFyaWFibGUtZGVjbGFyYXRpb24nKTtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IG4ua2luZCArICcgJztcbiAgICAgICAgZGVjbGFyYXRpb25zLmZvckVhY2goZCA9PiBjb250YWluZXIuYXBwZW5kQ2hpbGQoZCkpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZFZhcmlhYmxlRGVjbGFyYXRvcihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRvcjtcbiAgICAgICAgbGV0IGxlZnRQYXJ0ID0gdGhpcy5idWlsZE5vZGUobi5pZCk7XG4gICAgICAgIGxldCBjb250YWluZXI7XG4gICAgICAgIGlmIChuLmluaXQpIHtcbiAgICAgICAgICAgIGxldCBhc3NpZ25QYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdvcGVyYXRvciBhc3NpZ24tb3BlcmF0b3InLCAnPScpO1xuICAgICAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5idWlsZE5vZGUobi5pbml0KTtcbiAgICAgICAgICAgIGxldCByaWdodFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLXZhbHVlJywgcmlnaHQpO1xuICAgICAgICAgICAgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIHZhcmlhYmxlLWRlY2xhcmF0b3InLCBbbGVmdFBhcnQsIGFzc2lnblBhcnQsIHJpZ2h0UGFydF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIHZhcmlhYmxlLWRlY2xhcmF0b3InLCBsZWZ0UGFydCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkQXNzaWdubWVudEV4cHJlc3Npb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLmJ1aWxkTm9kZShuLmxlZnQpO1xuICAgICAgICBsZXQgbGVmdFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLWlkJywgbGVmdCk7XG4gICAgICAgIGxldCBhc3NpZ25QYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdvcGVyYXRvciBhc3NpZ24tb3BlcmF0b3InLCAnPScpO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmJ1aWxkTm9kZShuLnJpZ2h0KTtcbiAgICAgICAgbGV0IHJpZ2h0UGFydCA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtdmFsdWUnLCByaWdodCk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gYXNzaWdubWVudC1leHByZXNzaW9uJywgW2xlZnRQYXJ0LCBhc3NpZ25QYXJ0LCByaWdodFBhcnRdKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRCaW5hcnlFeHByZXNzaW9uKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgQmluYXJ5RXhwcmVzc2lvbjtcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLmJ1aWxkTm9kZShuLmxlZnQpO1xuICAgICAgICBsZXQgbGVmdFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24nLCBsZWZ0KTtcbiAgICAgICAgbGV0IG9wZXJhdG9yUGFydCA9IEh0bWxIZWxwZXIuc3Bhbignb3BlcmF0b3IgZXhwcmVzc2lvbi1vcGVyYXRvcicsIG4ub3BlcmF0b3IpO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmJ1aWxkTm9kZShuLnJpZ2h0KTtcbiAgICAgICAgbGV0IHJpZ2h0UGFydCA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbicsIHJpZ2h0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiBiaW5hcnktZXhwcmVzc2lvbicsIFtsZWZ0UGFydCwgb3BlcmF0b3JQYXJ0LCByaWdodFBhcnRdKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRFeHByZXNzaW9uU3RhdGVtZW50KG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgRXhwcmVzc2lvblN0YXRlbWVudDtcbiAgICAgICAgbGV0IGNvZGUgPSB0aGlzLmJ1aWxkTm9kZShuLmV4cHJlc3Npb24pO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgZXhwcmVzc2lvbi1zdGF0ZW1lbnQnLCBjb2RlKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRSZXR1cm5TdGF0ZW1lbnQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBSZXR1cm5TdGF0ZW1lbnQ7XG4gICAgICAgIGxldCBhcmcgPSB0aGlzLmJ1aWxkTm9kZShuLmFyZ3VtZW50KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IHJldHVybi1zdGF0ZW1lbnQnLCBbJ3JldHVybiAnLCBhcmddKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRJZGVudGlmaWVyKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgSWRlbnRpZmllcjtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignaWRlbnRpZmllcicsIEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcobikpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZE1lbWJlckV4cHJlc3Npb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBNZW1iZXJFeHByZXNzaW9uO1xuICAgICAgICBsZXQgb2JqZWN0ID0gdGhpcy5idWlsZE5vZGUobi5vYmplY3QpO1xuICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLmJ1aWxkTm9kZShuLnByb3BlcnR5KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiBtZW1iZXItZXhwcmVzc2lvbicsIFtvYmplY3QsICcuJywgcHJvcGVydHldKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGREZWZhdWx0KG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zb2xlLmxvZygnZGVmYXVsdDonLCBub2RlKTtcbiAgICAgICAgbGV0IGNvZGUgPSBlc2NvZGVHZW5lcmF0ZShub2RlKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZGVmYXVsdC0nICsgbm9kZS50eXBlLCBjb2RlKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG59IiwiaW1wb3J0IHsgUHJvZ3JlbVN0YXRlLCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciwgTGluZUNoYW5nZUxpc3RlbmVyLCBGcmFtZUNoYW5nZUxpc3RlbmVyIH0gZnJvbSBcIi4vU2NoZWR1bGluZ1NlcnZpY2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+IHtcbiAgICBub2RlOiBBc3RCYXNlVHlwZVxuICAgIGNvZGU6IEFzdEJhc2VUeXBlXG59XG4vKlxuZXhwb3J0IGludGVyZmFjZSBWZXJzZUluc3RydWN0aW9uRmFjdG9yeTxBc3RCYXNlVHlwZT4ge1xuICAgIGJ1aWxkKHBhcmFtOiBBc3RCYXNlVHlwZSk6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT47XG59XG4qL1xuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtQ291cGxldDxBc3RCYXNlVHlwZT4ge1xuICAgIGZ1bmN0aW9uUm9vdE5vZGU6IEFzdEJhc2VUeXBlXG4gICAgdmVyc2VzOiBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+W11cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtRmFjdG9yeTxBc3RCYXNlVHlwZT4ge1xuICAgIGJ1aWxkUHJvZ3JlbShjb2RlOiBzdHJpbmcpOiBQcm9ncmVtQ29kZTxBc3RCYXNlVHlwZT5cbiAgICBidWlsZENvdXBsZXQobm9kZTogQXN0QmFzZVR5cGUsIHZlcnNlczogQXN0QmFzZVR5cGVbXSk6IFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPlxuICAgIGJ1aWxkVmVyc2Uobm9kZTogQXN0QmFzZVR5cGUpOiBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmVyc2VJdGVyYXRvcjxBc3RCYXNlVHlwZT4ge1xuICAgIGV4ZWN1dGVOZXh0KCk6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT5cbiAgICBoYXNOZXh0KCk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbUNvZGU8QXN0QmFzZVR5cGU+IHtcbiAgICBpbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpOiBQcm9ncmVtQ291cGxldDxBc3RCYXNlVHlwZT5cbiAgICBjb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk6IFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPlxuICAgIGl0ZXJhdG9yKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiBWZXJzZUl0ZXJhdG9yPEFzdEJhc2VUeXBlPlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1TY2hlZHVsZXIge1xuICAgIHN1YnNjcmliZUNvZGVFeGVjdXRpb24obGlzdGVuZXI6IENvZGVFeGVjdXRpb25MaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVHcmlkQ2hhbmdlKGxpc3RlbmVyOiBHcmlkQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlTGluZUNoYW5nZShsaXN0ZW5lcjogTGluZUNoYW5nZUxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUZyYW1lQ2hhbmdlKGxpc3RlbmVyOiBGcmFtZUNoYW5nZUxpc3RlbmVyKTogdm9pZFxuICAgIHJlc2V0KCk6IFByb2dyZW1TdGF0ZVxuICAgIGN1cnJlbnQoKTogUHJvZ3JlbVN0YXRlXG4gICAgbmV4dCgpOiBQcm9ncmVtU3RhdGVcbiAgICBnZXRQcm9ncmVtKCk6IFByb2dyZW1Db2RlPGFueT5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtVmlldyB7XG4gICAgYnVpbGRWaWV3KHNjaGVkdWxlcjogUHJvZ3JlbVNjaGVkdWxlcik6IEhUTUxFbGVtZW50XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3R5bGVEZWNvcmF0b3I8VD4ge1xuICAgIGRlY29yYXRlKG5vZGU6IFQsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnRcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSHRtbENvdXBsZXRGYWN0b3J5PEFzdEJhc2VUeXBlPiB7XG4gICAgYnVpbGRDb3VwbGV0KCk6IEhUTUxFbGVtZW50XG4gICAgZ2V0SHRtbFZlcnNlKHZlcnNlOiBQcm9ncmVtVmVyc2U8QXN0QmFzZVR5cGU+KTogSFRNTEVsZW1lbnRcbn1cblxuZXhwb3J0IGNsYXNzIFN0eWxlRGVjb3JhdG9yQWdncmVnYXRpb248VD4gaW1wbGVtZW50cyBTdHlsZURlY29yYXRvcjxUPiB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY29yYXRvcnM6IFN0eWxlRGVjb3JhdG9yPFQ+W10pIHt9XG5cbiAgICBkZWNvcmF0ZShub2RlOiBULCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IHRlbXA6IEhUTUxFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5kZWNvcmF0b3JzLmZvckVhY2goZCA9PiB0ZW1wID0gZC5kZWNvcmF0ZShub2RlLCB0ZW1wKSk7XG4gICAgICAgIHJldHVybiB0ZW1wO1xuICAgIH1cblxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvcmF0b3JzLm1hcChkID0+IGQuYnVpbGRTdHlsZVNoZWV0KCkpLmpvaW4oJ1xcbicpO1xuICAgIH1cblxufVxuXG5cbiIsImltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcbmltcG9ydCB7IENvZGVTZXJ2aWNlIH0gZnJvbSBcIi4vQ29kZVNlcnZpY2VcIjtcbmltcG9ydCB7IFNjaGVkdWxpbmdTZXJ2aWNlIH0gZnJvbSAnLi9TY2hlZHVsaW5nU2VydmljZSc7XG5pbXBvcnQgeyBQcm9ncmVtSW5zcGVjdG9yVmlldyB9IGZyb20gJy4vUHJvZ3JlbUluc3BlY3Rvcic7XG5pbXBvcnQgeyBCYXNpY0NhbnZhc1Byb2dyZW1HcmlkIH0gZnJvbSAnLi9Qcm9ncmVtR3JpZCc7XG5pbXBvcnQgeyBTY3JlZW5Db25maWcgfSBmcm9tICcuL1NjcmVlblNlcnZpY2UnO1xuaW1wb3J0IHsgQmFzZU5vZGUgfSBmcm9tICdlc3RyZWUnO1xuaW1wb3J0IHsgU3R5bGVEZWNvcmF0b3JBZ2dyZWdhdGlvbiwgUHJvZ3JlbVNjaGVkdWxlciB9IGZyb20gJy4vVHlwZXMnO1xuaW1wb3J0IHsgUGFkVmVyc2VEZWNvcmF0b3IsIENvbG9yVmVyc2VWYXJpYWJsZURlY29yYXRvciwgSGlnaGxpZ2h0RXhlY3V0aW5nVmVyc2VEZWNvcmF0b3IgfSBmcm9tICcuL0VzdHJlZVN0eWxlRGVjb3JhdG9yJztcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tICcuL0h0bWxIZWxwZXInO1xuaW1wb3J0IHsgRXNwcmltYVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeSB9IGZyb20gJy4vRXN0cmVlUHJvZ3JlbUluc3BlY3Rvckh0bWxGYWN0b3J5JztcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1Db25maWcge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY29sb25uZXM6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGxpZ25lczogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZnJhbWVzOiBudW1iZXIsXG4gICAgKSB7fVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFByb2dyZW1TZXJ2aWNlIHtcblxuICAgIHZhciBwcmV2aW91c1JlcGFpbnRUaW1lID0gMDtcbiAgICB2YXIgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyO1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJvZ3JlbSh1cmw6IHN0cmluZywgc2NyZWVuQ29uZmlnOiBTY3JlZW5Db25maWcsIHByb2dyZW1Db25maWc6IFByb2dyZW1Db25maWcpIHtcbiAgICAgICAgbGV0IHByb2dyZW1TY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgcHJvZ3JlbVNjcmlwdC5zcmMgPSB1cmw7XG4gICAgICAgIGxldCBib2R5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgICAgaWYgKGJvZHlFbGVtZW50KSB7XG4gICAgICAgICAgICBib2R5RWxlbWVudC5hcHBlbmRDaGlsZChwcm9ncmVtU2NyaXB0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIENvZGVTZXJ2aWNlLmxvYWRQcm9ncmVtKHVybCkudGhlbihjb2RlID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9ncmVtQ29kZSA9IENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkUHJvZ3JlbShjb2RlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9ncmVtIEFTVDonLCBwcm9ncmVtQ29kZS5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKTtcblxuICAgICAgICAgICAgLy8gTG9hZCBpbml0UHJvZ3JlbSBGdW5jdGlvbiBjb2RlXG4gICAgICAgICAgICBsZXQgaW5pdFByb2dyZW1GdW5jdGlvbkNvZGUgPSBlc2NvZGVHZW5lcmF0ZShwcm9ncmVtQ29kZS5pbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpLmZ1bmN0aW9uUm9vdE5vZGUpO1xuICAgICAgICAgICAgKHdpbmRvdyBhcyBhbnkpLmV2YWwoaW5pdFByb2dyZW1GdW5jdGlvbkNvZGUpO1xuXG4gICAgICAgICAgICBzY2hlZHVsZXIgPSBTY2hlZHVsaW5nU2VydmljZS5idWlsZFByb2dyZW1TY2hlZHVsZXIocHJvZ3JlbUNvbmZpZywgcHJvZ3JlbUNvZGUpO1xuXG4gICAgICAgICAgICAvL2xldCBwcm9ncmVtSW5zcGVjdG9yID0gbmV3IEJhc2ljSHRtbEVzcHJpbWFQcm9ncmVtSW5zcGVjdG9yKHByb2dyZW1Db2RlLCBzY2hlZHVsZXIsIGRvY3VtZW50KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JEZWNvcmF0b3JzID0gbmV3IFN0eWxlRGVjb3JhdG9yQWdncmVnYXRpb248QmFzZU5vZGU+KFtcbiAgICAgICAgICAgICAgICBuZXcgUGFkVmVyc2VEZWNvcmF0b3IoKSxcbiAgICAgICAgICAgICAgICBuZXcgQ29sb3JWZXJzZVZhcmlhYmxlRGVjb3JhdG9yKCksXG4gICAgICAgICAgICAgICAgLy9uZXcgSGlnaGxpZ2h0RXhlY3V0aW5nVmVyc2VEZWNvcmF0b3Ioc2NoZWR1bGVyKSxcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JGYWN0b3J5ID0gbmV3IEVzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkocHJvZ3JlbUNvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbigpLCBwcm9ncmVtSW5zcGVjdG9yRGVjb3JhdG9ycyk7XG4gICAgICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3RvclZpZXcgPSBuZXcgUHJvZ3JlbUluc3BlY3RvclZpZXcoc2NoZWR1bGVyLCBwcm9ncmVtSW5zcGVjdG9yRmFjdG9yeSk7XG5cbiAgICAgICAgICAgIGxldCBjb2RlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCcuY29kZScpO1xuICAgICAgICAgICAgaWYgKGNvZGVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnY29kZUVsZW1lbnQnLCBjb2RlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQgPSBwcm9ncmVtSW5zcGVjdG9yVmlldy5idWlsZFZpZXcoc2NoZWR1bGVyKTtcbiAgICAgICAgICAgICAgICBjb2RlRWxlbWVudC5hcHBlbmRDaGlsZChwcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50KTtcblxuICAgICAgICAgICAgICAgIGxldCBkZWNvcmF0b3JTdHlsZSA9IHByb2dyZW1JbnNwZWN0b3JEZWNvcmF0b3JzLmJ1aWxkU3R5bGVTaGVldCgpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2RlY29yYXRvclN0eWxlOicsIGRlY29yYXRvclN0eWxlKVxuICAgICAgICAgICAgICAgIEh0bWxIZWxwZXIuZGVmaW5lQ3NzUnVsZXMoJ3Byb2dyZW0taW5zcGVjdG9yJywgZGVjb3JhdG9yU3R5bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgZ3JpZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZ3JlbScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dyaWRFbGVtZW50JywgZ3JpZEVsZW1lbnQpO1xuICAgICAgICAgICAgbGV0IHByb2dyZW1HcmlkID0gbmV3IEJhc2ljQ2FudmFzUHJvZ3JlbUdyaWQoc2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnKTtcbiAgICAgICAgICAgIHByb2dyZW1HcmlkLmF0dGFjaChncmlkRWxlbWVudCk7XG4gICAgICAgICAgICBwcm9ncmVtR3JpZC5jbGVhcigpO1xuICAgICAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUdyaWRDaGFuZ2UocHJvZ3JlbUdyaWQpO1xuXG4gICAgICAgICAgICB0aW1lcigwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGltZXIodGltZXN0YW1wOiBudW1iZXIpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aW1lcik7XG5cbiAgICAgICAgaWYgKHRpbWVzdGFtcCAtIHByZXZpb3VzUmVwYWludFRpbWUgPCAxNTAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2aW91c1JlcGFpbnRUaW1lID0gdGltZXN0YW1wO1xuXG4gICAgICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgICAgICAgIHNjaGVkdWxlci5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJcbmV4cG9ydCBjbGFzcyBTY3JlZW5Db25maWcge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm94U2l6ZTogbnVtYmVyXG4gICAgKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgU2NyZWVuU2VydmljZSB7XG5cbiAgICBwdWJsaWMgZ2V0U2NyZWVuRnJhbWUoKTogYW55IHtcblxuICAgIH1cblxufSIsIlxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEh0bWxIZWxwZXIge1xuXG4gICAgc3RhdGljIGFkZENsYXNzZXMoZWx0OiBIVE1MRWxlbWVudCwgY2xhc3Nlczogc3RyaW5nfHN0cmluZ1tdKTogdm9pZCB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xhc3NlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNsYXNzZXMuc3BsaXQoJyAnKS5mb3JFYWNoKGMgPT4gZWx0LmNsYXNzTGlzdC5hZGQoYykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNsYXNzZXMpKSB7XG4gICAgICAgICAgICBjbGFzc2VzLmZvckVhY2goYyA9PiBlbHQuY2xhc3NMaXN0LmFkZChjKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgc3BhbihjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGVsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBpZiAoY2xhc3Nlcykge1xuICAgICAgICAgICAgSHRtbEhlbHBlci5hZGRDbGFzc2VzKGVsdCwgY2xhc3Nlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBlbHQuaW5uZXJUZXh0ID0gY29udGVudDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjb250ZW50OiBbJHtjb250ZW50fV1gKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb250ZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsdC5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNvbnRlbnQpKSB7XG4gICAgICAgICAgICBjb250ZW50LmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBlbHQuaW5uZXJIVE1MICs9IGM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsdC5hcHBlbmRDaGlsZChjKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIGFkZCBjb250ZW50OicsIGMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBlbHQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmluZUNzc1J1bGVzKGlkOiBzdHJpbmcsIGNzc1J1bGVzOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgbGV0IGNzc0lkID0gJ2Nzcy0nICsgaWQ7XG4gICAgICAgIGxldCBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjc3NJZCk7XG4gICAgICAgIGlmKCFzdHlsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgc3R5bGVFbGVtZW50LmlkID0gY3NzSWQ7XG4gICAgICAgIC8qIGFkZCBzdHlsZSBydWxlcyB0byB0aGUgc3R5bGUgZWxlbWVudCAqL1xuICAgICAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzUnVsZXMpKTtcbiAgICAgICAgXG4gICAgICAgIC8qIGF0dGFjaCB0aGUgc3R5bGUgZWxlbWVudCB0byB0aGUgZG9jdW1lbnQgaGVhZCAqL1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG4gICAgfVxufSIsImltcG9ydCB7IFByb2dyZW1Db25maWcgfSBmcm9tIFwiLi9Qcm9ncmVtU2VydmljZVwiO1xuaW1wb3J0IHsgRXZhbFNjb3BlIH0gZnJvbSBcIi4vRXZhbFNlcnZpY2VcIjtcbmltcG9ydCB7IFByb2dyZW1TY2hlZHVsZXIsIFZlcnNlSW5zdHJ1Y3Rpb24sIFZlcnNlSXRlcmF0b3IsIFByb2dyZW1Db2RlIH0gZnJvbSBcIi4vVHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1TdGF0ZSB7XG5cbiAgICBwdWJsaWMgcmVhZG9ubHkgZXZhbFNjb3BlID0gbmV3IEV2YWxTY29wZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY29sb25uZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbGlnbmU6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGZyYW1lOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBjb250ZXh0ZTogb2JqZWN0LFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdmVyc2U6IFZlcnNlSW5zdHJ1Y3Rpb248YW55PiB8IG51bGwsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGV2YWwoZXhwcjogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZhbFNjb3BlLmdsb2JhbEV2YWwoZXhwcik7XG4gICAgfVxufVxuXG50eXBlIE5ld1N0YXRlQ2FsbGJhY2sgPSAoc3RhdGU6IFByb2dyZW1TdGF0ZSkgPT4gdm9pZDtcbmV4cG9ydCBpbnRlcmZhY2UgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyIHtmaXJlQ29kZUV4ZWN1dGlvbjogTmV3U3RhdGVDYWxsYmFja307XG5leHBvcnQgaW50ZXJmYWNlIEdyaWRDaGFuZ2VMaXN0ZW5lciB7ZmlyZUdyaWRDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBMaW5lQ2hhbmdlTGlzdGVuZXIge2ZpcmVMaW5lQ2hhbmdlOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgRnJhbWVDaGFuZ2VMaXN0ZW5lciB7ZmlyZUZyYW1lQ2hhbmdlOiBOZXdTdGF0ZUNhbGxiYWNrfTtcblxuLypcbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbVNjaGVkdWxlciB7XG4gICAgc3Vic2NyaWJlQ29kZUV4ZWN1dGlvbihsaXN0ZW5lcjogQ29kZUV4ZWN1dGlvbkxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUdyaWRDaGFuZ2UobGlzdGVuZXI6IEdyaWRDaGFuZ2VMaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVMaW5lQ2hhbmdlKGxpc3RlbmVyOiBMaW5lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlRnJhbWVDaGFuZ2UobGlzdGVuZXI6IEZyYW1lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG5cbiAgICByZXNldCgpOiBQcm9ncmVtU3RhdGVcbiAgICBjdXJyZW50KCk6IFByb2dyZW1TdGF0ZVxuICAgIG5leHQoKTogUHJvZ3JlbVN0YXRlXG59XG4qL1xuXG5jbGFzcyBTaW1wbGVQcm9ncmVtU2NoZWR1bGVyIGltcGxlbWVudHMgUHJvZ3JlbVNjaGVkdWxlciB7XG4gICAgXG4gICAgcHJpdmF0ZSBzdGF0ZTogUHJvZ3JlbVN0YXRlO1xuICAgIHByaXZhdGUgY29kZUl0ZXJhdG9yOiBWZXJzZUl0ZXJhdG9yPGFueT4gfCBudWxsID0gbnVsbDtcblxuICAgIHByaXZhdGUgY29kZUV4ZWN1dGlvbkxpc3RlbmVyczogQ29kZUV4ZWN1dGlvbkxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGdyaWRDaGFuZ2VMaXN0ZW5lcnM6IEdyaWRDaGFuZ2VMaXN0ZW5lcltdID0gW107XG4gICAgcHJpdmF0ZSBsaW5lQ2hhbmdlTGlzdGVuZXJzOiBMaW5lQ2hhbmdlTGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgZnJhbWVDaGFuZ2VMaXN0ZW5lcnM6IEZyYW1lQ2hhbmdlTGlzdGVuZXJbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IFByb2dyZW1Db25maWcsIHByaXZhdGUgY29kZTogUHJvZ3JlbUNvZGU8YW55Pikge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5yZXNldCgpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZUNvZGVFeGVjdXRpb24obGlzdGVuZXI6IENvZGVFeGVjdXRpb25MaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvZGVFeGVjdXRpb25MaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfSAgICBcbiAgICBcbiAgICBzdWJzY3JpYmVHcmlkQ2hhbmdlKGxpc3RlbmVyOiBHcmlkQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ncmlkQ2hhbmdlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZUxpbmVDaGFuZ2UobGlzdGVuZXI6IExpbmVDaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmxpbmVDaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlRnJhbWVDaGFuZ2UobGlzdGVuZXI6IEZyYW1lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mcmFtZUNoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICByZXNldCgpOiBQcm9ncmVtU3RhdGUge1xuICAgICAgICAvLyBDYWxsIGp1c3QgZXZhbHVhdGVkIGluaXRpYWxpc2VyUHJvZ3JlbSBmdW5jdGlvblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGxldCBpbml0aWFsQ29udGV4dGU6IG9iamVjdCA9IGluaXRpYWxpc2VyUHJvZ3JlbSh0aGlzLmNvbmZpZy5jb2xvbm5lcywgdGhpcy5jb25maWcubGlnbmVzKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0xvYWRlZCBpbml0aWFsIGNvbnRleHRlOiAnLCBpbml0aWFsQ29udGV4dGUpO1xuICAgICAgICBsZXQgc3RhdGUgPSBuZXcgUHJvZ3JlbVN0YXRlKDAsIDAsIDAsIGluaXRpYWxDb250ZXh0ZSwgbnVsbCk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBjdXJyZW50KCk6IFByb2dyZW1TdGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cblxuICAgIG5leHQoKTogUHJvZ3JlbVN0YXRlIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlKSB0aHJvdyBuZXcgRXJyb3IoJ0luY29uc2lzdGVudCBQcm9ncmVtIHN0YXRlICEnKTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvZGVJdGVyYXRvciA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNvZGVJdGVyYXRvciA9IHRoaXMuY29kZS5pdGVyYXRvcih0aGlzLnN0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2hhc05leHQ6JywgdGhpcy5jb2RlSXRlcmF0b3IuaGFzTmV4dCgpKTtcblxuICAgICAgICBpZiAodGhpcy5jb2RlSXRlcmF0b3IuaGFzTmV4dCgpKSB7XG4gICAgICAgICAgICBsZXQgc3RhdGVtZW50ID0gdGhpcy5jb2RlSXRlcmF0b3IuZXhlY3V0ZU5leHQoKTtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IG5ldyBQcm9ncmVtU3RhdGUodGhpcy5zdGF0ZS5jb2xvbm5lLCB0aGlzLnN0YXRlLmxpZ25lLCB0aGlzLnN0YXRlLmZyYW1lLCB0aGlzLnN0YXRlLmNvbnRleHRlLCBzdGF0ZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICAgICAgdGhpcy5jb2RlRXhlY3V0aW9uTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUNvZGVFeGVjdXRpb24obmV3U3RhdGUpKTtcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0ZpbmlzaGVkIGl0ZXJhdGluZyBvdmVyIGNvZGUuJylcblxuICAgICAgICBsZXQgbm90aWZ5UGl4ZWxDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgbGV0IG5vdGlmeUxpbmVDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgbGV0IG5vdGlmeUZyYW1lQ2hhbmdlID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IF9jb2xvbm5lID0gdGhpcy5zdGF0ZS5jb2xvbm5lO1xuICAgICAgICBsZXQgX2xpZ25lID0gdGhpcy5zdGF0ZS5saWduZTtcbiAgICAgICAgbGV0IF9mcmFtZSA9IHRoaXMuc3RhdGUuZnJhbWU7XG5cbiAgICAgICAgX2NvbG9ubmUgKys7XG4gICAgICAgIG5vdGlmeVBpeGVsQ2hhbmdlID0gdHJ1ZTtcblxuICAgICAgICBpZiAoX2NvbG9ubmUgPj0gdGhpcy5jb25maWcuY29sb25uZXMpIHtcbiAgICAgICAgICAgIF9jb2xvbm5lID0gMDtcbiAgICAgICAgICAgIF9saWduZSArKztcbiAgICAgICAgICAgIG5vdGlmeUxpbmVDaGFuZ2UgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9saWduZSA+IHRoaXMuY29uZmlnLmxpZ25lcykge1xuICAgICAgICAgICAgX2xpZ25lID0gMDtcbiAgICAgICAgICAgIF9mcmFtZSArKztcbiAgICAgICAgICAgIG5vdGlmeUZyYW1lQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfZnJhbWUgPiB0aGlzLmNvbmZpZy5mcmFtZXMpIHtcbiAgICAgICAgICAgIF9mcmFtZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmV3U3RhdGUgPSBuZXcgUHJvZ3JlbVN0YXRlKF9jb2xvbm5lLCBfbGlnbmUsIF9mcmFtZSwgdGhpcy5zdGF0ZS5jb250ZXh0ZSwgbnVsbCk7XG4gXG4gICAgICAgIGlmIChub3RpZnlQaXhlbENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5ncmlkQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUdyaWRDaGFuZ2UodGhpcy5zdGF0ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vdGlmeUxpbmVDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMubGluZUNoYW5nZUxpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVMaW5lQ2hhbmdlKHRoaXMuc3RhdGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub3RpZnlGcmFtZUNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5mcmFtZUNoYW5nZUxpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVGcmFtZUNoYW5nZSh0aGlzLnN0YXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgIHRoaXMuY29kZUl0ZXJhdG9yID0gdGhpcy5jb2RlLml0ZXJhdG9yKG5ld1N0YXRlKTtcblxuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFByb2dyZW0oKTogUHJvZ3JlbUNvZGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvZGU7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFNjaGVkdWxpbmdTZXJ2aWNlIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFByb2dyZW1TY2hlZHVsZXIoY29uZmlnOiBQcm9ncmVtQ29uZmlnLCBjb2RlOiBQcm9ncmVtQ29kZTxhbnk+KSB7XG4gICAgICAgIHJldHVybiBuZXcgU2ltcGxlUHJvZ3JlbVNjaGVkdWxlcihjb25maWcsIGNvZGUpO1xuICAgIH1cblxufSIsImltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcbmltcG9ydCB7IGNyZWF0ZSBhcyBtZDVDcmVhdGUgfSBmcm9tICdqcy1tZDUnO1xuaW1wb3J0IHsgRnVuY3Rpb25EZWNsYXJhdGlvbiwgQmFzZU5vZGUsIEJsb2NrU3RhdGVtZW50LCBJZlN0YXRlbWVudCwgRXhwcmVzc2lvbiwgVmFyaWFibGVEZWNsYXJhdGlvbiwgVmFyaWFibGVEZWNsYXJhdG9yLCBFeHByZXNzaW9uU3RhdGVtZW50LCBBc3NpZ25tZW50RXhwcmVzc2lvbiwgUmV0dXJuU3RhdGVtZW50LCBDb25kaXRpb25hbEV4cHJlc3Npb24sIEJpbmFyeUV4cHJlc3Npb24gfSBmcm9tICdlc3RyZWUnO1xuaW1wb3J0IHsgUHJvZ3JlbVN0YXRlLCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciB9IGZyb20gJy4vU2NoZWR1bGluZ1NlcnZpY2UnO1xuaW1wb3J0IHsgQXN0SGVscGVyIH0gZnJvbSAnLi9Bc3RIZWxwZXInO1xuaW1wb3J0IHsgRnVuY3Rpb25EZWNsYXJhdGlvblRvSHRtbFRyZWVTdG9yZSwgQ29kZVNwb29sZXJFc1RvSHRtbFRyZWVNYXBwZXJGYWN0b3J5LCBFc1RvSHRtbFRyZWVTdG9yZSB9IGZyb20gJy4vSHRtbFRyZWUnO1xuaW1wb3J0IHsgUHJvZ3JlbUNvZGUsIFByb2dyZW1WaWV3LCBQcm9ncmVtU2NoZWR1bGVyLCBIdG1sQ291cGxldEZhY3RvcnkgfSBmcm9tICcuL1R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtSW5zcGVjdG9yIHtcbiAgICBjbGVhcigpOiB2b2lkO1xuICAgIGF0dGFjaChlbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwpOiB2b2lkXG59XG5cbi8qXG5leHBvcnQgY2xhc3MgQmFzaWNIdG1sRXNwcmltYVByb2dyZW1JbnNwZWN0b3IgaW1wbGVtZW50cyBQcm9ncmVtSW5zcGVjdG9yLCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciB7XG4gICAgXG4gICAgcHJpdmF0ZSBwcm9ncmVtQ29kZUxpbmVzOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgcHJpdmF0ZSBhdHRhY2hlZEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBtYXBwaW5nOiBNYXA8QmFzZU5vZGUsIEhUTUxFbGVtZW50PiA9IG5ldyBNYXAoKTtcbiAgICBwcml2YXRlIGhpbnRTdGFja0NvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICAgIHByaXZhdGUgdHJlZVN0b3JlMTogRXNUb0h0bWxUcmVlU3RvcmU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBwcm9ncmVtQ29kZTogRXNwcmltYVByb2dyZW1Db2RlLFxuICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogUHJvZ3JlbVNjaGVkdWxlcixcbiAgICAgICAgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50XG4gICAgKSB7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVDb2RlRXhlY3V0aW9uKHRoaXMpO1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlR3JpZENoYW5nZSh0aGlzKTtcbiAgICAgICAgLy90aGlzLmJ1aWxkSHRtbFRyZWUyKCk7XG4gICAgICAgIHRoaXMudHJlZVN0b3JlMSA9IHRoaXMuYnVpbGRIdG1sVHJlZTMoKTtcbiAgICB9XG5cbiAgICBhdHRhY2gwKGVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCk6IHZvaWQge1xuICAgICAgICB0aGlzLmF0dGFjaGVkRWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGxldCBjb2RlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb2RlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvZGVDb250YWluZXInKTtcbiAgICAgICAgICAgIHRoaXMuaGludFN0YWNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLmhpbnRTdGFja0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaW50Q29udGFpbmVyJyk7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNvZGVDb250YWluZXIpO1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmhpbnRTdGFja0NvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIHRoaXMucHJvZ3JlbUNvZGVMaW5lcy5tYXAoZWx0ID0+IHsgY29kZUNvbnRhaW5lci5hcHBlbmRDaGlsZChlbHQpIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXR0YWNoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXR0YWNoZWRFbGVtZW50ID0gZWxlbWVudDtcblxuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy50cmVlU3RvcmUxLnBhaW50SW50byhlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyMCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb2xvck1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgaWYgKHRoaXMuaGludFN0YWNrQ29udGFpbmVyKVxuICAgICAgICAgICAgdGhpcy5oaW50U3RhY2tDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgdGhpcy5tYXBwaW5nLmZvckVhY2goKGVsdCwgbm9kZSkgPT4gZWx0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZ2hsaWdodCcpKTtcbiAgICB9XG5cbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb2xvck1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy50cmVlU3RvcmUxLnJlc2V0U3R5bGUoKTtcbiAgICAgICAgaWYgKHRoaXMuaGludFN0YWNrQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmhpbnRTdGFja0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb2xvck1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKTtcblxuICAgIHByaXZhdGUgaHNsQ29sb3IoaHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2hzbCgnICsgaHVlICsgJywgMTAwJSwgODAlKSc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNoU3RyaW5nVG9Db2xvcihrZXk6IHN0cmluZykge1xuICAgICAgICBsZXQgc2hpZnQgPSAyO1xuICAgICAgICBsZXQgY29sb3JDb3VudCA9IDEyO1xuXG4gICAgICAgIHZhciBodWUgPSB0aGlzLmNvbG9yTWFwLmdldChrZXkpO1xuICAgICAgICBpZiAoaHVlKSByZXR1cm4gdGhpcy5oc2xDb2xvcihodWUpO1xuXG4gICAgICAgIHZhciBoYXNoID0gbWQ1Q3JlYXRlKCkudXBkYXRlKGtleSkudG9TdHJpbmcoKTtcbiAgICAgICAgXG4gICAgICAgIGh1ZSA9ICggcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAwLCBzaGlmdCArIDEpLCAxNikgKyAxNiAqIHBhcnNlSW50KGhhc2guc3Vic3RyaW5nKHNoaWZ0ICsgMSwgc2hpZnQgKyAyKSwgMTYpICsgMjU2ICogcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAyLCBzaGlmdCArIDMpLCAxNikgKTtcbiAgICAgICAgaHVlID0gTWF0aC5mbG9vcihodWUgJSBjb2xvckNvdW50KSAqIDM2MCAvIGNvbG9yQ291bnQ7XG5cbiAgICAgICAgd2hpbGUgKCF0aGlzLmNvbG9yTWFwLmdldChrZXkpKSB7XG4gICAgICAgICAgICBsZXQgZHVwbGljYXRlQ29sb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGMgb2YgdGhpcy5jb2xvck1hcC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChjID09PSBodWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZHVwbGljYXRlQ29sb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBodWUgKz0gTWF0aC5mbG9vcigzNjAgLyBjb2xvckNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkdXBsaWNhdGVDb2xvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JNYXAuc2V0KGtleSwgaHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy92YXIgcGFzdGVsID0gJ2hzbCgnICsgaHVlICsgJywgMTAwJSwgODcuNSUpJztcbiAgICAgICAgcmV0dXJuIHRoaXMuaHNsQ29sb3IoaHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZmlyZUNvZGVFeGVjdXRpb24oc3RhdGU6IFByb2dyZW1TdGF0ZSkge1xuICAgICAgICBpZiAoc3RhdGUudmVyc2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVjZWl2ZWQgYSBudWxsIHN0YXRlbWVudCAhJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3RoaXMubWFwcGluZy5mb3JFYWNoKChlbHQsIG5vZGUpID0+IGVsdC5jbGFzc0xpc3QucmVtb3ZlKCdoaWdobGlnaHQnKSk7XG4gICAgICAgIHRoaXMudHJlZVN0b3JlMS5yZW1vdmVTdHlsZUNsYXNzZXMoWydoaWdobGlnaHQnXSk7XG5cbiAgICAgICAgbGV0IGV4ZWN1dGVkTm9kZSA9IHN0YXRlLnZlcnNlLmFzdFJvb3ROb2RlO1xuICAgICAgICAvL2xldCBodG1sTm9kZSA9IHRoaXMubWFwcGluZy5nZXQoZXhlY3V0ZWROb2RlKTtcbiAgICAgICAgLy9pZiAoIWh0bWxOb2RlKSB7XG4gICAgICAgIC8vICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZvdW5kIGEgSFRNTCBlbGVtZW50IG1hcHBlZCBmb3IgcmVjZWl2ZWQgc3RhdGVtZW50ICEnKVxuICAgICAgICAvL31cbiAgICAgICAgLy9odG1sTm9kZS5jbGFzc0xpc3QuYWRkKCdoaWdobGlnaHQnKTtcbiAgICAgICAgdGhpcy50cmVlU3RvcmUxLmFkZFN0eWxlQ2xhc3NlcyhleGVjdXRlZE5vZGUsIFsnaGlnaGxpZ2h0J10pO1xuXG4gICAgICAgIGlmICh0aGlzLmhpbnRTdGFja0NvbnRhaW5lcikge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBBc3RIZWxwZXIucmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24oZXhlY3V0ZWROb2RlKTtcbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkZWNsID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZGVjbC5kZWNsYXJhdGlvbnMubWFwKGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGludCA9IHRoaXMuYXBwZW5kSGludCh0aGlzLmhpbnRTdGFja0NvbnRhaW5lciwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBBc3RIZWxwZXIucGF0dGVyblRvU3RyaW5nKGQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhclZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuaW5pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhclZhbHVlID0gc3RhdGUuZXZhbFNjb3BlLmdsb2JhbEV2YWwoZXNjb2RlR2VuZXJhdGUoZC5pbml0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBoaW50LmlubmVySFRNTCA9IHZhck5hbWUgKyAnID0gJyArIHZhclZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGludC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKHZhck5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBwRWx0ID0gdGhpcy5tYXBwaW5nLmdldChkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHBFbHQpIHBFbHQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5oYXNoU3RyaW5nVG9Db2xvcih2YXJOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZVN0b3JlMS5zZXRTdHlsZVByb3BlcnR5KGQsICdiYWNrZ3JvdW5kQ29sb3InLCB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKHZhck5hbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlY2wgPSBub2RlIGFzIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBsZXQgaGludCA9IHRoaXMuYXBwZW5kSGludCh0aGlzLmhpbnRTdGFja0NvbnRhaW5lciwgW10pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcoZGVjbC5sZWZ0KTtcbiAgICAgICAgICAgICAgICAgICAgaGludC5pbm5lckhUTUwgPSB2YXJOYW1lICsgJyA9ICcgKyBzdGF0ZS5ldmFsU2NvcGUuZ2xvYmFsRXZhbCh2YXJOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaGludC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKHZhck5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IHBFbHQgPSB0aGlzLm1hcHBpbmcuZ2V0KGRlY2wpO1xuICAgICAgICAgICAgICAgICAgICAvL2lmIChwRWx0KSBwRWx0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IodmFyTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZVN0b3JlMS5zZXRTdHlsZVByb3BlcnR5KGRlY2wsICdiYWNrZ3JvdW5kQ29sb3InLCB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKHZhck5hbWUpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmdW5jID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIGZ1bmMucGFyYW1zLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcocCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFyVmFsdWUgPSBzdGF0ZS5ldmFsU2NvcGUuZ2xvYmFsRXZhbCh2YXJOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhpbnQgPSB0aGlzLmFwcGVuZEhpbnQodGhpcy5oaW50U3RhY2tDb250YWluZXIsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQuaW5uZXJIVE1MID0gdmFyTmFtZSArICcgPSAnICsgdmFyVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBoaW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IodmFyTmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHBFbHQgPSB0aGlzLm1hcHBpbmcuZ2V0KHApO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAocEVsdCkgcEVsdC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKHZhck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlU3RvcmUxLnNldFN0eWxlUHJvcGVydHkocCwgJ2JhY2tncm91bmRDb2xvcicsIHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IodmFyTmFtZSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHB1YmxpYyBmaXJlR3JpZENoYW5nZShzdGF0ZTogUHJvZ3JlbVN0YXRlKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGVuZENvZGVMaW5lKHBhcmVudDogSFRNTEVsZW1lbnQsIHBhZGRpbmc6IG51bWJlcik6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGVsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwcmVcIik7XG4gICAgICAgIGVsdC5jbGFzc0xpc3QuYWRkKCdwYWRkaW5nLScgKyBwYWRkaW5nKTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsdCk7XG5cbiAgICAgICAgcmV0dXJuIGVsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGVuZFNwYW4ocGFyZW50OiBIVE1MRWxlbWVudCwgaHRtbENsYXNzOiBzdHJpbmdbXSwgdGV4dCA9IFwiXCIpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBlbHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgaHRtbENsYXNzLmZvckVhY2goYyA9PiBlbHQuY2xhc3NMaXN0LmFkZChjKSk7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbHQpO1xuICAgICAgICBlbHQuaW5uZXJUZXh0ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIGVsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGVuZEhpbnQocGFyZW50OiBIVE1MRWxlbWVudCwgaHRtbENsYXNzOiBzdHJpbmdbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IHByZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwcmVcIik7XG4gICAgICAgIGxldCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGh0bWxDbGFzcy5mb3JFYWNoKGMgPT4gcHJlLmNsYXNzTGlzdC5hZGQoYykpO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQocHJlKTtcbiAgICAgICAgcHJlLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICByZXR1cm4gc3BhbjtcbiAgICB9XG5cbiAgICAvLyBCdWlsZCBIVE1MIEluc3BlY3RvciBieSBjcmF3bGluZyByZWN1cnNpdmVseSBBU1Qgc3RhY2tzXG4gICAgcHJpdmF0ZSB1bnN0YWNrQXN0KHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzdGFjazogQmFzZU5vZGVbXSwgcGFkZGluZzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHN0YWNrLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICBpZiAoIW5vZGUpIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBiZSBhYmxlIHRvIHNoaWZ0IGEgbnVsbCBub2RlICEnKTtcblxuICAgICAgICAgICAgbGV0IGxpbmUsIHN0YXJ0TGluZTogSFRNTEVsZW1lbnQsIGVuZExpbmUsIG4sIHZhclNwYW4sIGxlZnRTcGFuLCByaWdodFNwYW47XG4gICAgICAgICAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Jsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgQmxvY2tTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChwYXJlbnRFbGVtZW50LCBuLmJvZHksIHBhZGRpbmcgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdGdW5jdGlvbkRlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChub2RlLCBzdGFydExpbmUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobi5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmFwcGVuZFNwYW4oc3RhcnRMaW5lLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9ICdmdW5jdGlvbiAnICsgbi5pZC5uYW1lICsgJyAoICc7Ly8gKyBmdW5jLnBhcmFtcy5tYXAoeCA9PiB4Lm5hbWUpLmpvaW4oJywgJykgKyAnICkgeyc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXMuYXBwZW5kU3BhbihzdGFydExpbmUsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gJ2Z1bmN0aW9uICggJzsvLyArIGZ1bmMucGFyYW1zLm1hcCh4ID0+IHgubmFtZSkuam9pbignLCAnKSArICcgKSB7JztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJhbUNvdW50ID0gbi5wYXJhbXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBuLnBhcmFtcy5mb3JFYWNoKChwYXJhbSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBBc3RIZWxwZXIucGF0dGVyblRvU3RyaW5nKHBhcmFtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuID0gdGhpcy5hcHBlbmRTcGFuKHN0YXJ0TGluZSwgWyd2YXJJZCddLCB2YXJOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQocGFyYW0sIHNwYW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCBwYXJhbUNvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuID0gdGhpcy5hcHBlbmRTcGFuKHN0YXJ0TGluZSwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gJywgJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmFwcGVuZFNwYW4oc3RhcnRMaW5lLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MICs9ICcgKSB7JztcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QocGFyZW50RWxlbWVudCwgbi5ib2R5LmJvZHksIHBhZGRpbmcgKyAxKTtcblxuICAgICAgICAgICAgICAgICAgICBlbmRMaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgZW5kTGluZS5pbm5lckhUTUwgPSAnfSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnSWZTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBJZlN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChuLnRlc3QsIHN0YXJ0TGluZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vc3RhcnRMaW5lLmlubmVySFRNTCA9ICdpZiAoIDxzcGFuPicgKyBFc2NvZGVnZW4uZ2VuZXJhdGUoaWZzdG10LnRlc3QpICsgJzwvc3Bhbj4gKSB7JztcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMaW5lLmlubmVySFRNTCA9ICdpZiAoICc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChzdGFydExpbmUsIFtuLnRlc3RdLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMaW5lLmlubmVySFRNTCArPSAnICkgeyc7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHBhcmVudEVsZW1lbnQsIFtuLmNvbnNlcXVlbnRdLCBwYWRkaW5nKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbWlkTGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG4uYWx0ZXJuYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaWRMaW5lLmlubmVySFRNTCA9ICd9IGVsc2Ugeyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QocGFyZW50RWxlbWVudCwgW24uYWx0ZXJuYXRlXSwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlbmRMaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgZW5kTGluZS5pbm5lckhUTUwgPSAnfSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnVmFyaWFibGVEZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KG5vZGUsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9IG4ua2luZCArICcgJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KGxpbmUsIG4uZGVjbGFyYXRpb25zLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdWYXJpYWJsZURlY2xhcmF0b3InOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgIHZhclNwYW4gPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWyd2YXJJZCddKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChub2RlLCB2YXJTcGFuKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyU3Bhbi5pbm5lckhUTUwgPSBBc3RIZWxwZXIucGF0dGVyblRvU3RyaW5nKG4uaWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobi5pbml0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgW10sICcgPSAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbml0U3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ3ZhckluaXQnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QoaW5pdFNwYW4sIFtuLmluaXRdLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgW10sICc7Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnQXNzaWdubWVudEV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgICAgICAgICAgICAgbGVmdFNwYW4gPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWyd2YXJJZCddKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChub2RlLCBsZWZ0U3Bhbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChsZWZ0U3BhbiwgW24ubGVmdF0sIDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgW10sICcgPSAnKTtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsndmFySW5pdCddKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHJpZ2h0U3BhbiwgW24ucmlnaHRdLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFtdLCAnOycpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0JpbmFyeUV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBCaW5hcnlFeHByZXNzaW9uO1xuICAgICAgICAgICAgICAgICAgICBsZWZ0U3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ2xlZnRCaW4nXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChsZWZ0U3BhbiwgW24ubGVmdF0sIDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgW10sICcgJyArIG4ub3BlcmF0b3IgKyAnICcpO1xuICAgICAgICAgICAgICAgICAgICByaWdodFNwYW4gPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWydyaWdodEJpbiddKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHJpZ2h0U3BhbiwgW24ucmlnaHRdLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdFeHByZXNzaW9uU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgRXhwcmVzc2lvblN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQobm9kZSwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChsaW5lLCBbbi5leHByZXNzaW9uXSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnUmV0dXJuU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgUmV0dXJuU3RhdGVtZW50XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KG5vZGUsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9IGVzY29kZUdlbmVyYXRlKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZWZhdWx0OicsIG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsnbnN5LScgKyBub2RlLnR5cGVdLCBlc2NvZGVHZW5lcmF0ZShub2RlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQobm9kZSwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1aWxkSHRtbFRyZWUyKCkge1xuICAgICAgICBjb25zdCBjb2RlUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMucHJvZ3JlbUNvZGVMaW5lcy5wdXNoKGNvZGVSb290KTtcbiAgICAgICAgdGhpcy51bnN0YWNrQXN0KGNvZGVSb290LCBbdGhpcy5wcm9ncmVtQ29kZS5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCkuYXN0Um9vdE5vZGVdLCAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1aWxkSHRtbFRyZWUzKCk6IEVzVG9IdG1sVHJlZVN0b3JlIHtcbiAgICAgICAgY29uc3QgY29kZVJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLnByb2dyZW1Db2RlTGluZXMucHVzaChjb2RlUm9vdCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgZmFjdG9yeSA9IG5ldyBDb2RlU3Bvb2xlckVzVG9IdG1sVHJlZU1hcHBlckZhY3RvcnkodGhpcy5fZG9jdW1lbnQpO1xuICAgICAgICBsZXQgdHJlZVN0b3JlID0gZmFjdG9yeS5idWlsZCh0aGlzLnByb2dyZW1Db2RlKTtcblxuICAgICAgICB0cmVlU3RvcmUucGFpbnRJbnRvKGNvZGVSb290KTtcblxuICAgICAgICByZXR1cm4gdHJlZVN0b3JlO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGRIdG1sVHJlZSgpIHtcbiAgICAgICAgY29uc3QgY29kZVJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb25zdCBzdGFjazogQmFzZU5vZGVbXSA9IFt0aGlzLnByb2dyZW1Db2RlLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKS5hc3RSb290Tm9kZV07XG4gICAgICAgIGxldCBwYWRkaW5nID0gMDtcblxuICAgICAgICAvL3RoaXMucHJvZ3JlbUNvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbigpLmJvZHkuYm9keS5tYXAobiA9PiBzdGFjay5wdXNoKG4pKTtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoIW5vZGUpIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBiZSBhYmxlIHRvIHNoaWZ0IGEgbnVsbCBub2RlICEnKTtcbiAgICAgICAgICAgIHZhciBsaW5lO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Jsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZysrXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrLmJvZHkuc2xpY2UoMCkucmV2ZXJzZSgpLm1hcCh4ID0+IHN0YWNrLnVuc2hpZnQoeCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbmRCbG9ja1N0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBoYWNrIHRvIGNsb3NlIGFuIG9wZW5lZCBibG9ja1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nLS07XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKGNvZGVSb290LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5pbm5lckhUTUwgPSAnfSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Z1bmN0aW9uRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUoY29kZVJvb3QsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZnVuYy5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZS5pbm5lckhUTUwgPSAnZnVuY3Rpb24gJyArIGZ1bmMuaWQubmFtZSArICcgKCkgeyc7Ly8gKyBmdW5jLnBhcmFtcy5tYXAoeCA9PiB4Lm5hbWUpLmpvaW4oJywgJykgKyAnICkgeyc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9ICdmdW5jdGlvbiAoKSB7JzsvLyArIGZ1bmMucGFyYW1zLm1hcCh4ID0+IHgubmFtZSkuam9pbignLCAnKSArICcgKSB7JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHsgdHlwZTogJ0VuZEJsb2NrU3RhdGVtZW50JyB9KTsgLy8gSGFjayB0byBkZWxheSBhIGJsb2NrIGVuZFxuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KGZ1bmMuYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0lmU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlmc3RtdCA9IG5vZGUgYXMgSWZTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKGNvZGVSb290LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5pbm5lckhUTUwgPSAnaWYgKCA8c3Bhbj4nICsgZXNjb2RlR2VuZXJhdGUoaWZzdG10LnRlc3QpICsgJzwvc3Bhbj4gKSB7JztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChpZnN0bXQudGVzdCwgbGluZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlmc3RtdC5hbHRlcm5hdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoeyB0eXBlOiAnRW5kQmxvY2tTdGF0ZW1lbnQnIH0pOyAvLyBIYWNrIHRvIGRlbGF5IGEgYmxvY2sgZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KGlmc3RtdC5hbHRlcm5hdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoeyB0eXBlOiAnRWxzZUJsb2NrU3RhdGVtZW50JyB9KTsgLy8gSGFjayB0byBkZWxheSBhbiBlbHNlIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoaWZzdG10LmNvbnNlcXVlbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbHNlQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgaGFjayB0byBjbG9zZSBhbiBvcGVuZWQgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZy0tO1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShjb2RlUm9vdCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUuaW5uZXJIVE1MID0gJ30gZWxzZSB7JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUoY29kZVJvb3QsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lLnRleHRDb250ZW50ID0gZXNjb2RlR2VuZXJhdGUobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUuY2xhc3NMaXN0LmFkZCgnc3RhdGVtZW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQobm9kZSwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlIChzdGFjay5sZW5ndGggPiAwKTtcbiAgICB9XG59XG5cbiovXG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVtSW5zcGVjdG9yVmlldyBpbXBsZW1lbnRzIFByb2dyZW1WaWV3LCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciB7XG5cbiAgICBwcml2YXRlIGV4ZWN1dGluZ0VsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgcHJpdmF0ZSBleGVjdXRlZEVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVYRUNVVElOR19DTEFTUyA9ICd2ZXJzZS1leGVjdXRpbmcnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVhFQ1VURURfQ0xBU1MgPSAndmVyc2UtZXhlY3V0ZWQnO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyLFxuICAgICAgICBwcml2YXRlIGh0bWxGYWN0b3J5OiBIdG1sQ291cGxldEZhY3Rvcnk8YW55PlxuICAgICkge1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlQ29kZUV4ZWN1dGlvbih0aGlzKTtcbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUdyaWRDaGFuZ2UodGhpcyk7XG4gICAgfVxuXG4gICAgYnVpbGRWaWV3KHNjaGVkdWxlcjogUHJvZ3JlbVNjaGVkdWxlcik6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGh0bWxDb21wb25lbnQgPSB0aGlzLmh0bWxGYWN0b3J5LmJ1aWxkQ291cGxldCgpO1xuICAgICAgICByZXR1cm4gaHRtbENvbXBvbmVudDtcbiAgICB9XG4gICAgXG4gICAgZmlyZUNvZGVFeGVjdXRpb24oc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICBsZXQgaHRtbFZlcnNlID0gdGhpcy5odG1sRmFjdG9yeS5nZXRIdG1sVmVyc2Uoc3RhdGUudmVyc2UpO1xuICAgICAgICBpZihodG1sVmVyc2UpIHtcbiAgICAgICAgICAgIGh0bWxWZXJzZS5jbGFzc0xpc3QuYWRkKFByb2dyZW1JbnNwZWN0b3JWaWV3LkVYRUNVVElOR19DTEFTUyk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRoaXMuZXhlY3V0aW5nRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGVsdCA9IHRoaXMuZXhlY3V0aW5nRWxlbWVudHMucG9wKCk7XG4gICAgICAgICAgICBpZiAoZWx0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlZEVsZW1lbnRzLnB1c2goZWx0KTtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yVmlldy5FWEVDVVRJTkdfQ0xBU1MpO1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QuYWRkKFByb2dyZW1JbnNwZWN0b3JWaWV3LkVYRUNVVEVEX0NMQVNTKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWh0bWxWZXJzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5leGVjdXRpbmdFbGVtZW50cy5wdXNoKGh0bWxWZXJzZSk7XG4gICAgICAgIGh0bWxWZXJzZS5jbGFzc0xpc3QuYWRkKFByb2dyZW1JbnNwZWN0b3JWaWV3LkVYRUNVVElOR19DTEFTUyk7XG4gICAgfVxuXG4gICAgZmlyZUdyaWRDaGFuZ2Uoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICB3aGlsZSAodGhpcy5leGVjdXRpbmdFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgZWx0ID0gdGhpcy5leGVjdXRpbmdFbGVtZW50cy5wb3AoKTtcbiAgICAgICAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yVmlldy5FWEVDVVRFRF9DTEFTUyk7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5yZW1vdmUoUHJvZ3JlbUluc3BlY3RvclZpZXcuRVhFQ1VUSU5HX0NMQVNTKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlICh0aGlzLmV4ZWN1dGVkRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGVsdCA9IHRoaXMuZXhlY3V0ZWRFbGVtZW50cy5wb3AoKTtcbiAgICAgICAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yVmlldy5FWEVDVVRFRF9DTEFTUyk7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5yZW1vdmUoUHJvZ3JlbUluc3BlY3RvclZpZXcuRVhFQ1VUSU5HX0NMQVNTKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgU3R5bGVEZWNvcmF0b3IsIFByb2dyZW1TY2hlZHVsZXIgfSBmcm9tIFwiLi9UeXBlc1wiO1xuaW1wb3J0IHsgQmFzZU5vZGUsIFZhcmlhYmxlRGVjbGFyYXRvciwgQXNzaWdubWVudEV4cHJlc3Npb24sIElkZW50aWZpZXIgfSBmcm9tIFwiZXN0cmVlXCI7XG5pbXBvcnQgeyBBc3RIZWxwZXIgfSBmcm9tIFwiLi9Bc3RIZWxwZXJcIjtcbmltcG9ydCB7IGNyZWF0ZSBhcyBtZDVDcmVhdGUgfSBmcm9tICdqcy1tZDUnO1xuaW1wb3J0IHsgUHJvZ3JlbUluc3BlY3RvclZpZXcgfSBmcm9tIFwiLi9Qcm9ncmVtSW5zcGVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBDb2xvclZlcnNlVmFyaWFibGVEZWNvcmF0b3IgaW1wbGVtZW50cyBTdHlsZURlY29yYXRvcjxCYXNlTm9kZT4ge1xuXG4gICAgcHJpdmF0ZSB2YXJpYWJsZU1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKTtcblxuICAgIGRlY29yYXRlKG5vZGU6IEJhc2VOb2RlLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IHZhcklkO1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnVmFyaWFibGVEZWNsYXJhdG9yJykge1xuICAgICAgICAgICAgbGV0IG4gPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRvcjtcbiAgICAgICAgICAgIHZhcklkID0gQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhuLmlkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnQXNzaWdubWVudEV4cHJlc3Npb24nKSB7XG4gICAgICAgICAgICBsZXQgbiA9IG5vZGUgYXMgQXNzaWdubWVudEV4cHJlc3Npb247XG4gICAgICAgICAgICB2YXJJZCA9IEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcobi5sZWZ0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnSWRlbnRpZmllcicpIHtcbiAgICAgICAgICAgIGxldCBuID0gbm9kZSBhcyBJZGVudGlmaWVyO1xuICAgICAgICAgICAgdmFySWQgPSBuLm5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFySWQpIHtcbiAgICAgICAgICAgIGxldCB2YXJJbmRleCA9IHRoaXMudmFyaWFibGVNYXAuZ2V0KHZhcklkKTtcbiAgICAgICAgICAgIGlmICghdmFySW5kZXgpIHtcbiAgICAgICAgICAgICAgICB2YXJJbmRleCA9IHRoaXMudmFyaWFibGVNYXAuc2l6ZSArIDE7XG4gICAgICAgICAgICAgICAgdGhpcy52YXJpYWJsZU1hcC5zZXQodmFySWQsIHZhckluZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd2YXJpYWJsZScpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd2YXJpYWJsZS0nICsgdmFySW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSAgICBcbiAgICBcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHN0eWxlID0gJyc7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ3ZhcmlhYmxlIGNvdW50OicsIHRoaXMudmFyaWFibGVNYXAuc2l6ZSk7XG4gICAgICAgIHRoaXMudmFyaWFibGVNYXAuZm9yRWFjaCgoaW5kZXgsIGlkKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKGlkLCB0aGlzLnZhcmlhYmxlTWFwLnNpemUpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYnVpbGRpbmcgY29sb3IgIycsIGlkLCAnPT4nLCBjb2xvcik7XG4gICAgICAgICAgICBzdHlsZSArPSBgXG4gICAgICAgICAgICAgICAgLnZhcmlhYmxlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMnB4IDVweDtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC4ke1Byb2dyZW1JbnNwZWN0b3JWaWV3LkVYRUNVVElOR19DTEFTU30gLnZhcmlhYmxlLSR7aW5kZXh9LmlkZW50aWZpZXIsIFxuICAgICAgICAgICAgICAgIC4ke1Byb2dyZW1JbnNwZWN0b3JWaWV3LkVYRUNVVEVEX0NMQVNTfSAudmFyaWFibGUtJHtpbmRleH0uaWRlbnRpZmllciB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBgO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBjb2xvck1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKTtcblxuICAgIHByaXZhdGUgaHNsQ29sb3IoaHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2hzbCgnICsgaHVlICsgJywgMTAwJSwgODAlKSc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNoU3RyaW5nVG9Db2xvcihrZXk6IHN0cmluZywgY29sb3JDb3VudDogbnVtYmVyID0gMTIsIHNoaWZ0OiBudW1iZXIgPSAyKSB7XG4gICAgICAgIHZhciBodWUgPSB0aGlzLmNvbG9yTWFwLmdldChrZXkpO1xuICAgICAgICBpZiAoaHVlKSByZXR1cm4gdGhpcy5oc2xDb2xvcihodWUpO1xuXG4gICAgICAgIHZhciBoYXNoID0gbWQ1Q3JlYXRlKCkudXBkYXRlKGtleSkudG9TdHJpbmcoKTtcbiAgICAgICAgXG4gICAgICAgIGh1ZSA9ICggcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAwLCBzaGlmdCArIDEpLCAxNikgKyAxNiAqIHBhcnNlSW50KGhhc2guc3Vic3RyaW5nKHNoaWZ0ICsgMSwgc2hpZnQgKyAyKSwgMTYpICsgMjU2ICogcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAyLCBzaGlmdCArIDMpLCAxNikgKTtcbiAgICAgICAgaHVlID0gTWF0aC5mbG9vcihodWUgJSBjb2xvckNvdW50KSAqIDM2MCAvIGNvbG9yQ291bnQ7XG4gICAgICAgIGh1ZSA9IGh1ZSAlIDM2MDtcblxuICAgICAgICAvLyBDb2xvciBkZWR1cGxpY2F0aW9uXG4gICAgICAgIHdoaWxlICghdGhpcy5jb2xvck1hcC5nZXQoa2V5KSkge1xuICAgICAgICAgICAgbGV0IGR1cGxpY2F0ZUNvbG9yID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGxldCBjIG9mIHRoaXMuY29sb3JNYXAudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoYyAtIGh1ZSkgPCBNYXRoLmZsb29yKDE4MCAvIGNvbG9yQ291bnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGR1cGxpY2F0ZUNvbG9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaHVlICs9IE1hdGguZmxvb3IoMjcwIC8gY29sb3JDb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIGh1ZSA9IGh1ZSAlIDM2MDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkdXBsaWNhdGVDb2xvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JNYXAuc2V0KGtleSwgaHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy92YXIgcGFzdGVsID0gJ2hzbCgnICsgaHVlICsgJywgMTAwJSwgODcuNSUpJztcbiAgICAgICAgcmV0dXJuIHRoaXMuaHNsQ29sb3IoaHVlKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIFBhZFZlcnNlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8QmFzZU5vZGU+IHtcblxuICAgIGRlY29yYXRlKG5vZGU6IEJhc2VOb2RlLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb2RlLXBhZGRpbmcnKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSAgICBcbiAgICBcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgLmNvZGUtcGFkZGluZyB7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMzJweDtcbiAgICAgICAgfVxuICAgICAgICBgO1xuICAgIH1cblxufVxuIiwiXG5pbXBvcnQgeyBQcm9ncmFtLCBwYXJzZU1vZHVsZSwgUGFyc2VPcHRpb25zIH0gZnJvbSAnZXNwcmltYSc7XG5pbXBvcnQgeyB3YWxrIGFzIGVzcHJpbWFXYWxrLCB3YWxrQWRkUGFyZW50IGFzIGVzcHJpbWFXYWxrQWRkUGFyZW50IH0gZnJvbSAnZXNwcmltYS13YWxrJztcbmltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcbmltcG9ydCB7IEJhc2VOb2RlLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBCbG9ja1N0YXRlbWVudCwgSWZTdGF0ZW1lbnQsIFJldHVyblN0YXRlbWVudCwgU3RhdGVtZW50IH0gZnJvbSAnZXN0cmVlJztcbmltcG9ydCB7IFByb2dyZW1TdGF0ZSB9IGZyb20gJy4vU2NoZWR1bGluZ1NlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZ3JlbUNvZGUsIFByb2dyZW1GYWN0b3J5IH0gZnJvbSAnLi9UeXBlcyc7XG5pbXBvcnQgeyBFc3ByaW1hVmVyc2VJdGVyYW9yLCBFc3ByaW1hVmVyc2UsIEVzcHJpbWFDb3VwbGV0LCBFc3ByaW1hUHJvZ3JlbUZhY3RvcnksIEVzcHJpbWFQcm9ncmVtIH0gZnJvbSAnLi9Fc3ByaW1hVHlwZXMnO1xuaW1wb3J0IHsgRXNwcmltYUhlbHBlciB9IGZyb20gJy4vRXNwcmltYUhlbHBlcic7XG5pbXBvcnQgeyBGdW5jdGlvbkRlY2xhcmF0aW9uVG9IdG1sVHJlZVN0b3JlIH0gZnJvbSAnLi9IdG1sVHJlZSc7XG4vKlxuZXhwb3J0IGNsYXNzIENvZGVTdGF0ZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgbm9kZTogQmFzZU5vZGUsXG4gICAgICAgIC8vcHVibGljIGNvZGU6IHN0cmluZ1xuICAgICkge307XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29kZVN0YXRlbWVudEZhY3Rvcnk8VD4ge1xuICAgIGJ1aWxkKHBhcmFtOiBUKTogQ29kZVN0YXRlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2RlSXRlcmF0b3Ige1xuICAgIGV4ZWN1dGVOZXh0KCk6IENvZGVTdGF0ZW1lbnQ7XG4gICAgaGFzTmV4dCgpOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1Db2RlIHtcbiAgICBpbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpOiBGdW5jdGlvbkRlY2xhcmF0aW9uXG4gICAgY29sb3JlclByb2dyZW1GdW5jdGlvbigpOiBGdW5jdGlvbkRlY2xhcmF0aW9uXG4gICAgaXRlcmF0b3Ioc3RhdGU6IFByb2dyZW1TdGF0ZSk6IENvZGVJdGVyYXRvcjtcbn1cblxuY2xhc3MgRXNwcmltYUNvZGVTdGF0ZW1lbnRGYWN0b3J5IGltcGxlbWVudHMgVmVyc2VJbnN0cnVjdGlvbkZhY3Rvcnk8QmFzZU5vZGU+IHtcblxuICAgIGJ1aWxkKHBhcmFtOiBCYXNlTm9kZSk6IEVzcHJpbWFWZXJzZUluc3RydWN0aW9uIHtcbiAgICAgICAgaWYgKHBhcmFtKSBcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXNwcmltYVZlcnNlSW5zdHJ1Y3Rpb24ocGFyYW0pO1xuICAgICAgICBcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gYnVpbGQgbm9uIHN0YXRlbWVudCBjb2RlICEnKTtcbiAgICB9XG59XG4qL1xuXG5jbGFzcyBCYXNpY0VzcHJpbWFDb2RlSXRlcmF0b3IgaW1wbGVtZW50cyBFc3ByaW1hVmVyc2VJdGVyYW9yIHtcblxuICAgIHByaXZhdGUgc3RhY2s6IEJhc2VOb2RlW10gPSBbXTtcbiAgICBwcml2YXRlIHJldHVyblZhbHVlOiBhbnkgPSBudWxsO1xuICAgIHByaXZhdGUgZmluaXNoZWQgPSBmYWxzZVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgICAgICBwcml2YXRlIHJvb3ROb2RlOiBCYXNlTm9kZSwgXG4gICAgICAgICAgICBwcml2YXRlIHN0YXRlOiBQcm9ncmVtU3RhdGUpIHtcbiAgICAgICAgdGhpcy5zdGFjay5wdXNoKHJvb3ROb2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlY2xhcmVQcm9ncmVtQXJndW1lbnRzKCkge1xuICAgICAgICBsZXQgX2NvbG9ubmUgPSB0aGlzLnN0YXRlLmNvbG9ubmU7XG4gICAgICAgIGxldCBfbGlnbmUgPSB0aGlzLnN0YXRlLmxpZ25lO1xuICAgICAgICBsZXQgX2NvbnRleHRlID0gdGhpcy5zdGF0ZS5jb250ZXh0ZTtcblxuICAgICAgICB0aGlzLnN0YXRlLmV2YWwoJ3ZhciBjb2xvbm5lID0gJyArIF9jb2xvbm5lICsgJywgbGlnbmUgPSAnICsgX2xpZ25lICsgJzsnKTtcbiAgICAgICAgdGhpcy5zdGF0ZS5ldmFsKCd2YXIgY29udGV4dGUgPSAnICsgSlNPTi5zdHJpbmdpZnkoX2NvbnRleHRlKSk7XG4gICAgfVxuXG4gICAgZXhlY3V0ZU5leHQoKTogRXNwcmltYVZlcnNlIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBmaXJzdCBub2RlIG9uIHRoZSBzdGFja1xuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnN0YWNrLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ05vZGU6Jywgbm9kZSk7XG5cbiAgICAgICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RhY2sgc2hvdWxkIG5vdCBiZSBlbXB0eSAhJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzdG10O1xuXG4gICAgICAgICAgICBzd2l0Y2gobm9kZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIGxldCBmdW5jID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoZnVuYy5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWNsYXJlUHJvZ3JlbUFyZ3VtZW50cygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRWZXJzZShmdW5jKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdCbG9ja1N0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9jayA9IG5vZGUgYXMgQmxvY2tTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrLmJvZHkuc2xpY2UoKS5yZXZlcnNlKCkubWFwKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnQmxvY2tTdGF0ZW1lbnQgdW5zaGlmdGluZzonLCB4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdCh4KVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdJZlN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIHN0bXQgPSBub2RlIGFzIElmU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdENvZGUgPSBlc2NvZGVHZW5lcmF0ZShzdG10LnRlc3QpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0UmVzdWx0ID0gdGhpcy5zdGF0ZS5ldmFsKHRlc3RDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnSWZTdGF0ZW1lbnQgdGVzdCBldmFsdWF0ZSB0bzogJywgdGVzdFJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXN0UmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdUaGVuIHVuc2hpZnRpbmc6Jywgc3RtdC5jb25zZXF1ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdChzdG10LmNvbnNlcXVlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0bXQuYWx0ZXJuYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnRWxzZSB1bnNoaWZ0aW5nOicsIHN0bXQuYWx0ZXJuYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoc3RtdC5hbHRlcm5hdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkVmVyc2Uoc3RtdCk7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdSZXR1cm5TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBzdG10ID0gbm9kZSBhcyBSZXR1cm5TdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV0dXJuVmFsdWUgPSB0aGlzLnN0YXRlLmV2YWwoZXNjb2RlR2VuZXJhdGUoc3RtdC5hcmd1bWVudCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkVmVyc2Uoc3RtdCk7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdOb2RlOicsIG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29kZSA9IGVzY29kZUdlbmVyYXRlKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdHZW5lcmF0ZWQgY29kZTonLCBjb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGV2YWxSZXN1bHQgPSB0aGlzLnN0YXRlLmV2YWwoY29kZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0V2YWx1YXRlIHRvOicsIGV2YWxSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRWZXJzZShub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAodGhpcy5zdGFjay5sZW5ndGggPiAwKTtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0l0ZXJhdG9yIGhhcyBubyBtb3JlIGNvZGUgdG8gZXhlY3V0ZSAhJyk7XG4gICAgfSAgICBcbiAgICBcbiAgICBoYXNOZXh0KCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5maW5pc2hlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5vZGVzID0gdGhpcy5zdGFjay5zbGljZSgwKTtcbiAgICAgICAgd2hpbGUgKG5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gbm9kZXMuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudHlwZSAhPT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2tzOiBCbG9ja1N0YXRlbWVudFtdID0gW107XG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9jayA9IG5vZGUgYXMgQmxvY2tTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKGJsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGFyc291cnMgcmVjdXJzaXZlbWVudCBsZXMgYmxvY2tzIMOgIGxhIHJlY2hlcmNoZSBkZSBub2V1ZCBxdWkgbmUgc29udCBwYXMgZGVzIGJsb2Nrc1xuICAgICAgICAgICAgICAgICAgICBsZXQgaGFzTmV4dCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIWhhc05leHQgJiYgYmxvY2tzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiID0gYmxvY2tzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGIuYm9keS5tYXAoeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4LnR5cGUgIT09ICdCbG9ja1N0YXRlbWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc05leHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzTmV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljRXNwcmltYVByb2dyZW0gaW1wbGVtZW50cyBFc3ByaW1hUHJvZ3JlbSB7XG5cbiAgICBwcml2YXRlIGVzcHJpbWFQcm9ncmFtOiBQcm9ncmFtO1xuXG4gICAgY29uc3RydWN0b3IoY29kZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBjb25maWc6IFBhcnNlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbW1lbnQ6IHRydWUsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lc3ByaW1hUHJvZ3JhbSA9IHBhcnNlTW9kdWxlKGNvZGUsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHdhbGtQcm9ncmVtQ291cGxldChmdW5jdGlvbk5hbWU6IHN0cmluZyk6IEVzcHJpbWFDb3VwbGV0IHtcbiAgICAgICAgdmFyIGZ1bmNOb2RlOiBGdW5jdGlvbkRlY2xhcmF0aW9uIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIHZhciB2ZXJzZXM6IEJhc2VOb2RlW10gPSBbXTtcbiAgICAgICAgZXNwcmltYVdhbGtBZGRQYXJlbnQodGhpcy5lc3ByaW1hUHJvZ3JhbSwgbm9kZSA9PiB7XG4gICAgICAgICAgICBpZiggbm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicgJiYgbm9kZS5pZCAmJiBub2RlLmlkLm5hbWUgPT09IGZ1bmN0aW9uTmFtZSkge1xuICAgICAgICAgICAgICAgIGZ1bmNOb2RlID0gbm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmdW5jTm9kZSAmJiBFc3ByaW1hSGVscGVyLmlzQ2hpbGROb2RlT2Yobm9kZSwgZnVuY05vZGUpKSB7IC8vICYmIEVzcHJpbWFIZWxwZXIuaXNOb3RDaGlsZE5vZGVPZihub2RlLCB2ZXJzZXMpXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nIFxuICAgICAgICAgICAgICAgICAgICB8fCBub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJ1xuICAgICAgICAgICAgICAgICAgICB8fCBub2RlLnR5cGUgPT09ICdFeHByZXNzaW9uU3RhdGVtZW50J1xuICAgICAgICAgICAgICAgICAgICB8fCBub2RlLnR5cGUgPT09ICdSZXR1cm5TdGF0ZW1lbnQnXG4gICAgICAgICAgICAgICAgICAgIHx8IG5vZGUudHlwZSA9PT0gJ0lmU3RhdGVtZW50JyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSApO1xuICAgICAgICBpZiAoZnVuY05vZGUpIHtcbiAgICAgICAgICAgIHZlcnNlcy51bnNoaWZ0KGZ1bmNOb2RlKTtcbiAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZENvdXBsZXQoZnVuY05vZGUsIHZlcnNlcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbXBvc3NpYmxlIGRlIHRyb3V2ZXIgbGEgZm9uY3Rpb24gJHtmdW5jdGlvbk5hbWV9KCkgIWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpOiBFc3ByaW1hQ291cGxldCB7XG4gICAgICAgIHJldHVybiB0aGlzLndhbGtQcm9ncmVtQ291cGxldCgnaW5pdGlhbGlzZXJQcm9ncmVtJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKTogRXNwcmltYUNvdXBsZXQge1xuICAgICAgICByZXR1cm4gdGhpcy53YWxrUHJvZ3JlbUNvdXBsZXQoJ2NvbG9yZXJQcm9ncmVtJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGl0ZXJhdG9yKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiBFc3ByaW1hVmVyc2VJdGVyYW9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCYXNpY0VzcHJpbWFDb2RlSXRlcmF0b3IodGhpcy5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCkuZnVuY3Rpb25Sb290Tm9kZSwgc3RhdGUpO1xuICAgIH1cbn1cblxuY2xhc3MgQmFzaWNFc3ByaW1hUHJvZ3JlbUZhY3RvcnkgaW1wbGVtZW50cyBFc3ByaW1hUHJvZ3JlbUZhY3Rvcnkge1xuXG4gICAgYnVpbGRQcm9ncmVtKGNvZGU6IHN0cmluZyk6IEVzcHJpbWFQcm9ncmVtIHtcbiAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcG9zc2libGUgdG8gYnVpbGQgUHJvZ3JlbSB3aXRob3V0IGNvZGUgIScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgQmFzaWNFc3ByaW1hUHJvZ3JlbShjb2RlKTtcbiAgICB9XG5cbiAgICBidWlsZENvdXBsZXQobm9kZTogRnVuY3Rpb25EZWNsYXJhdGlvbiwgdmVyc2VzOiBCYXNlTm9kZVtdKTogRXNwcmltYUNvdXBsZXQge1xuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW1wb3NzaWJsZSB0byBidWlsZCBlbXB0eSBDb3VwbGV0ICEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlc3ByaW1hVmVyc2VzID0gdmVyc2VzLm1hcCh0aGlzLmJ1aWxkVmVyc2UpO1xuXG4gICAgICAgIGxldCBjb3VwbGV0OiBFc3ByaW1hQ291cGxldCA9IHtcbiAgICAgICAgICAgIGZ1bmN0aW9uUm9vdE5vZGU6IG5vZGUsXG4gICAgICAgICAgICB2ZXJzZXM6IGVzcHJpbWFWZXJzZXNcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnQnVpbHQgY291cGxldDonLCBjb3VwbGV0KTtcbiAgICAgICAgcmV0dXJuIGNvdXBsZXQ7XG4gICAgfVxuXG4gICAgYnVpbGRWZXJzZShub2RlOiBCYXNlTm9kZSk6IEVzcHJpbWFWZXJzZSB7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBvc3NpYmxlIHRvIGJ1aWxkIGVtcHR5IFZlcnNlICEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb2RlID0gbm9kZTtcbiAgICAgICAgaWYobm9kZS50eXBlID09PSAnSWZTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICBjb2RlID0gKG5vZGUgYXMgSWZTdGF0ZW1lbnQpLnRlc3Q7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmVyc2U6IEVzcHJpbWFWZXJzZSA9IHsgXG4gICAgICAgICAgICBub2RlOiBub2RlLFxuICAgICAgICAgICAgY29kZTogY29kZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdmVyc2U7XG4gICAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIENvZGVTZXJ2aWNlIHtcblxuICAgIGV4cG9ydCBjb25zdCBwcm9ncmVtRmFjdG9yeTogUHJvZ3JlbUZhY3Rvcnk8YW55PiA9IG5ldyBCYXNpY0VzcHJpbWFQcm9ncmVtRmFjdG9yeSgpO1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGxvYWRQcm9ncmVtKGZpbGVVcmw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjbGllbnQgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIGNsaWVudC5vcGVuKCdHRVQnLCBmaWxlVXJsKTtcbiAgICAgICAgICAgIGNsaWVudC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvZGUgPSBjbGllbnQucmVzcG9uc2VUZXh0O1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvZGVTZXJ2aWNlOiBQcm9ncmVtIGxvYWRlZCBzdWNjZXNzZnVsbHkuJywgY29kZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShjb2RlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjbGllbnQub25lcnJvciA9ICgpID0+IHJlamVjdChjbGllbnQuc3RhdHVzVGV4dCk7XG4gICAgICAgICAgICBjbGllbnQuc2VuZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0iXSwic291cmNlUm9vdCI6IiJ9