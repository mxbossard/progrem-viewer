(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.esprima"],{

/***/ "+U4B":
/*!**********************************************!*\
  !*** ./node_modules/esprima/dist/esprima.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
/* istanbul ignore next */
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/* istanbul ignore if */
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*
	  Copyright JS Foundation and other contributors, https://js.foundation/

	  Redistribution and use in source and binary forms, with or without
	  modification, are permitted provided that the following conditions are met:

	    * Redistributions of source code must retain the above copyright
	      notice, this list of conditions and the following disclaimer.
	    * Redistributions in binary form must reproduce the above copyright
	      notice, this list of conditions and the following disclaimer in the
	      documentation and/or other materials provided with the distribution.

	  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
	  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
	  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	var comment_handler_1 = __webpack_require__(1);
	var jsx_parser_1 = __webpack_require__(3);
	var parser_1 = __webpack_require__(8);
	var tokenizer_1 = __webpack_require__(15);
	function parse(code, options, delegate) {
	    var commentHandler = null;
	    var proxyDelegate = function (node, metadata) {
	        if (delegate) {
	            delegate(node, metadata);
	        }
	        if (commentHandler) {
	            commentHandler.visit(node, metadata);
	        }
	    };
	    var parserDelegate = (typeof delegate === 'function') ? proxyDelegate : null;
	    var collectComment = false;
	    if (options) {
	        collectComment = (typeof options.comment === 'boolean' && options.comment);
	        var attachComment = (typeof options.attachComment === 'boolean' && options.attachComment);
	        if (collectComment || attachComment) {
	            commentHandler = new comment_handler_1.CommentHandler();
	            commentHandler.attach = attachComment;
	            options.comment = true;
	            parserDelegate = proxyDelegate;
	        }
	    }
	    var isModule = false;
	    if (options && typeof options.sourceType === 'string') {
	        isModule = (options.sourceType === 'module');
	    }
	    var parser;
	    if (options && typeof options.jsx === 'boolean' && options.jsx) {
	        parser = new jsx_parser_1.JSXParser(code, options, parserDelegate);
	    }
	    else {
	        parser = new parser_1.Parser(code, options, parserDelegate);
	    }
	    var program = isModule ? parser.parseModule() : parser.parseScript();
	    var ast = program;
	    if (collectComment && commentHandler) {
	        ast.comments = commentHandler.comments;
	    }
	    if (parser.config.tokens) {
	        ast.tokens = parser.tokens;
	    }
	    if (parser.config.tolerant) {
	        ast.errors = parser.errorHandler.errors;
	    }
	    return ast;
	}
	exports.parse = parse;
	function parseModule(code, options, delegate) {
	    var parsingOptions = options || {};
	    parsingOptions.sourceType = 'module';
	    return parse(code, parsingOptions, delegate);
	}
	exports.parseModule = parseModule;
	function parseScript(code, options, delegate) {
	    var parsingOptions = options || {};
	    parsingOptions.sourceType = 'script';
	    return parse(code, parsingOptions, delegate);
	}
	exports.parseScript = parseScript;
	function tokenize(code, options, delegate) {
	    var tokenizer = new tokenizer_1.Tokenizer(code, options);
	    var tokens;
	    tokens = [];
	    try {
	        while (true) {
	            var token = tokenizer.getNextToken();
	            if (!token) {
	                break;
	            }
	            if (delegate) {
	                token = delegate(token);
	            }
	            tokens.push(token);
	        }
	    }
	    catch (e) {
	        tokenizer.errorHandler.tolerate(e);
	    }
	    if (tokenizer.errorHandler.tolerant) {
	        tokens.errors = tokenizer.errors();
	    }
	    return tokens;
	}
	exports.tokenize = tokenize;
	var syntax_1 = __webpack_require__(2);
	exports.Syntax = syntax_1.Syntax;
	// Sync with *.json manifests.
	exports.version = '4.0.1';


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var syntax_1 = __webpack_require__(2);
	var CommentHandler = (function () {
	    function CommentHandler() {
	        this.attach = false;
	        this.comments = [];
	        this.stack = [];
	        this.leading = [];
	        this.trailing = [];
	    }
	    CommentHandler.prototype.insertInnerComments = function (node, metadata) {
	        //  innnerComments for properties empty block
	        //  `function a() {/** comments **\/}`
	        if (node.type === syntax_1.Syntax.BlockStatement && node.body.length === 0) {
	            var innerComments = [];
	            for (var i = this.leading.length - 1; i >= 0; --i) {
	                var entry = this.leading[i];
	                if (metadata.end.offset >= entry.start) {
	                    innerComments.unshift(entry.comment);
	                    this.leading.splice(i, 1);
	                    this.trailing.splice(i, 1);
	                }
	            }
	            if (innerComments.length) {
	                node.innerComments = innerComments;
	            }
	        }
	    };
	    CommentHandler.prototype.findTrailingComments = function (metadata) {
	        var trailingComments = [];
	        if (this.trailing.length > 0) {
	            for (var i = this.trailing.length - 1; i >= 0; --i) {
	                var entry_1 = this.trailing[i];
	                if (entry_1.start >= metadata.end.offset) {
	                    trailingComments.unshift(entry_1.comment);
	                }
	            }
	            this.trailing.length = 0;
	            return trailingComments;
	        }
	        var entry = this.stack[this.stack.length - 1];
	        if (entry && entry.node.trailingComments) {
	            var firstComment = entry.node.trailingComments[0];
	            if (firstComment && firstComment.range[0] >= metadata.end.offset) {
	                trailingComments = entry.node.trailingComments;
	                delete entry.node.trailingComments;
	            }
	        }
	        return trailingComments;
	    };
	    CommentHandler.prototype.findLeadingComments = function (metadata) {
	        var leadingComments = [];
	        var target;
	        while (this.stack.length > 0) {
	            var entry = this.stack[this.stack.length - 1];
	            if (entry && entry.start >= metadata.start.offset) {
	                target = entry.node;
	                this.stack.pop();
	            }
	            else {
	                break;
	            }
	        }
	        if (target) {
	            var count = target.leadingComments ? target.leadingComments.length : 0;
	            for (var i = count - 1; i >= 0; --i) {
	                var comment = target.leadingComments[i];
	                if (comment.range[1] <= metadata.start.offset) {
	                    leadingComments.unshift(comment);
	                    target.leadingComments.splice(i, 1);
	                }
	            }
	            if (target.leadingComments && target.leadingComments.length === 0) {
	                delete target.leadingComments;
	            }
	            return leadingComments;
	        }
	        for (var i = this.leading.length - 1; i >= 0; --i) {
	            var entry = this.leading[i];
	            if (entry.start <= metadata.start.offset) {
	                leadingComments.unshift(entry.comment);
	                this.leading.splice(i, 1);
	            }
	        }
	        return leadingComments;
	    };
	    CommentHandler.prototype.visitNode = function (node, metadata) {
	        if (node.type === syntax_1.Syntax.Program && node.body.length > 0) {
	            return;
	        }
	        this.insertInnerComments(node, metadata);
	        var trailingComments = this.findTrailingComments(metadata);
	        var leadingComments = this.findLeadingComments(metadata);
	        if (leadingComments.length > 0) {
	            node.leadingComments = leadingComments;
	        }
	        if (trailingComments.length > 0) {
	            node.trailingComments = trailingComments;
	        }
	        this.stack.push({
	            node: node,
	            start: metadata.start.offset
	        });
	    };
	    CommentHandler.prototype.visitComment = function (node, metadata) {
	        var type = (node.type[0] === 'L') ? 'Line' : 'Block';
	        var comment = {
	            type: type,
	            value: node.value
	        };
	        if (node.range) {
	            comment.range = node.range;
	        }
	        if (node.loc) {
	            comment.loc = node.loc;
	        }
	        this.comments.push(comment);
	        if (this.attach) {
	            var entry = {
	                comment: {
	                    type: type,
	                    value: node.value,
	                    range: [metadata.start.offset, metadata.end.offset]
	                },
	                start: metadata.start.offset
	            };
	            if (node.loc) {
	                entry.comment.loc = node.loc;
	            }
	            node.type = type;
	            this.leading.push(entry);
	            this.trailing.push(entry);
	        }
	    };
	    CommentHandler.prototype.visit = function (node, metadata) {
	        if (node.type === 'LineComment') {
	            this.visitComment(node, metadata);
	        }
	        else if (node.type === 'BlockComment') {
	            this.visitComment(node, metadata);
	        }
	        else if (this.attach) {
	            this.visitNode(node, metadata);
	        }
	    };
	    return CommentHandler;
	}());
	exports.CommentHandler = CommentHandler;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Syntax = {
	    AssignmentExpression: 'AssignmentExpression',
	    AssignmentPattern: 'AssignmentPattern',
	    ArrayExpression: 'ArrayExpression',
	    ArrayPattern: 'ArrayPattern',
	    ArrowFunctionExpression: 'ArrowFunctionExpression',
	    AwaitExpression: 'AwaitExpression',
	    BlockStatement: 'BlockStatement',
	    BinaryExpression: 'BinaryExpression',
	    BreakStatement: 'BreakStatement',
	    CallExpression: 'CallExpression',
	    CatchClause: 'CatchClause',
	    ClassBody: 'ClassBody',
	    ClassDeclaration: 'ClassDeclaration',
	    ClassExpression: 'ClassExpression',
	    ConditionalExpression: 'ConditionalExpression',
	    ContinueStatement: 'ContinueStatement',
	    DoWhileStatement: 'DoWhileStatement',
	    DebuggerStatement: 'DebuggerStatement',
	    EmptyStatement: 'EmptyStatement',
	    ExportAllDeclaration: 'ExportAllDeclaration',
	    ExportDefaultDeclaration: 'ExportDefaultDeclaration',
	    ExportNamedDeclaration: 'ExportNamedDeclaration',
	    ExportSpecifier: 'ExportSpecifier',
	    ExpressionStatement: 'ExpressionStatement',
	    ForStatement: 'ForStatement',
	    ForOfStatement: 'ForOfStatement',
	    ForInStatement: 'ForInStatement',
	    FunctionDeclaration: 'FunctionDeclaration',
	    FunctionExpression: 'FunctionExpression',
	    Identifier: 'Identifier',
	    IfStatement: 'IfStatement',
	    ImportDeclaration: 'ImportDeclaration',
	    ImportDefaultSpecifier: 'ImportDefaultSpecifier',
	    ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
	    ImportSpecifier: 'ImportSpecifier',
	    Literal: 'Literal',
	    LabeledStatement: 'LabeledStatement',
	    LogicalExpression: 'LogicalExpression',
	    MemberExpression: 'MemberExpression',
	    MetaProperty: 'MetaProperty',
	    MethodDefinition: 'MethodDefinition',
	    NewExpression: 'NewExpression',
	    ObjectExpression: 'ObjectExpression',
	    ObjectPattern: 'ObjectPattern',
	    Program: 'Program',
	    Property: 'Property',
	    RestElement: 'RestElement',
	    ReturnStatement: 'ReturnStatement',
	    SequenceExpression: 'SequenceExpression',
	    SpreadElement: 'SpreadElement',
	    Super: 'Super',
	    SwitchCase: 'SwitchCase',
	    SwitchStatement: 'SwitchStatement',
	    TaggedTemplateExpression: 'TaggedTemplateExpression',
	    TemplateElement: 'TemplateElement',
	    TemplateLiteral: 'TemplateLiteral',
	    ThisExpression: 'ThisExpression',
	    ThrowStatement: 'ThrowStatement',
	    TryStatement: 'TryStatement',
	    UnaryExpression: 'UnaryExpression',
	    UpdateExpression: 'UpdateExpression',
	    VariableDeclaration: 'VariableDeclaration',
	    VariableDeclarator: 'VariableDeclarator',
	    WhileStatement: 'WhileStatement',
	    WithStatement: 'WithStatement',
	    YieldExpression: 'YieldExpression'
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
/* istanbul ignore next */
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var character_1 = __webpack_require__(4);
	var JSXNode = __webpack_require__(5);
	var jsx_syntax_1 = __webpack_require__(6);
	var Node = __webpack_require__(7);
	var parser_1 = __webpack_require__(8);
	var token_1 = __webpack_require__(13);
	var xhtml_entities_1 = __webpack_require__(14);
	token_1.TokenName[100 /* Identifier */] = 'JSXIdentifier';
	token_1.TokenName[101 /* Text */] = 'JSXText';
	// Fully qualified element name, e.g. <svg:path> returns "svg:path"
	function getQualifiedElementName(elementName) {
	    var qualifiedName;
	    switch (elementName.type) {
	        case jsx_syntax_1.JSXSyntax.JSXIdentifier:
	            var id = elementName;
	            qualifiedName = id.name;
	            break;
	        case jsx_syntax_1.JSXSyntax.JSXNamespacedName:
	            var ns = elementName;
	            qualifiedName = getQualifiedElementName(ns.namespace) + ':' +
	                getQualifiedElementName(ns.name);
	            break;
	        case jsx_syntax_1.JSXSyntax.JSXMemberExpression:
	            var expr = elementName;
	            qualifiedName = getQualifiedElementName(expr.object) + '.' +
	                getQualifiedElementName(expr.property);
	            break;
	        /* istanbul ignore next */
	        default:
	            break;
	    }
	    return qualifiedName;
	}
	var JSXParser = (function (_super) {
	    __extends(JSXParser, _super);
	    function JSXParser(code, options, delegate) {
	        return _super.call(this, code, options, delegate) || this;
	    }
	    JSXParser.prototype.parsePrimaryExpression = function () {
	        return this.match('<') ? this.parseJSXRoot() : _super.prototype.parsePrimaryExpression.call(this);
	    };
	    JSXParser.prototype.startJSX = function () {
	        // Unwind the scanner before the lookahead token.
	        this.scanner.index = this.startMarker.index;
	        this.scanner.lineNumber = this.startMarker.line;
	        this.scanner.lineStart = this.startMarker.index - this.startMarker.column;
	    };
	    JSXParser.prototype.finishJSX = function () {
	        // Prime the next lookahead.
	        this.nextToken();
	    };
	    JSXParser.prototype.reenterJSX = function () {
	        this.startJSX();
	        this.expectJSX('}');
	        // Pop the closing '}' added from the lookahead.
	        if (this.config.tokens) {
	            this.tokens.pop();
	        }
	    };
	    JSXParser.prototype.createJSXNode = function () {
	        this.collectComments();
	        return {
	            index: this.scanner.index,
	            line: this.scanner.lineNumber,
	            column: this.scanner.index - this.scanner.lineStart
	        };
	    };
	    JSXParser.prototype.createJSXChildNode = function () {
	        return {
	            index: this.scanner.index,
	            line: this.scanner.lineNumber,
	            column: this.scanner.index - this.scanner.lineStart
	        };
	    };
	    JSXParser.prototype.scanXHTMLEntity = function (quote) {
	        var result = '&';
	        var valid = true;
	        var terminated = false;
	        var numeric = false;
	        var hex = false;
	        while (!this.scanner.eof() && valid && !terminated) {
	            var ch = this.scanner.source[this.scanner.index];
	            if (ch === quote) {
	                break;
	            }
	            terminated = (ch === ';');
	            result += ch;
	            ++this.scanner.index;
	            if (!terminated) {
	                switch (result.length) {
	                    case 2:
	                        // e.g. '&#123;'
	                        numeric = (ch === '#');
	                        break;
	                    case 3:
	                        if (numeric) {
	                            // e.g. '&#x41;'
	                            hex = (ch === 'x');
	                            valid = hex || character_1.Character.isDecimalDigit(ch.charCodeAt(0));
	                            numeric = numeric && !hex;
	                        }
	                        break;
	                    default:
	                        valid = valid && !(numeric && !character_1.Character.isDecimalDigit(ch.charCodeAt(0)));
	                        valid = valid && !(hex && !character_1.Character.isHexDigit(ch.charCodeAt(0)));
	                        break;
	                }
	            }
	        }
	        if (valid && terminated && result.length > 2) {
	            // e.g. '&#x41;' becomes just '#x41'
	            var str = result.substr(1, result.length - 2);
	            if (numeric && str.length > 1) {
	                result = String.fromCharCode(parseInt(str.substr(1), 10));
	            }
	            else if (hex && str.length > 2) {
	                result = String.fromCharCode(parseInt('0' + str.substr(1), 16));
	            }
	            else if (!numeric && !hex && xhtml_entities_1.XHTMLEntities[str]) {
	                result = xhtml_entities_1.XHTMLEntities[str];
	            }
	        }
	        return result;
	    };
	    // Scan the next JSX token. This replaces Scanner#lex when in JSX mode.
	    JSXParser.prototype.lexJSX = function () {
	        var cp = this.scanner.source.charCodeAt(this.scanner.index);
	        // < > / : = { }
	        if (cp === 60 || cp === 62 || cp === 47 || cp === 58 || cp === 61 || cp === 123 || cp === 125) {
	            var value = this.scanner.source[this.scanner.index++];
	            return {
	                type: 7 /* Punctuator */,
	                value: value,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: this.scanner.index - 1,
	                end: this.scanner.index
	            };
	        }
	        // " '
	        if (cp === 34 || cp === 39) {
	            var start = this.scanner.index;
	            var quote = this.scanner.source[this.scanner.index++];
	            var str = '';
	            while (!this.scanner.eof()) {
	                var ch = this.scanner.source[this.scanner.index++];
	                if (ch === quote) {
	                    break;
	                }
	                else if (ch === '&') {
	                    str += this.scanXHTMLEntity(quote);
	                }
	                else {
	                    str += ch;
	                }
	            }
	            return {
	                type: 8 /* StringLiteral */,
	                value: str,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: start,
	                end: this.scanner.index
	            };
	        }
	        // ... or .
	        if (cp === 46) {
	            var n1 = this.scanner.source.charCodeAt(this.scanner.index + 1);
	            var n2 = this.scanner.source.charCodeAt(this.scanner.index + 2);
	            var value = (n1 === 46 && n2 === 46) ? '...' : '.';
	            var start = this.scanner.index;
	            this.scanner.index += value.length;
	            return {
	                type: 7 /* Punctuator */,
	                value: value,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: start,
	                end: this.scanner.index
	            };
	        }
	        // `
	        if (cp === 96) {
	            // Only placeholder, since it will be rescanned as a real assignment expression.
	            return {
	                type: 10 /* Template */,
	                value: '',
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: this.scanner.index,
	                end: this.scanner.index
	            };
	        }
	        // Identifer can not contain backslash (char code 92).
	        if (character_1.Character.isIdentifierStart(cp) && (cp !== 92)) {
	            var start = this.scanner.index;
	            ++this.scanner.index;
	            while (!this.scanner.eof()) {
	                var ch = this.scanner.source.charCodeAt(this.scanner.index);
	                if (character_1.Character.isIdentifierPart(ch) && (ch !== 92)) {
	                    ++this.scanner.index;
	                }
	                else if (ch === 45) {
	                    // Hyphen (char code 45) can be part of an identifier.
	                    ++this.scanner.index;
	                }
	                else {
	                    break;
	                }
	            }
	            var id = this.scanner.source.slice(start, this.scanner.index);
	            return {
	                type: 100 /* Identifier */,
	                value: id,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: start,
	                end: this.scanner.index
	            };
	        }
	        return this.scanner.lex();
	    };
	    JSXParser.prototype.nextJSXToken = function () {
	        this.collectComments();
	        this.startMarker.index = this.scanner.index;
	        this.startMarker.line = this.scanner.lineNumber;
	        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
	        var token = this.lexJSX();
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.line = this.scanner.lineNumber;
	        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
	        if (this.config.tokens) {
	            this.tokens.push(this.convertToken(token));
	        }
	        return token;
	    };
	    JSXParser.prototype.nextJSXText = function () {
	        this.startMarker.index = this.scanner.index;
	        this.startMarker.line = this.scanner.lineNumber;
	        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
	        var start = this.scanner.index;
	        var text = '';
	        while (!this.scanner.eof()) {
	            var ch = this.scanner.source[this.scanner.index];
	            if (ch === '{' || ch === '<') {
	                break;
	            }
	            ++this.scanner.index;
	            text += ch;
	            if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                ++this.scanner.lineNumber;
	                if (ch === '\r' && this.scanner.source[this.scanner.index] === '\n') {
	                    ++this.scanner.index;
	                }
	                this.scanner.lineStart = this.scanner.index;
	            }
	        }
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.line = this.scanner.lineNumber;
	        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
	        var token = {
	            type: 101 /* Text */,
	            value: text,
	            lineNumber: this.scanner.lineNumber,
	            lineStart: this.scanner.lineStart,
	            start: start,
	            end: this.scanner.index
	        };
	        if ((text.length > 0) && this.config.tokens) {
	            this.tokens.push(this.convertToken(token));
	        }
	        return token;
	    };
	    JSXParser.prototype.peekJSXToken = function () {
	        var state = this.scanner.saveState();
	        this.scanner.scanComments();
	        var next = this.lexJSX();
	        this.scanner.restoreState(state);
	        return next;
	    };
	    // Expect the next JSX token to match the specified punctuator.
	    // If not, an exception will be thrown.
	    JSXParser.prototype.expectJSX = function (value) {
	        var token = this.nextJSXToken();
	        if (token.type !== 7 /* Punctuator */ || token.value !== value) {
	            this.throwUnexpectedToken(token);
	        }
	    };
	    // Return true if the next JSX token matches the specified punctuator.
	    JSXParser.prototype.matchJSX = function (value) {
	        var next = this.peekJSXToken();
	        return next.type === 7 /* Punctuator */ && next.value === value;
	    };
	    JSXParser.prototype.parseJSXIdentifier = function () {
	        var node = this.createJSXNode();
	        var token = this.nextJSXToken();
	        if (token.type !== 100 /* Identifier */) {
	            this.throwUnexpectedToken(token);
	        }
	        return this.finalize(node, new JSXNode.JSXIdentifier(token.value));
	    };
	    JSXParser.prototype.parseJSXElementName = function () {
	        var node = this.createJSXNode();
	        var elementName = this.parseJSXIdentifier();
	        if (this.matchJSX(':')) {
	            var namespace = elementName;
	            this.expectJSX(':');
	            var name_1 = this.parseJSXIdentifier();
	            elementName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_1));
	        }
	        else if (this.matchJSX('.')) {
	            while (this.matchJSX('.')) {
	                var object = elementName;
	                this.expectJSX('.');
	                var property = this.parseJSXIdentifier();
	                elementName = this.finalize(node, new JSXNode.JSXMemberExpression(object, property));
	            }
	        }
	        return elementName;
	    };
	    JSXParser.prototype.parseJSXAttributeName = function () {
	        var node = this.createJSXNode();
	        var attributeName;
	        var identifier = this.parseJSXIdentifier();
	        if (this.matchJSX(':')) {
	            var namespace = identifier;
	            this.expectJSX(':');
	            var name_2 = this.parseJSXIdentifier();
	            attributeName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_2));
	        }
	        else {
	            attributeName = identifier;
	        }
	        return attributeName;
	    };
	    JSXParser.prototype.parseJSXStringLiteralAttribute = function () {
	        var node = this.createJSXNode();
	        var token = this.nextJSXToken();
	        if (token.type !== 8 /* StringLiteral */) {
	            this.throwUnexpectedToken(token);
	        }
	        var raw = this.getTokenRaw(token);
	        return this.finalize(node, new Node.Literal(token.value, raw));
	    };
	    JSXParser.prototype.parseJSXExpressionAttribute = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('{');
	        this.finishJSX();
	        if (this.match('}')) {
	            this.tolerateError('JSX attributes must only be assigned a non-empty expression');
	        }
	        var expression = this.parseAssignmentExpression();
	        this.reenterJSX();
	        return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
	    };
	    JSXParser.prototype.parseJSXAttributeValue = function () {
	        return this.matchJSX('{') ? this.parseJSXExpressionAttribute() :
	            this.matchJSX('<') ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute();
	    };
	    JSXParser.prototype.parseJSXNameValueAttribute = function () {
	        var node = this.createJSXNode();
	        var name = this.parseJSXAttributeName();
	        var value = null;
	        if (this.matchJSX('=')) {
	            this.expectJSX('=');
	            value = this.parseJSXAttributeValue();
	        }
	        return this.finalize(node, new JSXNode.JSXAttribute(name, value));
	    };
	    JSXParser.prototype.parseJSXSpreadAttribute = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('{');
	        this.expectJSX('...');
	        this.finishJSX();
	        var argument = this.parseAssignmentExpression();
	        this.reenterJSX();
	        return this.finalize(node, new JSXNode.JSXSpreadAttribute(argument));
	    };
	    JSXParser.prototype.parseJSXAttributes = function () {
	        var attributes = [];
	        while (!this.matchJSX('/') && !this.matchJSX('>')) {
	            var attribute = this.matchJSX('{') ? this.parseJSXSpreadAttribute() :
	                this.parseJSXNameValueAttribute();
	            attributes.push(attribute);
	        }
	        return attributes;
	    };
	    JSXParser.prototype.parseJSXOpeningElement = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('<');
	        var name = this.parseJSXElementName();
	        var attributes = this.parseJSXAttributes();
	        var selfClosing = this.matchJSX('/');
	        if (selfClosing) {
	            this.expectJSX('/');
	        }
	        this.expectJSX('>');
	        return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
	    };
	    JSXParser.prototype.parseJSXBoundaryElement = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('<');
	        if (this.matchJSX('/')) {
	            this.expectJSX('/');
	            var name_3 = this.parseJSXElementName();
	            this.expectJSX('>');
	            return this.finalize(node, new JSXNode.JSXClosingElement(name_3));
	        }
	        var name = this.parseJSXElementName();
	        var attributes = this.parseJSXAttributes();
	        var selfClosing = this.matchJSX('/');
	        if (selfClosing) {
	            this.expectJSX('/');
	        }
	        this.expectJSX('>');
	        return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
	    };
	    JSXParser.prototype.parseJSXEmptyExpression = function () {
	        var node = this.createJSXChildNode();
	        this.collectComments();
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.line = this.scanner.lineNumber;
	        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
	        return this.finalize(node, new JSXNode.JSXEmptyExpression());
	    };
	    JSXParser.prototype.parseJSXExpressionContainer = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('{');
	        var expression;
	        if (this.matchJSX('}')) {
	            expression = this.parseJSXEmptyExpression();
	            this.expectJSX('}');
	        }
	        else {
	            this.finishJSX();
	            expression = this.parseAssignmentExpression();
	            this.reenterJSX();
	        }
	        return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
	    };
	    JSXParser.prototype.parseJSXChildren = function () {
	        var children = [];
	        while (!this.scanner.eof()) {
	            var node = this.createJSXChildNode();
	            var token = this.nextJSXText();
	            if (token.start < token.end) {
	                var raw = this.getTokenRaw(token);
	                var child = this.finalize(node, new JSXNode.JSXText(token.value, raw));
	                children.push(child);
	            }
	            if (this.scanner.source[this.scanner.index] === '{') {
	                var container = this.parseJSXExpressionContainer();
	                children.push(container);
	            }
	            else {
	                break;
	            }
	        }
	        return children;
	    };
	    JSXParser.prototype.parseComplexJSXElement = function (el) {
	        var stack = [];
	        while (!this.scanner.eof()) {
	            el.children = el.children.concat(this.parseJSXChildren());
	            var node = this.createJSXChildNode();
	            var element = this.parseJSXBoundaryElement();
	            if (element.type === jsx_syntax_1.JSXSyntax.JSXOpeningElement) {
	                var opening = element;
	                if (opening.selfClosing) {
	                    var child = this.finalize(node, new JSXNode.JSXElement(opening, [], null));
	                    el.children.push(child);
	                }
	                else {
	                    stack.push(el);
	                    el = { node: node, opening: opening, closing: null, children: [] };
	                }
	            }
	            if (element.type === jsx_syntax_1.JSXSyntax.JSXClosingElement) {
	                el.closing = element;
	                var open_1 = getQualifiedElementName(el.opening.name);
	                var close_1 = getQualifiedElementName(el.closing.name);
	                if (open_1 !== close_1) {
	                    this.tolerateError('Expected corresponding JSX closing tag for %0', open_1);
	                }
	                if (stack.length > 0) {
	                    var child = this.finalize(el.node, new JSXNode.JSXElement(el.opening, el.children, el.closing));
	                    el = stack[stack.length - 1];
	                    el.children.push(child);
	                    stack.pop();
	                }
	                else {
	                    break;
	                }
	            }
	        }
	        return el;
	    };
	    JSXParser.prototype.parseJSXElement = function () {
	        var node = this.createJSXNode();
	        var opening = this.parseJSXOpeningElement();
	        var children = [];
	        var closing = null;
	        if (!opening.selfClosing) {
	            var el = this.parseComplexJSXElement({ node: node, opening: opening, closing: closing, children: children });
	            children = el.children;
	            closing = el.closing;
	        }
	        return this.finalize(node, new JSXNode.JSXElement(opening, children, closing));
	    };
	    JSXParser.prototype.parseJSXRoot = function () {
	        // Pop the opening '<' added from the lookahead.
	        if (this.config.tokens) {
	            this.tokens.pop();
	        }
	        this.startJSX();
	        var element = this.parseJSXElement();
	        this.finishJSX();
	        return element;
	    };
	    JSXParser.prototype.isStartOfExpression = function () {
	        return _super.prototype.isStartOfExpression.call(this) || this.match('<');
	    };
	    return JSXParser;
	}(parser_1.Parser));
	exports.JSXParser = JSXParser;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	// See also tools/generate-unicode-regex.js.
	var Regex = {
	    // Unicode v8.0.0 NonAsciiIdentifierStart:
	    NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
	    // Unicode v8.0.0 NonAsciiIdentifierPart:
	    NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
	};
	exports.Character = {
	    /* tslint:disable:no-bitwise */
	    fromCodePoint: function (cp) {
	        return (cp < 0x10000) ? String.fromCharCode(cp) :
	            String.fromCharCode(0xD800 + ((cp - 0x10000) >> 10)) +
	                String.fromCharCode(0xDC00 + ((cp - 0x10000) & 1023));
	    },
	    // https://tc39.github.io/ecma262/#sec-white-space
	    isWhiteSpace: function (cp) {
	        return (cp === 0x20) || (cp === 0x09) || (cp === 0x0B) || (cp === 0x0C) || (cp === 0xA0) ||
	            (cp >= 0x1680 && [0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(cp) >= 0);
	    },
	    // https://tc39.github.io/ecma262/#sec-line-terminators
	    isLineTerminator: function (cp) {
	        return (cp === 0x0A) || (cp === 0x0D) || (cp === 0x2028) || (cp === 0x2029);
	    },
	    // https://tc39.github.io/ecma262/#sec-names-and-keywords
	    isIdentifierStart: function (cp) {
	        return (cp === 0x24) || (cp === 0x5F) ||
	            (cp >= 0x41 && cp <= 0x5A) ||
	            (cp >= 0x61 && cp <= 0x7A) ||
	            (cp === 0x5C) ||
	            ((cp >= 0x80) && Regex.NonAsciiIdentifierStart.test(exports.Character.fromCodePoint(cp)));
	    },
	    isIdentifierPart: function (cp) {
	        return (cp === 0x24) || (cp === 0x5F) ||
	            (cp >= 0x41 && cp <= 0x5A) ||
	            (cp >= 0x61 && cp <= 0x7A) ||
	            (cp >= 0x30 && cp <= 0x39) ||
	            (cp === 0x5C) ||
	            ((cp >= 0x80) && Regex.NonAsciiIdentifierPart.test(exports.Character.fromCodePoint(cp)));
	    },
	    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
	    isDecimalDigit: function (cp) {
	        return (cp >= 0x30 && cp <= 0x39); // 0..9
	    },
	    isHexDigit: function (cp) {
	        return (cp >= 0x30 && cp <= 0x39) ||
	            (cp >= 0x41 && cp <= 0x46) ||
	            (cp >= 0x61 && cp <= 0x66); // a..f
	    },
	    isOctalDigit: function (cp) {
	        return (cp >= 0x30 && cp <= 0x37); // 0..7
	    }
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var jsx_syntax_1 = __webpack_require__(6);
	/* tslint:disable:max-classes-per-file */
	var JSXClosingElement = (function () {
	    function JSXClosingElement(name) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXClosingElement;
	        this.name = name;
	    }
	    return JSXClosingElement;
	}());
	exports.JSXClosingElement = JSXClosingElement;
	var JSXElement = (function () {
	    function JSXElement(openingElement, children, closingElement) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXElement;
	        this.openingElement = openingElement;
	        this.children = children;
	        this.closingElement = closingElement;
	    }
	    return JSXElement;
	}());
	exports.JSXElement = JSXElement;
	var JSXEmptyExpression = (function () {
	    function JSXEmptyExpression() {
	        this.type = jsx_syntax_1.JSXSyntax.JSXEmptyExpression;
	    }
	    return JSXEmptyExpression;
	}());
	exports.JSXEmptyExpression = JSXEmptyExpression;
	var JSXExpressionContainer = (function () {
	    function JSXExpressionContainer(expression) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXExpressionContainer;
	        this.expression = expression;
	    }
	    return JSXExpressionContainer;
	}());
	exports.JSXExpressionContainer = JSXExpressionContainer;
	var JSXIdentifier = (function () {
	    function JSXIdentifier(name) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXIdentifier;
	        this.name = name;
	    }
	    return JSXIdentifier;
	}());
	exports.JSXIdentifier = JSXIdentifier;
	var JSXMemberExpression = (function () {
	    function JSXMemberExpression(object, property) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXMemberExpression;
	        this.object = object;
	        this.property = property;
	    }
	    return JSXMemberExpression;
	}());
	exports.JSXMemberExpression = JSXMemberExpression;
	var JSXAttribute = (function () {
	    function JSXAttribute(name, value) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXAttribute;
	        this.name = name;
	        this.value = value;
	    }
	    return JSXAttribute;
	}());
	exports.JSXAttribute = JSXAttribute;
	var JSXNamespacedName = (function () {
	    function JSXNamespacedName(namespace, name) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXNamespacedName;
	        this.namespace = namespace;
	        this.name = name;
	    }
	    return JSXNamespacedName;
	}());
	exports.JSXNamespacedName = JSXNamespacedName;
	var JSXOpeningElement = (function () {
	    function JSXOpeningElement(name, selfClosing, attributes) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXOpeningElement;
	        this.name = name;
	        this.selfClosing = selfClosing;
	        this.attributes = attributes;
	    }
	    return JSXOpeningElement;
	}());
	exports.JSXOpeningElement = JSXOpeningElement;
	var JSXSpreadAttribute = (function () {
	    function JSXSpreadAttribute(argument) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXSpreadAttribute;
	        this.argument = argument;
	    }
	    return JSXSpreadAttribute;
	}());
	exports.JSXSpreadAttribute = JSXSpreadAttribute;
	var JSXText = (function () {
	    function JSXText(value, raw) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXText;
	        this.value = value;
	        this.raw = raw;
	    }
	    return JSXText;
	}());
	exports.JSXText = JSXText;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.JSXSyntax = {
	    JSXAttribute: 'JSXAttribute',
	    JSXClosingElement: 'JSXClosingElement',
	    JSXElement: 'JSXElement',
	    JSXEmptyExpression: 'JSXEmptyExpression',
	    JSXExpressionContainer: 'JSXExpressionContainer',
	    JSXIdentifier: 'JSXIdentifier',
	    JSXMemberExpression: 'JSXMemberExpression',
	    JSXNamespacedName: 'JSXNamespacedName',
	    JSXOpeningElement: 'JSXOpeningElement',
	    JSXSpreadAttribute: 'JSXSpreadAttribute',
	    JSXText: 'JSXText'
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var syntax_1 = __webpack_require__(2);
	/* tslint:disable:max-classes-per-file */
	var ArrayExpression = (function () {
	    function ArrayExpression(elements) {
	        this.type = syntax_1.Syntax.ArrayExpression;
	        this.elements = elements;
	    }
	    return ArrayExpression;
	}());
	exports.ArrayExpression = ArrayExpression;
	var ArrayPattern = (function () {
	    function ArrayPattern(elements) {
	        this.type = syntax_1.Syntax.ArrayPattern;
	        this.elements = elements;
	    }
	    return ArrayPattern;
	}());
	exports.ArrayPattern = ArrayPattern;
	var ArrowFunctionExpression = (function () {
	    function ArrowFunctionExpression(params, body, expression) {
	        this.type = syntax_1.Syntax.ArrowFunctionExpression;
	        this.id = null;
	        this.params = params;
	        this.body = body;
	        this.generator = false;
	        this.expression = expression;
	        this.async = false;
	    }
	    return ArrowFunctionExpression;
	}());
	exports.ArrowFunctionExpression = ArrowFunctionExpression;
	var AssignmentExpression = (function () {
	    function AssignmentExpression(operator, left, right) {
	        this.type = syntax_1.Syntax.AssignmentExpression;
	        this.operator = operator;
	        this.left = left;
	        this.right = right;
	    }
	    return AssignmentExpression;
	}());
	exports.AssignmentExpression = AssignmentExpression;
	var AssignmentPattern = (function () {
	    function AssignmentPattern(left, right) {
	        this.type = syntax_1.Syntax.AssignmentPattern;
	        this.left = left;
	        this.right = right;
	    }
	    return AssignmentPattern;
	}());
	exports.AssignmentPattern = AssignmentPattern;
	var AsyncArrowFunctionExpression = (function () {
	    function AsyncArrowFunctionExpression(params, body, expression) {
	        this.type = syntax_1.Syntax.ArrowFunctionExpression;
	        this.id = null;
	        this.params = params;
	        this.body = body;
	        this.generator = false;
	        this.expression = expression;
	        this.async = true;
	    }
	    return AsyncArrowFunctionExpression;
	}());
	exports.AsyncArrowFunctionExpression = AsyncArrowFunctionExpression;
	var AsyncFunctionDeclaration = (function () {
	    function AsyncFunctionDeclaration(id, params, body) {
	        this.type = syntax_1.Syntax.FunctionDeclaration;
	        this.id = id;
	        this.params = params;
	        this.body = body;
	        this.generator = false;
	        this.expression = false;
	        this.async = true;
	    }
	    return AsyncFunctionDeclaration;
	}());
	exports.AsyncFunctionDeclaration = AsyncFunctionDeclaration;
	var AsyncFunctionExpression = (function () {
	    function AsyncFunctionExpression(id, params, body) {
	        this.type = syntax_1.Syntax.FunctionExpression;
	        this.id = id;
	        this.params = params;
	        this.body = body;
	        this.generator = false;
	        this.expression = false;
	        this.async = true;
	    }
	    return AsyncFunctionExpression;
	}());
	exports.AsyncFunctionExpression = AsyncFunctionExpression;
	var AwaitExpression = (function () {
	    function AwaitExpression(argument) {
	        this.type = syntax_1.Syntax.AwaitExpression;
	        this.argument = argument;
	    }
	    return AwaitExpression;
	}());
	exports.AwaitExpression = AwaitExpression;
	var BinaryExpression = (function () {
	    function BinaryExpression(operator, left, right) {
	        var logical = (operator === '||' || operator === '&&');
	        this.type = logical ? syntax_1.Syntax.LogicalExpression : syntax_1.Syntax.BinaryExpression;
	        this.operator = operator;
	        this.left = left;
	        this.right = right;
	    }
	    return BinaryExpression;
	}());
	exports.BinaryExpression = BinaryExpression;
	var BlockStatement = (function () {
	    function BlockStatement(body) {
	        this.type = syntax_1.Syntax.BlockStatement;
	        this.body = body;
	    }
	    return BlockStatement;
	}());
	exports.BlockStatement = BlockStatement;
	var BreakStatement = (function () {
	    function BreakStatement(label) {
	        this.type = syntax_1.Syntax.BreakStatement;
	        this.label = label;
	    }
	    return BreakStatement;
	}());
	exports.BreakStatement = BreakStatement;
	var CallExpression = (function () {
	    function CallExpression(callee, args) {
	        this.type = syntax_1.Syntax.CallExpression;
	        this.callee = callee;
	        this.arguments = args;
	    }
	    return CallExpression;
	}());
	exports.CallExpression = CallExpression;
	var CatchClause = (function () {
	    function CatchClause(param, body) {
	        this.type = syntax_1.Syntax.CatchClause;
	        this.param = param;
	        this.body = body;
	    }
	    return CatchClause;
	}());
	exports.CatchClause = CatchClause;
	var ClassBody = (function () {
	    function ClassBody(body) {
	        this.type = syntax_1.Syntax.ClassBody;
	        this.body = body;
	    }
	    return ClassBody;
	}());
	exports.ClassBody = ClassBody;
	var ClassDeclaration = (function () {
	    function ClassDeclaration(id, superClass, body) {
	        this.type = syntax_1.Syntax.ClassDeclaration;
	        this.id = id;
	        this.superClass = superClass;
	        this.body = body;
	    }
	    return ClassDeclaration;
	}());
	exports.ClassDeclaration = ClassDeclaration;
	var ClassExpression = (function () {
	    function ClassExpression(id, superClass, body) {
	        this.type = syntax_1.Syntax.ClassExpression;
	        this.id = id;
	        this.superClass = superClass;
	        this.body = body;
	    }
	    return ClassExpression;
	}());
	exports.ClassExpression = ClassExpression;
	var ComputedMemberExpression = (function () {
	    function ComputedMemberExpression(object, property) {
	        this.type = syntax_1.Syntax.MemberExpression;
	        this.computed = true;
	        this.object = object;
	        this.property = property;
	    }
	    return ComputedMemberExpression;
	}());
	exports.ComputedMemberExpression = ComputedMemberExpression;
	var ConditionalExpression = (function () {
	    function ConditionalExpression(test, consequent, alternate) {
	        this.type = syntax_1.Syntax.ConditionalExpression;
	        this.test = test;
	        this.consequent = consequent;
	        this.alternate = alternate;
	    }
	    return ConditionalExpression;
	}());
	exports.ConditionalExpression = ConditionalExpression;
	var ContinueStatement = (function () {
	    function ContinueStatement(label) {
	        this.type = syntax_1.Syntax.ContinueStatement;
	        this.label = label;
	    }
	    return ContinueStatement;
	}());
	exports.ContinueStatement = ContinueStatement;
	var DebuggerStatement = (function () {
	    function DebuggerStatement() {
	        this.type = syntax_1.Syntax.DebuggerStatement;
	    }
	    return DebuggerStatement;
	}());
	exports.DebuggerStatement = DebuggerStatement;
	var Directive = (function () {
	    function Directive(expression, directive) {
	        this.type = syntax_1.Syntax.ExpressionStatement;
	        this.expression = expression;
	        this.directive = directive;
	    }
	    return Directive;
	}());
	exports.Directive = Directive;
	var DoWhileStatement = (function () {
	    function DoWhileStatement(body, test) {
	        this.type = syntax_1.Syntax.DoWhileStatement;
	        this.body = body;
	        this.test = test;
	    }
	    return DoWhileStatement;
	}());
	exports.DoWhileStatement = DoWhileStatement;
	var EmptyStatement = (function () {
	    function EmptyStatement() {
	        this.type = syntax_1.Syntax.EmptyStatement;
	    }
	    return EmptyStatement;
	}());
	exports.EmptyStatement = EmptyStatement;
	var ExportAllDeclaration = (function () {
	    function ExportAllDeclaration(source) {
	        this.type = syntax_1.Syntax.ExportAllDeclaration;
	        this.source = source;
	    }
	    return ExportAllDeclaration;
	}());
	exports.ExportAllDeclaration = ExportAllDeclaration;
	var ExportDefaultDeclaration = (function () {
	    function ExportDefaultDeclaration(declaration) {
	        this.type = syntax_1.Syntax.ExportDefaultDeclaration;
	        this.declaration = declaration;
	    }
	    return ExportDefaultDeclaration;
	}());
	exports.ExportDefaultDeclaration = ExportDefaultDeclaration;
	var ExportNamedDeclaration = (function () {
	    function ExportNamedDeclaration(declaration, specifiers, source) {
	        this.type = syntax_1.Syntax.ExportNamedDeclaration;
	        this.declaration = declaration;
	        this.specifiers = specifiers;
	        this.source = source;
	    }
	    return ExportNamedDeclaration;
	}());
	exports.ExportNamedDeclaration = ExportNamedDeclaration;
	var ExportSpecifier = (function () {
	    function ExportSpecifier(local, exported) {
	        this.type = syntax_1.Syntax.ExportSpecifier;
	        this.exported = exported;
	        this.local = local;
	    }
	    return ExportSpecifier;
	}());
	exports.ExportSpecifier = ExportSpecifier;
	var ExpressionStatement = (function () {
	    function ExpressionStatement(expression) {
	        this.type = syntax_1.Syntax.ExpressionStatement;
	        this.expression = expression;
	    }
	    return ExpressionStatement;
	}());
	exports.ExpressionStatement = ExpressionStatement;
	var ForInStatement = (function () {
	    function ForInStatement(left, right, body) {
	        this.type = syntax_1.Syntax.ForInStatement;
	        this.left = left;
	        this.right = right;
	        this.body = body;
	        this.each = false;
	    }
	    return ForInStatement;
	}());
	exports.ForInStatement = ForInStatement;
	var ForOfStatement = (function () {
	    function ForOfStatement(left, right, body) {
	        this.type = syntax_1.Syntax.ForOfStatement;
	        this.left = left;
	        this.right = right;
	        this.body = body;
	    }
	    return ForOfStatement;
	}());
	exports.ForOfStatement = ForOfStatement;
	var ForStatement = (function () {
	    function ForStatement(init, test, update, body) {
	        this.type = syntax_1.Syntax.ForStatement;
	        this.init = init;
	        this.test = test;
	        this.update = update;
	        this.body = body;
	    }
	    return ForStatement;
	}());
	exports.ForStatement = ForStatement;
	var FunctionDeclaration = (function () {
	    function FunctionDeclaration(id, params, body, generator) {
	        this.type = syntax_1.Syntax.FunctionDeclaration;
	        this.id = id;
	        this.params = params;
	        this.body = body;
	        this.generator = generator;
	        this.expression = false;
	        this.async = false;
	    }
	    return FunctionDeclaration;
	}());
	exports.FunctionDeclaration = FunctionDeclaration;
	var FunctionExpression = (function () {
	    function FunctionExpression(id, params, body, generator) {
	        this.type = syntax_1.Syntax.FunctionExpression;
	        this.id = id;
	        this.params = params;
	        this.body = body;
	        this.generator = generator;
	        this.expression = false;
	        this.async = false;
	    }
	    return FunctionExpression;
	}());
	exports.FunctionExpression = FunctionExpression;
	var Identifier = (function () {
	    function Identifier(name) {
	        this.type = syntax_1.Syntax.Identifier;
	        this.name = name;
	    }
	    return Identifier;
	}());
	exports.Identifier = Identifier;
	var IfStatement = (function () {
	    function IfStatement(test, consequent, alternate) {
	        this.type = syntax_1.Syntax.IfStatement;
	        this.test = test;
	        this.consequent = consequent;
	        this.alternate = alternate;
	    }
	    return IfStatement;
	}());
	exports.IfStatement = IfStatement;
	var ImportDeclaration = (function () {
	    function ImportDeclaration(specifiers, source) {
	        this.type = syntax_1.Syntax.ImportDeclaration;
	        this.specifiers = specifiers;
	        this.source = source;
	    }
	    return ImportDeclaration;
	}());
	exports.ImportDeclaration = ImportDeclaration;
	var ImportDefaultSpecifier = (function () {
	    function ImportDefaultSpecifier(local) {
	        this.type = syntax_1.Syntax.ImportDefaultSpecifier;
	        this.local = local;
	    }
	    return ImportDefaultSpecifier;
	}());
	exports.ImportDefaultSpecifier = ImportDefaultSpecifier;
	var ImportNamespaceSpecifier = (function () {
	    function ImportNamespaceSpecifier(local) {
	        this.type = syntax_1.Syntax.ImportNamespaceSpecifier;
	        this.local = local;
	    }
	    return ImportNamespaceSpecifier;
	}());
	exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
	var ImportSpecifier = (function () {
	    function ImportSpecifier(local, imported) {
	        this.type = syntax_1.Syntax.ImportSpecifier;
	        this.local = local;
	        this.imported = imported;
	    }
	    return ImportSpecifier;
	}());
	exports.ImportSpecifier = ImportSpecifier;
	var LabeledStatement = (function () {
	    function LabeledStatement(label, body) {
	        this.type = syntax_1.Syntax.LabeledStatement;
	        this.label = label;
	        this.body = body;
	    }
	    return LabeledStatement;
	}());
	exports.LabeledStatement = LabeledStatement;
	var Literal = (function () {
	    function Literal(value, raw) {
	        this.type = syntax_1.Syntax.Literal;
	        this.value = value;
	        this.raw = raw;
	    }
	    return Literal;
	}());
	exports.Literal = Literal;
	var MetaProperty = (function () {
	    function MetaProperty(meta, property) {
	        this.type = syntax_1.Syntax.MetaProperty;
	        this.meta = meta;
	        this.property = property;
	    }
	    return MetaProperty;
	}());
	exports.MetaProperty = MetaProperty;
	var MethodDefinition = (function () {
	    function MethodDefinition(key, computed, value, kind, isStatic) {
	        this.type = syntax_1.Syntax.MethodDefinition;
	        this.key = key;
	        this.computed = computed;
	        this.value = value;
	        this.kind = kind;
	        this.static = isStatic;
	    }
	    return MethodDefinition;
	}());
	exports.MethodDefinition = MethodDefinition;
	var Module = (function () {
	    function Module(body) {
	        this.type = syntax_1.Syntax.Program;
	        this.body = body;
	        this.sourceType = 'module';
	    }
	    return Module;
	}());
	exports.Module = Module;
	var NewExpression = (function () {
	    function NewExpression(callee, args) {
	        this.type = syntax_1.Syntax.NewExpression;
	        this.callee = callee;
	        this.arguments = args;
	    }
	    return NewExpression;
	}());
	exports.NewExpression = NewExpression;
	var ObjectExpression = (function () {
	    function ObjectExpression(properties) {
	        this.type = syntax_1.Syntax.ObjectExpression;
	        this.properties = properties;
	    }
	    return ObjectExpression;
	}());
	exports.ObjectExpression = ObjectExpression;
	var ObjectPattern = (function () {
	    function ObjectPattern(properties) {
	        this.type = syntax_1.Syntax.ObjectPattern;
	        this.properties = properties;
	    }
	    return ObjectPattern;
	}());
	exports.ObjectPattern = ObjectPattern;
	var Property = (function () {
	    function Property(kind, key, computed, value, method, shorthand) {
	        this.type = syntax_1.Syntax.Property;
	        this.key = key;
	        this.computed = computed;
	        this.value = value;
	        this.kind = kind;
	        this.method = method;
	        this.shorthand = shorthand;
	    }
	    return Property;
	}());
	exports.Property = Property;
	var RegexLiteral = (function () {
	    function RegexLiteral(value, raw, pattern, flags) {
	        this.type = syntax_1.Syntax.Literal;
	        this.value = value;
	        this.raw = raw;
	        this.regex = { pattern: pattern, flags: flags };
	    }
	    return RegexLiteral;
	}());
	exports.RegexLiteral = RegexLiteral;
	var RestElement = (function () {
	    function RestElement(argument) {
	        this.type = syntax_1.Syntax.RestElement;
	        this.argument = argument;
	    }
	    return RestElement;
	}());
	exports.RestElement = RestElement;
	var ReturnStatement = (function () {
	    function ReturnStatement(argument) {
	        this.type = syntax_1.Syntax.ReturnStatement;
	        this.argument = argument;
	    }
	    return ReturnStatement;
	}());
	exports.ReturnStatement = ReturnStatement;
	var Script = (function () {
	    function Script(body) {
	        this.type = syntax_1.Syntax.Program;
	        this.body = body;
	        this.sourceType = 'script';
	    }
	    return Script;
	}());
	exports.Script = Script;
	var SequenceExpression = (function () {
	    function SequenceExpression(expressions) {
	        this.type = syntax_1.Syntax.SequenceExpression;
	        this.expressions = expressions;
	    }
	    return SequenceExpression;
	}());
	exports.SequenceExpression = SequenceExpression;
	var SpreadElement = (function () {
	    function SpreadElement(argument) {
	        this.type = syntax_1.Syntax.SpreadElement;
	        this.argument = argument;
	    }
	    return SpreadElement;
	}());
	exports.SpreadElement = SpreadElement;
	var StaticMemberExpression = (function () {
	    function StaticMemberExpression(object, property) {
	        this.type = syntax_1.Syntax.MemberExpression;
	        this.computed = false;
	        this.object = object;
	        this.property = property;
	    }
	    return StaticMemberExpression;
	}());
	exports.StaticMemberExpression = StaticMemberExpression;
	var Super = (function () {
	    function Super() {
	        this.type = syntax_1.Syntax.Super;
	    }
	    return Super;
	}());
	exports.Super = Super;
	var SwitchCase = (function () {
	    function SwitchCase(test, consequent) {
	        this.type = syntax_1.Syntax.SwitchCase;
	        this.test = test;
	        this.consequent = consequent;
	    }
	    return SwitchCase;
	}());
	exports.SwitchCase = SwitchCase;
	var SwitchStatement = (function () {
	    function SwitchStatement(discriminant, cases) {
	        this.type = syntax_1.Syntax.SwitchStatement;
	        this.discriminant = discriminant;
	        this.cases = cases;
	    }
	    return SwitchStatement;
	}());
	exports.SwitchStatement = SwitchStatement;
	var TaggedTemplateExpression = (function () {
	    function TaggedTemplateExpression(tag, quasi) {
	        this.type = syntax_1.Syntax.TaggedTemplateExpression;
	        this.tag = tag;
	        this.quasi = quasi;
	    }
	    return TaggedTemplateExpression;
	}());
	exports.TaggedTemplateExpression = TaggedTemplateExpression;
	var TemplateElement = (function () {
	    function TemplateElement(value, tail) {
	        this.type = syntax_1.Syntax.TemplateElement;
	        this.value = value;
	        this.tail = tail;
	    }
	    return TemplateElement;
	}());
	exports.TemplateElement = TemplateElement;
	var TemplateLiteral = (function () {
	    function TemplateLiteral(quasis, expressions) {
	        this.type = syntax_1.Syntax.TemplateLiteral;
	        this.quasis = quasis;
	        this.expressions = expressions;
	    }
	    return TemplateLiteral;
	}());
	exports.TemplateLiteral = TemplateLiteral;
	var ThisExpression = (function () {
	    function ThisExpression() {
	        this.type = syntax_1.Syntax.ThisExpression;
	    }
	    return ThisExpression;
	}());
	exports.ThisExpression = ThisExpression;
	var ThrowStatement = (function () {
	    function ThrowStatement(argument) {
	        this.type = syntax_1.Syntax.ThrowStatement;
	        this.argument = argument;
	    }
	    return ThrowStatement;
	}());
	exports.ThrowStatement = ThrowStatement;
	var TryStatement = (function () {
	    function TryStatement(block, handler, finalizer) {
	        this.type = syntax_1.Syntax.TryStatement;
	        this.block = block;
	        this.handler = handler;
	        this.finalizer = finalizer;
	    }
	    return TryStatement;
	}());
	exports.TryStatement = TryStatement;
	var UnaryExpression = (function () {
	    function UnaryExpression(operator, argument) {
	        this.type = syntax_1.Syntax.UnaryExpression;
	        this.operator = operator;
	        this.argument = argument;
	        this.prefix = true;
	    }
	    return UnaryExpression;
	}());
	exports.UnaryExpression = UnaryExpression;
	var UpdateExpression = (function () {
	    function UpdateExpression(operator, argument, prefix) {
	        this.type = syntax_1.Syntax.UpdateExpression;
	        this.operator = operator;
	        this.argument = argument;
	        this.prefix = prefix;
	    }
	    return UpdateExpression;
	}());
	exports.UpdateExpression = UpdateExpression;
	var VariableDeclaration = (function () {
	    function VariableDeclaration(declarations, kind) {
	        this.type = syntax_1.Syntax.VariableDeclaration;
	        this.declarations = declarations;
	        this.kind = kind;
	    }
	    return VariableDeclaration;
	}());
	exports.VariableDeclaration = VariableDeclaration;
	var VariableDeclarator = (function () {
	    function VariableDeclarator(id, init) {
	        this.type = syntax_1.Syntax.VariableDeclarator;
	        this.id = id;
	        this.init = init;
	    }
	    return VariableDeclarator;
	}());
	exports.VariableDeclarator = VariableDeclarator;
	var WhileStatement = (function () {
	    function WhileStatement(test, body) {
	        this.type = syntax_1.Syntax.WhileStatement;
	        this.test = test;
	        this.body = body;
	    }
	    return WhileStatement;
	}());
	exports.WhileStatement = WhileStatement;
	var WithStatement = (function () {
	    function WithStatement(object, body) {
	        this.type = syntax_1.Syntax.WithStatement;
	        this.object = object;
	        this.body = body;
	    }
	    return WithStatement;
	}());
	exports.WithStatement = WithStatement;
	var YieldExpression = (function () {
	    function YieldExpression(argument, delegate) {
	        this.type = syntax_1.Syntax.YieldExpression;
	        this.argument = argument;
	        this.delegate = delegate;
	    }
	    return YieldExpression;
	}());
	exports.YieldExpression = YieldExpression;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var assert_1 = __webpack_require__(9);
	var error_handler_1 = __webpack_require__(10);
	var messages_1 = __webpack_require__(11);
	var Node = __webpack_require__(7);
	var scanner_1 = __webpack_require__(12);
	var syntax_1 = __webpack_require__(2);
	var token_1 = __webpack_require__(13);
	var ArrowParameterPlaceHolder = 'ArrowParameterPlaceHolder';
	var Parser = (function () {
	    function Parser(code, options, delegate) {
	        if (options === void 0) { options = {}; }
	        this.config = {
	            range: (typeof options.range === 'boolean') && options.range,
	            loc: (typeof options.loc === 'boolean') && options.loc,
	            source: null,
	            tokens: (typeof options.tokens === 'boolean') && options.tokens,
	            comment: (typeof options.comment === 'boolean') && options.comment,
	            tolerant: (typeof options.tolerant === 'boolean') && options.tolerant
	        };
	        if (this.config.loc && options.source && options.source !== null) {
	            this.config.source = String(options.source);
	        }
	        this.delegate = delegate;
	        this.errorHandler = new error_handler_1.ErrorHandler();
	        this.errorHandler.tolerant = this.config.tolerant;
	        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
	        this.scanner.trackComment = this.config.comment;
	        this.operatorPrecedence = {
	            ')': 0,
	            ';': 0,
	            ',': 0,
	            '=': 0,
	            ']': 0,
	            '||': 1,
	            '&&': 2,
	            '|': 3,
	            '^': 4,
	            '&': 5,
	            '==': 6,
	            '!=': 6,
	            '===': 6,
	            '!==': 6,
	            '<': 7,
	            '>': 7,
	            '<=': 7,
	            '>=': 7,
	            '<<': 8,
	            '>>': 8,
	            '>>>': 8,
	            '+': 9,
	            '-': 9,
	            '*': 11,
	            '/': 11,
	            '%': 11
	        };
	        this.lookahead = {
	            type: 2 /* EOF */,
	            value: '',
	            lineNumber: this.scanner.lineNumber,
	            lineStart: 0,
	            start: 0,
	            end: 0
	        };
	        this.hasLineTerminator = false;
	        this.context = {
	            isModule: false,
	            await: false,
	            allowIn: true,
	            allowStrictDirective: true,
	            allowYield: true,
	            firstCoverInitializedNameError: null,
	            isAssignmentTarget: false,
	            isBindingElement: false,
	            inFunctionBody: false,
	            inIteration: false,
	            inSwitch: false,
	            labelSet: {},
	            strict: false
	        };
	        this.tokens = [];
	        this.startMarker = {
	            index: 0,
	            line: this.scanner.lineNumber,
	            column: 0
	        };
	        this.lastMarker = {
	            index: 0,
	            line: this.scanner.lineNumber,
	            column: 0
	        };
	        this.nextToken();
	        this.lastMarker = {
	            index: this.scanner.index,
	            line: this.scanner.lineNumber,
	            column: this.scanner.index - this.scanner.lineStart
	        };
	    }
	    Parser.prototype.throwError = function (messageFormat) {
	        var values = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            values[_i - 1] = arguments[_i];
	        }
	        var args = Array.prototype.slice.call(arguments, 1);
	        var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
	            assert_1.assert(idx < args.length, 'Message reference must be in range');
	            return args[idx];
	        });
	        var index = this.lastMarker.index;
	        var line = this.lastMarker.line;
	        var column = this.lastMarker.column + 1;
	        throw this.errorHandler.createError(index, line, column, msg);
	    };
	    Parser.prototype.tolerateError = function (messageFormat) {
	        var values = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            values[_i - 1] = arguments[_i];
	        }
	        var args = Array.prototype.slice.call(arguments, 1);
	        var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
	            assert_1.assert(idx < args.length, 'Message reference must be in range');
	            return args[idx];
	        });
	        var index = this.lastMarker.index;
	        var line = this.scanner.lineNumber;
	        var column = this.lastMarker.column + 1;
	        this.errorHandler.tolerateError(index, line, column, msg);
	    };
	    // Throw an exception because of the token.
	    Parser.prototype.unexpectedTokenError = function (token, message) {
	        var msg = message || messages_1.Messages.UnexpectedToken;
	        var value;
	        if (token) {
	            if (!message) {
	                msg = (token.type === 2 /* EOF */) ? messages_1.Messages.UnexpectedEOS :
	                    (token.type === 3 /* Identifier */) ? messages_1.Messages.UnexpectedIdentifier :
	                        (token.type === 6 /* NumericLiteral */) ? messages_1.Messages.UnexpectedNumber :
	                            (token.type === 8 /* StringLiteral */) ? messages_1.Messages.UnexpectedString :
	                                (token.type === 10 /* Template */) ? messages_1.Messages.UnexpectedTemplate :
	                                    messages_1.Messages.UnexpectedToken;
	                if (token.type === 4 /* Keyword */) {
	                    if (this.scanner.isFutureReservedWord(token.value)) {
	                        msg = messages_1.Messages.UnexpectedReserved;
	                    }
	                    else if (this.context.strict && this.scanner.isStrictModeReservedWord(token.value)) {
	                        msg = messages_1.Messages.StrictReservedWord;
	                    }
	                }
	            }
	            value = token.value;
	        }
	        else {
	            value = 'ILLEGAL';
	        }
	        msg = msg.replace('%0', value);
	        if (token && typeof token.lineNumber === 'number') {
	            var index = token.start;
	            var line = token.lineNumber;
	            var lastMarkerLineStart = this.lastMarker.index - this.lastMarker.column;
	            var column = token.start - lastMarkerLineStart + 1;
	            return this.errorHandler.createError(index, line, column, msg);
	        }
	        else {
	            var index = this.lastMarker.index;
	            var line = this.lastMarker.line;
	            var column = this.lastMarker.column + 1;
	            return this.errorHandler.createError(index, line, column, msg);
	        }
	    };
	    Parser.prototype.throwUnexpectedToken = function (token, message) {
	        throw this.unexpectedTokenError(token, message);
	    };
	    Parser.prototype.tolerateUnexpectedToken = function (token, message) {
	        this.errorHandler.tolerate(this.unexpectedTokenError(token, message));
	    };
	    Parser.prototype.collectComments = function () {
	        if (!this.config.comment) {
	            this.scanner.scanComments();
	        }
	        else {
	            var comments = this.scanner.scanComments();
	            if (comments.length > 0 && this.delegate) {
	                for (var i = 0; i < comments.length; ++i) {
	                    var e = comments[i];
	                    var node = void 0;
	                    node = {
	                        type: e.multiLine ? 'BlockComment' : 'LineComment',
	                        value: this.scanner.source.slice(e.slice[0], e.slice[1])
	                    };
	                    if (this.config.range) {
	                        node.range = e.range;
	                    }
	                    if (this.config.loc) {
	                        node.loc = e.loc;
	                    }
	                    var metadata = {
	                        start: {
	                            line: e.loc.start.line,
	                            column: e.loc.start.column,
	                            offset: e.range[0]
	                        },
	                        end: {
	                            line: e.loc.end.line,
	                            column: e.loc.end.column,
	                            offset: e.range[1]
	                        }
	                    };
	                    this.delegate(node, metadata);
	                }
	            }
	        }
	    };
	    // From internal representation to an external structure
	    Parser.prototype.getTokenRaw = function (token) {
	        return this.scanner.source.slice(token.start, token.end);
	    };
	    Parser.prototype.convertToken = function (token) {
	        var t = {
	            type: token_1.TokenName[token.type],
	            value: this.getTokenRaw(token)
	        };
	        if (this.config.range) {
	            t.range = [token.start, token.end];
	        }
	        if (this.config.loc) {
	            t.loc = {
	                start: {
	                    line: this.startMarker.line,
	                    column: this.startMarker.column
	                },
	                end: {
	                    line: this.scanner.lineNumber,
	                    column: this.scanner.index - this.scanner.lineStart
	                }
	            };
	        }
	        if (token.type === 9 /* RegularExpression */) {
	            var pattern = token.pattern;
	            var flags = token.flags;
	            t.regex = { pattern: pattern, flags: flags };
	        }
	        return t;
	    };
	    Parser.prototype.nextToken = function () {
	        var token = this.lookahead;
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.line = this.scanner.lineNumber;
	        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
	        this.collectComments();
	        if (this.scanner.index !== this.startMarker.index) {
	            this.startMarker.index = this.scanner.index;
	            this.startMarker.line = this.scanner.lineNumber;
	            this.startMarker.column = this.scanner.index - this.scanner.lineStart;
	        }
	        var next = this.scanner.lex();
	        this.hasLineTerminator = (token.lineNumber !== next.lineNumber);
	        if (next && this.context.strict && next.type === 3 /* Identifier */) {
	            if (this.scanner.isStrictModeReservedWord(next.value)) {
	                next.type = 4 /* Keyword */;
	            }
	        }
	        this.lookahead = next;
	        if (this.config.tokens && next.type !== 2 /* EOF */) {
	            this.tokens.push(this.convertToken(next));
	        }
	        return token;
	    };
	    Parser.prototype.nextRegexToken = function () {
	        this.collectComments();
	        var token = this.scanner.scanRegExp();
	        if (this.config.tokens) {
	            // Pop the previous token, '/' or '/='
	            // This is added from the lookahead token.
	            this.tokens.pop();
	            this.tokens.push(this.convertToken(token));
	        }
	        // Prime the next lookahead.
	        this.lookahead = token;
	        this.nextToken();
	        return token;
	    };
	    Parser.prototype.createNode = function () {
	        return {
	            index: this.startMarker.index,
	            line: this.startMarker.line,
	            column: this.startMarker.column
	        };
	    };
	    Parser.prototype.startNode = function (token, lastLineStart) {
	        if (lastLineStart === void 0) { lastLineStart = 0; }
	        var column = token.start - token.lineStart;
	        var line = token.lineNumber;
	        if (column < 0) {
	            column += lastLineStart;
	            line--;
	        }
	        return {
	            index: token.start,
	            line: line,
	            column: column
	        };
	    };
	    Parser.prototype.finalize = function (marker, node) {
	        if (this.config.range) {
	            node.range = [marker.index, this.lastMarker.index];
	        }
	        if (this.config.loc) {
	            node.loc = {
	                start: {
	                    line: marker.line,
	                    column: marker.column,
	                },
	                end: {
	                    line: this.lastMarker.line,
	                    column: this.lastMarker.column
	                }
	            };
	            if (this.config.source) {
	                node.loc.source = this.config.source;
	            }
	        }
	        if (this.delegate) {
	            var metadata = {
	                start: {
	                    line: marker.line,
	                    column: marker.column,
	                    offset: marker.index
	                },
	                end: {
	                    line: this.lastMarker.line,
	                    column: this.lastMarker.column,
	                    offset: this.lastMarker.index
	                }
	            };
	            this.delegate(node, metadata);
	        }
	        return node;
	    };
	    // Expect the next token to match the specified punctuator.
	    // If not, an exception will be thrown.
	    Parser.prototype.expect = function (value) {
	        var token = this.nextToken();
	        if (token.type !== 7 /* Punctuator */ || token.value !== value) {
	            this.throwUnexpectedToken(token);
	        }
	    };
	    // Quietly expect a comma when in tolerant mode, otherwise delegates to expect().
	    Parser.prototype.expectCommaSeparator = function () {
	        if (this.config.tolerant) {
	            var token = this.lookahead;
	            if (token.type === 7 /* Punctuator */ && token.value === ',') {
	                this.nextToken();
	            }
	            else if (token.type === 7 /* Punctuator */ && token.value === ';') {
	                this.nextToken();
	                this.tolerateUnexpectedToken(token);
	            }
	            else {
	                this.tolerateUnexpectedToken(token, messages_1.Messages.UnexpectedToken);
	            }
	        }
	        else {
	            this.expect(',');
	        }
	    };
	    // Expect the next token to match the specified keyword.
	    // If not, an exception will be thrown.
	    Parser.prototype.expectKeyword = function (keyword) {
	        var token = this.nextToken();
	        if (token.type !== 4 /* Keyword */ || token.value !== keyword) {
	            this.throwUnexpectedToken(token);
	        }
	    };
	    // Return true if the next token matches the specified punctuator.
	    Parser.prototype.match = function (value) {
	        return this.lookahead.type === 7 /* Punctuator */ && this.lookahead.value === value;
	    };
	    // Return true if the next token matches the specified keyword
	    Parser.prototype.matchKeyword = function (keyword) {
	        return this.lookahead.type === 4 /* Keyword */ && this.lookahead.value === keyword;
	    };
	    // Return true if the next token matches the specified contextual keyword
	    // (where an identifier is sometimes a keyword depending on the context)
	    Parser.prototype.matchContextualKeyword = function (keyword) {
	        return this.lookahead.type === 3 /* Identifier */ && this.lookahead.value === keyword;
	    };
	    // Return true if the next token is an assignment operator
	    Parser.prototype.matchAssign = function () {
	        if (this.lookahead.type !== 7 /* Punctuator */) {
	            return false;
	        }
	        var op = this.lookahead.value;
	        return op === '=' ||
	            op === '*=' ||
	            op === '**=' ||
	            op === '/=' ||
	            op === '%=' ||
	            op === '+=' ||
	            op === '-=' ||
	            op === '<<=' ||
	            op === '>>=' ||
	            op === '>>>=' ||
	            op === '&=' ||
	            op === '^=' ||
	            op === '|=';
	    };
	    // Cover grammar support.
	    //
	    // When an assignment expression position starts with an left parenthesis, the determination of the type
	    // of the syntax is to be deferred arbitrarily long until the end of the parentheses pair (plus a lookahead)
	    // or the first comma. This situation also defers the determination of all the expressions nested in the pair.
	    //
	    // There are three productions that can be parsed in a parentheses pair that needs to be determined
	    // after the outermost pair is closed. They are:
	    //
	    //   1. AssignmentExpression
	    //   2. BindingElements
	    //   3. AssignmentTargets
	    //
	    // In order to avoid exponential backtracking, we use two flags to denote if the production can be
	    // binding element or assignment target.
	    //
	    // The three productions have the relationship:
	    //
	    //   BindingElements ⊆ AssignmentTargets ⊆ AssignmentExpression
	    //
	    // with a single exception that CoverInitializedName when used directly in an Expression, generates
	    // an early error. Therefore, we need the third state, firstCoverInitializedNameError, to track the
	    // first usage of CoverInitializedName and report it when we reached the end of the parentheses pair.
	    //
	    // isolateCoverGrammar function runs the given parser function with a new cover grammar context, and it does not
	    // effect the current flags. This means the production the parser parses is only used as an expression. Therefore
	    // the CoverInitializedName check is conducted.
	    //
	    // inheritCoverGrammar function runs the given parse function with a new cover grammar context, and it propagates
	    // the flags outside of the parser. This means the production the parser parses is used as a part of a potential
	    // pattern. The CoverInitializedName check is deferred.
	    Parser.prototype.isolateCoverGrammar = function (parseFunction) {
	        var previousIsBindingElement = this.context.isBindingElement;
	        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
	        var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
	        this.context.isBindingElement = true;
	        this.context.isAssignmentTarget = true;
	        this.context.firstCoverInitializedNameError = null;
	        var result = parseFunction.call(this);
	        if (this.context.firstCoverInitializedNameError !== null) {
	            this.throwUnexpectedToken(this.context.firstCoverInitializedNameError);
	        }
	        this.context.isBindingElement = previousIsBindingElement;
	        this.context.isAssignmentTarget = previousIsAssignmentTarget;
	        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError;
	        return result;
	    };
	    Parser.prototype.inheritCoverGrammar = function (parseFunction) {
	        var previousIsBindingElement = this.context.isBindingElement;
	        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
	        var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
	        this.context.isBindingElement = true;
	        this.context.isAssignmentTarget = true;
	        this.context.firstCoverInitializedNameError = null;
	        var result = parseFunction.call(this);
	        this.context.isBindingElement = this.context.isBindingElement && previousIsBindingElement;
	        this.context.isAssignmentTarget = this.context.isAssignmentTarget && previousIsAssignmentTarget;
	        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError || this.context.firstCoverInitializedNameError;
	        return result;
	    };
	    Parser.prototype.consumeSemicolon = function () {
	        if (this.match(';')) {
	            this.nextToken();
	        }
	        else if (!this.hasLineTerminator) {
	            if (this.lookahead.type !== 2 /* EOF */ && !this.match('}')) {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	            this.lastMarker.index = this.startMarker.index;
	            this.lastMarker.line = this.startMarker.line;
	            this.lastMarker.column = this.startMarker.column;
	        }
	    };
	    // https://tc39.github.io/ecma262/#sec-primary-expression
	    Parser.prototype.parsePrimaryExpression = function () {
	        var node = this.createNode();
	        var expr;
	        var token, raw;
	        switch (this.lookahead.type) {
	            case 3 /* Identifier */:
	                if ((this.context.isModule || this.context.await) && this.lookahead.value === 'await') {
	                    this.tolerateUnexpectedToken(this.lookahead);
	                }
	                expr = this.matchAsyncFunction() ? this.parseFunctionExpression() : this.finalize(node, new Node.Identifier(this.nextToken().value));
	                break;
	            case 6 /* NumericLiteral */:
	            case 8 /* StringLiteral */:
	                if (this.context.strict && this.lookahead.octal) {
	                    this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.StrictOctalLiteral);
	                }
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                token = this.nextToken();
	                raw = this.getTokenRaw(token);
	                expr = this.finalize(node, new Node.Literal(token.value, raw));
	                break;
	            case 1 /* BooleanLiteral */:
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                token = this.nextToken();
	                raw = this.getTokenRaw(token);
	                expr = this.finalize(node, new Node.Literal(token.value === 'true', raw));
	                break;
	            case 5 /* NullLiteral */:
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                token = this.nextToken();
	                raw = this.getTokenRaw(token);
	                expr = this.finalize(node, new Node.Literal(null, raw));
	                break;
	            case 10 /* Template */:
	                expr = this.parseTemplateLiteral();
	                break;
	            case 7 /* Punctuator */:
	                switch (this.lookahead.value) {
	                    case '(':
	                        this.context.isBindingElement = false;
	                        expr = this.inheritCoverGrammar(this.parseGroupExpression);
	                        break;
	                    case '[':
	                        expr = this.inheritCoverGrammar(this.parseArrayInitializer);
	                        break;
	                    case '{':
	                        expr = this.inheritCoverGrammar(this.parseObjectInitializer);
	                        break;
	                    case '/':
	                    case '/=':
	                        this.context.isAssignmentTarget = false;
	                        this.context.isBindingElement = false;
	                        this.scanner.index = this.startMarker.index;
	                        token = this.nextRegexToken();
	                        raw = this.getTokenRaw(token);
	                        expr = this.finalize(node, new Node.RegexLiteral(token.regex, raw, token.pattern, token.flags));
	                        break;
	                    default:
	                        expr = this.throwUnexpectedToken(this.nextToken());
	                }
	                break;
	            case 4 /* Keyword */:
	                if (!this.context.strict && this.context.allowYield && this.matchKeyword('yield')) {
	                    expr = this.parseIdentifierName();
	                }
	                else if (!this.context.strict && this.matchKeyword('let')) {
	                    expr = this.finalize(node, new Node.Identifier(this.nextToken().value));
	                }
	                else {
	                    this.context.isAssignmentTarget = false;
	                    this.context.isBindingElement = false;
	                    if (this.matchKeyword('function')) {
	                        expr = this.parseFunctionExpression();
	                    }
	                    else if (this.matchKeyword('this')) {
	                        this.nextToken();
	                        expr = this.finalize(node, new Node.ThisExpression());
	                    }
	                    else if (this.matchKeyword('class')) {
	                        expr = this.parseClassExpression();
	                    }
	                    else {
	                        expr = this.throwUnexpectedToken(this.nextToken());
	                    }
	                }
	                break;
	            default:
	                expr = this.throwUnexpectedToken(this.nextToken());
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-array-initializer
	    Parser.prototype.parseSpreadElement = function () {
	        var node = this.createNode();
	        this.expect('...');
	        var arg = this.inheritCoverGrammar(this.parseAssignmentExpression);
	        return this.finalize(node, new Node.SpreadElement(arg));
	    };
	    Parser.prototype.parseArrayInitializer = function () {
	        var node = this.createNode();
	        var elements = [];
	        this.expect('[');
	        while (!this.match(']')) {
	            if (this.match(',')) {
	                this.nextToken();
	                elements.push(null);
	            }
	            else if (this.match('...')) {
	                var element = this.parseSpreadElement();
	                if (!this.match(']')) {
	                    this.context.isAssignmentTarget = false;
	                    this.context.isBindingElement = false;
	                    this.expect(',');
	                }
	                elements.push(element);
	            }
	            else {
	                elements.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
	                if (!this.match(']')) {
	                    this.expect(',');
	                }
	            }
	        }
	        this.expect(']');
	        return this.finalize(node, new Node.ArrayExpression(elements));
	    };
	    // https://tc39.github.io/ecma262/#sec-object-initializer
	    Parser.prototype.parsePropertyMethod = function (params) {
	        this.context.isAssignmentTarget = false;
	        this.context.isBindingElement = false;
	        var previousStrict = this.context.strict;
	        var previousAllowStrictDirective = this.context.allowStrictDirective;
	        this.context.allowStrictDirective = params.simple;
	        var body = this.isolateCoverGrammar(this.parseFunctionSourceElements);
	        if (this.context.strict && params.firstRestricted) {
	            this.tolerateUnexpectedToken(params.firstRestricted, params.message);
	        }
	        if (this.context.strict && params.stricted) {
	            this.tolerateUnexpectedToken(params.stricted, params.message);
	        }
	        this.context.strict = previousStrict;
	        this.context.allowStrictDirective = previousAllowStrictDirective;
	        return body;
	    };
	    Parser.prototype.parsePropertyMethodFunction = function () {
	        var isGenerator = false;
	        var node = this.createNode();
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = true;
	        var params = this.parseFormalParameters();
	        var method = this.parsePropertyMethod(params);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
	    };
	    Parser.prototype.parsePropertyMethodAsyncFunction = function () {
	        var node = this.createNode();
	        var previousAllowYield = this.context.allowYield;
	        var previousAwait = this.context.await;
	        this.context.allowYield = false;
	        this.context.await = true;
	        var params = this.parseFormalParameters();
	        var method = this.parsePropertyMethod(params);
	        this.context.allowYield = previousAllowYield;
	        this.context.await = previousAwait;
	        return this.finalize(node, new Node.AsyncFunctionExpression(null, params.params, method));
	    };
	    Parser.prototype.parseObjectPropertyKey = function () {
	        var node = this.createNode();
	        var token = this.nextToken();
	        var key;
	        switch (token.type) {
	            case 8 /* StringLiteral */:
	            case 6 /* NumericLiteral */:
	                if (this.context.strict && token.octal) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictOctalLiteral);
	                }
	                var raw = this.getTokenRaw(token);
	                key = this.finalize(node, new Node.Literal(token.value, raw));
	                break;
	            case 3 /* Identifier */:
	            case 1 /* BooleanLiteral */:
	            case 5 /* NullLiteral */:
	            case 4 /* Keyword */:
	                key = this.finalize(node, new Node.Identifier(token.value));
	                break;
	            case 7 /* Punctuator */:
	                if (token.value === '[') {
	                    key = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    this.expect(']');
	                }
	                else {
	                    key = this.throwUnexpectedToken(token);
	                }
	                break;
	            default:
	                key = this.throwUnexpectedToken(token);
	        }
	        return key;
	    };
	    Parser.prototype.isPropertyKey = function (key, value) {
	        return (key.type === syntax_1.Syntax.Identifier && key.name === value) ||
	            (key.type === syntax_1.Syntax.Literal && key.value === value);
	    };
	    Parser.prototype.parseObjectProperty = function (hasProto) {
	        var node = this.createNode();
	        var token = this.lookahead;
	        var kind;
	        var key = null;
	        var value = null;
	        var computed = false;
	        var method = false;
	        var shorthand = false;
	        var isAsync = false;
	        if (token.type === 3 /* Identifier */) {
	            var id = token.value;
	            this.nextToken();
	            computed = this.match('[');
	            isAsync = !this.hasLineTerminator && (id === 'async') &&
	                !this.match(':') && !this.match('(') && !this.match('*') && !this.match(',');
	            key = isAsync ? this.parseObjectPropertyKey() : this.finalize(node, new Node.Identifier(id));
	        }
	        else if (this.match('*')) {
	            this.nextToken();
	        }
	        else {
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	        }
	        var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
	        if (token.type === 3 /* Identifier */ && !isAsync && token.value === 'get' && lookaheadPropertyKey) {
	            kind = 'get';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            this.context.allowYield = false;
	            value = this.parseGetterMethod();
	        }
	        else if (token.type === 3 /* Identifier */ && !isAsync && token.value === 'set' && lookaheadPropertyKey) {
	            kind = 'set';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            value = this.parseSetterMethod();
	        }
	        else if (token.type === 7 /* Punctuator */ && token.value === '*' && lookaheadPropertyKey) {
	            kind = 'init';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            value = this.parseGeneratorMethod();
	            method = true;
	        }
	        else {
	            if (!key) {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	            kind = 'init';
	            if (this.match(':') && !isAsync) {
	                if (!computed && this.isPropertyKey(key, '__proto__')) {
	                    if (hasProto.value) {
	                        this.tolerateError(messages_1.Messages.DuplicateProtoProperty);
	                    }
	                    hasProto.value = true;
	                }
	                this.nextToken();
	                value = this.inheritCoverGrammar(this.parseAssignmentExpression);
	            }
	            else if (this.match('(')) {
	                value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
	                method = true;
	            }
	            else if (token.type === 3 /* Identifier */) {
	                var id = this.finalize(node, new Node.Identifier(token.value));
	                if (this.match('=')) {
	                    this.context.firstCoverInitializedNameError = this.lookahead;
	                    this.nextToken();
	                    shorthand = true;
	                    var init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    value = this.finalize(node, new Node.AssignmentPattern(id, init));
	                }
	                else {
	                    shorthand = true;
	                    value = id;
	                }
	            }
	            else {
	                this.throwUnexpectedToken(this.nextToken());
	            }
	        }
	        return this.finalize(node, new Node.Property(kind, key, computed, value, method, shorthand));
	    };
	    Parser.prototype.parseObjectInitializer = function () {
	        var node = this.createNode();
	        this.expect('{');
	        var properties = [];
	        var hasProto = { value: false };
	        while (!this.match('}')) {
	            properties.push(this.parseObjectProperty(hasProto));
	            if (!this.match('}')) {
	                this.expectCommaSeparator();
	            }
	        }
	        this.expect('}');
	        return this.finalize(node, new Node.ObjectExpression(properties));
	    };
	    // https://tc39.github.io/ecma262/#sec-template-literals
	    Parser.prototype.parseTemplateHead = function () {
	        assert_1.assert(this.lookahead.head, 'Template literal must start with a template head');
	        var node = this.createNode();
	        var token = this.nextToken();
	        var raw = token.value;
	        var cooked = token.cooked;
	        return this.finalize(node, new Node.TemplateElement({ raw: raw, cooked: cooked }, token.tail));
	    };
	    Parser.prototype.parseTemplateElement = function () {
	        if (this.lookahead.type !== 10 /* Template */) {
	            this.throwUnexpectedToken();
	        }
	        var node = this.createNode();
	        var token = this.nextToken();
	        var raw = token.value;
	        var cooked = token.cooked;
	        return this.finalize(node, new Node.TemplateElement({ raw: raw, cooked: cooked }, token.tail));
	    };
	    Parser.prototype.parseTemplateLiteral = function () {
	        var node = this.createNode();
	        var expressions = [];
	        var quasis = [];
	        var quasi = this.parseTemplateHead();
	        quasis.push(quasi);
	        while (!quasi.tail) {
	            expressions.push(this.parseExpression());
	            quasi = this.parseTemplateElement();
	            quasis.push(quasi);
	        }
	        return this.finalize(node, new Node.TemplateLiteral(quasis, expressions));
	    };
	    // https://tc39.github.io/ecma262/#sec-grouping-operator
	    Parser.prototype.reinterpretExpressionAsPattern = function (expr) {
	        switch (expr.type) {
	            case syntax_1.Syntax.Identifier:
	            case syntax_1.Syntax.MemberExpression:
	            case syntax_1.Syntax.RestElement:
	            case syntax_1.Syntax.AssignmentPattern:
	                break;
	            case syntax_1.Syntax.SpreadElement:
	                expr.type = syntax_1.Syntax.RestElement;
	                this.reinterpretExpressionAsPattern(expr.argument);
	                break;
	            case syntax_1.Syntax.ArrayExpression:
	                expr.type = syntax_1.Syntax.ArrayPattern;
	                for (var i = 0; i < expr.elements.length; i++) {
	                    if (expr.elements[i] !== null) {
	                        this.reinterpretExpressionAsPattern(expr.elements[i]);
	                    }
	                }
	                break;
	            case syntax_1.Syntax.ObjectExpression:
	                expr.type = syntax_1.Syntax.ObjectPattern;
	                for (var i = 0; i < expr.properties.length; i++) {
	                    this.reinterpretExpressionAsPattern(expr.properties[i].value);
	                }
	                break;
	            case syntax_1.Syntax.AssignmentExpression:
	                expr.type = syntax_1.Syntax.AssignmentPattern;
	                delete expr.operator;
	                this.reinterpretExpressionAsPattern(expr.left);
	                break;
	            default:
	                // Allow other node type for tolerant parsing.
	                break;
	        }
	    };
	    Parser.prototype.parseGroupExpression = function () {
	        var expr;
	        this.expect('(');
	        if (this.match(')')) {
	            this.nextToken();
	            if (!this.match('=>')) {
	                this.expect('=>');
	            }
	            expr = {
	                type: ArrowParameterPlaceHolder,
	                params: [],
	                async: false
	            };
	        }
	        else {
	            var startToken = this.lookahead;
	            var params = [];
	            if (this.match('...')) {
	                expr = this.parseRestElement(params);
	                this.expect(')');
	                if (!this.match('=>')) {
	                    this.expect('=>');
	                }
	                expr = {
	                    type: ArrowParameterPlaceHolder,
	                    params: [expr],
	                    async: false
	                };
	            }
	            else {
	                var arrow = false;
	                this.context.isBindingElement = true;
	                expr = this.inheritCoverGrammar(this.parseAssignmentExpression);
	                if (this.match(',')) {
	                    var expressions = [];
	                    this.context.isAssignmentTarget = false;
	                    expressions.push(expr);
	                    while (this.lookahead.type !== 2 /* EOF */) {
	                        if (!this.match(',')) {
	                            break;
	                        }
	                        this.nextToken();
	                        if (this.match(')')) {
	                            this.nextToken();
	                            for (var i = 0; i < expressions.length; i++) {
	                                this.reinterpretExpressionAsPattern(expressions[i]);
	                            }
	                            arrow = true;
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: expressions,
	                                async: false
	                            };
	                        }
	                        else if (this.match('...')) {
	                            if (!this.context.isBindingElement) {
	                                this.throwUnexpectedToken(this.lookahead);
	                            }
	                            expressions.push(this.parseRestElement(params));
	                            this.expect(')');
	                            if (!this.match('=>')) {
	                                this.expect('=>');
	                            }
	                            this.context.isBindingElement = false;
	                            for (var i = 0; i < expressions.length; i++) {
	                                this.reinterpretExpressionAsPattern(expressions[i]);
	                            }
	                            arrow = true;
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: expressions,
	                                async: false
	                            };
	                        }
	                        else {
	                            expressions.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
	                        }
	                        if (arrow) {
	                            break;
	                        }
	                    }
	                    if (!arrow) {
	                        expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
	                    }
	                }
	                if (!arrow) {
	                    this.expect(')');
	                    if (this.match('=>')) {
	                        if (expr.type === syntax_1.Syntax.Identifier && expr.name === 'yield') {
	                            arrow = true;
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: [expr],
	                                async: false
	                            };
	                        }
	                        if (!arrow) {
	                            if (!this.context.isBindingElement) {
	                                this.throwUnexpectedToken(this.lookahead);
	                            }
	                            if (expr.type === syntax_1.Syntax.SequenceExpression) {
	                                for (var i = 0; i < expr.expressions.length; i++) {
	                                    this.reinterpretExpressionAsPattern(expr.expressions[i]);
	                                }
	                            }
	                            else {
	                                this.reinterpretExpressionAsPattern(expr);
	                            }
	                            var parameters = (expr.type === syntax_1.Syntax.SequenceExpression ? expr.expressions : [expr]);
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: parameters,
	                                async: false
	                            };
	                        }
	                    }
	                    this.context.isBindingElement = false;
	                }
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-left-hand-side-expressions
	    Parser.prototype.parseArguments = function () {
	        this.expect('(');
	        var args = [];
	        if (!this.match(')')) {
	            while (true) {
	                var expr = this.match('...') ? this.parseSpreadElement() :
	                    this.isolateCoverGrammar(this.parseAssignmentExpression);
	                args.push(expr);
	                if (this.match(')')) {
	                    break;
	                }
	                this.expectCommaSeparator();
	                if (this.match(')')) {
	                    break;
	                }
	            }
	        }
	        this.expect(')');
	        return args;
	    };
	    Parser.prototype.isIdentifierName = function (token) {
	        return token.type === 3 /* Identifier */ ||
	            token.type === 4 /* Keyword */ ||
	            token.type === 1 /* BooleanLiteral */ ||
	            token.type === 5 /* NullLiteral */;
	    };
	    Parser.prototype.parseIdentifierName = function () {
	        var node = this.createNode();
	        var token = this.nextToken();
	        if (!this.isIdentifierName(token)) {
	            this.throwUnexpectedToken(token);
	        }
	        return this.finalize(node, new Node.Identifier(token.value));
	    };
	    Parser.prototype.parseNewExpression = function () {
	        var node = this.createNode();
	        var id = this.parseIdentifierName();
	        assert_1.assert(id.name === 'new', 'New expression must start with `new`');
	        var expr;
	        if (this.match('.')) {
	            this.nextToken();
	            if (this.lookahead.type === 3 /* Identifier */ && this.context.inFunctionBody && this.lookahead.value === 'target') {
	                var property = this.parseIdentifierName();
	                expr = new Node.MetaProperty(id, property);
	            }
	            else {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	        }
	        else {
	            var callee = this.isolateCoverGrammar(this.parseLeftHandSideExpression);
	            var args = this.match('(') ? this.parseArguments() : [];
	            expr = new Node.NewExpression(callee, args);
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        return this.finalize(node, expr);
	    };
	    Parser.prototype.parseAsyncArgument = function () {
	        var arg = this.parseAssignmentExpression();
	        this.context.firstCoverInitializedNameError = null;
	        return arg;
	    };
	    Parser.prototype.parseAsyncArguments = function () {
	        this.expect('(');
	        var args = [];
	        if (!this.match(')')) {
	            while (true) {
	                var expr = this.match('...') ? this.parseSpreadElement() :
	                    this.isolateCoverGrammar(this.parseAsyncArgument);
	                args.push(expr);
	                if (this.match(')')) {
	                    break;
	                }
	                this.expectCommaSeparator();
	                if (this.match(')')) {
	                    break;
	                }
	            }
	        }
	        this.expect(')');
	        return args;
	    };
	    Parser.prototype.parseLeftHandSideExpressionAllowCall = function () {
	        var startToken = this.lookahead;
	        var maybeAsync = this.matchContextualKeyword('async');
	        var previousAllowIn = this.context.allowIn;
	        this.context.allowIn = true;
	        var expr;
	        if (this.matchKeyword('super') && this.context.inFunctionBody) {
	            expr = this.createNode();
	            this.nextToken();
	            expr = this.finalize(expr, new Node.Super());
	            if (!this.match('(') && !this.match('.') && !this.match('[')) {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	        }
	        else {
	            expr = this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
	        }
	        while (true) {
	            if (this.match('.')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('.');
	                var property = this.parseIdentifierName();
	                expr = this.finalize(this.startNode(startToken), new Node.StaticMemberExpression(expr, property));
	            }
	            else if (this.match('(')) {
	                var asyncArrow = maybeAsync && (startToken.lineNumber === this.lookahead.lineNumber);
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = false;
	                var args = asyncArrow ? this.parseAsyncArguments() : this.parseArguments();
	                expr = this.finalize(this.startNode(startToken), new Node.CallExpression(expr, args));
	                if (asyncArrow && this.match('=>')) {
	                    for (var i = 0; i < args.length; ++i) {
	                        this.reinterpretExpressionAsPattern(args[i]);
	                    }
	                    expr = {
	                        type: ArrowParameterPlaceHolder,
	                        params: args,
	                        async: true
	                    };
	                }
	            }
	            else if (this.match('[')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('[');
	                var property = this.isolateCoverGrammar(this.parseExpression);
	                this.expect(']');
	                expr = this.finalize(this.startNode(startToken), new Node.ComputedMemberExpression(expr, property));
	            }
	            else if (this.lookahead.type === 10 /* Template */ && this.lookahead.head) {
	                var quasi = this.parseTemplateLiteral();
	                expr = this.finalize(this.startNode(startToken), new Node.TaggedTemplateExpression(expr, quasi));
	            }
	            else {
	                break;
	            }
	        }
	        this.context.allowIn = previousAllowIn;
	        return expr;
	    };
	    Parser.prototype.parseSuper = function () {
	        var node = this.createNode();
	        this.expectKeyword('super');
	        if (!this.match('[') && !this.match('.')) {
	            this.throwUnexpectedToken(this.lookahead);
	        }
	        return this.finalize(node, new Node.Super());
	    };
	    Parser.prototype.parseLeftHandSideExpression = function () {
	        assert_1.assert(this.context.allowIn, 'callee of new expression always allow in keyword.');
	        var node = this.startNode(this.lookahead);
	        var expr = (this.matchKeyword('super') && this.context.inFunctionBody) ? this.parseSuper() :
	            this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
	        while (true) {
	            if (this.match('[')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('[');
	                var property = this.isolateCoverGrammar(this.parseExpression);
	                this.expect(']');
	                expr = this.finalize(node, new Node.ComputedMemberExpression(expr, property));
	            }
	            else if (this.match('.')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('.');
	                var property = this.parseIdentifierName();
	                expr = this.finalize(node, new Node.StaticMemberExpression(expr, property));
	            }
	            else if (this.lookahead.type === 10 /* Template */ && this.lookahead.head) {
	                var quasi = this.parseTemplateLiteral();
	                expr = this.finalize(node, new Node.TaggedTemplateExpression(expr, quasi));
	            }
	            else {
	                break;
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-update-expressions
	    Parser.prototype.parseUpdateExpression = function () {
	        var expr;
	        var startToken = this.lookahead;
	        if (this.match('++') || this.match('--')) {
	            var node = this.startNode(startToken);
	            var token = this.nextToken();
	            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
	            if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
	                this.tolerateError(messages_1.Messages.StrictLHSPrefix);
	            }
	            if (!this.context.isAssignmentTarget) {
	                this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
	            }
	            var prefix = true;
	            expr = this.finalize(node, new Node.UpdateExpression(token.value, expr, prefix));
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        else {
	            expr = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
	            if (!this.hasLineTerminator && this.lookahead.type === 7 /* Punctuator */) {
	                if (this.match('++') || this.match('--')) {
	                    if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
	                        this.tolerateError(messages_1.Messages.StrictLHSPostfix);
	                    }
	                    if (!this.context.isAssignmentTarget) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
	                    }
	                    this.context.isAssignmentTarget = false;
	                    this.context.isBindingElement = false;
	                    var operator = this.nextToken().value;
	                    var prefix = false;
	                    expr = this.finalize(this.startNode(startToken), new Node.UpdateExpression(operator, expr, prefix));
	                }
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-unary-operators
	    Parser.prototype.parseAwaitExpression = function () {
	        var node = this.createNode();
	        this.nextToken();
	        var argument = this.parseUnaryExpression();
	        return this.finalize(node, new Node.AwaitExpression(argument));
	    };
	    Parser.prototype.parseUnaryExpression = function () {
	        var expr;
	        if (this.match('+') || this.match('-') || this.match('~') || this.match('!') ||
	            this.matchKeyword('delete') || this.matchKeyword('void') || this.matchKeyword('typeof')) {
	            var node = this.startNode(this.lookahead);
	            var token = this.nextToken();
	            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
	            expr = this.finalize(node, new Node.UnaryExpression(token.value, expr));
	            if (this.context.strict && expr.operator === 'delete' && expr.argument.type === syntax_1.Syntax.Identifier) {
	                this.tolerateError(messages_1.Messages.StrictDelete);
	            }
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        else if (this.context.await && this.matchContextualKeyword('await')) {
	            expr = this.parseAwaitExpression();
	        }
	        else {
	            expr = this.parseUpdateExpression();
	        }
	        return expr;
	    };
	    Parser.prototype.parseExponentiationExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.inheritCoverGrammar(this.parseUnaryExpression);
	        if (expr.type !== syntax_1.Syntax.UnaryExpression && this.match('**')) {
	            this.nextToken();
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	            var left = expr;
	            var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
	            expr = this.finalize(this.startNode(startToken), new Node.BinaryExpression('**', left, right));
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-exp-operator
	    // https://tc39.github.io/ecma262/#sec-multiplicative-operators
	    // https://tc39.github.io/ecma262/#sec-additive-operators
	    // https://tc39.github.io/ecma262/#sec-bitwise-shift-operators
	    // https://tc39.github.io/ecma262/#sec-relational-operators
	    // https://tc39.github.io/ecma262/#sec-equality-operators
	    // https://tc39.github.io/ecma262/#sec-binary-bitwise-operators
	    // https://tc39.github.io/ecma262/#sec-binary-logical-operators
	    Parser.prototype.binaryPrecedence = function (token) {
	        var op = token.value;
	        var precedence;
	        if (token.type === 7 /* Punctuator */) {
	            precedence = this.operatorPrecedence[op] || 0;
	        }
	        else if (token.type === 4 /* Keyword */) {
	            precedence = (op === 'instanceof' || (this.context.allowIn && op === 'in')) ? 7 : 0;
	        }
	        else {
	            precedence = 0;
	        }
	        return precedence;
	    };
	    Parser.prototype.parseBinaryExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.inheritCoverGrammar(this.parseExponentiationExpression);
	        var token = this.lookahead;
	        var prec = this.binaryPrecedence(token);
	        if (prec > 0) {
	            this.nextToken();
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	            var markers = [startToken, this.lookahead];
	            var left = expr;
	            var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
	            var stack = [left, token.value, right];
	            var precedences = [prec];
	            while (true) {
	                prec = this.binaryPrecedence(this.lookahead);
	                if (prec <= 0) {
	                    break;
	                }
	                // Reduce: make a binary expression from the three topmost entries.
	                while ((stack.length > 2) && (prec <= precedences[precedences.length - 1])) {
	                    right = stack.pop();
	                    var operator = stack.pop();
	                    precedences.pop();
	                    left = stack.pop();
	                    markers.pop();
	                    var node = this.startNode(markers[markers.length - 1]);
	                    stack.push(this.finalize(node, new Node.BinaryExpression(operator, left, right)));
	                }
	                // Shift.
	                stack.push(this.nextToken().value);
	                precedences.push(prec);
	                markers.push(this.lookahead);
	                stack.push(this.isolateCoverGrammar(this.parseExponentiationExpression));
	            }
	            // Final reduce to clean-up the stack.
	            var i = stack.length - 1;
	            expr = stack[i];
	            var lastMarker = markers.pop();
	            while (i > 1) {
	                var marker = markers.pop();
	                var lastLineStart = lastMarker && lastMarker.lineStart;
	                var node = this.startNode(marker, lastLineStart);
	                var operator = stack[i - 1];
	                expr = this.finalize(node, new Node.BinaryExpression(operator, stack[i - 2], expr));
	                i -= 2;
	                lastMarker = marker;
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-conditional-operator
	    Parser.prototype.parseConditionalExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.inheritCoverGrammar(this.parseBinaryExpression);
	        if (this.match('?')) {
	            this.nextToken();
	            var previousAllowIn = this.context.allowIn;
	            this.context.allowIn = true;
	            var consequent = this.isolateCoverGrammar(this.parseAssignmentExpression);
	            this.context.allowIn = previousAllowIn;
	            this.expect(':');
	            var alternate = this.isolateCoverGrammar(this.parseAssignmentExpression);
	            expr = this.finalize(this.startNode(startToken), new Node.ConditionalExpression(expr, consequent, alternate));
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-assignment-operators
	    Parser.prototype.checkPatternParam = function (options, param) {
	        switch (param.type) {
	            case syntax_1.Syntax.Identifier:
	                this.validateParam(options, param, param.name);
	                break;
	            case syntax_1.Syntax.RestElement:
	                this.checkPatternParam(options, param.argument);
	                break;
	            case syntax_1.Syntax.AssignmentPattern:
	                this.checkPatternParam(options, param.left);
	                break;
	            case syntax_1.Syntax.ArrayPattern:
	                for (var i = 0; i < param.elements.length; i++) {
	                    if (param.elements[i] !== null) {
	                        this.checkPatternParam(options, param.elements[i]);
	                    }
	                }
	                break;
	            case syntax_1.Syntax.ObjectPattern:
	                for (var i = 0; i < param.properties.length; i++) {
	                    this.checkPatternParam(options, param.properties[i].value);
	                }
	                break;
	            default:
	                break;
	        }
	        options.simple = options.simple && (param instanceof Node.Identifier);
	    };
	    Parser.prototype.reinterpretAsCoverFormalsList = function (expr) {
	        var params = [expr];
	        var options;
	        var asyncArrow = false;
	        switch (expr.type) {
	            case syntax_1.Syntax.Identifier:
	                break;
	            case ArrowParameterPlaceHolder:
	                params = expr.params;
	                asyncArrow = expr.async;
	                break;
	            default:
	                return null;
	        }
	        options = {
	            simple: true,
	            paramSet: {}
	        };
	        for (var i = 0; i < params.length; ++i) {
	            var param = params[i];
	            if (param.type === syntax_1.Syntax.AssignmentPattern) {
	                if (param.right.type === syntax_1.Syntax.YieldExpression) {
	                    if (param.right.argument) {
	                        this.throwUnexpectedToken(this.lookahead);
	                    }
	                    param.right.type = syntax_1.Syntax.Identifier;
	                    param.right.name = 'yield';
	                    delete param.right.argument;
	                    delete param.right.delegate;
	                }
	            }
	            else if (asyncArrow && param.type === syntax_1.Syntax.Identifier && param.name === 'await') {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	            this.checkPatternParam(options, param);
	            params[i] = param;
	        }
	        if (this.context.strict || !this.context.allowYield) {
	            for (var i = 0; i < params.length; ++i) {
	                var param = params[i];
	                if (param.type === syntax_1.Syntax.YieldExpression) {
	                    this.throwUnexpectedToken(this.lookahead);
	                }
	            }
	        }
	        if (options.message === messages_1.Messages.StrictParamDupe) {
	            var token = this.context.strict ? options.stricted : options.firstRestricted;
	            this.throwUnexpectedToken(token, options.message);
	        }
	        return {
	            simple: options.simple,
	            params: params,
	            stricted: options.stricted,
	            firstRestricted: options.firstRestricted,
	            message: options.message
	        };
	    };
	    Parser.prototype.parseAssignmentExpression = function () {
	        var expr;
	        if (!this.context.allowYield && this.matchKeyword('yield')) {
	            expr = this.parseYieldExpression();
	        }
	        else {
	            var startToken = this.lookahead;
	            var token = startToken;
	            expr = this.parseConditionalExpression();
	            if (token.type === 3 /* Identifier */ && (token.lineNumber === this.lookahead.lineNumber) && token.value === 'async') {
	                if (this.lookahead.type === 3 /* Identifier */ || this.matchKeyword('yield')) {
	                    var arg = this.parsePrimaryExpression();
	                    this.reinterpretExpressionAsPattern(arg);
	                    expr = {
	                        type: ArrowParameterPlaceHolder,
	                        params: [arg],
	                        async: true
	                    };
	                }
	            }
	            if (expr.type === ArrowParameterPlaceHolder || this.match('=>')) {
	                // https://tc39.github.io/ecma262/#sec-arrow-function-definitions
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                var isAsync = expr.async;
	                var list = this.reinterpretAsCoverFormalsList(expr);
	                if (list) {
	                    if (this.hasLineTerminator) {
	                        this.tolerateUnexpectedToken(this.lookahead);
	                    }
	                    this.context.firstCoverInitializedNameError = null;
	                    var previousStrict = this.context.strict;
	                    var previousAllowStrictDirective = this.context.allowStrictDirective;
	                    this.context.allowStrictDirective = list.simple;
	                    var previousAllowYield = this.context.allowYield;
	                    var previousAwait = this.context.await;
	                    this.context.allowYield = true;
	                    this.context.await = isAsync;
	                    var node = this.startNode(startToken);
	                    this.expect('=>');
	                    var body = void 0;
	                    if (this.match('{')) {
	                        var previousAllowIn = this.context.allowIn;
	                        this.context.allowIn = true;
	                        body = this.parseFunctionSourceElements();
	                        this.context.allowIn = previousAllowIn;
	                    }
	                    else {
	                        body = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    }
	                    var expression = body.type !== syntax_1.Syntax.BlockStatement;
	                    if (this.context.strict && list.firstRestricted) {
	                        this.throwUnexpectedToken(list.firstRestricted, list.message);
	                    }
	                    if (this.context.strict && list.stricted) {
	                        this.tolerateUnexpectedToken(list.stricted, list.message);
	                    }
	                    expr = isAsync ? this.finalize(node, new Node.AsyncArrowFunctionExpression(list.params, body, expression)) :
	                        this.finalize(node, new Node.ArrowFunctionExpression(list.params, body, expression));
	                    this.context.strict = previousStrict;
	                    this.context.allowStrictDirective = previousAllowStrictDirective;
	                    this.context.allowYield = previousAllowYield;
	                    this.context.await = previousAwait;
	                }
	            }
	            else {
	                if (this.matchAssign()) {
	                    if (!this.context.isAssignmentTarget) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
	                    }
	                    if (this.context.strict && expr.type === syntax_1.Syntax.Identifier) {
	                        var id = expr;
	                        if (this.scanner.isRestrictedWord(id.name)) {
	                            this.tolerateUnexpectedToken(token, messages_1.Messages.StrictLHSAssignment);
	                        }
	                        if (this.scanner.isStrictModeReservedWord(id.name)) {
	                            this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
	                        }
	                    }
	                    if (!this.match('=')) {
	                        this.context.isAssignmentTarget = false;
	                        this.context.isBindingElement = false;
	                    }
	                    else {
	                        this.reinterpretExpressionAsPattern(expr);
	                    }
	                    token = this.nextToken();
	                    var operator = token.value;
	                    var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    expr = this.finalize(this.startNode(startToken), new Node.AssignmentExpression(operator, expr, right));
	                    this.context.firstCoverInitializedNameError = null;
	                }
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-comma-operator
	    Parser.prototype.parseExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.isolateCoverGrammar(this.parseAssignmentExpression);
	        if (this.match(',')) {
	            var expressions = [];
	            expressions.push(expr);
	            while (this.lookahead.type !== 2 /* EOF */) {
	                if (!this.match(',')) {
	                    break;
	                }
	                this.nextToken();
	                expressions.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
	            }
	            expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-block
	    Parser.prototype.parseStatementListItem = function () {
	        var statement;
	        this.context.isAssignmentTarget = true;
	        this.context.isBindingElement = true;
	        if (this.lookahead.type === 4 /* Keyword */) {
	            switch (this.lookahead.value) {
	                case 'export':
	                    if (!this.context.isModule) {
	                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalExportDeclaration);
	                    }
	                    statement = this.parseExportDeclaration();
	                    break;
	                case 'import':
	                    if (!this.context.isModule) {
	                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalImportDeclaration);
	                    }
	                    statement = this.parseImportDeclaration();
	                    break;
	                case 'const':
	                    statement = this.parseLexicalDeclaration({ inFor: false });
	                    break;
	                case 'function':
	                    statement = this.parseFunctionDeclaration();
	                    break;
	                case 'class':
	                    statement = this.parseClassDeclaration();
	                    break;
	                case 'let':
	                    statement = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({ inFor: false }) : this.parseStatement();
	                    break;
	                default:
	                    statement = this.parseStatement();
	                    break;
	            }
	        }
	        else {
	            statement = this.parseStatement();
	        }
	        return statement;
	    };
	    Parser.prototype.parseBlock = function () {
	        var node = this.createNode();
	        this.expect('{');
	        var block = [];
	        while (true) {
	            if (this.match('}')) {
	                break;
	            }
	            block.push(this.parseStatementListItem());
	        }
	        this.expect('}');
	        return this.finalize(node, new Node.BlockStatement(block));
	    };
	    // https://tc39.github.io/ecma262/#sec-let-and-const-declarations
	    Parser.prototype.parseLexicalBinding = function (kind, options) {
	        var node = this.createNode();
	        var params = [];
	        var id = this.parsePattern(params, kind);
	        if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
	            if (this.scanner.isRestrictedWord(id.name)) {
	                this.tolerateError(messages_1.Messages.StrictVarName);
	            }
	        }
	        var init = null;
	        if (kind === 'const') {
	            if (!this.matchKeyword('in') && !this.matchContextualKeyword('of')) {
	                if (this.match('=')) {
	                    this.nextToken();
	                    init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                }
	                else {
	                    this.throwError(messages_1.Messages.DeclarationMissingInitializer, 'const');
	                }
	            }
	        }
	        else if ((!options.inFor && id.type !== syntax_1.Syntax.Identifier) || this.match('=')) {
	            this.expect('=');
	            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	        }
	        return this.finalize(node, new Node.VariableDeclarator(id, init));
	    };
	    Parser.prototype.parseBindingList = function (kind, options) {
	        var list = [this.parseLexicalBinding(kind, options)];
	        while (this.match(',')) {
	            this.nextToken();
	            list.push(this.parseLexicalBinding(kind, options));
	        }
	        return list;
	    };
	    Parser.prototype.isLexicalDeclaration = function () {
	        var state = this.scanner.saveState();
	        this.scanner.scanComments();
	        var next = this.scanner.lex();
	        this.scanner.restoreState(state);
	        return (next.type === 3 /* Identifier */) ||
	            (next.type === 7 /* Punctuator */ && next.value === '[') ||
	            (next.type === 7 /* Punctuator */ && next.value === '{') ||
	            (next.type === 4 /* Keyword */ && next.value === 'let') ||
	            (next.type === 4 /* Keyword */ && next.value === 'yield');
	    };
	    Parser.prototype.parseLexicalDeclaration = function (options) {
	        var node = this.createNode();
	        var kind = this.nextToken().value;
	        assert_1.assert(kind === 'let' || kind === 'const', 'Lexical declaration must be either let or const');
	        var declarations = this.parseBindingList(kind, options);
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.VariableDeclaration(declarations, kind));
	    };
	    // https://tc39.github.io/ecma262/#sec-destructuring-binding-patterns
	    Parser.prototype.parseBindingRestElement = function (params, kind) {
	        var node = this.createNode();
	        this.expect('...');
	        var arg = this.parsePattern(params, kind);
	        return this.finalize(node, new Node.RestElement(arg));
	    };
	    Parser.prototype.parseArrayPattern = function (params, kind) {
	        var node = this.createNode();
	        this.expect('[');
	        var elements = [];
	        while (!this.match(']')) {
	            if (this.match(',')) {
	                this.nextToken();
	                elements.push(null);
	            }
	            else {
	                if (this.match('...')) {
	                    elements.push(this.parseBindingRestElement(params, kind));
	                    break;
	                }
	                else {
	                    elements.push(this.parsePatternWithDefault(params, kind));
	                }
	                if (!this.match(']')) {
	                    this.expect(',');
	                }
	            }
	        }
	        this.expect(']');
	        return this.finalize(node, new Node.ArrayPattern(elements));
	    };
	    Parser.prototype.parsePropertyPattern = function (params, kind) {
	        var node = this.createNode();
	        var computed = false;
	        var shorthand = false;
	        var method = false;
	        var key;
	        var value;
	        if (this.lookahead.type === 3 /* Identifier */) {
	            var keyToken = this.lookahead;
	            key = this.parseVariableIdentifier();
	            var init = this.finalize(node, new Node.Identifier(keyToken.value));
	            if (this.match('=')) {
	                params.push(keyToken);
	                shorthand = true;
	                this.nextToken();
	                var expr = this.parseAssignmentExpression();
	                value = this.finalize(this.startNode(keyToken), new Node.AssignmentPattern(init, expr));
	            }
	            else if (!this.match(':')) {
	                params.push(keyToken);
	                shorthand = true;
	                value = init;
	            }
	            else {
	                this.expect(':');
	                value = this.parsePatternWithDefault(params, kind);
	            }
	        }
	        else {
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            this.expect(':');
	            value = this.parsePatternWithDefault(params, kind);
	        }
	        return this.finalize(node, new Node.Property('init', key, computed, value, method, shorthand));
	    };
	    Parser.prototype.parseObjectPattern = function (params, kind) {
	        var node = this.createNode();
	        var properties = [];
	        this.expect('{');
	        while (!this.match('}')) {
	            properties.push(this.parsePropertyPattern(params, kind));
	            if (!this.match('}')) {
	                this.expect(',');
	            }
	        }
	        this.expect('}');
	        return this.finalize(node, new Node.ObjectPattern(properties));
	    };
	    Parser.prototype.parsePattern = function (params, kind) {
	        var pattern;
	        if (this.match('[')) {
	            pattern = this.parseArrayPattern(params, kind);
	        }
	        else if (this.match('{')) {
	            pattern = this.parseObjectPattern(params, kind);
	        }
	        else {
	            if (this.matchKeyword('let') && (kind === 'const' || kind === 'let')) {
	                this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.LetInLexicalBinding);
	            }
	            params.push(this.lookahead);
	            pattern = this.parseVariableIdentifier(kind);
	        }
	        return pattern;
	    };
	    Parser.prototype.parsePatternWithDefault = function (params, kind) {
	        var startToken = this.lookahead;
	        var pattern = this.parsePattern(params, kind);
	        if (this.match('=')) {
	            this.nextToken();
	            var previousAllowYield = this.context.allowYield;
	            this.context.allowYield = true;
	            var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
	            this.context.allowYield = previousAllowYield;
	            pattern = this.finalize(this.startNode(startToken), new Node.AssignmentPattern(pattern, right));
	        }
	        return pattern;
	    };
	    // https://tc39.github.io/ecma262/#sec-variable-statement
	    Parser.prototype.parseVariableIdentifier = function (kind) {
	        var node = this.createNode();
	        var token = this.nextToken();
	        if (token.type === 4 /* Keyword */ && token.value === 'yield') {
	            if (this.context.strict) {
	                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
	            }
	            else if (!this.context.allowYield) {
	                this.throwUnexpectedToken(token);
	            }
	        }
	        else if (token.type !== 3 /* Identifier */) {
	            if (this.context.strict && token.type === 4 /* Keyword */ && this.scanner.isStrictModeReservedWord(token.value)) {
	                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
	            }
	            else {
	                if (this.context.strict || token.value !== 'let' || kind !== 'var') {
	                    this.throwUnexpectedToken(token);
	                }
	            }
	        }
	        else if ((this.context.isModule || this.context.await) && token.type === 3 /* Identifier */ && token.value === 'await') {
	            this.tolerateUnexpectedToken(token);
	        }
	        return this.finalize(node, new Node.Identifier(token.value));
	    };
	    Parser.prototype.parseVariableDeclaration = function (options) {
	        var node = this.createNode();
	        var params = [];
	        var id = this.parsePattern(params, 'var');
	        if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
	            if (this.scanner.isRestrictedWord(id.name)) {
	                this.tolerateError(messages_1.Messages.StrictVarName);
	            }
	        }
	        var init = null;
	        if (this.match('=')) {
	            this.nextToken();
	            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	        }
	        else if (id.type !== syntax_1.Syntax.Identifier && !options.inFor) {
	            this.expect('=');
	        }
	        return this.finalize(node, new Node.VariableDeclarator(id, init));
	    };
	    Parser.prototype.parseVariableDeclarationList = function (options) {
	        var opt = { inFor: options.inFor };
	        var list = [];
	        list.push(this.parseVariableDeclaration(opt));
	        while (this.match(',')) {
	            this.nextToken();
	            list.push(this.parseVariableDeclaration(opt));
	        }
	        return list;
	    };
	    Parser.prototype.parseVariableStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('var');
	        var declarations = this.parseVariableDeclarationList({ inFor: false });
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.VariableDeclaration(declarations, 'var'));
	    };
	    // https://tc39.github.io/ecma262/#sec-empty-statement
	    Parser.prototype.parseEmptyStatement = function () {
	        var node = this.createNode();
	        this.expect(';');
	        return this.finalize(node, new Node.EmptyStatement());
	    };
	    // https://tc39.github.io/ecma262/#sec-expression-statement
	    Parser.prototype.parseExpressionStatement = function () {
	        var node = this.createNode();
	        var expr = this.parseExpression();
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ExpressionStatement(expr));
	    };
	    // https://tc39.github.io/ecma262/#sec-if-statement
	    Parser.prototype.parseIfClause = function () {
	        if (this.context.strict && this.matchKeyword('function')) {
	            this.tolerateError(messages_1.Messages.StrictFunction);
	        }
	        return this.parseStatement();
	    };
	    Parser.prototype.parseIfStatement = function () {
	        var node = this.createNode();
	        var consequent;
	        var alternate = null;
	        this.expectKeyword('if');
	        this.expect('(');
	        var test = this.parseExpression();
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            consequent = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            consequent = this.parseIfClause();
	            if (this.matchKeyword('else')) {
	                this.nextToken();
	                alternate = this.parseIfClause();
	            }
	        }
	        return this.finalize(node, new Node.IfStatement(test, consequent, alternate));
	    };
	    // https://tc39.github.io/ecma262/#sec-do-while-statement
	    Parser.prototype.parseDoWhileStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('do');
	        var previousInIteration = this.context.inIteration;
	        this.context.inIteration = true;
	        var body = this.parseStatement();
	        this.context.inIteration = previousInIteration;
	        this.expectKeyword('while');
	        this.expect('(');
	        var test = this.parseExpression();
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	        }
	        else {
	            this.expect(')');
	            if (this.match(';')) {
	                this.nextToken();
	            }
	        }
	        return this.finalize(node, new Node.DoWhileStatement(body, test));
	    };
	    // https://tc39.github.io/ecma262/#sec-while-statement
	    Parser.prototype.parseWhileStatement = function () {
	        var node = this.createNode();
	        var body;
	        this.expectKeyword('while');
	        this.expect('(');
	        var test = this.parseExpression();
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            body = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            var previousInIteration = this.context.inIteration;
	            this.context.inIteration = true;
	            body = this.parseStatement();
	            this.context.inIteration = previousInIteration;
	        }
	        return this.finalize(node, new Node.WhileStatement(test, body));
	    };
	    // https://tc39.github.io/ecma262/#sec-for-statement
	    // https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements
	    Parser.prototype.parseForStatement = function () {
	        var init = null;
	        var test = null;
	        var update = null;
	        var forIn = true;
	        var left, right;
	        var node = this.createNode();
	        this.expectKeyword('for');
	        this.expect('(');
	        if (this.match(';')) {
	            this.nextToken();
	        }
	        else {
	            if (this.matchKeyword('var')) {
	                init = this.createNode();
	                this.nextToken();
	                var previousAllowIn = this.context.allowIn;
	                this.context.allowIn = false;
	                var declarations = this.parseVariableDeclarationList({ inFor: true });
	                this.context.allowIn = previousAllowIn;
	                if (declarations.length === 1 && this.matchKeyword('in')) {
	                    var decl = declarations[0];
	                    if (decl.init && (decl.id.type === syntax_1.Syntax.ArrayPattern || decl.id.type === syntax_1.Syntax.ObjectPattern || this.context.strict)) {
	                        this.tolerateError(messages_1.Messages.ForInOfLoopInitializer, 'for-in');
	                    }
	                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
	                    this.nextToken();
	                    left = init;
	                    right = this.parseExpression();
	                    init = null;
	                }
	                else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
	                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
	                    this.nextToken();
	                    left = init;
	                    right = this.parseAssignmentExpression();
	                    init = null;
	                    forIn = false;
	                }
	                else {
	                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
	                    this.expect(';');
	                }
	            }
	            else if (this.matchKeyword('const') || this.matchKeyword('let')) {
	                init = this.createNode();
	                var kind = this.nextToken().value;
	                if (!this.context.strict && this.lookahead.value === 'in') {
	                    init = this.finalize(init, new Node.Identifier(kind));
	                    this.nextToken();
	                    left = init;
	                    right = this.parseExpression();
	                    init = null;
	                }
	                else {
	                    var previousAllowIn = this.context.allowIn;
	                    this.context.allowIn = false;
	                    var declarations = this.parseBindingList(kind, { inFor: true });
	                    this.context.allowIn = previousAllowIn;
	                    if (declarations.length === 1 && declarations[0].init === null && this.matchKeyword('in')) {
	                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
	                        this.nextToken();
	                        left = init;
	                        right = this.parseExpression();
	                        init = null;
	                    }
	                    else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
	                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
	                        this.nextToken();
	                        left = init;
	                        right = this.parseAssignmentExpression();
	                        init = null;
	                        forIn = false;
	                    }
	                    else {
	                        this.consumeSemicolon();
	                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
	                    }
	                }
	            }
	            else {
	                var initStartToken = this.lookahead;
	                var previousAllowIn = this.context.allowIn;
	                this.context.allowIn = false;
	                init = this.inheritCoverGrammar(this.parseAssignmentExpression);
	                this.context.allowIn = previousAllowIn;
	                if (this.matchKeyword('in')) {
	                    if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInForIn);
	                    }
	                    this.nextToken();
	                    this.reinterpretExpressionAsPattern(init);
	                    left = init;
	                    right = this.parseExpression();
	                    init = null;
	                }
	                else if (this.matchContextualKeyword('of')) {
	                    if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInForLoop);
	                    }
	                    this.nextToken();
	                    this.reinterpretExpressionAsPattern(init);
	                    left = init;
	                    right = this.parseAssignmentExpression();
	                    init = null;
	                    forIn = false;
	                }
	                else {
	                    if (this.match(',')) {
	                        var initSeq = [init];
	                        while (this.match(',')) {
	                            this.nextToken();
	                            initSeq.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
	                        }
	                        init = this.finalize(this.startNode(initStartToken), new Node.SequenceExpression(initSeq));
	                    }
	                    this.expect(';');
	                }
	            }
	        }
	        if (typeof left === 'undefined') {
	            if (!this.match(';')) {
	                test = this.parseExpression();
	            }
	            this.expect(';');
	            if (!this.match(')')) {
	                update = this.parseExpression();
	            }
	        }
	        var body;
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            body = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            var previousInIteration = this.context.inIteration;
	            this.context.inIteration = true;
	            body = this.isolateCoverGrammar(this.parseStatement);
	            this.context.inIteration = previousInIteration;
	        }
	        return (typeof left === 'undefined') ?
	            this.finalize(node, new Node.ForStatement(init, test, update, body)) :
	            forIn ? this.finalize(node, new Node.ForInStatement(left, right, body)) :
	                this.finalize(node, new Node.ForOfStatement(left, right, body));
	    };
	    // https://tc39.github.io/ecma262/#sec-continue-statement
	    Parser.prototype.parseContinueStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('continue');
	        var label = null;
	        if (this.lookahead.type === 3 /* Identifier */ && !this.hasLineTerminator) {
	            var id = this.parseVariableIdentifier();
	            label = id;
	            var key = '$' + id.name;
	            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
	                this.throwError(messages_1.Messages.UnknownLabel, id.name);
	            }
	        }
	        this.consumeSemicolon();
	        if (label === null && !this.context.inIteration) {
	            this.throwError(messages_1.Messages.IllegalContinue);
	        }
	        return this.finalize(node, new Node.ContinueStatement(label));
	    };
	    // https://tc39.github.io/ecma262/#sec-break-statement
	    Parser.prototype.parseBreakStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('break');
	        var label = null;
	        if (this.lookahead.type === 3 /* Identifier */ && !this.hasLineTerminator) {
	            var id = this.parseVariableIdentifier();
	            var key = '$' + id.name;
	            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
	                this.throwError(messages_1.Messages.UnknownLabel, id.name);
	            }
	            label = id;
	        }
	        this.consumeSemicolon();
	        if (label === null && !this.context.inIteration && !this.context.inSwitch) {
	            this.throwError(messages_1.Messages.IllegalBreak);
	        }
	        return this.finalize(node, new Node.BreakStatement(label));
	    };
	    // https://tc39.github.io/ecma262/#sec-return-statement
	    Parser.prototype.parseReturnStatement = function () {
	        if (!this.context.inFunctionBody) {
	            this.tolerateError(messages_1.Messages.IllegalReturn);
	        }
	        var node = this.createNode();
	        this.expectKeyword('return');
	        var hasArgument = (!this.match(';') && !this.match('}') &&
	            !this.hasLineTerminator && this.lookahead.type !== 2 /* EOF */) ||
	            this.lookahead.type === 8 /* StringLiteral */ ||
	            this.lookahead.type === 10 /* Template */;
	        var argument = hasArgument ? this.parseExpression() : null;
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ReturnStatement(argument));
	    };
	    // https://tc39.github.io/ecma262/#sec-with-statement
	    Parser.prototype.parseWithStatement = function () {
	        if (this.context.strict) {
	            this.tolerateError(messages_1.Messages.StrictModeWith);
	        }
	        var node = this.createNode();
	        var body;
	        this.expectKeyword('with');
	        this.expect('(');
	        var object = this.parseExpression();
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            body = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            body = this.parseStatement();
	        }
	        return this.finalize(node, new Node.WithStatement(object, body));
	    };
	    // https://tc39.github.io/ecma262/#sec-switch-statement
	    Parser.prototype.parseSwitchCase = function () {
	        var node = this.createNode();
	        var test;
	        if (this.matchKeyword('default')) {
	            this.nextToken();
	            test = null;
	        }
	        else {
	            this.expectKeyword('case');
	            test = this.parseExpression();
	        }
	        this.expect(':');
	        var consequent = [];
	        while (true) {
	            if (this.match('}') || this.matchKeyword('default') || this.matchKeyword('case')) {
	                break;
	            }
	            consequent.push(this.parseStatementListItem());
	        }
	        return this.finalize(node, new Node.SwitchCase(test, consequent));
	    };
	    Parser.prototype.parseSwitchStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('switch');
	        this.expect('(');
	        var discriminant = this.parseExpression();
	        this.expect(')');
	        var previousInSwitch = this.context.inSwitch;
	        this.context.inSwitch = true;
	        var cases = [];
	        var defaultFound = false;
	        this.expect('{');
	        while (true) {
	            if (this.match('}')) {
	                break;
	            }
	            var clause = this.parseSwitchCase();
	            if (clause.test === null) {
	                if (defaultFound) {
	                    this.throwError(messages_1.Messages.MultipleDefaultsInSwitch);
	                }
	                defaultFound = true;
	            }
	            cases.push(clause);
	        }
	        this.expect('}');
	        this.context.inSwitch = previousInSwitch;
	        return this.finalize(node, new Node.SwitchStatement(discriminant, cases));
	    };
	    // https://tc39.github.io/ecma262/#sec-labelled-statements
	    Parser.prototype.parseLabelledStatement = function () {
	        var node = this.createNode();
	        var expr = this.parseExpression();
	        var statement;
	        if ((expr.type === syntax_1.Syntax.Identifier) && this.match(':')) {
	            this.nextToken();
	            var id = expr;
	            var key = '$' + id.name;
	            if (Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
	                this.throwError(messages_1.Messages.Redeclaration, 'Label', id.name);
	            }
	            this.context.labelSet[key] = true;
	            var body = void 0;
	            if (this.matchKeyword('class')) {
	                this.tolerateUnexpectedToken(this.lookahead);
	                body = this.parseClassDeclaration();
	            }
	            else if (this.matchKeyword('function')) {
	                var token = this.lookahead;
	                var declaration = this.parseFunctionDeclaration();
	                if (this.context.strict) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunction);
	                }
	                else if (declaration.generator) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.GeneratorInLegacyContext);
	                }
	                body = declaration;
	            }
	            else {
	                body = this.parseStatement();
	            }
	            delete this.context.labelSet[key];
	            statement = new Node.LabeledStatement(id, body);
	        }
	        else {
	            this.consumeSemicolon();
	            statement = new Node.ExpressionStatement(expr);
	        }
	        return this.finalize(node, statement);
	    };
	    // https://tc39.github.io/ecma262/#sec-throw-statement
	    Parser.prototype.parseThrowStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('throw');
	        if (this.hasLineTerminator) {
	            this.throwError(messages_1.Messages.NewlineAfterThrow);
	        }
	        var argument = this.parseExpression();
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ThrowStatement(argument));
	    };
	    // https://tc39.github.io/ecma262/#sec-try-statement
	    Parser.prototype.parseCatchClause = function () {
	        var node = this.createNode();
	        this.expectKeyword('catch');
	        this.expect('(');
	        if (this.match(')')) {
	            this.throwUnexpectedToken(this.lookahead);
	        }
	        var params = [];
	        var param = this.parsePattern(params);
	        var paramMap = {};
	        for (var i = 0; i < params.length; i++) {
	            var key = '$' + params[i].value;
	            if (Object.prototype.hasOwnProperty.call(paramMap, key)) {
	                this.tolerateError(messages_1.Messages.DuplicateBinding, params[i].value);
	            }
	            paramMap[key] = true;
	        }
	        if (this.context.strict && param.type === syntax_1.Syntax.Identifier) {
	            if (this.scanner.isRestrictedWord(param.name)) {
	                this.tolerateError(messages_1.Messages.StrictCatchVariable);
	            }
	        }
	        this.expect(')');
	        var body = this.parseBlock();
	        return this.finalize(node, new Node.CatchClause(param, body));
	    };
	    Parser.prototype.parseFinallyClause = function () {
	        this.expectKeyword('finally');
	        return this.parseBlock();
	    };
	    Parser.prototype.parseTryStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('try');
	        var block = this.parseBlock();
	        var handler = this.matchKeyword('catch') ? this.parseCatchClause() : null;
	        var finalizer = this.matchKeyword('finally') ? this.parseFinallyClause() : null;
	        if (!handler && !finalizer) {
	            this.throwError(messages_1.Messages.NoCatchOrFinally);
	        }
	        return this.finalize(node, new Node.TryStatement(block, handler, finalizer));
	    };
	    // https://tc39.github.io/ecma262/#sec-debugger-statement
	    Parser.prototype.parseDebuggerStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('debugger');
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.DebuggerStatement());
	    };
	    // https://tc39.github.io/ecma262/#sec-ecmascript-language-statements-and-declarations
	    Parser.prototype.parseStatement = function () {
	        var statement;
	        switch (this.lookahead.type) {
	            case 1 /* BooleanLiteral */:
	            case 5 /* NullLiteral */:
	            case 6 /* NumericLiteral */:
	            case 8 /* StringLiteral */:
	            case 10 /* Template */:
	            case 9 /* RegularExpression */:
	                statement = this.parseExpressionStatement();
	                break;
	            case 7 /* Punctuator */:
	                var value = this.lookahead.value;
	                if (value === '{') {
	                    statement = this.parseBlock();
	                }
	                else if (value === '(') {
	                    statement = this.parseExpressionStatement();
	                }
	                else if (value === ';') {
	                    statement = this.parseEmptyStatement();
	                }
	                else {
	                    statement = this.parseExpressionStatement();
	                }
	                break;
	            case 3 /* Identifier */:
	                statement = this.matchAsyncFunction() ? this.parseFunctionDeclaration() : this.parseLabelledStatement();
	                break;
	            case 4 /* Keyword */:
	                switch (this.lookahead.value) {
	                    case 'break':
	                        statement = this.parseBreakStatement();
	                        break;
	                    case 'continue':
	                        statement = this.parseContinueStatement();
	                        break;
	                    case 'debugger':
	                        statement = this.parseDebuggerStatement();
	                        break;
	                    case 'do':
	                        statement = this.parseDoWhileStatement();
	                        break;
	                    case 'for':
	                        statement = this.parseForStatement();
	                        break;
	                    case 'function':
	                        statement = this.parseFunctionDeclaration();
	                        break;
	                    case 'if':
	                        statement = this.parseIfStatement();
	                        break;
	                    case 'return':
	                        statement = this.parseReturnStatement();
	                        break;
	                    case 'switch':
	                        statement = this.parseSwitchStatement();
	                        break;
	                    case 'throw':
	                        statement = this.parseThrowStatement();
	                        break;
	                    case 'try':
	                        statement = this.parseTryStatement();
	                        break;
	                    case 'var':
	                        statement = this.parseVariableStatement();
	                        break;
	                    case 'while':
	                        statement = this.parseWhileStatement();
	                        break;
	                    case 'with':
	                        statement = this.parseWithStatement();
	                        break;
	                    default:
	                        statement = this.parseExpressionStatement();
	                        break;
	                }
	                break;
	            default:
	                statement = this.throwUnexpectedToken(this.lookahead);
	        }
	        return statement;
	    };
	    // https://tc39.github.io/ecma262/#sec-function-definitions
	    Parser.prototype.parseFunctionSourceElements = function () {
	        var node = this.createNode();
	        this.expect('{');
	        var body = this.parseDirectivePrologues();
	        var previousLabelSet = this.context.labelSet;
	        var previousInIteration = this.context.inIteration;
	        var previousInSwitch = this.context.inSwitch;
	        var previousInFunctionBody = this.context.inFunctionBody;
	        this.context.labelSet = {};
	        this.context.inIteration = false;
	        this.context.inSwitch = false;
	        this.context.inFunctionBody = true;
	        while (this.lookahead.type !== 2 /* EOF */) {
	            if (this.match('}')) {
	                break;
	            }
	            body.push(this.parseStatementListItem());
	        }
	        this.expect('}');
	        this.context.labelSet = previousLabelSet;
	        this.context.inIteration = previousInIteration;
	        this.context.inSwitch = previousInSwitch;
	        this.context.inFunctionBody = previousInFunctionBody;
	        return this.finalize(node, new Node.BlockStatement(body));
	    };
	    Parser.prototype.validateParam = function (options, param, name) {
	        var key = '$' + name;
	        if (this.context.strict) {
	            if (this.scanner.isRestrictedWord(name)) {
	                options.stricted = param;
	                options.message = messages_1.Messages.StrictParamName;
	            }
	            if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
	                options.stricted = param;
	                options.message = messages_1.Messages.StrictParamDupe;
	            }
	        }
	        else if (!options.firstRestricted) {
	            if (this.scanner.isRestrictedWord(name)) {
	                options.firstRestricted = param;
	                options.message = messages_1.Messages.StrictParamName;
	            }
	            else if (this.scanner.isStrictModeReservedWord(name)) {
	                options.firstRestricted = param;
	                options.message = messages_1.Messages.StrictReservedWord;
	            }
	            else if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
	                options.stricted = param;
	                options.message = messages_1.Messages.StrictParamDupe;
	            }
	        }
	        /* istanbul ignore next */
	        if (typeof Object.defineProperty === 'function') {
	            Object.defineProperty(options.paramSet, key, { value: true, enumerable: true, writable: true, configurable: true });
	        }
	        else {
	            options.paramSet[key] = true;
	        }
	    };
	    Parser.prototype.parseRestElement = function (params) {
	        var node = this.createNode();
	        this.expect('...');
	        var arg = this.parsePattern(params);
	        if (this.match('=')) {
	            this.throwError(messages_1.Messages.DefaultRestParameter);
	        }
	        if (!this.match(')')) {
	            this.throwError(messages_1.Messages.ParameterAfterRestParameter);
	        }
	        return this.finalize(node, new Node.RestElement(arg));
	    };
	    Parser.prototype.parseFormalParameter = function (options) {
	        var params = [];
	        var param = this.match('...') ? this.parseRestElement(params) : this.parsePatternWithDefault(params);
	        for (var i = 0; i < params.length; i++) {
	            this.validateParam(options, params[i], params[i].value);
	        }
	        options.simple = options.simple && (param instanceof Node.Identifier);
	        options.params.push(param);
	    };
	    Parser.prototype.parseFormalParameters = function (firstRestricted) {
	        var options;
	        options = {
	            simple: true,
	            params: [],
	            firstRestricted: firstRestricted
	        };
	        this.expect('(');
	        if (!this.match(')')) {
	            options.paramSet = {};
	            while (this.lookahead.type !== 2 /* EOF */) {
	                this.parseFormalParameter(options);
	                if (this.match(')')) {
	                    break;
	                }
	                this.expect(',');
	                if (this.match(')')) {
	                    break;
	                }
	            }
	        }
	        this.expect(')');
	        return {
	            simple: options.simple,
	            params: options.params,
	            stricted: options.stricted,
	            firstRestricted: options.firstRestricted,
	            message: options.message
	        };
	    };
	    Parser.prototype.matchAsyncFunction = function () {
	        var match = this.matchContextualKeyword('async');
	        if (match) {
	            var state = this.scanner.saveState();
	            this.scanner.scanComments();
	            var next = this.scanner.lex();
	            this.scanner.restoreState(state);
	            match = (state.lineNumber === next.lineNumber) && (next.type === 4 /* Keyword */) && (next.value === 'function');
	        }
	        return match;
	    };
	    Parser.prototype.parseFunctionDeclaration = function (identifierIsOptional) {
	        var node = this.createNode();
	        var isAsync = this.matchContextualKeyword('async');
	        if (isAsync) {
	            this.nextToken();
	        }
	        this.expectKeyword('function');
	        var isGenerator = isAsync ? false : this.match('*');
	        if (isGenerator) {
	            this.nextToken();
	        }
	        var message;
	        var id = null;
	        var firstRestricted = null;
	        if (!identifierIsOptional || !this.match('(')) {
	            var token = this.lookahead;
	            id = this.parseVariableIdentifier();
	            if (this.context.strict) {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
	                }
	            }
	            else {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictFunctionName;
	                }
	                else if (this.scanner.isStrictModeReservedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictReservedWord;
	                }
	            }
	        }
	        var previousAllowAwait = this.context.await;
	        var previousAllowYield = this.context.allowYield;
	        this.context.await = isAsync;
	        this.context.allowYield = !isGenerator;
	        var formalParameters = this.parseFormalParameters(firstRestricted);
	        var params = formalParameters.params;
	        var stricted = formalParameters.stricted;
	        firstRestricted = formalParameters.firstRestricted;
	        if (formalParameters.message) {
	            message = formalParameters.message;
	        }
	        var previousStrict = this.context.strict;
	        var previousAllowStrictDirective = this.context.allowStrictDirective;
	        this.context.allowStrictDirective = formalParameters.simple;
	        var body = this.parseFunctionSourceElements();
	        if (this.context.strict && firstRestricted) {
	            this.throwUnexpectedToken(firstRestricted, message);
	        }
	        if (this.context.strict && stricted) {
	            this.tolerateUnexpectedToken(stricted, message);
	        }
	        this.context.strict = previousStrict;
	        this.context.allowStrictDirective = previousAllowStrictDirective;
	        this.context.await = previousAllowAwait;
	        this.context.allowYield = previousAllowYield;
	        return isAsync ? this.finalize(node, new Node.AsyncFunctionDeclaration(id, params, body)) :
	            this.finalize(node, new Node.FunctionDeclaration(id, params, body, isGenerator));
	    };
	    Parser.prototype.parseFunctionExpression = function () {
	        var node = this.createNode();
	        var isAsync = this.matchContextualKeyword('async');
	        if (isAsync) {
	            this.nextToken();
	        }
	        this.expectKeyword('function');
	        var isGenerator = isAsync ? false : this.match('*');
	        if (isGenerator) {
	            this.nextToken();
	        }
	        var message;
	        var id = null;
	        var firstRestricted;
	        var previousAllowAwait = this.context.await;
	        var previousAllowYield = this.context.allowYield;
	        this.context.await = isAsync;
	        this.context.allowYield = !isGenerator;
	        if (!this.match('(')) {
	            var token = this.lookahead;
	            id = (!this.context.strict && !isGenerator && this.matchKeyword('yield')) ? this.parseIdentifierName() : this.parseVariableIdentifier();
	            if (this.context.strict) {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
	                }
	            }
	            else {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictFunctionName;
	                }
	                else if (this.scanner.isStrictModeReservedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictReservedWord;
	                }
	            }
	        }
	        var formalParameters = this.parseFormalParameters(firstRestricted);
	        var params = formalParameters.params;
	        var stricted = formalParameters.stricted;
	        firstRestricted = formalParameters.firstRestricted;
	        if (formalParameters.message) {
	            message = formalParameters.message;
	        }
	        var previousStrict = this.context.strict;
	        var previousAllowStrictDirective = this.context.allowStrictDirective;
	        this.context.allowStrictDirective = formalParameters.simple;
	        var body = this.parseFunctionSourceElements();
	        if (this.context.strict && firstRestricted) {
	            this.throwUnexpectedToken(firstRestricted, message);
	        }
	        if (this.context.strict && stricted) {
	            this.tolerateUnexpectedToken(stricted, message);
	        }
	        this.context.strict = previousStrict;
	        this.context.allowStrictDirective = previousAllowStrictDirective;
	        this.context.await = previousAllowAwait;
	        this.context.allowYield = previousAllowYield;
	        return isAsync ? this.finalize(node, new Node.AsyncFunctionExpression(id, params, body)) :
	            this.finalize(node, new Node.FunctionExpression(id, params, body, isGenerator));
	    };
	    // https://tc39.github.io/ecma262/#sec-directive-prologues-and-the-use-strict-directive
	    Parser.prototype.parseDirective = function () {
	        var token = this.lookahead;
	        var node = this.createNode();
	        var expr = this.parseExpression();
	        var directive = (expr.type === syntax_1.Syntax.Literal) ? this.getTokenRaw(token).slice(1, -1) : null;
	        this.consumeSemicolon();
	        return this.finalize(node, directive ? new Node.Directive(expr, directive) : new Node.ExpressionStatement(expr));
	    };
	    Parser.prototype.parseDirectivePrologues = function () {
	        var firstRestricted = null;
	        var body = [];
	        while (true) {
	            var token = this.lookahead;
	            if (token.type !== 8 /* StringLiteral */) {
	                break;
	            }
	            var statement = this.parseDirective();
	            body.push(statement);
	            var directive = statement.directive;
	            if (typeof directive !== 'string') {
	                break;
	            }
	            if (directive === 'use strict') {
	                this.context.strict = true;
	                if (firstRestricted) {
	                    this.tolerateUnexpectedToken(firstRestricted, messages_1.Messages.StrictOctalLiteral);
	                }
	                if (!this.context.allowStrictDirective) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.IllegalLanguageModeDirective);
	                }
	            }
	            else {
	                if (!firstRestricted && token.octal) {
	                    firstRestricted = token;
	                }
	            }
	        }
	        return body;
	    };
	    // https://tc39.github.io/ecma262/#sec-method-definitions
	    Parser.prototype.qualifiedPropertyName = function (token) {
	        switch (token.type) {
	            case 3 /* Identifier */:
	            case 8 /* StringLiteral */:
	            case 1 /* BooleanLiteral */:
	            case 5 /* NullLiteral */:
	            case 6 /* NumericLiteral */:
	            case 4 /* Keyword */:
	                return true;
	            case 7 /* Punctuator */:
	                return token.value === '[';
	            default:
	                break;
	        }
	        return false;
	    };
	    Parser.prototype.parseGetterMethod = function () {
	        var node = this.createNode();
	        var isGenerator = false;
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = !isGenerator;
	        var formalParameters = this.parseFormalParameters();
	        if (formalParameters.params.length > 0) {
	            this.tolerateError(messages_1.Messages.BadGetterArity);
	        }
	        var method = this.parsePropertyMethod(formalParameters);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
	    };
	    Parser.prototype.parseSetterMethod = function () {
	        var node = this.createNode();
	        var isGenerator = false;
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = !isGenerator;
	        var formalParameters = this.parseFormalParameters();
	        if (formalParameters.params.length !== 1) {
	            this.tolerateError(messages_1.Messages.BadSetterArity);
	        }
	        else if (formalParameters.params[0] instanceof Node.RestElement) {
	            this.tolerateError(messages_1.Messages.BadSetterRestParameter);
	        }
	        var method = this.parsePropertyMethod(formalParameters);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
	    };
	    Parser.prototype.parseGeneratorMethod = function () {
	        var node = this.createNode();
	        var isGenerator = true;
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = true;
	        var params = this.parseFormalParameters();
	        this.context.allowYield = false;
	        var method = this.parsePropertyMethod(params);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
	    };
	    // https://tc39.github.io/ecma262/#sec-generator-function-definitions
	    Parser.prototype.isStartOfExpression = function () {
	        var start = true;
	        var value = this.lookahead.value;
	        switch (this.lookahead.type) {
	            case 7 /* Punctuator */:
	                start = (value === '[') || (value === '(') || (value === '{') ||
	                    (value === '+') || (value === '-') ||
	                    (value === '!') || (value === '~') ||
	                    (value === '++') || (value === '--') ||
	                    (value === '/') || (value === '/='); // regular expression literal
	                break;
	            case 4 /* Keyword */:
	                start = (value === 'class') || (value === 'delete') ||
	                    (value === 'function') || (value === 'let') || (value === 'new') ||
	                    (value === 'super') || (value === 'this') || (value === 'typeof') ||
	                    (value === 'void') || (value === 'yield');
	                break;
	            default:
	                break;
	        }
	        return start;
	    };
	    Parser.prototype.parseYieldExpression = function () {
	        var node = this.createNode();
	        this.expectKeyword('yield');
	        var argument = null;
	        var delegate = false;
	        if (!this.hasLineTerminator) {
	            var previousAllowYield = this.context.allowYield;
	            this.context.allowYield = false;
	            delegate = this.match('*');
	            if (delegate) {
	                this.nextToken();
	                argument = this.parseAssignmentExpression();
	            }
	            else if (this.isStartOfExpression()) {
	                argument = this.parseAssignmentExpression();
	            }
	            this.context.allowYield = previousAllowYield;
	        }
	        return this.finalize(node, new Node.YieldExpression(argument, delegate));
	    };
	    // https://tc39.github.io/ecma262/#sec-class-definitions
	    Parser.prototype.parseClassElement = function (hasConstructor) {
	        var token = this.lookahead;
	        var node = this.createNode();
	        var kind = '';
	        var key = null;
	        var value = null;
	        var computed = false;
	        var method = false;
	        var isStatic = false;
	        var isAsync = false;
	        if (this.match('*')) {
	            this.nextToken();
	        }
	        else {
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            var id = key;
	            if (id.name === 'static' && (this.qualifiedPropertyName(this.lookahead) || this.match('*'))) {
	                token = this.lookahead;
	                isStatic = true;
	                computed = this.match('[');
	                if (this.match('*')) {
	                    this.nextToken();
	                }
	                else {
	                    key = this.parseObjectPropertyKey();
	                }
	            }
	            if ((token.type === 3 /* Identifier */) && !this.hasLineTerminator && (token.value === 'async')) {
	                var punctuator = this.lookahead.value;
	                if (punctuator !== ':' && punctuator !== '(' && punctuator !== '*') {
	                    isAsync = true;
	                    token = this.lookahead;
	                    key = this.parseObjectPropertyKey();
	                    if (token.type === 3 /* Identifier */ && token.value === 'constructor') {
	                        this.tolerateUnexpectedToken(token, messages_1.Messages.ConstructorIsAsync);
	                    }
	                }
	            }
	        }
	        var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
	        if (token.type === 3 /* Identifier */) {
	            if (token.value === 'get' && lookaheadPropertyKey) {
	                kind = 'get';
	                computed = this.match('[');
	                key = this.parseObjectPropertyKey();
	                this.context.allowYield = false;
	                value = this.parseGetterMethod();
	            }
	            else if (token.value === 'set' && lookaheadPropertyKey) {
	                kind = 'set';
	                computed = this.match('[');
	                key = this.parseObjectPropertyKey();
	                value = this.parseSetterMethod();
	            }
	        }
	        else if (token.type === 7 /* Punctuator */ && token.value === '*' && lookaheadPropertyKey) {
	            kind = 'init';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            value = this.parseGeneratorMethod();
	            method = true;
	        }
	        if (!kind && key && this.match('(')) {
	            kind = 'init';
	            value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
	            method = true;
	        }
	        if (!kind) {
	            this.throwUnexpectedToken(this.lookahead);
	        }
	        if (kind === 'init') {
	            kind = 'method';
	        }
	        if (!computed) {
	            if (isStatic && this.isPropertyKey(key, 'prototype')) {
	                this.throwUnexpectedToken(token, messages_1.Messages.StaticPrototype);
	            }
	            if (!isStatic && this.isPropertyKey(key, 'constructor')) {
	                if (kind !== 'method' || !method || (value && value.generator)) {
	                    this.throwUnexpectedToken(token, messages_1.Messages.ConstructorSpecialMethod);
	                }
	                if (hasConstructor.value) {
	                    this.throwUnexpectedToken(token, messages_1.Messages.DuplicateConstructor);
	                }
	                else {
	                    hasConstructor.value = true;
	                }
	                kind = 'constructor';
	            }
	        }
	        return this.finalize(node, new Node.MethodDefinition(key, computed, value, kind, isStatic));
	    };
	    Parser.prototype.parseClassElementList = function () {
	        var body = [];
	        var hasConstructor = { value: false };
	        this.expect('{');
	        while (!this.match('}')) {
	            if (this.match(';')) {
	                this.nextToken();
	            }
	            else {
	                body.push(this.parseClassElement(hasConstructor));
	            }
	        }
	        this.expect('}');
	        return body;
	    };
	    Parser.prototype.parseClassBody = function () {
	        var node = this.createNode();
	        var elementList = this.parseClassElementList();
	        return this.finalize(node, new Node.ClassBody(elementList));
	    };
	    Parser.prototype.parseClassDeclaration = function (identifierIsOptional) {
	        var node = this.createNode();
	        var previousStrict = this.context.strict;
	        this.context.strict = true;
	        this.expectKeyword('class');
	        var id = (identifierIsOptional && (this.lookahead.type !== 3 /* Identifier */)) ? null : this.parseVariableIdentifier();
	        var superClass = null;
	        if (this.matchKeyword('extends')) {
	            this.nextToken();
	            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
	        }
	        var classBody = this.parseClassBody();
	        this.context.strict = previousStrict;
	        return this.finalize(node, new Node.ClassDeclaration(id, superClass, classBody));
	    };
	    Parser.prototype.parseClassExpression = function () {
	        var node = this.createNode();
	        var previousStrict = this.context.strict;
	        this.context.strict = true;
	        this.expectKeyword('class');
	        var id = (this.lookahead.type === 3 /* Identifier */) ? this.parseVariableIdentifier() : null;
	        var superClass = null;
	        if (this.matchKeyword('extends')) {
	            this.nextToken();
	            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
	        }
	        var classBody = this.parseClassBody();
	        this.context.strict = previousStrict;
	        return this.finalize(node, new Node.ClassExpression(id, superClass, classBody));
	    };
	    // https://tc39.github.io/ecma262/#sec-scripts
	    // https://tc39.github.io/ecma262/#sec-modules
	    Parser.prototype.parseModule = function () {
	        this.context.strict = true;
	        this.context.isModule = true;
	        this.scanner.isModule = true;
	        var node = this.createNode();
	        var body = this.parseDirectivePrologues();
	        while (this.lookahead.type !== 2 /* EOF */) {
	            body.push(this.parseStatementListItem());
	        }
	        return this.finalize(node, new Node.Module(body));
	    };
	    Parser.prototype.parseScript = function () {
	        var node = this.createNode();
	        var body = this.parseDirectivePrologues();
	        while (this.lookahead.type !== 2 /* EOF */) {
	            body.push(this.parseStatementListItem());
	        }
	        return this.finalize(node, new Node.Script(body));
	    };
	    // https://tc39.github.io/ecma262/#sec-imports
	    Parser.prototype.parseModuleSpecifier = function () {
	        var node = this.createNode();
	        if (this.lookahead.type !== 8 /* StringLiteral */) {
	            this.throwError(messages_1.Messages.InvalidModuleSpecifier);
	        }
	        var token = this.nextToken();
	        var raw = this.getTokenRaw(token);
	        return this.finalize(node, new Node.Literal(token.value, raw));
	    };
	    // import {<foo as bar>} ...;
	    Parser.prototype.parseImportSpecifier = function () {
	        var node = this.createNode();
	        var imported;
	        var local;
	        if (this.lookahead.type === 3 /* Identifier */) {
	            imported = this.parseVariableIdentifier();
	            local = imported;
	            if (this.matchContextualKeyword('as')) {
	                this.nextToken();
	                local = this.parseVariableIdentifier();
	            }
	        }
	        else {
	            imported = this.parseIdentifierName();
	            local = imported;
	            if (this.matchContextualKeyword('as')) {
	                this.nextToken();
	                local = this.parseVariableIdentifier();
	            }
	            else {
	                this.throwUnexpectedToken(this.nextToken());
	            }
	        }
	        return this.finalize(node, new Node.ImportSpecifier(local, imported));
	    };
	    // {foo, bar as bas}
	    Parser.prototype.parseNamedImports = function () {
	        this.expect('{');
	        var specifiers = [];
	        while (!this.match('}')) {
	            specifiers.push(this.parseImportSpecifier());
	            if (!this.match('}')) {
	                this.expect(',');
	            }
	        }
	        this.expect('}');
	        return specifiers;
	    };
	    // import <foo> ...;
	    Parser.prototype.parseImportDefaultSpecifier = function () {
	        var node = this.createNode();
	        var local = this.parseIdentifierName();
	        return this.finalize(node, new Node.ImportDefaultSpecifier(local));
	    };
	    // import <* as foo> ...;
	    Parser.prototype.parseImportNamespaceSpecifier = function () {
	        var node = this.createNode();
	        this.expect('*');
	        if (!this.matchContextualKeyword('as')) {
	            this.throwError(messages_1.Messages.NoAsAfterImportNamespace);
	        }
	        this.nextToken();
	        var local = this.parseIdentifierName();
	        return this.finalize(node, new Node.ImportNamespaceSpecifier(local));
	    };
	    Parser.prototype.parseImportDeclaration = function () {
	        if (this.context.inFunctionBody) {
	            this.throwError(messages_1.Messages.IllegalImportDeclaration);
	        }
	        var node = this.createNode();
	        this.expectKeyword('import');
	        var src;
	        var specifiers = [];
	        if (this.lookahead.type === 8 /* StringLiteral */) {
	            // import 'foo';
	            src = this.parseModuleSpecifier();
	        }
	        else {
	            if (this.match('{')) {
	                // import {bar}
	                specifiers = specifiers.concat(this.parseNamedImports());
	            }
	            else if (this.match('*')) {
	                // import * as foo
	                specifiers.push(this.parseImportNamespaceSpecifier());
	            }
	            else if (this.isIdentifierName(this.lookahead) && !this.matchKeyword('default')) {
	                // import foo
	                specifiers.push(this.parseImportDefaultSpecifier());
	                if (this.match(',')) {
	                    this.nextToken();
	                    if (this.match('*')) {
	                        // import foo, * as foo
	                        specifiers.push(this.parseImportNamespaceSpecifier());
	                    }
	                    else if (this.match('{')) {
	                        // import foo, {bar}
	                        specifiers = specifiers.concat(this.parseNamedImports());
	                    }
	                    else {
	                        this.throwUnexpectedToken(this.lookahead);
	                    }
	                }
	            }
	            else {
	                this.throwUnexpectedToken(this.nextToken());
	            }
	            if (!this.matchContextualKeyword('from')) {
	                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
	                this.throwError(message, this.lookahead.value);
	            }
	            this.nextToken();
	            src = this.parseModuleSpecifier();
	        }
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ImportDeclaration(specifiers, src));
	    };
	    // https://tc39.github.io/ecma262/#sec-exports
	    Parser.prototype.parseExportSpecifier = function () {
	        var node = this.createNode();
	        var local = this.parseIdentifierName();
	        var exported = local;
	        if (this.matchContextualKeyword('as')) {
	            this.nextToken();
	            exported = this.parseIdentifierName();
	        }
	        return this.finalize(node, new Node.ExportSpecifier(local, exported));
	    };
	    Parser.prototype.parseExportDeclaration = function () {
	        if (this.context.inFunctionBody) {
	            this.throwError(messages_1.Messages.IllegalExportDeclaration);
	        }
	        var node = this.createNode();
	        this.expectKeyword('export');
	        var exportDeclaration;
	        if (this.matchKeyword('default')) {
	            // export default ...
	            this.nextToken();
	            if (this.matchKeyword('function')) {
	                // export default function foo () {}
	                // export default function () {}
	                var declaration = this.parseFunctionDeclaration(true);
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	            else if (this.matchKeyword('class')) {
	                // export default class foo {}
	                var declaration = this.parseClassDeclaration(true);
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	            else if (this.matchContextualKeyword('async')) {
	                // export default async function f () {}
	                // export default async function () {}
	                // export default async x => x
	                var declaration = this.matchAsyncFunction() ? this.parseFunctionDeclaration(true) : this.parseAssignmentExpression();
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	            else {
	                if (this.matchContextualKeyword('from')) {
	                    this.throwError(messages_1.Messages.UnexpectedToken, this.lookahead.value);
	                }
	                // export default {};
	                // export default [];
	                // export default (1 + 2);
	                var declaration = this.match('{') ? this.parseObjectInitializer() :
	                    this.match('[') ? this.parseArrayInitializer() : this.parseAssignmentExpression();
	                this.consumeSemicolon();
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	        }
	        else if (this.match('*')) {
	            // export * from 'foo';
	            this.nextToken();
	            if (!this.matchContextualKeyword('from')) {
	                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
	                this.throwError(message, this.lookahead.value);
	            }
	            this.nextToken();
	            var src = this.parseModuleSpecifier();
	            this.consumeSemicolon();
	            exportDeclaration = this.finalize(node, new Node.ExportAllDeclaration(src));
	        }
	        else if (this.lookahead.type === 4 /* Keyword */) {
	            // export var f = 1;
	            var declaration = void 0;
	            switch (this.lookahead.value) {
	                case 'let':
	                case 'const':
	                    declaration = this.parseLexicalDeclaration({ inFor: false });
	                    break;
	                case 'var':
	                case 'class':
	                case 'function':
	                    declaration = this.parseStatementListItem();
	                    break;
	                default:
	                    this.throwUnexpectedToken(this.lookahead);
	            }
	            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
	        }
	        else if (this.matchAsyncFunction()) {
	            var declaration = this.parseFunctionDeclaration();
	            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
	        }
	        else {
	            var specifiers = [];
	            var source = null;
	            var isExportFromIdentifier = false;
	            this.expect('{');
	            while (!this.match('}')) {
	                isExportFromIdentifier = isExportFromIdentifier || this.matchKeyword('default');
	                specifiers.push(this.parseExportSpecifier());
	                if (!this.match('}')) {
	                    this.expect(',');
	                }
	            }
	            this.expect('}');
	            if (this.matchContextualKeyword('from')) {
	                // export {default} from 'foo';
	                // export {foo} from 'foo';
	                this.nextToken();
	                source = this.parseModuleSpecifier();
	                this.consumeSemicolon();
	            }
	            else if (isExportFromIdentifier) {
	                // export {default}; // missing fromClause
	                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
	                this.throwError(message, this.lookahead.value);
	            }
	            else {
	                // export {foo};
	                this.consumeSemicolon();
	            }
	            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(null, specifiers, source));
	        }
	        return exportDeclaration;
	    };
	    return Parser;
	}());
	exports.Parser = Parser;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	// Ensure the condition is true, otherwise throw an error.
	// This is only to have a better contract semantic, i.e. another safety net
	// to catch a logic error. The condition shall be fulfilled in normal case.
	// Do NOT use this to enforce a certain condition on any user input.
	Object.defineProperty(exports, "__esModule", { value: true });
	function assert(condition, message) {
	    /* istanbul ignore if */
	    if (!condition) {
	        throw new Error('ASSERT: ' + message);
	    }
	}
	exports.assert = assert;


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	/* tslint:disable:max-classes-per-file */
	Object.defineProperty(exports, "__esModule", { value: true });
	var ErrorHandler = (function () {
	    function ErrorHandler() {
	        this.errors = [];
	        this.tolerant = false;
	    }
	    ErrorHandler.prototype.recordError = function (error) {
	        this.errors.push(error);
	    };
	    ErrorHandler.prototype.tolerate = function (error) {
	        if (this.tolerant) {
	            this.recordError(error);
	        }
	        else {
	            throw error;
	        }
	    };
	    ErrorHandler.prototype.constructError = function (msg, column) {
	        var error = new Error(msg);
	        try {
	            throw error;
	        }
	        catch (base) {
	            /* istanbul ignore else */
	            if (Object.create && Object.defineProperty) {
	                error = Object.create(base);
	                Object.defineProperty(error, 'column', { value: column });
	            }
	        }
	        /* istanbul ignore next */
	        return error;
	    };
	    ErrorHandler.prototype.createError = function (index, line, col, description) {
	        var msg = 'Line ' + line + ': ' + description;
	        var error = this.constructError(msg, col);
	        error.index = index;
	        error.lineNumber = line;
	        error.description = description;
	        return error;
	    };
	    ErrorHandler.prototype.throwError = function (index, line, col, description) {
	        throw this.createError(index, line, col, description);
	    };
	    ErrorHandler.prototype.tolerateError = function (index, line, col, description) {
	        var error = this.createError(index, line, col, description);
	        if (this.tolerant) {
	            this.recordError(error);
	        }
	        else {
	            throw error;
	        }
	    };
	    return ErrorHandler;
	}());
	exports.ErrorHandler = ErrorHandler;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	// Error messages should be identical to V8.
	exports.Messages = {
	    BadGetterArity: 'Getter must not have any formal parameters',
	    BadSetterArity: 'Setter must have exactly one formal parameter',
	    BadSetterRestParameter: 'Setter function argument must not be a rest parameter',
	    ConstructorIsAsync: 'Class constructor may not be an async method',
	    ConstructorSpecialMethod: 'Class constructor may not be an accessor',
	    DeclarationMissingInitializer: 'Missing initializer in %0 declaration',
	    DefaultRestParameter: 'Unexpected token =',
	    DuplicateBinding: 'Duplicate binding %0',
	    DuplicateConstructor: 'A class may only have one constructor',
	    DuplicateProtoProperty: 'Duplicate __proto__ fields are not allowed in object literals',
	    ForInOfLoopInitializer: '%0 loop variable declaration may not have an initializer',
	    GeneratorInLegacyContext: 'Generator declarations are not allowed in legacy contexts',
	    IllegalBreak: 'Illegal break statement',
	    IllegalContinue: 'Illegal continue statement',
	    IllegalExportDeclaration: 'Unexpected token',
	    IllegalImportDeclaration: 'Unexpected token',
	    IllegalLanguageModeDirective: 'Illegal \'use strict\' directive in function with non-simple parameter list',
	    IllegalReturn: 'Illegal return statement',
	    InvalidEscapedReservedWord: 'Keyword must not contain escaped characters',
	    InvalidHexEscapeSequence: 'Invalid hexadecimal escape sequence',
	    InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
	    InvalidLHSInForIn: 'Invalid left-hand side in for-in',
	    InvalidLHSInForLoop: 'Invalid left-hand side in for-loop',
	    InvalidModuleSpecifier: 'Unexpected token',
	    InvalidRegExp: 'Invalid regular expression',
	    LetInLexicalBinding: 'let is disallowed as a lexically bound name',
	    MissingFromClause: 'Unexpected token',
	    MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
	    NewlineAfterThrow: 'Illegal newline after throw',
	    NoAsAfterImportNamespace: 'Unexpected token',
	    NoCatchOrFinally: 'Missing catch or finally after try',
	    ParameterAfterRestParameter: 'Rest parameter must be last formal parameter',
	    Redeclaration: '%0 \'%1\' has already been declared',
	    StaticPrototype: 'Classes may not have static property named prototype',
	    StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
	    StrictDelete: 'Delete of an unqualified identifier in strict mode.',
	    StrictFunction: 'In strict mode code, functions can only be declared at top level or inside a block',
	    StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
	    StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
	    StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
	    StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
	    StrictModeWith: 'Strict mode code may not include a with statement',
	    StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
	    StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
	    StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
	    StrictReservedWord: 'Use of future reserved word in strict mode',
	    StrictVarName: 'Variable name may not be eval or arguments in strict mode',
	    TemplateOctalLiteral: 'Octal literals are not allowed in template strings.',
	    UnexpectedEOS: 'Unexpected end of input',
	    UnexpectedIdentifier: 'Unexpected identifier',
	    UnexpectedNumber: 'Unexpected number',
	    UnexpectedReserved: 'Unexpected reserved word',
	    UnexpectedString: 'Unexpected string',
	    UnexpectedTemplate: 'Unexpected quasi %0',
	    UnexpectedToken: 'Unexpected token %0',
	    UnexpectedTokenIllegal: 'Unexpected token ILLEGAL',
	    UnknownLabel: 'Undefined label \'%0\'',
	    UnterminatedRegExp: 'Invalid regular expression: missing /'
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var assert_1 = __webpack_require__(9);
	var character_1 = __webpack_require__(4);
	var messages_1 = __webpack_require__(11);
	function hexValue(ch) {
	    return '0123456789abcdef'.indexOf(ch.toLowerCase());
	}
	function octalValue(ch) {
	    return '01234567'.indexOf(ch);
	}
	var Scanner = (function () {
	    function Scanner(code, handler) {
	        this.source = code;
	        this.errorHandler = handler;
	        this.trackComment = false;
	        this.isModule = false;
	        this.length = code.length;
	        this.index = 0;
	        this.lineNumber = (code.length > 0) ? 1 : 0;
	        this.lineStart = 0;
	        this.curlyStack = [];
	    }
	    Scanner.prototype.saveState = function () {
	        return {
	            index: this.index,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart
	        };
	    };
	    Scanner.prototype.restoreState = function (state) {
	        this.index = state.index;
	        this.lineNumber = state.lineNumber;
	        this.lineStart = state.lineStart;
	    };
	    Scanner.prototype.eof = function () {
	        return this.index >= this.length;
	    };
	    Scanner.prototype.throwUnexpectedToken = function (message) {
	        if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
	        return this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
	    };
	    Scanner.prototype.tolerateUnexpectedToken = function (message) {
	        if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
	        this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
	    };
	    // https://tc39.github.io/ecma262/#sec-comments
	    Scanner.prototype.skipSingleLineComment = function (offset) {
	        var comments = [];
	        var start, loc;
	        if (this.trackComment) {
	            comments = [];
	            start = this.index - offset;
	            loc = {
	                start: {
	                    line: this.lineNumber,
	                    column: this.index - this.lineStart - offset
	                },
	                end: {}
	            };
	        }
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            ++this.index;
	            if (character_1.Character.isLineTerminator(ch)) {
	                if (this.trackComment) {
	                    loc.end = {
	                        line: this.lineNumber,
	                        column: this.index - this.lineStart - 1
	                    };
	                    var entry = {
	                        multiLine: false,
	                        slice: [start + offset, this.index - 1],
	                        range: [start, this.index - 1],
	                        loc: loc
	                    };
	                    comments.push(entry);
	                }
	                if (ch === 13 && this.source.charCodeAt(this.index) === 10) {
	                    ++this.index;
	                }
	                ++this.lineNumber;
	                this.lineStart = this.index;
	                return comments;
	            }
	        }
	        if (this.trackComment) {
	            loc.end = {
	                line: this.lineNumber,
	                column: this.index - this.lineStart
	            };
	            var entry = {
	                multiLine: false,
	                slice: [start + offset, this.index],
	                range: [start, this.index],
	                loc: loc
	            };
	            comments.push(entry);
	        }
	        return comments;
	    };
	    Scanner.prototype.skipMultiLineComment = function () {
	        var comments = [];
	        var start, loc;
	        if (this.trackComment) {
	            comments = [];
	            start = this.index - 2;
	            loc = {
	                start: {
	                    line: this.lineNumber,
	                    column: this.index - this.lineStart - 2
	                },
	                end: {}
	            };
	        }
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            if (character_1.Character.isLineTerminator(ch)) {
	                if (ch === 0x0D && this.source.charCodeAt(this.index + 1) === 0x0A) {
	                    ++this.index;
	                }
	                ++this.lineNumber;
	                ++this.index;
	                this.lineStart = this.index;
	            }
	            else if (ch === 0x2A) {
	                // Block comment ends with '*/'.
	                if (this.source.charCodeAt(this.index + 1) === 0x2F) {
	                    this.index += 2;
	                    if (this.trackComment) {
	                        loc.end = {
	                            line: this.lineNumber,
	                            column: this.index - this.lineStart
	                        };
	                        var entry = {
	                            multiLine: true,
	                            slice: [start + 2, this.index - 2],
	                            range: [start, this.index],
	                            loc: loc
	                        };
	                        comments.push(entry);
	                    }
	                    return comments;
	                }
	                ++this.index;
	            }
	            else {
	                ++this.index;
	            }
	        }
	        // Ran off the end of the file - the whole thing is a comment
	        if (this.trackComment) {
	            loc.end = {
	                line: this.lineNumber,
	                column: this.index - this.lineStart
	            };
	            var entry = {
	                multiLine: true,
	                slice: [start + 2, this.index],
	                range: [start, this.index],
	                loc: loc
	            };
	            comments.push(entry);
	        }
	        this.tolerateUnexpectedToken();
	        return comments;
	    };
	    Scanner.prototype.scanComments = function () {
	        var comments;
	        if (this.trackComment) {
	            comments = [];
	        }
	        var start = (this.index === 0);
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            if (character_1.Character.isWhiteSpace(ch)) {
	                ++this.index;
	            }
	            else if (character_1.Character.isLineTerminator(ch)) {
	                ++this.index;
	                if (ch === 0x0D && this.source.charCodeAt(this.index) === 0x0A) {
	                    ++this.index;
	                }
	                ++this.lineNumber;
	                this.lineStart = this.index;
	                start = true;
	            }
	            else if (ch === 0x2F) {
	                ch = this.source.charCodeAt(this.index + 1);
	                if (ch === 0x2F) {
	                    this.index += 2;
	                    var comment = this.skipSingleLineComment(2);
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                    start = true;
	                }
	                else if (ch === 0x2A) {
	                    this.index += 2;
	                    var comment = this.skipMultiLineComment();
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                }
	                else {
	                    break;
	                }
	            }
	            else if (start && ch === 0x2D) {
	                // U+003E is '>'
	                if ((this.source.charCodeAt(this.index + 1) === 0x2D) && (this.source.charCodeAt(this.index + 2) === 0x3E)) {
	                    // '-->' is a single-line comment
	                    this.index += 3;
	                    var comment = this.skipSingleLineComment(3);
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                }
	                else {
	                    break;
	                }
	            }
	            else if (ch === 0x3C && !this.isModule) {
	                if (this.source.slice(this.index + 1, this.index + 4) === '!--') {
	                    this.index += 4; // `<!--`
	                    var comment = this.skipSingleLineComment(4);
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                }
	                else {
	                    break;
	                }
	            }
	            else {
	                break;
	            }
	        }
	        return comments;
	    };
	    // https://tc39.github.io/ecma262/#sec-future-reserved-words
	    Scanner.prototype.isFutureReservedWord = function (id) {
	        switch (id) {
	            case 'enum':
	            case 'export':
	            case 'import':
	            case 'super':
	                return true;
	            default:
	                return false;
	        }
	    };
	    Scanner.prototype.isStrictModeReservedWord = function (id) {
	        switch (id) {
	            case 'implements':
	            case 'interface':
	            case 'package':
	            case 'private':
	            case 'protected':
	            case 'public':
	            case 'static':
	            case 'yield':
	            case 'let':
	                return true;
	            default:
	                return false;
	        }
	    };
	    Scanner.prototype.isRestrictedWord = function (id) {
	        return id === 'eval' || id === 'arguments';
	    };
	    // https://tc39.github.io/ecma262/#sec-keywords
	    Scanner.prototype.isKeyword = function (id) {
	        switch (id.length) {
	            case 2:
	                return (id === 'if') || (id === 'in') || (id === 'do');
	            case 3:
	                return (id === 'var') || (id === 'for') || (id === 'new') ||
	                    (id === 'try') || (id === 'let');
	            case 4:
	                return (id === 'this') || (id === 'else') || (id === 'case') ||
	                    (id === 'void') || (id === 'with') || (id === 'enum');
	            case 5:
	                return (id === 'while') || (id === 'break') || (id === 'catch') ||
	                    (id === 'throw') || (id === 'const') || (id === 'yield') ||
	                    (id === 'class') || (id === 'super');
	            case 6:
	                return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
	                    (id === 'switch') || (id === 'export') || (id === 'import');
	            case 7:
	                return (id === 'default') || (id === 'finally') || (id === 'extends');
	            case 8:
	                return (id === 'function') || (id === 'continue') || (id === 'debugger');
	            case 10:
	                return (id === 'instanceof');
	            default:
	                return false;
	        }
	    };
	    Scanner.prototype.codePointAt = function (i) {
	        var cp = this.source.charCodeAt(i);
	        if (cp >= 0xD800 && cp <= 0xDBFF) {
	            var second = this.source.charCodeAt(i + 1);
	            if (second >= 0xDC00 && second <= 0xDFFF) {
	                var first = cp;
	                cp = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
	            }
	        }
	        return cp;
	    };
	    Scanner.prototype.scanHexEscape = function (prefix) {
	        var len = (prefix === 'u') ? 4 : 2;
	        var code = 0;
	        for (var i = 0; i < len; ++i) {
	            if (!this.eof() && character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
	                code = code * 16 + hexValue(this.source[this.index++]);
	            }
	            else {
	                return null;
	            }
	        }
	        return String.fromCharCode(code);
	    };
	    Scanner.prototype.scanUnicodeCodePointEscape = function () {
	        var ch = this.source[this.index];
	        var code = 0;
	        // At least, one hex digit is required.
	        if (ch === '}') {
	            this.throwUnexpectedToken();
	        }
	        while (!this.eof()) {
	            ch = this.source[this.index++];
	            if (!character_1.Character.isHexDigit(ch.charCodeAt(0))) {
	                break;
	            }
	            code = code * 16 + hexValue(ch);
	        }
	        if (code > 0x10FFFF || ch !== '}') {
	            this.throwUnexpectedToken();
	        }
	        return character_1.Character.fromCodePoint(code);
	    };
	    Scanner.prototype.getIdentifier = function () {
	        var start = this.index++;
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            if (ch === 0x5C) {
	                // Blackslash (U+005C) marks Unicode escape sequence.
	                this.index = start;
	                return this.getComplexIdentifier();
	            }
	            else if (ch >= 0xD800 && ch < 0xDFFF) {
	                // Need to handle surrogate pairs.
	                this.index = start;
	                return this.getComplexIdentifier();
	            }
	            if (character_1.Character.isIdentifierPart(ch)) {
	                ++this.index;
	            }
	            else {
	                break;
	            }
	        }
	        return this.source.slice(start, this.index);
	    };
	    Scanner.prototype.getComplexIdentifier = function () {
	        var cp = this.codePointAt(this.index);
	        var id = character_1.Character.fromCodePoint(cp);
	        this.index += id.length;
	        // '\u' (U+005C, U+0075) denotes an escaped character.
	        var ch;
	        if (cp === 0x5C) {
	            if (this.source.charCodeAt(this.index) !== 0x75) {
	                this.throwUnexpectedToken();
	            }
	            ++this.index;
	            if (this.source[this.index] === '{') {
	                ++this.index;
	                ch = this.scanUnicodeCodePointEscape();
	            }
	            else {
	                ch = this.scanHexEscape('u');
	                if (ch === null || ch === '\\' || !character_1.Character.isIdentifierStart(ch.charCodeAt(0))) {
	                    this.throwUnexpectedToken();
	                }
	            }
	            id = ch;
	        }
	        while (!this.eof()) {
	            cp = this.codePointAt(this.index);
	            if (!character_1.Character.isIdentifierPart(cp)) {
	                break;
	            }
	            ch = character_1.Character.fromCodePoint(cp);
	            id += ch;
	            this.index += ch.length;
	            // '\u' (U+005C, U+0075) denotes an escaped character.
	            if (cp === 0x5C) {
	                id = id.substr(0, id.length - 1);
	                if (this.source.charCodeAt(this.index) !== 0x75) {
	                    this.throwUnexpectedToken();
	                }
	                ++this.index;
	                if (this.source[this.index] === '{') {
	                    ++this.index;
	                    ch = this.scanUnicodeCodePointEscape();
	                }
	                else {
	                    ch = this.scanHexEscape('u');
	                    if (ch === null || ch === '\\' || !character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
	                        this.throwUnexpectedToken();
	                    }
	                }
	                id += ch;
	            }
	        }
	        return id;
	    };
	    Scanner.prototype.octalToDecimal = function (ch) {
	        // \0 is not octal escape sequence
	        var octal = (ch !== '0');
	        var code = octalValue(ch);
	        if (!this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
	            octal = true;
	            code = code * 8 + octalValue(this.source[this.index++]);
	            // 3 digits are only allowed when string starts
	            // with 0, 1, 2, 3
	            if ('0123'.indexOf(ch) >= 0 && !this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
	                code = code * 8 + octalValue(this.source[this.index++]);
	            }
	        }
	        return {
	            code: code,
	            octal: octal
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-names-and-keywords
	    Scanner.prototype.scanIdentifier = function () {
	        var type;
	        var start = this.index;
	        // Backslash (U+005C) starts an escaped character.
	        var id = (this.source.charCodeAt(start) === 0x5C) ? this.getComplexIdentifier() : this.getIdentifier();
	        // There is no keyword or literal with only one character.
	        // Thus, it must be an identifier.
	        if (id.length === 1) {
	            type = 3 /* Identifier */;
	        }
	        else if (this.isKeyword(id)) {
	            type = 4 /* Keyword */;
	        }
	        else if (id === 'null') {
	            type = 5 /* NullLiteral */;
	        }
	        else if (id === 'true' || id === 'false') {
	            type = 1 /* BooleanLiteral */;
	        }
	        else {
	            type = 3 /* Identifier */;
	        }
	        if (type !== 3 /* Identifier */ && (start + id.length !== this.index)) {
	            var restore = this.index;
	            this.index = start;
	            this.tolerateUnexpectedToken(messages_1.Messages.InvalidEscapedReservedWord);
	            this.index = restore;
	        }
	        return {
	            type: type,
	            value: id,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-punctuators
	    Scanner.prototype.scanPunctuator = function () {
	        var start = this.index;
	        // Check for most common single-character punctuators.
	        var str = this.source[this.index];
	        switch (str) {
	            case '(':
	            case '{':
	                if (str === '{') {
	                    this.curlyStack.push('{');
	                }
	                ++this.index;
	                break;
	            case '.':
	                ++this.index;
	                if (this.source[this.index] === '.' && this.source[this.index + 1] === '.') {
	                    // Spread operator: ...
	                    this.index += 2;
	                    str = '...';
	                }
	                break;
	            case '}':
	                ++this.index;
	                this.curlyStack.pop();
	                break;
	            case ')':
	            case ';':
	            case ',':
	            case '[':
	            case ']':
	            case ':':
	            case '?':
	            case '~':
	                ++this.index;
	                break;
	            default:
	                // 4-character punctuator.
	                str = this.source.substr(this.index, 4);
	                if (str === '>>>=') {
	                    this.index += 4;
	                }
	                else {
	                    // 3-character punctuators.
	                    str = str.substr(0, 3);
	                    if (str === '===' || str === '!==' || str === '>>>' ||
	                        str === '<<=' || str === '>>=' || str === '**=') {
	                        this.index += 3;
	                    }
	                    else {
	                        // 2-character punctuators.
	                        str = str.substr(0, 2);
	                        if (str === '&&' || str === '||' || str === '==' || str === '!=' ||
	                            str === '+=' || str === '-=' || str === '*=' || str === '/=' ||
	                            str === '++' || str === '--' || str === '<<' || str === '>>' ||
	                            str === '&=' || str === '|=' || str === '^=' || str === '%=' ||
	                            str === '<=' || str === '>=' || str === '=>' || str === '**') {
	                            this.index += 2;
	                        }
	                        else {
	                            // 1-character punctuators.
	                            str = this.source[this.index];
	                            if ('<>=!+-*%&|^/'.indexOf(str) >= 0) {
	                                ++this.index;
	                            }
	                        }
	                    }
	                }
	        }
	        if (this.index === start) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 7 /* Punctuator */,
	            value: str,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
	    Scanner.prototype.scanHexLiteral = function (start) {
	        var num = '';
	        while (!this.eof()) {
	            if (!character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
	                break;
	            }
	            num += this.source[this.index++];
	        }
	        if (num.length === 0) {
	            this.throwUnexpectedToken();
	        }
	        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 6 /* NumericLiteral */,
	            value: parseInt('0x' + num, 16),
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    Scanner.prototype.scanBinaryLiteral = function (start) {
	        var num = '';
	        var ch;
	        while (!this.eof()) {
	            ch = this.source[this.index];
	            if (ch !== '0' && ch !== '1') {
	                break;
	            }
	            num += this.source[this.index++];
	        }
	        if (num.length === 0) {
	            // only 0b or 0B
	            this.throwUnexpectedToken();
	        }
	        if (!this.eof()) {
	            ch = this.source.charCodeAt(this.index);
	            /* istanbul ignore else */
	            if (character_1.Character.isIdentifierStart(ch) || character_1.Character.isDecimalDigit(ch)) {
	                this.throwUnexpectedToken();
	            }
	        }
	        return {
	            type: 6 /* NumericLiteral */,
	            value: parseInt(num, 2),
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    Scanner.prototype.scanOctalLiteral = function (prefix, start) {
	        var num = '';
	        var octal = false;
	        if (character_1.Character.isOctalDigit(prefix.charCodeAt(0))) {
	            octal = true;
	            num = '0' + this.source[this.index++];
	        }
	        else {
	            ++this.index;
	        }
	        while (!this.eof()) {
	            if (!character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
	                break;
	            }
	            num += this.source[this.index++];
	        }
	        if (!octal && num.length === 0) {
	            // only 0o or 0O
	            this.throwUnexpectedToken();
	        }
	        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 6 /* NumericLiteral */,
	            value: parseInt(num, 8),
	            octal: octal,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    Scanner.prototype.isImplicitOctalLiteral = function () {
	        // Implicit octal, unless there is a non-octal digit.
	        // (Annex B.1.1 on Numeric Literals)
	        for (var i = this.index + 1; i < this.length; ++i) {
	            var ch = this.source[i];
	            if (ch === '8' || ch === '9') {
	                return false;
	            }
	            if (!character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                return true;
	            }
	        }
	        return true;
	    };
	    Scanner.prototype.scanNumericLiteral = function () {
	        var start = this.index;
	        var ch = this.source[start];
	        assert_1.assert(character_1.Character.isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'), 'Numeric literal must start with a decimal digit or a decimal point');
	        var num = '';
	        if (ch !== '.') {
	            num = this.source[this.index++];
	            ch = this.source[this.index];
	            // Hex number starts with '0x'.
	            // Octal number starts with '0'.
	            // Octal number in ES6 starts with '0o'.
	            // Binary number in ES6 starts with '0b'.
	            if (num === '0') {
	                if (ch === 'x' || ch === 'X') {
	                    ++this.index;
	                    return this.scanHexLiteral(start);
	                }
	                if (ch === 'b' || ch === 'B') {
	                    ++this.index;
	                    return this.scanBinaryLiteral(start);
	                }
	                if (ch === 'o' || ch === 'O') {
	                    return this.scanOctalLiteral(ch, start);
	                }
	                if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                    if (this.isImplicitOctalLiteral()) {
	                        return this.scanOctalLiteral(ch, start);
	                    }
	                }
	            }
	            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                num += this.source[this.index++];
	            }
	            ch = this.source[this.index];
	        }
	        if (ch === '.') {
	            num += this.source[this.index++];
	            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                num += this.source[this.index++];
	            }
	            ch = this.source[this.index];
	        }
	        if (ch === 'e' || ch === 'E') {
	            num += this.source[this.index++];
	            ch = this.source[this.index];
	            if (ch === '+' || ch === '-') {
	                num += this.source[this.index++];
	            }
	            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                    num += this.source[this.index++];
	                }
	            }
	            else {
	                this.throwUnexpectedToken();
	            }
	        }
	        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 6 /* NumericLiteral */,
	            value: parseFloat(num),
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-literals-string-literals
	    Scanner.prototype.scanStringLiteral = function () {
	        var start = this.index;
	        var quote = this.source[start];
	        assert_1.assert((quote === '\'' || quote === '"'), 'String literal must starts with a quote');
	        ++this.index;
	        var octal = false;
	        var str = '';
	        while (!this.eof()) {
	            var ch = this.source[this.index++];
	            if (ch === quote) {
	                quote = '';
	                break;
	            }
	            else if (ch === '\\') {
	                ch = this.source[this.index++];
	                if (!ch || !character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                    switch (ch) {
	                        case 'u':
	                            if (this.source[this.index] === '{') {
	                                ++this.index;
	                                str += this.scanUnicodeCodePointEscape();
	                            }
	                            else {
	                                var unescaped_1 = this.scanHexEscape(ch);
	                                if (unescaped_1 === null) {
	                                    this.throwUnexpectedToken();
	                                }
	                                str += unescaped_1;
	                            }
	                            break;
	                        case 'x':
	                            var unescaped = this.scanHexEscape(ch);
	                            if (unescaped === null) {
	                                this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
	                            }
	                            str += unescaped;
	                            break;
	                        case 'n':
	                            str += '\n';
	                            break;
	                        case 'r':
	                            str += '\r';
	                            break;
	                        case 't':
	                            str += '\t';
	                            break;
	                        case 'b':
	                            str += '\b';
	                            break;
	                        case 'f':
	                            str += '\f';
	                            break;
	                        case 'v':
	                            str += '\x0B';
	                            break;
	                        case '8':
	                        case '9':
	                            str += ch;
	                            this.tolerateUnexpectedToken();
	                            break;
	                        default:
	                            if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                                var octToDec = this.octalToDecimal(ch);
	                                octal = octToDec.octal || octal;
	                                str += String.fromCharCode(octToDec.code);
	                            }
	                            else {
	                                str += ch;
	                            }
	                            break;
	                    }
	                }
	                else {
	                    ++this.lineNumber;
	                    if (ch === '\r' && this.source[this.index] === '\n') {
	                        ++this.index;
	                    }
	                    this.lineStart = this.index;
	                }
	            }
	            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                break;
	            }
	            else {
	                str += ch;
	            }
	        }
	        if (quote !== '') {
	            this.index = start;
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 8 /* StringLiteral */,
	            value: str,
	            octal: octal,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-template-literal-lexical-components
	    Scanner.prototype.scanTemplate = function () {
	        var cooked = '';
	        var terminated = false;
	        var start = this.index;
	        var head = (this.source[start] === '`');
	        var tail = false;
	        var rawOffset = 2;
	        ++this.index;
	        while (!this.eof()) {
	            var ch = this.source[this.index++];
	            if (ch === '`') {
	                rawOffset = 1;
	                tail = true;
	                terminated = true;
	                break;
	            }
	            else if (ch === '$') {
	                if (this.source[this.index] === '{') {
	                    this.curlyStack.push('${');
	                    ++this.index;
	                    terminated = true;
	                    break;
	                }
	                cooked += ch;
	            }
	            else if (ch === '\\') {
	                ch = this.source[this.index++];
	                if (!character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                    switch (ch) {
	                        case 'n':
	                            cooked += '\n';
	                            break;
	                        case 'r':
	                            cooked += '\r';
	                            break;
	                        case 't':
	                            cooked += '\t';
	                            break;
	                        case 'u':
	                            if (this.source[this.index] === '{') {
	                                ++this.index;
	                                cooked += this.scanUnicodeCodePointEscape();
	                            }
	                            else {
	                                var restore = this.index;
	                                var unescaped_2 = this.scanHexEscape(ch);
	                                if (unescaped_2 !== null) {
	                                    cooked += unescaped_2;
	                                }
	                                else {
	                                    this.index = restore;
	                                    cooked += ch;
	                                }
	                            }
	                            break;
	                        case 'x':
	                            var unescaped = this.scanHexEscape(ch);
	                            if (unescaped === null) {
	                                this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
	                            }
	                            cooked += unescaped;
	                            break;
	                        case 'b':
	                            cooked += '\b';
	                            break;
	                        case 'f':
	                            cooked += '\f';
	                            break;
	                        case 'v':
	                            cooked += '\v';
	                            break;
	                        default:
	                            if (ch === '0') {
	                                if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                                    // Illegal: \01 \02 and so on
	                                    this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
	                                }
	                                cooked += '\0';
	                            }
	                            else if (character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                                // Illegal: \1 \2
	                                this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
	                            }
	                            else {
	                                cooked += ch;
	                            }
	                            break;
	                    }
	                }
	                else {
	                    ++this.lineNumber;
	                    if (ch === '\r' && this.source[this.index] === '\n') {
	                        ++this.index;
	                    }
	                    this.lineStart = this.index;
	                }
	            }
	            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                ++this.lineNumber;
	                if (ch === '\r' && this.source[this.index] === '\n') {
	                    ++this.index;
	                }
	                this.lineStart = this.index;
	                cooked += '\n';
	            }
	            else {
	                cooked += ch;
	            }
	        }
	        if (!terminated) {
	            this.throwUnexpectedToken();
	        }
	        if (!head) {
	            this.curlyStack.pop();
	        }
	        return {
	            type: 10 /* Template */,
	            value: this.source.slice(start + 1, this.index - rawOffset),
	            cooked: cooked,
	            head: head,
	            tail: tail,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
	    Scanner.prototype.testRegExp = function (pattern, flags) {
	        // The BMP character to use as a replacement for astral symbols when
	        // translating an ES6 "u"-flagged pattern to an ES5-compatible
	        // approximation.
	        // Note: replacing with '\uFFFF' enables false positives in unlikely
	        // scenarios. For example, `[\u{1044f}-\u{10440}]` is an invalid
	        // pattern that would not be detected by this substitution.
	        var astralSubstitute = '\uFFFF';
	        var tmp = pattern;
	        var self = this;
	        if (flags.indexOf('u') >= 0) {
	            tmp = tmp
	                .replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function ($0, $1, $2) {
	                var codePoint = parseInt($1 || $2, 16);
	                if (codePoint > 0x10FFFF) {
	                    self.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
	                }
	                if (codePoint <= 0xFFFF) {
	                    return String.fromCharCode(codePoint);
	                }
	                return astralSubstitute;
	            })
	                .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, astralSubstitute);
	        }
	        // First, detect invalid regular expressions.
	        try {
	            RegExp(tmp);
	        }
	        catch (e) {
	            this.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
	        }
	        // Return a regular expression object for this pattern-flag pair, or
	        // `null` in case the current environment doesn't support the flags it
	        // uses.
	        try {
	            return new RegExp(pattern, flags);
	        }
	        catch (exception) {
	            /* istanbul ignore next */
	            return null;
	        }
	    };
	    Scanner.prototype.scanRegExpBody = function () {
	        var ch = this.source[this.index];
	        assert_1.assert(ch === '/', 'Regular expression literal must start with a slash');
	        var str = this.source[this.index++];
	        var classMarker = false;
	        var terminated = false;
	        while (!this.eof()) {
	            ch = this.source[this.index++];
	            str += ch;
	            if (ch === '\\') {
	                ch = this.source[this.index++];
	                // https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
	                if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                    this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
	                }
	                str += ch;
	            }
	            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
	            }
	            else if (classMarker) {
	                if (ch === ']') {
	                    classMarker = false;
	                }
	            }
	            else {
	                if (ch === '/') {
	                    terminated = true;
	                    break;
	                }
	                else if (ch === '[') {
	                    classMarker = true;
	                }
	            }
	        }
	        if (!terminated) {
	            this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
	        }
	        // Exclude leading and trailing slash.
	        return str.substr(1, str.length - 2);
	    };
	    Scanner.prototype.scanRegExpFlags = function () {
	        var str = '';
	        var flags = '';
	        while (!this.eof()) {
	            var ch = this.source[this.index];
	            if (!character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
	                break;
	            }
	            ++this.index;
	            if (ch === '\\' && !this.eof()) {
	                ch = this.source[this.index];
	                if (ch === 'u') {
	                    ++this.index;
	                    var restore = this.index;
	                    var char = this.scanHexEscape('u');
	                    if (char !== null) {
	                        flags += char;
	                        for (str += '\\u'; restore < this.index; ++restore) {
	                            str += this.source[restore];
	                        }
	                    }
	                    else {
	                        this.index = restore;
	                        flags += 'u';
	                        str += '\\u';
	                    }
	                    this.tolerateUnexpectedToken();
	                }
	                else {
	                    str += '\\';
	                    this.tolerateUnexpectedToken();
	                }
	            }
	            else {
	                flags += ch;
	                str += ch;
	            }
	        }
	        return flags;
	    };
	    Scanner.prototype.scanRegExp = function () {
	        var start = this.index;
	        var pattern = this.scanRegExpBody();
	        var flags = this.scanRegExpFlags();
	        var value = this.testRegExp(pattern, flags);
	        return {
	            type: 9 /* RegularExpression */,
	            value: '',
	            pattern: pattern,
	            flags: flags,
	            regex: value,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    Scanner.prototype.lex = function () {
	        if (this.eof()) {
	            return {
	                type: 2 /* EOF */,
	                value: '',
	                lineNumber: this.lineNumber,
	                lineStart: this.lineStart,
	                start: this.index,
	                end: this.index
	            };
	        }
	        var cp = this.source.charCodeAt(this.index);
	        if (character_1.Character.isIdentifierStart(cp)) {
	            return this.scanIdentifier();
	        }
	        // Very common: ( and ) and ;
	        if (cp === 0x28 || cp === 0x29 || cp === 0x3B) {
	            return this.scanPunctuator();
	        }
	        // String literal starts with single quote (U+0027) or double quote (U+0022).
	        if (cp === 0x27 || cp === 0x22) {
	            return this.scanStringLiteral();
	        }
	        // Dot (.) U+002E can also start a floating-point number, hence the need
	        // to check the next character.
	        if (cp === 0x2E) {
	            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1))) {
	                return this.scanNumericLiteral();
	            }
	            return this.scanPunctuator();
	        }
	        if (character_1.Character.isDecimalDigit(cp)) {
	            return this.scanNumericLiteral();
	        }
	        // Template literals start with ` (U+0060) for template head
	        // or } (U+007D) for template middle or template tail.
	        if (cp === 0x60 || (cp === 0x7D && this.curlyStack[this.curlyStack.length - 1] === '${')) {
	            return this.scanTemplate();
	        }
	        // Possible identifier start in a surrogate pair.
	        if (cp >= 0xD800 && cp < 0xDFFF) {
	            if (character_1.Character.isIdentifierStart(this.codePointAt(this.index))) {
	                return this.scanIdentifier();
	            }
	        }
	        return this.scanPunctuator();
	    };
	    return Scanner;
	}());
	exports.Scanner = Scanner;


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TokenName = {};
	exports.TokenName[1 /* BooleanLiteral */] = 'Boolean';
	exports.TokenName[2 /* EOF */] = '<end>';
	exports.TokenName[3 /* Identifier */] = 'Identifier';
	exports.TokenName[4 /* Keyword */] = 'Keyword';
	exports.TokenName[5 /* NullLiteral */] = 'Null';
	exports.TokenName[6 /* NumericLiteral */] = 'Numeric';
	exports.TokenName[7 /* Punctuator */] = 'Punctuator';
	exports.TokenName[8 /* StringLiteral */] = 'String';
	exports.TokenName[9 /* RegularExpression */] = 'RegularExpression';
	exports.TokenName[10 /* Template */] = 'Template';


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	// Generated by generate-xhtml-entities.js. DO NOT MODIFY!
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.XHTMLEntities = {
	    quot: '\u0022',
	    amp: '\u0026',
	    apos: '\u0027',
	    gt: '\u003E',
	    nbsp: '\u00A0',
	    iexcl: '\u00A1',
	    cent: '\u00A2',
	    pound: '\u00A3',
	    curren: '\u00A4',
	    yen: '\u00A5',
	    brvbar: '\u00A6',
	    sect: '\u00A7',
	    uml: '\u00A8',
	    copy: '\u00A9',
	    ordf: '\u00AA',
	    laquo: '\u00AB',
	    not: '\u00AC',
	    shy: '\u00AD',
	    reg: '\u00AE',
	    macr: '\u00AF',
	    deg: '\u00B0',
	    plusmn: '\u00B1',
	    sup2: '\u00B2',
	    sup3: '\u00B3',
	    acute: '\u00B4',
	    micro: '\u00B5',
	    para: '\u00B6',
	    middot: '\u00B7',
	    cedil: '\u00B8',
	    sup1: '\u00B9',
	    ordm: '\u00BA',
	    raquo: '\u00BB',
	    frac14: '\u00BC',
	    frac12: '\u00BD',
	    frac34: '\u00BE',
	    iquest: '\u00BF',
	    Agrave: '\u00C0',
	    Aacute: '\u00C1',
	    Acirc: '\u00C2',
	    Atilde: '\u00C3',
	    Auml: '\u00C4',
	    Aring: '\u00C5',
	    AElig: '\u00C6',
	    Ccedil: '\u00C7',
	    Egrave: '\u00C8',
	    Eacute: '\u00C9',
	    Ecirc: '\u00CA',
	    Euml: '\u00CB',
	    Igrave: '\u00CC',
	    Iacute: '\u00CD',
	    Icirc: '\u00CE',
	    Iuml: '\u00CF',
	    ETH: '\u00D0',
	    Ntilde: '\u00D1',
	    Ograve: '\u00D2',
	    Oacute: '\u00D3',
	    Ocirc: '\u00D4',
	    Otilde: '\u00D5',
	    Ouml: '\u00D6',
	    times: '\u00D7',
	    Oslash: '\u00D8',
	    Ugrave: '\u00D9',
	    Uacute: '\u00DA',
	    Ucirc: '\u00DB',
	    Uuml: '\u00DC',
	    Yacute: '\u00DD',
	    THORN: '\u00DE',
	    szlig: '\u00DF',
	    agrave: '\u00E0',
	    aacute: '\u00E1',
	    acirc: '\u00E2',
	    atilde: '\u00E3',
	    auml: '\u00E4',
	    aring: '\u00E5',
	    aelig: '\u00E6',
	    ccedil: '\u00E7',
	    egrave: '\u00E8',
	    eacute: '\u00E9',
	    ecirc: '\u00EA',
	    euml: '\u00EB',
	    igrave: '\u00EC',
	    iacute: '\u00ED',
	    icirc: '\u00EE',
	    iuml: '\u00EF',
	    eth: '\u00F0',
	    ntilde: '\u00F1',
	    ograve: '\u00F2',
	    oacute: '\u00F3',
	    ocirc: '\u00F4',
	    otilde: '\u00F5',
	    ouml: '\u00F6',
	    divide: '\u00F7',
	    oslash: '\u00F8',
	    ugrave: '\u00F9',
	    uacute: '\u00FA',
	    ucirc: '\u00FB',
	    uuml: '\u00FC',
	    yacute: '\u00FD',
	    thorn: '\u00FE',
	    yuml: '\u00FF',
	    OElig: '\u0152',
	    oelig: '\u0153',
	    Scaron: '\u0160',
	    scaron: '\u0161',
	    Yuml: '\u0178',
	    fnof: '\u0192',
	    circ: '\u02C6',
	    tilde: '\u02DC',
	    Alpha: '\u0391',
	    Beta: '\u0392',
	    Gamma: '\u0393',
	    Delta: '\u0394',
	    Epsilon: '\u0395',
	    Zeta: '\u0396',
	    Eta: '\u0397',
	    Theta: '\u0398',
	    Iota: '\u0399',
	    Kappa: '\u039A',
	    Lambda: '\u039B',
	    Mu: '\u039C',
	    Nu: '\u039D',
	    Xi: '\u039E',
	    Omicron: '\u039F',
	    Pi: '\u03A0',
	    Rho: '\u03A1',
	    Sigma: '\u03A3',
	    Tau: '\u03A4',
	    Upsilon: '\u03A5',
	    Phi: '\u03A6',
	    Chi: '\u03A7',
	    Psi: '\u03A8',
	    Omega: '\u03A9',
	    alpha: '\u03B1',
	    beta: '\u03B2',
	    gamma: '\u03B3',
	    delta: '\u03B4',
	    epsilon: '\u03B5',
	    zeta: '\u03B6',
	    eta: '\u03B7',
	    theta: '\u03B8',
	    iota: '\u03B9',
	    kappa: '\u03BA',
	    lambda: '\u03BB',
	    mu: '\u03BC',
	    nu: '\u03BD',
	    xi: '\u03BE',
	    omicron: '\u03BF',
	    pi: '\u03C0',
	    rho: '\u03C1',
	    sigmaf: '\u03C2',
	    sigma: '\u03C3',
	    tau: '\u03C4',
	    upsilon: '\u03C5',
	    phi: '\u03C6',
	    chi: '\u03C7',
	    psi: '\u03C8',
	    omega: '\u03C9',
	    thetasym: '\u03D1',
	    upsih: '\u03D2',
	    piv: '\u03D6',
	    ensp: '\u2002',
	    emsp: '\u2003',
	    thinsp: '\u2009',
	    zwnj: '\u200C',
	    zwj: '\u200D',
	    lrm: '\u200E',
	    rlm: '\u200F',
	    ndash: '\u2013',
	    mdash: '\u2014',
	    lsquo: '\u2018',
	    rsquo: '\u2019',
	    sbquo: '\u201A',
	    ldquo: '\u201C',
	    rdquo: '\u201D',
	    bdquo: '\u201E',
	    dagger: '\u2020',
	    Dagger: '\u2021',
	    bull: '\u2022',
	    hellip: '\u2026',
	    permil: '\u2030',
	    prime: '\u2032',
	    Prime: '\u2033',
	    lsaquo: '\u2039',
	    rsaquo: '\u203A',
	    oline: '\u203E',
	    frasl: '\u2044',
	    euro: '\u20AC',
	    image: '\u2111',
	    weierp: '\u2118',
	    real: '\u211C',
	    trade: '\u2122',
	    alefsym: '\u2135',
	    larr: '\u2190',
	    uarr: '\u2191',
	    rarr: '\u2192',
	    darr: '\u2193',
	    harr: '\u2194',
	    crarr: '\u21B5',
	    lArr: '\u21D0',
	    uArr: '\u21D1',
	    rArr: '\u21D2',
	    dArr: '\u21D3',
	    hArr: '\u21D4',
	    forall: '\u2200',
	    part: '\u2202',
	    exist: '\u2203',
	    empty: '\u2205',
	    nabla: '\u2207',
	    isin: '\u2208',
	    notin: '\u2209',
	    ni: '\u220B',
	    prod: '\u220F',
	    sum: '\u2211',
	    minus: '\u2212',
	    lowast: '\u2217',
	    radic: '\u221A',
	    prop: '\u221D',
	    infin: '\u221E',
	    ang: '\u2220',
	    and: '\u2227',
	    or: '\u2228',
	    cap: '\u2229',
	    cup: '\u222A',
	    int: '\u222B',
	    there4: '\u2234',
	    sim: '\u223C',
	    cong: '\u2245',
	    asymp: '\u2248',
	    ne: '\u2260',
	    equiv: '\u2261',
	    le: '\u2264',
	    ge: '\u2265',
	    sub: '\u2282',
	    sup: '\u2283',
	    nsub: '\u2284',
	    sube: '\u2286',
	    supe: '\u2287',
	    oplus: '\u2295',
	    otimes: '\u2297',
	    perp: '\u22A5',
	    sdot: '\u22C5',
	    lceil: '\u2308',
	    rceil: '\u2309',
	    lfloor: '\u230A',
	    rfloor: '\u230B',
	    loz: '\u25CA',
	    spades: '\u2660',
	    clubs: '\u2663',
	    hearts: '\u2665',
	    diams: '\u2666',
	    lang: '\u27E8',
	    rang: '\u27E9'
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var error_handler_1 = __webpack_require__(10);
	var scanner_1 = __webpack_require__(12);
	var token_1 = __webpack_require__(13);
	var Reader = (function () {
	    function Reader() {
	        this.values = [];
	        this.curly = this.paren = -1;
	    }
	    // A function following one of those tokens is an expression.
	    Reader.prototype.beforeFunctionExpression = function (t) {
	        return ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new',
	            'return', 'case', 'delete', 'throw', 'void',
	            // assignment operators
	            '=', '+=', '-=', '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=',
	            '&=', '|=', '^=', ',',
	            // binary/unary operators
	            '+', '-', '*', '**', '/', '%', '++', '--', '<<', '>>', '>>>', '&',
	            '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=',
	            '<=', '<', '>', '!=', '!=='].indexOf(t) >= 0;
	    };
	    // Determine if forward slash (/) is an operator or part of a regular expression
	    // https://github.com/mozilla/sweet.js/wiki/design
	    Reader.prototype.isRegexStart = function () {
	        var previous = this.values[this.values.length - 1];
	        var regex = (previous !== null);
	        switch (previous) {
	            case 'this':
	            case ']':
	                regex = false;
	                break;
	            case ')':
	                var keyword = this.values[this.paren - 1];
	                regex = (keyword === 'if' || keyword === 'while' || keyword === 'for' || keyword === 'with');
	                break;
	            case '}':
	                // Dividing a function by anything makes little sense,
	                // but we have to check for that.
	                regex = false;
	                if (this.values[this.curly - 3] === 'function') {
	                    // Anonymous function, e.g. function(){} /42
	                    var check = this.values[this.curly - 4];
	                    regex = check ? !this.beforeFunctionExpression(check) : false;
	                }
	                else if (this.values[this.curly - 4] === 'function') {
	                    // Named function, e.g. function f(){} /42/
	                    var check = this.values[this.curly - 5];
	                    regex = check ? !this.beforeFunctionExpression(check) : true;
	                }
	                break;
	            default:
	                break;
	        }
	        return regex;
	    };
	    Reader.prototype.push = function (token) {
	        if (token.type === 7 /* Punctuator */ || token.type === 4 /* Keyword */) {
	            if (token.value === '{') {
	                this.curly = this.values.length;
	            }
	            else if (token.value === '(') {
	                this.paren = this.values.length;
	            }
	            this.values.push(token.value);
	        }
	        else {
	            this.values.push(null);
	        }
	    };
	    return Reader;
	}());
	var Tokenizer = (function () {
	    function Tokenizer(code, config) {
	        this.errorHandler = new error_handler_1.ErrorHandler();
	        this.errorHandler.tolerant = config ? (typeof config.tolerant === 'boolean' && config.tolerant) : false;
	        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
	        this.scanner.trackComment = config ? (typeof config.comment === 'boolean' && config.comment) : false;
	        this.trackRange = config ? (typeof config.range === 'boolean' && config.range) : false;
	        this.trackLoc = config ? (typeof config.loc === 'boolean' && config.loc) : false;
	        this.buffer = [];
	        this.reader = new Reader();
	    }
	    Tokenizer.prototype.errors = function () {
	        return this.errorHandler.errors;
	    };
	    Tokenizer.prototype.getNextToken = function () {
	        if (this.buffer.length === 0) {
	            var comments = this.scanner.scanComments();
	            if (this.scanner.trackComment) {
	                for (var i = 0; i < comments.length; ++i) {
	                    var e = comments[i];
	                    var value = this.scanner.source.slice(e.slice[0], e.slice[1]);
	                    var comment = {
	                        type: e.multiLine ? 'BlockComment' : 'LineComment',
	                        value: value
	                    };
	                    if (this.trackRange) {
	                        comment.range = e.range;
	                    }
	                    if (this.trackLoc) {
	                        comment.loc = e.loc;
	                    }
	                    this.buffer.push(comment);
	                }
	            }
	            if (!this.scanner.eof()) {
	                var loc = void 0;
	                if (this.trackLoc) {
	                    loc = {
	                        start: {
	                            line: this.scanner.lineNumber,
	                            column: this.scanner.index - this.scanner.lineStart
	                        },
	                        end: {}
	                    };
	                }
	                var startRegex = (this.scanner.source[this.scanner.index] === '/') && this.reader.isRegexStart();
	                var token = startRegex ? this.scanner.scanRegExp() : this.scanner.lex();
	                this.reader.push(token);
	                var entry = {
	                    type: token_1.TokenName[token.type],
	                    value: this.scanner.source.slice(token.start, token.end)
	                };
	                if (this.trackRange) {
	                    entry.range = [token.start, token.end];
	                }
	                if (this.trackLoc) {
	                    loc.end = {
	                        line: this.scanner.lineNumber,
	                        column: this.scanner.index - this.scanner.lineStart
	                    };
	                    entry.loc = loc;
	                }
	                if (token.type === 9 /* RegularExpression */) {
	                    var pattern = token.pattern;
	                    var flags = token.flags;
	                    entry.regex = { pattern: pattern, flags: flags };
	                }
	                this.buffer.push(entry);
	            }
	        }
	        return this.buffer.shift();
	    };
	    return Tokenizer;
	}());
	exports.Tokenizer = Tokenizer;


/***/ }
/******/ ])
});
;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXNwcmltYS9kaXN0L2VzcHJpbWEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQSxJQUFJLElBQXlEO0FBQzdEO0FBQ0EsTUFBTSxFQU13QjtBQUM5QixDQUFDO0FBQ0Qsb0NBQW9DO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLGNBQWM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0MsY0FBYztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGtCQUFrQjtBQUM5QztBQUNBO0FBQ0Esa0RBQWtELFFBQVE7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELFFBQVE7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFFBQVE7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOzs7QUFHQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLCtDQUErQyxjQUFjO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ3BGLDBCQUEwQix1REFBdUQ7QUFDakY7QUFDQTtBQUNBLHdCQUF3QixzQkFBc0I7QUFDOUM7QUFDQTtBQUNBLEVBQUU7QUFDRiwrQ0FBK0MsY0FBYztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELHFFQUFxRTtBQUN4SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7O0FBR0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0MsY0FBYztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLDJDQUEyQztBQUMzQyxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDLE1BQU07QUFDTjtBQUNBLDJDQUEyQztBQUMzQztBQUNBOzs7QUFHQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLCtDQUErQyxjQUFjO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7O0FBR0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0MsY0FBYztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0MsY0FBYztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7O0FBR0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0MsY0FBYztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxjQUFjO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qix1QkFBdUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHVCQUF1QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxxQkFBcUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsbUJBQW1CO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RUFBNkU7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxzRUFBc0U7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLHlCQUF5QjtBQUN6Qiw4QkFBOEI7QUFDOUI7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCwyQkFBMkI7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThELDJCQUEyQjtBQUN6RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQywwQkFBMEI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsNEJBQTRCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qyx3QkFBd0I7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsd0JBQXdCO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCw2QkFBNkI7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsaUJBQWlCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQywyQkFBMkI7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDZCQUE2QjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1CQUFtQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixtQkFBbUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELGVBQWU7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZGQUE2RixlQUFlO0FBQzVHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLDhCQUE4QjtBQUM5QjtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELGVBQWU7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUUsY0FBYztBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUUsY0FBYztBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxvQkFBb0I7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1CQUFtQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsb0VBQW9FO0FBQy9IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsbUJBQW1CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEVBQTRFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLHVCQUF1QjtBQUN2Qiw4QkFBOEI7QUFDOUIsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGFBQWE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUIsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQyx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsZUFBZTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQixrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQSw0QkFBNEIsUUFBUTtBQUNwQyw0QkFBNEIsSUFBSTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFNBQVM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsY0FBYztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtDQUErQyxjQUFjO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELGdCQUFnQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOzs7QUFHQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLCtDQUErQyxjQUFjO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLCtDQUErQyxjQUFjO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHNEQUFzRDtBQUN4RjtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msc0RBQXNEO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsU0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsK0JBQStCO0FBQy9CLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsaUJBQWlCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLE1BQU0sSUFBSSxNQUFNO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxnQkFBZ0IsaUJBQWlCLEVBQUU7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsc0JBQXNCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsK0ZBQStGO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLGNBQWM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtDQUErQyxjQUFjO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLGNBQWM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RDtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MscUJBQXFCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsQyIsImZpbGUiOiJucG0uZXNwcmltYS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImVzcHJpbWFcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZXNwcmltYVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge30sXG4vKioqKioqLyBcdFx0XHRpZDogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4vKioqKioqLyBcdFx0fTtcblxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cblxuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXHQvKlxuXHQgIENvcHlyaWdodCBKUyBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMsIGh0dHBzOi8vanMuZm91bmRhdGlvbi9cblxuXHQgIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuXHQgIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG5cdCAgICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0XG5cdCAgICAgIG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cblx0ICAgICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHRcblx0ICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZVxuXHQgICAgICBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG5cdCAgVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCJcblx0ICBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG5cdCAgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0Vcblx0ICBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgPENPUFlSSUdIVCBIT0xERVI+IEJFIExJQUJMRSBGT1IgQU5ZXG5cdCAgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcblx0ICAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5cdCAgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EXG5cdCAgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcblx0ICAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0Zcblx0ICBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuXHQqL1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5cdHZhciBjb21tZW50X2hhbmRsZXJfMSA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cdHZhciBqc3hfcGFyc2VyXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXHR2YXIgcGFyc2VyXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xuXHR2YXIgdG9rZW5pemVyXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcblx0ZnVuY3Rpb24gcGFyc2UoY29kZSwgb3B0aW9ucywgZGVsZWdhdGUpIHtcblx0ICAgIHZhciBjb21tZW50SGFuZGxlciA9IG51bGw7XG5cdCAgICB2YXIgcHJveHlEZWxlZ2F0ZSA9IGZ1bmN0aW9uIChub2RlLCBtZXRhZGF0YSkge1xuXHQgICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuXHQgICAgICAgICAgICBkZWxlZ2F0ZShub2RlLCBtZXRhZGF0YSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChjb21tZW50SGFuZGxlcikge1xuXHQgICAgICAgICAgICBjb21tZW50SGFuZGxlci52aXNpdChub2RlLCBtZXRhZGF0YSk7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIHZhciBwYXJzZXJEZWxlZ2F0ZSA9ICh0eXBlb2YgZGVsZWdhdGUgPT09ICdmdW5jdGlvbicpID8gcHJveHlEZWxlZ2F0ZSA6IG51bGw7XG5cdCAgICB2YXIgY29sbGVjdENvbW1lbnQgPSBmYWxzZTtcblx0ICAgIGlmIChvcHRpb25zKSB7XG5cdCAgICAgICAgY29sbGVjdENvbW1lbnQgPSAodHlwZW9mIG9wdGlvbnMuY29tbWVudCA9PT0gJ2Jvb2xlYW4nICYmIG9wdGlvbnMuY29tbWVudCk7XG5cdCAgICAgICAgdmFyIGF0dGFjaENvbW1lbnQgPSAodHlwZW9mIG9wdGlvbnMuYXR0YWNoQ29tbWVudCA9PT0gJ2Jvb2xlYW4nICYmIG9wdGlvbnMuYXR0YWNoQ29tbWVudCk7XG5cdCAgICAgICAgaWYgKGNvbGxlY3RDb21tZW50IHx8IGF0dGFjaENvbW1lbnQpIHtcblx0ICAgICAgICAgICAgY29tbWVudEhhbmRsZXIgPSBuZXcgY29tbWVudF9oYW5kbGVyXzEuQ29tbWVudEhhbmRsZXIoKTtcblx0ICAgICAgICAgICAgY29tbWVudEhhbmRsZXIuYXR0YWNoID0gYXR0YWNoQ29tbWVudDtcblx0ICAgICAgICAgICAgb3B0aW9ucy5jb21tZW50ID0gdHJ1ZTtcblx0ICAgICAgICAgICAgcGFyc2VyRGVsZWdhdGUgPSBwcm94eURlbGVnYXRlO1xuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHZhciBpc01vZHVsZSA9IGZhbHNlO1xuXHQgICAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMuc291cmNlVHlwZSA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgICBpc01vZHVsZSA9IChvcHRpb25zLnNvdXJjZVR5cGUgPT09ICdtb2R1bGUnKTtcblx0ICAgIH1cblx0ICAgIHZhciBwYXJzZXI7XG5cdCAgICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5qc3ggPT09ICdib29sZWFuJyAmJiBvcHRpb25zLmpzeCkge1xuXHQgICAgICAgIHBhcnNlciA9IG5ldyBqc3hfcGFyc2VyXzEuSlNYUGFyc2VyKGNvZGUsIG9wdGlvbnMsIHBhcnNlckRlbGVnYXRlKTtcblx0ICAgIH1cblx0ICAgIGVsc2Uge1xuXHQgICAgICAgIHBhcnNlciA9IG5ldyBwYXJzZXJfMS5QYXJzZXIoY29kZSwgb3B0aW9ucywgcGFyc2VyRGVsZWdhdGUpO1xuXHQgICAgfVxuXHQgICAgdmFyIHByb2dyYW0gPSBpc01vZHVsZSA/IHBhcnNlci5wYXJzZU1vZHVsZSgpIDogcGFyc2VyLnBhcnNlU2NyaXB0KCk7XG5cdCAgICB2YXIgYXN0ID0gcHJvZ3JhbTtcblx0ICAgIGlmIChjb2xsZWN0Q29tbWVudCAmJiBjb21tZW50SGFuZGxlcikge1xuXHQgICAgICAgIGFzdC5jb21tZW50cyA9IGNvbW1lbnRIYW5kbGVyLmNvbW1lbnRzO1xuXHQgICAgfVxuXHQgICAgaWYgKHBhcnNlci5jb25maWcudG9rZW5zKSB7XG5cdCAgICAgICAgYXN0LnRva2VucyA9IHBhcnNlci50b2tlbnM7XG5cdCAgICB9XG5cdCAgICBpZiAocGFyc2VyLmNvbmZpZy50b2xlcmFudCkge1xuXHQgICAgICAgIGFzdC5lcnJvcnMgPSBwYXJzZXIuZXJyb3JIYW5kbGVyLmVycm9ycztcblx0ICAgIH1cblx0ICAgIHJldHVybiBhc3Q7XG5cdH1cblx0ZXhwb3J0cy5wYXJzZSA9IHBhcnNlO1xuXHRmdW5jdGlvbiBwYXJzZU1vZHVsZShjb2RlLCBvcHRpb25zLCBkZWxlZ2F0ZSkge1xuXHQgICAgdmFyIHBhcnNpbmdPcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0ICAgIHBhcnNpbmdPcHRpb25zLnNvdXJjZVR5cGUgPSAnbW9kdWxlJztcblx0ICAgIHJldHVybiBwYXJzZShjb2RlLCBwYXJzaW5nT3B0aW9ucywgZGVsZWdhdGUpO1xuXHR9XG5cdGV4cG9ydHMucGFyc2VNb2R1bGUgPSBwYXJzZU1vZHVsZTtcblx0ZnVuY3Rpb24gcGFyc2VTY3JpcHQoY29kZSwgb3B0aW9ucywgZGVsZWdhdGUpIHtcblx0ICAgIHZhciBwYXJzaW5nT3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdCAgICBwYXJzaW5nT3B0aW9ucy5zb3VyY2VUeXBlID0gJ3NjcmlwdCc7XG5cdCAgICByZXR1cm4gcGFyc2UoY29kZSwgcGFyc2luZ09wdGlvbnMsIGRlbGVnYXRlKTtcblx0fVxuXHRleHBvcnRzLnBhcnNlU2NyaXB0ID0gcGFyc2VTY3JpcHQ7XG5cdGZ1bmN0aW9uIHRva2VuaXplKGNvZGUsIG9wdGlvbnMsIGRlbGVnYXRlKSB7XG5cdCAgICB2YXIgdG9rZW5pemVyID0gbmV3IHRva2VuaXplcl8xLlRva2VuaXplcihjb2RlLCBvcHRpb25zKTtcblx0ICAgIHZhciB0b2tlbnM7XG5cdCAgICB0b2tlbnMgPSBbXTtcblx0ICAgIHRyeSB7XG5cdCAgICAgICAgd2hpbGUgKHRydWUpIHtcblx0ICAgICAgICAgICAgdmFyIHRva2VuID0gdG9rZW5pemVyLmdldE5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICBpZiAoIXRva2VuKSB7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoZGVsZWdhdGUpIHtcblx0ICAgICAgICAgICAgICAgIHRva2VuID0gZGVsZWdhdGUodG9rZW4pO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICBjYXRjaCAoZSkge1xuXHQgICAgICAgIHRva2VuaXplci5lcnJvckhhbmRsZXIudG9sZXJhdGUoZSk7XG5cdCAgICB9XG5cdCAgICBpZiAodG9rZW5pemVyLmVycm9ySGFuZGxlci50b2xlcmFudCkge1xuXHQgICAgICAgIHRva2Vucy5lcnJvcnMgPSB0b2tlbml6ZXIuZXJyb3JzKCk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gdG9rZW5zO1xuXHR9XG5cdGV4cG9ydHMudG9rZW5pemUgPSB0b2tlbml6ZTtcblx0dmFyIHN5bnRheF8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblx0ZXhwb3J0cy5TeW50YXggPSBzeW50YXhfMS5TeW50YXg7XG5cdC8vIFN5bmMgd2l0aCAqLmpzb24gbWFuaWZlc3RzLlxuXHRleHBvcnRzLnZlcnNpb24gPSAnNC4wLjEnO1xuXG5cbi8qKiovIH0sXG4vKiAxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuXHR2YXIgc3ludGF4XzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXHR2YXIgQ29tbWVudEhhbmRsZXIgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gQ29tbWVudEhhbmRsZXIoKSB7XG5cdCAgICAgICAgdGhpcy5hdHRhY2ggPSBmYWxzZTtcblx0ICAgICAgICB0aGlzLmNvbW1lbnRzID0gW107XG5cdCAgICAgICAgdGhpcy5zdGFjayA9IFtdO1xuXHQgICAgICAgIHRoaXMubGVhZGluZyA9IFtdO1xuXHQgICAgICAgIHRoaXMudHJhaWxpbmcgPSBbXTtcblx0ICAgIH1cblx0ICAgIENvbW1lbnRIYW5kbGVyLnByb3RvdHlwZS5pbnNlcnRJbm5lckNvbW1lbnRzID0gZnVuY3Rpb24gKG5vZGUsIG1ldGFkYXRhKSB7XG5cdCAgICAgICAgLy8gIGlubm5lckNvbW1lbnRzIGZvciBwcm9wZXJ0aWVzIGVtcHR5IGJsb2NrXG5cdCAgICAgICAgLy8gIGBmdW5jdGlvbiBhKCkgey8qKiBjb21tZW50cyAqKlxcL31gXG5cdCAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gc3ludGF4XzEuU3ludGF4LkJsb2NrU3RhdGVtZW50ICYmIG5vZGUuYm9keS5sZW5ndGggPT09IDApIHtcblx0ICAgICAgICAgICAgdmFyIGlubmVyQ29tbWVudHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMubGVhZGluZy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5sZWFkaW5nW2ldO1xuXHQgICAgICAgICAgICAgICAgaWYgKG1ldGFkYXRhLmVuZC5vZmZzZXQgPj0gZW50cnkuc3RhcnQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpbm5lckNvbW1lbnRzLnVuc2hpZnQoZW50cnkuY29tbWVudCk7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWFkaW5nLnNwbGljZShpLCAxKTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWlsaW5nLnNwbGljZShpLCAxKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoaW5uZXJDb21tZW50cy5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgICAgIG5vZGUuaW5uZXJDb21tZW50cyA9IGlubmVyQ29tbWVudHM7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgQ29tbWVudEhhbmRsZXIucHJvdG90eXBlLmZpbmRUcmFpbGluZ0NvbW1lbnRzID0gZnVuY3Rpb24gKG1ldGFkYXRhKSB7XG5cdCAgICAgICAgdmFyIHRyYWlsaW5nQ29tbWVudHMgPSBbXTtcblx0ICAgICAgICBpZiAodGhpcy50cmFpbGluZy5sZW5ndGggPiAwKSB7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyYWlsaW5nLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgZW50cnlfMSA9IHRoaXMudHJhaWxpbmdbaV07XG5cdCAgICAgICAgICAgICAgICBpZiAoZW50cnlfMS5zdGFydCA+PSBtZXRhZGF0YS5lbmQub2Zmc2V0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdHJhaWxpbmdDb21tZW50cy51bnNoaWZ0KGVudHJ5XzEuY29tbWVudCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGhpcy50cmFpbGluZy5sZW5ndGggPSAwO1xuXHQgICAgICAgICAgICByZXR1cm4gdHJhaWxpbmdDb21tZW50cztcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5zdGFja1t0aGlzLnN0YWNrLmxlbmd0aCAtIDFdO1xuXHQgICAgICAgIGlmIChlbnRyeSAmJiBlbnRyeS5ub2RlLnRyYWlsaW5nQ29tbWVudHMpIHtcblx0ICAgICAgICAgICAgdmFyIGZpcnN0Q29tbWVudCA9IGVudHJ5Lm5vZGUudHJhaWxpbmdDb21tZW50c1swXTtcblx0ICAgICAgICAgICAgaWYgKGZpcnN0Q29tbWVudCAmJiBmaXJzdENvbW1lbnQucmFuZ2VbMF0gPj0gbWV0YWRhdGEuZW5kLm9mZnNldCkge1xuXHQgICAgICAgICAgICAgICAgdHJhaWxpbmdDb21tZW50cyA9IGVudHJ5Lm5vZGUudHJhaWxpbmdDb21tZW50cztcblx0ICAgICAgICAgICAgICAgIGRlbGV0ZSBlbnRyeS5ub2RlLnRyYWlsaW5nQ29tbWVudHM7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRyYWlsaW5nQ29tbWVudHM7XG5cdCAgICB9O1xuXHQgICAgQ29tbWVudEhhbmRsZXIucHJvdG90eXBlLmZpbmRMZWFkaW5nQ29tbWVudHMgPSBmdW5jdGlvbiAobWV0YWRhdGEpIHtcblx0ICAgICAgICB2YXIgbGVhZGluZ0NvbW1lbnRzID0gW107XG5cdCAgICAgICAgdmFyIHRhcmdldDtcblx0ICAgICAgICB3aGlsZSAodGhpcy5zdGFjay5sZW5ndGggPiAwKSB7XG5cdCAgICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXMuc3RhY2tbdGhpcy5zdGFjay5sZW5ndGggLSAxXTtcblx0ICAgICAgICAgICAgaWYgKGVudHJ5ICYmIGVudHJ5LnN0YXJ0ID49IG1ldGFkYXRhLnN0YXJ0Lm9mZnNldCkge1xuXHQgICAgICAgICAgICAgICAgdGFyZ2V0ID0gZW50cnkubm9kZTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sucG9wKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodGFyZ2V0KSB7XG5cdCAgICAgICAgICAgIHZhciBjb3VudCA9IHRhcmdldC5sZWFkaW5nQ29tbWVudHMgPyB0YXJnZXQubGVhZGluZ0NvbW1lbnRzLmxlbmd0aCA6IDA7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSBjb3VudCAtIDE7IGkgPj0gMDsgLS1pKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgY29tbWVudCA9IHRhcmdldC5sZWFkaW5nQ29tbWVudHNbaV07XG5cdCAgICAgICAgICAgICAgICBpZiAoY29tbWVudC5yYW5nZVsxXSA8PSBtZXRhZGF0YS5zdGFydC5vZmZzZXQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBsZWFkaW5nQ29tbWVudHMudW5zaGlmdChjb21tZW50KTtcblx0ICAgICAgICAgICAgICAgICAgICB0YXJnZXQubGVhZGluZ0NvbW1lbnRzLnNwbGljZShpLCAxKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAodGFyZ2V0LmxlYWRpbmdDb21tZW50cyAmJiB0YXJnZXQubGVhZGluZ0NvbW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuXHQgICAgICAgICAgICAgICAgZGVsZXRlIHRhcmdldC5sZWFkaW5nQ29tbWVudHM7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIGxlYWRpbmdDb21tZW50cztcblx0ICAgICAgICB9XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMubGVhZGluZy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuXHQgICAgICAgICAgICB2YXIgZW50cnkgPSB0aGlzLmxlYWRpbmdbaV07XG5cdCAgICAgICAgICAgIGlmIChlbnRyeS5zdGFydCA8PSBtZXRhZGF0YS5zdGFydC5vZmZzZXQpIHtcblx0ICAgICAgICAgICAgICAgIGxlYWRpbmdDb21tZW50cy51bnNoaWZ0KGVudHJ5LmNvbW1lbnQpO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5sZWFkaW5nLnNwbGljZShpLCAxKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gbGVhZGluZ0NvbW1lbnRzO1xuXHQgICAgfTtcblx0ICAgIENvbW1lbnRIYW5kbGVyLnByb3RvdHlwZS52aXNpdE5vZGUgPSBmdW5jdGlvbiAobm9kZSwgbWV0YWRhdGEpIHtcblx0ICAgICAgICBpZiAobm9kZS50eXBlID09PSBzeW50YXhfMS5TeW50YXguUHJvZ3JhbSAmJiBub2RlLmJvZHkubGVuZ3RoID4gMCkge1xuXHQgICAgICAgICAgICByZXR1cm47XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMuaW5zZXJ0SW5uZXJDb21tZW50cyhub2RlLCBtZXRhZGF0YSk7XG5cdCAgICAgICAgdmFyIHRyYWlsaW5nQ29tbWVudHMgPSB0aGlzLmZpbmRUcmFpbGluZ0NvbW1lbnRzKG1ldGFkYXRhKTtcblx0ICAgICAgICB2YXIgbGVhZGluZ0NvbW1lbnRzID0gdGhpcy5maW5kTGVhZGluZ0NvbW1lbnRzKG1ldGFkYXRhKTtcblx0ICAgICAgICBpZiAobGVhZGluZ0NvbW1lbnRzLmxlbmd0aCA+IDApIHtcblx0ICAgICAgICAgICAgbm9kZS5sZWFkaW5nQ29tbWVudHMgPSBsZWFkaW5nQ29tbWVudHM7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICh0cmFpbGluZ0NvbW1lbnRzLmxlbmd0aCA+IDApIHtcblx0ICAgICAgICAgICAgbm9kZS50cmFpbGluZ0NvbW1lbnRzID0gdHJhaWxpbmdDb21tZW50cztcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5zdGFjay5wdXNoKHtcblx0ICAgICAgICAgICAgbm9kZTogbm9kZSxcblx0ICAgICAgICAgICAgc3RhcnQ6IG1ldGFkYXRhLnN0YXJ0Lm9mZnNldFxuXHQgICAgICAgIH0pO1xuXHQgICAgfTtcblx0ICAgIENvbW1lbnRIYW5kbGVyLnByb3RvdHlwZS52aXNpdENvbW1lbnQgPSBmdW5jdGlvbiAobm9kZSwgbWV0YWRhdGEpIHtcblx0ICAgICAgICB2YXIgdHlwZSA9IChub2RlLnR5cGVbMF0gPT09ICdMJykgPyAnTGluZScgOiAnQmxvY2snO1xuXHQgICAgICAgIHZhciBjb21tZW50ID0ge1xuXHQgICAgICAgICAgICB0eXBlOiB0eXBlLFxuXHQgICAgICAgICAgICB2YWx1ZTogbm9kZS52YWx1ZVxuXHQgICAgICAgIH07XG5cdCAgICAgICAgaWYgKG5vZGUucmFuZ2UpIHtcblx0ICAgICAgICAgICAgY29tbWVudC5yYW5nZSA9IG5vZGUucmFuZ2U7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChub2RlLmxvYykge1xuXHQgICAgICAgICAgICBjb21tZW50LmxvYyA9IG5vZGUubG9jO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmNvbW1lbnRzLnB1c2goY29tbWVudCk7XG5cdCAgICAgICAgaWYgKHRoaXMuYXR0YWNoKSB7XG5cdCAgICAgICAgICAgIHZhciBlbnRyeSA9IHtcblx0ICAgICAgICAgICAgICAgIGNvbW1lbnQ6IHtcblx0ICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuXHQgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLnZhbHVlLFxuXHQgICAgICAgICAgICAgICAgICAgIHJhbmdlOiBbbWV0YWRhdGEuc3RhcnQub2Zmc2V0LCBtZXRhZGF0YS5lbmQub2Zmc2V0XVxuXHQgICAgICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgICAgIHN0YXJ0OiBtZXRhZGF0YS5zdGFydC5vZmZzZXRcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgaWYgKG5vZGUubG9jKSB7XG5cdCAgICAgICAgICAgICAgICBlbnRyeS5jb21tZW50LmxvYyA9IG5vZGUubG9jO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIG5vZGUudHlwZSA9IHR5cGU7XG5cdCAgICAgICAgICAgIHRoaXMubGVhZGluZy5wdXNoKGVudHJ5KTtcblx0ICAgICAgICAgICAgdGhpcy50cmFpbGluZy5wdXNoKGVudHJ5KTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgQ29tbWVudEhhbmRsZXIucHJvdG90eXBlLnZpc2l0ID0gZnVuY3Rpb24gKG5vZGUsIG1ldGFkYXRhKSB7XG5cdCAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0xpbmVDb21tZW50Jykge1xuXHQgICAgICAgICAgICB0aGlzLnZpc2l0Q29tbWVudChub2RlLCBtZXRhZGF0YSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0Jsb2NrQ29tbWVudCcpIHtcblx0ICAgICAgICAgICAgdGhpcy52aXNpdENvbW1lbnQobm9kZSwgbWV0YWRhdGEpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmICh0aGlzLmF0dGFjaCkge1xuXHQgICAgICAgICAgICB0aGlzLnZpc2l0Tm9kZShub2RlLCBtZXRhZGF0YSk7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIHJldHVybiBDb21tZW50SGFuZGxlcjtcblx0fSgpKTtcblx0ZXhwb3J0cy5Db21tZW50SGFuZGxlciA9IENvbW1lbnRIYW5kbGVyO1xuXG5cbi8qKiovIH0sXG4vKiAyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuXHRleHBvcnRzLlN5bnRheCA9IHtcblx0ICAgIEFzc2lnbm1lbnRFeHByZXNzaW9uOiAnQXNzaWdubWVudEV4cHJlc3Npb24nLFxuXHQgICAgQXNzaWdubWVudFBhdHRlcm46ICdBc3NpZ25tZW50UGF0dGVybicsXG5cdCAgICBBcnJheUV4cHJlc3Npb246ICdBcnJheUV4cHJlc3Npb24nLFxuXHQgICAgQXJyYXlQYXR0ZXJuOiAnQXJyYXlQYXR0ZXJuJyxcblx0ICAgIEFycm93RnVuY3Rpb25FeHByZXNzaW9uOiAnQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24nLFxuXHQgICAgQXdhaXRFeHByZXNzaW9uOiAnQXdhaXRFeHByZXNzaW9uJyxcblx0ICAgIEJsb2NrU3RhdGVtZW50OiAnQmxvY2tTdGF0ZW1lbnQnLFxuXHQgICAgQmluYXJ5RXhwcmVzc2lvbjogJ0JpbmFyeUV4cHJlc3Npb24nLFxuXHQgICAgQnJlYWtTdGF0ZW1lbnQ6ICdCcmVha1N0YXRlbWVudCcsXG5cdCAgICBDYWxsRXhwcmVzc2lvbjogJ0NhbGxFeHByZXNzaW9uJyxcblx0ICAgIENhdGNoQ2xhdXNlOiAnQ2F0Y2hDbGF1c2UnLFxuXHQgICAgQ2xhc3NCb2R5OiAnQ2xhc3NCb2R5Jyxcblx0ICAgIENsYXNzRGVjbGFyYXRpb246ICdDbGFzc0RlY2xhcmF0aW9uJyxcblx0ICAgIENsYXNzRXhwcmVzc2lvbjogJ0NsYXNzRXhwcmVzc2lvbicsXG5cdCAgICBDb25kaXRpb25hbEV4cHJlc3Npb246ICdDb25kaXRpb25hbEV4cHJlc3Npb24nLFxuXHQgICAgQ29udGludWVTdGF0ZW1lbnQ6ICdDb250aW51ZVN0YXRlbWVudCcsXG5cdCAgICBEb1doaWxlU3RhdGVtZW50OiAnRG9XaGlsZVN0YXRlbWVudCcsXG5cdCAgICBEZWJ1Z2dlclN0YXRlbWVudDogJ0RlYnVnZ2VyU3RhdGVtZW50Jyxcblx0ICAgIEVtcHR5U3RhdGVtZW50OiAnRW1wdHlTdGF0ZW1lbnQnLFxuXHQgICAgRXhwb3J0QWxsRGVjbGFyYXRpb246ICdFeHBvcnRBbGxEZWNsYXJhdGlvbicsXG5cdCAgICBFeHBvcnREZWZhdWx0RGVjbGFyYXRpb246ICdFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24nLFxuXHQgICAgRXhwb3J0TmFtZWREZWNsYXJhdGlvbjogJ0V4cG9ydE5hbWVkRGVjbGFyYXRpb24nLFxuXHQgICAgRXhwb3J0U3BlY2lmaWVyOiAnRXhwb3J0U3BlY2lmaWVyJyxcblx0ICAgIEV4cHJlc3Npb25TdGF0ZW1lbnQ6ICdFeHByZXNzaW9uU3RhdGVtZW50Jyxcblx0ICAgIEZvclN0YXRlbWVudDogJ0ZvclN0YXRlbWVudCcsXG5cdCAgICBGb3JPZlN0YXRlbWVudDogJ0Zvck9mU3RhdGVtZW50Jyxcblx0ICAgIEZvckluU3RhdGVtZW50OiAnRm9ySW5TdGF0ZW1lbnQnLFxuXHQgICAgRnVuY3Rpb25EZWNsYXJhdGlvbjogJ0Z1bmN0aW9uRGVjbGFyYXRpb24nLFxuXHQgICAgRnVuY3Rpb25FeHByZXNzaW9uOiAnRnVuY3Rpb25FeHByZXNzaW9uJyxcblx0ICAgIElkZW50aWZpZXI6ICdJZGVudGlmaWVyJyxcblx0ICAgIElmU3RhdGVtZW50OiAnSWZTdGF0ZW1lbnQnLFxuXHQgICAgSW1wb3J0RGVjbGFyYXRpb246ICdJbXBvcnREZWNsYXJhdGlvbicsXG5cdCAgICBJbXBvcnREZWZhdWx0U3BlY2lmaWVyOiAnSW1wb3J0RGVmYXVsdFNwZWNpZmllcicsXG5cdCAgICBJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXI6ICdJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXInLFxuXHQgICAgSW1wb3J0U3BlY2lmaWVyOiAnSW1wb3J0U3BlY2lmaWVyJyxcblx0ICAgIExpdGVyYWw6ICdMaXRlcmFsJyxcblx0ICAgIExhYmVsZWRTdGF0ZW1lbnQ6ICdMYWJlbGVkU3RhdGVtZW50Jyxcblx0ICAgIExvZ2ljYWxFeHByZXNzaW9uOiAnTG9naWNhbEV4cHJlc3Npb24nLFxuXHQgICAgTWVtYmVyRXhwcmVzc2lvbjogJ01lbWJlckV4cHJlc3Npb24nLFxuXHQgICAgTWV0YVByb3BlcnR5OiAnTWV0YVByb3BlcnR5Jyxcblx0ICAgIE1ldGhvZERlZmluaXRpb246ICdNZXRob2REZWZpbml0aW9uJyxcblx0ICAgIE5ld0V4cHJlc3Npb246ICdOZXdFeHByZXNzaW9uJyxcblx0ICAgIE9iamVjdEV4cHJlc3Npb246ICdPYmplY3RFeHByZXNzaW9uJyxcblx0ICAgIE9iamVjdFBhdHRlcm46ICdPYmplY3RQYXR0ZXJuJyxcblx0ICAgIFByb2dyYW06ICdQcm9ncmFtJyxcblx0ICAgIFByb3BlcnR5OiAnUHJvcGVydHknLFxuXHQgICAgUmVzdEVsZW1lbnQ6ICdSZXN0RWxlbWVudCcsXG5cdCAgICBSZXR1cm5TdGF0ZW1lbnQ6ICdSZXR1cm5TdGF0ZW1lbnQnLFxuXHQgICAgU2VxdWVuY2VFeHByZXNzaW9uOiAnU2VxdWVuY2VFeHByZXNzaW9uJyxcblx0ICAgIFNwcmVhZEVsZW1lbnQ6ICdTcHJlYWRFbGVtZW50Jyxcblx0ICAgIFN1cGVyOiAnU3VwZXInLFxuXHQgICAgU3dpdGNoQ2FzZTogJ1N3aXRjaENhc2UnLFxuXHQgICAgU3dpdGNoU3RhdGVtZW50OiAnU3dpdGNoU3RhdGVtZW50Jyxcblx0ICAgIFRhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbjogJ1RhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbicsXG5cdCAgICBUZW1wbGF0ZUVsZW1lbnQ6ICdUZW1wbGF0ZUVsZW1lbnQnLFxuXHQgICAgVGVtcGxhdGVMaXRlcmFsOiAnVGVtcGxhdGVMaXRlcmFsJyxcblx0ICAgIFRoaXNFeHByZXNzaW9uOiAnVGhpc0V4cHJlc3Npb24nLFxuXHQgICAgVGhyb3dTdGF0ZW1lbnQ6ICdUaHJvd1N0YXRlbWVudCcsXG5cdCAgICBUcnlTdGF0ZW1lbnQ6ICdUcnlTdGF0ZW1lbnQnLFxuXHQgICAgVW5hcnlFeHByZXNzaW9uOiAnVW5hcnlFeHByZXNzaW9uJyxcblx0ICAgIFVwZGF0ZUV4cHJlc3Npb246ICdVcGRhdGVFeHByZXNzaW9uJyxcblx0ICAgIFZhcmlhYmxlRGVjbGFyYXRpb246ICdWYXJpYWJsZURlY2xhcmF0aW9uJyxcblx0ICAgIFZhcmlhYmxlRGVjbGFyYXRvcjogJ1ZhcmlhYmxlRGVjbGFyYXRvcicsXG5cdCAgICBXaGlsZVN0YXRlbWVudDogJ1doaWxlU3RhdGVtZW50Jyxcblx0ICAgIFdpdGhTdGF0ZW1lbnQ6ICdXaXRoU3RhdGVtZW50Jyxcblx0ICAgIFlpZWxkRXhwcmVzc2lvbjogJ1lpZWxkRXhwcmVzc2lvbidcblx0fTtcblxuXG4vKioqLyB9LFxuLyogMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHR2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuXHQgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcblx0ICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcblx0ICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuXHQgICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG5cdCAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG5cdCAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuXHQgICAgfTtcblx0fSkoKTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuXHR2YXIgY2hhcmFjdGVyXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXHR2YXIgSlNYTm9kZSA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cdHZhciBqc3hfc3ludGF4XzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXHR2YXIgTm9kZSA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG5cdHZhciBwYXJzZXJfMSA9IF9fd2VicGFja19yZXF1aXJlX18oOCk7XG5cdHZhciB0b2tlbl8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMyk7XG5cdHZhciB4aHRtbF9lbnRpdGllc18xID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNCk7XG5cdHRva2VuXzEuVG9rZW5OYW1lWzEwMCAvKiBJZGVudGlmaWVyICovXSA9ICdKU1hJZGVudGlmaWVyJztcblx0dG9rZW5fMS5Ub2tlbk5hbWVbMTAxIC8qIFRleHQgKi9dID0gJ0pTWFRleHQnO1xuXHQvLyBGdWxseSBxdWFsaWZpZWQgZWxlbWVudCBuYW1lLCBlLmcuIDxzdmc6cGF0aD4gcmV0dXJucyBcInN2ZzpwYXRoXCJcblx0ZnVuY3Rpb24gZ2V0UXVhbGlmaWVkRWxlbWVudE5hbWUoZWxlbWVudE5hbWUpIHtcblx0ICAgIHZhciBxdWFsaWZpZWROYW1lO1xuXHQgICAgc3dpdGNoIChlbGVtZW50TmFtZS50eXBlKSB7XG5cdCAgICAgICAgY2FzZSBqc3hfc3ludGF4XzEuSlNYU3ludGF4LkpTWElkZW50aWZpZXI6XG5cdCAgICAgICAgICAgIHZhciBpZCA9IGVsZW1lbnROYW1lO1xuXHQgICAgICAgICAgICBxdWFsaWZpZWROYW1lID0gaWQubmFtZTtcblx0ICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgY2FzZSBqc3hfc3ludGF4XzEuSlNYU3ludGF4LkpTWE5hbWVzcGFjZWROYW1lOlxuXHQgICAgICAgICAgICB2YXIgbnMgPSBlbGVtZW50TmFtZTtcblx0ICAgICAgICAgICAgcXVhbGlmaWVkTmFtZSA9IGdldFF1YWxpZmllZEVsZW1lbnROYW1lKG5zLm5hbWVzcGFjZSkgKyAnOicgK1xuXHQgICAgICAgICAgICAgICAgZ2V0UXVhbGlmaWVkRWxlbWVudE5hbWUobnMubmFtZSk7XG5cdCAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgIGNhc2UganN4X3N5bnRheF8xLkpTWFN5bnRheC5KU1hNZW1iZXJFeHByZXNzaW9uOlxuXHQgICAgICAgICAgICB2YXIgZXhwciA9IGVsZW1lbnROYW1lO1xuXHQgICAgICAgICAgICBxdWFsaWZpZWROYW1lID0gZ2V0UXVhbGlmaWVkRWxlbWVudE5hbWUoZXhwci5vYmplY3QpICsgJy4nICtcblx0ICAgICAgICAgICAgICAgIGdldFF1YWxpZmllZEVsZW1lbnROYW1lKGV4cHIucHJvcGVydHkpO1xuXHQgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHQgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIHF1YWxpZmllZE5hbWU7XG5cdH1cblx0dmFyIEpTWFBhcnNlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG5cdCAgICBfX2V4dGVuZHMoSlNYUGFyc2VyLCBfc3VwZXIpO1xuXHQgICAgZnVuY3Rpb24gSlNYUGFyc2VyKGNvZGUsIG9wdGlvbnMsIGRlbGVnYXRlKSB7XG5cdCAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIGNvZGUsIG9wdGlvbnMsIGRlbGVnYXRlKSB8fCB0aGlzO1xuXHQgICAgfVxuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5wYXJzZVByaW1hcnlFeHByZXNzaW9uID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLm1hdGNoKCc8JykgPyB0aGlzLnBhcnNlSlNYUm9vdCgpIDogX3N1cGVyLnByb3RvdHlwZS5wYXJzZVByaW1hcnlFeHByZXNzaW9uLmNhbGwodGhpcyk7XG5cdCAgICB9O1xuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5zdGFydEpTWCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAvLyBVbndpbmQgdGhlIHNjYW5uZXIgYmVmb3JlIHRoZSBsb29rYWhlYWQgdG9rZW4uXG5cdCAgICAgICAgdGhpcy5zY2FubmVyLmluZGV4ID0gdGhpcy5zdGFydE1hcmtlci5pbmRleDtcblx0ICAgICAgICB0aGlzLnNjYW5uZXIubGluZU51bWJlciA9IHRoaXMuc3RhcnRNYXJrZXIubGluZTtcblx0ICAgICAgICB0aGlzLnNjYW5uZXIubGluZVN0YXJ0ID0gdGhpcy5zdGFydE1hcmtlci5pbmRleCAtIHRoaXMuc3RhcnRNYXJrZXIuY29sdW1uO1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUuZmluaXNoSlNYID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIC8vIFByaW1lIHRoZSBuZXh0IGxvb2thaGVhZC5cblx0ICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUucmVlbnRlckpTWCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB0aGlzLnN0YXJ0SlNYKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RKU1goJ30nKTtcblx0ICAgICAgICAvLyBQb3AgdGhlIGNsb3NpbmcgJ30nIGFkZGVkIGZyb20gdGhlIGxvb2thaGVhZC5cblx0ICAgICAgICBpZiAodGhpcy5jb25maWcudG9rZW5zKSB7XG5cdCAgICAgICAgICAgIHRoaXMudG9rZW5zLnBvcCgpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICBKU1hQYXJzZXIucHJvdG90eXBlLmNyZWF0ZUpTWE5vZGUgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdGhpcy5jb2xsZWN0Q29tbWVudHMoKTtcblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICBpbmRleDogdGhpcy5zY2FubmVyLmluZGV4LFxuXHQgICAgICAgICAgICBsaW5lOiB0aGlzLnNjYW5uZXIubGluZU51bWJlcixcblx0ICAgICAgICAgICAgY29sdW1uOiB0aGlzLnNjYW5uZXIuaW5kZXggLSB0aGlzLnNjYW5uZXIubGluZVN0YXJ0XG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICBKU1hQYXJzZXIucHJvdG90eXBlLmNyZWF0ZUpTWENoaWxkTm9kZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICBpbmRleDogdGhpcy5zY2FubmVyLmluZGV4LFxuXHQgICAgICAgICAgICBsaW5lOiB0aGlzLnNjYW5uZXIubGluZU51bWJlcixcblx0ICAgICAgICAgICAgY29sdW1uOiB0aGlzLnNjYW5uZXIuaW5kZXggLSB0aGlzLnNjYW5uZXIubGluZVN0YXJ0XG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICBKU1hQYXJzZXIucHJvdG90eXBlLnNjYW5YSFRNTEVudGl0eSA9IGZ1bmN0aW9uIChxdW90ZSkge1xuXHQgICAgICAgIHZhciByZXN1bHQgPSAnJic7XG5cdCAgICAgICAgdmFyIHZhbGlkID0gdHJ1ZTtcblx0ICAgICAgICB2YXIgdGVybWluYXRlZCA9IGZhbHNlO1xuXHQgICAgICAgIHZhciBudW1lcmljID0gZmFsc2U7XG5cdCAgICAgICAgdmFyIGhleCA9IGZhbHNlO1xuXHQgICAgICAgIHdoaWxlICghdGhpcy5zY2FubmVyLmVvZigpICYmIHZhbGlkICYmICF0ZXJtaW5hdGVkKSB7XG5cdCAgICAgICAgICAgIHZhciBjaCA9IHRoaXMuc2Nhbm5lci5zb3VyY2VbdGhpcy5zY2FubmVyLmluZGV4XTtcblx0ICAgICAgICAgICAgaWYgKGNoID09PSBxdW90ZSkge1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGVybWluYXRlZCA9IChjaCA9PT0gJzsnKTtcblx0ICAgICAgICAgICAgcmVzdWx0ICs9IGNoO1xuXHQgICAgICAgICAgICArK3RoaXMuc2Nhbm5lci5pbmRleDtcblx0ICAgICAgICAgICAgaWYgKCF0ZXJtaW5hdGVkKSB7XG5cdCAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIGUuZy4gJyYjMTIzOydcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbnVtZXJpYyA9IChjaCA9PT0gJyMnKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBpZiAobnVtZXJpYykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZS5nLiAnJiN4NDE7J1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGV4ID0gKGNoID09PSAneCcpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBoZXggfHwgY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzRGVjaW1hbERpZ2l0KGNoLmNoYXJDb2RlQXQoMCkpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtZXJpYyA9IG51bWVyaWMgJiYgIWhleDtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IHZhbGlkICYmICEobnVtZXJpYyAmJiAhY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzRGVjaW1hbERpZ2l0KGNoLmNoYXJDb2RlQXQoMCkpKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSB2YWxpZCAmJiAhKGhleCAmJiAhY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzSGV4RGlnaXQoY2guY2hhckNvZGVBdCgwKSkpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodmFsaWQgJiYgdGVybWluYXRlZCAmJiByZXN1bHQubGVuZ3RoID4gMikge1xuXHQgICAgICAgICAgICAvLyBlLmcuICcmI3g0MTsnIGJlY29tZXMganVzdCAnI3g0MSdcblx0ICAgICAgICAgICAgdmFyIHN0ciA9IHJlc3VsdC5zdWJzdHIoMSwgcmVzdWx0Lmxlbmd0aCAtIDIpO1xuXHQgICAgICAgICAgICBpZiAobnVtZXJpYyAmJiBzdHIubGVuZ3RoID4gMSkge1xuXHQgICAgICAgICAgICAgICAgcmVzdWx0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChzdHIuc3Vic3RyKDEpLCAxMCkpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKGhleCAmJiBzdHIubGVuZ3RoID4gMikge1xuXHQgICAgICAgICAgICAgICAgcmVzdWx0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludCgnMCcgKyBzdHIuc3Vic3RyKDEpLCAxNikpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKCFudW1lcmljICYmICFoZXggJiYgeGh0bWxfZW50aXRpZXNfMS5YSFRNTEVudGl0aWVzW3N0cl0pIHtcblx0ICAgICAgICAgICAgICAgIHJlc3VsdCA9IHhodG1sX2VudGl0aWVzXzEuWEhUTUxFbnRpdGllc1tzdHJdO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHQ7XG5cdCAgICB9O1xuXHQgICAgLy8gU2NhbiB0aGUgbmV4dCBKU1ggdG9rZW4uIFRoaXMgcmVwbGFjZXMgU2Nhbm5lciNsZXggd2hlbiBpbiBKU1ggbW9kZS5cblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUubGV4SlNYID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBjcCA9IHRoaXMuc2Nhbm5lci5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLnNjYW5uZXIuaW5kZXgpO1xuXHQgICAgICAgIC8vIDwgPiAvIDogPSB7IH1cblx0ICAgICAgICBpZiAoY3AgPT09IDYwIHx8IGNwID09PSA2MiB8fCBjcCA9PT0gNDcgfHwgY3AgPT09IDU4IHx8IGNwID09PSA2MSB8fCBjcCA9PT0gMTIzIHx8IGNwID09PSAxMjUpIHtcblx0ICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5zY2FubmVyLnNvdXJjZVt0aGlzLnNjYW5uZXIuaW5kZXgrK107XG5cdCAgICAgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgICAgICB0eXBlOiA3IC8qIFB1bmN0dWF0b3IgKi8sXG5cdCAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG5cdCAgICAgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLnNjYW5uZXIubGluZU51bWJlcixcblx0ICAgICAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5zY2FubmVyLmxpbmVTdGFydCxcblx0ICAgICAgICAgICAgICAgIHN0YXJ0OiB0aGlzLnNjYW5uZXIuaW5kZXggLSAxLFxuXHQgICAgICAgICAgICAgICAgZW5kOiB0aGlzLnNjYW5uZXIuaW5kZXhcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgLy8gXCIgJ1xuXHQgICAgICAgIGlmIChjcCA9PT0gMzQgfHwgY3AgPT09IDM5KSB7XG5cdCAgICAgICAgICAgIHZhciBzdGFydCA9IHRoaXMuc2Nhbm5lci5pbmRleDtcblx0ICAgICAgICAgICAgdmFyIHF1b3RlID0gdGhpcy5zY2FubmVyLnNvdXJjZVt0aGlzLnNjYW5uZXIuaW5kZXgrK107XG5cdCAgICAgICAgICAgIHZhciBzdHIgPSAnJztcblx0ICAgICAgICAgICAgd2hpbGUgKCF0aGlzLnNjYW5uZXIuZW9mKCkpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBjaCA9IHRoaXMuc2Nhbm5lci5zb3VyY2VbdGhpcy5zY2FubmVyLmluZGV4KytdO1xuXHQgICAgICAgICAgICAgICAgaWYgKGNoID09PSBxdW90ZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09ICcmJykge1xuXHQgICAgICAgICAgICAgICAgICAgIHN0ciArPSB0aGlzLnNjYW5YSFRNTEVudGl0eShxdW90ZSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdHIgKz0gY2g7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgICAgIHR5cGU6IDggLyogU3RyaW5nTGl0ZXJhbCAqLyxcblx0ICAgICAgICAgICAgICAgIHZhbHVlOiBzdHIsXG5cdCAgICAgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLnNjYW5uZXIubGluZU51bWJlcixcblx0ICAgICAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5zY2FubmVyLmxpbmVTdGFydCxcblx0ICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcblx0ICAgICAgICAgICAgICAgIGVuZDogdGhpcy5zY2FubmVyLmluZGV4XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfVxuXHQgICAgICAgIC8vIC4uLiBvciAuXG5cdCAgICAgICAgaWYgKGNwID09PSA0Nikge1xuXHQgICAgICAgICAgICB2YXIgbjEgPSB0aGlzLnNjYW5uZXIuc291cmNlLmNoYXJDb2RlQXQodGhpcy5zY2FubmVyLmluZGV4ICsgMSk7XG5cdCAgICAgICAgICAgIHZhciBuMiA9IHRoaXMuc2Nhbm5lci5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLnNjYW5uZXIuaW5kZXggKyAyKTtcblx0ICAgICAgICAgICAgdmFyIHZhbHVlID0gKG4xID09PSA0NiAmJiBuMiA9PT0gNDYpID8gJy4uLicgOiAnLic7XG5cdCAgICAgICAgICAgIHZhciBzdGFydCA9IHRoaXMuc2Nhbm5lci5pbmRleDtcblx0ICAgICAgICAgICAgdGhpcy5zY2FubmVyLmluZGV4ICs9IHZhbHVlLmxlbmd0aDtcblx0ICAgICAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgICAgIHR5cGU6IDcgLyogUHVuY3R1YXRvciAqLyxcblx0ICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcblx0ICAgICAgICAgICAgICAgIGxpbmVOdW1iZXI6IHRoaXMuc2Nhbm5lci5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICAgICAgbGluZVN0YXJ0OiB0aGlzLnNjYW5uZXIubGluZVN0YXJ0LFxuXHQgICAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuXHQgICAgICAgICAgICAgICAgZW5kOiB0aGlzLnNjYW5uZXIuaW5kZXhcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgLy8gYFxuXHQgICAgICAgIGlmIChjcCA9PT0gOTYpIHtcblx0ICAgICAgICAgICAgLy8gT25seSBwbGFjZWhvbGRlciwgc2luY2UgaXQgd2lsbCBiZSByZXNjYW5uZWQgYXMgYSByZWFsIGFzc2lnbm1lbnQgZXhwcmVzc2lvbi5cblx0ICAgICAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgICAgIHR5cGU6IDEwIC8qIFRlbXBsYXRlICovLFxuXHQgICAgICAgICAgICAgICAgdmFsdWU6ICcnLFxuXHQgICAgICAgICAgICAgICAgbGluZU51bWJlcjogdGhpcy5zY2FubmVyLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgICAgICBsaW5lU3RhcnQ6IHRoaXMuc2Nhbm5lci5saW5lU3RhcnQsXG5cdCAgICAgICAgICAgICAgICBzdGFydDogdGhpcy5zY2FubmVyLmluZGV4LFxuXHQgICAgICAgICAgICAgICAgZW5kOiB0aGlzLnNjYW5uZXIuaW5kZXhcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgLy8gSWRlbnRpZmVyIGNhbiBub3QgY29udGFpbiBiYWNrc2xhc2ggKGNoYXIgY29kZSA5MikuXG5cdCAgICAgICAgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0lkZW50aWZpZXJTdGFydChjcCkgJiYgKGNwICE9PSA5MikpIHtcblx0ICAgICAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5zY2FubmVyLmluZGV4O1xuXHQgICAgICAgICAgICArK3RoaXMuc2Nhbm5lci5pbmRleDtcblx0ICAgICAgICAgICAgd2hpbGUgKCF0aGlzLnNjYW5uZXIuZW9mKCkpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBjaCA9IHRoaXMuc2Nhbm5lci5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLnNjYW5uZXIuaW5kZXgpO1xuXHQgICAgICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0lkZW50aWZpZXJQYXJ0KGNoKSAmJiAoY2ggIT09IDkyKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICsrdGhpcy5zY2FubmVyLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IDQ1KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gSHlwaGVuIChjaGFyIGNvZGUgNDUpIGNhbiBiZSBwYXJ0IG9mIGFuIGlkZW50aWZpZXIuXG5cdCAgICAgICAgICAgICAgICAgICAgKyt0aGlzLnNjYW5uZXIuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIgaWQgPSB0aGlzLnNjYW5uZXIuc291cmNlLnNsaWNlKHN0YXJ0LCB0aGlzLnNjYW5uZXIuaW5kZXgpO1xuXHQgICAgICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICAgICAgdHlwZTogMTAwIC8qIElkZW50aWZpZXIgKi8sXG5cdCAgICAgICAgICAgICAgICB2YWx1ZTogaWQsXG5cdCAgICAgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLnNjYW5uZXIubGluZU51bWJlcixcblx0ICAgICAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5zY2FubmVyLmxpbmVTdGFydCxcblx0ICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcblx0ICAgICAgICAgICAgICAgIGVuZDogdGhpcy5zY2FubmVyLmluZGV4XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0aGlzLnNjYW5uZXIubGV4KCk7XG5cdCAgICB9O1xuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5uZXh0SlNYVG9rZW4gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdGhpcy5jb2xsZWN0Q29tbWVudHMoKTtcblx0ICAgICAgICB0aGlzLnN0YXJ0TWFya2VyLmluZGV4ID0gdGhpcy5zY2FubmVyLmluZGV4O1xuXHQgICAgICAgIHRoaXMuc3RhcnRNYXJrZXIubGluZSA9IHRoaXMuc2Nhbm5lci5saW5lTnVtYmVyO1xuXHQgICAgICAgIHRoaXMuc3RhcnRNYXJrZXIuY29sdW1uID0gdGhpcy5zY2FubmVyLmluZGV4IC0gdGhpcy5zY2FubmVyLmxpbmVTdGFydDtcblx0ICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLmxleEpTWCgpO1xuXHQgICAgICAgIHRoaXMubGFzdE1hcmtlci5pbmRleCA9IHRoaXMuc2Nhbm5lci5pbmRleDtcblx0ICAgICAgICB0aGlzLmxhc3RNYXJrZXIubGluZSA9IHRoaXMuc2Nhbm5lci5saW5lTnVtYmVyO1xuXHQgICAgICAgIHRoaXMubGFzdE1hcmtlci5jb2x1bW4gPSB0aGlzLnNjYW5uZXIuaW5kZXggLSB0aGlzLnNjYW5uZXIubGluZVN0YXJ0O1xuXHQgICAgICAgIGlmICh0aGlzLmNvbmZpZy50b2tlbnMpIHtcblx0ICAgICAgICAgICAgdGhpcy50b2tlbnMucHVzaCh0aGlzLmNvbnZlcnRUb2tlbih0b2tlbikpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdG9rZW47XG5cdCAgICB9O1xuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5uZXh0SlNYVGV4dCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB0aGlzLnN0YXJ0TWFya2VyLmluZGV4ID0gdGhpcy5zY2FubmVyLmluZGV4O1xuXHQgICAgICAgIHRoaXMuc3RhcnRNYXJrZXIubGluZSA9IHRoaXMuc2Nhbm5lci5saW5lTnVtYmVyO1xuXHQgICAgICAgIHRoaXMuc3RhcnRNYXJrZXIuY29sdW1uID0gdGhpcy5zY2FubmVyLmluZGV4IC0gdGhpcy5zY2FubmVyLmxpbmVTdGFydDtcblx0ICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLnNjYW5uZXIuaW5kZXg7XG5cdCAgICAgICAgdmFyIHRleHQgPSAnJztcblx0ICAgICAgICB3aGlsZSAoIXRoaXMuc2Nhbm5lci5lb2YoKSkge1xuXHQgICAgICAgICAgICB2YXIgY2ggPSB0aGlzLnNjYW5uZXIuc291cmNlW3RoaXMuc2Nhbm5lci5pbmRleF07XG5cdCAgICAgICAgICAgIGlmIChjaCA9PT0gJ3snIHx8IGNoID09PSAnPCcpIHtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICsrdGhpcy5zY2FubmVyLmluZGV4O1xuXHQgICAgICAgICAgICB0ZXh0ICs9IGNoO1xuXHQgICAgICAgICAgICBpZiAoY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzTGluZVRlcm1pbmF0b3IoY2guY2hhckNvZGVBdCgwKSkpIHtcblx0ICAgICAgICAgICAgICAgICsrdGhpcy5zY2FubmVyLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICdcXHInICYmIHRoaXMuc2Nhbm5lci5zb3VyY2VbdGhpcy5zY2FubmVyLmluZGV4XSA9PT0gJ1xcbicpIHtcblx0ICAgICAgICAgICAgICAgICAgICArK3RoaXMuc2Nhbm5lci5pbmRleDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHRoaXMuc2Nhbm5lci5saW5lU3RhcnQgPSB0aGlzLnNjYW5uZXIuaW5kZXg7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5sYXN0TWFya2VyLmluZGV4ID0gdGhpcy5zY2FubmVyLmluZGV4O1xuXHQgICAgICAgIHRoaXMubGFzdE1hcmtlci5saW5lID0gdGhpcy5zY2FubmVyLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgdGhpcy5sYXN0TWFya2VyLmNvbHVtbiA9IHRoaXMuc2Nhbm5lci5pbmRleCAtIHRoaXMuc2Nhbm5lci5saW5lU3RhcnQ7XG5cdCAgICAgICAgdmFyIHRva2VuID0ge1xuXHQgICAgICAgICAgICB0eXBlOiAxMDEgLyogVGV4dCAqLyxcblx0ICAgICAgICAgICAgdmFsdWU6IHRleHQsXG5cdCAgICAgICAgICAgIGxpbmVOdW1iZXI6IHRoaXMuc2Nhbm5lci5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICBsaW5lU3RhcnQ6IHRoaXMuc2Nhbm5lci5saW5lU3RhcnQsXG5cdCAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcblx0ICAgICAgICAgICAgZW5kOiB0aGlzLnNjYW5uZXIuaW5kZXhcblx0ICAgICAgICB9O1xuXHQgICAgICAgIGlmICgodGV4dC5sZW5ndGggPiAwKSAmJiB0aGlzLmNvbmZpZy50b2tlbnMpIHtcblx0ICAgICAgICAgICAgdGhpcy50b2tlbnMucHVzaCh0aGlzLmNvbnZlcnRUb2tlbih0b2tlbikpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdG9rZW47XG5cdCAgICB9O1xuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5wZWVrSlNYVG9rZW4gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5zY2FubmVyLnNhdmVTdGF0ZSgpO1xuXHQgICAgICAgIHRoaXMuc2Nhbm5lci5zY2FuQ29tbWVudHMoKTtcblx0ICAgICAgICB2YXIgbmV4dCA9IHRoaXMubGV4SlNYKCk7XG5cdCAgICAgICAgdGhpcy5zY2FubmVyLnJlc3RvcmVTdGF0ZShzdGF0ZSk7XG5cdCAgICAgICAgcmV0dXJuIG5leHQ7XG5cdCAgICB9O1xuXHQgICAgLy8gRXhwZWN0IHRoZSBuZXh0IEpTWCB0b2tlbiB0byBtYXRjaCB0aGUgc3BlY2lmaWVkIHB1bmN0dWF0b3IuXG5cdCAgICAvLyBJZiBub3QsIGFuIGV4Y2VwdGlvbiB3aWxsIGJlIHRocm93bi5cblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUuZXhwZWN0SlNYID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgICAgICAgdmFyIHRva2VuID0gdGhpcy5uZXh0SlNYVG9rZW4oKTtcblx0ICAgICAgICBpZiAodG9rZW4udHlwZSAhPT0gNyAvKiBQdW5jdHVhdG9yICovIHx8IHRva2VuLnZhbHVlICE9PSB2YWx1ZSkge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRva2VuKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgLy8gUmV0dXJuIHRydWUgaWYgdGhlIG5leHQgSlNYIHRva2VuIG1hdGNoZXMgdGhlIHNwZWNpZmllZCBwdW5jdHVhdG9yLlxuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5tYXRjaEpTWCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgICAgIHZhciBuZXh0ID0gdGhpcy5wZWVrSlNYVG9rZW4oKTtcblx0ICAgICAgICByZXR1cm4gbmV4dC50eXBlID09PSA3IC8qIFB1bmN0dWF0b3IgKi8gJiYgbmV4dC52YWx1ZSA9PT0gdmFsdWU7XG5cdCAgICB9O1xuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5wYXJzZUpTWElkZW50aWZpZXIgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZUpTWE5vZGUoKTtcblx0ICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLm5leHRKU1hUb2tlbigpO1xuXHQgICAgICAgIGlmICh0b2tlbi50eXBlICE9PSAxMDAgLyogSWRlbnRpZmllciAqLykge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRva2VuKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IEpTWE5vZGUuSlNYSWRlbnRpZmllcih0b2tlbi52YWx1ZSkpO1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUucGFyc2VKU1hFbGVtZW50TmFtZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlSlNYTm9kZSgpO1xuXHQgICAgICAgIHZhciBlbGVtZW50TmFtZSA9IHRoaXMucGFyc2VKU1hJZGVudGlmaWVyKCk7XG5cdCAgICAgICAgaWYgKHRoaXMubWF0Y2hKU1goJzonKSkge1xuXHQgICAgICAgICAgICB2YXIgbmFtZXNwYWNlID0gZWxlbWVudE5hbWU7XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0SlNYKCc6Jyk7XG5cdCAgICAgICAgICAgIHZhciBuYW1lXzEgPSB0aGlzLnBhcnNlSlNYSWRlbnRpZmllcigpO1xuXHQgICAgICAgICAgICBlbGVtZW50TmFtZSA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IEpTWE5vZGUuSlNYTmFtZXNwYWNlZE5hbWUobmFtZXNwYWNlLCBuYW1lXzEpKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSBpZiAodGhpcy5tYXRjaEpTWCgnLicpKSB7XG5cdCAgICAgICAgICAgIHdoaWxlICh0aGlzLm1hdGNoSlNYKCcuJykpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBvYmplY3QgPSBlbGVtZW50TmFtZTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuZXhwZWN0SlNYKCcuJyk7XG5cdCAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHkgPSB0aGlzLnBhcnNlSlNYSWRlbnRpZmllcigpO1xuXHQgICAgICAgICAgICAgICAgZWxlbWVudE5hbWUgPSB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBKU1hOb2RlLkpTWE1lbWJlckV4cHJlc3Npb24ob2JqZWN0LCBwcm9wZXJ0eSkpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBlbGVtZW50TmFtZTtcblx0ICAgIH07XG5cdCAgICBKU1hQYXJzZXIucHJvdG90eXBlLnBhcnNlSlNYQXR0cmlidXRlTmFtZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlSlNYTm9kZSgpO1xuXHQgICAgICAgIHZhciBhdHRyaWJ1dGVOYW1lO1xuXHQgICAgICAgIHZhciBpZGVudGlmaWVyID0gdGhpcy5wYXJzZUpTWElkZW50aWZpZXIoKTtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaEpTWCgnOicpKSB7XG5cdCAgICAgICAgICAgIHZhciBuYW1lc3BhY2UgPSBpZGVudGlmaWVyO1xuXHQgICAgICAgICAgICB0aGlzLmV4cGVjdEpTWCgnOicpO1xuXHQgICAgICAgICAgICB2YXIgbmFtZV8yID0gdGhpcy5wYXJzZUpTWElkZW50aWZpZXIoKTtcblx0ICAgICAgICAgICAgYXR0cmlidXRlTmFtZSA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IEpTWE5vZGUuSlNYTmFtZXNwYWNlZE5hbWUobmFtZXNwYWNlLCBuYW1lXzIpKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWUgPSBpZGVudGlmaWVyO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gYXR0cmlidXRlTmFtZTtcblx0ICAgIH07XG5cdCAgICBKU1hQYXJzZXIucHJvdG90eXBlLnBhcnNlSlNYU3RyaW5nTGl0ZXJhbEF0dHJpYnV0ZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlSlNYTm9kZSgpO1xuXHQgICAgICAgIHZhciB0b2tlbiA9IHRoaXMubmV4dEpTWFRva2VuKCk7XG5cdCAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09IDggLyogU3RyaW5nTGl0ZXJhbCAqLykge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRva2VuKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIHJhdyA9IHRoaXMuZ2V0VG9rZW5SYXcodG9rZW4pO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkxpdGVyYWwodG9rZW4udmFsdWUsIHJhdykpO1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUucGFyc2VKU1hFeHByZXNzaW9uQXR0cmlidXRlID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVKU1hOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RKU1goJ3snKTtcblx0ICAgICAgICB0aGlzLmZpbmlzaEpTWCgpO1xuXHQgICAgICAgIGlmICh0aGlzLm1hdGNoKCd9JykpIHtcblx0ICAgICAgICAgICAgdGhpcy50b2xlcmF0ZUVycm9yKCdKU1ggYXR0cmlidXRlcyBtdXN0IG9ubHkgYmUgYXNzaWduZWQgYSBub24tZW1wdHkgZXhwcmVzc2lvbicpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgZXhwcmVzc2lvbiA9IHRoaXMucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbigpO1xuXHQgICAgICAgIHRoaXMucmVlbnRlckpTWCgpO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBKU1hOb2RlLkpTWEV4cHJlc3Npb25Db250YWluZXIoZXhwcmVzc2lvbikpO1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUucGFyc2VKU1hBdHRyaWJ1dGVWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5tYXRjaEpTWCgneycpID8gdGhpcy5wYXJzZUpTWEV4cHJlc3Npb25BdHRyaWJ1dGUoKSA6XG5cdCAgICAgICAgICAgIHRoaXMubWF0Y2hKU1goJzwnKSA/IHRoaXMucGFyc2VKU1hFbGVtZW50KCkgOiB0aGlzLnBhcnNlSlNYU3RyaW5nTGl0ZXJhbEF0dHJpYnV0ZSgpO1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUucGFyc2VKU1hOYW1lVmFsdWVBdHRyaWJ1dGUgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZUpTWE5vZGUoKTtcblx0ICAgICAgICB2YXIgbmFtZSA9IHRoaXMucGFyc2VKU1hBdHRyaWJ1dGVOYW1lKCk7XG5cdCAgICAgICAgdmFyIHZhbHVlID0gbnVsbDtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaEpTWCgnPScpKSB7XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0SlNYKCc9Jyk7XG5cdCAgICAgICAgICAgIHZhbHVlID0gdGhpcy5wYXJzZUpTWEF0dHJpYnV0ZVZhbHVlKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBKU1hOb2RlLkpTWEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkpO1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUucGFyc2VKU1hTcHJlYWRBdHRyaWJ1dGUgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZUpTWE5vZGUoKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdEpTWCgneycpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0SlNYKCcuLi4nKTtcblx0ICAgICAgICB0aGlzLmZpbmlzaEpTWCgpO1xuXHQgICAgICAgIHZhciBhcmd1bWVudCA9IHRoaXMucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbigpO1xuXHQgICAgICAgIHRoaXMucmVlbnRlckpTWCgpO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBKU1hOb2RlLkpTWFNwcmVhZEF0dHJpYnV0ZShhcmd1bWVudCkpO1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUucGFyc2VKU1hBdHRyaWJ1dGVzID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gW107XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLm1hdGNoSlNYKCcvJykgJiYgIXRoaXMubWF0Y2hKU1goJz4nKSkge1xuXHQgICAgICAgICAgICB2YXIgYXR0cmlidXRlID0gdGhpcy5tYXRjaEpTWCgneycpID8gdGhpcy5wYXJzZUpTWFNwcmVhZEF0dHJpYnV0ZSgpIDpcblx0ICAgICAgICAgICAgICAgIHRoaXMucGFyc2VKU1hOYW1lVmFsdWVBdHRyaWJ1dGUoKTtcblx0ICAgICAgICAgICAgYXR0cmlidXRlcy5wdXNoKGF0dHJpYnV0ZSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBhdHRyaWJ1dGVzO1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUucGFyc2VKU1hPcGVuaW5nRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlSlNYTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0SlNYKCc8Jyk7XG5cdCAgICAgICAgdmFyIG5hbWUgPSB0aGlzLnBhcnNlSlNYRWxlbWVudE5hbWUoKTtcblx0ICAgICAgICB2YXIgYXR0cmlidXRlcyA9IHRoaXMucGFyc2VKU1hBdHRyaWJ1dGVzKCk7XG5cdCAgICAgICAgdmFyIHNlbGZDbG9zaW5nID0gdGhpcy5tYXRjaEpTWCgnLycpO1xuXHQgICAgICAgIGlmIChzZWxmQ2xvc2luZykge1xuXHQgICAgICAgICAgICB0aGlzLmV4cGVjdEpTWCgnLycpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmV4cGVjdEpTWCgnPicpO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBKU1hOb2RlLkpTWE9wZW5pbmdFbGVtZW50KG5hbWUsIHNlbGZDbG9zaW5nLCBhdHRyaWJ1dGVzKSk7XG5cdCAgICB9O1xuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5wYXJzZUpTWEJvdW5kYXJ5RWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlSlNYTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0SlNYKCc8Jyk7XG5cdCAgICAgICAgaWYgKHRoaXMubWF0Y2hKU1goJy8nKSkge1xuXHQgICAgICAgICAgICB0aGlzLmV4cGVjdEpTWCgnLycpO1xuXHQgICAgICAgICAgICB2YXIgbmFtZV8zID0gdGhpcy5wYXJzZUpTWEVsZW1lbnROYW1lKCk7XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0SlNYKCc+Jyk7XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBKU1hOb2RlLkpTWENsb3NpbmdFbGVtZW50KG5hbWVfMykpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgbmFtZSA9IHRoaXMucGFyc2VKU1hFbGVtZW50TmFtZSgpO1xuXHQgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gdGhpcy5wYXJzZUpTWEF0dHJpYnV0ZXMoKTtcblx0ICAgICAgICB2YXIgc2VsZkNsb3NpbmcgPSB0aGlzLm1hdGNoSlNYKCcvJyk7XG5cdCAgICAgICAgaWYgKHNlbGZDbG9zaW5nKSB7XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0SlNYKCcvJyk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMuZXhwZWN0SlNYKCc+Jyk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IEpTWE5vZGUuSlNYT3BlbmluZ0VsZW1lbnQobmFtZSwgc2VsZkNsb3NpbmcsIGF0dHJpYnV0ZXMpKTtcblx0ICAgIH07XG5cdCAgICBKU1hQYXJzZXIucHJvdG90eXBlLnBhcnNlSlNYRW1wdHlFeHByZXNzaW9uID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVKU1hDaGlsZE5vZGUoKTtcblx0ICAgICAgICB0aGlzLmNvbGxlY3RDb21tZW50cygpO1xuXHQgICAgICAgIHRoaXMubGFzdE1hcmtlci5pbmRleCA9IHRoaXMuc2Nhbm5lci5pbmRleDtcblx0ICAgICAgICB0aGlzLmxhc3RNYXJrZXIubGluZSA9IHRoaXMuc2Nhbm5lci5saW5lTnVtYmVyO1xuXHQgICAgICAgIHRoaXMubGFzdE1hcmtlci5jb2x1bW4gPSB0aGlzLnNjYW5uZXIuaW5kZXggLSB0aGlzLnNjYW5uZXIubGluZVN0YXJ0O1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBKU1hOb2RlLkpTWEVtcHR5RXhwcmVzc2lvbigpKTtcblx0ICAgIH07XG5cdCAgICBKU1hQYXJzZXIucHJvdG90eXBlLnBhcnNlSlNYRXhwcmVzc2lvbkNvbnRhaW5lciA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlSlNYTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0SlNYKCd7Jyk7XG5cdCAgICAgICAgdmFyIGV4cHJlc3Npb247XG5cdCAgICAgICAgaWYgKHRoaXMubWF0Y2hKU1goJ30nKSkge1xuXHQgICAgICAgICAgICBleHByZXNzaW9uID0gdGhpcy5wYXJzZUpTWEVtcHR5RXhwcmVzc2lvbigpO1xuXHQgICAgICAgICAgICB0aGlzLmV4cGVjdEpTWCgnfScpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdGhpcy5maW5pc2hKU1goKTtcblx0ICAgICAgICAgICAgZXhwcmVzc2lvbiA9IHRoaXMucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbigpO1xuXHQgICAgICAgICAgICB0aGlzLnJlZW50ZXJKU1goKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IEpTWE5vZGUuSlNYRXhwcmVzc2lvbkNvbnRhaW5lcihleHByZXNzaW9uKSk7XG5cdCAgICB9O1xuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5wYXJzZUpTWENoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBjaGlsZHJlbiA9IFtdO1xuXHQgICAgICAgIHdoaWxlICghdGhpcy5zY2FubmVyLmVvZigpKSB7XG5cdCAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVKU1hDaGlsZE5vZGUoKTtcblx0ICAgICAgICAgICAgdmFyIHRva2VuID0gdGhpcy5uZXh0SlNYVGV4dCgpO1xuXHQgICAgICAgICAgICBpZiAodG9rZW4uc3RhcnQgPCB0b2tlbi5lbmQpIHtcblx0ICAgICAgICAgICAgICAgIHZhciByYXcgPSB0aGlzLmdldFRva2VuUmF3KHRva2VuKTtcblx0ICAgICAgICAgICAgICAgIHZhciBjaGlsZCA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IEpTWE5vZGUuSlNYVGV4dCh0b2tlbi52YWx1ZSwgcmF3KSk7XG5cdCAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAodGhpcy5zY2FubmVyLnNvdXJjZVt0aGlzLnNjYW5uZXIuaW5kZXhdID09PSAneycpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLnBhcnNlSlNYRXhwcmVzc2lvbkNvbnRhaW5lcigpO1xuXHQgICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChjb250YWluZXIpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUucGFyc2VDb21wbGV4SlNYRWxlbWVudCA9IGZ1bmN0aW9uIChlbCkge1xuXHQgICAgICAgIHZhciBzdGFjayA9IFtdO1xuXHQgICAgICAgIHdoaWxlICghdGhpcy5zY2FubmVyLmVvZigpKSB7XG5cdCAgICAgICAgICAgIGVsLmNoaWxkcmVuID0gZWwuY2hpbGRyZW4uY29uY2F0KHRoaXMucGFyc2VKU1hDaGlsZHJlbigpKTtcblx0ICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZUpTWENoaWxkTm9kZSgpO1xuXHQgICAgICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMucGFyc2VKU1hCb3VuZGFyeUVsZW1lbnQoKTtcblx0ICAgICAgICAgICAgaWYgKGVsZW1lbnQudHlwZSA9PT0ganN4X3N5bnRheF8xLkpTWFN5bnRheC5KU1hPcGVuaW5nRWxlbWVudCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIG9wZW5pbmcgPSBlbGVtZW50O1xuXHQgICAgICAgICAgICAgICAgaWYgKG9wZW5pbmcuc2VsZkNsb3NpbmcpIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBKU1hOb2RlLkpTWEVsZW1lbnQob3BlbmluZywgW10sIG51bGwpKTtcblx0ICAgICAgICAgICAgICAgICAgICBlbC5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2goZWwpO1xuXHQgICAgICAgICAgICAgICAgICAgIGVsID0geyBub2RlOiBub2RlLCBvcGVuaW5nOiBvcGVuaW5nLCBjbG9zaW5nOiBudWxsLCBjaGlsZHJlbjogW10gfTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoZWxlbWVudC50eXBlID09PSBqc3hfc3ludGF4XzEuSlNYU3ludGF4LkpTWENsb3NpbmdFbGVtZW50KSB7XG5cdCAgICAgICAgICAgICAgICBlbC5jbG9zaW5nID0gZWxlbWVudDtcblx0ICAgICAgICAgICAgICAgIHZhciBvcGVuXzEgPSBnZXRRdWFsaWZpZWRFbGVtZW50TmFtZShlbC5vcGVuaW5nLm5hbWUpO1xuXHQgICAgICAgICAgICAgICAgdmFyIGNsb3NlXzEgPSBnZXRRdWFsaWZpZWRFbGVtZW50TmFtZShlbC5jbG9zaW5nLm5hbWUpO1xuXHQgICAgICAgICAgICAgICAgaWYgKG9wZW5fMSAhPT0gY2xvc2VfMSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVFcnJvcignRXhwZWN0ZWQgY29ycmVzcG9uZGluZyBKU1ggY2xvc2luZyB0YWcgZm9yICUwJywgb3Blbl8xKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGggPiAwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gdGhpcy5maW5hbGl6ZShlbC5ub2RlLCBuZXcgSlNYTm9kZS5KU1hFbGVtZW50KGVsLm9wZW5pbmcsIGVsLmNoaWxkcmVuLCBlbC5jbG9zaW5nKSk7XG5cdCAgICAgICAgICAgICAgICAgICAgZWwgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXTtcblx0ICAgICAgICAgICAgICAgICAgICBlbC5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcblx0ICAgICAgICAgICAgICAgICAgICBzdGFjay5wb3AoKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBlbDtcblx0ICAgIH07XG5cdCAgICBKU1hQYXJzZXIucHJvdG90eXBlLnBhcnNlSlNYRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlSlNYTm9kZSgpO1xuXHQgICAgICAgIHZhciBvcGVuaW5nID0gdGhpcy5wYXJzZUpTWE9wZW5pbmdFbGVtZW50KCk7XG5cdCAgICAgICAgdmFyIGNoaWxkcmVuID0gW107XG5cdCAgICAgICAgdmFyIGNsb3NpbmcgPSBudWxsO1xuXHQgICAgICAgIGlmICghb3BlbmluZy5zZWxmQ2xvc2luZykge1xuXHQgICAgICAgICAgICB2YXIgZWwgPSB0aGlzLnBhcnNlQ29tcGxleEpTWEVsZW1lbnQoeyBub2RlOiBub2RlLCBvcGVuaW5nOiBvcGVuaW5nLCBjbG9zaW5nOiBjbG9zaW5nLCBjaGlsZHJlbjogY2hpbGRyZW4gfSk7XG5cdCAgICAgICAgICAgIGNoaWxkcmVuID0gZWwuY2hpbGRyZW47XG5cdCAgICAgICAgICAgIGNsb3NpbmcgPSBlbC5jbG9zaW5nO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgSlNYTm9kZS5KU1hFbGVtZW50KG9wZW5pbmcsIGNoaWxkcmVuLCBjbG9zaW5nKSk7XG5cdCAgICB9O1xuXHQgICAgSlNYUGFyc2VyLnByb3RvdHlwZS5wYXJzZUpTWFJvb3QgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgLy8gUG9wIHRoZSBvcGVuaW5nICc8JyBhZGRlZCBmcm9tIHRoZSBsb29rYWhlYWQuXG5cdCAgICAgICAgaWYgKHRoaXMuY29uZmlnLnRva2Vucykge1xuXHQgICAgICAgICAgICB0aGlzLnRva2Vucy5wb3AoKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5zdGFydEpTWCgpO1xuXHQgICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5wYXJzZUpTWEVsZW1lbnQoKTtcblx0ICAgICAgICB0aGlzLmZpbmlzaEpTWCgpO1xuXHQgICAgICAgIHJldHVybiBlbGVtZW50O1xuXHQgICAgfTtcblx0ICAgIEpTWFBhcnNlci5wcm90b3R5cGUuaXNTdGFydE9mRXhwcmVzc2lvbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5pc1N0YXJ0T2ZFeHByZXNzaW9uLmNhbGwodGhpcykgfHwgdGhpcy5tYXRjaCgnPCcpO1xuXHQgICAgfTtcblx0ICAgIHJldHVybiBKU1hQYXJzZXI7XG5cdH0ocGFyc2VyXzEuUGFyc2VyKSk7XG5cdGV4cG9ydHMuSlNYUGFyc2VyID0gSlNYUGFyc2VyO1xuXG5cbi8qKiovIH0sXG4vKiA0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuXHQvLyBTZWUgYWxzbyB0b29scy9nZW5lcmF0ZS11bmljb2RlLXJlZ2V4LmpzLlxuXHR2YXIgUmVnZXggPSB7XG5cdCAgICAvLyBVbmljb2RlIHY4LjAuMCBOb25Bc2NpaUlkZW50aWZpZXJTdGFydDpcblx0ICAgIE5vbkFzY2lpSWRlbnRpZmllclN0YXJ0OiAvW1xceEFBXFx4QjVcXHhCQVxceEMwLVxceEQ2XFx4RDgtXFx4RjZcXHhGOC1cXHUwMkMxXFx1MDJDNi1cXHUwMkQxXFx1MDJFMC1cXHUwMkU0XFx1MDJFQ1xcdTAyRUVcXHUwMzcwLVxcdTAzNzRcXHUwMzc2XFx1MDM3N1xcdTAzN0EtXFx1MDM3RFxcdTAzN0ZcXHUwMzg2XFx1MDM4OC1cXHUwMzhBXFx1MDM4Q1xcdTAzOEUtXFx1MDNBMVxcdTAzQTMtXFx1MDNGNVxcdTAzRjctXFx1MDQ4MVxcdTA0OEEtXFx1MDUyRlxcdTA1MzEtXFx1MDU1NlxcdTA1NTlcXHUwNTYxLVxcdTA1ODdcXHUwNUQwLVxcdTA1RUFcXHUwNUYwLVxcdTA1RjJcXHUwNjIwLVxcdTA2NEFcXHUwNjZFXFx1MDY2RlxcdTA2NzEtXFx1MDZEM1xcdTA2RDVcXHUwNkU1XFx1MDZFNlxcdTA2RUVcXHUwNkVGXFx1MDZGQS1cXHUwNkZDXFx1MDZGRlxcdTA3MTBcXHUwNzEyLVxcdTA3MkZcXHUwNzRELVxcdTA3QTVcXHUwN0IxXFx1MDdDQS1cXHUwN0VBXFx1MDdGNFxcdTA3RjVcXHUwN0ZBXFx1MDgwMC1cXHUwODE1XFx1MDgxQVxcdTA4MjRcXHUwODI4XFx1MDg0MC1cXHUwODU4XFx1MDhBMC1cXHUwOEI0XFx1MDkwNC1cXHUwOTM5XFx1MDkzRFxcdTA5NTBcXHUwOTU4LVxcdTA5NjFcXHUwOTcxLVxcdTA5ODBcXHUwOTg1LVxcdTA5OENcXHUwOThGXFx1MDk5MFxcdTA5OTMtXFx1MDlBOFxcdTA5QUEtXFx1MDlCMFxcdTA5QjJcXHUwOUI2LVxcdTA5QjlcXHUwOUJEXFx1MDlDRVxcdTA5RENcXHUwOUREXFx1MDlERi1cXHUwOUUxXFx1MDlGMFxcdTA5RjFcXHUwQTA1LVxcdTBBMEFcXHUwQTBGXFx1MEExMFxcdTBBMTMtXFx1MEEyOFxcdTBBMkEtXFx1MEEzMFxcdTBBMzJcXHUwQTMzXFx1MEEzNVxcdTBBMzZcXHUwQTM4XFx1MEEzOVxcdTBBNTktXFx1MEE1Q1xcdTBBNUVcXHUwQTcyLVxcdTBBNzRcXHUwQTg1LVxcdTBBOERcXHUwQThGLVxcdTBBOTFcXHUwQTkzLVxcdTBBQThcXHUwQUFBLVxcdTBBQjBcXHUwQUIyXFx1MEFCM1xcdTBBQjUtXFx1MEFCOVxcdTBBQkRcXHUwQUQwXFx1MEFFMFxcdTBBRTFcXHUwQUY5XFx1MEIwNS1cXHUwQjBDXFx1MEIwRlxcdTBCMTBcXHUwQjEzLVxcdTBCMjhcXHUwQjJBLVxcdTBCMzBcXHUwQjMyXFx1MEIzM1xcdTBCMzUtXFx1MEIzOVxcdTBCM0RcXHUwQjVDXFx1MEI1RFxcdTBCNUYtXFx1MEI2MVxcdTBCNzFcXHUwQjgzXFx1MEI4NS1cXHUwQjhBXFx1MEI4RS1cXHUwQjkwXFx1MEI5Mi1cXHUwQjk1XFx1MEI5OVxcdTBCOUFcXHUwQjlDXFx1MEI5RVxcdTBCOUZcXHUwQkEzXFx1MEJBNFxcdTBCQTgtXFx1MEJBQVxcdTBCQUUtXFx1MEJCOVxcdTBCRDBcXHUwQzA1LVxcdTBDMENcXHUwQzBFLVxcdTBDMTBcXHUwQzEyLVxcdTBDMjhcXHUwQzJBLVxcdTBDMzlcXHUwQzNEXFx1MEM1OC1cXHUwQzVBXFx1MEM2MFxcdTBDNjFcXHUwQzg1LVxcdTBDOENcXHUwQzhFLVxcdTBDOTBcXHUwQzkyLVxcdTBDQThcXHUwQ0FBLVxcdTBDQjNcXHUwQ0I1LVxcdTBDQjlcXHUwQ0JEXFx1MENERVxcdTBDRTBcXHUwQ0UxXFx1MENGMVxcdTBDRjJcXHUwRDA1LVxcdTBEMENcXHUwRDBFLVxcdTBEMTBcXHUwRDEyLVxcdTBEM0FcXHUwRDNEXFx1MEQ0RVxcdTBENUYtXFx1MEQ2MVxcdTBEN0EtXFx1MEQ3RlxcdTBEODUtXFx1MEQ5NlxcdTBEOUEtXFx1MERCMVxcdTBEQjMtXFx1MERCQlxcdTBEQkRcXHUwREMwLVxcdTBEQzZcXHUwRTAxLVxcdTBFMzBcXHUwRTMyXFx1MEUzM1xcdTBFNDAtXFx1MEU0NlxcdTBFODFcXHUwRTgyXFx1MEU4NFxcdTBFODdcXHUwRTg4XFx1MEU4QVxcdTBFOERcXHUwRTk0LVxcdTBFOTdcXHUwRTk5LVxcdTBFOUZcXHUwRUExLVxcdTBFQTNcXHUwRUE1XFx1MEVBN1xcdTBFQUFcXHUwRUFCXFx1MEVBRC1cXHUwRUIwXFx1MEVCMlxcdTBFQjNcXHUwRUJEXFx1MEVDMC1cXHUwRUM0XFx1MEVDNlxcdTBFREMtXFx1MEVERlxcdTBGMDBcXHUwRjQwLVxcdTBGNDdcXHUwRjQ5LVxcdTBGNkNcXHUwRjg4LVxcdTBGOENcXHUxMDAwLVxcdTEwMkFcXHUxMDNGXFx1MTA1MC1cXHUxMDU1XFx1MTA1QS1cXHUxMDVEXFx1MTA2MVxcdTEwNjVcXHUxMDY2XFx1MTA2RS1cXHUxMDcwXFx1MTA3NS1cXHUxMDgxXFx1MTA4RVxcdTEwQTAtXFx1MTBDNVxcdTEwQzdcXHUxMENEXFx1MTBEMC1cXHUxMEZBXFx1MTBGQy1cXHUxMjQ4XFx1MTI0QS1cXHUxMjREXFx1MTI1MC1cXHUxMjU2XFx1MTI1OFxcdTEyNUEtXFx1MTI1RFxcdTEyNjAtXFx1MTI4OFxcdTEyOEEtXFx1MTI4RFxcdTEyOTAtXFx1MTJCMFxcdTEyQjItXFx1MTJCNVxcdTEyQjgtXFx1MTJCRVxcdTEyQzBcXHUxMkMyLVxcdTEyQzVcXHUxMkM4LVxcdTEyRDZcXHUxMkQ4LVxcdTEzMTBcXHUxMzEyLVxcdTEzMTVcXHUxMzE4LVxcdTEzNUFcXHUxMzgwLVxcdTEzOEZcXHUxM0EwLVxcdTEzRjVcXHUxM0Y4LVxcdTEzRkRcXHUxNDAxLVxcdTE2NkNcXHUxNjZGLVxcdTE2N0ZcXHUxNjgxLVxcdTE2OUFcXHUxNkEwLVxcdTE2RUFcXHUxNkVFLVxcdTE2RjhcXHUxNzAwLVxcdTE3MENcXHUxNzBFLVxcdTE3MTFcXHUxNzIwLVxcdTE3MzFcXHUxNzQwLVxcdTE3NTFcXHUxNzYwLVxcdTE3NkNcXHUxNzZFLVxcdTE3NzBcXHUxNzgwLVxcdTE3QjNcXHUxN0Q3XFx1MTdEQ1xcdTE4MjAtXFx1MTg3N1xcdTE4ODAtXFx1MThBOFxcdTE4QUFcXHUxOEIwLVxcdTE4RjVcXHUxOTAwLVxcdTE5MUVcXHUxOTUwLVxcdTE5NkRcXHUxOTcwLVxcdTE5NzRcXHUxOTgwLVxcdTE5QUJcXHUxOUIwLVxcdTE5QzlcXHUxQTAwLVxcdTFBMTZcXHUxQTIwLVxcdTFBNTRcXHUxQUE3XFx1MUIwNS1cXHUxQjMzXFx1MUI0NS1cXHUxQjRCXFx1MUI4My1cXHUxQkEwXFx1MUJBRVxcdTFCQUZcXHUxQkJBLVxcdTFCRTVcXHUxQzAwLVxcdTFDMjNcXHUxQzRELVxcdTFDNEZcXHUxQzVBLVxcdTFDN0RcXHUxQ0U5LVxcdTFDRUNcXHUxQ0VFLVxcdTFDRjFcXHUxQ0Y1XFx1MUNGNlxcdTFEMDAtXFx1MURCRlxcdTFFMDAtXFx1MUYxNVxcdTFGMTgtXFx1MUYxRFxcdTFGMjAtXFx1MUY0NVxcdTFGNDgtXFx1MUY0RFxcdTFGNTAtXFx1MUY1N1xcdTFGNTlcXHUxRjVCXFx1MUY1RFxcdTFGNUYtXFx1MUY3RFxcdTFGODAtXFx1MUZCNFxcdTFGQjYtXFx1MUZCQ1xcdTFGQkVcXHUxRkMyLVxcdTFGQzRcXHUxRkM2LVxcdTFGQ0NcXHUxRkQwLVxcdTFGRDNcXHUxRkQ2LVxcdTFGREJcXHUxRkUwLVxcdTFGRUNcXHUxRkYyLVxcdTFGRjRcXHUxRkY2LVxcdTFGRkNcXHUyMDcxXFx1MjA3RlxcdTIwOTAtXFx1MjA5Q1xcdTIxMDJcXHUyMTA3XFx1MjEwQS1cXHUyMTEzXFx1MjExNVxcdTIxMTgtXFx1MjExRFxcdTIxMjRcXHUyMTI2XFx1MjEyOFxcdTIxMkEtXFx1MjEzOVxcdTIxM0MtXFx1MjEzRlxcdTIxNDUtXFx1MjE0OVxcdTIxNEVcXHUyMTYwLVxcdTIxODhcXHUyQzAwLVxcdTJDMkVcXHUyQzMwLVxcdTJDNUVcXHUyQzYwLVxcdTJDRTRcXHUyQ0VCLVxcdTJDRUVcXHUyQ0YyXFx1MkNGM1xcdTJEMDAtXFx1MkQyNVxcdTJEMjdcXHUyRDJEXFx1MkQzMC1cXHUyRDY3XFx1MkQ2RlxcdTJEODAtXFx1MkQ5NlxcdTJEQTAtXFx1MkRBNlxcdTJEQTgtXFx1MkRBRVxcdTJEQjAtXFx1MkRCNlxcdTJEQjgtXFx1MkRCRVxcdTJEQzAtXFx1MkRDNlxcdTJEQzgtXFx1MkRDRVxcdTJERDAtXFx1MkRENlxcdTJERDgtXFx1MkRERVxcdTMwMDUtXFx1MzAwN1xcdTMwMjEtXFx1MzAyOVxcdTMwMzEtXFx1MzAzNVxcdTMwMzgtXFx1MzAzQ1xcdTMwNDEtXFx1MzA5NlxcdTMwOUItXFx1MzA5RlxcdTMwQTEtXFx1MzBGQVxcdTMwRkMtXFx1MzBGRlxcdTMxMDUtXFx1MzEyRFxcdTMxMzEtXFx1MzE4RVxcdTMxQTAtXFx1MzFCQVxcdTMxRjAtXFx1MzFGRlxcdTM0MDAtXFx1NERCNVxcdTRFMDAtXFx1OUZENVxcdUEwMDAtXFx1QTQ4Q1xcdUE0RDAtXFx1QTRGRFxcdUE1MDAtXFx1QTYwQ1xcdUE2MTAtXFx1QTYxRlxcdUE2MkFcXHVBNjJCXFx1QTY0MC1cXHVBNjZFXFx1QTY3Ri1cXHVBNjlEXFx1QTZBMC1cXHVBNkVGXFx1QTcxNy1cXHVBNzFGXFx1QTcyMi1cXHVBNzg4XFx1QTc4Qi1cXHVBN0FEXFx1QTdCMC1cXHVBN0I3XFx1QTdGNy1cXHVBODAxXFx1QTgwMy1cXHVBODA1XFx1QTgwNy1cXHVBODBBXFx1QTgwQy1cXHVBODIyXFx1QTg0MC1cXHVBODczXFx1QTg4Mi1cXHVBOEIzXFx1QThGMi1cXHVBOEY3XFx1QThGQlxcdUE4RkRcXHVBOTBBLVxcdUE5MjVcXHVBOTMwLVxcdUE5NDZcXHVBOTYwLVxcdUE5N0NcXHVBOTg0LVxcdUE5QjJcXHVBOUNGXFx1QTlFMC1cXHVBOUU0XFx1QTlFNi1cXHVBOUVGXFx1QTlGQS1cXHVBOUZFXFx1QUEwMC1cXHVBQTI4XFx1QUE0MC1cXHVBQTQyXFx1QUE0NC1cXHVBQTRCXFx1QUE2MC1cXHVBQTc2XFx1QUE3QVxcdUFBN0UtXFx1QUFBRlxcdUFBQjFcXHVBQUI1XFx1QUFCNlxcdUFBQjktXFx1QUFCRFxcdUFBQzBcXHVBQUMyXFx1QUFEQi1cXHVBQUREXFx1QUFFMC1cXHVBQUVBXFx1QUFGMi1cXHVBQUY0XFx1QUIwMS1cXHVBQjA2XFx1QUIwOS1cXHVBQjBFXFx1QUIxMS1cXHVBQjE2XFx1QUIyMC1cXHVBQjI2XFx1QUIyOC1cXHVBQjJFXFx1QUIzMC1cXHVBQjVBXFx1QUI1Qy1cXHVBQjY1XFx1QUI3MC1cXHVBQkUyXFx1QUMwMC1cXHVEN0EzXFx1RDdCMC1cXHVEN0M2XFx1RDdDQi1cXHVEN0ZCXFx1RjkwMC1cXHVGQTZEXFx1RkE3MC1cXHVGQUQ5XFx1RkIwMC1cXHVGQjA2XFx1RkIxMy1cXHVGQjE3XFx1RkIxRFxcdUZCMUYtXFx1RkIyOFxcdUZCMkEtXFx1RkIzNlxcdUZCMzgtXFx1RkIzQ1xcdUZCM0VcXHVGQjQwXFx1RkI0MVxcdUZCNDNcXHVGQjQ0XFx1RkI0Ni1cXHVGQkIxXFx1RkJEMy1cXHVGRDNEXFx1RkQ1MC1cXHVGRDhGXFx1RkQ5Mi1cXHVGREM3XFx1RkRGMC1cXHVGREZCXFx1RkU3MC1cXHVGRTc0XFx1RkU3Ni1cXHVGRUZDXFx1RkYyMS1cXHVGRjNBXFx1RkY0MS1cXHVGRjVBXFx1RkY2Ni1cXHVGRkJFXFx1RkZDMi1cXHVGRkM3XFx1RkZDQS1cXHVGRkNGXFx1RkZEMi1cXHVGRkQ3XFx1RkZEQS1cXHVGRkRDXXxcXHVEODAwW1xcdURDMDAtXFx1REMwQlxcdURDMEQtXFx1REMyNlxcdURDMjgtXFx1REMzQVxcdURDM0NcXHVEQzNEXFx1REMzRi1cXHVEQzREXFx1REM1MC1cXHVEQzVEXFx1REM4MC1cXHVEQ0ZBXFx1REQ0MC1cXHVERDc0XFx1REU4MC1cXHVERTlDXFx1REVBMC1cXHVERUQwXFx1REYwMC1cXHVERjFGXFx1REYzMC1cXHVERjRBXFx1REY1MC1cXHVERjc1XFx1REY4MC1cXHVERjlEXFx1REZBMC1cXHVERkMzXFx1REZDOC1cXHVERkNGXFx1REZEMS1cXHVERkQ1XXxcXHVEODAxW1xcdURDMDAtXFx1REM5RFxcdUREMDAtXFx1REQyN1xcdUREMzAtXFx1REQ2M1xcdURFMDAtXFx1REYzNlxcdURGNDAtXFx1REY1NVxcdURGNjAtXFx1REY2N118XFx1RDgwMltcXHVEQzAwLVxcdURDMDVcXHVEQzA4XFx1REMwQS1cXHVEQzM1XFx1REMzN1xcdURDMzhcXHVEQzNDXFx1REMzRi1cXHVEQzU1XFx1REM2MC1cXHVEQzc2XFx1REM4MC1cXHVEQzlFXFx1RENFMC1cXHVEQ0YyXFx1RENGNFxcdURDRjVcXHVERDAwLVxcdUREMTVcXHVERDIwLVxcdUREMzlcXHVERDgwLVxcdUREQjdcXHVEREJFXFx1RERCRlxcdURFMDBcXHVERTEwLVxcdURFMTNcXHVERTE1LVxcdURFMTdcXHVERTE5LVxcdURFMzNcXHVERTYwLVxcdURFN0NcXHVERTgwLVxcdURFOUNcXHVERUMwLVxcdURFQzdcXHVERUM5LVxcdURFRTRcXHVERjAwLVxcdURGMzVcXHVERjQwLVxcdURGNTVcXHVERjYwLVxcdURGNzJcXHVERjgwLVxcdURGOTFdfFxcdUQ4MDNbXFx1REMwMC1cXHVEQzQ4XFx1REM4MC1cXHVEQ0IyXFx1RENDMC1cXHVEQ0YyXXxcXHVEODA0W1xcdURDMDMtXFx1REMzN1xcdURDODMtXFx1RENBRlxcdURDRDAtXFx1RENFOFxcdUREMDMtXFx1REQyNlxcdURENTAtXFx1REQ3MlxcdURENzZcXHVERDgzLVxcdUREQjJcXHVEREMxLVxcdUREQzRcXHVERERBXFx1REREQ1xcdURFMDAtXFx1REUxMVxcdURFMTMtXFx1REUyQlxcdURFODAtXFx1REU4NlxcdURFODhcXHVERThBLVxcdURFOERcXHVERThGLVxcdURFOURcXHVERTlGLVxcdURFQThcXHVERUIwLVxcdURFREVcXHVERjA1LVxcdURGMENcXHVERjBGXFx1REYxMFxcdURGMTMtXFx1REYyOFxcdURGMkEtXFx1REYzMFxcdURGMzJcXHVERjMzXFx1REYzNS1cXHVERjM5XFx1REYzRFxcdURGNTBcXHVERjVELVxcdURGNjFdfFxcdUQ4MDVbXFx1REM4MC1cXHVEQ0FGXFx1RENDNFxcdURDQzVcXHVEQ0M3XFx1REQ4MC1cXHVEREFFXFx1REREOC1cXHVERERCXFx1REUwMC1cXHVERTJGXFx1REU0NFxcdURFODAtXFx1REVBQVxcdURGMDAtXFx1REYxOV18XFx1RDgwNltcXHVEQ0EwLVxcdURDREZcXHVEQ0ZGXFx1REVDMC1cXHVERUY4XXxcXHVEODA4W1xcdURDMDAtXFx1REY5OV18XFx1RDgwOVtcXHVEQzAwLVxcdURDNkVcXHVEQzgwLVxcdURENDNdfFtcXHVEODBDXFx1RDg0MC1cXHVEODY4XFx1RDg2QS1cXHVEODZDXFx1RDg2Ri1cXHVEODcyXVtcXHVEQzAwLVxcdURGRkZdfFxcdUQ4MERbXFx1REMwMC1cXHVEQzJFXXxcXHVEODExW1xcdURDMDAtXFx1REU0Nl18XFx1RDgxQVtcXHVEQzAwLVxcdURFMzhcXHVERTQwLVxcdURFNUVcXHVERUQwLVxcdURFRURcXHVERjAwLVxcdURGMkZcXHVERjQwLVxcdURGNDNcXHVERjYzLVxcdURGNzdcXHVERjdELVxcdURGOEZdfFxcdUQ4MUJbXFx1REYwMC1cXHVERjQ0XFx1REY1MFxcdURGOTMtXFx1REY5Rl18XFx1RDgyQ1tcXHVEQzAwXFx1REMwMV18XFx1RDgyRltcXHVEQzAwLVxcdURDNkFcXHVEQzcwLVxcdURDN0NcXHVEQzgwLVxcdURDODhcXHVEQzkwLVxcdURDOTldfFxcdUQ4MzVbXFx1REMwMC1cXHVEQzU0XFx1REM1Ni1cXHVEQzlDXFx1REM5RVxcdURDOUZcXHVEQ0EyXFx1RENBNVxcdURDQTZcXHVEQ0E5LVxcdURDQUNcXHVEQ0FFLVxcdURDQjlcXHVEQ0JCXFx1RENCRC1cXHVEQ0MzXFx1RENDNS1cXHVERDA1XFx1REQwNy1cXHVERDBBXFx1REQwRC1cXHVERDE0XFx1REQxNi1cXHVERDFDXFx1REQxRS1cXHVERDM5XFx1REQzQi1cXHVERDNFXFx1REQ0MC1cXHVERDQ0XFx1REQ0NlxcdURENEEtXFx1REQ1MFxcdURENTItXFx1REVBNVxcdURFQTgtXFx1REVDMFxcdURFQzItXFx1REVEQVxcdURFREMtXFx1REVGQVxcdURFRkMtXFx1REYxNFxcdURGMTYtXFx1REYzNFxcdURGMzYtXFx1REY0RVxcdURGNTAtXFx1REY2RVxcdURGNzAtXFx1REY4OFxcdURGOEEtXFx1REZBOFxcdURGQUEtXFx1REZDMlxcdURGQzQtXFx1REZDQl18XFx1RDgzQVtcXHVEQzAwLVxcdURDQzRdfFxcdUQ4M0JbXFx1REUwMC1cXHVERTAzXFx1REUwNS1cXHVERTFGXFx1REUyMVxcdURFMjJcXHVERTI0XFx1REUyN1xcdURFMjktXFx1REUzMlxcdURFMzQtXFx1REUzN1xcdURFMzlcXHVERTNCXFx1REU0MlxcdURFNDdcXHVERTQ5XFx1REU0QlxcdURFNEQtXFx1REU0RlxcdURFNTFcXHVERTUyXFx1REU1NFxcdURFNTdcXHVERTU5XFx1REU1QlxcdURFNURcXHVERTVGXFx1REU2MVxcdURFNjJcXHVERTY0XFx1REU2Ny1cXHVERTZBXFx1REU2Qy1cXHVERTcyXFx1REU3NC1cXHVERTc3XFx1REU3OS1cXHVERTdDXFx1REU3RVxcdURFODAtXFx1REU4OVxcdURFOEItXFx1REU5QlxcdURFQTEtXFx1REVBM1xcdURFQTUtXFx1REVBOVxcdURFQUItXFx1REVCQl18XFx1RDg2OVtcXHVEQzAwLVxcdURFRDZcXHVERjAwLVxcdURGRkZdfFxcdUQ4NkRbXFx1REMwMC1cXHVERjM0XFx1REY0MC1cXHVERkZGXXxcXHVEODZFW1xcdURDMDAtXFx1REMxRFxcdURDMjAtXFx1REZGRl18XFx1RDg3M1tcXHVEQzAwLVxcdURFQTFdfFxcdUQ4N0VbXFx1REMwMC1cXHVERTFEXS8sXG5cdCAgICAvLyBVbmljb2RlIHY4LjAuMCBOb25Bc2NpaUlkZW50aWZpZXJQYXJ0OlxuXHQgICAgTm9uQXNjaWlJZGVudGlmaWVyUGFydDogL1tcXHhBQVxceEI1XFx4QjdcXHhCQVxceEMwLVxceEQ2XFx4RDgtXFx4RjZcXHhGOC1cXHUwMkMxXFx1MDJDNi1cXHUwMkQxXFx1MDJFMC1cXHUwMkU0XFx1MDJFQ1xcdTAyRUVcXHUwMzAwLVxcdTAzNzRcXHUwMzc2XFx1MDM3N1xcdTAzN0EtXFx1MDM3RFxcdTAzN0ZcXHUwMzg2LVxcdTAzOEFcXHUwMzhDXFx1MDM4RS1cXHUwM0ExXFx1MDNBMy1cXHUwM0Y1XFx1MDNGNy1cXHUwNDgxXFx1MDQ4My1cXHUwNDg3XFx1MDQ4QS1cXHUwNTJGXFx1MDUzMS1cXHUwNTU2XFx1MDU1OVxcdTA1NjEtXFx1MDU4N1xcdTA1OTEtXFx1MDVCRFxcdTA1QkZcXHUwNUMxXFx1MDVDMlxcdTA1QzRcXHUwNUM1XFx1MDVDN1xcdTA1RDAtXFx1MDVFQVxcdTA1RjAtXFx1MDVGMlxcdTA2MTAtXFx1MDYxQVxcdTA2MjAtXFx1MDY2OVxcdTA2NkUtXFx1MDZEM1xcdTA2RDUtXFx1MDZEQ1xcdTA2REYtXFx1MDZFOFxcdTA2RUEtXFx1MDZGQ1xcdTA2RkZcXHUwNzEwLVxcdTA3NEFcXHUwNzRELVxcdTA3QjFcXHUwN0MwLVxcdTA3RjVcXHUwN0ZBXFx1MDgwMC1cXHUwODJEXFx1MDg0MC1cXHUwODVCXFx1MDhBMC1cXHUwOEI0XFx1MDhFMy1cXHUwOTYzXFx1MDk2Ni1cXHUwOTZGXFx1MDk3MS1cXHUwOTgzXFx1MDk4NS1cXHUwOThDXFx1MDk4RlxcdTA5OTBcXHUwOTkzLVxcdTA5QThcXHUwOUFBLVxcdTA5QjBcXHUwOUIyXFx1MDlCNi1cXHUwOUI5XFx1MDlCQy1cXHUwOUM0XFx1MDlDN1xcdTA5QzhcXHUwOUNCLVxcdTA5Q0VcXHUwOUQ3XFx1MDlEQ1xcdTA5RERcXHUwOURGLVxcdTA5RTNcXHUwOUU2LVxcdTA5RjFcXHUwQTAxLVxcdTBBMDNcXHUwQTA1LVxcdTBBMEFcXHUwQTBGXFx1MEExMFxcdTBBMTMtXFx1MEEyOFxcdTBBMkEtXFx1MEEzMFxcdTBBMzJcXHUwQTMzXFx1MEEzNVxcdTBBMzZcXHUwQTM4XFx1MEEzOVxcdTBBM0NcXHUwQTNFLVxcdTBBNDJcXHUwQTQ3XFx1MEE0OFxcdTBBNEItXFx1MEE0RFxcdTBBNTFcXHUwQTU5LVxcdTBBNUNcXHUwQTVFXFx1MEE2Ni1cXHUwQTc1XFx1MEE4MS1cXHUwQTgzXFx1MEE4NS1cXHUwQThEXFx1MEE4Ri1cXHUwQTkxXFx1MEE5My1cXHUwQUE4XFx1MEFBQS1cXHUwQUIwXFx1MEFCMlxcdTBBQjNcXHUwQUI1LVxcdTBBQjlcXHUwQUJDLVxcdTBBQzVcXHUwQUM3LVxcdTBBQzlcXHUwQUNCLVxcdTBBQ0RcXHUwQUQwXFx1MEFFMC1cXHUwQUUzXFx1MEFFNi1cXHUwQUVGXFx1MEFGOVxcdTBCMDEtXFx1MEIwM1xcdTBCMDUtXFx1MEIwQ1xcdTBCMEZcXHUwQjEwXFx1MEIxMy1cXHUwQjI4XFx1MEIyQS1cXHUwQjMwXFx1MEIzMlxcdTBCMzNcXHUwQjM1LVxcdTBCMzlcXHUwQjNDLVxcdTBCNDRcXHUwQjQ3XFx1MEI0OFxcdTBCNEItXFx1MEI0RFxcdTBCNTZcXHUwQjU3XFx1MEI1Q1xcdTBCNURcXHUwQjVGLVxcdTBCNjNcXHUwQjY2LVxcdTBCNkZcXHUwQjcxXFx1MEI4MlxcdTBCODNcXHUwQjg1LVxcdTBCOEFcXHUwQjhFLVxcdTBCOTBcXHUwQjkyLVxcdTBCOTVcXHUwQjk5XFx1MEI5QVxcdTBCOUNcXHUwQjlFXFx1MEI5RlxcdTBCQTNcXHUwQkE0XFx1MEJBOC1cXHUwQkFBXFx1MEJBRS1cXHUwQkI5XFx1MEJCRS1cXHUwQkMyXFx1MEJDNi1cXHUwQkM4XFx1MEJDQS1cXHUwQkNEXFx1MEJEMFxcdTBCRDdcXHUwQkU2LVxcdTBCRUZcXHUwQzAwLVxcdTBDMDNcXHUwQzA1LVxcdTBDMENcXHUwQzBFLVxcdTBDMTBcXHUwQzEyLVxcdTBDMjhcXHUwQzJBLVxcdTBDMzlcXHUwQzNELVxcdTBDNDRcXHUwQzQ2LVxcdTBDNDhcXHUwQzRBLVxcdTBDNERcXHUwQzU1XFx1MEM1NlxcdTBDNTgtXFx1MEM1QVxcdTBDNjAtXFx1MEM2M1xcdTBDNjYtXFx1MEM2RlxcdTBDODEtXFx1MEM4M1xcdTBDODUtXFx1MEM4Q1xcdTBDOEUtXFx1MEM5MFxcdTBDOTItXFx1MENBOFxcdTBDQUEtXFx1MENCM1xcdTBDQjUtXFx1MENCOVxcdTBDQkMtXFx1MENDNFxcdTBDQzYtXFx1MENDOFxcdTBDQ0EtXFx1MENDRFxcdTBDRDVcXHUwQ0Q2XFx1MENERVxcdTBDRTAtXFx1MENFM1xcdTBDRTYtXFx1MENFRlxcdTBDRjFcXHUwQ0YyXFx1MEQwMS1cXHUwRDAzXFx1MEQwNS1cXHUwRDBDXFx1MEQwRS1cXHUwRDEwXFx1MEQxMi1cXHUwRDNBXFx1MEQzRC1cXHUwRDQ0XFx1MEQ0Ni1cXHUwRDQ4XFx1MEQ0QS1cXHUwRDRFXFx1MEQ1N1xcdTBENUYtXFx1MEQ2M1xcdTBENjYtXFx1MEQ2RlxcdTBEN0EtXFx1MEQ3RlxcdTBEODJcXHUwRDgzXFx1MEQ4NS1cXHUwRDk2XFx1MEQ5QS1cXHUwREIxXFx1MERCMy1cXHUwREJCXFx1MERCRFxcdTBEQzAtXFx1MERDNlxcdTBEQ0FcXHUwRENGLVxcdTBERDRcXHUwREQ2XFx1MEREOC1cXHUwRERGXFx1MERFNi1cXHUwREVGXFx1MERGMlxcdTBERjNcXHUwRTAxLVxcdTBFM0FcXHUwRTQwLVxcdTBFNEVcXHUwRTUwLVxcdTBFNTlcXHUwRTgxXFx1MEU4MlxcdTBFODRcXHUwRTg3XFx1MEU4OFxcdTBFOEFcXHUwRThEXFx1MEU5NC1cXHUwRTk3XFx1MEU5OS1cXHUwRTlGXFx1MEVBMS1cXHUwRUEzXFx1MEVBNVxcdTBFQTdcXHUwRUFBXFx1MEVBQlxcdTBFQUQtXFx1MEVCOVxcdTBFQkItXFx1MEVCRFxcdTBFQzAtXFx1MEVDNFxcdTBFQzZcXHUwRUM4LVxcdTBFQ0RcXHUwRUQwLVxcdTBFRDlcXHUwRURDLVxcdTBFREZcXHUwRjAwXFx1MEYxOFxcdTBGMTlcXHUwRjIwLVxcdTBGMjlcXHUwRjM1XFx1MEYzN1xcdTBGMzlcXHUwRjNFLVxcdTBGNDdcXHUwRjQ5LVxcdTBGNkNcXHUwRjcxLVxcdTBGODRcXHUwRjg2LVxcdTBGOTdcXHUwRjk5LVxcdTBGQkNcXHUwRkM2XFx1MTAwMC1cXHUxMDQ5XFx1MTA1MC1cXHUxMDlEXFx1MTBBMC1cXHUxMEM1XFx1MTBDN1xcdTEwQ0RcXHUxMEQwLVxcdTEwRkFcXHUxMEZDLVxcdTEyNDhcXHUxMjRBLVxcdTEyNERcXHUxMjUwLVxcdTEyNTZcXHUxMjU4XFx1MTI1QS1cXHUxMjVEXFx1MTI2MC1cXHUxMjg4XFx1MTI4QS1cXHUxMjhEXFx1MTI5MC1cXHUxMkIwXFx1MTJCMi1cXHUxMkI1XFx1MTJCOC1cXHUxMkJFXFx1MTJDMFxcdTEyQzItXFx1MTJDNVxcdTEyQzgtXFx1MTJENlxcdTEyRDgtXFx1MTMxMFxcdTEzMTItXFx1MTMxNVxcdTEzMTgtXFx1MTM1QVxcdTEzNUQtXFx1MTM1RlxcdTEzNjktXFx1MTM3MVxcdTEzODAtXFx1MTM4RlxcdTEzQTAtXFx1MTNGNVxcdTEzRjgtXFx1MTNGRFxcdTE0MDEtXFx1MTY2Q1xcdTE2NkYtXFx1MTY3RlxcdTE2ODEtXFx1MTY5QVxcdTE2QTAtXFx1MTZFQVxcdTE2RUUtXFx1MTZGOFxcdTE3MDAtXFx1MTcwQ1xcdTE3MEUtXFx1MTcxNFxcdTE3MjAtXFx1MTczNFxcdTE3NDAtXFx1MTc1M1xcdTE3NjAtXFx1MTc2Q1xcdTE3NkUtXFx1MTc3MFxcdTE3NzJcXHUxNzczXFx1MTc4MC1cXHUxN0QzXFx1MTdEN1xcdTE3RENcXHUxN0REXFx1MTdFMC1cXHUxN0U5XFx1MTgwQi1cXHUxODBEXFx1MTgxMC1cXHUxODE5XFx1MTgyMC1cXHUxODc3XFx1MTg4MC1cXHUxOEFBXFx1MThCMC1cXHUxOEY1XFx1MTkwMC1cXHUxOTFFXFx1MTkyMC1cXHUxOTJCXFx1MTkzMC1cXHUxOTNCXFx1MTk0Ni1cXHUxOTZEXFx1MTk3MC1cXHUxOTc0XFx1MTk4MC1cXHUxOUFCXFx1MTlCMC1cXHUxOUM5XFx1MTlEMC1cXHUxOURBXFx1MUEwMC1cXHUxQTFCXFx1MUEyMC1cXHUxQTVFXFx1MUE2MC1cXHUxQTdDXFx1MUE3Ri1cXHUxQTg5XFx1MUE5MC1cXHUxQTk5XFx1MUFBN1xcdTFBQjAtXFx1MUFCRFxcdTFCMDAtXFx1MUI0QlxcdTFCNTAtXFx1MUI1OVxcdTFCNkItXFx1MUI3M1xcdTFCODAtXFx1MUJGM1xcdTFDMDAtXFx1MUMzN1xcdTFDNDAtXFx1MUM0OVxcdTFDNEQtXFx1MUM3RFxcdTFDRDAtXFx1MUNEMlxcdTFDRDQtXFx1MUNGNlxcdTFDRjhcXHUxQ0Y5XFx1MUQwMC1cXHUxREY1XFx1MURGQy1cXHUxRjE1XFx1MUYxOC1cXHUxRjFEXFx1MUYyMC1cXHUxRjQ1XFx1MUY0OC1cXHUxRjREXFx1MUY1MC1cXHUxRjU3XFx1MUY1OVxcdTFGNUJcXHUxRjVEXFx1MUY1Ri1cXHUxRjdEXFx1MUY4MC1cXHUxRkI0XFx1MUZCNi1cXHUxRkJDXFx1MUZCRVxcdTFGQzItXFx1MUZDNFxcdTFGQzYtXFx1MUZDQ1xcdTFGRDAtXFx1MUZEM1xcdTFGRDYtXFx1MUZEQlxcdTFGRTAtXFx1MUZFQ1xcdTFGRjItXFx1MUZGNFxcdTFGRjYtXFx1MUZGQ1xcdTIwMENcXHUyMDBEXFx1MjAzRlxcdTIwNDBcXHUyMDU0XFx1MjA3MVxcdTIwN0ZcXHUyMDkwLVxcdTIwOUNcXHUyMEQwLVxcdTIwRENcXHUyMEUxXFx1MjBFNS1cXHUyMEYwXFx1MjEwMlxcdTIxMDdcXHUyMTBBLVxcdTIxMTNcXHUyMTE1XFx1MjExOC1cXHUyMTFEXFx1MjEyNFxcdTIxMjZcXHUyMTI4XFx1MjEyQS1cXHUyMTM5XFx1MjEzQy1cXHUyMTNGXFx1MjE0NS1cXHUyMTQ5XFx1MjE0RVxcdTIxNjAtXFx1MjE4OFxcdTJDMDAtXFx1MkMyRVxcdTJDMzAtXFx1MkM1RVxcdTJDNjAtXFx1MkNFNFxcdTJDRUItXFx1MkNGM1xcdTJEMDAtXFx1MkQyNVxcdTJEMjdcXHUyRDJEXFx1MkQzMC1cXHUyRDY3XFx1MkQ2RlxcdTJEN0YtXFx1MkQ5NlxcdTJEQTAtXFx1MkRBNlxcdTJEQTgtXFx1MkRBRVxcdTJEQjAtXFx1MkRCNlxcdTJEQjgtXFx1MkRCRVxcdTJEQzAtXFx1MkRDNlxcdTJEQzgtXFx1MkRDRVxcdTJERDAtXFx1MkRENlxcdTJERDgtXFx1MkRERVxcdTJERTAtXFx1MkRGRlxcdTMwMDUtXFx1MzAwN1xcdTMwMjEtXFx1MzAyRlxcdTMwMzEtXFx1MzAzNVxcdTMwMzgtXFx1MzAzQ1xcdTMwNDEtXFx1MzA5NlxcdTMwOTktXFx1MzA5RlxcdTMwQTEtXFx1MzBGQVxcdTMwRkMtXFx1MzBGRlxcdTMxMDUtXFx1MzEyRFxcdTMxMzEtXFx1MzE4RVxcdTMxQTAtXFx1MzFCQVxcdTMxRjAtXFx1MzFGRlxcdTM0MDAtXFx1NERCNVxcdTRFMDAtXFx1OUZENVxcdUEwMDAtXFx1QTQ4Q1xcdUE0RDAtXFx1QTRGRFxcdUE1MDAtXFx1QTYwQ1xcdUE2MTAtXFx1QTYyQlxcdUE2NDAtXFx1QTY2RlxcdUE2NzQtXFx1QTY3RFxcdUE2N0YtXFx1QTZGMVxcdUE3MTctXFx1QTcxRlxcdUE3MjItXFx1QTc4OFxcdUE3OEItXFx1QTdBRFxcdUE3QjAtXFx1QTdCN1xcdUE3RjctXFx1QTgyN1xcdUE4NDAtXFx1QTg3M1xcdUE4ODAtXFx1QThDNFxcdUE4RDAtXFx1QThEOVxcdUE4RTAtXFx1QThGN1xcdUE4RkJcXHVBOEZEXFx1QTkwMC1cXHVBOTJEXFx1QTkzMC1cXHVBOTUzXFx1QTk2MC1cXHVBOTdDXFx1QTk4MC1cXHVBOUMwXFx1QTlDRi1cXHVBOUQ5XFx1QTlFMC1cXHVBOUZFXFx1QUEwMC1cXHVBQTM2XFx1QUE0MC1cXHVBQTREXFx1QUE1MC1cXHVBQTU5XFx1QUE2MC1cXHVBQTc2XFx1QUE3QS1cXHVBQUMyXFx1QUFEQi1cXHVBQUREXFx1QUFFMC1cXHVBQUVGXFx1QUFGMi1cXHVBQUY2XFx1QUIwMS1cXHVBQjA2XFx1QUIwOS1cXHVBQjBFXFx1QUIxMS1cXHVBQjE2XFx1QUIyMC1cXHVBQjI2XFx1QUIyOC1cXHVBQjJFXFx1QUIzMC1cXHVBQjVBXFx1QUI1Qy1cXHVBQjY1XFx1QUI3MC1cXHVBQkVBXFx1QUJFQ1xcdUFCRURcXHVBQkYwLVxcdUFCRjlcXHVBQzAwLVxcdUQ3QTNcXHVEN0IwLVxcdUQ3QzZcXHVEN0NCLVxcdUQ3RkJcXHVGOTAwLVxcdUZBNkRcXHVGQTcwLVxcdUZBRDlcXHVGQjAwLVxcdUZCMDZcXHVGQjEzLVxcdUZCMTdcXHVGQjFELVxcdUZCMjhcXHVGQjJBLVxcdUZCMzZcXHVGQjM4LVxcdUZCM0NcXHVGQjNFXFx1RkI0MFxcdUZCNDFcXHVGQjQzXFx1RkI0NFxcdUZCNDYtXFx1RkJCMVxcdUZCRDMtXFx1RkQzRFxcdUZENTAtXFx1RkQ4RlxcdUZEOTItXFx1RkRDN1xcdUZERjAtXFx1RkRGQlxcdUZFMDAtXFx1RkUwRlxcdUZFMjAtXFx1RkUyRlxcdUZFMzNcXHVGRTM0XFx1RkU0RC1cXHVGRTRGXFx1RkU3MC1cXHVGRTc0XFx1RkU3Ni1cXHVGRUZDXFx1RkYxMC1cXHVGRjE5XFx1RkYyMS1cXHVGRjNBXFx1RkYzRlxcdUZGNDEtXFx1RkY1QVxcdUZGNjYtXFx1RkZCRVxcdUZGQzItXFx1RkZDN1xcdUZGQ0EtXFx1RkZDRlxcdUZGRDItXFx1RkZEN1xcdUZGREEtXFx1RkZEQ118XFx1RDgwMFtcXHVEQzAwLVxcdURDMEJcXHVEQzBELVxcdURDMjZcXHVEQzI4LVxcdURDM0FcXHVEQzNDXFx1REMzRFxcdURDM0YtXFx1REM0RFxcdURDNTAtXFx1REM1RFxcdURDODAtXFx1RENGQVxcdURENDAtXFx1REQ3NFxcdURERkRcXHVERTgwLVxcdURFOUNcXHVERUEwLVxcdURFRDBcXHVERUUwXFx1REYwMC1cXHVERjFGXFx1REYzMC1cXHVERjRBXFx1REY1MC1cXHVERjdBXFx1REY4MC1cXHVERjlEXFx1REZBMC1cXHVERkMzXFx1REZDOC1cXHVERkNGXFx1REZEMS1cXHVERkQ1XXxcXHVEODAxW1xcdURDMDAtXFx1REM5RFxcdURDQTAtXFx1RENBOVxcdUREMDAtXFx1REQyN1xcdUREMzAtXFx1REQ2M1xcdURFMDAtXFx1REYzNlxcdURGNDAtXFx1REY1NVxcdURGNjAtXFx1REY2N118XFx1RDgwMltcXHVEQzAwLVxcdURDMDVcXHVEQzA4XFx1REMwQS1cXHVEQzM1XFx1REMzN1xcdURDMzhcXHVEQzNDXFx1REMzRi1cXHVEQzU1XFx1REM2MC1cXHVEQzc2XFx1REM4MC1cXHVEQzlFXFx1RENFMC1cXHVEQ0YyXFx1RENGNFxcdURDRjVcXHVERDAwLVxcdUREMTVcXHVERDIwLVxcdUREMzlcXHVERDgwLVxcdUREQjdcXHVEREJFXFx1RERCRlxcdURFMDAtXFx1REUwM1xcdURFMDVcXHVERTA2XFx1REUwQy1cXHVERTEzXFx1REUxNS1cXHVERTE3XFx1REUxOS1cXHVERTMzXFx1REUzOC1cXHVERTNBXFx1REUzRlxcdURFNjAtXFx1REU3Q1xcdURFODAtXFx1REU5Q1xcdURFQzAtXFx1REVDN1xcdURFQzktXFx1REVFNlxcdURGMDAtXFx1REYzNVxcdURGNDAtXFx1REY1NVxcdURGNjAtXFx1REY3MlxcdURGODAtXFx1REY5MV18XFx1RDgwM1tcXHVEQzAwLVxcdURDNDhcXHVEQzgwLVxcdURDQjJcXHVEQ0MwLVxcdURDRjJdfFxcdUQ4MDRbXFx1REMwMC1cXHVEQzQ2XFx1REM2Ni1cXHVEQzZGXFx1REM3Ri1cXHVEQ0JBXFx1RENEMC1cXHVEQ0U4XFx1RENGMC1cXHVEQ0Y5XFx1REQwMC1cXHVERDM0XFx1REQzNi1cXHVERDNGXFx1REQ1MC1cXHVERDczXFx1REQ3NlxcdUREODAtXFx1RERDNFxcdUREQ0EtXFx1RERDQ1xcdURERDAtXFx1REREQVxcdURERENcXHVERTAwLVxcdURFMTFcXHVERTEzLVxcdURFMzdcXHVERTgwLVxcdURFODZcXHVERTg4XFx1REU4QS1cXHVERThEXFx1REU4Ri1cXHVERTlEXFx1REU5Ri1cXHVERUE4XFx1REVCMC1cXHVERUVBXFx1REVGMC1cXHVERUY5XFx1REYwMC1cXHVERjAzXFx1REYwNS1cXHVERjBDXFx1REYwRlxcdURGMTBcXHVERjEzLVxcdURGMjhcXHVERjJBLVxcdURGMzBcXHVERjMyXFx1REYzM1xcdURGMzUtXFx1REYzOVxcdURGM0MtXFx1REY0NFxcdURGNDdcXHVERjQ4XFx1REY0Qi1cXHVERjREXFx1REY1MFxcdURGNTdcXHVERjVELVxcdURGNjNcXHVERjY2LVxcdURGNkNcXHVERjcwLVxcdURGNzRdfFxcdUQ4MDVbXFx1REM4MC1cXHVEQ0M1XFx1RENDN1xcdURDRDAtXFx1RENEOVxcdUREODAtXFx1RERCNVxcdUREQjgtXFx1RERDMFxcdURERDgtXFx1RERERFxcdURFMDAtXFx1REU0MFxcdURFNDRcXHVERTUwLVxcdURFNTlcXHVERTgwLVxcdURFQjdcXHVERUMwLVxcdURFQzlcXHVERjAwLVxcdURGMTlcXHVERjFELVxcdURGMkJcXHVERjMwLVxcdURGMzldfFxcdUQ4MDZbXFx1RENBMC1cXHVEQ0U5XFx1RENGRlxcdURFQzAtXFx1REVGOF18XFx1RDgwOFtcXHVEQzAwLVxcdURGOTldfFxcdUQ4MDlbXFx1REMwMC1cXHVEQzZFXFx1REM4MC1cXHVERDQzXXxbXFx1RDgwQ1xcdUQ4NDAtXFx1RDg2OFxcdUQ4NkEtXFx1RDg2Q1xcdUQ4NkYtXFx1RDg3Ml1bXFx1REMwMC1cXHVERkZGXXxcXHVEODBEW1xcdURDMDAtXFx1REMyRV18XFx1RDgxMVtcXHVEQzAwLVxcdURFNDZdfFxcdUQ4MUFbXFx1REMwMC1cXHVERTM4XFx1REU0MC1cXHVERTVFXFx1REU2MC1cXHVERTY5XFx1REVEMC1cXHVERUVEXFx1REVGMC1cXHVERUY0XFx1REYwMC1cXHVERjM2XFx1REY0MC1cXHVERjQzXFx1REY1MC1cXHVERjU5XFx1REY2My1cXHVERjc3XFx1REY3RC1cXHVERjhGXXxcXHVEODFCW1xcdURGMDAtXFx1REY0NFxcdURGNTAtXFx1REY3RVxcdURGOEYtXFx1REY5Rl18XFx1RDgyQ1tcXHVEQzAwXFx1REMwMV18XFx1RDgyRltcXHVEQzAwLVxcdURDNkFcXHVEQzcwLVxcdURDN0NcXHVEQzgwLVxcdURDODhcXHVEQzkwLVxcdURDOTlcXHVEQzlEXFx1REM5RV18XFx1RDgzNFtcXHVERDY1LVxcdURENjlcXHVERDZELVxcdURENzJcXHVERDdCLVxcdUREODJcXHVERDg1LVxcdUREOEJcXHVEREFBLVxcdUREQURcXHVERTQyLVxcdURFNDRdfFxcdUQ4MzVbXFx1REMwMC1cXHVEQzU0XFx1REM1Ni1cXHVEQzlDXFx1REM5RVxcdURDOUZcXHVEQ0EyXFx1RENBNVxcdURDQTZcXHVEQ0E5LVxcdURDQUNcXHVEQ0FFLVxcdURDQjlcXHVEQ0JCXFx1RENCRC1cXHVEQ0MzXFx1RENDNS1cXHVERDA1XFx1REQwNy1cXHVERDBBXFx1REQwRC1cXHVERDE0XFx1REQxNi1cXHVERDFDXFx1REQxRS1cXHVERDM5XFx1REQzQi1cXHVERDNFXFx1REQ0MC1cXHVERDQ0XFx1REQ0NlxcdURENEEtXFx1REQ1MFxcdURENTItXFx1REVBNVxcdURFQTgtXFx1REVDMFxcdURFQzItXFx1REVEQVxcdURFREMtXFx1REVGQVxcdURFRkMtXFx1REYxNFxcdURGMTYtXFx1REYzNFxcdURGMzYtXFx1REY0RVxcdURGNTAtXFx1REY2RVxcdURGNzAtXFx1REY4OFxcdURGOEEtXFx1REZBOFxcdURGQUEtXFx1REZDMlxcdURGQzQtXFx1REZDQlxcdURGQ0UtXFx1REZGRl18XFx1RDgzNltcXHVERTAwLVxcdURFMzZcXHVERTNCLVxcdURFNkNcXHVERTc1XFx1REU4NFxcdURFOUItXFx1REU5RlxcdURFQTEtXFx1REVBRl18XFx1RDgzQVtcXHVEQzAwLVxcdURDQzRcXHVEQ0QwLVxcdURDRDZdfFxcdUQ4M0JbXFx1REUwMC1cXHVERTAzXFx1REUwNS1cXHVERTFGXFx1REUyMVxcdURFMjJcXHVERTI0XFx1REUyN1xcdURFMjktXFx1REUzMlxcdURFMzQtXFx1REUzN1xcdURFMzlcXHVERTNCXFx1REU0MlxcdURFNDdcXHVERTQ5XFx1REU0QlxcdURFNEQtXFx1REU0RlxcdURFNTFcXHVERTUyXFx1REU1NFxcdURFNTdcXHVERTU5XFx1REU1QlxcdURFNURcXHVERTVGXFx1REU2MVxcdURFNjJcXHVERTY0XFx1REU2Ny1cXHVERTZBXFx1REU2Qy1cXHVERTcyXFx1REU3NC1cXHVERTc3XFx1REU3OS1cXHVERTdDXFx1REU3RVxcdURFODAtXFx1REU4OVxcdURFOEItXFx1REU5QlxcdURFQTEtXFx1REVBM1xcdURFQTUtXFx1REVBOVxcdURFQUItXFx1REVCQl18XFx1RDg2OVtcXHVEQzAwLVxcdURFRDZcXHVERjAwLVxcdURGRkZdfFxcdUQ4NkRbXFx1REMwMC1cXHVERjM0XFx1REY0MC1cXHVERkZGXXxcXHVEODZFW1xcdURDMDAtXFx1REMxRFxcdURDMjAtXFx1REZGRl18XFx1RDg3M1tcXHVEQzAwLVxcdURFQTFdfFxcdUQ4N0VbXFx1REMwMC1cXHVERTFEXXxcXHVEQjQwW1xcdUREMDAtXFx1RERFRl0vXG5cdH07XG5cdGV4cG9ydHMuQ2hhcmFjdGVyID0ge1xuXHQgICAgLyogdHNsaW50OmRpc2FibGU6bm8tYml0d2lzZSAqL1xuXHQgICAgZnJvbUNvZGVQb2ludDogZnVuY3Rpb24gKGNwKSB7XG5cdCAgICAgICAgcmV0dXJuIChjcCA8IDB4MTAwMDApID8gU3RyaW5nLmZyb21DaGFyQ29kZShjcCkgOlxuXHQgICAgICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RDgwMCArICgoY3AgLSAweDEwMDAwKSA+PiAxMCkpICtcblx0ICAgICAgICAgICAgICAgIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhEQzAwICsgKChjcCAtIDB4MTAwMDApICYgMTAyMykpO1xuXHQgICAgfSxcblx0ICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXdoaXRlLXNwYWNlXG5cdCAgICBpc1doaXRlU3BhY2U6IGZ1bmN0aW9uIChjcCkge1xuXHQgICAgICAgIHJldHVybiAoY3AgPT09IDB4MjApIHx8IChjcCA9PT0gMHgwOSkgfHwgKGNwID09PSAweDBCKSB8fCAoY3AgPT09IDB4MEMpIHx8IChjcCA9PT0gMHhBMCkgfHxcblx0ICAgICAgICAgICAgKGNwID49IDB4MTY4MCAmJiBbMHgxNjgwLCAweDIwMDAsIDB4MjAwMSwgMHgyMDAyLCAweDIwMDMsIDB4MjAwNCwgMHgyMDA1LCAweDIwMDYsIDB4MjAwNywgMHgyMDA4LCAweDIwMDksIDB4MjAwQSwgMHgyMDJGLCAweDIwNUYsIDB4MzAwMCwgMHhGRUZGXS5pbmRleE9mKGNwKSA+PSAwKTtcblx0ICAgIH0sXG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1saW5lLXRlcm1pbmF0b3JzXG5cdCAgICBpc0xpbmVUZXJtaW5hdG9yOiBmdW5jdGlvbiAoY3ApIHtcblx0ICAgICAgICByZXR1cm4gKGNwID09PSAweDBBKSB8fCAoY3AgPT09IDB4MEQpIHx8IChjcCA9PT0gMHgyMDI4KSB8fCAoY3AgPT09IDB4MjAyOSk7XG5cdCAgICB9LFxuXHQgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtbmFtZXMtYW5kLWtleXdvcmRzXG5cdCAgICBpc0lkZW50aWZpZXJTdGFydDogZnVuY3Rpb24gKGNwKSB7XG5cdCAgICAgICAgcmV0dXJuIChjcCA9PT0gMHgyNCkgfHwgKGNwID09PSAweDVGKSB8fFxuXHQgICAgICAgICAgICAoY3AgPj0gMHg0MSAmJiBjcCA8PSAweDVBKSB8fFxuXHQgICAgICAgICAgICAoY3AgPj0gMHg2MSAmJiBjcCA8PSAweDdBKSB8fFxuXHQgICAgICAgICAgICAoY3AgPT09IDB4NUMpIHx8XG5cdCAgICAgICAgICAgICgoY3AgPj0gMHg4MCkgJiYgUmVnZXguTm9uQXNjaWlJZGVudGlmaWVyU3RhcnQudGVzdChleHBvcnRzLkNoYXJhY3Rlci5mcm9tQ29kZVBvaW50KGNwKSkpO1xuXHQgICAgfSxcblx0ICAgIGlzSWRlbnRpZmllclBhcnQ6IGZ1bmN0aW9uIChjcCkge1xuXHQgICAgICAgIHJldHVybiAoY3AgPT09IDB4MjQpIHx8IChjcCA9PT0gMHg1RikgfHxcblx0ICAgICAgICAgICAgKGNwID49IDB4NDEgJiYgY3AgPD0gMHg1QSkgfHxcblx0ICAgICAgICAgICAgKGNwID49IDB4NjEgJiYgY3AgPD0gMHg3QSkgfHxcblx0ICAgICAgICAgICAgKGNwID49IDB4MzAgJiYgY3AgPD0gMHgzOSkgfHxcblx0ICAgICAgICAgICAgKGNwID09PSAweDVDKSB8fFxuXHQgICAgICAgICAgICAoKGNwID49IDB4ODApICYmIFJlZ2V4Lk5vbkFzY2lpSWRlbnRpZmllclBhcnQudGVzdChleHBvcnRzLkNoYXJhY3Rlci5mcm9tQ29kZVBvaW50KGNwKSkpO1xuXHQgICAgfSxcblx0ICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWxpdGVyYWxzLW51bWVyaWMtbGl0ZXJhbHNcblx0ICAgIGlzRGVjaW1hbERpZ2l0OiBmdW5jdGlvbiAoY3ApIHtcblx0ICAgICAgICByZXR1cm4gKGNwID49IDB4MzAgJiYgY3AgPD0gMHgzOSk7IC8vIDAuLjlcblx0ICAgIH0sXG5cdCAgICBpc0hleERpZ2l0OiBmdW5jdGlvbiAoY3ApIHtcblx0ICAgICAgICByZXR1cm4gKGNwID49IDB4MzAgJiYgY3AgPD0gMHgzOSkgfHxcblx0ICAgICAgICAgICAgKGNwID49IDB4NDEgJiYgY3AgPD0gMHg0NikgfHxcblx0ICAgICAgICAgICAgKGNwID49IDB4NjEgJiYgY3AgPD0gMHg2Nik7IC8vIGEuLmZcblx0ICAgIH0sXG5cdCAgICBpc09jdGFsRGlnaXQ6IGZ1bmN0aW9uIChjcCkge1xuXHQgICAgICAgIHJldHVybiAoY3AgPj0gMHgzMCAmJiBjcCA8PSAweDM3KTsgLy8gMC4uN1xuXHQgICAgfVxuXHR9O1xuXG5cbi8qKiovIH0sXG4vKiA1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuXHR2YXIganN4X3N5bnRheF8xID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblx0LyogdHNsaW50OmRpc2FibGU6bWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cblx0dmFyIEpTWENsb3NpbmdFbGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEpTWENsb3NpbmdFbGVtZW50KG5hbWUpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBqc3hfc3ludGF4XzEuSlNYU3ludGF4LkpTWENsb3NpbmdFbGVtZW50O1xuXHQgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gSlNYQ2xvc2luZ0VsZW1lbnQ7XG5cdH0oKSk7XG5cdGV4cG9ydHMuSlNYQ2xvc2luZ0VsZW1lbnQgPSBKU1hDbG9zaW5nRWxlbWVudDtcblx0dmFyIEpTWEVsZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gSlNYRWxlbWVudChvcGVuaW5nRWxlbWVudCwgY2hpbGRyZW4sIGNsb3NpbmdFbGVtZW50KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0ganN4X3N5bnRheF8xLkpTWFN5bnRheC5KU1hFbGVtZW50O1xuXHQgICAgICAgIHRoaXMub3BlbmluZ0VsZW1lbnQgPSBvcGVuaW5nRWxlbWVudDtcblx0ICAgICAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG5cdCAgICAgICAgdGhpcy5jbG9zaW5nRWxlbWVudCA9IGNsb3NpbmdFbGVtZW50O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEpTWEVsZW1lbnQ7XG5cdH0oKSk7XG5cdGV4cG9ydHMuSlNYRWxlbWVudCA9IEpTWEVsZW1lbnQ7XG5cdHZhciBKU1hFbXB0eUV4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gSlNYRW1wdHlFeHByZXNzaW9uKCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IGpzeF9zeW50YXhfMS5KU1hTeW50YXguSlNYRW1wdHlFeHByZXNzaW9uO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEpTWEVtcHR5RXhwcmVzc2lvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5KU1hFbXB0eUV4cHJlc3Npb24gPSBKU1hFbXB0eUV4cHJlc3Npb247XG5cdHZhciBKU1hFeHByZXNzaW9uQ29udGFpbmVyID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEpTWEV4cHJlc3Npb25Db250YWluZXIoZXhwcmVzc2lvbikge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IGpzeF9zeW50YXhfMS5KU1hTeW50YXguSlNYRXhwcmVzc2lvbkNvbnRhaW5lcjtcblx0ICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEpTWEV4cHJlc3Npb25Db250YWluZXI7XG5cdH0oKSk7XG5cdGV4cG9ydHMuSlNYRXhwcmVzc2lvbkNvbnRhaW5lciA9IEpTWEV4cHJlc3Npb25Db250YWluZXI7XG5cdHZhciBKU1hJZGVudGlmaWVyID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEpTWElkZW50aWZpZXIobmFtZSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IGpzeF9zeW50YXhfMS5KU1hTeW50YXguSlNYSWRlbnRpZmllcjtcblx0ICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEpTWElkZW50aWZpZXI7XG5cdH0oKSk7XG5cdGV4cG9ydHMuSlNYSWRlbnRpZmllciA9IEpTWElkZW50aWZpZXI7XG5cdHZhciBKU1hNZW1iZXJFeHByZXNzaW9uID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEpTWE1lbWJlckV4cHJlc3Npb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IGpzeF9zeW50YXhfMS5KU1hTeW50YXguSlNYTWVtYmVyRXhwcmVzc2lvbjtcblx0ICAgICAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcblx0ICAgICAgICB0aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gSlNYTWVtYmVyRXhwcmVzc2lvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5KU1hNZW1iZXJFeHByZXNzaW9uID0gSlNYTWVtYmVyRXhwcmVzc2lvbjtcblx0dmFyIEpTWEF0dHJpYnV0ZSA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBKU1hBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBqc3hfc3ludGF4XzEuSlNYU3ludGF4LkpTWEF0dHJpYnV0ZTtcblx0ICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXHQgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBKU1hBdHRyaWJ1dGU7XG5cdH0oKSk7XG5cdGV4cG9ydHMuSlNYQXR0cmlidXRlID0gSlNYQXR0cmlidXRlO1xuXHR2YXIgSlNYTmFtZXNwYWNlZE5hbWUgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gSlNYTmFtZXNwYWNlZE5hbWUobmFtZXNwYWNlLCBuYW1lKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0ganN4X3N5bnRheF8xLkpTWFN5bnRheC5KU1hOYW1lc3BhY2VkTmFtZTtcblx0ICAgICAgICB0aGlzLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcblx0ICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEpTWE5hbWVzcGFjZWROYW1lO1xuXHR9KCkpO1xuXHRleHBvcnRzLkpTWE5hbWVzcGFjZWROYW1lID0gSlNYTmFtZXNwYWNlZE5hbWU7XG5cdHZhciBKU1hPcGVuaW5nRWxlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBKU1hPcGVuaW5nRWxlbWVudChuYW1lLCBzZWxmQ2xvc2luZywgYXR0cmlidXRlcykge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IGpzeF9zeW50YXhfMS5KU1hTeW50YXguSlNYT3BlbmluZ0VsZW1lbnQ7XG5cdCAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblx0ICAgICAgICB0aGlzLnNlbGZDbG9zaW5nID0gc2VsZkNsb3Npbmc7XG5cdCAgICAgICAgdGhpcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcblx0ICAgIH1cblx0ICAgIHJldHVybiBKU1hPcGVuaW5nRWxlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5KU1hPcGVuaW5nRWxlbWVudCA9IEpTWE9wZW5pbmdFbGVtZW50O1xuXHR2YXIgSlNYU3ByZWFkQXR0cmlidXRlID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEpTWFNwcmVhZEF0dHJpYnV0ZShhcmd1bWVudCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IGpzeF9zeW50YXhfMS5KU1hTeW50YXguSlNYU3ByZWFkQXR0cmlidXRlO1xuXHQgICAgICAgIHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBKU1hTcHJlYWRBdHRyaWJ1dGU7XG5cdH0oKSk7XG5cdGV4cG9ydHMuSlNYU3ByZWFkQXR0cmlidXRlID0gSlNYU3ByZWFkQXR0cmlidXRlO1xuXHR2YXIgSlNYVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBKU1hUZXh0KHZhbHVlLCByYXcpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBqc3hfc3ludGF4XzEuSlNYU3ludGF4LkpTWFRleHQ7XG5cdCAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXHQgICAgICAgIHRoaXMucmF3ID0gcmF3O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEpTWFRleHQ7XG5cdH0oKSk7XG5cdGV4cG9ydHMuSlNYVGV4dCA9IEpTWFRleHQ7XG5cblxuLyoqKi8gfSxcbi8qIDYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5cdGV4cG9ydHMuSlNYU3ludGF4ID0ge1xuXHQgICAgSlNYQXR0cmlidXRlOiAnSlNYQXR0cmlidXRlJyxcblx0ICAgIEpTWENsb3NpbmdFbGVtZW50OiAnSlNYQ2xvc2luZ0VsZW1lbnQnLFxuXHQgICAgSlNYRWxlbWVudDogJ0pTWEVsZW1lbnQnLFxuXHQgICAgSlNYRW1wdHlFeHByZXNzaW9uOiAnSlNYRW1wdHlFeHByZXNzaW9uJyxcblx0ICAgIEpTWEV4cHJlc3Npb25Db250YWluZXI6ICdKU1hFeHByZXNzaW9uQ29udGFpbmVyJyxcblx0ICAgIEpTWElkZW50aWZpZXI6ICdKU1hJZGVudGlmaWVyJyxcblx0ICAgIEpTWE1lbWJlckV4cHJlc3Npb246ICdKU1hNZW1iZXJFeHByZXNzaW9uJyxcblx0ICAgIEpTWE5hbWVzcGFjZWROYW1lOiAnSlNYTmFtZXNwYWNlZE5hbWUnLFxuXHQgICAgSlNYT3BlbmluZ0VsZW1lbnQ6ICdKU1hPcGVuaW5nRWxlbWVudCcsXG5cdCAgICBKU1hTcHJlYWRBdHRyaWJ1dGU6ICdKU1hTcHJlYWRBdHRyaWJ1dGUnLFxuXHQgICAgSlNYVGV4dDogJ0pTWFRleHQnXG5cdH07XG5cblxuLyoqKi8gfSxcbi8qIDcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5cdHZhciBzeW50YXhfMSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cdC8qIHRzbGludDpkaXNhYmxlOm1heC1jbGFzc2VzLXBlci1maWxlICovXG5cdHZhciBBcnJheUV4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gQXJyYXlFeHByZXNzaW9uKGVsZW1lbnRzKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkFycmF5RXhwcmVzc2lvbjtcblx0ICAgICAgICB0aGlzLmVsZW1lbnRzID0gZWxlbWVudHM7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gQXJyYXlFeHByZXNzaW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLkFycmF5RXhwcmVzc2lvbiA9IEFycmF5RXhwcmVzc2lvbjtcblx0dmFyIEFycmF5UGF0dGVybiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBBcnJheVBhdHRlcm4oZWxlbWVudHMpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguQXJyYXlQYXR0ZXJuO1xuXHQgICAgICAgIHRoaXMuZWxlbWVudHMgPSBlbGVtZW50cztcblx0ICAgIH1cblx0ICAgIHJldHVybiBBcnJheVBhdHRlcm47XG5cdH0oKSk7XG5cdGV4cG9ydHMuQXJyYXlQYXR0ZXJuID0gQXJyYXlQYXR0ZXJuO1xuXHR2YXIgQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24ocGFyYW1zLCBib2R5LCBleHByZXNzaW9uKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkFycm93RnVuY3Rpb25FeHByZXNzaW9uO1xuXHQgICAgICAgIHRoaXMuaWQgPSBudWxsO1xuXHQgICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuXHQgICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG5cdCAgICAgICAgdGhpcy5nZW5lcmF0b3IgPSBmYWxzZTtcblx0ICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xuXHQgICAgICAgIHRoaXMuYXN5bmMgPSBmYWxzZTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5BcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbiA9IEFycm93RnVuY3Rpb25FeHByZXNzaW9uO1xuXHR2YXIgQXNzaWdubWVudEV4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gQXNzaWdubWVudEV4cHJlc3Npb24ob3BlcmF0b3IsIGxlZnQsIHJpZ2h0KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkFzc2lnbm1lbnRFeHByZXNzaW9uO1xuXHQgICAgICAgIHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvcjtcblx0ICAgICAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuXHQgICAgICAgIHRoaXMucmlnaHQgPSByaWdodDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBBc3NpZ25tZW50RXhwcmVzc2lvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5Bc3NpZ25tZW50RXhwcmVzc2lvbiA9IEFzc2lnbm1lbnRFeHByZXNzaW9uO1xuXHR2YXIgQXNzaWdubWVudFBhdHRlcm4gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gQXNzaWdubWVudFBhdHRlcm4obGVmdCwgcmlnaHQpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguQXNzaWdubWVudFBhdHRlcm47XG5cdCAgICAgICAgdGhpcy5sZWZ0ID0gbGVmdDtcblx0ICAgICAgICB0aGlzLnJpZ2h0ID0gcmlnaHQ7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gQXNzaWdubWVudFBhdHRlcm47XG5cdH0oKSk7XG5cdGV4cG9ydHMuQXNzaWdubWVudFBhdHRlcm4gPSBBc3NpZ25tZW50UGF0dGVybjtcblx0dmFyIEFzeW5jQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gQXN5bmNBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbihwYXJhbXMsIGJvZHksIGV4cHJlc3Npb24pIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguQXJyb3dGdW5jdGlvbkV4cHJlc3Npb247XG5cdCAgICAgICAgdGhpcy5pZCA9IG51bGw7XG5cdCAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG5cdCAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcblx0ICAgICAgICB0aGlzLmdlbmVyYXRvciA9IGZhbHNlO1xuXHQgICAgICAgIHRoaXMuZXhwcmVzc2lvbiA9IGV4cHJlc3Npb247XG5cdCAgICAgICAgdGhpcy5hc3luYyA9IHRydWU7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gQXN5bmNBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5Bc3luY0Fycm93RnVuY3Rpb25FeHByZXNzaW9uID0gQXN5bmNBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbjtcblx0dmFyIEFzeW5jRnVuY3Rpb25EZWNsYXJhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBBc3luY0Z1bmN0aW9uRGVjbGFyYXRpb24oaWQsIHBhcmFtcywgYm9keSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5GdW5jdGlvbkRlY2xhcmF0aW9uO1xuXHQgICAgICAgIHRoaXMuaWQgPSBpZDtcblx0ICAgICAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcblx0ICAgICAgICB0aGlzLmJvZHkgPSBib2R5O1xuXHQgICAgICAgIHRoaXMuZ2VuZXJhdG9yID0gZmFsc2U7XG5cdCAgICAgICAgdGhpcy5leHByZXNzaW9uID0gZmFsc2U7XG5cdCAgICAgICAgdGhpcy5hc3luYyA9IHRydWU7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gQXN5bmNGdW5jdGlvbkRlY2xhcmF0aW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLkFzeW5jRnVuY3Rpb25EZWNsYXJhdGlvbiA9IEFzeW5jRnVuY3Rpb25EZWNsYXJhdGlvbjtcblx0dmFyIEFzeW5jRnVuY3Rpb25FeHByZXNzaW9uID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEFzeW5jRnVuY3Rpb25FeHByZXNzaW9uKGlkLCBwYXJhbXMsIGJvZHkpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguRnVuY3Rpb25FeHByZXNzaW9uO1xuXHQgICAgICAgIHRoaXMuaWQgPSBpZDtcblx0ICAgICAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcblx0ICAgICAgICB0aGlzLmJvZHkgPSBib2R5O1xuXHQgICAgICAgIHRoaXMuZ2VuZXJhdG9yID0gZmFsc2U7XG5cdCAgICAgICAgdGhpcy5leHByZXNzaW9uID0gZmFsc2U7XG5cdCAgICAgICAgdGhpcy5hc3luYyA9IHRydWU7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gQXN5bmNGdW5jdGlvbkV4cHJlc3Npb247XG5cdH0oKSk7XG5cdGV4cG9ydHMuQXN5bmNGdW5jdGlvbkV4cHJlc3Npb24gPSBBc3luY0Z1bmN0aW9uRXhwcmVzc2lvbjtcblx0dmFyIEF3YWl0RXhwcmVzc2lvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBBd2FpdEV4cHJlc3Npb24oYXJndW1lbnQpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguQXdhaXRFeHByZXNzaW9uO1xuXHQgICAgICAgIHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBBd2FpdEV4cHJlc3Npb247XG5cdH0oKSk7XG5cdGV4cG9ydHMuQXdhaXRFeHByZXNzaW9uID0gQXdhaXRFeHByZXNzaW9uO1xuXHR2YXIgQmluYXJ5RXhwcmVzc2lvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBCaW5hcnlFeHByZXNzaW9uKG9wZXJhdG9yLCBsZWZ0LCByaWdodCkge1xuXHQgICAgICAgIHZhciBsb2dpY2FsID0gKG9wZXJhdG9yID09PSAnfHwnIHx8IG9wZXJhdG9yID09PSAnJiYnKTtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBsb2dpY2FsID8gc3ludGF4XzEuU3ludGF4LkxvZ2ljYWxFeHByZXNzaW9uIDogc3ludGF4XzEuU3ludGF4LkJpbmFyeUV4cHJlc3Npb247XG5cdCAgICAgICAgdGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yO1xuXHQgICAgICAgIHRoaXMubGVmdCA9IGxlZnQ7XG5cdCAgICAgICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEJpbmFyeUV4cHJlc3Npb247XG5cdH0oKSk7XG5cdGV4cG9ydHMuQmluYXJ5RXhwcmVzc2lvbiA9IEJpbmFyeUV4cHJlc3Npb247XG5cdHZhciBCbG9ja1N0YXRlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBCbG9ja1N0YXRlbWVudChib2R5KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkJsb2NrU3RhdGVtZW50O1xuXHQgICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gQmxvY2tTdGF0ZW1lbnQ7XG5cdH0oKSk7XG5cdGV4cG9ydHMuQmxvY2tTdGF0ZW1lbnQgPSBCbG9ja1N0YXRlbWVudDtcblx0dmFyIEJyZWFrU3RhdGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEJyZWFrU3RhdGVtZW50KGxhYmVsKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkJyZWFrU3RhdGVtZW50O1xuXHQgICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBCcmVha1N0YXRlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5CcmVha1N0YXRlbWVudCA9IEJyZWFrU3RhdGVtZW50O1xuXHR2YXIgQ2FsbEV4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gQ2FsbEV4cHJlc3Npb24oY2FsbGVlLCBhcmdzKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkNhbGxFeHByZXNzaW9uO1xuXHQgICAgICAgIHRoaXMuY2FsbGVlID0gY2FsbGVlO1xuXHQgICAgICAgIHRoaXMuYXJndW1lbnRzID0gYXJncztcblx0ICAgIH1cblx0ICAgIHJldHVybiBDYWxsRXhwcmVzc2lvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5DYWxsRXhwcmVzc2lvbiA9IENhbGxFeHByZXNzaW9uO1xuXHR2YXIgQ2F0Y2hDbGF1c2UgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gQ2F0Y2hDbGF1c2UocGFyYW0sIGJvZHkpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguQ2F0Y2hDbGF1c2U7XG5cdCAgICAgICAgdGhpcy5wYXJhbSA9IHBhcmFtO1xuXHQgICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gQ2F0Y2hDbGF1c2U7XG5cdH0oKSk7XG5cdGV4cG9ydHMuQ2F0Y2hDbGF1c2UgPSBDYXRjaENsYXVzZTtcblx0dmFyIENsYXNzQm9keSA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBDbGFzc0JvZHkoYm9keSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5DbGFzc0JvZHk7XG5cdCAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBDbGFzc0JvZHk7XG5cdH0oKSk7XG5cdGV4cG9ydHMuQ2xhc3NCb2R5ID0gQ2xhc3NCb2R5O1xuXHR2YXIgQ2xhc3NEZWNsYXJhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBDbGFzc0RlY2xhcmF0aW9uKGlkLCBzdXBlckNsYXNzLCBib2R5KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkNsYXNzRGVjbGFyYXRpb247XG5cdCAgICAgICAgdGhpcy5pZCA9IGlkO1xuXHQgICAgICAgIHRoaXMuc3VwZXJDbGFzcyA9IHN1cGVyQ2xhc3M7XG5cdCAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBDbGFzc0RlY2xhcmF0aW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLkNsYXNzRGVjbGFyYXRpb24gPSBDbGFzc0RlY2xhcmF0aW9uO1xuXHR2YXIgQ2xhc3NFeHByZXNzaW9uID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIENsYXNzRXhwcmVzc2lvbihpZCwgc3VwZXJDbGFzcywgYm9keSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5DbGFzc0V4cHJlc3Npb247XG5cdCAgICAgICAgdGhpcy5pZCA9IGlkO1xuXHQgICAgICAgIHRoaXMuc3VwZXJDbGFzcyA9IHN1cGVyQ2xhc3M7XG5cdCAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBDbGFzc0V4cHJlc3Npb247XG5cdH0oKSk7XG5cdGV4cG9ydHMuQ2xhc3NFeHByZXNzaW9uID0gQ2xhc3NFeHByZXNzaW9uO1xuXHR2YXIgQ29tcHV0ZWRNZW1iZXJFeHByZXNzaW9uID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIENvbXB1dGVkTWVtYmVyRXhwcmVzc2lvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4Lk1lbWJlckV4cHJlc3Npb247XG5cdCAgICAgICAgdGhpcy5jb21wdXRlZCA9IHRydWU7XG5cdCAgICAgICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG5cdCAgICAgICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIENvbXB1dGVkTWVtYmVyRXhwcmVzc2lvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5Db21wdXRlZE1lbWJlckV4cHJlc3Npb24gPSBDb21wdXRlZE1lbWJlckV4cHJlc3Npb247XG5cdHZhciBDb25kaXRpb25hbEV4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gQ29uZGl0aW9uYWxFeHByZXNzaW9uKHRlc3QsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5Db25kaXRpb25hbEV4cHJlc3Npb247XG5cdCAgICAgICAgdGhpcy50ZXN0ID0gdGVzdDtcblx0ICAgICAgICB0aGlzLmNvbnNlcXVlbnQgPSBjb25zZXF1ZW50O1xuXHQgICAgICAgIHRoaXMuYWx0ZXJuYXRlID0gYWx0ZXJuYXRlO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIENvbmRpdGlvbmFsRXhwcmVzc2lvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5Db25kaXRpb25hbEV4cHJlc3Npb24gPSBDb25kaXRpb25hbEV4cHJlc3Npb247XG5cdHZhciBDb250aW51ZVN0YXRlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBDb250aW51ZVN0YXRlbWVudChsYWJlbCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5Db250aW51ZVN0YXRlbWVudDtcblx0ICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gQ29udGludWVTdGF0ZW1lbnQ7XG5cdH0oKSk7XG5cdGV4cG9ydHMuQ29udGludWVTdGF0ZW1lbnQgPSBDb250aW51ZVN0YXRlbWVudDtcblx0dmFyIERlYnVnZ2VyU3RhdGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIERlYnVnZ2VyU3RhdGVtZW50KCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5EZWJ1Z2dlclN0YXRlbWVudDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBEZWJ1Z2dlclN0YXRlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5EZWJ1Z2dlclN0YXRlbWVudCA9IERlYnVnZ2VyU3RhdGVtZW50O1xuXHR2YXIgRGlyZWN0aXZlID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIERpcmVjdGl2ZShleHByZXNzaW9uLCBkaXJlY3RpdmUpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguRXhwcmVzc2lvblN0YXRlbWVudDtcblx0ICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xuXHQgICAgICAgIHRoaXMuZGlyZWN0aXZlID0gZGlyZWN0aXZlO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIERpcmVjdGl2ZTtcblx0fSgpKTtcblx0ZXhwb3J0cy5EaXJlY3RpdmUgPSBEaXJlY3RpdmU7XG5cdHZhciBEb1doaWxlU3RhdGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIERvV2hpbGVTdGF0ZW1lbnQoYm9keSwgdGVzdCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5Eb1doaWxlU3RhdGVtZW50O1xuXHQgICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG5cdCAgICAgICAgdGhpcy50ZXN0ID0gdGVzdDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBEb1doaWxlU3RhdGVtZW50O1xuXHR9KCkpO1xuXHRleHBvcnRzLkRvV2hpbGVTdGF0ZW1lbnQgPSBEb1doaWxlU3RhdGVtZW50O1xuXHR2YXIgRW1wdHlTdGF0ZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gRW1wdHlTdGF0ZW1lbnQoKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkVtcHR5U3RhdGVtZW50O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEVtcHR5U3RhdGVtZW50O1xuXHR9KCkpO1xuXHRleHBvcnRzLkVtcHR5U3RhdGVtZW50ID0gRW1wdHlTdGF0ZW1lbnQ7XG5cdHZhciBFeHBvcnRBbGxEZWNsYXJhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBFeHBvcnRBbGxEZWNsYXJhdGlvbihzb3VyY2UpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguRXhwb3J0QWxsRGVjbGFyYXRpb247XG5cdCAgICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gRXhwb3J0QWxsRGVjbGFyYXRpb247XG5cdH0oKSk7XG5cdGV4cG9ydHMuRXhwb3J0QWxsRGVjbGFyYXRpb24gPSBFeHBvcnRBbGxEZWNsYXJhdGlvbjtcblx0dmFyIEV4cG9ydERlZmF1bHREZWNsYXJhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24oZGVjbGFyYXRpb24pIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uO1xuXHQgICAgICAgIHRoaXMuZGVjbGFyYXRpb24gPSBkZWNsYXJhdGlvbjtcblx0ICAgIH1cblx0ICAgIHJldHVybiBFeHBvcnREZWZhdWx0RGVjbGFyYXRpb247XG5cdH0oKSk7XG5cdGV4cG9ydHMuRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uID0gRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uO1xuXHR2YXIgRXhwb3J0TmFtZWREZWNsYXJhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBFeHBvcnROYW1lZERlY2xhcmF0aW9uKGRlY2xhcmF0aW9uLCBzcGVjaWZpZXJzLCBzb3VyY2UpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguRXhwb3J0TmFtZWREZWNsYXJhdGlvbjtcblx0ICAgICAgICB0aGlzLmRlY2xhcmF0aW9uID0gZGVjbGFyYXRpb247XG5cdCAgICAgICAgdGhpcy5zcGVjaWZpZXJzID0gc3BlY2lmaWVycztcblx0ICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBFeHBvcnROYW1lZERlY2xhcmF0aW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLkV4cG9ydE5hbWVkRGVjbGFyYXRpb24gPSBFeHBvcnROYW1lZERlY2xhcmF0aW9uO1xuXHR2YXIgRXhwb3J0U3BlY2lmaWVyID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEV4cG9ydFNwZWNpZmllcihsb2NhbCwgZXhwb3J0ZWQpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguRXhwb3J0U3BlY2lmaWVyO1xuXHQgICAgICAgIHRoaXMuZXhwb3J0ZWQgPSBleHBvcnRlZDtcblx0ICAgICAgICB0aGlzLmxvY2FsID0gbG9jYWw7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gRXhwb3J0U3BlY2lmaWVyO1xuXHR9KCkpO1xuXHRleHBvcnRzLkV4cG9ydFNwZWNpZmllciA9IEV4cG9ydFNwZWNpZmllcjtcblx0dmFyIEV4cHJlc3Npb25TdGF0ZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gRXhwcmVzc2lvblN0YXRlbWVudChleHByZXNzaW9uKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkV4cHJlc3Npb25TdGF0ZW1lbnQ7XG5cdCAgICAgICAgdGhpcy5leHByZXNzaW9uID0gZXhwcmVzc2lvbjtcblx0ICAgIH1cblx0ICAgIHJldHVybiBFeHByZXNzaW9uU3RhdGVtZW50O1xuXHR9KCkpO1xuXHRleHBvcnRzLkV4cHJlc3Npb25TdGF0ZW1lbnQgPSBFeHByZXNzaW9uU3RhdGVtZW50O1xuXHR2YXIgRm9ySW5TdGF0ZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gRm9ySW5TdGF0ZW1lbnQobGVmdCwgcmlnaHQsIGJvZHkpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguRm9ySW5TdGF0ZW1lbnQ7XG5cdCAgICAgICAgdGhpcy5sZWZ0ID0gbGVmdDtcblx0ICAgICAgICB0aGlzLnJpZ2h0ID0gcmlnaHQ7XG5cdCAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcblx0ICAgICAgICB0aGlzLmVhY2ggPSBmYWxzZTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBGb3JJblN0YXRlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5Gb3JJblN0YXRlbWVudCA9IEZvckluU3RhdGVtZW50O1xuXHR2YXIgRm9yT2ZTdGF0ZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gRm9yT2ZTdGF0ZW1lbnQobGVmdCwgcmlnaHQsIGJvZHkpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguRm9yT2ZTdGF0ZW1lbnQ7XG5cdCAgICAgICAgdGhpcy5sZWZ0ID0gbGVmdDtcblx0ICAgICAgICB0aGlzLnJpZ2h0ID0gcmlnaHQ7XG5cdCAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBGb3JPZlN0YXRlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5Gb3JPZlN0YXRlbWVudCA9IEZvck9mU3RhdGVtZW50O1xuXHR2YXIgRm9yU3RhdGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEZvclN0YXRlbWVudChpbml0LCB0ZXN0LCB1cGRhdGUsIGJvZHkpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguRm9yU3RhdGVtZW50O1xuXHQgICAgICAgIHRoaXMuaW5pdCA9IGluaXQ7XG5cdCAgICAgICAgdGhpcy50ZXN0ID0gdGVzdDtcblx0ICAgICAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZTtcblx0ICAgICAgICB0aGlzLmJvZHkgPSBib2R5O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEZvclN0YXRlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5Gb3JTdGF0ZW1lbnQgPSBGb3JTdGF0ZW1lbnQ7XG5cdHZhciBGdW5jdGlvbkRlY2xhcmF0aW9uID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEZ1bmN0aW9uRGVjbGFyYXRpb24oaWQsIHBhcmFtcywgYm9keSwgZ2VuZXJhdG9yKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LkZ1bmN0aW9uRGVjbGFyYXRpb247XG5cdCAgICAgICAgdGhpcy5pZCA9IGlkO1xuXHQgICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuXHQgICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG5cdCAgICAgICAgdGhpcy5nZW5lcmF0b3IgPSBnZW5lcmF0b3I7XG5cdCAgICAgICAgdGhpcy5leHByZXNzaW9uID0gZmFsc2U7XG5cdCAgICAgICAgdGhpcy5hc3luYyA9IGZhbHNlO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEZ1bmN0aW9uRGVjbGFyYXRpb247XG5cdH0oKSk7XG5cdGV4cG9ydHMuRnVuY3Rpb25EZWNsYXJhdGlvbiA9IEZ1bmN0aW9uRGVjbGFyYXRpb247XG5cdHZhciBGdW5jdGlvbkV4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gRnVuY3Rpb25FeHByZXNzaW9uKGlkLCBwYXJhbXMsIGJvZHksIGdlbmVyYXRvcikge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5GdW5jdGlvbkV4cHJlc3Npb247XG5cdCAgICAgICAgdGhpcy5pZCA9IGlkO1xuXHQgICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuXHQgICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG5cdCAgICAgICAgdGhpcy5nZW5lcmF0b3IgPSBnZW5lcmF0b3I7XG5cdCAgICAgICAgdGhpcy5leHByZXNzaW9uID0gZmFsc2U7XG5cdCAgICAgICAgdGhpcy5hc3luYyA9IGZhbHNlO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEZ1bmN0aW9uRXhwcmVzc2lvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5GdW5jdGlvbkV4cHJlc3Npb24gPSBGdW5jdGlvbkV4cHJlc3Npb247XG5cdHZhciBJZGVudGlmaWVyID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIElkZW50aWZpZXIobmFtZSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5JZGVudGlmaWVyO1xuXHQgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gSWRlbnRpZmllcjtcblx0fSgpKTtcblx0ZXhwb3J0cy5JZGVudGlmaWVyID0gSWRlbnRpZmllcjtcblx0dmFyIElmU3RhdGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIElmU3RhdGVtZW50KHRlc3QsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5JZlN0YXRlbWVudDtcblx0ICAgICAgICB0aGlzLnRlc3QgPSB0ZXN0O1xuXHQgICAgICAgIHRoaXMuY29uc2VxdWVudCA9IGNvbnNlcXVlbnQ7XG5cdCAgICAgICAgdGhpcy5hbHRlcm5hdGUgPSBhbHRlcm5hdGU7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gSWZTdGF0ZW1lbnQ7XG5cdH0oKSk7XG5cdGV4cG9ydHMuSWZTdGF0ZW1lbnQgPSBJZlN0YXRlbWVudDtcblx0dmFyIEltcG9ydERlY2xhcmF0aW9uID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEltcG9ydERlY2xhcmF0aW9uKHNwZWNpZmllcnMsIHNvdXJjZSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5JbXBvcnREZWNsYXJhdGlvbjtcblx0ICAgICAgICB0aGlzLnNwZWNpZmllcnMgPSBzcGVjaWZpZXJzO1xuXHQgICAgICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIEltcG9ydERlY2xhcmF0aW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLkltcG9ydERlY2xhcmF0aW9uID0gSW1wb3J0RGVjbGFyYXRpb247XG5cdHZhciBJbXBvcnREZWZhdWx0U3BlY2lmaWVyID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEltcG9ydERlZmF1bHRTcGVjaWZpZXIobG9jYWwpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguSW1wb3J0RGVmYXVsdFNwZWNpZmllcjtcblx0ICAgICAgICB0aGlzLmxvY2FsID0gbG9jYWw7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gSW1wb3J0RGVmYXVsdFNwZWNpZmllcjtcblx0fSgpKTtcblx0ZXhwb3J0cy5JbXBvcnREZWZhdWx0U3BlY2lmaWVyID0gSW1wb3J0RGVmYXVsdFNwZWNpZmllcjtcblx0dmFyIEltcG9ydE5hbWVzcGFjZVNwZWNpZmllciA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXIobG9jYWwpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyO1xuXHQgICAgICAgIHRoaXMubG9jYWwgPSBsb2NhbDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXI7XG5cdH0oKSk7XG5cdGV4cG9ydHMuSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyID0gSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyO1xuXHR2YXIgSW1wb3J0U3BlY2lmaWVyID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEltcG9ydFNwZWNpZmllcihsb2NhbCwgaW1wb3J0ZWQpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguSW1wb3J0U3BlY2lmaWVyO1xuXHQgICAgICAgIHRoaXMubG9jYWwgPSBsb2NhbDtcblx0ICAgICAgICB0aGlzLmltcG9ydGVkID0gaW1wb3J0ZWQ7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gSW1wb3J0U3BlY2lmaWVyO1xuXHR9KCkpO1xuXHRleHBvcnRzLkltcG9ydFNwZWNpZmllciA9IEltcG9ydFNwZWNpZmllcjtcblx0dmFyIExhYmVsZWRTdGF0ZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gTGFiZWxlZFN0YXRlbWVudChsYWJlbCwgYm9keSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5MYWJlbGVkU3RhdGVtZW50O1xuXHQgICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcblx0ICAgICAgICB0aGlzLmJvZHkgPSBib2R5O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIExhYmVsZWRTdGF0ZW1lbnQ7XG5cdH0oKSk7XG5cdGV4cG9ydHMuTGFiZWxlZFN0YXRlbWVudCA9IExhYmVsZWRTdGF0ZW1lbnQ7XG5cdHZhciBMaXRlcmFsID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIExpdGVyYWwodmFsdWUsIHJhdykge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5MaXRlcmFsO1xuXHQgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0ICAgICAgICB0aGlzLnJhdyA9IHJhdztcblx0ICAgIH1cblx0ICAgIHJldHVybiBMaXRlcmFsO1xuXHR9KCkpO1xuXHRleHBvcnRzLkxpdGVyYWwgPSBMaXRlcmFsO1xuXHR2YXIgTWV0YVByb3BlcnR5ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIE1ldGFQcm9wZXJ0eShtZXRhLCBwcm9wZXJ0eSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5NZXRhUHJvcGVydHk7XG5cdCAgICAgICAgdGhpcy5tZXRhID0gbWV0YTtcblx0ICAgICAgICB0aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gTWV0YVByb3BlcnR5O1xuXHR9KCkpO1xuXHRleHBvcnRzLk1ldGFQcm9wZXJ0eSA9IE1ldGFQcm9wZXJ0eTtcblx0dmFyIE1ldGhvZERlZmluaXRpb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gTWV0aG9kRGVmaW5pdGlvbihrZXksIGNvbXB1dGVkLCB2YWx1ZSwga2luZCwgaXNTdGF0aWMpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguTWV0aG9kRGVmaW5pdGlvbjtcblx0ICAgICAgICB0aGlzLmtleSA9IGtleTtcblx0ICAgICAgICB0aGlzLmNvbXB1dGVkID0gY29tcHV0ZWQ7XG5cdCAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXHQgICAgICAgIHRoaXMua2luZCA9IGtpbmQ7XG5cdCAgICAgICAgdGhpcy5zdGF0aWMgPSBpc1N0YXRpYztcblx0ICAgIH1cblx0ICAgIHJldHVybiBNZXRob2REZWZpbml0aW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLk1ldGhvZERlZmluaXRpb24gPSBNZXRob2REZWZpbml0aW9uO1xuXHR2YXIgTW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIE1vZHVsZShib2R5KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LlByb2dyYW07XG5cdCAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcblx0ICAgICAgICB0aGlzLnNvdXJjZVR5cGUgPSAnbW9kdWxlJztcblx0ICAgIH1cblx0ICAgIHJldHVybiBNb2R1bGU7XG5cdH0oKSk7XG5cdGV4cG9ydHMuTW9kdWxlID0gTW9kdWxlO1xuXHR2YXIgTmV3RXhwcmVzc2lvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBOZXdFeHByZXNzaW9uKGNhbGxlZSwgYXJncykge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5OZXdFeHByZXNzaW9uO1xuXHQgICAgICAgIHRoaXMuY2FsbGVlID0gY2FsbGVlO1xuXHQgICAgICAgIHRoaXMuYXJndW1lbnRzID0gYXJncztcblx0ICAgIH1cblx0ICAgIHJldHVybiBOZXdFeHByZXNzaW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLk5ld0V4cHJlc3Npb24gPSBOZXdFeHByZXNzaW9uO1xuXHR2YXIgT2JqZWN0RXhwcmVzc2lvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBPYmplY3RFeHByZXNzaW9uKHByb3BlcnRpZXMpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguT2JqZWN0RXhwcmVzc2lvbjtcblx0ICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIE9iamVjdEV4cHJlc3Npb247XG5cdH0oKSk7XG5cdGV4cG9ydHMuT2JqZWN0RXhwcmVzc2lvbiA9IE9iamVjdEV4cHJlc3Npb247XG5cdHZhciBPYmplY3RQYXR0ZXJuID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIE9iamVjdFBhdHRlcm4ocHJvcGVydGllcykge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5PYmplY3RQYXR0ZXJuO1xuXHQgICAgICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gT2JqZWN0UGF0dGVybjtcblx0fSgpKTtcblx0ZXhwb3J0cy5PYmplY3RQYXR0ZXJuID0gT2JqZWN0UGF0dGVybjtcblx0dmFyIFByb3BlcnR5ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIFByb3BlcnR5KGtpbmQsIGtleSwgY29tcHV0ZWQsIHZhbHVlLCBtZXRob2QsIHNob3J0aGFuZCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5Qcm9wZXJ0eTtcblx0ICAgICAgICB0aGlzLmtleSA9IGtleTtcblx0ICAgICAgICB0aGlzLmNvbXB1dGVkID0gY29tcHV0ZWQ7XG5cdCAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXHQgICAgICAgIHRoaXMua2luZCA9IGtpbmQ7XG5cdCAgICAgICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG5cdCAgICAgICAgdGhpcy5zaG9ydGhhbmQgPSBzaG9ydGhhbmQ7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gUHJvcGVydHk7XG5cdH0oKSk7XG5cdGV4cG9ydHMuUHJvcGVydHkgPSBQcm9wZXJ0eTtcblx0dmFyIFJlZ2V4TGl0ZXJhbCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBSZWdleExpdGVyYWwodmFsdWUsIHJhdywgcGF0dGVybiwgZmxhZ3MpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguTGl0ZXJhbDtcblx0ICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cdCAgICAgICAgdGhpcy5yYXcgPSByYXc7XG5cdCAgICAgICAgdGhpcy5yZWdleCA9IHsgcGF0dGVybjogcGF0dGVybiwgZmxhZ3M6IGZsYWdzIH07XG5cdCAgICB9XG5cdCAgICByZXR1cm4gUmVnZXhMaXRlcmFsO1xuXHR9KCkpO1xuXHRleHBvcnRzLlJlZ2V4TGl0ZXJhbCA9IFJlZ2V4TGl0ZXJhbDtcblx0dmFyIFJlc3RFbGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIFJlc3RFbGVtZW50KGFyZ3VtZW50KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LlJlc3RFbGVtZW50O1xuXHQgICAgICAgIHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBSZXN0RWxlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5SZXN0RWxlbWVudCA9IFJlc3RFbGVtZW50O1xuXHR2YXIgUmV0dXJuU3RhdGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIFJldHVyblN0YXRlbWVudChhcmd1bWVudCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5SZXR1cm5TdGF0ZW1lbnQ7XG5cdCAgICAgICAgdGhpcy5hcmd1bWVudCA9IGFyZ3VtZW50O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIFJldHVyblN0YXRlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5SZXR1cm5TdGF0ZW1lbnQgPSBSZXR1cm5TdGF0ZW1lbnQ7XG5cdHZhciBTY3JpcHQgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gU2NyaXB0KGJvZHkpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguUHJvZ3JhbTtcblx0ICAgICAgICB0aGlzLmJvZHkgPSBib2R5O1xuXHQgICAgICAgIHRoaXMuc291cmNlVHlwZSA9ICdzY3JpcHQnO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIFNjcmlwdDtcblx0fSgpKTtcblx0ZXhwb3J0cy5TY3JpcHQgPSBTY3JpcHQ7XG5cdHZhciBTZXF1ZW5jZUV4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gU2VxdWVuY2VFeHByZXNzaW9uKGV4cHJlc3Npb25zKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LlNlcXVlbmNlRXhwcmVzc2lvbjtcblx0ICAgICAgICB0aGlzLmV4cHJlc3Npb25zID0gZXhwcmVzc2lvbnM7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gU2VxdWVuY2VFeHByZXNzaW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLlNlcXVlbmNlRXhwcmVzc2lvbiA9IFNlcXVlbmNlRXhwcmVzc2lvbjtcblx0dmFyIFNwcmVhZEVsZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gU3ByZWFkRWxlbWVudChhcmd1bWVudCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5TcHJlYWRFbGVtZW50O1xuXHQgICAgICAgIHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBTcHJlYWRFbGVtZW50O1xuXHR9KCkpO1xuXHRleHBvcnRzLlNwcmVhZEVsZW1lbnQgPSBTcHJlYWRFbGVtZW50O1xuXHR2YXIgU3RhdGljTWVtYmVyRXhwcmVzc2lvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBTdGF0aWNNZW1iZXJFeHByZXNzaW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguTWVtYmVyRXhwcmVzc2lvbjtcblx0ICAgICAgICB0aGlzLmNvbXB1dGVkID0gZmFsc2U7XG5cdCAgICAgICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG5cdCAgICAgICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIFN0YXRpY01lbWJlckV4cHJlc3Npb247XG5cdH0oKSk7XG5cdGV4cG9ydHMuU3RhdGljTWVtYmVyRXhwcmVzc2lvbiA9IFN0YXRpY01lbWJlckV4cHJlc3Npb247XG5cdHZhciBTdXBlciA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBTdXBlcigpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguU3VwZXI7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gU3VwZXI7XG5cdH0oKSk7XG5cdGV4cG9ydHMuU3VwZXIgPSBTdXBlcjtcblx0dmFyIFN3aXRjaENhc2UgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gU3dpdGNoQ2FzZSh0ZXN0LCBjb25zZXF1ZW50KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LlN3aXRjaENhc2U7XG5cdCAgICAgICAgdGhpcy50ZXN0ID0gdGVzdDtcblx0ICAgICAgICB0aGlzLmNvbnNlcXVlbnQgPSBjb25zZXF1ZW50O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIFN3aXRjaENhc2U7XG5cdH0oKSk7XG5cdGV4cG9ydHMuU3dpdGNoQ2FzZSA9IFN3aXRjaENhc2U7XG5cdHZhciBTd2l0Y2hTdGF0ZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gU3dpdGNoU3RhdGVtZW50KGRpc2NyaW1pbmFudCwgY2FzZXMpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguU3dpdGNoU3RhdGVtZW50O1xuXHQgICAgICAgIHRoaXMuZGlzY3JpbWluYW50ID0gZGlzY3JpbWluYW50O1xuXHQgICAgICAgIHRoaXMuY2FzZXMgPSBjYXNlcztcblx0ICAgIH1cblx0ICAgIHJldHVybiBTd2l0Y2hTdGF0ZW1lbnQ7XG5cdH0oKSk7XG5cdGV4cG9ydHMuU3dpdGNoU3RhdGVtZW50ID0gU3dpdGNoU3RhdGVtZW50O1xuXHR2YXIgVGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIFRhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbih0YWcsIHF1YXNpKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LlRhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbjtcblx0ICAgICAgICB0aGlzLnRhZyA9IHRhZztcblx0ICAgICAgICB0aGlzLnF1YXNpID0gcXVhc2k7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gVGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLlRhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbiA9IFRhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbjtcblx0dmFyIFRlbXBsYXRlRWxlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBUZW1wbGF0ZUVsZW1lbnQodmFsdWUsIHRhaWwpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguVGVtcGxhdGVFbGVtZW50O1xuXHQgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0ICAgICAgICB0aGlzLnRhaWwgPSB0YWlsO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIFRlbXBsYXRlRWxlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5UZW1wbGF0ZUVsZW1lbnQgPSBUZW1wbGF0ZUVsZW1lbnQ7XG5cdHZhciBUZW1wbGF0ZUxpdGVyYWwgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gVGVtcGxhdGVMaXRlcmFsKHF1YXNpcywgZXhwcmVzc2lvbnMpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguVGVtcGxhdGVMaXRlcmFsO1xuXHQgICAgICAgIHRoaXMucXVhc2lzID0gcXVhc2lzO1xuXHQgICAgICAgIHRoaXMuZXhwcmVzc2lvbnMgPSBleHByZXNzaW9ucztcblx0ICAgIH1cblx0ICAgIHJldHVybiBUZW1wbGF0ZUxpdGVyYWw7XG5cdH0oKSk7XG5cdGV4cG9ydHMuVGVtcGxhdGVMaXRlcmFsID0gVGVtcGxhdGVMaXRlcmFsO1xuXHR2YXIgVGhpc0V4cHJlc3Npb24gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gVGhpc0V4cHJlc3Npb24oKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LlRoaXNFeHByZXNzaW9uO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIFRoaXNFeHByZXNzaW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLlRoaXNFeHByZXNzaW9uID0gVGhpc0V4cHJlc3Npb247XG5cdHZhciBUaHJvd1N0YXRlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBUaHJvd1N0YXRlbWVudChhcmd1bWVudCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5UaHJvd1N0YXRlbWVudDtcblx0ICAgICAgICB0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnQ7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gVGhyb3dTdGF0ZW1lbnQ7XG5cdH0oKSk7XG5cdGV4cG9ydHMuVGhyb3dTdGF0ZW1lbnQgPSBUaHJvd1N0YXRlbWVudDtcblx0dmFyIFRyeVN0YXRlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBUcnlTdGF0ZW1lbnQoYmxvY2ssIGhhbmRsZXIsIGZpbmFsaXplcikge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5UcnlTdGF0ZW1lbnQ7XG5cdCAgICAgICAgdGhpcy5ibG9jayA9IGJsb2NrO1xuXHQgICAgICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG5cdCAgICAgICAgdGhpcy5maW5hbGl6ZXIgPSBmaW5hbGl6ZXI7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gVHJ5U3RhdGVtZW50O1xuXHR9KCkpO1xuXHRleHBvcnRzLlRyeVN0YXRlbWVudCA9IFRyeVN0YXRlbWVudDtcblx0dmFyIFVuYXJ5RXhwcmVzc2lvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBVbmFyeUV4cHJlc3Npb24ob3BlcmF0b3IsIGFyZ3VtZW50KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LlVuYXJ5RXhwcmVzc2lvbjtcblx0ICAgICAgICB0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3I7XG5cdCAgICAgICAgdGhpcy5hcmd1bWVudCA9IGFyZ3VtZW50O1xuXHQgICAgICAgIHRoaXMucHJlZml4ID0gdHJ1ZTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBVbmFyeUV4cHJlc3Npb247XG5cdH0oKSk7XG5cdGV4cG9ydHMuVW5hcnlFeHByZXNzaW9uID0gVW5hcnlFeHByZXNzaW9uO1xuXHR2YXIgVXBkYXRlRXhwcmVzc2lvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBVcGRhdGVFeHByZXNzaW9uKG9wZXJhdG9yLCBhcmd1bWVudCwgcHJlZml4KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LlVwZGF0ZUV4cHJlc3Npb247XG5cdCAgICAgICAgdGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yO1xuXHQgICAgICAgIHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudDtcblx0ICAgICAgICB0aGlzLnByZWZpeCA9IHByZWZpeDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBVcGRhdGVFeHByZXNzaW9uO1xuXHR9KCkpO1xuXHRleHBvcnRzLlVwZGF0ZUV4cHJlc3Npb24gPSBVcGRhdGVFeHByZXNzaW9uO1xuXHR2YXIgVmFyaWFibGVEZWNsYXJhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBWYXJpYWJsZURlY2xhcmF0aW9uKGRlY2xhcmF0aW9ucywga2luZCkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5WYXJpYWJsZURlY2xhcmF0aW9uO1xuXHQgICAgICAgIHRoaXMuZGVjbGFyYXRpb25zID0gZGVjbGFyYXRpb25zO1xuXHQgICAgICAgIHRoaXMua2luZCA9IGtpbmQ7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gVmFyaWFibGVEZWNsYXJhdGlvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5WYXJpYWJsZURlY2xhcmF0aW9uID0gVmFyaWFibGVEZWNsYXJhdGlvbjtcblx0dmFyIFZhcmlhYmxlRGVjbGFyYXRvciA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBWYXJpYWJsZURlY2xhcmF0b3IoaWQsIGluaXQpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSBzeW50YXhfMS5TeW50YXguVmFyaWFibGVEZWNsYXJhdG9yO1xuXHQgICAgICAgIHRoaXMuaWQgPSBpZDtcblx0ICAgICAgICB0aGlzLmluaXQgPSBpbml0O1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIFZhcmlhYmxlRGVjbGFyYXRvcjtcblx0fSgpKTtcblx0ZXhwb3J0cy5WYXJpYWJsZURlY2xhcmF0b3IgPSBWYXJpYWJsZURlY2xhcmF0b3I7XG5cdHZhciBXaGlsZVN0YXRlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBXaGlsZVN0YXRlbWVudCh0ZXN0LCBib2R5KSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LldoaWxlU3RhdGVtZW50O1xuXHQgICAgICAgIHRoaXMudGVzdCA9IHRlc3Q7XG5cdCAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBXaGlsZVN0YXRlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5XaGlsZVN0YXRlbWVudCA9IFdoaWxlU3RhdGVtZW50O1xuXHR2YXIgV2l0aFN0YXRlbWVudCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBXaXRoU3RhdGVtZW50KG9iamVjdCwgYm9keSkge1xuXHQgICAgICAgIHRoaXMudHlwZSA9IHN5bnRheF8xLlN5bnRheC5XaXRoU3RhdGVtZW50O1xuXHQgICAgICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuXHQgICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gV2l0aFN0YXRlbWVudDtcblx0fSgpKTtcblx0ZXhwb3J0cy5XaXRoU3RhdGVtZW50ID0gV2l0aFN0YXRlbWVudDtcblx0dmFyIFlpZWxkRXhwcmVzc2lvbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBZaWVsZEV4cHJlc3Npb24oYXJndW1lbnQsIGRlbGVnYXRlKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gc3ludGF4XzEuU3ludGF4LllpZWxkRXhwcmVzc2lvbjtcblx0ICAgICAgICB0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnQ7XG5cdCAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIFlpZWxkRXhwcmVzc2lvbjtcblx0fSgpKTtcblx0ZXhwb3J0cy5ZaWVsZEV4cHJlc3Npb24gPSBZaWVsZEV4cHJlc3Npb247XG5cblxuLyoqKi8gfSxcbi8qIDggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5cdHZhciBhc3NlcnRfMSA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XG5cdHZhciBlcnJvcl9oYW5kbGVyXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcblx0dmFyIG1lc3NhZ2VzXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKTtcblx0dmFyIE5vZGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpO1xuXHR2YXIgc2Nhbm5lcl8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMik7XG5cdHZhciBzeW50YXhfMSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cdHZhciB0b2tlbl8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMyk7XG5cdHZhciBBcnJvd1BhcmFtZXRlclBsYWNlSG9sZGVyID0gJ0Fycm93UGFyYW1ldGVyUGxhY2VIb2xkZXInO1xuXHR2YXIgUGFyc2VyID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIFBhcnNlcihjb2RlLCBvcHRpb25zLCBkZWxlZ2F0ZSkge1xuXHQgICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG5cdCAgICAgICAgdGhpcy5jb25maWcgPSB7XG5cdCAgICAgICAgICAgIHJhbmdlOiAodHlwZW9mIG9wdGlvbnMucmFuZ2UgPT09ICdib29sZWFuJykgJiYgb3B0aW9ucy5yYW5nZSxcblx0ICAgICAgICAgICAgbG9jOiAodHlwZW9mIG9wdGlvbnMubG9jID09PSAnYm9vbGVhbicpICYmIG9wdGlvbnMubG9jLFxuXHQgICAgICAgICAgICBzb3VyY2U6IG51bGwsXG5cdCAgICAgICAgICAgIHRva2VuczogKHR5cGVvZiBvcHRpb25zLnRva2VucyA9PT0gJ2Jvb2xlYW4nKSAmJiBvcHRpb25zLnRva2Vucyxcblx0ICAgICAgICAgICAgY29tbWVudDogKHR5cGVvZiBvcHRpb25zLmNvbW1lbnQgPT09ICdib29sZWFuJykgJiYgb3B0aW9ucy5jb21tZW50LFxuXHQgICAgICAgICAgICB0b2xlcmFudDogKHR5cGVvZiBvcHRpb25zLnRvbGVyYW50ID09PSAnYm9vbGVhbicpICYmIG9wdGlvbnMudG9sZXJhbnRcblx0ICAgICAgICB9O1xuXHQgICAgICAgIGlmICh0aGlzLmNvbmZpZy5sb2MgJiYgb3B0aW9ucy5zb3VyY2UgJiYgb3B0aW9ucy5zb3VyY2UgIT09IG51bGwpIHtcblx0ICAgICAgICAgICAgdGhpcy5jb25maWcuc291cmNlID0gU3RyaW5nKG9wdGlvbnMuc291cmNlKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuXHQgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyID0gbmV3IGVycm9yX2hhbmRsZXJfMS5FcnJvckhhbmRsZXIoKTtcblx0ICAgICAgICB0aGlzLmVycm9ySGFuZGxlci50b2xlcmFudCA9IHRoaXMuY29uZmlnLnRvbGVyYW50O1xuXHQgICAgICAgIHRoaXMuc2Nhbm5lciA9IG5ldyBzY2FubmVyXzEuU2Nhbm5lcihjb2RlLCB0aGlzLmVycm9ySGFuZGxlcik7XG5cdCAgICAgICAgdGhpcy5zY2FubmVyLnRyYWNrQ29tbWVudCA9IHRoaXMuY29uZmlnLmNvbW1lbnQ7XG5cdCAgICAgICAgdGhpcy5vcGVyYXRvclByZWNlZGVuY2UgPSB7XG5cdCAgICAgICAgICAgICcpJzogMCxcblx0ICAgICAgICAgICAgJzsnOiAwLFxuXHQgICAgICAgICAgICAnLCc6IDAsXG5cdCAgICAgICAgICAgICc9JzogMCxcblx0ICAgICAgICAgICAgJ10nOiAwLFxuXHQgICAgICAgICAgICAnfHwnOiAxLFxuXHQgICAgICAgICAgICAnJiYnOiAyLFxuXHQgICAgICAgICAgICAnfCc6IDMsXG5cdCAgICAgICAgICAgICdeJzogNCxcblx0ICAgICAgICAgICAgJyYnOiA1LFxuXHQgICAgICAgICAgICAnPT0nOiA2LFxuXHQgICAgICAgICAgICAnIT0nOiA2LFxuXHQgICAgICAgICAgICAnPT09JzogNixcblx0ICAgICAgICAgICAgJyE9PSc6IDYsXG5cdCAgICAgICAgICAgICc8JzogNyxcblx0ICAgICAgICAgICAgJz4nOiA3LFxuXHQgICAgICAgICAgICAnPD0nOiA3LFxuXHQgICAgICAgICAgICAnPj0nOiA3LFxuXHQgICAgICAgICAgICAnPDwnOiA4LFxuXHQgICAgICAgICAgICAnPj4nOiA4LFxuXHQgICAgICAgICAgICAnPj4+JzogOCxcblx0ICAgICAgICAgICAgJysnOiA5LFxuXHQgICAgICAgICAgICAnLSc6IDksXG5cdCAgICAgICAgICAgICcqJzogMTEsXG5cdCAgICAgICAgICAgICcvJzogMTEsXG5cdCAgICAgICAgICAgICclJzogMTFcblx0ICAgICAgICB9O1xuXHQgICAgICAgIHRoaXMubG9va2FoZWFkID0ge1xuXHQgICAgICAgICAgICB0eXBlOiAyIC8qIEVPRiAqLyxcblx0ICAgICAgICAgICAgdmFsdWU6ICcnLFxuXHQgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLnNjYW5uZXIubGluZU51bWJlcixcblx0ICAgICAgICAgICAgbGluZVN0YXJ0OiAwLFxuXHQgICAgICAgICAgICBzdGFydDogMCxcblx0ICAgICAgICAgICAgZW5kOiAwXG5cdCAgICAgICAgfTtcblx0ICAgICAgICB0aGlzLmhhc0xpbmVUZXJtaW5hdG9yID0gZmFsc2U7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0ID0ge1xuXHQgICAgICAgICAgICBpc01vZHVsZTogZmFsc2UsXG5cdCAgICAgICAgICAgIGF3YWl0OiBmYWxzZSxcblx0ICAgICAgICAgICAgYWxsb3dJbjogdHJ1ZSxcblx0ICAgICAgICAgICAgYWxsb3dTdHJpY3REaXJlY3RpdmU6IHRydWUsXG5cdCAgICAgICAgICAgIGFsbG93WWllbGQ6IHRydWUsXG5cdCAgICAgICAgICAgIGZpcnN0Q292ZXJJbml0aWFsaXplZE5hbWVFcnJvcjogbnVsbCxcblx0ICAgICAgICAgICAgaXNBc3NpZ25tZW50VGFyZ2V0OiBmYWxzZSxcblx0ICAgICAgICAgICAgaXNCaW5kaW5nRWxlbWVudDogZmFsc2UsXG5cdCAgICAgICAgICAgIGluRnVuY3Rpb25Cb2R5OiBmYWxzZSxcblx0ICAgICAgICAgICAgaW5JdGVyYXRpb246IGZhbHNlLFxuXHQgICAgICAgICAgICBpblN3aXRjaDogZmFsc2UsXG5cdCAgICAgICAgICAgIGxhYmVsU2V0OiB7fSxcblx0ICAgICAgICAgICAgc3RyaWN0OiBmYWxzZVxuXHQgICAgICAgIH07XG5cdCAgICAgICAgdGhpcy50b2tlbnMgPSBbXTtcblx0ICAgICAgICB0aGlzLnN0YXJ0TWFya2VyID0ge1xuXHQgICAgICAgICAgICBpbmRleDogMCxcblx0ICAgICAgICAgICAgbGluZTogdGhpcy5zY2FubmVyLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgIGNvbHVtbjogMFxuXHQgICAgICAgIH07XG5cdCAgICAgICAgdGhpcy5sYXN0TWFya2VyID0ge1xuXHQgICAgICAgICAgICBpbmRleDogMCxcblx0ICAgICAgICAgICAgbGluZTogdGhpcy5zY2FubmVyLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgIGNvbHVtbjogMFxuXHQgICAgICAgIH07XG5cdCAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICB0aGlzLmxhc3RNYXJrZXIgPSB7XG5cdCAgICAgICAgICAgIGluZGV4OiB0aGlzLnNjYW5uZXIuaW5kZXgsXG5cdCAgICAgICAgICAgIGxpbmU6IHRoaXMuc2Nhbm5lci5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICBjb2x1bW46IHRoaXMuc2Nhbm5lci5pbmRleCAtIHRoaXMuc2Nhbm5lci5saW5lU3RhcnRcblx0ICAgICAgICB9O1xuXHQgICAgfVxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS50aHJvd0Vycm9yID0gZnVuY3Rpb24gKG1lc3NhZ2VGb3JtYXQpIHtcblx0ICAgICAgICB2YXIgdmFsdWVzID0gW107XG5cdCAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcblx0ICAgICAgICAgICAgdmFsdWVzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cdCAgICAgICAgdmFyIG1zZyA9IG1lc3NhZ2VGb3JtYXQucmVwbGFjZSgvJShcXGQpL2csIGZ1bmN0aW9uICh3aG9sZSwgaWR4KSB7XG5cdCAgICAgICAgICAgIGFzc2VydF8xLmFzc2VydChpZHggPCBhcmdzLmxlbmd0aCwgJ01lc3NhZ2UgcmVmZXJlbmNlIG11c3QgYmUgaW4gcmFuZ2UnKTtcblx0ICAgICAgICAgICAgcmV0dXJuIGFyZ3NbaWR4XTtcblx0ICAgICAgICB9KTtcblx0ICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmxhc3RNYXJrZXIuaW5kZXg7XG5cdCAgICAgICAgdmFyIGxpbmUgPSB0aGlzLmxhc3RNYXJrZXIubGluZTtcblx0ICAgICAgICB2YXIgY29sdW1uID0gdGhpcy5sYXN0TWFya2VyLmNvbHVtbiArIDE7XG5cdCAgICAgICAgdGhyb3cgdGhpcy5lcnJvckhhbmRsZXIuY3JlYXRlRXJyb3IoaW5kZXgsIGxpbmUsIGNvbHVtbiwgbXNnKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnRvbGVyYXRlRXJyb3IgPSBmdW5jdGlvbiAobWVzc2FnZUZvcm1hdCkge1xuXHQgICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcblx0ICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuXHQgICAgICAgICAgICB2YWx1ZXNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblx0ICAgICAgICB2YXIgbXNnID0gbWVzc2FnZUZvcm1hdC5yZXBsYWNlKC8lKFxcZCkvZywgZnVuY3Rpb24gKHdob2xlLCBpZHgpIHtcblx0ICAgICAgICAgICAgYXNzZXJ0XzEuYXNzZXJ0KGlkeCA8IGFyZ3MubGVuZ3RoLCAnTWVzc2FnZSByZWZlcmVuY2UgbXVzdCBiZSBpbiByYW5nZScpO1xuXHQgICAgICAgICAgICByZXR1cm4gYXJnc1tpZHhdO1xuXHQgICAgICAgIH0pO1xuXHQgICAgICAgIHZhciBpbmRleCA9IHRoaXMubGFzdE1hcmtlci5pbmRleDtcblx0ICAgICAgICB2YXIgbGluZSA9IHRoaXMuc2Nhbm5lci5saW5lTnVtYmVyO1xuXHQgICAgICAgIHZhciBjb2x1bW4gPSB0aGlzLmxhc3RNYXJrZXIuY29sdW1uICsgMTtcblx0ICAgICAgICB0aGlzLmVycm9ySGFuZGxlci50b2xlcmF0ZUVycm9yKGluZGV4LCBsaW5lLCBjb2x1bW4sIG1zZyk7XG5cdCAgICB9O1xuXHQgICAgLy8gVGhyb3cgYW4gZXhjZXB0aW9uIGJlY2F1c2Ugb2YgdGhlIHRva2VuLlxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS51bmV4cGVjdGVkVG9rZW5FcnJvciA9IGZ1bmN0aW9uICh0b2tlbiwgbWVzc2FnZSkge1xuXHQgICAgICAgIHZhciBtc2cgPSBtZXNzYWdlIHx8IG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW5leHBlY3RlZFRva2VuO1xuXHQgICAgICAgIHZhciB2YWx1ZTtcblx0ICAgICAgICBpZiAodG9rZW4pIHtcblx0ICAgICAgICAgICAgaWYgKCFtZXNzYWdlKSB7XG5cdCAgICAgICAgICAgICAgICBtc2cgPSAodG9rZW4udHlwZSA9PT0gMiAvKiBFT0YgKi8pID8gbWVzc2FnZXNfMS5NZXNzYWdlcy5VbmV4cGVjdGVkRU9TIDpcblx0ICAgICAgICAgICAgICAgICAgICAodG9rZW4udHlwZSA9PT0gMyAvKiBJZGVudGlmaWVyICovKSA/IG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW5leHBlY3RlZElkZW50aWZpZXIgOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAodG9rZW4udHlwZSA9PT0gNiAvKiBOdW1lcmljTGl0ZXJhbCAqLykgPyBtZXNzYWdlc18xLk1lc3NhZ2VzLlVuZXhwZWN0ZWROdW1iZXIgOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRva2VuLnR5cGUgPT09IDggLyogU3RyaW5nTGl0ZXJhbCAqLykgPyBtZXNzYWdlc18xLk1lc3NhZ2VzLlVuZXhwZWN0ZWRTdHJpbmcgOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0b2tlbi50eXBlID09PSAxMCAvKiBUZW1wbGF0ZSAqLykgPyBtZXNzYWdlc18xLk1lc3NhZ2VzLlVuZXhwZWN0ZWRUZW1wbGF0ZSA6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW5leHBlY3RlZFRva2VuO1xuXHQgICAgICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IDQgLyogS2V5d29yZCAqLykge1xuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5uZXIuaXNGdXR1cmVSZXNlcnZlZFdvcmQodG9rZW4udmFsdWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIG1zZyA9IG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW5leHBlY3RlZFJlc2VydmVkO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNvbnRleHQuc3RyaWN0ICYmIHRoaXMuc2Nhbm5lci5pc1N0cmljdE1vZGVSZXNlcnZlZFdvcmQodG9rZW4udmFsdWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIG1zZyA9IG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0UmVzZXJ2ZWRXb3JkO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YWx1ZSA9IHRva2VuLnZhbHVlO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdmFsdWUgPSAnSUxMRUdBTCc7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKCclMCcsIHZhbHVlKTtcblx0ICAgICAgICBpZiAodG9rZW4gJiYgdHlwZW9mIHRva2VuLmxpbmVOdW1iZXIgPT09ICdudW1iZXInKSB7XG5cdCAgICAgICAgICAgIHZhciBpbmRleCA9IHRva2VuLnN0YXJ0O1xuXHQgICAgICAgICAgICB2YXIgbGluZSA9IHRva2VuLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgICAgIHZhciBsYXN0TWFya2VyTGluZVN0YXJ0ID0gdGhpcy5sYXN0TWFya2VyLmluZGV4IC0gdGhpcy5sYXN0TWFya2VyLmNvbHVtbjtcblx0ICAgICAgICAgICAgdmFyIGNvbHVtbiA9IHRva2VuLnN0YXJ0IC0gbGFzdE1hcmtlckxpbmVTdGFydCArIDE7XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLmVycm9ySGFuZGxlci5jcmVhdGVFcnJvcihpbmRleCwgbGluZSwgY29sdW1uLCBtc2cpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5sYXN0TWFya2VyLmluZGV4O1xuXHQgICAgICAgICAgICB2YXIgbGluZSA9IHRoaXMubGFzdE1hcmtlci5saW5lO1xuXHQgICAgICAgICAgICB2YXIgY29sdW1uID0gdGhpcy5sYXN0TWFya2VyLmNvbHVtbiArIDE7XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLmVycm9ySGFuZGxlci5jcmVhdGVFcnJvcihpbmRleCwgbGluZSwgY29sdW1uLCBtc2cpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnRocm93VW5leHBlY3RlZFRva2VuID0gZnVuY3Rpb24gKHRva2VuLCBtZXNzYWdlKSB7XG5cdCAgICAgICAgdGhyb3cgdGhpcy51bmV4cGVjdGVkVG9rZW5FcnJvcih0b2tlbiwgbWVzc2FnZSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS50b2xlcmF0ZVVuZXhwZWN0ZWRUb2tlbiA9IGZ1bmN0aW9uICh0b2tlbiwgbWVzc2FnZSkge1xuXHQgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyLnRvbGVyYXRlKHRoaXMudW5leHBlY3RlZFRva2VuRXJyb3IodG9rZW4sIG1lc3NhZ2UpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLmNvbGxlY3RDb21tZW50cyA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBpZiAoIXRoaXMuY29uZmlnLmNvbW1lbnQpIHtcblx0ICAgICAgICAgICAgdGhpcy5zY2FubmVyLnNjYW5Db21tZW50cygpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdmFyIGNvbW1lbnRzID0gdGhpcy5zY2FubmVyLnNjYW5Db21tZW50cygpO1xuXHQgICAgICAgICAgICBpZiAoY29tbWVudHMubGVuZ3RoID4gMCAmJiB0aGlzLmRlbGVnYXRlKSB7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbW1lbnRzLmxlbmd0aDsgKytpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBjb21tZW50c1tpXTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHZvaWQgMDtcblx0ICAgICAgICAgICAgICAgICAgICBub2RlID0ge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBlLm11bHRpTGluZSA/ICdCbG9ja0NvbW1lbnQnIDogJ0xpbmVDb21tZW50Jyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc2Nhbm5lci5zb3VyY2Uuc2xpY2UoZS5zbGljZVswXSwgZS5zbGljZVsxXSlcblx0ICAgICAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5yYW5nZSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJhbmdlID0gZS5yYW5nZTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmxvYykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmxvYyA9IGUubG9jO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lOiBlLmxvYy5zdGFydC5saW5lLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBlLmxvYy5zdGFydC5jb2x1bW4sXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IGUucmFuZ2VbMF1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lOiBlLmxvYy5lbmQubGluZSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogZS5sb2MuZW5kLmNvbHVtbixcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldDogZS5yYW5nZVsxXVxuXHQgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlKG5vZGUsIG1ldGFkYXRhKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICAvLyBGcm9tIGludGVybmFsIHJlcHJlc2VudGF0aW9uIHRvIGFuIGV4dGVybmFsIHN0cnVjdHVyZVxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5nZXRUb2tlblJhdyA9IGZ1bmN0aW9uICh0b2tlbikge1xuXHQgICAgICAgIHJldHVybiB0aGlzLnNjYW5uZXIuc291cmNlLnNsaWNlKHRva2VuLnN0YXJ0LCB0b2tlbi5lbmQpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUuY29udmVydFRva2VuID0gZnVuY3Rpb24gKHRva2VuKSB7XG5cdCAgICAgICAgdmFyIHQgPSB7XG5cdCAgICAgICAgICAgIHR5cGU6IHRva2VuXzEuVG9rZW5OYW1lW3Rva2VuLnR5cGVdLFxuXHQgICAgICAgICAgICB2YWx1ZTogdGhpcy5nZXRUb2tlblJhdyh0b2tlbilcblx0ICAgICAgICB9O1xuXHQgICAgICAgIGlmICh0aGlzLmNvbmZpZy5yYW5nZSkge1xuXHQgICAgICAgICAgICB0LnJhbmdlID0gW3Rva2VuLnN0YXJ0LCB0b2tlbi5lbmRdO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodGhpcy5jb25maWcubG9jKSB7XG5cdCAgICAgICAgICAgIHQubG9jID0ge1xuXHQgICAgICAgICAgICAgICAgc3RhcnQ6IHtcblx0ICAgICAgICAgICAgICAgICAgICBsaW5lOiB0aGlzLnN0YXJ0TWFya2VyLmxpbmUsXG5cdCAgICAgICAgICAgICAgICAgICAgY29sdW1uOiB0aGlzLnN0YXJ0TWFya2VyLmNvbHVtblxuXHQgICAgICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgICAgIGVuZDoge1xuXHQgICAgICAgICAgICAgICAgICAgIGxpbmU6IHRoaXMuc2Nhbm5lci5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogdGhpcy5zY2FubmVyLmluZGV4IC0gdGhpcy5zY2FubmVyLmxpbmVTdGFydFxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gOSAvKiBSZWd1bGFyRXhwcmVzc2lvbiAqLykge1xuXHQgICAgICAgICAgICB2YXIgcGF0dGVybiA9IHRva2VuLnBhdHRlcm47XG5cdCAgICAgICAgICAgIHZhciBmbGFncyA9IHRva2VuLmZsYWdzO1xuXHQgICAgICAgICAgICB0LnJlZ2V4ID0geyBwYXR0ZXJuOiBwYXR0ZXJuLCBmbGFnczogZmxhZ3MgfTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHQ7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5uZXh0VG9rZW4gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIHRva2VuID0gdGhpcy5sb29rYWhlYWQ7XG5cdCAgICAgICAgdGhpcy5sYXN0TWFya2VyLmluZGV4ID0gdGhpcy5zY2FubmVyLmluZGV4O1xuXHQgICAgICAgIHRoaXMubGFzdE1hcmtlci5saW5lID0gdGhpcy5zY2FubmVyLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgdGhpcy5sYXN0TWFya2VyLmNvbHVtbiA9IHRoaXMuc2Nhbm5lci5pbmRleCAtIHRoaXMuc2Nhbm5lci5saW5lU3RhcnQ7XG5cdCAgICAgICAgdGhpcy5jb2xsZWN0Q29tbWVudHMoKTtcblx0ICAgICAgICBpZiAodGhpcy5zY2FubmVyLmluZGV4ICE9PSB0aGlzLnN0YXJ0TWFya2VyLmluZGV4KSB7XG5cdCAgICAgICAgICAgIHRoaXMuc3RhcnRNYXJrZXIuaW5kZXggPSB0aGlzLnNjYW5uZXIuaW5kZXg7XG5cdCAgICAgICAgICAgIHRoaXMuc3RhcnRNYXJrZXIubGluZSA9IHRoaXMuc2Nhbm5lci5saW5lTnVtYmVyO1xuXHQgICAgICAgICAgICB0aGlzLnN0YXJ0TWFya2VyLmNvbHVtbiA9IHRoaXMuc2Nhbm5lci5pbmRleCAtIHRoaXMuc2Nhbm5lci5saW5lU3RhcnQ7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBuZXh0ID0gdGhpcy5zY2FubmVyLmxleCgpO1xuXHQgICAgICAgIHRoaXMuaGFzTGluZVRlcm1pbmF0b3IgPSAodG9rZW4ubGluZU51bWJlciAhPT0gbmV4dC5saW5lTnVtYmVyKTtcblx0ICAgICAgICBpZiAobmV4dCAmJiB0aGlzLmNvbnRleHQuc3RyaWN0ICYmIG5leHQudHlwZSA9PT0gMyAvKiBJZGVudGlmaWVyICovKSB7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLnNjYW5uZXIuaXNTdHJpY3RNb2RlUmVzZXJ2ZWRXb3JkKG5leHQudmFsdWUpKSB7XG5cdCAgICAgICAgICAgICAgICBuZXh0LnR5cGUgPSA0IC8qIEtleXdvcmQgKi87XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5sb29rYWhlYWQgPSBuZXh0O1xuXHQgICAgICAgIGlmICh0aGlzLmNvbmZpZy50b2tlbnMgJiYgbmV4dC50eXBlICE9PSAyIC8qIEVPRiAqLykge1xuXHQgICAgICAgICAgICB0aGlzLnRva2Vucy5wdXNoKHRoaXMuY29udmVydFRva2VuKG5leHQpKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRva2VuO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUubmV4dFJlZ2V4VG9rZW4gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdGhpcy5jb2xsZWN0Q29tbWVudHMoKTtcblx0ICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLnNjYW5uZXIuc2NhblJlZ0V4cCgpO1xuXHQgICAgICAgIGlmICh0aGlzLmNvbmZpZy50b2tlbnMpIHtcblx0ICAgICAgICAgICAgLy8gUG9wIHRoZSBwcmV2aW91cyB0b2tlbiwgJy8nIG9yICcvPSdcblx0ICAgICAgICAgICAgLy8gVGhpcyBpcyBhZGRlZCBmcm9tIHRoZSBsb29rYWhlYWQgdG9rZW4uXG5cdCAgICAgICAgICAgIHRoaXMudG9rZW5zLnBvcCgpO1xuXHQgICAgICAgICAgICB0aGlzLnRva2Vucy5wdXNoKHRoaXMuY29udmVydFRva2VuKHRva2VuKSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIC8vIFByaW1lIHRoZSBuZXh0IGxvb2thaGVhZC5cblx0ICAgICAgICB0aGlzLmxvb2thaGVhZCA9IHRva2VuO1xuXHQgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgcmV0dXJuIHRva2VuO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUuY3JlYXRlTm9kZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICBpbmRleDogdGhpcy5zdGFydE1hcmtlci5pbmRleCxcblx0ICAgICAgICAgICAgbGluZTogdGhpcy5zdGFydE1hcmtlci5saW5lLFxuXHQgICAgICAgICAgICBjb2x1bW46IHRoaXMuc3RhcnRNYXJrZXIuY29sdW1uXG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnN0YXJ0Tm9kZSA9IGZ1bmN0aW9uICh0b2tlbiwgbGFzdExpbmVTdGFydCkge1xuXHQgICAgICAgIGlmIChsYXN0TGluZVN0YXJ0ID09PSB2b2lkIDApIHsgbGFzdExpbmVTdGFydCA9IDA7IH1cblx0ICAgICAgICB2YXIgY29sdW1uID0gdG9rZW4uc3RhcnQgLSB0b2tlbi5saW5lU3RhcnQ7XG5cdCAgICAgICAgdmFyIGxpbmUgPSB0b2tlbi5saW5lTnVtYmVyO1xuXHQgICAgICAgIGlmIChjb2x1bW4gPCAwKSB7XG5cdCAgICAgICAgICAgIGNvbHVtbiArPSBsYXN0TGluZVN0YXJ0O1xuXHQgICAgICAgICAgICBsaW5lLS07XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIGluZGV4OiB0b2tlbi5zdGFydCxcblx0ICAgICAgICAgICAgbGluZTogbGluZSxcblx0ICAgICAgICAgICAgY29sdW1uOiBjb2x1bW5cblx0ICAgICAgICB9O1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUuZmluYWxpemUgPSBmdW5jdGlvbiAobWFya2VyLCBub2RlKSB7XG5cdCAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJhbmdlKSB7XG5cdCAgICAgICAgICAgIG5vZGUucmFuZ2UgPSBbbWFya2VyLmluZGV4LCB0aGlzLmxhc3RNYXJrZXIuaW5kZXhdO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodGhpcy5jb25maWcubG9jKSB7XG5cdCAgICAgICAgICAgIG5vZGUubG9jID0ge1xuXHQgICAgICAgICAgICAgICAgc3RhcnQ6IHtcblx0ICAgICAgICAgICAgICAgICAgICBsaW5lOiBtYXJrZXIubGluZSxcblx0ICAgICAgICAgICAgICAgICAgICBjb2x1bW46IG1hcmtlci5jb2x1bW4sXG5cdCAgICAgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICAgICAgZW5kOiB7XG5cdCAgICAgICAgICAgICAgICAgICAgbGluZTogdGhpcy5sYXN0TWFya2VyLmxpbmUsXG5cdCAgICAgICAgICAgICAgICAgICAgY29sdW1uOiB0aGlzLmxhc3RNYXJrZXIuY29sdW1uXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5zb3VyY2UpIHtcblx0ICAgICAgICAgICAgICAgIG5vZGUubG9jLnNvdXJjZSA9IHRoaXMuY29uZmlnLnNvdXJjZTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZSkge1xuXHQgICAgICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XG5cdCAgICAgICAgICAgICAgICBzdGFydDoge1xuXHQgICAgICAgICAgICAgICAgICAgIGxpbmU6IG1hcmtlci5saW5lLFxuXHQgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogbWFya2VyLmNvbHVtbixcblx0ICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IG1hcmtlci5pbmRleFxuXHQgICAgICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgICAgIGVuZDoge1xuXHQgICAgICAgICAgICAgICAgICAgIGxpbmU6IHRoaXMubGFzdE1hcmtlci5saW5lLFxuXHQgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogdGhpcy5sYXN0TWFya2VyLmNvbHVtbixcblx0ICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IHRoaXMubGFzdE1hcmtlci5pbmRleFxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICB0aGlzLmRlbGVnYXRlKG5vZGUsIG1ldGFkYXRhKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIG5vZGU7XG5cdCAgICB9O1xuXHQgICAgLy8gRXhwZWN0IHRoZSBuZXh0IHRva2VuIHRvIG1hdGNoIHRoZSBzcGVjaWZpZWQgcHVuY3R1YXRvci5cblx0ICAgIC8vIElmIG5vdCwgYW4gZXhjZXB0aW9uIHdpbGwgYmUgdGhyb3duLlxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5leHBlY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgIGlmICh0b2tlbi50eXBlICE9PSA3IC8qIFB1bmN0dWF0b3IgKi8gfHwgdG9rZW4udmFsdWUgIT09IHZhbHVlKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odG9rZW4pO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICAvLyBRdWlldGx5IGV4cGVjdCBhIGNvbW1hIHdoZW4gaW4gdG9sZXJhbnQgbW9kZSwgb3RoZXJ3aXNlIGRlbGVnYXRlcyB0byBleHBlY3QoKS5cblx0ICAgIFBhcnNlci5wcm90b3R5cGUuZXhwZWN0Q29tbWFTZXBhcmF0b3IgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgaWYgKHRoaXMuY29uZmlnLnRvbGVyYW50KSB7XG5cdCAgICAgICAgICAgIHZhciB0b2tlbiA9IHRoaXMubG9va2FoZWFkO1xuXHQgICAgICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gNyAvKiBQdW5jdHVhdG9yICovICYmIHRva2VuLnZhbHVlID09PSAnLCcpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gNyAvKiBQdW5jdHVhdG9yICovICYmIHRva2VuLnZhbHVlID09PSAnOycpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRva2VuKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4odG9rZW4sIG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW5leHBlY3RlZFRva2VuKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdGhpcy5leHBlY3QoJywnKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgLy8gRXhwZWN0IHRoZSBuZXh0IHRva2VuIHRvIG1hdGNoIHRoZSBzcGVjaWZpZWQga2V5d29yZC5cblx0ICAgIC8vIElmIG5vdCwgYW4gZXhjZXB0aW9uIHdpbGwgYmUgdGhyb3duLlxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5leHBlY3RLZXl3b3JkID0gZnVuY3Rpb24gKGtleXdvcmQpIHtcblx0ICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgIGlmICh0b2tlbi50eXBlICE9PSA0IC8qIEtleXdvcmQgKi8gfHwgdG9rZW4udmFsdWUgIT09IGtleXdvcmQpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0b2tlbik7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIC8vIFJldHVybiB0cnVlIGlmIHRoZSBuZXh0IHRva2VuIG1hdGNoZXMgdGhlIHNwZWNpZmllZCBwdW5jdHVhdG9yLlxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLmxvb2thaGVhZC50eXBlID09PSA3IC8qIFB1bmN0dWF0b3IgKi8gJiYgdGhpcy5sb29rYWhlYWQudmFsdWUgPT09IHZhbHVlO1xuXHQgICAgfTtcblx0ICAgIC8vIFJldHVybiB0cnVlIGlmIHRoZSBuZXh0IHRva2VuIG1hdGNoZXMgdGhlIHNwZWNpZmllZCBrZXl3b3JkXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLm1hdGNoS2V5d29yZCA9IGZ1bmN0aW9uIChrZXl3b3JkKSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMubG9va2FoZWFkLnR5cGUgPT09IDQgLyogS2V5d29yZCAqLyAmJiB0aGlzLmxvb2thaGVhZC52YWx1ZSA9PT0ga2V5d29yZDtcblx0ICAgIH07XG5cdCAgICAvLyBSZXR1cm4gdHJ1ZSBpZiB0aGUgbmV4dCB0b2tlbiBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgY29udGV4dHVhbCBrZXl3b3JkXG5cdCAgICAvLyAod2hlcmUgYW4gaWRlbnRpZmllciBpcyBzb21ldGltZXMgYSBrZXl3b3JkIGRlcGVuZGluZyBvbiB0aGUgY29udGV4dClcblx0ICAgIFBhcnNlci5wcm90b3R5cGUubWF0Y2hDb250ZXh0dWFsS2V5d29yZCA9IGZ1bmN0aW9uIChrZXl3b3JkKSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMubG9va2FoZWFkLnR5cGUgPT09IDMgLyogSWRlbnRpZmllciAqLyAmJiB0aGlzLmxvb2thaGVhZC52YWx1ZSA9PT0ga2V5d29yZDtcblx0ICAgIH07XG5cdCAgICAvLyBSZXR1cm4gdHJ1ZSBpZiB0aGUgbmV4dCB0b2tlbiBpcyBhbiBhc3NpZ25tZW50IG9wZXJhdG9yXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLm1hdGNoQXNzaWduID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmICh0aGlzLmxvb2thaGVhZC50eXBlICE9PSA3IC8qIFB1bmN0dWF0b3IgKi8pIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgb3AgPSB0aGlzLmxvb2thaGVhZC52YWx1ZTtcblx0ICAgICAgICByZXR1cm4gb3AgPT09ICc9JyB8fFxuXHQgICAgICAgICAgICBvcCA9PT0gJyo9JyB8fFxuXHQgICAgICAgICAgICBvcCA9PT0gJyoqPScgfHxcblx0ICAgICAgICAgICAgb3AgPT09ICcvPScgfHxcblx0ICAgICAgICAgICAgb3AgPT09ICclPScgfHxcblx0ICAgICAgICAgICAgb3AgPT09ICcrPScgfHxcblx0ICAgICAgICAgICAgb3AgPT09ICctPScgfHxcblx0ICAgICAgICAgICAgb3AgPT09ICc8PD0nIHx8XG5cdCAgICAgICAgICAgIG9wID09PSAnPj49JyB8fFxuXHQgICAgICAgICAgICBvcCA9PT0gJz4+Pj0nIHx8XG5cdCAgICAgICAgICAgIG9wID09PSAnJj0nIHx8XG5cdCAgICAgICAgICAgIG9wID09PSAnXj0nIHx8XG5cdCAgICAgICAgICAgIG9wID09PSAnfD0nO1xuXHQgICAgfTtcblx0ICAgIC8vIENvdmVyIGdyYW1tYXIgc3VwcG9ydC5cblx0ICAgIC8vXG5cdCAgICAvLyBXaGVuIGFuIGFzc2lnbm1lbnQgZXhwcmVzc2lvbiBwb3NpdGlvbiBzdGFydHMgd2l0aCBhbiBsZWZ0IHBhcmVudGhlc2lzLCB0aGUgZGV0ZXJtaW5hdGlvbiBvZiB0aGUgdHlwZVxuXHQgICAgLy8gb2YgdGhlIHN5bnRheCBpcyB0byBiZSBkZWZlcnJlZCBhcmJpdHJhcmlseSBsb25nIHVudGlsIHRoZSBlbmQgb2YgdGhlIHBhcmVudGhlc2VzIHBhaXIgKHBsdXMgYSBsb29rYWhlYWQpXG5cdCAgICAvLyBvciB0aGUgZmlyc3QgY29tbWEuIFRoaXMgc2l0dWF0aW9uIGFsc28gZGVmZXJzIHRoZSBkZXRlcm1pbmF0aW9uIG9mIGFsbCB0aGUgZXhwcmVzc2lvbnMgbmVzdGVkIGluIHRoZSBwYWlyLlxuXHQgICAgLy9cblx0ICAgIC8vIFRoZXJlIGFyZSB0aHJlZSBwcm9kdWN0aW9ucyB0aGF0IGNhbiBiZSBwYXJzZWQgaW4gYSBwYXJlbnRoZXNlcyBwYWlyIHRoYXQgbmVlZHMgdG8gYmUgZGV0ZXJtaW5lZFxuXHQgICAgLy8gYWZ0ZXIgdGhlIG91dGVybW9zdCBwYWlyIGlzIGNsb3NlZC4gVGhleSBhcmU6XG5cdCAgICAvL1xuXHQgICAgLy8gICAxLiBBc3NpZ25tZW50RXhwcmVzc2lvblxuXHQgICAgLy8gICAyLiBCaW5kaW5nRWxlbWVudHNcblx0ICAgIC8vICAgMy4gQXNzaWdubWVudFRhcmdldHNcblx0ICAgIC8vXG5cdCAgICAvLyBJbiBvcmRlciB0byBhdm9pZCBleHBvbmVudGlhbCBiYWNrdHJhY2tpbmcsIHdlIHVzZSB0d28gZmxhZ3MgdG8gZGVub3RlIGlmIHRoZSBwcm9kdWN0aW9uIGNhbiBiZVxuXHQgICAgLy8gYmluZGluZyBlbGVtZW50IG9yIGFzc2lnbm1lbnQgdGFyZ2V0LlxuXHQgICAgLy9cblx0ICAgIC8vIFRoZSB0aHJlZSBwcm9kdWN0aW9ucyBoYXZlIHRoZSByZWxhdGlvbnNoaXA6XG5cdCAgICAvL1xuXHQgICAgLy8gICBCaW5kaW5nRWxlbWVudHMg4oqGIEFzc2lnbm1lbnRUYXJnZXRzIOKKhiBBc3NpZ25tZW50RXhwcmVzc2lvblxuXHQgICAgLy9cblx0ICAgIC8vIHdpdGggYSBzaW5nbGUgZXhjZXB0aW9uIHRoYXQgQ292ZXJJbml0aWFsaXplZE5hbWUgd2hlbiB1c2VkIGRpcmVjdGx5IGluIGFuIEV4cHJlc3Npb24sIGdlbmVyYXRlc1xuXHQgICAgLy8gYW4gZWFybHkgZXJyb3IuIFRoZXJlZm9yZSwgd2UgbmVlZCB0aGUgdGhpcmQgc3RhdGUsIGZpcnN0Q292ZXJJbml0aWFsaXplZE5hbWVFcnJvciwgdG8gdHJhY2sgdGhlXG5cdCAgICAvLyBmaXJzdCB1c2FnZSBvZiBDb3ZlckluaXRpYWxpemVkTmFtZSBhbmQgcmVwb3J0IGl0IHdoZW4gd2UgcmVhY2hlZCB0aGUgZW5kIG9mIHRoZSBwYXJlbnRoZXNlcyBwYWlyLlxuXHQgICAgLy9cblx0ICAgIC8vIGlzb2xhdGVDb3ZlckdyYW1tYXIgZnVuY3Rpb24gcnVucyB0aGUgZ2l2ZW4gcGFyc2VyIGZ1bmN0aW9uIHdpdGggYSBuZXcgY292ZXIgZ3JhbW1hciBjb250ZXh0LCBhbmQgaXQgZG9lcyBub3Rcblx0ICAgIC8vIGVmZmVjdCB0aGUgY3VycmVudCBmbGFncy4gVGhpcyBtZWFucyB0aGUgcHJvZHVjdGlvbiB0aGUgcGFyc2VyIHBhcnNlcyBpcyBvbmx5IHVzZWQgYXMgYW4gZXhwcmVzc2lvbi4gVGhlcmVmb3JlXG5cdCAgICAvLyB0aGUgQ292ZXJJbml0aWFsaXplZE5hbWUgY2hlY2sgaXMgY29uZHVjdGVkLlxuXHQgICAgLy9cblx0ICAgIC8vIGluaGVyaXRDb3ZlckdyYW1tYXIgZnVuY3Rpb24gcnVucyB0aGUgZ2l2ZW4gcGFyc2UgZnVuY3Rpb24gd2l0aCBhIG5ldyBjb3ZlciBncmFtbWFyIGNvbnRleHQsIGFuZCBpdCBwcm9wYWdhdGVzXG5cdCAgICAvLyB0aGUgZmxhZ3Mgb3V0c2lkZSBvZiB0aGUgcGFyc2VyLiBUaGlzIG1lYW5zIHRoZSBwcm9kdWN0aW9uIHRoZSBwYXJzZXIgcGFyc2VzIGlzIHVzZWQgYXMgYSBwYXJ0IG9mIGEgcG90ZW50aWFsXG5cdCAgICAvLyBwYXR0ZXJuLiBUaGUgQ292ZXJJbml0aWFsaXplZE5hbWUgY2hlY2sgaXMgZGVmZXJyZWQuXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLmlzb2xhdGVDb3ZlckdyYW1tYXIgPSBmdW5jdGlvbiAocGFyc2VGdW5jdGlvbikge1xuXHQgICAgICAgIHZhciBwcmV2aW91c0lzQmluZGluZ0VsZW1lbnQgPSB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudDtcblx0ICAgICAgICB2YXIgcHJldmlvdXNJc0Fzc2lnbm1lbnRUYXJnZXQgPSB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0O1xuXHQgICAgICAgIHZhciBwcmV2aW91c0ZpcnN0Q292ZXJJbml0aWFsaXplZE5hbWVFcnJvciA9IHRoaXMuY29udGV4dC5maXJzdENvdmVySW5pdGlhbGl6ZWROYW1lRXJyb3I7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSB0cnVlO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSB0cnVlO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5maXJzdENvdmVySW5pdGlhbGl6ZWROYW1lRXJyb3IgPSBudWxsO1xuXHQgICAgICAgIHZhciByZXN1bHQgPSBwYXJzZUZ1bmN0aW9uLmNhbGwodGhpcyk7XG5cdCAgICAgICAgaWYgKHRoaXMuY29udGV4dC5maXJzdENvdmVySW5pdGlhbGl6ZWROYW1lRXJyb3IgIT09IG51bGwpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0aGlzLmNvbnRleHQuZmlyc3RDb3ZlckluaXRpYWxpemVkTmFtZUVycm9yKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSBwcmV2aW91c0lzQmluZGluZ0VsZW1lbnQ7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCA9IHByZXZpb3VzSXNBc3NpZ25tZW50VGFyZ2V0O1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5maXJzdENvdmVySW5pdGlhbGl6ZWROYW1lRXJyb3IgPSBwcmV2aW91c0ZpcnN0Q292ZXJJbml0aWFsaXplZE5hbWVFcnJvcjtcblx0ICAgICAgICByZXR1cm4gcmVzdWx0O1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUuaW5oZXJpdENvdmVyR3JhbW1hciA9IGZ1bmN0aW9uIChwYXJzZUZ1bmN0aW9uKSB7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzSXNCaW5kaW5nRWxlbWVudCA9IHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50O1xuXHQgICAgICAgIHZhciBwcmV2aW91c0lzQXNzaWdubWVudFRhcmdldCA9IHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQ7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzRmlyc3RDb3ZlckluaXRpYWxpemVkTmFtZUVycm9yID0gdGhpcy5jb250ZXh0LmZpcnN0Q292ZXJJbml0aWFsaXplZE5hbWVFcnJvcjtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IHRydWU7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCA9IHRydWU7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmZpcnN0Q292ZXJJbml0aWFsaXplZE5hbWVFcnJvciA9IG51bGw7XG5cdCAgICAgICAgdmFyIHJlc3VsdCA9IHBhcnNlRnVuY3Rpb24uY2FsbCh0aGlzKTtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ICYmIHByZXZpb3VzSXNCaW5kaW5nRWxlbWVudDtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0ID0gdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCAmJiBwcmV2aW91c0lzQXNzaWdubWVudFRhcmdldDtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuZmlyc3RDb3ZlckluaXRpYWxpemVkTmFtZUVycm9yID0gcHJldmlvdXNGaXJzdENvdmVySW5pdGlhbGl6ZWROYW1lRXJyb3IgfHwgdGhpcy5jb250ZXh0LmZpcnN0Q292ZXJJbml0aWFsaXplZE5hbWVFcnJvcjtcblx0ICAgICAgICByZXR1cm4gcmVzdWx0O1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUuY29uc3VtZVNlbWljb2xvbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaCgnOycpKSB7XG5cdCAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2UgaWYgKCF0aGlzLmhhc0xpbmVUZXJtaW5hdG9yKSB7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLmxvb2thaGVhZC50eXBlICE9PSAyIC8qIEVPRiAqLyAmJiAhdGhpcy5tYXRjaCgnfScpKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRoaXMubG9va2FoZWFkKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB0aGlzLmxhc3RNYXJrZXIuaW5kZXggPSB0aGlzLnN0YXJ0TWFya2VyLmluZGV4O1xuXHQgICAgICAgICAgICB0aGlzLmxhc3RNYXJrZXIubGluZSA9IHRoaXMuc3RhcnRNYXJrZXIubGluZTtcblx0ICAgICAgICAgICAgdGhpcy5sYXN0TWFya2VyLmNvbHVtbiA9IHRoaXMuc3RhcnRNYXJrZXIuY29sdW1uO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1wcmltYXJ5LWV4cHJlc3Npb25cblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VQcmltYXJ5RXhwcmVzc2lvbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHZhciBleHByO1xuXHQgICAgICAgIHZhciB0b2tlbiwgcmF3O1xuXHQgICAgICAgIHN3aXRjaCAodGhpcy5sb29rYWhlYWQudHlwZSkge1xuXHQgICAgICAgICAgICBjYXNlIDMgLyogSWRlbnRpZmllciAqLzpcblx0ICAgICAgICAgICAgICAgIGlmICgodGhpcy5jb250ZXh0LmlzTW9kdWxlIHx8IHRoaXMuY29udGV4dC5hd2FpdCkgJiYgdGhpcy5sb29rYWhlYWQudmFsdWUgPT09ICdhd2FpdCcpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRoaXMubG9va2FoZWFkKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLm1hdGNoQXN5bmNGdW5jdGlvbigpID8gdGhpcy5wYXJzZUZ1bmN0aW9uRXhwcmVzc2lvbigpIDogdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5JZGVudGlmaWVyKHRoaXMubmV4dFRva2VuKCkudmFsdWUpKTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlIDYgLyogTnVtZXJpY0xpdGVyYWwgKi86XG5cdCAgICAgICAgICAgIGNhc2UgOCAvKiBTdHJpbmdMaXRlcmFsICovOlxuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QgJiYgdGhpcy5sb29rYWhlYWQub2N0YWwpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRoaXMubG9va2FoZWFkLCBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdE9jdGFsTGl0ZXJhbCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgdG9rZW4gPSB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgcmF3ID0gdGhpcy5nZXRUb2tlblJhdyh0b2tlbik7XG5cdCAgICAgICAgICAgICAgICBleHByID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5MaXRlcmFsKHRva2VuLnZhbHVlLCByYXcpKTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlIDEgLyogQm9vbGVhbkxpdGVyYWwgKi86XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgdG9rZW4gPSB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgcmF3ID0gdGhpcy5nZXRUb2tlblJhdyh0b2tlbik7XG5cdCAgICAgICAgICAgICAgICBleHByID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5MaXRlcmFsKHRva2VuLnZhbHVlID09PSAndHJ1ZScsIHJhdykpO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2UgNSAvKiBOdWxsTGl0ZXJhbCAqLzpcblx0ICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB0b2tlbiA9IHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICByYXcgPSB0aGlzLmdldFRva2VuUmF3KHRva2VuKTtcblx0ICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkxpdGVyYWwobnVsbCwgcmF3KSk7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgY2FzZSAxMCAvKiBUZW1wbGF0ZSAqLzpcblx0ICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLnBhcnNlVGVtcGxhdGVMaXRlcmFsKCk7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgY2FzZSA3IC8qIFB1bmN0dWF0b3IgKi86XG5cdCAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMubG9va2FoZWFkLnZhbHVlKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAnKCc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmluaGVyaXRDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUdyb3VwRXhwcmVzc2lvbik7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1snOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBleHByID0gdGhpcy5pbmhlcml0Q292ZXJHcmFtbWFyKHRoaXMucGFyc2VBcnJheUluaXRpYWxpemVyKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAneyc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmluaGVyaXRDb3ZlckdyYW1tYXIodGhpcy5wYXJzZU9iamVjdEluaXRpYWxpemVyKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAnLyc6XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAnLz0nOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nhbm5lci5pbmRleCA9IHRoaXMuc3RhcnRNYXJrZXIuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuID0gdGhpcy5uZXh0UmVnZXhUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByYXcgPSB0aGlzLmdldFRva2VuUmF3KHRva2VuKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuUmVnZXhMaXRlcmFsKHRva2VuLnJlZ2V4LCByYXcsIHRva2VuLnBhdHRlcm4sIHRva2VuLmZsYWdzKSk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRoaXMubmV4dFRva2VuKCkpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2UgNCAvKiBLZXl3b3JkICovOlxuXHQgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbnRleHQuc3RyaWN0ICYmIHRoaXMuY29udGV4dC5hbGxvd1lpZWxkICYmIHRoaXMubWF0Y2hLZXl3b3JkKCd5aWVsZCcpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMucGFyc2VJZGVudGlmaWVyTmFtZSgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMuY29udGV4dC5zdHJpY3QgJiYgdGhpcy5tYXRjaEtleXdvcmQoJ2xldCcpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuSWRlbnRpZmllcih0aGlzLm5leHRUb2tlbigpLnZhbHVlKSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRjaEtleXdvcmQoJ2Z1bmN0aW9uJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMucGFyc2VGdW5jdGlvbkV4cHJlc3Npb24oKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tYXRjaEtleXdvcmQoJ3RoaXMnKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBleHByID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5UaGlzRXhwcmVzc2lvbigpKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tYXRjaEtleXdvcmQoJ2NsYXNzJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMucGFyc2VDbGFzc0V4cHJlc3Npb24oKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRoaXMubmV4dFRva2VuKCkpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odGhpcy5uZXh0VG9rZW4oKSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBleHByO1xuXHQgICAgfTtcblx0ICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LWluaXRpYWxpemVyXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlU3ByZWFkRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcuLi4nKTtcblx0ICAgICAgICB2YXIgYXJnID0gdGhpcy5pbmhlcml0Q292ZXJHcmFtbWFyKHRoaXMucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbik7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuU3ByZWFkRWxlbWVudChhcmcpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQXJyYXlJbml0aWFsaXplciA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHZhciBlbGVtZW50cyA9IFtdO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCdbJyk7XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLm1hdGNoKCddJykpIHtcblx0ICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2goJywnKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2gobnVsbCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tYXRjaCgnLi4uJykpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5wYXJzZVNwcmVhZEVsZW1lbnQoKTtcblx0ICAgICAgICAgICAgICAgIGlmICghdGhpcy5tYXRjaCgnXScpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJywnKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKHRoaXMuaW5oZXJpdENvdmVyR3JhbW1hcih0aGlzLnBhcnNlQXNzaWdubWVudEV4cHJlc3Npb24pKTtcblx0ICAgICAgICAgICAgICAgIGlmICghdGhpcy5tYXRjaCgnXScpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJywnKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmV4cGVjdCgnXScpO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkFycmF5RXhwcmVzc2lvbihlbGVtZW50cykpO1xuXHQgICAgfTtcblx0ICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC1pbml0aWFsaXplclxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVByb3BlcnR5TWV0aG9kID0gZnVuY3Rpb24gKHBhcmFtcykge1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSBmYWxzZTtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IGZhbHNlO1xuXHQgICAgICAgIHZhciBwcmV2aW91c1N0cmljdCA9IHRoaXMuY29udGV4dC5zdHJpY3Q7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzQWxsb3dTdHJpY3REaXJlY3RpdmUgPSB0aGlzLmNvbnRleHQuYWxsb3dTdHJpY3REaXJlY3RpdmU7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93U3RyaWN0RGlyZWN0aXZlID0gcGFyYW1zLnNpbXBsZTtcblx0ICAgICAgICB2YXIgYm9keSA9IHRoaXMuaXNvbGF0ZUNvdmVyR3JhbW1hcih0aGlzLnBhcnNlRnVuY3Rpb25Tb3VyY2VFbGVtZW50cyk7XG5cdCAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QgJiYgcGFyYW1zLmZpcnN0UmVzdHJpY3RlZCkge1xuXHQgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHBhcmFtcy5maXJzdFJlc3RyaWN0ZWQsIHBhcmFtcy5tZXNzYWdlKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QgJiYgcGFyYW1zLnN0cmljdGVkKSB7XG5cdCAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4ocGFyYW1zLnN0cmljdGVkLCBwYXJhbXMubWVzc2FnZSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMuY29udGV4dC5zdHJpY3QgPSBwcmV2aW91c1N0cmljdDtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dTdHJpY3REaXJlY3RpdmUgPSBwcmV2aW91c0FsbG93U3RyaWN0RGlyZWN0aXZlO1xuXHQgICAgICAgIHJldHVybiBib2R5O1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VQcm9wZXJ0eU1ldGhvZEZ1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBpc0dlbmVyYXRvciA9IGZhbHNlO1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzQWxsb3dZaWVsZCA9IHRoaXMuY29udGV4dC5hbGxvd1lpZWxkO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd1lpZWxkID0gdHJ1ZTtcblx0ICAgICAgICB2YXIgcGFyYW1zID0gdGhpcy5wYXJzZUZvcm1hbFBhcmFtZXRlcnMoKTtcblx0ICAgICAgICB2YXIgbWV0aG9kID0gdGhpcy5wYXJzZVByb3BlcnR5TWV0aG9kKHBhcmFtcyk7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93WWllbGQgPSBwcmV2aW91c0FsbG93WWllbGQ7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuRnVuY3Rpb25FeHByZXNzaW9uKG51bGwsIHBhcmFtcy5wYXJhbXMsIG1ldGhvZCwgaXNHZW5lcmF0b3IpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlUHJvcGVydHlNZXRob2RBc3luY0Z1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzQWxsb3dZaWVsZCA9IHRoaXMuY29udGV4dC5hbGxvd1lpZWxkO1xuXHQgICAgICAgIHZhciBwcmV2aW91c0F3YWl0ID0gdGhpcy5jb250ZXh0LmF3YWl0O1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd1lpZWxkID0gZmFsc2U7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmF3YWl0ID0gdHJ1ZTtcblx0ICAgICAgICB2YXIgcGFyYW1zID0gdGhpcy5wYXJzZUZvcm1hbFBhcmFtZXRlcnMoKTtcblx0ICAgICAgICB2YXIgbWV0aG9kID0gdGhpcy5wYXJzZVByb3BlcnR5TWV0aG9kKHBhcmFtcyk7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93WWllbGQgPSBwcmV2aW91c0FsbG93WWllbGQ7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmF3YWl0ID0gcHJldmlvdXNBd2FpdDtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5Bc3luY0Z1bmN0aW9uRXhwcmVzc2lvbihudWxsLCBwYXJhbXMucGFyYW1zLCBtZXRob2QpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlT2JqZWN0UHJvcGVydHlLZXkgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgIHZhciBrZXk7XG5cdCAgICAgICAgc3dpdGNoICh0b2tlbi50eXBlKSB7XG5cdCAgICAgICAgICAgIGNhc2UgOCAvKiBTdHJpbmdMaXRlcmFsICovOlxuXHQgICAgICAgICAgICBjYXNlIDYgLyogTnVtZXJpY0xpdGVyYWwgKi86XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCAmJiB0b2tlbi5vY3RhbCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4odG9rZW4sIG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0T2N0YWxMaXRlcmFsKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHZhciByYXcgPSB0aGlzLmdldFRva2VuUmF3KHRva2VuKTtcblx0ICAgICAgICAgICAgICAgIGtleSA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuTGl0ZXJhbCh0b2tlbi52YWx1ZSwgcmF3KSk7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgY2FzZSAzIC8qIElkZW50aWZpZXIgKi86XG5cdCAgICAgICAgICAgIGNhc2UgMSAvKiBCb29sZWFuTGl0ZXJhbCAqLzpcblx0ICAgICAgICAgICAgY2FzZSA1IC8qIE51bGxMaXRlcmFsICovOlxuXHQgICAgICAgICAgICBjYXNlIDQgLyogS2V5d29yZCAqLzpcblx0ICAgICAgICAgICAgICAgIGtleSA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuSWRlbnRpZmllcih0b2tlbi52YWx1ZSkpO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2UgNyAvKiBQdW5jdHVhdG9yICovOlxuXHQgICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09PSAnWycpIHtcblx0ICAgICAgICAgICAgICAgICAgICBrZXkgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGVjdCgnXScpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAga2V5ID0gdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0b2tlbik7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgIGtleSA9IHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odG9rZW4pO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4ga2V5O1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUuaXNQcm9wZXJ0eUtleSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG5cdCAgICAgICAgcmV0dXJuIChrZXkudHlwZSA9PT0gc3ludGF4XzEuU3ludGF4LklkZW50aWZpZXIgJiYga2V5Lm5hbWUgPT09IHZhbHVlKSB8fFxuXHQgICAgICAgICAgICAoa2V5LnR5cGUgPT09IHN5bnRheF8xLlN5bnRheC5MaXRlcmFsICYmIGtleS52YWx1ZSA9PT0gdmFsdWUpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VPYmplY3RQcm9wZXJ0eSA9IGZ1bmN0aW9uIChoYXNQcm90bykge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIHRva2VuID0gdGhpcy5sb29rYWhlYWQ7XG5cdCAgICAgICAgdmFyIGtpbmQ7XG5cdCAgICAgICAgdmFyIGtleSA9IG51bGw7XG5cdCAgICAgICAgdmFyIHZhbHVlID0gbnVsbDtcblx0ICAgICAgICB2YXIgY29tcHV0ZWQgPSBmYWxzZTtcblx0ICAgICAgICB2YXIgbWV0aG9kID0gZmFsc2U7XG5cdCAgICAgICAgdmFyIHNob3J0aGFuZCA9IGZhbHNlO1xuXHQgICAgICAgIHZhciBpc0FzeW5jID0gZmFsc2U7XG5cdCAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IDMgLyogSWRlbnRpZmllciAqLykge1xuXHQgICAgICAgICAgICB2YXIgaWQgPSB0b2tlbi52YWx1ZTtcblx0ICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgY29tcHV0ZWQgPSB0aGlzLm1hdGNoKCdbJyk7XG5cdCAgICAgICAgICAgIGlzQXN5bmMgPSAhdGhpcy5oYXNMaW5lVGVybWluYXRvciAmJiAoaWQgPT09ICdhc3luYycpICYmXG5cdCAgICAgICAgICAgICAgICAhdGhpcy5tYXRjaCgnOicpICYmICF0aGlzLm1hdGNoKCcoJykgJiYgIXRoaXMubWF0Y2goJyonKSAmJiAhdGhpcy5tYXRjaCgnLCcpO1xuXHQgICAgICAgICAgICBrZXkgPSBpc0FzeW5jID8gdGhpcy5wYXJzZU9iamVjdFByb3BlcnR5S2V5KCkgOiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLklkZW50aWZpZXIoaWQpKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSBpZiAodGhpcy5tYXRjaCgnKicpKSB7XG5cdCAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICBjb21wdXRlZCA9IHRoaXMubWF0Y2goJ1snKTtcblx0ICAgICAgICAgICAga2V5ID0gdGhpcy5wYXJzZU9iamVjdFByb3BlcnR5S2V5KCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBsb29rYWhlYWRQcm9wZXJ0eUtleSA9IHRoaXMucXVhbGlmaWVkUHJvcGVydHlOYW1lKHRoaXMubG9va2FoZWFkKTtcblx0ICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gMyAvKiBJZGVudGlmaWVyICovICYmICFpc0FzeW5jICYmIHRva2VuLnZhbHVlID09PSAnZ2V0JyAmJiBsb29rYWhlYWRQcm9wZXJ0eUtleSkge1xuXHQgICAgICAgICAgICBraW5kID0gJ2dldCc7XG5cdCAgICAgICAgICAgIGNvbXB1dGVkID0gdGhpcy5tYXRjaCgnWycpO1xuXHQgICAgICAgICAgICBrZXkgPSB0aGlzLnBhcnNlT2JqZWN0UHJvcGVydHlLZXkoKTtcblx0ICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93WWllbGQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnBhcnNlR2V0dGVyTWV0aG9kKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IDMgLyogSWRlbnRpZmllciAqLyAmJiAhaXNBc3luYyAmJiB0b2tlbi52YWx1ZSA9PT0gJ3NldCcgJiYgbG9va2FoZWFkUHJvcGVydHlLZXkpIHtcblx0ICAgICAgICAgICAga2luZCA9ICdzZXQnO1xuXHQgICAgICAgICAgICBjb21wdXRlZCA9IHRoaXMubWF0Y2goJ1snKTtcblx0ICAgICAgICAgICAga2V5ID0gdGhpcy5wYXJzZU9iamVjdFByb3BlcnR5S2V5KCk7XG5cdCAgICAgICAgICAgIHZhbHVlID0gdGhpcy5wYXJzZVNldHRlck1ldGhvZCgpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmICh0b2tlbi50eXBlID09PSA3IC8qIFB1bmN0dWF0b3IgKi8gJiYgdG9rZW4udmFsdWUgPT09ICcqJyAmJiBsb29rYWhlYWRQcm9wZXJ0eUtleSkge1xuXHQgICAgICAgICAgICBraW5kID0gJ2luaXQnO1xuXHQgICAgICAgICAgICBjb21wdXRlZCA9IHRoaXMubWF0Y2goJ1snKTtcblx0ICAgICAgICAgICAga2V5ID0gdGhpcy5wYXJzZU9iamVjdFByb3BlcnR5S2V5KCk7XG5cdCAgICAgICAgICAgIHZhbHVlID0gdGhpcy5wYXJzZUdlbmVyYXRvck1ldGhvZCgpO1xuXHQgICAgICAgICAgICBtZXRob2QgPSB0cnVlO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgaWYgKCFrZXkpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odGhpcy5sb29rYWhlYWQpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGtpbmQgPSAnaW5pdCc7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCc6JykgJiYgIWlzQXN5bmMpIHtcblx0ICAgICAgICAgICAgICAgIGlmICghY29tcHV0ZWQgJiYgdGhpcy5pc1Byb3BlcnR5S2V5KGtleSwgJ19fcHJvdG9fXycpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1Byb3RvLnZhbHVlKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLkR1cGxpY2F0ZVByb3RvUHJvcGVydHkpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBoYXNQcm90by52YWx1ZSA9IHRydWU7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmluaGVyaXRDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1hdGNoKCcoJykpIHtcblx0ICAgICAgICAgICAgICAgIHZhbHVlID0gaXNBc3luYyA/IHRoaXMucGFyc2VQcm9wZXJ0eU1ldGhvZEFzeW5jRnVuY3Rpb24oKSA6IHRoaXMucGFyc2VQcm9wZXJ0eU1ldGhvZEZ1bmN0aW9uKCk7XG5cdCAgICAgICAgICAgICAgICBtZXRob2QgPSB0cnVlO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IDMgLyogSWRlbnRpZmllciAqLykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGlkID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5JZGVudGlmaWVyKHRva2VuLnZhbHVlKSk7XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRjaCgnPScpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpcnN0Q292ZXJJbml0aWFsaXplZE5hbWVFcnJvciA9IHRoaXMubG9va2FoZWFkO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgc2hvcnRoYW5kID0gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgaW5pdCA9IHRoaXMuaXNvbGF0ZUNvdmVyR3JhbW1hcih0aGlzLnBhcnNlQXNzaWdubWVudEV4cHJlc3Npb24pO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5Bc3NpZ25tZW50UGF0dGVybihpZCwgaW5pdCkpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc2hvcnRoYW5kID0gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGlkO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0aGlzLm5leHRUb2tlbigpKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5Qcm9wZXJ0eShraW5kLCBrZXksIGNvbXB1dGVkLCB2YWx1ZSwgbWV0aG9kLCBzaG9ydGhhbmQpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlT2JqZWN0SW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgneycpO1xuXHQgICAgICAgIHZhciBwcm9wZXJ0aWVzID0gW107XG5cdCAgICAgICAgdmFyIGhhc1Byb3RvID0geyB2YWx1ZTogZmFsc2UgfTtcblx0ICAgICAgICB3aGlsZSAoIXRoaXMubWF0Y2goJ30nKSkge1xuXHQgICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2godGhpcy5wYXJzZU9iamVjdFByb3BlcnR5KGhhc1Byb3RvKSk7XG5cdCAgICAgICAgICAgIGlmICghdGhpcy5tYXRjaCgnfScpKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmV4cGVjdENvbW1hU2VwYXJhdG9yKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJ30nKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5PYmplY3RFeHByZXNzaW9uKHByb3BlcnRpZXMpKTtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10ZW1wbGF0ZS1saXRlcmFsc1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVRlbXBsYXRlSGVhZCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBhc3NlcnRfMS5hc3NlcnQodGhpcy5sb29rYWhlYWQuaGVhZCwgJ1RlbXBsYXRlIGxpdGVyYWwgbXVzdCBzdGFydCB3aXRoIGEgdGVtcGxhdGUgaGVhZCcpO1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIHRva2VuID0gdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICB2YXIgcmF3ID0gdG9rZW4udmFsdWU7XG5cdCAgICAgICAgdmFyIGNvb2tlZCA9IHRva2VuLmNvb2tlZDtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5UZW1wbGF0ZUVsZW1lbnQoeyByYXc6IHJhdywgY29va2VkOiBjb29rZWQgfSwgdG9rZW4udGFpbCkpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VUZW1wbGF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgaWYgKHRoaXMubG9va2FoZWFkLnR5cGUgIT09IDEwIC8qIFRlbXBsYXRlICovKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4oKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgIHZhciByYXcgPSB0b2tlbi52YWx1ZTtcblx0ICAgICAgICB2YXIgY29va2VkID0gdG9rZW4uY29va2VkO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLlRlbXBsYXRlRWxlbWVudCh7IHJhdzogcmF3LCBjb29rZWQ6IGNvb2tlZCB9LCB0b2tlbi50YWlsKSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVRlbXBsYXRlTGl0ZXJhbCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHZhciBleHByZXNzaW9ucyA9IFtdO1xuXHQgICAgICAgIHZhciBxdWFzaXMgPSBbXTtcblx0ICAgICAgICB2YXIgcXVhc2kgPSB0aGlzLnBhcnNlVGVtcGxhdGVIZWFkKCk7XG5cdCAgICAgICAgcXVhc2lzLnB1c2gocXVhc2kpO1xuXHQgICAgICAgIHdoaWxlICghcXVhc2kudGFpbCkge1xuXHQgICAgICAgICAgICBleHByZXNzaW9ucy5wdXNoKHRoaXMucGFyc2VFeHByZXNzaW9uKCkpO1xuXHQgICAgICAgICAgICBxdWFzaSA9IHRoaXMucGFyc2VUZW1wbGF0ZUVsZW1lbnQoKTtcblx0ICAgICAgICAgICAgcXVhc2lzLnB1c2gocXVhc2kpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5UZW1wbGF0ZUxpdGVyYWwocXVhc2lzLCBleHByZXNzaW9ucykpO1xuXHQgICAgfTtcblx0ICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWdyb3VwaW5nLW9wZXJhdG9yXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnJlaW50ZXJwcmV0RXhwcmVzc2lvbkFzUGF0dGVybiA9IGZ1bmN0aW9uIChleHByKSB7XG5cdCAgICAgICAgc3dpdGNoIChleHByLnR5cGUpIHtcblx0ICAgICAgICAgICAgY2FzZSBzeW50YXhfMS5TeW50YXguSWRlbnRpZmllcjpcblx0ICAgICAgICAgICAgY2FzZSBzeW50YXhfMS5TeW50YXguTWVtYmVyRXhwcmVzc2lvbjpcblx0ICAgICAgICAgICAgY2FzZSBzeW50YXhfMS5TeW50YXguUmVzdEVsZW1lbnQ6XG5cdCAgICAgICAgICAgIGNhc2Ugc3ludGF4XzEuU3ludGF4LkFzc2lnbm1lbnRQYXR0ZXJuOlxuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2Ugc3ludGF4XzEuU3ludGF4LlNwcmVhZEVsZW1lbnQ6XG5cdCAgICAgICAgICAgICAgICBleHByLnR5cGUgPSBzeW50YXhfMS5TeW50YXguUmVzdEVsZW1lbnQ7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnJlaW50ZXJwcmV0RXhwcmVzc2lvbkFzUGF0dGVybihleHByLmFyZ3VtZW50KTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlIHN5bnRheF8xLlN5bnRheC5BcnJheUV4cHJlc3Npb246XG5cdCAgICAgICAgICAgICAgICBleHByLnR5cGUgPSBzeW50YXhfMS5TeW50YXguQXJyYXlQYXR0ZXJuO1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHByLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKGV4cHIuZWxlbWVudHNbaV0gIT09IG51bGwpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWludGVycHJldEV4cHJlc3Npb25Bc1BhdHRlcm4oZXhwci5lbGVtZW50c1tpXSk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2Ugc3ludGF4XzEuU3ludGF4Lk9iamVjdEV4cHJlc3Npb246XG5cdCAgICAgICAgICAgICAgICBleHByLnR5cGUgPSBzeW50YXhfMS5TeW50YXguT2JqZWN0UGF0dGVybjtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwci5wcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWludGVycHJldEV4cHJlc3Npb25Bc1BhdHRlcm4oZXhwci5wcm9wZXJ0aWVzW2ldLnZhbHVlKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlIHN5bnRheF8xLlN5bnRheC5Bc3NpZ25tZW50RXhwcmVzc2lvbjpcblx0ICAgICAgICAgICAgICAgIGV4cHIudHlwZSA9IHN5bnRheF8xLlN5bnRheC5Bc3NpZ25tZW50UGF0dGVybjtcblx0ICAgICAgICAgICAgICAgIGRlbGV0ZSBleHByLm9wZXJhdG9yO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5yZWludGVycHJldEV4cHJlc3Npb25Bc1BhdHRlcm4oZXhwci5sZWZ0KTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICAgICAgLy8gQWxsb3cgb3RoZXIgbm9kZSB0eXBlIGZvciB0b2xlcmFudCBwYXJzaW5nLlxuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VHcm91cEV4cHJlc3Npb24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGV4cHI7XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJygnKTtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaCgnKScpKSB7XG5cdCAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgIGlmICghdGhpcy5tYXRjaCgnPT4nKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJz0+Jyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZXhwciA9IHtcblx0ICAgICAgICAgICAgICAgIHR5cGU6IEFycm93UGFyYW1ldGVyUGxhY2VIb2xkZXIsXG5cdCAgICAgICAgICAgICAgICBwYXJhbXM6IFtdLFxuXHQgICAgICAgICAgICAgICAgYXN5bmM6IGZhbHNlXG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICB2YXIgc3RhcnRUb2tlbiA9IHRoaXMubG9va2FoZWFkO1xuXHQgICAgICAgICAgICB2YXIgcGFyYW1zID0gW107XG5cdCAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCcuLi4nKSkge1xuXHQgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMucGFyc2VSZXN0RWxlbWVudChwYXJhbXMpO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJyknKTtcblx0ICAgICAgICAgICAgICAgIGlmICghdGhpcy5tYXRjaCgnPT4nKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwZWN0KCc9PicpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgZXhwciA9IHtcblx0ICAgICAgICAgICAgICAgICAgICB0eXBlOiBBcnJvd1BhcmFtZXRlclBsYWNlSG9sZGVyLFxuXHQgICAgICAgICAgICAgICAgICAgIHBhcmFtczogW2V4cHJdLFxuXHQgICAgICAgICAgICAgICAgICAgIGFzeW5jOiBmYWxzZVxuXHQgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHZhciBhcnJvdyA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMuaW5oZXJpdENvdmVyR3JhbW1hcih0aGlzLnBhcnNlQXNzaWdubWVudEV4cHJlc3Npb24pO1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2goJywnKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBleHByZXNzaW9ucyA9IFtdO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9ucy5wdXNoKGV4cHIpO1xuXHQgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLmxvb2thaGVhZC50eXBlICE9PSAyIC8qIEVPRiAqLykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMubWF0Y2goJywnKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2goJyknKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwcmVzc2lvbnMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlaW50ZXJwcmV0RXhwcmVzc2lvbkFzUGF0dGVybihleHByZXNzaW9uc1tpXSk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvdyA9IHRydWU7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByID0ge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEFycm93UGFyYW1ldGVyUGxhY2VIb2xkZXIsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBleHByZXNzaW9ucyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogZmFsc2Vcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tYXRjaCgnLi4uJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRoaXMubG9va2FoZWFkKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb25zLnB1c2godGhpcy5wYXJzZVJlc3RFbGVtZW50KHBhcmFtcykpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJyknKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5tYXRjaCgnPT4nKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwZWN0KCc9PicpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwcmVzc2lvbnMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlaW50ZXJwcmV0RXhwcmVzc2lvbkFzUGF0dGVybihleHByZXNzaW9uc1tpXSk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvdyA9IHRydWU7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByID0ge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEFycm93UGFyYW1ldGVyUGxhY2VIb2xkZXIsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBleHByZXNzaW9ucyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogZmFsc2Vcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9ucy5wdXNoKHRoaXMuaW5oZXJpdENvdmVyR3JhbW1hcih0aGlzLnBhcnNlQXNzaWdubWVudEV4cHJlc3Npb24pKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyb3cpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIGlmICghYXJyb3cpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUodGhpcy5zdGFydE5vZGUoc3RhcnRUb2tlbiksIG5ldyBOb2RlLlNlcXVlbmNlRXhwcmVzc2lvbihleHByZXNzaW9ucykpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGlmICghYXJyb3cpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGVjdCgnKScpO1xuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCc9PicpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleHByLnR5cGUgPT09IHN5bnRheF8xLlN5bnRheC5JZGVudGlmaWVyICYmIGV4cHIubmFtZSA9PT0gJ3lpZWxkJykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3cgPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwciA9IHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBBcnJvd1BhcmFtZXRlclBsYWNlSG9sZGVyLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogW2V4cHJdLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiBmYWxzZVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFycm93KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0aGlzLmxvb2thaGVhZCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhwci50eXBlID09PSBzeW50YXhfMS5TeW50YXguU2VxdWVuY2VFeHByZXNzaW9uKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHByLmV4cHJlc3Npb25zLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVpbnRlcnByZXRFeHByZXNzaW9uQXNQYXR0ZXJuKGV4cHIuZXhwcmVzc2lvbnNbaV0pO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVpbnRlcnByZXRFeHByZXNzaW9uQXNQYXR0ZXJuKGV4cHIpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSAoZXhwci50eXBlID09PSBzeW50YXhfMS5TeW50YXguU2VxdWVuY2VFeHByZXNzaW9uID8gZXhwci5leHByZXNzaW9ucyA6IFtleHByXSk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByID0ge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEFycm93UGFyYW1ldGVyUGxhY2VIb2xkZXIsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbWV0ZXJzLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiBmYWxzZVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBleHByO1xuXHQgICAgfTtcblx0ICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWxlZnQtaGFuZC1zaWRlLWV4cHJlc3Npb25zXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQXJndW1lbnRzID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcoJyk7XG5cdCAgICAgICAgdmFyIGFyZ3MgPSBbXTtcblx0ICAgICAgICBpZiAoIXRoaXMubWF0Y2goJyknKSkge1xuXHQgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGV4cHIgPSB0aGlzLm1hdGNoKCcuLi4nKSA/IHRoaXMucGFyc2VTcHJlYWRFbGVtZW50KCkgOlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNvbGF0ZUNvdmVyR3JhbW1hcih0aGlzLnBhcnNlQXNzaWdubWVudEV4cHJlc3Npb24pO1xuXHQgICAgICAgICAgICAgICAgYXJncy5wdXNoKGV4cHIpO1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2goJyknKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgdGhpcy5leHBlY3RDb21tYVNlcGFyYXRvcigpO1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2goJyknKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcpJyk7XG5cdCAgICAgICAgcmV0dXJuIGFyZ3M7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5pc0lkZW50aWZpZXJOYW1lID0gZnVuY3Rpb24gKHRva2VuKSB7XG5cdCAgICAgICAgcmV0dXJuIHRva2VuLnR5cGUgPT09IDMgLyogSWRlbnRpZmllciAqLyB8fFxuXHQgICAgICAgICAgICB0b2tlbi50eXBlID09PSA0IC8qIEtleXdvcmQgKi8gfHxcblx0ICAgICAgICAgICAgdG9rZW4udHlwZSA9PT0gMSAvKiBCb29sZWFuTGl0ZXJhbCAqLyB8fFxuXHQgICAgICAgICAgICB0b2tlbi50eXBlID09PSA1IC8qIE51bGxMaXRlcmFsICovO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VJZGVudGlmaWVyTmFtZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHZhciB0b2tlbiA9IHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgaWYgKCF0aGlzLmlzSWRlbnRpZmllck5hbWUodG9rZW4pKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odG9rZW4pO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5JZGVudGlmaWVyKHRva2VuLnZhbHVlKSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZU5ld0V4cHJlc3Npb24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgaWQgPSB0aGlzLnBhcnNlSWRlbnRpZmllck5hbWUoKTtcblx0ICAgICAgICBhc3NlcnRfMS5hc3NlcnQoaWQubmFtZSA9PT0gJ25ldycsICdOZXcgZXhwcmVzc2lvbiBtdXN0IHN0YXJ0IHdpdGggYG5ld2AnKTtcblx0ICAgICAgICB2YXIgZXhwcjtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaCgnLicpKSB7XG5cdCAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLmxvb2thaGVhZC50eXBlID09PSAzIC8qIElkZW50aWZpZXIgKi8gJiYgdGhpcy5jb250ZXh0LmluRnVuY3Rpb25Cb2R5ICYmIHRoaXMubG9va2FoZWFkLnZhbHVlID09PSAndGFyZ2V0Jykge1xuXHQgICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5ID0gdGhpcy5wYXJzZUlkZW50aWZpZXJOYW1lKCk7XG5cdCAgICAgICAgICAgICAgICBleHByID0gbmV3IE5vZGUuTWV0YVByb3BlcnR5KGlkLCBwcm9wZXJ0eSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRoaXMubG9va2FoZWFkKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdmFyIGNhbGxlZSA9IHRoaXMuaXNvbGF0ZUNvdmVyR3JhbW1hcih0aGlzLnBhcnNlTGVmdEhhbmRTaWRlRXhwcmVzc2lvbik7XG5cdCAgICAgICAgICAgIHZhciBhcmdzID0gdGhpcy5tYXRjaCgnKCcpID8gdGhpcy5wYXJzZUFyZ3VtZW50cygpIDogW107XG5cdCAgICAgICAgICAgIGV4cHIgPSBuZXcgTm9kZS5OZXdFeHByZXNzaW9uKGNhbGxlZSwgYXJncyk7XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSBmYWxzZTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgZXhwcik7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUFzeW5jQXJndW1lbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGFyZyA9IHRoaXMucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbigpO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5maXJzdENvdmVySW5pdGlhbGl6ZWROYW1lRXJyb3IgPSBudWxsO1xuXHQgICAgICAgIHJldHVybiBhcmc7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUFzeW5jQXJndW1lbnRzID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcoJyk7XG5cdCAgICAgICAgdmFyIGFyZ3MgPSBbXTtcblx0ICAgICAgICBpZiAoIXRoaXMubWF0Y2goJyknKSkge1xuXHQgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGV4cHIgPSB0aGlzLm1hdGNoKCcuLi4nKSA/IHRoaXMucGFyc2VTcHJlYWRFbGVtZW50KCkgOlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNvbGF0ZUNvdmVyR3JhbW1hcih0aGlzLnBhcnNlQXN5bmNBcmd1bWVudCk7XG5cdCAgICAgICAgICAgICAgICBhcmdzLnB1c2goZXhwcik7XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRjaCgnKScpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB0aGlzLmV4cGVjdENvbW1hU2VwYXJhdG9yKCk7XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRjaCgnKScpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJyknKTtcblx0ICAgICAgICByZXR1cm4gYXJncztcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlTGVmdEhhbmRTaWRlRXhwcmVzc2lvbkFsbG93Q2FsbCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgc3RhcnRUb2tlbiA9IHRoaXMubG9va2FoZWFkO1xuXHQgICAgICAgIHZhciBtYXliZUFzeW5jID0gdGhpcy5tYXRjaENvbnRleHR1YWxLZXl3b3JkKCdhc3luYycpO1xuXHQgICAgICAgIHZhciBwcmV2aW91c0FsbG93SW4gPSB0aGlzLmNvbnRleHQuYWxsb3dJbjtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dJbiA9IHRydWU7XG5cdCAgICAgICAgdmFyIGV4cHI7XG5cdCAgICAgICAgaWYgKHRoaXMubWF0Y2hLZXl3b3JkKCdzdXBlcicpICYmIHRoaXMuY29udGV4dC5pbkZ1bmN0aW9uQm9keSkge1xuXHQgICAgICAgICAgICBleHByID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgIGV4cHIgPSB0aGlzLmZpbmFsaXplKGV4cHIsIG5ldyBOb2RlLlN1cGVyKCkpO1xuXHQgICAgICAgICAgICBpZiAoIXRoaXMubWF0Y2goJygnKSAmJiAhdGhpcy5tYXRjaCgnLicpICYmICF0aGlzLm1hdGNoKCdbJykpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odGhpcy5sb29rYWhlYWQpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICBleHByID0gdGhpcy5pbmhlcml0Q292ZXJHcmFtbWFyKHRoaXMubWF0Y2hLZXl3b3JkKCduZXcnKSA/IHRoaXMucGFyc2VOZXdFeHByZXNzaW9uIDogdGhpcy5wYXJzZVByaW1hcnlFeHByZXNzaW9uKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgd2hpbGUgKHRydWUpIHtcblx0ICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2goJy4nKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJy4nKTtcblx0ICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eSA9IHRoaXMucGFyc2VJZGVudGlmaWVyTmFtZSgpO1xuXHQgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUodGhpcy5zdGFydE5vZGUoc3RhcnRUb2tlbiksIG5ldyBOb2RlLlN0YXRpY01lbWJlckV4cHJlc3Npb24oZXhwciwgcHJvcGVydHkpKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1hdGNoKCcoJykpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBhc3luY0Fycm93ID0gbWF5YmVBc3luYyAmJiAoc3RhcnRUb2tlbi5saW5lTnVtYmVyID09PSB0aGlzLmxvb2thaGVhZC5saW5lTnVtYmVyKTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB2YXIgYXJncyA9IGFzeW5jQXJyb3cgPyB0aGlzLnBhcnNlQXN5bmNBcmd1bWVudHMoKSA6IHRoaXMucGFyc2VBcmd1bWVudHMoKTtcblx0ICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmZpbmFsaXplKHRoaXMuc3RhcnROb2RlKHN0YXJ0VG9rZW4pLCBuZXcgTm9kZS5DYWxsRXhwcmVzc2lvbihleHByLCBhcmdzKSk7XG5cdCAgICAgICAgICAgICAgICBpZiAoYXN5bmNBcnJvdyAmJiB0aGlzLm1hdGNoKCc9PicpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVpbnRlcnByZXRFeHByZXNzaW9uQXNQYXR0ZXJuKGFyZ3NbaV0pO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBleHByID0ge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBBcnJvd1BhcmFtZXRlclBsYWNlSG9sZGVyLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGFyZ3MsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlXG5cdCAgICAgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1hdGNoKCdbJykpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0ID0gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuZXhwZWN0KCdbJyk7XG5cdCAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHkgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUV4cHJlc3Npb24pO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJ10nKTtcblx0ICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmZpbmFsaXplKHRoaXMuc3RhcnROb2RlKHN0YXJ0VG9rZW4pLCBuZXcgTm9kZS5Db21wdXRlZE1lbWJlckV4cHJlc3Npb24oZXhwciwgcHJvcGVydHkpKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxvb2thaGVhZC50eXBlID09PSAxMCAvKiBUZW1wbGF0ZSAqLyAmJiB0aGlzLmxvb2thaGVhZC5oZWFkKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgcXVhc2kgPSB0aGlzLnBhcnNlVGVtcGxhdGVMaXRlcmFsKCk7XG5cdCAgICAgICAgICAgICAgICBleHByID0gdGhpcy5maW5hbGl6ZSh0aGlzLnN0YXJ0Tm9kZShzdGFydFRva2VuKSwgbmV3IE5vZGUuVGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uKGV4cHIsIHF1YXNpKSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dJbiA9IHByZXZpb3VzQWxsb3dJbjtcblx0ICAgICAgICByZXR1cm4gZXhwcjtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlU3VwZXIgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdEtleXdvcmQoJ3N1cGVyJyk7XG5cdCAgICAgICAgaWYgKCF0aGlzLm1hdGNoKCdbJykgJiYgIXRoaXMubWF0Y2goJy4nKSkge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRoaXMubG9va2FoZWFkKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuU3VwZXIoKSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUxlZnRIYW5kU2lkZUV4cHJlc3Npb24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgYXNzZXJ0XzEuYXNzZXJ0KHRoaXMuY29udGV4dC5hbGxvd0luLCAnY2FsbGVlIG9mIG5ldyBleHByZXNzaW9uIGFsd2F5cyBhbGxvdyBpbiBrZXl3b3JkLicpO1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5zdGFydE5vZGUodGhpcy5sb29rYWhlYWQpO1xuXHQgICAgICAgIHZhciBleHByID0gKHRoaXMubWF0Y2hLZXl3b3JkKCdzdXBlcicpICYmIHRoaXMuY29udGV4dC5pbkZ1bmN0aW9uQm9keSkgPyB0aGlzLnBhcnNlU3VwZXIoKSA6XG5cdCAgICAgICAgICAgIHRoaXMuaW5oZXJpdENvdmVyR3JhbW1hcih0aGlzLm1hdGNoS2V5d29yZCgnbmV3JykgPyB0aGlzLnBhcnNlTmV3RXhwcmVzc2lvbiA6IHRoaXMucGFyc2VQcmltYXJ5RXhwcmVzc2lvbik7XG5cdCAgICAgICAgd2hpbGUgKHRydWUpIHtcblx0ICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2goJ1snKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJ1snKTtcblx0ICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eSA9IHRoaXMuaXNvbGF0ZUNvdmVyR3JhbW1hcih0aGlzLnBhcnNlRXhwcmVzc2lvbik7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmV4cGVjdCgnXScpO1xuXHQgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuQ29tcHV0ZWRNZW1iZXJFeHByZXNzaW9uKGV4cHIsIHByb3BlcnR5KSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tYXRjaCgnLicpKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCA9IHRydWU7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmV4cGVjdCgnLicpO1xuXHQgICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5ID0gdGhpcy5wYXJzZUlkZW50aWZpZXJOYW1lKCk7XG5cdCAgICAgICAgICAgICAgICBleHByID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5TdGF0aWNNZW1iZXJFeHByZXNzaW9uKGV4cHIsIHByb3BlcnR5KSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sb29rYWhlYWQudHlwZSA9PT0gMTAgLyogVGVtcGxhdGUgKi8gJiYgdGhpcy5sb29rYWhlYWQuaGVhZCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIHF1YXNpID0gdGhpcy5wYXJzZVRlbXBsYXRlTGl0ZXJhbCgpO1xuXHQgICAgICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuVGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uKGV4cHIsIHF1YXNpKSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gZXhwcjtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy11cGRhdGUtZXhwcmVzc2lvbnNcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VVcGRhdGVFeHByZXNzaW9uID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBleHByO1xuXHQgICAgICAgIHZhciBzdGFydFRva2VuID0gdGhpcy5sb29rYWhlYWQ7XG5cdCAgICAgICAgaWYgKHRoaXMubWF0Y2goJysrJykgfHwgdGhpcy5tYXRjaCgnLS0nKSkge1xuXHQgICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMuc3RhcnROb2RlKHN0YXJ0VG9rZW4pO1xuXHQgICAgICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICBleHByID0gdGhpcy5pbmhlcml0Q292ZXJHcmFtbWFyKHRoaXMucGFyc2VVbmFyeUV4cHJlc3Npb24pO1xuXHQgICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCAmJiBleHByLnR5cGUgPT09IHN5bnRheF8xLlN5bnRheC5JZGVudGlmaWVyICYmIHRoaXMuc2Nhbm5lci5pc1Jlc3RyaWN0ZWRXb3JkKGV4cHIubmFtZSkpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdExIU1ByZWZpeCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKCF0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0KSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlRXJyb3IobWVzc2FnZXNfMS5NZXNzYWdlcy5JbnZhbGlkTEhTSW5Bc3NpZ25tZW50KTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIgcHJlZml4ID0gdHJ1ZTtcblx0ICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuVXBkYXRlRXhwcmVzc2lvbih0b2tlbi52YWx1ZSwgZXhwciwgcHJlZml4KSk7XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSBmYWxzZTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIGV4cHIgPSB0aGlzLmluaGVyaXRDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUxlZnRIYW5kU2lkZUV4cHJlc3Npb25BbGxvd0NhbGwpO1xuXHQgICAgICAgICAgICBpZiAoIXRoaXMuaGFzTGluZVRlcm1pbmF0b3IgJiYgdGhpcy5sb29rYWhlYWQudHlwZSA9PT0gNyAvKiBQdW5jdHVhdG9yICovKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRjaCgnKysnKSB8fCB0aGlzLm1hdGNoKCctLScpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QgJiYgZXhwci50eXBlID09PSBzeW50YXhfMS5TeW50YXguSWRlbnRpZmllciAmJiB0aGlzLnNjYW5uZXIuaXNSZXN0cmljdGVkV29yZChleHByLm5hbWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdExIU1Bvc3RmaXgpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZUVycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuSW52YWxpZExIU0luQXNzaWdubWVudCk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBvcGVyYXRvciA9IHRoaXMubmV4dFRva2VuKCkudmFsdWU7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHByZWZpeCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmZpbmFsaXplKHRoaXMuc3RhcnROb2RlKHN0YXJ0VG9rZW4pLCBuZXcgTm9kZS5VcGRhdGVFeHByZXNzaW9uKG9wZXJhdG9yLCBleHByLCBwcmVmaXgpKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gZXhwcjtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy11bmFyeS1vcGVyYXRvcnNcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VBd2FpdEV4cHJlc3Npb24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgIHZhciBhcmd1bWVudCA9IHRoaXMucGFyc2VVbmFyeUV4cHJlc3Npb24oKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5Bd2FpdEV4cHJlc3Npb24oYXJndW1lbnQpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlVW5hcnlFeHByZXNzaW9uID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBleHByO1xuXHQgICAgICAgIGlmICh0aGlzLm1hdGNoKCcrJykgfHwgdGhpcy5tYXRjaCgnLScpIHx8IHRoaXMubWF0Y2goJ34nKSB8fCB0aGlzLm1hdGNoKCchJykgfHxcblx0ICAgICAgICAgICAgdGhpcy5tYXRjaEtleXdvcmQoJ2RlbGV0ZScpIHx8IHRoaXMubWF0Y2hLZXl3b3JkKCd2b2lkJykgfHwgdGhpcy5tYXRjaEtleXdvcmQoJ3R5cGVvZicpKSB7XG5cdCAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5zdGFydE5vZGUodGhpcy5sb29rYWhlYWQpO1xuXHQgICAgICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICBleHByID0gdGhpcy5pbmhlcml0Q292ZXJHcmFtbWFyKHRoaXMucGFyc2VVbmFyeUV4cHJlc3Npb24pO1xuXHQgICAgICAgICAgICBleHByID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5VbmFyeUV4cHJlc3Npb24odG9rZW4udmFsdWUsIGV4cHIpKTtcblx0ICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QgJiYgZXhwci5vcGVyYXRvciA9PT0gJ2RlbGV0ZScgJiYgZXhwci5hcmd1bWVudC50eXBlID09PSBzeW50YXhfMS5TeW50YXguSWRlbnRpZmllcikge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZUVycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0RGVsZXRlKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0ID0gZmFsc2U7XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0JpbmRpbmdFbGVtZW50ID0gZmFsc2U7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2UgaWYgKHRoaXMuY29udGV4dC5hd2FpdCAmJiB0aGlzLm1hdGNoQ29udGV4dHVhbEtleXdvcmQoJ2F3YWl0JykpIHtcblx0ICAgICAgICAgICAgZXhwciA9IHRoaXMucGFyc2VBd2FpdEV4cHJlc3Npb24oKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIGV4cHIgPSB0aGlzLnBhcnNlVXBkYXRlRXhwcmVzc2lvbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gZXhwcjtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlRXhwb25lbnRpYXRpb25FeHByZXNzaW9uID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBzdGFydFRva2VuID0gdGhpcy5sb29rYWhlYWQ7XG5cdCAgICAgICAgdmFyIGV4cHIgPSB0aGlzLmluaGVyaXRDb3ZlckdyYW1tYXIodGhpcy5wYXJzZVVuYXJ5RXhwcmVzc2lvbik7XG5cdCAgICAgICAgaWYgKGV4cHIudHlwZSAhPT0gc3ludGF4XzEuU3ludGF4LlVuYXJ5RXhwcmVzc2lvbiAmJiB0aGlzLm1hdGNoKCcqKicpKSB7XG5cdCAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgdmFyIGxlZnQgPSBleHByO1xuXHQgICAgICAgICAgICB2YXIgcmlnaHQgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUV4cG9uZW50aWF0aW9uRXhwcmVzc2lvbik7XG5cdCAgICAgICAgICAgIGV4cHIgPSB0aGlzLmZpbmFsaXplKHRoaXMuc3RhcnROb2RlKHN0YXJ0VG9rZW4pLCBuZXcgTm9kZS5CaW5hcnlFeHByZXNzaW9uKCcqKicsIGxlZnQsIHJpZ2h0KSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBleHByO1xuXHQgICAgfTtcblx0ICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWV4cC1vcGVyYXRvclxuXHQgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtbXVsdGlwbGljYXRpdmUtb3BlcmF0b3JzXG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hZGRpdGl2ZS1vcGVyYXRvcnNcblx0ICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWJpdHdpc2Utc2hpZnQtb3BlcmF0b3JzXG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1yZWxhdGlvbmFsLW9wZXJhdG9yc1xuXHQgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZXF1YWxpdHktb3BlcmF0b3JzXG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1iaW5hcnktYml0d2lzZS1vcGVyYXRvcnNcblx0ICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWJpbmFyeS1sb2dpY2FsLW9wZXJhdG9yc1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5iaW5hcnlQcmVjZWRlbmNlID0gZnVuY3Rpb24gKHRva2VuKSB7XG5cdCAgICAgICAgdmFyIG9wID0gdG9rZW4udmFsdWU7XG5cdCAgICAgICAgdmFyIHByZWNlZGVuY2U7XG5cdCAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IDcgLyogUHVuY3R1YXRvciAqLykge1xuXHQgICAgICAgICAgICBwcmVjZWRlbmNlID0gdGhpcy5vcGVyYXRvclByZWNlZGVuY2Vbb3BdIHx8IDA7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IDQgLyogS2V5d29yZCAqLykge1xuXHQgICAgICAgICAgICBwcmVjZWRlbmNlID0gKG9wID09PSAnaW5zdGFuY2VvZicgfHwgKHRoaXMuY29udGV4dC5hbGxvd0luICYmIG9wID09PSAnaW4nKSkgPyA3IDogMDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIHByZWNlZGVuY2UgPSAwO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcHJlY2VkZW5jZTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQmluYXJ5RXhwcmVzc2lvbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgc3RhcnRUb2tlbiA9IHRoaXMubG9va2FoZWFkO1xuXHQgICAgICAgIHZhciBleHByID0gdGhpcy5pbmhlcml0Q292ZXJHcmFtbWFyKHRoaXMucGFyc2VFeHBvbmVudGlhdGlvbkV4cHJlc3Npb24pO1xuXHQgICAgICAgIHZhciB0b2tlbiA9IHRoaXMubG9va2FoZWFkO1xuXHQgICAgICAgIHZhciBwcmVjID0gdGhpcy5iaW5hcnlQcmVjZWRlbmNlKHRva2VuKTtcblx0ICAgICAgICBpZiAocHJlYyA+IDApIHtcblx0ICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCA9IGZhbHNlO1xuXHQgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IGZhbHNlO1xuXHQgICAgICAgICAgICB2YXIgbWFya2VycyA9IFtzdGFydFRva2VuLCB0aGlzLmxvb2thaGVhZF07XG5cdCAgICAgICAgICAgIHZhciBsZWZ0ID0gZXhwcjtcblx0ICAgICAgICAgICAgdmFyIHJpZ2h0ID0gdGhpcy5pc29sYXRlQ292ZXJHcmFtbWFyKHRoaXMucGFyc2VFeHBvbmVudGlhdGlvbkV4cHJlc3Npb24pO1xuXHQgICAgICAgICAgICB2YXIgc3RhY2sgPSBbbGVmdCwgdG9rZW4udmFsdWUsIHJpZ2h0XTtcblx0ICAgICAgICAgICAgdmFyIHByZWNlZGVuY2VzID0gW3ByZWNdO1xuXHQgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuXHQgICAgICAgICAgICAgICAgcHJlYyA9IHRoaXMuYmluYXJ5UHJlY2VkZW5jZSh0aGlzLmxvb2thaGVhZCk7XG5cdCAgICAgICAgICAgICAgICBpZiAocHJlYyA8PSAwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAvLyBSZWR1Y2U6IG1ha2UgYSBiaW5hcnkgZXhwcmVzc2lvbiBmcm9tIHRoZSB0aHJlZSB0b3Btb3N0IGVudHJpZXMuXG5cdCAgICAgICAgICAgICAgICB3aGlsZSAoKHN0YWNrLmxlbmd0aCA+IDIpICYmIChwcmVjIDw9IHByZWNlZGVuY2VzW3ByZWNlZGVuY2VzLmxlbmd0aCAtIDFdKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJpZ2h0ID0gc3RhY2sucG9wKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIG9wZXJhdG9yID0gc3RhY2sucG9wKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgcHJlY2VkZW5jZXMucG9wKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHN0YWNrLnBvcCgpO1xuXHQgICAgICAgICAgICAgICAgICAgIG1hcmtlcnMucG9wKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLnN0YXJ0Tm9kZShtYXJrZXJzW21hcmtlcnMubGVuZ3RoIC0gMV0pO1xuXHQgICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2godGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5CaW5hcnlFeHByZXNzaW9uKG9wZXJhdG9yLCBsZWZ0LCByaWdodCkpKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIC8vIFNoaWZ0LlxuXHQgICAgICAgICAgICAgICAgc3RhY2sucHVzaCh0aGlzLm5leHRUb2tlbigpLnZhbHVlKTtcblx0ICAgICAgICAgICAgICAgIHByZWNlZGVuY2VzLnB1c2gocHJlYyk7XG5cdCAgICAgICAgICAgICAgICBtYXJrZXJzLnB1c2godGhpcy5sb29rYWhlYWQpO1xuXHQgICAgICAgICAgICAgICAgc3RhY2sucHVzaCh0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUV4cG9uZW50aWF0aW9uRXhwcmVzc2lvbikpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIC8vIEZpbmFsIHJlZHVjZSB0byBjbGVhbi11cCB0aGUgc3RhY2suXG5cdCAgICAgICAgICAgIHZhciBpID0gc3RhY2subGVuZ3RoIC0gMTtcblx0ICAgICAgICAgICAgZXhwciA9IHN0YWNrW2ldO1xuXHQgICAgICAgICAgICB2YXIgbGFzdE1hcmtlciA9IG1hcmtlcnMucG9wKCk7XG5cdCAgICAgICAgICAgIHdoaWxlIChpID4gMSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIG1hcmtlciA9IG1hcmtlcnMucG9wKCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgbGFzdExpbmVTdGFydCA9IGxhc3RNYXJrZXIgJiYgbGFzdE1hcmtlci5saW5lU3RhcnQ7XG5cdCAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMuc3RhcnROb2RlKG1hcmtlciwgbGFzdExpbmVTdGFydCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgb3BlcmF0b3IgPSBzdGFja1tpIC0gMV07XG5cdCAgICAgICAgICAgICAgICBleHByID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5CaW5hcnlFeHByZXNzaW9uKG9wZXJhdG9yLCBzdGFja1tpIC0gMl0sIGV4cHIpKTtcblx0ICAgICAgICAgICAgICAgIGkgLT0gMjtcblx0ICAgICAgICAgICAgICAgIGxhc3RNYXJrZXIgPSBtYXJrZXI7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGV4cHI7XG5cdCAgICB9O1xuXHQgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtY29uZGl0aW9uYWwtb3BlcmF0b3Jcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VDb25kaXRpb25hbEV4cHJlc3Npb24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIHN0YXJ0VG9rZW4gPSB0aGlzLmxvb2thaGVhZDtcblx0ICAgICAgICB2YXIgZXhwciA9IHRoaXMuaW5oZXJpdENvdmVyR3JhbW1hcih0aGlzLnBhcnNlQmluYXJ5RXhwcmVzc2lvbik7XG5cdCAgICAgICAgaWYgKHRoaXMubWF0Y2goJz8nKSkge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICB2YXIgcHJldmlvdXNBbGxvd0luID0gdGhpcy5jb250ZXh0LmFsbG93SW47XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd0luID0gdHJ1ZTtcblx0ICAgICAgICAgICAgdmFyIGNvbnNlcXVlbnQgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKTtcblx0ICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93SW4gPSBwcmV2aW91c0FsbG93SW47XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0KCc6Jyk7XG5cdCAgICAgICAgICAgIHZhciBhbHRlcm5hdGUgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKTtcblx0ICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUodGhpcy5zdGFydE5vZGUoc3RhcnRUb2tlbiksIG5ldyBOb2RlLkNvbmRpdGlvbmFsRXhwcmVzc2lvbihleHByLCBjb25zZXF1ZW50LCBhbHRlcm5hdGUpKTtcblx0ICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCA9IGZhbHNlO1xuXHQgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IGZhbHNlO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gZXhwcjtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hc3NpZ25tZW50LW9wZXJhdG9yc1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5jaGVja1BhdHRlcm5QYXJhbSA9IGZ1bmN0aW9uIChvcHRpb25zLCBwYXJhbSkge1xuXHQgICAgICAgIHN3aXRjaCAocGFyYW0udHlwZSkge1xuXHQgICAgICAgICAgICBjYXNlIHN5bnRheF8xLlN5bnRheC5JZGVudGlmaWVyOlxuXHQgICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVBhcmFtKG9wdGlvbnMsIHBhcmFtLCBwYXJhbS5uYW1lKTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlIHN5bnRheF8xLlN5bnRheC5SZXN0RWxlbWVudDpcblx0ICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tQYXR0ZXJuUGFyYW0ob3B0aW9ucywgcGFyYW0uYXJndW1lbnQpO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2Ugc3ludGF4XzEuU3ludGF4LkFzc2lnbm1lbnRQYXR0ZXJuOlxuXHQgICAgICAgICAgICAgICAgdGhpcy5jaGVja1BhdHRlcm5QYXJhbShvcHRpb25zLCBwYXJhbS5sZWZ0KTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlIHN5bnRheF8xLlN5bnRheC5BcnJheVBhdHRlcm46XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcmFtLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLmVsZW1lbnRzW2ldICE9PSBudWxsKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tQYXR0ZXJuUGFyYW0ob3B0aW9ucywgcGFyYW0uZWxlbWVudHNbaV0pO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlIHN5bnRheF8xLlN5bnRheC5PYmplY3RQYXR0ZXJuOlxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJhbS5wcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1BhdHRlcm5QYXJhbShvcHRpb25zLCBwYXJhbS5wcm9wZXJ0aWVzW2ldLnZhbHVlKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIG9wdGlvbnMuc2ltcGxlID0gb3B0aW9ucy5zaW1wbGUgJiYgKHBhcmFtIGluc3RhbmNlb2YgTm9kZS5JZGVudGlmaWVyKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnJlaW50ZXJwcmV0QXNDb3ZlckZvcm1hbHNMaXN0ID0gZnVuY3Rpb24gKGV4cHIpIHtcblx0ICAgICAgICB2YXIgcGFyYW1zID0gW2V4cHJdO1xuXHQgICAgICAgIHZhciBvcHRpb25zO1xuXHQgICAgICAgIHZhciBhc3luY0Fycm93ID0gZmFsc2U7XG5cdCAgICAgICAgc3dpdGNoIChleHByLnR5cGUpIHtcblx0ICAgICAgICAgICAgY2FzZSBzeW50YXhfMS5TeW50YXguSWRlbnRpZmllcjpcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlIEFycm93UGFyYW1ldGVyUGxhY2VIb2xkZXI6XG5cdCAgICAgICAgICAgICAgICBwYXJhbXMgPSBleHByLnBhcmFtcztcblx0ICAgICAgICAgICAgICAgIGFzeW5jQXJyb3cgPSBleHByLmFzeW5jO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgb3B0aW9ucyA9IHtcblx0ICAgICAgICAgICAgc2ltcGxlOiB0cnVlLFxuXHQgICAgICAgICAgICBwYXJhbVNldDoge31cblx0ICAgICAgICB9O1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgKytpKSB7XG5cdCAgICAgICAgICAgIHZhciBwYXJhbSA9IHBhcmFtc1tpXTtcblx0ICAgICAgICAgICAgaWYgKHBhcmFtLnR5cGUgPT09IHN5bnRheF8xLlN5bnRheC5Bc3NpZ25tZW50UGF0dGVybikge1xuXHQgICAgICAgICAgICAgICAgaWYgKHBhcmFtLnJpZ2h0LnR5cGUgPT09IHN5bnRheF8xLlN5bnRheC5ZaWVsZEV4cHJlc3Npb24pIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0ucmlnaHQuYXJndW1lbnQpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0aGlzLmxvb2thaGVhZCk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHBhcmFtLnJpZ2h0LnR5cGUgPSBzeW50YXhfMS5TeW50YXguSWRlbnRpZmllcjtcblx0ICAgICAgICAgICAgICAgICAgICBwYXJhbS5yaWdodC5uYW1lID0gJ3lpZWxkJztcblx0ICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW0ucmlnaHQuYXJndW1lbnQ7XG5cdCAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtLnJpZ2h0LmRlbGVnYXRlO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKGFzeW5jQXJyb3cgJiYgcGFyYW0udHlwZSA9PT0gc3ludGF4XzEuU3ludGF4LklkZW50aWZpZXIgJiYgcGFyYW0ubmFtZSA9PT0gJ2F3YWl0Jykge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0aGlzLmxvb2thaGVhZCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGhpcy5jaGVja1BhdHRlcm5QYXJhbShvcHRpb25zLCBwYXJhbSk7XG5cdCAgICAgICAgICAgIHBhcmFtc1tpXSA9IHBhcmFtO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCB8fCAhdGhpcy5jb250ZXh0LmFsbG93WWllbGQpIHtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJhbXMubGVuZ3RoOyArK2kpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBwYXJhbSA9IHBhcmFtc1tpXTtcblx0ICAgICAgICAgICAgICAgIGlmIChwYXJhbS50eXBlID09PSBzeW50YXhfMS5TeW50YXguWWllbGRFeHByZXNzaW9uKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0aGlzLmxvb2thaGVhZCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKG9wdGlvbnMubWVzc2FnZSA9PT0gbWVzc2FnZXNfMS5NZXNzYWdlcy5TdHJpY3RQYXJhbUR1cGUpIHtcblx0ICAgICAgICAgICAgdmFyIHRva2VuID0gdGhpcy5jb250ZXh0LnN0cmljdCA/IG9wdGlvbnMuc3RyaWN0ZWQgOiBvcHRpb25zLmZpcnN0UmVzdHJpY3RlZDtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0b2tlbiwgb3B0aW9ucy5tZXNzYWdlKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgc2ltcGxlOiBvcHRpb25zLnNpbXBsZSxcblx0ICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG5cdCAgICAgICAgICAgIHN0cmljdGVkOiBvcHRpb25zLnN0cmljdGVkLFxuXHQgICAgICAgICAgICBmaXJzdFJlc3RyaWN0ZWQ6IG9wdGlvbnMuZmlyc3RSZXN0cmljdGVkLFxuXHQgICAgICAgICAgICBtZXNzYWdlOiBvcHRpb25zLm1lc3NhZ2Vcblx0ICAgICAgICB9O1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgZXhwcjtcblx0ICAgICAgICBpZiAoIXRoaXMuY29udGV4dC5hbGxvd1lpZWxkICYmIHRoaXMubWF0Y2hLZXl3b3JkKCd5aWVsZCcpKSB7XG5cdCAgICAgICAgICAgIGV4cHIgPSB0aGlzLnBhcnNlWWllbGRFeHByZXNzaW9uKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICB2YXIgc3RhcnRUb2tlbiA9IHRoaXMubG9va2FoZWFkO1xuXHQgICAgICAgICAgICB2YXIgdG9rZW4gPSBzdGFydFRva2VuO1xuXHQgICAgICAgICAgICBleHByID0gdGhpcy5wYXJzZUNvbmRpdGlvbmFsRXhwcmVzc2lvbigpO1xuXHQgICAgICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gMyAvKiBJZGVudGlmaWVyICovICYmICh0b2tlbi5saW5lTnVtYmVyID09PSB0aGlzLmxvb2thaGVhZC5saW5lTnVtYmVyKSAmJiB0b2tlbi52YWx1ZSA9PT0gJ2FzeW5jJykge1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMubG9va2FoZWFkLnR5cGUgPT09IDMgLyogSWRlbnRpZmllciAqLyB8fCB0aGlzLm1hdGNoS2V5d29yZCgneWllbGQnKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBhcmcgPSB0aGlzLnBhcnNlUHJpbWFyeUV4cHJlc3Npb24oKTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnJlaW50ZXJwcmV0RXhwcmVzc2lvbkFzUGF0dGVybihhcmcpO1xuXHQgICAgICAgICAgICAgICAgICAgIGV4cHIgPSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEFycm93UGFyYW1ldGVyUGxhY2VIb2xkZXIsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogW2FyZ10sXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlXG5cdCAgICAgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoZXhwci50eXBlID09PSBBcnJvd1BhcmFtZXRlclBsYWNlSG9sZGVyIHx8IHRoaXMubWF0Y2goJz0+JykpIHtcblx0ICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycm93LWZ1bmN0aW9uLWRlZmluaXRpb25zXG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNBc3NpZ25tZW50VGFyZ2V0ID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgdmFyIGlzQXN5bmMgPSBleHByLmFzeW5jO1xuXHQgICAgICAgICAgICAgICAgdmFyIGxpc3QgPSB0aGlzLnJlaW50ZXJwcmV0QXNDb3ZlckZvcm1hbHNMaXN0KGV4cHIpO1xuXHQgICAgICAgICAgICAgICAgaWYgKGxpc3QpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNMaW5lVGVybWluYXRvcikge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRoaXMubG9va2FoZWFkKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpcnN0Q292ZXJJbml0aWFsaXplZE5hbWVFcnJvciA9IG51bGw7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZpb3VzU3RyaWN0ID0gdGhpcy5jb250ZXh0LnN0cmljdDtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXNBbGxvd1N0cmljdERpcmVjdGl2ZSA9IHRoaXMuY29udGV4dC5hbGxvd1N0cmljdERpcmVjdGl2ZTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dTdHJpY3REaXJlY3RpdmUgPSBsaXN0LnNpbXBsZTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXNBbGxvd1lpZWxkID0gdGhpcy5jb250ZXh0LmFsbG93WWllbGQ7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZpb3VzQXdhaXQgPSB0aGlzLmNvbnRleHQuYXdhaXQ7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93WWllbGQgPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5hd2FpdCA9IGlzQXN5bmM7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLnN0YXJ0Tm9kZShzdGFydFRva2VuKTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGVjdCgnPT4nKTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgYm9keSA9IHZvaWQgMDtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRjaCgneycpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmV2aW91c0FsbG93SW4gPSB0aGlzLmNvbnRleHQuYWxsb3dJbjtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93SW4gPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBib2R5ID0gdGhpcy5wYXJzZUZ1bmN0aW9uU291cmNlRWxlbWVudHMoKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93SW4gPSBwcmV2aW91c0FsbG93SW47XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBib2R5ID0gdGhpcy5pc29sYXRlQ292ZXJHcmFtbWFyKHRoaXMucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbik7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBleHByZXNzaW9uID0gYm9keS50eXBlICE9PSBzeW50YXhfMS5TeW50YXguQmxvY2tTdGF0ZW1lbnQ7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QgJiYgbGlzdC5maXJzdFJlc3RyaWN0ZWQpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbihsaXN0LmZpcnN0UmVzdHJpY3RlZCwgbGlzdC5tZXNzYWdlKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QgJiYgbGlzdC5zdHJpY3RlZCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKGxpc3Quc3RyaWN0ZWQsIGxpc3QubWVzc2FnZSk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIGV4cHIgPSBpc0FzeW5jID8gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5Bc3luY0Fycm93RnVuY3Rpb25FeHByZXNzaW9uKGxpc3QucGFyYW1zLCBib2R5LCBleHByZXNzaW9uKSkgOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkFycm93RnVuY3Rpb25FeHByZXNzaW9uKGxpc3QucGFyYW1zLCBib2R5LCBleHByZXNzaW9uKSk7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0cmljdCA9IHByZXZpb3VzU3RyaWN0O1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd1N0cmljdERpcmVjdGl2ZSA9IHByZXZpb3VzQWxsb3dTdHJpY3REaXJlY3RpdmU7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93WWllbGQgPSBwcmV2aW91c0FsbG93WWllbGQ7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmF3YWl0ID0gcHJldmlvdXNBd2FpdDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoQXNzaWduKCkpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZUVycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuSW52YWxpZExIU0luQXNzaWdubWVudCk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRleHQuc3RyaWN0ICYmIGV4cHIudHlwZSA9PT0gc3ludGF4XzEuU3ludGF4LklkZW50aWZpZXIpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gZXhwcjtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2Nhbm5lci5pc1Jlc3RyaWN0ZWRXb3JkKGlkLm5hbWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRva2VuLCBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdExIU0Fzc2lnbm1lbnQpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5uZXIuaXNTdHJpY3RNb2RlUmVzZXJ2ZWRXb3JkKGlkLm5hbWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRva2VuLCBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdFJlc2VydmVkV29yZCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1hdGNoKCc9JykpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNCaW5kaW5nRWxlbWVudCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWludGVycHJldEV4cHJlc3Npb25Bc1BhdHRlcm4oZXhwcik7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHRva2VuID0gdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgb3BlcmF0b3IgPSB0b2tlbi52YWx1ZTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgcmlnaHQgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKTtcblx0ICAgICAgICAgICAgICAgICAgICBleHByID0gdGhpcy5maW5hbGl6ZSh0aGlzLnN0YXJ0Tm9kZShzdGFydFRva2VuKSwgbmV3IE5vZGUuQXNzaWdubWVudEV4cHJlc3Npb24ob3BlcmF0b3IsIGV4cHIsIHJpZ2h0KSk7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpcnN0Q292ZXJJbml0aWFsaXplZE5hbWVFcnJvciA9IG51bGw7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGV4cHI7XG5cdCAgICB9O1xuXHQgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtY29tbWEtb3BlcmF0b3Jcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VFeHByZXNzaW9uID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBzdGFydFRva2VuID0gdGhpcy5sb29rYWhlYWQ7XG5cdCAgICAgICAgdmFyIGV4cHIgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKTtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaCgnLCcpKSB7XG5cdCAgICAgICAgICAgIHZhciBleHByZXNzaW9ucyA9IFtdO1xuXHQgICAgICAgICAgICBleHByZXNzaW9ucy5wdXNoKGV4cHIpO1xuXHQgICAgICAgICAgICB3aGlsZSAodGhpcy5sb29rYWhlYWQudHlwZSAhPT0gMiAvKiBFT0YgKi8pIHtcblx0ICAgICAgICAgICAgICAgIGlmICghdGhpcy5tYXRjaCgnLCcpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgZXhwcmVzc2lvbnMucHVzaCh0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZXhwciA9IHRoaXMuZmluYWxpemUodGhpcy5zdGFydE5vZGUoc3RhcnRUb2tlbiksIG5ldyBOb2RlLlNlcXVlbmNlRXhwcmVzc2lvbihleHByZXNzaW9ucykpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gZXhwcjtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1ibG9ja1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVN0YXRlbWVudExpc3RJdGVtID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBzdGF0ZW1lbnQ7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCA9IHRydWU7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmlzQmluZGluZ0VsZW1lbnQgPSB0cnVlO1xuXHQgICAgICAgIGlmICh0aGlzLmxvb2thaGVhZC50eXBlID09PSA0IC8qIEtleXdvcmQgKi8pIHtcblx0ICAgICAgICAgICAgc3dpdGNoICh0aGlzLmxvb2thaGVhZC52YWx1ZSkge1xuXHQgICAgICAgICAgICAgICAgY2FzZSAnZXhwb3J0Jzpcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29udGV4dC5pc01vZHVsZSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRoaXMubG9va2FoZWFkLCBtZXNzYWdlc18xLk1lc3NhZ2VzLklsbGVnYWxFeHBvcnREZWNsYXJhdGlvbik7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IHRoaXMucGFyc2VFeHBvcnREZWNsYXJhdGlvbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAnaW1wb3J0Jzpcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29udGV4dC5pc01vZHVsZSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRoaXMubG9va2FoZWFkLCBtZXNzYWdlc18xLk1lc3NhZ2VzLklsbGVnYWxJbXBvcnREZWNsYXJhdGlvbik7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IHRoaXMucGFyc2VJbXBvcnREZWNsYXJhdGlvbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAnY29uc3QnOlxuXHQgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IHRoaXMucGFyc2VMZXhpY2FsRGVjbGFyYXRpb24oeyBpbkZvcjogZmFsc2UgfSk7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG5cdCAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZUZ1bmN0aW9uRGVjbGFyYXRpb24oKTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgJ2NsYXNzJzpcblx0ICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlQ2xhc3NEZWNsYXJhdGlvbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAnbGV0Jzpcblx0ICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLmlzTGV4aWNhbERlY2xhcmF0aW9uKCkgPyB0aGlzLnBhcnNlTGV4aWNhbERlY2xhcmF0aW9uKHsgaW5Gb3I6IGZhbHNlIH0pIDogdGhpcy5wYXJzZVN0YXRlbWVudCgpO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlU3RhdGVtZW50KCk7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIHN0YXRlbWVudCA9IHRoaXMucGFyc2VTdGF0ZW1lbnQoKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHN0YXRlbWVudDtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQmxvY2sgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgneycpO1xuXHQgICAgICAgIHZhciBibG9jayA9IFtdO1xuXHQgICAgICAgIHdoaWxlICh0cnVlKSB7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCd9JykpIHtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGJsb2NrLnB1c2godGhpcy5wYXJzZVN0YXRlbWVudExpc3RJdGVtKCkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmV4cGVjdCgnfScpO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkJsb2NrU3RhdGVtZW50KGJsb2NrKSk7XG5cdCAgICB9O1xuXHQgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtbGV0LWFuZC1jb25zdC1kZWNsYXJhdGlvbnNcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VMZXhpY2FsQmluZGluZyA9IGZ1bmN0aW9uIChraW5kLCBvcHRpb25zKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgcGFyYW1zID0gW107XG5cdCAgICAgICAgdmFyIGlkID0gdGhpcy5wYXJzZVBhdHRlcm4ocGFyYW1zLCBraW5kKTtcblx0ICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCAmJiBpZC50eXBlID09PSBzeW50YXhfMS5TeW50YXguSWRlbnRpZmllcikge1xuXHQgICAgICAgICAgICBpZiAodGhpcy5zY2FubmVyLmlzUmVzdHJpY3RlZFdvcmQoaWQubmFtZSkpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdFZhck5hbWUpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBpbml0ID0gbnVsbDtcblx0ICAgICAgICBpZiAoa2luZCA9PT0gJ2NvbnN0Jykge1xuXHQgICAgICAgICAgICBpZiAoIXRoaXMubWF0Y2hLZXl3b3JkKCdpbicpICYmICF0aGlzLm1hdGNoQ29udGV4dHVhbEtleXdvcmQoJ29mJykpIHtcblx0ICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCc9JykpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIGluaXQgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudGhyb3dFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLkRlY2xhcmF0aW9uTWlzc2luZ0luaXRpYWxpemVyLCAnY29uc3QnKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmICgoIW9wdGlvbnMuaW5Gb3IgJiYgaWQudHlwZSAhPT0gc3ludGF4XzEuU3ludGF4LklkZW50aWZpZXIpIHx8IHRoaXMubWF0Y2goJz0nKSkge1xuXHQgICAgICAgICAgICB0aGlzLmV4cGVjdCgnPScpO1xuXHQgICAgICAgICAgICBpbml0ID0gdGhpcy5pc29sYXRlQ292ZXJHcmFtbWFyKHRoaXMucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbik7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLlZhcmlhYmxlRGVjbGFyYXRvcihpZCwgaW5pdCkpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VCaW5kaW5nTGlzdCA9IGZ1bmN0aW9uIChraW5kLCBvcHRpb25zKSB7XG5cdCAgICAgICAgdmFyIGxpc3QgPSBbdGhpcy5wYXJzZUxleGljYWxCaW5kaW5nKGtpbmQsIG9wdGlvbnMpXTtcblx0ICAgICAgICB3aGlsZSAodGhpcy5tYXRjaCgnLCcpKSB7XG5cdCAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLnBhcnNlTGV4aWNhbEJpbmRpbmcoa2luZCwgb3B0aW9ucykpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gbGlzdDtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLmlzTGV4aWNhbERlY2xhcmF0aW9uID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuc2Nhbm5lci5zYXZlU3RhdGUoKTtcblx0ICAgICAgICB0aGlzLnNjYW5uZXIuc2NhbkNvbW1lbnRzKCk7XG5cdCAgICAgICAgdmFyIG5leHQgPSB0aGlzLnNjYW5uZXIubGV4KCk7XG5cdCAgICAgICAgdGhpcy5zY2FubmVyLnJlc3RvcmVTdGF0ZShzdGF0ZSk7XG5cdCAgICAgICAgcmV0dXJuIChuZXh0LnR5cGUgPT09IDMgLyogSWRlbnRpZmllciAqLykgfHxcblx0ICAgICAgICAgICAgKG5leHQudHlwZSA9PT0gNyAvKiBQdW5jdHVhdG9yICovICYmIG5leHQudmFsdWUgPT09ICdbJykgfHxcblx0ICAgICAgICAgICAgKG5leHQudHlwZSA9PT0gNyAvKiBQdW5jdHVhdG9yICovICYmIG5leHQudmFsdWUgPT09ICd7JykgfHxcblx0ICAgICAgICAgICAgKG5leHQudHlwZSA9PT0gNCAvKiBLZXl3b3JkICovICYmIG5leHQudmFsdWUgPT09ICdsZXQnKSB8fFxuXHQgICAgICAgICAgICAobmV4dC50eXBlID09PSA0IC8qIEtleXdvcmQgKi8gJiYgbmV4dC52YWx1ZSA9PT0gJ3lpZWxkJyk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUxleGljYWxEZWNsYXJhdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIga2luZCA9IHRoaXMubmV4dFRva2VuKCkudmFsdWU7XG5cdCAgICAgICAgYXNzZXJ0XzEuYXNzZXJ0KGtpbmQgPT09ICdsZXQnIHx8IGtpbmQgPT09ICdjb25zdCcsICdMZXhpY2FsIGRlY2xhcmF0aW9uIG11c3QgYmUgZWl0aGVyIGxldCBvciBjb25zdCcpO1xuXHQgICAgICAgIHZhciBkZWNsYXJhdGlvbnMgPSB0aGlzLnBhcnNlQmluZGluZ0xpc3Qoa2luZCwgb3B0aW9ucyk7XG5cdCAgICAgICAgdGhpcy5jb25zdW1lU2VtaWNvbG9uKCk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuVmFyaWFibGVEZWNsYXJhdGlvbihkZWNsYXJhdGlvbnMsIGtpbmQpKTtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1kZXN0cnVjdHVyaW5nLWJpbmRpbmctcGF0dGVybnNcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VCaW5kaW5nUmVzdEVsZW1lbnQgPSBmdW5jdGlvbiAocGFyYW1zLCBraW5kKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgnLi4uJyk7XG5cdCAgICAgICAgdmFyIGFyZyA9IHRoaXMucGFyc2VQYXR0ZXJuKHBhcmFtcywga2luZCk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuUmVzdEVsZW1lbnQoYXJnKSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUFycmF5UGF0dGVybiA9IGZ1bmN0aW9uIChwYXJhbXMsIGtpbmQpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCdbJyk7XG5cdCAgICAgICAgdmFyIGVsZW1lbnRzID0gW107XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLm1hdGNoKCddJykpIHtcblx0ICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2goJywnKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2gobnVsbCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRjaCgnLi4uJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKHRoaXMucGFyc2VCaW5kaW5nUmVzdEVsZW1lbnQocGFyYW1zLCBraW5kKSk7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKHRoaXMucGFyc2VQYXR0ZXJuV2l0aERlZmF1bHQocGFyYW1zLCBraW5kKSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBpZiAoIXRoaXMubWF0Y2goJ10nKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwZWN0KCcsJyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJ10nKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5BcnJheVBhdHRlcm4oZWxlbWVudHMpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlUHJvcGVydHlQYXR0ZXJuID0gZnVuY3Rpb24gKHBhcmFtcywga2luZCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIGNvbXB1dGVkID0gZmFsc2U7XG5cdCAgICAgICAgdmFyIHNob3J0aGFuZCA9IGZhbHNlO1xuXHQgICAgICAgIHZhciBtZXRob2QgPSBmYWxzZTtcblx0ICAgICAgICB2YXIga2V5O1xuXHQgICAgICAgIHZhciB2YWx1ZTtcblx0ICAgICAgICBpZiAodGhpcy5sb29rYWhlYWQudHlwZSA9PT0gMyAvKiBJZGVudGlmaWVyICovKSB7XG5cdCAgICAgICAgICAgIHZhciBrZXlUb2tlbiA9IHRoaXMubG9va2FoZWFkO1xuXHQgICAgICAgICAgICBrZXkgPSB0aGlzLnBhcnNlVmFyaWFibGVJZGVudGlmaWVyKCk7XG5cdCAgICAgICAgICAgIHZhciBpbml0ID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5JZGVudGlmaWVyKGtleVRva2VuLnZhbHVlKSk7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCc9JykpIHtcblx0ICAgICAgICAgICAgICAgIHBhcmFtcy5wdXNoKGtleVRva2VuKTtcblx0ICAgICAgICAgICAgICAgIHNob3J0aGFuZCA9IHRydWU7XG5cdCAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgdmFyIGV4cHIgPSB0aGlzLnBhcnNlQXNzaWdubWVudEV4cHJlc3Npb24oKTtcblx0ICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5maW5hbGl6ZSh0aGlzLnN0YXJ0Tm9kZShrZXlUb2tlbiksIG5ldyBOb2RlLkFzc2lnbm1lbnRQYXR0ZXJuKGluaXQsIGV4cHIpKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmICghdGhpcy5tYXRjaCgnOicpKSB7XG5cdCAgICAgICAgICAgICAgICBwYXJhbXMucHVzaChrZXlUb2tlbik7XG5cdCAgICAgICAgICAgICAgICBzaG9ydGhhbmQgPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgdmFsdWUgPSBpbml0O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJzonKTtcblx0ICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5wYXJzZVBhdHRlcm5XaXRoRGVmYXVsdChwYXJhbXMsIGtpbmQpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICBjb21wdXRlZCA9IHRoaXMubWF0Y2goJ1snKTtcblx0ICAgICAgICAgICAga2V5ID0gdGhpcy5wYXJzZU9iamVjdFByb3BlcnR5S2V5KCk7XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0KCc6Jyk7XG5cdCAgICAgICAgICAgIHZhbHVlID0gdGhpcy5wYXJzZVBhdHRlcm5XaXRoRGVmYXVsdChwYXJhbXMsIGtpbmQpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5Qcm9wZXJ0eSgnaW5pdCcsIGtleSwgY29tcHV0ZWQsIHZhbHVlLCBtZXRob2QsIHNob3J0aGFuZCkpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VPYmplY3RQYXR0ZXJuID0gZnVuY3Rpb24gKHBhcmFtcywga2luZCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBbXTtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgneycpO1xuXHQgICAgICAgIHdoaWxlICghdGhpcy5tYXRjaCgnfScpKSB7XG5cdCAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaCh0aGlzLnBhcnNlUHJvcGVydHlQYXR0ZXJuKHBhcmFtcywga2luZCkpO1xuXHQgICAgICAgICAgICBpZiAoIXRoaXMubWF0Y2goJ30nKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJywnKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmV4cGVjdCgnfScpO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLk9iamVjdFBhdHRlcm4ocHJvcGVydGllcykpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VQYXR0ZXJuID0gZnVuY3Rpb24gKHBhcmFtcywga2luZCkge1xuXHQgICAgICAgIHZhciBwYXR0ZXJuO1xuXHQgICAgICAgIGlmICh0aGlzLm1hdGNoKCdbJykpIHtcblx0ICAgICAgICAgICAgcGF0dGVybiA9IHRoaXMucGFyc2VBcnJheVBhdHRlcm4ocGFyYW1zLCBraW5kKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSBpZiAodGhpcy5tYXRjaCgneycpKSB7XG5cdCAgICAgICAgICAgIHBhdHRlcm4gPSB0aGlzLnBhcnNlT2JqZWN0UGF0dGVybihwYXJhbXMsIGtpbmQpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2hLZXl3b3JkKCdsZXQnKSAmJiAoa2luZCA9PT0gJ2NvbnN0JyB8fCBraW5kID09PSAnbGV0JykpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4odGhpcy5sb29rYWhlYWQsIG1lc3NhZ2VzXzEuTWVzc2FnZXMuTGV0SW5MZXhpY2FsQmluZGluZyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcGFyYW1zLnB1c2godGhpcy5sb29rYWhlYWQpO1xuXHQgICAgICAgICAgICBwYXR0ZXJuID0gdGhpcy5wYXJzZVZhcmlhYmxlSWRlbnRpZmllcihraW5kKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHBhdHRlcm47XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVBhdHRlcm5XaXRoRGVmYXVsdCA9IGZ1bmN0aW9uIChwYXJhbXMsIGtpbmQpIHtcblx0ICAgICAgICB2YXIgc3RhcnRUb2tlbiA9IHRoaXMubG9va2FoZWFkO1xuXHQgICAgICAgIHZhciBwYXR0ZXJuID0gdGhpcy5wYXJzZVBhdHRlcm4ocGFyYW1zLCBraW5kKTtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaCgnPScpKSB7XG5cdCAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgIHZhciBwcmV2aW91c0FsbG93WWllbGQgPSB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZDtcblx0ICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93WWllbGQgPSB0cnVlO1xuXHQgICAgICAgICAgICB2YXIgcmlnaHQgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKTtcblx0ICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93WWllbGQgPSBwcmV2aW91c0FsbG93WWllbGQ7XG5cdCAgICAgICAgICAgIHBhdHRlcm4gPSB0aGlzLmZpbmFsaXplKHRoaXMuc3RhcnROb2RlKHN0YXJ0VG9rZW4pLCBuZXcgTm9kZS5Bc3NpZ25tZW50UGF0dGVybihwYXR0ZXJuLCByaWdodCkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcGF0dGVybjtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy12YXJpYWJsZS1zdGF0ZW1lbnRcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VWYXJpYWJsZUlkZW50aWZpZXIgPSBmdW5jdGlvbiAoa2luZCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIHRva2VuID0gdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gNCAvKiBLZXl3b3JkICovICYmIHRva2VuLnZhbHVlID09PSAneWllbGQnKSB7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLmNvbnRleHQuc3RyaWN0KSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRva2VuLCBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdFJlc2VydmVkV29yZCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMuY29udGV4dC5hbGxvd1lpZWxkKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRva2VuKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmICh0b2tlbi50eXBlICE9PSAzIC8qIElkZW50aWZpZXIgKi8pIHtcblx0ICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QgJiYgdG9rZW4udHlwZSA9PT0gNCAvKiBLZXl3b3JkICovICYmIHRoaXMuc2Nhbm5lci5pc1N0cmljdE1vZGVSZXNlcnZlZFdvcmQodG9rZW4udmFsdWUpKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRva2VuLCBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdFJlc2VydmVkV29yZCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCB8fCB0b2tlbi52YWx1ZSAhPT0gJ2xldCcgfHwga2luZCAhPT0gJ3ZhcicpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRva2VuKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmICgodGhpcy5jb250ZXh0LmlzTW9kdWxlIHx8IHRoaXMuY29udGV4dC5hd2FpdCkgJiYgdG9rZW4udHlwZSA9PT0gMyAvKiBJZGVudGlmaWVyICovICYmIHRva2VuLnZhbHVlID09PSAnYXdhaXQnKSB7XG5cdCAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4odG9rZW4pO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5JZGVudGlmaWVyKHRva2VuLnZhbHVlKSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVZhcmlhYmxlRGVjbGFyYXRpb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIHBhcmFtcyA9IFtdO1xuXHQgICAgICAgIHZhciBpZCA9IHRoaXMucGFyc2VQYXR0ZXJuKHBhcmFtcywgJ3ZhcicpO1xuXHQgICAgICAgIGlmICh0aGlzLmNvbnRleHQuc3RyaWN0ICYmIGlkLnR5cGUgPT09IHN5bnRheF8xLlN5bnRheC5JZGVudGlmaWVyKSB7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLnNjYW5uZXIuaXNSZXN0cmljdGVkV29yZChpZC5uYW1lKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZUVycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0VmFyTmFtZSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGluaXQgPSBudWxsO1xuXHQgICAgICAgIGlmICh0aGlzLm1hdGNoKCc9JykpIHtcblx0ICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgaW5pdCA9IHRoaXMuaXNvbGF0ZUNvdmVyR3JhbW1hcih0aGlzLnBhcnNlQXNzaWdubWVudEV4cHJlc3Npb24pO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmIChpZC50eXBlICE9PSBzeW50YXhfMS5TeW50YXguSWRlbnRpZmllciAmJiAhb3B0aW9ucy5pbkZvcikge1xuXHQgICAgICAgICAgICB0aGlzLmV4cGVjdCgnPScpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5WYXJpYWJsZURlY2xhcmF0b3IoaWQsIGluaXQpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlVmFyaWFibGVEZWNsYXJhdGlvbkxpc3QgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHQgICAgICAgIHZhciBvcHQgPSB7IGluRm9yOiBvcHRpb25zLmluRm9yIH07XG5cdCAgICAgICAgdmFyIGxpc3QgPSBbXTtcblx0ICAgICAgICBsaXN0LnB1c2godGhpcy5wYXJzZVZhcmlhYmxlRGVjbGFyYXRpb24ob3B0KSk7XG5cdCAgICAgICAgd2hpbGUgKHRoaXMubWF0Y2goJywnKSkge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICBsaXN0LnB1c2godGhpcy5wYXJzZVZhcmlhYmxlRGVjbGFyYXRpb24ob3B0KSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBsaXN0O1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VWYXJpYWJsZVN0YXRlbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0S2V5d29yZCgndmFyJyk7XG5cdCAgICAgICAgdmFyIGRlY2xhcmF0aW9ucyA9IHRoaXMucGFyc2VWYXJpYWJsZURlY2xhcmF0aW9uTGlzdCh7IGluRm9yOiBmYWxzZSB9KTtcblx0ICAgICAgICB0aGlzLmNvbnN1bWVTZW1pY29sb24oKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5WYXJpYWJsZURlY2xhcmF0aW9uKGRlY2xhcmF0aW9ucywgJ3ZhcicpKTtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1lbXB0eS1zdGF0ZW1lbnRcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VFbXB0eVN0YXRlbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCc7Jyk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuRW1wdHlTdGF0ZW1lbnQoKSk7XG5cdCAgICB9O1xuXHQgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZXhwcmVzc2lvbi1zdGF0ZW1lbnRcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VFeHByZXNzaW9uU3RhdGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIGV4cHIgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuXHQgICAgICAgIHRoaXMuY29uc3VtZVNlbWljb2xvbigpO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkV4cHJlc3Npb25TdGF0ZW1lbnQoZXhwcikpO1xuXHQgICAgfTtcblx0ICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWlmLXN0YXRlbWVudFxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUlmQ2xhdXNlID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmICh0aGlzLmNvbnRleHQuc3RyaWN0ICYmIHRoaXMubWF0Y2hLZXl3b3JkKCdmdW5jdGlvbicpKSB7XG5cdCAgICAgICAgICAgIHRoaXMudG9sZXJhdGVFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdEZ1bmN0aW9uKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VTdGF0ZW1lbnQoKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlSWZTdGF0ZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgY29uc2VxdWVudDtcblx0ICAgICAgICB2YXIgYWx0ZXJuYXRlID0gbnVsbDtcblx0ICAgICAgICB0aGlzLmV4cGVjdEtleXdvcmQoJ2lmJyk7XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJygnKTtcblx0ICAgICAgICB2YXIgdGVzdCA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG5cdCAgICAgICAgaWYgKCF0aGlzLm1hdGNoKCcpJykgJiYgdGhpcy5jb25maWcudG9sZXJhbnQpIHtcblx0ICAgICAgICAgICAgdGhpcy50b2xlcmF0ZVVuZXhwZWN0ZWRUb2tlbih0aGlzLm5leHRUb2tlbigpKTtcblx0ICAgICAgICAgICAgY29uc2VxdWVudCA9IHRoaXMuZmluYWxpemUodGhpcy5jcmVhdGVOb2RlKCksIG5ldyBOb2RlLkVtcHR5U3RhdGVtZW50KCkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdGhpcy5leHBlY3QoJyknKTtcblx0ICAgICAgICAgICAgY29uc2VxdWVudCA9IHRoaXMucGFyc2VJZkNsYXVzZSgpO1xuXHQgICAgICAgICAgICBpZiAodGhpcy5tYXRjaEtleXdvcmQoJ2Vsc2UnKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgIGFsdGVybmF0ZSA9IHRoaXMucGFyc2VJZkNsYXVzZSgpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLklmU3RhdGVtZW50KHRlc3QsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSkpO1xuXHQgICAgfTtcblx0ICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWRvLXdoaWxlLXN0YXRlbWVudFxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZURvV2hpbGVTdGF0ZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdEtleXdvcmQoJ2RvJyk7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzSW5JdGVyYXRpb24gPSB0aGlzLmNvbnRleHQuaW5JdGVyYXRpb247XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmluSXRlcmF0aW9uID0gdHJ1ZTtcblx0ICAgICAgICB2YXIgYm9keSA9IHRoaXMucGFyc2VTdGF0ZW1lbnQoKTtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuaW5JdGVyYXRpb24gPSBwcmV2aW91c0luSXRlcmF0aW9uO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0S2V5d29yZCgnd2hpbGUnKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgnKCcpO1xuXHQgICAgICAgIHZhciB0ZXN0ID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcblx0ICAgICAgICBpZiAoIXRoaXMubWF0Y2goJyknKSAmJiB0aGlzLmNvbmZpZy50b2xlcmFudCkge1xuXHQgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRoaXMubmV4dFRva2VuKCkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdGhpcy5leHBlY3QoJyknKTtcblx0ICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2goJzsnKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5Eb1doaWxlU3RhdGVtZW50KGJvZHksIHRlc3QpKTtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy13aGlsZS1zdGF0ZW1lbnRcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VXaGlsZVN0YXRlbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHZhciBib2R5O1xuXHQgICAgICAgIHRoaXMuZXhwZWN0S2V5d29yZCgnd2hpbGUnKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgnKCcpO1xuXHQgICAgICAgIHZhciB0ZXN0ID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcblx0ICAgICAgICBpZiAoIXRoaXMubWF0Y2goJyknKSAmJiB0aGlzLmNvbmZpZy50b2xlcmFudCkge1xuXHQgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRoaXMubmV4dFRva2VuKCkpO1xuXHQgICAgICAgICAgICBib2R5ID0gdGhpcy5maW5hbGl6ZSh0aGlzLmNyZWF0ZU5vZGUoKSwgbmV3IE5vZGUuRW1wdHlTdGF0ZW1lbnQoKSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICB0aGlzLmV4cGVjdCgnKScpO1xuXHQgICAgICAgICAgICB2YXIgcHJldmlvdXNJbkl0ZXJhdGlvbiA9IHRoaXMuY29udGV4dC5pbkl0ZXJhdGlvbjtcblx0ICAgICAgICAgICAgdGhpcy5jb250ZXh0LmluSXRlcmF0aW9uID0gdHJ1ZTtcblx0ICAgICAgICAgICAgYm9keSA9IHRoaXMucGFyc2VTdGF0ZW1lbnQoKTtcblx0ICAgICAgICAgICAgdGhpcy5jb250ZXh0LmluSXRlcmF0aW9uID0gcHJldmlvdXNJbkl0ZXJhdGlvbjtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuV2hpbGVTdGF0ZW1lbnQodGVzdCwgYm9keSkpO1xuXHQgICAgfTtcblx0ICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWZvci1zdGF0ZW1lbnRcblx0ICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWZvci1pbi1hbmQtZm9yLW9mLXN0YXRlbWVudHNcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VGb3JTdGF0ZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGluaXQgPSBudWxsO1xuXHQgICAgICAgIHZhciB0ZXN0ID0gbnVsbDtcblx0ICAgICAgICB2YXIgdXBkYXRlID0gbnVsbDtcblx0ICAgICAgICB2YXIgZm9ySW4gPSB0cnVlO1xuXHQgICAgICAgIHZhciBsZWZ0LCByaWdodDtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0S2V5d29yZCgnZm9yJyk7XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJygnKTtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaCgnOycpKSB7XG5cdCAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICBpZiAodGhpcy5tYXRjaEtleXdvcmQoJ3ZhcicpKSB7XG5cdCAgICAgICAgICAgICAgICBpbml0ID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgdmFyIHByZXZpb3VzQWxsb3dJbiA9IHRoaXMuY29udGV4dC5hbGxvd0luO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93SW4gPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIHZhciBkZWNsYXJhdGlvbnMgPSB0aGlzLnBhcnNlVmFyaWFibGVEZWNsYXJhdGlvbkxpc3QoeyBpbkZvcjogdHJ1ZSB9KTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd0luID0gcHJldmlvdXNBbGxvd0luO1xuXHQgICAgICAgICAgICAgICAgaWYgKGRlY2xhcmF0aW9ucy5sZW5ndGggPT09IDEgJiYgdGhpcy5tYXRjaEtleXdvcmQoJ2luJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZGVjbCA9IGRlY2xhcmF0aW9uc1swXTtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoZGVjbC5pbml0ICYmIChkZWNsLmlkLnR5cGUgPT09IHN5bnRheF8xLlN5bnRheC5BcnJheVBhdHRlcm4gfHwgZGVjbC5pZC50eXBlID09PSBzeW50YXhfMS5TeW50YXguT2JqZWN0UGF0dGVybiB8fCB0aGlzLmNvbnRleHQuc3RyaWN0KSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlRXJyb3IobWVzc2FnZXNfMS5NZXNzYWdlcy5Gb3JJbk9mTG9vcEluaXRpYWxpemVyLCAnZm9yLWluJyk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIGluaXQgPSB0aGlzLmZpbmFsaXplKGluaXQsIG5ldyBOb2RlLlZhcmlhYmxlRGVjbGFyYXRpb24oZGVjbGFyYXRpb25zLCAndmFyJykpO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGluaXQ7XG5cdCAgICAgICAgICAgICAgICAgICAgcmlnaHQgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIGluaXQgPSBudWxsO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGVjbGFyYXRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZWNsYXJhdGlvbnNbMF0uaW5pdCA9PT0gbnVsbCAmJiB0aGlzLm1hdGNoQ29udGV4dHVhbEtleXdvcmQoJ29mJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpbml0ID0gdGhpcy5maW5hbGl6ZShpbml0LCBuZXcgTm9kZS5WYXJpYWJsZURlY2xhcmF0aW9uKGRlY2xhcmF0aW9ucywgJ3ZhcicpKTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIGxlZnQgPSBpbml0O1xuXHQgICAgICAgICAgICAgICAgICAgIHJpZ2h0ID0gdGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgaW5pdCA9IG51bGw7XG5cdCAgICAgICAgICAgICAgICAgICAgZm9ySW4gPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIGluaXQgPSB0aGlzLmZpbmFsaXplKGluaXQsIG5ldyBOb2RlLlZhcmlhYmxlRGVjbGFyYXRpb24oZGVjbGFyYXRpb25zLCAndmFyJykpO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwZWN0KCc7Jyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tYXRjaEtleXdvcmQoJ2NvbnN0JykgfHwgdGhpcy5tYXRjaEtleXdvcmQoJ2xldCcpKSB7XG5cdCAgICAgICAgICAgICAgICBpbml0ID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgICAgICAgICB2YXIga2luZCA9IHRoaXMubmV4dFRva2VuKCkudmFsdWU7XG5cdCAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29udGV4dC5zdHJpY3QgJiYgdGhpcy5sb29rYWhlYWQudmFsdWUgPT09ICdpbicpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpbml0ID0gdGhpcy5maW5hbGl6ZShpbml0LCBuZXcgTm9kZS5JZGVudGlmaWVyKGtpbmQpKTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIGxlZnQgPSBpbml0O1xuXHQgICAgICAgICAgICAgICAgICAgIHJpZ2h0ID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcblx0ICAgICAgICAgICAgICAgICAgICBpbml0ID0gbnVsbDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBwcmV2aW91c0FsbG93SW4gPSB0aGlzLmNvbnRleHQuYWxsb3dJbjtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dJbiA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBkZWNsYXJhdGlvbnMgPSB0aGlzLnBhcnNlQmluZGluZ0xpc3Qoa2luZCwgeyBpbkZvcjogdHJ1ZSB9KTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dJbiA9IHByZXZpb3VzQWxsb3dJbjtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoZGVjbGFyYXRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZWNsYXJhdGlvbnNbMF0uaW5pdCA9PT0gbnVsbCAmJiB0aGlzLm1hdGNoS2V5d29yZCgnaW4nKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBpbml0ID0gdGhpcy5maW5hbGl6ZShpbml0LCBuZXcgTm9kZS5WYXJpYWJsZURlY2xhcmF0aW9uKGRlY2xhcmF0aW9ucywga2luZCkpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gaW5pdDtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBpbml0ID0gbnVsbDtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGVjbGFyYXRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZWNsYXJhdGlvbnNbMF0uaW5pdCA9PT0gbnVsbCAmJiB0aGlzLm1hdGNoQ29udGV4dHVhbEtleXdvcmQoJ29mJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgaW5pdCA9IHRoaXMuZmluYWxpemUoaW5pdCwgbmV3IE5vZGUuVmFyaWFibGVEZWNsYXJhdGlvbihkZWNsYXJhdGlvbnMsIGtpbmQpKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGluaXQ7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0ID0gdGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGluaXQgPSBudWxsO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBmb3JJbiA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lU2VtaWNvbG9uKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGluaXQgPSB0aGlzLmZpbmFsaXplKGluaXQsIG5ldyBOb2RlLlZhcmlhYmxlRGVjbGFyYXRpb24oZGVjbGFyYXRpb25zLCBraW5kKSk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdmFyIGluaXRTdGFydFRva2VuID0gdGhpcy5sb29rYWhlYWQ7XG5cdCAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXNBbGxvd0luID0gdGhpcy5jb250ZXh0LmFsbG93SW47XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dJbiA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgaW5pdCA9IHRoaXMuaW5oZXJpdENvdmVyR3JhbW1hcih0aGlzLnBhcnNlQXNzaWdubWVudEV4cHJlc3Npb24pO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93SW4gPSBwcmV2aW91c0FsbG93SW47XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRjaEtleXdvcmQoJ2luJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29udGV4dC5pc0Fzc2lnbm1lbnRUYXJnZXQgfHwgaW5pdC50eXBlID09PSBzeW50YXhfMS5TeW50YXguQXNzaWdubWVudEV4cHJlc3Npb24pIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZUVycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuSW52YWxpZExIU0luRm9ySW4pO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMucmVpbnRlcnByZXRFeHByZXNzaW9uQXNQYXR0ZXJuKGluaXQpO1xuXHQgICAgICAgICAgICAgICAgICAgIGxlZnQgPSBpbml0O1xuXHQgICAgICAgICAgICAgICAgICAgIHJpZ2h0ID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcblx0ICAgICAgICAgICAgICAgICAgICBpbml0ID0gbnVsbDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubWF0Y2hDb250ZXh0dWFsS2V5d29yZCgnb2YnKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb250ZXh0LmlzQXNzaWdubWVudFRhcmdldCB8fCBpbml0LnR5cGUgPT09IHN5bnRheF8xLlN5bnRheC5Bc3NpZ25tZW50RXhwcmVzc2lvbikge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlRXJyb3IobWVzc2FnZXNfMS5NZXNzYWdlcy5JbnZhbGlkTEhTSW5Gb3JMb29wKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnJlaW50ZXJwcmV0RXhwcmVzc2lvbkFzUGF0dGVybihpbml0KTtcblx0ICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gaW5pdDtcblx0ICAgICAgICAgICAgICAgICAgICByaWdodCA9IHRoaXMucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIGluaXQgPSBudWxsO1xuXHQgICAgICAgICAgICAgICAgICAgIGZvckluID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRjaCgnLCcpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbml0U2VxID0gW2luaXRdO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5tYXRjaCgnLCcpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFNlcS5wdXNoKHRoaXMuaXNvbGF0ZUNvdmVyR3JhbW1hcih0aGlzLnBhcnNlQXNzaWdubWVudEV4cHJlc3Npb24pKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICBpbml0ID0gdGhpcy5maW5hbGl6ZSh0aGlzLnN0YXJ0Tm9kZShpbml0U3RhcnRUb2tlbiksIG5ldyBOb2RlLlNlcXVlbmNlRXhwcmVzc2lvbihpbml0U2VxKSk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwZWN0KCc7Jyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKHR5cGVvZiBsZWZ0ID09PSAndW5kZWZpbmVkJykge1xuXHQgICAgICAgICAgICBpZiAoIXRoaXMubWF0Y2goJzsnKSkge1xuXHQgICAgICAgICAgICAgICAgdGVzdCA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGhpcy5leHBlY3QoJzsnKTtcblx0ICAgICAgICAgICAgaWYgKCF0aGlzLm1hdGNoKCcpJykpIHtcblx0ICAgICAgICAgICAgICAgIHVwZGF0ZSA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGJvZHk7XG5cdCAgICAgICAgaWYgKCF0aGlzLm1hdGNoKCcpJykgJiYgdGhpcy5jb25maWcudG9sZXJhbnQpIHtcblx0ICAgICAgICAgICAgdGhpcy50b2xlcmF0ZVVuZXhwZWN0ZWRUb2tlbih0aGlzLm5leHRUb2tlbigpKTtcblx0ICAgICAgICAgICAgYm9keSA9IHRoaXMuZmluYWxpemUodGhpcy5jcmVhdGVOb2RlKCksIG5ldyBOb2RlLkVtcHR5U3RhdGVtZW50KCkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdGhpcy5leHBlY3QoJyknKTtcblx0ICAgICAgICAgICAgdmFyIHByZXZpb3VzSW5JdGVyYXRpb24gPSB0aGlzLmNvbnRleHQuaW5JdGVyYXRpb247XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5pbkl0ZXJhdGlvbiA9IHRydWU7XG5cdCAgICAgICAgICAgIGJvZHkgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZVN0YXRlbWVudCk7XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5pbkl0ZXJhdGlvbiA9IHByZXZpb3VzSW5JdGVyYXRpb247XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiAodHlwZW9mIGxlZnQgPT09ICd1bmRlZmluZWQnKSA/XG5cdCAgICAgICAgICAgIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuRm9yU3RhdGVtZW50KGluaXQsIHRlc3QsIHVwZGF0ZSwgYm9keSkpIDpcblx0ICAgICAgICAgICAgZm9ySW4gPyB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkZvckluU3RhdGVtZW50KGxlZnQsIHJpZ2h0LCBib2R5KSkgOlxuXHQgICAgICAgICAgICAgICAgdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5Gb3JPZlN0YXRlbWVudChsZWZ0LCByaWdodCwgYm9keSkpO1xuXHQgICAgfTtcblx0ICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWNvbnRpbnVlLXN0YXRlbWVudFxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUNvbnRpbnVlU3RhdGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RLZXl3b3JkKCdjb250aW51ZScpO1xuXHQgICAgICAgIHZhciBsYWJlbCA9IG51bGw7XG5cdCAgICAgICAgaWYgKHRoaXMubG9va2FoZWFkLnR5cGUgPT09IDMgLyogSWRlbnRpZmllciAqLyAmJiAhdGhpcy5oYXNMaW5lVGVybWluYXRvcikge1xuXHQgICAgICAgICAgICB2YXIgaWQgPSB0aGlzLnBhcnNlVmFyaWFibGVJZGVudGlmaWVyKCk7XG5cdCAgICAgICAgICAgIGxhYmVsID0gaWQ7XG5cdCAgICAgICAgICAgIHZhciBrZXkgPSAnJCcgKyBpZC5uYW1lO1xuXHQgICAgICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmNvbnRleHQubGFiZWxTZXQsIGtleSkpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMudGhyb3dFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLlVua25vd25MYWJlbCwgaWQubmFtZSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5jb25zdW1lU2VtaWNvbG9uKCk7XG5cdCAgICAgICAgaWYgKGxhYmVsID09PSBudWxsICYmICF0aGlzLmNvbnRleHQuaW5JdGVyYXRpb24pIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd0Vycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuSWxsZWdhbENvbnRpbnVlKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuQ29udGludWVTdGF0ZW1lbnQobGFiZWwpKTtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1icmVhay1zdGF0ZW1lbnRcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VCcmVha1N0YXRlbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0S2V5d29yZCgnYnJlYWsnKTtcblx0ICAgICAgICB2YXIgbGFiZWwgPSBudWxsO1xuXHQgICAgICAgIGlmICh0aGlzLmxvb2thaGVhZC50eXBlID09PSAzIC8qIElkZW50aWZpZXIgKi8gJiYgIXRoaXMuaGFzTGluZVRlcm1pbmF0b3IpIHtcblx0ICAgICAgICAgICAgdmFyIGlkID0gdGhpcy5wYXJzZVZhcmlhYmxlSWRlbnRpZmllcigpO1xuXHQgICAgICAgICAgICB2YXIga2V5ID0gJyQnICsgaWQubmFtZTtcblx0ICAgICAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5jb250ZXh0LmxhYmVsU2V0LCBrZXkpKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRocm93RXJyb3IobWVzc2FnZXNfMS5NZXNzYWdlcy5Vbmtub3duTGFiZWwsIGlkLm5hbWUpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGxhYmVsID0gaWQ7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMuY29uc3VtZVNlbWljb2xvbigpO1xuXHQgICAgICAgIGlmIChsYWJlbCA9PT0gbnVsbCAmJiAhdGhpcy5jb250ZXh0LmluSXRlcmF0aW9uICYmICF0aGlzLmNvbnRleHQuaW5Td2l0Y2gpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd0Vycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuSWxsZWdhbEJyZWFrKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuQnJlYWtTdGF0ZW1lbnQobGFiZWwpKTtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1yZXR1cm4tc3RhdGVtZW50XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlUmV0dXJuU3RhdGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmICghdGhpcy5jb250ZXh0LmluRnVuY3Rpb25Cb2R5KSB7XG5cdCAgICAgICAgICAgIHRoaXMudG9sZXJhdGVFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLklsbGVnYWxSZXR1cm4pO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0S2V5d29yZCgncmV0dXJuJyk7XG5cdCAgICAgICAgdmFyIGhhc0FyZ3VtZW50ID0gKCF0aGlzLm1hdGNoKCc7JykgJiYgIXRoaXMubWF0Y2goJ30nKSAmJlxuXHQgICAgICAgICAgICAhdGhpcy5oYXNMaW5lVGVybWluYXRvciAmJiB0aGlzLmxvb2thaGVhZC50eXBlICE9PSAyIC8qIEVPRiAqLykgfHxcblx0ICAgICAgICAgICAgdGhpcy5sb29rYWhlYWQudHlwZSA9PT0gOCAvKiBTdHJpbmdMaXRlcmFsICovIHx8XG5cdCAgICAgICAgICAgIHRoaXMubG9va2FoZWFkLnR5cGUgPT09IDEwIC8qIFRlbXBsYXRlICovO1xuXHQgICAgICAgIHZhciBhcmd1bWVudCA9IGhhc0FyZ3VtZW50ID8gdGhpcy5wYXJzZUV4cHJlc3Npb24oKSA6IG51bGw7XG5cdCAgICAgICAgdGhpcy5jb25zdW1lU2VtaWNvbG9uKCk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuUmV0dXJuU3RhdGVtZW50KGFyZ3VtZW50KSk7XG5cdCAgICB9O1xuXHQgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtd2l0aC1zdGF0ZW1lbnRcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VXaXRoU3RhdGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmICh0aGlzLmNvbnRleHQuc3RyaWN0KSB7XG5cdCAgICAgICAgICAgIHRoaXMudG9sZXJhdGVFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdE1vZGVXaXRoKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgYm9keTtcblx0ICAgICAgICB0aGlzLmV4cGVjdEtleXdvcmQoJ3dpdGgnKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgnKCcpO1xuXHQgICAgICAgIHZhciBvYmplY3QgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuXHQgICAgICAgIGlmICghdGhpcy5tYXRjaCgnKScpICYmIHRoaXMuY29uZmlnLnRvbGVyYW50KSB7XG5cdCAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4odGhpcy5uZXh0VG9rZW4oKSk7XG5cdCAgICAgICAgICAgIGJvZHkgPSB0aGlzLmZpbmFsaXplKHRoaXMuY3JlYXRlTm9kZSgpLCBuZXcgTm9kZS5FbXB0eVN0YXRlbWVudCgpKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0KCcpJyk7XG5cdCAgICAgICAgICAgIGJvZHkgPSB0aGlzLnBhcnNlU3RhdGVtZW50KCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLldpdGhTdGF0ZW1lbnQob2JqZWN0LCBib2R5KSk7XG5cdCAgICB9O1xuXHQgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3dpdGNoLXN0YXRlbWVudFxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVN3aXRjaENhc2UgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgdGVzdDtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaEtleXdvcmQoJ2RlZmF1bHQnKSkge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICB0ZXN0ID0gbnVsbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0S2V5d29yZCgnY2FzZScpO1xuXHQgICAgICAgICAgICB0ZXN0ID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJzonKTtcblx0ICAgICAgICB2YXIgY29uc2VxdWVudCA9IFtdO1xuXHQgICAgICAgIHdoaWxlICh0cnVlKSB7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCd9JykgfHwgdGhpcy5tYXRjaEtleXdvcmQoJ2RlZmF1bHQnKSB8fCB0aGlzLm1hdGNoS2V5d29yZCgnY2FzZScpKSB7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBjb25zZXF1ZW50LnB1c2godGhpcy5wYXJzZVN0YXRlbWVudExpc3RJdGVtKCkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5Td2l0Y2hDYXNlKHRlc3QsIGNvbnNlcXVlbnQpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlU3dpdGNoU3RhdGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RLZXl3b3JkKCdzd2l0Y2gnKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgnKCcpO1xuXHQgICAgICAgIHZhciBkaXNjcmltaW5hbnQgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCcpJyk7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzSW5Td2l0Y2ggPSB0aGlzLmNvbnRleHQuaW5Td2l0Y2g7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmluU3dpdGNoID0gdHJ1ZTtcblx0ICAgICAgICB2YXIgY2FzZXMgPSBbXTtcblx0ICAgICAgICB2YXIgZGVmYXVsdEZvdW5kID0gZmFsc2U7XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJ3snKTtcblx0ICAgICAgICB3aGlsZSAodHJ1ZSkge1xuXHQgICAgICAgICAgICBpZiAodGhpcy5tYXRjaCgnfScpKSB7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIgY2xhdXNlID0gdGhpcy5wYXJzZVN3aXRjaENhc2UoKTtcblx0ICAgICAgICAgICAgaWYgKGNsYXVzZS50ZXN0ID09PSBudWxsKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdEZvdW5kKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy50aHJvd0Vycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuTXVsdGlwbGVEZWZhdWx0c0luU3dpdGNoKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGRlZmF1bHRGb3VuZCA9IHRydWU7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgY2FzZXMucHVzaChjbGF1c2UpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmV4cGVjdCgnfScpO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5pblN3aXRjaCA9IHByZXZpb3VzSW5Td2l0Y2g7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuU3dpdGNoU3RhdGVtZW50KGRpc2NyaW1pbmFudCwgY2FzZXMpKTtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1sYWJlbGxlZC1zdGF0ZW1lbnRzXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlTGFiZWxsZWRTdGF0ZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgZXhwciA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG5cdCAgICAgICAgdmFyIHN0YXRlbWVudDtcblx0ICAgICAgICBpZiAoKGV4cHIudHlwZSA9PT0gc3ludGF4XzEuU3ludGF4LklkZW50aWZpZXIpICYmIHRoaXMubWF0Y2goJzonKSkge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICB2YXIgaWQgPSBleHByO1xuXHQgICAgICAgICAgICB2YXIga2V5ID0gJyQnICsgaWQubmFtZTtcblx0ICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmNvbnRleHQubGFiZWxTZXQsIGtleSkpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMudGhyb3dFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLlJlZGVjbGFyYXRpb24sICdMYWJlbCcsIGlkLm5hbWUpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5sYWJlbFNldFtrZXldID0gdHJ1ZTtcblx0ICAgICAgICAgICAgdmFyIGJvZHkgPSB2b2lkIDA7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoS2V5d29yZCgnY2xhc3MnKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZVVuZXhwZWN0ZWRUb2tlbih0aGlzLmxvb2thaGVhZCk7XG5cdCAgICAgICAgICAgICAgICBib2R5ID0gdGhpcy5wYXJzZUNsYXNzRGVjbGFyYXRpb24oKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1hdGNoS2V5d29yZCgnZnVuY3Rpb24nKSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIHRva2VuID0gdGhpcy5sb29rYWhlYWQ7XG5cdCAgICAgICAgICAgICAgICB2YXIgZGVjbGFyYXRpb24gPSB0aGlzLnBhcnNlRnVuY3Rpb25EZWNsYXJhdGlvbigpO1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRva2VuLCBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdEZ1bmN0aW9uKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRlY2xhcmF0aW9uLmdlbmVyYXRvcikge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4odG9rZW4sIG1lc3NhZ2VzXzEuTWVzc2FnZXMuR2VuZXJhdG9ySW5MZWdhY3lDb250ZXh0KTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJvZHkgPSBkZWNsYXJhdGlvbjtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGJvZHkgPSB0aGlzLnBhcnNlU3RhdGVtZW50KCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZGVsZXRlIHRoaXMuY29udGV4dC5sYWJlbFNldFtrZXldO1xuXHQgICAgICAgICAgICBzdGF0ZW1lbnQgPSBuZXcgTm9kZS5MYWJlbGVkU3RhdGVtZW50KGlkLCBib2R5KTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIHRoaXMuY29uc3VtZVNlbWljb2xvbigpO1xuXHQgICAgICAgICAgICBzdGF0ZW1lbnQgPSBuZXcgTm9kZS5FeHByZXNzaW9uU3RhdGVtZW50KGV4cHIpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBzdGF0ZW1lbnQpO1xuXHQgICAgfTtcblx0ICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRocm93LXN0YXRlbWVudFxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVRocm93U3RhdGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RLZXl3b3JkKCd0aHJvdycpO1xuXHQgICAgICAgIGlmICh0aGlzLmhhc0xpbmVUZXJtaW5hdG9yKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLk5ld2xpbmVBZnRlclRocm93KTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGFyZ3VtZW50ID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcblx0ICAgICAgICB0aGlzLmNvbnN1bWVTZW1pY29sb24oKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5UaHJvd1N0YXRlbWVudChhcmd1bWVudCkpO1xuXHQgICAgfTtcblx0ICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRyeS1zdGF0ZW1lbnRcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VDYXRjaENsYXVzZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0S2V5d29yZCgnY2F0Y2gnKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgnKCcpO1xuXHQgICAgICAgIGlmICh0aGlzLm1hdGNoKCcpJykpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0aGlzLmxvb2thaGVhZCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBwYXJhbXMgPSBbXTtcblx0ICAgICAgICB2YXIgcGFyYW0gPSB0aGlzLnBhcnNlUGF0dGVybihwYXJhbXMpO1xuXHQgICAgICAgIHZhciBwYXJhbU1hcCA9IHt9O1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIHZhciBrZXkgPSAnJCcgKyBwYXJhbXNbaV0udmFsdWU7XG5cdCAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocGFyYW1NYXAsIGtleSkpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLkR1cGxpY2F0ZUJpbmRpbmcsIHBhcmFtc1tpXS52YWx1ZSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcGFyYW1NYXBba2V5XSA9IHRydWU7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICh0aGlzLmNvbnRleHQuc3RyaWN0ICYmIHBhcmFtLnR5cGUgPT09IHN5bnRheF8xLlN5bnRheC5JZGVudGlmaWVyKSB7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLnNjYW5uZXIuaXNSZXN0cmljdGVkV29yZChwYXJhbS5uYW1lKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZUVycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0Q2F0Y2hWYXJpYWJsZSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJyknKTtcblx0ICAgICAgICB2YXIgYm9keSA9IHRoaXMucGFyc2VCbG9jaygpO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkNhdGNoQ2xhdXNlKHBhcmFtLCBib2R5KSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUZpbmFsbHlDbGF1c2UgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdGhpcy5leHBlY3RLZXl3b3JkKCdmaW5hbGx5Jyk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VCbG9jaygpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VUcnlTdGF0ZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdEtleXdvcmQoJ3RyeScpO1xuXHQgICAgICAgIHZhciBibG9jayA9IHRoaXMucGFyc2VCbG9jaygpO1xuXHQgICAgICAgIHZhciBoYW5kbGVyID0gdGhpcy5tYXRjaEtleXdvcmQoJ2NhdGNoJykgPyB0aGlzLnBhcnNlQ2F0Y2hDbGF1c2UoKSA6IG51bGw7XG5cdCAgICAgICAgdmFyIGZpbmFsaXplciA9IHRoaXMubWF0Y2hLZXl3b3JkKCdmaW5hbGx5JykgPyB0aGlzLnBhcnNlRmluYWxseUNsYXVzZSgpIDogbnVsbDtcblx0ICAgICAgICBpZiAoIWhhbmRsZXIgJiYgIWZpbmFsaXplcikge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93RXJyb3IobWVzc2FnZXNfMS5NZXNzYWdlcy5Ob0NhdGNoT3JGaW5hbGx5KTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuVHJ5U3RhdGVtZW50KGJsb2NrLCBoYW5kbGVyLCBmaW5hbGl6ZXIpKTtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1kZWJ1Z2dlci1zdGF0ZW1lbnRcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VEZWJ1Z2dlclN0YXRlbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0S2V5d29yZCgnZGVidWdnZXInKTtcblx0ICAgICAgICB0aGlzLmNvbnN1bWVTZW1pY29sb24oKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5EZWJ1Z2dlclN0YXRlbWVudCgpKTtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXN0YXRlbWVudHMtYW5kLWRlY2xhcmF0aW9uc1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVN0YXRlbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgc3RhdGVtZW50O1xuXHQgICAgICAgIHN3aXRjaCAodGhpcy5sb29rYWhlYWQudHlwZSkge1xuXHQgICAgICAgICAgICBjYXNlIDEgLyogQm9vbGVhbkxpdGVyYWwgKi86XG5cdCAgICAgICAgICAgIGNhc2UgNSAvKiBOdWxsTGl0ZXJhbCAqLzpcblx0ICAgICAgICAgICAgY2FzZSA2IC8qIE51bWVyaWNMaXRlcmFsICovOlxuXHQgICAgICAgICAgICBjYXNlIDggLyogU3RyaW5nTGl0ZXJhbCAqLzpcblx0ICAgICAgICAgICAgY2FzZSAxMCAvKiBUZW1wbGF0ZSAqLzpcblx0ICAgICAgICAgICAgY2FzZSA5IC8qIFJlZ3VsYXJFeHByZXNzaW9uICovOlxuXHQgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZUV4cHJlc3Npb25TdGF0ZW1lbnQoKTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlIDcgLyogUHVuY3R1YXRvciAqLzpcblx0ICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMubG9va2FoZWFkLnZhbHVlO1xuXHQgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAneycpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlQmxvY2soKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSAnKCcpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlRXhwcmVzc2lvblN0YXRlbWVudCgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09ICc7Jykge1xuXHQgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IHRoaXMucGFyc2VFbXB0eVN0YXRlbWVudCgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZUV4cHJlc3Npb25TdGF0ZW1lbnQoKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlIDMgLyogSWRlbnRpZmllciAqLzpcblx0ICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IHRoaXMubWF0Y2hBc3luY0Z1bmN0aW9uKCkgPyB0aGlzLnBhcnNlRnVuY3Rpb25EZWNsYXJhdGlvbigpIDogdGhpcy5wYXJzZUxhYmVsbGVkU3RhdGVtZW50KCk7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgY2FzZSA0IC8qIEtleXdvcmQgKi86XG5cdCAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMubG9va2FoZWFkLnZhbHVlKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAnYnJlYWsnOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlQnJlYWtTdGF0ZW1lbnQoKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAnY29udGludWUnOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlQ29udGludWVTdGF0ZW1lbnQoKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGVidWdnZXInOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlRGVidWdnZXJTdGF0ZW1lbnQoKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAnZG8nOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlRG9XaGlsZVN0YXRlbWVudCgpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICBjYXNlICdmb3InOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlRm9yU3RhdGVtZW50KCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZUZ1bmN0aW9uRGVjbGFyYXRpb24oKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAnaWYnOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlSWZTdGF0ZW1lbnQoKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAncmV0dXJuJzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZVJldHVyblN0YXRlbWVudCgpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICBjYXNlICdzd2l0Y2gnOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlU3dpdGNoU3RhdGVtZW50KCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Rocm93Jzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZVRocm93U3RhdGVtZW50KCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RyeSc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IHRoaXMucGFyc2VUcnlTdGF0ZW1lbnQoKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAndmFyJzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZVZhcmlhYmxlU3RhdGVtZW50KCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3doaWxlJzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy5wYXJzZVdoaWxlU3RhdGVtZW50KCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3dpdGgnOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlV2l0aFN0YXRlbWVudCgpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSB0aGlzLnBhcnNlRXhwcmVzc2lvblN0YXRlbWVudCgpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0aGlzLmxvb2thaGVhZCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBzdGF0ZW1lbnQ7XG5cdCAgICB9O1xuXHQgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZnVuY3Rpb24tZGVmaW5pdGlvbnNcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VGdW5jdGlvblNvdXJjZUVsZW1lbnRzID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJ3snKTtcblx0ICAgICAgICB2YXIgYm9keSA9IHRoaXMucGFyc2VEaXJlY3RpdmVQcm9sb2d1ZXMoKTtcblx0ICAgICAgICB2YXIgcHJldmlvdXNMYWJlbFNldCA9IHRoaXMuY29udGV4dC5sYWJlbFNldDtcblx0ICAgICAgICB2YXIgcHJldmlvdXNJbkl0ZXJhdGlvbiA9IHRoaXMuY29udGV4dC5pbkl0ZXJhdGlvbjtcblx0ICAgICAgICB2YXIgcHJldmlvdXNJblN3aXRjaCA9IHRoaXMuY29udGV4dC5pblN3aXRjaDtcblx0ICAgICAgICB2YXIgcHJldmlvdXNJbkZ1bmN0aW9uQm9keSA9IHRoaXMuY29udGV4dC5pbkZ1bmN0aW9uQm9keTtcblx0ICAgICAgICB0aGlzLmNvbnRleHQubGFiZWxTZXQgPSB7fTtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuaW5JdGVyYXRpb24gPSBmYWxzZTtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuaW5Td2l0Y2ggPSBmYWxzZTtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuaW5GdW5jdGlvbkJvZHkgPSB0cnVlO1xuXHQgICAgICAgIHdoaWxlICh0aGlzLmxvb2thaGVhZC50eXBlICE9PSAyIC8qIEVPRiAqLykge1xuXHQgICAgICAgICAgICBpZiAodGhpcy5tYXRjaCgnfScpKSB7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBib2R5LnB1c2godGhpcy5wYXJzZVN0YXRlbWVudExpc3RJdGVtKCkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmV4cGVjdCgnfScpO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5sYWJlbFNldCA9IHByZXZpb3VzTGFiZWxTZXQ7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmluSXRlcmF0aW9uID0gcHJldmlvdXNJbkl0ZXJhdGlvbjtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuaW5Td2l0Y2ggPSBwcmV2aW91c0luU3dpdGNoO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5pbkZ1bmN0aW9uQm9keSA9IHByZXZpb3VzSW5GdW5jdGlvbkJvZHk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuQmxvY2tTdGF0ZW1lbnQoYm9keSkpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUudmFsaWRhdGVQYXJhbSA9IGZ1bmN0aW9uIChvcHRpb25zLCBwYXJhbSwgbmFtZSkge1xuXHQgICAgICAgIHZhciBrZXkgPSAnJCcgKyBuYW1lO1xuXHQgICAgICAgIGlmICh0aGlzLmNvbnRleHQuc3RyaWN0KSB7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLnNjYW5uZXIuaXNSZXN0cmljdGVkV29yZChuYW1lKSkge1xuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5zdHJpY3RlZCA9IHBhcmFtO1xuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5tZXNzYWdlID0gbWVzc2FnZXNfMS5NZXNzYWdlcy5TdHJpY3RQYXJhbU5hbWU7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLnBhcmFtU2V0LCBrZXkpKSB7XG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLnN0cmljdGVkID0gcGFyYW07XG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLm1lc3NhZ2UgPSBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdFBhcmFtRHVwZTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmICghb3B0aW9ucy5maXJzdFJlc3RyaWN0ZWQpIHtcblx0ICAgICAgICAgICAgaWYgKHRoaXMuc2Nhbm5lci5pc1Jlc3RyaWN0ZWRXb3JkKG5hbWUpKSB7XG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLmZpcnN0UmVzdHJpY3RlZCA9IHBhcmFtO1xuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5tZXNzYWdlID0gbWVzc2FnZXNfMS5NZXNzYWdlcy5TdHJpY3RQYXJhbU5hbWU7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zY2FubmVyLmlzU3RyaWN0TW9kZVJlc2VydmVkV29yZChuYW1lKSkge1xuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5maXJzdFJlc3RyaWN0ZWQgPSBwYXJhbTtcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMubWVzc2FnZSA9IG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0UmVzZXJ2ZWRXb3JkO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLnBhcmFtU2V0LCBrZXkpKSB7XG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLnN0cmljdGVkID0gcGFyYW07XG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLm1lc3NhZ2UgPSBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdFBhcmFtRHVwZTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHQgICAgICAgIGlmICh0eXBlb2YgT2JqZWN0LmRlZmluZVByb3BlcnR5ID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvcHRpb25zLnBhcmFtU2V0LCBrZXksIHsgdmFsdWU6IHRydWUsIGVudW1lcmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICBvcHRpb25zLnBhcmFtU2V0W2tleV0gPSB0cnVlO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlUmVzdEVsZW1lbnQgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgnLi4uJyk7XG5cdCAgICAgICAgdmFyIGFyZyA9IHRoaXMucGFyc2VQYXR0ZXJuKHBhcmFtcyk7XG5cdCAgICAgICAgaWYgKHRoaXMubWF0Y2goJz0nKSkge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93RXJyb3IobWVzc2FnZXNfMS5NZXNzYWdlcy5EZWZhdWx0UmVzdFBhcmFtZXRlcik7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICghdGhpcy5tYXRjaCgnKScpKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLlBhcmFtZXRlckFmdGVyUmVzdFBhcmFtZXRlcik7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLlJlc3RFbGVtZW50KGFyZykpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VGb3JtYWxQYXJhbWV0ZXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHQgICAgICAgIHZhciBwYXJhbXMgPSBbXTtcblx0ICAgICAgICB2YXIgcGFyYW0gPSB0aGlzLm1hdGNoKCcuLi4nKSA/IHRoaXMucGFyc2VSZXN0RWxlbWVudChwYXJhbXMpIDogdGhpcy5wYXJzZVBhdHRlcm5XaXRoRGVmYXVsdChwYXJhbXMpO1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIHRoaXMudmFsaWRhdGVQYXJhbShvcHRpb25zLCBwYXJhbXNbaV0sIHBhcmFtc1tpXS52YWx1ZSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIG9wdGlvbnMuc2ltcGxlID0gb3B0aW9ucy5zaW1wbGUgJiYgKHBhcmFtIGluc3RhbmNlb2YgTm9kZS5JZGVudGlmaWVyKTtcblx0ICAgICAgICBvcHRpb25zLnBhcmFtcy5wdXNoKHBhcmFtKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlRm9ybWFsUGFyYW1ldGVycyA9IGZ1bmN0aW9uIChmaXJzdFJlc3RyaWN0ZWQpIHtcblx0ICAgICAgICB2YXIgb3B0aW9ucztcblx0ICAgICAgICBvcHRpb25zID0ge1xuXHQgICAgICAgICAgICBzaW1wbGU6IHRydWUsXG5cdCAgICAgICAgICAgIHBhcmFtczogW10sXG5cdCAgICAgICAgICAgIGZpcnN0UmVzdHJpY3RlZDogZmlyc3RSZXN0cmljdGVkXG5cdCAgICAgICAgfTtcblx0ICAgICAgICB0aGlzLmV4cGVjdCgnKCcpO1xuXHQgICAgICAgIGlmICghdGhpcy5tYXRjaCgnKScpKSB7XG5cdCAgICAgICAgICAgIG9wdGlvbnMucGFyYW1TZXQgPSB7fTtcblx0ICAgICAgICAgICAgd2hpbGUgKHRoaXMubG9va2FoZWFkLnR5cGUgIT09IDIgLyogRU9GICovKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnBhcnNlRm9ybWFsUGFyYW1ldGVyKG9wdGlvbnMpO1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2goJyknKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJywnKTtcblx0ICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCcpJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmV4cGVjdCgnKScpO1xuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIHNpbXBsZTogb3B0aW9ucy5zaW1wbGUsXG5cdCAgICAgICAgICAgIHBhcmFtczogb3B0aW9ucy5wYXJhbXMsXG5cdCAgICAgICAgICAgIHN0cmljdGVkOiBvcHRpb25zLnN0cmljdGVkLFxuXHQgICAgICAgICAgICBmaXJzdFJlc3RyaWN0ZWQ6IG9wdGlvbnMuZmlyc3RSZXN0cmljdGVkLFxuXHQgICAgICAgICAgICBtZXNzYWdlOiBvcHRpb25zLm1lc3NhZ2Vcblx0ICAgICAgICB9O1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUubWF0Y2hBc3luY0Z1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBtYXRjaCA9IHRoaXMubWF0Y2hDb250ZXh0dWFsS2V5d29yZCgnYXN5bmMnKTtcblx0ICAgICAgICBpZiAobWF0Y2gpIHtcblx0ICAgICAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5zY2FubmVyLnNhdmVTdGF0ZSgpO1xuXHQgICAgICAgICAgICB0aGlzLnNjYW5uZXIuc2NhbkNvbW1lbnRzKCk7XG5cdCAgICAgICAgICAgIHZhciBuZXh0ID0gdGhpcy5zY2FubmVyLmxleCgpO1xuXHQgICAgICAgICAgICB0aGlzLnNjYW5uZXIucmVzdG9yZVN0YXRlKHN0YXRlKTtcblx0ICAgICAgICAgICAgbWF0Y2ggPSAoc3RhdGUubGluZU51bWJlciA9PT0gbmV4dC5saW5lTnVtYmVyKSAmJiAobmV4dC50eXBlID09PSA0IC8qIEtleXdvcmQgKi8pICYmIChuZXh0LnZhbHVlID09PSAnZnVuY3Rpb24nKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIG1hdGNoO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VGdW5jdGlvbkRlY2xhcmF0aW9uID0gZnVuY3Rpb24gKGlkZW50aWZpZXJJc09wdGlvbmFsKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgaXNBc3luYyA9IHRoaXMubWF0Y2hDb250ZXh0dWFsS2V5d29yZCgnYXN5bmMnKTtcblx0ICAgICAgICBpZiAoaXNBc3luYykge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmV4cGVjdEtleXdvcmQoJ2Z1bmN0aW9uJyk7XG5cdCAgICAgICAgdmFyIGlzR2VuZXJhdG9yID0gaXNBc3luYyA/IGZhbHNlIDogdGhpcy5tYXRjaCgnKicpO1xuXHQgICAgICAgIGlmIChpc0dlbmVyYXRvcikge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgbWVzc2FnZTtcblx0ICAgICAgICB2YXIgaWQgPSBudWxsO1xuXHQgICAgICAgIHZhciBmaXJzdFJlc3RyaWN0ZWQgPSBudWxsO1xuXHQgICAgICAgIGlmICghaWRlbnRpZmllcklzT3B0aW9uYWwgfHwgIXRoaXMubWF0Y2goJygnKSkge1xuXHQgICAgICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLmxvb2thaGVhZDtcblx0ICAgICAgICAgICAgaWQgPSB0aGlzLnBhcnNlVmFyaWFibGVJZGVudGlmaWVyKCk7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLmNvbnRleHQuc3RyaWN0KSB7XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FubmVyLmlzUmVzdHJpY3RlZFdvcmQodG9rZW4udmFsdWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZVVuZXhwZWN0ZWRUb2tlbih0b2tlbiwgbWVzc2FnZXNfMS5NZXNzYWdlcy5TdHJpY3RGdW5jdGlvbk5hbWUpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2Nhbm5lci5pc1Jlc3RyaWN0ZWRXb3JkKHRva2VuLnZhbHVlKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGZpcnN0UmVzdHJpY3RlZCA9IHRva2VuO1xuXHQgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdEZ1bmN0aW9uTmFtZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc2Nhbm5lci5pc1N0cmljdE1vZGVSZXNlcnZlZFdvcmQodG9rZW4udmFsdWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZmlyc3RSZXN0cmljdGVkID0gdG9rZW47XG5cdCAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0UmVzZXJ2ZWRXb3JkO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBwcmV2aW91c0FsbG93QXdhaXQgPSB0aGlzLmNvbnRleHQuYXdhaXQ7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzQWxsb3dZaWVsZCA9IHRoaXMuY29udGV4dC5hbGxvd1lpZWxkO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5hd2FpdCA9IGlzQXN5bmM7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93WWllbGQgPSAhaXNHZW5lcmF0b3I7XG5cdCAgICAgICAgdmFyIGZvcm1hbFBhcmFtZXRlcnMgPSB0aGlzLnBhcnNlRm9ybWFsUGFyYW1ldGVycyhmaXJzdFJlc3RyaWN0ZWQpO1xuXHQgICAgICAgIHZhciBwYXJhbXMgPSBmb3JtYWxQYXJhbWV0ZXJzLnBhcmFtcztcblx0ICAgICAgICB2YXIgc3RyaWN0ZWQgPSBmb3JtYWxQYXJhbWV0ZXJzLnN0cmljdGVkO1xuXHQgICAgICAgIGZpcnN0UmVzdHJpY3RlZCA9IGZvcm1hbFBhcmFtZXRlcnMuZmlyc3RSZXN0cmljdGVkO1xuXHQgICAgICAgIGlmIChmb3JtYWxQYXJhbWV0ZXJzLm1lc3NhZ2UpIHtcblx0ICAgICAgICAgICAgbWVzc2FnZSA9IGZvcm1hbFBhcmFtZXRlcnMubWVzc2FnZTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIHByZXZpb3VzU3RyaWN0ID0gdGhpcy5jb250ZXh0LnN0cmljdDtcblx0ICAgICAgICB2YXIgcHJldmlvdXNBbGxvd1N0cmljdERpcmVjdGl2ZSA9IHRoaXMuY29udGV4dC5hbGxvd1N0cmljdERpcmVjdGl2ZTtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dTdHJpY3REaXJlY3RpdmUgPSBmb3JtYWxQYXJhbWV0ZXJzLnNpbXBsZTtcblx0ICAgICAgICB2YXIgYm9keSA9IHRoaXMucGFyc2VGdW5jdGlvblNvdXJjZUVsZW1lbnRzKCk7XG5cdCAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QgJiYgZmlyc3RSZXN0cmljdGVkKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4oZmlyc3RSZXN0cmljdGVkLCBtZXNzYWdlKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKHRoaXMuY29udGV4dC5zdHJpY3QgJiYgc3RyaWN0ZWQpIHtcblx0ICAgICAgICAgICAgdGhpcy50b2xlcmF0ZVVuZXhwZWN0ZWRUb2tlbihzdHJpY3RlZCwgbWVzc2FnZSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMuY29udGV4dC5zdHJpY3QgPSBwcmV2aW91c1N0cmljdDtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dTdHJpY3REaXJlY3RpdmUgPSBwcmV2aW91c0FsbG93U3RyaWN0RGlyZWN0aXZlO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5hd2FpdCA9IHByZXZpb3VzQWxsb3dBd2FpdDtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZCA9IHByZXZpb3VzQWxsb3dZaWVsZDtcblx0ICAgICAgICByZXR1cm4gaXNBc3luYyA/IHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuQXN5bmNGdW5jdGlvbkRlY2xhcmF0aW9uKGlkLCBwYXJhbXMsIGJvZHkpKSA6XG5cdCAgICAgICAgICAgIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuRnVuY3Rpb25EZWNsYXJhdGlvbihpZCwgcGFyYW1zLCBib2R5LCBpc0dlbmVyYXRvcikpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VGdW5jdGlvbkV4cHJlc3Npb24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgaXNBc3luYyA9IHRoaXMubWF0Y2hDb250ZXh0dWFsS2V5d29yZCgnYXN5bmMnKTtcblx0ICAgICAgICBpZiAoaXNBc3luYykge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmV4cGVjdEtleXdvcmQoJ2Z1bmN0aW9uJyk7XG5cdCAgICAgICAgdmFyIGlzR2VuZXJhdG9yID0gaXNBc3luYyA/IGZhbHNlIDogdGhpcy5tYXRjaCgnKicpO1xuXHQgICAgICAgIGlmIChpc0dlbmVyYXRvcikge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgbWVzc2FnZTtcblx0ICAgICAgICB2YXIgaWQgPSBudWxsO1xuXHQgICAgICAgIHZhciBmaXJzdFJlc3RyaWN0ZWQ7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzQWxsb3dBd2FpdCA9IHRoaXMuY29udGV4dC5hd2FpdDtcblx0ICAgICAgICB2YXIgcHJldmlvdXNBbGxvd1lpZWxkID0gdGhpcy5jb250ZXh0LmFsbG93WWllbGQ7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmF3YWl0ID0gaXNBc3luYztcblx0ICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZCA9ICFpc0dlbmVyYXRvcjtcblx0ICAgICAgICBpZiAoIXRoaXMubWF0Y2goJygnKSkge1xuXHQgICAgICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLmxvb2thaGVhZDtcblx0ICAgICAgICAgICAgaWQgPSAoIXRoaXMuY29udGV4dC5zdHJpY3QgJiYgIWlzR2VuZXJhdG9yICYmIHRoaXMubWF0Y2hLZXl3b3JkKCd5aWVsZCcpKSA/IHRoaXMucGFyc2VJZGVudGlmaWVyTmFtZSgpIDogdGhpcy5wYXJzZVZhcmlhYmxlSWRlbnRpZmllcigpO1xuXHQgICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCkge1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2Nhbm5lci5pc1Jlc3RyaWN0ZWRXb3JkKHRva2VuLnZhbHVlKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4odG9rZW4sIG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0RnVuY3Rpb25OYW1lKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5uZXIuaXNSZXN0cmljdGVkV29yZCh0b2tlbi52YWx1ZSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICBmaXJzdFJlc3RyaWN0ZWQgPSB0b2tlbjtcblx0ICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gbWVzc2FnZXNfMS5NZXNzYWdlcy5TdHJpY3RGdW5jdGlvbk5hbWU7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNjYW5uZXIuaXNTdHJpY3RNb2RlUmVzZXJ2ZWRXb3JkKHRva2VuLnZhbHVlKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGZpcnN0UmVzdHJpY3RlZCA9IHRva2VuO1xuXHQgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0cmljdFJlc2VydmVkV29yZDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgZm9ybWFsUGFyYW1ldGVycyA9IHRoaXMucGFyc2VGb3JtYWxQYXJhbWV0ZXJzKGZpcnN0UmVzdHJpY3RlZCk7XG5cdCAgICAgICAgdmFyIHBhcmFtcyA9IGZvcm1hbFBhcmFtZXRlcnMucGFyYW1zO1xuXHQgICAgICAgIHZhciBzdHJpY3RlZCA9IGZvcm1hbFBhcmFtZXRlcnMuc3RyaWN0ZWQ7XG5cdCAgICAgICAgZmlyc3RSZXN0cmljdGVkID0gZm9ybWFsUGFyYW1ldGVycy5maXJzdFJlc3RyaWN0ZWQ7XG5cdCAgICAgICAgaWYgKGZvcm1hbFBhcmFtZXRlcnMubWVzc2FnZSkge1xuXHQgICAgICAgICAgICBtZXNzYWdlID0gZm9ybWFsUGFyYW1ldGVycy5tZXNzYWdlO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgcHJldmlvdXNTdHJpY3QgPSB0aGlzLmNvbnRleHQuc3RyaWN0O1xuXHQgICAgICAgIHZhciBwcmV2aW91c0FsbG93U3RyaWN0RGlyZWN0aXZlID0gdGhpcy5jb250ZXh0LmFsbG93U3RyaWN0RGlyZWN0aXZlO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd1N0cmljdERpcmVjdGl2ZSA9IGZvcm1hbFBhcmFtZXRlcnMuc2ltcGxlO1xuXHQgICAgICAgIHZhciBib2R5ID0gdGhpcy5wYXJzZUZ1bmN0aW9uU291cmNlRWxlbWVudHMoKTtcblx0ICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCAmJiBmaXJzdFJlc3RyaWN0ZWQpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbihmaXJzdFJlc3RyaWN0ZWQsIG1lc3NhZ2UpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodGhpcy5jb250ZXh0LnN0cmljdCAmJiBzdHJpY3RlZCkge1xuXHQgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHN0cmljdGVkLCBtZXNzYWdlKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LnN0cmljdCA9IHByZXZpb3VzU3RyaWN0O1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd1N0cmljdERpcmVjdGl2ZSA9IHByZXZpb3VzQWxsb3dTdHJpY3REaXJlY3RpdmU7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmF3YWl0ID0gcHJldmlvdXNBbGxvd0F3YWl0O1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd1lpZWxkID0gcHJldmlvdXNBbGxvd1lpZWxkO1xuXHQgICAgICAgIHJldHVybiBpc0FzeW5jID8gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5Bc3luY0Z1bmN0aW9uRXhwcmVzc2lvbihpZCwgcGFyYW1zLCBib2R5KSkgOlxuXHQgICAgICAgICAgICB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkZ1bmN0aW9uRXhwcmVzc2lvbihpZCwgcGFyYW1zLCBib2R5LCBpc0dlbmVyYXRvcikpO1xuXHQgICAgfTtcblx0ICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWRpcmVjdGl2ZS1wcm9sb2d1ZXMtYW5kLXRoZS11c2Utc3RyaWN0LWRpcmVjdGl2ZVxuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZURpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLmxvb2thaGVhZDtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHZhciBleHByID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcblx0ICAgICAgICB2YXIgZGlyZWN0aXZlID0gKGV4cHIudHlwZSA9PT0gc3ludGF4XzEuU3ludGF4LkxpdGVyYWwpID8gdGhpcy5nZXRUb2tlblJhdyh0b2tlbikuc2xpY2UoMSwgLTEpIDogbnVsbDtcblx0ICAgICAgICB0aGlzLmNvbnN1bWVTZW1pY29sb24oKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBkaXJlY3RpdmUgPyBuZXcgTm9kZS5EaXJlY3RpdmUoZXhwciwgZGlyZWN0aXZlKSA6IG5ldyBOb2RlLkV4cHJlc3Npb25TdGF0ZW1lbnQoZXhwcikpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VEaXJlY3RpdmVQcm9sb2d1ZXMgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGZpcnN0UmVzdHJpY3RlZCA9IG51bGw7XG5cdCAgICAgICAgdmFyIGJvZHkgPSBbXTtcblx0ICAgICAgICB3aGlsZSAodHJ1ZSkge1xuXHQgICAgICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLmxvb2thaGVhZDtcblx0ICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09IDggLyogU3RyaW5nTGl0ZXJhbCAqLykge1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdmFyIHN0YXRlbWVudCA9IHRoaXMucGFyc2VEaXJlY3RpdmUoKTtcblx0ICAgICAgICAgICAgYm9keS5wdXNoKHN0YXRlbWVudCk7XG5cdCAgICAgICAgICAgIHZhciBkaXJlY3RpdmUgPSBzdGF0ZW1lbnQuZGlyZWN0aXZlO1xuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGRpcmVjdGl2ZSAhPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmIChkaXJlY3RpdmUgPT09ICd1c2Ugc3RyaWN0Jykge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0cmljdCA9IHRydWU7XG5cdCAgICAgICAgICAgICAgICBpZiAoZmlyc3RSZXN0cmljdGVkKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZVVuZXhwZWN0ZWRUb2tlbihmaXJzdFJlc3RyaWN0ZWQsIG1lc3NhZ2VzXzEuTWVzc2FnZXMuU3RyaWN0T2N0YWxMaXRlcmFsKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb250ZXh0LmFsbG93U3RyaWN0RGlyZWN0aXZlKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy50b2xlcmF0ZVVuZXhwZWN0ZWRUb2tlbih0b2tlbiwgbWVzc2FnZXNfMS5NZXNzYWdlcy5JbGxlZ2FsTGFuZ3VhZ2VNb2RlRGlyZWN0aXZlKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGlmICghZmlyc3RSZXN0cmljdGVkICYmIHRva2VuLm9jdGFsKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZmlyc3RSZXN0cmljdGVkID0gdG9rZW47XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGJvZHk7XG5cdCAgICB9O1xuXHQgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtbWV0aG9kLWRlZmluaXRpb25zXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnF1YWxpZmllZFByb3BlcnR5TmFtZSA9IGZ1bmN0aW9uICh0b2tlbikge1xuXHQgICAgICAgIHN3aXRjaCAodG9rZW4udHlwZSkge1xuXHQgICAgICAgICAgICBjYXNlIDMgLyogSWRlbnRpZmllciAqLzpcblx0ICAgICAgICAgICAgY2FzZSA4IC8qIFN0cmluZ0xpdGVyYWwgKi86XG5cdCAgICAgICAgICAgIGNhc2UgMSAvKiBCb29sZWFuTGl0ZXJhbCAqLzpcblx0ICAgICAgICAgICAgY2FzZSA1IC8qIE51bGxMaXRlcmFsICovOlxuXHQgICAgICAgICAgICBjYXNlIDYgLyogTnVtZXJpY0xpdGVyYWwgKi86XG5cdCAgICAgICAgICAgIGNhc2UgNCAvKiBLZXl3b3JkICovOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICAgICAgICAgIGNhc2UgNyAvKiBQdW5jdHVhdG9yICovOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuLnZhbHVlID09PSAnWyc7XG5cdCAgICAgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VHZXR0ZXJNZXRob2QgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgaXNHZW5lcmF0b3IgPSBmYWxzZTtcblx0ICAgICAgICB2YXIgcHJldmlvdXNBbGxvd1lpZWxkID0gdGhpcy5jb250ZXh0LmFsbG93WWllbGQ7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93WWllbGQgPSAhaXNHZW5lcmF0b3I7XG5cdCAgICAgICAgdmFyIGZvcm1hbFBhcmFtZXRlcnMgPSB0aGlzLnBhcnNlRm9ybWFsUGFyYW1ldGVycygpO1xuXHQgICAgICAgIGlmIChmb3JtYWxQYXJhbWV0ZXJzLnBhcmFtcy5sZW5ndGggPiAwKSB7XG5cdCAgICAgICAgICAgIHRoaXMudG9sZXJhdGVFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLkJhZEdldHRlckFyaXR5KTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIG1ldGhvZCA9IHRoaXMucGFyc2VQcm9wZXJ0eU1ldGhvZChmb3JtYWxQYXJhbWV0ZXJzKTtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZCA9IHByZXZpb3VzQWxsb3dZaWVsZDtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5GdW5jdGlvbkV4cHJlc3Npb24obnVsbCwgZm9ybWFsUGFyYW1ldGVycy5wYXJhbXMsIG1ldGhvZCwgaXNHZW5lcmF0b3IpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlU2V0dGVyTWV0aG9kID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIGlzR2VuZXJhdG9yID0gZmFsc2U7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzQWxsb3dZaWVsZCA9IHRoaXMuY29udGV4dC5hbGxvd1lpZWxkO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd1lpZWxkID0gIWlzR2VuZXJhdG9yO1xuXHQgICAgICAgIHZhciBmb3JtYWxQYXJhbWV0ZXJzID0gdGhpcy5wYXJzZUZvcm1hbFBhcmFtZXRlcnMoKTtcblx0ICAgICAgICBpZiAoZm9ybWFsUGFyYW1ldGVycy5wYXJhbXMubGVuZ3RoICE9PSAxKSB7XG5cdCAgICAgICAgICAgIHRoaXMudG9sZXJhdGVFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLkJhZFNldHRlckFyaXR5KTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSBpZiAoZm9ybWFsUGFyYW1ldGVycy5wYXJhbXNbMF0gaW5zdGFuY2VvZiBOb2RlLlJlc3RFbGVtZW50KSB7XG5cdCAgICAgICAgICAgIHRoaXMudG9sZXJhdGVFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLkJhZFNldHRlclJlc3RQYXJhbWV0ZXIpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgbWV0aG9kID0gdGhpcy5wYXJzZVByb3BlcnR5TWV0aG9kKGZvcm1hbFBhcmFtZXRlcnMpO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd1lpZWxkID0gcHJldmlvdXNBbGxvd1lpZWxkO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkZ1bmN0aW9uRXhwcmVzc2lvbihudWxsLCBmb3JtYWxQYXJhbWV0ZXJzLnBhcmFtcywgbWV0aG9kLCBpc0dlbmVyYXRvcikpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VHZW5lcmF0b3JNZXRob2QgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgaXNHZW5lcmF0b3IgPSB0cnVlO1xuXHQgICAgICAgIHZhciBwcmV2aW91c0FsbG93WWllbGQgPSB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZDtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZCA9IHRydWU7XG5cdCAgICAgICAgdmFyIHBhcmFtcyA9IHRoaXMucGFyc2VGb3JtYWxQYXJhbWV0ZXJzKCk7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93WWllbGQgPSBmYWxzZTtcblx0ICAgICAgICB2YXIgbWV0aG9kID0gdGhpcy5wYXJzZVByb3BlcnR5TWV0aG9kKHBhcmFtcyk7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmFsbG93WWllbGQgPSBwcmV2aW91c0FsbG93WWllbGQ7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuRnVuY3Rpb25FeHByZXNzaW9uKG51bGwsIHBhcmFtcy5wYXJhbXMsIG1ldGhvZCwgaXNHZW5lcmF0b3IpKTtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1nZW5lcmF0b3ItZnVuY3Rpb24tZGVmaW5pdGlvbnNcblx0ICAgIFBhcnNlci5wcm90b3R5cGUuaXNTdGFydE9mRXhwcmVzc2lvbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgc3RhcnQgPSB0cnVlO1xuXHQgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMubG9va2FoZWFkLnZhbHVlO1xuXHQgICAgICAgIHN3aXRjaCAodGhpcy5sb29rYWhlYWQudHlwZSkge1xuXHQgICAgICAgICAgICBjYXNlIDcgLyogUHVuY3R1YXRvciAqLzpcblx0ICAgICAgICAgICAgICAgIHN0YXJ0ID0gKHZhbHVlID09PSAnWycpIHx8ICh2YWx1ZSA9PT0gJygnKSB8fCAodmFsdWUgPT09ICd7JykgfHxcblx0ICAgICAgICAgICAgICAgICAgICAodmFsdWUgPT09ICcrJykgfHwgKHZhbHVlID09PSAnLScpIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgKHZhbHVlID09PSAnIScpIHx8ICh2YWx1ZSA9PT0gJ34nKSB8fFxuXHQgICAgICAgICAgICAgICAgICAgICh2YWx1ZSA9PT0gJysrJykgfHwgKHZhbHVlID09PSAnLS0nKSB8fFxuXHQgICAgICAgICAgICAgICAgICAgICh2YWx1ZSA9PT0gJy8nKSB8fCAodmFsdWUgPT09ICcvPScpOyAvLyByZWd1bGFyIGV4cHJlc3Npb24gbGl0ZXJhbFxuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2UgNCAvKiBLZXl3b3JkICovOlxuXHQgICAgICAgICAgICAgICAgc3RhcnQgPSAodmFsdWUgPT09ICdjbGFzcycpIHx8ICh2YWx1ZSA9PT0gJ2RlbGV0ZScpIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgKHZhbHVlID09PSAnZnVuY3Rpb24nKSB8fCAodmFsdWUgPT09ICdsZXQnKSB8fCAodmFsdWUgPT09ICduZXcnKSB8fFxuXHQgICAgICAgICAgICAgICAgICAgICh2YWx1ZSA9PT0gJ3N1cGVyJykgfHwgKHZhbHVlID09PSAndGhpcycpIHx8ICh2YWx1ZSA9PT0gJ3R5cGVvZicpIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgKHZhbHVlID09PSAndm9pZCcpIHx8ICh2YWx1ZSA9PT0gJ3lpZWxkJyk7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gc3RhcnQ7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVlpZWxkRXhwcmVzc2lvbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHRoaXMuZXhwZWN0S2V5d29yZCgneWllbGQnKTtcblx0ICAgICAgICB2YXIgYXJndW1lbnQgPSBudWxsO1xuXHQgICAgICAgIHZhciBkZWxlZ2F0ZSA9IGZhbHNlO1xuXHQgICAgICAgIGlmICghdGhpcy5oYXNMaW5lVGVybWluYXRvcikge1xuXHQgICAgICAgICAgICB2YXIgcHJldmlvdXNBbGxvd1lpZWxkID0gdGhpcy5jb250ZXh0LmFsbG93WWllbGQ7XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd1lpZWxkID0gZmFsc2U7XG5cdCAgICAgICAgICAgIGRlbGVnYXRlID0gdGhpcy5tYXRjaCgnKicpO1xuXHQgICAgICAgICAgICBpZiAoZGVsZWdhdGUpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICBhcmd1bWVudCA9IHRoaXMucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbigpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNTdGFydE9mRXhwcmVzc2lvbigpKSB7XG5cdCAgICAgICAgICAgICAgICBhcmd1bWVudCA9IHRoaXMucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbigpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHRoaXMuY29udGV4dC5hbGxvd1lpZWxkID0gcHJldmlvdXNBbGxvd1lpZWxkO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5ZaWVsZEV4cHJlc3Npb24oYXJndW1lbnQsIGRlbGVnYXRlKSk7XG5cdCAgICB9O1xuXHQgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtY2xhc3MtZGVmaW5pdGlvbnNcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VDbGFzc0VsZW1lbnQgPSBmdW5jdGlvbiAoaGFzQ29uc3RydWN0b3IpIHtcblx0ICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLmxvb2thaGVhZDtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHZhciBraW5kID0gJyc7XG5cdCAgICAgICAgdmFyIGtleSA9IG51bGw7XG5cdCAgICAgICAgdmFyIHZhbHVlID0gbnVsbDtcblx0ICAgICAgICB2YXIgY29tcHV0ZWQgPSBmYWxzZTtcblx0ICAgICAgICB2YXIgbWV0aG9kID0gZmFsc2U7XG5cdCAgICAgICAgdmFyIGlzU3RhdGljID0gZmFsc2U7XG5cdCAgICAgICAgdmFyIGlzQXN5bmMgPSBmYWxzZTtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaCgnKicpKSB7XG5cdCAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICBjb21wdXRlZCA9IHRoaXMubWF0Y2goJ1snKTtcblx0ICAgICAgICAgICAga2V5ID0gdGhpcy5wYXJzZU9iamVjdFByb3BlcnR5S2V5KCk7XG5cdCAgICAgICAgICAgIHZhciBpZCA9IGtleTtcblx0ICAgICAgICAgICAgaWYgKGlkLm5hbWUgPT09ICdzdGF0aWMnICYmICh0aGlzLnF1YWxpZmllZFByb3BlcnR5TmFtZSh0aGlzLmxvb2thaGVhZCkgfHwgdGhpcy5tYXRjaCgnKicpKSkge1xuXHQgICAgICAgICAgICAgICAgdG9rZW4gPSB0aGlzLmxvb2thaGVhZDtcblx0ICAgICAgICAgICAgICAgIGlzU3RhdGljID0gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgIGNvbXB1dGVkID0gdGhpcy5tYXRjaCgnWycpO1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2goJyonKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBrZXkgPSB0aGlzLnBhcnNlT2JqZWN0UHJvcGVydHlLZXkoKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoKHRva2VuLnR5cGUgPT09IDMgLyogSWRlbnRpZmllciAqLykgJiYgIXRoaXMuaGFzTGluZVRlcm1pbmF0b3IgJiYgKHRva2VuLnZhbHVlID09PSAnYXN5bmMnKSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIHB1bmN0dWF0b3IgPSB0aGlzLmxvb2thaGVhZC52YWx1ZTtcblx0ICAgICAgICAgICAgICAgIGlmIChwdW5jdHVhdG9yICE9PSAnOicgJiYgcHVuY3R1YXRvciAhPT0gJygnICYmIHB1bmN0dWF0b3IgIT09ICcqJykge1xuXHQgICAgICAgICAgICAgICAgICAgIGlzQXN5bmMgPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgICAgIHRva2VuID0gdGhpcy5sb29rYWhlYWQ7XG5cdCAgICAgICAgICAgICAgICAgICAga2V5ID0gdGhpcy5wYXJzZU9iamVjdFByb3BlcnR5S2V5KCk7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IDMgLyogSWRlbnRpZmllciAqLyAmJiB0b2tlbi52YWx1ZSA9PT0gJ2NvbnN0cnVjdG9yJykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKHRva2VuLCBtZXNzYWdlc18xLk1lc3NhZ2VzLkNvbnN0cnVjdG9ySXNBc3luYyk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBsb29rYWhlYWRQcm9wZXJ0eUtleSA9IHRoaXMucXVhbGlmaWVkUHJvcGVydHlOYW1lKHRoaXMubG9va2FoZWFkKTtcblx0ICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gMyAvKiBJZGVudGlmaWVyICovKSB7XG5cdCAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PT0gJ2dldCcgJiYgbG9va2FoZWFkUHJvcGVydHlLZXkpIHtcblx0ICAgICAgICAgICAgICAgIGtpbmQgPSAnZ2V0Jztcblx0ICAgICAgICAgICAgICAgIGNvbXB1dGVkID0gdGhpcy5tYXRjaCgnWycpO1xuXHQgICAgICAgICAgICAgICAga2V5ID0gdGhpcy5wYXJzZU9iamVjdFByb3BlcnR5S2V5KCk7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWxsb3dZaWVsZCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnBhcnNlR2V0dGVyTWV0aG9kKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICdzZXQnICYmIGxvb2thaGVhZFByb3BlcnR5S2V5KSB7XG5cdCAgICAgICAgICAgICAgICBraW5kID0gJ3NldCc7XG5cdCAgICAgICAgICAgICAgICBjb21wdXRlZCA9IHRoaXMubWF0Y2goJ1snKTtcblx0ICAgICAgICAgICAgICAgIGtleSA9IHRoaXMucGFyc2VPYmplY3RQcm9wZXJ0eUtleSgpO1xuXHQgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnBhcnNlU2V0dGVyTWV0aG9kKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gNyAvKiBQdW5jdHVhdG9yICovICYmIHRva2VuLnZhbHVlID09PSAnKicgJiYgbG9va2FoZWFkUHJvcGVydHlLZXkpIHtcblx0ICAgICAgICAgICAga2luZCA9ICdpbml0Jztcblx0ICAgICAgICAgICAgY29tcHV0ZWQgPSB0aGlzLm1hdGNoKCdbJyk7XG5cdCAgICAgICAgICAgIGtleSA9IHRoaXMucGFyc2VPYmplY3RQcm9wZXJ0eUtleSgpO1xuXHQgICAgICAgICAgICB2YWx1ZSA9IHRoaXMucGFyc2VHZW5lcmF0b3JNZXRob2QoKTtcblx0ICAgICAgICAgICAgbWV0aG9kID0gdHJ1ZTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKCFraW5kICYmIGtleSAmJiB0aGlzLm1hdGNoKCcoJykpIHtcblx0ICAgICAgICAgICAga2luZCA9ICdpbml0Jztcblx0ICAgICAgICAgICAgdmFsdWUgPSBpc0FzeW5jID8gdGhpcy5wYXJzZVByb3BlcnR5TWV0aG9kQXN5bmNGdW5jdGlvbigpIDogdGhpcy5wYXJzZVByb3BlcnR5TWV0aG9kRnVuY3Rpb24oKTtcblx0ICAgICAgICAgICAgbWV0aG9kID0gdHJ1ZTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKCFraW5kKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odGhpcy5sb29rYWhlYWQpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoa2luZCA9PT0gJ2luaXQnKSB7XG5cdCAgICAgICAgICAgIGtpbmQgPSAnbWV0aG9kJztcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKCFjb21wdXRlZCkge1xuXHQgICAgICAgICAgICBpZiAoaXNTdGF0aWMgJiYgdGhpcy5pc1Byb3BlcnR5S2V5KGtleSwgJ3Byb3RvdHlwZScpKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRva2VuLCBtZXNzYWdlc18xLk1lc3NhZ2VzLlN0YXRpY1Byb3RvdHlwZSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKCFpc1N0YXRpYyAmJiB0aGlzLmlzUHJvcGVydHlLZXkoa2V5LCAnY29uc3RydWN0b3InKSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKGtpbmQgIT09ICdtZXRob2QnIHx8ICFtZXRob2QgfHwgKHZhbHVlICYmIHZhbHVlLmdlbmVyYXRvcikpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRva2VuLCBtZXNzYWdlc18xLk1lc3NhZ2VzLkNvbnN0cnVjdG9yU3BlY2lhbE1ldGhvZCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBpZiAoaGFzQ29uc3RydWN0b3IudmFsdWUpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKHRva2VuLCBtZXNzYWdlc18xLk1lc3NhZ2VzLkR1cGxpY2F0ZUNvbnN0cnVjdG9yKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIGhhc0NvbnN0cnVjdG9yLnZhbHVlID0gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGtpbmQgPSAnY29uc3RydWN0b3InO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLk1ldGhvZERlZmluaXRpb24oa2V5LCBjb21wdXRlZCwgdmFsdWUsIGtpbmQsIGlzU3RhdGljKSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUNsYXNzRWxlbWVudExpc3QgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGJvZHkgPSBbXTtcblx0ICAgICAgICB2YXIgaGFzQ29uc3RydWN0b3IgPSB7IHZhbHVlOiBmYWxzZSB9O1xuXHQgICAgICAgIHRoaXMuZXhwZWN0KCd7Jyk7XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLm1hdGNoKCd9JykpIHtcblx0ICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2goJzsnKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGJvZHkucHVzaCh0aGlzLnBhcnNlQ2xhc3NFbGVtZW50KGhhc0NvbnN0cnVjdG9yKSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJ30nKTtcblx0ICAgICAgICByZXR1cm4gYm9keTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQ2xhc3NCb2R5ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIGVsZW1lbnRMaXN0ID0gdGhpcy5wYXJzZUNsYXNzRWxlbWVudExpc3QoKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5DbGFzc0JvZHkoZWxlbWVudExpc3QpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQ2xhc3NEZWNsYXJhdGlvbiA9IGZ1bmN0aW9uIChpZGVudGlmaWVySXNPcHRpb25hbCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzU3RyaWN0ID0gdGhpcy5jb250ZXh0LnN0cmljdDtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuc3RyaWN0ID0gdHJ1ZTtcblx0ICAgICAgICB0aGlzLmV4cGVjdEtleXdvcmQoJ2NsYXNzJyk7XG5cdCAgICAgICAgdmFyIGlkID0gKGlkZW50aWZpZXJJc09wdGlvbmFsICYmICh0aGlzLmxvb2thaGVhZC50eXBlICE9PSAzIC8qIElkZW50aWZpZXIgKi8pKSA/IG51bGwgOiB0aGlzLnBhcnNlVmFyaWFibGVJZGVudGlmaWVyKCk7XG5cdCAgICAgICAgdmFyIHN1cGVyQ2xhc3MgPSBudWxsO1xuXHQgICAgICAgIGlmICh0aGlzLm1hdGNoS2V5d29yZCgnZXh0ZW5kcycpKSB7XG5cdCAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgIHN1cGVyQ2xhc3MgPSB0aGlzLmlzb2xhdGVDb3ZlckdyYW1tYXIodGhpcy5wYXJzZUxlZnRIYW5kU2lkZUV4cHJlc3Npb25BbGxvd0NhbGwpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgY2xhc3NCb2R5ID0gdGhpcy5wYXJzZUNsYXNzQm9keSgpO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5zdHJpY3QgPSBwcmV2aW91c1N0cmljdDtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5DbGFzc0RlY2xhcmF0aW9uKGlkLCBzdXBlckNsYXNzLCBjbGFzc0JvZHkpKTtcblx0ICAgIH07XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQ2xhc3NFeHByZXNzaW9uID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzU3RyaWN0ID0gdGhpcy5jb250ZXh0LnN0cmljdDtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuc3RyaWN0ID0gdHJ1ZTtcblx0ICAgICAgICB0aGlzLmV4cGVjdEtleXdvcmQoJ2NsYXNzJyk7XG5cdCAgICAgICAgdmFyIGlkID0gKHRoaXMubG9va2FoZWFkLnR5cGUgPT09IDMgLyogSWRlbnRpZmllciAqLykgPyB0aGlzLnBhcnNlVmFyaWFibGVJZGVudGlmaWVyKCkgOiBudWxsO1xuXHQgICAgICAgIHZhciBzdXBlckNsYXNzID0gbnVsbDtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaEtleXdvcmQoJ2V4dGVuZHMnKSkge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICBzdXBlckNsYXNzID0gdGhpcy5pc29sYXRlQ292ZXJHcmFtbWFyKHRoaXMucGFyc2VMZWZ0SGFuZFNpZGVFeHByZXNzaW9uQWxsb3dDYWxsKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGNsYXNzQm9keSA9IHRoaXMucGFyc2VDbGFzc0JvZHkoKTtcblx0ICAgICAgICB0aGlzLmNvbnRleHQuc3RyaWN0ID0gcHJldmlvdXNTdHJpY3Q7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuQ2xhc3NFeHByZXNzaW9uKGlkLCBzdXBlckNsYXNzLCBjbGFzc0JvZHkpKTtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zY3JpcHRzXG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1tb2R1bGVzXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlTW9kdWxlID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5zdHJpY3QgPSB0cnVlO1xuXHQgICAgICAgIHRoaXMuY29udGV4dC5pc01vZHVsZSA9IHRydWU7XG5cdCAgICAgICAgdGhpcy5zY2FubmVyLmlzTW9kdWxlID0gdHJ1ZTtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHZhciBib2R5ID0gdGhpcy5wYXJzZURpcmVjdGl2ZVByb2xvZ3VlcygpO1xuXHQgICAgICAgIHdoaWxlICh0aGlzLmxvb2thaGVhZC50eXBlICE9PSAyIC8qIEVPRiAqLykge1xuXHQgICAgICAgICAgICBib2R5LnB1c2godGhpcy5wYXJzZVN0YXRlbWVudExpc3RJdGVtKCkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5Nb2R1bGUoYm9keSkpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VTY3JpcHQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgYm9keSA9IHRoaXMucGFyc2VEaXJlY3RpdmVQcm9sb2d1ZXMoKTtcblx0ICAgICAgICB3aGlsZSAodGhpcy5sb29rYWhlYWQudHlwZSAhPT0gMiAvKiBFT0YgKi8pIHtcblx0ICAgICAgICAgICAgYm9keS5wdXNoKHRoaXMucGFyc2VTdGF0ZW1lbnRMaXN0SXRlbSgpKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuU2NyaXB0KGJvZHkpKTtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pbXBvcnRzXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlTW9kdWxlU3BlY2lmaWVyID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgaWYgKHRoaXMubG9va2FoZWFkLnR5cGUgIT09IDggLyogU3RyaW5nTGl0ZXJhbCAqLykge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93RXJyb3IobWVzc2FnZXNfMS5NZXNzYWdlcy5JbnZhbGlkTW9kdWxlU3BlY2lmaWVyKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIHRva2VuID0gdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICB2YXIgcmF3ID0gdGhpcy5nZXRUb2tlblJhdyh0b2tlbik7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZmluYWxpemUobm9kZSwgbmV3IE5vZGUuTGl0ZXJhbCh0b2tlbi52YWx1ZSwgcmF3KSk7XG5cdCAgICB9O1xuXHQgICAgLy8gaW1wb3J0IHs8Zm9vIGFzIGJhcj59IC4uLjtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VJbXBvcnRTcGVjaWZpZXIgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB2YXIgaW1wb3J0ZWQ7XG5cdCAgICAgICAgdmFyIGxvY2FsO1xuXHQgICAgICAgIGlmICh0aGlzLmxvb2thaGVhZC50eXBlID09PSAzIC8qIElkZW50aWZpZXIgKi8pIHtcblx0ICAgICAgICAgICAgaW1wb3J0ZWQgPSB0aGlzLnBhcnNlVmFyaWFibGVJZGVudGlmaWVyKCk7XG5cdCAgICAgICAgICAgIGxvY2FsID0gaW1wb3J0ZWQ7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoQ29udGV4dHVhbEtleXdvcmQoJ2FzJykpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICBsb2NhbCA9IHRoaXMucGFyc2VWYXJpYWJsZUlkZW50aWZpZXIoKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgaW1wb3J0ZWQgPSB0aGlzLnBhcnNlSWRlbnRpZmllck5hbWUoKTtcblx0ICAgICAgICAgICAgbG9jYWwgPSBpbXBvcnRlZDtcblx0ICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2hDb250ZXh0dWFsS2V5d29yZCgnYXMnKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgIGxvY2FsID0gdGhpcy5wYXJzZVZhcmlhYmxlSWRlbnRpZmllcigpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbih0aGlzLm5leHRUb2tlbigpKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5JbXBvcnRTcGVjaWZpZXIobG9jYWwsIGltcG9ydGVkKSk7XG5cdCAgICB9O1xuXHQgICAgLy8ge2ZvbywgYmFyIGFzIGJhc31cblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VOYW1lZEltcG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJ3snKTtcblx0ICAgICAgICB2YXIgc3BlY2lmaWVycyA9IFtdO1xuXHQgICAgICAgIHdoaWxlICghdGhpcy5tYXRjaCgnfScpKSB7XG5cdCAgICAgICAgICAgIHNwZWNpZmllcnMucHVzaCh0aGlzLnBhcnNlSW1wb3J0U3BlY2lmaWVyKCkpO1xuXHQgICAgICAgICAgICBpZiAoIXRoaXMubWF0Y2goJ30nKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5leHBlY3QoJywnKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmV4cGVjdCgnfScpO1xuXHQgICAgICAgIHJldHVybiBzcGVjaWZpZXJzO1xuXHQgICAgfTtcblx0ICAgIC8vIGltcG9ydCA8Zm9vPiAuLi47XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlSW1wb3J0RGVmYXVsdFNwZWNpZmllciA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZSgpO1xuXHQgICAgICAgIHZhciBsb2NhbCA9IHRoaXMucGFyc2VJZGVudGlmaWVyTmFtZSgpO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkltcG9ydERlZmF1bHRTcGVjaWZpZXIobG9jYWwpKTtcblx0ICAgIH07XG5cdCAgICAvLyBpbXBvcnQgPCogYXMgZm9vPiAuLi47XG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3QoJyonKTtcblx0ICAgICAgICBpZiAoIXRoaXMubWF0Y2hDb250ZXh0dWFsS2V5d29yZCgnYXMnKSkge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93RXJyb3IobWVzc2FnZXNfMS5NZXNzYWdlcy5Ob0FzQWZ0ZXJJbXBvcnROYW1lc3BhY2UpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgIHZhciBsb2NhbCA9IHRoaXMucGFyc2VJZGVudGlmaWVyTmFtZSgpO1xuXHQgICAgICAgIHJldHVybiB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkltcG9ydE5hbWVzcGFjZVNwZWNpZmllcihsb2NhbCkpO1xuXHQgICAgfTtcblx0ICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VJbXBvcnREZWNsYXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBpZiAodGhpcy5jb250ZXh0LmluRnVuY3Rpb25Cb2R5KSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dFcnJvcihtZXNzYWdlc18xLk1lc3NhZ2VzLklsbGVnYWxJbXBvcnREZWNsYXJhdGlvbik7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdGhpcy5leHBlY3RLZXl3b3JkKCdpbXBvcnQnKTtcblx0ICAgICAgICB2YXIgc3JjO1xuXHQgICAgICAgIHZhciBzcGVjaWZpZXJzID0gW107XG5cdCAgICAgICAgaWYgKHRoaXMubG9va2FoZWFkLnR5cGUgPT09IDggLyogU3RyaW5nTGl0ZXJhbCAqLykge1xuXHQgICAgICAgICAgICAvLyBpbXBvcnQgJ2Zvbyc7XG5cdCAgICAgICAgICAgIHNyYyA9IHRoaXMucGFyc2VNb2R1bGVTcGVjaWZpZXIoKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCd7JykpIHtcblx0ICAgICAgICAgICAgICAgIC8vIGltcG9ydCB7YmFyfVxuXHQgICAgICAgICAgICAgICAgc3BlY2lmaWVycyA9IHNwZWNpZmllcnMuY29uY2F0KHRoaXMucGFyc2VOYW1lZEltcG9ydHMoKSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tYXRjaCgnKicpKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBpbXBvcnQgKiBhcyBmb29cblx0ICAgICAgICAgICAgICAgIHNwZWNpZmllcnMucHVzaCh0aGlzLnBhcnNlSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyKCkpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNJZGVudGlmaWVyTmFtZSh0aGlzLmxvb2thaGVhZCkgJiYgIXRoaXMubWF0Y2hLZXl3b3JkKCdkZWZhdWx0JykpIHtcblx0ICAgICAgICAgICAgICAgIC8vIGltcG9ydCBmb29cblx0ICAgICAgICAgICAgICAgIHNwZWNpZmllcnMucHVzaCh0aGlzLnBhcnNlSW1wb3J0RGVmYXVsdFNwZWNpZmllcigpKTtcblx0ICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCcsJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoKCcqJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW1wb3J0IGZvbywgKiBhcyBmb29cblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3BlY2lmaWVycy5wdXNoKHRoaXMucGFyc2VJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXIoKSk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubWF0Y2goJ3snKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbXBvcnQgZm9vLCB7YmFyfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWZpZXJzID0gc3BlY2lmaWVycy5jb25jYXQodGhpcy5wYXJzZU5hbWVkSW1wb3J0cygpKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odGhpcy5sb29rYWhlYWQpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odGhpcy5uZXh0VG9rZW4oKSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKCF0aGlzLm1hdGNoQ29udGV4dHVhbEtleXdvcmQoJ2Zyb20nKSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSB0aGlzLmxvb2thaGVhZC52YWx1ZSA/IG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW5leHBlY3RlZFRva2VuIDogbWVzc2FnZXNfMS5NZXNzYWdlcy5NaXNzaW5nRnJvbUNsYXVzZTtcblx0ICAgICAgICAgICAgICAgIHRoaXMudGhyb3dFcnJvcihtZXNzYWdlLCB0aGlzLmxvb2thaGVhZC52YWx1ZSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgc3JjID0gdGhpcy5wYXJzZU1vZHVsZVNwZWNpZmllcigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmNvbnN1bWVTZW1pY29sb24oKTtcblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5JbXBvcnREZWNsYXJhdGlvbihzcGVjaWZpZXJzLCBzcmMpKTtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1leHBvcnRzXG5cdCAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlRXhwb3J0U3BlY2lmaWVyID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XG5cdCAgICAgICAgdmFyIGxvY2FsID0gdGhpcy5wYXJzZUlkZW50aWZpZXJOYW1lKCk7XG5cdCAgICAgICAgdmFyIGV4cG9ydGVkID0gbG9jYWw7XG5cdCAgICAgICAgaWYgKHRoaXMubWF0Y2hDb250ZXh0dWFsS2V5d29yZCgnYXMnKSkge1xuXHQgICAgICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuXHQgICAgICAgICAgICBleHBvcnRlZCA9IHRoaXMucGFyc2VJZGVudGlmaWVyTmFtZSgpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5FeHBvcnRTcGVjaWZpZXIobG9jYWwsIGV4cG9ydGVkKSk7XG5cdCAgICB9O1xuXHQgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUV4cG9ydERlY2xhcmF0aW9uID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmICh0aGlzLmNvbnRleHQuaW5GdW5jdGlvbkJvZHkpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd0Vycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuSWxsZWdhbEV4cG9ydERlY2xhcmF0aW9uKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcblx0ICAgICAgICB0aGlzLmV4cGVjdEtleXdvcmQoJ2V4cG9ydCcpO1xuXHQgICAgICAgIHZhciBleHBvcnREZWNsYXJhdGlvbjtcblx0ICAgICAgICBpZiAodGhpcy5tYXRjaEtleXdvcmQoJ2RlZmF1bHQnKSkge1xuXHQgICAgICAgICAgICAvLyBleHBvcnQgZGVmYXVsdCAuLi5cblx0ICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2hLZXl3b3JkKCdmdW5jdGlvbicpKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmb28gKCkge31cblx0ICAgICAgICAgICAgICAgIC8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHt9XG5cdCAgICAgICAgICAgICAgICB2YXIgZGVjbGFyYXRpb24gPSB0aGlzLnBhcnNlRnVuY3Rpb25EZWNsYXJhdGlvbih0cnVlKTtcblx0ICAgICAgICAgICAgICAgIGV4cG9ydERlY2xhcmF0aW9uID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5FeHBvcnREZWZhdWx0RGVjbGFyYXRpb24oZGVjbGFyYXRpb24pKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1hdGNoS2V5d29yZCgnY2xhc3MnKSkge1xuXHQgICAgICAgICAgICAgICAgLy8gZXhwb3J0IGRlZmF1bHQgY2xhc3MgZm9vIHt9XG5cdCAgICAgICAgICAgICAgICB2YXIgZGVjbGFyYXRpb24gPSB0aGlzLnBhcnNlQ2xhc3NEZWNsYXJhdGlvbih0cnVlKTtcblx0ICAgICAgICAgICAgICAgIGV4cG9ydERlY2xhcmF0aW9uID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5FeHBvcnREZWZhdWx0RGVjbGFyYXRpb24oZGVjbGFyYXRpb24pKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1hdGNoQ29udGV4dHVhbEtleXdvcmQoJ2FzeW5jJykpIHtcblx0ICAgICAgICAgICAgICAgIC8vIGV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGYgKCkge31cblx0ICAgICAgICAgICAgICAgIC8vIGV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uICgpIHt9XG5cdCAgICAgICAgICAgICAgICAvLyBleHBvcnQgZGVmYXVsdCBhc3luYyB4ID0+IHhcblx0ICAgICAgICAgICAgICAgIHZhciBkZWNsYXJhdGlvbiA9IHRoaXMubWF0Y2hBc3luY0Z1bmN0aW9uKCkgPyB0aGlzLnBhcnNlRnVuY3Rpb25EZWNsYXJhdGlvbih0cnVlKSA6IHRoaXMucGFyc2VBc3NpZ25tZW50RXhwcmVzc2lvbigpO1xuXHQgICAgICAgICAgICAgICAgZXhwb3J0RGVjbGFyYXRpb24gPSB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkV4cG9ydERlZmF1bHREZWNsYXJhdGlvbihkZWNsYXJhdGlvbikpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2hDb250ZXh0dWFsS2V5d29yZCgnZnJvbScpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy50aHJvd0Vycm9yKG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW5leHBlY3RlZFRva2VuLCB0aGlzLmxvb2thaGVhZC52YWx1ZSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAvLyBleHBvcnQgZGVmYXVsdCB7fTtcblx0ICAgICAgICAgICAgICAgIC8vIGV4cG9ydCBkZWZhdWx0IFtdO1xuXHQgICAgICAgICAgICAgICAgLy8gZXhwb3J0IGRlZmF1bHQgKDEgKyAyKTtcblx0ICAgICAgICAgICAgICAgIHZhciBkZWNsYXJhdGlvbiA9IHRoaXMubWF0Y2goJ3snKSA/IHRoaXMucGFyc2VPYmplY3RJbml0aWFsaXplcigpIDpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoKCdbJykgPyB0aGlzLnBhcnNlQXJyYXlJbml0aWFsaXplcigpIDogdGhpcy5wYXJzZUFzc2lnbm1lbnRFeHByZXNzaW9uKCk7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVTZW1pY29sb24oKTtcblx0ICAgICAgICAgICAgICAgIGV4cG9ydERlY2xhcmF0aW9uID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5FeHBvcnREZWZhdWx0RGVjbGFyYXRpb24oZGVjbGFyYXRpb24pKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmICh0aGlzLm1hdGNoKCcqJykpIHtcblx0ICAgICAgICAgICAgLy8gZXhwb3J0ICogZnJvbSAnZm9vJztcblx0ICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgaWYgKCF0aGlzLm1hdGNoQ29udGV4dHVhbEtleXdvcmQoJ2Zyb20nKSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSB0aGlzLmxvb2thaGVhZC52YWx1ZSA/IG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW5leHBlY3RlZFRva2VuIDogbWVzc2FnZXNfMS5NZXNzYWdlcy5NaXNzaW5nRnJvbUNsYXVzZTtcblx0ICAgICAgICAgICAgICAgIHRoaXMudGhyb3dFcnJvcihtZXNzYWdlLCB0aGlzLmxvb2thaGVhZC52YWx1ZSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcblx0ICAgICAgICAgICAgdmFyIHNyYyA9IHRoaXMucGFyc2VNb2R1bGVTcGVjaWZpZXIoKTtcblx0ICAgICAgICAgICAgdGhpcy5jb25zdW1lU2VtaWNvbG9uKCk7XG5cdCAgICAgICAgICAgIGV4cG9ydERlY2xhcmF0aW9uID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5FeHBvcnRBbGxEZWNsYXJhdGlvbihzcmMpKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSBpZiAodGhpcy5sb29rYWhlYWQudHlwZSA9PT0gNCAvKiBLZXl3b3JkICovKSB7XG5cdCAgICAgICAgICAgIC8vIGV4cG9ydCB2YXIgZiA9IDE7XG5cdCAgICAgICAgICAgIHZhciBkZWNsYXJhdGlvbiA9IHZvaWQgMDtcblx0ICAgICAgICAgICAgc3dpdGNoICh0aGlzLmxvb2thaGVhZC52YWx1ZSkge1xuXHQgICAgICAgICAgICAgICAgY2FzZSAnbGV0Jzpcblx0ICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnN0Jzpcblx0ICAgICAgICAgICAgICAgICAgICBkZWNsYXJhdGlvbiA9IHRoaXMucGFyc2VMZXhpY2FsRGVjbGFyYXRpb24oeyBpbkZvcjogZmFsc2UgfSk7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlICd2YXInOlxuXHQgICAgICAgICAgICAgICAgY2FzZSAnY2xhc3MnOlxuXHQgICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuXHQgICAgICAgICAgICAgICAgICAgIGRlY2xhcmF0aW9uID0gdGhpcy5wYXJzZVN0YXRlbWVudExpc3RJdGVtKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4odGhpcy5sb29rYWhlYWQpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGV4cG9ydERlY2xhcmF0aW9uID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5FeHBvcnROYW1lZERlY2xhcmF0aW9uKGRlY2xhcmF0aW9uLCBbXSwgbnVsbCkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmICh0aGlzLm1hdGNoQXN5bmNGdW5jdGlvbigpKSB7XG5cdCAgICAgICAgICAgIHZhciBkZWNsYXJhdGlvbiA9IHRoaXMucGFyc2VGdW5jdGlvbkRlY2xhcmF0aW9uKCk7XG5cdCAgICAgICAgICAgIGV4cG9ydERlY2xhcmF0aW9uID0gdGhpcy5maW5hbGl6ZShub2RlLCBuZXcgTm9kZS5FeHBvcnROYW1lZERlY2xhcmF0aW9uKGRlY2xhcmF0aW9uLCBbXSwgbnVsbCkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdmFyIHNwZWNpZmllcnMgPSBbXTtcblx0ICAgICAgICAgICAgdmFyIHNvdXJjZSA9IG51bGw7XG5cdCAgICAgICAgICAgIHZhciBpc0V4cG9ydEZyb21JZGVudGlmaWVyID0gZmFsc2U7XG5cdCAgICAgICAgICAgIHRoaXMuZXhwZWN0KCd7Jyk7XG5cdCAgICAgICAgICAgIHdoaWxlICghdGhpcy5tYXRjaCgnfScpKSB7XG5cdCAgICAgICAgICAgICAgICBpc0V4cG9ydEZyb21JZGVudGlmaWVyID0gaXNFeHBvcnRGcm9tSWRlbnRpZmllciB8fCB0aGlzLm1hdGNoS2V5d29yZCgnZGVmYXVsdCcpO1xuXHQgICAgICAgICAgICAgICAgc3BlY2lmaWVycy5wdXNoKHRoaXMucGFyc2VFeHBvcnRTcGVjaWZpZXIoKSk7XG5cdCAgICAgICAgICAgICAgICBpZiAoIXRoaXMubWF0Y2goJ30nKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwZWN0KCcsJyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGhpcy5leHBlY3QoJ30nKTtcblx0ICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2hDb250ZXh0dWFsS2V5d29yZCgnZnJvbScpKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBleHBvcnQge2RlZmF1bHR9IGZyb20gJ2Zvbyc7XG5cdCAgICAgICAgICAgICAgICAvLyBleHBvcnQge2Zvb30gZnJvbSAnZm9vJztcblx0ICAgICAgICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICBzb3VyY2UgPSB0aGlzLnBhcnNlTW9kdWxlU3BlY2lmaWVyKCk7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVTZW1pY29sb24oKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmIChpc0V4cG9ydEZyb21JZGVudGlmaWVyKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBleHBvcnQge2RlZmF1bHR9OyAvLyBtaXNzaW5nIGZyb21DbGF1c2Vcblx0ICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gdGhpcy5sb29rYWhlYWQudmFsdWUgPyBtZXNzYWdlc18xLk1lc3NhZ2VzLlVuZXhwZWN0ZWRUb2tlbiA6IG1lc3NhZ2VzXzEuTWVzc2FnZXMuTWlzc2luZ0Zyb21DbGF1c2U7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRocm93RXJyb3IobWVzc2FnZSwgdGhpcy5sb29rYWhlYWQudmFsdWUpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gZXhwb3J0IHtmb299O1xuXHQgICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lU2VtaWNvbG9uKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZXhwb3J0RGVjbGFyYXRpb24gPSB0aGlzLmZpbmFsaXplKG5vZGUsIG5ldyBOb2RlLkV4cG9ydE5hbWVkRGVjbGFyYXRpb24obnVsbCwgc3BlY2lmaWVycywgc291cmNlKSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBleHBvcnREZWNsYXJhdGlvbjtcblx0ICAgIH07XG5cdCAgICByZXR1cm4gUGFyc2VyO1xuXHR9KCkpO1xuXHRleHBvcnRzLlBhcnNlciA9IFBhcnNlcjtcblxuXG4vKioqLyB9LFxuLyogOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdC8vIEVuc3VyZSB0aGUgY29uZGl0aW9uIGlzIHRydWUsIG90aGVyd2lzZSB0aHJvdyBhbiBlcnJvci5cblx0Ly8gVGhpcyBpcyBvbmx5IHRvIGhhdmUgYSBiZXR0ZXIgY29udHJhY3Qgc2VtYW50aWMsIGkuZS4gYW5vdGhlciBzYWZldHkgbmV0XG5cdC8vIHRvIGNhdGNoIGEgbG9naWMgZXJyb3IuIFRoZSBjb25kaXRpb24gc2hhbGwgYmUgZnVsZmlsbGVkIGluIG5vcm1hbCBjYXNlLlxuXHQvLyBEbyBOT1QgdXNlIHRoaXMgdG8gZW5mb3JjZSBhIGNlcnRhaW4gY29uZGl0aW9uIG9uIGFueSB1c2VyIGlucHV0LlxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5cdGZ1bmN0aW9uIGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0ICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuXHQgICAgaWYgKCFjb25kaXRpb24pIHtcblx0ICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FTU0VSVDogJyArIG1lc3NhZ2UpO1xuXHQgICAgfVxuXHR9XG5cdGV4cG9ydHMuYXNzZXJ0ID0gYXNzZXJ0O1xuXG5cbi8qKiovIH0sXG4vKiAxMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdC8qIHRzbGludDpkaXNhYmxlOm1heC1jbGFzc2VzLXBlci1maWxlICovXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcblx0dmFyIEVycm9ySGFuZGxlciA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBFcnJvckhhbmRsZXIoKSB7XG5cdCAgICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcblx0ICAgICAgICB0aGlzLnRvbGVyYW50ID0gZmFsc2U7XG5cdCAgICB9XG5cdCAgICBFcnJvckhhbmRsZXIucHJvdG90eXBlLnJlY29yZEVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG5cdCAgICAgICAgdGhpcy5lcnJvcnMucHVzaChlcnJvcik7XG5cdCAgICB9O1xuXHQgICAgRXJyb3JIYW5kbGVyLnByb3RvdHlwZS50b2xlcmF0ZSA9IGZ1bmN0aW9uIChlcnJvcikge1xuXHQgICAgICAgIGlmICh0aGlzLnRvbGVyYW50KSB7XG5cdCAgICAgICAgICAgIHRoaXMucmVjb3JkRXJyb3IoZXJyb3IpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIEVycm9ySGFuZGxlci5wcm90b3R5cGUuY29uc3RydWN0RXJyb3IgPSBmdW5jdGlvbiAobXNnLCBjb2x1bW4pIHtcblx0ICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobXNnKTtcblx0ICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICB0aHJvdyBlcnJvcjtcblx0ICAgICAgICB9XG5cdCAgICAgICAgY2F0Y2ggKGJhc2UpIHtcblx0ICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cblx0ICAgICAgICAgICAgaWYgKE9iamVjdC5jcmVhdGUgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG5cdCAgICAgICAgICAgICAgICBlcnJvciA9IE9iamVjdC5jcmVhdGUoYmFzZSk7XG5cdCAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXJyb3IsICdjb2x1bW4nLCB7IHZhbHVlOiBjb2x1bW4gfSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0ICAgICAgICByZXR1cm4gZXJyb3I7XG5cdCAgICB9O1xuXHQgICAgRXJyb3JIYW5kbGVyLnByb3RvdHlwZS5jcmVhdGVFcnJvciA9IGZ1bmN0aW9uIChpbmRleCwgbGluZSwgY29sLCBkZXNjcmlwdGlvbikge1xuXHQgICAgICAgIHZhciBtc2cgPSAnTGluZSAnICsgbGluZSArICc6ICcgKyBkZXNjcmlwdGlvbjtcblx0ICAgICAgICB2YXIgZXJyb3IgPSB0aGlzLmNvbnN0cnVjdEVycm9yKG1zZywgY29sKTtcblx0ICAgICAgICBlcnJvci5pbmRleCA9IGluZGV4O1xuXHQgICAgICAgIGVycm9yLmxpbmVOdW1iZXIgPSBsaW5lO1xuXHQgICAgICAgIGVycm9yLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG5cdCAgICAgICAgcmV0dXJuIGVycm9yO1xuXHQgICAgfTtcblx0ICAgIEVycm9ySGFuZGxlci5wcm90b3R5cGUudGhyb3dFcnJvciA9IGZ1bmN0aW9uIChpbmRleCwgbGluZSwgY29sLCBkZXNjcmlwdGlvbikge1xuXHQgICAgICAgIHRocm93IHRoaXMuY3JlYXRlRXJyb3IoaW5kZXgsIGxpbmUsIGNvbCwgZGVzY3JpcHRpb24pO1xuXHQgICAgfTtcblx0ICAgIEVycm9ySGFuZGxlci5wcm90b3R5cGUudG9sZXJhdGVFcnJvciA9IGZ1bmN0aW9uIChpbmRleCwgbGluZSwgY29sLCBkZXNjcmlwdGlvbikge1xuXHQgICAgICAgIHZhciBlcnJvciA9IHRoaXMuY3JlYXRlRXJyb3IoaW5kZXgsIGxpbmUsIGNvbCwgZGVzY3JpcHRpb24pO1xuXHQgICAgICAgIGlmICh0aGlzLnRvbGVyYW50KSB7XG5cdCAgICAgICAgICAgIHRoaXMucmVjb3JkRXJyb3IoZXJyb3IpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIHJldHVybiBFcnJvckhhbmRsZXI7XG5cdH0oKSk7XG5cdGV4cG9ydHMuRXJyb3JIYW5kbGVyID0gRXJyb3JIYW5kbGVyO1xuXG5cbi8qKiovIH0sXG4vKiAxMSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcblx0Ly8gRXJyb3IgbWVzc2FnZXMgc2hvdWxkIGJlIGlkZW50aWNhbCB0byBWOC5cblx0ZXhwb3J0cy5NZXNzYWdlcyA9IHtcblx0ICAgIEJhZEdldHRlckFyaXR5OiAnR2V0dGVyIG11c3Qgbm90IGhhdmUgYW55IGZvcm1hbCBwYXJhbWV0ZXJzJyxcblx0ICAgIEJhZFNldHRlckFyaXR5OiAnU2V0dGVyIG11c3QgaGF2ZSBleGFjdGx5IG9uZSBmb3JtYWwgcGFyYW1ldGVyJyxcblx0ICAgIEJhZFNldHRlclJlc3RQYXJhbWV0ZXI6ICdTZXR0ZXIgZnVuY3Rpb24gYXJndW1lbnQgbXVzdCBub3QgYmUgYSByZXN0IHBhcmFtZXRlcicsXG5cdCAgICBDb25zdHJ1Y3RvcklzQXN5bmM6ICdDbGFzcyBjb25zdHJ1Y3RvciBtYXkgbm90IGJlIGFuIGFzeW5jIG1ldGhvZCcsXG5cdCAgICBDb25zdHJ1Y3RvclNwZWNpYWxNZXRob2Q6ICdDbGFzcyBjb25zdHJ1Y3RvciBtYXkgbm90IGJlIGFuIGFjY2Vzc29yJyxcblx0ICAgIERlY2xhcmF0aW9uTWlzc2luZ0luaXRpYWxpemVyOiAnTWlzc2luZyBpbml0aWFsaXplciBpbiAlMCBkZWNsYXJhdGlvbicsXG5cdCAgICBEZWZhdWx0UmVzdFBhcmFtZXRlcjogJ1VuZXhwZWN0ZWQgdG9rZW4gPScsXG5cdCAgICBEdXBsaWNhdGVCaW5kaW5nOiAnRHVwbGljYXRlIGJpbmRpbmcgJTAnLFxuXHQgICAgRHVwbGljYXRlQ29uc3RydWN0b3I6ICdBIGNsYXNzIG1heSBvbmx5IGhhdmUgb25lIGNvbnN0cnVjdG9yJyxcblx0ICAgIER1cGxpY2F0ZVByb3RvUHJvcGVydHk6ICdEdXBsaWNhdGUgX19wcm90b19fIGZpZWxkcyBhcmUgbm90IGFsbG93ZWQgaW4gb2JqZWN0IGxpdGVyYWxzJyxcblx0ICAgIEZvckluT2ZMb29wSW5pdGlhbGl6ZXI6ICclMCBsb29wIHZhcmlhYmxlIGRlY2xhcmF0aW9uIG1heSBub3QgaGF2ZSBhbiBpbml0aWFsaXplcicsXG5cdCAgICBHZW5lcmF0b3JJbkxlZ2FjeUNvbnRleHQ6ICdHZW5lcmF0b3IgZGVjbGFyYXRpb25zIGFyZSBub3QgYWxsb3dlZCBpbiBsZWdhY3kgY29udGV4dHMnLFxuXHQgICAgSWxsZWdhbEJyZWFrOiAnSWxsZWdhbCBicmVhayBzdGF0ZW1lbnQnLFxuXHQgICAgSWxsZWdhbENvbnRpbnVlOiAnSWxsZWdhbCBjb250aW51ZSBzdGF0ZW1lbnQnLFxuXHQgICAgSWxsZWdhbEV4cG9ydERlY2xhcmF0aW9uOiAnVW5leHBlY3RlZCB0b2tlbicsXG5cdCAgICBJbGxlZ2FsSW1wb3J0RGVjbGFyYXRpb246ICdVbmV4cGVjdGVkIHRva2VuJyxcblx0ICAgIElsbGVnYWxMYW5ndWFnZU1vZGVEaXJlY3RpdmU6ICdJbGxlZ2FsIFxcJ3VzZSBzdHJpY3RcXCcgZGlyZWN0aXZlIGluIGZ1bmN0aW9uIHdpdGggbm9uLXNpbXBsZSBwYXJhbWV0ZXIgbGlzdCcsXG5cdCAgICBJbGxlZ2FsUmV0dXJuOiAnSWxsZWdhbCByZXR1cm4gc3RhdGVtZW50Jyxcblx0ICAgIEludmFsaWRFc2NhcGVkUmVzZXJ2ZWRXb3JkOiAnS2V5d29yZCBtdXN0IG5vdCBjb250YWluIGVzY2FwZWQgY2hhcmFjdGVycycsXG5cdCAgICBJbnZhbGlkSGV4RXNjYXBlU2VxdWVuY2U6ICdJbnZhbGlkIGhleGFkZWNpbWFsIGVzY2FwZSBzZXF1ZW5jZScsXG5cdCAgICBJbnZhbGlkTEhTSW5Bc3NpZ25tZW50OiAnSW52YWxpZCBsZWZ0LWhhbmQgc2lkZSBpbiBhc3NpZ25tZW50Jyxcblx0ICAgIEludmFsaWRMSFNJbkZvckluOiAnSW52YWxpZCBsZWZ0LWhhbmQgc2lkZSBpbiBmb3ItaW4nLFxuXHQgICAgSW52YWxpZExIU0luRm9yTG9vcDogJ0ludmFsaWQgbGVmdC1oYW5kIHNpZGUgaW4gZm9yLWxvb3AnLFxuXHQgICAgSW52YWxpZE1vZHVsZVNwZWNpZmllcjogJ1VuZXhwZWN0ZWQgdG9rZW4nLFxuXHQgICAgSW52YWxpZFJlZ0V4cDogJ0ludmFsaWQgcmVndWxhciBleHByZXNzaW9uJyxcblx0ICAgIExldEluTGV4aWNhbEJpbmRpbmc6ICdsZXQgaXMgZGlzYWxsb3dlZCBhcyBhIGxleGljYWxseSBib3VuZCBuYW1lJyxcblx0ICAgIE1pc3NpbmdGcm9tQ2xhdXNlOiAnVW5leHBlY3RlZCB0b2tlbicsXG5cdCAgICBNdWx0aXBsZURlZmF1bHRzSW5Td2l0Y2g6ICdNb3JlIHRoYW4gb25lIGRlZmF1bHQgY2xhdXNlIGluIHN3aXRjaCBzdGF0ZW1lbnQnLFxuXHQgICAgTmV3bGluZUFmdGVyVGhyb3c6ICdJbGxlZ2FsIG5ld2xpbmUgYWZ0ZXIgdGhyb3cnLFxuXHQgICAgTm9Bc0FmdGVySW1wb3J0TmFtZXNwYWNlOiAnVW5leHBlY3RlZCB0b2tlbicsXG5cdCAgICBOb0NhdGNoT3JGaW5hbGx5OiAnTWlzc2luZyBjYXRjaCBvciBmaW5hbGx5IGFmdGVyIHRyeScsXG5cdCAgICBQYXJhbWV0ZXJBZnRlclJlc3RQYXJhbWV0ZXI6ICdSZXN0IHBhcmFtZXRlciBtdXN0IGJlIGxhc3QgZm9ybWFsIHBhcmFtZXRlcicsXG5cdCAgICBSZWRlY2xhcmF0aW9uOiAnJTAgXFwnJTFcXCcgaGFzIGFscmVhZHkgYmVlbiBkZWNsYXJlZCcsXG5cdCAgICBTdGF0aWNQcm90b3R5cGU6ICdDbGFzc2VzIG1heSBub3QgaGF2ZSBzdGF0aWMgcHJvcGVydHkgbmFtZWQgcHJvdG90eXBlJyxcblx0ICAgIFN0cmljdENhdGNoVmFyaWFibGU6ICdDYXRjaCB2YXJpYWJsZSBtYXkgbm90IGJlIGV2YWwgb3IgYXJndW1lbnRzIGluIHN0cmljdCBtb2RlJyxcblx0ICAgIFN0cmljdERlbGV0ZTogJ0RlbGV0ZSBvZiBhbiB1bnF1YWxpZmllZCBpZGVudGlmaWVyIGluIHN0cmljdCBtb2RlLicsXG5cdCAgICBTdHJpY3RGdW5jdGlvbjogJ0luIHN0cmljdCBtb2RlIGNvZGUsIGZ1bmN0aW9ucyBjYW4gb25seSBiZSBkZWNsYXJlZCBhdCB0b3AgbGV2ZWwgb3IgaW5zaWRlIGEgYmxvY2snLFxuXHQgICAgU3RyaWN0RnVuY3Rpb25OYW1lOiAnRnVuY3Rpb24gbmFtZSBtYXkgbm90IGJlIGV2YWwgb3IgYXJndW1lbnRzIGluIHN0cmljdCBtb2RlJyxcblx0ICAgIFN0cmljdExIU0Fzc2lnbm1lbnQ6ICdBc3NpZ25tZW50IHRvIGV2YWwgb3IgYXJndW1lbnRzIGlzIG5vdCBhbGxvd2VkIGluIHN0cmljdCBtb2RlJyxcblx0ICAgIFN0cmljdExIU1Bvc3RmaXg6ICdQb3N0Zml4IGluY3JlbWVudC9kZWNyZW1lbnQgbWF5IG5vdCBoYXZlIGV2YWwgb3IgYXJndW1lbnRzIG9wZXJhbmQgaW4gc3RyaWN0IG1vZGUnLFxuXHQgICAgU3RyaWN0TEhTUHJlZml4OiAnUHJlZml4IGluY3JlbWVudC9kZWNyZW1lbnQgbWF5IG5vdCBoYXZlIGV2YWwgb3IgYXJndW1lbnRzIG9wZXJhbmQgaW4gc3RyaWN0IG1vZGUnLFxuXHQgICAgU3RyaWN0TW9kZVdpdGg6ICdTdHJpY3QgbW9kZSBjb2RlIG1heSBub3QgaW5jbHVkZSBhIHdpdGggc3RhdGVtZW50Jyxcblx0ICAgIFN0cmljdE9jdGFsTGl0ZXJhbDogJ09jdGFsIGxpdGVyYWxzIGFyZSBub3QgYWxsb3dlZCBpbiBzdHJpY3QgbW9kZS4nLFxuXHQgICAgU3RyaWN0UGFyYW1EdXBlOiAnU3RyaWN0IG1vZGUgZnVuY3Rpb24gbWF5IG5vdCBoYXZlIGR1cGxpY2F0ZSBwYXJhbWV0ZXIgbmFtZXMnLFxuXHQgICAgU3RyaWN0UGFyYW1OYW1lOiAnUGFyYW1ldGVyIG5hbWUgZXZhbCBvciBhcmd1bWVudHMgaXMgbm90IGFsbG93ZWQgaW4gc3RyaWN0IG1vZGUnLFxuXHQgICAgU3RyaWN0UmVzZXJ2ZWRXb3JkOiAnVXNlIG9mIGZ1dHVyZSByZXNlcnZlZCB3b3JkIGluIHN0cmljdCBtb2RlJyxcblx0ICAgIFN0cmljdFZhck5hbWU6ICdWYXJpYWJsZSBuYW1lIG1heSBub3QgYmUgZXZhbCBvciBhcmd1bWVudHMgaW4gc3RyaWN0IG1vZGUnLFxuXHQgICAgVGVtcGxhdGVPY3RhbExpdGVyYWw6ICdPY3RhbCBsaXRlcmFscyBhcmUgbm90IGFsbG93ZWQgaW4gdGVtcGxhdGUgc3RyaW5ncy4nLFxuXHQgICAgVW5leHBlY3RlZEVPUzogJ1VuZXhwZWN0ZWQgZW5kIG9mIGlucHV0Jyxcblx0ICAgIFVuZXhwZWN0ZWRJZGVudGlmaWVyOiAnVW5leHBlY3RlZCBpZGVudGlmaWVyJyxcblx0ICAgIFVuZXhwZWN0ZWROdW1iZXI6ICdVbmV4cGVjdGVkIG51bWJlcicsXG5cdCAgICBVbmV4cGVjdGVkUmVzZXJ2ZWQ6ICdVbmV4cGVjdGVkIHJlc2VydmVkIHdvcmQnLFxuXHQgICAgVW5leHBlY3RlZFN0cmluZzogJ1VuZXhwZWN0ZWQgc3RyaW5nJyxcblx0ICAgIFVuZXhwZWN0ZWRUZW1wbGF0ZTogJ1VuZXhwZWN0ZWQgcXVhc2kgJTAnLFxuXHQgICAgVW5leHBlY3RlZFRva2VuOiAnVW5leHBlY3RlZCB0b2tlbiAlMCcsXG5cdCAgICBVbmV4cGVjdGVkVG9rZW5JbGxlZ2FsOiAnVW5leHBlY3RlZCB0b2tlbiBJTExFR0FMJyxcblx0ICAgIFVua25vd25MYWJlbDogJ1VuZGVmaW5lZCBsYWJlbCBcXCclMFxcJycsXG5cdCAgICBVbnRlcm1pbmF0ZWRSZWdFeHA6ICdJbnZhbGlkIHJlZ3VsYXIgZXhwcmVzc2lvbjogbWlzc2luZyAvJ1xuXHR9O1xuXG5cbi8qKiovIH0sXG4vKiAxMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcblx0dmFyIGFzc2VydF8xID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KTtcblx0dmFyIGNoYXJhY3Rlcl8xID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblx0dmFyIG1lc3NhZ2VzXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKTtcblx0ZnVuY3Rpb24gaGV4VmFsdWUoY2gpIHtcblx0ICAgIHJldHVybiAnMDEyMzQ1Njc4OWFiY2RlZicuaW5kZXhPZihjaC50b0xvd2VyQ2FzZSgpKTtcblx0fVxuXHRmdW5jdGlvbiBvY3RhbFZhbHVlKGNoKSB7XG5cdCAgICByZXR1cm4gJzAxMjM0NTY3Jy5pbmRleE9mKGNoKTtcblx0fVxuXHR2YXIgU2Nhbm5lciA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBTY2FubmVyKGNvZGUsIGhhbmRsZXIpIHtcblx0ICAgICAgICB0aGlzLnNvdXJjZSA9IGNvZGU7XG5cdCAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIgPSBoYW5kbGVyO1xuXHQgICAgICAgIHRoaXMudHJhY2tDb21tZW50ID0gZmFsc2U7XG5cdCAgICAgICAgdGhpcy5pc01vZHVsZSA9IGZhbHNlO1xuXHQgICAgICAgIHRoaXMubGVuZ3RoID0gY29kZS5sZW5ndGg7XG5cdCAgICAgICAgdGhpcy5pbmRleCA9IDA7XG5cdCAgICAgICAgdGhpcy5saW5lTnVtYmVyID0gKGNvZGUubGVuZ3RoID4gMCkgPyAxIDogMDtcblx0ICAgICAgICB0aGlzLmxpbmVTdGFydCA9IDA7XG5cdCAgICAgICAgdGhpcy5jdXJseVN0YWNrID0gW107XG5cdCAgICB9XG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS5zYXZlU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXG5cdCAgICAgICAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcblx0ICAgICAgICAgICAgbGluZVN0YXJ0OiB0aGlzLmxpbmVTdGFydFxuXHQgICAgICAgIH07XG5cdCAgICB9O1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUucmVzdG9yZVN0YXRlID0gZnVuY3Rpb24gKHN0YXRlKSB7XG5cdCAgICAgICAgdGhpcy5pbmRleCA9IHN0YXRlLmluZGV4O1xuXHQgICAgICAgIHRoaXMubGluZU51bWJlciA9IHN0YXRlLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgdGhpcy5saW5lU3RhcnQgPSBzdGF0ZS5saW5lU3RhcnQ7XG5cdCAgICB9O1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUuZW9mID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLmluZGV4ID49IHRoaXMubGVuZ3RoO1xuXHQgICAgfTtcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLnRocm93VW5leHBlY3RlZFRva2VuID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcblx0ICAgICAgICBpZiAobWVzc2FnZSA9PT0gdm9pZCAwKSB7IG1lc3NhZ2UgPSBtZXNzYWdlc18xLk1lc3NhZ2VzLlVuZXhwZWN0ZWRUb2tlbklsbGVnYWw7IH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5lcnJvckhhbmRsZXIudGhyb3dFcnJvcih0aGlzLmluZGV4LCB0aGlzLmxpbmVOdW1iZXIsIHRoaXMuaW5kZXggLSB0aGlzLmxpbmVTdGFydCArIDEsIG1lc3NhZ2UpO1xuXHQgICAgfTtcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcblx0ICAgICAgICBpZiAobWVzc2FnZSA9PT0gdm9pZCAwKSB7IG1lc3NhZ2UgPSBtZXNzYWdlc18xLk1lc3NhZ2VzLlVuZXhwZWN0ZWRUb2tlbklsbGVnYWw7IH1cblx0ICAgICAgICB0aGlzLmVycm9ySGFuZGxlci50b2xlcmF0ZUVycm9yKHRoaXMuaW5kZXgsIHRoaXMubGluZU51bWJlciwgdGhpcy5pbmRleCAtIHRoaXMubGluZVN0YXJ0ICsgMSwgbWVzc2FnZSk7XG5cdCAgICB9O1xuXHQgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtY29tbWVudHNcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLnNraXBTaW5nbGVMaW5lQ29tbWVudCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcblx0ICAgICAgICB2YXIgY29tbWVudHMgPSBbXTtcblx0ICAgICAgICB2YXIgc3RhcnQsIGxvYztcblx0ICAgICAgICBpZiAodGhpcy50cmFja0NvbW1lbnQpIHtcblx0ICAgICAgICAgICAgY29tbWVudHMgPSBbXTtcblx0ICAgICAgICAgICAgc3RhcnQgPSB0aGlzLmluZGV4IC0gb2Zmc2V0O1xuXHQgICAgICAgICAgICBsb2MgPSB7XG5cdCAgICAgICAgICAgICAgICBzdGFydDoge1xuXHQgICAgICAgICAgICAgICAgICAgIGxpbmU6IHRoaXMubGluZU51bWJlcixcblx0ICAgICAgICAgICAgICAgICAgICBjb2x1bW46IHRoaXMuaW5kZXggLSB0aGlzLmxpbmVTdGFydCAtIG9mZnNldFxuXHQgICAgICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgICAgIGVuZDoge31cblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLmVvZigpKSB7XG5cdCAgICAgICAgICAgIHZhciBjaCA9IHRoaXMuc291cmNlLmNoYXJDb2RlQXQodGhpcy5pbmRleCk7XG5cdCAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0xpbmVUZXJtaW5hdG9yKGNoKSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhY2tDb21tZW50KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbG9jLmVuZCA9IHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogdGhpcy5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IHRoaXMuaW5kZXggLSB0aGlzLmxpbmVTdGFydCAtIDFcblx0ICAgICAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9IHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlMaW5lOiBmYWxzZSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2U6IFtzdGFydCArIG9mZnNldCwgdGhpcy5pbmRleCAtIDFdLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICByYW5nZTogW3N0YXJ0LCB0aGlzLmluZGV4IC0gMV0sXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGxvYzogbG9jXG5cdCAgICAgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgICAgICAgICBjb21tZW50cy5wdXNoKGVudHJ5KTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gMTMgJiYgdGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4KSA9PT0gMTApIHtcblx0ICAgICAgICAgICAgICAgICAgICArK3RoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICArK3RoaXMubGluZU51bWJlcjtcblx0ICAgICAgICAgICAgICAgIHRoaXMubGluZVN0YXJ0ID0gdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBjb21tZW50cztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodGhpcy50cmFja0NvbW1lbnQpIHtcblx0ICAgICAgICAgICAgbG9jLmVuZCA9IHtcblx0ICAgICAgICAgICAgICAgIGxpbmU6IHRoaXMubGluZU51bWJlcixcblx0ICAgICAgICAgICAgICAgIGNvbHVtbjogdGhpcy5pbmRleCAtIHRoaXMubGluZVN0YXJ0XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgIHZhciBlbnRyeSA9IHtcblx0ICAgICAgICAgICAgICAgIG11bHRpTGluZTogZmFsc2UsXG5cdCAgICAgICAgICAgICAgICBzbGljZTogW3N0YXJ0ICsgb2Zmc2V0LCB0aGlzLmluZGV4XSxcblx0ICAgICAgICAgICAgICAgIHJhbmdlOiBbc3RhcnQsIHRoaXMuaW5kZXhdLFxuXHQgICAgICAgICAgICAgICAgbG9jOiBsb2Ncblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgY29tbWVudHMucHVzaChlbnRyeSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBjb21tZW50cztcblx0ICAgIH07XG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS5za2lwTXVsdGlMaW5lQ29tbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgY29tbWVudHMgPSBbXTtcblx0ICAgICAgICB2YXIgc3RhcnQsIGxvYztcblx0ICAgICAgICBpZiAodGhpcy50cmFja0NvbW1lbnQpIHtcblx0ICAgICAgICAgICAgY29tbWVudHMgPSBbXTtcblx0ICAgICAgICAgICAgc3RhcnQgPSB0aGlzLmluZGV4IC0gMjtcblx0ICAgICAgICAgICAgbG9jID0ge1xuXHQgICAgICAgICAgICAgICAgc3RhcnQ6IHtcblx0ICAgICAgICAgICAgICAgICAgICBsaW5lOiB0aGlzLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgICAgICAgICAgY29sdW1uOiB0aGlzLmluZGV4IC0gdGhpcy5saW5lU3RhcnQgLSAyXG5cdCAgICAgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICAgICAgZW5kOiB7fVxuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH1cblx0ICAgICAgICB3aGlsZSAoIXRoaXMuZW9mKCkpIHtcblx0ICAgICAgICAgICAgdmFyIGNoID0gdGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4KTtcblx0ICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0xpbmVUZXJtaW5hdG9yKGNoKSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKGNoID09PSAweDBEICYmIHRoaXMuc291cmNlLmNoYXJDb2RlQXQodGhpcy5pbmRleCArIDEpID09PSAweDBBKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgKyt0aGlzLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgICAgICAgICArK3RoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmxpbmVTdGFydCA9IHRoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IDB4MkEpIHtcblx0ICAgICAgICAgICAgICAgIC8vIEJsb2NrIGNvbW1lbnQgZW5kcyB3aXRoICcqLycuXG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4ICsgMSkgPT09IDB4MkYpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ICs9IDI7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhY2tDb21tZW50KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGxvYy5lbmQgPSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lOiB0aGlzLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IHRoaXMuaW5kZXggLSB0aGlzLmxpbmVTdGFydFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW50cnkgPSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aUxpbmU6IHRydWUsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljZTogW3N0YXJ0ICsgMiwgdGhpcy5pbmRleCAtIDJdLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IFtzdGFydCwgdGhpcy5pbmRleF0sXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2M6IGxvY1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50cy5wdXNoKGVudHJ5KTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1lbnRzO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIC8vIFJhbiBvZmYgdGhlIGVuZCBvZiB0aGUgZmlsZSAtIHRoZSB3aG9sZSB0aGluZyBpcyBhIGNvbW1lbnRcblx0ICAgICAgICBpZiAodGhpcy50cmFja0NvbW1lbnQpIHtcblx0ICAgICAgICAgICAgbG9jLmVuZCA9IHtcblx0ICAgICAgICAgICAgICAgIGxpbmU6IHRoaXMubGluZU51bWJlcixcblx0ICAgICAgICAgICAgICAgIGNvbHVtbjogdGhpcy5pbmRleCAtIHRoaXMubGluZVN0YXJ0XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgIHZhciBlbnRyeSA9IHtcblx0ICAgICAgICAgICAgICAgIG11bHRpTGluZTogdHJ1ZSxcblx0ICAgICAgICAgICAgICAgIHNsaWNlOiBbc3RhcnQgKyAyLCB0aGlzLmluZGV4XSxcblx0ICAgICAgICAgICAgICAgIHJhbmdlOiBbc3RhcnQsIHRoaXMuaW5kZXhdLFxuXHQgICAgICAgICAgICAgICAgbG9jOiBsb2Ncblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgY29tbWVudHMucHVzaChlbnRyeSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4oKTtcblx0ICAgICAgICByZXR1cm4gY29tbWVudHM7XG5cdCAgICB9O1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUuc2NhbkNvbW1lbnRzID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBjb21tZW50cztcblx0ICAgICAgICBpZiAodGhpcy50cmFja0NvbW1lbnQpIHtcblx0ICAgICAgICAgICAgY29tbWVudHMgPSBbXTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIHN0YXJ0ID0gKHRoaXMuaW5kZXggPT09IDApO1xuXHQgICAgICAgIHdoaWxlICghdGhpcy5lb2YoKSkge1xuXHQgICAgICAgICAgICB2YXIgY2ggPSB0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpO1xuXHQgICAgICAgICAgICBpZiAoY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzV2hpdGVTcGFjZShjaCkpIHtcblx0ICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmIChjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNMaW5lVGVybWluYXRvcihjaCkpIHtcblx0ICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gMHgwRCAmJiB0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpID09PSAweDBBKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgKyt0aGlzLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmxpbmVTdGFydCA9IHRoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICBzdGFydCA9IHRydWU7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IDB4MkYpIHtcblx0ICAgICAgICAgICAgICAgIGNoID0gdGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4ICsgMSk7XG5cdCAgICAgICAgICAgICAgICBpZiAoY2ggPT09IDB4MkYpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ICs9IDI7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGNvbW1lbnQgPSB0aGlzLnNraXBTaW5nbGVMaW5lQ29tbWVudCgyKTtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFja0NvbW1lbnQpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudHMgPSBjb21tZW50cy5jb25jYXQoY29tbWVudCk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSAweDJBKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCArPSAyO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBjb21tZW50ID0gdGhpcy5za2lwTXVsdGlMaW5lQ29tbWVudCgpO1xuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrQ29tbWVudCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50cyA9IGNvbW1lbnRzLmNvbmNhdChjb21tZW50KTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmIChzdGFydCAmJiBjaCA9PT0gMHgyRCkge1xuXHQgICAgICAgICAgICAgICAgLy8gVSswMDNFIGlzICc+J1xuXHQgICAgICAgICAgICAgICAgaWYgKCh0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXggKyAxKSA9PT0gMHgyRCkgJiYgKHRoaXMuc291cmNlLmNoYXJDb2RlQXQodGhpcy5pbmRleCArIDIpID09PSAweDNFKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vICctLT4nIGlzIGEgc2luZ2xlLWxpbmUgY29tbWVudFxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggKz0gMztcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgY29tbWVudCA9IHRoaXMuc2tpcFNpbmdsZUxpbmVDb21tZW50KDMpO1xuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrQ29tbWVudCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50cyA9IGNvbW1lbnRzLmNvbmNhdChjb21tZW50KTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gMHgzQyAmJiAhdGhpcy5pc01vZHVsZSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMuc291cmNlLnNsaWNlKHRoaXMuaW5kZXggKyAxLCB0aGlzLmluZGV4ICsgNCkgPT09ICchLS0nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCArPSA0OyAvLyBgPCEtLWBcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgY29tbWVudCA9IHRoaXMuc2tpcFNpbmdsZUxpbmVDb21tZW50KDQpO1xuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrQ29tbWVudCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50cyA9IGNvbW1lbnRzLmNvbmNhdChjb21tZW50KTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBjb21tZW50cztcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1mdXR1cmUtcmVzZXJ2ZWQtd29yZHNcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLmlzRnV0dXJlUmVzZXJ2ZWRXb3JkID0gZnVuY3Rpb24gKGlkKSB7XG5cdCAgICAgICAgc3dpdGNoIChpZCkge1xuXHQgICAgICAgICAgICBjYXNlICdlbnVtJzpcblx0ICAgICAgICAgICAgY2FzZSAnZXhwb3J0Jzpcblx0ICAgICAgICAgICAgY2FzZSAnaW1wb3J0Jzpcblx0ICAgICAgICAgICAgY2FzZSAnc3VwZXInOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICAgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLmlzU3RyaWN0TW9kZVJlc2VydmVkV29yZCA9IGZ1bmN0aW9uIChpZCkge1xuXHQgICAgICAgIHN3aXRjaCAoaWQpIHtcblx0ICAgICAgICAgICAgY2FzZSAnaW1wbGVtZW50cyc6XG5cdCAgICAgICAgICAgIGNhc2UgJ2ludGVyZmFjZSc6XG5cdCAgICAgICAgICAgIGNhc2UgJ3BhY2thZ2UnOlxuXHQgICAgICAgICAgICBjYXNlICdwcml2YXRlJzpcblx0ICAgICAgICAgICAgY2FzZSAncHJvdGVjdGVkJzpcblx0ICAgICAgICAgICAgY2FzZSAncHVibGljJzpcblx0ICAgICAgICAgICAgY2FzZSAnc3RhdGljJzpcblx0ICAgICAgICAgICAgY2FzZSAneWllbGQnOlxuXHQgICAgICAgICAgICBjYXNlICdsZXQnOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICAgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLmlzUmVzdHJpY3RlZFdvcmQgPSBmdW5jdGlvbiAoaWQpIHtcblx0ICAgICAgICByZXR1cm4gaWQgPT09ICdldmFsJyB8fCBpZCA9PT0gJ2FyZ3VtZW50cyc7XG5cdCAgICB9O1xuXHQgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMta2V5d29yZHNcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLmlzS2V5d29yZCA9IGZ1bmN0aW9uIChpZCkge1xuXHQgICAgICAgIHN3aXRjaCAoaWQubGVuZ3RoKSB7XG5cdCAgICAgICAgICAgIGNhc2UgMjpcblx0ICAgICAgICAgICAgICAgIHJldHVybiAoaWQgPT09ICdpZicpIHx8IChpZCA9PT0gJ2luJykgfHwgKGlkID09PSAnZG8nKTtcblx0ICAgICAgICAgICAgY2FzZSAzOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIChpZCA9PT0gJ3ZhcicpIHx8IChpZCA9PT0gJ2ZvcicpIHx8IChpZCA9PT0gJ25ldycpIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgKGlkID09PSAndHJ5JykgfHwgKGlkID09PSAnbGV0Jyk7XG5cdCAgICAgICAgICAgIGNhc2UgNDpcblx0ICAgICAgICAgICAgICAgIHJldHVybiAoaWQgPT09ICd0aGlzJykgfHwgKGlkID09PSAnZWxzZScpIHx8IChpZCA9PT0gJ2Nhc2UnKSB8fFxuXHQgICAgICAgICAgICAgICAgICAgIChpZCA9PT0gJ3ZvaWQnKSB8fCAoaWQgPT09ICd3aXRoJykgfHwgKGlkID09PSAnZW51bScpO1xuXHQgICAgICAgICAgICBjYXNlIDU6XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gKGlkID09PSAnd2hpbGUnKSB8fCAoaWQgPT09ICdicmVhaycpIHx8IChpZCA9PT0gJ2NhdGNoJykgfHxcblx0ICAgICAgICAgICAgICAgICAgICAoaWQgPT09ICd0aHJvdycpIHx8IChpZCA9PT0gJ2NvbnN0JykgfHwgKGlkID09PSAneWllbGQnKSB8fFxuXHQgICAgICAgICAgICAgICAgICAgIChpZCA9PT0gJ2NsYXNzJykgfHwgKGlkID09PSAnc3VwZXInKTtcblx0ICAgICAgICAgICAgY2FzZSA2OlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIChpZCA9PT0gJ3JldHVybicpIHx8IChpZCA9PT0gJ3R5cGVvZicpIHx8IChpZCA9PT0gJ2RlbGV0ZScpIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgKGlkID09PSAnc3dpdGNoJykgfHwgKGlkID09PSAnZXhwb3J0JykgfHwgKGlkID09PSAnaW1wb3J0Jyk7XG5cdCAgICAgICAgICAgIGNhc2UgNzpcblx0ICAgICAgICAgICAgICAgIHJldHVybiAoaWQgPT09ICdkZWZhdWx0JykgfHwgKGlkID09PSAnZmluYWxseScpIHx8IChpZCA9PT0gJ2V4dGVuZHMnKTtcblx0ICAgICAgICAgICAgY2FzZSA4OlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIChpZCA9PT0gJ2Z1bmN0aW9uJykgfHwgKGlkID09PSAnY29udGludWUnKSB8fCAoaWQgPT09ICdkZWJ1Z2dlcicpO1xuXHQgICAgICAgICAgICBjYXNlIDEwOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIChpZCA9PT0gJ2luc3RhbmNlb2YnKTtcblx0ICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUuY29kZVBvaW50QXQgPSBmdW5jdGlvbiAoaSkge1xuXHQgICAgICAgIHZhciBjcCA9IHRoaXMuc291cmNlLmNoYXJDb2RlQXQoaSk7XG5cdCAgICAgICAgaWYgKGNwID49IDB4RDgwMCAmJiBjcCA8PSAweERCRkYpIHtcblx0ICAgICAgICAgICAgdmFyIHNlY29uZCA9IHRoaXMuc291cmNlLmNoYXJDb2RlQXQoaSArIDEpO1xuXHQgICAgICAgICAgICBpZiAoc2Vjb25kID49IDB4REMwMCAmJiBzZWNvbmQgPD0gMHhERkZGKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSBjcDtcblx0ICAgICAgICAgICAgICAgIGNwID0gKGZpcnN0IC0gMHhEODAwKSAqIDB4NDAwICsgc2Vjb25kIC0gMHhEQzAwICsgMHgxMDAwMDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gY3A7XG5cdCAgICB9O1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUuc2NhbkhleEVzY2FwZSA9IGZ1bmN0aW9uIChwcmVmaXgpIHtcblx0ICAgICAgICB2YXIgbGVuID0gKHByZWZpeCA9PT0gJ3UnKSA/IDQgOiAyO1xuXHQgICAgICAgIHZhciBjb2RlID0gMDtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG5cdCAgICAgICAgICAgIGlmICghdGhpcy5lb2YoKSAmJiBjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNIZXhEaWdpdCh0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpKSkge1xuXHQgICAgICAgICAgICAgICAgY29kZSA9IGNvZGUgKiAxNiArIGhleFZhbHVlKHRoaXMuc291cmNlW3RoaXMuaW5kZXgrK10pO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG5cdCAgICB9O1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUuc2NhblVuaWNvZGVDb2RlUG9pbnRFc2NhcGUgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGNoID0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleF07XG5cdCAgICAgICAgdmFyIGNvZGUgPSAwO1xuXHQgICAgICAgIC8vIEF0IGxlYXN0LCBvbmUgaGV4IGRpZ2l0IGlzIHJlcXVpcmVkLlxuXHQgICAgICAgIGlmIChjaCA9PT0gJ30nKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4oKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLmVvZigpKSB7XG5cdCAgICAgICAgICAgIGNoID0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleCsrXTtcblx0ICAgICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNIZXhEaWdpdChjaC5jaGFyQ29kZUF0KDApKSkge1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgY29kZSA9IGNvZGUgKiAxNiArIGhleFZhbHVlKGNoKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKGNvZGUgPiAweDEwRkZGRiB8fCBjaCAhPT0gJ30nKSB7XG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4oKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5mcm9tQ29kZVBvaW50KGNvZGUpO1xuXHQgICAgfTtcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLmdldElkZW50aWZpZXIgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5pbmRleCsrO1xuXHQgICAgICAgIHdoaWxlICghdGhpcy5lb2YoKSkge1xuXHQgICAgICAgICAgICB2YXIgY2ggPSB0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpO1xuXHQgICAgICAgICAgICBpZiAoY2ggPT09IDB4NUMpIHtcblx0ICAgICAgICAgICAgICAgIC8vIEJsYWNrc2xhc2ggKFUrMDA1QykgbWFya3MgVW5pY29kZSBlc2NhcGUgc2VxdWVuY2UuXG5cdCAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gc3RhcnQ7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb21wbGV4SWRlbnRpZmllcigpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKGNoID49IDB4RDgwMCAmJiBjaCA8IDB4REZGRikge1xuXHQgICAgICAgICAgICAgICAgLy8gTmVlZCB0byBoYW5kbGUgc3Vycm9nYXRlIHBhaXJzLlxuXHQgICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IHN0YXJ0O1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tcGxleElkZW50aWZpZXIoKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzSWRlbnRpZmllclBhcnQoY2gpKSB7XG5cdCAgICAgICAgICAgICAgICArK3RoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5zb3VyY2Uuc2xpY2Uoc3RhcnQsIHRoaXMuaW5kZXgpO1xuXHQgICAgfTtcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLmdldENvbXBsZXhJZGVudGlmaWVyID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBjcCA9IHRoaXMuY29kZVBvaW50QXQodGhpcy5pbmRleCk7XG5cdCAgICAgICAgdmFyIGlkID0gY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmZyb21Db2RlUG9pbnQoY3ApO1xuXHQgICAgICAgIHRoaXMuaW5kZXggKz0gaWQubGVuZ3RoO1xuXHQgICAgICAgIC8vICdcXHUnIChVKzAwNUMsIFUrMDA3NSkgZGVub3RlcyBhbiBlc2NhcGVkIGNoYXJhY3Rlci5cblx0ICAgICAgICB2YXIgY2g7XG5cdCAgICAgICAgaWYgKGNwID09PSAweDVDKSB7XG5cdCAgICAgICAgICAgIGlmICh0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpICE9PSAweDc1KSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICBpZiAodGhpcy5zb3VyY2VbdGhpcy5pbmRleF0gPT09ICd7Jykge1xuXHQgICAgICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgY2ggPSB0aGlzLnNjYW5Vbmljb2RlQ29kZVBvaW50RXNjYXBlKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBjaCA9IHRoaXMuc2NhbkhleEVzY2FwZSgndScpO1xuXHQgICAgICAgICAgICAgICAgaWYgKGNoID09PSBudWxsIHx8IGNoID09PSAnXFxcXCcgfHwgIWNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0lkZW50aWZpZXJTdGFydChjaC5jaGFyQ29kZUF0KDApKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZCA9IGNoO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB3aGlsZSAoIXRoaXMuZW9mKCkpIHtcblx0ICAgICAgICAgICAgY3AgPSB0aGlzLmNvZGVQb2ludEF0KHRoaXMuaW5kZXgpO1xuXHQgICAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0lkZW50aWZpZXJQYXJ0KGNwKSkge1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgY2ggPSBjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuZnJvbUNvZGVQb2ludChjcCk7XG5cdCAgICAgICAgICAgIGlkICs9IGNoO1xuXHQgICAgICAgICAgICB0aGlzLmluZGV4ICs9IGNoLmxlbmd0aDtcblx0ICAgICAgICAgICAgLy8gJ1xcdScgKFUrMDA1QywgVSswMDc1KSBkZW5vdGVzIGFuIGVzY2FwZWQgY2hhcmFjdGVyLlxuXHQgICAgICAgICAgICBpZiAoY3AgPT09IDB4NUMpIHtcblx0ICAgICAgICAgICAgICAgIGlkID0gaWQuc3Vic3RyKDAsIGlkLmxlbmd0aCAtIDEpO1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMuc291cmNlLmNoYXJDb2RlQXQodGhpcy5pbmRleCkgIT09IDB4NzUpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICArK3RoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3VyY2VbdGhpcy5pbmRleF0gPT09ICd7Jykge1xuXHQgICAgICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgICAgICBjaCA9IHRoaXMuc2NhblVuaWNvZGVDb2RlUG9pbnRFc2NhcGUoKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIGNoID0gdGhpcy5zY2FuSGV4RXNjYXBlKCd1Jyk7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKGNoID09PSBudWxsIHx8IGNoID09PSAnXFxcXCcgfHwgIWNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0lkZW50aWZpZXJQYXJ0KGNoLmNoYXJDb2RlQXQoMCkpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBpZCArPSBjaDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gaWQ7XG5cdCAgICB9O1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUub2N0YWxUb0RlY2ltYWwgPSBmdW5jdGlvbiAoY2gpIHtcblx0ICAgICAgICAvLyBcXDAgaXMgbm90IG9jdGFsIGVzY2FwZSBzZXF1ZW5jZVxuXHQgICAgICAgIHZhciBvY3RhbCA9IChjaCAhPT0gJzAnKTtcblx0ICAgICAgICB2YXIgY29kZSA9IG9jdGFsVmFsdWUoY2gpO1xuXHQgICAgICAgIGlmICghdGhpcy5lb2YoKSAmJiBjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNPY3RhbERpZ2l0KHRoaXMuc291cmNlLmNoYXJDb2RlQXQodGhpcy5pbmRleCkpKSB7XG5cdCAgICAgICAgICAgIG9jdGFsID0gdHJ1ZTtcblx0ICAgICAgICAgICAgY29kZSA9IGNvZGUgKiA4ICsgb2N0YWxWYWx1ZSh0aGlzLnNvdXJjZVt0aGlzLmluZGV4KytdKTtcblx0ICAgICAgICAgICAgLy8gMyBkaWdpdHMgYXJlIG9ubHkgYWxsb3dlZCB3aGVuIHN0cmluZyBzdGFydHNcblx0ICAgICAgICAgICAgLy8gd2l0aCAwLCAxLCAyLCAzXG5cdCAgICAgICAgICAgIGlmICgnMDEyMycuaW5kZXhPZihjaCkgPj0gMCAmJiAhdGhpcy5lb2YoKSAmJiBjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNPY3RhbERpZ2l0KHRoaXMuc291cmNlLmNoYXJDb2RlQXQodGhpcy5pbmRleCkpKSB7XG5cdCAgICAgICAgICAgICAgICBjb2RlID0gY29kZSAqIDggKyBvY3RhbFZhbHVlKHRoaXMuc291cmNlW3RoaXMuaW5kZXgrK10pO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIGNvZGU6IGNvZGUsXG5cdCAgICAgICAgICAgIG9jdGFsOiBvY3RhbFxuXHQgICAgICAgIH07XG5cdCAgICB9O1xuXHQgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtbmFtZXMtYW5kLWtleXdvcmRzXG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS5zY2FuSWRlbnRpZmllciA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgdHlwZTtcblx0ICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLmluZGV4O1xuXHQgICAgICAgIC8vIEJhY2tzbGFzaCAoVSswMDVDKSBzdGFydHMgYW4gZXNjYXBlZCBjaGFyYWN0ZXIuXG5cdCAgICAgICAgdmFyIGlkID0gKHRoaXMuc291cmNlLmNoYXJDb2RlQXQoc3RhcnQpID09PSAweDVDKSA/IHRoaXMuZ2V0Q29tcGxleElkZW50aWZpZXIoKSA6IHRoaXMuZ2V0SWRlbnRpZmllcigpO1xuXHQgICAgICAgIC8vIFRoZXJlIGlzIG5vIGtleXdvcmQgb3IgbGl0ZXJhbCB3aXRoIG9ubHkgb25lIGNoYXJhY3Rlci5cblx0ICAgICAgICAvLyBUaHVzLCBpdCBtdXN0IGJlIGFuIGlkZW50aWZpZXIuXG5cdCAgICAgICAgaWYgKGlkLmxlbmd0aCA9PT0gMSkge1xuXHQgICAgICAgICAgICB0eXBlID0gMyAvKiBJZGVudGlmaWVyICovO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIGlmICh0aGlzLmlzS2V5d29yZChpZCkpIHtcblx0ICAgICAgICAgICAgdHlwZSA9IDQgLyogS2V5d29yZCAqLztcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSBpZiAoaWQgPT09ICdudWxsJykge1xuXHQgICAgICAgICAgICB0eXBlID0gNSAvKiBOdWxsTGl0ZXJhbCAqLztcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSBpZiAoaWQgPT09ICd0cnVlJyB8fCBpZCA9PT0gJ2ZhbHNlJykge1xuXHQgICAgICAgICAgICB0eXBlID0gMSAvKiBCb29sZWFuTGl0ZXJhbCAqLztcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgIHR5cGUgPSAzIC8qIElkZW50aWZpZXIgKi87XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICh0eXBlICE9PSAzIC8qIElkZW50aWZpZXIgKi8gJiYgKHN0YXJ0ICsgaWQubGVuZ3RoICE9PSB0aGlzLmluZGV4KSkge1xuXHQgICAgICAgICAgICB2YXIgcmVzdG9yZSA9IHRoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgIHRoaXMuaW5kZXggPSBzdGFydDtcblx0ICAgICAgICAgICAgdGhpcy50b2xlcmF0ZVVuZXhwZWN0ZWRUb2tlbihtZXNzYWdlc18xLk1lc3NhZ2VzLkludmFsaWRFc2NhcGVkUmVzZXJ2ZWRXb3JkKTtcblx0ICAgICAgICAgICAgdGhpcy5pbmRleCA9IHJlc3RvcmU7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIHR5cGU6IHR5cGUsXG5cdCAgICAgICAgICAgIHZhbHVlOiBpZCxcblx0ICAgICAgICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICBsaW5lU3RhcnQ6IHRoaXMubGluZVN0YXJ0LFxuXHQgICAgICAgICAgICBzdGFydDogc3RhcnQsXG5cdCAgICAgICAgICAgIGVuZDogdGhpcy5pbmRleFxuXHQgICAgICAgIH07XG5cdCAgICB9O1xuXHQgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcHVuY3R1YXRvcnNcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLnNjYW5QdW5jdHVhdG9yID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBzdGFydCA9IHRoaXMuaW5kZXg7XG5cdCAgICAgICAgLy8gQ2hlY2sgZm9yIG1vc3QgY29tbW9uIHNpbmdsZS1jaGFyYWN0ZXIgcHVuY3R1YXRvcnMuXG5cdCAgICAgICAgdmFyIHN0ciA9IHRoaXMuc291cmNlW3RoaXMuaW5kZXhdO1xuXHQgICAgICAgIHN3aXRjaCAoc3RyKSB7XG5cdCAgICAgICAgICAgIGNhc2UgJygnOlxuXHQgICAgICAgICAgICBjYXNlICd7Jzpcblx0ICAgICAgICAgICAgICAgIGlmIChzdHIgPT09ICd7Jykge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VybHlTdGFjay5wdXNoKCd7Jyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICArK3RoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgY2FzZSAnLic6XG5cdCAgICAgICAgICAgICAgICArK3RoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3VyY2VbdGhpcy5pbmRleF0gPT09ICcuJyAmJiB0aGlzLnNvdXJjZVt0aGlzLmluZGV4ICsgMV0gPT09ICcuJykge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIFNwcmVhZCBvcGVyYXRvcjogLi4uXG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCArPSAyO1xuXHQgICAgICAgICAgICAgICAgICAgIHN0ciA9ICcuLi4nO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2UgJ30nOlxuXHQgICAgICAgICAgICAgICAgKyt0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgdGhpcy5jdXJseVN0YWNrLnBvcCgpO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2UgJyknOlxuXHQgICAgICAgICAgICBjYXNlICc7Jzpcblx0ICAgICAgICAgICAgY2FzZSAnLCc6XG5cdCAgICAgICAgICAgIGNhc2UgJ1snOlxuXHQgICAgICAgICAgICBjYXNlICddJzpcblx0ICAgICAgICAgICAgY2FzZSAnOic6XG5cdCAgICAgICAgICAgIGNhc2UgJz8nOlxuXHQgICAgICAgICAgICBjYXNlICd+Jzpcblx0ICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICAgICAgLy8gNC1jaGFyYWN0ZXIgcHVuY3R1YXRvci5cblx0ICAgICAgICAgICAgICAgIHN0ciA9IHRoaXMuc291cmNlLnN1YnN0cih0aGlzLmluZGV4LCA0KTtcblx0ICAgICAgICAgICAgICAgIGlmIChzdHIgPT09ICc+Pj49Jykge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggKz0gNDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIDMtY2hhcmFjdGVyIHB1bmN0dWF0b3JzLlxuXHQgICAgICAgICAgICAgICAgICAgIHN0ciA9IHN0ci5zdWJzdHIoMCwgMyk7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHN0ciA9PT0gJz09PScgfHwgc3RyID09PSAnIT09JyB8fCBzdHIgPT09ICc+Pj4nIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9PT0gJzw8PScgfHwgc3RyID09PSAnPj49JyB8fCBzdHIgPT09ICcqKj0nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggKz0gMztcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIDItY2hhcmFjdGVyIHB1bmN0dWF0b3JzLlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIuc3Vic3RyKDAsIDIpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyID09PSAnJiYnIHx8IHN0ciA9PT0gJ3x8JyB8fCBzdHIgPT09ICc9PScgfHwgc3RyID09PSAnIT0nIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPT09ICcrPScgfHwgc3RyID09PSAnLT0nIHx8IHN0ciA9PT0gJyo9JyB8fCBzdHIgPT09ICcvPScgfHxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9PT0gJysrJyB8fCBzdHIgPT09ICctLScgfHwgc3RyID09PSAnPDwnIHx8IHN0ciA9PT0gJz4+JyB8fFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID09PSAnJj0nIHx8IHN0ciA9PT0gJ3w9JyB8fCBzdHIgPT09ICdePScgfHwgc3RyID09PSAnJT0nIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPT09ICc8PScgfHwgc3RyID09PSAnPj0nIHx8IHN0ciA9PT0gJz0+JyB8fCBzdHIgPT09ICcqKicpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggKz0gMjtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDEtY2hhcmFjdGVyIHB1bmN0dWF0b3JzLlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleF07XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJzw+PSErLSolJnxeLycuaW5kZXhPZihzdHIpID49IDApIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArK3RoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICh0aGlzLmluZGV4ID09PSBzdGFydCkge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIHR5cGU6IDcgLyogUHVuY3R1YXRvciAqLyxcblx0ICAgICAgICAgICAgdmFsdWU6IHN0cixcblx0ICAgICAgICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICBsaW5lU3RhcnQ6IHRoaXMubGluZVN0YXJ0LFxuXHQgICAgICAgICAgICBzdGFydDogc3RhcnQsXG5cdCAgICAgICAgICAgIGVuZDogdGhpcy5pbmRleFxuXHQgICAgICAgIH07XG5cdCAgICB9O1xuXHQgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtbGl0ZXJhbHMtbnVtZXJpYy1saXRlcmFsc1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUuc2NhbkhleExpdGVyYWwgPSBmdW5jdGlvbiAoc3RhcnQpIHtcblx0ICAgICAgICB2YXIgbnVtID0gJyc7XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLmVvZigpKSB7XG5cdCAgICAgICAgICAgIGlmICghY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzSGV4RGlnaXQodGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4KSkpIHtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIG51bSArPSB0aGlzLnNvdXJjZVt0aGlzLmluZGV4KytdO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAobnVtLmxlbmd0aCA9PT0gMCkge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNJZGVudGlmaWVyU3RhcnQodGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4KSkpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICB0eXBlOiA2IC8qIE51bWVyaWNMaXRlcmFsICovLFxuXHQgICAgICAgICAgICB2YWx1ZTogcGFyc2VJbnQoJzB4JyArIG51bSwgMTYpLFxuXHQgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5saW5lU3RhcnQsXG5cdCAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcblx0ICAgICAgICAgICAgZW5kOiB0aGlzLmluZGV4XG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS5zY2FuQmluYXJ5TGl0ZXJhbCA9IGZ1bmN0aW9uIChzdGFydCkge1xuXHQgICAgICAgIHZhciBudW0gPSAnJztcblx0ICAgICAgICB2YXIgY2g7XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLmVvZigpKSB7XG5cdCAgICAgICAgICAgIGNoID0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleF07XG5cdCAgICAgICAgICAgIGlmIChjaCAhPT0gJzAnICYmIGNoICE9PSAnMScpIHtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIG51bSArPSB0aGlzLnNvdXJjZVt0aGlzLmluZGV4KytdO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAobnVtLmxlbmd0aCA9PT0gMCkge1xuXHQgICAgICAgICAgICAvLyBvbmx5IDBiIG9yIDBCXG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4oKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKCF0aGlzLmVvZigpKSB7XG5cdCAgICAgICAgICAgIGNoID0gdGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4KTtcblx0ICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cblx0ICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0lkZW50aWZpZXJTdGFydChjaCkgfHwgY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzRGVjaW1hbERpZ2l0KGNoKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbigpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIHR5cGU6IDYgLyogTnVtZXJpY0xpdGVyYWwgKi8sXG5cdCAgICAgICAgICAgIHZhbHVlOiBwYXJzZUludChudW0sIDIpLFxuXHQgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5saW5lU3RhcnQsXG5cdCAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcblx0ICAgICAgICAgICAgZW5kOiB0aGlzLmluZGV4XG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS5zY2FuT2N0YWxMaXRlcmFsID0gZnVuY3Rpb24gKHByZWZpeCwgc3RhcnQpIHtcblx0ICAgICAgICB2YXIgbnVtID0gJyc7XG5cdCAgICAgICAgdmFyIG9jdGFsID0gZmFsc2U7XG5cdCAgICAgICAgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc09jdGFsRGlnaXQocHJlZml4LmNoYXJDb2RlQXQoMCkpKSB7XG5cdCAgICAgICAgICAgIG9jdGFsID0gdHJ1ZTtcblx0ICAgICAgICAgICAgbnVtID0gJzAnICsgdGhpcy5zb3VyY2VbdGhpcy5pbmRleCsrXTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLmVvZigpKSB7XG5cdCAgICAgICAgICAgIGlmICghY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzT2N0YWxEaWdpdCh0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpKSkge1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgbnVtICs9IHRoaXMuc291cmNlW3RoaXMuaW5kZXgrK107XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICghb2N0YWwgJiYgbnVtLmxlbmd0aCA9PT0gMCkge1xuXHQgICAgICAgICAgICAvLyBvbmx5IDBvIG9yIDBPXG5cdCAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4oKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0lkZW50aWZpZXJTdGFydCh0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpKSB8fCBjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNEZWNpbWFsRGlnaXQodGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4KSkpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICB0eXBlOiA2IC8qIE51bWVyaWNMaXRlcmFsICovLFxuXHQgICAgICAgICAgICB2YWx1ZTogcGFyc2VJbnQobnVtLCA4KSxcblx0ICAgICAgICAgICAgb2N0YWw6IG9jdGFsLFxuXHQgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5saW5lU3RhcnQsXG5cdCAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcblx0ICAgICAgICAgICAgZW5kOiB0aGlzLmluZGV4XG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS5pc0ltcGxpY2l0T2N0YWxMaXRlcmFsID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIC8vIEltcGxpY2l0IG9jdGFsLCB1bmxlc3MgdGhlcmUgaXMgYSBub24tb2N0YWwgZGlnaXQuXG5cdCAgICAgICAgLy8gKEFubmV4IEIuMS4xIG9uIE51bWVyaWMgTGl0ZXJhbHMpXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuaW5kZXggKyAxOyBpIDwgdGhpcy5sZW5ndGg7ICsraSkge1xuXHQgICAgICAgICAgICB2YXIgY2ggPSB0aGlzLnNvdXJjZVtpXTtcblx0ICAgICAgICAgICAgaWYgKGNoID09PSAnOCcgfHwgY2ggPT09ICc5Jykge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmICghY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzT2N0YWxEaWdpdChjaC5jaGFyQ29kZUF0KDApKSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICB9O1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUuc2Nhbk51bWVyaWNMaXRlcmFsID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBzdGFydCA9IHRoaXMuaW5kZXg7XG5cdCAgICAgICAgdmFyIGNoID0gdGhpcy5zb3VyY2Vbc3RhcnRdO1xuXHQgICAgICAgIGFzc2VydF8xLmFzc2VydChjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNEZWNpbWFsRGlnaXQoY2guY2hhckNvZGVBdCgwKSkgfHwgKGNoID09PSAnLicpLCAnTnVtZXJpYyBsaXRlcmFsIG11c3Qgc3RhcnQgd2l0aCBhIGRlY2ltYWwgZGlnaXQgb3IgYSBkZWNpbWFsIHBvaW50Jyk7XG5cdCAgICAgICAgdmFyIG51bSA9ICcnO1xuXHQgICAgICAgIGlmIChjaCAhPT0gJy4nKSB7XG5cdCAgICAgICAgICAgIG51bSA9IHRoaXMuc291cmNlW3RoaXMuaW5kZXgrK107XG5cdCAgICAgICAgICAgIGNoID0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleF07XG5cdCAgICAgICAgICAgIC8vIEhleCBudW1iZXIgc3RhcnRzIHdpdGggJzB4Jy5cblx0ICAgICAgICAgICAgLy8gT2N0YWwgbnVtYmVyIHN0YXJ0cyB3aXRoICcwJy5cblx0ICAgICAgICAgICAgLy8gT2N0YWwgbnVtYmVyIGluIEVTNiBzdGFydHMgd2l0aCAnMG8nLlxuXHQgICAgICAgICAgICAvLyBCaW5hcnkgbnVtYmVyIGluIEVTNiBzdGFydHMgd2l0aCAnMGInLlxuXHQgICAgICAgICAgICBpZiAobnVtID09PSAnMCcpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ3gnIHx8IGNoID09PSAnWCcpIHtcblx0ICAgICAgICAgICAgICAgICAgICArK3RoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NhbkhleExpdGVyYWwoc3RhcnQpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaWYgKGNoID09PSAnYicgfHwgY2ggPT09ICdCJykge1xuXHQgICAgICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuQmluYXJ5TGl0ZXJhbChzdGFydCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICdvJyB8fCBjaCA9PT0gJ08nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2Nhbk9jdGFsTGl0ZXJhbChjaCwgc3RhcnQpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaWYgKGNoICYmIGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc09jdGFsRGlnaXQoY2guY2hhckNvZGVBdCgwKSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0ltcGxpY2l0T2N0YWxMaXRlcmFsKCkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2Nhbk9jdGFsTGl0ZXJhbChjaCwgc3RhcnQpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB3aGlsZSAoY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzRGVjaW1hbERpZ2l0KHRoaXMuc291cmNlLmNoYXJDb2RlQXQodGhpcy5pbmRleCkpKSB7XG5cdCAgICAgICAgICAgICAgICBudW0gKz0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleCsrXTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBjaCA9IHRoaXMuc291cmNlW3RoaXMuaW5kZXhdO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoY2ggPT09ICcuJykge1xuXHQgICAgICAgICAgICBudW0gKz0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleCsrXTtcblx0ICAgICAgICAgICAgd2hpbGUgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0RlY2ltYWxEaWdpdCh0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpKSkge1xuXHQgICAgICAgICAgICAgICAgbnVtICs9IHRoaXMuc291cmNlW3RoaXMuaW5kZXgrK107XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgY2ggPSB0aGlzLnNvdXJjZVt0aGlzLmluZGV4XTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKGNoID09PSAnZScgfHwgY2ggPT09ICdFJykge1xuXHQgICAgICAgICAgICBudW0gKz0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleCsrXTtcblx0ICAgICAgICAgICAgY2ggPSB0aGlzLnNvdXJjZVt0aGlzLmluZGV4XTtcblx0ICAgICAgICAgICAgaWYgKGNoID09PSAnKycgfHwgY2ggPT09ICctJykge1xuXHQgICAgICAgICAgICAgICAgbnVtICs9IHRoaXMuc291cmNlW3RoaXMuaW5kZXgrK107XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0RlY2ltYWxEaWdpdCh0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpKSkge1xuXHQgICAgICAgICAgICAgICAgd2hpbGUgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0RlY2ltYWxEaWdpdCh0aGlzLnNvdXJjZS5jaGFyQ29kZUF0KHRoaXMuaW5kZXgpKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIG51bSArPSB0aGlzLnNvdXJjZVt0aGlzLmluZGV4KytdO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbigpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNJZGVudGlmaWVyU3RhcnQodGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4KSkpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICB0eXBlOiA2IC8qIE51bWVyaWNMaXRlcmFsICovLFxuXHQgICAgICAgICAgICB2YWx1ZTogcGFyc2VGbG9hdChudW0pLFxuXHQgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5saW5lU3RhcnQsXG5cdCAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcblx0ICAgICAgICAgICAgZW5kOiB0aGlzLmluZGV4XG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1saXRlcmFscy1zdHJpbmctbGl0ZXJhbHNcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLnNjYW5TdHJpbmdMaXRlcmFsID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBzdGFydCA9IHRoaXMuaW5kZXg7XG5cdCAgICAgICAgdmFyIHF1b3RlID0gdGhpcy5zb3VyY2Vbc3RhcnRdO1xuXHQgICAgICAgIGFzc2VydF8xLmFzc2VydCgocXVvdGUgPT09ICdcXCcnIHx8IHF1b3RlID09PSAnXCInKSwgJ1N0cmluZyBsaXRlcmFsIG11c3Qgc3RhcnRzIHdpdGggYSBxdW90ZScpO1xuXHQgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICB2YXIgb2N0YWwgPSBmYWxzZTtcblx0ICAgICAgICB2YXIgc3RyID0gJyc7XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLmVvZigpKSB7XG5cdCAgICAgICAgICAgIHZhciBjaCA9IHRoaXMuc291cmNlW3RoaXMuaW5kZXgrK107XG5cdCAgICAgICAgICAgIGlmIChjaCA9PT0gcXVvdGUpIHtcblx0ICAgICAgICAgICAgICAgIHF1b3RlID0gJyc7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gJ1xcXFwnKSB7XG5cdCAgICAgICAgICAgICAgICBjaCA9IHRoaXMuc291cmNlW3RoaXMuaW5kZXgrK107XG5cdCAgICAgICAgICAgICAgICBpZiAoIWNoIHx8ICFjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNMaW5lVGVybWluYXRvcihjaC5jaGFyQ29kZUF0KDApKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY2gpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndSc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3VyY2VbdGhpcy5pbmRleF0gPT09ICd7Jykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gdGhpcy5zY2FuVW5pY29kZUNvZGVQb2ludEVzY2FwZSgpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVuZXNjYXBlZF8xID0gdGhpcy5zY2FuSGV4RXNjYXBlKGNoKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodW5lc2NhcGVkXzEgPT09IG51bGwpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbigpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gdW5lc2NhcGVkXzE7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAneCc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdW5lc2NhcGVkID0gdGhpcy5zY2FuSGV4RXNjYXBlKGNoKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1bmVzY2FwZWQgPT09IG51bGwpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKG1lc3NhZ2VzXzEuTWVzc2FnZXMuSW52YWxpZEhleEVzY2FwZVNlcXVlbmNlKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciArPSB1bmVzY2FwZWQ7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1xcbic7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1xccic7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndCc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1xcdCc7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1xcYic7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1xcZic7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1xceDBCJztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICc4Jzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnOSc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gY2g7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaCAmJiBjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNPY3RhbERpZ2l0KGNoLmNoYXJDb2RlQXQoMCkpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9jdFRvRGVjID0gdGhpcy5vY3RhbFRvRGVjaW1hbChjaCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2N0YWwgPSBvY3RUb0RlYy5vY3RhbCB8fCBvY3RhbDtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShvY3RUb0RlYy5jb2RlKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciArPSBjaDtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgICsrdGhpcy5saW5lTnVtYmVyO1xuXHQgICAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ1xccicgJiYgdGhpcy5zb3VyY2VbdGhpcy5pbmRleF0gPT09ICdcXG4nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5lU3RhcnQgPSB0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGVsc2UgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0xpbmVUZXJtaW5hdG9yKGNoLmNoYXJDb2RlQXQoMCkpKSB7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHN0ciArPSBjaDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAocXVvdGUgIT09ICcnKSB7XG5cdCAgICAgICAgICAgIHRoaXMuaW5kZXggPSBzdGFydDtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICB0eXBlOiA4IC8qIFN0cmluZ0xpdGVyYWwgKi8sXG5cdCAgICAgICAgICAgIHZhbHVlOiBzdHIsXG5cdCAgICAgICAgICAgIG9jdGFsOiBvY3RhbCxcblx0ICAgICAgICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuXHQgICAgICAgICAgICBsaW5lU3RhcnQ6IHRoaXMubGluZVN0YXJ0LFxuXHQgICAgICAgICAgICBzdGFydDogc3RhcnQsXG5cdCAgICAgICAgICAgIGVuZDogdGhpcy5pbmRleFxuXHQgICAgICAgIH07XG5cdCAgICB9O1xuXHQgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdGVtcGxhdGUtbGl0ZXJhbC1sZXhpY2FsLWNvbXBvbmVudHNcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLnNjYW5UZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgY29va2VkID0gJyc7XG5cdCAgICAgICAgdmFyIHRlcm1pbmF0ZWQgPSBmYWxzZTtcblx0ICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLmluZGV4O1xuXHQgICAgICAgIHZhciBoZWFkID0gKHRoaXMuc291cmNlW3N0YXJ0XSA9PT0gJ2AnKTtcblx0ICAgICAgICB2YXIgdGFpbCA9IGZhbHNlO1xuXHQgICAgICAgIHZhciByYXdPZmZzZXQgPSAyO1xuXHQgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICB3aGlsZSAoIXRoaXMuZW9mKCkpIHtcblx0ICAgICAgICAgICAgdmFyIGNoID0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleCsrXTtcblx0ICAgICAgICAgICAgaWYgKGNoID09PSAnYCcpIHtcblx0ICAgICAgICAgICAgICAgIHJhd09mZnNldCA9IDE7XG5cdCAgICAgICAgICAgICAgICB0YWlsID0gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgIHRlcm1pbmF0ZWQgPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09ICckJykge1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMuc291cmNlW3RoaXMuaW5kZXhdID09PSAneycpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cmx5U3RhY2sucHVzaCgnJHsnKTtcblx0ICAgICAgICAgICAgICAgICAgICArK3RoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICAgICAgdGVybWluYXRlZCA9IHRydWU7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBjb29rZWQgKz0gY2g7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09ICdcXFxcJykge1xuXHQgICAgICAgICAgICAgICAgY2ggPSB0aGlzLnNvdXJjZVt0aGlzLmluZGV4KytdO1xuXHQgICAgICAgICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNMaW5lVGVybWluYXRvcihjaC5jaGFyQ29kZUF0KDApKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY2gpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29rZWQgKz0gJ1xcbic7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29rZWQgKz0gJ1xccic7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndCc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29rZWQgKz0gJ1xcdCc7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndSc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3VyY2VbdGhpcy5pbmRleF0gPT09ICd7Jykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29rZWQgKz0gdGhpcy5zY2FuVW5pY29kZUNvZGVQb2ludEVzY2FwZSgpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3RvcmUgPSB0aGlzLmluZGV4O1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1bmVzY2FwZWRfMiA9IHRoaXMuc2NhbkhleEVzY2FwZShjaCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVuZXNjYXBlZF8yICE9PSBudWxsKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb2tlZCArPSB1bmVzY2FwZWRfMjtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSByZXN0b3JlO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29rZWQgKz0gY2g7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3gnOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVuZXNjYXBlZCA9IHRoaXMuc2NhbkhleEVzY2FwZShjaCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodW5lc2NhcGVkID09PSBudWxsKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbihtZXNzYWdlc18xLk1lc3NhZ2VzLkludmFsaWRIZXhFc2NhcGVTZXF1ZW5jZSk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29rZWQgKz0gdW5lc2NhcGVkO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2InOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29va2VkICs9ICdcXGInO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2YnOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29va2VkICs9ICdcXGYnO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3YnOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29va2VkICs9ICdcXHYnO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICcwJykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNEZWNpbWFsRGlnaXQodGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4KSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWxsZWdhbDogXFwwMSBcXDAyIGFuZCBzbyBvblxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKG1lc3NhZ2VzXzEuTWVzc2FnZXMuVGVtcGxhdGVPY3RhbExpdGVyYWwpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29rZWQgKz0gJ1xcMCc7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNPY3RhbERpZ2l0KGNoLmNoYXJDb2RlQXQoMCkpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWxsZWdhbDogXFwxIFxcMlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGhyb3dVbmV4cGVjdGVkVG9rZW4obWVzc2FnZXNfMS5NZXNzYWdlcy5UZW1wbGF0ZU9jdGFsTGl0ZXJhbCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29rZWQgKz0gY2g7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICArK3RoaXMubGluZU51bWJlcjtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICdcXHInICYmIHRoaXMuc291cmNlW3RoaXMuaW5kZXhdID09PSAnXFxuJykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICArK3RoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMubGluZVN0YXJ0ID0gdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmIChjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNMaW5lVGVybWluYXRvcihjaC5jaGFyQ29kZUF0KDApKSkge1xuXHQgICAgICAgICAgICAgICAgKyt0aGlzLmxpbmVOdW1iZXI7XG5cdCAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICdcXHInICYmIHRoaXMuc291cmNlW3RoaXMuaW5kZXhdID09PSAnXFxuJykge1xuXHQgICAgICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHRoaXMubGluZVN0YXJ0ID0gdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgIGNvb2tlZCArPSAnXFxuJztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGNvb2tlZCArPSBjaDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoIXRlcm1pbmF0ZWQpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoIWhlYWQpIHtcblx0ICAgICAgICAgICAgdGhpcy5jdXJseVN0YWNrLnBvcCgpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICB0eXBlOiAxMCAvKiBUZW1wbGF0ZSAqLyxcblx0ICAgICAgICAgICAgdmFsdWU6IHRoaXMuc291cmNlLnNsaWNlKHN0YXJ0ICsgMSwgdGhpcy5pbmRleCAtIHJhd09mZnNldCksXG5cdCAgICAgICAgICAgIGNvb2tlZDogY29va2VkLFxuXHQgICAgICAgICAgICBoZWFkOiBoZWFkLFxuXHQgICAgICAgICAgICB0YWlsOiB0YWlsLFxuXHQgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgIGxpbmVTdGFydDogdGhpcy5saW5lU3RhcnQsXG5cdCAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcblx0ICAgICAgICAgICAgZW5kOiB0aGlzLmluZGV4XG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdCAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1saXRlcmFscy1yZWd1bGFyLWV4cHJlc3Npb24tbGl0ZXJhbHNcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLnRlc3RSZWdFeHAgPSBmdW5jdGlvbiAocGF0dGVybiwgZmxhZ3MpIHtcblx0ICAgICAgICAvLyBUaGUgQk1QIGNoYXJhY3RlciB0byB1c2UgYXMgYSByZXBsYWNlbWVudCBmb3IgYXN0cmFsIHN5bWJvbHMgd2hlblxuXHQgICAgICAgIC8vIHRyYW5zbGF0aW5nIGFuIEVTNiBcInVcIi1mbGFnZ2VkIHBhdHRlcm4gdG8gYW4gRVM1LWNvbXBhdGlibGVcblx0ICAgICAgICAvLyBhcHByb3hpbWF0aW9uLlxuXHQgICAgICAgIC8vIE5vdGU6IHJlcGxhY2luZyB3aXRoICdcXHVGRkZGJyBlbmFibGVzIGZhbHNlIHBvc2l0aXZlcyBpbiB1bmxpa2VseVxuXHQgICAgICAgIC8vIHNjZW5hcmlvcy4gRm9yIGV4YW1wbGUsIGBbXFx1ezEwNDRmfS1cXHV7MTA0NDB9XWAgaXMgYW4gaW52YWxpZFxuXHQgICAgICAgIC8vIHBhdHRlcm4gdGhhdCB3b3VsZCBub3QgYmUgZGV0ZWN0ZWQgYnkgdGhpcyBzdWJzdGl0dXRpb24uXG5cdCAgICAgICAgdmFyIGFzdHJhbFN1YnN0aXR1dGUgPSAnXFx1RkZGRic7XG5cdCAgICAgICAgdmFyIHRtcCA9IHBhdHRlcm47XG5cdCAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXHQgICAgICAgIGlmIChmbGFncy5pbmRleE9mKCd1JykgPj0gMCkge1xuXHQgICAgICAgICAgICB0bXAgPSB0bXBcblx0ICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcdVxceyhbMC05YS1mQS1GXSspXFx9fFxcXFx1KFthLWZBLUYwLTldezR9KS9nLCBmdW5jdGlvbiAoJDAsICQxLCAkMikge1xuXHQgICAgICAgICAgICAgICAgdmFyIGNvZGVQb2ludCA9IHBhcnNlSW50KCQxIHx8ICQyLCAxNik7XG5cdCAgICAgICAgICAgICAgICBpZiAoY29kZVBvaW50ID4gMHgxMEZGRkYpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzZWxmLnRocm93VW5leHBlY3RlZFRva2VuKG1lc3NhZ2VzXzEuTWVzc2FnZXMuSW52YWxpZFJlZ0V4cCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBpZiAoY29kZVBvaW50IDw9IDB4RkZGRikge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGVQb2ludCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gYXN0cmFsU3Vic3RpdHV0ZTtcblx0ICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdL2csIGFzdHJhbFN1YnN0aXR1dGUpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICAvLyBGaXJzdCwgZGV0ZWN0IGludmFsaWQgcmVndWxhciBleHByZXNzaW9ucy5cblx0ICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICBSZWdFeHAodG1wKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgY2F0Y2ggKGUpIHtcblx0ICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbihtZXNzYWdlc18xLk1lc3NhZ2VzLkludmFsaWRSZWdFeHApO1xuXHQgICAgICAgIH1cblx0ICAgICAgICAvLyBSZXR1cm4gYSByZWd1bGFyIGV4cHJlc3Npb24gb2JqZWN0IGZvciB0aGlzIHBhdHRlcm4tZmxhZyBwYWlyLCBvclxuXHQgICAgICAgIC8vIGBudWxsYCBpbiBjYXNlIHRoZSBjdXJyZW50IGVudmlyb25tZW50IGRvZXNuJ3Qgc3VwcG9ydCB0aGUgZmxhZ3MgaXRcblx0ICAgICAgICAvLyB1c2VzLlxuXHQgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKHBhdHRlcm4sIGZsYWdzKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgY2F0Y2ggKGV4Y2VwdGlvbikge1xuXHQgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHQgICAgICAgICAgICByZXR1cm4gbnVsbDtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUuc2NhblJlZ0V4cEJvZHkgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGNoID0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleF07XG5cdCAgICAgICAgYXNzZXJ0XzEuYXNzZXJ0KGNoID09PSAnLycsICdSZWd1bGFyIGV4cHJlc3Npb24gbGl0ZXJhbCBtdXN0IHN0YXJ0IHdpdGggYSBzbGFzaCcpO1xuXHQgICAgICAgIHZhciBzdHIgPSB0aGlzLnNvdXJjZVt0aGlzLmluZGV4KytdO1xuXHQgICAgICAgIHZhciBjbGFzc01hcmtlciA9IGZhbHNlO1xuXHQgICAgICAgIHZhciB0ZXJtaW5hdGVkID0gZmFsc2U7XG5cdCAgICAgICAgd2hpbGUgKCF0aGlzLmVvZigpKSB7XG5cdCAgICAgICAgICAgIGNoID0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleCsrXTtcblx0ICAgICAgICAgICAgc3RyICs9IGNoO1xuXHQgICAgICAgICAgICBpZiAoY2ggPT09ICdcXFxcJykge1xuXHQgICAgICAgICAgICAgICAgY2ggPSB0aGlzLnNvdXJjZVt0aGlzLmluZGV4KytdO1xuXHQgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtbGl0ZXJhbHMtcmVndWxhci1leHByZXNzaW9uLWxpdGVyYWxzXG5cdCAgICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzTGluZVRlcm1pbmF0b3IoY2guY2hhckNvZGVBdCgwKSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW50ZXJtaW5hdGVkUmVnRXhwKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHN0ciArPSBjaDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmIChjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNMaW5lVGVybWluYXRvcihjaC5jaGFyQ29kZUF0KDApKSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy50aHJvd1VuZXhwZWN0ZWRUb2tlbihtZXNzYWdlc18xLk1lc3NhZ2VzLlVudGVybWluYXRlZFJlZ0V4cCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZSBpZiAoY2xhc3NNYXJrZXIpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ10nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgY2xhc3NNYXJrZXIgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJy8nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGVybWluYXRlZCA9IHRydWU7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gJ1snKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgY2xhc3NNYXJrZXIgPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICghdGVybWluYXRlZCkge1xuXHQgICAgICAgICAgICB0aGlzLnRocm93VW5leHBlY3RlZFRva2VuKG1lc3NhZ2VzXzEuTWVzc2FnZXMuVW50ZXJtaW5hdGVkUmVnRXhwKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgLy8gRXhjbHVkZSBsZWFkaW5nIGFuZCB0cmFpbGluZyBzbGFzaC5cblx0ICAgICAgICByZXR1cm4gc3RyLnN1YnN0cigxLCBzdHIubGVuZ3RoIC0gMik7XG5cdCAgICB9O1xuXHQgICAgU2Nhbm5lci5wcm90b3R5cGUuc2NhblJlZ0V4cEZsYWdzID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBzdHIgPSAnJztcblx0ICAgICAgICB2YXIgZmxhZ3MgPSAnJztcblx0ICAgICAgICB3aGlsZSAoIXRoaXMuZW9mKCkpIHtcblx0ICAgICAgICAgICAgdmFyIGNoID0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleF07XG5cdCAgICAgICAgICAgIGlmICghY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzSWRlbnRpZmllclBhcnQoY2guY2hhckNvZGVBdCgwKSkpIHtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgaWYgKGNoID09PSAnXFxcXCcgJiYgIXRoaXMuZW9mKCkpIHtcblx0ICAgICAgICAgICAgICAgIGNoID0gdGhpcy5zb3VyY2VbdGhpcy5pbmRleF07XG5cdCAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICd1Jykge1xuXHQgICAgICAgICAgICAgICAgICAgICsrdGhpcy5pbmRleDtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdG9yZSA9IHRoaXMuaW5kZXg7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGNoYXIgPSB0aGlzLnNjYW5IZXhFc2NhcGUoJ3UnKTtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoY2hhciAhPT0gbnVsbCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBmbGFncyArPSBjaGFyO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHN0ciArPSAnXFxcXHUnOyByZXN0b3JlIDwgdGhpcy5pbmRleDsgKytyZXN0b3JlKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gdGhpcy5zb3VyY2VbcmVzdG9yZV07XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSByZXN0b3JlO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBmbGFncyArPSAndSc7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN0ciArPSAnXFxcXHUnO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbGVyYXRlVW5leHBlY3RlZFRva2VuKCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1xcXFwnO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9sZXJhdGVVbmV4cGVjdGVkVG9rZW4oKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGZsYWdzICs9IGNoO1xuXHQgICAgICAgICAgICAgICAgc3RyICs9IGNoO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBmbGFncztcblx0ICAgIH07XG5cdCAgICBTY2FubmVyLnByb3RvdHlwZS5zY2FuUmVnRXhwID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBzdGFydCA9IHRoaXMuaW5kZXg7XG5cdCAgICAgICAgdmFyIHBhdHRlcm4gPSB0aGlzLnNjYW5SZWdFeHBCb2R5KCk7XG5cdCAgICAgICAgdmFyIGZsYWdzID0gdGhpcy5zY2FuUmVnRXhwRmxhZ3MoKTtcblx0ICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnRlc3RSZWdFeHAocGF0dGVybiwgZmxhZ3MpO1xuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIHR5cGU6IDkgLyogUmVndWxhckV4cHJlc3Npb24gKi8sXG5cdCAgICAgICAgICAgIHZhbHVlOiAnJyxcblx0ICAgICAgICAgICAgcGF0dGVybjogcGF0dGVybixcblx0ICAgICAgICAgICAgZmxhZ3M6IGZsYWdzLFxuXHQgICAgICAgICAgICByZWdleDogdmFsdWUsXG5cdCAgICAgICAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcblx0ICAgICAgICAgICAgbGluZVN0YXJ0OiB0aGlzLmxpbmVTdGFydCxcblx0ICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuXHQgICAgICAgICAgICBlbmQ6IHRoaXMuaW5kZXhcblx0ICAgICAgICB9O1xuXHQgICAgfTtcblx0ICAgIFNjYW5uZXIucHJvdG90eXBlLmxleCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBpZiAodGhpcy5lb2YoKSkge1xuXHQgICAgICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICAgICAgdHlwZTogMiAvKiBFT0YgKi8sXG5cdCAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG5cdCAgICAgICAgICAgICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgICAgICBsaW5lU3RhcnQ6IHRoaXMubGluZVN0YXJ0LFxuXHQgICAgICAgICAgICAgICAgc3RhcnQ6IHRoaXMuaW5kZXgsXG5cdCAgICAgICAgICAgICAgICBlbmQ6IHRoaXMuaW5kZXhcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGNwID0gdGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4KTtcblx0ICAgICAgICBpZiAoY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzSWRlbnRpZmllclN0YXJ0KGNwKSkge1xuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuSWRlbnRpZmllcigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICAvLyBWZXJ5IGNvbW1vbjogKCBhbmQgKSBhbmQgO1xuXHQgICAgICAgIGlmIChjcCA9PT0gMHgyOCB8fCBjcCA9PT0gMHgyOSB8fCBjcCA9PT0gMHgzQikge1xuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuUHVuY3R1YXRvcigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICAvLyBTdHJpbmcgbGl0ZXJhbCBzdGFydHMgd2l0aCBzaW5nbGUgcXVvdGUgKFUrMDAyNykgb3IgZG91YmxlIHF1b3RlIChVKzAwMjIpLlxuXHQgICAgICAgIGlmIChjcCA9PT0gMHgyNyB8fCBjcCA9PT0gMHgyMikge1xuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuU3RyaW5nTGl0ZXJhbCgpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICAvLyBEb3QgKC4pIFUrMDAyRSBjYW4gYWxzbyBzdGFydCBhIGZsb2F0aW5nLXBvaW50IG51bWJlciwgaGVuY2UgdGhlIG5lZWRcblx0ICAgICAgICAvLyB0byBjaGVjayB0aGUgbmV4dCBjaGFyYWN0ZXIuXG5cdCAgICAgICAgaWYgKGNwID09PSAweDJFKSB7XG5cdCAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfMS5DaGFyYWN0ZXIuaXNEZWNpbWFsRGlnaXQodGhpcy5zb3VyY2UuY2hhckNvZGVBdCh0aGlzLmluZGV4ICsgMSkpKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuTnVtZXJpY0xpdGVyYWwoKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuUHVuY3R1YXRvcigpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoY2hhcmFjdGVyXzEuQ2hhcmFjdGVyLmlzRGVjaW1hbERpZ2l0KGNwKSkge1xuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuTnVtZXJpY0xpdGVyYWwoKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgLy8gVGVtcGxhdGUgbGl0ZXJhbHMgc3RhcnQgd2l0aCBgIChVKzAwNjApIGZvciB0ZW1wbGF0ZSBoZWFkXG5cdCAgICAgICAgLy8gb3IgfSAoVSswMDdEKSBmb3IgdGVtcGxhdGUgbWlkZGxlIG9yIHRlbXBsYXRlIHRhaWwuXG5cdCAgICAgICAgaWYgKGNwID09PSAweDYwIHx8IChjcCA9PT0gMHg3RCAmJiB0aGlzLmN1cmx5U3RhY2tbdGhpcy5jdXJseVN0YWNrLmxlbmd0aCAtIDFdID09PSAnJHsnKSkge1xuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuVGVtcGxhdGUoKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgLy8gUG9zc2libGUgaWRlbnRpZmllciBzdGFydCBpbiBhIHN1cnJvZ2F0ZSBwYWlyLlxuXHQgICAgICAgIGlmIChjcCA+PSAweEQ4MDAgJiYgY3AgPCAweERGRkYpIHtcblx0ICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl8xLkNoYXJhY3Rlci5pc0lkZW50aWZpZXJTdGFydCh0aGlzLmNvZGVQb2ludEF0KHRoaXMuaW5kZXgpKSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NhbklkZW50aWZpZXIoKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5zY2FuUHVuY3R1YXRvcigpO1xuXHQgICAgfTtcblx0ICAgIHJldHVybiBTY2FubmVyO1xuXHR9KCkpO1xuXHRleHBvcnRzLlNjYW5uZXIgPSBTY2FubmVyO1xuXG5cbi8qKiovIH0sXG4vKiAxMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcblx0ZXhwb3J0cy5Ub2tlbk5hbWUgPSB7fTtcblx0ZXhwb3J0cy5Ub2tlbk5hbWVbMSAvKiBCb29sZWFuTGl0ZXJhbCAqL10gPSAnQm9vbGVhbic7XG5cdGV4cG9ydHMuVG9rZW5OYW1lWzIgLyogRU9GICovXSA9ICc8ZW5kPic7XG5cdGV4cG9ydHMuVG9rZW5OYW1lWzMgLyogSWRlbnRpZmllciAqL10gPSAnSWRlbnRpZmllcic7XG5cdGV4cG9ydHMuVG9rZW5OYW1lWzQgLyogS2V5d29yZCAqL10gPSAnS2V5d29yZCc7XG5cdGV4cG9ydHMuVG9rZW5OYW1lWzUgLyogTnVsbExpdGVyYWwgKi9dID0gJ051bGwnO1xuXHRleHBvcnRzLlRva2VuTmFtZVs2IC8qIE51bWVyaWNMaXRlcmFsICovXSA9ICdOdW1lcmljJztcblx0ZXhwb3J0cy5Ub2tlbk5hbWVbNyAvKiBQdW5jdHVhdG9yICovXSA9ICdQdW5jdHVhdG9yJztcblx0ZXhwb3J0cy5Ub2tlbk5hbWVbOCAvKiBTdHJpbmdMaXRlcmFsICovXSA9ICdTdHJpbmcnO1xuXHRleHBvcnRzLlRva2VuTmFtZVs5IC8qIFJlZ3VsYXJFeHByZXNzaW9uICovXSA9ICdSZWd1bGFyRXhwcmVzc2lvbic7XG5cdGV4cG9ydHMuVG9rZW5OYW1lWzEwIC8qIFRlbXBsYXRlICovXSA9ICdUZW1wbGF0ZSc7XG5cblxuLyoqKi8gfSxcbi8qIDE0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblx0Ly8gR2VuZXJhdGVkIGJ5IGdlbmVyYXRlLXhodG1sLWVudGl0aWVzLmpzLiBETyBOT1QgTU9ESUZZIVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5cdGV4cG9ydHMuWEhUTUxFbnRpdGllcyA9IHtcblx0ICAgIHF1b3Q6ICdcXHUwMDIyJyxcblx0ICAgIGFtcDogJ1xcdTAwMjYnLFxuXHQgICAgYXBvczogJ1xcdTAwMjcnLFxuXHQgICAgZ3Q6ICdcXHUwMDNFJyxcblx0ICAgIG5ic3A6ICdcXHUwMEEwJyxcblx0ICAgIGlleGNsOiAnXFx1MDBBMScsXG5cdCAgICBjZW50OiAnXFx1MDBBMicsXG5cdCAgICBwb3VuZDogJ1xcdTAwQTMnLFxuXHQgICAgY3VycmVuOiAnXFx1MDBBNCcsXG5cdCAgICB5ZW46ICdcXHUwMEE1Jyxcblx0ICAgIGJydmJhcjogJ1xcdTAwQTYnLFxuXHQgICAgc2VjdDogJ1xcdTAwQTcnLFxuXHQgICAgdW1sOiAnXFx1MDBBOCcsXG5cdCAgICBjb3B5OiAnXFx1MDBBOScsXG5cdCAgICBvcmRmOiAnXFx1MDBBQScsXG5cdCAgICBsYXF1bzogJ1xcdTAwQUInLFxuXHQgICAgbm90OiAnXFx1MDBBQycsXG5cdCAgICBzaHk6ICdcXHUwMEFEJyxcblx0ICAgIHJlZzogJ1xcdTAwQUUnLFxuXHQgICAgbWFjcjogJ1xcdTAwQUYnLFxuXHQgICAgZGVnOiAnXFx1MDBCMCcsXG5cdCAgICBwbHVzbW46ICdcXHUwMEIxJyxcblx0ICAgIHN1cDI6ICdcXHUwMEIyJyxcblx0ICAgIHN1cDM6ICdcXHUwMEIzJyxcblx0ICAgIGFjdXRlOiAnXFx1MDBCNCcsXG5cdCAgICBtaWNybzogJ1xcdTAwQjUnLFxuXHQgICAgcGFyYTogJ1xcdTAwQjYnLFxuXHQgICAgbWlkZG90OiAnXFx1MDBCNycsXG5cdCAgICBjZWRpbDogJ1xcdTAwQjgnLFxuXHQgICAgc3VwMTogJ1xcdTAwQjknLFxuXHQgICAgb3JkbTogJ1xcdTAwQkEnLFxuXHQgICAgcmFxdW86ICdcXHUwMEJCJyxcblx0ICAgIGZyYWMxNDogJ1xcdTAwQkMnLFxuXHQgICAgZnJhYzEyOiAnXFx1MDBCRCcsXG5cdCAgICBmcmFjMzQ6ICdcXHUwMEJFJyxcblx0ICAgIGlxdWVzdDogJ1xcdTAwQkYnLFxuXHQgICAgQWdyYXZlOiAnXFx1MDBDMCcsXG5cdCAgICBBYWN1dGU6ICdcXHUwMEMxJyxcblx0ICAgIEFjaXJjOiAnXFx1MDBDMicsXG5cdCAgICBBdGlsZGU6ICdcXHUwMEMzJyxcblx0ICAgIEF1bWw6ICdcXHUwMEM0Jyxcblx0ICAgIEFyaW5nOiAnXFx1MDBDNScsXG5cdCAgICBBRWxpZzogJ1xcdTAwQzYnLFxuXHQgICAgQ2NlZGlsOiAnXFx1MDBDNycsXG5cdCAgICBFZ3JhdmU6ICdcXHUwMEM4Jyxcblx0ICAgIEVhY3V0ZTogJ1xcdTAwQzknLFxuXHQgICAgRWNpcmM6ICdcXHUwMENBJyxcblx0ICAgIEV1bWw6ICdcXHUwMENCJyxcblx0ICAgIElncmF2ZTogJ1xcdTAwQ0MnLFxuXHQgICAgSWFjdXRlOiAnXFx1MDBDRCcsXG5cdCAgICBJY2lyYzogJ1xcdTAwQ0UnLFxuXHQgICAgSXVtbDogJ1xcdTAwQ0YnLFxuXHQgICAgRVRIOiAnXFx1MDBEMCcsXG5cdCAgICBOdGlsZGU6ICdcXHUwMEQxJyxcblx0ICAgIE9ncmF2ZTogJ1xcdTAwRDInLFxuXHQgICAgT2FjdXRlOiAnXFx1MDBEMycsXG5cdCAgICBPY2lyYzogJ1xcdTAwRDQnLFxuXHQgICAgT3RpbGRlOiAnXFx1MDBENScsXG5cdCAgICBPdW1sOiAnXFx1MDBENicsXG5cdCAgICB0aW1lczogJ1xcdTAwRDcnLFxuXHQgICAgT3NsYXNoOiAnXFx1MDBEOCcsXG5cdCAgICBVZ3JhdmU6ICdcXHUwMEQ5Jyxcblx0ICAgIFVhY3V0ZTogJ1xcdTAwREEnLFxuXHQgICAgVWNpcmM6ICdcXHUwMERCJyxcblx0ICAgIFV1bWw6ICdcXHUwMERDJyxcblx0ICAgIFlhY3V0ZTogJ1xcdTAwREQnLFxuXHQgICAgVEhPUk46ICdcXHUwMERFJyxcblx0ICAgIHN6bGlnOiAnXFx1MDBERicsXG5cdCAgICBhZ3JhdmU6ICdcXHUwMEUwJyxcblx0ICAgIGFhY3V0ZTogJ1xcdTAwRTEnLFxuXHQgICAgYWNpcmM6ICdcXHUwMEUyJyxcblx0ICAgIGF0aWxkZTogJ1xcdTAwRTMnLFxuXHQgICAgYXVtbDogJ1xcdTAwRTQnLFxuXHQgICAgYXJpbmc6ICdcXHUwMEU1Jyxcblx0ICAgIGFlbGlnOiAnXFx1MDBFNicsXG5cdCAgICBjY2VkaWw6ICdcXHUwMEU3Jyxcblx0ICAgIGVncmF2ZTogJ1xcdTAwRTgnLFxuXHQgICAgZWFjdXRlOiAnXFx1MDBFOScsXG5cdCAgICBlY2lyYzogJ1xcdTAwRUEnLFxuXHQgICAgZXVtbDogJ1xcdTAwRUInLFxuXHQgICAgaWdyYXZlOiAnXFx1MDBFQycsXG5cdCAgICBpYWN1dGU6ICdcXHUwMEVEJyxcblx0ICAgIGljaXJjOiAnXFx1MDBFRScsXG5cdCAgICBpdW1sOiAnXFx1MDBFRicsXG5cdCAgICBldGg6ICdcXHUwMEYwJyxcblx0ICAgIG50aWxkZTogJ1xcdTAwRjEnLFxuXHQgICAgb2dyYXZlOiAnXFx1MDBGMicsXG5cdCAgICBvYWN1dGU6ICdcXHUwMEYzJyxcblx0ICAgIG9jaXJjOiAnXFx1MDBGNCcsXG5cdCAgICBvdGlsZGU6ICdcXHUwMEY1Jyxcblx0ICAgIG91bWw6ICdcXHUwMEY2Jyxcblx0ICAgIGRpdmlkZTogJ1xcdTAwRjcnLFxuXHQgICAgb3NsYXNoOiAnXFx1MDBGOCcsXG5cdCAgICB1Z3JhdmU6ICdcXHUwMEY5Jyxcblx0ICAgIHVhY3V0ZTogJ1xcdTAwRkEnLFxuXHQgICAgdWNpcmM6ICdcXHUwMEZCJyxcblx0ICAgIHV1bWw6ICdcXHUwMEZDJyxcblx0ICAgIHlhY3V0ZTogJ1xcdTAwRkQnLFxuXHQgICAgdGhvcm46ICdcXHUwMEZFJyxcblx0ICAgIHl1bWw6ICdcXHUwMEZGJyxcblx0ICAgIE9FbGlnOiAnXFx1MDE1MicsXG5cdCAgICBvZWxpZzogJ1xcdTAxNTMnLFxuXHQgICAgU2Nhcm9uOiAnXFx1MDE2MCcsXG5cdCAgICBzY2Fyb246ICdcXHUwMTYxJyxcblx0ICAgIFl1bWw6ICdcXHUwMTc4Jyxcblx0ICAgIGZub2Y6ICdcXHUwMTkyJyxcblx0ICAgIGNpcmM6ICdcXHUwMkM2Jyxcblx0ICAgIHRpbGRlOiAnXFx1MDJEQycsXG5cdCAgICBBbHBoYTogJ1xcdTAzOTEnLFxuXHQgICAgQmV0YTogJ1xcdTAzOTInLFxuXHQgICAgR2FtbWE6ICdcXHUwMzkzJyxcblx0ICAgIERlbHRhOiAnXFx1MDM5NCcsXG5cdCAgICBFcHNpbG9uOiAnXFx1MDM5NScsXG5cdCAgICBaZXRhOiAnXFx1MDM5NicsXG5cdCAgICBFdGE6ICdcXHUwMzk3Jyxcblx0ICAgIFRoZXRhOiAnXFx1MDM5OCcsXG5cdCAgICBJb3RhOiAnXFx1MDM5OScsXG5cdCAgICBLYXBwYTogJ1xcdTAzOUEnLFxuXHQgICAgTGFtYmRhOiAnXFx1MDM5QicsXG5cdCAgICBNdTogJ1xcdTAzOUMnLFxuXHQgICAgTnU6ICdcXHUwMzlEJyxcblx0ICAgIFhpOiAnXFx1MDM5RScsXG5cdCAgICBPbWljcm9uOiAnXFx1MDM5RicsXG5cdCAgICBQaTogJ1xcdTAzQTAnLFxuXHQgICAgUmhvOiAnXFx1MDNBMScsXG5cdCAgICBTaWdtYTogJ1xcdTAzQTMnLFxuXHQgICAgVGF1OiAnXFx1MDNBNCcsXG5cdCAgICBVcHNpbG9uOiAnXFx1MDNBNScsXG5cdCAgICBQaGk6ICdcXHUwM0E2Jyxcblx0ICAgIENoaTogJ1xcdTAzQTcnLFxuXHQgICAgUHNpOiAnXFx1MDNBOCcsXG5cdCAgICBPbWVnYTogJ1xcdTAzQTknLFxuXHQgICAgYWxwaGE6ICdcXHUwM0IxJyxcblx0ICAgIGJldGE6ICdcXHUwM0IyJyxcblx0ICAgIGdhbW1hOiAnXFx1MDNCMycsXG5cdCAgICBkZWx0YTogJ1xcdTAzQjQnLFxuXHQgICAgZXBzaWxvbjogJ1xcdTAzQjUnLFxuXHQgICAgemV0YTogJ1xcdTAzQjYnLFxuXHQgICAgZXRhOiAnXFx1MDNCNycsXG5cdCAgICB0aGV0YTogJ1xcdTAzQjgnLFxuXHQgICAgaW90YTogJ1xcdTAzQjknLFxuXHQgICAga2FwcGE6ICdcXHUwM0JBJyxcblx0ICAgIGxhbWJkYTogJ1xcdTAzQkInLFxuXHQgICAgbXU6ICdcXHUwM0JDJyxcblx0ICAgIG51OiAnXFx1MDNCRCcsXG5cdCAgICB4aTogJ1xcdTAzQkUnLFxuXHQgICAgb21pY3JvbjogJ1xcdTAzQkYnLFxuXHQgICAgcGk6ICdcXHUwM0MwJyxcblx0ICAgIHJobzogJ1xcdTAzQzEnLFxuXHQgICAgc2lnbWFmOiAnXFx1MDNDMicsXG5cdCAgICBzaWdtYTogJ1xcdTAzQzMnLFxuXHQgICAgdGF1OiAnXFx1MDNDNCcsXG5cdCAgICB1cHNpbG9uOiAnXFx1MDNDNScsXG5cdCAgICBwaGk6ICdcXHUwM0M2Jyxcblx0ICAgIGNoaTogJ1xcdTAzQzcnLFxuXHQgICAgcHNpOiAnXFx1MDNDOCcsXG5cdCAgICBvbWVnYTogJ1xcdTAzQzknLFxuXHQgICAgdGhldGFzeW06ICdcXHUwM0QxJyxcblx0ICAgIHVwc2loOiAnXFx1MDNEMicsXG5cdCAgICBwaXY6ICdcXHUwM0Q2Jyxcblx0ICAgIGVuc3A6ICdcXHUyMDAyJyxcblx0ICAgIGVtc3A6ICdcXHUyMDAzJyxcblx0ICAgIHRoaW5zcDogJ1xcdTIwMDknLFxuXHQgICAgenduajogJ1xcdTIwMEMnLFxuXHQgICAgendqOiAnXFx1MjAwRCcsXG5cdCAgICBscm06ICdcXHUyMDBFJyxcblx0ICAgIHJsbTogJ1xcdTIwMEYnLFxuXHQgICAgbmRhc2g6ICdcXHUyMDEzJyxcblx0ICAgIG1kYXNoOiAnXFx1MjAxNCcsXG5cdCAgICBsc3F1bzogJ1xcdTIwMTgnLFxuXHQgICAgcnNxdW86ICdcXHUyMDE5Jyxcblx0ICAgIHNicXVvOiAnXFx1MjAxQScsXG5cdCAgICBsZHF1bzogJ1xcdTIwMUMnLFxuXHQgICAgcmRxdW86ICdcXHUyMDFEJyxcblx0ICAgIGJkcXVvOiAnXFx1MjAxRScsXG5cdCAgICBkYWdnZXI6ICdcXHUyMDIwJyxcblx0ICAgIERhZ2dlcjogJ1xcdTIwMjEnLFxuXHQgICAgYnVsbDogJ1xcdTIwMjInLFxuXHQgICAgaGVsbGlwOiAnXFx1MjAyNicsXG5cdCAgICBwZXJtaWw6ICdcXHUyMDMwJyxcblx0ICAgIHByaW1lOiAnXFx1MjAzMicsXG5cdCAgICBQcmltZTogJ1xcdTIwMzMnLFxuXHQgICAgbHNhcXVvOiAnXFx1MjAzOScsXG5cdCAgICByc2FxdW86ICdcXHUyMDNBJyxcblx0ICAgIG9saW5lOiAnXFx1MjAzRScsXG5cdCAgICBmcmFzbDogJ1xcdTIwNDQnLFxuXHQgICAgZXVybzogJ1xcdTIwQUMnLFxuXHQgICAgaW1hZ2U6ICdcXHUyMTExJyxcblx0ICAgIHdlaWVycDogJ1xcdTIxMTgnLFxuXHQgICAgcmVhbDogJ1xcdTIxMUMnLFxuXHQgICAgdHJhZGU6ICdcXHUyMTIyJyxcblx0ICAgIGFsZWZzeW06ICdcXHUyMTM1Jyxcblx0ICAgIGxhcnI6ICdcXHUyMTkwJyxcblx0ICAgIHVhcnI6ICdcXHUyMTkxJyxcblx0ICAgIHJhcnI6ICdcXHUyMTkyJyxcblx0ICAgIGRhcnI6ICdcXHUyMTkzJyxcblx0ICAgIGhhcnI6ICdcXHUyMTk0Jyxcblx0ICAgIGNyYXJyOiAnXFx1MjFCNScsXG5cdCAgICBsQXJyOiAnXFx1MjFEMCcsXG5cdCAgICB1QXJyOiAnXFx1MjFEMScsXG5cdCAgICByQXJyOiAnXFx1MjFEMicsXG5cdCAgICBkQXJyOiAnXFx1MjFEMycsXG5cdCAgICBoQXJyOiAnXFx1MjFENCcsXG5cdCAgICBmb3JhbGw6ICdcXHUyMjAwJyxcblx0ICAgIHBhcnQ6ICdcXHUyMjAyJyxcblx0ICAgIGV4aXN0OiAnXFx1MjIwMycsXG5cdCAgICBlbXB0eTogJ1xcdTIyMDUnLFxuXHQgICAgbmFibGE6ICdcXHUyMjA3Jyxcblx0ICAgIGlzaW46ICdcXHUyMjA4Jyxcblx0ICAgIG5vdGluOiAnXFx1MjIwOScsXG5cdCAgICBuaTogJ1xcdTIyMEInLFxuXHQgICAgcHJvZDogJ1xcdTIyMEYnLFxuXHQgICAgc3VtOiAnXFx1MjIxMScsXG5cdCAgICBtaW51czogJ1xcdTIyMTInLFxuXHQgICAgbG93YXN0OiAnXFx1MjIxNycsXG5cdCAgICByYWRpYzogJ1xcdTIyMUEnLFxuXHQgICAgcHJvcDogJ1xcdTIyMUQnLFxuXHQgICAgaW5maW46ICdcXHUyMjFFJyxcblx0ICAgIGFuZzogJ1xcdTIyMjAnLFxuXHQgICAgYW5kOiAnXFx1MjIyNycsXG5cdCAgICBvcjogJ1xcdTIyMjgnLFxuXHQgICAgY2FwOiAnXFx1MjIyOScsXG5cdCAgICBjdXA6ICdcXHUyMjJBJyxcblx0ICAgIGludDogJ1xcdTIyMkInLFxuXHQgICAgdGhlcmU0OiAnXFx1MjIzNCcsXG5cdCAgICBzaW06ICdcXHUyMjNDJyxcblx0ICAgIGNvbmc6ICdcXHUyMjQ1Jyxcblx0ICAgIGFzeW1wOiAnXFx1MjI0OCcsXG5cdCAgICBuZTogJ1xcdTIyNjAnLFxuXHQgICAgZXF1aXY6ICdcXHUyMjYxJyxcblx0ICAgIGxlOiAnXFx1MjI2NCcsXG5cdCAgICBnZTogJ1xcdTIyNjUnLFxuXHQgICAgc3ViOiAnXFx1MjI4MicsXG5cdCAgICBzdXA6ICdcXHUyMjgzJyxcblx0ICAgIG5zdWI6ICdcXHUyMjg0Jyxcblx0ICAgIHN1YmU6ICdcXHUyMjg2Jyxcblx0ICAgIHN1cGU6ICdcXHUyMjg3Jyxcblx0ICAgIG9wbHVzOiAnXFx1MjI5NScsXG5cdCAgICBvdGltZXM6ICdcXHUyMjk3Jyxcblx0ICAgIHBlcnA6ICdcXHUyMkE1Jyxcblx0ICAgIHNkb3Q6ICdcXHUyMkM1Jyxcblx0ICAgIGxjZWlsOiAnXFx1MjMwOCcsXG5cdCAgICByY2VpbDogJ1xcdTIzMDknLFxuXHQgICAgbGZsb29yOiAnXFx1MjMwQScsXG5cdCAgICByZmxvb3I6ICdcXHUyMzBCJyxcblx0ICAgIGxvejogJ1xcdTI1Q0EnLFxuXHQgICAgc3BhZGVzOiAnXFx1MjY2MCcsXG5cdCAgICBjbHViczogJ1xcdTI2NjMnLFxuXHQgICAgaGVhcnRzOiAnXFx1MjY2NScsXG5cdCAgICBkaWFtczogJ1xcdTI2NjYnLFxuXHQgICAgbGFuZzogJ1xcdTI3RTgnLFxuXHQgICAgcmFuZzogJ1xcdTI3RTknXG5cdH07XG5cblxuLyoqKi8gfSxcbi8qIDE1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuXHR2YXIgZXJyb3JfaGFuZGxlcl8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMCk7XG5cdHZhciBzY2FubmVyXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKTtcblx0dmFyIHRva2VuXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcblx0dmFyIFJlYWRlciA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBSZWFkZXIoKSB7XG5cdCAgICAgICAgdGhpcy52YWx1ZXMgPSBbXTtcblx0ICAgICAgICB0aGlzLmN1cmx5ID0gdGhpcy5wYXJlbiA9IC0xO1xuXHQgICAgfVxuXHQgICAgLy8gQSBmdW5jdGlvbiBmb2xsb3dpbmcgb25lIG9mIHRob3NlIHRva2VucyBpcyBhbiBleHByZXNzaW9uLlxuXHQgICAgUmVhZGVyLnByb3RvdHlwZS5iZWZvcmVGdW5jdGlvbkV4cHJlc3Npb24gPSBmdW5jdGlvbiAodCkge1xuXHQgICAgICAgIHJldHVybiBbJygnLCAneycsICdbJywgJ2luJywgJ3R5cGVvZicsICdpbnN0YW5jZW9mJywgJ25ldycsXG5cdCAgICAgICAgICAgICdyZXR1cm4nLCAnY2FzZScsICdkZWxldGUnLCAndGhyb3cnLCAndm9pZCcsXG5cdCAgICAgICAgICAgIC8vIGFzc2lnbm1lbnQgb3BlcmF0b3JzXG5cdCAgICAgICAgICAgICc9JywgJys9JywgJy09JywgJyo9JywgJyoqPScsICcvPScsICclPScsICc8PD0nLCAnPj49JywgJz4+Pj0nLFxuXHQgICAgICAgICAgICAnJj0nLCAnfD0nLCAnXj0nLCAnLCcsXG5cdCAgICAgICAgICAgIC8vIGJpbmFyeS91bmFyeSBvcGVyYXRvcnNcblx0ICAgICAgICAgICAgJysnLCAnLScsICcqJywgJyoqJywgJy8nLCAnJScsICcrKycsICctLScsICc8PCcsICc+PicsICc+Pj4nLCAnJicsXG5cdCAgICAgICAgICAgICd8JywgJ14nLCAnIScsICd+JywgJyYmJywgJ3x8JywgJz8nLCAnOicsICc9PT0nLCAnPT0nLCAnPj0nLFxuXHQgICAgICAgICAgICAnPD0nLCAnPCcsICc+JywgJyE9JywgJyE9PSddLmluZGV4T2YodCkgPj0gMDtcblx0ICAgIH07XG5cdCAgICAvLyBEZXRlcm1pbmUgaWYgZm9yd2FyZCBzbGFzaCAoLykgaXMgYW4gb3BlcmF0b3Igb3IgcGFydCBvZiBhIHJlZ3VsYXIgZXhwcmVzc2lvblxuXHQgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvc3dlZXQuanMvd2lraS9kZXNpZ25cblx0ICAgIFJlYWRlci5wcm90b3R5cGUuaXNSZWdleFN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBwcmV2aW91cyA9IHRoaXMudmFsdWVzW3RoaXMudmFsdWVzLmxlbmd0aCAtIDFdO1xuXHQgICAgICAgIHZhciByZWdleCA9IChwcmV2aW91cyAhPT0gbnVsbCk7XG5cdCAgICAgICAgc3dpdGNoIChwcmV2aW91cykge1xuXHQgICAgICAgICAgICBjYXNlICd0aGlzJzpcblx0ICAgICAgICAgICAgY2FzZSAnXSc6XG5cdCAgICAgICAgICAgICAgICByZWdleCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2UgJyknOlxuXHQgICAgICAgICAgICAgICAgdmFyIGtleXdvcmQgPSB0aGlzLnZhbHVlc1t0aGlzLnBhcmVuIC0gMV07XG5cdCAgICAgICAgICAgICAgICByZWdleCA9IChrZXl3b3JkID09PSAnaWYnIHx8IGtleXdvcmQgPT09ICd3aGlsZScgfHwga2V5d29yZCA9PT0gJ2ZvcicgfHwga2V5d29yZCA9PT0gJ3dpdGgnKTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBjYXNlICd9Jzpcblx0ICAgICAgICAgICAgICAgIC8vIERpdmlkaW5nIGEgZnVuY3Rpb24gYnkgYW55dGhpbmcgbWFrZXMgbGl0dGxlIHNlbnNlLFxuXHQgICAgICAgICAgICAgICAgLy8gYnV0IHdlIGhhdmUgdG8gY2hlY2sgZm9yIHRoYXQuXG5cdCAgICAgICAgICAgICAgICByZWdleCA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVzW3RoaXMuY3VybHkgLSAzXSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIEFub255bW91cyBmdW5jdGlvbiwgZS5nLiBmdW5jdGlvbigpe30gLzQyXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGNoZWNrID0gdGhpcy52YWx1ZXNbdGhpcy5jdXJseSAtIDRdO1xuXHQgICAgICAgICAgICAgICAgICAgIHJlZ2V4ID0gY2hlY2sgPyAhdGhpcy5iZWZvcmVGdW5jdGlvbkV4cHJlc3Npb24oY2hlY2spIDogZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnZhbHVlc1t0aGlzLmN1cmx5IC0gNF0gPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBOYW1lZCBmdW5jdGlvbiwgZS5nLiBmdW5jdGlvbiBmKCl7fSAvNDIvXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGNoZWNrID0gdGhpcy52YWx1ZXNbdGhpcy5jdXJseSAtIDVdO1xuXHQgICAgICAgICAgICAgICAgICAgIHJlZ2V4ID0gY2hlY2sgPyAhdGhpcy5iZWZvcmVGdW5jdGlvbkV4cHJlc3Npb24oY2hlY2spIDogdHJ1ZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZWdleDtcblx0ICAgIH07XG5cdCAgICBSZWFkZXIucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAodG9rZW4pIHtcblx0ICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gNyAvKiBQdW5jdHVhdG9yICovIHx8IHRva2VuLnR5cGUgPT09IDQgLyogS2V5d29yZCAqLykge1xuXHQgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT09ICd7Jykge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5jdXJseSA9IHRoaXMudmFsdWVzLmxlbmd0aDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbHNlIGlmICh0b2tlbi52YWx1ZSA9PT0gJygnKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnBhcmVuID0gdGhpcy52YWx1ZXMubGVuZ3RoO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHRoaXMudmFsdWVzLnB1c2godG9rZW4udmFsdWUpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgdGhpcy52YWx1ZXMucHVzaChudWxsKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgcmV0dXJuIFJlYWRlcjtcblx0fSgpKTtcblx0dmFyIFRva2VuaXplciA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBUb2tlbml6ZXIoY29kZSwgY29uZmlnKSB7XG5cdCAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIgPSBuZXcgZXJyb3JfaGFuZGxlcl8xLkVycm9ySGFuZGxlcigpO1xuXHQgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyLnRvbGVyYW50ID0gY29uZmlnID8gKHR5cGVvZiBjb25maWcudG9sZXJhbnQgPT09ICdib29sZWFuJyAmJiBjb25maWcudG9sZXJhbnQpIDogZmFsc2U7XG5cdCAgICAgICAgdGhpcy5zY2FubmVyID0gbmV3IHNjYW5uZXJfMS5TY2FubmVyKGNvZGUsIHRoaXMuZXJyb3JIYW5kbGVyKTtcblx0ICAgICAgICB0aGlzLnNjYW5uZXIudHJhY2tDb21tZW50ID0gY29uZmlnID8gKHR5cGVvZiBjb25maWcuY29tbWVudCA9PT0gJ2Jvb2xlYW4nICYmIGNvbmZpZy5jb21tZW50KSA6IGZhbHNlO1xuXHQgICAgICAgIHRoaXMudHJhY2tSYW5nZSA9IGNvbmZpZyA/ICh0eXBlb2YgY29uZmlnLnJhbmdlID09PSAnYm9vbGVhbicgJiYgY29uZmlnLnJhbmdlKSA6IGZhbHNlO1xuXHQgICAgICAgIHRoaXMudHJhY2tMb2MgPSBjb25maWcgPyAodHlwZW9mIGNvbmZpZy5sb2MgPT09ICdib29sZWFuJyAmJiBjb25maWcubG9jKSA6IGZhbHNlO1xuXHQgICAgICAgIHRoaXMuYnVmZmVyID0gW107XG5cdCAgICAgICAgdGhpcy5yZWFkZXIgPSBuZXcgUmVhZGVyKCk7XG5cdCAgICB9XG5cdCAgICBUb2tlbml6ZXIucHJvdG90eXBlLmVycm9ycyA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5lcnJvckhhbmRsZXIuZXJyb3JzO1xuXHQgICAgfTtcblx0ICAgIFRva2VuaXplci5wcm90b3R5cGUuZ2V0TmV4dFRva2VuID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmICh0aGlzLmJ1ZmZlci5sZW5ndGggPT09IDApIHtcblx0ICAgICAgICAgICAgdmFyIGNvbW1lbnRzID0gdGhpcy5zY2FubmVyLnNjYW5Db21tZW50cygpO1xuXHQgICAgICAgICAgICBpZiAodGhpcy5zY2FubmVyLnRyYWNrQ29tbWVudCkge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21tZW50cy5sZW5ndGg7ICsraSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBlID0gY29tbWVudHNbaV07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5zY2FubmVyLnNvdXJjZS5zbGljZShlLnNsaWNlWzBdLCBlLnNsaWNlWzFdKTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgY29tbWVudCA9IHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZS5tdWx0aUxpbmUgPyAnQmxvY2tDb21tZW50JyA6ICdMaW5lQ29tbWVudCcsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuXHQgICAgICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhY2tSYW5nZSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50LnJhbmdlID0gZS5yYW5nZTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhY2tMb2MpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudC5sb2MgPSBlLmxvYztcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmZXIucHVzaChjb21tZW50KTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoIXRoaXMuc2Nhbm5lci5lb2YoKSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGxvYyA9IHZvaWQgMDtcblx0ICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrTG9jKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbG9jID0ge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDoge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogdGhpcy5zY2FubmVyLmxpbmVOdW1iZXIsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IHRoaXMuc2Nhbm5lci5pbmRleCAtIHRoaXMuc2Nhbm5lci5saW5lU3RhcnRcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiB7fVxuXHQgICAgICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB2YXIgc3RhcnRSZWdleCA9ICh0aGlzLnNjYW5uZXIuc291cmNlW3RoaXMuc2Nhbm5lci5pbmRleF0gPT09ICcvJykgJiYgdGhpcy5yZWFkZXIuaXNSZWdleFN0YXJ0KCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgdG9rZW4gPSBzdGFydFJlZ2V4ID8gdGhpcy5zY2FubmVyLnNjYW5SZWdFeHAoKSA6IHRoaXMuc2Nhbm5lci5sZXgoKTtcblx0ICAgICAgICAgICAgICAgIHRoaXMucmVhZGVyLnB1c2godG9rZW4pO1xuXHQgICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0ge1xuXHQgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRva2VuXzEuVG9rZW5OYW1lW3Rva2VuLnR5cGVdLFxuXHQgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnNjYW5uZXIuc291cmNlLnNsaWNlKHRva2VuLnN0YXJ0LCB0b2tlbi5lbmQpXG5cdCAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhY2tSYW5nZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGVudHJ5LnJhbmdlID0gW3Rva2VuLnN0YXJ0LCB0b2tlbi5lbmRdO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhY2tMb2MpIHtcblx0ICAgICAgICAgICAgICAgICAgICBsb2MuZW5kID0ge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBsaW5lOiB0aGlzLnNjYW5uZXIubGluZU51bWJlcixcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiB0aGlzLnNjYW5uZXIuaW5kZXggLSB0aGlzLnNjYW5uZXIubGluZVN0YXJ0XG5cdCAgICAgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgICAgICAgICBlbnRyeS5sb2MgPSBsb2M7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gOSAvKiBSZWd1bGFyRXhwcmVzc2lvbiAqLykge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBwYXR0ZXJuID0gdG9rZW4ucGF0dGVybjtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZmxhZ3MgPSB0b2tlbi5mbGFncztcblx0ICAgICAgICAgICAgICAgICAgICBlbnRyeS5yZWdleCA9IHsgcGF0dGVybjogcGF0dGVybiwgZmxhZ3M6IGZsYWdzIH07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKGVudHJ5KTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpcy5idWZmZXIuc2hpZnQoKTtcblx0ICAgIH07XG5cdCAgICByZXR1cm4gVG9rZW5pemVyO1xuXHR9KCkpO1xuXHRleHBvcnRzLlRva2VuaXplciA9IFRva2VuaXplcjtcblxuXG4vKioqLyB9XG4vKioqKioqLyBdKVxufSk7XG47Il0sInNvdXJjZVJvb3QiOiIifQ==