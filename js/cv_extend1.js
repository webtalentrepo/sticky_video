(function () {
	var DOM_video, DOM_videoTag, DOM_placeholder, DOM_closeButton, DOM_player,
		DOM_rootOuterContainer,
		topOffsetTrigger,
		boundingClientRect,
		originalInnerWidth, originalInnerHeight,
		originalVideoTagWidthAttr, originalVideoTagHeightAttr, originalVideoTagStyleAttr,
		originalCssPosition, originalPlaceholderStyleAttr, originalMejsStyleAttr,
		placeholderForcedHeight, placeholderForcedWidth,
		isVideoSticky = false,
		videoType = 'none', playerHandler = null,
		supportedPlayersQuerySelector = '', player_i,
		_emptyFunction = function () {
		}, _returnFalseFunction = function () {
			return false;
		},
		currentWindowWidth = document.documentElement.clientWidth,
		currentWindowHeight = window.screen.availHeight || document.documentElement.clientHeight,
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
	}
	
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
		var DOM_rootOuterContainer = document.body; // default value, used by the "auto-select" method later on
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
			var videoWapper = document.querySelector(".video_wrapper.widescreen");
			if (videoWapper && videoWapper !== null) {
				var childNode = videoWapper.childNodes;
				DOM_video = document.querySelector(".video_wrapper.widescreen>iframe");
				for (i = 0; i < childNode.length; i++) {
					if (childNode[i].tagName === 'IFRAME') {
						DOM_video = childNode[i];
					}
				}
			}
		}
	}
	
	var _initCloseButton = function () {
		var closeBtn = document.createElement('button');
		closeBtn.setAttribute('id', 'sticky_close__btn');
		closeBtn.style.setProperty('width', '40px');
		closeBtn.style.setProperty('height', '30px');
		closeBtn.style.setProperty('position', 'absolute');
		closeBtn.style.setProperty('z-index', '999999');
		closeBtn.style.setProperty('top', '-30px');
		closeBtn.style.setProperty('left', '0');
		closeBtn.style.setProperty('bottom', 'auto');
		closeBtn.style.setProperty('right', 'auto');
		closeBtn.style.setProperty('opacity', '0');
		closeBtn.style.setProperty('font-size', '30px');
		closeBtn.style.setProperty('padding', '0');
		closeBtn.style.setProperty('margin', '0');
		closeBtn.style.setProperty('line-height', '30px');
		closeBtn.style.setProperty('will-change', 'opacity, transform, position');
		closeBtn.innerHTML = '&times;';
		closeBtn.addEventListener('click', function () {
			clickedClose = true;
			closeBtn.style.setProperty('opacity', '0');
			DOM_video.setAttribute('style', originalStyleAttr);
			DOM_video.setAttribute('width', originalWidthAttr);
			DOM_video.setAttribute('height', originalHeightAttr);
		});
		
		return closeBtn;
	};
	
	var _initCTAButton = function () {
		var ctaButton = document.createElement('button');
		ctaButton.setAttribute('id', 'sticky_cta__btn');
		ctaButton.style.setProperty('min-width', '100px');
		ctaButton.style.setProperty('max-width', (cornerVideoFinalWidth - 40) + 'px');
		ctaButton.style.setProperty('height', '30px');
		ctaButton.style.setProperty('position', 'absolute');
		ctaButton.style.setProperty('z-index', '999999');
		ctaButton.style.setProperty('top', '-30px');
		ctaButton.style.setProperty('left', '0');
		ctaButton.style.setProperty('bottom', 'auto');
		ctaButton.style.setProperty('right', 'auto');
		ctaButton.style.setProperty('opacity', '0');
		ctaButton.style.setProperty('font-size', '30px');
		ctaButton.style.setProperty('padding', '0');
		ctaButton.style.setProperty('margin', '0');
		ctaButton.style.setProperty('line-height', '30px');
		ctaButton.style.setProperty('will-change', 'opacity, transform, position');
		ctaButton.innerHTML = window.cornerVideo.params['cta-text'];
		ctaButton.style.setProperty('background-color', window.cornerVideo.params['cta-color']);
		ctaButton.style.setProperty('color', window.cornerVideo.params['cta-text-color']);
		ctaButton.style.setProperty('border',
			window.cornerVideo.params['cta-border-width'] + 'px ' + window.cornerVideo.params['cta-border-line'] + ' ' + window.cornerVideo.params['cta-border-color']);
		ctaButton.style.setProperty('box-shadow',
			window.cornerVideo.params['cta-box-shadow-x'] + ', ' + window.cornerVideo.params['cta-box-shadow-y'] + ', ' + window.cornerVideo.params['cta-box-shadow-blur'] + ', ' + window.cornerVideo.params['cta-box-shadow-color']);
		ctaButton.addEventListener('click', function () {
			window.open(window.cornerVideo.params['cta-url'], window.cornerVideo.params['cta-target'] === 'none' ? '_self' : '_blank');
		});
		
		return ctaButton;
	};
	
	var _onWindowResize = function () {
		currentWindowWidth = document.documentElement.clientWidth;
		currentWindowHeight = window.screen.availHeight || document.documentElement.clientHeight;
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
		if (!window.cornerVideo.params["transition-type"] || window.cornerVideo.params["transition-type"] === undefined) {
			window.cornerVideo.params["transition-type"] = "none";
		}
		if (!window.cornerVideo.params["transition-duration"] || window.cornerVideo.params["transition-duration"] === undefined) {
			window.cornerVideo.params["transition-duration"] = 500;
		}
		getDomVideo();
		if (DOM_video !== null) {
			var videoWapper = DOM_video.parentNode;
			if (videoWapper && videoWapper !== null) {
				// Close button created
				videoWapper.appendChild(_initCloseButton());
				videoWapper.appendChild(_initCTAButton());
				
				if (videoWapper.parentNode.tagName !== "BODY") {
					reSetZIndex(videoWapper, videoWapper.parentNode.parentNode, videoWapper.parentNode);
				} else {
					videoWapper.style.setProperty("z-index", "999999", "important");
				}
			}
			originalWidthAttr = DOM_video.getAttribute('width');
			originalHeightAttr = DOM_video.getAttribute('height');
			originalStyleAttr = DOM_video.getAttribute('style');
			fn_checkStickynessOnResize();
			fn_checkStickynessOnScroll();
			switch (window.cornerVideo.params["transition-type"]) {
				case 'motion':
				case 'slidein':
					switch (window.cornerVideo.params["video-position"]) {
						case 'top':
						case 'left':
						case 'top-left':
							DOM_video.style.setProperty('transition-property', 'opacity, transform, top, left');
							break;
						case 'bottom':
							DOM_video.style.setProperty('bottom', currentWindowHeight / 2 + 'px');
							DOM_video.style.setProperty('transition-property', 'opacity, transform, bottom, left');
							break;
						case 'right':
						case 'top-right':
						case 'bottom-right':
							DOM_video.style.setProperty('bottom', currentWindowHeight / 2 + 'px');
							DOM_video.style.setProperty('right', window.screen.availWidth / 3 + 'px');
							DOM_video.style.setProperty('transition-property', 'opacity, transform, bottom, right');
							break;
					}
					DOM_video.style.setProperty('transition-duration', Math.round((window.cornerVideo.params["transition-duration"] / 1000) * 100) / 100 + '0s');
					break;
				case 'grow':
				case 'scale':
				case 'fadein':
				case 'fade':
					DOM_video.style.setProperty('transition-property', 'opacity, transform');
					DOM_video.style.setProperty('transition-duration', Math.round((window.cornerVideo.params["transition-duration"] / 1000) * 100) / 100 + 's');
					break;
				default:
					DOM_video.style.setProperty('transform', 'translate(0px, 0px) scale(1)');
					DOM_video.style.setProperty('margin', '0', "important");
					DOM_video.style.transition = 'none';
					DOM_video.style.setProperty('transition-duration', '0s');
					break;
			}
		}
	};
	
	function setVideoStyle() {
		getDomVideo();
		var videoWapper = DOM_video.parentNode;
		var childNode = videoWapper.childNodes;
		var closeBtn = document.querySelector('#sticky_close__btn');
		var _ctaBtn = document.querySelector('#sticky_cta__btn');
		if (closeBtn === null) {
			setTimeout(function () {
				setVideoStyle();
			}, 400);
			return;
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
			
			if (window.cornerVideo.params["transition-type"] === 'scale') {
				DOM_video.style.setProperty('transition-property', 'opacity, transform');
			}
			if (window.cornerVideo.params["transition-type"] === 'fade') {
				DOM_video.style.setProperty('opacity', '1');
			}
			switch (window.cornerVideo.params["video-position"]) {
				case 'top':
				case 'right':
				case 'bottom':
				case 'left':
					DOM_video.style.setProperty('top', '0px');
					DOM_video.style.setProperty('left', '0px');
					DOM_video.style.setProperty('right', 'auto');
					DOM_video.style.setProperty('bottom', 'auto');
					break;
			}
			if ((window.scrollY || window.pageYOffset) === 0) {
				DOM_video.style.border = 0;
				DOM_video.style['box-shadow'] = 'none';
				if (window.cornerVideo.params['enable-close-button'] && closeBtn) {
					closeBtn.style.setProperty('opacity', '0');
					closeBtn.style.setProperty('position', 'absolute');
				}
				if (window.cornerVideo.params['enable-cta'] && _ctaBtn) {
					_ctaBtn.style.setProperty('opacity', '0');
					_ctaBtn.style.setProperty('position', 'absolute');
				}
			} else {
				var topOffsetTrigger = videoWapper.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);
				
				if ((window.scrollY || window.pageYOffset) > topOffsetTrigger && topOffsetTrigger !== 0) {
					DOM_video.style.border = window.cornerVideo.params['border-width'] + 'px ' + window.cornerVideo.params['border-line'] + ' ' + window.cornerVideo.params['border-color'];
					DOM_video.style['box-shadow'] = window.cornerVideo.params['box-shadow-x'] + 'px ' + window.cornerVideo.params['box-shadow-y'] + 'px ' + window.cornerVideo.params['box-shadow-blur'] + 'px ' + window.cornerVideo.params['box-shadow-color'];
					
					// transition
					if (window.cornerVideo.params["transition-type"] === 'scale') {
						DOM_video.style.setProperty('transition-property', 'opacity, transform, width, height');
					}
					if (window.cornerVideo.params["transition-type"] === 'fade') {
						DOM_video.style.setProperty('opacity', '0');
						setTimeout(function () {
							DOM_video.style.setProperty('opacity', '1');
						}, window.cornerVideo.params["transition-duration"]);
					}
					
					//reset dom video position
					switch (window.cornerVideo.params["video-position"]) {
						case 'top':
							DOM_video.style.setProperty('top', '20px', 'important');
							DOM_video.style.setProperty('right', 'auto', 'important');
							DOM_video.style.setProperty('bottom', 'auto', 'important');
							DOM_video.style.setProperty('left', Math.round((currentWindowWidth - cornerVideoFinalWidth) / 2) + 'px', 'important');
							break;
						case 'bottom':
							DOM_video.style.setProperty('top', 'auto');
							DOM_video.style.setProperty('right', 'auto');
							DOM_video.style.setProperty('bottom', '20px', 'important');
							DOM_video.style.setProperty('left', Math.round((currentWindowWidth - cornerVideoFinalWidth) / 2) + 'px', 'important');
							break;
						case 'right':
							DOM_video.style.setProperty('top', Math.round((currentWindowHeight / 2) - cornerVideoFinalHeight) + 'px', 'important');
							DOM_video.style.setProperty('right', '20px', 'important');
							DOM_video.style.setProperty('bottom', 'auto');
							DOM_video.style.setProperty('left', 'auto');
							break;
						case 'left':
							DOM_video.style.setProperty('top', Math.round((currentWindowHeight / 2) - cornerVideoFinalHeight) + 'px', 'important');
							DOM_video.style.setProperty('right', 'auto');
							DOM_video.style.setProperty('bottom', 'auto');
							DOM_video.style.setProperty('left', '20px', 'important');
							break;
					}
					
					// Close button setting
					if (window.cornerVideo.params['enable-close-button'] && closeBtn) {
						// console.log(topOffsetTrigger);
						// console.log((window.scrollY || window.pageYOffset));
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
							if (window.cornerVideo.params['video-position'] === 'bottom') {
								var b_left_val = Math.round((currentWindowWidth - cornerVideoFinalWidth) / 2) + cornerVideoFinalWidth - 40;
								closeBtn.style.setProperty('left', b_left_val + 'px', 'important');
								closeBtn.style.setProperty('right', 'auto', 'important');
							}
							if (window.cornerVideo.params['video-position'] === 'left' || window.cornerVideo.params['video-position'] === 'right') {
								closeBtn.style.setProperty('top', Math.round((currentWindowHeight) / 2) + 2 + 'px', 'important');
								closeBtn.style.setProperty('bottom', 'auto', 'important');
							}
						}
					}
					if (window.cornerVideo.params['enable-cta'] && _ctaBtn) {
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
							if (window.cornerVideo.params['video-position'] === 'bottom') {
								_ctaBtn.style.setProperty('left', Math.round((currentWindowWidth - cornerVideoFinalWidth) / 2) + 'px', 'important');
								_ctaBtn.style.setProperty('right', 'auto', 'important');
							}
							if (window.cornerVideo.params['video-position'] === 'left' || window.cornerVideo.params['video-position'] === 'right') {
								_ctaBtn.style.setProperty('top', Math.round((currentWindowHeight) / 2) + 2 + 'px', 'important');
								_ctaBtn.style.setProperty('bottom', 'auto', 'important');
							}
						}
					}
				} else {
					DOM_video.style.border = 0;
					DOM_video.style['box-shadow'] = 'none';
					if (window.cornerVideo.params['enable-close-button'] && closeBtn) {
						closeBtn.style.setProperty('opacity', '0');
						closeBtn.style.setProperty('position', 'absolute');
					}
					if (window.cornerVideo.params['enable-cta'] && _ctaBtn) {
						_ctaBtn.style.setProperty('opacity', '0');
						_ctaBtn.style.setProperty('position', 'absolute');
					}
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
		_wait3 = setTimeout(setVideoStyle, 300);
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
