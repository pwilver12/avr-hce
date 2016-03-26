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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvanMtbW9kdWxlcy9tb2RhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksUUFBUSxRQUFRLHVCQUFSLENBQVI7O0FBRUosSUFBSSxNQUFNO0FBQ1QsYUFBWSxJQUFaOztBQUVBLE9BQU0sWUFBVzs7QUFFaEIsT0FBSyxhQUFMLEdBRmdCO0FBR2hCLE9BQUssV0FBTCxHQUhnQjtFQUFYOztBQU1OLGdCQUFlLFlBQVc7O0FBRXpCLElBQUUsTUFBRixFQUFVLElBQVYsQ0FBZSxZQUFXO0FBQ3pCLE9BQUksWUFBWSxFQUFFLGdCQUFGLEVBQW9CLFdBQXBCLEVBQVosQ0FEcUI7QUFFekIsT0FBSSxXQUFKLENBQWdCLFNBQWhCOzs7QUFGeUIsSUFLekIsQ0FBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixZQUFXO0FBQzNCLFFBQUksV0FBSixDQUFnQixTQUFoQixFQUQyQjtJQUFYLENBQWpCLENBTHlCO0dBQVgsQ0FBZjs7O0FBRnlCLEdBYXpCLENBQUUsbUJBQUYsRUFBdUIsU0FBdkIsQ0FBaUMsVUFBUyxDQUFULEVBQVk7QUFDNUMsS0FBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsRUFBc0IsQ0FBdEIsRUFBeUIsTUFBekIsR0FBa0MsQ0FBbEMsQ0FENEM7QUFFNUMsS0FBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsRUFBc0IsQ0FBdEIsRUFBeUIsSUFBekIsR0FGNEM7R0FBWixDQUFqQyxDQUdHLFFBSEgsQ0FHWSxVQUFTLENBQVQsRUFBWTtBQUN2QixLQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsT0FBYixFQUFzQixDQUF0QixFQUF5QixLQUF6QixHQUR1QjtHQUFaLENBSFo7OztBQWJ5QixHQXFCekIsQ0FBRSxtQkFBRixFQUF1QixLQUF2QixDQUE2QixVQUFTLENB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akIsQ0FBMEIsUUFBMUIsRUFEZTtBQUVmLE9BQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxFQUFFLFlBQVcsUUFBWCxFQUFqQixFQUZlO0VBQVY7O0FBS04sT0FBTSxZQUFVO0FBQ2YsSUFBRSxNQUFNLEtBQUssRUFBTCxDQUFSLENBQWlCLFdBQWpCLENBQTZCLFFBQTdCLEVBRGU7QUFFZixPQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsRUFBRSxZQUFXLFNBQVgsRUFBakIsRUFGZTtFQUFWOztBQUtOLFVBQVMsWUFBVTtBQUNsQixJQUFFLE1BQU0sS0FBSyxFQUFMLENBQVIsQ0FBaUIsTUFBakIsR0FEa0I7QUFFbEIsT0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEVBQUMsWUFBVyxTQUFYLEVBQWhCLEVBRmtCO0VBQVY7Q0FoQ1Y7O0FBc0NBLE9BQU8sT0FBUCxHQUFpQixlQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgbW9kYWwgPSByZXF1aXJlKCcuL2pzLW1vZHVsZXMvbW9kYWwuanMnKTtcblxudmFyIGFwcCA9IHtcblx0dmlkZW9Nb2RhbDogbnVsbCxcblxuXHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHQvLyBGaXhlZCBuYXYgb2Zmc2V0XG5cdFx0dGhpcy5ldmVudEJpbmRpbmdzKCk7XG5cdFx0dGhpcy5pbml0U2xpZGVycygpO1xuXHR9LFxuXG5cdGV2ZW50QmluZGluZ3M6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIE9uIHdpbmRvdyBsb2FkXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmF2T2Zmc2V0ID0gJCgnLmhlcm8tLXdyYXBwZXInKS5pbm5lckhlaWdodCgpO1xuXHRcdFx0YXBwLmZpeE5hdlRvVG9wKG5hdk9mZnNldCk7XG5cblx0XHRcdC8vIE9uIHdpbmRvdyBzY3JvbGxcblx0XHRcdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGFwcC5maXhOYXZUb1RvcChuYXZPZmZzZXQpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBBdXRvcGxheSB2aWRlbyBvbiBtb3VzZW92ZXJcblx0XHQkKCcudmlkZW9fX2NvbnRhaW5lcicpLm1vdXNlb3ZlcihmdW5jdGlvbihlKSB7XG5cdFx0XHQkKHRoaXMpLmZpbmQoJ3ZpZGVvJylbMF0udm9sdW1lID0gMDtcblx0XHRcdCQodGhpcykuZmluZCgndmlkZW8nKVswXS5wbGF5KCk7XG5cdFx0fSkubW91c2VvdXQoZnVuY3Rpb24oZSkge1xuXHRcdFx0JCh0aGlzKS5maW5kKCd2aWRlbycpWzBdLnBhdXNlKCk7XG5cdFx0fSk7XG5cblx0XHQvLyBTaG93IHZpZGVvIG1vZGFsIG9uIGNsaWNrXG5cdFx0JCgnLnZpZGVvX19jb250YWluZXInKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdHZhciBzcmMgPSAkKHRoaXMpLmZpbmQoJ3NvdXJjZScpLmF0dHIoJ3NyYycpO1xuXHRcdFx0YXBwLmJ1aWxkVmlkZW9Nb2RhbChzcmMpO1xuXHRcdFx0YXBwLnZpZGVvTW9kYWwuc2hvdygpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gT24gJ1JlcXVlc3QgTWVldGluZycgY2xpY2tcblx0XHQkKCcucmVxdWVzdC1tZWV0aW5nJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHQkKCcuZm9ybS1tb2RhbF9fcmVxdWVzdC1tZWV0aW5nJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gRm9ybSBtb2RhbCBjbG9zZVxuXHRcdCQoJy5mb3JtLW1vZGFsLS1jbG9zZScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcubW9kYWwtLXdyYXBwZXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0fSk7XG5cdH0sXG5cblx0bW9kYWxFdmVudEJpbmRpbmdzOiBmdW5jdGlvbigpIHtcblx0XHQkKCcudmlkZW8tbW9kYWxfX2Nsb3NlJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0YXBwLnZpZGVvTW9kYWwuZGVzdHJveSgpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdGZpeE5hdlRvVG9wOiBmdW5jdGlvbihvZmZzZXQpIHtcblx0XHQvLyBGaXggbmF2IHRvIHRvcFxuXHRcdGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBvZmZzZXQpIHtcblx0XHRcdGlmICgkKCcuZml4ZWQtbmF2LS13cmFwcGVyJykuaGFzQ2xhc3MoJ2ZpeGVkLXRvcCcpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoJy5maXhlZC1uYXYtLXdyYXBwZXInKS5hZGRDbGFzcygnZml4ZWQtdG9wJyk7XG5cdFx0XHRcdCQoJy5wYXJ0bmVyLS13cmFwcGVyJykuY3NzKHsgJ21hcmdpbi10b3AnOiAoJCgnLmZpeGVkLW5hdi0td3JhcHBlcicpLmlubmVySGVpZ2h0KCkgLSAyOCkgKyAncHgnIH0pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoJCgnLmZpeGVkLXRvcCcpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0JCgnLmZpeGVkLW5hdi0td3JhcHBlcicpLnJlbW92ZUNsYXNzKCdmaXhlZC10b3AnKTtcblx0XHRcdFx0JCgnLnBhcnRuZXItLXdyYXBwZXInKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRidWlsZFZpZGVvTW9kYWw6IGZ1bmN0aW9uKHNyYykge1xuXHRcdC8vIEJ1aWxkIHZpZGVvIGNvbnRlbnRzXG5cdFx0dmFyICR2aWRlb1dyYXBwZXIgPSAkKCc8ZGl2PicpLFxuXHRcdFx0JHZpZGVvID0gJCgnPHZpZGVvPicpLFxuXHRcdFx0JHZpZGVvQ2xvc2UgPSAkKCc8ZGl2PicpO1xuXG5cdFx0JHZpZGVvV3JhcHBlci5hZGRDbGFzcygndmlkZW8tbW9kYWwtLWlubmVyJyk7XG5cdFx0JHZpZGVvLmFkZENsYXNzKCd2aWRlby1tb2RhbF9fdmlkZW8nKTtcblx0XHQkdmlkZW9DbG9zZS5hZGRDbGFzcygndmlkZW8tbW9kYWxfX2Nsb3NlJyk7XG5cblx0XHQkdmlkZW8uYXR0cih7XG5cdFx0XHRzcmM6IHNyYyxcblx0XHRcdGF1dG9wbGF5OiB0cnVlLFxuXHRcdFx0Y29udHJvbHM6IHRydWVcblx0XHR9KTtcblxuXHRcdCR2aWRlb1dyYXBwZXIuYXBwZW5kKCR2aWRlbykuYXBwZW5kKCR2aWRlb0Nsb3NlKTtcblxuXHRcdGNvbnNvbGUubG9nKCR2aWRlb1dyYXBwZXIpO1xuXG5cdFx0YXBwLnZpZGVvTW9kYWwgPSBuZXcgbW9kYWwoJ3ZpZGVvLW1vZGFsJyk7XG5cdFx0YXBwLnZpZGVvTW9kYWwuaW5pdChhcHAubW9kYWxFdmVudEJpbmRpbmdzLCBhcHApO1xuXG5cdFx0JCgnLm1vZGFsLWlubmVyJykuYXBwZW5kKCR2aWRlb1dyYXBwZXIpO1xuXG5cdFx0YXBwLm1vZGFsRXZlbnRCaW5kaW5ncygpO1xuXHR9LFxuXG5cdGluaXRTbGlkZXJzOiBmdW5jdGlvbigpIHtcblx0XHQkKCcudGVzdGltb25pYWxzX19zbGlkZXInKS5zbGljayh7XG5cdFx0XHRhcHBlbmRBcnJvd3M6ICQoJy50ZXN0aW1vbmlhbHNfX2Fycm93cycpXG5cdFx0fSk7XG5cblx0XHQkKCcuYXNzZXRzX19zbGlkZXInKS5zbGljayh7XG5cdFx0XHRhcHBlbmRBcnJvd3M6ICQoJy5hc3NldHNfX2Fycm93cycpXG5cdFx0fSk7XG5cdH0sXG5cblx0c2hvd0Fzc2V0c0Zvcm06IGZ1bmN0aW9uKCkge1xuXHRcdC8vIFxuXHR9LFxuXG5cdHJlZGlyZWN0VG9Bc3NldDogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gXG5cdH1cbn1cblxuXG4kKGZ1bmN0aW9uKCkge1xuXHRhcHAuaW5pdCgpO1xufSk7IiwidmFyIG1vZGFsRnVsbHNjcmVlbiA9IGZ1bmN0aW9uKGlkKSB7XG5cdHRoaXMuaWQgPSBpZDtcblx0dGhpcy4kY29udGFpbmVyID0gbnVsbDtcblx0dGhpcy4kYm9keSA9ICQoJ2JvZHknKTtcbn1cblxubW9kYWxGdWxsc2NyZWVuLnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogbW9kYWxGdWxsc2NyZWVuLFxuXG5cdGluaXQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjYWxsYmFja09iail7XG5cdFx0dGhpcy5idWlsZChjYWxsYmFjaywgY2FsbGJhY2tPYmopO1xuXHR9LFxuXG5cdGJ1aWxkOiBmdW5jdGlvbihjYWxsYmFjaywgY2FsbGJhY2tPYmope1xuXHRcdHZhciAkbW9kYWxXcmFwcGVyID0gJCgnPGRpdj4nKSxcblx0XHRcdCRtb2RhbElubmVyID0gJCgnPGRpdj4nKTtcblxuXHRcdCRtb2RhbElubmVyLmFkZENsYXNzKCdtb2RhbC1pbm5lcicpO1xuXHRcdCRtb2RhbFdyYXBwZXIuYWRkQ2xhc3MoJ21vZGFsLS13cmFwcGVyICcgKyB0aGlzLmlkKTtcblx0XHQkbW9kYWxXcmFwcGVyLmFwcGVuZCgkbW9kYWxJbm5lcik7XG5cdFx0dGhpcy4kYm9keS5hcHBlbmQoJG1vZGFsV3JhcHBlcik7XG5cdFx0XG5cdFx0dGhpcy4kY29udGFpbmVyID0gJG1vZGFsV3JhcHBlcjtcblxuXHRcdGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrT2JqKTtcblx0fSxcblxuXHRzaG93OiBmdW5jdGlvbigpe1xuXHRcdCQoJy4nICsgdGhpcy5pZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdHRoaXMuJGJvZHkuY3NzKHsgJ292ZXJmbG93JzonaGlkZGVuJyB9KTtcblx0fSxcblxuXHRoaWRlOiBmdW5jdGlvbigpe1xuXHRcdCQoJy4nICsgdGhpcy5pZCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdHRoaXMuJGJvZHkuY3NzKHsgJ292ZXJmbG93JzondmlzaWJsZScgfSk7XG5cdH0sXG5cblx0ZGVzdHJveTogZnVuY3Rpb24oKXtcblx0XHQkKCcuJyArIHRoaXMuaWQpLnJlbW92ZSgpO1xuXHRcdHRoaXMuJGJvZHkuY3NzKHsnb3ZlcmZsb3cnOid2aXNpYmxlJ30pO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbW9kYWxGdWxsc2NyZWVuOyJdfQ==
