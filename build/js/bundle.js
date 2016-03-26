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
		$('.assets__slider--item').click(function (e) {
			e.preventDefault();
			console.log('clicked');

			// $('.form-modal__pdf-download').addClass('active');
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
			appendArrows: $('.assets__arrows'),
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 767,
				settings: {
					slidesToShow: 2
				}
			}, {
				breakpoint: 525,
				settings: {
					slidesToShow: 1
				}
			}]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvanMtbW9kdWxlcy9tb2RhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksUUFBUSxRQUFRLHVCQUFSLENBQVI7O0FBRUosSUFBSSxNQUFNO0FBQ1QsYUFBWSxJQUFaOztBQUVBLE9BQU0sWUFBVzs7QUFFaEIsT0FBSyxhQUFMLEdBRmdCO0FBR2hCLE9BQUssV0FBTCxHQUhnQjtFQUFYOztBQU1OLGdCQUFlLFlBQVc7O0FBRXpCLElBQUUsTUFBRixFQUFVLElBQVYsQ0FBZSxZQUFXO0FBQ3pCLE9BQUksWUFBWSxFQUFFLGdCQUFGLEVBQW9CLFdBQXBCLEVBQVosQ0FEcUI7QUFFekIsT0FBSSxXQUFKLENBQWdCLFNBQWhCOzs7QUFGeUIsSUFLekIsQ0FBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixZQUFXO0FBQzNCLFFBQUksV0FBSixDQUFnQixTQUFoQixFQUQyQjtJQUFYLENBQWpCLENBTHlCO0dBQVgsQ0FBZjs7O0FBRnlCLEdBYXpCLENBQUUsbUJBQUYsRUFBdUIsU0FBdkIsQ0FBaUMsVUFBUyxDQUFULEVBQVk7QUFDNUMsS0FBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsRUFBc0IsQ0FBdEIsRUFBeUIsTUFBekIsR0FBa0MsQ0FBbEMsQ0FENEM7QUFFNUMsS0FBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsRUFBc0IsQ0FBdEIsRUFBeUIsSUFBekIsR0FGNEM7R0FBWixDQUFqQyxDQUdHLFFBSEgsQ0FHWSxVQUFTLENBQVQsRUFBWTtBQUN2QixLQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsT0FBYixFQUFzQixDQUF0QixFQUF5QixLQUF6QixHQUR1QjtHQUFaLENBSFo7OztBQWJ5QixHQXFCekIsQ0FBRSxtQkFBRixFQUF1QixLQUF2QixDQUE2QixVQUFTLENB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ckMsY0FBWSxRQUFaLENBQXFCLGFBQXJCLEVBSnFDO0FBS3JDLGdCQUFjLFFBQWQsQ0FBdUIsb0JBQW9CLEtBQUssRUFBTCxDQUEzQyxDQUxxQztBQU1yQyxnQkFBYyxNQUFkLENBQXFCLFdBQXJCLEVBTnFDO0FBT3JDLE9BQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsYUFBbEIsRUFQcUM7O0FBU3JDLE9BQUssVUFBTCxHQUFrQixhQUFsQixDQVRxQzs7QUFXckMsV0FBUyxLQUFULENBQWUsV0FBZixFQVhxQztFQUEvQjs7QUFjUCxPQUFNLFlBQVU7QUFDZixJQUFFLE1BQU0sS0FBSyxFQUFMLENBQVIsQ0FBaUIsUUFBakIsQ0FBMEIsUUFBMUIsRUFEZTtBQUVmLE9BQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxFQUFFLFlBQVcsUUFBWCxFQUFqQixFQUZlO0VBQVY7O0FBS04sT0FBTSxZQUFVO0FBQ2YsSUFBRSxNQUFNLEtBQUssRUFBTCxDQUFSLENBQWlCLFdBQWpCLENBQTZCLFFBQTdCLEVBRGU7QUFFZixPQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsRUFBRSxZQUFXLFNBQVgsRUFBakIsRUFGZTtFQUFWOztBQUtOLFVBQVMsWUFBVTtBQUNsQixJQUFFLE1BQU0sS0FBSyxFQUFMLENBQVIsQ0FBaUIsTUFBakIsR0FEa0I7QUFFbEIsT0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEVBQUMsWUFBVyxTQUFYLEVBQWhCLEVBRmtCO0VBQVY7Q0FoQ1Y7O0FBc0NBLE9BQU8sT0FBUCxHQUFpQixlQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgbW9kYWwgPSByZXF1aXJlKCcuL2pzLW1vZHVsZXMvbW9kYWwuanMnKTtcblxudmFyIGFwcCA9IHtcblx0dmlkZW9Nb2RhbDogbnVsbCxcblxuXHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHQvLyBGaXhlZCBuYXYgb2Zmc2V0XG5cdFx0dGhpcy5ldmVudEJpbmRpbmdzKCk7XG5cdFx0dGhpcy5pbml0U2xpZGVycygpO1xuXHR9LFxuXG5cdGV2ZW50QmluZGluZ3M6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIE9uIHdpbmRvdyBsb2FkXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmF2T2Zmc2V0ID0gJCgnLmhlcm8tLXdyYXBwZXInKS5pbm5lckhlaWdodCgpO1xuXHRcdFx0YXBwLmZpeE5hdlRvVG9wKG5hdk9mZnNldCk7XG5cblx0XHRcdC8vIE9uIHdpbmRvdyBzY3JvbGxcblx0XHRcdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGFwcC5maXhOYXZUb1RvcChuYXZPZmZzZXQpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBBdXRvcGxheSB2aWRlbyBvbiBtb3VzZW92ZXJcblx0XHQkKCcudmlkZW9fX2NvbnRhaW5lcicpLm1vdXNlb3ZlcihmdW5jdGlvbihlKSB7XG5cdFx0XHQkKHRoaXMpLmZpbmQoJ3ZpZGVvJylbMF0udm9sdW1lID0gMDtcblx0XHRcdCQodGhpcykuZmluZCgndmlkZW8nKVswXS5wbGF5KCk7XG5cdFx0fSkubW91c2VvdXQoZnVuY3Rpb24oZSkge1xuXHRcdFx0JCh0aGlzKS5maW5kKCd2aWRlbycpWzBdLnBhdXNlKCk7XG5cdFx0fSk7XG5cblx0XHQvLyBTaG93IHZpZGVvIG1vZGFsIG9uIGNsaWNrXG5cdFx0JCgnLnZpZGVvX19jb250YWluZXInKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdHZhciBzcmMgPSAkKHRoaXMpLmZpbmQoJ3NvdXJjZScpLmF0dHIoJ3NyYycpO1xuXHRcdFx0YXBwLmJ1aWxkVmlkZW9Nb2RhbChzcmMpO1xuXHRcdFx0YXBwLnZpZGVvTW9kYWwuc2hvdygpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gT24gJ1JlcXVlc3QgTWVldGluZycgY2xpY2tcblx0XHQkKCcucmVxdWVzdC1tZWV0aW5nJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHQkKCcuZm9ybS1tb2RhbF9fcmVxdWVzdC1tZWV0aW5nJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gT24gUERGIGRvd25sb2FkIGxpbmtzIGNsaWNrXG5cdFx0JCgnLmFzc2V0c19fc2xpZGVyLS1pdGVtJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Y29uc29sZS5sb2coJ2NsaWNrZWQnKTtcblxuXHRcdFx0Ly8gJCgnLmZvcm0tbW9kYWxfX3BkZi1kb3dubG9hZCcpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHR9KTtcblxuXHRcdC8vIEZvcm0gbW9kYWwgY2xvc2Vcblx0XHQkKCcuZm9ybS1tb2RhbC0tY2xvc2UnKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdCQodGhpcykuY2xvc2VzdCgnLm1vZGFsLS13cmFwcGVyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdG1vZGFsRXZlbnRCaW5kaW5nczogZnVuY3Rpb24oKSB7XG5cdFx0JCgnLnZpZGVvLW1vZGFsX19jbG9zZScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGFwcC52aWRlb01vZGFsLmRlc3Ryb3koKTtcblx0XHR9KTtcblx0fSxcblxuXHRmaXhOYXZUb1RvcDogZnVuY3Rpb24ob2Zmc2V0KSB7XG5cdFx0Ly8gRml4IG5hdiB0byB0b3Bcblx0XHRpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gb2Zmc2V0KSB7XG5cdFx0XHRpZiAoJCgnLmZpeGVkLW5hdi0td3JhcHBlcicpLmhhc0NsYXNzKCdmaXhlZC10b3AnKSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkKCcuZml4ZWQtbmF2LS13cmFwcGVyJykuYWRkQ2xhc3MoJ2ZpeGVkLXRvcCcpO1xuXHRcdFx0XHQkKCcucGFydG5lci0td3JhcHBlcicpLmNzcyh7ICdtYXJnaW4tdG9wJzogKCQoJy5maXhlZC1uYXYtLXdyYXBwZXInKS5pbm5lckhlaWdodCgpIC0gMjgpICsgJ3B4JyB9KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCQoJy5maXhlZC10b3AnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdCQoJy5maXhlZC1uYXYtLXdyYXBwZXInKS5yZW1vdmVDbGFzcygnZml4ZWQtdG9wJyk7XG5cdFx0XHRcdCQoJy5wYXJ0bmVyLS13cmFwcGVyJykucmVtb3ZlQXR0cignc3R5bGUnKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0YnVpbGRWaWRlb01vZGFsOiBmdW5jdGlvbihzcmMpIHtcblx0XHQvLyBCdWlsZCB2aWRlbyBjb250ZW50c1xuXHRcdHZhciAkdmlkZW9XcmFwcGVyID0gJCgnPGRpdj4nKSxcblx0XHRcdCR2aWRlbyA9ICQoJzx2aWRlbz4nKSxcblx0XHRcdCR2aWRlb0Nsb3NlID0gJCgnPGRpdj4nKTtcblxuXHRcdCR2aWRlb1dyYXBwZXIuYWRkQ2xhc3MoJ3ZpZGVvLW1vZGFsLS1pbm5lcicpO1xuXHRcdCR2aWRlby5hZGRDbGFzcygndmlkZW8tbW9kYWxfX3ZpZGVvJyk7XG5cdFx0JHZpZGVvQ2xvc2UuYWRkQ2xhc3MoJ3ZpZGVvLW1vZGFsX19jbG9zZScpO1xuXG5cdFx0JHZpZGVvLmF0dHIoe1xuXHRcdFx0c3JjOiBzcmMsXG5cdFx0XHRhdXRvcGxheTogdHJ1ZSxcblx0XHRcdGNvbnRyb2xzOiB0cnVlXG5cdFx0fSk7XG5cblx0XHQkdmlkZW9XcmFwcGVyLmFwcGVuZCgkdmlkZW8pLmFwcGVuZCgkdmlkZW9DbG9zZSk7XG5cblx0XHRjb25zb2xlLmxvZygkdmlkZW9XcmFwcGVyKTtcblxuXHRcdGFwcC52aWRlb01vZGFsID0gbmV3IG1vZGFsKCd2aWRlby1tb2RhbCcpO1xuXHRcdGFwcC52aWRlb01vZGFsLmluaXQoYXBwLm1vZGFsRXZlbnRCaW5kaW5ncywgYXBwKTtcblxuXHRcdCQoJy5tb2RhbC1pbm5lcicpLmFwcGVuZCgkdmlkZW9XcmFwcGVyKTtcblxuXHRcdGFwcC5tb2RhbEV2ZW50QmluZGluZ3MoKTtcblx0fSxcblxuXHRpbml0U2xpZGVyczogZnVuY3Rpb24oKSB7XG5cdFx0JCgnLnRlc3RpbW9uaWFsc19fc2xpZGVyJykuc2xpY2soe1xuXHRcdFx0YXBwZW5kQXJyb3dzOiAkKCcudGVzdGltb25pYWxzX19hcnJvd3MnKVxuXHRcdH0pO1xuXG5cdFx0JCgnLmFzc2V0c19fc2xpZGVyJykuc2xpY2soe1xuXHRcdFx0YXBwZW5kQXJyb3dzOiAkKCcuYXNzZXRzX19hcnJvd3MnKSxcblx0XHRcdHNsaWRlc1RvU2hvdzogMyxcblx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHRcdFx0cmVzcG9uc2l2ZTogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YnJlYWtwb2ludDogNzY3LFxuXHRcdFx0XHRcdHNldHRpbmdzOiB7XG5cdFx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRicmVha3BvaW50OiA1MjUsXG5cdFx0XHRcdFx0c2V0dGluZ3M6IHtcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogMVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0pO1xuXHR9LFxuXG5cdHNob3dBc3NldHNGb3JtOiBmdW5jdGlvbigpIHtcblx0XHQvLyBcblx0fSxcblxuXHRyZWRpcmVjdFRvQXNzZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIFxuXHR9XG59XG5cblxuJChmdW5jdGlvbigpIHtcblx0YXBwLmluaXQoKTtcbn0pOyIsInZhciBtb2RhbEZ1bGxzY3JlZW4gPSBmdW5jdGlvbihpZCkge1xuXHR0aGlzLmlkID0gaWQ7XG5cdHRoaXMuJGNvbnRhaW5lciA9IG51bGw7XG5cdHRoaXMuJGJvZHkgPSAkKCdib2R5Jyk7XG59XG5cbm1vZGFsRnVsbHNjcmVlbi5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IG1vZGFsRnVsbHNjcmVlbixcblxuXHRpbml0OiBmdW5jdGlvbihjYWxsYmFjaywgY2FsbGJhY2tPYmope1xuXHRcdHRoaXMuYnVpbGQoY2FsbGJhY2ssIGNhbGxiYWNrT2JqKTtcblx0fSxcblxuXHRidWlsZDogZnVuY3Rpb24oY2FsbGJhY2ssIGNhbGxiYWNrT2JqKXtcblx0XHR2YXIgJG1vZGFsV3JhcHBlciA9ICQoJzxkaXY+JyksXG5cdFx0XHQkbW9kYWxJbm5lciA9ICQoJzxkaXY+Jyk7XG5cblx0XHQkbW9kYWxJbm5lci5hZGRDbGFzcygnbW9kYWwtaW5uZXInKTtcblx0XHQkbW9kYWxXcmFwcGVyLmFkZENsYXNzKCdtb2RhbC0td3JhcHBlciAnICsgdGhpcy5pZCk7XG5cdFx0JG1vZGFsV3JhcHBlci5hcHBlbmQoJG1vZGFsSW5uZXIpO1xuXHRcdHRoaXMuJGJvZHkuYXBwZW5kKCRtb2RhbFdyYXBwZXIpO1xuXHRcdFxuXHRcdHRoaXMuJGNvbnRhaW5lciA9ICRtb2RhbFdyYXBwZXI7XG5cblx0XHRjYWxsYmFjay5hcHBseShjYWxsYmFja09iaik7XG5cdH0sXG5cblx0c2hvdzogZnVuY3Rpb24oKXtcblx0XHQkKCcuJyArIHRoaXMuaWQpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHR0aGlzLiRib2R5LmNzcyh7ICdvdmVyZmxvdyc6J2hpZGRlbicgfSk7XG5cdH0sXG5cblx0aGlkZTogZnVuY3Rpb24oKXtcblx0XHQkKCcuJyArIHRoaXMuaWQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHR0aGlzLiRib2R5LmNzcyh7ICdvdmVyZmxvdyc6J3Zpc2libGUnIH0pO1xuXHR9LFxuXG5cdGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG5cdFx0JCgnLicgKyB0aGlzLmlkKS5yZW1vdmUoKTtcblx0XHR0aGlzLiRib2R5LmNzcyh7J292ZXJmbG93JzondmlzaWJsZSd9KTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGFsRnVsbHNjcmVlbjsiXX0=
