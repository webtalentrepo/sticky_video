(function () {
	var DOM_video = null;
	var currentWindowWidth = document.documentElement.clientWidth,
		currentWindowHeight = document.documentElement.clientHeight,
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
	// window.cornerVideo.params['enable-close-btn'] = true;
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
	
	function getDomVideo() {
		var videoWapper = document.querySelector(".video_wrapper.widescreen");
		if (videoWapper && videoWapper !== null) {
			var childNode = videoWapper.childNodes;
			DOM_video = document.querySelector(".video_wrapper.widescreen>iframe");
			for (var i = 0; i < childNode.length; i++) {
				if (childNode[i].tagName === 'IFRAME') {
					DOM_video = childNode[i];
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
		currentWindowHeight = document.documentElement.clientHeight;
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
		var videoWapper = document.querySelector(".video_wrapper.widescreen");
		if (videoWapper && videoWapper !== null) {
			// Close button created
			videoWapper.appendChild(_initCloseButton());
			videoWapper.appendChild(_initCTAButton());
			
			if (videoWapper.parentNode.tagName !== "BODY") {
				reSetZIndex(videoWapper, videoWapper.parentNode.parentNode, videoWapper.parentNode);
			} else {
				videoWapper.style.setProperty("z-index", "999999", "important");
			}
			getDomVideo();
			if (DOM_video !== null) {
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
								DOM_video.style.setProperty('bottom', window.screen.availHeight / 2 + 'px');
								DOM_video.style.setProperty('transition-property', 'opacity, transform, bottom, left');
								break;
							case 'right':
							case 'top-right':
							case 'bottom-right':
								DOM_video.style.setProperty('bottom', window.screen.availHeight / 2 + 'px');
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
		}
	};
	
	function setVideoStyle() {
		var videoWapper = document.querySelector(".video_wrapper.widescreen");
		if (videoWapper && videoWapper !== null) {
			var childNode = videoWapper.childNodes;
			var closeBtn = document.querySelector('#sticky_close__btn');
			var _ctaBtn = document.querySelector('#sticky_cta__btn');
			getDomVideo();
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
				
				var topOffsetTrigger = videoWapper.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);
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
					if (window.cornerVideo.params['enable-close-btn'] && closeBtn) {
						closeBtn.style.setProperty('opacity', '0');
						closeBtn.style.setProperty('position', 'absolute');
					}
					if (window.cornerVideo.params['enable-cta'] && _ctaBtn) {
						_ctaBtn.style.setProperty('opacity', '0');
						_ctaBtn.style.setProperty('position', 'absolute');
					}
				} else {
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
								DOM_video.style.setProperty('left', Math.round((document.body.offsetWidth - cornerVideoFinalWidth) / 2) + 'px', 'important');
								break;
							case 'bottom':
								DOM_video.style.setProperty('top', 'auto');
								DOM_video.style.setProperty('right', 'auto');
								DOM_video.style.setProperty('bottom', '20px', 'important');
								DOM_video.style.setProperty('left', Math.round((document.body.offsetWidth - cornerVideoFinalWidth) / 2) + 'px', 'important');
								break;
							case 'right':
								DOM_video.style.setProperty('top', Math.round((window.screen.availHeight / 2) - (cornerVideoFinalHeight / 1.2)) + 'px', 'important');
								DOM_video.style.setProperty('right', '20px', 'important');
								DOM_video.style.setProperty('bottom', 'auto');
								DOM_video.style.setProperty('left', 'auto');
								break;
							case 'left':
								DOM_video.style.setProperty('top', Math.round((window.screen.availHeight / 2) - (cornerVideoFinalHeight / 1.2)) + 'px', 'important');
								DOM_video.style.setProperty('right', 'auto');
								DOM_video.style.setProperty('bottom', 'auto');
								DOM_video.style.setProperty('left', '20px', 'important');
								break;
						}
						
						// Close button setting
						if (window.cornerVideo.params['enable-close-btn'] && closeBtn) {
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
									closeBtn.style.setProperty('left',
										Math.round((document.body.offsetWidth - cornerVideoFinalWidth) / 2) + cornerVideoFinalWidth - 40 + 'px', 'important');
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
									closeBtn.style.setProperty('left',
										Math.round((document.body.offsetWidth - cornerVideoFinalWidth) / 2) + cornerVideoFinalWidth - 40 + 'px', 'important');
									closeBtn.style.setProperty('right', 'auto', 'important');
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
										(window.cornerVideo.params['enable-close-btn'] && closeBtn) ? (cornerVideoSideOffset + 40 + 'px') : cornerVideoSideOffset + 'px', 'important');
									_ctaBtn.style.setProperty('right', 'auto', 'important');
								} else {
									_ctaBtn.style.setProperty('left', 'auto', 'important');
									_ctaBtn.style.setProperty('right',
										(window.cornerVideo.params['enable-close-btn'] && closeBtn) ? (cornerVideoSideOffset + 40 + 'px') : cornerVideoSideOffset + 'px', 'important');
								}
								if (window.cornerVideo.params['video-position'] === 'top') {
									_ctaBtn.style.setProperty('left',
										Math.round((document.body.offsetWidth - cornerVideoFinalWidth) / 2) + cornerVideoFinalWidth - 40 - ((window.cornerVideo.params['enable-close-btn'] && closeBtn) ? 40 : 40) + 'px', 'important');
									_ctaBtn.style.setProperty('right', 'auto', 'important');
								}
							} else {
								_ctaBtn.style.setProperty('top', 'auto', 'important');
								_ctaBtn.style.setProperty('bottom', cornerVideoFinalHeight + cornerVideoVerticalOffset + 1 + 'px', 'important');
								if (window.cornerVideo.params['video-position'].indexOf('left') > -1) {
									_ctaBtn.style.setProperty('left',
										(window.cornerVideo.params['enable-close-btn'] && closeBtn) ? (cornerVideoSideOffset + 40) + 'px' : cornerVideoSideOffset + 'px', 'important');
									_ctaBtn.style.setProperty('right', 'auto', 'important');
								} else {
									_ctaBtn.style.setProperty('left', 'auto', 'important');
									_ctaBtn.style.setProperty('right',
										(window.cornerVideo.params['enable-close-btn'] && closeBtn) ? (cornerVideoSideOffset + 40) + 'px' : cornerVideoSideOffset + 'px', 'important');
								}
								if (window.cornerVideo.params['video-position'] === 'bottom') {
									_ctaBtn.style.setProperty('left',
										Math.round((document.body.offsetWidth - cornerVideoFinalWidth) / 2) + cornerVideoFinalWidth - 40 - ((window.cornerVideo.params['enable-close-btn'] && closeBtn) ? 40 : 40) + 'px', 'important');
									_ctaBtn.style.setProperty('right', 'auto', 'important');
								}
							}
						}
					} else {
						DOM_video.style.border = 0;
						DOM_video.style['box-shadow'] = 'none';
						if (window.cornerVideo.params['enable-close-btn'] && closeBtn) {
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
