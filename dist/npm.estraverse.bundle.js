(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.estraverse"],{

/***/ "V9Y0":
/*!**********************************************!*\
  !*** ./node_modules/estraverse/package.json ***!
  \**********************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, bugs, bundleDependencies, deprecated, description, devDependencies, engines, homepage, license, main, maintainers, name, repository, scripts, version, default */
/*! all exports used */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"estraverse@^4.2.0\",\"_id\":\"estraverse@4.3.0\",\"_inBundle\":false,\"_integrity\":\"sha512-39nnKffWz8xN1BU/2c79n9nB9HDzo0niYUqx6xyqUnyoAnQyyWpOTdZEeiCch8BBu515t4wp9ZmgVfVhn9EBpw==\",\"_location\":\"/estraverse\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"range\",\"registry\":true,\"raw\":\"estraverse@^4.2.0\",\"name\":\"estraverse\",\"escapedName\":\"estraverse\",\"rawSpec\":\"^4.2.0\",\"saveSpec\":null,\"fetchSpec\":\"^4.2.0\"},\"_requiredBy\":[\"/escodegen\"],\"_resolved\":\"https://registry.npmjs.org/estraverse/-/estraverse-4.3.0.tgz\",\"_shasum\":\"398ad3f3c5a24948be7725e83d11a7de28cdbd1d\",\"_spec\":\"estraverse@^4.2.0\",\"_where\":\"/home/maxbundy/git/progrem-viewer/node_modules/escodegen\",\"bugs\":{\"url\":\"https://github.com/estools/estraverse/issues\"},\"bundleDependencies\":false,\"deprecated\":false,\"description\":\"ECMAScript JS AST traversal functions\",\"devDependencies\":{\"babel-preset-env\":\"^1.6.1\",\"babel-register\":\"^6.3.13\",\"chai\":\"^2.1.1\",\"espree\":\"^1.11.0\",\"gulp\":\"^3.8.10\",\"gulp-bump\":\"^0.2.2\",\"gulp-filter\":\"^2.0.0\",\"gulp-git\":\"^1.0.1\",\"gulp-tag-version\":\"^1.3.0\",\"jshint\":\"^2.5.6\",\"mocha\":\"^2.1.0\"},\"engines\":{\"node\":\">=4.0\"},\"homepage\":\"https://github.com/estools/estraverse\",\"license\":\"BSD-2-Clause\",\"main\":\"estraverse.js\",\"maintainers\":[{\"name\":\"Yusuke Suzuki\",\"email\":\"utatane.tea@gmail.com\",\"url\":\"http://github.com/Constellation\"}],\"name\":\"estraverse\",\"repository\":{\"type\":\"git\",\"url\":\"git+ssh://git@github.com/estools/estraverse.git\"},\"scripts\":{\"lint\":\"jshint estraverse.js\",\"test\":\"npm run-script lint && npm run-script unit-test\",\"unit-test\":\"mocha --compilers js:babel-register\"},\"version\":\"4.3.0\"}");

/***/ }),

