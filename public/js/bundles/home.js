webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(14);
	__webpack_require__(18);
	__webpack_require__(20);
	__webpack_require__(31);
	__webpack_require__(33);

	__webpack_require__(35);

/***/ },

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(36);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/sass-loader/index.js!./home.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/sass-loader/index.js!./home.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 36:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, "#avatar{text-align:center}#avatar img{max-width:50%}\n", "", {"version":3,"sources":["/./lib/sass/pages/lib/sass/pages/home.scss"],"names":[],"mappings":"AAAA,QACE,iBAAmB,CADrB,YAGI,aAAe,CAChB","file":"home.scss","sourcesContent":["#avatar {\r\n  text-align: center;\r\n  img {\r\n    max-width: 50%;\r\n  }\r\n}"],"sourceRoot":"webpack://"}]);

	// exports


/***/ }

});