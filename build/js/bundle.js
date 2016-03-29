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
			$('body').css({ 'overflow': 'hidden' });
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

			$('body').removeAttr('style');
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
		$('body').css({ 'overflow': 'hidden' });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvanMtbW9kdWxlcy9tb2RhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksUUFBUSxRQUFRLHVCQUFSLENBQVI7O0FBRUosSUFBSSxNQUFNO0FBQ1QsYUFBWSxJQUFaOztBQUVBLE9BQU0sWUFBVztBQUNoQixPQUFLLGFBQUwsR0FEZ0I7QUFFaEIsT0FBSyxXQUFMLEdBRmdCO0VBQVg7O0FBS04sZ0JBQWUsWUFBVzs7QUFFekIsSUFBRSxNQUFGLEVBQVUsSUFBVixDQUFlLFlBQVc7QUFDekIsT0FBSSxZQUFZLEVBQUUsZ0JBQUYsRUFBb0IsV0FBcEIsRUFBWjs7O0FBRHFCLE1BSXpCLENBQUksc0JBQUosQ0FBMkIsU0FBM0IsRUFKeUI7QUFLekIsT0FBSSxXQUFKLENBQWdCLFNBQWhCOzs7QUFMeUIsSUFRekIsQ0FBRSxjQUFGLEVBQWtCLFdBQWxCLENBQThCLFlBQTlCOzs7QUFSeUIsSUFXekIsQ0FBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixZQUFXO0FBQzNCLFFBQUksc0JBQUosQ0FBMkIsU0FBM0IsRUFEMkI7QUFFM0IsUUFBSSxXQUFKLENBQWdCLFNBQWhCLEVBRjJCO0lBQVgsQ0FBakIsQ0FYeUI7R0FBWCxDQUFmOzs7QUFGeUIsR0FvQnpCLENBQUUsbUJBQUYsRUFBdUIsU0FBdkIsQ0FBaUMsVUFBUyxDQUFULEVBQVk7QUFDNUMsS0FBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsRUFBc0IsQ0FBdEIsRUFBeUIsTUFBekIsR0FBa0MsQ0FBbEMsQ0FENEM7QUFFNUMsS0FBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsRUFBc0IsQ0FBdEIsRUFBeUIsSUFBekIsR0FGNEM7R0FBWixDQUFqQyxDQUdHLFFBSEgsQ0FHWSxVQUFTLENBQVQsRUFBWTtBQUN2QixL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Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIG1vZGFsID0gcmVxdWlyZSgnLi9qcy1tb2R1bGVzL21vZGFsLmpzJyk7XG5cbnZhciBhcHAgPSB7XG5cdHZpZGVvTW9kYWw6IG51bGwsXG5cblx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5ldmVudEJpbmRpbmdzKCk7XG5cdFx0dGhpcy5pbml0U2xpZGVycygpO1xuXHR9LFxuXG5cdGV2ZW50QmluZGluZ3M6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIE9uIHdpbmRvdyBsb2FkXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmF2T2Zmc2V0ID0gJCgnLmhlcm8tLXdyYXBwZXInKS5pbm5lckhlaWdodCgpO1xuXG5cdFx0XHQvLyBDaGVjayBvbiBwYWdlIGxvYWQgdG8gcmVwb3NpdGlvbiBoZWFkZXIgaXRlbXNcblx0XHRcdGFwcC5wYXJhbGxheEVmZmVjdE9uSGVhZGVyKG5hdk9mZnNldCk7XG5cdFx0XHRhcHAuZml4TmF2VG9Ub3AobmF2T2Zmc2V0KTtcblxuXHRcdFx0Ly8gU2hvdyBoZXJvIGZlYXR1cmVzIHNlY3Rpb25cblx0XHRcdCQoJyoubG9hZC1kZWxheScpLnJlbW92ZUNsYXNzKCdsb2FkLWRlbGF5Jyk7XG5cblx0XHRcdC8vIE9uIHdpbmRvdyBzY3JvbGxcblx0XHRcdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGFwcC5wYXJhbGxheEVmZmVjdE9uSGVhZGVyKG5hdk9mZnNldCk7XG5cdFx0XHRcdGFwcC5maXhOYXZUb1RvcChuYXZPZmZzZXQpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBBdXRvcGxheSB2aWRlbyBvbiBtb3VzZW92ZXJcblx0XHQkKCcudmlkZW9fX2NvbnRhaW5lcicpLm1vdXNlb3ZlcihmdW5jdGlvbihlKSB7XG5cdFx0XHQkKHRoaXMpLmZpbmQoJ3ZpZGVvJylbMF0udm9sdW1lID0gMDtcblx0XHRcdCQodGhpcykuZmluZCgndmlkZW8nKVswXS5wbGF5KCk7XG5cdFx0fSkubW91c2VvdXQoZnVuY3Rpb24oZSkge1xuXHRcdFx0JCh0aGlzKS5maW5kKCd2aWRlbycpWzBdLnBhdXNlKCk7XG5cdFx0fSk7XG5cblx0XHQvLyBTaG93IHZpZGVvIG1vZGFsIG9uIGNsaWNrXG5cdFx0JCgnLnZpZGVvX19jb250YWluZXInKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdHZhciBzcmMgPSAkKHRoaXMpLmZpbmQoJ3NvdXJjZScpLmF0dHIoJ3NyYycpO1xuXHRcdFx0YXBwLmJ1aWxkVmlkZW9Nb2RhbChzcmMpO1xuXHRcdFx0YXBwLnZpZGVvTW9kYWwuc2hvdygpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gT24gJ1JlcXVlc3QgTWVldGluZycgY2xpY2tcblx0XHQkKCcucmVxdWVzdC1tZWV0aW5nJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHQkKCcuZm9ybS1tb2RhbF9fcmVxdWVzdC1tZWV0aW5nJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0JCgnYm9keScpLmNzcyh7ICdvdmVyZmxvdyc6ICdoaWRkZW4nIH0pO1xuXHRcdH0pO1xuXG5cdFx0Ly8gT24gUERGIGRvd25sb2FkIGxpbmtzIGNsaWNrXG5cdFx0JCgnLmFzc2V0c19fc2xpZGVyLS1pdGVtIGEnKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdHZhciAkcGRmU2xpZGUgPSAkKHRoaXMpLmNsb3Nlc3QoJy5hc3NldHNfX3NsaWRlci0taXRlbScpO1xuXHRcdFx0YXBwLnVwZGF0ZVBkZk1vZGFsQXNzZXRzKCRwZGZTbGlkZSk7XG5cdFx0fSk7XG5cblx0XHQvLyBGb3JtIG1vZGFsIGNsb3NlXG5cdFx0JCgnLmZvcm0tbW9kYWwtLWNsb3NlJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHQkKCdib2R5JykucmVtb3ZlQXR0cignc3R5bGUnKTtcblx0XHRcdCQodGhpcykuY2xvc2VzdCgnLm1vZGFsLS13cmFwcGVyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdG1vZGFsRXZlbnRCaW5kaW5nczogZnVuY3Rpb24oKSB7XG5cdFx0JCgnLnZpZGVvLW1vZGFsX19jbG9zZScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGFwcC52aWRlb01vZGFsLmRlc3Ryb3koKTtcblx0XHR9KTtcblx0fSxcblxuXHRwYXJhbGxheEVmZmVjdE9uSGVhZGVyOiBmdW5jdGlvbihuYXZUb3ApIHtcblx0XHR2YXIgc3BlZWQgPSAkKCcuaGVyb19fY29udGVudC0td3JhcHBlcicpLmRhdGEoJ3NwZWVkJyksXG5cdFx0XHRvZmZzZXQgPSAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpKSAvIHNwZWVkO1xuXG5cdFx0aWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA8IG5hdlRvcCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2Nykge1xuXHRcdFx0JCgnLmhlcm9fX2NvbnRlbnQtLXdyYXBwZXInKS5jc3MoeyAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKDAsICcgKyBvZmZzZXQgKyAncHgsIDApJyB9KTtcblx0XHR9XG5cdH0sXG5cblx0Zml4TmF2VG9Ub3A6IGZ1bmN0aW9uKG9mZnNldCkge1xuXHRcdC8vIEZpeCBuYXYgdG8gdG9wXG5cdFx0aWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IG9mZnNldCkge1xuXHRcdFx0aWYgKCQoJy5maXhlZC1uYXYtLXdyYXBwZXInKS5oYXNDbGFzcygnZml4ZWQtdG9wJykpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JCgnLmZpeGVkLW5hdi0td3JhcHBlcicpLmFkZENsYXNzKCdmaXhlZC10b3AnKTtcblx0XHRcdFx0JCgnLnBhcnRuZXItLXdyYXBwZXInKS5jc3MoeyAnbWFyZ2luLXRvcCc6ICgkKCcuZml4ZWQtbmF2LS13cmFwcGVyJykuaW5uZXJIZWlnaHQoKSAtIDI4KSArICdweCcgfSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICgkKCcuZml4ZWQtdG9wJykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHQkKCcuZml4ZWQtbmF2LS13cmFwcGVyJykucmVtb3ZlQ2xhc3MoJ2ZpeGVkLXRvcCcpO1xuXHRcdFx0XHQkKCcucGFydG5lci0td3JhcHBlcicpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGJ1aWxkVmlkZW9Nb2RhbDogZnVuY3Rpb24oc3JjKSB7XG5cdFx0Ly8gQnVpbGQgdmlkZW8gY29udGVudHNcblx0XHR2YXIgJHZpZGVvV3JhcHBlciA9ICQoJzxkaXY+JyksXG5cdFx0XHQkdmlkZW8gPSAkKCc8dmlkZW8+JyksXG5cdFx0XHQkdmlkZW9DbG9zZSA9ICQoJzxkaXY+Jyk7XG5cblx0XHQkdmlkZW9XcmFwcGVyLmFkZENsYXNzKCd2aWRlby1tb2RhbC0taW5uZXInKTtcblx0XHQkdmlkZW8uYWRkQ2xhc3MoJ3ZpZGVvLW1vZGFsX192aWRlbycpO1xuXHRcdCR2aWRlb0Nsb3NlLmFkZENsYXNzKCd2aWRlby1tb2RhbF9fY2xvc2UnKTtcblxuXHRcdCR2aWRlby5hdHRyKHtcblx0XHRcdHNyYzogc3JjLFxuXHRcdFx0YXV0b3BsYXk6IHRydWUsXG5cdFx0XHRjb250cm9sczogdHJ1ZVxuXHRcdH0pO1xuXG5cdFx0JHZpZGVvV3JhcHBlci5hcHBlbmQoJHZpZGVvKS5hcHBlbmQoJHZpZGVvQ2xvc2UpO1xuXG5cdFx0YXBwLnZpZGVvTW9kYWwgPSBuZXcgbW9kYWwoJ3ZpZGVvLW1vZGFsJyk7XG5cdFx0YXBwLnZpZGVvTW9kYWwuaW5pdChhcHAubW9kYWxFdmVudEJpbmRpbmdzLCBhcHApO1xuXG5cdFx0JCgnLm1vZGFsLWlubmVyJykuYXBwZW5kKCR2aWRlb1dyYXBwZXIpO1xuXG5cdFx0YXBwLm1vZGFsRXZlbnRCaW5kaW5ncygpO1xuXHR9LFxuXG5cdGluaXRTbGlkZXJzOiBmdW5jdGlvbigpIHtcblx0XHQkKCcudGVzdGltb25pYWxzX19zbGlkZXInKS5zbGljayh7XG5cdFx0XHRhcHBlbmRBcnJvd3M6ICQoJy50ZXN0aW1vbmlhbHNfX2Fycm93cycpXG5cdFx0fSk7XG5cblx0XHQkKCcuYXNzZXRzX19zbGlkZXInKS5zbGljayh7XG5cdFx0XHRhcHBlbmRBcnJvd3M6ICQoJy5hc3NldHNfX2Fycm93cycpLFxuXHRcdFx0c2xpZGVzVG9TaG93OiAzLFxuXHRcdFx0c2xpZGVzVG9TY3JvbGw6IDEsXG5cdFx0XHRyZXNwb25zaXZlOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRicmVha3BvaW50OiA3NjcsXG5cdFx0XHRcdFx0c2V0dGluZ3M6IHtcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogMlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGJyZWFrcG9pbnQ6IDUyNSxcblx0XHRcdFx0XHRzZXR0aW5nczoge1xuXHRcdFx0XHRcdFx0c2xpZGVzVG9TaG93OiAxXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSk7XG5cdH0sXG5cblx0dXBkYXRlUGRmTW9kYWxBc3NldHM6IGZ1bmN0aW9uKHNsaWRlKSB7XG5cdFx0dmFyIHBkZlRpdGxlID0gc2xpZGUuZmluZCgnLmFzc2V0c19fdGl0bGUnKS50ZXh0KCksXG5cdFx0XHRpbWFnZVNyYyA9IHNsaWRlLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpLFxuXHRcdFx0aW1hZ2VBbHQgPSBzbGlkZS5maW5kKCdpbWcnKS5hdHRyKCdhbHQnKSxcblx0XHRcdHNvdXJjZSA9IHNsaWRlLmRhdGEoJ3NvdXJjZScpO1xuXG5cdFx0Ly8gVXBkYXRlIHBkZiBpbWFnZSBpbiBtb2RhbFxuXHRcdCQoJy5mb3JtLW1vZGFsX19wZGYtZG93bmxvYWQnKS5maW5kKCcuZm9ybS1tb2RhbF9fcGRmLWltYWdlJylcblx0XHRcdC5hdHRyKCdzcmMnLCBpbWFnZVNyYylcblx0XHRcdC5hdHRyKCdhbHQnLCBpbWFnZUFsdClcblx0XHRcdC5kYXRhKCdzb3VyY2UnLCBzb3VyY2UpO1xuXG5cdFx0Ly8gVXBkYXRlICdEb3dubG9hZGVkIFBERicgaGlkZGVuIGZpZWxkXG5cdFx0JCgnLmZvcm0tbW9kYWxfX3BkZi1kb3dubG9hZCcpLmZpbmQoJ2lucHV0W25hbWU9XCJkb3dubG9hZGVkX3BkZlwiXScpXG5cdFx0XHQudmFsKHBkZlRpdGxlKVxuXHRcdFx0LmNoYW5nZSgpO1xuXG5cdFx0JCgnLmZvcm0tbW9kYWxfX3BkZi1kb3dubG9hZCcpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHQkKCdib2R5JykuY3NzKHsgJ292ZXJmbG93JzogJ2hpZGRlbicgfSk7XG5cdH1cbn1cblxuXG4kKGZ1bmN0aW9uKCkge1xuXHRhcHAuaW5pdCgpO1xufSk7IiwidmFyIG1vZGFsRnVsbHNjcmVlbiA9IGZ1bmN0aW9uKGlkKSB7XG5cdHRoaXMuaWQgPSBpZDtcblx0dGhpcy4kY29udGFpbmVyID0gbnVsbDtcblx0dGhpcy4kYm9keSA9ICQoJ2JvZHknKTtcbn1cblxubW9kYWxGdWxsc2NyZWVuLnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogbW9kYWxGdWxsc2NyZWVuLFxuXG5cdGluaXQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjYWxsYmFja09iail7XG5cdFx0dGhpcy5idWlsZChjYWxsYmFjaywgY2FsbGJhY2tPYmopO1xuXHR9LFxuXG5cdGJ1aWxkOiBmdW5jdGlvbihjYWxsYmFjaywgY2FsbGJhY2tPYmope1xuXHRcdHZhciAkbW9kYWxXcmFwcGVyID0gJCgnPGRpdj4nKSxcblx0XHRcdCRtb2RhbElubmVyID0gJCgnPGRpdj4nKTtcblxuXHRcdCRtb2RhbElubmVyLmFkZENsYXNzKCdtb2RhbC1pbm5lcicpO1xuXHRcdCRtb2RhbFdyYXBwZXIuYWRkQ2xhc3MoJ21vZGFsLS13cmFwcGVyICcgKyB0aGlzLmlkKTtcblx0XHQkbW9kYWxXcmFwcGVyLmFwcGVuZCgkbW9kYWxJbm5lcik7XG5cdFx0dGhpcy4kYm9keS5hcHBlbmQoJG1vZGFsV3JhcHBlcik7XG5cdFx0XG5cdFx0dGhpcy4kY29udGFpbmVyID0gJG1vZGFsV3JhcHBlcjtcblxuXHRcdGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrT2JqKTtcblx0fSxcblxuXHRzaG93OiBmdW5jdGlvbigpe1xuXHRcdCQoJy4nICsgdGhpcy5pZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdHRoaXMuJGJvZHkuY3NzKHsgJ292ZXJmbG93JzonaGlkZGVuJyB9KTtcblx0fSxcblxuXHRoaWRlOiBmdW5jdGlvbigpe1xuXHRcdCQoJy4nICsgdGhpcy5pZCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdHRoaXMuJGJvZHkuY3NzKHsgJ292ZXJmbG93JzondmlzaWJsZScgfSk7XG5cdH0sXG5cblx0ZGVzdHJveTogZnVuY3Rpb24oKXtcblx0XHQkKCcuJyArIHRoaXMuaWQpLnJlbW92ZSgpO1xuXHRcdHRoaXMuJGJvZHkuY3NzKHsnb3ZlcmZsb3cnOid2aXNpYmxlJ30pO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbW9kYWxGdWxsc2NyZWVuOyJdfQ==
