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
            console.log('progrem AST:', progremCode.colorerProgremFunction);
            // Load initProgrem Function code
            let initProgremFunctionCode = escodegen_1.generate(progremCode.initialiserProgremFunction());
            window.eval(initProgremFunctionCode);
            scheduler = SchedulingService_1.SchedulingService.buildProgremScheduler(progremConfig, progremCode);
            let progremInspector = new ProgremInspector_1.BasicHtmlEsprimaProgremInspector(progremCode, scheduler);
            let codeElement = document.querySelector('.code');
            console.log('codeElement', codeElement);
            progremInspector.attach(codeElement);
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
    constructor(progremCode, scheduler) {
        this.progremCode = progremCode;
        this.scheduler = scheduler;
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
        let executedNode = state.codeStatement.node;
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
        this.unstackAst(codeRoot, [this.progremCode.colorerProgremFunction()], 0);
    }
    buildHtmlTree3() {
        const codeRoot = document.createElement("div");
        this.progremCodeLines.push(codeRoot);
        let factory = new HtmlTree_1.CodeSpoolerEsToHtmlTreeMapperFactory();
        let treeStore = factory.build(this.progremCode);
        treeStore.paintInto(codeRoot);
        return treeStore;
    }
    buildHtmlTree() {
        const codeRoot = document.createElement("div");
        const stack = [this.progremCode.colorerProgremFunction()];
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
class BasicEsToHtmlTreeStore {
    constructor(nodes, htmlFactory) {
        this.nodes = nodes;
        this.htmlFactory = htmlFactory;
        this.backingMap = new Map();
        this.addedClasses = new Map();
        this.addedStyleProps = new Map();
        nodes.forEach(n => {
            let mapping = htmlFactory.build(n);
            let iterator = mapping.entries();
            let entry = iterator.next();
            while (!entry.done) {
                let val = entry.value;
                this.backingMap.set(val[0], val[1]);
                entry = iterator.next();
            }
        });
    }
    paintInto(element) {
        this.nodes.forEach(n => {
            let elt = this.backingMap.get(n);
            if (elt) {
                element.appendChild(elt);
            }
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
exports.BasicEsToHtmlTreeStore = BasicEsToHtmlTreeStore;
class CodeSpoolerEsToHtmlFactory {
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
                    console.log('default:', node);
                    line = this.appendSpan(parentElement, ['nsy-' + node.type], escodegen_1.generate(node));
                    mapping.set(node, line);
                    break;
            }
        });
    }
    build(node) {
        const codeRoot = document.createElement("div");
        let mapping = new Map();
        this.unstackAst(codeRoot, [node], mapping, 0);
        console.log('mapping:', mapping);
        return mapping;
    }
}
exports.CodeSpoolerEsToHtmlFactory = CodeSpoolerEsToHtmlFactory;
class CodeSpoolerEsToHtmlTreeMapperFactory {
    constructor() {
        this.htmlFactory = new CodeSpoolerEsToHtmlFactory();
    }
    build(code) {
        let store = new BasicEsToHtmlTreeStore([code.colorerProgremFunction()], this.htmlFactory);
        return store;
    }
}
exports.CodeSpoolerEsToHtmlTreeMapperFactory = CodeSpoolerEsToHtmlTreeMapperFactory;


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
class CodeStatement {
    constructor(node) {
        this.node = node;
    }
    ;
}
exports.CodeStatement = CodeStatement;
class BasicEsprimaCodeStatementFactory {
    build(param) {
        /*
        if (param.type === 'ReturnStatement') {
            let stmt = param as ReturnStatement;
            let code = Escodegen.generate(stmt);
            return new CodeStatement(code);
        } else if (param.type === 'IfStatement') {
            let stmt = param as IfStatement;
            let code = Escodegen.generate(stmt.test);
            return new CodeStatement(code);
        } else {
            let code = Escodegen.generate(param);
            return new CodeStatement(code);
        }*/
        if (param)
            return new CodeStatement(param);
        throw new Error('Unable to build non statement code !');
    }
}
class BasicEsprimaCodeIterator {
    constructor(rootNode, state) {
        this.rootNode = rootNode;
        this.state = state;
        this.stack = [];
        this.codeStatementFactory = new BasicEsprimaCodeStatementFactory();
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
                    return this.codeStatementFactory.build(func);
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
                    return this.codeStatementFactory.build(stmt.test);
                case 'ReturnStatement':
                    stmt = node;
                    this.returnValue = this.state.eval(escodegen_1.generate(stmt.argument));
                    this.finished = true;
                    return this.codeStatementFactory.build(stmt);
                default:
                    //console.log('Node:', node);
                    let code = escodegen_1.generate(node);
                    //console.log('Generated code:', code);
                    let evalResult = this.state.eval(code);
                    //console.log('Evaluate to:', evalResult);
                    return this.codeStatementFactory.build(node);
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
            return result;
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
            return result;
        }
        throw new Error('Impossible de trouver une fonction colorerProgrem() !');
    }
    iterator(state) {
        return new BasicEsprimaCodeIterator(this.colorerProgremFunction(), state);
    }
}
exports.EsprimaProgremCode = EsprimaProgremCode;
class ProgremCodeFactory {
    build(code) {
        return new EsprimaProgremCode(code);
    }
}
var CodeService;
(function (CodeService) {
    CodeService.progremCodeFactory = new ProgremCodeFactory();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb2dyZW1HcmlkLnRzIiwid2VicGFjazovLy8uL3NyYy9FdmFsU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQXN0SGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9Qcm9ncmVtU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2NyZWVuU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2NoZWR1bGluZ1NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb2dyZW1JbnNwZWN0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0h0bWxUcmVlLnRzIiwid2VicGFjazovLy8uL3NyYy9Db2RlU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsNkVBQWlFO0FBQ2pFLDJFQUErQztBQUUvQyxJQUFJLFlBQVksR0FBRyxJQUFJLDRCQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDeEMsSUFBSSxhQUFhLEdBQUcsSUFBSSw4QkFBYSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFakQsK0JBQWMsQ0FBQyxZQUFZLENBQUMsNkJBQTZCLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDR3hGLE1BQWEsc0JBQXNCO0lBTS9CLFlBQ1ksWUFBMEIsRUFDMUIsYUFBNEI7UUFENUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFOaEMsb0JBQWUsR0FBbUIsSUFBSSxDQUFDO1FBUTNDLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztTQUMvRDtRQUNELElB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LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb2dyZW1TZXJ2aWNlLCBQcm9ncmVtQ29uZmlnIH0gZnJvbSBcIi4vUHJvZ3JlbVNlcnZpY2VcIjtcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gXCIuL1NjcmVlblNlcnZpY2VcIjtcblxubGV0IHNjcmVlbkNvbmZpZyA9IG5ldyBTY3JlZW5Db25maWcoMjApO1xubGV0IHByb2dyZW1Db25maWcgPSBuZXcgUHJvZ3JlbUNvbmZpZygxNywgMTcsIDEpO1xuXG5Qcm9ncmVtU2VydmljZS5idWlsZFByb2dyZW0oJy4vcHJvZ3JlbXMvY29ldXJfcHJvZ3JlbS5qcycsIHNjcmVlbkNvbmZpZywgcHJvZ3JlbUNvbmZpZyk7IiwiaW1wb3J0IHsgR3JpZENoYW5nZUxpc3RlbmVyLCBQcm9ncmVtU3RhdGUgfSBmcm9tIFwiLi9TY2hlZHVsaW5nU2VydmljZVwiO1xuaW1wb3J0IHsgU2NyZWVuQ29uZmlnIH0gZnJvbSBcIi4vU2NyZWVuU2VydmljZVwiO1xuaW1wb3J0IHsgUHJvZ3JlbUNvbmZpZyB9IGZyb20gXCIuL1Byb2dyZW1TZXJ2aWNlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbUdyaWQge1xuICAgIGNsZWFyKCk6IHZvaWQ7XG4gICAgYXR0YWNoKGVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsKTogdm9pZFxufVxuXG5leHBvcnQgY2xhc3MgQmFzaWNDYW52YXNQcm9ncmVtR3JpZCBpbXBsZW1lbnRzIFByb2dyZW1HcmlkLCBHcmlkQ2hhbmdlTGlzdGVuZXIge1xuICAgIFxuICAgIHByaXZhdGUgYXR0YWNoZWRFbGVtZW50OiBFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzY3JlZW5Db25maWc6IFNjcmVlbkNvbmZpZywgXG4gICAgICAgIHByaXZhdGUgcHJvZ3JlbUNvbmZpZzogUHJvZ3JlbUNvbmZpZ1xuICAgICAgICApIHtcbiAgICAgICAgbGV0IGVsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVtJyk7XG4gICAgICAgIGlmICghZWx0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBmaW5kIC5wcm9ncmVtIENhbnZhcyBlbGVtZW50ICEnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbnZhcyA9IGVsdCBhcyBIVE1MQ2FudmFzRWxlbWVudDtcblxuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgaWYgKCFjdHgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGdldCAyRCBDYW52YXMgY29udGV4dCAhJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhdHRhY2hUb0NhbnZhcyhjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICBjYW52YXMud2lkdGggPSB0aGlzLnByb2dyZW1Db25maWcuY29sb25uZXMgKiB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5wcm9ncmVtQ29uZmlnLmNvbG9ubmVzICogdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZTtcblxuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgaWYgKCFjdHgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGdldCAyRCBDYW52YXMgY29udGV4dCAhJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgfVxuXG4gICAgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemUgKiB0aGlzLnByb2dyZW1Db25maWcuY29sb25uZXM7XG4gICAgICAgIGxldCBoZWlnaHQgPSB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplICogdGhpcy5wcm9ncmVtQ29uZmlnLmxpZ25lcztcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuICAgIGF0dGFjaChlbGVtZW50OiBFbGVtZW50IHwgbnVsbCk6IHZvaWQge1xuICAgICAgICB0aGlzLmF0dGFjaGVkRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0NBTlZBUycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFjaFRvQ2FudmFzKGVsZW1lbnQgYXMgSFRNTENhbnZhc0VsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jaGlsZE5vZGVzLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjLm5vZGVOYW1lID09PSAnQ0FOVkFTJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2hUb0NhbnZhcyhlbGVtZW50IGFzIEhUTUxDYW52YXNFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBObyBDYW52YXMgZm91bmQgc28gd2UgY3JlYXRlIG9uZVxuICAgICAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaFRvQ2FudmFzKGNhbnZhcyk7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZmlyZUdyaWRDaGFuZ2UgKHN0YXRlOiBQcm9ncmVtU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dyaWQgY2hhbmdlOiAnLCBzdGF0ZSk7XG5cbiAgICAgICAgbGV0IGJveFNpemUgPSB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplO1xuICAgICAgICBsZXQgYyA9IHN0YXRlLmNvbG9ubmU7XG4gICAgICAgIGxldCBsID0gc3RhdGUubGlnbmU7XG5cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBsZXQgY291bGV1ciA9IGNvbG9yZXJQcm9ncmVtKGMsIGwsIHN0YXRlLmNvbnRleHRlKTtcbiAgICAgICAgaWYgKGNvdWxldXIpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvdWxldXI7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdChjICogYm94U2l6ZSwgbCAqIGJveFNpemUsIGJveFNpemUsIGJveFNpemUpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJcbmV4cG9ydCBjbGFzcyBFdmFsU2NvcGUge1xuXG4gICAgLy8gU2VlIGh0dHA6Ly9wZXJmZWN0aW9ua2lsbHMuY29tL2dsb2JhbC1ldmFsLXdoYXQtYXJlLXRoZS1vcHRpb25zL1xuICAgIC8vIFdpbGwgcmV0dXJuIGFuIGV2YWwgYWJsZSB0byBldmFsdWF0ZSBqcyBjb2RlIGluIHRoZSBnbG9iYWwgc2NvcGUuXG4gICAgcHVibGljIHJlYWRvbmx5IGdsb2JhbEV2YWwgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciBpc0luZGlyZWN0RXZhbEdsb2JhbCA9IChmdW5jdGlvbiAob3JpZ2luYWwsIE9iamVjdCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvLyBEb2VzIGBPYmplY3RgIHJlc29sdmUgdG8gYSBsb2NhbCB2YXJpYWJsZSwgb3IgdG8gYSBnbG9iYWwsIGJ1aWx0LWluIGBPYmplY3RgLFxuICAgICAgICAgICAgICAgIC8vIHJlZmVyZW5jZSB0byB3aGljaCB3ZSBwYXNzZWQgYXMgYSBmaXJzdCBhcmd1bWVudD9cbiAgICAgICAgICAgICAgICByZXR1cm4gKDEsIGV2YWwpKCdPYmplY3QnKSA9PT0gb3JpZ2luYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgaW5kaXJlY3QgZXZhbCBlcnJvcnMgb3V0IChhcyBhbGxvd2VkIHBlciBFUzMpLCB0aGVuIGp1c3QgYmFpbCBvdXQgd2l0aCBgZmFsc2VgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KShPYmplY3QsIDEyMyk7XG5cbiAgICAgICAgaWYgKGlzSW5kaXJlY3RFdmFsR2xvYmFsKSB7XG4gICAgICAgICAgICAvLyBpZiBpbmRpcmVjdCBldmFsIGV4ZWN1dGVzIGNvZGUgZ2xvYmFsbHksIHVzZSBpdFxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChleHByZXNzaW9uOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDEsIGV2YWwpKGV4cHJlc3Npb24pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cuZXhlY1NjcmlwdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIC8vIGlmIGB3aW5kb3cuZXhlY1NjcmlwdCBleGlzdHNgLCB1c2UgaXRcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXhwcmVzc2lvbjogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuZXhlY1NjcmlwdChleHByZXNzaW9uKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdGhlcndpc2UsIGdsb2JhbEV2YWwgaXMgYHVuZGVmaW5lZGAgc2luY2Ugbm90aGluZyBpcyByZXR1cm5lZFxuICAgICAgICByZXR1cm4gKGV4cHI6IHN0cmluZykgPT4ge3Rocm93IG5ldyBFcnJvcignTm8gZ2xvYmFsIGV2YWwgYXZhaWxhYmxlICEnKTt9XG4gICAgfSkoKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxufVxuIiwiaW1wb3J0IHsgUGF0dGVybiwgSWRlbnRpZmllciwgQmFzZU5vZGUsIFZhcmlhYmxlRGVjbGFyYXRpb24sIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBWYXJpYWJsZURlY2xhcmF0b3IgfSBmcm9tIFwiZXN0cmVlXCI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQXN0SGVscGVyIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBwYXR0ZXJuVG9TdHJpbmcocGF0dGVybjogUGF0dGVybik6IHN0cmluZyB7XG4gICAgICAgIHZhciBub2RlO1xuICAgICAgICBzd2l0Y2ggKHBhdHRlcm4udHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnSWRlbnRpZmllcic6XG4gICAgICAgICAgICAgICAgbm9kZSA9IHBhdHRlcm4gYXMgSWRlbnRpZmllcjtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5uYW1lO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gY29udmVydCBwYXR0ZXJuIG9mIHR5cGUgJyArIHBhdHRlcm4udHlwZSk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZU5vZGVUb1ZhckRlY2xhcmF0aW9uKG5vZGU6IEJhc2VOb2RlKTogVmFyaWFibGVEZWNsYXJhdGlvbiB8IEFzc2lnbm1lbnRFeHByZXNzaW9uIHwgRnVuY3Rpb25EZWNsYXJhdGlvbiB8IHZvaWQge1xuICAgICAgICBcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICBsZXQgZGVjbCA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBkZWNsO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJykge1xuICAgICAgICAgICAgbGV0IGV4cHIgPSBub2RlIGFzIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuICAgICAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgIGxldCBmdW5jID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwIGluIG5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAocCA9PT0gJ2xlZnQnIHx8IHAgPT09ICdyaWdodCcgfHwgcCA9PT0gJ2FyZ3VtZW50JyB8fCBwID09PSAnY2FsbGVlJyB8fCBwID09PSAnYm9keScgfHwgcCA9PT0gJ2V4cHJlc3Npb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQ6IEJhc2VOb2RlID0gbm9kZVtwXSBhcyBCYXNlTm9kZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHJlZHVjZU5vZGVUb1ZhckRlY2xhcmF0aW9uKGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgQ29kZVNlcnZpY2UgfSBmcm9tIFwiLi9Db2RlU2VydmljZVwiO1xuaW1wb3J0IHsgU2NoZWR1bGluZ1NlcnZpY2UsIFByb2dyZW1TY2hlZHVsZXIgfSBmcm9tICcuL1NjaGVkdWxpbmdTZXJ2aWNlJztcbmltcG9ydCB7IEJhc2ljSHRtbEVzcHJpbWFQcm9ncmVtSW5zcGVjdG9yIH0gZnJvbSAnLi9Qcm9ncmVtSW5zcGVjdG9yJztcbmltcG9ydCB7IEJhc2ljQ2FudmFzUHJvZ3JlbUdyaWQgfSBmcm9tICcuL1Byb2dyZW1HcmlkJztcbmltcG9ydCB7IFNjcmVlbkNvbmZpZyB9IGZyb20gJy4vU2NyZWVuU2VydmljZSc7XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVtQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvbG9ubmVzOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBsaWduZXM6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGZyYW1lczogbnVtYmVyLFxuICAgICkge31cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBQcm9ncmVtU2VydmljZSB7XG5cbiAgICB2YXIgcHJldmlvdXNSZXBhaW50VGltZSA9IDA7XG4gICAgdmFyIHNjaGVkdWxlcjogUHJvZ3JlbVNjaGVkdWxlcjtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFByb2dyZW0odXJsOiBzdHJpbmcsIHNjcmVlbkNvbmZpZzogU2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnOiBQcm9ncmVtQ29uZmlnKSB7XG4gICAgICAgIGxldCBwcm9ncmVtU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHByb2dyZW1TY3JpcHQuc3JjID0gdXJsO1xuICAgICAgICBsZXQgYm9keUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICAgIGlmIChib2R5RWxlbWVudCkge1xuICAgICAgICAgICAgYm9keUVsZW1lbnQuYXBwZW5kQ2hpbGQocHJvZ3JlbVNjcmlwdCk7XG4gICAgICAgIH1cblxuICAgICAgICBDb2RlU2VydmljZS5sb2FkUHJvZ3JlbSh1cmwpLnRoZW4oY29kZSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJvZ3JlbUNvZGUgPSBDb2RlU2VydmljZS5wcm9ncmVtQ29kZUZhY3RvcnkuYnVpbGQoY29kZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncHJvZ3JlbSBBU1Q6JywgcHJvZ3JlbUNvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbik7XG5cbiAgICAgICAgICAgIC8vIExvYWQgaW5pdFByb2dyZW0gRnVuY3Rpb24gY29kZVxuICAgICAgICAgICAgbGV0IGluaXRQcm9ncmVtRnVuY3Rpb25Db2RlID0gZXNjb2RlR2VuZXJhdGUocHJvZ3JlbUNvZGUuaW5pdGlhbGlzZXJQcm9ncmVtRnVuY3Rpb24oKSk7XG4gICAgICAgICAgICAod2luZG93IGFzIGFueSkuZXZhbChpbml0UHJvZ3JlbUZ1bmN0aW9uQ29kZSk7XG5cbiAgICAgICAgICAgIHNjaGVkdWxlciA9IFNjaGVkdWxpbmdTZXJ2aWNlLmJ1aWxkUHJvZ3JlbVNjaGVkdWxlcihwcm9ncmVtQ29uZmlnLCBwcm9ncmVtQ29kZSk7XG5cbiAgICAgICAgICAgIGxldCBwcm9ncmVtSW5zcGVjdG9yID0gbmV3IEJhc2ljSHRtbEVzcHJpbWFQcm9ncmVtSW5zcGVjdG9yKHByb2dyZW1Db2RlLCBzY2hlZHVsZXIpO1xuXG4gICAgICAgICAgICBsZXQgY29kZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29kZScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvZGVFbGVtZW50JywgY29kZUVsZW1lbnQpO1xuICAgICAgICAgICAgcHJvZ3JlbUluc3BlY3Rvci5hdHRhY2goY29kZUVsZW1lbnQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgZ3JpZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZ3JlbScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dyaWRFbGVtZW50JywgZ3JpZEVsZW1lbnQpO1xuICAgICAgICAgICAgbGV0IHByb2dyZW1HcmlkID0gbmV3IEJhc2ljQ2FudmFzUHJvZ3JlbUdyaWQoc2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnKTtcbiAgICAgICAgICAgIHByb2dyZW1HcmlkLmF0dGFjaChncmlkRWxlbWVudCk7XG4gICAgICAgICAgICBwcm9ncmVtR3JpZC5jbGVhcigpO1xuICAgICAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUdyaWRDaGFuZ2UocHJvZ3JlbUdyaWQpO1xuXG4gICAgICAgICAgICB0aW1lcigwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGltZXIodGltZXN0YW1wOiBudW1iZXIpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aW1lcik7XG5cbiAgICAgICAgaWYgKHRpbWVzdGFtcCAtIHByZXZpb3VzUmVwYWludFRpbWUgPCAxNTAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2aW91c1JlcGFpbnRUaW1lID0gdGltZXN0YW1wO1xuXG4gICAgICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgICAgICAgIHNjaGVkdWxlci5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJcbmV4cG9ydCBjbGFzcyBTY3JlZW5Db25maWcge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYm94U2l6ZTogbnVtYmVyXG4gICAgKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgU2NyZWVuU2VydmljZSB7XG5cbiAgICBwdWJsaWMgZ2V0U2NyZWVuRnJhbWUoKTogYW55IHtcblxuICAgIH1cblxufSIsImltcG9ydCB7IFByb2dyZW1Db25maWcgfSBmcm9tIFwiLi9Qcm9ncmVtU2VydmljZVwiO1xuaW1wb3J0IHsgUHJvZ3JlbUNvZGUsIENvZGVJdGVyYXRvciwgQ29kZVN0YXRlbWVudCB9IGZyb20gXCIuL0NvZGVTZXJ2aWNlXCI7XG5pbXBvcnQgeyBFdmFsU2NvcGUgfSBmcm9tIFwiLi9FdmFsU2VydmljZVwiO1xuXG5leHBvcnQgY2xhc3MgUHJvZ3JlbVN0YXRlIHtcblxuICAgIHB1YmxpYyByZWFkb25seSBldmFsU2NvcGUgPSBuZXcgRXZhbFNjb3BlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjb2xvbm5lOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBsaWduZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZnJhbWU6IG51bWJlcixcbiAgICAgICAgcHVibGljIGNvbnRleHRlOiBvYmplY3QsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjb2RlU3RhdGVtZW50OiBDb2RlU3RhdGVtZW50IHwgbnVsbCxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZXZhbChleHByOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmFsU2NvcGUuZ2xvYmFsRXZhbChleHByKTtcbiAgICB9XG59XG5cbnR5cGUgTmV3U3RhdGVDYWxsYmFjayA9IChzdGF0ZTogUHJvZ3JlbVN0YXRlKSA9PiB2b2lkO1xuZXhwb3J0IGludGVyZmFjZSBDb2RlRXhlY3V0aW9uTGlzdGVuZXIge2ZpcmVDb2RlRXhlY3V0aW9uOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgR3JpZENoYW5nZUxpc3RlbmVyIHtmaXJlR3JpZENoYW5nZTogTmV3U3RhdGVDYWxsYmFja307XG5leHBvcnQgaW50ZXJmYWNlIExpbmVDaGFuZ2VMaXN0ZW5lciB7ZmlyZUxpbmVDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBGcmFtZUNoYW5nZUxpc3RlbmVyIHtmaXJlRnJhbWVDaGFuZ2U6IE5ld1N0YXRlQ2FsbGJhY2t9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1TY2hlZHVsZXIge1xuICAgIHN1YnNjcmliZUNvZGVFeGVjdXRpb24obGlzdGVuZXI6IENvZGVFeGVjdXRpb25MaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVHcmlkQ2hhbmdlKGxpc3RlbmVyOiBHcmlkQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlTGluZUNoYW5nZShsaXN0ZW5lcjogTGluZUNoYW5nZUxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUZyYW1lQ2hhbmdlKGxpc3RlbmVyOiBGcmFtZUNoYW5nZUxpc3RlbmVyKTogdm9pZFxuXG4gICAgcmVzZXQoKTogUHJvZ3JlbVN0YXRlXG4gICAgY3VycmVudCgpOiBQcm9ncmVtU3RhdGVcbiAgICBuZXh0KCk6IFByb2dyZW1TdGF0ZVxufVxuXG5jbGFzcyBTaW1wbGVQcm9ncmVtU2NoZWR1bGVyIGltcGxlbWVudHMgUHJvZ3JlbVNjaGVkdWxlciB7XG4gICAgXG4gICAgcHJpdmF0ZSBzdGF0ZTogUHJvZ3JlbVN0YXRlO1xuICAgIHByaXZhdGUgY29kZUl0ZXJhdG9yOiBDb2RlSXRlcmF0b3IgfCBudWxsID0gbnVsbDtcblxuICAgIHByaXZhdGUgY29kZUV4ZWN1dGlvbkxpc3RlbmVyczogQ29kZUV4ZWN1dGlvbkxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGdyaWRDaGFuZ2VMaXN0ZW5lcnM6IEdyaWRDaGFuZ2VMaXN0ZW5lcltdID0gW107XG4gICAgcHJpdmF0ZSBsaW5lQ2hhbmdlTGlzdGVuZXJzOiBMaW5lQ2hhbmdlTGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgZnJhbWVDaGFuZ2VMaXN0ZW5lcnM6IEZyYW1lQ2hhbmdlTGlzdGVuZXJbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IFByb2dyZW1Db25maWcsIHByaXZhdGUgY29kZTogUHJvZ3JlbUNvZGUpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVDb2RlRXhlY3V0aW9uKGxpc3RlbmVyOiBDb2RlRXhlY3V0aW9uTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb2RlRXhlY3V0aW9uTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gICAgXG4gICAgXG4gICAgc3Vic2NyaWJlR3JpZENoYW5nZShsaXN0ZW5lcjogR3JpZENoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ3JpZENoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVMaW5lQ2hhbmdlKGxpc3RlbmVyOiBMaW5lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5lQ2hhbmdlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZUZyYW1lQ2hhbmdlKGxpc3RlbmVyOiBGcmFtZUNoYW5nZUxpc3RlbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZnJhbWVDaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmVzZXQoKTogUHJvZ3JlbVN0YXRlIHtcbiAgICAgICAgLy8gQ2FsbCBqdXN0IGV2YWx1YXRlZCBpbml0aWFsaXNlclByb2dyZW0gZnVuY3Rpb25cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBsZXQgaW5pdGlhbENvbnRleHRlOiBvYmplY3QgPSBpbml0aWFsaXNlclByb2dyZW0odGhpcy5jb25maWcuY29sb25uZXMsIHRoaXMuY29uZmlnLmxpZ25lcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdMb2FkZWQgaW5pdGlhbCBjb250ZXh0ZTogJywgaW5pdGlhbENvbnRleHRlKTtcbiAgICAgICAgbGV0IHN0YXRlID0gbmV3IFByb2dyZW1TdGF0ZSgwLCAwLCAwLCBpbml0aWFsQ29udGV4dGUsIG51bGwpO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgY3VycmVudCgpOiBQcm9ncmVtU3RhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG5cbiAgICBuZXh0KCk6IFByb2dyZW1TdGF0ZSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZSkgdGhyb3cgbmV3IEVycm9yKCdJbmNvbnNpc3RlbnQgUHJvZ3JlbSBzdGF0ZSAhJyk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcblxuICAgICAgICBpZiAodGhpcy5jb2RlSXRlcmF0b3IgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jb2RlSXRlcmF0b3IgPSB0aGlzLmNvZGUuaXRlcmF0b3IodGhpcy5zdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2NvbnNvbGUubG9nKCdoYXNOZXh0OicsIHRoaXMuY29kZUl0ZXJhdG9yLmhhc05leHQoKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29kZUl0ZXJhdG9yLmhhc05leHQoKSkge1xuICAgICAgICAgICAgbGV0IHN0YXRlbWVudCA9IHRoaXMuY29kZUl0ZXJhdG9yLmV4ZWN1dGVOZXh0KCk7XG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSBuZXcgUHJvZ3JlbVN0YXRlKHRoaXMuc3RhdGUuY29sb25uZSwgdGhpcy5zdGF0ZS5saWduZSwgdGhpcy5zdGF0ZS5mcmFtZSwgdGhpcy5zdGF0ZS5jb250ZXh0ZSwgc3RhdGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgIHRoaXMuY29kZUV4ZWN1dGlvbkxpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVDb2RlRXhlY3V0aW9uKG5ld1N0YXRlKSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgICAgIH1cblxuICAgICAgICAvL2NvbnNvbGUubG9nKCdGaW5pc2hlZCBpdGVyYXRpbmcgb3ZlciBjb2RlLicpXG5cbiAgICAgICAgbGV0IG5vdGlmeVBpeGVsQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIGxldCBub3RpZnlMaW5lQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIGxldCBub3RpZnlGcmFtZUNoYW5nZSA9IGZhbHNlO1xuXG4gICAgICAgIGxldCBfY29sb25uZSA9IHRoaXMuc3RhdGUuY29sb25uZTtcbiAgICAgICAgbGV0IF9saWduZSA9IHRoaXMuc3RhdGUubGlnbmU7XG4gICAgICAgIGxldCBfZnJhbWUgPSB0aGlzLnN0YXRlLmZyYW1lO1xuXG4gICAgICAgIF9jb2xvbm5lICsrO1xuICAgICAgICBub3RpZnlQaXhlbENoYW5nZSA9IHRydWU7XG5cbiAgICAgICAgaWYgKF9jb2xvbm5lID49IHRoaXMuY29uZmlnLmNvbG9ubmVzKSB7XG4gICAgICAgICAgICBfY29sb25uZSA9IDA7XG4gICAgICAgICAgICBfbGlnbmUgKys7XG4gICAgICAgICAgICBub3RpZnlMaW5lQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfbGlnbmUgPiB0aGlzLmNvbmZpZy5saWduZXMpIHtcbiAgICAgICAgICAgIF9saWduZSA9IDA7XG4gICAgICAgICAgICBfZnJhbWUgKys7XG4gICAgICAgICAgICBub3RpZnlGcmFtZUNoYW5nZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX2ZyYW1lID4gdGhpcy5jb25maWcuZnJhbWVzKSB7XG4gICAgICAgICAgICBfZnJhbWUgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5ld1N0YXRlID0gbmV3IFByb2dyZW1TdGF0ZShfY29sb25uZSwgX2xpZ25lLCBfZnJhbWUsIHRoaXMuc3RhdGUuY29udGV4dGUsIG51bGwpO1xuIFxuICAgICAgICBpZiAobm90aWZ5UGl4ZWxDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JpZENoYW5nZUxpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVHcmlkQ2hhbmdlKHRoaXMuc3RhdGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub3RpZnlMaW5lQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmVDaGFuZ2VMaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlTGluZUNoYW5nZSh0aGlzLnN0YXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm90aWZ5RnJhbWVDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVDaGFuZ2VMaXN0ZW5lcnMubWFwKGwgPT4gbC5maXJlRnJhbWVDaGFuZ2UodGhpcy5zdGF0ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICB0aGlzLmNvZGVJdGVyYXRvciA9IHRoaXMuY29kZS5pdGVyYXRvcihuZXdTdGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBTY2hlZHVsaW5nU2VydmljZSB7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYnVpbGRQcm9ncmVtU2NoZWR1bGVyKGNvbmZpZzogUHJvZ3JlbUNvbmZpZywgY29kZTogUHJvZ3JlbUNvZGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTaW1wbGVQcm9ncmVtU2NoZWR1bGVyKGNvbmZpZywgY29kZSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZXNjb2RlR2VuZXJhdGUgfSBmcm9tICdlc2NvZGVnZW4nO1xuaW1wb3J0IHsgY3JlYXRlIGFzIG1kNUNyZWF0ZSB9IGZyb20gJ2pzLW1kNSc7XG5pbXBvcnQgeyBQcm9ncmVtQ29kZSB9IGZyb20gXCIuL0NvZGVTZXJ2aWNlXCI7XG5pbXBvcnQgeyBGdW5jdGlvbkRlY2xhcmF0aW9uLCBCYXNlTm9kZSwgQmxvY2tTdGF0ZW1lbnQsIElmU3RhdGVtZW50LCBFeHByZXNzaW9uLCBWYXJpYWJsZURlY2xhcmF0aW9uLCBWYXJpYWJsZURlY2xhcmF0b3IsIEV4cHJlc3Npb25TdGF0ZW1lbnQsIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBSZXR1cm5TdGF0ZW1lbnQsIENvbmRpdGlvbmFsRXhwcmVzc2lvbiwgQmluYXJ5RXhwcmVzc2lvbiB9IGZyb20gJ2VzdHJlZSc7XG5pbXBvcnQgeyBQcm9ncmVtU2NoZWR1bGVyLCBQcm9ncmVtU3RhdGUsIENvZGVFeGVjdXRpb25MaXN0ZW5lciwgR3JpZENoYW5nZUxpc3RlbmVyIH0gZnJvbSAnLi9TY2hlZHVsaW5nU2VydmljZSc7XG5pbXBvcnQgeyBBc3RIZWxwZXIgfSBmcm9tICcuL0FzdEhlbHBlcic7XG5pbXBvcnQgeyBCYXNpY0VzVG9IdG1sVHJlZVN0b3JlLCBDb2RlU3Bvb2xlckVzVG9IdG1sVHJlZU1hcHBlckZhY3RvcnksIEVzVG9IdG1sVHJlZVN0b3JlIH0gZnJvbSAnLi9IdG1sVHJlZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbUluc3BlY3RvciB7XG4gICAgY2xlYXIoKTogdm9pZDtcbiAgICBhdHRhY2goZWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsKTogdm9pZFxufVxuXG5leHBvcnQgY2xhc3MgQmFzaWNIdG1sRXNwcmltYVByb2dyZW1JbnNwZWN0b3IgaW1wbGVtZW50cyBQcm9ncmVtSW5zcGVjdG9yLCBDb2RlRXhlY3V0aW9uTGlzdGVuZXIsIEdyaWRDaGFuZ2VMaXN0ZW5lciB7XG4gICAgXG4gICAgcHJpdmF0ZSBwcm9ncmVtQ29kZUxpbmVzOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgcHJpdmF0ZSBhdHRhY2hlZEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBtYXBwaW5nOiBNYXA8QmFzZU5vZGUsIEhUTUxFbGVtZW50PiA9IG5ldyBNYXAoKTtcbiAgICBwcml2YXRlIGhpbnRTdGFja0NvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICAgIHByaXZhdGUgdHJlZVN0b3JlMTogRXNUb0h0bWxUcmVlU3RvcmU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBwcm9ncmVtQ29kZTogUHJvZ3JlbUNvZGUsXG4gICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyXG4gICAgKSB7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVDb2RlRXhlY3V0aW9uKHRoaXMpO1xuICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlR3JpZENoYW5nZSh0aGlzKTtcbiAgICAgICAgLy90aGlzLmJ1aWxkSHRtbFRyZWUyKCk7XG4gICAgICAgIHRoaXMudHJlZVN0b3JlMSA9IHRoaXMuYnVpbGRIdG1sVHJlZTMoKTtcbiAgICB9XG5cbiAgICBhdHRhY2gwKGVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCk6IHZvaWQge1xuICAgICAgICB0aGlzLmF0dGFjaGVkRWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGxldCBjb2RlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb2RlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvZGVDb250YWluZXInKTtcbiAgICAgICAgICAgIHRoaXMuaGludFN0YWNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLmhpbnRTdGFja0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaW50Q29udGFpbmVyJyk7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNvZGVDb250YWluZXIpO1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmhpbnRTdGFja0NvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIHRoaXMucHJvZ3JlbUNvZGVMaW5lcy5tYXAoZWx0ID0+IHsgY29kZUNvbnRhaW5lci5hcHBlbmRDaGlsZChlbHQpIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXR0YWNoKGVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCk6IHZvaWQge1xuICAgICAgICB0aGlzLmF0dGFjaGVkRWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMudHJlZVN0b3JlMS5wYWludEludG8oZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhcjAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29sb3JNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGlmICh0aGlzLmhpbnRTdGFja0NvbnRhaW5lcilcbiAgICAgICAgICAgIHRoaXMuaGludFN0YWNrQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIHRoaXMubWFwcGluZy5mb3JFYWNoKChlbHQsIG5vZGUpID0+IGVsdC5jbGFzc0xpc3QucmVtb3ZlKCdoaWdobGlnaHQnKSk7XG4gICAgfVxuXG4gICAgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29sb3JNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMudHJlZVN0b3JlMS5yZXNldFN0eWxlKCk7XG4gICAgICAgIGlmICh0aGlzLmhpbnRTdGFja0NvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5oaW50U3RhY2tDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY29sb3JNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwKCk7XG5cbiAgICBwcml2YXRlIGhzbENvbG9yKGh1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdoc2woJyArIGh1ZSArICcsIDEwMCUsIDgwJSknO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFzaFN0cmluZ1RvQ29sb3Ioa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHNoaWZ0ID0gMjtcbiAgICAgICAgbGV0IGNvbG9yQ291bnQgPSAxMjtcblxuICAgICAgICB2YXIgaHVlID0gdGhpcy5jb2xvck1hcC5nZXQoa2V5KTtcbiAgICAgICAgaWYgKGh1ZSkgcmV0dXJuIHRoaXMuaHNsQ29sb3IoaHVlKTtcblxuICAgICAgICB2YXIgaGFzaCA9IG1kNUNyZWF0ZSgpLnVwZGF0ZShrZXkpLnRvU3RyaW5nKCk7XG4gICAgICAgIFxuICAgICAgICBodWUgPSAoIHBhcnNlSW50KGhhc2guc3Vic3RyaW5nKHNoaWZ0ICsgMCwgc2hpZnQgKyAxKSwgMTYpICsgMTYgKiBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDEsIHNoaWZ0ICsgMiksIDE2KSArIDI1NiAqIHBhcnNlSW50KGhhc2guc3Vic3RyaW5nKHNoaWZ0ICsgMiwgc2hpZnQgKyAzKSwgMTYpICk7XG4gICAgICAgIGh1ZSA9IE1hdGguZmxvb3IoaHVlICUgY29sb3JDb3VudCkgKiAzNjAgLyBjb2xvckNvdW50O1xuXG4gICAgICAgIHdoaWxlICghdGhpcy5jb2xvck1hcC5nZXQoa2V5KSkge1xuICAgICAgICAgICAgbGV0IGR1cGxpY2F0ZUNvbG9yID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGxldCBjIG9mIHRoaXMuY29sb3JNYXAudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA9PT0gaHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGR1cGxpY2F0ZUNvbG9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaHVlICs9IE1hdGguZmxvb3IoMzYwIC8gY29sb3JDb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZHVwbGljYXRlQ29sb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yTWFwLnNldChrZXksIGh1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vdmFyIHBhc3RlbCA9ICdoc2woJyArIGh1ZSArICcsIDEwMCUsIDg3LjUlKSc7XG4gICAgICAgIHJldHVybiB0aGlzLmhzbENvbG9yKGh1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGZpcmVDb2RlRXhlY3V0aW9uKHN0YXRlOiBQcm9ncmVtU3RhdGUpIHtcbiAgICAgICAgaWYgKHN0YXRlLmNvZGVTdGF0ZW1lbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVjZWl2ZWQgYSBudWxsIHN0YXRlbWVudCAhJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3RoaXMubWFwcGluZy5mb3JFYWNoKChlbHQsIG5vZGUpID0+IGVsdC5jbGFzc0xpc3QucmVtb3ZlKCdoaWdobGlnaHQnKSk7XG4gICAgICAgIHRoaXMudHJlZVN0b3JlMS5yZW1vdmVTdHlsZUNsYXNzZXMoWydoaWdobGlnaHQnXSk7XG5cbiAgICAgICAgbGV0IGV4ZWN1dGVkTm9kZSA9IHN0YXRlLmNvZGVTdGF0ZW1lbnQubm9kZTtcbiAgICAgICAgLy9sZXQgaHRtbE5vZGUgPSB0aGlzLm1hcHBpbmcuZ2V0KGV4ZWN1dGVkTm9kZSk7XG4gICAgICAgIC8vaWYgKCFodG1sTm9kZSkge1xuICAgICAgICAvLyAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBmb3VuZCBhIEhUTUwgZWxlbWVudCBtYXBwZWQgZm9yIHJlY2VpdmVkIHN0YXRlbWVudCAhJylcbiAgICAgICAgLy99XG4gICAgICAgIC8vaHRtbE5vZGUuY2xhc3NMaXN0LmFkZCgnaGlnaGxpZ2h0Jyk7XG4gICAgICAgIHRoaXMudHJlZVN0b3JlMS5hZGRTdHlsZUNsYXNzZXMoZXhlY3V0ZWROb2RlLCBbJ2hpZ2hsaWdodCddKTtcblxuICAgICAgICBpZiAodGhpcy5oaW50U3RhY2tDb250YWluZXIpIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gQXN0SGVscGVyLnJlZHVjZU5vZGVUb1ZhckRlY2xhcmF0aW9uKGV4ZWN1dGVkTm9kZSk7XG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGVjbCA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGRlY2wuZGVjbGFyYXRpb25zLm1hcChkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhpbnQgPSB0aGlzLmFwcGVuZEhpbnQodGhpcy5oaW50U3RhY2tDb250YWluZXIsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YXJOYW1lID0gQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhkLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YXJWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmluaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJWYWx1ZSA9IHN0YXRlLmV2YWxTY29wZS5nbG9iYWxFdmFsKGVzY29kZUdlbmVyYXRlKGQuaW5pdCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaGludC5pbm5lckhUTUwgPSB2YXJOYW1lICsgJyA9ICcgKyB2YXJWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5oYXNoU3RyaW5nVG9Db2xvcih2YXJOYW1lKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgcEVsdCA9IHRoaXMubWFwcGluZy5nZXQoZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChwRWx0KSBwRWx0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IodmFyTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWVTdG9yZTEuc2V0U3R5bGVQcm9wZXJ0eShkLCAnYmFja2dyb3VuZENvbG9yJywgdGhpcy5oYXNoU3RyaW5nVG9Db2xvcih2YXJOYW1lKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnQXNzaWdubWVudEV4cHJlc3Npb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkZWNsID0gbm9kZSBhcyBBc3NpZ25tZW50RXhwcmVzc2lvbjtcblxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhpbnQgPSB0aGlzLmFwcGVuZEhpbnQodGhpcy5oaW50U3RhY2tDb250YWluZXIsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBBc3RIZWxwZXIucGF0dGVyblRvU3RyaW5nKGRlY2wubGVmdCk7XG4gICAgICAgICAgICAgICAgICAgIGhpbnQuaW5uZXJIVE1MID0gdmFyTmFtZSArICcgPSAnICsgc3RhdGUuZXZhbFNjb3BlLmdsb2JhbEV2YWwodmFyTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGhpbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5oYXNoU3RyaW5nVG9Db2xvcih2YXJOYW1lKTtcblxuICAgICAgICAgICAgICAgICAgICAvL2xldCBwRWx0ID0gdGhpcy5tYXBwaW5nLmdldChkZWNsKTtcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAocEVsdCkgcEVsdC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKHZhck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWVTdG9yZTEuc2V0U3R5bGVQcm9wZXJ0eShkZWNsLCAnYmFja2dyb3VuZENvbG9yJywgdGhpcy5oYXNoU3RyaW5nVG9Db2xvcih2YXJOYW1lKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdGdW5jdGlvbkRlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICBmdW5jLnBhcmFtcy5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBBc3RIZWxwZXIucGF0dGVyblRvU3RyaW5nKHApO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhclZhbHVlID0gc3RhdGUuZXZhbFNjb3BlLmdsb2JhbEV2YWwodmFyTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoaW50ID0gdGhpcy5hcHBlbmRIaW50KHRoaXMuaGludFN0YWNrQ29udGFpbmVyLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoaW50LmlubmVySFRNTCA9IHZhck5hbWUgKyAnID0gJyArIHZhclZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGludC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKHZhck5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBwRWx0ID0gdGhpcy5tYXBwaW5nLmdldChwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHBFbHQpIHBFbHQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5oYXNoU3RyaW5nVG9Db2xvcih2YXJOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZVN0b3JlMS5zZXRTdHlsZVByb3BlcnR5KHAsICdiYWNrZ3JvdW5kQ29sb3InLCB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKHZhck5hbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgZmlyZUdyaWRDaGFuZ2Uoc3RhdGU6IFByb2dyZW1TdGF0ZSkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBlbmRDb2RlTGluZShwYXJlbnQ6IEhUTUxFbGVtZW50LCBwYWRkaW5nOiBudW1iZXIpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBlbHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicHJlXCIpO1xuICAgICAgICBlbHQuY2xhc3NMaXN0LmFkZCgncGFkZGluZy0nICsgcGFkZGluZyk7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbHQpO1xuXG4gICAgICAgIHJldHVybiBlbHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBlbmRTcGFuKHBhcmVudDogSFRNTEVsZW1lbnQsIGh0bWxDbGFzczogc3RyaW5nW10sIHRleHQgPSBcIlwiKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgZWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGh0bWxDbGFzcy5mb3JFYWNoKGMgPT4gZWx0LmNsYXNzTGlzdC5hZGQoYykpO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWx0KTtcbiAgICAgICAgZWx0LmlubmVyVGV4dCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBlbHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBlbmRIaW50KHBhcmVudDogSFRNTEVsZW1lbnQsIGh0bWxDbGFzczogc3RyaW5nW10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBwcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicHJlXCIpO1xuICAgICAgICBsZXQgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBodG1sQ2xhc3MuZm9yRWFjaChjID0+IHByZS5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHByZSk7XG4gICAgICAgIHByZS5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgcmV0dXJuIHNwYW47XG4gICAgfVxuXG4gICAgLy8gQnVpbGQgSFRNTCBJbnNwZWN0b3IgYnkgY3Jhd2xpbmcgcmVjdXJzaXZlbHkgQVNUIHN0YWNrc1xuICAgIHByaXZhdGUgdW5zdGFja0FzdChwYXJlbnRFbGVtZW50OiBIVE1MRWxlbWVudCwgc3RhY2s6IEJhc2VOb2RlW10sIHBhZGRpbmc6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBzdGFjay5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYgKCFub2RlKSB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBub3QgYmUgYWJsZSB0byBzaGlmdCBhIG51bGwgbm9kZSAhJyk7XG5cbiAgICAgICAgICAgIGxldCBsaW5lLCBzdGFydExpbmU6IEhUTUxFbGVtZW50LCBlbmRMaW5lLCBuLCB2YXJTcGFuLCBsZWZ0U3BhbiwgcmlnaHRTcGFuO1xuICAgICAgICAgICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdCbG9ja1N0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QocGFyZW50RWxlbWVudCwgbi5ib2R5LCBwYWRkaW5nICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0TGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQobm9kZSwgc3RhcnRMaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4uaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuID0gdGhpcy5hcHBlbmRTcGFuKHN0YXJ0TGluZSwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnZnVuY3Rpb24gJyArIG4uaWQubmFtZSArICcgKCAnOy8vICsgZnVuYy5wYXJhbXMubWFwKHggPT4geC5uYW1lKS5qb2luKCcsICcpICsgJyApIHsnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmFwcGVuZFNwYW4oc3RhcnRMaW5lLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9ICdmdW5jdGlvbiAoICc7Ly8gKyBmdW5jLnBhcmFtcy5tYXAoeCA9PiB4Lm5hbWUpLmpvaW4oJywgJykgKyAnICkgeyc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFyYW1Db3VudCA9IG4ucGFyYW1zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgbi5wYXJhbXMuZm9yRWFjaCgocGFyYW0sIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YXJOYW1lID0gQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhwYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXMuYXBwZW5kU3BhbihzdGFydExpbmUsIFsndmFySWQnXSwgdmFyTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KHBhcmFtLCBzcGFuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpIDwgcGFyYW1Db3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXMuYXBwZW5kU3BhbihzdGFydExpbmUsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9ICcsICc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcGFuID0gdGhpcy5hcHBlbmRTcGFuKHN0YXJ0TGluZSwgW10pO1xuICAgICAgICAgICAgICAgICAgICBzcGFuLmlubmVySFRNTCArPSAnICkgeyc7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHBhcmVudEVsZW1lbnQsIG4uYm9keS5ib2R5LCBwYWRkaW5nICsgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZW5kTGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGVuZExpbmUuaW5uZXJIVE1MID0gJ30nO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0lmU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgSWZTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0TGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQobi50ZXN0LCBzdGFydExpbmUpO1xuICAgICAgICAgICAgICAgICAgICAvL3N0YXJ0TGluZS5pbm5lckhUTUwgPSAnaWYgKCA8c3Bhbj4nICsgRXNjb2RlZ2VuLmdlbmVyYXRlKGlmc3RtdC50ZXN0KSArICc8L3NwYW4+ICkgeyc7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0TGluZS5pbm5lckhUTUwgPSAnaWYgKCAnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3Qoc3RhcnRMaW5lLCBbbi50ZXN0XSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0TGluZS5pbm5lckhUTUwgKz0gJyApIHsnO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChwYXJlbnRFbGVtZW50LCBbbi5jb25zZXF1ZW50XSwgcGFkZGluZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG1pZExpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChuLmFsdGVybmF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWlkTGluZS5pbm5lckhUTUwgPSAnfSBlbHNlIHsnO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHBhcmVudEVsZW1lbnQsIFtuLmFsdGVybmF0ZV0sIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZW5kTGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGVuZExpbmUuaW5uZXJIVE1MID0gJ30nO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1ZhcmlhYmxlRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChub2RlLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5pbm5lckhUTUwgPSBuLmtpbmQgKyAnICc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChsaW5lLCBuLmRlY2xhcmF0aW9ucywgMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnVmFyaWFibGVEZWNsYXJhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICB2YXJTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsndmFySWQnXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQobm9kZSwgdmFyU3Bhbik7XG4gICAgICAgICAgICAgICAgICAgIHZhclNwYW4uaW5uZXJIVE1MID0gQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhuLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4uaW5pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFtdLCAnID0gJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5pdFNwYW4gPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWyd2YXJJbml0J10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KGluaXRTcGFuLCBbbi5pbml0XSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFtdLCAnOycpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgQXNzaWdubWVudEV4cHJlc3Npb247XG4gICAgICAgICAgICAgICAgICAgIGxlZnRTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsndmFySWQnXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQobm9kZSwgbGVmdFNwYW4pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QobGVmdFNwYW4sIFtuLmxlZnRdLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFtdLCAnID0gJyk7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0U3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ3ZhckluaXQnXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChyaWdodFNwYW4sIFtuLnJpZ2h0XSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbXSwgJzsnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdCaW5hcnlFeHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgQmluYXJ5RXhwcmVzc2lvbjtcbiAgICAgICAgICAgICAgICAgICAgbGVmdFNwYW4gPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWydsZWZ0QmluJ10pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QobGVmdFNwYW4sIFtuLmxlZnRdLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFtdLCAnICcgKyBuLm9wZXJhdG9yICsgJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsncmlnaHRCaW4nXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChyaWdodFNwYW4sIFtuLnJpZ2h0XSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnRXhwcmVzc2lvblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIEV4cHJlc3Npb25TdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KG5vZGUsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QobGluZSwgW24uZXhwcmVzc2lvbl0sIDApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1JldHVyblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIFJldHVyblN0YXRlbWVudFxuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChub2RlLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5pbm5lckhUTUwgPSBlc2NvZGVHZW5lcmF0ZShub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGVmYXVsdDonLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ25zeS0nICsgbm9kZS50eXBlXSwgZXNjb2RlR2VuZXJhdGUobm9kZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KG5vZGUsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZEh0bWxUcmVlMigpIHtcbiAgICAgICAgY29uc3QgY29kZVJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLnByb2dyZW1Db2RlTGluZXMucHVzaChjb2RlUm9vdCk7XG4gICAgICAgIHRoaXMudW5zdGFja0FzdChjb2RlUm9vdCwgW3RoaXMucHJvZ3JlbUNvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbigpXSwgMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZEh0bWxUcmVlMygpOiBFc1RvSHRtbFRyZWVTdG9yZSB7XG4gICAgICAgIGNvbnN0IGNvZGVSb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGhpcy5wcm9ncmVtQ29kZUxpbmVzLnB1c2goY29kZVJvb3QpO1xuICAgICAgICBcbiAgICAgICAgbGV0IGZhY3RvcnkgPSBuZXcgQ29kZVNwb29sZXJFc1RvSHRtbFRyZWVNYXBwZXJGYWN0b3J5KCk7XG4gICAgICAgIGxldCB0cmVlU3RvcmUgPSBmYWN0b3J5LmJ1aWxkKHRoaXMucHJvZ3JlbUNvZGUpO1xuXG4gICAgICAgIHRyZWVTdG9yZS5wYWludEludG8oY29kZVJvb3QpO1xuXG4gICAgICAgIHJldHVybiB0cmVlU3RvcmU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZEh0bWxUcmVlKCkge1xuICAgICAgICBjb25zdCBjb2RlUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IHN0YWNrOiBCYXNlTm9kZVtdID0gW3RoaXMucHJvZ3JlbUNvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbigpXTtcbiAgICAgICAgbGV0IHBhZGRpbmcgPSAwO1xuXG4gICAgICAgIC8vdGhpcy5wcm9ncmVtQ29kZS5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCkuYm9keS5ib2R5Lm1hcChuID0+IHN0YWNrLnB1c2gobikpO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICghbm9kZSkgdGhyb3cgbmV3IEVycm9yKCdTaG91bGQgbm90IGJlIGFibGUgdG8gc2hpZnQgYSBudWxsIG5vZGUgIScpO1xuICAgICAgICAgICAgdmFyIGxpbmU7XG5cbiAgICAgICAgICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2sgPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nKytcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suYm9keS5zbGljZSgwKS5yZXZlcnNlKCkubWFwKHggPT4gc3RhY2sudW5zaGlmdCh4KSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VuZEJsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIGhhY2sgdG8gY2xvc2UgYW4gb3BlbmVkIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmctLTtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUoY29kZVJvb3QsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9ICd9JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIGxldCBmdW5jID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShjb2RlUm9vdCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmdW5jLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9ICdmdW5jdGlvbiAnICsgZnVuYy5pZC5uYW1lICsgJyAoKSB7JzsvLyArIGZ1bmMucGFyYW1zLm1hcCh4ID0+IHgubmFtZSkuam9pbignLCAnKSArICcgKSB7JztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUuaW5uZXJIVE1MID0gJ2Z1bmN0aW9uICgpIHsnOy8vICsgZnVuYy5wYXJhbXMubWFwKHggPT4geC5uYW1lKS5qb2luKCcsICcpICsgJyApIHsnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoeyB0eXBlOiAnRW5kQmxvY2tTdGF0ZW1lbnQnIH0pOyAvLyBIYWNrIHRvIGRlbGF5IGEgYmxvY2sgZW5kXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoZnVuYy5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnSWZTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBsZXQgaWZzdG10ID0gbm9kZSBhcyBJZlN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUoY29kZVJvb3QsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9ICdpZiAoIDxzcGFuPicgKyBlc2NvZGVHZW5lcmF0ZShpZnN0bXQudGVzdCkgKyAnPC9zcGFuPiApIHsnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KGlmc3RtdC50ZXN0LCBsaW5lKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaWZzdG10LmFsdGVybmF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh7IHR5cGU6ICdFbmRCbG9ja1N0YXRlbWVudCcgfSk7IC8vIEhhY2sgdG8gZGVsYXkgYSBibG9jayBlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoaWZzdG10LmFsdGVybmF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh7IHR5cGU6ICdFbHNlQmxvY2tTdGF0ZW1lbnQnIH0pOyAvLyBIYWNrIHRvIGRlbGF5IGFuIGVsc2UgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdChpZnN0bXQuY29uc2VxdWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Vsc2VCbG9ja1N0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBoYWNrIHRvIGNsb3NlIGFuIG9wZW5lZCBibG9ja1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nLS07XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKGNvZGVSb290LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5pbm5lckhUTUwgPSAnfSBlbHNlIHsnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShjb2RlUm9vdCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUudGV4dENvbnRlbnQgPSBlc2NvZGVHZW5lcmF0ZShub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5jbGFzc0xpc3QuYWRkKCdzdGF0ZW1lbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChub2RlLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBCYXNlTm9kZSwgQmxvY2tTdGF0ZW1lbnQsIEZ1bmN0aW9uRGVjbGFyYXRpb24sIElmU3RhdGVtZW50LCBWYXJpYWJsZURlY2xhcmF0aW9uLCBWYXJpYWJsZURlY2xhcmF0b3IsIEFzc2lnbm1lbnRFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBFeHByZXNzaW9uU3RhdGVtZW50LCBSZXR1cm5TdGF0ZW1lbnQgfSBmcm9tIFwiZXN0cmVlXCI7XG5pbXBvcnQgeyBQcm9ncmVtQ29kZSB9IGZyb20gXCIuL0NvZGVTZXJ2aWNlXCI7XG5pbXBvcnQgeyBBc3RIZWxwZXIgfSBmcm9tIFwiLi9Bc3RIZWxwZXJcIjtcbmltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcblxuZXhwb3J0IGludGVyZmFjZSBFc1RvSHRtbFRyZWVTdG9yZSB7XG4gICAgcGFpbnRJbnRvKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZFxuICAgIHN0eWxlQ2xhc3NlcygpOiBzdHJpbmdbXVxuICAgIGFkZFN0eWxlQ2xhc3Nlcyhub2RlOiBCYXNlTm9kZSwgY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkXG4gICAgcmVtb3ZlU3R5bGVDbGFzc2VzKGNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZFxuICAgIHNldFN0eWxlUHJvcGVydHkobm9kZTogQmFzZU5vZGUsIHByb3BOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkXG4gICAgcmVzZXRTdHlsZSgpOiB2b2lkXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXNUb0h0bWxUcmVlU3RvcmVGYWN0b3J5IHtcbiAgICBidWlsZChjb2RlOiBQcm9ncmVtQ29kZSk6IEVzVG9IdG1sVHJlZVN0b3JlXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXNUb0h0bWxGYWN0b3J5IHtcbiAgICBidWlsZChub2RlOiBCYXNlTm9kZSk6IE1hcDxCYXNlTm9kZSwgSFRNTEVsZW1lbnQ+O1xufVxuXG5leHBvcnQgY2xhc3MgQmFzaWNFc1RvSHRtbFRyZWVTdG9yZSBpbXBsZW1lbnRzIEVzVG9IdG1sVHJlZVN0b3JlIHtcblxuICAgIHByaXZhdGUgYmFja2luZ01hcDogTWFwPEJhc2VOb2RlLCBIVE1MRWxlbWVudD4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBhZGRlZENsYXNzZXM6IE1hcDxCYXNlTm9kZSwgc3RyaW5nW10+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgYWRkZWRTdHlsZVByb3BzOiBNYXA8QmFzZU5vZGUsIHN0cmluZ1tdPiA9IG5ldyBNYXAoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbm9kZXM6IEJhc2VOb2RlW10sIHByaXZhdGUgaHRtbEZhY3Rvcnk6IEVzVG9IdG1sRmFjdG9yeSkge1xuICAgICAgICBub2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgICAgICAgbGV0IG1hcHBpbmcgPSBodG1sRmFjdG9yeS5idWlsZChuKTtcbiAgICAgICAgICAgIGxldCBpdGVyYXRvciA9IG1hcHBpbmcuZW50cmllcygpO1xuICAgICAgICAgICAgbGV0IGVudHJ5ID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgd2hpbGUoIWVudHJ5LmRvbmUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gZW50cnkudmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5iYWNraW5nTWFwLnNldCh2YWxbMF0sIHZhbFsxXSk7XG4gICAgICAgICAgICAgICAgZW50cnkgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcGFpbnRJbnRvKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMubm9kZXMuZm9yRWFjaChuID0+IHtcbiAgICAgICAgICAgIGxldCBlbHQgPSB0aGlzLmJhY2tpbmdNYXAuZ2V0KG4pO1xuICAgICAgICAgICAgaWYgKGVsdCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9ICAgIFxuICAgIFxuICAgIHN0eWxlQ2xhc3NlcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIGxldCByZXN1bHQ6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGxldCBpdGVyYXRvciA9IHRoaXMuYmFja2luZ01hcC52YWx1ZXMoKTtcbiAgICAgICAgbGV0IHJlcyA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgd2hpbGUoIXJlcy5kb25lKSB7XG4gICAgICAgICAgICBsZXQgZWx0ID0gcmVzLnZhbHVlO1xuICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5mb3JFYWNoKGMgPT4gcmVzdWx0LnB1c2goYykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBzZXRTdHlsZVByb3BlcnR5KG5vZGU6IEJhc2VOb2RlLCBwcm9wTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBlbHQgPSB0aGlzLmJhY2tpbmdNYXAuZ2V0KG5vZGUpO1xuICAgICAgICBpZiAoZWx0KSB7XG4gICAgICAgICAgICBlbHQuc3R5bGUuc2V0UHJvcGVydHkocHJvcE5hbWUsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuYWRkZWRTdHlsZVByb3BzLnNldChub2RlLCBbcHJvcE5hbWUsIHZhbHVlXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRTdHlsZUNsYXNzZXMobm9kZTogQmFzZU5vZGUsIGNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgICAgIGxldCBlbHQgPSB0aGlzLmJhY2tpbmdNYXAuZ2V0KG5vZGUpO1xuICAgICAgICBpZiAoZWx0KSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBjbGFzc2VzLmZvckVhY2goYyA9PiBlbHQuY2xhc3NMaXN0LmFkZChjKSk7XG4gICAgICAgICAgICB0aGlzLmFkZGVkQ2xhc3Nlcy5zZXQobm9kZSwgY2xhc3Nlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVTdHlsZUNsYXNzZXMoY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgLy8gRklYTUUgY2xlYW4gdGhlIHRoaXMuYWRkZWRDbGFzc2VzIG1hcFxuICAgICAgICBsZXQgaXRlcmF0b3IgPSB0aGlzLmFkZGVkQ2xhc3Nlcy5lbnRyaWVzKCk7XG4gICAgICAgIGxldCBlbnRyeSA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgd2hpbGUoIWVudHJ5LmRvbmUpIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gZW50cnkudmFsdWVbMF07XG4gICAgICAgICAgICBsZXQgY2xhc3NlcyA9IGVudHJ5LnZhbHVlWzFdO1xuICAgICAgICAgICAgbGV0IGVsdCA9IHRoaXMuYmFja2luZ01hcC5nZXQobm9kZSk7XG4gICAgICAgICAgICBpZiAoZWx0KSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIGNsYXNzZXMuZm9yRWFjaCggYyA9PiBlbHQuY2xhc3NMaXN0LnJlbW92ZShjKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVudHJ5ID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRTdHlsZSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gdGhpcy5hZGRlZENsYXNzZXMuZW50cmllcygpO1xuICAgICAgICBsZXQgZW50cnkgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIHdoaWxlKCFlbnRyeS5kb25lKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGVudHJ5LnZhbHVlWzBdO1xuICAgICAgICAgICAgbGV0IGNsYXNzZXMgPSBlbnRyeS52YWx1ZVsxXTtcbiAgICAgICAgICAgIGxldCBlbHQgPSB0aGlzLmJhY2tpbmdNYXAuZ2V0KG5vZGUpO1xuICAgICAgICAgICAgaWYgKGVsdCkge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBjbGFzc2VzLmZvckVhY2goIGMgPT4gZWx0LmNsYXNzTGlzdC5yZW1vdmUoYykpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbnRyeSA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkZWRTdHlsZVByb3BzLmVudHJpZXMoKTtcbiAgICAgICAgZW50cnkgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIHdoaWxlKCFlbnRyeS5kb25lKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGVudHJ5LnZhbHVlWzBdO1xuICAgICAgICAgICAgbGV0IHByb3BOYW1lID0gZW50cnkudmFsdWVbMV1bMF07XG4gICAgICAgICAgICBsZXQgZWx0ID0gdGhpcy5iYWNraW5nTWFwLmdldChub2RlKTtcbiAgICAgICAgICAgIGlmIChlbHQpIHtcbiAgICAgICAgICAgICAgICBlbHQuc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW50cnkgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIENvZGVTcG9vbGVyRXNUb0h0bWxGYWN0b3J5IGltcGxlbWVudHMgRXNUb0h0bWxGYWN0b3J5IHtcblxuICAgIHByaXZhdGUgYXBwZW5kQ29kZUxpbmUocGFyZW50OiBIVE1MRWxlbWVudCwgcGFkZGluZzogbnVtYmVyKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgZWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInByZVwiKTtcbiAgICAgICAgZWx0LmNsYXNzTGlzdC5hZGQoJ3BhZGRpbmctJyArIHBhZGRpbmcpO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWx0KTtcblxuICAgICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwZW5kU3BhbihwYXJlbnQ6IEhUTUxFbGVtZW50LCBodG1sQ2xhc3M6IHN0cmluZ1tdLCB0ZXh0ID0gXCJcIik6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGVsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBodG1sQ2xhc3MuZm9yRWFjaChjID0+IGVsdC5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsdCk7XG4gICAgICAgIGVsdC5pbm5lclRleHQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwZW5kSGludChwYXJlbnQ6IEhUTUxFbGVtZW50LCBodG1sQ2xhc3M6IHN0cmluZ1tdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgcHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInByZVwiKTtcbiAgICAgICAgbGV0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgaHRtbENsYXNzLmZvckVhY2goYyA9PiBwcmUuY2xhc3NMaXN0LmFkZChjKSk7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChwcmUpO1xuICAgICAgICBwcmUuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIHJldHVybiBzcGFuO1xuICAgIH1cblxuICAgIC8vIEJ1aWxkIEhUTUwgSW5zcGVjdG9yIGJ5IGNyYXdsaW5nIHJlY3Vyc2l2ZWx5IEFTVCBzdGFja3NcbiAgICBwcml2YXRlIHVuc3RhY2tBc3QocGFyZW50RWxlbWVudDogSFRNTEVsZW1lbnQsIHN0YWNrOiBCYXNlTm9kZVtdLCBtYXBwaW5nOiBNYXA8QmFzZU5vZGUsIEhUTUxFbGVtZW50PiwgcGFkZGluZzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHN0YWNrLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICBpZiAoIW5vZGUpIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBiZSBhYmxlIHRvIHNoaWZ0IGEgbnVsbCBub2RlICEnKTtcblxuICAgICAgICAgICAgbGV0IGxpbmUsIHN0YXJ0TGluZTogSFRNTEVsZW1lbnQsIGVuZExpbmUsIG4sIHZhclNwYW4sIGxlZnRTcGFuLCByaWdodFNwYW47XG4gICAgICAgICAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Jsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgQmxvY2tTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChwYXJlbnRFbGVtZW50LCBuLmJvZHksIG1hcHBpbmcsIHBhZGRpbmcgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdGdW5jdGlvbkRlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwcGluZy5zZXQobm9kZSwgc3RhcnRMaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4uaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuID0gdGhpcy5hcHBlbmRTcGFuKHN0YXJ0TGluZSwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnZnVuY3Rpb24gJyArIG4uaWQubmFtZSArICcgKCAnOy8vICsgZnVuYy5wYXJhbXMubWFwKHggPT4geC5uYW1lKS5qb2luKCcsICcpICsgJyApIHsnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmFwcGVuZFNwYW4oc3RhcnRMaW5lLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9ICdmdW5jdGlvbiAoICc7Ly8gKyBmdW5jLnBhcmFtcy5tYXAoeCA9PiB4Lm5hbWUpLmpvaW4oJywgJykgKyAnICkgeyc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFyYW1Db3VudCA9IG4ucGFyYW1zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgbi5wYXJhbXMuZm9yRWFjaCgocGFyYW0sIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YXJOYW1lID0gQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhwYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXMuYXBwZW5kU3BhbihzdGFydExpbmUsIFsndmFySWQnXSwgdmFyTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBwaW5nLnNldChwYXJhbSwgc3Bhbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IHBhcmFtQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmFwcGVuZFNwYW4oc3RhcnRMaW5lLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnLCAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXMuYXBwZW5kU3BhbihzdGFydExpbmUsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgKz0gJyApIHsnO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChwYXJlbnRFbGVtZW50LCBuLmJvZHkuYm9keSwgbWFwcGluZywgcGFkZGluZyArIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGVuZExpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBlbmRMaW5lLmlubmVySFRNTCA9ICd9JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdJZlN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIElmU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBzdGFydExpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBtYXBwaW5nLnNldChuLnRlc3QsIHN0YXJ0TGluZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vc3RhcnRMaW5lLmlubmVySFRNTCA9ICdpZiAoIDxzcGFuPicgKyBFc2NvZGVnZW4uZ2VuZXJhdGUoaWZzdG10LnRlc3QpICsgJzwvc3Bhbj4gKSB7JztcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMaW5lLmlubmVySFRNTCA9ICdpZiAoICc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChzdGFydExpbmUsIFtuLnRlc3RdLCBtYXBwaW5nLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMaW5lLmlubmVySFRNTCArPSAnICkgeyc7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHBhcmVudEVsZW1lbnQsIFtuLmNvbnNlcXVlbnRdLCBtYXBwaW5nLCBwYWRkaW5nKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbWlkTGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG4uYWx0ZXJuYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaWRMaW5lLmlubmVySFRNTCA9ICd9IGVsc2Ugeyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QocGFyZW50RWxlbWVudCwgW24uYWx0ZXJuYXRlXSwgbWFwcGluZywgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlbmRMaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgZW5kTGluZS5pbm5lckhUTUwgPSAnfSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnVmFyaWFibGVEZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIFZhcmlhYmxlRGVjbGFyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBtYXBwaW5nLnNldChub2RlLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5pbm5lckhUTUwgPSBuLmtpbmQgKyAnICc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChsaW5lLCBuLmRlY2xhcmF0aW9ucywgbWFwcGluZywgMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnVmFyaWFibGVEZWNsYXJhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICB2YXJTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsndmFySWQnXSk7XG4gICAgICAgICAgICAgICAgICAgIG1hcHBpbmcuc2V0KG5vZGUsIHZhclNwYW4pO1xuICAgICAgICAgICAgICAgICAgICB2YXJTcGFuLmlubmVySFRNTCA9IEFzdEhlbHBlci5wYXR0ZXJuVG9TdHJpbmcobi5pZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuLmluaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbXSwgJyA9ICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluaXRTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsndmFySW5pdCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChpbml0U3BhbiwgW24uaW5pdF0sIG1hcHBpbmcsIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbXSwgJzsnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdBc3NpZ25tZW50RXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuICAgICAgICAgICAgICAgICAgICBsZWZ0U3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ3ZhcklkJ10pO1xuICAgICAgICAgICAgICAgICAgICBtYXBwaW5nLnNldChub2RlLCBsZWZ0U3Bhbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChsZWZ0U3BhbiwgW24ubGVmdF0sIG1hcHBpbmcsIDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgW10sICcgPSAnKTtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsndmFySW5pdCddKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHJpZ2h0U3BhbiwgW24ucmlnaHRdLCBtYXBwaW5nLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFtdLCAnOycpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0JpbmFyeUV4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBCaW5hcnlFeHByZXNzaW9uO1xuICAgICAgICAgICAgICAgICAgICBsZWZ0U3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ2xlZnRCaW4nXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChsZWZ0U3BhbiwgW24ubGVmdF0sIG1hcHBpbmcsIDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgW10sICcgJyArIG4ub3BlcmF0b3IgKyAnICcpO1xuICAgICAgICAgICAgICAgICAgICByaWdodFNwYW4gPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWydyaWdodEJpbiddKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHJpZ2h0U3BhbiwgW24ucmlnaHRdLCBtYXBwaW5nLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdFeHByZXNzaW9uU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgRXhwcmVzc2lvblN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIG1hcHBpbmcuc2V0KG5vZGUsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QobGluZSwgW24uZXhwcmVzc2lvbl0sIG1hcHBpbmcsIDApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1JldHVyblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIFJldHVyblN0YXRlbWVudFxuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwcGluZy5zZXQobm9kZSwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUuaW5uZXJIVE1MID0gZXNjb2RlR2VuZXJhdGUobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RlZmF1bHQ6Jywgbm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWyduc3ktJyArIG5vZGUudHlwZV0sIGVzY29kZUdlbmVyYXRlKG5vZGUpKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwcGluZy5zZXQobm9kZSwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBidWlsZChub2RlOiBCYXNlTm9kZSk6IE1hcDxCYXNlTm9kZSwgSFRNTEVsZW1lbnQ+IHtcbiAgICAgICAgY29uc3QgY29kZVJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBsZXQgbWFwcGluZyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy51bnN0YWNrQXN0KGNvZGVSb290LCBbbm9kZV0sIG1hcHBpbmcsIDApO1xuICAgICAgICBjb25zb2xlLmxvZygnbWFwcGluZzonLCBtYXBwaW5nKTtcbiAgICAgICAgcmV0dXJuIG1hcHBpbmc7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgY2xhc3MgQ29kZVNwb29sZXJFc1RvSHRtbFRyZWVNYXBwZXJGYWN0b3J5IGltcGxlbWVudHMgRXNUb0h0bWxUcmVlU3RvcmVGYWN0b3J5IHtcbiAgICBcbiAgICBwcml2YXRlIGh0bWxGYWN0b3J5ID0gbmV3IENvZGVTcG9vbGVyRXNUb0h0bWxGYWN0b3J5KCk7XG5cbiAgICBidWlsZChjb2RlOiBQcm9ncmVtQ29kZSk6IEVzVG9IdG1sVHJlZVN0b3JlIHtcbiAgICAgICAgbGV0IHN0b3JlID0gbmV3IEJhc2ljRXNUb0h0bWxUcmVlU3RvcmUoW2NvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbigpXSwgdGhpcy5odG1sRmFjdG9yeSk7XG4gICAgICAgIHJldHVybiBzdG9yZTtcbiAgICB9XG4gICAgXG59IiwiXG5pbXBvcnQgeyBQcm9ncmFtLCBwYXJzZU1vZHVsZSB9IGZyb20gJ2VzcHJpbWEnO1xuaW1wb3J0IHsgd2FsayBhcyBlc3ByaW1hV2FsayB9IGZyb20gJ2VzcHJpbWEtd2Fsayc7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBCYXNlTm9kZSwgRnVuY3Rpb25EZWNsYXJhdGlvbiwgQmxvY2tTdGF0ZW1lbnQsIElmU3RhdGVtZW50LCBSZXR1cm5TdGF0ZW1lbnQsIFN0YXRlbWVudCB9IGZyb20gJ2VzdHJlZSc7XG5pbXBvcnQgeyBQcm9ncmVtU3RhdGUgfSBmcm9tICcuL1NjaGVkdWxpbmdTZXJ2aWNlJztcblxuZXhwb3J0IGNsYXNzIENvZGVTdGF0ZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgbm9kZTogQmFzZU5vZGUsXG4gICAgICAgIC8vcHVibGljIGNvZGU6IHN0cmluZ1xuICAgICkge307XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29kZVN0YXRlbWVudEZhY3Rvcnk8VD4ge1xuICAgIGJ1aWxkKHBhcmFtOiBUKTogQ29kZVN0YXRlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2RlSXRlcmF0b3Ige1xuICAgIGV4ZWN1dGVOZXh0KCk6IENvZGVTdGF0ZW1lbnQ7XG4gICAgaGFzTmV4dCgpOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZW1Db2RlIHtcbiAgICBpbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpOiBGdW5jdGlvbkRlY2xhcmF0aW9uXG4gICAgY29sb3JlclByb2dyZW1GdW5jdGlvbigpOiBGdW5jdGlvbkRlY2xhcmF0aW9uXG4gICAgaXRlcmF0b3Ioc3RhdGU6IFByb2dyZW1TdGF0ZSk6IENvZGVJdGVyYXRvcjtcbn1cblxuY2xhc3MgQmFzaWNFc3ByaW1hQ29kZVN0YXRlbWVudEZhY3RvcnkgaW1wbGVtZW50cyBDb2RlU3RhdGVtZW50RmFjdG9yeTxTdGF0ZW1lbnQ+IHtcblxuICAgIGJ1aWxkKHBhcmFtOiBCYXNlTm9kZSk6IENvZGVTdGF0ZW1lbnQge1xuICAgICAgICAvKlxuICAgICAgICBpZiAocGFyYW0udHlwZSA9PT0gJ1JldHVyblN0YXRlbWVudCcpIHtcbiAgICAgICAgICAgIGxldCBzdG10ID0gcGFyYW0gYXMgUmV0dXJuU3RhdGVtZW50O1xuICAgICAgICAgICAgbGV0IGNvZGUgPSBFc2NvZGVnZW4uZ2VuZXJhdGUoc3RtdCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENvZGVTdGF0ZW1lbnQoY29kZSk7XG4gICAgICAgIH0gZWxzZSBpZiAocGFyYW0udHlwZSA9PT0gJ0lmU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgbGV0IHN0bXQgPSBwYXJhbSBhcyBJZlN0YXRlbWVudDtcbiAgICAgICAgICAgIGxldCBjb2RlID0gRXNjb2RlZ2VuLmdlbmVyYXRlKHN0bXQudGVzdCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENvZGVTdGF0ZW1lbnQoY29kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgY29kZSA9IEVzY29kZWdlbi5nZW5lcmF0ZShwYXJhbSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENvZGVTdGF0ZW1lbnQoY29kZSk7XG4gICAgICAgIH0qL1xuXG4gICAgICAgIGlmIChwYXJhbSkgXG4gICAgICAgICAgICByZXR1cm4gbmV3IENvZGVTdGF0ZW1lbnQocGFyYW0pO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGJ1aWxkIG5vbiBzdGF0ZW1lbnQgY29kZSAhJyk7XG4gICAgfVxufVxuXG5jbGFzcyBCYXNpY0VzcHJpbWFDb2RlSXRlcmF0b3IgaW1wbGVtZW50cyBDb2RlSXRlcmF0b3Ige1xuXG4gICAgcHJpdmF0ZSBzdGFjazogQmFzZU5vZGVbXSA9IFtdO1xuICAgIHByaXZhdGUgY29kZVN0YXRlbWVudEZhY3RvcnkgPSBuZXcgQmFzaWNFc3ByaW1hQ29kZVN0YXRlbWVudEZhY3RvcnkoKTtcbiAgICBwcml2YXRlIHJldHVyblZhbHVlOiBhbnkgPSBudWxsO1xuICAgIHByaXZhdGUgZmluaXNoZWQgPSBmYWxzZVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgICAgICBwcml2YXRlIHJvb3ROb2RlOiBCYXNlTm9kZSwgXG4gICAgICAgICAgICBwcml2YXRlIHN0YXRlOiBQcm9ncmVtU3RhdGUpIHtcbiAgICAgICAgdGhpcy5zdGFjay5wdXNoKHJvb3ROb2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlY2xhcmVQcm9ncmVtQXJndW1lbnRzKCkge1xuICAgICAgICBsZXQgX2NvbG9ubmUgPSB0aGlzLnN0YXRlLmNvbG9ubmU7XG4gICAgICAgIGxldCBfbGlnbmUgPSB0aGlzLnN0YXRlLmxpZ25lO1xuICAgICAgICBsZXQgX2NvbnRleHRlID0gdGhpcy5zdGF0ZS5jb250ZXh0ZTtcblxuICAgICAgICB0aGlzLnN0YXRlLmV2YWwoJ3ZhciBjb2xvbm5lID0gJyArIF9jb2xvbm5lICsgJywgbGlnbmUgPSAnICsgX2xpZ25lICsgJzsnKTtcbiAgICAgICAgdGhpcy5zdGF0ZS5ldmFsKCd2YXIgY29udGV4dGUgPSAnICsgSlNPTi5zdHJpbmdpZnkoX2NvbnRleHRlKSk7XG4gICAgfVxuXG4gICAgZXhlY3V0ZU5leHQoKTogQ29kZVN0YXRlbWVudCB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgZmlyc3Qgbm9kZSBvbiB0aGUgc3RhY2tcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5zdGFjay5zaGlmdCgpO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdOb2RlOicsIG5vZGUpO1xuXG4gICAgICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0YWNrIHNob3VsZCBub3QgYmUgZW1wdHkgIScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3RtdDtcblxuICAgICAgICAgICAgc3dpdGNoKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Z1bmN0aW9uRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICBsZXQgZnVuYyA9IG5vZGUgYXMgRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KGZ1bmMuYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjbGFyZVByb2dyZW1Bcmd1bWVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29kZVN0YXRlbWVudEZhY3RvcnkuYnVpbGQoZnVuYyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2sgPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBibG9jay5ib2R5LnNsaWNlKCkucmV2ZXJzZSgpLm1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0Jsb2NrU3RhdGVtZW50IHVuc2hpZnRpbmc6JywgeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoeClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnSWZTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBzdG10ID0gbm9kZSBhcyBJZlN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3RDb2RlID0gZXNjb2RlR2VuZXJhdGUoc3RtdC50ZXN0KTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdFJlc3VsdCA9IHRoaXMuc3RhdGUuZXZhbCh0ZXN0Q29kZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0lmU3RhdGVtZW50IHRlc3QgZXZhbHVhdGUgdG86ICcsIHRlc3RSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVzdFJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnVGhlbiB1bnNoaWZ0aW5nOicsIHN0bXQuY29uc2VxdWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoc3RtdC5jb25zZXF1ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdG10LmFsdGVybmF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0Vsc2UgdW5zaGlmdGluZzonLCBzdG10LmFsdGVybmF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay51bnNoaWZ0KHN0bXQuYWx0ZXJuYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvZGVTdGF0ZW1lbnRGYWN0b3J5LmJ1aWxkKHN0bXQudGVzdCk7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdSZXR1cm5TdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBzdG10ID0gbm9kZSBhcyBSZXR1cm5TdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV0dXJuVmFsdWUgPSB0aGlzLnN0YXRlLmV2YWwoZXNjb2RlR2VuZXJhdGUoc3RtdC5hcmd1bWVudCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29kZVN0YXRlbWVudEZhY3RvcnkuYnVpbGQoc3RtdCk7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdOb2RlOicsIG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29kZSA9IGVzY29kZUdlbmVyYXRlKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdHZW5lcmF0ZWQgY29kZTonLCBjb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGV2YWxSZXN1bHQgPSB0aGlzLnN0YXRlLmV2YWwoY29kZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0V2YWx1YXRlIHRvOicsIGV2YWxSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb2RlU3RhdGVtZW50RmFjdG9yeS5idWlsZChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAodGhpcy5zdGFjay5sZW5ndGggPiAwKTtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0l0ZXJhdG9yIGhhcyBubyBtb3JlIGNvZGUgdG8gZXhlY3V0ZSAhJyk7XG4gICAgfSAgICBcbiAgICBcbiAgICBoYXNOZXh0KCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5maW5pc2hlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5vZGVzID0gdGhpcy5zdGFjay5zbGljZSgwKTtcbiAgICAgICAgd2hpbGUgKG5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gbm9kZXMuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudHlwZSAhPT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2tzOiBCbG9ja1N0YXRlbWVudFtdID0gW107XG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9jayA9IG5vZGUgYXMgQmxvY2tTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKGJsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGFyc291cnMgcmVjdXJzaXZlbWVudCBsZXMgYmxvY2tzIMOgIGxhIHJlY2hlcmNoZSBkZSBub2V1ZCBxdWkgbmUgc29udCBwYXMgZGVzIGJsb2Nrc1xuICAgICAgICAgICAgICAgICAgICBsZXQgaGFzTmV4dCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIWhhc05leHQgJiYgYmxvY2tzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiID0gYmxvY2tzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGIuYm9keS5tYXAoeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4LnR5cGUgIT09ICdCbG9ja1N0YXRlbWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc05leHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzTmV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGNsYXNzIEVzcHJpbWFQcm9ncmVtQ29kZSBpbXBsZW1lbnRzIFByb2dyZW1Db2RlIHtcblxuICAgIHByaXZhdGUgZXNwcmltYVByb2dyYW06IFByb2dyYW07XG5cbiAgICBjb25zdHJ1Y3Rvcihjb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5lc3ByaW1hUHJvZ3JhbSA9IHBhcnNlTW9kdWxlKGNvZGUpO1xuICAgIH1cblxuXG4gICAgcHVibGljIGluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCk6IEZ1bmN0aW9uRGVjbGFyYXRpb24ge1xuICAgICAgICB2YXIgcmVzdWx0OiBGdW5jdGlvbkRlY2xhcmF0aW9uIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIGVzcHJpbWFXYWxrKHRoaXMuZXNwcmltYVByb2dyYW0sIG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYoIG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nICYmIG5vZGUuaWQgJiYgbm9kZS5pZC5uYW1lID09PSAnaW5pdGlhbGlzZXJQcm9ncmVtJyApIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ICk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBvc3NpYmxlIGRlIHRyb3V2ZXIgdW5lIGZvbmN0aW9uIGNvbG9yZXJQcm9ncmVtKCkgIScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk6IEZ1bmN0aW9uRGVjbGFyYXRpb24ge1xuICAgICAgICB2YXIgcmVzdWx0OiBGdW5jdGlvbkRlY2xhcmF0aW9uIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIGVzcHJpbWFXYWxrKHRoaXMuZXNwcmltYVByb2dyYW0sIG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYoIG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nICYmIG5vZGUuaWQgJiYgbm9kZS5pZC5uYW1lID09PSAnY29sb3JlclByb2dyZW0nICkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gKTtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcG9zc2libGUgZGUgdHJvdXZlciB1bmUgZm9uY3Rpb24gY29sb3JlclByb2dyZW0oKSAhJyk7XG4gICAgfVxuXG4gICAgaXRlcmF0b3Ioc3RhdGU6IFByb2dyZW1TdGF0ZSk6IENvZGVJdGVyYXRvciB7XG4gICAgICAgIHJldHVybiBuZXcgQmFzaWNFc3ByaW1hQ29kZUl0ZXJhdG9yKHRoaXMuY29sb3JlclByb2dyZW1GdW5jdGlvbigpLCBzdGF0ZSk7XG4gICAgfVxufVxuXG5jbGFzcyBQcm9ncmVtQ29kZUZhY3Rvcnkge1xuICAgIHB1YmxpYyBidWlsZChjb2RlOiBzdHJpbmcpOiBQcm9ncmVtQ29kZSB7XG4gICAgICAgIHJldHVybiBuZXcgRXNwcmltYVByb2dyZW1Db2RlKGNvZGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBDb2RlU2VydmljZSB7XG5cbiAgICBleHBvcnQgY29uc3QgcHJvZ3JlbUNvZGVGYWN0b3J5ID0gbmV3IFByb2dyZW1Db2RlRmFjdG9yeSgpO1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGxvYWRQcm9ncmVtKGZpbGVVcmw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjbGllbnQgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIGNsaWVudC5vcGVuKCdHRVQnLCBmaWxlVXJsKTtcbiAgICAgICAgICAgIGNsaWVudC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvZGUgPSBjbGllbnQucmVzcG9uc2VUZXh0O1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvZGVTZXJ2aWNlOiBQcm9ncmVtIGxvYWRlZCBzdWNjZXNzZnVsbHkuJywgY29kZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShjb2RlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjbGllbnQub25lcnJvciA9ICgpID0+IHJlamVjdChjbGllbnQuc3RhdHVzVGV4dCk7XG4gICAgICAgICAgICBjbGllbnQuc2VuZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0iXSwic291cmNlUm9vdCI6IiJ9