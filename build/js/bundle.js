(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var modal = require('./js-modules/modal.js');

var app = {
	videoModal: null,

	init: function () {
		// Fixed nav offset
		this.eventBindings();
		this.initSliders();
	},

	eventBindings: function () {
		// On window load
		$(window).load(function () {
			var navOffset = $('.hero--wrapper').innerHeight();
			app.fixNavToTop(navOffset);

			// On window scroll
			$(window).scroll(function () {
				app.fixNavToTop(navOffset);
			});
		});

		// Autoplay video on mouseover
		$('.video__container').mouseover(function (e) {
			$(this).find('video')[0].volume = 0;
			$(this).find('video')[0].play();
		}).mouseout(function (e) {
			$(this).find('video')[0].pause();
		});

		// Show video modal on click
		$('.video__container').click(function (e) {
			e.preventDefault();

			var src = $(this).find('source').attr('src');
			app.buildVideoModal(src);
			app.videoModal.show();
		});

		// On 'Request Meeting' click
		$('.request-meeting').click(function (e) {
			e.preventDefault();

			$('.form-modal__request-meeting').addClass('active');
		});

		// On PDF download links click
		$('.assets__slider--item a').click(function (e) {
			e.preventDefault();

			$('.form-modal__pdf-download').addClass('active');
		});

		// Form modal close
		$('.form-modal--close').click(function (e) {
			e.preventDefault();

			$(this).closest('.modal--wrapper').removeClass('active');
		});
	},

	modalEventBindings: function () {
		$('.video-modal__close').click(function (e) {
			e.preventDefault();
			app.videoModal.destroy();
		});
	},

	fixNavToTop: function (offset) {
		// Fix nav to top
		if ($(window).scrollTop() > offset) {
			if ($('.fixed-nav--wrapper').hasClass('fixed-top')) {
				return false;
			} else {
				$('.fixed-nav--wrapper').addClass('fixed-top');
				$('.partner--wrapper').css({ 'margin-top': $('.fixed-nav--wrapper').innerHeight() - 28 + 'px' });
			}
		} else {
			if ($('.fixed-top').length > 0) {
				$('.fixed-nav--wrapper').removeClass('fixed-top');
				$('.partner--wrapper').removeAttr('style');
			}
		}
	},

	buildVideoModal: function (src) {
		// Build video contents
		var $videoWrapper = $('<div>'),
		    $video = $('<video>'),
		    $videoClose = $('<div>');

		$videoWrapper.addClass('video-modal--inner');
		$video.addClass('video-modal__video');
		$videoClose.addClass('video-modal__close');

		$video.attr({
			src: src,
			autoplay: true,
			controls: true
		});

		$videoWrapper.append($video).append($videoClose);

		console.log($videoWrapper);

		app.videoModal = new modal('video-modal');
		app.videoModal.init(app.modalEventBindings, app);

		$('.modal-inner').append($videoWrapper);

		app.modalEventBindings();
	},

	initSliders: function () {
		$('.testimonials__slider').slick({
			appendArrows: $('.testimonials__arrows')
		});

		$('.assets__slider').slick({
			appendArrows: $('.assets__arrows')
		});
	},

	showAssetsForm: function () {
		//
	},

	redirectToAsset: function () {
		//
	}
};

$(function () {
	app.init();
});

},{"./js-modules/modal.js":2}],2:[function(require,module,exports){
var modalFullscreen = function (id) {
	this.id = id;
	this.$container = null;
	this.$body = $('body');
};

modalFullscreen.prototype = {

	constructor: modalFullscreen,

	init: function (callback, callbackObj) {
		this.build(callback, callbackObj);
	},

	build: function (callback, callbackObj) {
		var $modalWrapper = $('<div>'),
		    $modalInner = $('<div>');

		$modalInner.addClass('modal-inner');
		$modalWrapper.addClass('modal--wrapper ' + this.id);
		$modalWrapper.append($modalInner);
		this.$body.append($modalWrapper);

		this.$container = $modalWrapper;

		callback.apply(callbackObj);
	},

	show: function () {
		$('.' + this.id).addClass('active');
		this.$body.css({ 'overflow': 'hidden' });
	},

	hide: function () {
		$('.' + this.id).removeClass('active');
		this.$body.css({ 'overflow': 'visible' });
	},

	destroy: function () {
		$('.' + this.id).remove();
		this.$body.css({ 'overflow': 'visible' });
	}
};

module.exports = modalFullscreen;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvanMtbW9kdWxlcy9tb2RhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksUUFBUSxRQUFRLHVCQUFSLENBQVI7O0FBRUosSUFBSSxNQUFNO0FBQ1QsYUFBWSxJQUFaOztBQUVBLE9BQU0sWUFBVzs7QUFFaEIsT0FBSyxhQUFMLEdBRmdCO0FBR2hCLE9BQUssV0FBTCxHQUhnQjtFQUFYOztBQU1OLGdCQUFlLFlBQVc7O0FBRXpCLElBQUUsTUFBRixFQUFVLElBQVYsQ0FBZSxZQUFXO0FBQ3pCLE9BQUksWUFBWSxFQUFFLGdCQUFGLEVBQW9CLFdBQXBCLEVBQVosQ0FEcUI7QUFFekIsT0FBSSxXQUFKLENBQWdCLFNBQWhCOzs7QUFGeUIsSUFLekIsQ0FBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixZQUFXO0FBQzNCLFFBQUksV0FBSixDQUFnQixTQUFoQixFQUQyQjtJQUFYLENBQWpCLENBTHlCO0dBQVgsQ0FBZjs7O0FBRnlCLEdBYXpCLENBQUUsbUJBQUYsRUFBdUIsU0FBdkIsQ0FBaUMsVUFBUyxDQUFULEVBQVk7QUFDNUMsS0FBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsRUFBc0IsQ0FBdEIsRUFBeUIsTUFBekIsR0FBa0MsQ0FBbEMsQ0FENEM7QUFFNUMsS0FBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsRUFBc0IsQ0FBdEIsRUFBeUIsSUFBekIsR0FGNEM7R0FBWixDQUFqQyxDQUdHLFFBSEgsQ0FHWSxVQUFTLENBQVQsRUFBWTtBQUN2QixLQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsT0FBYixFQUFzQixDQUF0QixFQUF5QixLQUF6QixHQUR1QjtHQUFaLENBSFo7OztBQWJ5QixHQXFCekIsQ0FBRSxtQkFBRixFQUF1QixLQUF2QixDQUE2QixVQUFTLENB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YUFBbEIsRUFQcUM7O0FBU3JDLE9BQUssVUFBTCxHQUFrQixhQUFsQixDQVRxQzs7QUFXckMsV0FBUyxLQUFULENBQWUsV0FBZixFQVhxQztFQUEvQjs7QUFjUCxPQUFNLFlBQVU7QUFDZixJQUFFLE1BQU0sS0FBSyxFQUFMLENBQVIsQ0FBaUIsUUFBakIsQ0FBMEIsUUFBMUIsRUFEZTtBQUVmLE9BQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxFQUFFLFlBQVcsUUFBWCxFQUFqQixFQUZlO0VBQVY7O0FBS04sT0FBTSxZQUFVO0FBQ2YsSUFBRSxNQUFNLEtBQUssRUFBTCxDQUFSLENBQWlCLFdBQWpCLENBQTZCLFFBQTdCLEVBRGU7QUFFZixPQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsRUFBRSxZQUFXLFNBQVgsRUFBakIsRUFGZTtFQUFWOztBQUtOLFVBQVMsWUFBVTtBQUNsQixJQUFFLE1BQU0sS0FBSyxFQUFMLENBQVIsQ0FBaUIsTUFBakIsR0FEa0I7QUFFbEIsT0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEVBQUMsWUFBVyxTQUFYLEVBQWhCLEVBRmtCO0VBQVY7Q0FoQ1Y7O0FBc0NBLE9BQU8sT0FBUCxHQUFpQixlQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgbW9kYWwgPSByZXF1aXJlKCcuL2pzLW1vZHVsZXMvbW9kYWwuanMnKTtcblxudmFyIGFwcCA9IHtcblx0dmlkZW9Nb2RhbDogbnVsbCxcblxuXHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHQvLyBGaXhlZCBuYXYgb2Zmc2V0XG5cdFx0dGhpcy5ldmVudEJpbmRpbmdzKCk7XG5cdFx0dGhpcy5pbml0U2xpZGVycygpO1xuXHR9LFxuXG5cdGV2ZW50QmluZGluZ3M6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIE9uIHdpbmRvdyBsb2FkXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmF2T2Zmc2V0ID0gJCgnLmhlcm8tLXdyYXBwZXInKS5pbm5lckhlaWdodCgpO1xuXHRcdFx0YXBwLmZpeE5hdlRvVG9wKG5hdk9mZnNldCk7XG5cblx0XHRcdC8vIE9uIHdpbmRvdyBzY3JvbGxcblx0XHRcdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGFwcC5maXhOYXZUb1RvcChuYXZPZmZzZXQpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBBdXRvcGxheSB2aWRlbyBvbiBtb3VzZW92ZXJcblx0XHQkKCcudmlkZW9fX2NvbnRhaW5lcicpLm1vdXNlb3ZlcihmdW5jdGlvbihlKSB7XG5cdFx0XHQkKHRoaXMpLmZpbmQoJ3ZpZGVvJylbMF0udm9sdW1lID0gMDtcblx0XHRcdCQodGhpcykuZmluZCgndmlkZW8nKVswXS5wbGF5KCk7XG5cdFx0fSkubW91c2VvdXQoZnVuY3Rpb24oZSkge1xuXHRcdFx0JCh0aGlzKS5maW5kKCd2aWRlbycpWzBdLnBhdXNlKCk7XG5cdFx0fSk7XG5cblx0XHQvLyBTaG93IHZpZGVvIG1vZGFsIG9uIGNsaWNrXG5cdFx0JCgnLnZpZGVvX19jb250YWluZXInKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdHZhciBzcmMgPSAkKHRoaXMpLmZpbmQoJ3NvdXJjZScpLmF0dHIoJ3NyYycpO1xuXHRcdFx0YXBwLmJ1aWxkVmlkZW9Nb2RhbChzcmMpO1xuXHRcdFx0YXBwLnZpZGVvTW9kYWwuc2hvdygpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gT24gJ1JlcXVlc3QgTWVldGluZycgY2xpY2tcblx0XHQkKCcucmVxdWVzdC1tZWV0aW5nJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHQkKCcuZm9ybS1tb2RhbF9fcmVxdWVzdC1tZWV0aW5nJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gT24gUERGIGRvd25sb2FkIGxpbmtzIGNsaWNrXG5cdFx0JCgnLmFzc2V0c19fc2xpZGVyLS1pdGVtIGEnKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdCQoJy5mb3JtLW1vZGFsX19wZGYtZG93bmxvYWQnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0fSk7XG5cblx0XHQvLyBGb3JtIG1vZGFsIGNsb3NlXG5cdFx0JCgnLmZvcm0tbW9kYWwtLWNsb3NlJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHQkKHRoaXMpLmNsb3Nlc3QoJy5tb2RhbC0td3JhcHBlcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHR9KTtcblx0fSxcblxuXHRtb2RhbEV2ZW50QmluZGluZ3M6IGZ1bmN0aW9uKCkge1xuXHRcdCQoJy52aWRlby1tb2RhbF9fY2xvc2UnKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRhcHAudmlkZW9Nb2RhbC5kZXN0cm95KCk7XG5cdFx0fSk7XG5cdH0sXG5cblx0Zml4TmF2VG9Ub3A6IGZ1bmN0aW9uKG9mZnNldCkge1xuXHRcdC8vIEZpeCBuYXYgdG8gdG9wXG5cdFx0aWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IG9mZnNldCkge1xuXHRcdFx0aWYgKCQoJy5maXhlZC1uYXYtLXdyYXBwZXInKS5oYXNDbGFzcygnZml4ZWQtdG9wJykpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JCgnLmZpeGVkLW5hdi0td3JhcHBlcicpLmFkZENsYXNzKCdmaXhlZC10b3AnKTtcblx0XHRcdFx0JCgnLnBhcnRuZXItLXdyYXBwZXInKS5jc3MoeyAnbWFyZ2luLXRvcCc6ICgkKCcuZml4ZWQtbmF2LS13cmFwcGVyJykuaW5uZXJIZWlnaHQoKSAtIDI4KSArICdweCcgfSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICgkKCcuZml4ZWQtdG9wJykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHQkKCcuZml4ZWQtbmF2LS13cmFwcGVyJykucmVtb3ZlQ2xhc3MoJ2ZpeGVkLXRvcCcpO1xuXHRcdFx0XHQkKCcucGFydG5lci0td3JhcHBlcicpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGJ1aWxkVmlkZW9Nb2RhbDogZnVuY3Rpb24oc3JjKSB7XG5cdFx0Ly8gQnVpbGQgdmlkZW8gY29udGVudHNcblx0XHR2YXIgJHZpZGVvV3JhcHBlciA9ICQoJzxkaXY+JyksXG5cdFx0XHQkdmlkZW8gPSAkKCc8dmlkZW8+JyksXG5cdFx0XHQkdmlkZW9DbG9zZSA9ICQoJzxkaXY+Jyk7XG5cblx0XHQkdmlkZW9XcmFwcGVyLmFkZENsYXNzKCd2aWRlby1tb2RhbC0taW5uZXInKTtcblx0XHQkdmlkZW8uYWRkQ2xhc3MoJ3ZpZGVvLW1vZGFsX192aWRlbycpO1xuXHRcdCR2aWRlb0Nsb3NlLmFkZENsYXNzKCd2aWRlby1tb2RhbF9fY2xvc2UnKTtcblxuXHRcdCR2aWRlby5hdHRyKHtcblx0XHRcdHNyYzogc3JjLFxuXHRcdFx0YXV0b3BsYXk6IHRydWUsXG5cdFx0XHRjb250cm9sczogdHJ1ZVxuXHRcdH0pO1xuXG5cdFx0JHZpZGVvV3JhcHBlci5hcHBlbmQoJHZpZGVvKS5hcHBlbmQoJHZpZGVvQ2xvc2UpO1xuXG5cdFx0Y29uc29sZS5sb2coJHZpZGVvV3JhcHBlcik7XG5cblx0XHRhcHAudmlkZW9Nb2RhbCA9IG5ldyBtb2RhbCgndmlkZW8tbW9kYWwnKTtcblx0XHRhcHAudmlkZW9Nb2RhbC5pbml0KGFwcC5tb2RhbEV2ZW50QmluZGluZ3MsIGFwcCk7XG5cblx0XHQkKCcubW9kYWwtaW5uZXInKS5hcHBlbmQoJHZpZGVvV3JhcHBlcik7XG5cblx0XHRhcHAubW9kYWxFdmVudEJpbmRpbmdzKCk7XG5cdH0sXG5cblx0aW5pdFNsaWRlcnM6IGZ1bmN0aW9uKCkge1xuXHRcdCQoJy50ZXN0aW1vbmlhbHNfX3NsaWRlcicpLnNsaWNrKHtcblx0XHRcdGFwcGVuZEFycm93czogJCgnLnRlc3RpbW9uaWFsc19fYXJyb3dzJylcblx0XHR9KTtcblxuXHRcdCQoJy5hc3NldHNfX3NsaWRlcicpLnNsaWNrKHtcblx0XHRcdGFwcGVuZEFycm93czogJCgnLmFzc2V0c19fYXJyb3dzJylcblx0XHR9KTtcblx0fSxcblxuXHRzaG93QXNzZXRzRm9ybTogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gXG5cdH0sXG5cblx0cmVkaXJlY3RUb0Fzc2V0OiBmdW5jdGlvbigpIHtcblx0XHQvLyBcblx0fVxufVxuXG5cbiQoZnVuY3Rpb24oKSB7XG5cdGFwcC5pbml0KCk7XG59KTsiLCJ2YXIgbW9kYWxGdWxsc2NyZWVuID0gZnVuY3Rpb24oaWQpIHtcblx0dGhpcy5pZCA9IGlkO1xuXHR0aGlzLiRjb250YWluZXIgPSBudWxsO1xuXHR0aGlzLiRib2R5ID0gJCgnYm9keScpO1xufVxuXG5tb2RhbEZ1bGxzY3JlZW4ucHJvdG90eXBlID0ge1xuXG5cdGNvbnN0cnVjdG9yOiBtb2RhbEZ1bGxzY3JlZW4sXG5cblx0aW5pdDogZnVuY3Rpb24oY2FsbGJhY2ssIGNhbGxiYWNrT2JqKXtcblx0XHR0aGlzLmJ1aWxkKGNhbGxiYWNrLCBjYWxsYmFja09iaik7XG5cdH0sXG5cblx0YnVpbGQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjYWxsYmFja09iail7XG5cdFx0dmFyICRtb2RhbFdyYXBwZXIgPSAkKCc8ZGl2PicpLFxuXHRcdFx0JG1vZGFsSW5uZXIgPSAkKCc8ZGl2PicpO1xuXG5cdFx0JG1vZGFsSW5uZXIuYWRkQ2xhc3MoJ21vZGFsLWlubmVyJyk7XG5cdFx0JG1vZGFsV3JhcHBlci5hZGRDbGFzcygnbW9kYWwtLXdyYXBwZXIgJyArIHRoaXMuaWQpO1xuXHRcdCRtb2RhbFdyYXBwZXIuYXBwZW5kKCRtb2RhbElubmVyKTtcblx0XHR0aGlzLiRib2R5LmFwcGVuZCgkbW9kYWxXcmFwcGVyKTtcblx0XHRcblx0XHR0aGlzLiRjb250YWluZXIgPSAkbW9kYWxXcmFwcGVyO1xuXG5cdFx0Y2FsbGJhY2suYXBwbHkoY2FsbGJhY2tPYmopO1xuXHR9LFxuXG5cdHNob3c6IGZ1bmN0aW9uKCl7XG5cdFx0JCgnLicgKyB0aGlzLmlkKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0dGhpcy4kYm9keS5jc3MoeyAnb3ZlcmZsb3cnOidoaWRkZW4nIH0pO1xuXHR9LFxuXG5cdGhpZGU6IGZ1bmN0aW9uKCl7XG5cdFx0JCgnLicgKyB0aGlzLmlkKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0dGhpcy4kYm9keS5jc3MoeyAnb3ZlcmZsb3cnOid2aXNpYmxlJyB9KTtcblx0fSxcblxuXHRkZXN0cm95OiBmdW5jdGlvbigpe1xuXHRcdCQoJy4nICsgdGhpcy5pZCkucmVtb3ZlKCk7XG5cdFx0dGhpcy4kYm9keS5jc3MoeydvdmVyZmxvdyc6J3Zpc2libGUnfSk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtb2RhbEZ1bGxzY3JlZW47Il19
