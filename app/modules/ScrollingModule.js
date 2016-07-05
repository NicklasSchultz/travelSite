"use strict";
/*globals $:false */
var ScrollingModule = (function() { // jshint ignore:line
	var Scroller = {};

	Scroller.init = function(anchors, afterSlideLoad) {
		$('#fullpage').fullpage({
            anchors: anchors,
            sectionsColor: ['#4A6FB1', '#939FAA', '#323539'],
            scrollOverflow: true,
            scrollOverflowOptions: {
                scrollbars: true,
                mouseWheel: true,
                hideScrollbars: false,
                fadeScrollbars: false,
                disableMouse: true,
                loopHorizontal: false
            },
            afterSlideLoad: afterSlideLoad
		});
	};
	return Scroller;
}());