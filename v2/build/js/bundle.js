!function e(i,t,o){function n(l,a){if(!t[l]){if(!i[l]){var r="function"==typeof require&&require;if(!a&&r)return r(l,!0);if(s)return s(l,!0);var d=new Error("Cannot find module '"+l+"'");throw d.code="MODULE_NOT_FOUND",d}var c=t[l]={exports:{}};i[l][0].call(c.exports,function(e){var t=i[l][1][e];return n(t?t:e)},c,c.exports,e,i,t,o)}return t[l].exports}for(var s="function"==typeof require&&require,l=0;l<o.length;l++)n(o[l]);return n}({1:[function(e,i,t){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var n=e("./modules/_videoModal"),s=o(n),l=e("./modules/_blockNav"),a=o(l);$(function(){s["default"].init(),a["default"].init()})},{"./modules/_blockNav":2,"./modules/_videoModal":3}],2:[function(e,i,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={init:function(){var e=this;document.getElementsByClassName("block-nav").length&&!function(){e.setActiveNavItem(),e.checkStatus();var i=$(window).width();$(window).resize(function(){i!==$(window).width()&&(i=$(window).width(),e.checkStatus())})}()},isMobile:!1,toggleIsMobile:function(){this.isMobile=!this.isMobile},mobileBindings:function(){$(".block-nav__burger-wrapper").click(function(){$(".block-nav__links-list").toggleClass("open")})},resetNav:function(){$(".block-nav__links-list").removeClass("open")},removeMobileBindings:function(){$(".block-nav__burger-wrapper").unbind()},checkStatus:function(){$(window).width()>767?this.isMobile&&(this.resetNav(),this.removeMobileBindings(),this.toggleIsMobile()):(this.isMobile||(this.mobileBindings(),this.toggleIsMobile()),this.resetNav())},setActiveNavItem:function(){for(var e=document.getElementsByClassName("block-nav__link"),i=document.location.pathname,t=0;t<e.length;t++){var o=e[t],n=o.className,s=o.getAttribute("href")||"false";if(i.indexOf(s)>-1){o.className=n?n+" active":"active";break}}}}},{}],3:[function(e,i,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={init:function(){$(".media-row--video").length>0&&o.eventBindings()},eventBindings:function(){var e=this;$(".media-row [data-video=true]").click(function(i){i.preventDefault();var t=$(i.currentTarget),o=t.closest(".media-row").find(".media-row__video-modal"),n=o.find("video")[0];n.load(),n.play(),e.showVideoModal(o)}),$(".popup-modal__close").click(function(i){i.preventDefault();var t=$(i.target).closest(".media-row__video-modal"),o=t.find("video")[0];o.pause(),e.hideVideoModal(t)})},showVideoModal:function(e){e.toggleClass("active"),$("body").css({overflow:"hidden"})},hideVideoModal:function(e){e.toggleClass("active"),$("body").css({overflow:"visible"})}};t["default"]={init:o.init}},{}]},{},[1]);