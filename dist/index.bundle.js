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
        //console.log('Building node', node, '...');
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
        let ifStartText = ['if ( ', test, ' ) {'];
        let ifStart = HtmlHelper_1.HtmlHelper.span('statement if-statement-start', ifStartText);
        content.push(ifStart);
        let thenBlock = this.buildNode(n.consequent);
        let ifThen = HtmlHelper_1.HtmlHelper.span('statement if-block-then', thenBlock);
        content.push(ifThen);
        if (n.alternate) {
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
        let container = HtmlHelper_1.HtmlHelper.span('declaration variable-declaration');
        container.innerHTML = n.kind + ' ';
        declarations.forEach(d => container.appendChild(d));
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
        let operatorPart = HtmlHelper_1.HtmlHelper.span('expression-operator', ' ' + n.operator + ' ');
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
const HtmlHelper_1 = __webpack_require__(/*! ./HtmlHelper */ "l2U1");
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
                new EstreeStyleDecorator_1.PadVerseDecorator(),
                new EstreeStyleDecorator_1.ColorVerseVariableDecorator()
            ]);
            let progremInspectorFactory = new EstreeProgremInspectorHtmlFactory_1.EstreeProgremInspectorHtmlFactory(progremInspectorDecorators);
            let progremInspectorView = new ProgremInspector_1.ProgremInspectorView(progremInspectorFactory);
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
        }
        else if (Array.isArray(content)) {
            content.forEach(c => {
                if (typeof c === 'string') {
                    elt.innerHTML += c;
                }
                else {
                    elt.appendChild(c);
                }
            });
        }
        else if (content) {
            elt.appendChild(content);
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
const AstHelper_1 = __webpack_require__(/*! ./AstHelper */ "8yvk");
const js_md5_1 = __webpack_require__(/*! js-md5 */ "gjeX");
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
            element.classList.add('variable-' + varIndex);
        }
    }
    buildStyleSheet() {
        let style = '';
        //console.log('variable count:', this.variableMap.size);
        this.variableMap.forEach((index, id) => {
            let color = this.hashStringToColor(id, this.variableMap.size);
            //console.log('building color #', id, '=>', color);
            style += `
                .variable-${index} .variable-id, .func-start .variable-${index} {
                    background-color: ${color};
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
    }
    buildStyleSheet() {
        return `
        .code-padding {
            margin-left: 32px;
        }

        .block {
            display: block;
        }

        .statement, .declaration {
            display: block;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb2dyZW1HcmlkLnRzIiwid2VicGFjazovLy8uL3NyYy9FdmFsU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQXN0SGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9Fc3RyZWVQcm9ncmVtSW5zcGVjdG9ySHRtbEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1R5cGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9Qcm9ncmVtU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2NyZWVuU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvSHRtbEhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2NoZWR1bGluZ1NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb2dyZW1JbnNwZWN0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0h0bWxUcmVlLnRzIiwid2VicGFjazovLy8uL3NyYy9Fc3RyZWVTdHlsZURlY29yYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29kZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLDZFQUFpRTtBQUNqRSwyRUFBK0M7QUFFL0MsSUFBSSxZQUFZLEdBQUcsSUFBSSw0QkFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3hDLElBQUksYUFBYSxHQUFHLElBQUksOEJBQWEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRWpELCtCQUFjLENBQUMsWUFBWSxDQUFDLDZCQUE2QixFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0d4RixNQUFhLHNCQUFzQjtJQU0vQixZQUNZLFlBQTBCLEVBQzFCLGFBQTRCO1FBRDVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBTmhD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QUFYLG1CQUFXLFFBbUIzQiIsImZpbGUiOiJpbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9ncmVtU2VydmljZSwgUHJvZ3JlbUNvbmZpZyB9IGZyb20gXCIuL1Byb2dyZW1TZXJ2aWNlXCI7XG5pbXBvcnQgeyBTY3JlZW5Db25maWcgfSBmcm9tIFwiLi9TY3JlZW5TZXJ2aWNlXCI7XG5cbmxldCBzY3JlZW5Db25maWcgPSBuZXcgU2NyZWVuQ29uZmlnKDIwKTtcbmxldCBwcm9ncmVtQ29uZmlnID0gbmV3IFByb2dyZW1Db25maWcoMTcsIDE3LCAxKTtcblxuUHJvZ3JlbVNlcnZpY2UuYnVpbGRQcm9ncmVtKCcuL3Byb2dyZW1zL2NvZXVyX3Byb2dyZW0uanMnLCBzY3JlZW5Db25maWcsIHByb2dyZW1Db25maWcpOyIsImltcG9ydCB7IEdyaWRDaGFuZ2VMaXN0ZW5lciwgUHJvZ3JlbVN0YXRlIH0gZnJvbSBcIi4vU2NoZWR1bGluZ1NlcnZpY2VcIjtcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gXCIuL1NjcmVlblNlcnZpY2VcIjtcbmltcG9ydCB7IFByb2dyZW1Db25maWcgfSBmcm9tIFwiLi9Qcm9ncmVtU2VydmljZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1HcmlkIHtcbiAgICBjbGVhcigpOiB2b2lkO1xuICAgIGF0dGFjaChlbGVtZW50OiBFbGVtZW50IHwgbnVsbCk6IHZvaWRcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljQ2FudmFzUHJvZ3JlbUdyaWQgaW1wbGVtZW50cyBQcm9ncmVtR3JpZCwgR3JpZENoYW5nZUxpc3RlbmVyIHtcbiAgICBcbiAgICBwcml2YXRlIGF0dGFjaGVkRWxlbWVudDogRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2NyZWVuQ29uZmlnOiBTY3JlZW5Db25maWcsIFxuICAgICAgICBwcml2YXRlIHByb2dyZW1Db25maWc6IFByb2dyZW1Db25maWdcbiAgICAgICAgKSB7XG4gICAgICAgIGxldCBlbHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZ3JlbScpO1xuICAgICAgICBpZiAoIWVsdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZmluZCAucHJvZ3JlbSBDYW52YXMgZWxlbWVudCAhJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYW52YXMgPSBlbHQgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5cbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmICghY3R4KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBnZXQgMkQgQ2FudmFzIGNvbnRleHQgIScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXR0YWNoVG9DYW52YXMoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgY2FudmFzLndpZHRoID0gdGhpcy5wcm9ncmVtQ29uZmlnLmNvbG9ubmVzICogdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMucHJvZ3JlbUNvbmZpZy5jb2xvbm5lcyAqIHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG5cbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmICghY3R4KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBnZXQgMkQgQ2FudmFzIGNvbnRleHQgIScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIH1cblxuICAgIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICBsZXQgd2lkdGggPSB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplICogdGhpcy5wcm9ncmVtQ29uZmlnLmNvbG9ubmVzO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZSAqIHRoaXMucHJvZ3JlbUNvbmZpZy5saWduZXM7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBhdHRhY2goZWxlbWVudDogRWxlbWVudCB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hdHRhY2hlZEVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgPT09ICdDQU5WQVMnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2hUb0NhbnZhcyhlbGVtZW50IGFzIEhUTUxDYW52YXNFbGVtZW50KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYy5ub2RlTmFtZSA9PT0gJ0NBTlZBUycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoVG9DYW52YXMoZWxlbWVudCBhcyBIVE1MQ2FudmFzRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTm8gQ2FudmFzIGZvdW5kIHNvIHdlIGNyZWF0ZSBvbmVcbiAgICAgICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2hUb0NhbnZhcyhjYW52YXMpO1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjYW52YXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZpcmVHcmlkQ2hhbmdlIChzdGF0ZTogUHJvZ3JlbVN0YXRlKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdncmlkIGNoYW5nZTogJywgc3RhdGUpO1xuXG4gICAgICAgIGxldCBib3hTaXplID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcbiAgICAgICAgbGV0IGMgPSBzdGF0ZS5jb2xvbm5lO1xuICAgICAgICBsZXQgbCA9IHN0YXRlLmxpZ25lO1xuXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgbGV0IGNvdWxldXIgPSBjb2xvcmVyUHJvZ3JlbShjLCBsLCBzdGF0ZS5jb250ZXh0ZSk7XG4gICAgICAgIGlmIChjb3VsZXVyKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb3VsZXVyO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoYyAqIGJveFNpemUsIGwgKiBib3hTaXplLCBib3hTaXplLCBib3hTaXplKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiXG5leHBvcnQgY2xhc3MgRXZhbFNjb3BlIHtcblxuICAgIC8vIFNlZSBodHRwOi8vcGVyZmVjdGlvbmtpbGxzLmNvbS9nbG9iYWwtZXZhbC13aGF0LWFyZS10aGUtb3B0aW9ucy9cbiAgICAvLyBXaWxsIHJldHVybiBhbiBldmFsIGFibGUgdG8gZXZhbHVhdGUganMgY29kZSBpbiB0aGUgZ2xvYmFsIHNjb3BlLlxuICAgIHB1YmxpYyByZWFkb25seSBnbG9iYWxFdmFsID0gKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXIgaXNJbmRpcmVjdEV2YWxHbG9iYWwgPSAoZnVuY3Rpb24gKG9yaWdpbmFsLCBPYmplY3QpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gRG9lcyBgT2JqZWN0YCByZXNvbHZlIHRvIGEgbG9jYWwgdmFyaWFibGUsIG9yIHRvIGEgZ2xvYmFsLCBidWlsdC1pbiBgT2JqZWN0YCxcbiAgICAgICAgICAgICAgICAvLyByZWZlcmVuY2UgdG8gd2hpY2ggd2UgcGFzc2VkIGFzIGEgZmlyc3QgYXJndW1lbnQ/XG4gICAgICAgICAgICAgICAgcmV0dXJuICgxLCBldmFsKSgnT2JqZWN0JykgPT09IG9yaWdpbmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIC8vIGlmIGluZGlyZWN0IGV2YWwgZXJyb3JzIG91dCAoYXMgYWxsb3dlZCBwZXIgRVMzKSwgdGhlbiBqdXN0IGJhaWwgb3V0IHdpdGggYGZhbHNlYFxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoT2JqZWN0LCAxMjMpO1xuXG4gICAgICAgIGlmIChpc0luZGlyZWN0RXZhbEdsb2JhbCkge1xuICAgICAgICAgICAgLy8gaWYgaW5kaXJlY3QgZXZhbCBleGVjdXRlcyBjb2RlIGdsb2JhbGx5LCB1c2UgaXRcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXhwcmVzc2lvbjogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgxLCBldmFsKShleHByZXNzaW9uKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygd2luZG93LmV4ZWNTY3JpcHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvLyBpZiBgd2luZG93LmV4ZWNTY3JpcHQgZXhpc3RzYCwgdXNlIGl0XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV4cHJlc3Npb246IHN0cmluZykge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LmV4ZWNTY3JpcHQoZXhwcmVzc2lvbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3RoZXJ3aXNlLCBnbG9iYWxFdmFsIGlzIGB1bmRlZmluZWRgIHNpbmNlIG5vdGhpbmcgaXMgcmV0dXJuZWRcbiAgICAgICAgcmV0dXJuIChleHByOiBzdHJpbmcpID0+IHt0aHJvdyBuZXcgRXJyb3IoJ05vIGdsb2JhbCBldmFsIGF2YWlsYWJsZSAhJyk7fVxuICAgIH0pKCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbn1cbiIsImltcG9ydCB7IFBhdHRlcm4sIElkZW50aWZpZXIsIEJhc2VOb2RlLCBWYXJpYWJsZURlY2xhcmF0aW9uLCBBc3NpZ25tZW50RXhwcmVzc2lvbiwgRnVuY3Rpb25EZWNsYXJhdGlvbiwgVmFyaWFibGVEZWNsYXJhdG9yIH0gZnJvbSBcImVzdHJlZVwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFzdEhlbHBlciB7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gcGF0dGVyblRvU3RyaW5nKHBhdHRlcm46IFBhdHRlcm4pOiBzdHJpbmcge1xuICAgICAgICB2YXIgbm9kZTtcbiAgICAgICAgc3dpdGNoIChwYXR0ZXJuLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0lkZW50aWZpZXInOlxuICAgICAgICAgICAgICAgIG5vZGUgPSBwYXR0ZXJuIGFzIElkZW50aWZpZXI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUubmFtZTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGNvbnZlcnQgcGF0dGVybiBvZiB0eXBlICcgKyBwYXR0ZXJuLnR5cGUpO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiByZWR1Y2VOb2RlVG9WYXJEZWNsYXJhdGlvbihub2RlOiBCYXNlTm9kZSk6IFZhcmlhYmxlRGVjbGFyYXRpb24gfCBBc3NpZ25tZW50RXhwcmVzc2lvbiB8IEZ1bmN0aW9uRGVjbGFyYXRpb24gfCB2b2lkIHtcbiAgICAgICAgXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgbGV0IGRlY2wgPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gZGVjbDtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgIGxldCBleHByID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgICAgIHJldHVybiBleHByO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBmdW5jO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHAgPT09ICdsZWZ0JyB8fCBwID09PSAncmlnaHQnIHx8IHAgPT09ICdhcmd1bWVudCcgfHwgcCA9PT0gJ2NhbGxlZScgfHwgcCA9PT0gJ2JvZHknIHx8IHAgPT09ICdleHByZXNzaW9uJykge1xuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkOiBCYXNlTm9kZSA9IG5vZGVbcF0gYXMgQmFzZU5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSByZWR1Y2VOb2RlVG9WYXJEZWNsYXJhdGlvbihjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IEh0bWxWZXJzZUZhY3RvcnksIFN0eWxlRGVjb3JhdG9yLCBWZXJzZUluc3RydWN0aW9uIH0gZnJvbSBcIi4vVHlwZXNcIjtcbmltcG9ydCB7IEJhc2VOb2RlLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBCbG9ja1N0YXRlbWVudCwgSWZTdGF0ZW1lbnQsIFZhcmlhYmxlRGVjbGFyYXRvciwgVmFyaWFibGVEZWNsYXJhdGlvbiwgQXNzaWdubWVudEV4cHJlc3Npb24sIEJpbmFyeUV4cHJlc3Npb24sIEV4cHJlc3Npb25TdGF0ZW1lbnQsIFJldHVyblN0YXRlbWVudCB9IGZyb20gXCJlc3RyZWVcIjtcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tIFwiLi9IdG1sSGVscGVyXCI7XG5pbXBvcnQgeyBBc3RIZWxwZXIgfSBmcm9tIFwiLi9Bc3RIZWxwZXJcIjtcbmltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcblxuZXhwb3J0IGNsYXNzIEVzdHJlZVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeSBpbXBsZW1lbnRzIEh0bWxWZXJzZUZhY3Rvcnk8QmFzZU5vZGU+IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjb3JhdG9yOiBTdHlsZURlY29yYXRvcjxCYXNlTm9kZT4pIHt9XG5cbiAgICBidWlsZCh2ZXJzZTogVmVyc2VJbnN0cnVjdGlvbjxCYXNlTm9kZT4pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ1aWxkTm9kZSh2ZXJzZS5hc3RSb290Tm9kZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGQgTm9kZSBhcHBseWluZyBkZWNvcmF0b3JzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBub2RlIFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBidWlsZE5vZGUobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCByZXMgPSB0aGlzLmJ1aWxkTm9kZUludGVybmFsKG5vZGUpO1xuICAgICAgICB0aGlzLmRlY29yYXRvci5kZWNvcmF0ZShub2RlLCByZXMpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkIG5vZGUuXG4gICAgICogQHBhcmFtIG5vZGUgXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGJ1aWxkTm9kZUludGVybmFsKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdCdWlsZGluZyBub2RlJywgbm9kZSwgJy4uLicpO1xuICAgICAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRGdW5jdGlvbkRlY2xhcmF0aW9uKG5vZGUpO1xuICAgICAgICAgICAgY2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQmxvY2tTdGF0ZW1lbnQobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdJZlN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRJZlN0YXRlbWVudChub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ1ZhcmlhYmxlRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkVmFyaWFibGVEZWNsYXJhdGlvbihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ1ZhcmlhYmxlRGVjbGFyYXRvcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRWYXJpYWJsZURlY2xhcmF0b3Iobm9kZSk7XG4gICAgICAgICAgICBjYXNlICdBc3NpZ25tZW50RXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRBc3NpZ25tZW50RXhwcmVzc2lvbihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0JpbmFyeUV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQmluYXJ5RXhwcmVzc2lvbihub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ0V4cHJlc3Npb25TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkRXhwcmVzc2lvblN0YXRlbWVudChub2RlKTtcbiAgICAgICAgICAgIGNhc2UgJ1JldHVyblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRSZXR1cm5TdGF0ZW1lbnQobm9kZSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkRGVmYXVsdChub2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEZ1bmN0aW9uRGVjbGFyYXRpb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICBcbiAgICAgICAgbGV0IGRlY2xTdGFydEl0ZW1zOiAoc3RyaW5nIHwgSFRNTEVsZW1lbnQpW107XG4gICAgICAgIGlmIChuLmlkKSB7XG4gICAgICAgICAgICBsZXQgZnVuY0lkID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLWlkJywgbi5pZC5uYW1lKTtcbiAgICAgICAgICAgIGRlY2xTdGFydEl0ZW1zID0gWydmdW5jdGlvbiAnLCBmdW5jSWQsICcgKCAnXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlY2xTdGFydEl0ZW1zID0gWydmdW5jdGlvbiAoICddOy8vICsgZnVuYy5wYXJhbXMubWFwKHggPT4geC5uYW1lKS5qb2luKCcsICcpICsgJyApIHsnO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhcmFtQ291bnQgPSBuLnBhcmFtcy5sZW5ndGg7XG4gICAgICAgIG4ucGFyYW1zLmZvckVhY2goKHBhcmFtLCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcocGFyYW0pO1xuICAgICAgICAgICAgbGV0IGZ1bmNQYXJhbSA9IHRoaXMuYnVpbGROb2RlKHBhcmFtKTsvL0h0bWxIZWxwZXIuc3BhbignZnVuYy1wYXJhbScsIHZhck5hbWUpO1xuICAgICAgICAgICAgZGVjbFN0YXJ0SXRlbXMucHVzaChmdW5jUGFyYW0pO1xuICAgICAgICAgICAgaWYgKGkgPCBwYXJhbUNvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgIGRlY2xTdGFydEl0ZW1zLnB1c2goJywgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlY2xTdGFydEl0ZW1zLnB1c2goJyApIHsnKTtcblxuICAgICAgICBsZXQgZGVjbFN0YXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdmdW5jLXN0YXJ0JywgZGVjbFN0YXJ0SXRlbXMpO1xuICAgICAgICBsZXQgZnVuY0JvZHkgPSB0aGlzLmJ1aWxkTm9kZShuLmJvZHkpO1xuICAgICAgICBsZXQgZGVjbEVuZCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1lbmQnLCAnfScpO1xuICAgICAgICBsZXQgZGVjbCA9IEh0bWxIZWxwZXIuc3BhbignZnVuYy1kZWNsYXJhdGlvbicsIFtkZWNsU3RhcnQsIGZ1bmNCb2R5LCBkZWNsRW5kXSk7XG5cbiAgICAgICAgcmV0dXJuIGRlY2w7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkQmxvY2tTdGF0ZW1lbnQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgbGV0IGJvZHlTdGF0ZW1lbnRzID0gbi5ib2R5Lm1hcChzdGF0ZW1lbnQgPT4gdGhpcy5idWlsZE5vZGUoc3RhdGVtZW50KSlcbiAgICAgICAgcmV0dXJuIEh0bWxIZWxwZXIuc3BhbignYmxvY2snLCBib2R5U3RhdGVtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZElmU3RhdGVtZW50KG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgSWZTdGF0ZW1lbnQ7XG4gICAgICAgIGxldCBjb250ZW50OiBIVE1MRWxlbWVudFtdID0gW11cbiAgICAgICAgbGV0IHRlc3QgPSB0aGlzLmJ1aWxkTm9kZShuLnRlc3QpO1xuICAgICAgICBsZXQgaWZTdGFydFRleHQgPSBbJ2lmICggJywgdGVzdCwgJyApIHsnXTtcbiAgICAgICAgbGV0IGlmU3RhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1zdGF0ZW1lbnQtc3RhcnQnLCBpZlN0YXJ0VGV4dCk7XG4gICAgICAgIGNvbnRlbnQucHVzaChpZlN0YXJ0KTtcblxuICAgICAgICBsZXQgdGhlbkJsb2NrID0gdGhpcy5idWlsZE5vZGUobi5jb25zZXF1ZW50KTtcbiAgICAgICAgbGV0IGlmVGhlbiA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLWJsb2NrLXRoZW4nLCB0aGVuQmxvY2spO1xuICAgICAgICBjb250ZW50LnB1c2goaWZUaGVuKTtcblxuICAgICAgICBpZiAobi5hbHRlcm5hdGUpIHtcbiAgICAgICAgICAgIGxldCBpZkVsc2VEZWNsID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgaWYtc3RhdGVtZW50LWVsc2UnLCAnfSBlbHNlIHsnKTtcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaChpZkVsc2VEZWNsKTtcblxuICAgICAgICAgICAgbGV0IGVsc2VCbG9jayA9IHRoaXMuYnVpbGROb2RlKG4uYWx0ZXJuYXRlKTtcbiAgICAgICAgICAgIGxldCBpZkVsc2UgPSBIdG1sSGVscGVyLnNwYW4oJ3N0YXRlbWVudCBpZi1ibG9jay1lbHNlJywgZWxzZUJsb2NrKTtcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaChpZkVsc2UpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0gXG4gICAgICAgIGxldCBpZkVuZCA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLXN0YXRlbWVudC1lbmQnLCAnfScpO1xuICAgICAgICBjb250ZW50LnB1c2goaWZFbmQpO1xuXG5cbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGlmLXN0YXRlbWVudCcsIGNvbnRlbnQpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZFZhcmlhYmxlRGVjbGFyYXRpb24obm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBuID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0aW9uO1xuICAgICAgICBsZXQgZGVjbGFyYXRpb25zID0gbi5kZWNsYXJhdGlvbnMubWFwKGQgPT4gdGhpcy5idWlsZE5vZGUoZCkpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdkZWNsYXJhdGlvbiB2YXJpYWJsZS1kZWNsYXJhdGlvbicpO1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gbi5raW5kICsgJyAnO1xuICAgICAgICBkZWNsYXJhdGlvbnMuZm9yRWFjaChkID0+IGNvbnRhaW5lci5hcHBlbmRDaGlsZChkKSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkVmFyaWFibGVEZWNsYXJhdG9yKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdG9yO1xuICAgICAgICBsZXQgbGVmdCA9IEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcobi5pZCk7XG4gICAgICAgIGxldCBsZWZ0UGFydCA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtaWQnLCBsZWZ0KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lcjtcbiAgICAgICAgaWYgKG4uaW5pdCkge1xuICAgICAgICAgICAgbGV0IGFzc2lnblBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ2Fzc2lnbi1vcGVyYXRvcicsICcgPSAnKTtcbiAgICAgICAgICAgIGxldCByaWdodCA9IHRoaXMuYnVpbGROb2RlKG4uaW5pdCk7XG4gICAgICAgICAgICBsZXQgcmlnaHRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS12YWx1ZScsIHJpZ2h0KTtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiB2YXJpYWJsZS1leHByZXNzaW9uJywgW2xlZnRQYXJ0LCBhc3NpZ25QYXJ0LCByaWdodFBhcnRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3BhbignZXhwcmVzc2lvbiB2YXJpYWJsZS1leHByZXNzaW9uJywgbGVmdFBhcnQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEFzc2lnbm1lbnRFeHByZXNzaW9uKG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgQXNzaWdubWVudEV4cHJlc3Npb247XG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5idWlsZE5vZGUobi5sZWZ0KTtcbiAgICAgICAgbGV0IGxlZnRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCd2YXJpYWJsZS1pZCcsIGxlZnQpO1xuICAgICAgICBsZXQgYXNzaWduUGFydCA9IEh0bWxIZWxwZXIuc3BhbignYXNzaWduLW9wZXJhdG9yJywgJyA9ICcpO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmJ1aWxkTm9kZShuLnJpZ2h0KTtcbiAgICAgICAgbGV0IHJpZ2h0UGFydCA9IEh0bWxIZWxwZXIuc3BhbigndmFyaWFibGUtdmFsdWUnLCByaWdodCk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gdmFyaWFibGUtZXhwcmVzc2lvbicsIFtsZWZ0UGFydCwgYXNzaWduUGFydCwgcmlnaHRQYXJ0XSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkQmluYXJ5RXhwcmVzc2lvbihub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEJpbmFyeUV4cHJlc3Npb247XG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5idWlsZE5vZGUobi5sZWZ0KTtcbiAgICAgICAgbGV0IGxlZnRQYXJ0ID0gSHRtbEhlbHBlci5zcGFuKCdleHByZXNzaW9uJywgbGVmdCk7XG4gICAgICAgIGxldCBvcGVyYXRvclBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24tb3BlcmF0b3InLCAnICcgKyBuLm9wZXJhdG9yICsgJyAnKTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5idWlsZE5vZGUobi5yaWdodCk7XG4gICAgICAgIGxldCByaWdodFBhcnQgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24nLCByaWdodCk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBIdG1sSGVscGVyLnNwYW4oJ2V4cHJlc3Npb24gYmluYXJ5LWV4cHJlc3Npb24nLCBbbGVmdFBhcnQsIG9wZXJhdG9yUGFydCwgcmlnaHRQYXJ0XSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkRXhwcmVzc2lvblN0YXRlbWVudChub2RlOiBCYXNlTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG4gPSBub2RlIGFzIEV4cHJlc3Npb25TdGF0ZW1lbnQ7XG4gICAgICAgIGxldCBjb2RlID0gdGhpcy5idWlsZE5vZGUobi5leHByZXNzaW9uKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IEh0bWxIZWxwZXIuc3Bhbignc3RhdGVtZW50IGV4cHJlc3Npb24tc3RhdGVtZW50JywgY29kZSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJ1aWxkUmV0dXJuU3RhdGVtZW50KG5vZGU6IEJhc2VOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgbiA9IG5vZGUgYXMgUmV0dXJuU3RhdGVtZW50O1xuICAgICAgICBsZXQgY29kZSA9IGVzY29kZUdlbmVyYXRlKG4pO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdzdGF0ZW1lbnQgcmV0dXJuLXN0YXRlbWVudCcsIGNvZGUpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZERlZmF1bHQobm9kZTogQmFzZU5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkZWZhdWx0OicsIG5vZGUpO1xuICAgICAgICBsZXQgY29kZSA9IGVzY29kZUdlbmVyYXRlKG5vZGUpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gSHRtbEhlbHBlci5zcGFuKCdkZWZhdWx0LScgKyBub2RlLnR5cGUsIGNvZGUpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBQcm9ncmVtU3RhdGUsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyLCBMaW5lQ2hhbmdlTGlzdGVuZXIsIEZyYW1lQ2hhbmdlTGlzdGVuZXIgfSBmcm9tIFwiLi9TY2hlZHVsaW5nU2VydmljZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZlcnNlSW5zdHJ1Y3Rpb248QXN0QmFzZVR5cGU+IHtcbiAgICBhc3RSb290Tm9kZTogQXN0QmFzZVR5cGVcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWZXJzZUluc3RydWN0aW9uRmFjdG9yeTxBc3RCYXNlVHlwZT4ge1xuICAgIGJ1aWxkKHBhcmFtOiBBc3RCYXNlVHlwZSk6IFZlcnNlSW5zdHJ1Y3Rpb248QXN0QmFzZVR5cGU+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1Db2RlRmFjdG9yeTxBc3RCYXNlVHlwZT4ge1xuICAgIGJ1aWxkKGNvZGU6IHN0cmluZyk6IFByb2dyZW1Db2RlPEFzdEJhc2VUeXBlPlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZlcnNlSXRlcmF0b3I8QXN0QmFzZVR5cGU+IHtcbiAgICBleGVjdXRlTmV4dCgpOiBWZXJzZUluc3RydWN0aW9uPEFzdEJhc2VUeXBlPlxuICAgIGhhc05leHQoKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtQ29kZTxBc3RCYXNlVHlwZT4ge1xuICAgIGluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCk6IFZlcnNlSW5zdHJ1Y3Rpb248QXN0QmFzZVR5cGU+XG4gICAgY29sb3JlclByb2dyZW1GdW5jdGlvbigpOiBWZXJzZUluc3RydWN0aW9uPEFzdEJhc2VUeXBlPlxuICAgIGl0ZXJhdG9yKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiBWZXJzZUl0ZXJhdG9yPEFzdEJhc2VUeXBlPlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1TY2hlZHVsZXIge1xuICAgIHN1YnNjcmliZUNvZGVFeGVjdXRpb24obGlzdGVuZXI6IENvZGVFeGVjdXRpb25MaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVHcmlkQ2hhbmdlKGxpc3RlbmVyOiBHcmlkQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlTGluZUNoYW5nZShsaXN0ZW5lcjogTGluZUNoYW5nZUxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUZyYW1lQ2hhbmdlKGxpc3RlbmVyOiBGcmFtZUNoYW5nZUxpc3RlbmVyKTogdm9pZFxuICAgIHJlc2V0KCk6IFByb2dyZW1TdGF0ZVxuICAgIGN1cnJlbnQoKTogUHJvZ3JlbVN0YXRlXG4gICAgbmV4dCgpOiBQcm9ncmVtU3RhdGVcbiAgICBnZXRQcm9ncmVtKCk6IFByb2dyZW1Db2RlPGFueT5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtVmlldyB7XG4gICAgYnVpbGRWaWV3KHNjaGVkdWxlcjogUHJvZ3JlbVNjaGVkdWxlcik6IEhUTUxFbGVtZW50XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3R5bGVEZWNvcmF0b3I8VD4ge1xuICAgIGRlY29yYXRlKG5vZGU6IFQsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZFxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIdG1sVmVyc2VGYWN0b3J5PEFzdEJhc2VUeXBlPiB7XG4gICAgYnVpbGQodmVyc2U6IFZlcnNlSW5zdHJ1Y3Rpb248QXN0QmFzZVR5cGU+KTogSFRNTEVsZW1lbnRcbn1cblxuZXhwb3J0IGNsYXNzIFN0eWxlRGVjb3JhdG9yQWdncmVnYXRpb248VD4gaW1wbGVtZW50cyBTdHlsZURlY29yYXRvcjxUPiB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY29yYXRvcnM6IFN0eWxlRGVjb3JhdG9yPFQ+W10pIHt9XG5cbiAgICBkZWNvcmF0ZShub2RlOiBULCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRlY29yYXRvcnMuZm9yRWFjaChkID0+IGQuZGVjb3JhdGUobm9kZSwgZWxlbWVudCkpO1xuICAgIH1cblxuICAgIGJ1aWxkU3R5bGVTaGVldCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvcmF0b3JzLm1hcChkID0+IGQuYnVpbGRTdHlsZVNoZWV0KCkpLmpvaW4oJ1xcbicpO1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgSGlnaGxpZ2h0RXhlY3V0aW5nVmVyc2VEZWNvcmF0b3IgaW1wbGVtZW50cyBTdHlsZURlY29yYXRvcjxWZXJzZUluc3RydWN0aW9uPGFueT4+IHtcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTk9UX0VYRUNVVEVEX0NMQVNTID0gJ3ZlcnNlLW5vdC1leGVjdXRlZCc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBFWEVDVVRJTkdfQ0xBU1MgPSAndmVyc2UtZXhlY3V0aW5nJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVYRUNVVEVEX0NMQVNTID0gJ3ZlcnNlLWV4ZWN1dGVkJztcblxuICAgIGRlY29yYXRlKG5vZGU6IFZlcnNlSW5zdHJ1Y3Rpb248YW55PiwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKEhpZ2hsaWdodEV4ZWN1dGluZ1ZlcnNlRGVjb3JhdG9yLk5PVF9FWEVDVVRFRF9DTEFTUyk7XG4gICAgfSAgICBcbiAgICBcbiAgICBidWlsZFN0eWxlU2hlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgLyoqIC0tLS0tIEhpZ2hsaWdodEV4ZWN1dGluZ1ZlcnNlRGVjb3JhdG9yIHN0eWxlIC0tLS0tICovXG4gICAgICAgICR7SGlnaGxpZ2h0RXhlY3V0aW5nVmVyc2VEZWNvcmF0b3IuTk9UX0VYRUNVVEVEX0NMQVNTfToge1xuXG4gICAgICAgIH1cbiAgICAgICAgJHtIaWdobGlnaHRFeGVjdXRpbmdWZXJzZURlY29yYXRvci5FWEVDVVRJTkdfQ0xBU1N9OiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7XG4gICAgICAgIH1cbiAgICAgICAgJHtIaWdobGlnaHRFeGVjdXRpbmdWZXJzZURlY29yYXRvci5FWEVDVVRFRF9DTEFTU306IHtcblxuICAgICAgICB9XG4gICAgICAgIGA7XG4gICAgfVxuXG59XG5cbiIsImltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcbmltcG9ydCB7IENvZGVTZXJ2aWNlIH0gZnJvbSBcIi4vQ29kZVNlcnZpY2VcIjtcbmltcG9ydCB7IFNjaGVkdWxpbmdTZXJ2aWNlIH0gZnJvbSAnLi9TY2hlZHVsaW5nU2VydmljZSc7XG5pbXBvcnQgeyBCYXNpY0h0bWxFc3ByaW1hUHJvZ3JlbUluc3BlY3RvciwgUHJvZ3JlbUluc3BlY3RvclZpZXcgfSBmcm9tICcuL1Byb2dyZW1JbnNwZWN0b3InO1xuaW1wb3J0IHsgQmFzaWNDYW52YXNQcm9ncmVtR3JpZCB9IGZyb20gJy4vUHJvZ3JlbUdyaWQnO1xuaW1wb3J0IHsgU2NyZWVuQ29uZmlnIH0gZnJvbSAnLi9TY3JlZW5TZXJ2aWNlJztcbmltcG9ydCB7IEVzdHJlZVByb2dyZW1JbnNwZWN0b3JIdG1sRmFjdG9yeSB9IGZyb20gJy4vRXN0cmVlUHJvZ3JlbUluc3BlY3Rvckh0bWxGYWN0b3J5JztcbmltcG9ydCB7IEJhc2VOb2RlIH0gZnJvbSAnZXN0cmVlJztcbmltcG9ydCB7IFN0eWxlRGVjb3JhdG9yQWdncmVnYXRpb24sIFByb2dyZW1TY2hlZHVsZXIgfSBmcm9tICcuL1R5cGVzJztcbmltcG9ydCB7IFBhZFZlcnNlRGVjb3JhdG9yLCBDb2xvclZlcnNlVmFyaWFibGVEZWNvcmF0b3IgfSBmcm9tICcuL0VzdHJlZVN0eWxlRGVjb3JhdG9yJztcbmltcG9ydCB7IEh0bWxIZWxwZXIgfSBmcm9tICcuL0h0bWxIZWxwZXInO1xuXG5leHBvcnQgY2xhc3MgUHJvZ3JlbUNvbmZpZyB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjb2xvbm5lczogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbGlnbmVzOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBmcmFtZXM6IG51bWJlcixcbiAgICApIHt9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgUHJvZ3JlbVNlcnZpY2Uge1xuXG4gICAgdmFyIHByZXZpb3VzUmVwYWludFRpbWUgPSAwO1xuICAgIHZhciBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXI7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtKHVybDogc3RyaW5nLCBzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZzogUHJvZ3JlbUNvbmZpZykge1xuICAgICAgICBsZXQgcHJvZ3JlbVNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBwcm9ncmVtU2NyaXB0LnNyYyA9IHVybDtcbiAgICAgICAgbGV0IGJvZHlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICAgICBpZiAoYm9keUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGJvZHlFbGVtZW50LmFwcGVuZENoaWxkKHByb2dyZW1TY3JpcHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgQ29kZVNlcnZpY2UubG9hZFByb2dyZW0odXJsKS50aGVuKGNvZGUgPT4ge1xuICAgICAgICAgICAgbGV0IHByb2dyZW1Db2RlID0gQ29kZVNlcnZpY2UucHJvZ3JlbUNvZGVGYWN0b3J5LmJ1aWxkKGNvZGUpO1xuICAgICAgICAgICAgbGV0IGNvbG9yZXJGdW5jdGlvbiA9IHByb2dyZW1Db2RlLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKS5hc3RSb290Tm9kZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9ncmVtIEFTVDonLCBwcm9ncmVtQ29kZS5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKTtcblxuICAgICAgICAgICAgLy8gTG9hZCBpbml0UHJvZ3JlbSBGdW5jdGlvbiBjb2RlXG4gICAgICAgICAgICBsZXQgaW5pdFByb2dyZW1GdW5jdGlvbkNvZGUgPSBlc2NvZGVHZW5lcmF0ZShwcm9ncmVtQ29kZS5pbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpLmFzdFJvb3ROb2RlKTtcbiAgICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5ldmFsKGluaXRQcm9ncmVtRnVuY3Rpb25Db2RlKTtcblxuICAgICAgICAgICAgc2NoZWR1bGVyID0gU2NoZWR1bGluZ1NlcnZpY2UuYnVpbGRQcm9ncmVtU2NoZWR1bGVyKHByb2dyZW1Db25maWcsIHByb2dyZW1Db2RlKTtcblxuICAgICAgICAgICAgLy9sZXQgcHJvZ3JlbUluc3BlY3RvciA9IG5ldyBCYXNpY0h0bWxFc3ByaW1hUHJvZ3JlbUluc3BlY3Rvcihwcm9ncmVtQ29kZSwgc2NoZWR1bGVyLCBkb2N1bWVudCk7XG4gICAgICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3RvckRlY29yYXRvcnMgPSBuZXcgU3R5bGVEZWNvcmF0b3JBZ2dyZWdhdGlvbjxCYXNlTm9kZT4oW1xuICAgICAgICAgICAgICAgIG5ldyBQYWRWZXJzZURlY29yYXRvcigpLFxuICAgICAgICAgICAgICAgIG5ldyBDb2xvclZlcnNlVmFyaWFibGVEZWNvcmF0b3IoKVxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBsZXQgcHJvZ3JlbUluc3BlY3RvckZhY3RvcnkgPSBuZXcgRXN0cmVlUHJvZ3JlbUluc3BlY3Rvckh0bWxGYWN0b3J5KHByb2dyZW1JbnNwZWN0b3JEZWNvcmF0b3JzKTtcbiAgICAgICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9yVmlldyA9IG5ldyBQcm9ncmVtSW5zcGVjdG9yVmlldyhwcm9ncmVtSW5zcGVjdG9yRmFjdG9yeSk7XG5cbiAgICAgICAgICAgIGxldCBjb2RlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCcuY29kZScpO1xuICAgICAgICAgICAgaWYgKGNvZGVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnY29kZUVsZW1lbnQnLCBjb2RlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3JDb21wb25lbnQgPSBwcm9ncmVtSW5zcGVjdG9yVmlldy5idWlsZFZpZXcoc2NoZWR1bGVyKTtcbiAgICAgICAgICAgICAgICBjb2RlRWxlbWVudC5hcHBlbmRDaGlsZChwcm9ncmVtSW5zcGVjdG9yQ29tcG9uZW50KTtcblxuICAgICAgICAgICAgICAgIGxldCBkZWNvcmF0b3JTdHlsZSA9IHByb2dyZW1JbnNwZWN0b3JEZWNvcmF0b3JzLmJ1aWxkU3R5bGVTaGVldCgpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2RlY29yYXRvclN0eWxlOicsIGRlY29yYXRvclN0eWxlKVxuICAgICAgICAgICAgICAgIEh0bWxIZWxwZXIuZGVmaW5lQ3NzUnVsZXMoJ3Byb2dyZW0taW5zcGVjdG9yJywgZGVjb3JhdG9yU3R5bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgZ3JpZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZ3JlbScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dyaWRFbGVtZW50JywgZ3JpZEVsZW1lbnQpO1xuICAgICAgICAgICAgbGV0IHByb2dyZW1HcmlkID0gbmV3IEJhc2ljQ2FudmFzUHJvZ3JlbUdyaWQoc2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnKTtcbiAgICAgICAgICAgIHByb2dyZW1HcmlkLmF0dGFjaChncmlkRWxlbWVudCk7XG4gICAgICAgICAgICBwcm9ncmVtR3JpZC5jbGVhcigpO1xuICAgICAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUdyaWRDaGFuZ2UocHJvZ3JlbUdyaWQpO1xuXG4gICAgICAgICAgICB0aW1lcigwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGltZXIodGltZXN0YW1wOiBudW1iZXIpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aW1lcik7XG5cbiAgICAgICAgaWYgKHRpbWVzdGFtcCAtIHByZXZpb3VzUmVwYWludFRpbWUgPCAxNTAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2aW91c1JlcGFpbnRUaW1lID0gdGltZXN0YW1wO1xuXG4gICAgICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgICAgICAgIHNjaGVkdWxlci5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJcbmV4cG9ydCBjbGFzcyBTY3JlZW5Db25maWcge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm94U2l6ZTogbnVtYmVyXG4gICAgKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgU2NyZWVuU2VydmljZSB7XG5cbiAgICBwdWJsaWMgZ2V0U2NyZWVuRnJhbWUoKTogYW55IHtcblxuICAgIH1cblxufSIsIlxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEh0bWxIZWxwZXIge1xuXG4gICAgc3RhdGljIGFkZENsYXNzZXMoZWx0OiBIVE1MRWxlbWVudCwgY2xhc3Nlczogc3RyaW5nfHN0cmluZ1tdKTogdm9pZCB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xhc3NlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNsYXNzZXMuc3BsaXQoJyAnKS5mb3JFYWNoKGMgPT4gZWx0LmNsYXNzTGlzdC5hZGQoYykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNsYXNzZXMpKSB7XG4gICAgICAgICAgICBjbGFzc2VzLmZvckVhY2goYyA9PiBlbHQuY2xhc3NMaXN0LmFkZChjKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgc3BhbihjbGFzc2VzOiBzdHJpbmd8c3RyaW5nW10sIGNvbnRlbnQ/OiBzdHJpbmd8SFRNTEVsZW1lbnR8KEhUTUxFbGVtZW50fHN0cmluZylbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGVsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBpZiAoY2xhc3Nlcykge1xuICAgICAgICAgICAgSHRtbEhlbHBlci5hZGRDbGFzc2VzKGVsdCwgY2xhc3Nlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBlbHQuaW5uZXJUZXh0ID0gY29udGVudDtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNvbnRlbnQpKSB7XG4gICAgICAgICAgICBjb250ZW50LmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBlbHQuaW5uZXJIVE1MICs9IGM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWx0LmFwcGVuZENoaWxkKGMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGVudCkge1xuICAgICAgICAgICAgZWx0LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWZpbmVDc3NSdWxlcyhpZDogc3RyaW5nLCBjc3NSdWxlczogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBjc3NJZCA9ICdjc3MtJyArIGlkO1xuICAgICAgICBsZXQgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3NzSWQpO1xuICAgICAgICBpZighc3R5bGVFbGVtZW50KSB7XG4gICAgICAgICAgICBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICB9XG4gICAgICAgIHN0eWxlRWxlbWVudC5pZCA9IGNzc0lkO1xuICAgICAgICAvKiBhZGQgc3R5bGUgcnVsZXMgdG8gdGhlIHN0eWxlIGVsZW1lbnQgKi9cbiAgICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzc1J1bGVzKSk7XG4gICAgICAgIFxuICAgICAgICAvKiBhdHRhY2ggdGhlIHN0eWxlIGVsZW1lbnQgdG8gdGhlIGRvY3VtZW50IGhlYWQgKi9cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBQcm9ncmVtQ29uZmlnIH0gZnJvbSBcIi4vUHJvZ3JlbVNlcnZpY2VcIjtcbmltcG9ydCB7IEV2YWxTY29wZSB9IGZyb20gXCIuL0V2YWxTZXJ2aWNlXCI7XG5pbXBvcnQgeyBQcm9ncmVtU2NoZWR1bGVyLCBWZXJzZUluc3RydWN0aW9uLCBWZXJzZUl0ZXJhdG9yLCBQcm9ncmVtQ29kZSB9IGZyb20gXCIuL1R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVtU3RhdGUge1xuXG4gICAgcHVibGljIHJlYWRvbmx5IGV2YWxTY29wZSA9IG5ldyBFdmFsU2NvcGU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvbG9ubmU6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGxpZ25lOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBmcmFtZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgY29udGV4dGU6IG9iamVjdCxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvZGVTdGF0ZW1lbnQ6IFZlcnNlSW5zdHJ1Y3Rpb248YW55PiB8IG51bGwsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGV2YWwoZXhwcjogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZhbFNjb3BlLmdsb2JhbEV2YWwoZXhwcik7XG4gICAgfVxufVxuXG50eXBlIE5ld1N0YXRlQ2FsbGJhY2sgPSAoc3RhdGU6IFByb2dyZW1TdGF0ZSkgPT4gdm9pZDtcbmV4cG9ydCBpbnRlcmZhY2UgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyIHtmaXJlQ29kZUV4ZWN1dGlvbjogTmV3U3RhdGVDYWxsYmFja307XG5leHBvcnQgaW50ZXJmYWNlIEdyaWRDaGFuZ2VMaXN0ZW5lciB7ZmlyZUdyaWRDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBMaW5lQ2hhbmdlTGlzdGVuZXIge2ZpcmVMaW5lQ2hhbmdlOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgRnJhbWVDaGFuZ2VMaXN0ZW5lciB7ZmlyZUZyYW1lQ2hhbmdlOiBOZXdTdGF0ZUNhbGxiYWNrfTtcblxuLypcbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbVNjaGVkdWxlciB7XG4gICAgc3Vic2NyaWJlQ29kZUV4ZWN1dGlvbihsaXN0ZW5lcjogQ29kZUV4ZWN1dGlvbkxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUdyaWRDaGFuZ2UobGlzdGVuZXI6IEdyaWRDaGFuZ2VMaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVMaW5lQ2hhbmdlKGxpc3RlbmVyOiBMaW5lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlRnJhbWVDaGFuZ2UobGlzdGVuZXI6IEZyYW1lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG5cbiAgICByZXNldCgpOiBQcm9ncmVtU3RhdGVcbiAgICBjdXJyZW50KCk6IFByb2dyZW1TdGF0ZVxuICAgIG5leHQoKTogUHJvZ3JlbVN0YXRlXG59XG4qL1xuXG5jbGFzcyBTaW1wbGVQcm9ncmVtU2NoZWR1bGVyIGltcGxlbWVudHMgUHJvZ3JlbVNjaGVkdWxlciB7XG4gICAgXG4gICAgcHJpdmF0ZSBzdGF0ZTogUHJvZ3JlbVN0YXRlO1xuICAgIHByaXZhdGUgY29kZUl0ZXJhdG9yOiBWZXJzZUl0ZXJhdG9yPGFueT4gfCBudWxsID0gbnVsbDtcblxuICAgIHByaXZhdGUgY29kZUV4ZWN1dGlvbkxpc3RlbmVyczogQ29kZUV4ZWN1dGlvbkxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGdyaWRDaGFuZ2VMaXN0ZW5lcnM6IEdyaWRDaGFuZ2VMaXN0ZW5lcltdID0gW107XG4gICAgcHJpdmF0ZSBsaW5lQ2hhbmdlTGlzdGVuZXJzOiBMaW5lQ2hhbmdlTGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgZnJhbWVDaGFuZ2VMaXN0ZW5lcnM6IEZyYW1lQ2hhbmdlTGlzdGVuZXJbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IFByb2dyZW1Db25maWcsIHByaXZhdGUgY29kZTogUHJvZ3JlbUNvZGU8YW55Pikge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5yZXNldCgpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZUNvZGVFeGVjdXRpb24obGlzdGVuZXI6IENvZGVFeGVjdXRpb25MaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvZGVFeGVjdXRpb25MaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfSAgICBcbiAgICBcbiAgICBzdWJzY3JpYmVHcmlkQ2hhbmdlKGxpc3RlbmVyOiBHcmlkQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ncmlkQ2hhbmdlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZUxpbmVDaGFuZ2UobGlzdGVuZXI6IExpbmVDaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmxpbmVDaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlRnJhbWVDaGFuZ2UobGlzdGVuZXI6IEZyYW1lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mcmFtZUNoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICByZXNldCgpOiBQcm9ncmVtU3RhdGUge1xuICAgICAgICAvLyBDYWxsIGp1c3QgZXZhbHVhdGVkIGluaXRpYWxpc2VyUHJvZ3JlbSBmdW5jdGlvblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGxldCBpbml0aWFsQ29udGV4dGU6IG9iamVjdCA9IGluaXRpYWxpc2VyUHJvZ3JlbSh0aGlzLmNvbmZpZy5jb2xvbm5lcywgdGhpcy5jb25maWcubGlnbmVzKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0xvYWRlZCBpbml0aWFsIGNvbnRleHRlOiAnLCBpbml0aWFsQ29udGV4dGUpO1xuICAgICAgICBsZXQgc3RhdGUgPSBuZXcgUHJvZ3JlbVN0YXRlKDAsIDAsIDAsIGluaXRpYWxDb250ZXh0ZSwgbnVsbCk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBjdXJyZW50KCk6IFByb2dyZW1TdGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cblxuICAgIG5leHQoKTogUHJvZ3JlbVN0YXRlIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlKSB0aHJvdyBuZXcgRXJyb3IoJ0luY29uc2lzdGVudCBQcm9ncmVtIHN0YXRlICEnKTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvZGVJdGVyYXRvciA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNvZGVJdGVyYXRvciA9IHRoaXMuY29kZS5pdGVyYXRvcih0aGlzLnN0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2hhc05leHQ6JywgdGhpcy5jb2RlSXRlcmF0b3IuaGFzTmV4dCgpKTtcblxuICAgICAgICBpZiAodGhpcy5jb2RlSXRlcmF0b3IuaGFzTmV4dCgpKSB7XG4gICAgICAgICAgICBsZXQgc3RhdGVtZW50ID0gdGhpcy5jb2RlSXRlcmF0b3IuZXhlY3V0ZU5leHQoKTtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IG5ldyBQcm9ncmVtU3RhdGUodGhpcy5zdGF0ZS5jb2xvbm5lLCB0aGlzLnN0YXRlLmxpZ25lLCB0aGlzLnN0YXRlLmZyYW1lLCB0aGlzLnN0YXRlLmNvbnRleHRlLCBzdGF0ZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICAgICAgdGhpcy5jb2RlRXhlY3V0aW9uTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUNvZGVFeGVjdXRpb24obmV3U3RhdGUpKTtcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0ZpbmlzaGVkIGl0ZXJhdGluZyBvdmVyIGNvZGUuJylcblxuICAgICAgICBsZXQgbm90aWZ5UGl4ZWxDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgbGV0IG5vdGlmeUxpbmVDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgbGV0IG5vdGlmeUZyYW1lQ2hhbmdlID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IF9jb2xvbm5lID0gdGhpcy5zdGF0ZS5jb2xvbm5lO1xuICAgICAgICBsZXQgX2xpZ25lID0gdGhpcy5zdGF0ZS5saWduZTtcbiAgICAgICAgbGV0IF9mcmFtZSA9IHRoaXMuc3RhdGUuZnJhbWU7XG5cbiAgICAgICAgX2NvbG9ubmUgKys7XG4gICAgICAgIG5vdGlmeVBpeGVsQ2hhbmdlID0gdHJ1ZTtcblxuICAgICAgICBpZiAoX2NvbG9ubmUgPj0gdGhpcy5jb25maWcuY29sb25uZXMpIHtcbiAgICAgICAgICAgIF9jb2xvbm5lID0gMDtcbiAgICAgICAgICAgIF9saWduZSArKztcbiAgICAgICAgICAgIG5vdGlmeUxpbmVDaGFuZ2UgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9saWduZSA+IHRoaXMuY29uZmlnLmxpZ25lcykge1xuICAgICAgICAgICAgX2xpZ25lID0gMDtcbiAgICAgICAgICAgIF9mcmFtZSArKztcbiAgICAgICAgICAgIG5vdGlmeUZyYW1lQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfZnJhbWUgPiB0aGlzLmNvbmZpZy5mcmFtZXMpIHtcbiAgICAgICAgICAgIF9mcmFtZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmV3U3RhdGUgPSBuZXcgUHJvZ3JlbVN0YXRlKF9jb2xvbm5lLCBfbGlnbmUsIF9mcmFtZSwgdGhpcy5zdGF0ZS5jb250ZXh0ZSwgbnVsbCk7XG4gXG4gICAgICAgIGlmIChub3RpZnlQaXhlbENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5ncmlkQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUdyaWRDaGFuZ2UodGhpcy5zdGF0ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vdGlmeUxpbmVDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMubGluZUNoYW5nZUxpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVMaW5lQ2hhbmdlKHRoaXMuc3RhdGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub3RpZnlGcmFtZUNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5mcmFtZUNoYW5nZUxpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVGcmFtZUNoYW5nZSh0aGlzLnN0YXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgIHRoaXMuY29kZUl0ZXJhdG9yID0gdGhpcy5jb2RlLml0ZXJhdG9yKG5ld1N0YXRlKTtcblxuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFByb2dyZW0oKTogUHJvZ3JlbUNvZGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvZGU7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFNjaGVkdWxpbmdTZXJ2aWNlIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFByb2dyZW1TY2hlZHVsZXIoY29uZmlnOiBQcm9ncmVtQ29uZmlnLCBjb2RlOiBQcm9ncmVtQ29kZTxhbnk+KSB7XG4gICAgICAgIHJldHVybiBuZXcgU2ltcGxlUHJvZ3JlbVNjaGVkdWxlcihjb25maWcsIGNvZGUpO1xuICAgIH1cblxufSIsImltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcbmltcG9ydCB7IGNyZWF0ZSBhcyBtZDVDcmVhdGUgfSBmcm9tICdqcy1tZDUnO1xuaW1wb3J0IHsgRnVuY3Rpb25EZWNsYXJhdGlvbiwgQmFzZU5vZGUsIEJsb2NrU3RhdGVtZW50LCBJZlN0YXRlbWVudCwgRXhwcmVzc2lvbiwgVmFyaWFibGVEZWNsYXJhdGlvbiwgVmFyaWFibGVEZWNsYXJhdG9yLCBFeHByZXNzaW9uU3RhdGVtZW50LCBBc3NpZ25tZW50RXhwcmVzc2lvbiwgUmV0dXJuU3RhdGVtZW50LCBDb25kaXRpb25hbEV4cHJlc3Npb24sIEJpbmFyeUV4cHJlc3Npb24gfSBmcm9tICdlc3RyZWUnO1xuaW1wb3J0IHsgUHJvZ3JlbVN0YXRlLCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciB9IGZyb20gJy4vU2NoZWR1bGluZ1NlcnZpY2UnO1xuaW1wb3J0IHsgQXN0SGVscGVyIH0gZnJvbSAnLi9Bc3RIZWxwZXInO1xuaW1wb3J0IHsgRnVuY3Rpb25EZWNsYXJhdGlvblRvSHRtbFRyZWVTdG9yZSwgQ29kZVNwb29sZXJFc1RvSHRtbFRyZWVNYXBwZXJGYWN0b3J5LCBFc1RvSHRtbFRyZWVTdG9yZSB9IGZyb20gJy4vSHRtbFRyZWUnO1xuaW1wb3J0IHsgUHJvZ3JlbUNvZGUsIFByb2dyZW1WaWV3LCBIdG1sVmVyc2VGYWN0b3J5LCBQcm9ncmVtU2NoZWR1bGVyIH0gZnJvbSAnLi9UeXBlcyc7XG5pbXBvcnQgeyBFc3ByaW1hUHJvZ3JlbUNvZGUgfSBmcm9tICcuL0NvZGVTZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtSW5zcGVjdG9yIHtcbiAgICBjbGVhcigpOiB2b2lkO1xuICAgIGF0dGFjaChlbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwpOiB2b2lkXG59XG5cbmV4cG9ydCBjbGFzcyBCYXNpY0h0bWxFc3ByaW1hUHJvZ3JlbUluc3BlY3RvciBpbXBsZW1lbnRzIFByb2dyZW1JbnNwZWN0b3IsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyIHtcbiAgICBcbiAgICBwcml2YXRlIHByb2dyZW1Db2RlTGluZXM6IEhUTUxFbGVtZW50W10gPSBbXTtcbiAgICBwcml2YXRlIGF0dGFjaGVkRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIG1hcHBpbmc6IE1hcDxCYXNlTm9kZSwgSFRNTEVsZW1lbnQ+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgaGludFN0YWNrQ29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSB0cmVlU3RvcmUxOiBFc1RvSHRtbFRyZWVTdG9yZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHByb2dyZW1Db2RlOiBFc3ByaW1hUHJvZ3JlbUNvZGUsXG4gICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyLFxuICAgICAgICBwcml2YXRlIF9kb2N1bWVudDogRG9jdW1lbnRcbiAgICApIHtcbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUNvZGVFeGVjdXRpb24odGhpcyk7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVHcmlkQ2hhbmdlKHRoaXMpO1xuICAgICAgICAvL3RoaXMuYnVpbGRIdG1sVHJlZTIoKTtcbiAgICAgICAgdGhpcy50cmVlU3RvcmUxID0gdGhpcy5idWlsZEh0bWxUcmVlMygpO1xuICAgIH1cblxuICAgIGF0dGFjaDAoZWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXR0YWNoZWRFbGVtZW50ID0gZWxlbWVudDtcblxuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgbGV0IGNvZGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvZGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29kZUNvbnRhaW5lcicpO1xuICAgICAgICAgICAgdGhpcy5oaW50U3RhY2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuaGludFN0YWNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpbnRDb250YWluZXInKTtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY29kZUNvbnRhaW5lcik7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuaGludFN0YWNrQ29udGFpbmVyKTtcblxuICAgICAgICAgICAgdGhpcy5wcm9ncmVtQ29kZUxpbmVzLm1hcChlbHQgPT4geyBjb2RlQ29udGFpbmVyLmFwcGVuZENoaWxkKGVsdCkgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhdHRhY2goZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hdHRhY2hlZEVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnRyZWVTdG9yZTEucGFpbnRJbnRvKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXIwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbG9yTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBpZiAodGhpcy5oaW50U3RhY2tDb250YWluZXIpXG4gICAgICAgICAgICB0aGlzLmhpbnRTdGFja0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICB0aGlzLm1hcHBpbmcuZm9yRWFjaCgoZWx0LCBub2RlKSA9PiBlbHQuY2xhc3NMaXN0LnJlbW92ZSgnaGlnaGxpZ2h0JykpO1xuICAgIH1cblxuICAgIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbG9yTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnRyZWVTdG9yZTEucmVzZXRTdHlsZSgpO1xuICAgICAgICBpZiAodGhpcy5oaW50U3RhY2tDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaGludFN0YWNrQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbG9yTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuXG4gICAgcHJpdmF0ZSBoc2xDb2xvcihodWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnaHNsKCcgKyBodWUgKyAnLCAxMDAlLCA4MCUpJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhc2hTdHJpbmdUb0NvbG9yKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBzaGlmdCA9IDI7XG4gICAgICAgIGxldCBjb2xvckNvdW50ID0gMTI7XG5cbiAgICAgICAgdmFyIGh1ZSA9IHRoaXMuY29sb3JNYXAuZ2V0KGtleSk7XG4gICAgICAgIGlmIChodWUpIHJldHVybiB0aGlzLmhzbENvbG9yKGh1ZSk7XG5cbiAgICAgICAgdmFyIGhhc2ggPSBtZDVDcmVhdGUoKS51cGRhdGUoa2V5KS50b1N0cmluZygpO1xuICAgICAgICBcbiAgICAgICAgaHVlID0gKCBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDAsIHNoaWZ0ICsgMSksIDE2KSArIDE2ICogcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAxLCBzaGlmdCArIDIpLCAxNikgKyAyNTYgKiBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDIsIHNoaWZ0ICsgMyksIDE2KSApO1xuICAgICAgICBodWUgPSBNYXRoLmZsb29yKGh1ZSAlIGNvbG9yQ291bnQpICogMzYwIC8gY29sb3JDb3VudDtcblxuICAgICAgICB3aGlsZSAoIXRoaXMuY29sb3JNYXAuZ2V0KGtleSkpIHtcbiAgICAgICAgICAgIGxldCBkdXBsaWNhdGVDb2xvciA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yIChsZXQgYyBvZiB0aGlzLmNvbG9yTWFwLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPT09IGh1ZSkge1xuICAgICAgICAgICAgICAgICAgICBkdXBsaWNhdGVDb2xvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGh1ZSArPSBNYXRoLmZsb29yKDM2MCAvIGNvbG9yQ291bnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWR1cGxpY2F0ZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvck1hcC5zZXQoa2V5LCBodWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL3ZhciBwYXN0ZWwgPSAnaHNsKCcgKyBodWUgKyAnLCAxMDAlLCA4Ny41JSknO1xuICAgICAgICByZXR1cm4gdGhpcy5oc2xDb2xvcihodWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBmaXJlQ29kZUV4ZWN1dGlvbihzdGF0ZTogUHJvZ3JlbVN0YXRlKSB7XG4gICAgICAgIGlmIChzdGF0ZS5jb2RlU3RhdGVtZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlY2VpdmVkIGEgbnVsbCBzdGF0ZW1lbnQgIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy90aGlzLm1hcHBpbmcuZm9yRWFjaCgoZWx0LCBub2RlKSA9PiBlbHQuY2xhc3NMaXN0LnJlbW92ZSgnaGlnaGxpZ2h0JykpO1xuICAgICAgICB0aGlzLnRyZWVTdG9yZTEucmVtb3ZlU3R5bGVDbGFzc2VzKFsnaGlnaGxpZ2h0J10pO1xuXG4gICAgICAgIGxldCBleGVjdXRlZE5vZGUgPSBzdGF0ZS5jb2RlU3RhdGVtZW50LmFzdFJvb3ROb2RlO1xuICAgICAgICAvL2xldCBodG1sTm9kZSA9IHRoaXMubWFwcGluZy5nZXQoZXhlY3V0ZWROb2RlKTtcbiAgICAgICAgLy9pZiAoIWh0bWxOb2RlKSB7XG4gICAgICAgIC8vICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZvdW5kIGEgSFRNTCBlbGVtZW50IG1hcHBlZCBmb3IgcmVjZWl2ZWQgc3RhdGVtZW50ICEnKVxuICAgICAgICAvL31cbiAgICAgICAgLy9odG1sTm9kZS5jbGFzc0xpc3QuYWRkKCdoaWdobGlnaHQnKTtcbiAgICAgICAgdGhpcy50cmVlU3RvcmUxLmFkZFN0eWxlQ2xhc3NlcyhleGVjdXRlZE5vZGUsIFsnaGlnaGxpZ2h0J10pO1xuXG4gICAgICAgIGlmICh0aGlzLmhpbnRTdGFja0NvbnRhaW5lcikge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBBc3RIZWxwZXIucmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24oZXhlY3V0ZWROb2RlKTtcbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkZWNsID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZGVjbC5kZWNsYXJhdGlvbnMubWFwKGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGludCA9IHRoaXMuYXBwZW5kSGludCh0aGlzLmhpbnRTdGFja0NvbnRhaW5lciwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBBc3RIZWxwZXIucGF0dGVyblRvU3RyaW5nKGQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhclZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuaW5pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhclZhbHVlID0gc3RhdGUuZXZhbFNjb3BlLmdsb2JhbEV2YWwoZXNjb2RlR2VuZXJhdGUoZC5pbml0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBoaW50LmlubmVySFRNTCA9IHZhck5hbWUgKyAnID0gJyArIHZhclZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGludC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKHZhck5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBwRWx0ID0gdGhpcy5tYXBwaW5nLmdldChkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHBFbHQpIHBFbHQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5oYXNoU3RyaW5nVG9Db2xvcih2YXJOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZVN0b3JlMS5zZXRTdHlsZVByb3BlcnR5KGQsICdiYWNrZ3JvdW5kQ29sb3InLCB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKHZhck5hbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlY2wgPSBub2RlIGFzIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBsZXQgaGludCA9IHRoaXMuYXBwZW5kSGludCh0aGlzLmhpbnRTdGFja0NvbnRhaW5lciwgW10pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcoZGVjbC5sZWZ0KTtcbiAgICAgICAgICAgICAgICAgICAgaGludC5pbm5lckhUTUwgPSB2YXJOYW1lICsgJyA9ICcgKyBzdGF0ZS5ldmFsU2NvcGUuZ2xvYmFsRXZhbCh2YXJOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaGludC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKHZhck5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IHBFbHQgPSB0aGlzLm1hcHBpbmcuZ2V0KGRlY2wpO1xuICAgICAgICAgICAgICAgICAgICAvL2lmIChwRWx0KSBwRWx0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IodmFyTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZVN0b3JlMS5zZXRTdHlsZVByb3BlcnR5KGRlY2wsICdiYWNrZ3JvdW5kQ29sb3InLCB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKHZhck5hbWUpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmdW5jID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIGZ1bmMucGFyYW1zLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcocCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFyVmFsdWUgPSBzdGF0ZS5ldmFsU2NvcGUuZ2xvYmFsRXZhbCh2YXJOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhpbnQgPSB0aGlzLmFwcGVuZEhpbnQodGhpcy5oaW50U3RhY2tDb250YWluZXIsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQuaW5uZXJIVE1MID0gdmFyTmFtZSArICcgPSAnICsgdmFyVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBoaW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IodmFyTmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHBFbHQgPSB0aGlzLm1hcHBpbmcuZ2V0KHApO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAocEVsdCkgcEVsdC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKHZhck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlU3RvcmUxLnNldFN0eWxlUHJvcGVydHkocCwgJ2JhY2tncm91bmRDb2xvcicsIHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IodmFyTmFtZSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHB1YmxpYyBmaXJlR3JpZENoYW5nZShzdGF0ZTogUHJvZ3JlbVN0YXRlKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGVuZENvZGVMaW5lKHBhcmVudDogSFRNTEVsZW1lbnQsIHBhZGRpbmc6IG51bWJlcik6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGVsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwcmVcIik7XG4gICAgICAgIGVsdC5jbGFzc0xpc3QuYWRkKCdwYWRkaW5nLScgKyBwYWRkaW5nKTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsdCk7XG5cbiAgICAgICAgcmV0dXJuIGVsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGVuZFNwYW4ocGFyZW50OiBIVE1MRWxlbWVudCwgaHRtbENsYXNzOiBzdHJpbmdbXSwgdGV4dCA9IFwiXCIpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBlbHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgaHRtbENsYXNzLmZvckVhY2goYyA9PiBlbHQuY2xhc3NMaXN0LmFkZChjKSk7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbHQpO1xuICAgICAgICBlbHQuaW5uZXJUZXh0ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIGVsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGVuZEhpbnQocGFyZW50OiBIVE1MRWxlbWVudCwgaHRtbENsYXNzOiBzdHJpbmdbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IHByZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwcmVcIik7XG4gICAgICAgIGxldCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGh0bWxDbGFzcy5mb3JFYWNoKGMgPT4gcHJlLmNsYXNzTGlzdC5hZGQoYykpO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQocHJlKTtcbiAgICAgICAgcHJlLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICByZXR1cm4gc3BhbjtcbiAgICB9XG5cbiAgICAvLyBCdWlsZCBIVE1MIEluc3BlY3RvciBieSBjcmF3bGluZyByZWN1cnNpdmVseSBBU1Qgc3RhY2tzXG4gICAgcHJpdmF0ZSB1bnN0YWNrQXN0KHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzdGFjazogQmFzZU5vZGVbXSwgcGFkZGluZzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHN0YWNrLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICBpZiAoIW5vZGUpIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBiZSBhYmxlIHRvIHNoaWZ0IGEgbnVsbCBub2RlICEnKTtcblxuICAgICAgICAgICAgbGV0IGxpbmUsIHN0YXJ0TGluZTogSFRNTEVsZW1lbnQsIGVuZExpbmUsIG4sIHZhclNwYW4sIGxlZnRTcGFuLCByaWdodFNwYW47XG4gICAgICAgICAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Jsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgQmxvY2tTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChwYXJlbnRFbGVtZW50LCBuLmJvZHksIHBhZGRpbmcgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdGdW5jdGlvbkRlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChub2RlLCBzdGFydExpbmUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobi5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmFwcGVuZFNwYW4oc3RhcnRMaW5lLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9ICdmdW5jdGlvbiAnICsgbi5pZC5uYW1lICsgJyAoICc7Ly8gKyBmdW5jLnBhcmFtcy5tYXAoeCA9PiB4Lm5hbWUpLmpvaW4oJywgJykgKyAnICkgeyc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXMuYXBwZW5kU3BhbihzdGFydExpbmUsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gJ2Z1bmN0aW9uICggJzsvLyArIGZ1bmMucGFyYW1zLm1hcCh4ID0+IHgubmFtZSkuam9pbignLCAnKSArICcgKSB7JztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJhbUNvdW50ID0gbi5wYXJhbXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBuLnBhcmFtcy5mb3JFYWNoKChwYXJhbSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBBc3RIZWxwZXIucGF0dGVyblRvU3RyaW5nKHBhcmFtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuID0gdGhpcy5hcHBlbmRTcGFuKHN0YXJ0TGluZSwgWyd2YXJJZCddLCB2YXJOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQocGFyYW0sIHNwYW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCBwYXJhbUNvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuID0gdGhpcy5hcHBlbmRTcGFuKHN0YXJ0TGluZSwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gJywgJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmFwcGVuZFNwYW4oc3RhcnRMaW5lLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MICs9ICcgKSB7JztcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QocGFyZW50RWxlbWVudCwgbi5ib2R5LmJvZHksIHBhZGRpbmcgKyAxKTtcblxuICAgICAgICAgICAgICAgICAgICBlbmRMaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgZW5kTGluZS5pbm5lckhUTUwgPSAnfSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnSWZTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBJZlN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChuLnRlc3QsIHN0YXJ0TGluZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vc3RhcnRMaW5lLmlubmVySFRNTCA9ICdpZiAoIDxzcGFuPicgKyBFc2NvZGVnZW4uZ2VuZXJhdGUoaWZzdG10LnRlc3QpICsgJzwvc3Bhbj4gKSB7JztcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMaW5lLmlubmVySFRNTCA9ICdpZiAoICc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChzdGFydExpbmUsIFtuLnRlc3RdLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMaW5lLmlubmVySFRNTCArPSAnICkgeyc7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHBhcmVudEVsZW1lbnQsIFtuLmNvbnNlcXVlbnRdLCBwYWRkaW5nKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbWlkTGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG4uYWx0ZXJuYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaWRMaW5lLmlubmVySFRNTCA9ICd9IGVsc2Ugeyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QocGFyZW50RWxlbWVudCwgW24uYWx0ZXJuYXRlXSwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlbmRMaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgZW5kTGluZS5pbm5lckhUTUwgPSAnfSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnVmFyaWFibGVEZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KG5vZGUsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9IG4ua2luZCArICcgJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KGxpbmUsIG4uZGVjbGFyYXRpb25zLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdWYXJpYWJsZURlY2xhcmF0b3InOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgIHZhclNwYW4gPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWyd2YXJJZCddKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChub2RlLCB2YXJTcGFuKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyU3Bhbi5pbm5lckhUTUwgPSBBc3RIZWxwZXIucGF0dGVyblRvU3RyaW5nKG4uaWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobi5pbml0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgW10sICcgPSAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbml0U3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ3ZhckluaXQnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QoaW5pdFNwYW4sIFtuLmluaXRdLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgW10sICc7Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnQXNzaWdubWVudEV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgICAgICAgICAgICAgbGVmdFNwYW4gPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWyd2YXJJZCddKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChub2RlLCBsZWZ0U3Bhbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChsZWZ0U3BhbiwgW24ubGVmdF0sIDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgW10sICcgPSAnKTtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsndmFySW5pdCddKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHJpZ2h0U3BhbiwgW24ucmlnaHRdLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFtdLCAnOycpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0JpbmFyeUV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBCaW5hcnlFeHByZXNzaW9uO1xuICAgICAgICAgICAgICAgICAgICBsZWZ0U3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ2xlZnRCaW4nXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChsZWZ0U3BhbiwgW24ubGVmdF0sIDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgW10sICcgJyArIG4ub3BlcmF0b3IgKyAnICcpO1xuICAgICAgICAgICAgICAgICAgICByaWdodFNwYW4gPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWydyaWdodEJpbiddKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHJpZ2h0U3BhbiwgW24ucmlnaHRdLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdFeHByZXNzaW9uU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgRXhwcmVzc2lvblN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQobm9kZSwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChsaW5lLCBbbi5leHByZXNzaW9uXSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnUmV0dXJuU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgUmV0dXJuU3RhdGVtZW50XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KG5vZGUsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9IGVzY29kZUdlbmVyYXRlKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZWZhdWx0OicsIG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsnbnN5LScgKyBub2RlLnR5cGVdLCBlc2NvZGVHZW5lcmF0ZShub2RlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQobm9kZSwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1aWxkSHRtbFRyZWUyKCkge1xuICAgICAgICBjb25zdCBjb2RlUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMucHJvZ3JlbUNvZGVMaW5lcy5wdXNoKGNvZGVSb290KTtcbiAgICAgICAgdGhpcy51bnN0YWNrQXN0KGNvZGVSb290LCBbdGhpcy5wcm9ncmVtQ29kZS5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCkuYXN0Um9vdE5vZGVdLCAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1aWxkSHRtbFRyZWUzKCk6IEVzVG9IdG1sVHJlZVN0b3JlIHtcbiAgICAgICAgY29uc3QgY29kZVJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLnByb2dyZW1Db2RlTGluZXMucHVzaChjb2RlUm9vdCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgZmFjdG9yeSA9IG5ldyBDb2RlU3Bvb2xlckVzVG9IdG1sVHJlZU1hcHBlckZhY3RvcnkodGhpcy5fZG9jdW1lbnQpO1xuICAgICAgICBsZXQgdHJlZVN0b3JlID0gZmFjdG9yeS5idWlsZCh0aGlzLnByb2dyZW1Db2RlKTtcblxuICAgICAgICB0cmVlU3RvcmUucGFpbnRJbnRvKGNvZGVSb290KTtcblxuICAgICAgICByZXR1cm4gdHJlZVN0b3JlO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGRIdG1sVHJlZSgpIHtcbiAgICAgICAgY29uc3QgY29kZVJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb25zdCBzdGFjazogQmFzZU5vZGVbXSA9IFt0aGlzLnByb2dyZW1Db2RlLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKS5hc3RSb290Tm9kZV07XG4gICAgICAgIGxldCBwYWRkaW5nID0gMDtcblxuICAgICAgICAvL3RoaXMucHJvZ3JlbUNvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbigpLmJvZHkuYm9keS5tYXAobiA9PiBzdGFjay5wdXNoKG4pKTtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoIW5vZGUpIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBiZSBhYmxlIHRvIHNoaWZ0IGEgbnVsbCBub2RlICEnKTtcbiAgICAgICAgICAgIHZhciBsaW5lO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Jsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZysrXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrLmJvZHkuc2xpY2UoMCkucmV2ZXJzZSgpLm1hcCh4ID0+IHN0YWNrLnVuc2hpZnQoeCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbmRCbG9ja1N0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBoYWNrIHRvIGNsb3NlIGFuIG9wZW5lZCBibG9ja1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nLS07XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKGNvZGVSb290LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5pbm5lckhUTUwgPSAnfSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Z1bmN0aW9uRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUoY29kZVJvb3QsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZnVuYy5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZS5pbm5lckhUTUwgPSAnZnVuY3Rpb24gJyArIGZ1bmMuaWQubmFtZSArICcgKCkgeyc7Ly8gKyBmdW5jLnBhcmFtcy5tYXAoeCA9PiB4Lm5hbWUpLmpvaW4oJywgJykgKyAnICkgeyc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9ICdmdW5jdGlvbiAoKSB7JzsvLyArIGZ1bmMucGFyYW1zLm1hcCh4ID0+IHgubmFtZSkuam9pbignLCAnKSArICcgKSB7JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHsgdHlwZTogJ0VuZEJsb2NrU3RhdGVtZW50JyB9KTsgLy8gSGFjayB0byBkZWxheSBhIGJsb2NrIGVuZFxuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KGZ1bmMuYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0lmU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlmc3RtdCA9IG5vZGUgYXMgSWZTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKGNvZGVSb290LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5pbm5lckhUTUwgPSAnaWYgKCA8c3Bhbj4nICsgZXNjb2RlR2VuZXJhdGUoaWZzdG10LnRlc3QpICsgJzwvc3Bhbj4gKSB7JztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChpZnN0bXQudGVzdCwgbGluZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlmc3RtdC5hbHRlcm5hdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoeyB0eXBlOiAnRW5kQmxvY2tTdGF0ZW1lbnQnIH0pOyAvLyBIYWNrIHRvIGRlbGF5IGEgYmxvY2sgZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KGlmc3RtdC5hbHRlcm5hdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoeyB0eXBlOiAnRWxzZUJsb2NrU3RhdGVtZW50JyB9KTsgLy8gSGFjayB0byBkZWxheSBhbiBlbHNlIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoaWZzdG10LmNvbnNlcXVlbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbHNlQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgaGFjayB0byBjbG9zZSBhbiBvcGVuZWQgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZy0tO1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShjb2RlUm9vdCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUuaW5uZXJIVE1MID0gJ30gZWxzZSB7JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUoY29kZVJvb3QsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lLnRleHRDb250ZW50ID0gZXNjb2RlR2VuZXJhdGUobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUuY2xhc3NMaXN0LmFkZCgnc3RhdGVtZW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQobm9kZSwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlIChzdGFjay5sZW5ndGggPiAwKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFByb2dyZW1JbnNwZWN0b3JWaWV3IGltcGxlbWVudHMgUHJvZ3JlbVZpZXcsIENvZGVFeGVjdXRpb25MaXN0ZW5lciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0bWxGYWN0b3J5OiBIdG1sVmVyc2VGYWN0b3J5PGFueT4pIHt9XG5cbiAgICBidWlsZFZpZXcoc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgY29sb3JlclByb2dyZW1GdW5jID0gc2NoZWR1bGVyLmdldFByb2dyZW0oKS5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk7XG4gICAgICAgIGxldCBodG1sQ29tcG9uZW50ID0gdGhpcy5odG1sRmFjdG9yeS5idWlsZChjb2xvcmVyUHJvZ3JlbUZ1bmMpO1xuICAgICAgICByZXR1cm4gaHRtbENvbXBvbmVudDtcbiAgICB9XG4gICAgXG4gICAgZmlyZUNvZGVFeGVjdXRpb24oc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuXG4gICAgfVxuXG4gICAgZmlyZUdyaWRDaGFuZ2Uoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuXG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBCYXNlTm9kZSwgQmxvY2tTdGF0ZW1lbnQsIEZ1bmN0aW9uRGVjbGFyYXRpb24sIElmU3RhdGVtZW50LCBWYXJpYWJsZURlY2xhcmF0aW9uLCBWYXJpYWJsZURlY2xhcmF0b3IsIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBFeHByZXNzaW9uU3RhdGVtZW50LCBSZXR1cm5TdGF0ZW1lbnQgfSBmcm9tIFwiZXN0cmVlXCI7XG5pbXBvcnQgeyBBc3RIZWxwZXIgfSBmcm9tIFwiLi9Bc3RIZWxwZXJcIjtcbmltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcbmltcG9ydCB7IFByb2dyZW1Db2RlIH0gZnJvbSBcIi4vVHlwZXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBFc1RvSHRtbFRyZWVTdG9yZSB7XG4gICAgcGFpbnRJbnRvKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZFxuICAgIHN0eWxlQ2xhc3NlcygpOiBzdHJpbmdbXVxuICAgIGFkZFN0eWxlQ2xhc3Nlcyhub2RlOiBCYXNlTm9kZSwgY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkXG4gICAgcmVtb3ZlU3R5bGVDbGFzc2VzKGNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZFxuICAgIHNldFN0eWxlUHJvcGVydHkobm9kZTogQmFzZU5vZGUsIHByb3BOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkXG4gICAgcmVzZXRTdHlsZSgpOiB2b2lkXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXNUb0h0bWxUcmVlU3RvcmVGYWN0b3J5IHtcbiAgICBidWlsZChjb2RlOiBQcm9ncmVtQ29kZTxhbnk+KTogRXNUb0h0bWxUcmVlU3RvcmVcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFc1RvSHRtbEZhY3Rvcnk8VCBleHRlbmRzIEJhc2VOb2RlPiB7XG4gICAgYnVpbGQobm9kZTogVCwgY29udGFpbmVyOiBIVE1MRWxlbWVudFtdKTogTWFwPEJhc2VOb2RlLCBIVE1MRWxlbWVudD47XG59XG5cbmV4cG9ydCBjbGFzcyBGdW5jdGlvbkRlY2xhcmF0aW9uVG9IdG1sVHJlZVN0b3JlIGltcGxlbWVudHMgRXNUb0h0bWxUcmVlU3RvcmUge1xuXG4gICAgcHJpdmF0ZSBiYWNraW5nTWFwOiBNYXA8QmFzZU5vZGUsIEhUTUxFbGVtZW50PiA9IG5ldyBNYXAoKTtcbiAgICBwcml2YXRlIGFkZGVkQ2xhc3NlczogTWFwPEJhc2VOb2RlLCBzdHJpbmdbXT4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBhZGRlZFN0eWxlUHJvcHM6IE1hcDxCYXNlTm9kZSwgc3RyaW5nW10+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmdW5jOiBGdW5jdGlvbkRlY2xhcmF0aW9uLCBwcml2YXRlIGh0bWxGYWN0b3J5OiBFc1RvSHRtbEZhY3Rvcnk8RnVuY3Rpb25EZWNsYXJhdGlvbj4pIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBbXTtcbiAgICAgICAgbGV0IG1hcHBpbmcgPSBodG1sRmFjdG9yeS5idWlsZChmdW5jLCB0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIGxldCBpdGVyYXRvciA9IG1hcHBpbmcuZW50cmllcygpO1xuICAgICAgICBsZXQgZW50cnkgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIHdoaWxlKCFlbnRyeS5kb25lKSB7XG4gICAgICAgICAgICBsZXQgdmFsID0gZW50cnkudmFsdWU7XG4gICAgICAgICAgICB0aGlzLmJhY2tpbmdNYXAuc2V0KHZhbFswXSwgdmFsWzFdKTtcbiAgICAgICAgICAgIGVudHJ5ID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGFpbnRJbnRvKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGUpO1xuICAgICAgICB9KVxuICAgIH0gICAgXG4gICAgXG4gICAgc3R5bGVDbGFzc2VzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgbGV0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gdGhpcy5iYWNraW5nTWFwLnZhbHVlcygpO1xuICAgICAgICBsZXQgcmVzID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICB3aGlsZSghcmVzLmRvbmUpIHtcbiAgICAgICAgICAgIGxldCBlbHQgPSByZXMudmFsdWU7XG4gICAgICAgICAgICBlbHQuY2xhc3NMaXN0LmZvckVhY2goYyA9PiByZXN1bHQucHVzaChjKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHNldFN0eWxlUHJvcGVydHkobm9kZTogQmFzZU5vZGUsIHByb3BOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgbGV0IGVsdCA9IHRoaXMuYmFja2luZ01hcC5nZXQobm9kZSk7XG4gICAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgICAgIGVsdC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wTmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5hZGRlZFN0eWxlUHJvcHMuc2V0KG5vZGUsIFtwcm9wTmFtZSwgdmFsdWVdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFN0eWxlQ2xhc3Nlcyhub2RlOiBCYXNlTm9kZSwgY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgbGV0IGVsdCA9IHRoaXMuYmFja2luZ01hcC5nZXQobm9kZSk7XG4gICAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGNsYXNzZXMuZm9yRWFjaChjID0+IGVsdC5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgICAgIHRoaXMuYWRkZWRDbGFzc2VzLnNldChub2RlLCBjbGFzc2VzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVN0eWxlQ2xhc3NlcyhjbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICAvLyBGSVhNRSBjbGVhbiB0aGUgdGhpcy5hZGRlZENsYXNzZXMgbWFwXG4gICAgICAgIGxldCBpdGVyYXRvciA9IHRoaXMuYWRkZWRDbGFzc2VzLmVudHJpZXMoKTtcbiAgICAgICAgbGV0IGVudHJ5ID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICB3aGlsZSghZW50cnkuZG9uZSkge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBlbnRyeS52YWx1ZVswXTtcbiAgICAgICAgICAgIGxldCBjbGFzc2VzID0gZW50cnkudmFsdWVbMV07XG4gICAgICAgICAgICBsZXQgZWx0ID0gdGhpcy5iYWNraW5nTWFwLmdldChub2RlKTtcbiAgICAgICAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5mb3JFYWNoKCBjID0+IGVsdC5jbGFzc0xpc3QucmVtb3ZlKGMpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW50cnkgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldFN0eWxlKCk6IHZvaWQge1xuICAgICAgICBsZXQgaXRlcmF0b3IgPSB0aGlzLmFkZGVkQ2xhc3Nlcy5lbnRyaWVzKCk7XG4gICAgICAgIGxldCBlbnRyeSA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgd2hpbGUoIWVudHJ5LmRvbmUpIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gZW50cnkudmFsdWVbMF07XG4gICAgICAgICAgICBsZXQgY2xhc3NlcyA9IGVudHJ5LnZhbHVlWzFdO1xuICAgICAgICAgICAgbGV0IGVsdCA9IHRoaXMuYmFja2luZ01hcC5nZXQobm9kZSk7XG4gICAgICAgICAgICBpZiAoZWx0KSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIGNsYXNzZXMuZm9yRWFjaCggYyA9PiBlbHQuY2xhc3NMaXN0LnJlbW92ZShjKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVudHJ5ID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZGRlZFN0eWxlUHJvcHMuZW50cmllcygpO1xuICAgICAgICBlbnRyeSA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgd2hpbGUoIWVudHJ5LmRvbmUpIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gZW50cnkudmFsdWVbMF07XG4gICAgICAgICAgICBsZXQgcHJvcE5hbWUgPSBlbnRyeS52YWx1ZVsxXVswXTtcbiAgICAgICAgICAgIGxldCBlbHQgPSB0aGlzLmJhY2tpbmdNYXAuZ2V0KG5vZGUpO1xuICAgICAgICAgICAgaWYgKGVsdCkge1xuICAgICAgICAgICAgICAgIGVsdC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShwcm9wTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbnRyeSA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgRnVuY3Rpb25TcG9vbGVyRXNUb0h0bWxGYWN0b3J5IGltcGxlbWVudHMgRXNUb0h0bWxGYWN0b3J5PEZ1bmN0aW9uRGVjbGFyYXRpb24+IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RvY3VtZW50OiBEb2N1bWVudCkge31cblxuICAgIHByaXZhdGUgYXBwZW5kQ29kZUxpbmUocGFyZW50OiBIVE1MRWxlbWVudCwgcGFkZGluZzogbnVtYmVyKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgZWx0ID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInByZVwiKTtcbiAgICAgICAgZWx0LmNsYXNzTGlzdC5hZGQoJ3BhZGRpbmctJyArIHBhZGRpbmcpO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWx0KTtcblxuICAgICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwZW5kU3BhbihwYXJlbnQ6IEhUTUxFbGVtZW50LCBodG1sQ2xhc3M6IHN0cmluZ1tdLCB0ZXh0ID0gXCJcIik6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGVsdCA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBodG1sQ2xhc3MuZm9yRWFjaChjID0+IGVsdC5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsdCk7XG4gICAgICAgIGVsdC5pbm5lclRleHQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwZW5kSGludChwYXJlbnQ6IEhUTUxFbGVtZW50LCBodG1sQ2xhc3M6IHN0cmluZ1tdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgcHJlID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInByZVwiKTtcbiAgICAgICAgbGV0IHNwYW4gPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgaHRtbENsYXNzLmZvckVhY2goYyA9PiBwcmUuY2xhc3NMaXN0LmFkZChjKSk7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChwcmUpO1xuICAgICAgICBwcmUuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIHJldHVybiBzcGFuO1xuICAgIH1cblxuICAgIC8vIEJ1aWxkIEhUTUwgSW5zcGVjdG9yIGJ5IGNyYXdsaW5nIHJlY3Vyc2l2ZWx5IEFTVCBzdGFja3NcbiAgICBwcml2YXRlIHVuc3RhY2tBc3QocGFyZW50RWxlbWVudDogSFRNTEVsZW1lbnQsIHN0YWNrOiBCYXNlTm9kZVtdLCBtYXBwaW5nOiBNYXA8QmFzZU5vZGUsIEhUTUxFbGVtZW50PiwgcGFkZGluZzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHN0YWNrLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICBpZiAoIW5vZGUpIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBiZSBhYmxlIHRvIHNoaWZ0IGEgbnVsbCBub2RlICEnKTtcblxuICAgICAgICAgICAgbGV0IGxpbmUsIHN0YXJ0TGluZTogSFRNTEVsZW1lbnQsIGVuZExpbmUsIG4sIHZhclNwYW4sIGxlZnRTcGFuLCByaWdodFNwYW47XG4gICAgICAgICAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Jsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgQmxvY2tTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChwYXJlbnRFbGVtZW50LCBuLmJvZHksIG1hcHBpbmcsIHBhZGRpbmcgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdGdW5jdGlvbkRlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwcGluZy5zZXQobm9kZSwgc3RhcnRMaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgLy9tYXBwaW5nLnNldChub2RlLCBwYXJlbnRFbGVtZW50KTsgLy8gSGFjazogbWFwIHRoZSBmdW5jdGlvbiBjb250YWluZXIgdG8gdGhlIGNvbnRhaW5lciBvZiB0aGUgZnVuY3Rpb24gXG4gICAgICAgICAgICAgICAgICAgIGlmIChuLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXMuYXBwZW5kU3BhbihzdGFydExpbmUsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gJ2Z1bmN0aW9uICcgKyBuLmlkLm5hbWUgKyAnICggJzsvLyArIGZ1bmMucGFyYW1zLm1hcCh4ID0+IHgubmFtZSkuam9pbignLCAnKSArICcgKSB7JztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuID0gdGhpcy5hcHBlbmRTcGFuKHN0YXJ0TGluZSwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnZnVuY3Rpb24gKCAnOy8vICsgZnVuYy5wYXJhbXMubWFwKHggPT4geC5uYW1lKS5qb2luKCcsICcpICsgJyApIHsnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmFtQ291bnQgPSBuLnBhcmFtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIG4ucGFyYW1zLmZvckVhY2goKHBhcmFtLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFyTmFtZSA9IEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcocGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmFwcGVuZFNwYW4oc3RhcnRMaW5lLCBbJ3ZhcklkJ10sIHZhck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwcGluZy5zZXQocGFyYW0sIHNwYW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCBwYXJhbUNvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuID0gdGhpcy5hcHBlbmRTcGFuKHN0YXJ0TGluZSwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gJywgJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmFwcGVuZFNwYW4oc3RhcnRMaW5lLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MICs9ICcgKSB7JztcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QocGFyZW50RWxlbWVudCwgbi5ib2R5LmJvZHksIG1hcHBpbmcsIHBhZGRpbmcgKyAxKTtcblxuICAgICAgICAgICAgICAgICAgICBlbmRMaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgZW5kTGluZS5pbm5lckhUTUwgPSAnfSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnSWZTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBJZlN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwcGluZy5zZXQobi50ZXN0LCBzdGFydExpbmUpO1xuICAgICAgICAgICAgICAgICAgICAvL3N0YXJ0TGluZS5pbm5lckhUTUwgPSAnaWYgKCA8c3Bhbj4nICsgRXNjb2RlZ2VuLmdlbmVyYXRlKGlmc3RtdC50ZXN0KSArICc8L3NwYW4+ICkgeyc7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0TGluZS5pbm5lckhUTUwgPSAnaWYgKCAnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3Qoc3RhcnRMaW5lLCBbbi50ZXN0XSwgbWFwcGluZywgMCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0TGluZS5pbm5lckhUTUwgKz0gJyApIHsnO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChwYXJlbnRFbGVtZW50LCBbbi5jb25zZXF1ZW50XSwgbWFwcGluZywgcGFkZGluZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG1pZExpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChuLmFsdGVybmF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWlkTGluZS5pbm5lckhUTUwgPSAnfSBlbHNlIHsnO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHBhcmVudEVsZW1lbnQsIFtuLmFsdGVybmF0ZV0sIG1hcHBpbmcsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZW5kTGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGVuZExpbmUuaW5uZXJIVE1MID0gJ30nO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1ZhcmlhYmxlRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwcGluZy5zZXQobm9kZSwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUuaW5uZXJIVE1MID0gbi5raW5kICsgJyAnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QobGluZSwgbi5kZWNsYXJhdGlvbnMsIG1hcHBpbmcsIDApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1ZhcmlhYmxlRGVjbGFyYXRvcic6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgdmFyU3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ3ZhcklkJ10pO1xuICAgICAgICAgICAgICAgICAgICBtYXBwaW5nLnNldChub2RlLCB2YXJTcGFuKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyU3Bhbi5pbm5lckhUTUwgPSBBc3RIZWxwZXIucGF0dGVyblRvU3RyaW5nKG4uaWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobi5pbml0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgW10sICcgPSAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbml0U3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ3ZhckluaXQnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QoaW5pdFNwYW4sIFtuLmluaXRdLCBtYXBwaW5nLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgW10sICc7Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnQXNzaWdubWVudEV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcbiAgICAgICAgICAgICAgICAgICAgbGVmdFNwYW4gPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWyd2YXJJZCddKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwcGluZy5zZXQobm9kZSwgbGVmdFNwYW4pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QobGVmdFNwYW4sIFtuLmxlZnRdLCBtYXBwaW5nLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFtdLCAnID0gJyk7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0U3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ3ZhckluaXQnXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChyaWdodFNwYW4sIFtuLnJpZ2h0XSwgbWFwcGluZywgMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbXSwgJzsnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdCaW5hcnlFeHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgQmluYXJ5RXhwcmVzc2lvbjtcbiAgICAgICAgICAgICAgICAgICAgbGVmdFNwYW4gPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWydsZWZ0QmluJ10pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QobGVmdFNwYW4sIFtuLmxlZnRdLCBtYXBwaW5nLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFtdLCAnICcgKyBuLm9wZXJhdG9yICsgJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsncmlnaHRCaW4nXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChyaWdodFNwYW4sIFtuLnJpZ2h0XSwgbWFwcGluZywgMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnRXhwcmVzc2lvblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIEV4cHJlc3Npb25TdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBtYXBwaW5nLnNldChub2RlLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KGxpbmUsIFtuLmV4cHJlc3Npb25dLCBtYXBwaW5nLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdSZXR1cm5TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBSZXR1cm5TdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIG1hcHBpbmcuc2V0KG5vZGUsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9IGVzY29kZUdlbmVyYXRlKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2RlZmF1bHQ6Jywgbm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWyduc3ktJyArIG5vZGUudHlwZV0sIGVzY29kZUdlbmVyYXRlKG5vZGUpKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwcGluZy5zZXQobm9kZSwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBidWlsZChub2RlOiBGdW5jdGlvbkRlY2xhcmF0aW9uLCBjb250YWluZXI6IEhUTUxFbGVtZW50W10pOiBNYXA8QmFzZU5vZGUsIEhUTUxFbGVtZW50PiB7XG4gICAgICAgIGNvbnN0IGNvZGVSb290ID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBtYXBwaW5nID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnVuc3RhY2tBc3QoY29kZVJvb3QsIFtub2RlXSwgbWFwcGluZywgMCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ21hcHBpbmc6JywgbWFwcGluZyk7XG4gICAgICAgIGxldCBjaGlsZEl0ID0gY29kZVJvb3QuY2hpbGRyZW47XG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgY2hpbGRJdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29udGFpbmVyLnB1c2goPEhUTUxFbGVtZW50PiBjaGlsZEl0W2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwcGluZztcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBjbGFzcyBDb2RlU3Bvb2xlckVzVG9IdG1sVHJlZU1hcHBlckZhY3RvcnkgaW1wbGVtZW50cyBFc1RvSHRtbFRyZWVTdG9yZUZhY3Rvcnkge1xuICAgIFxuICAgIHByaXZhdGUgaHRtbEZhY3Rvcnk6IEVzVG9IdG1sRmFjdG9yeTxhbnk+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50KSB7XG4gICAgICAgIHRoaXMuaHRtbEZhY3RvcnkgPSBuZXcgRnVuY3Rpb25TcG9vbGVyRXNUb0h0bWxGYWN0b3J5KF9kb2N1bWVudCk7XG4gICAgfVxuXG4gICAgYnVpbGQoY29kZTogUHJvZ3JlbUNvZGU8YW55Pik6IEVzVG9IdG1sVHJlZVN0b3JlIHtcbiAgICAgICAgbGV0IHN0b3JlID0gbmV3IEZ1bmN0aW9uRGVjbGFyYXRpb25Ub0h0bWxUcmVlU3RvcmUoY29kZS5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCkuYXN0Um9vdE5vZGUsIHRoaXMuaHRtbEZhY3RvcnkpO1xuICAgICAgICByZXR1cm4gc3RvcmU7XG4gICAgfVxuICAgIFxufSIsImltcG9ydCB7IFN0eWxlRGVjb3JhdG9yIH0gZnJvbSBcIi4vVHlwZXNcIjtcbmltcG9ydCB7IEJhc2VOb2RlLCBWYXJpYWJsZURlY2xhcmF0b3IsIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBJZGVudGlmaWVyIH0gZnJvbSBcImVzdHJlZVwiO1xuaW1wb3J0IHsgQXN0SGVscGVyIH0gZnJvbSBcIi4vQXN0SGVscGVyXCI7XG5pbXBvcnQgeyBjcmVhdGUgYXMgbWQ1Q3JlYXRlIH0gZnJvbSAnanMtbWQ1JztcblxuZXhwb3J0IGNsYXNzIENvbG9yVmVyc2VWYXJpYWJsZURlY29yYXRvciBpbXBsZW1lbnRzIFN0eWxlRGVjb3JhdG9yPEJhc2VOb2RlPiB7XG5cbiAgICBwcml2YXRlIHZhcmlhYmxlTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuXG4gICAgZGVjb3JhdGUobm9kZTogQmFzZU5vZGUsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGxldCB2YXJJZDtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRvcicpIHtcbiAgICAgICAgICAgIGxldCBuID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0b3I7XG4gICAgICAgICAgICB2YXJJZCA9IEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcobi5pZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJykge1xuICAgICAgICAgICAgbGV0IG4gPSBub2RlIGFzIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuICAgICAgICAgICAgdmFySWQgPSBBc3RIZWxwZXIucGF0dGVyblRvU3RyaW5nKG4ubGVmdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0lkZW50aWZpZXInKSB7XG4gICAgICAgICAgICBsZXQgbiA9IG5vZGUgYXMgSWRlbnRpZmllcjtcbiAgICAgICAgICAgIHZhcklkID0gbi5uYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhcklkKSB7XG4gICAgICAgICAgICBsZXQgdmFySW5kZXggPSB0aGlzLnZhcmlhYmxlTWFwLmdldCh2YXJJZCk7XG4gICAgICAgICAgICBpZiAoIXZhckluZGV4KSB7XG4gICAgICAgICAgICAgICAgdmFySW5kZXggPSB0aGlzLnZhcmlhYmxlTWFwLnNpemUgKyAxO1xuICAgICAgICAgICAgICAgIHRoaXMudmFyaWFibGVNYXAuc2V0KHZhcklkLCB2YXJJbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndmFyaWFibGUtJyArIHZhckluZGV4KTtcbiAgICAgICAgfVxuICAgIH0gICAgXG4gICAgXG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBzdHlsZSA9ICcnO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCd2YXJpYWJsZSBjb3VudDonLCB0aGlzLnZhcmlhYmxlTWFwLnNpemUpO1xuICAgICAgICB0aGlzLnZhcmlhYmxlTWFwLmZvckVhY2goKGluZGV4LCBpZCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5oYXNoU3RyaW5nVG9Db2xvcihpZCwgdGhpcy52YXJpYWJsZU1hcC5zaXplKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2J1aWxkaW5nIGNvbG9yICMnLCBpZCwgJz0+JywgY29sb3IpO1xuICAgICAgICAgICAgc3R5bGUgKz0gYFxuICAgICAgICAgICAgICAgIC52YXJpYWJsZS0ke2luZGV4fSAudmFyaWFibGUtaWQsIC5mdW5jLXN0YXJ0IC52YXJpYWJsZS0ke2luZGV4fSB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGA7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGNvbG9yTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuXG4gICAgcHJpdmF0ZSBoc2xDb2xvcihodWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnaHNsKCcgKyBodWUgKyAnLCAxMDAlLCA4MCUpJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhc2hTdHJpbmdUb0NvbG9yKGtleTogc3RyaW5nLCBjb2xvckNvdW50OiBudW1iZXIgPSAxMiwgc2hpZnQ6IG51bWJlciA9IDIpIHtcbiAgICAgICAgdmFyIGh1ZSA9IHRoaXMuY29sb3JNYXAuZ2V0KGtleSk7XG4gICAgICAgIGlmIChodWUpIHJldHVybiB0aGlzLmhzbENvbG9yKGh1ZSk7XG5cbiAgICAgICAgdmFyIGhhc2ggPSBtZDVDcmVhdGUoKS51cGRhdGUoa2V5KS50b1N0cmluZygpO1xuICAgICAgICBcbiAgICAgICAgaHVlID0gKCBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDAsIHNoaWZ0ICsgMSksIDE2KSArIDE2ICogcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAxLCBzaGlmdCArIDIpLCAxNikgKyAyNTYgKiBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDIsIHNoaWZ0ICsgMyksIDE2KSApO1xuICAgICAgICBodWUgPSBNYXRoLmZsb29yKGh1ZSAlIGNvbG9yQ291bnQpICogMzYwIC8gY29sb3JDb3VudDtcbiAgICAgICAgaHVlID0gaHVlICUgMzYwO1xuXG4gICAgICAgIC8vIENvbG9yIGRlZHVwbGljYXRpb25cbiAgICAgICAgd2hpbGUgKCF0aGlzLmNvbG9yTWFwLmdldChrZXkpKSB7XG4gICAgICAgICAgICBsZXQgZHVwbGljYXRlQ29sb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGMgb2YgdGhpcy5jb2xvck1hcC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhjIC0gaHVlKSA8IE1hdGguZmxvb3IoMTgwIC8gY29sb3JDb3VudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZHVwbGljYXRlQ29sb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBodWUgKz0gTWF0aC5mbG9vcigyNzAgLyBjb2xvckNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgaHVlID0gaHVlICUgMzYwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWR1cGxpY2F0ZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvck1hcC5zZXQoa2V5LCBodWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL3ZhciBwYXN0ZWwgPSAnaHNsKCcgKyBodWUgKyAnLCAxMDAlLCA4Ny41JSknO1xuICAgICAgICByZXR1cm4gdGhpcy5oc2xDb2xvcihodWUpO1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgUGFkVmVyc2VEZWNvcmF0b3IgaW1wbGVtZW50cyBTdHlsZURlY29yYXRvcjxCYXNlTm9kZT4ge1xuXG4gICAgZGVjb3JhdGUobm9kZTogQmFzZU5vZGUsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdCbG9ja1N0YXRlbWVudCcpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY29kZS1wYWRkaW5nJylcbiAgICAgICAgfVxuICAgIH0gICAgXG4gICAgXG4gICAgYnVpbGRTdHlsZVNoZWV0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgIC5jb2RlLXBhZGRpbmcge1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDMycHg7XG4gICAgICAgIH1cblxuICAgICAgICAuYmxvY2sge1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIH1cblxuICAgICAgICAuc3RhdGVtZW50LCAuZGVjbGFyYXRpb24ge1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIH1cbiAgICAgICAgYDtcbiAgICB9XG5cbn1cbiIsIlxuaW1wb3J0IHsgUHJvZ3JhbSwgcGFyc2VNb2R1bGUgfSBmcm9tICdlc3ByaW1hJztcbmltcG9ydCB7IHdhbGsgYXMgZXNwcmltYVdhbGsgfSBmcm9tICdlc3ByaW1hLXdhbGsnO1xuaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgQmFzZU5vZGUsIEZ1bmN0aW9uRGVjbGFyYXRpb24sIEJsb2NrU3RhdGVtZW50LCBJZlN0YXRlbWVudCwgUmV0dXJuU3RhdGVtZW50LCBTdGF0ZW1lbnQgfSBmcm9tICdlc3RyZWUnO1xuaW1wb3J0IHsgUHJvZ3JlbVN0YXRlIH0gZnJvbSAnLi9TY2hlZHVsaW5nU2VydmljZSc7XG5pbXBvcnQgeyBWZXJzZUluc3RydWN0aW9uRmFjdG9yeSwgUHJvZ3JlbUNvZGVGYWN0b3J5LCBQcm9ncmVtQ29kZSB9IGZyb20gJy4vVHlwZXMnO1xuaW1wb3J0IHsgRXNwcmltYVZlcnNlSXRlcmFvciwgRXNwcmltYVZlcnNlSW5zdHJ1Y3Rpb24gfSBmcm9tICcuL0VzcHJpbWFUeXBlcyc7XG4vKlxuZXhwb3J0IGNsYXNzIENvZGVTdGF0ZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgbm9kZTogQmFzZU5vZGUsXG4gICAgICAgIC8vcHVibGljIGNvZGU6IHN0cmluZ1xuICAgICkge307XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29kZVN0YXRlbWVudEZhY3Rvcnk8VD4ge1xuICAgIGJ1aWxkKHBhcmFtOiBUKTogQ29kZVN0YXRlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2RlSXRlcmF0b3Ige1xuICAgIGV4ZWN1dGVOZXh0KCk6IENvZGVTdGF0ZW1lbnQ7XG4gICAgaGFzTmV4dCgpOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1Db2RlIHtcbiAgICBpbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpOiBGdW5jdGlvbkRlY2xhcmF0aW9uXG4gICAgY29sb3JlclByb2dyZW1GdW5jdGlvbigpOiBGdW5jdGlvbkRlY2xhcmF0aW9uXG4gICAgaXRlcmF0b3Ioc3RhdGU6IFByb2dyZW1TdGF0ZSk6IENvZGVJdGVyYXRvcjtcbn1cblxuY2xhc3MgRXNwcmltYUNvZGVTdGF0ZW1lbnRGYWN0b3J5IGltcGxlbWVudHMgVmVyc2VJbnN0cnVjdGlvbkZhY3Rvcnk8QmFzZU5vZGU+IHtcblxuICAgIGJ1aWxkKHBhcmFtOiBCYXNlTm9kZSk6IEVzcHJpbWFWZXJzZUluc3RydWN0aW9uIHtcbiAgICAgICAgaWYgKHBhcmFtKSBcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXNwcmltYVZlcnNlSW5zdHJ1Y3Rpb24ocGFyYW0pO1xuICAgICAgICBcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gYnVpbGQgbm9uIHN0YXRlbWVudCBjb2RlICEnKTtcbiAgICB9XG59XG4qL1xuXG5jbGFzcyBCYXNpY0VzcHJpbWFDb2RlSXRlcmF0b3IgaW1wbGVtZW50cyBFc3ByaW1hVmVyc2VJdGVyYW9yIHtcblxuICAgIHByaXZhdGUgc3RhY2s6IEJhc2VOb2RlW10gPSBbXTtcbiAgICBwcml2YXRlIHJldHVyblZhbHVlOiBhbnkgPSBudWxsO1xuICAgIHByaXZhdGUgZmluaXNoZWQgPSBmYWxzZVxuICAgIHByaXZhdGUgdmVyc2VGYWN0b3J5ID0gbmV3IEVzcHJpbWFWZXJzZUluc3RydWN0aW9uRmFjdG9yeSgpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgICAgICBwcml2YXRlIHJvb3ROb2RlOiBCYXNlTm9kZSwgXG4gICAgICAgICAgICBwcml2YXRlIHN0YXRlOiBQcm9ncmVtU3RhdGUpIHtcbiAgICAgICAgdGhpcy5zdGFjay5wdXNoKHJvb3ROb2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlY2xhcmVQcm9ncmVtQXJndW1lbnRzKCkge1xuICAgICAgICBsZXQgX2NvbG9ubmUgPSB0aGlzLnN0YXRlLmNvbG9ubmU7XG4gICAgICAgIGxldCBfbGlnbmUgPSB0aGlzLnN0YXRlLmxpZ25lO1xuICAgICAgICBsZXQgX2NvbnRleHRlID0gdGhpcy5zdGF0ZS5jb250ZXh0ZTtcblxuICAgICAgICB0aGlzLnN0YXRlLmV2YWwoJ3ZhciBjb2xvbm5lID0gJyArIF9jb2xvbm5lICsgJywgbGlnbmUgPSAnICsgX2xpZ25lICsgJzsnKTtcbiAgICAgICAgdGhpcy5zdGF0ZS5ldmFsKCd2YXIgY29udGV4dGUgPSAnICsgSlNPTi5zdHJpbmdpZnkoX2NvbnRleHRlKSk7XG4gICAgfVxuXG4gICAgZXhlY3V0ZU5leHQoKTogRXNwcmltYVZlcnNlSW5zdHJ1Y3Rpb24ge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGZpcnN0IG5vZGUgb24gdGhlIHN0YWNrXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuc3RhY2suc2hpZnQoKTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnTm9kZTonLCBub2RlKTtcblxuICAgICAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGFjayBzaG91bGQgbm90IGJlIGVtcHR5ICEnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHN0bXQ7XG5cbiAgICAgICAgICAgIHN3aXRjaChub2RlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdGdW5jdGlvbkRlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZ1bmMgPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdChmdW5jLmJvZHkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY2xhcmVQcm9ncmVtQXJndW1lbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZlcnNlRmFjdG9yeS5idWlsZChmdW5jKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdCbG9ja1N0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9jayA9IG5vZGUgYXMgQmxvY2tTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrLmJvZHkuc2xpY2UoKS5yZXZlcnNlKCkubWFwKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnQmxvY2tTdGF0ZW1lbnQgdW5zaGlmdGluZzonLCB4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdCh4KVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdJZlN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIHN0bXQgPSBub2RlIGFzIElmU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdENvZGUgPSBlc2NvZGVHZW5lcmF0ZShzdG10LnRlc3QpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0UmVzdWx0ID0gdGhpcy5zdGF0ZS5ldmFsKHRlc3RDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnSWZTdGF0ZW1lbnQgdGVzdCBldmFsdWF0ZSB0bzogJywgdGVzdFJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXN0UmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdUaGVuIHVuc2hpZnRpbmc6Jywgc3RtdC5jb25zZXF1ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdChzdG10LmNvbnNlcXVlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0bXQuYWx0ZXJuYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnRWxzZSB1bnNoaWZ0aW5nOicsIHN0bXQuYWx0ZXJuYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoc3RtdC5hbHRlcm5hdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmVyc2VGYWN0b3J5LmJ1aWxkKHN0bXQudGVzdCk7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdSZXR1cm5TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBzdG10ID0gbm9kZSBhcyBSZXR1cm5TdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV0dXJuVmFsdWUgPSB0aGlzLnN0YXRlLmV2YWwoZXNjb2RlR2VuZXJhdGUoc3RtdC5hcmd1bWVudCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmVyc2VGYWN0b3J5LmJ1aWxkKHN0bXQpO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnTm9kZTonLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvZGUgPSBlc2NvZGVHZW5lcmF0ZShub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnR2VuZXJhdGVkIGNvZGU6JywgY29kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBldmFsUmVzdWx0ID0gdGhpcy5zdGF0ZS5ldmFsKGNvZGUpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdFdmFsdWF0ZSB0bzonLCBldmFsUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmVyc2VGYWN0b3J5LmJ1aWxkKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICh0aGlzLnN0YWNrLmxlbmd0aCA+IDApO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSXRlcmF0b3IgaGFzIG5vIG1vcmUgY29kZSB0byBleGVjdXRlICEnKTtcbiAgICB9ICAgIFxuICAgIFxuICAgIGhhc05leHQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbm9kZXMgPSB0aGlzLnN0YWNrLnNsaWNlKDApO1xuICAgICAgICB3aGlsZSAobm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBub2Rlcy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS50eXBlICE9PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9ja3M6IEJsb2NrU3RhdGVtZW50W10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tzLnB1c2goYmxvY2spO1xuICAgICAgICAgICAgICAgICAgICAvLyBQYXJzb3VycyByZWN1cnNpdmVtZW50IGxlcyBibG9ja3Mgw6AgbGEgcmVjaGVyY2hlIGRlIG5vZXVkIHF1aSBuZSBzb250IHBhcyBkZXMgYmxvY2tzXG4gICAgICAgICAgICAgICAgICAgIGxldCBoYXNOZXh0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghaGFzTmV4dCAmJiBibG9ja3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGIgPSBibG9ja3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYi5ib2R5Lm1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHgudHlwZSAhPT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzTmV4dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja3MucHVzaCh4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNOZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgY2xhc3MgRXNwcmltYVByb2dyZW1Db2RlIGltcGxlbWVudHMgUHJvZ3JlbUNvZGU8QmFzZU5vZGU+IHtcblxuICAgIHByaXZhdGUgZXNwcmltYVByb2dyYW06IFByb2dyYW07XG4gICAgcHJpdmF0ZSB2ZXJzZUZhY3RvcnkgPSBuZXcgRXNwcmltYVZlcnNlSW5zdHJ1Y3Rpb25GYWN0b3J5KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5lc3ByaW1hUHJvZ3JhbSA9IHBhcnNlTW9kdWxlKGNvZGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpOiBFc3ByaW1hVmVyc2VJbnN0cnVjdGlvbiB7XG4gICAgICAgIHZhciByZXN1bHQ6IEZ1bmN0aW9uRGVjbGFyYXRpb24gfCBudWxsID0gbnVsbDtcbiAgICAgICAgZXNwcmltYVdhbGsodGhpcy5lc3ByaW1hUHJvZ3JhbSwgbm9kZSA9PiB7XG4gICAgICAgICAgICBpZiggbm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicgJiYgbm9kZS5pZCAmJiBub2RlLmlkLm5hbWUgPT09ICdpbml0aWFsaXNlclByb2dyZW0nICkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gKTtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmVyc2VGYWN0b3J5LmJ1aWxkKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBvc3NpYmxlIGRlIHRyb3V2ZXIgdW5lIGZvbmN0aW9uIGNvbG9yZXJQcm9ncmVtKCkgIScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk6IEVzcHJpbWFWZXJzZUluc3RydWN0aW9uIHtcbiAgICAgICAgdmFyIHJlc3VsdDogRnVuY3Rpb25EZWNsYXJhdGlvbiB8IG51bGwgPSBudWxsO1xuICAgICAgICBlc3ByaW1hV2Fsayh0aGlzLmVzcHJpbWFQcm9ncmFtLCBub2RlID0+IHtcbiAgICAgICAgICAgIGlmKCBub2RlLnR5cGUgPT09ICdGdW5jdGlvbkRlY2xhcmF0aW9uJyAmJiBub2RlLmlkICYmIG5vZGUuaWQubmFtZSA9PT0gJ2NvbG9yZXJQcm9ncmVtJyApIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ICk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZlcnNlRmFjdG9yeS5idWlsZChyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW1wb3NzaWJsZSBkZSB0cm91dmVyIHVuZSBmb25jdGlvbiBjb2xvcmVyUHJvZ3JlbSgpICEnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXRlcmF0b3Ioc3RhdGU6IFByb2dyZW1TdGF0ZSk6IEVzcHJpbWFWZXJzZUl0ZXJhb3Ige1xuICAgICAgICByZXR1cm4gbmV3IEJhc2ljRXNwcmltYUNvZGVJdGVyYXRvcih0aGlzLmNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKS5hc3RSb290Tm9kZSwgc3RhdGUpO1xuICAgIH1cbn1cblxuY2xhc3MgRXNwcmltYVByb2dyZW1Db2RlRmFjdG9yeSBpbXBsZW1lbnRzIFByb2dyZW1Db2RlRmFjdG9yeTxCYXNlTm9kZT4ge1xuICAgIHB1YmxpYyBidWlsZChjb2RlOiBzdHJpbmcpOiBQcm9ncmVtQ29kZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBFc3ByaW1hUHJvZ3JlbUNvZGUoY29kZSk7XG4gICAgfVxufVxuXG5jbGFzcyBFc3ByaW1hVmVyc2VJbnN0cnVjdGlvbkZhY3RvcnkgaW1wbGVtZW50cyBWZXJzZUluc3RydWN0aW9uRmFjdG9yeTxCYXNlTm9kZT4ge1xuICAgIFxuICAgIGJ1aWxkKHBhcmFtOiBCYXNlTm9kZSk6IEVzcHJpbWFWZXJzZUluc3RydWN0aW9uIHtcbiAgICAgICAgaWYgKCFwYXJhbSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBvc3NpYmxlIHRvIGJ1aWxkIGVtcHR5IFZlcnNlICEnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYXN0Um9vdE5vZGU6IHBhcmFtXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBDb2RlU2VydmljZSB7XG5cbiAgICBleHBvcnQgY29uc3QgcHJvZ3JlbUNvZGVGYWN0b3J5OiBQcm9ncmVtQ29kZUZhY3Rvcnk8YW55PiA9IG5ldyBFc3ByaW1hUHJvZ3JlbUNvZGVGYWN0b3J5KCk7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gbG9hZFByb2dyZW0oZmlsZVVybDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsaWVudCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgY2xpZW50Lm9wZW4oJ0dFVCcsIGZpbGVVcmwpO1xuICAgICAgICAgICAgY2xpZW50Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29kZSA9IGNsaWVudC5yZXNwb25zZVRleHQ7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29kZVNlcnZpY2U6IFByb2dyZW0gbG9hZGVkIHN1Y2Nlc3NmdWxseS4nLCBjb2RlKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGNvZGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNsaWVudC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KGNsaWVudC5zdGF0dXNUZXh0KTtcbiAgICAgICAgICAgIGNsaWVudC5zZW5kKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSJdLCJzb3VyY2VSb290IjoiIn0=