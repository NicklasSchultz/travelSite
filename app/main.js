"use strict";
/*globals $:false */
$(document).ready(function() {
    // Set static vars
    var mainContentDiv = $('#fullpage'),
        fullpageObject = $.fn.fullpage,
        anchors = ['welcomePage'],
        ANCHOR_TO_ID = {};

    // Setup the differnet secitons(Trips)
    initSections();

    // Init the fullpage.js plugin (skit i denna camilla)
    function setupFullpageJS() {
        anchors.push('lastPage');
        mainContentDiv.fullpage({
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
            afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
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
                if (anchorLink === 'IndonesienPage' && slideIndex == 1) {
                    getContentPage(anchorLink);
                    fullpageObject.setAllowScrolling(false);
                    fullpageObject.setKeyboardScrolling(false, 'right');
                    fullpageObject.setKeyboardScrolling(false, 'left');
                } else {
                    fullpageObject.setAllowScrolling(true);
                    fullpageObject.setKeyboardScrolling(true, 'right');
                    fullpageObject.setKeyboardScrolling(true, 'left');
                }
            }
        });
    }

    // Denna funktion skapar alla sections (alla olika resor)
    function initSections() {
        getSections().then(function(sections) {
            /* var sections = [{
                 id: 'dominikanska',
                 name: 'Dominikanska',
                 img: 'app/images/dominikanska.jpg',
                 texts: 'Dominikanska Rupubliken'
             }, {
                 id: 'thailand',
                 name: 'Thailand',
                 img: 'app/images/thailand.jpg',
                 texts: 'Thailand'
             }, {
                 id: 'indonesien',
                 name: 'Indonesien',
                 img: 'app/images/indonesien.jpg',
                 texts: 'indonesien'
             }];*/

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

            //getContentPage('dominikanska');
            setupFullpageJS();
        });

    }

    function getContentPage(anchor) {
        var id = ANCHOR_TO_ID[anchor];
        Api.getContentPage({ // jshint ignore:line
            id: id
        }).then(function (contentHtml) {
            setContentInformation(contentHtml);
        });
    }

    function setContentInformation(innerHtml) {
        var parent = document.getElementById('indonesien-slide-content');
        var childElement = parent.children[0].children[0];
        var newElement = document.createElement('div');
        newElement.innerHTML = innerHtml;
        childElement.appendChild(newElement);
        fullpageObject.reBuild();
    }

    // Gets the sections from the server
    function getSections() {
        return Api.getSections(null); // jshint ignore:line
    }
});