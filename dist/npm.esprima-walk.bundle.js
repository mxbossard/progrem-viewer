(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.esprima-walk"],{

/***/ "DEE3":
/*!***************************************************!*\
  !*** ./node_modules/esprima-walk/esprima-walk.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



function walk( ast, fn ) {

	var stack = [ ast ], i, j, key, len, node, child

	for ( i = 0; i < stack.length; i += 1 ) {

		node = stack[ i ]

		fn( node )

		for ( key in node ) {

			child = node[ key ]

			if ( child instanceof Array ) {

				for ( j = 0, len = child.length; j < len; j += 1 ) {
					stack.push( child[ j ] )
				}

			} else if ( child != void 0 && typeof child.type === 'string' ) {

				stack.push( child )

			}

		}

	}

}

walk.walk = walk

walk.walkAddParent = function ( ast, fn ) {

	var stack = [ ast ], i, j, key, len, node, child, subchild

	for ( i = 0; i < stack.length; i += 1 ) {

		node = stack[ i ]

		fn( node )

		for ( key in node ) {

			if ( key !== 'parent' ) {
				
				child = node[ key ]

				if ( child instanceof Array ) {

					for ( j = 0, len = child.length; j < len; j += 1 ) {

						subchild = child[ j ]

						subchild.parent = node

						stack.push( subchild )

					}

				} else if ( child != void 0 && typeof child.type === 'string' ) {

					child.parent = node

					stack.push( child )

				}

			}

		}

	}

}


exports = module.exports = walk


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXNwcmltYS13YWxrL2VzcHJpbWEtd2Fsay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFZOzs7QUFHWjs7QUFFQTs7QUFFQSxhQUFhLGtCQUFrQjs7QUFFL0I7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTs7QUFFQSxJQUFJOztBQUVKOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLGFBQWEsa0JBQWtCOztBQUUvQjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxxQ0FBcUMsU0FBUzs7QUFFOUM7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBR0EiLCJmaWxlIjoibnBtLmVzcHJpbWEtd2Fsay5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuXG5mdW5jdGlvbiB3YWxrKCBhc3QsIGZuICkge1xuXG5cdHZhciBzdGFjayA9IFsgYXN0IF0sIGksIGosIGtleSwgbGVuLCBub2RlLCBjaGlsZFxuXG5cdGZvciAoIGkgPSAwOyBpIDwgc3RhY2subGVuZ3RoOyBpICs9IDEgKSB7XG5cblx0XHRub2RlID0gc3RhY2tbIGkgXVxuXG5cdFx0Zm4oIG5vZGUgKVxuXG5cdFx0Zm9yICgga2V5IGluIG5vZGUgKSB7XG5cblx0XHRcdGNoaWxkID0gbm9kZVsga2V5IF1cblxuXHRcdFx0aWYgKCBjaGlsZCBpbnN0YW5jZW9mIEFycmF5ICkge1xuXG5cdFx0XHRcdGZvciAoIGogPSAwLCBsZW4gPSBjaGlsZC5sZW5ndGg7IGogPCBsZW47IGogKz0gMSApIHtcblx0XHRcdFx0XHRzdGFjay5wdXNoKCBjaGlsZFsgaiBdIClcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2UgaWYgKCBjaGlsZCAhPSB2b2lkIDAgJiYgdHlwZW9mIGNoaWxkLnR5cGUgPT09ICdzdHJpbmcnICkge1xuXG5cdFx0XHRcdHN0YWNrLnB1c2goIGNoaWxkIClcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH1cblxufVxuXG53YWxrLndhbGsgPSB3YWxrXG5cbndhbGsud2Fsa0FkZFBhcmVudCA9IGZ1bmN0aW9uICggYXN0LCBmbiApIHtcblxuXHR2YXIgc3RhY2sgPSBbIGFzdCBdLCBpLCBqLCBrZXksIGxlbiwgbm9kZSwgY2hpbGQsIHN1YmNoaWxkXG5cblx0Zm9yICggaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7IGkgKz0gMSApIHtcblxuXHRcdG5vZGUgPSBzdGFja1sgaSBdXG5cblx0XHRmbiggbm9kZSApXG5cblx0XHRmb3IgKCBrZXkgaW4gbm9kZSApIHtcblxuXHRcdFx0aWYgKCBrZXkgIT09ICdwYXJlbnQnICkge1xuXHRcdFx0XHRcblx0XHRcdFx0Y2hpbGQgPSBub2RlWyBrZXkgXVxuXG5cdFx0XHRcdGlmICggY2hpbGQgaW5zdGFuY2VvZiBBcnJheSApIHtcblxuXHRcdFx0XHRcdGZvciAoIGogPSAwLCBsZW4gPSBjaGlsZC5sZW5ndGg7IGogPCBsZW47IGogKz0gMSApIHtcblxuXHRcdFx0XHRcdFx0c3ViY2hpbGQgPSBjaGlsZFsgaiBdXG5cblx0XHRcdFx0XHRcdHN1YmNoaWxkLnBhcmVudCA9IG5vZGVcblxuXHRcdFx0XHRcdFx0c3RhY2sucHVzaCggc3ViY2hpbGQgKVxuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0gZWxzZSBpZiAoIGNoaWxkICE9IHZvaWQgMCAmJiB0eXBlb2YgY2hpbGQudHlwZSA9PT0gJ3N0cmluZycgKSB7XG5cblx0XHRcdFx0XHRjaGlsZC5wYXJlbnQgPSBub2RlXG5cblx0XHRcdFx0XHRzdGFjay5wdXNoKCBjaGlsZCApXG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fVxuXG59XG5cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gd2Fsa1xuIl0sInNvdXJjZVJvb3QiOiIifQ==