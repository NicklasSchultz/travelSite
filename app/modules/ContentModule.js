"use strict";
var ContentModule = (function() { // jshint ignore:line
	var ContentPage = {},
		pages = {};

	ContentPage.addContentPage = function(id, title, sectionId) {
		var parentSection = $('#' + sectionId);
		var domString =
		'<div class="slide slide0" id="' + id + '">' +
			'<div class="intro">'+
				'<h1>' + title +'</h1>'+
			'</div>'+
		'</div>'+
		'<div class="slide contentSlide" id="' + id + '-content">' +
			'<div class="intro">'+
			'</div>'+
		'</div>';
		pages[id] = domString;
		parentSection.append(domString);
	};

	ContentPage.addSlides = function (id) {

	};

	return ContentPage;
}());