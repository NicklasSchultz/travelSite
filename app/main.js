"use strict";
$(document).ready(function() {
    var xhttp = new XMLHttpRequest(),
        sections;
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            sections =JSON.parse(xhttp.responseText);
            console.error(sections);
        }
    };
    xhttp.open("GET", "/sections", true);
    xhttp.send();


    $('#fullpage').fullpage({
        anchors: ['welcomePage', 'dominikanskaPage', 'thailandPage', 'indonesienPage', 'lastPage'],
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
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
            if (anchorLink == 'dominikanskaPage' && slideIndex == 1) {
                $.fn.fullpage.setAllowScrolling(false);
                $.fn.fullpage.setKeyboardScrolling(false, 'down');
                $.fn.fullpage.setKeyboardScrolling(false, 'up');
            } else {
                $.fn.fullpage.setAllowScrolling(true);
                $.fn.fullpage.setKeyboardScrolling(true, 'down');
                $.fn.fullpage.setKeyboardScrolling(true, 'up');
            }
            if (anchorLink === 'dominikanskaPage' && slideIndex === 0) {
                $('div.fp-controlArrow.fp-next').show();
                $('div.fp-controlArrow.fp-prev').hide();
            } else if (anchorLink == 'dominikanskaPage' && slideIndex == 1) {
                $('div.fp-controlArrow.fp-next').hide();
                $('div.fp-controlArrow.fp-prev').show();
            }
        }
    });
});