/***/ "sR6L":
/*!***********************************************!*\
  !*** ./node_modules/estraverse/estraverse.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>

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
/*jslint vars:false, bitwise:true*/
/*jshint indent:4*/
/*global exports:true*/
(function clone(exports) {
    'use strict';

    var Syntax,
        VisitorOption,
        VisitorKeys,
        BREAK,
        SKIP,
        REMOVE;

    function deepCopy(obj) {
        var ret = {}, key, val;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                val = obj[key];
                if (typeof val === 'object' && val !== null) {
                    ret[key] = deepCopy(val);
                } else {
                    ret[key] = val;
                }
            }
        }
        return ret;
    }

    // based on LLVM libc++ upper_bound / lower_bound
    // MIT License

    function upperBound(array, func) {
        var diff, len, i, current;

        len = array.length;
        i = 0;

        while (len) {
            diff = len >>> 1;
            current = i + diff;
            if (func(array[current])) {
                len = diff;
            } else {
                i = current + 1;
                len -= diff + 1;
            }
        }
        return i;
    }

    Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        AssignmentPattern: 'AssignmentPattern',
        ArrayExpression: 'ArrayExpression',
        ArrayPattern: 'ArrayPattern',
        ArrowFunctionExpression: 'ArrowFunctionExpression',
        AwaitExpression: 'AwaitExpression', // CAUTION: It's deferred to ES7.
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ClassBody: 'ClassBody',
        ClassDeclaration: 'ClassDeclaration',
        ClassExpression: 'ClassExpression',
        ComprehensionBlock: 'ComprehensionBlock',  // CAUTION: It's deferred to ES7.
        ComprehensionExpression: 'ComprehensionExpression',  // CAUTION: It's deferred to ES7.
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DebuggerStatement: 'DebuggerStatement',
        DirectiveStatement: 'DirectiveStatement',
        DoWhileStatement: 'DoWhileStatement',
        EmptyStatement: 'EmptyStatement',
        ExportAllDeclaration: 'ExportAllDeclaration',
        ExportDefaultDeclaration: 'ExportDefaultDeclaration',
        ExportNamedDeclaration: 'ExportNamedDeclaration',
        ExportSpecifier: 'ExportSpecifier',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        ForOfStatement: 'ForOfStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        GeneratorExpression: 'GeneratorExpression',  // CAUTION: It's deferred to ES7.
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        ImportExpression: 'ImportExpression',
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
        ModuleSpecifier: 'ModuleSpecifier',
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
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
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

    VisitorKeys = {
        AssignmentExpression: ['left', 'right'],
        AssignmentPattern: ['left', 'right'],
        ArrayExpression: ['elements'],
        ArrayPattern: ['elements'],
        ArrowFunctionExpression: ['params', 'body'],
        AwaitExpression: ['argument'], // CAUTION: It's deferred to ES7.
        BlockStatement: ['body'],
        BinaryExpression: ['left', 'right'],
        BreakStatement: ['label'],
        CallExpression: ['callee', 'arguments'],
        CatchClause: ['param', 'body'],
        ClassBody: ['body'],
        ClassDeclaration: ['id', 'superClass', 'body'],
        ClassExpression: ['id', 'superClass', 'body'],
        ComprehensionBlock: ['left', 'right'],  // CAUTION: It's deferred to ES7.
        ComprehensionExpression: ['blocks', 'filter', 'body'],  // CAUTION: It's deferred to ES7.
        ConditionalExpression: ['test', 'consequent', 'alternate'],
        ContinueStatement: ['label'],
        DebuggerStatement: [],
        DirectiveStatement: [],
        DoWhileStatement: ['body', 'test'],
        EmptyStatement: [],
        ExportAllDeclaration: ['source'],
        ExportDefaultDeclaration: ['declaration'],
        ExportNamedDeclaration: ['declaration', 'specifiers', 'source'],
        ExportSpecifier: ['exported', 'local'],
        ExpressionStatement: ['expression'],
        ForStatement: ['init', 'test', 'update', 'body'],
        ForInStatement: ['left', 'right', 'body'],
        ForOfStatement: ['left', 'right', 'body'],
        FunctionDeclaration: ['id', 'params', 'body'],
        FunctionExpression: ['id', 'params', 'body'],
        GeneratorExpression: ['blocks', 'filter', 'body'],  // CAUTION: It's deferred to ES7.
        Identifier: [],
        IfStatement: ['test', 'consequent', 'alternate'],
        ImportExpression: ['source'],
        ImportDeclaration: ['specifiers', 'source'],
        ImportDefaultSpecifier: ['local'],
        ImportNamespaceSpecifier: ['local'],
        ImportSpecifier: ['imported', 'local'],
        Literal: [],
        LabeledStatement: ['label', 'body'],
        LogicalExpression: ['left', 'right'],
        MemberExpression: ['object', 'property'],
        MetaProperty: ['meta', 'property'],
        MethodDefinition: ['key', 'value'],
        ModuleSpecifier: [],
        NewExpression: ['callee', 'arguments'],
        ObjectExpression: ['properties'],
        ObjectPattern: ['properties'],
        Program: ['body'],
        Property: ['key', 'value'],
        RestElement: [ 'argument' ],
        ReturnStatement: ['argument'],
        SequenceExpression: ['expressions'],
        SpreadElement: ['argument'],
        Super: [],
        SwitchStatement: ['discriminant', 'cases'],
        SwitchCase: ['test', 'consequent'],
        TaggedTemplateExpression: ['tag', 'quasi'],
        TemplateElement: [],
        TemplateLiteral: ['quasis', 'expressions'],
        ThisExpression: [],
        ThrowStatement: ['argument'],
        TryStatement: ['block', 'handler', 'finalizer'],
        UnaryExpression: ['argument'],
        UpdateExpression: ['argument'],
        VariableDeclaration: ['declarations'],
        VariableDeclarator: ['id', 'init'],
        WhileStatement: ['test', 'body'],
        WithStatement: ['object', 'body'],
        YieldExpression: ['argument']
    };

    // unique id
    BREAK = {};
    SKIP = {};
    REMOVE = {};

    VisitorOption = {
        Break: BREAK,
        Skip: SKIP,
        Remove: REMOVE
    };

    function Reference(parent, key) {
        this.parent = parent;
        this.key = key;
    }

    Reference.prototype.replace = function replace(node) {
        this.parent[this.key] = node;
    };

    Reference.prototype.remove = function remove() {
        if (Array.isArray(this.parent)) {
            this.parent.splice(this.key, 1);
            return true;
        } else {
            this.replace(null);
            return false;
        }
    };

    function Element(node, path, wrap, ref) {
        this.node = node;
        this.path = path;
        this.wrap = wrap;
        this.ref = ref;
    }

    function Controller() { }

    // API:
    // return property path array from root to current node
    Controller.prototype.path = function path() {
        var i, iz, j, jz, result, element;

        function addToPath(result, path) {
            if (Array.isArray(path)) {
                for (j = 0, jz = path.length; j < jz; ++j) {
                    result.push(path[j]);
                }
            } else {
                result.push(path);
            }
        }

        // root node
        if (!this.__current.path) {
            return null;
        }

        // first node is sentinel, second node is root element
        result = [];
        for (i = 2, iz = this.__leavelist.length; i < iz; ++i) {
            element = this.__leavelist[i];
            addToPath(result, element.path);
        }
        addToPath(result, this.__current.path);
        return result;
    };

    // API:
    // return type of current node
    Controller.prototype.type = function () {
        var node = this.current();
        return node.type || this.__current.wrap;
    };

    // API:
    // return array of parent elements
    Controller.prototype.parents = function parents() {
        var i, iz, result;

        // first node is sentinel
        result = [];
        for (i = 1, iz = this.__leavelist.length; i < iz; ++i) {
            result.push(this.__leavelist[i].node);
        }

        return result;
    };

    // API:
    // return current node
    Controller.prototype.current = function current() {
        return this.__current.node;
    };

    Controller.prototype.__execute = function __execute(callback, element) {
        var previous, result;

        result = undefined;

        previous  = this.__current;
        this.__current = element;
        this.__state = null;
        if (callback) {
            result = callback.call(this, element.node, this.__leavelist[this.__leavelist.length - 1].node);
        }
        this.__current = previous;

        return result;
    };

    // API:
    // notify control skip / break
    Controller.prototype.notify = function notify(flag) {
        this.__state = flag;
    };

    // API:
    // skip child nodes of current node
    Controller.prototype.skip = function () {
        this.notify(SKIP);
    };

    // API:
    // break traversals
    Controller.prototype['break'] = function () {
        this.notify(BREAK);
    };

    // API:
    // remove node
    Controller.prototype.remove = function () {
        this.notify(REMOVE);
    };

    Controller.prototype.__initialize = function(root, visitor) {
        this.visitor = visitor;
        this.root = root;
        this.__worklist = [];
        this.__leavelist = [];
        this.__current = null;
        this.__state = null;
        this.__fallback = null;
        if (visitor.fallback === 'iteration') {
            this.__fallback = Object.keys;
        } else if (typeof visitor.fallback === 'function') {
            this.__fallback = visitor.fallback;
        }

        this.__keys = VisitorKeys;
        if (visitor.keys) {
            this.__keys = Object.assign(Object.create(this.__keys), visitor.keys);
        }
    };

    function isNode(node) {
        if (node == null) {
            return false;
        }
        return typeof node === 'object' && typeof node.type === 'string';
    }

    function isProperty(nodeType, key) {
        return (nodeType === Syntax.ObjectExpression || nodeType === Syntax.ObjectPattern) && 'properties' === key;
    }

    Controller.prototype.traverse = function traverse(root, visitor) {
        var worklist,
            leavelist,
            element,
            node,
            nodeType,
            ret,
            key,
            current,
            current2,
            candidates,
            candidate,
            sentinel;

        this.__initialize(root, visitor);

        sentinel = {};

        // reference
        worklist = this.__worklist;
        leavelist = this.__leavelist;

        // initialize
        worklist.push(new Element(root, null, null, null));
        leavelist.push(new Element(null, null, null, null));

        while (worklist.length) {
            element = worklist.pop();

            if (element === sentinel) {
                element = leavelist.pop();

                ret = this.__execute(visitor.leave, element);

                if (this.__state === BREAK || ret === BREAK) {
                    return;
                }
                continue;
            }

            if (element.node) {

                ret = this.__execute(visitor.enter, element);

                if (this.__state === BREAK || ret === BREAK) {
                    return;
                }

                worklist.push(sentinel);
                leavelist.push(element);

                if (this.__state === SKIP || ret === SKIP) {
                    continue;
                }

                node = element.node;
                nodeType = node.type || element.wrap;
                candidates = this.__keys[nodeType];
                if (!candidates) {
                    if (this.__fallback) {
                        candidates = this.__fallback(node);
                    } else {
                        throw new Error('Unknown node type ' + nodeType + '.');
                    }
                }

                current = candidates.length;
                while ((current -= 1) >= 0) {
                    key = candidates[current];
                    candidate = node[key];
                    if (!candidate) {
                        continue;
                    }

                    if (Array.isArray(candidate)) {
                        current2 = candidate.length;
                        while ((current2 -= 1) >= 0) {
                            if (!candidate[current2]) {
                                continue;
                            }
                            if (isProperty(nodeType, candidates[current])) {
                                element = new Element(candidate[current2], [key, current2], 'Property', null);
                            } else if (isNode(candidate[current2])) {
                                element = new Element(candidate[current2], [key, current2], null, null);
                            } else {
                                continue;
                            }
                            worklist.push(element);
                        }
                    } else if (isNode(candidate)) {
                        worklist.push(new Element(candidate, key, null, null));
                    }
                }
            }
        }
    };

    Controller.prototype.replace = function replace(root, visitor) {
        var worklist,
            leavelist,
            node,
            nodeType,
            target,
            element,
            current,
            current2,
            candidates,
            candidate,
            sentinel,
            outer,
            key;

        function removeElem(element) {
            var i,
                key,
                nextElem,
                parent;

            if (element.ref.remove()) {
                // When the reference is an element of an array.
                key = element.ref.key;
                parent = element.ref.parent;

                // If removed from array, then decrease following items' keys.
                i = worklist.length;
                while (i--) {
                    nextElem = worklist[i];
                    if (nextElem.ref && nextElem.ref.parent === parent) {
                        if  (nextElem.ref.key < key) {
                            break;
                        }
                        --nextElem.ref.key;
                    }
                }
            }
        }

        this.__initialize(root, visitor);

        sentinel = {};

        // reference
        worklist = this.__worklist;
        leavelist = this.__leavelist;

        // initialize
        outer = {
            root: root
        };
        element = new Element(root, null, null, new Reference(outer, 'root'));
        worklist.push(element);
        leavelist.push(element);

        while (worklist.length) {
            element = worklist.pop();

            if (element === sentinel) {
                element = leavelist.pop();

                target = this.__execute(visitor.leave, element);

                // node may be replaced with null,
                // so distinguish between undefined and null in this place
                if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
                    // replace
                    element.ref.replace(target);
                }

                if (this.__state === REMOVE || target === REMOVE) {
                    removeElem(element);
                }

                if (this.__state === BREAK || target === BREAK) {
                    return outer.root;
                }
                continue;
            }

            target = this.__execute(visitor.enter, element);

            // node may be replaced with null,
            // so distinguish between undefined and null in this place
            if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
                // replace
                element.ref.replace(target);
                element.node = target;
            }

            if (this.__state === REMOVE || target === REMOVE) {
                removeElem(element);
                element.node = null;
            }

            if (this.__state === BREAK || target === BREAK) {
                return outer.root;
            }

            // node may be null
            node = element.node;
            if (!node) {
                continue;
            }

            worklist.push(sentinel);
            leavelist.push(element);

            if (this.__state === SKIP || target === SKIP) {
                continue;
            }

            nodeType = node.type || element.wrap;
            candidates = this.__keys[nodeType];
            if (!candidates) {
                if (this.__fallback) {
                    candidates = this.__fallback(node);
                } else {
                    throw new Error('Unknown node type ' + nodeType + '.');
                }
            }

            current = candidates.length;
            while ((current -= 1) >= 0) {
                key = candidates[current];
                candidate = node[key];
                if (!candidate) {
                    continue;
                }

                if (Array.isArray(candidate)) {
                    current2 = candidate.length;
                    while ((current2 -= 1) >= 0) {
                        if (!candidate[current2]) {
                            continue;
                        }
                        if (isProperty(nodeType, candidates[current])) {
                            element = new Element(candidate[current2], [key, current2], 'Property', new Reference(candidate, current2));
                        } else if (isNode(candidate[current2])) {
                            element = new Element(candidate[current2], [key, current2], null, new Reference(candidate, current2));
                        } else {
                            continue;
                        }
                        worklist.push(element);
                    }
                } else if (isNode(candidate)) {
                    worklist.push(new Element(candidate, key, null, new Reference(node, key)));
                }
            }
        }

        return outer.root;
    };

    function traverse(root, visitor) {
        var controller = new Controller();
        return controller.traverse(root, visitor);
    }

    function replace(root, visitor) {
        var controller = new Controller();
        return controller.replace(root, visitor);
    }

    function extendCommentRange(comment, tokens) {
        var target;

        target = upperBound(tokens, function search(token) {
            return token.range[0] > comment.range[0];
        });

        comment.extendedRange = [comment.range[0], comment.range[1]];

        if (target !== tokens.length) {
            comment.extendedRange[1] = tokens[target].range[0];
        }

        target -= 1;
        if (target >= 0) {
            comment.extendedRange[0] = tokens[target].range[1];
        }

        return comment;
    }

    function attachComments(tree, providedComments, tokens) {
        // At first, we should calculate extended comment ranges.
        var comments = [], comment, len, i, cursor;

        if (!tree.range) {
            throw new Error('attachComments needs range information');
        }

        // tokens array is empty, we attach comments to tree as 'leadingComments'
        if (!tokens.length) {
            if (providedComments.length) {
                for (i = 0, len = providedComments.length; i < len; i += 1) {
                    comment = deepCopy(providedComments[i]);
                    comment.extendedRange = [0, tree.range[0]];
                    comments.push(comment);
                }
                tree.leadingComments = comments;
            }
            return tree;
        }

        for (i = 0, len = providedComments.length; i < len; i += 1) {
            comments.push(extendCommentRange(deepCopy(providedComments[i]), tokens));
        }

        // This is based on John Freeman's implementation.
        cursor = 0;
        traverse(tree, {
            enter: function (node) {
                var comment;

                while (cursor < comments.length) {
                    comment = comments[cursor];
                    if (comment.extendedRange[1] > node.range[0]) {
                        break;
                    }

                    if (comment.extendedRange[1] === node.range[0]) {
                        if (!node.leadingComments) {
                            node.leadingComments = [];
                        }
                        node.leadingComments.push(comment);
                        comments.splice(cursor, 1);
                    } else {
                        cursor += 1;
                    }
                }

                // already out of owned node
                if (cursor === comments.length) {
                    return VisitorOption.Break;
                }

                if (comments[cursor].extendedRange[0] > node.range[1]) {
                    return VisitorOption.Skip;
                }
            }
        });

        cursor = 0;
        traverse(tree, {
            leave: function (node) {
                var comment;

                while (cursor < comments.length) {
                    comment = comments[cursor];
                    if (node.range[1] < comment.extendedRange[0]) {
                        break;
                    }

                    if (node.range[1] === comment.extendedRange[0]) {
                        if (!node.trailingComments) {
                            node.trailingComments = [];
                        }
                        node.trailingComments.push(comment);
                        comments.splice(cursor, 1);
                    } else {
                        cursor += 1;
                    }
                }

                // already out of owned node
                if (cursor === comments.length) {
                    return VisitorOption.Break;
                }

                if (comments[cursor].extendedRange[0] > node.range[1]) {
                    return VisitorOption.Skip;
                }
            }
        });

        return tree;
    }

    exports.version = __webpack_require__(/*! ./package.json */ "V9Y0").version;
    exports.Syntax = Syntax;
    exports.traverse = traverse;
    exports.replace = replace;
    exports.attachComments = attachComments;
    exports.VisitorKeys = VisitorKeys;
    exports.VisitorOption = VisitorOption;
    exports.Controller = Controller;
    exports.cloneEnvironment = function () { return clone({}); };

    return exports;
}(exports));
/* vim: set sw=4 ts=4 et tw=80 : */


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXN0cmF2ZXJzZS9lc3RyYXZlcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkNBQTZDLFFBQVE7QUFDckQ7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlEQUFpRCxRQUFRO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlEQUFpRCxRQUFRO0FBQ3pEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMERBQTBELFNBQVM7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrREFBa0QsU0FBUztBQUMzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUEsc0JBQXNCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLGdCQUFnQixFQUFFOztBQUU5RDtBQUNBLENBQUM7QUFDRCIsImZpbGUiOiJucG0uZXN0cmF2ZXJzZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTItMjAxMyBZdXN1a2UgU3V6dWtpIDx1dGF0YW5lLnRlYUBnbWFpbC5jb20+XG4gIENvcHlyaWdodCAoQykgMjAxMiBBcml5YSBIaWRheWF0IDxhcml5YS5oaWRheWF0QGdtYWlsLmNvbT5cblxuICBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAgbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0XG4gICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodFxuICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZVxuICAgICAgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuICBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIlxuICBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4gIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4gIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCA8Q09QWVJJR0hUIEhPTERFUj4gQkUgTElBQkxFIEZPUiBBTllcbiAgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbiAgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuICBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkRcbiAgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbiAgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GXG4gIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4qL1xuLypqc2xpbnQgdmFyczpmYWxzZSwgYml0d2lzZTp0cnVlKi9cbi8qanNoaW50IGluZGVudDo0Ki9cbi8qZ2xvYmFsIGV4cG9ydHM6dHJ1ZSovXG4oZnVuY3Rpb24gY2xvbmUoZXhwb3J0cykge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBTeW50YXgsXG4gICAgICAgIFZpc2l0b3JPcHRpb24sXG4gICAgICAgIFZpc2l0b3JLZXlzLFxuICAgICAgICBCUkVBSyxcbiAgICAgICAgU0tJUCxcbiAgICAgICAgUkVNT1ZFO1xuXG4gICAgZnVuY3Rpb24gZGVlcENvcHkob2JqKSB7XG4gICAgICAgIHZhciByZXQgPSB7fSwga2V5LCB2YWw7XG4gICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gb2JqW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXRba2V5XSA9IGRlZXBDb3B5KHZhbCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0W2tleV0gPSB2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLy8gYmFzZWQgb24gTExWTSBsaWJjKysgdXBwZXJfYm91bmQgLyBsb3dlcl9ib3VuZFxuICAgIC8vIE1JVCBMaWNlbnNlXG5cbiAgICBmdW5jdGlvbiB1cHBlckJvdW5kKGFycmF5LCBmdW5jKSB7XG4gICAgICAgIHZhciBkaWZmLCBsZW4sIGksIGN1cnJlbnQ7XG5cbiAgICAgICAgbGVuID0gYXJyYXkubGVuZ3RoO1xuICAgICAgICBpID0gMDtcblxuICAgICAgICB3aGlsZSAobGVuKSB7XG4gICAgICAgICAgICBkaWZmID0gbGVuID4+PiAxO1xuICAgICAgICAgICAgY3VycmVudCA9IGkgKyBkaWZmO1xuICAgICAgICAgICAgaWYgKGZ1bmMoYXJyYXlbY3VycmVudF0pKSB7XG4gICAgICAgICAgICAgICAgbGVuID0gZGlmZjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaSA9IGN1cnJlbnQgKyAxO1xuICAgICAgICAgICAgICAgIGxlbiAtPSBkaWZmICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaTtcbiAgICB9XG5cbiAgICBTeW50YXggPSB7XG4gICAgICAgIEFzc2lnbm1lbnRFeHByZXNzaW9uOiAnQXNzaWdubWVudEV4cHJlc3Npb24nLFxuICAgICAgICBBc3NpZ25tZW50UGF0dGVybjogJ0Fzc2lnbm1lbnRQYXR0ZXJuJyxcbiAgICAgICAgQXJyYXlFeHByZXNzaW9uOiAnQXJyYXlFeHByZXNzaW9uJyxcbiAgICAgICAgQXJyYXlQYXR0ZXJuOiAnQXJyYXlQYXR0ZXJuJyxcbiAgICAgICAgQXJyb3dGdW5jdGlvbkV4cHJlc3Npb246ICdBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbicsXG4gICAgICAgIEF3YWl0RXhwcmVzc2lvbjogJ0F3YWl0RXhwcmVzc2lvbicsIC8vIENBVVRJT046IEl0J3MgZGVmZXJyZWQgdG8gRVM3LlxuICAgICAgICBCbG9ja1N0YXRlbWVudDogJ0Jsb2NrU3RhdGVtZW50JyxcbiAgICAgICAgQmluYXJ5RXhwcmVzc2lvbjogJ0JpbmFyeUV4cHJlc3Npb24nLFxuICAgICAgICBCcmVha1N0YXRlbWVudDogJ0JyZWFrU3RhdGVtZW50JyxcbiAgICAgICAgQ2FsbEV4cHJlc3Npb246ICdDYWxsRXhwcmVzc2lvbicsXG4gICAgICAgIENhdGNoQ2xhdXNlOiAnQ2F0Y2hDbGF1c2UnLFxuICAgICAgICBDbGFzc0JvZHk6ICdDbGFzc0JvZHknLFxuICAgICAgICBDbGFzc0RlY2xhcmF0aW9uOiAnQ2xhc3NEZWNsYXJhdGlvbicsXG4gICAgICAgIENsYXNzRXhwcmVzc2lvbjogJ0NsYXNzRXhwcmVzc2lvbicsXG4gICAgICAgIENvbXByZWhlbnNpb25CbG9jazogJ0NvbXByZWhlbnNpb25CbG9jaycsICAvLyBDQVVUSU9OOiBJdCdzIGRlZmVycmVkIHRvIEVTNy5cbiAgICAgICAgQ29tcHJlaGVuc2lvbkV4cHJlc3Npb246ICdDb21wcmVoZW5zaW9uRXhwcmVzc2lvbicsICAvLyBDQVVUSU9OOiBJdCdzIGRlZmVycmVkIHRvIEVTNy5cbiAgICAgICAgQ29uZGl0aW9uYWxFeHByZXNzaW9uOiAnQ29uZGl0aW9uYWxFeHByZXNzaW9uJyxcbiAgICAgICAgQ29udGludWVTdGF0ZW1lbnQ6ICdDb250aW51ZVN0YXRlbWVudCcsXG4gICAgICAgIERlYnVnZ2VyU3RhdGVtZW50OiAnRGVidWdnZXJTdGF0ZW1lbnQnLFxuICAgICAgICBEaXJlY3RpdmVTdGF0ZW1lbnQ6ICdEaXJlY3RpdmVTdGF0ZW1lbnQnLFxuICAgICAgICBEb1doaWxlU3RhdGVtZW50OiAnRG9XaGlsZVN0YXRlbWVudCcsXG4gICAgICAgIEVtcHR5U3RhdGVtZW50OiAnRW1wdHlTdGF0ZW1lbnQnLFxuICAgICAgICBFeHBvcnRBbGxEZWNsYXJhdGlvbjogJ0V4cG9ydEFsbERlY2xhcmF0aW9uJyxcbiAgICAgICAgRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uOiAnRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uJyxcbiAgICAgICAgRXhwb3J0TmFtZWREZWNsYXJhdGlvbjogJ0V4cG9ydE5hbWVkRGVjbGFyYXRpb24nLFxuICAgICAgICBFeHBvcnRTcGVjaWZpZXI6ICdFeHBvcnRTcGVjaWZpZXInLFxuICAgICAgICBFeHByZXNzaW9uU3RhdGVtZW50OiAnRXhwcmVzc2lvblN0YXRlbWVudCcsXG4gICAgICAgIEZvclN0YXRlbWVudDogJ0ZvclN0YXRlbWVudCcsXG4gICAgICAgIEZvckluU3RhdGVtZW50OiAnRm9ySW5TdGF0ZW1lbnQnLFxuICAgICAgICBGb3JPZlN0YXRlbWVudDogJ0Zvck9mU3RhdGVtZW50JyxcbiAgICAgICAgRnVuY3Rpb25EZWNsYXJhdGlvbjogJ0Z1bmN0aW9uRGVjbGFyYXRpb24nLFxuICAgICAgICBGdW5jdGlvbkV4cHJlc3Npb246ICdGdW5jdGlvbkV4cHJlc3Npb24nLFxuICAgICAgICBHZW5lcmF0b3JFeHByZXNzaW9uOiAnR2VuZXJhdG9yRXhwcmVzc2lvbicsICAvLyBDQVVUSU9OOiBJdCdzIGRlZmVycmVkIHRvIEVTNy5cbiAgICAgICAgSWRlbnRpZmllcjogJ0lkZW50aWZpZXInLFxuICAgICAgICBJZlN0YXRlbWVudDogJ0lmU3RhdGVtZW50JyxcbiAgICAgICAgSW1wb3J0RXhwcmVzc2lvbjogJ0ltcG9ydEV4cHJlc3Npb24nLFxuICAgICAgICBJbXBvcnREZWNsYXJhdGlvbjogJ0ltcG9ydERlY2xhcmF0aW9uJyxcbiAgICAgICAgSW1wb3J0RGVmYXVsdFNwZWNpZmllcjogJ0ltcG9ydERlZmF1bHRTcGVjaWZpZXInLFxuICAgICAgICBJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXI6ICdJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXInLFxuICAgICAgICBJbXBvcnRTcGVjaWZpZXI6ICdJbXBvcnRTcGVjaWZpZXInLFxuICAgICAgICBMaXRlcmFsOiAnTGl0ZXJhbCcsXG4gICAgICAgIExhYmVsZWRTdGF0ZW1lbnQ6ICdMYWJlbGVkU3RhdGVtZW50JyxcbiAgICAgICAgTG9naWNhbEV4cHJlc3Npb246ICdMb2dpY2FsRXhwcmVzc2lvbicsXG4gICAgICAgIE1lbWJlckV4cHJlc3Npb246ICdNZW1iZXJFeHByZXNzaW9uJyxcbiAgICAgICAgTWV0YVByb3BlcnR5OiAnTWV0YVByb3BlcnR5JyxcbiAgICAgICAgTWV0aG9kRGVmaW5pdGlvbjogJ01ldGhvZERlZmluaXRpb24nLFxuICAgICAgICBNb2R1bGVTcGVjaWZpZXI6ICdNb2R1bGVTcGVjaWZpZXInLFxuICAgICAgICBOZXdFeHByZXNzaW9uOiAnTmV3RXhwcmVzc2lvbicsXG4gICAgICAgIE9iamVjdEV4cHJlc3Npb246ICdPYmplY3RFeHByZXNzaW9uJyxcbiAgICAgICAgT2JqZWN0UGF0dGVybjogJ09iamVjdFBhdHRlcm4nLFxuICAgICAgICBQcm9ncmFtOiAnUHJvZ3JhbScsXG4gICAgICAgIFByb3BlcnR5OiAnUHJvcGVydHknLFxuICAgICAgICBSZXN0RWxlbWVudDogJ1Jlc3RFbGVtZW50JyxcbiAgICAgICAgUmV0dXJuU3RhdGVtZW50OiAnUmV0dXJuU3RhdGVtZW50JyxcbiAgICAgICAgU2VxdWVuY2VFeHByZXNzaW9uOiAnU2VxdWVuY2VFeHByZXNzaW9uJyxcbiAgICAgICAgU3ByZWFkRWxlbWVudDogJ1NwcmVhZEVsZW1lbnQnLFxuICAgICAgICBTdXBlcjogJ1N1cGVyJyxcbiAgICAgICAgU3dpdGNoU3RhdGVtZW50OiAnU3dpdGNoU3RhdGVtZW50JyxcbiAgICAgICAgU3dpdGNoQ2FzZTogJ1N3aXRjaENhc2UnLFxuICAgICAgICBUYWdnZWRUZW1wbGF0ZUV4cHJlc3Npb246ICdUYWdnZWRUZW1wbGF0ZUV4cHJlc3Npb24nLFxuICAgICAgICBUZW1wbGF0ZUVsZW1lbnQ6ICdUZW1wbGF0ZUVsZW1lbnQnLFxuICAgICAgICBUZW1wbGF0ZUxpdGVyYWw6ICdUZW1wbGF0ZUxpdGVyYWwnLFxuICAgICAgICBUaGlzRXhwcmVzc2lvbjogJ1RoaXNFeHByZXNzaW9uJyxcbiAgICAgICAgVGhyb3dTdGF0ZW1lbnQ6ICdUaHJvd1N0YXRlbWVudCcsXG4gICAgICAgIFRyeVN0YXRlbWVudDogJ1RyeVN0YXRlbWVudCcsXG4gICAgICAgIFVuYXJ5RXhwcmVzc2lvbjogJ1VuYXJ5RXhwcmVzc2lvbicsXG4gICAgICAgIFVwZGF0ZUV4cHJlc3Npb246ICdVcGRhdGVFeHByZXNzaW9uJyxcbiAgICAgICAgVmFyaWFibGVEZWNsYXJhdGlvbjogJ1ZhcmlhYmxlRGVjbGFyYXRpb24nLFxuICAgICAgICBWYXJpYWJsZURlY2xhcmF0b3I6ICdWYXJpYWJsZURlY2xhcmF0b3InLFxuICAgICAgICBXaGlsZVN0YXRlbWVudDogJ1doaWxlU3RhdGVtZW50JyxcbiAgICAgICAgV2l0aFN0YXRlbWVudDogJ1dpdGhTdGF0ZW1lbnQnLFxuICAgICAgICBZaWVsZEV4cHJlc3Npb246ICdZaWVsZEV4cHJlc3Npb24nXG4gICAgfTtcblxuICAgIFZpc2l0b3JLZXlzID0ge1xuICAgICAgICBBc3NpZ25tZW50RXhwcmVzc2lvbjogWydsZWZ0JywgJ3JpZ2h0J10sXG4gICAgICAgIEFzc2lnbm1lbnRQYXR0ZXJuOiBbJ2xlZnQnLCAncmlnaHQnXSxcbiAgICAgICAgQXJyYXlFeHByZXNzaW9uOiBbJ2VsZW1lbnRzJ10sXG4gICAgICAgIEFycmF5UGF0dGVybjogWydlbGVtZW50cyddLFxuICAgICAgICBBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbjogWydwYXJhbXMnLCAnYm9keSddLFxuICAgICAgICBBd2FpdEV4cHJlc3Npb246IFsnYXJndW1lbnQnXSwgLy8gQ0FVVElPTjogSXQncyBkZWZlcnJlZCB0byBFUzcuXG4gICAgICAgIEJsb2NrU3RhdGVtZW50OiBbJ2JvZHknXSxcbiAgICAgICAgQmluYXJ5RXhwcmVzc2lvbjogWydsZWZ0JywgJ3JpZ2h0J10sXG4gICAgICAgIEJyZWFrU3RhdGVtZW50OiBbJ2xhYmVsJ10sXG4gICAgICAgIENhbGxFeHByZXNzaW9uOiBbJ2NhbGxlZScsICdhcmd1bWVudHMnXSxcbiAgICAgICAgQ2F0Y2hDbGF1c2U6IFsncGFyYW0nLCAnYm9keSddLFxuICAgICAgICBDbGFzc0JvZHk6IFsnYm9keSddLFxuICAgICAgICBDbGFzc0RlY2xhcmF0aW9uOiBbJ2lkJywgJ3N1cGVyQ2xhc3MnLCAnYm9keSddLFxuICAgICAgICBDbGFzc0V4cHJlc3Npb246IFsnaWQnLCAnc3VwZXJDbGFzcycsICdib2R5J10sXG4gICAgICAgIENvbXByZWhlbnNpb25CbG9jazogWydsZWZ0JywgJ3JpZ2h0J10sICAvLyBDQVVUSU9OOiBJdCdzIGRlZmVycmVkIHRvIEVTNy5cbiAgICAgICAgQ29tcHJlaGVuc2lvbkV4cHJlc3Npb246IFsnYmxvY2tzJywgJ2ZpbHRlcicsICdib2R5J10sICAvLyBDQVVUSU9OOiBJdCdzIGRlZmVycmVkIHRvIEVTNy5cbiAgICAgICAgQ29uZGl0aW9uYWxFeHByZXNzaW9uOiBbJ3Rlc3QnLCAnY29uc2VxdWVudCcsICdhbHRlcm5hdGUnXSxcbiAgICAgICAgQ29udGludWVTdGF0ZW1lbnQ6IFsnbGFiZWwnXSxcbiAgICAgICAgRGVidWdnZXJTdGF0ZW1lbnQ6IFtdLFxuICAgICAgICBEaXJlY3RpdmVTdGF0ZW1lbnQ6IFtdLFxuICAgICAgICBEb1doaWxlU3RhdGVtZW50OiBbJ2JvZHknLCAndGVzdCddLFxuICAgICAgICBFbXB0eVN0YXRlbWVudDogW10sXG4gICAgICAgIEV4cG9ydEFsbERlY2xhcmF0aW9uOiBbJ3NvdXJjZSddLFxuICAgICAgICBFeHBvcnREZWZhdWx0RGVjbGFyYXRpb246IFsnZGVjbGFyYXRpb24nXSxcbiAgICAgICAgRXhwb3J0TmFtZWREZWNsYXJhdGlvbjogWydkZWNsYXJhdGlvbicsICdzcGVjaWZpZXJzJywgJ3NvdXJjZSddLFxuICAgICAgICBFeHBvcnRTcGVjaWZpZXI6IFsnZXhwb3J0ZWQnLCAnbG9jYWwnXSxcbiAgICAgICAgRXhwcmVzc2lvblN0YXRlbWVudDogWydleHByZXNzaW9uJ10sXG4gICAgICAgIEZvclN0YXRlbWVudDogWydpbml0JywgJ3Rlc3QnLCAndXBkYXRlJywgJ2JvZHknXSxcbiAgICAgICAgRm9ySW5TdGF0ZW1lbnQ6IFsnbGVmdCcsICdyaWdodCcsICdib2R5J10sXG4gICAgICAgIEZvck9mU3RhdGVtZW50OiBbJ2xlZnQnLCAncmlnaHQnLCAnYm9keSddLFxuICAgICAgICBGdW5jdGlvbkRlY2xhcmF0aW9uOiBbJ2lkJywgJ3BhcmFtcycsICdib2R5J10sXG4gICAgICAgIEZ1bmN0aW9uRXhwcmVzc2lvbjogWydpZCcsICdwYXJhbXMnLCAnYm9keSddLFxuICAgICAgICBHZW5lcmF0b3JFeHByZXNzaW9uOiBbJ2Jsb2NrcycsICdmaWx0ZXInLCAnYm9keSddLCAgLy8gQ0FVVElPTjogSXQncyBkZWZlcnJlZCB0byBFUzcuXG4gICAgICAgIElkZW50aWZpZXI6IFtdLFxuICAgICAgICBJZlN0YXRlbWVudDogWyd0ZXN0JywgJ2NvbnNlcXVlbnQnLCAnYWx0ZXJuYXRlJ10sXG4gICAgICAgIEltcG9ydEV4cHJlc3Npb246IFsnc291cmNlJ10sXG4gICAgICAgIEltcG9ydERlY2xhcmF0aW9uOiBbJ3NwZWNpZmllcnMnLCAnc291cmNlJ10sXG4gICAgICAgIEltcG9ydERlZmF1bHRTcGVjaWZpZXI6IFsnbG9jYWwnXSxcbiAgICAgICAgSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyOiBbJ2xvY2FsJ10sXG4gICAgICAgIEltcG9ydFNwZWNpZmllcjogWydpbXBvcnRlZCcsICdsb2NhbCddLFxuICAgICAgICBMaXRlcmFsOiBbXSxcbiAgICAgICAgTGFiZWxlZFN0YXRlbWVudDogWydsYWJlbCcsICdib2R5J10sXG4gICAgICAgIExvZ2ljYWxFeHByZXNzaW9uOiBbJ2xlZnQnLCAncmlnaHQnXSxcbiAgICAgICAgTWVtYmVyRXhwcmVzc2lvbjogWydvYmplY3QnLCAncHJvcGVydHknXSxcbiAgICAgICAgTWV0YVByb3BlcnR5OiBbJ21ldGEnLCAncHJvcGVydHknXSxcbiAgICAgICAgTWV0aG9kRGVmaW5pdGlvbjogWydrZXknLCAndmFsdWUnXSxcbiAgICAgICAgTW9kdWxlU3BlY2lmaWVyOiBbXSxcbiAgICAgICAgTmV3RXhwcmVzc2lvbjogWydjYWxsZWUnLCAnYXJndW1lbnRzJ10sXG4gICAgICAgIE9iamVjdEV4cHJlc3Npb246IFsncHJvcGVydGllcyddLFxuICAgICAgICBPYmplY3RQYXR0ZXJuOiBbJ3Byb3BlcnRpZXMnXSxcbiAgICAgICAgUHJvZ3JhbTogWydib2R5J10sXG4gICAgICAgIFByb3BlcnR5OiBbJ2tleScsICd2YWx1ZSddLFxuICAgICAgICBSZXN0RWxlbWVudDogWyAnYXJndW1lbnQnIF0sXG4gICAgICAgIFJldHVyblN0YXRlbWVudDogWydhcmd1bWVudCddLFxuICAgICAgICBTZXF1ZW5jZUV4cHJlc3Npb246IFsnZXhwcmVzc2lvbnMnXSxcbiAgICAgICAgU3ByZWFkRWxlbWVudDogWydhcmd1bWVudCddLFxuICAgICAgICBTdXBlcjogW10sXG4gICAgICAgIFN3aXRjaFN0YXRlbWVudDogWydkaXNjcmltaW5hbnQnLCAnY2FzZXMnXSxcbiAgICAgICAgU3dpdGNoQ2FzZTogWyd0ZXN0JywgJ2NvbnNlcXVlbnQnXSxcbiAgICAgICAgVGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uOiBbJ3RhZycsICdxdWFzaSddLFxuICAgICAgICBUZW1wbGF0ZUVsZW1lbnQ6IFtdLFxuICAgICAgICBUZW1wbGF0ZUxpdGVyYWw6IFsncXVhc2lzJywgJ2V4cHJlc3Npb25zJ10sXG4gICAgICAgIFRoaXNFeHByZXNzaW9uOiBbXSxcbiAgICAgICAgVGhyb3dTdGF0ZW1lbnQ6IFsnYXJndW1lbnQnXSxcbiAgICAgICAgVHJ5U3RhdGVtZW50OiBbJ2Jsb2NrJywgJ2hhbmRsZXInLCAnZmluYWxpemVyJ10sXG4gICAgICAgIFVuYXJ5RXhwcmVzc2lvbjogWydhcmd1bWVudCddLFxuICAgICAgICBVcGRhdGVFeHByZXNzaW9uOiBbJ2FyZ3VtZW50J10sXG4gICAgICAgIFZhcmlhYmxlRGVjbGFyYXRpb246IFsnZGVjbGFyYXRpb25zJ10sXG4gICAgICAgIFZhcmlhYmxlRGVjbGFyYXRvcjogWydpZCcsICdpbml0J10sXG4gICAgICAgIFdoaWxlU3RhdGVtZW50OiBbJ3Rlc3QnLCAnYm9keSddLFxuICAgICAgICBXaXRoU3RhdGVtZW50OiBbJ29iamVjdCcsICdib2R5J10sXG4gICAgICAgIFlpZWxkRXhwcmVzc2lvbjogWydhcmd1bWVudCddXG4gICAgfTtcblxuICAgIC8vIHVuaXF1ZSBpZFxuICAgIEJSRUFLID0ge307XG4gICAgU0tJUCA9IHt9O1xuICAgIFJFTU9WRSA9IHt9O1xuXG4gICAgVmlzaXRvck9wdGlvbiA9IHtcbiAgICAgICAgQnJlYWs6IEJSRUFLLFxuICAgICAgICBTa2lwOiBTS0lQLFxuICAgICAgICBSZW1vdmU6IFJFTU9WRVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBSZWZlcmVuY2UocGFyZW50LCBrZXkpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIH1cblxuICAgIFJlZmVyZW5jZS5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIHJlcGxhY2Uobm9kZSkge1xuICAgICAgICB0aGlzLnBhcmVudFt0aGlzLmtleV0gPSBub2RlO1xuICAgIH07XG5cbiAgICBSZWZlcmVuY2UucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5wYXJlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5zcGxpY2UodGhpcy5rZXksIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlcGxhY2UobnVsbCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gRWxlbWVudChub2RlLCBwYXRoLCB3cmFwLCByZWYpIHtcbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgICAgdGhpcy53cmFwID0gd3JhcDtcbiAgICAgICAgdGhpcy5yZWYgPSByZWY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gQ29udHJvbGxlcigpIHsgfVxuXG4gICAgLy8gQVBJOlxuICAgIC8vIHJldHVybiBwcm9wZXJ0eSBwYXRoIGFycmF5IGZyb20gcm9vdCB0byBjdXJyZW50IG5vZGVcbiAgICBDb250cm9sbGVyLnByb3RvdHlwZS5wYXRoID0gZnVuY3Rpb24gcGF0aCgpIHtcbiAgICAgICAgdmFyIGksIGl6LCBqLCBqeiwgcmVzdWx0LCBlbGVtZW50O1xuXG4gICAgICAgIGZ1bmN0aW9uIGFkZFRvUGF0aChyZXN1bHQsIHBhdGgpIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhdGgpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChqID0gMCwganogPSBwYXRoLmxlbmd0aDsgaiA8IGp6OyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocGF0aFtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJvb3Qgbm9kZVxuICAgICAgICBpZiAoIXRoaXMuX19jdXJyZW50LnBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmlyc3Qgbm9kZSBpcyBzZW50aW5lbCwgc2Vjb25kIG5vZGUgaXMgcm9vdCBlbGVtZW50XG4gICAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAyLCBpeiA9IHRoaXMuX19sZWF2ZWxpc3QubGVuZ3RoOyBpIDwgaXo7ICsraSkge1xuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuX19sZWF2ZWxpc3RbaV07XG4gICAgICAgICAgICBhZGRUb1BhdGgocmVzdWx0LCBlbGVtZW50LnBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGFkZFRvUGF0aChyZXN1bHQsIHRoaXMuX19jdXJyZW50LnBhdGgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICAvLyBBUEk6XG4gICAgLy8gcmV0dXJuIHR5cGUgb2YgY3VycmVudCBub2RlXG4gICAgQ29udHJvbGxlci5wcm90b3R5cGUudHlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmN1cnJlbnQoKTtcbiAgICAgICAgcmV0dXJuIG5vZGUudHlwZSB8fCB0aGlzLl9fY3VycmVudC53cmFwO1xuICAgIH07XG5cbiAgICAvLyBBUEk6XG4gICAgLy8gcmV0dXJuIGFycmF5IG9mIHBhcmVudCBlbGVtZW50c1xuICAgIENvbnRyb2xsZXIucHJvdG90eXBlLnBhcmVudHMgPSBmdW5jdGlvbiBwYXJlbnRzKCkge1xuICAgICAgICB2YXIgaSwgaXosIHJlc3VsdDtcblxuICAgICAgICAvLyBmaXJzdCBub2RlIGlzIHNlbnRpbmVsXG4gICAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAxLCBpeiA9IHRoaXMuX19sZWF2ZWxpc3QubGVuZ3RoOyBpIDwgaXo7ICsraSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5fX2xlYXZlbGlzdFtpXS5ub2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIC8vIEFQSTpcbiAgICAvLyByZXR1cm4gY3VycmVudCBub2RlXG4gICAgQ29udHJvbGxlci5wcm90b3R5cGUuY3VycmVudCA9IGZ1bmN0aW9uIGN1cnJlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fY3VycmVudC5ub2RlO1xuICAgIH07XG5cbiAgICBDb250cm9sbGVyLnByb3RvdHlwZS5fX2V4ZWN1dGUgPSBmdW5jdGlvbiBfX2V4ZWN1dGUoY2FsbGJhY2ssIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzLCByZXN1bHQ7XG5cbiAgICAgICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHByZXZpb3VzICA9IHRoaXMuX19jdXJyZW50O1xuICAgICAgICB0aGlzLl9fY3VycmVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX19zdGF0ZSA9IG51bGw7XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2suY2FsbCh0aGlzLCBlbGVtZW50Lm5vZGUsIHRoaXMuX19sZWF2ZWxpc3RbdGhpcy5fX2xlYXZlbGlzdC5sZW5ndGggLSAxXS5ub2RlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fY3VycmVudCA9IHByZXZpb3VzO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIC8vIEFQSTpcbiAgICAvLyBub3RpZnkgY29udHJvbCBza2lwIC8gYnJlYWtcbiAgICBDb250cm9sbGVyLnByb3RvdHlwZS5ub3RpZnkgPSBmdW5jdGlvbiBub3RpZnkoZmxhZykge1xuICAgICAgICB0aGlzLl9fc3RhdGUgPSBmbGFnO1xuICAgIH07XG5cbiAgICAvLyBBUEk6XG4gICAgLy8gc2tpcCBjaGlsZCBub2RlcyBvZiBjdXJyZW50IG5vZGVcbiAgICBDb250cm9sbGVyLnByb3RvdHlwZS5za2lwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5vdGlmeShTS0lQKTtcbiAgICB9O1xuXG4gICAgLy8gQVBJOlxuICAgIC8vIGJyZWFrIHRyYXZlcnNhbHNcbiAgICBDb250cm9sbGVyLnByb3RvdHlwZVsnYnJlYWsnXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5ub3RpZnkoQlJFQUspO1xuICAgIH07XG5cbiAgICAvLyBBUEk6XG4gICAgLy8gcmVtb3ZlIG5vZGVcbiAgICBDb250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubm90aWZ5KFJFTU9WRSk7XG4gICAgfTtcblxuICAgIENvbnRyb2xsZXIucHJvdG90eXBlLl9faW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKHJvb3QsIHZpc2l0b3IpIHtcbiAgICAgICAgdGhpcy52aXNpdG9yID0gdmlzaXRvcjtcbiAgICAgICAgdGhpcy5yb290ID0gcm9vdDtcbiAgICAgICAgdGhpcy5fX3dvcmtsaXN0ID0gW107XG4gICAgICAgIHRoaXMuX19sZWF2ZWxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fX2N1cnJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9fc3RhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLl9fZmFsbGJhY2sgPSBudWxsO1xuICAgICAgICBpZiAodmlzaXRvci5mYWxsYmFjayA9PT0gJ2l0ZXJhdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuX19mYWxsYmFjayA9IE9iamVjdC5rZXlzO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2aXNpdG9yLmZhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLl9fZmFsbGJhY2sgPSB2aXNpdG9yLmZhbGxiYWNrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fX2tleXMgPSBWaXNpdG9yS2V5cztcbiAgICAgICAgaWYgKHZpc2l0b3Iua2V5cykge1xuICAgICAgICAgICAgdGhpcy5fX2tleXMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUodGhpcy5fX2tleXMpLCB2aXNpdG9yLmtleXMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGlzTm9kZShub2RlKSB7XG4gICAgICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZW9mIG5vZGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBub2RlLnR5cGUgPT09ICdzdHJpbmcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzUHJvcGVydHkobm9kZVR5cGUsIGtleSkge1xuICAgICAgICByZXR1cm4gKG5vZGVUeXBlID09PSBTeW50YXguT2JqZWN0RXhwcmVzc2lvbiB8fCBub2RlVHlwZSA9PT0gU3ludGF4Lk9iamVjdFBhdHRlcm4pICYmICdwcm9wZXJ0aWVzJyA9PT0ga2V5O1xuICAgIH1cblxuICAgIENvbnRyb2xsZXIucHJvdG90eXBlLnRyYXZlcnNlID0gZnVuY3Rpb24gdHJhdmVyc2Uocm9vdCwgdmlzaXRvcikge1xuICAgICAgICB2YXIgd29ya2xpc3QsXG4gICAgICAgICAgICBsZWF2ZWxpc3QsXG4gICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgIG5vZGVUeXBlLFxuICAgICAgICAgICAgcmV0LFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgY3VycmVudCxcbiAgICAgICAgICAgIGN1cnJlbnQyLFxuICAgICAgICAgICAgY2FuZGlkYXRlcyxcbiAgICAgICAgICAgIGNhbmRpZGF0ZSxcbiAgICAgICAgICAgIHNlbnRpbmVsO1xuXG4gICAgICAgIHRoaXMuX19pbml0aWFsaXplKHJvb3QsIHZpc2l0b3IpO1xuXG4gICAgICAgIHNlbnRpbmVsID0ge307XG5cbiAgICAgICAgLy8gcmVmZXJlbmNlXG4gICAgICAgIHdvcmtsaXN0ID0gdGhpcy5fX3dvcmtsaXN0O1xuICAgICAgICBsZWF2ZWxpc3QgPSB0aGlzLl9fbGVhdmVsaXN0O1xuXG4gICAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgICAgd29ya2xpc3QucHVzaChuZXcgRWxlbWVudChyb290LCBudWxsLCBudWxsLCBudWxsKSk7XG4gICAgICAgIGxlYXZlbGlzdC5wdXNoKG5ldyBFbGVtZW50KG51bGwsIG51bGwsIG51bGwsIG51bGwpKTtcblxuICAgICAgICB3aGlsZSAod29ya2xpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gd29ya2xpc3QucG9wKCk7XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09PSBzZW50aW5lbCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBsZWF2ZWxpc3QucG9wKCk7XG5cbiAgICAgICAgICAgICAgICByZXQgPSB0aGlzLl9fZXhlY3V0ZSh2aXNpdG9yLmxlYXZlLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9fc3RhdGUgPT09IEJSRUFLIHx8IHJldCA9PT0gQlJFQUspIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZSkge1xuXG4gICAgICAgICAgICAgICAgcmV0ID0gdGhpcy5fX2V4ZWN1dGUodmlzaXRvci5lbnRlciwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fX3N0YXRlID09PSBCUkVBSyB8fCByZXQgPT09IEJSRUFLKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3b3JrbGlzdC5wdXNoKHNlbnRpbmVsKTtcbiAgICAgICAgICAgICAgICBsZWF2ZWxpc3QucHVzaChlbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9fc3RhdGUgPT09IFNLSVAgfHwgcmV0ID09PSBTS0lQKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5vZGUgPSBlbGVtZW50Lm5vZGU7XG4gICAgICAgICAgICAgICAgbm9kZVR5cGUgPSBub2RlLnR5cGUgfHwgZWxlbWVudC53cmFwO1xuICAgICAgICAgICAgICAgIGNhbmRpZGF0ZXMgPSB0aGlzLl9fa2V5c1tub2RlVHlwZV07XG4gICAgICAgICAgICAgICAgaWYgKCFjYW5kaWRhdGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9fZmFsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZXMgPSB0aGlzLl9fZmFsbGJhY2sobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gbm9kZSB0eXBlICcgKyBub2RlVHlwZSArICcuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gY2FuZGlkYXRlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKChjdXJyZW50IC09IDEpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAga2V5ID0gY2FuZGlkYXRlc1tjdXJyZW50XTtcbiAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlID0gbm9kZVtrZXldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbmRpZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjYW5kaWRhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50MiA9IGNhbmRpZGF0ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKGN1cnJlbnQyIC09IDEpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbmRpZGF0ZVtjdXJyZW50Ml0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1Byb3BlcnR5KG5vZGVUeXBlLCBjYW5kaWRhdGVzW2N1cnJlbnRdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gbmV3IEVsZW1lbnQoY2FuZGlkYXRlW2N1cnJlbnQyXSwgW2tleSwgY3VycmVudDJdLCAnUHJvcGVydHknLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzTm9kZShjYW5kaWRhdGVbY3VycmVudDJdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gbmV3IEVsZW1lbnQoY2FuZGlkYXRlW2N1cnJlbnQyXSwgW2tleSwgY3VycmVudDJdLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2xpc3QucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc05vZGUoY2FuZGlkYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2xpc3QucHVzaChuZXcgRWxlbWVudChjYW5kaWRhdGUsIGtleSwgbnVsbCwgbnVsbCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIENvbnRyb2xsZXIucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiByZXBsYWNlKHJvb3QsIHZpc2l0b3IpIHtcbiAgICAgICAgdmFyIHdvcmtsaXN0LFxuICAgICAgICAgICAgbGVhdmVsaXN0LFxuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgIG5vZGVUeXBlLFxuICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgZWxlbWVudCxcbiAgICAgICAgICAgIGN1cnJlbnQsXG4gICAgICAgICAgICBjdXJyZW50MixcbiAgICAgICAgICAgIGNhbmRpZGF0ZXMsXG4gICAgICAgICAgICBjYW5kaWRhdGUsXG4gICAgICAgICAgICBzZW50aW5lbCxcbiAgICAgICAgICAgIG91dGVyLFxuICAgICAgICAgICAga2V5O1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZUVsZW0oZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIGksXG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIG5leHRFbGVtLFxuICAgICAgICAgICAgICAgIHBhcmVudDtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQucmVmLnJlbW92ZSgpKSB7XG4gICAgICAgICAgICAgICAgLy8gV2hlbiB0aGUgcmVmZXJlbmNlIGlzIGFuIGVsZW1lbnQgb2YgYW4gYXJyYXkuXG4gICAgICAgICAgICAgICAga2V5ID0gZWxlbWVudC5yZWYua2V5O1xuICAgICAgICAgICAgICAgIHBhcmVudCA9IGVsZW1lbnQucmVmLnBhcmVudDtcblxuICAgICAgICAgICAgICAgIC8vIElmIHJlbW92ZWQgZnJvbSBhcnJheSwgdGhlbiBkZWNyZWFzZSBmb2xsb3dpbmcgaXRlbXMnIGtleXMuXG4gICAgICAgICAgICAgICAgaSA9IHdvcmtsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRFbGVtID0gd29ya2xpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0RWxlbS5yZWYgJiYgbmV4dEVsZW0ucmVmLnBhcmVudCA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAgKG5leHRFbGVtLnJlZi5rZXkgPCBrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC0tbmV4dEVsZW0ucmVmLmtleTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX19pbml0aWFsaXplKHJvb3QsIHZpc2l0b3IpO1xuXG4gICAgICAgIHNlbnRpbmVsID0ge307XG5cbiAgICAgICAgLy8gcmVmZXJlbmNlXG4gICAgICAgIHdvcmtsaXN0ID0gdGhpcy5fX3dvcmtsaXN0O1xuICAgICAgICBsZWF2ZWxpc3QgPSB0aGlzLl9fbGVhdmVsaXN0O1xuXG4gICAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgICAgb3V0ZXIgPSB7XG4gICAgICAgICAgICByb290OiByb290XG4gICAgICAgIH07XG4gICAgICAgIGVsZW1lbnQgPSBuZXcgRWxlbWVudChyb290LCBudWxsLCBudWxsLCBuZXcgUmVmZXJlbmNlKG91dGVyLCAncm9vdCcpKTtcbiAgICAgICAgd29ya2xpc3QucHVzaChlbGVtZW50KTtcbiAgICAgICAgbGVhdmVsaXN0LnB1c2goZWxlbWVudCk7XG5cbiAgICAgICAgd2hpbGUgKHdvcmtsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbWVudCA9IHdvcmtsaXN0LnBvcCgpO1xuXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PT0gc2VudGluZWwpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gbGVhdmVsaXN0LnBvcCgpO1xuXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGhpcy5fX2V4ZWN1dGUodmlzaXRvci5sZWF2ZSwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBub2RlIG1heSBiZSByZXBsYWNlZCB3aXRoIG51bGwsXG4gICAgICAgICAgICAgICAgLy8gc28gZGlzdGluZ3Vpc2ggYmV0d2VlbiB1bmRlZmluZWQgYW5kIG51bGwgaW4gdGhpcyBwbGFjZVxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgIT09IHVuZGVmaW5lZCAmJiB0YXJnZXQgIT09IEJSRUFLICYmIHRhcmdldCAhPT0gU0tJUCAmJiB0YXJnZXQgIT09IFJFTU9WRSkge1xuICAgICAgICAgICAgICAgICAgICAvLyByZXBsYWNlXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVmLnJlcGxhY2UodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fX3N0YXRlID09PSBSRU1PVkUgfHwgdGFyZ2V0ID09PSBSRU1PVkUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRWxlbShlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fX3N0YXRlID09PSBCUkVBSyB8fCB0YXJnZXQgPT09IEJSRUFLKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvdXRlci5yb290O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGFyZ2V0ID0gdGhpcy5fX2V4ZWN1dGUodmlzaXRvci5lbnRlciwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIC8vIG5vZGUgbWF5IGJlIHJlcGxhY2VkIHdpdGggbnVsbCxcbiAgICAgICAgICAgIC8vIHNvIGRpc3Rpbmd1aXNoIGJldHdlZW4gdW5kZWZpbmVkIGFuZCBudWxsIGluIHRoaXMgcGxhY2VcbiAgICAgICAgICAgIGlmICh0YXJnZXQgIT09IHVuZGVmaW5lZCAmJiB0YXJnZXQgIT09IEJSRUFLICYmIHRhcmdldCAhPT0gU0tJUCAmJiB0YXJnZXQgIT09IFJFTU9WRSkge1xuICAgICAgICAgICAgICAgIC8vIHJlcGxhY2VcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlZi5yZXBsYWNlKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5ub2RlID0gdGFyZ2V0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fX3N0YXRlID09PSBSRU1PVkUgfHwgdGFyZ2V0ID09PSBSRU1PVkUpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVFbGVtKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQubm9kZSA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9fc3RhdGUgPT09IEJSRUFLIHx8IHRhcmdldCA9PT0gQlJFQUspIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0ZXIucm9vdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbm9kZSBtYXkgYmUgbnVsbFxuICAgICAgICAgICAgbm9kZSA9IGVsZW1lbnQubm9kZTtcbiAgICAgICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3b3JrbGlzdC5wdXNoKHNlbnRpbmVsKTtcbiAgICAgICAgICAgIGxlYXZlbGlzdC5wdXNoKGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fX3N0YXRlID09PSBTS0lQIHx8IHRhcmdldCA9PT0gU0tJUCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBub2RlVHlwZSA9IG5vZGUudHlwZSB8fCBlbGVtZW50LndyYXA7XG4gICAgICAgICAgICBjYW5kaWRhdGVzID0gdGhpcy5fX2tleXNbbm9kZVR5cGVdO1xuICAgICAgICAgICAgaWYgKCFjYW5kaWRhdGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX19mYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVzID0gdGhpcy5fX2ZhbGxiYWNrKG5vZGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBub2RlIHR5cGUgJyArIG5vZGVUeXBlICsgJy4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnJlbnQgPSBjYW5kaWRhdGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICgoY3VycmVudCAtPSAxKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAga2V5ID0gY2FuZGlkYXRlc1tjdXJyZW50XTtcbiAgICAgICAgICAgICAgICBjYW5kaWRhdGUgPSBub2RlW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKCFjYW5kaWRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2FuZGlkYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50MiA9IGNhbmRpZGF0ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgoY3VycmVudDIgLT0gMSkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjYW5kaWRhdGVbY3VycmVudDJdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNQcm9wZXJ0eShub2RlVHlwZSwgY2FuZGlkYXRlc1tjdXJyZW50XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gbmV3IEVsZW1lbnQoY2FuZGlkYXRlW2N1cnJlbnQyXSwgW2tleSwgY3VycmVudDJdLCAnUHJvcGVydHknLCBuZXcgUmVmZXJlbmNlKGNhbmRpZGF0ZSwgY3VycmVudDIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNOb2RlKGNhbmRpZGF0ZVtjdXJyZW50Ml0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IG5ldyBFbGVtZW50KGNhbmRpZGF0ZVtjdXJyZW50Ml0sIFtrZXksIGN1cnJlbnQyXSwgbnVsbCwgbmV3IFJlZmVyZW5jZShjYW5kaWRhdGUsIGN1cnJlbnQyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2xpc3QucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNOb2RlKGNhbmRpZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgd29ya2xpc3QucHVzaChuZXcgRWxlbWVudChjYW5kaWRhdGUsIGtleSwgbnVsbCwgbmV3IFJlZmVyZW5jZShub2RlLCBrZXkpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dGVyLnJvb3Q7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHRyYXZlcnNlKHJvb3QsIHZpc2l0b3IpIHtcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcigpO1xuICAgICAgICByZXR1cm4gY29udHJvbGxlci50cmF2ZXJzZShyb290LCB2aXNpdG9yKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXBsYWNlKHJvb3QsIHZpc2l0b3IpIHtcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcigpO1xuICAgICAgICByZXR1cm4gY29udHJvbGxlci5yZXBsYWNlKHJvb3QsIHZpc2l0b3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZENvbW1lbnRSYW5nZShjb21tZW50LCB0b2tlbnMpIHtcbiAgICAgICAgdmFyIHRhcmdldDtcblxuICAgICAgICB0YXJnZXQgPSB1cHBlckJvdW5kKHRva2VucywgZnVuY3Rpb24gc2VhcmNoKHRva2VuKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW4ucmFuZ2VbMF0gPiBjb21tZW50LnJhbmdlWzBdO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb21tZW50LmV4dGVuZGVkUmFuZ2UgPSBbY29tbWVudC5yYW5nZVswXSwgY29tbWVudC5yYW5nZVsxXV07XG5cbiAgICAgICAgaWYgKHRhcmdldCAhPT0gdG9rZW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgY29tbWVudC5leHRlbmRlZFJhbmdlWzFdID0gdG9rZW5zW3RhcmdldF0ucmFuZ2VbMF07XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXQgLT0gMTtcbiAgICAgICAgaWYgKHRhcmdldCA+PSAwKSB7XG4gICAgICAgICAgICBjb21tZW50LmV4dGVuZGVkUmFuZ2VbMF0gPSB0b2tlbnNbdGFyZ2V0XS5yYW5nZVsxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21tZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGF0dGFjaENvbW1lbnRzKHRyZWUsIHByb3ZpZGVkQ29tbWVudHMsIHRva2Vucykge1xuICAgICAgICAvLyBBdCBmaXJzdCwgd2Ugc2hvdWxkIGNhbGN1bGF0ZSBleHRlbmRlZCBjb21tZW50IHJhbmdlcy5cbiAgICAgICAgdmFyIGNvbW1lbnRzID0gW10sIGNvbW1lbnQsIGxlbiwgaSwgY3Vyc29yO1xuXG4gICAgICAgIGlmICghdHJlZS5yYW5nZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhdHRhY2hDb21tZW50cyBuZWVkcyByYW5nZSBpbmZvcm1hdGlvbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdG9rZW5zIGFycmF5IGlzIGVtcHR5LCB3ZSBhdHRhY2ggY29tbWVudHMgdG8gdHJlZSBhcyAnbGVhZGluZ0NvbW1lbnRzJ1xuICAgICAgICBpZiAoIXRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChwcm92aWRlZENvbW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHByb3ZpZGVkQ29tbWVudHMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudCA9IGRlZXBDb3B5KHByb3ZpZGVkQ29tbWVudHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICBjb21tZW50LmV4dGVuZGVkUmFuZ2UgPSBbMCwgdHJlZS5yYW5nZVswXV07XG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRzLnB1c2goY29tbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRyZWUubGVhZGluZ0NvbW1lbnRzID0gY29tbWVudHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJlZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHByb3ZpZGVkQ29tbWVudHMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbW1lbnRzLnB1c2goZXh0ZW5kQ29tbWVudFJhbmdlKGRlZXBDb3B5KHByb3ZpZGVkQ29tbWVudHNbaV0pLCB0b2tlbnMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoaXMgaXMgYmFzZWQgb24gSm9obiBGcmVlbWFuJ3MgaW1wbGVtZW50YXRpb24uXG4gICAgICAgIGN1cnNvciA9IDA7XG4gICAgICAgIHRyYXZlcnNlKHRyZWUsIHtcbiAgICAgICAgICAgIGVudGVyOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciBjb21tZW50O1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKGN1cnNvciA8IGNvbW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb21tZW50ID0gY29tbWVudHNbY3Vyc29yXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbW1lbnQuZXh0ZW5kZWRSYW5nZVsxXSA+IG5vZGUucmFuZ2VbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbW1lbnQuZXh0ZW5kZWRSYW5nZVsxXSA9PT0gbm9kZS5yYW5nZVswXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFub2RlLmxlYWRpbmdDb21tZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUubGVhZGluZ0NvbW1lbnRzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmxlYWRpbmdDb21tZW50cy5wdXNoKGNvbW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudHMuc3BsaWNlKGN1cnNvciwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGFscmVhZHkgb3V0IG9mIG93bmVkIG5vZGVcbiAgICAgICAgICAgICAgICBpZiAoY3Vyc29yID09PSBjb21tZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZpc2l0b3JPcHRpb24uQnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbW1lbnRzW2N1cnNvcl0uZXh0ZW5kZWRSYW5nZVswXSA+IG5vZGUucmFuZ2VbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZpc2l0b3JPcHRpb24uU2tpcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGN1cnNvciA9IDA7XG4gICAgICAgIHRyYXZlcnNlKHRyZWUsIHtcbiAgICAgICAgICAgIGxlYXZlOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciBjb21tZW50O1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKGN1cnNvciA8IGNvbW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb21tZW50ID0gY29tbWVudHNbY3Vyc29yXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUucmFuZ2VbMV0gPCBjb21tZW50LmV4dGVuZGVkUmFuZ2VbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUucmFuZ2VbMV0gPT09IGNvbW1lbnQuZXh0ZW5kZWRSYW5nZVswXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFub2RlLnRyYWlsaW5nQ29tbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnRyYWlsaW5nQ29tbWVudHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUudHJhaWxpbmdDb21tZW50cy5wdXNoKGNvbW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudHMuc3BsaWNlKGN1cnNvciwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGFscmVhZHkgb3V0IG9mIG93bmVkIG5vZGVcbiAgICAgICAgICAgICAgICBpZiAoY3Vyc29yID09PSBjb21tZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZpc2l0b3JPcHRpb24uQnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbW1lbnRzW2N1cnNvcl0uZXh0ZW5kZWRSYW5nZVswXSA+IG5vZGUucmFuZ2VbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZpc2l0b3JPcHRpb24uU2tpcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0cmVlO1xuICAgIH1cblxuICAgIGV4cG9ydHMudmVyc2lvbiA9IHJlcXVpcmUoJy4vcGFja2FnZS5qc29uJykudmVyc2lvbjtcbiAgICBleHBvcnRzLlN5bnRheCA9IFN5bnRheDtcbiAgICBleHBvcnRzLnRyYXZlcnNlID0gdHJhdmVyc2U7XG4gICAgZXhwb3J0cy5yZXBsYWNlID0gcmVwbGFjZTtcbiAgICBleHBvcnRzLmF0dGFjaENvbW1lbnRzID0gYXR0YWNoQ29tbWVudHM7XG4gICAgZXhwb3J0cy5WaXNpdG9yS2V5cyA9IFZpc2l0b3JLZXlzO1xuICAgIGV4cG9ydHMuVmlzaXRvck9wdGlvbiA9IFZpc2l0b3JPcHRpb247XG4gICAgZXhwb3J0cy5Db250cm9sbGVyID0gQ29udHJvbGxlcjtcbiAgICBleHBvcnRzLmNsb25lRW52aXJvbm1lbnQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBjbG9uZSh7fSk7IH07XG5cbiAgICByZXR1cm4gZXhwb3J0cztcbn0oZXhwb3J0cykpO1xuLyogdmltOiBzZXQgc3c9NCB0cz00IGV0IHR3PTgwIDogKi9cbiJdLCJzb3VyY2VSb290IjoiIn0=