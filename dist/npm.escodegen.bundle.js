(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.escodegen"],{

/***/ "aMAw":
/*!*********************************************!*\
  !*** ./node_modules/escodegen/escodegen.js ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*
  Copyright (C) 2012-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2015 Ingvar Stepanyan <me@rreverser.com>
  Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>
  Copyright (C) 2012-2013 Michael Ficarra <escodegen.copyright@michael.ficarra.me>
  Copyright (C) 2012-2013 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2013 Irakli Gozalishvili <rfobic@gmail.com>
  Copyright (C) 2012 Robert Gust-Bardon <donate@robert.gust-bardon.org>
  Copyright (C) 2012 John Freeman <jfreeman08@gmail.com>
  Copyright (C) 2011-2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>

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

/*global exports:true, require:true, global:true*/
(function () {
    'use strict';

    var Syntax,
        Precedence,
        BinaryPrecedence,
        SourceNode,
        estraverse,
        esutils,
        base,
        indent,
        json,
        renumber,
        hexadecimal,
        quotes,
        escapeless,
        newline,
        space,
        parentheses,
        semicolons,
        safeConcatenation,
        directive,
        extra,
        parse,
        sourceMap,
        sourceCode,
        preserveBlankLines,
        FORMAT_MINIFY,
        FORMAT_DEFAULTS;

    estraverse = __webpack_require__(/*! estraverse */ "sR6L");
    esutils = __webpack_require__(/*! esutils */ "cqG1");

    Syntax = estraverse.Syntax;

    // Generation is done by generateExpression.
    function isExpression(node) {
        return CodeGenerator.Expression.hasOwnProperty(node.type);
    }

    // Generation is done by generateStatement.
    function isStatement(node) {
        return CodeGenerator.Statement.hasOwnProperty(node.type);
    }

    Precedence = {
        Sequence: 0,
        Yield: 1,
        Assignment: 1,
        Conditional: 2,
        ArrowFunction: 2,
        LogicalOR: 3,
        LogicalAND: 4,
        BitwiseOR: 5,
        BitwiseXOR: 6,
        BitwiseAND: 7,
        Equality: 8,
        Relational: 9,
        BitwiseSHIFT: 10,
        Additive: 11,
        Multiplicative: 12,
        Await: 13,
        Unary: 13,
        Postfix: 14,
        Call: 15,
        New: 16,
        TaggedTemplate: 17,
        Member: 18,
        Primary: 19
    };

    BinaryPrecedence = {
        '||': Precedence.LogicalOR,
        '&&': Precedence.LogicalAND,
        '|': Precedence.BitwiseOR,
        '^': Precedence.BitwiseXOR,
        '&': Precedence.BitwiseAND,
        '==': Precedence.Equality,
        '!=': Precedence.Equality,
        '===': Precedence.Equality,
        '!==': Precedence.Equality,
        'is': Precedence.Equality,
        'isnt': Precedence.Equality,
        '<': Precedence.Relational,
        '>': Precedence.Relational,
        '<=': Precedence.Relational,
        '>=': Precedence.Relational,
        'in': Precedence.Relational,
        'instanceof': Precedence.Relational,
        '<<': Precedence.BitwiseSHIFT,
        '>>': Precedence.BitwiseSHIFT,
        '>>>': Precedence.BitwiseSHIFT,
        '+': Precedence.Additive,
        '-': Precedence.Additive,
        '*': Precedence.Multiplicative,
        '%': Precedence.Multiplicative,
        '/': Precedence.Multiplicative
    };

    //Flags
    var F_ALLOW_IN = 1,
        F_ALLOW_CALL = 1 << 1,
        F_ALLOW_UNPARATH_NEW = 1 << 2,
        F_FUNC_BODY = 1 << 3,
        F_DIRECTIVE_CTX = 1 << 4,
        F_SEMICOLON_OPT = 1 << 5;

    //Expression flag sets
    //NOTE: Flag order:
    // F_ALLOW_IN
    // F_ALLOW_CALL
    // F_ALLOW_UNPARATH_NEW
    var E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
        E_TTF = F_ALLOW_IN | F_ALLOW_CALL,
        E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
        E_TFF = F_ALLOW_IN,
        E_FFT = F_ALLOW_UNPARATH_NEW,
        E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW;

    //Statement flag sets
    //NOTE: Flag order:
    // F_ALLOW_IN
    // F_FUNC_BODY
    // F_DIRECTIVE_CTX
    // F_SEMICOLON_OPT
    var S_TFFF = F_ALLOW_IN,
        S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT,
        S_FFFF = 0x00,
        S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX,
        S_TTFF = F_ALLOW_IN | F_FUNC_BODY;

    function getDefaultOptions() {
        // default options
        return {
            indent: null,
            base: null,
            parse: null,
            comment: false,
            format: {
                indent: {
                    style: '    ',
                    base: 0,
                    adjustMultilineComment: false
                },
                newline: '\n',
                space: ' ',
                json: false,
                renumber: false,
                hexadecimal: false,
                quotes: 'single',
                escapeless: false,
                compact: false,
                parentheses: true,
                semicolons: true,
                safeConcatenation: false,
                preserveBlankLines: false
            },
            moz: {
                comprehensionExpressionStartsWithAssignment: false,
                starlessGenerator: false
            },
            sourceMap: null,
            sourceMapRoot: null,
            sourceMapWithCode: false,
            directive: false,
            raw: true,
            verbatim: null,
            sourceCode: null
        };
    }

    function stringRepeat(str, num) {
        var result = '';

        for (num |= 0; num > 0; num >>>= 1, str += str) {
            if (num & 1) {
                result += str;
            }
        }

        return result;
    }

    function hasLineTerminator(str) {
        return (/[\r\n]/g).test(str);
    }

    function endsWithLineTerminator(str) {
        var len = str.length;
        return len && esutils.code.isLineTerminator(str.charCodeAt(len - 1));
    }

    function merge(target, override) {
        var key;
        for (key in override) {
            if (override.hasOwnProperty(key)) {
                target[key] = override[key];
            }
        }
        return target;
    }

    function updateDeeply(target, override) {
        var key, val;

        function isHashObject(target) {
            return typeof target === 'object' && target instanceof Object && !(target instanceof RegExp);
        }

        for (key in override) {
            if (override.hasOwnProperty(key)) {
                val = override[key];
                if (isHashObject(val)) {
                    if (isHashObject(target[key])) {
                        updateDeeply(target[key], val);
                    } else {
                        target[key] = updateDeeply({}, val);
                    }
                } else {
                    target[key] = val;
                }
            }
        }
        return target;
    }

    function generateNumber(value) {
        var result, point, temp, exponent, pos;

        if (value !== value) {
            throw new Error('Numeric literal whose value is NaN');
        }
        if (value < 0 || (value === 0 && 1 / value < 0)) {
            throw new Error('Numeric literal whose value is negative');
        }

        if (value === 1 / 0) {
            return json ? 'null' : renumber ? '1e400' : '1e+400';
        }

        result = '' + value;
        if (!renumber || result.length < 3) {
            return result;
        }

        point = result.indexOf('.');
        if (!json && result.charCodeAt(0) === 0x30  /* 0 */ && point === 1) {
            point = 0;
            result = result.slice(1);
        }
        temp = result;
        result = result.replace('e+', 'e');
        exponent = 0;
        if ((pos = temp.indexOf('e')) > 0) {
            exponent = +temp.slice(pos + 1);
            temp = temp.slice(0, pos);
        }
        if (point >= 0) {
            exponent -= temp.length - point - 1;
            temp = +(temp.slice(0, point) + temp.slice(point + 1)) + '';
        }
        pos = 0;
        while (temp.charCodeAt(temp.length + pos - 1) === 0x30  /* 0 */) {
            --pos;
        }
        if (pos !== 0) {
            exponent -= pos;
            temp = temp.slice(0, pos);
        }
        if (exponent !== 0) {
            temp += 'e' + exponent;
        }
        if ((temp.length < result.length ||
                    (hexadecimal && value > 1e12 && Math.floor(value) === value && (temp = '0x' + value.toString(16)).length < result.length)) &&
                +temp === value) {
            result = temp;
        }

        return result;
    }

    // Generate valid RegExp expression.
    // This function is based on https://github.com/Constellation/iv Engine

    function escapeRegExpCharacter(ch, previousIsBackslash) {
        // not handling '\' and handling \u2028 or \u2029 to unicode escape sequence
        if ((ch & ~1) === 0x2028) {
            return (previousIsBackslash ? 'u' : '\\u') + ((ch === 0x2028) ? '2028' : '2029');
        } else if (ch === 10 || ch === 13) {  // \n, \r
            return (previousIsBackslash ? '' : '\\') + ((ch === 10) ? 'n' : 'r');
        }
        return String.fromCharCode(ch);
    }

    function generateRegExp(reg) {
        var match, result, flags, i, iz, ch, characterInBrack, previousIsBackslash;

        result = reg.toString();

        if (reg.source) {
            // extract flag from toString result
            match = result.match(/\/([^/]*)$/);
            if (!match) {
                return result;
            }

            flags = match[1];
            result = '';

            characterInBrack = false;
            previousIsBackslash = false;
            for (i = 0, iz = reg.source.length; i < iz; ++i) {
                ch = reg.source.charCodeAt(i);

                if (!previousIsBackslash) {
                    if (characterInBrack) {
                        if (ch === 93) {  // ]
                            characterInBrack = false;
                        }
                    } else {
                        if (ch === 47) {  // /
                            result += '\\';
                        } else if (ch === 91) {  // [
                            characterInBrack = true;
                        }
                    }
                    result += escapeRegExpCharacter(ch, previousIsBackslash);
                    previousIsBackslash = ch === 92;  // \
                } else {
                    // if new RegExp("\\\n') is provided, create /\n/
                    result += escapeRegExpCharacter(ch, previousIsBackslash);
                    // prevent like /\\[/]/
                    previousIsBackslash = false;
                }
            }

            return '/' + result + '/' + flags;
        }

        return result;
    }

    function escapeAllowedCharacter(code, next) {
        var hex;

        if (code === 0x08  /* \b */) {
            return '\\b';
        }

        if (code === 0x0C  /* \f */) {
            return '\\f';
        }

        if (code === 0x09  /* \t */) {
            return '\\t';
        }

        hex = code.toString(16).toUpperCase();
        if (json || code > 0xFF) {
            return '\\u' + '0000'.slice(hex.length) + hex;
        } else if (code === 0x0000 && !esutils.code.isDecimalDigit(next)) {
            return '\\0';
        } else if (code === 0x000B  /* \v */) { // '\v'
            return '\\x0B';
        } else {
            return '\\x' + '00'.slice(hex.length) + hex;
        }
    }

    function escapeDisallowedCharacter(code) {
        if (code === 0x5C  /* \ */) {
            return '\\\\';
        }

        if (code === 0x0A  /* \n */) {
            return '\\n';
        }

        if (code === 0x0D  /* \r */) {
            return '\\r';
        }

        if (code === 0x2028) {
            return '\\u2028';
        }

        if (code === 0x2029) {
            return '\\u2029';
        }

        throw new Error('Incorrectly classified character');
    }

    function escapeDirective(str) {
        var i, iz, code, quote;

        quote = quotes === 'double' ? '"' : '\'';
        for (i = 0, iz = str.length; i < iz; ++i) {
            code = str.charCodeAt(i);
            if (code === 0x27  /* ' */) {
                quote = '"';
                break;
            } else if (code === 0x22  /* " */) {
                quote = '\'';
                break;
            } else if (code === 0x5C  /* \ */) {
                ++i;
            }
        }

        return quote + str + quote;
    }

    function escapeString(str) {
        var result = '', i, len, code, singleQuotes = 0, doubleQuotes = 0, single, quote;

        for (i = 0, len = str.length; i < len; ++i) {
            code = str.charCodeAt(i);
            if (code === 0x27  /* ' */) {
                ++singleQuotes;
            } else if (code === 0x22  /* " */) {
                ++doubleQuotes;
            } else if (code === 0x2F  /* / */ && json) {
                result += '\\';
            } else if (esutils.code.isLineTerminator(code) || code === 0x5C  /* \ */) {
                result += escapeDisallowedCharacter(code);
                continue;
            } else if (!esutils.code.isIdentifierPartES5(code) && (json && code < 0x20  /* SP */ || !json && !escapeless && (code < 0x20  /* SP */ || code > 0x7E  /* ~ */))) {
                result += escapeAllowedCharacter(code, str.charCodeAt(i + 1));
                continue;
            }
            result += String.fromCharCode(code);
        }

        single = !(quotes === 'double' || (quotes === 'auto' && doubleQuotes < singleQuotes));
        quote = single ? '\'' : '"';

        if (!(single ? singleQuotes : doubleQuotes)) {
            return quote + result + quote;
        }

        str = result;
        result = quote;

        for (i = 0, len = str.length; i < len; ++i) {
            code = str.charCodeAt(i);
            if ((code === 0x27  /* ' */ && single) || (code === 0x22  /* " */ && !single)) {
                result += '\\';
            }
            result += String.fromCharCode(code);
        }

        return result + quote;
    }

    /**
     * flatten an array to a string, where the array can contain
     * either strings or nested arrays
     */
    function flattenToString(arr) {
        var i, iz, elem, result = '';
        for (i = 0, iz = arr.length; i < iz; ++i) {
            elem = arr[i];
            result += Array.isArray(elem) ? flattenToString(elem) : elem;
        }
        return result;
    }

    /**
     * convert generated to a SourceNode when source maps are enabled.
     */
    function toSourceNodeWhenNeeded(generated, node) {
        if (!sourceMap) {
            // with no source maps, generated is either an
            // array or a string.  if an array, flatten it.
            // if a string, just return it
            if (Array.isArray(generated)) {
                return flattenToString(generated);
            } else {
                return generated;
            }
        }
        if (node == null) {
            if (generated instanceof SourceNode) {
                return generated;
            } else {
                node = {};
            }
        }
        if (node.loc == null) {
            return new SourceNode(null, null, sourceMap, generated, node.name || null);
        }
        return new SourceNode(node.loc.start.line, node.loc.start.column, (sourceMap === true ? node.loc.source || null : sourceMap), generated, node.name || null);
    }

    function noEmptySpace() {
        return (space) ? space : ' ';
    }

    function join(left, right) {
        var leftSource,
            rightSource,
            leftCharCode,
            rightCharCode;

        leftSource = toSourceNodeWhenNeeded(left).toString();
        if (leftSource.length === 0) {
            return [right];
        }

        rightSource = toSourceNodeWhenNeeded(right).toString();
        if (rightSource.length === 0) {
            return [left];
        }

        leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
        rightCharCode = rightSource.charCodeAt(0);

        if ((leftCharCode === 0x2B  /* + */ || leftCharCode === 0x2D  /* - */) && leftCharCode === rightCharCode ||
            esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode) ||
            leftCharCode === 0x2F  /* / */ && rightCharCode === 0x69  /* i */) { // infix word operators all start with `i`
            return [left, noEmptySpace(), right];
        } else if (esutils.code.isWhiteSpace(leftCharCode) || esutils.code.isLineTerminator(leftCharCode) ||
                esutils.code.isWhiteSpace(rightCharCode) || esutils.code.isLineTerminator(rightCharCode)) {
            return [left, right];
        }
        return [left, space, right];
    }

    function addIndent(stmt) {
        return [base, stmt];
    }

    function withIndent(fn) {
        var previousBase;
        previousBase = base;
        base += indent;
        fn(base);
        base = previousBase;
    }

    function calculateSpaces(str) {
        var i;
        for (i = str.length - 1; i >= 0; --i) {
            if (esutils.code.isLineTerminator(str.charCodeAt(i))) {
                break;
            }
        }
        return (str.length - 1) - i;
    }

    function adjustMultilineComment(value, specialBase) {
        var array, i, len, line, j, spaces, previousBase, sn;

        array = value.split(/\r\n|[\r\n]/);
        spaces = Number.MAX_VALUE;

        // first line doesn't have indentation
        for (i = 1, len = array.length; i < len; ++i) {
            line = array[i];
            j = 0;
            while (j < line.length && esutils.code.isWhiteSpace(line.charCodeAt(j))) {
                ++j;
            }
            if (spaces > j) {
                spaces = j;
            }
        }

        if (typeof specialBase !== 'undefined') {
            // pattern like
            // {
            //   var t = 20;  /*
            //                 * this is comment
            //                 */
            // }
            previousBase = base;
            if (array[1][spaces] === '*') {
                specialBase += ' ';
            }
            base = specialBase;
        } else {
            if (spaces & 1) {
                // /*
                //  *
                //  */
                // If spaces are odd number, above pattern is considered.
                // We waste 1 space.
                --spaces;
            }
            previousBase = base;
        }

        for (i = 1, len = array.length; i < len; ++i) {
            sn = toSourceNodeWhenNeeded(addIndent(array[i].slice(spaces)));
            array[i] = sourceMap ? sn.join('') : sn;
        }

        base = previousBase;

        return array.join('\n');
    }

    function generateComment(comment, specialBase) {
        if (comment.type === 'Line') {
            if (endsWithLineTerminator(comment.value)) {
                return '//' + comment.value;
            } else {
                // Always use LineTerminator
                var result = '//' + comment.value;
                if (!preserveBlankLines) {
                    result += '\n';
                }
                return result;
            }
        }
        if (extra.format.indent.adjustMultilineComment && /[\n\r]/.test(comment.value)) {
            return adjustMultilineComment('/*' + comment.value + '*/', specialBase);
        }
        return '/*' + comment.value + '*/';
    }

    function addComments(stmt, result) {
        var i, len, comment, save, tailingToStatement, specialBase, fragment,
            extRange, range, prevRange, prefix, infix, suffix, count;

        if (stmt.leadingComments && stmt.leadingComments.length > 0) {
            save = result;

            if (preserveBlankLines) {
                comment = stmt.leadingComments[0];
                result = [];

                extRange = comment.extendedRange;
                range = comment.range;

                prefix = sourceCode.substring(extRange[0], range[0]);
                count = (prefix.match(/\n/g) || []).length;
                if (count > 0) {
                    result.push(stringRepeat('\n', count));
                    result.push(addIndent(generateComment(comment)));
                } else {
                    result.push(prefix);
                    result.push(generateComment(comment));
                }

                prevRange = range;

                for (i = 1, len = stmt.leadingComments.length; i < len; i++) {
                    comment = stmt.leadingComments[i];
                    range = comment.range;

                    infix = sourceCode.substring(prevRange[1], range[0]);
                    count = (infix.match(/\n/g) || []).length;
                    result.push(stringRepeat('\n', count));
                    result.push(addIndent(generateComment(comment)));

                    prevRange = range;
                }

                suffix = sourceCode.substring(range[1], extRange[1]);
                count = (suffix.match(/\n/g) || []).length;
                result.push(stringRepeat('\n', count));
            } else {
                comment = stmt.leadingComments[0];
                result = [];
                if (safeConcatenation && stmt.type === Syntax.Program && stmt.body.length === 0) {
                    result.push('\n');
                }
                result.push(generateComment(comment));
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result.push('\n');
                }

                for (i = 1, len = stmt.leadingComments.length; i < len; ++i) {
                    comment = stmt.leadingComments[i];
                    fragment = [generateComment(comment)];
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        fragment.push('\n');
                    }
                    result.push(addIndent(fragment));
                }
            }

            result.push(addIndent(save));
        }

        if (stmt.trailingComments) {

            if (preserveBlankLines) {
                comment = stmt.trailingComments[0];
                extRange = comment.extendedRange;
                range = comment.range;

                prefix = sourceCode.substring(extRange[0], range[0]);
                count = (prefix.match(/\n/g) || []).length;

                if (count > 0) {
                    result.push(stringRepeat('\n', count));
                    result.push(addIndent(generateComment(comment)));
                } else {
                    result.push(prefix);
                    result.push(generateComment(comment));
                }
            } else {
                tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
                specialBase = stringRepeat(' ', calculateSpaces(toSourceNodeWhenNeeded([base, result, indent]).toString()));
                for (i = 0, len = stmt.trailingComments.length; i < len; ++i) {
                    comment = stmt.trailingComments[i];
                    if (tailingToStatement) {
                        // We assume target like following script
                        //
                        // var t = 20;  /**
                        //               * This is comment of t
                        //               */
                        if (i === 0) {
                            // first case
                            result = [result, indent];
                        } else {
                            result = [result, specialBase];
                        }
                        result.push(generateComment(comment, specialBase));
                    } else {
                        result = [result, addIndent(generateComment(comment))];
                    }
                    if (i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                        result = [result, '\n'];
                    }
                }
            }
        }

        return result;
    }

    function generateBlankLines(start, end, result) {
        var j, newlineCount = 0;

        for (j = start; j < end; j++) {
            if (sourceCode[j] === '\n') {
                newlineCount++;
            }
        }

        for (j = 1; j < newlineCount; j++) {
            result.push(newline);
        }
    }

    function parenthesize(text, current, should) {
        if (current < should) {
            return ['(', text, ')'];
        }
        return text;
    }

    function generateVerbatimString(string) {
        var i, iz, result;
        result = string.split(/\r\n|\n/);
        for (i = 1, iz = result.length; i < iz; i++) {
            result[i] = newline + base + result[i];
        }
        return result;
    }

    function generateVerbatim(expr, precedence) {
        var verbatim, result, prec;
        verbatim = expr[extra.verbatim];

        if (typeof verbatim === 'string') {
            result = parenthesize(generateVerbatimString(verbatim), Precedence.Sequence, precedence);
        } else {
            // verbatim is object
            result = generateVerbatimString(verbatim.content);
            prec = (verbatim.precedence != null) ? verbatim.precedence : Precedence.Sequence;
            result = parenthesize(result, prec, precedence);
        }

        return toSourceNodeWhenNeeded(result, expr);
    }

    function CodeGenerator() {
    }

    // Helpers.

    CodeGenerator.prototype.maybeBlock = function(stmt, flags) {
        var result, noLeadingComment, that = this;

        noLeadingComment = !extra.comment || !stmt.leadingComments;

        if (stmt.type === Syntax.BlockStatement && noLeadingComment) {
            return [space, this.generateStatement(stmt, flags)];
        }

        if (stmt.type === Syntax.EmptyStatement && noLeadingComment) {
            return ';';
        }

        withIndent(function () {
            result = [
                newline,
                addIndent(that.generateStatement(stmt, flags))
            ];
        });

        return result;
    };

    CodeGenerator.prototype.maybeBlockSuffix = function (stmt, result) {
        var ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
        if (stmt.type === Syntax.BlockStatement && (!extra.comment || !stmt.leadingComments) && !ends) {
            return [result, space];
        }
        if (ends) {
            return [result, base];
        }
        return [result, newline, base];
    };

    function generateIdentifier(node) {
        return toSourceNodeWhenNeeded(node.name, node);
    }

    function generateAsyncPrefix(node, spaceRequired) {
        return node.async ? 'async' + (spaceRequired ? noEmptySpace() : space) : '';
    }

    function generateStarSuffix(node) {
        var isGenerator = node.generator && !extra.moz.starlessGenerator;
        return isGenerator ? '*' + space : '';
    }

    function generateMethodPrefix(prop) {
        var func = prop.value, prefix = '';
        if (func.async) {
            prefix += generateAsyncPrefix(func, !prop.computed);
        }
        if (func.generator) {
            // avoid space before method name
            prefix += generateStarSuffix(func) ? '*' : '';
        }
        return prefix;
    }

    CodeGenerator.prototype.generatePattern = function (node, precedence, flags) {
        if (node.type === Syntax.Identifier) {
            return generateIdentifier(node);
        }
        return this.generateExpression(node, precedence, flags);
    };

    CodeGenerator.prototype.generateFunctionParams = function (node) {
        var i, iz, result, hasDefault;

        hasDefault = false;

        if (node.type === Syntax.ArrowFunctionExpression &&
                !node.rest && (!node.defaults || node.defaults.length === 0) &&
                node.params.length === 1 && node.params[0].type === Syntax.Identifier) {
            // arg => { } case
            result = [generateAsyncPrefix(node, true), generateIdentifier(node.params[0])];
        } else {
            result = node.type === Syntax.ArrowFunctionExpression ? [generateAsyncPrefix(node, false)] : [];
            result.push('(');
            if (node.defaults) {
                hasDefault = true;
            }
            for (i = 0, iz = node.params.length; i < iz; ++i) {
                if (hasDefault && node.defaults[i]) {
                    // Handle default values.
                    result.push(this.generateAssignment(node.params[i], node.defaults[i], '=', Precedence.Assignment, E_TTT));
                } else {
                    result.push(this.generatePattern(node.params[i], Precedence.Assignment, E_TTT));
                }
                if (i + 1 < iz) {
                    result.push(',' + space);
                }
            }

            if (node.rest) {
                if (node.params.length) {
                    result.push(',' + space);
                }
                result.push('...');
                result.push(generateIdentifier(node.rest));
            }

            result.push(')');
        }

        return result;
    };

    CodeGenerator.prototype.generateFunctionBody = function (node) {
        var result, expr;

        result = this.generateFunctionParams(node);

        if (node.type === Syntax.ArrowFunctionExpression) {
            result.push(space);
            result.push('=>');
        }

        if (node.expression) {
            result.push(space);
            expr = this.generateExpression(node.body, Precedence.Assignment, E_TTT);
            if (expr.toString().charAt(0) === '{') {
                expr = ['(', expr, ')'];
            }
            result.push(expr);
        } else {
            result.push(this.maybeBlock(node.body, S_TTFF));
        }

        return result;
    };

    CodeGenerator.prototype.generateIterationForStatement = function (operator, stmt, flags) {
        var result = ['for' + space + (stmt.await ? 'await' + space : '') + '('], that = this;
        withIndent(function () {
            if (stmt.left.type === Syntax.VariableDeclaration) {
                withIndent(function () {
                    result.push(stmt.left.kind + noEmptySpace());
                    result.push(that.generateStatement(stmt.left.declarations[0], S_FFFF));
                });
            } else {
                result.push(that.generateExpression(stmt.left, Precedence.Call, E_TTT));
            }

            result = join(result, operator);
            result = [join(
                result,
                that.generateExpression(stmt.right, Precedence.Assignment, E_TTT)
            ), ')'];
        });
        result.push(this.maybeBlock(stmt.body, flags));
        return result;
    };

    CodeGenerator.prototype.generatePropertyKey = function (expr, computed) {
        var result = [];

        if (computed) {
            result.push('[');
        }

        result.push(this.generateExpression(expr, Precedence.Sequence, E_TTT));

        if (computed) {
            result.push(']');
        }

        return result;
    };

    CodeGenerator.prototype.generateAssignment = function (left, right, operator, precedence, flags) {
        if (Precedence.Assignment < precedence) {
            flags |= F_ALLOW_IN;
        }

        return parenthesize(
            [
                this.generateExpression(left, Precedence.Call, flags),
                space + operator + space,
                this.generateExpression(right, Precedence.Assignment, flags)
            ],
            Precedence.Assignment,
            precedence
        );
    };

    CodeGenerator.prototype.semicolon = function (flags) {
        if (!semicolons && flags & F_SEMICOLON_OPT) {
            return '';
        }
        return ';';
    };

    // Statements.

    CodeGenerator.Statement = {

        BlockStatement: function (stmt, flags) {
            var range, content, result = ['{', newline], that = this;

            withIndent(function () {
                // handle functions without any code
                if (stmt.body.length === 0 && preserveBlankLines) {
                    range = stmt.range;
                    if (range[1] - range[0] > 2) {
                        content = sourceCode.substring(range[0] + 1, range[1] - 1);
                        if (content[0] === '\n') {
                            result = ['{'];
                        }
                        result.push(content);
                    }
                }

                var i, iz, fragment, bodyFlags;
                bodyFlags = S_TFFF;
                if (flags & F_FUNC_BODY) {
                    bodyFlags |= F_DIRECTIVE_CTX;
                }

                for (i = 0, iz = stmt.body.length; i < iz; ++i) {
                    if (preserveBlankLines) {
                        // handle spaces before the first line
                        if (i === 0) {
                            if (stmt.body[0].leadingComments) {
                                range = stmt.body[0].leadingComments[0].extendedRange;
                                content = sourceCode.substring(range[0], range[1]);
                                if (content[0] === '\n') {
                                    result = ['{'];
                                }
                            }
                            if (!stmt.body[0].leadingComments) {
                                generateBlankLines(stmt.range[0], stmt.body[0].range[0], result);
                            }
                        }

                        // handle spaces between lines
                        if (i > 0) {
                            if (!stmt.body[i - 1].trailingComments  && !stmt.body[i].leadingComments) {
                                generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
                            }
                        }
                    }

                    if (i === iz - 1) {
                        bodyFlags |= F_SEMICOLON_OPT;
                    }

                    if (stmt.body[i].leadingComments && preserveBlankLines) {
                        fragment = that.generateStatement(stmt.body[i], bodyFlags);
                    } else {
                        fragment = addIndent(that.generateStatement(stmt.body[i], bodyFlags));
                    }

                    result.push(fragment);
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        if (preserveBlankLines && i < iz - 1) {
                            // don't add a new line if there are leading coments
                            // in the next statement
                            if (!stmt.body[i + 1].leadingComments) {
                                result.push(newline);
                            }
                        } else {
                            result.push(newline);
                        }
                    }

                    if (preserveBlankLines) {
                        // handle spaces after the last line
                        if (i === iz - 1) {
                            if (!stmt.body[i].trailingComments) {
                                generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
                            }
                        }
                    }
                }
            });

            result.push(addIndent('}'));
            return result;
        },

        BreakStatement: function (stmt, flags) {
            if (stmt.label) {
                return 'break ' + stmt.label.name + this.semicolon(flags);
            }
            return 'break' + this.semicolon(flags);
        },

        ContinueStatement: function (stmt, flags) {
            if (stmt.label) {
                return 'continue ' + stmt.label.name + this.semicolon(flags);
            }
            return 'continue' + this.semicolon(flags);
        },

        ClassBody: function (stmt, flags) {
            var result = [ '{', newline], that = this;

            withIndent(function (indent) {
                var i, iz;

                for (i = 0, iz = stmt.body.length; i < iz; ++i) {
                    result.push(indent);
                    result.push(that.generateExpression(stmt.body[i], Precedence.Sequence, E_TTT));
                    if (i + 1 < iz) {
                        result.push(newline);
                    }
                }
            });

            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(base);
            result.push('}');
            return result;
        },

        ClassDeclaration: function (stmt, flags) {
            var result, fragment;
            result  = ['class'];
            if (stmt.id) {
                result = join(result, this.generateExpression(stmt.id, Precedence.Sequence, E_TTT));
            }
            if (stmt.superClass) {
                fragment = join('extends', this.generateExpression(stmt.superClass, Precedence.Assignment, E_TTT));
                result = join(result, fragment);
            }
            result.push(space);
            result.push(this.generateStatement(stmt.body, S_TFFT));
            return result;
        },

        DirectiveStatement: function (stmt, flags) {
            if (extra.raw && stmt.raw) {
                return stmt.raw + this.semicolon(flags);
            }
            return escapeDirective(stmt.directive) + this.semicolon(flags);
        },

        DoWhileStatement: function (stmt, flags) {
            // Because `do 42 while (cond)` is Syntax Error. We need semicolon.
            var result = join('do', this.maybeBlock(stmt.body, S_TFFF));
            result = this.maybeBlockSuffix(stmt.body, result);
            return join(result, [
                'while' + space + '(',
                this.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                ')' + this.semicolon(flags)
            ]);
        },

        CatchClause: function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                var guard;

                result = [
                    'catch' + space + '(',
                    that.generateExpression(stmt.param, Precedence.Sequence, E_TTT),
                    ')'
                ];

                if (stmt.guard) {
                    guard = that.generateExpression(stmt.guard, Precedence.Sequence, E_TTT);
                    result.splice(2, 0, ' if ', guard);
                }
            });
            result.push(this.maybeBlock(stmt.body, S_TFFF));
            return result;
        },

        DebuggerStatement: function (stmt, flags) {
            return 'debugger' + this.semicolon(flags);
        },

        EmptyStatement: function (stmt, flags) {
            return ';';
        },

        ExportDefaultDeclaration: function (stmt, flags) {
            var result = [ 'export' ], bodyFlags;

            bodyFlags = (flags & F_SEMICOLON_OPT) ? S_TFFT : S_TFFF;

            // export default HoistableDeclaration[Default]
            // export default AssignmentExpression[In] ;
            result = join(result, 'default');
            if (isStatement(stmt.declaration)) {
                result = join(result, this.generateStatement(stmt.declaration, bodyFlags));
            } else {
                result = join(result, this.generateExpression(stmt.declaration, Precedence.Assignment, E_TTT) + this.semicolon(flags));
            }
            return result;
        },

        ExportNamedDeclaration: function (stmt, flags) {
            var result = [ 'export' ], bodyFlags, that = this;

            bodyFlags = (flags & F_SEMICOLON_OPT) ? S_TFFT : S_TFFF;

            // export VariableStatement
            // export Declaration[Default]
            if (stmt.declaration) {
                return join(result, this.generateStatement(stmt.declaration, bodyFlags));
            }

            // export ExportClause[NoReference] FromClause ;
            // export ExportClause ;
            if (stmt.specifiers) {
                if (stmt.specifiers.length === 0) {
                    result = join(result, '{' + space + '}');
                } else if (stmt.specifiers[0].type === Syntax.ExportBatchSpecifier) {
                    result = join(result, this.generateExpression(stmt.specifiers[0], Precedence.Sequence, E_TTT));
                } else {
                    result = join(result, '{');
                    withIndent(function (indent) {
                        var i, iz;
                        result.push(newline);
                        for (i = 0, iz = stmt.specifiers.length; i < iz; ++i) {
                            result.push(indent);
                            result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                            if (i + 1 < iz) {
                                result.push(',' + newline);
                            }
                        }
                    });
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                        result.push(newline);
                    }
                    result.push(base + '}');
                }

                if (stmt.source) {
                    result = join(result, [
                        'from' + space,
                        // ModuleSpecifier
                        this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                        this.semicolon(flags)
                    ]);
                } else {
                    result.push(this.semicolon(flags));
                }
            }
            return result;
        },

        ExportAllDeclaration: function (stmt, flags) {
            // export * FromClause ;
            return [
                'export' + space,
                '*' + space,
                'from' + space,
                // ModuleSpecifier
                this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                this.semicolon(flags)
            ];
        },

        ExpressionStatement: function (stmt, flags) {
            var result, fragment;

            function isClassPrefixed(fragment) {
                var code;
                if (fragment.slice(0, 5) !== 'class') {
                    return false;
                }
                code = fragment.charCodeAt(5);
                return code === 0x7B  /* '{' */ || esutils.code.isWhiteSpace(code) || esutils.code.isLineTerminator(code);
            }

            function isFunctionPrefixed(fragment) {
                var code;
                if (fragment.slice(0, 8) !== 'function') {
                    return false;
                }
                code = fragment.charCodeAt(8);
                return code === 0x28 /* '(' */ || esutils.code.isWhiteSpace(code) || code === 0x2A  /* '*' */ || esutils.code.isLineTerminator(code);
            }

            function isAsyncPrefixed(fragment) {
                var code, i, iz;
                if (fragment.slice(0, 5) !== 'async') {
                    return false;
                }
                if (!esutils.code.isWhiteSpace(fragment.charCodeAt(5))) {
                    return false;
                }
                for (i = 6, iz = fragment.length; i < iz; ++i) {
                    if (!esutils.code.isWhiteSpace(fragment.charCodeAt(i))) {
                        break;
                    }
                }
                if (i === iz) {
                    return false;
                }
                if (fragment.slice(i, i + 8) !== 'function') {
                    return false;
                }
                code = fragment.charCodeAt(i + 8);
                return code === 0x28 /* '(' */ || esutils.code.isWhiteSpace(code) || code === 0x2A  /* '*' */ || esutils.code.isLineTerminator(code);
            }

            result = [this.generateExpression(stmt.expression, Precedence.Sequence, E_TTT)];
            // 12.4 '{', 'function', 'class' is not allowed in this position.
            // wrap expression with parentheses
            fragment = toSourceNodeWhenNeeded(result).toString();
            if (fragment.charCodeAt(0) === 0x7B  /* '{' */ ||  // ObjectExpression
                    isClassPrefixed(fragment) ||
                    isFunctionPrefixed(fragment) ||
                    isAsyncPrefixed(fragment) ||
                    (directive && (flags & F_DIRECTIVE_CTX) && stmt.expression.type === Syntax.Literal && typeof stmt.expression.value === 'string')) {
                result = ['(', result, ')' + this.semicolon(flags)];
            } else {
                result.push(this.semicolon(flags));
            }
            return result;
        },

        ImportDeclaration: function (stmt, flags) {
            // ES6: 15.2.1 valid import declarations:
            //     - import ImportClause FromClause ;
            //     - import ModuleSpecifier ;
            var result, cursor, that = this;

            // If no ImportClause is present,
            // this should be `import ModuleSpecifier` so skip `from`
            // ModuleSpecifier is StringLiteral.
            if (stmt.specifiers.length === 0) {
                // import ModuleSpecifier ;
                return [
                    'import',
                    space,
                    // ModuleSpecifier
                    this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                    this.semicolon(flags)
                ];
            }

            // import ImportClause FromClause ;
            result = [
                'import'
            ];
            cursor = 0;

            // ImportedBinding
            if (stmt.specifiers[cursor].type === Syntax.ImportDefaultSpecifier) {
                result = join(result, [
                        this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
                ]);
                ++cursor;
            }

            if (stmt.specifiers[cursor]) {
                if (cursor !== 0) {
                    result.push(',');
                }

                if (stmt.specifiers[cursor].type === Syntax.ImportNamespaceSpecifier) {
                    // NameSpaceImport
                    result = join(result, [
                            space,
                            this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
                    ]);
                } else {
                    // NamedImports
                    result.push(space + '{');

                    if ((stmt.specifiers.length - cursor) === 1) {
                        // import { ... } from "...";
                        result.push(space);
                        result.push(this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT));
                        result.push(space + '}' + space);
                    } else {
                        // import {
                        //    ...,
                        //    ...,
                        // } from "...";
                        withIndent(function (indent) {
                            var i, iz;
                            result.push(newline);
                            for (i = cursor, iz = stmt.specifiers.length; i < iz; ++i) {
                                result.push(indent);
                                result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                                if (i + 1 < iz) {
                                    result.push(',' + newline);
                                }
                            }
                        });
                        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                            result.push(newline);
                        }
                        result.push(base + '}' + space);
                    }
                }
            }

            result = join(result, [
                'from' + space,
                // ModuleSpecifier
                this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                this.semicolon(flags)
            ]);
            return result;
        },

        VariableDeclarator: function (stmt, flags) {
            var itemFlags = (flags & F_ALLOW_IN) ? E_TTT : E_FTT;
            if (stmt.init) {
                return [
                    this.generateExpression(stmt.id, Precedence.Assignment, itemFlags),
                    space,
                    '=',
                    space,
                    this.generateExpression(stmt.init, Precedence.Assignment, itemFlags)
                ];
            }
            return this.generatePattern(stmt.id, Precedence.Assignment, itemFlags);
        },

        VariableDeclaration: function (stmt, flags) {
            // VariableDeclarator is typed as Statement,
            // but joined with comma (not LineTerminator).
            // So if comment is attached to target node, we should specialize.
            var result, i, iz, node, bodyFlags, that = this;

            result = [ stmt.kind ];

            bodyFlags = (flags & F_ALLOW_IN) ? S_TFFF : S_FFFF;

            function block() {
                node = stmt.declarations[0];
                if (extra.comment && node.leadingComments) {
                    result.push('\n');
                    result.push(addIndent(that.generateStatement(node, bodyFlags)));
                } else {
                    result.push(noEmptySpace());
                    result.push(that.generateStatement(node, bodyFlags));
                }

                for (i = 1, iz = stmt.declarations.length; i < iz; ++i) {
                    node = stmt.declarations[i];
                    if (extra.comment && node.leadingComments) {
                        result.push(',' + newline);
                        result.push(addIndent(that.generateStatement(node, bodyFlags)));
                    } else {
                        result.push(',' + space);
                        result.push(that.generateStatement(node, bodyFlags));
                    }
                }
            }

            if (stmt.declarations.length > 1) {
                withIndent(block);
            } else {
                block();
            }

            result.push(this.semicolon(flags));

            return result;
        },

        ThrowStatement: function (stmt, flags) {
            return [join(
                'throw',
                this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
            ), this.semicolon(flags)];
        },

        TryStatement: function (stmt, flags) {
            var result, i, iz, guardedHandlers;

            result = ['try', this.maybeBlock(stmt.block, S_TFFF)];
            result = this.maybeBlockSuffix(stmt.block, result);

            if (stmt.handlers) {
                // old interface
                for (i = 0, iz = stmt.handlers.length; i < iz; ++i) {
                    result = join(result, this.generateStatement(stmt.handlers[i], S_TFFF));
                    if (stmt.finalizer || i + 1 !== iz) {
                        result = this.maybeBlockSuffix(stmt.handlers[i].body, result);
                    }
                }
            } else {
                guardedHandlers = stmt.guardedHandlers || [];

                for (i = 0, iz = guardedHandlers.length; i < iz; ++i) {
                    result = join(result, this.generateStatement(guardedHandlers[i], S_TFFF));
                    if (stmt.finalizer || i + 1 !== iz) {
                        result = this.maybeBlockSuffix(guardedHandlers[i].body, result);
                    }
                }

                // new interface
                if (stmt.handler) {
                    if (Array.isArray(stmt.handler)) {
                        for (i = 0, iz = stmt.handler.length; i < iz; ++i) {
                            result = join(result, this.generateStatement(stmt.handler[i], S_TFFF));
                            if (stmt.finalizer || i + 1 !== iz) {
                                result = this.maybeBlockSuffix(stmt.handler[i].body, result);
                            }
                        }
                    } else {
                        result = join(result, this.generateStatement(stmt.handler, S_TFFF));
                        if (stmt.finalizer) {
                            result = this.maybeBlockSuffix(stmt.handler.body, result);
                        }
                    }
                }
            }
            if (stmt.finalizer) {
                result = join(result, ['finally', this.maybeBlock(stmt.finalizer, S_TFFF)]);
            }
            return result;
        },

        SwitchStatement: function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags, that = this;
            withIndent(function () {
                result = [
                    'switch' + space + '(',
                    that.generateExpression(stmt.discriminant, Precedence.Sequence, E_TTT),
                    ')' + space + '{' + newline
                ];
            });
            if (stmt.cases) {
                bodyFlags = S_TFFF;
                for (i = 0, iz = stmt.cases.length; i < iz; ++i) {
                    if (i === iz - 1) {
                        bodyFlags |= F_SEMICOLON_OPT;
                    }
                    fragment = addIndent(this.generateStatement(stmt.cases[i], bodyFlags));
                    result.push(fragment);
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        result.push(newline);
                    }
                }
            }
            result.push(addIndent('}'));
            return result;
        },

        SwitchCase: function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags, that = this;
            withIndent(function () {
                if (stmt.test) {
                    result = [
                        join('case', that.generateExpression(stmt.test, Precedence.Sequence, E_TTT)),
                        ':'
                    ];
                } else {
                    result = ['default:'];
                }

                i = 0;
                iz = stmt.consequent.length;
                if (iz && stmt.consequent[0].type === Syntax.BlockStatement) {
                    fragment = that.maybeBlock(stmt.consequent[0], S_TFFF);
                    result.push(fragment);
                    i = 1;
                }

                if (i !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result.push(newline);
                }

                bodyFlags = S_TFFF;
                for (; i < iz; ++i) {
                    if (i === iz - 1 && flags & F_SEMICOLON_OPT) {
                        bodyFlags |= F_SEMICOLON_OPT;
                    }
                    fragment = addIndent(that.generateStatement(stmt.consequent[i], bodyFlags));
                    result.push(fragment);
                    if (i + 1 !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        result.push(newline);
                    }
                }
            });
            return result;
        },

        IfStatement: function (stmt, flags) {
            var result, bodyFlags, semicolonOptional, that = this;
            withIndent(function () {
                result = [
                    'if' + space + '(',
                    that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                    ')'
                ];
            });
            semicolonOptional = flags & F_SEMICOLON_OPT;
            bodyFlags = S_TFFF;
            if (semicolonOptional) {
                bodyFlags |= F_SEMICOLON_OPT;
            }
            if (stmt.alternate) {
                result.push(this.maybeBlock(stmt.consequent, S_TFFF));
                result = this.maybeBlockSuffix(stmt.consequent, result);
                if (stmt.alternate.type === Syntax.IfStatement) {
                    result = join(result, ['else ', this.generateStatement(stmt.alternate, bodyFlags)]);
                } else {
                    result = join(result, join('else', this.maybeBlock(stmt.alternate, bodyFlags)));
                }
            } else {
                result.push(this.maybeBlock(stmt.consequent, bodyFlags));
            }
            return result;
        },

        ForStatement: function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                result = ['for' + space + '('];
                if (stmt.init) {
                    if (stmt.init.type === Syntax.VariableDeclaration) {
                        result.push(that.generateStatement(stmt.init, S_FFFF));
                    } else {
                        // F_ALLOW_IN becomes false.
                        result.push(that.generateExpression(stmt.init, Precedence.Sequence, E_FTT));
                        result.push(';');
                    }
                } else {
                    result.push(';');
                }

                if (stmt.test) {
                    result.push(space);
                    result.push(that.generateExpression(stmt.test, Precedence.Sequence, E_TTT));
                    result.push(';');
                } else {
                    result.push(';');
                }

                if (stmt.update) {
                    result.push(space);
                    result.push(that.generateExpression(stmt.update, Precedence.Sequence, E_TTT));
                    result.push(')');
                } else {
                    result.push(')');
                }
            });

            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result;
        },

        ForInStatement: function (stmt, flags) {
            return this.generateIterationForStatement('in', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
        },

        ForOfStatement: function (stmt, flags) {
            return this.generateIterationForStatement('of', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
        },

        LabeledStatement: function (stmt, flags) {
            return [stmt.label.name + ':', this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)];
        },

        Program: function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags;
            iz = stmt.body.length;
            result = [safeConcatenation && iz > 0 ? '\n' : ''];
            bodyFlags = S_TFTF;
            for (i = 0; i < iz; ++i) {
                if (!safeConcatenation && i === iz - 1) {
                    bodyFlags |= F_SEMICOLON_OPT;
                }

                if (preserveBlankLines) {
                    // handle spaces before the first line
                    if (i === 0) {
                        if (!stmt.body[0].leadingComments) {
                            generateBlankLines(stmt.range[0], stmt.body[i].range[0], result);
                        }
                    }

                    // handle spaces between lines
                    if (i > 0) {
                        if (!stmt.body[i - 1].trailingComments && !stmt.body[i].leadingComments) {
                            generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
                        }
                    }
                }

                fragment = addIndent(this.generateStatement(stmt.body[i], bodyFlags));
                result.push(fragment);
                if (i + 1 < iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    if (preserveBlankLines) {
                        if (!stmt.body[i + 1].leadingComments) {
                            result.push(newline);
                        }
                    } else {
                        result.push(newline);
                    }
                }

                if (preserveBlankLines) {
                    // handle spaces after the last line
                    if (i === iz - 1) {
                        if (!stmt.body[i].trailingComments) {
                            generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
                        }
                    }
                }
            }
            return result;
        },

        FunctionDeclaration: function (stmt, flags) {
            return [
                generateAsyncPrefix(stmt, true),
                'function',
                generateStarSuffix(stmt) || noEmptySpace(),
                stmt.id ? generateIdentifier(stmt.id) : '',
                this.generateFunctionBody(stmt)
            ];
        },

        ReturnStatement: function (stmt, flags) {
            if (stmt.argument) {
                return [join(
                    'return',
                    this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
                ), this.semicolon(flags)];
            }
            return ['return' + this.semicolon(flags)];
        },

        WhileStatement: function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                result = [
                    'while' + space + '(',
                    that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                    ')'
                ];
            });
            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result;
        },

        WithStatement: function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                result = [
                    'with' + space + '(',
                    that.generateExpression(stmt.object, Precedence.Sequence, E_TTT),
                    ')'
                ];
            });
            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result;
        }

    };

    merge(CodeGenerator.prototype, CodeGenerator.Statement);

    // Expressions.

    CodeGenerator.Expression = {

        SequenceExpression: function (expr, precedence, flags) {
            var result, i, iz;
            if (Precedence.Sequence < precedence) {
                flags |= F_ALLOW_IN;
            }
            result = [];
            for (i = 0, iz = expr.expressions.length; i < iz; ++i) {
                result.push(this.generateExpression(expr.expressions[i], Precedence.Assignment, flags));
                if (i + 1 < iz) {
                    result.push(',' + space);
                }
            }
            return parenthesize(result, Precedence.Sequence, precedence);
        },

        AssignmentExpression: function (expr, precedence, flags) {
            return this.generateAssignment(expr.left, expr.right, expr.operator, precedence, flags);
        },

        ArrowFunctionExpression: function (expr, precedence, flags) {
            return parenthesize(this.generateFunctionBody(expr), Precedence.ArrowFunction, precedence);
        },

        ConditionalExpression: function (expr, precedence, flags) {
            if (Precedence.Conditional < precedence) {
                flags |= F_ALLOW_IN;
            }
            return parenthesize(
                [
                    this.generateExpression(expr.test, Precedence.LogicalOR, flags),
                    space + '?' + space,
                    this.generateExpression(expr.consequent, Precedence.Assignment, flags),
                    space + ':' + space,
                    this.generateExpression(expr.alternate, Precedence.Assignment, flags)
                ],
                Precedence.Conditional,
                precedence
            );
        },

        LogicalExpression: function (expr, precedence, flags) {
            return this.BinaryExpression(expr, precedence, flags);
        },

        BinaryExpression: function (expr, precedence, flags) {
            var result, currentPrecedence, fragment, leftSource;
            currentPrecedence = BinaryPrecedence[expr.operator];

            if (currentPrecedence < precedence) {
                flags |= F_ALLOW_IN;
            }

            fragment = this.generateExpression(expr.left, currentPrecedence, flags);

            leftSource = fragment.toString();

            if (leftSource.charCodeAt(leftSource.length - 1) === 0x2F /* / */ && esutils.code.isIdentifierPartES5(expr.operator.charCodeAt(0))) {
                result = [fragment, noEmptySpace(), expr.operator];
            } else {
                result = join(fragment, expr.operator);
            }

            fragment = this.generateExpression(expr.right, currentPrecedence + 1, flags);

            if (expr.operator === '/' && fragment.toString().charAt(0) === '/' ||
            expr.operator.slice(-1) === '<' && fragment.toString().slice(0, 3) === '!--') {
                // If '/' concats with '/' or `<` concats with `!--`, it is interpreted as comment start
                result.push(noEmptySpace());
                result.push(fragment);
            } else {
                result = join(result, fragment);
            }

            if (expr.operator === 'in' && !(flags & F_ALLOW_IN)) {
                return ['(', result, ')'];
            }
            return parenthesize(result, currentPrecedence, precedence);
        },

        CallExpression: function (expr, precedence, flags) {
            var result, i, iz;
            // F_ALLOW_UNPARATH_NEW becomes false.
            result = [this.generateExpression(expr.callee, Precedence.Call, E_TTF)];
            result.push('(');
            for (i = 0, iz = expr['arguments'].length; i < iz; ++i) {
                result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
                if (i + 1 < iz) {
                    result.push(',' + space);
                }
            }
            result.push(')');

            if (!(flags & F_ALLOW_CALL)) {
                return ['(', result, ')'];
            }
            return parenthesize(result, Precedence.Call, precedence);
        },

        NewExpression: function (expr, precedence, flags) {
            var result, length, i, iz, itemFlags;
            length = expr['arguments'].length;

            // F_ALLOW_CALL becomes false.
            // F_ALLOW_UNPARATH_NEW may become false.
            itemFlags = (flags & F_ALLOW_UNPARATH_NEW && !parentheses && length === 0) ? E_TFT : E_TFF;

            result = join(
                'new',
                this.generateExpression(expr.callee, Precedence.New, itemFlags)
            );

            if (!(flags & F_ALLOW_UNPARATH_NEW) || parentheses || length > 0) {
                result.push('(');
                for (i = 0, iz = length; i < iz; ++i) {
                    result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
                    if (i + 1 < iz) {
                        result.push(',' + space);
                    }
                }
                result.push(')');
            }

            return parenthesize(result, Precedence.New, precedence);
        },

        MemberExpression: function (expr, precedence, flags) {
            var result, fragment;

            // F_ALLOW_UNPARATH_NEW becomes false.
            result = [this.generateExpression(expr.object, Precedence.Call, (flags & F_ALLOW_CALL) ? E_TTF : E_TFF)];

            if (expr.computed) {
                result.push('[');
                result.push(this.generateExpression(expr.property, Precedence.Sequence, flags & F_ALLOW_CALL ? E_TTT : E_TFT));
                result.push(']');
            } else {
                if (expr.object.type === Syntax.Literal && typeof expr.object.value === 'number') {
                    fragment = toSourceNodeWhenNeeded(result).toString();
                    // When the following conditions are all true,
                    //   1. No floating point
                    //   2. Don't have exponents
                    //   3. The last character is a decimal digit
                    //   4. Not hexadecimal OR octal number literal
                    // we should add a floating point.
                    if (
                            fragment.indexOf('.') < 0 &&
                            !/[eExX]/.test(fragment) &&
                            esutils.code.isDecimalDigit(fragment.charCodeAt(fragment.length - 1)) &&
                            !(fragment.length >= 2 && fragment.charCodeAt(0) === 48)  // '0'
                            ) {
                        result.push(' ');
                    }
                }
                result.push('.');
                result.push(generateIdentifier(expr.property));
            }

            return parenthesize(result, Precedence.Member, precedence);
        },

        MetaProperty: function (expr, precedence, flags) {
            var result;
            result = [];
            result.push(typeof expr.meta === "string" ? expr.meta : generateIdentifier(expr.meta));
            result.push('.');
            result.push(typeof expr.property === "string" ? expr.property : generateIdentifier(expr.property));
            return parenthesize(result, Precedence.Member, precedence);
        },

        UnaryExpression: function (expr, precedence, flags) {
            var result, fragment, rightCharCode, leftSource, leftCharCode;
            fragment = this.generateExpression(expr.argument, Precedence.Unary, E_TTT);

            if (space === '') {
                result = join(expr.operator, fragment);
            } else {
                result = [expr.operator];
                if (expr.operator.length > 2) {
                    // delete, void, typeof
                    // get `typeof []`, not `typeof[]`
                    result = join(result, fragment);
                } else {
                    // Prevent inserting spaces between operator and argument if it is unnecessary
                    // like, `!cond`
                    leftSource = toSourceNodeWhenNeeded(result).toString();
                    leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
                    rightCharCode = fragment.toString().charCodeAt(0);

                    if (((leftCharCode === 0x2B  /* + */ || leftCharCode === 0x2D  /* - */) && leftCharCode === rightCharCode) ||
                            (esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode))) {
                        result.push(noEmptySpace());
                        result.push(fragment);
                    } else {
                        result.push(fragment);
                    }
                }
            }
            return parenthesize(result, Precedence.Unary, precedence);
        },

        YieldExpression: function (expr, precedence, flags) {
            var result;
            if (expr.delegate) {
                result = 'yield*';
            } else {
                result = 'yield';
            }
            if (expr.argument) {
                result = join(
                    result,
                    this.generateExpression(expr.argument, Precedence.Yield, E_TTT)
                );
            }
            return parenthesize(result, Precedence.Yield, precedence);
        },

        AwaitExpression: function (expr, precedence, flags) {
            var result = join(
                expr.all ? 'await*' : 'await',
                this.generateExpression(expr.argument, Precedence.Await, E_TTT)
            );
            return parenthesize(result, Precedence.Await, precedence);
        },

        UpdateExpression: function (expr, precedence, flags) {
            if (expr.prefix) {
                return parenthesize(
                    [
                        expr.operator,
                        this.generateExpression(expr.argument, Precedence.Unary, E_TTT)
                    ],
                    Precedence.Unary,
                    precedence
                );
            }
            return parenthesize(
                [
                    this.generateExpression(expr.argument, Precedence.Postfix, E_TTT),
                    expr.operator
                ],
                Precedence.Postfix,
                precedence
            );
        },

        FunctionExpression: function (expr, precedence, flags) {
            var result = [
                generateAsyncPrefix(expr, true),
                'function'
            ];
            if (expr.id) {
                result.push(generateStarSuffix(expr) || noEmptySpace());
                result.push(generateIdentifier(expr.id));
            } else {
                result.push(generateStarSuffix(expr) || space);
            }
            result.push(this.generateFunctionBody(expr));
            return result;
        },

        ArrayPattern: function (expr, precedence, flags) {
            return this.ArrayExpression(expr, precedence, flags, true);
        },

        ArrayExpression: function (expr, precedence, flags, isPattern) {
            var result, multiline, that = this;
            if (!expr.elements.length) {
                return '[]';
            }
            multiline = isPattern ? false : expr.elements.length > 1;
            result = ['[', multiline ? newline : ''];
            withIndent(function (indent) {
                var i, iz;
                for (i = 0, iz = expr.elements.length; i < iz; ++i) {
                    if (!expr.elements[i]) {
                        if (multiline) {
                            result.push(indent);
                        }
                        if (i + 1 === iz) {
                            result.push(',');
                        }
                    } else {
                        result.push(multiline ? indent : '');
                        result.push(that.generateExpression(expr.elements[i], Precedence.Assignment, E_TTT));
                    }
                    if (i + 1 < iz) {
                        result.push(',' + (multiline ? newline : space));
                    }
                }
            });
            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(multiline ? base : '');
            result.push(']');
            return result;
        },

        RestElement: function(expr, precedence, flags) {
            return '...' + this.generatePattern(expr.argument);
        },

        ClassExpression: function (expr, precedence, flags) {
            var result, fragment;
            result = ['class'];
            if (expr.id) {
                result = join(result, this.generateExpression(expr.id, Precedence.Sequence, E_TTT));
            }
            if (expr.superClass) {
                fragment = join('extends', this.generateExpression(expr.superClass, Precedence.Assignment, E_TTT));
                result = join(result, fragment);
            }
            result.push(space);
            result.push(this.generateStatement(expr.body, S_TFFT));
            return result;
        },

        MethodDefinition: function (expr, precedence, flags) {
            var result, fragment;
            if (expr['static']) {
                result = ['static' + space];
            } else {
                result = [];
            }
            if (expr.kind === 'get' || expr.kind === 'set') {
                fragment = [
                    join(expr.kind, this.generatePropertyKey(expr.key, expr.computed)),
                    this.generateFunctionBody(expr.value)
                ];
            } else {
                fragment = [
                    generateMethodPrefix(expr),
                    this.generatePropertyKey(expr.key, expr.computed),
                    this.generateFunctionBody(expr.value)
                ];
            }
            return join(result, fragment);
        },

        Property: function (expr, precedence, flags) {
            if (expr.kind === 'get' || expr.kind === 'set') {
                return [
                    expr.kind, noEmptySpace(),
                    this.generatePropertyKey(expr.key, expr.computed),
                    this.generateFunctionBody(expr.value)
                ];
            }

            if (expr.shorthand) {
                if (expr.value.type === "AssignmentPattern") {
                    return this.AssignmentPattern(expr.value, Precedence.Sequence, E_TTT);
                }
                return this.generatePropertyKey(expr.key, expr.computed);
            }

            if (expr.method) {
                return [
                    generateMethodPrefix(expr),
                    this.generatePropertyKey(expr.key, expr.computed),
                    this.generateFunctionBody(expr.value)
                ];
            }

            return [
                this.generatePropertyKey(expr.key, expr.computed),
                ':' + space,
                this.generateExpression(expr.value, Precedence.Assignment, E_TTT)
            ];
        },

        ObjectExpression: function (expr, precedence, flags) {
            var multiline, result, fragment, that = this;

            if (!expr.properties.length) {
                return '{}';
            }
            multiline = expr.properties.length > 1;

            withIndent(function () {
                fragment = that.generateExpression(expr.properties[0], Precedence.Sequence, E_TTT);
            });

            if (!multiline) {
                // issues 4
                // Do not transform from
                //   dejavu.Class.declare({
                //       method2: function () {}
                //   });
                // to
                //   dejavu.Class.declare({method2: function () {
                //       }});
                if (!hasLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    return [ '{', space, fragment, space, '}' ];
                }
            }

            withIndent(function (indent) {
                var i, iz;
                result = [ '{', newline, indent, fragment ];

                if (multiline) {
                    result.push(',' + newline);
                    for (i = 1, iz = expr.properties.length; i < iz; ++i) {
                        result.push(indent);
                        result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
                        if (i + 1 < iz) {
                            result.push(',' + newline);
                        }
                    }
                }
            });

            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(base);
            result.push('}');
            return result;
        },

        AssignmentPattern: function(expr, precedence, flags) {
            return this.generateAssignment(expr.left, expr.right, '=', precedence, flags);
        },

        ObjectPattern: function (expr, precedence, flags) {
            var result, i, iz, multiline, property, that = this;
            if (!expr.properties.length) {
                return '{}';
            }

            multiline = false;
            if (expr.properties.length === 1) {
                property = expr.properties[0];
                if (property.value.type !== Syntax.Identifier) {
                    multiline = true;
                }
            } else {
                for (i = 0, iz = expr.properties.length; i < iz; ++i) {
                    property = expr.properties[i];
                    if (!property.shorthand) {
                        multiline = true;
                        break;
                    }
                }
            }
            result = ['{', multiline ? newline : '' ];

            withIndent(function (indent) {
                var i, iz;
                for (i = 0, iz = expr.properties.length; i < iz; ++i) {
                    result.push(multiline ? indent : '');
                    result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
                    if (i + 1 < iz) {
                        result.push(',' + (multiline ? newline : space));
                    }
                }
            });

            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(multiline ? base : '');
            result.push('}');
            return result;
        },

        ThisExpression: function (expr, precedence, flags) {
            return 'this';
        },

        Super: function (expr, precedence, flags) {
            return 'super';
        },

        Identifier: function (expr, precedence, flags) {
            return generateIdentifier(expr);
        },

        ImportDefaultSpecifier: function (expr, precedence, flags) {
            return generateIdentifier(expr.id || expr.local);
        },

        ImportNamespaceSpecifier: function (expr, precedence, flags) {
            var result = ['*'];
            var id = expr.id || expr.local;
            if (id) {
                result.push(space + 'as' + noEmptySpace() + generateIdentifier(id));
            }
            return result;
        },

        ImportSpecifier: function (expr, precedence, flags) {
            var imported = expr.imported;
            var result = [ imported.name ];
            var local = expr.local;
            if (local && local.name !== imported.name) {
                result.push(noEmptySpace() + 'as' + noEmptySpace() + generateIdentifier(local));
            }
            return result;
        },

        ExportSpecifier: function (expr, precedence, flags) {
            var local = expr.local;
            var result = [ local.name ];
            var exported = expr.exported;
            if (exported && exported.name !== local.name) {
                result.push(noEmptySpace() + 'as' + noEmptySpace() + generateIdentifier(exported));
            }
            return result;
        },

        Literal: function (expr, precedence, flags) {
            var raw;
            if (expr.hasOwnProperty('raw') && parse && extra.raw) {
                try {
                    raw = parse(expr.raw).body[0].expression;
                    if (raw.type === Syntax.Literal) {
                        if (raw.value === expr.value) {
                            return expr.raw;
                        }
                    }
                } catch (e) {
                    // not use raw property
                }
            }

            if (expr.value === null) {
                return 'null';
            }

            if (typeof expr.value === 'string') {
                return escapeString(expr.value);
            }

            if (typeof expr.value === 'number') {
                return generateNumber(expr.value);
            }

            if (typeof expr.value === 'boolean') {
                return expr.value ? 'true' : 'false';
            }

            if (expr.regex) {
              return '/' + expr.regex.pattern + '/' + expr.regex.flags;
            }
            return generateRegExp(expr.value);
        },

        GeneratorExpression: function (expr, precedence, flags) {
            return this.ComprehensionExpression(expr, precedence, flags);
        },

        ComprehensionExpression: function (expr, precedence, flags) {
            // GeneratorExpression should be parenthesized with (...), ComprehensionExpression with [...]
            // Due to https://bugzilla.mozilla.org/show_bug.cgi?id=883468 position of expr.body can differ in Spidermonkey and ES6

            var result, i, iz, fragment, that = this;
            result = (expr.type === Syntax.GeneratorExpression) ? ['('] : ['['];

            if (extra.moz.comprehensionExpressionStartsWithAssignment) {
                fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);
                result.push(fragment);
            }

            if (expr.blocks) {
                withIndent(function () {
                    for (i = 0, iz = expr.blocks.length; i < iz; ++i) {
                        fragment = that.generateExpression(expr.blocks[i], Precedence.Sequence, E_TTT);
                        if (i > 0 || extra.moz.comprehensionExpressionStartsWithAssignment) {
                            result = join(result, fragment);
                        } else {
                            result.push(fragment);
                        }
                    }
                });
            }

            if (expr.filter) {
                result = join(result, 'if' + space);
                fragment = this.generateExpression(expr.filter, Precedence.Sequence, E_TTT);
                result = join(result, [ '(', fragment, ')' ]);
            }

            if (!extra.moz.comprehensionExpressionStartsWithAssignment) {
                fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);

                result = join(result, fragment);
            }

            result.push((expr.type === Syntax.GeneratorExpression) ? ')' : ']');
            return result;
        },

        ComprehensionBlock: function (expr, precedence, flags) {
            var fragment;
            if (expr.left.type === Syntax.VariableDeclaration) {
                fragment = [
                    expr.left.kind, noEmptySpace(),
                    this.generateStatement(expr.left.declarations[0], S_FFFF)
                ];
            } else {
                fragment = this.generateExpression(expr.left, Precedence.Call, E_TTT);
            }

            fragment = join(fragment, expr.of ? 'of' : 'in');
            fragment = join(fragment, this.generateExpression(expr.right, Precedence.Sequence, E_TTT));

            return [ 'for' + space + '(', fragment, ')' ];
        },

        SpreadElement: function (expr, precedence, flags) {
            return [
                '...',
                this.generateExpression(expr.argument, Precedence.Assignment, E_TTT)
            ];
        },

        TaggedTemplateExpression: function (expr, precedence, flags) {
            var itemFlags = E_TTF;
            if (!(flags & F_ALLOW_CALL)) {
                itemFlags = E_TFF;
            }
            var result = [
                this.generateExpression(expr.tag, Precedence.Call, itemFlags),
                this.generateExpression(expr.quasi, Precedence.Primary, E_FFT)
            ];
            return parenthesize(result, Precedence.TaggedTemplate, precedence);
        },

        TemplateElement: function (expr, precedence, flags) {
            // Don't use "cooked". Since tagged template can use raw template
            // representation. So if we do so, it breaks the script semantics.
            return expr.value.raw;
        },

        TemplateLiteral: function (expr, precedence, flags) {
            var result, i, iz;
            result = [ '`' ];
            for (i = 0, iz = expr.quasis.length; i < iz; ++i) {
                result.push(this.generateExpression(expr.quasis[i], Precedence.Primary, E_TTT));
                if (i + 1 < iz) {
                    result.push('${' + space);
                    result.push(this.generateExpression(expr.expressions[i], Precedence.Sequence, E_TTT));
                    result.push(space + '}');
                }
            }
            result.push('`');
            return result;
        },

        ModuleSpecifier: function (expr, precedence, flags) {
            return this.Literal(expr, precedence, flags);
        },

        ImportExpression: function(expr, precedence, flag) {
            return parenthesize([
                'import(',
                this.generateExpression(expr.source, Precedence.Assignment, E_TTT),
                ')'
            ], Precedence.Call, precedence);
        },

    };

    merge(CodeGenerator.prototype, CodeGenerator.Expression);

    CodeGenerator.prototype.generateExpression = function (expr, precedence, flags) {
        var result, type;

        type = expr.type || Syntax.Property;

        if (extra.verbatim && expr.hasOwnProperty(extra.verbatim)) {
            return generateVerbatim(expr, precedence);
        }

        result = this[type](expr, precedence, flags);


        if (extra.comment) {
            result = addComments(expr, result);
        }
        return toSourceNodeWhenNeeded(result, expr);
    };

    CodeGenerator.prototype.generateStatement = function (stmt, flags) {
        var result,
            fragment;

        result = this[stmt.type](stmt, flags);

        // Attach comments

        if (extra.comment) {
            result = addComments(stmt, result);
        }

        fragment = toSourceNodeWhenNeeded(result).toString();
        if (stmt.type === Syntax.Program && !safeConcatenation && newline === '' &&  fragment.charAt(fragment.length - 1) === '\n') {
            result = sourceMap ? toSourceNodeWhenNeeded(result).replaceRight(/\s+$/, '') : fragment.replace(/\s+$/, '');
        }

        return toSourceNodeWhenNeeded(result, stmt);
    };

    function generateInternal(node) {
        var codegen;

        codegen = new CodeGenerator();
        if (isStatement(node)) {
            return codegen.generateStatement(node, S_TFFF);
        }

        if (isExpression(node)) {
            return codegen.generateExpression(node, Precedence.Sequence, E_TTT);
        }

        throw new Error('Unknown node type: ' + node.type);
    }

    function generate(node, options) {
        var defaultOptions = getDefaultOptions(), result, pair;

        if (options != null) {
            // Obsolete options
            //
            //   `options.indent`
            //   `options.base`
            //
            // Instead of them, we can use `option.format.indent`.
            if (typeof options.indent === 'string') {
                defaultOptions.format.indent.style = options.indent;
            }
            if (typeof options.base === 'number') {
                defaultOptions.format.indent.base = options.base;
            }
            options = updateDeeply(defaultOptions, options);
            indent = options.format.indent.style;
            if (typeof options.base === 'string') {
                base = options.base;
            } else {
                base = stringRepeat(indent, options.format.indent.base);
            }
        } else {
            options = defaultOptions;
            indent = options.format.indent.style;
            base = stringRepeat(indent, options.format.indent.base);
        }
        json = options.format.json;
        renumber = options.format.renumber;
        hexadecimal = json ? false : options.format.hexadecimal;
        quotes = json ? 'double' : options.format.quotes;
        escapeless = options.format.escapeless;
        newline = options.format.newline;
        space = options.format.space;
        if (options.format.compact) {
            newline = space = indent = base = '';
        }
        parentheses = options.format.parentheses;
        semicolons = options.format.semicolons;
        safeConcatenation = options.format.safeConcatenation;
        directive = options.directive;
        parse = json ? null : options.parse;
        sourceMap = options.sourceMap;
        sourceCode = options.sourceCode;
        preserveBlankLines = options.format.preserveBlankLines && sourceCode !== null;
        extra = options;

        if (sourceMap) {
            if (!exports.browser) {
                // We assume environment is node.js
                // And prevent from including source-map by browserify
                SourceNode = __webpack_require__(/*! source-map */ "3HS5").SourceNode;
            } else {
                SourceNode = global.sourceMap.SourceNode;
            }
        }

        result = generateInternal(node);

        if (!sourceMap) {
            pair = {code: result.toString(), map: null};
            return options.sourceMapWithCode ? pair : pair.code;
        }


        pair = result.toStringWithSourceMap({
            file: options.file,
            sourceRoot: options.sourceMapRoot
        });

        if (options.sourceContent) {
            pair.map.setSourceContent(options.sourceMap,
                                      options.sourceContent);
        }

        if (options.sourceMapWithCode) {
            return pair;
        }

        return pair.map.toString();
    }

    FORMAT_MINIFY = {
        indent: {
            style: '',
            base: 0
        },
        renumber: true,
        hexadecimal: true,
        quotes: 'auto',
        escapeless: true,
        compact: true,
        parentheses: false,
        semicolons: false
    };

    FORMAT_DEFAULTS = getDefaultOptions().format;

    exports.version = __webpack_require__(/*! ./package.json */ "hx1V").version;
    exports.generate = generate;
    exports.attachComments = estraverse.attachComments;
    exports.Precedence = updateDeeply({}, Precedence);
    exports.browser = false;
    exports.FORMAT_MINIFY = FORMAT_MINIFY;
    exports.FORMAT_DEFAULTS = FORMAT_DEFAULTS;
}());
/* vim: set sw=4 ts=4 et tw=80 : */

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "yLpj")))

