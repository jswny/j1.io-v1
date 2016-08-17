webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(14);
	__webpack_require__(18);
	__webpack_require__(20);
	__webpack_require__(31);
	__webpack_require__(33);

	__webpack_require__(37);

/***/ },

/***/ 37:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(38);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/sass-loader/index.js!./projects.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/sass-loader/index.js!./projects.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, "p{font-size:2em}\n", "", {"version":3,"sources":["/./lib/sass/pages/lib/sass/pages/projects.scss"],"names":[],"mappings":"AAAA,EACE,aAAe,CAChB","file":"projects.scss","sourcesContent":["p {\r\n  font-size: 2em;\r\n}"],"sourceRoot":"webpack://"}]);

	// exports


/***/ }

});