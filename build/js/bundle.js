(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var modal = require('./js-modules/modal.js');

var app = {
	videoModal: null,

	init: function () {
		this.eventBindings();
		this.initSliders();
	},

	eventBindings: function () {
		// On window load
		$(window).load(function () {
			var navOffset = $('.hero--wrapper').innerHeight();

			// Check on page load to reposition header items
			app.parallaxEffectOnHeader(navOffset);
			app.fixNavToTop(navOffset);

			// Show hero features section
			$('*.load-delay').removeClass('load-delay');

			// On window scroll
			$(window).scroll(function () {
				app.parallaxEffectOnHeader(navOffset);
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
			$('html, body').css({ 'overflow': 'hidden' });
		});

		// On PDF download links click
		$('.assets__slider--item a').click(function (e) {
			e.preventDefault();

			var $pdfSlide = $(this).closest('.assets__slider--item');
			app.updatePdfModalAssets($pdfSlide);
		});

		// Form modal close
		$('.form-modal--close').click(function (e) {
			e.preventDefault();

			$('html, body').css({ 'overflow': 'visible' });
			$(this).closest('.modal--wrapper').removeClass('active');
		});
	},

	modalEventBindings: function () {
		$('.video-modal__close').click(function (e) {
			e.preventDefault();
			app.videoModal.destroy();
		});
	},

	parallaxEffectOnHeader: function (navTop) {
		var speed = $('.hero__content--wrapper').data('speed'),
		    offset = $(window).scrollTop() / speed;

		if ($(window).scrollTop() < navTop && $(window).width() > 767) {
			$('.hero__content--wrapper').css({ 'transform': 'translate3d(0, ' + offset + 'px, 0)' });
		}
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

	updatePdfModalAssets: function (slide) {
		var pdfTitle = slide.find('.assets__title').text(),
		    imageSrc = slide.find('img').attr('src'),
		    imageAlt = slide.find('img').attr('alt'),
		    source = slide.data('source');

		// Update pdf image in modal
		$('.form-modal__pdf-download').find('.form-modal__pdf-image').attr('src', imageSrc).attr('alt', imageAlt).data('source', source);

		// Update 'Downloaded PDF' hidden field
		$('.form-modal__pdf-download').find('input[name="downloaded_pdf"]').val(pdfTitle).change();

		$('.form-modal__pdf-download').addClass('active');
		$('html, body').css({ 'overflow': 'hidden' });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvanMtbW9kdWxlcy9tb2RhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksUUFBUSxRQUFRLHVCQUFSLENBQVI7O0FBRUosSUFBSSxNQUFNO0FBQ1QsYUFBWSxJQUFaOztBQUVBLE9BQU0sWUFBVztBQUNoQixPQUFLLGFBQUwsR0FEZ0I7QUFFaEIsT0FBSyxXQUFMLEdBRmdCO0VBQVg7O0FBS04sZ0JBQWUsWUFBVzs7QUFFekIsSUFBRSxNQUFGLEVBQVUsSUFBVixDQUFlLFlBQVc7QUFDekIsT0FBSSxZQUFZLEVBQUUsZ0JBQUYsRUFBb0IsV0FBcEIsRUFBWjs7O0FBRHFCLE1BSXpCLENBQUksc0JBQUosQ0FBMkIsU0FBM0IsRUFKeUI7QUFLekIsT0FBSSxXQUFKLENBQWdCLFNBQWhCOzs7QUFMeUIsSUFRekIsQ0FBRSxjQUFGLEVBQWtCLFdBQWxCLENBQThCLFlBQTlCOzs7QUFSeUIsSUFXekIsQ0FBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixZQUFXO0FBQzNCLFFBQUksc0JBQUosQ0FBMkIsU0FBM0IsRUFEMkI7QUFFM0IsUUFBSSxXQUFKLENBQWdCLFNBQWhCLEVBRjJCO0lBQVgsQ0FBakIsQ0FYeUI7R0FBWCxDQUFmOzs7QUFGeUIsR0FvQnpCLENBQUUsbUJBQUYsRUFBdUIsU0FBdkIsQ0FBaUMsVUFBUyxDQUFULEVBQVk7QUFDNUMsS0FBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsRUFBc0IsQ0FBdEIsRUFBeUIsTUFBekIsR0FBa0MsQ0FBbEMsQ0FENEM7QUFFNUMsS0FBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsRUFBc0IsQ0FBdEIsRUFBeUIsSUFBekIsR0FGNEM7R0FBWixDQUFqQyxDQUdHLFFBSEgsQ0FHWSxVQUFTLENBQVQsRUFBWTtBQUN2QixL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QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgbW9kYWwgPSByZXF1aXJlKCcuL2pzLW1vZHVsZXMvbW9kYWwuanMnKTtcblxudmFyIGFwcCA9IHtcblx0dmlkZW9Nb2RhbDogbnVsbCxcblxuXHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmV2ZW50QmluZGluZ3MoKTtcblx0XHR0aGlzLmluaXRTbGlkZXJzKCk7XG5cdH0sXG5cblx0ZXZlbnRCaW5kaW5nczogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gT24gd2luZG93IGxvYWRcblx0XHQkKHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuYXZPZmZzZXQgPSAkKCcuaGVyby0td3JhcHBlcicpLmlubmVySGVpZ2h0KCk7XG5cblx0XHRcdC8vIENoZWNrIG9uIHBhZ2UgbG9hZCB0byByZXBvc2l0aW9uIGhlYWRlciBpdGVtc1xuXHRcdFx0YXBwLnBhcmFsbGF4RWZmZWN0T25IZWFkZXIobmF2T2Zmc2V0KTtcblx0XHRcdGFwcC5maXhOYXZUb1RvcChuYXZPZmZzZXQpO1xuXG5cdFx0XHQvLyBTaG93IGhlcm8gZmVhdHVyZXMgc2VjdGlvblxuXHRcdFx0JCgnKi5sb2FkLWRlbGF5JykucmVtb3ZlQ2xhc3MoJ2xvYWQtZGVsYXknKTtcblxuXHRcdFx0Ly8gT24gd2luZG93IHNjcm9sbFxuXHRcdFx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcblx0XHRcdFx0YXBwLnBhcmFsbGF4RWZmZWN0T25IZWFkZXIobmF2T2Zmc2V0KTtcblx0XHRcdFx0YXBwLmZpeE5hdlRvVG9wKG5hdk9mZnNldCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8vIEF1dG9wbGF5IHZpZGVvIG9uIG1vdXNlb3ZlclxuXHRcdCQoJy52aWRlb19fY29udGFpbmVyJykubW91c2VvdmVyKGZ1bmN0aW9uKGUpIHtcblx0XHRcdCQodGhpcykuZmluZCgndmlkZW8nKVswXS52b2x1bWUgPSAwO1xuXHRcdFx0JCh0aGlzKS5maW5kKCd2aWRlbycpWzBdLnBsYXkoKTtcblx0XHR9KS5tb3VzZW91dChmdW5jdGlvbihlKSB7XG5cdFx0XHQkKHRoaXMpLmZpbmQoJ3ZpZGVvJylbMF0ucGF1c2UoKTtcblx0XHR9KTtcblxuXHRcdC8vIFNob3cgdmlkZW8gbW9kYWwgb24gY2xpY2tcblx0XHQkKCcudmlkZW9fX2NvbnRhaW5lcicpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0dmFyIHNyYyA9ICQodGhpcykuZmluZCgnc291cmNlJykuYXR0cignc3JjJyk7XG5cdFx0XHRhcHAuYnVpbGRWaWRlb01vZGFsKHNyYyk7XG5cdFx0XHRhcHAudmlkZW9Nb2RhbC5zaG93KCk7XG5cdFx0fSk7XG5cblx0XHQvLyBPbiAnUmVxdWVzdCBNZWV0aW5nJyBjbGlja1xuXHRcdCQoJy5yZXF1ZXN0LW1lZXRpbmcnKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdCQoJy5mb3JtLW1vZGFsX19yZXF1ZXN0LW1lZXRpbmcnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkKCdodG1sLCBib2R5JykuY3NzKHsgJ292ZXJmbG93JzogJ2hpZGRlbicgfSk7XG5cdFx0fSk7XG5cblx0XHQvLyBPbiBQREYgZG93bmxvYWQgbGlua3MgY2xpY2tcblx0XHQkKCcuYXNzZXRzX19zbGlkZXItLWl0ZW0gYScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0dmFyICRwZGZTbGlkZSA9ICQodGhpcykuY2xvc2VzdCgnLmFzc2V0c19fc2xpZGVyLS1pdGVtJyk7XG5cdFx0XHRhcHAudXBkYXRlUGRmTW9kYWxBc3NldHMoJHBkZlNsaWRlKTtcblx0XHR9KTtcblxuXHRcdC8vIEZvcm0gbW9kYWwgY2xvc2Vcblx0XHQkKCcuZm9ybS1tb2RhbC0tY2xvc2UnKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdCQoJ2h0bWwsIGJvZHknKS5jc3MoeyAnb3ZlcmZsb3cnOiAndmlzaWJsZScgfSk7XG5cdFx0XHQkKHRoaXMpLmNsb3Nlc3QoJy5tb2RhbC0td3JhcHBlcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHR9KTtcblx0fSxcblxuXHRtb2RhbEV2ZW50QmluZGluZ3M6IGZ1bmN0aW9uKCkge1xuXHRcdCQoJy52aWRlby1tb2RhbF9fY2xvc2UnKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRhcHAudmlkZW9Nb2RhbC5kZXN0cm95KCk7XG5cdFx0fSk7XG5cdH0sXG5cblx0cGFyYWxsYXhFZmZlY3RPbkhlYWRlcjogZnVuY3Rpb24obmF2VG9wKSB7XG5cdFx0dmFyIHNwZWVkID0gJCgnLmhlcm9fX2NvbnRlbnQtLXdyYXBwZXInKS5kYXRhKCdzcGVlZCcpLFxuXHRcdFx0b2Zmc2V0ID0gKCQod2luZG93KS5zY3JvbGxUb3AoKSkgLyBzcGVlZDtcblxuXHRcdGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPCBuYXZUb3AgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjcpIHtcblx0XHRcdCQoJy5oZXJvX19jb250ZW50LS13cmFwcGVyJykuY3NzKHsgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGUzZCgwLCAnICsgb2Zmc2V0ICsgJ3B4LCAwKScgfSk7XG5cdFx0fVxuXHR9LFxuXG5cdGZpeE5hdlRvVG9wOiBmdW5jdGlvbihvZmZzZXQpIHtcblx0XHQvLyBGaXggbmF2IHRvIHRvcFxuXHRcdGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBvZmZzZXQpIHtcblx0XHRcdGlmICgkKCcuZml4ZWQtbmF2LS13cmFwcGVyJykuaGFzQ2xhc3MoJ2ZpeGVkLXRvcCcpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoJy5maXhlZC1uYXYtLXdyYXBwZXInKS5hZGRDbGFzcygnZml4ZWQtdG9wJyk7XG5cdFx0XHRcdCQoJy5wYXJ0bmVyLS13cmFwcGVyJykuY3NzKHsgJ21hcmdpbi10b3AnOiAoJCgnLmZpeGVkLW5hdi0td3JhcHBlcicpLmlubmVySGVpZ2h0KCkgLSAyOCkgKyAncHgnIH0pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoJCgnLmZpeGVkLXRvcCcpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0JCgnLmZpeGVkLW5hdi0td3JhcHBlcicpLnJlbW92ZUNsYXNzKCdmaXhlZC10b3AnKTtcblx0XHRcdFx0JCgnLnBhcnRuZXItLXdyYXBwZXInKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRidWlsZFZpZGVvTW9kYWw6IGZ1bmN0aW9uKHNyYykge1xuXHRcdC8vIEJ1aWxkIHZpZGVvIGNvbnRlbnRzXG5cdFx0dmFyICR2aWRlb1dyYXBwZXIgPSAkKCc8ZGl2PicpLFxuXHRcdFx0JHZpZGVvID0gJCgnPHZpZGVvPicpLFxuXHRcdFx0JHZpZGVvQ2xvc2UgPSAkKCc8ZGl2PicpO1xuXG5cdFx0JHZpZGVvV3JhcHBlci5hZGRDbGFzcygndmlkZW8tbW9kYWwtLWlubmVyJyk7XG5cdFx0JHZpZGVvLmFkZENsYXNzKCd2aWRlby1tb2RhbF9fdmlkZW8nKTtcblx0XHQkdmlkZW9DbG9zZS5hZGRDbGFzcygndmlkZW8tbW9kYWxfX2Nsb3NlJyk7XG5cblx0XHQkdmlkZW8uYXR0cih7XG5cdFx0XHRzcmM6IHNyYyxcblx0XHRcdGF1dG9wbGF5OiB0cnVlLFxuXHRcdFx0Y29udHJvbHM6IHRydWVcblx0XHR9KTtcblxuXHRcdCR2aWRlb1dyYXBwZXIuYXBwZW5kKCR2aWRlbykuYXBwZW5kKCR2aWRlb0Nsb3NlKTtcblxuXHRcdGFwcC52aWRlb01vZGFsID0gbmV3IG1vZGFsKCd2aWRlby1tb2RhbCcpO1xuXHRcdGFwcC52aWRlb01vZGFsLmluaXQoYXBwLm1vZGFsRXZlbnRCaW5kaW5ncywgYXBwKTtcblxuXHRcdCQoJy5tb2RhbC1pbm5lcicpLmFwcGVuZCgkdmlkZW9XcmFwcGVyKTtcblxuXHRcdGFwcC5tb2RhbEV2ZW50QmluZGluZ3MoKTtcblx0fSxcblxuXHRpbml0U2xpZGVyczogZnVuY3Rpb24oKSB7XG5cdFx0JCgnLnRlc3RpbW9uaWFsc19fc2xpZGVyJykuc2xpY2soe1xuXHRcdFx0YXBwZW5kQXJyb3dzOiAkKCcudGVzdGltb25pYWxzX19hcnJvd3MnKVxuXHRcdH0pO1xuXG5cdFx0JCgnLmFzc2V0c19fc2xpZGVyJykuc2xpY2soe1xuXHRcdFx0YXBwZW5kQXJyb3dzOiAkKCcuYXNzZXRzX19hcnJvd3MnKSxcblx0XHRcdHNsaWRlc1RvU2hvdzogMyxcblx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHRcdFx0cmVzcG9uc2l2ZTogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YnJlYWtwb2ludDogNzY3LFxuXHRcdFx0XHRcdHNldHRpbmdzOiB7XG5cdFx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRicmVha3BvaW50OiA1MjUsXG5cdFx0XHRcdFx0c2V0dGluZ3M6IHtcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogMVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0pO1xuXHR9LFxuXG5cdHVwZGF0ZVBkZk1vZGFsQXNzZXRzOiBmdW5jdGlvbihzbGlkZSkge1xuXHRcdHZhciBwZGZUaXRsZSA9IHNsaWRlLmZpbmQoJy5hc3NldHNfX3RpdGxlJykudGV4dCgpLFxuXHRcdFx0aW1hZ2VTcmMgPSBzbGlkZS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnKSxcblx0XHRcdGltYWdlQWx0ID0gc2xpZGUuZmluZCgnaW1nJykuYXR0cignYWx0JyksXG5cdFx0XHRzb3VyY2UgPSBzbGlkZS5kYXRhKCdzb3VyY2UnKTtcblxuXHRcdC8vIFVwZGF0ZSBwZGYgaW1hZ2UgaW4gbW9kYWxcblx0XHQkKCcuZm9ybS1tb2RhbF9fcGRmLWRvd25sb2FkJykuZmluZCgnLmZvcm0tbW9kYWxfX3BkZi1pbWFnZScpXG5cdFx0XHQuYXR0cignc3JjJywgaW1hZ2VTcmMpXG5cdFx0XHQuYXR0cignYWx0JywgaW1hZ2VBbHQpXG5cdFx0XHQuZGF0YSgnc291cmNlJywgc291cmNlKTtcblxuXHRcdC8vIFVwZGF0ZSAnRG93bmxvYWRlZCBQREYnIGhpZGRlbiBmaWVsZFxuXHRcdCQoJy5mb3JtLW1vZGFsX19wZGYtZG93bmxvYWQnKS5maW5kKCdpbnB1dFtuYW1lPVwiZG93bmxvYWRlZF9wZGZcIl0nKVxuXHRcdFx0LnZhbChwZGZUaXRsZSlcblx0XHRcdC5jaGFuZ2UoKTtcblxuXHRcdCQoJy5mb3JtLW1vZGFsX19wZGYtZG93bmxvYWQnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0JCgnaHRtbCwgYm9keScpLmNzcyh7ICdvdmVyZmxvdyc6ICdoaWRkZW4nIH0pO1xuXHR9XG59XG5cblxuJChmdW5jdGlvbigpIHtcblx0YXBwLmluaXQoKTtcbn0pOyIsInZhciBtb2RhbEZ1bGxzY3JlZW4gPSBmdW5jdGlvbihpZCkge1xuXHR0aGlzLmlkID0gaWQ7XG5cdHRoaXMuJGNvbnRhaW5lciA9IG51bGw7XG5cdHRoaXMuJGJvZHkgPSAkKCdib2R5Jyk7XG59XG5cbm1vZGFsRnVsbHNjcmVlbi5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IG1vZGFsRnVsbHNjcmVlbixcblxuXHRpbml0OiBmdW5jdGlvbihjYWxsYmFjaywgY2FsbGJhY2tPYmope1xuXHRcdHRoaXMuYnVpbGQoY2FsbGJhY2ssIGNhbGxiYWNrT2JqKTtcblx0fSxcblxuXHRidWlsZDogZnVuY3Rpb24oY2FsbGJhY2ssIGNhbGxiYWNrT2JqKXtcblx0XHR2YXIgJG1vZGFsV3JhcHBlciA9ICQoJzxkaXY+JyksXG5cdFx0XHQkbW9kYWxJbm5lciA9ICQoJzxkaXY+Jyk7XG5cblx0XHQkbW9kYWxJbm5lci5hZGRDbGFzcygnbW9kYWwtaW5uZXInKTtcblx0XHQkbW9kYWxXcmFwcGVyLmFkZENsYXNzKCdtb2RhbC0td3JhcHBlciAnICsgdGhpcy5pZCk7XG5cdFx0JG1vZGFsV3JhcHBlci5hcHBlbmQoJG1vZGFsSW5uZXIpO1xuXHRcdHRoaXMuJGJvZHkuYXBwZW5kKCRtb2RhbFdyYXBwZXIpO1xuXHRcdFxuXHRcdHRoaXMuJGNvbnRhaW5lciA9ICRtb2RhbFdyYXBwZXI7XG5cblx0XHRjYWxsYmFjay5hcHBseShjYWxsYmFja09iaik7XG5cdH0sXG5cblx0c2hvdzogZnVuY3Rpb24oKXtcblx0XHQkKCcuJyArIHRoaXMuaWQpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHR0aGlzLiRib2R5LmNzcyh7ICdvdmVyZmxvdyc6J2hpZGRlbicgfSk7XG5cdH0sXG5cblx0aGlkZTogZnVuY3Rpb24oKXtcblx0XHQkKCcuJyArIHRoaXMuaWQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHR0aGlzLiRib2R5LmNzcyh7ICdvdmVyZmxvdyc6J3Zpc2libGUnIH0pO1xuXHR9LFxuXG5cdGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG5cdFx0JCgnLicgKyB0aGlzLmlkKS5yZW1vdmUoKTtcblx0XHR0aGlzLiRib2R5LmNzcyh7J292ZXJmbG93JzondmlzaWJsZSd9KTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGFsRnVsbHNjcmVlbjsiXX0=
