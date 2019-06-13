(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.js-md5"],{

/***/ "gjeX":
/*!****************************************!*\
  !*** ./node_modules/js-md5/src/md5.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
(function () {
  'use strict';

  var ERROR = 'input is invalid type';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_MD5_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_MD5_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD =  true && __webpack_require__(/*! !webpack amd options */ "PDX0");
  var ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [128, 32768, 8388608, -2147483648];
  var SHIFT = [0, 8, 16, 24];
  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'buffer', 'arrayBuffer', 'base64'];
  var BASE64_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

  var blocks = [], buffer8;
  if (ARRAY_BUFFER) {
    var buffer = new ArrayBuffer(68);
    buffer8 = new Uint8Array(buffer);
    blocks = new Uint32Array(buffer);
  }

  if (root.JS_MD5_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  /**
   * @method hex
   * @memberof md5
   * @description Output hash as hex string
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {String} Hex string
   * @example
   * md5.hex('The quick brown fox jumps over the lazy dog');
   * // equal to
   * md5('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method digest
   * @memberof md5
   * @description Output hash as bytes array
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Array} Bytes array
   * @example
   * md5.digest('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method array
   * @memberof md5
   * @description Output hash as bytes array
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Array} Bytes array
   * @example
   * md5.array('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method arrayBuffer
   * @memberof md5
   * @description Output hash as ArrayBuffer
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {ArrayBuffer} ArrayBuffer
   * @example
   * md5.arrayBuffer('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method buffer
   * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
   * @memberof md5
   * @description Output hash as ArrayBuffer
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {ArrayBuffer} ArrayBuffer
   * @example
   * md5.buffer('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method base64
   * @memberof md5
   * @description Output hash as base64 string
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {String} base64 string
   * @example
   * md5.base64('The quick brown fox jumps over the lazy dog');
   */
  var createOutputMethod = function (outputType) {
    return function (message) {
      return new Md5(true).update(message)[outputType]();
    };
  };

  /**
   * @method create
   * @memberof md5
   * @description Create Md5 object
   * @returns {Md5} Md5 object.
   * @example
   * var hash = md5.create();
   */
  /**
   * @method update
   * @memberof md5
   * @description Create and update Md5 object
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Md5} Md5 object.
   * @example
   * var hash = md5.update('The quick brown fox jumps over the lazy dog');
   * // equal to
   * var hash = md5.create();
   * hash.update('The quick brown fox jumps over the lazy dog');
   */
  var createMethod = function () {
    var method = createOutputMethod('hex');
    if (NODE_JS) {
      method = nodeWrap(method);
    }
    method.create = function () {
      return new Md5();
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type);
    }
    return method;
  };

  var nodeWrap = function (method) {
    var crypto = eval("require('crypto')");
    var Buffer = eval("require('buffer').Buffer");
    var nodeMethod = function (message) {
      if (typeof message === 'string') {
        return crypto.createHash('md5').update(message, 'utf8').digest('hex');
      } else {
        if (message === null || message === undefined) {
          throw ERROR;
        } else if (message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        }
      }
      if (Array.isArray(message) || ArrayBuffer.isView(message) ||
        message.constructor === Buffer) {
        return crypto.createHash('md5').update(new Buffer(message)).digest('hex');
      } else {
        return method(message);
      }
    };
    return nodeMethod;
  };

  /**
   * Md5 class
   * @class Md5
   * @description This is internal class.
   * @see {@link md5.create}
   */
  function Md5(sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
      this.buffer8 = buffer8;
    } else {
      if (ARRAY_BUFFER) {
        var buffer = new ArrayBuffer(68);
        this.buffer8 = new Uint8Array(buffer);
        this.blocks = new Uint32Array(buffer);
      } else {
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    }
    this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
  }

  /**
   * @method update
   * @memberof Md5
   * @instance
   * @description Update hash
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Md5} Md5 object.
   * @see {@link md5.update}
   */
  Md5.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }

    var notString, type = typeof message;
    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw ERROR;
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw ERROR;
          }
        }
      } else {
        throw ERROR;
      }
      notString = true;
    }
    var code, index = 0, i, length = message.length, blocks = this.blocks;
    var buffer8 = this.buffer8;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = blocks[16];
        blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }

      if (notString) {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            buffer8[i++] = message[index];
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
          }
        }
      } else {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              buffer8[i++] = code;
            } else if (code < 0x800) {
              buffer8[i++] = 0xc0 | (code >> 6);
              buffer8[i++] = 0x80 | (code & 0x3f);
            } else if (code < 0xd800 || code >= 0xe000) {
              buffer8[i++] = 0xe0 | (code >> 12);
              buffer8[i++] = 0x80 | ((code >> 6) & 0x3f);
              buffer8[i++] = 0x80 | (code & 0x3f);
            } else {
              code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
              buffer8[i++] = 0xf0 | (code >> 18);
              buffer8[i++] = 0x80 | ((code >> 12) & 0x3f);
              buffer8[i++] = 0x80 | ((code >> 6) & 0x3f);
              buffer8[i++] = 0x80 | (code & 0x3f);
            }
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              blocks[i >> 2] |= code << SHIFT[i++ & 3];
            } else if (code < 0x800) {
              blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            } else if (code < 0xd800 || code >= 0xe000) {
              blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            } else {
              code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
              blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            }
          }
        }
      }
      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 64) {
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  };

  Md5.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks, i = this.lastByteIndex;
    blocks[i >> 2] |= EXTRA[i & 3];
    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }
      blocks[0] = blocks[16];
      blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }
    blocks[14] = this.bytes << 3;
    blocks[15] = this.hBytes << 3 | this.bytes >>> 29;
    this.hash();
  };

  Md5.prototype.hash = function () {
    var a, b, c, d, bc, da, blocks = this.blocks;

    if (this.first) {
      a = blocks[0] - 680876937;
      a = (a << 7 | a >>> 25) - 271733879 << 0;
      d = (-1732584194 ^ a & 2004318071) + blocks[1] - 117830708;
      d = (d << 12 | d >>> 20) + a << 0;
      c = (-271733879 ^ (d & (a ^ -271733879))) + blocks[2] - 1126478375;
      c = (c << 17 | c >>> 15) + d << 0;
      b = (a ^ (c & (d ^ a))) + blocks[3] - 1316259209;
      b = (b << 22 | b >>> 10) + c << 0;
    } else {
      a = this.h0;
      b = this.h1;
      c = this.h2;
      d = this.h3;
      a += (d ^ (b & (c ^ d))) + blocks[0] - 680876936;
      a = (a << 7 | a >>> 25) + b << 0;
      d += (c ^ (a & (b ^ c))) + blocks[1] - 389564586;
      d = (d << 12 | d >>> 20) + a << 0;
      c += (b ^ (d & (a ^ b))) + blocks[2] + 606105819;
      c = (c << 17 | c >>> 15) + d << 0;
      b += (a ^ (c & (d ^ a))) + blocks[3] - 1044525330;
      b = (b << 22 | b >>> 10) + c << 0;
    }

    a += (d ^ (b & (c ^ d))) + blocks[4] - 176418897;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ (a & (b ^ c))) + blocks[5] + 1200080426;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ (d & (a ^ b))) + blocks[6] - 1473231341;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ (c & (d ^ a))) + blocks[7] - 45705983;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ (b & (c ^ d))) + blocks[8] + 1770035416;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ (a & (b ^ c))) + blocks[9] - 1958414417;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ (d & (a ^ b))) + blocks[10] - 42063;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ (c & (d ^ a))) + blocks[11] - 1990404162;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ (b & (c ^ d))) + blocks[12] + 1804603682;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ (a & (b ^ c))) + blocks[13] - 40341101;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ (d & (a ^ b))) + blocks[14] - 1502002290;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ (c & (d ^ a))) + blocks[15] + 1236535329;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[1] - 165796510;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[6] - 1069501632;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[11] + 643717713;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[0] - 373897302;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[5] - 701558691;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[10] + 38016083;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[15] - 660478335;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[4] - 405537848;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[9] + 568446438;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[14] - 1019803690;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[3] - 187363961;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[8] + 1163531501;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[13] - 1444681467;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[2] - 51403784;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[7] + 1735328473;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[12] - 1926607734;
    b = (b << 20 | b >>> 12) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[5] - 378558;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[8] - 2022574463;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[11] + 1839030562;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[14] - 35309556;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[1] - 1530992060;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[4] + 1272893353;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[7] - 155497632;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[10] - 1094730640;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[13] + 681279174;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[0] - 358537222;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[3] - 722521979;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[6] + 76029189;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[9] - 640364487;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[12] - 421815835;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[15] + 530742520;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[2] - 995338651;
    b = (b << 23 | b >>> 9) + c << 0;
    a += (c ^ (b | ~d)) + blocks[0] - 198630844;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[7] + 1126891415;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[14] - 1416354905;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[5] - 57434055;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[12] + 1700485571;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[3] - 1894986606;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[10] - 1051523;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[1] - 2054922799;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[8] + 1873313359;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[15] - 30611744;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[6] - 1560198380;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[13] + 1309151649;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[4] - 145523070;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[11] - 1120210379;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[2] + 718787259;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[9] - 343485551;
    b = (b << 21 | b >>> 11) + c << 0;

    if (this.first) {
      this.h0 = a + 1732584193 << 0;
      this.h1 = b - 271733879 << 0;
      this.h2 = c - 1732584194 << 0;
      this.h3 = d + 271733878 << 0;
      this.first = false;
    } else {
      this.h0 = this.h0 + a << 0;
      this.h1 = this.h1 + b << 0;
      this.h2 = this.h2 + c << 0;
      this.h3 = this.h3 + d << 0;
    }
  };

  /**
   * @method hex
   * @memberof Md5
   * @instance
   * @description Output hash as hex string
   * @returns {String} Hex string
   * @see {@link md5.hex}
   * @example
   * hash.hex();
   */
  Md5.prototype.hex = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;

    return HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] +
      HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] +
      HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] +
      HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] +
      HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] +
      HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] +
      HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] +
      HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] +
      HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] +
      HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] +
      HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] +
      HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] +
      HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] +
      HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] +
      HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] +
      HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F];
  };

  /**
   * @method toString
   * @memberof Md5
   * @instance
   * @description Output hash as hex string
   * @returns {String} Hex string
   * @see {@link md5.hex}
   * @example
   * hash.toString();
   */
  Md5.prototype.toString = Md5.prototype.hex;

  /**
   * @method digest
   * @memberof Md5
   * @instance
   * @description Output hash as bytes array
   * @returns {Array} Bytes array
   * @see {@link md5.digest}
   * @example
   * hash.digest();
   */
  Md5.prototype.digest = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
    return [
      h0 & 0xFF, (h0 >> 8) & 0xFF, (h0 >> 16) & 0xFF, (h0 >> 24) & 0xFF,
      h1 & 0xFF, (h1 >> 8) & 0xFF, (h1 >> 16) & 0xFF, (h1 >> 24) & 0xFF,
      h2 & 0xFF, (h2 >> 8) & 0xFF, (h2 >> 16) & 0xFF, (h2 >> 24) & 0xFF,
      h3 & 0xFF, (h3 >> 8) & 0xFF, (h3 >> 16) & 0xFF, (h3 >> 24) & 0xFF
    ];
  };

  /**
   * @method array
   * @memberof Md5
   * @instance
   * @description Output hash as bytes array
   * @returns {Array} Bytes array
   * @see {@link md5.array}
   * @example
   * hash.array();
   */
  Md5.prototype.array = Md5.prototype.digest;

  /**
   * @method arrayBuffer
   * @memberof Md5
   * @instance
   * @description Output hash as ArrayBuffer
   * @returns {ArrayBuffer} ArrayBuffer
   * @see {@link md5.arrayBuffer}
   * @example
   * hash.arrayBuffer();
   */
  Md5.prototype.arrayBuffer = function () {
    this.finalize();

    var buffer = new ArrayBuffer(16);
    var blocks = new Uint32Array(buffer);
    blocks[0] = this.h0;
    blocks[1] = this.h1;
    blocks[2] = this.h2;
    blocks[3] = this.h3;
    return buffer;
  };

  /**
   * @method buffer
   * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
   * @memberof Md5
   * @instance
   * @description Output hash as ArrayBuffer
   * @returns {ArrayBuffer} ArrayBuffer
   * @see {@link md5.buffer}
   * @example
   * hash.buffer();
   */
  Md5.prototype.buffer = Md5.prototype.arrayBuffer;

  /**
   * @method base64
   * @memberof Md5
   * @instance
   * @description Output hash as base64 string
   * @returns {String} base64 string
   * @see {@link md5.base64}
   * @example
   * hash.base64();
   */
  Md5.prototype.base64 = function () {
    var v1, v2, v3, base64Str = '', bytes = this.array();
    for (var i = 0; i < 15;) {
      v1 = bytes[i++];
      v2 = bytes[i++];
      v3 = bytes[i++];
      base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
        BASE64_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] +
        BASE64_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] +
        BASE64_ENCODE_CHAR[v3 & 63];
    }
    v1 = bytes[i];
    base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
      BASE64_ENCODE_CHAR[(v1 << 4) & 63] +
      '==';
    return base64Str;
  };

  var exports = createMethod();

  if (COMMON_JS) {
    module.exports = exports;
  } else {
    /**
     * @method md5
     * @description Md5 hash function, export to global in browsers.
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {String} md5 hashes
     * @example
     * md5(''); // d41d8cd98f00b204e9800998ecf8427e
     * md5('The quick brown fox jumps over the lazy dog'); // 9e107d9d372bb6826bd81d3542a419d6
     * md5('The quick brown fox jumps over the lazy dog.'); // e4d909c290d0fb1ca068ffaddf22cbd0
     *
     * // It also supports UTF-8 encoding
     * md5('中文'); // a7bac2239fcdcb3a067903d8077c4a07
     *
     * // It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
     * md5([]); // d41d8cd98f00b204e9800998ecf8427e
     * md5(new Uint8Array([])); // d41d8cd98f00b204e9800998ecf8427e
     */
    root.md5 = exports;
    if (AMD) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return exports;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "8oxB"), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "yLpj")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanMtbWQ1L3NyYy9tZDUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxZQUFZLEtBQTRCLElBQUksdURBQVU7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG9DQUFvQztBQUNqRCxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxvQ0FBb0M7QUFDakQsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxvQ0FBb0M7QUFDakQsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxvQ0FBb0M7QUFDakQsZUFBZSxZQUFZO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG9DQUFvQztBQUNqRCxlQUFlLFlBQVk7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG9DQUFvQztBQUNqRCxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsSUFBSTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsb0NBQW9DO0FBQ2pELGVBQWUsSUFBSTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHlCQUF5QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxvQ0FBb0M7QUFDakQsZUFBZSxJQUFJO0FBQ25CLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCLDBCQUEwQjtBQUN4RDtBQUNBO0FBQ0EsU0FBUztBQUNULDhCQUE4QiwwQkFBMEI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsOEJBQThCLDBCQUEwQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsOEJBQThCLDBCQUEwQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsWUFBWTtBQUMzQixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsWUFBWTtBQUMzQixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixRQUFRO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxlQUFlLG9DQUFvQztBQUNuRCxpQkFBaUIsT0FBTztBQUN4QjtBQUNBLGVBQWU7QUFDZiwwREFBMEQ7QUFDMUQsMkRBQTJEO0FBQzNEO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGVBQWU7QUFDZiwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsTUFBTSxtQ0FBTztBQUNiO0FBQ0EsT0FBTztBQUFBLG9HQUFDO0FBQ1I7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoibnBtLmpzLW1kNS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFtqcy1tZDVde0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9lbW4xNzgvanMtbWQ1fVxuICpcbiAqIEBuYW1lc3BhY2UgbWQ1XG4gKiBAdmVyc2lvbiAwLjcuM1xuICogQGF1dGhvciBDaGVuLCBZaS1DeXVhbiBbZW1uMTc4QGdtYWlsLmNvbV1cbiAqIEBjb3B5cmlnaHQgQ2hlbiwgWWktQ3l1YW4gMjAxNC0yMDE3XG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBFUlJPUiA9ICdpbnB1dCBpcyBpbnZhbGlkIHR5cGUnO1xuICB2YXIgV0lORE9XID0gdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCc7XG4gIHZhciByb290ID0gV0lORE9XID8gd2luZG93IDoge307XG4gIGlmIChyb290LkpTX01ENV9OT19XSU5ET1cpIHtcbiAgICBXSU5ET1cgPSBmYWxzZTtcbiAgfVxuICB2YXIgV0VCX1dPUktFUiA9ICFXSU5ET1cgJiYgdHlwZW9mIHNlbGYgPT09ICdvYmplY3QnO1xuICB2YXIgTk9ERV9KUyA9ICFyb290LkpTX01ENV9OT19OT0RFX0pTICYmIHR5cGVvZiBwcm9jZXNzID09PSAnb2JqZWN0JyAmJiBwcm9jZXNzLnZlcnNpb25zICYmIHByb2Nlc3MudmVyc2lvbnMubm9kZTtcbiAgaWYgKE5PREVfSlMpIHtcbiAgICByb290ID0gZ2xvYmFsO1xuICB9IGVsc2UgaWYgKFdFQl9XT1JLRVIpIHtcbiAgICByb290ID0gc2VsZjtcbiAgfVxuICB2YXIgQ09NTU9OX0pTID0gIXJvb3QuSlNfTUQ1X05PX0NPTU1PTl9KUyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cztcbiAgdmFyIEFNRCA9IHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZDtcbiAgdmFyIEFSUkFZX0JVRkZFUiA9ICFyb290LkpTX01ENV9OT19BUlJBWV9CVUZGRVIgJiYgdHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJztcbiAgdmFyIEhFWF9DSEFSUyA9ICcwMTIzNDU2Nzg5YWJjZGVmJy5zcGxpdCgnJyk7XG4gIHZhciBFWFRSQSA9IFsxMjgsIDMyNzY4LCA4Mzg4NjA4LCAtMjE0NzQ4MzY0OF07XG4gIHZhciBTSElGVCA9IFswLCA4LCAxNiwgMjRdO1xuICB2YXIgT1VUUFVUX1RZUEVTID0gWydoZXgnLCAnYXJyYXknLCAnZGlnZXN0JywgJ2J1ZmZlcicsICdhcnJheUJ1ZmZlcicsICdiYXNlNjQnXTtcbiAgdmFyIEJBU0U2NF9FTkNPREVfQ0hBUiA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJy5zcGxpdCgnJyk7XG5cbiAgdmFyIGJsb2NrcyA9IFtdLCBidWZmZXI4O1xuICBpZiAoQVJSQVlfQlVGRkVSKSB7XG4gICAgdmFyIGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcig2OCk7XG4gICAgYnVmZmVyOCA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcik7XG4gICAgYmxvY2tzID0gbmV3IFVpbnQzMkFycmF5KGJ1ZmZlcik7XG4gIH1cblxuICBpZiAocm9vdC5KU19NRDVfTk9fTk9ERV9KUyB8fCAhQXJyYXkuaXNBcnJheSkge1xuICAgIEFycmF5LmlzQXJyYXkgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChBUlJBWV9CVUZGRVIgJiYgKHJvb3QuSlNfTUQ1X05PX0FSUkFZX0JVRkZFUl9JU19WSUVXIHx8ICFBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgQXJyYXlCdWZmZXIuaXNWaWV3ID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iai5idWZmZXIgJiYgb2JqLmJ1ZmZlci5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXI7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGhleFxuICAgKiBAbWVtYmVyb2YgbWQ1XG4gICAqIEBkZXNjcmlwdGlvbiBPdXRwdXQgaGFzaCBhcyBoZXggc3RyaW5nXG4gICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fFVpbnQ4QXJyYXl8QXJyYXlCdWZmZXJ9IG1lc3NhZ2UgbWVzc2FnZSB0byBoYXNoXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IEhleCBzdHJpbmdcbiAgICogQGV4YW1wbGVcbiAgICogbWQ1LmhleCgnVGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZycpO1xuICAgKiAvLyBlcXVhbCB0b1xuICAgKiBtZDUoJ1RoZSBxdWljayBicm93biBmb3gganVtcHMgb3ZlciB0aGUgbGF6eSBkb2cnKTtcbiAgICovXG4gIC8qKlxuICAgKiBAbWV0aG9kIGRpZ2VzdFxuICAgKiBAbWVtYmVyb2YgbWQ1XG4gICAqIEBkZXNjcmlwdGlvbiBPdXRwdXQgaGFzaCBhcyBieXRlcyBhcnJheVxuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheXxVaW50OEFycmF5fEFycmF5QnVmZmVyfSBtZXNzYWdlIG1lc3NhZ2UgdG8gaGFzaFxuICAgKiBAcmV0dXJucyB7QXJyYXl9IEJ5dGVzIGFycmF5XG4gICAqIEBleGFtcGxlXG4gICAqIG1kNS5kaWdlc3QoJ1RoZSBxdWljayBicm93biBmb3gganVtcHMgb3ZlciB0aGUgbGF6eSBkb2cnKTtcbiAgICovXG4gIC8qKlxuICAgKiBAbWV0aG9kIGFycmF5XG4gICAqIEBtZW1iZXJvZiBtZDVcbiAgICogQGRlc2NyaXB0aW9uIE91dHB1dCBoYXNoIGFzIGJ5dGVzIGFycmF5XG4gICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fFVpbnQ4QXJyYXl8QXJyYXlCdWZmZXJ9IG1lc3NhZ2UgbWVzc2FnZSB0byBoYXNoXG4gICAqIEByZXR1cm5zIHtBcnJheX0gQnl0ZXMgYXJyYXlcbiAgICogQGV4YW1wbGVcbiAgICogbWQ1LmFycmF5KCdUaGUgcXVpY2sgYnJvd24gZm94IGp1bXBzIG92ZXIgdGhlIGxhenkgZG9nJyk7XG4gICAqL1xuICAvKipcbiAgICogQG1ldGhvZCBhcnJheUJ1ZmZlclxuICAgKiBAbWVtYmVyb2YgbWQ1XG4gICAqIEBkZXNjcmlwdGlvbiBPdXRwdXQgaGFzaCBhcyBBcnJheUJ1ZmZlclxuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheXxVaW50OEFycmF5fEFycmF5QnVmZmVyfSBtZXNzYWdlIG1lc3NhZ2UgdG8gaGFzaFxuICAgKiBAcmV0dXJucyB7QXJyYXlCdWZmZXJ9IEFycmF5QnVmZmVyXG4gICAqIEBleGFtcGxlXG4gICAqIG1kNS5hcnJheUJ1ZmZlcignVGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZycpO1xuICAgKi9cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVmZmVyXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgbWF5YmUgY29uZnVzZSB3aXRoIEJ1ZmZlciBpbiBub2RlLmpzLiBQbGVhc2UgdXNlIGFycmF5QnVmZmVyIGluc3RlYWQuXG4gICAqIEBtZW1iZXJvZiBtZDVcbiAgICogQGRlc2NyaXB0aW9uIE91dHB1dCBoYXNoIGFzIEFycmF5QnVmZmVyXG4gICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fFVpbnQ4QXJyYXl8QXJyYXlCdWZmZXJ9IG1lc3NhZ2UgbWVzc2FnZSB0byBoYXNoXG4gICAqIEByZXR1cm5zIHtBcnJheUJ1ZmZlcn0gQXJyYXlCdWZmZXJcbiAgICogQGV4YW1wbGVcbiAgICogbWQ1LmJ1ZmZlcignVGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZycpO1xuICAgKi9cbiAgLyoqXG4gICAqIEBtZXRob2QgYmFzZTY0XG4gICAqIEBtZW1iZXJvZiBtZDVcbiAgICogQGRlc2NyaXB0aW9uIE91dHB1dCBoYXNoIGFzIGJhc2U2NCBzdHJpbmdcbiAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl8VWludDhBcnJheXxBcnJheUJ1ZmZlcn0gbWVzc2FnZSBtZXNzYWdlIHRvIGhhc2hcbiAgICogQHJldHVybnMge1N0cmluZ30gYmFzZTY0IHN0cmluZ1xuICAgKiBAZXhhbXBsZVxuICAgKiBtZDUuYmFzZTY0KCdUaGUgcXVpY2sgYnJvd24gZm94IGp1bXBzIG92ZXIgdGhlIGxhenkgZG9nJyk7XG4gICAqL1xuICB2YXIgY3JlYXRlT3V0cHV0TWV0aG9kID0gZnVuY3Rpb24gKG91dHB1dFR5cGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiBuZXcgTWQ1KHRydWUpLnVwZGF0ZShtZXNzYWdlKVtvdXRwdXRUeXBlXSgpO1xuICAgIH07XG4gIH07XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgY3JlYXRlXG4gICAqIEBtZW1iZXJvZiBtZDVcbiAgICogQGRlc2NyaXB0aW9uIENyZWF0ZSBNZDUgb2JqZWN0XG4gICAqIEByZXR1cm5zIHtNZDV9IE1kNSBvYmplY3QuXG4gICAqIEBleGFtcGxlXG4gICAqIHZhciBoYXNoID0gbWQ1LmNyZWF0ZSgpO1xuICAgKi9cbiAgLyoqXG4gICAqIEBtZXRob2QgdXBkYXRlXG4gICAqIEBtZW1iZXJvZiBtZDVcbiAgICogQGRlc2NyaXB0aW9uIENyZWF0ZSBhbmQgdXBkYXRlIE1kNSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl8VWludDhBcnJheXxBcnJheUJ1ZmZlcn0gbWVzc2FnZSBtZXNzYWdlIHRvIGhhc2hcbiAgICogQHJldHVybnMge01kNX0gTWQ1IG9iamVjdC5cbiAgICogQGV4YW1wbGVcbiAgICogdmFyIGhhc2ggPSBtZDUudXBkYXRlKCdUaGUgcXVpY2sgYnJvd24gZm94IGp1bXBzIG92ZXIgdGhlIGxhenkgZG9nJyk7XG4gICAqIC8vIGVxdWFsIHRvXG4gICAqIHZhciBoYXNoID0gbWQ1LmNyZWF0ZSgpO1xuICAgKiBoYXNoLnVwZGF0ZSgnVGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZycpO1xuICAgKi9cbiAgdmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbWV0aG9kID0gY3JlYXRlT3V0cHV0TWV0aG9kKCdoZXgnKTtcbiAgICBpZiAoTk9ERV9KUykge1xuICAgICAgbWV0aG9kID0gbm9kZVdyYXAobWV0aG9kKTtcbiAgICB9XG4gICAgbWV0aG9kLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXcgTWQ1KCk7XG4gICAgfTtcbiAgICBtZXRob2QudXBkYXRlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiBtZXRob2QuY3JlYXRlKCkudXBkYXRlKG1lc3NhZ2UpO1xuICAgIH07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBPVVRQVVRfVFlQRVMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciB0eXBlID0gT1VUUFVUX1RZUEVTW2ldO1xuICAgICAgbWV0aG9kW3R5cGVdID0gY3JlYXRlT3V0cHV0TWV0aG9kKHR5cGUpO1xuICAgIH1cbiAgICByZXR1cm4gbWV0aG9kO1xuICB9O1xuXG4gIHZhciBub2RlV3JhcCA9IGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICB2YXIgY3J5cHRvID0gZXZhbChcInJlcXVpcmUoJ2NyeXB0bycpXCIpO1xuICAgIHZhciBCdWZmZXIgPSBldmFsKFwicmVxdWlyZSgnYnVmZmVyJykuQnVmZmVyXCIpO1xuICAgIHZhciBub2RlTWV0aG9kID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGNyeXB0by5jcmVhdGVIYXNoKCdtZDUnKS51cGRhdGUobWVzc2FnZSwgJ3V0ZjgnKS5kaWdlc3QoJ2hleCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgPT09IG51bGwgfHwgbWVzc2FnZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgRVJST1I7XG4gICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZS5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICBtZXNzYWdlID0gbmV3IFVpbnQ4QXJyYXkobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG1lc3NhZ2UpIHx8IEFycmF5QnVmZmVyLmlzVmlldyhtZXNzYWdlKSB8fFxuICAgICAgICBtZXNzYWdlLmNvbnN0cnVjdG9yID09PSBCdWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIGNyeXB0by5jcmVhdGVIYXNoKCdtZDUnKS51cGRhdGUobmV3IEJ1ZmZlcihtZXNzYWdlKSkuZGlnZXN0KCdoZXgnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtZXRob2QobWVzc2FnZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gbm9kZU1ldGhvZDtcbiAgfTtcblxuICAvKipcbiAgICogTWQ1IGNsYXNzXG4gICAqIEBjbGFzcyBNZDVcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgaXMgaW50ZXJuYWwgY2xhc3MuXG4gICAqIEBzZWUge0BsaW5rIG1kNS5jcmVhdGV9XG4gICAqL1xuICBmdW5jdGlvbiBNZDUoc2hhcmVkTWVtb3J5KSB7XG4gICAgaWYgKHNoYXJlZE1lbW9yeSkge1xuICAgICAgYmxvY2tzWzBdID0gYmxvY2tzWzE2XSA9IGJsb2Nrc1sxXSA9IGJsb2Nrc1syXSA9IGJsb2Nrc1szXSA9XG4gICAgICBibG9ja3NbNF0gPSBibG9ja3NbNV0gPSBibG9ja3NbNl0gPSBibG9ja3NbN10gPVxuICAgICAgYmxvY2tzWzhdID0gYmxvY2tzWzldID0gYmxvY2tzWzEwXSA9IGJsb2Nrc1sxMV0gPVxuICAgICAgYmxvY2tzWzEyXSA9IGJsb2Nrc1sxM10gPSBibG9ja3NbMTRdID0gYmxvY2tzWzE1XSA9IDA7XG4gICAgICB0aGlzLmJsb2NrcyA9IGJsb2NrcztcbiAgICAgIHRoaXMuYnVmZmVyOCA9IGJ1ZmZlcjg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChBUlJBWV9CVUZGRVIpIHtcbiAgICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcig2OCk7XG4gICAgICAgIHRoaXMuYnVmZmVyOCA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcik7XG4gICAgICAgIHRoaXMuYmxvY2tzID0gbmV3IFVpbnQzMkFycmF5KGJ1ZmZlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmJsb2NrcyA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5oMCA9IHRoaXMuaDEgPSB0aGlzLmgyID0gdGhpcy5oMyA9IHRoaXMuc3RhcnQgPSB0aGlzLmJ5dGVzID0gdGhpcy5oQnl0ZXMgPSAwO1xuICAgIHRoaXMuZmluYWxpemVkID0gdGhpcy5oYXNoZWQgPSBmYWxzZTtcbiAgICB0aGlzLmZpcnN0ID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgKiBAbWVtYmVyb2YgTWQ1XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gVXBkYXRlIGhhc2hcbiAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl8VWludDhBcnJheXxBcnJheUJ1ZmZlcn0gbWVzc2FnZSBtZXNzYWdlIHRvIGhhc2hcbiAgICogQHJldHVybnMge01kNX0gTWQ1IG9iamVjdC5cbiAgICogQHNlZSB7QGxpbmsgbWQ1LnVwZGF0ZX1cbiAgICovXG4gIE1kNS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICBpZiAodGhpcy5maW5hbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbm90U3RyaW5nLCB0eXBlID0gdHlwZW9mIG1lc3NhZ2U7XG4gICAgaWYgKHR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgPT09IG51bGwpIHtcbiAgICAgICAgICB0aHJvdyBFUlJPUjtcbiAgICAgICAgfSBlbHNlIGlmIChBUlJBWV9CVUZGRVIgJiYgbWVzc2FnZS5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICBtZXNzYWdlID0gbmV3IFVpbnQ4QXJyYXkobWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkobWVzc2FnZSkpIHtcbiAgICAgICAgICBpZiAoIUFSUkFZX0JVRkZFUiB8fCAhQXJyYXlCdWZmZXIuaXNWaWV3KG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICB0aHJvdyBFUlJPUjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVSUk9SO1xuICAgICAgfVxuICAgICAgbm90U3RyaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIGNvZGUsIGluZGV4ID0gMCwgaSwgbGVuZ3RoID0gbWVzc2FnZS5sZW5ndGgsIGJsb2NrcyA9IHRoaXMuYmxvY2tzO1xuICAgIHZhciBidWZmZXI4ID0gdGhpcy5idWZmZXI4O1xuXG4gICAgd2hpbGUgKGluZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBpZiAodGhpcy5oYXNoZWQpIHtcbiAgICAgICAgdGhpcy5oYXNoZWQgPSBmYWxzZTtcbiAgICAgICAgYmxvY2tzWzBdID0gYmxvY2tzWzE2XTtcbiAgICAgICAgYmxvY2tzWzE2XSA9IGJsb2Nrc1sxXSA9IGJsb2Nrc1syXSA9IGJsb2Nrc1szXSA9XG4gICAgICAgIGJsb2Nrc1s0XSA9IGJsb2Nrc1s1XSA9IGJsb2Nrc1s2XSA9IGJsb2Nrc1s3XSA9XG4gICAgICAgIGJsb2Nrc1s4XSA9IGJsb2Nrc1s5XSA9IGJsb2Nrc1sxMF0gPSBibG9ja3NbMTFdID1cbiAgICAgICAgYmxvY2tzWzEyXSA9IGJsb2Nrc1sxM10gPSBibG9ja3NbMTRdID0gYmxvY2tzWzE1XSA9IDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChub3RTdHJpbmcpIHtcbiAgICAgICAgaWYgKEFSUkFZX0JVRkZFUikge1xuICAgICAgICAgIGZvciAoaSA9IHRoaXMuc3RhcnQ7IGluZGV4IDwgbGVuZ3RoICYmIGkgPCA2NDsgKytpbmRleCkge1xuICAgICAgICAgICAgYnVmZmVyOFtpKytdID0gbWVzc2FnZVtpbmRleF07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvciAoaSA9IHRoaXMuc3RhcnQ7IGluZGV4IDwgbGVuZ3RoICYmIGkgPCA2NDsgKytpbmRleCkge1xuICAgICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gbWVzc2FnZVtpbmRleF0gPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoQVJSQVlfQlVGRkVSKSB7XG4gICAgICAgICAgZm9yIChpID0gdGhpcy5zdGFydDsgaW5kZXggPCBsZW5ndGggJiYgaSA8IDY0OyArK2luZGV4KSB7XG4gICAgICAgICAgICBjb2RlID0gbWVzc2FnZS5jaGFyQ29kZUF0KGluZGV4KTtcbiAgICAgICAgICAgIGlmIChjb2RlIDwgMHg4MCkge1xuICAgICAgICAgICAgICBidWZmZXI4W2krK10gPSBjb2RlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb2RlIDwgMHg4MDApIHtcbiAgICAgICAgICAgICAgYnVmZmVyOFtpKytdID0gMHhjMCB8IChjb2RlID4+IDYpO1xuICAgICAgICAgICAgICBidWZmZXI4W2krK10gPSAweDgwIHwgKGNvZGUgJiAweDNmKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29kZSA8IDB4ZDgwMCB8fCBjb2RlID49IDB4ZTAwMCkge1xuICAgICAgICAgICAgICBidWZmZXI4W2krK10gPSAweGUwIHwgKGNvZGUgPj4gMTIpO1xuICAgICAgICAgICAgICBidWZmZXI4W2krK10gPSAweDgwIHwgKChjb2RlID4+IDYpICYgMHgzZik7XG4gICAgICAgICAgICAgIGJ1ZmZlcjhbaSsrXSA9IDB4ODAgfCAoY29kZSAmIDB4M2YpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29kZSA9IDB4MTAwMDAgKyAoKChjb2RlICYgMHgzZmYpIDw8IDEwKSB8IChtZXNzYWdlLmNoYXJDb2RlQXQoKytpbmRleCkgJiAweDNmZikpO1xuICAgICAgICAgICAgICBidWZmZXI4W2krK10gPSAweGYwIHwgKGNvZGUgPj4gMTgpO1xuICAgICAgICAgICAgICBidWZmZXI4W2krK10gPSAweDgwIHwgKChjb2RlID4+IDEyKSAmIDB4M2YpO1xuICAgICAgICAgICAgICBidWZmZXI4W2krK10gPSAweDgwIHwgKChjb2RlID4+IDYpICYgMHgzZik7XG4gICAgICAgICAgICAgIGJ1ZmZlcjhbaSsrXSA9IDB4ODAgfCAoY29kZSAmIDB4M2YpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGkgPSB0aGlzLnN0YXJ0OyBpbmRleCA8IGxlbmd0aCAmJiBpIDwgNjQ7ICsraW5kZXgpIHtcbiAgICAgICAgICAgIGNvZGUgPSBtZXNzYWdlLmNoYXJDb2RlQXQoaW5kZXgpO1xuICAgICAgICAgICAgaWYgKGNvZGUgPCAweDgwKSB7XG4gICAgICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9IGNvZGUgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPCAweDgwMCkge1xuICAgICAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHhjMCB8IChjb2RlID4+IDYpKSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gKDB4ODAgfCAoY29kZSAmIDB4M2YpKSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29kZSA8IDB4ZDgwMCB8fCBjb2RlID49IDB4ZTAwMCkge1xuICAgICAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHhlMCB8IChjb2RlID4+IDEyKSkgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9ICgweDgwIHwgKChjb2RlID4+IDYpICYgMHgzZikpIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHg4MCB8IChjb2RlICYgMHgzZikpIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29kZSA9IDB4MTAwMDAgKyAoKChjb2RlICYgMHgzZmYpIDw8IDEwKSB8IChtZXNzYWdlLmNoYXJDb2RlQXQoKytpbmRleCkgJiAweDNmZikpO1xuICAgICAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHhmMCB8IChjb2RlID4+IDE4KSkgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9ICgweDgwIHwgKChjb2RlID4+IDEyKSAmIDB4M2YpKSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gKDB4ODAgfCAoKGNvZGUgPj4gNikgJiAweDNmKSkgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9ICgweDgwIHwgKGNvZGUgJiAweDNmKSkgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmxhc3RCeXRlSW5kZXggPSBpO1xuICAgICAgdGhpcy5ieXRlcyArPSBpIC0gdGhpcy5zdGFydDtcbiAgICAgIGlmIChpID49IDY0KSB7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBpIC0gNjQ7XG4gICAgICAgIHRoaXMuaGFzaCgpO1xuICAgICAgICB0aGlzLmhhc2hlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXJ0ID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuYnl0ZXMgPiA0Mjk0OTY3Mjk1KSB7XG4gICAgICB0aGlzLmhCeXRlcyArPSB0aGlzLmJ5dGVzIC8gNDI5NDk2NzI5NiA8PCAwO1xuICAgICAgdGhpcy5ieXRlcyA9IHRoaXMuYnl0ZXMgJSA0Mjk0OTY3Mjk2O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBNZDUucHJvdG90eXBlLmZpbmFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmZpbmFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmZpbmFsaXplZCA9IHRydWU7XG4gICAgdmFyIGJsb2NrcyA9IHRoaXMuYmxvY2tzLCBpID0gdGhpcy5sYXN0Qnl0ZUluZGV4O1xuICAgIGJsb2Nrc1tpID4+IDJdIHw9IEVYVFJBW2kgJiAzXTtcbiAgICBpZiAoaSA+PSA1Nikge1xuICAgICAgaWYgKCF0aGlzLmhhc2hlZCkge1xuICAgICAgICB0aGlzLmhhc2goKTtcbiAgICAgIH1cbiAgICAgIGJsb2Nrc1swXSA9IGJsb2Nrc1sxNl07XG4gICAgICBibG9ja3NbMTZdID0gYmxvY2tzWzFdID0gYmxvY2tzWzJdID0gYmxvY2tzWzNdID1cbiAgICAgIGJsb2Nrc1s0XSA9IGJsb2Nrc1s1XSA9IGJsb2Nrc1s2XSA9IGJsb2Nrc1s3XSA9XG4gICAgICBibG9ja3NbOF0gPSBibG9ja3NbOV0gPSBibG9ja3NbMTBdID0gYmxvY2tzWzExXSA9XG4gICAgICBibG9ja3NbMTJdID0gYmxvY2tzWzEzXSA9IGJsb2Nrc1sxNF0gPSBibG9ja3NbMTVdID0gMDtcbiAgICB9XG4gICAgYmxvY2tzWzE0XSA9IHRoaXMuYnl0ZXMgPDwgMztcbiAgICBibG9ja3NbMTVdID0gdGhpcy5oQnl0ZXMgPDwgMyB8IHRoaXMuYnl0ZXMgPj4+IDI5O1xuICAgIHRoaXMuaGFzaCgpO1xuICB9O1xuXG4gIE1kNS5wcm90b3R5cGUuaGFzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYSwgYiwgYywgZCwgYmMsIGRhLCBibG9ja3MgPSB0aGlzLmJsb2NrcztcblxuICAgIGlmICh0aGlzLmZpcnN0KSB7XG4gICAgICBhID0gYmxvY2tzWzBdIC0gNjgwODc2OTM3O1xuICAgICAgYSA9IChhIDw8IDcgfCBhID4+PiAyNSkgLSAyNzE3MzM4NzkgPDwgMDtcbiAgICAgIGQgPSAoLTE3MzI1ODQxOTQgXiBhICYgMjAwNDMxODA3MSkgKyBibG9ja3NbMV0gLSAxMTc4MzA3MDg7XG4gICAgICBkID0gKGQgPDwgMTIgfCBkID4+PiAyMCkgKyBhIDw8IDA7XG4gICAgICBjID0gKC0yNzE3MzM4NzkgXiAoZCAmIChhIF4gLTI3MTczMzg3OSkpKSArIGJsb2Nrc1syXSAtIDExMjY0NzgzNzU7XG4gICAgICBjID0gKGMgPDwgMTcgfCBjID4+PiAxNSkgKyBkIDw8IDA7XG4gICAgICBiID0gKGEgXiAoYyAmIChkIF4gYSkpKSArIGJsb2Nrc1szXSAtIDEzMTYyNTkyMDk7XG4gICAgICBiID0gKGIgPDwgMjIgfCBiID4+PiAxMCkgKyBjIDw8IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGEgPSB0aGlzLmgwO1xuICAgICAgYiA9IHRoaXMuaDE7XG4gICAgICBjID0gdGhpcy5oMjtcbiAgICAgIGQgPSB0aGlzLmgzO1xuICAgICAgYSArPSAoZCBeIChiICYgKGMgXiBkKSkpICsgYmxvY2tzWzBdIC0gNjgwODc2OTM2O1xuICAgICAgYSA9IChhIDw8IDcgfCBhID4+PiAyNSkgKyBiIDw8IDA7XG4gICAgICBkICs9IChjIF4gKGEgJiAoYiBeIGMpKSkgKyBibG9ja3NbMV0gLSAzODk1NjQ1ODY7XG4gICAgICBkID0gKGQgPDwgMTIgfCBkID4+PiAyMCkgKyBhIDw8IDA7XG4gICAgICBjICs9IChiIF4gKGQgJiAoYSBeIGIpKSkgKyBibG9ja3NbMl0gKyA2MDYxMDU4MTk7XG4gICAgICBjID0gKGMgPDwgMTcgfCBjID4+PiAxNSkgKyBkIDw8IDA7XG4gICAgICBiICs9IChhIF4gKGMgJiAoZCBeIGEpKSkgKyBibG9ja3NbM10gLSAxMDQ0NTI1MzMwO1xuICAgICAgYiA9IChiIDw8IDIyIHwgYiA+Pj4gMTApICsgYyA8PCAwO1xuICAgIH1cblxuICAgIGEgKz0gKGQgXiAoYiAmIChjIF4gZCkpKSArIGJsb2Nrc1s0XSAtIDE3NjQxODg5NztcbiAgICBhID0gKGEgPDwgNyB8IGEgPj4+IDI1KSArIGIgPDwgMDtcbiAgICBkICs9IChjIF4gKGEgJiAoYiBeIGMpKSkgKyBibG9ja3NbNV0gKyAxMjAwMDgwNDI2O1xuICAgIGQgPSAoZCA8PCAxMiB8IGQgPj4+IDIwKSArIGEgPDwgMDtcbiAgICBjICs9IChiIF4gKGQgJiAoYSBeIGIpKSkgKyBibG9ja3NbNl0gLSAxNDczMjMxMzQxO1xuICAgIGMgPSAoYyA8PCAxNyB8IGMgPj4+IDE1KSArIGQgPDwgMDtcbiAgICBiICs9IChhIF4gKGMgJiAoZCBeIGEpKSkgKyBibG9ja3NbN10gLSA0NTcwNTk4MztcbiAgICBiID0gKGIgPDwgMjIgfCBiID4+PiAxMCkgKyBjIDw8IDA7XG4gICAgYSArPSAoZCBeIChiICYgKGMgXiBkKSkpICsgYmxvY2tzWzhdICsgMTc3MDAzNTQxNjtcbiAgICBhID0gKGEgPDwgNyB8IGEgPj4+IDI1KSArIGIgPDwgMDtcbiAgICBkICs9IChjIF4gKGEgJiAoYiBeIGMpKSkgKyBibG9ja3NbOV0gLSAxOTU4NDE0NDE3O1xuICAgIGQgPSAoZCA8PCAxMiB8IGQgPj4+IDIwKSArIGEgPDwgMDtcbiAgICBjICs9IChiIF4gKGQgJiAoYSBeIGIpKSkgKyBibG9ja3NbMTBdIC0gNDIwNjM7XG4gICAgYyA9IChjIDw8IDE3IHwgYyA+Pj4gMTUpICsgZCA8PCAwO1xuICAgIGIgKz0gKGEgXiAoYyAmIChkIF4gYSkpKSArIGJsb2Nrc1sxMV0gLSAxOTkwNDA0MTYyO1xuICAgIGIgPSAoYiA8PCAyMiB8IGIgPj4+IDEwKSArIGMgPDwgMDtcbiAgICBhICs9IChkIF4gKGIgJiAoYyBeIGQpKSkgKyBibG9ja3NbMTJdICsgMTgwNDYwMzY4MjtcbiAgICBhID0gKGEgPDwgNyB8IGEgPj4+IDI1KSArIGIgPDwgMDtcbiAgICBkICs9IChjIF4gKGEgJiAoYiBeIGMpKSkgKyBibG9ja3NbMTNdIC0gNDAzNDExMDE7XG4gICAgZCA9IChkIDw8IDEyIHwgZCA+Pj4gMjApICsgYSA8PCAwO1xuICAgIGMgKz0gKGIgXiAoZCAmIChhIF4gYikpKSArIGJsb2Nrc1sxNF0gLSAxNTAyMDAyMjkwO1xuICAgIGMgPSAoYyA8PCAxNyB8IGMgPj4+IDE1KSArIGQgPDwgMDtcbiAgICBiICs9IChhIF4gKGMgJiAoZCBeIGEpKSkgKyBibG9ja3NbMTVdICsgMTIzNjUzNTMyOTtcbiAgICBiID0gKGIgPDwgMjIgfCBiID4+PiAxMCkgKyBjIDw8IDA7XG4gICAgYSArPSAoYyBeIChkICYgKGIgXiBjKSkpICsgYmxvY2tzWzFdIC0gMTY1Nzk2NTEwO1xuICAgIGEgPSAoYSA8PCA1IHwgYSA+Pj4gMjcpICsgYiA8PCAwO1xuICAgIGQgKz0gKGIgXiAoYyAmIChhIF4gYikpKSArIGJsb2Nrc1s2XSAtIDEwNjk1MDE2MzI7XG4gICAgZCA9IChkIDw8IDkgfCBkID4+PiAyMykgKyBhIDw8IDA7XG4gICAgYyArPSAoYSBeIChiICYgKGQgXiBhKSkpICsgYmxvY2tzWzExXSArIDY0MzcxNzcxMztcbiAgICBjID0gKGMgPDwgMTQgfCBjID4+PiAxOCkgKyBkIDw8IDA7XG4gICAgYiArPSAoZCBeIChhICYgKGMgXiBkKSkpICsgYmxvY2tzWzBdIC0gMzczODk3MzAyO1xuICAgIGIgPSAoYiA8PCAyMCB8IGIgPj4+IDEyKSArIGMgPDwgMDtcbiAgICBhICs9IChjIF4gKGQgJiAoYiBeIGMpKSkgKyBibG9ja3NbNV0gLSA3MDE1NTg2OTE7XG4gICAgYSA9IChhIDw8IDUgfCBhID4+PiAyNykgKyBiIDw8IDA7XG4gICAgZCArPSAoYiBeIChjICYgKGEgXiBiKSkpICsgYmxvY2tzWzEwXSArIDM4MDE2MDgzO1xuICAgIGQgPSAoZCA8PCA5IHwgZCA+Pj4gMjMpICsgYSA8PCAwO1xuICAgIGMgKz0gKGEgXiAoYiAmIChkIF4gYSkpKSArIGJsb2Nrc1sxNV0gLSA2NjA0NzgzMzU7XG4gICAgYyA9IChjIDw8IDE0IHwgYyA+Pj4gMTgpICsgZCA8PCAwO1xuICAgIGIgKz0gKGQgXiAoYSAmIChjIF4gZCkpKSArIGJsb2Nrc1s0XSAtIDQwNTUzNzg0ODtcbiAgICBiID0gKGIgPDwgMjAgfCBiID4+PiAxMikgKyBjIDw8IDA7XG4gICAgYSArPSAoYyBeIChkICYgKGIgXiBjKSkpICsgYmxvY2tzWzldICsgNTY4NDQ2NDM4O1xuICAgIGEgPSAoYSA8PCA1IHwgYSA+Pj4gMjcpICsgYiA8PCAwO1xuICAgIGQgKz0gKGIgXiAoYyAmIChhIF4gYikpKSArIGJsb2Nrc1sxNF0gLSAxMDE5ODAzNjkwO1xuICAgIGQgPSAoZCA8PCA5IHwgZCA+Pj4gMjMpICsgYSA8PCAwO1xuICAgIGMgKz0gKGEgXiAoYiAmIChkIF4gYSkpKSArIGJsb2Nrc1szXSAtIDE4NzM2Mzk2MTtcbiAgICBjID0gKGMgPDwgMTQgfCBjID4+PiAxOCkgKyBkIDw8IDA7XG4gICAgYiArPSAoZCBeIChhICYgKGMgXiBkKSkpICsgYmxvY2tzWzhdICsgMTE2MzUzMTUwMTtcbiAgICBiID0gKGIgPDwgMjAgfCBiID4+PiAxMikgKyBjIDw8IDA7XG4gICAgYSArPSAoYyBeIChkICYgKGIgXiBjKSkpICsgYmxvY2tzWzEzXSAtIDE0NDQ2ODE0Njc7XG4gICAgYSA9IChhIDw8IDUgfCBhID4+PiAyNykgKyBiIDw8IDA7XG4gICAgZCArPSAoYiBeIChjICYgKGEgXiBiKSkpICsgYmxvY2tzWzJdIC0gNTE0MDM3ODQ7XG4gICAgZCA9IChkIDw8IDkgfCBkID4+PiAyMykgKyBhIDw8IDA7XG4gICAgYyArPSAoYSBeIChiICYgKGQgXiBhKSkpICsgYmxvY2tzWzddICsgMTczNTMyODQ3MztcbiAgICBjID0gKGMgPDwgMTQgfCBjID4+PiAxOCkgKyBkIDw8IDA7XG4gICAgYiArPSAoZCBeIChhICYgKGMgXiBkKSkpICsgYmxvY2tzWzEyXSAtIDE5MjY2MDc3MzQ7XG4gICAgYiA9IChiIDw8IDIwIHwgYiA+Pj4gMTIpICsgYyA8PCAwO1xuICAgIGJjID0gYiBeIGM7XG4gICAgYSArPSAoYmMgXiBkKSArIGJsb2Nrc1s1XSAtIDM3ODU1ODtcbiAgICBhID0gKGEgPDwgNCB8IGEgPj4+IDI4KSArIGIgPDwgMDtcbiAgICBkICs9IChiYyBeIGEpICsgYmxvY2tzWzhdIC0gMjAyMjU3NDQ2MztcbiAgICBkID0gKGQgPDwgMTEgfCBkID4+PiAyMSkgKyBhIDw8IDA7XG4gICAgZGEgPSBkIF4gYTtcbiAgICBjICs9IChkYSBeIGIpICsgYmxvY2tzWzExXSArIDE4MzkwMzA1NjI7XG4gICAgYyA9IChjIDw8IDE2IHwgYyA+Pj4gMTYpICsgZCA8PCAwO1xuICAgIGIgKz0gKGRhIF4gYykgKyBibG9ja3NbMTRdIC0gMzUzMDk1NTY7XG4gICAgYiA9IChiIDw8IDIzIHwgYiA+Pj4gOSkgKyBjIDw8IDA7XG4gICAgYmMgPSBiIF4gYztcbiAgICBhICs9IChiYyBeIGQpICsgYmxvY2tzWzFdIC0gMTUzMDk5MjA2MDtcbiAgICBhID0gKGEgPDwgNCB8IGEgPj4+IDI4KSArIGIgPDwgMDtcbiAgICBkICs9IChiYyBeIGEpICsgYmxvY2tzWzRdICsgMTI3Mjg5MzM1MztcbiAgICBkID0gKGQgPDwgMTEgfCBkID4+PiAyMSkgKyBhIDw8IDA7XG4gICAgZGEgPSBkIF4gYTtcbiAgICBjICs9IChkYSBeIGIpICsgYmxvY2tzWzddIC0gMTU1NDk3NjMyO1xuICAgIGMgPSAoYyA8PCAxNiB8IGMgPj4+IDE2KSArIGQgPDwgMDtcbiAgICBiICs9IChkYSBeIGMpICsgYmxvY2tzWzEwXSAtIDEwOTQ3MzA2NDA7XG4gICAgYiA9IChiIDw8IDIzIHwgYiA+Pj4gOSkgKyBjIDw8IDA7XG4gICAgYmMgPSBiIF4gYztcbiAgICBhICs9IChiYyBeIGQpICsgYmxvY2tzWzEzXSArIDY4MTI3OTE3NDtcbiAgICBhID0gKGEgPDwgNCB8IGEgPj4+IDI4KSArIGIgPDwgMDtcbiAgICBkICs9IChiYyBeIGEpICsgYmxvY2tzWzBdIC0gMzU4NTM3MjIyO1xuICAgIGQgPSAoZCA8PCAxMSB8IGQgPj4+IDIxKSArIGEgPDwgMDtcbiAgICBkYSA9IGQgXiBhO1xuICAgIGMgKz0gKGRhIF4gYikgKyBibG9ja3NbM10gLSA3MjI1MjE5Nzk7XG4gICAgYyA9IChjIDw8IDE2IHwgYyA+Pj4gMTYpICsgZCA8PCAwO1xuICAgIGIgKz0gKGRhIF4gYykgKyBibG9ja3NbNl0gKyA3NjAyOTE4OTtcbiAgICBiID0gKGIgPDwgMjMgfCBiID4+PiA5KSArIGMgPDwgMDtcbiAgICBiYyA9IGIgXiBjO1xuICAgIGEgKz0gKGJjIF4gZCkgKyBibG9ja3NbOV0gLSA2NDAzNjQ0ODc7XG4gICAgYSA9IChhIDw8IDQgfCBhID4+PiAyOCkgKyBiIDw8IDA7XG4gICAgZCArPSAoYmMgXiBhKSArIGJsb2Nrc1sxMl0gLSA0MjE4MTU4MzU7XG4gICAgZCA9IChkIDw8IDExIHwgZCA+Pj4gMjEpICsgYSA8PCAwO1xuICAgIGRhID0gZCBeIGE7XG4gICAgYyArPSAoZGEgXiBiKSArIGJsb2Nrc1sxNV0gKyA1MzA3NDI1MjA7XG4gICAgYyA9IChjIDw8IDE2IHwgYyA+Pj4gMTYpICsgZCA8PCAwO1xuICAgIGIgKz0gKGRhIF4gYykgKyBibG9ja3NbMl0gLSA5OTUzMzg2NTE7XG4gICAgYiA9IChiIDw8IDIzIHwgYiA+Pj4gOSkgKyBjIDw8IDA7XG4gICAgYSArPSAoYyBeIChiIHwgfmQpKSArIGJsb2Nrc1swXSAtIDE5ODYzMDg0NDtcbiAgICBhID0gKGEgPDwgNiB8IGEgPj4+IDI2KSArIGIgPDwgMDtcbiAgICBkICs9IChiIF4gKGEgfCB+YykpICsgYmxvY2tzWzddICsgMTEyNjg5MTQxNTtcbiAgICBkID0gKGQgPDwgMTAgfCBkID4+PiAyMikgKyBhIDw8IDA7XG4gICAgYyArPSAoYSBeIChkIHwgfmIpKSArIGJsb2Nrc1sxNF0gLSAxNDE2MzU0OTA1O1xuICAgIGMgPSAoYyA8PCAxNSB8IGMgPj4+IDE3KSArIGQgPDwgMDtcbiAgICBiICs9IChkIF4gKGMgfCB+YSkpICsgYmxvY2tzWzVdIC0gNTc0MzQwNTU7XG4gICAgYiA9IChiIDw8IDIxIHwgYiA+Pj4gMTEpICsgYyA8PCAwO1xuICAgIGEgKz0gKGMgXiAoYiB8IH5kKSkgKyBibG9ja3NbMTJdICsgMTcwMDQ4NTU3MTtcbiAgICBhID0gKGEgPDwgNiB8IGEgPj4+IDI2KSArIGIgPDwgMDtcbiAgICBkICs9IChiIF4gKGEgfCB+YykpICsgYmxvY2tzWzNdIC0gMTg5NDk4NjYwNjtcbiAgICBkID0gKGQgPDwgMTAgfCBkID4+PiAyMikgKyBhIDw8IDA7XG4gICAgYyArPSAoYSBeIChkIHwgfmIpKSArIGJsb2Nrc1sxMF0gLSAxMDUxNTIzO1xuICAgIGMgPSAoYyA8PCAxNSB8IGMgPj4+IDE3KSArIGQgPDwgMDtcbiAgICBiICs9IChkIF4gKGMgfCB+YSkpICsgYmxvY2tzWzFdIC0gMjA1NDkyMjc5OTtcbiAgICBiID0gKGIgPDwgMjEgfCBiID4+PiAxMSkgKyBjIDw8IDA7XG4gICAgYSArPSAoYyBeIChiIHwgfmQpKSArIGJsb2Nrc1s4XSArIDE4NzMzMTMzNTk7XG4gICAgYSA9IChhIDw8IDYgfCBhID4+PiAyNikgKyBiIDw8IDA7XG4gICAgZCArPSAoYiBeIChhIHwgfmMpKSArIGJsb2Nrc1sxNV0gLSAzMDYxMTc0NDtcbiAgICBkID0gKGQgPDwgMTAgfCBkID4+PiAyMikgKyBhIDw8IDA7XG4gICAgYyArPSAoYSBeIChkIHwgfmIpKSArIGJsb2Nrc1s2XSAtIDE1NjAxOTgzODA7XG4gICAgYyA9IChjIDw8IDE1IHwgYyA+Pj4gMTcpICsgZCA8PCAwO1xuICAgIGIgKz0gKGQgXiAoYyB8IH5hKSkgKyBibG9ja3NbMTNdICsgMTMwOTE1MTY0OTtcbiAgICBiID0gKGIgPDwgMjEgfCBiID4+PiAxMSkgKyBjIDw8IDA7XG4gICAgYSArPSAoYyBeIChiIHwgfmQpKSArIGJsb2Nrc1s0XSAtIDE0NTUyMzA3MDtcbiAgICBhID0gKGEgPDwgNiB8IGEgPj4+IDI2KSArIGIgPDwgMDtcbiAgICBkICs9IChiIF4gKGEgfCB+YykpICsgYmxvY2tzWzExXSAtIDExMjAyMTAzNzk7XG4gICAgZCA9IChkIDw8IDEwIHwgZCA+Pj4gMjIpICsgYSA8PCAwO1xuICAgIGMgKz0gKGEgXiAoZCB8IH5iKSkgKyBibG9ja3NbMl0gKyA3MTg3ODcyNTk7XG4gICAgYyA9IChjIDw8IDE1IHwgYyA+Pj4gMTcpICsgZCA8PCAwO1xuICAgIGIgKz0gKGQgXiAoYyB8IH5hKSkgKyBibG9ja3NbOV0gLSAzNDM0ODU1NTE7XG4gICAgYiA9IChiIDw8IDIxIHwgYiA+Pj4gMTEpICsgYyA8PCAwO1xuXG4gICAgaWYgKHRoaXMuZmlyc3QpIHtcbiAgICAgIHRoaXMuaDAgPSBhICsgMTczMjU4NDE5MyA8PCAwO1xuICAgICAgdGhpcy5oMSA9IGIgLSAyNzE3MzM4NzkgPDwgMDtcbiAgICAgIHRoaXMuaDIgPSBjIC0gMTczMjU4NDE5NCA8PCAwO1xuICAgICAgdGhpcy5oMyA9IGQgKyAyNzE3MzM4NzggPDwgMDtcbiAgICAgIHRoaXMuZmlyc3QgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oMCA9IHRoaXMuaDAgKyBhIDw8IDA7XG4gICAgICB0aGlzLmgxID0gdGhpcy5oMSArIGIgPDwgMDtcbiAgICAgIHRoaXMuaDIgPSB0aGlzLmgyICsgYyA8PCAwO1xuICAgICAgdGhpcy5oMyA9IHRoaXMuaDMgKyBkIDw8IDA7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGhleFxuICAgKiBAbWVtYmVyb2YgTWQ1XG4gICAqIEBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gT3V0cHV0IGhhc2ggYXMgaGV4IHN0cmluZ1xuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBIZXggc3RyaW5nXG4gICAqIEBzZWUge0BsaW5rIG1kNS5oZXh9XG4gICAqIEBleGFtcGxlXG4gICAqIGhhc2guaGV4KCk7XG4gICAqL1xuICBNZDUucHJvdG90eXBlLmhleCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZpbmFsaXplKCk7XG5cbiAgICB2YXIgaDAgPSB0aGlzLmgwLCBoMSA9IHRoaXMuaDEsIGgyID0gdGhpcy5oMiwgaDMgPSB0aGlzLmgzO1xuXG4gICAgcmV0dXJuIEhFWF9DSEFSU1soaDAgPj4gNCkgJiAweDBGXSArIEhFWF9DSEFSU1toMCAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDAgPj4gMTIpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGgwID4+IDgpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMCA+PiAyMCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDAgPj4gMTYpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMCA+PiAyOCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDAgPj4gMjQpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMSA+PiA0KSAmIDB4MEZdICsgSEVYX0NIQVJTW2gxICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMSA+PiAxMikgJiAweDBGXSArIEhFWF9DSEFSU1soaDEgPj4gOCkgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgxID4+IDIwKSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoMSA+PiAxNikgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgxID4+IDI4KSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoMSA+PiAyNCkgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgyID4+IDQpICYgMHgwRl0gKyBIRVhfQ0hBUlNbaDIgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgyID4+IDEyKSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoMiA+PiA4KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDIgPj4gMjApICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGgyID4+IDE2KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDIgPj4gMjgpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGgyID4+IDI0KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDMgPj4gNCkgJiAweDBGXSArIEhFWF9DSEFSU1toMyAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDMgPj4gMTIpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGgzID4+IDgpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMyA+PiAyMCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDMgPj4gMTYpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMyA+PiAyOCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDMgPj4gMjQpICYgMHgwRl07XG4gIH07XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdG9TdHJpbmdcbiAgICogQG1lbWJlcm9mIE1kNVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIE91dHB1dCBoYXNoIGFzIGhleCBzdHJpbmdcbiAgICogQHJldHVybnMge1N0cmluZ30gSGV4IHN0cmluZ1xuICAgKiBAc2VlIHtAbGluayBtZDUuaGV4fVxuICAgKiBAZXhhbXBsZVxuICAgKiBoYXNoLnRvU3RyaW5nKCk7XG4gICAqL1xuICBNZDUucHJvdG90eXBlLnRvU3RyaW5nID0gTWQ1LnByb3RvdHlwZS5oZXg7XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGlnZXN0XG4gICAqIEBtZW1iZXJvZiBNZDVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBPdXRwdXQgaGFzaCBhcyBieXRlcyBhcnJheVxuICAgKiBAcmV0dXJucyB7QXJyYXl9IEJ5dGVzIGFycmF5XG4gICAqIEBzZWUge0BsaW5rIG1kNS5kaWdlc3R9XG4gICAqIEBleGFtcGxlXG4gICAqIGhhc2guZGlnZXN0KCk7XG4gICAqL1xuICBNZDUucHJvdG90eXBlLmRpZ2VzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZpbmFsaXplKCk7XG5cbiAgICB2YXIgaDAgPSB0aGlzLmgwLCBoMSA9IHRoaXMuaDEsIGgyID0gdGhpcy5oMiwgaDMgPSB0aGlzLmgzO1xuICAgIHJldHVybiBbXG4gICAgICBoMCAmIDB4RkYsIChoMCA+PiA4KSAmIDB4RkYsIChoMCA+PiAxNikgJiAweEZGLCAoaDAgPj4gMjQpICYgMHhGRixcbiAgICAgIGgxICYgMHhGRiwgKGgxID4+IDgpICYgMHhGRiwgKGgxID4+IDE2KSAmIDB4RkYsIChoMSA+PiAyNCkgJiAweEZGLFxuICAgICAgaDIgJiAweEZGLCAoaDIgPj4gOCkgJiAweEZGLCAoaDIgPj4gMTYpICYgMHhGRiwgKGgyID4+IDI0KSAmIDB4RkYsXG4gICAgICBoMyAmIDB4RkYsIChoMyA+PiA4KSAmIDB4RkYsIChoMyA+PiAxNikgJiAweEZGLCAoaDMgPj4gMjQpICYgMHhGRlxuICAgIF07XG4gIH07XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYXJyYXlcbiAgICogQG1lbWJlcm9mIE1kNVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIE91dHB1dCBoYXNoIGFzIGJ5dGVzIGFycmF5XG4gICAqIEByZXR1cm5zIHtBcnJheX0gQnl0ZXMgYXJyYXlcbiAgICogQHNlZSB7QGxpbmsgbWQ1LmFycmF5fVxuICAgKiBAZXhhbXBsZVxuICAgKiBoYXNoLmFycmF5KCk7XG4gICAqL1xuICBNZDUucHJvdG90eXBlLmFycmF5ID0gTWQ1LnByb3RvdHlwZS5kaWdlc3Q7XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYXJyYXlCdWZmZXJcbiAgICogQG1lbWJlcm9mIE1kNVxuICAgKiBAaW5zdGFuY2VcbiAgICogQGRlc2NyaXB0aW9uIE91dHB1dCBoYXNoIGFzIEFycmF5QnVmZmVyXG4gICAqIEByZXR1cm5zIHtBcnJheUJ1ZmZlcn0gQXJyYXlCdWZmZXJcbiAgICogQHNlZSB7QGxpbmsgbWQ1LmFycmF5QnVmZmVyfVxuICAgKiBAZXhhbXBsZVxuICAgKiBoYXNoLmFycmF5QnVmZmVyKCk7XG4gICAqL1xuICBNZDUucHJvdG90eXBlLmFycmF5QnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZmluYWxpemUoKTtcblxuICAgIHZhciBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoMTYpO1xuICAgIHZhciBibG9ja3MgPSBuZXcgVWludDMyQXJyYXkoYnVmZmVyKTtcbiAgICBibG9ja3NbMF0gPSB0aGlzLmgwO1xuICAgIGJsb2Nrc1sxXSA9IHRoaXMuaDE7XG4gICAgYmxvY2tzWzJdID0gdGhpcy5oMjtcbiAgICBibG9ja3NbM10gPSB0aGlzLmgzO1xuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYnVmZmVyXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgbWF5YmUgY29uZnVzZSB3aXRoIEJ1ZmZlciBpbiBub2RlLmpzLiBQbGVhc2UgdXNlIGFycmF5QnVmZmVyIGluc3RlYWQuXG4gICAqIEBtZW1iZXJvZiBNZDVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBPdXRwdXQgaGFzaCBhcyBBcnJheUJ1ZmZlclxuICAgKiBAcmV0dXJucyB7QXJyYXlCdWZmZXJ9IEFycmF5QnVmZmVyXG4gICAqIEBzZWUge0BsaW5rIG1kNS5idWZmZXJ9XG4gICAqIEBleGFtcGxlXG4gICAqIGhhc2guYnVmZmVyKCk7XG4gICAqL1xuICBNZDUucHJvdG90eXBlLmJ1ZmZlciA9IE1kNS5wcm90b3R5cGUuYXJyYXlCdWZmZXI7XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYmFzZTY0XG4gICAqIEBtZW1iZXJvZiBNZDVcbiAgICogQGluc3RhbmNlXG4gICAqIEBkZXNjcmlwdGlvbiBPdXRwdXQgaGFzaCBhcyBiYXNlNjQgc3RyaW5nXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IGJhc2U2NCBzdHJpbmdcbiAgICogQHNlZSB7QGxpbmsgbWQ1LmJhc2U2NH1cbiAgICogQGV4YW1wbGVcbiAgICogaGFzaC5iYXNlNjQoKTtcbiAgICovXG4gIE1kNS5wcm90b3R5cGUuYmFzZTY0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB2MSwgdjIsIHYzLCBiYXNlNjRTdHIgPSAnJywgYnl0ZXMgPSB0aGlzLmFycmF5KCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNTspIHtcbiAgICAgIHYxID0gYnl0ZXNbaSsrXTtcbiAgICAgIHYyID0gYnl0ZXNbaSsrXTtcbiAgICAgIHYzID0gYnl0ZXNbaSsrXTtcbiAgICAgIGJhc2U2NFN0ciArPSBCQVNFNjRfRU5DT0RFX0NIQVJbdjEgPj4+IDJdICtcbiAgICAgICAgQkFTRTY0X0VOQ09ERV9DSEFSWyh2MSA8PCA0IHwgdjIgPj4+IDQpICYgNjNdICtcbiAgICAgICAgQkFTRTY0X0VOQ09ERV9DSEFSWyh2MiA8PCAyIHwgdjMgPj4+IDYpICYgNjNdICtcbiAgICAgICAgQkFTRTY0X0VOQ09ERV9DSEFSW3YzICYgNjNdO1xuICAgIH1cbiAgICB2MSA9IGJ5dGVzW2ldO1xuICAgIGJhc2U2NFN0ciArPSBCQVNFNjRfRU5DT0RFX0NIQVJbdjEgPj4+IDJdICtcbiAgICAgIEJBU0U2NF9FTkNPREVfQ0hBUlsodjEgPDwgNCkgJiA2M10gK1xuICAgICAgJz09JztcbiAgICByZXR1cm4gYmFzZTY0U3RyO1xuICB9O1xuXG4gIHZhciBleHBvcnRzID0gY3JlYXRlTWV0aG9kKCk7XG5cbiAgaWYgKENPTU1PTl9KUykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cztcbiAgfSBlbHNlIHtcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIG1kNVxiXG4gICAgICogQGRlc2NyaXB0aW9uIE1kNSBoYXNoIGZ1bmN0aW9uLCBleHBvcnQgdG8gZ2xvYmFsIGluIGJyb3dzZXJzLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fFVpbnQ4QXJyYXl8QXJyYXlCdWZmZXJ9IG1lc3NhZ2UgbWVzc2FnZSB0byBoYXNoXG4gICAgICogQHJldHVybnMge1N0cmluZ30gbWQ1IGhhc2hlc1xuICAgICAqIEBleGFtcGxlXG4gICAgICogbWQ1KCcnKTsgLy8gZDQxZDhjZDk4ZjAwYjIwNGU5ODAwOTk4ZWNmODQyN2VcbiAgICAgKiBtZDUoJ1RoZSBxdWljayBicm93biBmb3gganVtcHMgb3ZlciB0aGUgbGF6eSBkb2cnKTsgLy8gOWUxMDdkOWQzNzJiYjY4MjZiZDgxZDM1NDJhNDE5ZDZcbiAgICAgKiBtZDUoJ1RoZSBxdWljayBicm93biBmb3gganVtcHMgb3ZlciB0aGUgbGF6eSBkb2cuJyk7IC8vIGU0ZDkwOWMyOTBkMGZiMWNhMDY4ZmZhZGRmMjJjYmQwXG4gICAgICpcbiAgICAgKiAvLyBJdCBhbHNvIHN1cHBvcnRzIFVURi04IGVuY29kaW5nXG4gICAgICogbWQ1KCfkuK3mlocnKTsgLy8gYTdiYWMyMjM5ZmNkY2IzYTA2NzkwM2Q4MDc3YzRhMDdcbiAgICAgKlxuICAgICAqIC8vIEl0IGFsc28gc3VwcG9ydHMgYnl0ZSBgQXJyYXlgLCBgVWludDhBcnJheWAsIGBBcnJheUJ1ZmZlcmBcbiAgICAgKiBtZDUoW10pOyAvLyBkNDFkOGNkOThmMDBiMjA0ZTk4MDA5OThlY2Y4NDI3ZVxuICAgICAqIG1kNShuZXcgVWludDhBcnJheShbXSkpOyAvLyBkNDFkOGNkOThmMDBiMjA0ZTk4MDA5OThlY2Y4NDI3ZVxuICAgICAqL1xuICAgIHJvb3QubWQ1ID0gZXhwb3J0cztcbiAgICBpZiAoQU1EKSB7XG4gICAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZXhwb3J0cztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=