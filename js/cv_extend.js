!function(){function t(t,e,o){return t.call.apply(t.bind,arguments)}function e(t,e,o){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var o=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(o,r),t.apply(e,o)}}return function(){return t.apply(e,arguments)}}function o(r,i,n){return(o=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?t:e).apply(null,arguments)}var r=Date.now||function(){return+new Date};function i(t,e){this.a=t,this.m=e||t,this.c=this.m.document}var n=!!window.FontFace;function a(t,e,o,r){if(e=t.c.createElement(e),o)for(var i in o)o.hasOwnProperty(i)&&("style"==i?e.style.cssText=o[i]:e.setAttribute(i,o[i]));return r&&e.appendChild(t.c.createTextNode(r)),e}function s(t,e,o){(t=t.c.getElementsByTagName(e)[0])||(t=document.documentElement),t.insertBefore(o,t.lastChild)}function p(t){t.parentNode&&t.parentNode.removeChild(t)}function d(t,e,o){e=e||[],o=o||[];for(var r=t.className.split(/\s+/),i=0;i<e.length;i+=1){for(var n=!1,a=0;a<r.length;a+=1)if(e[i]===r[a]){n=!0;break}n||r.push(e[i])}for(e=[],i=0;i<r.length;i+=1){for(n=!1,a=0;a<o.length;a+=1)if(r[i]===o[a]){n=!0;break}n||e.push(r[i])}t.className=e.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function c(t,e){for(var o=t.className.split(/\s+/),r=0,i=o.length;r<i;r++)if(o[r]==e)return!0;return!1}function l(t){if("string"==typeof t.f)return t.f;var e=t.m.location.protocol;return"about:"==e&&(e=t.a.location.protocol),"https:"==e?"https:":"http:"}function y(t,e,o){function r(){c&&i&&p&&(c(d),c=null)}e=a(t,"link",{rel:"stylesheet",href:e,media:"all"});var i=!1,p=!0,d=null,c=o||null;n?(e.onload=function(){i=!0,r()},e.onerror=function(){i=!0,d=Error("Stylesheet failed to load"),r()}):setTimeout(function(){i=!0,r()},0),s(t,"head",e)}function w(t,e,o,r){var i=t.c.getElementsByTagName("head")[0];if(i){var n=a(t,"script",{src:e}),s=!1;return n.onload=n.onreadystatechange=function(){s||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(s=!0,o&&o(null),n.onload=n.onreadystatechange=null,"HEAD"==n.parentNode.tagName&&i.removeChild(n))},i.appendChild(n),setTimeout(function(){s||(s=!0,o&&o(Error("Script load timeout")))},r||5e3),n}return null}function u(){this.a=0,this.c=null}function m(t){return t.a++,function(){t.a--,f(t)}}function h(t,e){t.c=e,f(t)}function f(t){0==t.a&&t.c&&(t.c(),t.c=null)}function b(t){this.a=t||"-"}function g(t,e){this.c=t,this.f=4,this.a="n";var o=(e||"n4").match(/^([nio])([1-9])$/i);o&&(this.a=o[1],this.f=parseInt(o[2],10))}function P(t){var e=[];t=t.split(/,\s*/);for(var o=0;o<t.length;o++){var r=t[o].replace(/['"]/g,"");-1!=r.indexOf(" ")||/^\d/.test(r)?e.push("'"+r+"'"):e.push(r)}return e.join(",")}function v(t){return t.a+t.f}function V(t){var e="normal";return"o"===t.a?e="oblique":"i"===t.a&&(e="italic"),e}function x(t){var e=4,o="n",r=null;return t&&((r=t.match(/(normal|oblique|italic)/i))&&r[1]&&(o=r[1].substr(0,1).toLowerCase()),(r=t.match(/([1-9]00|normal|bold)/i))&&r[1]&&(/bold/i.test(r[1])?e=7:/[1-9]00/.test(r[1])&&(e=parseInt(r[1].substr(0,1),10)))),o+e}function k(t,e){this.c=t,this.f=t.m.document.documentElement,this.h=e,this.a=new b("-"),this.j=!1!==e.events,this.g=!1!==e.classes}function _(t){if(t.g){var e=c(t.f,t.a.c("wf","active")),o=[],r=[t.a.c("wf","loading")];e||o.push(t.a.c("wf","inactive")),d(t.f,o,r)}M(t,"inactive")}function M(t,e,o){t.j&&t.h[e]&&(o?t.h[e](o.c,v(o)):t.h[e]())}function S(){this.c={}}function T(t,e){this.c=t,this.f=e,this.a=a(this.c,"span",{"aria-hidden":"true"},this.f)}function A(t){s(t.c,"body",t.a)}function j(t){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+P(t.c)+";font-style:"+V(t)+";font-weight:"+t.f+"00;"}function N(t,e,o,r,i,n){this.g=t,this.j=e,this.a=r,this.c=o,this.f=i||3e3,this.h=n||void 0}function C(t,e,o,r,i,n,a){this.v=t,this.B=e,this.c=o,this.a=r,this.s=a||"BESbswy",this.f={},this.w=i||3e3,this.u=n||null,this.o=this.j=this.h=this.g=null,this.g=new T(this.c,this.s),this.h=new T(this.c,this.s),this.j=new T(this.c,this.s),this.o=new T(this.c,this.s),t=j(t=new g(this.a.c+",serif",v(this.a))),this.g.a.style.cssText=t,t=j(t=new g(this.a.c+",sans-serif",v(this.a))),this.h.a.style.cssText=t,t=j(t=new g("serif",v(this.a))),this.j.a.style.cssText=t,t=j(t=new g("sans-serif",v(this.a))),this.o.a.style.cssText=t,A(this.g),A(this.h),A(this.j),A(this.o)}b.prototype.c=function(t){for(var e=[],o=0;o<arguments.length;o++)e.push(arguments[o].replace(/[\W_]+/g,"").toLowerCase());return e.join(this.a)},N.prototype.start=function(){var t=this.c.m.document,e=this,o=r(),i=new Promise(function(i,n){!function a(){r()-o>=e.f?n():t.fonts.load(function(t){return V(t)+" "+t.f+"00 300px "+P(t.c)}(e.a),e.h).then(function(t){1<=t.length?i():setTimeout(a,25)},function(){n()})}()}),n=new Promise(function(t,o){setTimeout(o,e.f)});Promise.race([n,i]).then(function(){e.g(e.a)},function(){e.j(e.a)})};var E={D:"serif",C:"sans-serif"},W=null;function I(){if(null===W){var t=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);W=!!t&&(536>parseInt(t[1],10)||536===parseInt(t[1],10)&&11>=parseInt(t[2],10))}return W}function O(t,e,o){for(var r in E)if(E.hasOwnProperty(r)&&e===t.f[E[r]]&&o===t.f[E[r]])return!0;return!1}function q(t){var e,i=t.g.a.offsetWidth,n=t.h.a.offsetWidth;(e=i===t.f.serif&&n===t.f["sans-serif"])||(e=I()&&O(t,i,n)),e?r()-t.A>=t.w?I()&&O(t,i,n)&&(null===t.u||t.u.hasOwnProperty(t.a.c))?z(t,t.v):z(t,t.B):function(t){setTimeout(o(function(){q(this)},t),50)}(t):z(t,t.v)}function z(t,e){setTimeout(o(function(){p(this.g.a),p(this.h.a),p(this.j.a),p(this.o.a),e(this.a)},t),0)}function F(t,e,o){this.c=t,this.a=e,this.f=0,this.o=this.j=!1,this.s=o}C.prototype.start=function(){this.f.serif=this.j.a.offsetWidth,this.f["sans-serif"]=this.o.a.offsetWidth,this.A=r(),q(this)};var L=null;function B(t){0==--t.f&&t.j&&(t.o?((t=t.a).g&&d(t.f,[t.a.c("wf","active")],[t.a.c("wf","loading"),t.a.c("wf","inactive")]),M(t,"active")):_(t.a))}function H(t){this.j=t,this.a=new S,this.h=0,this.f=this.g=!0}function Y(t,e,r,i,n){var a=0==--t.h;(t.f||t.g)&&setTimeout(function(){var t=n||null,s=i||{};if(0===r.length&&a)_(e.a);else{e.f+=r.length,a&&(e.j=a);var p,c=[];for(p=0;p<r.length;p++){var l=r[p],y=s[l.c],w=e.a,u=l;w.g&&d(w.f,[w.a.c("wf",u.c,v(u).toString(),"loading")]),M(w,"fontloading",u),w=null,null===L&&(L=!!window.FontFace&&(!(u=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent))||42<parseInt(u[1],10))),w=L?new N(o(e.g,e),o(e.h,e),e.c,l,e.s,y):new C(o(e.g,e),o(e.h,e),e.c,l,e.s,t,y),c.push(w)}for(p=0;p<c.length;p++)c[p].start()}},0)}function R(t,e){this.c=t,this.a=e}function D(t,e){this.c=t,this.a=e}function $(t,e,o){this.c=t||e+G,this.a=[],this.f=[],this.g=o||""}F.prototype.g=function(t){var e=this.a;e.g&&d(e.f,[e.a.c("wf",t.c,v(t).toString(),"active")],[e.a.c("wf",t.c,v(t).toString(),"loading"),e.a.c("wf",t.c,v(t).toString(),"inactive")]),M(e,"fontactive",t),this.o=!0,B(this)},F.prototype.h=function(t){var e=this.a;if(e.g){var o=c(e.f,e.a.c("wf",t.c,v(t).toString(),"active")),r=[],i=[e.a.c("wf",t.c,v(t).toString(),"loading")];o||r.push(e.a.c("wf",t.c,v(t).toString(),"inactive")),d(e.f,r,i)}M(e,"fontinactive",t),B(this)},H.prototype.load=function(t){this.c=new i(this.j,t.context||this.j),this.g=!1!==t.events,this.f=!1!==t.classes,function(t,e,o){var r=[],i=o.timeout;!function(t){t.g&&d(t.f,[t.a.c("wf","loading")]),M(t,"loading")}(e);var r=function(t,e,o){var r,i=[];for(r in e)if(e.hasOwnProperty(r)){var n=t.c[r];n&&i.push(n(e[r],o))}return i}(t.a,o,t.c),n=new F(t.c,e,i);for(t.h=r.length,e=0,o=r.length;e<o;e++)r[e].load(function(e,o,r){Y(t,n,e,o,r)})}(this,new k(this.c,t),t)},R.prototype.load=function(t){var e=this,o=e.a.projectId,r=e.a.version;if(o){var i=e.c.m;w(this.c,function(t,e,o){return l(t.c)+"//"+(t=(t.a.api||"fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/,""))+"/"+e+".js"+(o?"?v="+o:"")}(e,o,r),function(r){r?t([]):(i["__MonotypeConfiguration__"+o]=function(){return e.a},function e(){if(i["__mti_fntLst"+o]){var r,n=i["__mti_fntLst"+o](),a=[];if(n)for(var s=0;s<n.length;s++){var p=n[s].fontfamily;null!=n[s].fontStyle&&null!=n[s].fontWeight?(r=n[s].fontStyle+n[s].fontWeight,a.push(new g(p,r))):a.push(new g(p))}t(a)}else setTimeout(function(){e()},50)}())}).id="__MonotypeAPIScript__"+o}else t([])},D.prototype.load=function(t){var e,o,r=this.a.urls||[],i=this.a.families||[],n=this.a.testStrings||{},a=new u;for(e=0,o=r.length;e<o;e++)y(this.c,r[e],m(a));var s=[];for(e=0,o=i.length;e<o;e++)if((r=i[e].split(":"))[1])for(var p=r[1].split(","),d=0;d<p.length;d+=1)s.push(new g(r[0],p[d]));else s.push(new g(r[0]));h(a,function(){t(s,n)})};var G="//fonts.googleapis.com/css";function K(t){this.f=t,this.a=[],this.c={}}var U={latin:"BESbswy","latin-ext":"çöüğş",cyrillic:"йяЖ",greek:"αβΣ",khmer:"កខគ",Hanuman:"កខគ"},J={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Q={i:"i",italic:"i",n:"n",normal:"n"},X=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;function Z(t,e){this.c=t,this.a=e}var tt={Arimo:!0,Cousine:!0,Tinos:!0};function et(t,e){this.c=t,this.a=e}function ot(t,e){this.c=t,this.f=e,this.a=[]}Z.prototype.load=function(t){var e=new u,o=this.c,r=new $(this.a.api,l(o),this.a.text),i=this.a.families;!function(t,e){for(var o=e.length,r=0;r<o;r++){var i=e[r].split(":");3==i.length&&t.f.push(i.pop());var n="";2==i.length&&""!=i[1]&&(n=":"),t.a.push(i.join(n))}}(r,i);var n=new K(i);!function(t){for(var e=t.f.length,o=0;o<e;o++){var r=t.f[o].split(":"),i=r[0].replace(/\+/g," "),n=["n4"];if(2<=r.length){var a;if(a=[],s=r[1])for(var s,p=(s=s.split(",")).length,d=0;d<p;d++){var c;if((c=s[d]).match(/^[\w-]+$/))if(null==(y=X.exec(c.toLowerCase())))c="";else{if(c=null==(c=y[2])||""==c?"n":Q[c],null==(y=y[1])||""==y)y="4";else var l=J[y],y=l||(isNaN(y)?"4":y.substr(0,1));c=[c,y].join("")}else c="";c&&a.push(c)}0<a.length&&(n=a),3==r.length&&(a=[],0<(r=(r=r[2])?r.split(","):a).length&&(r=U[r[0]])&&(t.c[i]=r))}for(t.c[i]||(r=U[i])&&(t.c[i]=r),r=0;r<n.length;r+=1)t.a.push(new g(i,n[r]))}}(n),y(o,function(t){if(0==t.a.length)throw Error("No fonts to load!");if(-1!=t.c.indexOf("kit="))return t.c;for(var e=t.a.length,o=[],r=0;r<e;r++)o.push(t.a[r].replace(/ /g,"+"));return e=t.c+"?family="+o.join("%7C"),0<t.f.length&&(e+="&subset="+t.f.join(",")),0<t.g.length&&(e+="&text="+encodeURIComponent(t.g)),e}(r),m(e)),h(e,function(){t(n.a,n.c,tt)})},et.prototype.load=function(t){var e=this.a.id,o=this.c.m;e?w(this.c,(this.a.api||"https://use.typekit.net")+"/"+e+".js",function(e){if(e)t([]);else if(o.Typekit&&o.Typekit.config&&o.Typekit.config.fn){e=o.Typekit.config.fn;for(var r=[],i=0;i<e.length;i+=2)for(var n=e[i],a=e[i+1],s=0;s<a.length;s++)r.push(new g(n,a[s]));try{o.Typekit.load({events:!1,classes:!1,async:!0})}catch(t){}t(r)}},2e3):t([])},ot.prototype.load=function(t){var e=this.f.id,o=this.c.m,r=this;e?(o.__webfontfontdeckmodule__||(o.__webfontfontdeckmodule__={}),o.__webfontfontdeckmodule__[e]=function(e,o){for(var i=0,n=o.fonts.length;i<n;++i){var a=o.fonts[i];r.a.push(new g(a.name,x("font-weight:"+a.weight+";font-style:"+a.style)))}t(r.a)},w(this.c,l(this.c)+(this.f.api||"//f.fontdeck.com/s/css/js/")+function(t){return t.m.location.hostname||t.a.location.hostname}(this.c)+"/"+e+".js",function(e){e&&t([])})):t([])};var rt=new H(window);rt.a.c.custom=function(t,e){return new D(e,t)},rt.a.c.fontdeck=function(t,e){return new ot(e,t)},rt.a.c.monotype=function(t,e){return new R(e,t)},rt.a.c.typekit=function(t,e){return new et(e,t)},rt.a.c.google=function(t,e){return new Z(e,t)};var it={load:o(rt.load,rt)};"function"==typeof define&&define.amd?define(function(){return it}):"undefined"!=typeof module&&module.exports?module.exports=it:(window.WebFont=it,window.WebFontConfig&&rt.load(window.WebFontConfig))}(),function(){var t,e,o,r,i,n,a,s,p,d=!0,c="",l=function(){},y=document.documentElement.clientWidth,w=window.innerHeight||document.documentElement.clientHeight,u=y<=window.cornerVideo.params["mobile-breakpoint"],m=window.cornerVideo.params["video-width"+(u?"-mobile":"")],h=null,f=0,b=0,g=100,P=window.cornerVideo.params["position-vertical-offset"+(u?"-mobile":"")],v=window.cornerVideo.params["position-side-offset"+(u?"-mobile":"")],V="",x="",k="",_=!1,M=!1;void 0===window.cornerVideo.params["enable-cta"]&&(window.cornerVideo.params["enable-cta"]=!1,window.cornerVideo.params["cta-color"]="#000000",window.cornerVideo.params["cta-text-color"]="#ffffff",window.cornerVideo.params["cta-border-radius"]=6,window.cornerVideo.params["cta-border-width"]=0,window.cornerVideo.params["cta-border-line"]="solid",window.cornerVideo.params["cta-border-color"]="black",window.cornerVideo.params["cta-box-shadow-x"]=0,window.cornerVideo.params["cta-box-shadow-y"]=0,window.cornerVideo.params["cta-box-shadow-blur"]=16,window.cornerVideo.params["cta-box-shadow-color"]="#000088",window.cornerVideo.params["cta-text"]="Buy Now",window.cornerVideo.params["cta-url"]="https://clickperfect.com",window.cornerVideo.params["cta-target"]="new-window",window.cornerVideo.params["cta-font-size"]=24,window.cornerVideo.params["cta-padding"]=16,window.cornerVideo.params["cta-margin"]=0,window.cornerVideo.params["cta-close-margin"]=4,window.cornerVideo.params["cta-font"]="Poppins",window.cornerVideo.params["cta-color2"]="#0398d3"),void 0===window.cornerVideo.params["hide-powered-by"]&&(window.cornerVideo.params["hide-powered-by"]=!1,window.cornerVideo.params["powered-by-link"]="cornervideos.com");var S=document.body.matches?"matches":document.body.webkitMatchesSelector?"webkitMatchesSelector":document.body.mozMatchesSelector?"mozMatchesSelector":document.body.msMatchesSelector?"msMatchesSelector":null,T={youtube:/^(http[s]?:\/\/|\/\/)?(www\.)?youtube\.com\/embed\//,vimeo:/^(http[s]?:\/\/|\/\/)?player\.vimeo\.com\/video\//,facebook:/^(http[s]?:\/\/|\/\/)?(www\.)?facebook\.com\/plugins\/video\.php/,twitch:/^(http[s]?:\/\/|\/\/)?player\.twitch\.tv\//,brightcove:/^(http[s]?:\/\/|\/\/)?players\.brightcove\.net\//,jwplatform:/^(http[s]?:\/\/|\/\/)?content\.jwplatform\.com\/players\//,dailymotion:/^(http[s]?:\/\/|\/\/)?(www\.)?dailymotion\.com\/embed\/video\//,youku:/^(http[s]?:\/\/|\/\/)?(player\.)?youku\.com\/embed\//,tudou:/^(http[s]?:\/\/|\/\/)?(www\.)?tudou\.com\/programs\/view\/html5embed/,wistia:/^(http[s]?:\/\/|\/\/)?(fast\.|www\.)?wistia\.(net|com)\/embed\/iframe\//,schooltube:/^(http[s]?:\/\/|\/\/)?(www\.)?schooltube\.com\/embed_force\//,break:/^(http[s]?:\/\/|\/\/)?(www\.)?break\.com\/embed\//,metacafe:/^(http[s]?:\/\/|\/\/)?(www\.)?metacafe\.com\/embed\//,liveleak:/^(http[s]?:\/\/|\/\/)?(www\.)?liveleak\.com\/ll_embed\?/,archive:/^(http[s]?:\/\/|\/\/)?(www\.)?archive\.org\/embed\//},A={wpVideo:{selector:".wp-video",init:function(){e=t.querySelector("video"),o=t.querySelector(".mejs-video")},preStickyness:function(){n=e.getAttribute("width"),a=e.getAttribute("height"),s=e.getAttribute("style"),o&&o.getAttribute("style")},preFinalPositioning:function(){e.removeAttribute("width"),e.removeAttribute("height"),e.style.setProperty("max-width","100%","important")},preTransitioning:function(){o&&(mejs.players[o.id].setPlayerSize(m,g),mejs.players[o.id].setControlsSize())},resetStickyness:function(){e.setAttribute("style",s),e.setAttribute("width",n),e.setAttribute("height",a)},preResetTransitioning:function(){o&&(mejs.players[o.id].setPlayerSize(),mejs.players[o.id].setControlsSize())},isVideoPaused:function(){return e.paused}},jwplayer:{selector:".jwplayer",init:l,preStickyness:l,preFinalPositioning:l,preTransitioning:l,resetStickyness:l,preResetTransitioning:l,isVideoPaused:function(){return!1}},wistia:{selector:".wistia_embed",init:l,preStickyness:function(){!o&&Wistia&&Wistia.api&&(o=Wistia.api(t.id))},preFinalPositioning:l,preTransitioning:function(){o&&(o.videoHeight(g),o.videoWidth(m))},resetStickyness:l,preResetTransitioning:function(){o&&(o.videoHeight(b),o.videoWidth(f))},isVideoPaused:function(){return!o&&Wistia&&Wistia.api&&(o=Wistia.api(t.id)),o&&"playing"!==o.state()}},html5:{selector:"video",init:l,preStickyness:l,preFinalPositioning:function(){t.style.setProperty("max-width","100%","important")},preTransitioning:l,resetStickyness:l,preResetTransitioning:l,isVideoPaused:function(){return t.paused}}};function j(){for(p in document.getElementById("sticky-video--placeholder"),A)c+=A[p].selector+("html5"===p?"":",");if("string"==typeof window.cornerVideo.params["forced-selector"]&&(t=document.querySelector(window.cornerVideo.params["forced-selector"])))"forced";else{if(r=document.body,"class"===window.cornerVideo.params["selecting-method"]){if(t=document.querySelector(".forced-sticky-video"))return void"forced";if(!(t=document.querySelector(".sticky-video"))&&!(r=document.querySelector(".contains-sticky-video")))return}if(t||((t=r.querySelector(c))||(t=r.getElementsByTagName("iframe")),t&&0!==t.length)){var e,o;if("string"==typeof t.tagName&&"iframe"!==t.tagName.toLowerCase()){for(p in A)if(t[S](A[p].selector))return"player",void A[p].init()}else for("string"==typeof t.tagName&&"iframe"===t.tagName.toLowerCase()&&(t=[t]),o=0;o<t.length;o++)if("string"==typeof(e=t[o].getAttribute("src")))for(var i in T)if(T[i].test(e))return"iframe",void(t=t[o]);if(null===t){var n=document.querySelector(".video_wrapper.widescreen");if(n&&null!==n){var a=n.childNodes;for(t=document.querySelector(".video_wrapper.widescreen>iframe"),o=0;o<a.length;o++)"IFRAME"===a[o].tagName&&(t=a[o])}}}}}"Arial"!==window.cornerVideo.params["cta-font"]&&"Fantasy"!==window.cornerVideo.params["cta-font"]&&WebFont&&WebFont.load({google:{families:[window.cornerVideo.params["cta-font"]]}});var N,C,E=function(){if(y=document.documentElement.clientWidth,w=window.innerHeight||document.documentElement.clientHeight,u=y<=window.cornerVideo.params["mobile-breakpoint"],m=window.cornerVideo.params["video-width"+(u?"-mobile":"")],P=window.cornerVideo.params["position-vertical-offset"+(u?"-mobile":"")],v=window.cornerVideo.params["position-side-offset"+(u?"-mobile":"")],j(),null!==t){h=window.getComputedStyle(t),f=parseInt(h.getPropertyValue("width")),b=parseInt(h.getPropertyValue("height")),g=m/f*b;var e=document.querySelector("#sticky_cta__btn");e&&e.style.setProperty("width",m-(window.cornerVideo.params["enable-close-button"]?40+window.cornerVideo.params["cta-close-margin"]:0)+"px");var o=document.querySelector("#sticky_power_by__link");if(o&&o.style.setProperty("width",m+"px"),_){switch(window.cornerVideo.params["video-position"]){case"top":t.style.setProperty("top",P+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("left",Math.round((y-m)/2)+"px","important");break;case"bottom":t.style.setProperty("top",Math.round(w-g-P)+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("left",Math.round((y-m)/2)+"px","important");break;case"right":t.style.setProperty("top",Math.round((w-g)/2)-20+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("left",Math.round(y-m-v)+"px","important");break;case"left":t.style.setProperty("top",Math.round((w-g)/2)-20+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("left",v+"px","important");break;case"middle":t.style.setProperty("top",Math.round((w-g)/2)-20+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("left",Math.round((y-m)/2)+"px","important");break;case"top-left":case"top-right":t.style.setProperty("top",P+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("left",-1!==window.cornerVideo.params["video-position"].indexOf("-left")?v+"px":Math.round(y-m-v)+"px","important");break;case"bottom-left":case"bottom-right":t.style.setProperty("top",Math.round(w-g-P)+"px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("bottom","auto","important"),t.style.setProperty("left",-1!==window.cornerVideo.params["video-position"].indexOf("-left")?v+"px":Math.round(y-m-v)+"px","important")}setTimeout(I,500),setTimeout(O,500),setTimeout(q,500)}}},W=function(){clearTimeout(N),N=setTimeout(E,100)};function I(){if(window.cornerVideo.params["enable-cta"]&&_){var t=document.querySelector("#sticky_cta__btn"),e=document.querySelector("#sticky_close__btn");if(t.style.setProperty("opacity","1","important"),t.style.setProperty("position","fixed","important"),window.cornerVideo.params["video-position"].indexOf("top")>-1){if(t.style.setProperty("top",g+P+1+"px","important"),t.style.setProperty("bottom","auto","important"),window.cornerVideo.params["video-position"].indexOf("-left")>-1?(t.style.setProperty("left",window.cornerVideo.params["enable-close-button"]&&e?v+40+"px":v+"px","important"),t.style.setProperty("right","auto","important")):(t.style.setProperty("left","auto","important"),t.style.setProperty("right",window.cornerVideo.params["enable-close-button"]&&e?v+40+"px":v+"px","important")),"top"===window.cornerVideo.params["video-position"]){var o=Math.round((y-m)/2);t.style.setProperty("left",o+"px","important"),t.style.setProperty("right","auto","important")}}else t.style.setProperty("top","auto","important"),t.style.setProperty("bottom",g+P+1+"px","important"),window.cornerVideo.params["video-position"].indexOf("left")>-1?(t.style.setProperty("left",window.cornerVideo.params["enable-close-button"]&&e?v+40+"px":v+"px","important"),t.style.setProperty("right","auto","important")):(t.style.setProperty("left","auto","important"),t.style.setProperty("right",window.cornerVideo.params["enable-close-button"]&&e?v+40+"px":v+"px","important")),"bottom"!==window.cornerVideo.params["video-position"]&&"middle"!==window.cornerVideo.params["video-position"]||(t.style.setProperty("left",Math.round((y-m)/2)+"px","important"),t.style.setProperty("right","auto","important")),"left"!==window.cornerVideo.params["video-position"]&&"right"!==window.cornerVideo.params["video-position"]&&"middle"!==window.cornerVideo.params["video-position"]||(t.style.setProperty("top",Math.round((w-g)/2)+g-20+"px","important"),t.style.setProperty("bottom","auto","important"))}}function O(){if(window.cornerVideo.params["enable-close-button"]&&_){var t=document.querySelector("#sticky_close__btn");if(t.style.setProperty("opacity","1","important"),t.style.setProperty("position","fixed","important"),window.cornerVideo.params["video-position"].indexOf("top")>-1){if(t.style.setProperty("top",g+P+1+"px","important"),t.style.setProperty("bottom","auto","important"),window.cornerVideo.params["video-position"].indexOf("-left")>-1?(t.style.setProperty("left",v+"px","important"),t.style.setProperty("right","auto","important")):(t.style.setProperty("left","auto","important"),t.style.setProperty("right",v+"px","important")),"top"===window.cornerVideo.params["video-position"]){var e=Math.round((y-m)/2)+m-40;t.style.setProperty("left",e+"px","important"),t.style.setProperty("right","auto","important")}}else{if(t.style.setProperty("top","auto","important"),t.style.setProperty("bottom",g+P+1+"px","important"),window.cornerVideo.params["video-position"].indexOf("left")>-1?(t.style.setProperty("left",v+"px","important"),t.style.setProperty("right","auto","important")):(t.style.setProperty("left","auto","important"),t.style.setProperty("right",v+"px","important")),"bottom"===window.cornerVideo.params["video-position"]||"middle"===window.cornerVideo.params["video-position"]){var o=Math.round((y-m)/2)+m-40;t.style.setProperty("left",o+"px","important"),t.style.setProperty("right","auto","important")}"left"!==window.cornerVideo.params["video-position"]&&"right"!==window.cornerVideo.params["video-position"]&&"middle"!==window.cornerVideo.params["video-position"]||(t.style.setProperty("top",Math.round((w-g)/2)+g-20+"px","important"),t.style.setProperty("bottom","auto","important"))}}}function q(){if(!window.cornerVideo.params["hide-powered-by"]&&_){var t=document.querySelector("#sticky_power_by__link");switch(t.style.setProperty("opacity","1","important"),t.style.setProperty("position","fixed","important"),window.cornerVideo.params["video-position"]){case"top":t.style.setProperty("top",(window.cornerVideo.params["enable-cta"]?P-15:g+P+2)+"px","important"),t.style.setProperty("left",Math.round((y-m)/2)+"px","important");break;case"bottom":t.style.setProperty("top",Math.round(w-P)+"px","important"),t.style.setProperty("left",Math.round((y-m)/2)+"px","important");break;case"right":t.style.setProperty("top",Math.round((w-g)/2)-37+"px","important"),t.style.setProperty("left",Math.round(y-m-v)+"px","important");break;case"left":t.style.setProperty("top",Math.round((w-g)/2)-37+"px","important"),t.style.setProperty("left",v+"px","important");break;case"middle":t.style.setProperty("top",Math.round((w-g)/2)-37+"px","important"),t.style.setProperty("left",Math.round((y-m)/2)+"px","important");break;case"top-left":case"top-right":t.style.setProperty("top",(window.cornerVideo.params["enable-cta"]?P-15:g+P+2)+"px","important"),t.style.setProperty("left",-1!==window.cornerVideo.params["video-position"].indexOf("-left")?v+"px":Math.round(y-m-v)+"px","important");break;case"bottom-left":case"bottom-right":t.style.setProperty("top",Math.round(w-P)+"px","important"),t.style.setProperty("left",-1!==window.cornerVideo.params["video-position"].indexOf("-left")?v+"px":Math.round(y-m-v)+"px","important")}}}function z(e,o,r){if(_=!1,t.style.setProperty("border","0px","important"),t.style.setProperty("box-shadow","none","important"),setTimeout(function(){t.style.setProperty("border","0px","important"),t.style.setProperty("box-shadow","none","important")},Math.round(window.cornerVideo.params["transition-duration"]/10)),window.cornerVideo.params["enable-close-button"]&&e){e.style.setProperty("opacity","0","important"),e.style.setProperty("position","absolute","important");var i=setInterval(function(){"0"===e.style.getPropertyValue("opacity")?clearInterval(i):(e.style.setProperty("opacity","0","important"),e.style.setProperty("position","absolute","important"))},Math.round(window.cornerVideo.params["transition-duration"]))}if(window.cornerVideo.params["enable-cta"]&&o){o.style.setProperty("opacity","0","important"),o.style.setProperty("position","absolute","important");var n=setInterval(function(){"0"===o.style.getPropertyValue("opacity")?clearInterval(n):(o.style.setProperty("opacity","0","important"),o.style.setProperty("position","absolute","important"))},Math.round(window.cornerVideo.params["transition-duration"]))}if(!window.cornerVideo.params["hide-powered-by"]&&r){r.style.setProperty("opacity","0","important"),r.style.setProperty("position","absolute","important");var a=setInterval(function(){"0"===r.style.getPropertyValue("opacity")?clearInterval(a):(r.style.setProperty("opacity","0","important"),r.style.setProperty("position","absolute","important"))},Math.round(window.cornerVideo.params["transition-duration"]))}d=!1,"fade"!==window.cornerVideo.params["transition-type"]&&"fadein"!==window.cornerVideo.params["transition-type"]||(t.style.setProperty("-webkit-transition-property","opacity, transform, position"),t.style.setProperty("transition-property","opacity, transform, position"),t.style.setProperty("-webkit-transition-duration","0s","important"),t.style.setProperty("transition-duration","0s","important"),setTimeout(function(){t.style.setProperty("opacity","1","important")},50)),"motion"!==window.cornerVideo.params["transition-type"]&&"slidein"!==window.cornerVideo.params["transition-type"]||(t.style.setProperty("-webkit-transition","top "+Math.round(window.cornerVideo.params["transition-duration"]/1e3*100)/100+"s ease 0s, right "+Math.round(window.cornerVideo.params["transition-duration"]/1e3*100)/100+"s ease 0s, bottom "+Math.round(window.cornerVideo.params["transition-duration"]/1e3*100)/100+"s ease 0s, left "+Math.round(window.cornerVideo.params["transition-duration"]/1e3*100)/100+"s ease 0s"),t.style.setProperty("transition","top "+Math.round(window.cornerVideo.params["transition-duration"]/1e3*100)/100+"s ease 0s, right "+Math.round(window.cornerVideo.params["transition-duration"]/1e3*100)/100+"s ease 0s, bottom "+Math.round(window.cornerVideo.params["transition-duration"]/1e3*100)/100+"s ease 0s, left "+Math.round(window.cornerVideo.params["transition-duration"]/1e3*100)/100+"s ease 0s"),setTimeout(function(){t.style.setProperty("top","0px","important"),t.style.setProperty("right","0px","important"),t.style.setProperty("bottom","0px","important"),t.style.setProperty("left","0px","important")},50))}function F(){j();var e=t.parentNode,o=document.querySelector("#sticky_close__btn"),r=document.querySelector("#sticky_cta__btn"),n=document.querySelector("#sticky_power_by__link");if(window.cornerVideo.params["enable-close-button"]&&null===o)setTimeout(function(){F()},400);else if(null!==t){if(t.clientWidth,t.clientHeight,M)return o&&o.style.setProperty("opacity","0"),r&&r.style.setProperty("opacity","0"),t.setAttribute("style",k),t.setAttribute("width",V),void t.setAttribute("height",x);if(h=window.getComputedStyle(t),f=parseInt(h.getPropertyValue("width")),b=parseInt(h.getPropertyValue("height")),g=m/f*b,0===(window.scrollY||window.pageYOffset))z(o,r,n);else{var a=e.getBoundingClientRect();i=a.top+(window.scrollY||window.pageYOffset),(window.scrollY||window.pageYOffset)>i&&0!==i?(_=!0,t.style.transition="none",t.style.border=window.cornerVideo.params["border-width"]+"px "+window.cornerVideo.params["border-line"]+" "+window.cornerVideo.params["border-color"],t.style["box-shadow"]=window.cornerVideo.params["box-shadow-x"]+"px "+window.cornerVideo.params["box-shadow-y"]+"px "+window.cornerVideo.params["box-shadow-blur"]+"px "+window.cornerVideo.params["box-shadow-color"],"fade"!==window.cornerVideo.params["transition-type"]&&"fadein"!==window.cornerVideo.params["transition-type"]||(t.style.setProperty("-webkit-transition-duration","0s","important"),t.style.setProperty("transition-duration","0s","important"),t.style.setProperty("-webkit-transition-property","opacity, transform"),t.style.setProperty("transition-property","opacity, transform"),d?t.style.setProperty("opacity","1","important"):(t.style.setProperty("opacity","0"),setTimeout(function(){t.style.setProperty("-webkit-transition-duration",Math.round(window.cornerVideo.params["transition-duration"]/1e3*100)/100+"s"),t.style.setProperty("transition-duration",Math.round(window.cornerVideo.params["transition-duration"]/1e3*100)/100+"s"),t.style.setProperty("opacity","1")},Math.round(window.cornerVideo.params["transition-duration"]/10)))),"motion"!==window.cornerVideo.params["transition-type"]&&"slidein"!==window.cornerVideo.params["transition-type"]||(t.style.setProperty("-webkit-transition","top "+Math.round(window.cornerVideo.params["transition-duration"]/1e3*100)/100+"s ease 0s, right "+Math.round(window.cornerVideo.params["transition-duration"]/1e3*100)/100+"s ease 0s, bottom "+Math.round(window.cornerVideo.params["transition-duration"]/1e3*100)/100+"s ease 0s, left "+Math.round(window.cornerVideo.params["transition-duration"]/1e3*100)/100+"s ease 0s"),t.style.setProperty("transition","top "+Math.round(window.cornerVideo.params["transition-duration"]/1e3*100)/100+"s ease 0s, right "+Math.round(window.cornerVideo.params["transition-duration"]/1e3*100)/100+"s ease 0s, bottom "+Math.round(window.cornerVideo.params["transition-duration"]/1e3*100)/100+"s ease 0s, left "+Math.round(window.cornerVideo.params["transition-duration"]/1e3*100)/100+"s ease 0s")),d||"grow"===window.cornerVideo.params["transition-type"]||"scale"===window.cornerVideo.params["transition-type"]?(window.cornerVideo.params["enable-close-button"]&&o&&setTimeout(O,5e3),window.cornerVideo.params["enable-cta"]&&r&&setTimeout(I,5e3),!window.cornerVideo.params["hide-powered-by"]&&n&&setTimeout(q,500),d=!1):(window.cornerVideo.params["enable-close-button"]&&o&&setTimeout(O,window.cornerVideo.params["transition-duration"]+5e3),window.cornerVideo.params["enable-cta"]&&r&&setTimeout(I,window.cornerVideo.params["transition-duration"]+5e3),!window.cornerVideo.params["hide-powered-by"]&&n&&setTimeout(q,window.cornerVideo.params["transition-duration"]),d=!0)):z(o,r,n)}}}window.onload=function(){if(window.localStorage.setItem("clickedClose","false"),window.cornerVideo.params["transition-type"]&&void 0!==window.cornerVideo.params["transition-type"]||(window.cornerVideo.params["transition-type"]="none"),window.cornerVideo.params["transition-duration"]&&void 0!==window.cornerVideo.params["transition-duration"]||(window.cornerVideo.params["transition-duration"]=500),j(),null!==t){var e=t.parentNode;e&&null!==e&&(e.appendChild(((i=document.createElement("button")).setAttribute("id","sticky_close__btn"),i.style.setProperty("width","40px"),i.style.setProperty("cursor","pointer"),i.style.setProperty("height",30+2*window.cornerVideo.params["cta-padding"]+"px"),i.style.setProperty("position","absolute"),i.style.setProperty("z-index","999999"),i.style.setProperty("top",-1*(30+2*window.cornerVideo.params["cta-padding"])+"px"),i.style.setProperty("left","0"),i.style.setProperty("bottom","auto"),i.style.setProperty("right","auto"),i.style.setProperty("opacity","0"),i.style.setProperty("font-size",window.cornerVideo.params["cta-font-size"]+"px"),i.style.setProperty("padding",window.cornerVideo.params["cta-padding"]+"px 0px"),i.style.setProperty("margin",window.cornerVideo.params["cta-margin"]+"px 0px"),i.style.setProperty("will-change","opacity, transform, position"),window.cornerVideo.params["cta-color2"]&&"none"!==window.cornerVideo.params["cta-color2"]?i.style.setProperty("background-image","linear-gradient("+window.cornerVideo.params["cta-color"]+", "+window.cornerVideo.params["cta-color2"]+")"):i.style.setProperty("background-color",window.cornerVideo.params["cta-color"]),i.style.setProperty("color",window.cornerVideo.params["cta-text-color"]),i.style.setProperty("border-radius",window.cornerVideo.params["cta-border-radius"]+"px","important"),i.style.setProperty("border",window.cornerVideo.params["cta-border-width"]+"px "+window.cornerVideo.params["cta-border-line"]+" "+window.cornerVideo.params["cta-border-color"]),i.style.setProperty("box-shadow",window.cornerVideo.params["cta-box-shadow-x"]+"px "+window.cornerVideo.params["cta-box-shadow-y"]+"px "+window.cornerVideo.params["cta-box-shadow-blur"]+"px "+window.cornerVideo.params["cta-box-shadow-color"]),i.innerHTML="&times;",i.addEventListener("click",function(){M=!0,window.localStorage.setItem("clickedClose","true"),i.style.setProperty("opacity","0"),t.setAttribute("style",k),t.setAttribute("width",V),t.setAttribute("height",x);var e=document.querySelector("#sticky_cta__btn");e&&e.style.setProperty("opacity","0")}),i)),e.appendChild(((r=document.createElement("button")).setAttribute("id","sticky_cta__btn"),r.style.setProperty("min-width","100px"),r.style.setProperty("cursor","pointer"),r.style.setProperty("width",m-(window.cornerVideo.params["enable-close-button"]?40+window.cornerVideo.params["cta-close-margin"]:0)+"px"),r.style.setProperty("max-width",m-(window.cornerVideo.params["enable-close-button"]?40+window.cornerVideo.params["cta-close-margin"]:0)+"px"),r.style.setProperty("height",30+2*window.cornerVideo.params["cta-padding"]+"px"),r.style.setProperty("position","absolute"),r.style.setProperty("z-index","999999"),r.style.setProperty("top",-1*(30+2*window.cornerVideo.params["cta-padding"])+"px"),r.style.setProperty("left","0"),r.style.setProperty("bottom","auto"),r.style.setProperty("right","auto"),r.style.setProperty("opacity","0"),r.style.setProperty("will-change","opacity, transform, position"),r.style.setProperty("font-family",window.cornerVideo.params["cta-font"],"important"),r.style.setProperty("font-size",window.cornerVideo.params["cta-font-size"]+"px"),r.style.setProperty("padding",window.cornerVideo.params["cta-padding"]+"px 0px"),r.style.setProperty("margin",window.cornerVideo.params["cta-margin"]+"px "+(window.cornerVideo.params["enable-close-button"]?window.cornerVideo.params["cta-close-margin"]:0)+"px "+window.cornerVideo.params["cta-margin"]+"px 0px"),r.innerHTML=window.cornerVideo.params["cta-text"],window.cornerVideo.params["cta-color2"]&&"none"!==window.cornerVideo.params["cta-color2"]?r.style.setProperty("background-image","linear-gradient("+window.cornerVideo.params["cta-color"]+", "+window.cornerVideo.params["cta-color2"]+")"):r.style.setProperty("background-color",window.cornerVideo.params["cta-color"]),r.style.setProperty("color",window.cornerVideo.params["cta-text-color"]),r.style.setProperty("border-radius",window.cornerVideo.params["cta-border-radius"]+"px","important"),r.style.setProperty("border",window.cornerVideo.params["cta-border-width"]+"px "+window.cornerVideo.params["cta-border-line"]+" "+window.cornerVideo.params["cta-border-color"]),r.style.setProperty("box-shadow",window.cornerVideo.params["cta-box-shadow-x"]+"px "+window.cornerVideo.params["cta-box-shadow-y"]+"px "+window.cornerVideo.params["cta-box-shadow-blur"]+"px "+window.cornerVideo.params["cta-box-shadow-color"]),r.addEventListener("click",function(){window.open(window.cornerVideo.params["cta-url"],"none"===window.cornerVideo.params["cta-target"]?"_self":"_blank")}),r)),e.appendChild(((o=document.createElement("div")).setAttribute("id","sticky_power_by__link"),o.style.setProperty("width",m+"px"),o.style.setProperty("height","17px"),o.style.setProperty("padding-top","2px"),o.style.setProperty("line-height","14px"),o.style.setProperty("font-size","14px"),o.style.setProperty("font-family","Arial, sans-serif"),o.style.setProperty("color","black"),o.style.setProperty("text-align","center"),o.style.setProperty("text-decoration","none","important"),o.style.setProperty("opacity","0"),o.style.setProperty("will-change","opacity, transform, position"),o.style.setProperty("position","absolute"),o.style.setProperty("z-index","999999"),o.style.setProperty("top","0px"),o.style.setProperty("right","auto"),o.style.setProperty("bottom","auto"),o.style.setProperty("left","0px"),o.style.setProperty("cursor","pointer"),o.innerHTML='powered by <a style="color: #3f83f2;font-weight: bold;text-decoration: none !important;" href="'+window.cornerVideo.params["powered-by-link"]+'" target="_blank">'+window.cornerVideo.params["powered-by-link"]+"</a>",o)),"BODY"!==e.parentNode.tagName?function t(e,o,r){"BODY"===o.tagName?e.style.setProperty("z-index","999999","important"):t(r,o.parentNode,r.parentNode)}(e,e.parentNode.parentNode,e.parentNode):e.style.setProperty("z-index","999999","important")),V=t.getAttribute("width"),x=t.getAttribute("height"),k=t.getAttribute("style"),W(),L()}var o,r,i},window.addEventListener("resize",W);var L=function(){if(M)return t.setAttribute("style",k),t.setAttribute("width",V),void t.setAttribute("height",x);clearTimeout(C),C=setTimeout(F,20)};window.addEventListener("scroll",L)}();