/***/ }),

/***/ "hx1V":
/*!*********************************************!*\
  !*** ./node_modules/escodegen/package.json ***!
  \*********************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, bin, bugs, bundleDependencies, dependencies, deprecated, description, devDependencies, engines, files, homepage, license, main, maintainers, name, optionalDependencies, repository, scripts, version, default */
/*! all exports used */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"escodegen@1.12.0\",\"_id\":\"escodegen@1.12.0\",\"_inBundle\":false,\"_integrity\":\"sha512-TuA+EhsanGcme5T3R0L80u4t8CpbXQjegRmf7+FPTJrtCTErXFeelblRgHQa1FofEzqYYJmJ/OqjTwREp9qgmg==\",\"_location\":\"/escodegen\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"version\",\"registry\":true,\"raw\":\"escodegen@1.12.0\",\"name\":\"escodegen\",\"escapedName\":\"escodegen\",\"rawSpec\":\"1.12.0\",\"saveSpec\":null,\"fetchSpec\":\"1.12.0\"},\"_requiredBy\":[\"#USER\",\"/\"],\"_resolved\":\"https://registry.npmjs.org/escodegen/-/escodegen-1.12.0.tgz\",\"_shasum\":\"f763daf840af172bb3a2b6dd7219c0e17f7ff541\",\"_spec\":\"escodegen@1.12.0\",\"_where\":\"/home/maxbundy/git/progrem-viewer\",\"bin\":{\"esgenerate\":\"bin/esgenerate.js\",\"escodegen\":\"bin/escodegen.js\"},\"bugs\":{\"url\":\"https://github.com/estools/escodegen/issues\"},\"bundleDependencies\":false,\"dependencies\":{\"esprima\":\"^3.1.3\",\"estraverse\":\"^4.2.0\",\"esutils\":\"^2.0.2\",\"optionator\":\"^0.8.1\",\"source-map\":\"~0.6.1\"},\"deprecated\":false,\"description\":\"ECMAScript code generator\",\"devDependencies\":{\"acorn\":\"^4.0.4\",\"bluebird\":\"^3.4.7\",\"bower-registry-client\":\"^1.0.0\",\"chai\":\"^3.5.0\",\"commonjs-everywhere\":\"^0.9.7\",\"gulp\":\"^3.8.10\",\"gulp-eslint\":\"^3.0.1\",\"gulp-mocha\":\"^3.0.1\",\"semver\":\"^5.1.0\"},\"engines\":{\"node\":\">=4.0\"},\"files\":[\"LICENSE.BSD\",\"README.md\",\"bin\",\"escodegen.js\",\"package.json\"],\"homepage\":\"http://github.com/estools/escodegen\",\"license\":\"BSD-2-Clause\",\"main\":\"escodegen.js\",\"maintainers\":[{\"name\":\"Yusuke Suzuki\",\"email\":\"utatane.tea@gmail.com\",\"url\":\"http://github.com/Constellation\"}],\"name\":\"escodegen\",\"optionalDependencies\":{\"source-map\":\"~0.6.1\"},\"repository\":{\"type\":\"git\",\"url\":\"git+ssh://git@github.com/estools/escodegen.git\"},\"scripts\":{\"build\":\"cjsify -a path: tools/entry-point.js > escodegen.browser.js\",\"build-min\":\"cjsify -ma path: tools/entry-point.js > escodegen.browser.min.js\",\"lint\":\"gulp lint\",\"release\":\"node tools/release.js\",\"test\":\"gulp travis\",\"unit-test\":\"gulp test\"},\"version\":\"1.12.0\"}");

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXNjb2RlZ2VuL2VzY29kZWdlbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsbUJBQU8sQ0FBQyx3QkFBWTtBQUNyQyxjQUFjLG1CQUFPLENBQUMscUJBQVM7O0FBRS9COztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELFFBQVE7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxRQUFRO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFFBQVE7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELFFBQVE7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0EsMkNBQTJDO0FBQzNDLDJCQUEyQjtBQUMzQjtBQUNBLCtCQUErQiw2QkFBNkI7QUFDNUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0EsNERBQTRELFFBQVE7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FB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O0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxzQkFBc0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDOUM7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QiLCJmaWxlIjoibnBtLmVzY29kZWdlbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgKEMpIDIwMTItMjAxNCBZdXN1a2UgU3V6dWtpIDx1dGF0YW5lLnRlYUBnbWFpbC5jb20+XG4gIENvcHlyaWdodCAoQykgMjAxNSBJbmd2YXIgU3RlcGFueWFuIDxtZUBycmV2ZXJzZXIuY29tPlxuICBDb3B5cmlnaHQgKEMpIDIwMTQgSXZhbiBOaWt1bGluIDxpZmFhYW5AZ21haWwuY29tPlxuICBDb3B5cmlnaHQgKEMpIDIwMTItMjAxMyBNaWNoYWVsIEZpY2FycmEgPGVzY29kZWdlbi5jb3B5cmlnaHRAbWljaGFlbC5maWNhcnJhLm1lPlxuICBDb3B5cmlnaHQgKEMpIDIwMTItMjAxMyBNYXRoaWFzIEJ5bmVucyA8bWF0aGlhc0BxaXdpLmJlPlxuICBDb3B5cmlnaHQgKEMpIDIwMTMgSXJha2xpIEdvemFsaXNodmlsaSA8cmZvYmljQGdtYWlsLmNvbT5cbiAgQ29weXJpZ2h0IChDKSAyMDEyIFJvYmVydCBHdXN0LUJhcmRvbiA8ZG9uYXRlQHJvYmVydC5ndXN0LWJhcmRvbi5vcmc+XG4gIENvcHlyaWdodCAoQykgMjAxMiBKb2huIEZyZWVtYW4gPGpmcmVlbWFuMDhAZ21haWwuY29tPlxuICBDb3B5cmlnaHQgKEMpIDIwMTEtMjAxMiBBcml5YSBIaWRheWF0IDxhcml5YS5oaWRheWF0QGdtYWlsLmNvbT5cbiAgQ29weXJpZ2h0IChDKSAyMDEyIEpvb3N0LVdpbSBCb2VrZXN0ZWlqbiA8am9vc3Qtd2ltQGJvZWtlc3RlaWpuLm5sPlxuICBDb3B5cmlnaHQgKEMpIDIwMTIgS3JpcyBLb3dhbCA8a3Jpcy5rb3dhbEBjaXhhci5jb20+XG4gIENvcHlyaWdodCAoQykgMjAxMiBBcnBhZCBCb3Jzb3MgPGFycGFkLmJvcnNvc0Bnb29nbGVtYWlsLmNvbT5cblxuICBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAgbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0XG4gICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodFxuICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZVxuICAgICAgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuICBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIlxuICBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4gIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4gIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCA8Q09QWVJJR0hUIEhPTERFUj4gQkUgTElBQkxFIEZPUiBBTllcbiAgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbiAgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuICBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkRcbiAgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbiAgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GXG4gIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4qL1xuXG4vKmdsb2JhbCBleHBvcnRzOnRydWUsIHJlcXVpcmU6dHJ1ZSwgZ2xvYmFsOnRydWUqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgU3ludGF4LFxuICAgICAgICBQcmVjZWRlbmNlLFxuICAgICAgICBCaW5hcnlQcmVjZWRlbmNlLFxuICAgICAgICBTb3VyY2VOb2RlLFxuICAgICAgICBlc3RyYXZlcnNlLFxuICAgICAgICBlc3V0aWxzLFxuICAgICAgICBiYXNlLFxuICAgICAgICBpbmRlbnQsXG4gICAgICAgIGpzb24sXG4gICAgICAgIHJlbnVtYmVyLFxuICAgICAgICBoZXhhZGVjaW1hbCxcbiAgICAgICAgcXVvdGVzLFxuICAgICAgICBlc2NhcGVsZXNzLFxuICAgICAgICBuZXdsaW5lLFxuICAgICAgICBzcGFjZSxcbiAgICAgICAgcGFyZW50aGVzZXMsXG4gICAgICAgIHNlbWljb2xvbnMsXG4gICAgICAgIHNhZmVDb25jYXRlbmF0aW9uLFxuICAgICAgICBkaXJlY3RpdmUsXG4gICAgICAgIGV4dHJhLFxuICAgICAgICBwYXJzZSxcbiAgICAgICAgc291cmNlTWFwLFxuICAgICAgICBzb3VyY2VDb2RlLFxuICAgICAgICBwcmVzZXJ2ZUJsYW5rTGluZXMsXG4gICAgICAgIEZPUk1BVF9NSU5JRlksXG4gICAgICAgIEZPUk1BVF9ERUZBVUxUUztcblxuICAgIGVzdHJhdmVyc2UgPSByZXF1aXJlKCdlc3RyYXZlcnNlJyk7XG4gICAgZXN1dGlscyA9IHJlcXVpcmUoJ2VzdXRpbHMnKTtcblxuICAgIFN5bnRheCA9IGVzdHJhdmVyc2UuU3ludGF4O1xuXG4gICAgLy8gR2VuZXJhdGlvbiBpcyBkb25lIGJ5IGdlbmVyYXRlRXhwcmVzc2lvbi5cbiAgICBmdW5jdGlvbiBpc0V4cHJlc3Npb24obm9kZSkge1xuICAgICAgICByZXR1cm4gQ29kZUdlbmVyYXRvci5FeHByZXNzaW9uLmhhc093blByb3BlcnR5KG5vZGUudHlwZSk7XG4gICAgfVxuXG4gICAgLy8gR2VuZXJhdGlvbiBpcyBkb25lIGJ5IGdlbmVyYXRlU3RhdGVtZW50LlxuICAgIGZ1bmN0aW9uIGlzU3RhdGVtZW50KG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIENvZGVHZW5lcmF0b3IuU3RhdGVtZW50Lmhhc093blByb3BlcnR5KG5vZGUudHlwZSk7XG4gICAgfVxuXG4gICAgUHJlY2VkZW5jZSA9IHtcbiAgICAgICAgU2VxdWVuY2U6IDAsXG4gICAgICAgIFlpZWxkOiAxLFxuICAgICAgICBBc3NpZ25tZW50OiAxLFxuICAgICAgICBDb25kaXRpb25hbDogMixcbiAgICAgICAgQXJyb3dGdW5jdGlvbjogMixcbiAgICAgICAgTG9naWNhbE9SOiAzLFxuICAgICAgICBMb2dpY2FsQU5EOiA0LFxuICAgICAgICBCaXR3aXNlT1I6IDUsXG4gICAgICAgIEJpdHdpc2VYT1I6IDYsXG4gICAgICAgIEJpdHdpc2VBTkQ6IDcsXG4gICAgICAgIEVxdWFsaXR5OiA4LFxuICAgICAgICBSZWxhdGlvbmFsOiA5LFxuICAgICAgICBCaXR3aXNlU0hJRlQ6IDEwLFxuICAgICAgICBBZGRpdGl2ZTogMTEsXG4gICAgICAgIE11bHRpcGxpY2F0aXZlOiAxMixcbiAgICAgICAgQXdhaXQ6IDEzLFxuICAgICAgICBVbmFyeTogMTMsXG4gICAgICAgIFBvc3RmaXg6IDE0LFxuICAgICAgICBDYWxsOiAxNSxcbiAgICAgICAgTmV3OiAxNixcbiAgICAgICAgVGFnZ2VkVGVtcGxhdGU6IDE3LFxuICAgICAgICBNZW1iZXI6IDE4LFxuICAgICAgICBQcmltYXJ5OiAxOVxuICAgIH07XG5cbiAgICBCaW5hcnlQcmVjZWRlbmNlID0ge1xuICAgICAgICAnfHwnOiBQcmVjZWRlbmNlLkxvZ2ljYWxPUixcbiAgICAgICAgJyYmJzogUHJlY2VkZW5jZS5Mb2dpY2FsQU5ELFxuICAgICAgICAnfCc6IFByZWNlZGVuY2UuQml0d2lzZU9SLFxuICAgICAgICAnXic6IFByZWNlZGVuY2UuQml0d2lzZVhPUixcbiAgICAgICAgJyYnOiBQcmVjZWRlbmNlLkJpdHdpc2VBTkQsXG4gICAgICAgICc9PSc6IFByZWNlZGVuY2UuRXF1YWxpdHksXG4gICAgICAgICchPSc6IFByZWNlZGVuY2UuRXF1YWxpdHksXG4gICAgICAgICc9PT0nOiBQcmVjZWRlbmNlLkVxdWFsaXR5LFxuICAgICAgICAnIT09JzogUHJlY2VkZW5jZS5FcXVhbGl0eSxcbiAgICAgICAgJ2lzJzogUHJlY2VkZW5jZS5FcXVhbGl0eSxcbiAgICAgICAgJ2lzbnQnOiBQcmVjZWRlbmNlLkVxdWFsaXR5LFxuICAgICAgICAnPCc6IFByZWNlZGVuY2UuUmVsYXRpb25hbCxcbiAgICAgICAgJz4nOiBQcmVjZWRlbmNlLlJlbGF0aW9uYWwsXG4gICAgICAgICc8PSc6IFByZWNlZGVuY2UuUmVsYXRpb25hbCxcbiAgICAgICAgJz49JzogUHJlY2VkZW5jZS5SZWxhdGlvbmFsLFxuICAgICAgICAnaW4nOiBQcmVjZWRlbmNlLlJlbGF0aW9uYWwsXG4gICAgICAgICdpbnN0YW5jZW9mJzogUHJlY2VkZW5jZS5SZWxhdGlvbmFsLFxuICAgICAgICAnPDwnOiBQcmVjZWRlbmNlLkJpdHdpc2VTSElGVCxcbiAgICAgICAgJz4+JzogUHJlY2VkZW5jZS5CaXR3aXNlU0hJRlQsXG4gICAgICAgICc+Pj4nOiBQcmVjZWRlbmNlLkJpdHdpc2VTSElGVCxcbiAgICAgICAgJysnOiBQcmVjZWRlbmNlLkFkZGl0aXZlLFxuICAgICAgICAnLSc6IFByZWNlZGVuY2UuQWRkaXRpdmUsXG4gICAgICAgICcqJzogUHJlY2VkZW5jZS5NdWx0aXBsaWNhdGl2ZSxcbiAgICAgICAgJyUnOiBQcmVjZWRlbmNlLk11bHRpcGxpY2F0aXZlLFxuICAgICAgICAnLyc6IFByZWNlZGVuY2UuTXVsdGlwbGljYXRpdmVcbiAgICB9O1xuXG4gICAgLy9GbGFnc1xuICAgIHZhciBGX0FMTE9XX0lOID0gMSxcbiAgICAgICAgRl9BTExPV19DQUxMID0gMSA8PCAxLFxuICAgICAgICBGX0FMTE9XX1VOUEFSQVRIX05FVyA9IDEgPDwgMixcbiAgICAgICAgRl9GVU5DX0JPRFkgPSAxIDw8IDMsXG4gICAgICAgIEZfRElSRUNUSVZFX0NUWCA9IDEgPDwgNCxcbiAgICAgICAgRl9TRU1JQ09MT05fT1BUID0gMSA8PCA1O1xuXG4gICAgLy9FeHByZXNzaW9uIGZsYWcgc2V0c1xuICAgIC8vTk9URTogRmxhZyBvcmRlcjpcbiAgICAvLyBGX0FMTE9XX0lOXG4gICAgLy8gRl9BTExPV19DQUxMXG4gICAgLy8gRl9BTExPV19VTlBBUkFUSF9ORVdcbiAgICB2YXIgRV9GVFQgPSBGX0FMTE9XX0NBTEwgfCBGX0FMTE9XX1VOUEFSQVRIX05FVyxcbiAgICAgICAgRV9UVEYgPSBGX0FMTE9XX0lOIHwgRl9BTExPV19DQUxMLFxuICAgICAgICBFX1RUVCA9IEZfQUxMT1dfSU4gfCBGX0FMTE9XX0NBTEwgfCBGX0FMTE9XX1VOUEFSQVRIX05FVyxcbiAgICAgICAgRV9URkYgPSBGX0FMTE9XX0lOLFxuICAgICAgICBFX0ZGVCA9IEZfQUxMT1dfVU5QQVJBVEhfTkVXLFxuICAgICAgICBFX1RGVCA9IEZfQUxMT1dfSU4gfCBGX0FMTE9XX1VOUEFSQVRIX05FVztcblxuICAgIC8vU3RhdGVtZW50IGZsYWcgc2V0c1xuICAgIC8vTk9URTogRmxhZyBvcmRlcjpcbiAgICAvLyBGX0FMTE9XX0lOXG4gICAgLy8gRl9GVU5DX0JPRFlcbiAgICAvLyBGX0RJUkVDVElWRV9DVFhcbiAgICAvLyBGX1NFTUlDT0xPTl9PUFRcbiAgICB2YXIgU19URkZGID0gRl9BTExPV19JTixcbiAgICAgICAgU19URkZUID0gRl9BTExPV19JTiB8IEZfU0VNSUNPTE9OX09QVCxcbiAgICAgICAgU19GRkZGID0gMHgwMCxcbiAgICAgICAgU19URlRGID0gRl9BTExPV19JTiB8IEZfRElSRUNUSVZFX0NUWCxcbiAgICAgICAgU19UVEZGID0gRl9BTExPV19JTiB8IEZfRlVOQ19CT0RZO1xuXG4gICAgZnVuY3Rpb24gZ2V0RGVmYXVsdE9wdGlvbnMoKSB7XG4gICAgICAgIC8vIGRlZmF1bHQgb3B0aW9uc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5kZW50OiBudWxsLFxuICAgICAgICAgICAgYmFzZTogbnVsbCxcbiAgICAgICAgICAgIHBhcnNlOiBudWxsLFxuICAgICAgICAgICAgY29tbWVudDogZmFsc2UsXG4gICAgICAgICAgICBmb3JtYXQ6IHtcbiAgICAgICAgICAgICAgICBpbmRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICcgICAgJyxcbiAgICAgICAgICAgICAgICAgICAgYmFzZTogMCxcbiAgICAgICAgICAgICAgICAgICAgYWRqdXN0TXVsdGlsaW5lQ29tbWVudDogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG5ld2xpbmU6ICdcXG4nLFxuICAgICAgICAgICAgICAgIHNwYWNlOiAnICcsXG4gICAgICAgICAgICAgICAganNvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVudW1iZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGhleGFkZWNpbWFsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBxdW90ZXM6ICdzaW5nbGUnLFxuICAgICAgICAgICAgICAgIGVzY2FwZWxlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbXBhY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHBhcmVudGhlc2VzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNlbWljb2xvbnM6IHRydWUsXG4gICAgICAgICAgICAgICAgc2FmZUNvbmNhdGVuYXRpb246IGZhbHNlLFxuICAgICAgICAgICAgICAgIHByZXNlcnZlQmxhbmtMaW5lczogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb3o6IHtcbiAgICAgICAgICAgICAgICBjb21wcmVoZW5zaW9uRXhwcmVzc2lvblN0YXJ0c1dpdGhBc3NpZ25tZW50OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGFybGVzc0dlbmVyYXRvcjogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzb3VyY2VNYXA6IG51bGwsXG4gICAgICAgICAgICBzb3VyY2VNYXBSb290OiBudWxsLFxuICAgICAgICAgICAgc291cmNlTWFwV2l0aENvZGU6IGZhbHNlLFxuICAgICAgICAgICAgZGlyZWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIHJhdzogdHJ1ZSxcbiAgICAgICAgICAgIHZlcmJhdGltOiBudWxsLFxuICAgICAgICAgICAgc291cmNlQ29kZTogbnVsbFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0cmluZ1JlcGVhdChzdHIsIG51bSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XG5cbiAgICAgICAgZm9yIChudW0gfD0gMDsgbnVtID4gMDsgbnVtID4+Pj0gMSwgc3RyICs9IHN0cikge1xuICAgICAgICAgICAgaWYgKG51bSAmIDEpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gc3RyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYXNMaW5lVGVybWluYXRvcihzdHIpIHtcbiAgICAgICAgcmV0dXJuICgvW1xcclxcbl0vZykudGVzdChzdHIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZHNXaXRoTGluZVRlcm1pbmF0b3Ioc3RyKSB7XG4gICAgICAgIHZhciBsZW4gPSBzdHIubGVuZ3RoO1xuICAgICAgICByZXR1cm4gbGVuICYmIGVzdXRpbHMuY29kZS5pc0xpbmVUZXJtaW5hdG9yKHN0ci5jaGFyQ29kZUF0KGxlbiAtIDEpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZXJnZSh0YXJnZXQsIG92ZXJyaWRlKSB7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoa2V5IGluIG92ZXJyaWRlKSB7XG4gICAgICAgICAgICBpZiAob3ZlcnJpZGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gb3ZlcnJpZGVba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZURlZXBseSh0YXJnZXQsIG92ZXJyaWRlKSB7XG4gICAgICAgIHZhciBrZXksIHZhbDtcblxuICAgICAgICBmdW5jdGlvbiBpc0hhc2hPYmplY3QodGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ29iamVjdCcgJiYgdGFyZ2V0IGluc3RhbmNlb2YgT2JqZWN0ICYmICEodGFyZ2V0IGluc3RhbmNlb2YgUmVnRXhwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoa2V5IGluIG92ZXJyaWRlKSB7XG4gICAgICAgICAgICBpZiAob3ZlcnJpZGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIHZhbCA9IG92ZXJyaWRlW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKGlzSGFzaE9iamVjdCh2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0hhc2hPYmplY3QodGFyZ2V0W2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEZWVwbHkodGFyZ2V0W2tleV0sIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHVwZGF0ZURlZXBseSh7fSwgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gdmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlTnVtYmVyKHZhbHVlKSB7XG4gICAgICAgIHZhciByZXN1bHQsIHBvaW50LCB0ZW1wLCBleHBvbmVudCwgcG9zO1xuXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTnVtZXJpYyBsaXRlcmFsIHdob3NlIHZhbHVlIGlzIE5hTicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ051bWVyaWMgbGl0ZXJhbCB3aG9zZSB2YWx1ZSBpcyBuZWdhdGl2ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlID09PSAxIC8gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGpzb24gPyAnbnVsbCcgOiByZW51bWJlciA/ICcxZTQwMCcgOiAnMWUrNDAwJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdCA9ICcnICsgdmFsdWU7XG4gICAgICAgIGlmICghcmVudW1iZXIgfHwgcmVzdWx0Lmxlbmd0aCA8IDMpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBwb2ludCA9IHJlc3VsdC5pbmRleE9mKCcuJyk7XG4gICAgICAgIGlmICghanNvbiAmJiByZXN1bHQuY2hhckNvZGVBdCgwKSA9PT0gMHgzMCAgLyogMCAqLyAmJiBwb2ludCA9PT0gMSkge1xuICAgICAgICAgICAgcG9pbnQgPSAwO1xuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIHRlbXAgPSByZXN1bHQ7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKCdlKycsICdlJyk7XG4gICAgICAgIGV4cG9uZW50ID0gMDtcbiAgICAgICAgaWYgKChwb3MgPSB0ZW1wLmluZGV4T2YoJ2UnKSkgPiAwKSB7XG4gICAgICAgICAgICBleHBvbmVudCA9ICt0ZW1wLnNsaWNlKHBvcyArIDEpO1xuICAgICAgICAgICAgdGVtcCA9IHRlbXAuc2xpY2UoMCwgcG9zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9pbnQgPj0gMCkge1xuICAgICAgICAgICAgZXhwb25lbnQgLT0gdGVtcC5sZW5ndGggLSBwb2ludCAtIDE7XG4gICAgICAgICAgICB0ZW1wID0gKyh0ZW1wLnNsaWNlKDAsIHBvaW50KSArIHRlbXAuc2xpY2UocG9pbnQgKyAxKSkgKyAnJztcbiAgICAgICAgfVxuICAgICAgICBwb3MgPSAwO1xuICAgICAgICB3aGlsZSAodGVtcC5jaGFyQ29kZUF0KHRlbXAubGVuZ3RoICsgcG9zIC0gMSkgPT09IDB4MzAgIC8qIDAgKi8pIHtcbiAgICAgICAgICAgIC0tcG9zO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3MgIT09IDApIHtcbiAgICAgICAgICAgIGV4cG9uZW50IC09IHBvcztcbiAgICAgICAgICAgIHRlbXAgPSB0ZW1wLnNsaWNlKDAsIHBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV4cG9uZW50ICE9PSAwKSB7XG4gICAgICAgICAgICB0ZW1wICs9ICdlJyArIGV4cG9uZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmICgodGVtcC5sZW5ndGggPCByZXN1bHQubGVuZ3RoIHx8XG4gICAgICAgICAgICAgICAgICAgIChoZXhhZGVjaW1hbCAmJiB2YWx1ZSA+IDFlMTIgJiYgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlICYmICh0ZW1wID0gJzB4JyArIHZhbHVlLnRvU3RyaW5nKDE2KSkubGVuZ3RoIDwgcmVzdWx0Lmxlbmd0aCkpICYmXG4gICAgICAgICAgICAgICAgK3RlbXAgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0ZW1wO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvLyBHZW5lcmF0ZSB2YWxpZCBSZWdFeHAgZXhwcmVzc2lvbi5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9Db25zdGVsbGF0aW9uL2l2IEVuZ2luZVxuXG4gICAgZnVuY3Rpb24gZXNjYXBlUmVnRXhwQ2hhcmFjdGVyKGNoLCBwcmV2aW91c0lzQmFja3NsYXNoKSB7XG4gICAgICAgIC8vIG5vdCBoYW5kbGluZyAnXFwnIGFuZCBoYW5kbGluZyBcXHUyMDI4IG9yIFxcdTIwMjkgdG8gdW5pY29kZSBlc2NhcGUgc2VxdWVuY2VcbiAgICAgICAgaWYgKChjaCAmIH4xKSA9PT0gMHgyMDI4KSB7XG4gICAgICAgICAgICByZXR1cm4gKHByZXZpb3VzSXNCYWNrc2xhc2ggPyAndScgOiAnXFxcXHUnKSArICgoY2ggPT09IDB4MjAyOCkgPyAnMjAyOCcgOiAnMjAyOScpO1xuICAgICAgICB9IGVsc2UgaWYgKGNoID09PSAxMCB8fCBjaCA9PT0gMTMpIHsgIC8vIFxcbiwgXFxyXG4gICAgICAgICAgICByZXR1cm4gKHByZXZpb3VzSXNCYWNrc2xhc2ggPyAnJyA6ICdcXFxcJykgKyAoKGNoID09PSAxMCkgPyAnbicgOiAncicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZVJlZ0V4cChyZWcpIHtcbiAgICAgICAgdmFyIG1hdGNoLCByZXN1bHQsIGZsYWdzLCBpLCBpeiwgY2gsIGNoYXJhY3RlckluQnJhY2ssIHByZXZpb3VzSXNCYWNrc2xhc2g7XG5cbiAgICAgICAgcmVzdWx0ID0gcmVnLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgaWYgKHJlZy5zb3VyY2UpIHtcbiAgICAgICAgICAgIC8vIGV4dHJhY3QgZmxhZyBmcm9tIHRvU3RyaW5nIHJlc3VsdFxuICAgICAgICAgICAgbWF0Y2ggPSByZXN1bHQubWF0Y2goL1xcLyhbXi9dKikkLyk7XG4gICAgICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmxhZ3MgPSBtYXRjaFsxXTtcbiAgICAgICAgICAgIHJlc3VsdCA9ICcnO1xuXG4gICAgICAgICAgICBjaGFyYWN0ZXJJbkJyYWNrID0gZmFsc2U7XG4gICAgICAgICAgICBwcmV2aW91c0lzQmFja3NsYXNoID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBpeiA9IHJlZy5zb3VyY2UubGVuZ3RoOyBpIDwgaXo7ICsraSkge1xuICAgICAgICAgICAgICAgIGNoID0gcmVnLnNvdXJjZS5jaGFyQ29kZUF0KGkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFwcmV2aW91c0lzQmFja3NsYXNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJJbkJyYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2ggPT09IDkzKSB7ICAvLyBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVySW5CcmFjayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoID09PSA0NykgeyAgLy8gL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSAnXFxcXCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoID09PSA5MSkgeyAgLy8gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlckluQnJhY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBlc2NhcGVSZWdFeHBDaGFyYWN0ZXIoY2gsIHByZXZpb3VzSXNCYWNrc2xhc2gpO1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0lzQmFja3NsYXNoID0gY2ggPT09IDkyOyAgLy8gXFxcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBuZXcgUmVnRXhwKFwiXFxcXFxcbicpIGlzIHByb3ZpZGVkLCBjcmVhdGUgL1xcbi9cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGVzY2FwZVJlZ0V4cENoYXJhY3RlcihjaCwgcHJldmlvdXNJc0JhY2tzbGFzaCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHByZXZlbnQgbGlrZSAvXFxcXFsvXS9cbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNJc0JhY2tzbGFzaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICcvJyArIHJlc3VsdCArICcvJyArIGZsYWdzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlc2NhcGVBbGxvd2VkQ2hhcmFjdGVyKGNvZGUsIG5leHQpIHtcbiAgICAgICAgdmFyIGhleDtcblxuICAgICAgICBpZiAoY29kZSA9PT0gMHgwOCAgLyogXFxiICovKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1xcXFxiJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2RlID09PSAweDBDICAvKiBcXGYgKi8pIHtcbiAgICAgICAgICAgIHJldHVybiAnXFxcXGYnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvZGUgPT09IDB4MDkgIC8qIFxcdCAqLykge1xuICAgICAgICAgICAgcmV0dXJuICdcXFxcdCc7XG4gICAgICAgIH1cblxuICAgICAgICBoZXggPSBjb2RlLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBpZiAoanNvbiB8fCBjb2RlID4gMHhGRikge1xuICAgICAgICAgICAgcmV0dXJuICdcXFxcdScgKyAnMDAwMCcuc2xpY2UoaGV4Lmxlbmd0aCkgKyBoZXg7XG4gICAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMHgwMDAwICYmICFlc3V0aWxzLmNvZGUuaXNEZWNpbWFsRGlnaXQobmV4dCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnXFxcXDAnO1xuICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4MDAwQiAgLyogXFx2ICovKSB7IC8vICdcXHYnXG4gICAgICAgICAgICByZXR1cm4gJ1xcXFx4MEInO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdcXFxceCcgKyAnMDAnLnNsaWNlKGhleC5sZW5ndGgpICsgaGV4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXNjYXBlRGlzYWxsb3dlZENoYXJhY3Rlcihjb2RlKSB7XG4gICAgICAgIGlmIChjb2RlID09PSAweDVDICAvKiBcXCAqLykge1xuICAgICAgICAgICAgcmV0dXJuICdcXFxcXFxcXCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29kZSA9PT0gMHgwQSAgLyogXFxuICovKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1xcXFxuJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2RlID09PSAweDBEICAvKiBcXHIgKi8pIHtcbiAgICAgICAgICAgIHJldHVybiAnXFxcXHInO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvZGUgPT09IDB4MjAyOCkge1xuICAgICAgICAgICAgcmV0dXJuICdcXFxcdTIwMjgnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvZGUgPT09IDB4MjAyOSkge1xuICAgICAgICAgICAgcmV0dXJuICdcXFxcdTIwMjknO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3RseSBjbGFzc2lmaWVkIGNoYXJhY3RlcicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVzY2FwZURpcmVjdGl2ZShzdHIpIHtcbiAgICAgICAgdmFyIGksIGl6LCBjb2RlLCBxdW90ZTtcblxuICAgICAgICBxdW90ZSA9IHF1b3RlcyA9PT0gJ2RvdWJsZScgPyAnXCInIDogJ1xcJyc7XG4gICAgICAgIGZvciAoaSA9IDAsIGl6ID0gc3RyLmxlbmd0aDsgaSA8IGl6OyArK2kpIHtcbiAgICAgICAgICAgIGNvZGUgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgIGlmIChjb2RlID09PSAweDI3ICAvKiAnICovKSB7XG4gICAgICAgICAgICAgICAgcXVvdGUgPSAnXCInO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb2RlID09PSAweDIyICAvKiBcIiAqLykge1xuICAgICAgICAgICAgICAgIHF1b3RlID0gJ1xcJyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4NUMgIC8qIFxcICovKSB7XG4gICAgICAgICAgICAgICAgKytpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHF1b3RlICsgc3RyICsgcXVvdGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXNjYXBlU3RyaW5nKHN0cikge1xuICAgICAgICB2YXIgcmVzdWx0ID0gJycsIGksIGxlbiwgY29kZSwgc2luZ2xlUXVvdGVzID0gMCwgZG91YmxlUXVvdGVzID0gMCwgc2luZ2xlLCBxdW90ZTtcblxuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBzdHIubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIGNvZGUgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgIGlmIChjb2RlID09PSAweDI3ICAvKiAnICovKSB7XG4gICAgICAgICAgICAgICAgKytzaW5nbGVRdW90ZXM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4MjIgIC8qIFwiICovKSB7XG4gICAgICAgICAgICAgICAgKytkb3VibGVRdW90ZXM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4MkYgIC8qIC8gKi8gJiYganNvbikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSAnXFxcXCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVzdXRpbHMuY29kZS5pc0xpbmVUZXJtaW5hdG9yKGNvZGUpIHx8IGNvZGUgPT09IDB4NUMgIC8qIFxcICovKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGVzY2FwZURpc2FsbG93ZWRDaGFyYWN0ZXIoY29kZSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFlc3V0aWxzLmNvZGUuaXNJZGVudGlmaWVyUGFydEVTNShjb2RlKSAmJiAoanNvbiAmJiBjb2RlIDwgMHgyMCAgLyogU1AgKi8gfHwgIWpzb24gJiYgIWVzY2FwZWxlc3MgJiYgKGNvZGUgPCAweDIwICAvKiBTUCAqLyB8fCBjb2RlID4gMHg3RSAgLyogfiAqLykpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGVzY2FwZUFsbG93ZWRDaGFyYWN0ZXIoY29kZSwgc3RyLmNoYXJDb2RlQXQoaSArIDEpKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2luZ2xlID0gIShxdW90ZXMgPT09ICdkb3VibGUnIHx8IChxdW90ZXMgPT09ICdhdXRvJyAmJiBkb3VibGVRdW90ZXMgPCBzaW5nbGVRdW90ZXMpKTtcbiAgICAgICAgcXVvdGUgPSBzaW5nbGUgPyAnXFwnJyA6ICdcIic7XG5cbiAgICAgICAgaWYgKCEoc2luZ2xlID8gc2luZ2xlUXVvdGVzIDogZG91YmxlUXVvdGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHF1b3RlICsgcmVzdWx0ICsgcXVvdGU7XG4gICAgICAgIH1cblxuICAgICAgICBzdHIgPSByZXN1bHQ7XG4gICAgICAgIHJlc3VsdCA9IHF1b3RlO1xuXG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHN0ci5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgY29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgaWYgKChjb2RlID09PSAweDI3ICAvKiAnICovICYmIHNpbmdsZSkgfHwgKGNvZGUgPT09IDB4MjIgIC8qIFwiICovICYmICFzaW5nbGUpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9ICdcXFxcJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdCArIHF1b3RlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGZsYXR0ZW4gYW4gYXJyYXkgdG8gYSBzdHJpbmcsIHdoZXJlIHRoZSBhcnJheSBjYW4gY29udGFpblxuICAgICAqIGVpdGhlciBzdHJpbmdzIG9yIG5lc3RlZCBhcnJheXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmbGF0dGVuVG9TdHJpbmcoYXJyKSB7XG4gICAgICAgIHZhciBpLCBpeiwgZWxlbSwgcmVzdWx0ID0gJyc7XG4gICAgICAgIGZvciAoaSA9IDAsIGl6ID0gYXJyLmxlbmd0aDsgaSA8IGl6OyArK2kpIHtcbiAgICAgICAgICAgIGVsZW0gPSBhcnJbaV07XG4gICAgICAgICAgICByZXN1bHQgKz0gQXJyYXkuaXNBcnJheShlbGVtKSA/IGZsYXR0ZW5Ub1N0cmluZyhlbGVtKSA6IGVsZW07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb252ZXJ0IGdlbmVyYXRlZCB0byBhIFNvdXJjZU5vZGUgd2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0b1NvdXJjZU5vZGVXaGVuTmVlZGVkKGdlbmVyYXRlZCwgbm9kZSkge1xuICAgICAgICBpZiAoIXNvdXJjZU1hcCkge1xuICAgICAgICAgICAgLy8gd2l0aCBubyBzb3VyY2UgbWFwcywgZ2VuZXJhdGVkIGlzIGVpdGhlciBhblxuICAgICAgICAgICAgLy8gYXJyYXkgb3IgYSBzdHJpbmcuICBpZiBhbiBhcnJheSwgZmxhdHRlbiBpdC5cbiAgICAgICAgICAgIC8vIGlmIGEgc3RyaW5nLCBqdXN0IHJldHVybiBpdFxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZ2VuZXJhdGVkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbGF0dGVuVG9TdHJpbmcoZ2VuZXJhdGVkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoZ2VuZXJhdGVkIGluc3RhbmNlb2YgU291cmNlTm9kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGUgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5sb2MgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTb3VyY2VOb2RlKG51bGwsIG51bGwsIHNvdXJjZU1hcCwgZ2VuZXJhdGVkLCBub2RlLm5hbWUgfHwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBTb3VyY2VOb2RlKG5vZGUubG9jLnN0YXJ0LmxpbmUsIG5vZGUubG9jLnN0YXJ0LmNvbHVtbiwgKHNvdXJjZU1hcCA9PT0gdHJ1ZSA/IG5vZGUubG9jLnNvdXJjZSB8fCBudWxsIDogc291cmNlTWFwKSwgZ2VuZXJhdGVkLCBub2RlLm5hbWUgfHwgbnVsbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbm9FbXB0eVNwYWNlKCkge1xuICAgICAgICByZXR1cm4gKHNwYWNlKSA/IHNwYWNlIDogJyAnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGpvaW4obGVmdCwgcmlnaHQpIHtcbiAgICAgICAgdmFyIGxlZnRTb3VyY2UsXG4gICAgICAgICAgICByaWdodFNvdXJjZSxcbiAgICAgICAgICAgIGxlZnRDaGFyQ29kZSxcbiAgICAgICAgICAgIHJpZ2h0Q2hhckNvZGU7XG5cbiAgICAgICAgbGVmdFNvdXJjZSA9IHRvU291cmNlTm9kZVdoZW5OZWVkZWQobGVmdCkudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKGxlZnRTb3VyY2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gW3JpZ2h0XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJpZ2h0U291cmNlID0gdG9Tb3VyY2VOb2RlV2hlbk5lZWRlZChyaWdodCkudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKHJpZ2h0U291cmNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFtsZWZ0XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxlZnRDaGFyQ29kZSA9IGxlZnRTb3VyY2UuY2hhckNvZGVBdChsZWZ0U291cmNlLmxlbmd0aCAtIDEpO1xuICAgICAgICByaWdodENoYXJDb2RlID0gcmlnaHRTb3VyY2UuY2hhckNvZGVBdCgwKTtcblxuICAgICAgICBpZiAoKGxlZnRDaGFyQ29kZSA9PT0gMHgyQiAgLyogKyAqLyB8fCBsZWZ0Q2hhckNvZGUgPT09IDB4MkQgIC8qIC0gKi8pICYmIGxlZnRDaGFyQ29kZSA9PT0gcmlnaHRDaGFyQ29kZSB8fFxuICAgICAgICAgICAgZXN1dGlscy5jb2RlLmlzSWRlbnRpZmllclBhcnRFUzUobGVmdENoYXJDb2RlKSAmJiBlc3V0aWxzLmNvZGUuaXNJZGVudGlmaWVyUGFydEVTNShyaWdodENoYXJDb2RlKSB8fFxuICAgICAgICAgICAgbGVmdENoYXJDb2RlID09PSAweDJGICAvKiAvICovICYmIHJpZ2h0Q2hhckNvZGUgPT09IDB4NjkgIC8qIGkgKi8pIHsgLy8gaW5maXggd29yZCBvcGVyYXRvcnMgYWxsIHN0YXJ0IHdpdGggYGlgXG4gICAgICAgICAgICByZXR1cm4gW2xlZnQsIG5vRW1wdHlTcGFjZSgpLCByaWdodF07XG4gICAgICAgIH0gZWxzZSBpZiAoZXN1dGlscy5jb2RlLmlzV2hpdGVTcGFjZShsZWZ0Q2hhckNvZGUpIHx8IGVzdXRpbHMuY29kZS5pc0xpbmVUZXJtaW5hdG9yKGxlZnRDaGFyQ29kZSkgfHxcbiAgICAgICAgICAgICAgICBlc3V0aWxzLmNvZGUuaXNXaGl0ZVNwYWNlKHJpZ2h0Q2hhckNvZGUpIHx8IGVzdXRpbHMuY29kZS5pc0xpbmVUZXJtaW5hdG9yKHJpZ2h0Q2hhckNvZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gW2xlZnQsIHJpZ2h0XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2xlZnQsIHNwYWNlLCByaWdodF07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkSW5kZW50KHN0bXQpIHtcbiAgICAgICAgcmV0dXJuIFtiYXNlLCBzdG10XTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3aXRoSW5kZW50KGZuKSB7XG4gICAgICAgIHZhciBwcmV2aW91c0Jhc2U7XG4gICAgICAgIHByZXZpb3VzQmFzZSA9IGJhc2U7XG4gICAgICAgIGJhc2UgKz0gaW5kZW50O1xuICAgICAgICBmbihiYXNlKTtcbiAgICAgICAgYmFzZSA9IHByZXZpb3VzQmFzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVTcGFjZXMoc3RyKSB7XG4gICAgICAgIHZhciBpO1xuICAgICAgICBmb3IgKGkgPSBzdHIubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGlmIChlc3V0aWxzLmNvZGUuaXNMaW5lVGVybWluYXRvcihzdHIuY2hhckNvZGVBdChpKSkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHN0ci5sZW5ndGggLSAxKSAtIGk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRqdXN0TXVsdGlsaW5lQ29tbWVudCh2YWx1ZSwgc3BlY2lhbEJhc2UpIHtcbiAgICAgICAgdmFyIGFycmF5LCBpLCBsZW4sIGxpbmUsIGosIHNwYWNlcywgcHJldmlvdXNCYXNlLCBzbjtcblxuICAgICAgICBhcnJheSA9IHZhbHVlLnNwbGl0KC9cXHJcXG58W1xcclxcbl0vKTtcbiAgICAgICAgc3BhY2VzID0gTnVtYmVyLk1BWF9WQUxVRTtcblxuICAgICAgICAvLyBmaXJzdCBsaW5lIGRvZXNuJ3QgaGF2ZSBpbmRlbnRhdGlvblxuICAgICAgICBmb3IgKGkgPSAxLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgbGluZSA9IGFycmF5W2ldO1xuICAgICAgICAgICAgaiA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaiA8IGxpbmUubGVuZ3RoICYmIGVzdXRpbHMuY29kZS5pc1doaXRlU3BhY2UobGluZS5jaGFyQ29kZUF0KGopKSkge1xuICAgICAgICAgICAgICAgICsrajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzcGFjZXMgPiBqKSB7XG4gICAgICAgICAgICAgICAgc3BhY2VzID0gajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2Ygc3BlY2lhbEJhc2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvLyBwYXR0ZXJuIGxpa2VcbiAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgIC8vICAgdmFyIHQgPSAyMDsgIC8qXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgKiB0aGlzIGlzIGNvbW1lbnRcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgcHJldmlvdXNCYXNlID0gYmFzZTtcbiAgICAgICAgICAgIGlmIChhcnJheVsxXVtzcGFjZXNdID09PSAnKicpIHtcbiAgICAgICAgICAgICAgICBzcGVjaWFsQmFzZSArPSAnICc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiYXNlID0gc3BlY2lhbEJhc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoc3BhY2VzICYgMSkge1xuICAgICAgICAgICAgICAgIC8vIC8qXG4gICAgICAgICAgICAgICAgLy8gICpcbiAgICAgICAgICAgICAgICAvLyAgKi9cbiAgICAgICAgICAgICAgICAvLyBJZiBzcGFjZXMgYXJlIG9kZCBudW1iZXIsIGFib3ZlIHBhdHRlcm4gaXMgY29uc2lkZXJlZC5cbiAgICAgICAgICAgICAgICAvLyBXZSB3YXN0ZSAxIHNwYWNlLlxuICAgICAgICAgICAgICAgIC0tc3BhY2VzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlvdXNCYXNlID0gYmFzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDEsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICBzbiA9IHRvU291cmNlTm9kZVdoZW5OZWVkZWQoYWRkSW5kZW50KGFycmF5W2ldLnNsaWNlKHNwYWNlcykpKTtcbiAgICAgICAgICAgIGFycmF5W2ldID0gc291cmNlTWFwID8gc24uam9pbignJykgOiBzbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJhc2UgPSBwcmV2aW91c0Jhc2U7XG5cbiAgICAgICAgcmV0dXJuIGFycmF5LmpvaW4oJ1xcbicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlQ29tbWVudChjb21tZW50LCBzcGVjaWFsQmFzZSkge1xuICAgICAgICBpZiAoY29tbWVudC50eXBlID09PSAnTGluZScpIHtcbiAgICAgICAgICAgIGlmIChlbmRzV2l0aExpbmVUZXJtaW5hdG9yKGNvbW1lbnQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcvLycgKyBjb21tZW50LnZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBBbHdheXMgdXNlIExpbmVUZXJtaW5hdG9yXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICcvLycgKyBjb21tZW50LnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICghcHJlc2VydmVCbGFua0xpbmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSAnXFxuJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXh0cmEuZm9ybWF0LmluZGVudC5hZGp1c3RNdWx0aWxpbmVDb21tZW50ICYmIC9bXFxuXFxyXS8udGVzdChjb21tZW50LnZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGFkanVzdE11bHRpbGluZUNvbW1lbnQoJy8qJyArIGNvbW1lbnQudmFsdWUgKyAnKi8nLCBzcGVjaWFsQmFzZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcvKicgKyBjb21tZW50LnZhbHVlICsgJyovJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRDb21tZW50cyhzdG10LCByZXN1bHQpIHtcbiAgICAgICAgdmFyIGksIGxlbiwgY29tbWVudCwgc2F2ZSwgdGFpbGluZ1RvU3RhdGVtZW50LCBzcGVjaWFsQmFzZSwgZnJhZ21lbnQsXG4gICAgICAgICAgICBleHRSYW5nZSwgcmFuZ2UsIHByZXZSYW5nZSwgcHJlZml4LCBpbmZpeCwgc3VmZml4LCBjb3VudDtcblxuICAgICAgICBpZiAoc3RtdC5sZWFkaW5nQ29tbWVudHMgJiYgc3RtdC5sZWFkaW5nQ29tbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2F2ZSA9IHJlc3VsdDtcblxuICAgICAgICAgICAgaWYgKHByZXNlcnZlQmxhbmtMaW5lcykge1xuICAgICAgICAgICAgICAgIGNvbW1lbnQgPSBzdG10LmxlYWRpbmdDb21tZW50c1swXTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBbXTtcblxuICAgICAgICAgICAgICAgIGV4dFJhbmdlID0gY29tbWVudC5leHRlbmRlZFJhbmdlO1xuICAgICAgICAgICAgICAgIHJhbmdlID0gY29tbWVudC5yYW5nZTtcblxuICAgICAgICAgICAgICAgIHByZWZpeCA9IHNvdXJjZUNvZGUuc3Vic3RyaW5nKGV4dFJhbmdlWzBdLCByYW5nZVswXSk7XG4gICAgICAgICAgICAgICAgY291bnQgPSAocHJlZml4Lm1hdGNoKC9cXG4vZykgfHwgW10pLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHN0cmluZ1JlcGVhdCgnXFxuJywgY291bnQpKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYWRkSW5kZW50KGdlbmVyYXRlQ29tbWVudChjb21tZW50KSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHByZWZpeCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGdlbmVyYXRlQ29tbWVudChjb21tZW50KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJldlJhbmdlID0gcmFuZ2U7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAxLCBsZW4gPSBzdG10LmxlYWRpbmdDb21tZW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb21tZW50ID0gc3RtdC5sZWFkaW5nQ29tbWVudHNbaV07XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gY29tbWVudC5yYW5nZTtcblxuICAgICAgICAgICAgICAgICAgICBpbmZpeCA9IHNvdXJjZUNvZGUuc3Vic3RyaW5nKHByZXZSYW5nZVsxXSwgcmFuZ2VbMF0pO1xuICAgICAgICAgICAgICAgICAgICBjb3VudCA9IChpbmZpeC5tYXRjaCgvXFxuL2cpIHx8IFtdKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHN0cmluZ1JlcGVhdCgnXFxuJywgY291bnQpKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYWRkSW5kZW50KGdlbmVyYXRlQ29tbWVudChjb21tZW50KSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHByZXZSYW5nZSA9IHJhbmdlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN1ZmZpeCA9IHNvdXJjZUNvZGUuc3Vic3RyaW5nKHJhbmdlWzFdLCBleHRSYW5nZVsxXSk7XG4gICAgICAgICAgICAgICAgY291bnQgPSAoc3VmZml4Lm1hdGNoKC9cXG4vZykgfHwgW10pLmxlbmd0aDtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChzdHJpbmdSZXBlYXQoJ1xcbicsIGNvdW50KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbW1lbnQgPSBzdG10LmxlYWRpbmdDb21tZW50c1swXTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAoc2FmZUNvbmNhdGVuYXRpb24gJiYgc3RtdC50eXBlID09PSBTeW50YXguUHJvZ3JhbSAmJiBzdG10LmJvZHkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCdcXG4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZ2VuZXJhdGVDb21tZW50KGNvbW1lbnQpKTtcbiAgICAgICAgICAgICAgICBpZiAoIWVuZHNXaXRoTGluZVRlcm1pbmF0b3IodG9Tb3VyY2VOb2RlV2hlbk5lZWRlZChyZXN1bHQpLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCdcXG4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAxLCBsZW4gPSBzdG10LmxlYWRpbmdDb21tZW50cy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBjb21tZW50ID0gc3RtdC5sZWFkaW5nQ29tbWVudHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gW2dlbmVyYXRlQ29tbWVudChjb21tZW50KV07XG4gICAgICAgICAgICAgICAgICAgIGlmICghZW5kc1dpdGhMaW5lVGVybWluYXRvcih0b1NvdXJjZU5vZGVXaGVuTmVlZGVkKGZyYWdtZW50KS50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQucHVzaCgnXFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYWRkSW5kZW50KGZyYWdtZW50KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQucHVzaChhZGRJbmRlbnQoc2F2ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0bXQudHJhaWxpbmdDb21tZW50cykge1xuXG4gICAgICAgICAgICBpZiAocHJlc2VydmVCbGFua0xpbmVzKSB7XG4gICAgICAgICAgICAgICAgY29tbWVudCA9IHN0bXQudHJhaWxpbmdDb21tZW50c1swXTtcbiAgICAgICAgICAgICAgICBleHRSYW5nZSA9IGNvbW1lbnQuZXh0ZW5kZWRSYW5nZTtcbiAgICAgICAgICAgICAgICByYW5nZSA9IGNvbW1lbnQucmFuZ2U7XG5cbiAgICAgICAgICAgICAgICBwcmVmaXggPSBzb3VyY2VDb2RlLnN1YnN0cmluZyhleHRSYW5nZVswXSwgcmFuZ2VbMF0pO1xuICAgICAgICAgICAgICAgIGNvdW50ID0gKHByZWZpeC5tYXRjaCgvXFxuL2cpIHx8IFtdKS5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHN0cmluZ1JlcGVhdCgnXFxuJywgY291bnQpKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYWRkSW5kZW50KGdlbmVyYXRlQ29tbWVudChjb21tZW50KSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHByZWZpeCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGdlbmVyYXRlQ29tbWVudChjb21tZW50KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YWlsaW5nVG9TdGF0ZW1lbnQgPSAhZW5kc1dpdGhMaW5lVGVybWluYXRvcih0b1NvdXJjZU5vZGVXaGVuTmVlZGVkKHJlc3VsdCkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgc3BlY2lhbEJhc2UgPSBzdHJpbmdSZXBlYXQoJyAnLCBjYWxjdWxhdGVTcGFjZXModG9Tb3VyY2VOb2RlV2hlbk5lZWRlZChbYmFzZSwgcmVzdWx0LCBpbmRlbnRdKS50b1N0cmluZygpKSk7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gc3RtdC50cmFpbGluZ0NvbW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnQgPSBzdG10LnRyYWlsaW5nQ29tbWVudHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWlsaW5nVG9TdGF0ZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGFzc3VtZSB0YXJnZXQgbGlrZSBmb2xsb3dpbmcgc2NyaXB0XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIHQgPSAyMDsgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAqIFRoaXMgaXMgY29tbWVudCBvZiB0XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZpcnN0IGNhc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbcmVzdWx0LCBpbmRlbnRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbcmVzdWx0LCBzcGVjaWFsQmFzZV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChnZW5lcmF0ZUNvbW1lbnQoY29tbWVudCwgc3BlY2lhbEJhc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFtyZXN1bHQsIGFkZEluZGVudChnZW5lcmF0ZUNvbW1lbnQoY29tbWVudCkpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gbGVuIC0gMSAmJiAhZW5kc1dpdGhMaW5lVGVybWluYXRvcih0b1NvdXJjZU5vZGVXaGVuTmVlZGVkKHJlc3VsdCkudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFtyZXN1bHQsICdcXG4nXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVCbGFua0xpbmVzKHN0YXJ0LCBlbmQsIHJlc3VsdCkge1xuICAgICAgICB2YXIgaiwgbmV3bGluZUNvdW50ID0gMDtcblxuICAgICAgICBmb3IgKGogPSBzdGFydDsgaiA8IGVuZDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoc291cmNlQ29kZVtqXSA9PT0gJ1xcbicpIHtcbiAgICAgICAgICAgICAgICBuZXdsaW5lQ291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaiA9IDE7IGogPCBuZXdsaW5lQ291bnQ7IGorKykge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3bGluZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJlbnRoZXNpemUodGV4dCwgY3VycmVudCwgc2hvdWxkKSB7XG4gICAgICAgIGlmIChjdXJyZW50IDwgc2hvdWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gWycoJywgdGV4dCwgJyknXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZVZlcmJhdGltU3RyaW5nKHN0cmluZykge1xuICAgICAgICB2YXIgaSwgaXosIHJlc3VsdDtcbiAgICAgICAgcmVzdWx0ID0gc3RyaW5nLnNwbGl0KC9cXHJcXG58XFxuLyk7XG4gICAgICAgIGZvciAoaSA9IDEsIGl6ID0gcmVzdWx0Lmxlbmd0aDsgaSA8IGl6OyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdFtpXSA9IG5ld2xpbmUgKyBiYXNlICsgcmVzdWx0W2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVWZXJiYXRpbShleHByLCBwcmVjZWRlbmNlKSB7XG4gICAgICAgIHZhciB2ZXJiYXRpbSwgcmVzdWx0LCBwcmVjO1xuICAgICAgICB2ZXJiYXRpbSA9IGV4cHJbZXh0cmEudmVyYmF0aW1dO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdmVyYmF0aW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBwYXJlbnRoZXNpemUoZ2VuZXJhdGVWZXJiYXRpbVN0cmluZyh2ZXJiYXRpbSksIFByZWNlZGVuY2UuU2VxdWVuY2UsIHByZWNlZGVuY2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdmVyYmF0aW0gaXMgb2JqZWN0XG4gICAgICAgICAgICByZXN1bHQgPSBnZW5lcmF0ZVZlcmJhdGltU3RyaW5nKHZlcmJhdGltLmNvbnRlbnQpO1xuICAgICAgICAgICAgcHJlYyA9ICh2ZXJiYXRpbS5wcmVjZWRlbmNlICE9IG51bGwpID8gdmVyYmF0aW0ucHJlY2VkZW5jZSA6IFByZWNlZGVuY2UuU2VxdWVuY2U7XG4gICAgICAgICAgICByZXN1bHQgPSBwYXJlbnRoZXNpemUocmVzdWx0LCBwcmVjLCBwcmVjZWRlbmNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b1NvdXJjZU5vZGVXaGVuTmVlZGVkKHJlc3VsdCwgZXhwcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gQ29kZUdlbmVyYXRvcigpIHtcbiAgICB9XG5cbiAgICAvLyBIZWxwZXJzLlxuXG4gICAgQ29kZUdlbmVyYXRvci5wcm90b3R5cGUubWF5YmVCbG9jayA9IGZ1bmN0aW9uKHN0bXQsIGZsYWdzKSB7XG4gICAgICAgIHZhciByZXN1bHQsIG5vTGVhZGluZ0NvbW1lbnQsIHRoYXQgPSB0aGlzO1xuXG4gICAgICAgIG5vTGVhZGluZ0NvbW1lbnQgPSAhZXh0cmEuY29tbWVudCB8fCAhc3RtdC5sZWFkaW5nQ29tbWVudHM7XG5cbiAgICAgICAgaWYgKHN0bXQudHlwZSA9PT0gU3ludGF4LkJsb2NrU3RhdGVtZW50ICYmIG5vTGVhZGluZ0NvbW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBbc3BhY2UsIHRoaXMuZ2VuZXJhdGVTdGF0ZW1lbnQoc3RtdCwgZmxhZ3MpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdG10LnR5cGUgPT09IFN5bnRheC5FbXB0eVN0YXRlbWVudCAmJiBub0xlYWRpbmdDb21tZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gJzsnO1xuICAgICAgICB9XG5cbiAgICAgICAgd2l0aEluZGVudChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBbXG4gICAgICAgICAgICAgICAgbmV3bGluZSxcbiAgICAgICAgICAgICAgICBhZGRJbmRlbnQodGhhdC5nZW5lcmF0ZVN0YXRlbWVudChzdG10LCBmbGFncykpXG4gICAgICAgICAgICBdO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICBDb2RlR2VuZXJhdG9yLnByb3RvdHlwZS5tYXliZUJsb2NrU3VmZml4ID0gZnVuY3Rpb24gKHN0bXQsIHJlc3VsdCkge1xuICAgICAgICB2YXIgZW5kcyA9IGVuZHNXaXRoTGluZVRlcm1pbmF0b3IodG9Tb3VyY2VOb2RlV2hlbk5lZWRlZChyZXN1bHQpLnRvU3RyaW5nKCkpO1xuICAgICAgICBpZiAoc3RtdC50eXBlID09PSBTeW50YXguQmxvY2tTdGF0ZW1lbnQgJiYgKCFleHRyYS5jb21tZW50IHx8ICFzdG10LmxlYWRpbmdDb21tZW50cykgJiYgIWVuZHMpIHtcbiAgICAgICAgICAgIHJldHVybiBbcmVzdWx0LCBzcGFjZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVuZHMpIHtcbiAgICAgICAgICAgIHJldHVybiBbcmVzdWx0LCBiYXNlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3Jlc3VsdCwgbmV3bGluZSwgYmFzZV07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlSWRlbnRpZmllcihub2RlKSB7XG4gICAgICAgIHJldHVybiB0b1NvdXJjZU5vZGVXaGVuTmVlZGVkKG5vZGUubmFtZSwgbm9kZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVBc3luY1ByZWZpeChub2RlLCBzcGFjZVJlcXVpcmVkKSB7XG4gICAgICAgIHJldHVybiBub2RlLmFzeW5jID8gJ2FzeW5jJyArIChzcGFjZVJlcXVpcmVkID8gbm9FbXB0eVNwYWNlKCkgOiBzcGFjZSkgOiAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZVN0YXJTdWZmaXgobm9kZSkge1xuICAgICAgICB2YXIgaXNHZW5lcmF0b3IgPSBub2RlLmdlbmVyYXRvciAmJiAhZXh0cmEubW96LnN0YXJsZXNzR2VuZXJhdG9yO1xuICAgICAgICByZXR1cm4gaXNHZW5lcmF0b3IgPyAnKicgKyBzcGFjZSA6ICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlTWV0aG9kUHJlZml4KHByb3ApIHtcbiAgICAgICAgdmFyIGZ1bmMgPSBwcm9wLnZhbHVlLCBwcmVmaXggPSAnJztcbiAgICAgICAgaWYgKGZ1bmMuYXN5bmMpIHtcbiAgICAgICAgICAgIHByZWZpeCArPSBnZW5lcmF0ZUFzeW5jUHJlZml4KGZ1bmMsICFwcm9wLmNvbXB1dGVkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZnVuYy5nZW5lcmF0b3IpIHtcbiAgICAgICAgICAgIC8vIGF2b2lkIHNwYWNlIGJlZm9yZSBtZXRob2QgbmFtZVxuICAgICAgICAgICAgcHJlZml4ICs9IGdlbmVyYXRlU3RhclN1ZmZpeChmdW5jKSA/ICcqJyA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmVmaXg7XG4gICAgfVxuXG4gICAgQ29kZUdlbmVyYXRvci5wcm90b3R5cGUuZ2VuZXJhdGVQYXR0ZXJuID0gZnVuY3Rpb24gKG5vZGUsIHByZWNlZGVuY2UsIGZsYWdzKSB7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09IFN5bnRheC5JZGVudGlmaWVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVJZGVudGlmaWVyKG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlRXhwcmVzc2lvbihub2RlLCBwcmVjZWRlbmNlLCBmbGFncyk7XG4gICAgfTtcblxuICAgIENvZGVHZW5lcmF0b3IucHJvdG90eXBlLmdlbmVyYXRlRnVuY3Rpb25QYXJhbXMgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB2YXIgaSwgaXosIHJlc3VsdCwgaGFzRGVmYXVsdDtcblxuICAgICAgICBoYXNEZWZhdWx0ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gU3ludGF4LkFycm93RnVuY3Rpb25FeHByZXNzaW9uICYmXG4gICAgICAgICAgICAgICAgIW5vZGUucmVzdCAmJiAoIW5vZGUuZGVmYXVsdHMgfHwgbm9kZS5kZWZhdWx0cy5sZW5ndGggPT09IDApICYmXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJhbXMubGVuZ3RoID09PSAxICYmIG5vZGUucGFyYW1zWzBdLnR5cGUgPT09IFN5bnRheC5JZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAvLyBhcmcgPT4geyB9IGNhc2VcbiAgICAgICAgICAgIHJlc3VsdCA9IFtnZW5lcmF0ZUFzeW5jUHJlZml4KG5vZGUsIHRydWUpLCBnZW5lcmF0ZUlkZW50aWZpZXIobm9kZS5wYXJhbXNbMF0pXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IG5vZGUudHlwZSA9PT0gU3ludGF4LkFycm93RnVuY3Rpb25FeHByZXNzaW9uID8gW2dlbmVyYXRlQXN5bmNQcmVmaXgobm9kZSwgZmFsc2UpXSA6IFtdO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goJygnKTtcbiAgICAgICAgICAgIGlmIChub2RlLmRlZmF1bHRzKSB7XG4gICAgICAgICAgICAgICAgaGFzRGVmYXVsdCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBpeiA9IG5vZGUucGFyYW1zLmxlbmd0aDsgaSA8IGl6OyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzRGVmYXVsdCAmJiBub2RlLmRlZmF1bHRzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBkZWZhdWx0IHZhbHVlcy5cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5nZW5lcmF0ZUFzc2lnbm1lbnQobm9kZS5wYXJhbXNbaV0sIG5vZGUuZGVmYXVsdHNbaV0sICc9JywgUHJlY2VkZW5jZS5Bc3NpZ25tZW50LCBFX1RUVCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZ2VuZXJhdGVQYXR0ZXJuKG5vZGUucGFyYW1zW2ldLCBQcmVjZWRlbmNlLkFzc2lnbm1lbnQsIEVfVFRUKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpICsgMSA8IGl6KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCcsJyArIHNwYWNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChub2RlLnJlc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5wYXJhbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCcsJyArIHNwYWNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goJy4uLicpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGdlbmVyYXRlSWRlbnRpZmllcihub2RlLnJlc3QpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0LnB1c2goJyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIENvZGVHZW5lcmF0b3IucHJvdG90eXBlLmdlbmVyYXRlRnVuY3Rpb25Cb2R5ID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCwgZXhwcjtcblxuICAgICAgICByZXN1bHQgPSB0aGlzLmdlbmVyYXRlRnVuY3Rpb25QYXJhbXMobm9kZSk7XG5cbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gU3ludGF4LkFycm93RnVuY3Rpb25FeHByZXNzaW9uKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChzcGFjZSk7XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnPT4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub2RlLmV4cHJlc3Npb24pIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHNwYWNlKTtcbiAgICAgICAgICAgIGV4cHIgPSB0aGlzLmdlbmVyYXRlRXhwcmVzc2lvbihub2RlLmJvZHksIFByZWNlZGVuY2UuQXNzaWdubWVudCwgRV9UVFQpO1xuICAgICAgICAgICAgaWYgKGV4cHIudG9TdHJpbmcoKS5jaGFyQXQoMCkgPT09ICd7Jykge1xuICAgICAgICAgICAgICAgIGV4cHIgPSBbJygnLCBleHByLCAnKSddO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goZXhwcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLm1heWJlQmxvY2sobm9kZS5ib2R5LCBTX1RURkYpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIENvZGVHZW5lcmF0b3IucHJvdG90eXBlLmdlbmVyYXRlSXRlcmF0aW9uRm9yU3RhdGVtZW50ID0gZnVuY3Rpb24gKG9wZXJhdG9yLCBzdG10LCBmbGFncykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gWydmb3InICsgc3BhY2UgKyAoc3RtdC5hd2FpdCA/ICdhd2FpdCcgKyBzcGFjZSA6ICcnKSArICcoJ10sIHRoYXQgPSB0aGlzO1xuICAgICAgICB3aXRoSW5kZW50KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzdG10LmxlZnQudHlwZSA9PT0gU3ludGF4LlZhcmlhYmxlRGVjbGFyYXRpb24pIHtcbiAgICAgICAgICAgICAgICB3aXRoSW5kZW50KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goc3RtdC5sZWZ0LmtpbmQgKyBub0VtcHR5U3BhY2UoKSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoYXQuZ2VuZXJhdGVTdGF0ZW1lbnQoc3RtdC5sZWZ0LmRlY2xhcmF0aW9uc1swXSwgU19GRkZGKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoYXQuZ2VuZXJhdGVFeHByZXNzaW9uKHN0bXQubGVmdCwgUHJlY2VkZW5jZS5DYWxsLCBFX1RUVCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQgPSBqb2luKHJlc3VsdCwgb3BlcmF0b3IpO1xuICAgICAgICAgICAgcmVzdWx0ID0gW2pvaW4oXG4gICAgICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgICAgIHRoYXQuZ2VuZXJhdGVFeHByZXNzaW9uKHN0bXQucmlnaHQsIFByZWNlZGVuY2UuQXNzaWdubWVudCwgRV9UVFQpXG4gICAgICAgICAgICApLCAnKSddO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5tYXliZUJsb2NrKHN0bXQuYm9keSwgZmxhZ3MpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgQ29kZUdlbmVyYXRvci5wcm90b3R5cGUuZ2VuZXJhdGVQcm9wZXJ0eUtleSA9IGZ1bmN0aW9uIChleHByLCBjb21wdXRlZCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgICAgaWYgKGNvbXB1dGVkKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnWycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24oZXhwciwgUHJlY2VkZW5jZS5TZXF1ZW5jZSwgRV9UVFQpKTtcblxuICAgICAgICBpZiAoY29tcHV0ZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCddJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICBDb2RlR2VuZXJhdG9yLnByb3RvdHlwZS5nZW5lcmF0ZUFzc2lnbm1lbnQgPSBmdW5jdGlvbiAobGVmdCwgcmlnaHQsIG9wZXJhdG9yLCBwcmVjZWRlbmNlLCBmbGFncykge1xuICAgICAgICBpZiAoUHJlY2VkZW5jZS5Bc3NpZ25tZW50IDwgcHJlY2VkZW5jZSkge1xuICAgICAgICAgICAgZmxhZ3MgfD0gRl9BTExPV19JTjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJlbnRoZXNpemUoXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24obGVmdCwgUHJlY2VkZW5jZS5DYWxsLCBmbGFncyksXG4gICAgICAgICAgICAgICAgc3BhY2UgKyBvcGVyYXRvciArIHNwYWNlLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKHJpZ2h0LCBQcmVjZWRlbmNlLkFzc2lnbm1lbnQsIGZsYWdzKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFByZWNlZGVuY2UuQXNzaWdubWVudCxcbiAgICAgICAgICAgIHByZWNlZGVuY2VcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgQ29kZUdlbmVyYXRvci5wcm90b3R5cGUuc2VtaWNvbG9uID0gZnVuY3Rpb24gKGZsYWdzKSB7XG4gICAgICAgIGlmICghc2VtaWNvbG9ucyAmJiBmbGFncyAmIEZfU0VNSUNPTE9OX09QVCkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnOyc7XG4gICAgfTtcblxuICAgIC8vIFN0YXRlbWVudHMuXG5cbiAgICBDb2RlR2VuZXJhdG9yLlN0YXRlbWVudCA9IHtcblxuICAgICAgICBCbG9ja1N0YXRlbWVudDogZnVuY3Rpb24gKHN0bXQsIGZsYWdzKSB7XG4gICAgICAgICAgICB2YXIgcmFuZ2UsIGNvbnRlbnQsIHJlc3VsdCA9IFsneycsIG5ld2xpbmVdLCB0aGF0ID0gdGhpcztcblxuICAgICAgICAgICAgd2l0aEluZGVudChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gaGFuZGxlIGZ1bmN0aW9ucyB3aXRob3V0IGFueSBjb2RlXG4gICAgICAgICAgICAgICAgaWYgKHN0bXQuYm9keS5sZW5ndGggPT09IDAgJiYgcHJlc2VydmVCbGFua0xpbmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gc3RtdC5yYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmdlWzFdIC0gcmFuZ2VbMF0gPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gc291cmNlQ29kZS5zdWJzdHJpbmcocmFuZ2VbMF0gKyAxLCByYW5nZVsxXSAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRbMF0gPT09ICdcXG4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gWyd7J107XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBpLCBpeiwgZnJhZ21lbnQsIGJvZHlGbGFncztcbiAgICAgICAgICAgICAgICBib2R5RmxhZ3MgPSBTX1RGRkY7XG4gICAgICAgICAgICAgICAgaWYgKGZsYWdzICYgRl9GVU5DX0JPRFkpIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keUZsYWdzIHw9IEZfRElSRUNUSVZFX0NUWDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBpeiA9IHN0bXQuYm9keS5sZW5ndGg7IGkgPCBpejsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmVzZXJ2ZUJsYW5rTGluZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBzcGFjZXMgYmVmb3JlIHRoZSBmaXJzdCBsaW5lXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdG10LmJvZHlbMF0ubGVhZGluZ0NvbW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlID0gc3RtdC5ib2R5WzBdLmxlYWRpbmdDb21tZW50c1swXS5leHRlbmRlZFJhbmdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gc291cmNlQ29kZS5zdWJzdHJpbmcocmFuZ2VbMF0sIHJhbmdlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRbMF0gPT09ICdcXG4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbJ3snXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0bXQuYm9keVswXS5sZWFkaW5nQ29tbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVCbGFua0xpbmVzKHN0bXQucmFuZ2VbMF0sIHN0bXQuYm9keVswXS5yYW5nZVswXSwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBzcGFjZXMgYmV0d2VlbiBsaW5lc1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdG10LmJvZHlbaSAtIDFdLnRyYWlsaW5nQ29tbWVudHMgICYmICFzdG10LmJvZHlbaV0ubGVhZGluZ0NvbW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlQmxhbmtMaW5lcyhzdG10LmJvZHlbaSAtIDFdLnJhbmdlWzFdLCBzdG10LmJvZHlbaV0ucmFuZ2VbMF0sIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IGl6IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keUZsYWdzIHw9IEZfU0VNSUNPTE9OX09QVDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdG10LmJvZHlbaV0ubGVhZGluZ0NvbW1lbnRzICYmIHByZXNlcnZlQmxhbmtMaW5lcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQgPSB0aGF0LmdlbmVyYXRlU3RhdGVtZW50KHN0bXQuYm9keVtpXSwgYm9keUZsYWdzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gYWRkSW5kZW50KHRoYXQuZ2VuZXJhdGVTdGF0ZW1lbnQoc3RtdC5ib2R5W2ldLCBib2R5RmxhZ3MpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGZyYWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlbmRzV2l0aExpbmVUZXJtaW5hdG9yKHRvU291cmNlTm9kZVdoZW5OZWVkZWQoZnJhZ21lbnQpLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJlc2VydmVCbGFua0xpbmVzICYmIGkgPCBpeiAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCBhZGQgYSBuZXcgbGluZSBpZiB0aGVyZSBhcmUgbGVhZGluZyBjb21lbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhlIG5leHQgc3RhdGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdG10LmJvZHlbaSArIDFdLmxlYWRpbmdDb21tZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXdsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ld2xpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXNlcnZlQmxhbmtMaW5lcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGFuZGxlIHNwYWNlcyBhZnRlciB0aGUgbGFzdCBsaW5lXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gaXogLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdG10LmJvZHlbaV0udHJhaWxpbmdDb21tZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUJsYW5rTGluZXMoc3RtdC5ib2R5W2ldLnJhbmdlWzFdLCBzdG10LnJhbmdlWzFdLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXN1bHQucHVzaChhZGRJbmRlbnQoJ30nKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuXG4gICAgICAgIEJyZWFrU3RhdGVtZW50OiBmdW5jdGlvbiAoc3RtdCwgZmxhZ3MpIHtcbiAgICAgICAgICAgIGlmIChzdG10LmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdicmVhayAnICsgc3RtdC5sYWJlbC5uYW1lICsgdGhpcy5zZW1pY29sb24oZmxhZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICdicmVhaycgKyB0aGlzLnNlbWljb2xvbihmbGFncyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgQ29udGludWVTdGF0ZW1lbnQ6IGZ1bmN0aW9uIChzdG10LCBmbGFncykge1xuICAgICAgICAgICAgaWYgKHN0bXQubGFiZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2NvbnRpbnVlICcgKyBzdG10LmxhYmVsLm5hbWUgKyB0aGlzLnNlbWljb2xvbihmbGFncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJ2NvbnRpbnVlJyArIHRoaXMuc2VtaWNvbG9uKGZsYWdzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBDbGFzc0JvZHk6IGZ1bmN0aW9uIChzdG10LCBmbGFncykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFsgJ3snLCBuZXdsaW5lXSwgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHdpdGhJbmRlbnQoZnVuY3Rpb24gKGluZGVudCkge1xuICAgICAgICAgICAgICAgIHZhciBpLCBpejtcblxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGl6ID0gc3RtdC5ib2R5Lmxlbmd0aDsgaSA8IGl6OyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaW5kZW50KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhhdC5nZW5lcmF0ZUV4cHJlc3Npb24oc3RtdC5ib2R5W2ldLCBQcmVjZWRlbmNlLlNlcXVlbmNlLCBFX1RUVCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSArIDEgPCBpeikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3bGluZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFlbmRzV2l0aExpbmVUZXJtaW5hdG9yKHRvU291cmNlTm9kZVdoZW5OZWVkZWQocmVzdWx0KS50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ld2xpbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYmFzZSk7XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnfScpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSxcblxuICAgICAgICBDbGFzc0RlY2xhcmF0aW9uOiBmdW5jdGlvbiAoc3RtdCwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQsIGZyYWdtZW50O1xuICAgICAgICAgICAgcmVzdWx0ICA9IFsnY2xhc3MnXTtcbiAgICAgICAgICAgIGlmIChzdG10LmlkKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gam9pbihyZXN1bHQsIHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKHN0bXQuaWQsIFByZWNlZGVuY2UuU2VxdWVuY2UsIEVfVFRUKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RtdC5zdXBlckNsYXNzKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSBqb2luKCdleHRlbmRzJywgdGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24oc3RtdC5zdXBlckNsYXNzLCBQcmVjZWRlbmNlLkFzc2lnbm1lbnQsIEVfVFRUKSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gam9pbihyZXN1bHQsIGZyYWdtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHNwYWNlKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZ2VuZXJhdGVTdGF0ZW1lbnQoc3RtdC5ib2R5LCBTX1RGRlQpKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgRGlyZWN0aXZlU3RhdGVtZW50OiBmdW5jdGlvbiAoc3RtdCwgZmxhZ3MpIHtcbiAgICAgICAgICAgIGlmIChleHRyYS5yYXcgJiYgc3RtdC5yYXcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RtdC5yYXcgKyB0aGlzLnNlbWljb2xvbihmbGFncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZXNjYXBlRGlyZWN0aXZlKHN0bXQuZGlyZWN0aXZlKSArIHRoaXMuc2VtaWNvbG9uKGZsYWdzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBEb1doaWxlU3RhdGVtZW50OiBmdW5jdGlvbiAoc3RtdCwgZmxhZ3MpIHtcbiAgICAgICAgICAgIC8vIEJlY2F1c2UgYGRvIDQyIHdoaWxlIChjb25kKWAgaXMgU3ludGF4IEVycm9yLiBXZSBuZWVkIHNlbWljb2xvbi5cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBqb2luKCdkbycsIHRoaXMubWF5YmVCbG9jayhzdG10LmJvZHksIFNfVEZGRikpO1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5tYXliZUJsb2NrU3VmZml4KHN0bXQuYm9keSwgcmVzdWx0KTtcbiAgICAgICAgICAgIHJldHVybiBqb2luKHJlc3VsdCwgW1xuICAgICAgICAgICAgICAgICd3aGlsZScgKyBzcGFjZSArICcoJyxcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlRXhwcmVzc2lvbihzdG10LnRlc3QsIFByZWNlZGVuY2UuU2VxdWVuY2UsIEVfVFRUKSxcbiAgICAgICAgICAgICAgICAnKScgKyB0aGlzLnNlbWljb2xvbihmbGFncylcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIENhdGNoQ2xhdXNlOiBmdW5jdGlvbiAoc3RtdCwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQsIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgd2l0aEluZGVudChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGd1YXJkO1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gW1xuICAgICAgICAgICAgICAgICAgICAnY2F0Y2gnICsgc3BhY2UgKyAnKCcsXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ2VuZXJhdGVFeHByZXNzaW9uKHN0bXQucGFyYW0sIFByZWNlZGVuY2UuU2VxdWVuY2UsIEVfVFRUKSxcbiAgICAgICAgICAgICAgICAgICAgJyknXG4gICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgIGlmIChzdG10Lmd1YXJkKSB7XG4gICAgICAgICAgICAgICAgICAgIGd1YXJkID0gdGhhdC5nZW5lcmF0ZUV4cHJlc3Npb24oc3RtdC5ndWFyZCwgUHJlY2VkZW5jZS5TZXF1ZW5jZSwgRV9UVFQpO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3BsaWNlKDIsIDAsICcgaWYgJywgZ3VhcmQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5tYXliZUJsb2NrKHN0bXQuYm9keSwgU19URkZGKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuXG4gICAgICAgIERlYnVnZ2VyU3RhdGVtZW50OiBmdW5jdGlvbiAoc3RtdCwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiAnZGVidWdnZXInICsgdGhpcy5zZW1pY29sb24oZmxhZ3MpO1xuICAgICAgICB9LFxuXG4gICAgICAgIEVtcHR5U3RhdGVtZW50OiBmdW5jdGlvbiAoc3RtdCwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiAnOyc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uOiBmdW5jdGlvbiAoc3RtdCwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbICdleHBvcnQnIF0sIGJvZHlGbGFncztcblxuICAgICAgICAgICAgYm9keUZsYWdzID0gKGZsYWdzICYgRl9TRU1JQ09MT05fT1BUKSA/IFNfVEZGVCA6IFNfVEZGRjtcblxuICAgICAgICAgICAgLy8gZXhwb3J0IGRlZmF1bHQgSG9pc3RhYmxlRGVjbGFyYXRpb25bRGVmYXVsdF1cbiAgICAgICAgICAgIC8vIGV4cG9ydCBkZWZhdWx0IEFzc2lnbm1lbnRFeHByZXNzaW9uW0luXSA7XG4gICAgICAgICAgICByZXN1bHQgPSBqb2luKHJlc3VsdCwgJ2RlZmF1bHQnKTtcbiAgICAgICAgICAgIGlmIChpc1N0YXRlbWVudChzdG10LmRlY2xhcmF0aW9uKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGpvaW4ocmVzdWx0LCB0aGlzLmdlbmVyYXRlU3RhdGVtZW50KHN0bXQuZGVjbGFyYXRpb24sIGJvZHlGbGFncykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBqb2luKHJlc3VsdCwgdGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24oc3RtdC5kZWNsYXJhdGlvbiwgUHJlY2VkZW5jZS5Bc3NpZ25tZW50LCBFX1RUVCkgKyB0aGlzLnNlbWljb2xvbihmbGFncykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSxcblxuICAgICAgICBFeHBvcnROYW1lZERlY2xhcmF0aW9uOiBmdW5jdGlvbiAoc3RtdCwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbICdleHBvcnQnIF0sIGJvZHlGbGFncywgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgICAgIGJvZHlGbGFncyA9IChmbGFncyAmIEZfU0VNSUNPTE9OX09QVCkgPyBTX1RGRlQgOiBTX1RGRkY7XG5cbiAgICAgICAgICAgIC8vIGV4cG9ydCBWYXJpYWJsZVN0YXRlbWVudFxuICAgICAgICAgICAgLy8gZXhwb3J0IERlY2xhcmF0aW9uW0RlZmF1bHRdXG4gICAgICAgICAgICBpZiAoc3RtdC5kZWNsYXJhdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBqb2luKHJlc3VsdCwgdGhpcy5nZW5lcmF0ZVN0YXRlbWVudChzdG10LmRlY2xhcmF0aW9uLCBib2R5RmxhZ3MpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZXhwb3J0IEV4cG9ydENsYXVzZVtOb1JlZmVyZW5jZV0gRnJvbUNsYXVzZSA7XG4gICAgICAgICAgICAvLyBleHBvcnQgRXhwb3J0Q2xhdXNlIDtcbiAgICAgICAgICAgIGlmIChzdG10LnNwZWNpZmllcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RtdC5zcGVjaWZpZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBqb2luKHJlc3VsdCwgJ3snICsgc3BhY2UgKyAnfScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RtdC5zcGVjaWZpZXJzWzBdLnR5cGUgPT09IFN5bnRheC5FeHBvcnRCYXRjaFNwZWNpZmllcikge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBqb2luKHJlc3VsdCwgdGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24oc3RtdC5zcGVjaWZpZXJzWzBdLCBQcmVjZWRlbmNlLlNlcXVlbmNlLCBFX1RUVCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGpvaW4ocmVzdWx0LCAneycpO1xuICAgICAgICAgICAgICAgICAgICB3aXRoSW5kZW50KGZ1bmN0aW9uIChpbmRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpLCBpejtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ld2xpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMCwgaXogPSBzdG10LnNwZWNpZmllcnMubGVuZ3RoOyBpIDwgaXo7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGluZGVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhhdC5nZW5lcmF0ZUV4cHJlc3Npb24oc3RtdC5zcGVjaWZpZXJzW2ldLCBQcmVjZWRlbmNlLlNlcXVlbmNlLCBFX1RUVCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICsgMSA8IGl6KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCcsJyArIG5ld2xpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZW5kc1dpdGhMaW5lVGVybWluYXRvcih0b1NvdXJjZU5vZGVXaGVuTmVlZGVkKHJlc3VsdCkudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ld2xpbmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGJhc2UgKyAnfScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzdG10LnNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBqb2luKHJlc3VsdCwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2Zyb20nICsgc3BhY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNb2R1bGVTcGVjaWZpZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKHN0bXQuc291cmNlLCBQcmVjZWRlbmNlLlNlcXVlbmNlLCBFX1RUVCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbWljb2xvbihmbGFncylcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5zZW1pY29sb24oZmxhZ3MpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuXG4gICAgICAgIEV4cG9ydEFsbERlY2xhcmF0aW9uOiBmdW5jdGlvbiAoc3RtdCwgZmxhZ3MpIHtcbiAgICAgICAgICAgIC8vIGV4cG9ydCAqIEZyb21DbGF1c2UgO1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAnZXhwb3J0JyArIHNwYWNlLFxuICAgICAgICAgICAgICAgICcqJyArIHNwYWNlLFxuICAgICAgICAgICAgICAgICdmcm9tJyArIHNwYWNlLFxuICAgICAgICAgICAgICAgIC8vIE1vZHVsZVNwZWNpZmllclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKHN0bXQuc291cmNlLCBQcmVjZWRlbmNlLlNlcXVlbmNlLCBFX1RUVCksXG4gICAgICAgICAgICAgICAgdGhpcy5zZW1pY29sb24oZmxhZ3MpXG4gICAgICAgICAgICBdO1xuICAgICAgICB9LFxuXG4gICAgICAgIEV4cHJlc3Npb25TdGF0ZW1lbnQ6IGZ1bmN0aW9uIChzdG10LCBmbGFncykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCwgZnJhZ21lbnQ7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGlzQ2xhc3NQcmVmaXhlZChmcmFnbWVudCkge1xuICAgICAgICAgICAgICAgIHZhciBjb2RlO1xuICAgICAgICAgICAgICAgIGlmIChmcmFnbWVudC5zbGljZSgwLCA1KSAhPT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvZGUgPSBmcmFnbWVudC5jaGFyQ29kZUF0KDUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2RlID09PSAweDdCICAvKiAneycgKi8gfHwgZXN1dGlscy5jb2RlLmlzV2hpdGVTcGFjZShjb2RlKSB8fCBlc3V0aWxzLmNvZGUuaXNMaW5lVGVybWluYXRvcihjb2RlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gaXNGdW5jdGlvblByZWZpeGVkKGZyYWdtZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvZGU7XG4gICAgICAgICAgICAgICAgaWYgKGZyYWdtZW50LnNsaWNlKDAsIDgpICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29kZSA9IGZyYWdtZW50LmNoYXJDb2RlQXQoOCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvZGUgPT09IDB4MjggLyogJygnICovIHx8IGVzdXRpbHMuY29kZS5pc1doaXRlU3BhY2UoY29kZSkgfHwgY29kZSA9PT0gMHgyQSAgLyogJyonICovIHx8IGVzdXRpbHMuY29kZS5pc0xpbmVUZXJtaW5hdG9yKGNvZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBpc0FzeW5jUHJlZml4ZWQoZnJhZ21lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29kZSwgaSwgaXo7XG4gICAgICAgICAgICAgICAgaWYgKGZyYWdtZW50LnNsaWNlKDAsIDUpICE9PSAnYXN5bmMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFlc3V0aWxzLmNvZGUuaXNXaGl0ZVNwYWNlKGZyYWdtZW50LmNoYXJDb2RlQXQoNSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChpID0gNiwgaXogPSBmcmFnbWVudC5sZW5ndGg7IGkgPCBpejsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZXN1dGlscy5jb2RlLmlzV2hpdGVTcGFjZShmcmFnbWVudC5jaGFyQ29kZUF0KGkpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IGl6KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZyYWdtZW50LnNsaWNlKGksIGkgKyA4KSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvZGUgPSBmcmFnbWVudC5jaGFyQ29kZUF0KGkgKyA4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29kZSA9PT0gMHgyOCAvKiAnKCcgKi8gfHwgZXN1dGlscy5jb2RlLmlzV2hpdGVTcGFjZShjb2RlKSB8fCBjb2RlID09PSAweDJBICAvKiAnKicgKi8gfHwgZXN1dGlscy5jb2RlLmlzTGluZVRlcm1pbmF0b3IoY29kZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IFt0aGlzLmdlbmVyYXRlRXhwcmVzc2lvbihzdG10LmV4cHJlc3Npb24sIFByZWNlZGVuY2UuU2VxdWVuY2UsIEVfVFRUKV07XG4gICAgICAgICAgICAvLyAxMi40ICd7JywgJ2Z1bmN0aW9uJywgJ2NsYXNzJyBpcyBub3QgYWxsb3dlZCBpbiB0aGlzIHBvc2l0aW9uLlxuICAgICAgICAgICAgLy8gd3JhcCBleHByZXNzaW9uIHdpdGggcGFyZW50aGVzZXNcbiAgICAgICAgICAgIGZyYWdtZW50ID0gdG9Tb3VyY2VOb2RlV2hlbk5lZWRlZChyZXN1bHQpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoZnJhZ21lbnQuY2hhckNvZGVBdCgwKSA9PT0gMHg3QiAgLyogJ3snICovIHx8ICAvLyBPYmplY3RFeHByZXNzaW9uXG4gICAgICAgICAgICAgICAgICAgIGlzQ2xhc3NQcmVmaXhlZChmcmFnbWVudCkgfHxcbiAgICAgICAgICAgICAgICAgICAgaXNGdW5jdGlvblByZWZpeGVkKGZyYWdtZW50KSB8fFxuICAgICAgICAgICAgICAgICAgICBpc0FzeW5jUHJlZml4ZWQoZnJhZ21lbnQpIHx8XG4gICAgICAgICAgICAgICAgICAgIChkaXJlY3RpdmUgJiYgKGZsYWdzICYgRl9ESVJFQ1RJVkVfQ1RYKSAmJiBzdG10LmV4cHJlc3Npb24udHlwZSA9PT0gU3ludGF4LkxpdGVyYWwgJiYgdHlwZW9mIHN0bXQuZXhwcmVzc2lvbi52YWx1ZSA9PT0gJ3N0cmluZycpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gWycoJywgcmVzdWx0LCAnKScgKyB0aGlzLnNlbWljb2xvbihmbGFncyldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnNlbWljb2xvbihmbGFncykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSxcblxuICAgICAgICBJbXBvcnREZWNsYXJhdGlvbjogZnVuY3Rpb24gKHN0bXQsIGZsYWdzKSB7XG4gICAgICAgICAgICAvLyBFUzY6IDE1LjIuMSB2YWxpZCBpbXBvcnQgZGVjbGFyYXRpb25zOlxuICAgICAgICAgICAgLy8gICAgIC0gaW1wb3J0IEltcG9ydENsYXVzZSBGcm9tQ2xhdXNlIDtcbiAgICAgICAgICAgIC8vICAgICAtIGltcG9ydCBNb2R1bGVTcGVjaWZpZXIgO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCwgY3Vyc29yLCB0aGF0ID0gdGhpcztcblxuICAgICAgICAgICAgLy8gSWYgbm8gSW1wb3J0Q2xhdXNlIGlzIHByZXNlbnQsXG4gICAgICAgICAgICAvLyB0aGlzIHNob3VsZCBiZSBgaW1wb3J0IE1vZHVsZVNwZWNpZmllcmAgc28gc2tpcCBgZnJvbWBcbiAgICAgICAgICAgIC8vIE1vZHVsZVNwZWNpZmllciBpcyBTdHJpbmdMaXRlcmFsLlxuICAgICAgICAgICAgaWYgKHN0bXQuc3BlY2lmaWVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBpbXBvcnQgTW9kdWxlU3BlY2lmaWVyIDtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAnaW1wb3J0JyxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2UsXG4gICAgICAgICAgICAgICAgICAgIC8vIE1vZHVsZVNwZWNpZmllclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlRXhwcmVzc2lvbihzdG10LnNvdXJjZSwgUHJlY2VkZW5jZS5TZXF1ZW5jZSwgRV9UVFQpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbWljb2xvbihmbGFncylcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpbXBvcnQgSW1wb3J0Q2xhdXNlIEZyb21DbGF1c2UgO1xuICAgICAgICAgICAgcmVzdWx0ID0gW1xuICAgICAgICAgICAgICAgICdpbXBvcnQnXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgY3Vyc29yID0gMDtcblxuICAgICAgICAgICAgLy8gSW1wb3J0ZWRCaW5kaW5nXG4gICAgICAgICAgICBpZiAoc3RtdC5zcGVjaWZpZXJzW2N1cnNvcl0udHlwZSA9PT0gU3ludGF4LkltcG9ydERlZmF1bHRTcGVjaWZpZXIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBqb2luKHJlc3VsdCwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24oc3RtdC5zcGVjaWZpZXJzW2N1cnNvcl0sIFByZWNlZGVuY2UuU2VxdWVuY2UsIEVfVFRUKVxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICsrY3Vyc29yO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RtdC5zcGVjaWZpZXJzW2N1cnNvcl0pIHtcbiAgICAgICAgICAgICAgICBpZiAoY3Vyc29yICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCcsJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHN0bXQuc3BlY2lmaWVyc1tjdXJzb3JdLnR5cGUgPT09IFN5bnRheC5JbXBvcnROYW1lc3BhY2VTcGVjaWZpZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTmFtZVNwYWNlSW1wb3J0XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGpvaW4ocmVzdWx0LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24oc3RtdC5zcGVjaWZpZXJzW2N1cnNvcl0sIFByZWNlZGVuY2UuU2VxdWVuY2UsIEVfVFRUKVxuICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBOYW1lZEltcG9ydHNcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goc3BhY2UgKyAneycpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgoc3RtdC5zcGVjaWZpZXJzLmxlbmd0aCAtIGN1cnNvcikgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGltcG9ydCB7IC4uLiB9IGZyb20gXCIuLi5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHNwYWNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKHN0bXQuc3BlY2lmaWVyc1tjdXJzb3JdLCBQcmVjZWRlbmNlLlNlcXVlbmNlLCBFX1RUVCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goc3BhY2UgKyAnfScgKyBzcGFjZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpbXBvcnQge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLi4uLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLi4uLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSBmcm9tIFwiLi4uXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aXRoSW5kZW50KGZ1bmN0aW9uIChpbmRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSwgaXo7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3bGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gY3Vyc29yLCBpeiA9IHN0bXQuc3BlY2lmaWVycy5sZW5ndGg7IGkgPCBpejsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGluZGVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoYXQuZ2VuZXJhdGVFeHByZXNzaW9uKHN0bXQuc3BlY2lmaWVyc1tpXSwgUHJlY2VkZW5jZS5TZXF1ZW5jZSwgRV9UVFQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgKyAxIDwgaXopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCcsJyArIG5ld2xpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVuZHNXaXRoTGluZVRlcm1pbmF0b3IodG9Tb3VyY2VOb2RlV2hlbk5lZWRlZChyZXN1bHQpLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3bGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChiYXNlICsgJ30nICsgc3BhY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQgPSBqb2luKHJlc3VsdCwgW1xuICAgICAgICAgICAgICAgICdmcm9tJyArIHNwYWNlLFxuICAgICAgICAgICAgICAgIC8vIE1vZHVsZVNwZWNpZmllclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKHN0bXQuc291cmNlLCBQcmVjZWRlbmNlLlNlcXVlbmNlLCBFX1RUVCksXG4gICAgICAgICAgICAgICAgdGhpcy5zZW1pY29sb24oZmxhZ3MpXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgVmFyaWFibGVEZWNsYXJhdG9yOiBmdW5jdGlvbiAoc3RtdCwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHZhciBpdGVtRmxhZ3MgPSAoZmxhZ3MgJiBGX0FMTE9XX0lOKSA/IEVfVFRUIDogRV9GVFQ7XG4gICAgICAgICAgICBpZiAoc3RtdC5pbml0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24oc3RtdC5pZCwgUHJlY2VkZW5jZS5Bc3NpZ25tZW50LCBpdGVtRmxhZ3MpLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZSxcbiAgICAgICAgICAgICAgICAgICAgJz0nLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24oc3RtdC5pbml0LCBQcmVjZWRlbmNlLkFzc2lnbm1lbnQsIGl0ZW1GbGFncylcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVQYXR0ZXJuKHN0bXQuaWQsIFByZWNlZGVuY2UuQXNzaWdubWVudCwgaXRlbUZsYWdzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBWYXJpYWJsZURlY2xhcmF0aW9uOiBmdW5jdGlvbiAoc3RtdCwgZmxhZ3MpIHtcbiAgICAgICAgICAgIC8vIFZhcmlhYmxlRGVjbGFyYXRvciBpcyB0eXBlZCBhcyBTdGF0ZW1lbnQsXG4gICAgICAgICAgICAvLyBidXQgam9pbmVkIHdpdGggY29tbWEgKG5vdCBMaW5lVGVybWluYXRvcikuXG4gICAgICAgICAgICAvLyBTbyBpZiBjb21tZW50IGlzIGF0dGFjaGVkIHRvIHRhcmdldCBub2RlLCB3ZSBzaG91bGQgc3BlY2lhbGl6ZS5cbiAgICAgICAgICAgIHZhciByZXN1bHQsIGksIGl6LCBub2RlLCBib2R5RmxhZ3MsIHRoYXQgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXN1bHQgPSBbIHN0bXQua2luZCBdO1xuXG4gICAgICAgICAgICBib2R5RmxhZ3MgPSAoZmxhZ3MgJiBGX0FMTE9XX0lOKSA/IFNfVEZGRiA6IFNfRkZGRjtcblxuICAgICAgICAgICAgZnVuY3Rpb24gYmxvY2soKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IHN0bXQuZGVjbGFyYXRpb25zWzBdO1xuICAgICAgICAgICAgICAgIGlmIChleHRyYS5jb21tZW50ICYmIG5vZGUubGVhZGluZ0NvbW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCdcXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYWRkSW5kZW50KHRoYXQuZ2VuZXJhdGVTdGF0ZW1lbnQobm9kZSwgYm9keUZsYWdzKSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5vRW1wdHlTcGFjZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhhdC5nZW5lcmF0ZVN0YXRlbWVudChub2RlLCBib2R5RmxhZ3MpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAxLCBpeiA9IHN0bXQuZGVjbGFyYXRpb25zLmxlbmd0aDsgaSA8IGl6OyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHN0bXQuZGVjbGFyYXRpb25zW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXh0cmEuY29tbWVudCAmJiBub2RlLmxlYWRpbmdDb21tZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goJywnICsgbmV3bGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChhZGRJbmRlbnQodGhhdC5nZW5lcmF0ZVN0YXRlbWVudChub2RlLCBib2R5RmxhZ3MpKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgnLCcgKyBzcGFjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh0aGF0LmdlbmVyYXRlU3RhdGVtZW50KG5vZGUsIGJvZHlGbGFncykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RtdC5kZWNsYXJhdGlvbnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHdpdGhJbmRlbnQoYmxvY2spO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBibG9jaygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnNlbWljb2xvbihmbGFncykpO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuXG4gICAgICAgIFRocm93U3RhdGVtZW50OiBmdW5jdGlvbiAoc3RtdCwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiBbam9pbihcbiAgICAgICAgICAgICAgICAndGhyb3cnLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKHN0bXQuYXJndW1lbnQsIFByZWNlZGVuY2UuU2VxdWVuY2UsIEVfVFRUKVxuICAgICAgICAgICAgKSwgdGhpcy5zZW1pY29sb24oZmxhZ3MpXTtcbiAgICAgICAgfSxcblxuICAgICAgICBUcnlTdGF0ZW1lbnQ6IGZ1bmN0aW9uIChzdG10LCBmbGFncykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCwgaSwgaXosIGd1YXJkZWRIYW5kbGVycztcblxuICAgICAgICAgICAgcmVzdWx0ID0gWyd0cnknLCB0aGlzLm1heWJlQmxvY2soc3RtdC5ibG9jaywgU19URkZGKV07XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLm1heWJlQmxvY2tTdWZmaXgoc3RtdC5ibG9jaywgcmVzdWx0KTtcblxuICAgICAgICAgICAgaWYgKHN0bXQuaGFuZGxlcnMpIHtcbiAgICAgICAgICAgICAgICAvLyBvbGQgaW50ZXJmYWNlXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgaXogPSBzdG10LmhhbmRsZXJzLmxlbmd0aDsgaSA8IGl6OyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gam9pbihyZXN1bHQsIHRoaXMuZ2VuZXJhdGVTdGF0ZW1lbnQoc3RtdC5oYW5kbGVyc1tpXSwgU19URkZGKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdG10LmZpbmFsaXplciB8fCBpICsgMSAhPT0gaXopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMubWF5YmVCbG9ja1N1ZmZpeChzdG10LmhhbmRsZXJzW2ldLmJvZHksIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGd1YXJkZWRIYW5kbGVycyA9IHN0bXQuZ3VhcmRlZEhhbmRsZXJzIHx8IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgaXogPSBndWFyZGVkSGFuZGxlcnMubGVuZ3RoOyBpIDwgaXo7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBqb2luKHJlc3VsdCwgdGhpcy5nZW5lcmF0ZVN0YXRlbWVudChndWFyZGVkSGFuZGxlcnNbaV0sIFNfVEZGRikpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RtdC5maW5hbGl6ZXIgfHwgaSArIDEgIT09IGl6KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLm1heWJlQmxvY2tTdWZmaXgoZ3VhcmRlZEhhbmRsZXJzW2ldLmJvZHksIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBuZXcgaW50ZXJmYWNlXG4gICAgICAgICAgICAgICAgaWYgKHN0bXQuaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzdG10LmhhbmRsZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBpeiA9IHN0bXQuaGFuZGxlci5sZW5ndGg7IGkgPCBpejsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gam9pbihyZXN1bHQsIHRoaXMuZ2VuZXJhdGVTdGF0ZW1lbnQoc3RtdC5oYW5kbGVyW2ldLCBTX1RGRkYpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RtdC5maW5hbGl6ZXIgfHwgaSArIDEgIT09IGl6KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMubWF5YmVCbG9ja1N1ZmZpeChzdG10LmhhbmRsZXJbaV0uYm9keSwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBqb2luKHJlc3VsdCwgdGhpcy5nZW5lcmF0ZVN0YXRlbWVudChzdG10LmhhbmRsZXIsIFNfVEZGRikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0bXQuZmluYWxpemVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5tYXliZUJsb2NrU3VmZml4KHN0bXQuaGFuZGxlci5ib2R5LCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0bXQuZmluYWxpemVyKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gam9pbihyZXN1bHQsIFsnZmluYWxseScsIHRoaXMubWF5YmVCbG9jayhzdG10LmZpbmFsaXplciwgU19URkZGKV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSxcblxuICAgICAgICBTd2l0Y2hTdGF0ZW1lbnQ6IGZ1bmN0aW9uIChzdG10LCBmbGFncykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCwgZnJhZ21lbnQsIGksIGl6LCBib2R5RmxhZ3MsIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgd2l0aEluZGVudChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gW1xuICAgICAgICAgICAgICAgICAgICAnc3dpdGNoJyArIHNwYWNlICsgJygnLFxuICAgICAgICAgICAgICAgICAgICB0aGF0LmdlbmVyYXRlRXhwcmVzc2lvbihzdG10LmRpc2NyaW1pbmFudCwgUHJlY2VkZW5jZS5TZXF1ZW5jZSwgRV9UVFQpLFxuICAgICAgICAgICAgICAgICAgICAnKScgKyBzcGFjZSArICd7JyArIG5ld2xpbmVcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoc3RtdC5jYXNlcykge1xuICAgICAgICAgICAgICAgIGJvZHlGbGFncyA9IFNfVEZGRjtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBpeiA9IHN0bXQuY2FzZXMubGVuZ3RoOyBpIDwgaXo7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gaXogLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5RmxhZ3MgfD0gRl9TRU1JQ09MT05fT1BUO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gYWRkSW5kZW50KHRoaXMuZ2VuZXJhdGVTdGF0ZW1lbnQoc3RtdC5jYXNlc1tpXSwgYm9keUZsYWdzKSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGZyYWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlbmRzV2l0aExpbmVUZXJtaW5hdG9yKHRvU291cmNlTm9kZVdoZW5OZWVkZWQoZnJhZ21lbnQpLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXdsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGFkZEluZGVudCgnfScpKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgU3dpdGNoQ2FzZTogZnVuY3Rpb24gKHN0bXQsIGZsYWdzKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0LCBmcmFnbWVudCwgaSwgaXosIGJvZHlGbGFncywgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICB3aXRoSW5kZW50KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RtdC50ZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpvaW4oJ2Nhc2UnLCB0aGF0LmdlbmVyYXRlRXhwcmVzc2lvbihzdG10LnRlc3QsIFByZWNlZGVuY2UuU2VxdWVuY2UsIEVfVFRUKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAnOidcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbJ2RlZmF1bHQ6J107XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICAgICAgaXogPSBzdG10LmNvbnNlcXVlbnQubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmIChpeiAmJiBzdG10LmNvbnNlcXVlbnRbMF0udHlwZSA9PT0gU3ludGF4LkJsb2NrU3RhdGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gdGhhdC5tYXliZUJsb2NrKHN0bXQuY29uc2VxdWVudFswXSwgU19URkZGKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZnJhZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICBpID0gMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaSAhPT0gaXogJiYgIWVuZHNXaXRoTGluZVRlcm1pbmF0b3IodG9Tb3VyY2VOb2RlV2hlbk5lZWRlZChyZXN1bHQpLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ld2xpbmUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJvZHlGbGFncyA9IFNfVEZGRjtcbiAgICAgICAgICAgICAgICBmb3IgKDsgaSA8IGl6OyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IGl6IC0gMSAmJiBmbGFncyAmIEZfU0VNSUNPTE9OX09QVCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keUZsYWdzIHw9IEZfU0VNSUNPTE9OX09QVDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudCA9IGFkZEluZGVudCh0aGF0LmdlbmVyYXRlU3RhdGVtZW50KHN0bXQuY29uc2VxdWVudFtpXSwgYm9keUZsYWdzKSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGZyYWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgKyAxICE9PSBpeiAmJiAhZW5kc1dpdGhMaW5lVGVybWluYXRvcih0b1NvdXJjZU5vZGVXaGVuTmVlZGVkKGZyYWdtZW50KS50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3bGluZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgSWZTdGF0ZW1lbnQ6IGZ1bmN0aW9uIChzdG10LCBmbGFncykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCwgYm9keUZsYWdzLCBzZW1pY29sb25PcHRpb25hbCwgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICB3aXRoSW5kZW50KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBbXG4gICAgICAgICAgICAgICAgICAgICdpZicgKyBzcGFjZSArICcoJyxcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5nZW5lcmF0ZUV4cHJlc3Npb24oc3RtdC50ZXN0LCBQcmVjZWRlbmNlLlNlcXVlbmNlLCBFX1RUVCksXG4gICAgICAgICAgICAgICAgICAgICcpJ1xuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbWljb2xvbk9wdGlvbmFsID0gZmxhZ3MgJiBGX1NFTUlDT0xPTl9PUFQ7XG4gICAgICAgICAgICBib2R5RmxhZ3MgPSBTX1RGRkY7XG4gICAgICAgICAgICBpZiAoc2VtaWNvbG9uT3B0aW9uYWwpIHtcbiAgICAgICAgICAgICAgICBib2R5RmxhZ3MgfD0gRl9TRU1JQ09MT05fT1BUO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0bXQuYWx0ZXJuYXRlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5tYXliZUJsb2NrKHN0bXQuY29uc2VxdWVudCwgU19URkZGKSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5tYXliZUJsb2NrU3VmZml4KHN0bXQuY29uc2VxdWVudCwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICBpZiAoc3RtdC5hbHRlcm5hdGUudHlwZSA9PT0gU3ludGF4LklmU3RhdGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGpvaW4ocmVzdWx0LCBbJ2Vsc2UgJywgdGhpcy5nZW5lcmF0ZVN0YXRlbWVudChzdG10LmFsdGVybmF0ZSwgYm9keUZsYWdzKV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGpvaW4ocmVzdWx0LCBqb2luKCdlbHNlJywgdGhpcy5tYXliZUJsb2NrKHN0bXQuYWx0ZXJuYXRlLCBib2R5RmxhZ3MpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLm1heWJlQmxvY2soc3RtdC5jb25zZXF1ZW50LCBib2R5RmxhZ3MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgRm9yU3RhdGVtZW50OiBmdW5jdGlvbiAoc3RtdCwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQsIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgd2l0aEluZGVudChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gWydmb3InICsgc3BhY2UgKyAnKCddO1xuICAgICAgICAgICAgICAgIGlmIChzdG10LmluaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0bXQuaW5pdC50eXBlID09PSBTeW50YXguVmFyaWFibGVEZWNsYXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhhdC5nZW5lcmF0ZVN0YXRlbWVudChzdG10LmluaXQsIFNfRkZGRikpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRl9BTExPV19JTiBiZWNvbWVzIGZhbHNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhhdC5nZW5lcmF0ZUV4cHJlc3Npb24oc3RtdC5pbml0LCBQcmVjZWRlbmNlLlNlcXVlbmNlLCBFX0ZUVCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goJzsnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCc7Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHN0bXQudGVzdCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChzcGFjZSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoYXQuZ2VuZXJhdGVFeHByZXNzaW9uKHN0bXQudGVzdCwgUHJlY2VkZW5jZS5TZXF1ZW5jZSwgRV9UVFQpKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goJzsnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgnOycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzdG10LnVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChzcGFjZSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoYXQuZ2VuZXJhdGVFeHByZXNzaW9uKHN0bXQudXBkYXRlLCBQcmVjZWRlbmNlLlNlcXVlbmNlLCBFX1RUVCkpO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgnKScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCcpJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMubWF5YmVCbG9jayhzdG10LmJvZHksIGZsYWdzICYgRl9TRU1JQ09MT05fT1BUID8gU19URkZUIDogU19URkZGKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuXG4gICAgICAgIEZvckluU3RhdGVtZW50OiBmdW5jdGlvbiAoc3RtdCwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlSXRlcmF0aW9uRm9yU3RhdGVtZW50KCdpbicsIHN0bXQsIGZsYWdzICYgRl9TRU1JQ09MT05fT1BUID8gU19URkZUIDogU19URkZGKTtcbiAgICAgICAgfSxcblxuICAgICAgICBGb3JPZlN0YXRlbWVudDogZnVuY3Rpb24gKHN0bXQsIGZsYWdzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUl0ZXJhdGlvbkZvclN0YXRlbWVudCgnb2YnLCBzdG10LCBmbGFncyAmIEZfU0VNSUNPTE9OX09QVCA/IFNfVEZGVCA6IFNfVEZGRik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgTGFiZWxlZFN0YXRlbWVudDogZnVuY3Rpb24gKHN0bXQsIGZsYWdzKSB7XG4gICAgICAgICAgICByZXR1cm4gW3N0bXQubGFiZWwubmFtZSArICc6JywgdGhpcy5tYXliZUJsb2NrKHN0bXQuYm9keSwgZmxhZ3MgJiBGX1NFTUlDT0xPTl9PUFQgPyBTX1RGRlQgOiBTX1RGRkYpXTtcbiAgICAgICAgfSxcblxuICAgICAgICBQcm9ncmFtOiBmdW5jdGlvbiAoc3RtdCwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQsIGZyYWdtZW50LCBpLCBpeiwgYm9keUZsYWdzO1xuICAgICAgICAgICAgaXogPSBzdG10LmJvZHkubGVuZ3RoO1xuICAgICAgICAgICAgcmVzdWx0ID0gW3NhZmVDb25jYXRlbmF0aW9uICYmIGl6ID4gMCA/ICdcXG4nIDogJyddO1xuICAgICAgICAgICAgYm9keUZsYWdzID0gU19URlRGO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGl6OyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNhZmVDb25jYXRlbmF0aW9uICYmIGkgPT09IGl6IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBib2R5RmxhZ3MgfD0gRl9TRU1JQ09MT05fT1BUO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChwcmVzZXJ2ZUJsYW5rTGluZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaGFuZGxlIHNwYWNlcyBiZWZvcmUgdGhlIGZpcnN0IGxpbmVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3RtdC5ib2R5WzBdLmxlYWRpbmdDb21tZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlQmxhbmtMaW5lcyhzdG10LnJhbmdlWzBdLCBzdG10LmJvZHlbaV0ucmFuZ2VbMF0sIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBoYW5kbGUgc3BhY2VzIGJldHdlZW4gbGluZXNcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0bXQuYm9keVtpIC0gMV0udHJhaWxpbmdDb21tZW50cyAmJiAhc3RtdC5ib2R5W2ldLmxlYWRpbmdDb21tZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlQmxhbmtMaW5lcyhzdG10LmJvZHlbaSAtIDFdLnJhbmdlWzFdLCBzdG10LmJvZHlbaV0ucmFuZ2VbMF0sIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmcmFnbWVudCA9IGFkZEluZGVudCh0aGlzLmdlbmVyYXRlU3RhdGVtZW50KHN0bXQuYm9keVtpXSwgYm9keUZsYWdzKSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZnJhZ21lbnQpO1xuICAgICAgICAgICAgICAgIGlmIChpICsgMSA8IGl6ICYmICFlbmRzV2l0aExpbmVUZXJtaW5hdG9yKHRvU291cmNlTm9kZVdoZW5OZWVkZWQoZnJhZ21lbnQpLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmVzZXJ2ZUJsYW5rTGluZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3RtdC5ib2R5W2kgKyAxXS5sZWFkaW5nQ29tbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXdsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ld2xpbmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHByZXNlcnZlQmxhbmtMaW5lcykge1xuICAgICAgICAgICAgICAgICAgICAvLyBoYW5kbGUgc3BhY2VzIGFmdGVyIHRoZSBsYXN0IGxpbmVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IGl6IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdG10LmJvZHlbaV0udHJhaWxpbmdDb21tZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlQmxhbmtMaW5lcyhzdG10LmJvZHlbaV0ucmFuZ2VbMV0sIHN0bXQucmFuZ2VbMV0sIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuXG4gICAgICAgIEZ1bmN0aW9uRGVjbGFyYXRpb246IGZ1bmN0aW9uIChzdG10LCBmbGFncykge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUFzeW5jUHJlZml4KHN0bXQsIHRydWUpLFxuICAgICAgICAgICAgICAgICdmdW5jdGlvbicsXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVTdGFyU3VmZml4KHN0bXQpIHx8IG5vRW1wdHlTcGFjZSgpLFxuICAgICAgICAgICAgICAgIHN0bXQuaWQgPyBnZW5lcmF0ZUlkZW50aWZpZXIoc3RtdC5pZCkgOiAnJyxcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlRnVuY3Rpb25Cb2R5KHN0bXQpXG4gICAgICAgICAgICBdO1xuICAgICAgICB9LFxuXG4gICAgICAgIFJldHVyblN0YXRlbWVudDogZnVuY3Rpb24gKHN0bXQsIGZsYWdzKSB7XG4gICAgICAgICAgICBpZiAoc3RtdC5hcmd1bWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbam9pbihcbiAgICAgICAgICAgICAgICAgICAgJ3JldHVybicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKHN0bXQuYXJndW1lbnQsIFByZWNlZGVuY2UuU2VxdWVuY2UsIEVfVFRUKVxuICAgICAgICAgICAgICAgICksIHRoaXMuc2VtaWNvbG9uKGZsYWdzKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gWydyZXR1cm4nICsgdGhpcy5zZW1pY29sb24oZmxhZ3MpXTtcbiAgICAgICAgfSxcblxuICAgICAgICBXaGlsZVN0YXRlbWVudDogZnVuY3Rpb24gKHN0bXQsIGZsYWdzKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0LCB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIHdpdGhJbmRlbnQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFtcbiAgICAgICAgICAgICAgICAgICAgJ3doaWxlJyArIHNwYWNlICsgJygnLFxuICAgICAgICAgICAgICAgICAgICB0aGF0LmdlbmVyYXRlRXhwcmVzc2lvbihzdG10LnRlc3QsIFByZWNlZGVuY2UuU2VxdWVuY2UsIEVfVFRUKSxcbiAgICAgICAgICAgICAgICAgICAgJyknXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5tYXliZUJsb2NrKHN0bXQuYm9keSwgZmxhZ3MgJiBGX1NFTUlDT0xPTl9PUFQgPyBTX1RGRlQgOiBTX1RGRkYpKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgV2l0aFN0YXRlbWVudDogZnVuY3Rpb24gKHN0bXQsIGZsYWdzKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0LCB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIHdpdGhJbmRlbnQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFtcbiAgICAgICAgICAgICAgICAgICAgJ3dpdGgnICsgc3BhY2UgKyAnKCcsXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ2VuZXJhdGVFeHByZXNzaW9uKHN0bXQub2JqZWN0LCBQcmVjZWRlbmNlLlNlcXVlbmNlLCBFX1RUVCksXG4gICAgICAgICAgICAgICAgICAgICcpJ1xuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMubWF5YmVCbG9jayhzdG10LmJvZHksIGZsYWdzICYgRl9TRU1JQ09MT05fT1BUID8gU19URkZUIDogU19URkZGKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbWVyZ2UoQ29kZUdlbmVyYXRvci5wcm90b3R5cGUsIENvZGVHZW5lcmF0b3IuU3RhdGVtZW50KTtcblxuICAgIC8vIEV4cHJlc3Npb25zLlxuXG4gICAgQ29kZUdlbmVyYXRvci5FeHByZXNzaW9uID0ge1xuXG4gICAgICAgIFNlcXVlbmNlRXhwcmVzc2lvbjogZnVuY3Rpb24gKGV4cHIsIHByZWNlZGVuY2UsIGZsYWdzKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0LCBpLCBpejtcbiAgICAgICAgICAgIGlmIChQcmVjZWRlbmNlLlNlcXVlbmNlIDwgcHJlY2VkZW5jZSkge1xuICAgICAgICAgICAgICAgIGZsYWdzIHw9IEZfQUxMT1dfSU47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGl6ID0gZXhwci5leHByZXNzaW9ucy5sZW5ndGg7IGkgPCBpejsgKytpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24oZXhwci5leHByZXNzaW9uc1tpXSwgUHJlY2VkZW5jZS5Bc3NpZ25tZW50LCBmbGFncykpO1xuICAgICAgICAgICAgICAgIGlmIChpICsgMSA8IGl6KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCcsJyArIHNwYWNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50aGVzaXplKHJlc3VsdCwgUHJlY2VkZW5jZS5TZXF1ZW5jZSwgcHJlY2VkZW5jZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgQXNzaWdubWVudEV4cHJlc3Npb246IGZ1bmN0aW9uIChleHByLCBwcmVjZWRlbmNlLCBmbGFncykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVBc3NpZ25tZW50KGV4cHIubGVmdCwgZXhwci5yaWdodCwgZXhwci5vcGVyYXRvciwgcHJlY2VkZW5jZSwgZmxhZ3MpO1xuICAgICAgICB9LFxuXG4gICAgICAgIEFycm93RnVuY3Rpb25FeHByZXNzaW9uOiBmdW5jdGlvbiAoZXhwciwgcHJlY2VkZW5jZSwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnRoZXNpemUodGhpcy5nZW5lcmF0ZUZ1bmN0aW9uQm9keShleHByKSwgUHJlY2VkZW5jZS5BcnJvd0Z1bmN0aW9uLCBwcmVjZWRlbmNlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBDb25kaXRpb25hbEV4cHJlc3Npb246IGZ1bmN0aW9uIChleHByLCBwcmVjZWRlbmNlLCBmbGFncykge1xuICAgICAgICAgICAgaWYgKFByZWNlZGVuY2UuQ29uZGl0aW9uYWwgPCBwcmVjZWRlbmNlKSB7XG4gICAgICAgICAgICAgICAgZmxhZ3MgfD0gRl9BTExPV19JTjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYXJlbnRoZXNpemUoXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlRXhwcmVzc2lvbihleHByLnRlc3QsIFByZWNlZGVuY2UuTG9naWNhbE9SLCBmbGFncyksXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlICsgJz8nICsgc3BhY2UsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKGV4cHIuY29uc2VxdWVudCwgUHJlY2VkZW5jZS5Bc3NpZ25tZW50LCBmbGFncyksXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlICsgJzonICsgc3BhY2UsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKGV4cHIuYWx0ZXJuYXRlLCBQcmVjZWRlbmNlLkFzc2lnbm1lbnQsIGZsYWdzKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgUHJlY2VkZW5jZS5Db25kaXRpb25hbCxcbiAgICAgICAgICAgICAgICBwcmVjZWRlbmNlXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuXG4gICAgICAgIExvZ2ljYWxFeHByZXNzaW9uOiBmdW5jdGlvbiAoZXhwciwgcHJlY2VkZW5jZSwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkJpbmFyeUV4cHJlc3Npb24oZXhwciwgcHJlY2VkZW5jZSwgZmxhZ3MpO1xuICAgICAgICB9LFxuXG4gICAgICAgIEJpbmFyeUV4cHJlc3Npb246IGZ1bmN0aW9uIChleHByLCBwcmVjZWRlbmNlLCBmbGFncykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCwgY3VycmVudFByZWNlZGVuY2UsIGZyYWdtZW50LCBsZWZ0U291cmNlO1xuICAgICAgICAgICAgY3VycmVudFByZWNlZGVuY2UgPSBCaW5hcnlQcmVjZWRlbmNlW2V4cHIub3BlcmF0b3JdO1xuXG4gICAgICAgICAgICBpZiAoY3VycmVudFByZWNlZGVuY2UgPCBwcmVjZWRlbmNlKSB7XG4gICAgICAgICAgICAgICAgZmxhZ3MgfD0gRl9BTExPV19JTjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnJhZ21lbnQgPSB0aGlzLmdlbmVyYXRlRXhwcmVzc2lvbihleHByLmxlZnQsIGN1cnJlbnRQcmVjZWRlbmNlLCBmbGFncyk7XG5cbiAgICAgICAgICAgIGxlZnRTb3VyY2UgPSBmcmFnbWVudC50b1N0cmluZygpO1xuXG4gICAgICAgICAgICBpZiAobGVmdFNvdXJjZS5jaGFyQ29kZUF0KGxlZnRTb3VyY2UubGVuZ3RoIC0gMSkgPT09IDB4MkYgLyogLyAqLyAmJiBlc3V0aWxzLmNvZGUuaXNJZGVudGlmaWVyUGFydEVTNShleHByLm9wZXJhdG9yLmNoYXJDb2RlQXQoMCkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gW2ZyYWdtZW50LCBub0VtcHR5U3BhY2UoKSwgZXhwci5vcGVyYXRvcl07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGpvaW4oZnJhZ21lbnQsIGV4cHIub3BlcmF0b3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmcmFnbWVudCA9IHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKGV4cHIucmlnaHQsIGN1cnJlbnRQcmVjZWRlbmNlICsgMSwgZmxhZ3MpO1xuXG4gICAgICAgICAgICBpZiAoZXhwci5vcGVyYXRvciA9PT0gJy8nICYmIGZyYWdtZW50LnRvU3RyaW5nKCkuY2hhckF0KDApID09PSAnLycgfHxcbiAgICAgICAgICAgIGV4cHIub3BlcmF0b3Iuc2xpY2UoLTEpID09PSAnPCcgJiYgZnJhZ21lbnQudG9TdHJpbmcoKS5zbGljZSgwLCAzKSA9PT0gJyEtLScpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiAnLycgY29uY2F0cyB3aXRoICcvJyBvciBgPGAgY29uY2F0cyB3aXRoIGAhLS1gLCBpdCBpcyBpbnRlcnByZXRlZCBhcyBjb21tZW50IHN0YXJ0XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobm9FbXB0eVNwYWNlKCkpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGZyYWdtZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gam9pbihyZXN1bHQsIGZyYWdtZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGV4cHIub3BlcmF0b3IgPT09ICdpbicgJiYgIShmbGFncyAmIEZfQUxMT1dfSU4pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnKCcsIHJlc3VsdCwgJyknXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYXJlbnRoZXNpemUocmVzdWx0LCBjdXJyZW50UHJlY2VkZW5jZSwgcHJlY2VkZW5jZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgQ2FsbEV4cHJlc3Npb246IGZ1bmN0aW9uIChleHByLCBwcmVjZWRlbmNlLCBmbGFncykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCwgaSwgaXo7XG4gICAgICAgICAgICAvLyBGX0FMTE9XX1VOUEFSQVRIX05FVyBiZWNvbWVzIGZhbHNlLlxuICAgICAgICAgICAgcmVzdWx0ID0gW3RoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKGV4cHIuY2FsbGVlLCBQcmVjZWRlbmNlLkNhbGwsIEVfVFRGKV07XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnKCcpO1xuICAgICAgICAgICAgZm9yIChpID0gMCwgaXogPSBleHByWydhcmd1bWVudHMnXS5sZW5ndGg7IGkgPCBpejsgKytpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24oZXhwclsnYXJndW1lbnRzJ11baV0sIFByZWNlZGVuY2UuQXNzaWdubWVudCwgRV9UVFQpKTtcbiAgICAgICAgICAgICAgICBpZiAoaSArIDEgPCBpeikge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgnLCcgKyBzcGFjZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goJyknKTtcblxuICAgICAgICAgICAgaWYgKCEoZmxhZ3MgJiBGX0FMTE9XX0NBTEwpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnKCcsIHJlc3VsdCwgJyknXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYXJlbnRoZXNpemUocmVzdWx0LCBQcmVjZWRlbmNlLkNhbGwsIHByZWNlZGVuY2UpO1xuICAgICAgICB9LFxuXG4gICAgICAgIE5ld0V4cHJlc3Npb246IGZ1bmN0aW9uIChleHByLCBwcmVjZWRlbmNlLCBmbGFncykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCwgbGVuZ3RoLCBpLCBpeiwgaXRlbUZsYWdzO1xuICAgICAgICAgICAgbGVuZ3RoID0gZXhwclsnYXJndW1lbnRzJ10ubGVuZ3RoO1xuXG4gICAgICAgICAgICAvLyBGX0FMTE9XX0NBTEwgYmVjb21lcyBmYWxzZS5cbiAgICAgICAgICAgIC8vIEZfQUxMT1dfVU5QQVJBVEhfTkVXIG1heSBiZWNvbWUgZmFsc2UuXG4gICAgICAgICAgICBpdGVtRmxhZ3MgPSAoZmxhZ3MgJiBGX0FMTE9XX1VOUEFSQVRIX05FVyAmJiAhcGFyZW50aGVzZXMgJiYgbGVuZ3RoID09PSAwKSA/IEVfVEZUIDogRV9URkY7XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IGpvaW4oXG4gICAgICAgICAgICAgICAgJ25ldycsXG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24oZXhwci5jYWxsZWUsIFByZWNlZGVuY2UuTmV3LCBpdGVtRmxhZ3MpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoIShmbGFncyAmIEZfQUxMT1dfVU5QQVJBVEhfTkVXKSB8fCBwYXJlbnRoZXNlcyB8fCBsZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goJygnKTtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBpeiA9IGxlbmd0aDsgaSA8IGl6OyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24oZXhwclsnYXJndW1lbnRzJ11baV0sIFByZWNlZGVuY2UuQXNzaWdubWVudCwgRV9UVFQpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgKyAxIDwgaXopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCcsJyArIHNwYWNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgnKScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50aGVzaXplKHJlc3VsdCwgUHJlY2VkZW5jZS5OZXcsIHByZWNlZGVuY2UpO1xuICAgICAgICB9LFxuXG4gICAgICAgIE1lbWJlckV4cHJlc3Npb246IGZ1bmN0aW9uIChleHByLCBwcmVjZWRlbmNlLCBmbGFncykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCwgZnJhZ21lbnQ7XG5cbiAgICAgICAgICAgIC8vIEZfQUxMT1dfVU5QQVJBVEhfTkVXIGJlY29tZXMgZmFsc2UuXG4gICAgICAgICAgICByZXN1bHQgPSBbdGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24oZXhwci5vYmplY3QsIFByZWNlZGVuY2UuQ2FsbCwgKGZsYWdzICYgRl9BTExPV19DQUxMKSA/IEVfVFRGIDogRV9URkYpXTtcblxuICAgICAgICAgICAgaWYgKGV4cHIuY29tcHV0ZWQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgnWycpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKGV4cHIucHJvcGVydHksIFByZWNlZGVuY2UuU2VxdWVuY2UsIGZsYWdzICYgRl9BTExPV19DQUxMID8gRV9UVFQgOiBFX1RGVCkpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCddJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChleHByLm9iamVjdC50eXBlID09PSBTeW50YXguTGl0ZXJhbCAmJiB0eXBlb2YgZXhwci5vYmplY3QudmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gdG9Tb3VyY2VOb2RlV2hlbk5lZWRlZChyZXN1bHQpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdoZW4gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBhbGwgdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAxLiBObyBmbG9hdGluZyBwb2ludFxuICAgICAgICAgICAgICAgICAgICAvLyAgIDIuIERvbid0IGhhdmUgZXhwb25lbnRzXG4gICAgICAgICAgICAgICAgICAgIC8vICAgMy4gVGhlIGxhc3QgY2hhcmFjdGVyIGlzIGEgZGVjaW1hbCBkaWdpdFxuICAgICAgICAgICAgICAgICAgICAvLyAgIDQuIE5vdCBoZXhhZGVjaW1hbCBPUiBvY3RhbCBudW1iZXIgbGl0ZXJhbFxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBzaG91bGQgYWRkIGEgZmxvYXRpbmcgcG9pbnQuXG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudC5pbmRleE9mKCcuJykgPCAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIS9bZUV4WF0vLnRlc3QoZnJhZ21lbnQpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXN1dGlscy5jb2RlLmlzRGVjaW1hbERpZ2l0KGZyYWdtZW50LmNoYXJDb2RlQXQoZnJhZ21lbnQubGVuZ3RoIC0gMSkpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIShmcmFnbWVudC5sZW5ndGggPj0gMiAmJiBmcmFnbWVudC5jaGFyQ29kZUF0KDApID09PSA0OCkgIC8vICcwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgnLicpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGdlbmVyYXRlSWRlbnRpZmllcihleHByLnByb3BlcnR5KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXJlbnRoZXNpemUocmVzdWx0LCBQcmVjZWRlbmNlLk1lbWJlciwgcHJlY2VkZW5jZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgTWV0YVByb3BlcnR5OiBmdW5jdGlvbiAoZXhwciwgcHJlY2VkZW5jZSwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHR5cGVvZiBleHByLm1ldGEgPT09IFwic3RyaW5nXCIgPyBleHByLm1ldGEgOiBnZW5lcmF0ZUlkZW50aWZpZXIoZXhwci5tZXRhKSk7XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnLicpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godHlwZW9mIGV4cHIucHJvcGVydHkgPT09IFwic3RyaW5nXCIgPyBleHByLnByb3BlcnR5IDogZ2VuZXJhdGVJZGVudGlmaWVyKGV4cHIucHJvcGVydHkpKTtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnRoZXNpemUocmVzdWx0LCBQcmVjZWRlbmNlLk1lbWJlciwgcHJlY2VkZW5jZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgVW5hcnlFeHByZXNzaW9uOiBmdW5jdGlvbiAoZXhwciwgcHJlY2VkZW5jZSwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQsIGZyYWdtZW50LCByaWdodENoYXJDb2RlLCBsZWZ0U291cmNlLCBsZWZ0Q2hhckNvZGU7XG4gICAgICAgICAgICBmcmFnbWVudCA9IHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKGV4cHIuYXJndW1lbnQsIFByZWNlZGVuY2UuVW5hcnksIEVfVFRUKTtcblxuICAgICAgICAgICAgaWYgKHNwYWNlID09PSAnJykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGpvaW4oZXhwci5vcGVyYXRvciwgZnJhZ21lbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBbZXhwci5vcGVyYXRvcl07XG4gICAgICAgICAgICAgICAgaWYgKGV4cHIub3BlcmF0b3IubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgICAgICAvLyBkZWxldGUsIHZvaWQsIHR5cGVvZlxuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgYHR5cGVvZiBbXWAsIG5vdCBgdHlwZW9mW11gXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGpvaW4ocmVzdWx0LCBmcmFnbWVudCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVudCBpbnNlcnRpbmcgc3BhY2VzIGJldHdlZW4gb3BlcmF0b3IgYW5kIGFyZ3VtZW50IGlmIGl0IGlzIHVubmVjZXNzYXJ5XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpa2UsIGAhY29uZGBcbiAgICAgICAgICAgICAgICAgICAgbGVmdFNvdXJjZSA9IHRvU291cmNlTm9kZVdoZW5OZWVkZWQocmVzdWx0KS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBsZWZ0Q2hhckNvZGUgPSBsZWZ0U291cmNlLmNoYXJDb2RlQXQobGVmdFNvdXJjZS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRDaGFyQ29kZSA9IGZyYWdtZW50LnRvU3RyaW5nKCkuY2hhckNvZGVBdCgwKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoKChsZWZ0Q2hhckNvZGUgPT09IDB4MkIgIC8qICsgKi8gfHwgbGVmdENoYXJDb2RlID09PSAweDJEICAvKiAtICovKSAmJiBsZWZ0Q2hhckNvZGUgPT09IHJpZ2h0Q2hhckNvZGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVzdXRpbHMuY29kZS5pc0lkZW50aWZpZXJQYXJ0RVM1KGxlZnRDaGFyQ29kZSkgJiYgZXN1dGlscy5jb2RlLmlzSWRlbnRpZmllclBhcnRFUzUocmlnaHRDaGFyQ29kZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChub0VtcHR5U3BhY2UoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChmcmFnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChmcmFnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50aGVzaXplKHJlc3VsdCwgUHJlY2VkZW5jZS5VbmFyeSwgcHJlY2VkZW5jZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgWWllbGRFeHByZXNzaW9uOiBmdW5jdGlvbiAoZXhwciwgcHJlY2VkZW5jZSwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICBpZiAoZXhwci5kZWxlZ2F0ZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9ICd5aWVsZConO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAneWllbGQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV4cHIuYXJndW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBqb2luKFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKGV4cHIuYXJndW1lbnQsIFByZWNlZGVuY2UuWWllbGQsIEVfVFRUKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50aGVzaXplKHJlc3VsdCwgUHJlY2VkZW5jZS5ZaWVsZCwgcHJlY2VkZW5jZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgQXdhaXRFeHByZXNzaW9uOiBmdW5jdGlvbiAoZXhwciwgcHJlY2VkZW5jZSwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBqb2luKFxuICAgICAgICAgICAgICAgIGV4cHIuYWxsID8gJ2F3YWl0KicgOiAnYXdhaXQnLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKGV4cHIuYXJndW1lbnQsIFByZWNlZGVuY2UuQXdhaXQsIEVfVFRUKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnRoZXNpemUocmVzdWx0LCBQcmVjZWRlbmNlLkF3YWl0LCBwcmVjZWRlbmNlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBVcGRhdGVFeHByZXNzaW9uOiBmdW5jdGlvbiAoZXhwciwgcHJlY2VkZW5jZSwgZmxhZ3MpIHtcbiAgICAgICAgICAgIGlmIChleHByLnByZWZpeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnRoZXNpemUoXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cHIub3BlcmF0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlRXhwcmVzc2lvbihleHByLmFyZ3VtZW50LCBQcmVjZWRlbmNlLlVuYXJ5LCBFX1RUVClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgUHJlY2VkZW5jZS5VbmFyeSxcbiAgICAgICAgICAgICAgICAgICAgcHJlY2VkZW5jZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50aGVzaXplKFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24oZXhwci5hcmd1bWVudCwgUHJlY2VkZW5jZS5Qb3N0Zml4LCBFX1RUVCksXG4gICAgICAgICAgICAgICAgICAgIGV4cHIub3BlcmF0b3JcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFByZWNlZGVuY2UuUG9zdGZpeCxcbiAgICAgICAgICAgICAgICBwcmVjZWRlbmNlXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuXG4gICAgICAgIEZ1bmN0aW9uRXhwcmVzc2lvbjogZnVuY3Rpb24gKGV4cHIsIHByZWNlZGVuY2UsIGZsYWdzKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXN5bmNQcmVmaXgoZXhwciwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmIChleHByLmlkKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZ2VuZXJhdGVTdGFyU3VmZml4KGV4cHIpIHx8IG5vRW1wdHlTcGFjZSgpKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChnZW5lcmF0ZUlkZW50aWZpZXIoZXhwci5pZCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChnZW5lcmF0ZVN0YXJTdWZmaXgoZXhwcikgfHwgc3BhY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5nZW5lcmF0ZUZ1bmN0aW9uQm9keShleHByKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuXG4gICAgICAgIEFycmF5UGF0dGVybjogZnVuY3Rpb24gKGV4cHIsIHByZWNlZGVuY2UsIGZsYWdzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5BcnJheUV4cHJlc3Npb24oZXhwciwgcHJlY2VkZW5jZSwgZmxhZ3MsIHRydWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIEFycmF5RXhwcmVzc2lvbjogZnVuY3Rpb24gKGV4cHIsIHByZWNlZGVuY2UsIGZsYWdzLCBpc1BhdHRlcm4pIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQsIG11bHRpbGluZSwgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICBpZiAoIWV4cHIuZWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdbXSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtdWx0aWxpbmUgPSBpc1BhdHRlcm4gPyBmYWxzZSA6IGV4cHIuZWxlbWVudHMubGVuZ3RoID4gMTtcbiAgICAgICAgICAgIHJlc3VsdCA9IFsnWycsIG11bHRpbGluZSA/IG5ld2xpbmUgOiAnJ107XG4gICAgICAgICAgICB3aXRoSW5kZW50KGZ1bmN0aW9uIChpbmRlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgaXo7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgaXogPSBleHByLmVsZW1lbnRzLmxlbmd0aDsgaSA8IGl6OyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFleHByLmVsZW1lbnRzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaW5kZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICsgMSA9PT0gaXopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgnLCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobXVsdGlsaW5lID8gaW5kZW50IDogJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhhdC5nZW5lcmF0ZUV4cHJlc3Npb24oZXhwci5lbGVtZW50c1tpXSwgUHJlY2VkZW5jZS5Bc3NpZ25tZW50LCBFX1RUVCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICsgMSA8IGl6KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgnLCcgKyAobXVsdGlsaW5lID8gbmV3bGluZSA6IHNwYWNlKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChtdWx0aWxpbmUgJiYgIWVuZHNXaXRoTGluZVRlcm1pbmF0b3IodG9Tb3VyY2VOb2RlV2hlbk5lZWRlZChyZXN1bHQpLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3bGluZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChtdWx0aWxpbmUgPyBiYXNlIDogJycpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goJ10nKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgUmVzdEVsZW1lbnQ6IGZ1bmN0aW9uKGV4cHIsIHByZWNlZGVuY2UsIGZsYWdzKSB7XG4gICAgICAgICAgICByZXR1cm4gJy4uLicgKyB0aGlzLmdlbmVyYXRlUGF0dGVybihleHByLmFyZ3VtZW50KTtcbiAgICAgICAgfSxcblxuICAgICAgICBDbGFzc0V4cHJlc3Npb246IGZ1bmN0aW9uIChleHByLCBwcmVjZWRlbmNlLCBmbGFncykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCwgZnJhZ21lbnQ7XG4gICAgICAgICAgICByZXN1bHQgPSBbJ2NsYXNzJ107XG4gICAgICAgICAgICBpZiAoZXhwci5pZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGpvaW4ocmVzdWx0LCB0aGlzLmdlbmVyYXRlRXhwcmVzc2lvbihleHByLmlkLCBQcmVjZWRlbmNlLlNlcXVlbmNlLCBFX1RUVCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV4cHIuc3VwZXJDbGFzcykge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gam9pbignZXh0ZW5kcycsIHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKGV4cHIuc3VwZXJDbGFzcywgUHJlY2VkZW5jZS5Bc3NpZ25tZW50LCBFX1RUVCkpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGpvaW4ocmVzdWx0LCBmcmFnbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChzcGFjZSk7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmdlbmVyYXRlU3RhdGVtZW50KGV4cHIuYm9keSwgU19URkZUKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuXG4gICAgICAgIE1ldGhvZERlZmluaXRpb246IGZ1bmN0aW9uIChleHByLCBwcmVjZWRlbmNlLCBmbGFncykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCwgZnJhZ21lbnQ7XG4gICAgICAgICAgICBpZiAoZXhwclsnc3RhdGljJ10pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBbJ3N0YXRpYycgKyBzcGFjZV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV4cHIua2luZCA9PT0gJ2dldCcgfHwgZXhwci5raW5kID09PSAnc2V0Jykge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gW1xuICAgICAgICAgICAgICAgICAgICBqb2luKGV4cHIua2luZCwgdGhpcy5nZW5lcmF0ZVByb3BlcnR5S2V5KGV4cHIua2V5LCBleHByLmNvbXB1dGVkKSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVGdW5jdGlvbkJvZHkoZXhwci52YWx1ZSlcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudCA9IFtcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVNZXRob2RQcmVmaXgoZXhwciksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVQcm9wZXJ0eUtleShleHByLmtleSwgZXhwci5jb21wdXRlZCksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVGdW5jdGlvbkJvZHkoZXhwci52YWx1ZSlcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGpvaW4ocmVzdWx0LCBmcmFnbWVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgUHJvcGVydHk6IGZ1bmN0aW9uIChleHByLCBwcmVjZWRlbmNlLCBmbGFncykge1xuICAgICAgICAgICAgaWYgKGV4cHIua2luZCA9PT0gJ2dldCcgfHwgZXhwci5raW5kID09PSAnc2V0Jykge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIGV4cHIua2luZCwgbm9FbXB0eVNwYWNlKCksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVQcm9wZXJ0eUtleShleHByLmtleSwgZXhwci5jb21wdXRlZCksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVGdW5jdGlvbkJvZHkoZXhwci52YWx1ZSlcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXhwci5zaG9ydGhhbmQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXhwci52YWx1ZS50eXBlID09PSBcIkFzc2lnbm1lbnRQYXR0ZXJuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuQXNzaWdubWVudFBhdHRlcm4oZXhwci52YWx1ZSwgUHJlY2VkZW5jZS5TZXF1ZW5jZSwgRV9UVFQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZVByb3BlcnR5S2V5KGV4cHIua2V5LCBleHByLmNvbXB1dGVkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGV4cHIubWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVNZXRob2RQcmVmaXgoZXhwciksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVQcm9wZXJ0eUtleShleHByLmtleSwgZXhwci5jb21wdXRlZCksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVGdW5jdGlvbkJvZHkoZXhwci52YWx1ZSlcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVQcm9wZXJ0eUtleShleHByLmtleSwgZXhwci5jb21wdXRlZCksXG4gICAgICAgICAgICAgICAgJzonICsgc3BhY2UsXG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24oZXhwci52YWx1ZSwgUHJlY2VkZW5jZS5Bc3NpZ25tZW50LCBFX1RUVClcbiAgICAgICAgICAgIF07XG4gICAgICAgIH0sXG5cbiAgICAgICAgT2JqZWN0RXhwcmVzc2lvbjogZnVuY3Rpb24gKGV4cHIsIHByZWNlZGVuY2UsIGZsYWdzKSB7XG4gICAgICAgICAgICB2YXIgbXVsdGlsaW5lLCByZXN1bHQsIGZyYWdtZW50LCB0aGF0ID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKCFleHByLnByb3BlcnRpZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd7fSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtdWx0aWxpbmUgPSBleHByLnByb3BlcnRpZXMubGVuZ3RoID4gMTtcblxuICAgICAgICAgICAgd2l0aEluZGVudChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSB0aGF0LmdlbmVyYXRlRXhwcmVzc2lvbihleHByLnByb3BlcnRpZXNbMF0sIFByZWNlZGVuY2UuU2VxdWVuY2UsIEVfVFRUKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIW11bHRpbGluZSkge1xuICAgICAgICAgICAgICAgIC8vIGlzc3VlcyA0XG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IHRyYW5zZm9ybSBmcm9tXG4gICAgICAgICAgICAgICAgLy8gICBkZWphdnUuQ2xhc3MuZGVjbGFyZSh7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgbWV0aG9kMjogZnVuY3Rpb24gKCkge31cbiAgICAgICAgICAgICAgICAvLyAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIHRvXG4gICAgICAgICAgICAgICAgLy8gICBkZWphdnUuQ2xhc3MuZGVjbGFyZSh7bWV0aG9kMjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgIH19KTtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc0xpbmVUZXJtaW5hdG9yKHRvU291cmNlTm9kZVdoZW5OZWVkZWQoZnJhZ21lbnQpLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbICd7Jywgc3BhY2UsIGZyYWdtZW50LCBzcGFjZSwgJ30nIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aXRoSW5kZW50KGZ1bmN0aW9uIChpbmRlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgaXo7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gWyAneycsIG5ld2xpbmUsIGluZGVudCwgZnJhZ21lbnQgXTtcblxuICAgICAgICAgICAgICAgIGlmIChtdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goJywnICsgbmV3bGluZSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDEsIGl6ID0gZXhwci5wcm9wZXJ0aWVzLmxlbmd0aDsgaSA8IGl6OyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGluZGVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh0aGF0LmdlbmVyYXRlRXhwcmVzc2lvbihleHByLnByb3BlcnRpZXNbaV0sIFByZWNlZGVuY2UuU2VxdWVuY2UsIEVfVFRUKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSArIDEgPCBpeikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCcsJyArIG5ld2xpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghZW5kc1dpdGhMaW5lVGVybWluYXRvcih0b1NvdXJjZU5vZGVXaGVuTmVlZGVkKHJlc3VsdCkudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXdsaW5lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGJhc2UpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goJ30nKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgQXNzaWdubWVudFBhdHRlcm46IGZ1bmN0aW9uKGV4cHIsIHByZWNlZGVuY2UsIGZsYWdzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUFzc2lnbm1lbnQoZXhwci5sZWZ0LCBleHByLnJpZ2h0LCAnPScsIHByZWNlZGVuY2UsIGZsYWdzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBPYmplY3RQYXR0ZXJuOiBmdW5jdGlvbiAoZXhwciwgcHJlY2VkZW5jZSwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQsIGksIGl6LCBtdWx0aWxpbmUsIHByb3BlcnR5LCB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIGlmICghZXhwci5wcm9wZXJ0aWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAne30nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtdWx0aWxpbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChleHByLnByb3BlcnRpZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcHJvcGVydHkgPSBleHByLnByb3BlcnRpZXNbMF07XG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5LnZhbHVlLnR5cGUgIT09IFN5bnRheC5JZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIG11bHRpbGluZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBpeiA9IGV4cHIucHJvcGVydGllcy5sZW5ndGg7IGkgPCBpejsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5ID0gZXhwci5wcm9wZXJ0aWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXByb3BlcnR5LnNob3J0aGFuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlsaW5lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0ID0gWyd7JywgbXVsdGlsaW5lID8gbmV3bGluZSA6ICcnIF07XG5cbiAgICAgICAgICAgIHdpdGhJbmRlbnQoZnVuY3Rpb24gKGluZGVudCkge1xuICAgICAgICAgICAgICAgIHZhciBpLCBpejtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBpeiA9IGV4cHIucHJvcGVydGllcy5sZW5ndGg7IGkgPCBpejsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG11bHRpbGluZSA/IGluZGVudCA6ICcnKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhhdC5nZW5lcmF0ZUV4cHJlc3Npb24oZXhwci5wcm9wZXJ0aWVzW2ldLCBQcmVjZWRlbmNlLlNlcXVlbmNlLCBFX1RUVCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSArIDEgPCBpeikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goJywnICsgKG11bHRpbGluZSA/IG5ld2xpbmUgOiBzcGFjZSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtdWx0aWxpbmUgJiYgIWVuZHNXaXRoTGluZVRlcm1pbmF0b3IodG9Tb3VyY2VOb2RlV2hlbk5lZWRlZChyZXN1bHQpLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3bGluZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChtdWx0aWxpbmUgPyBiYXNlIDogJycpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goJ30nKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgVGhpc0V4cHJlc3Npb246IGZ1bmN0aW9uIChleHByLCBwcmVjZWRlbmNlLCBmbGFncykge1xuICAgICAgICAgICAgcmV0dXJuICd0aGlzJztcbiAgICAgICAgfSxcblxuICAgICAgICBTdXBlcjogZnVuY3Rpb24gKGV4cHIsIHByZWNlZGVuY2UsIGZsYWdzKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3N1cGVyJztcbiAgICAgICAgfSxcblxuICAgICAgICBJZGVudGlmaWVyOiBmdW5jdGlvbiAoZXhwciwgcHJlY2VkZW5jZSwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZUlkZW50aWZpZXIoZXhwcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgSW1wb3J0RGVmYXVsdFNwZWNpZmllcjogZnVuY3Rpb24gKGV4cHIsIHByZWNlZGVuY2UsIGZsYWdzKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVJZGVudGlmaWVyKGV4cHIuaWQgfHwgZXhwci5sb2NhbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyOiBmdW5jdGlvbiAoZXhwciwgcHJlY2VkZW5jZSwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbJyonXTtcbiAgICAgICAgICAgIHZhciBpZCA9IGV4cHIuaWQgfHwgZXhwci5sb2NhbDtcbiAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHNwYWNlICsgJ2FzJyArIG5vRW1wdHlTcGFjZSgpICsgZ2VuZXJhdGVJZGVudGlmaWVyKGlkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuXG4gICAgICAgIEltcG9ydFNwZWNpZmllcjogZnVuY3Rpb24gKGV4cHIsIHByZWNlZGVuY2UsIGZsYWdzKSB7XG4gICAgICAgICAgICB2YXIgaW1wb3J0ZWQgPSBleHByLmltcG9ydGVkO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFsgaW1wb3J0ZWQubmFtZSBdO1xuICAgICAgICAgICAgdmFyIGxvY2FsID0gZXhwci5sb2NhbDtcbiAgICAgICAgICAgIGlmIChsb2NhbCAmJiBsb2NhbC5uYW1lICE9PSBpbXBvcnRlZC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobm9FbXB0eVNwYWNlKCkgKyAnYXMnICsgbm9FbXB0eVNwYWNlKCkgKyBnZW5lcmF0ZUlkZW50aWZpZXIobG9jYWwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgRXhwb3J0U3BlY2lmaWVyOiBmdW5jdGlvbiAoZXhwciwgcHJlY2VkZW5jZSwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHZhciBsb2NhbCA9IGV4cHIubG9jYWw7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gWyBsb2NhbC5uYW1lIF07XG4gICAgICAgICAgICB2YXIgZXhwb3J0ZWQgPSBleHByLmV4cG9ydGVkO1xuICAgICAgICAgICAgaWYgKGV4cG9ydGVkICYmIGV4cG9ydGVkLm5hbWUgIT09IGxvY2FsLm5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChub0VtcHR5U3BhY2UoKSArICdhcycgKyBub0VtcHR5U3BhY2UoKSArIGdlbmVyYXRlSWRlbnRpZmllcihleHBvcnRlZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSxcblxuICAgICAgICBMaXRlcmFsOiBmdW5jdGlvbiAoZXhwciwgcHJlY2VkZW5jZSwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHZhciByYXc7XG4gICAgICAgICAgICBpZiAoZXhwci5oYXNPd25Qcm9wZXJ0eSgncmF3JykgJiYgcGFyc2UgJiYgZXh0cmEucmF3KSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmF3ID0gcGFyc2UoZXhwci5yYXcpLmJvZHlbMF0uZXhwcmVzc2lvbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhdy50eXBlID09PSBTeW50YXguTGl0ZXJhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhdy52YWx1ZSA9PT0gZXhwci52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBleHByLnJhdztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbm90IHVzZSByYXcgcHJvcGVydHlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChleHByLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdudWxsJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBleHByLnZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBlc2NhcGVTdHJpbmcoZXhwci52YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXhwci52YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVOdW1iZXIoZXhwci52YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXhwci52YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4cHIudmFsdWUgPyAndHJ1ZScgOiAnZmFsc2UnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXhwci5yZWdleCkge1xuICAgICAgICAgICAgICByZXR1cm4gJy8nICsgZXhwci5yZWdleC5wYXR0ZXJuICsgJy8nICsgZXhwci5yZWdleC5mbGFncztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZVJlZ0V4cChleHByLnZhbHVlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBHZW5lcmF0b3JFeHByZXNzaW9uOiBmdW5jdGlvbiAoZXhwciwgcHJlY2VkZW5jZSwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkNvbXByZWhlbnNpb25FeHByZXNzaW9uKGV4cHIsIHByZWNlZGVuY2UsIGZsYWdzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBDb21wcmVoZW5zaW9uRXhwcmVzc2lvbjogZnVuY3Rpb24gKGV4cHIsIHByZWNlZGVuY2UsIGZsYWdzKSB7XG4gICAgICAgICAgICAvLyBHZW5lcmF0b3JFeHByZXNzaW9uIHNob3VsZCBiZSBwYXJlbnRoZXNpemVkIHdpdGggKC4uLiksIENvbXByZWhlbnNpb25FeHByZXNzaW9uIHdpdGggWy4uLl1cbiAgICAgICAgICAgIC8vIER1ZSB0byBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD04ODM0NjggcG9zaXRpb24gb2YgZXhwci5ib2R5IGNhbiBkaWZmZXIgaW4gU3BpZGVybW9ua2V5IGFuZCBFUzZcblxuICAgICAgICAgICAgdmFyIHJlc3VsdCwgaSwgaXosIGZyYWdtZW50LCB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIHJlc3VsdCA9IChleHByLnR5cGUgPT09IFN5bnRheC5HZW5lcmF0b3JFeHByZXNzaW9uKSA/IFsnKCddIDogWydbJ107XG5cbiAgICAgICAgICAgIGlmIChleHRyYS5tb3ouY29tcHJlaGVuc2lvbkV4cHJlc3Npb25TdGFydHNXaXRoQXNzaWdubWVudCkge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gdGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24oZXhwci5ib2R5LCBQcmVjZWRlbmNlLkFzc2lnbm1lbnQsIEVfVFRUKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChmcmFnbWVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChleHByLmJsb2Nrcykge1xuICAgICAgICAgICAgICAgIHdpdGhJbmRlbnQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBpeiA9IGV4cHIuYmxvY2tzLmxlbmd0aDsgaSA8IGl6OyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gdGhhdC5nZW5lcmF0ZUV4cHJlc3Npb24oZXhwci5ibG9ja3NbaV0sIFByZWNlZGVuY2UuU2VxdWVuY2UsIEVfVFRUKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID4gMCB8fCBleHRyYS5tb3ouY29tcHJlaGVuc2lvbkV4cHJlc3Npb25TdGFydHNXaXRoQXNzaWdubWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGpvaW4ocmVzdWx0LCBmcmFnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGZyYWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXhwci5maWx0ZXIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBqb2luKHJlc3VsdCwgJ2lmJyArIHNwYWNlKTtcbiAgICAgICAgICAgICAgICBmcmFnbWVudCA9IHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKGV4cHIuZmlsdGVyLCBQcmVjZWRlbmNlLlNlcXVlbmNlLCBFX1RUVCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gam9pbihyZXN1bHQsIFsgJygnLCBmcmFnbWVudCwgJyknIF0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWV4dHJhLm1vei5jb21wcmVoZW5zaW9uRXhwcmVzc2lvblN0YXJ0c1dpdGhBc3NpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSB0aGlzLmdlbmVyYXRlRXhwcmVzc2lvbihleHByLmJvZHksIFByZWNlZGVuY2UuQXNzaWdubWVudCwgRV9UVFQpO1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gam9pbihyZXN1bHQsIGZyYWdtZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0LnB1c2goKGV4cHIudHlwZSA9PT0gU3ludGF4LkdlbmVyYXRvckV4cHJlc3Npb24pID8gJyknIDogJ10nKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgQ29tcHJlaGVuc2lvbkJsb2NrOiBmdW5jdGlvbiAoZXhwciwgcHJlY2VkZW5jZSwgZmxhZ3MpIHtcbiAgICAgICAgICAgIHZhciBmcmFnbWVudDtcbiAgICAgICAgICAgIGlmIChleHByLmxlZnQudHlwZSA9PT0gU3ludGF4LlZhcmlhYmxlRGVjbGFyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudCA9IFtcbiAgICAgICAgICAgICAgICAgICAgZXhwci5sZWZ0LmtpbmQsIG5vRW1wdHlTcGFjZSgpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlU3RhdGVtZW50KGV4cHIubGVmdC5kZWNsYXJhdGlvbnNbMF0sIFNfRkZGRilcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudCA9IHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKGV4cHIubGVmdCwgUHJlY2VkZW5jZS5DYWxsLCBFX1RUVCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZyYWdtZW50ID0gam9pbihmcmFnbWVudCwgZXhwci5vZiA/ICdvZicgOiAnaW4nKTtcbiAgICAgICAgICAgIGZyYWdtZW50ID0gam9pbihmcmFnbWVudCwgdGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24oZXhwci5yaWdodCwgUHJlY2VkZW5jZS5TZXF1ZW5jZSwgRV9UVFQpKTtcblxuICAgICAgICAgICAgcmV0dXJuIFsgJ2ZvcicgKyBzcGFjZSArICcoJywgZnJhZ21lbnQsICcpJyBdO1xuICAgICAgICB9LFxuXG4gICAgICAgIFNwcmVhZEVsZW1lbnQ6IGZ1bmN0aW9uIChleHByLCBwcmVjZWRlbmNlLCBmbGFncykge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAnLi4uJyxcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlRXhwcmVzc2lvbihleHByLmFyZ3VtZW50LCBQcmVjZWRlbmNlLkFzc2lnbm1lbnQsIEVfVFRUKVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfSxcblxuICAgICAgICBUYWdnZWRUZW1wbGF0ZUV4cHJlc3Npb246IGZ1bmN0aW9uIChleHByLCBwcmVjZWRlbmNlLCBmbGFncykge1xuICAgICAgICAgICAgdmFyIGl0ZW1GbGFncyA9IEVfVFRGO1xuICAgICAgICAgICAgaWYgKCEoZmxhZ3MgJiBGX0FMTE9XX0NBTEwpKSB7XG4gICAgICAgICAgICAgICAgaXRlbUZsYWdzID0gRV9URkY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKGV4cHIudGFnLCBQcmVjZWRlbmNlLkNhbGwsIGl0ZW1GbGFncyksXG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUV4cHJlc3Npb24oZXhwci5xdWFzaSwgUHJlY2VkZW5jZS5QcmltYXJ5LCBFX0ZGVClcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50aGVzaXplKHJlc3VsdCwgUHJlY2VkZW5jZS5UYWdnZWRUZW1wbGF0ZSwgcHJlY2VkZW5jZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgVGVtcGxhdGVFbGVtZW50OiBmdW5jdGlvbiAoZXhwciwgcHJlY2VkZW5jZSwgZmxhZ3MpIHtcbiAgICAgICAgICAgIC8vIERvbid0IHVzZSBcImNvb2tlZFwiLiBTaW5jZSB0YWdnZWQgdGVtcGxhdGUgY2FuIHVzZSByYXcgdGVtcGxhdGVcbiAgICAgICAgICAgIC8vIHJlcHJlc2VudGF0aW9uLiBTbyBpZiB3ZSBkbyBzbywgaXQgYnJlYWtzIHRoZSBzY3JpcHQgc2VtYW50aWNzLlxuICAgICAgICAgICAgcmV0dXJuIGV4cHIudmFsdWUucmF3O1xuICAgICAgICB9LFxuXG4gICAgICAgIFRlbXBsYXRlTGl0ZXJhbDogZnVuY3Rpb24gKGV4cHIsIHByZWNlZGVuY2UsIGZsYWdzKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0LCBpLCBpejtcbiAgICAgICAgICAgIHJlc3VsdCA9IFsgJ2AnIF07XG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBpeiA9IGV4cHIucXVhc2lzLmxlbmd0aDsgaSA8IGl6OyArK2kpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmdlbmVyYXRlRXhwcmVzc2lvbihleHByLnF1YXNpc1tpXSwgUHJlY2VkZW5jZS5QcmltYXJ5LCBFX1RUVCkpO1xuICAgICAgICAgICAgICAgIGlmIChpICsgMSA8IGl6KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCckeycgKyBzcGFjZSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKGV4cHIuZXhwcmVzc2lvbnNbaV0sIFByZWNlZGVuY2UuU2VxdWVuY2UsIEVfVFRUKSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHNwYWNlICsgJ30nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnYCcpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSxcblxuICAgICAgICBNb2R1bGVTcGVjaWZpZXI6IGZ1bmN0aW9uIChleHByLCBwcmVjZWRlbmNlLCBmbGFncykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuTGl0ZXJhbChleHByLCBwcmVjZWRlbmNlLCBmbGFncyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgSW1wb3J0RXhwcmVzc2lvbjogZnVuY3Rpb24oZXhwciwgcHJlY2VkZW5jZSwgZmxhZykge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudGhlc2l6ZShbXG4gICAgICAgICAgICAgICAgJ2ltcG9ydCgnLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFeHByZXNzaW9uKGV4cHIuc291cmNlLCBQcmVjZWRlbmNlLkFzc2lnbm1lbnQsIEVfVFRUKSxcbiAgICAgICAgICAgICAgICAnKSdcbiAgICAgICAgICAgIF0sIFByZWNlZGVuY2UuQ2FsbCwgcHJlY2VkZW5jZSk7XG4gICAgICAgIH0sXG5cbiAgICB9O1xuXG4gICAgbWVyZ2UoQ29kZUdlbmVyYXRvci5wcm90b3R5cGUsIENvZGVHZW5lcmF0b3IuRXhwcmVzc2lvbik7XG5cbiAgICBDb2RlR2VuZXJhdG9yLnByb3RvdHlwZS5nZW5lcmF0ZUV4cHJlc3Npb24gPSBmdW5jdGlvbiAoZXhwciwgcHJlY2VkZW5jZSwgZmxhZ3MpIHtcbiAgICAgICAgdmFyIHJlc3VsdCwgdHlwZTtcblxuICAgICAgICB0eXBlID0gZXhwci50eXBlIHx8IFN5bnRheC5Qcm9wZXJ0eTtcblxuICAgICAgICBpZiAoZXh0cmEudmVyYmF0aW0gJiYgZXhwci5oYXNPd25Qcm9wZXJ0eShleHRyYS52ZXJiYXRpbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZVZlcmJhdGltKGV4cHIsIHByZWNlZGVuY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0ID0gdGhpc1t0eXBlXShleHByLCBwcmVjZWRlbmNlLCBmbGFncyk7XG5cblxuICAgICAgICBpZiAoZXh0cmEuY29tbWVudCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gYWRkQ29tbWVudHMoZXhwciwgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9Tb3VyY2VOb2RlV2hlbk5lZWRlZChyZXN1bHQsIGV4cHIpO1xuICAgIH07XG5cbiAgICBDb2RlR2VuZXJhdG9yLnByb3RvdHlwZS5nZW5lcmF0ZVN0YXRlbWVudCA9IGZ1bmN0aW9uIChzdG10LCBmbGFncykge1xuICAgICAgICB2YXIgcmVzdWx0LFxuICAgICAgICAgICAgZnJhZ21lbnQ7XG5cbiAgICAgICAgcmVzdWx0ID0gdGhpc1tzdG10LnR5cGVdKHN0bXQsIGZsYWdzKTtcblxuICAgICAgICAvLyBBdHRhY2ggY29tbWVudHNcblxuICAgICAgICBpZiAoZXh0cmEuY29tbWVudCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gYWRkQ29tbWVudHMoc3RtdCwgcmVzdWx0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZyYWdtZW50ID0gdG9Tb3VyY2VOb2RlV2hlbk5lZWRlZChyZXN1bHQpLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmIChzdG10LnR5cGUgPT09IFN5bnRheC5Qcm9ncmFtICYmICFzYWZlQ29uY2F0ZW5hdGlvbiAmJiBuZXdsaW5lID09PSAnJyAmJiAgZnJhZ21lbnQuY2hhckF0KGZyYWdtZW50Lmxlbmd0aCAtIDEpID09PSAnXFxuJykge1xuICAgICAgICAgICAgcmVzdWx0ID0gc291cmNlTWFwID8gdG9Tb3VyY2VOb2RlV2hlbk5lZWRlZChyZXN1bHQpLnJlcGxhY2VSaWdodCgvXFxzKyQvLCAnJykgOiBmcmFnbWVudC5yZXBsYWNlKC9cXHMrJC8sICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b1NvdXJjZU5vZGVXaGVuTmVlZGVkKHJlc3VsdCwgc3RtdCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlSW50ZXJuYWwobm9kZSkge1xuICAgICAgICB2YXIgY29kZWdlbjtcblxuICAgICAgICBjb2RlZ2VuID0gbmV3IENvZGVHZW5lcmF0b3IoKTtcbiAgICAgICAgaWYgKGlzU3RhdGVtZW50KG5vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gY29kZWdlbi5nZW5lcmF0ZVN0YXRlbWVudChub2RlLCBTX1RGRkYpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRXhwcmVzc2lvbihub2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvZGVnZW4uZ2VuZXJhdGVFeHByZXNzaW9uKG5vZGUsIFByZWNlZGVuY2UuU2VxdWVuY2UsIEVfVFRUKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBub2RlIHR5cGU6ICcgKyBub2RlLnR5cGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlKG5vZGUsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKSwgcmVzdWx0LCBwYWlyO1xuXG4gICAgICAgIGlmIChvcHRpb25zICE9IG51bGwpIHtcbiAgICAgICAgICAgIC8vIE9ic29sZXRlIG9wdGlvbnNcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAgIGBvcHRpb25zLmluZGVudGBcbiAgICAgICAgICAgIC8vICAgYG9wdGlvbnMuYmFzZWBcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBJbnN0ZWFkIG9mIHRoZW0sIHdlIGNhbiB1c2UgYG9wdGlvbi5mb3JtYXQuaW5kZW50YC5cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5pbmRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdE9wdGlvbnMuZm9ybWF0LmluZGVudC5zdHlsZSA9IG9wdGlvbnMuaW5kZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmJhc2UgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdE9wdGlvbnMuZm9ybWF0LmluZGVudC5iYXNlID0gb3B0aW9ucy5iYXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3B0aW9ucyA9IHVwZGF0ZURlZXBseShkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgICAgICBpbmRlbnQgPSBvcHRpb25zLmZvcm1hdC5pbmRlbnQuc3R5bGU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuYmFzZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBiYXNlID0gb3B0aW9ucy5iYXNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBiYXNlID0gc3RyaW5nUmVwZWF0KGluZGVudCwgb3B0aW9ucy5mb3JtYXQuaW5kZW50LmJhc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zO1xuICAgICAgICAgICAgaW5kZW50ID0gb3B0aW9ucy5mb3JtYXQuaW5kZW50LnN0eWxlO1xuICAgICAgICAgICAgYmFzZSA9IHN0cmluZ1JlcGVhdChpbmRlbnQsIG9wdGlvbnMuZm9ybWF0LmluZGVudC5iYXNlKTtcbiAgICAgICAgfVxuICAgICAgICBqc29uID0gb3B0aW9ucy5mb3JtYXQuanNvbjtcbiAgICAgICAgcmVudW1iZXIgPSBvcHRpb25zLmZvcm1hdC5yZW51bWJlcjtcbiAgICAgICAgaGV4YWRlY2ltYWwgPSBqc29uID8gZmFsc2UgOiBvcHRpb25zLmZvcm1hdC5oZXhhZGVjaW1hbDtcbiAgICAgICAgcXVvdGVzID0ganNvbiA/ICdkb3VibGUnIDogb3B0aW9ucy5mb3JtYXQucXVvdGVzO1xuICAgICAgICBlc2NhcGVsZXNzID0gb3B0aW9ucy5mb3JtYXQuZXNjYXBlbGVzcztcbiAgICAgICAgbmV3bGluZSA9IG9wdGlvbnMuZm9ybWF0Lm5ld2xpbmU7XG4gICAgICAgIHNwYWNlID0gb3B0aW9ucy5mb3JtYXQuc3BhY2U7XG4gICAgICAgIGlmIChvcHRpb25zLmZvcm1hdC5jb21wYWN0KSB7XG4gICAgICAgICAgICBuZXdsaW5lID0gc3BhY2UgPSBpbmRlbnQgPSBiYXNlID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50aGVzZXMgPSBvcHRpb25zLmZvcm1hdC5wYXJlbnRoZXNlcztcbiAgICAgICAgc2VtaWNvbG9ucyA9IG9wdGlvbnMuZm9ybWF0LnNlbWljb2xvbnM7XG4gICAgICAgIHNhZmVDb25jYXRlbmF0aW9uID0gb3B0aW9ucy5mb3JtYXQuc2FmZUNvbmNhdGVuYXRpb247XG4gICAgICAgIGRpcmVjdGl2ZSA9IG9wdGlvbnMuZGlyZWN0aXZlO1xuICAgICAgICBwYXJzZSA9IGpzb24gPyBudWxsIDogb3B0aW9ucy5wYXJzZTtcbiAgICAgICAgc291cmNlTWFwID0gb3B0aW9ucy5zb3VyY2VNYXA7XG4gICAgICAgIHNvdXJjZUNvZGUgPSBvcHRpb25zLnNvdXJjZUNvZGU7XG4gICAgICAgIHByZXNlcnZlQmxhbmtMaW5lcyA9IG9wdGlvbnMuZm9ybWF0LnByZXNlcnZlQmxhbmtMaW5lcyAmJiBzb3VyY2VDb2RlICE9PSBudWxsO1xuICAgICAgICBleHRyYSA9IG9wdGlvbnM7XG5cbiAgICAgICAgaWYgKHNvdXJjZU1hcCkge1xuICAgICAgICAgICAgaWYgKCFleHBvcnRzLmJyb3dzZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBhc3N1bWUgZW52aXJvbm1lbnQgaXMgbm9kZS5qc1xuICAgICAgICAgICAgICAgIC8vIEFuZCBwcmV2ZW50IGZyb20gaW5jbHVkaW5nIHNvdXJjZS1tYXAgYnkgYnJvd3NlcmlmeVxuICAgICAgICAgICAgICAgIFNvdXJjZU5vZGUgPSByZXF1aXJlKCdzb3VyY2UtbWFwJykuU291cmNlTm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgU291cmNlTm9kZSA9IGdsb2JhbC5zb3VyY2VNYXAuU291cmNlTm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdCA9IGdlbmVyYXRlSW50ZXJuYWwobm9kZSk7XG5cbiAgICAgICAgaWYgKCFzb3VyY2VNYXApIHtcbiAgICAgICAgICAgIHBhaXIgPSB7Y29kZTogcmVzdWx0LnRvU3RyaW5nKCksIG1hcDogbnVsbH07XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5zb3VyY2VNYXBXaXRoQ29kZSA/IHBhaXIgOiBwYWlyLmNvZGU7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHBhaXIgPSByZXN1bHQudG9TdHJpbmdXaXRoU291cmNlTWFwKHtcbiAgICAgICAgICAgIGZpbGU6IG9wdGlvbnMuZmlsZSxcbiAgICAgICAgICAgIHNvdXJjZVJvb3Q6IG9wdGlvbnMuc291cmNlTWFwUm9vdFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAob3B0aW9ucy5zb3VyY2VDb250ZW50KSB7XG4gICAgICAgICAgICBwYWlyLm1hcC5zZXRTb3VyY2VDb250ZW50KG9wdGlvbnMuc291cmNlTWFwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnNvdXJjZUNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuc291cmNlTWFwV2l0aENvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBwYWlyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhaXIubWFwLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgRk9STUFUX01JTklGWSA9IHtcbiAgICAgICAgaW5kZW50OiB7XG4gICAgICAgICAgICBzdHlsZTogJycsXG4gICAgICAgICAgICBiYXNlOiAwXG4gICAgICAgIH0sXG4gICAgICAgIHJlbnVtYmVyOiB0cnVlLFxuICAgICAgICBoZXhhZGVjaW1hbDogdHJ1ZSxcbiAgICAgICAgcXVvdGVzOiAnYXV0bycsXG4gICAgICAgIGVzY2FwZWxlc3M6IHRydWUsXG4gICAgICAgIGNvbXBhY3Q6IHRydWUsXG4gICAgICAgIHBhcmVudGhlc2VzOiBmYWxzZSxcbiAgICAgICAgc2VtaWNvbG9uczogZmFsc2VcbiAgICB9O1xuXG4gICAgRk9STUFUX0RFRkFVTFRTID0gZ2V0RGVmYXVsdE9wdGlvbnMoKS5mb3JtYXQ7XG5cbiAgICBleHBvcnRzLnZlcnNpb24gPSByZXF1aXJlKCcuL3BhY2thZ2UuanNvbicpLnZlcnNpb247XG4gICAgZXhwb3J0cy5nZW5lcmF0ZSA9IGdlbmVyYXRlO1xuICAgIGV4cG9ydHMuYXR0YWNoQ29tbWVudHMgPSBlc3RyYXZlcnNlLmF0dGFjaENvbW1lbnRzO1xuICAgIGV4cG9ydHMuUHJlY2VkZW5jZSA9IHVwZGF0ZURlZXBseSh7fSwgUHJlY2VkZW5jZSk7XG4gICAgZXhwb3J0cy5icm93c2VyID0gZmFsc2U7XG4gICAgZXhwb3J0cy5GT1JNQVRfTUlOSUZZID0gRk9STUFUX01JTklGWTtcbiAgICBleHBvcnRzLkZPUk1BVF9ERUZBVUxUUyA9IEZPUk1BVF9ERUZBVUxUUztcbn0oKSk7XG4vKiB2aW06IHNldCBzdz00IHRzPTQgZXQgdHc9ODAgOiAqL1xuIl0sInNvdXJjZVJvb3QiOiIifQ==