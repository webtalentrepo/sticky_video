(function () {
	var DOM_video = null;
	var currentWindowWidth = document.documentElement.clientWidth,
		currentWindowHeight = document.documentElement.clientHeight,
		isMobileMQ = (currentWindowWidth <= window.cornerVideo.params['mobile-breakpoint']),
		cornerVideoFinalWidth = window.cornerVideo.params['video-width' + (isMobileMQ?'-mobile':'')];
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
	
	window.onload = function () {
		if (!window.cornerVideo.params["transition-type"] || window.cornerVideo.params["transition-type"] === undefined) {
			window.cornerVideo.params["transition-type"] = "none";
		}
		if (!window.cornerVideo.params["transition-duration"] || window.cornerVideo.params["transition-duration"] === undefined) {
			window.cornerVideo.params["transition-duration"] = 500;
		}
		var videoWapper = document.querySelector(".video_wrapper.widescreen");
		if (videoWapper && videoWapper !== null) {
			if (videoWapper.parentNode.tagName !== "BODY") {
				reSetZIndex(videoWapper, videoWapper.parentNode.parentNode, videoWapper.parentNode);
			} else {
				videoWapper.style.setProperty("z-index", "999999", "important");
			}
			getDomVideo();
			if (DOM_video !== null) {
				switch (window.cornerVideo.params["transition-type"]) {
					case 'motion':
					case 'slidein':
						// window.cornerVideo.params["video-position"] = 'top-right';
						switch (window.cornerVideo.params["video-position"]) {
							case 'top-left':
								DOM_video.style.setProperty('transition-property', 'opacity, transform, top, left');
								break;
							case 'bottom':
								DOM_video.style.setProperty('bottom', window.screen.availHeight / 2 + 'px');
								DOM_video.style.setProperty('transition-property', 'opacity, transform, bottom, left');
								break;
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
			getDomVideo();
			if (DOM_video !== null) {
				var topOffsetTrigger = videoWapper.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);
				if (window.cornerVideo.params["transition-type"] === 'scale') {
					DOM_video.style.setProperty('transition-property', 'opacity, transform');
				}
				if (window.cornerVideo.params["transition-type"] === 'fade') {
					DOM_video.style.setProperty('opacity', '1');
				}
				if ((window.scrollY || window.pageYOffset) === 0) {
					DOM_video.style.border = 0;
					DOM_video.style['box-shadow'] = 'none';
				} else {
					if ((window.scrollY || window.pageYOffset) > topOffsetTrigger && topOffsetTrigger !== 0) {
						if (window.cornerVideo.params["transition-type"] === 'scale') {
							DOM_video.style.setProperty('transition-property', 'opacity, transform, width, height');
						}
						DOM_video.style.border = window.cornerVideo.params['border-width'] + 'px ' + window.cornerVideo.params['border-line'] + ' ' + window.cornerVideo.params['border-color'];
						DOM_video.style['box-shadow'] = window.cornerVideo.params['box-shadow-x'] + 'px ' + window.cornerVideo.params['box-shadow-y'] + 'px ' + window.cornerVideo.params['box-shadow-blur'] + 'px ' + window.cornerVideo.params['box-shadow-color'];
						if (window.cornerVideo.params["transition-type"] === 'fade') {
							DOM_video.style.setProperty('opacity', '0');
							setTimeout(function () {
								DOM_video.style.setProperty('opacity', '1');
							}, window.cornerVideo.params["transition-duration"]);
						}
					} else {
						DOM_video.style.border = 0;
						DOM_video.style['box-shadow'] = 'none';
					}
				}
			}
		}
	}
	
	window.addEventListener('scroll', function (ev) {
		setVideoStyle();
	});
	
	function reSetZIndex(el, tl, e_tl) {
		if (tl.tagName === "BODY") {
			el.style.setProperty("z-index", "999999", "important");
		} else {
			reSetZIndex(e_tl, tl.parentNode, e_tl.parentNode);
		}
	}
})();
