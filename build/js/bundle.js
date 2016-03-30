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

		// On 'Request Meeting' click
		$('.request-meeting').click(function (e) {
			e.preventDefault();

			app.showModal($('.form-modal__request-meeting'));
		});

		// Show video form and modal on click
		$('.video__container').click(function (e) {
			e.preventDefault();

			if (!app.videoModal) {
				var src = $(this).find('source').attr('src');
				app.buildVideoModal(src);
			}

			if (!window.submittedVideoForm) {
				app.showModal($('.form-modal__video'));
			} else {
				app.videoModal.show();
				$('.video-modal').find('video')[0].play();
			}
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

			app.hideModal($(this).closest('.modal--wrapper'));
		});
	},

	modalEventBindings: function () {
		$('.video-modal__close').click(function (e) {
			e.preventDefault();
			app.videoModal.hide();
			$('.video-modal').find('video')[0].pause();
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

		app.showModal($('.form-modal__pdf-download'));
	},

	showModal: function ($modal) {
		$modal.addClass('active');
		$('body').css({ 'overflow': 'hidden' });
	},

	hideModal: function ($modal) {
		$modal.removeClass('active');
		$('body').css({ 'overflow': 'visible' });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvanMtbW9kdWxlcy9tb2RhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksUUFBUSxRQUFRLHVCQUFSLENBQVI7O0FBRUosSUFBSSxNQUFNO0FBQ1QsYUFBWSxJQUFaOztBQUVBLE9BQU0sWUFBVztBQUNoQixPQUFLLGFBQUwsR0FEZ0I7QUFFaEIsT0FBSyxXQUFMLEdBRmdCO0VBQVg7O0FBS04sZ0JBQWUsWUFBVzs7QUFFekIsSUFBRSxNQUFGLEVBQVUsSUFBVixDQUFlLFlBQVc7QUFDekIsT0FBSSxZQUFZLEVBQUUsZ0JBQUYsRUFBb0IsV0FBcEIsRUFBWjs7O0FBRHFCLE1BSXpCLENBQUksc0JBQUosQ0FBMkIsU0FBM0IsRUFKeUI7QUFLekIsT0FBSSxXQUFKLENBQWdCLFNBQWhCOzs7QUFMeUIsSUFRekIsQ0FBRSxjQUFGLEVBQWtCLFdBQWxCLENBQThCLFlBQTlCOzs7QUFSeUIsSUFXekIsQ0FBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixZQUFXO0FBQzNCLFFBQUksc0JBQUosQ0FBMkIsU0FBM0IsRUFEMkI7QUFFM0IsUUFBSSxXQUFKLENBQWdCLFNBQWhCLEVBRjJCO0lBQVgsQ0FBakIsQ0FYeUI7R0FBWCxDQUFmOzs7QUFGeUIsR0FvQnpCLENBQUUsa0JBQUYsRUFBc0IsS0FBdEIsQ0FBNEIsVUFBUyxDQUFULEVBQVk7QUFDdkMsS0FBRSxjQUFGLEdBRHVDOztBQUd2QyxPQUFJLFNBQUosQ0FBYyxFQUFFLDhCQUFGLENBQWQsRUFIdUM7R0FBWixDQUE1Qjs7O0FBcEJ5QixHQTJCekIsQ0FBRSxtQkFBRixFQUF1QixLQUF2QixDQUE2QixVQUFTLENBQVQsRUFBWTtBQUN4QyxLQUFFLGNBQUYsR0FEd0M7O0FBR3hDLE9BQUksQ0FBQyxJQUFJLFVBQUosRUFBZ0I7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dGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIG1vZGFsID0gcmVxdWlyZSgnLi9qcy1tb2R1bGVzL21vZGFsLmpzJyk7XG5cbnZhciBhcHAgPSB7XG5cdHZpZGVvTW9kYWw6IG51bGwsXG5cblx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5ldmVudEJpbmRpbmdzKCk7XG5cdFx0dGhpcy5pbml0U2xpZGVycygpO1xuXHR9LFxuXG5cdGV2ZW50QmluZGluZ3M6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIE9uIHdpbmRvdyBsb2FkXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmF2T2Zmc2V0ID0gJCgnLmhlcm8tLXdyYXBwZXInKS5pbm5lckhlaWdodCgpO1xuXG5cdFx0XHQvLyBDaGVjayBvbiBwYWdlIGxvYWQgdG8gcmVwb3NpdGlvbiBoZWFkZXIgaXRlbXNcblx0XHRcdGFwcC5wYXJhbGxheEVmZmVjdE9uSGVhZGVyKG5hdk9mZnNldCk7XG5cdFx0XHRhcHAuZml4TmF2VG9Ub3AobmF2T2Zmc2V0KTtcblxuXHRcdFx0Ly8gU2hvdyBoZXJvIGZlYXR1cmVzIHNlY3Rpb25cblx0XHRcdCQoJyoubG9hZC1kZWxheScpLnJlbW92ZUNsYXNzKCdsb2FkLWRlbGF5Jyk7XG5cblx0XHRcdC8vIE9uIHdpbmRvdyBzY3JvbGxcblx0XHRcdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGFwcC5wYXJhbGxheEVmZmVjdE9uSGVhZGVyKG5hdk9mZnNldCk7XG5cdFx0XHRcdGFwcC5maXhOYXZUb1RvcChuYXZPZmZzZXQpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBPbiAnUmVxdWVzdCBNZWV0aW5nJyBjbGlja1xuXHRcdCQoJy5yZXF1ZXN0LW1lZXRpbmcnKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGFwcC5zaG93TW9kYWwoJCgnLmZvcm0tbW9kYWxfX3JlcXVlc3QtbWVldGluZycpKTtcblx0XHR9KTtcblxuXHRcdC8vIFNob3cgdmlkZW8gZm9ybSBhbmQgbW9kYWwgb24gY2xpY2tcblx0XHQkKCcudmlkZW9fX2NvbnRhaW5lcicpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0aWYgKCFhcHAudmlkZW9Nb2RhbCkge1xuXHRcdFx0XHR2YXIgc3JjID0gJCh0aGlzKS5maW5kKCdzb3VyY2UnKS5hdHRyKCdzcmMnKTtcblx0XHRcdFx0YXBwLmJ1aWxkVmlkZW9Nb2RhbChzcmMpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIXdpbmRvdy5zdWJtaXR0ZWRWaWRlb0Zvcm0pIHtcblx0XHRcdFx0YXBwLnNob3dNb2RhbCgkKCcuZm9ybS1tb2RhbF9fdmlkZW8nKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhcHAudmlkZW9Nb2RhbC5zaG93KCk7XG5cdFx0XHRcdCQoJy52aWRlby1tb2RhbCcpLmZpbmQoJ3ZpZGVvJylbMF0ucGxheSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gT24gUERGIGRvd25sb2FkIGxpbmtzIGNsaWNrXG5cdFx0JCgnLmFzc2V0c19fc2xpZGVyLS1pdGVtIGEnKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdHZhciAkcGRmU2xpZGUgPSAkKHRoaXMpLmNsb3Nlc3QoJy5hc3NldHNfX3NsaWRlci0taXRlbScpO1xuXHRcdFx0YXBwLnVwZGF0ZVBkZk1vZGFsQXNzZXRzKCRwZGZTbGlkZSk7XG5cdFx0fSk7XG5cblx0XHQvLyBGb3JtIG1vZGFsIGNsb3NlXG5cdFx0JCgnLmZvcm0tbW9kYWwtLWNsb3NlJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRhcHAuaGlkZU1vZGFsKCQodGhpcykuY2xvc2VzdCgnLm1vZGFsLS13cmFwcGVyJykpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdG1vZGFsRXZlbnRCaW5kaW5nczogZnVuY3Rpb24oKSB7XG5cdFx0JCgnLnZpZGVvLW1vZGFsX19jbG9zZScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGFwcC52aWRlb01vZGFsLmhpZGUoKTtcblx0XHRcdCQoJy52aWRlby1tb2RhbCcpLmZpbmQoJ3ZpZGVvJylbMF0ucGF1c2UoKTtcblx0XHR9KTtcblx0fSxcblxuXHRwYXJhbGxheEVmZmVjdE9uSGVhZGVyOiBmdW5jdGlvbihuYXZUb3ApIHtcblx0XHR2YXIgc3BlZWQgPSAkKCcuaGVyb19fY29udGVudC0td3JhcHBlcicpLmRhdGEoJ3NwZWVkJyksXG5cdFx0XHRvZmZzZXQgPSAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpKSAvIHNwZWVkO1xuXG5cdFx0aWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA8IG5hdlRvcCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2Nykge1xuXHRcdFx0JCgnLmhlcm9fX2NvbnRlbnQtLXdyYXBwZXInKS5jc3MoeyAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKDAsICcgKyBvZmZzZXQgKyAncHgsIDApJyB9KTtcblx0XHR9XG5cdH0sXG5cblx0Zml4TmF2VG9Ub3A6IGZ1bmN0aW9uKG9mZnNldCkge1xuXHRcdC8vIEZpeCBuYXYgdG8gdG9wXG5cdFx0aWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IG9mZnNldCkge1xuXHRcdFx0aWYgKCQoJy5maXhlZC1uYXYtLXdyYXBwZXInKS5oYXNDbGFzcygnZml4ZWQtdG9wJykpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JCgnLmZpeGVkLW5hdi0td3JhcHBlcicpLmFkZENsYXNzKCdmaXhlZC10b3AnKTtcblx0XHRcdFx0JCgnLnBhcnRuZXItLXdyYXBwZXInKS5jc3MoeyAnbWFyZ2luLXRvcCc6ICgkKCcuZml4ZWQtbmF2LS13cmFwcGVyJykuaW5uZXJIZWlnaHQoKSAtIDI4KSArICdweCcgfSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICgkKCcuZml4ZWQtdG9wJykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHQkKCcuZml4ZWQtbmF2LS13cmFwcGVyJykucmVtb3ZlQ2xhc3MoJ2ZpeGVkLXRvcCcpO1xuXHRcdFx0XHQkKCcucGFydG5lci0td3JhcHBlcicpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGJ1aWxkVmlkZW9Nb2RhbDogZnVuY3Rpb24oc3JjKSB7XG5cdFx0Ly8gQnVpbGQgdmlkZW8gY29udGVudHNcblx0XHR2YXIgJHZpZGVvV3JhcHBlciA9ICQoJzxkaXY+JyksXG5cdFx0XHQkdmlkZW8gPSAkKCc8dmlkZW8+JyksXG5cdFx0XHQkdmlkZW9DbG9zZSA9ICQoJzxkaXY+Jyk7XG5cblx0XHQkdmlkZW9XcmFwcGVyLmFkZENsYXNzKCd2aWRlby1tb2RhbC0taW5uZXInKTtcblx0XHQkdmlkZW8uYWRkQ2xhc3MoJ3ZpZGVvLW1vZGFsX192aWRlbycpO1xuXHRcdCR2aWRlb0Nsb3NlLmFkZENsYXNzKCd2aWRlby1tb2RhbF9fY2xvc2UnKTtcblxuXHRcdCR2aWRlby5hdHRyKHtcblx0XHRcdHNyYzogc3JjLFxuXHRcdFx0Y29udHJvbHM6IHRydWVcblx0XHR9KTtcblxuXHRcdCR2aWRlb1dyYXBwZXIuYXBwZW5kKCR2aWRlbykuYXBwZW5kKCR2aWRlb0Nsb3NlKTtcblxuXHRcdGFwcC52aWRlb01vZGFsID0gbmV3IG1vZGFsKCd2aWRlby1tb2RhbCcpO1xuXHRcdGFwcC52aWRlb01vZGFsLmluaXQoYXBwLm1vZGFsRXZlbnRCaW5kaW5ncywgYXBwKTtcblxuXHRcdCQoJy5tb2RhbC1pbm5lcicpLmFwcGVuZCgkdmlkZW9XcmFwcGVyKTtcblxuXHRcdGFwcC5tb2RhbEV2ZW50QmluZGluZ3MoKTtcblx0fSxcblxuXHRpbml0U2xpZGVyczogZnVuY3Rpb24oKSB7XG5cdFx0JCgnLnRlc3RpbW9uaWFsc19fc2xpZGVyJykuc2xpY2soe1xuXHRcdFx0YXBwZW5kQXJyb3dzOiAkKCcudGVzdGltb25pYWxzX19hcnJvd3MnKVxuXHRcdH0pO1xuXG5cdFx0JCgnLmFzc2V0c19fc2xpZGVyJykuc2xpY2soe1xuXHRcdFx0YXBwZW5kQXJyb3dzOiAkKCcuYXNzZXRzX19hcnJvd3MnKSxcblx0XHRcdHNsaWRlc1RvU2hvdzogMyxcblx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHRcdFx0cmVzcG9uc2l2ZTogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YnJlYWtwb2ludDogNzY3LFxuXHRcdFx0XHRcdHNldHRpbmdzOiB7XG5cdFx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRicmVha3BvaW50OiA1MjUsXG5cdFx0XHRcdFx0c2V0dGluZ3M6IHtcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogMVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0pO1xuXHR9LFxuXG5cdHVwZGF0ZVBkZk1vZGFsQXNzZXRzOiBmdW5jdGlvbihzbGlkZSkge1xuXHRcdHZhciBwZGZUaXRsZSA9IHNsaWRlLmZpbmQoJy5hc3NldHNfX3RpdGxlJykudGV4dCgpLFxuXHRcdFx0aW1hZ2VTcmMgPSBzbGlkZS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnKSxcblx0XHRcdGltYWdlQWx0ID0gc2xpZGUuZmluZCgnaW1nJykuYXR0cignYWx0JyksXG5cdFx0XHRzb3VyY2UgPSBzbGlkZS5kYXRhKCdzb3VyY2UnKTtcblxuXHRcdC8vIFVwZGF0ZSBwZGYgaW1hZ2UgaW4gbW9kYWxcblx0XHQkKCcuZm9ybS1tb2RhbF9fcGRmLWRvd25sb2FkJykuZmluZCgnLmZvcm0tbW9kYWxfX3BkZi1pbWFnZScpXG5cdFx0XHQuYXR0cignc3JjJywgaW1hZ2VTcmMpXG5cdFx0XHQuYXR0cignYWx0JywgaW1hZ2VBbHQpXG5cdFx0XHQuZGF0YSgnc291cmNlJywgc291cmNlKTtcblxuXHRcdC8vIFVwZGF0ZSAnRG93bmxvYWRlZCBQREYnIGhpZGRlbiBmaWVsZFxuXHRcdCQoJy5mb3JtLW1vZGFsX19wZGYtZG93bmxvYWQnKS5maW5kKCdpbnB1dFtuYW1lPVwiZG93bmxvYWRlZF9wZGZcIl0nKVxuXHRcdFx0LnZhbChwZGZUaXRsZSlcblx0XHRcdC5jaGFuZ2UoKTtcblxuXHRcdGFwcC5zaG93TW9kYWwoJCgnLmZvcm0tbW9kYWxfX3BkZi1kb3dubG9hZCcpKTtcblx0fSxcblxuXHRzaG93TW9kYWw6IGZ1bmN0aW9uKCRtb2RhbCkge1xuXHRcdCRtb2RhbC5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0JCgnYm9keScpLmNzcyh7ICdvdmVyZmxvdyc6ICdoaWRkZW4nIH0pO1xuXHR9LFxuXG5cdGhpZGVNb2RhbDogZnVuY3Rpb24oJG1vZGFsKSB7XG5cdFx0JG1vZGFsLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHQkKCdib2R5JykuY3NzKHsgJ292ZXJmbG93JzogJ3Zpc2libGUnIH0pO1xuXHR9XG59XG5cblxuJChmdW5jdGlvbigpIHtcblx0YXBwLmluaXQoKTtcbn0pOyIsInZhciBtb2RhbEZ1bGxzY3JlZW4gPSBmdW5jdGlvbihpZCkge1xuXHR0aGlzLmlkID0gaWQ7XG5cdHRoaXMuJGNvbnRhaW5lciA9IG51bGw7XG5cdHRoaXMuJGJvZHkgPSAkKCdib2R5Jyk7XG59XG5cbm1vZGFsRnVsbHNjcmVlbi5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IG1vZGFsRnVsbHNjcmVlbixcblxuXHRpbml0OiBmdW5jdGlvbihjYWxsYmFjaywgY2FsbGJhY2tPYmope1xuXHRcdHRoaXMuYnVpbGQoY2FsbGJhY2ssIGNhbGxiYWNrT2JqKTtcblx0fSxcblxuXHRidWlsZDogZnVuY3Rpb24oY2FsbGJhY2ssIGNhbGxiYWNrT2JqKXtcblx0XHR2YXIgJG1vZGFsV3JhcHBlciA9ICQoJzxkaXY+JyksXG5cdFx0XHQkbW9kYWxJbm5lciA9ICQoJzxkaXY+Jyk7XG5cblx0XHQkbW9kYWxJbm5lci5hZGRDbGFzcygnbW9kYWwtaW5uZXInKTtcblx0XHQkbW9kYWxXcmFwcGVyLmFkZENsYXNzKCdtb2RhbC0td3JhcHBlciAnICsgdGhpcy5pZCk7XG5cdFx0JG1vZGFsV3JhcHBlci5hcHBlbmQoJG1vZGFsSW5uZXIpO1xuXHRcdHRoaXMuJGJvZHkuYXBwZW5kKCRtb2RhbFdyYXBwZXIpO1xuXHRcdFxuXHRcdHRoaXMuJGNvbnRhaW5lciA9ICRtb2RhbFdyYXBwZXI7XG5cblx0XHRjYWxsYmFjay5hcHBseShjYWxsYmFja09iaik7XG5cdH0sXG5cblx0c2hvdzogZnVuY3Rpb24oKXtcblx0XHQkKCcuJyArIHRoaXMuaWQpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHR0aGlzLiRib2R5LmNzcyh7ICdvdmVyZmxvdyc6J2hpZGRlbicgfSk7XG5cdH0sXG5cblx0aGlkZTogZnVuY3Rpb24oKXtcblx0XHQkKCcuJyArIHRoaXMuaWQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHR0aGlzLiRib2R5LmNzcyh7ICdvdmVyZmxvdyc6J3Zpc2libGUnIH0pO1xuXHR9LFxuXG5cdGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG5cdFx0JCgnLicgKyB0aGlzLmlkKS5yZW1vdmUoKTtcblx0XHR0aGlzLiRib2R5LmNzcyh7J292ZXJmbG93JzondmlzaWJsZSd9KTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGFsRnVsbHNjcmVlbjsiXX0=
