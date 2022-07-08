function triggerCoverBgForYoutube(e,i,r){return e&&window.clearTimeout(e),e=window.setTimeout(function(){var e,t,o,n;i.querySelector("iframe")||(e=window.pageYOffset,t=window.innerHeight,o=t_cover__getHeightWithoutPadding(i),(n=i.getBoundingClientRect().top+e)-500<e+t&&e<=n+o+500&&cover_onFuncLoad("processYoutubeVideo",function(){window.processYoutubeVideo(i,r)}))},100)}function cover_fixcontentheight(e,t){var o,n,i,r=document.querySelector("#rec"+e),e=r.querySelector(".t-cover");e&&(e=e?t_cover__getHeightWithoutPadding(e):0,n=r.querySelector("div[data-hook-content]"),o=n?t_cover__getHeightWithoutPadding(n):0,"935"!==r.getAttribute("data-record-type")&&(300<o&&e<o+40?(cover_setRecalculatedCoverHeight(r,o),window.isMobile||setTimeout(function(){var e=r.querySelector(".t-cover__carrier");e&&e.querySelector("iframe")&&(console.log("correct video from cover_fixcontentheight"),window.setWidthAndHeightVideo(e,o+"px","youtube")),e.querySelector("video")&&console.log("correct html5video from cover_fixcontentheight")},2e3),cover_updateResizeElem(r)):window.isMobile&&t?(cover_setRecalculatedCoverHeight(r,o),cover_updateResizeElem(r)):!window.isMobile||(n=r.querySelector(".t-cover__carrier"))&&"100vh"===n.getAttribute("data-content-cover-height")&&(i=window.innerHeight,Array.prototype.forEach.call([".t-cover",".t-cover__filter",".t-cover__carrier",".t-cover__wrapper"],function(e){r.querySelector(e)&&(r.querySelector(e).style.height=i+"px")}))))}function cover_setRecalculatedCoverHeight(t,e){var o=t.querySelector(".t-cover__carrier"),o=o?o.getAttribute("data-content-cover-height"):"0",n=document.documentElement.clientHeight,n=-1!==o.indexOf("vh")?Math.round(parseInt(o,10)/100*n):parseInt(o,10),o=window.innerWidth<=568?40:120,i=window.innerWidth<=568?50:100;1e3<(e+=o)&&(e+=i),n=n<e?e:n,console.log("auto correct cover height: "+n);Array.prototype.forEach.call([".t-cover",".t-cover__filter",".t-cover__carrier",".t-cover__wrapper"],function(e){t.querySelector(e)&&(t.querySelector(e).style.height=n+"px")})}function cover_updateResizeElem(e){if("function"==typeof window.t_lazyload_updateResize_elem)try{window.t_lazyload_updateResize_elem(e.querySelector(".t-cover__carrier"))}catch(e){console.log("error:"+e)}}function cover_checkIsFixForBackgroundNeeded(e){var t,o,n,i,r,d=document.getElementById("rec"+e);if(d)return d=d.querySelector(".t-cover__carrier"),d&&(t=d.getAttribute("data-content-video-url-youtube"),o=d.getAttribute("data-content-video-url-mp4"),n=d.getAttribute("data-content-video-url-webm")),r=window.chrome&&void 0===window.opr&&-1===window.navigator.userAgent.indexOf("Edg"),i=d?window.getComputedStyle(d).transform:"",d&&r&&"matrix(1, 0, 0, 1, 0, 0)"===i&&(d.style.transform="initial"),r=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),!(window.isMobile||/Macintosh/.test(navigator.userAgent)&&"ontouchend"in document)&&r&&!t&&!o&&!n&&d&&"fixed"===d.getAttribute("data-content-cover-parallax")&&!window["cover"+e+"fixbackgroundstyles"]}function cover_fixBackgroundFixedNode(e){var t,o,n,i,r;cover_checkIsFixForBackgroundNeeded(e)&&(t=document.body.querySelector("#rec"+e),r=document.body.querySelector("#rec"+e+" .t-cover").parentNode,console.log("new fix node background-position: fixed"),window.cover_fixBackgroundStyles||(i=".t-cover__container {position: relative;}.t-cover__container .t-cover {clip: rect(0, auto, auto, 0);position: absolute;top: 0;left: 0;width: 100%;height: 100% !important;}.t-cover__container .t-cover .t-cover__carrier {position: fixed;display: block;top: 0;left: 0;width: 100%;height: 100%!important;background-size: cover;background-position: center center;transform: translateZ(0);will-change: transform;}",o=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style"),o.appendChild(n),n.type="text/css",n.styleSheet?n.styleSheet.cssText=i:n.appendChild(document.createTextNode(i)),window.cover_fixBackgroundStyles=!0),(o=document.createElement("div")).classList.add("t-cover__container"),r.insertAdjacentElement("afterbegin",o),n=t.querySelector(".t-cover"),o.style.height=t_cover__getHeightWithoutPadding(n)+"px",o.appendChild(n),void 0!==(i={275:".t256__video-container",286:".t266__video-container",337:".t-container",906:".t906__video-container"}[t.getAttribute("data-record-type")])&&(r=t.querySelector(i),o.appendChild(r)),window["cover"+e+"fixbackgroundnodes"]=!0)}function cover_fixBackgroundFixedStyles(e){var t,o,n=document.body.querySelector("#rec"+e);cover_checkIsFixForBackgroundNeeded(e)&&(console.log("new fix style background-position: fixed"),null!==(t=n.querySelector(".t-cover__container"))&&(o=(n=n.querySelector(".t-cover")).style.height,n.style.height=0,null!==t.style&&(t.style.height=o),window["cover"+e+"fixbackgroundstyles"]=!0))}function cover_onFuncLoad(e,t){var o;"function"==typeof window[e]?t():o=setInterval(function(){"function"==typeof window[e]&&(t(),clearInterval(o),o=0)},100),window.addEventListener("load",function(){setTimeout(function(){if(o&&("function"==typeof window[e]&&(t(),clearInterval(o)),"complete"===document.readyState&&"function"!=typeof window[e]))throw clearInterval(o),new Error(e+" is undefined")},5e3)})}function t_cover__getHeightWithoutPadding(e){var t=parseInt(e.style.paddingTop)||0,o=parseInt(e.style.paddingBottom)||0;return e.clientHeight?e.clientHeight-(t+o):parseInt(window.getComputedStyle(e).height,10)}function t_cover__scrollToNextSection(e,t,o){o<=0&&(o=300);var n=window.pageYOffset,i=e-n,r=0,d=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight),c=setInterval(function(){r+=Math.floor(i/15),window.scrollTo(0,n+r),document.body.setAttribute("data-scrollable","true"),(window.pageYOffset>=e||d<=n+t+r)&&(window.scrollTo(0,e),document.body.removeAttribute("data-scrollable"),clearInterval(c),c=0)},o/15);setTimeout(function(){c&&("true"===document.body.getAttribute("data-scrollable")&&document.body.removeAttribute("data-scrollable"),clearInterval(c))},2*o)}!function(){var d=window.innerHeight;window.addEventListener("resize",function(){d=window.innerHeight}),window.parallax=function(n,i,e){var r=!!document.body.style.webkitTransform;function t(){var e=window.pageYOffset,t=n.getBoundingClientRect().top+e,o=n.getBoundingClientRect().top;t+("undefined"!=typeof height?height:0)<e||e+d<t||(e=-1*Math.round(o*i),r?n.style.webkitTransform="translateY("+e+"px)":n.style.top=e+"px")}r&&(n.style.position="relative"),(arguments.length<1||null===i)&&(i=.1),t(),window.addEventListener("scroll",t),window.addEventListener("resize",t),"complete"!==document.readyState&&window.addEventListener("load",function(){t()})}}(),function(){function e(){var e=document.querySelector(".t-records");"edit"!==(e?e.getAttribute("data-tilda-mode"):"")&&(e=document.querySelectorAll(".t-cover__carrier"),Array.prototype.forEach.call(e,function(e){e=e.getAttribute("data-content-cover-id");0<e&&cover_init(e)}))}window.cover_init=function(_){function e(){var l,e,i,r,d,t,s,c,g,v,w,h,o,y,n,f,p,m,a,u=document.body.querySelector("#coverCarry"+_);u&&(l=u.getAttribute("data-content-cover-bg")||"",e=u.getAttribute("data-content-cover-height")||"",i=u.getAttribute("data-content-cover-parallax")||"",r=u.getAttribute("data-content-video-url-mp4")||"",d=u.getAttribute("data-content-video-url-webm")||"",t=u.getAttribute("data-content-video-url-youtube")||"",a=u.getAttribute("data-content-video-noloop")||"",n=u.getAttribute("data-content-video-nomute")||"",s=u.getAttribute("data-content-bg-base64")||"",(o=u.getAttribute("data-content-video-nocover")||"")&&"yes"===o&&(t=d=r=""),!window.isMobile||""===d&&""===r&&""===t||(u.style.backgroundImage='url("'+l+'")'),setTimeout(function(){cover_fixcontentheight(_,!1),cover_fixBackgroundFixedStyles(_)},500),cover_fixBackgroundFixedNode(_),(o=document.getElementById("rec"+_).querySelector("img[data-hook-clogo]"))&&(o.onload=function(){setTimeout(function(){cover_fixcontentheight(_,!1),cover_fixBackgroundFixedStyles(_)},500)}),window.isMobile&&window.addEventListener("orientationchange",function(){setTimeout(function(){cover_fixcontentheight(_,!0),cover_fixBackgroundFixedStyles(_)},200)}),""===r&&""===d&&""===t||window.isMobile||(g=!1,""!==t||""===r&&""===d?""!==t&&(u.style.backgroundColor="#000000",u.style.backgroundImage="",u.setAttribute("data-content-cover-bg",""),window.addEventListener("scroll",function(){c=triggerCoverBgForYoutube(c,u,e)}),c=triggerCoverBgForYoutube(c,u,e)):(u.style.backgroundColor="#000000",u.style.backgroundImage='url("https://tilda.ws/img/spinner-white.gif")',u.style.backgroundSize="auto",u.setAttribute("data-content-cover-bg",""),v=!1,v=""===a,w=!0,w=""===n,h=!1,"fixed"===i&&(-1!==e.indexOf("vh")&&100<parseInt(e)&&(u.style.height="100vh",h=!0),-1!==e.indexOf("px")&&parseInt(e)>window.innerHeight&&(u.style.height="100vh",h=!0)),window.addEventListener("scroll",function(){var e,t,o,n=u.parentElement;c&&window.clearTimeout(c),c=window.setTimeout(function(){var e,t,o,n;g||(e=window.pageYOffset,t=window.innerHeight,o=t_cover__getHeightWithoutPadding(u),(n=u.getBoundingClientRect().top+e)-500<e+t&&e<=n+o+500&&cover_onFuncLoad("videoBG",function(){var e=window.videoBG(u,{mp4:r,webm:d,poster:"",preload:"none",autoplay:"true",loop:v,volume:1,scale:!0,zIndex:0,width:"100%"});e.setAttribute("muted",w),e.setAttribute("playsinline",""),videoLoadProcessor.registerNewVideo(e),g=!0}))},100),"fixed"===i&&h&&(e=window.pageYOffset,t=window.innerHeight,o=t_cover__getHeightWithoutPadding(n),(n=n.getBoundingClientRect().top+e)+o-t<=e?(u.style.position="absolute",u.style.bottom="0px",u.style.top="auto"):n<=e?(u.style.position="fixed",u.style.top="0px"):e<n&&(u.style.position="relative",u.style.top="auto"))}),o=u.parentElement,c&&window.clearTimeout(c),c=window.setTimeout(function(){var e,t,o,n;g||(e=window.pageYOffset,t=window.innerHeight,o=t_cover__getHeightWithoutPadding(u),(n=u.getBoundingClientRect().top+e)-500<e+t&&e<=n+o+500&&cover_onFuncLoad("videoBG",function(){var e=window.videoBG(u,{mp4:r,webm:d,poster:"",preload:"none",autoplay:"true",loop:v,volume:1,scale:!0,zIndex:0,width:"100%"});e.setAttribute("muted",w),e.setAttribute("playsinline",""),videoLoadProcessor.registerNewVideo(e),g=!0}))},100),"fixed"===i&&h&&(a=window.pageYOffset,n=window.innerHeight,y=t_cover__getHeightWithoutPadding(o),(o=o.getBoundingClientRect().top+a)+y-n<=a?(u.style.position="absolute",u.style.bottom="0px",u.style.top="auto"):o<=a?(u.style.position="fixed",u.style.top="0px"):a<o&&(u.style.position="relative",u.style.top="auto")))),"dynamic"===i&&(window.isMobile||(y=window.innerHeight,(n=t_cover__getHeightWithoutPadding(u))<window.innerHeight&&(u.style.height=n+.2*y+"px"),window.parallax(u,.2,!0))),"fixed"===i&&window.isOpera&&(u.style.transform="unset"),"yes"===s&&""!==l&&""===r&&""===d&&""===t&&(f="",(p=document.createElement("img")).src=l,p.onload=function(){p.parentNode&&p.parentNode.removeChild(p),u.style.backgroundImage='url("'+l+'")',u.style.opacity="1",f="yes"},"yes"!==f&&(u.style.backgroundImage="",u.style.opacity="0",u.style.transition="opacity 25ms")),(a=(m=document.getElementById("rec"+_))?m.querySelector(".t-cover__arrow-wrapper"):null)&&a.addEventListener("click",function(){var e=m.offsetHeight;0<e&&t_cover__scrollToNextSection(m.getBoundingClientRect().top+window.pageYOffset+e,e,300)}),(u.hasAttribute("data-content-video-url-youtube")||u.hasAttribute("data-content-video-url-mp4")||u.hasAttribute("data-content-video-url-webm"))&&window.addEventListener("resize",t_throttle(function(){var e;u.querySelector(".videoBG")&&(e=t_cover__getHeightWithoutPadding(u),window.setWidthAndHeightVideo(u.querySelector(".videoBG"),e+"px","html5")),u.querySelector("iframe")&&(e=u.getAttribute("data-content-cover-height"),window.setWidthAndHeightVideo(u,e,"youtube"))})))}"loading"!==document.readyState?e():document.addEventListener("DOMContentLoaded",e)},"loading"!==document.readyState?e():document.addEventListener("DOMContentLoaded",e)}();