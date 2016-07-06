"use strict";
/*globals $:false */
$(document).ready(function() {
    // Set static vars
    var mainContentDiv = $('#fullpage'),
        fullpageObject = $.fn.fullpage,
        anchors = ['welcomePage'],
        ANCHOR_TO_ID = {},
        contentLoaded = {};

    // Setup the differnet secitons(Trips)
    initSections();

    // Init the fullpage.js plugin (skit i denna camilla)
    function setupFullpageJS() {
        anchors.push('lastPage');
        ScrollingModule.init(anchors, afterSlideLoad); // jshint ignore:line
    }

    function afterSlideLoad(anchorLink, index, slideAnchor, slideIndex) {
        if (anchorLink == 'dominikanskaPage' && slideIndex == 1) {
            fullpageObject.setAllowScrolling(false);
            fullpageObject.setKeyboardScrolling(false, 'down');
            fullpageObject.setKeyboardScrolling(false, 'up');
        } else {
            fullpageObject.setAllowScrolling(true);
            fullpageObject.setKeyboardScrolling(true, 'down');
            fullpageObject.setKeyboardScrolling(true, 'up');
        }
        if (anchorLink === 'dominikanskaPage' && slideIndex === 0) {
            $('div.fp-controlArrow.fp-next').show();
            $('div.fp-controlArrow.fp-prev').hide();
        } else if (anchorLink == 'dominikanskaPage' && slideIndex == 1) {
            $('div.fp-controlArrow.fp-next').hide();
            $('div.fp-controlArrow.fp-prev').show();
        }
        if (anchorLink === 'indonesienPage' && slideIndex == 1) {
            fullpageObject.setAllowScrolling(false);
            fullpageObject.setKeyboardScrolling(false, 'right');
            fullpageObject.setKeyboardScrolling(false, 'left');
        } else {
            fullpageObject.setAllowScrolling(true);
            fullpageObject.setKeyboardScrolling(true, 'right');
            fullpageObject.setKeyboardScrolling(true, 'left');
        }
        if (slideIndex == 1 && !contentLoaded[anchorLink]) {
            getContentPage(anchorLink);
            contentLoaded[anchorLink] = true;
            fullpageObject.setAllowScrolling(false);
            fullpageObject.setKeyboardScrolling(false, 'right');
            fullpageObject.setKeyboardScrolling(false, 'left');
        } else {
            fullpageObject.setAllowScrolling(true);
            fullpageObject.setKeyboardScrolling(true, 'right');
            fullpageObject.setKeyboardScrolling(true, 'left');
        }
    }

    // Denna funktion skapar alla sections (alla olika resor)
    function initSections() {
        getSections().then(function(sections) {
            var i = 0, // index
                nrOfSections = sections.length,
                section = null;
            // Loop through all sections and create a setion for each section
            for (i; i < nrOfSections; i++) {
                ANCHOR_TO_ID[sections[i].name + 'Page'] = sections[i].id;
                anchors.push(sections[i].name + 'Page'); // Push the section name to the anchors for fullpage (Ignorera camilla)
                // Skapa en section
                section = SectionsModule.createSection(sections[i]); // jshint ignore:line
                mainContentDiv.append(section); // Add section to the DOM (Lägger till section elementet i själva html)
                ContentModule.addContentPage(sections[i].id + '-slide', sections[i].name, sections[i].id); // jshint ignore:line
            }
            // When sections is setup init the fullpage plugin
            setupFullpageJS();
        });

    }

    function getContentPage(anchor) {
        var id = ANCHOR_TO_ID[anchor];
        Api.getContentPage({ // jshint ignore:line
            id: id
        }).then(function(contentHtml) {
            setContentInformation(contentHtml, id);
        });
    }

    function setContentInformation(innerHtml, id) {
        var parent = document.getElementById(id + '-slide-content');
        var childElement = parent.children[0].children[0];
        var newElement = document.createElement('div');
        newElement.innerHTML = innerHtml;
        childElement.appendChild(newElement);
        fullpageObject.reBuild();
        setTimeout(function() {
            $('.slider-big').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.slider-nav'
            });
            $('.slider-nav').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: '.slider-big',
                dots: true,
                centerMode: true,
                focusOnSelect: true
            });
            $('.slider-nav').on('afterChange', function(event, slick, currentSlide){
              console.log(currentSlide);
            });
            fullpageObject.reBuild();
        }, 1000);
    }

    // Gets the sections from the server
    function getSections() {
        return Api.getSections(null); // jshint ignore:line
    }
});