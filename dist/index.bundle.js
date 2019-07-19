(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index"],{

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
class EstreeProgremInspectorHtmlFactory {
    constructor(decorator) {
        this.decorator = decorator;
    }
    build(verse) {
        return this.buildNode(verse.astRootNode);
    }
    /**
     * Build Node applying decorators.
     *
     * @param node
     */
    buildNode(node) {
        let res = this.buildNodeInternal(node);
        this.decorator.decorate(node, res);
        return res;
    }
    /**
     * Build node.
     * @param node
     */
    buildNodeInternal(node) {
        console.log('Building node', node, '...');
        switch (node.type) {
            case 'FunctionDeclaration':
                return this.buildFunctionDeclaration(node);
            case 'BlockStatement':
                return this.buildBlockStatement(node);
            case 'IfStatement':
                return this.buildIfStatement(node);
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
            default:
                return this.buildDefault(node);
        }
    }
    buildFunctionDeclaration(node) {
        let n = node;
        let declStartText;
        if (n.id) {
            let funcId = HtmlHelper_1.HtmlHelper.span('func-id', n.id.name);
            declStartText = 'function ' + funcId.textContent + ' ( ';
        }
        else {
            declStartText = 'function ( '; // + func.params.map(x => x.name).join(', ') + ' ) {';
        }
        let paramCount = n.params.length;
        n.params.forEach((param, i) => {
            let varName = AstHelper_1.AstHelper.patternToString(param);
            let funcParam = HtmlHelper_1.HtmlHelper.span('func-param', varName);
            declStartText += funcParam.textContent;
            if (i < paramCount - 1) {
                declStartText += ', ';
            }
        });
        declStartText += ' ) {';
        let declStart = HtmlHelper_1.HtmlHelper.span('func-start', declStartText);
        let funcBody = this.buildNode(n.body);
        let declEnd = HtmlHelper_1.HtmlHelper.span('func-end', '}');
        let decl = HtmlHelper_1.HtmlHelper.span('func-declaration', [declStart, funcBody, declEnd]);
        return decl;
    }
    buildBlockStatement(node) {
        let n = node;
        let bodyStatements = n.body.map(statement => this.buildNode(statement));
        return HtmlHelper_1.HtmlHelper.span('block', bodyStatements);
    }
    buildIfStatement(node) {
        let n = node;
        let content = [];
        let test = this.buildNode(n.test);
        let ifStartText = 'if ( ' + test.textContent + ' ) {';
        let ifStart = HtmlHelper_1.HtmlHelper.span('statement if-statement-start', ifStartText);
        content.push(ifStart);
        let thenBlock = this.buildNode(n.consequent);
        let ifThen = HtmlHelper_1.HtmlHelper.span('statement if-block-then', thenBlock);
        content.push(ifThen);
        if (n.alternate) {
            content.push(ifStart);
            let ifElseDecl = HtmlHelper_1.HtmlHelper.span('statement if-statement-else', '} else {');
            content.push(ifElseDecl);
            let elseBlock = this.buildNode(n.alternate);
            let ifElse = HtmlHelper_1.HtmlHelper.span('statement if-block-else', elseBlock);
            content.push(ifElse);
        }
        let ifEnd = HtmlHelper_1.HtmlHelper.span('statement if-statement-end', '}');
        content.push(ifEnd);
        let container = HtmlHelper_1.HtmlHelper.span('statement if-statement', content);
        return container;
    }
    buildVariableDeclaration(node) {
        let n = node;
        let declarations = n.declarations.map(d => this.buildNode(d));
        let container = HtmlHelper_1.HtmlHelper.span('declaration variable-declaration', declarations);
        return container;
    }
    buildVariableDeclarator(node) {
        let n = node;
        let left = AstHelper_1.AstHelper.patternToString(n.id);
        let leftPart = HtmlHelper_1.HtmlHelper.span('variable-id', left);
        let container;
        if (n.init) {
            let assignPart = HtmlHelper_1.HtmlHelper.span('assign-operator', ' = ');
            let right = this.buildNode(n.init);
            let rightPart = HtmlHelper_1.HtmlHelper.span('variable-value', right);
            container = HtmlHelper_1.HtmlHelper.span('expression variable-expression', [leftPart, assignPart, rightPart]);
        }
        else {
            container = HtmlHelper_1.HtmlHelper.span('expression variable-expression', leftPart);
        }
        return container;
    }
    buildAssignmentExpression(node) {
        let n = node;
        let left = this.buildNode(n.left);
        let leftPart = HtmlHelper_1.HtmlHelper.span('variable-id', left);
        let assignPart = HtmlHelper_1.HtmlHelper.span('assign-operator', ' = ');
        let right = this.buildNode(n.right);
        let rightPart = HtmlHelper_1.HtmlHelper.span('variable-value', right);
        let container = HtmlHelper_1.HtmlHelper.span('expression variable-expression', [leftPart, assignPart, rightPart]);
        return container;
    }
    buildBinaryExpression(node) {
        let n = node;
        let left = this.buildNode(n.left);
        let leftPart = HtmlHelper_1.HtmlHelper.span('expression', left);
        let right = this.buildNode(n.left);
        let rightPart = HtmlHelper_1.HtmlHelper.span('expression', right);
        let container = HtmlHelper_1.HtmlHelper.span('expression binary-expression', [leftPart, rightPart]);
        return container;
    }
    buildExpressionStatement(node) {
        let n = node;
        let code = escodegen_1.generate(n);
        let container = HtmlHelper_1.HtmlHelper.span('statement expression-statement', code);
        return container;
    }
    buildReturnStatement(node) {
        let n = node;
        let code = escodegen_1.generate(n);
        let container = HtmlHelper_1.HtmlHelper.span('statement return-statement', code);
        return container;
    }
    buildDefault(node) {
        console.log('default:', node);
        let code = escodegen_1.generate(node);
        let container = HtmlHelper_1.HtmlHelper.span('default-' + node.type, code);
        return container;
    }
}
exports.EstreeProgremInspectorHtmlFactory = EstreeProgremInspectorHtmlFactory;


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
        this.decorators.forEach(d => d.decorate(node, element));
    }
    buildStyleSheet() {
        return this.decorators.map(d => d.buildStyleSheet()).join('\n');
    }
}
exports.StyleDecoratorAggregation = StyleDecoratorAggregation;
class HighlightExecutingVerseDecorator {
    decorate(node, element) {
        element.classList.add(HighlightExecutingVerseDecorator.NOT_EXECUTED_CLASS);
    }
    buildStyleSheet() {
        return `
        /** ----- HighlightExecutingVerseDecorator style ----- */
        ${HighlightExecutingVerseDecorator.NOT_EXECUTED_CLASS}: {

        }
        ${HighlightExecutingVerseDecorator.EXECUTING_CLASS}: {
            background-color: yellow;
        }
        ${HighlightExecutingVerseDecorator.EXECUTED_CLASS}: {

        }
        `;
    }
}
HighlightExecutingVerseDecorator.NOT_EXECUTED_CLASS = 'verse-not-executed';
HighlightExecutingVerseDecorator.EXECUTING_CLASS = 'verse-executing';
HighlightExecutingVerseDecorator.EXECUTED_CLASS = 'verse-executed';
exports.HighlightExecutingVerseDecorator = HighlightExecutingVerseDecorator;


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
const EstreeProgremInspectorHtmlFactory_1 = __webpack_require__(/*! ./EstreeProgremInspectorHtmlFactory */ "EzQx");
const Types_1 = __webpack_require__(/*! ./Types */ "SMdn");
const EstreeStyleDecorator_1 = __webpack_require__(/*! ./EstreeStyleDecorator */ "vMkM");
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
            let progremCode = CodeService_1.CodeService.progremCodeFactory.build(code);
            let colorerFunction = progremCode.colorerProgremFunction().astRootNode;
            console.log('progrem AST:', progremCode.colorerProgremFunction);
            // Load initProgrem Function code
            let initProgremFunctionCode = escodegen_1.generate(progremCode.initialiserProgremFunction().astRootNode);
            window.eval(initProgremFunctionCode);
            scheduler = SchedulingService_1.SchedulingService.buildProgremScheduler(progremConfig, progremCode);
            //let progremInspector = new BasicHtmlEsprimaProgremInspector(progremCode, scheduler, document);
            let progremInspectorDecorators = new Types_1.StyleDecoratorAggregation([
                new EstreeStyleDecorator_1.PadVerseDecorator()
            ]);
            let progremInspectorFactory = new EstreeProgremInspectorHtmlFactory_1.EstreeProgremInspectorHtmlFactory(progremInspectorDecorators);
            let progremInspectorView = new ProgremInspector_1.ProgremInspectorView(progremInspectorFactory);
            let codeElement = document.querySelector('.code');
            if (codeElement) {
                console.log('codeElement', codeElement);
                let progremInspectorComponent = progremInspectorView.buildView(scheduler);
                codeElement.appendChild(progremInspectorComponent);
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
        }
        else if (Array.isArray(content)) {
            content.forEach(c => elt.appendChild(c));
        }
        else if (content) {
            elt.appendChild(content);
        }
        return elt;
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
    constructor(colonne, ligne, frame, contexte, codeStatement) {
        this.colonne = colonne;
        this.ligne = ligne;
        this.frame = frame;
        this.contexte = contexte;
        this.codeStatement = codeStatement;
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
const escodegen_1 = __webpack_require__(/*! escodegen */ "aMAw");
const js_md5_1 = __webpack_require__(/*! js-md5 */ "gjeX");
const AstHelper_1 = __webpack_require__(/*! ./AstHelper */ "8yvk");
const HtmlTree_1 = __webpack_require__(/*! ./HtmlTree */ "vA+5");
class BasicHtmlEsprimaProgremInspector {
    constructor(progremCode, scheduler, _document) {
        this.progremCode = progremCode;
        this.scheduler = scheduler;
        this._document = _document;
        this.progremCodeLines = [];
        this.attachedElement = null;
        this.mapping = new Map();
        this.hintStackContainer = null;
        this.colorMap = new Map();
        scheduler.subscribeCodeExecution(this);
        scheduler.subscribeGridChange(this);
        //this.buildHtmlTree2();
        this.treeStore1 = this.buildHtmlTree3();
    }
    attach0(element) {
        this.attachedElement = element;
        if (element) {
            let codeContainer = document.createElement('div');
            codeContainer.classList.add('codeContainer');
            this.hintStackContainer = document.createElement('div');
            this.hintStackContainer.classList.add('hintContainer');
            element.appendChild(codeContainer);
            element.appendChild(this.hintStackContainer);
            this.progremCodeLines.map(elt => { codeContainer.appendChild(elt); });
        }
    }
    attach(element) {
        this.attachedElement = element;
        if (element) {
            this.treeStore1.paintInto(element);
        }
    }
    clear0() {
        this.colorMap = new Map();
        if (this.hintStackContainer)
            this.hintStackContainer.innerHTML = "";
        this.mapping.forEach((elt, node) => elt.classList.remove('highlight'));
    }
    clear() {
        this.colorMap = new Map();
        this.treeStore1.resetStyle();
        if (this.hintStackContainer) {
            this.hintStackContainer.innerHTML = "";
        }
    }
    hslColor(hue) {
        return 'hsl(' + hue + ', 100%, 80%)';
    }
    hashStringToColor(key) {
        let shift = 2;
        let colorCount = 12;
        var hue = this.colorMap.get(key);
        if (hue)
            return this.hslColor(hue);
        var hash = js_md5_1.create().update(key).toString();
        hue = (parseInt(hash.substring(shift + 0, shift + 1), 16) + 16 * parseInt(hash.substring(shift + 1, shift + 2), 16) + 256 * parseInt(hash.substring(shift + 2, shift + 3), 16));
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
    fireCodeExecution(state) {
        if (state.codeStatement === null) {
            throw new Error('Received a null statement !');
        }
        //this.mapping.forEach((elt, node) => elt.classList.remove('highlight'));
        this.treeStore1.removeStyleClasses(['highlight']);
        let executedNode = state.codeStatement.astRootNode;
        //let htmlNode = this.mapping.get(executedNode);
        //if (!htmlNode) {
        //    throw new Error('Unable to found a HTML element mapped for received statement !')
        //}
        //htmlNode.classList.add('highlight');
        this.treeStore1.addStyleClasses(executedNode, ['highlight']);
        if (this.hintStackContainer) {
            let node = AstHelper_1.AstHelper.reduceNodeToVarDeclaration(executedNode);
            if (node) {
                if (node.type === 'VariableDeclaration') {
                    let decl = node;
                    decl.declarations.map(d => {
                        //@ts-ignore
                        let hint = this.appendHint(this.hintStackContainer, []);
                        let varName = AstHelper_1.AstHelper.patternToString(d.id);
                        let varValue = undefined;
                        if (d.init) {
                            varValue = state.evalScope.globalEval(escodegen_1.generate(d.init));
                        }
                        hint.innerHTML = varName + ' = ' + varValue;
                        hint.style.backgroundColor = this.hashStringToColor(varName);
                        //let pElt = this.mapping.get(d);
                        //if (pElt) pElt.style.backgroundColor = this.hashStringToColor(varName);
                        this.treeStore1.setStyleProperty(d, 'backgroundColor', this.hashStringToColor(varName));
                    });
                }
                else if (node.type === 'AssignmentExpression') {
                    let decl = node;
                    //@ts-ignore
                    let hint = this.appendHint(this.hintStackContainer, []);
                    let varName = AstHelper_1.AstHelper.patternToString(decl.left);
                    hint.innerHTML = varName + ' = ' + state.evalScope.globalEval(varName);
                    hint.style.backgroundColor = this.hashStringToColor(varName);
                    //let pElt = this.mapping.get(decl);
                    //if (pElt) pElt.style.backgroundColor = this.hashStringToColor(varName);
                    this.treeStore1.setStyleProperty(decl, 'backgroundColor', this.hashStringToColor(varName));
                }
                else if (node.type === 'FunctionDeclaration') {
                    let func = node;
                    func.params.forEach(p => {
                        let varName = AstHelper_1.AstHelper.patternToString(p);
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
    fireGridChange(state) {
        this.clear();
    }
    appendCodeLine(parent, padding) {
        let elt = document.createElement("pre");
        elt.classList.add('padding-' + padding);
        parent.appendChild(elt);
        return elt;
    }
    appendSpan(parent, htmlClass, text = "") {
        let elt = document.createElement("span");
        htmlClass.forEach(c => elt.classList.add(c));
        parent.appendChild(elt);
        elt.innerText = text;
        return elt;
    }
    appendHint(parent, htmlClass) {
        let pre = document.createElement("pre");
        let span = document.createElement("span");
        htmlClass.forEach(c => pre.classList.add(c));
        parent.appendChild(pre);
        pre.appendChild(span);
        return span;
    }
    // Build HTML Inspector by crawling recursively AST stacks
    unstackAst(parentElement, stack, padding) {
        stack.forEach(node => {
            if (!node)
                throw new Error('Should not be able to shift a null node !');
            let line, startLine, endLine, n, varSpan, leftSpan, rightSpan;
            switch (node.type) {
                case 'BlockStatement':
                    n = node;
                    this.unstackAst(parentElement, n.body, padding + 1);
                    break;
                case 'FunctionDeclaration':
                    n = node;
                    startLine = this.appendCodeLine(parentElement, padding);
                    this.mapping.set(node, startLine);
                    if (n.id) {
                        let span = this.appendSpan(startLine, []);
                        span.innerHTML = 'function ' + n.id.name + ' ( '; // + func.params.map(x => x.name).join(', ') + ' ) {';
                    }
                    else {
                        let span = this.appendSpan(startLine, []);
                        span.innerHTML = 'function ( '; // + func.params.map(x => x.name).join(', ') + ' ) {';
                    }
                    let paramCount = n.params.length;
                    n.params.forEach((param, i) => {
                        let varName = AstHelper_1.AstHelper.patternToString(param);
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
                    n = node;
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
                    n = node;
                    line = this.appendCodeLine(parentElement, padding);
                    this.mapping.set(node, line);
                    line.innerHTML = n.kind + ' ';
                    this.unstackAst(line, n.declarations, 0);
                    break;
                case 'VariableDeclarator':
                    n = node;
                    varSpan = this.appendSpan(parentElement, ['varId']);
                    this.mapping.set(node, varSpan);
                    varSpan.innerHTML = AstHelper_1.AstHelper.patternToString(n.id);
                    if (n.init) {
                        this.appendSpan(parentElement, [], ' = ');
                        let initSpan = this.appendSpan(parentElement, ['varInit']);
                        this.unstackAst(initSpan, [n.init], 0);
                    }
                    this.appendSpan(parentElement, [], ';');
                    break;
                case 'AssignmentExpression':
                    n = node;
                    leftSpan = this.appendSpan(parentElement, ['varId']);
                    this.mapping.set(node, leftSpan);
                    this.unstackAst(leftSpan, [n.left], 0);
                    this.appendSpan(parentElement, [], ' = ');
                    rightSpan = this.appendSpan(parentElement, ['varInit']);
                    this.unstackAst(rightSpan, [n.right], 0);
                    this.appendSpan(parentElement, [], ';');
                    break;
                case 'BinaryExpression':
                    n = node;
                    leftSpan = this.appendSpan(parentElement, ['leftBin']);
                    this.unstackAst(leftSpan, [n.left], 0);
                    this.appendSpan(parentElement, [], ' ' + n.operator + ' ');
                    rightSpan = this.appendSpan(parentElement, ['rightBin']);
                    this.unstackAst(rightSpan, [n.right], 0);
                    break;
                case 'ExpressionStatement':
                    n = node;
                    line = this.appendCodeLine(parentElement, padding);
                    this.mapping.set(node, line);
                    this.unstackAst(line, [n.expression], 0);
                    break;
                case 'ReturnStatement':
                    n = node;
                    line = this.appendCodeLine(parentElement, padding);
                    this.mapping.set(node, line);
                    line.innerHTML = escodegen_1.generate(node);
                    break;
                default:
                    console.log('default:', node);
                    line = this.appendSpan(parentElement, ['nsy-' + node.type], escodegen_1.generate(node));
                    this.mapping.set(node, line);
                    break;
            }
        });
    }
    buildHtmlTree2() {
        const codeRoot = document.createElement("div");
        this.progremCodeLines.push(codeRoot);
        this.unstackAst(codeRoot, [this.progremCode.colorerProgremFunction().astRootNode], 0);
    }
    buildHtmlTree3() {
        const codeRoot = document.createElement("div");
        this.progremCodeLines.push(codeRoot);
        let factory = new HtmlTree_1.CodeSpoolerEsToHtmlTreeMapperFactory(this._document);
        let treeStore = factory.build(this.progremCode);
        treeStore.paintInto(codeRoot);
        return treeStore;
    }
    buildHtmlTree() {
        const codeRoot = document.createElement("div");
        const stack = [this.progremCode.colorerProgremFunction().astRootNode];
        let padding = 0;
        //this.progremCode.colorerProgremFunction().body.body.map(n => stack.push(n));
        do {
            let node = stack.shift();
            if (!node)
                throw new Error('Should not be able to shift a null node !');
            var line;
            switch (node.type) {
                case 'BlockStatement':
                    let block = node;
                    padding++;
                    block.body.slice(0).reverse().map(x => stack.unshift(x));
                    break;
                case 'EndBlockStatement':
                    // This is a hack to close an opened block
                    padding--;
                    line = this.appendCodeLine(codeRoot, padding);
                    line.innerHTML = '}';
                    break;
                case 'FunctionDeclaration':
                    let func = node;
                    line = this.appendCodeLine(codeRoot, padding);
                    if (func.id) {
                        line.innerHTML = 'function ' + func.id.name + ' () {'; // + func.params.map(x => x.name).join(', ') + ' ) {';
                    }
                    else {
                        line.innerHTML = 'function () {'; // + func.params.map(x => x.name).join(', ') + ' ) {';
                    }
                    stack.unshift({ type: 'EndBlockStatement' }); // Hack to delay a block end
                    stack.unshift(func.body);
                    break;
                case 'IfStatement':
                    let ifstmt = node;
                    line = this.appendCodeLine(codeRoot, padding);
                    line.innerHTML = 'if ( <span>' + escodegen_1.generate(ifstmt.test) + '</span> ) {';
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
                    line.textContent = escodegen_1.generate(node);
                    line.classList.add('statement');
                    this.mapping.set(node, line);
                    break;
            }
        } while (stack.length > 0);
    }
}
exports.BasicHtmlEsprimaProgremInspector = BasicHtmlEsprimaProgremInspector;
class ProgremInspectorView {
    constructor(htmlFactory) {
        this.htmlFactory = htmlFactory;
    }
    buildView(scheduler) {
        let colorerProgremFunc = scheduler.getProgrem().colorerProgremFunction();
        let htmlComponent = this.htmlFactory.build(colorerProgremFunc);
        return htmlComponent;
    }
    fireCodeExecution(state) {
    }
    fireGridChange(state) {
    }
}
exports.ProgremInspectorView = ProgremInspectorView;


/***/ }),

/***/ "vA+5":
/*!*************************!*\
  !*** ./src/HtmlTree.ts ***!
  \*************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AstHelper_1 = __webpack_require__(/*! ./AstHelper */ "8yvk");
const escodegen_1 = __webpack_require__(/*! escodegen */ "aMAw");
class FunctionDeclarationToHtmlTreeStore {
    constructor(func, htmlFactory) {
        this.func = func;
        this.htmlFactory = htmlFactory;
        this.backingMap = new Map();
        this.addedClasses = new Map();
        this.addedStyleProps = new Map();
        this.container = [];
        let mapping = htmlFactory.build(func, this.container);
        let iterator = mapping.entries();
        let entry = iterator.next();
        while (!entry.done) {
            let val = entry.value;
            this.backingMap.set(val[0], val[1]);
            entry = iterator.next();
        }
    }
    paintInto(element) {
        this.container.forEach(e => {
            element.appendChild(e);
        });
    }
    styleClasses() {
        let result = [];
        let iterator = this.backingMap.values();
        let res = iterator.next();
        while (!res.done) {
            let elt = res.value;
            elt.classList.forEach(c => result.push(c));
        }
        return result;
    }
    setStyleProperty(node, propName, value) {
        let elt = this.backingMap.get(node);
        if (elt) {
            elt.style.setProperty(propName, value);
            this.addedStyleProps.set(node, [propName, value]);
        }
    }
    addStyleClasses(node, classes) {
        let elt = this.backingMap.get(node);
        if (elt) {
            // @ts-ignore
            classes.forEach(c => elt.classList.add(c));
            this.addedClasses.set(node, classes);
        }
    }
    removeStyleClasses(classes) {
        // FIXME clean the this.addedClasses map
        let iterator = this.addedClasses.entries();
        let entry = iterator.next();
        while (!entry.done) {
            let node = entry.value[0];
            let classes = entry.value[1];
            let elt = this.backingMap.get(node);
            if (elt) {
                // @ts-ignore
                classes.forEach(c => elt.classList.remove(c));
            }
            entry = iterator.next();
        }
    }
    resetStyle() {
        let iterator = this.addedClasses.entries();
        let entry = iterator.next();
        while (!entry.done) {
            let node = entry.value[0];
            let classes = entry.value[1];
            let elt = this.backingMap.get(node);
            if (elt) {
                // @ts-ignore
                classes.forEach(c => elt.classList.remove(c));
            }
            entry = iterator.next();
        }
        this.addedStyleProps.entries();
        entry = iterator.next();
        while (!entry.done) {
            let node = entry.value[0];
            let propName = entry.value[1][0];
            let elt = this.backingMap.get(node);
            if (elt) {
                elt.style.removeProperty(propName);
            }
            entry = iterator.next();
        }
    }
}
exports.FunctionDeclarationToHtmlTreeStore = FunctionDeclarationToHtmlTreeStore;
class FunctionSpoolerEsToHtmlFactory {
    constructor(_document) {
        this._document = _document;
    }
    appendCodeLine(parent, padding) {
        let elt = this._document.createElement("pre");
        elt.classList.add('padding-' + padding);
        parent.appendChild(elt);
        return elt;
    }
    appendSpan(parent, htmlClass, text = "") {
        let elt = this._document.createElement("span");
        htmlClass.forEach(c => elt.classList.add(c));
        parent.appendChild(elt);
        elt.innerText = text;
        return elt;
    }
    appendHint(parent, htmlClass) {
        let pre = this._document.createElement("pre");
        let span = this._document.createElement("span");
        htmlClass.forEach(c => pre.classList.add(c));
        parent.appendChild(pre);
        pre.appendChild(span);
        return span;
    }
    // Build HTML Inspector by crawling recursively AST stacks
    unstackAst(parentElement, stack, mapping, padding) {
        stack.forEach(node => {
            if (!node)
                throw new Error('Should not be able to shift a null node !');
            let line, startLine, endLine, n, varSpan, leftSpan, rightSpan;
            switch (node.type) {
                case 'BlockStatement':
                    n = node;
                    this.unstackAst(parentElement, n.body, mapping, padding + 1);
                    break;
                case 'FunctionDeclaration':
                    n = node;
                    startLine = this.appendCodeLine(parentElement, padding);
                    mapping.set(node, startLine);
                    //mapping.set(node, parentElement); // Hack: map the function container to the container of the function 
                    if (n.id) {
                        let span = this.appendSpan(startLine, []);
                        span.innerHTML = 'function ' + n.id.name + ' ( '; // + func.params.map(x => x.name).join(', ') + ' ) {';
                    }
                    else {
                        let span = this.appendSpan(startLine, []);
                        span.innerHTML = 'function ( '; // + func.params.map(x => x.name).join(', ') + ' ) {';
                    }
                    let paramCount = n.params.length;
                    n.params.forEach((param, i) => {
                        let varName = AstHelper_1.AstHelper.patternToString(param);
                        let span = this.appendSpan(startLine, ['varId'], varName);
                        mapping.set(param, span);
                        if (i < paramCount - 1) {
                            let span = this.appendSpan(startLine, []);
                            span.innerHTML = ', ';
                        }
                    });
                    let span = this.appendSpan(startLine, []);
                    span.innerHTML += ' ) {';
                    this.unstackAst(parentElement, n.body.body, mapping, padding + 1);
                    endLine = this.appendCodeLine(parentElement, padding);
                    endLine.innerHTML = '}';
                    break;
                case 'IfStatement':
                    n = node;
                    startLine = this.appendCodeLine(parentElement, padding);
                    mapping.set(n.test, startLine);
                    //startLine.innerHTML = 'if ( <span>' + Escodegen.generate(ifstmt.test) + '</span> ) {';
                    startLine.innerHTML = 'if ( ';
                    this.unstackAst(startLine, [n.test], mapping, 0);
                    startLine.innerHTML += ' ) {';
                    this.unstackAst(parentElement, [n.consequent], mapping, padding);
                    let midLine = this.appendCodeLine(parentElement, padding);
                    if (n.alternate) {
                        midLine.innerHTML = '} else {';
                        this.unstackAst(parentElement, [n.alternate], mapping, padding);
                    }
                    endLine = this.appendCodeLine(parentElement, padding);
                    endLine.innerHTML = '}';
                    break;
                case 'VariableDeclaration':
                    n = node;
                    line = this.appendCodeLine(parentElement, padding);
                    mapping.set(node, line);
                    line.innerHTML = n.kind + ' ';
                    this.unstackAst(line, n.declarations, mapping, 0);
                    break;
                case 'VariableDeclarator':
                    n = node;
                    varSpan = this.appendSpan(parentElement, ['varId']);
                    mapping.set(node, varSpan);
                    varSpan.innerHTML = AstHelper_1.AstHelper.patternToString(n.id);
                    if (n.init) {
                        this.appendSpan(parentElement, [], ' = ');
                        let initSpan = this.appendSpan(parentElement, ['varInit']);
                        this.unstackAst(initSpan, [n.init], mapping, 0);
                    }
                    this.appendSpan(parentElement, [], ';');
                    break;
                case 'AssignmentExpression':
                    n = node;
                    leftSpan = this.appendSpan(parentElement, ['varId']);
                    mapping.set(node, leftSpan);
                    this.unstackAst(leftSpan, [n.left], mapping, 0);
                    this.appendSpan(parentElement, [], ' = ');
                    rightSpan = this.appendSpan(parentElement, ['varInit']);
                    this.unstackAst(rightSpan, [n.right], mapping, 0);
                    this.appendSpan(parentElement, [], ';');
                    break;
                case 'BinaryExpression':
                    n = node;
                    leftSpan = this.appendSpan(parentElement, ['leftBin']);
                    this.unstackAst(leftSpan, [n.left], mapping, 0);
                    this.appendSpan(parentElement, [], ' ' + n.operator + ' ');
                    rightSpan = this.appendSpan(parentElement, ['rightBin']);
                    this.unstackAst(rightSpan, [n.right], mapping, 0);
                    break;
                case 'ExpressionStatement':
                    n = node;
                    line = this.appendCodeLine(parentElement, padding);
                    mapping.set(node, line);
                    this.unstackAst(line, [n.expression], mapping, 0);
                    break;
                case 'ReturnStatement':
                    n = node;
                    line = this.appendCodeLine(parentElement, padding);
                    mapping.set(node, line);
                    line.innerHTML = escodegen_1.generate(node);
                    break;
                default:
                    //console.log('default:', node);
                    line = this.appendSpan(parentElement, ['nsy-' + node.type], escodegen_1.generate(node));
                    mapping.set(node, line);
                    break;
            }
        });
    }
    build(node, container) {
        const codeRoot = this._document.createElement('div');
        let mapping = new Map();
        this.unstackAst(codeRoot, [node], mapping, 0);
        //console.log('mapping:', mapping);
        let childIt = codeRoot.children;
        for (let i = 0; i < childIt.length; i++) {
            container.push(childIt[i]);
        }
        return mapping;
    }
}
exports.FunctionSpoolerEsToHtmlFactory = FunctionSpoolerEsToHtmlFactory;
class CodeSpoolerEsToHtmlTreeMapperFactory {
    constructor(_document) {
        this._document = _document;
        this.htmlFactory = new FunctionSpoolerEsToHtmlFactory(_document);
    }
    build(code) {
        let store = new FunctionDeclarationToHtmlTreeStore(code.colorerProgremFunction().astRootNode, this.htmlFactory);
        return store;
    }
}
exports.CodeSpoolerEsToHtmlTreeMapperFactory = CodeSpoolerEsToHtmlTreeMapperFactory;


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
class ColorVerseVariableDecorator {
    constructor() {
        this.variableCounter = 0;
    }
    decorate(node, element) {
        throw new Error("Method not implemented.");
    }
    buildStyleSheet() {
        throw new Error("Method not implemented.");
    }
}
exports.ColorVerseVariableDecorator = ColorVerseVariableDecorator;
class PadVerseDecorator {
    decorate(node, element) {
        if (node.type === 'BlockStatement') {
            element.classList.add('code-padding');
        }
    }
    buildStyleSheet() {
        return `
        .code-padding {
            margin-left: 16px;
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
        this.verseFactory = new EsprimaVerseInstructionFactory();
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
                    return this.verseFactory.build(func);
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
                    return this.verseFactory.build(stmt.test);
                case 'ReturnStatement':
                    stmt = node;
                    this.returnValue = this.state.eval(escodegen_1.generate(stmt.argument));
                    this.finished = true;
                    return this.verseFactory.build(stmt);
                default:
                    //console.log('Node:', node);
                    let code = escodegen_1.generate(node);
                    //console.log('Generated code:', code);
                    let evalResult = this.state.eval(code);
                    //console.log('Evaluate to:', evalResult);
                    return this.verseFactory.build(node);
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
class EsprimaProgremCode {
    constructor(code) {
        this.verseFactory = new EsprimaVerseInstructionFactory();
        this.esprimaProgram = esprima_1.parseModule(code);
    }
    initialiserProgremFunction() {
        var result = null;
        esprima_walk_1.walk(this.esprimaProgram, node => {
            if (node.type === 'FunctionDeclaration' && node.id && node.id.name === 'initialiserProgrem') {
                result = node;
            }
        });
        if (result) {
            return this.verseFactory.build(result);
        }
        throw new Error('Impossible de trouver une fonction colorerProgrem() !');
    }
    colorerProgremFunction() {
        var result = null;
        esprima_walk_1.walk(this.esprimaProgram, node => {
            if (node.type === 'FunctionDeclaration' && node.id && node.id.name === 'colorerProgrem') {
                result = node;
            }
        });
        if (result) {
            return this.verseFactory.build(result);
        }
        throw new Error('Impossible de trouver une fonction colorerProgrem() !');
    }
    iterator(state) {
        return new BasicEsprimaCodeIterator(this.colorerProgremFunction().astRootNode, state);
    }
}
exports.EsprimaProgremCode = EsprimaProgremCode;
class EsprimaProgremCodeFactory {
    build(code) {
        return new EsprimaProgremCode(code);
    }
}
class EsprimaVerseInstructionFactory {
    build(param) {
        if (!param) {
            throw new Error('Impossible to build empty Verse !');
        }
        return {
            astRootNode: param
        };
    }
}
var CodeService;
(function (CodeService) {
    CodeService.progremCodeFactory = new EsprimaProgremCodeFactory();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb2dyZW1HcmlkLnRzIiwid2VicGFjazovLy8uL3NyYy9FdmFsU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQXN0SGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9Fc3RyZWVQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1R5cGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9Qcm9ncmVtU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2NyZWVuU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvSHRtbEhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2NoZWR1bGluZ1NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb2dyZW1JbnNwZWN0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0h0bWxUcmVlLnRzIiwid2VicGFjazovLy8uL3NyYy9Fc3RyZWVTdHlsZURlY29yYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29kZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLDZFQUFpRTtBQUNqRSwyRUFBK0M7QUFFL0MsSUFBSSxZQUFZLEdBQUcsSUFBSSw0QkFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3hDLElBQUksYUFBYSxHQUFHLElBQUksOEJBQWEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRWpELCtCQUFjLENBQUMsWUFBWSxDQUFDLDZCQUE2QixFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0d4RixNQUFhLHNCQUFzQjtJQU0vQixZQUNZLFlBQTBCLEVBQzFCLGFBQTRCO1FBRDVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBTmhD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R0FBRyxFQUFFO2dCQUNqQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO2dCQUUvQixPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUMvRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDO1lBQ0YsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFiZSx1QkFBVyxjQWExQjtBQUVMLENBQUMsRUFuQmdCLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBbUIzQiIsImZpbGUiOiJpbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9ncmVtU2VydmljZSwgUHJvZ3JlbUNvbmZpZyB9IGZyb20gXCIuL1Byb2dyZW1TZXJ2aWNlXCI7XG5pbXBvcnQgeyBTY3JlZW5Db25maWcgfSBmcm9tIFwiLi9TY3JlZW5TZXJ2aWNlXCI7XG5cbmxldCBzY3JlZW5Db25maWcgPSBuZXcgU2NyZWVuQ29uZmlnKDIwKTtcbmxldCBwcm9ncmVtQ29uZmlnID0gbmV3IFByb2dyZW1Db25maWcoMTcsIDE3LCAxKTtcblxuUHJvZ3JlbVNlcnZpY2UuYnVpbGRQcm9ncmVtKCcuL3Byb2dyZW1zL2NvZXVyX3Byb2dyZW0uanMnLCBzY3JlZW5Db25maWcsIHByb2dyZW1Db25maWcpOyIsImltcG9ydCB7IEdyaWRDaGFuZ2VMaXN0ZW5lciwgUHJvZ3JlbVN0YXRlIH0gZnJvbSBcIi4vU2NoZWR1bGluZ1NlcnZpY2VcIjtcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gXCIuL1NjcmVlblNlcnZpY2VcIjtcbmltcG9ydCB7IFByb2dyZW1Db25maWcgfSBmcm9tIFwiLi9Qcm9ncmVtU2VydmljZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1HcmlkIHtcbiAgICBjbGVhcigpOiB2b2lkO1xuICAgIGF0dGFjaChlbGVtZW50OiBFbGVtZW50IHwgbnVsbCk6IHZvaWRcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljQ2FudmFzUHJvZ3JlbUdyaWQgaW1wbGVtZW50cyBQcm9ncmVtR3JpZCwgR3JpZENoYW5nZUxpc3RlbmVyIHtcbiAgICBcbiAgICBwcml2YXRlIGF0dGFjaGVkRWxlbWVudDogRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2NyZWVuQ29uZmlnOiBTY3JlZW5Db25maWcsIFxuICAgICAgICBwcml2YXRlIHByb2dyZW1Db25maWc6IFByb2dyZW1Db25maWdcbiAgICAgICAgKSB7XG4gICAgICAgIGxldCBlbHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZ3JlbScpO1xuICAgICAgICBpZiAoIWVsdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZmluZCAucHJvZ3JlbSBDYW52YXMgZWxlbWVudCAhJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYW52YXMgPSBlbHQgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5cbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmICghY3R4KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBnZXQgMkQgQ2FudmFzIGNvbnRleHQgIScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXR0YWNoVG9DYW52YXMoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgY2FudmFzLndpZHRoID0gdGhpcy5wcm9ncmVtQ29uZmlnLmNvbG9ubmVzICogdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMucHJvZ3JlbUNvbmZpZy5jb2xvbm5lcyAqIHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG5cbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmICghY3R4KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBnZXQgMkQgQ2FudmFzIGNvbnRleHQgIScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIH1cblxuICAgIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICBsZXQgd2lkdGggPSB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplICogdGhpcy5wcm9ncmVtQ29uZmlnLmNvbG9ubmVzO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZSAqIHRoaXMucHJvZ3JlbUNvbmZpZy5saWduZXM7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBhdHRhY2goZWxlbWVudDogRWxlbWVudCB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hdHRhY2hlZEVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgPT09ICdDQU5WQVMnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2hUb0NhbnZhcyhlbGVtZW50IGFzIEhUTUxDYW52YXNFbGVtZW50KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYy5ub2RlTmFtZSA9PT0gJ0NBTlZBUycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoVG9DYW52YXMoZWxlbWVudCBhcyBIVE1MQ2FudmFzRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTm8gQ2FudmFzIGZvdW5kIHNvIHdlIGNyZWF0ZSBvbmVcbiAgICAgICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2hUb0NhbnZhcyhjYW52YXMpO1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjYW52YXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZpcmVHcmlkQ2hhbmdlIChzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdncmlkIGNoYW5nZTogJywgc3RhdGUpO1xuXG4gICAgICAgIGxldCBib3hTaXplID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcbiAgICAgICAgbGV0IGMgPSBzdGF0ZS5jb2xvbm5lO1xuICAgICAgICBsZXQgbCA9IHN0YXRlLmxpZ25lO1xuXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgbGV0IGNvdWxldXIgPSBjb2xvcmVyUHJvZ3JlbShjLCBsLCBzdGF0ZS5jb250ZXh0ZSk7XG4gICAgICAgIGlmIChjb3VsZXVyKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb3VsZXVyO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoYyAqIGJveFNpemUsIGwgKiBib3hTaXplLCBib3hTaXplLCBib3hTaXplKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiXG5leHBvcnQgY2xhc3MgRXZhbFNjb3BlIHtcblxuICAgIC8vIFNlZSBodHRwOi8vcGVyZmVjdGlvbmtpbGxzLmNvbS9nbG9iYWwtZXZhbC13aGF0LWFyZS10aGUtb3B0aW9ucy9cbiAgICAvLyBXaWxsIHJldHVybiBhbiBldmFsIGFibGUgdG8gZXZhbHVhdGUganMgY29kZSBpbiB0aGUgZ2xvYmFsIHNjb3BlLlxuICAgIHB1YmxpYyByZWFkb25seSBnbG9iYWxFdmFsID0gKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXIgaXNJbmRpcmVjdEV2YWxHbG9iYWwgPSAoZnVuY3Rpb24gKG9yaWdpbmFsLCBPYmplY3QpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gRG9lcyBgT2JqZWN0YCByZXNvbHZlIHRvIGEgbG9jYWwgdmFyaWFibGUsIG9yIHRvIGEgZ2xvYmFsLCBidWlsdC1pbiBgT2JqZWN0YCxcbiAgICAgICAgICAgICAgICAvLyByZWZlcmVuY2UgdG8gd2hpY2ggd2UgcGFzc2VkIGFzIGEgZmlyc3QgYXJndW1lbnQ/XG4gICAgICAgICAgICAgICAgcmV0dXJuICgxLCBldmFsKSgnT2JqZWN0JykgPT09IG9yaWdpbmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIC8vIGlmIGluZGlyZWN0IGV2YWwgZXJyb3JzIG91dCAoYXMgYWxsb3dlZCBwZXIgRVMzKSwgdGhlbiBqdXN0IGJhaWwgb3V0IHdpdGggYGZhbHNlYFxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoT2JqZWN0LCAxMjMpO1xuXG4gICAgICAgIGlmIChpc0luZGlyZWN0RXZhbEdsb2JhbCkge1xuICAgICAgICAgICAgLy8gaWYgaW5kaXJlY3QgZXZhbCBleGVjdXRlcyBjb2RlIGdsb2JhbGx5LCB1c2UgaXRcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXhwcmVzc2lvbjogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgxLCBldmFsKShleHByZXNzaW9uKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygd2luZG93LmV4ZWNTY3JpcHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvLyBpZiBgd2luZG93LmV4ZWNTY3JpcHQgZXhpc3RzYCwgdXNlIGl0XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV4cHJlc3Npb246IHN0cmluZykge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LmV4ZWNTY3JpcHQoZXhwcmVzc2lvbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3RoZXJ3aXNlLCBnbG9iYWxFdmFsIGlzIGB1bmRlZmluZWRgIHNpbmNlIG5vdGhpbmcgaXMgcmV0dXJuZWRcbiAgICAgICAgcmV0dXJuIChleHByOiBzdHJpbmcpID0+IHt0aHJvdyBuZXcgRXJyb3IoJ05vIGdsb2JhbCBldmFsIGF2YWlsYWJsZSAhJyk7fVxuICAgIH0pKCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbn1cbiIsImltcG9ydCB7IFBhdHRlcm4sIElkZW50aWZpZXIsIEJhc2VOb2RlLCBWYXJpYWJsZURlY2xhcmF0aW9uLCBBc3NpZ25tZW50RXhwcmVzc2lvbiwgRnVuY3Rpb25EZWNsYXJhdGlvbiwgVmFyaWFibGVEZWNsYXJhdG9yIH0gZnJvbSBcImVzdHJlZVwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFzdEhlbHBlciB7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gcGF0dGVyblRvU3RyaW5nKHBhdHRlcm46IFBhdHRlcm4pOiBzdHJpbmcge1xuICAgICAgICB2YXIgbm9kZTtcbiAgICAgICAgc3dpdGNoIChwYXR0ZXJuLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0lkZW50aWZpZXInOlxuICAgICAgICAgICAgICAgIG5vZGUgPSBwYXR0ZXJuIGFzIElkZW50aWZpZXI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUubmFtZTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGNvbnZlcnQgcGF0dGVybiBvZiB0eXBlICcgKyBwYXR0ZXJuLnR5cGUpO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiByZWR1Y2VOb2RlVG9WYXJEZWNsYXJhdGlvbihub2RlOiBCYXNlTm9kZSk6IFZhcmlhYmxlRGVjbGFyYXRpb24gfCBBc3NpZ25tZW50RXhwcmVzc2lvbiB8IEZ1bmN0aW9uRGVjbGFyYXRpb24gfCB2b2lkIHtcbiAgICAgICAgXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgbGV0IGRlY2wgPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gZGVjbDtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgIGxldCBleHByID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgICAgIHJldHVybiBleHByO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBmdW5jO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHAgPT09ICdsZWZ0JyB8fCBwID09PSAncmlnaHQnIHx8IHAgPT09ICdhcmd1bWVudCcgfHwgcCA9PT0gJ2NhbGxlZScgfHwgcCA9PT0gJ2JvZHknIHx8IHAgPT09ICdleHByZXNzaW9uJykge1xuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkOiBCYXNlTm9kZSA9IG5vZGVbcF0gYXMgQmFzZU5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSByZWR1Y2VOb2RlVG9WYXJEZWNsYXJhdGlvbihjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IEh0bWxWZXJzZUZhY3RvcnksIFN0eWxlRGVjb3JhdG9yLCBWZXJzZUluc3RydWN0aW9uIH0gZnJvbSBcIi4vVHlwZXNcIjtcbmltcG9ydCB7IEJhc2VOb2RlLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBCbG9ja1N0YXRlbWVudCwgSWZTdGF0ZW1lbnQsIFZhcmlhYmxlRGVjbGFyYXRvciwgVmFyaWFibGVEZWNsYXJhdGlvbiwgQXNzaWdubWVudEV4cHJlc3Npb24sIEJpbmFyeUV4cHJlc3Npb24sIEV4cHJlc3Npb25TdGF0ZW1lbnQsIFJldHVyblN0YXRlbWVudCB9IGZyb20gXCJlc3RyZWVcIjtcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tIFwiLi9IdG1sSGVscGVyXCI7XG5pbXBvcnQgeyBBc3RIZWxwZXIgfSBmcm9tIFwiLi9Bc3RIZWxwZXJcIjtcbmltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcblxuZXhwb3J0IGNsYXNzIEVzdHJlZVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeSBpbXBsZW1lbnRzIEh0bWxWZXJzZUZhY3Rvcnk8QmFzZU5vZGU+IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjb3JhdG9yOiBTdHlsZURlY29yYXRvcjxCYXNlTm9kZT4pIHt9XG5cbiAgICBidWlsZCh2ZXJzZTogVmVyc2VJbnN0cnVjdGlvbjxCYXNlTm9kZT4pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ1aWxkTm9kZSh2ZXJzZS5hc3RSb290Tm9kZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGQgTm9kZSBhcHBseWluZyBkZWNvcmF0b3JzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBub2RlIFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBidWlsZE5vZGUobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCByZXMgPSB0aGlzLmJ1aWxkTm9kZUludGVybmFsKG5vZGUpO1xuICAgICAgICB0aGlzLmRlY29yYXRvci5kZWNvcmF0ZShub2RlLCByZXMpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkIG5vZGUuXG4gICAgICogQHBhcmFtIG5vZGUgXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGJ1aWxkTm9kZUludGVybmFsKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zb2xlLmxvZygnQnVpbGRpbmcgbm9kZScsIG5vZGUsICcuLi4nKTtcbiAgICAgICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Z1bmN0aW9uRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkRnVuY3Rpb25EZWNsYXJhdGlvbihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0Jsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEJsb2NrU3RhdGVtZW50KG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnSWZTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkSWZTdGF0ZW1lbnQobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdWYXJpYWJsZURlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZFZhcmlhYmxlRGVjbGFyYXRpb24obm9kZSk7XG4gICAgICAgICAgICBjYXNlICdWYXJpYWJsZURlY2xhcmF0b3InOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkVmFyaWFibGVEZWNsYXJhdG9yKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnQXNzaWdubWVudEV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQXNzaWdubWVudEV4cHJlc3Npb24obm9kZSk7XG4gICAgICAgICAgICBjYXNlICdCaW5hcnlFeHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEJpbmFyeUV4cHJlc3Npb24obm9kZSk7XG4gICAgICAgICAgICBjYXNlICdFeHByZXNzaW9uU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEV4cHJlc3Npb25TdGF0ZW1lbnQobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdSZXR1cm5TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkUmV0dXJuU3RhdGVtZW50KG5vZGUpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZERlZmF1bHQobm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRGdW5jdGlvbkRlY2xhcmF0aW9uKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgXG4gICAgICAgIGxldCBkZWNsU3RhcnRUZXh0OiBzdHJpbmc7XG4gICAgICAgIGlmIChuLmlkKSB7XG4gICAgICAgICAgICBsZXQgZnVuY0lkID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLWlkJywgbi5pZC5uYW1lKTtcbiAgICAgICAgICAgIGRlY2xTdGFydFRleHQgPSAnZnVuY3Rpb24gJyArIGZ1bmNJZC50ZXh0Q29udGVudCArICcgKCAnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVjbFN0YXJ0VGV4dCA9ICdmdW5jdGlvbiAoICc7Ly8gKyBmdW5jLnBhcmFtcy5tYXAoeCA9PiB4Lm5hbWUpLmpvaW4oJywgJykgKyAnICkgeyc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFyYW1Db3VudCA9IG4ucGFyYW1zLmxlbmd0aDtcbiAgICAgICAgbi5wYXJhbXMuZm9yRWFjaCgocGFyYW0sIGkpID0+IHtcbiAgICAgICAgICAgIGxldCB2YXJOYW1lID0gQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhwYXJhbSk7XG4gICAgICAgICAgICBsZXQgZnVuY1BhcmFtID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLXBhcmFtJywgdmFyTmFtZSk7XG4gICAgICAgICAgICBkZWNsU3RhcnRUZXh0ICs9IGZ1bmNQYXJhbS50ZXh0Q29udGVudFxuICAgICAgICAgICAgaWYgKGkgPCBwYXJhbUNvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgIGRlY2xTdGFydFRleHQgKz0gJywgJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVjbFN0YXJ0VGV4dCArPSAnICkgeyc7XG5cbiAgICAgICAgbGV0IGRlY2xTdGFydCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1zdGFydCcsIGRlY2xTdGFydFRleHQpO1xuICAgICAgICBsZXQgZnVuY0JvZHkgPSB0aGlzLmJ1aWxkTm9kZShuLmJvZHkpO1xuICAgICAgICBsZXQgZGVjbEVuZCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1lbmQnLCAnfScpO1xuICAgICAgICBsZXQgZGVjbCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1kZWNsYXJhdGlvbicsIFtkZWNsU3RhcnQsIGZ1bmNCb2R5LCBkZWNsRW5kXSk7XG5cbiAgICAgICAgcmV0dXJuIGRlY2w7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkQmxvY2tTdGF0ZW1lbnQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgbGV0IGJvZHlTdGF0ZW1lbnRzID0gbi5ib2R5Lm1hcChzdGF0ZW1lbnQgPT4gdGhpcy5idWlsZE5vZGUoc3RhdGVtZW50KSlcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIuc3BhbignYmxvY2snLCBib2R5U3RhdGVtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZElmU3RhdGVtZW50KG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgSWZTdGF0ZW1lbnQ7XG4gICAgICAgIGxldCBjb250ZW50OiBIVE1MRWxlbWVudFtdID0gW11cbiAgICAgICAgbGV0IHRlc3QgPSB0aGlzLmJ1aWxkTm9kZShuLnRlc3QpO1xuICAgICAgICBsZXQgaWZTdGFydFRleHQ6IHN0cmluZyA9ICdpZiAoICcgKyB0ZXN0LnRleHRDb250ZW50ICsgJyApIHsnO1xuICAgICAgICBsZXQgaWZTdGFydCA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLXN0YXRlbWVudC1zdGFydCcsIGlmU3RhcnRUZXh0KTtcbiAgICAgICAgY29udGVudC5wdXNoKGlmU3RhcnQpO1xuXG4gICAgICAgIGxldCB0aGVuQmxvY2sgPSB0aGlzLmJ1aWxkTm9kZShuLmNvbnNlcXVlbnQpO1xuICAgICAgICBsZXQgaWZUaGVuID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtYmxvY2stdGhlbicsIHRoZW5CbG9jayk7XG4gICAgICAgIGNvbnRlbnQucHVzaChpZlRoZW4pO1xuXG4gICAgICAgIGlmIChuLmFsdGVybmF0ZSkge1xuICAgICAgICAgICAgY29udGVudC5wdXNoKGlmU3RhcnQpO1xuICAgICAgICAgICAgbGV0IGlmRWxzZURlY2wgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1zdGF0ZW1lbnQtZWxzZScsICd9IGVsc2UgeycpO1xuICAgICAgICAgICAgY29udGVudC5wdXNoKGlmRWxzZURlY2wpO1xuXG4gICAgICAgICAgICBsZXQgZWxzZUJsb2NrID0gdGhpcy5idWlsZE5vZGUobi5hbHRlcm5hdGUpO1xuICAgICAgICAgICAgbGV0IGlmRWxzZSA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLWJsb2NrLWVsc2UnLCBlbHNlQmxvY2spO1xuICAgICAgICAgICAgY29udGVudC5wdXNoKGlmRWxzZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSBcbiAgICAgICAgbGV0IGlmRW5kID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtc3RhdGVtZW50LWVuZCcsICd9Jyk7XG4gICAgICAgIGNvbnRlbnQucHVzaChpZkVuZCk7XG5cblxuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtc3RhdGVtZW50JywgY29udGVudCk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkVmFyaWFibGVEZWNsYXJhdGlvbihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgIGxldCBkZWNsYXJhdGlvbnMgPSBuLmRlY2xhcmF0aW9ucy5tYXAoZCA9PiB0aGlzLmJ1aWxkTm9kZShkKSk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2RlY2xhcmF0aW9uIHZhcmlhYmxlLWRlY2xhcmF0aW9uJywgZGVjbGFyYXRpb25zKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRWYXJpYWJsZURlY2xhcmF0b3Iobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0b3I7XG4gICAgICAgIGxldCBsZWZ0ID0gQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhuLmlkKTtcbiAgICAgICAgbGV0IGxlZnRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS1pZCcsIGxlZnQpO1xuICAgICAgICBsZXQgY29udGFpbmVyO1xuICAgICAgICBpZiAobi5pbml0KSB7XG4gICAgICAgICAgICBsZXQgYXNzaWduUGFydCA9IEh0bWxIZWxwZXIuc3BhbignYXNzaWduLW9wZXJhdG9yJywgJyA9ICcpO1xuICAgICAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5idWlsZE5vZGUobi5pbml0KTtcbiAgICAgICAgICAgIGxldCByaWdodFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLXZhbHVlJywgcmlnaHQpO1xuICAgICAgICAgICAgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIHZhcmlhYmxlLWV4cHJlc3Npb24nLCBbbGVmdFBhcnQsIGFzc2lnblBhcnQsIHJpZ2h0UGFydF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uIHZhcmlhYmxlLWV4cHJlc3Npb24nLCBsZWZ0UGFydCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkQXNzaWdubWVudEV4cHJlc3Npb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLmJ1aWxkTm9kZShuLmxlZnQpO1xuICAgICAgICBsZXQgbGVmdFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ3ZhcmlhYmxlLWlkJywgbGVmdCk7XG4gICAgICAgIGxldCBhc3NpZ25QYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdhc3NpZ24tb3BlcmF0b3InLCAnID0gJyk7XG4gICAgICAgIGxldCByaWdodCA9IHRoaXMuYnVpbGROb2RlKG4ucmlnaHQpO1xuICAgICAgICBsZXQgcmlnaHRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS12YWx1ZScsIHJpZ2h0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiB2YXJpYWJsZS1leHByZXNzaW9uJywgW2xlZnRQYXJ0LCBhc3NpZ25QYXJ0LCByaWdodFBhcnRdKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGRCaW5hcnlFeHByZXNzaW9uKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgQmluYXJ5RXhwcmVzc2lvbjtcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLmJ1aWxkTm9kZShuLmxlZnQpO1xuICAgICAgICBsZXQgbGVmdFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24nLCBsZWZ0KTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5idWlsZE5vZGUobi5sZWZ0KTtcbiAgICAgICAgbGV0IHJpZ2h0UGFydCA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbicsIHJpZ2h0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiBiaW5hcnktZXhwcmVzc2lvbicsIFtsZWZ0UGFydCwgcmlnaHRQYXJ0XSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkRXhwcmVzc2lvblN0YXRlbWVudChub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEV4cHJlc3Npb25TdGF0ZW1lbnQ7XG4gICAgICAgIGxldCBjb2RlID0gZXNjb2RlR2VuZXJhdGUobik7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBleHByZXNzaW9uLXN0YXRlbWVudCcsIGNvZGUpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZFJldHVyblN0YXRlbWVudChub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIFJldHVyblN0YXRlbWVudDtcbiAgICAgICAgbGV0IGNvZGUgPSBlc2NvZGVHZW5lcmF0ZShuKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IHJldHVybi1zdGF0ZW1lbnQnLCBjb2RlKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYnVpbGREZWZhdWx0KG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zb2xlLmxvZygnZGVmYXVsdDonLCBub2RlKTtcbiAgICAgICAgbGV0IGNvZGUgPSBlc2NvZGVHZW5lcmF0ZShub2RlKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZGVmYXVsdC0nICsgbm9kZS50eXBlLCBjb2RlKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG59IiwiaW1wb3J0IHsgUHJvZ3JlbVN0YXRlLCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciwgTGluZUNoYW5nZUxpc3RlbmVyLCBGcmFtZUNoYW5nZUxpc3RlbmVyIH0gZnJvbSBcIi4vU2NoZWR1bGluZ1NlcnZpY2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBWZXJzZUluc3RydWN0aW9uPEFzdEJhc2VUeXBlPiB7XG4gICAgYXN0Um9vdE5vZGU6IEFzdEJhc2VUeXBlXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmVyc2VJbnN0cnVjdGlvbkZhY3Rvcnk8QXN0QmFzZVR5cGU+IHtcbiAgICBidWlsZChwYXJhbTogQXN0QmFzZVR5cGUpOiBWZXJzZUluc3RydWN0aW9uPEFzdEJhc2VUeXBlPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtQ29kZUZhY3Rvcnk8QXN0QmFzZVR5cGU+IHtcbiAgICBidWlsZChjb2RlOiBzdHJpbmcpOiBQcm9ncmVtQ29kZTxBc3RCYXNlVHlwZT5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBWZXJzZUl0ZXJhdG9yPEFzdEJhc2VUeXBlPiB7XG4gICAgZXhlY3V0ZU5leHQoKTogVmVyc2VJbnN0cnVjdGlvbjxBc3RCYXNlVHlwZT5cbiAgICBoYXNOZXh0KCk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbUNvZGU8QXN0QmFzZVR5cGU+IHtcbiAgICBpbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpOiBWZXJzZUluc3RydWN0aW9uPEFzdEJhc2VUeXBlPlxuICAgIGNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKTogVmVyc2VJbnN0cnVjdGlvbjxBc3RCYXNlVHlwZT5cbiAgICBpdGVyYXRvcihzdGF0ZTogUHJvZ3JlbVN0YXRlKTogVmVyc2VJdGVyYXRvcjxBc3RCYXNlVHlwZT5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtU2NoZWR1bGVyIHtcbiAgICBzdWJzY3JpYmVDb2RlRXhlY3V0aW9uKGxpc3RlbmVyOiBDb2RlRXhlY3V0aW9uTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlR3JpZENoYW5nZShsaXN0ZW5lcjogR3JpZENoYW5nZUxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUxpbmVDaGFuZ2UobGlzdGVuZXI6IExpbmVDaGFuZ2VMaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVGcmFtZUNoYW5nZShsaXN0ZW5lcjogRnJhbWVDaGFuZ2VMaXN0ZW5lcik6IHZvaWRcbiAgICByZXNldCgpOiBQcm9ncmVtU3RhdGVcbiAgICBjdXJyZW50KCk6IFByb2dyZW1TdGF0ZVxuICAgIG5leHQoKTogUHJvZ3JlbVN0YXRlXG4gICAgZ2V0UHJvZ3JlbSgpOiBQcm9ncmVtQ29kZTxhbnk+XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbVZpZXcge1xuICAgIGJ1aWxkVmlldyhzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXIpOiBIVE1MRWxlbWVudFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0eWxlRGVjb3JhdG9yPFQ+IHtcbiAgICBkZWNvcmF0ZShub2RlOiBULCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWRcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSHRtbFZlcnNlRmFjdG9yeTxBc3RCYXNlVHlwZT4ge1xuICAgIGJ1aWxkKHZlcnNlOiBWZXJzZUluc3RydWN0aW9uPEFzdEJhc2VUeXBlPik6IEhUTUxFbGVtZW50XG59XG5cbmV4cG9ydCBjbGFzcyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uPFQ+IGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8VD4ge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNvcmF0b3JzOiBTdHlsZURlY29yYXRvcjxUPltdKSB7fVxuXG4gICAgZGVjb3JhdGUobm9kZTogVCwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZWNvcmF0b3JzLmZvckVhY2goZCA9PiBkLmRlY29yYXRlKG5vZGUsIGVsZW1lbnQpKTtcbiAgICB9XG5cbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjb3JhdG9ycy5tYXAoZCA9PiBkLmJ1aWxkU3R5bGVTaGVldCgpKS5qb2luKCdcXG4nKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIEhpZ2hsaWdodEV4ZWN1dGluZ1ZlcnNlRGVjb3JhdG9yIGltcGxlbWVudHMgU3R5bGVEZWNvcmF0b3I8VmVyc2VJbnN0cnVjdGlvbjxhbnk+PiB7XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IE5PVF9FWEVDVVRFRF9DTEFTUyA9ICd2ZXJzZS1ub3QtZXhlY3V0ZWQnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVhFQ1VUSU5HX0NMQVNTID0gJ3ZlcnNlLWV4ZWN1dGluZyc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBFWEVDVVRFRF9DTEFTUyA9ICd2ZXJzZS1leGVjdXRlZCc7XG5cbiAgICBkZWNvcmF0ZShub2RlOiBWZXJzZUluc3RydWN0aW9uPGFueT4sIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChIaWdobGlnaHRFeGVjdXRpbmdWZXJzZURlY29yYXRvci5OT1RfRVhFQ1VURURfQ0xBU1MpO1xuICAgIH0gICAgXG4gICAgXG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgIC8qKiAtLS0tLSBIaWdobGlnaHRFeGVjdXRpbmdWZXJzZURlY29yYXRvciBzdHlsZSAtLS0tLSAqL1xuICAgICAgICAke0hpZ2hsaWdodEV4ZWN1dGluZ1ZlcnNlRGVjb3JhdG9yLk5PVF9FWEVDVVRFRF9DTEFTU306IHtcblxuICAgICAgICB9XG4gICAgICAgICR7SGlnaGxpZ2h0RXhlY3V0aW5nVmVyc2VEZWNvcmF0b3IuRVhFQ1VUSU5HX0NMQVNTfToge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93O1xuICAgICAgICB9XG4gICAgICAgICR7SGlnaGxpZ2h0RXhlY3V0aW5nVmVyc2VEZWNvcmF0b3IuRVhFQ1VURURfQ0xBU1N9OiB7XG5cbiAgICAgICAgfVxuICAgICAgICBgO1xuICAgIH1cblxufVxuXG4iLCJpbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBDb2RlU2VydmljZSB9IGZyb20gXCIuL0NvZGVTZXJ2aWNlXCI7XG5pbXBvcnQgeyBTY2hlZHVsaW5nU2VydmljZSB9IGZyb20gJy4vU2NoZWR1bGluZ1NlcnZpY2UnO1xuaW1wb3J0IHsgQmFzaWNIdG1sRXNwcmltYVByb2dyZW1JbnNwZWN0b3IsIFByb2dyZW1JbnNwZWN0b3JWaWV3IH0gZnJvbSAnLi9Qcm9ncmVtSW5zcGVjdG9yJztcbmltcG9ydCB7IEJhc2ljQ2FudmFzUHJvZ3JlbUdyaWQgfSBmcm9tICcuL1Byb2dyZW1HcmlkJztcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gJy4vU2NyZWVuU2VydmljZSc7XG5pbXBvcnQgeyBFc3RyZWVQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkgfSBmcm9tICcuL0VzdHJlZVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeSc7XG5pbXBvcnQgeyBCYXNlTm9kZSB9IGZyb20gJ2VzdHJlZSc7XG5pbXBvcnQgeyBTdHlsZURlY29yYXRvckFnZ3JlZ2F0aW9uLCBQcm9ncmVtU2NoZWR1bGVyIH0gZnJvbSAnLi9UeXBlcyc7XG5pbXBvcnQgeyBQYWRWZXJzZURlY29yYXRvciB9IGZyb20gJy4vRXN0cmVlU3R5bGVEZWNvcmF0b3InO1xuXG5leHBvcnQgY2xhc3MgUHJvZ3JlbUNvbmZpZyB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjb2xvbm5lczogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbGlnbmVzOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBmcmFtZXM6IG51bWJlcixcbiAgICApIHt9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgUHJvZ3JlbVNlcnZpY2Uge1xuXG4gICAgdmFyIHByZXZpb3VzUmVwYWludFRpbWUgPSAwO1xuICAgIHZhciBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXI7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtKHVybDogc3RyaW5nLCBzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZzogUHJvZ3JlbUNvbmZpZykge1xuICAgICAgICBsZXQgcHJvZ3JlbVNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBwcm9ncmVtU2NyaXB0LnNyYyA9IHVybDtcbiAgICAgICAgbGV0IGJvZHlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICAgICBpZiAoYm9keUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGJvZHlFbGVtZW50LmFwcGVuZENoaWxkKHByb2dyZW1TY3JpcHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgQ29kZVNlcnZpY2UubG9hZFByb2dyZW0odXJsKS50aGVuKGNvZGUgPT4ge1xuICAgICAgICAgICAgbGV0IHByb2dyZW1Db2RlID0gQ29kZVNlcnZpY2UucHJvZ3JlbUNvZGVGYWN0b3J5LmJ1aWxkKGNvZGUpO1xuICAgICAgICAgICAgbGV0IGNvbG9yZXJGdW5jdGlvbiA9IHByb2dyZW1Db2RlLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKS5hc3RSb290Tm9kZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9ncmVtIEFTVDonLCBwcm9ncmVtQ29kZS5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKTtcblxuICAgICAgICAgICAgLy8gTG9hZCBpbml0UHJvZ3JlbSBGdW5jdGlvbiBjb2RlXG4gICAgICAgICAgICBsZXQgaW5pdFByb2dyZW1GdW5jdGlvbkNvZGUgPSBlc2NvZGVHZW5lcmF0ZShwcm9ncmVtQ29kZS5pbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpLmFzdFJvb3ROb2RlKTtcbiAgICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5ldmFsKGluaXRQcm9ncmVtRnVuY3Rpb25Db2RlKTtcblxuICAgICAgICAgICAgc2NoZWR1bGVyID0gU2NoZWR1bGluZ1NlcnZpY2UuYnVpbGRQcm9ncmVtU2NoZWR1bGVyKHByb2dyZW1Db25maWcsIHByb2dyZW1Db2RlKTtcblxuICAgICAgICAgICAgLy9sZXQgcHJvZ3JlbUluc3BlY3RvciA9IG5ldyBCYXNpY0h0bWxFc3ByaW1hUHJvZ3JlbUluc3BlY3Rvcihwcm9ncmVtQ29kZSwgc2NoZWR1bGVyLCBkb2N1bWVudCk7XG4gICAgICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3RvckRlY29yYXRvcnMgPSBuZXcgU3R5bGVEZWNvcmF0b3JBZ2dyZWdhdGlvbjxCYXNlTm9kZT4oW1xuICAgICAgICAgICAgICAgIG5ldyBQYWRWZXJzZURlY29yYXRvcigpXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9yRmFjdG9yeSA9IG5ldyBFc3RyZWVQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkocHJvZ3JlbUluc3BlY3RvckRlY29yYXRvcnMpO1xuICAgICAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JWaWV3ID0gbmV3IFByb2dyZW1JbnNwZWN0b3JWaWV3KHByb2dyZW1JbnNwZWN0b3JGYWN0b3J5KTtcblxuICAgICAgICAgICAgbGV0IGNvZGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJy5jb2RlJyk7XG4gICAgICAgICAgICBpZiAoY29kZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY29kZUVsZW1lbnQnLCBjb2RlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQgPSBwcm9ncmVtSW5zcGVjdG9yVmlldy5idWlsZFZpZXcoc2NoZWR1bGVyKTtcbiAgICAgICAgICAgICAgICBjb2RlRWxlbWVudC5hcHBlbmRDaGlsZChwcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGdyaWRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZW0nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdncmlkRWxlbWVudCcsIGdyaWRFbGVtZW50KTtcbiAgICAgICAgICAgIGxldCBwcm9ncmVtR3JpZCA9IG5ldyBCYXNpY0NhbnZhc1Byb2dyZW1HcmlkKHNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZyk7XG4gICAgICAgICAgICBwcm9ncmVtR3JpZC5hdHRhY2goZ3JpZEVsZW1lbnQpO1xuICAgICAgICAgICAgcHJvZ3JlbUdyaWQuY2xlYXIoKTtcbiAgICAgICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVHcmlkQ2hhbmdlKHByb2dyZW1HcmlkKTtcblxuICAgICAgICAgICAgdGltZXIoMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRpbWVyKHRpbWVzdGFtcDogbnVtYmVyKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGltZXIpO1xuXG4gICAgICAgIGlmICh0aW1lc3RhbXAgLSBwcmV2aW91c1JlcGFpbnRUaW1lIDwgMTUwMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJldmlvdXNSZXBhaW50VGltZSA9IHRpbWVzdGFtcDtcblxuICAgICAgICBpZiAoc2NoZWR1bGVyKSB7XG4gICAgICAgICAgICBzY2hlZHVsZXIubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiXG5leHBvcnQgY2xhc3MgU2NyZWVuQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGJveFNpemU6IG51bWJlclxuICAgICkge31cbn1cblxuZXhwb3J0IGNsYXNzIFNjcmVlblNlcnZpY2Uge1xuXG4gICAgcHVibGljIGdldFNjcmVlbkZyYW1lKCk6IGFueSB7XG5cbiAgICB9XG5cbn0iLCJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBIdG1sSGVscGVyIHtcblxuICAgIHN0YXRpYyBhZGRDbGFzc2VzKGVsdDogSFRNTEVsZW1lbnQsIGNsYXNzZXM6IHN0cmluZ3xzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBpZiAodHlwZW9mIGNsYXNzZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnNwbGl0KCcgJykuZm9yRWFjaChjID0+IGVsdC5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjbGFzc2VzKSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5mb3JFYWNoKGMgPT4gZWx0LmNsYXNzTGlzdC5hZGQoYykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHNwYW4oY2xhc3Nlczogc3RyaW5nfHN0cmluZ1tdLCBjb250ZW50Pzogc3RyaW5nfEhUTUxFbGVtZW50fEhUTUxFbGVtZW50W10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBlbHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgICAgIEh0bWxIZWxwZXIuYWRkQ2xhc3NlcyhlbHQsIGNsYXNzZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZWx0LmlubmVyVGV4dCA9IGNvbnRlbnQ7XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjb250ZW50KSkge1xuICAgICAgICAgICAgY29udGVudC5mb3JFYWNoKGMgPT4gZWx0LmFwcGVuZENoaWxkKGMpKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb250ZW50KSB7XG4gICAgICAgICAgICBlbHQuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBlbHQ7XG4gICAgfVxufSIsImltcG9ydCB7IFByb2dyZW1Db25maWcgfSBmcm9tIFwiLi9Qcm9ncmVtU2VydmljZVwiO1xuaW1wb3J0IHsgRXZhbFNjb3BlIH0gZnJvbSBcIi4vRXZhbFNlcnZpY2VcIjtcbmltcG9ydCB7IFByb2dyZW1TY2hlZHVsZXIsIFZlcnNlSW5zdHJ1Y3Rpb24sIFZlcnNlSXRlcmF0b3IsIFByb2dyZW1Db2RlIH0gZnJvbSBcIi4vVHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1TdGF0ZSB7XG5cbiAgICBwdWJsaWMgcmVhZG9ubHkgZXZhbFNjb3BlID0gbmV3IEV2YWxTY29wZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY29sb25uZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbGlnbmU6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGZyYW1lOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBjb250ZXh0ZTogb2JqZWN0LFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY29kZVN0YXRlbWVudDogVmVyc2VJbnN0cnVjdGlvbjxhbnk+IHwgbnVsbCxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZXZhbChleHByOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmFsU2NvcGUuZ2xvYmFsRXZhbChleHByKTtcbiAgICB9XG59XG5cbnR5cGUgTmV3U3RhdGVDYWxsYmFjayA9IChzdGF0ZTogUHJvZ3JlbVN0YXRlKSA9PiB2b2lkO1xuZXhwb3J0IGludGVyZmFjZSBDb2RlRXhlY3V0aW9uTGlzdGVuZXIge2ZpcmVDb2RlRXhlY3V0aW9uOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgR3JpZENoYW5nZUxpc3RlbmVyIHtmaXJlR3JpZENoYW5nZTogTmV3U3RhdGVDYWxsYmFja307XG5leHBvcnQgaW50ZXJmYWNlIExpbmVDaGFuZ2VMaXN0ZW5lciB7ZmlyZUxpbmVDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBGcmFtZUNoYW5nZUxpc3RlbmVyIHtmaXJlRnJhbWVDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuXG4vKlxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtU2NoZWR1bGVyIHtcbiAgICBzdWJzY3JpYmVDb2RlRXhlY3V0aW9uKGxpc3RlbmVyOiBDb2RlRXhlY3V0aW9uTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlR3JpZENoYW5nZShsaXN0ZW5lcjogR3JpZENoYW5nZUxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUxpbmVDaGFuZ2UobGlzdGVuZXI6IExpbmVDaGFuZ2VMaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVGcmFtZUNoYW5nZShsaXN0ZW5lcjogRnJhbWVDaGFuZ2VMaXN0ZW5lcik6IHZvaWRcblxuICAgIHJlc2V0KCk6IFByb2dyZW1TdGF0ZVxuICAgIGN1cnJlbnQoKTogUHJvZ3JlbVN0YXRlXG4gICAgbmV4dCgpOiBQcm9ncmVtU3RhdGVcbn1cbiovXG5cbmNsYXNzIFNpbXBsZVByb2dyZW1TY2hlZHVsZXIgaW1wbGVtZW50cyBQcm9ncmVtU2NoZWR1bGVyIHtcbiAgICBcbiAgICBwcml2YXRlIHN0YXRlOiBQcm9ncmVtU3RhdGU7XG4gICAgcHJpdmF0ZSBjb2RlSXRlcmF0b3I6IFZlcnNlSXRlcmF0b3I8YW55PiB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBjb2RlRXhlY3V0aW9uTGlzdGVuZXJzOiBDb2RlRXhlY3V0aW9uTGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgZ3JpZENoYW5nZUxpc3RlbmVyczogR3JpZENoYW5nZUxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGxpbmVDaGFuZ2VMaXN0ZW5lcnM6IExpbmVDaGFuZ2VMaXN0ZW5lcltdID0gW107XG4gICAgcHJpdmF0ZSBmcmFtZUNoYW5nZUxpc3RlbmVyczogRnJhbWVDaGFuZ2VMaXN0ZW5lcltdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogUHJvZ3JlbUNvbmZpZywgcHJpdmF0ZSBjb2RlOiBQcm9ncmVtQ29kZTxhbnk+KSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLnJlc2V0KCk7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlQ29kZUV4ZWN1dGlvbihsaXN0ZW5lcjogQ29kZUV4ZWN1dGlvbkxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29kZUV4ZWN1dGlvbkxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9ICAgIFxuICAgIFxuICAgIHN1YnNjcmliZUdyaWRDaGFuZ2UobGlzdGVuZXI6IEdyaWRDaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmdyaWRDaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlTGluZUNoYW5nZShsaXN0ZW5lcjogTGluZUNoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGluZUNoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVGcmFtZUNoYW5nZShsaXN0ZW5lcjogRnJhbWVDaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmZyYW1lQ2hhbmdlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHJlc2V0KCk6IFByb2dyZW1TdGF0ZSB7XG4gICAgICAgIC8vIENhbGwganVzdCBldmFsdWF0ZWQgaW5pdGlhbGlzZXJQcm9ncmVtIGZ1bmN0aW9uXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgbGV0IGluaXRpYWxDb250ZXh0ZTogb2JqZWN0ID0gaW5pdGlhbGlzZXJQcm9ncmVtKHRoaXMuY29uZmlnLmNvbG9ubmVzLCB0aGlzLmNvbmZpZy5saWduZXMpO1xuICAgICAgICBjb25zb2xlLmxvZygnTG9hZGVkIGluaXRpYWwgY29udGV4dGU6ICcsIGluaXRpYWxDb250ZXh0ZSk7XG4gICAgICAgIGxldCBzdGF0ZSA9IG5ldyBQcm9ncmVtU3RhdGUoMCwgMCwgMCwgaW5pdGlhbENvbnRleHRlLCBudWxsKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIGN1cnJlbnQoKTogUHJvZ3JlbVN0YXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxuXG4gICAgbmV4dCgpOiBQcm9ncmVtU3RhdGUge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUpIHRocm93IG5ldyBFcnJvcignSW5jb25zaXN0ZW50IFByb2dyZW0gc3RhdGUgIScpO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29kZUl0ZXJhdG9yID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuY29kZUl0ZXJhdG9yID0gdGhpcy5jb2RlLml0ZXJhdG9yKHRoaXMuc3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZygnaGFzTmV4dDonLCB0aGlzLmNvZGVJdGVyYXRvci5oYXNOZXh0KCkpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvZGVJdGVyYXRvci5oYXNOZXh0KCkpIHtcbiAgICAgICAgICAgIGxldCBzdGF0ZW1lbnQgPSB0aGlzLmNvZGVJdGVyYXRvci5leGVjdXRlTmV4dCgpO1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0gbmV3IFByb2dyZW1TdGF0ZSh0aGlzLnN0YXRlLmNvbG9ubmUsIHRoaXMuc3RhdGUubGlnbmUsIHRoaXMuc3RhdGUuZnJhbWUsIHRoaXMuc3RhdGUuY29udGV4dGUsIHN0YXRlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgICAgICB0aGlzLmNvZGVFeGVjdXRpb25MaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlQ29kZUV4ZWN1dGlvbihuZXdTdGF0ZSkpO1xuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZygnRmluaXNoZWQgaXRlcmF0aW5nIG92ZXIgY29kZS4nKVxuXG4gICAgICAgIGxldCBub3RpZnlQaXhlbENoYW5nZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbm90aWZ5TGluZUNoYW5nZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbm90aWZ5RnJhbWVDaGFuZ2UgPSBmYWxzZTtcblxuICAgICAgICBsZXQgX2NvbG9ubmUgPSB0aGlzLnN0YXRlLmNvbG9ubmU7XG4gICAgICAgIGxldCBfbGlnbmUgPSB0aGlzLnN0YXRlLmxpZ25lO1xuICAgICAgICBsZXQgX2ZyYW1lID0gdGhpcy5zdGF0ZS5mcmFtZTtcblxuICAgICAgICBfY29sb25uZSArKztcbiAgICAgICAgbm90aWZ5UGl4ZWxDaGFuZ2UgPSB0cnVlO1xuXG4gICAgICAgIGlmIChfY29sb25uZSA+PSB0aGlzLmNvbmZpZy5jb2xvbm5lcykge1xuICAgICAgICAgICAgX2NvbG9ubmUgPSAwO1xuICAgICAgICAgICAgX2xpZ25lICsrO1xuICAgICAgICAgICAgbm90aWZ5TGluZUNoYW5nZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX2xpZ25lID4gdGhpcy5jb25maWcubGlnbmVzKSB7XG4gICAgICAgICAgICBfbGlnbmUgPSAwO1xuICAgICAgICAgICAgX2ZyYW1lICsrO1xuICAgICAgICAgICAgbm90aWZ5RnJhbWVDaGFuZ2UgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9mcmFtZSA+IHRoaXMuY29uZmlnLmZyYW1lcykge1xuICAgICAgICAgICAgX2ZyYW1lID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuZXdTdGF0ZSA9IG5ldyBQcm9ncmVtU3RhdGUoX2NvbG9ubmUsIF9saWduZSwgX2ZyYW1lLCB0aGlzLnN0YXRlLmNvbnRleHRlLCBudWxsKTtcbiBcbiAgICAgICAgaWYgKG5vdGlmeVBpeGVsQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmdyaWRDaGFuZ2VMaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlR3JpZENoYW5nZSh0aGlzLnN0YXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm90aWZ5TGluZUNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5saW5lQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUxpbmVDaGFuZ2UodGhpcy5zdGF0ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vdGlmeUZyYW1lQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUZyYW1lQ2hhbmdlKHRoaXMuc3RhdGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgdGhpcy5jb2RlSXRlcmF0b3IgPSB0aGlzLmNvZGUuaXRlcmF0b3IobmV3U3RhdGUpO1xuXG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UHJvZ3JlbSgpOiBQcm9ncmVtQ29kZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29kZTtcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgU2NoZWR1bGluZ1NlcnZpY2Uge1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJvZ3JlbVNjaGVkdWxlcihjb25maWc6IFByb2dyZW1Db25maWcsIGNvZGU6IFByb2dyZW1Db2RlPGFueT4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTaW1wbGVQcm9ncmVtU2NoZWR1bGVyKGNvbmZpZywgY29kZSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgY3JlYXRlIGFzIG1kNUNyZWF0ZSB9IGZyb20gJ2pzLW1kNSc7XG5pbXBvcnQgeyBGdW5jdGlvbkRlY2xhcmF0aW9uLCBCYXNlTm9kZSwgQmxvY2tTdGF0ZW1lbnQsIElmU3RhdGVtZW50LCBFeHByZXNzaW9uLCBWYXJpYWJsZURlY2xhcmF0aW9uLCBWYXJpYWJsZURlY2xhcmF0b3IsIEV4cHJlc3Npb25TdGF0ZW1lbnQsIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBSZXR1cm5TdGF0ZW1lbnQsIENvbmRpdGlvbmFsRXhwcmVzc2lvbiwgQmluYXJ5RXhwcmVzc2lvbiB9IGZyb20gJ2VzdHJlZSc7XG5pbXBvcnQgeyBQcm9ncmVtU3RhdGUsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyIH0gZnJvbSAnLi9TY2hlZHVsaW5nU2VydmljZSc7XG5pbXBvcnQgeyBBc3RIZWxwZXIgfSBmcm9tICcuL0FzdEhlbHBlcic7XG5pbXBvcnQgeyBGdW5jdGlvbkRlY2xhcmF0aW9uVG9IdG1sVHJlZVN0b3JlLCBDb2RlU3Bvb2xlckVzVG9IdG1sVHJlZU1hcHBlckZhY3RvcnksIEVzVG9IdG1sVHJlZVN0b3JlIH0gZnJvbSAnLi9IdG1sVHJlZSc7XG5pbXBvcnQgeyBQcm9ncmVtQ29kZSwgUHJvZ3JlbVZpZXcsIEh0bWxWZXJzZUZhY3RvcnksIFByb2dyZW1TY2hlZHVsZXIgfSBmcm9tICcuL1R5cGVzJztcbmltcG9ydCB7IEVzcHJpbWFQcm9ncmVtQ29kZSB9IGZyb20gJy4vQ29kZVNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1JbnNwZWN0b3Ige1xuICAgIGNsZWFyKCk6IHZvaWQ7XG4gICAgYXR0YWNoKGVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCk6IHZvaWRcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljSHRtbEVzcHJpbWFQcm9ncmVtSW5zcGVjdG9yIGltcGxlbWVudHMgUHJvZ3JlbUluc3BlY3RvciwgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyLCBHcmlkQ2hhbmdlTGlzdGVuZXIge1xuICAgIFxuICAgIHByaXZhdGUgcHJvZ3JlbUNvZGVMaW5lczogSFRNTEVsZW1lbnRbXSA9IFtdO1xuICAgIHByaXZhdGUgYXR0YWNoZWRFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgbWFwcGluZzogTWFwPEJhc2VOb2RlLCBIVE1MRWxlbWVudD4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBoaW50U3RhY2tDb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIHRyZWVTdG9yZTE6IEVzVG9IdG1sVHJlZVN0b3JlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcHJvZ3JlbUNvZGU6IEVzcHJpbWFQcm9ncmVtQ29kZSxcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXIsXG4gICAgICAgIHByaXZhdGUgX2RvY3VtZW50OiBEb2N1bWVudFxuICAgICkge1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlQ29kZUV4ZWN1dGlvbih0aGlzKTtcbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUdyaWRDaGFuZ2UodGhpcyk7XG4gICAgICAgIC8vdGhpcy5idWlsZEh0bWxUcmVlMigpO1xuICAgICAgICB0aGlzLnRyZWVTdG9yZTEgPSB0aGlzLmJ1aWxkSHRtbFRyZWUzKCk7XG4gICAgfVxuXG4gICAgYXR0YWNoMChlbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hdHRhY2hlZEVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgY29kZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29kZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb2RlQ29udGFpbmVyJyk7XG4gICAgICAgICAgICB0aGlzLmhpbnRTdGFja0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5oaW50U3RhY2tDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGludENvbnRhaW5lcicpO1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjb2RlQ29udGFpbmVyKTtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5oaW50U3RhY2tDb250YWluZXIpO1xuXG4gICAgICAgICAgICB0aGlzLnByb2dyZW1Db2RlTGluZXMubWFwKGVsdCA9PiB7IGNvZGVDb250YWluZXIuYXBwZW5kQ2hpbGQoZWx0KSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGF0dGFjaChlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmF0dGFjaGVkRWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMudHJlZVN0b3JlMS5wYWludEludG8oZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhcjAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29sb3JNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGlmICh0aGlzLmhpbnRTdGFja0NvbnRhaW5lcilcbiAgICAgICAgICAgIHRoaXMuaGludFN0YWNrQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIHRoaXMubWFwcGluZy5mb3JFYWNoKChlbHQsIG5vZGUpID0+IGVsdC5jbGFzc0xpc3QucmVtb3ZlKCdoaWdobGlnaHQnKSk7XG4gICAgfVxuXG4gICAgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29sb3JNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMudHJlZVN0b3JlMS5yZXNldFN0eWxlKCk7XG4gICAgICAgIGlmICh0aGlzLmhpbnRTdGFja0NvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5oaW50U3RhY2tDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY29sb3JNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwKCk7XG5cbiAgICBwcml2YXRlIGhzbENvbG9yKGh1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdoc2woJyArIGh1ZSArICcsIDEwMCUsIDgwJSknO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFzaFN0cmluZ1RvQ29sb3Ioa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHNoaWZ0ID0gMjtcbiAgICAgICAgbGV0IGNvbG9yQ291bnQgPSAxMjtcblxuICAgICAgICB2YXIgaHVlID0gdGhpcy5jb2xvck1hcC5nZXQoa2V5KTtcbiAgICAgICAgaWYgKGh1ZSkgcmV0dXJuIHRoaXMuaHNsQ29sb3IoaHVlKTtcblxuICAgICAgICB2YXIgaGFzaCA9IG1kNUNyZWF0ZSgpLnVwZGF0ZShrZXkpLnRvU3RyaW5nKCk7XG4gICAgICAgIFxuICAgICAgICBodWUgPSAoIHBhcnNlSW50KGhhc2guc3Vic3RyaW5nKHNoaWZ0ICsgMCwgc2hpZnQgKyAxKSwgMTYpICsgMTYgKiBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDEsIHNoaWZ0ICsgMiksIDE2KSArIDI1NiAqIHBhcnNlSW50KGhhc2guc3Vic3RyaW5nKHNoaWZ0ICsgMiwgc2hpZnQgKyAzKSwgMTYpICk7XG4gICAgICAgIGh1ZSA9IE1hdGguZmxvb3IoaHVlICUgY29sb3JDb3VudCkgKiAzNjAgLyBjb2xvckNvdW50O1xuXG4gICAgICAgIHdoaWxlICghdGhpcy5jb2xvck1hcC5nZXQoa2V5KSkge1xuICAgICAgICAgICAgbGV0IGR1cGxpY2F0ZUNvbG9yID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGxldCBjIG9mIHRoaXMuY29sb3JNYXAudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA9PT0gaHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGR1cGxpY2F0ZUNvbG9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaHVlICs9IE1hdGguZmxvb3IoMzYwIC8gY29sb3JDb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZHVwbGljYXRlQ29sb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yTWFwLnNldChrZXksIGh1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vdmFyIHBhc3RlbCA9ICdoc2woJyArIGh1ZSArICcsIDEwMCUsIDg3LjUlKSc7XG4gICAgICAgIHJldHVybiB0aGlzLmhzbENvbG9yKGh1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGZpcmVDb2RlRXhlY3V0aW9uKHN0YXRlOiBQcm9ncmVtU3RhdGUpIHtcbiAgICAgICAgaWYgKHN0YXRlLmNvZGVTdGF0ZW1lbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVjZWl2ZWQgYSBudWxsIHN0YXRlbWVudCAhJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3RoaXMubWFwcGluZy5mb3JFYWNoKChlbHQsIG5vZGUpID0+IGVsdC5jbGFzc0xpc3QucmVtb3ZlKCdoaWdobGlnaHQnKSk7XG4gICAgICAgIHRoaXMudHJlZVN0b3JlMS5yZW1vdmVTdHlsZUNsYXNzZXMoWydoaWdobGlnaHQnXSk7XG5cbiAgICAgICAgbGV0IGV4ZWN1dGVkTm9kZSA9IHN0YXRlLmNvZGVTdGF0ZW1lbnQuYXN0Um9vdE5vZGU7XG4gICAgICAgIC8vbGV0IGh0bWxOb2RlID0gdGhpcy5tYXBwaW5nLmdldChleGVjdXRlZE5vZGUpO1xuICAgICAgICAvL2lmICghaHRtbE5vZGUpIHtcbiAgICAgICAgLy8gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZm91bmQgYSBIVE1MIGVsZW1lbnQgbWFwcGVkIGZvciByZWNlaXZlZCBzdGF0ZW1lbnQgIScpXG4gICAgICAgIC8vfVxuICAgICAgICAvL2h0bWxOb2RlLmNsYXNzTGlzdC5hZGQoJ2hpZ2hsaWdodCcpO1xuICAgICAgICB0aGlzLnRyZWVTdG9yZTEuYWRkU3R5bGVDbGFzc2VzKGV4ZWN1dGVkTm9kZSwgWydoaWdobGlnaHQnXSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGludFN0YWNrQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IEFzdEhlbHBlci5yZWR1Y2VOb2RlVG9WYXJEZWNsYXJhdGlvbihleGVjdXRlZE5vZGUpO1xuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAnVmFyaWFibGVEZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlY2wgPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBkZWNsLmRlY2xhcmF0aW9ucy5tYXAoZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoaW50ID0gdGhpcy5hcHBlbmRIaW50KHRoaXMuaGludFN0YWNrQ29udGFpbmVyLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcoZC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFyVmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5pbml0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyVmFsdWUgPSBzdGF0ZS5ldmFsU2NvcGUuZ2xvYmFsRXZhbChlc2NvZGVHZW5lcmF0ZShkLmluaXQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQuaW5uZXJIVE1MID0gdmFyTmFtZSArICcgPSAnICsgdmFyVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBoaW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IodmFyTmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHBFbHQgPSB0aGlzLm1hcHBpbmcuZ2V0KGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAocEVsdCkgcEVsdC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKHZhck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlU3RvcmUxLnNldFN0eWxlUHJvcGVydHkoZCwgJ2JhY2tncm91bmRDb2xvcicsIHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IodmFyTmFtZSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGVjbCA9IG5vZGUgYXMgQXNzaWdubWVudEV4cHJlc3Npb247XG5cbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGxldCBoaW50ID0gdGhpcy5hcHBlbmRIaW50KHRoaXMuaGludFN0YWNrQ29udGFpbmVyLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YXJOYW1lID0gQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhkZWNsLmxlZnQpO1xuICAgICAgICAgICAgICAgICAgICBoaW50LmlubmVySFRNTCA9IHZhck5hbWUgKyAnID0gJyArIHN0YXRlLmV2YWxTY29wZS5nbG9iYWxFdmFsKHZhck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBoaW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IodmFyTmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgcEVsdCA9IHRoaXMubWFwcGluZy5nZXQoZGVjbCk7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKHBFbHQpIHBFbHQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5oYXNoU3RyaW5nVG9Db2xvcih2YXJOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlU3RvcmUxLnNldFN0eWxlUHJvcGVydHkoZGVjbCwgJ2JhY2tncm91bmRDb2xvcicsIHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IodmFyTmFtZSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZ1bmMgPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgZnVuYy5wYXJhbXMuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YXJOYW1lID0gQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YXJWYWx1ZSA9IHN0YXRlLmV2YWxTY29wZS5nbG9iYWxFdmFsKHZhck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGludCA9IHRoaXMuYXBwZW5kSGludCh0aGlzLmhpbnRTdGFja0NvbnRhaW5lciwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGludC5pbm5lckhUTUwgPSB2YXJOYW1lICsgJyA9ICcgKyB2YXJWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5oYXNoU3RyaW5nVG9Db2xvcih2YXJOYW1lKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgcEVsdCA9IHRoaXMubWFwcGluZy5nZXQocCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChwRWx0KSBwRWx0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IodmFyTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWVTdG9yZTEuc2V0U3R5bGVQcm9wZXJ0eShwLCAnYmFja2dyb3VuZENvbG9yJywgdGhpcy5oYXNoU3RyaW5nVG9Db2xvcih2YXJOYW1lKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHVibGljIGZpcmVHcmlkQ2hhbmdlKHN0YXRlOiBQcm9ncmVtU3RhdGUpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwZW5kQ29kZUxpbmUocGFyZW50OiBIVE1MRWxlbWVudCwgcGFkZGluZzogbnVtYmVyKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgZWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInByZVwiKTtcbiAgICAgICAgZWx0LmNsYXNzTGlzdC5hZGQoJ3BhZGRpbmctJyArIHBhZGRpbmcpO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWx0KTtcblxuICAgICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwZW5kU3BhbihwYXJlbnQ6IEhUTUxFbGVtZW50LCBodG1sQ2xhc3M6IHN0cmluZ1tdLCB0ZXh0ID0gXCJcIik6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGVsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBodG1sQ2xhc3MuZm9yRWFjaChjID0+IGVsdC5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsdCk7XG4gICAgICAgIGVsdC5pbm5lclRleHQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwZW5kSGludChwYXJlbnQ6IEhUTUxFbGVtZW50LCBodG1sQ2xhc3M6IHN0cmluZ1tdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgcHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInByZVwiKTtcbiAgICAgICAgbGV0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgaHRtbENsYXNzLmZvckVhY2goYyA9PiBwcmUuY2xhc3NMaXN0LmFkZChjKSk7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChwcmUpO1xuICAgICAgICBwcmUuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIHJldHVybiBzcGFuO1xuICAgIH1cblxuICAgIC8vIEJ1aWxkIEhUTUwgSW5zcGVjdG9yIGJ5IGNyYXdsaW5nIHJlY3Vyc2l2ZWx5IEFTVCBzdGFja3NcbiAgICBwcml2YXRlIHVuc3RhY2tBc3QocGFyZW50RWxlbWVudDogSFRNTEVsZW1lbnQsIHN0YWNrOiBCYXNlTm9kZVtdLCBwYWRkaW5nOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgc3RhY2suZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgIGlmICghbm9kZSkgdGhyb3cgbmV3IEVycm9yKCdTaG91bGQgbm90IGJlIGFibGUgdG8gc2hpZnQgYSBudWxsIG5vZGUgIScpO1xuXG4gICAgICAgICAgICBsZXQgbGluZSwgc3RhcnRMaW5lOiBIVE1MRWxlbWVudCwgZW5kTGluZSwgbiwgdmFyU3BhbiwgbGVmdFNwYW4sIHJpZ2h0U3BhbjtcbiAgICAgICAgICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHBhcmVudEVsZW1lbnQsIG4uYm9keSwgcGFkZGluZyArIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Z1bmN0aW9uRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBzdGFydExpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KG5vZGUsIHN0YXJ0TGluZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXMuYXBwZW5kU3BhbihzdGFydExpbmUsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gJ2Z1bmN0aW9uICcgKyBuLmlkLm5hbWUgKyAnICggJzsvLyArIGZ1bmMucGFyYW1zLm1hcCh4ID0+IHgubmFtZSkuam9pbignLCAnKSArICcgKSB7JztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuID0gdGhpcy5hcHBlbmRTcGFuKHN0YXJ0TGluZSwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnZnVuY3Rpb24gKCAnOy8vICsgZnVuYy5wYXJhbXMubWFwKHggPT4geC5uYW1lKS5qb2luKCcsICcpICsgJyApIHsnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmFtQ291bnQgPSBuLnBhcmFtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIG4ucGFyYW1zLmZvckVhY2goKHBhcmFtLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcocGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmFwcGVuZFNwYW4oc3RhcnRMaW5lLCBbJ3ZhcklkJ10sIHZhck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChwYXJhbSwgc3Bhbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IHBhcmFtQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmFwcGVuZFNwYW4oc3RhcnRMaW5lLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnLCAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXMuYXBwZW5kU3BhbihzdGFydExpbmUsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgKz0gJyApIHsnO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChwYXJlbnRFbGVtZW50LCBuLmJvZHkuYm9keSwgcGFkZGluZyArIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGVuZExpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBlbmRMaW5lLmlubmVySFRNTCA9ICd9JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdJZlN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIElmU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBzdGFydExpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KG4udGVzdCwgc3RhcnRMaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgLy9zdGFydExpbmUuaW5uZXJIVE1MID0gJ2lmICggPHNwYW4+JyArIEVzY29kZWdlbi5nZW5lcmF0ZShpZnN0bXQudGVzdCkgKyAnPC9zcGFuPiApIHsnO1xuICAgICAgICAgICAgICAgICAgICBzdGFydExpbmUuaW5uZXJIVE1MID0gJ2lmICggJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHN0YXJ0TGluZSwgW24udGVzdF0sIDApO1xuICAgICAgICAgICAgICAgICAgICBzdGFydExpbmUuaW5uZXJIVE1MICs9ICcgKSB7JztcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QocGFyZW50RWxlbWVudCwgW24uY29uc2VxdWVudF0sIHBhZGRpbmcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBtaWRMaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobi5hbHRlcm5hdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pZExpbmUuaW5uZXJIVE1MID0gJ30gZWxzZSB7JztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChwYXJlbnRFbGVtZW50LCBbbi5hbHRlcm5hdGVdLCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGVuZExpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBlbmRMaW5lLmlubmVySFRNTCA9ICd9JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdWYXJpYWJsZURlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQobm9kZSwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUuaW5uZXJIVE1MID0gbi5raW5kICsgJyAnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QobGluZSwgbi5kZWNsYXJhdGlvbnMsIDApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1ZhcmlhYmxlRGVjbGFyYXRvcic6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgdmFyU3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ3ZhcklkJ10pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KG5vZGUsIHZhclNwYW4pO1xuICAgICAgICAgICAgICAgICAgICB2YXJTcGFuLmlubmVySFRNTCA9IEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcobi5pZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuLmluaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbXSwgJyA9ICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluaXRTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsndmFySW5pdCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChpbml0U3BhbiwgW24uaW5pdF0sIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbXSwgJzsnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdBc3NpZ25tZW50RXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuICAgICAgICAgICAgICAgICAgICBsZWZ0U3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ3ZhcklkJ10pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KG5vZGUsIGxlZnRTcGFuKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KGxlZnRTcGFuLCBbbi5sZWZ0XSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbXSwgJyA9ICcpO1xuICAgICAgICAgICAgICAgICAgICByaWdodFNwYW4gPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWyd2YXJJbml0J10pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QocmlnaHRTcGFuLCBbbi5yaWdodF0sIDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgW10sICc7Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnQmluYXJ5RXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIEJpbmFyeUV4cHJlc3Npb247XG4gICAgICAgICAgICAgICAgICAgIGxlZnRTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsnbGVmdEJpbiddKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KGxlZnRTcGFuLCBbbi5sZWZ0XSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbXSwgJyAnICsgbi5vcGVyYXRvciArICcgJyk7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0U3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ3JpZ2h0QmluJ10pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QocmlnaHRTcGFuLCBbbi5yaWdodF0sIDApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0V4cHJlc3Npb25TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBFeHByZXNzaW9uU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChub2RlLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KGxpbmUsIFtuLmV4cHJlc3Npb25dLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdSZXR1cm5TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBSZXR1cm5TdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQobm9kZSwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUuaW5uZXJIVE1MID0gZXNjb2RlR2VuZXJhdGUobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RlZmF1bHQ6Jywgbm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWyduc3ktJyArIG5vZGUudHlwZV0sIGVzY29kZUdlbmVyYXRlKG5vZGUpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChub2RlLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGRIdG1sVHJlZTIoKSB7XG4gICAgICAgIGNvbnN0IGNvZGVSb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGhpcy5wcm9ncmVtQ29kZUxpbmVzLnB1c2goY29kZVJvb3QpO1xuICAgICAgICB0aGlzLnVuc3RhY2tBc3QoY29kZVJvb3QsIFt0aGlzLnByb2dyZW1Db2RlLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKS5hc3RSb290Tm9kZV0sIDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGRIdG1sVHJlZTMoKTogRXNUb0h0bWxUcmVlU3RvcmUge1xuICAgICAgICBjb25zdCBjb2RlUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMucHJvZ3JlbUNvZGVMaW5lcy5wdXNoKGNvZGVSb290KTtcbiAgICAgICAgXG4gICAgICAgIGxldCBmYWN0b3J5ID0gbmV3IENvZGVTcG9vbGVyRXNUb0h0bWxUcmVlTWFwcGVyRmFjdG9yeSh0aGlzLl9kb2N1bWVudCk7XG4gICAgICAgIGxldCB0cmVlU3RvcmUgPSBmYWN0b3J5LmJ1aWxkKHRoaXMucHJvZ3JlbUNvZGUpO1xuXG4gICAgICAgIHRyZWVTdG9yZS5wYWludEludG8oY29kZVJvb3QpO1xuXG4gICAgICAgIHJldHVybiB0cmVlU3RvcmU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZEh0bWxUcmVlKCkge1xuICAgICAgICBjb25zdCBjb2RlUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IHN0YWNrOiBCYXNlTm9kZVtdID0gW3RoaXMucHJvZ3JlbUNvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbigpLmFzdFJvb3ROb2RlXTtcbiAgICAgICAgbGV0IHBhZGRpbmcgPSAwO1xuXG4gICAgICAgIC8vdGhpcy5wcm9ncmVtQ29kZS5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCkuYm9keS5ib2R5Lm1hcChuID0+IHN0YWNrLnB1c2gobikpO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICghbm9kZSkgdGhyb3cgbmV3IEVycm9yKCdTaG91bGQgbm90IGJlIGFibGUgdG8gc2hpZnQgYSBudWxsIG5vZGUgIScpO1xuICAgICAgICAgICAgdmFyIGxpbmU7XG5cbiAgICAgICAgICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2sgPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nKytcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suYm9keS5zbGljZSgwKS5yZXZlcnNlKCkubWFwKHggPT4gc3RhY2sudW5zaGlmdCh4KSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VuZEJsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIGhhY2sgdG8gY2xvc2UgYW4gb3BlbmVkIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmctLTtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUoY29kZVJvb3QsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9ICd9JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIGxldCBmdW5jID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShjb2RlUm9vdCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmdW5jLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9ICdmdW5jdGlvbiAnICsgZnVuYy5pZC5uYW1lICsgJyAoKSB7JzsvLyArIGZ1bmMucGFyYW1zLm1hcCh4ID0+IHgubmFtZSkuam9pbignLCAnKSArICcgKSB7JztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUuaW5uZXJIVE1MID0gJ2Z1bmN0aW9uICgpIHsnOy8vICsgZnVuYy5wYXJhbXMubWFwKHggPT4geC5uYW1lKS5qb2luKCcsICcpICsgJyApIHsnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoeyB0eXBlOiAnRW5kQmxvY2tTdGF0ZW1lbnQnIH0pOyAvLyBIYWNrIHRvIGRlbGF5IGEgYmxvY2sgZW5kXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoZnVuYy5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnSWZTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBsZXQgaWZzdG10ID0gbm9kZSBhcyBJZlN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUoY29kZVJvb3QsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9ICdpZiAoIDxzcGFuPicgKyBlc2NvZGVHZW5lcmF0ZShpZnN0bXQudGVzdCkgKyAnPC9zcGFuPiApIHsnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KGlmc3RtdC50ZXN0LCBsaW5lKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaWZzdG10LmFsdGVybmF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh7IHR5cGU6ICdFbmRCbG9ja1N0YXRlbWVudCcgfSk7IC8vIEhhY2sgdG8gZGVsYXkgYSBibG9jayBlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoaWZzdG10LmFsdGVybmF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh7IHR5cGU6ICdFbHNlQmxvY2tTdGF0ZW1lbnQnIH0pOyAvLyBIYWNrIHRvIGRlbGF5IGFuIGVsc2UgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdChpZnN0bXQuY29uc2VxdWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Vsc2VCbG9ja1N0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBoYWNrIHRvIGNsb3NlIGFuIG9wZW5lZCBibG9ja1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nLS07XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKGNvZGVSb290LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5pbm5lckhUTUwgPSAnfSBlbHNlIHsnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShjb2RlUm9vdCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUudGV4dENvbnRlbnQgPSBlc2NvZGVHZW5lcmF0ZShub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5jbGFzc0xpc3QuYWRkKCdzdGF0ZW1lbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChub2RlLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHN0YWNrLmxlbmd0aCA+IDApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgUHJvZ3JlbUluc3BlY3RvclZpZXcgaW1wbGVtZW50cyBQcm9ncmVtVmlldywgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHRtbEZhY3Rvcnk6IEh0bWxWZXJzZUZhY3Rvcnk8YW55Pikge31cblxuICAgIGJ1aWxkVmlldyhzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXIpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBjb2xvcmVyUHJvZ3JlbUZ1bmMgPSBzY2hlZHVsZXIuZ2V0UHJvZ3JlbSgpLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKTtcbiAgICAgICAgbGV0IGh0bWxDb21wb25lbnQgPSB0aGlzLmh0bWxGYWN0b3J5LmJ1aWxkKGNvbG9yZXJQcm9ncmVtRnVuYyk7XG4gICAgICAgIHJldHVybiBodG1sQ29tcG9uZW50O1xuICAgIH1cbiAgICBcbiAgICBmaXJlQ29kZUV4ZWN1dGlvbihzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBmaXJlR3JpZENoYW5nZShzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG5cbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEJhc2VOb2RlLCBCbG9ja1N0YXRlbWVudCwgRnVuY3Rpb25EZWNsYXJhdGlvbiwgSWZTdGF0ZW1lbnQsIFZhcmlhYmxlRGVjbGFyYXRpb24sIFZhcmlhYmxlRGVjbGFyYXRvciwgQXNzaWdubWVudEV4cHJlc3Npb24sIEJpbmFyeUV4cHJlc3Npb24sIEV4cHJlc3Npb25TdGF0ZW1lbnQsIFJldHVyblN0YXRlbWVudCB9IGZyb20gXCJlc3RyZWVcIjtcbmltcG9ydCB7IEFzdEhlbHBlciB9IGZyb20gXCIuL0FzdEhlbHBlclwiO1xuaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgUHJvZ3JlbUNvZGUgfSBmcm9tIFwiLi9UeXBlc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVzVG9IdG1sVHJlZVN0b3JlIHtcbiAgICBwYWludEludG8oZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkXG4gICAgc3R5bGVDbGFzc2VzKCk6IHN0cmluZ1tdXG4gICAgYWRkU3R5bGVDbGFzc2VzKG5vZGU6IEJhc2VOb2RlLCBjbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWRcbiAgICByZW1vdmVTdHlsZUNsYXNzZXMoY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkXG4gICAgc2V0U3R5bGVQcm9wZXJ0eShub2RlOiBCYXNlTm9kZSwgcHJvcE5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWRcbiAgICByZXNldFN0eWxlKCk6IHZvaWRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFc1RvSHRtbFRyZWVTdG9yZUZhY3Rvcnkge1xuICAgIGJ1aWxkKGNvZGU6IFByb2dyZW1Db2RlPGFueT4pOiBFc1RvSHRtbFRyZWVTdG9yZVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVzVG9IdG1sRmFjdG9yeTxUIGV4dGVuZHMgQmFzZU5vZGU+IHtcbiAgICBidWlsZChub2RlOiBULCBjb250YWluZXI6IEhUTUxFbGVtZW50W10pOiBNYXA8QmFzZU5vZGUsIEhUTUxFbGVtZW50Pjtcbn1cblxuZXhwb3J0IGNsYXNzIEZ1bmN0aW9uRGVjbGFyYXRpb25Ub0h0bWxUcmVlU3RvcmUgaW1wbGVtZW50cyBFc1RvSHRtbFRyZWVTdG9yZSB7XG5cbiAgICBwcml2YXRlIGJhY2tpbmdNYXA6IE1hcDxCYXNlTm9kZSwgSFRNTEVsZW1lbnQ+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgYWRkZWRDbGFzc2VzOiBNYXA8QmFzZU5vZGUsIHN0cmluZ1tdPiA9IG5ldyBNYXAoKTtcbiAgICBwcml2YXRlIGFkZGVkU3R5bGVQcm9wczogTWFwPEJhc2VOb2RlLCBzdHJpbmdbXT4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBjb250YWluZXI6IEhUTUxFbGVtZW50W107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZ1bmM6IEZ1bmN0aW9uRGVjbGFyYXRpb24sIHByaXZhdGUgaHRtbEZhY3Rvcnk6IEVzVG9IdG1sRmFjdG9yeTxGdW5jdGlvbkRlY2xhcmF0aW9uPikge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IFtdO1xuICAgICAgICBsZXQgbWFwcGluZyA9IGh0bWxGYWN0b3J5LmJ1aWxkKGZ1bmMsIHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gbWFwcGluZy5lbnRyaWVzKCk7XG4gICAgICAgIGxldCBlbnRyeSA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgd2hpbGUoIWVudHJ5LmRvbmUpIHtcbiAgICAgICAgICAgIGxldCB2YWwgPSBlbnRyeS52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuYmFja2luZ01hcC5zZXQodmFsWzBdLCB2YWxbMV0pO1xuICAgICAgICAgICAgZW50cnkgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYWludEludG8oZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuZm9yRWFjaChlID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZSk7XG4gICAgICAgIH0pXG4gICAgfSAgICBcbiAgICBcbiAgICBzdHlsZUNsYXNzZXMoKTogc3RyaW5nW10ge1xuICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBsZXQgaXRlcmF0b3IgPSB0aGlzLmJhY2tpbmdNYXAudmFsdWVzKCk7XG4gICAgICAgIGxldCByZXMgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIHdoaWxlKCFyZXMuZG9uZSkge1xuICAgICAgICAgICAgbGV0IGVsdCA9IHJlcy52YWx1ZTtcbiAgICAgICAgICAgIGVsdC5jbGFzc0xpc3QuZm9yRWFjaChjID0+IHJlc3VsdC5wdXNoKGMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgc2V0U3R5bGVQcm9wZXJ0eShub2RlOiBCYXNlTm9kZSwgcHJvcE5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBsZXQgZWx0ID0gdGhpcy5iYWNraW5nTWFwLmdldChub2RlKTtcbiAgICAgICAgaWYgKGVsdCkge1xuICAgICAgICAgICAgZWx0LnN0eWxlLnNldFByb3BlcnR5KHByb3BOYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmFkZGVkU3R5bGVQcm9wcy5zZXQobm9kZSwgW3Byb3BOYW1lLCB2YWx1ZV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkU3R5bGVDbGFzc2VzKG5vZGU6IEJhc2VOb2RlLCBjbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBsZXQgZWx0ID0gdGhpcy5iYWNraW5nTWFwLmdldChub2RlKTtcbiAgICAgICAgaWYgKGVsdCkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgY2xhc3Nlcy5mb3JFYWNoKGMgPT4gZWx0LmNsYXNzTGlzdC5hZGQoYykpO1xuICAgICAgICAgICAgdGhpcy5hZGRlZENsYXNzZXMuc2V0KG5vZGUsIGNsYXNzZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlU3R5bGVDbGFzc2VzKGNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgICAgIC8vIEZJWE1FIGNsZWFuIHRoZSB0aGlzLmFkZGVkQ2xhc3NlcyBtYXBcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gdGhpcy5hZGRlZENsYXNzZXMuZW50cmllcygpO1xuICAgICAgICBsZXQgZW50cnkgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIHdoaWxlKCFlbnRyeS5kb25lKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGVudHJ5LnZhbHVlWzBdO1xuICAgICAgICAgICAgbGV0IGNsYXNzZXMgPSBlbnRyeS52YWx1ZVsxXTtcbiAgICAgICAgICAgIGxldCBlbHQgPSB0aGlzLmJhY2tpbmdNYXAuZ2V0KG5vZGUpO1xuICAgICAgICAgICAgaWYgKGVsdCkge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBjbGFzc2VzLmZvckVhY2goIGMgPT4gZWx0LmNsYXNzTGlzdC5yZW1vdmUoYykpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbnRyeSA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0U3R5bGUoKTogdm9pZCB7XG4gICAgICAgIGxldCBpdGVyYXRvciA9IHRoaXMuYWRkZWRDbGFzc2VzLmVudHJpZXMoKTtcbiAgICAgICAgbGV0IGVudHJ5ID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICB3aGlsZSghZW50cnkuZG9uZSkge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBlbnRyeS52YWx1ZVswXTtcbiAgICAgICAgICAgIGxldCBjbGFzc2VzID0gZW50cnkudmFsdWVbMV07XG4gICAgICAgICAgICBsZXQgZWx0ID0gdGhpcy5iYWNraW5nTWFwLmdldChub2RlKTtcbiAgICAgICAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5mb3JFYWNoKCBjID0+IGVsdC5jbGFzc0xpc3QucmVtb3ZlKGMpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW50cnkgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZGVkU3R5bGVQcm9wcy5lbnRyaWVzKCk7XG4gICAgICAgIGVudHJ5ID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICB3aGlsZSghZW50cnkuZG9uZSkge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBlbnRyeS52YWx1ZVswXTtcbiAgICAgICAgICAgIGxldCBwcm9wTmFtZSA9IGVudHJ5LnZhbHVlWzFdWzBdO1xuICAgICAgICAgICAgbGV0IGVsdCA9IHRoaXMuYmFja2luZ01hcC5nZXQobm9kZSk7XG4gICAgICAgICAgICBpZiAoZWx0KSB7XG4gICAgICAgICAgICAgICAgZWx0LnN0eWxlLnJlbW92ZVByb3BlcnR5KHByb3BOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVudHJ5ID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBGdW5jdGlvblNwb29sZXJFc1RvSHRtbEZhY3RvcnkgaW1wbGVtZW50cyBFc1RvSHRtbEZhY3Rvcnk8RnVuY3Rpb25EZWNsYXJhdGlvbj4ge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50KSB7fVxuXG4gICAgcHJpdmF0ZSBhcHBlbmRDb2RlTGluZShwYXJlbnQ6IEhUTUxFbGVtZW50LCBwYWRkaW5nOiBudW1iZXIpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBlbHQgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicHJlXCIpO1xuICAgICAgICBlbHQuY2xhc3NMaXN0LmFkZCgncGFkZGluZy0nICsgcGFkZGluZyk7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbHQpO1xuXG4gICAgICAgIHJldHVybiBlbHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBlbmRTcGFuKHBhcmVudDogSFRNTEVsZW1lbnQsIGh0bWxDbGFzczogc3RyaW5nW10sIHRleHQgPSBcIlwiKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgZWx0ID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGh0bWxDbGFzcy5mb3JFYWNoKGMgPT4gZWx0LmNsYXNzTGlzdC5hZGQoYykpO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWx0KTtcbiAgICAgICAgZWx0LmlubmVyVGV4dCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBlbHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBlbmRIaW50KHBhcmVudDogSFRNTEVsZW1lbnQsIGh0bWxDbGFzczogc3RyaW5nW10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBwcmUgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicHJlXCIpO1xuICAgICAgICBsZXQgc3BhbiA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBodG1sQ2xhc3MuZm9yRWFjaChjID0+IHByZS5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHByZSk7XG4gICAgICAgIHByZS5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgcmV0dXJuIHNwYW47XG4gICAgfVxuXG4gICAgLy8gQnVpbGQgSFRNTCBJbnNwZWN0b3IgYnkgY3Jhd2xpbmcgcmVjdXJzaXZlbHkgQVNUIHN0YWNrc1xuICAgIHByaXZhdGUgdW5zdGFja0FzdChwYXJlbnRFbGVtZW50OiBIVE1MRWxlbWVudCwgc3RhY2s6IEJhc2VOb2RlW10sIG1hcHBpbmc6IE1hcDxCYXNlTm9kZSwgSFRNTEVsZW1lbnQ+LCBwYWRkaW5nOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgc3RhY2suZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgIGlmICghbm9kZSkgdGhyb3cgbmV3IEVycm9yKCdTaG91bGQgbm90IGJlIGFibGUgdG8gc2hpZnQgYSBudWxsIG5vZGUgIScpO1xuXG4gICAgICAgICAgICBsZXQgbGluZSwgc3RhcnRMaW5lOiBIVE1MRWxlbWVudCwgZW5kTGluZSwgbiwgdmFyU3BhbiwgbGVmdFNwYW4sIHJpZ2h0U3BhbjtcbiAgICAgICAgICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHBhcmVudEVsZW1lbnQsIG4uYm9keSwgbWFwcGluZywgcGFkZGluZyArIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Z1bmN0aW9uRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBzdGFydExpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBtYXBwaW5nLnNldChub2RlLCBzdGFydExpbmUpO1xuICAgICAgICAgICAgICAgICAgICAvL21hcHBpbmcuc2V0KG5vZGUsIHBhcmVudEVsZW1lbnQpOyAvLyBIYWNrOiBtYXAgdGhlIGZ1bmN0aW9uIGNvbnRhaW5lciB0byB0aGUgY29udGFpbmVyIG9mIHRoZSBmdW5jdGlvbiBcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4uaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuID0gdGhpcy5hcHBlbmRTcGFuKHN0YXJ0TGluZSwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnZnVuY3Rpb24gJyArIG4uaWQubmFtZSArICcgKCAnOy8vICsgZnVuYy5wYXJhbXMubWFwKHggPT4geC5uYW1lKS5qb2luKCcsICcpICsgJyApIHsnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmFwcGVuZFNwYW4oc3RhcnRMaW5lLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9ICdmdW5jdGlvbiAoICc7Ly8gKyBmdW5jLnBhcmFtcy5tYXAoeCA9PiB4Lm5hbWUpLmpvaW4oJywgJykgKyAnICkgeyc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFyYW1Db3VudCA9IG4ucGFyYW1zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgbi5wYXJhbXMuZm9yRWFjaCgocGFyYW0sIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YXJOYW1lID0gQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhwYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXMuYXBwZW5kU3BhbihzdGFydExpbmUsIFsndmFySWQnXSwgdmFyTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBwaW5nLnNldChwYXJhbSwgc3Bhbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IHBhcmFtQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmFwcGVuZFNwYW4oc3RhcnRMaW5lLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnLCAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXMuYXBwZW5kU3BhbihzdGFydExpbmUsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgKz0gJyApIHsnO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChwYXJlbnRFbGVtZW50LCBuLmJvZHkuYm9keSwgbWFwcGluZywgcGFkZGluZyArIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGVuZExpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBlbmRMaW5lLmlubmVySFRNTCA9ICd9JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdJZlN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIElmU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBzdGFydExpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBtYXBwaW5nLnNldChuLnRlc3QsIHN0YXJ0TGluZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vc3RhcnRMaW5lLmlubmVySFRNTCA9ICdpZiAoIDxzcGFuPicgKyBFc2NvZGVnZW4uZ2VuZXJhdGUoaWZzdG10LnRlc3QpICsgJzwvc3Bhbj4gKSB7JztcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMaW5lLmlubmVySFRNTCA9ICdpZiAoICc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChzdGFydExpbmUsIFtuLnRlc3RdLCBtYXBwaW5nLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMaW5lLmlubmVySFRNTCArPSAnICkgeyc7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHBhcmVudEVsZW1lbnQsIFtuLmNvbnNlcXVlbnRdLCBtYXBwaW5nLCBwYWRkaW5nKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbWlkTGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG4uYWx0ZXJuYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaWRMaW5lLmlubmVySFRNTCA9ICd9IGVsc2Ugeyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QocGFyZW50RWxlbWVudCwgW24uYWx0ZXJuYXRlXSwgbWFwcGluZywgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlbmRMaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgZW5kTGluZS5pbm5lckhUTUwgPSAnfSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnVmFyaWFibGVEZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBtYXBwaW5nLnNldChub2RlLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5pbm5lckhUTUwgPSBuLmtpbmQgKyAnICc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChsaW5lLCBuLmRlY2xhcmF0aW9ucywgbWFwcGluZywgMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnVmFyaWFibGVEZWNsYXJhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICB2YXJTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsndmFySWQnXSk7XG4gICAgICAgICAgICAgICAgICAgIG1hcHBpbmcuc2V0KG5vZGUsIHZhclNwYW4pO1xuICAgICAgICAgICAgICAgICAgICB2YXJTcGFuLmlubmVySFRNTCA9IEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcobi5pZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuLmluaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbXSwgJyA9ICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluaXRTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsndmFySW5pdCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChpbml0U3BhbiwgW24uaW5pdF0sIG1hcHBpbmcsIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbXSwgJzsnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdBc3NpZ25tZW50RXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuICAgICAgICAgICAgICAgICAgICBsZWZ0U3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ3ZhcklkJ10pO1xuICAgICAgICAgICAgICAgICAgICBtYXBwaW5nLnNldChub2RlLCBsZWZ0U3Bhbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChsZWZ0U3BhbiwgW24ubGVmdF0sIG1hcHBpbmcsIDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgW10sICcgPSAnKTtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsndmFySW5pdCddKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHJpZ2h0U3BhbiwgW24ucmlnaHRdLCBtYXBwaW5nLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFtdLCAnOycpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0JpbmFyeUV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBCaW5hcnlFeHByZXNzaW9uO1xuICAgICAgICAgICAgICAgICAgICBsZWZ0U3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ2xlZnRCaW4nXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChsZWZ0U3BhbiwgW24ubGVmdF0sIG1hcHBpbmcsIDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgW10sICcgJyArIG4ub3BlcmF0b3IgKyAnICcpO1xuICAgICAgICAgICAgICAgICAgICByaWdodFNwYW4gPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWydyaWdodEJpbiddKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHJpZ2h0U3BhbiwgW24ucmlnaHRdLCBtYXBwaW5nLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdFeHByZXNzaW9uU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgRXhwcmVzc2lvblN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIG1hcHBpbmcuc2V0KG5vZGUsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QobGluZSwgW24uZXhwcmVzc2lvbl0sIG1hcHBpbmcsIDApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1JldHVyblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIFJldHVyblN0YXRlbWVudFxuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwcGluZy5zZXQobm9kZSwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUuaW5uZXJIVE1MID0gZXNjb2RlR2VuZXJhdGUobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnZGVmYXVsdDonLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ25zeS0nICsgbm9kZS50eXBlXSwgZXNjb2RlR2VuZXJhdGUobm9kZSkpO1xuICAgICAgICAgICAgICAgICAgICBtYXBwaW5nLnNldChub2RlLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJ1aWxkKG5vZGU6IEZ1bmN0aW9uRGVjbGFyYXRpb24sIGNvbnRhaW5lcjogSFRNTEVsZW1lbnRbXSk6IE1hcDxCYXNlTm9kZSwgSFRNTEVsZW1lbnQ+IHtcbiAgICAgICAgY29uc3QgY29kZVJvb3QgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IG1hcHBpbmcgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMudW5zdGFja0FzdChjb2RlUm9vdCwgW25vZGVdLCBtYXBwaW5nLCAwKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnbWFwcGluZzonLCBtYXBwaW5nKTtcbiAgICAgICAgbGV0IGNoaWxkSXQgPSBjb2RlUm9vdC5jaGlsZHJlbjtcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBjaGlsZEl0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb250YWluZXIucHVzaCg8SFRNTEVsZW1lbnQ+IGNoaWxkSXRbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXBwaW5nO1xuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGNsYXNzIENvZGVTcG9vbGVyRXNUb0h0bWxUcmVlTWFwcGVyRmFjdG9yeSBpbXBsZW1lbnRzIEVzVG9IdG1sVHJlZVN0b3JlRmFjdG9yeSB7XG4gICAgXG4gICAgcHJpdmF0ZSBodG1sRmFjdG9yeTogRXNUb0h0bWxGYWN0b3J5PGFueT47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kb2N1bWVudDogRG9jdW1lbnQpIHtcbiAgICAgICAgdGhpcy5odG1sRmFjdG9yeSA9IG5ldyBGdW5jdGlvblNwb29sZXJFc1RvSHRtbEZhY3RvcnkoX2RvY3VtZW50KTtcbiAgICB9XG5cbiAgICBidWlsZChjb2RlOiBQcm9ncmVtQ29kZTxhbnk+KTogRXNUb0h0bWxUcmVlU3RvcmUge1xuICAgICAgICBsZXQgc3RvcmUgPSBuZXcgRnVuY3Rpb25EZWNsYXJhdGlvblRvSHRtbFRyZWVTdG9yZShjb2RlLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKS5hc3RSb290Tm9kZSwgdGhpcy5odG1sRmFjdG9yeSk7XG4gICAgICAgIHJldHVybiBzdG9yZTtcbiAgICB9XG4gICAgXG59IiwiaW1wb3J0IHsgU3R5bGVEZWNvcmF0b3IgfSBmcm9tIFwiLi9UeXBlc1wiO1xuaW1wb3J0IHsgQmFzZU5vZGUgfSBmcm9tIFwiZXN0cmVlXCI7XG5cbmV4cG9ydCBjbGFzcyBDb2xvclZlcnNlVmFyaWFibGVEZWNvcmF0b3IgaW1wbGVtZW50cyBTdHlsZURlY29yYXRvcjxCYXNlTm9kZT4ge1xuXG4gICAgcHJpdmF0ZSB2YXJpYWJsZUNvdW50ZXI6IG51bWJlciA9IDA7XG5cbiAgICBkZWNvcmF0ZShub2RlOiBCYXNlTm9kZSwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gICAgfSAgICBcbiAgICBcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBQYWRWZXJzZURlY29yYXRvciBpbXBsZW1lbnRzIFN0eWxlRGVjb3JhdG9yPEJhc2VOb2RlPiB7XG5cbiAgICBkZWNvcmF0ZShub2RlOiBCYXNlTm9kZSwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb2RlLXBhZGRpbmcnKVxuICAgICAgICB9XG4gICAgfSAgICBcbiAgICBcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgLmNvZGUtcGFkZGluZyB7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMTZweDtcbiAgICAgICAgfVxuICAgICAgICBgO1xuICAgIH1cblxufVxuIiwiXG5pbXBvcnQgeyBQcm9ncmFtLCBwYXJzZU1vZHVsZSB9IGZyb20gJ2VzcHJpbWEnO1xuaW1wb3J0IHsgd2FsayBhcyBlc3ByaW1hV2FsayB9IGZyb20gJ2VzcHJpbWEtd2Fsayc7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBCYXNlTm9kZSwgRnVuY3Rpb25EZWNsYXJhdGlvbiwgQmxvY2tTdGF0ZW1lbnQsIElmU3RhdGVtZW50LCBSZXR1cm5TdGF0ZW1lbnQsIFN0YXRlbWVudCB9IGZyb20gJ2VzdHJlZSc7XG5pbXBvcnQgeyBQcm9ncmVtU3RhdGUgfSBmcm9tICcuL1NjaGVkdWxpbmdTZXJ2aWNlJztcbmltcG9ydCB7IFZlcnNlSW5zdHJ1Y3Rpb25GYWN0b3J5LCBQcm9ncmVtQ29kZUZhY3RvcnksIFByb2dyZW1Db2RlIH0gZnJvbSAnLi9UeXBlcyc7XG5pbXBvcnQgeyBFc3ByaW1hVmVyc2VJdGVyYW9yLCBFc3ByaW1hVmVyc2VJbnN0cnVjdGlvbiB9IGZyb20gJy4vRXNwcmltYVR5cGVzJztcbi8qXG5leHBvcnQgY2xhc3MgQ29kZVN0YXRlbWVudCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBub2RlOiBCYXNlTm9kZSxcbiAgICAgICAgLy9wdWJsaWMgY29kZTogc3RyaW5nXG4gICAgKSB7fTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2RlU3RhdGVtZW50RmFjdG9yeTxUPiB7XG4gICAgYnVpbGQocGFyYW06IFQpOiBDb2RlU3RhdGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvZGVJdGVyYXRvciB7XG4gICAgZXhlY3V0ZU5leHQoKTogQ29kZVN0YXRlbWVudDtcbiAgICBoYXNOZXh0KCk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbUNvZGUge1xuICAgIGluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCk6IEZ1bmN0aW9uRGVjbGFyYXRpb25cbiAgICBjb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk6IEZ1bmN0aW9uRGVjbGFyYXRpb25cbiAgICBpdGVyYXRvcihzdGF0ZTogUHJvZ3JlbVN0YXRlKTogQ29kZUl0ZXJhdG9yO1xufVxuXG5jbGFzcyBFc3ByaW1hQ29kZVN0YXRlbWVudEZhY3RvcnkgaW1wbGVtZW50cyBWZXJzZUluc3RydWN0aW9uRmFjdG9yeTxCYXNlTm9kZT4ge1xuXG4gICAgYnVpbGQocGFyYW06IEJhc2VOb2RlKTogRXNwcmltYVZlcnNlSW5zdHJ1Y3Rpb24ge1xuICAgICAgICBpZiAocGFyYW0pIFxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFc3ByaW1hVmVyc2VJbnN0cnVjdGlvbihwYXJhbSk7XG4gICAgICAgIFxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBidWlsZCBub24gc3RhdGVtZW50IGNvZGUgIScpO1xuICAgIH1cbn1cbiovXG5cbmNsYXNzIEJhc2ljRXNwcmltYUNvZGVJdGVyYXRvciBpbXBsZW1lbnRzIEVzcHJpbWFWZXJzZUl0ZXJhb3Ige1xuXG4gICAgcHJpdmF0ZSBzdGFjazogQmFzZU5vZGVbXSA9IFtdO1xuICAgIHByaXZhdGUgcmV0dXJuVmFsdWU6IGFueSA9IG51bGw7XG4gICAgcHJpdmF0ZSBmaW5pc2hlZCA9IGZhbHNlXG4gICAgcHJpdmF0ZSB2ZXJzZUZhY3RvcnkgPSBuZXcgRXNwcmltYVZlcnNlSW5zdHJ1Y3Rpb25GYWN0b3J5KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgICAgIHByaXZhdGUgcm9vdE5vZGU6IEJhc2VOb2RlLCBcbiAgICAgICAgICAgIHByaXZhdGUgc3RhdGU6IFByb2dyZW1TdGF0ZSkge1xuICAgICAgICB0aGlzLnN0YWNrLnB1c2gocm9vdE5vZGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVjbGFyZVByb2dyZW1Bcmd1bWVudHMoKSB7XG4gICAgICAgIGxldCBfY29sb25uZSA9IHRoaXMuc3RhdGUuY29sb25uZTtcbiAgICAgICAgbGV0IF9saWduZSA9IHRoaXMuc3RhdGUubGlnbmU7XG4gICAgICAgIGxldCBfY29udGV4dGUgPSB0aGlzLnN0YXRlLmNvbnRleHRlO1xuXG4gICAgICAgIHRoaXMuc3RhdGUuZXZhbCgndmFyIGNvbG9ubmUgPSAnICsgX2NvbG9ubmUgKyAnLCBsaWduZSA9ICcgKyBfbGlnbmUgKyAnOycpO1xuICAgICAgICB0aGlzLnN0YXRlLmV2YWwoJ3ZhciBjb250ZXh0ZSA9ICcgKyBKU09OLnN0cmluZ2lmeShfY29udGV4dGUpKTtcbiAgICB9XG5cbiAgICBleGVjdXRlTmV4dCgpOiBFc3ByaW1hVmVyc2VJbnN0cnVjdGlvbiB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgZmlyc3Qgbm9kZSBvbiB0aGUgc3RhY2tcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5zdGFjay5zaGlmdCgpO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdOb2RlOicsIG5vZGUpO1xuXG4gICAgICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0YWNrIHNob3VsZCBub3QgYmUgZW1wdHkgIScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3RtdDtcblxuICAgICAgICAgICAgc3dpdGNoKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Z1bmN0aW9uRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KGZ1bmMuYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjbGFyZVByb2dyZW1Bcmd1bWVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmVyc2VGYWN0b3J5LmJ1aWxkKGZ1bmMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Jsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suYm9keS5zbGljZSgpLnJldmVyc2UoKS5tYXAoeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdCbG9ja1N0YXRlbWVudCB1bnNoaWZ0aW5nOicsIHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KHgpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0lmU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgc3RtdCA9IG5vZGUgYXMgSWZTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0Q29kZSA9IGVzY29kZUdlbmVyYXRlKHN0bXQudGVzdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3RSZXN1bHQgPSB0aGlzLnN0YXRlLmV2YWwodGVzdENvZGUpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdJZlN0YXRlbWVudCB0ZXN0IGV2YWx1YXRlIHRvOiAnLCB0ZXN0UmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlc3RSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ1RoZW4gdW5zaGlmdGluZzonLCBzdG10LmNvbnNlcXVlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KHN0bXQuY29uc2VxdWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RtdC5hbHRlcm5hdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdFbHNlIHVuc2hpZnRpbmc6Jywgc3RtdC5hbHRlcm5hdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdChzdG10LmFsdGVybmF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52ZXJzZUZhY3RvcnkuYnVpbGQoc3RtdC50ZXN0KTtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1JldHVyblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIHN0bXQgPSBub2RlIGFzIFJldHVyblN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXR1cm5WYWx1ZSA9IHRoaXMuc3RhdGUuZXZhbChlc2NvZGVHZW5lcmF0ZShzdG10LmFyZ3VtZW50KSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52ZXJzZUZhY3RvcnkuYnVpbGQoc3RtdCk7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdOb2RlOicsIG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29kZSA9IGVzY29kZUdlbmVyYXRlKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdHZW5lcmF0ZWQgY29kZTonLCBjb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGV2YWxSZXN1bHQgPSB0aGlzLnN0YXRlLmV2YWwoY29kZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0V2YWx1YXRlIHRvOicsIGV2YWxSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52ZXJzZUZhY3RvcnkuYnVpbGQobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuc3RhY2subGVuZ3RoID4gMCk7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJdGVyYXRvciBoYXMgbm8gbW9yZSBjb2RlIHRvIGV4ZWN1dGUgIScpO1xuICAgIH0gICAgXG4gICAgXG4gICAgaGFzTmV4dCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuZmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBub2RlcyA9IHRoaXMuc3RhY2suc2xpY2UoMCk7XG4gICAgICAgIHdoaWxlIChub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5vZGVzLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLnR5cGUgIT09ICdCbG9ja1N0YXRlbWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrczogQmxvY2tTdGF0ZW1lbnRbXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2sgPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBibG9ja3MucHVzaChibG9jayk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhcnNvdXJzIHJlY3Vyc2l2ZW1lbnQgbGVzIGJsb2NrcyDDoCBsYSByZWNoZXJjaGUgZGUgbm9ldWQgcXVpIG5lIHNvbnQgcGFzIGRlcyBibG9ja3NcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhhc05leHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFoYXNOZXh0ICYmIGJsb2Nrcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYiA9IGJsb2Nrcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiLmJvZHkubWFwKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeC50eXBlICE9PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNOZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhc05leHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBjbGFzcyBFc3ByaW1hUHJvZ3JlbUNvZGUgaW1wbGVtZW50cyBQcm9ncmVtQ29kZTxCYXNlTm9kZT4ge1xuXG4gICAgcHJpdmF0ZSBlc3ByaW1hUHJvZ3JhbTogUHJvZ3JhbTtcbiAgICBwcml2YXRlIHZlcnNlRmFjdG9yeSA9IG5ldyBFc3ByaW1hVmVyc2VJbnN0cnVjdGlvbkZhY3RvcnkoKTtcblxuICAgIGNvbnN0cnVjdG9yKGNvZGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmVzcHJpbWFQcm9ncmFtID0gcGFyc2VNb2R1bGUoY29kZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCk6IEVzcHJpbWFWZXJzZUluc3RydWN0aW9uIHtcbiAgICAgICAgdmFyIHJlc3VsdDogRnVuY3Rpb25EZWNsYXJhdGlvbiB8IG51bGwgPSBudWxsO1xuICAgICAgICBlc3ByaW1hV2Fsayh0aGlzLmVzcHJpbWFQcm9ncmFtLCBub2RlID0+IHtcbiAgICAgICAgICAgIGlmKCBub2RlLnR5cGUgPT09ICdGdW5jdGlvbkRlY2xhcmF0aW9uJyAmJiBub2RlLmlkICYmIG5vZGUuaWQubmFtZSA9PT0gJ2luaXRpYWxpc2VyUHJvZ3JlbScgKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSApO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52ZXJzZUZhY3RvcnkuYnVpbGQocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcG9zc2libGUgZGUgdHJvdXZlciB1bmUgZm9uY3Rpb24gY29sb3JlclByb2dyZW0oKSAhJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKTogRXNwcmltYVZlcnNlSW5zdHJ1Y3Rpb24ge1xuICAgICAgICB2YXIgcmVzdWx0OiBGdW5jdGlvbkRlY2xhcmF0aW9uIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIGVzcHJpbWFXYWxrKHRoaXMuZXNwcmltYVByb2dyYW0sIG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYoIG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nICYmIG5vZGUuaWQgJiYgbm9kZS5pZC5uYW1lID09PSAnY29sb3JlclByb2dyZW0nICkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gKTtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmVyc2VGYWN0b3J5LmJ1aWxkKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBvc3NpYmxlIGRlIHRyb3V2ZXIgdW5lIGZvbmN0aW9uIGNvbG9yZXJQcm9ncmVtKCkgIScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpdGVyYXRvcihzdGF0ZTogUHJvZ3JlbVN0YXRlKTogRXNwcmltYVZlcnNlSXRlcmFvciB7XG4gICAgICAgIHJldHVybiBuZXcgQmFzaWNFc3ByaW1hQ29kZUl0ZXJhdG9yKHRoaXMuY29sb3JlclByb2dyZW1GdW5jdGlvbigpLmFzdFJvb3ROb2RlLCBzdGF0ZSk7XG4gICAgfVxufVxuXG5jbGFzcyBFc3ByaW1hUHJvZ3JlbUNvZGVGYWN0b3J5IGltcGxlbWVudHMgUHJvZ3JlbUNvZGVGYWN0b3J5PEJhc2VOb2RlPiB7XG4gICAgcHVibGljIGJ1aWxkKGNvZGU6IHN0cmluZyk6IFByb2dyZW1Db2RlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IEVzcHJpbWFQcm9ncmVtQ29kZShjb2RlKTtcbiAgICB9XG59XG5cbmNsYXNzIEVzcHJpbWFWZXJzZUluc3RydWN0aW9uRmFjdG9yeSBpbXBsZW1lbnRzIFZlcnNlSW5zdHJ1Y3Rpb25GYWN0b3J5PEJhc2VOb2RlPiB7XG4gICAgXG4gICAgYnVpbGQocGFyYW06IEJhc2VOb2RlKTogRXNwcmltYVZlcnNlSW5zdHJ1Y3Rpb24ge1xuICAgICAgICBpZiAoIXBhcmFtKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcG9zc2libGUgdG8gYnVpbGQgZW1wdHkgVmVyc2UgIScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhc3RSb290Tm9kZTogcGFyYW1cbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQgbmFtZXNwYWNlIENvZGVTZXJ2aWNlIHtcblxuICAgIGV4cG9ydCBjb25zdCBwcm9ncmVtQ29kZUZhY3Rvcnk6IFByb2dyZW1Db2RlRmFjdG9yeTxhbnk+ID0gbmV3IEVzcHJpbWFQcm9ncmVtQ29kZUZhY3RvcnkoKTtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBsb2FkUHJvZ3JlbShmaWxlVXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2xpZW50ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICBjbGllbnQub3BlbignR0VUJywgZmlsZVVybCk7XG4gICAgICAgICAgICBjbGllbnQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb2RlID0gY2xpZW50LnJlc3BvbnNlVGV4dDtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb2RlU2VydmljZTogUHJvZ3JlbSBsb2FkZWQgc3VjY2Vzc2Z1bGx5LicsIGNvZGUpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoY29kZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2xpZW50Lm9uZXJyb3IgPSAoKSA9PiByZWplY3QoY2xpZW50LnN0YXR1c1RleHQpO1xuICAgICAgICAgICAgY2xpZW50LnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59Il0sInNvdXJjZVJvb3QiOiIifQ==