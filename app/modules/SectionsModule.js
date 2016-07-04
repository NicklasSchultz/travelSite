"use strict";
var SectionsModule = (function() { // jshint ignore:line
	var Section = {};

	Section.createSection = function(dbEntry) {
		var domString =
		'<div class="section" id="' + dbEntry.id + '">' +
		'</div>';
		return domString;
	};
	return Section;
}());