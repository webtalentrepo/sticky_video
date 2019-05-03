(function () {
	var DOM_video, DOM_videoTag, DOM_placeholder, DOM_player,
		DOM_rootOuterContainer,
		topOffsetTrigger,
		originalVideoTagWidthAttr, originalVideoTagHeightAttr, originalVideoTagStyleAttr,
		originalMejsStyleAttr,
		showVid = true,
		videoType = 'none', playerHandler = null,
		supportedPlayersQuerySelector = '', player_i,
		_emptyFunction = function () {
		}, _returnFalseFunction = function () {
			return false;
		},
		currentWindowWidth = document.documentElement.clientWidth,
		currentWindowHeight = window.innerHeight || document.documentElement.clientHeight,
		isMobileMQ = (currentWindowWidth <= window.cornerVideo.params['mobile-breakpoint']),
		cornerVideoFinalWidth = window.cornerVideo.params['video-width' + (isMobileMQ ? '-mobile' : '')],
		videoComputedStyle = null,
		originalOuterWidth = 0,
		originalOuterHeight = 0,
		cornerVideoFinalHeight = 100,
		cornerVideoVerticalOffset = window.cornerVideo.params['position-vertical-offset' + (isMobileMQ ? '-mobile' : '')],
		cornerVideoSideOffset = window.cornerVideo.params['position-side-offset' + (isMobileMQ ? '-mobile' : '')],
		originalWidthAttr = '',
		originalHeightAttr = '',
		originalStyleAttr = '',
		clickedClose = false;
	// window.cornerVideo.params['enable-close-button'] = true;
	if (window.cornerVideo.params['enable-cta'] === undefined) {
		window.cornerVideo.params['enable-cta'] = false;//true
		// window.cornerVideo.params['enable-cta'] = true;//true
		window.cornerVideo.params['cta-color'] = '#000000';
		window.cornerVideo.params['cta-text-color'] = '#ffffff';
		window.cornerVideo.params['cta-border-radius'] = 6;
		window.cornerVideo.params['cta-border-width'] = 0;
		window.cornerVideo.params['cta-border-line'] = 'solid';
		window.cornerVideo.params['cta-border-color'] = 'black';
		window.cornerVideo.params['cta-box-shadow-x'] = 0;
		window.cornerVideo.params['cta-box-shadow-y'] = 0;
		window.cornerVideo.params['cta-box-shadow-blur'] = 16;
		window.cornerVideo.params['cta-box-shadow-color'] = '#000088';
		window.cornerVideo.params['cta-text'] = 'Buy Now';
		window.cornerVideo.params['cta-url'] = 'https://clickperfect.com';
		window.cornerVideo.params['cta-target'] = 'new-window';//none
		window.cornerVideo.params['cta-font-size'] = 24;//none
		window.cornerVideo.params['cta-padding'] = 16;//none
		window.cornerVideo.params['cta-margin'] = 0;//none
		window.cornerVideo.params['cta-close-margin'] = 4;//none
		window.cornerVideo.params['cta-font'] = 'Poppins';//none
		window.cornerVideo.params['cta-color2'] = '#0398d3';//none
	}
	
	var dom_matches =
		document.body.matches ? 'matches' :
			document.body.webkitMatchesSelector ? 'webkitMatchesSelector' :
				document.body.mozMatchesSelector ? 'mozMatchesSelector' :
					document.body.msMatchesSelector ? 'msMatchesSelector' :
						null;
	
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
		wpVideo: {
			selector: '.wp-video',
			init: function () {
				DOM_videoTag = DOM_video.querySelector('video');
				DOM_player = DOM_video.querySelector('.mejs-video');
			},
			preStickyness: function () {
				originalVideoTagWidthAttr = DOM_videoTag.getAttribute('width');
				originalVideoTagHeightAttr = DOM_videoTag.getAttribute('height');
				originalVideoTagStyleAttr = DOM_videoTag.getAttribute('style');
				if (DOM_player) { // do not remove, in certain cases mejs is not used
					originalMejsStyleAttr = DOM_player.getAttribute('style');
				}
			},
			preFinalPositioning: function () {
				DOM_videoTag.removeAttribute('width');
				DOM_videoTag.removeAttribute('height');
				DOM_videoTag.style.setProperty('max-width', '100%', 'important');
			},
			preTransitioning: function () {
				if (DOM_player) { // do not remove, in certain cases mejs is not used
					mejs.players[DOM_player.id].setPlayerSize(cornerVideoFinalWidth, cornerVideoFinalHeight);
					mejs.players[DOM_player.id].setControlsSize();
				}
			},
			resetStickyness: function () {
				DOM_videoTag.setAttribute('style', originalVideoTagStyleAttr);
				DOM_videoTag.setAttribute('width', originalVideoTagWidthAttr);
				DOM_videoTag.setAttribute('height', originalVideoTagHeightAttr);
			},
			preResetTransitioning: function () {
				if (DOM_player) { // do not remove, in certain cases mejs is not used
					mejs.players[DOM_player.id].setPlayerSize();
					mejs.players[DOM_player.id].setControlsSize();
				}
			},
			isVideoPaused: function () {
				return DOM_videoTag.paused;
			}
		},
		
		jwplayer: {
			selector: '.jwplayer',
			init: _emptyFunction,
			preStickyness: _emptyFunction,
			preFinalPositioning: _emptyFunction,
			preTransitioning: _emptyFunction,
			resetStickyness: _emptyFunction,
			preResetTransitioning: _emptyFunction,
			isVideoPaused: _returnFalseFunction // no support yet
		},
		
		wistia: { // https://wistia.com/doc/player-api
			selector: '.wistia_embed',
			init: _emptyFunction,
			preStickyness: function () {
				// Note: better keep this initialization here, and not inside "init", cuz at the time
				// init executes the video might not have been initialized (due to async)
				// Also note that "!DOM_player" prevents multiple initializations
				if (!DOM_player && Wistia && Wistia.api) DOM_player = Wistia.api(DOM_video.id);
			},
			preFinalPositioning: _emptyFunction,
			preTransitioning: function () {
				if (DOM_player) {
					DOM_player.videoHeight(cornerVideoFinalHeight);
					DOM_player.videoWidth(cornerVideoFinalWidth);
				}
			},
			resetStickyness: _emptyFunction,
			preResetTransitioning: function () {
				if (DOM_player) {
					DOM_player.videoHeight(originalOuterHeight);
					DOM_player.videoWidth(originalOuterWidth);
				}
			},
			isVideoPaused: function () {
				if (!DOM_player && Wistia && Wistia.api) DOM_player = Wistia.api(DOM_video.id);
				return DOM_player && DOM_player.state() !== 'playing';
			}
		},
		html5: {
			selector: 'video',
			init: _emptyFunction,
			preStickyness: _emptyFunction,
			preFinalPositioning: function () {
				DOM_video.style.setProperty('max-width', '100%', 'important');
			},
			preTransitioning: _emptyFunction,
			resetStickyness: _emptyFunction,
			preResetTransitioning: _emptyFunction,
			isVideoPaused: function () {
				return DOM_video.paused;
			}
		}
		
	};
	
	function getDomVideo() {
		DOM_placeholder = document.getElementById('sticky-video--placeholder');
		for (player_i in playerHandlers) {
			supportedPlayersQuerySelector += playerHandlers[player_i].selector + (player_i === 'html5' ? '' : ',');
		}
		if (typeof window.cornerVideo.params['forced-selector'] == 'string') {
			DOM_video = document.querySelector(window.cornerVideo.params['forced-selector']);
			if (DOM_video) {
				videoType = 'forced';
				return;
			}
		}
		// --------- Select the targeted video --------- //
		DOM_rootOuterContainer = document.body; // default value, used by the "auto-select" method later on
		if (window.cornerVideo.params['selecting-method'] === 'class') {
			DOM_video = document.querySelector('.forced-sticky-video'); // special forced case
			if (DOM_video) {
				videoType = 'forced';
				return;
			}
			DOM_video = document.querySelector('.sticky-video');
			if (!DOM_video) {
				DOM_rootOuterContainer = document.querySelector('.contains-sticky-video');
				if (!DOM_rootOuterContainer) return; // no sticky classes have been found at all, do not proceed
			}
		}
		
		if (!DOM_video) {
			DOM_video = DOM_rootOuterContainer.querySelector(supportedPlayersQuerySelector);
			if (!DOM_video) DOM_video = DOM_rootOuterContainer.getElementsByTagName('iframe');
			if (!DOM_video || DOM_video.length === 0) return; // no sticky-video have been detected at all
		}
		
		// Player embed
		if (typeof DOM_video.tagName === 'string' && DOM_video.tagName.toLowerCase() !== 'iframe') {
			for (player_i in playerHandlers) {
				if (DOM_video[dom_matches](playerHandlers[player_i].selector)) {
					videoType = 'player';
					playerHandler = playerHandlers[player_i];
					playerHandler.init();
					return; // == break
				}
			}
		} else {
			if (typeof DOM_video.tagName === 'string' && DOM_video.tagName.toLowerCase() === 'iframe')
				DOM_video = [DOM_video];
			var src, i;
			for (i = 0; i < DOM_video.length; i++) {
				src = DOM_video[i].getAttribute('src');
				if (typeof src !== 'string') continue;
				for (var serviceID in iframeEmbedServ) {
					if (iframeEmbedServ[serviceID].test(src)) {
						videoType = 'iframe';
						DOM_video = DOM_video[i];
						return;
					}
				}
			}
		}
		
		if (DOM_video === null) {
			var videoWrapper = document.querySelector(".video_wrapper.widescreen");
			if (videoWrapper && videoWrapper !== null) {
				var childNode = videoWrapper.childNodes;
				DOM_video = document.querySelector(".video_wrapper.widescreen>iframe");
				for (i = 0; i < childNode.length; i++) {
					if (childNode[i].tagName === 'IFRAME') {
						DOM_video = childNode[i];
					}
				}
			}
		}
	}
	
	function __GFontToDataURI(url) {
		return fetch(url) // first fecth the embed stylesheet page
			.then(resp => resp.text()) // we only need the text of it
			.then(text => {
				// now we need to parse the CSSruleSets contained
				// but chrome doesn't support styleSheets in DOMParsed docs...
				let s = document.createElement('style');
				s.innerHTML = text;
				document.head.appendChild(s);
				let styleSheet = s.sheet;
				
				// this will help us to keep track of the rules and the original urls
				let FontRule = rule => {
					let src = rule.style.getPropertyValue('src') || rule.style.cssText.match(/url\(.*?\)/g)[0];
					if (!src) return null;
					let url = src.split('url(')[1].split(')')[0];
					return {
						rule: rule,
						src: src,
						url: url.replace(/\"/g, '')
					};
				};
				let fontRules = [],
					fontProms = [];
				
				// iterate through all the cssRules of the embedded doc
				// Edge doesn't make CSSRuleList enumerable...
				for (let i = 0; i < styleSheet.cssRules.length; i++) {
					let r = styleSheet.cssRules[i];
					let fR = FontRule(r);
					if (!fR) {
						continue;
					}
					fontRules.push(fR);
					fontProms.push(
						fetch(fR.url) // fetch the actual font-file (.woff)
							.then(resp => resp.blob())
							.then(blob => {
								return new Promise(resolve => {
									// we have to return it as a dataURI
									//   because for whatever reason,
									//   browser are afraid of blobURI in <img> too...
									let f = new FileReader();
									f.onload = e => resolve(f.result);
									f.readAsDataURL(blob);
								})
							})
							.then(dataURL => {
								// now that we have our dataURI version,
								//  we can replace the original URI with it
								//  and we return the full rule's cssText
								return fR.rule.cssText.replace(fR.url, dataURL);
							})
					)
				}
				document.head.removeChild(s); // clean up
				return Promise.all(fontProms); // wait for all this has been done
			});
	}
	
	var _initCloseButton = function () {
		var closeBtn = document.createElement('button');
		closeBtn.setAttribute('id', 'sticky_close__btn');
		closeBtn.style.setProperty('width', '40px');
		closeBtn.style.setProperty('cursor', 'pointer');
		closeBtn.style.setProperty('height', 30 + window.cornerVideo.params['cta-padding'] * 2 + 'px');
		closeBtn.style.setProperty('position', 'absolute');
		closeBtn.style.setProperty('z-index', '999999');
		closeBtn.style.setProperty('top', (-1) * (30 + window.cornerVideo.params['cta-padding'] * 2) + 'px');
		closeBtn.style.setProperty('left', '0');
		closeBtn.style.setProperty('bottom', 'auto');
		closeBtn.style.setProperty('right', 'auto');
		closeBtn.style.setProperty('opacity', '0');
		closeBtn.style.setProperty('font-size', window.cornerVideo.params['cta-font-size'] + 'px');
		closeBtn.style.setProperty('padding', window.cornerVideo.params['cta-padding'] + 'px 0px');
		closeBtn.style.setProperty('margin', window.cornerVideo.params['cta-margin'] + 'px 0px');
		closeBtn.style.setProperty('will-change', 'opacity, transform, position');
		if (!window.cornerVideo.params['cta-color2'] || window.cornerVideo.params['cta-color2'] === 'none') {
			closeBtn.style.setProperty('background-color', window.cornerVideo.params['cta-color']);
		} else {
			closeBtn.style.setProperty('background-image', 'linear-gradient(' + window.cornerVideo.params['cta-color'] + ', ' + window.cornerVideo.params['cta-color2'] + ')');
		}
		closeBtn.style.setProperty('color', window.cornerVideo.params['cta-text-color']);
		closeBtn.style.setProperty('border-radius', window.cornerVideo.params['cta-border-radius'] + 'px', 'important');
		closeBtn.style.setProperty('border',
			window.cornerVideo.params['cta-border-width'] + 'px ' + window.cornerVideo.params['cta-border-line'] + ' ' + window.cornerVideo.params['cta-border-color']);
		closeBtn.style.setProperty('box-shadow',
			window.cornerVideo.params['cta-box-shadow-x'] + 'px ' + window.cornerVideo.params['cta-box-shadow-y'] + 'px ' + window.cornerVideo.params['cta-box-shadow-blur'] + 'px ' + window.cornerVideo.params['cta-box-shadow-color']);
		closeBtn.innerHTML = '&times;';
		closeBtn.addEventListener('click', function () {
			clickedClose = true;
			window.localStorage.setItem('clickedClose', 'true');
			closeBtn.style.setProperty('opacity', '0');
			DOM_video.setAttribute('style', originalStyleAttr);
			DOM_video.setAttribute('width', originalWidthAttr);
			DOM_video.setAttribute('height', originalHeightAttr);
			var _ctaBtn = document.querySelector('#sticky_cta__btn');
			if (_ctaBtn) _ctaBtn.style.setProperty('opacity', '0');
		});
		
		return closeBtn;
	};
	
	var _initCTAButton = function () {
		if (window.cornerVideo.params['cta-font'] !== 'Arial' && window.cornerVideo.params['cta-font'] !== 'Fantasy') {
			var font_url = 'https://fonts.googleapis.com/css?family=' + window.cornerVideo.params['cta-font'];
			__GFontToDataURI(font_url).then(cssRules => {
			});
		}
		var ctaButton = document.createElement('button');
		ctaButton.setAttribute('id', 'sticky_cta__btn');
		ctaButton.style.setProperty('min-width', '100px');
		ctaButton.style.setProperty('cursor', 'pointer');
		ctaButton.style.setProperty('width', (cornerVideoFinalWidth - (window.cornerVideo.params['enable-close-button'] ? (40 + window.cornerVideo.params['cta-close-margin']) : 0)) + 'px');
		ctaButton.style.setProperty('max-width', (cornerVideoFinalWidth - (window.cornerVideo.params['enable-close-button'] ? (40 + window.cornerVideo.params['cta-close-margin']) : 0)) + 'px');
		ctaButton.style.setProperty('height', 30 + window.cornerVideo.params['cta-padding'] * 2 + 'px');
		ctaButton.style.setProperty('position', 'absolute');
		ctaButton.style.setProperty('z-index', '999999');
		ctaButton.style.setProperty('top', (-1) * (30 + window.cornerVideo.params['cta-padding'] * 2) + 'px');
		ctaButton.style.setProperty('left', '0');
		ctaButton.style.setProperty('bottom', 'auto');
		ctaButton.style.setProperty('right', 'auto');
		ctaButton.style.setProperty('opacity', '0');
		ctaButton.style.setProperty('will-change', 'opacity, transform, position');
		ctaButton.style.setProperty('font-family', window.cornerVideo.params['cta-font'] + ', sans-serif');
		ctaButton.style.setProperty('font-size', window.cornerVideo.params['cta-font-size'] + 'px');
		ctaButton.style.setProperty('padding', window.cornerVideo.params['cta-padding'] + 'px 0px');
		ctaButton.style.setProperty('margin', window.cornerVideo.params['cta-margin'] + 'px ' + (window.cornerVideo.params['enable-close-button'] ? window.cornerVideo.params['cta-close-margin'] : 0) + 'px ' + window.cornerVideo.params['cta-margin'] + 'px 0px');
		ctaButton.innerHTML = window.cornerVideo.params['cta-text'];
		if (!window.cornerVideo.params['cta-color2'] || window.cornerVideo.params['cta-color2'] === 'none') {
			ctaButton.style.setProperty('background-color', window.cornerVideo.params['cta-color']);
		} else {
			ctaButton.style.setProperty('background-image', 'linear-gradient(' + window.cornerVideo.params['cta-color'] + ', ' + window.cornerVideo.params['cta-color2'] + ')');
		}
		ctaButton.style.setProperty('color', window.cornerVideo.params['cta-text-color']);
		ctaButton.style.setProperty('border-radius', window.cornerVideo.params['cta-border-radius'] + 'px', 'important');
		ctaButton.style.setProperty('border',
			window.cornerVideo.params['cta-border-width'] + 'px ' + window.cornerVideo.params['cta-border-line'] + ' ' + window.cornerVideo.params['cta-border-color']);
		ctaButton.style.setProperty('box-shadow',
			window.cornerVideo.params['cta-box-shadow-x'] + 'px ' + window.cornerVideo.params['cta-box-shadow-y'] + 'px ' + window.cornerVideo.params['cta-box-shadow-blur'] + 'px ' + window.cornerVideo.params['cta-box-shadow-color']);
		ctaButton.addEventListener('click', function () {
			window.open(window.cornerVideo.params['cta-url'], window.cornerVideo.params['cta-target'] === 'none' ? '_self' : '_blank');
		});
		
		return ctaButton;
	};
	
	var _onWindowResize = function () {
		currentWindowWidth = document.documentElement.clientWidth;
		currentWindowHeight = window.innerHeight || document.documentElement.clientHeight;
		isMobileMQ = (currentWindowWidth <= window.cornerVideo.params['mobile-breakpoint']);
		cornerVideoFinalWidth = window.cornerVideo.params['video-width' + (isMobileMQ ? '-mobile' : '')];
		cornerVideoVerticalOffset = window.cornerVideo.params['position-vertical-offset' + (isMobileMQ ? '-mobile' : '')];
		cornerVideoSideOffset = window.cornerVideo.params['position-side-offset' + (isMobileMQ ? '-mobile' : '')];
		getDomVideo();
		if (DOM_video !== null) {
			videoComputedStyle = window.getComputedStyle(DOM_video);
			originalOuterWidth = parseInt(videoComputedStyle.getPropertyValue('width'));
			originalOuterHeight = parseInt(videoComputedStyle.getPropertyValue('height'));
			cornerVideoFinalHeight = (cornerVideoFinalWidth / originalOuterWidth) * originalOuterHeight;
		}
	};
	
	var _wait2;
	var fn_checkStickynessOnResize = function () {
		clearTimeout(_wait2);
		_wait2 = setTimeout(_onWindowResize, 100);
	};
	
	window.onload = function () {
		window.localStorage.setItem('clickedClose', 'false');
		if (!window.cornerVideo.params["transition-type"] || window.cornerVideo.params["transition-type"] === undefined) {
			window.cornerVideo.params["transition-type"] = "none";
		}
		if (!window.cornerVideo.params["transition-duration"] || window.cornerVideo.params["transition-duration"] === undefined) {
			window.cornerVideo.params["transition-duration"] = 500;
		}
		getDomVideo();
		if (DOM_video !== null) {
			var videoWrapper = DOM_video.parentNode;
			if (videoWrapper && videoWrapper !== null) {
				// Close button created
				videoWrapper.appendChild(_initCloseButton());
				videoWrapper.appendChild(_initCTAButton());
				
				if (videoWrapper.parentNode.tagName !== "BODY") {
					reSetZIndex(videoWrapper, videoWrapper.parentNode.parentNode, videoWrapper.parentNode);
				} else {
					videoWrapper.style.setProperty("z-index", "999999", "important");
				}
			}
			originalWidthAttr = DOM_video.getAttribute('width');
			originalHeightAttr = DOM_video.getAttribute('height');
			originalStyleAttr = DOM_video.getAttribute('style');
			fn_checkStickynessOnResize();
			fn_checkStickynessOnScroll();
		}
	};
	
	function __showBtnCta() {
		if (!window.cornerVideo.params['enable-cta']) {
			return;
		}
		var videoWrapper = DOM_video.parentNode;
		topOffsetTrigger = videoWrapper.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);
		
		if ((window.scrollY || window.pageYOffset) > topOffsetTrigger && topOffsetTrigger !== 0) {
			var _ctaBtn = document.querySelector('#sticky_cta__btn');
			var closeBtn = document.querySelector('#sticky_close__btn');
			_ctaBtn.style.setProperty('opacity', '1', 'important');
			_ctaBtn.style.setProperty('position', 'fixed', 'important');
			if (window.cornerVideo.params['video-position'].indexOf('top') > -1) {
				_ctaBtn.style.setProperty('top', cornerVideoFinalHeight + cornerVideoVerticalOffset + 1 + 'px', 'important');
				_ctaBtn.style.setProperty('bottom', 'auto', 'important');
				if (window.cornerVideo.params['video-position'].indexOf('-left') > -1) {
					_ctaBtn.style.setProperty('left',
						(window.cornerVideo.params['enable-close-button'] && closeBtn) ? (cornerVideoSideOffset + 40 + 'px') : cornerVideoSideOffset + 'px', 'important');
					_ctaBtn.style.setProperty('right', 'auto', 'important');
				} else {
					_ctaBtn.style.setProperty('left', 'auto', 'important');
					_ctaBtn.style.setProperty('right',
						(window.cornerVideo.params['enable-close-button'] && closeBtn) ? (cornerVideoSideOffset + 40 + 'px') : cornerVideoSideOffset + 'px', 'important');
				}
				if (window.cornerVideo.params['video-position'] === 'top') {
					var _left_val = Math.round((currentWindowWidth - cornerVideoFinalWidth) / 2);
					_ctaBtn.style.setProperty('left', _left_val + 'px', 'important');
					_ctaBtn.style.setProperty('right', 'auto', 'important');
				}
			} else {
				_ctaBtn.style.setProperty('top', 'auto', 'important');
				_ctaBtn.style.setProperty('bottom', cornerVideoFinalHeight + cornerVideoVerticalOffset + 1 + 'px', 'important');
				if (window.cornerVideo.params['video-position'].indexOf('left') > -1) {
					_ctaBtn.style.setProperty('left',
						(window.cornerVideo.params['enable-close-button'] && closeBtn) ? (cornerVideoSideOffset + 40) + 'px' : cornerVideoSideOffset + 'px', 'important');
					_ctaBtn.style.setProperty('right', 'auto', 'important');
				} else {
					_ctaBtn.style.setProperty('left', 'auto', 'important');
					_ctaBtn.style.setProperty('right',
						(window.cornerVideo.params['enable-close-button'] && closeBtn) ? (cornerVideoSideOffset + 40) + 'px' : cornerVideoSideOffset + 'px', 'important');
				}
				if (window.cornerVideo.params['video-position'] === 'bottom' || window.cornerVideo.params['video-position'] === 'middle') {
					_ctaBtn.style.setProperty('left', Math.round((currentWindowWidth - cornerVideoFinalWidth) / 2) + 'px', 'important');
					_ctaBtn.style.setProperty('right', 'auto', 'important');
				}
				if (window.cornerVideo.params['video-position'] === 'left' || window.cornerVideo.params['video-position'] === 'right' || window.cornerVideo.params['video-position'] === 'middle') {
					_ctaBtn.style.setProperty('top', Math.round((currentWindowHeight - cornerVideoFinalHeight) / 2) + cornerVideoFinalHeight - 20 + 'px', 'important');
					_ctaBtn.style.setProperty('bottom', 'auto', 'important');
				}
			}
		}
	}
	
	function __showBtnCls() {
		if (!window.cornerVideo.params['enable-close-button']) {
			return;
		}
		var videoWrapper = DOM_video.parentNode;
		topOffsetTrigger = videoWrapper.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);
		
		if ((window.scrollY || window.pageYOffset) > topOffsetTrigger && topOffsetTrigger !== 0) {
			var closeBtn = document.querySelector('#sticky_close__btn');
			closeBtn.style.setProperty('opacity', '1', 'important');
			closeBtn.style.setProperty('position', 'fixed', 'important');
			if (window.cornerVideo.params['video-position'].indexOf('top') > -1) {
				closeBtn.style.setProperty('top', cornerVideoFinalHeight + cornerVideoVerticalOffset + 1 + 'px', 'important');
				closeBtn.style.setProperty('bottom', 'auto', 'important');
				if (window.cornerVideo.params['video-position'].indexOf('-left') > -1) {
					closeBtn.style.setProperty('left', cornerVideoSideOffset + 'px', 'important');
					closeBtn.style.setProperty('right', 'auto', 'important');
				} else {
					closeBtn.style.setProperty('left', 'auto', 'important');
					closeBtn.style.setProperty('right', cornerVideoSideOffset + 'px', 'important');
				}
				if (window.cornerVideo.params['video-position'] === 'top') {
					var left_val = Math.round((currentWindowWidth - cornerVideoFinalWidth) / 2) + cornerVideoFinalWidth - 40;
					closeBtn.style.setProperty('left', left_val + 'px', 'important');
					closeBtn.style.setProperty('right', 'auto', 'important');
				}
			} else {
				closeBtn.style.setProperty('top', 'auto', 'important');
				closeBtn.style.setProperty('bottom', cornerVideoFinalHeight + cornerVideoVerticalOffset + 1 + 'px', 'important');
				if (window.cornerVideo.params['video-position'].indexOf('left') > -1) {
					closeBtn.style.setProperty('left', cornerVideoSideOffset + 'px', 'important');
					closeBtn.style.setProperty('right', 'auto', 'important');
				} else {
					closeBtn.style.setProperty('left', 'auto', 'important');
					closeBtn.style.setProperty('right', cornerVideoSideOffset + 'px', 'important');
				}
				if (window.cornerVideo.params['video-position'] === 'bottom' || window.cornerVideo.params['video-position'] === 'middle') {
					var b_left_val = Math.round((currentWindowWidth - cornerVideoFinalWidth) / 2) + cornerVideoFinalWidth - 40;
					closeBtn.style.setProperty('left', b_left_val + 'px', 'important');
					closeBtn.style.setProperty('right', 'auto', 'important');
				}
				if (window.cornerVideo.params['video-position'] === 'left' || window.cornerVideo.params['video-position'] === 'right' || window.cornerVideo.params['video-position'] === 'middle') {
					closeBtn.style.setProperty('top', Math.round((currentWindowHeight - cornerVideoFinalHeight) / 2) + cornerVideoFinalHeight - 20 + 'px', 'important');
					closeBtn.style.setProperty('bottom', 'auto', 'important');
				}
			}
		}
	}
	
	
	function resetCVWrapper(closeBtn, _ctaBtn) {
		DOM_video.style.setProperty('border', '0px', 'important');
		DOM_video.style.setProperty('box-shadow', 'none', 'important');
		setTimeout(function () {
			DOM_video.style.setProperty('border', '0px', 'important');
			DOM_video.style.setProperty('box-shadow', 'none', 'important');
		}, Math.round(window.cornerVideo.params["transition-duration"] / 10));
		if (window.cornerVideo.params['enable-close-button'] && closeBtn) {
			closeBtn.style.setProperty('opacity', '0', 'important');
			closeBtn.style.setProperty('position', 'absolute', 'important');
			var clsInterval = setInterval(function () {
				if (closeBtn.style.getPropertyValue('opacity') === '0') {
					clearInterval(clsInterval);
				} else {
					closeBtn.style.setProperty('opacity', '0', 'important');
					closeBtn.style.setProperty('position', 'absolute', 'important');
				}
			}, Math.round(window.cornerVideo.params["transition-duration"] / 10));
		}
		if (window.cornerVideo.params['enable-cta'] && _ctaBtn) {
			_ctaBtn.style.setProperty('opacity', '0', 'important');
			_ctaBtn.style.setProperty('position', 'absolute', 'important');
			var clsInterval1 = setInterval(function () {
				if (_ctaBtn.style.getPropertyValue('opacity') === '0') {
					clearInterval(clsInterval1);
				} else {
					_ctaBtn.style.setProperty('opacity', '0', 'important');
					_ctaBtn.style.setProperty('position', 'absolute', 'important');
				}
			}, Math.round(window.cornerVideo.params["transition-duration"] / 10));
		}
		showVid = false;
		if (window.cornerVideo.params["transition-type"] === 'fade' || window.cornerVideo.params["transition-type"] === 'fadein') {
			setTimeout(function () {
				DOM_video.style.setProperty('opacity', '1', 'important');
				DOM_video.style.setProperty('-webkit-transition-property', 'opacity, transform');
				DOM_video.style.setProperty('transition-property', 'opacity, transform');
				DOM_video.style.setProperty('-webkit-transition-duration', '0s', 'important');
				DOM_video.style.setProperty('transition-duration', '0s', 'important');
			}, Math.round(window.cornerVideo.params["transition-duration"] / 10));
		}
		if (window.cornerVideo.params["transition-type"] === 'motion' || window.cornerVideo.params["transition-type"] === 'slidein') {
			setTimeout(function () {
				DOM_video.style.setProperty('-webkit-transition-property', 'opacity, transform, position');
				DOM_video.style.setProperty('transition-property', 'opacity, transform, position');
				DOM_video.style.setProperty('-webkit-transition-duration', '0s', 'important');
				DOM_video.style.setProperty('transition-duration', '0s', 'important');
				DOM_video.style.setProperty('bottom', '0px', 'important');
				DOM_video.style.setProperty('right', '0px', 'important');
			}, Math.round(window.cornerVideo.params["transition-duration"] / 10));
		}
	}
	
	function setVideoStyle() {
		getDomVideo();
		var videoWrapper = DOM_video.parentNode;
		var closeBtn = document.querySelector('#sticky_close__btn');
		var _ctaBtn = document.querySelector('#sticky_cta__btn');
		if (window.cornerVideo.params['enable-close-button']) {
			if (closeBtn === null) {
				setTimeout(function () {
					setVideoStyle();
				}, 400);
				return;
			}
		}
		if (DOM_video !== null) {
			if (clickedClose) {
				if (closeBtn) closeBtn.style.setProperty('opacity', '0');
				if (_ctaBtn) _ctaBtn.style.setProperty('opacity', '0');
				DOM_video.setAttribute('style', originalStyleAttr);
				DOM_video.setAttribute('width', originalWidthAttr);
				DOM_video.setAttribute('height', originalHeightAttr);
				return;
			}
			videoComputedStyle = window.getComputedStyle(DOM_video);
			originalOuterWidth = parseInt(videoComputedStyle.getPropertyValue('width'));
			originalOuterHeight = parseInt(videoComputedStyle.getPropertyValue('height'));
			cornerVideoFinalHeight = (cornerVideoFinalWidth / originalOuterWidth) * originalOuterHeight;
			
			if ((window.scrollY || window.pageYOffset) === 0) {
				resetCVWrapper(closeBtn, _ctaBtn);
			} else {
				topOffsetTrigger = videoWrapper.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);
				
				if ((window.scrollY || window.pageYOffset) > topOffsetTrigger && topOffsetTrigger !== 0) {
					DOM_video.style.transition = 'none';
					DOM_video.style.setProperty('transition-duration', '0s');
					DOM_video.style.border = window.cornerVideo.params['border-width'] + 'px ' + window.cornerVideo.params['border-line'] + ' ' + window.cornerVideo.params['border-color'];
					DOM_video.style['box-shadow'] = window.cornerVideo.params['box-shadow-x'] + 'px ' + window.cornerVideo.params['box-shadow-y'] + 'px ' + window.cornerVideo.params['box-shadow-blur'] + 'px ' + window.cornerVideo.params['box-shadow-color'];
					if (window.cornerVideo.params["transition-type"] === 'fade' || window.cornerVideo.params["transition-type"] === 'fadein') {
						if (!showVid) {
							DOM_video.style.setProperty('opacity', '0');
							DOM_video.style.setProperty('-webkit-transition-property', 'opacity, transform');
							DOM_video.style.setProperty('transition-property', 'opacity, transform');
							DOM_video.style.setProperty('-webkit-transition-duration', '0s', 'important');
							DOM_video.style.setProperty('transition-duration', '0s', 'important');
							setTimeout(function () {
								DOM_video.style.setProperty('-webkit-transition-duration', Math.round((window.cornerVideo.params["transition-duration"] / 1000) * 100) / 100 + 's');
								DOM_video.style.setProperty('transition-duration', Math.round((window.cornerVideo.params["transition-duration"] / 1000) * 100) / 100 + 's');
								DOM_video.style.setProperty('opacity', '1');
							}, Math.round(window.cornerVideo.params["transition-duration"] / 10));
						} else {
							DOM_video.style.setProperty('opacity', '1', 'important');
							DOM_video.style.setProperty('-webkit-transition-property', 'opacity, transform');
							DOM_video.style.setProperty('transition-property', 'opacity, transform');
							DOM_video.style.setProperty('-webkit-transition-duration', '0s', 'important');
							DOM_video.style.setProperty('transition-duration', '0s', 'important');
						}
					}
					if (window.cornerVideo.params["transition-type"] === 'motion' || window.cornerVideo.params["transition-type"] === 'slidein') {
						if (!showVid) {
							switch (window.cornerVideo.params["video-position"]) {
								case 'top':
								case 'left':
								case 'top-left':
									DOM_video.style.setProperty('-webkit-transition-property', 'opacity, transform, top, left');
									DOM_video.style.setProperty('transition-property', 'opacity, transform, top, left');
									break;
								case 'bottom':
									DOM_video.style.setProperty('bottom', currentWindowHeight / 2 + 'px');
									DOM_video.style.setProperty('-webkit-transition-property', 'opacity, transform, bottom, left');
									DOM_video.style.setProperty('transition-property', 'opacity, transform, bottom, left');
									break;
								case 'middle':
									DOM_video.style.setProperty('top', '0px');
									DOM_video.style.setProperty('left', '0px');
									DOM_video.style.setProperty('-webkit-transition-property', 'opacity, transform, top, left');
									DOM_video.style.setProperty('transition-property', 'opacity, transform, top, left');
									break;
								case 'right':
								case 'top-right':
								case 'bottom-right':
									DOM_video.style.setProperty('bottom', currentWindowHeight / 2 + 'px');
									DOM_video.style.setProperty('right', currentWindowWidth / 2 + 'px');
									DOM_video.style.setProperty('-webkit-transition-property', 'opacity, transform, bottom, right');
									DOM_video.style.setProperty('transition-property', 'opacity, transform, bottom, right');
									break;
							}
							DOM_video.style.setProperty('-webkit-transition-duration', Math.round((window.cornerVideo.params["transition-duration"] / 3000) * 100) / 100 + '0s');
							DOM_video.style.setProperty('transition-duration', Math.round((window.cornerVideo.params["transition-duration"] / 3000) * 100) / 100 + '0s');
						}
					}
					
					// Close button setting
					if (!showVid && (window.cornerVideo.params["transition-type"] !== 'grow' && window.cornerVideo.params["transition-type"] !== 'scale')) {
						if (window.cornerVideo.params['enable-close-button'] && closeBtn) {
							setTimeout(__showBtnCls, window.cornerVideo.params["transition-duration"]);
						}
						if (window.cornerVideo.params['enable-cta'] && _ctaBtn) {
							setTimeout(__showBtnCta, window.cornerVideo.params["transition-duration"]);
						}
						showVid = true;
					} else {
						if (window.cornerVideo.params['enable-close-button'] && closeBtn) {
							setTimeout(__showBtnCls, 500);
						}
						if (window.cornerVideo.params['enable-cta'] && _ctaBtn) {
							setTimeout(__showBtnCta, 500);
						}
					}
				} else {
					resetCVWrapper(closeBtn, _ctaBtn);
				}
			}
		}
	}
	
	window.addEventListener('resize', fn_checkStickynessOnResize);
	
	var _wait3;
	var fn_checkStickynessOnScroll = function () {
		if (clickedClose) {
			DOM_video.setAttribute('style', originalStyleAttr);
			DOM_video.setAttribute('width', originalWidthAttr);
			DOM_video.setAttribute('height', originalHeightAttr);
			return;
		}
		clearTimeout(_wait3);
		_wait3 = setTimeout(setVideoStyle, 20);
	};
	window.addEventListener('scroll', fn_checkStickynessOnScroll);
	
	function reSetZIndex(el, tl, e_tl) {
		if (tl.tagName === "BODY") {
			el.style.setProperty("z-index", "999999", "important");
		} else {
			reSetZIndex(e_tl, tl.parentNode, e_tl.parentNode);
		}
	}
})();
