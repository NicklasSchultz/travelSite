$(document).ready(function() {
	$('#fullpage').fullpage({
		anchors: ['welcomePage', 'dominikanskaPage', 'thailandPage', 'indonesienPage', 'lastPage'],
		sectionsColor: ['#4A6FB1', '#939FAA', '#323539'],
		scrollOverflow: true,
		scrollOverflowOptions: {
			scrollbars: true,
	        mouseWheel: true,
	        hideScrollbars: false,
	        fadeScrollbars: false,
	        disableMouse: true
		},
		afterLoad: function(anchorLink, index){
            var loadedSection = $(this);
            //using index
            if(index == 3){
                alert("Section 3 ended loading");
            }

            //using anchorLink
            if(anchorLink == 'secondSlide'){
                alert("Section 2 ended loading");
            }
        },
        afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex){
            var loadedSlide = $(this);
            //first slide of the second section
            if(anchorLink == 'dominikanskaPage' && slideIndex == 1){
            	$.fn.fullpage.setAllowScrolling(false);
            	$.fn.fullpage.setKeyboardScrolling(false, 'down');
            	$.fn.fullpage.setKeyboardScrolling(false, 'up');
                var importTag = document.createElement('link');
				importTag.setAttribute('rel', 'import');
				importTag.setAttribute('href', 'app/views/dominikanska.html');
				loadedSlide[0].appendChild(importTag);
            } else {
            	$.fn.fullpage.setAllowScrolling(true);
            	$.fn.fullpage.setKeyboardScrolling(true, 'down');
            	$.fn.fullpage.setKeyboardScrolling(true, 'up');
            }

            //second slide of the second section (supposing #secondSlide is the
            //anchor for the second slide
            if(index == 2 && slideIndex == 'secondSlide'){
                alert("Second slide loaded");
            }
        }
	});
});