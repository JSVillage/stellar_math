/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
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
/***/ function(module, exports) {

	'use strict';

	$(document).ready(function () {
	    $('#begin-exercise').click(function (e) {
	        e.preventDefault();
	        return beginExercise();
	    });
	});

	function beginExercise() {
	    $.get('/exercise/begin', function (level) {
	        $('#begin-exercise').hide();
	        var i = 0;
	        for (i; i < level.value1; i++) {
	            $('#value1-objects').append('<div class="exercise-object"></div>');
	        }
	        i = 0;
	        for (i; i < level.value2; i++) {
	            $('#value2-objects').append('<div class="exercise-object"></div>');
	        }
	        addExerciseListener();
	        $('#operator').html(level.operator);
	        $('#exercise-workspace').show();
	    });
	}

	function addExerciseListener() {
	    $('.exercise-object').click(function () {
	        $(this).toggleClass('selected');
	        var selected = $('.selected');
	        var left = 0;
	        var right = 0;
	        var i = 0;
	        for (i; i < selected.length; i++) {
	            if ($(selected[i]).parent().is('#value1-objects')) left++;
	            if ($(selected[i]).parent().is('#value2-objects')) right++;
	        }
	        $('#value1').html(left);
	        $('#value2').html(right);
	        $('#result').html(selected.length);
	    });

	    $('#submit-exercise').click(function (e) {
	        e.preventDefault();
	        return submitExercise($('#result').html());
	    });
	}

	function submitExercise(answer) {
	    $.get('/exercise/check?answer=' + answer, function (result) {
	        if (result) window.alert('congrats');else window.alert('incorrect');
	    });
	}

/***/ }
/******/ ]);