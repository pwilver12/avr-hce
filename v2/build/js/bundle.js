!function e(o,i,t){function n(d,a){if(!i[d]){if(!o[d]){var u="function"==typeof require&&require;if(!a&&u)return u(d,!0);if(r)return r(d,!0);var l=new Error("Cannot find module '"+d+"'");throw l.code="MODULE_NOT_FOUND",l}var f=i[d]={exports:{}};o[d][0].call(f.exports,function(e){var i=o[d][1][e];return n(i?i:e)},f,f.exports,e,o,i,t)}return i[d].exports}for(var r="function"==typeof require&&require,d=0;d<t.length;d++)n(t[d]);return n}({1:[function(e,o,i){"use strict";function t(e){return e&&e.__esModule?e:{"default":e}}var n=e("./modules/_video-modal"),r=t(n);$(function(){$(".media-row").length>0&&r["default"].init()})},{"./modules/_video-modal":2}],2:[function(e,o,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var t={init:function(){t.eventBindings()},eventBindings:function(){var e=this;$(".media-row [data-video=true]").click(function(o){o.preventDefault();var i=$(o.currentTarget),t=i.closest(".media-row").find(".media-row__video-modal"),n=t.find("video")[0];n.load(),n.play(),e.showVideoModal(t)}),$(".popup-modal__close").click(function(o){o.preventDefault();var i=$(o.target).closest(".media-row__video-modal"),t=i.find("video")[0];t.pause(),e.hideVideoModal(i)})},showVideoModal:function(e){e.toggleClass("active"),$("body").css({overflow:"hidden"})},hideVideoModal:function(e){e.toggleClass("active"),$("body").css({overflow:"visible"})}};i["default"]={init:t.init}},{}]},{},[1]);