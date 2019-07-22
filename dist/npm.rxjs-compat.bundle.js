(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.rxjs-compat"],{

/***/ "+4/i":
/*!******************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/let.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var let_1 = __webpack_require__(/*! ../../operator/let */ "odkN");
rxjs_1.Observable.prototype.let = let_1.letProto;
rxjs_1.Observable.prototype.letBind = let_1.letProto;
//# sourceMappingURL=let.js.map

/***/ }),

/***/ "+oeQ":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/observeOn.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var observeOn_1 = __webpack_require__(/*! ../../operator/observeOn */ "H+DX");
rxjs_1.Observable.prototype.observeOn = observeOn_1.observeOn;
//# sourceMappingURL=observeOn.js.map

/***/ }),

/***/ "+psR":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/retry.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var retry_1 = __webpack_require__(/*! ../../operator/retry */ "16Oq");
rxjs_1.Observable.prototype.retry = retry_1.retry;
//# sourceMappingURL=retry.js.map

/***/ }),

/***/ "+qxJ":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/distinctUntilChanged.js ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var distinctUntilChanged_1 = __webpack_require__(/*! ../../operator/distinctUntilChanged */ "GsYY");
rxjs_1.Observable.prototype.distinctUntilChanged = distinctUntilChanged_1.distinctUntilChanged;
//# sourceMappingURL=distinctUntilChanged.js.map

/***/ }),

/***/ "+v8i":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/concat.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.concat = rxjs_1.concat;
//# sourceMappingURL=concat.js.map

/***/ }),

/***/ "00Es":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/timestamp.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var timestamp_1 = __webpack_require__(/*! ../../operator/timestamp */ "bb3/");
rxjs_1.Observable.prototype.timestamp = timestamp_1.timestamp;
//# sourceMappingURL=timestamp.js.map

/***/ }),

/***/ "02G1":
/*!****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/merge.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (either the source or an
 * Observable given as argument), and simply forwards (without doing any
 * transformation) all the values from all the input Observables to the output
 * Observable. The output Observable only completes once all input Observables
 * have completed. Any error delivered by an input Observable will be immediately
 * emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = clicks.merge(timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = timer1.merge(timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {ObservableInput} other An input Observable to merge with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The IScheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} An Observable that emits items that are the result of
 * every input Observable.
 * @method merge
 * @owner Observable
 */
function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    return this.lift.call(rxjs_1.merge.apply(void 0, [this].concat(observables)));
}
exports.merge = merge;
//# sourceMappingURL=merge.js.map

/***/ }),

/***/ "0ZAG":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/takeLast.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var takeLast_1 = __webpack_require__(/*! ../../operator/takeLast */ "8mU2");
rxjs_1.Observable.prototype.takeLast = takeLast_1.takeLast;
//# sourceMappingURL=takeLast.js.map

/***/ }),

/***/ "0c70":
/*!******************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/toArray.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Collects all source emissions and emits them as an array when the source completes.
 *
 * <span class="informal">Get all values inside an array when the source completes</span>
 *
 * <img src="./img/toArray.png" width="100%">
 *
 * `toArray` will wait until the source Observable completes
 * before emitting the array containing all emissions.
 * When the source Observable errors no array will be emitted.
 *
 * @example <caption>Create array from input</caption>
 * const input = Rx.Observable.interval(100).take(4);
 *
 * input.toArray()
 *   .subscribe(arr => console.log(arr)); // [0,1,2,3]
 *
 * @see {@link buffer}
 *
 * @return {Observable<any[]>|WebSocketSubject<T>|Observable<T>}
 * @method toArray
 * @owner Observable
 */
function toArray() {
    return operators_1.toArray()(this);
}
exports.toArray = toArray;
//# sourceMappingURL=toArray.js.map

/***/ }),

/***/ "11EI":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/fromEventPattern.js ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.fromEventPattern = rxjs_1.fromEventPattern;
//# sourceMappingURL=fromEventPattern.js.map

/***/ }),

/***/ "16Oq":
/*!****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/retry.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Returns an Observable that mirrors the source Observable with the exception of an `error`. If the source Observable
 * calls `error`, this method will resubscribe to the source Observable for a maximum of `count` resubscriptions (given
 * as a number parameter) rather than propagating the `error` call.
 *
 * <img src="./img/retry.png" width="100%">
 *
 * Any and all items emitted by the source Observable will be emitted by the resulting Observable, even those emitted
 * during failed subscriptions. For example, if an Observable fails at first but emits [1, 2] then succeeds the second
 * time and emits: [1, 2, 3, 4, 5] then the complete stream of emissions and notifications
 * would be: [1, 2, 1, 2, 3, 4, 5, `complete`].
 * @param {number} count - Number of retry attempts before failing.
 * @return {Observable} The source Observable modified with the retry logic.
 * @method retry
 * @owner Observable
 */
function retry(count) {
    if (count === void 0) { count = -1; }
    return operators_1.retry(count)(this);
}
exports.retry = retry;
//# sourceMappingURL=retry.js.map

/***/ }),

/***/ "1JPw":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/bindCallback.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.bindCallback = rxjs_1.bindCallback;
//# sourceMappingURL=bindCallback.js.map

/***/ }),

/***/ "1M8x":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/catch.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var catch_1 = __webpack_require__(/*! ../../operator/catch */ "Xk39");
rxjs_1.Observable.prototype.catch = catch_1._catch;
rxjs_1.Observable.prototype._catch = catch_1._catch;
//# sourceMappingURL=catch.js.map

/***/ }),

/***/ "1gRP":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/materialize.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Represents all of the notifications from the source Observable as `next`
 * emissions marked with their original types within {@link Notification}
 * objects.
 *
 * <span class="informal">Wraps `next`, `error` and `complete` emissions in
 * {@link Notification} objects, emitted as `next` on the output Observable.
 * </span>
 *
 * <img src="./img/materialize.png" width="100%">
 *
 * `materialize` returns an Observable that emits a `next` notification for each
 * `next`, `error`, or `complete` emission of the source Observable. When the
 * source Observable emits `complete`, the output Observable will emit `next` as
 * a Notification of type "complete", and then it will emit `complete` as well.
 * When the source Observable emits `error`, the output will emit `next` as a
 * Notification of type "error", and then `complete`.
 *
 * This operator is useful for producing metadata of the source Observable, to
 * be consumed as `next` emissions. Use it in conjunction with
 * {@link dematerialize}.
 *
 * @example <caption>Convert a faulty Observable to an Observable of Notifications</caption>
 * var letters = Rx.Observable.of('a', 'b', 13, 'd');
 * var upperCase = letters.map(x => x.toUpperCase());
 * var materialized = upperCase.materialize();
 * materialized.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // - Notification {kind: "N", value: "A", error: undefined, hasValue: true}
 * // - Notification {kind: "N", value: "B", error: undefined, hasValue: true}
 * // - Notification {kind: "E", value: undefined, error: TypeError:
 * //   x.toUpperCase is not a function at MapSubscriber.letters.map.x
 * //   [as project] (http://1…, hasValue: false}
 *
 * @see {@link Notification}
 * @see {@link dematerialize}
 *
 * @return {Observable<Notification<T>>} An Observable that emits
 * {@link Notification} objects that wrap the original emissions from the source
 * Observable with metadata.
 * @method materialize
 * @owner Observable
 */
function materialize() {
    return operators_1.materialize()(this);
}
exports.materialize = materialize;
//# sourceMappingURL=materialize.js.map

/***/ }),

/***/ "2+DN":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/shareReplay.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var shareReplay_1 = __webpack_require__(/*! ../../operator/shareReplay */ "uMcE");
rxjs_1.Observable.prototype.shareReplay = shareReplay_1.shareReplay;
//# sourceMappingURL=shareReplay.js.map

/***/ }),

/***/ "2IC2":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/windowTime.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var windowTime_1 = __webpack_require__(/*! ../../operator/windowTime */ "j5kd");
rxjs_1.Observable.prototype.windowTime = windowTime_1.windowTime;
//# sourceMappingURL=windowTime.js.map

/***/ }),

/***/ "338f":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/concatMap.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, in a serialized fashion waiting for each one to complete before
 * merging the next.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link concatAll}.</span>
 *
 * <img src="./img/concatMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each new inner Observable is
 * concatenated with the previous inner Observable.
 *
 * __Warning:__ if source values arrive endlessly and faster than their
 * corresponding inner Observables can complete, it will result in memory issues
 * as inner Observables amass in an unbounded buffer waiting for their turn to
 * be subscribed to.
 *
 * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link concat}
 * @see {@link concatAll}
 * @see {@link concatMapTo}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking values from each projected inner
 * Observable sequentially.
 * @method concatMap
 * @owner Observable
 */
function concatMap(project) {
    return operators_1.concatMap(project)(this);
}
exports.concatMap = concatMap;
//# sourceMappingURL=concatMap.js.map

/***/ }),

/***/ "37L2":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/concatMap.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var concatMap_1 = __webpack_require__(/*! ../../operator/concatMap */ "338f");
rxjs_1.Observable.prototype.concatMap = concatMap_1.concatMap;
//# sourceMappingURL=concatMap.js.map

/***/ }),

/***/ "3EiV":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/buffer.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var buffer_1 = __webpack_require__(/*! ../../operator/buffer */ "dL1u");
rxjs_1.Observable.prototype.buffer = buffer_1.buffer;
//# sourceMappingURL=buffer.js.map

/***/ }),

/***/ "3Qpg":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/fromPromise.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.fromPromise = rxjs_1.from;
//# sourceMappingURL=fromPromise.js.map

/***/ }),

/***/ "4AtU":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/expand.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Recursively projects each source value to an Observable which is merged in
 * the output Observable.
 *
 * <span class="informal">It's similar to {@link mergeMap}, but applies the
 * projection function to every source value as well as every output value.
 * It's recursive.</span>
 *
 * <img src="./img/expand.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger. *Expand* will re-emit on the output
 * Observable every source value. Then, each output value is given to the
 * `project` function which returns an inner Observable to be merged on the
 * output Observable. Those output values resulting from the projection are also
 * given to the `project` function to produce new output values. This is how
 * *expand* behaves recursively.
 *
 * @example <caption>Start emitting the powers of two on every click, at most 10 of them</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var powersOfTwo = clicks
 *   .mapTo(1)
 *   .expand(x => Rx.Observable.of(2 * x).delay(1000))
 *   .take(10);
 * powersOfTwo.subscribe(x => console.log(x));
 *
 * @see {@link mergeMap}
 * @see {@link mergeScan}
 *
 * @param {function(value: T, index: number) => Observable} project A function
 * that, when applied to an item emitted by the source or the output Observable,
 * returns an Observable.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The IScheduler to use for subscribing to
 * each projected inner Observable.
 * @return {Observable} An Observable that emits the source values and also
 * result of applying the projection function to each value emitted on the
 * output Observable and and merging the results of the Observables obtained
 * from this transformation.
 * @method expand
 * @owner Observable
 */
function expand(project, concurrent, scheduler) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    if (scheduler === void 0) { scheduler = undefined; }
    concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
    return operators_1.expand(project, concurrent, scheduler)(this);
}
exports.expand = expand;
//# sourceMappingURL=expand.js.map

/***/ }),

/***/ "4Hgy":
/*!*************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/do.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Perform a side effect for every emission on the source Observable, but return
 * an Observable that is identical to the source.
 *
 * <span class="informal">Intercepts each emission on the source and runs a
 * function, but returns an output which is identical to the source as long as errors don't occur.</span>
 *
 * <img src="./img/do.png" width="100%">
 *
 * Returns a mirrored Observable of the source Observable, but modified so that
 * the provided Observer is called to perform a side effect for every value,
 * error, and completion emitted by the source. Any errors that are thrown in
 * the aforementioned Observer or handlers are safely sent down the error path
 * of the output Observable.
 *
 * This operator is useful for debugging your Observables for the correct values
 * or performing other side effects.
 *
 * Note: this is different to a `subscribe` on the Observable. If the Observable
 * returned by `do` is not subscribed, the side effects specified by the
 * Observer will never happen. `do` therefore simply spies on existing
 * execution, it does not trigger an execution to happen like `subscribe` does.
 *
 * @example <caption>Map every click to the clientX position of that click, while also logging the click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks
 *   .do(ev => console.log(ev))
 *   .map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link map}
 * @see {@link subscribe}
 *
 * @param {Observer|function} [nextOrObserver] A normal Observer object or a
 * callback for `next`.
 * @param {function} [error] Callback for errors in the source.
 * @param {function} [complete] Callback for the completion of the source.
 * @return {Observable} An Observable identical to the source, but runs the
 * specified Observer or callback(s) for each item.
 * @method do
 * @name do
 * @owner Observable
 */
function _do(nextOrObserver, error, complete) {
    return operators_1.tap(nextOrObserver, error, complete)(this);
}
exports._do = _do;
//# sourceMappingURL=do.js.map

/***/ }),

/***/ "4Wg5":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/switchMap.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var switchMap_1 = __webpack_require__(/*! ../../operator/switchMap */ "nZYK");
rxjs_1.Observable.prototype.switchMap = switchMap_1.switchMap;
//# sourceMappingURL=switchMap.js.map

/***/ }),

/***/ "4w9M":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/race.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.race = rxjs_1.race;
//# sourceMappingURL=race.js.map

/***/ }),

/***/ "5LO2":
/*!******************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/exhaust.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Converts a higher-order Observable into a first-order Observable by dropping
 * inner Observables while the previous inner Observable has not yet completed.
 *
 * <span class="informal">Flattens an Observable-of-Observables by dropping the
 * next inner Observables while the current inner is still executing.</span>
 *
 * <img src="./img/exhaust.png" width="100%">
 *
 * `exhaust` subscribes to an Observable that emits Observables, also known as a
 * higher-order Observable. Each time it observes one of these emitted inner
 * Observables, the output Observable begins emitting the items emitted by that
 * inner Observable. So far, it behaves like {@link mergeAll}. However,
 * `exhaust` ignores every new inner Observable if the previous Observable has
 * not yet completed. Once that one completes, it will accept and flatten the
 * next inner Observable and repeat this process.
 *
 * @example <caption>Run a finite timer for each click, only if there is no currently active timer</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(5));
 * var result = higherOrder.exhaust();
 * result.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link switch}
 * @see {@link mergeAll}
 * @see {@link exhaustMap}
 * @see {@link zipAll}
 *
 * @return {Observable} An Observable that takes a source of Observables and propagates the first observable
 * exclusively until it completes before subscribing to the next.
 */
function exhaust() {
    return operators_1.exhaust()(this);
}
exports.exhaust = exhaust;
//# sourceMappingURL=exhaust.js.map

/***/ }),

/***/ "5hZ8":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/skipUntil.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var skipUntil_1 = __webpack_require__(/*! ../../operator/skipUntil */ "b/PJ");
rxjs_1.Observable.prototype.skipUntil = skipUntil_1.skipUntil;
//# sourceMappingURL=skipUntil.js.map

/***/ }),

/***/ "5i7x":
/*!****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/mapTo.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Emits the given constant value on the output Observable every time the source
 * Observable emits a value.
 *
 * <span class="informal">Like {@link map}, but it maps every source value to
 * the same output value every time.</span>
 *
 * <img src="./img/mapTo.png" width="100%">
 *
 * Takes a constant `value` as argument, and emits that whenever the source
 * Observable emits a value. In other words, ignores the actual source value,
 * and simply uses the emission moment to know when to emit the given `value`.
 *
 * @example <caption>Map every click to the string 'Hi'</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var greetings = clicks.mapTo('Hi');
 * greetings.subscribe(x => console.log(x));
 *
 * @see {@link map}
 *
 * @param {any} value The value to map each source value to.
 * @return {Observable} An Observable that emits the given `value` every time
 * the source Observable emits something.
 * @method mapTo
 * @owner Observable
 */
function mapTo(value) {
    return operators_1.mapTo(value)(this);
}
exports.mapTo = mapTo;
//# sourceMappingURL=mapTo.js.map

/***/ }),

/***/ "6IDA":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/windowWhen.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var windowWhen_1 = __webpack_require__(/*! ../../operator/windowWhen */ "YiA4");
rxjs_1.Observable.prototype.windowWhen = windowWhen_1.windowWhen;
//# sourceMappingURL=windowWhen.js.map

/***/ }),

/***/ "6PMC":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/skipWhile.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds
 * true, but emits all further source items as soon as the condition becomes false.
 *
 * <img src="./img/skipWhile.png" width="100%">
 *
 * @param {Function} predicate - A function to test each item emitted from the source Observable.
 * @return {Observable<T>} An Observable that begins emitting items emitted by the source Observable when the
 * specified predicate becomes false.
 * @method skipWhile
 * @owner Observable
 */
function skipWhile(predicate) {
    return operators_1.skipWhile(predicate)(this);
}
exports.skipWhile = skipWhile;
//# sourceMappingURL=skipWhile.js.map

/***/ }),

/***/ "6mJ0":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/findIndex.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Emits only the index of the first value emitted by the source Observable that
 * meets some condition.
 *
 * <span class="informal">It's like {@link find}, but emits the index of the
 * found value, not the value itself.</span>
 *
 * <img src="./img/findIndex.png" width="100%">
 *
 * `findIndex` searches for the first item in the source Observable that matches
 * the specified condition embodied by the `predicate`, and returns the
 * (zero-based) index of the first occurrence in the source. Unlike
 * {@link first}, the `predicate` is required in `findIndex`, and does not emit
 * an error if a valid value is not found.
 *
 * @example <caption>Emit the index of first click that happens on a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.findIndex(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link filter}
 * @see {@link find}
 * @see {@link first}
 * @see {@link take}
 *
 * @param {function(value: T, index: number, source: Observable<T>): boolean} predicate
 * A function called with each item to test for condition matching.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of the index of the first item that
 * matches the condition.
 * @method find
 * @owner Observable
 */
function findIndex(predicate, thisArg) {
    return operators_1.findIndex(predicate, thisArg)(this);
}
exports.findIndex = findIndex;
//# sourceMappingURL=findIndex.js.map

/***/ }),

/***/ "7+k4":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/pairwise.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var pairwise_1 = __webpack_require__(/*! ../../operator/pairwise */ "qIMP");
rxjs_1.Observable.prototype.pairwise = pairwise_1.pairwise;
//# sourceMappingURL=pairwise.js.map

/***/ }),

/***/ "7065":
/*!**************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/max.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * The Max operator operates on an Observable that emits numbers (or items that can be compared with a provided function),
 * and when source Observable completes it emits a single item: the item with the largest value.
 *
 * <img src="./img/max.png" width="100%">
 *
 * @example <caption>Get the maximal value of a series of numbers</caption>
 * Rx.Observable.of(5, 4, 7, 2, 8)
 *   .max()
 *   .subscribe(x => console.log(x)); // -> 8
 *
 * @example <caption>Use a comparer function to get the maximal item</caption>
 * interface Person {
 *   age: number,
 *   name: string
 * }
 * Observable.of<Person>({age: 7, name: 'Foo'},
 *                       {age: 5, name: 'Bar'},
 *                       {age: 9, name: 'Beer'})
 *           .max<Person>((a: Person, b: Person) => a.age < b.age ? -1 : 1)
 *           .subscribe((x: Person) => console.log(x.name)); // -> 'Beer'
 * }
 *
 * @see {@link min}
 *
 * @param {Function} [comparer] - Optional comparer function that it will use instead of its default to compare the
 * value of two items.
 * @return {Observable} An Observable that emits item with the largest value.
 * @method max
 * @owner Observable
 */
function max(comparer) {
    return operators_1.max(comparer)(this);
}
exports.max = max;
//# sourceMappingURL=max.js.map

/***/ }),

/***/ "70oK":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/exhaustMap.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var exhaustMap_1 = __webpack_require__(/*! ../../operator/exhaustMap */ "73rQ");
rxjs_1.Observable.prototype.exhaustMap = exhaustMap_1.exhaustMap;
//# sourceMappingURL=exhaustMap.js.map

/***/ }),

/***/ "73rQ":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/exhaustMap.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable only if the previous projected Observable has completed.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link exhaust}.</span>
 *
 * <img src="./img/exhaustMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. When it projects a source value to
 * an Observable, the output Observable begins emitting the items emitted by
 * that projected Observable. However, `exhaustMap` ignores every new projected
 * Observable if the previous projected Observable has not yet completed. Once
 * that one completes, it will accept and flatten the next projected Observable
 * and repeat this process.
 *
 * @example <caption>Run a finite timer for each click, only if there is no currently active timer</caption>
 * var clicks = fromEvent(document, 'click');
 * var result = clicks.pipe(exhaustMap((ev) => Rx.Observable.interval(1000).take(5)));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMap}
 * @see {@link exhaust}
 * @see {@link mergeMap}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @return {Observable} An Observable containing projected Observables
 * of each item of the source, ignoring projected Observables that start before
 * their preceding Observable has completed.
 */
function exhaustMap(project) {
    return operators_1.exhaustMap(project)(this);
}
exports.exhaustMap = exhaustMap;
//# sourceMappingURL=exhaustMap.js.map

/***/ }),

/***/ "7MrP":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/find.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var find_1 = __webpack_require__(/*! ../../operator/find */ "TqLU");
rxjs_1.Observable.prototype.find = find_1.find;
//# sourceMappingURL=find.js.map

/***/ }),

/***/ "7N5M":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/windowCount.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var windowCount_1 = __webpack_require__(/*! ../../operator/windowCount */ "TpWx");
rxjs_1.Observable.prototype.windowCount = windowCount_1.windowCount;
//# sourceMappingURL=windowCount.js.map

/***/ }),

/***/ "7RDD":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/multicast.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var multicast_1 = __webpack_require__(/*! ../../operator/multicast */ "ZHaO");
rxjs_1.Observable.prototype.multicast = multicast_1.multicast;
//# sourceMappingURL=multicast.js.map

/***/ }),

/***/ "7y2s":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/distinctUntilKeyChanged.js ***!
  \**********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item,
 * using a property accessed by using the key provided to check if the two items are distinct.
 *
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
 *
 * If a comparator function is not provided, an equality check is used by default.
 *
 * @example <caption>An example comparing the name of persons</caption>
 *
 *  interface Person {
 *     age: number,
 *     name: string
 *  }
 *
 * Observable.of<Person>(
 *     { age: 4, name: 'Foo'},
 *     { age: 7, name: 'Bar'},
 *     { age: 5, name: 'Foo'},
 *     { age: 6, name: 'Foo'})
 *     .distinctUntilKeyChanged('name')
 *     .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Foo' }
 * // { age: 7, name: 'Bar' }
 * // { age: 5, name: 'Foo' }
 *
 * @example <caption>An example comparing the first letters of the name</caption>
 *
 * interface Person {
 *     age: number,
 *     name: string
 *  }
 *
 * Observable.of<Person>(
 *     { age: 4, name: 'Foo1'},
 *     { age: 7, name: 'Bar'},
 *     { age: 5, name: 'Foo2'},
 *     { age: 6, name: 'Foo3'})
 *     .distinctUntilKeyChanged('name', (x: string, y: string) => x.substring(0, 3) === y.substring(0, 3))
 *     .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Foo1' }
 * // { age: 7, name: 'Bar' }
 * // { age: 5, name: 'Foo2' }
 *
 * @see {@link distinct}
 * @see {@link distinctUntilChanged}
 *
 * @param {string} key String key for object property lookup on each item.
 * @param {function} [compare] Optional comparison function called to test if an item is distinct from the previous item in the source.
 * @return {Observable} An Observable that emits items from the source Observable with distinct values based on the key specified.
 * @method distinctUntilKeyChanged
 * @owner Observable
 */
// tslint:disable-next-line:max-line-length
function distinctUntilKeyChanged(key, compare) {
    return operators_1.distinctUntilKeyChanged(key, compare)(this);
}
exports.distinctUntilKeyChanged = distinctUntilKeyChanged;
//# sourceMappingURL=distinctUntilKeyChanged.js.map

/***/ }),

/***/ "89kA":
/*!******************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/map.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var map_1 = __webpack_require__(/*! ../../operator/map */ "ZR4w");
rxjs_1.Observable.prototype.map = map_1.map;
//# sourceMappingURL=map.js.map

/***/ }),

/***/ "8Ip+":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/never.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
function staticNever() {
    return rxjs_1.NEVER;
}
exports.staticNever = staticNever;
rxjs_1.Observable.never = staticNever;
//# sourceMappingURL=never.js.map

/***/ }),

/***/ "8LQU":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/subscribeOn.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Asynchronously subscribes Observers to this Observable on the specified IScheduler.
 *
 * <img src="./img/subscribeOn.png" width="100%">
 *
 * @param {Scheduler} scheduler - The IScheduler to perform subscription actions on.
 * @return {Observable<T>} The source Observable modified so that its subscriptions happen on the specified IScheduler.
 .
 * @method subscribeOn
 * @owner Observable
 */
function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return operators_1.subscribeOn(scheduler, delay)(this);
}
exports.subscribeOn = subscribeOn;
//# sourceMappingURL=subscribeOn.js.map

/***/ }),

/***/ "8YE1":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/mapTo.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var mapTo_1 = __webpack_require__(/*! ../../operator/mapTo */ "5i7x");
rxjs_1.Observable.prototype.mapTo = mapTo_1.mapTo;
//# sourceMappingURL=mapTo.js.map

/***/ }),

/***/ "8Yhr":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/throttleTime.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var throttleTime_1 = __webpack_require__(/*! ../../operator/throttleTime */ "Vzig");
rxjs_1.Observable.prototype.throttleTime = throttleTime_1.throttleTime;
//# sourceMappingURL=throttleTime.js.map

/***/ }),

/***/ "8mU2":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/takeLast.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Emits only the last `count` values emitted by the source Observable.
 *
 * <span class="informal">Remembers the latest `count` values, then emits those
 * only when the source completes.</span>
 *
 * <img src="./img/takeLast.png" width="100%">
 *
 * `takeLast` returns an Observable that emits at most the last `count` values
 * emitted by the source Observable. If the source emits fewer than `count`
 * values then all of its values are emitted. This operator must wait until the
 * `complete` notification emission from the source in order to emit the `next`
 * values on the output Observable, because otherwise it is impossible to know
 * whether or not more values will be emitted on the source. For this reason,
 * all values are emitted synchronously, followed by the complete notification.
 *
 * @example <caption>Take the last 3 values of an Observable with many values</caption>
 * var many = Rx.Observable.range(1, 100);
 * var lastThree = many.takeLast(3);
 * lastThree.subscribe(x => console.log(x));
 *
 * @see {@link take}
 * @see {@link takeUntil}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @throws {ArgumentOutOfRangeError} When using `takeLast(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 *
 * @param {number} count The maximum number of values to emit from the end of
 * the sequence of values emitted by the source Observable.
 * @return {Observable<T>} An Observable that emits at most the last count
 * values emitted by the source Observable.
 * @method takeLast
 * @owner Observable
 */
function takeLast(count) {
    return operators_1.takeLast(count)(this);
}
exports.takeLast = takeLast;
//# sourceMappingURL=takeLast.js.map

/***/ }),

/***/ "9E4K":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/count.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var count_1 = __webpack_require__(/*! ../../operator/count */ "gzwt");
rxjs_1.Observable.prototype.count = count_1.count;
//# sourceMappingURL=count.js.map

/***/ }),

/***/ "9HtI":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/last.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var last_1 = __webpack_require__(/*! ../../operator/last */ "atJV");
rxjs_1.Observable.prototype.last = last_1.last;
//# sourceMappingURL=last.js.map

/***/ }),

/***/ "9Sef":
/*!******************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/zip.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var zip_1 = __webpack_require__(/*! ../../operator/zip */ "fY5S");
rxjs_1.Observable.prototype.zip = zip_1.zipProto;
//# sourceMappingURL=zip.js.map

/***/ }),

/***/ "9qLK":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/skipWhile.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var skipWhile_1 = __webpack_require__(/*! ../../operator/skipWhile */ "6PMC");
rxjs_1.Observable.prototype.skipWhile = skipWhile_1.skipWhile;
//# sourceMappingURL=skipWhile.js.map

/***/ }),

/***/ "9xAK":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/bufferTime.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var internal_compatibility_1 = __webpack_require__(/*! rxjs/internal-compatibility */ "lRok");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Buffers the source Observable values for a specific time period.
 *
 * <span class="informal">Collects values from the past as an array, and emits
 * those arrays periodically in time.</span>
 *
 * <img src="./img/bufferTime.png" width="100%">
 *
 * Buffers values from the source for a specific time duration `bufferTimeSpan`.
 * Unless the optional argument `bufferCreationInterval` is given, it emits and
 * resets the buffer every `bufferTimeSpan` milliseconds. If
 * `bufferCreationInterval` is given, this operator opens the buffer every
 * `bufferCreationInterval` milliseconds and closes (emits and resets) the
 * buffer every `bufferTimeSpan` milliseconds. When the optional argument
 * `maxBufferSize` is specified, the buffer will be closed either after
 * `bufferTimeSpan` milliseconds or when it contains `maxBufferSize` elements.
 *
 * @example <caption>Every second, emit an array of the recent click events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferTime(1000);
 * buffered.subscribe(x => console.log(x));
 *
 * @example <caption>Every 5 seconds, emit the click events from the next 2 seconds</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferTime(2000, 5000);
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferCount}
 * @see {@link bufferToggle}
 * @see {@link bufferWhen}
 * @see {@link windowTime}
 *
 * @param {number} bufferTimeSpan The amount of time to fill each buffer array.
 * @param {number} [bufferCreationInterval] The interval at which to start new
 * buffers.
 * @param {number} [maxBufferSize] The maximum buffer size.
 * @param {Scheduler} [scheduler=asyncScheduler] The scheduler on which to schedule the
 * intervals that determine buffer boundaries.
 * @return {Observable<T[]>} An observable of arrays of buffered values.
 * @method bufferTime
 * @owner Observable
 */
function bufferTime(bufferTimeSpan) {
    var length = arguments.length;
    var scheduler = rxjs_1.asyncScheduler;
    if (internal_compatibility_1.isScheduler(arguments[arguments.length - 1])) {
        scheduler = arguments[arguments.length - 1];
        length--;
    }
    var bufferCreationInterval = null;
    if (length >= 2) {
        bufferCreationInterval = arguments[1];
    }
    var maxBufferSize = Number.POSITIVE_INFINITY;
    if (length >= 3) {
        maxBufferSize = arguments[2];
    }
    return operators_1.bufferTime(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler)(this);
}
exports.bufferTime = bufferTime;
//# sourceMappingURL=bufferTime.js.map

/***/ }),

/***/ "A+qg":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/publishBehavior.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var publishBehavior_1 = __webpack_require__(/*! ../../operator/publishBehavior */ "IMZ1");
rxjs_1.Observable.prototype.publishBehavior = publishBehavior_1.publishBehavior;
//# sourceMappingURL=publishBehavior.js.map

/***/ }),

/***/ "A5T5":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/repeatWhen.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Returns an Observable that mirrors the source Observable with the exception of a `complete`. If the source
 * Observable calls `complete`, this method will emit to the Observable returned from `notifier`. If that Observable
 * calls `complete` or `error`, then this method will call `complete` or `error` on the child subscription. Otherwise
 * this method will resubscribe to the source Observable.
 *
 * <img src="./img/repeatWhen.png" width="100%">
 *
 * @param {function(notifications: Observable): Observable} notifier - Receives an Observable of notifications with
 * which a user can `complete` or `error`, aborting the repetition.
 * @return {Observable} The source Observable modified with repeat logic.
 * @method repeatWhen
 * @owner Observable
 */
function repeatWhen(notifier) {
    return operators_1.repeatWhen(notifier)(this);
}
exports.repeatWhen = repeatWhen;
//# sourceMappingURL=repeatWhen.js.map

/***/ }),

/***/ "ADT6":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/filter.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * @example <caption>Emit only click events whose target was a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {@link distinct}
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link ignoreElements}
 * @see {@link partition}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method filter
 * @owner Observable
 */
function filter(predicate, thisArg) {
    return operators_1.filter(predicate, thisArg)(this);
}
exports.filter = filter;
//# sourceMappingURL=filter.js.map

/***/ }),

/***/ "B9G6":
/*!******************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/groupBy.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Groups the items emitted by an Observable according to a specified criterion,
 * and emits these grouped items as `GroupedObservables`, one
 * {@link GroupedObservable} per group.
 *
 * <img src="./img/groupBy.png" width="100%">
 *
 * @example <caption>Group objects by id and return as array</caption>
 * Observable.of<Obj>({id: 1, name: 'aze1'},
 *                    {id: 2, name: 'sf2'},
 *                    {id: 2, name: 'dg2'},
 *                    {id: 1, name: 'erg1'},
 *                    {id: 1, name: 'df1'},
 *                    {id: 2, name: 'sfqfb2'},
 *                    {id: 3, name: 'qfs3'},
 *                    {id: 2, name: 'qsgqsfg2'}
 *     )
 *     .groupBy(p => p.id)
 *     .flatMap( (group$) => group$.reduce((acc, cur) => [...acc, cur], []))
 *     .subscribe(p => console.log(p));
 *
 * // displays:
 * // [ { id: 1, name: 'aze1' },
 * //   { id: 1, name: 'erg1' },
 * //   { id: 1, name: 'df1' } ]
 * //
 * // [ { id: 2, name: 'sf2' },
 * //   { id: 2, name: 'dg2' },
 * //   { id: 2, name: 'sfqfb2' },
 * //   { id: 2, name: 'qsgqsfg2' } ]
 * //
 * // [ { id: 3, name: 'qfs3' } ]
 *
 * @example <caption>Pivot data on the id field</caption>
 * Observable.of<Obj>({id: 1, name: 'aze1'},
 *                    {id: 2, name: 'sf2'},
 *                    {id: 2, name: 'dg2'},
 *                    {id: 1, name: 'erg1'},
 *                    {id: 1, name: 'df1'},
 *                    {id: 2, name: 'sfqfb2'},
 *                    {id: 3, name: 'qfs1'},
 *                    {id: 2, name: 'qsgqsfg2'}
 *                   )
 *     .groupBy(p => p.id, p => p.name)
 *     .flatMap( (group$) => group$.reduce((acc, cur) => [...acc, cur], ["" + group$.key]))
 *     .map(arr => ({'id': parseInt(arr[0]), 'values': arr.slice(1)}))
 *     .subscribe(p => console.log(p));
 *
 * // displays:
 * // { id: 1, values: [ 'aze1', 'erg1', 'df1' ] }
 * // { id: 2, values: [ 'sf2', 'dg2', 'sfqfb2', 'qsgqsfg2' ] }
 * // { id: 3, values: [ 'qfs1' ] }
 *
 * @param {function(value: T): K} keySelector A function that extracts the key
 * for each item.
 * @param {function(value: T): R} [elementSelector] A function that extracts the
 * return element for each item.
 * @param {function(grouped: GroupedObservable<K,R>): Observable<any>} [durationSelector]
 * A function that returns an Observable to determine how long each group should
 * exist.
 * @return {Observable<GroupedObservable<K,R>>} An Observable that emits
 * GroupedObservables, each of which corresponds to a unique key value and each
 * of which emits those items from the source Observable that share that key
 * value.
 * @method groupBy
 * @owner Observable
 */
function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
    return operators_1.groupBy(keySelector, elementSelector, durationSelector, subjectSelector)(this);
}
exports.groupBy = groupBy;
//# sourceMappingURL=groupBy.js.map

/***/ }),

/***/ "BSEn":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/bufferToggle.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Buffers the source Observable values starting from an emission from
 * `openings` and ending when the output of `closingSelector` emits.
 *
 * <span class="informal">Collects values from the past as an array. Starts
 * collecting only when `opening` emits, and calls the `closingSelector`
 * function to get an Observable that tells when to close the buffer.</span>
 *
 * <img src="./img/bufferToggle.png" width="100%">
 *
 * Buffers values from the source by opening the buffer via signals from an
 * Observable provided to `openings`, and closing and sending the buffers when
 * a Subscribable or Promise returned by the `closingSelector` function emits.
 *
 * @example <caption>Every other second, emit the click events from the next 500ms</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var openings = Rx.Observable.interval(1000);
 * var buffered = clicks.bufferToggle(openings, i =>
 *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
 * );
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferCount}
 * @see {@link bufferTime}
 * @see {@link bufferWhen}
 * @see {@link windowToggle}
 *
 * @param {SubscribableOrPromise<O>} openings A Subscribable or Promise of notifications to start new
 * buffers.
 * @param {function(value: O): SubscribableOrPromise} closingSelector A function that takes
 * the value emitted by the `openings` observable and returns a Subscribable or Promise,
 * which, when it emits, signals that the associated buffer should be emitted
 * and cleared.
 * @return {Observable<T[]>} An observable of arrays of buffered values.
 * @method bufferToggle
 * @owner Observable
 */
function bufferToggle(openings, closingSelector) {
    return operators_1.bufferToggle(openings, closingSelector)(this);
}
exports.bufferToggle = bufferToggle;
//# sourceMappingURL=bufferToggle.js.map

/***/ }),

/***/ "BdNY":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/do.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var do_1 = __webpack_require__(/*! ../../operator/do */ "4Hgy");
rxjs_1.Observable.prototype.do = do_1._do;
rxjs_1.Observable.prototype._do = do_1._do;
//# sourceMappingURL=do.js.map

/***/ }),

/***/ "BilO":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/of.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.of = rxjs_1.of;
//# sourceMappingURL=of.js.map

/***/ }),

/***/ "C/AH":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/repeat.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var repeat_1 = __webpack_require__(/*! ../../operator/repeat */ "Elj+");
rxjs_1.Observable.prototype.repeat = repeat_1.repeat;
//# sourceMappingURL=repeat.js.map

/***/ }),

/***/ "C8tm":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/groupBy.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var groupBy_1 = __webpack_require__(/*! ../../operator/groupBy */ "B9G6");
rxjs_1.Observable.prototype.groupBy = groupBy_1.groupBy;
//# sourceMappingURL=groupBy.js.map

/***/ }),

/***/ "COpn":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/skipLast.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Skip the last `count` values emitted by the source Observable.
 *
 * <img src="./img/skipLast.png" width="100%">
 *
 * `skipLast` returns an Observable that accumulates a queue with a length
 * enough to store the first `count` values. As more values are received,
 * values are taken from the front of the queue and produced on the result
 * sequence. This causes values to be delayed.
 *
 * @example <caption>Skip the last 2 values of an Observable with many values</caption>
 * var many = Rx.Observable.range(1, 5);
 * var skipLastTwo = many.skipLast(2);
 * skipLastTwo.subscribe(x => console.log(x));
 *
 * // Results in:
 * // 1 2 3
 *
 * @see {@link skip}
 * @see {@link skipUntil}
 * @see {@link skipWhile}
 * @see {@link take}
 *
 * @throws {ArgumentOutOfRangeError} When using `skipLast(i)`, it throws
 * ArgumentOutOrRangeError if `i < 0`.
 *
 * @param {number} count Number of elements to skip from the end of the source Observable.
 * @returns {Observable<T>} An Observable that skips the last count values
 * emitted by the source Observable.
 * @method skipLast
 * @owner Observable
 */
function skipLast(count) {
    return operators_1.skipLast(count)(this);
}
exports.skipLast = skipLast;
//# sourceMappingURL=skipLast.js.map

/***/ }),

/***/ "CVW7":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/sample.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Emits the most recently emitted value from the source Observable whenever
 * another Observable, the `notifier`, emits.
 *
 * <span class="informal">It's like {@link sampleTime}, but samples whenever
 * the `notifier` Observable emits something.</span>
 *
 * <img src="./img/sample.png" width="100%">
 *
 * Whenever the `notifier` Observable emits a value or completes, `sample`
 * looks at the source Observable and emits whichever value it has most recently
 * emitted since the previous sampling, unless the source has not emitted
 * anything since the previous sampling. The `notifier` is subscribed to as soon
 * as the output Observable is subscribed.
 *
 * @example <caption>On every click, sample the most recent "seconds" timer</caption>
 * var seconds = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = seconds.sample(clicks);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link audit}
 * @see {@link debounce}
 * @see {@link sampleTime}
 * @see {@link throttle}
 *
 * @param {Observable<any>} notifier The Observable to use for sampling the
 * source Observable.
 * @return {Observable<T>} An Observable that emits the results of sampling the
 * values emitted by the source Observable whenever the notifier Observable
 * emits value or completes.
 * @method sample
 * @owner Observable
 */
function sample(notifier) {
    return operators_1.sample(notifier)(this);
}
exports.sample = sample;
//# sourceMappingURL=sample.js.map

/***/ }),

/***/ "CuWV":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/publishLast.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * @return {ConnectableObservable<T>}
 * @method publishLast
 * @owner Observable
 */
function publishLast() {
    //TODO(benlesh): correct type-flow through here.
    return operators_1.publishLast()(this);
}
exports.publishLast = publishLast;
//# sourceMappingURL=publishLast.js.map

/***/ }),

/***/ "DNeS":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/expand.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var expand_1 = __webpack_require__(/*! ../../operator/expand */ "4AtU");
rxjs_1.Observable.prototype.expand = expand_1.expand;
//# sourceMappingURL=expand.js.map

/***/ }),

/***/ "DWF9":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/defaultIfEmpty.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var defaultIfEmpty_1 = __webpack_require__(/*! ../../operator/defaultIfEmpty */ "mfsk");
rxjs_1.Observable.prototype.defaultIfEmpty = defaultIfEmpty_1.defaultIfEmpty;
//# sourceMappingURL=defaultIfEmpty.js.map

/***/ }),

/***/ "DpPw":
/*!********************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/onErrorResumeNext.js ***!
  \********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var onErrorResumeNext_1 = __webpack_require__(/*! ../../operator/onErrorResumeNext */ "bcPL");
rxjs_1.Observable.prototype.onErrorResumeNext = onErrorResumeNext_1.onErrorResumeNext;
//# sourceMappingURL=onErrorResumeNext.js.map

/***/ }),

/***/ "E2OZ":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/combineLatest.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var combineLatest_1 = __webpack_require__(/*! ../../operator/combineLatest */ "VmLd");
rxjs_1.Observable.prototype.combineLatest = combineLatest_1.combineLatest;
//# sourceMappingURL=combineLatest.js.map

/***/ }),

/***/ "EUoG":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/single.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var single_1 = __webpack_require__(/*! ../../operator/single */ "v87U");
rxjs_1.Observable.prototype.single = single_1.single;
//# sourceMappingURL=single.js.map

/***/ }),

/***/ "Elj+":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/repeat.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Returns an Observable that repeats the stream of items emitted by the source Observable at most count times.
 *
 * <img src="./img/repeat.png" width="100%">
 *
 * @param {number} [count] The number of times the source Observable items are repeated, a count of 0 will yield
 * an empty Observable.
 * @return {Observable} An Observable that repeats the stream of items emitted by the source Observable at most
 * count times.
 * @method repeat
 * @owner Observable
 */
function repeat(count) {
    if (count === void 0) { count = -1; }
    return operators_1.repeat(count)(this);
}
exports.repeat = repeat;
//# sourceMappingURL=repeat.js.map

/***/ }),

/***/ "FDEy":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/dematerialize.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Converts an Observable of {@link Notification} objects into the emissions
 * that they represent.
 *
 * <span class="informal">Unwraps {@link Notification} objects as actual `next`,
 * `error` and `complete` emissions. The opposite of {@link materialize}.</span>
 *
 * <img src="./img/dematerialize.png" width="100%">
 *
 * `dematerialize` is assumed to operate an Observable that only emits
 * {@link Notification} objects as `next` emissions, and does not emit any
 * `error`. Such Observable is the output of a `materialize` operation. Those
 * notifications are then unwrapped using the metadata they contain, and emitted
 * as `next`, `error`, and `complete` on the output Observable.
 *
 * Use this operator in conjunction with {@link materialize}.
 *
 * @example <caption>Convert an Observable of Notifications to an actual Observable</caption>
 * var notifA = new Rx.Notification('N', 'A');
 * var notifB = new Rx.Notification('N', 'B');
 * var notifE = new Rx.Notification('E', void 0,
 *   new TypeError('x.toUpperCase is not a function')
 * );
 * var materialized = Rx.Observable.of(notifA, notifB, notifE);
 * var upperCase = materialized.dematerialize();
 * upperCase.subscribe(x => console.log(x), e => console.error(e));
 *
 * // Results in:
 * // A
 * // B
 * // TypeError: x.toUpperCase is not a function
 *
 * @see {@link Notification}
 * @see {@link materialize}
 *
 * @return {Observable} An Observable that emits items and notifications
 * embedded in Notification objects emitted by the source Observable.
 * @method dematerialize
 * @owner Observable
 */
function dematerialize() {
    return operators_1.dematerialize()(this);
}
exports.dematerialize = dematerialize;
//# sourceMappingURL=dematerialize.js.map

/***/ }),

/***/ "FU7m":
/*!****************************************!*\
  !*** ./node_modules/rxjs-compat/Rx.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
// Subject imported before Observable to bypass circular dependency issue since
// Subject extends Observable and Observable references Subject in it's
// definition
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
exports.Observable = rxjs_1.Observable;
exports.Subject = rxjs_1.Subject;
var internal_compatibility_1 = __webpack_require__(/*! rxjs/internal-compatibility */ "lRok");
exports.AnonymousSubject = internal_compatibility_1.AnonymousSubject;
/* tslint:enable:no-unused-variable */
var internal_compatibility_2 = __webpack_require__(/*! rxjs/internal-compatibility */ "lRok");
exports.config = internal_compatibility_2.config;
// statics
/* tslint:disable:no-use-before-declare */
__webpack_require__(/*! ./add/observable/bindCallback */ "1JPw");
__webpack_require__(/*! ./add/observable/bindNodeCallback */ "PpQq");
__webpack_require__(/*! ./add/observable/combineLatest */ "sNY3");
__webpack_require__(/*! ./add/observable/concat */ "+v8i");
__webpack_require__(/*! ./add/observable/defer */ "lK5c");
__webpack_require__(/*! ./add/observable/empty */ "XPuz");
__webpack_require__(/*! ./add/observable/forkJoin */ "O5hQ");
__webpack_require__(/*! ./add/observable/from */ "fnh7");
__webpack_require__(/*! ./add/observable/fromEvent */ "Xj2z");
__webpack_require__(/*! ./add/observable/fromEventPattern */ "11EI");
__webpack_require__(/*! ./add/observable/fromPromise */ "3Qpg");
__webpack_require__(/*! ./add/observable/generate */ "G4Hi");
__webpack_require__(/*! ./add/observable/if */ "uGYe");
__webpack_require__(/*! ./add/observable/interval */ "RhlD");
__webpack_require__(/*! ./add/observable/merge */ "mx47");
__webpack_require__(/*! ./add/observable/race */ "4w9M");
__webpack_require__(/*! ./add/observable/never */ "8Ip+");
__webpack_require__(/*! ./add/observable/of */ "BilO");
__webpack_require__(/*! ./add/observable/onErrorResumeNext */ "t0XI");
__webpack_require__(/*! ./add/observable/pairs */ "HAEL");
__webpack_require__(/*! ./add/observable/range */ "ojb+");
__webpack_require__(/*! ./add/observable/using */ "czqU");
__webpack_require__(/*! ./add/observable/throw */ "QXri");
__webpack_require__(/*! ./add/observable/timer */ "cD4w");
__webpack_require__(/*! ./add/observable/zip */ "m1gp");
//dom
__webpack_require__(/*! ./add/observable/dom/ajax */ "bi34");
__webpack_require__(/*! ./add/observable/dom/webSocket */ "uO2z");
//internal/operators
__webpack_require__(/*! ./add/operator/buffer */ "3EiV");
__webpack_require__(/*! ./add/operator/bufferCount */ "vQc4");
__webpack_require__(/*! ./add/operator/bufferTime */ "hf5g");
__webpack_require__(/*! ./add/operator/bufferToggle */ "Zw/6");
__webpack_require__(/*! ./add/operator/bufferWhen */ "YA+d");
__webpack_require__(/*! ./add/operator/catch */ "1M8x");
__webpack_require__(/*! ./add/operator/combineAll */ "LxJG");
__webpack_require__(/*! ./add/operator/combineLatest */ "E2OZ");
__webpack_require__(/*! ./add/operator/concat */ "KC9P");
__webpack_require__(/*! ./add/operator/concatAll */ "Qw2J");
__webpack_require__(/*! ./add/operator/concatMap */ "37L2");
__webpack_require__(/*! ./add/operator/concatMapTo */ "RT2N");
__webpack_require__(/*! ./add/operator/count */ "9E4K");
__webpack_require__(/*! ./add/operator/dematerialize */ "KGUQ");
__webpack_require__(/*! ./add/operator/debounce */ "LOqM");
__webpack_require__(/*! ./add/operator/debounceTime */ "QtPd");
__webpack_require__(/*! ./add/operator/defaultIfEmpty */ "DWF9");
__webpack_require__(/*! ./add/operator/delay */ "n2g9");
__webpack_require__(/*! ./add/operator/delayWhen */ "wfyD");
__webpack_require__(/*! ./add/operator/distinct */ "FZ9u");
__webpack_require__(/*! ./add/operator/distinctUntilChanged */ "+qxJ");
__webpack_require__(/*! ./add/operator/distinctUntilKeyChanged */ "TwXD");
__webpack_require__(/*! ./add/operator/do */ "BdNY");
__webpack_require__(/*! ./add/operator/exhaust */ "jIeU");
__webpack_require__(/*! ./add/operator/exhaustMap */ "70oK");
__webpack_require__(/*! ./add/operator/expand */ "DNeS");
__webpack_require__(/*! ./add/operator/elementAt */ "q8yx");
__webpack_require__(/*! ./add/operator/filter */ "hswa");
__webpack_require__(/*! ./add/operator/finally */ "Xs6s");
__webpack_require__(/*! ./add/operator/find */ "7MrP");
__webpack_require__(/*! ./add/operator/findIndex */ "sjkp");
__webpack_require__(/*! ./add/operator/first */ "YwoP");
__webpack_require__(/*! ./add/operator/groupBy */ "C8tm");
__webpack_require__(/*! ./add/operator/ignoreElements */ "wWu8");
__webpack_require__(/*! ./add/operator/isEmpty */ "RFdt");
__webpack_require__(/*! ./add/operator/audit */ "dlYL");
__webpack_require__(/*! ./add/operator/auditTime */ "ksOG");
__webpack_require__(/*! ./add/operator/last */ "9HtI");
__webpack_require__(/*! ./add/operator/let */ "+4/i");
__webpack_require__(/*! ./add/operator/every */ "Kvnp");
__webpack_require__(/*! ./add/operator/map */ "89kA");
__webpack_require__(/*! ./add/operator/mapTo */ "8YE1");
__webpack_require__(/*! ./add/operator/materialize */ "Qbza");
__webpack_require__(/*! ./add/operator/max */ "KVj6");
__webpack_require__(/*! ./add/operator/merge */ "cPnI");
__webpack_require__(/*! ./add/operator/mergeAll */ "P+DX");
__webpack_require__(/*! ./add/operator/mergeMap */ "wGW3");
__webpack_require__(/*! ./add/operator/mergeMapTo */ "sRqT");
__webpack_require__(/*! ./add/operator/mergeScan */ "eyjB");
__webpack_require__(/*! ./add/operator/min */ "g0lY");
__webpack_require__(/*! ./add/operator/multicast */ "7RDD");
__webpack_require__(/*! ./add/operator/observeOn */ "+oeQ");
__webpack_require__(/*! ./add/operator/onErrorResumeNext */ "DpPw");
__webpack_require__(/*! ./add/operator/pairwise */ "7+k4");
__webpack_require__(/*! ./add/operator/partition */ "Nh3w");
__webpack_require__(/*! ./add/operator/pluck */ "jdlx");
__webpack_require__(/*! ./add/operator/publish */ "aMoL");
__webpack_require__(/*! ./add/operator/publishBehavior */ "A+qg");
__webpack_require__(/*! ./add/operator/publishReplay */ "PZgn");
__webpack_require__(/*! ./add/operator/publishLast */ "l3KV");
__webpack_require__(/*! ./add/operator/race */ "bUWp");
__webpack_require__(/*! ./add/operator/reduce */ "ob0Y");
__webpack_require__(/*! ./add/operator/repeat */ "C/AH");
__webpack_require__(/*! ./add/operator/repeatWhen */ "W/jz");
__webpack_require__(/*! ./add/operator/retry */ "+psR");
__webpack_require__(/*! ./add/operator/retryWhen */ "eYtX");
__webpack_require__(/*! ./add/operator/sample */ "LUEE");
__webpack_require__(/*! ./add/operator/sampleTime */ "G12B");
__webpack_require__(/*! ./add/operator/scan */ "QJJP");
__webpack_require__(/*! ./add/operator/sequenceEqual */ "G21R");
__webpack_require__(/*! ./add/operator/share */ "VSOP");
__webpack_require__(/*! ./add/operator/shareReplay */ "2+DN");
__webpack_require__(/*! ./add/operator/single */ "EUoG");
__webpack_require__(/*! ./add/operator/skip */ "pe+M");
__webpack_require__(/*! ./add/operator/skipLast */ "LSkT");
__webpack_require__(/*! ./add/operator/skipUntil */ "5hZ8");
__webpack_require__(/*! ./add/operator/skipWhile */ "9qLK");
__webpack_require__(/*! ./add/operator/startWith */ "gSmF");
__webpack_require__(/*! ./add/operator/subscribeOn */ "rSqW");
__webpack_require__(/*! ./add/operator/switch */ "okVX");
__webpack_require__(/*! ./add/operator/switchMap */ "4Wg5");
__webpack_require__(/*! ./add/operator/switchMapTo */ "W5YF");
__webpack_require__(/*! ./add/operator/take */ "oKp4");
__webpack_require__(/*! ./add/operator/takeLast */ "0ZAG");
__webpack_require__(/*! ./add/operator/takeUntil */ "omlZ");
__webpack_require__(/*! ./add/operator/takeWhile */ "I6kD");
__webpack_require__(/*! ./add/operator/throttle */ "JpQp");
__webpack_require__(/*! ./add/operator/throttleTime */ "8Yhr");
__webpack_require__(/*! ./add/operator/timeInterval */ "VlMj");
__webpack_require__(/*! ./add/operator/timeout */ "fElF");
__webpack_require__(/*! ./add/operator/timeoutWith */ "rqY6");
__webpack_require__(/*! ./add/operator/timestamp */ "00Es");
__webpack_require__(/*! ./add/operator/toArray */ "TMm9");
__webpack_require__(/*! ./add/operator/toPromise */ "XC4j");
__webpack_require__(/*! ./add/operator/window */ "ND/j");
__webpack_require__(/*! ./add/operator/windowCount */ "7N5M");
__webpack_require__(/*! ./add/operator/windowTime */ "2IC2");
__webpack_require__(/*! ./add/operator/windowToggle */ "bHhB");
__webpack_require__(/*! ./add/operator/windowWhen */ "6IDA");
__webpack_require__(/*! ./add/operator/withLatestFrom */ "cf52");
__webpack_require__(/*! ./add/operator/zip */ "9Sef");
__webpack_require__(/*! ./add/operator/zipAll */ "ofYe");
/* tslint:disable:no-unused-variable */
var rxjs_2 = __webpack_require__(/*! rxjs */ "DtyJ");
exports.Subscription = rxjs_2.Subscription;
exports.ReplaySubject = rxjs_2.ReplaySubject;
exports.BehaviorSubject = rxjs_2.BehaviorSubject;
exports.Notification = rxjs_2.Notification;
exports.EmptyError = rxjs_2.EmptyError;
exports.ArgumentOutOfRangeError = rxjs_2.ArgumentOutOfRangeError;
exports.ObjectUnsubscribedError = rxjs_2.ObjectUnsubscribedError;
exports.UnsubscriptionError = rxjs_2.UnsubscriptionError;
exports.pipe = rxjs_2.pipe;
var testing_1 = __webpack_require__(/*! rxjs/testing */ "V8dw");
exports.TestScheduler = testing_1.TestScheduler;
var rxjs_3 = __webpack_require__(/*! rxjs */ "DtyJ");
exports.Subscriber = rxjs_3.Subscriber;
exports.AsyncSubject = rxjs_3.AsyncSubject;
exports.ConnectableObservable = rxjs_3.ConnectableObservable;
exports.TimeoutError = rxjs_3.TimeoutError;
exports.VirtualTimeScheduler = rxjs_3.VirtualTimeScheduler;
var ajax_1 = __webpack_require__(/*! rxjs/ajax */ "roV9");
exports.AjaxResponse = ajax_1.AjaxResponse;
exports.AjaxError = ajax_1.AjaxError;
exports.AjaxTimeoutError = ajax_1.AjaxTimeoutError;
var rxjs_4 = __webpack_require__(/*! rxjs */ "DtyJ");
var internal_compatibility_3 = __webpack_require__(/*! rxjs/internal-compatibility */ "lRok");
var internal_compatibility_4 = __webpack_require__(/*! rxjs/internal-compatibility */ "lRok");
exports.TimeInterval = internal_compatibility_4.TimeInterval;
exports.Timestamp = internal_compatibility_4.Timestamp;
var _operators = __webpack_require__(/*! rxjs/operators */ "ahDk");
exports.operators = _operators;
/* tslint:enable:no-unused-variable */
/**
 * @typedef {Object} Rx.Scheduler
 * @property {Scheduler} queue Schedules on a queue in the current event frame
 * (trampoline scheduler). Use this for iteration operations.
 * @property {Scheduler} asap Schedules on the micro task queue, which is the same
 * queue used for promises. Basically after the current job, but before the next
 * job. Use this for asynchronous conversions.
 * @property {Scheduler} async Schedules work with `setInterval`. Use this for
 * time-based operations.
 * @property {Scheduler} animationFrame Schedules work with `requestAnimationFrame`.
 * Use this for synchronizing with the platform's painting
 */
var Scheduler = {
    asap: rxjs_4.asapScheduler,
    queue: rxjs_4.queueScheduler,
    animationFrame: rxjs_4.animationFrameScheduler,
    async: rxjs_4.asyncScheduler
};
exports.Scheduler = Scheduler;
/**
 * @typedef {Object} Rx.Symbol
 * @property {Symbol|string} rxSubscriber A symbol to use as a property name to
 * retrieve an "Rx safe" Observer from an object. "Rx safety" can be defined as
 * an object that has all of the traits of an Rx Subscriber, including the
 * ability to add and remove subscriptions to the subscription chain and
 * guarantees involving event triggering (can't "next" after unsubscription,
 * etc).
 * @property {Symbol|string} observable A symbol to use as a property name to
 * retrieve an Observable as defined by the [ECMAScript "Observable" spec](https://github.com/zenparsing/es-observable).
 * @property {Symbol|string} iterator The ES6 symbol to use as a property name
 * to retrieve an iterator from an object.
 */
var Symbol = {
    rxSubscriber: internal_compatibility_3.rxSubscriber,
    observable: internal_compatibility_3.observable,
    iterator: internal_compatibility_3.iterator
};
exports.Symbol = Symbol;
//# sourceMappingURL=Rx.js.map

/***/ }),

/***/ "FZ9u":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/distinct.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var distinct_1 = __webpack_require__(/*! ../../operator/distinct */ "vTln");
rxjs_1.Observable.prototype.distinct = distinct_1.distinct;
//# sourceMappingURL=distinct.js.map

/***/ }),

/***/ "G12B":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/sampleTime.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var sampleTime_1 = __webpack_require__(/*! ../../operator/sampleTime */ "P71F");
rxjs_1.Observable.prototype.sampleTime = sampleTime_1.sampleTime;
//# sourceMappingURL=sampleTime.js.map

/***/ }),

/***/ "G21R":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/sequenceEqual.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var sequenceEqual_1 = __webpack_require__(/*! ../../operator/sequenceEqual */ "UE8N");
rxjs_1.Observable.prototype.sequenceEqual = sequenceEqual_1.sequenceEqual;
//# sourceMappingURL=sequenceEqual.js.map

/***/ }),

/***/ "G4Hi":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/generate.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.generate = rxjs_1.generate;
//# sourceMappingURL=generate.js.map

/***/ }),

/***/ "GsYY":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/distinctUntilChanged.js ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
 *
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
 *
 * If a comparator function is not provided, an equality check is used by default.
 *
 * @example <caption>A simple example with numbers</caption>
 * Observable.of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4)
 *   .distinctUntilChanged()
 *   .subscribe(x => console.log(x)); // 1, 2, 1, 2, 3, 4
 *
 * @example <caption>An example using a compare function</caption>
 * interface Person {
 *    age: number,
 *    name: string
 * }
 *
 * Observable.of<Person>(
 *     { age: 4, name: 'Foo'},
 *     { age: 7, name: 'Bar'},
 *     { age: 5, name: 'Foo'},
 *     { age: 6, name: 'Foo'})
 *     .distinctUntilChanged((p: Person, q: Person) => p.name === q.name)
 *     .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Foo' }
 * // { age: 7, name: 'Bar' }
 * // { age: 5, name: 'Foo' }
 *
 * @see {@link distinct}
 * @see {@link distinctUntilKeyChanged}
 *
 * @param {function} [compare] Optional comparison function called to test if an item is distinct from the previous item in the source.
 * @return {Observable} An Observable that emits items from the source Observable with distinct values.
 * @method distinctUntilChanged
 * @owner Observable
 */
function distinctUntilChanged(compare, keySelector) {
    return operators_1.distinctUntilChanged(compare, keySelector)(this);
}
exports.distinctUntilChanged = distinctUntilChanged;
//# sourceMappingURL=distinctUntilChanged.js.map

/***/ }),

/***/ "H+DX":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/observeOn.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 *
 * Re-emits all notifications from source Observable with specified scheduler.
 *
 * <span class="informal">Ensure a specific scheduler is used, from outside of an Observable.</span>
 *
 * `observeOn` is an operator that accepts a scheduler as a first parameter, which will be used to reschedule
 * notifications emitted by the source Observable. It might be useful, if you do not have control over
 * internal scheduler of a given Observable, but want to control when its values are emitted nevertheless.
 *
 * Returned Observable emits the same notifications (nexted values, complete and error events) as the source Observable,
 * but rescheduled with provided scheduler. Note that this doesn't mean that source Observables internal
 * scheduler will be replaced in any way. Original scheduler still will be used, but when the source Observable emits
 * notification, it will be immediately scheduled again - this time with scheduler passed to `observeOn`.
 * An anti-pattern would be calling `observeOn` on Observable that emits lots of values synchronously, to split
 * that emissions into asynchronous chunks. For this to happen, scheduler would have to be passed into the source
 * Observable directly (usually into the operator that creates it). `observeOn` simply delays notifications a
 * little bit more, to ensure that they are emitted at expected moments.
 *
 * As a matter of fact, `observeOn` accepts second parameter, which specifies in milliseconds with what delay notifications
 * will be emitted. The main difference between {@link delay} operator and `observeOn` is that `observeOn`
 * will delay all notifications - including error notifications - while `delay` will pass through error
 * from source Observable immediately when it is emitted. In general it is highly recommended to use `delay` operator
 * for any kind of delaying of values in the stream, while using `observeOn` to specify which scheduler should be used
 * for notification emissions in general.
 *
 * @example <caption>Ensure values in subscribe are called just before browser repaint.</caption>
 * const intervals = Rx.Observable.interval(10); // Intervals are scheduled
 *                                               // with async scheduler by default...
 *
 * intervals
 * .observeOn(Rx.Scheduler.animationFrame)       // ...but we will observe on animationFrame
 * .subscribe(val => {                           // scheduler to ensure smooth animation.
 *   someDiv.style.height = val + 'px';
 * });
 *
 * @see {@link delay}
 *
 * @param {SchedulerLike} scheduler Scheduler that will be used to reschedule notifications from source Observable.
 * @param {number} [delay] Number of milliseconds that states with what delay every notification should be rescheduled.
 * @return {Observable<T>} Observable that emits the same notifications as the source Observable,
 * but with provided scheduler.
 *
 * @method observeOn
 * @owner Observable
 */
function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return operators_1.observeOn(scheduler, delay)(this);
}
exports.observeOn = observeOn;
//# sourceMappingURL=observeOn.js.map

/***/ }),

/***/ "HAEL":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/pairs.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.pairs = rxjs_1.pairs;
//# sourceMappingURL=pairs.js.map

/***/ }),

/***/ "I6kD":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/takeWhile.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var takeWhile_1 = __webpack_require__(/*! ../../operator/takeWhile */ "QTCG");
rxjs_1.Observable.prototype.takeWhile = takeWhile_1.takeWhile;
//# sourceMappingURL=takeWhile.js.map

/***/ }),

/***/ "IMZ1":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/publishBehavior.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * @param value
 * @return {ConnectableObservable<T>}
 * @method publishBehavior
 * @owner Observable
 */
function publishBehavior(value) {
    return operators_1.publishBehavior(value)(this);
}
exports.publishBehavior = publishBehavior;
//# sourceMappingURL=publishBehavior.js.map

/***/ }),

/***/ "IUuq":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/combineAll.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Converts a higher-order Observable into a first-order Observable by waiting
 * for the outer Observable to complete, then applying {@link combineLatest}.
 *
 * <span class="informal">Flattens an Observable-of-Observables by applying
 * {@link combineLatest} when the Observable-of-Observables completes.</span>
 *
 * <img src="./img/combineAll.png" width="100%">
 *
 * Takes an Observable of Observables, and collects all Observables from it.
 * Once the outer Observable completes, it subscribes to all collected
 * Observables and combines their values using the {@link combineLatest}
 * strategy, such that:
 * - Every time an inner Observable emits, the output Observable emits.
 * - When the returned observable emits, it emits all of the latest values by:
 *   - If a `project` function is provided, it is called with each recent value
 *     from each inner Observable in whatever order they arrived, and the result
 *     of the `project` function is what is emitted by the output Observable.
 *   - If there is no `project` function, an array of all of the most recent
 *     values is emitted by the output Observable.
 *
 * @example <caption>Map two click events to a finite interval Observable, then apply combineAll</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map(ev =>
 *   Rx.Observable.interval(Math.random()*2000).take(3)
 * ).take(2);
 * var result = higherOrder.combineAll();
 * result.subscribe(x => console.log(x));
 *
 * @see {@link combineLatest}
 * @see {@link mergeAll}
 *
 * @param {function} [project] An optional function to map the most recent
 * values from each inner Observable into a new result. Takes each of the most
 * recent values from each collected inner Observable as arguments, in order.
 * @return {Observable} An Observable of projected results or arrays of recent
 * values.
 * @method combineAll
 * @owner Observable
 */
function combineAll(project) {
    return operators_1.combineAll(project)(this);
}
exports.combineAll = combineAll;
//# sourceMappingURL=combineAll.js.map

/***/ }),

/***/ "JM0U":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/auditTime.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Ignores source values for `duration` milliseconds, then emits the most recent
 * value from the source Observable, then repeats this process.
 *
 * <span class="informal">When it sees a source values, it ignores that plus
 * the next ones for `duration` milliseconds, and then it emits the most recent
 * value from the source.</span>
 *
 * <img src="./img/auditTime.png" width="100%">
 *
 * `auditTime` is similar to `throttleTime`, but emits the last value from the
 * silenced time window, instead of the first value. `auditTime` emits the most
 * recent value from the source Observable on the output Observable as soon as
 * its internal timer becomes disabled, and ignores source values while the
 * timer is enabled. Initially, the timer is disabled. As soon as the first
 * source value arrives, the timer is enabled. After `duration` milliseconds (or
 * the time unit determined internally by the optional `scheduler`) has passed,
 * the timer is disabled, then the most recent source value is emitted on the
 * output Observable, and this process repeats for the next source value.
 * Optionally takes a {@link IScheduler} for managing timers.
 *
 * @example <caption>Emit clicks at a rate of at most one click per second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.auditTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link audit}
 * @see {@link debounceTime}
 * @see {@link delay}
 * @see {@link sampleTime}
 * @see {@link throttleTime}
 *
 * @param {number} duration Time to wait before emitting the most recent source
 * value, measured in milliseconds or the time unit determined internally
 * by the optional `scheduler`.
 * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
 * managing the timers that handle the rate-limiting behavior.
 * @return {Observable<T>} An Observable that performs rate-limiting of
 * emissions from the source Observable.
 * @method auditTime
 * @owner Observable
 */
function auditTime(duration, scheduler) {
    if (scheduler === void 0) { scheduler = rxjs_1.asyncScheduler; }
    return operators_1.auditTime(duration, scheduler)(this);
}
exports.auditTime = auditTime;
//# sourceMappingURL=auditTime.js.map

/***/ }),

/***/ "JpQp":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/throttle.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var throttle_1 = __webpack_require__(/*! ../../operator/throttle */ "LSSe");
rxjs_1.Observable.prototype.throttle = throttle_1.throttle;
//# sourceMappingURL=throttle.js.map

/***/ }),

/***/ "KC9P":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/concat.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var concat_1 = __webpack_require__(/*! ../../operator/concat */ "ovWV");
rxjs_1.Observable.prototype.concat = concat_1.concat;
//# sourceMappingURL=concat.js.map

/***/ }),

/***/ "KGUQ":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/dematerialize.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var dematerialize_1 = __webpack_require__(/*! ../../operator/dematerialize */ "FDEy");
rxjs_1.Observable.prototype.dematerialize = dematerialize_1.dematerialize;
//# sourceMappingURL=dematerialize.js.map

/***/ }),

/***/ "KVj6":
/*!******************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/max.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var max_1 = __webpack_require__(/*! ../../operator/max */ "7065");
rxjs_1.Observable.prototype.max = max_1.max;
//# sourceMappingURL=max.js.map

/***/ }),

/***/ "Kvnp":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/every.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var every_1 = __webpack_require__(/*! ../../operator/every */ "cLIC");
rxjs_1.Observable.prototype.every = every_1.every;
//# sourceMappingURL=every.js.map

/***/ }),

/***/ "KxFi":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/mergeAll.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Converts a higher-order Observable into a first-order Observable which
 * concurrently delivers all values that are emitted on the inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables.</span>
 *
 * <img src="./img/mergeAll.png" width="100%">
 *
 * `mergeAll` subscribes to an Observable that emits Observables, also known as
 * a higher-order Observable. Each time it observes one of these emitted inner
 * Observables, it subscribes to that and delivers all the values from the
 * inner Observable on the output Observable. The output Observable only
 * completes once all inner Observables have completed. Any error delivered by
 * a inner Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var firstOrder = higherOrder.mergeAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
 * var firstOrder = higherOrder.mergeAll(2);
 * firstOrder.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link exhaust}
 * @see {@link merge}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits values coming from all the
 * inner Observables emitted by the source Observable.
 * @method mergeAll
 * @owner Observable
 */
function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return operators_1.mergeAll(concurrent)(this);
}
exports.mergeAll = mergeAll;
//# sourceMappingURL=mergeAll.js.map

/***/ }),

/***/ "LM6Q":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/startWith.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits the items you specify as arguments before it begins to emit
 * items emitted by the source Observable.
 *
 * <img src="./img/startWith.png" width="100%">
 *
 * @param {...T} values - Items you want the modified Observable to emit first.
 * @param {Scheduler} [scheduler] - A {@link IScheduler} to use for scheduling
 * the emissions of the `next` notifications.
 * @return {Observable} An Observable that emits the items in the specified Iterable and then emits the items
 * emitted by the source Observable.
 * @method startWith
 * @owner Observable
 */
function startWith() {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        array[_i] = arguments[_i];
    }
    return operators_1.startWith.apply(void 0, array)(this);
}
exports.startWith = startWith;
//# sourceMappingURL=startWith.js.map

/***/ }),

/***/ "LOqM":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/debounce.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var debounce_1 = __webpack_require__(/*! ../../operator/debounce */ "uARb");
rxjs_1.Observable.prototype.debounce = debounce_1.debounce;
//# sourceMappingURL=debounce.js.map

/***/ }),

/***/ "LOr+":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/debounceTime.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Emits a value from the source Observable only after a particular time span
 * has passed without another source emission.
 *
 * <span class="informal">It's like {@link delay}, but passes only the most
 * recent value from each burst of emissions.</span>
 *
 * <img src="./img/debounceTime.png" width="100%">
 *
 * `debounceTime` delays values emitted by the source Observable, but drops
 * previous pending delayed emissions if a new value arrives on the source
 * Observable. This operator keeps track of the most recent value from the
 * source Observable, and emits that only when `dueTime` enough time has passed
 * without any other value appearing on the source Observable. If a new value
 * appears before `dueTime` silence occurs, the previous value will be dropped
 * and will not be emitted on the output Observable.
 *
 * This is a rate-limiting operator, because it is impossible for more than one
 * value to be emitted in any time window of duration `dueTime`, but it is also
 * a delay-like operator since output emissions do not occur at the same time as
 * they did on the source Observable. Optionally takes a {@link IScheduler} for
 * managing timers.
 *
 * @example <caption>Emit the most recent click after a burst of clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.debounceTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link auditTime}
 * @see {@link debounce}
 * @see {@link delay}
 * @see {@link sampleTime}
 * @see {@link throttleTime}
 *
 * @param {number} dueTime The timeout duration in milliseconds (or the time
 * unit determined internally by the optional `scheduler`) for the window of
 * time required to wait for emission silence before emitting the most recent
 * source value.
 * @param {Scheduler} [scheduler=asyncScheduler] The {@link SchedulerLike} to use for
 * managing the timers that handle the timeout for each value.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified `dueTime`, and may drop some values if they occur
 * too frequently.
 * @method debounceTime
 * @owner Observable
 */
function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) { scheduler = rxjs_1.asyncScheduler; }
    return operators_1.debounceTime(dueTime, scheduler)(this);
}
exports.debounceTime = debounceTime;
//# sourceMappingURL=debounceTime.js.map

/***/ }),

/***/ "LSSe":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/throttle.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
var internal_compatibility_1 = __webpack_require__(/*! rxjs/internal-compatibility */ "lRok");
/**
 * Emits a value from the source Observable, then ignores subsequent source
 * values for a duration determined by another Observable, then repeats this
 * process.
 *
 * <span class="informal">It's like {@link throttleTime}, but the silencing
 * duration is determined by a second Observable.</span>
 *
 * <img src="./img/throttle.png" width="100%">
 *
 * `throttle` emits the source Observable values on the output Observable
 * when its internal timer is disabled, and ignores source values when the timer
 * is enabled. Initially, the timer is disabled. As soon as the first source
 * value arrives, it is forwarded to the output Observable, and then the timer
 * is enabled by calling the `durationSelector` function with the source value,
 * which returns the "duration" Observable. When the duration Observable emits a
 * value or completes, the timer is disabled, and this process repeats for the
 * next source value.
 *
 * @example <caption>Emit clicks at a rate of at most one click per second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.throttle(ev => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link audit}
 * @see {@link debounce}
 * @see {@link delayWhen}
 * @see {@link sample}
 * @see {@link throttleTime}
 *
 * @param {function(value: T): SubscribableOrPromise} durationSelector A function
 * that receives a value from the source Observable, for computing the silencing
 * duration for each source value, returned as an Observable or a Promise.
 * @param {Object} config a configuration object to define `leading` and `trailing` behavior. Defaults
 * to `{ leading: true, trailing: false }`.
 * @return {Observable<T>} An Observable that performs the throttle operation to
 * limit the rate of emissions from the source.
 * @method throttle
 * @owner Observable
 */
function throttle(durationSelector, config) {
    if (config === void 0) { config = internal_compatibility_1.defaultThrottleConfig; }
    return operators_1.throttle(durationSelector, config)(this);
}
exports.throttle = throttle;
//# sourceMappingURL=throttle.js.map

/***/ }),

/***/ "LSkT":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/skipLast.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var skipLast_1 = __webpack_require__(/*! ../../operator/skipLast */ "COpn");
rxjs_1.Observable.prototype.skipLast = skipLast_1.skipLast;
//# sourceMappingURL=skipLast.js.map

/***/ }),

/***/ "LUEE":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/sample.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var sample_1 = __webpack_require__(/*! ../../operator/sample */ "CVW7");
rxjs_1.Observable.prototype.sample = sample_1.sample;
//# sourceMappingURL=sample.js.map

/***/ }),

/***/ "LfHy":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/publishReplay.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * @param bufferSize
 * @param windowTime
 * @param selectorOrScheduler
 * @param scheduler
 * @return {Observable<T> | ConnectableObservable<T>}
 * @method publishReplay
 * @owner Observable
 */
function publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler) {
    return operators_1.publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler)(this);
}
exports.publishReplay = publishReplay;
//# sourceMappingURL=publishReplay.js.map

/***/ }),

/***/ "Lsvf":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/ignoreElements.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
 *
 * <img src="./img/ignoreElements.png" width="100%">
 *
 * @return {Observable} An empty Observable that only calls `complete`
 * or `error`, based on which one is called by the source Observable.
 * @method ignoreElements
 * @owner Observable
 */
function ignoreElements() {
    return operators_1.ignoreElements()(this);
}
exports.ignoreElements = ignoreElements;
//# sourceMappingURL=ignoreElements.js.map

/***/ }),

/***/ "LxJG":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/combineAll.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var combineAll_1 = __webpack_require__(/*! ../../operator/combineAll */ "IUuq");
rxjs_1.Observable.prototype.combineAll = combineAll_1.combineAll;
//# sourceMappingURL=combineAll.js.map

/***/ }),

/***/ "M6P7":
/*!******************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/finally.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Returns an Observable that mirrors the source Observable, but will call a specified function when
 * the source terminates on complete, error or unsubscribe.
 *
 * <span class="informal">Ensure a given function will be called when a stream ends, no matter why it ended.</span>
 *
 * `finally` method accepts as a single parameter a function. This function does not accept any parameters and
 * should not return anything. It will be called whenever source Observable completes, errors or is unsubscribed,
 * which makes it good candidate to perform any necessary clean up or side effects when Observable terminates,
 * no matter how or why it terminated.
 *
 * Observable returned by `finally` will simply mirror source Observable - each time it is subscribed, source
 * Observable will be subscribed underneath.
 *
 * Note that behavior of `finally` will be repeated per every subscription, so if resulting Observable has
 * many subscribers, function passed to `finally` might be potentially called multiple times.
 *
 * Remember also that `finally` differs quite a lot from passing complete or error handler to {@link subscribe}. It will
 * return an Observable which can be further chained, while `subscribe` returns Subscription, basically ending Observable
 * chain. Function passed to `finally` will be called also when consumer of resulting Observable unsubscribes from it,
 * while handlers passed to `subscribe` will not (even complete handler). But most importantly, `finally` does not start
 * an execution of source Observable, like `subscribe` does, allowing you to set up all necessary hooks before
 * passing Observable further, even without specific knowledge how or when it will be used.
 *
 *
 * @example <caption>Call finally after complete notification</caption>
 * Rx.Observable.of(1, 2, 3)
 * .finally(() => console.log('I was finalized!'))
 * .map(x => x * 2) // `finally` returns an Observable, so we still can chain operators.
 * .subscribe(
 *   val => console.log(val),
 *   err => {},
 *   () => console.log('I completed!')
 * );
 *
 * // Logs:
 * // 1
 * // 2
 * // 3
 * // "I completed!"
 * // "I was finalized!"
 *
 *
 *
 * @example <caption>Call finally after consumer unsubscribes</caption>
 * const o = Rx.Observable.interval(1000)
 * .finally(() => console.log('Timer stopped'));
 *
 * const subscription = o.subscribe(
 *   val => console.log(val),
 *   err => {},
 *   () => console.log('Complete!') // Will not be called, since complete handler
 * );                               // does not react to unsubscription, just to
 *                                  // complete notification sent by the Observable itself.
 *
 * setTimeout(() => subscription.unsubscribe(), 2500);
 *
 * // Logs:
 * // 0 after 1s
 * // 1 after 2s
 * // "Timer stopped" after 2.5s
 *
 * @see {@link using}
 *
 * @param {function} callback Function to be called when source terminates (completes, errors or is unsubscribed).
 * @return {Observable} An Observable that mirrors the source, but will call the specified function on termination.
 * @method finally
 * @name finally
 * @owner Observable
 */
function _finally(callback) {
    return operators_1.finalize(callback)(this);
}
exports._finally = _finally;
//# sourceMappingURL=finally.js.map

/***/ }),

/***/ "Mw3v":
/*!****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/pluck.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Maps each source value (an object) to its specified nested property.
 *
 * <span class="informal">Like {@link map}, but meant only for picking one of
 * the nested properties of every emitted object.</span>
 *
 * <img src="./img/pluck.png" width="100%">
 *
 * Given a list of strings describing a path to an object property, retrieves
 * the value of a specified nested property from all values in the source
 * Observable. If a property can't be resolved, it will return `undefined` for
 * that value.
 *
 * @example <caption>Map every click to the tagName of the clicked target element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var tagNames = clicks.pluck('target', 'tagName');
 * tagNames.subscribe(x => console.log(x));
 *
 * @see {@link map}
 *
 * @param {...string} properties The nested properties to pluck from each source
 * value (an object).
 * @return {Observable} A new Observable of property values from the source values.
 * @method pluck
 * @owner Observable
 */
function pluck() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i] = arguments[_i];
    }
    return operators_1.pluck.apply(void 0, properties)(this);
}
exports.pluck = pluck;
//# sourceMappingURL=pluck.js.map

/***/ }),

/***/ "Myac":
/*!***************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/race.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that mirrors the first source Observable to emit an item
 * from the combination of this Observable and supplied Observables.
 * @param {...Observables} ...observables Sources used to race for which Observable emits first.
 * @return {Observable} An Observable that mirrors the output of the first Observable to emit an item.
 * @method race
 * @owner Observable
 */
function race() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    return operators_1.race.apply(void 0, observables)(this);
}
exports.race = race;
//# sourceMappingURL=race.js.map

/***/ }),

/***/ "ND/j":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/window.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var window_1 = __webpack_require__(/*! ../../operator/window */ "Xh4i");
rxjs_1.Observable.prototype.window = window_1.window;
//# sourceMappingURL=window.js.map

/***/ }),

/***/ "NEMR":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/retryWhen.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Returns an Observable that mirrors the source Observable with the exception of an `error`. If the source Observable
 * calls `error`, this method will emit the Throwable that caused the error to the Observable returned from `notifier`.
 * If that Observable calls `complete` or `error` then this method will call `complete` or `error` on the child
 * subscription. Otherwise this method will resubscribe to the source Observable.
 *
 * <img src="./img/retryWhen.png" width="100%">
 *
 * @param {function(errors: Observable): Observable} notifier - Receives an Observable of notifications with which a
 * user can `complete` or `error`, aborting the retry.
 * @return {Observable} The source Observable modified with retry logic.
 * @method retryWhen
 * @owner Observable
 */
function retryWhen(notifier) {
    return operators_1.retryWhen(notifier)(this);
}
exports.retryWhen = retryWhen;
//# sourceMappingURL=retryWhen.js.map

/***/ }),

/***/ "Nh3w":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/partition.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var partition_1 = __webpack_require__(/*! ../../operator/partition */ "Y7AG");
rxjs_1.Observable.prototype.partition = partition_1.partition;
//# sourceMappingURL=partition.js.map

/***/ }),

/***/ "O5hQ":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/forkJoin.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.forkJoin = rxjs_1.forkJoin;
//# sourceMappingURL=forkJoin.js.map

/***/ }),

/***/ "P+DX":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/mergeAll.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var mergeAll_1 = __webpack_require__(/*! ../../operator/mergeAll */ "KxFi");
rxjs_1.Observable.prototype.mergeAll = mergeAll_1.mergeAll;
//# sourceMappingURL=mergeAll.js.map

/***/ }),

/***/ "P71F":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/sampleTime.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Emits the most recently emitted value from the source Observable within
 * periodic time intervals.
 *
 * <span class="informal">Samples the source Observable at periodic time
 * intervals, emitting what it samples.</span>
 *
 * <img src="./img/sampleTime.png" width="100%">
 *
 * `sampleTime` periodically looks at the source Observable and emits whichever
 * value it has most recently emitted since the previous sampling, unless the
 * source has not emitted anything since the previous sampling. The sampling
 * happens periodically in time every `period` milliseconds (or the time unit
 * defined by the optional `scheduler` argument). The sampling starts as soon as
 * the output Observable is subscribed.
 *
 * @example <caption>Every second, emit the most recent click at most once</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.sampleTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link auditTime}
 * @see {@link debounceTime}
 * @see {@link delay}
 * @see {@link sample}
 * @see {@link throttleTime}
 *
 * @param {number} period The sampling period expressed in milliseconds or the
 * time unit determined internally by the optional `scheduler`.
 * @param {Scheduler} [scheduler=asyncScheduler] The {@link SchedulerLike} to use for
 * managing the timers that handle the sampling.
 * @return {Observable<T>} An Observable that emits the results of sampling the
 * values emitted by the source Observable at the specified time interval.
 * @method sampleTime
 * @owner Observable
 */
function sampleTime(period, scheduler) {
    if (scheduler === void 0) { scheduler = rxjs_1.asyncScheduler; }
    return operators_1.sampleTime(period, scheduler)(this);
}
exports.sampleTime = sampleTime;
//# sourceMappingURL=sampleTime.js.map

/***/ }),

/***/ "PZgn":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/publishReplay.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var publishReplay_1 = __webpack_require__(/*! ../../operator/publishReplay */ "LfHy");
rxjs_1.Observable.prototype.publishReplay = publishReplay_1.publishReplay;
//# sourceMappingURL=publishReplay.js.map

/***/ }),

/***/ "PpQq":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/bindNodeCallback.js ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.bindNodeCallback = rxjs_1.bindNodeCallback;
//# sourceMappingURL=bindNodeCallback.js.map

/***/ }),

/***/ "QJJP":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/scan.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var scan_1 = __webpack_require__(/*! ../../operator/scan */ "elu/");
rxjs_1.Observable.prototype.scan = scan_1.scan;
//# sourceMappingURL=scan.js.map

/***/ }),

/***/ "QPu+":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/reduce.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Applies an accumulator function over the source Observable, and returns the
 * accumulated result when the source completes, given an optional seed value.
 *
 * <span class="informal">Combines together all values emitted on the source,
 * using an accumulator function that knows how to join a new source value into
 * the accumulation from the past.</span>
 *
 * <img src="./img/reduce.png" width="100%">
 *
 * Like
 * [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce),
 * `reduce` applies an `accumulator` function against an accumulation and each
 * value of the source Observable (from the past) to reduce it to a single
 * value, emitted on the output Observable. Note that `reduce` will only emit
 * one value, only when the source Observable completes. It is equivalent to
 * applying operator {@link scan} followed by operator {@link last}.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * @example <caption>Count the number of click events that happened in 5 seconds</caption>
 * var clicksInFiveSeconds = Rx.Observable.fromEvent(document, 'click')
 *   .takeUntil(Rx.Observable.interval(5000));
 * var ones = clicksInFiveSeconds.mapTo(1);
 * var seed = 0;
 * var count = ones.reduce((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {@link count}
 * @see {@link expand}
 * @see {@link mergeScan}
 * @see {@link scan}
 *
 * @param {function(acc: R, value: T, index: number): R} accumulator The accumulator function
 * called on each source value.
 * @param {R} [seed] The initial accumulation value.
 * @return {Observable<R>} An Observable that emits a single value that is the
 * result of accumulating the values emitted by the source Observable.
 * @method reduce
 * @owner Observable
 */
function reduce(accumulator, seed) {
    // providing a seed of `undefined` *should* be valid and trigger
    // hasSeed! so don't use `seed !== undefined` checks!
    // For this reason, we have to check it here at the original call site
    // otherwise inside Operator/Subscriber we won't know if `undefined`
    // means they didn't provide anything or if they literally provided `undefined`
    if (arguments.length >= 2) {
        return operators_1.reduce(accumulator, seed)(this);
    }
    return operators_1.reduce(accumulator)(this);
}
exports.reduce = reduce;
//# sourceMappingURL=reduce.js.map

/***/ }),

/***/ "QTCG":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/takeWhile.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Emits values emitted by the source Observable so long as each value satisfies
 * the given `predicate`, and then completes as soon as this `predicate` is not
 * satisfied.
 *
 * <span class="informal">Takes values from the source only while they pass the
 * condition given. When the first value does not satisfy, it completes.</span>
 *
 * <img src="./img/takeWhile.png" width="100%">
 *
 * `takeWhile` subscribes and begins mirroring the source Observable. Each value
 * emitted on the source is given to the `predicate` function which returns a
 * boolean, representing a condition to be satisfied by the source values. The
 * output Observable emits the source values until such time as the `predicate`
 * returns false, at which point `takeWhile` stops mirroring the source
 * Observable and completes the output Observable.
 *
 * @example <caption>Emit click events only while the clientX property is greater than 200</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.takeWhile(ev => ev.clientX > 200);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link take}
 * @see {@link takeLast}
 * @see {@link takeUntil}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates a value emitted by the source Observable and returns a boolean.
 * Also takes the (zero-based) index as the second argument.
 * @return {Observable<T>} An Observable that emits the values from the source
 * Observable so long as each value satisfies the condition defined by the
 * `predicate`, then completes.
 * @method takeWhile
 * @owner Observable
 */
function takeWhile(predicate) {
    return operators_1.takeWhile(predicate)(this);
}
exports.takeWhile = takeWhile;
//# sourceMappingURL=takeWhile.js.map

/***/ }),

/***/ "QXri":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/throw.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.throw = rxjs_1.throwError;
rxjs_1.Observable.throwError = rxjs_1.throwError;
//# sourceMappingURL=throw.js.map

/***/ }),

/***/ "Qbza":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/materialize.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var materialize_1 = __webpack_require__(/*! ../../operator/materialize */ "1gRP");
rxjs_1.Observable.prototype.materialize = materialize_1.materialize;
//# sourceMappingURL=materialize.js.map

/***/ }),

/***/ "QsQ4":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/withLatestFrom.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Combines the source Observable with other Observables to create an Observable
 * whose values are calculated from the latest values of each, only when the
 * source emits.
 *
 * <span class="informal">Whenever the source Observable emits a value, it
 * computes a formula using that value plus the latest values from other input
 * Observables, then emits the output of that formula.</span>
 *
 * <img src="./img/withLatestFrom.png" width="100%">
 *
 * `withLatestFrom` combines each value from the source Observable (the
 * instance) with the latest values from the other input Observables only when
 * the source emits a value, optionally using a `project` function to determine
 * the value to be emitted on the output Observable. All input Observables must
 * emit at least one value before the output Observable will emit a value.
 *
 * @example <caption>On every click event, emit an array with the latest timer event plus the click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var result = clicks.withLatestFrom(timer);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link combineLatest}
 *
 * @param {ObservableInput} other An input Observable to combine with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {Function} [project] Projection function for combining values
 * together. Receives all values in order of the Observables passed, where the
 * first parameter is a value from the source Observable. (e.g.
 * `a.withLatestFrom(b, c, (a1, b1, c1) => a1 + b1 + c1)`). If this is not
 * passed, arrays will be emitted on the output Observable.
 * @return {Observable} An Observable of projected values from the most recent
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @method withLatestFrom
 * @owner Observable
 */
function withLatestFrom() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return operators_1.withLatestFrom.apply(void 0, args)(this);
}
exports.withLatestFrom = withLatestFrom;
//# sourceMappingURL=withLatestFrom.js.map

/***/ }),

/***/ "QtPd":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/debounceTime.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var debounceTime_1 = __webpack_require__(/*! ../../operator/debounceTime */ "LOr+");
rxjs_1.Observable.prototype.debounceTime = debounceTime_1.debounceTime;
//# sourceMappingURL=debounceTime.js.map

/***/ }),

/***/ "Qw2J":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/concatAll.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var concatAll_1 = __webpack_require__(/*! ../../operator/concatAll */ "caIW");
rxjs_1.Observable.prototype.concatAll = concatAll_1.concatAll;
//# sourceMappingURL=concatAll.js.map

/***/ }),

/***/ "RFdt":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/isEmpty.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var isEmpty_1 = __webpack_require__(/*! ../../operator/isEmpty */ "nueD");
rxjs_1.Observable.prototype.isEmpty = isEmpty_1.isEmpty;
//# sourceMappingURL=isEmpty.js.map

/***/ }),

/***/ "RFoL":
/*!****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/first.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Emits only the first value (or the first value that meets some condition)
 * emitted by the source Observable.
 *
 * <span class="informal">Emits only the first value. Or emits only the first
 * value that passes some test.</span>
 *
 * <img src="./img/first.png" width="100%">
 *
 * If called with no arguments, `first` emits the first value of the source
 * Observable, then completes. If called with a `predicate` function, `first`
 * emits the first value of the source that matches the specified condition. It
 * may also take a `resultSelector` function to produce the output value from
 * the input value, and a `defaultValue` to emit in case the source completes
 * before it is able to emit a valid value. Throws an error if `defaultValue`
 * was not provided and a matching element is not found.
 *
 * @example <caption>Emit only the first click that happens on the DOM</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first();
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Emits the first click that happens on a DIV</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link filter}
 * @see {@link find}
 * @see {@link take}
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 *
 * @param {function(value: T, index: number, source: Observable<T>): boolean} [predicate]
 * An optional function called with each item to test for condition matching.
 * @param {T} [defaultValue] The default value emitted in case no valid value
 * was found on the source.
 * @return {Observable<T>} An Observable of the first item that matches the
 * condition.
 * @method first
 * @owner Observable
 */
function first() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return operators_1.first.apply(void 0, args)(this);
}
exports.first = first;
//# sourceMappingURL=first.js.map

/***/ }),

/***/ "RT2N":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/concatMapTo.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var concatMapTo_1 = __webpack_require__(/*! ../../operator/concatMapTo */ "eUyF");
rxjs_1.Observable.prototype.concatMapTo = concatMapTo_1.concatMapTo;
//# sourceMappingURL=concatMapTo.js.map

/***/ }),

/***/ "RhlD":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/interval.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.interval = rxjs_1.interval;
//# sourceMappingURL=interval.js.map

/***/ }),

/***/ "SjmF":
/*!**************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/min.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * The Min operator operates on an Observable that emits numbers (or items that can be compared with a provided function),
 * and when source Observable completes it emits a single item: the item with the smallest value.
 *
 * <img src="./img/min.png" width="100%">
 *
 * @example <caption>Get the minimal value of a series of numbers</caption>
 * Rx.Observable.of(5, 4, 7, 2, 8)
 *   .min()
 *   .subscribe(x => console.log(x)); // -> 2
 *
 * @example <caption>Use a comparer function to get the minimal item</caption>
 * interface Person {
 *   age: number,
 *   name: string
 * }
 * Observable.of<Person>({age: 7, name: 'Foo'},
 *                       {age: 5, name: 'Bar'},
 *                       {age: 9, name: 'Beer'})
 *           .min<Person>( (a: Person, b: Person) => a.age < b.age ? -1 : 1)
 *           .subscribe((x: Person) => console.log(x.name)); // -> 'Bar'
 * }
 *
 * @see {@link max}
 *
 * @param {Function} [comparer] - Optional comparer function that it will use instead of its default to compare the
 * value of two items.
 * @return {Observable<R>} An Observable that emits item with the smallest value.
 * @method min
 * @owner Observable
 */
function min(comparer) {
    return operators_1.min(comparer)(this);
}
exports.min = min;
//# sourceMappingURL=min.js.map

/***/ }),

/***/ "TMm9":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/toArray.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var toArray_1 = __webpack_require__(/*! ../../operator/toArray */ "0c70");
rxjs_1.Observable.prototype.toArray = toArray_1.toArray;
//# sourceMappingURL=toArray.js.map

/***/ }),

/***/ "TpWx":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/windowCount.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Branch out the source Observable values as a nested Observable with each
 * nested Observable emitting at most `windowSize` values.
 *
 * <span class="informal">It's like {@link bufferCount}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowCount.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits windows every `startWindowEvery`
 * items, each containing no more than `windowSize` items. When the source
 * Observable completes or encounters an error, the output Observable emits
 * the current window and propagates the notification from the source
 * Observable. If `startWindowEvery` is not provided, then new windows are
 * started immediately at the start of the source and when each window completes
 * with size `windowSize`.
 *
 * @example <caption>Ignore every 3rd click event, starting from the first one</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowCount(3)
 *   .map(win => win.skip(1)) // skip first of every 3 clicks
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Ignore every 3rd click event, starting from the third one</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowCount(2, 3)
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {@link window}
 * @see {@link windowTime}
 * @see {@link windowToggle}
 * @see {@link windowWhen}
 * @see {@link bufferCount}
 *
 * @param {number} windowSize The maximum number of values emitted by each
 * window.
 * @param {number} [startWindowEvery] Interval at which to start a new window.
 * For example if `startWindowEvery` is `2`, then a new window will be started
 * on every other value from the source. A new window is started at the
 * beginning of the source by default.
 * @return {Observable<Observable<T>>} An Observable of windows, which in turn
 * are Observable of values.
 * @method windowCount
 * @owner Observable
 */
function windowCount(windowSize, startWindowEvery) {
    if (startWindowEvery === void 0) { startWindowEvery = 0; }
    return operators_1.windowCount(windowSize, startWindowEvery)(this);
}
exports.windowCount = windowCount;
//# sourceMappingURL=windowCount.js.map

/***/ }),

/***/ "TqLU":
/*!***************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/find.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Emits only the first value emitted by the source Observable that meets some
 * condition.
 *
 * <span class="informal">Finds the first value that passes some test and emits
 * that.</span>
 *
 * <img src="./img/find.png" width="100%">
 *
 * `find` searches for the first item in the source Observable that matches the
 * specified condition embodied by the `predicate`, and returns the first
 * occurrence in the source. Unlike {@link first}, the `predicate` is required
 * in `find`, and does not emit an error if a valid value is not found.
 *
 * @example <caption>Find and emit the first click that happens on a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.find(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link filter}
 * @see {@link first}
 * @see {@link findIndex}
 * @see {@link take}
 *
 * @param {function(value: T, index: number, source: Observable<T>): boolean} predicate
 * A function called with each item to test for condition matching.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable<T>} An Observable of the first item that matches the
 * condition.
 * @method find
 * @owner Observable
 */
function find(predicate, thisArg) {
    return operators_1.find(predicate, thisArg)(this);
}
exports.find = find;
//# sourceMappingURL=find.js.map

/***/ }),

/***/ "TwXD":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/distinctUntilKeyChanged.js ***!
  \**************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var distinctUntilKeyChanged_1 = __webpack_require__(/*! ../../operator/distinctUntilKeyChanged */ "7y2s");
rxjs_1.Observable.prototype.distinctUntilKeyChanged = distinctUntilKeyChanged_1.distinctUntilKeyChanged;
//# sourceMappingURL=distinctUntilKeyChanged.js.map

/***/ }),

/***/ "UE8N":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/sequenceEqual.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Compares all values of two observables in sequence using an optional comparor function
 * and returns an observable of a single boolean value representing whether or not the two sequences
 * are equal.
 *
 * <span class="informal">Checks to see of all values emitted by both observables are equal, in order.</span>
 *
 * <img src="./img/sequenceEqual.png" width="100%">
 *
 * `sequenceEqual` subscribes to two observables and buffers incoming values from each observable. Whenever either
 * observable emits a value, the value is buffered and the buffers are shifted and compared from the bottom
 * up; If any value pair doesn't match, the returned observable will emit `false` and complete. If one of the
 * observables completes, the operator will wait for the other observable to complete; If the other
 * observable emits before completing, the returned observable will emit `false` and complete. If one observable never
 * completes or emits after the other complets, the returned observable will never complete.
 *
 * @example <caption>figure out if the Konami code matches</caption>
 * var code = Rx.Observable.from([
 *  "ArrowUp",
 *  "ArrowUp",
 *  "ArrowDown",
 *  "ArrowDown",
 *  "ArrowLeft",
 *  "ArrowRight",
 *  "ArrowLeft",
 *  "ArrowRight",
 *  "KeyB",
 *  "KeyA",
 *  "Enter" // no start key, clearly.
 * ]);
 *
 * var keys = Rx.Observable.fromEvent(document, 'keyup')
 *  .map(e => e.code);
 * var matches = keys.bufferCount(11, 1)
 *  .mergeMap(
 *    last11 =>
 *      Rx.Observable.from(last11)
 *        .sequenceEqual(code)
 *   );
 * matches.subscribe(matched => console.log('Successful cheat at Contra? ', matched));
 *
 * @see {@link combineLatest}
 * @see {@link zip}
 * @see {@link withLatestFrom}
 *
 * @param {Observable} compareTo The observable sequence to compare the source sequence to.
 * @param {function} [comparor] An optional function to compare each value pair
 * @return {Observable} An Observable of a single boolean value representing whether or not
 * the values emitted by both observables were equal in sequence.
 * @method sequenceEqual
 * @owner Observable
 */
function sequenceEqual(compareTo, comparor) {
    return operators_1.sequenceEqual(compareTo, comparor)(this);
}
exports.sequenceEqual = sequenceEqual;
//# sourceMappingURL=sequenceEqual.js.map

/***/ }),

/***/ "VSOP":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/share.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var share_1 = __webpack_require__(/*! ../../operator/share */ "l4jP");
rxjs_1.Observable.prototype.share = share_1.share;
//# sourceMappingURL=share.js.map

/***/ }),

/***/ "VlMj":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/timeInterval.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var timeInterval_1 = __webpack_require__(/*! ../../operator/timeInterval */ "bKLx");
rxjs_1.Observable.prototype.timeInterval = timeInterval_1.timeInterval;
//# sourceMappingURL=timeInterval.js.map

/***/ }),

/***/ "VmLd":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/combineLatest.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var internal_compatibility_1 = __webpack_require__(/*! rxjs/internal-compatibility */ "lRok");
/* tslint:enable:max-line-length */
/**
 * Combines multiple Observables to create an Observable whose values are
 * calculated from the latest values of each of its input Observables.
 *
 * <span class="informal">Whenever any input Observable emits a value, it
 * computes a formula using the latest values from all the inputs, then emits
 * the output of that formula.</span>
 *
 * <img src="./img/combineLatest.png" width="100%">
 *
 * `combineLatest` combines the values from this Observable with values from
 * Observables passed as arguments. This is done by subscribing to each
 * Observable, in order, and collecting an array of each of the most recent
 * values any time any of the input Observables emits, then either taking that
 * array and passing it as arguments to an optional `project` function and
 * emitting the return value of that, or just emitting the array of recent
 * values directly if there is no `project` function.
 *
 * @example <caption>Dynamically calculate the Body-Mass Index from an Observable of weight and one for height</caption>
 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
 * var bmi = weight.combineLatest(height, (w, h) => w / (h * h));
 * bmi.subscribe(x => console.log('BMI is ' + x));
 *
 * // With output to console:
 * // BMI is 24.212293388429753
 * // BMI is 23.93948099205209
 * // BMI is 23.671253629592222
 *
 * @see {@link combineAll}
 * @see {@link merge}
 * @see {@link withLatestFrom}
 *
 * @param {ObservableInput} other An input Observable to combine with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {function} [project] An optional function to project the values from
 * the combined latest values into a new value on the output Observable.
 * @return {Observable} An Observable of projected values from the most recent
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @method combineLatest
 * @owner Observable
 */
function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var project = null;
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    // if the first and only other argument besides the resultSelector is an array
    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
    if (observables.length === 1 && internal_compatibility_1.isArray(observables[0])) {
        observables = observables[0].slice();
    }
    return this.lift.call(rxjs_1.of.apply(void 0, [this].concat(observables)), new internal_compatibility_1.CombineLatestOperator(project));
}
exports.combineLatest = combineLatest;
//# sourceMappingURL=combineLatest.js.map

/***/ }),

/***/ "Vzig":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/throttleTime.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var internal_compatibility_1 = __webpack_require__(/*! rxjs/internal-compatibility */ "lRok");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Emits a value from the source Observable, then ignores subsequent source
 * values for `duration` milliseconds, then repeats this process.
 *
 * <span class="informal">Lets a value pass, then ignores source values for the
 * next `duration` milliseconds.</span>
 *
 * <img src="./img/throttleTime.png" width="100%">
 *
 * `throttleTime` emits the source Observable values on the output Observable
 * when its internal timer is disabled, and ignores source values when the timer
 * is enabled. Initially, the timer is disabled. As soon as the first source
 * value arrives, it is forwarded to the output Observable, and then the timer
 * is enabled. After `duration` milliseconds (or the time unit determined
 * internally by the optional `scheduler`) has passed, the timer is disabled,
 * and this process repeats for the next source value. Optionally takes a
 * {@link IScheduler} for managing timers.
 *
 * @example <caption>Emit clicks at a rate of at most one click per second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.throttleTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link auditTime}
 * @see {@link debounceTime}
 * @see {@link delay}
 * @see {@link sampleTime}
 * @see {@link throttle}
 *
 * @param {number} duration Time to wait before emitting another value after
 * emitting the last value, measured in milliseconds or the time unit determined
 * internally by the optional `scheduler`.
 * @param {Scheduler} [scheduler=asyncScheduler] The {@link SchedulerLike} to use for
 * managing the timers that handle the throttling.
 * @return {Observable<T>} An Observable that performs the throttle operation to
 * limit the rate of emissions from the source.
 * @method throttleTime
 * @owner Observable
 */
function throttleTime(duration, scheduler, config) {
    if (scheduler === void 0) { scheduler = rxjs_1.asyncScheduler; }
    if (config === void 0) { config = internal_compatibility_1.defaultThrottleConfig; }
    return operators_1.throttleTime(duration, scheduler, config)(this);
}
exports.throttleTime = throttleTime;
//# sourceMappingURL=throttleTime.js.map

/***/ }),

/***/ "W/jz":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/repeatWhen.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var repeatWhen_1 = __webpack_require__(/*! ../../operator/repeatWhen */ "A5T5");
rxjs_1.Observable.prototype.repeatWhen = repeatWhen_1.repeatWhen;
//# sourceMappingURL=repeatWhen.js.map

/***/ }),

/***/ "W5YF":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/switchMapTo.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var switchMapTo_1 = __webpack_require__(/*! ../../operator/switchMapTo */ "oXC5");
rxjs_1.Observable.prototype.switchMapTo = switchMapTo_1.switchMapTo;
//# sourceMappingURL=switchMapTo.js.map

/***/ }),

/***/ "XC4j":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/toPromise.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// HACK: does nothing, because `toPromise` now lives on the `Observable` itself.
// leaving this module here to prevent breakage.
//# sourceMappingURL=toPromise.js.map

/***/ }),

/***/ "XDL1":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/elementAt.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Emits the single value at the specified `index` in a sequence of emissions
 * from the source Observable.
 *
 * <span class="informal">Emits only the i-th value, then completes.</span>
 *
 * <img src="./img/elementAt.png" width="100%">
 *
 * `elementAt` returns an Observable that emits the item at the specified
 * `index` in the source Observable, or a default value if that `index` is out
 * of range and the `default` argument is provided. If the `default` argument is
 * not given and the `index` is out of range, the output Observable will emit an
 * `ArgumentOutOfRangeError` error.
 *
 * @example <caption>Emit only the third click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.elementAt(2);
 * result.subscribe(x => console.log(x));
 *
 * // Results in:
 * // click 1 = nothing
 * // click 2 = nothing
 * // click 3 = MouseEvent object logged to console
 *
 * @see {@link first}
 * @see {@link last}
 * @see {@link skip}
 * @see {@link single}
 * @see {@link take}
 *
 * @throws {ArgumentOutOfRangeError} When using `elementAt(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0` or the
 * Observable has completed before emitting the i-th `next` notification.
 *
 * @param {number} index Is the number `i` for the i-th source emission that has
 * happened since the subscription, starting from the number `0`.
 * @param {T} [defaultValue] The default value returned for missing indices.
 * @return {Observable} An Observable that emits a single item, if it is found.
 * Otherwise, will emit the default value if given. If not, then emits an error.
 * @method elementAt
 * @owner Observable
 */
function elementAt(index, defaultValue) {
    return operators_1.elementAt.apply(undefined, arguments)(this);
}
exports.elementAt = elementAt;
//# sourceMappingURL=elementAt.js.map

/***/ }),

/***/ "XPuz":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/empty.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.empty = rxjs_1.empty;
//# sourceMappingURL=empty.js.map

/***/ }),

/***/ "Xh4i":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/window.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Branch out the source Observable values as a nested Observable whenever
 * `windowBoundaries` emits.
 *
 * <span class="informal">It's like {@link buffer}, but emits a nested Observable
 * instead of an array.</span>
 *
 * <img src="./img/window.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits connected, non-overlapping
 * windows. It emits the current window and opens a new one whenever the
 * Observable `windowBoundaries` emits an item. Because each window is an
 * Observable, the output is a higher-order Observable.
 *
 * @example <caption>In every window of 1 second each, emit at most 2 click events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var interval = Rx.Observable.interval(1000);
 * var result = clicks.window(interval)
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {@link windowCount}
 * @see {@link windowTime}
 * @see {@link windowToggle}
 * @see {@link windowWhen}
 * @see {@link buffer}
 *
 * @param {Observable<any>} windowBoundaries An Observable that completes the
 * previous window and starts a new window.
 * @return {Observable<Observable<T>>} An Observable of windows, which are
 * Observables emitting values of the source Observable.
 * @method window
 * @owner Observable
 */
function window(windowBoundaries) {
    return operators_1.window(windowBoundaries)(this);
}
exports.window = window;
//# sourceMappingURL=window.js.map

/***/ }),

/***/ "Xj2z":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/fromEvent.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.fromEvent = rxjs_1.fromEvent;
//# sourceMappingURL=fromEvent.js.map

/***/ }),

/***/ "Xk39":
/*!****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/catch.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
 *
 * <img src="./img/catch.png" width="100%">
 *
 * @example <caption>Continues with a different Observable when there's an error</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 * 	   if (n == 4) {
 * 	     throw 'four!';
 *     }
 *	   return n;
 *   })
 *   .catch(err => Observable.of('I', 'II', 'III', 'IV', 'V'))
 *   .subscribe(x => console.log(x));
 *   // 1, 2, 3, I, II, III, IV, V
 *
 * @example <caption>Retries the caught source Observable again in case of error, similar to retry() operator</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 * 	   if (n === 4) {
 * 	     throw 'four!';
 *     }
 * 	   return n;
 *   })
 *   .catch((err, caught) => caught)
 *   .take(30)
 *   .subscribe(x => console.log(x));
 *   // 1, 2, 3, 1, 2, 3, ...
 *
 * @example <caption>Throws a new error when the source Observable throws an error</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 *     if (n == 4) {
 *       throw 'four!';
 *     }
 *     return n;
 *   })
 *   .catch(err => {
 *     throw 'error in source. Details: ' + err;
 *   })
 *   .subscribe(
 *     x => console.log(x),
 *     err => console.log(err)
 *   );
 *   // 1, 2, 3, error in source. Details: four!
 *
 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
 *  is returned by the `selector` will be used to continue the observable chain.
 * @return {Observable} An observable that originates from either the source or the observable returned by the
 *  catch `selector` function.
 * @method catch
 * @name catch
 * @owner Observable
 */
function _catch(selector) {
    return operators_1.catchError(selector)(this);
}
exports._catch = _catch;
//# sourceMappingURL=catch.js.map

/***/ }),

/***/ "Xs6s":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/finally.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var finally_1 = __webpack_require__(/*! ../../operator/finally */ "M6P7");
rxjs_1.Observable.prototype.finally = finally_1._finally;
rxjs_1.Observable.prototype._finally = finally_1._finally;
//# sourceMappingURL=finally.js.map

/***/ }),

/***/ "Y7AG":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/partition.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Splits the source Observable into two, one with values that satisfy a
 * predicate, and another with values that don't satisfy the predicate.
 *
 * <span class="informal">It's like {@link filter}, but returns two Observables:
 * one like the output of {@link filter}, and the other with values that did not
 * pass the condition.</span>
 *
 * <img src="./img/partition.png" width="100%">
 *
 * `partition` outputs an array with two Observables that partition the values
 * from the source Observable through the given `predicate` function. The first
 * Observable in that array emits source values for which the predicate argument
 * returns true. The second Observable emits source values for which the
 * predicate returns false. The first behaves like {@link filter} and the second
 * behaves like {@link filter} with the predicate negated.
 *
 * @example <caption>Partition click events into those on DIV elements and those elsewhere</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var parts = clicks.partition(ev => ev.target.tagName === 'DIV');
 * var clicksOnDivs = parts[0];
 * var clicksElsewhere = parts[1];
 * clicksOnDivs.subscribe(x => console.log('DIV clicked: ', x));
 * clicksElsewhere.subscribe(x => console.log('Other clicked: ', x));
 *
 * @see {@link filter}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted on the first Observable in the returned array, if
 * `false` the value is emitted on the second Observable in the array. The
 * `index` parameter is the number `i` for the i-th source emission that has
 * happened since the subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {[Observable<T>, Observable<T>]} An array with two Observables: one
 * with values that passed the predicate, and another with values that did not
 * pass the predicate.
 * @method partition
 * @owner Observable
 */
function partition(predicate, thisArg) {
    return operators_1.partition(predicate, thisArg)(this);
}
exports.partition = partition;
//# sourceMappingURL=partition.js.map

/***/ }),

/***/ "YA+d":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/bufferWhen.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var bufferWhen_1 = __webpack_require__(/*! ../../operator/bufferWhen */ "cYpg");
rxjs_1.Observable.prototype.bufferWhen = bufferWhen_1.bufferWhen;
//# sourceMappingURL=bufferWhen.js.map

/***/ }),

/***/ "YiA4":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/windowWhen.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Branch out the source Observable values as a nested Observable using a
 * factory function of closing Observables to determine when to start a new
 * window.
 *
 * <span class="informal">It's like {@link bufferWhen}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowWhen.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits connected, non-overlapping windows.
 * It emits the current window and opens a new one whenever the Observable
 * produced by the specified `closingSelector` function emits an item. The first
 * window is opened immediately when subscribing to the output Observable.
 *
 * @example <caption>Emit only the first two clicks events in every window of [1-5] random seconds</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks
 *   .windowWhen(() => Rx.Observable.interval(1000 + Math.random() * 4000))
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {@link window}
 * @see {@link windowCount}
 * @see {@link windowTime}
 * @see {@link windowToggle}
 * @see {@link bufferWhen}
 *
 * @param {function(): Observable} closingSelector A function that takes no
 * arguments and returns an Observable that signals (on either `next` or
 * `complete`) when to close the previous window and start a new one.
 * @return {Observable<Observable<T>>} An observable of windows, which in turn
 * are Observables.
 * @method windowWhen
 * @owner Observable
 */
function windowWhen(closingSelector) {
    return operators_1.windowWhen(closingSelector)(this);
}
exports.windowWhen = windowWhen;
//# sourceMappingURL=windowWhen.js.map

/***/ }),

/***/ "YwoP":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/first.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var first_1 = __webpack_require__(/*! ../../operator/first */ "RFoL");
rxjs_1.Observable.prototype.first = first_1.first;
//# sourceMappingURL=first.js.map

/***/ }),

/***/ "ZHaO":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/multicast.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Allows source Observable to be subscribed only once with a Subject of choice,
 * while still sharing its values between multiple subscribers.
 *
 * <span class="informal">Subscribe to Observable once, but send its values to multiple subscribers.</span>
 *
 * <img src="./img/multicast.png" width="100%">
 *
 * `multicast` is an operator that works in two modes.
 *
 * In the first mode you provide a single argument to it, which can be either an initialized Subject or a Subject
 * factory. As a result you will get a special kind of an Observable - a {@link ConnectableObservable}. It can be
 * subscribed multiple times, just as regular Observable, but it won't subscribe to the source Observable at that
 * moment. It will do it only if you call its `connect` method. This means you can essentially control by hand, when
 * source Observable will be actually subscribed. What is more, ConnectableObservable will share this one subscription
 * between all of its subscribers. This means that, for example, `ajax` Observable will only send a request once,
 * even though usually it would send a request per every subscriber. Since it sends a request at the moment of
 * subscription, here request would be sent when the `connect` method of a ConnectableObservable is called.
 *
 * The most common pattern of using ConnectableObservable is calling `connect` when the first consumer subscribes,
 * keeping the subscription alive while several consumers come and go and finally unsubscribing from the source
 * Observable, when the last consumer unsubscribes. To not implement that logic over and over again,
 * ConnectableObservable has a special operator, `refCount`. When called, it returns an Observable, which will count
 * the number of consumers subscribed to it and keep ConnectableObservable connected as long as there is at least
 * one consumer. So if you don't actually need to decide yourself when to connect and disconnect a
 * ConnectableObservable, use `refCount`.
 *
 * The second mode is invoked by calling `multicast` with an additional, second argument - selector function.
 * This function accepts an Observable - which basically mirrors the source Observable - and returns Observable
 * as well, which should be the input stream modified by any operators you want. Note that in this
 * mode you cannot provide initialized Subject as a first argument - it has to be a Subject factory. If
 * you provide selector function, `multicast` returns just a regular Observable, instead of ConnectableObservable.
 * Thus, as usual, each subscription to this stream triggers subscription to the source Observable. However,
 * if inside the selector function you subscribe to the input Observable multiple times, actual source stream
 * will be subscribed only once. So if you have a chain of operators that use some Observable many times,
 * but you want to subscribe to that Observable only once, this is the mode you would use.
 *
 * Subject provided as a first parameter of `multicast` is used as a proxy for the single subscription to the
 * source Observable. It means that all values from the source stream go through that Subject. Thus, if a Subject
 * has some special properties, Observable returned by `multicast` will have them as well. If you want to use
 * `multicast` with a Subject that is one of the ones included in RxJS by default - {@link Subject},
 * {@link AsyncSubject}, {@link BehaviorSubject}, or {@link ReplaySubject} - simply use {@link publish},
 * {@link publishLast}, {@link publishBehavior} or {@link publishReplay} respectively. These are actually
 * just wrappers around `multicast`, with a specific Subject hardcoded inside.
 *
 * Also, if you use {@link publish} or {@link publishReplay} with a ConnectableObservables `refCount` operator,
 * you can simply use {@link share} and {@link shareReplay} respectively, which chain these two.
 *
 * @example <caption>Use ConnectableObservable</caption>
 * const seconds = Rx.Observable.interval(1000);
 * const connectableSeconds = seconds.multicast(new Subject());
 *
 * connectableSeconds.subscribe(value => console.log('first: ' + value));
 * connectableSeconds.subscribe(value => console.log('second: ' + value));
 *
 * // At this point still nothing happens, even though we subscribed twice.
 *
 * connectableSeconds.connect();
 *
 * // From now on `seconds` are being logged to the console,
 * // twice per every second. `seconds` Observable was however only subscribed once,
 * // so under the hood Observable.interval had only one clock started.
 *
 * @example <caption>Use selector</caption>
 * const seconds = Rx.Observable.interval(1000);
 *
 * seconds
 *     .multicast(
 *         () => new Subject(),
 *         seconds => seconds.zip(seconds) // Usually zip would subscribe to `seconds` twice.
 *                                         // Because we are inside selector, `seconds` is subscribed once,
 *     )                                   // thus starting only one clock used internally by Observable.interval.
 *     .subscribe();
 *
 * @see {@link publish}
 * @see {@link publishLast}
 * @see {@link publishBehavior}
 * @see {@link publishReplay}
 * @see {@link share}
 * @see {@link shareReplay}
 *
 * @param {Function|Subject} subjectOrSubjectFactory - Factory function to create an intermediate Subject through
 * which the source sequence's elements will be multicast to the selector function input Observable or
 * ConnectableObservable returned by the operator.
 * @param {Function} [selector] - Optional selector function that can use the input stream
 * as many times as needed, without causing multiple subscriptions to the source stream.
 * Subscribers to the input source will receive all notifications of the source from the
 * time of the subscription forward.
 * @return {Observable<T>|ConnectableObservable<T>} An Observable that emits the results of invoking the selector
 * on the source stream or a special {@link ConnectableObservable}, if selector was not provided.
 *
 * @method multicast
 * @owner Observable
 */
function multicast(subjectOrSubjectFactory, selector) {
    return operators_1.multicast(subjectOrSubjectFactory, selector)(this);
}
exports.multicast = multicast;
//# sourceMappingURL=multicast.js.map

/***/ }),

/***/ "ZHpM":
/*!***************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/take.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Emits only the first `count` values emitted by the source Observable.
 *
 * <span class="informal">Takes the first `count` values from the source, then
 * completes.</span>
 *
 * <img src="./img/take.png" width="100%">
 *
 * `take` returns an Observable that emits only the first `count` values emitted
 * by the source Observable. If the source emits fewer than `count` values then
 * all of its values are emitted. After that, it completes, regardless if the
 * source completes.
 *
 * @example <caption>Take the first 5 seconds of an infinite 1-second interval Observable</caption>
 * var interval = Rx.Observable.interval(1000);
 * var five = interval.take(5);
 * five.subscribe(x => console.log(x));
 *
 * @see {@link takeLast}
 * @see {@link takeUntil}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 *
 * @param {number} count The maximum number of `next` values to emit.
 * @return {Observable<T>} An Observable that emits only the first `count`
 * values emitted by the source Observable, or all of the values from the source
 * if the source emits fewer than `count` values.
 * @method take
 * @owner Observable
 */
function take(count) {
    return operators_1.take(count)(this);
}
exports.take = take;
//# sourceMappingURL=take.js.map

/***/ }),

/***/ "ZR4w":
/*!**************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/map.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map(project, thisArg) {
    return operators_1.map(project, thisArg)(this);
}
exports.map = map;
//# sourceMappingURL=map.js.map

/***/ }),

/***/ "Zw/6":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/bufferToggle.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var bufferToggle_1 = __webpack_require__(/*! ../../operator/bufferToggle */ "BSEn");
rxjs_1.Observable.prototype.bufferToggle = bufferToggle_1.bufferToggle;
//# sourceMappingURL=bufferToggle.js.map

/***/ }),

/***/ "aMoL":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/publish.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var publish_1 = __webpack_require__(/*! ../../operator/publish */ "jtHT");
rxjs_1.Observable.prototype.publish = publish_1.publish;
//# sourceMappingURL=publish.js.map

/***/ }),

/***/ "aP66":
/*!******************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/timeout.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 *
 * Errors if Observable does not emit a value in given time span.
 *
 * <span class="informal">Timeouts on Observable that doesn't emit values fast enough.</span>
 *
 * <img src="./img/timeout.png" width="100%">
 *
 * `timeout` operator accepts as an argument either a number or a Date.
 *
 * If number was provided, it returns an Observable that behaves like a source
 * Observable, unless there is a period of time where there is no value emitted.
 * So if you provide `100` as argument and first value comes after 50ms from
 * the moment of subscription, this value will be simply re-emitted by the resulting
 * Observable. If however after that 100ms passes without a second value being emitted,
 * stream will end with an error and source Observable will be unsubscribed.
 * These checks are performed throughout whole lifecycle of Observable - from the moment
 * it was subscribed to, until it completes or errors itself. Thus every value must be
 * emitted within specified period since previous value.
 *
 * If provided argument was Date, returned Observable behaves differently. It throws
 * if Observable did not complete before provided Date. This means that periods between
 * emission of particular values do not matter in this case. If Observable did not complete
 * before provided Date, source Observable will be unsubscribed. Other than that, resulting
 * stream behaves just as source Observable.
 *
 * `timeout` accepts also a Scheduler as a second parameter. It is used to schedule moment (or moments)
 * when returned Observable will check if source stream emitted value or completed.
 *
 * @example <caption>Check if ticks are emitted within certain timespan</caption>
 * const seconds = Rx.Observable.interval(1000);
 *
 * seconds.timeout(1100) // Let's use bigger timespan to be safe,
 *                       // since `interval` might fire a bit later then scheduled.
 * .subscribe(
 *     value => console.log(value), // Will emit numbers just as regular `interval` would.
 *     err => console.log(err) // Will never be called.
 * );
 *
 * seconds.timeout(900).subscribe(
 *     value => console.log(value), // Will never be called.
 *     err => console.log(err) // Will emit error before even first value is emitted,
 *                             // since it did not arrive within 900ms period.
 * );
 *
 * @example <caption>Use Date to check if Observable completed</caption>
 * const seconds = Rx.Observable.interval(1000);
 *
 * seconds.timeout(new Date("December 17, 2020 03:24:00"))
 * .subscribe(
 *     value => console.log(value), // Will emit values as regular `interval` would
 *                                  // until December 17, 2020 at 03:24:00.
 *     err => console.log(err) // On December 17, 2020 at 03:24:00 it will emit an error,
 *                             // since Observable did not complete by then.
 * );
 *
 * @see {@link timeoutWith}
 *
 * @param {number|Date} due Number specifying period within which Observable must emit values
 *                          or Date specifying before when Observable should complete
 * @param {Scheduler} [scheduler] Scheduler controlling when timeout checks occur.
 * @return {Observable<T>} Observable that mirrors behaviour of source, unless timeout checks fail.
 * @method timeout
 * @owner Observable
 */
function timeout(due, scheduler) {
    if (scheduler === void 0) { scheduler = rxjs_1.asyncScheduler; }
    return operators_1.timeout(due, scheduler)(this);
}
exports.timeout = timeout;
//# sourceMappingURL=timeout.js.map

/***/ }),

/***/ "atJV":
/*!***************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/last.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits only the last item emitted by the source Observable.
 * It optionally takes a predicate function as a parameter, in which case, rather than emitting
 * the last item from the source Observable, the resulting Observable will emit the last item
 * from the source Observable that satisfies the predicate.
 *
 * <img src="./img/last.png" width="100%">
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 * @param {function} [predicate] - The condition any source emitted item has to satisfy.
 * @param {any} [defaultValue] - The default value to use if the predicate isn't
 * satisfied, or no values were emitted (if no predicate).
 * @return {Observable} An Observable that emits only the last item satisfying the given condition
 * from the source, or an NoSuchElementException if no such items are emitted.
 * @throws - Throws if no items that match the predicate are emitted by the source Observable.
 * @method last
 * @owner Observable
 */
function last() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return operators_1.last.apply(void 0, args)(this);
}
exports.last = last;
//# sourceMappingURL=last.js.map

/***/ }),

/***/ "b/PJ":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/skipUntil.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.
 *
 * <img src="./img/skipUntil.png" width="100%">
 *
 * @param {Observable} notifier - The second Observable that has to emit an item before the source Observable's elements begin to
 * be mirrored by the resulting Observable.
 * @return {Observable<T>} An Observable that skips items from the source Observable until the second Observable emits
 * an item, then emits the remaining items.
 * @method skipUntil
 * @owner Observable
 */
function skipUntil(notifier) {
    return operators_1.skipUntil(notifier)(this);
}
exports.skipUntil = skipUntil;
//# sourceMappingURL=skipUntil.js.map

/***/ }),

/***/ "bHhB":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/windowToggle.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var windowToggle_1 = __webpack_require__(/*! ../../operator/windowToggle */ "n6Nf");
rxjs_1.Observable.prototype.windowToggle = windowToggle_1.windowToggle;
//# sourceMappingURL=windowToggle.js.map

/***/ }),

/***/ "bKLx":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/timeInterval.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * @param scheduler
 * @return {Observable<TimeInterval<any>>|WebSocketSubject<T>|Observable<T>}
 * @method timeInterval
 * @owner Observable
 */
function timeInterval(scheduler) {
    if (scheduler === void 0) { scheduler = rxjs_1.asyncScheduler; }
    return operators_1.timeInterval(scheduler)(this);
}
exports.timeInterval = timeInterval;
//# sourceMappingURL=timeInterval.js.map

/***/ }),

/***/ "bUWp":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/race.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var race_1 = __webpack_require__(/*! ../../operator/race */ "Myac");
rxjs_1.Observable.prototype.race = race_1.race;
//# sourceMappingURL=race.js.map

/***/ }),

/***/ "bb3/":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/timestamp.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * @param scheduler
 * @return {Observable<Timestamp<any>>|WebSocketSubject<T>|Observable<T>}
 * @method timestamp
 * @owner Observable
 */
function timestamp(scheduler) {
    if (scheduler === void 0) { scheduler = rxjs_1.asyncScheduler; }
    return operators_1.timestamp(scheduler)(this);
}
exports.timestamp = timestamp;
//# sourceMappingURL=timestamp.js.map

/***/ }),

/***/ "bcPL":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/onErrorResumeNext.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * When any of the provided Observable emits an complete or error notification, it immediately subscribes to the next one
 * that was passed.
 *
 * <span class="informal">Execute series of Observables no matter what, even if it means swallowing errors.</span>
 *
 * <img src="./img/onErrorResumeNext.png" width="100%">
 *
 * `onErrorResumeNext` is an operator that accepts a series of Observables, provided either directly as
 * arguments or as an array. If no single Observable is provided, returned Observable will simply behave the same
 * as the source.
 *
 * `onErrorResumeNext` returns an Observable that starts by subscribing and re-emitting values from the source Observable.
 * When its stream of values ends - no matter if Observable completed or emitted an error - `onErrorResumeNext`
 * will subscribe to the first Observable that was passed as an argument to the method. It will start re-emitting
 * its values as well and - again - when that stream ends, `onErrorResumeNext` will proceed to subscribing yet another
 * Observable in provided series, no matter if previous Observable completed or ended with an error. This will
 * be happening until there is no more Observables left in the series, at which point returned Observable will
 * complete - even if the last subscribed stream ended with an error.
 *
 * `onErrorResumeNext` can be therefore thought of as version of {@link concat} operator, which is more permissive
 * when it comes to the errors emitted by its input Observables. While `concat` subscribes to the next Observable
 * in series only if previous one successfully completed, `onErrorResumeNext` subscribes even if it ended with
 * an error.
 *
 * Note that you do not get any access to errors emitted by the Observables. In particular do not
 * expect these errors to appear in error callback passed to {@link subscribe}. If you want to take
 * specific actions based on what error was emitted by an Observable, you should try out {@link catch} instead.
 *
 *
 * @example <caption>Subscribe to the next Observable after map fails</caption>
 * Rx.Observable.of(1, 2, 3, 0)
 *   .map(x => {
 *       if (x === 0) { throw Error(); }
         return 10 / x;
 *   })
 *   .onErrorResumeNext(Rx.Observable.of(1, 2, 3))
 *   .subscribe(
 *     val => console.log(val),
 *     err => console.log(err),          // Will never be called.
 *     () => console.log('that\'s it!')
 *   );
 *
 * // Logs:
 * // 10
 * // 5
 * // 3.3333333333333335
 * // 1
 * // 2
 * // 3
 * // "that's it!"
 *
 * @see {@link concat}
 * @see {@link catch}
 *
 * @param {...ObservableInput} observables Observables passed either directly or as an array.
 * @return {Observable} An Observable that emits values from source Observable, but - if it errors - subscribes
 * to the next passed Observable and so on, until it completes or runs out of Observables.
 * @method onErrorResumeNext
 * @owner Observable
 */
function onErrorResumeNext() {
    var nextSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nextSources[_i] = arguments[_i];
    }
    return operators_1.onErrorResumeNext.apply(void 0, nextSources)(this);
}
exports.onErrorResumeNext = onErrorResumeNext;
//# sourceMappingURL=onErrorResumeNext.js.map

/***/ }),

/***/ "bd5T":
/*!****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/delay.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Delays the emission of items from the source Observable by a given timeout or
 * until a given Date.
 *
 * <span class="informal">Time shifts each item by some specified amount of
 * milliseconds.</span>
 *
 * <img src="./img/delay.png" width="100%">
 *
 * If the delay argument is a Number, this operator time shifts the source
 * Observable by that amount of time expressed in milliseconds. The relative
 * time intervals between the values are preserved.
 *
 * If the delay argument is a Date, this operator time shifts the start of the
 * Observable execution until the given date occurs.
 *
 * @example <caption>Delay each click by one second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var delayedClicks = clicks.delay(1000); // each click emitted after 1 second
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @example <caption>Delay all clicks until a future date happens</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var date = new Date('March 15, 2050 12:00:00'); // in the future
 * var delayedClicks = clicks.delay(date); // click emitted only after that date
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @see {@link debounceTime}
 * @see {@link delayWhen}
 *
 * @param {number|Date} delay The delay duration in milliseconds (a `number`) or
 * a `Date` until which the emission of the source items is delayed.
 * @param {Scheduler} [scheduler=asyncScheduler] The SchedulerLike to use for
 * managing the timers that handle the time-shift for each item.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified timeout or Date.
 * @method delay
 * @owner Observable
 */
function delay(delay, scheduler) {
    if (scheduler === void 0) { scheduler = rxjs_1.asyncScheduler; }
    return operators_1.delay(delay, scheduler)(this);
}
exports.delay = delay;
//# sourceMappingURL=delay.js.map

/***/ }),

/***/ "bi34":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/dom/ajax.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var ajax_1 = __webpack_require__(/*! rxjs/ajax */ "roV9");
rxjs_1.Observable.ajax = ajax_1.ajax;
//# sourceMappingURL=ajax.js.map

/***/ }),

/***/ "cD4w":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/timer.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.timer = rxjs_1.timer;
//# sourceMappingURL=timer.js.map

/***/ }),

/***/ "cLIC":
/*!****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/every.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
 *
 * @example <caption>A simple example emitting true if all elements are less than 5, false otherwise</caption>
 *  Observable.of(1, 2, 3, 4, 5, 6)
 *     .every(x => x < 5)
 *     .subscribe(x => console.log(x)); // -> false
 *
 * @param {function} predicate A function for determining if an item meets a specified condition.
 * @param {any} [thisArg] Optional object to use for `this` in the callback.
 * @return {Observable} An Observable of booleans that determines if all items of the source Observable meet the condition specified.
 * @method every
 * @owner Observable
 */
function every(predicate, thisArg) {
    return operators_1.every(predicate, thisArg)(this);
}
exports.every = every;
//# sourceMappingURL=every.js.map

/***/ }),

/***/ "cPnI":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/merge.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var merge_1 = __webpack_require__(/*! ../../operator/merge */ "02G1");
rxjs_1.Observable.prototype.merge = merge_1.merge;
//# sourceMappingURL=merge.js.map

/***/ }),

/***/ "cYpg":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/bufferWhen.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Buffers the source Observable values, using a factory function of closing
 * Observables to determine when to close, emit, and reset the buffer.
 *
 * <span class="informal">Collects values from the past as an array. When it
 * starts collecting values, it calls a function that returns an Observable that
 * tells when to close the buffer and restart collecting.</span>
 *
 * <img src="./img/bufferWhen.png" width="100%">
 *
 * Opens a buffer immediately, then closes the buffer when the observable
 * returned by calling `closingSelector` function emits a value. When it closes
 * the buffer, it immediately opens a new buffer and repeats the process.
 *
 * @example <caption>Emit an array of the last clicks every [1-5] random seconds</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferWhen(() =>
 *   Rx.Observable.interval(1000 + Math.random() * 4000)
 * );
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferCount}
 * @see {@link bufferTime}
 * @see {@link bufferToggle}
 * @see {@link windowWhen}
 *
 * @param {function(): Observable} closingSelector A function that takes no
 * arguments and returns an Observable that signals buffer closure.
 * @return {Observable<T[]>} An observable of arrays of buffered values.
 * @method bufferWhen
 * @owner Observable
 */
function bufferWhen(closingSelector) {
    return operators_1.bufferWhen(closingSelector)(this);
}
exports.bufferWhen = bufferWhen;
//# sourceMappingURL=bufferWhen.js.map

/***/ }),

/***/ "caIW":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/concatAll.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Converts a higher-order Observable into a first-order Observable by
 * concatenating the inner Observables in order.
 *
 * <span class="informal">Flattens an Observable-of-Observables by putting one
 * inner Observable after the other.</span>
 *
 * <img src="./img/concatAll.png" width="100%">
 *
 * Joins every Observable emitted by the source (a higher-order Observable), in
 * a serial fashion. It subscribes to each inner Observable only after the
 * previous inner Observable has completed, and merges all of their values into
 * the returned observable.
 *
 * __Warning:__ If the source Observable emits Observables quickly and
 * endlessly, and the inner Observables it emits generally complete slower than
 * the source emits, you can run into memory issues as the incoming Observables
 * collect in an unbounded buffer.
 *
 * Note: `concatAll` is equivalent to `mergeAll` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map(ev => Rx.Observable.interval(1000).take(4));
 * var firstOrder = higherOrder.concatAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link combineAll}
 * @see {@link concat}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 * @see {@link exhaust}
 * @see {@link mergeAll}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @return {Observable} An Observable emitting values from all the inner
 * Observables concatenated.
 * @method concatAll
 * @owner Observable
 */
function concatAll() {
    return operators_1.concatAll()(this);
}
exports.concatAll = concatAll;
//# sourceMappingURL=concatAll.js.map

/***/ }),

/***/ "cf52":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/withLatestFrom.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var withLatestFrom_1 = __webpack_require__(/*! ../../operator/withLatestFrom */ "QsQ4");
rxjs_1.Observable.prototype.withLatestFrom = withLatestFrom_1.withLatestFrom;
//# sourceMappingURL=withLatestFrom.js.map

/***/ }),

/***/ "ciat":
/*!****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/audit.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Ignores source values for a duration determined by another Observable, then
 * emits the most recent value from the source Observable, then repeats this
 * process.
 *
 * <span class="informal">It's like {@link auditTime}, but the silencing
 * duration is determined by a second Observable.</span>
 *
 * <img src="./img/audit.png" width="100%">
 *
 * `audit` is similar to `throttle`, but emits the last value from the silenced
 * time window, instead of the first value. `audit` emits the most recent value
 * from the source Observable on the output Observable as soon as its internal
 * timer becomes disabled, and ignores source values while the timer is enabled.
 * Initially, the timer is disabled. As soon as the first source value arrives,
 * the timer is enabled by calling the `durationSelector` function with the
 * source value, which returns the "duration" Observable. When the duration
 * Observable emits a value or completes, the timer is disabled, then the most
 * recent source value is emitted on the output Observable, and this process
 * repeats for the next source value.
 *
 * @example <caption>Emit clicks at a rate of at most one click per second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.audit(ev => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link auditTime}
 * @see {@link debounce}
 * @see {@link delayWhen}
 * @see {@link sample}
 * @see {@link throttle}
 *
 * @param {function(value: T): SubscribableOrPromise} durationSelector A function
 * that receives a value from the source Observable, for computing the silencing
 * duration, returned as an Observable or a Promise.
 * @return {Observable<T>} An Observable that performs rate-limiting of
 * emissions from the source Observable.
 * @method audit
 * @owner Observable
 */
function audit(durationSelector) {
    return operators_1.audit(durationSelector)(this);
}
exports.audit = audit;
//# sourceMappingURL=audit.js.map

/***/ }),

/***/ "czqU":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/using.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.using = rxjs_1.using;
//# sourceMappingURL=using.js.map

/***/ }),

/***/ "dL1u":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/buffer.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Buffers the source Observable values until `closingNotifier` emits.
 *
 * <span class="informal">Collects values from the past as an array, and emits
 * that array only when another Observable emits.</span>
 *
 * <img src="./img/buffer.png" width="100%">
 *
 * Buffers the incoming Observable values until the given `closingNotifier`
 * Observable emits a value, at which point it emits the buffer on the output
 * Observable and starts a new buffer internally, awaiting the next time
 * `closingNotifier` emits.
 *
 * @example <caption>On every click, emit array of most recent interval events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var interval = Rx.Observable.interval(1000);
 * var buffered = interval.buffer(clicks);
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link bufferCount}
 * @see {@link bufferTime}
 * @see {@link bufferToggle}
 * @see {@link bufferWhen}
 * @see {@link window}
 *
 * @param {Observable<any>} closingNotifier An Observable that signals the
 * buffer to be emitted on the output Observable.
 * @return {Observable<T[]>} An Observable of buffers, which are arrays of
 * values.
 * @method buffer
 * @owner Observable
 */
function buffer(closingNotifier) {
    return operators_1.buffer(closingNotifier)(this);
}
exports.buffer = buffer;
//# sourceMappingURL=buffer.js.map

/***/ }),

/***/ "dlYL":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/audit.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var audit_1 = __webpack_require__(/*! ../../operator/audit */ "ciat");
rxjs_1.Observable.prototype.audit = audit_1.audit;
//# sourceMappingURL=audit.js.map

/***/ }),

/***/ "eUyF":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/concatMapTo.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Projects each source value to the same Observable which is merged multiple
 * times in a serialized fashion on the output Observable.
 *
 * <span class="informal">It's like {@link concatMap}, but maps each value
 * always to the same inner Observable.</span>
 *
 * <img src="./img/concatMapTo.png" width="100%">
 *
 * Maps each source value to the given Observable `innerObservable` regardless
 * of the source value, and then flattens those resulting Observables into one
 * single Observable, which is the output Observable. Each new `innerObservable`
 * instance emitted on the output Observable is concatenated with the previous
 * `innerObservable` instance.
 *
 * __Warning:__ if source values arrive endlessly and faster than their
 * corresponding inner Observables can complete, it will result in memory issues
 * as inner Observables amass in an unbounded buffer waiting for their turn to
 * be subscribed to.
 *
 * Note: `concatMapTo` is equivalent to `mergeMapTo` with concurrency parameter
 * set to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.concatMapTo(Rx.Observable.interval(1000).take(4));
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link concat}
 * @see {@link concatAll}
 * @see {@link concatMap}
 * @see {@link mergeMapTo}
 * @see {@link switchMapTo}
 *
 * @param {ObservableInput} innerObservable An Observable to replace each value from
 * the source Observable.
 * @return {Observable} An observable of values merged together by joining the
 * passed observable with itself, one after the other, for each value emitted
 * from the source.
 * @method concatMapTo
 * @owner Observable
 */
function concatMapTo(innerObservable) {
    return operators_1.concatMapTo(innerObservable)(this);
}
exports.concatMapTo = concatMapTo;
//# sourceMappingURL=concatMapTo.js.map

/***/ }),

/***/ "eYtX":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/retryWhen.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var retryWhen_1 = __webpack_require__(/*! ../../operator/retryWhen */ "NEMR");
rxjs_1.Observable.prototype.retryWhen = retryWhen_1.retryWhen;
//# sourceMappingURL=retryWhen.js.map

/***/ }),

/***/ "elu/":
/*!***************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/scan.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Applies an accumulator function over the source Observable, and returns each
 * intermediate result, with an optional seed value.
 *
 * <span class="informal">It's like {@link reduce}, but emits the current
 * accumulation whenever the source emits a value.</span>
 *
 * <img src="./img/scan.png" width="100%">
 *
 * Combines together all values emitted on the source, using an accumulator
 * function that knows how to join a new source value into the accumulation from
 * the past. Is similar to {@link reduce}, but emits the intermediate
 * accumulations.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * @example <caption>Count the number of click events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var ones = clicks.mapTo(1);
 * var seed = 0;
 * var count = ones.scan((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {@link expand}
 * @see {@link mergeScan}
 * @see {@link reduce}
 *
 * @param {function(acc: R, value: T, index: number): R} accumulator
 * The accumulator function called on each source value.
 * @param {T|R} [seed] The initial accumulation value.
 * @return {Observable<R>} An observable of the accumulated values.
 * @method scan
 * @owner Observable
 */
function scan(accumulator, seed) {
    if (arguments.length >= 2) {
        return operators_1.scan(accumulator, seed)(this);
    }
    return operators_1.scan(accumulator)(this);
}
exports.scan = scan;
//# sourceMappingURL=scan.js.map

/***/ }),

/***/ "eyjB":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/mergeScan.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var mergeScan_1 = __webpack_require__(/*! ../../operator/mergeScan */ "mQn8");
rxjs_1.Observable.prototype.mergeScan = mergeScan_1.mergeScan;
//# sourceMappingURL=mergeScan.js.map

/***/ }),

/***/ "fElF":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/timeout.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var timeout_1 = __webpack_require__(/*! ../../operator/timeout */ "aP66");
rxjs_1.Observable.prototype.timeout = timeout_1.timeout;
//# sourceMappingURL=timeout.js.map

/***/ }),

/***/ "fUwU":
/*!***************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/skip.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Returns an Observable that skips the first `count` items emitted by the source Observable.
 *
 * <img src="./img/skip.png" width="100%">
 *
 * @param {Number} count - The number of times, items emitted by source Observable should be skipped.
 * @return {Observable} An Observable that skips values emitted by the source Observable.
 *
 * @method skip
 * @owner Observable
 */
function skip(count) {
    return operators_1.skip(count)(this);
}
exports.skip = skip;
//# sourceMappingURL=skip.js.map

/***/ }),

/***/ "fY5S":
/*!**************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/zip.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
/* tslint:enable:max-line-length */
/**
 * @param observables
 * @return {Observable<R>}
 * @method zip
 * @owner Observable
 */
function zipProto() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    return this.lift.call(rxjs_1.zip.apply(void 0, [this].concat(observables)));
}
exports.zipProto = zipProto;
//# sourceMappingURL=zip.js.map

/***/ }),

/***/ "fnh7":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/from.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.from = rxjs_1.from;
//# sourceMappingURL=from.js.map

/***/ }),

/***/ "g0lY":
/*!******************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/min.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var min_1 = __webpack_require__(/*! ../../operator/min */ "SjmF");
rxjs_1.Observable.prototype.min = min_1.min;
//# sourceMappingURL=min.js.map

/***/ }),

/***/ "gSmF":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/startWith.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var startWith_1 = __webpack_require__(/*! ../../operator/startWith */ "LM6Q");
rxjs_1.Observable.prototype.startWith = startWith_1.startWith;
//# sourceMappingURL=startWith.js.map

/***/ }),

/***/ "gzwt":
/*!****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/count.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Counts the number of emissions on the source and emits that number when the
 * source completes.
 *
 * <span class="informal">Tells how many values were emitted, when the source
 * completes.</span>
 *
 * <img src="./img/count.png" width="100%">
 *
 * `count` transforms an Observable that emits values into an Observable that
 * emits a single value that represents the number of values emitted by the
 * source Observable. If the source Observable terminates with an error, `count`
 * will pass this error notification along without emitting a value first. If
 * the source Observable does not terminate at all, `count` will neither emit
 * a value nor terminate. This operator takes an optional `predicate` function
 * as argument, in which case the output emission will represent the number of
 * source values that matched `true` with the `predicate`.
 *
 * @example <caption>Counts how many seconds have passed before the first click happened</caption>
 * var seconds = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var secondsBeforeClick = seconds.takeUntil(clicks);
 * var result = secondsBeforeClick.count();
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Counts how many odd numbers are there between 1 and 7</caption>
 * var numbers = Rx.Observable.range(1, 7);
 * var result = numbers.count(i => i % 2 === 1);
 * result.subscribe(x => console.log(x));
 *
 * // Results in:
 * // 4
 *
 * @see {@link max}
 * @see {@link min}
 * @see {@link reduce}
 *
 * @param {function(value: T, i: number, source: Observable<T>): boolean} [predicate] A
 * boolean function to select what values are to be counted. It is provided with
 * arguments of:
 * - `value`: the value from the source Observable.
 * - `index`: the (zero-based) "index" of the value from the source Observable.
 * - `source`: the source Observable instance itself.
 * @return {Observable} An Observable of one number that represents the count as
 * described above.
 * @method count
 * @owner Observable
 */
function count(predicate) {
    return operators_1.count(predicate)(this);
}
exports.count = count;
//# sourceMappingURL=count.js.map

/***/ }),

/***/ "hf5g":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/bufferTime.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var bufferTime_1 = __webpack_require__(/*! ../../operator/bufferTime */ "9xAK");
rxjs_1.Observable.prototype.bufferTime = bufferTime_1.bufferTime;
//# sourceMappingURL=bufferTime.js.map

/***/ }),

/***/ "hswa":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/filter.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var filter_1 = __webpack_require__(/*! ../../operator/filter */ "ADT6");
rxjs_1.Observable.prototype.filter = filter_1.filter;
//# sourceMappingURL=filter.js.map

/***/ }),

/***/ "iD44":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/mergeMap.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link mergeAll}.</span>
 *
 * <img src="./img/mergeMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger.
 *
 * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
 * var letters = Rx.Observable.of('a', 'b', 'c');
 * var result = letters.mergeMap(x =>
 *   Rx.Observable.interval(1000).map(i => x+i)
 * );
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // a0
 * // b0
 * // c0
 * // a1
 * // b1
 * // c1
 * // continues to list a,b,c with respective ascending integers
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link merge}
 * @see {@link mergeAll}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and merging the results of the Observables obtained
 * from this transformation.
 * @method mergeMap
 * @owner Observable
 */
function mergeMap(project, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return operators_1.mergeMap(project, concurrent)(this);
}
exports.mergeMap = mergeMap;
//# sourceMappingURL=mergeMap.js.map

/***/ }),

/***/ "itJ+":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/bufferCount.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Buffers the source Observable values until the size hits the maximum
 * `bufferSize` given.
 *
 * <span class="informal">Collects values from the past as an array, and emits
 * that array only when its size reaches `bufferSize`.</span>
 *
 * <img src="./img/bufferCount.png" width="100%">
 *
 * Buffers a number of values from the source Observable by `bufferSize` then
 * emits the buffer and clears it, and starts a new buffer each
 * `startBufferEvery` values. If `startBufferEvery` is not provided or is
 * `null`, then new buffers are started immediately at the start of the source
 * and when each buffer closes and is emitted.
 *
 * @example <caption>Emit the last two click events as an array</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferCount(2);
 * buffered.subscribe(x => console.log(x));
 *
 * @example <caption>On every click, emit the last two click events as an array</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferCount(2, 1);
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferTime}
 * @see {@link bufferToggle}
 * @see {@link bufferWhen}
 * @see {@link pairwise}
 * @see {@link windowCount}
 *
 * @param {number} bufferSize The maximum size of the buffer emitted.
 * @param {number} [startBufferEvery] Interval at which to start a new buffer.
 * For example if `startBufferEvery` is `2`, then a new buffer will be started
 * on every other value from the source. A new buffer is started at the
 * beginning of the source by default.
 * @return {Observable<T[]>} An Observable of arrays of buffered values.
 * @method bufferCount
 * @owner Observable
 */
function bufferCount(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) { startBufferEvery = null; }
    return operators_1.bufferCount(bufferSize, startBufferEvery)(this);
}
exports.bufferCount = bufferCount;
//# sourceMappingURL=bufferCount.js.map

/***/ }),

/***/ "j5kd":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/windowTime.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var internal_compatibility_1 = __webpack_require__(/*! rxjs/internal-compatibility */ "lRok");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
function windowTime(windowTimeSpan) {
    var scheduler = rxjs_1.asyncScheduler;
    var windowCreationInterval = null;
    var maxWindowSize = Number.POSITIVE_INFINITY;
    if (internal_compatibility_1.isScheduler(arguments[3])) {
        scheduler = arguments[3];
    }
    if (internal_compatibility_1.isScheduler(arguments[2])) {
        scheduler = arguments[2];
    }
    else if (internal_compatibility_1.isNumeric(arguments[2])) {
        maxWindowSize = arguments[2];
    }
    if (internal_compatibility_1.isScheduler(arguments[1])) {
        scheduler = arguments[1];
    }
    else if (internal_compatibility_1.isNumeric(arguments[1])) {
        windowCreationInterval = arguments[1];
    }
    return operators_1.windowTime(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler)(this);
}
exports.windowTime = windowTime;
//# sourceMappingURL=windowTime.js.map

/***/ }),

/***/ "jIeU":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/exhaust.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var exhaust_1 = __webpack_require__(/*! ../../operator/exhaust */ "5LO2");
rxjs_1.Observable.prototype.exhaust = exhaust_1.exhaust;
//# sourceMappingURL=exhaust.js.map

/***/ }),

/***/ "jdlx":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/pluck.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var pluck_1 = __webpack_require__(/*! ../../operator/pluck */ "Mw3v");
rxjs_1.Observable.prototype.pluck = pluck_1.pluck;
//# sourceMappingURL=pluck.js.map

/***/ }),

/***/ "jtHT":
/*!******************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/publish.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called
 * before it begins emitting items to those Observers that have subscribed to it.
 *
 * <img src="./img/publish.png" width="100%">
 *
 * @param {Function} [selector] - Optional selector function which can use the multicasted source sequence as many times
 * as needed, without causing multiple subscriptions to the source sequence.
 * Subscribers to the given source will receive all notifications of the source from the time of the subscription on.
 * @return A ConnectableObservable that upon connection causes the source Observable to emit items to its Observers.
 * @method publish
 * @owner Observable
 */
function publish(selector) {
    return operators_1.publish(selector)(this);
}
exports.publish = publish;
//# sourceMappingURL=publish.js.map

/***/ }),

/***/ "ksOG":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/auditTime.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var auditTime_1 = __webpack_require__(/*! ../../operator/auditTime */ "JM0U");
rxjs_1.Observable.prototype.auditTime = auditTime_1.auditTime;
//# sourceMappingURL=auditTime.js.map

/***/ }),

/***/ "l3KV":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/publishLast.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var publishLast_1 = __webpack_require__(/*! ../../operator/publishLast */ "CuWV");
rxjs_1.Observable.prototype.publishLast = publishLast_1.publishLast;
//# sourceMappingURL=publishLast.js.map

/***/ }),

/***/ "l4jP":
/*!****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/share.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
 *
 * This behaves similarly to .publish().refCount(), with a behavior difference when the source observable emits complete.
 * .publish().refCount() will not resubscribe to the original source, however .share() will resubscribe to the original source.
 * Observable.of("test").publish().refCount() will not re-emit "test" on new subscriptions, Observable.of("test").share() will
 * re-emit "test" to new subscriptions.
 *
 * <img src="./img/share.png" width="100%">
 *
 * @return {Observable<T>} An Observable that upon connection causes the source Observable to emit items to its Observers.
 * @method share
 * @owner Observable
 */
function share() {
    return operators_1.share()(this);
}
exports.share = share;
//# sourceMappingURL=share.js.map

/***/ }),

/***/ "l53z":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/zipAll.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * @param project
 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
 * @method zipAll
 * @owner Observable
 */
function zipAll(project) {
    return operators_1.zipAll(project)(this);
}
exports.zipAll = zipAll;
//# sourceMappingURL=zipAll.js.map

/***/ }),

/***/ "lK5c":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/defer.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.defer = rxjs_1.defer;
//# sourceMappingURL=defer.js.map

/***/ }),

/***/ "lXds":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/delayWhen.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Delays the emission of items from the source Observable by a given time span
 * determined by the emissions of another Observable.
 *
 * <span class="informal">It's like {@link delay}, but the time span of the
 * delay duration is determined by a second Observable.</span>
 *
 * <img src="./img/delayWhen.png" width="100%">
 *
 * `delayWhen` time shifts each emitted value from the source Observable by a
 * time span determined by another Observable. When the source emits a value,
 * the `delayDurationSelector` function is called with the source value as
 * argument, and should return an Observable, called the "duration" Observable.
 * The source value is emitted on the output Observable only when the duration
 * Observable emits a value or completes.
 *
 * Optionally, `delayWhen` takes a second argument, `subscriptionDelay`, which
 * is an Observable. When `subscriptionDelay` emits its first value or
 * completes, the source Observable is subscribed to and starts behaving like
 * described in the previous paragraph. If `subscriptionDelay` is not provided,
 * `delayWhen` will subscribe to the source Observable as soon as the output
 * Observable is subscribed.
 *
 * @example <caption>Delay each click by a random amount of time, between 0 and 5 seconds</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var delayedClicks = clicks.delayWhen(event =>
 *   Rx.Observable.interval(Math.random() * 5000)
 * );
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @see {@link debounce}
 * @see {@link delay}
 *
 * @param {function(value: T): Observable} delayDurationSelector A function that
 * returns an Observable for each value emitted by the source Observable, which
 * is then used to delay the emission of that item on the output Observable
 * until the Observable returned from this function emits a value.
 * @param {Observable} subscriptionDelay An Observable that triggers the
 * subscription to the source Observable once it emits any value.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by an amount of time specified by the Observable returned by
 * `delayDurationSelector`.
 * @method delayWhen
 * @owner Observable
 */
function delayWhen(delayDurationSelector, subscriptionDelay) {
    return operators_1.delayWhen(delayDurationSelector, subscriptionDelay)(this);
}
exports.delayWhen = delayWhen;
//# sourceMappingURL=delayWhen.js.map

/***/ }),

/***/ "m1gp":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/zip.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.zip = rxjs_1.zip;
//# sourceMappingURL=zip.js.map

/***/ }),

/***/ "mQn8":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/mergeScan.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Applies an accumulator function over the source Observable where the
 * accumulator function itself returns an Observable, then each intermediate
 * Observable returned is merged into the output Observable.
 *
 * <span class="informal">It's like {@link scan}, but the Observables returned
 * by the accumulator are merged into the outer Observable.</span>
 *
 * @example <caption>Count the number of click events</caption>
 * const click$ = Rx.Observable.fromEvent(document, 'click');
 * const one$ = click$.mapTo(1);
 * const seed = 0;
 * const count$ = one$.mergeScan((acc, one) => Rx.Observable.of(acc + one), seed);
 * count$.subscribe(x => console.log(x));
 *
 * // Results:
 * 1
 * 2
 * 3
 * 4
 * // ...and so on for each click
 *
 * @param {function(acc: R, value: T): Observable<R>} accumulator
 * The accumulator function called on each source value.
 * @param seed The initial accumulation value.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of
 * input Observables being subscribed to concurrently.
 * @return {Observable<R>} An observable of the accumulated values.
 * @method mergeScan
 * @owner Observable
 */
function mergeScan(accumulator, seed, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return operators_1.mergeScan(accumulator, seed, concurrent)(this);
}
exports.mergeScan = mergeScan;
//# sourceMappingURL=mergeScan.js.map

/***/ }),

/***/ "mfsk":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/defaultIfEmpty.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Emits a given value if the source Observable completes without emitting any
 * `next` value, otherwise mirrors the source Observable.
 *
 * <span class="informal">If the source Observable turns out to be empty, then
 * this operator will emit a default value.</span>
 *
 * <img src="./img/defaultIfEmpty.png" width="100%">
 *
 * `defaultIfEmpty` emits the values emitted by the source Observable or a
 * specified default value if the source Observable is empty (completes without
 * having emitted any `next` value).
 *
 * @example <caption>If no clicks happen in 5 seconds, then emit "no clicks"</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksBeforeFive = clicks.takeUntil(Rx.Observable.interval(5000));
 * var result = clicksBeforeFive.defaultIfEmpty('no clicks');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link empty}
 * @see {@link last}
 *
 * @param {any} [defaultValue=null] The default value used if the source
 * Observable is empty.
 * @return {Observable} An Observable that emits either the specified
 * `defaultValue` if the source Observable emits no items, or the values emitted
 * by the source Observable.
 * @method defaultIfEmpty
 * @owner Observable
 */
function defaultIfEmpty(defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    return operators_1.defaultIfEmpty(defaultValue)(this);
}
exports.defaultIfEmpty = defaultIfEmpty;
//# sourceMappingURL=defaultIfEmpty.js.map

/***/ }),

/***/ "mx47":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/merge.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.merge = rxjs_1.merge;
//# sourceMappingURL=merge.js.map

/***/ }),

/***/ "n2g9":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/delay.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var delay_1 = __webpack_require__(/*! ../../operator/delay */ "bd5T");
rxjs_1.Observable.prototype.delay = delay_1.delay;
//# sourceMappingURL=delay.js.map

/***/ }),

/***/ "n6Nf":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/windowToggle.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Branch out the source Observable values as a nested Observable starting from
 * an emission from `openings` and ending when the output of `closingSelector`
 * emits.
 *
 * <span class="informal">It's like {@link bufferToggle}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowToggle.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits windows that contain those items
 * emitted by the source Observable between the time when the `openings`
 * Observable emits an item and when the Observable returned by
 * `closingSelector` emits an item.
 *
 * @example <caption>Every other second, emit the click events from the next 500ms</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var openings = Rx.Observable.interval(1000);
 * var result = clicks.windowToggle(openings, i =>
 *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
 * ).mergeAll();
 * result.subscribe(x => console.log(x));
 *
 * @see {@link window}
 * @see {@link windowCount}
 * @see {@link windowTime}
 * @see {@link windowWhen}
 * @see {@link bufferToggle}
 *
 * @param {Observable<O>} openings An observable of notifications to start new
 * windows.
 * @param {function(value: O): Observable} closingSelector A function that takes
 * the value emitted by the `openings` observable and returns an Observable,
 * which, when it emits (either `next` or `complete`), signals that the
 * associated window should complete.
 * @return {Observable<Observable<T>>} An observable of windows, which in turn
 * are Observables.
 * @method windowToggle
 * @owner Observable
 */
function windowToggle(openings, closingSelector) {
    return operators_1.windowToggle(openings, closingSelector)(this);
}
exports.windowToggle = windowToggle;
//# sourceMappingURL=windowToggle.js.map

/***/ }),

/***/ "nZYK":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/switchMap.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, emitting values only from the most recently projected Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link switch}.</span>
 *
 * <img src="./img/switchMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each time it observes one of these
 * inner Observables, the output Observable begins emitting the items emitted by
 * that inner Observable. When a new inner Observable is emitted, `switchMap`
 * stops emitting items from the earlier-emitted inner Observable and begins
 * emitting items from the new one. It continues to behave like this for
 * subsequent inner Observables.
 *
 * @example <caption>Rerun an interval Observable on every click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switch}
 * @see {@link switchMapTo}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking only the values from the most recently
 * projected inner Observable.
 * @method switchMap
 * @owner Observable
 */
function switchMap(project) {
    return operators_1.switchMap(project)(this);
}
exports.switchMap = switchMap;
//# sourceMappingURL=switchMap.js.map

/***/ }),

/***/ "nueD":
/*!******************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/isEmpty.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * If the source Observable is empty it returns an Observable that emits true, otherwise it emits false.
 *
 * <img src="./img/isEmpty.png" width="100%">
 *
 * @return {Observable} An Observable that emits a Boolean.
 * @method isEmpty
 * @owner Observable
 */
function isEmpty() {
    return operators_1.isEmpty()(this);
}
exports.isEmpty = isEmpty;
//# sourceMappingURL=isEmpty.js.map

/***/ }),

/***/ "oKp4":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/take.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var take_1 = __webpack_require__(/*! ../../operator/take */ "ZHpM");
rxjs_1.Observable.prototype.take = take_1.take;
//# sourceMappingURL=take.js.map

/***/ }),

/***/ "oXC5":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/switchMapTo.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 * Projects each source value to the same Observable which is flattened multiple
 * times with {@link switch} in the output Observable.
 *
 * <span class="informal">It's like {@link switchMap}, but maps each value
 * always to the same inner Observable.</span>
 *
 * <img src="./img/switchMapTo.png" width="100%">
 *
 * Maps each source value to the given Observable `innerObservable` regardless
 * of the source value, and then flattens those resulting Observables into one
 * single Observable, which is the output Observable. The output Observables
 * emits values only from the most recently emitted instance of
 * `innerObservable`.
 *
 * @example <caption>Rerun an interval Observable on every click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.switchMapTo(Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMapTo}
 * @see {@link switch}
 * @see {@link switchMap}
 * @see {@link mergeMapTo}
 *
 * @param {ObservableInput} innerObservable An Observable to replace each value from
 * the source Observable.
 * @return {Observable} An Observable that emits items from the given
 * `innerObservable` (and optionally transformed through `resultSelector`) every
 * time a value is emitted on the source Observable, and taking only the values
 * from the most recently projected inner Observable.
 * @method switchMapTo
 * @owner Observable
 */
function switchMapTo(innerObservable) {
    return operators_1.switchMapTo(innerObservable)(this);
}
exports.switchMapTo = switchMapTo;
//# sourceMappingURL=switchMapTo.js.map

/***/ }),

/***/ "ob0Y":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/reduce.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var reduce_1 = __webpack_require__(/*! ../../operator/reduce */ "QPu+");
rxjs_1.Observable.prototype.reduce = reduce_1.reduce;
//# sourceMappingURL=reduce.js.map

/***/ }),

/***/ "odkN":
/*!**************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/let.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param func
 * @return {Observable<R>}
 * @method let
 * @owner Observable
 */
function letProto(func) {
    return func(this);
}
exports.letProto = letProto;
//# sourceMappingURL=let.js.map

/***/ }),

/***/ "ofYe":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/zipAll.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var zipAll_1 = __webpack_require__(/*! ../../operator/zipAll */ "l53z");
rxjs_1.Observable.prototype.zipAll = zipAll_1.zipAll;
//# sourceMappingURL=zipAll.js.map

/***/ }),

/***/ "ojb+":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/range.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.range = rxjs_1.range;
//# sourceMappingURL=range.js.map

/***/ }),

/***/ "okVX":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/switch.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var switch_1 = __webpack_require__(/*! ../../operator/switch */ "pv6b");
rxjs_1.Observable.prototype.switch = switch_1._switch;
rxjs_1.Observable.prototype._switch = switch_1._switch;
//# sourceMappingURL=switch.js.map

/***/ }),

/***/ "omlZ":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/takeUntil.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var takeUntil_1 = __webpack_require__(/*! ../../operator/takeUntil */ "r+37");
rxjs_1.Observable.prototype.takeUntil = takeUntil_1.takeUntil;
//# sourceMappingURL=takeUntil.js.map

/***/ }),

/***/ "ovWV":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/concat.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which sequentially emits all values from every
 * given input Observable after the current Observable.
 *
 * <span class="informal">Concatenates multiple Observables together by
 * sequentially emitting their values, one Observable after the other.</span>
 *
 * <img src="./img/concat.png" width="100%">
 *
 * Joins this Observable with multiple other Observables by subscribing to them
 * one at a time, starting with the source, and merging their results into the
 * output Observable. Will wait for each Observable to complete before moving
 * on to the next.
 *
 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
 * var timer = Rx.Observable.interval(1000).take(4);
 * var sequence = Rx.Observable.range(1, 10);
 * var result = timer.concat(sequence);
 * result.subscribe(x => console.log(x));
 *
 * // results in:
 * // 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
 *
 * @example <caption>Concatenate 3 Observables</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var result = timer1.concat(timer2, timer3);
 * result.subscribe(x => console.log(x));
 *
 * // results in the following:
 * // (Prints to console sequentially)
 * // -1000ms-> 0 -1000ms-> 1 -1000ms-> ... 9
 * // -2000ms-> 0 -2000ms-> 1 -2000ms-> ... 5
 * // -500ms-> 0 -500ms-> 1 -500ms-> ... 9
 *
 * @see {@link concatAll}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 *
 * @param {ObservableInput} other An input Observable to concatenate after the source
 * Observable. More than one input Observables may be given as argument.
 * @param {Scheduler} [scheduler=null] An optional IScheduler to schedule each
 * Observable subscription on.
 * @return {Observable} All values of each passed Observable merged into a
 * single Observable, in order, in serial fashion.
 * @method concat
 * @owner Observable
 */
function concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    return this.lift.call(rxjs_1.concat.apply(void 0, [this].concat(observables)));
}
exports.concat = concat;
//# sourceMappingURL=concat.js.map

/***/ }),

/***/ "pe+M":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/skip.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var skip_1 = __webpack_require__(/*! ../../operator/skip */ "fUwU");
rxjs_1.Observable.prototype.skip = skip_1.skip;
//# sourceMappingURL=skip.js.map

/***/ }),

/***/ "pv6b":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/switch.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Converts a higher-order Observable into a first-order Observable by
 * subscribing to only the most recently emitted of those inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables by dropping the
 * previous inner Observable once a new one appears.</span>
 *
 * <img src="./img/switch.png" width="100%">
 *
 * `switch` subscribes to an Observable that emits Observables, also known as a
 * higher-order Observable. Each time it observes one of these emitted inner
 * Observables, the output Observable subscribes to the inner Observable and
 * begins emitting the items emitted by that. So far, it behaves
 * like {@link mergeAll}. However, when a new inner Observable is emitted,
 * `switch` unsubscribes from the earlier-emitted inner Observable and
 * subscribes to the new inner Observable and begins emitting items from it. It
 * continues to behave like this for subsequent inner Observables.
 *
 * @example <caption>Rerun an interval Observable on every click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * // Each click event is mapped to an Observable that ticks every second
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var switched = higherOrder.switch();
 * // The outcome is that `switched` is essentially a timer that restarts
 * // on every click. The interval Observables from older clicks do not merge
 * // with the current interval Observable.
 * switched.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link exhaust}
 * @see {@link mergeAll}
 * @see {@link switchMap}
 * @see {@link switchMapTo}
 * @see {@link zipAll}
 *
 * @return {Observable<T>} An Observable that emits the items emitted by the
 * Observable most recently emitted by the source Observable.
 * @method switch
 * @name switch
 * @owner Observable
 */
function _switch() {
    return operators_1.switchAll()(this);
}
exports._switch = _switch;
//# sourceMappingURL=switch.js.map

/***/ }),

/***/ "q8yx":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/elementAt.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var elementAt_1 = __webpack_require__(/*! ../../operator/elementAt */ "XDL1");
rxjs_1.Observable.prototype.elementAt = elementAt_1.elementAt;
//# sourceMappingURL=elementAt.js.map

/***/ }),

/***/ "qIMP":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/pairwise.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Groups pairs of consecutive emissions together and emits them as an array of
 * two values.
 *
 * <span class="informal">Puts the current value and previous value together as
 * an array, and emits that.</span>
 *
 * <img src="./img/pairwise.png" width="100%">
 *
 * The Nth emission from the source Observable will cause the output Observable
 * to emit an array [(N-1)th, Nth] of the previous and the current value, as a
 * pair. For this reason, `pairwise` emits on the second and subsequent
 * emissions from the source Observable, but not on the first emission, because
 * there is no previous value in that case.
 *
 * @example <caption>On every click (starting from the second), emit the relative distance to the previous click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var pairs = clicks.pairwise();
 * var distance = pairs.map(pair => {
 *   var x0 = pair[0].clientX;
 *   var y0 = pair[0].clientY;
 *   var x1 = pair[1].clientX;
 *   var y1 = pair[1].clientY;
 *   return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
 * });
 * distance.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferCount}
 *
 * @return {Observable<Array<T>>} An Observable of pairs (as arrays) of
 * consecutive values from the source Observable.
 * @method pairwise
 * @owner Observable
 */
function pairwise() {
    return operators_1.pairwise()(this);
}
exports.pairwise = pairwise;
//# sourceMappingURL=pairwise.js.map

/***/ }),

/***/ "r+37":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/takeUntil.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Emits the values emitted by the source Observable until a `notifier`
 * Observable emits a value.
 *
 * <span class="informal">Lets values pass until a second Observable,
 * `notifier`, emits a value. Then, it completes.</span>
 *
 * <img src="./img/takeUntil.png" width="100%">
 *
 * `takeUntil` subscribes and begins mirroring the source Observable. It also
 * monitors a second Observable, `notifier` that you provide. If the `notifier`
 * emits a value, the output Observable stops mirroring the source Observable
 * and completes. If the `notifier` doesn't emit any value and completes
 * then `takeUntil` will pass all values.
 *
 * @example <caption>Tick every second until the first click happens</caption>
 * var interval = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = interval.takeUntil(clicks);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link take}
 * @see {@link takeLast}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @param {Observable} notifier The Observable whose first emitted value will
 * cause the output Observable of `takeUntil` to stop emitting values from the
 * source Observable.
 * @return {Observable<T>} An Observable that emits the values from the source
 * Observable until such time as `notifier` emits its first value.
 * @method takeUntil
 * @owner Observable
 */
function takeUntil(notifier) {
    return operators_1.takeUntil(notifier)(this);
}
exports.takeUntil = takeUntil;
//# sourceMappingURL=takeUntil.js.map

/***/ }),

/***/ "rSqW":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/subscribeOn.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var subscribeOn_1 = __webpack_require__(/*! ../../operator/subscribeOn */ "8LQU");
rxjs_1.Observable.prototype.subscribeOn = subscribeOn_1.subscribeOn;
//# sourceMappingURL=subscribeOn.js.map

/***/ }),

/***/ "rqY6":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/timeoutWith.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var timeoutWith_1 = __webpack_require__(/*! ../../operator/timeoutWith */ "zDpS");
rxjs_1.Observable.prototype.timeoutWith = timeoutWith_1.timeoutWith;
//# sourceMappingURL=timeoutWith.js.map

/***/ }),

/***/ "sNY3":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/combineLatest.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.combineLatest = rxjs_1.combineLatest;
//# sourceMappingURL=combineLatest.js.map

/***/ }),

/***/ "sRqT":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/mergeMapTo.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var mergeMapTo_1 = __webpack_require__(/*! ../../operator/mergeMapTo */ "xwTN");
rxjs_1.Observable.prototype.flatMapTo = mergeMapTo_1.mergeMapTo;
rxjs_1.Observable.prototype.mergeMapTo = mergeMapTo_1.mergeMapTo;
//# sourceMappingURL=mergeMapTo.js.map

/***/ }),

/***/ "sjkp":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/findIndex.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var findIndex_1 = __webpack_require__(/*! ../../operator/findIndex */ "6mJ0");
rxjs_1.Observable.prototype.findIndex = findIndex_1.findIndex;
//# sourceMappingURL=findIndex.js.map

/***/ }),

/***/ "t0XI":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/onErrorResumeNext.js ***!
  \**********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.onErrorResumeNext = rxjs_1.onErrorResumeNext;
//# sourceMappingURL=onErrorResumeNext.js.map

/***/ }),

/***/ "uARb":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/debounce.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Emits a value from the source Observable only after a particular time span
 * determined by another Observable has passed without another source emission.
 *
 * <span class="informal">It's like {@link debounceTime}, but the time span of
 * emission silence is determined by a second Observable.</span>
 *
 * <img src="./img/debounce.png" width="100%">
 *
 * `debounce` delays values emitted by the source Observable, but drops previous
 * pending delayed emissions if a new value arrives on the source Observable.
 * This operator keeps track of the most recent value from the source
 * Observable, and spawns a duration Observable by calling the
 * `durationSelector` function. The value is emitted only when the duration
 * Observable emits a value or completes, and if no other value was emitted on
 * the source Observable since the duration Observable was spawned. If a new
 * value appears before the duration Observable emits, the previous value will
 * be dropped and will not be emitted on the output Observable.
 *
 * Like {@link debounceTime}, this is a rate-limiting operator, and also a
 * delay-like operator since output emissions do not necessarily occur at the
 * same time as they did on the source Observable.
 *
 * @example <caption>Emit the most recent click after a burst of clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.debounce(() => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link audit}
 * @see {@link debounceTime}
 * @see {@link delayWhen}
 * @see {@link throttle}
 *
 * @param {function(value: T): SubscribableOrPromise} durationSelector A function
 * that receives a value from the source Observable, for computing the timeout
 * duration for each source value, returned as an Observable or a Promise.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified duration Observable returned by
 * `durationSelector`, and may drop some values if they occur too frequently.
 * @method debounce
 * @owner Observable
 */
function debounce(durationSelector) {
    return operators_1.debounce(durationSelector)(this);
}
exports.debounce = debounce;
//# sourceMappingURL=debounce.js.map

/***/ }),

/***/ "uGYe":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/if.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
rxjs_1.Observable.if = rxjs_1.iif;
//# sourceMappingURL=if.js.map

/***/ }),

/***/ "uMcE":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/shareReplay.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
function shareReplay(configOrBufferSize, windowTime, scheduler) {
    if (configOrBufferSize && typeof configOrBufferSize === 'object') {
        return operators_1.shareReplay(configOrBufferSize)(this);
    }
    return operators_1.shareReplay(configOrBufferSize, windowTime, scheduler)(this);
}
exports.shareReplay = shareReplay;
//# sourceMappingURL=shareReplay.js.map

/***/ }),

/***/ "uO2z":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/observable/dom/webSocket.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var webSocket_1 = __webpack_require__(/*! rxjs/webSocket */ "xuRT");
rxjs_1.Observable.webSocket = webSocket_1.webSocket;
//# sourceMappingURL=webSocket.js.map

/***/ }),

/***/ "v87U":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/single.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Returns an Observable that emits the single item emitted by the source Observable that matches a specified
 * predicate, if that Observable emits one such item. If the source Observable emits more than one such item or no
 * such items, notify of an IllegalArgumentException or NoSuchElementException respectively.
 *
 * <img src="./img/single.png" width="100%">
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 * @param {Function} predicate - A predicate function to evaluate items emitted by the source Observable.
 * @return {Observable<T>} An Observable that emits the single item emitted by the source Observable that matches
 * the predicate.
 .
 * @method single
 * @owner Observable
 */
function single(predicate) {
    return operators_1.single(predicate)(this);
}
exports.single = single;
//# sourceMappingURL=single.js.map

/***/ }),

/***/ "vQc4":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/bufferCount.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var bufferCount_1 = __webpack_require__(/*! ../../operator/bufferCount */ "itJ+");
rxjs_1.Observable.prototype.bufferCount = bufferCount_1.bufferCount;
//# sourceMappingURL=bufferCount.js.map

/***/ }),

/***/ "vTln":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/distinct.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.
 *
 * If a keySelector function is provided, then it will project each value from the source observable into a new value that it will
 * check for equality with previously projected values. If a keySelector function is not provided, it will use each value from the
 * source observable directly with an equality check against previous values.
 *
 * In JavaScript runtimes that support `Set`, this operator will use a `Set` to improve performance of the distinct value checking.
 *
 * In other runtimes, this operator will use a minimal implementation of `Set` that relies on an `Array` and `indexOf` under the
 * hood, so performance will degrade as more values are checked for distinction. Even in newer browsers, a long-running `distinct`
 * use might result in memory leaks. To help alleviate this in some scenarios, an optional `flushes` parameter is also provided so
 * that the internal `Set` can be "flushed", basically clearing it of values.
 *
 * @example <caption>A simple example with numbers</caption>
 * Observable.of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1)
 *   .distinct()
 *   .subscribe(x => console.log(x)); // 1, 2, 3, 4
 *
 * @example <caption>An example using a keySelector function</caption>
 * interface Person {
 *    age: number,
 *    name: string
 * }
 *
 * Observable.of<Person>(
 *     { age: 4, name: 'Foo'},
 *     { age: 7, name: 'Bar'},
 *     { age: 5, name: 'Foo'})
 *     .distinct((p: Person) => p.name)
 *     .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Foo' }
 * // { age: 7, name: 'Bar' }
 *
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 *
 * @param {function} [keySelector] Optional function to select which value you want to check as distinct.
 * @param {Observable} [flushes] Optional Observable for flushing the internal HashSet of the operator.
 * @return {Observable} An Observable that emits items from the source Observable with distinct values.
 * @method distinct
 * @owner Observable
 */
function distinct(keySelector, flushes) {
    return operators_1.distinct(keySelector, flushes)(this);
}
exports.distinct = distinct;
//# sourceMappingURL=distinct.js.map

/***/ }),

/***/ "wGW3":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/mergeMap.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var mergeMap_1 = __webpack_require__(/*! ../../operator/mergeMap */ "iD44");
rxjs_1.Observable.prototype.mergeMap = mergeMap_1.mergeMap;
rxjs_1.Observable.prototype.flatMap = mergeMap_1.mergeMap;
//# sourceMappingURL=mergeMap.js.map

/***/ }),

/***/ "wWu8":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/ignoreElements.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var ignoreElements_1 = __webpack_require__(/*! ../../operator/ignoreElements */ "Lsvf");
rxjs_1.Observable.prototype.ignoreElements = ignoreElements_1.ignoreElements;
//# sourceMappingURL=ignoreElements.js.map

/***/ }),

/***/ "wfyD":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/add/operator/delayWhen.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var delayWhen_1 = __webpack_require__(/*! ../../operator/delayWhen */ "lXds");
rxjs_1.Observable.prototype.delayWhen = delayWhen_1.delayWhen;
//# sourceMappingURL=delayWhen.js.map

/***/ }),

/***/ "xwTN":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/mergeMapTo.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/**
 * Projects each source value to the same Observable which is merged multiple
 * times in the output Observable.
 *
 * <span class="informal">It's like {@link mergeMap}, but maps each value always
 * to the same inner Observable.</span>
 *
 * <img src="./img/mergeMapTo.png" width="100%">
 *
 * Maps each source value to the given Observable `innerObservable` regardless
 * of the source value, and then merges those resulting Observables into one
 * single Observable, which is the output Observable.
 *
 * @example <caption>For each click event, start an interval Observable ticking every 1 second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.mergeMapTo(Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMapTo}
 * @see {@link merge}
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeScan}
 * @see {@link switchMapTo}
 *
 * @param {ObservableInput} innerObservable An Observable to replace each value from
 * the source Observable.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits items from the given
 * `innerObservable`.
 * @method mergeMapTo
 * @owner Observable
 */
function mergeMapTo(innerObservable, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return operators_1.mergeMapTo(innerObservable, concurrent)(this);
}
exports.mergeMapTo = mergeMapTo;
//# sourceMappingURL=mergeMapTo.js.map

/***/ }),

/***/ "zDpS":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/operator/timeoutWith.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "DtyJ");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "ahDk");
/* tslint:enable:max-line-length */
/**
 *
 * Errors if Observable does not emit a value in given time span, in case of which
 * subscribes to the second Observable.
 *
 * <span class="informal">It's a version of `timeout` operator that let's you specify fallback Observable.</span>
 *
 * <img src="./img/timeoutWith.png" width="100%">
 *
 * `timeoutWith` is a variation of `timeout` operator. It behaves exactly the same,
 * still accepting as a first argument either a number or a Date, which control - respectively -
 * when values of source Observable should be emitted or when it should complete.
 *
 * The only difference is that it accepts a second, required parameter. This parameter
 * should be an Observable which will be subscribed when source Observable fails any timeout check.
 * So whenever regular `timeout` would emit an error, `timeoutWith` will instead start re-emitting
 * values from second Observable. Note that this fallback Observable is not checked for timeouts
 * itself, so it can emit values and complete at arbitrary points in time. From the moment of a second
 * subscription, Observable returned from `timeoutWith` simply mirrors fallback stream. When that
 * stream completes, it completes as well.
 *
 * Scheduler, which in case of `timeout` is provided as as second argument, can be still provided
 * here - as a third, optional parameter. It still is used to schedule timeout checks and -
 * as a consequence - when second Observable will be subscribed, since subscription happens
 * immediately after failing check.
 *
 * @example <caption>Add fallback observable</caption>
 * const seconds = Rx.Observable.interval(1000);
 * const minutes = Rx.Observable.interval(60 * 1000);
 *
 * seconds.timeoutWith(900, minutes)
 *     .subscribe(
 *         value => console.log(value), // After 900ms, will start emitting `minutes`,
 *                                      // since first value of `seconds` will not arrive fast enough.
 *         err => console.log(err) // Would be called after 900ms in case of `timeout`,
 *                                 // but here will never be called.
 *     );
 *
 * @param {number|Date} due Number specifying period within which Observable must emit values
 *                          or Date specifying before when Observable should complete
 * @param {Observable<T>} withObservable Observable which will be subscribed if source fails timeout check.
 * @param {Scheduler} [scheduler] Scheduler controlling when timeout checks occur.
 * @return {Observable<T>} Observable that mirrors behaviour of source or, when timeout check fails, of an Observable
 *                          passed as a second parameter.
 * @method timeoutWith
 * @owner Observable
 */
function timeoutWith(due, withObservable, scheduler) {
    if (scheduler === void 0) { scheduler = rxjs_1.asyncScheduler; }
    return operators_1.timeoutWith(due, withObservable, scheduler)(this);
}
exports.timeoutWith = timeoutWith;
//# sourceMappingURL=timeoutWith.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL2xldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL29ic2VydmVPbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL3JldHJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvZGlzdGluY3RVbnRpbENoYW5nZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vYnNlcnZhYmxlL2NvbmNhdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL3RpbWVzdGFtcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvbWVyZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci90YWtlTGFzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvdG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29ic2VydmFibGUvZnJvbUV2ZW50UGF0dGVybi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvcmV0cnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vYnNlcnZhYmxlL2JpbmRDYWxsYmFjay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL2NhdGNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9tYXRlcmlhbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL3NoYXJlUmVwbGF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3Ivd2luZG93VGltZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvY29uY2F0TWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvY29uY2F0TWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvYnVmZmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb2JzZXJ2YWJsZS9mcm9tUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvZXhwYW5kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9kby5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL3N3aXRjaE1hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29ic2VydmFibGUvcmFjZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvZXhoYXVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL3NraXBVbnRpbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvbWFwVG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci93aW5kb3dXaGVuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9za2lwV2hpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL2ZpbmRJbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL3BhaXJ3aXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9tYXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9leGhhdXN0TWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9leGhhdXN0TWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvZmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL3dpbmRvd0NvdW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvbXVsdGljYXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9kaXN0aW5jdFVudGlsS2V5Q2hhbmdlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29ic2VydmFibGUvbmV2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL3N1YnNjcmliZU9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvbWFwVG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci90aHJvdHRsZVRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL3Rha2VMYXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvY291bnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9sYXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvemlwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3Ivc2tpcFdoaWxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9idWZmZXJUaW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvcHVibGlzaEJlaGF2aW9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9yZXBlYXRXaGVuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL2dyb3VwQnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL2J1ZmZlclRvZ2dsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL2RvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb2JzZXJ2YWJsZS9vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL3JlcGVhdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL2dyb3VwQnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL3NraXBMYXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9zYW1wbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL3B1Ymxpc2hMYXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvZXhwYW5kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvZGVmYXVsdElmRW1wdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9vbkVycm9yUmVzdW1lTmV4dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL2NvbWJpbmVMYXRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9zaW5nbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL3JlcGVhdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvZGVtYXRlcmlhbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvUnguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9kaXN0aW5jdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL3NhbXBsZVRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9zZXF1ZW5jZUVxdWFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb2JzZXJ2YWJsZS9nZW5lcmF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvZGlzdGluY3RVbnRpbENoYW5nZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL29ic2VydmVPbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29ic2VydmFibGUvcGFpcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci90YWtlV2hpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL3B1Ymxpc2hCZWhhdmlvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvY29tYmluZUFsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvYXVkaXRUaW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvdGhyb3R0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9jb25jYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9kZW1hdGVyaWFsaXplLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvbWF4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvZXZlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL21lcmdlQWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9zdGFydFdpdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9kZWJvdW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvZGVib3VuY2VUaW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci90aHJvdHRsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL3NraXBMYXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3Ivc2FtcGxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9wdWJsaXNoUmVwbGF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9pZ25vcmVFbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL2NvbWJpbmVBbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL2ZpbmFsbHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL3BsdWNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9yYWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3Ivd2luZG93LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9yZXRyeVdoZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9wYXJ0aXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vYnNlcnZhYmxlL2ZvcmtKb2luLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvbWVyZ2VBbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL3NhbXBsZVRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9wdWJsaXNoUmVwbGF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb2JzZXJ2YWJsZS9iaW5kTm9kZUNhbGxiYWNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3Ivc2Nhbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvcmVkdWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci90YWtlV2hpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vYnNlcnZhYmxlL3Rocm93LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvbWF0ZXJpYWxpemUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL3dpdGhMYXRlc3RGcm9tLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvZGVib3VuY2VUaW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvY29uY2F0QWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvaXNFbXB0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvZmlyc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9jb25jYXRNYXBUby5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29ic2VydmFibGUvaW50ZXJ2YWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL21pbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL3RvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL3dpbmRvd0NvdW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9maW5kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvZGlzdGluY3RVbnRpbEtleUNoYW5nZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL3NlcXVlbmNlRXF1YWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9zaGFyZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL3RpbWVJbnRlcnZhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvY29tYmluZUxhdGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvdGhyb3R0bGVUaW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvcmVwZWF0V2hlbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL3N3aXRjaE1hcFRvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9lbGVtZW50QXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vYnNlcnZhYmxlL2VtcHR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci93aW5kb3cuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vYnNlcnZhYmxlL2Zyb21FdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvY2F0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9maW5hbGx5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9wYXJ0aXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9idWZmZXJXaGVuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci93aW5kb3dXaGVuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvZmlyc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL211bHRpY2FzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvdGFrZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvbWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvYnVmZmVyVG9nZ2xlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvcHVibGlzaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvdGltZW91dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvbGFzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3Ivc2tpcFVudGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3Ivd2luZG93VG9nZ2xlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci90aW1lSW50ZXJ2YWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9yYWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci90aW1lc3RhbXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL29uRXJyb3JSZXN1bWVOZXh0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9kZWxheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29ic2VydmFibGUvZG9tL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vYnNlcnZhYmxlL3RpbWVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9ldmVyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL21lcmdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9idWZmZXJXaGVuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9jb25jYXRBbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci93aXRoTGF0ZXN0RnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvYXVkaXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vYnNlcnZhYmxlL3VzaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9idWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9hdWRpdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvY29uY2F0TWFwVG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9yZXRyeVdoZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL3NjYW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9tZXJnZVNjYW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci90aW1lb3V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9za2lwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci96aXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vYnNlcnZhYmxlL2Zyb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9taW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9zdGFydFdpdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL2NvdW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvYnVmZmVyVGltZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvbWVyZ2VNYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL2J1ZmZlckNvdW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci93aW5kb3dUaW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvZXhoYXVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL3BsdWNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9wdWJsaXNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvYXVkaXRUaW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvcHVibGlzaExhc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL3NoYXJlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci96aXBBbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vYnNlcnZhYmxlL2RlZmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9kZWxheVdoZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vYnNlcnZhYmxlL3ppcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvbWVyZ2VTY2FuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9kZWZhdWx0SWZFbXB0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29ic2VydmFibGUvbWVyZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9kZWxheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3Ivd2luZG93VG9nZ2xlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9zd2l0Y2hNYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL2lzRW1wdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci90YWtlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9zd2l0Y2hNYXBUby5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL3JlZHVjZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvbGV0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvemlwQWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb2JzZXJ2YWJsZS9yYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL3N3aXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL3Rha2VVbnRpbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvY29uY2F0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3Ivc2tpcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3Ivc3dpdGNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvZWxlbWVudEF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9wYWlyd2lzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvdGFrZVVudGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3Ivc3Vic2NyaWJlT24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci90aW1lb3V0V2l0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29ic2VydmFibGUvY29tYmluZUxhdGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL21lcmdlTWFwVG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9maW5kSW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vYnNlcnZhYmxlL29uRXJyb3JSZXN1bWVOZXh0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9kZWJvdW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29ic2VydmFibGUvaWYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L29wZXJhdG9yL3NoYXJlUmVwbGF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb2JzZXJ2YWJsZS9kb20vd2ViU29ja2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9zaW5nbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9idWZmZXJDb3VudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvb3BlcmF0b3IvZGlzdGluY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMtY29tcGF0L2FkZC9vcGVyYXRvci9tZXJnZU1hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy1jb21wYXQvYWRkL29wZXJhdG9yL2lnbm9yZUVsZW1lbnRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9hZGQvb3BlcmF0b3IvZGVsYXlXaGVuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci9tZXJnZU1hcFRvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzLWNvbXBhdC9vcGVyYXRvci90aW1lb3V0V2l0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLFlBQVksbUJBQU8sQ0FBQyxnQ0FBb0I7QUFDeEM7QUFDQTtBQUNBLCtCOzs7Ozs7Ozs7Ozs7O0FDTmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0Isa0JBQWtCLG1CQUFPLENBQUMsc0NBQTBCO0FBQ3BEO0FBQ0EscUM7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixjQUFjLG1CQUFPLENBQUMsa0NBQXNCO0FBQzVDO0FBQ0EsaUM7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQiw2QkFBNkIsbUJBQU8sQ0FBQyxpREFBcUM7QUFDMUU7QUFDQSxnRDs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCO0FBQ0Esa0M7Ozs7Ozs7Ozs7Ozs7QUNKYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixrQkFBa0IsbUJBQU8sQ0FBQyxzQ0FBMEI7QUFDcEQ7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQSxXQUFXLGdCQUFnQjtBQUMzQjtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLFdBQVcsVUFBVTtBQUNyQjtBQUNBLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQzs7Ozs7Ozs7Ozs7OztBQzFEYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixpQkFBaUIsbUJBQU8sQ0FBQyxxQ0FBeUI7QUFDbEQ7QUFDQSxvQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBLFNBQVM7QUFDVDtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DOzs7Ozs7Ozs7Ozs7O0FDOUJhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCO0FBQ0EsNEM7Ozs7Ozs7Ozs7Ozs7QUNKYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixZQUFZO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLGlDOzs7Ozs7Ozs7Ozs7O0FDeEJhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCO0FBQ0Esd0M7Ozs7Ozs7Ozs7Ozs7QUNKYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixjQUFjLG1CQUFPLENBQUMsa0NBQXNCO0FBQzVDO0FBQ0E7QUFDQSxpQzs7Ozs7Ozs7Ozs7OztBQ05hO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsSUFBSSxtQkFBbUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLG9CQUFvQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLHNCQUFzQjtBQUN0QixzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFlBQVksNEJBQTRCO0FBQ3hDLElBQUksbUJBQW1CO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Qzs7Ozs7Ozs7Ozs7OztBQ25EYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixvQkFBb0IsbUJBQU8sQ0FBQyx3Q0FBNEI7QUFDeEQ7QUFDQSx1Qzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLG1CQUFtQixtQkFBTyxDQUFDLHVDQUEyQjtBQUN0RDtBQUNBLHNDOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGdCQUFnQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFdBQVcsb0RBQW9EO0FBQy9EO0FBQ0E7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQzFEYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixrQkFBa0IsbUJBQU8sQ0FBQyxzQ0FBMEI7QUFDcEQ7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGVBQWUsbUJBQU8sQ0FBQyxtQ0FBdUI7QUFDOUM7QUFDQSxrQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCO0FBQ0EsdUM7Ozs7Ozs7Ozs7Ozs7QUNKYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLGVBQWU7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQSxXQUFXLGdEQUFnRDtBQUMzRDtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLHVDQUF1QztBQUN2RSwrQkFBK0IsdUJBQXVCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0M7Ozs7Ozs7Ozs7Ozs7QUN4RGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0EsV0FBVyxrQkFBa0I7QUFDN0I7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Qjs7Ozs7Ozs7Ozs7OztBQ25EYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixrQkFBa0IsbUJBQU8sQ0FBQyxzQ0FBMEI7QUFDcEQ7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCO0FBQ0EsZ0M7Ozs7Ozs7Ozs7Ozs7QUNKYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsZUFBZTtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DOzs7Ozs7Ozs7Ozs7O0FDeENhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGtCQUFrQixtQkFBTyxDQUFDLHNDQUEwQjtBQUNwRDtBQUNBLHFDOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFdBQVcsSUFBSTtBQUNmLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUM7Ozs7Ozs7Ozs7Ozs7QUNqQ2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsbUJBQW1CLG1CQUFPLENBQUMsdUNBQTJCO0FBQ3REO0FBQ0Esc0M7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQ25CYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxXQUFXO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxZQUFZO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0EsV0FBVyxrRUFBa0U7QUFDN0U7QUFDQSxXQUFXLElBQUk7QUFDZjtBQUNBLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUM7Ozs7Ozs7Ozs7Ozs7QUN6Q2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsaUJBQWlCLG1CQUFPLENBQUMscUNBQXlCO0FBQ2xEO0FBQ0Esb0M7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG9CQUFvQjtBQUM5QywwQkFBMEIsb0JBQW9CO0FBQzlDLDBCQUEwQixxQkFBcUI7QUFDL0M7QUFDQSw0REFBNEQ7QUFDNUQ7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCOzs7Ozs7Ozs7Ozs7O0FDdENhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLG1CQUFtQixtQkFBTyxDQUFDLHVDQUEyQjtBQUN0RDtBQUNBLHNDOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxjQUFjO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQSxXQUFXLG9EQUFvRDtBQUMvRDtBQUNBO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0M7Ozs7Ozs7Ozs7Ozs7QUMxQ2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsYUFBYSxtQkFBTyxDQUFDLGlDQUFxQjtBQUMxQztBQUNBLGdDOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0Isb0JBQW9CLG1CQUFPLENBQUMsd0NBQTRCO0FBQ3hEO0FBQ0EsdUM7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixrQkFBa0IsbUJBQU8sQ0FBQyxzQ0FBMEI7QUFDcEQ7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFCQUFxQjtBQUM3QixRQUFRLHFCQUFxQjtBQUM3QixRQUFRLHFCQUFxQjtBQUM3QixRQUFRLHFCQUFxQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0JBQXNCO0FBQzlCLFFBQVEscUJBQXFCO0FBQzdCLFFBQVEsc0JBQXNCO0FBQzlCLFFBQVEsc0JBQXNCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1A7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsU0FBUztBQUNwQixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EOzs7Ozs7Ozs7Ozs7O0FDbEVhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLFlBQVksbUJBQU8sQ0FBQyxnQ0FBb0I7QUFDeEM7QUFDQSwrQjs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQzs7Ozs7Ozs7Ozs7OztBQ1JhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsV0FBVztBQUN0QztBQUNBO0FBQ0E7QUFDQSx1Qzs7Ozs7Ozs7Ozs7OztBQ25CYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixjQUFjLG1CQUFPLENBQUMsa0NBQXNCO0FBQzVDO0FBQ0EsaUM7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixxQkFBcUIsbUJBQU8sQ0FBQyx5Q0FBNkI7QUFDMUQ7QUFDQSx3Qzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFlBQVksd0JBQXdCO0FBQ3BDO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQSxZQUFZLGNBQWM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DOzs7Ozs7Ozs7Ozs7O0FDM0NhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGNBQWMsbUJBQU8sQ0FBQyxrQ0FBc0I7QUFDNUM7QUFDQSxpQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGFBQWEsbUJBQU8sQ0FBQyxpQ0FBcUI7QUFDMUM7QUFDQSxnQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLFlBQVksbUJBQU8sQ0FBQyxnQ0FBb0I7QUFDeEM7QUFDQSwrQjs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGtCQUFrQixtQkFBTyxDQUFDLHNDQUEwQjtBQUNwRDtBQUNBLHFDOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsK0JBQStCLG1CQUFPLENBQUMseUNBQTZCO0FBQ3BFLGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsVUFBVTtBQUNyQjtBQUNBLFlBQVksZ0JBQWdCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDOzs7Ozs7Ozs7Ozs7O0FDbkVhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLHdCQUF3QixtQkFBTyxDQUFDLDRDQUFnQztBQUNoRTtBQUNBLDJDOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0RBQWdEO0FBQzNEO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0M7Ozs7Ozs7Ozs7Ozs7QUNyQmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0EsV0FBVywyQ0FBMkM7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsSUFBSTtBQUNmO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQzs7Ozs7Ozs7Ozs7OztBQy9DYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksd0JBQXdCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQyx1QkFBdUIsbUJBQW1CO0FBQzFDLHVCQUF1QixtQkFBbUI7QUFDMUMsdUJBQXVCLG9CQUFvQjtBQUMzQyx1QkFBdUIsbUJBQW1CO0FBQzFDLHVCQUF1QixzQkFBc0I7QUFDN0MsdUJBQXVCLG9CQUFvQjtBQUMzQyx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxzQkFBc0I7QUFDL0IsU0FBUyxzQkFBc0I7QUFDL0IsU0FBUyxxQkFBcUI7QUFDOUI7QUFDQSxTQUFTLHFCQUFxQjtBQUM5QixTQUFTLHFCQUFxQjtBQUM5QixTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLDBCQUEwQjtBQUNuQztBQUNBLFNBQVMsc0JBQXNCO0FBQy9CO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDLHVCQUF1QixtQkFBbUI7QUFDMUMsdUJBQXVCLG1CQUFtQjtBQUMxQyx1QkFBdUIsb0JBQW9CO0FBQzNDLHVCQUF1QixtQkFBbUI7QUFDMUMsdUJBQXVCLHNCQUFzQjtBQUM3Qyx1QkFBdUIsb0JBQW9CO0FBQzNDLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsK0NBQStDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQO0FBQ0EsV0FBVyxzQkFBc0I7QUFDakM7QUFDQSxXQUFXLHNCQUFzQjtBQUNqQztBQUNBLFdBQVcsMkRBQTJEO0FBQ3RFO0FBQ0E7QUFDQSxZQUFZLG1DQUFtQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DOzs7Ozs7Ozs7Ozs7O0FDM0VhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFdBQVcseUJBQXlCO0FBQ3BDO0FBQ0EsV0FBVywwQ0FBMEM7QUFDckQ7QUFDQTtBQUNBO0FBQ0EsWUFBWSxnQkFBZ0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Qzs7Ozs7Ozs7Ozs7OztBQzdDYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixXQUFXLG1CQUFPLENBQUMsK0JBQW1CO0FBQ3RDO0FBQ0E7QUFDQSw4Qjs7Ozs7Ozs7Ozs7OztBQ05hO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCO0FBQ0EsOEI7Ozs7Ozs7Ozs7Ozs7QUNKYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixlQUFlLG1CQUFPLENBQUMsbUNBQXVCO0FBQzlDO0FBQ0Esa0M7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixnQkFBZ0IsbUJBQU8sQ0FBQyxvQ0FBd0I7QUFDaEQ7QUFDQSxtQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFlBQVksd0JBQXdCO0FBQ3BDO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxjQUFjO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQzs7Ozs7Ozs7Ozs7OztBQ3ZDYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxpQkFBaUI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQSxXQUFXLGdCQUFnQjtBQUMzQjtBQUNBLFlBQVksY0FBYztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQzs7Ozs7Ozs7Ozs7OztBQ3pDYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUM7Ozs7Ozs7Ozs7Ozs7QUNiYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixlQUFlLG1CQUFPLENBQUMsbUNBQXVCO0FBQzlDO0FBQ0Esa0M7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQix1QkFBdUIsbUJBQU8sQ0FBQywyQ0FBK0I7QUFDOUQ7QUFDQSwwQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLDBCQUEwQixtQkFBTyxDQUFDLDhDQUFrQztBQUNwRTtBQUNBLDZDOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0Isc0JBQXNCLG1CQUFPLENBQUMsMENBQThCO0FBQzVEO0FBQ0EseUM7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixlQUFlLG1CQUFPLENBQUMsbUNBQXVCO0FBQzlDO0FBQ0Esa0M7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsWUFBWTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxrQzs7Ozs7Ozs7Ozs7OztBQ3BCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBLDhCQUE4QixtQkFBbUI7QUFDakQ7QUFDQTtBQUNBLG1DQUFtQyxtQkFBbUI7QUFDdEQsc0RBQXNELGtCQUFrQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksbUJBQW1CO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGtCQUFrQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDOzs7Ozs7Ozs7Ozs7O0FDL0NhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0I7QUFDQTtBQUNBLCtCQUErQixtQkFBTyxDQUFDLHlDQUE2QjtBQUNwRTtBQUNBO0FBQ0EsK0JBQStCLG1CQUFPLENBQUMseUNBQTZCO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBLG1CQUFPLENBQUMsMkNBQStCO0FBQ3ZDLG1CQUFPLENBQUMsK0NBQW1DO0FBQzNDLG1CQUFPLENBQUMsNENBQWdDO0FBQ3hDLG1CQUFPLENBQUMscUNBQXlCO0FBQ2pDLG1CQUFPLENBQUMsb0NBQXdCO0FBQ2hDLG1CQUFPLENBQUMsb0NBQXdCO0FBQ2hDLG1CQUFPLENBQUMsdUNBQTJCO0FBQ25DLG1CQUFPLENBQUMsbUNBQXVCO0FBQy9CLG1CQUFPLENBQUMsd0NBQTRCO0FBQ3BDLG1CQUFPLENBQUMsK0NBQW1DO0FBQzNDLG1CQUFPLENBQUMsMENBQThCO0FBQ3RDLG1CQUFPLENBQUMsdUNBQTJCO0FBQ25DLG1CQUFPLENBQUMsaUNBQXFCO0FBQzdCLG1CQUFPLENBQUMsdUNBQTJCO0FBQ25DLG1CQUFPLENBQUMsb0NBQXdCO0FBQ2hDLG1CQUFPLENBQUMsbUNBQXVCO0FBQy9CLG1CQUFPLENBQUMsb0NBQXdCO0FBQ2hDLG1CQUFPLENBQUMsaUNBQXFCO0FBQzdCLG1CQUFPLENBQUMsZ0RBQW9DO0FBQzVDLG1CQUFPLENBQUMsb0NBQXdCO0FBQ2hDLG1CQUFPLENBQUMsb0NBQXdCO0FBQ2hDLG1CQUFPLENBQUMsb0NBQXdCO0FBQ2hDLG1CQUFPLENBQUMsb0NBQXdCO0FBQ2hDLG1CQUFPLENBQUMsb0NBQXdCO0FBQ2hDLG1CQUFPLENBQUMsa0NBQXNCO0FBQzlCO0FBQ0EsbUJBQU8sQ0FBQyx1Q0FBMkI7QUFDbkMsbUJBQU8sQ0FBQyw0Q0FBZ0M7QUFDeEM7QUFDQSxtQkFBTyxDQUFDLG1DQUF1QjtBQUMvQixtQkFBTyxDQUFDLHdDQUE0QjtBQUNwQyxtQkFBTyxDQUFDLHVDQUEyQjtBQUNuQyxtQkFBTyxDQUFDLHlDQUE2QjtBQUNyQyxtQkFBTyxDQUFDLHVDQUEyQjtBQUNuQyxtQkFBTyxDQUFDLGtDQUFzQjtBQUM5QixtQkFBTyxDQUFDLHVDQUEyQjtBQUNuQyxtQkFBTyxDQUFDLDBDQUE4QjtBQUN0QyxtQkFBTyxDQUFDLG1DQUF1QjtBQUMvQixtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLHdDQUE0QjtBQUNwQyxtQkFBTyxDQUFDLGtDQUFzQjtBQUM5QixtQkFBTyxDQUFDLDBDQUE4QjtBQUN0QyxtQkFBTyxDQUFDLHFDQUF5QjtBQUNqQyxtQkFBTyxDQUFDLHlDQUE2QjtBQUNyQyxtQkFBTyxDQUFDLDJDQUErQjtBQUN2QyxtQkFBTyxDQUFDLGtDQUFzQjtBQUM5QixtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLHFDQUF5QjtBQUNqQyxtQkFBTyxDQUFDLGlEQUFxQztBQUM3QyxtQkFBTyxDQUFDLG9EQUF3QztBQUNoRCxtQkFBTyxDQUFDLCtCQUFtQjtBQUMzQixtQkFBTyxDQUFDLG9DQUF3QjtBQUNoQyxtQkFBTyxDQUFDLHVDQUEyQjtBQUNuQyxtQkFBTyxDQUFDLG1DQUF1QjtBQUMvQixtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLG1DQUF1QjtBQUMvQixtQkFBTyxDQUFDLG9DQUF3QjtBQUNoQyxtQkFBTyxDQUFDLGlDQUFxQjtBQUM3QixtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLGtDQUFzQjtBQUM5QixtQkFBTyxDQUFDLG9DQUF3QjtBQUNoQyxtQkFBTyxDQUFDLDJDQUErQjtBQUN2QyxtQkFBTyxDQUFDLG9DQUF3QjtBQUNoQyxtQkFBTyxDQUFDLGtDQUFzQjtBQUM5QixtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLGlDQUFxQjtBQUM3QixtQkFBTyxDQUFDLGdDQUFvQjtBQUM1QixtQkFBTyxDQUFDLGtDQUFzQjtBQUM5QixtQkFBTyxDQUFDLGdDQUFvQjtBQUM1QixtQkFBTyxDQUFDLGtDQUFzQjtBQUM5QixtQkFBTyxDQUFDLHdDQUE0QjtBQUNwQyxtQkFBTyxDQUFDLGdDQUFvQjtBQUM1QixtQkFBTyxDQUFDLGtDQUFzQjtBQUM5QixtQkFBTyxDQUFDLHFDQUF5QjtBQUNqQyxtQkFBTyxDQUFDLHFDQUF5QjtBQUNqQyxtQkFBTyxDQUFDLHVDQUEyQjtBQUNuQyxtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLGdDQUFvQjtBQUM1QixtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLDhDQUFrQztBQUMxQyxtQkFBTyxDQUFDLHFDQUF5QjtBQUNqQyxtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLGtDQUFzQjtBQUM5QixtQkFBTyxDQUFDLG9DQUF3QjtBQUNoQyxtQkFBTyxDQUFDLDRDQUFnQztBQUN4QyxtQkFBTyxDQUFDLDBDQUE4QjtBQUN0QyxtQkFBTyxDQUFDLHdDQUE0QjtBQUNwQyxtQkFBTyxDQUFDLGlDQUFxQjtBQUM3QixtQkFBTyxDQUFDLG1DQUF1QjtBQUMvQixtQkFBTyxDQUFDLG1DQUF1QjtBQUMvQixtQkFBTyxDQUFDLHVDQUEyQjtBQUNuQyxtQkFBTyxDQUFDLGtDQUFzQjtBQUM5QixtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLG1DQUF1QjtBQUMvQixtQkFBTyxDQUFDLHVDQUEyQjtBQUNuQyxtQkFBTyxDQUFDLGlDQUFxQjtBQUM3QixtQkFBTyxDQUFDLDBDQUE4QjtBQUN0QyxtQkFBTyxDQUFDLGtDQUFzQjtBQUM5QixtQkFBTyxDQUFDLHdDQUE0QjtBQUNwQyxtQkFBTyxDQUFDLG1DQUF1QjtBQUMvQixtQkFBTyxDQUFDLGlDQUFxQjtBQUM3QixtQkFBTyxDQUFDLHFDQUF5QjtBQUNqQyxtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLHdDQUE0QjtBQUNwQyxtQkFBTyxDQUFDLG1DQUF1QjtBQUMvQixtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLHdDQUE0QjtBQUNwQyxtQkFBTyxDQUFDLGlDQUFxQjtBQUM3QixtQkFBTyxDQUFDLHFDQUF5QjtBQUNqQyxtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLHFDQUF5QjtBQUNqQyxtQkFBTyxDQUFDLHlDQUE2QjtBQUNyQyxtQkFBTyxDQUFDLHlDQUE2QjtBQUNyQyxtQkFBTyxDQUFDLG9DQUF3QjtBQUNoQyxtQkFBTyxDQUFDLHdDQUE0QjtBQUNwQyxtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLG9DQUF3QjtBQUNoQyxtQkFBTyxDQUFDLHNDQUEwQjtBQUNsQyxtQkFBTyxDQUFDLG1DQUF1QjtBQUMvQixtQkFBTyxDQUFDLHdDQUE0QjtBQUNwQyxtQkFBTyxDQUFDLHVDQUEyQjtBQUNuQyxtQkFBTyxDQUFDLHlDQUE2QjtBQUNyQyxtQkFBTyxDQUFDLHVDQUEyQjtBQUNuQyxtQkFBTyxDQUFDLDJDQUErQjtBQUN2QyxtQkFBTyxDQUFDLGdDQUFvQjtBQUM1QixtQkFBTyxDQUFDLG1DQUF1QjtBQUMvQjtBQUNBLGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbUJBQU8sQ0FBQywwQkFBYztBQUN0QztBQUNBLGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxtQkFBTyxDQUFDLHVCQUFXO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQiwrQkFBK0IsbUJBQU8sQ0FBQyx5Q0FBNkI7QUFDcEUsK0JBQStCLG1CQUFPLENBQUMseUNBQTZCO0FBQ3BFO0FBQ0E7QUFDQSxpQkFBaUIsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDekM7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGNBQWMsVUFBVTtBQUN4QjtBQUNBLGNBQWMsVUFBVTtBQUN4QjtBQUNBO0FBQ0EsY0FBYyxVQUFVO0FBQ3hCO0FBQ0EsY0FBYyxVQUFVO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGNBQWMsY0FBYztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxjQUFjO0FBQzVCO0FBQ0EsY0FBYyxjQUFjO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Qjs7Ozs7Ozs7Ozs7OztBQ3hOYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixpQkFBaUIsbUJBQU8sQ0FBQyxxQ0FBeUI7QUFDbEQ7QUFDQSxvQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLG1CQUFtQixtQkFBTyxDQUFDLHVDQUEyQjtBQUN0RDtBQUNBLHNDOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0Isc0JBQXNCLG1CQUFPLENBQUMsMENBQThCO0FBQzVEO0FBQ0EseUM7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQjtBQUNBLG9DOzs7Ozs7Ozs7Ozs7O0FDSmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxxQkFBcUI7QUFDN0IsUUFBUSxxQkFBcUI7QUFDN0IsUUFBUSxxQkFBcUI7QUFDN0IsUUFBUSxxQkFBcUI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUDtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQSxXQUFXLFNBQVM7QUFDcEIsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0Q7Ozs7Ozs7Ozs7Ozs7QUMvQ2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxZQUFZO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBLElBQUk7QUFDSjtBQUNBLFNBQVM7QUFDVDtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLE9BQU87QUFDbEIsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixXQUFXO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLHFDOzs7Ozs7Ozs7Ozs7O0FDdERhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCO0FBQ0EsaUM7Ozs7Ozs7Ozs7Ozs7QUNKYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixrQkFBa0IsbUJBQU8sQ0FBQyxzQ0FBMEI7QUFDcEQ7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQzs7Ozs7Ozs7Ozs7OztBQ2JhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQSx3REFBd0Qsb0JBQW9CO0FBQzVFO0FBQ0E7QUFDQSxJQUFJLG9CQUFvQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDOzs7Ozs7Ozs7Ozs7O0FDL0NhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixpQkFBaUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0EsV0FBVyxVQUFVLHdCQUF3QixpQkFBaUI7QUFDOUQ7QUFDQSxZQUFZLGNBQWM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtQ0FBbUM7QUFDbEU7QUFDQTtBQUNBO0FBQ0EscUM7Ozs7Ozs7Ozs7Ozs7QUNuRGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsaUJBQWlCLG1CQUFPLENBQUMscUNBQXlCO0FBQ2xEO0FBQ0Esb0M7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixlQUFlLG1CQUFPLENBQUMsbUNBQXVCO0FBQzlDO0FBQ0Esa0M7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixzQkFBc0IsbUJBQU8sQ0FBQywwQ0FBOEI7QUFDNUQ7QUFDQSx5Qzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLFlBQVksbUJBQU8sQ0FBQyxnQ0FBb0I7QUFDeEM7QUFDQSwrQjs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGNBQWMsbUJBQU8sQ0FBQyxrQ0FBc0I7QUFDNUM7QUFDQSxpQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsdUNBQXVDO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBLG9DOzs7Ozs7Ozs7Ozs7O0FDcERhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsVUFBVSxrQkFBa0IsaUJBQWlCO0FBQ3hEO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix1QkFBdUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDOzs7Ozs7Ozs7Ozs7O0FDMUJhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGlCQUFpQixtQkFBTyxDQUFDLHFDQUF5QjtBQUNsRDtBQUNBLG9DOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0Isa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLFlBQVk7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELGlCQUFpQjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVLGlDQUFpQyxvQkFBb0I7QUFDMUU7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG1DQUFtQztBQUNsRTtBQUNBO0FBQ0E7QUFDQSx3Qzs7Ozs7Ozs7Ozs7OztBQ3ZEYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQywrQkFBK0IsbUJBQU8sQ0FBQyx5Q0FBNkI7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxtQkFBbUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFdBQVcsMENBQTBDO0FBQ3JEO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsUUFBUSxpQ0FBaUM7QUFDekMsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIseURBQXlEO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLG9DOzs7Ozs7Ozs7Ozs7O0FDakRhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGlCQUFpQixtQkFBTyxDQUFDLHFDQUF5QjtBQUNsRDtBQUNBLG9DOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsZUFBZSxtQkFBTyxDQUFDLG1DQUF1QjtBQUM5QztBQUNBLGtDOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUM7Ozs7Ozs7Ozs7Ozs7QUNqQmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEM7Ozs7Ozs7Ozs7Ozs7QUNqQmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsbUJBQW1CLG1CQUFPLENBQUMsdUNBQTJCO0FBQ3REO0FBQ0Esc0M7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0ZBQStGLGdCQUFnQjtBQUMvRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7Ozs7Ozs7QUM3RWE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFVBQVU7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFdBQVcsVUFBVTtBQUNyQjtBQUNBLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUM7Ozs7Ozs7Ozs7Ozs7QUNyQ2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGVBQWU7QUFDMUIsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQzs7Ozs7Ozs7Ozs7OztBQ3BCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixlQUFlLG1CQUFPLENBQUMsbUNBQXVCO0FBQzlDO0FBQ0Esa0M7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyx5Q0FBeUM7QUFDcEQ7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQ3JCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixrQkFBa0IsbUJBQU8sQ0FBQyxzQ0FBMEI7QUFDcEQ7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCO0FBQ0Esb0M7Ozs7Ozs7Ozs7Ozs7QUNKYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixpQkFBaUIsbUJBQU8sQ0FBQyxxQ0FBeUI7QUFDbEQ7QUFDQSxvQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsV0FBVyxVQUFVLGlDQUFpQyxvQkFBb0I7QUFDMUU7QUFDQSxZQUFZLGNBQWM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtQ0FBbUM7QUFDbEU7QUFDQTtBQUNBO0FBQ0Esc0M7Ozs7Ozs7Ozs7Ozs7QUM3Q2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0Isc0JBQXNCLG1CQUFPLENBQUMsMENBQThCO0FBQzVEO0FBQ0EseUM7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQjtBQUNBLDRDOzs7Ozs7Ozs7Ozs7O0FDSmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsYUFBYSxtQkFBTyxDQUFDLGlDQUFxQjtBQUMxQztBQUNBLGdDOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixXQUFXLHVCQUF1QixXQUFXO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQSxXQUFXLDZDQUE2QztBQUN4RDtBQUNBLFdBQVcsRUFBRTtBQUNiLFlBQVksY0FBYztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDOzs7Ozs7Ozs7Ozs7O0FDNURhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0EsV0FBVywyQ0FBMkM7QUFDdEQ7QUFDQTtBQUNBLFlBQVksY0FBYztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQzNDYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQjtBQUNBO0FBQ0EsaUM7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixvQkFBb0IsbUJBQU8sQ0FBQyx3Q0FBNEI7QUFDeEQ7QUFDQSx1Qzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEM7Ozs7Ozs7Ozs7Ozs7QUNsRGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IscUJBQXFCLG1CQUFPLENBQUMseUNBQTZCO0FBQzFEO0FBQ0Esd0M7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixrQkFBa0IsbUJBQU8sQ0FBQyxzQ0FBMEI7QUFDcEQ7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGdCQUFnQixtQkFBTyxDQUFDLG9DQUF3QjtBQUNoRDtBQUNBLG1DOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0EsV0FBVyxrRUFBa0U7QUFDN0U7QUFDQSxXQUFXLEVBQUU7QUFDYjtBQUNBLFlBQVksY0FBYztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQzs7Ozs7Ozs7Ozs7OztBQ3ZEYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixvQkFBb0IsbUJBQU8sQ0FBQyx3Q0FBNEI7QUFDeEQ7QUFDQSx1Qzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCO0FBQ0Esb0M7Ozs7Ozs7Ozs7Ozs7QUNKYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG9CQUFvQjtBQUM5QywwQkFBMEIsb0JBQW9CO0FBQzlDLDBCQUEwQixxQkFBcUI7QUFDL0M7QUFDQSw0REFBNEQ7QUFDNUQ7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLFlBQVksY0FBYztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCOzs7Ozs7Ozs7Ozs7O0FDdENhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGdCQUFnQixtQkFBTyxDQUFDLG9DQUF3QjtBQUNoRDtBQUNBLG1DOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsa0JBQWtCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQSxZQUFZLDBCQUEwQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLHNCQUFzQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx1Qzs7Ozs7Ozs7Ozs7OztBQ3hEYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsWUFBWTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFdBQVcsa0VBQWtFO0FBQzdFO0FBQ0EsV0FBVyxJQUFJO0FBQ2Y7QUFDQSxZQUFZLGNBQWM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDOzs7Ozs7Ozs7Ozs7O0FDekNhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGdDQUFnQyxtQkFBTyxDQUFDLG9EQUF3QztBQUNoRjtBQUNBLG1EOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixzRkFBc0Y7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFdBQVcsV0FBVztBQUN0QixXQUFXLFNBQVM7QUFDcEIsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Qzs7Ozs7Ozs7Ozs7OztBQzNEYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixjQUFjLG1CQUFPLENBQUMsa0NBQXNCO0FBQzVDO0FBQ0EsaUM7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixxQkFBcUIsbUJBQU8sQ0FBQyx5Q0FBNkI7QUFDMUQ7QUFDQSx3Qzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLCtCQUErQixtQkFBTyxDQUFDLHlDQUE2QjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUM7Ozs7Ozs7Ozs7Ozs7QUNqRWE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsK0JBQStCLG1CQUFPLENBQUMseUNBQTZCO0FBQ3BFLGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksaUJBQWlCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBLFdBQVcsVUFBVSxpQ0FBaUMsb0JBQW9CO0FBQzFFO0FBQ0EsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbUNBQW1DO0FBQ2xFLDRCQUE0Qix5REFBeUQ7QUFDckY7QUFDQTtBQUNBO0FBQ0Esd0M7Ozs7Ozs7Ozs7Ozs7QUNsRGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsbUJBQW1CLG1CQUFPLENBQUMsdUNBQTJCO0FBQ3REO0FBQ0Esc0M7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixvQkFBb0IsbUJBQU8sQ0FBQyx3Q0FBNEI7QUFDeEQ7QUFDQSx1Qzs7Ozs7Ozs7Ozs7O0FDTEE7QUFDQTtBQUNBLHFDOzs7Ozs7Ozs7Ozs7O0FDRmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFlBQVksd0JBQXdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLFdBQVcsRUFBRTtBQUNiLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUM7Ozs7Ozs7Ozs7Ozs7QUNqRGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0I7QUFDQSxpQzs7Ozs7Ozs7Ozs7OztBQ0phO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGFBQWE7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0EsV0FBVyxnQkFBZ0I7QUFDM0I7QUFDQSxZQUFZLDBCQUEwQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0M7Ozs7Ozs7Ozs7Ozs7QUMzQ2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0I7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQ0phO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDOzs7Ozs7Ozs7Ozs7O0FDbEVhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGdCQUFnQixtQkFBTyxDQUFDLG9DQUF3QjtBQUNoRDtBQUNBO0FBQ0EsbUM7Ozs7Ozs7Ozs7Ozs7QUNOYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxhQUFhO0FBQ2xELDJCQUEyQixhQUFhO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsYUFBYTtBQUNqRSxpQkFBaUIsYUFBYTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxXQUFXLDJDQUEyQztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxJQUFJO0FBQ2Y7QUFDQSxZQUFZLCtCQUErQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQ2hEYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixtQkFBbUIsbUJBQU8sQ0FBQyx1Q0FBMkI7QUFDdEQ7QUFDQSxzQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsaUJBQWlCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFdBQVcsdUJBQXVCO0FBQ2xDO0FBQ0E7QUFDQSxZQUFZLDBCQUEwQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0M7Ozs7Ozs7Ozs7Ozs7QUM3Q2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsY0FBYyxtQkFBTyxDQUFDLGtDQUFzQjtBQUM1QztBQUNBLGlDOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFLDRCQUE0QjtBQUN0RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFGQUFxRixjQUFjO0FBQ25HLElBQUksbUJBQW1CLEdBQUcsc0JBQXNCLE1BQU0sb0JBQW9CLGVBQWUsY0FBYztBQUN2RyxJQUFJLGtCQUFrQixHQUFHLHNCQUFzQixLQUFLLG9CQUFvQjtBQUN4RTtBQUNBO0FBQ0EscUJBQXFCLGNBQWMsS0FBSyxvQkFBb0I7QUFDNUQsdUJBQXVCLFlBQVksTUFBTSxrQkFBa0I7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQSxXQUFXLGlCQUFpQjtBQUM1QjtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLFlBQVksdUNBQXVDO0FBQ25ELHNDQUFzQyw0QkFBNEI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDOzs7Ozs7Ozs7Ozs7O0FDdEdhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFlBQVksd0JBQXdCO0FBQ3BDO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDOzs7Ozs7Ozs7Ozs7O0FDeENhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFdBQVcscUNBQXFDO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsSUFBSTtBQUNmO0FBQ0EsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQjs7Ozs7Ozs7Ozs7OztBQ3hDYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixxQkFBcUIsbUJBQU8sQ0FBQyx5Q0FBNkI7QUFDMUQ7QUFDQSx3Qzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGdCQUFnQixtQkFBTyxDQUFDLG9DQUF3QjtBQUNoRDtBQUNBLG1DOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0Isa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxXQUFXLFlBQVk7QUFDdkI7QUFDQSxXQUFXLFVBQVU7QUFDckIsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG1DQUFtQztBQUNsRTtBQUNBO0FBQ0E7QUFDQSxtQzs7Ozs7Ozs7Ozs7OztBQzFFYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxJQUFJO0FBQ2Y7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQzs7Ozs7Ozs7Ozs7OztBQy9CYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxXQUFXO0FBQ3RCO0FBQ0EsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQ25CYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixxQkFBcUIsbUJBQU8sQ0FBQyx5Q0FBNkI7QUFDMUQ7QUFDQSx3Qzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG1DQUFtQztBQUNsRTtBQUNBO0FBQ0E7QUFDQSx3Qzs7Ozs7Ozs7Ozs7OztBQ2ZhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGFBQWEsbUJBQU8sQ0FBQyxpQ0FBcUI7QUFDMUM7QUFDQSxnQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG1DQUFtQztBQUNsRTtBQUNBO0FBQ0E7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQ2ZhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRSxhQUFhO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsZ0JBQWdCO0FBQzlFLDBGQUEwRixZQUFZO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZUFBZTtBQUN0QztBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkM7Ozs7Ozs7Ozs7Ozs7QUN6RWE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0Isa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRCwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQSxXQUFXLFlBQVk7QUFDdkI7QUFDQSxXQUFXLFVBQVU7QUFDckI7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtQ0FBbUM7QUFDbEU7QUFDQTtBQUNBO0FBQ0EsaUM7Ozs7Ozs7Ozs7Ozs7QUNoRGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsYUFBYSxtQkFBTyxDQUFDLHVCQUFXO0FBQ2hDO0FBQ0EsZ0M7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQjtBQUNBLGlDOzs7Ozs7Ozs7Ozs7O0FDSmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsSUFBSTtBQUNmLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDOzs7Ozs7Ozs7Ozs7O0FDckJhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGNBQWMsbUJBQU8sQ0FBQyxrQ0FBc0I7QUFDNUM7QUFDQSxpQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQSxXQUFXLHVCQUF1QjtBQUNsQztBQUNBLFlBQVksZ0JBQWdCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0M7Ozs7Ozs7Ozs7Ozs7QUN4Q2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQ3ZEYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQix1QkFBdUIsbUJBQU8sQ0FBQywyQ0FBK0I7QUFDOUQ7QUFDQSwwQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsZ0JBQWdCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0EsV0FBVywwQ0FBMEM7QUFDckQ7QUFDQTtBQUNBLFlBQVksY0FBYztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUM7Ozs7Ozs7Ozs7Ozs7QUMvQ2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0I7QUFDQSxpQzs7Ozs7Ozs7Ozs7OztBQ0phO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCO0FBQ0EsWUFBWSxnQkFBZ0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDOzs7Ozs7Ozs7Ozs7O0FDdkNhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGNBQWMsbUJBQU8sQ0FBQyxrQ0FBc0I7QUFDNUM7QUFDQSxpQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGdCQUFnQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDOzs7Ozs7Ozs7Ozs7O0FDdkRhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGtCQUFrQixtQkFBTyxDQUFDLHNDQUEwQjtBQUNwRDtBQUNBLHFDOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxhQUFhO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixhQUFhO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFdBQVcsNkNBQTZDO0FBQ3hEO0FBQ0EsV0FBVyxJQUFJO0FBQ2YsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0M7Ozs7Ozs7Ozs7Ozs7QUNoRGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0Isa0JBQWtCLG1CQUFPLENBQUMsc0NBQTBCO0FBQ3BEO0FBQ0EscUM7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixnQkFBZ0IsbUJBQU8sQ0FBQyxvQ0FBd0I7QUFDaEQ7QUFDQSxtQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQzs7Ozs7Ozs7Ozs7OztBQ2xCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix1QkFBdUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCOzs7Ozs7Ozs7Ozs7O0FDbEJhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCO0FBQ0EsZ0M7Ozs7Ozs7Ozs7Ozs7QUNKYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixZQUFZLG1CQUFPLENBQUMsZ0NBQW9CO0FBQ3hDO0FBQ0EsK0I7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixrQkFBa0IsbUJBQU8sQ0FBQyxzQ0FBMEI7QUFDcEQ7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0EsV0FBVyw4REFBOEQ7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUM7Ozs7Ozs7Ozs7Ozs7QUN2RGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsbUJBQW1CLG1CQUFPLENBQUMsdUNBQTJCO0FBQ3REO0FBQ0Esc0M7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixlQUFlLG1CQUFPLENBQUMsbUNBQXVCO0FBQzlDO0FBQ0Esa0M7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGVBQWU7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0EsV0FBVyxvREFBb0Q7QUFDL0Q7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyx1Q0FBdUM7QUFDdkU7QUFDQTtBQUNBO0FBQ0Esb0M7Ozs7Ozs7Ozs7Ozs7QUMxRGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0EsWUFBWSxnQkFBZ0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MseUJBQXlCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBLHVDOzs7Ozs7Ozs7Ozs7O0FDakRhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLCtCQUErQixtQkFBTyxDQUFDLHlDQUE2QjtBQUNwRSxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7Ozs7OztBQzNCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixnQkFBZ0IsbUJBQU8sQ0FBQyxvQ0FBd0I7QUFDaEQ7QUFDQSxtQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGNBQWMsbUJBQU8sQ0FBQyxrQ0FBc0I7QUFDNUM7QUFDQSxpQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7Ozs7Ozs7QUNyQmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0Isa0JBQWtCLG1CQUFPLENBQUMsc0NBQTBCO0FBQ3BEO0FBQ0EscUM7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixvQkFBb0IsbUJBQU8sQ0FBQyx3Q0FBNEI7QUFDeEQ7QUFDQSx1Qzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksY0FBYztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDOzs7Ozs7Ozs7Ozs7O0FDdkJhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQzs7Ozs7Ozs7Ozs7OztBQ2JhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCO0FBQ0EsaUM7Ozs7Ozs7Ozs7Ozs7QUNKYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxZQUFZO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFdBQVcsK0JBQStCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsV0FBVztBQUN0QjtBQUNBLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQ3BEYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQjtBQUNBLCtCOzs7Ozs7Ozs7Ozs7O0FDSmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxXQUFXO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVywwQ0FBMEM7QUFDckQ7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLFlBQVksY0FBYztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyx1Q0FBdUM7QUFDdkU7QUFDQTtBQUNBO0FBQ0EscUM7Ozs7Ozs7Ozs7Ozs7QUN2Q2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQSxXQUFXLElBQUk7QUFDZjtBQUNBLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MscUJBQXFCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLDBDOzs7Ozs7Ozs7Ozs7O0FDdkNhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCO0FBQ0EsaUM7Ozs7Ozs7Ozs7Ozs7QUNKYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixjQUFjLG1CQUFPLENBQUMsa0NBQXNCO0FBQzVDO0FBQ0EsaUM7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLG1CQUFtQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCO0FBQ0EsV0FBVywrQkFBK0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwQkFBMEI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDOzs7Ozs7Ozs7Ozs7O0FDaERhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsYUFBYTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFdBQVcsb0RBQW9EO0FBQy9EO0FBQ0E7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQzlDYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7Ozs7Ozs7QUNoQmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsYUFBYSxtQkFBTyxDQUFDLGlDQUFxQjtBQUMxQztBQUNBLGdDOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCO0FBQ0EscUNBQXFDLGdCQUFnQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQSxXQUFXLGdCQUFnQjtBQUMzQjtBQUNBLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDOzs7Ozs7Ozs7Ozs7O0FDMUNhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGVBQWUsbUJBQU8sQ0FBQyxtQ0FBdUI7QUFDOUM7QUFDQSxrQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCOzs7Ozs7Ozs7Ozs7O0FDWmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsZUFBZSxtQkFBTyxDQUFDLG1DQUF1QjtBQUM5QztBQUNBLGtDOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0I7QUFDQSxpQzs7Ozs7Ozs7Ozs7OztBQ0phO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGVBQWUsbUJBQU8sQ0FBQyxtQ0FBdUI7QUFDOUM7QUFDQTtBQUNBLGtDOzs7Ozs7Ozs7Ozs7O0FDTmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0Isa0JBQWtCLG1CQUFPLENBQUMsc0NBQTBCO0FBQ3BEO0FBQ0EscUM7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0EsV0FBVyxnQkFBZ0I7QUFDM0I7QUFDQSxXQUFXLFVBQVU7QUFDckI7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0M7Ozs7Ozs7Ozs7Ozs7QUM3RGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsYUFBYSxtQkFBTyxDQUFDLGlDQUFxQjtBQUMxQztBQUNBLGdDOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGVBQWU7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFlBQVksY0FBYztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQzs7Ozs7Ozs7Ozs7OztBQ2pEYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixrQkFBa0IsbUJBQU8sQ0FBQyxzQ0FBMEI7QUFDcEQ7QUFDQSxxQzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsNEJBQWdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFlBQVkscUJBQXFCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQzs7Ozs7Ozs7Ozs7OztBQzFDYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQSxXQUFXLFdBQVc7QUFDdEI7QUFDQTtBQUNBLFlBQVksY0FBYztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUM7Ozs7Ozs7Ozs7Ozs7QUN6Q2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0Isb0JBQW9CLG1CQUFPLENBQUMsd0NBQTRCO0FBQ3hEO0FBQ0EsdUM7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixvQkFBb0IsbUJBQU8sQ0FBQyx3Q0FBNEI7QUFDeEQ7QUFDQSx1Qzs7Ozs7Ozs7Ozs7OztBQ0xhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCO0FBQ0EseUM7Ozs7Ozs7Ozs7Ozs7QUNKYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixtQkFBbUIsbUJBQU8sQ0FBQyx1Q0FBMkI7QUFDdEQ7QUFDQTtBQUNBLHNDOzs7Ozs7Ozs7Ozs7O0FDTmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0Isa0JBQWtCLG1CQUFPLENBQUMsc0NBQTBCO0FBQ3BEO0FBQ0EscUM7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQjtBQUNBLDZDOzs7Ozs7Ozs7Ozs7O0FDSmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsbUJBQW1CO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLG1CQUFtQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0EsV0FBVywwQ0FBMEM7QUFDckQ7QUFDQTtBQUNBLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQzs7Ozs7Ozs7Ozs7OztBQ2pEYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQjtBQUNBLDhCOzs7Ozs7Ozs7Ozs7O0FDSmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Qzs7Ozs7Ozs7Ozs7OztBQ1ZhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBLHFDOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQSxXQUFXLFNBQVM7QUFDcEIsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDOzs7Ozs7Ozs7Ozs7O0FDdkJhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLG9CQUFvQixtQkFBTyxDQUFDLHdDQUE0QjtBQUN4RDtBQUNBLHVDOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxxQkFBcUI7QUFDN0IsUUFBUSxxQkFBcUI7QUFDN0IsUUFBUSxxQkFBcUI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsT0FBTztBQUNQO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVDtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLFdBQVc7QUFDdEIsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0M7Ozs7Ozs7Ozs7Ozs7QUNwRGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsaUJBQWlCLG1CQUFPLENBQUMscUNBQXlCO0FBQ2xEO0FBQ0E7QUFDQSxvQzs7Ozs7Ozs7Ozs7OztBQ05hO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLHVCQUF1QixtQkFBTyxDQUFDLDJDQUErQjtBQUM5RDtBQUNBLDBDOzs7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0Isa0JBQWtCLG1CQUFPLENBQUMsc0NBQTBCO0FBQ3BEO0FBQ0EscUM7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDRCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxlQUFlO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQSxXQUFXLGdCQUFnQjtBQUMzQjtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLHVDQUF1QztBQUN2RTtBQUNBO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7Ozs7OztBQzFDYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixrQkFBa0IsbUJBQU8sQ0FBQyw0QkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxZQUFZO0FBQ3ZCO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsVUFBVTtBQUNyQixZQUFZLGNBQWM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtQ0FBbUM7QUFDbEU7QUFDQTtBQUNBO0FBQ0EsdUMiLCJmaWxlIjoibnBtLnJ4anMtY29tcGF0LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGxldF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL2xldFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5sZXQgPSBsZXRfMS5sZXRQcm90bztcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5sZXRCaW5kID0gbGV0XzEubGV0UHJvdG87XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sZXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgb2JzZXJ2ZU9uXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3Ivb2JzZXJ2ZU9uXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLm9ic2VydmVPbiA9IG9ic2VydmVPbl8xLm9ic2VydmVPbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmVPbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciByZXRyeV8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3JldHJ5XCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLnJldHJ5ID0gcmV0cnlfMS5yZXRyeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJldHJ5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGRpc3RpbmN0VW50aWxDaGFuZ2VkXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvZGlzdGluY3RVbnRpbENoYW5nZWRcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUuZGlzdGluY3RVbnRpbENoYW5nZWQgPSBkaXN0aW5jdFVudGlsQ2hhbmdlZF8xLmRpc3RpbmN0VW50aWxDaGFuZ2VkO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGlzdGluY3RVbnRpbENoYW5nZWQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5jb25jYXQgPSByeGpzXzEuY29uY2F0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uY2F0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIHRpbWVzdGFtcF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3RpbWVzdGFtcFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS50aW1lc3RhbXAgPSB0aW1lc3RhbXBfMS50aW1lc3RhbXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aW1lc3RhbXAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBDcmVhdGVzIGFuIG91dHB1dCBPYnNlcnZhYmxlIHdoaWNoIGNvbmN1cnJlbnRseSBlbWl0cyBhbGwgdmFsdWVzIGZyb20gZXZlcnlcbiAqIGdpdmVuIGlucHV0IE9ic2VydmFibGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkZsYXR0ZW5zIG11bHRpcGxlIE9ic2VydmFibGVzIHRvZ2V0aGVyIGJ5IGJsZW5kaW5nXG4gKiB0aGVpciB2YWx1ZXMgaW50byBvbmUgT2JzZXJ2YWJsZS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9tZXJnZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgbWVyZ2VgIHN1YnNjcmliZXMgdG8gZWFjaCBnaXZlbiBpbnB1dCBPYnNlcnZhYmxlIChlaXRoZXIgdGhlIHNvdXJjZSBvciBhblxuICogT2JzZXJ2YWJsZSBnaXZlbiBhcyBhcmd1bWVudCksIGFuZCBzaW1wbHkgZm9yd2FyZHMgKHdpdGhvdXQgZG9pbmcgYW55XG4gKiB0cmFuc2Zvcm1hdGlvbikgYWxsIHRoZSB2YWx1ZXMgZnJvbSBhbGwgdGhlIGlucHV0IE9ic2VydmFibGVzIHRvIHRoZSBvdXRwdXRcbiAqIE9ic2VydmFibGUuIFRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBvbmx5IGNvbXBsZXRlcyBvbmNlIGFsbCBpbnB1dCBPYnNlcnZhYmxlc1xuICogaGF2ZSBjb21wbGV0ZWQuIEFueSBlcnJvciBkZWxpdmVyZWQgYnkgYW4gaW5wdXQgT2JzZXJ2YWJsZSB3aWxsIGJlIGltbWVkaWF0ZWx5XG4gKiBlbWl0dGVkIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5NZXJnZSB0b2dldGhlciB0d28gT2JzZXJ2YWJsZXM6IDFzIGludGVydmFsIGFuZCBjbGlja3M8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHRpbWVyID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKTtcbiAqIHZhciBjbGlja3NPclRpbWVyID0gY2xpY2tzLm1lcmdlKHRpbWVyKTtcbiAqIGNsaWNrc09yVGltZXIuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk1lcmdlIHRvZ2V0aGVyIDMgT2JzZXJ2YWJsZXMsIGJ1dCBvbmx5IDIgcnVuIGNvbmN1cnJlbnRseTwvY2FwdGlvbj5cbiAqIHZhciB0aW1lcjEgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApLnRha2UoMTApO1xuICogdmFyIHRpbWVyMiA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMjAwMCkudGFrZSg2KTtcbiAqIHZhciB0aW1lcjMgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDUwMCkudGFrZSgxMCk7XG4gKiB2YXIgY29uY3VycmVudCA9IDI7IC8vIHRoZSBhcmd1bWVudFxuICogdmFyIG1lcmdlZCA9IHRpbWVyMS5tZXJnZSh0aW1lcjIsIHRpbWVyMywgY29uY3VycmVudCk7XG4gKiBtZXJnZWQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIG1lcmdlQWxsfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VNYXB9XG4gKiBAc2VlIHtAbGluayBtZXJnZU1hcFRvfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VTY2FufVxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZUlucHV0fSBvdGhlciBBbiBpbnB1dCBPYnNlcnZhYmxlIHRvIG1lcmdlIHdpdGggdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZS4gTW9yZSB0aGFuIG9uZSBpbnB1dCBPYnNlcnZhYmxlcyBtYXkgYmUgZ2l2ZW4gYXMgYXJndW1lbnQuXG4gKiBAcGFyYW0ge251bWJlcn0gW2NvbmN1cnJlbnQ9TnVtYmVyLlBPU0lUSVZFX0lORklOSVRZXSBNYXhpbXVtIG51bWJlciBvZiBpbnB1dFxuICogT2JzZXJ2YWJsZXMgYmVpbmcgc3Vic2NyaWJlZCB0byBjb25jdXJyZW50bHkuXG4gKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcj1udWxsXSBUaGUgSVNjaGVkdWxlciB0byB1c2UgZm9yIG1hbmFnaW5nXG4gKiBjb25jdXJyZW5jeSBvZiBpbnB1dCBPYnNlcnZhYmxlcy5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBpdGVtcyB0aGF0IGFyZSB0aGUgcmVzdWx0IG9mXG4gKiBldmVyeSBpbnB1dCBPYnNlcnZhYmxlLlxuICogQG1ldGhvZCBtZXJnZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoKSB7XG4gICAgdmFyIG9ic2VydmFibGVzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgb2JzZXJ2YWJsZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubGlmdC5jYWxsKHJ4anNfMS5tZXJnZS5hcHBseSh2b2lkIDAsIFt0aGlzXS5jb25jYXQob2JzZXJ2YWJsZXMpKSk7XG59XG5leHBvcnRzLm1lcmdlID0gbWVyZ2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciB0YWtlTGFzdF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3Rha2VMYXN0XCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLnRha2VMYXN0ID0gdGFrZUxhc3RfMS50YWtlTGFzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRha2VMYXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBDb2xsZWN0cyBhbGwgc291cmNlIGVtaXNzaW9ucyBhbmQgZW1pdHMgdGhlbSBhcyBhbiBhcnJheSB3aGVuIHRoZSBzb3VyY2UgY29tcGxldGVzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5HZXQgYWxsIHZhbHVlcyBpbnNpZGUgYW4gYXJyYXkgd2hlbiB0aGUgc291cmNlIGNvbXBsZXRlczwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3RvQXJyYXkucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYHRvQXJyYXlgIHdpbGwgd2FpdCB1bnRpbCB0aGUgc291cmNlIE9ic2VydmFibGUgY29tcGxldGVzXG4gKiBiZWZvcmUgZW1pdHRpbmcgdGhlIGFycmF5IGNvbnRhaW5pbmcgYWxsIGVtaXNzaW9ucy5cbiAqIFdoZW4gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGVycm9ycyBubyBhcnJheSB3aWxsIGJlIGVtaXR0ZWQuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+Q3JlYXRlIGFycmF5IGZyb20gaW5wdXQ8L2NhcHRpb24+XG4gKiBjb25zdCBpbnB1dCA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwKS50YWtlKDQpO1xuICpcbiAqIGlucHV0LnRvQXJyYXkoKVxuICogICAuc3Vic2NyaWJlKGFyciA9PiBjb25zb2xlLmxvZyhhcnIpKTsgLy8gWzAsMSwyLDNdXG4gKlxuICogQHNlZSB7QGxpbmsgYnVmZmVyfVxuICpcbiAqIEByZXR1cm4ge09ic2VydmFibGU8YW55W10+fFdlYlNvY2tldFN1YmplY3Q8VD58T2JzZXJ2YWJsZTxUPn1cbiAqIEBtZXRob2QgdG9BcnJheVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gdG9BcnJheSgpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEudG9BcnJheSgpKHRoaXMpO1xufVxuZXhwb3J0cy50b0FycmF5ID0gdG9BcnJheTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvQXJyYXkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5mcm9tRXZlbnRQYXR0ZXJuID0gcnhqc18xLmZyb21FdmVudFBhdHRlcm47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mcm9tRXZlbnRQYXR0ZXJuLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBtaXJyb3JzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB3aXRoIHRoZSBleGNlcHRpb24gb2YgYW4gYGVycm9yYC4gSWYgdGhlIHNvdXJjZSBPYnNlcnZhYmxlXG4gKiBjYWxscyBgZXJyb3JgLCB0aGlzIG1ldGhvZCB3aWxsIHJlc3Vic2NyaWJlIHRvIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBmb3IgYSBtYXhpbXVtIG9mIGBjb3VudGAgcmVzdWJzY3JpcHRpb25zIChnaXZlblxuICogYXMgYSBudW1iZXIgcGFyYW1ldGVyKSByYXRoZXIgdGhhbiBwcm9wYWdhdGluZyB0aGUgYGVycm9yYCBjYWxsLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvcmV0cnkucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogQW55IGFuZCBhbGwgaXRlbXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgd2lsbCBiZSBlbWl0dGVkIGJ5IHRoZSByZXN1bHRpbmcgT2JzZXJ2YWJsZSwgZXZlbiB0aG9zZSBlbWl0dGVkXG4gKiBkdXJpbmcgZmFpbGVkIHN1YnNjcmlwdGlvbnMuIEZvciBleGFtcGxlLCBpZiBhbiBPYnNlcnZhYmxlIGZhaWxzIGF0IGZpcnN0IGJ1dCBlbWl0cyBbMSwgMl0gdGhlbiBzdWNjZWVkcyB0aGUgc2Vjb25kXG4gKiB0aW1lIGFuZCBlbWl0czogWzEsIDIsIDMsIDQsIDVdIHRoZW4gdGhlIGNvbXBsZXRlIHN0cmVhbSBvZiBlbWlzc2lvbnMgYW5kIG5vdGlmaWNhdGlvbnNcbiAqIHdvdWxkIGJlOiBbMSwgMiwgMSwgMiwgMywgNCwgNSwgYGNvbXBsZXRlYF0uXG4gKiBAcGFyYW0ge251bWJlcn0gY291bnQgLSBOdW1iZXIgb2YgcmV0cnkgYXR0ZW1wdHMgYmVmb3JlIGZhaWxpbmcuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBUaGUgc291cmNlIE9ic2VydmFibGUgbW9kaWZpZWQgd2l0aCB0aGUgcmV0cnkgbG9naWMuXG4gKiBAbWV0aG9kIHJldHJ5XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiByZXRyeShjb3VudCkge1xuICAgIGlmIChjb3VudCA9PT0gdm9pZCAwKSB7IGNvdW50ID0gLTE7IH1cbiAgICByZXR1cm4gb3BlcmF0b3JzXzEucmV0cnkoY291bnQpKHRoaXMpO1xufVxuZXhwb3J0cy5yZXRyeSA9IHJldHJ5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmV0cnkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5iaW5kQ2FsbGJhY2sgPSByeGpzXzEuYmluZENhbGxiYWNrO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmluZENhbGxiYWNrLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGNhdGNoXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvY2F0Y2hcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUuY2F0Y2ggPSBjYXRjaF8xLl9jYXRjaDtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5fY2F0Y2ggPSBjYXRjaF8xLl9jYXRjaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNhdGNoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFsbCBvZiB0aGUgbm90aWZpY2F0aW9ucyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhcyBgbmV4dGBcbiAqIGVtaXNzaW9ucyBtYXJrZWQgd2l0aCB0aGVpciBvcmlnaW5hbCB0eXBlcyB3aXRoaW4ge0BsaW5rIE5vdGlmaWNhdGlvbn1cbiAqIG9iamVjdHMuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPldyYXBzIGBuZXh0YCwgYGVycm9yYCBhbmQgYGNvbXBsZXRlYCBlbWlzc2lvbnMgaW5cbiAqIHtAbGluayBOb3RpZmljYXRpb259IG9iamVjdHMsIGVtaXR0ZWQgYXMgYG5leHRgIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqIDwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL21hdGVyaWFsaXplLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBtYXRlcmlhbGl6ZWAgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYSBgbmV4dGAgbm90aWZpY2F0aW9uIGZvciBlYWNoXG4gKiBgbmV4dGAsIGBlcnJvcmAsIG9yIGBjb21wbGV0ZWAgZW1pc3Npb24gb2YgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiBXaGVuIHRoZVxuICogc291cmNlIE9ic2VydmFibGUgZW1pdHMgYGNvbXBsZXRlYCwgdGhlIG91dHB1dCBPYnNlcnZhYmxlIHdpbGwgZW1pdCBgbmV4dGAgYXNcbiAqIGEgTm90aWZpY2F0aW9uIG9mIHR5cGUgXCJjb21wbGV0ZVwiLCBhbmQgdGhlbiBpdCB3aWxsIGVtaXQgYGNvbXBsZXRlYCBhcyB3ZWxsLlxuICogV2hlbiB0aGUgc291cmNlIE9ic2VydmFibGUgZW1pdHMgYGVycm9yYCwgdGhlIG91dHB1dCB3aWxsIGVtaXQgYG5leHRgIGFzIGFcbiAqIE5vdGlmaWNhdGlvbiBvZiB0eXBlIFwiZXJyb3JcIiwgYW5kIHRoZW4gYGNvbXBsZXRlYC5cbiAqXG4gKiBUaGlzIG9wZXJhdG9yIGlzIHVzZWZ1bCBmb3IgcHJvZHVjaW5nIG1ldGFkYXRhIG9mIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgdG9cbiAqIGJlIGNvbnN1bWVkIGFzIGBuZXh0YCBlbWlzc2lvbnMuIFVzZSBpdCBpbiBjb25qdW5jdGlvbiB3aXRoXG4gKiB7QGxpbmsgZGVtYXRlcmlhbGl6ZX0uXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+Q29udmVydCBhIGZhdWx0eSBPYnNlcnZhYmxlIHRvIGFuIE9ic2VydmFibGUgb2YgTm90aWZpY2F0aW9uczwvY2FwdGlvbj5cbiAqIHZhciBsZXR0ZXJzID0gUnguT2JzZXJ2YWJsZS5vZignYScsICdiJywgMTMsICdkJyk7XG4gKiB2YXIgdXBwZXJDYXNlID0gbGV0dGVycy5tYXAoeCA9PiB4LnRvVXBwZXJDYXNlKCkpO1xuICogdmFyIG1hdGVyaWFsaXplZCA9IHVwcGVyQ2FzZS5tYXRlcmlhbGl6ZSgpO1xuICogbWF0ZXJpYWxpemVkLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiAvLyBSZXN1bHRzIGluIHRoZSBmb2xsb3dpbmc6XG4gKiAvLyAtIE5vdGlmaWNhdGlvbiB7a2luZDogXCJOXCIsIHZhbHVlOiBcIkFcIiwgZXJyb3I6IHVuZGVmaW5lZCwgaGFzVmFsdWU6IHRydWV9XG4gKiAvLyAtIE5vdGlmaWNhdGlvbiB7a2luZDogXCJOXCIsIHZhbHVlOiBcIkJcIiwgZXJyb3I6IHVuZGVmaW5lZCwgaGFzVmFsdWU6IHRydWV9XG4gKiAvLyAtIE5vdGlmaWNhdGlvbiB7a2luZDogXCJFXCIsIHZhbHVlOiB1bmRlZmluZWQsIGVycm9yOiBUeXBlRXJyb3I6XG4gKiAvLyAgIHgudG9VcHBlckNhc2UgaXMgbm90IGEgZnVuY3Rpb24gYXQgTWFwU3Vic2NyaWJlci5sZXR0ZXJzLm1hcC54XG4gKiAvLyAgIFthcyBwcm9qZWN0XSAoaHR0cDovLzHigKYsIGhhc1ZhbHVlOiBmYWxzZX1cbiAqXG4gKiBAc2VlIHtAbGluayBOb3RpZmljYXRpb259XG4gKiBAc2VlIHtAbGluayBkZW1hdGVyaWFsaXplfVxuICpcbiAqIEByZXR1cm4ge09ic2VydmFibGU8Tm90aWZpY2F0aW9uPFQ+Pn0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzXG4gKiB7QGxpbmsgTm90aWZpY2F0aW9ufSBvYmplY3RzIHRoYXQgd3JhcCB0aGUgb3JpZ2luYWwgZW1pc3Npb25zIGZyb20gdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSB3aXRoIG1ldGFkYXRhLlxuICogQG1ldGhvZCBtYXRlcmlhbGl6ZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gbWF0ZXJpYWxpemUoKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLm1hdGVyaWFsaXplKCkodGhpcyk7XG59XG5leHBvcnRzLm1hdGVyaWFsaXplID0gbWF0ZXJpYWxpemU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXRlcmlhbGl6ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBzaGFyZVJlcGxheV8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3NoYXJlUmVwbGF5XCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLnNoYXJlUmVwbGF5ID0gc2hhcmVSZXBsYXlfMS5zaGFyZVJlcGxheTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNoYXJlUmVwbGF5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIHdpbmRvd1RpbWVfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci93aW5kb3dUaW1lXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLndpbmRvd1RpbWUgPSB3aW5kb3dUaW1lXzEud2luZG93VGltZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdpbmRvd1RpbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIFByb2plY3RzIGVhY2ggc291cmNlIHZhbHVlIHRvIGFuIE9ic2VydmFibGUgd2hpY2ggaXMgbWVyZ2VkIGluIHRoZSBvdXRwdXRcbiAqIE9ic2VydmFibGUsIGluIGEgc2VyaWFsaXplZCBmYXNoaW9uIHdhaXRpbmcgZm9yIGVhY2ggb25lIHRvIGNvbXBsZXRlIGJlZm9yZVxuICogbWVyZ2luZyB0aGUgbmV4dC5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+TWFwcyBlYWNoIHZhbHVlIHRvIGFuIE9ic2VydmFibGUsIHRoZW4gZmxhdHRlbnMgYWxsIG9mXG4gKiB0aGVzZSBpbm5lciBPYnNlcnZhYmxlcyB1c2luZyB7QGxpbmsgY29uY2F0QWxsfS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9jb25jYXRNYXAucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgaXRlbXMgYmFzZWQgb24gYXBwbHlpbmcgYSBmdW5jdGlvbiB0aGF0IHlvdVxuICogc3VwcGx5IHRvIGVhY2ggaXRlbSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgd2hlcmUgdGhhdCBmdW5jdGlvblxuICogcmV0dXJucyBhbiAoc28tY2FsbGVkIFwiaW5uZXJcIikgT2JzZXJ2YWJsZS4gRWFjaCBuZXcgaW5uZXIgT2JzZXJ2YWJsZSBpc1xuICogY29uY2F0ZW5hdGVkIHdpdGggdGhlIHByZXZpb3VzIGlubmVyIE9ic2VydmFibGUuXG4gKlxuICogX19XYXJuaW5nOl9fIGlmIHNvdXJjZSB2YWx1ZXMgYXJyaXZlIGVuZGxlc3NseSBhbmQgZmFzdGVyIHRoYW4gdGhlaXJcbiAqIGNvcnJlc3BvbmRpbmcgaW5uZXIgT2JzZXJ2YWJsZXMgY2FuIGNvbXBsZXRlLCBpdCB3aWxsIHJlc3VsdCBpbiBtZW1vcnkgaXNzdWVzXG4gKiBhcyBpbm5lciBPYnNlcnZhYmxlcyBhbWFzcyBpbiBhbiB1bmJvdW5kZWQgYnVmZmVyIHdhaXRpbmcgZm9yIHRoZWlyIHR1cm4gdG9cbiAqIGJlIHN1YnNjcmliZWQgdG8uXG4gKlxuICogTm90ZTogYGNvbmNhdE1hcGAgaXMgZXF1aXZhbGVudCB0byBgbWVyZ2VNYXBgIHdpdGggY29uY3VycmVuY3kgcGFyYW1ldGVyIHNldFxuICogdG8gYDFgLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkZvciBlYWNoIGNsaWNrIGV2ZW50LCB0aWNrIGV2ZXJ5IHNlY29uZCBmcm9tIDAgdG8gMywgd2l0aCBubyBjb25jdXJyZW5jeTwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLmNvbmNhdE1hcChldiA9PiBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApLnRha2UoNCkpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiAvLyBSZXN1bHRzIGluIHRoZSBmb2xsb3dpbmc6XG4gKiAvLyAocmVzdWx0cyBhcmUgbm90IGNvbmN1cnJlbnQpXG4gKiAvLyBGb3IgZXZlcnkgY2xpY2sgb24gdGhlIFwiZG9jdW1lbnRcIiBpdCB3aWxsIGVtaXQgdmFsdWVzIDAgdG8gMyBzcGFjZWRcbiAqIC8vIG9uIGEgMTAwMG1zIGludGVydmFsXG4gKiAvLyBvbmUgY2xpY2sgPSAxMDAwbXMtPiAwIC0xMDAwbXMtPiAxIC0xMDAwbXMtPiAyIC0xMDAwbXMtPiAzXG4gKlxuICogQHNlZSB7QGxpbmsgY29uY2F0fVxuICogQHNlZSB7QGxpbmsgY29uY2F0QWxsfVxuICogQHNlZSB7QGxpbmsgY29uY2F0TWFwVG99XG4gKiBAc2VlIHtAbGluayBleGhhdXN0TWFwfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VNYXB9XG4gKiBAc2VlIHtAbGluayBzd2l0Y2hNYXB9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCwgP2luZGV4OiBudW1iZXIpOiBPYnNlcnZhYmxlSW5wdXR9IHByb2plY3QgQSBmdW5jdGlvblxuICogdGhhdCwgd2hlbiBhcHBsaWVkIHRvIGFuIGl0ZW0gZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUsIHJldHVybnMgYW5cbiAqIE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHJlc3VsdCBvZiBhcHBseWluZyB0aGVcbiAqIHByb2plY3Rpb24gZnVuY3Rpb24gKGFuZCB0aGUgb3B0aW9uYWwgYHJlc3VsdFNlbGVjdG9yYCkgdG8gZWFjaCBpdGVtIGVtaXR0ZWRcbiAqIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhbmQgdGFraW5nIHZhbHVlcyBmcm9tIGVhY2ggcHJvamVjdGVkIGlubmVyXG4gKiBPYnNlcnZhYmxlIHNlcXVlbnRpYWxseS5cbiAqIEBtZXRob2QgY29uY2F0TWFwXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBjb25jYXRNYXAocHJvamVjdCkge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5jb25jYXRNYXAocHJvamVjdCkodGhpcyk7XG59XG5leHBvcnRzLmNvbmNhdE1hcCA9IGNvbmNhdE1hcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmNhdE1hcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBjb25jYXRNYXBfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9jb25jYXRNYXBcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUuY29uY2F0TWFwID0gY29uY2F0TWFwXzEuY29uY2F0TWFwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uY2F0TWFwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGJ1ZmZlcl8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL2J1ZmZlclwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5idWZmZXIgPSBidWZmZXJfMS5idWZmZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idWZmZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5mcm9tUHJvbWlzZSA9IHJ4anNfMS5mcm9tO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnJvbVByb21pc2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBSZWN1cnNpdmVseSBwcm9qZWN0cyBlYWNoIHNvdXJjZSB2YWx1ZSB0byBhbiBPYnNlcnZhYmxlIHdoaWNoIGlzIG1lcmdlZCBpblxuICogdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIHNpbWlsYXIgdG8ge0BsaW5rIG1lcmdlTWFwfSwgYnV0IGFwcGxpZXMgdGhlXG4gKiBwcm9qZWN0aW9uIGZ1bmN0aW9uIHRvIGV2ZXJ5IHNvdXJjZSB2YWx1ZSBhcyB3ZWxsIGFzIGV2ZXJ5IG91dHB1dCB2YWx1ZS5cbiAqIEl0J3MgcmVjdXJzaXZlLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2V4cGFuZC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBpdGVtcyBiYXNlZCBvbiBhcHBseWluZyBhIGZ1bmN0aW9uIHRoYXQgeW91XG4gKiBzdXBwbHkgdG8gZWFjaCBpdGVtIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCB3aGVyZSB0aGF0IGZ1bmN0aW9uXG4gKiByZXR1cm5zIGFuIE9ic2VydmFibGUsIGFuZCB0aGVuIG1lcmdpbmcgdGhvc2UgcmVzdWx0aW5nIE9ic2VydmFibGVzIGFuZFxuICogZW1pdHRpbmcgdGhlIHJlc3VsdHMgb2YgdGhpcyBtZXJnZXIuICpFeHBhbmQqIHdpbGwgcmUtZW1pdCBvbiB0aGUgb3V0cHV0XG4gKiBPYnNlcnZhYmxlIGV2ZXJ5IHNvdXJjZSB2YWx1ZS4gVGhlbiwgZWFjaCBvdXRwdXQgdmFsdWUgaXMgZ2l2ZW4gdG8gdGhlXG4gKiBgcHJvamVjdGAgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhbiBpbm5lciBPYnNlcnZhYmxlIHRvIGJlIG1lcmdlZCBvbiB0aGVcbiAqIG91dHB1dCBPYnNlcnZhYmxlLiBUaG9zZSBvdXRwdXQgdmFsdWVzIHJlc3VsdGluZyBmcm9tIHRoZSBwcm9qZWN0aW9uIGFyZSBhbHNvXG4gKiBnaXZlbiB0byB0aGUgYHByb2plY3RgIGZ1bmN0aW9uIHRvIHByb2R1Y2UgbmV3IG91dHB1dCB2YWx1ZXMuIFRoaXMgaXMgaG93XG4gKiAqZXhwYW5kKiBiZWhhdmVzIHJlY3Vyc2l2ZWx5LlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlN0YXJ0IGVtaXR0aW5nIHRoZSBwb3dlcnMgb2YgdHdvIG9uIGV2ZXJ5IGNsaWNrLCBhdCBtb3N0IDEwIG9mIHRoZW08L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHBvd2Vyc09mVHdvID0gY2xpY2tzXG4gKiAgIC5tYXBUbygxKVxuICogICAuZXhwYW5kKHggPT4gUnguT2JzZXJ2YWJsZS5vZigyICogeCkuZGVsYXkoMTAwMCkpXG4gKiAgIC50YWtlKDEwKTtcbiAqIHBvd2Vyc09mVHdvLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBtZXJnZU1hcH1cbiAqIEBzZWUge0BsaW5rIG1lcmdlU2Nhbn1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBPYnNlcnZhYmxlfSBwcm9qZWN0IEEgZnVuY3Rpb25cbiAqIHRoYXQsIHdoZW4gYXBwbGllZCB0byBhbiBpdGVtIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBvciB0aGUgb3V0cHV0IE9ic2VydmFibGUsXG4gKiByZXR1cm5zIGFuIE9ic2VydmFibGUuXG4gKiBAcGFyYW0ge251bWJlcn0gW2NvbmN1cnJlbnQ9TnVtYmVyLlBPU0lUSVZFX0lORklOSVRZXSBNYXhpbXVtIG51bWJlciBvZiBpbnB1dFxuICogT2JzZXJ2YWJsZXMgYmVpbmcgc3Vic2NyaWJlZCB0byBjb25jdXJyZW50bHkuXG4gKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcj1udWxsXSBUaGUgSVNjaGVkdWxlciB0byB1c2UgZm9yIHN1YnNjcmliaW5nIHRvXG4gKiBlYWNoIHByb2plY3RlZCBpbm5lciBPYnNlcnZhYmxlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHRoZSBzb3VyY2UgdmFsdWVzIGFuZCBhbHNvXG4gKiByZXN1bHQgb2YgYXBwbHlpbmcgdGhlIHByb2plY3Rpb24gZnVuY3Rpb24gdG8gZWFjaCB2YWx1ZSBlbWl0dGVkIG9uIHRoZVxuICogb3V0cHV0IE9ic2VydmFibGUgYW5kIGFuZCBtZXJnaW5nIHRoZSByZXN1bHRzIG9mIHRoZSBPYnNlcnZhYmxlcyBvYnRhaW5lZFxuICogZnJvbSB0aGlzIHRyYW5zZm9ybWF0aW9uLlxuICogQG1ldGhvZCBleHBhbmRcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIGV4cGFuZChwcm9qZWN0LCBjb25jdXJyZW50LCBzY2hlZHVsZXIpIHtcbiAgICBpZiAoY29uY3VycmVudCA9PT0gdm9pZCAwKSB7IGNvbmN1cnJlbnQgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7IH1cbiAgICBpZiAoc2NoZWR1bGVyID09PSB2b2lkIDApIHsgc2NoZWR1bGVyID0gdW5kZWZpbmVkOyB9XG4gICAgY29uY3VycmVudCA9IChjb25jdXJyZW50IHx8IDApIDwgMSA/IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSA6IGNvbmN1cnJlbnQ7XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLmV4cGFuZChwcm9qZWN0LCBjb25jdXJyZW50LCBzY2hlZHVsZXIpKHRoaXMpO1xufVxuZXhwb3J0cy5leHBhbmQgPSBleHBhbmQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leHBhbmQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBQZXJmb3JtIGEgc2lkZSBlZmZlY3QgZm9yIGV2ZXJ5IGVtaXNzaW9uIG9uIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgYnV0IHJldHVyblxuICogYW4gT2JzZXJ2YWJsZSB0aGF0IGlzIGlkZW50aWNhbCB0byB0aGUgc291cmNlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JbnRlcmNlcHRzIGVhY2ggZW1pc3Npb24gb24gdGhlIHNvdXJjZSBhbmQgcnVucyBhXG4gKiBmdW5jdGlvbiwgYnV0IHJldHVybnMgYW4gb3V0cHV0IHdoaWNoIGlzIGlkZW50aWNhbCB0byB0aGUgc291cmNlIGFzIGxvbmcgYXMgZXJyb3JzIGRvbid0IG9jY3VyLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2RvLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIFJldHVybnMgYSBtaXJyb3JlZCBPYnNlcnZhYmxlIG9mIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgYnV0IG1vZGlmaWVkIHNvIHRoYXRcbiAqIHRoZSBwcm92aWRlZCBPYnNlcnZlciBpcyBjYWxsZWQgdG8gcGVyZm9ybSBhIHNpZGUgZWZmZWN0IGZvciBldmVyeSB2YWx1ZSxcbiAqIGVycm9yLCBhbmQgY29tcGxldGlvbiBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UuIEFueSBlcnJvcnMgdGhhdCBhcmUgdGhyb3duIGluXG4gKiB0aGUgYWZvcmVtZW50aW9uZWQgT2JzZXJ2ZXIgb3IgaGFuZGxlcnMgYXJlIHNhZmVseSBzZW50IGRvd24gdGhlIGVycm9yIHBhdGhcbiAqIG9mIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqXG4gKiBUaGlzIG9wZXJhdG9yIGlzIHVzZWZ1bCBmb3IgZGVidWdnaW5nIHlvdXIgT2JzZXJ2YWJsZXMgZm9yIHRoZSBjb3JyZWN0IHZhbHVlc1xuICogb3IgcGVyZm9ybWluZyBvdGhlciBzaWRlIGVmZmVjdHMuXG4gKlxuICogTm90ZTogdGhpcyBpcyBkaWZmZXJlbnQgdG8gYSBgc3Vic2NyaWJlYCBvbiB0aGUgT2JzZXJ2YWJsZS4gSWYgdGhlIE9ic2VydmFibGVcbiAqIHJldHVybmVkIGJ5IGBkb2AgaXMgbm90IHN1YnNjcmliZWQsIHRoZSBzaWRlIGVmZmVjdHMgc3BlY2lmaWVkIGJ5IHRoZVxuICogT2JzZXJ2ZXIgd2lsbCBuZXZlciBoYXBwZW4uIGBkb2AgdGhlcmVmb3JlIHNpbXBseSBzcGllcyBvbiBleGlzdGluZ1xuICogZXhlY3V0aW9uLCBpdCBkb2VzIG5vdCB0cmlnZ2VyIGFuIGV4ZWN1dGlvbiB0byBoYXBwZW4gbGlrZSBgc3Vic2NyaWJlYCBkb2VzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk1hcCBldmVyeSBjbGljayB0byB0aGUgY2xpZW50WCBwb3NpdGlvbiBvZiB0aGF0IGNsaWNrLCB3aGlsZSBhbHNvIGxvZ2dpbmcgdGhlIGNsaWNrIGV2ZW50PC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBwb3NpdGlvbnMgPSBjbGlja3NcbiAqICAgLmRvKGV2ID0+IGNvbnNvbGUubG9nKGV2KSlcbiAqICAgLm1hcChldiA9PiBldi5jbGllbnRYKTtcbiAqIHBvc2l0aW9ucy5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgbWFwfVxuICogQHNlZSB7QGxpbmsgc3Vic2NyaWJlfVxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2ZXJ8ZnVuY3Rpb259IFtuZXh0T3JPYnNlcnZlcl0gQSBub3JtYWwgT2JzZXJ2ZXIgb2JqZWN0IG9yIGFcbiAqIGNhbGxiYWNrIGZvciBgbmV4dGAuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbZXJyb3JdIENhbGxiYWNrIGZvciBlcnJvcnMgaW4gdGhlIHNvdXJjZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjb21wbGV0ZV0gQ2FsbGJhY2sgZm9yIHRoZSBjb21wbGV0aW9uIG9mIHRoZSBzb3VyY2UuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIGlkZW50aWNhbCB0byB0aGUgc291cmNlLCBidXQgcnVucyB0aGVcbiAqIHNwZWNpZmllZCBPYnNlcnZlciBvciBjYWxsYmFjayhzKSBmb3IgZWFjaCBpdGVtLlxuICogQG1ldGhvZCBkb1xuICogQG5hbWUgZG9cbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIF9kbyhuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLnRhcChuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKSh0aGlzKTtcbn1cbmV4cG9ydHMuX2RvID0gX2RvO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZG8uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgc3dpdGNoTWFwXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3Ivc3dpdGNoTWFwXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLnN3aXRjaE1hcCA9IHN3aXRjaE1hcF8xLnN3aXRjaE1hcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN3aXRjaE1hcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnJhY2UgPSByeGpzXzEucmFjZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJhY2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIENvbnZlcnRzIGEgaGlnaGVyLW9yZGVyIE9ic2VydmFibGUgaW50byBhIGZpcnN0LW9yZGVyIE9ic2VydmFibGUgYnkgZHJvcHBpbmdcbiAqIGlubmVyIE9ic2VydmFibGVzIHdoaWxlIHRoZSBwcmV2aW91cyBpbm5lciBPYnNlcnZhYmxlIGhhcyBub3QgeWV0IGNvbXBsZXRlZC5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+RmxhdHRlbnMgYW4gT2JzZXJ2YWJsZS1vZi1PYnNlcnZhYmxlcyBieSBkcm9wcGluZyB0aGVcbiAqIG5leHQgaW5uZXIgT2JzZXJ2YWJsZXMgd2hpbGUgdGhlIGN1cnJlbnQgaW5uZXIgaXMgc3RpbGwgZXhlY3V0aW5nLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2V4aGF1c3QucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYGV4aGF1c3RgIHN1YnNjcmliZXMgdG8gYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIE9ic2VydmFibGVzLCBhbHNvIGtub3duIGFzIGFcbiAqIGhpZ2hlci1vcmRlciBPYnNlcnZhYmxlLiBFYWNoIHRpbWUgaXQgb2JzZXJ2ZXMgb25lIG9mIHRoZXNlIGVtaXR0ZWQgaW5uZXJcbiAqIE9ic2VydmFibGVzLCB0aGUgb3V0cHV0IE9ic2VydmFibGUgYmVnaW5zIGVtaXR0aW5nIHRoZSBpdGVtcyBlbWl0dGVkIGJ5IHRoYXRcbiAqIGlubmVyIE9ic2VydmFibGUuIFNvIGZhciwgaXQgYmVoYXZlcyBsaWtlIHtAbGluayBtZXJnZUFsbH0uIEhvd2V2ZXIsXG4gKiBgZXhoYXVzdGAgaWdub3JlcyBldmVyeSBuZXcgaW5uZXIgT2JzZXJ2YWJsZSBpZiB0aGUgcHJldmlvdXMgT2JzZXJ2YWJsZSBoYXNcbiAqIG5vdCB5ZXQgY29tcGxldGVkLiBPbmNlIHRoYXQgb25lIGNvbXBsZXRlcywgaXQgd2lsbCBhY2NlcHQgYW5kIGZsYXR0ZW4gdGhlXG4gKiBuZXh0IGlubmVyIE9ic2VydmFibGUgYW5kIHJlcGVhdCB0aGlzIHByb2Nlc3MuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+UnVuIGEgZmluaXRlIHRpbWVyIGZvciBlYWNoIGNsaWNrLCBvbmx5IGlmIHRoZXJlIGlzIG5vIGN1cnJlbnRseSBhY3RpdmUgdGltZXI8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIGhpZ2hlck9yZGVyID0gY2xpY2tzLm1hcCgoZXYpID0+IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkudGFrZSg1KSk7XG4gKiB2YXIgcmVzdWx0ID0gaGlnaGVyT3JkZXIuZXhoYXVzdCgpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBjb21iaW5lQWxsfVxuICogQHNlZSB7QGxpbmsgY29uY2F0QWxsfVxuICogQHNlZSB7QGxpbmsgc3dpdGNofVxuICogQHNlZSB7QGxpbmsgbWVyZ2VBbGx9XG4gKiBAc2VlIHtAbGluayBleGhhdXN0TWFwfVxuICogQHNlZSB7QGxpbmsgemlwQWxsfVxuICpcbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCB0YWtlcyBhIHNvdXJjZSBvZiBPYnNlcnZhYmxlcyBhbmQgcHJvcGFnYXRlcyB0aGUgZmlyc3Qgb2JzZXJ2YWJsZVxuICogZXhjbHVzaXZlbHkgdW50aWwgaXQgY29tcGxldGVzIGJlZm9yZSBzdWJzY3JpYmluZyB0byB0aGUgbmV4dC5cbiAqL1xuZnVuY3Rpb24gZXhoYXVzdCgpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEuZXhoYXVzdCgpKHRoaXMpO1xufVxuZXhwb3J0cy5leGhhdXN0ID0gZXhoYXVzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4aGF1c3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgc2tpcFVudGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3Ivc2tpcFVudGlsXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLnNraXBVbnRpbCA9IHNraXBVbnRpbF8xLnNraXBVbnRpbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNraXBVbnRpbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogRW1pdHMgdGhlIGdpdmVuIGNvbnN0YW50IHZhbHVlIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBldmVyeSB0aW1lIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgZW1pdHMgYSB2YWx1ZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+TGlrZSB7QGxpbmsgbWFwfSwgYnV0IGl0IG1hcHMgZXZlcnkgc291cmNlIHZhbHVlIHRvXG4gKiB0aGUgc2FtZSBvdXRwdXQgdmFsdWUgZXZlcnkgdGltZS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9tYXBUby5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBUYWtlcyBhIGNvbnN0YW50IGB2YWx1ZWAgYXMgYXJndW1lbnQsIGFuZCBlbWl0cyB0aGF0IHdoZW5ldmVyIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgZW1pdHMgYSB2YWx1ZS4gSW4gb3RoZXIgd29yZHMsIGlnbm9yZXMgdGhlIGFjdHVhbCBzb3VyY2UgdmFsdWUsXG4gKiBhbmQgc2ltcGx5IHVzZXMgdGhlIGVtaXNzaW9uIG1vbWVudCB0byBrbm93IHdoZW4gdG8gZW1pdCB0aGUgZ2l2ZW4gYHZhbHVlYC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5NYXAgZXZlcnkgY2xpY2sgdG8gdGhlIHN0cmluZyAnSGknPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBncmVldGluZ3MgPSBjbGlja3MubWFwVG8oJ0hpJyk7XG4gKiBncmVldGluZ3Muc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIG1hcH1cbiAqXG4gKiBAcGFyYW0ge2FueX0gdmFsdWUgVGhlIHZhbHVlIHRvIG1hcCBlYWNoIHNvdXJjZSB2YWx1ZSB0by5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgZ2l2ZW4gYHZhbHVlYCBldmVyeSB0aW1lXG4gKiB0aGUgc291cmNlIE9ic2VydmFibGUgZW1pdHMgc29tZXRoaW5nLlxuICogQG1ldGhvZCBtYXBUb1xuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gbWFwVG8odmFsdWUpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEubWFwVG8odmFsdWUpKHRoaXMpO1xufVxuZXhwb3J0cy5tYXBUbyA9IG1hcFRvO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwVG8uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgd2luZG93V2hlbl8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3dpbmRvd1doZW5cIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUud2luZG93V2hlbiA9IHdpbmRvd1doZW5fMS53aW5kb3dXaGVuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2luZG93V2hlbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgc2tpcHMgYWxsIGl0ZW1zIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGFzIGxvbmcgYXMgYSBzcGVjaWZpZWQgY29uZGl0aW9uIGhvbGRzXG4gKiB0cnVlLCBidXQgZW1pdHMgYWxsIGZ1cnRoZXIgc291cmNlIGl0ZW1zIGFzIHNvb24gYXMgdGhlIGNvbmRpdGlvbiBiZWNvbWVzIGZhbHNlLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvc2tpcFdoaWxlLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSAtIEEgZnVuY3Rpb24gdG8gdGVzdCBlYWNoIGl0ZW0gZW1pdHRlZCBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgdGhhdCBiZWdpbnMgZW1pdHRpbmcgaXRlbXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgd2hlbiB0aGVcbiAqIHNwZWNpZmllZCBwcmVkaWNhdGUgYmVjb21lcyBmYWxzZS5cbiAqIEBtZXRob2Qgc2tpcFdoaWxlXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBza2lwV2hpbGUocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLnNraXBXaGlsZShwcmVkaWNhdGUpKHRoaXMpO1xufVxuZXhwb3J0cy5za2lwV2hpbGUgPSBza2lwV2hpbGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1za2lwV2hpbGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIEVtaXRzIG9ubHkgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCB2YWx1ZSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB0aGF0XG4gKiBtZWV0cyBzb21lIGNvbmRpdGlvbi5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayBmaW5kfSwgYnV0IGVtaXRzIHRoZSBpbmRleCBvZiB0aGVcbiAqIGZvdW5kIHZhbHVlLCBub3QgdGhlIHZhbHVlIGl0c2VsZi48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9maW5kSW5kZXgucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYGZpbmRJbmRleGAgc2VhcmNoZXMgZm9yIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB0aGF0IG1hdGNoZXNcbiAqIHRoZSBzcGVjaWZpZWQgY29uZGl0aW9uIGVtYm9kaWVkIGJ5IHRoZSBgcHJlZGljYXRlYCwgYW5kIHJldHVybnMgdGhlXG4gKiAoemVyby1iYXNlZCkgaW5kZXggb2YgdGhlIGZpcnN0IG9jY3VycmVuY2UgaW4gdGhlIHNvdXJjZS4gVW5saWtlXG4gKiB7QGxpbmsgZmlyc3R9LCB0aGUgYHByZWRpY2F0ZWAgaXMgcmVxdWlyZWQgaW4gYGZpbmRJbmRleGAsIGFuZCBkb2VzIG5vdCBlbWl0XG4gKiBhbiBlcnJvciBpZiBhIHZhbGlkIHZhbHVlIGlzIG5vdCBmb3VuZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IHRoZSBpbmRleCBvZiBmaXJzdCBjbGljayB0aGF0IGhhcHBlbnMgb24gYSBESVYgZWxlbWVudDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLmZpbmRJbmRleChldiA9PiBldi50YXJnZXQudGFnTmFtZSA9PT0gJ0RJVicpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBmaWx0ZXJ9XG4gKiBAc2VlIHtAbGluayBmaW5kfVxuICogQHNlZSB7QGxpbmsgZmlyc3R9XG4gKiBAc2VlIHtAbGluayB0YWtlfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPik6IGJvb2xlYW59IHByZWRpY2F0ZVxuICogQSBmdW5jdGlvbiBjYWxsZWQgd2l0aCBlYWNoIGl0ZW0gdG8gdGVzdCBmb3IgY29uZGl0aW9uIG1hdGNoaW5nLlxuICogQHBhcmFtIHthbnl9IFt0aGlzQXJnXSBBbiBvcHRpb25hbCBhcmd1bWVudCB0byBkZXRlcm1pbmUgdGhlIHZhbHVlIG9mIGB0aGlzYFxuICogaW4gdGhlIGBwcmVkaWNhdGVgIGZ1bmN0aW9uLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSBvZiB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGl0ZW0gdGhhdFxuICogbWF0Y2hlcyB0aGUgY29uZGl0aW9uLlxuICogQG1ldGhvZCBmaW5kXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBmaW5kSW5kZXgocHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLmZpbmRJbmRleChwcmVkaWNhdGUsIHRoaXNBcmcpKHRoaXMpO1xufVxuZXhwb3J0cy5maW5kSW5kZXggPSBmaW5kSW5kZXg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1maW5kSW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgcGFpcndpc2VfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9wYWlyd2lzZVwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5wYWlyd2lzZSA9IHBhaXJ3aXNlXzEucGFpcndpc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYWlyd2lzZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogVGhlIE1heCBvcGVyYXRvciBvcGVyYXRlcyBvbiBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgbnVtYmVycyAob3IgaXRlbXMgdGhhdCBjYW4gYmUgY29tcGFyZWQgd2l0aCBhIHByb3ZpZGVkIGZ1bmN0aW9uKSxcbiAqIGFuZCB3aGVuIHNvdXJjZSBPYnNlcnZhYmxlIGNvbXBsZXRlcyBpdCBlbWl0cyBhIHNpbmdsZSBpdGVtOiB0aGUgaXRlbSB3aXRoIHRoZSBsYXJnZXN0IHZhbHVlLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvbWF4LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkdldCB0aGUgbWF4aW1hbCB2YWx1ZSBvZiBhIHNlcmllcyBvZiBudW1iZXJzPC9jYXB0aW9uPlxuICogUnguT2JzZXJ2YWJsZS5vZig1LCA0LCA3LCAyLCA4KVxuICogICAubWF4KClcbiAqICAgLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTsgLy8gLT4gOFxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlVzZSBhIGNvbXBhcmVyIGZ1bmN0aW9uIHRvIGdldCB0aGUgbWF4aW1hbCBpdGVtPC9jYXB0aW9uPlxuICogaW50ZXJmYWNlIFBlcnNvbiB7XG4gKiAgIGFnZTogbnVtYmVyLFxuICogICBuYW1lOiBzdHJpbmdcbiAqIH1cbiAqIE9ic2VydmFibGUub2Y8UGVyc29uPih7YWdlOiA3LCBuYW1lOiAnRm9vJ30sXG4gKiAgICAgICAgICAgICAgICAgICAgICAge2FnZTogNSwgbmFtZTogJ0Jhcid9LFxuICogICAgICAgICAgICAgICAgICAgICAgIHthZ2U6IDksIG5hbWU6ICdCZWVyJ30pXG4gKiAgICAgICAgICAgLm1heDxQZXJzb24+KChhOiBQZXJzb24sIGI6IFBlcnNvbikgPT4gYS5hZ2UgPCBiLmFnZSA/IC0xIDogMSlcbiAqICAgICAgICAgICAuc3Vic2NyaWJlKCh4OiBQZXJzb24pID0+IGNvbnNvbGUubG9nKHgubmFtZSkpOyAvLyAtPiAnQmVlcidcbiAqIH1cbiAqXG4gKiBAc2VlIHtAbGluayBtaW59XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBhcmVyXSAtIE9wdGlvbmFsIGNvbXBhcmVyIGZ1bmN0aW9uIHRoYXQgaXQgd2lsbCB1c2UgaW5zdGVhZCBvZiBpdHMgZGVmYXVsdCB0byBjb21wYXJlIHRoZVxuICogdmFsdWUgb2YgdHdvIGl0ZW1zLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGl0ZW0gd2l0aCB0aGUgbGFyZ2VzdCB2YWx1ZS5cbiAqIEBtZXRob2QgbWF4XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBtYXgoY29tcGFyZXIpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEubWF4KGNvbXBhcmVyKSh0aGlzKTtcbn1cbmV4cG9ydHMubWF4ID0gbWF4O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWF4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGV4aGF1c3RNYXBfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9leGhhdXN0TWFwXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLmV4aGF1c3RNYXAgPSBleGhhdXN0TWFwXzEuZXhoYXVzdE1hcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4aGF1c3RNYXAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIFByb2plY3RzIGVhY2ggc291cmNlIHZhbHVlIHRvIGFuIE9ic2VydmFibGUgd2hpY2ggaXMgbWVyZ2VkIGluIHRoZSBvdXRwdXRcbiAqIE9ic2VydmFibGUgb25seSBpZiB0aGUgcHJldmlvdXMgcHJvamVjdGVkIE9ic2VydmFibGUgaGFzIGNvbXBsZXRlZC5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+TWFwcyBlYWNoIHZhbHVlIHRvIGFuIE9ic2VydmFibGUsIHRoZW4gZmxhdHRlbnMgYWxsIG9mXG4gKiB0aGVzZSBpbm5lciBPYnNlcnZhYmxlcyB1c2luZyB7QGxpbmsgZXhoYXVzdH0uPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZXhoYXVzdE1hcC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBpdGVtcyBiYXNlZCBvbiBhcHBseWluZyBhIGZ1bmN0aW9uIHRoYXQgeW91XG4gKiBzdXBwbHkgdG8gZWFjaCBpdGVtIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCB3aGVyZSB0aGF0IGZ1bmN0aW9uXG4gKiByZXR1cm5zIGFuIChzby1jYWxsZWQgXCJpbm5lclwiKSBPYnNlcnZhYmxlLiBXaGVuIGl0IHByb2plY3RzIGEgc291cmNlIHZhbHVlIHRvXG4gKiBhbiBPYnNlcnZhYmxlLCB0aGUgb3V0cHV0IE9ic2VydmFibGUgYmVnaW5zIGVtaXR0aW5nIHRoZSBpdGVtcyBlbWl0dGVkIGJ5XG4gKiB0aGF0IHByb2plY3RlZCBPYnNlcnZhYmxlLiBIb3dldmVyLCBgZXhoYXVzdE1hcGAgaWdub3JlcyBldmVyeSBuZXcgcHJvamVjdGVkXG4gKiBPYnNlcnZhYmxlIGlmIHRoZSBwcmV2aW91cyBwcm9qZWN0ZWQgT2JzZXJ2YWJsZSBoYXMgbm90IHlldCBjb21wbGV0ZWQuIE9uY2VcbiAqIHRoYXQgb25lIGNvbXBsZXRlcywgaXQgd2lsbCBhY2NlcHQgYW5kIGZsYXR0ZW4gdGhlIG5leHQgcHJvamVjdGVkIE9ic2VydmFibGVcbiAqIGFuZCByZXBlYXQgdGhpcyBwcm9jZXNzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlJ1biBhIGZpbml0ZSB0aW1lciBmb3IgZWFjaCBjbGljaywgb25seSBpZiB0aGVyZSBpcyBubyBjdXJyZW50bHkgYWN0aXZlIHRpbWVyPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IGZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLnBpcGUoZXhoYXVzdE1hcCgoZXYpID0+IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkudGFrZSg1KSkpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBjb25jYXRNYXB9XG4gKiBAc2VlIHtAbGluayBleGhhdXN0fVxuICogQHNlZSB7QGxpbmsgbWVyZ2VNYXB9XG4gKiBAc2VlIHtAbGluayBzd2l0Y2hNYXB9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCwgP2luZGV4OiBudW1iZXIpOiBPYnNlcnZhYmxlSW5wdXR9IHByb2plY3QgQSBmdW5jdGlvblxuICogdGhhdCwgd2hlbiBhcHBsaWVkIHRvIGFuIGl0ZW0gZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUsIHJldHVybnMgYW5cbiAqIE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIGNvbnRhaW5pbmcgcHJvamVjdGVkIE9ic2VydmFibGVzXG4gKiBvZiBlYWNoIGl0ZW0gb2YgdGhlIHNvdXJjZSwgaWdub3JpbmcgcHJvamVjdGVkIE9ic2VydmFibGVzIHRoYXQgc3RhcnQgYmVmb3JlXG4gKiB0aGVpciBwcmVjZWRpbmcgT2JzZXJ2YWJsZSBoYXMgY29tcGxldGVkLlxuICovXG5mdW5jdGlvbiBleGhhdXN0TWFwKHByb2plY3QpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEuZXhoYXVzdE1hcChwcm9qZWN0KSh0aGlzKTtcbn1cbmV4cG9ydHMuZXhoYXVzdE1hcCA9IGV4aGF1c3RNYXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGhhdXN0TWFwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGZpbmRfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9maW5kXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLmZpbmQgPSBmaW5kXzEuZmluZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbmQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgd2luZG93Q291bnRfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci93aW5kb3dDb3VudFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS53aW5kb3dDb3VudCA9IHdpbmRvd0NvdW50XzEud2luZG93Q291bnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD13aW5kb3dDb3VudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBtdWx0aWNhc3RfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9tdWx0aWNhc3RcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUubXVsdGljYXN0ID0gbXVsdGljYXN0XzEubXVsdGljYXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bXVsdGljYXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYWxsIGl0ZW1zIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRoYXQgYXJlIGRpc3RpbmN0IGJ5IGNvbXBhcmlzb24gZnJvbSB0aGUgcHJldmlvdXMgaXRlbSxcbiAqIHVzaW5nIGEgcHJvcGVydHkgYWNjZXNzZWQgYnkgdXNpbmcgdGhlIGtleSBwcm92aWRlZCB0byBjaGVjayBpZiB0aGUgdHdvIGl0ZW1zIGFyZSBkaXN0aW5jdC5cbiAqXG4gKiBJZiBhIGNvbXBhcmF0b3IgZnVuY3Rpb24gaXMgcHJvdmlkZWQsIHRoZW4gaXQgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2ggaXRlbSB0byB0ZXN0IGZvciB3aGV0aGVyIG9yIG5vdCB0aGF0IHZhbHVlIHNob3VsZCBiZSBlbWl0dGVkLlxuICpcbiAqIElmIGEgY29tcGFyYXRvciBmdW5jdGlvbiBpcyBub3QgcHJvdmlkZWQsIGFuIGVxdWFsaXR5IGNoZWNrIGlzIHVzZWQgYnkgZGVmYXVsdC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5BbiBleGFtcGxlIGNvbXBhcmluZyB0aGUgbmFtZSBvZiBwZXJzb25zPC9jYXB0aW9uPlxuICpcbiAqICBpbnRlcmZhY2UgUGVyc29uIHtcbiAqICAgICBhZ2U6IG51bWJlcixcbiAqICAgICBuYW1lOiBzdHJpbmdcbiAqICB9XG4gKlxuICogT2JzZXJ2YWJsZS5vZjxQZXJzb24+KFxuICogICAgIHsgYWdlOiA0LCBuYW1lOiAnRm9vJ30sXG4gKiAgICAgeyBhZ2U6IDcsIG5hbWU6ICdCYXInfSxcbiAqICAgICB7IGFnZTogNSwgbmFtZTogJ0Zvbyd9LFxuICogICAgIHsgYWdlOiA2LCBuYW1lOiAnRm9vJ30pXG4gKiAgICAgLmRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkKCduYW1lJylcbiAqICAgICAuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIC8vIGRpc3BsYXlzOlxuICogLy8geyBhZ2U6IDQsIG5hbWU6ICdGb28nIH1cbiAqIC8vIHsgYWdlOiA3LCBuYW1lOiAnQmFyJyB9XG4gKiAvLyB7IGFnZTogNSwgbmFtZTogJ0ZvbycgfVxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkFuIGV4YW1wbGUgY29tcGFyaW5nIHRoZSBmaXJzdCBsZXR0ZXJzIG9mIHRoZSBuYW1lPC9jYXB0aW9uPlxuICpcbiAqIGludGVyZmFjZSBQZXJzb24ge1xuICogICAgIGFnZTogbnVtYmVyLFxuICogICAgIG5hbWU6IHN0cmluZ1xuICogIH1cbiAqXG4gKiBPYnNlcnZhYmxlLm9mPFBlcnNvbj4oXG4gKiAgICAgeyBhZ2U6IDQsIG5hbWU6ICdGb28xJ30sXG4gKiAgICAgeyBhZ2U6IDcsIG5hbWU6ICdCYXInfSxcbiAqICAgICB7IGFnZTogNSwgbmFtZTogJ0ZvbzInfSxcbiAqICAgICB7IGFnZTogNiwgbmFtZTogJ0ZvbzMnfSlcbiAqICAgICAuZGlzdGluY3RVbnRpbEtleUNoYW5nZWQoJ25hbWUnLCAoeDogc3RyaW5nLCB5OiBzdHJpbmcpID0+IHguc3Vic3RyaW5nKDAsIDMpID09PSB5LnN1YnN0cmluZygwLCAzKSlcbiAqICAgICAuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIC8vIGRpc3BsYXlzOlxuICogLy8geyBhZ2U6IDQsIG5hbWU6ICdGb28xJyB9XG4gKiAvLyB7IGFnZTogNywgbmFtZTogJ0JhcicgfVxuICogLy8geyBhZ2U6IDUsIG5hbWU6ICdGb28yJyB9XG4gKlxuICogQHNlZSB7QGxpbmsgZGlzdGluY3R9XG4gKiBAc2VlIHtAbGluayBkaXN0aW5jdFVudGlsQ2hhbmdlZH1cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFN0cmluZyBrZXkgZm9yIG9iamVjdCBwcm9wZXJ0eSBsb29rdXAgb24gZWFjaCBpdGVtLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gW2NvbXBhcmVdIE9wdGlvbmFsIGNvbXBhcmlzb24gZnVuY3Rpb24gY2FsbGVkIHRvIHRlc3QgaWYgYW4gaXRlbSBpcyBkaXN0aW5jdCBmcm9tIHRoZSBwcmV2aW91cyBpdGVtIGluIHRoZSBzb3VyY2UuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgaXRlbXMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgd2l0aCBkaXN0aW5jdCB2YWx1ZXMgYmFzZWQgb24gdGhlIGtleSBzcGVjaWZpZWQuXG4gKiBAbWV0aG9kIGRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG5mdW5jdGlvbiBkaXN0aW5jdFVudGlsS2V5Q2hhbmdlZChrZXksIGNvbXBhcmUpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEuZGlzdGluY3RVbnRpbEtleUNoYW5nZWQoa2V5LCBjb21wYXJlKSh0aGlzKTtcbn1cbmV4cG9ydHMuZGlzdGluY3RVbnRpbEtleUNoYW5nZWQgPSBkaXN0aW5jdFVudGlsS2V5Q2hhbmdlZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIG1hcF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL21hcFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5tYXAgPSBtYXBfMS5tYXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG5mdW5jdGlvbiBzdGF0aWNOZXZlcigpIHtcbiAgICByZXR1cm4gcnhqc18xLk5FVkVSO1xufVxuZXhwb3J0cy5zdGF0aWNOZXZlciA9IHN0YXRpY05ldmVyO1xucnhqc18xLk9ic2VydmFibGUubmV2ZXIgPSBzdGF0aWNOZXZlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5ldmVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBBc3luY2hyb25vdXNseSBzdWJzY3JpYmVzIE9ic2VydmVycyB0byB0aGlzIE9ic2VydmFibGUgb24gdGhlIHNwZWNpZmllZCBJU2NoZWR1bGVyLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvc3Vic2NyaWJlT24ucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogQHBhcmFtIHtTY2hlZHVsZXJ9IHNjaGVkdWxlciAtIFRoZSBJU2NoZWR1bGVyIHRvIHBlcmZvcm0gc3Vic2NyaXB0aW9uIGFjdGlvbnMgb24uXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBUaGUgc291cmNlIE9ic2VydmFibGUgbW9kaWZpZWQgc28gdGhhdCBpdHMgc3Vic2NyaXB0aW9ucyBoYXBwZW4gb24gdGhlIHNwZWNpZmllZCBJU2NoZWR1bGVyLlxuIC5cbiAqIEBtZXRob2Qgc3Vic2NyaWJlT25cbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIHN1YnNjcmliZU9uKHNjaGVkdWxlciwgZGVsYXkpIHtcbiAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICByZXR1cm4gb3BlcmF0b3JzXzEuc3Vic2NyaWJlT24oc2NoZWR1bGVyLCBkZWxheSkodGhpcyk7XG59XG5leHBvcnRzLnN1YnNjcmliZU9uID0gc3Vic2NyaWJlT247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdWJzY3JpYmVPbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBtYXBUb18xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL21hcFRvXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLm1hcFRvID0gbWFwVG9fMS5tYXBUbztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcFRvLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIHRocm90dGxlVGltZV8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3Rocm90dGxlVGltZVwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS50aHJvdHRsZVRpbWUgPSB0aHJvdHRsZVRpbWVfMS50aHJvdHRsZVRpbWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aHJvdHRsZVRpbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIEVtaXRzIG9ubHkgdGhlIGxhc3QgYGNvdW50YCB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPlJlbWVtYmVycyB0aGUgbGF0ZXN0IGBjb3VudGAgdmFsdWVzLCB0aGVuIGVtaXRzIHRob3NlXG4gKiBvbmx5IHdoZW4gdGhlIHNvdXJjZSBjb21wbGV0ZXMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvdGFrZUxhc3QucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYHRha2VMYXN0YCByZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBhdCBtb3N0IHRoZSBsYXN0IGBjb3VudGAgdmFsdWVzXG4gKiBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gSWYgdGhlIHNvdXJjZSBlbWl0cyBmZXdlciB0aGFuIGBjb3VudGBcbiAqIHZhbHVlcyB0aGVuIGFsbCBvZiBpdHMgdmFsdWVzIGFyZSBlbWl0dGVkLiBUaGlzIG9wZXJhdG9yIG11c3Qgd2FpdCB1bnRpbCB0aGVcbiAqIGBjb21wbGV0ZWAgbm90aWZpY2F0aW9uIGVtaXNzaW9uIGZyb20gdGhlIHNvdXJjZSBpbiBvcmRlciB0byBlbWl0IHRoZSBgbmV4dGBcbiAqIHZhbHVlcyBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUsIGJlY2F1c2Ugb3RoZXJ3aXNlIGl0IGlzIGltcG9zc2libGUgdG8ga25vd1xuICogd2hldGhlciBvciBub3QgbW9yZSB2YWx1ZXMgd2lsbCBiZSBlbWl0dGVkIG9uIHRoZSBzb3VyY2UuIEZvciB0aGlzIHJlYXNvbixcbiAqIGFsbCB2YWx1ZXMgYXJlIGVtaXR0ZWQgc3luY2hyb25vdXNseSwgZm9sbG93ZWQgYnkgdGhlIGNvbXBsZXRlIG5vdGlmaWNhdGlvbi5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5UYWtlIHRoZSBsYXN0IDMgdmFsdWVzIG9mIGFuIE9ic2VydmFibGUgd2l0aCBtYW55IHZhbHVlczwvY2FwdGlvbj5cbiAqIHZhciBtYW55ID0gUnguT2JzZXJ2YWJsZS5yYW5nZSgxLCAxMDApO1xuICogdmFyIGxhc3RUaHJlZSA9IG1hbnkudGFrZUxhc3QoMyk7XG4gKiBsYXN0VGhyZWUuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIHRha2V9XG4gKiBAc2VlIHtAbGluayB0YWtlVW50aWx9XG4gKiBAc2VlIHtAbGluayB0YWtlV2hpbGV9XG4gKiBAc2VlIHtAbGluayBza2lwfVxuICpcbiAqIEB0aHJvd3Mge0FyZ3VtZW50T3V0T2ZSYW5nZUVycm9yfSBXaGVuIHVzaW5nIGB0YWtlTGFzdChpKWAsIGl0IGRlbGl2ZXJzIGFuXG4gKiBBcmd1bWVudE91dE9yUmFuZ2VFcnJvciB0byB0aGUgT2JzZXJ2ZXIncyBgZXJyb3JgIGNhbGxiYWNrIGlmIGBpIDwgMGAuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGNvdW50IFRoZSBtYXhpbXVtIG51bWJlciBvZiB2YWx1ZXMgdG8gZW1pdCBmcm9tIHRoZSBlbmQgb2ZcbiAqIHRoZSBzZXF1ZW5jZSBvZiB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYXQgbW9zdCB0aGUgbGFzdCBjb3VudFxuICogdmFsdWVzIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQG1ldGhvZCB0YWtlTGFzdFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gdGFrZUxhc3QoY291bnQpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEudGFrZUxhc3QoY291bnQpKHRoaXMpO1xufVxuZXhwb3J0cy50YWtlTGFzdCA9IHRha2VMYXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGFrZUxhc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgY291bnRfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9jb3VudFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5jb3VudCA9IGNvdW50XzEuY291bnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3VudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBsYXN0XzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvbGFzdFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5sYXN0ID0gbGFzdF8xLmxhc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIHppcF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3ppcFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS56aXAgPSB6aXBfMS56aXBQcm90bztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXppcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBza2lwV2hpbGVfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9za2lwV2hpbGVcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUuc2tpcFdoaWxlID0gc2tpcFdoaWxlXzEuc2tpcFdoaWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2tpcFdoaWxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGludGVybmFsX2NvbXBhdGliaWxpdHlfMSA9IHJlcXVpcmUoXCJyeGpzL2ludGVybmFsLWNvbXBhdGliaWxpdHlcIik7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBCdWZmZXJzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB2YWx1ZXMgZm9yIGEgc3BlY2lmaWMgdGltZSBwZXJpb2QuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkNvbGxlY3RzIHZhbHVlcyBmcm9tIHRoZSBwYXN0IGFzIGFuIGFycmF5LCBhbmQgZW1pdHNcbiAqIHRob3NlIGFycmF5cyBwZXJpb2RpY2FsbHkgaW4gdGltZS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9idWZmZXJUaW1lLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEJ1ZmZlcnMgdmFsdWVzIGZyb20gdGhlIHNvdXJjZSBmb3IgYSBzcGVjaWZpYyB0aW1lIGR1cmF0aW9uIGBidWZmZXJUaW1lU3BhbmAuXG4gKiBVbmxlc3MgdGhlIG9wdGlvbmFsIGFyZ3VtZW50IGBidWZmZXJDcmVhdGlvbkludGVydmFsYCBpcyBnaXZlbiwgaXQgZW1pdHMgYW5kXG4gKiByZXNldHMgdGhlIGJ1ZmZlciBldmVyeSBgYnVmZmVyVGltZVNwYW5gIG1pbGxpc2Vjb25kcy4gSWZcbiAqIGBidWZmZXJDcmVhdGlvbkludGVydmFsYCBpcyBnaXZlbiwgdGhpcyBvcGVyYXRvciBvcGVucyB0aGUgYnVmZmVyIGV2ZXJ5XG4gKiBgYnVmZmVyQ3JlYXRpb25JbnRlcnZhbGAgbWlsbGlzZWNvbmRzIGFuZCBjbG9zZXMgKGVtaXRzIGFuZCByZXNldHMpIHRoZVxuICogYnVmZmVyIGV2ZXJ5IGBidWZmZXJUaW1lU3BhbmAgbWlsbGlzZWNvbmRzLiBXaGVuIHRoZSBvcHRpb25hbCBhcmd1bWVudFxuICogYG1heEJ1ZmZlclNpemVgIGlzIHNwZWNpZmllZCwgdGhlIGJ1ZmZlciB3aWxsIGJlIGNsb3NlZCBlaXRoZXIgYWZ0ZXJcbiAqIGBidWZmZXJUaW1lU3BhbmAgbWlsbGlzZWNvbmRzIG9yIHdoZW4gaXQgY29udGFpbnMgYG1heEJ1ZmZlclNpemVgIGVsZW1lbnRzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkV2ZXJ5IHNlY29uZCwgZW1pdCBhbiBhcnJheSBvZiB0aGUgcmVjZW50IGNsaWNrIGV2ZW50czwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgYnVmZmVyZWQgPSBjbGlja3MuYnVmZmVyVGltZSgxMDAwKTtcbiAqIGJ1ZmZlcmVkLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FdmVyeSA1IHNlY29uZHMsIGVtaXQgdGhlIGNsaWNrIGV2ZW50cyBmcm9tIHRoZSBuZXh0IDIgc2Vjb25kczwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgYnVmZmVyZWQgPSBjbGlja3MuYnVmZmVyVGltZSgyMDAwLCA1MDAwKTtcbiAqIGJ1ZmZlcmVkLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBidWZmZXJ9XG4gKiBAc2VlIHtAbGluayBidWZmZXJDb3VudH1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlclRvZ2dsZX1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlcldoZW59XG4gKiBAc2VlIHtAbGluayB3aW5kb3dUaW1lfVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBidWZmZXJUaW1lU3BhbiBUaGUgYW1vdW50IG9mIHRpbWUgdG8gZmlsbCBlYWNoIGJ1ZmZlciBhcnJheS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYnVmZmVyQ3JlYXRpb25JbnRlcnZhbF0gVGhlIGludGVydmFsIGF0IHdoaWNoIHRvIHN0YXJ0IG5ld1xuICogYnVmZmVycy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbWF4QnVmZmVyU2l6ZV0gVGhlIG1heGltdW0gYnVmZmVyIHNpemUuXG4gKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcj1hc3luY1NjaGVkdWxlcl0gVGhlIHNjaGVkdWxlciBvbiB3aGljaCB0byBzY2hlZHVsZSB0aGVcbiAqIGludGVydmFscyB0aGF0IGRldGVybWluZSBidWZmZXIgYm91bmRhcmllcy5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VFtdPn0gQW4gb2JzZXJ2YWJsZSBvZiBhcnJheXMgb2YgYnVmZmVyZWQgdmFsdWVzLlxuICogQG1ldGhvZCBidWZmZXJUaW1lXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBidWZmZXJUaW1lKGJ1ZmZlclRpbWVTcGFuKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIHNjaGVkdWxlciA9IHJ4anNfMS5hc3luY1NjaGVkdWxlcjtcbiAgICBpZiAoaW50ZXJuYWxfY29tcGF0aWJpbGl0eV8xLmlzU2NoZWR1bGVyKGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV0pKSB7XG4gICAgICAgIHNjaGVkdWxlciA9IGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgIGxlbmd0aC0tO1xuICAgIH1cbiAgICB2YXIgYnVmZmVyQ3JlYXRpb25JbnRlcnZhbCA9IG51bGw7XG4gICAgaWYgKGxlbmd0aCA+PSAyKSB7XG4gICAgICAgIGJ1ZmZlckNyZWF0aW9uSW50ZXJ2YWwgPSBhcmd1bWVudHNbMV07XG4gICAgfVxuICAgIHZhciBtYXhCdWZmZXJTaXplID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgIGlmIChsZW5ndGggPj0gMykge1xuICAgICAgICBtYXhCdWZmZXJTaXplID0gYXJndW1lbnRzWzJdO1xuICAgIH1cbiAgICByZXR1cm4gb3BlcmF0b3JzXzEuYnVmZmVyVGltZShidWZmZXJUaW1lU3BhbiwgYnVmZmVyQ3JlYXRpb25JbnRlcnZhbCwgbWF4QnVmZmVyU2l6ZSwgc2NoZWR1bGVyKSh0aGlzKTtcbn1cbmV4cG9ydHMuYnVmZmVyVGltZSA9IGJ1ZmZlclRpbWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idWZmZXJUaW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIHB1Ymxpc2hCZWhhdmlvcl8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3B1Ymxpc2hCZWhhdmlvclwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5wdWJsaXNoQmVoYXZpb3IgPSBwdWJsaXNoQmVoYXZpb3JfMS5wdWJsaXNoQmVoYXZpb3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wdWJsaXNoQmVoYXZpb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IG1pcnJvcnMgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHdpdGggdGhlIGV4Y2VwdGlvbiBvZiBhIGBjb21wbGV0ZWAuIElmIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgY2FsbHMgYGNvbXBsZXRlYCwgdGhpcyBtZXRob2Qgd2lsbCBlbWl0IHRvIHRoZSBPYnNlcnZhYmxlIHJldHVybmVkIGZyb20gYG5vdGlmaWVyYC4gSWYgdGhhdCBPYnNlcnZhYmxlXG4gKiBjYWxscyBgY29tcGxldGVgIG9yIGBlcnJvcmAsIHRoZW4gdGhpcyBtZXRob2Qgd2lsbCBjYWxsIGBjb21wbGV0ZWAgb3IgYGVycm9yYCBvbiB0aGUgY2hpbGQgc3Vic2NyaXB0aW9uLiBPdGhlcndpc2VcbiAqIHRoaXMgbWV0aG9kIHdpbGwgcmVzdWJzY3JpYmUgdG8gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvcmVwZWF0V2hlbi5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKG5vdGlmaWNhdGlvbnM6IE9ic2VydmFibGUpOiBPYnNlcnZhYmxlfSBub3RpZmllciAtIFJlY2VpdmVzIGFuIE9ic2VydmFibGUgb2Ygbm90aWZpY2F0aW9ucyB3aXRoXG4gKiB3aGljaCBhIHVzZXIgY2FuIGBjb21wbGV0ZWAgb3IgYGVycm9yYCwgYWJvcnRpbmcgdGhlIHJlcGV0aXRpb24uXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBUaGUgc291cmNlIE9ic2VydmFibGUgbW9kaWZpZWQgd2l0aCByZXBlYXQgbG9naWMuXG4gKiBAbWV0aG9kIHJlcGVhdFdoZW5cbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIHJlcGVhdFdoZW4obm90aWZpZXIpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEucmVwZWF0V2hlbihub3RpZmllcikodGhpcyk7XG59XG5leHBvcnRzLnJlcGVhdFdoZW4gPSByZXBlYXRXaGVuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVwZWF0V2hlbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG4vKipcbiAqIEZpbHRlciBpdGVtcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBieSBvbmx5IGVtaXR0aW5nIHRob3NlIHRoYXRcbiAqIHNhdGlzZnkgYSBzcGVjaWZpZWQgcHJlZGljYXRlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5MaWtlXG4gKiBbQXJyYXkucHJvdG90eXBlLmZpbHRlcigpXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9maWx0ZXIpLFxuICogaXQgb25seSBlbWl0cyBhIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBpZiBpdCBwYXNzZXMgYSBjcml0ZXJpb24gZnVuY3Rpb24uPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZmlsdGVyLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIFNpbWlsYXIgdG8gdGhlIHdlbGwta25vd24gYEFycmF5LnByb3RvdHlwZS5maWx0ZXJgIG1ldGhvZCwgdGhpcyBvcGVyYXRvclxuICogdGFrZXMgdmFsdWVzIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCBwYXNzZXMgdGhlbSB0aHJvdWdoIGEgYHByZWRpY2F0ZWBcbiAqIGZ1bmN0aW9uIGFuZCBvbmx5IGVtaXRzIHRob3NlIHZhbHVlcyB0aGF0IHlpZWxkZWQgYHRydWVgLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXQgb25seSBjbGljayBldmVudHMgd2hvc2UgdGFyZ2V0IHdhcyBhIERJViBlbGVtZW50PC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBjbGlja3NPbkRpdnMgPSBjbGlja3MuZmlsdGVyKGV2ID0+IGV2LnRhcmdldC50YWdOYW1lID09PSAnRElWJyk7XG4gKiBjbGlja3NPbkRpdnMuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGRpc3RpbmN0fVxuICogQHNlZSB7QGxpbmsgZGlzdGluY3RVbnRpbENoYW5nZWR9XG4gKiBAc2VlIHtAbGluayBkaXN0aW5jdFVudGlsS2V5Q2hhbmdlZH1cbiAqIEBzZWUge0BsaW5rIGlnbm9yZUVsZW1lbnRzfVxuICogQHNlZSB7QGxpbmsgcGFydGl0aW9ufVxuICogQHNlZSB7QGxpbmsgc2tpcH1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKTogYm9vbGVhbn0gcHJlZGljYXRlIEEgZnVuY3Rpb24gdGhhdFxuICogZXZhbHVhdGVzIGVhY2ggdmFsdWUgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuIElmIGl0IHJldHVybnMgYHRydWVgLFxuICogdGhlIHZhbHVlIGlzIGVtaXR0ZWQsIGlmIGBmYWxzZWAgdGhlIHZhbHVlIGlzIG5vdCBwYXNzZWQgdG8gdGhlIG91dHB1dFxuICogT2JzZXJ2YWJsZS4gVGhlIGBpbmRleGAgcGFyYW1ldGVyIGlzIHRoZSBudW1iZXIgYGlgIGZvciB0aGUgaS10aCBzb3VyY2VcbiAqIGVtaXNzaW9uIHRoYXQgaGFzIGhhcHBlbmVkIHNpbmNlIHRoZSBzdWJzY3JpcHRpb24sIHN0YXJ0aW5nIGZyb20gdGhlIG51bWJlclxuICogYDBgLlxuICogQHBhcmFtIHthbnl9IFt0aGlzQXJnXSBBbiBvcHRpb25hbCBhcmd1bWVudCB0byBkZXRlcm1pbmUgdGhlIHZhbHVlIG9mIGB0aGlzYFxuICogaW4gdGhlIGBwcmVkaWNhdGVgIGZ1bmN0aW9uLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSBvZiB2YWx1ZXMgZnJvbSB0aGUgc291cmNlIHRoYXQgd2VyZVxuICogYWxsb3dlZCBieSB0aGUgYHByZWRpY2F0ZWAgZnVuY3Rpb24uXG4gKiBAbWV0aG9kIGZpbHRlclxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gZmlsdGVyKHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5maWx0ZXIocHJlZGljYXRlLCB0aGlzQXJnKSh0aGlzKTtcbn1cbmV4cG9ydHMuZmlsdGVyID0gZmlsdGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsdGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbi8qKlxuICogR3JvdXBzIHRoZSBpdGVtcyBlbWl0dGVkIGJ5IGFuIE9ic2VydmFibGUgYWNjb3JkaW5nIHRvIGEgc3BlY2lmaWVkIGNyaXRlcmlvbixcbiAqIGFuZCBlbWl0cyB0aGVzZSBncm91cGVkIGl0ZW1zIGFzIGBHcm91cGVkT2JzZXJ2YWJsZXNgLCBvbmVcbiAqIHtAbGluayBHcm91cGVkT2JzZXJ2YWJsZX0gcGVyIGdyb3VwLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZ3JvdXBCeS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Hcm91cCBvYmplY3RzIGJ5IGlkIGFuZCByZXR1cm4gYXMgYXJyYXk8L2NhcHRpb24+XG4gKiBPYnNlcnZhYmxlLm9mPE9iaj4oe2lkOiAxLCBuYW1lOiAnYXplMSd9LFxuICogICAgICAgICAgICAgICAgICAgIHtpZDogMiwgbmFtZTogJ3NmMid9LFxuICogICAgICAgICAgICAgICAgICAgIHtpZDogMiwgbmFtZTogJ2RnMid9LFxuICogICAgICAgICAgICAgICAgICAgIHtpZDogMSwgbmFtZTogJ2VyZzEnfSxcbiAqICAgICAgICAgICAgICAgICAgICB7aWQ6IDEsIG5hbWU6ICdkZjEnfSxcbiAqICAgICAgICAgICAgICAgICAgICB7aWQ6IDIsIG5hbWU6ICdzZnFmYjInfSxcbiAqICAgICAgICAgICAgICAgICAgICB7aWQ6IDMsIG5hbWU6ICdxZnMzJ30sXG4gKiAgICAgICAgICAgICAgICAgICAge2lkOiAyLCBuYW1lOiAncXNncXNmZzInfVxuICogICAgIClcbiAqICAgICAuZ3JvdXBCeShwID0+IHAuaWQpXG4gKiAgICAgLmZsYXRNYXAoIChncm91cCQpID0+IGdyb3VwJC5yZWR1Y2UoKGFjYywgY3VyKSA9PiBbLi4uYWNjLCBjdXJdLCBbXSkpXG4gKiAgICAgLnN1YnNjcmliZShwID0+IGNvbnNvbGUubG9nKHApKTtcbiAqXG4gKiAvLyBkaXNwbGF5czpcbiAqIC8vIFsgeyBpZDogMSwgbmFtZTogJ2F6ZTEnIH0sXG4gKiAvLyAgIHsgaWQ6IDEsIG5hbWU6ICdlcmcxJyB9LFxuICogLy8gICB7IGlkOiAxLCBuYW1lOiAnZGYxJyB9IF1cbiAqIC8vXG4gKiAvLyBbIHsgaWQ6IDIsIG5hbWU6ICdzZjInIH0sXG4gKiAvLyAgIHsgaWQ6IDIsIG5hbWU6ICdkZzInIH0sXG4gKiAvLyAgIHsgaWQ6IDIsIG5hbWU6ICdzZnFmYjInIH0sXG4gKiAvLyAgIHsgaWQ6IDIsIG5hbWU6ICdxc2dxc2ZnMicgfSBdXG4gKiAvL1xuICogLy8gWyB7IGlkOiAzLCBuYW1lOiAncWZzMycgfSBdXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+UGl2b3QgZGF0YSBvbiB0aGUgaWQgZmllbGQ8L2NhcHRpb24+XG4gKiBPYnNlcnZhYmxlLm9mPE9iaj4oe2lkOiAxLCBuYW1lOiAnYXplMSd9LFxuICogICAgICAgICAgICAgICAgICAgIHtpZDogMiwgbmFtZTogJ3NmMid9LFxuICogICAgICAgICAgICAgICAgICAgIHtpZDogMiwgbmFtZTogJ2RnMid9LFxuICogICAgICAgICAgICAgICAgICAgIHtpZDogMSwgbmFtZTogJ2VyZzEnfSxcbiAqICAgICAgICAgICAgICAgICAgICB7aWQ6IDEsIG5hbWU6ICdkZjEnfSxcbiAqICAgICAgICAgICAgICAgICAgICB7aWQ6IDIsIG5hbWU6ICdzZnFmYjInfSxcbiAqICAgICAgICAgICAgICAgICAgICB7aWQ6IDMsIG5hbWU6ICdxZnMxJ30sXG4gKiAgICAgICAgICAgICAgICAgICAge2lkOiAyLCBuYW1lOiAncXNncXNmZzInfVxuICogICAgICAgICAgICAgICAgICAgKVxuICogICAgIC5ncm91cEJ5KHAgPT4gcC5pZCwgcCA9PiBwLm5hbWUpXG4gKiAgICAgLmZsYXRNYXAoIChncm91cCQpID0+IGdyb3VwJC5yZWR1Y2UoKGFjYywgY3VyKSA9PiBbLi4uYWNjLCBjdXJdLCBbXCJcIiArIGdyb3VwJC5rZXldKSlcbiAqICAgICAubWFwKGFyciA9PiAoeydpZCc6IHBhcnNlSW50KGFyclswXSksICd2YWx1ZXMnOiBhcnIuc2xpY2UoMSl9KSlcbiAqICAgICAuc3Vic2NyaWJlKHAgPT4gY29uc29sZS5sb2cocCkpO1xuICpcbiAqIC8vIGRpc3BsYXlzOlxuICogLy8geyBpZDogMSwgdmFsdWVzOiBbICdhemUxJywgJ2VyZzEnLCAnZGYxJyBdIH1cbiAqIC8vIHsgaWQ6IDIsIHZhbHVlczogWyAnc2YyJywgJ2RnMicsICdzZnFmYjInLCAncXNncXNmZzInIF0gfVxuICogLy8geyBpZDogMywgdmFsdWVzOiBbICdxZnMxJyBdIH1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBUKTogS30ga2V5U2VsZWN0b3IgQSBmdW5jdGlvbiB0aGF0IGV4dHJhY3RzIHRoZSBrZXlcbiAqIGZvciBlYWNoIGl0ZW0uXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBUKTogUn0gW2VsZW1lbnRTZWxlY3Rvcl0gQSBmdW5jdGlvbiB0aGF0IGV4dHJhY3RzIHRoZVxuICogcmV0dXJuIGVsZW1lbnQgZm9yIGVhY2ggaXRlbS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oZ3JvdXBlZDogR3JvdXBlZE9ic2VydmFibGU8SyxSPik6IE9ic2VydmFibGU8YW55Pn0gW2R1cmF0aW9uU2VsZWN0b3JdXG4gKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRvIGRldGVybWluZSBob3cgbG9uZyBlYWNoIGdyb3VwIHNob3VsZFxuICogZXhpc3QuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPEdyb3VwZWRPYnNlcnZhYmxlPEssUj4+fSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHNcbiAqIEdyb3VwZWRPYnNlcnZhYmxlcywgZWFjaCBvZiB3aGljaCBjb3JyZXNwb25kcyB0byBhIHVuaXF1ZSBrZXkgdmFsdWUgYW5kIGVhY2hcbiAqIG9mIHdoaWNoIGVtaXRzIHRob3NlIGl0ZW1zIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRoYXQgc2hhcmUgdGhhdCBrZXlcbiAqIHZhbHVlLlxuICogQG1ldGhvZCBncm91cEJ5XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBncm91cEJ5KGtleVNlbGVjdG9yLCBlbGVtZW50U2VsZWN0b3IsIGR1cmF0aW9uU2VsZWN0b3IsIHN1YmplY3RTZWxlY3Rvcikge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5ncm91cEJ5KGtleVNlbGVjdG9yLCBlbGVtZW50U2VsZWN0b3IsIGR1cmF0aW9uU2VsZWN0b3IsIHN1YmplY3RTZWxlY3RvcikodGhpcyk7XG59XG5leHBvcnRzLmdyb3VwQnkgPSBncm91cEJ5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z3JvdXBCeS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogQnVmZmVycyB0aGUgc291cmNlIE9ic2VydmFibGUgdmFsdWVzIHN0YXJ0aW5nIGZyb20gYW4gZW1pc3Npb24gZnJvbVxuICogYG9wZW5pbmdzYCBhbmQgZW5kaW5nIHdoZW4gdGhlIG91dHB1dCBvZiBgY2xvc2luZ1NlbGVjdG9yYCBlbWl0cy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+Q29sbGVjdHMgdmFsdWVzIGZyb20gdGhlIHBhc3QgYXMgYW4gYXJyYXkuIFN0YXJ0c1xuICogY29sbGVjdGluZyBvbmx5IHdoZW4gYG9wZW5pbmdgIGVtaXRzLCBhbmQgY2FsbHMgdGhlIGBjbG9zaW5nU2VsZWN0b3JgXG4gKiBmdW5jdGlvbiB0byBnZXQgYW4gT2JzZXJ2YWJsZSB0aGF0IHRlbGxzIHdoZW4gdG8gY2xvc2UgdGhlIGJ1ZmZlci48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9idWZmZXJUb2dnbGUucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogQnVmZmVycyB2YWx1ZXMgZnJvbSB0aGUgc291cmNlIGJ5IG9wZW5pbmcgdGhlIGJ1ZmZlciB2aWEgc2lnbmFscyBmcm9tIGFuXG4gKiBPYnNlcnZhYmxlIHByb3ZpZGVkIHRvIGBvcGVuaW5nc2AsIGFuZCBjbG9zaW5nIGFuZCBzZW5kaW5nIHRoZSBidWZmZXJzIHdoZW5cbiAqIGEgU3Vic2NyaWJhYmxlIG9yIFByb21pc2UgcmV0dXJuZWQgYnkgdGhlIGBjbG9zaW5nU2VsZWN0b3JgIGZ1bmN0aW9uIGVtaXRzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkV2ZXJ5IG90aGVyIHNlY29uZCwgZW1pdCB0aGUgY2xpY2sgZXZlbnRzIGZyb20gdGhlIG5leHQgNTAwbXM8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIG9wZW5pbmdzID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKTtcbiAqIHZhciBidWZmZXJlZCA9IGNsaWNrcy5idWZmZXJUb2dnbGUob3BlbmluZ3MsIGkgPT5cbiAqICAgaSAlIDIgPyBSeC5PYnNlcnZhYmxlLmludGVydmFsKDUwMCkgOiBSeC5PYnNlcnZhYmxlLmVtcHR5KClcbiAqICk7XG4gKiBidWZmZXJlZC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgYnVmZmVyfVxuICogQHNlZSB7QGxpbmsgYnVmZmVyQ291bnR9XG4gKiBAc2VlIHtAbGluayBidWZmZXJUaW1lfVxuICogQHNlZSB7QGxpbmsgYnVmZmVyV2hlbn1cbiAqIEBzZWUge0BsaW5rIHdpbmRvd1RvZ2dsZX1cbiAqXG4gKiBAcGFyYW0ge1N1YnNjcmliYWJsZU9yUHJvbWlzZTxPPn0gb3BlbmluZ3MgQSBTdWJzY3JpYmFibGUgb3IgUHJvbWlzZSBvZiBub3RpZmljYXRpb25zIHRvIHN0YXJ0IG5ld1xuICogYnVmZmVycy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IE8pOiBTdWJzY3JpYmFibGVPclByb21pc2V9IGNsb3NpbmdTZWxlY3RvciBBIGZ1bmN0aW9uIHRoYXQgdGFrZXNcbiAqIHRoZSB2YWx1ZSBlbWl0dGVkIGJ5IHRoZSBgb3BlbmluZ3NgIG9ic2VydmFibGUgYW5kIHJldHVybnMgYSBTdWJzY3JpYmFibGUgb3IgUHJvbWlzZSxcbiAqIHdoaWNoLCB3aGVuIGl0IGVtaXRzLCBzaWduYWxzIHRoYXQgdGhlIGFzc29jaWF0ZWQgYnVmZmVyIHNob3VsZCBiZSBlbWl0dGVkXG4gKiBhbmQgY2xlYXJlZC5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VFtdPn0gQW4gb2JzZXJ2YWJsZSBvZiBhcnJheXMgb2YgYnVmZmVyZWQgdmFsdWVzLlxuICogQG1ldGhvZCBidWZmZXJUb2dnbGVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIGJ1ZmZlclRvZ2dsZShvcGVuaW5ncywgY2xvc2luZ1NlbGVjdG9yKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLmJ1ZmZlclRvZ2dsZShvcGVuaW5ncywgY2xvc2luZ1NlbGVjdG9yKSh0aGlzKTtcbn1cbmV4cG9ydHMuYnVmZmVyVG9nZ2xlID0gYnVmZmVyVG9nZ2xlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnVmZmVyVG9nZ2xlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGRvXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvZG9cIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUuZG8gPSBkb18xLl9kbztcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5fZG8gPSBkb18xLl9kbztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xucnhqc18xLk9ic2VydmFibGUub2YgPSByeGpzXzEub2Y7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vZi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciByZXBlYXRfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9yZXBlYXRcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUucmVwZWF0ID0gcmVwZWF0XzEucmVwZWF0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVwZWF0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGdyb3VwQnlfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9ncm91cEJ5XCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLmdyb3VwQnkgPSBncm91cEJ5XzEuZ3JvdXBCeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdyb3VwQnkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIFNraXAgdGhlIGxhc3QgYGNvdW50YCB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9za2lwTGFzdC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgc2tpcExhc3RgIHJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGFjY3VtdWxhdGVzIGEgcXVldWUgd2l0aCBhIGxlbmd0aFxuICogZW5vdWdoIHRvIHN0b3JlIHRoZSBmaXJzdCBgY291bnRgIHZhbHVlcy4gQXMgbW9yZSB2YWx1ZXMgYXJlIHJlY2VpdmVkLFxuICogdmFsdWVzIGFyZSB0YWtlbiBmcm9tIHRoZSBmcm9udCBvZiB0aGUgcXVldWUgYW5kIHByb2R1Y2VkIG9uIHRoZSByZXN1bHRcbiAqIHNlcXVlbmNlLiBUaGlzIGNhdXNlcyB2YWx1ZXMgdG8gYmUgZGVsYXllZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Ta2lwIHRoZSBsYXN0IDIgdmFsdWVzIG9mIGFuIE9ic2VydmFibGUgd2l0aCBtYW55IHZhbHVlczwvY2FwdGlvbj5cbiAqIHZhciBtYW55ID0gUnguT2JzZXJ2YWJsZS5yYW5nZSgxLCA1KTtcbiAqIHZhciBza2lwTGFzdFR3byA9IG1hbnkuc2tpcExhc3QoMik7XG4gKiBza2lwTGFzdFR3by5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogLy8gUmVzdWx0cyBpbjpcbiAqIC8vIDEgMiAzXG4gKlxuICogQHNlZSB7QGxpbmsgc2tpcH1cbiAqIEBzZWUge0BsaW5rIHNraXBVbnRpbH1cbiAqIEBzZWUge0BsaW5rIHNraXBXaGlsZX1cbiAqIEBzZWUge0BsaW5rIHRha2V9XG4gKlxuICogQHRocm93cyB7QXJndW1lbnRPdXRPZlJhbmdlRXJyb3J9IFdoZW4gdXNpbmcgYHNraXBMYXN0KGkpYCwgaXQgdGhyb3dzXG4gKiBBcmd1bWVudE91dE9yUmFuZ2VFcnJvciBpZiBgaSA8IDBgLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBmcm9tIHRoZSBlbmQgb2YgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQHJldHVybnMge09ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgdGhhdCBza2lwcyB0aGUgbGFzdCBjb3VudCB2YWx1ZXNcbiAqIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQG1ldGhvZCBza2lwTGFzdFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gc2tpcExhc3QoY291bnQpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEuc2tpcExhc3QoY291bnQpKHRoaXMpO1xufVxuZXhwb3J0cy5za2lwTGFzdCA9IHNraXBMYXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2tpcExhc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIEVtaXRzIHRoZSBtb3N0IHJlY2VudGx5IGVtaXR0ZWQgdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgd2hlbmV2ZXJcbiAqIGFub3RoZXIgT2JzZXJ2YWJsZSwgdGhlIGBub3RpZmllcmAsIGVtaXRzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIGxpa2Uge0BsaW5rIHNhbXBsZVRpbWV9LCBidXQgc2FtcGxlcyB3aGVuZXZlclxuICogdGhlIGBub3RpZmllcmAgT2JzZXJ2YWJsZSBlbWl0cyBzb21ldGhpbmcuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvc2FtcGxlLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIFdoZW5ldmVyIHRoZSBgbm90aWZpZXJgIE9ic2VydmFibGUgZW1pdHMgYSB2YWx1ZSBvciBjb21wbGV0ZXMsIGBzYW1wbGVgXG4gKiBsb29rcyBhdCB0aGUgc291cmNlIE9ic2VydmFibGUgYW5kIGVtaXRzIHdoaWNoZXZlciB2YWx1ZSBpdCBoYXMgbW9zdCByZWNlbnRseVxuICogZW1pdHRlZCBzaW5jZSB0aGUgcHJldmlvdXMgc2FtcGxpbmcsIHVubGVzcyB0aGUgc291cmNlIGhhcyBub3QgZW1pdHRlZFxuICogYW55dGhpbmcgc2luY2UgdGhlIHByZXZpb3VzIHNhbXBsaW5nLiBUaGUgYG5vdGlmaWVyYCBpcyBzdWJzY3JpYmVkIHRvIGFzIHNvb25cbiAqIGFzIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBpcyBzdWJzY3JpYmVkLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk9uIGV2ZXJ5IGNsaWNrLCBzYW1wbGUgdGhlIG1vc3QgcmVjZW50IFwic2Vjb25kc1wiIHRpbWVyPC9jYXB0aW9uPlxuICogdmFyIHNlY29uZHMgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciByZXN1bHQgPSBzZWNvbmRzLnNhbXBsZShjbGlja3MpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBhdWRpdH1cbiAqIEBzZWUge0BsaW5rIGRlYm91bmNlfVxuICogQHNlZSB7QGxpbmsgc2FtcGxlVGltZX1cbiAqIEBzZWUge0BsaW5rIHRocm90dGxlfVxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZTxhbnk+fSBub3RpZmllciBUaGUgT2JzZXJ2YWJsZSB0byB1c2UgZm9yIHNhbXBsaW5nIHRoZVxuICogc291cmNlIE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHJlc3VsdHMgb2Ygc2FtcGxpbmcgdGhlXG4gKiB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgd2hlbmV2ZXIgdGhlIG5vdGlmaWVyIE9ic2VydmFibGVcbiAqIGVtaXRzIHZhbHVlIG9yIGNvbXBsZXRlcy5cbiAqIEBtZXRob2Qgc2FtcGxlXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBzYW1wbGUobm90aWZpZXIpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEuc2FtcGxlKG5vdGlmaWVyKSh0aGlzKTtcbn1cbmV4cG9ydHMuc2FtcGxlID0gc2FtcGxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2FtcGxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBAcmV0dXJuIHtDb25uZWN0YWJsZU9ic2VydmFibGU8VD59XG4gKiBAbWV0aG9kIHB1Ymxpc2hMYXN0XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBwdWJsaXNoTGFzdCgpIHtcbiAgICAvL1RPRE8oYmVubGVzaCk6IGNvcnJlY3QgdHlwZS1mbG93IHRocm91Z2ggaGVyZS5cbiAgICByZXR1cm4gb3BlcmF0b3JzXzEucHVibGlzaExhc3QoKSh0aGlzKTtcbn1cbmV4cG9ydHMucHVibGlzaExhc3QgPSBwdWJsaXNoTGFzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXB1Ymxpc2hMYXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGV4cGFuZF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL2V4cGFuZFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5leHBhbmQgPSBleHBhbmRfMS5leHBhbmQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leHBhbmQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgZGVmYXVsdElmRW1wdHlfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9kZWZhdWx0SWZFbXB0eVwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5kZWZhdWx0SWZFbXB0eSA9IGRlZmF1bHRJZkVtcHR5XzEuZGVmYXVsdElmRW1wdHk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWZhdWx0SWZFbXB0eS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBvbkVycm9yUmVzdW1lTmV4dF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL29uRXJyb3JSZXN1bWVOZXh0XCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLm9uRXJyb3JSZXN1bWVOZXh0ID0gb25FcnJvclJlc3VtZU5leHRfMS5vbkVycm9yUmVzdW1lTmV4dDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9uRXJyb3JSZXN1bWVOZXh0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGNvbWJpbmVMYXRlc3RfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9jb21iaW5lTGF0ZXN0XCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLmNvbWJpbmVMYXRlc3QgPSBjb21iaW5lTGF0ZXN0XzEuY29tYmluZUxhdGVzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbWJpbmVMYXRlc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgc2luZ2xlXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3Ivc2luZ2xlXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLnNpbmdsZSA9IHNpbmdsZV8xLnNpbmdsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpbmdsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgcmVwZWF0cyB0aGUgc3RyZWFtIG9mIGl0ZW1zIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGF0IG1vc3QgY291bnQgdGltZXMuXG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9yZXBlYXQucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtjb3VudF0gVGhlIG51bWJlciBvZiB0aW1lcyB0aGUgc291cmNlIE9ic2VydmFibGUgaXRlbXMgYXJlIHJlcGVhdGVkLCBhIGNvdW50IG9mIDAgd2lsbCB5aWVsZFxuICogYW4gZW1wdHkgT2JzZXJ2YWJsZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCByZXBlYXRzIHRoZSBzdHJlYW0gb2YgaXRlbXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgYXQgbW9zdFxuICogY291bnQgdGltZXMuXG4gKiBAbWV0aG9kIHJlcGVhdFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gcmVwZWF0KGNvdW50KSB7XG4gICAgaWYgKGNvdW50ID09PSB2b2lkIDApIHsgY291bnQgPSAtMTsgfVxuICAgIHJldHVybiBvcGVyYXRvcnNfMS5yZXBlYXQoY291bnQpKHRoaXMpO1xufVxuZXhwb3J0cy5yZXBlYXQgPSByZXBlYXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXBlYXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIENvbnZlcnRzIGFuIE9ic2VydmFibGUgb2Yge0BsaW5rIE5vdGlmaWNhdGlvbn0gb2JqZWN0cyBpbnRvIHRoZSBlbWlzc2lvbnNcbiAqIHRoYXQgdGhleSByZXByZXNlbnQuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPlVud3JhcHMge0BsaW5rIE5vdGlmaWNhdGlvbn0gb2JqZWN0cyBhcyBhY3R1YWwgYG5leHRgLFxuICogYGVycm9yYCBhbmQgYGNvbXBsZXRlYCBlbWlzc2lvbnMuIFRoZSBvcHBvc2l0ZSBvZiB7QGxpbmsgbWF0ZXJpYWxpemV9Ljwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2RlbWF0ZXJpYWxpemUucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYGRlbWF0ZXJpYWxpemVgIGlzIGFzc3VtZWQgdG8gb3BlcmF0ZSBhbiBPYnNlcnZhYmxlIHRoYXQgb25seSBlbWl0c1xuICoge0BsaW5rIE5vdGlmaWNhdGlvbn0gb2JqZWN0cyBhcyBgbmV4dGAgZW1pc3Npb25zLCBhbmQgZG9lcyBub3QgZW1pdCBhbnlcbiAqIGBlcnJvcmAuIFN1Y2ggT2JzZXJ2YWJsZSBpcyB0aGUgb3V0cHV0IG9mIGEgYG1hdGVyaWFsaXplYCBvcGVyYXRpb24uIFRob3NlXG4gKiBub3RpZmljYXRpb25zIGFyZSB0aGVuIHVud3JhcHBlZCB1c2luZyB0aGUgbWV0YWRhdGEgdGhleSBjb250YWluLCBhbmQgZW1pdHRlZFxuICogYXMgYG5leHRgLCBgZXJyb3JgLCBhbmQgYGNvbXBsZXRlYCBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKlxuICogVXNlIHRoaXMgb3BlcmF0b3IgaW4gY29uanVuY3Rpb24gd2l0aCB7QGxpbmsgbWF0ZXJpYWxpemV9LlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNvbnZlcnQgYW4gT2JzZXJ2YWJsZSBvZiBOb3RpZmljYXRpb25zIHRvIGFuIGFjdHVhbCBPYnNlcnZhYmxlPC9jYXB0aW9uPlxuICogdmFyIG5vdGlmQSA9IG5ldyBSeC5Ob3RpZmljYXRpb24oJ04nLCAnQScpO1xuICogdmFyIG5vdGlmQiA9IG5ldyBSeC5Ob3RpZmljYXRpb24oJ04nLCAnQicpO1xuICogdmFyIG5vdGlmRSA9IG5ldyBSeC5Ob3RpZmljYXRpb24oJ0UnLCB2b2lkIDAsXG4gKiAgIG5ldyBUeXBlRXJyb3IoJ3gudG9VcHBlckNhc2UgaXMgbm90IGEgZnVuY3Rpb24nKVxuICogKTtcbiAqIHZhciBtYXRlcmlhbGl6ZWQgPSBSeC5PYnNlcnZhYmxlLm9mKG5vdGlmQSwgbm90aWZCLCBub3RpZkUpO1xuICogdmFyIHVwcGVyQ2FzZSA9IG1hdGVyaWFsaXplZC5kZW1hdGVyaWFsaXplKCk7XG4gKiB1cHBlckNhc2Uuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCksIGUgPT4gY29uc29sZS5lcnJvcihlKSk7XG4gKlxuICogLy8gUmVzdWx0cyBpbjpcbiAqIC8vIEFcbiAqIC8vIEJcbiAqIC8vIFR5cGVFcnJvcjogeC50b1VwcGVyQ2FzZSBpcyBub3QgYSBmdW5jdGlvblxuICpcbiAqIEBzZWUge0BsaW5rIE5vdGlmaWNhdGlvbn1cbiAqIEBzZWUge0BsaW5rIG1hdGVyaWFsaXplfVxuICpcbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBpdGVtcyBhbmQgbm90aWZpY2F0aW9uc1xuICogZW1iZWRkZWQgaW4gTm90aWZpY2F0aW9uIG9iamVjdHMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIGRlbWF0ZXJpYWxpemVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIGRlbWF0ZXJpYWxpemUoKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLmRlbWF0ZXJpYWxpemUoKSh0aGlzKTtcbn1cbmV4cG9ydHMuZGVtYXRlcmlhbGl6ZSA9IGRlbWF0ZXJpYWxpemU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZW1hdGVyaWFsaXplLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyogdHNsaW50OmRpc2FibGU6bm8tdW51c2VkLXZhcmlhYmxlICovXG4vLyBTdWJqZWN0IGltcG9ydGVkIGJlZm9yZSBPYnNlcnZhYmxlIHRvIGJ5cGFzcyBjaXJjdWxhciBkZXBlbmRlbmN5IGlzc3VlIHNpbmNlXG4vLyBTdWJqZWN0IGV4dGVuZHMgT2JzZXJ2YWJsZSBhbmQgT2JzZXJ2YWJsZSByZWZlcmVuY2VzIFN1YmplY3QgaW4gaXQnc1xuLy8gZGVmaW5pdGlvblxudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xuZXhwb3J0cy5PYnNlcnZhYmxlID0gcnhqc18xLk9ic2VydmFibGU7XG5leHBvcnRzLlN1YmplY3QgPSByeGpzXzEuU3ViamVjdDtcbnZhciBpbnRlcm5hbF9jb21wYXRpYmlsaXR5XzEgPSByZXF1aXJlKFwicnhqcy9pbnRlcm5hbC1jb21wYXRpYmlsaXR5XCIpO1xuZXhwb3J0cy5Bbm9ueW1vdXNTdWJqZWN0ID0gaW50ZXJuYWxfY29tcGF0aWJpbGl0eV8xLkFub255bW91c1N1YmplY3Q7XG4vKiB0c2xpbnQ6ZW5hYmxlOm5vLXVudXNlZC12YXJpYWJsZSAqL1xudmFyIGludGVybmFsX2NvbXBhdGliaWxpdHlfMiA9IHJlcXVpcmUoXCJyeGpzL2ludGVybmFsLWNvbXBhdGliaWxpdHlcIik7XG5leHBvcnRzLmNvbmZpZyA9IGludGVybmFsX2NvbXBhdGliaWxpdHlfMi5jb25maWc7XG4vLyBzdGF0aWNzXG4vKiB0c2xpbnQ6ZGlzYWJsZTpuby11c2UtYmVmb3JlLWRlY2xhcmUgKi9cbnJlcXVpcmUoXCIuL2FkZC9vYnNlcnZhYmxlL2JpbmRDYWxsYmFja1wiKTtcbnJlcXVpcmUoXCIuL2FkZC9vYnNlcnZhYmxlL2JpbmROb2RlQ2FsbGJhY2tcIik7XG5yZXF1aXJlKFwiLi9hZGQvb2JzZXJ2YWJsZS9jb21iaW5lTGF0ZXN0XCIpO1xucmVxdWlyZShcIi4vYWRkL29ic2VydmFibGUvY29uY2F0XCIpO1xucmVxdWlyZShcIi4vYWRkL29ic2VydmFibGUvZGVmZXJcIik7XG5yZXF1aXJlKFwiLi9hZGQvb2JzZXJ2YWJsZS9lbXB0eVwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vYnNlcnZhYmxlL2ZvcmtKb2luXCIpO1xucmVxdWlyZShcIi4vYWRkL29ic2VydmFibGUvZnJvbVwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vYnNlcnZhYmxlL2Zyb21FdmVudFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vYnNlcnZhYmxlL2Zyb21FdmVudFBhdHRlcm5cIik7XG5yZXF1aXJlKFwiLi9hZGQvb2JzZXJ2YWJsZS9mcm9tUHJvbWlzZVwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vYnNlcnZhYmxlL2dlbmVyYXRlXCIpO1xucmVxdWlyZShcIi4vYWRkL29ic2VydmFibGUvaWZcIik7XG5yZXF1aXJlKFwiLi9hZGQvb2JzZXJ2YWJsZS9pbnRlcnZhbFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vYnNlcnZhYmxlL21lcmdlXCIpO1xucmVxdWlyZShcIi4vYWRkL29ic2VydmFibGUvcmFjZVwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vYnNlcnZhYmxlL25ldmVyXCIpO1xucmVxdWlyZShcIi4vYWRkL29ic2VydmFibGUvb2ZcIik7XG5yZXF1aXJlKFwiLi9hZGQvb2JzZXJ2YWJsZS9vbkVycm9yUmVzdW1lTmV4dFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vYnNlcnZhYmxlL3BhaXJzXCIpO1xucmVxdWlyZShcIi4vYWRkL29ic2VydmFibGUvcmFuZ2VcIik7XG5yZXF1aXJlKFwiLi9hZGQvb2JzZXJ2YWJsZS91c2luZ1wiKTtcbnJlcXVpcmUoXCIuL2FkZC9vYnNlcnZhYmxlL3Rocm93XCIpO1xucmVxdWlyZShcIi4vYWRkL29ic2VydmFibGUvdGltZXJcIik7XG5yZXF1aXJlKFwiLi9hZGQvb2JzZXJ2YWJsZS96aXBcIik7XG4vL2RvbVxucmVxdWlyZShcIi4vYWRkL29ic2VydmFibGUvZG9tL2FqYXhcIik7XG5yZXF1aXJlKFwiLi9hZGQvb2JzZXJ2YWJsZS9kb20vd2ViU29ja2V0XCIpO1xuLy9pbnRlcm5hbC9vcGVyYXRvcnNcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9idWZmZXJcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvYnVmZmVyQ291bnRcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvYnVmZmVyVGltZVwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9idWZmZXJUb2dnbGVcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvYnVmZmVyV2hlblwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9jYXRjaFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9jb21iaW5lQWxsXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL2NvbWJpbmVMYXRlc3RcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvY29uY2F0XCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL2NvbmNhdEFsbFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9jb25jYXRNYXBcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvY29uY2F0TWFwVG9cIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvY291bnRcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvZGVtYXRlcmlhbGl6ZVwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9kZWJvdW5jZVwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9kZWJvdW5jZVRpbWVcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvZGVmYXVsdElmRW1wdHlcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvZGVsYXlcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvZGVsYXlXaGVuXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL2Rpc3RpbmN0XCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL2Rpc3RpbmN0VW50aWxDaGFuZ2VkXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL2Rpc3RpbmN0VW50aWxLZXlDaGFuZ2VkXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL2RvXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL2V4aGF1c3RcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvZXhoYXVzdE1hcFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9leHBhbmRcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvZWxlbWVudEF0XCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL2ZpbHRlclwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9maW5hbGx5XCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL2ZpbmRcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvZmluZEluZGV4XCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL2ZpcnN0XCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL2dyb3VwQnlcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvaWdub3JlRWxlbWVudHNcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvaXNFbXB0eVwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9hdWRpdFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9hdWRpdFRpbWVcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvbGFzdFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9sZXRcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvZXZlcnlcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvbWFwXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL21hcFRvXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL21hdGVyaWFsaXplXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL21heFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9tZXJnZVwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9tZXJnZUFsbFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9tZXJnZU1hcFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9tZXJnZU1hcFRvXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL21lcmdlU2NhblwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9taW5cIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvbXVsdGljYXN0XCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL29ic2VydmVPblwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9vbkVycm9yUmVzdW1lTmV4dFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9wYWlyd2lzZVwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9wYXJ0aXRpb25cIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvcGx1Y2tcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvcHVibGlzaFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9wdWJsaXNoQmVoYXZpb3JcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvcHVibGlzaFJlcGxheVwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9wdWJsaXNoTGFzdFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9yYWNlXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL3JlZHVjZVwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9yZXBlYXRcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvcmVwZWF0V2hlblwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9yZXRyeVwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9yZXRyeVdoZW5cIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3Ivc2FtcGxlXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL3NhbXBsZVRpbWVcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3Ivc2NhblwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9zZXF1ZW5jZUVxdWFsXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL3NoYXJlXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL3NoYXJlUmVwbGF5XCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL3NpbmdsZVwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9za2lwXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL3NraXBMYXN0XCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL3NraXBVbnRpbFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9za2lwV2hpbGVcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3Ivc3RhcnRXaXRoXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL3N1YnNjcmliZU9uXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL3N3aXRjaFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci9zd2l0Y2hNYXBcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3Ivc3dpdGNoTWFwVG9cIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvdGFrZVwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci90YWtlTGFzdFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci90YWtlVW50aWxcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvdGFrZVdoaWxlXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL3Rocm90dGxlXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL3Rocm90dGxlVGltZVwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci90aW1lSW50ZXJ2YWxcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvdGltZW91dFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci90aW1lb3V0V2l0aFwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci90aW1lc3RhbXBcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvdG9BcnJheVwiKTtcbnJlcXVpcmUoXCIuL2FkZC9vcGVyYXRvci90b1Byb21pc2VcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3Ivd2luZG93XCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL3dpbmRvd0NvdW50XCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL3dpbmRvd1RpbWVcIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3Ivd2luZG93VG9nZ2xlXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL3dpbmRvd1doZW5cIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3Ivd2l0aExhdGVzdEZyb21cIik7XG5yZXF1aXJlKFwiLi9hZGQvb3BlcmF0b3IvemlwXCIpO1xucmVxdWlyZShcIi4vYWRkL29wZXJhdG9yL3ppcEFsbFwiKTtcbi8qIHRzbGludDpkaXNhYmxlOm5vLXVudXNlZC12YXJpYWJsZSAqL1xudmFyIHJ4anNfMiA9IHJlcXVpcmUoXCJyeGpzXCIpO1xuZXhwb3J0cy5TdWJzY3JpcHRpb24gPSByeGpzXzIuU3Vic2NyaXB0aW9uO1xuZXhwb3J0cy5SZXBsYXlTdWJqZWN0ID0gcnhqc18yLlJlcGxheVN1YmplY3Q7XG5leHBvcnRzLkJlaGF2aW9yU3ViamVjdCA9IHJ4anNfMi5CZWhhdmlvclN1YmplY3Q7XG5leHBvcnRzLk5vdGlmaWNhdGlvbiA9IHJ4anNfMi5Ob3RpZmljYXRpb247XG5leHBvcnRzLkVtcHR5RXJyb3IgPSByeGpzXzIuRW1wdHlFcnJvcjtcbmV4cG9ydHMuQXJndW1lbnRPdXRPZlJhbmdlRXJyb3IgPSByeGpzXzIuQXJndW1lbnRPdXRPZlJhbmdlRXJyb3I7XG5leHBvcnRzLk9iamVjdFVuc3Vic2NyaWJlZEVycm9yID0gcnhqc18yLk9iamVjdFVuc3Vic2NyaWJlZEVycm9yO1xuZXhwb3J0cy5VbnN1YnNjcmlwdGlvbkVycm9yID0gcnhqc18yLlVuc3Vic2NyaXB0aW9uRXJyb3I7XG5leHBvcnRzLnBpcGUgPSByeGpzXzIucGlwZTtcbnZhciB0ZXN0aW5nXzEgPSByZXF1aXJlKFwicnhqcy90ZXN0aW5nXCIpO1xuZXhwb3J0cy5UZXN0U2NoZWR1bGVyID0gdGVzdGluZ18xLlRlc3RTY2hlZHVsZXI7XG52YXIgcnhqc18zID0gcmVxdWlyZShcInJ4anNcIik7XG5leHBvcnRzLlN1YnNjcmliZXIgPSByeGpzXzMuU3Vic2NyaWJlcjtcbmV4cG9ydHMuQXN5bmNTdWJqZWN0ID0gcnhqc18zLkFzeW5jU3ViamVjdDtcbmV4cG9ydHMuQ29ubmVjdGFibGVPYnNlcnZhYmxlID0gcnhqc18zLkNvbm5lY3RhYmxlT2JzZXJ2YWJsZTtcbmV4cG9ydHMuVGltZW91dEVycm9yID0gcnhqc18zLlRpbWVvdXRFcnJvcjtcbmV4cG9ydHMuVmlydHVhbFRpbWVTY2hlZHVsZXIgPSByeGpzXzMuVmlydHVhbFRpbWVTY2hlZHVsZXI7XG52YXIgYWpheF8xID0gcmVxdWlyZShcInJ4anMvYWpheFwiKTtcbmV4cG9ydHMuQWpheFJlc3BvbnNlID0gYWpheF8xLkFqYXhSZXNwb25zZTtcbmV4cG9ydHMuQWpheEVycm9yID0gYWpheF8xLkFqYXhFcnJvcjtcbmV4cG9ydHMuQWpheFRpbWVvdXRFcnJvciA9IGFqYXhfMS5BamF4VGltZW91dEVycm9yO1xudmFyIHJ4anNfNCA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGludGVybmFsX2NvbXBhdGliaWxpdHlfMyA9IHJlcXVpcmUoXCJyeGpzL2ludGVybmFsLWNvbXBhdGliaWxpdHlcIik7XG52YXIgaW50ZXJuYWxfY29tcGF0aWJpbGl0eV80ID0gcmVxdWlyZShcInJ4anMvaW50ZXJuYWwtY29tcGF0aWJpbGl0eVwiKTtcbmV4cG9ydHMuVGltZUludGVydmFsID0gaW50ZXJuYWxfY29tcGF0aWJpbGl0eV80LlRpbWVJbnRlcnZhbDtcbmV4cG9ydHMuVGltZXN0YW1wID0gaW50ZXJuYWxfY29tcGF0aWJpbGl0eV80LlRpbWVzdGFtcDtcbnZhciBfb3BlcmF0b3JzID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuZXhwb3J0cy5vcGVyYXRvcnMgPSBfb3BlcmF0b3JzO1xuLyogdHNsaW50OmVuYWJsZTpuby11bnVzZWQtdmFyaWFibGUgKi9cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUnguU2NoZWR1bGVyXG4gKiBAcHJvcGVydHkge1NjaGVkdWxlcn0gcXVldWUgU2NoZWR1bGVzIG9uIGEgcXVldWUgaW4gdGhlIGN1cnJlbnQgZXZlbnQgZnJhbWVcbiAqICh0cmFtcG9saW5lIHNjaGVkdWxlcikuIFVzZSB0aGlzIGZvciBpdGVyYXRpb24gb3BlcmF0aW9ucy5cbiAqIEBwcm9wZXJ0eSB7U2NoZWR1bGVyfSBhc2FwIFNjaGVkdWxlcyBvbiB0aGUgbWljcm8gdGFzayBxdWV1ZSwgd2hpY2ggaXMgdGhlIHNhbWVcbiAqIHF1ZXVlIHVzZWQgZm9yIHByb21pc2VzLiBCYXNpY2FsbHkgYWZ0ZXIgdGhlIGN1cnJlbnQgam9iLCBidXQgYmVmb3JlIHRoZSBuZXh0XG4gKiBqb2IuIFVzZSB0aGlzIGZvciBhc3luY2hyb25vdXMgY29udmVyc2lvbnMuXG4gKiBAcHJvcGVydHkge1NjaGVkdWxlcn0gYXN5bmMgU2NoZWR1bGVzIHdvcmsgd2l0aCBgc2V0SW50ZXJ2YWxgLiBVc2UgdGhpcyBmb3JcbiAqIHRpbWUtYmFzZWQgb3BlcmF0aW9ucy5cbiAqIEBwcm9wZXJ0eSB7U2NoZWR1bGVyfSBhbmltYXRpb25GcmFtZSBTY2hlZHVsZXMgd29yayB3aXRoIGByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgLlxuICogVXNlIHRoaXMgZm9yIHN5bmNocm9uaXppbmcgd2l0aCB0aGUgcGxhdGZvcm0ncyBwYWludGluZ1xuICovXG52YXIgU2NoZWR1bGVyID0ge1xuICAgIGFzYXA6IHJ4anNfNC5hc2FwU2NoZWR1bGVyLFxuICAgIHF1ZXVlOiByeGpzXzQucXVldWVTY2hlZHVsZXIsXG4gICAgYW5pbWF0aW9uRnJhbWU6IHJ4anNfNC5hbmltYXRpb25GcmFtZVNjaGVkdWxlcixcbiAgICBhc3luYzogcnhqc180LmFzeW5jU2NoZWR1bGVyXG59O1xuZXhwb3J0cy5TY2hlZHVsZXIgPSBTY2hlZHVsZXI7XG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFJ4LlN5bWJvbFxuICogQHByb3BlcnR5IHtTeW1ib2x8c3RyaW5nfSByeFN1YnNjcmliZXIgQSBzeW1ib2wgdG8gdXNlIGFzIGEgcHJvcGVydHkgbmFtZSB0b1xuICogcmV0cmlldmUgYW4gXCJSeCBzYWZlXCIgT2JzZXJ2ZXIgZnJvbSBhbiBvYmplY3QuIFwiUnggc2FmZXR5XCIgY2FuIGJlIGRlZmluZWQgYXNcbiAqIGFuIG9iamVjdCB0aGF0IGhhcyBhbGwgb2YgdGhlIHRyYWl0cyBvZiBhbiBSeCBTdWJzY3JpYmVyLCBpbmNsdWRpbmcgdGhlXG4gKiBhYmlsaXR5IHRvIGFkZCBhbmQgcmVtb3ZlIHN1YnNjcmlwdGlvbnMgdG8gdGhlIHN1YnNjcmlwdGlvbiBjaGFpbiBhbmRcbiAqIGd1YXJhbnRlZXMgaW52b2x2aW5nIGV2ZW50IHRyaWdnZXJpbmcgKGNhbid0IFwibmV4dFwiIGFmdGVyIHVuc3Vic2NyaXB0aW9uLFxuICogZXRjKS5cbiAqIEBwcm9wZXJ0eSB7U3ltYm9sfHN0cmluZ30gb2JzZXJ2YWJsZSBBIHN5bWJvbCB0byB1c2UgYXMgYSBwcm9wZXJ0eSBuYW1lIHRvXG4gKiByZXRyaWV2ZSBhbiBPYnNlcnZhYmxlIGFzIGRlZmluZWQgYnkgdGhlIFtFQ01BU2NyaXB0IFwiT2JzZXJ2YWJsZVwiIHNwZWNdKGh0dHBzOi8vZ2l0aHViLmNvbS96ZW5wYXJzaW5nL2VzLW9ic2VydmFibGUpLlxuICogQHByb3BlcnR5IHtTeW1ib2x8c3RyaW5nfSBpdGVyYXRvciBUaGUgRVM2IHN5bWJvbCB0byB1c2UgYXMgYSBwcm9wZXJ0eSBuYW1lXG4gKiB0byByZXRyaWV2ZSBhbiBpdGVyYXRvciBmcm9tIGFuIG9iamVjdC5cbiAqL1xudmFyIFN5bWJvbCA9IHtcbiAgICByeFN1YnNjcmliZXI6IGludGVybmFsX2NvbXBhdGliaWxpdHlfMy5yeFN1YnNjcmliZXIsXG4gICAgb2JzZXJ2YWJsZTogaW50ZXJuYWxfY29tcGF0aWJpbGl0eV8zLm9ic2VydmFibGUsXG4gICAgaXRlcmF0b3I6IGludGVybmFsX2NvbXBhdGliaWxpdHlfMy5pdGVyYXRvclxufTtcbmV4cG9ydHMuU3ltYm9sID0gU3ltYm9sO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UnguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgZGlzdGluY3RfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9kaXN0aW5jdFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5kaXN0aW5jdCA9IGRpc3RpbmN0XzEuZGlzdGluY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kaXN0aW5jdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBzYW1wbGVUaW1lXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3Ivc2FtcGxlVGltZVwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5zYW1wbGVUaW1lID0gc2FtcGxlVGltZV8xLnNhbXBsZVRpbWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zYW1wbGVUaW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIHNlcXVlbmNlRXF1YWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9zZXF1ZW5jZUVxdWFsXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLnNlcXVlbmNlRXF1YWwgPSBzZXF1ZW5jZUVxdWFsXzEuc2VxdWVuY2VFcXVhbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlcXVlbmNlRXF1YWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5nZW5lcmF0ZSA9IHJ4anNfMS5nZW5lcmF0ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdlbmVyYXRlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYWxsIGl0ZW1zIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRoYXQgYXJlIGRpc3RpbmN0IGJ5IGNvbXBhcmlzb24gZnJvbSB0aGUgcHJldmlvdXMgaXRlbS5cbiAqXG4gKiBJZiBhIGNvbXBhcmF0b3IgZnVuY3Rpb24gaXMgcHJvdmlkZWQsIHRoZW4gaXQgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2ggaXRlbSB0byB0ZXN0IGZvciB3aGV0aGVyIG9yIG5vdCB0aGF0IHZhbHVlIHNob3VsZCBiZSBlbWl0dGVkLlxuICpcbiAqIElmIGEgY29tcGFyYXRvciBmdW5jdGlvbiBpcyBub3QgcHJvdmlkZWQsIGFuIGVxdWFsaXR5IGNoZWNrIGlzIHVzZWQgYnkgZGVmYXVsdC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5BIHNpbXBsZSBleGFtcGxlIHdpdGggbnVtYmVyczwvY2FwdGlvbj5cbiAqIE9ic2VydmFibGUub2YoMSwgMSwgMiwgMiwgMiwgMSwgMSwgMiwgMywgMywgNClcbiAqICAgLmRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAqICAgLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTsgLy8gMSwgMiwgMSwgMiwgMywgNFxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkFuIGV4YW1wbGUgdXNpbmcgYSBjb21wYXJlIGZ1bmN0aW9uPC9jYXB0aW9uPlxuICogaW50ZXJmYWNlIFBlcnNvbiB7XG4gKiAgICBhZ2U6IG51bWJlcixcbiAqICAgIG5hbWU6IHN0cmluZ1xuICogfVxuICpcbiAqIE9ic2VydmFibGUub2Y8UGVyc29uPihcbiAqICAgICB7IGFnZTogNCwgbmFtZTogJ0Zvbyd9LFxuICogICAgIHsgYWdlOiA3LCBuYW1lOiAnQmFyJ30sXG4gKiAgICAgeyBhZ2U6IDUsIG5hbWU6ICdGb28nfSxcbiAqICAgICB7IGFnZTogNiwgbmFtZTogJ0Zvbyd9KVxuICogICAgIC5kaXN0aW5jdFVudGlsQ2hhbmdlZCgocDogUGVyc29uLCBxOiBQZXJzb24pID0+IHAubmFtZSA9PT0gcS5uYW1lKVxuICogICAgIC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogLy8gZGlzcGxheXM6XG4gKiAvLyB7IGFnZTogNCwgbmFtZTogJ0ZvbycgfVxuICogLy8geyBhZ2U6IDcsIG5hbWU6ICdCYXInIH1cbiAqIC8vIHsgYWdlOiA1LCBuYW1lOiAnRm9vJyB9XG4gKlxuICogQHNlZSB7QGxpbmsgZGlzdGluY3R9XG4gKiBAc2VlIHtAbGluayBkaXN0aW5jdFVudGlsS2V5Q2hhbmdlZH1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY29tcGFyZV0gT3B0aW9uYWwgY29tcGFyaXNvbiBmdW5jdGlvbiBjYWxsZWQgdG8gdGVzdCBpZiBhbiBpdGVtIGlzIGRpc3RpbmN0IGZyb20gdGhlIHByZXZpb3VzIGl0ZW0gaW4gdGhlIHNvdXJjZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBpdGVtcyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB3aXRoIGRpc3RpbmN0IHZhbHVlcy5cbiAqIEBtZXRob2QgZGlzdGluY3RVbnRpbENoYW5nZWRcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIGRpc3RpbmN0VW50aWxDaGFuZ2VkKGNvbXBhcmUsIGtleVNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLmRpc3RpbmN0VW50aWxDaGFuZ2VkKGNvbXBhcmUsIGtleVNlbGVjdG9yKSh0aGlzKTtcbn1cbmV4cG9ydHMuZGlzdGluY3RVbnRpbENoYW5nZWQgPSBkaXN0aW5jdFVudGlsQ2hhbmdlZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpc3RpbmN0VW50aWxDaGFuZ2VkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKlxuICogUmUtZW1pdHMgYWxsIG5vdGlmaWNhdGlvbnMgZnJvbSBzb3VyY2UgT2JzZXJ2YWJsZSB3aXRoIHNwZWNpZmllZCBzY2hlZHVsZXIuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkVuc3VyZSBhIHNwZWNpZmljIHNjaGVkdWxlciBpcyB1c2VkLCBmcm9tIG91dHNpZGUgb2YgYW4gT2JzZXJ2YWJsZS48L3NwYW4+XG4gKlxuICogYG9ic2VydmVPbmAgaXMgYW4gb3BlcmF0b3IgdGhhdCBhY2NlcHRzIGEgc2NoZWR1bGVyIGFzIGEgZmlyc3QgcGFyYW1ldGVyLCB3aGljaCB3aWxsIGJlIHVzZWQgdG8gcmVzY2hlZHVsZVxuICogbm90aWZpY2F0aW9ucyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gSXQgbWlnaHQgYmUgdXNlZnVsLCBpZiB5b3UgZG8gbm90IGhhdmUgY29udHJvbCBvdmVyXG4gKiBpbnRlcm5hbCBzY2hlZHVsZXIgb2YgYSBnaXZlbiBPYnNlcnZhYmxlLCBidXQgd2FudCB0byBjb250cm9sIHdoZW4gaXRzIHZhbHVlcyBhcmUgZW1pdHRlZCBuZXZlcnRoZWxlc3MuXG4gKlxuICogUmV0dXJuZWQgT2JzZXJ2YWJsZSBlbWl0cyB0aGUgc2FtZSBub3RpZmljYXRpb25zIChuZXh0ZWQgdmFsdWVzLCBjb21wbGV0ZSBhbmQgZXJyb3IgZXZlbnRzKSBhcyB0aGUgc291cmNlIE9ic2VydmFibGUsXG4gKiBidXQgcmVzY2hlZHVsZWQgd2l0aCBwcm92aWRlZCBzY2hlZHVsZXIuIE5vdGUgdGhhdCB0aGlzIGRvZXNuJ3QgbWVhbiB0aGF0IHNvdXJjZSBPYnNlcnZhYmxlcyBpbnRlcm5hbFxuICogc2NoZWR1bGVyIHdpbGwgYmUgcmVwbGFjZWQgaW4gYW55IHdheS4gT3JpZ2luYWwgc2NoZWR1bGVyIHN0aWxsIHdpbGwgYmUgdXNlZCwgYnV0IHdoZW4gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGVtaXRzXG4gKiBub3RpZmljYXRpb24sIGl0IHdpbGwgYmUgaW1tZWRpYXRlbHkgc2NoZWR1bGVkIGFnYWluIC0gdGhpcyB0aW1lIHdpdGggc2NoZWR1bGVyIHBhc3NlZCB0byBgb2JzZXJ2ZU9uYC5cbiAqIEFuIGFudGktcGF0dGVybiB3b3VsZCBiZSBjYWxsaW5nIGBvYnNlcnZlT25gIG9uIE9ic2VydmFibGUgdGhhdCBlbWl0cyBsb3RzIG9mIHZhbHVlcyBzeW5jaHJvbm91c2x5LCB0byBzcGxpdFxuICogdGhhdCBlbWlzc2lvbnMgaW50byBhc3luY2hyb25vdXMgY2h1bmtzLiBGb3IgdGhpcyB0byBoYXBwZW4sIHNjaGVkdWxlciB3b3VsZCBoYXZlIHRvIGJlIHBhc3NlZCBpbnRvIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgZGlyZWN0bHkgKHVzdWFsbHkgaW50byB0aGUgb3BlcmF0b3IgdGhhdCBjcmVhdGVzIGl0KS4gYG9ic2VydmVPbmAgc2ltcGx5IGRlbGF5cyBub3RpZmljYXRpb25zIGFcbiAqIGxpdHRsZSBiaXQgbW9yZSwgdG8gZW5zdXJlIHRoYXQgdGhleSBhcmUgZW1pdHRlZCBhdCBleHBlY3RlZCBtb21lbnRzLlxuICpcbiAqIEFzIGEgbWF0dGVyIG9mIGZhY3QsIGBvYnNlcnZlT25gIGFjY2VwdHMgc2Vjb25kIHBhcmFtZXRlciwgd2hpY2ggc3BlY2lmaWVzIGluIG1pbGxpc2Vjb25kcyB3aXRoIHdoYXQgZGVsYXkgbm90aWZpY2F0aW9uc1xuICogd2lsbCBiZSBlbWl0dGVkLiBUaGUgbWFpbiBkaWZmZXJlbmNlIGJldHdlZW4ge0BsaW5rIGRlbGF5fSBvcGVyYXRvciBhbmQgYG9ic2VydmVPbmAgaXMgdGhhdCBgb2JzZXJ2ZU9uYFxuICogd2lsbCBkZWxheSBhbGwgbm90aWZpY2F0aW9ucyAtIGluY2x1ZGluZyBlcnJvciBub3RpZmljYXRpb25zIC0gd2hpbGUgYGRlbGF5YCB3aWxsIHBhc3MgdGhyb3VnaCBlcnJvclxuICogZnJvbSBzb3VyY2UgT2JzZXJ2YWJsZSBpbW1lZGlhdGVseSB3aGVuIGl0IGlzIGVtaXR0ZWQuIEluIGdlbmVyYWwgaXQgaXMgaGlnaGx5IHJlY29tbWVuZGVkIHRvIHVzZSBgZGVsYXlgIG9wZXJhdG9yXG4gKiBmb3IgYW55IGtpbmQgb2YgZGVsYXlpbmcgb2YgdmFsdWVzIGluIHRoZSBzdHJlYW0sIHdoaWxlIHVzaW5nIGBvYnNlcnZlT25gIHRvIHNwZWNpZnkgd2hpY2ggc2NoZWR1bGVyIHNob3VsZCBiZSB1c2VkXG4gKiBmb3Igbm90aWZpY2F0aW9uIGVtaXNzaW9ucyBpbiBnZW5lcmFsLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkVuc3VyZSB2YWx1ZXMgaW4gc3Vic2NyaWJlIGFyZSBjYWxsZWQganVzdCBiZWZvcmUgYnJvd3NlciByZXBhaW50LjwvY2FwdGlvbj5cbiAqIGNvbnN0IGludGVydmFscyA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTApOyAvLyBJbnRlcnZhbHMgYXJlIHNjaGVkdWxlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpdGggYXN5bmMgc2NoZWR1bGVyIGJ5IGRlZmF1bHQuLi5cbiAqXG4gKiBpbnRlcnZhbHNcbiAqIC5vYnNlcnZlT24oUnguU2NoZWR1bGVyLmFuaW1hdGlvbkZyYW1lKSAgICAgICAvLyAuLi5idXQgd2Ugd2lsbCBvYnNlcnZlIG9uIGFuaW1hdGlvbkZyYW1lXG4gKiAuc3Vic2NyaWJlKHZhbCA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2NoZWR1bGVyIHRvIGVuc3VyZSBzbW9vdGggYW5pbWF0aW9uLlxuICogICBzb21lRGl2LnN0eWxlLmhlaWdodCA9IHZhbCArICdweCc7XG4gKiB9KTtcbiAqXG4gKiBAc2VlIHtAbGluayBkZWxheX1cbiAqXG4gKiBAcGFyYW0ge1NjaGVkdWxlckxpa2V9IHNjaGVkdWxlciBTY2hlZHVsZXIgdGhhdCB3aWxsIGJlIHVzZWQgdG8gcmVzY2hlZHVsZSBub3RpZmljYXRpb25zIGZyb20gc291cmNlIE9ic2VydmFibGUuXG4gKiBAcGFyYW0ge251bWJlcn0gW2RlbGF5XSBOdW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgc3RhdGVzIHdpdGggd2hhdCBkZWxheSBldmVyeSBub3RpZmljYXRpb24gc2hvdWxkIGJlIHJlc2NoZWR1bGVkLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHRoZSBzYW1lIG5vdGlmaWNhdGlvbnMgYXMgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLFxuICogYnV0IHdpdGggcHJvdmlkZWQgc2NoZWR1bGVyLlxuICpcbiAqIEBtZXRob2Qgb2JzZXJ2ZU9uXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBvYnNlcnZlT24oc2NoZWR1bGVyLCBkZWxheSkge1xuICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgIHJldHVybiBvcGVyYXRvcnNfMS5vYnNlcnZlT24oc2NoZWR1bGVyLCBkZWxheSkodGhpcyk7XG59XG5leHBvcnRzLm9ic2VydmVPbiA9IG9ic2VydmVPbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmVPbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnBhaXJzID0gcnhqc18xLnBhaXJzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFpcnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgdGFrZVdoaWxlXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvdGFrZVdoaWxlXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLnRha2VXaGlsZSA9IHRha2VXaGlsZV8xLnRha2VXaGlsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRha2VXaGlsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogQHBhcmFtIHZhbHVlXG4gKiBAcmV0dXJuIHtDb25uZWN0YWJsZU9ic2VydmFibGU8VD59XG4gKiBAbWV0aG9kIHB1Ymxpc2hCZWhhdmlvclxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gcHVibGlzaEJlaGF2aW9yKHZhbHVlKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLnB1Ymxpc2hCZWhhdmlvcih2YWx1ZSkodGhpcyk7XG59XG5leHBvcnRzLnB1Ymxpc2hCZWhhdmlvciA9IHB1Ymxpc2hCZWhhdmlvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXB1Ymxpc2hCZWhhdmlvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogQ29udmVydHMgYSBoaWdoZXItb3JkZXIgT2JzZXJ2YWJsZSBpbnRvIGEgZmlyc3Qtb3JkZXIgT2JzZXJ2YWJsZSBieSB3YWl0aW5nXG4gKiBmb3IgdGhlIG91dGVyIE9ic2VydmFibGUgdG8gY29tcGxldGUsIHRoZW4gYXBwbHlpbmcge0BsaW5rIGNvbWJpbmVMYXRlc3R9LlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5GbGF0dGVucyBhbiBPYnNlcnZhYmxlLW9mLU9ic2VydmFibGVzIGJ5IGFwcGx5aW5nXG4gKiB7QGxpbmsgY29tYmluZUxhdGVzdH0gd2hlbiB0aGUgT2JzZXJ2YWJsZS1vZi1PYnNlcnZhYmxlcyBjb21wbGV0ZXMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvY29tYmluZUFsbC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBUYWtlcyBhbiBPYnNlcnZhYmxlIG9mIE9ic2VydmFibGVzLCBhbmQgY29sbGVjdHMgYWxsIE9ic2VydmFibGVzIGZyb20gaXQuXG4gKiBPbmNlIHRoZSBvdXRlciBPYnNlcnZhYmxlIGNvbXBsZXRlcywgaXQgc3Vic2NyaWJlcyB0byBhbGwgY29sbGVjdGVkXG4gKiBPYnNlcnZhYmxlcyBhbmQgY29tYmluZXMgdGhlaXIgdmFsdWVzIHVzaW5nIHRoZSB7QGxpbmsgY29tYmluZUxhdGVzdH1cbiAqIHN0cmF0ZWd5LCBzdWNoIHRoYXQ6XG4gKiAtIEV2ZXJ5IHRpbWUgYW4gaW5uZXIgT2JzZXJ2YWJsZSBlbWl0cywgdGhlIG91dHB1dCBPYnNlcnZhYmxlIGVtaXRzLlxuICogLSBXaGVuIHRoZSByZXR1cm5lZCBvYnNlcnZhYmxlIGVtaXRzLCBpdCBlbWl0cyBhbGwgb2YgdGhlIGxhdGVzdCB2YWx1ZXMgYnk6XG4gKiAgIC0gSWYgYSBgcHJvamVjdGAgZnVuY3Rpb24gaXMgcHJvdmlkZWQsIGl0IGlzIGNhbGxlZCB3aXRoIGVhY2ggcmVjZW50IHZhbHVlXG4gKiAgICAgZnJvbSBlYWNoIGlubmVyIE9ic2VydmFibGUgaW4gd2hhdGV2ZXIgb3JkZXIgdGhleSBhcnJpdmVkLCBhbmQgdGhlIHJlc3VsdFxuICogICAgIG9mIHRoZSBgcHJvamVjdGAgZnVuY3Rpb24gaXMgd2hhdCBpcyBlbWl0dGVkIGJ5IHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqICAgLSBJZiB0aGVyZSBpcyBubyBgcHJvamVjdGAgZnVuY3Rpb24sIGFuIGFycmF5IG9mIGFsbCBvZiB0aGUgbW9zdCByZWNlbnRcbiAqICAgICB2YWx1ZXMgaXMgZW1pdHRlZCBieSB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+TWFwIHR3byBjbGljayBldmVudHMgdG8gYSBmaW5pdGUgaW50ZXJ2YWwgT2JzZXJ2YWJsZSwgdGhlbiBhcHBseSBjb21iaW5lQWxsPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBoaWdoZXJPcmRlciA9IGNsaWNrcy5tYXAoZXYgPT5cbiAqICAgUnguT2JzZXJ2YWJsZS5pbnRlcnZhbChNYXRoLnJhbmRvbSgpKjIwMDApLnRha2UoMylcbiAqICkudGFrZSgyKTtcbiAqIHZhciByZXN1bHQgPSBoaWdoZXJPcmRlci5jb21iaW5lQWxsKCk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGNvbWJpbmVMYXRlc3R9XG4gKiBAc2VlIHtAbGluayBtZXJnZUFsbH1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbcHJvamVjdF0gQW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gbWFwIHRoZSBtb3N0IHJlY2VudFxuICogdmFsdWVzIGZyb20gZWFjaCBpbm5lciBPYnNlcnZhYmxlIGludG8gYSBuZXcgcmVzdWx0LiBUYWtlcyBlYWNoIG9mIHRoZSBtb3N0XG4gKiByZWNlbnQgdmFsdWVzIGZyb20gZWFjaCBjb2xsZWN0ZWQgaW5uZXIgT2JzZXJ2YWJsZSBhcyBhcmd1bWVudHMsIGluIG9yZGVyLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSBvZiBwcm9qZWN0ZWQgcmVzdWx0cyBvciBhcnJheXMgb2YgcmVjZW50XG4gKiB2YWx1ZXMuXG4gKiBAbWV0aG9kIGNvbWJpbmVBbGxcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIGNvbWJpbmVBbGwocHJvamVjdCkge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5jb21iaW5lQWxsKHByb2plY3QpKHRoaXMpO1xufVxuZXhwb3J0cy5jb21iaW5lQWxsID0gY29tYmluZUFsbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbWJpbmVBbGwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIElnbm9yZXMgc291cmNlIHZhbHVlcyBmb3IgYGR1cmF0aW9uYCBtaWxsaXNlY29uZHMsIHRoZW4gZW1pdHMgdGhlIG1vc3QgcmVjZW50XG4gKiB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgdGhlbiByZXBlYXRzIHRoaXMgcHJvY2Vzcy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+V2hlbiBpdCBzZWVzIGEgc291cmNlIHZhbHVlcywgaXQgaWdub3JlcyB0aGF0IHBsdXNcbiAqIHRoZSBuZXh0IG9uZXMgZm9yIGBkdXJhdGlvbmAgbWlsbGlzZWNvbmRzLCBhbmQgdGhlbiBpdCBlbWl0cyB0aGUgbW9zdCByZWNlbnRcbiAqIHZhbHVlIGZyb20gdGhlIHNvdXJjZS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9hdWRpdFRpbWUucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYGF1ZGl0VGltZWAgaXMgc2ltaWxhciB0byBgdGhyb3R0bGVUaW1lYCwgYnV0IGVtaXRzIHRoZSBsYXN0IHZhbHVlIGZyb20gdGhlXG4gKiBzaWxlbmNlZCB0aW1lIHdpbmRvdywgaW5zdGVhZCBvZiB0aGUgZmlyc3QgdmFsdWUuIGBhdWRpdFRpbWVgIGVtaXRzIHRoZSBtb3N0XG4gKiByZWNlbnQgdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlIGFzIHNvb24gYXNcbiAqIGl0cyBpbnRlcm5hbCB0aW1lciBiZWNvbWVzIGRpc2FibGVkLCBhbmQgaWdub3JlcyBzb3VyY2UgdmFsdWVzIHdoaWxlIHRoZVxuICogdGltZXIgaXMgZW5hYmxlZC4gSW5pdGlhbGx5LCB0aGUgdGltZXIgaXMgZGlzYWJsZWQuIEFzIHNvb24gYXMgdGhlIGZpcnN0XG4gKiBzb3VyY2UgdmFsdWUgYXJyaXZlcywgdGhlIHRpbWVyIGlzIGVuYWJsZWQuIEFmdGVyIGBkdXJhdGlvbmAgbWlsbGlzZWNvbmRzIChvclxuICogdGhlIHRpbWUgdW5pdCBkZXRlcm1pbmVkIGludGVybmFsbHkgYnkgdGhlIG9wdGlvbmFsIGBzY2hlZHVsZXJgKSBoYXMgcGFzc2VkLFxuICogdGhlIHRpbWVyIGlzIGRpc2FibGVkLCB0aGVuIHRoZSBtb3N0IHJlY2VudCBzb3VyY2UgdmFsdWUgaXMgZW1pdHRlZCBvbiB0aGVcbiAqIG91dHB1dCBPYnNlcnZhYmxlLCBhbmQgdGhpcyBwcm9jZXNzIHJlcGVhdHMgZm9yIHRoZSBuZXh0IHNvdXJjZSB2YWx1ZS5cbiAqIE9wdGlvbmFsbHkgdGFrZXMgYSB7QGxpbmsgSVNjaGVkdWxlcn0gZm9yIG1hbmFnaW5nIHRpbWVycy5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IGNsaWNrcyBhdCBhIHJhdGUgb2YgYXQgbW9zdCBvbmUgY2xpY2sgcGVyIHNlY29uZDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLmF1ZGl0VGltZSgxMDAwKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgYXVkaXR9XG4gKiBAc2VlIHtAbGluayBkZWJvdW5jZVRpbWV9XG4gKiBAc2VlIHtAbGluayBkZWxheX1cbiAqIEBzZWUge0BsaW5rIHNhbXBsZVRpbWV9XG4gKiBAc2VlIHtAbGluayB0aHJvdHRsZVRpbWV9XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uIFRpbWUgdG8gd2FpdCBiZWZvcmUgZW1pdHRpbmcgdGhlIG1vc3QgcmVjZW50IHNvdXJjZVxuICogdmFsdWUsIG1lYXN1cmVkIGluIG1pbGxpc2Vjb25kcyBvciB0aGUgdGltZSB1bml0IGRldGVybWluZWQgaW50ZXJuYWxseVxuICogYnkgdGhlIG9wdGlvbmFsIGBzY2hlZHVsZXJgLlxuICogQHBhcmFtIHtTY2hlZHVsZXJ9IFtzY2hlZHVsZXI9YXN5bmNdIFRoZSB7QGxpbmsgSVNjaGVkdWxlcn0gdG8gdXNlIGZvclxuICogbWFuYWdpbmcgdGhlIHRpbWVycyB0aGF0IGhhbmRsZSB0aGUgcmF0ZS1saW1pdGluZyBiZWhhdmlvci5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgdGhhdCBwZXJmb3JtcyByYXRlLWxpbWl0aW5nIG9mXG4gKiBlbWlzc2lvbnMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIGF1ZGl0VGltZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gYXVkaXRUaW1lKGR1cmF0aW9uLCBzY2hlZHVsZXIpIHtcbiAgICBpZiAoc2NoZWR1bGVyID09PSB2b2lkIDApIHsgc2NoZWR1bGVyID0gcnhqc18xLmFzeW5jU2NoZWR1bGVyOyB9XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLmF1ZGl0VGltZShkdXJhdGlvbiwgc2NoZWR1bGVyKSh0aGlzKTtcbn1cbmV4cG9ydHMuYXVkaXRUaW1lID0gYXVkaXRUaW1lO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXVkaXRUaW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIHRocm90dGxlXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvdGhyb3R0bGVcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUudGhyb3R0bGUgPSB0aHJvdHRsZV8xLnRocm90dGxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhyb3R0bGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgY29uY2F0XzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvY29uY2F0XCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLmNvbmNhdCA9IGNvbmNhdF8xLmNvbmNhdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmNhdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBkZW1hdGVyaWFsaXplXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvZGVtYXRlcmlhbGl6ZVwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5kZW1hdGVyaWFsaXplID0gZGVtYXRlcmlhbGl6ZV8xLmRlbWF0ZXJpYWxpemU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZW1hdGVyaWFsaXplLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIG1heF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL21heFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5tYXggPSBtYXhfMS5tYXg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgZXZlcnlfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9ldmVyeVwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5ldmVyeSA9IGV2ZXJ5XzEuZXZlcnk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ldmVyeS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogQ29udmVydHMgYSBoaWdoZXItb3JkZXIgT2JzZXJ2YWJsZSBpbnRvIGEgZmlyc3Qtb3JkZXIgT2JzZXJ2YWJsZSB3aGljaFxuICogY29uY3VycmVudGx5IGRlbGl2ZXJzIGFsbCB2YWx1ZXMgdGhhdCBhcmUgZW1pdHRlZCBvbiB0aGUgaW5uZXIgT2JzZXJ2YWJsZXMuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkZsYXR0ZW5zIGFuIE9ic2VydmFibGUtb2YtT2JzZXJ2YWJsZXMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvbWVyZ2VBbGwucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYG1lcmdlQWxsYCBzdWJzY3JpYmVzIHRvIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBPYnNlcnZhYmxlcywgYWxzbyBrbm93biBhc1xuICogYSBoaWdoZXItb3JkZXIgT2JzZXJ2YWJsZS4gRWFjaCB0aW1lIGl0IG9ic2VydmVzIG9uZSBvZiB0aGVzZSBlbWl0dGVkIGlubmVyXG4gKiBPYnNlcnZhYmxlcywgaXQgc3Vic2NyaWJlcyB0byB0aGF0IGFuZCBkZWxpdmVycyBhbGwgdGhlIHZhbHVlcyBmcm9tIHRoZVxuICogaW5uZXIgT2JzZXJ2YWJsZSBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUuIFRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBvbmx5XG4gKiBjb21wbGV0ZXMgb25jZSBhbGwgaW5uZXIgT2JzZXJ2YWJsZXMgaGF2ZSBjb21wbGV0ZWQuIEFueSBlcnJvciBkZWxpdmVyZWQgYnlcbiAqIGEgaW5uZXIgT2JzZXJ2YWJsZSB3aWxsIGJlIGltbWVkaWF0ZWx5IGVtaXR0ZWQgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNwYXduIGEgbmV3IGludGVydmFsIE9ic2VydmFibGUgZm9yIGVhY2ggY2xpY2sgZXZlbnQsIGFuZCBibGVuZCB0aGVpciBvdXRwdXRzIGFzIG9uZSBPYnNlcnZhYmxlPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBoaWdoZXJPcmRlciA9IGNsaWNrcy5tYXAoKGV2KSA9PiBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApKTtcbiAqIHZhciBmaXJzdE9yZGVyID0gaGlnaGVyT3JkZXIubWVyZ2VBbGwoKTtcbiAqIGZpcnN0T3JkZXIuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNvdW50IGZyb20gMCB0byA5IGV2ZXJ5IHNlY29uZCBmb3IgZWFjaCBjbGljaywgYnV0IG9ubHkgYWxsb3cgMiBjb25jdXJyZW50IHRpbWVyczwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgaGlnaGVyT3JkZXIgPSBjbGlja3MubWFwKChldikgPT4gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKS50YWtlKDEwKSk7XG4gKiB2YXIgZmlyc3RPcmRlciA9IGhpZ2hlck9yZGVyLm1lcmdlQWxsKDIpO1xuICogZmlyc3RPcmRlci5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgY29tYmluZUFsbH1cbiAqIEBzZWUge0BsaW5rIGNvbmNhdEFsbH1cbiAqIEBzZWUge0BsaW5rIGV4aGF1c3R9XG4gKiBAc2VlIHtAbGluayBtZXJnZX1cbiAqIEBzZWUge0BsaW5rIG1lcmdlTWFwfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VNYXBUb31cbiAqIEBzZWUge0BsaW5rIG1lcmdlU2Nhbn1cbiAqIEBzZWUge0BsaW5rIHN3aXRjaH1cbiAqIEBzZWUge0BsaW5rIHppcEFsbH1cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW2NvbmN1cnJlbnQ9TnVtYmVyLlBPU0lUSVZFX0lORklOSVRZXSBNYXhpbXVtIG51bWJlciBvZiBpbm5lclxuICogT2JzZXJ2YWJsZXMgYmVpbmcgc3Vic2NyaWJlZCB0byBjb25jdXJyZW50bHkuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdmFsdWVzIGNvbWluZyBmcm9tIGFsbCB0aGVcbiAqIGlubmVyIE9ic2VydmFibGVzIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQG1ldGhvZCBtZXJnZUFsbFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gbWVyZ2VBbGwoY29uY3VycmVudCkge1xuICAgIGlmIChjb25jdXJyZW50ID09PSB2b2lkIDApIHsgY29uY3VycmVudCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTsgfVxuICAgIHJldHVybiBvcGVyYXRvcnNfMS5tZXJnZUFsbChjb25jdXJyZW50KSh0aGlzKTtcbn1cbmV4cG9ydHMubWVyZ2VBbGwgPSBtZXJnZUFsbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlQWxsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIGl0ZW1zIHlvdSBzcGVjaWZ5IGFzIGFyZ3VtZW50cyBiZWZvcmUgaXQgYmVnaW5zIHRvIGVtaXRcbiAqIGl0ZW1zIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvc3RhcnRXaXRoLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEBwYXJhbSB7Li4uVH0gdmFsdWVzIC0gSXRlbXMgeW91IHdhbnQgdGhlIG1vZGlmaWVkIE9ic2VydmFibGUgdG8gZW1pdCBmaXJzdC5cbiAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyXSAtIEEge0BsaW5rIElTY2hlZHVsZXJ9IHRvIHVzZSBmb3Igc2NoZWR1bGluZ1xuICogdGhlIGVtaXNzaW9ucyBvZiB0aGUgYG5leHRgIG5vdGlmaWNhdGlvbnMuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIGl0ZW1zIGluIHRoZSBzcGVjaWZpZWQgSXRlcmFibGUgYW5kIHRoZW4gZW1pdHMgdGhlIGl0ZW1zXG4gKiBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEBtZXRob2Qgc3RhcnRXaXRoXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBzdGFydFdpdGgoKSB7XG4gICAgdmFyIGFycmF5ID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgYXJyYXlbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLnN0YXJ0V2l0aC5hcHBseSh2b2lkIDAsIGFycmF5KSh0aGlzKTtcbn1cbmV4cG9ydHMuc3RhcnRXaXRoID0gc3RhcnRXaXRoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RhcnRXaXRoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGRlYm91bmNlXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvZGVib3VuY2VcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUuZGVib3VuY2UgPSBkZWJvdW5jZV8xLmRlYm91bmNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVib3VuY2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIEVtaXRzIGEgdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgb25seSBhZnRlciBhIHBhcnRpY3VsYXIgdGltZSBzcGFuXG4gKiBoYXMgcGFzc2VkIHdpdGhvdXQgYW5vdGhlciBzb3VyY2UgZW1pc3Npb24uXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkl0J3MgbGlrZSB7QGxpbmsgZGVsYXl9LCBidXQgcGFzc2VzIG9ubHkgdGhlIG1vc3RcbiAqIHJlY2VudCB2YWx1ZSBmcm9tIGVhY2ggYnVyc3Qgb2YgZW1pc3Npb25zLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2RlYm91bmNlVGltZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgZGVib3VuY2VUaW1lYCBkZWxheXMgdmFsdWVzIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCBidXQgZHJvcHNcbiAqIHByZXZpb3VzIHBlbmRpbmcgZGVsYXllZCBlbWlzc2lvbnMgaWYgYSBuZXcgdmFsdWUgYXJyaXZlcyBvbiB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLiBUaGlzIG9wZXJhdG9yIGtlZXBzIHRyYWNrIG9mIHRoZSBtb3N0IHJlY2VudCB2YWx1ZSBmcm9tIHRoZVxuICogc291cmNlIE9ic2VydmFibGUsIGFuZCBlbWl0cyB0aGF0IG9ubHkgd2hlbiBgZHVlVGltZWAgZW5vdWdoIHRpbWUgaGFzIHBhc3NlZFxuICogd2l0aG91dCBhbnkgb3RoZXIgdmFsdWUgYXBwZWFyaW5nIG9uIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gSWYgYSBuZXcgdmFsdWVcbiAqIGFwcGVhcnMgYmVmb3JlIGBkdWVUaW1lYCBzaWxlbmNlIG9jY3VycywgdGhlIHByZXZpb3VzIHZhbHVlIHdpbGwgYmUgZHJvcHBlZFxuICogYW5kIHdpbGwgbm90IGJlIGVtaXR0ZWQgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICpcbiAqIFRoaXMgaXMgYSByYXRlLWxpbWl0aW5nIG9wZXJhdG9yLCBiZWNhdXNlIGl0IGlzIGltcG9zc2libGUgZm9yIG1vcmUgdGhhbiBvbmVcbiAqIHZhbHVlIHRvIGJlIGVtaXR0ZWQgaW4gYW55IHRpbWUgd2luZG93IG9mIGR1cmF0aW9uIGBkdWVUaW1lYCwgYnV0IGl0IGlzIGFsc29cbiAqIGEgZGVsYXktbGlrZSBvcGVyYXRvciBzaW5jZSBvdXRwdXQgZW1pc3Npb25zIGRvIG5vdCBvY2N1ciBhdCB0aGUgc2FtZSB0aW1lIGFzXG4gKiB0aGV5IGRpZCBvbiB0aGUgc291cmNlIE9ic2VydmFibGUuIE9wdGlvbmFsbHkgdGFrZXMgYSB7QGxpbmsgSVNjaGVkdWxlcn0gZm9yXG4gKiBtYW5hZ2luZyB0aW1lcnMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCB0aGUgbW9zdCByZWNlbnQgY2xpY2sgYWZ0ZXIgYSBidXJzdCBvZiBjbGlja3M8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy5kZWJvdW5jZVRpbWUoMTAwMCk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGF1ZGl0VGltZX1cbiAqIEBzZWUge0BsaW5rIGRlYm91bmNlfVxuICogQHNlZSB7QGxpbmsgZGVsYXl9XG4gKiBAc2VlIHtAbGluayBzYW1wbGVUaW1lfVxuICogQHNlZSB7QGxpbmsgdGhyb3R0bGVUaW1lfVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdWVUaW1lIFRoZSB0aW1lb3V0IGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcyAob3IgdGhlIHRpbWVcbiAqIHVuaXQgZGV0ZXJtaW5lZCBpbnRlcm5hbGx5IGJ5IHRoZSBvcHRpb25hbCBgc2NoZWR1bGVyYCkgZm9yIHRoZSB3aW5kb3cgb2ZcbiAqIHRpbWUgcmVxdWlyZWQgdG8gd2FpdCBmb3IgZW1pc3Npb24gc2lsZW5jZSBiZWZvcmUgZW1pdHRpbmcgdGhlIG1vc3QgcmVjZW50XG4gKiBzb3VyY2UgdmFsdWUuXG4gKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcj1hc3luY1NjaGVkdWxlcl0gVGhlIHtAbGluayBTY2hlZHVsZXJMaWtlfSB0byB1c2UgZm9yXG4gKiBtYW5hZ2luZyB0aGUgdGltZXJzIHRoYXQgaGFuZGxlIHRoZSB0aW1lb3V0IGZvciBlYWNoIHZhbHVlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGRlbGF5cyB0aGUgZW1pc3Npb25zIG9mIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgYnkgdGhlIHNwZWNpZmllZCBgZHVlVGltZWAsIGFuZCBtYXkgZHJvcCBzb21lIHZhbHVlcyBpZiB0aGV5IG9jY3VyXG4gKiB0b28gZnJlcXVlbnRseS5cbiAqIEBtZXRob2QgZGVib3VuY2VUaW1lXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBkZWJvdW5jZVRpbWUoZHVlVGltZSwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKHNjaGVkdWxlciA9PT0gdm9pZCAwKSB7IHNjaGVkdWxlciA9IHJ4anNfMS5hc3luY1NjaGVkdWxlcjsgfVxuICAgIHJldHVybiBvcGVyYXRvcnNfMS5kZWJvdW5jZVRpbWUoZHVlVGltZSwgc2NoZWR1bGVyKSh0aGlzKTtcbn1cbmV4cG9ydHMuZGVib3VuY2VUaW1lID0gZGVib3VuY2VUaW1lO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVib3VuY2VUaW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xudmFyIGludGVybmFsX2NvbXBhdGliaWxpdHlfMSA9IHJlcXVpcmUoXCJyeGpzL2ludGVybmFsLWNvbXBhdGliaWxpdHlcIik7XG4vKipcbiAqIEVtaXRzIGEgdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUsIHRoZW4gaWdub3JlcyBzdWJzZXF1ZW50IHNvdXJjZVxuICogdmFsdWVzIGZvciBhIGR1cmF0aW9uIGRldGVybWluZWQgYnkgYW5vdGhlciBPYnNlcnZhYmxlLCB0aGVuIHJlcGVhdHMgdGhpc1xuICogcHJvY2Vzcy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayB0aHJvdHRsZVRpbWV9LCBidXQgdGhlIHNpbGVuY2luZ1xuICogZHVyYXRpb24gaXMgZGV0ZXJtaW5lZCBieSBhIHNlY29uZCBPYnNlcnZhYmxlLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3Rocm90dGxlLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGB0aHJvdHRsZWAgZW1pdHMgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHZhbHVlcyBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGVcbiAqIHdoZW4gaXRzIGludGVybmFsIHRpbWVyIGlzIGRpc2FibGVkLCBhbmQgaWdub3JlcyBzb3VyY2UgdmFsdWVzIHdoZW4gdGhlIHRpbWVyXG4gKiBpcyBlbmFibGVkLiBJbml0aWFsbHksIHRoZSB0aW1lciBpcyBkaXNhYmxlZC4gQXMgc29vbiBhcyB0aGUgZmlyc3Qgc291cmNlXG4gKiB2YWx1ZSBhcnJpdmVzLCBpdCBpcyBmb3J3YXJkZWQgdG8gdGhlIG91dHB1dCBPYnNlcnZhYmxlLCBhbmQgdGhlbiB0aGUgdGltZXJcbiAqIGlzIGVuYWJsZWQgYnkgY2FsbGluZyB0aGUgYGR1cmF0aW9uU2VsZWN0b3JgIGZ1bmN0aW9uIHdpdGggdGhlIHNvdXJjZSB2YWx1ZSxcbiAqIHdoaWNoIHJldHVybnMgdGhlIFwiZHVyYXRpb25cIiBPYnNlcnZhYmxlLiBXaGVuIHRoZSBkdXJhdGlvbiBPYnNlcnZhYmxlIGVtaXRzIGFcbiAqIHZhbHVlIG9yIGNvbXBsZXRlcywgdGhlIHRpbWVyIGlzIGRpc2FibGVkLCBhbmQgdGhpcyBwcm9jZXNzIHJlcGVhdHMgZm9yIHRoZVxuICogbmV4dCBzb3VyY2UgdmFsdWUuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCBjbGlja3MgYXQgYSByYXRlIG9mIGF0IG1vc3Qgb25lIGNsaWNrIHBlciBzZWNvbmQ8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy50aHJvdHRsZShldiA9PiBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgYXVkaXR9XG4gKiBAc2VlIHtAbGluayBkZWJvdW5jZX1cbiAqIEBzZWUge0BsaW5rIGRlbGF5V2hlbn1cbiAqIEBzZWUge0BsaW5rIHNhbXBsZX1cbiAqIEBzZWUge0BsaW5rIHRocm90dGxlVGltZX1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBUKTogU3Vic2NyaWJhYmxlT3JQcm9taXNlfSBkdXJhdGlvblNlbGVjdG9yIEEgZnVuY3Rpb25cbiAqIHRoYXQgcmVjZWl2ZXMgYSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgZm9yIGNvbXB1dGluZyB0aGUgc2lsZW5jaW5nXG4gKiBkdXJhdGlvbiBmb3IgZWFjaCBzb3VyY2UgdmFsdWUsIHJldHVybmVkIGFzIGFuIE9ic2VydmFibGUgb3IgYSBQcm9taXNlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHRvIGRlZmluZSBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2AgYmVoYXZpb3IuIERlZmF1bHRzXG4gKiB0byBgeyBsZWFkaW5nOiB0cnVlLCB0cmFpbGluZzogZmFsc2UgfWAuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgcGVyZm9ybXMgdGhlIHRocm90dGxlIG9wZXJhdGlvbiB0b1xuICogbGltaXQgdGhlIHJhdGUgb2YgZW1pc3Npb25zIGZyb20gdGhlIHNvdXJjZS5cbiAqIEBtZXRob2QgdGhyb3R0bGVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGR1cmF0aW9uU2VsZWN0b3IsIGNvbmZpZykge1xuICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSBpbnRlcm5hbF9jb21wYXRpYmlsaXR5XzEuZGVmYXVsdFRocm90dGxlQ29uZmlnOyB9XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLnRocm90dGxlKGR1cmF0aW9uU2VsZWN0b3IsIGNvbmZpZykodGhpcyk7XG59XG5leHBvcnRzLnRocm90dGxlID0gdGhyb3R0bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aHJvdHRsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBza2lwTGFzdF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3NraXBMYXN0XCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLnNraXBMYXN0ID0gc2tpcExhc3RfMS5za2lwTGFzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNraXBMYXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIHNhbXBsZV8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3NhbXBsZVwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5zYW1wbGUgPSBzYW1wbGVfMS5zYW1wbGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zYW1wbGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBAcGFyYW0gYnVmZmVyU2l6ZVxuICogQHBhcmFtIHdpbmRvd1RpbWVcbiAqIEBwYXJhbSBzZWxlY3Rvck9yU2NoZWR1bGVyXG4gKiBAcGFyYW0gc2NoZWR1bGVyXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+IHwgQ29ubmVjdGFibGVPYnNlcnZhYmxlPFQ+fVxuICogQG1ldGhvZCBwdWJsaXNoUmVwbGF5XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBwdWJsaXNoUmVwbGF5KGJ1ZmZlclNpemUsIHdpbmRvd1RpbWUsIHNlbGVjdG9yT3JTY2hlZHVsZXIsIHNjaGVkdWxlcikge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5wdWJsaXNoUmVwbGF5KGJ1ZmZlclNpemUsIHdpbmRvd1RpbWUsIHNlbGVjdG9yT3JTY2hlZHVsZXIsIHNjaGVkdWxlcikodGhpcyk7XG59XG5leHBvcnRzLnB1Ymxpc2hSZXBsYXkgPSBwdWJsaXNoUmVwbGF5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHVibGlzaFJlcGxheS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogSWdub3JlcyBhbGwgaXRlbXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgYW5kIG9ubHkgcGFzc2VzIGNhbGxzIG9mIGBjb21wbGV0ZWAgb3IgYGVycm9yYC5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2lnbm9yZUVsZW1lbnRzLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIGVtcHR5IE9ic2VydmFibGUgdGhhdCBvbmx5IGNhbGxzIGBjb21wbGV0ZWBcbiAqIG9yIGBlcnJvcmAsIGJhc2VkIG9uIHdoaWNoIG9uZSBpcyBjYWxsZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQG1ldGhvZCBpZ25vcmVFbGVtZW50c1xuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gaWdub3JlRWxlbWVudHMoKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLmlnbm9yZUVsZW1lbnRzKCkodGhpcyk7XG59XG5leHBvcnRzLmlnbm9yZUVsZW1lbnRzID0gaWdub3JlRWxlbWVudHM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pZ25vcmVFbGVtZW50cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBjb21iaW5lQWxsXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvY29tYmluZUFsbFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5jb21iaW5lQWxsID0gY29tYmluZUFsbF8xLmNvbWJpbmVBbGw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21iaW5lQWxsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBtaXJyb3JzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgYnV0IHdpbGwgY2FsbCBhIHNwZWNpZmllZCBmdW5jdGlvbiB3aGVuXG4gKiB0aGUgc291cmNlIHRlcm1pbmF0ZXMgb24gY29tcGxldGUsIGVycm9yIG9yIHVuc3Vic2NyaWJlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5FbnN1cmUgYSBnaXZlbiBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuIGEgc3RyZWFtIGVuZHMsIG5vIG1hdHRlciB3aHkgaXQgZW5kZWQuPC9zcGFuPlxuICpcbiAqIGBmaW5hbGx5YCBtZXRob2QgYWNjZXB0cyBhcyBhIHNpbmdsZSBwYXJhbWV0ZXIgYSBmdW5jdGlvbi4gVGhpcyBmdW5jdGlvbiBkb2VzIG5vdCBhY2NlcHQgYW55IHBhcmFtZXRlcnMgYW5kXG4gKiBzaG91bGQgbm90IHJldHVybiBhbnl0aGluZy4gSXQgd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgc291cmNlIE9ic2VydmFibGUgY29tcGxldGVzLCBlcnJvcnMgb3IgaXMgdW5zdWJzY3JpYmVkLFxuICogd2hpY2ggbWFrZXMgaXQgZ29vZCBjYW5kaWRhdGUgdG8gcGVyZm9ybSBhbnkgbmVjZXNzYXJ5IGNsZWFuIHVwIG9yIHNpZGUgZWZmZWN0cyB3aGVuIE9ic2VydmFibGUgdGVybWluYXRlcyxcbiAqIG5vIG1hdHRlciBob3cgb3Igd2h5IGl0IHRlcm1pbmF0ZWQuXG4gKlxuICogT2JzZXJ2YWJsZSByZXR1cm5lZCBieSBgZmluYWxseWAgd2lsbCBzaW1wbHkgbWlycm9yIHNvdXJjZSBPYnNlcnZhYmxlIC0gZWFjaCB0aW1lIGl0IGlzIHN1YnNjcmliZWQsIHNvdXJjZVxuICogT2JzZXJ2YWJsZSB3aWxsIGJlIHN1YnNjcmliZWQgdW5kZXJuZWF0aC5cbiAqXG4gKiBOb3RlIHRoYXQgYmVoYXZpb3Igb2YgYGZpbmFsbHlgIHdpbGwgYmUgcmVwZWF0ZWQgcGVyIGV2ZXJ5IHN1YnNjcmlwdGlvbiwgc28gaWYgcmVzdWx0aW5nIE9ic2VydmFibGUgaGFzXG4gKiBtYW55IHN1YnNjcmliZXJzLCBmdW5jdGlvbiBwYXNzZWQgdG8gYGZpbmFsbHlgIG1pZ2h0IGJlIHBvdGVudGlhbGx5IGNhbGxlZCBtdWx0aXBsZSB0aW1lcy5cbiAqXG4gKiBSZW1lbWJlciBhbHNvIHRoYXQgYGZpbmFsbHlgIGRpZmZlcnMgcXVpdGUgYSBsb3QgZnJvbSBwYXNzaW5nIGNvbXBsZXRlIG9yIGVycm9yIGhhbmRsZXIgdG8ge0BsaW5rIHN1YnNjcmliZX0uIEl0IHdpbGxcbiAqIHJldHVybiBhbiBPYnNlcnZhYmxlIHdoaWNoIGNhbiBiZSBmdXJ0aGVyIGNoYWluZWQsIHdoaWxlIGBzdWJzY3JpYmVgIHJldHVybnMgU3Vic2NyaXB0aW9uLCBiYXNpY2FsbHkgZW5kaW5nIE9ic2VydmFibGVcbiAqIGNoYWluLiBGdW5jdGlvbiBwYXNzZWQgdG8gYGZpbmFsbHlgIHdpbGwgYmUgY2FsbGVkIGFsc28gd2hlbiBjb25zdW1lciBvZiByZXN1bHRpbmcgT2JzZXJ2YWJsZSB1bnN1YnNjcmliZXMgZnJvbSBpdCxcbiAqIHdoaWxlIGhhbmRsZXJzIHBhc3NlZCB0byBgc3Vic2NyaWJlYCB3aWxsIG5vdCAoZXZlbiBjb21wbGV0ZSBoYW5kbGVyKS4gQnV0IG1vc3QgaW1wb3J0YW50bHksIGBmaW5hbGx5YCBkb2VzIG5vdCBzdGFydFxuICogYW4gZXhlY3V0aW9uIG9mIHNvdXJjZSBPYnNlcnZhYmxlLCBsaWtlIGBzdWJzY3JpYmVgIGRvZXMsIGFsbG93aW5nIHlvdSB0byBzZXQgdXAgYWxsIG5lY2Vzc2FyeSBob29rcyBiZWZvcmVcbiAqIHBhc3NpbmcgT2JzZXJ2YWJsZSBmdXJ0aGVyLCBldmVuIHdpdGhvdXQgc3BlY2lmaWMga25vd2xlZGdlIGhvdyBvciB3aGVuIGl0IHdpbGwgYmUgdXNlZC5cbiAqXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+Q2FsbCBmaW5hbGx5IGFmdGVyIGNvbXBsZXRlIG5vdGlmaWNhdGlvbjwvY2FwdGlvbj5cbiAqIFJ4Lk9ic2VydmFibGUub2YoMSwgMiwgMylcbiAqIC5maW5hbGx5KCgpID0+IGNvbnNvbGUubG9nKCdJIHdhcyBmaW5hbGl6ZWQhJykpXG4gKiAubWFwKHggPT4geCAqIDIpIC8vIGBmaW5hbGx5YCByZXR1cm5zIGFuIE9ic2VydmFibGUsIHNvIHdlIHN0aWxsIGNhbiBjaGFpbiBvcGVyYXRvcnMuXG4gKiAuc3Vic2NyaWJlKFxuICogICB2YWwgPT4gY29uc29sZS5sb2codmFsKSxcbiAqICAgZXJyID0+IHt9LFxuICogICAoKSA9PiBjb25zb2xlLmxvZygnSSBjb21wbGV0ZWQhJylcbiAqICk7XG4gKlxuICogLy8gTG9nczpcbiAqIC8vIDFcbiAqIC8vIDJcbiAqIC8vIDNcbiAqIC8vIFwiSSBjb21wbGV0ZWQhXCJcbiAqIC8vIFwiSSB3YXMgZmluYWxpemVkIVwiXG4gKlxuICpcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5DYWxsIGZpbmFsbHkgYWZ0ZXIgY29uc3VtZXIgdW5zdWJzY3JpYmVzPC9jYXB0aW9uPlxuICogY29uc3QgbyA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMClcbiAqIC5maW5hbGx5KCgpID0+IGNvbnNvbGUubG9nKCdUaW1lciBzdG9wcGVkJykpO1xuICpcbiAqIGNvbnN0IHN1YnNjcmlwdGlvbiA9IG8uc3Vic2NyaWJlKFxuICogICB2YWwgPT4gY29uc29sZS5sb2codmFsKSxcbiAqICAgZXJyID0+IHt9LFxuICogICAoKSA9PiBjb25zb2xlLmxvZygnQ29tcGxldGUhJykgLy8gV2lsbCBub3QgYmUgY2FsbGVkLCBzaW5jZSBjb21wbGV0ZSBoYW5kbGVyXG4gKiApOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkb2VzIG5vdCByZWFjdCB0byB1bnN1YnNjcmlwdGlvbiwganVzdCB0b1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29tcGxldGUgbm90aWZpY2F0aW9uIHNlbnQgYnkgdGhlIE9ic2VydmFibGUgaXRzZWxmLlxuICpcbiAqIHNldFRpbWVvdXQoKCkgPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCksIDI1MDApO1xuICpcbiAqIC8vIExvZ3M6XG4gKiAvLyAwIGFmdGVyIDFzXG4gKiAvLyAxIGFmdGVyIDJzXG4gKiAvLyBcIlRpbWVyIHN0b3BwZWRcIiBhZnRlciAyLjVzXG4gKlxuICogQHNlZSB7QGxpbmsgdXNpbmd9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgRnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gc291cmNlIHRlcm1pbmF0ZXMgKGNvbXBsZXRlcywgZXJyb3JzIG9yIGlzIHVuc3Vic2NyaWJlZCkuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgbWlycm9ycyB0aGUgc291cmNlLCBidXQgd2lsbCBjYWxsIHRoZSBzcGVjaWZpZWQgZnVuY3Rpb24gb24gdGVybWluYXRpb24uXG4gKiBAbWV0aG9kIGZpbmFsbHlcbiAqIEBuYW1lIGZpbmFsbHlcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIF9maW5hbGx5KGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLmZpbmFsaXplKGNhbGxiYWNrKSh0aGlzKTtcbn1cbmV4cG9ydHMuX2ZpbmFsbHkgPSBfZmluYWxseTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbmFsbHkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIE1hcHMgZWFjaCBzb3VyY2UgdmFsdWUgKGFuIG9iamVjdCkgdG8gaXRzIHNwZWNpZmllZCBuZXN0ZWQgcHJvcGVydHkuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkxpa2Uge0BsaW5rIG1hcH0sIGJ1dCBtZWFudCBvbmx5IGZvciBwaWNraW5nIG9uZSBvZlxuICogdGhlIG5lc3RlZCBwcm9wZXJ0aWVzIG9mIGV2ZXJ5IGVtaXR0ZWQgb2JqZWN0Ljwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3BsdWNrLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEdpdmVuIGEgbGlzdCBvZiBzdHJpbmdzIGRlc2NyaWJpbmcgYSBwYXRoIHRvIGFuIG9iamVjdCBwcm9wZXJ0eSwgcmV0cmlldmVzXG4gKiB0aGUgdmFsdWUgb2YgYSBzcGVjaWZpZWQgbmVzdGVkIHByb3BlcnR5IGZyb20gYWxsIHZhbHVlcyBpbiB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLiBJZiBhIHByb3BlcnR5IGNhbid0IGJlIHJlc29sdmVkLCBpdCB3aWxsIHJldHVybiBgdW5kZWZpbmVkYCBmb3JcbiAqIHRoYXQgdmFsdWUuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+TWFwIGV2ZXJ5IGNsaWNrIHRvIHRoZSB0YWdOYW1lIG9mIHRoZSBjbGlja2VkIHRhcmdldCBlbGVtZW50PC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciB0YWdOYW1lcyA9IGNsaWNrcy5wbHVjaygndGFyZ2V0JywgJ3RhZ05hbWUnKTtcbiAqIHRhZ05hbWVzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBtYXB9XG4gKlxuICogQHBhcmFtIHsuLi5zdHJpbmd9IHByb3BlcnRpZXMgVGhlIG5lc3RlZCBwcm9wZXJ0aWVzIHRvIHBsdWNrIGZyb20gZWFjaCBzb3VyY2VcbiAqIHZhbHVlIChhbiBvYmplY3QpLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQSBuZXcgT2JzZXJ2YWJsZSBvZiBwcm9wZXJ0eSB2YWx1ZXMgZnJvbSB0aGUgc291cmNlIHZhbHVlcy5cbiAqIEBtZXRob2QgcGx1Y2tcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIHBsdWNrKCkge1xuICAgIHZhciBwcm9wZXJ0aWVzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgcHJvcGVydGllc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gb3BlcmF0b3JzXzEucGx1Y2suYXBwbHkodm9pZCAwLCBwcm9wZXJ0aWVzKSh0aGlzKTtcbn1cbmV4cG9ydHMucGx1Y2sgPSBwbHVjaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBsdWNrLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgbWlycm9ycyB0aGUgZmlyc3Qgc291cmNlIE9ic2VydmFibGUgdG8gZW1pdCBhbiBpdGVtXG4gKiBmcm9tIHRoZSBjb21iaW5hdGlvbiBvZiB0aGlzIE9ic2VydmFibGUgYW5kIHN1cHBsaWVkIE9ic2VydmFibGVzLlxuICogQHBhcmFtIHsuLi5PYnNlcnZhYmxlc30gLi4ub2JzZXJ2YWJsZXMgU291cmNlcyB1c2VkIHRvIHJhY2UgZm9yIHdoaWNoIE9ic2VydmFibGUgZW1pdHMgZmlyc3QuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgbWlycm9ycyB0aGUgb3V0cHV0IG9mIHRoZSBmaXJzdCBPYnNlcnZhYmxlIHRvIGVtaXQgYW4gaXRlbS5cbiAqIEBtZXRob2QgcmFjZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gcmFjZSgpIHtcbiAgICB2YXIgb2JzZXJ2YWJsZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBvYnNlcnZhYmxlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gb3BlcmF0b3JzXzEucmFjZS5hcHBseSh2b2lkIDAsIG9ic2VydmFibGVzKSh0aGlzKTtcbn1cbmV4cG9ydHMucmFjZSA9IHJhY2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yYWNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIHdpbmRvd18xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3dpbmRvd1wiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS53aW5kb3cgPSB3aW5kb3dfMS53aW5kb3c7XG4vLyMgc291cmNlTWFwcGluZ1VSTD13aW5kb3cuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IG1pcnJvcnMgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHdpdGggdGhlIGV4Y2VwdGlvbiBvZiBhbiBgZXJyb3JgLiBJZiB0aGUgc291cmNlIE9ic2VydmFibGVcbiAqIGNhbGxzIGBlcnJvcmAsIHRoaXMgbWV0aG9kIHdpbGwgZW1pdCB0aGUgVGhyb3dhYmxlIHRoYXQgY2F1c2VkIHRoZSBlcnJvciB0byB0aGUgT2JzZXJ2YWJsZSByZXR1cm5lZCBmcm9tIGBub3RpZmllcmAuXG4gKiBJZiB0aGF0IE9ic2VydmFibGUgY2FsbHMgYGNvbXBsZXRlYCBvciBgZXJyb3JgIHRoZW4gdGhpcyBtZXRob2Qgd2lsbCBjYWxsIGBjb21wbGV0ZWAgb3IgYGVycm9yYCBvbiB0aGUgY2hpbGRcbiAqIHN1YnNjcmlwdGlvbi4gT3RoZXJ3aXNlIHRoaXMgbWV0aG9kIHdpbGwgcmVzdWJzY3JpYmUgdG8gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvcmV0cnlXaGVuLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oZXJyb3JzOiBPYnNlcnZhYmxlKTogT2JzZXJ2YWJsZX0gbm90aWZpZXIgLSBSZWNlaXZlcyBhbiBPYnNlcnZhYmxlIG9mIG5vdGlmaWNhdGlvbnMgd2l0aCB3aGljaCBhXG4gKiB1c2VyIGNhbiBgY29tcGxldGVgIG9yIGBlcnJvcmAsIGFib3J0aW5nIHRoZSByZXRyeS5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IFRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBtb2RpZmllZCB3aXRoIHJldHJ5IGxvZ2ljLlxuICogQG1ldGhvZCByZXRyeVdoZW5cbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIHJldHJ5V2hlbihub3RpZmllcikge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5yZXRyeVdoZW4obm90aWZpZXIpKHRoaXMpO1xufVxuZXhwb3J0cy5yZXRyeVdoZW4gPSByZXRyeVdoZW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXRyeVdoZW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgcGFydGl0aW9uXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvcGFydGl0aW9uXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLnBhcnRpdGlvbiA9IHBhcnRpdGlvbl8xLnBhcnRpdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhcnRpdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLmZvcmtKb2luID0gcnhqc18xLmZvcmtKb2luO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm9ya0pvaW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgbWVyZ2VBbGxfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9tZXJnZUFsbFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5tZXJnZUFsbCA9IG1lcmdlQWxsXzEubWVyZ2VBbGw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZUFsbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogRW1pdHMgdGhlIG1vc3QgcmVjZW50bHkgZW1pdHRlZCB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB3aXRoaW5cbiAqIHBlcmlvZGljIHRpbWUgaW50ZXJ2YWxzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5TYW1wbGVzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhdCBwZXJpb2RpYyB0aW1lXG4gKiBpbnRlcnZhbHMsIGVtaXR0aW5nIHdoYXQgaXQgc2FtcGxlcy48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9zYW1wbGVUaW1lLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBzYW1wbGVUaW1lYCBwZXJpb2RpY2FsbHkgbG9va3MgYXQgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGFuZCBlbWl0cyB3aGljaGV2ZXJcbiAqIHZhbHVlIGl0IGhhcyBtb3N0IHJlY2VudGx5IGVtaXR0ZWQgc2luY2UgdGhlIHByZXZpb3VzIHNhbXBsaW5nLCB1bmxlc3MgdGhlXG4gKiBzb3VyY2UgaGFzIG5vdCBlbWl0dGVkIGFueXRoaW5nIHNpbmNlIHRoZSBwcmV2aW91cyBzYW1wbGluZy4gVGhlIHNhbXBsaW5nXG4gKiBoYXBwZW5zIHBlcmlvZGljYWxseSBpbiB0aW1lIGV2ZXJ5IGBwZXJpb2RgIG1pbGxpc2Vjb25kcyAob3IgdGhlIHRpbWUgdW5pdFxuICogZGVmaW5lZCBieSB0aGUgb3B0aW9uYWwgYHNjaGVkdWxlcmAgYXJndW1lbnQpLiBUaGUgc2FtcGxpbmcgc3RhcnRzIGFzIHNvb24gYXNcbiAqIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBpcyBzdWJzY3JpYmVkLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkV2ZXJ5IHNlY29uZCwgZW1pdCB0aGUgbW9zdCByZWNlbnQgY2xpY2sgYXQgbW9zdCBvbmNlPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciByZXN1bHQgPSBjbGlja3Muc2FtcGxlVGltZSgxMDAwKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgYXVkaXRUaW1lfVxuICogQHNlZSB7QGxpbmsgZGVib3VuY2VUaW1lfVxuICogQHNlZSB7QGxpbmsgZGVsYXl9XG4gKiBAc2VlIHtAbGluayBzYW1wbGV9XG4gKiBAc2VlIHtAbGluayB0aHJvdHRsZVRpbWV9XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHBlcmlvZCBUaGUgc2FtcGxpbmcgcGVyaW9kIGV4cHJlc3NlZCBpbiBtaWxsaXNlY29uZHMgb3IgdGhlXG4gKiB0aW1lIHVuaXQgZGV0ZXJtaW5lZCBpbnRlcm5hbGx5IGJ5IHRoZSBvcHRpb25hbCBgc2NoZWR1bGVyYC5cbiAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyPWFzeW5jU2NoZWR1bGVyXSBUaGUge0BsaW5rIFNjaGVkdWxlckxpa2V9IHRvIHVzZSBmb3JcbiAqIG1hbmFnaW5nIHRoZSB0aW1lcnMgdGhhdCBoYW5kbGUgdGhlIHNhbXBsaW5nLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHRoZSByZXN1bHRzIG9mIHNhbXBsaW5nIHRoZVxuICogdmFsdWVzIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGF0IHRoZSBzcGVjaWZpZWQgdGltZSBpbnRlcnZhbC5cbiAqIEBtZXRob2Qgc2FtcGxlVGltZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gc2FtcGxlVGltZShwZXJpb2QsIHNjaGVkdWxlcikge1xuICAgIGlmIChzY2hlZHVsZXIgPT09IHZvaWQgMCkgeyBzY2hlZHVsZXIgPSByeGpzXzEuYXN5bmNTY2hlZHVsZXI7IH1cbiAgICByZXR1cm4gb3BlcmF0b3JzXzEuc2FtcGxlVGltZShwZXJpb2QsIHNjaGVkdWxlcikodGhpcyk7XG59XG5leHBvcnRzLnNhbXBsZVRpbWUgPSBzYW1wbGVUaW1lO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2FtcGxlVGltZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBwdWJsaXNoUmVwbGF5XzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvcHVibGlzaFJlcGxheVwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5wdWJsaXNoUmVwbGF5ID0gcHVibGlzaFJlcGxheV8xLnB1Ymxpc2hSZXBsYXk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wdWJsaXNoUmVwbGF5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xucnhqc18xLk9ic2VydmFibGUuYmluZE5vZGVDYWxsYmFjayA9IHJ4anNfMS5iaW5kTm9kZUNhbGxiYWNrO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmluZE5vZGVDYWxsYmFjay5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBzY2FuXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3Ivc2NhblwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5zY2FuID0gc2Nhbl8xLnNjYW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2FuLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbi8qKlxuICogQXBwbGllcyBhbiBhY2N1bXVsYXRvciBmdW5jdGlvbiBvdmVyIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgYW5kIHJldHVybnMgdGhlXG4gKiBhY2N1bXVsYXRlZCByZXN1bHQgd2hlbiB0aGUgc291cmNlIGNvbXBsZXRlcywgZ2l2ZW4gYW4gb3B0aW9uYWwgc2VlZCB2YWx1ZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+Q29tYmluZXMgdG9nZXRoZXIgYWxsIHZhbHVlcyBlbWl0dGVkIG9uIHRoZSBzb3VyY2UsXG4gKiB1c2luZyBhbiBhY2N1bXVsYXRvciBmdW5jdGlvbiB0aGF0IGtub3dzIGhvdyB0byBqb2luIGEgbmV3IHNvdXJjZSB2YWx1ZSBpbnRvXG4gKiB0aGUgYWNjdW11bGF0aW9uIGZyb20gdGhlIHBhc3QuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvcmVkdWNlLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIExpa2VcbiAqIFtBcnJheS5wcm90b3R5cGUucmVkdWNlKCldKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3JlZHVjZSksXG4gKiBgcmVkdWNlYCBhcHBsaWVzIGFuIGBhY2N1bXVsYXRvcmAgZnVuY3Rpb24gYWdhaW5zdCBhbiBhY2N1bXVsYXRpb24gYW5kIGVhY2hcbiAqIHZhbHVlIG9mIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSAoZnJvbSB0aGUgcGFzdCkgdG8gcmVkdWNlIGl0IHRvIGEgc2luZ2xlXG4gKiB2YWx1ZSwgZW1pdHRlZCBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUuIE5vdGUgdGhhdCBgcmVkdWNlYCB3aWxsIG9ubHkgZW1pdFxuICogb25lIHZhbHVlLCBvbmx5IHdoZW4gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGNvbXBsZXRlcy4gSXQgaXMgZXF1aXZhbGVudCB0b1xuICogYXBwbHlpbmcgb3BlcmF0b3Ige0BsaW5rIHNjYW59IGZvbGxvd2VkIGJ5IG9wZXJhdG9yIHtAbGluayBsYXN0fS5cbiAqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBhcHBsaWVzIGEgc3BlY2lmaWVkIGBhY2N1bXVsYXRvcmAgZnVuY3Rpb24gdG8gZWFjaFxuICogaXRlbSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gSWYgYSBgc2VlZGAgdmFsdWUgaXMgc3BlY2lmaWVkLCB0aGVuXG4gKiB0aGF0IHZhbHVlIHdpbGwgYmUgdXNlZCBhcyB0aGUgaW5pdGlhbCB2YWx1ZSBmb3IgdGhlIGFjY3VtdWxhdG9yLiBJZiBubyBzZWVkXG4gKiB2YWx1ZSBpcyBzcGVjaWZpZWQsIHRoZSBmaXJzdCBpdGVtIG9mIHRoZSBzb3VyY2UgaXMgdXNlZCBhcyB0aGUgc2VlZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db3VudCB0aGUgbnVtYmVyIG9mIGNsaWNrIGV2ZW50cyB0aGF0IGhhcHBlbmVkIGluIDUgc2Vjb25kczwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3NJbkZpdmVTZWNvbmRzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpXG4gKiAgIC50YWtlVW50aWwoUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCg1MDAwKSk7XG4gKiB2YXIgb25lcyA9IGNsaWNrc0luRml2ZVNlY29uZHMubWFwVG8oMSk7XG4gKiB2YXIgc2VlZCA9IDA7XG4gKiB2YXIgY291bnQgPSBvbmVzLnJlZHVjZSgoYWNjLCBvbmUpID0+IGFjYyArIG9uZSwgc2VlZCk7XG4gKiBjb3VudC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgY291bnR9XG4gKiBAc2VlIHtAbGluayBleHBhbmR9XG4gKiBAc2VlIHtAbGluayBtZXJnZVNjYW59XG4gKiBAc2VlIHtAbGluayBzY2FufVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oYWNjOiBSLCB2YWx1ZTogVCwgaW5kZXg6IG51bWJlcik6IFJ9IGFjY3VtdWxhdG9yIFRoZSBhY2N1bXVsYXRvciBmdW5jdGlvblxuICogY2FsbGVkIG9uIGVhY2ggc291cmNlIHZhbHVlLlxuICogQHBhcmFtIHtSfSBbc2VlZF0gVGhlIGluaXRpYWwgYWNjdW11bGF0aW9uIHZhbHVlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxSPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGEgc2luZ2xlIHZhbHVlIHRoYXQgaXMgdGhlXG4gKiByZXN1bHQgb2YgYWNjdW11bGF0aW5nIHRoZSB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIHJlZHVjZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gcmVkdWNlKGFjY3VtdWxhdG9yLCBzZWVkKSB7XG4gICAgLy8gcHJvdmlkaW5nIGEgc2VlZCBvZiBgdW5kZWZpbmVkYCAqc2hvdWxkKiBiZSB2YWxpZCBhbmQgdHJpZ2dlclxuICAgIC8vIGhhc1NlZWQhIHNvIGRvbid0IHVzZSBgc2VlZCAhPT0gdW5kZWZpbmVkYCBjaGVja3MhXG4gICAgLy8gRm9yIHRoaXMgcmVhc29uLCB3ZSBoYXZlIHRvIGNoZWNrIGl0IGhlcmUgYXQgdGhlIG9yaWdpbmFsIGNhbGwgc2l0ZVxuICAgIC8vIG90aGVyd2lzZSBpbnNpZGUgT3BlcmF0b3IvU3Vic2NyaWJlciB3ZSB3b24ndCBrbm93IGlmIGB1bmRlZmluZWRgXG4gICAgLy8gbWVhbnMgdGhleSBkaWRuJ3QgcHJvdmlkZSBhbnl0aGluZyBvciBpZiB0aGV5IGxpdGVyYWxseSBwcm92aWRlZCBgdW5kZWZpbmVkYFxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgcmV0dXJuIG9wZXJhdG9yc18xLnJlZHVjZShhY2N1bXVsYXRvciwgc2VlZCkodGhpcyk7XG4gICAgfVxuICAgIHJldHVybiBvcGVyYXRvcnNfMS5yZWR1Y2UoYWNjdW11bGF0b3IpKHRoaXMpO1xufVxuZXhwb3J0cy5yZWR1Y2UgPSByZWR1Y2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWR1Y2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIEVtaXRzIHZhbHVlcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBzbyBsb25nIGFzIGVhY2ggdmFsdWUgc2F0aXNmaWVzXG4gKiB0aGUgZ2l2ZW4gYHByZWRpY2F0ZWAsIGFuZCB0aGVuIGNvbXBsZXRlcyBhcyBzb29uIGFzIHRoaXMgYHByZWRpY2F0ZWAgaXMgbm90XG4gKiBzYXRpc2ZpZWQuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPlRha2VzIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2Ugb25seSB3aGlsZSB0aGV5IHBhc3MgdGhlXG4gKiBjb25kaXRpb24gZ2l2ZW4uIFdoZW4gdGhlIGZpcnN0IHZhbHVlIGRvZXMgbm90IHNhdGlzZnksIGl0IGNvbXBsZXRlcy48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy90YWtlV2hpbGUucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYHRha2VXaGlsZWAgc3Vic2NyaWJlcyBhbmQgYmVnaW5zIG1pcnJvcmluZyB0aGUgc291cmNlIE9ic2VydmFibGUuIEVhY2ggdmFsdWVcbiAqIGVtaXR0ZWQgb24gdGhlIHNvdXJjZSBpcyBnaXZlbiB0byB0aGUgYHByZWRpY2F0ZWAgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhXG4gKiBib29sZWFuLCByZXByZXNlbnRpbmcgYSBjb25kaXRpb24gdG8gYmUgc2F0aXNmaWVkIGJ5IHRoZSBzb3VyY2UgdmFsdWVzLiBUaGVcbiAqIG91dHB1dCBPYnNlcnZhYmxlIGVtaXRzIHRoZSBzb3VyY2UgdmFsdWVzIHVudGlsIHN1Y2ggdGltZSBhcyB0aGUgYHByZWRpY2F0ZWBcbiAqIHJldHVybnMgZmFsc2UsIGF0IHdoaWNoIHBvaW50IGB0YWtlV2hpbGVgIHN0b3BzIG1pcnJvcmluZyB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlIGFuZCBjb21wbGV0ZXMgdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXQgY2xpY2sgZXZlbnRzIG9ubHkgd2hpbGUgdGhlIGNsaWVudFggcHJvcGVydHkgaXMgZ3JlYXRlciB0aGFuIDIwMDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLnRha2VXaGlsZShldiA9PiBldi5jbGllbnRYID4gMjAwKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgdGFrZX1cbiAqIEBzZWUge0BsaW5rIHRha2VMYXN0fVxuICogQHNlZSB7QGxpbmsgdGFrZVVudGlsfVxuICogQHNlZSB7QGxpbmsgc2tpcH1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKTogYm9vbGVhbn0gcHJlZGljYXRlIEEgZnVuY3Rpb24gdGhhdFxuICogZXZhbHVhdGVzIGEgdmFsdWUgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgYW5kIHJldHVybnMgYSBib29sZWFuLlxuICogQWxzbyB0YWtlcyB0aGUgKHplcm8tYmFzZWQpIGluZGV4IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgc28gbG9uZyBhcyBlYWNoIHZhbHVlIHNhdGlzZmllcyB0aGUgY29uZGl0aW9uIGRlZmluZWQgYnkgdGhlXG4gKiBgcHJlZGljYXRlYCwgdGhlbiBjb21wbGV0ZXMuXG4gKiBAbWV0aG9kIHRha2VXaGlsZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gdGFrZVdoaWxlKHByZWRpY2F0ZSkge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS50YWtlV2hpbGUocHJlZGljYXRlKSh0aGlzKTtcbn1cbmV4cG9ydHMudGFrZVdoaWxlID0gdGFrZVdoaWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGFrZVdoaWxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xucnhqc18xLk9ic2VydmFibGUudGhyb3cgPSByeGpzXzEudGhyb3dFcnJvcjtcbnJ4anNfMS5PYnNlcnZhYmxlLnRocm93RXJyb3IgPSByeGpzXzEudGhyb3dFcnJvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRocm93LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIG1hdGVyaWFsaXplXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvbWF0ZXJpYWxpemVcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUubWF0ZXJpYWxpemUgPSBtYXRlcmlhbGl6ZV8xLm1hdGVyaWFsaXplO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWF0ZXJpYWxpemUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBDb21iaW5lcyB0aGUgc291cmNlIE9ic2VydmFibGUgd2l0aCBvdGhlciBPYnNlcnZhYmxlcyB0byBjcmVhdGUgYW4gT2JzZXJ2YWJsZVxuICogd2hvc2UgdmFsdWVzIGFyZSBjYWxjdWxhdGVkIGZyb20gdGhlIGxhdGVzdCB2YWx1ZXMgb2YgZWFjaCwgb25seSB3aGVuIHRoZVxuICogc291cmNlIGVtaXRzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5XaGVuZXZlciB0aGUgc291cmNlIE9ic2VydmFibGUgZW1pdHMgYSB2YWx1ZSwgaXRcbiAqIGNvbXB1dGVzIGEgZm9ybXVsYSB1c2luZyB0aGF0IHZhbHVlIHBsdXMgdGhlIGxhdGVzdCB2YWx1ZXMgZnJvbSBvdGhlciBpbnB1dFxuICogT2JzZXJ2YWJsZXMsIHRoZW4gZW1pdHMgdGhlIG91dHB1dCBvZiB0aGF0IGZvcm11bGEuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvd2l0aExhdGVzdEZyb20ucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYHdpdGhMYXRlc3RGcm9tYCBjb21iaW5lcyBlYWNoIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlICh0aGVcbiAqIGluc3RhbmNlKSB3aXRoIHRoZSBsYXRlc3QgdmFsdWVzIGZyb20gdGhlIG90aGVyIGlucHV0IE9ic2VydmFibGVzIG9ubHkgd2hlblxuICogdGhlIHNvdXJjZSBlbWl0cyBhIHZhbHVlLCBvcHRpb25hbGx5IHVzaW5nIGEgYHByb2plY3RgIGZ1bmN0aW9uIHRvIGRldGVybWluZVxuICogdGhlIHZhbHVlIHRvIGJlIGVtaXR0ZWQgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlLiBBbGwgaW5wdXQgT2JzZXJ2YWJsZXMgbXVzdFxuICogZW1pdCBhdCBsZWFzdCBvbmUgdmFsdWUgYmVmb3JlIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSB3aWxsIGVtaXQgYSB2YWx1ZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5PbiBldmVyeSBjbGljayBldmVudCwgZW1pdCBhbiBhcnJheSB3aXRoIHRoZSBsYXRlc3QgdGltZXIgZXZlbnQgcGx1cyB0aGUgY2xpY2sgZXZlbnQ8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHRpbWVyID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKTtcbiAqIHZhciByZXN1bHQgPSBjbGlja3Mud2l0aExhdGVzdEZyb20odGltZXIpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBjb21iaW5lTGF0ZXN0fVxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZUlucHV0fSBvdGhlciBBbiBpbnB1dCBPYnNlcnZhYmxlIHRvIGNvbWJpbmUgd2l0aCB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLiBNb3JlIHRoYW4gb25lIGlucHV0IE9ic2VydmFibGVzIG1heSBiZSBnaXZlbiBhcyBhcmd1bWVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9qZWN0XSBQcm9qZWN0aW9uIGZ1bmN0aW9uIGZvciBjb21iaW5pbmcgdmFsdWVzXG4gKiB0b2dldGhlci4gUmVjZWl2ZXMgYWxsIHZhbHVlcyBpbiBvcmRlciBvZiB0aGUgT2JzZXJ2YWJsZXMgcGFzc2VkLCB3aGVyZSB0aGVcbiAqIGZpcnN0IHBhcmFtZXRlciBpcyBhIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiAoZS5nLlxuICogYGEud2l0aExhdGVzdEZyb20oYiwgYywgKGExLCBiMSwgYzEpID0+IGExICsgYjEgKyBjMSlgKS4gSWYgdGhpcyBpcyBub3RcbiAqIHBhc3NlZCwgYXJyYXlzIHdpbGwgYmUgZW1pdHRlZCBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIG9mIHByb2plY3RlZCB2YWx1ZXMgZnJvbSB0aGUgbW9zdCByZWNlbnRcbiAqIHZhbHVlcyBmcm9tIGVhY2ggaW5wdXQgT2JzZXJ2YWJsZSwgb3IgYW4gYXJyYXkgb2YgdGhlIG1vc3QgcmVjZW50IHZhbHVlcyBmcm9tXG4gKiBlYWNoIGlucHV0IE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIHdpdGhMYXRlc3RGcm9tXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiB3aXRoTGF0ZXN0RnJvbSgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLndpdGhMYXRlc3RGcm9tLmFwcGx5KHZvaWQgMCwgYXJncykodGhpcyk7XG59XG5leHBvcnRzLndpdGhMYXRlc3RGcm9tID0gd2l0aExhdGVzdEZyb207XG4vLyMgc291cmNlTWFwcGluZ1VSTD13aXRoTGF0ZXN0RnJvbS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBkZWJvdW5jZVRpbWVfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9kZWJvdW5jZVRpbWVcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUuZGVib3VuY2VUaW1lID0gZGVib3VuY2VUaW1lXzEuZGVib3VuY2VUaW1lO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVib3VuY2VUaW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGNvbmNhdEFsbF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL2NvbmNhdEFsbFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5jb25jYXRBbGwgPSBjb25jYXRBbGxfMS5jb25jYXRBbGw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25jYXRBbGwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgaXNFbXB0eV8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL2lzRW1wdHlcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUuaXNFbXB0eSA9IGlzRW1wdHlfMS5pc0VtcHR5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNFbXB0eS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG4vKipcbiAqIEVtaXRzIG9ubHkgdGhlIGZpcnN0IHZhbHVlIChvciB0aGUgZmlyc3QgdmFsdWUgdGhhdCBtZWV0cyBzb21lIGNvbmRpdGlvbilcbiAqIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5FbWl0cyBvbmx5IHRoZSBmaXJzdCB2YWx1ZS4gT3IgZW1pdHMgb25seSB0aGUgZmlyc3RcbiAqIHZhbHVlIHRoYXQgcGFzc2VzIHNvbWUgdGVzdC48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9maXJzdC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBJZiBjYWxsZWQgd2l0aCBubyBhcmd1bWVudHMsIGBmaXJzdGAgZW1pdHMgdGhlIGZpcnN0IHZhbHVlIG9mIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUsIHRoZW4gY29tcGxldGVzLiBJZiBjYWxsZWQgd2l0aCBhIGBwcmVkaWNhdGVgIGZ1bmN0aW9uLCBgZmlyc3RgXG4gKiBlbWl0cyB0aGUgZmlyc3QgdmFsdWUgb2YgdGhlIHNvdXJjZSB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBjb25kaXRpb24uIEl0XG4gKiBtYXkgYWxzbyB0YWtlIGEgYHJlc3VsdFNlbGVjdG9yYCBmdW5jdGlvbiB0byBwcm9kdWNlIHRoZSBvdXRwdXQgdmFsdWUgZnJvbVxuICogdGhlIGlucHV0IHZhbHVlLCBhbmQgYSBgZGVmYXVsdFZhbHVlYCB0byBlbWl0IGluIGNhc2UgdGhlIHNvdXJjZSBjb21wbGV0ZXNcbiAqIGJlZm9yZSBpdCBpcyBhYmxlIHRvIGVtaXQgYSB2YWxpZCB2YWx1ZS4gVGhyb3dzIGFuIGVycm9yIGlmIGBkZWZhdWx0VmFsdWVgXG4gKiB3YXMgbm90IHByb3ZpZGVkIGFuZCBhIG1hdGNoaW5nIGVsZW1lbnQgaXMgbm90IGZvdW5kLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXQgb25seSB0aGUgZmlyc3QgY2xpY2sgdGhhdCBoYXBwZW5zIG9uIHRoZSBET008L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy5maXJzdCgpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0cyB0aGUgZmlyc3QgY2xpY2sgdGhhdCBoYXBwZW5zIG9uIGEgRElWPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciByZXN1bHQgPSBjbGlja3MuZmlyc3QoZXYgPT4gZXYudGFyZ2V0LnRhZ05hbWUgPT09ICdESVYnKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgZmlsdGVyfVxuICogQHNlZSB7QGxpbmsgZmluZH1cbiAqIEBzZWUge0BsaW5rIHRha2V9XG4gKlxuICogQHRocm93cyB7RW1wdHlFcnJvcn0gRGVsaXZlcnMgYW4gRW1wdHlFcnJvciB0byB0aGUgT2JzZXJ2ZXIncyBgZXJyb3JgXG4gKiBjYWxsYmFjayBpZiB0aGUgT2JzZXJ2YWJsZSBjb21wbGV0ZXMgYmVmb3JlIGFueSBgbmV4dGAgbm90aWZpY2F0aW9uIHdhcyBzZW50LlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPik6IGJvb2xlYW59IFtwcmVkaWNhdGVdXG4gKiBBbiBvcHRpb25hbCBmdW5jdGlvbiBjYWxsZWQgd2l0aCBlYWNoIGl0ZW0gdG8gdGVzdCBmb3IgY29uZGl0aW9uIG1hdGNoaW5nLlxuICogQHBhcmFtIHtUfSBbZGVmYXVsdFZhbHVlXSBUaGUgZGVmYXVsdCB2YWx1ZSBlbWl0dGVkIGluIGNhc2Ugbm8gdmFsaWQgdmFsdWVcbiAqIHdhcyBmb3VuZCBvbiB0aGUgc291cmNlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gQW4gT2JzZXJ2YWJsZSBvZiB0aGUgZmlyc3QgaXRlbSB0aGF0IG1hdGNoZXMgdGhlXG4gKiBjb25kaXRpb24uXG4gKiBAbWV0aG9kIGZpcnN0XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBmaXJzdCgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLmZpcnN0LmFwcGx5KHZvaWQgMCwgYXJncykodGhpcyk7XG59XG5leHBvcnRzLmZpcnN0ID0gZmlyc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1maXJzdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBjb25jYXRNYXBUb18xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL2NvbmNhdE1hcFRvXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLmNvbmNhdE1hcFRvID0gY29uY2F0TWFwVG9fMS5jb25jYXRNYXBUbztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmNhdE1hcFRvLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xucnhqc18xLk9ic2VydmFibGUuaW50ZXJ2YWwgPSByeGpzXzEuaW50ZXJ2YWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcnZhbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogVGhlIE1pbiBvcGVyYXRvciBvcGVyYXRlcyBvbiBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgbnVtYmVycyAob3IgaXRlbXMgdGhhdCBjYW4gYmUgY29tcGFyZWQgd2l0aCBhIHByb3ZpZGVkIGZ1bmN0aW9uKSxcbiAqIGFuZCB3aGVuIHNvdXJjZSBPYnNlcnZhYmxlIGNvbXBsZXRlcyBpdCBlbWl0cyBhIHNpbmdsZSBpdGVtOiB0aGUgaXRlbSB3aXRoIHRoZSBzbWFsbGVzdCB2YWx1ZS5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL21pbi5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5HZXQgdGhlIG1pbmltYWwgdmFsdWUgb2YgYSBzZXJpZXMgb2YgbnVtYmVyczwvY2FwdGlvbj5cbiAqIFJ4Lk9ic2VydmFibGUub2YoNSwgNCwgNywgMiwgOClcbiAqICAgLm1pbigpXG4gKiAgIC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7IC8vIC0+IDJcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Vc2UgYSBjb21wYXJlciBmdW5jdGlvbiB0byBnZXQgdGhlIG1pbmltYWwgaXRlbTwvY2FwdGlvbj5cbiAqIGludGVyZmFjZSBQZXJzb24ge1xuICogICBhZ2U6IG51bWJlcixcbiAqICAgbmFtZTogc3RyaW5nXG4gKiB9XG4gKiBPYnNlcnZhYmxlLm9mPFBlcnNvbj4oe2FnZTogNywgbmFtZTogJ0Zvbyd9LFxuICogICAgICAgICAgICAgICAgICAgICAgIHthZ2U6IDUsIG5hbWU6ICdCYXInfSxcbiAqICAgICAgICAgICAgICAgICAgICAgICB7YWdlOiA5LCBuYW1lOiAnQmVlcid9KVxuICogICAgICAgICAgIC5taW48UGVyc29uPiggKGE6IFBlcnNvbiwgYjogUGVyc29uKSA9PiBhLmFnZSA8IGIuYWdlID8gLTEgOiAxKVxuICogICAgICAgICAgIC5zdWJzY3JpYmUoKHg6IFBlcnNvbikgPT4gY29uc29sZS5sb2coeC5uYW1lKSk7IC8vIC0+ICdCYXInXG4gKiB9XG4gKlxuICogQHNlZSB7QGxpbmsgbWF4fVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wYXJlcl0gLSBPcHRpb25hbCBjb21wYXJlciBmdW5jdGlvbiB0aGF0IGl0IHdpbGwgdXNlIGluc3RlYWQgb2YgaXRzIGRlZmF1bHQgdG8gY29tcGFyZSB0aGVcbiAqIHZhbHVlIG9mIHR3byBpdGVtcy5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8Uj59IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBpdGVtIHdpdGggdGhlIHNtYWxsZXN0IHZhbHVlLlxuICogQG1ldGhvZCBtaW5cbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIG1pbihjb21wYXJlcikge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5taW4oY29tcGFyZXIpKHRoaXMpO1xufVxuZXhwb3J0cy5taW4gPSBtaW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1taW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgdG9BcnJheV8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3RvQXJyYXlcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUudG9BcnJheSA9IHRvQXJyYXlfMS50b0FycmF5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9BcnJheS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogQnJhbmNoIG91dCB0aGUgc291cmNlIE9ic2VydmFibGUgdmFsdWVzIGFzIGEgbmVzdGVkIE9ic2VydmFibGUgd2l0aCBlYWNoXG4gKiBuZXN0ZWQgT2JzZXJ2YWJsZSBlbWl0dGluZyBhdCBtb3N0IGB3aW5kb3dTaXplYCB2YWx1ZXMuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkl0J3MgbGlrZSB7QGxpbmsgYnVmZmVyQ291bnR9LCBidXQgZW1pdHMgYSBuZXN0ZWRcbiAqIE9ic2VydmFibGUgaW5zdGVhZCBvZiBhbiBhcnJheS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy93aW5kb3dDb3VudC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB3aW5kb3dzIG9mIGl0ZW1zIGl0IGNvbGxlY3RzIGZyb20gdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZS4gVGhlIG91dHB1dCBPYnNlcnZhYmxlIGVtaXRzIHdpbmRvd3MgZXZlcnkgYHN0YXJ0V2luZG93RXZlcnlgXG4gKiBpdGVtcywgZWFjaCBjb250YWluaW5nIG5vIG1vcmUgdGhhbiBgd2luZG93U2l6ZWAgaXRlbXMuIFdoZW4gdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSBjb21wbGV0ZXMgb3IgZW5jb3VudGVycyBhbiBlcnJvciwgdGhlIG91dHB1dCBPYnNlcnZhYmxlIGVtaXRzXG4gKiB0aGUgY3VycmVudCB3aW5kb3cgYW5kIHByb3BhZ2F0ZXMgdGhlIG5vdGlmaWNhdGlvbiBmcm9tIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUuIElmIGBzdGFydFdpbmRvd0V2ZXJ5YCBpcyBub3QgcHJvdmlkZWQsIHRoZW4gbmV3IHdpbmRvd3MgYXJlXG4gKiBzdGFydGVkIGltbWVkaWF0ZWx5IGF0IHRoZSBzdGFydCBvZiB0aGUgc291cmNlIGFuZCB3aGVuIGVhY2ggd2luZG93IGNvbXBsZXRlc1xuICogd2l0aCBzaXplIGB3aW5kb3dTaXplYC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5JZ25vcmUgZXZlcnkgM3JkIGNsaWNrIGV2ZW50LCBzdGFydGluZyBmcm9tIHRoZSBmaXJzdCBvbmU8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy53aW5kb3dDb3VudCgzKVxuICogICAubWFwKHdpbiA9PiB3aW4uc2tpcCgxKSkgLy8gc2tpcCBmaXJzdCBvZiBldmVyeSAzIGNsaWNrc1xuICogICAubWVyZ2VBbGwoKTsgLy8gZmxhdHRlbiB0aGUgT2JzZXJ2YWJsZS1vZi1PYnNlcnZhYmxlc1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5JZ25vcmUgZXZlcnkgM3JkIGNsaWNrIGV2ZW50LCBzdGFydGluZyBmcm9tIHRoZSB0aGlyZCBvbmU8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy53aW5kb3dDb3VudCgyLCAzKVxuICogICAubWVyZ2VBbGwoKTsgLy8gZmxhdHRlbiB0aGUgT2JzZXJ2YWJsZS1vZi1PYnNlcnZhYmxlc1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayB3aW5kb3d9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dUaW1lfVxuICogQHNlZSB7QGxpbmsgd2luZG93VG9nZ2xlfVxuICogQHNlZSB7QGxpbmsgd2luZG93V2hlbn1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlckNvdW50fVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSB3aW5kb3dTaXplIFRoZSBtYXhpbXVtIG51bWJlciBvZiB2YWx1ZXMgZW1pdHRlZCBieSBlYWNoXG4gKiB3aW5kb3cuXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0V2luZG93RXZlcnldIEludGVydmFsIGF0IHdoaWNoIHRvIHN0YXJ0IGEgbmV3IHdpbmRvdy5cbiAqIEZvciBleGFtcGxlIGlmIGBzdGFydFdpbmRvd0V2ZXJ5YCBpcyBgMmAsIHRoZW4gYSBuZXcgd2luZG93IHdpbGwgYmUgc3RhcnRlZFxuICogb24gZXZlcnkgb3RoZXIgdmFsdWUgZnJvbSB0aGUgc291cmNlLiBBIG5ldyB3aW5kb3cgaXMgc3RhcnRlZCBhdCB0aGVcbiAqIGJlZ2lubmluZyBvZiB0aGUgc291cmNlIGJ5IGRlZmF1bHQuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPE9ic2VydmFibGU8VD4+fSBBbiBPYnNlcnZhYmxlIG9mIHdpbmRvd3MsIHdoaWNoIGluIHR1cm5cbiAqIGFyZSBPYnNlcnZhYmxlIG9mIHZhbHVlcy5cbiAqIEBtZXRob2Qgd2luZG93Q291bnRcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIHdpbmRvd0NvdW50KHdpbmRvd1NpemUsIHN0YXJ0V2luZG93RXZlcnkpIHtcbiAgICBpZiAoc3RhcnRXaW5kb3dFdmVyeSA9PT0gdm9pZCAwKSB7IHN0YXJ0V2luZG93RXZlcnkgPSAwOyB9XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLndpbmRvd0NvdW50KHdpbmRvd1NpemUsIHN0YXJ0V2luZG93RXZlcnkpKHRoaXMpO1xufVxuZXhwb3J0cy53aW5kb3dDb3VudCA9IHdpbmRvd0NvdW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2luZG93Q291bnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBFbWl0cyBvbmx5IHRoZSBmaXJzdCB2YWx1ZSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB0aGF0IG1lZXRzIHNvbWVcbiAqIGNvbmRpdGlvbi5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+RmluZHMgdGhlIGZpcnN0IHZhbHVlIHRoYXQgcGFzc2VzIHNvbWUgdGVzdCBhbmQgZW1pdHNcbiAqIHRoYXQuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZmluZC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgZmluZGAgc2VhcmNoZXMgZm9yIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB0aGF0IG1hdGNoZXMgdGhlXG4gKiBzcGVjaWZpZWQgY29uZGl0aW9uIGVtYm9kaWVkIGJ5IHRoZSBgcHJlZGljYXRlYCwgYW5kIHJldHVybnMgdGhlIGZpcnN0XG4gKiBvY2N1cnJlbmNlIGluIHRoZSBzb3VyY2UuIFVubGlrZSB7QGxpbmsgZmlyc3R9LCB0aGUgYHByZWRpY2F0ZWAgaXMgcmVxdWlyZWRcbiAqIGluIGBmaW5kYCwgYW5kIGRvZXMgbm90IGVtaXQgYW4gZXJyb3IgaWYgYSB2YWxpZCB2YWx1ZSBpcyBub3QgZm91bmQuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RmluZCBhbmQgZW1pdCB0aGUgZmlyc3QgY2xpY2sgdGhhdCBoYXBwZW5zIG9uIGEgRElWIGVsZW1lbnQ8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy5maW5kKGV2ID0+IGV2LnRhcmdldC50YWdOYW1lID09PSAnRElWJyk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGZpbHRlcn1cbiAqIEBzZWUge0BsaW5rIGZpcnN0fVxuICogQHNlZSB7QGxpbmsgZmluZEluZGV4fVxuICogQHNlZSB7QGxpbmsgdGFrZX1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCBpbmRleDogbnVtYmVyLCBzb3VyY2U6IE9ic2VydmFibGU8VD4pOiBib29sZWFufSBwcmVkaWNhdGVcbiAqIEEgZnVuY3Rpb24gY2FsbGVkIHdpdGggZWFjaCBpdGVtIHRvIHRlc3QgZm9yIGNvbmRpdGlvbiBtYXRjaGluZy5cbiAqIEBwYXJhbSB7YW55fSBbdGhpc0FyZ10gQW4gb3B0aW9uYWwgYXJndW1lbnQgdG8gZGV0ZXJtaW5lIHRoZSB2YWx1ZSBvZiBgdGhpc2BcbiAqIGluIHRoZSBgcHJlZGljYXRlYCBmdW5jdGlvbi5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgb2YgdGhlIGZpcnN0IGl0ZW0gdGhhdCBtYXRjaGVzIHRoZVxuICogY29uZGl0aW9uLlxuICogQG1ldGhvZCBmaW5kXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBmaW5kKHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5maW5kKHByZWRpY2F0ZSwgdGhpc0FyZykodGhpcyk7XG59XG5leHBvcnRzLmZpbmQgPSBmaW5kO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmluZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBkaXN0aW5jdFVudGlsS2V5Q2hhbmdlZF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL2Rpc3RpbmN0VW50aWxLZXlDaGFuZ2VkXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLmRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkID0gZGlzdGluY3RVbnRpbEtleUNoYW5nZWRfMS5kaXN0aW5jdFVudGlsS2V5Q2hhbmdlZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBDb21wYXJlcyBhbGwgdmFsdWVzIG9mIHR3byBvYnNlcnZhYmxlcyBpbiBzZXF1ZW5jZSB1c2luZyBhbiBvcHRpb25hbCBjb21wYXJvciBmdW5jdGlvblxuICogYW5kIHJldHVybnMgYW4gb2JzZXJ2YWJsZSBvZiBhIHNpbmdsZSBib29sZWFuIHZhbHVlIHJlcHJlc2VudGluZyB3aGV0aGVyIG9yIG5vdCB0aGUgdHdvIHNlcXVlbmNlc1xuICogYXJlIGVxdWFsLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5DaGVja3MgdG8gc2VlIG9mIGFsbCB2YWx1ZXMgZW1pdHRlZCBieSBib3RoIG9ic2VydmFibGVzIGFyZSBlcXVhbCwgaW4gb3JkZXIuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvc2VxdWVuY2VFcXVhbC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgc2VxdWVuY2VFcXVhbGAgc3Vic2NyaWJlcyB0byB0d28gb2JzZXJ2YWJsZXMgYW5kIGJ1ZmZlcnMgaW5jb21pbmcgdmFsdWVzIGZyb20gZWFjaCBvYnNlcnZhYmxlLiBXaGVuZXZlciBlaXRoZXJcbiAqIG9ic2VydmFibGUgZW1pdHMgYSB2YWx1ZSwgdGhlIHZhbHVlIGlzIGJ1ZmZlcmVkIGFuZCB0aGUgYnVmZmVycyBhcmUgc2hpZnRlZCBhbmQgY29tcGFyZWQgZnJvbSB0aGUgYm90dG9tXG4gKiB1cDsgSWYgYW55IHZhbHVlIHBhaXIgZG9lc24ndCBtYXRjaCwgdGhlIHJldHVybmVkIG9ic2VydmFibGUgd2lsbCBlbWl0IGBmYWxzZWAgYW5kIGNvbXBsZXRlLiBJZiBvbmUgb2YgdGhlXG4gKiBvYnNlcnZhYmxlcyBjb21wbGV0ZXMsIHRoZSBvcGVyYXRvciB3aWxsIHdhaXQgZm9yIHRoZSBvdGhlciBvYnNlcnZhYmxlIHRvIGNvbXBsZXRlOyBJZiB0aGUgb3RoZXJcbiAqIG9ic2VydmFibGUgZW1pdHMgYmVmb3JlIGNvbXBsZXRpbmcsIHRoZSByZXR1cm5lZCBvYnNlcnZhYmxlIHdpbGwgZW1pdCBgZmFsc2VgIGFuZCBjb21wbGV0ZS4gSWYgb25lIG9ic2VydmFibGUgbmV2ZXJcbiAqIGNvbXBsZXRlcyBvciBlbWl0cyBhZnRlciB0aGUgb3RoZXIgY29tcGxldHMsIHRoZSByZXR1cm5lZCBvYnNlcnZhYmxlIHdpbGwgbmV2ZXIgY29tcGxldGUuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+ZmlndXJlIG91dCBpZiB0aGUgS29uYW1pIGNvZGUgbWF0Y2hlczwvY2FwdGlvbj5cbiAqIHZhciBjb2RlID0gUnguT2JzZXJ2YWJsZS5mcm9tKFtcbiAqICBcIkFycm93VXBcIixcbiAqICBcIkFycm93VXBcIixcbiAqICBcIkFycm93RG93blwiLFxuICogIFwiQXJyb3dEb3duXCIsXG4gKiAgXCJBcnJvd0xlZnRcIixcbiAqICBcIkFycm93UmlnaHRcIixcbiAqICBcIkFycm93TGVmdFwiLFxuICogIFwiQXJyb3dSaWdodFwiLFxuICogIFwiS2V5QlwiLFxuICogIFwiS2V5QVwiLFxuICogIFwiRW50ZXJcIiAvLyBubyBzdGFydCBrZXksIGNsZWFybHkuXG4gKiBdKTtcbiAqXG4gKiB2YXIga2V5cyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAna2V5dXAnKVxuICogIC5tYXAoZSA9PiBlLmNvZGUpO1xuICogdmFyIG1hdGNoZXMgPSBrZXlzLmJ1ZmZlckNvdW50KDExLCAxKVxuICogIC5tZXJnZU1hcChcbiAqICAgIGxhc3QxMSA9PlxuICogICAgICBSeC5PYnNlcnZhYmxlLmZyb20obGFzdDExKVxuICogICAgICAgIC5zZXF1ZW5jZUVxdWFsKGNvZGUpXG4gKiAgICk7XG4gKiBtYXRjaGVzLnN1YnNjcmliZShtYXRjaGVkID0+IGNvbnNvbGUubG9nKCdTdWNjZXNzZnVsIGNoZWF0IGF0IENvbnRyYT8gJywgbWF0Y2hlZCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGNvbWJpbmVMYXRlc3R9XG4gKiBAc2VlIHtAbGluayB6aXB9XG4gKiBAc2VlIHtAbGluayB3aXRoTGF0ZXN0RnJvbX1cbiAqXG4gKiBAcGFyYW0ge09ic2VydmFibGV9IGNvbXBhcmVUbyBUaGUgb2JzZXJ2YWJsZSBzZXF1ZW5jZSB0byBjb21wYXJlIHRoZSBzb3VyY2Ugc2VxdWVuY2UgdG8uXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY29tcGFyb3JdIEFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGNvbXBhcmUgZWFjaCB2YWx1ZSBwYWlyXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIG9mIGEgc2luZ2xlIGJvb2xlYW4gdmFsdWUgcmVwcmVzZW50aW5nIHdoZXRoZXIgb3Igbm90XG4gKiB0aGUgdmFsdWVzIGVtaXR0ZWQgYnkgYm90aCBvYnNlcnZhYmxlcyB3ZXJlIGVxdWFsIGluIHNlcXVlbmNlLlxuICogQG1ldGhvZCBzZXF1ZW5jZUVxdWFsXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBzZXF1ZW5jZUVxdWFsKGNvbXBhcmVUbywgY29tcGFyb3IpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEuc2VxdWVuY2VFcXVhbChjb21wYXJlVG8sIGNvbXBhcm9yKSh0aGlzKTtcbn1cbmV4cG9ydHMuc2VxdWVuY2VFcXVhbCA9IHNlcXVlbmNlRXF1YWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXF1ZW5jZUVxdWFsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIHNoYXJlXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3Ivc2hhcmVcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUuc2hhcmUgPSBzaGFyZV8xLnNoYXJlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2hhcmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgdGltZUludGVydmFsXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvdGltZUludGVydmFsXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLnRpbWVJbnRlcnZhbCA9IHRpbWVJbnRlcnZhbF8xLnRpbWVJbnRlcnZhbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWVJbnRlcnZhbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBpbnRlcm5hbF9jb21wYXRpYmlsaXR5XzEgPSByZXF1aXJlKFwicnhqcy9pbnRlcm5hbC1jb21wYXRpYmlsaXR5XCIpO1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbi8qKlxuICogQ29tYmluZXMgbXVsdGlwbGUgT2JzZXJ2YWJsZXMgdG8gY3JlYXRlIGFuIE9ic2VydmFibGUgd2hvc2UgdmFsdWVzIGFyZVxuICogY2FsY3VsYXRlZCBmcm9tIHRoZSBsYXRlc3QgdmFsdWVzIG9mIGVhY2ggb2YgaXRzIGlucHV0IE9ic2VydmFibGVzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5XaGVuZXZlciBhbnkgaW5wdXQgT2JzZXJ2YWJsZSBlbWl0cyBhIHZhbHVlLCBpdFxuICogY29tcHV0ZXMgYSBmb3JtdWxhIHVzaW5nIHRoZSBsYXRlc3QgdmFsdWVzIGZyb20gYWxsIHRoZSBpbnB1dHMsIHRoZW4gZW1pdHNcbiAqIHRoZSBvdXRwdXQgb2YgdGhhdCBmb3JtdWxhLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2NvbWJpbmVMYXRlc3QucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYGNvbWJpbmVMYXRlc3RgIGNvbWJpbmVzIHRoZSB2YWx1ZXMgZnJvbSB0aGlzIE9ic2VydmFibGUgd2l0aCB2YWx1ZXMgZnJvbVxuICogT2JzZXJ2YWJsZXMgcGFzc2VkIGFzIGFyZ3VtZW50cy4gVGhpcyBpcyBkb25lIGJ5IHN1YnNjcmliaW5nIHRvIGVhY2hcbiAqIE9ic2VydmFibGUsIGluIG9yZGVyLCBhbmQgY29sbGVjdGluZyBhbiBhcnJheSBvZiBlYWNoIG9mIHRoZSBtb3N0IHJlY2VudFxuICogdmFsdWVzIGFueSB0aW1lIGFueSBvZiB0aGUgaW5wdXQgT2JzZXJ2YWJsZXMgZW1pdHMsIHRoZW4gZWl0aGVyIHRha2luZyB0aGF0XG4gKiBhcnJheSBhbmQgcGFzc2luZyBpdCBhcyBhcmd1bWVudHMgdG8gYW4gb3B0aW9uYWwgYHByb2plY3RgIGZ1bmN0aW9uIGFuZFxuICogZW1pdHRpbmcgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGF0LCBvciBqdXN0IGVtaXR0aW5nIHRoZSBhcnJheSBvZiByZWNlbnRcbiAqIHZhbHVlcyBkaXJlY3RseSBpZiB0aGVyZSBpcyBubyBgcHJvamVjdGAgZnVuY3Rpb24uXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RHluYW1pY2FsbHkgY2FsY3VsYXRlIHRoZSBCb2R5LU1hc3MgSW5kZXggZnJvbSBhbiBPYnNlcnZhYmxlIG9mIHdlaWdodCBhbmQgb25lIGZvciBoZWlnaHQ8L2NhcHRpb24+XG4gKiB2YXIgd2VpZ2h0ID0gUnguT2JzZXJ2YWJsZS5vZig3MCwgNzIsIDc2LCA3OSwgNzUpO1xuICogdmFyIGhlaWdodCA9IFJ4Lk9ic2VydmFibGUub2YoMS43NiwgMS43NywgMS43OCk7XG4gKiB2YXIgYm1pID0gd2VpZ2h0LmNvbWJpbmVMYXRlc3QoaGVpZ2h0LCAodywgaCkgPT4gdyAvIChoICogaCkpO1xuICogYm1pLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKCdCTUkgaXMgJyArIHgpKTtcbiAqXG4gKiAvLyBXaXRoIG91dHB1dCB0byBjb25zb2xlOlxuICogLy8gQk1JIGlzIDI0LjIxMjI5MzM4ODQyOTc1M1xuICogLy8gQk1JIGlzIDIzLjkzOTQ4MDk5MjA1MjA5XG4gKiAvLyBCTUkgaXMgMjMuNjcxMjUzNjI5NTkyMjIyXG4gKlxuICogQHNlZSB7QGxpbmsgY29tYmluZUFsbH1cbiAqIEBzZWUge0BsaW5rIG1lcmdlfVxuICogQHNlZSB7QGxpbmsgd2l0aExhdGVzdEZyb219XG4gKlxuICogQHBhcmFtIHtPYnNlcnZhYmxlSW5wdXR9IG90aGVyIEFuIGlucHV0IE9ic2VydmFibGUgdG8gY29tYmluZSB3aXRoIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUuIE1vcmUgdGhhbiBvbmUgaW5wdXQgT2JzZXJ2YWJsZXMgbWF5IGJlIGdpdmVuIGFzIGFyZ3VtZW50LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gW3Byb2plY3RdIEFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIHByb2plY3QgdGhlIHZhbHVlcyBmcm9tXG4gKiB0aGUgY29tYmluZWQgbGF0ZXN0IHZhbHVlcyBpbnRvIGEgbmV3IHZhbHVlIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgb2YgcHJvamVjdGVkIHZhbHVlcyBmcm9tIHRoZSBtb3N0IHJlY2VudFxuICogdmFsdWVzIGZyb20gZWFjaCBpbnB1dCBPYnNlcnZhYmxlLCBvciBhbiBhcnJheSBvZiB0aGUgbW9zdCByZWNlbnQgdmFsdWVzIGZyb21cbiAqIGVhY2ggaW5wdXQgT2JzZXJ2YWJsZS5cbiAqIEBtZXRob2QgY29tYmluZUxhdGVzdFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gY29tYmluZUxhdGVzdCgpIHtcbiAgICB2YXIgb2JzZXJ2YWJsZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBvYnNlcnZhYmxlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgcHJvamVjdCA9IG51bGw7XG4gICAgaWYgKHR5cGVvZiBvYnNlcnZhYmxlc1tvYnNlcnZhYmxlcy5sZW5ndGggLSAxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcm9qZWN0ID0gb2JzZXJ2YWJsZXMucG9wKCk7XG4gICAgfVxuICAgIC8vIGlmIHRoZSBmaXJzdCBhbmQgb25seSBvdGhlciBhcmd1bWVudCBiZXNpZGVzIHRoZSByZXN1bHRTZWxlY3RvciBpcyBhbiBhcnJheVxuICAgIC8vIGFzc3VtZSBpdCdzIGJlZW4gY2FsbGVkIHdpdGggYGNvbWJpbmVMYXRlc3QoW29iczEsIG9iczIsIG9iczNdLCBwcm9qZWN0KWBcbiAgICBpZiAob2JzZXJ2YWJsZXMubGVuZ3RoID09PSAxICYmIGludGVybmFsX2NvbXBhdGliaWxpdHlfMS5pc0FycmF5KG9ic2VydmFibGVzWzBdKSkge1xuICAgICAgICBvYnNlcnZhYmxlcyA9IG9ic2VydmFibGVzWzBdLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmxpZnQuY2FsbChyeGpzXzEub2YuYXBwbHkodm9pZCAwLCBbdGhpc10uY29uY2F0KG9ic2VydmFibGVzKSksIG5ldyBpbnRlcm5hbF9jb21wYXRpYmlsaXR5XzEuQ29tYmluZUxhdGVzdE9wZXJhdG9yKHByb2plY3QpKTtcbn1cbmV4cG9ydHMuY29tYmluZUxhdGVzdCA9IGNvbWJpbmVMYXRlc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21iaW5lTGF0ZXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGludGVybmFsX2NvbXBhdGliaWxpdHlfMSA9IHJlcXVpcmUoXCJyeGpzL2ludGVybmFsLWNvbXBhdGliaWxpdHlcIik7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIEVtaXRzIGEgdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUsIHRoZW4gaWdub3JlcyBzdWJzZXF1ZW50IHNvdXJjZVxuICogdmFsdWVzIGZvciBgZHVyYXRpb25gIG1pbGxpc2Vjb25kcywgdGhlbiByZXBlYXRzIHRoaXMgcHJvY2Vzcy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+TGV0cyBhIHZhbHVlIHBhc3MsIHRoZW4gaWdub3JlcyBzb3VyY2UgdmFsdWVzIGZvciB0aGVcbiAqIG5leHQgYGR1cmF0aW9uYCBtaWxsaXNlY29uZHMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvdGhyb3R0bGVUaW1lLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGB0aHJvdHRsZVRpbWVgIGVtaXRzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB2YWx1ZXMgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlXG4gKiB3aGVuIGl0cyBpbnRlcm5hbCB0aW1lciBpcyBkaXNhYmxlZCwgYW5kIGlnbm9yZXMgc291cmNlIHZhbHVlcyB3aGVuIHRoZSB0aW1lclxuICogaXMgZW5hYmxlZC4gSW5pdGlhbGx5LCB0aGUgdGltZXIgaXMgZGlzYWJsZWQuIEFzIHNvb24gYXMgdGhlIGZpcnN0IHNvdXJjZVxuICogdmFsdWUgYXJyaXZlcywgaXQgaXMgZm9yd2FyZGVkIHRvIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSwgYW5kIHRoZW4gdGhlIHRpbWVyXG4gKiBpcyBlbmFibGVkLiBBZnRlciBgZHVyYXRpb25gIG1pbGxpc2Vjb25kcyAob3IgdGhlIHRpbWUgdW5pdCBkZXRlcm1pbmVkXG4gKiBpbnRlcm5hbGx5IGJ5IHRoZSBvcHRpb25hbCBgc2NoZWR1bGVyYCkgaGFzIHBhc3NlZCwgdGhlIHRpbWVyIGlzIGRpc2FibGVkLFxuICogYW5kIHRoaXMgcHJvY2VzcyByZXBlYXRzIGZvciB0aGUgbmV4dCBzb3VyY2UgdmFsdWUuIE9wdGlvbmFsbHkgdGFrZXMgYVxuICoge0BsaW5rIElTY2hlZHVsZXJ9IGZvciBtYW5hZ2luZyB0aW1lcnMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCBjbGlja3MgYXQgYSByYXRlIG9mIGF0IG1vc3Qgb25lIGNsaWNrIHBlciBzZWNvbmQ8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy50aHJvdHRsZVRpbWUoMTAwMCk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGF1ZGl0VGltZX1cbiAqIEBzZWUge0BsaW5rIGRlYm91bmNlVGltZX1cbiAqIEBzZWUge0BsaW5rIGRlbGF5fVxuICogQHNlZSB7QGxpbmsgc2FtcGxlVGltZX1cbiAqIEBzZWUge0BsaW5rIHRocm90dGxlfVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiBUaW1lIHRvIHdhaXQgYmVmb3JlIGVtaXR0aW5nIGFub3RoZXIgdmFsdWUgYWZ0ZXJcbiAqIGVtaXR0aW5nIHRoZSBsYXN0IHZhbHVlLCBtZWFzdXJlZCBpbiBtaWxsaXNlY29uZHMgb3IgdGhlIHRpbWUgdW5pdCBkZXRlcm1pbmVkXG4gKiBpbnRlcm5hbGx5IGJ5IHRoZSBvcHRpb25hbCBgc2NoZWR1bGVyYC5cbiAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyPWFzeW5jU2NoZWR1bGVyXSBUaGUge0BsaW5rIFNjaGVkdWxlckxpa2V9IHRvIHVzZSBmb3JcbiAqIG1hbmFnaW5nIHRoZSB0aW1lcnMgdGhhdCBoYW5kbGUgdGhlIHRocm90dGxpbmcuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgcGVyZm9ybXMgdGhlIHRocm90dGxlIG9wZXJhdGlvbiB0b1xuICogbGltaXQgdGhlIHJhdGUgb2YgZW1pc3Npb25zIGZyb20gdGhlIHNvdXJjZS5cbiAqIEBtZXRob2QgdGhyb3R0bGVUaW1lXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiB0aHJvdHRsZVRpbWUoZHVyYXRpb24sIHNjaGVkdWxlciwgY29uZmlnKSB7XG4gICAgaWYgKHNjaGVkdWxlciA9PT0gdm9pZCAwKSB7IHNjaGVkdWxlciA9IHJ4anNfMS5hc3luY1NjaGVkdWxlcjsgfVxuICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSBpbnRlcm5hbF9jb21wYXRpYmlsaXR5XzEuZGVmYXVsdFRocm90dGxlQ29uZmlnOyB9XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLnRocm90dGxlVGltZShkdXJhdGlvbiwgc2NoZWR1bGVyLCBjb25maWcpKHRoaXMpO1xufVxuZXhwb3J0cy50aHJvdHRsZVRpbWUgPSB0aHJvdHRsZVRpbWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aHJvdHRsZVRpbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgcmVwZWF0V2hlbl8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3JlcGVhdFdoZW5cIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUucmVwZWF0V2hlbiA9IHJlcGVhdFdoZW5fMS5yZXBlYXRXaGVuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVwZWF0V2hlbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBzd2l0Y2hNYXBUb18xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3N3aXRjaE1hcFRvXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLnN3aXRjaE1hcFRvID0gc3dpdGNoTWFwVG9fMS5zd2l0Y2hNYXBUbztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN3aXRjaE1hcFRvLmpzLm1hcCIsIi8vIEhBQ0s6IGRvZXMgbm90aGluZywgYmVjYXVzZSBgdG9Qcm9taXNlYCBub3cgbGl2ZXMgb24gdGhlIGBPYnNlcnZhYmxlYCBpdHNlbGYuXG4vLyBsZWF2aW5nIHRoaXMgbW9kdWxlIGhlcmUgdG8gcHJldmVudCBicmVha2FnZS5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvUHJvbWlzZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogRW1pdHMgdGhlIHNpbmdsZSB2YWx1ZSBhdCB0aGUgc3BlY2lmaWVkIGBpbmRleGAgaW4gYSBzZXF1ZW5jZSBvZiBlbWlzc2lvbnNcbiAqIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5FbWl0cyBvbmx5IHRoZSBpLXRoIHZhbHVlLCB0aGVuIGNvbXBsZXRlcy48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9lbGVtZW50QXQucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYGVsZW1lbnRBdGAgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIGl0ZW0gYXQgdGhlIHNwZWNpZmllZFxuICogYGluZGV4YCBpbiB0aGUgc291cmNlIE9ic2VydmFibGUsIG9yIGEgZGVmYXVsdCB2YWx1ZSBpZiB0aGF0IGBpbmRleGAgaXMgb3V0XG4gKiBvZiByYW5nZSBhbmQgdGhlIGBkZWZhdWx0YCBhcmd1bWVudCBpcyBwcm92aWRlZC4gSWYgdGhlIGBkZWZhdWx0YCBhcmd1bWVudCBpc1xuICogbm90IGdpdmVuIGFuZCB0aGUgYGluZGV4YCBpcyBvdXQgb2YgcmFuZ2UsIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSB3aWxsIGVtaXQgYW5cbiAqIGBBcmd1bWVudE91dE9mUmFuZ2VFcnJvcmAgZXJyb3IuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCBvbmx5IHRoZSB0aGlyZCBjbGljayBldmVudDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLmVsZW1lbnRBdCgyKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogLy8gUmVzdWx0cyBpbjpcbiAqIC8vIGNsaWNrIDEgPSBub3RoaW5nXG4gKiAvLyBjbGljayAyID0gbm90aGluZ1xuICogLy8gY2xpY2sgMyA9IE1vdXNlRXZlbnQgb2JqZWN0IGxvZ2dlZCB0byBjb25zb2xlXG4gKlxuICogQHNlZSB7QGxpbmsgZmlyc3R9XG4gKiBAc2VlIHtAbGluayBsYXN0fVxuICogQHNlZSB7QGxpbmsgc2tpcH1cbiAqIEBzZWUge0BsaW5rIHNpbmdsZX1cbiAqIEBzZWUge0BsaW5rIHRha2V9XG4gKlxuICogQHRocm93cyB7QXJndW1lbnRPdXRPZlJhbmdlRXJyb3J9IFdoZW4gdXNpbmcgYGVsZW1lbnRBdChpKWAsIGl0IGRlbGl2ZXJzIGFuXG4gKiBBcmd1bWVudE91dE9yUmFuZ2VFcnJvciB0byB0aGUgT2JzZXJ2ZXIncyBgZXJyb3JgIGNhbGxiYWNrIGlmIGBpIDwgMGAgb3IgdGhlXG4gKiBPYnNlcnZhYmxlIGhhcyBjb21wbGV0ZWQgYmVmb3JlIGVtaXR0aW5nIHRoZSBpLXRoIGBuZXh0YCBub3RpZmljYXRpb24uXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IElzIHRoZSBudW1iZXIgYGlgIGZvciB0aGUgaS10aCBzb3VyY2UgZW1pc3Npb24gdGhhdCBoYXNcbiAqIGhhcHBlbmVkIHNpbmNlIHRoZSBzdWJzY3JpcHRpb24sIHN0YXJ0aW5nIGZyb20gdGhlIG51bWJlciBgMGAuXG4gKiBAcGFyYW0ge1R9IFtkZWZhdWx0VmFsdWVdIFRoZSBkZWZhdWx0IHZhbHVlIHJldHVybmVkIGZvciBtaXNzaW5nIGluZGljZXMuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYSBzaW5nbGUgaXRlbSwgaWYgaXQgaXMgZm91bmQuXG4gKiBPdGhlcndpc2UsIHdpbGwgZW1pdCB0aGUgZGVmYXVsdCB2YWx1ZSBpZiBnaXZlbi4gSWYgbm90LCB0aGVuIGVtaXRzIGFuIGVycm9yLlxuICogQG1ldGhvZCBlbGVtZW50QXRcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIGVsZW1lbnRBdChpbmRleCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLmVsZW1lbnRBdC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykodGhpcyk7XG59XG5leHBvcnRzLmVsZW1lbnRBdCA9IGVsZW1lbnRBdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVsZW1lbnRBdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLmVtcHR5ID0gcnhqc18xLmVtcHR5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZW1wdHkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIEJyYW5jaCBvdXQgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHZhbHVlcyBhcyBhIG5lc3RlZCBPYnNlcnZhYmxlIHdoZW5ldmVyXG4gKiBgd2luZG93Qm91bmRhcmllc2AgZW1pdHMuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkl0J3MgbGlrZSB7QGxpbmsgYnVmZmVyfSwgYnV0IGVtaXRzIGEgbmVzdGVkIE9ic2VydmFibGVcbiAqIGluc3RlYWQgb2YgYW4gYXJyYXkuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvd2luZG93LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdpbmRvd3Mgb2YgaXRlbXMgaXQgY29sbGVjdHMgZnJvbSB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLiBUaGUgb3V0cHV0IE9ic2VydmFibGUgZW1pdHMgY29ubmVjdGVkLCBub24tb3ZlcmxhcHBpbmdcbiAqIHdpbmRvd3MuIEl0IGVtaXRzIHRoZSBjdXJyZW50IHdpbmRvdyBhbmQgb3BlbnMgYSBuZXcgb25lIHdoZW5ldmVyIHRoZVxuICogT2JzZXJ2YWJsZSBgd2luZG93Qm91bmRhcmllc2AgZW1pdHMgYW4gaXRlbS4gQmVjYXVzZSBlYWNoIHdpbmRvdyBpcyBhblxuICogT2JzZXJ2YWJsZSwgdGhlIG91dHB1dCBpcyBhIGhpZ2hlci1vcmRlciBPYnNlcnZhYmxlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkluIGV2ZXJ5IHdpbmRvdyBvZiAxIHNlY29uZCBlYWNoLCBlbWl0IGF0IG1vc3QgMiBjbGljayBldmVudHM8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIGludGVydmFsID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKTtcbiAqIHZhciByZXN1bHQgPSBjbGlja3Mud2luZG93KGludGVydmFsKVxuICogICAubWFwKHdpbiA9PiB3aW4udGFrZSgyKSkgLy8gZWFjaCB3aW5kb3cgaGFzIGF0IG1vc3QgMiBlbWlzc2lvbnNcbiAqICAgLm1lcmdlQWxsKCk7IC8vIGZsYXR0ZW4gdGhlIE9ic2VydmFibGUtb2YtT2JzZXJ2YWJsZXNcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgd2luZG93Q291bnR9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dUaW1lfVxuICogQHNlZSB7QGxpbmsgd2luZG93VG9nZ2xlfVxuICogQHNlZSB7QGxpbmsgd2luZG93V2hlbn1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlcn1cbiAqXG4gKiBAcGFyYW0ge09ic2VydmFibGU8YW55Pn0gd2luZG93Qm91bmRhcmllcyBBbiBPYnNlcnZhYmxlIHRoYXQgY29tcGxldGVzIHRoZVxuICogcHJldmlvdXMgd2luZG93IGFuZCBzdGFydHMgYSBuZXcgd2luZG93LlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFQ+Pn0gQW4gT2JzZXJ2YWJsZSBvZiB3aW5kb3dzLCB3aGljaCBhcmVcbiAqIE9ic2VydmFibGVzIGVtaXR0aW5nIHZhbHVlcyBvZiB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIHdpbmRvd1xuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gd2luZG93KHdpbmRvd0JvdW5kYXJpZXMpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEud2luZG93KHdpbmRvd0JvdW5kYXJpZXMpKHRoaXMpO1xufVxuZXhwb3J0cy53aW5kb3cgPSB3aW5kb3c7XG4vLyMgc291cmNlTWFwcGluZ1VSTD13aW5kb3cuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5mcm9tRXZlbnQgPSByeGpzXzEuZnJvbUV2ZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnJvbUV2ZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBDYXRjaGVzIGVycm9ycyBvbiB0aGUgb2JzZXJ2YWJsZSB0byBiZSBoYW5kbGVkIGJ5IHJldHVybmluZyBhIG5ldyBvYnNlcnZhYmxlIG9yIHRocm93aW5nIGFuIGVycm9yLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvY2F0Y2gucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+Q29udGludWVzIHdpdGggYSBkaWZmZXJlbnQgT2JzZXJ2YWJsZSB3aGVuIHRoZXJlJ3MgYW4gZXJyb3I8L2NhcHRpb24+XG4gKlxuICogT2JzZXJ2YWJsZS5vZigxLCAyLCAzLCA0LCA1KVxuICogICAubWFwKG4gPT4ge1xuICogXHQgICBpZiAobiA9PSA0KSB7XG4gKiBcdCAgICAgdGhyb3cgJ2ZvdXIhJztcbiAqICAgICB9XG4gKlx0ICAgcmV0dXJuIG47XG4gKiAgIH0pXG4gKiAgIC5jYXRjaChlcnIgPT4gT2JzZXJ2YWJsZS5vZignSScsICdJSScsICdJSUknLCAnSVYnLCAnVicpKVxuICogICAuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICogICAvLyAxLCAyLCAzLCBJLCBJSSwgSUlJLCBJViwgVlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlJldHJpZXMgdGhlIGNhdWdodCBzb3VyY2UgT2JzZXJ2YWJsZSBhZ2FpbiBpbiBjYXNlIG9mIGVycm9yLCBzaW1pbGFyIHRvIHJldHJ5KCkgb3BlcmF0b3I8L2NhcHRpb24+XG4gKlxuICogT2JzZXJ2YWJsZS5vZigxLCAyLCAzLCA0LCA1KVxuICogICAubWFwKG4gPT4ge1xuICogXHQgICBpZiAobiA9PT0gNCkge1xuICogXHQgICAgIHRocm93ICdmb3VyISc7XG4gKiAgICAgfVxuICogXHQgICByZXR1cm4gbjtcbiAqICAgfSlcbiAqICAgLmNhdGNoKChlcnIsIGNhdWdodCkgPT4gY2F1Z2h0KVxuICogICAudGFrZSgzMClcbiAqICAgLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqICAgLy8gMSwgMiwgMywgMSwgMiwgMywgLi4uXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+VGhyb3dzIGEgbmV3IGVycm9yIHdoZW4gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRocm93cyBhbiBlcnJvcjwvY2FwdGlvbj5cbiAqXG4gKiBPYnNlcnZhYmxlLm9mKDEsIDIsIDMsIDQsIDUpXG4gKiAgIC5tYXAobiA9PiB7XG4gKiAgICAgaWYgKG4gPT0gNCkge1xuICogICAgICAgdGhyb3cgJ2ZvdXIhJztcbiAqICAgICB9XG4gKiAgICAgcmV0dXJuIG47XG4gKiAgIH0pXG4gKiAgIC5jYXRjaChlcnIgPT4ge1xuICogICAgIHRocm93ICdlcnJvciBpbiBzb3VyY2UuIERldGFpbHM6ICcgKyBlcnI7XG4gKiAgIH0pXG4gKiAgIC5zdWJzY3JpYmUoXG4gKiAgICAgeCA9PiBjb25zb2xlLmxvZyh4KSxcbiAqICAgICBlcnIgPT4gY29uc29sZS5sb2coZXJyKVxuICogICApO1xuICogICAvLyAxLCAyLCAzLCBlcnJvciBpbiBzb3VyY2UuIERldGFpbHM6IGZvdXIhXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gc2VsZWN0b3IgYSBmdW5jdGlvbiB0aGF0IHRha2VzIGFzIGFyZ3VtZW50cyBgZXJyYCwgd2hpY2ggaXMgdGhlIGVycm9yLCBhbmQgYGNhdWdodGAsIHdoaWNoXG4gKiAgaXMgdGhlIHNvdXJjZSBvYnNlcnZhYmxlLCBpbiBjYXNlIHlvdSdkIGxpa2UgdG8gXCJyZXRyeVwiIHRoYXQgb2JzZXJ2YWJsZSBieSByZXR1cm5pbmcgaXQgYWdhaW4uIFdoYXRldmVyIG9ic2VydmFibGVcbiAqICBpcyByZXR1cm5lZCBieSB0aGUgYHNlbGVjdG9yYCB3aWxsIGJlIHVzZWQgdG8gY29udGludWUgdGhlIG9ic2VydmFibGUgY2hhaW4uXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBvYnNlcnZhYmxlIHRoYXQgb3JpZ2luYXRlcyBmcm9tIGVpdGhlciB0aGUgc291cmNlIG9yIHRoZSBvYnNlcnZhYmxlIHJldHVybmVkIGJ5IHRoZVxuICogIGNhdGNoIGBzZWxlY3RvcmAgZnVuY3Rpb24uXG4gKiBAbWV0aG9kIGNhdGNoXG4gKiBAbmFtZSBjYXRjaFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gX2NhdGNoKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLmNhdGNoRXJyb3Ioc2VsZWN0b3IpKHRoaXMpO1xufVxuZXhwb3J0cy5fY2F0Y2ggPSBfY2F0Y2g7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jYXRjaC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBmaW5hbGx5XzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvZmluYWxseVwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5maW5hbGx5ID0gZmluYWxseV8xLl9maW5hbGx5O1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLl9maW5hbGx5ID0gZmluYWxseV8xLl9maW5hbGx5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmluYWxseS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogU3BsaXRzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBpbnRvIHR3bywgb25lIHdpdGggdmFsdWVzIHRoYXQgc2F0aXNmeSBhXG4gKiBwcmVkaWNhdGUsIGFuZCBhbm90aGVyIHdpdGggdmFsdWVzIHRoYXQgZG9uJ3Qgc2F0aXNmeSB0aGUgcHJlZGljYXRlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIGxpa2Uge0BsaW5rIGZpbHRlcn0sIGJ1dCByZXR1cm5zIHR3byBPYnNlcnZhYmxlczpcbiAqIG9uZSBsaWtlIHRoZSBvdXRwdXQgb2Yge0BsaW5rIGZpbHRlcn0sIGFuZCB0aGUgb3RoZXIgd2l0aCB2YWx1ZXMgdGhhdCBkaWQgbm90XG4gKiBwYXNzIHRoZSBjb25kaXRpb24uPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvcGFydGl0aW9uLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBwYXJ0aXRpb25gIG91dHB1dHMgYW4gYXJyYXkgd2l0aCB0d28gT2JzZXJ2YWJsZXMgdGhhdCBwYXJ0aXRpb24gdGhlIHZhbHVlc1xuICogZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgdGhyb3VnaCB0aGUgZ2l2ZW4gYHByZWRpY2F0ZWAgZnVuY3Rpb24uIFRoZSBmaXJzdFxuICogT2JzZXJ2YWJsZSBpbiB0aGF0IGFycmF5IGVtaXRzIHNvdXJjZSB2YWx1ZXMgZm9yIHdoaWNoIHRoZSBwcmVkaWNhdGUgYXJndW1lbnRcbiAqIHJldHVybnMgdHJ1ZS4gVGhlIHNlY29uZCBPYnNlcnZhYmxlIGVtaXRzIHNvdXJjZSB2YWx1ZXMgZm9yIHdoaWNoIHRoZVxuICogcHJlZGljYXRlIHJldHVybnMgZmFsc2UuIFRoZSBmaXJzdCBiZWhhdmVzIGxpa2Uge0BsaW5rIGZpbHRlcn0gYW5kIHRoZSBzZWNvbmRcbiAqIGJlaGF2ZXMgbGlrZSB7QGxpbmsgZmlsdGVyfSB3aXRoIHRoZSBwcmVkaWNhdGUgbmVnYXRlZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5QYXJ0aXRpb24gY2xpY2sgZXZlbnRzIGludG8gdGhvc2Ugb24gRElWIGVsZW1lbnRzIGFuZCB0aG9zZSBlbHNld2hlcmU8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHBhcnRzID0gY2xpY2tzLnBhcnRpdGlvbihldiA9PiBldi50YXJnZXQudGFnTmFtZSA9PT0gJ0RJVicpO1xuICogdmFyIGNsaWNrc09uRGl2cyA9IHBhcnRzWzBdO1xuICogdmFyIGNsaWNrc0Vsc2V3aGVyZSA9IHBhcnRzWzFdO1xuICogY2xpY2tzT25EaXZzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKCdESVYgY2xpY2tlZDogJywgeCkpO1xuICogY2xpY2tzRWxzZXdoZXJlLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKCdPdGhlciBjbGlja2VkOiAnLCB4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgZmlsdGVyfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGluZGV4OiBudW1iZXIpOiBib29sZWFufSBwcmVkaWNhdGUgQSBmdW5jdGlvbiB0aGF0XG4gKiBldmFsdWF0ZXMgZWFjaCB2YWx1ZSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gSWYgaXQgcmV0dXJucyBgdHJ1ZWAsXG4gKiB0aGUgdmFsdWUgaXMgZW1pdHRlZCBvbiB0aGUgZmlyc3QgT2JzZXJ2YWJsZSBpbiB0aGUgcmV0dXJuZWQgYXJyYXksIGlmXG4gKiBgZmFsc2VgIHRoZSB2YWx1ZSBpcyBlbWl0dGVkIG9uIHRoZSBzZWNvbmQgT2JzZXJ2YWJsZSBpbiB0aGUgYXJyYXkuIFRoZVxuICogYGluZGV4YCBwYXJhbWV0ZXIgaXMgdGhlIG51bWJlciBgaWAgZm9yIHRoZSBpLXRoIHNvdXJjZSBlbWlzc2lvbiB0aGF0IGhhc1xuICogaGFwcGVuZWQgc2luY2UgdGhlIHN1YnNjcmlwdGlvbiwgc3RhcnRpbmcgZnJvbSB0aGUgbnVtYmVyIGAwYC5cbiAqIEBwYXJhbSB7YW55fSBbdGhpc0FyZ10gQW4gb3B0aW9uYWwgYXJndW1lbnQgdG8gZGV0ZXJtaW5lIHRoZSB2YWx1ZSBvZiBgdGhpc2BcbiAqIGluIHRoZSBgcHJlZGljYXRlYCBmdW5jdGlvbi5cbiAqIEByZXR1cm4ge1tPYnNlcnZhYmxlPFQ+LCBPYnNlcnZhYmxlPFQ+XX0gQW4gYXJyYXkgd2l0aCB0d28gT2JzZXJ2YWJsZXM6IG9uZVxuICogd2l0aCB2YWx1ZXMgdGhhdCBwYXNzZWQgdGhlIHByZWRpY2F0ZSwgYW5kIGFub3RoZXIgd2l0aCB2YWx1ZXMgdGhhdCBkaWQgbm90XG4gKiBwYXNzIHRoZSBwcmVkaWNhdGUuXG4gKiBAbWV0aG9kIHBhcnRpdGlvblxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gcGFydGl0aW9uKHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5wYXJ0aXRpb24ocHJlZGljYXRlLCB0aGlzQXJnKSh0aGlzKTtcbn1cbmV4cG9ydHMucGFydGl0aW9uID0gcGFydGl0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFydGl0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGJ1ZmZlcldoZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9idWZmZXJXaGVuXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLmJ1ZmZlcldoZW4gPSBidWZmZXJXaGVuXzEuYnVmZmVyV2hlbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ1ZmZlcldoZW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIEJyYW5jaCBvdXQgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHZhbHVlcyBhcyBhIG5lc3RlZCBPYnNlcnZhYmxlIHVzaW5nIGFcbiAqIGZhY3RvcnkgZnVuY3Rpb24gb2YgY2xvc2luZyBPYnNlcnZhYmxlcyB0byBkZXRlcm1pbmUgd2hlbiB0byBzdGFydCBhIG5ld1xuICogd2luZG93LlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIGxpa2Uge0BsaW5rIGJ1ZmZlcldoZW59LCBidXQgZW1pdHMgYSBuZXN0ZWRcbiAqIE9ic2VydmFibGUgaW5zdGVhZCBvZiBhbiBhcnJheS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy93aW5kb3dXaGVuLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdpbmRvd3Mgb2YgaXRlbXMgaXQgY29sbGVjdHMgZnJvbSB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLiBUaGUgb3V0cHV0IE9ic2VydmFibGUgZW1pdHMgY29ubmVjdGVkLCBub24tb3ZlcmxhcHBpbmcgd2luZG93cy5cbiAqIEl0IGVtaXRzIHRoZSBjdXJyZW50IHdpbmRvdyBhbmQgb3BlbnMgYSBuZXcgb25lIHdoZW5ldmVyIHRoZSBPYnNlcnZhYmxlXG4gKiBwcm9kdWNlZCBieSB0aGUgc3BlY2lmaWVkIGBjbG9zaW5nU2VsZWN0b3JgIGZ1bmN0aW9uIGVtaXRzIGFuIGl0ZW0uIFRoZSBmaXJzdFxuICogd2luZG93IGlzIG9wZW5lZCBpbW1lZGlhdGVseSB3aGVuIHN1YnNjcmliaW5nIHRvIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IG9ubHkgdGhlIGZpcnN0IHR3byBjbGlja3MgZXZlbnRzIGluIGV2ZXJ5IHdpbmRvdyBvZiBbMS01XSByYW5kb20gc2Vjb25kczwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzXG4gKiAgIC53aW5kb3dXaGVuKCgpID0+IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCArIE1hdGgucmFuZG9tKCkgKiA0MDAwKSlcbiAqICAgLm1hcCh3aW4gPT4gd2luLnRha2UoMikpIC8vIGVhY2ggd2luZG93IGhhcyBhdCBtb3N0IDIgZW1pc3Npb25zXG4gKiAgIC5tZXJnZUFsbCgpOyAvLyBmbGF0dGVuIHRoZSBPYnNlcnZhYmxlLW9mLU9ic2VydmFibGVzXG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIHdpbmRvd31cbiAqIEBzZWUge0BsaW5rIHdpbmRvd0NvdW50fVxuICogQHNlZSB7QGxpbmsgd2luZG93VGltZX1cbiAqIEBzZWUge0BsaW5rIHdpbmRvd1RvZ2dsZX1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlcldoZW59XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbigpOiBPYnNlcnZhYmxlfSBjbG9zaW5nU2VsZWN0b3IgQSBmdW5jdGlvbiB0aGF0IHRha2VzIG5vXG4gKiBhcmd1bWVudHMgYW5kIHJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IHNpZ25hbHMgKG9uIGVpdGhlciBgbmV4dGAgb3JcbiAqIGBjb21wbGV0ZWApIHdoZW4gdG8gY2xvc2UgdGhlIHByZXZpb3VzIHdpbmRvdyBhbmQgc3RhcnQgYSBuZXcgb25lLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFQ+Pn0gQW4gb2JzZXJ2YWJsZSBvZiB3aW5kb3dzLCB3aGljaCBpbiB0dXJuXG4gKiBhcmUgT2JzZXJ2YWJsZXMuXG4gKiBAbWV0aG9kIHdpbmRvd1doZW5cbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIHdpbmRvd1doZW4oY2xvc2luZ1NlbGVjdG9yKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLndpbmRvd1doZW4oY2xvc2luZ1NlbGVjdG9yKSh0aGlzKTtcbn1cbmV4cG9ydHMud2luZG93V2hlbiA9IHdpbmRvd1doZW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD13aW5kb3dXaGVuLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGZpcnN0XzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvZmlyc3RcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmlyc3QgPSBmaXJzdF8xLmZpcnN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zmlyc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBBbGxvd3Mgc291cmNlIE9ic2VydmFibGUgdG8gYmUgc3Vic2NyaWJlZCBvbmx5IG9uY2Ugd2l0aCBhIFN1YmplY3Qgb2YgY2hvaWNlLFxuICogd2hpbGUgc3RpbGwgc2hhcmluZyBpdHMgdmFsdWVzIGJldHdlZW4gbXVsdGlwbGUgc3Vic2NyaWJlcnMuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPlN1YnNjcmliZSB0byBPYnNlcnZhYmxlIG9uY2UsIGJ1dCBzZW5kIGl0cyB2YWx1ZXMgdG8gbXVsdGlwbGUgc3Vic2NyaWJlcnMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvbXVsdGljYXN0LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBtdWx0aWNhc3RgIGlzIGFuIG9wZXJhdG9yIHRoYXQgd29ya3MgaW4gdHdvIG1vZGVzLlxuICpcbiAqIEluIHRoZSBmaXJzdCBtb2RlIHlvdSBwcm92aWRlIGEgc2luZ2xlIGFyZ3VtZW50IHRvIGl0LCB3aGljaCBjYW4gYmUgZWl0aGVyIGFuIGluaXRpYWxpemVkIFN1YmplY3Qgb3IgYSBTdWJqZWN0XG4gKiBmYWN0b3J5LiBBcyBhIHJlc3VsdCB5b3Ugd2lsbCBnZXQgYSBzcGVjaWFsIGtpbmQgb2YgYW4gT2JzZXJ2YWJsZSAtIGEge0BsaW5rIENvbm5lY3RhYmxlT2JzZXJ2YWJsZX0uIEl0IGNhbiBiZVxuICogc3Vic2NyaWJlZCBtdWx0aXBsZSB0aW1lcywganVzdCBhcyByZWd1bGFyIE9ic2VydmFibGUsIGJ1dCBpdCB3b24ndCBzdWJzY3JpYmUgdG8gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGF0IHRoYXRcbiAqIG1vbWVudC4gSXQgd2lsbCBkbyBpdCBvbmx5IGlmIHlvdSBjYWxsIGl0cyBgY29ubmVjdGAgbWV0aG9kLiBUaGlzIG1lYW5zIHlvdSBjYW4gZXNzZW50aWFsbHkgY29udHJvbCBieSBoYW5kLCB3aGVuXG4gKiBzb3VyY2UgT2JzZXJ2YWJsZSB3aWxsIGJlIGFjdHVhbGx5IHN1YnNjcmliZWQuIFdoYXQgaXMgbW9yZSwgQ29ubmVjdGFibGVPYnNlcnZhYmxlIHdpbGwgc2hhcmUgdGhpcyBvbmUgc3Vic2NyaXB0aW9uXG4gKiBiZXR3ZWVuIGFsbCBvZiBpdHMgc3Vic2NyaWJlcnMuIFRoaXMgbWVhbnMgdGhhdCwgZm9yIGV4YW1wbGUsIGBhamF4YCBPYnNlcnZhYmxlIHdpbGwgb25seSBzZW5kIGEgcmVxdWVzdCBvbmNlLFxuICogZXZlbiB0aG91Z2ggdXN1YWxseSBpdCB3b3VsZCBzZW5kIGEgcmVxdWVzdCBwZXIgZXZlcnkgc3Vic2NyaWJlci4gU2luY2UgaXQgc2VuZHMgYSByZXF1ZXN0IGF0IHRoZSBtb21lbnQgb2ZcbiAqIHN1YnNjcmlwdGlvbiwgaGVyZSByZXF1ZXN0IHdvdWxkIGJlIHNlbnQgd2hlbiB0aGUgYGNvbm5lY3RgIG1ldGhvZCBvZiBhIENvbm5lY3RhYmxlT2JzZXJ2YWJsZSBpcyBjYWxsZWQuXG4gKlxuICogVGhlIG1vc3QgY29tbW9uIHBhdHRlcm4gb2YgdXNpbmcgQ29ubmVjdGFibGVPYnNlcnZhYmxlIGlzIGNhbGxpbmcgYGNvbm5lY3RgIHdoZW4gdGhlIGZpcnN0IGNvbnN1bWVyIHN1YnNjcmliZXMsXG4gKiBrZWVwaW5nIHRoZSBzdWJzY3JpcHRpb24gYWxpdmUgd2hpbGUgc2V2ZXJhbCBjb25zdW1lcnMgY29tZSBhbmQgZ28gYW5kIGZpbmFsbHkgdW5zdWJzY3JpYmluZyBmcm9tIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUsIHdoZW4gdGhlIGxhc3QgY29uc3VtZXIgdW5zdWJzY3JpYmVzLiBUbyBub3QgaW1wbGVtZW50IHRoYXQgbG9naWMgb3ZlciBhbmQgb3ZlciBhZ2FpbixcbiAqIENvbm5lY3RhYmxlT2JzZXJ2YWJsZSBoYXMgYSBzcGVjaWFsIG9wZXJhdG9yLCBgcmVmQ291bnRgLiBXaGVuIGNhbGxlZCwgaXQgcmV0dXJucyBhbiBPYnNlcnZhYmxlLCB3aGljaCB3aWxsIGNvdW50XG4gKiB0aGUgbnVtYmVyIG9mIGNvbnN1bWVycyBzdWJzY3JpYmVkIHRvIGl0IGFuZCBrZWVwIENvbm5lY3RhYmxlT2JzZXJ2YWJsZSBjb25uZWN0ZWQgYXMgbG9uZyBhcyB0aGVyZSBpcyBhdCBsZWFzdFxuICogb25lIGNvbnN1bWVyLiBTbyBpZiB5b3UgZG9uJ3QgYWN0dWFsbHkgbmVlZCB0byBkZWNpZGUgeW91cnNlbGYgd2hlbiB0byBjb25uZWN0IGFuZCBkaXNjb25uZWN0IGFcbiAqIENvbm5lY3RhYmxlT2JzZXJ2YWJsZSwgdXNlIGByZWZDb3VudGAuXG4gKlxuICogVGhlIHNlY29uZCBtb2RlIGlzIGludm9rZWQgYnkgY2FsbGluZyBgbXVsdGljYXN0YCB3aXRoIGFuIGFkZGl0aW9uYWwsIHNlY29uZCBhcmd1bWVudCAtIHNlbGVjdG9yIGZ1bmN0aW9uLlxuICogVGhpcyBmdW5jdGlvbiBhY2NlcHRzIGFuIE9ic2VydmFibGUgLSB3aGljaCBiYXNpY2FsbHkgbWlycm9ycyB0aGUgc291cmNlIE9ic2VydmFibGUgLSBhbmQgcmV0dXJucyBPYnNlcnZhYmxlXG4gKiBhcyB3ZWxsLCB3aGljaCBzaG91bGQgYmUgdGhlIGlucHV0IHN0cmVhbSBtb2RpZmllZCBieSBhbnkgb3BlcmF0b3JzIHlvdSB3YW50LiBOb3RlIHRoYXQgaW4gdGhpc1xuICogbW9kZSB5b3UgY2Fubm90IHByb3ZpZGUgaW5pdGlhbGl6ZWQgU3ViamVjdCBhcyBhIGZpcnN0IGFyZ3VtZW50IC0gaXQgaGFzIHRvIGJlIGEgU3ViamVjdCBmYWN0b3J5LiBJZlxuICogeW91IHByb3ZpZGUgc2VsZWN0b3IgZnVuY3Rpb24sIGBtdWx0aWNhc3RgIHJldHVybnMganVzdCBhIHJlZ3VsYXIgT2JzZXJ2YWJsZSwgaW5zdGVhZCBvZiBDb25uZWN0YWJsZU9ic2VydmFibGUuXG4gKiBUaHVzLCBhcyB1c3VhbCwgZWFjaCBzdWJzY3JpcHRpb24gdG8gdGhpcyBzdHJlYW0gdHJpZ2dlcnMgc3Vic2NyaXB0aW9uIHRvIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gSG93ZXZlcixcbiAqIGlmIGluc2lkZSB0aGUgc2VsZWN0b3IgZnVuY3Rpb24geW91IHN1YnNjcmliZSB0byB0aGUgaW5wdXQgT2JzZXJ2YWJsZSBtdWx0aXBsZSB0aW1lcywgYWN0dWFsIHNvdXJjZSBzdHJlYW1cbiAqIHdpbGwgYmUgc3Vic2NyaWJlZCBvbmx5IG9uY2UuIFNvIGlmIHlvdSBoYXZlIGEgY2hhaW4gb2Ygb3BlcmF0b3JzIHRoYXQgdXNlIHNvbWUgT2JzZXJ2YWJsZSBtYW55IHRpbWVzLFxuICogYnV0IHlvdSB3YW50IHRvIHN1YnNjcmliZSB0byB0aGF0IE9ic2VydmFibGUgb25seSBvbmNlLCB0aGlzIGlzIHRoZSBtb2RlIHlvdSB3b3VsZCB1c2UuXG4gKlxuICogU3ViamVjdCBwcm92aWRlZCBhcyBhIGZpcnN0IHBhcmFtZXRlciBvZiBgbXVsdGljYXN0YCBpcyB1c2VkIGFzIGEgcHJveHkgZm9yIHRoZSBzaW5nbGUgc3Vic2NyaXB0aW9uIHRvIHRoZVxuICogc291cmNlIE9ic2VydmFibGUuIEl0IG1lYW5zIHRoYXQgYWxsIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2Ugc3RyZWFtIGdvIHRocm91Z2ggdGhhdCBTdWJqZWN0LiBUaHVzLCBpZiBhIFN1YmplY3RcbiAqIGhhcyBzb21lIHNwZWNpYWwgcHJvcGVydGllcywgT2JzZXJ2YWJsZSByZXR1cm5lZCBieSBgbXVsdGljYXN0YCB3aWxsIGhhdmUgdGhlbSBhcyB3ZWxsLiBJZiB5b3Ugd2FudCB0byB1c2VcbiAqIGBtdWx0aWNhc3RgIHdpdGggYSBTdWJqZWN0IHRoYXQgaXMgb25lIG9mIHRoZSBvbmVzIGluY2x1ZGVkIGluIFJ4SlMgYnkgZGVmYXVsdCAtIHtAbGluayBTdWJqZWN0fSxcbiAqIHtAbGluayBBc3luY1N1YmplY3R9LCB7QGxpbmsgQmVoYXZpb3JTdWJqZWN0fSwgb3Ige0BsaW5rIFJlcGxheVN1YmplY3R9IC0gc2ltcGx5IHVzZSB7QGxpbmsgcHVibGlzaH0sXG4gKiB7QGxpbmsgcHVibGlzaExhc3R9LCB7QGxpbmsgcHVibGlzaEJlaGF2aW9yfSBvciB7QGxpbmsgcHVibGlzaFJlcGxheX0gcmVzcGVjdGl2ZWx5LiBUaGVzZSBhcmUgYWN0dWFsbHlcbiAqIGp1c3Qgd3JhcHBlcnMgYXJvdW5kIGBtdWx0aWNhc3RgLCB3aXRoIGEgc3BlY2lmaWMgU3ViamVjdCBoYXJkY29kZWQgaW5zaWRlLlxuICpcbiAqIEFsc28sIGlmIHlvdSB1c2Uge0BsaW5rIHB1Ymxpc2h9IG9yIHtAbGluayBwdWJsaXNoUmVwbGF5fSB3aXRoIGEgQ29ubmVjdGFibGVPYnNlcnZhYmxlcyBgcmVmQ291bnRgIG9wZXJhdG9yLFxuICogeW91IGNhbiBzaW1wbHkgdXNlIHtAbGluayBzaGFyZX0gYW5kIHtAbGluayBzaGFyZVJlcGxheX0gcmVzcGVjdGl2ZWx5LCB3aGljaCBjaGFpbiB0aGVzZSB0d28uXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+VXNlIENvbm5lY3RhYmxlT2JzZXJ2YWJsZTwvY2FwdGlvbj5cbiAqIGNvbnN0IHNlY29uZHMgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICogY29uc3QgY29ubmVjdGFibGVTZWNvbmRzID0gc2Vjb25kcy5tdWx0aWNhc3QobmV3IFN1YmplY3QoKSk7XG4gKlxuICogY29ubmVjdGFibGVTZWNvbmRzLnN1YnNjcmliZSh2YWx1ZSA9PiBjb25zb2xlLmxvZygnZmlyc3Q6ICcgKyB2YWx1ZSkpO1xuICogY29ubmVjdGFibGVTZWNvbmRzLnN1YnNjcmliZSh2YWx1ZSA9PiBjb25zb2xlLmxvZygnc2Vjb25kOiAnICsgdmFsdWUpKTtcbiAqXG4gKiAvLyBBdCB0aGlzIHBvaW50IHN0aWxsIG5vdGhpbmcgaGFwcGVucywgZXZlbiB0aG91Z2ggd2Ugc3Vic2NyaWJlZCB0d2ljZS5cbiAqXG4gKiBjb25uZWN0YWJsZVNlY29uZHMuY29ubmVjdCgpO1xuICpcbiAqIC8vIEZyb20gbm93IG9uIGBzZWNvbmRzYCBhcmUgYmVpbmcgbG9nZ2VkIHRvIHRoZSBjb25zb2xlLFxuICogLy8gdHdpY2UgcGVyIGV2ZXJ5IHNlY29uZC4gYHNlY29uZHNgIE9ic2VydmFibGUgd2FzIGhvd2V2ZXIgb25seSBzdWJzY3JpYmVkIG9uY2UsXG4gKiAvLyBzbyB1bmRlciB0aGUgaG9vZCBPYnNlcnZhYmxlLmludGVydmFsIGhhZCBvbmx5IG9uZSBjbG9jayBzdGFydGVkLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlVzZSBzZWxlY3RvcjwvY2FwdGlvbj5cbiAqIGNvbnN0IHNlY29uZHMgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICpcbiAqIHNlY29uZHNcbiAqICAgICAubXVsdGljYXN0KFxuICogICAgICAgICAoKSA9PiBuZXcgU3ViamVjdCgpLFxuICogICAgICAgICBzZWNvbmRzID0+IHNlY29uZHMuemlwKHNlY29uZHMpIC8vIFVzdWFsbHkgemlwIHdvdWxkIHN1YnNjcmliZSB0byBgc2Vjb25kc2AgdHdpY2UuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQmVjYXVzZSB3ZSBhcmUgaW5zaWRlIHNlbGVjdG9yLCBgc2Vjb25kc2AgaXMgc3Vic2NyaWJlZCBvbmNlLFxuICogICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRodXMgc3RhcnRpbmcgb25seSBvbmUgY2xvY2sgdXNlZCBpbnRlcm5hbGx5IGJ5IE9ic2VydmFibGUuaW50ZXJ2YWwuXG4gKiAgICAgLnN1YnNjcmliZSgpO1xuICpcbiAqIEBzZWUge0BsaW5rIHB1Ymxpc2h9XG4gKiBAc2VlIHtAbGluayBwdWJsaXNoTGFzdH1cbiAqIEBzZWUge0BsaW5rIHB1Ymxpc2hCZWhhdmlvcn1cbiAqIEBzZWUge0BsaW5rIHB1Ymxpc2hSZXBsYXl9XG4gKiBAc2VlIHtAbGluayBzaGFyZX1cbiAqIEBzZWUge0BsaW5rIHNoYXJlUmVwbGF5fVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb258U3ViamVjdH0gc3ViamVjdE9yU3ViamVjdEZhY3RvcnkgLSBGYWN0b3J5IGZ1bmN0aW9uIHRvIGNyZWF0ZSBhbiBpbnRlcm1lZGlhdGUgU3ViamVjdCB0aHJvdWdoXG4gKiB3aGljaCB0aGUgc291cmNlIHNlcXVlbmNlJ3MgZWxlbWVudHMgd2lsbCBiZSBtdWx0aWNhc3QgdG8gdGhlIHNlbGVjdG9yIGZ1bmN0aW9uIGlucHV0IE9ic2VydmFibGUgb3JcbiAqIENvbm5lY3RhYmxlT2JzZXJ2YWJsZSByZXR1cm5lZCBieSB0aGUgb3BlcmF0b3IuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbc2VsZWN0b3JdIC0gT3B0aW9uYWwgc2VsZWN0b3IgZnVuY3Rpb24gdGhhdCBjYW4gdXNlIHRoZSBpbnB1dCBzdHJlYW1cbiAqIGFzIG1hbnkgdGltZXMgYXMgbmVlZGVkLCB3aXRob3V0IGNhdXNpbmcgbXVsdGlwbGUgc3Vic2NyaXB0aW9ucyB0byB0aGUgc291cmNlIHN0cmVhbS5cbiAqIFN1YnNjcmliZXJzIHRvIHRoZSBpbnB1dCBzb3VyY2Ugd2lsbCByZWNlaXZlIGFsbCBub3RpZmljYXRpb25zIG9mIHRoZSBzb3VyY2UgZnJvbSB0aGVcbiAqIHRpbWUgb2YgdGhlIHN1YnNjcmlwdGlvbiBmb3J3YXJkLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPnxDb25uZWN0YWJsZU9ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgcmVzdWx0cyBvZiBpbnZva2luZyB0aGUgc2VsZWN0b3JcbiAqIG9uIHRoZSBzb3VyY2Ugc3RyZWFtIG9yIGEgc3BlY2lhbCB7QGxpbmsgQ29ubmVjdGFibGVPYnNlcnZhYmxlfSwgaWYgc2VsZWN0b3Igd2FzIG5vdCBwcm92aWRlZC5cbiAqXG4gKiBAbWV0aG9kIG11bHRpY2FzdFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gbXVsdGljYXN0KHN1YmplY3RPclN1YmplY3RGYWN0b3J5LCBzZWxlY3Rvcikge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5tdWx0aWNhc3Qoc3ViamVjdE9yU3ViamVjdEZhY3RvcnksIHNlbGVjdG9yKSh0aGlzKTtcbn1cbmV4cG9ydHMubXVsdGljYXN0ID0gbXVsdGljYXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bXVsdGljYXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBFbWl0cyBvbmx5IHRoZSBmaXJzdCBgY291bnRgIHZhbHVlcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+VGFrZXMgdGhlIGZpcnN0IGBjb3VudGAgdmFsdWVzIGZyb20gdGhlIHNvdXJjZSwgdGhlblxuICogY29tcGxldGVzLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3Rha2UucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYHRha2VgIHJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIG9ubHkgdGhlIGZpcnN0IGBjb3VudGAgdmFsdWVzIGVtaXR0ZWRcbiAqIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gSWYgdGhlIHNvdXJjZSBlbWl0cyBmZXdlciB0aGFuIGBjb3VudGAgdmFsdWVzIHRoZW5cbiAqIGFsbCBvZiBpdHMgdmFsdWVzIGFyZSBlbWl0dGVkLiBBZnRlciB0aGF0LCBpdCBjb21wbGV0ZXMsIHJlZ2FyZGxlc3MgaWYgdGhlXG4gKiBzb3VyY2UgY29tcGxldGVzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlRha2UgdGhlIGZpcnN0IDUgc2Vjb25kcyBvZiBhbiBpbmZpbml0ZSAxLXNlY29uZCBpbnRlcnZhbCBPYnNlcnZhYmxlPC9jYXB0aW9uPlxuICogdmFyIGludGVydmFsID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKTtcbiAqIHZhciBmaXZlID0gaW50ZXJ2YWwudGFrZSg1KTtcbiAqIGZpdmUuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIHRha2VMYXN0fVxuICogQHNlZSB7QGxpbmsgdGFrZVVudGlsfVxuICogQHNlZSB7QGxpbmsgdGFrZVdoaWxlfVxuICogQHNlZSB7QGxpbmsgc2tpcH1cbiAqXG4gKiBAdGhyb3dzIHtBcmd1bWVudE91dE9mUmFuZ2VFcnJvcn0gV2hlbiB1c2luZyBgdGFrZShpKWAsIGl0IGRlbGl2ZXJzIGFuXG4gKiBBcmd1bWVudE91dE9yUmFuZ2VFcnJvciB0byB0aGUgT2JzZXJ2ZXIncyBgZXJyb3JgIGNhbGxiYWNrIGlmIGBpIDwgMGAuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGNvdW50IFRoZSBtYXhpbXVtIG51bWJlciBvZiBgbmV4dGAgdmFsdWVzIHRvIGVtaXQuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgb25seSB0aGUgZmlyc3QgYGNvdW50YFxuICogdmFsdWVzIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCBvciBhbGwgb2YgdGhlIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2VcbiAqIGlmIHRoZSBzb3VyY2UgZW1pdHMgZmV3ZXIgdGhhbiBgY291bnRgIHZhbHVlcy5cbiAqIEBtZXRob2QgdGFrZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gdGFrZShjb3VudCkge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS50YWtlKGNvdW50KSh0aGlzKTtcbn1cbmV4cG9ydHMudGFrZSA9IHRha2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10YWtlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBBcHBsaWVzIGEgZ2l2ZW4gYHByb2plY3RgIGZ1bmN0aW9uIHRvIGVhY2ggdmFsdWUgZW1pdHRlZCBieSB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLCBhbmQgZW1pdHMgdGhlIHJlc3VsdGluZyB2YWx1ZXMgYXMgYW4gT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+TGlrZSBbQXJyYXkucHJvdG90eXBlLm1hcCgpXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9tYXApLFxuICogaXQgcGFzc2VzIGVhY2ggc291cmNlIHZhbHVlIHRocm91Z2ggYSB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbiB0byBnZXRcbiAqIGNvcnJlc3BvbmRpbmcgb3V0cHV0IHZhbHVlcy48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9tYXAucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogU2ltaWxhciB0byB0aGUgd2VsbCBrbm93biBgQXJyYXkucHJvdG90eXBlLm1hcGAgZnVuY3Rpb24sIHRoaXMgb3BlcmF0b3JcbiAqIGFwcGxpZXMgYSBwcm9qZWN0aW9uIHRvIGVhY2ggdmFsdWUgYW5kIGVtaXRzIHRoYXQgcHJvamVjdGlvbiBpbiB0aGUgb3V0cHV0XG4gKiBPYnNlcnZhYmxlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk1hcCBldmVyeSBjbGljayB0byB0aGUgY2xpZW50WCBwb3NpdGlvbiBvZiB0aGF0IGNsaWNrPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBwb3NpdGlvbnMgPSBjbGlja3MubWFwKGV2ID0+IGV2LmNsaWVudFgpO1xuICogcG9zaXRpb25zLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBtYXBUb31cbiAqIEBzZWUge0BsaW5rIHBsdWNrfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGluZGV4OiBudW1iZXIpOiBSfSBwcm9qZWN0IFRoZSBmdW5jdGlvbiB0byBhcHBseVxuICogdG8gZWFjaCBgdmFsdWVgIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiBUaGUgYGluZGV4YCBwYXJhbWV0ZXIgaXNcbiAqIHRoZSBudW1iZXIgYGlgIGZvciB0aGUgaS10aCBlbWlzc2lvbiB0aGF0IGhhcyBoYXBwZW5lZCBzaW5jZSB0aGVcbiAqIHN1YnNjcmlwdGlvbiwgc3RhcnRpbmcgZnJvbSB0aGUgbnVtYmVyIGAwYC5cbiAqIEBwYXJhbSB7YW55fSBbdGhpc0FyZ10gQW4gb3B0aW9uYWwgYXJndW1lbnQgdG8gZGVmaW5lIHdoYXQgYHRoaXNgIGlzIGluIHRoZVxuICogYHByb2plY3RgIGZ1bmN0aW9uLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxSPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHRoZSB2YWx1ZXMgZnJvbSB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlIHRyYW5zZm9ybWVkIGJ5IHRoZSBnaXZlbiBgcHJvamVjdGAgZnVuY3Rpb24uXG4gKiBAbWV0aG9kIG1hcFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gbWFwKHByb2plY3QsIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEubWFwKHByb2plY3QsIHRoaXNBcmcpKHRoaXMpO1xufVxuZXhwb3J0cy5tYXAgPSBtYXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgYnVmZmVyVG9nZ2xlXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvYnVmZmVyVG9nZ2xlXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLmJ1ZmZlclRvZ2dsZSA9IGJ1ZmZlclRvZ2dsZV8xLmJ1ZmZlclRvZ2dsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ1ZmZlclRvZ2dsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBwdWJsaXNoXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvcHVibGlzaFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5wdWJsaXNoID0gcHVibGlzaF8xLnB1Ymxpc2g7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wdWJsaXNoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKlxuICogRXJyb3JzIGlmIE9ic2VydmFibGUgZG9lcyBub3QgZW1pdCBhIHZhbHVlIGluIGdpdmVuIHRpbWUgc3Bhbi5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+VGltZW91dHMgb24gT2JzZXJ2YWJsZSB0aGF0IGRvZXNuJ3QgZW1pdCB2YWx1ZXMgZmFzdCBlbm91Z2guPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvdGltZW91dC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgdGltZW91dGAgb3BlcmF0b3IgYWNjZXB0cyBhcyBhbiBhcmd1bWVudCBlaXRoZXIgYSBudW1iZXIgb3IgYSBEYXRlLlxuICpcbiAqIElmIG51bWJlciB3YXMgcHJvdmlkZWQsIGl0IHJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGJlaGF2ZXMgbGlrZSBhIHNvdXJjZVxuICogT2JzZXJ2YWJsZSwgdW5sZXNzIHRoZXJlIGlzIGEgcGVyaW9kIG9mIHRpbWUgd2hlcmUgdGhlcmUgaXMgbm8gdmFsdWUgZW1pdHRlZC5cbiAqIFNvIGlmIHlvdSBwcm92aWRlIGAxMDBgIGFzIGFyZ3VtZW50IGFuZCBmaXJzdCB2YWx1ZSBjb21lcyBhZnRlciA1MG1zIGZyb21cbiAqIHRoZSBtb21lbnQgb2Ygc3Vic2NyaXB0aW9uLCB0aGlzIHZhbHVlIHdpbGwgYmUgc2ltcGx5IHJlLWVtaXR0ZWQgYnkgdGhlIHJlc3VsdGluZ1xuICogT2JzZXJ2YWJsZS4gSWYgaG93ZXZlciBhZnRlciB0aGF0IDEwMG1zIHBhc3NlcyB3aXRob3V0IGEgc2Vjb25kIHZhbHVlIGJlaW5nIGVtaXR0ZWQsXG4gKiBzdHJlYW0gd2lsbCBlbmQgd2l0aCBhbiBlcnJvciBhbmQgc291cmNlIE9ic2VydmFibGUgd2lsbCBiZSB1bnN1YnNjcmliZWQuXG4gKiBUaGVzZSBjaGVja3MgYXJlIHBlcmZvcm1lZCB0aHJvdWdob3V0IHdob2xlIGxpZmVjeWNsZSBvZiBPYnNlcnZhYmxlIC0gZnJvbSB0aGUgbW9tZW50XG4gKiBpdCB3YXMgc3Vic2NyaWJlZCB0bywgdW50aWwgaXQgY29tcGxldGVzIG9yIGVycm9ycyBpdHNlbGYuIFRodXMgZXZlcnkgdmFsdWUgbXVzdCBiZVxuICogZW1pdHRlZCB3aXRoaW4gc3BlY2lmaWVkIHBlcmlvZCBzaW5jZSBwcmV2aW91cyB2YWx1ZS5cbiAqXG4gKiBJZiBwcm92aWRlZCBhcmd1bWVudCB3YXMgRGF0ZSwgcmV0dXJuZWQgT2JzZXJ2YWJsZSBiZWhhdmVzIGRpZmZlcmVudGx5LiBJdCB0aHJvd3NcbiAqIGlmIE9ic2VydmFibGUgZGlkIG5vdCBjb21wbGV0ZSBiZWZvcmUgcHJvdmlkZWQgRGF0ZS4gVGhpcyBtZWFucyB0aGF0IHBlcmlvZHMgYmV0d2VlblxuICogZW1pc3Npb24gb2YgcGFydGljdWxhciB2YWx1ZXMgZG8gbm90IG1hdHRlciBpbiB0aGlzIGNhc2UuIElmIE9ic2VydmFibGUgZGlkIG5vdCBjb21wbGV0ZVxuICogYmVmb3JlIHByb3ZpZGVkIERhdGUsIHNvdXJjZSBPYnNlcnZhYmxlIHdpbGwgYmUgdW5zdWJzY3JpYmVkLiBPdGhlciB0aGFuIHRoYXQsIHJlc3VsdGluZ1xuICogc3RyZWFtIGJlaGF2ZXMganVzdCBhcyBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqXG4gKiBgdGltZW91dGAgYWNjZXB0cyBhbHNvIGEgU2NoZWR1bGVyIGFzIGEgc2Vjb25kIHBhcmFtZXRlci4gSXQgaXMgdXNlZCB0byBzY2hlZHVsZSBtb21lbnQgKG9yIG1vbWVudHMpXG4gKiB3aGVuIHJldHVybmVkIE9ic2VydmFibGUgd2lsbCBjaGVjayBpZiBzb3VyY2Ugc3RyZWFtIGVtaXR0ZWQgdmFsdWUgb3IgY29tcGxldGVkLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNoZWNrIGlmIHRpY2tzIGFyZSBlbWl0dGVkIHdpdGhpbiBjZXJ0YWluIHRpbWVzcGFuPC9jYXB0aW9uPlxuICogY29uc3Qgc2Vjb25kcyA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCk7XG4gKlxuICogc2Vjb25kcy50aW1lb3V0KDExMDApIC8vIExldCdzIHVzZSBiaWdnZXIgdGltZXNwYW4gdG8gYmUgc2FmZSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAvLyBzaW5jZSBgaW50ZXJ2YWxgIG1pZ2h0IGZpcmUgYSBiaXQgbGF0ZXIgdGhlbiBzY2hlZHVsZWQuXG4gKiAuc3Vic2NyaWJlKFxuICogICAgIHZhbHVlID0+IGNvbnNvbGUubG9nKHZhbHVlKSwgLy8gV2lsbCBlbWl0IG51bWJlcnMganVzdCBhcyByZWd1bGFyIGBpbnRlcnZhbGAgd291bGQuXG4gKiAgICAgZXJyID0+IGNvbnNvbGUubG9nKGVycikgLy8gV2lsbCBuZXZlciBiZSBjYWxsZWQuXG4gKiApO1xuICpcbiAqIHNlY29uZHMudGltZW91dCg5MDApLnN1YnNjcmliZShcbiAqICAgICB2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSksIC8vIFdpbGwgbmV2ZXIgYmUgY2FsbGVkLlxuICogICAgIGVyciA9PiBjb25zb2xlLmxvZyhlcnIpIC8vIFdpbGwgZW1pdCBlcnJvciBiZWZvcmUgZXZlbiBmaXJzdCB2YWx1ZSBpcyBlbWl0dGVkLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbmNlIGl0IGRpZCBub3QgYXJyaXZlIHdpdGhpbiA5MDBtcyBwZXJpb2QuXG4gKiApO1xuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlVzZSBEYXRlIHRvIGNoZWNrIGlmIE9ic2VydmFibGUgY29tcGxldGVkPC9jYXB0aW9uPlxuICogY29uc3Qgc2Vjb25kcyA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCk7XG4gKlxuICogc2Vjb25kcy50aW1lb3V0KG5ldyBEYXRlKFwiRGVjZW1iZXIgMTcsIDIwMjAgMDM6MjQ6MDBcIikpXG4gKiAuc3Vic2NyaWJlKFxuICogICAgIHZhbHVlID0+IGNvbnNvbGUubG9nKHZhbHVlKSwgLy8gV2lsbCBlbWl0IHZhbHVlcyBhcyByZWd1bGFyIGBpbnRlcnZhbGAgd291bGRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVudGlsIERlY2VtYmVyIDE3LCAyMDIwIGF0IDAzOjI0OjAwLlxuICogICAgIGVyciA9PiBjb25zb2xlLmxvZyhlcnIpIC8vIE9uIERlY2VtYmVyIDE3LCAyMDIwIGF0IDAzOjI0OjAwIGl0IHdpbGwgZW1pdCBhbiBlcnJvcixcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzaW5jZSBPYnNlcnZhYmxlIGRpZCBub3QgY29tcGxldGUgYnkgdGhlbi5cbiAqICk7XG4gKlxuICogQHNlZSB7QGxpbmsgdGltZW91dFdpdGh9XG4gKlxuICogQHBhcmFtIHtudW1iZXJ8RGF0ZX0gZHVlIE51bWJlciBzcGVjaWZ5aW5nIHBlcmlvZCB3aXRoaW4gd2hpY2ggT2JzZXJ2YWJsZSBtdXN0IGVtaXQgdmFsdWVzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgRGF0ZSBzcGVjaWZ5aW5nIGJlZm9yZSB3aGVuIE9ic2VydmFibGUgc2hvdWxkIGNvbXBsZXRlXG4gKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcl0gU2NoZWR1bGVyIGNvbnRyb2xsaW5nIHdoZW4gdGltZW91dCBjaGVja3Mgb2NjdXIuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBPYnNlcnZhYmxlIHRoYXQgbWlycm9ycyBiZWhhdmlvdXIgb2Ygc291cmNlLCB1bmxlc3MgdGltZW91dCBjaGVja3MgZmFpbC5cbiAqIEBtZXRob2QgdGltZW91dFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gdGltZW91dChkdWUsIHNjaGVkdWxlcikge1xuICAgIGlmIChzY2hlZHVsZXIgPT09IHZvaWQgMCkgeyBzY2hlZHVsZXIgPSByeGpzXzEuYXN5bmNTY2hlZHVsZXI7IH1cbiAgICByZXR1cm4gb3BlcmF0b3JzXzEudGltZW91dChkdWUsIHNjaGVkdWxlcikodGhpcyk7XG59XG5leHBvcnRzLnRpbWVvdXQgPSB0aW1lb3V0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGltZW91dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG4vKipcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIG9ubHkgdGhlIGxhc3QgaXRlbSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEl0IG9wdGlvbmFsbHkgdGFrZXMgYSBwcmVkaWNhdGUgZnVuY3Rpb24gYXMgYSBwYXJhbWV0ZXIsIGluIHdoaWNoIGNhc2UsIHJhdGhlciB0aGFuIGVtaXR0aW5nXG4gKiB0aGUgbGFzdCBpdGVtIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCB0aGUgcmVzdWx0aW5nIE9ic2VydmFibGUgd2lsbCBlbWl0IHRoZSBsYXN0IGl0ZW1cbiAqIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRoYXQgc2F0aXNmaWVzIHRoZSBwcmVkaWNhdGUuXG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9sYXN0LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEB0aHJvd3Mge0VtcHR5RXJyb3J9IERlbGl2ZXJzIGFuIEVtcHR5RXJyb3IgdG8gdGhlIE9ic2VydmVyJ3MgYGVycm9yYFxuICogY2FsbGJhY2sgaWYgdGhlIE9ic2VydmFibGUgY29tcGxldGVzIGJlZm9yZSBhbnkgYG5leHRgIG5vdGlmaWNhdGlvbiB3YXMgc2VudC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtwcmVkaWNhdGVdIC0gVGhlIGNvbmRpdGlvbiBhbnkgc291cmNlIGVtaXR0ZWQgaXRlbSBoYXMgdG8gc2F0aXNmeS5cbiAqIEBwYXJhbSB7YW55fSBbZGVmYXVsdFZhbHVlXSAtIFRoZSBkZWZhdWx0IHZhbHVlIHRvIHVzZSBpZiB0aGUgcHJlZGljYXRlIGlzbid0XG4gKiBzYXRpc2ZpZWQsIG9yIG5vIHZhbHVlcyB3ZXJlIGVtaXR0ZWQgKGlmIG5vIHByZWRpY2F0ZSkuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgb25seSB0aGUgbGFzdCBpdGVtIHNhdGlzZnlpbmcgdGhlIGdpdmVuIGNvbmRpdGlvblxuICogZnJvbSB0aGUgc291cmNlLCBvciBhbiBOb1N1Y2hFbGVtZW50RXhjZXB0aW9uIGlmIG5vIHN1Y2ggaXRlbXMgYXJlIGVtaXR0ZWQuXG4gKiBAdGhyb3dzIC0gVGhyb3dzIGlmIG5vIGl0ZW1zIHRoYXQgbWF0Y2ggdGhlIHByZWRpY2F0ZSBhcmUgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIGxhc3RcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIGxhc3QoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBvcGVyYXRvcnNfMS5sYXN0LmFwcGx5KHZvaWQgMCwgYXJncykodGhpcyk7XG59XG5leHBvcnRzLmxhc3QgPSBsYXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGFzdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgc2tpcHMgaXRlbXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgdW50aWwgYSBzZWNvbmQgT2JzZXJ2YWJsZSBlbWl0cyBhbiBpdGVtLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvc2tpcFVudGlsLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZX0gbm90aWZpZXIgLSBUaGUgc2Vjb25kIE9ic2VydmFibGUgdGhhdCBoYXMgdG8gZW1pdCBhbiBpdGVtIGJlZm9yZSB0aGUgc291cmNlIE9ic2VydmFibGUncyBlbGVtZW50cyBiZWdpbiB0b1xuICogYmUgbWlycm9yZWQgYnkgdGhlIHJlc3VsdGluZyBPYnNlcnZhYmxlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IHNraXBzIGl0ZW1zIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHVudGlsIHRoZSBzZWNvbmQgT2JzZXJ2YWJsZSBlbWl0c1xuICogYW4gaXRlbSwgdGhlbiBlbWl0cyB0aGUgcmVtYWluaW5nIGl0ZW1zLlxuICogQG1ldGhvZCBza2lwVW50aWxcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIHNraXBVbnRpbChub3RpZmllcikge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5za2lwVW50aWwobm90aWZpZXIpKHRoaXMpO1xufVxuZXhwb3J0cy5za2lwVW50aWwgPSBza2lwVW50aWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1za2lwVW50aWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgd2luZG93VG9nZ2xlXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3Ivd2luZG93VG9nZ2xlXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLndpbmRvd1RvZ2dsZSA9IHdpbmRvd1RvZ2dsZV8xLndpbmRvd1RvZ2dsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdpbmRvd1RvZ2dsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogQHBhcmFtIHNjaGVkdWxlclxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUaW1lSW50ZXJ2YWw8YW55Pj58V2ViU29ja2V0U3ViamVjdDxUPnxPYnNlcnZhYmxlPFQ+fVxuICogQG1ldGhvZCB0aW1lSW50ZXJ2YWxcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIHRpbWVJbnRlcnZhbChzY2hlZHVsZXIpIHtcbiAgICBpZiAoc2NoZWR1bGVyID09PSB2b2lkIDApIHsgc2NoZWR1bGVyID0gcnhqc18xLmFzeW5jU2NoZWR1bGVyOyB9XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLnRpbWVJbnRlcnZhbChzY2hlZHVsZXIpKHRoaXMpO1xufVxuZXhwb3J0cy50aW1lSW50ZXJ2YWwgPSB0aW1lSW50ZXJ2YWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aW1lSW50ZXJ2YWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgcmFjZV8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3JhY2VcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUucmFjZSA9IHJhY2VfMS5yYWNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmFjZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogQHBhcmFtIHNjaGVkdWxlclxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUaW1lc3RhbXA8YW55Pj58V2ViU29ja2V0U3ViamVjdDxUPnxPYnNlcnZhYmxlPFQ+fVxuICogQG1ldGhvZCB0aW1lc3RhbXBcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIHRpbWVzdGFtcChzY2hlZHVsZXIpIHtcbiAgICBpZiAoc2NoZWR1bGVyID09PSB2b2lkIDApIHsgc2NoZWR1bGVyID0gcnhqc18xLmFzeW5jU2NoZWR1bGVyOyB9XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLnRpbWVzdGFtcChzY2hlZHVsZXIpKHRoaXMpO1xufVxuZXhwb3J0cy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aW1lc3RhbXAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBXaGVuIGFueSBvZiB0aGUgcHJvdmlkZWQgT2JzZXJ2YWJsZSBlbWl0cyBhbiBjb21wbGV0ZSBvciBlcnJvciBub3RpZmljYXRpb24sIGl0IGltbWVkaWF0ZWx5IHN1YnNjcmliZXMgdG8gdGhlIG5leHQgb25lXG4gKiB0aGF0IHdhcyBwYXNzZWQuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkV4ZWN1dGUgc2VyaWVzIG9mIE9ic2VydmFibGVzIG5vIG1hdHRlciB3aGF0LCBldmVuIGlmIGl0IG1lYW5zIHN3YWxsb3dpbmcgZXJyb3JzLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL29uRXJyb3JSZXN1bWVOZXh0LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBvbkVycm9yUmVzdW1lTmV4dGAgaXMgYW4gb3BlcmF0b3IgdGhhdCBhY2NlcHRzIGEgc2VyaWVzIG9mIE9ic2VydmFibGVzLCBwcm92aWRlZCBlaXRoZXIgZGlyZWN0bHkgYXNcbiAqIGFyZ3VtZW50cyBvciBhcyBhbiBhcnJheS4gSWYgbm8gc2luZ2xlIE9ic2VydmFibGUgaXMgcHJvdmlkZWQsIHJldHVybmVkIE9ic2VydmFibGUgd2lsbCBzaW1wbHkgYmVoYXZlIHRoZSBzYW1lXG4gKiBhcyB0aGUgc291cmNlLlxuICpcbiAqIGBvbkVycm9yUmVzdW1lTmV4dGAgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgc3RhcnRzIGJ5IHN1YnNjcmliaW5nIGFuZCByZS1lbWl0dGluZyB2YWx1ZXMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBXaGVuIGl0cyBzdHJlYW0gb2YgdmFsdWVzIGVuZHMgLSBubyBtYXR0ZXIgaWYgT2JzZXJ2YWJsZSBjb21wbGV0ZWQgb3IgZW1pdHRlZCBhbiBlcnJvciAtIGBvbkVycm9yUmVzdW1lTmV4dGBcbiAqIHdpbGwgc3Vic2NyaWJlIHRvIHRoZSBmaXJzdCBPYnNlcnZhYmxlIHRoYXQgd2FzIHBhc3NlZCBhcyBhbiBhcmd1bWVudCB0byB0aGUgbWV0aG9kLiBJdCB3aWxsIHN0YXJ0IHJlLWVtaXR0aW5nXG4gKiBpdHMgdmFsdWVzIGFzIHdlbGwgYW5kIC0gYWdhaW4gLSB3aGVuIHRoYXQgc3RyZWFtIGVuZHMsIGBvbkVycm9yUmVzdW1lTmV4dGAgd2lsbCBwcm9jZWVkIHRvIHN1YnNjcmliaW5nIHlldCBhbm90aGVyXG4gKiBPYnNlcnZhYmxlIGluIHByb3ZpZGVkIHNlcmllcywgbm8gbWF0dGVyIGlmIHByZXZpb3VzIE9ic2VydmFibGUgY29tcGxldGVkIG9yIGVuZGVkIHdpdGggYW4gZXJyb3IuIFRoaXMgd2lsbFxuICogYmUgaGFwcGVuaW5nIHVudGlsIHRoZXJlIGlzIG5vIG1vcmUgT2JzZXJ2YWJsZXMgbGVmdCBpbiB0aGUgc2VyaWVzLCBhdCB3aGljaCBwb2ludCByZXR1cm5lZCBPYnNlcnZhYmxlIHdpbGxcbiAqIGNvbXBsZXRlIC0gZXZlbiBpZiB0aGUgbGFzdCBzdWJzY3JpYmVkIHN0cmVhbSBlbmRlZCB3aXRoIGFuIGVycm9yLlxuICpcbiAqIGBvbkVycm9yUmVzdW1lTmV4dGAgY2FuIGJlIHRoZXJlZm9yZSB0aG91Z2h0IG9mIGFzIHZlcnNpb24gb2Yge0BsaW5rIGNvbmNhdH0gb3BlcmF0b3IsIHdoaWNoIGlzIG1vcmUgcGVybWlzc2l2ZVxuICogd2hlbiBpdCBjb21lcyB0byB0aGUgZXJyb3JzIGVtaXR0ZWQgYnkgaXRzIGlucHV0IE9ic2VydmFibGVzLiBXaGlsZSBgY29uY2F0YCBzdWJzY3JpYmVzIHRvIHRoZSBuZXh0IE9ic2VydmFibGVcbiAqIGluIHNlcmllcyBvbmx5IGlmIHByZXZpb3VzIG9uZSBzdWNjZXNzZnVsbHkgY29tcGxldGVkLCBgb25FcnJvclJlc3VtZU5leHRgIHN1YnNjcmliZXMgZXZlbiBpZiBpdCBlbmRlZCB3aXRoXG4gKiBhbiBlcnJvci5cbiAqXG4gKiBOb3RlIHRoYXQgeW91IGRvIG5vdCBnZXQgYW55IGFjY2VzcyB0byBlcnJvcnMgZW1pdHRlZCBieSB0aGUgT2JzZXJ2YWJsZXMuIEluIHBhcnRpY3VsYXIgZG8gbm90XG4gKiBleHBlY3QgdGhlc2UgZXJyb3JzIHRvIGFwcGVhciBpbiBlcnJvciBjYWxsYmFjayBwYXNzZWQgdG8ge0BsaW5rIHN1YnNjcmliZX0uIElmIHlvdSB3YW50IHRvIHRha2VcbiAqIHNwZWNpZmljIGFjdGlvbnMgYmFzZWQgb24gd2hhdCBlcnJvciB3YXMgZW1pdHRlZCBieSBhbiBPYnNlcnZhYmxlLCB5b3Ugc2hvdWxkIHRyeSBvdXQge0BsaW5rIGNhdGNofSBpbnN0ZWFkLlxuICpcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5TdWJzY3JpYmUgdG8gdGhlIG5leHQgT2JzZXJ2YWJsZSBhZnRlciBtYXAgZmFpbHM8L2NhcHRpb24+XG4gKiBSeC5PYnNlcnZhYmxlLm9mKDEsIDIsIDMsIDApXG4gKiAgIC5tYXAoeCA9PiB7XG4gKiAgICAgICBpZiAoeCA9PT0gMCkgeyB0aHJvdyBFcnJvcigpOyB9XG4gICAgICAgICByZXR1cm4gMTAgLyB4O1xuICogICB9KVxuICogICAub25FcnJvclJlc3VtZU5leHQoUnguT2JzZXJ2YWJsZS5vZigxLCAyLCAzKSlcbiAqICAgLnN1YnNjcmliZShcbiAqICAgICB2YWwgPT4gY29uc29sZS5sb2codmFsKSxcbiAqICAgICBlcnIgPT4gY29uc29sZS5sb2coZXJyKSwgICAgICAgICAgLy8gV2lsbCBuZXZlciBiZSBjYWxsZWQuXG4gKiAgICAgKCkgPT4gY29uc29sZS5sb2coJ3RoYXRcXCdzIGl0IScpXG4gKiAgICk7XG4gKlxuICogLy8gTG9nczpcbiAqIC8vIDEwXG4gKiAvLyA1XG4gKiAvLyAzLjMzMzMzMzMzMzMzMzMzMzVcbiAqIC8vIDFcbiAqIC8vIDJcbiAqIC8vIDNcbiAqIC8vIFwidGhhdCdzIGl0IVwiXG4gKlxuICogQHNlZSB7QGxpbmsgY29uY2F0fVxuICogQHNlZSB7QGxpbmsgY2F0Y2h9XG4gKlxuICogQHBhcmFtIHsuLi5PYnNlcnZhYmxlSW5wdXR9IG9ic2VydmFibGVzIE9ic2VydmFibGVzIHBhc3NlZCBlaXRoZXIgZGlyZWN0bHkgb3IgYXMgYW4gYXJyYXkuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdmFsdWVzIGZyb20gc291cmNlIE9ic2VydmFibGUsIGJ1dCAtIGlmIGl0IGVycm9ycyAtIHN1YnNjcmliZXNcbiAqIHRvIHRoZSBuZXh0IHBhc3NlZCBPYnNlcnZhYmxlIGFuZCBzbyBvbiwgdW50aWwgaXQgY29tcGxldGVzIG9yIHJ1bnMgb3V0IG9mIE9ic2VydmFibGVzLlxuICogQG1ldGhvZCBvbkVycm9yUmVzdW1lTmV4dFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gb25FcnJvclJlc3VtZU5leHQoKSB7XG4gICAgdmFyIG5leHRTb3VyY2VzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgbmV4dFNvdXJjZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLm9uRXJyb3JSZXN1bWVOZXh0LmFwcGx5KHZvaWQgMCwgbmV4dFNvdXJjZXMpKHRoaXMpO1xufVxuZXhwb3J0cy5vbkVycm9yUmVzdW1lTmV4dCA9IG9uRXJyb3JSZXN1bWVOZXh0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b25FcnJvclJlc3VtZU5leHQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIERlbGF5cyB0aGUgZW1pc3Npb24gb2YgaXRlbXMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgYnkgYSBnaXZlbiB0aW1lb3V0IG9yXG4gKiB1bnRpbCBhIGdpdmVuIERhdGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPlRpbWUgc2hpZnRzIGVhY2ggaXRlbSBieSBzb21lIHNwZWNpZmllZCBhbW91bnQgb2ZcbiAqIG1pbGxpc2Vjb25kcy48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9kZWxheS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBJZiB0aGUgZGVsYXkgYXJndW1lbnQgaXMgYSBOdW1iZXIsIHRoaXMgb3BlcmF0b3IgdGltZSBzaGlmdHMgdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSBieSB0aGF0IGFtb3VudCBvZiB0aW1lIGV4cHJlc3NlZCBpbiBtaWxsaXNlY29uZHMuIFRoZSByZWxhdGl2ZVxuICogdGltZSBpbnRlcnZhbHMgYmV0d2VlbiB0aGUgdmFsdWVzIGFyZSBwcmVzZXJ2ZWQuXG4gKlxuICogSWYgdGhlIGRlbGF5IGFyZ3VtZW50IGlzIGEgRGF0ZSwgdGhpcyBvcGVyYXRvciB0aW1lIHNoaWZ0cyB0aGUgc3RhcnQgb2YgdGhlXG4gKiBPYnNlcnZhYmxlIGV4ZWN1dGlvbiB1bnRpbCB0aGUgZ2l2ZW4gZGF0ZSBvY2N1cnMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RGVsYXkgZWFjaCBjbGljayBieSBvbmUgc2Vjb25kPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBkZWxheWVkQ2xpY2tzID0gY2xpY2tzLmRlbGF5KDEwMDApOyAvLyBlYWNoIGNsaWNrIGVtaXR0ZWQgYWZ0ZXIgMSBzZWNvbmRcbiAqIGRlbGF5ZWRDbGlja3Muc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkRlbGF5IGFsbCBjbGlja3MgdW50aWwgYSBmdXR1cmUgZGF0ZSBoYXBwZW5zPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBkYXRlID0gbmV3IERhdGUoJ01hcmNoIDE1LCAyMDUwIDEyOjAwOjAwJyk7IC8vIGluIHRoZSBmdXR1cmVcbiAqIHZhciBkZWxheWVkQ2xpY2tzID0gY2xpY2tzLmRlbGF5KGRhdGUpOyAvLyBjbGljayBlbWl0dGVkIG9ubHkgYWZ0ZXIgdGhhdCBkYXRlXG4gKiBkZWxheWVkQ2xpY2tzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBkZWJvdW5jZVRpbWV9XG4gKiBAc2VlIHtAbGluayBkZWxheVdoZW59XG4gKlxuICogQHBhcmFtIHtudW1iZXJ8RGF0ZX0gZGVsYXkgVGhlIGRlbGF5IGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcyAoYSBgbnVtYmVyYCkgb3JcbiAqIGEgYERhdGVgIHVudGlsIHdoaWNoIHRoZSBlbWlzc2lvbiBvZiB0aGUgc291cmNlIGl0ZW1zIGlzIGRlbGF5ZWQuXG4gKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcj1hc3luY1NjaGVkdWxlcl0gVGhlIFNjaGVkdWxlckxpa2UgdG8gdXNlIGZvclxuICogbWFuYWdpbmcgdGhlIHRpbWVycyB0aGF0IGhhbmRsZSB0aGUgdGltZS1zaGlmdCBmb3IgZWFjaCBpdGVtLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGRlbGF5cyB0aGUgZW1pc3Npb25zIG9mIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgYnkgdGhlIHNwZWNpZmllZCB0aW1lb3V0IG9yIERhdGUuXG4gKiBAbWV0aG9kIGRlbGF5XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBkZWxheShkZWxheSwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKHNjaGVkdWxlciA9PT0gdm9pZCAwKSB7IHNjaGVkdWxlciA9IHJ4anNfMS5hc3luY1NjaGVkdWxlcjsgfVxuICAgIHJldHVybiBvcGVyYXRvcnNfMS5kZWxheShkZWxheSwgc2NoZWR1bGVyKSh0aGlzKTtcbn1cbmV4cG9ydHMuZGVsYXkgPSBkZWxheTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlbGF5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGFqYXhfMSA9IHJlcXVpcmUoXCJyeGpzL2FqYXhcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5hamF4ID0gYWpheF8xLmFqYXg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hamF4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xucnhqc18xLk9ic2VydmFibGUudGltZXIgPSByeGpzXzEudGltZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aW1lci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2hldGhlciBvciBub3QgZXZlcnkgaXRlbSBvZiB0aGUgc291cmNlIHNhdGlzZmllcyB0aGUgY29uZGl0aW9uIHNwZWNpZmllZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5BIHNpbXBsZSBleGFtcGxlIGVtaXR0aW5nIHRydWUgaWYgYWxsIGVsZW1lbnRzIGFyZSBsZXNzIHRoYW4gNSwgZmFsc2Ugb3RoZXJ3aXNlPC9jYXB0aW9uPlxuICogIE9ic2VydmFibGUub2YoMSwgMiwgMywgNCwgNSwgNilcbiAqICAgICAuZXZlcnkoeCA9PiB4IDwgNSlcbiAqICAgICAuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpOyAvLyAtPiBmYWxzZVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHByZWRpY2F0ZSBBIGZ1bmN0aW9uIGZvciBkZXRlcm1pbmluZyBpZiBhbiBpdGVtIG1lZXRzIGEgc3BlY2lmaWVkIGNvbmRpdGlvbi5cbiAqIEBwYXJhbSB7YW55fSBbdGhpc0FyZ10gT3B0aW9uYWwgb2JqZWN0IHRvIHVzZSBmb3IgYHRoaXNgIGluIHRoZSBjYWxsYmFjay5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgb2YgYm9vbGVhbnMgdGhhdCBkZXRlcm1pbmVzIGlmIGFsbCBpdGVtcyBvZiB0aGUgc291cmNlIE9ic2VydmFibGUgbWVldCB0aGUgY29uZGl0aW9uIHNwZWNpZmllZC5cbiAqIEBtZXRob2QgZXZlcnlcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIGV2ZXJ5KHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5ldmVyeShwcmVkaWNhdGUsIHRoaXNBcmcpKHRoaXMpO1xufVxuZXhwb3J0cy5ldmVyeSA9IGV2ZXJ5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXZlcnkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgbWVyZ2VfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9tZXJnZVwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5tZXJnZSA9IG1lcmdlXzEubWVyZ2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogQnVmZmVycyB0aGUgc291cmNlIE9ic2VydmFibGUgdmFsdWVzLCB1c2luZyBhIGZhY3RvcnkgZnVuY3Rpb24gb2YgY2xvc2luZ1xuICogT2JzZXJ2YWJsZXMgdG8gZGV0ZXJtaW5lIHdoZW4gdG8gY2xvc2UsIGVtaXQsIGFuZCByZXNldCB0aGUgYnVmZmVyLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5Db2xsZWN0cyB2YWx1ZXMgZnJvbSB0aGUgcGFzdCBhcyBhbiBhcnJheS4gV2hlbiBpdFxuICogc3RhcnRzIGNvbGxlY3RpbmcgdmFsdWVzLCBpdCBjYWxscyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXRcbiAqIHRlbGxzIHdoZW4gdG8gY2xvc2UgdGhlIGJ1ZmZlciBhbmQgcmVzdGFydCBjb2xsZWN0aW5nLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2J1ZmZlcldoZW4ucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogT3BlbnMgYSBidWZmZXIgaW1tZWRpYXRlbHksIHRoZW4gY2xvc2VzIHRoZSBidWZmZXIgd2hlbiB0aGUgb2JzZXJ2YWJsZVxuICogcmV0dXJuZWQgYnkgY2FsbGluZyBgY2xvc2luZ1NlbGVjdG9yYCBmdW5jdGlvbiBlbWl0cyBhIHZhbHVlLiBXaGVuIGl0IGNsb3Nlc1xuICogdGhlIGJ1ZmZlciwgaXQgaW1tZWRpYXRlbHkgb3BlbnMgYSBuZXcgYnVmZmVyIGFuZCByZXBlYXRzIHRoZSBwcm9jZXNzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXQgYW4gYXJyYXkgb2YgdGhlIGxhc3QgY2xpY2tzIGV2ZXJ5IFsxLTVdIHJhbmRvbSBzZWNvbmRzPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBidWZmZXJlZCA9IGNsaWNrcy5idWZmZXJXaGVuKCgpID0+XG4gKiAgIFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCArIE1hdGgucmFuZG9tKCkgKiA0MDAwKVxuICogKTtcbiAqIGJ1ZmZlcmVkLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBidWZmZXJ9XG4gKiBAc2VlIHtAbGluayBidWZmZXJDb3VudH1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlclRpbWV9XG4gKiBAc2VlIHtAbGluayBidWZmZXJUb2dnbGV9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dXaGVufVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogT2JzZXJ2YWJsZX0gY2xvc2luZ1NlbGVjdG9yIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBub1xuICogYXJndW1lbnRzIGFuZCByZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBzaWduYWxzIGJ1ZmZlciBjbG9zdXJlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUW10+fSBBbiBvYnNlcnZhYmxlIG9mIGFycmF5cyBvZiBidWZmZXJlZCB2YWx1ZXMuXG4gKiBAbWV0aG9kIGJ1ZmZlcldoZW5cbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIGJ1ZmZlcldoZW4oY2xvc2luZ1NlbGVjdG9yKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLmJ1ZmZlcldoZW4oY2xvc2luZ1NlbGVjdG9yKSh0aGlzKTtcbn1cbmV4cG9ydHMuYnVmZmVyV2hlbiA9IGJ1ZmZlcldoZW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idWZmZXJXaGVuLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBDb252ZXJ0cyBhIGhpZ2hlci1vcmRlciBPYnNlcnZhYmxlIGludG8gYSBmaXJzdC1vcmRlciBPYnNlcnZhYmxlIGJ5XG4gKiBjb25jYXRlbmF0aW5nIHRoZSBpbm5lciBPYnNlcnZhYmxlcyBpbiBvcmRlci5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+RmxhdHRlbnMgYW4gT2JzZXJ2YWJsZS1vZi1PYnNlcnZhYmxlcyBieSBwdXR0aW5nIG9uZVxuICogaW5uZXIgT2JzZXJ2YWJsZSBhZnRlciB0aGUgb3RoZXIuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvY29uY2F0QWxsLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEpvaW5zIGV2ZXJ5IE9ic2VydmFibGUgZW1pdHRlZCBieSB0aGUgc291cmNlIChhIGhpZ2hlci1vcmRlciBPYnNlcnZhYmxlKSwgaW5cbiAqIGEgc2VyaWFsIGZhc2hpb24uIEl0IHN1YnNjcmliZXMgdG8gZWFjaCBpbm5lciBPYnNlcnZhYmxlIG9ubHkgYWZ0ZXIgdGhlXG4gKiBwcmV2aW91cyBpbm5lciBPYnNlcnZhYmxlIGhhcyBjb21wbGV0ZWQsIGFuZCBtZXJnZXMgYWxsIG9mIHRoZWlyIHZhbHVlcyBpbnRvXG4gKiB0aGUgcmV0dXJuZWQgb2JzZXJ2YWJsZS5cbiAqXG4gKiBfX1dhcm5pbmc6X18gSWYgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGVtaXRzIE9ic2VydmFibGVzIHF1aWNrbHkgYW5kXG4gKiBlbmRsZXNzbHksIGFuZCB0aGUgaW5uZXIgT2JzZXJ2YWJsZXMgaXQgZW1pdHMgZ2VuZXJhbGx5IGNvbXBsZXRlIHNsb3dlciB0aGFuXG4gKiB0aGUgc291cmNlIGVtaXRzLCB5b3UgY2FuIHJ1biBpbnRvIG1lbW9yeSBpc3N1ZXMgYXMgdGhlIGluY29taW5nIE9ic2VydmFibGVzXG4gKiBjb2xsZWN0IGluIGFuIHVuYm91bmRlZCBidWZmZXIuXG4gKlxuICogTm90ZTogYGNvbmNhdEFsbGAgaXMgZXF1aXZhbGVudCB0byBgbWVyZ2VBbGxgIHdpdGggY29uY3VycmVuY3kgcGFyYW1ldGVyIHNldFxuICogdG8gYDFgLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkZvciBlYWNoIGNsaWNrIGV2ZW50LCB0aWNrIGV2ZXJ5IHNlY29uZCBmcm9tIDAgdG8gMywgd2l0aCBubyBjb25jdXJyZW5jeTwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgaGlnaGVyT3JkZXIgPSBjbGlja3MubWFwKGV2ID0+IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkudGFrZSg0KSk7XG4gKiB2YXIgZmlyc3RPcmRlciA9IGhpZ2hlck9yZGVyLmNvbmNhdEFsbCgpO1xuICogZmlyc3RPcmRlci5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogLy8gUmVzdWx0cyBpbiB0aGUgZm9sbG93aW5nOlxuICogLy8gKHJlc3VsdHMgYXJlIG5vdCBjb25jdXJyZW50KVxuICogLy8gRm9yIGV2ZXJ5IGNsaWNrIG9uIHRoZSBcImRvY3VtZW50XCIgaXQgd2lsbCBlbWl0IHZhbHVlcyAwIHRvIDMgc3BhY2VkXG4gKiAvLyBvbiBhIDEwMDBtcyBpbnRlcnZhbFxuICogLy8gb25lIGNsaWNrID0gMTAwMG1zLT4gMCAtMTAwMG1zLT4gMSAtMTAwMG1zLT4gMiAtMTAwMG1zLT4gM1xuICpcbiAqIEBzZWUge0BsaW5rIGNvbWJpbmVBbGx9XG4gKiBAc2VlIHtAbGluayBjb25jYXR9XG4gKiBAc2VlIHtAbGluayBjb25jYXRNYXB9XG4gKiBAc2VlIHtAbGluayBjb25jYXRNYXBUb31cbiAqIEBzZWUge0BsaW5rIGV4aGF1c3R9XG4gKiBAc2VlIHtAbGluayBtZXJnZUFsbH1cbiAqIEBzZWUge0BsaW5rIHN3aXRjaH1cbiAqIEBzZWUge0BsaW5rIHppcEFsbH1cbiAqXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIGVtaXR0aW5nIHZhbHVlcyBmcm9tIGFsbCB0aGUgaW5uZXJcbiAqIE9ic2VydmFibGVzIGNvbmNhdGVuYXRlZC5cbiAqIEBtZXRob2QgY29uY2F0QWxsXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBjb25jYXRBbGwoKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLmNvbmNhdEFsbCgpKHRoaXMpO1xufVxuZXhwb3J0cy5jb25jYXRBbGwgPSBjb25jYXRBbGw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25jYXRBbGwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgd2l0aExhdGVzdEZyb21fMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci93aXRoTGF0ZXN0RnJvbVwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS53aXRoTGF0ZXN0RnJvbSA9IHdpdGhMYXRlc3RGcm9tXzEud2l0aExhdGVzdEZyb207XG4vLyMgc291cmNlTWFwcGluZ1VSTD13aXRoTGF0ZXN0RnJvbS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogSWdub3JlcyBzb3VyY2UgdmFsdWVzIGZvciBhIGR1cmF0aW9uIGRldGVybWluZWQgYnkgYW5vdGhlciBPYnNlcnZhYmxlLCB0aGVuXG4gKiBlbWl0cyB0aGUgbW9zdCByZWNlbnQgdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUsIHRoZW4gcmVwZWF0cyB0aGlzXG4gKiBwcm9jZXNzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIGxpa2Uge0BsaW5rIGF1ZGl0VGltZX0sIGJ1dCB0aGUgc2lsZW5jaW5nXG4gKiBkdXJhdGlvbiBpcyBkZXRlcm1pbmVkIGJ5IGEgc2Vjb25kIE9ic2VydmFibGUuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvYXVkaXQucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYGF1ZGl0YCBpcyBzaW1pbGFyIHRvIGB0aHJvdHRsZWAsIGJ1dCBlbWl0cyB0aGUgbGFzdCB2YWx1ZSBmcm9tIHRoZSBzaWxlbmNlZFxuICogdGltZSB3aW5kb3csIGluc3RlYWQgb2YgdGhlIGZpcnN0IHZhbHVlLiBgYXVkaXRgIGVtaXRzIHRoZSBtb3N0IHJlY2VudCB2YWx1ZVxuICogZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlIGFzIHNvb24gYXMgaXRzIGludGVybmFsXG4gKiB0aW1lciBiZWNvbWVzIGRpc2FibGVkLCBhbmQgaWdub3JlcyBzb3VyY2UgdmFsdWVzIHdoaWxlIHRoZSB0aW1lciBpcyBlbmFibGVkLlxuICogSW5pdGlhbGx5LCB0aGUgdGltZXIgaXMgZGlzYWJsZWQuIEFzIHNvb24gYXMgdGhlIGZpcnN0IHNvdXJjZSB2YWx1ZSBhcnJpdmVzLFxuICogdGhlIHRpbWVyIGlzIGVuYWJsZWQgYnkgY2FsbGluZyB0aGUgYGR1cmF0aW9uU2VsZWN0b3JgIGZ1bmN0aW9uIHdpdGggdGhlXG4gKiBzb3VyY2UgdmFsdWUsIHdoaWNoIHJldHVybnMgdGhlIFwiZHVyYXRpb25cIiBPYnNlcnZhYmxlLiBXaGVuIHRoZSBkdXJhdGlvblxuICogT2JzZXJ2YWJsZSBlbWl0cyBhIHZhbHVlIG9yIGNvbXBsZXRlcywgdGhlIHRpbWVyIGlzIGRpc2FibGVkLCB0aGVuIHRoZSBtb3N0XG4gKiByZWNlbnQgc291cmNlIHZhbHVlIGlzIGVtaXR0ZWQgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlLCBhbmQgdGhpcyBwcm9jZXNzXG4gKiByZXBlYXRzIGZvciB0aGUgbmV4dCBzb3VyY2UgdmFsdWUuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCBjbGlja3MgYXQgYSByYXRlIG9mIGF0IG1vc3Qgb25lIGNsaWNrIHBlciBzZWNvbmQ8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy5hdWRpdChldiA9PiBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgYXVkaXRUaW1lfVxuICogQHNlZSB7QGxpbmsgZGVib3VuY2V9XG4gKiBAc2VlIHtAbGluayBkZWxheVdoZW59XG4gKiBAc2VlIHtAbGluayBzYW1wbGV9XG4gKiBAc2VlIHtAbGluayB0aHJvdHRsZX1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBUKTogU3Vic2NyaWJhYmxlT3JQcm9taXNlfSBkdXJhdGlvblNlbGVjdG9yIEEgZnVuY3Rpb25cbiAqIHRoYXQgcmVjZWl2ZXMgYSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgZm9yIGNvbXB1dGluZyB0aGUgc2lsZW5jaW5nXG4gKiBkdXJhdGlvbiwgcmV0dXJuZWQgYXMgYW4gT2JzZXJ2YWJsZSBvciBhIFByb21pc2UuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgcGVyZm9ybXMgcmF0ZS1saW1pdGluZyBvZlxuICogZW1pc3Npb25zIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQG1ldGhvZCBhdWRpdFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gYXVkaXQoZHVyYXRpb25TZWxlY3Rvcikge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5hdWRpdChkdXJhdGlvblNlbGVjdG9yKSh0aGlzKTtcbn1cbmV4cG9ydHMuYXVkaXQgPSBhdWRpdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1ZGl0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xucnhqc18xLk9ic2VydmFibGUudXNpbmcgPSByeGpzXzEudXNpbmc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2luZy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogQnVmZmVycyB0aGUgc291cmNlIE9ic2VydmFibGUgdmFsdWVzIHVudGlsIGBjbG9zaW5nTm90aWZpZXJgIGVtaXRzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5Db2xsZWN0cyB2YWx1ZXMgZnJvbSB0aGUgcGFzdCBhcyBhbiBhcnJheSwgYW5kIGVtaXRzXG4gKiB0aGF0IGFycmF5IG9ubHkgd2hlbiBhbm90aGVyIE9ic2VydmFibGUgZW1pdHMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvYnVmZmVyLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEJ1ZmZlcnMgdGhlIGluY29taW5nIE9ic2VydmFibGUgdmFsdWVzIHVudGlsIHRoZSBnaXZlbiBgY2xvc2luZ05vdGlmaWVyYFxuICogT2JzZXJ2YWJsZSBlbWl0cyBhIHZhbHVlLCBhdCB3aGljaCBwb2ludCBpdCBlbWl0cyB0aGUgYnVmZmVyIG9uIHRoZSBvdXRwdXRcbiAqIE9ic2VydmFibGUgYW5kIHN0YXJ0cyBhIG5ldyBidWZmZXIgaW50ZXJuYWxseSwgYXdhaXRpbmcgdGhlIG5leHQgdGltZVxuICogYGNsb3NpbmdOb3RpZmllcmAgZW1pdHMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+T24gZXZlcnkgY2xpY2ssIGVtaXQgYXJyYXkgb2YgbW9zdCByZWNlbnQgaW50ZXJ2YWwgZXZlbnRzPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBpbnRlcnZhbCA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCk7XG4gKiB2YXIgYnVmZmVyZWQgPSBpbnRlcnZhbC5idWZmZXIoY2xpY2tzKTtcbiAqIGJ1ZmZlcmVkLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBidWZmZXJDb3VudH1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlclRpbWV9XG4gKiBAc2VlIHtAbGluayBidWZmZXJUb2dnbGV9XG4gKiBAc2VlIHtAbGluayBidWZmZXJXaGVufVxuICogQHNlZSB7QGxpbmsgd2luZG93fVxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZTxhbnk+fSBjbG9zaW5nTm90aWZpZXIgQW4gT2JzZXJ2YWJsZSB0aGF0IHNpZ25hbHMgdGhlXG4gKiBidWZmZXIgdG8gYmUgZW1pdHRlZCBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFRbXT59IEFuIE9ic2VydmFibGUgb2YgYnVmZmVycywgd2hpY2ggYXJlIGFycmF5cyBvZlxuICogdmFsdWVzLlxuICogQG1ldGhvZCBidWZmZXJcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIGJ1ZmZlcihjbG9zaW5nTm90aWZpZXIpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEuYnVmZmVyKGNsb3NpbmdOb3RpZmllcikodGhpcyk7XG59XG5leHBvcnRzLmJ1ZmZlciA9IGJ1ZmZlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ1ZmZlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBhdWRpdF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL2F1ZGl0XCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLmF1ZGl0ID0gYXVkaXRfMS5hdWRpdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1ZGl0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBQcm9qZWN0cyBlYWNoIHNvdXJjZSB2YWx1ZSB0byB0aGUgc2FtZSBPYnNlcnZhYmxlIHdoaWNoIGlzIG1lcmdlZCBtdWx0aXBsZVxuICogdGltZXMgaW4gYSBzZXJpYWxpemVkIGZhc2hpb24gb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIGxpa2Uge0BsaW5rIGNvbmNhdE1hcH0sIGJ1dCBtYXBzIGVhY2ggdmFsdWVcbiAqIGFsd2F5cyB0byB0aGUgc2FtZSBpbm5lciBPYnNlcnZhYmxlLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2NvbmNhdE1hcFRvLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIE1hcHMgZWFjaCBzb3VyY2UgdmFsdWUgdG8gdGhlIGdpdmVuIE9ic2VydmFibGUgYGlubmVyT2JzZXJ2YWJsZWAgcmVnYXJkbGVzc1xuICogb2YgdGhlIHNvdXJjZSB2YWx1ZSwgYW5kIHRoZW4gZmxhdHRlbnMgdGhvc2UgcmVzdWx0aW5nIE9ic2VydmFibGVzIGludG8gb25lXG4gKiBzaW5nbGUgT2JzZXJ2YWJsZSwgd2hpY2ggaXMgdGhlIG91dHB1dCBPYnNlcnZhYmxlLiBFYWNoIG5ldyBgaW5uZXJPYnNlcnZhYmxlYFxuICogaW5zdGFuY2UgZW1pdHRlZCBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUgaXMgY29uY2F0ZW5hdGVkIHdpdGggdGhlIHByZXZpb3VzXG4gKiBgaW5uZXJPYnNlcnZhYmxlYCBpbnN0YW5jZS5cbiAqXG4gKiBfX1dhcm5pbmc6X18gaWYgc291cmNlIHZhbHVlcyBhcnJpdmUgZW5kbGVzc2x5IGFuZCBmYXN0ZXIgdGhhbiB0aGVpclxuICogY29ycmVzcG9uZGluZyBpbm5lciBPYnNlcnZhYmxlcyBjYW4gY29tcGxldGUsIGl0IHdpbGwgcmVzdWx0IGluIG1lbW9yeSBpc3N1ZXNcbiAqIGFzIGlubmVyIE9ic2VydmFibGVzIGFtYXNzIGluIGFuIHVuYm91bmRlZCBidWZmZXIgd2FpdGluZyBmb3IgdGhlaXIgdHVybiB0b1xuICogYmUgc3Vic2NyaWJlZCB0by5cbiAqXG4gKiBOb3RlOiBgY29uY2F0TWFwVG9gIGlzIGVxdWl2YWxlbnQgdG8gYG1lcmdlTWFwVG9gIHdpdGggY29uY3VycmVuY3kgcGFyYW1ldGVyXG4gKiBzZXQgdG8gYDFgLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkZvciBlYWNoIGNsaWNrIGV2ZW50LCB0aWNrIGV2ZXJ5IHNlY29uZCBmcm9tIDAgdG8gMywgd2l0aCBubyBjb25jdXJyZW5jeTwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLmNvbmNhdE1hcFRvKFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkudGFrZSg0KSk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIC8vIFJlc3VsdHMgaW4gdGhlIGZvbGxvd2luZzpcbiAqIC8vIChyZXN1bHRzIGFyZSBub3QgY29uY3VycmVudClcbiAqIC8vIEZvciBldmVyeSBjbGljayBvbiB0aGUgXCJkb2N1bWVudFwiIGl0IHdpbGwgZW1pdCB2YWx1ZXMgMCB0byAzIHNwYWNlZFxuICogLy8gb24gYSAxMDAwbXMgaW50ZXJ2YWxcbiAqIC8vIG9uZSBjbGljayA9IDEwMDBtcy0+IDAgLTEwMDBtcy0+IDEgLTEwMDBtcy0+IDIgLTEwMDBtcy0+IDNcbiAqXG4gKiBAc2VlIHtAbGluayBjb25jYXR9XG4gKiBAc2VlIHtAbGluayBjb25jYXRBbGx9XG4gKiBAc2VlIHtAbGluayBjb25jYXRNYXB9XG4gKiBAc2VlIHtAbGluayBtZXJnZU1hcFRvfVxuICogQHNlZSB7QGxpbmsgc3dpdGNoTWFwVG99XG4gKlxuICogQHBhcmFtIHtPYnNlcnZhYmxlSW5wdXR9IGlubmVyT2JzZXJ2YWJsZSBBbiBPYnNlcnZhYmxlIHRvIHJlcGxhY2UgZWFjaCB2YWx1ZSBmcm9tXG4gKiB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBvYnNlcnZhYmxlIG9mIHZhbHVlcyBtZXJnZWQgdG9nZXRoZXIgYnkgam9pbmluZyB0aGVcbiAqIHBhc3NlZCBvYnNlcnZhYmxlIHdpdGggaXRzZWxmLCBvbmUgYWZ0ZXIgdGhlIG90aGVyLCBmb3IgZWFjaCB2YWx1ZSBlbWl0dGVkXG4gKiBmcm9tIHRoZSBzb3VyY2UuXG4gKiBAbWV0aG9kIGNvbmNhdE1hcFRvXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBjb25jYXRNYXBUbyhpbm5lck9ic2VydmFibGUpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEuY29uY2F0TWFwVG8oaW5uZXJPYnNlcnZhYmxlKSh0aGlzKTtcbn1cbmV4cG9ydHMuY29uY2F0TWFwVG8gPSBjb25jYXRNYXBUbztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmNhdE1hcFRvLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIHJldHJ5V2hlbl8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3JldHJ5V2hlblwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5yZXRyeVdoZW4gPSByZXRyeVdoZW5fMS5yZXRyeVdoZW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXRyeVdoZW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBBcHBsaWVzIGFuIGFjY3VtdWxhdG9yIGZ1bmN0aW9uIG92ZXIgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCBhbmQgcmV0dXJucyBlYWNoXG4gKiBpbnRlcm1lZGlhdGUgcmVzdWx0LCB3aXRoIGFuIG9wdGlvbmFsIHNlZWQgdmFsdWUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkl0J3MgbGlrZSB7QGxpbmsgcmVkdWNlfSwgYnV0IGVtaXRzIHRoZSBjdXJyZW50XG4gKiBhY2N1bXVsYXRpb24gd2hlbmV2ZXIgdGhlIHNvdXJjZSBlbWl0cyBhIHZhbHVlLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3NjYW4ucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogQ29tYmluZXMgdG9nZXRoZXIgYWxsIHZhbHVlcyBlbWl0dGVkIG9uIHRoZSBzb3VyY2UsIHVzaW5nIGFuIGFjY3VtdWxhdG9yXG4gKiBmdW5jdGlvbiB0aGF0IGtub3dzIGhvdyB0byBqb2luIGEgbmV3IHNvdXJjZSB2YWx1ZSBpbnRvIHRoZSBhY2N1bXVsYXRpb24gZnJvbVxuICogdGhlIHBhc3QuIElzIHNpbWlsYXIgdG8ge0BsaW5rIHJlZHVjZX0sIGJ1dCBlbWl0cyB0aGUgaW50ZXJtZWRpYXRlXG4gKiBhY2N1bXVsYXRpb25zLlxuICpcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGFwcGxpZXMgYSBzcGVjaWZpZWQgYGFjY3VtdWxhdG9yYCBmdW5jdGlvbiB0byBlYWNoXG4gKiBpdGVtIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiBJZiBhIGBzZWVkYCB2YWx1ZSBpcyBzcGVjaWZpZWQsIHRoZW5cbiAqIHRoYXQgdmFsdWUgd2lsbCBiZSB1c2VkIGFzIHRoZSBpbml0aWFsIHZhbHVlIGZvciB0aGUgYWNjdW11bGF0b3IuIElmIG5vIHNlZWRcbiAqIHZhbHVlIGlzIHNwZWNpZmllZCwgdGhlIGZpcnN0IGl0ZW0gb2YgdGhlIHNvdXJjZSBpcyB1c2VkIGFzIHRoZSBzZWVkLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNvdW50IHRoZSBudW1iZXIgb2YgY2xpY2sgZXZlbnRzPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBvbmVzID0gY2xpY2tzLm1hcFRvKDEpO1xuICogdmFyIHNlZWQgPSAwO1xuICogdmFyIGNvdW50ID0gb25lcy5zY2FuKChhY2MsIG9uZSkgPT4gYWNjICsgb25lLCBzZWVkKTtcbiAqIGNvdW50LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBleHBhbmR9XG4gKiBAc2VlIHtAbGluayBtZXJnZVNjYW59XG4gKiBAc2VlIHtAbGluayByZWR1Y2V9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbihhY2M6IFIsIHZhbHVlOiBULCBpbmRleDogbnVtYmVyKTogUn0gYWNjdW11bGF0b3JcbiAqIFRoZSBhY2N1bXVsYXRvciBmdW5jdGlvbiBjYWxsZWQgb24gZWFjaCBzb3VyY2UgdmFsdWUuXG4gKiBAcGFyYW0ge1R8Un0gW3NlZWRdIFRoZSBpbml0aWFsIGFjY3VtdWxhdGlvbiB2YWx1ZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8Uj59IEFuIG9ic2VydmFibGUgb2YgdGhlIGFjY3VtdWxhdGVkIHZhbHVlcy5cbiAqIEBtZXRob2Qgc2NhblxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gc2NhbihhY2N1bXVsYXRvciwgc2VlZCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgcmV0dXJuIG9wZXJhdG9yc18xLnNjYW4oYWNjdW11bGF0b3IsIHNlZWQpKHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gb3BlcmF0b3JzXzEuc2NhbihhY2N1bXVsYXRvcikodGhpcyk7XG59XG5leHBvcnRzLnNjYW4gPSBzY2FuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2Nhbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBtZXJnZVNjYW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9tZXJnZVNjYW5cIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUubWVyZ2VTY2FuID0gbWVyZ2VTY2FuXzEubWVyZ2VTY2FuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVyZ2VTY2FuLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIHRpbWVvdXRfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci90aW1lb3V0XCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLnRpbWVvdXQgPSB0aW1lb3V0XzEudGltZW91dDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWVvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IHNraXBzIHRoZSBmaXJzdCBgY291bnRgIGl0ZW1zIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvc2tpcC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gY291bnQgLSBUaGUgbnVtYmVyIG9mIHRpbWVzLCBpdGVtcyBlbWl0dGVkIGJ5IHNvdXJjZSBPYnNlcnZhYmxlIHNob3VsZCBiZSBza2lwcGVkLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IHNraXBzIHZhbHVlcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqXG4gKiBAbWV0aG9kIHNraXBcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIHNraXAoY291bnQpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEuc2tpcChjb3VudCkodGhpcyk7XG59XG5leHBvcnRzLnNraXAgPSBza2lwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2tpcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG4vKipcbiAqIEBwYXJhbSBvYnNlcnZhYmxlc1xuICogQHJldHVybiB7T2JzZXJ2YWJsZTxSPn1cbiAqIEBtZXRob2QgemlwXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiB6aXBQcm90bygpIHtcbiAgICB2YXIgb2JzZXJ2YWJsZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBvYnNlcnZhYmxlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5saWZ0LmNhbGwocnhqc18xLnppcC5hcHBseSh2b2lkIDAsIFt0aGlzXS5jb25jYXQob2JzZXJ2YWJsZXMpKSk7XG59XG5leHBvcnRzLnppcFByb3RvID0gemlwUHJvdG87XG4vLyMgc291cmNlTWFwcGluZ1VSTD16aXAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5mcm9tID0gcnhqc18xLmZyb207XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mcm9tLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIG1pbl8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL21pblwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5taW4gPSBtaW5fMS5taW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1taW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgc3RhcnRXaXRoXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3Ivc3RhcnRXaXRoXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLnN0YXJ0V2l0aCA9IHN0YXJ0V2l0aF8xLnN0YXJ0V2l0aDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0YXJ0V2l0aC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogQ291bnRzIHRoZSBudW1iZXIgb2YgZW1pc3Npb25zIG9uIHRoZSBzb3VyY2UgYW5kIGVtaXRzIHRoYXQgbnVtYmVyIHdoZW4gdGhlXG4gKiBzb3VyY2UgY29tcGxldGVzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5UZWxscyBob3cgbWFueSB2YWx1ZXMgd2VyZSBlbWl0dGVkLCB3aGVuIHRoZSBzb3VyY2VcbiAqIGNvbXBsZXRlcy48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9jb3VudC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgY291bnRgIHRyYW5zZm9ybXMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHZhbHVlcyBpbnRvIGFuIE9ic2VydmFibGUgdGhhdFxuICogZW1pdHMgYSBzaW5nbGUgdmFsdWUgdGhhdCByZXByZXNlbnRzIHRoZSBudW1iZXIgb2YgdmFsdWVzIGVtaXR0ZWQgYnkgdGhlXG4gKiBzb3VyY2UgT2JzZXJ2YWJsZS4gSWYgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRlcm1pbmF0ZXMgd2l0aCBhbiBlcnJvciwgYGNvdW50YFxuICogd2lsbCBwYXNzIHRoaXMgZXJyb3Igbm90aWZpY2F0aW9uIGFsb25nIHdpdGhvdXQgZW1pdHRpbmcgYSB2YWx1ZSBmaXJzdC4gSWZcbiAqIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBkb2VzIG5vdCB0ZXJtaW5hdGUgYXQgYWxsLCBgY291bnRgIHdpbGwgbmVpdGhlciBlbWl0XG4gKiBhIHZhbHVlIG5vciB0ZXJtaW5hdGUuIFRoaXMgb3BlcmF0b3IgdGFrZXMgYW4gb3B0aW9uYWwgYHByZWRpY2F0ZWAgZnVuY3Rpb25cbiAqIGFzIGFyZ3VtZW50LCBpbiB3aGljaCBjYXNlIHRoZSBvdXRwdXQgZW1pc3Npb24gd2lsbCByZXByZXNlbnQgdGhlIG51bWJlciBvZlxuICogc291cmNlIHZhbHVlcyB0aGF0IG1hdGNoZWQgYHRydWVgIHdpdGggdGhlIGBwcmVkaWNhdGVgLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNvdW50cyBob3cgbWFueSBzZWNvbmRzIGhhdmUgcGFzc2VkIGJlZm9yZSB0aGUgZmlyc3QgY2xpY2sgaGFwcGVuZWQ8L2NhcHRpb24+XG4gKiB2YXIgc2Vjb25kcyA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCk7XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHNlY29uZHNCZWZvcmVDbGljayA9IHNlY29uZHMudGFrZVVudGlsKGNsaWNrcyk7XG4gKiB2YXIgcmVzdWx0ID0gc2Vjb25kc0JlZm9yZUNsaWNrLmNvdW50KCk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNvdW50cyBob3cgbWFueSBvZGQgbnVtYmVycyBhcmUgdGhlcmUgYmV0d2VlbiAxIGFuZCA3PC9jYXB0aW9uPlxuICogdmFyIG51bWJlcnMgPSBSeC5PYnNlcnZhYmxlLnJhbmdlKDEsIDcpO1xuICogdmFyIHJlc3VsdCA9IG51bWJlcnMuY291bnQoaSA9PiBpICUgMiA9PT0gMSk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIC8vIFJlc3VsdHMgaW46XG4gKiAvLyA0XG4gKlxuICogQHNlZSB7QGxpbmsgbWF4fVxuICogQHNlZSB7QGxpbmsgbWlufVxuICogQHNlZSB7QGxpbmsgcmVkdWNlfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGk6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KTogYm9vbGVhbn0gW3ByZWRpY2F0ZV0gQVxuICogYm9vbGVhbiBmdW5jdGlvbiB0byBzZWxlY3Qgd2hhdCB2YWx1ZXMgYXJlIHRvIGJlIGNvdW50ZWQuIEl0IGlzIHByb3ZpZGVkIHdpdGhcbiAqIGFyZ3VtZW50cyBvZjpcbiAqIC0gYHZhbHVlYDogdGhlIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogLSBgaW5kZXhgOiB0aGUgKHplcm8tYmFzZWQpIFwiaW5kZXhcIiBvZiB0aGUgdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiAtIGBzb3VyY2VgOiB0aGUgc291cmNlIE9ic2VydmFibGUgaW5zdGFuY2UgaXRzZWxmLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSBvZiBvbmUgbnVtYmVyIHRoYXQgcmVwcmVzZW50cyB0aGUgY291bnQgYXNcbiAqIGRlc2NyaWJlZCBhYm92ZS5cbiAqIEBtZXRob2QgY291bnRcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIGNvdW50KHByZWRpY2F0ZSkge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5jb3VudChwcmVkaWNhdGUpKHRoaXMpO1xufVxuZXhwb3J0cy5jb3VudCA9IGNvdW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y291bnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgYnVmZmVyVGltZV8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL2J1ZmZlclRpbWVcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUuYnVmZmVyVGltZSA9IGJ1ZmZlclRpbWVfMS5idWZmZXJUaW1lO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnVmZmVyVGltZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBmaWx0ZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9maWx0ZXJcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmlsdGVyID0gZmlsdGVyXzEuZmlsdGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsdGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBQcm9qZWN0cyBlYWNoIHNvdXJjZSB2YWx1ZSB0byBhbiBPYnNlcnZhYmxlIHdoaWNoIGlzIG1lcmdlZCBpbiB0aGUgb3V0cHV0XG4gKiBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5NYXBzIGVhY2ggdmFsdWUgdG8gYW4gT2JzZXJ2YWJsZSwgdGhlbiBmbGF0dGVucyBhbGwgb2ZcbiAqIHRoZXNlIGlubmVyIE9ic2VydmFibGVzIHVzaW5nIHtAbGluayBtZXJnZUFsbH0uPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvbWVyZ2VNYXAucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgaXRlbXMgYmFzZWQgb24gYXBwbHlpbmcgYSBmdW5jdGlvbiB0aGF0IHlvdVxuICogc3VwcGx5IHRvIGVhY2ggaXRlbSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgd2hlcmUgdGhhdCBmdW5jdGlvblxuICogcmV0dXJucyBhbiBPYnNlcnZhYmxlLCBhbmQgdGhlbiBtZXJnaW5nIHRob3NlIHJlc3VsdGluZyBPYnNlcnZhYmxlcyBhbmRcbiAqIGVtaXR0aW5nIHRoZSByZXN1bHRzIG9mIHRoaXMgbWVyZ2VyLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk1hcCBhbmQgZmxhdHRlbiBlYWNoIGxldHRlciB0byBhbiBPYnNlcnZhYmxlIHRpY2tpbmcgZXZlcnkgMSBzZWNvbmQ8L2NhcHRpb24+XG4gKiB2YXIgbGV0dGVycyA9IFJ4Lk9ic2VydmFibGUub2YoJ2EnLCAnYicsICdjJyk7XG4gKiB2YXIgcmVzdWx0ID0gbGV0dGVycy5tZXJnZU1hcCh4ID0+XG4gKiAgIFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkubWFwKGkgPT4geCtpKVxuICogKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogLy8gUmVzdWx0cyBpbiB0aGUgZm9sbG93aW5nOlxuICogLy8gYTBcbiAqIC8vIGIwXG4gKiAvLyBjMFxuICogLy8gYTFcbiAqIC8vIGIxXG4gKiAvLyBjMVxuICogLy8gY29udGludWVzIHRvIGxpc3QgYSxiLGMgd2l0aCByZXNwZWN0aXZlIGFzY2VuZGluZyBpbnRlZ2Vyc1xuICpcbiAqIEBzZWUge0BsaW5rIGNvbmNhdE1hcH1cbiAqIEBzZWUge0BsaW5rIGV4aGF1c3RNYXB9XG4gKiBAc2VlIHtAbGluayBtZXJnZX1cbiAqIEBzZWUge0BsaW5rIG1lcmdlQWxsfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VNYXBUb31cbiAqIEBzZWUge0BsaW5rIG1lcmdlU2Nhbn1cbiAqIEBzZWUge0BsaW5rIHN3aXRjaE1hcH1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCA/aW5kZXg6IG51bWJlcik6IE9ic2VydmFibGVJbnB1dH0gcHJvamVjdCBBIGZ1bmN0aW9uXG4gKiB0aGF0LCB3aGVuIGFwcGxpZWQgdG8gYW4gaXRlbSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgcmV0dXJucyBhblxuICogT2JzZXJ2YWJsZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbY29uY3VycmVudD1OdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFldIE1heGltdW0gbnVtYmVyIG9mIGlucHV0XG4gKiBPYnNlcnZhYmxlcyBiZWluZyBzdWJzY3JpYmVkIHRvIGNvbmN1cnJlbnRseS5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgcmVzdWx0IG9mIGFwcGx5aW5nIHRoZVxuICogcHJvamVjdGlvbiBmdW5jdGlvbiAoYW5kIHRoZSBvcHRpb25hbCBgcmVzdWx0U2VsZWN0b3JgKSB0byBlYWNoIGl0ZW0gZW1pdHRlZFxuICogYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGFuZCBtZXJnaW5nIHRoZSByZXN1bHRzIG9mIHRoZSBPYnNlcnZhYmxlcyBvYnRhaW5lZFxuICogZnJvbSB0aGlzIHRyYW5zZm9ybWF0aW9uLlxuICogQG1ldGhvZCBtZXJnZU1hcFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gbWVyZ2VNYXAocHJvamVjdCwgY29uY3VycmVudCkge1xuICAgIGlmIChjb25jdXJyZW50ID09PSB2b2lkIDApIHsgY29uY3VycmVudCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTsgfVxuICAgIHJldHVybiBvcGVyYXRvcnNfMS5tZXJnZU1hcChwcm9qZWN0LCBjb25jdXJyZW50KSh0aGlzKTtcbn1cbmV4cG9ydHMubWVyZ2VNYXAgPSBtZXJnZU1hcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlTWFwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBCdWZmZXJzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB2YWx1ZXMgdW50aWwgdGhlIHNpemUgaGl0cyB0aGUgbWF4aW11bVxuICogYGJ1ZmZlclNpemVgIGdpdmVuLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5Db2xsZWN0cyB2YWx1ZXMgZnJvbSB0aGUgcGFzdCBhcyBhbiBhcnJheSwgYW5kIGVtaXRzXG4gKiB0aGF0IGFycmF5IG9ubHkgd2hlbiBpdHMgc2l6ZSByZWFjaGVzIGBidWZmZXJTaXplYC48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9idWZmZXJDb3VudC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBCdWZmZXJzIGEgbnVtYmVyIG9mIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBieSBgYnVmZmVyU2l6ZWAgdGhlblxuICogZW1pdHMgdGhlIGJ1ZmZlciBhbmQgY2xlYXJzIGl0LCBhbmQgc3RhcnRzIGEgbmV3IGJ1ZmZlciBlYWNoXG4gKiBgc3RhcnRCdWZmZXJFdmVyeWAgdmFsdWVzLiBJZiBgc3RhcnRCdWZmZXJFdmVyeWAgaXMgbm90IHByb3ZpZGVkIG9yIGlzXG4gKiBgbnVsbGAsIHRoZW4gbmV3IGJ1ZmZlcnMgYXJlIHN0YXJ0ZWQgaW1tZWRpYXRlbHkgYXQgdGhlIHN0YXJ0IG9mIHRoZSBzb3VyY2VcbiAqIGFuZCB3aGVuIGVhY2ggYnVmZmVyIGNsb3NlcyBhbmQgaXMgZW1pdHRlZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IHRoZSBsYXN0IHR3byBjbGljayBldmVudHMgYXMgYW4gYXJyYXk8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIGJ1ZmZlcmVkID0gY2xpY2tzLmJ1ZmZlckNvdW50KDIpO1xuICogYnVmZmVyZWQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk9uIGV2ZXJ5IGNsaWNrLCBlbWl0IHRoZSBsYXN0IHR3byBjbGljayBldmVudHMgYXMgYW4gYXJyYXk8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIGJ1ZmZlcmVkID0gY2xpY2tzLmJ1ZmZlckNvdW50KDIsIDEpO1xuICogYnVmZmVyZWQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGJ1ZmZlcn1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlclRpbWV9XG4gKiBAc2VlIHtAbGluayBidWZmZXJUb2dnbGV9XG4gKiBAc2VlIHtAbGluayBidWZmZXJXaGVufVxuICogQHNlZSB7QGxpbmsgcGFpcndpc2V9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dDb3VudH1cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gYnVmZmVyU2l6ZSBUaGUgbWF4aW11bSBzaXplIG9mIHRoZSBidWZmZXIgZW1pdHRlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnRCdWZmZXJFdmVyeV0gSW50ZXJ2YWwgYXQgd2hpY2ggdG8gc3RhcnQgYSBuZXcgYnVmZmVyLlxuICogRm9yIGV4YW1wbGUgaWYgYHN0YXJ0QnVmZmVyRXZlcnlgIGlzIGAyYCwgdGhlbiBhIG5ldyBidWZmZXIgd2lsbCBiZSBzdGFydGVkXG4gKiBvbiBldmVyeSBvdGhlciB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UuIEEgbmV3IGJ1ZmZlciBpcyBzdGFydGVkIGF0IHRoZVxuICogYmVnaW5uaW5nIG9mIHRoZSBzb3VyY2UgYnkgZGVmYXVsdC5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VFtdPn0gQW4gT2JzZXJ2YWJsZSBvZiBhcnJheXMgb2YgYnVmZmVyZWQgdmFsdWVzLlxuICogQG1ldGhvZCBidWZmZXJDb3VudFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gYnVmZmVyQ291bnQoYnVmZmVyU2l6ZSwgc3RhcnRCdWZmZXJFdmVyeSkge1xuICAgIGlmIChzdGFydEJ1ZmZlckV2ZXJ5ID09PSB2b2lkIDApIHsgc3RhcnRCdWZmZXJFdmVyeSA9IG51bGw7IH1cbiAgICByZXR1cm4gb3BlcmF0b3JzXzEuYnVmZmVyQ291bnQoYnVmZmVyU2l6ZSwgc3RhcnRCdWZmZXJFdmVyeSkodGhpcyk7XG59XG5leHBvcnRzLmJ1ZmZlckNvdW50ID0gYnVmZmVyQ291bnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idWZmZXJDb3VudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBpbnRlcm5hbF9jb21wYXRpYmlsaXR5XzEgPSByZXF1aXJlKFwicnhqcy9pbnRlcm5hbC1jb21wYXRpYmlsaXR5XCIpO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuZnVuY3Rpb24gd2luZG93VGltZSh3aW5kb3dUaW1lU3Bhbikge1xuICAgIHZhciBzY2hlZHVsZXIgPSByeGpzXzEuYXN5bmNTY2hlZHVsZXI7XG4gICAgdmFyIHdpbmRvd0NyZWF0aW9uSW50ZXJ2YWwgPSBudWxsO1xuICAgIHZhciBtYXhXaW5kb3dTaXplID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgIGlmIChpbnRlcm5hbF9jb21wYXRpYmlsaXR5XzEuaXNTY2hlZHVsZXIoYXJndW1lbnRzWzNdKSkge1xuICAgICAgICBzY2hlZHVsZXIgPSBhcmd1bWVudHNbM107XG4gICAgfVxuICAgIGlmIChpbnRlcm5hbF9jb21wYXRpYmlsaXR5XzEuaXNTY2hlZHVsZXIoYXJndW1lbnRzWzJdKSkge1xuICAgICAgICBzY2hlZHVsZXIgPSBhcmd1bWVudHNbMl07XG4gICAgfVxuICAgIGVsc2UgaWYgKGludGVybmFsX2NvbXBhdGliaWxpdHlfMS5pc051bWVyaWMoYXJndW1lbnRzWzJdKSkge1xuICAgICAgICBtYXhXaW5kb3dTaXplID0gYXJndW1lbnRzWzJdO1xuICAgIH1cbiAgICBpZiAoaW50ZXJuYWxfY29tcGF0aWJpbGl0eV8xLmlzU2NoZWR1bGVyKGFyZ3VtZW50c1sxXSkpIHtcbiAgICAgICAgc2NoZWR1bGVyID0gYXJndW1lbnRzWzFdO1xuICAgIH1cbiAgICBlbHNlIGlmIChpbnRlcm5hbF9jb21wYXRpYmlsaXR5XzEuaXNOdW1lcmljKGFyZ3VtZW50c1sxXSkpIHtcbiAgICAgICAgd2luZG93Q3JlYXRpb25JbnRlcnZhbCA9IGFyZ3VtZW50c1sxXTtcbiAgICB9XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLndpbmRvd1RpbWUod2luZG93VGltZVNwYW4sIHdpbmRvd0NyZWF0aW9uSW50ZXJ2YWwsIG1heFdpbmRvd1NpemUsIHNjaGVkdWxlcikodGhpcyk7XG59XG5leHBvcnRzLndpbmRvd1RpbWUgPSB3aW5kb3dUaW1lO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2luZG93VGltZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBleGhhdXN0XzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvZXhoYXVzdFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5leGhhdXN0ID0gZXhoYXVzdF8xLmV4aGF1c3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGhhdXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIHBsdWNrXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvcGx1Y2tcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUucGx1Y2sgPSBwbHVja18xLnBsdWNrO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGx1Y2suanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBSZXR1cm5zIGEgQ29ubmVjdGFibGVPYnNlcnZhYmxlLCB3aGljaCBpcyBhIHZhcmlldHkgb2YgT2JzZXJ2YWJsZSB0aGF0IHdhaXRzIHVudGlsIGl0cyBjb25uZWN0IG1ldGhvZCBpcyBjYWxsZWRcbiAqIGJlZm9yZSBpdCBiZWdpbnMgZW1pdHRpbmcgaXRlbXMgdG8gdGhvc2UgT2JzZXJ2ZXJzIHRoYXQgaGF2ZSBzdWJzY3JpYmVkIHRvIGl0LlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvcHVibGlzaC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbc2VsZWN0b3JdIC0gT3B0aW9uYWwgc2VsZWN0b3IgZnVuY3Rpb24gd2hpY2ggY2FuIHVzZSB0aGUgbXVsdGljYXN0ZWQgc291cmNlIHNlcXVlbmNlIGFzIG1hbnkgdGltZXNcbiAqIGFzIG5lZWRlZCwgd2l0aG91dCBjYXVzaW5nIG11bHRpcGxlIHN1YnNjcmlwdGlvbnMgdG8gdGhlIHNvdXJjZSBzZXF1ZW5jZS5cbiAqIFN1YnNjcmliZXJzIHRvIHRoZSBnaXZlbiBzb3VyY2Ugd2lsbCByZWNlaXZlIGFsbCBub3RpZmljYXRpb25zIG9mIHRoZSBzb3VyY2UgZnJvbSB0aGUgdGltZSBvZiB0aGUgc3Vic2NyaXB0aW9uIG9uLlxuICogQHJldHVybiBBIENvbm5lY3RhYmxlT2JzZXJ2YWJsZSB0aGF0IHVwb24gY29ubmVjdGlvbiBjYXVzZXMgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRvIGVtaXQgaXRlbXMgdG8gaXRzIE9ic2VydmVycy5cbiAqIEBtZXRob2QgcHVibGlzaFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gcHVibGlzaChzZWxlY3Rvcikge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5wdWJsaXNoKHNlbGVjdG9yKSh0aGlzKTtcbn1cbmV4cG9ydHMucHVibGlzaCA9IHB1Ymxpc2g7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wdWJsaXNoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGF1ZGl0VGltZV8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL2F1ZGl0VGltZVwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5hdWRpdFRpbWUgPSBhdWRpdFRpbWVfMS5hdWRpdFRpbWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdWRpdFRpbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgcHVibGlzaExhc3RfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9wdWJsaXNoTGFzdFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5wdWJsaXNoTGFzdCA9IHB1Ymxpc2hMYXN0XzEucHVibGlzaExhc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wdWJsaXNoTGFzdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogUmV0dXJucyBhIG5ldyBPYnNlcnZhYmxlIHRoYXQgbXVsdGljYXN0cyAoc2hhcmVzKSB0aGUgb3JpZ2luYWwgT2JzZXJ2YWJsZS4gQXMgbG9uZyBhcyB0aGVyZSBpcyBhdCBsZWFzdCBvbmVcbiAqIFN1YnNjcmliZXIgdGhpcyBPYnNlcnZhYmxlIHdpbGwgYmUgc3Vic2NyaWJlZCBhbmQgZW1pdHRpbmcgZGF0YS4gV2hlbiBhbGwgc3Vic2NyaWJlcnMgaGF2ZSB1bnN1YnNjcmliZWQgaXQgd2lsbFxuICogdW5zdWJzY3JpYmUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUuIEJlY2F1c2UgdGhlIE9ic2VydmFibGUgaXMgbXVsdGljYXN0aW5nIGl0IG1ha2VzIHRoZSBzdHJlYW0gYGhvdGAuXG4gKlxuICogVGhpcyBiZWhhdmVzIHNpbWlsYXJseSB0byAucHVibGlzaCgpLnJlZkNvdW50KCksIHdpdGggYSBiZWhhdmlvciBkaWZmZXJlbmNlIHdoZW4gdGhlIHNvdXJjZSBvYnNlcnZhYmxlIGVtaXRzIGNvbXBsZXRlLlxuICogLnB1Ymxpc2goKS5yZWZDb3VudCgpIHdpbGwgbm90IHJlc3Vic2NyaWJlIHRvIHRoZSBvcmlnaW5hbCBzb3VyY2UsIGhvd2V2ZXIgLnNoYXJlKCkgd2lsbCByZXN1YnNjcmliZSB0byB0aGUgb3JpZ2luYWwgc291cmNlLlxuICogT2JzZXJ2YWJsZS5vZihcInRlc3RcIikucHVibGlzaCgpLnJlZkNvdW50KCkgd2lsbCBub3QgcmUtZW1pdCBcInRlc3RcIiBvbiBuZXcgc3Vic2NyaXB0aW9ucywgT2JzZXJ2YWJsZS5vZihcInRlc3RcIikuc2hhcmUoKSB3aWxsXG4gKiByZS1lbWl0IFwidGVzdFwiIHRvIG5ldyBzdWJzY3JpcHRpb25zLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvc2hhcmUucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IHVwb24gY29ubmVjdGlvbiBjYXVzZXMgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRvIGVtaXQgaXRlbXMgdG8gaXRzIE9ic2VydmVycy5cbiAqIEBtZXRob2Qgc2hhcmVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIHNoYXJlKCkge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5zaGFyZSgpKHRoaXMpO1xufVxuZXhwb3J0cy5zaGFyZSA9IHNoYXJlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2hhcmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIEBwYXJhbSBwcm9qZWN0XG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFI+fFdlYlNvY2tldFN1YmplY3Q8VD58T2JzZXJ2YWJsZTxUPn1cbiAqIEBtZXRob2QgemlwQWxsXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiB6aXBBbGwocHJvamVjdCkge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS56aXBBbGwocHJvamVjdCkodGhpcyk7XG59XG5leHBvcnRzLnppcEFsbCA9IHppcEFsbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXppcEFsbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLmRlZmVyID0gcnhqc18xLmRlZmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVmZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIERlbGF5cyB0aGUgZW1pc3Npb24gb2YgaXRlbXMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgYnkgYSBnaXZlbiB0aW1lIHNwYW5cbiAqIGRldGVybWluZWQgYnkgdGhlIGVtaXNzaW9ucyBvZiBhbm90aGVyIE9ic2VydmFibGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkl0J3MgbGlrZSB7QGxpbmsgZGVsYXl9LCBidXQgdGhlIHRpbWUgc3BhbiBvZiB0aGVcbiAqIGRlbGF5IGR1cmF0aW9uIGlzIGRldGVybWluZWQgYnkgYSBzZWNvbmQgT2JzZXJ2YWJsZS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9kZWxheVdoZW4ucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYGRlbGF5V2hlbmAgdGltZSBzaGlmdHMgZWFjaCBlbWl0dGVkIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGJ5IGFcbiAqIHRpbWUgc3BhbiBkZXRlcm1pbmVkIGJ5IGFub3RoZXIgT2JzZXJ2YWJsZS4gV2hlbiB0aGUgc291cmNlIGVtaXRzIGEgdmFsdWUsXG4gKiB0aGUgYGRlbGF5RHVyYXRpb25TZWxlY3RvcmAgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggdGhlIHNvdXJjZSB2YWx1ZSBhc1xuICogYXJndW1lbnQsIGFuZCBzaG91bGQgcmV0dXJuIGFuIE9ic2VydmFibGUsIGNhbGxlZCB0aGUgXCJkdXJhdGlvblwiIE9ic2VydmFibGUuXG4gKiBUaGUgc291cmNlIHZhbHVlIGlzIGVtaXR0ZWQgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlIG9ubHkgd2hlbiB0aGUgZHVyYXRpb25cbiAqIE9ic2VydmFibGUgZW1pdHMgYSB2YWx1ZSBvciBjb21wbGV0ZXMuXG4gKlxuICogT3B0aW9uYWxseSwgYGRlbGF5V2hlbmAgdGFrZXMgYSBzZWNvbmQgYXJndW1lbnQsIGBzdWJzY3JpcHRpb25EZWxheWAsIHdoaWNoXG4gKiBpcyBhbiBPYnNlcnZhYmxlLiBXaGVuIGBzdWJzY3JpcHRpb25EZWxheWAgZW1pdHMgaXRzIGZpcnN0IHZhbHVlIG9yXG4gKiBjb21wbGV0ZXMsIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBpcyBzdWJzY3JpYmVkIHRvIGFuZCBzdGFydHMgYmVoYXZpbmcgbGlrZVxuICogZGVzY3JpYmVkIGluIHRoZSBwcmV2aW91cyBwYXJhZ3JhcGguIElmIGBzdWJzY3JpcHRpb25EZWxheWAgaXMgbm90IHByb3ZpZGVkLFxuICogYGRlbGF5V2hlbmAgd2lsbCBzdWJzY3JpYmUgdG8gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGFzIHNvb24gYXMgdGhlIG91dHB1dFxuICogT2JzZXJ2YWJsZSBpcyBzdWJzY3JpYmVkLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkRlbGF5IGVhY2ggY2xpY2sgYnkgYSByYW5kb20gYW1vdW50IG9mIHRpbWUsIGJldHdlZW4gMCBhbmQgNSBzZWNvbmRzPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBkZWxheWVkQ2xpY2tzID0gY2xpY2tzLmRlbGF5V2hlbihldmVudCA9PlxuICogICBSeC5PYnNlcnZhYmxlLmludGVydmFsKE1hdGgucmFuZG9tKCkgKiA1MDAwKVxuICogKTtcbiAqIGRlbGF5ZWRDbGlja3Muc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGRlYm91bmNlfVxuICogQHNlZSB7QGxpbmsgZGVsYXl9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCk6IE9ic2VydmFibGV9IGRlbGF5RHVyYXRpb25TZWxlY3RvciBBIGZ1bmN0aW9uIHRoYXRcbiAqIHJldHVybnMgYW4gT2JzZXJ2YWJsZSBmb3IgZWFjaCB2YWx1ZSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgd2hpY2hcbiAqIGlzIHRoZW4gdXNlZCB0byBkZWxheSB0aGUgZW1pc3Npb24gb2YgdGhhdCBpdGVtIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZVxuICogdW50aWwgdGhlIE9ic2VydmFibGUgcmV0dXJuZWQgZnJvbSB0aGlzIGZ1bmN0aW9uIGVtaXRzIGEgdmFsdWUuXG4gKiBAcGFyYW0ge09ic2VydmFibGV9IHN1YnNjcmlwdGlvbkRlbGF5IEFuIE9ic2VydmFibGUgdGhhdCB0cmlnZ2VycyB0aGVcbiAqIHN1YnNjcmlwdGlvbiB0byB0aGUgc291cmNlIE9ic2VydmFibGUgb25jZSBpdCBlbWl0cyBhbnkgdmFsdWUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZGVsYXlzIHRoZSBlbWlzc2lvbnMgb2YgdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSBieSBhbiBhbW91bnQgb2YgdGltZSBzcGVjaWZpZWQgYnkgdGhlIE9ic2VydmFibGUgcmV0dXJuZWQgYnlcbiAqIGBkZWxheUR1cmF0aW9uU2VsZWN0b3JgLlxuICogQG1ldGhvZCBkZWxheVdoZW5cbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIGRlbGF5V2hlbihkZWxheUR1cmF0aW9uU2VsZWN0b3IsIHN1YnNjcmlwdGlvbkRlbGF5KSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLmRlbGF5V2hlbihkZWxheUR1cmF0aW9uU2VsZWN0b3IsIHN1YnNjcmlwdGlvbkRlbGF5KSh0aGlzKTtcbn1cbmV4cG9ydHMuZGVsYXlXaGVuID0gZGVsYXlXaGVuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVsYXlXaGVuLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xucnhqc18xLk9ic2VydmFibGUuemlwID0gcnhqc18xLnppcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXppcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogQXBwbGllcyBhbiBhY2N1bXVsYXRvciBmdW5jdGlvbiBvdmVyIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB3aGVyZSB0aGVcbiAqIGFjY3VtdWxhdG9yIGZ1bmN0aW9uIGl0c2VsZiByZXR1cm5zIGFuIE9ic2VydmFibGUsIHRoZW4gZWFjaCBpbnRlcm1lZGlhdGVcbiAqIE9ic2VydmFibGUgcmV0dXJuZWQgaXMgbWVyZ2VkIGludG8gdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIGxpa2Uge0BsaW5rIHNjYW59LCBidXQgdGhlIE9ic2VydmFibGVzIHJldHVybmVkXG4gKiBieSB0aGUgYWNjdW11bGF0b3IgYXJlIG1lcmdlZCBpbnRvIHRoZSBvdXRlciBPYnNlcnZhYmxlLjwvc3Bhbj5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db3VudCB0aGUgbnVtYmVyIG9mIGNsaWNrIGV2ZW50czwvY2FwdGlvbj5cbiAqIGNvbnN0IGNsaWNrJCA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIGNvbnN0IG9uZSQgPSBjbGljayQubWFwVG8oMSk7XG4gKiBjb25zdCBzZWVkID0gMDtcbiAqIGNvbnN0IGNvdW50JCA9IG9uZSQubWVyZ2VTY2FuKChhY2MsIG9uZSkgPT4gUnguT2JzZXJ2YWJsZS5vZihhY2MgKyBvbmUpLCBzZWVkKTtcbiAqIGNvdW50JC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogLy8gUmVzdWx0czpcbiAqIDFcbiAqIDJcbiAqIDNcbiAqIDRcbiAqIC8vIC4uLmFuZCBzbyBvbiBmb3IgZWFjaCBjbGlja1xuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oYWNjOiBSLCB2YWx1ZTogVCk6IE9ic2VydmFibGU8Uj59IGFjY3VtdWxhdG9yXG4gKiBUaGUgYWNjdW11bGF0b3IgZnVuY3Rpb24gY2FsbGVkIG9uIGVhY2ggc291cmNlIHZhbHVlLlxuICogQHBhcmFtIHNlZWQgVGhlIGluaXRpYWwgYWNjdW11bGF0aW9uIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXJ9IFtjb25jdXJyZW50PU51bWJlci5QT1NJVElWRV9JTkZJTklUWV0gTWF4aW11bSBudW1iZXIgb2ZcbiAqIGlucHV0IE9ic2VydmFibGVzIGJlaW5nIHN1YnNjcmliZWQgdG8gY29uY3VycmVudGx5LlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxSPn0gQW4gb2JzZXJ2YWJsZSBvZiB0aGUgYWNjdW11bGF0ZWQgdmFsdWVzLlxuICogQG1ldGhvZCBtZXJnZVNjYW5cbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIG1lcmdlU2NhbihhY2N1bXVsYXRvciwgc2VlZCwgY29uY3VycmVudCkge1xuICAgIGlmIChjb25jdXJyZW50ID09PSB2b2lkIDApIHsgY29uY3VycmVudCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTsgfVxuICAgIHJldHVybiBvcGVyYXRvcnNfMS5tZXJnZVNjYW4oYWNjdW11bGF0b3IsIHNlZWQsIGNvbmN1cnJlbnQpKHRoaXMpO1xufVxuZXhwb3J0cy5tZXJnZVNjYW4gPSBtZXJnZVNjYW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZVNjYW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBFbWl0cyBhIGdpdmVuIHZhbHVlIGlmIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBjb21wbGV0ZXMgd2l0aG91dCBlbWl0dGluZyBhbnlcbiAqIGBuZXh0YCB2YWx1ZSwgb3RoZXJ3aXNlIG1pcnJvcnMgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JZiB0aGUgc291cmNlIE9ic2VydmFibGUgdHVybnMgb3V0IHRvIGJlIGVtcHR5LCB0aGVuXG4gKiB0aGlzIG9wZXJhdG9yIHdpbGwgZW1pdCBhIGRlZmF1bHQgdmFsdWUuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZGVmYXVsdElmRW1wdHkucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYGRlZmF1bHRJZkVtcHR5YCBlbWl0cyB0aGUgdmFsdWVzIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIG9yIGFcbiAqIHNwZWNpZmllZCBkZWZhdWx0IHZhbHVlIGlmIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBpcyBlbXB0eSAoY29tcGxldGVzIHdpdGhvdXRcbiAqIGhhdmluZyBlbWl0dGVkIGFueSBgbmV4dGAgdmFsdWUpLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPklmIG5vIGNsaWNrcyBoYXBwZW4gaW4gNSBzZWNvbmRzLCB0aGVuIGVtaXQgXCJubyBjbGlja3NcIjwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgY2xpY2tzQmVmb3JlRml2ZSA9IGNsaWNrcy50YWtlVW50aWwoUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCg1MDAwKSk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzQmVmb3JlRml2ZS5kZWZhdWx0SWZFbXB0eSgnbm8gY2xpY2tzJyk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGVtcHR5fVxuICogQHNlZSB7QGxpbmsgbGFzdH1cbiAqXG4gKiBAcGFyYW0ge2FueX0gW2RlZmF1bHRWYWx1ZT1udWxsXSBUaGUgZGVmYXVsdCB2YWx1ZSB1c2VkIGlmIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgaXMgZW1wdHkuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgZWl0aGVyIHRoZSBzcGVjaWZpZWRcbiAqIGBkZWZhdWx0VmFsdWVgIGlmIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBlbWl0cyBubyBpdGVtcywgb3IgdGhlIHZhbHVlcyBlbWl0dGVkXG4gKiBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIGRlZmF1bHRJZkVtcHR5XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBkZWZhdWx0SWZFbXB0eShkZWZhdWx0VmFsdWUpIHtcbiAgICBpZiAoZGVmYXVsdFZhbHVlID09PSB2b2lkIDApIHsgZGVmYXVsdFZhbHVlID0gbnVsbDsgfVxuICAgIHJldHVybiBvcGVyYXRvcnNfMS5kZWZhdWx0SWZFbXB0eShkZWZhdWx0VmFsdWUpKHRoaXMpO1xufVxuZXhwb3J0cy5kZWZhdWx0SWZFbXB0eSA9IGRlZmF1bHRJZkVtcHR5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVmYXVsdElmRW1wdHkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5tZXJnZSA9IHJ4anNfMS5tZXJnZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGRlbGF5XzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvZGVsYXlcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUuZGVsYXkgPSBkZWxheV8xLmRlbGF5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVsYXkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIEJyYW5jaCBvdXQgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHZhbHVlcyBhcyBhIG5lc3RlZCBPYnNlcnZhYmxlIHN0YXJ0aW5nIGZyb21cbiAqIGFuIGVtaXNzaW9uIGZyb20gYG9wZW5pbmdzYCBhbmQgZW5kaW5nIHdoZW4gdGhlIG91dHB1dCBvZiBgY2xvc2luZ1NlbGVjdG9yYFxuICogZW1pdHMuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkl0J3MgbGlrZSB7QGxpbmsgYnVmZmVyVG9nZ2xlfSwgYnV0IGVtaXRzIGEgbmVzdGVkXG4gKiBPYnNlcnZhYmxlIGluc3RlYWQgb2YgYW4gYXJyYXkuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvd2luZG93VG9nZ2xlLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdpbmRvd3Mgb2YgaXRlbXMgaXQgY29sbGVjdHMgZnJvbSB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLiBUaGUgb3V0cHV0IE9ic2VydmFibGUgZW1pdHMgd2luZG93cyB0aGF0IGNvbnRhaW4gdGhvc2UgaXRlbXNcbiAqIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGJldHdlZW4gdGhlIHRpbWUgd2hlbiB0aGUgYG9wZW5pbmdzYFxuICogT2JzZXJ2YWJsZSBlbWl0cyBhbiBpdGVtIGFuZCB3aGVuIHRoZSBPYnNlcnZhYmxlIHJldHVybmVkIGJ5XG4gKiBgY2xvc2luZ1NlbGVjdG9yYCBlbWl0cyBhbiBpdGVtLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkV2ZXJ5IG90aGVyIHNlY29uZCwgZW1pdCB0aGUgY2xpY2sgZXZlbnRzIGZyb20gdGhlIG5leHQgNTAwbXM8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIG9wZW5pbmdzID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKTtcbiAqIHZhciByZXN1bHQgPSBjbGlja3Mud2luZG93VG9nZ2xlKG9wZW5pbmdzLCBpID0+XG4gKiAgIGkgJSAyID8gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCg1MDApIDogUnguT2JzZXJ2YWJsZS5lbXB0eSgpXG4gKiApLm1lcmdlQWxsKCk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIHdpbmRvd31cbiAqIEBzZWUge0BsaW5rIHdpbmRvd0NvdW50fVxuICogQHNlZSB7QGxpbmsgd2luZG93VGltZX1cbiAqIEBzZWUge0BsaW5rIHdpbmRvd1doZW59XG4gKiBAc2VlIHtAbGluayBidWZmZXJUb2dnbGV9XG4gKlxuICogQHBhcmFtIHtPYnNlcnZhYmxlPE8+fSBvcGVuaW5ncyBBbiBvYnNlcnZhYmxlIG9mIG5vdGlmaWNhdGlvbnMgdG8gc3RhcnQgbmV3XG4gKiB3aW5kb3dzLlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogTyk6IE9ic2VydmFibGV9IGNsb3NpbmdTZWxlY3RvciBBIGZ1bmN0aW9uIHRoYXQgdGFrZXNcbiAqIHRoZSB2YWx1ZSBlbWl0dGVkIGJ5IHRoZSBgb3BlbmluZ3NgIG9ic2VydmFibGUgYW5kIHJldHVybnMgYW4gT2JzZXJ2YWJsZSxcbiAqIHdoaWNoLCB3aGVuIGl0IGVtaXRzIChlaXRoZXIgYG5leHRgIG9yIGBjb21wbGV0ZWApLCBzaWduYWxzIHRoYXQgdGhlXG4gKiBhc3NvY2lhdGVkIHdpbmRvdyBzaG91bGQgY29tcGxldGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPE9ic2VydmFibGU8VD4+fSBBbiBvYnNlcnZhYmxlIG9mIHdpbmRvd3MsIHdoaWNoIGluIHR1cm5cbiAqIGFyZSBPYnNlcnZhYmxlcy5cbiAqIEBtZXRob2Qgd2luZG93VG9nZ2xlXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiB3aW5kb3dUb2dnbGUob3BlbmluZ3MsIGNsb3NpbmdTZWxlY3Rvcikge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS53aW5kb3dUb2dnbGUob3BlbmluZ3MsIGNsb3NpbmdTZWxlY3RvcikodGhpcyk7XG59XG5leHBvcnRzLndpbmRvd1RvZ2dsZSA9IHdpbmRvd1RvZ2dsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdpbmRvd1RvZ2dsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogUHJvamVjdHMgZWFjaCBzb3VyY2UgdmFsdWUgdG8gYW4gT2JzZXJ2YWJsZSB3aGljaCBpcyBtZXJnZWQgaW4gdGhlIG91dHB1dFxuICogT2JzZXJ2YWJsZSwgZW1pdHRpbmcgdmFsdWVzIG9ubHkgZnJvbSB0aGUgbW9zdCByZWNlbnRseSBwcm9qZWN0ZWQgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+TWFwcyBlYWNoIHZhbHVlIHRvIGFuIE9ic2VydmFibGUsIHRoZW4gZmxhdHRlbnMgYWxsIG9mXG4gKiB0aGVzZSBpbm5lciBPYnNlcnZhYmxlcyB1c2luZyB7QGxpbmsgc3dpdGNofS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9zd2l0Y2hNYXAucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgaXRlbXMgYmFzZWQgb24gYXBwbHlpbmcgYSBmdW5jdGlvbiB0aGF0IHlvdVxuICogc3VwcGx5IHRvIGVhY2ggaXRlbSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgd2hlcmUgdGhhdCBmdW5jdGlvblxuICogcmV0dXJucyBhbiAoc28tY2FsbGVkIFwiaW5uZXJcIikgT2JzZXJ2YWJsZS4gRWFjaCB0aW1lIGl0IG9ic2VydmVzIG9uZSBvZiB0aGVzZVxuICogaW5uZXIgT2JzZXJ2YWJsZXMsIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBiZWdpbnMgZW1pdHRpbmcgdGhlIGl0ZW1zIGVtaXR0ZWQgYnlcbiAqIHRoYXQgaW5uZXIgT2JzZXJ2YWJsZS4gV2hlbiBhIG5ldyBpbm5lciBPYnNlcnZhYmxlIGlzIGVtaXR0ZWQsIGBzd2l0Y2hNYXBgXG4gKiBzdG9wcyBlbWl0dGluZyBpdGVtcyBmcm9tIHRoZSBlYXJsaWVyLWVtaXR0ZWQgaW5uZXIgT2JzZXJ2YWJsZSBhbmQgYmVnaW5zXG4gKiBlbWl0dGluZyBpdGVtcyBmcm9tIHRoZSBuZXcgb25lLiBJdCBjb250aW51ZXMgdG8gYmVoYXZlIGxpa2UgdGhpcyBmb3JcbiAqIHN1YnNlcXVlbnQgaW5uZXIgT2JzZXJ2YWJsZXMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+UmVydW4gYW4gaW50ZXJ2YWwgT2JzZXJ2YWJsZSBvbiBldmVyeSBjbGljayBldmVudDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLnN3aXRjaE1hcCgoZXYpID0+IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBjb25jYXRNYXB9XG4gKiBAc2VlIHtAbGluayBleGhhdXN0TWFwfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VNYXB9XG4gKiBAc2VlIHtAbGluayBzd2l0Y2h9XG4gKiBAc2VlIHtAbGluayBzd2l0Y2hNYXBUb31cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCA/aW5kZXg6IG51bWJlcik6IE9ic2VydmFibGVJbnB1dH0gcHJvamVjdCBBIGZ1bmN0aW9uXG4gKiB0aGF0LCB3aGVuIGFwcGxpZWQgdG8gYW4gaXRlbSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgcmV0dXJucyBhblxuICogT2JzZXJ2YWJsZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgcmVzdWx0IG9mIGFwcGx5aW5nIHRoZVxuICogcHJvamVjdGlvbiBmdW5jdGlvbiAoYW5kIHRoZSBvcHRpb25hbCBgcmVzdWx0U2VsZWN0b3JgKSB0byBlYWNoIGl0ZW0gZW1pdHRlZFxuICogYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGFuZCB0YWtpbmcgb25seSB0aGUgdmFsdWVzIGZyb20gdGhlIG1vc3QgcmVjZW50bHlcbiAqIHByb2plY3RlZCBpbm5lciBPYnNlcnZhYmxlLlxuICogQG1ldGhvZCBzd2l0Y2hNYXBcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIHN3aXRjaE1hcChwcm9qZWN0KSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLnN3aXRjaE1hcChwcm9qZWN0KSh0aGlzKTtcbn1cbmV4cG9ydHMuc3dpdGNoTWFwID0gc3dpdGNoTWFwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3dpdGNoTWFwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBJZiB0aGUgc291cmNlIE9ic2VydmFibGUgaXMgZW1wdHkgaXQgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdHJ1ZSwgb3RoZXJ3aXNlIGl0IGVtaXRzIGZhbHNlLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvaXNFbXB0eS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYSBCb29sZWFuLlxuICogQG1ldGhvZCBpc0VtcHR5XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBpc0VtcHR5KCkge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5pc0VtcHR5KCkodGhpcyk7XG59XG5leHBvcnRzLmlzRW1wdHkgPSBpc0VtcHR5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNFbXB0eS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciB0YWtlXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvdGFrZVwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS50YWtlID0gdGFrZV8xLnRha2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10YWtlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbi8qKlxuICogUHJvamVjdHMgZWFjaCBzb3VyY2UgdmFsdWUgdG8gdGhlIHNhbWUgT2JzZXJ2YWJsZSB3aGljaCBpcyBmbGF0dGVuZWQgbXVsdGlwbGVcbiAqIHRpbWVzIHdpdGgge0BsaW5rIHN3aXRjaH0gaW4gdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIGxpa2Uge0BsaW5rIHN3aXRjaE1hcH0sIGJ1dCBtYXBzIGVhY2ggdmFsdWVcbiAqIGFsd2F5cyB0byB0aGUgc2FtZSBpbm5lciBPYnNlcnZhYmxlLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3N3aXRjaE1hcFRvLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIE1hcHMgZWFjaCBzb3VyY2UgdmFsdWUgdG8gdGhlIGdpdmVuIE9ic2VydmFibGUgYGlubmVyT2JzZXJ2YWJsZWAgcmVnYXJkbGVzc1xuICogb2YgdGhlIHNvdXJjZSB2YWx1ZSwgYW5kIHRoZW4gZmxhdHRlbnMgdGhvc2UgcmVzdWx0aW5nIE9ic2VydmFibGVzIGludG8gb25lXG4gKiBzaW5nbGUgT2JzZXJ2YWJsZSwgd2hpY2ggaXMgdGhlIG91dHB1dCBPYnNlcnZhYmxlLiBUaGUgb3V0cHV0IE9ic2VydmFibGVzXG4gKiBlbWl0cyB2YWx1ZXMgb25seSBmcm9tIHRoZSBtb3N0IHJlY2VudGx5IGVtaXR0ZWQgaW5zdGFuY2Ugb2ZcbiAqIGBpbm5lck9ic2VydmFibGVgLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlJlcnVuIGFuIGludGVydmFsIE9ic2VydmFibGUgb24gZXZlcnkgY2xpY2sgZXZlbnQ8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy5zd2l0Y2hNYXBUbyhSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgY29uY2F0TWFwVG99XG4gKiBAc2VlIHtAbGluayBzd2l0Y2h9XG4gKiBAc2VlIHtAbGluayBzd2l0Y2hNYXB9XG4gKiBAc2VlIHtAbGluayBtZXJnZU1hcFRvfVxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZUlucHV0fSBpbm5lck9ic2VydmFibGUgQW4gT2JzZXJ2YWJsZSB0byByZXBsYWNlIGVhY2ggdmFsdWUgZnJvbVxuICogdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGl0ZW1zIGZyb20gdGhlIGdpdmVuXG4gKiBgaW5uZXJPYnNlcnZhYmxlYCAoYW5kIG9wdGlvbmFsbHkgdHJhbnNmb3JtZWQgdGhyb3VnaCBgcmVzdWx0U2VsZWN0b3JgKSBldmVyeVxuICogdGltZSBhIHZhbHVlIGlzIGVtaXR0ZWQgb24gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCBhbmQgdGFraW5nIG9ubHkgdGhlIHZhbHVlc1xuICogZnJvbSB0aGUgbW9zdCByZWNlbnRseSBwcm9qZWN0ZWQgaW5uZXIgT2JzZXJ2YWJsZS5cbiAqIEBtZXRob2Qgc3dpdGNoTWFwVG9cbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIHN3aXRjaE1hcFRvKGlubmVyT2JzZXJ2YWJsZSkge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5zd2l0Y2hNYXBUbyhpbm5lck9ic2VydmFibGUpKHRoaXMpO1xufVxuZXhwb3J0cy5zd2l0Y2hNYXBUbyA9IHN3aXRjaE1hcFRvO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3dpdGNoTWFwVG8uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgcmVkdWNlXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvcmVkdWNlXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLnJlZHVjZSA9IHJlZHVjZV8xLnJlZHVjZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlZHVjZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQHBhcmFtIGZ1bmNcbiAqIEByZXR1cm4ge09ic2VydmFibGU8Uj59XG4gKiBAbWV0aG9kIGxldFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gbGV0UHJvdG8oZnVuYykge1xuICAgIHJldHVybiBmdW5jKHRoaXMpO1xufVxuZXhwb3J0cy5sZXRQcm90byA9IGxldFByb3RvO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGV0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIHppcEFsbF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3ppcEFsbFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS56aXBBbGwgPSB6aXBBbGxfMS56aXBBbGw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD16aXBBbGwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5yYW5nZSA9IHJ4anNfMS5yYW5nZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJhbmdlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIHN3aXRjaF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3N3aXRjaFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5zd2l0Y2ggPSBzd2l0Y2hfMS5fc3dpdGNoO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLl9zd2l0Y2ggPSBzd2l0Y2hfMS5fc3dpdGNoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3dpdGNoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIHRha2VVbnRpbF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3Rha2VVbnRpbFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS50YWtlVW50aWwgPSB0YWtlVW50aWxfMS50YWtlVW50aWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10YWtlVW50aWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBDcmVhdGVzIGFuIG91dHB1dCBPYnNlcnZhYmxlIHdoaWNoIHNlcXVlbnRpYWxseSBlbWl0cyBhbGwgdmFsdWVzIGZyb20gZXZlcnlcbiAqIGdpdmVuIGlucHV0IE9ic2VydmFibGUgYWZ0ZXIgdGhlIGN1cnJlbnQgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+Q29uY2F0ZW5hdGVzIG11bHRpcGxlIE9ic2VydmFibGVzIHRvZ2V0aGVyIGJ5XG4gKiBzZXF1ZW50aWFsbHkgZW1pdHRpbmcgdGhlaXIgdmFsdWVzLCBvbmUgT2JzZXJ2YWJsZSBhZnRlciB0aGUgb3RoZXIuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvY29uY2F0LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEpvaW5zIHRoaXMgT2JzZXJ2YWJsZSB3aXRoIG11bHRpcGxlIG90aGVyIE9ic2VydmFibGVzIGJ5IHN1YnNjcmliaW5nIHRvIHRoZW1cbiAqIG9uZSBhdCBhIHRpbWUsIHN0YXJ0aW5nIHdpdGggdGhlIHNvdXJjZSwgYW5kIG1lcmdpbmcgdGhlaXIgcmVzdWx0cyBpbnRvIHRoZVxuICogb3V0cHV0IE9ic2VydmFibGUuIFdpbGwgd2FpdCBmb3IgZWFjaCBPYnNlcnZhYmxlIHRvIGNvbXBsZXRlIGJlZm9yZSBtb3ZpbmdcbiAqIG9uIHRvIHRoZSBuZXh0LlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNvbmNhdGVuYXRlIGEgdGltZXIgY291bnRpbmcgZnJvbSAwIHRvIDMgd2l0aCBhIHN5bmNocm9ub3VzIHNlcXVlbmNlIGZyb20gMSB0byAxMDwvY2FwdGlvbj5cbiAqIHZhciB0aW1lciA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkudGFrZSg0KTtcbiAqIHZhciBzZXF1ZW5jZSA9IFJ4Lk9ic2VydmFibGUucmFuZ2UoMSwgMTApO1xuICogdmFyIHJlc3VsdCA9IHRpbWVyLmNvbmNhdChzZXF1ZW5jZSk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIC8vIHJlc3VsdHMgaW46XG4gKiAvLyAxMDAwbXMtPiAwIC0xMDAwbXMtPiAxIC0xMDAwbXMtPiAyIC0xMDAwbXMtPiAzIC1pbW1lZGlhdGUtPiAxIC4uLiAxMFxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNvbmNhdGVuYXRlIDMgT2JzZXJ2YWJsZXM8L2NhcHRpb24+XG4gKiB2YXIgdGltZXIxID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKS50YWtlKDEwKTtcbiAqIHZhciB0aW1lcjIgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDIwMDApLnRha2UoNik7XG4gKiB2YXIgdGltZXIzID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCg1MDApLnRha2UoMTApO1xuICogdmFyIHJlc3VsdCA9IHRpbWVyMS5jb25jYXQodGltZXIyLCB0aW1lcjMpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiAvLyByZXN1bHRzIGluIHRoZSBmb2xsb3dpbmc6XG4gKiAvLyAoUHJpbnRzIHRvIGNvbnNvbGUgc2VxdWVudGlhbGx5KVxuICogLy8gLTEwMDBtcy0+IDAgLTEwMDBtcy0+IDEgLTEwMDBtcy0+IC4uLiA5XG4gKiAvLyAtMjAwMG1zLT4gMCAtMjAwMG1zLT4gMSAtMjAwMG1zLT4gLi4uIDVcbiAqIC8vIC01MDBtcy0+IDAgLTUwMG1zLT4gMSAtNTAwbXMtPiAuLi4gOVxuICpcbiAqIEBzZWUge0BsaW5rIGNvbmNhdEFsbH1cbiAqIEBzZWUge0BsaW5rIGNvbmNhdE1hcH1cbiAqIEBzZWUge0BsaW5rIGNvbmNhdE1hcFRvfVxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZUlucHV0fSBvdGhlciBBbiBpbnB1dCBPYnNlcnZhYmxlIHRvIGNvbmNhdGVuYXRlIGFmdGVyIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUuIE1vcmUgdGhhbiBvbmUgaW5wdXQgT2JzZXJ2YWJsZXMgbWF5IGJlIGdpdmVuIGFzIGFyZ3VtZW50LlxuICogQHBhcmFtIHtTY2hlZHVsZXJ9IFtzY2hlZHVsZXI9bnVsbF0gQW4gb3B0aW9uYWwgSVNjaGVkdWxlciB0byBzY2hlZHVsZSBlYWNoXG4gKiBPYnNlcnZhYmxlIHN1YnNjcmlwdGlvbiBvbi5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFsbCB2YWx1ZXMgb2YgZWFjaCBwYXNzZWQgT2JzZXJ2YWJsZSBtZXJnZWQgaW50byBhXG4gKiBzaW5nbGUgT2JzZXJ2YWJsZSwgaW4gb3JkZXIsIGluIHNlcmlhbCBmYXNoaW9uLlxuICogQG1ldGhvZCBjb25jYXRcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIGNvbmNhdCgpIHtcbiAgICB2YXIgb2JzZXJ2YWJsZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBvYnNlcnZhYmxlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5saWZ0LmNhbGwocnhqc18xLmNvbmNhdC5hcHBseSh2b2lkIDAsIFt0aGlzXS5jb25jYXQob2JzZXJ2YWJsZXMpKSk7XG59XG5leHBvcnRzLmNvbmNhdCA9IGNvbmNhdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmNhdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBza2lwXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3Ivc2tpcFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5za2lwID0gc2tpcF8xLnNraXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1za2lwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBDb252ZXJ0cyBhIGhpZ2hlci1vcmRlciBPYnNlcnZhYmxlIGludG8gYSBmaXJzdC1vcmRlciBPYnNlcnZhYmxlIGJ5XG4gKiBzdWJzY3JpYmluZyB0byBvbmx5IHRoZSBtb3N0IHJlY2VudGx5IGVtaXR0ZWQgb2YgdGhvc2UgaW5uZXIgT2JzZXJ2YWJsZXMuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkZsYXR0ZW5zIGFuIE9ic2VydmFibGUtb2YtT2JzZXJ2YWJsZXMgYnkgZHJvcHBpbmcgdGhlXG4gKiBwcmV2aW91cyBpbm5lciBPYnNlcnZhYmxlIG9uY2UgYSBuZXcgb25lIGFwcGVhcnMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvc3dpdGNoLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBzd2l0Y2hgIHN1YnNjcmliZXMgdG8gYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIE9ic2VydmFibGVzLCBhbHNvIGtub3duIGFzIGFcbiAqIGhpZ2hlci1vcmRlciBPYnNlcnZhYmxlLiBFYWNoIHRpbWUgaXQgb2JzZXJ2ZXMgb25lIG9mIHRoZXNlIGVtaXR0ZWQgaW5uZXJcbiAqIE9ic2VydmFibGVzLCB0aGUgb3V0cHV0IE9ic2VydmFibGUgc3Vic2NyaWJlcyB0byB0aGUgaW5uZXIgT2JzZXJ2YWJsZSBhbmRcbiAqIGJlZ2lucyBlbWl0dGluZyB0aGUgaXRlbXMgZW1pdHRlZCBieSB0aGF0LiBTbyBmYXIsIGl0IGJlaGF2ZXNcbiAqIGxpa2Uge0BsaW5rIG1lcmdlQWxsfS4gSG93ZXZlciwgd2hlbiBhIG5ldyBpbm5lciBPYnNlcnZhYmxlIGlzIGVtaXR0ZWQsXG4gKiBgc3dpdGNoYCB1bnN1YnNjcmliZXMgZnJvbSB0aGUgZWFybGllci1lbWl0dGVkIGlubmVyIE9ic2VydmFibGUgYW5kXG4gKiBzdWJzY3JpYmVzIHRvIHRoZSBuZXcgaW5uZXIgT2JzZXJ2YWJsZSBhbmQgYmVnaW5zIGVtaXR0aW5nIGl0ZW1zIGZyb20gaXQuIEl0XG4gKiBjb250aW51ZXMgdG8gYmVoYXZlIGxpa2UgdGhpcyBmb3Igc3Vic2VxdWVudCBpbm5lciBPYnNlcnZhYmxlcy5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5SZXJ1biBhbiBpbnRlcnZhbCBPYnNlcnZhYmxlIG9uIGV2ZXJ5IGNsaWNrIGV2ZW50PC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIC8vIEVhY2ggY2xpY2sgZXZlbnQgaXMgbWFwcGVkIHRvIGFuIE9ic2VydmFibGUgdGhhdCB0aWNrcyBldmVyeSBzZWNvbmRcbiAqIHZhciBoaWdoZXJPcmRlciA9IGNsaWNrcy5tYXAoKGV2KSA9PiBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApKTtcbiAqIHZhciBzd2l0Y2hlZCA9IGhpZ2hlck9yZGVyLnN3aXRjaCgpO1xuICogLy8gVGhlIG91dGNvbWUgaXMgdGhhdCBgc3dpdGNoZWRgIGlzIGVzc2VudGlhbGx5IGEgdGltZXIgdGhhdCByZXN0YXJ0c1xuICogLy8gb24gZXZlcnkgY2xpY2suIFRoZSBpbnRlcnZhbCBPYnNlcnZhYmxlcyBmcm9tIG9sZGVyIGNsaWNrcyBkbyBub3QgbWVyZ2VcbiAqIC8vIHdpdGggdGhlIGN1cnJlbnQgaW50ZXJ2YWwgT2JzZXJ2YWJsZS5cbiAqIHN3aXRjaGVkLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBjb21iaW5lQWxsfVxuICogQHNlZSB7QGxpbmsgY29uY2F0QWxsfVxuICogQHNlZSB7QGxpbmsgZXhoYXVzdH1cbiAqIEBzZWUge0BsaW5rIG1lcmdlQWxsfVxuICogQHNlZSB7QGxpbmsgc3dpdGNoTWFwfVxuICogQHNlZSB7QGxpbmsgc3dpdGNoTWFwVG99XG4gKiBAc2VlIHtAbGluayB6aXBBbGx9XG4gKlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHRoZSBpdGVtcyBlbWl0dGVkIGJ5IHRoZVxuICogT2JzZXJ2YWJsZSBtb3N0IHJlY2VudGx5IGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQG1ldGhvZCBzd2l0Y2hcbiAqIEBuYW1lIHN3aXRjaFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gX3N3aXRjaCgpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEuc3dpdGNoQWxsKCkodGhpcyk7XG59XG5leHBvcnRzLl9zd2l0Y2ggPSBfc3dpdGNoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3dpdGNoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGVsZW1lbnRBdF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL2VsZW1lbnRBdFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5lbGVtZW50QXQgPSBlbGVtZW50QXRfMS5lbGVtZW50QXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbGVtZW50QXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIEdyb3VwcyBwYWlycyBvZiBjb25zZWN1dGl2ZSBlbWlzc2lvbnMgdG9nZXRoZXIgYW5kIGVtaXRzIHRoZW0gYXMgYW4gYXJyYXkgb2ZcbiAqIHR3byB2YWx1ZXMuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPlB1dHMgdGhlIGN1cnJlbnQgdmFsdWUgYW5kIHByZXZpb3VzIHZhbHVlIHRvZ2V0aGVyIGFzXG4gKiBhbiBhcnJheSwgYW5kIGVtaXRzIHRoYXQuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvcGFpcndpc2UucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogVGhlIE50aCBlbWlzc2lvbiBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB3aWxsIGNhdXNlIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZVxuICogdG8gZW1pdCBhbiBhcnJheSBbKE4tMSl0aCwgTnRoXSBvZiB0aGUgcHJldmlvdXMgYW5kIHRoZSBjdXJyZW50IHZhbHVlLCBhcyBhXG4gKiBwYWlyLiBGb3IgdGhpcyByZWFzb24sIGBwYWlyd2lzZWAgZW1pdHMgb24gdGhlIHNlY29uZCBhbmQgc3Vic2VxdWVudFxuICogZW1pc3Npb25zIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCBidXQgbm90IG9uIHRoZSBmaXJzdCBlbWlzc2lvbiwgYmVjYXVzZVxuICogdGhlcmUgaXMgbm8gcHJldmlvdXMgdmFsdWUgaW4gdGhhdCBjYXNlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk9uIGV2ZXJ5IGNsaWNrIChzdGFydGluZyBmcm9tIHRoZSBzZWNvbmQpLCBlbWl0IHRoZSByZWxhdGl2ZSBkaXN0YW5jZSB0byB0aGUgcHJldmlvdXMgY2xpY2s8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHBhaXJzID0gY2xpY2tzLnBhaXJ3aXNlKCk7XG4gKiB2YXIgZGlzdGFuY2UgPSBwYWlycy5tYXAocGFpciA9PiB7XG4gKiAgIHZhciB4MCA9IHBhaXJbMF0uY2xpZW50WDtcbiAqICAgdmFyIHkwID0gcGFpclswXS5jbGllbnRZO1xuICogICB2YXIgeDEgPSBwYWlyWzFdLmNsaWVudFg7XG4gKiAgIHZhciB5MSA9IHBhaXJbMV0uY2xpZW50WTtcbiAqICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4MCAtIHgxLCAyKSArIE1hdGgucG93KHkwIC0geTEsIDIpKTtcbiAqIH0pO1xuICogZGlzdGFuY2Uuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGJ1ZmZlcn1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlckNvdW50fVxuICpcbiAqIEByZXR1cm4ge09ic2VydmFibGU8QXJyYXk8VD4+fSBBbiBPYnNlcnZhYmxlIG9mIHBhaXJzIChhcyBhcnJheXMpIG9mXG4gKiBjb25zZWN1dGl2ZSB2YWx1ZXMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIHBhaXJ3aXNlXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBwYWlyd2lzZSgpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEucGFpcndpc2UoKSh0aGlzKTtcbn1cbmV4cG9ydHMucGFpcndpc2UgPSBwYWlyd2lzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhaXJ3aXNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBFbWl0cyB0aGUgdmFsdWVzIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHVudGlsIGEgYG5vdGlmaWVyYFxuICogT2JzZXJ2YWJsZSBlbWl0cyBhIHZhbHVlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5MZXRzIHZhbHVlcyBwYXNzIHVudGlsIGEgc2Vjb25kIE9ic2VydmFibGUsXG4gKiBgbm90aWZpZXJgLCBlbWl0cyBhIHZhbHVlLiBUaGVuLCBpdCBjb21wbGV0ZXMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvdGFrZVVudGlsLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGB0YWtlVW50aWxgIHN1YnNjcmliZXMgYW5kIGJlZ2lucyBtaXJyb3JpbmcgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiBJdCBhbHNvXG4gKiBtb25pdG9ycyBhIHNlY29uZCBPYnNlcnZhYmxlLCBgbm90aWZpZXJgIHRoYXQgeW91IHByb3ZpZGUuIElmIHRoZSBgbm90aWZpZXJgXG4gKiBlbWl0cyBhIHZhbHVlLCB0aGUgb3V0cHV0IE9ic2VydmFibGUgc3RvcHMgbWlycm9yaW5nIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZVxuICogYW5kIGNvbXBsZXRlcy4gSWYgdGhlIGBub3RpZmllcmAgZG9lc24ndCBlbWl0IGFueSB2YWx1ZSBhbmQgY29tcGxldGVzXG4gKiB0aGVuIGB0YWtlVW50aWxgIHdpbGwgcGFzcyBhbGwgdmFsdWVzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlRpY2sgZXZlcnkgc2Vjb25kIHVudGlsIHRoZSBmaXJzdCBjbGljayBoYXBwZW5zPC9jYXB0aW9uPlxuICogdmFyIGludGVydmFsID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKTtcbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gaW50ZXJ2YWwudGFrZVVudGlsKGNsaWNrcyk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIHRha2V9XG4gKiBAc2VlIHtAbGluayB0YWtlTGFzdH1cbiAqIEBzZWUge0BsaW5rIHRha2VXaGlsZX1cbiAqIEBzZWUge0BsaW5rIHNraXB9XG4gKlxuICogQHBhcmFtIHtPYnNlcnZhYmxlfSBub3RpZmllciBUaGUgT2JzZXJ2YWJsZSB3aG9zZSBmaXJzdCBlbWl0dGVkIHZhbHVlIHdpbGxcbiAqIGNhdXNlIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBvZiBgdGFrZVVudGlsYCB0byBzdG9wIGVtaXR0aW5nIHZhbHVlcyBmcm9tIHRoZVxuICogc291cmNlIE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgdW50aWwgc3VjaCB0aW1lIGFzIGBub3RpZmllcmAgZW1pdHMgaXRzIGZpcnN0IHZhbHVlLlxuICogQG1ldGhvZCB0YWtlVW50aWxcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIHRha2VVbnRpbChub3RpZmllcikge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS50YWtlVW50aWwobm90aWZpZXIpKHRoaXMpO1xufVxuZXhwb3J0cy50YWtlVW50aWwgPSB0YWtlVW50aWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10YWtlVW50aWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgc3Vic2NyaWJlT25fMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9zdWJzY3JpYmVPblwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5zdWJzY3JpYmVPbiA9IHN1YnNjcmliZU9uXzEuc3Vic2NyaWJlT247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdWJzY3JpYmVPbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciB0aW1lb3V0V2l0aF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL3RpbWVvdXRXaXRoXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLnRpbWVvdXRXaXRoID0gdGltZW91dFdpdGhfMS50aW1lb3V0V2l0aDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWVvdXRXaXRoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xucnhqc18xLk9ic2VydmFibGUuY29tYmluZUxhdGVzdCA9IHJ4anNfMS5jb21iaW5lTGF0ZXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tYmluZUxhdGVzdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBtZXJnZU1hcFRvXzEgPSByZXF1aXJlKFwiLi4vLi4vb3BlcmF0b3IvbWVyZ2VNYXBUb1wiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwVG8gPSBtZXJnZU1hcFRvXzEubWVyZ2VNYXBUbztcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5tZXJnZU1hcFRvID0gbWVyZ2VNYXBUb18xLm1lcmdlTWFwVG87XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZU1hcFRvLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGZpbmRJbmRleF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL2ZpbmRJbmRleFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5maW5kSW5kZXggPSBmaW5kSW5kZXhfMS5maW5kSW5kZXg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1maW5kSW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG5yeGpzXzEuT2JzZXJ2YWJsZS5vbkVycm9yUmVzdW1lTmV4dCA9IHJ4anNfMS5vbkVycm9yUmVzdW1lTmV4dDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9uRXJyb3JSZXN1bWVOZXh0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBFbWl0cyBhIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIG9ubHkgYWZ0ZXIgYSBwYXJ0aWN1bGFyIHRpbWUgc3BhblxuICogZGV0ZXJtaW5lZCBieSBhbm90aGVyIE9ic2VydmFibGUgaGFzIHBhc3NlZCB3aXRob3V0IGFub3RoZXIgc291cmNlIGVtaXNzaW9uLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIGxpa2Uge0BsaW5rIGRlYm91bmNlVGltZX0sIGJ1dCB0aGUgdGltZSBzcGFuIG9mXG4gKiBlbWlzc2lvbiBzaWxlbmNlIGlzIGRldGVybWluZWQgYnkgYSBzZWNvbmQgT2JzZXJ2YWJsZS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9kZWJvdW5jZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgZGVib3VuY2VgIGRlbGF5cyB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUsIGJ1dCBkcm9wcyBwcmV2aW91c1xuICogcGVuZGluZyBkZWxheWVkIGVtaXNzaW9ucyBpZiBhIG5ldyB2YWx1ZSBhcnJpdmVzIG9uIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIFRoaXMgb3BlcmF0b3Iga2VlcHMgdHJhY2sgb2YgdGhlIG1vc3QgcmVjZW50IHZhbHVlIGZyb20gdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSwgYW5kIHNwYXducyBhIGR1cmF0aW9uIE9ic2VydmFibGUgYnkgY2FsbGluZyB0aGVcbiAqIGBkdXJhdGlvblNlbGVjdG9yYCBmdW5jdGlvbi4gVGhlIHZhbHVlIGlzIGVtaXR0ZWQgb25seSB3aGVuIHRoZSBkdXJhdGlvblxuICogT2JzZXJ2YWJsZSBlbWl0cyBhIHZhbHVlIG9yIGNvbXBsZXRlcywgYW5kIGlmIG5vIG90aGVyIHZhbHVlIHdhcyBlbWl0dGVkIG9uXG4gKiB0aGUgc291cmNlIE9ic2VydmFibGUgc2luY2UgdGhlIGR1cmF0aW9uIE9ic2VydmFibGUgd2FzIHNwYXduZWQuIElmIGEgbmV3XG4gKiB2YWx1ZSBhcHBlYXJzIGJlZm9yZSB0aGUgZHVyYXRpb24gT2JzZXJ2YWJsZSBlbWl0cywgdGhlIHByZXZpb3VzIHZhbHVlIHdpbGxcbiAqIGJlIGRyb3BwZWQgYW5kIHdpbGwgbm90IGJlIGVtaXR0ZWQgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICpcbiAqIExpa2Uge0BsaW5rIGRlYm91bmNlVGltZX0sIHRoaXMgaXMgYSByYXRlLWxpbWl0aW5nIG9wZXJhdG9yLCBhbmQgYWxzbyBhXG4gKiBkZWxheS1saWtlIG9wZXJhdG9yIHNpbmNlIG91dHB1dCBlbWlzc2lvbnMgZG8gbm90IG5lY2Vzc2FyaWx5IG9jY3VyIGF0IHRoZVxuICogc2FtZSB0aW1lIGFzIHRoZXkgZGlkIG9uIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IHRoZSBtb3N0IHJlY2VudCBjbGljayBhZnRlciBhIGJ1cnN0IG9mIGNsaWNrczwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLmRlYm91bmNlKCgpID0+IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBhdWRpdH1cbiAqIEBzZWUge0BsaW5rIGRlYm91bmNlVGltZX1cbiAqIEBzZWUge0BsaW5rIGRlbGF5V2hlbn1cbiAqIEBzZWUge0BsaW5rIHRocm90dGxlfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQpOiBTdWJzY3JpYmFibGVPclByb21pc2V9IGR1cmF0aW9uU2VsZWN0b3IgQSBmdW5jdGlvblxuICogdGhhdCByZWNlaXZlcyBhIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCBmb3IgY29tcHV0aW5nIHRoZSB0aW1lb3V0XG4gKiBkdXJhdGlvbiBmb3IgZWFjaCBzb3VyY2UgdmFsdWUsIHJldHVybmVkIGFzIGFuIE9ic2VydmFibGUgb3IgYSBQcm9taXNlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGRlbGF5cyB0aGUgZW1pc3Npb25zIG9mIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgYnkgdGhlIHNwZWNpZmllZCBkdXJhdGlvbiBPYnNlcnZhYmxlIHJldHVybmVkIGJ5XG4gKiBgZHVyYXRpb25TZWxlY3RvcmAsIGFuZCBtYXkgZHJvcCBzb21lIHZhbHVlcyBpZiB0aGV5IG9jY3VyIHRvbyBmcmVxdWVudGx5LlxuICogQG1ldGhvZCBkZWJvdW5jZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZHVyYXRpb25TZWxlY3Rvcikge1xuICAgIHJldHVybiBvcGVyYXRvcnNfMS5kZWJvdW5jZShkdXJhdGlvblNlbGVjdG9yKSh0aGlzKTtcbn1cbmV4cG9ydHMuZGVib3VuY2UgPSBkZWJvdW5jZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlYm91bmNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xucnhqc18xLk9ic2VydmFibGUuaWYgPSByeGpzXzEuaWlmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aWYuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG5mdW5jdGlvbiBzaGFyZVJlcGxheShjb25maWdPckJ1ZmZlclNpemUsIHdpbmRvd1RpbWUsIHNjaGVkdWxlcikge1xuICAgIGlmIChjb25maWdPckJ1ZmZlclNpemUgJiYgdHlwZW9mIGNvbmZpZ09yQnVmZmVyU2l6ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG9wZXJhdG9yc18xLnNoYXJlUmVwbGF5KGNvbmZpZ09yQnVmZmVyU2l6ZSkodGhpcyk7XG4gICAgfVxuICAgIHJldHVybiBvcGVyYXRvcnNfMS5zaGFyZVJlcGxheShjb25maWdPckJ1ZmZlclNpemUsIHdpbmRvd1RpbWUsIHNjaGVkdWxlcikodGhpcyk7XG59XG5leHBvcnRzLnNoYXJlUmVwbGF5ID0gc2hhcmVSZXBsYXk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaGFyZVJlcGxheS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciB3ZWJTb2NrZXRfMSA9IHJlcXVpcmUoXCJyeGpzL3dlYlNvY2tldFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLndlYlNvY2tldCA9IHdlYlNvY2tldF8xLndlYlNvY2tldDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdlYlNvY2tldC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBvcGVyYXRvcnNfMSA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTtcbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHNpbmdsZSBpdGVtIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRoYXQgbWF0Y2hlcyBhIHNwZWNpZmllZFxuICogcHJlZGljYXRlLCBpZiB0aGF0IE9ic2VydmFibGUgZW1pdHMgb25lIHN1Y2ggaXRlbS4gSWYgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGVtaXRzIG1vcmUgdGhhbiBvbmUgc3VjaCBpdGVtIG9yIG5vXG4gKiBzdWNoIGl0ZW1zLCBub3RpZnkgb2YgYW4gSWxsZWdhbEFyZ3VtZW50RXhjZXB0aW9uIG9yIE5vU3VjaEVsZW1lbnRFeGNlcHRpb24gcmVzcGVjdGl2ZWx5LlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvc2luZ2xlLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEB0aHJvd3Mge0VtcHR5RXJyb3J9IERlbGl2ZXJzIGFuIEVtcHR5RXJyb3IgdG8gdGhlIE9ic2VydmVyJ3MgYGVycm9yYFxuICogY2FsbGJhY2sgaWYgdGhlIE9ic2VydmFibGUgY29tcGxldGVzIGJlZm9yZSBhbnkgYG5leHRgIG5vdGlmaWNhdGlvbiB3YXMgc2VudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSAtIEEgcHJlZGljYXRlIGZ1bmN0aW9uIHRvIGV2YWx1YXRlIGl0ZW1zIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHRoZSBzaW5nbGUgaXRlbSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB0aGF0IG1hdGNoZXNcbiAqIHRoZSBwcmVkaWNhdGUuXG4gLlxuICogQG1ldGhvZCBzaW5nbGVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIHNpbmdsZShwcmVkaWNhdGUpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEuc2luZ2xlKHByZWRpY2F0ZSkodGhpcyk7XG59XG5leHBvcnRzLnNpbmdsZSA9IHNpbmdsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpbmdsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBidWZmZXJDb3VudF8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL2J1ZmZlckNvdW50XCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLmJ1ZmZlckNvdW50ID0gYnVmZmVyQ291bnRfMS5idWZmZXJDb3VudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ1ZmZlckNvdW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyoqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBhbGwgaXRlbXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgdGhhdCBhcmUgZGlzdGluY3QgYnkgY29tcGFyaXNvbiBmcm9tIHByZXZpb3VzIGl0ZW1zLlxuICpcbiAqIElmIGEga2V5U2VsZWN0b3IgZnVuY3Rpb24gaXMgcHJvdmlkZWQsIHRoZW4gaXQgd2lsbCBwcm9qZWN0IGVhY2ggdmFsdWUgZnJvbSB0aGUgc291cmNlIG9ic2VydmFibGUgaW50byBhIG5ldyB2YWx1ZSB0aGF0IGl0IHdpbGxcbiAqIGNoZWNrIGZvciBlcXVhbGl0eSB3aXRoIHByZXZpb3VzbHkgcHJvamVjdGVkIHZhbHVlcy4gSWYgYSBrZXlTZWxlY3RvciBmdW5jdGlvbiBpcyBub3QgcHJvdmlkZWQsIGl0IHdpbGwgdXNlIGVhY2ggdmFsdWUgZnJvbSB0aGVcbiAqIHNvdXJjZSBvYnNlcnZhYmxlIGRpcmVjdGx5IHdpdGggYW4gZXF1YWxpdHkgY2hlY2sgYWdhaW5zdCBwcmV2aW91cyB2YWx1ZXMuXG4gKlxuICogSW4gSmF2YVNjcmlwdCBydW50aW1lcyB0aGF0IHN1cHBvcnQgYFNldGAsIHRoaXMgb3BlcmF0b3Igd2lsbCB1c2UgYSBgU2V0YCB0byBpbXByb3ZlIHBlcmZvcm1hbmNlIG9mIHRoZSBkaXN0aW5jdCB2YWx1ZSBjaGVja2luZy5cbiAqXG4gKiBJbiBvdGhlciBydW50aW1lcywgdGhpcyBvcGVyYXRvciB3aWxsIHVzZSBhIG1pbmltYWwgaW1wbGVtZW50YXRpb24gb2YgYFNldGAgdGhhdCByZWxpZXMgb24gYW4gYEFycmF5YCBhbmQgYGluZGV4T2ZgIHVuZGVyIHRoZVxuICogaG9vZCwgc28gcGVyZm9ybWFuY2Ugd2lsbCBkZWdyYWRlIGFzIG1vcmUgdmFsdWVzIGFyZSBjaGVja2VkIGZvciBkaXN0aW5jdGlvbi4gRXZlbiBpbiBuZXdlciBicm93c2VycywgYSBsb25nLXJ1bm5pbmcgYGRpc3RpbmN0YFxuICogdXNlIG1pZ2h0IHJlc3VsdCBpbiBtZW1vcnkgbGVha3MuIFRvIGhlbHAgYWxsZXZpYXRlIHRoaXMgaW4gc29tZSBzY2VuYXJpb3MsIGFuIG9wdGlvbmFsIGBmbHVzaGVzYCBwYXJhbWV0ZXIgaXMgYWxzbyBwcm92aWRlZCBzb1xuICogdGhhdCB0aGUgaW50ZXJuYWwgYFNldGAgY2FuIGJlIFwiZmx1c2hlZFwiLCBiYXNpY2FsbHkgY2xlYXJpbmcgaXQgb2YgdmFsdWVzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkEgc2ltcGxlIGV4YW1wbGUgd2l0aCBudW1iZXJzPC9jYXB0aW9uPlxuICogT2JzZXJ2YWJsZS5vZigxLCAxLCAyLCAyLCAyLCAxLCAyLCAzLCA0LCAzLCAyLCAxKVxuICogICAuZGlzdGluY3QoKVxuICogICAuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpOyAvLyAxLCAyLCAzLCA0XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+QW4gZXhhbXBsZSB1c2luZyBhIGtleVNlbGVjdG9yIGZ1bmN0aW9uPC9jYXB0aW9uPlxuICogaW50ZXJmYWNlIFBlcnNvbiB7XG4gKiAgICBhZ2U6IG51bWJlcixcbiAqICAgIG5hbWU6IHN0cmluZ1xuICogfVxuICpcbiAqIE9ic2VydmFibGUub2Y8UGVyc29uPihcbiAqICAgICB7IGFnZTogNCwgbmFtZTogJ0Zvbyd9LFxuICogICAgIHsgYWdlOiA3LCBuYW1lOiAnQmFyJ30sXG4gKiAgICAgeyBhZ2U6IDUsIG5hbWU6ICdGb28nfSlcbiAqICAgICAuZGlzdGluY3QoKHA6IFBlcnNvbikgPT4gcC5uYW1lKVxuICogICAgIC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogLy8gZGlzcGxheXM6XG4gKiAvLyB7IGFnZTogNCwgbmFtZTogJ0ZvbycgfVxuICogLy8geyBhZ2U6IDcsIG5hbWU6ICdCYXInIH1cbiAqXG4gKiBAc2VlIHtAbGluayBkaXN0aW5jdFVudGlsQ2hhbmdlZH1cbiAqIEBzZWUge0BsaW5rIGRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtrZXlTZWxlY3Rvcl0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gc2VsZWN0IHdoaWNoIHZhbHVlIHlvdSB3YW50IHRvIGNoZWNrIGFzIGRpc3RpbmN0LlxuICogQHBhcmFtIHtPYnNlcnZhYmxlfSBbZmx1c2hlc10gT3B0aW9uYWwgT2JzZXJ2YWJsZSBmb3IgZmx1c2hpbmcgdGhlIGludGVybmFsIEhhc2hTZXQgb2YgdGhlIG9wZXJhdG9yLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGl0ZW1zIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHdpdGggZGlzdGluY3QgdmFsdWVzLlxuICogQG1ldGhvZCBkaXN0aW5jdFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gZGlzdGluY3Qoa2V5U2VsZWN0b3IsIGZsdXNoZXMpIHtcbiAgICByZXR1cm4gb3BlcmF0b3JzXzEuZGlzdGluY3Qoa2V5U2VsZWN0b3IsIGZsdXNoZXMpKHRoaXMpO1xufVxuZXhwb3J0cy5kaXN0aW5jdCA9IGRpc3RpbmN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGlzdGluY3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG52YXIgbWVyZ2VNYXBfMSA9IHJlcXVpcmUoXCIuLi8uLi9vcGVyYXRvci9tZXJnZU1hcFwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5tZXJnZU1hcCA9IG1lcmdlTWFwXzEubWVyZ2VNYXA7XG5yeGpzXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcCA9IG1lcmdlTWFwXzEubWVyZ2VNYXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZU1hcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbnZhciBpZ25vcmVFbGVtZW50c18xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL2lnbm9yZUVsZW1lbnRzXCIpO1xucnhqc18xLk9ic2VydmFibGUucHJvdG90eXBlLmlnbm9yZUVsZW1lbnRzID0gaWdub3JlRWxlbWVudHNfMS5pZ25vcmVFbGVtZW50cztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlnbm9yZUVsZW1lbnRzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIGRlbGF5V2hlbl8xID0gcmVxdWlyZShcIi4uLy4uL29wZXJhdG9yL2RlbGF5V2hlblwiKTtcbnJ4anNfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5kZWxheVdoZW4gPSBkZWxheVdoZW5fMS5kZWxheVdoZW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWxheVdoZW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb3BlcmF0b3JzXzEgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7XG4vKipcbiAqIFByb2plY3RzIGVhY2ggc291cmNlIHZhbHVlIHRvIHRoZSBzYW1lIE9ic2VydmFibGUgd2hpY2ggaXMgbWVyZ2VkIG11bHRpcGxlXG4gKiB0aW1lcyBpbiB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkl0J3MgbGlrZSB7QGxpbmsgbWVyZ2VNYXB9LCBidXQgbWFwcyBlYWNoIHZhbHVlIGFsd2F5c1xuICogdG8gdGhlIHNhbWUgaW5uZXIgT2JzZXJ2YWJsZS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9tZXJnZU1hcFRvLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIE1hcHMgZWFjaCBzb3VyY2UgdmFsdWUgdG8gdGhlIGdpdmVuIE9ic2VydmFibGUgYGlubmVyT2JzZXJ2YWJsZWAgcmVnYXJkbGVzc1xuICogb2YgdGhlIHNvdXJjZSB2YWx1ZSwgYW5kIHRoZW4gbWVyZ2VzIHRob3NlIHJlc3VsdGluZyBPYnNlcnZhYmxlcyBpbnRvIG9uZVxuICogc2luZ2xlIE9ic2VydmFibGUsIHdoaWNoIGlzIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Gb3IgZWFjaCBjbGljayBldmVudCwgc3RhcnQgYW4gaW50ZXJ2YWwgT2JzZXJ2YWJsZSB0aWNraW5nIGV2ZXJ5IDEgc2Vjb25kPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciByZXN1bHQgPSBjbGlja3MubWVyZ2VNYXBUbyhSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgY29uY2F0TWFwVG99XG4gKiBAc2VlIHtAbGluayBtZXJnZX1cbiAqIEBzZWUge0BsaW5rIG1lcmdlQWxsfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VNYXB9XG4gKiBAc2VlIHtAbGluayBtZXJnZVNjYW59XG4gKiBAc2VlIHtAbGluayBzd2l0Y2hNYXBUb31cbiAqXG4gKiBAcGFyYW0ge09ic2VydmFibGVJbnB1dH0gaW5uZXJPYnNlcnZhYmxlIEFuIE9ic2VydmFibGUgdG8gcmVwbGFjZSBlYWNoIHZhbHVlIGZyb21cbiAqIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbY29uY3VycmVudD1OdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFldIE1heGltdW0gbnVtYmVyIG9mIGlucHV0XG4gKiBPYnNlcnZhYmxlcyBiZWluZyBzdWJzY3JpYmVkIHRvIGNvbmN1cnJlbnRseS5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBpdGVtcyBmcm9tIHRoZSBnaXZlblxuICogYGlubmVyT2JzZXJ2YWJsZWAuXG4gKiBAbWV0aG9kIG1lcmdlTWFwVG9cbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIG1lcmdlTWFwVG8oaW5uZXJPYnNlcnZhYmxlLCBjb25jdXJyZW50KSB7XG4gICAgaWYgKGNvbmN1cnJlbnQgPT09IHZvaWQgMCkgeyBjb25jdXJyZW50ID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZOyB9XG4gICAgcmV0dXJuIG9wZXJhdG9yc18xLm1lcmdlTWFwVG8oaW5uZXJPYnNlcnZhYmxlLCBjb25jdXJyZW50KSh0aGlzKTtcbn1cbmV4cG9ydHMubWVyZ2VNYXBUbyA9IG1lcmdlTWFwVG87XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZU1hcFRvLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xudmFyIG9wZXJhdG9yc18xID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpO1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbi8qKlxuICpcbiAqIEVycm9ycyBpZiBPYnNlcnZhYmxlIGRvZXMgbm90IGVtaXQgYSB2YWx1ZSBpbiBnaXZlbiB0aW1lIHNwYW4sIGluIGNhc2Ugb2Ygd2hpY2hcbiAqIHN1YnNjcmliZXMgdG8gdGhlIHNlY29uZCBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIGEgdmVyc2lvbiBvZiBgdGltZW91dGAgb3BlcmF0b3IgdGhhdCBsZXQncyB5b3Ugc3BlY2lmeSBmYWxsYmFjayBPYnNlcnZhYmxlLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3RpbWVvdXRXaXRoLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGB0aW1lb3V0V2l0aGAgaXMgYSB2YXJpYXRpb24gb2YgYHRpbWVvdXRgIG9wZXJhdG9yLiBJdCBiZWhhdmVzIGV4YWN0bHkgdGhlIHNhbWUsXG4gKiBzdGlsbCBhY2NlcHRpbmcgYXMgYSBmaXJzdCBhcmd1bWVudCBlaXRoZXIgYSBudW1iZXIgb3IgYSBEYXRlLCB3aGljaCBjb250cm9sIC0gcmVzcGVjdGl2ZWx5IC1cbiAqIHdoZW4gdmFsdWVzIG9mIHNvdXJjZSBPYnNlcnZhYmxlIHNob3VsZCBiZSBlbWl0dGVkIG9yIHdoZW4gaXQgc2hvdWxkIGNvbXBsZXRlLlxuICpcbiAqIFRoZSBvbmx5IGRpZmZlcmVuY2UgaXMgdGhhdCBpdCBhY2NlcHRzIGEgc2Vjb25kLCByZXF1aXJlZCBwYXJhbWV0ZXIuIFRoaXMgcGFyYW1ldGVyXG4gKiBzaG91bGQgYmUgYW4gT2JzZXJ2YWJsZSB3aGljaCB3aWxsIGJlIHN1YnNjcmliZWQgd2hlbiBzb3VyY2UgT2JzZXJ2YWJsZSBmYWlscyBhbnkgdGltZW91dCBjaGVjay5cbiAqIFNvIHdoZW5ldmVyIHJlZ3VsYXIgYHRpbWVvdXRgIHdvdWxkIGVtaXQgYW4gZXJyb3IsIGB0aW1lb3V0V2l0aGAgd2lsbCBpbnN0ZWFkIHN0YXJ0IHJlLWVtaXR0aW5nXG4gKiB2YWx1ZXMgZnJvbSBzZWNvbmQgT2JzZXJ2YWJsZS4gTm90ZSB0aGF0IHRoaXMgZmFsbGJhY2sgT2JzZXJ2YWJsZSBpcyBub3QgY2hlY2tlZCBmb3IgdGltZW91dHNcbiAqIGl0c2VsZiwgc28gaXQgY2FuIGVtaXQgdmFsdWVzIGFuZCBjb21wbGV0ZSBhdCBhcmJpdHJhcnkgcG9pbnRzIGluIHRpbWUuIEZyb20gdGhlIG1vbWVudCBvZiBhIHNlY29uZFxuICogc3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlIHJldHVybmVkIGZyb20gYHRpbWVvdXRXaXRoYCBzaW1wbHkgbWlycm9ycyBmYWxsYmFjayBzdHJlYW0uIFdoZW4gdGhhdFxuICogc3RyZWFtIGNvbXBsZXRlcywgaXQgY29tcGxldGVzIGFzIHdlbGwuXG4gKlxuICogU2NoZWR1bGVyLCB3aGljaCBpbiBjYXNlIG9mIGB0aW1lb3V0YCBpcyBwcm92aWRlZCBhcyBhcyBzZWNvbmQgYXJndW1lbnQsIGNhbiBiZSBzdGlsbCBwcm92aWRlZFxuICogaGVyZSAtIGFzIGEgdGhpcmQsIG9wdGlvbmFsIHBhcmFtZXRlci4gSXQgc3RpbGwgaXMgdXNlZCB0byBzY2hlZHVsZSB0aW1lb3V0IGNoZWNrcyBhbmQgLVxuICogYXMgYSBjb25zZXF1ZW5jZSAtIHdoZW4gc2Vjb25kIE9ic2VydmFibGUgd2lsbCBiZSBzdWJzY3JpYmVkLCBzaW5jZSBzdWJzY3JpcHRpb24gaGFwcGVuc1xuICogaW1tZWRpYXRlbHkgYWZ0ZXIgZmFpbGluZyBjaGVjay5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5BZGQgZmFsbGJhY2sgb2JzZXJ2YWJsZTwvY2FwdGlvbj5cbiAqIGNvbnN0IHNlY29uZHMgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICogY29uc3QgbWludXRlcyA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoNjAgKiAxMDAwKTtcbiAqXG4gKiBzZWNvbmRzLnRpbWVvdXRXaXRoKDkwMCwgbWludXRlcylcbiAqICAgICAuc3Vic2NyaWJlKFxuICogICAgICAgICB2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSksIC8vIEFmdGVyIDkwMG1zLCB3aWxsIHN0YXJ0IGVtaXR0aW5nIGBtaW51dGVzYCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzaW5jZSBmaXJzdCB2YWx1ZSBvZiBgc2Vjb25kc2Agd2lsbCBub3QgYXJyaXZlIGZhc3QgZW5vdWdoLlxuICogICAgICAgICBlcnIgPT4gY29uc29sZS5sb2coZXJyKSAvLyBXb3VsZCBiZSBjYWxsZWQgYWZ0ZXIgOTAwbXMgaW4gY2FzZSBvZiBgdGltZW91dGAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJ1dCBoZXJlIHdpbGwgbmV2ZXIgYmUgY2FsbGVkLlxuICogICAgICk7XG4gKlxuICogQHBhcmFtIHtudW1iZXJ8RGF0ZX0gZHVlIE51bWJlciBzcGVjaWZ5aW5nIHBlcmlvZCB3aXRoaW4gd2hpY2ggT2JzZXJ2YWJsZSBtdXN0IGVtaXQgdmFsdWVzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgRGF0ZSBzcGVjaWZ5aW5nIGJlZm9yZSB3aGVuIE9ic2VydmFibGUgc2hvdWxkIGNvbXBsZXRlXG4gKiBAcGFyYW0ge09ic2VydmFibGU8VD59IHdpdGhPYnNlcnZhYmxlIE9ic2VydmFibGUgd2hpY2ggd2lsbCBiZSBzdWJzY3JpYmVkIGlmIHNvdXJjZSBmYWlscyB0aW1lb3V0IGNoZWNrLlxuICogQHBhcmFtIHtTY2hlZHVsZXJ9IFtzY2hlZHVsZXJdIFNjaGVkdWxlciBjb250cm9sbGluZyB3aGVuIHRpbWVvdXQgY2hlY2tzIG9jY3VyLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gT2JzZXJ2YWJsZSB0aGF0IG1pcnJvcnMgYmVoYXZpb3VyIG9mIHNvdXJjZSBvciwgd2hlbiB0aW1lb3V0IGNoZWNrIGZhaWxzLCBvZiBhbiBPYnNlcnZhYmxlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzc2VkIGFzIGEgc2Vjb25kIHBhcmFtZXRlci5cbiAqIEBtZXRob2QgdGltZW91dFdpdGhcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIHRpbWVvdXRXaXRoKGR1ZSwgd2l0aE9ic2VydmFibGUsIHNjaGVkdWxlcikge1xuICAgIGlmIChzY2hlZHVsZXIgPT09IHZvaWQgMCkgeyBzY2hlZHVsZXIgPSByeGpzXzEuYXN5bmNTY2hlZHVsZXI7IH1cbiAgICByZXR1cm4gb3BlcmF0b3JzXzEudGltZW91dFdpdGgoZHVlLCB3aXRoT2JzZXJ2YWJsZSwgc2NoZWR1bGVyKSh0aGlzKTtcbn1cbmV4cG9ydHMudGltZW91dFdpdGggPSB0aW1lb3V0V2l0aDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWVvdXRXaXRoLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=