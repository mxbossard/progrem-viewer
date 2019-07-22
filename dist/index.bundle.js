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
        if (!state.verse) {
            return;
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvRXNwcmltYUhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb2dyZW1HcmlkLnRzIiwid2VicGFjazovLy8uL3NyYy9FdmFsU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQXN0SGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9Fc3RyZWVQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1R5cGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9Qcm9ncmVtU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2NyZWVuU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvSHRtbEhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2NoZWR1bGluZ1NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb2dyZW1JbnNwZWN0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0VzdHJlZVN0eWxlRGVjb3JhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9Db2RlU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBSUEsTUFBc0IsYUFBYTtJQUV4QixNQUFNLENBQUMsYUFBYSxDQUFDLElBQW9CLEVBQUUsTUFBdUI7UUFDckUsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUN4QixPQUFPLElBQUksQ0FBQztTQUNmO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDckIsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxPQUFPLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQXdCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVNLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFvQixFQUFFLE9BQTBCO1FBQzNFLElBQUksT0FBTyxDQUFD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bEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBYmUsdUJBQVcsY0FhMUI7QUFFTCxDQUFDLEVBbkJnQixXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQW1CM0IiLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgRVNUcmVlIGZyb20gXCJlc3RyZWVcIjtcblxuZXhwb3J0IHR5cGUgTm9kZVdpdGhQYXJlbnQgPSBFU1RyZWUuTm9kZSAmIHsgcGFyZW50PzogRVNUcmVlLk5vZGUgfTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEVzcHJpbWFIZWxwZXIge1xuXG4gICAgcHVibGljIHN0YXRpYyBpc0NoaWxkTm9kZU9mKG5vZGU6IE5vZGVXaXRoUGFyZW50LCBwYXJlbnQ6IEVTVHJlZS5CYXNlTm9kZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAobm9kZS5wYXJlbnQgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoIW5vZGUucGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gRXNwcmltYUhlbHBlci5pc0NoaWxkTm9kZU9mKG5vZGUucGFyZW50IGFzIE5vZGVXaXRoUGFyZW50LCBwYXJlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNOb3RDaGlsZE5vZGVPZihub2RlOiBOb2RlV2l0aFBhcmVudCwgcGFyZW50czogRVNUcmVlLkJhc2VOb2RlW10pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHBhcmVudHMuZmluZChwID0+IHAgPT09IG5vZGUucGFyZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKCFub2RlLnBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gRXNwcmltYUhlbHBlci5pc05vdENoaWxkTm9kZU9mKG5vZGUucGFyZW50IGFzIE5vZGVXaXRoUGFyZW50LCBwYXJlbnRzKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBQcm9ncmVtU2VydmljZSwgUHJvZ3JlbUNvbmZpZyB9IGZyb20gXCIuL1Byb2dyZW1TZXJ2aWNlXCI7XG5pbXBvcnQgeyBTY3JlZW5Db25maWcgfSBmcm9tIFwiLi9TY3JlZW5TZXJ2aWNlXCI7XG5cbmxldCBzY3JlZW5Db25maWcgPSBuZXcgU2NyZWVuQ29uZmlnKDIwKTtcbmxldCBwcm9ncmVtQ29uZmlnID0gbmV3IFByb2dyZW1Db25maWcoMTcsIDE3LCAxKTtcblxuUHJvZ3JlbVNlcnZpY2UuYnVpbGRQcm9ncmVtKCcuL3Byb2dyZW1zL2NvZXVyX3Byb2dyZW0uanMnLCBzY3JlZW5Db25maWcsIHByb2dyZW1Db25maWcpOyIsImltcG9ydCB7IEdyaWRDaGFuZ2VMaXN0ZW5lciwgUHJvZ3JlbVN0YXRlIH0gZnJvbSBcIi4vU2NoZWR1bGluZ1NlcnZpY2VcIjtcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gXCIuL1NjcmVlblNlcnZpY2VcIjtcbmltcG9ydCB7IFByb2dyZW1Db25maWcgfSBmcm9tIFwiLi9Qcm9ncmVtU2VydmljZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1HcmlkIHtcbiAgICBjbGVhcigpOiB2b2lkO1xuICAgIGF0dGFjaChlbGVtZW50OiBFbGVtZW50IHwgbnVsbCk6IHZvaWRcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljQ2FudmFzUHJvZ3JlbUdyaWQgaW1wbGVtZW50cyBQcm9ncmVtR3JpZCwgR3JpZENoYW5nZUxpc3RlbmVyIHtcbiAgICBcbiAgICBwcml2YXRlIGF0dGFjaGVkRWxlbWVudDogRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2NyZWVuQ29uZmlnOiBTY3JlZW5Db25maWcsIFxuICAgICAgICBwcml2YXRlIHByb2dyZW1Db25maWc6IFByb2dyZW1Db25maWdcbiAgICAgICAgKSB7XG4gICAgICAgIGxldCBlbHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZ3JlbScpO1xuICAgICAgICBpZiAoIWVsdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZmluZCAucHJvZ3JlbSBDYW52YXMgZWxlbWVudCAhJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYW52YXMgPSBlbHQgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5cbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmICghY3R4KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBnZXQgMkQgQ2FudmFzIGNvbnRleHQgIScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXR0YWNoVG9DYW52YXMoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgY2FudmFzLndpZHRoID0gdGhpcy5wcm9ncmVtQ29uZmlnLmNvbG9ubmVzICogdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMucHJvZ3JlbUNvbmZpZy5jb2xvbm5lcyAqIHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG5cbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmICghY3R4KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBnZXQgMkQgQ2FudmFzIGNvbnRleHQgIScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIH1cblxuICAgIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICBsZXQgd2lkdGggPSB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplICogdGhpcy5wcm9ncmVtQ29uZmlnLmNvbG9ubmVzO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZSAqIHRoaXMucHJvZ3JlbUNvbmZpZy5saWduZXM7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBhdHRhY2goZWxlbWVudDogRWxlbWVudCB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hdHRhY2hlZEVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgPT09ICdDQU5WQVMnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2hUb0NhbnZhcyhlbGVtZW50IGFzIEhUTUxDYW52YXNFbGVtZW50KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYy5ub2RlTmFtZSA9PT0gJ0NBTlZBUycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoVG9DYW52YXMoZWxlbWVudCBhcyBIVE1MQ2FudmFzRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTm8gQ2FudmFzIGZvdW5kIHNvIHdlIGNyZWF0ZSBvbmVcbiAgICAgICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2hUb0NhbnZhcyhjYW52YXMpO1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjYW52YXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZpcmVHcmlkQ2hhbmdlIChzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdncmlkIGNoYW5nZTogJywgc3RhdGUpO1xuXG4gICAgICAgIGxldCBib3hTaXplID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcbiAgICAgICAgbGV0IGMgPSBzdGF0ZS5jb2xvbm5lO1xuICAgICAgICBsZXQgbCA9IHN0YXRlLmxpZ25lO1xuXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgbGV0IGNvdWxldXIgPSBjb2xvcmVyUHJvZ3JlbShjLCBsLCBzdGF0ZS5jb250ZXh0ZSk7XG4gICAgICAgIGlmIChjb3VsZXVyKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb3VsZXVyO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoYyAqIGJveFNpemUsIGwgKiBib3hTaXplLCBib3hTaXplLCBib3hTaXplKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiXG5leHBvcnQgY2xhc3MgRXZhbFNjb3BlIHtcblxuICAgIC8vIFNlZSBodHRwOi8vcGVyZmVjdGlvbmtpbGxzLmNvbS9nbG9iYWwtZXZhbC13aGF0LWFyZS10aGUtb3B0aW9ucy9cbiAgICAvLyBXaWxsIHJldHVybiBhbiBldmFsIGFibGUgdG8gZXZhbHVhdGUganMgY29kZSBpbiB0aGUgZ2xvYmFsIHNjb3BlLlxuICAgIHB1YmxpYyByZWFkb25seSBnbG9iYWxFdmFsID0gKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXIgaXNJbmRpcmVjdEV2YWxHbG9iYWwgPSAoZnVuY3Rpb24gKG9yaWdpbmFsLCBPYmplY3QpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gRG9lcyBgT2JqZWN0YCByZXNvbHZlIHRvIGEgbG9jYWwgdmFyaWFibGUsIG9yIHRvIGEgZ2xvYmFsLCBidWlsdC1pbiBgT2JqZWN0YCxcbiAgICAgICAgICAgICAgICAvLyByZWZlcmVuY2UgdG8gd2hpY2ggd2UgcGFzc2VkIGFzIGEgZmlyc3QgYXJndW1lbnQ/XG4gICAgICAgICAgICAgICAgcmV0dXJuICgxLCBldmFsKSgnT2JqZWN0JykgPT09IG9yaWdpbmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIC8vIGlmIGluZGlyZWN0IGV2YWwgZXJyb3JzIG91dCAoYXMgYWxsb3dlZCBwZXIgRVMzKSwgdGhlbiBqdXN0IGJhaWwgb3V0IHdpdGggYGZhbHNlYFxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoT2JqZWN0LCAxMjMpO1xuXG4gICAgICAgIGlmIChpc0luZGlyZWN0RXZhbEdsb2JhbCkge1xuICAgICAgICAgICAgLy8gaWYgaW5kaXJlY3QgZXZhbCBleGVjdXRlcyBjb2RlIGdsb2JhbGx5LCB1c2UgaXRcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXhwcmVzc2lvbjogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgxLCBldmFsKShleHByZXNzaW9uKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygd2luZG93LmV4ZWNTY3JpcHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvLyBpZiBgd2luZG93LmV4ZWNTY3JpcHQgZXhpc3RzYCwgdXNlIGl0XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV4cHJlc3Npb246IHN0cmluZykge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LmV4ZWNTY3JpcHQoZXhwcmVzc2lvbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3RoZXJ3aXNlLCBnbG9iYWxFdmFsIGlzIGB1bmRlZmluZWRgIHNpbmNlIG5vdGhpbmcgaXMgcmV0dXJuZWRcbiAgICAgICAgcmV0dXJuIChleHByOiBzdHJpbmcpID0+IHt0aHJvdyBuZXcgRXJyb3IoJ05vIGdsb2JhbCBldmFsIGF2YWlsYWJsZSAhJyk7fVxuICAgIH0pKCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbn1cbiIsImltcG9ydCB7IFBhdHRlcm4sIElkZW50aWZpZXIsIEJhc2VOb2RlLCBWYXJpYWJsZURlY2xhcmF0aW9uLCBBc3NpZ25tZW50RXhwcmVzc2lvbiwgRnVuY3Rpb25EZWNsYXJhdGlvbiwgVmFyaWFibGVEZWNsYXJhdG9yIH0gZnJvbSBcImVzdHJlZVwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFzdEhlbHBlciB7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gcGF0dGVyblRvU3RyaW5nKHBhdHRlcm46IFBhdHRlcm4pOiBzdHJpbmcge1xuICAgICAgICB2YXIgbm9kZTtcbiAgICAgICAgc3dpdGNoIChwYXR0ZXJuLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0lkZW50aWZpZXInOlxuICAgICAgICAgICAgICAgIG5vZGUgPSBwYXR0ZXJuIGFzIElkZW50aWZpZXI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUubmFtZTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGNvbnZlcnQgcGF0dGVybiBvZiB0eXBlICcgKyBwYXR0ZXJuLnR5cGUpO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiByZWR1Y2VOb2RlVG9WYXJEZWNsYXJhdGlvbihub2RlOiBCYXNlTm9kZSk6IFZhcmlhYmxlRGVjbGFyYXRpb24gfCBBc3NpZ25tZW50RXhwcmVzc2lvbiB8IEZ1bmN0aW9uRGVjbGFyYXRpb24gfCB2b2lkIHtcbiAgICAgICAgXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgbGV0IGRlY2wgPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gZGVjbDtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgIGxldCBleHByID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgICAgIHJldHVybiBleHByO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBmdW5jO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHAgPT09ICdsZWZ0JyB8fCBwID09PSAncmlnaHQnIHx8IHAgPT09ICdhcmd1bWVudCcgfHwgcCA9PT0gJ2NhbGxlZScgfHwgcCA9PT0gJ2JvZHknIHx8IHAgPT09ICdleHByZXNzaW9uJykge1xuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkOiBCYXNlTm9kZSA9IG5vZGVbcF0gYXMgQmFzZU5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSByZWR1Y2VOb2RlVG9WYXJEZWNsYXJhdGlvbihjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IFN0eWxlRGVjb3JhdG9yIH0gZnJvbSBcIi4vVHlwZXNcIjtcbmltcG9ydCB7IEJhc2VOb2RlLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBCbG9ja1N0YXRlbWVudCwgSWZTdGF0ZW1lbnQsIFZhcmlhYmxlRGVjbGFyYXRvciwgVmFyaWFibGVEZWNsYXJhdGlvbiwgQXNzaWdubWVudEV4cHJlc3Npb24sIEJpbmFyeUV4cHJlc3Npb24sIEV4cHJlc3Npb25TdGF0ZW1lbnQsIFJldHVyblN0YXRlbWVudCwgSWRlbnRpZmllciwgTWVtYmVyRXhwcmVzc2lvbiB9IGZyb20gXCJlc3RyZWVcIjtcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tIFwiLi9IdG1sSGVscGVyXCI7XG5pbXBvcnQgeyBBc3RIZWxwZXIgfSBmcm9tIFwiLi9Bc3RIZWxwZXJcIjtcbmltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcbmltcG9ydCB7IEVzcHJpbWFWZXJzZSwgRXNwcmltYUh0bWxDb3VwbGV0RmFjdG9yeSwgRXNwcmltYUNvdXBsZXQgfSBmcm9tIFwiLi9Fc3ByaW1hVHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIEVzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkgaW1wbGVtZW50cyBFc3ByaW1hSHRtbENvdXBsZXRGYWN0b3J5IHtcblxuICAgIHByaXZhdGUgaHRtbFZlcnNlc01hcDogTWFwPEJhc2VOb2RlLCBIVE1MRWxlbWVudD4gPSBuZXcgTWFwKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb3VwbGV0OiBFc3ByaW1hQ291cGxldCxcbiAgICAgICAgcHJpdmF0ZSBkZWNvcmF0b3I6IFN0eWxlRGVjb3JhdG9yPEJhc2VOb2RlPlxuICAgICkge31cblxuICAgIGJ1aWxkQ291cGxldCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBodG1sQ291cGxldCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuY291cGxldC5mdW5jdGlvblJvb3ROb2RlKTtcbiAgICAgICAgaHRtbENvdXBsZXQuY2xhc3NMaXN0LmFkZCgncHJvZ3JlbS1pbnNwZWN0b3InKTtcbiAgICAgICAgLy9sZXQgaHRtbFZlcnNlcyA9IHRoaXMuY291cGxldC52ZXJzZXMubWFwKHYgPT4gdGhpcy5idWlsZE5vZGUodi5ub2RlKSk7XG4gICAgICAgIC8vbGV0IGh0bWxDb3VwbGV0ID0gSHRtbEhlbHBlci5zcGFuKCdjb3VwbGV0JywgaHRtbFZlcnNlcyk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2h0bWxWZXJzZXNNYXA6JywgdGhpcy5odG1sVmVyc2VzTWFwKTtcbiAgICAgICAgcmV0dXJuIGh0bWxDb3VwbGV0O1xuICAgIH1cblxuICAgIGdldEh0bWxWZXJzZSh2ZXJzZTogRXNwcmltYVZlcnNlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAodGhpcy5odG1sVmVyc2VzTWFwLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbFN0YXRlRXJyb3I6IGNvdXBsZXQgbXVzdCBiZSBidWlsdCBiZWZvcmUgY2FsbGluZyBnZXRIdG1sVmVyc2UoKSAhJylcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodG1sRWxlbWVudCA9IHRoaXMuaHRtbFZlcnNlc01hcC5nZXQodmVyc2Uubm9kZSk7XG4gICAgICAgIGlmICghaHRtbEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBIVE1MRWxlbWVudCBmb3VuZCBtYXRjaGluZyB2ZXJzZTonLCB2ZXJzZSwgJyEnKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBIVE1MRWxlbWVudCBmb3VuZCBtYXRjaGluZyBzdXBwbGllZCB2ZXJzZSAhYCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBodG1sRWxlbWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZCBOb2RlIGFwcGx5aW5nIGRlY29yYXRvcnMuXG4gICAgICogXG4gICAgICogQHBhcmFtIG5vZGUgdGhlIG5vZGUgZm9yIHdoaWNoIHRvIHByb2R1Y2UgSFRNTFxuICAgICAqIEBwYXJhbSBzaWJsaW5ncyB0aGUgbm9kZXMgdG8gYWRkIGFzIHNpYmxpbmdzIG9mIHRoZSBub2RlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGJ1aWxkTm9kZShub2RlOiBCYXNlTm9kZSB8IHVuZGVmaW5lZCB8IG51bGwpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIuc3BhbignZW1wdHknLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNpYmxpbmdzOiBIVE1MRWxlbWVudFtdID0gW11cbiAgICAgICAgbGV0IGh0bWxPdXRwdXQgPSB0aGlzLmJ1aWxkTm9kZUludGVybmFsKG5vZGUsIHNpYmxpbmdzKTtcbiAgICAgICAgaHRtbE91dHB1dCA9IHRoaXMuZGVjb3JhdG9yLmRlY29yYXRlKG5vZGUsIGh0bWxPdXRwdXQpO1xuXG4gICAgICAgIGxldCBtYXRjaGluZ1ZlcnNlID0gdGhpcy5jb3VwbGV0LnZlcnNlcy5maW5kKHYgPT4gdi5ub2RlID09PSBub2RlKTtcbiAgICAgICAgaWYgKG1hdGNoaW5nVmVyc2UpIHtcbiAgICAgICAgICAgIGh0bWxPdXRwdXQgPSB0aGlzLmVuY2Fwc3VsYXRlTm9kZUluVmVyc2VDb250YWluZXIoaHRtbE91dHB1dCk7XG4gICAgICAgICAgICAvLyBUaGlzIG5vZGUgaXMgdGhlIHJvb3Qgbm9kZSBvZiBhIFZlcnNlXG4gICAgICAgICAgICB0aGlzLmh0bWxWZXJzZXNNYXAuc2V0KG1hdGNoaW5nVmVyc2Uubm9kZSwgaHRtbE91dHB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2libGluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gSWYgc2libGluZ3MsIGJ1aWxkIGVhY2ggc2libGluZ1xuICAgICAgICAgICAgaHRtbE91dHB1dCA9IEh0bWxIZWxwZXIuc3Bhbignc2libGluZy1jb250YWluZXInLCBodG1sT3V0cHV0KTtcbiAgICAgICAgICAgIHdoaWxlKHNpYmxpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgc2libGluZyA9IHNpYmxpbmdzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgc2libGluZ091dCA9IHRoaXMuYnVpbGROb2RlKHNpYmxpbmcpO1xuICAgICAgICAgICAgICAgICAgICBodG1sT3V0cHV0LmFwcGVuZENoaWxkKHNpYmxpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBodG1sT3V0cHV0O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBlbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGh0bWxFbHQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgY29udGVudCA9IEh0bWxIZWxwZXIuc3BhbigndmVyc2UtY29udGVudCcsIGh0bWxFbHQpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCd2ZXJzZSB2ZXJzZS1jb250YWluZXInLCBjb250ZW50KTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZCBub2RlLlxuICAgICAqIEBwYXJhbSBub2RlIFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBidWlsZE5vZGVJbnRlcm5hbChub2RlOiBCYXNlTm9kZSwgc2libGluZ3M6IEhUTUxFbGVtZW50W10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ0J1aWxkaW5nIG5vZGUnLCBub2RlLCAnLi4uJyk7XG4gICAgICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdGdW5jdGlvbkRlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEZ1bmN0aW9uRGVjbGFyYXRpb24obm9kZSwgc2libGluZ3MpO1xuICAgICAgICAgICAgY2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQmxvY2tTdGF0ZW1lbnQobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdJZlN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRJZlN0YXRlbWVudChub2RlLCBzaWJsaW5ncyk7XG4gICAgICAgICAgICBjYXNlICdWYXJpYWJsZURlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZFZhcmlhYmxlRGVjbGFyYXRpb24obm9kZSk7XG4gICAgICAgICAgICBjYXNlICdWYXJpYWJsZURlY2xhcmF0b3InOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkVmFyaWFibGVEZWNsYXJhdG9yKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnQXNzaWdubWVudEV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQXNzaWdubWVudEV4cHJlc3Npb24obm9kZSk7XG4gICAgICAgICAgICBjYXNlICdCaW5hcnlFeHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEJpbmFyeUV4cHJlc3Npb24obm9kZSk7XG4gICAgICAgICAgICBjYXNlICdFeHByZXNzaW9uU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEV4cHJlc3Npb25TdGF0ZW1lbnQobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdSZXR1cm5TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkUmV0dXJuU3RhdGVtZW50KG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnSWRlbnRpZmllcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRJZGVudGlmaWVyKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnTWVtYmVyRXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRNZW1iZXJFeHByZXNzaW9uKG5vZGUpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZERlZmF1bHQobm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRGdW5jdGlvbkRlY2xhcmF0aW9uKG5vZGU6IEJhc2VOb2RlLCBzaWJsaW5nczogSFRNTEVsZW1lbnRbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgICAgIFxuICAgICAgICBsZXQgZGVjbFN0YXJ0SXRlbXM6IChzdHJpbmcgfCBIVE1MRWxlbWVudClbXTtcbiAgICAgICAgaWYgKG4uaWQpIHtcbiAgICAgICAgICAgIGxldCBmdW5jSWQgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtaWQnLCBuLmlkLm5hbWUpO1xuICAgICAgICAgICAgZGVjbFN0YXJ0SXRlbXMgPSBbJ2Z1bmN0aW9uICcsIGZ1bmNJZCwgJyAoICddO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVjbFN0YXJ0SXRlbXMgPSBbJ2Z1bmN0aW9uICggJ107Ly8gKyBmdW5jLnBhcmFtcy5tYXAoeCA9PiB4Lm5hbWUpLmpvaW4oJywgJykgKyAnICkgeyc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFyYW1Db3VudCA9IG4ucGFyYW1zLmxlbmd0aDtcbiAgICAgICAgbi5wYXJhbXMuZm9yRWFjaCgocGFyYW0sIGkpID0+IHtcbiAgICAgICAgICAgIGxldCB2YXJOYW1lID0gQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhwYXJhbSk7XG4gICAgICAgICAgICBsZXQgZnVuY1BhcmFtID0gdGhpcy5idWlsZE5vZGUocGFyYW0pOy8vSHRtbEhlbHBlci5zcGFuKCdmdW5jLXBhcmFtJywgdmFyTmFtZSk7XG4gICAgICAgICAgICBkZWNsU3RhcnRJdGVtcy5wdXNoKGZ1bmNQYXJhbSk7XG4gICAgICAgICAgICBpZiAoaSA8IHBhcmFtQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgZGVjbFN0YXJ0SXRlbXMucHVzaCgnLCAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVjbFN0YXJ0SXRlbXMucHVzaCgnICkgeycpO1xuXG4gICAgICAgIGxldCBkZWNsU3RhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtc3RhcnQnLCBkZWNsU3RhcnRJdGVtcyk7XG4gICAgICAgIGxldCBmdW5jQm9keSA9IHRoaXMuYnVpbGROb2RlKG4uYm9keSk7XG4gICAgICAgIGxldCBkZWNsRW5kID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLWVuZCcsICd9Jyk7XG4gICAgICAgIGRlY2xFbmQgPSB0aGlzLmVuY2Fwc3VsYXRlTm9kZUluVmVyc2VDb250YWluZXIoZGVjbEVuZCk7XG4gICAgICAgIC8vbGV0IGRlY2wgPSBIdG1sSGVscGVyLnNwYW4oJ2Z1bmMtZGVjbGFyYXRpb24nLCBbZGVjbFN0YXJ0LCBmdW5jQm9keSwgZGVjbEVuZF0pO1xuICAgICAgICBsZXQgZGVjbCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1kZWNsYXJhdGlvbicsIGRlY2xTdGFydCk7XG4gICAgICAgIHNpYmxpbmdzLnB1c2goZnVuY0JvZHkpO1xuICAgICAgICBzaWJsaW5ncy5wdXNoKGRlY2xFbmQpO1xuICAgICAgICByZXR1cm4gZGVjbDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRCbG9ja1N0YXRlbWVudChub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICBsZXQgYm9keVN0YXRlbWVudHMgPSBuLmJvZHkubWFwKHN0YXRlbWVudCA9PiB0aGlzLmJ1aWxkTm9kZShzdGF0ZW1lbnQpKVxuICAgICAgICByZXR1cm4gSHRtbEhlbHBlci5zcGFuKCdibG9jaycsIGJvZHlTdGF0ZW1lbnRzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRJZlN0YXRlbWVudChub2RlOiBCYXNlTm9kZSwgc2libGluZ3M6IEhUTUxFbGVtZW50W10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBJZlN0YXRlbWVudDtcbiAgICAgICAgbGV0IGNvbnRlbnQ6IEhUTUxFbGVtZW50W10gPSBbXVxuICAgICAgICBsZXQgdGVzdCA9IHRoaXMuYnVpbGROb2RlKG4udGVzdCk7XG4gICAgICAgIGxldCBpZlN0YXJ0VGV4dCA9IFsnaWYgKCAnLCB0ZXN0LCAnICkgeyddO1xuICAgICAgICBsZXQgaWZTdGFydCA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLXN0YXRlbWVudC1zdGFydCcsIGlmU3RhcnRUZXh0KTtcbiAgICAgICAgY29udGVudC5wdXNoKGlmU3RhcnQpO1xuXG4gICAgICAgIGxldCB0aGVuQmxvY2sgPSB0aGlzLmJ1aWxkTm9kZShuLmNvbnNlcXVlbnQpO1xuICAgICAgICBsZXQgaWZUaGVuID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtYmxvY2stdGhlbicsIHRoZW5CbG9jayk7XG4gICAgICAgIGNvbnRlbnQucHVzaChpZlRoZW4pO1xuICAgICAgICBzaWJsaW5ncy5wdXNoKHRoZW5CbG9jayk7XG5cbiAgICAgICAgaWYgKG4uYWx0ZXJuYXRlKSB7XG4gICAgICAgICAgICBsZXQgaWZFbHNlRGVjbCA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLXN0YXRlbWVudC1lbHNlJywgJ30gZWxzZSB7Jyk7XG4gICAgICAgICAgICBpZkVsc2VEZWNsID0gdGhpcy5lbmNhcHN1bGF0ZU5vZGVJblZlcnNlQ29udGFpbmVyKGlmRWxzZURlY2wpO1xuICAgICAgICAgICAgY29udGVudC5wdXNoKGlmRWxzZURlY2wpO1xuICAgICAgICAgICAgc2libGluZ3MucHVzaChpZkVsc2VEZWNsKTtcblxuICAgICAgICAgICAgbGV0IGVsc2VCbG9jayA9IHRoaXMuYnVpbGROb2RlKG4uYWx0ZXJuYXRlKTtcbiAgICAgICAgICAgIGxldCBpZkVsc2UgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1ibG9jay1lbHNlJywgZWxzZUJsb2NrKTtcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaChpZkVsc2UpO1xuICAgICAgICAgICAgc2libGluZ3MucHVzaChpZkVsc2UpO1xuICAgICAgICB9IFxuICAgICAgICBsZXQgaWZFbmQgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1zdGF0ZW1lbnQtZW5kJywgJ30nKTtcbiAgICAgICAgaWZFbmQgPSB0aGlzLmVuY2Fwc3VsYXRlTm9kZUluVmVyc2VDb250YWluZXIoaWZFbmQpO1xuICAgICAgICBjb250ZW50LnB1c2goaWZFbmQpO1xuICAgICAgICBzaWJsaW5ncy5wdXNoKGlmRW5kKTtcblxuICAgICAgICAvL2xldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1zdGF0ZW1lbnQnLCBjb250ZW50KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBpZlN0YXJ0O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZFZhcmlhYmxlRGVjbGFyYXRpb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0aW9uO1xuICAgICAgICBsZXQgZGVjbGFyYXRpb25zID0gbi5kZWNsYXJhdGlvbnMubWFwKGQgPT4gdGhpcy5idWlsZE5vZGUoZCkpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdkZWNsYXJhdGlvbiB2YXJpYWJsZS1kZWNsYXJhdGlvbicpO1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gbi5raW5kICsgJyAnO1xuICAgICAgICBkZWNsYXJhdGlvbnMuZm9yRWFjaChkID0+IGNvbnRhaW5lci5hcHBlbmRDaGlsZChkKSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkVmFyaWFibGVEZWNsYXJhdG9yKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdG9yO1xuICAgICAgICBsZXQgbGVmdFBhcnQgPSB0aGlzLmJ1aWxkTm9kZShuLmlkKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lcjtcbiAgICAgICAgaWYgKG4uaW5pdCkge1xuICAgICAgICAgICAgbGV0IGFzc2lnblBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ29wZXJhdG9yIGFzc2lnbi1vcGVyYXRvcicsICc9Jyk7XG4gICAgICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmJ1aWxkTm9kZShuLmluaXQpO1xuICAgICAgICAgICAgbGV0IHJpZ2h0UGFydCA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtdmFsdWUnLCByaWdodCk7XG4gICAgICAgICAgICBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gdmFyaWFibGUtZGVjbGFyYXRvcicsIFtsZWZ0UGFydCwgYXNzaWduUGFydCwgcmlnaHRQYXJ0XSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gdmFyaWFibGUtZGVjbGFyYXRvcicsIGxlZnRQYXJ0KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRBc3NpZ25tZW50RXhwcmVzc2lvbihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuYnVpbGROb2RlKG4ubGVmdCk7XG4gICAgICAgIGxldCBsZWZ0UGFydCA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtaWQnLCBsZWZ0KTtcbiAgICAgICAgbGV0IGFzc2lnblBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ29wZXJhdG9yIGFzc2lnbi1vcGVyYXRvcicsICc9Jyk7XG4gICAgICAgIGxldCByaWdodCA9IHRoaXMuYnVpbGROb2RlKG4ucmlnaHQpO1xuICAgICAgICBsZXQgcmlnaHRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS12YWx1ZScsIHJpZ2h0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiBhc3NpZ25tZW50LWV4cHJlc3Npb24nLCBbbGVmdFBhcnQsIGFzc2lnblBhcnQsIHJpZ2h0UGFydF0pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEJpbmFyeUV4cHJlc3Npb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBCaW5hcnlFeHByZXNzaW9uO1xuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuYnVpbGROb2RlKG4ubGVmdCk7XG4gICAgICAgIGxldCBsZWZ0UGFydCA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbicsIGxlZnQpO1xuICAgICAgICBsZXQgb3BlcmF0b3JQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdvcGVyYXRvciBleHByZXNzaW9uLW9wZXJhdG9yJywgbi5vcGVyYXRvcik7XG4gICAgICAgIGxldCByaWdodCA9IHRoaXMuYnVpbGROb2RlKG4ucmlnaHQpO1xuICAgICAgICBsZXQgcmlnaHRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uJywgcmlnaHQpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIGJpbmFyeS1leHByZXNzaW9uJywgW2xlZnRQYXJ0LCBvcGVyYXRvclBhcnQsIHJpZ2h0UGFydF0pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEV4cHJlc3Npb25TdGF0ZW1lbnQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBFeHByZXNzaW9uU3RhdGVtZW50O1xuICAgICAgICBsZXQgY29kZSA9IHRoaXMuYnVpbGROb2RlKG4uZXhwcmVzc2lvbik7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBleHByZXNzaW9uLXN0YXRlbWVudCcsIGNvZGUpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZFJldHVyblN0YXRlbWVudChub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIFJldHVyblN0YXRlbWVudDtcbiAgICAgICAgbGV0IGFyZyA9IHRoaXMuYnVpbGROb2RlKG4uYXJndW1lbnQpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgcmV0dXJuLXN0YXRlbWVudCcsIFsncmV0dXJuICcsIGFyZ10pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZElkZW50aWZpZXIobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBJZGVudGlmaWVyO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdpZGVudGlmaWVyJywgQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhuKSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkTWVtYmVyRXhwcmVzc2lvbihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIE1lbWJlckV4cHJlc3Npb247XG4gICAgICAgIGxldCBvYmplY3QgPSB0aGlzLmJ1aWxkTm9kZShuLm9iamVjdCk7XG4gICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMuYnVpbGROb2RlKG4ucHJvcGVydHkpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIG1lbWJlci1leHByZXNzaW9uJywgW29iamVjdCwgJy4nLCBwcm9wZXJ0eV0pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZERlZmF1bHQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkZWZhdWx0OicsIG5vZGUpO1xuICAgICAgICBsZXQgY29kZSA9IGVzY29kZUdlbmVyYXRlKG5vZGUpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdkZWZhdWx0LScgKyBub2RlLnR5cGUsIGNvZGUpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBQcm9ncmVtU3RhdGUsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyLCBMaW5lQ2hhbmdlTGlzdGVuZXIsIEZyYW1lQ2hhbmdlTGlzdGVuZXIgfSBmcm9tIFwiLi9TY2hlZHVsaW5nU2VydmljZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT4ge1xuICAgIG5vZGU6IEFzdEJhc2VUeXBlXG4gICAgY29kZTogQXN0QmFzZVR5cGVcbn1cbi8qXG5leHBvcnQgaW50ZXJmYWNlIFZlcnNlSW5zdHJ1Y3Rpb25GYWN0b3J5PEFzdEJhc2VUeXBlPiB7XG4gICAgYnVpbGQocGFyYW06IEFzdEJhc2VUeXBlKTogUHJvZ3JlbVZlcnNlPEFzdEJhc2VUeXBlPjtcbn1cbiovXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPiB7XG4gICAgZnVuY3Rpb25Sb290Tm9kZTogQXN0QmFzZVR5cGVcbiAgICB2ZXJzZXM6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT5bXVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1GYWN0b3J5PEFzdEJhc2VUeXBlPiB7XG4gICAgYnVpbGRQcm9ncmVtKGNvZGU6IHN0cmluZyk6IFByb2dyZW1Db2RlPEFzdEJhc2VUeXBlPlxuICAgIGJ1aWxkQ291cGxldChub2RlOiBBc3RCYXNlVHlwZSwgdmVyc2VzOiBBc3RCYXNlVHlwZVtdKTogUHJvZ3JlbUNvdXBsZXQ8QXN0QmFzZVR5cGU+XG4gICAgYnVpbGRWZXJzZShub2RlOiBBc3RCYXNlVHlwZSk6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBWZXJzZUl0ZXJhdG9yPEFzdEJhc2VUeXBlPiB7XG4gICAgZXhlY3V0ZU5leHQoKTogUHJvZ3JlbVZlcnNlPEFzdEJhc2VUeXBlPlxuICAgIGhhc05leHQoKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtQ29kZTxBc3RCYXNlVHlwZT4ge1xuICAgIGluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCk6IFByb2dyZW1Db3VwbGV0PEFzdEJhc2VUeXBlPlxuICAgIGNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKTogUHJvZ3JlbUNvdXBsZXQ8QXN0QmFzZVR5cGU+XG4gICAgaXRlcmF0b3Ioc3RhdGU6IFByb2dyZW1TdGF0ZSk6IFZlcnNlSXRlcmF0b3I8QXN0QmFzZVR5cGU+XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbVNjaGVkdWxlciB7XG4gICAgc3Vic2NyaWJlQ29kZUV4ZWN1dGlvbihsaXN0ZW5lcjogQ29kZUV4ZWN1dGlvbkxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUdyaWRDaGFuZ2UobGlzdGVuZXI6IEdyaWRDaGFuZ2VMaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVMaW5lQ2hhbmdlKGxpc3RlbmVyOiBMaW5lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlRnJhbWVDaGFuZ2UobGlzdGVuZXI6IEZyYW1lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG4gICAgcmVzZXQoKTogUHJvZ3JlbVN0YXRlXG4gICAgY3VycmVudCgpOiBQcm9ncmVtU3RhdGVcbiAgICBuZXh0KCk6IFByb2dyZW1TdGF0ZVxuICAgIGdldFByb2dyZW0oKTogUHJvZ3JlbUNvZGU8YW55PlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1WaWV3IHtcbiAgICBidWlsZFZpZXcoc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyKTogSFRNTEVsZW1lbnRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdHlsZURlY29yYXRvcjxUPiB7XG4gICAgZGVjb3JhdGUobm9kZTogVCwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIdG1sQ291cGxldEZhY3Rvcnk8QXN0QmFzZVR5cGU+IHtcbiAgICBidWlsZENvdXBsZXQoKTogSFRNTEVsZW1lbnRcbiAgICBnZXRIdG1sVmVyc2UodmVyc2U6IFByb2dyZW1WZXJzZTxBc3RCYXNlVHlwZT4pOiBIVE1MRWxlbWVudFxufVxuXG5leHBvcnQgY2xhc3MgU3R5bGVEZWNvcmF0b3JBZ2dyZWdhdGlvbjxUPiBpbXBsZW1lbnRzIFN0eWxlRGVjb3JhdG9yPFQ+IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjb3JhdG9yczogU3R5bGVEZWNvcmF0b3I8VD5bXSkge31cblxuICAgIGRlY29yYXRlKG5vZGU6IFQsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgdGVtcDogSFRNTEVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmRlY29yYXRvcnMuZm9yRWFjaChkID0+IHRlbXAgPSBkLmRlY29yYXRlKG5vZGUsIHRlbXApKTtcbiAgICAgICAgcmV0dXJuIHRlbXA7XG4gICAgfVxuXG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29yYXRvcnMubWFwKGQgPT4gZC5idWlsZFN0eWxlU2hlZXQoKSkuam9pbignXFxuJyk7XG4gICAgfVxuXG59XG5cblxuIiwiaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgQ29kZVNlcnZpY2UgfSBmcm9tIFwiLi9Db2RlU2VydmljZVwiO1xuaW1wb3J0IHsgU2NoZWR1bGluZ1NlcnZpY2UgfSBmcm9tICcuL1NjaGVkdWxpbmdTZXJ2aWNlJztcbmltcG9ydCB7IFByb2dyZW1JbnNwZWN0b3JWaWV3IH0gZnJvbSAnLi9Qcm9ncmVtSW5zcGVjdG9yJztcbmltcG9ydCB7IEJhc2ljQ2FudmFzUHJvZ3JlbUdyaWQgfSBmcm9tICcuL1Byb2dyZW1HcmlkJztcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gJy4vU2NyZWVuU2VydmljZSc7XG5pbXBvcnQgeyBCYXNlTm9kZSB9IGZyb20gJ2VzdHJlZSc7XG5pbXBvcnQgeyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uLCBQcm9ncmVtU2NoZWR1bGVyIH0gZnJvbSAnLi9UeXBlcyc7XG5pbXBvcnQgeyBQYWRWZXJzZURlY29yYXRvciwgQ29sb3JWZXJzZVZhcmlhYmxlRGVjb3JhdG9yIH0gZnJvbSAnLi9Fc3RyZWVTdHlsZURlY29yYXRvcic7XG5pbXBvcnQgeyBIdG1sSGVscGVyIH0gZnJvbSAnLi9IdG1sSGVscGVyJztcbmltcG9ydCB7IEVzcHJpbWFQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkgfSBmcm9tICcuL0VzdHJlZVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeSc7XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVtQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvbG9ubmVzOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBsaWduZXM6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGZyYW1lczogbnVtYmVyLFxuICAgICkge31cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBQcm9ncmVtU2VydmljZSB7XG5cbiAgICB2YXIgcHJldmlvdXNSZXBhaW50VGltZSA9IDA7XG4gICAgdmFyIHNjaGVkdWxlcjogUHJvZ3JlbVNjaGVkdWxlcjtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFByb2dyZW0odXJsOiBzdHJpbmcsIHNjcmVlbkNvbmZpZzogU2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnOiBQcm9ncmVtQ29uZmlnKSB7XG4gICAgICAgIGxldCBwcm9ncmVtU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHByb2dyZW1TY3JpcHQuc3JjID0gdXJsO1xuICAgICAgICBsZXQgYm9keUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICAgIGlmIChib2R5RWxlbWVudCkge1xuICAgICAgICAgICAgYm9keUVsZW1lbnQuYXBwZW5kQ2hpbGQocHJvZ3JlbVNjcmlwdCk7XG4gICAgICAgIH1cblxuICAgICAgICBDb2RlU2VydmljZS5sb2FkUHJvZ3JlbSh1cmwpLnRoZW4oY29kZSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJvZ3JlbUNvZGUgPSBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFByb2dyZW0oY29kZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncHJvZ3JlbSBBU1Q6JywgcHJvZ3JlbUNvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbik7XG5cbiAgICAgICAgICAgIC8vIExvYWQgaW5pdFByb2dyZW0gRnVuY3Rpb24gY29kZVxuICAgICAgICAgICAgbGV0IGluaXRQcm9ncmVtRnVuY3Rpb25Db2RlID0gZXNjb2RlR2VuZXJhdGUocHJvZ3JlbUNvZGUuaW5pdGlhbGlzZXJQcm9ncmVtRnVuY3Rpb24oKS5mdW5jdGlvblJvb3ROb2RlKTtcbiAgICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5ldmFsKGluaXRQcm9ncmVtRnVuY3Rpb25Db2RlKTtcblxuICAgICAgICAgICAgc2NoZWR1bGVyID0gU2NoZWR1bGluZ1NlcnZpY2UuYnVpbGRQcm9ncmVtU2NoZWR1bGVyKHByb2dyZW1Db25maWcsIHByb2dyZW1Db2RlKTtcblxuICAgICAgICAgICAgLy9sZXQgcHJvZ3JlbUluc3BlY3RvciA9IG5ldyBCYXNpY0h0bWxFc3ByaW1hUHJvZ3JlbUluc3BlY3Rvcihwcm9ncmVtQ29kZSwgc2NoZWR1bGVyLCBkb2N1bWVudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9yRGVjb3JhdG9ycyA9IG5ldyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uPEJhc2VOb2RlPihbXG4gICAgICAgICAgICAgICAgbmV3IFBhZFZlcnNlRGVjb3JhdG9yKCksXG4gICAgICAgICAgICAgICAgbmV3IENvbG9yVmVyc2VWYXJpYWJsZURlY29yYXRvcigpLFxuICAgICAgICAgICAgICAgIC8vbmV3IEhpZ2hsaWdodEV4ZWN1dGluZ1ZlcnNlRGVjb3JhdG9yKHNjaGVkdWxlciksXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9yRmFjdG9yeSA9IG5ldyBFc3ByaW1hUHJvZ3JlbUluc3BlY3Rvckh0bWxGYWN0b3J5KHByb2dyZW1Db2RlLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKSwgcHJvZ3JlbUluc3BlY3RvckRlY29yYXRvcnMpO1xuICAgICAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JWaWV3ID0gbmV3IFByb2dyZW1JbnNwZWN0b3JWaWV3KHNjaGVkdWxlciwgcHJvZ3JlbUluc3BlY3RvckZhY3RvcnkpO1xuXG4gICAgICAgICAgICBsZXQgY29kZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignLmNvZGUnKTtcbiAgICAgICAgICAgIGlmIChjb2RlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2NvZGVFbGVtZW50JywgY29kZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50ID0gcHJvZ3JlbUluc3BlY3RvclZpZXcuYnVpbGRWaWV3KHNjaGVkdWxlcik7XG4gICAgICAgICAgICAgICAgY29kZUVsZW1lbnQuYXBwZW5kQ2hpbGQocHJvZ3JlbUluc3BlY3RvckNvbXBvbmVudCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGVjb3JhdG9yU3R5bGUgPSBwcm9ncmVtSW5zcGVjdG9yRGVjb3JhdG9ycy5idWlsZFN0eWxlU2hlZXQoKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdkZWNvcmF0b3JTdHlsZTonLCBkZWNvcmF0b3JTdHlsZSlcbiAgICAgICAgICAgICAgICBIdG1sSGVscGVyLmRlZmluZUNzc1J1bGVzKCdwcm9ncmVtLWluc3BlY3RvcicsIGRlY29yYXRvclN0eWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGdyaWRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZW0nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdncmlkRWxlbWVudCcsIGdyaWRFbGVtZW50KTtcbiAgICAgICAgICAgIGxldCBwcm9ncmVtR3JpZCA9IG5ldyBCYXNpY0NhbnZhc1Byb2dyZW1HcmlkKHNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZyk7XG4gICAgICAgICAgICBwcm9ncmVtR3JpZC5hdHRhY2goZ3JpZEVsZW1lbnQpO1xuICAgICAgICAgICAgcHJvZ3JlbUdyaWQuY2xlYXIoKTtcbiAgICAgICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVHcmlkQ2hhbmdlKHByb2dyZW1HcmlkKTtcblxuICAgICAgICAgICAgdGltZXIoMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRpbWVyKHRpbWVzdGFtcDogbnVtYmVyKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGltZXIpO1xuXG4gICAgICAgIGlmICh0aW1lc3RhbXAgLSBwcmV2aW91c1JlcGFpbnRUaW1lIDwgMTUwMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJldmlvdXNSZXBhaW50VGltZSA9IHRpbWVzdGFtcDtcblxuICAgICAgICBpZiAoc2NoZWR1bGVyKSB7XG4gICAgICAgICAgICBzY2hlZHVsZXIubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiXG5leHBvcnQgY2xhc3MgU2NyZWVuQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGJveFNpemU6IG51bWJlclxuICAgICkge31cbn1cblxuZXhwb3J0IGNsYXNzIFNjcmVlblNlcnZpY2Uge1xuXG4gICAgcHVibGljIGdldFNjcmVlbkZyYW1lKCk6IGFueSB7XG5cbiAgICB9XG5cbn0iLCJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBIdG1sSGVscGVyIHtcblxuICAgIHN0YXRpYyBhZGRDbGFzc2VzKGVsdDogSFRNTEVsZW1lbnQsIGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBpZiAodHlwZW9mIGNsYXNzZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnNwbGl0KCcgJykuZm9yRWFjaChjID0+IGVsdC5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjbGFzc2VzKSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5mb3JFYWNoKGMgPT4gZWx0LmNsYXNzTGlzdC5hZGQoYykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHNwYW4oY2xhc3Nlczogc3RyaW5nfHN0cmluZ1tdLCBjb250ZW50Pzogc3RyaW5nfEhUTUxFbGVtZW50fChIVE1MRWxlbWVudHxzdHJpbmcpW10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBlbHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgICAgIEh0bWxIZWxwZXIuYWRkQ2xhc3NlcyhlbHQsIGNsYXNzZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZWx0LmlubmVyVGV4dCA9IGNvbnRlbnQ7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgY29udGVudDogWyR7Y29udGVudH1dYCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBlbHQuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjb250ZW50KSkge1xuICAgICAgICAgICAgY29udGVudC5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgZWx0LmlubmVySFRNTCArPSBjO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYykge1xuICAgICAgICAgICAgICAgICAgICBlbHQuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VuYWJsZSB0byBhZGQgY29udGVudDonLCBjKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWZpbmVDc3NSdWxlcyhpZDogc3RyaW5nLCBjc3NSdWxlczogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBjc3NJZCA9ICdjc3MtJyArIGlkO1xuICAgICAgICBsZXQgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3NzSWQpO1xuICAgICAgICBpZighc3R5bGVFbGVtZW50KSB7XG4gICAgICAgICAgICBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICB9XG4gICAgICAgIHN0eWxlRWxlbWVudC5pZCA9IGNzc0lkO1xuICAgICAgICAvKiBhZGQgc3R5bGUgcnVsZXMgdG8gdGhlIHN0eWxlIGVsZW1lbnQgKi9cbiAgICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzc1J1bGVzKSk7XG4gICAgICAgIFxuICAgICAgICAvKiBhdHRhY2ggdGhlIHN0eWxlIGVsZW1lbnQgdG8gdGhlIGRvY3VtZW50IGhlYWQgKi9cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBQcm9ncmVtQ29uZmlnIH0gZnJvbSBcIi4vUHJvZ3JlbVNlcnZpY2VcIjtcbmltcG9ydCB7IEV2YWxTY29wZSB9IGZyb20gXCIuL0V2YWxTZXJ2aWNlXCI7XG5pbXBvcnQgeyBQcm9ncmVtU2NoZWR1bGVyLCBWZXJzZUl0ZXJhdG9yLCBQcm9ncmVtQ29kZSwgUHJvZ3JlbVZlcnNlIH0gZnJvbSBcIi4vVHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1TdGF0ZSB7XG5cbiAgICBwdWJsaWMgcmVhZG9ubHkgZXZhbFNjb3BlID0gbmV3IEV2YWxTY29wZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY29sb25uZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbGlnbmU6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGZyYW1lOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBjb250ZXh0ZTogb2JqZWN0LFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdmVyc2U6IFByb2dyZW1WZXJzZTxhbnk+IHwgbnVsbCxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZXZhbChleHByOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmFsU2NvcGUuZ2xvYmFsRXZhbChleHByKTtcbiAgICB9XG59XG5cbnR5cGUgTmV3U3RhdGVDYWxsYmFjayA9IChzdGF0ZTogUHJvZ3JlbVN0YXRlKSA9PiB2b2lkO1xuZXhwb3J0IGludGVyZmFjZSBDb2RlRXhlY3V0aW9uTGlzdGVuZXIge2ZpcmVDb2RlRXhlY3V0aW9uOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgR3JpZENoYW5nZUxpc3RlbmVyIHtmaXJlR3JpZENoYW5nZTogTmV3U3RhdGVDYWxsYmFja307XG5leHBvcnQgaW50ZXJmYWNlIExpbmVDaGFuZ2VMaXN0ZW5lciB7ZmlyZUxpbmVDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBGcmFtZUNoYW5nZUxpc3RlbmVyIHtmaXJlRnJhbWVDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuXG4vKlxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtU2NoZWR1bGVyIHtcbiAgICBzdWJzY3JpYmVDb2RlRXhlY3V0aW9uKGxpc3RlbmVyOiBDb2RlRXhlY3V0aW9uTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlR3JpZENoYW5nZShsaXN0ZW5lcjogR3JpZENoYW5nZUxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUxpbmVDaGFuZ2UobGlzdGVuZXI6IExpbmVDaGFuZ2VMaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVGcmFtZUNoYW5nZShsaXN0ZW5lcjogRnJhbWVDaGFuZ2VMaXN0ZW5lcik6IHZvaWRcblxuICAgIHJlc2V0KCk6IFByb2dyZW1TdGF0ZVxuICAgIGN1cnJlbnQoKTogUHJvZ3JlbVN0YXRlXG4gICAgbmV4dCgpOiBQcm9ncmVtU3RhdGVcbn1cbiovXG5cbmNsYXNzIFNpbXBsZVByb2dyZW1TY2hlZHVsZXIgaW1wbGVtZW50cyBQcm9ncmVtU2NoZWR1bGVyIHtcbiAgICBcbiAgICBwcml2YXRlIHN0YXRlOiBQcm9ncmVtU3RhdGU7XG4gICAgcHJpdmF0ZSBjb2RlSXRlcmF0b3I6IFZlcnNlSXRlcmF0b3I8YW55PiB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBjb2RlRXhlY3V0aW9uTGlzdGVuZXJzOiBDb2RlRXhlY3V0aW9uTGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgZ3JpZENoYW5nZUxpc3RlbmVyczogR3JpZENoYW5nZUxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGxpbmVDaGFuZ2VMaXN0ZW5lcnM6IExpbmVDaGFuZ2VMaXN0ZW5lcltdID0gW107XG4gICAgcHJpdmF0ZSBmcmFtZUNoYW5nZUxpc3RlbmVyczogRnJhbWVDaGFuZ2VMaXN0ZW5lcltdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogUHJvZ3JlbUNvbmZpZywgcHJpdmF0ZSBjb2RlOiBQcm9ncmVtQ29kZTxhbnk+KSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLnJlc2V0KCk7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlQ29kZUV4ZWN1dGlvbihsaXN0ZW5lcjogQ29kZUV4ZWN1dGlvbkxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29kZUV4ZWN1dGlvbkxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9ICAgIFxuICAgIFxuICAgIHN1YnNjcmliZUdyaWRDaGFuZ2UobGlzdGVuZXI6IEdyaWRDaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmdyaWRDaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlTGluZUNoYW5nZShsaXN0ZW5lcjogTGluZUNoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGluZUNoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVGcmFtZUNoYW5nZShsaXN0ZW5lcjogRnJhbWVDaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmZyYW1lQ2hhbmdlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHJlc2V0KCk6IFByb2dyZW1TdGF0ZSB7XG4gICAgICAgIC8vIENhbGwganVzdCBldmFsdWF0ZWQgaW5pdGlhbGlzZXJQcm9ncmVtIGZ1bmN0aW9uXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgbGV0IGluaXRpYWxDb250ZXh0ZTogb2JqZWN0ID0gaW5pdGlhbGlzZXJQcm9ncmVtKHRoaXMuY29uZmlnLmNvbG9ubmVzLCB0aGlzLmNvbmZpZy5saWduZXMpO1xuICAgICAgICBjb25zb2xlLmxvZygnTG9hZGVkIGluaXRpYWwgY29udGV4dGU6ICcsIGluaXRpYWxDb250ZXh0ZSk7XG4gICAgICAgIGxldCBzdGF0ZSA9IG5ldyBQcm9ncmVtU3RhdGUoMCwgMCwgMCwgaW5pdGlhbENvbnRleHRlLCBudWxsKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIGN1cnJlbnQoKTogUHJvZ3JlbVN0YXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxuXG4gICAgbmV4dCgpOiBQcm9ncmVtU3RhdGUge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUpIHRocm93IG5ldyBFcnJvcignSW5jb25zaXN0ZW50IFByb2dyZW0gc3RhdGUgIScpO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29kZUl0ZXJhdG9yID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuY29kZUl0ZXJhdG9yID0gdGhpcy5jb2RlLml0ZXJhdG9yKHRoaXMuc3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZygnaGFzTmV4dDonLCB0aGlzLmNvZGVJdGVyYXRvci5oYXNOZXh0KCkpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvZGVJdGVyYXRvci5oYXNOZXh0KCkpIHtcbiAgICAgICAgICAgIGxldCBzdGF0ZW1lbnQgPSB0aGlzLmNvZGVJdGVyYXRvci5leGVjdXRlTmV4dCgpO1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0gbmV3IFByb2dyZW1TdGF0ZSh0aGlzLnN0YXRlLmNvbG9ubmUsIHRoaXMuc3RhdGUubGlnbmUsIHRoaXMuc3RhdGUuZnJhbWUsIHRoaXMuc3RhdGUuY29udGV4dGUsIHN0YXRlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgICAgICB0aGlzLmNvZGVFeGVjdXRpb25MaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlQ29kZUV4ZWN1dGlvbihuZXdTdGF0ZSkpO1xuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZygnRmluaXNoZWQgaXRlcmF0aW5nIG92ZXIgY29kZS4nKVxuXG4gICAgICAgIGxldCBub3RpZnlQaXhlbENoYW5nZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbm90aWZ5TGluZUNoYW5nZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbm90aWZ5RnJhbWVDaGFuZ2UgPSBmYWxzZTtcblxuICAgICAgICBsZXQgX2NvbG9ubmUgPSB0aGlzLnN0YXRlLmNvbG9ubmU7XG4gICAgICAgIGxldCBfbGlnbmUgPSB0aGlzLnN0YXRlLmxpZ25lO1xuICAgICAgICBsZXQgX2ZyYW1lID0gdGhpcy5zdGF0ZS5mcmFtZTtcblxuICAgICAgICBfY29sb25uZSArKztcbiAgICAgICAgbm90aWZ5UGl4ZWxDaGFuZ2UgPSB0cnVlO1xuXG4gICAgICAgIGlmIChfY29sb25uZSA+PSB0aGlzLmNvbmZpZy5jb2xvbm5lcykge1xuICAgICAgICAgICAgX2NvbG9ubmUgPSAwO1xuICAgICAgICAgICAgX2xpZ25lICsrO1xuICAgICAgICAgICAgbm90aWZ5TGluZUNoYW5nZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX2xpZ25lID4gdGhpcy5jb25maWcubGlnbmVzKSB7XG4gICAgICAgICAgICBfbGlnbmUgPSAwO1xuICAgICAgICAgICAgX2ZyYW1lICsrO1xuICAgICAgICAgICAgbm90aWZ5RnJhbWVDaGFuZ2UgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9mcmFtZSA+IHRoaXMuY29uZmlnLmZyYW1lcykge1xuICAgICAgICAgICAgX2ZyYW1lID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuZXdTdGF0ZSA9IG5ldyBQcm9ncmVtU3RhdGUoX2NvbG9ubmUsIF9saWduZSwgX2ZyYW1lLCB0aGlzLnN0YXRlLmNvbnRleHRlLCBudWxsKTtcbiBcbiAgICAgICAgaWYgKG5vdGlmeVBpeGVsQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmdyaWRDaGFuZ2VMaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlR3JpZENoYW5nZSh0aGlzLnN0YXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm90aWZ5TGluZUNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5saW5lQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUxpbmVDaGFuZ2UodGhpcy5zdGF0ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vdGlmeUZyYW1lQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUZyYW1lQ2hhbmdlKHRoaXMuc3RhdGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgdGhpcy5jb2RlSXRlcmF0b3IgPSB0aGlzLmNvZGUuaXRlcmF0b3IobmV3U3RhdGUpO1xuXG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UHJvZ3JlbSgpOiBQcm9ncmVtQ29kZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29kZTtcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgU2NoZWR1bGluZ1NlcnZpY2Uge1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJvZ3JlbVNjaGVkdWxlcihjb25maWc6IFByb2dyZW1Db25maWcsIGNvZGU6IFByb2dyZW1Db2RlPGFueT4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTaW1wbGVQcm9ncmVtU2NoZWR1bGVyKGNvbmZpZywgY29kZSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgY3JlYXRlIGFzIG1kNUNyZWF0ZSB9IGZyb20gJ2pzLW1kNSc7XG5pbXBvcnQgeyBGdW5jdGlvbkRlY2xhcmF0aW9uLCBCYXNlTm9kZSwgQmxvY2tTdGF0ZW1lbnQsIElmU3RhdGVtZW50LCBFeHByZXNzaW9uLCBWYXJpYWJsZURlY2xhcmF0aW9uLCBWYXJpYWJsZURlY2xhcmF0b3IsIEV4cHJlc3Npb25TdGF0ZW1lbnQsIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBSZXR1cm5TdGF0ZW1lbnQsIENvbmRpdGlvbmFsRXhwcmVzc2lvbiwgQmluYXJ5RXhwcmVzc2lvbiB9IGZyb20gJ2VzdHJlZSc7XG5pbXBvcnQgeyBQcm9ncmVtU3RhdGUsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyIH0gZnJvbSAnLi9TY2hlZHVsaW5nU2VydmljZSc7XG5pbXBvcnQgeyBBc3RIZWxwZXIgfSBmcm9tICcuL0FzdEhlbHBlcic7XG5pbXBvcnQgeyBGdW5jdGlvbkRlY2xhcmF0aW9uVG9IdG1sVHJlZVN0b3JlLCBDb2RlU3Bvb2xlckVzVG9IdG1sVHJlZU1hcHBlckZhY3RvcnksIEVzVG9IdG1sVHJlZVN0b3JlIH0gZnJvbSAnLi9IdG1sVHJlZSc7XG5pbXBvcnQgeyBQcm9ncmVtQ29kZSwgUHJvZ3JlbVZpZXcsIFByb2dyZW1TY2hlZHVsZXIsIEh0bWxDb3VwbGV0RmFjdG9yeSB9IGZyb20gJy4vVHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1JbnNwZWN0b3Ige1xuICAgIGNsZWFyKCk6IHZvaWQ7XG4gICAgYXR0YWNoKGVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCk6IHZvaWRcbn1cblxuLypcbmV4cG9ydCBjbGFzcyBCYXNpY0h0bWxFc3ByaW1hUHJvZ3JlbUluc3BlY3RvciBpbXBsZW1lbnRzIFByb2dyZW1JbnNwZWN0b3IsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyIHtcbiAgICBcbiAgICBwcml2YXRlIHByb2dyZW1Db2RlTGluZXM6IEhUTUxFbGVtZW50W10gPSBbXTtcbiAgICBwcml2YXRlIGF0dGFjaGVkRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIG1hcHBpbmc6IE1hcDxCYXNlTm9kZSwgSFRNTEVsZW1lbnQ+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgaGludFN0YWNrQ29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSB0cmVlU3RvcmUxOiBFc1RvSHRtbFRyZWVTdG9yZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHByb2dyZW1Db2RlOiBFc3ByaW1hUHJvZ3JlbUNvZGUsXG4gICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyLFxuICAgICAgICBwcml2YXRlIF9kb2N1bWVudDogRG9jdW1lbnRcbiAgICApIHtcbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUNvZGVFeGVjdXRpb24odGhpcyk7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVHcmlkQ2hhbmdlKHRoaXMpO1xuICAgICAgICAvL3RoaXMuYnVpbGRIdG1sVHJlZTIoKTtcbiAgICAgICAgdGhpcy50cmVlU3RvcmUxID0gdGhpcy5idWlsZEh0bWxUcmVlMygpO1xuICAgIH1cblxuICAgIGF0dGFjaDAoZWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXR0YWNoZWRFbGVtZW50ID0gZWxlbWVudDtcblxuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgbGV0IGNvZGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvZGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29kZUNvbnRhaW5lcicpO1xuICAgICAgICAgICAgdGhpcy5oaW50U3RhY2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuaGludFN0YWNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpbnRDb250YWluZXInKTtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY29kZUNvbnRhaW5lcik7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuaGludFN0YWNrQ29udGFpbmVyKTtcblxuICAgICAgICAgICAgdGhpcy5wcm9ncmVtQ29kZUxpbmVzLm1hcChlbHQgPT4geyBjb2RlQ29udGFpbmVyLmFwcGVuZENoaWxkKGVsdCkgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhdHRhY2goZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hdHRhY2hlZEVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnRyZWVTdG9yZTEucGFpbnRJbnRvKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXIwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbG9yTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBpZiAodGhpcy5oaW50U3RhY2tDb250YWluZXIpXG4gICAgICAgICAgICB0aGlzLmhpbnRTdGFja0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICB0aGlzLm1hcHBpbmcuZm9yRWFjaCgoZWx0LCBub2RlKSA9PiBlbHQuY2xhc3NMaXN0LnJlbW92ZSgnaGlnaGxpZ2h0JykpO1xuICAgIH1cblxuICAgIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbG9yTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnRyZWVTdG9yZTEucmVzZXRTdHlsZSgpO1xuICAgICAgICBpZiAodGhpcy5oaW50U3RhY2tDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaGludFN0YWNrQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbG9yTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuXG4gICAgcHJpdmF0ZSBoc2xDb2xvcihodWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnaHNsKCcgKyBodWUgKyAnLCAxMDAlLCA4MCUpJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhc2hTdHJpbmdUb0NvbG9yKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBzaGlmdCA9IDI7XG4gICAgICAgIGxldCBjb2xvckNvdW50ID0gMTI7XG5cbiAgICAgICAgdmFyIGh1ZSA9IHRoaXMuY29sb3JNYXAuZ2V0KGtleSk7XG4gICAgICAgIGlmIChodWUpIHJldHVybiB0aGlzLmhzbENvbG9yKGh1ZSk7XG5cbiAgICAgICAgdmFyIGhhc2ggPSBtZDVDcmVhdGUoKS51cGRhdGUoa2V5KS50b1N0cmluZygpO1xuICAgICAgICBcbiAgICAgICAgaHVlID0gKCBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDAsIHNoaWZ0ICsgMSksIDE2KSArIDE2ICogcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAxLCBzaGlmdCArIDIpLCAxNikgKyAyNTYgKiBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDIsIHNoaWZ0ICsgMyksIDE2KSApO1xuICAgICAgICBodWUgPSBNYXRoLmZsb29yKGh1ZSAlIGNvbG9yQ291bnQpICogMzYwIC8gY29sb3JDb3VudDtcblxuICAgICAgICB3aGlsZSAoIXRoaXMuY29sb3JNYXAuZ2V0KGtleSkpIHtcbiAgICAgICAgICAgIGxldCBkdXBsaWNhdGVDb2xvciA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yIChsZXQgYyBvZiB0aGlzLmNvbG9yTWFwLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPT09IGh1ZSkge1xuICAgICAgICAgICAgICAgICAgICBkdXBsaWNhdGVDb2xvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGh1ZSArPSBNYXRoLmZsb29yKDM2MCAvIGNvbG9yQ291bnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWR1cGxpY2F0ZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvck1hcC5zZXQoa2V5LCBodWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL3ZhciBwYXN0ZWwgPSAnaHNsKCcgKyBodWUgKyAnLCAxMDAlLCA4Ny41JSknO1xuICAgICAgICByZXR1cm4gdGhpcy5oc2xDb2xvcihodWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBmaXJlQ29kZUV4ZWN1dGlvbihzdGF0ZTogUHJvZ3JlbVN0YXRlKSB7XG4gICAgICAgIGlmIChzdGF0ZS52ZXJzZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWNlaXZlZCBhIG51bGwgc3RhdGVtZW50ICEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdGhpcy5tYXBwaW5nLmZvckVhY2goKGVsdCwgbm9kZSkgPT4gZWx0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZ2hsaWdodCcpKTtcbiAgICAgICAgdGhpcy50cmVlU3RvcmUxLnJlbW92ZVN0eWxlQ2xhc3NlcyhbJ2hpZ2hsaWdodCddKTtcblxuICAgICAgICBsZXQgZXhlY3V0ZWROb2RlID0gc3RhdGUudmVyc2UuYXN0Um9vdE5vZGU7XG4gICAgICAgIC8vbGV0IGh0bWxOb2RlID0gdGhpcy5tYXBwaW5nLmdldChleGVjdXRlZE5vZGUpO1xuICAgICAgICAvL2lmICghaHRtbE5vZGUpIHtcbiAgICAgICAgLy8gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZm91bmQgYSBIVE1MIGVsZW1lbnQgbWFwcGVkIGZvciByZWNlaXZlZCBzdGF0ZW1lbnQgIScpXG4gICAgICAgIC8vfVxuICAgICAgICAvL2h0bWxOb2RlLmNsYXNzTGlzdC5hZGQoJ2hpZ2hsaWdodCcpO1xuICAgICAgICB0aGlzLnRyZWVTdG9yZTEuYWRkU3R5bGVDbGFzc2VzKGV4ZWN1dGVkTm9kZSwgWydoaWdobGlnaHQnXSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGludFN0YWNrQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IEFzdEhlbHBlci5yZWR1Y2VOb2RlVG9WYXJEZWNsYXJhdGlvbihleGVjdXRlZE5vZGUpO1xuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAnVmFyaWFibGVEZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlY2wgPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBkZWNsLmRlY2xhcmF0aW9ucy5tYXAoZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoaW50ID0gdGhpcy5hcHBlbmRIaW50KHRoaXMuaGludFN0YWNrQ29udGFpbmVyLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcoZC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFyVmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5pbml0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyVmFsdWUgPSBzdGF0ZS5ldmFsU2NvcGUuZ2xvYmFsRXZhbChlc2NvZGVHZW5lcmF0ZShkLmluaXQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQuaW5uZXJIVE1MID0gdmFyTmFtZSArICcgPSAnICsgdmFyVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBoaW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IodmFyTmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHBFbHQgPSB0aGlzLm1hcHBpbmcuZ2V0KGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAocEVsdCkgcEVsdC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKHZhck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlU3RvcmUxLnNldFN0eWxlUHJvcGVydHkoZCwgJ2JhY2tncm91bmRDb2xvcicsIHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IodmFyTmFtZSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGVjbCA9IG5vZGUgYXMgQXNzaWdubWVudEV4cHJlc3Npb247XG5cbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGxldCBoaW50ID0gdGhpcy5hcHBlbmRIaW50KHRoaXMuaGludFN0YWNrQ29udGFpbmVyLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YXJOYW1lID0gQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhkZWNsLmxlZnQpO1xuICAgICAgICAgICAgICAgICAgICBoaW50LmlubmVySFRNTCA9IHZhck5hbWUgKyAnID0gJyArIHN0YXRlLmV2YWxTY29wZS5nbG9iYWxFdmFsKHZhck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBoaW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IodmFyTmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgcEVsdCA9IHRoaXMubWFwcGluZy5nZXQoZGVjbCk7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKHBFbHQpIHBFbHQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5oYXNoU3RyaW5nVG9Db2xvcih2YXJOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlU3RvcmUxLnNldFN0eWxlUHJvcGVydHkoZGVjbCwgJ2JhY2tncm91bmRDb2xvcicsIHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IodmFyTmFtZSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZ1bmMgPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgZnVuYy5wYXJhbXMuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YXJOYW1lID0gQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YXJWYWx1ZSA9IHN0YXRlLmV2YWxTY29wZS5nbG9iYWxFdmFsKHZhck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGludCA9IHRoaXMuYXBwZW5kSGludCh0aGlzLmhpbnRTdGFja0NvbnRhaW5lciwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGludC5pbm5lckhUTUwgPSB2YXJOYW1lICsgJyA9ICcgKyB2YXJWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5oYXNoU3RyaW5nVG9Db2xvcih2YXJOYW1lKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgcEVsdCA9IHRoaXMubWFwcGluZy5nZXQocCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChwRWx0KSBwRWx0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IodmFyTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWVTdG9yZTEuc2V0U3R5bGVQcm9wZXJ0eShwLCAnYmFja2dyb3VuZENvbG9yJywgdGhpcy5oYXNoU3RyaW5nVG9Db2xvcih2YXJOYW1lKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHVibGljIGZpcmVHcmlkQ2hhbmdlKHN0YXRlOiBQcm9ncmVtU3RhdGUpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwZW5kQ29kZUxpbmUocGFyZW50OiBIVE1MRWxlbWVudCwgcGFkZGluZzogbnVtYmVyKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgZWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInByZVwiKTtcbiAgICAgICAgZWx0LmNsYXNzTGlzdC5hZGQoJ3BhZGRpbmctJyArIHBhZGRpbmcpO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWx0KTtcblxuICAgICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwZW5kU3BhbihwYXJlbnQ6IEhUTUxFbGVtZW50LCBodG1sQ2xhc3M6IHN0cmluZ1tdLCB0ZXh0ID0gXCJcIik6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGVsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBodG1sQ2xhc3MuZm9yRWFjaChjID0+IGVsdC5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsdCk7XG4gICAgICAgIGVsdC5pbm5lclRleHQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwZW5kSGludChwYXJlbnQ6IEhUTUxFbGVtZW50LCBodG1sQ2xhc3M6IHN0cmluZ1tdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgcHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInByZVwiKTtcbiAgICAgICAgbGV0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgaHRtbENsYXNzLmZvckVhY2goYyA9PiBwcmUuY2xhc3NMaXN0LmFkZChjKSk7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChwcmUpO1xuICAgICAgICBwcmUuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIHJldHVybiBzcGFuO1xuICAgIH1cblxuICAgIC8vIEJ1aWxkIEhUTUwgSW5zcGVjdG9yIGJ5IGNyYXdsaW5nIHJlY3Vyc2l2ZWx5IEFTVCBzdGFja3NcbiAgICBwcml2YXRlIHVuc3RhY2tBc3QocGFyZW50RWxlbWVudDogSFRNTEVsZW1lbnQsIHN0YWNrOiBCYXNlTm9kZVtdLCBwYWRkaW5nOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgc3RhY2suZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgIGlmICghbm9kZSkgdGhyb3cgbmV3IEVycm9yKCdTaG91bGQgbm90IGJlIGFibGUgdG8gc2hpZnQgYSBudWxsIG5vZGUgIScpO1xuXG4gICAgICAgICAgICBsZXQgbGluZSwgc3RhcnRMaW5lOiBIVE1MRWxlbWVudCwgZW5kTGluZSwgbiwgdmFyU3BhbiwgbGVmdFNwYW4sIHJpZ2h0U3BhbjtcbiAgICAgICAgICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHBhcmVudEVsZW1lbnQsIG4uYm9keSwgcGFkZGluZyArIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Z1bmN0aW9uRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBzdGFydExpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KG5vZGUsIHN0YXJ0TGluZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXMuYXBwZW5kU3BhbihzdGFydExpbmUsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gJ2Z1bmN0aW9uICcgKyBuLmlkLm5hbWUgKyAnICggJzsvLyArIGZ1bmMucGFyYW1zLm1hcCh4ID0+IHgubmFtZSkuam9pbignLCAnKSArICcgKSB7JztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuID0gdGhpcy5hcHBlbmRTcGFuKHN0YXJ0TGluZSwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnZnVuY3Rpb24gKCAnOy8vICsgZnVuYy5wYXJhbXMubWFwKHggPT4geC5uYW1lKS5qb2luKCcsICcpICsgJyApIHsnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmFtQ291bnQgPSBuLnBhcmFtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIG4ucGFyYW1zLmZvckVhY2goKHBhcmFtLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcocGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmFwcGVuZFNwYW4oc3RhcnRMaW5lLCBbJ3ZhcklkJ10sIHZhck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChwYXJhbSwgc3Bhbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IHBhcmFtQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmFwcGVuZFNwYW4oc3RhcnRMaW5lLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnLCAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXMuYXBwZW5kU3BhbihzdGFydExpbmUsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgKz0gJyApIHsnO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChwYXJlbnRFbGVtZW50LCBuLmJvZHkuYm9keSwgcGFkZGluZyArIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGVuZExpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBlbmRMaW5lLmlubmVySFRNTCA9ICd9JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdJZlN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIElmU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBzdGFydExpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KG4udGVzdCwgc3RhcnRMaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgLy9zdGFydExpbmUuaW5uZXJIVE1MID0gJ2lmICggPHNwYW4+JyArIEVzY29kZWdlbi5nZW5lcmF0ZShpZnN0bXQudGVzdCkgKyAnPC9zcGFuPiApIHsnO1xuICAgICAgICAgICAgICAgICAgICBzdGFydExpbmUuaW5uZXJIVE1MID0gJ2lmICggJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHN0YXJ0TGluZSwgW24udGVzdF0sIDApO1xuICAgICAgICAgICAgICAgICAgICBzdGFydExpbmUuaW5uZXJIVE1MICs9ICcgKSB7JztcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QocGFyZW50RWxlbWVudCwgW24uY29uc2VxdWVudF0sIHBhZGRpbmcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBtaWRMaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobi5hbHRlcm5hdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pZExpbmUuaW5uZXJIVE1MID0gJ30gZWxzZSB7JztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChwYXJlbnRFbGVtZW50LCBbbi5hbHRlcm5hdGVdLCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGVuZExpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBlbmRMaW5lLmlubmVySFRNTCA9ICd9JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdWYXJpYWJsZURlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQobm9kZSwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUuaW5uZXJIVE1MID0gbi5raW5kICsgJyAnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QobGluZSwgbi5kZWNsYXJhdGlvbnMsIDApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1ZhcmlhYmxlRGVjbGFyYXRvcic6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgdmFyU3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ3ZhcklkJ10pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KG5vZGUsIHZhclNwYW4pO1xuICAgICAgICAgICAgICAgICAgICB2YXJTcGFuLmlubmVySFRNTCA9IEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcobi5pZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuLmluaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbXSwgJyA9ICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluaXRTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsndmFySW5pdCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChpbml0U3BhbiwgW24uaW5pdF0sIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbXSwgJzsnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdBc3NpZ25tZW50RXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuICAgICAgICAgICAgICAgICAgICBsZWZ0U3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ3ZhcklkJ10pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KG5vZGUsIGxlZnRTcGFuKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KGxlZnRTcGFuLCBbbi5sZWZ0XSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbXSwgJyA9ICcpO1xuICAgICAgICAgICAgICAgICAgICByaWdodFNwYW4gPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWyd2YXJJbml0J10pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QocmlnaHRTcGFuLCBbbi5yaWdodF0sIDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgW10sICc7Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnQmluYXJ5RXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIEJpbmFyeUV4cHJlc3Npb247XG4gICAgICAgICAgICAgICAgICAgIGxlZnRTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsnbGVmdEJpbiddKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KGxlZnRTcGFuLCBbbi5sZWZ0XSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbXSwgJyAnICsgbi5vcGVyYXRvciArICcgJyk7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0U3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ3JpZ2h0QmluJ10pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QocmlnaHRTcGFuLCBbbi5yaWdodF0sIDApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0V4cHJlc3Npb25TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBFeHByZXNzaW9uU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChub2RlLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KGxpbmUsIFtuLmV4cHJlc3Npb25dLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdSZXR1cm5TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBSZXR1cm5TdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQobm9kZSwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUuaW5uZXJIVE1MID0gZXNjb2RlR2VuZXJhdGUobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RlZmF1bHQ6Jywgbm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWyduc3ktJyArIG5vZGUudHlwZV0sIGVzY29kZUdlbmVyYXRlKG5vZGUpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChub2RlLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGRIdG1sVHJlZTIoKSB7XG4gICAgICAgIGNvbnN0IGNvZGVSb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGhpcy5wcm9ncmVtQ29kZUxpbmVzLnB1c2goY29kZVJvb3QpO1xuICAgICAgICB0aGlzLnVuc3RhY2tBc3QoY29kZVJvb3QsIFt0aGlzLnByb2dyZW1Db2RlLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKS5hc3RSb290Tm9kZV0sIDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGRIdG1sVHJlZTMoKTogRXNUb0h0bWxUcmVlU3RvcmUge1xuICAgICAgICBjb25zdCBjb2RlUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMucHJvZ3JlbUNvZGVMaW5lcy5wdXNoKGNvZGVSb290KTtcbiAgICAgICAgXG4gICAgICAgIGxldCBmYWN0b3J5ID0gbmV3IENvZGVTcG9vbGVyRXNUb0h0bWxUcmVlTWFwcGVyRmFjdG9yeSh0aGlzLl9kb2N1bWVudCk7XG4gICAgICAgIGxldCB0cmVlU3RvcmUgPSBmYWN0b3J5LmJ1aWxkKHRoaXMucHJvZ3JlbUNvZGUpO1xuXG4gICAgICAgIHRyZWVTdG9yZS5wYWludEludG8oY29kZVJvb3QpO1xuXG4gICAgICAgIHJldHVybiB0cmVlU3RvcmU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZEh0bWxUcmVlKCkge1xuICAgICAgICBjb25zdCBjb2RlUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IHN0YWNrOiBCYXNlTm9kZVtdID0gW3RoaXMucHJvZ3JlbUNvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbigpLmFzdFJvb3ROb2RlXTtcbiAgICAgICAgbGV0IHBhZGRpbmcgPSAwO1xuXG4gICAgICAgIC8vdGhpcy5wcm9ncmVtQ29kZS5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCkuYm9keS5ib2R5Lm1hcChuID0+IHN0YWNrLnB1c2gobikpO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICghbm9kZSkgdGhyb3cgbmV3IEVycm9yKCdTaG91bGQgbm90IGJlIGFibGUgdG8gc2hpZnQgYSBudWxsIG5vZGUgIScpO1xuICAgICAgICAgICAgdmFyIGxpbmU7XG5cbiAgICAgICAgICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2sgPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nKytcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suYm9keS5zbGljZSgwKS5yZXZlcnNlKCkubWFwKHggPT4gc3RhY2sudW5zaGlmdCh4KSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VuZEJsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIGhhY2sgdG8gY2xvc2UgYW4gb3BlbmVkIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmctLTtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUoY29kZVJvb3QsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9ICd9JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIGxldCBmdW5jID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShjb2RlUm9vdCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmdW5jLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9ICdmdW5jdGlvbiAnICsgZnVuYy5pZC5uYW1lICsgJyAoKSB7JzsvLyArIGZ1bmMucGFyYW1zLm1hcCh4ID0+IHgubmFtZSkuam9pbignLCAnKSArICcgKSB7JztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUuaW5uZXJIVE1MID0gJ2Z1bmN0aW9uICgpIHsnOy8vICsgZnVuYy5wYXJhbXMubWFwKHggPT4geC5uYW1lKS5qb2luKCcsICcpICsgJyApIHsnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoeyB0eXBlOiAnRW5kQmxvY2tTdGF0ZW1lbnQnIH0pOyAvLyBIYWNrIHRvIGRlbGF5IGEgYmxvY2sgZW5kXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoZnVuYy5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnSWZTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBsZXQgaWZzdG10ID0gbm9kZSBhcyBJZlN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUoY29kZVJvb3QsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9ICdpZiAoIDxzcGFuPicgKyBlc2NvZGVHZW5lcmF0ZShpZnN0bXQudGVzdCkgKyAnPC9zcGFuPiApIHsnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KGlmc3RtdC50ZXN0LCBsaW5lKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaWZzdG10LmFsdGVybmF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh7IHR5cGU6ICdFbmRCbG9ja1N0YXRlbWVudCcgfSk7IC8vIEhhY2sgdG8gZGVsYXkgYSBibG9jayBlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoaWZzdG10LmFsdGVybmF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh7IHR5cGU6ICdFbHNlQmxvY2tTdGF0ZW1lbnQnIH0pOyAvLyBIYWNrIHRvIGRlbGF5IGFuIGVsc2UgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdChpZnN0bXQuY29uc2VxdWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Vsc2VCbG9ja1N0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBoYWNrIHRvIGNsb3NlIGFuIG9wZW5lZCBibG9ja1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nLS07XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKGNvZGVSb290LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5pbm5lckhUTUwgPSAnfSBlbHNlIHsnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShjb2RlUm9vdCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUudGV4dENvbnRlbnQgPSBlc2NvZGVHZW5lcmF0ZShub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5jbGFzc0xpc3QuYWRkKCdzdGF0ZW1lbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChub2RlLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHN0YWNrLmxlbmd0aCA+IDApO1xuICAgIH1cbn1cblxuKi9cblxuZXhwb3J0IGNsYXNzIFByb2dyZW1JbnNwZWN0b3JWaWV3IGltcGxlbWVudHMgUHJvZ3JlbVZpZXcsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyIHtcblxuICAgIHByaXZhdGUgZXhlY3V0aW5nRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcbiAgICBwcml2YXRlIGV4ZWN1dGVkRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVhFQ1VUSU5HX0NMQVNTID0gJ3ZlcnNlLWV4ZWN1dGluZyc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBFWEVDVVRFRF9DTEFTUyA9ICd2ZXJzZS1leGVjdXRlZCc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXIsXG4gICAgICAgIHByaXZhdGUgaHRtbEZhY3Rvcnk6IEh0bWxDb3VwbGV0RmFjdG9yeTxhbnk+XG4gICAgKSB7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVDb2RlRXhlY3V0aW9uKHRoaXMpO1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlR3JpZENoYW5nZSh0aGlzKTtcbiAgICB9XG5cbiAgICBidWlsZFZpZXcoc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgaHRtbENvbXBvbmVudCA9IHRoaXMuaHRtbEZhY3RvcnkuYnVpbGRDb3VwbGV0KCk7XG4gICAgICAgIHJldHVybiBodG1sQ29tcG9uZW50O1xuICAgIH1cbiAgICBcbiAgICBmaXJlQ29kZUV4ZWN1dGlvbihzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIGlmICghc3RhdGUudmVyc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIGxldCBodG1sVmVyc2UgPSB0aGlzLmh0bWxGYWN0b3J5LmdldEh0bWxWZXJzZShzdGF0ZS52ZXJzZSk7XG4gICAgICAgIGlmKGh0bWxWZXJzZSkge1xuICAgICAgICAgICAgaHRtbFZlcnNlLmNsYXNzTGlzdC5hZGQoUHJvZ3JlbUluc3BlY3RvclZpZXcuRVhFQ1VUSU5HX0NMQVNTKTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodGhpcy5leGVjdXRpbmdFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgZWx0ID0gdGhpcy5leGVjdXRpbmdFbGVtZW50cy5wb3AoKTtcbiAgICAgICAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVkRWxlbWVudHMucHVzaChlbHQpO1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QucmVtb3ZlKFByb2dyZW1JbnNwZWN0b3JWaWV3LkVYRUNVVElOR19DTEFTUyk7XG4gICAgICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5hZGQoUHJvZ3JlbUluc3BlY3RvclZpZXcuRVhFQ1VURURfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghaHRtbFZlcnNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmV4ZWN1dGluZ0VsZW1lbnRzLnB1c2goaHRtbFZlcnNlKTtcbiAgICAgICAgaHRtbFZlcnNlLmNsYXNzTGlzdC5hZGQoUHJvZ3JlbUluc3BlY3RvclZpZXcuRVhFQ1VUSU5HX0NMQVNTKTtcbiAgICB9XG5cbiAgICBmaXJlR3JpZENoYW5nZShzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIHdoaWxlICh0aGlzLmV4ZWN1dGluZ0VsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBlbHQgPSB0aGlzLmV4ZWN1dGluZ0VsZW1lbnRzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKGVsdCkge1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QucmVtb3ZlKFByb2dyZW1JbnNwZWN0b3JWaWV3LkVYRUNVVEVEX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yVmlldy5FWEVDVVRJTkdfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuZXhlY3V0ZWRFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgZWx0ID0gdGhpcy5leGVjdXRlZEVsZW1lbnRzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKGVsdCkge1xuICAgICAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QucmVtb3ZlKFByb2dyZW1JbnNwZWN0b3JWaWV3LkVYRUNVVEVEX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZShQcm9ncmVtSW5zcGVjdG9yVmlldy5FWEVDVVRJTkdfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBTdHlsZURlY29yYXRvciwgUHJvZ3JlbVNjaGVkdWxlciB9IGZyb20gXCIuL1R5cGVzXCI7XG5pbXBvcnQgeyBCYXNlTm9kZSwgVmFyaWFibGVEZWNsYXJhdG9yLCBBc3NpZ25tZW50RXhwcmVzc2lvbiwgSWRlbnRpZmllciB9IGZyb20gXCJlc3RyZWVcIjtcbmltcG9ydCB7IEFzdEhlbHBlciB9IGZyb20gXCIuL0FzdEhlbHBlclwiO1xuaW1wb3J0IHsgY3JlYXRlIGFzIG1kNUNyZWF0ZSB9IGZyb20gJ2pzLW1kNSc7XG5pbXBvcnQgeyBQcm9ncmVtSW5zcGVjdG9yVmlldyB9IGZyb20gXCIuL1Byb2dyZW1JbnNwZWN0b3JcIjtcblxuZXhwb3J0IGNsYXNzIENvbG9yVmVyc2VWYXJpYWJsZURlY29yYXRvciBpbXBsZW1lbnRzIFN0eWxlRGVjb3JhdG9yPEJhc2VOb2RlPiB7XG5cbiAgICBwcml2YXRlIHZhcmlhYmxlTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuXG4gICAgZGVjb3JhdGUobm9kZTogQmFzZU5vZGUsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgdmFySWQ7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0b3InKSB7XG4gICAgICAgICAgICBsZXQgbiA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdG9yO1xuICAgICAgICAgICAgdmFySWQgPSBBc3RIZWxwZXIucGF0dGVyblRvU3RyaW5nKG4uaWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgIGxldCBuID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgICAgIHZhcklkID0gQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhuLmxlZnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdJZGVudGlmaWVyJykge1xuICAgICAgICAgICAgbGV0IG4gPSBub2RlIGFzIElkZW50aWZpZXI7XG4gICAgICAgICAgICB2YXJJZCA9IG4ubmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YXJJZCkge1xuICAgICAgICAgICAgbGV0IHZhckluZGV4ID0gdGhpcy52YXJpYWJsZU1hcC5nZXQodmFySWQpO1xuICAgICAgICAgICAgaWYgKCF2YXJJbmRleCkge1xuICAgICAgICAgICAgICAgIHZhckluZGV4ID0gdGhpcy52YXJpYWJsZU1hcC5zaXplICsgMTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhcmlhYmxlTWFwLnNldCh2YXJJZCwgdmFySW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3ZhcmlhYmxlJyk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3ZhcmlhYmxlLScgKyB2YXJJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9ICAgIFxuICAgIFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc3R5bGUgPSAnJztcbiAgICAgICAgLy9jb25zb2xlLmxvZygndmFyaWFibGUgY291bnQ6JywgdGhpcy52YXJpYWJsZU1hcC5zaXplKTtcbiAgICAgICAgdGhpcy52YXJpYWJsZU1hcC5mb3JFYWNoKChpbmRleCwgaWQpID0+IHtcbiAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IoaWQsIHRoaXMudmFyaWFibGVNYXAuc2l6ZSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdidWlsZGluZyBjb2xvciAjJywgaWQsICc9PicsIGNvbG9yKTtcbiAgICAgICAgICAgIHN0eWxlICs9IGBcbiAgICAgICAgICAgICAgICAudmFyaWFibGUge1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAycHggNXB4O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLiR7UHJvZ3JlbUluc3BlY3RvclZpZXcuRVhFQ1VUSU5HX0NMQVNTfSAudmFyaWFibGUtJHtpbmRleH0uaWRlbnRpZmllciwgXG4gICAgICAgICAgICAgICAgLiR7UHJvZ3JlbUluc3BlY3RvclZpZXcuRVhFQ1VURURfQ0xBU1N9IC52YXJpYWJsZS0ke2luZGV4fS5pZGVudGlmaWVyIHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcn07XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGA7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGNvbG9yTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuXG4gICAgcHJpdmF0ZSBoc2xDb2xvcihodWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnaHNsKCcgKyBodWUgKyAnLCAxMDAlLCA4MCUpJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhc2hTdHJpbmdUb0NvbG9yKGtleTogc3RyaW5nLCBjb2xvckNvdW50OiBudW1iZXIgPSAxMiwgc2hpZnQ6IG51bWJlciA9IDIpIHtcbiAgICAgICAgdmFyIGh1ZSA9IHRoaXMuY29sb3JNYXAuZ2V0KGtleSk7XG4gICAgICAgIGlmIChodWUpIHJldHVybiB0aGlzLmhzbENvbG9yKGh1ZSk7XG5cbiAgICAgICAgdmFyIGhhc2ggPSBtZDVDcmVhdGUoKS51cGRhdGUoa2V5KS50b1N0cmluZygpO1xuICAgICAgICBcbiAgICAgICAgaHVlID0gKCBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDAsIHNoaWZ0ICsgMSksIDE2KSArIDE2ICogcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAxLCBzaGlmdCArIDIpLCAxNikgKyAyNTYgKiBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDIsIHNoaWZ0ICsgMyksIDE2KSApO1xuICAgICAgICBodWUgPSBNYXRoLmZsb29yKGh1ZSAlIGNvbG9yQ291bnQpICogMzYwIC8gY29sb3JDb3VudDtcbiAgICAgICAgaHVlID0gaHVlICUgMzYwO1xuXG4gICAgICAgIC8vIENvbG9yIGRlZHVwbGljYXRpb25cbiAgICAgICAgd2hpbGUgKCF0aGlzLmNvbG9yTWFwLmdldChrZXkpKSB7XG4gICAgICAgICAgICBsZXQgZHVwbGljYXRlQ29sb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGMgb2YgdGhpcy5jb2xvck1hcC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhjIC0gaHVlKSA8IE1hdGguZmxvb3IoMTgwIC8gY29sb3JDb3VudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZHVwbGljYXRlQ29sb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBodWUgKz0gTWF0aC5mbG9vcigyNzAgLyBjb2xvckNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgaHVlID0gaHVlICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWR1cGxpY2F0ZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvck1hcC5zZXQoa2V5LCBodWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL3ZhciBwYXN0ZWwgPSAnaHNsKCcgKyBodWUgKyAnLCAxMDAlLCA4Ny41JSknO1xuICAgICAgICByZXR1cm4gdGhpcy5oc2xDb2xvcihodWUpO1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgUGFkVmVyc2VEZWNvcmF0b3IgaW1wbGVtZW50cyBTdHlsZURlY29yYXRvcjxCYXNlTm9kZT4ge1xuXG4gICAgZGVjb3JhdGUobm9kZTogQmFzZU5vZGUsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvZGUtcGFkZGluZycpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9ICAgIFxuICAgIFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYFxuICAgICAgICAuY29kZS1wYWRkaW5nIHtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAzMnB4O1xuICAgICAgICB9XG4gICAgICAgIGA7XG4gICAgfVxuXG59XG4iLCJcbmltcG9ydCB7IFByb2dyYW0sIHBhcnNlTW9kdWxlLCBQYXJzZU9wdGlvbnMgfSBmcm9tICdlc3ByaW1hJztcbmltcG9ydCB7IHdhbGsgYXMgZXNwcmltYVdhbGssIHdhbGtBZGRQYXJlbnQgYXMgZXNwcmltYVdhbGtBZGRQYXJlbnQgfSBmcm9tICdlc3ByaW1hLXdhbGsnO1xuaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgQmFzZU5vZGUsIEZ1bmN0aW9uRGVjbGFyYXRpb24sIEJsb2NrU3RhdGVtZW50LCBJZlN0YXRlbWVudCwgUmV0dXJuU3RhdGVtZW50LCBTdGF0ZW1lbnQgfSBmcm9tICdlc3RyZWUnO1xuaW1wb3J0IHsgUHJvZ3JlbVN0YXRlIH0gZnJvbSAnLi9TY2hlZHVsaW5nU2VydmljZSc7XG5pbXBvcnQgeyBQcm9ncmVtQ29kZSwgUHJvZ3JlbUZhY3RvcnkgfSBmcm9tICcuL1R5cGVzJztcbmltcG9ydCB7IEVzcHJpbWFWZXJzZUl0ZXJhb3IsIEVzcHJpbWFWZXJzZSwgRXNwcmltYUNvdXBsZXQsIEVzcHJpbWFQcm9ncmVtRmFjdG9yeSwgRXNwcmltYVByb2dyZW0gfSBmcm9tICcuL0VzcHJpbWFUeXBlcyc7XG5pbXBvcnQgeyBFc3ByaW1hSGVscGVyIH0gZnJvbSAnLi9Fc3ByaW1hSGVscGVyJztcbmltcG9ydCB7IEZ1bmN0aW9uRGVjbGFyYXRpb25Ub0h0bWxUcmVlU3RvcmUgfSBmcm9tICcuL0h0bWxUcmVlJztcbi8qXG5leHBvcnQgY2xhc3MgQ29kZVN0YXRlbWVudCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBub2RlOiBCYXNlTm9kZSxcbiAgICAgICAgLy9wdWJsaWMgY29kZTogc3RyaW5nXG4gICAgKSB7fTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2RlU3RhdGVtZW50RmFjdG9yeTxUPiB7XG4gICAgYnVpbGQocGFyYW06IFQpOiBDb2RlU3RhdGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvZGVJdGVyYXRvciB7XG4gICAgZXhlY3V0ZU5leHQoKTogQ29kZVN0YXRlbWVudDtcbiAgICBoYXNOZXh0KCk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbUNvZGUge1xuICAgIGluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCk6IEZ1bmN0aW9uRGVjbGFyYXRpb25cbiAgICBjb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk6IEZ1bmN0aW9uRGVjbGFyYXRpb25cbiAgICBpdGVyYXRvcihzdGF0ZTogUHJvZ3JlbVN0YXRlKTogQ29kZUl0ZXJhdG9yO1xufVxuXG5jbGFzcyBFc3ByaW1hQ29kZVN0YXRlbWVudEZhY3RvcnkgaW1wbGVtZW50cyBWZXJzZUluc3RydWN0aW9uRmFjdG9yeTxCYXNlTm9kZT4ge1xuXG4gICAgYnVpbGQocGFyYW06IEJhc2VOb2RlKTogRXNwcmltYVZlcnNlSW5zdHJ1Y3Rpb24ge1xuICAgICAgICBpZiAocGFyYW0pIFxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFc3ByaW1hVmVyc2VJbnN0cnVjdGlvbihwYXJhbSk7XG4gICAgICAgIFxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBidWlsZCBub24gc3RhdGVtZW50IGNvZGUgIScpO1xuICAgIH1cbn1cbiovXG5cbmNsYXNzIEJhc2ljRXNwcmltYUNvZGVJdGVyYXRvciBpbXBsZW1lbnRzIEVzcHJpbWFWZXJzZUl0ZXJhb3Ige1xuXG4gICAgcHJpdmF0ZSBzdGFjazogQmFzZU5vZGVbXSA9IFtdO1xuICAgIHByaXZhdGUgcmV0dXJuVmFsdWU6IGFueSA9IG51bGw7XG4gICAgcHJpdmF0ZSBmaW5pc2hlZCA9IGZhbHNlXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgICAgIHByaXZhdGUgcm9vdE5vZGU6IEJhc2VOb2RlLCBcbiAgICAgICAgICAgIHByaXZhdGUgc3RhdGU6IFByb2dyZW1TdGF0ZSkge1xuICAgICAgICB0aGlzLnN0YWNrLnB1c2gocm9vdE5vZGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVjbGFyZVByb2dyZW1Bcmd1bWVudHMoKSB7XG4gICAgICAgIGxldCBfY29sb25uZSA9IHRoaXMuc3RhdGUuY29sb25uZTtcbiAgICAgICAgbGV0IF9saWduZSA9IHRoaXMuc3RhdGUubGlnbmU7XG4gICAgICAgIGxldCBfY29udGV4dGUgPSB0aGlzLnN0YXRlLmNvbnRleHRlO1xuXG4gICAgICAgIHRoaXMuc3RhdGUuZXZhbCgndmFyIGNvbG9ubmUgPSAnICsgX2NvbG9ubmUgKyAnLCBsaWduZSA9ICcgKyBfbGlnbmUgKyAnOycpO1xuICAgICAgICB0aGlzLnN0YXRlLmV2YWwoJ3ZhciBjb250ZXh0ZSA9ICcgKyBKU09OLnN0cmluZ2lmeShfY29udGV4dGUpKTtcbiAgICB9XG5cbiAgICBleGVjdXRlTmV4dCgpOiBFc3ByaW1hVmVyc2Uge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGZpcnN0IG5vZGUgb24gdGhlIHN0YWNrXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuc3RhY2suc2hpZnQoKTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnTm9kZTonLCBub2RlKTtcblxuICAgICAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGFjayBzaG91bGQgbm90IGJlIGVtcHR5ICEnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHN0bXQ7XG5cbiAgICAgICAgICAgIHN3aXRjaChub2RlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdGdW5jdGlvbkRlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZ1bmMgPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdChmdW5jLmJvZHkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY2xhcmVQcm9ncmVtQXJndW1lbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFZlcnNlKGZ1bmMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Jsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suYm9keS5zbGljZSgpLnJldmVyc2UoKS5tYXAoeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdCbG9ja1N0YXRlbWVudCB1bnNoaWZ0aW5nOicsIHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KHgpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0lmU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgc3RtdCA9IG5vZGUgYXMgSWZTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0Q29kZSA9IGVzY29kZUdlbmVyYXRlKHN0bXQudGVzdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3RSZXN1bHQgPSB0aGlzLnN0YXRlLmV2YWwodGVzdENvZGUpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdJZlN0YXRlbWVudCB0ZXN0IGV2YWx1YXRlIHRvOiAnLCB0ZXN0UmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlc3RSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ1RoZW4gdW5zaGlmdGluZzonLCBzdG10LmNvbnNlcXVlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KHN0bXQuY29uc2VxdWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RtdC5hbHRlcm5hdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdFbHNlIHVuc2hpZnRpbmc6Jywgc3RtdC5hbHRlcm5hdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdChzdG10LmFsdGVybmF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRWZXJzZShzdG10KTtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1JldHVyblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIHN0bXQgPSBub2RlIGFzIFJldHVyblN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXR1cm5WYWx1ZSA9IHRoaXMuc3RhdGUuZXZhbChlc2NvZGVHZW5lcmF0ZShzdG10LmFyZ3VtZW50KSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29kZVNlcnZpY2UucHJvZ3JlbUZhY3RvcnkuYnVpbGRWZXJzZShzdG10KTtcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ05vZGU6Jywgbm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2RlID0gZXNjb2RlR2VuZXJhdGUobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0dlbmVyYXRlZCBjb2RlOicsIGNvZGUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXZhbFJlc3VsdCA9IHRoaXMuc3RhdGUuZXZhbChjb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnRXZhbHVhdGUgdG86JywgZXZhbFJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb2RlU2VydmljZS5wcm9ncmVtRmFjdG9yeS5idWlsZFZlcnNlKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICh0aGlzLnN0YWNrLmxlbmd0aCA+IDApO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSXRlcmF0b3IgaGFzIG5vIG1vcmUgY29kZSB0byBleGVjdXRlICEnKTtcbiAgICB9ICAgIFxuICAgIFxuICAgIGhhc05leHQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbm9kZXMgPSB0aGlzLnN0YWNrLnNsaWNlKDApO1xuICAgICAgICB3aGlsZSAobm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBub2Rlcy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS50eXBlICE9PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9ja3M6IEJsb2NrU3RhdGVtZW50W10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tzLnB1c2goYmxvY2spO1xuICAgICAgICAgICAgICAgICAgICAvLyBQYXJzb3VycyByZWN1cnNpdmVtZW50IGxlcyBibG9ja3Mgw6AgbGEgcmVjaGVyY2hlIGRlIG5vZXVkIHF1aSBuZSBzb250IHBhcyBkZXMgYmxvY2tzXG4gICAgICAgICAgICAgICAgICAgIGxldCBoYXNOZXh0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghaGFzTmV4dCAmJiBibG9ja3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGIgPSBibG9ja3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYi5ib2R5Lm1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHgudHlwZSAhPT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzTmV4dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja3MucHVzaCh4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNOZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgY2xhc3MgQmFzaWNFc3ByaW1hUHJvZ3JlbSBpbXBsZW1lbnRzIEVzcHJpbWFQcm9ncmVtIHtcblxuICAgIHByaXZhdGUgZXNwcmltYVByb2dyYW06IFByb2dyYW07XG5cbiAgICBjb25zdHJ1Y3Rvcihjb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGNvbmZpZzogUGFyc2VPcHRpb25zID0ge1xuICAgICAgICAgICAgY29tbWVudDogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVzcHJpbWFQcm9ncmFtID0gcGFyc2VNb2R1bGUoY29kZSwgY29uZmlnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgd2Fsa1Byb2dyZW1Db3VwbGV0KGZ1bmN0aW9uTmFtZTogc3RyaW5nKTogRXNwcmltYUNvdXBsZXQge1xuICAgICAgICB2YXIgZnVuY05vZGU6IEZ1bmN0aW9uRGVjbGFyYXRpb24gfCBudWxsID0gbnVsbDtcbiAgICAgICAgdmFyIHZlcnNlczogQmFzZU5vZGVbXSA9IFtdO1xuICAgICAgICBlc3ByaW1hV2Fsa0FkZFBhcmVudCh0aGlzLmVzcHJpbWFQcm9ncmFtLCBub2RlID0+IHtcbiAgICAgICAgICAgIGlmKCBub2RlLnR5cGUgPT09ICdGdW5jdGlvbkRlY2xhcmF0aW9uJyAmJiBub2RlLmlkICYmIG5vZGUuaWQubmFtZSA9PT0gZnVuY3Rpb25OYW1lKSB7XG4gICAgICAgICAgICAgICAgZnVuY05vZGUgPSBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZ1bmNOb2RlICYmIEVzcHJpbWFIZWxwZXIuaXNDaGlsZE5vZGVPZihub2RlLCBmdW5jTm9kZSkpIHsgLy8gJiYgRXNwcmltYUhlbHBlci5pc05vdENoaWxkTm9kZU9mKG5vZGUsIHZlcnNlcylcbiAgICAgICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicgXG4gICAgICAgICAgICAgICAgICAgIHx8IG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nXG4gICAgICAgICAgICAgICAgICAgIHx8IG5vZGUudHlwZSA9PT0gJ0V4cHJlc3Npb25TdGF0ZW1lbnQnXG4gICAgICAgICAgICAgICAgICAgIHx8IG5vZGUudHlwZSA9PT0gJ1JldHVyblN0YXRlbWVudCdcbiAgICAgICAgICAgICAgICAgICAgfHwgbm9kZS50eXBlID09PSAnSWZTdGF0ZW1lbnQnICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2VzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9ICk7XG4gICAgICAgIGlmIChmdW5jTm9kZSkge1xuICAgICAgICAgICAgdmVyc2VzLnVuc2hpZnQoZnVuY05vZGUpO1xuICAgICAgICAgICAgcmV0dXJuIENvZGVTZXJ2aWNlLnByb2dyZW1GYWN0b3J5LmJ1aWxkQ291cGxldChmdW5jTm9kZSwgdmVyc2VzKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEltcG9zc2libGUgZGUgdHJvdXZlciBsYSBmb25jdGlvbiAke2Z1bmN0aW9uTmFtZX0oKSAhYCk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCk6IEVzcHJpbWFDb3VwbGV0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2Fsa1Byb2dyZW1Db3VwbGV0KCdpbml0aWFsaXNlclByb2dyZW0nKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29sb3JlclByb2dyZW1GdW5jdGlvbigpOiBFc3ByaW1hQ291cGxldCB7XG4gICAgICAgIHJldHVybiB0aGlzLndhbGtQcm9ncmVtQ291cGxldCgnY29sb3JlclByb2dyZW0nKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXRlcmF0b3Ioc3RhdGU6IFByb2dyZW1TdGF0ZSk6IEVzcHJpbWFWZXJzZUl0ZXJhb3Ige1xuICAgICAgICByZXR1cm4gbmV3IEJhc2ljRXNwcmltYUNvZGVJdGVyYXRvcih0aGlzLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKS5mdW5jdGlvblJvb3ROb2RlLCBzdGF0ZSk7XG4gICAgfVxufVxuXG5jbGFzcyBCYXNpY0VzcHJpbWFQcm9ncmVtRmFjdG9yeSBpbXBsZW1lbnRzIEVzcHJpbWFQcm9ncmVtRmFjdG9yeSB7XG5cbiAgICBidWlsZFByb2dyZW0oY29kZTogc3RyaW5nKTogRXNwcmltYVByb2dyZW0ge1xuICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW1wb3NzaWJsZSB0byBidWlsZCBQcm9ncmVtIHdpdGhvdXQgY29kZSAhJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBCYXNpY0VzcHJpbWFQcm9ncmVtKGNvZGUpO1xuICAgIH1cblxuICAgIGJ1aWxkQ291cGxldChub2RlOiBGdW5jdGlvbkRlY2xhcmF0aW9uLCB2ZXJzZXM6IEJhc2VOb2RlW10pOiBFc3ByaW1hQ291cGxldCB7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBvc3NpYmxlIHRvIGJ1aWxkIGVtcHR5IENvdXBsZXQgIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVzcHJpbWFWZXJzZXMgPSB2ZXJzZXMubWFwKHRoaXMuYnVpbGRWZXJzZSk7XG5cbiAgICAgICAgbGV0IGNvdXBsZXQ6IEVzcHJpbWFDb3VwbGV0ID0ge1xuICAgICAgICAgICAgZnVuY3Rpb25Sb290Tm9kZTogbm9kZSxcbiAgICAgICAgICAgIHZlcnNlczogZXNwcmltYVZlcnNlc1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdCdWlsdCBjb3VwbGV0OicsIGNvdXBsZXQpO1xuICAgICAgICByZXR1cm4gY291cGxldDtcbiAgICB9XG5cbiAgICBidWlsZFZlcnNlKG5vZGU6IEJhc2VOb2RlKTogRXNwcmltYVZlcnNlIHtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcG9zc2libGUgdG8gYnVpbGQgZW1wdHkgVmVyc2UgIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvZGUgPSBub2RlO1xuICAgICAgICBpZihub2RlLnR5cGUgPT09ICdJZlN0YXRlbWVudCcpIHtcbiAgICAgICAgICAgIGNvZGUgPSAobm9kZSBhcyBJZlN0YXRlbWVudCkudGVzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2ZXJzZTogRXNwcmltYVZlcnNlID0geyBcbiAgICAgICAgICAgIG5vZGU6IG5vZGUsXG4gICAgICAgICAgICBjb2RlOiBjb2RlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB2ZXJzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29kZVNlcnZpY2Uge1xuXG4gICAgZXhwb3J0IGNvbnN0IHByb2dyZW1GYWN0b3J5OiBQcm9ncmVtRmFjdG9yeTxhbnk+ID0gbmV3IEJhc2ljRXNwcmltYVByb2dyZW1GYWN0b3J5KCk7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gbG9hZFByb2dyZW0oZmlsZVVybDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsaWVudCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgY2xpZW50Lm9wZW4oJ0dFVCcsIGZpbGVVcmwpO1xuICAgICAgICAgICAgY2xpZW50Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29kZSA9IGNsaWVudC5yZXNwb25zZVRleHQ7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29kZVNlcnZpY2U6IFByb2dyZW0gbG9hZGVkIHN1Y2Nlc3NmdWxseS4nLCBjb2RlKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGNvZGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNsaWVudC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KGNsaWVudC5zdGF0dXNUZXh0KTtcbiAgICAgICAgICAgIGNsaWVudC5zZW5kKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSJdLCJzb3VyY2VSb290IjoiIn0=