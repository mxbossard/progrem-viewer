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
        this.buildHtmlTree2();
    }
    attach(element) {
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
    clear() {
        this.colorMap = new Map();
        if (this.hintStackContainer)
            this.hintStackContainer.innerHTML = "";
        this.mapping.forEach((elt, node) => elt.classList.remove('highlight'));
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
        this.mapping.forEach((elt, node) => elt.classList.remove('highlight'));
        let executedNode = state.codeStatement.node;
        let htmlNode = this.mapping.get(executedNode);
        if (!htmlNode) {
            throw new Error('Unable to found a HTML element mapped for received statement !');
        }
        htmlNode.classList.add('highlight');
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
                        let pElt = this.mapping.get(d);
                        if (pElt)
                            pElt.style.backgroundColor = this.hashStringToColor(varName);
                    });
                }
                else if (node.type === 'AssignmentExpression') {
                    let decl = node;
                    //@ts-ignore
                    let hint = this.appendHint(this.hintStackContainer, []);
                    let varName = AstHelper_1.AstHelper.patternToString(decl.left);
                    hint.innerHTML = varName + ' = ' + state.evalScope.globalEval(varName);
                    hint.style.backgroundColor = this.hashStringToColor(varName);
                    let pElt = this.mapping.get(decl);
                    if (pElt)
                        pElt.style.backgroundColor = this.hashStringToColor(varName);
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
                        let pElt = this.mapping.get(p);
                        if (pElt)
                            pElt.style.backgroundColor = this.hashStringToColor(varName);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb2dyZW1HcmlkLnRzIiwid2VicGFjazovLy8uL3NyYy9FdmFsU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQXN0SGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9Qcm9ncmVtU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2NyZWVuU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2NoZWR1bGluZ1NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb2dyZW1JbnNwZWN0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvZGVTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw2RUFBaUU7QUFDakUsMkVBQStDO0FBRS9DLElBQUksWUFBWSxHQUFHLElBQUksNEJBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN4QyxJQUFJLGFBQWEsR0FBRyxJQUFJLDhCQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVqRCwrQkFBYyxDQUFDLFlBQVksQ0FBQyw2QkFBNkIsRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNHeEYsTUFBYSxzQkFBc0I7SUFNL0IsWUFDWSxZQUEwQixFQUMxQixhQUE0QjtRQUQ1QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQU5oQyxvQkFBZSxHQUFtQixJQUFJLENBQUM7UUFRM0MsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1NBQy9EO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUF3QixDQUFDO1FB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LENBQUMsQ0FBQztnQkFDL0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQztZQUNGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqRCxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBYmUsdUJBQVcsY0FhMUI7QUFFTCxDQUFDLEVBbkJnQixXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQW1CM0IiLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvZ3JlbVNlcnZpY2UsIFByb2dyZW1Db25maWcgfSBmcm9tIFwiLi9Qcm9ncmVtU2VydmljZVwiO1xuaW1wb3J0IHsgU2NyZWVuQ29uZmlnIH0gZnJvbSBcIi4vU2NyZWVuU2VydmljZVwiO1xuXG5sZXQgc2NyZWVuQ29uZmlnID0gbmV3IFNjcmVlbkNvbmZpZygyMCk7XG5sZXQgcHJvZ3JlbUNvbmZpZyA9IG5ldyBQcm9ncmVtQ29uZmlnKDE3LCAxNywgMSk7XG5cblByb2dyZW1TZXJ2aWNlLmJ1aWxkUHJvZ3JlbSgnLi9wcm9ncmVtcy9jb2V1cl9wcm9ncmVtLmpzJywgc2NyZWVuQ29uZmlnLCBwcm9ncmVtQ29uZmlnKTsiLCJpbXBvcnQgeyBHcmlkQ2hhbmdlTGlzdGVuZXIsIFByb2dyZW1TdGF0ZSB9IGZyb20gXCIuL1NjaGVkdWxpbmdTZXJ2aWNlXCI7XG5pbXBvcnQgeyBTY3JlZW5Db25maWcgfSBmcm9tIFwiLi9TY3JlZW5TZXJ2aWNlXCI7XG5pbXBvcnQgeyBQcm9ncmVtQ29uZmlnIH0gZnJvbSBcIi4vUHJvZ3JlbVNlcnZpY2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtR3JpZCB7XG4gICAgY2xlYXIoKTogdm9pZDtcbiAgICBhdHRhY2goZWxlbWVudDogRWxlbWVudCB8IG51bGwpOiB2b2lkXG59XG5cbmV4cG9ydCBjbGFzcyBCYXNpY0NhbnZhc1Byb2dyZW1HcmlkIGltcGxlbWVudHMgUHJvZ3JlbUdyaWQsIEdyaWRDaGFuZ2VMaXN0ZW5lciB7XG4gICAgXG4gICAgcHJpdmF0ZSBhdHRhY2hlZEVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgcHJpdmF0ZSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNjcmVlbkNvbmZpZzogU2NyZWVuQ29uZmlnLCBcbiAgICAgICAgcHJpdmF0ZSBwcm9ncmVtQ29uZmlnOiBQcm9ncmVtQ29uZmlnXG4gICAgICAgICkge1xuICAgICAgICBsZXQgZWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZW0nKTtcbiAgICAgICAgaWYgKCFlbHQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZpbmQgLnByb2dyZW0gQ2FudmFzIGVsZW1lbnQgIScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FudmFzID0gZWx0IGFzIEhUTUxDYW52YXNFbGVtZW50O1xuXG4gICAgICAgIGxldCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBpZiAoIWN0eCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZ2V0IDJEIENhbnZhcyBjb250ZXh0ICEnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGF0dGFjaFRvQ2FudmFzKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHRoaXMucHJvZ3JlbUNvbmZpZy5jb2xvbm5lcyAqIHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLnByb2dyZW1Db25maWcuY29sb25uZXMgKiB0aGlzLnNjcmVlbkNvbmZpZy5ib3hTaXplO1xuXG4gICAgICAgIGxldCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBpZiAoIWN0eCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZ2V0IDJEIENhbnZhcyBjb250ZXh0ICEnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB9XG5cbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5zY3JlZW5Db25maWcuYm94U2l6ZSAqIHRoaXMucHJvZ3JlbUNvbmZpZy5jb2xvbm5lcztcbiAgICAgICAgbGV0IGhlaWdodCA9IHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemUgKiB0aGlzLnByb2dyZW1Db25maWcubGlnbmVzO1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuXG4gICAgYXR0YWNoKGVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXR0YWNoZWRFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnQ0FOVkFTJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoVG9DYW52YXMoZWxlbWVudCBhcyBIVE1MQ2FudmFzRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNoaWxkTm9kZXMuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGMubm9kZU5hbWUgPT09ICdDQU5WQVMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFjaFRvQ2FudmFzKGVsZW1lbnQgYXMgSFRNTENhbnZhc0VsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE5vIENhbnZhcyBmb3VuZCBzbyB3ZSBjcmVhdGUgb25lXG4gICAgICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNoVG9DYW52YXMoY2FudmFzKTtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmaXJlR3JpZENoYW5nZSAoc3RhdGU6IFByb2dyZW1TdGF0ZSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnZ3JpZCBjaGFuZ2U6ICcsIHN0YXRlKTtcblxuICAgICAgICBsZXQgYm94U2l6ZSA9IHRoaXMuc2NyZWVuQ29uZmlnLmJveFNpemU7XG4gICAgICAgIGxldCBjID0gc3RhdGUuY29sb25uZTtcbiAgICAgICAgbGV0IGwgPSBzdGF0ZS5saWduZTtcblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGxldCBjb3VsZXVyID0gY29sb3JlclByb2dyZW0oYywgbCwgc3RhdGUuY29udGV4dGUpO1xuICAgICAgICBpZiAoY291bGV1cikge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY291bGV1cjtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KGMgKiBib3hTaXplLCBsICogYm94U2l6ZSwgYm94U2l6ZSwgYm94U2l6ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsIlxuZXhwb3J0IGNsYXNzIEV2YWxTY29wZSB7XG5cbiAgICAvLyBTZWUgaHR0cDovL3BlcmZlY3Rpb25raWxscy5jb20vZ2xvYmFsLWV2YWwtd2hhdC1hcmUtdGhlLW9wdGlvbnMvXG4gICAgLy8gV2lsbCByZXR1cm4gYW4gZXZhbCBhYmxlIHRvIGV2YWx1YXRlIGpzIGNvZGUgaW4gdGhlIGdsb2JhbCBzY29wZS5cbiAgICBwdWJsaWMgcmVhZG9ubHkgZ2xvYmFsRXZhbCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdmFyIGlzSW5kaXJlY3RFdmFsR2xvYmFsID0gKGZ1bmN0aW9uIChvcmlnaW5hbCwgT2JqZWN0KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vIERvZXMgYE9iamVjdGAgcmVzb2x2ZSB0byBhIGxvY2FsIHZhcmlhYmxlLCBvciB0byBhIGdsb2JhbCwgYnVpbHQtaW4gYE9iamVjdGAsXG4gICAgICAgICAgICAgICAgLy8gcmVmZXJlbmNlIHRvIHdoaWNoIHdlIHBhc3NlZCBhcyBhIGZpcnN0IGFyZ3VtZW50P1xuICAgICAgICAgICAgICAgIHJldHVybiAoMSwgZXZhbCkoJ09iamVjdCcpID09PSBvcmlnaW5hbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBpbmRpcmVjdCBldmFsIGVycm9ycyBvdXQgKGFzIGFsbG93ZWQgcGVyIEVTMyksIHRoZW4ganVzdCBiYWlsIG91dCB3aXRoIGBmYWxzZWBcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKE9iamVjdCwgMTIzKTtcblxuICAgICAgICBpZiAoaXNJbmRpcmVjdEV2YWxHbG9iYWwpIHtcbiAgICAgICAgICAgIC8vIGlmIGluZGlyZWN0IGV2YWwgZXhlY3V0ZXMgY29kZSBnbG9iYWxseSwgdXNlIGl0XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV4cHJlc3Npb246IHN0cmluZykge1xuICAgICAgICAgICAgICAgIHJldHVybiAoMSwgZXZhbCkoZXhwcmVzc2lvbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHdpbmRvdy5leGVjU2NyaXB0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gaWYgYHdpbmRvdy5leGVjU2NyaXB0IGV4aXN0c2AsIHVzZSBpdFxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChleHByZXNzaW9uOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5leGVjU2NyaXB0KGV4cHJlc3Npb24pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG90aGVyd2lzZSwgZ2xvYmFsRXZhbCBpcyBgdW5kZWZpbmVkYCBzaW5jZSBub3RoaW5nIGlzIHJldHVybmVkXG4gICAgICAgIHJldHVybiAoZXhwcjogc3RyaW5nKSA9PiB7dGhyb3cgbmV3IEVycm9yKCdObyBnbG9iYWwgZXZhbCBhdmFpbGFibGUgIScpO31cbiAgICB9KSgpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG59XG4iLCJpbXBvcnQgeyBQYXR0ZXJuLCBJZGVudGlmaWVyLCBCYXNlTm9kZSwgVmFyaWFibGVEZWNsYXJhdGlvbiwgQXNzaWdubWVudEV4cHJlc3Npb24sIEZ1bmN0aW9uRGVjbGFyYXRpb24sIFZhcmlhYmxlRGVjbGFyYXRvciB9IGZyb20gXCJlc3RyZWVcIjtcblxuZXhwb3J0IG5hbWVzcGFjZSBBc3RIZWxwZXIge1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHBhdHRlcm5Ub1N0cmluZyhwYXR0ZXJuOiBQYXR0ZXJuKTogc3RyaW5nIHtcbiAgICAgICAgdmFyIG5vZGU7XG4gICAgICAgIHN3aXRjaCAocGF0dGVybi50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdJZGVudGlmaWVyJzpcbiAgICAgICAgICAgICAgICBub2RlID0gcGF0dGVybiBhcyBJZGVudGlmaWVyO1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlLm5hbWU7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBjb252ZXJ0IHBhdHRlcm4gb2YgdHlwZSAnICsgcGF0dGVybi50eXBlKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gcmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24obm9kZTogQmFzZU5vZGUpOiBWYXJpYWJsZURlY2xhcmF0aW9uIHwgQXNzaWdubWVudEV4cHJlc3Npb24gfCBGdW5jdGlvbkRlY2xhcmF0aW9uIHwgdm9pZCB7XG4gICAgICAgIFxuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnVmFyaWFibGVEZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgIGxldCBkZWNsID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0aW9uO1xuICAgICAgICAgICAgcmV0dXJuIGRlY2w7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnQXNzaWdubWVudEV4cHJlc3Npb24nKSB7XG4gICAgICAgICAgICBsZXQgZXhwciA9IG5vZGUgYXMgQXNzaWdubWVudEV4cHJlc3Npb247XG4gICAgICAgICAgICByZXR1cm4gZXhwcjtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdGdW5jdGlvbkRlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgbGV0IGZ1bmMgPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gZnVuYztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IHAgaW4gbm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChwID09PSAnbGVmdCcgfHwgcCA9PT0gJ3JpZ2h0JyB8fCBwID09PSAnYXJndW1lbnQnIHx8IHAgPT09ICdjYWxsZWUnIHx8IHAgPT09ICdib2R5JyB8fCBwID09PSAnZXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZDogQmFzZU5vZGUgPSBub2RlW3BdIGFzIEJhc2VOb2RlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gcmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24oY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBDb2RlU2VydmljZSB9IGZyb20gXCIuL0NvZGVTZXJ2aWNlXCI7XG5pbXBvcnQgeyBTY2hlZHVsaW5nU2VydmljZSwgUHJvZ3JlbVNjaGVkdWxlciB9IGZyb20gJy4vU2NoZWR1bGluZ1NlcnZpY2UnO1xuaW1wb3J0IHsgQmFzaWNIdG1sRXNwcmltYVByb2dyZW1JbnNwZWN0b3IgfSBmcm9tICcuL1Byb2dyZW1JbnNwZWN0b3InO1xuaW1wb3J0IHsgQmFzaWNDYW52YXNQcm9ncmVtR3JpZCB9IGZyb20gJy4vUHJvZ3JlbUdyaWQnO1xuaW1wb3J0IHsgU2NyZWVuQ29uZmlnIH0gZnJvbSAnLi9TY3JlZW5TZXJ2aWNlJztcblxuZXhwb3J0IGNsYXNzIFByb2dyZW1Db25maWcge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY29sb25uZXM6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGxpZ25lczogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZnJhbWVzOiBudW1iZXIsXG4gICAgKSB7fVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFByb2dyZW1TZXJ2aWNlIHtcblxuICAgIHZhciBwcmV2aW91c1JlcGFpbnRUaW1lID0gMDtcbiAgICB2YXIgc2NoZWR1bGVyOiBQcm9ncmVtU2NoZWR1bGVyO1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJvZ3JlbSh1cmw6IHN0cmluZywgc2NyZWVuQ29uZmlnOiBTY3JlZW5Db25maWcsIHByb2dyZW1Db25maWc6IFByb2dyZW1Db25maWcpIHtcbiAgICAgICAgbGV0IHByb2dyZW1TY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgcHJvZ3JlbVNjcmlwdC5zcmMgPSB1cmw7XG4gICAgICAgIGxldCBib2R5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgICAgaWYgKGJvZHlFbGVtZW50KSB7XG4gICAgICAgICAgICBib2R5RWxlbWVudC5hcHBlbmRDaGlsZChwcm9ncmVtU2NyaXB0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIENvZGVTZXJ2aWNlLmxvYWRQcm9ncmVtKHVybCkudGhlbihjb2RlID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9ncmVtQ29kZSA9IENvZGVTZXJ2aWNlLnByb2dyZW1Db2RlRmFjdG9yeS5idWlsZChjb2RlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9ncmVtIEFTVDonLCBwcm9ncmVtQ29kZS5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKTtcblxuICAgICAgICAgICAgLy8gTG9hZCBpbml0UHJvZ3JlbSBGdW5jdGlvbiBjb2RlXG4gICAgICAgICAgICBsZXQgaW5pdFByb2dyZW1GdW5jdGlvbkNvZGUgPSBlc2NvZGVHZW5lcmF0ZShwcm9ncmVtQ29kZS5pbml0aWFsaXNlclByb2dyZW1GdW5jdGlvbigpKTtcbiAgICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5ldmFsKGluaXRQcm9ncmVtRnVuY3Rpb25Db2RlKTtcblxuICAgICAgICAgICAgc2NoZWR1bGVyID0gU2NoZWR1bGluZ1NlcnZpY2UuYnVpbGRQcm9ncmVtU2NoZWR1bGVyKHByb2dyZW1Db25maWcsIHByb2dyZW1Db2RlKTtcblxuICAgICAgICAgICAgbGV0IHByb2dyZW1JbnNwZWN0b3IgPSBuZXcgQmFzaWNIdG1sRXNwcmltYVByb2dyZW1JbnNwZWN0b3IocHJvZ3JlbUNvZGUsIHNjaGVkdWxlcik7XG5cbiAgICAgICAgICAgIGxldCBjb2RlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb2RlJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29kZUVsZW1lbnQnLCBjb2RlRWxlbWVudCk7XG4gICAgICAgICAgICBwcm9ncmVtSW5zcGVjdG9yLmF0dGFjaChjb2RlRWxlbWVudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBncmlkRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVtJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ3JpZEVsZW1lbnQnLCBncmlkRWxlbWVudCk7XG4gICAgICAgICAgICBsZXQgcHJvZ3JlbUdyaWQgPSBuZXcgQmFzaWNDYW52YXNQcm9ncmVtR3JpZChzY3JlZW5Db25maWcsIHByb2dyZW1Db25maWcpO1xuICAgICAgICAgICAgcHJvZ3JlbUdyaWQuYXR0YWNoKGdyaWRFbGVtZW50KTtcbiAgICAgICAgICAgIHByb2dyZW1HcmlkLmNsZWFyKCk7XG4gICAgICAgICAgICBzY2hlZHVsZXIuc3Vic2NyaWJlR3JpZENoYW5nZShwcm9ncmVtR3JpZCk7XG5cbiAgICAgICAgICAgIHRpbWVyKDApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0aW1lcih0aW1lc3RhbXA6IG51bWJlcikge1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpbWVyKTtcblxuICAgICAgICBpZiAodGltZXN0YW1wIC0gcHJldmlvdXNSZXBhaW50VGltZSA8IDE1MDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZpb3VzUmVwYWludFRpbWUgPSB0aW1lc3RhbXA7XG5cbiAgICAgICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgICAgICAgc2NoZWR1bGVyLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxufSIsIlxuZXhwb3J0IGNsYXNzIFNjcmVlbkNvbmZpZyB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBib3hTaXplOiBudW1iZXJcbiAgICApIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBTY3JlZW5TZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBnZXRTY3JlZW5GcmFtZSgpOiBhbnkge1xuXG4gICAgfVxuXG59IiwiaW1wb3J0IHsgUHJvZ3JlbUNvbmZpZyB9IGZyb20gXCIuL1Byb2dyZW1TZXJ2aWNlXCI7XG5pbXBvcnQgeyBQcm9ncmVtQ29kZSwgQ29kZUl0ZXJhdG9yLCBDb2RlU3RhdGVtZW50IH0gZnJvbSBcIi4vQ29kZVNlcnZpY2VcIjtcbmltcG9ydCB7IEV2YWxTY29wZSB9IGZyb20gXCIuL0V2YWxTZXJ2aWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVtU3RhdGUge1xuXG4gICAgcHVibGljIHJlYWRvbmx5IGV2YWxTY29wZSA9IG5ldyBFdmFsU2NvcGU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvbG9ubmU6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGxpZ25lOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBmcmFtZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgY29udGV4dGU6IG9iamVjdCxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvZGVTdGF0ZW1lbnQ6IENvZGVTdGF0ZW1lbnQgfCBudWxsLFxuICAgICkge31cblxuICAgIHB1YmxpYyBldmFsKGV4cHI6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2YWxTY29wZS5nbG9iYWxFdmFsKGV4cHIpO1xuICAgIH1cbn1cblxudHlwZSBOZXdTdGF0ZUNhbGxiYWNrID0gKHN0YXRlOiBQcm9ncmVtU3RhdGUpID0+IHZvaWQ7XG5leHBvcnQgaW50ZXJmYWNlIENvZGVFeGVjdXRpb25MaXN0ZW5lciB7ZmlyZUNvZGVFeGVjdXRpb246IE5ld1N0YXRlQ2FsbGJhY2t9O1xuZXhwb3J0IGludGVyZmFjZSBHcmlkQ2hhbmdlTGlzdGVuZXIge2ZpcmVHcmlkQ2hhbmdlOiBOZXdTdGF0ZUNhbGxiYWNrfTtcbmV4cG9ydCBpbnRlcmZhY2UgTGluZUNoYW5nZUxpc3RlbmVyIHtmaXJlTGluZUNoYW5nZTogTmV3U3RhdGVDYWxsYmFja307XG5leHBvcnQgaW50ZXJmYWNlIEZyYW1lQ2hhbmdlTGlzdGVuZXIge2ZpcmVGcmFtZUNoYW5nZTogTmV3U3RhdGVDYWxsYmFja307XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbVNjaGVkdWxlciB7XG4gICAgc3Vic2NyaWJlQ29kZUV4ZWN1dGlvbihsaXN0ZW5lcjogQ29kZUV4ZWN1dGlvbkxpc3RlbmVyKTogdm9pZFxuICAgIHN1YnNjcmliZUdyaWRDaGFuZ2UobGlzdGVuZXI6IEdyaWRDaGFuZ2VMaXN0ZW5lcik6IHZvaWRcbiAgICBzdWJzY3JpYmVMaW5lQ2hhbmdlKGxpc3RlbmVyOiBMaW5lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG4gICAgc3Vic2NyaWJlRnJhbWVDaGFuZ2UobGlzdGVuZXI6IEZyYW1lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkXG5cbiAgICByZXNldCgpOiBQcm9ncmVtU3RhdGVcbiAgICBjdXJyZW50KCk6IFByb2dyZW1TdGF0ZVxuICAgIG5leHQoKTogUHJvZ3JlbVN0YXRlXG59XG5cbmNsYXNzIFNpbXBsZVByb2dyZW1TY2hlZHVsZXIgaW1wbGVtZW50cyBQcm9ncmVtU2NoZWR1bGVyIHtcbiAgICBcbiAgICBwcml2YXRlIHN0YXRlOiBQcm9ncmVtU3RhdGU7XG4gICAgcHJpdmF0ZSBjb2RlSXRlcmF0b3I6IENvZGVJdGVyYXRvciB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBjb2RlRXhlY3V0aW9uTGlzdGVuZXJzOiBDb2RlRXhlY3V0aW9uTGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgZ3JpZENoYW5nZUxpc3RlbmVyczogR3JpZENoYW5nZUxpc3RlbmVyW10gPSBbXTtcbiAgICBwcml2YXRlIGxpbmVDaGFuZ2VMaXN0ZW5lcnM6IExpbmVDaGFuZ2VMaXN0ZW5lcltdID0gW107XG4gICAgcHJpdmF0ZSBmcmFtZUNoYW5nZUxpc3RlbmVyczogRnJhbWVDaGFuZ2VMaXN0ZW5lcltdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogUHJvZ3JlbUNvbmZpZywgcHJpdmF0ZSBjb2RlOiBQcm9ncmVtQ29kZSkge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5yZXNldCgpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZUNvZGVFeGVjdXRpb24obGlzdGVuZXI6IENvZGVFeGVjdXRpb25MaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvZGVFeGVjdXRpb25MaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfSAgICBcbiAgICBcbiAgICBzdWJzY3JpYmVHcmlkQ2hhbmdlKGxpc3RlbmVyOiBHcmlkQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ncmlkQ2hhbmdlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZUxpbmVDaGFuZ2UobGlzdGVuZXI6IExpbmVDaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmxpbmVDaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlRnJhbWVDaGFuZ2UobGlzdGVuZXI6IEZyYW1lQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mcmFtZUNoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICByZXNldCgpOiBQcm9ncmVtU3RhdGUge1xuICAgICAgICAvLyBDYWxsIGp1c3QgZXZhbHVhdGVkIGluaXRpYWxpc2VyUHJvZ3JlbSBmdW5jdGlvblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGxldCBpbml0aWFsQ29udGV4dGU6IG9iamVjdCA9IGluaXRpYWxpc2VyUHJvZ3JlbSh0aGlzLmNvbmZpZy5jb2xvbm5lcywgdGhpcy5jb25maWcubGlnbmVzKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0xvYWRlZCBpbml0aWFsIGNvbnRleHRlOiAnLCBpbml0aWFsQ29udGV4dGUpO1xuICAgICAgICBsZXQgc3RhdGUgPSBuZXcgUHJvZ3JlbVN0YXRlKDAsIDAsIDAsIGluaXRpYWxDb250ZXh0ZSwgbnVsbCk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBjdXJyZW50KCk6IFByb2dyZW1TdGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cblxuICAgIG5leHQoKTogUHJvZ3JlbVN0YXRlIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlKSB0aHJvdyBuZXcgRXJyb3IoJ0luY29uc2lzdGVudCBQcm9ncmVtIHN0YXRlICEnKTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvZGVJdGVyYXRvciA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNvZGVJdGVyYXRvciA9IHRoaXMuY29kZS5pdGVyYXRvcih0aGlzLnN0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2hhc05leHQ6JywgdGhpcy5jb2RlSXRlcmF0b3IuaGFzTmV4dCgpKTtcblxuICAgICAgICBpZiAodGhpcy5jb2RlSXRlcmF0b3IuaGFzTmV4dCgpKSB7XG4gICAgICAgICAgICBsZXQgc3RhdGVtZW50ID0gdGhpcy5jb2RlSXRlcmF0b3IuZXhlY3V0ZU5leHQoKTtcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZSA9IG5ldyBQcm9ncmVtU3RhdGUodGhpcy5zdGF0ZS5jb2xvbm5lLCB0aGlzLnN0YXRlLmxpZ25lLCB0aGlzLnN0YXRlLmZyYW1lLCB0aGlzLnN0YXRlLmNvbnRleHRlLCBzdGF0ZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICAgICAgdGhpcy5jb2RlRXhlY3V0aW9uTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUNvZGVFeGVjdXRpb24obmV3U3RhdGUpKTtcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0ZpbmlzaGVkIGl0ZXJhdGluZyBvdmVyIGNvZGUuJylcblxuICAgICAgICBsZXQgbm90aWZ5UGl4ZWxDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgbGV0IG5vdGlmeUxpbmVDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgbGV0IG5vdGlmeUZyYW1lQ2hhbmdlID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IF9jb2xvbm5lID0gdGhpcy5zdGF0ZS5jb2xvbm5lO1xuICAgICAgICBsZXQgX2xpZ25lID0gdGhpcy5zdGF0ZS5saWduZTtcbiAgICAgICAgbGV0IF9mcmFtZSA9IHRoaXMuc3RhdGUuZnJhbWU7XG5cbiAgICAgICAgX2NvbG9ubmUgKys7XG4gICAgICAgIG5vdGlmeVBpeGVsQ2hhbmdlID0gdHJ1ZTtcblxuICAgICAgICBpZiAoX2NvbG9ubmUgPj0gdGhpcy5jb25maWcuY29sb25uZXMpIHtcbiAgICAgICAgICAgIF9jb2xvbm5lID0gMDtcbiAgICAgICAgICAgIF9saWduZSArKztcbiAgICAgICAgICAgIG5vdGlmeUxpbmVDaGFuZ2UgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9saWduZSA+IHRoaXMuY29uZmlnLmxpZ25lcykge1xuICAgICAgICAgICAgX2xpZ25lID0gMDtcbiAgICAgICAgICAgIF9mcmFtZSArKztcbiAgICAgICAgICAgIG5vdGlmeUZyYW1lQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfZnJhbWUgPiB0aGlzLmNvbmZpZy5mcmFtZXMpIHtcbiAgICAgICAgICAgIF9mcmFtZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmV3U3RhdGUgPSBuZXcgUHJvZ3JlbVN0YXRlKF9jb2xvbm5lLCBfbGlnbmUsIF9mcmFtZSwgdGhpcy5zdGF0ZS5jb250ZXh0ZSwgbnVsbCk7XG4gXG4gICAgICAgIGlmIChub3RpZnlQaXhlbENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5ncmlkQ2hhbmdlTGlzdGVuZXJzLm1hcChsID0+IGwuZmlyZUdyaWRDaGFuZ2UodGhpcy5zdGF0ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vdGlmeUxpbmVDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMubGluZUNoYW5nZUxpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVMaW5lQ2hhbmdlKHRoaXMuc3RhdGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub3RpZnlGcmFtZUNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5mcmFtZUNoYW5nZUxpc3RlbmVycy5tYXAobCA9PiBsLmZpcmVGcmFtZUNoYW5nZSh0aGlzLnN0YXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgIHRoaXMuY29kZUl0ZXJhdG9yID0gdGhpcy5jb2RlLml0ZXJhdG9yKG5ld1N0YXRlKTtcblxuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFNjaGVkdWxpbmdTZXJ2aWNlIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBidWlsZFByb2dyZW1TY2hlZHVsZXIoY29uZmlnOiBQcm9ncmVtQ29uZmlnLCBjb2RlOiBQcm9ncmVtQ29kZSkge1xuICAgICAgICByZXR1cm4gbmV3IFNpbXBsZVByb2dyZW1TY2hlZHVsZXIoY29uZmlnLCBjb2RlKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBnZW5lcmF0ZSBhcyBlc2NvZGVHZW5lcmF0ZSB9IGZyb20gJ2VzY29kZWdlbic7XG5pbXBvcnQgeyBjcmVhdGUgYXMgbWQ1Q3JlYXRlIH0gZnJvbSAnanMtbWQ1JztcbmltcG9ydCB7IFByb2dyZW1Db2RlIH0gZnJvbSBcIi4vQ29kZVNlcnZpY2VcIjtcbmltcG9ydCB7IEZ1bmN0aW9uRGVjbGFyYXRpb24sIEJhc2VOb2RlLCBCbG9ja1N0YXRlbWVudCwgSWZTdGF0ZW1lbnQsIEV4cHJlc3Npb24sIFZhcmlhYmxlRGVjbGFyYXRpb24sIFZhcmlhYmxlRGVjbGFyYXRvciwgRXhwcmVzc2lvblN0YXRlbWVudCwgQXNzaWdubWVudEV4cHJlc3Npb24sIFJldHVyblN0YXRlbWVudCwgQ29uZGl0aW9uYWxFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uIH0gZnJvbSAnZXN0cmVlJztcbmltcG9ydCB7IFByb2dyZW1TY2hlZHVsZXIsIFByb2dyZW1TdGF0ZSwgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyLCBHcmlkQ2hhbmdlTGlzdGVuZXIgfSBmcm9tICcuL1NjaGVkdWxpbmdTZXJ2aWNlJztcbmltcG9ydCB7IEFzdEhlbHBlciB9IGZyb20gJy4vQXN0SGVscGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVtSW5zcGVjdG9yIHtcbiAgICBjbGVhcigpOiB2b2lkO1xuICAgIGF0dGFjaChlbGVtZW50OiBFbGVtZW50IHwgbnVsbCk6IHZvaWRcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljSHRtbEVzcHJpbWFQcm9ncmVtSW5zcGVjdG9yIGltcGxlbWVudHMgUHJvZ3JlbUluc3BlY3RvciwgQ29kZUV4ZWN1dGlvbkxpc3RlbmVyLCBHcmlkQ2hhbmdlTGlzdGVuZXIge1xuICAgIFxuICAgIHByaXZhdGUgcHJvZ3JlbUNvZGVMaW5lczogSFRNTEVsZW1lbnRbXSA9IFtdO1xuICAgIHByaXZhdGUgYXR0YWNoZWRFbGVtZW50OiBFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBtYXBwaW5nOiBNYXA8QmFzZU5vZGUsIEhUTUxFbGVtZW50PiA9IG5ldyBNYXAoKTtcbiAgICBwcml2YXRlIGhpbnRTdGFja0NvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHByb2dyZW1Db2RlOiBQcm9ncmVtQ29kZSxcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFByb2dyZW1TY2hlZHVsZXJcbiAgICApIHtcbiAgICAgICAgc2NoZWR1bGVyLnN1YnNjcmliZUNvZGVFeGVjdXRpb24odGhpcyk7XG4gICAgICAgIHNjaGVkdWxlci5zdWJzY3JpYmVHcmlkQ2hhbmdlKHRoaXMpO1xuICAgICAgICB0aGlzLmJ1aWxkSHRtbFRyZWUyKCk7XG4gICAgfVxuXG4gICAgYXR0YWNoKGVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXR0YWNoZWRFbGVtZW50ID0gZWxlbWVudDtcblxuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgbGV0IGNvZGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvZGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29kZUNvbnRhaW5lcicpO1xuICAgICAgICAgICAgdGhpcy5oaW50U3RhY2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuaGludFN0YWNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpbnRDb250YWluZXInKTtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY29kZUNvbnRhaW5lcik7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuaGludFN0YWNrQ29udGFpbmVyKTtcblxuICAgICAgICAgICAgdGhpcy5wcm9ncmVtQ29kZUxpbmVzLm1hcChlbHQgPT4geyBjb2RlQ29udGFpbmVyLmFwcGVuZENoaWxkKGVsdCkgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb2xvck1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgaWYgKHRoaXMuaGludFN0YWNrQ29udGFpbmVyKVxuICAgICAgICAgICAgdGhpcy5oaW50U3RhY2tDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgdGhpcy5tYXBwaW5nLmZvckVhY2goKGVsdCwgbm9kZSkgPT4gZWx0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZ2hsaWdodCcpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbG9yTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuXG4gICAgcHJpdmF0ZSBoc2xDb2xvcihodWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnaHNsKCcgKyBodWUgKyAnLCAxMDAlLCA4MCUpJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhc2hTdHJpbmdUb0NvbG9yKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBzaGlmdCA9IDI7XG4gICAgICAgIGxldCBjb2xvckNvdW50ID0gMTI7XG5cbiAgICAgICAgdmFyIGh1ZSA9IHRoaXMuY29sb3JNYXAuZ2V0KGtleSk7XG4gICAgICAgIGlmIChodWUpIHJldHVybiB0aGlzLmhzbENvbG9yKGh1ZSk7XG5cbiAgICAgICAgdmFyIGhhc2ggPSBtZDVDcmVhdGUoKS51cGRhdGUoa2V5KS50b1N0cmluZygpO1xuICAgICAgICBcbiAgICAgICAgaHVlID0gKCBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDAsIHNoaWZ0ICsgMSksIDE2KSArIDE2ICogcGFyc2VJbnQoaGFzaC5zdWJzdHJpbmcoc2hpZnQgKyAxLCBzaGlmdCArIDIpLCAxNikgKyAyNTYgKiBwYXJzZUludChoYXNoLnN1YnN0cmluZyhzaGlmdCArIDIsIHNoaWZ0ICsgMyksIDE2KSApO1xuICAgICAgICBodWUgPSBNYXRoLmZsb29yKGh1ZSAlIGNvbG9yQ291bnQpICogMzYwIC8gY29sb3JDb3VudDtcblxuICAgICAgICB3aGlsZSAoIXRoaXMuY29sb3JNYXAuZ2V0KGtleSkpIHtcbiAgICAgICAgICAgIGxldCBkdXBsaWNhdGVDb2xvciA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yIChsZXQgYyBvZiB0aGlzLmNvbG9yTWFwLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPT09IGh1ZSkge1xuICAgICAgICAgICAgICAgICAgICBkdXBsaWNhdGVDb2xvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGh1ZSArPSBNYXRoLmZsb29yKDM2MCAvIGNvbG9yQ291bnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWR1cGxpY2F0ZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvck1hcC5zZXQoa2V5LCBodWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL3ZhciBwYXN0ZWwgPSAnaHNsKCcgKyBodWUgKyAnLCAxMDAlLCA4Ny41JSknO1xuICAgICAgICByZXR1cm4gdGhpcy5oc2xDb2xvcihodWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBmaXJlQ29kZUV4ZWN1dGlvbihzdGF0ZTogUHJvZ3JlbVN0YXRlKSB7XG4gICAgICAgIGlmIChzdGF0ZS5jb2RlU3RhdGVtZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlY2VpdmVkIGEgbnVsbCBzdGF0ZW1lbnQgIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXBwaW5nLmZvckVhY2goKGVsdCwgbm9kZSkgPT4gZWx0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZ2hsaWdodCcpKTtcblxuICAgICAgICBsZXQgZXhlY3V0ZWROb2RlID0gc3RhdGUuY29kZVN0YXRlbWVudC5ub2RlO1xuICAgICAgICBsZXQgaHRtbE5vZGUgPSB0aGlzLm1hcHBpbmcuZ2V0KGV4ZWN1dGVkTm9kZSk7XG4gICAgICAgIGlmICghaHRtbE5vZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZvdW5kIGEgSFRNTCBlbGVtZW50IG1hcHBlZCBmb3IgcmVjZWl2ZWQgc3RhdGVtZW50ICEnKVxuICAgICAgICB9XG4gICAgICAgIGh0bWxOb2RlLmNsYXNzTGlzdC5hZGQoJ2hpZ2hsaWdodCcpO1xuXG4gICAgICAgIGlmICh0aGlzLmhpbnRTdGFja0NvbnRhaW5lcikge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBBc3RIZWxwZXIucmVkdWNlTm9kZVRvVmFyRGVjbGFyYXRpb24oZXhlY3V0ZWROb2RlKTtcbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkZWNsID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZGVjbC5kZWNsYXJhdGlvbnMubWFwKGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGludCA9IHRoaXMuYXBwZW5kSGludCh0aGlzLmhpbnRTdGFja0NvbnRhaW5lciwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBBc3RIZWxwZXIucGF0dGVyblRvU3RyaW5nKGQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhclZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuaW5pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhclZhbHVlID0gc3RhdGUuZXZhbFNjb3BlLmdsb2JhbEV2YWwoZXNjb2RlR2VuZXJhdGUoZC5pbml0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBoaW50LmlubmVySFRNTCA9IHZhck5hbWUgKyAnID0gJyArIHZhclZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGludC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKHZhck5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcEVsdCA9IHRoaXMubWFwcGluZy5nZXQoZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocEVsdCkgcEVsdC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKHZhck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGVjbCA9IG5vZGUgYXMgQXNzaWdubWVudEV4cHJlc3Npb247XG5cbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGxldCBoaW50ID0gdGhpcy5hcHBlbmRIaW50KHRoaXMuaGludFN0YWNrQ29udGFpbmVyLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YXJOYW1lID0gQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhkZWNsLmxlZnQpO1xuICAgICAgICAgICAgICAgICAgICBoaW50LmlubmVySFRNTCA9IHZhck5hbWUgKyAnID0gJyArIHN0YXRlLmV2YWxTY29wZS5nbG9iYWxFdmFsKHZhck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBoaW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuaGFzaFN0cmluZ1RvQ29sb3IodmFyTmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHBFbHQgPSB0aGlzLm1hcHBpbmcuZ2V0KGRlY2wpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocEVsdCkgcEVsdC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmhhc2hTdHJpbmdUb0NvbG9yKHZhck5hbWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZ1bmMgPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgZnVuYy5wYXJhbXMuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YXJOYW1lID0gQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YXJWYWx1ZSA9IHN0YXRlLmV2YWxTY29wZS5nbG9iYWxFdmFsKHZhck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGludCA9IHRoaXMuYXBwZW5kSGludCh0aGlzLmhpbnRTdGFja0NvbnRhaW5lciwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGludC5pbm5lckhUTUwgPSB2YXJOYW1lICsgJyA9ICcgKyB2YXJWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5oYXNoU3RyaW5nVG9Db2xvcih2YXJOYW1lKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBFbHQgPSB0aGlzLm1hcHBpbmcuZ2V0KHApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBFbHQpIHBFbHQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5oYXNoU3RyaW5nVG9Db2xvcih2YXJOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgZmlyZUdyaWRDaGFuZ2Uoc3RhdGU6IFByb2dyZW1TdGF0ZSkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBlbmRDb2RlTGluZShwYXJlbnQ6IEhUTUxFbGVtZW50LCBwYWRkaW5nOiBudW1iZXIpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBlbHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicHJlXCIpO1xuICAgICAgICBlbHQuY2xhc3NMaXN0LmFkZCgncGFkZGluZy0nICsgcGFkZGluZyk7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbHQpO1xuXG4gICAgICAgIHJldHVybiBlbHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBlbmRTcGFuKHBhcmVudDogSFRNTEVsZW1lbnQsIGh0bWxDbGFzczogc3RyaW5nW10sIHRleHQgPSBcIlwiKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgZWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGh0bWxDbGFzcy5mb3JFYWNoKGMgPT4gZWx0LmNsYXNzTGlzdC5hZGQoYykpO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWx0KTtcbiAgICAgICAgZWx0LmlubmVyVGV4dCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBlbHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBlbmRIaW50KHBhcmVudDogSFRNTEVsZW1lbnQsIGh0bWxDbGFzczogc3RyaW5nW10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBwcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicHJlXCIpO1xuICAgICAgICBsZXQgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBodG1sQ2xhc3MuZm9yRWFjaChjID0+IHByZS5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHByZSk7XG4gICAgICAgIHByZS5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgcmV0dXJuIHNwYW47XG4gICAgfVxuXG4gICAgLy8gQnVpbGQgSFRNTCBJbnNwZWN0b3IgYnkgY3Jhd2xpbmcgcmVjdXJzaXZlbHkgQVNUIHN0YWNrc1xuICAgIHByaXZhdGUgdW5zdGFja0FzdChwYXJlbnRFbGVtZW50OiBIVE1MRWxlbWVudCwgc3RhY2s6IEJhc2VOb2RlW10sIHBhZGRpbmc6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBzdGFjay5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYgKCFub2RlKSB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBub3QgYmUgYWJsZSB0byBzaGlmdCBhIG51bGwgbm9kZSAhJyk7XG5cbiAgICAgICAgICAgIGxldCBsaW5lLCBzdGFydExpbmU6IEhUTUxFbGVtZW50LCBlbmRMaW5lLCBuLCB2YXJTcGFuLCBsZWZ0U3BhbiwgcmlnaHRTcGFuO1xuICAgICAgICAgICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdCbG9ja1N0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QocGFyZW50RWxlbWVudCwgbi5ib2R5LCBwYWRkaW5nICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIEZ1bmN0aW9uRGVjbGFyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0TGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQobm9kZSwgc3RhcnRMaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4uaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuID0gdGhpcy5hcHBlbmRTcGFuKHN0YXJ0TGluZSwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnZnVuY3Rpb24gJyArIG4uaWQubmFtZSArICcgKCAnOy8vICsgZnVuYy5wYXJhbXMubWFwKHggPT4geC5uYW1lKS5qb2luKCcsICcpICsgJyApIHsnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmFwcGVuZFNwYW4oc3RhcnRMaW5lLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9ICdmdW5jdGlvbiAoICc7Ly8gKyBmdW5jLnBhcmFtcy5tYXAoeCA9PiB4Lm5hbWUpLmpvaW4oJywgJykgKyAnICkgeyc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFyYW1Db3VudCA9IG4ucGFyYW1zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgbi5wYXJhbXMuZm9yRWFjaCgocGFyYW0sIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YXJOYW1lID0gQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhwYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXMuYXBwZW5kU3BhbihzdGFydExpbmUsIFsndmFySWQnXSwgdmFyTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KHBhcmFtLCBzcGFuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpIDwgcGFyYW1Db3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXMuYXBwZW5kU3BhbihzdGFydExpbmUsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9ICcsICc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcGFuID0gdGhpcy5hcHBlbmRTcGFuKHN0YXJ0TGluZSwgW10pO1xuICAgICAgICAgICAgICAgICAgICBzcGFuLmlubmVySFRNTCArPSAnICkgeyc7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHBhcmVudEVsZW1lbnQsIG4uYm9keS5ib2R5LCBwYWRkaW5nICsgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZW5kTGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGVuZExpbmUuaW5uZXJIVE1MID0gJ30nO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0lmU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgSWZTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0TGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQobi50ZXN0LCBzdGFydExpbmUpO1xuICAgICAgICAgICAgICAgICAgICAvL3N0YXJ0TGluZS5pbm5lckhUTUwgPSAnaWYgKCA8c3Bhbj4nICsgRXNjb2RlZ2VuLmdlbmVyYXRlKGlmc3RtdC50ZXN0KSArICc8L3NwYW4+ICkgeyc7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0TGluZS5pbm5lckhUTUwgPSAnaWYgKCAnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3Qoc3RhcnRMaW5lLCBbbi50ZXN0XSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0TGluZS5pbm5lckhUTUwgKz0gJyApIHsnO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChwYXJlbnRFbGVtZW50LCBbbi5jb25zZXF1ZW50XSwgcGFkZGluZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG1pZExpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChuLmFsdGVybmF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWlkTGluZS5pbm5lckhUTUwgPSAnfSBlbHNlIHsnO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KHBhcmVudEVsZW1lbnQsIFtuLmFsdGVybmF0ZV0sIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZW5kTGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUocGFyZW50RWxlbWVudCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGVuZExpbmUuaW5uZXJIVE1MID0gJ30nO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1ZhcmlhYmxlRGVjbGFyYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICBuID0gbm9kZSBhcyBWYXJpYWJsZURlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChub2RlLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5pbm5lckhUTUwgPSBuLmtpbmQgKyAnICc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChsaW5lLCBuLmRlY2xhcmF0aW9ucywgMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnVmFyaWFibGVEZWNsYXJhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICB2YXJTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsndmFySWQnXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQobm9kZSwgdmFyU3Bhbik7XG4gICAgICAgICAgICAgICAgICAgIHZhclNwYW4uaW5uZXJIVE1MID0gQXN0SGVscGVyLnBhdHRlcm5Ub1N0cmluZyhuLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4uaW5pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFtdLCAnID0gJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5pdFNwYW4gPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWyd2YXJJbml0J10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN0YWNrQXN0KGluaXRTcGFuLCBbbi5pbml0XSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFtdLCAnOycpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgQXNzaWdubWVudEV4cHJlc3Npb247XG4gICAgICAgICAgICAgICAgICAgIGxlZnRTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsndmFySWQnXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGluZy5zZXQobm9kZSwgbGVmdFNwYW4pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QobGVmdFNwYW4sIFtuLmxlZnRdLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFtdLCAnID0gJyk7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0U3BhbiA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ3ZhckluaXQnXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChyaWdodFNwYW4sIFtuLnJpZ2h0XSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbXSwgJzsnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdCaW5hcnlFeHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5vZGUgYXMgQmluYXJ5RXhwcmVzc2lvbjtcbiAgICAgICAgICAgICAgICAgICAgbGVmdFNwYW4gPSB0aGlzLmFwcGVuZFNwYW4ocGFyZW50RWxlbWVudCwgWydsZWZ0QmluJ10pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QobGVmdFNwYW4sIFtuLmxlZnRdLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFtdLCAnICcgKyBuLm9wZXJhdG9yICsgJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRTcGFuID0gdGhpcy5hcHBlbmRTcGFuKHBhcmVudEVsZW1lbnQsIFsncmlnaHRCaW4nXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdGFja0FzdChyaWdodFNwYW4sIFtuLnJpZ2h0XSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnRXhwcmVzc2lvblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIEV4cHJlc3Npb25TdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKHBhcmVudEVsZW1lbnQsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KG5vZGUsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3RhY2tBc3QobGluZSwgW24uZXhwcmVzc2lvbl0sIDApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1JldHVyblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIG4gPSBub2RlIGFzIFJldHVyblN0YXRlbWVudFxuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShwYXJlbnRFbGVtZW50LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChub2RlLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5pbm5lckhUTUwgPSBlc2NvZGVHZW5lcmF0ZShub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGVmYXVsdDonLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kU3BhbihwYXJlbnRFbGVtZW50LCBbJ25zeS0nICsgbm9kZS50eXBlXSwgZXNjb2RlR2VuZXJhdGUobm9kZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KG5vZGUsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZEh0bWxUcmVlMigpIHtcbiAgICAgICAgY29uc3QgY29kZVJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLnByb2dyZW1Db2RlTGluZXMucHVzaChjb2RlUm9vdCk7XG4gICAgICAgIHRoaXMudW5zdGFja0FzdChjb2RlUm9vdCwgW3RoaXMucHJvZ3JlbUNvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbigpXSwgMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZEh0bWxUcmVlKCkge1xuICAgICAgICBjb25zdCBjb2RlUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IHN0YWNrOiBCYXNlTm9kZVtdID0gW3RoaXMucHJvZ3JlbUNvZGUuY29sb3JlclByb2dyZW1GdW5jdGlvbigpXTtcbiAgICAgICAgbGV0IHBhZGRpbmcgPSAwO1xuXG4gICAgICAgIC8vdGhpcy5wcm9ncmVtQ29kZS5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCkuYm9keS5ib2R5Lm1hcChuID0+IHN0YWNrLnB1c2gobikpO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICghbm9kZSkgdGhyb3cgbmV3IEVycm9yKCdTaG91bGQgbm90IGJlIGFibGUgdG8gc2hpZnQgYSBudWxsIG5vZGUgIScpO1xuICAgICAgICAgICAgdmFyIGxpbmU7XG5cbiAgICAgICAgICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2sgPSBub2RlIGFzIEJsb2NrU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nKytcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suYm9keS5zbGljZSgwKS5yZXZlcnNlKCkubWFwKHggPT4gc3RhY2sudW5zaGlmdCh4KSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VuZEJsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIGhhY2sgdG8gY2xvc2UgYW4gb3BlbmVkIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmctLTtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUoY29kZVJvb3QsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9ICd9JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIGxldCBmdW5jID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShjb2RlUm9vdCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmdW5jLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9ICdmdW5jdGlvbiAnICsgZnVuYy5pZC5uYW1lICsgJyAoKSB7JzsvLyArIGZ1bmMucGFyYW1zLm1hcCh4ID0+IHgubmFtZSkuam9pbignLCAnKSArICcgKSB7JztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUuaW5uZXJIVE1MID0gJ2Z1bmN0aW9uICgpIHsnOy8vICsgZnVuYy5wYXJhbXMubWFwKHggPT4geC5uYW1lKS5qb2luKCcsICcpICsgJyApIHsnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoeyB0eXBlOiAnRW5kQmxvY2tTdGF0ZW1lbnQnIH0pOyAvLyBIYWNrIHRvIGRlbGF5IGEgYmxvY2sgZW5kXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoZnVuYy5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnSWZTdGF0ZW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBsZXQgaWZzdG10ID0gbm9kZSBhcyBJZlN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHRoaXMuYXBwZW5kQ29kZUxpbmUoY29kZVJvb3QsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lLmlubmVySFRNTCA9ICdpZiAoIDxzcGFuPicgKyBlc2NvZGVHZW5lcmF0ZShpZnN0bXQudGVzdCkgKyAnPC9zcGFuPiApIHsnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmcuc2V0KGlmc3RtdC50ZXN0LCBsaW5lKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaWZzdG10LmFsdGVybmF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh7IHR5cGU6ICdFbmRCbG9ja1N0YXRlbWVudCcgfSk7IC8vIEhhY2sgdG8gZGVsYXkgYSBibG9jayBlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoaWZzdG10LmFsdGVybmF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh7IHR5cGU6ICdFbHNlQmxvY2tTdGF0ZW1lbnQnIH0pOyAvLyBIYWNrIHRvIGRlbGF5IGFuIGVsc2UgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdChpZnN0bXQuY29uc2VxdWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Vsc2VCbG9ja1N0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBoYWNrIHRvIGNsb3NlIGFuIG9wZW5lZCBibG9ja1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nLS07XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSB0aGlzLmFwcGVuZENvZGVMaW5lKGNvZGVSb290LCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5pbm5lckhUTUwgPSAnfSBlbHNlIHsnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBsaW5lID0gdGhpcy5hcHBlbmRDb2RlTGluZShjb2RlUm9vdCwgcGFkZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUudGV4dENvbnRlbnQgPSBlc2NvZGVHZW5lcmF0ZShub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5jbGFzc0xpc3QuYWRkKCdzdGF0ZW1lbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5nLnNldChub2RlLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCk7XG4gICAgfVxuXG59XG4iLCJcbmltcG9ydCB7IFByb2dyYW0sIHBhcnNlTW9kdWxlIH0gZnJvbSAnZXNwcmltYSc7XG5pbXBvcnQgeyB3YWxrIGFzIGVzcHJpbWFXYWxrIH0gZnJvbSAnZXNwcmltYS13YWxrJztcbmltcG9ydCB7IGdlbmVyYXRlIGFzIGVzY29kZUdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcbmltcG9ydCB7IEJhc2VOb2RlLCBGdW5jdGlvbkRlY2xhcmF0aW9uLCBCbG9ja1N0YXRlbWVudCwgSWZTdGF0ZW1lbnQsIFJldHVyblN0YXRlbWVudCwgU3RhdGVtZW50IH0gZnJvbSAnZXN0cmVlJztcbmltcG9ydCB7IFByb2dyZW1TdGF0ZSB9IGZyb20gJy4vU2NoZWR1bGluZ1NlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgQ29kZVN0YXRlbWVudCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBub2RlOiBCYXNlTm9kZSxcbiAgICAgICAgLy9wdWJsaWMgY29kZTogc3RyaW5nXG4gICAgKSB7fTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2RlU3RhdGVtZW50RmFjdG9yeTxUPiB7XG4gICAgYnVpbGQocGFyYW06IFQpOiBDb2RlU3RhdGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvZGVJdGVyYXRvciB7XG4gICAgZXhlY3V0ZU5leHQoKTogQ29kZVN0YXRlbWVudDtcbiAgICBoYXNOZXh0KCk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3JlbUNvZGUge1xuICAgIGluaXRpYWxpc2VyUHJvZ3JlbUZ1bmN0aW9uKCk6IEZ1bmN0aW9uRGVjbGFyYXRpb25cbiAgICBjb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCk6IEZ1bmN0aW9uRGVjbGFyYXRpb25cbiAgICBpdGVyYXRvcihzdGF0ZTogUHJvZ3JlbVN0YXRlKTogQ29kZUl0ZXJhdG9yO1xufVxuXG5jbGFzcyBCYXNpY0VzcHJpbWFDb2RlU3RhdGVtZW50RmFjdG9yeSBpbXBsZW1lbnRzIENvZGVTdGF0ZW1lbnRGYWN0b3J5PFN0YXRlbWVudD4ge1xuXG4gICAgYnVpbGQocGFyYW06IEJhc2VOb2RlKTogQ29kZVN0YXRlbWVudCB7XG4gICAgICAgIC8qXG4gICAgICAgIGlmIChwYXJhbS50eXBlID09PSAnUmV0dXJuU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgbGV0IHN0bXQgPSBwYXJhbSBhcyBSZXR1cm5TdGF0ZW1lbnQ7XG4gICAgICAgICAgICBsZXQgY29kZSA9IEVzY29kZWdlbi5nZW5lcmF0ZShzdG10KTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29kZVN0YXRlbWVudChjb2RlKTtcbiAgICAgICAgfSBlbHNlIGlmIChwYXJhbS50eXBlID09PSAnSWZTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICBsZXQgc3RtdCA9IHBhcmFtIGFzIElmU3RhdGVtZW50O1xuICAgICAgICAgICAgbGV0IGNvZGUgPSBFc2NvZGVnZW4uZ2VuZXJhdGUoc3RtdC50ZXN0KTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29kZVN0YXRlbWVudChjb2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBjb2RlID0gRXNjb2RlZ2VuLmdlbmVyYXRlKHBhcmFtKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29kZVN0YXRlbWVudChjb2RlKTtcbiAgICAgICAgfSovXG5cbiAgICAgICAgaWYgKHBhcmFtKSBcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29kZVN0YXRlbWVudChwYXJhbSk7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gYnVpbGQgbm9uIHN0YXRlbWVudCBjb2RlICEnKTtcbiAgICB9XG59XG5cbmNsYXNzIEJhc2ljRXNwcmltYUNvZGVJdGVyYXRvciBpbXBsZW1lbnRzIENvZGVJdGVyYXRvciB7XG5cbiAgICBwcml2YXRlIHN0YWNrOiBCYXNlTm9kZVtdID0gW107XG4gICAgcHJpdmF0ZSBjb2RlU3RhdGVtZW50RmFjdG9yeSA9IG5ldyBCYXNpY0VzcHJpbWFDb2RlU3RhdGVtZW50RmFjdG9yeSgpO1xuICAgIHByaXZhdGUgcmV0dXJuVmFsdWU6IGFueSA9IG51bGw7XG4gICAgcHJpdmF0ZSBmaW5pc2hlZCA9IGZhbHNlXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgICAgIHByaXZhdGUgcm9vdE5vZGU6IEJhc2VOb2RlLCBcbiAgICAgICAgICAgIHByaXZhdGUgc3RhdGU6IFByb2dyZW1TdGF0ZSkge1xuICAgICAgICB0aGlzLnN0YWNrLnB1c2gocm9vdE5vZGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVjbGFyZVByb2dyZW1Bcmd1bWVudHMoKSB7XG4gICAgICAgIGxldCBfY29sb25uZSA9IHRoaXMuc3RhdGUuY29sb25uZTtcbiAgICAgICAgbGV0IF9saWduZSA9IHRoaXMuc3RhdGUubGlnbmU7XG4gICAgICAgIGxldCBfY29udGV4dGUgPSB0aGlzLnN0YXRlLmNvbnRleHRlO1xuXG4gICAgICAgIHRoaXMuc3RhdGUuZXZhbCgndmFyIGNvbG9ubmUgPSAnICsgX2NvbG9ubmUgKyAnLCBsaWduZSA9ICcgKyBfbGlnbmUgKyAnOycpO1xuICAgICAgICB0aGlzLnN0YXRlLmV2YWwoJ3ZhciBjb250ZXh0ZSA9ICcgKyBKU09OLnN0cmluZ2lmeShfY29udGV4dGUpKTtcbiAgICB9XG5cbiAgICBleGVjdXRlTmV4dCgpOiBDb2RlU3RhdGVtZW50IHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBmaXJzdCBub2RlIG9uIHRoZSBzdGFja1xuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnN0YWNrLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ05vZGU6Jywgbm9kZSk7XG5cbiAgICAgICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RhY2sgc2hvdWxkIG5vdCBiZSBlbXB0eSAhJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzdG10O1xuXG4gICAgICAgICAgICBzd2l0Y2gobm9kZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIGxldCBmdW5jID0gbm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoZnVuYy5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWNsYXJlUHJvZ3JlbUFyZ3VtZW50cygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb2RlU3RhdGVtZW50RmFjdG9yeS5idWlsZChmdW5jKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdCbG9ja1N0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9jayA9IG5vZGUgYXMgQmxvY2tTdGF0ZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrLmJvZHkuc2xpY2UoKS5yZXZlcnNlKCkubWFwKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnQmxvY2tTdGF0ZW1lbnQgdW5zaGlmdGluZzonLCB4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdCh4KVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdJZlN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIHN0bXQgPSBub2RlIGFzIElmU3RhdGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdENvZGUgPSBlc2NvZGVHZW5lcmF0ZShzdG10LnRlc3QpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0UmVzdWx0ID0gdGhpcy5zdGF0ZS5ldmFsKHRlc3RDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnSWZTdGF0ZW1lbnQgdGVzdCBldmFsdWF0ZSB0bzogJywgdGVzdFJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXN0UmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdUaGVuIHVuc2hpZnRpbmc6Jywgc3RtdC5jb25zZXF1ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sudW5zaGlmdChzdG10LmNvbnNlcXVlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0bXQuYWx0ZXJuYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnRWxzZSB1bnNoaWZ0aW5nOicsIHN0bXQuYWx0ZXJuYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnVuc2hpZnQoc3RtdC5hbHRlcm5hdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29kZVN0YXRlbWVudEZhY3RvcnkuYnVpbGQoc3RtdC50ZXN0KTtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1JldHVyblN0YXRlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgIHN0bXQgPSBub2RlIGFzIFJldHVyblN0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXR1cm5WYWx1ZSA9IHRoaXMuc3RhdGUuZXZhbChlc2NvZGVHZW5lcmF0ZShzdG10LmFyZ3VtZW50KSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb2RlU3RhdGVtZW50RmFjdG9yeS5idWlsZChzdG10KTtcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ05vZGU6Jywgbm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2RlID0gZXNjb2RlR2VuZXJhdGUobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0dlbmVyYXRlZCBjb2RlOicsIGNvZGUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXZhbFJlc3VsdCA9IHRoaXMuc3RhdGUuZXZhbChjb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnRXZhbHVhdGUgdG86JywgZXZhbFJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvZGVTdGF0ZW1lbnRGYWN0b3J5LmJ1aWxkKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICh0aGlzLnN0YWNrLmxlbmd0aCA+IDApO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSXRlcmF0b3IgaGFzIG5vIG1vcmUgY29kZSB0byBleGVjdXRlICEnKTtcbiAgICB9ICAgIFxuICAgIFxuICAgIGhhc05leHQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbm9kZXMgPSB0aGlzLnN0YWNrLnNsaWNlKDApO1xuICAgICAgICB3aGlsZSAobm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBub2Rlcy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS50eXBlICE9PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9ja3M6IEJsb2NrU3RhdGVtZW50W10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrID0gbm9kZSBhcyBCbG9ja1N0YXRlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tzLnB1c2goYmxvY2spO1xuICAgICAgICAgICAgICAgICAgICAvLyBQYXJzb3VycyByZWN1cnNpdmVtZW50IGxlcyBibG9ja3Mgw6AgbGEgcmVjaGVyY2hlIGRlIG5vZXVkIHF1aSBuZSBzb250IHBhcyBkZXMgYmxvY2tzXG4gICAgICAgICAgICAgICAgICAgIGxldCBoYXNOZXh0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghaGFzTmV4dCAmJiBibG9ja3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGIgPSBibG9ja3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYi5ib2R5Lm1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHgudHlwZSAhPT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzTmV4dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja3MucHVzaCh4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNOZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgY2xhc3MgRXNwcmltYVByb2dyZW1Db2RlIGltcGxlbWVudHMgUHJvZ3JlbUNvZGUge1xuXG4gICAgcHJpdmF0ZSBlc3ByaW1hUHJvZ3JhbTogUHJvZ3JhbTtcblxuICAgIGNvbnN0cnVjdG9yKGNvZGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmVzcHJpbWFQcm9ncmFtID0gcGFyc2VNb2R1bGUoY29kZSk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgaW5pdGlhbGlzZXJQcm9ncmVtRnVuY3Rpb24oKTogRnVuY3Rpb25EZWNsYXJhdGlvbiB7XG4gICAgICAgIHZhciByZXN1bHQ6IEZ1bmN0aW9uRGVjbGFyYXRpb24gfCBudWxsID0gbnVsbDtcbiAgICAgICAgZXNwcmltYVdhbGsodGhpcy5lc3ByaW1hUHJvZ3JhbSwgbm9kZSA9PiB7XG4gICAgICAgICAgICBpZiggbm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicgJiYgbm9kZS5pZCAmJiBub2RlLmlkLm5hbWUgPT09ICdpbml0aWFsaXNlclByb2dyZW0nICkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gKTtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcG9zc2libGUgZGUgdHJvdXZlciB1bmUgZm9uY3Rpb24gY29sb3JlclByb2dyZW0oKSAhJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbG9yZXJQcm9ncmVtRnVuY3Rpb24oKTogRnVuY3Rpb25EZWNsYXJhdGlvbiB7XG4gICAgICAgIHZhciByZXN1bHQ6IEZ1bmN0aW9uRGVjbGFyYXRpb24gfCBudWxsID0gbnVsbDtcbiAgICAgICAgZXNwcmltYVdhbGsodGhpcy5lc3ByaW1hUHJvZ3JhbSwgbm9kZSA9PiB7XG4gICAgICAgICAgICBpZiggbm9kZS50eXBlID09PSAnRnVuY3Rpb25EZWNsYXJhdGlvbicgJiYgbm9kZS5pZCAmJiBub2RlLmlkLm5hbWUgPT09ICdjb2xvcmVyUHJvZ3JlbScgKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSApO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW1wb3NzaWJsZSBkZSB0cm91dmVyIHVuZSBmb25jdGlvbiBjb2xvcmVyUHJvZ3JlbSgpICEnKTtcbiAgICB9XG5cbiAgICBpdGVyYXRvcihzdGF0ZTogUHJvZ3JlbVN0YXRlKTogQ29kZUl0ZXJhdG9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCYXNpY0VzcHJpbWFDb2RlSXRlcmF0b3IodGhpcy5jb2xvcmVyUHJvZ3JlbUZ1bmN0aW9uKCksIHN0YXRlKTtcbiAgICB9XG59XG5cbmNsYXNzIFByb2dyZW1Db2RlRmFjdG9yeSB7XG4gICAgcHVibGljIGJ1aWxkKGNvZGU6IHN0cmluZyk6IFByb2dyZW1Db2RlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFc3ByaW1hUHJvZ3JlbUNvZGUoY29kZSk7XG4gICAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIENvZGVTZXJ2aWNlIHtcblxuICAgIGV4cG9ydCBjb25zdCBwcm9ncmVtQ29kZUZhY3RvcnkgPSBuZXcgUHJvZ3JlbUNvZGVGYWN0b3J5KCk7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gbG9hZFByb2dyZW0oZmlsZVVybDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsaWVudCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgY2xpZW50Lm9wZW4oJ0dFVCcsIGZpbGVVcmwpO1xuICAgICAgICAgICAgY2xpZW50Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29kZSA9IGNsaWVudC5yZXNwb25zZVRleHQ7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29kZVNlcnZpY2U6IFByb2dyZW0gbG9hZGVkIHN1Y2Nlc3NmdWxseS4nLCBjb2RlKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGNvZGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNsaWVudC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KGNsaWVudC5zdGF0dXNUZXh0KTtcbiAgICAgICAgICAgIGNsaWVudC5zZW5kKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSJdLCJzb3VyY2VSb290IjoiIn0=