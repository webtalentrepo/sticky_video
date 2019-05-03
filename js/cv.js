/*!
 * Sticky Video 2.1.0
 * http://stickyvideo.octave.systems/
 * GPL-2.0 - http://www.gnu.org/licenses/gpl-2.0.txt
 */

window.cornerVideo = window.cornerVideo || {};

(function(){

    //------------------------------------------------------------
    // Global vars
    //------------------------------------------------------------

    var DOM_video, DOM_videoTag, DOM_placeholder, DOM_closeButton, DOM_player,
        videoComputedStyle,
        DOM_rootOuterContainer,
        topOffsetTrigger,
        boundingClientRect,
        cornerVideoFinalHeight, cornerVideoFinalWidth, cornerVideoVerticalOffset, cornerVideoSideOffset,
        originalOuterWidth, originalOuterHeight,
        originalInnerWidth, originalInnerHeight,
        originalWidthAttr, originalHeightAttr,
        originalVideoTagWidthAttr, originalVideoTagHeightAttr, originalVideoTagStyleAttr,
        originalStyleAttr, originalCssPosition, originalPlaceholderStyleAttr, originalMejsStyleAttr,
        placeholderForcedHeight, placeholderForcedWidth,
        currentWindowWidth, currentWindowHeight, isMobileMQ,
        fn_checkStickynessOnScroll, fn_checkStickynessOnResize,
        isVideoSticky = false,
        videoType = 'none', playerHandler = null,
        supportedPlayersQuerySelector = '', player_i,
        _emptyFunction = function(){}, _returnFalseFunction = function(){ return false; }
    ;

    var rAF =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        null
    ;

    var dom_matches =
        document.body.matches ? 'matches' :
        document.body.webkitMatchesSelector ? 'webkitMatchesSelector' :
        document.body.mozMatchesSelector ? 'mozMatchesSelector' :
        document.body.msMatchesSelector ? 'msMatchesSelector' :
        null
    ;

    //------------------------------------------------------------
    // Supported <iframe> sources
    //------------------------------------------------------------

    var iframeEmbedServ = {
        youtube: /^(http[s]?:\/\/|\/\/)?(www\.)?youtube\.com\/embed\//,
        vimeo: /^(http[s]?:\/\/|\/\/)?player\.vimeo\.com\/video\//,
        facebook: /^(http[s]?:\/\/|\/\/)?(www\.)?facebook\.com\/plugins\/video\.php/,
        twitch: /^(http[s]?:\/\/|\/\/)?player\.twitch\.tv\//,
        brightcove: /^(http[s]?:\/\/|\/\/)?players\.brightcove\.net\//,
        jwplatform: /^(http[s]?:\/\/|\/\/)?content\.jwplatform\.com\/players\//,
        dailymotion: /^(http[s]?:\/\/|\/\/)?(www\.)?dailymotion\.com\/embed\/video\//,
        youku: /^(http[s]?:\/\/|\/\/)?(player\.)?youku\.com\/embed\//,
        tudou: /^(http[s]?:\/\/|\/\/)?(www\.)?tudou\.com\/programs\/view\/html5embed/,
        wistia: /^(http[s]?:\/\/|\/\/)?(fast\.|www\.)?wistia\.(net|com)\/embed\/iframe\//,
        schooltube: /^(http[s]?:\/\/|\/\/)?(www\.)?schooltube\.com\/embed_force\//,
        break: /^(http[s]?:\/\/|\/\/)?(www\.)?break\.com\/embed\//,
        metacafe: /^(http[s]?:\/\/|\/\/)?(www\.)?metacafe\.com\/embed\//,
        liveleak: /^(http[s]?:\/\/|\/\/)?(www\.)?liveleak\.com\/ll_embed\?/,
        archive: /^(http[s]?:\/\/|\/\/)?(www\.)?archive\.org\/embed\//
    };

    //------------------------------------------------------------
    // Supported players
    //------------------------------------------------------------

    var playerHandlers = {

        // https://github.com/mediaelement/mediaelement/blob/master/docs/api.md
        // however note that some api functions are, strangely, not included here (see setControlsSize)
        wpVideo:{
            selector: '.wp-video',
            init: function(){
                DOM_videoTag = DOM_video.querySelector('video');
                DOM_player = DOM_video.querySelector('.mejs-video');
            },
            preStickyness: function(){
                originalVideoTagWidthAttr = DOM_videoTag.getAttribute('width');
                originalVideoTagHeightAttr = DOM_videoTag.getAttribute('height');
                originalVideoTagStyleAttr = DOM_videoTag.getAttribute('style');
                if( DOM_player ){ // do not remove, in certain cases mejs is not used
                    originalMejsStyleAttr = DOM_player.getAttribute('style');
                }
            },
            preFinalPositioning: function(){
                DOM_videoTag.removeAttribute('width');
                DOM_videoTag.removeAttribute('height');
                // Needed if the theme doesn't set video{ max-width:100%; }
                DOM_videoTag.style.setProperty('max-width', '100%', 'important');
            },
            preTransitioning: function(){
                if( DOM_player ){ // do not remove, in certain cases mejs is not used
                    mejs.players[ DOM_player.id ].setPlayerSize(cornerVideoFinalWidth, cornerVideoFinalHeight);
                    mejs.players[ DOM_player.id ].setControlsSize();
                }
            },
            resetStickyness: function(){
                DOM_videoTag.setAttribute('style', originalVideoTagStyleAttr);
                DOM_videoTag.setAttribute('width', originalVideoTagWidthAttr);
                DOM_videoTag.setAttribute('height', originalVideoTagHeightAttr);
            },
            preResetTransitioning: function(){
                if( DOM_player ){ // do not remove, in certain cases mejs is not used
                    mejs.players[ DOM_player.id ].setPlayerSize();
                    mejs.players[ DOM_player.id ].setControlsSize();
                }
            },
            isVideoPaused: function(){
                return DOM_videoTag.paused;
            }
        },

        jwplayer:{
            selector: '.jwplayer',
            init: _emptyFunction,
            preStickyness: _emptyFunction,
            preFinalPositioning: _emptyFunction,
            preTransitioning: _emptyFunction,
            resetStickyness: _emptyFunction,
            preResetTransitioning: _emptyFunction,
            isVideoPaused: _returnFalseFunction // no support yet
        },

        wistia:{ // https://wistia.com/doc/player-api
            selector: '.wistia_embed',
            init: _emptyFunction,
            preStickyness: function(){
                // Note: better keep this initialization here, and not inside "init", cuz at the time
                // init executes the video might not have been initialized (due to async)
                // Also note that "!DOM_player" prevents multiple initializations
                if( !DOM_player && Wistia && Wistia.api ) DOM_player = Wistia.api( DOM_video.id );
            },
            preFinalPositioning: _emptyFunction,
            preTransitioning: function(){
                if( DOM_player ){
                    DOM_player.videoHeight( cornerVideoFinalHeight );
                    DOM_player.videoWidth( cornerVideoFinalWidth );
                }
            },
            resetStickyness: _emptyFunction,
            preResetTransitioning: function(){
                if( DOM_player ){
                    DOM_player.videoHeight( originalOuterHeight );
                    DOM_player.videoWidth( originalOuterWidth );
                }
            },
            isVideoPaused: function(){
                // Gotta duplicate initialization here cuz "isVideoPaused" is fired before "preStickyness"
                if( !DOM_player && Wistia && Wistia.api ) DOM_player = Wistia.api( DOM_video.id );
                return DOM_player && DOM_player.state() !== 'playing';
            }
        },

        // IMPORTANT: keep this as last! needed to keep the "video" selector last so
        // it has less priority when executing querySelector, infact, players could have
        // <video> tags inside themselves
        html5:{
            selector: 'video',
            init: _emptyFunction,
            preStickyness: _emptyFunction,
            preFinalPositioning: function(){
                // Needed if the theme doesn't set video{ max-width:100%; }
                // Also note that here the dom used is "DOM_video", in .wp-video is "DOM_videoTag"
                DOM_video.style.setProperty('max-width', '100%', 'important');
            },
            preTransitioning: _emptyFunction,
            resetStickyness: _emptyFunction,
            preResetTransitioning: _emptyFunction,
            isVideoPaused: function(){
                return DOM_video.paused;
            }
        }

    };

    //------------------------------------------------------------
    // Init
    //------------------------------------------------------------

    function init(){ // Important: this must be run on window.load

        // --------- Compatibility check --------- //

        if(
            !window.addEventListener ||
            !window.getComputedStyle ||
            !dom_matches ||
            !rAF
        ) return;

        // --------- Vars init --------- //

        for( player_i in playerHandlers ){
            supportedPlayersQuerySelector += // note: html5 is the last case, so don't append ","
                playerHandlers[ player_i ].selector + ( player_i === 'html5' ? '' : ',' );
        }

        // --------- Dom init --------- //

        selectVideo();
        if( videoType === 'none' ) return;

        createVideoPlaceholder();

        DOM_video.style.willChange = 'position, transform, opacity';
        DOM_video.setAttribute('data-sticky-video-state', 'ready');

        // --------- On window resize --------- //

        currentWindowWidth = document.documentElement.clientWidth;
        currentWindowHeight = window.innerHeight || document.documentElement.clientHeight;
        isMobileMQ = (currentWindowWidth <= window.cornerVideo.params['mobile-breakpoint']);
        var _onWindowResize = function(){
            currentWindowWidth = document.documentElement.clientWidth;
            currentWindowHeight = window.innerHeight || document.documentElement.clientHeight;
            isMobileMQ = (currentWindowWidth <= window.cornerVideo.params['mobile-breakpoint']);
            checkStickyness();
        };
        var _wait2;
        fn_checkStickynessOnResize = function(){
            clearTimeout(_wait2);
            _wait2 = setTimeout(_onWindowResize, 100);
        };
        window.addEventListener('resize', fn_checkStickynessOnResize);

        // --------- On scroll + initial check --------- //

        checkStickyness();
        var _wait;
        fn_checkStickynessOnScroll = function(){
            clearTimeout(_wait);
            _wait = setTimeout(checkStickyness, 50);
        };
        window.addEventListener('scroll', fn_checkStickynessOnScroll );

    }

    //------------------------------------------------------------
    // Select video
    //------------------------------------------------------------

    function selectVideo(){

        // --------- Forced Stickiness (if set) --------- //

        if( typeof window.cornerVideo.params['forced-selector'] == 'string' ){

            DOM_video = document.querySelector( window.cornerVideo.params['forced-selector'] );

            if( DOM_video ){
                videoType = 'forced';
                return;
            }

        }

        // --------- Select the targeted video --------- //

        DOM_rootOuterContainer = document.body; // default value, used by the "auto-select" method later on

        if( window.cornerVideo.params['selecting-method'] === 'class' ){

            DOM_video = document.querySelector('.forced-sticky-video'); // special forced case
            if( DOM_video ){
                videoType = 'forced';
                return;
            }

            DOM_video = document.querySelector('.sticky-video');

            if( !DOM_video ){
                // If no ".sticky-video" was found, the ".contains-sticky-video" selection process
                // is common to the "auto-select" one (see code later on)
                DOM_rootOuterContainer = document.querySelector('.contains-sticky-video');
                if( !DOM_rootOuterContainer ) return; // no sticky classes have been found at all, do not proceed
            }

        }

        if( !DOM_video ){ // Either the "auto-select" or the ".contains-sticky-video" methods (common process)

            DOM_video = DOM_rootOuterContainer.querySelector( supportedPlayersQuerySelector );
            if( !DOM_video )
                DOM_video = DOM_rootOuterContainer.getElementsByTagName('iframe');

            if(
                !DOM_video ||
                DOM_video.length === 0 // "getElementsByTagName" returns always an array
            ) return; // no sticky-video have been detected at all

        }

        // --------- Detect video type --------- //

        // Few notes:
        // - At this point "DOM_video" is surely set as a valid dom or a set of doms (e.g. iframes)
        // - "typeof DOM_video.tagName" is always checked cause DOM_video could also be a collection
        //   from "getElementsByTagName"
        // - if <iframe>s were selected, it's not sure whether they are videos or something else
        //   (e.g. social network stuff); this check will be done later on
        // - if no valid case was found, videoType will remain === 'none'

        // Player embed
        if(
            typeof DOM_video.tagName === 'string' &&
            DOM_video.tagName.toLowerCase() !== 'iframe'
        ){

            for( player_i in playerHandlers ){

                if( DOM_video[ dom_matches ]( playerHandlers[ player_i ].selector ) ){
                    videoType = 'player';
                    playerHandler = playerHandlers[ player_i ];
                    playerHandler.init();
                    return; // == break
                }

            }

        }

        // <iframe> embed
        else {

            if( // ".sticky-video" case: single dom
                typeof DOM_video.tagName === 'string' &&
                DOM_video.tagName.toLowerCase() === 'iframe'
            ) DOM_video = [ DOM_video ]; // gotta make it iterable for the next for-loop

            var src, i;

            for( i = 0; i < DOM_video.length; i++ ){

                src = DOM_video[i].getAttribute('src');

                if( typeof src !== 'string' ) continue;

                for( var serviceID in iframeEmbedServ ){
                    if( iframeEmbedServ[serviceID].test( src ) ){
                        videoType = 'iframe';
                        DOM_video = DOM_video[i];
                        return; // == break
                    }
                }

            }

        }

    }

    //------------------------------------------------------------
    // Check stickyness
    //------------------------------------------------------------

    function checkStickyness(){

        if( !window.cornerVideo.params['enable-on-mobile'] && isMobileMQ ){ // Mobile check
            if(isVideoSticky) resetStickyness();
            return;
        }
        
        if (window.localStorage.getItem('clickedClose') === 'true') {
	        if(isVideoSticky) resetStickyness();
        	return;
        }

        topOffsetTrigger = (isVideoSticky ? DOM_placeholder : DOM_video).getBoundingClientRect().top + (window.scrollY || window.pageYOffset);

        if(
            !isVideoSticky &&
            (window.scrollY || window.pageYOffset) > topOffsetTrigger && // Do not set ">=", some browsers on video-full-screen set the same offset so the stickyness is falsely triggered
            topOffsetTrigger !== 0 // Some browsers on video-full-screen move the video on top + sroll to top, so the stickyness is falsely triggered
        ){

            if( // Pause check
                !window.cornerVideo.params['enable-on-pause'] &&
                playerHandler && playerHandler.isVideoPaused()
            ) return;

            if( rAF ) rAF(applyStickyness); // very important: prevents weird animation jumps if the scroll is quick
            else applyStickyness();

        } else if( isVideoSticky && ((window.scrollY || window.pageYOffset) < topOffsetTrigger) ) {
            if( rAF ) rAF(resetStickyness);
            else resetStickyness();
        }

    }

    //------------------------------------------------------------
    // Apply stickyness
    //------------------------------------------------------------

    function applyStickyness(){

        // --------- Get original video's dimension and position --------- //
        // Note: it's a good idea to keep the "heavy" calculations at the top and cache the results, this in order to avoid unwanted repaints by the browser (for example, repaints between the fixed positioning and the rendering of the placeholder would cause a "jump" of the page's height)

        videoComputedStyle = window.getComputedStyle(DOM_video);

        boundingClientRect = DOM_video.getBoundingClientRect();

        originalOuterWidth = parseInt(videoComputedStyle.getPropertyValue('width'));
        originalOuterHeight = parseInt(videoComputedStyle.getPropertyValue('height'));
        originalInnerWidth = DOM_video.clientWidth;
        originalInnerHeight = DOM_video.clientHeight;
        originalWidthAttr = DOM_video.getAttribute('width');
        originalHeightAttr = DOM_video.getAttribute('height');
        originalStyleAttr = DOM_video.getAttribute('style');
        originalCssPosition = videoComputedStyle.getPropertyValue('position');

        if( playerHandler ) playerHandler.preStickyness();

        originalPlaceholderStyleAttr = DOM_placeholder.getAttribute('style');
        placeholderForcedHeight = (
            originalOuterHeight +
            parseInt(videoComputedStyle.getPropertyValue('margin-top')) +
            parseInt(videoComputedStyle.getPropertyValue('margin-bottom'))
        );
        placeholderForcedWidth = (
            originalOuterWidth +
            parseInt(videoComputedStyle.getPropertyValue('margin-left')) +
            parseInt(videoComputedStyle.getPropertyValue('margin-right'))
        );

        cornerVideoFinalWidth = window.cornerVideo.params['video-width' + (isMobileMQ?'-mobile':'')];
        cornerVideoFinalHeight = (cornerVideoFinalWidth/originalOuterWidth)*originalOuterHeight;
        cornerVideoVerticalOffset = window.cornerVideo.params['position-vertical-offset' + (isMobileMQ?'-mobile':'')];
        cornerVideoSideOffset = window.cornerVideo.params['position-side-offset' + (isMobileMQ?'-mobile':'')];

        // --------- Apply final sticky position --------- //
        // Note: the final position is applied right away, however CSS transform/opacity is used to animate the transitioning

        // Need to reset the width/height attributes cause in some iframes ther're interfering
        DOM_video.removeAttribute('width');
        DOM_video.removeAttribute('height');

        if( playerHandler ) playerHandler.preFinalPositioning();
        if (window.cornerVideo.params["transition-type"] === 'fade' || window.cornerVideo.params["transition-type"] === 'fadein') {
            DOM_video.style.setProperty('opacity', '0');
        }
        DOM_video.style.setProperty('margin', '0', 'important');
        //
        DOM_video.style.setProperty('width', cornerVideoFinalWidth + 'px', 'important');
        DOM_video.style.setProperty('height', cornerVideoFinalHeight + 'px', 'important');
        // console.log(window.cornerVideo.params['video-position']);
        //reset dom video position
        switch (window.cornerVideo.params["video-position"]) {
            case 'top':
                DOM_video.style.setProperty('top', cornerVideoVerticalOffset + 'px', 'important');
                DOM_video.style.setProperty('right', 'auto', 'important');
                DOM_video.style.setProperty('bottom', 'auto', 'important');
                DOM_video.style.setProperty('left', Math.round((currentWindowWidth - cornerVideoFinalWidth) / 2) + 'px', 'important');
                break;
            case 'bottom':
                DOM_video.style.setProperty('top', 'auto');
                DOM_video.style.setProperty('right', 'auto');
                DOM_video.style.setProperty('bottom', cornerVideoVerticalOffset + 'px', 'important');
                DOM_video.style.setProperty('left', Math.round((currentWindowWidth - cornerVideoFinalWidth) / 2) + 'px', 'important');
                break;
            case 'right':
                DOM_video.style.setProperty('top', Math.round((currentWindowHeight - cornerVideoFinalHeight) / 2) - 20 + 'px', 'important');
                DOM_video.style.setProperty('right', cornerVideoSideOffset + 'px', 'important');
                DOM_video.style.setProperty('bottom', 'auto');
                DOM_video.style.setProperty('left', 'auto');
                break;
            case 'left':
                DOM_video.style.setProperty('top', Math.round((currentWindowHeight - cornerVideoFinalHeight) / 2) - 20 + 'px', 'important');
                DOM_video.style.setProperty('right', 'auto');
                DOM_video.style.setProperty('bottom', 'auto');
                DOM_video.style.setProperty('left', cornerVideoSideOffset + 'px', 'important');
                break;
            case 'middle':
                DOM_video.style.setProperty('top', Math.round((currentWindowHeight - cornerVideoFinalHeight) / 2) - 20 + 'px', 'important');
                DOM_video.style.setProperty('right', 'auto');
                DOM_video.style.setProperty('bottom', 'auto');
                DOM_video.style.setProperty('left', Math.round((currentWindowWidth - cornerVideoFinalWidth) / 2) + 'px', 'important');
                break;
            case 'top-left':
            case 'top-right':
                DOM_video.style.setProperty('top', cornerVideoVerticalOffset + 'px', 'important');
                DOM_video.style.setProperty('bottom', 'auto');
                DOM_video.style.setProperty(
                    window.cornerVideo.params['video-position'].indexOf('-left') !== -1 ? 'left' : 'right',
                    cornerVideoSideOffset + 'px', 'important'
                );
                DOM_video.style.setProperty(
                    window.cornerVideo.params['video-position'].indexOf('-left') !== -1 ? 'right' : 'left',
                    'auto', 'important'
                );
                break;
            case 'bottom-left':
            case 'bottom-right':
                DOM_video.style.setProperty('bottom', cornerVideoVerticalOffset + 'px', 'important');
                DOM_video.style.setProperty('top', 'auto');
                DOM_video.style.setProperty(
                    window.cornerVideo.params['video-position'].indexOf('-left') !== -1 ? 'left' : 'right',
                    cornerVideoSideOffset + 'px', 'important'
                );
                DOM_video.style.setProperty(
                    window.cornerVideo.params['video-position'].indexOf('-left') !== -1 ? 'right' : 'left',
                    'auto', 'important'
                );
                break;
        }
    
        DOM_video.style.setProperty('position', 'fixed', 'important');

        // --------- Apply placeholder --------- //
        // Note: Some videos might be in position:absolute, for example some outer container might force a fixed aspect ratio via padding-bottom; in this case the placeholder is not needed.

        if( originalCssPosition !== 'absolute' ){
            DOM_placeholder.style.height = placeholderForcedHeight + 'px';
            DOM_placeholder.style.maxWidth = placeholderForcedWidth + 'px';
        } else {
            DOM_placeholder.style.height = '100%';
            DOM_placeholder.style.position = 'absolute';
        }


        // --------- Pre transitioning --------- //

        if( playerHandler ) playerHandler.preTransitioning();

        // --------- Pre-init-transition refresh --------- //

        DOM_video.setAttribute('data-sticky-video-state', 'sticky');

        DOM_video.parentNode.offsetWidth; // Needed!

        DOM_video.style.setProperty('z-index', '999999', 'important');

        DOM_video.style.border = window.cornerVideo.params['border-width'] + 'px ' + window.cornerVideo.params['border-line'] + ' ' + window.cornerVideo.params['border-color'];
        DOM_video.style['box-shadow'] = window.cornerVideo.params['box-shadow-x'] + 'px ' + window.cornerVideo.params['box-shadow-y'] + 'px ' + window.cornerVideo.params['box-shadow-blur'] + 'px ' + window.cornerVideo.params['box-shadow-color'];



        // --------- End --------- //


        isVideoSticky = true;

    }

    //------------------------------------------------------------
    // Reset stickyness
    //------------------------------------------------------------

    function resetStickyness(){

        // --------- Inits --------- //


        // --------- Restore original video's dimension and position --------- //

        DOM_video.setAttribute('style', originalStyleAttr);
        DOM_video.setAttribute('width', originalWidthAttr);
        DOM_video.setAttribute('height', originalHeightAttr);

        if( playerHandler ) playerHandler.resetStickyness();

        DOM_placeholder.setAttribute('style', originalPlaceholderStyleAttr);


        // --------- Pre reset transitioning --------- //

        if( playerHandler ) playerHandler.preResetTransitioning();

        // --------- Pre-init-transition refresh --------- //

        DOM_video.setAttribute('data-sticky-video-state', 'ready');

        DOM_video.parentNode.offsetWidth; // Needed!


        // --------- End --------- //


        isVideoSticky = false;

    }

    //------------------------------------------------------------
    // Video placeholder handlers
    //------------------------------------------------------------

    function createVideoPlaceholder(){

        DOM_video.insertAdjacentHTML('beforebegin', '<div id="sticky-video--placeholder"></div>');
        DOM_placeholder = document.getElementById('sticky-video--placeholder');

    }


    //------------------------------------------------------------
    // Public API
    //------------------------------------------------------------

    window.cornerVideo.init = init;

}());
