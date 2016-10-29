(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var modal = require('./js-modules/modal.js');

var app = {
	videoModal: null,
	navOffset: null,

	init: function () {
		this.eventBindings();
		this.initSliders();
	},

	eventBindings: function () {
		// On window load
		$(window).load(function () {
			app.navOffset = $('.hero--wrapper').innerHeight();

			// Check on page load to reposition header items
			app.parallaxEffectOnHeader(app.navOffset);
			app.fixNavToTop(app.navOffset);

			// Show hero features section
			$('*.load-delay').removeClass('load-delay');

			// On window scroll
			$(window).scroll(function () {
				app.parallaxEffectOnHeader(app.navOffset);
				app.fixNavToTop(app.navOffset);
			});
		});

		// On scroll button click
		$('.hero__scroll-btn').click(function (e) {
			app.scrollToPoint(app.navOffset);
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
				var src = $(this).find('a').data('source');
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

	scrollToPoint: function (value) {
		$('html, body').animate({
			scrollTop: value
		}, 'slow');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvanMtbW9kdWxlcy9tb2RhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksUUFBUSxRQUFRLHVCQUFSLENBQVI7O0FBRUosSUFBSSxNQUFNO0FBQ1QsYUFBWSxJQUFaO0FBQ0EsWUFBVyxJQUFYOztBQUVBLE9BQU0sWUFBVztBQUNoQixPQUFLLGFBQUwsR0FEZ0I7QUFFaEIsT0FBSyxXQUFMLEdBRmdCO0VBQVg7O0FBS04sZ0JBQWUsWUFBVzs7QUFFekIsSUFBRSxNQUFGLEVBQVUsSUFBVixDQUFlLFlBQVc7QUFDekIsT0FBSSxTQUFKLEdBQWdCLEVBQUUsZ0JBQUYsRUFBb0IsV0FBcEIsRUFBaEI7OztBQUR5QixNQUl6QixDQUFJLHNCQUFKLENBQTJCLElBQUksU0FBSixDQUEzQixDQUp5QjtBQUt6QixPQUFJLFdBQUosQ0FBZ0IsSUFBSSxTQUFKLENBQWhCOzs7QUFMeUIsSUFRekIsQ0FBRSxjQUFGLEVBQWtCLFdBQWxCLENBQThCLFlBQTlCOzs7QUFSeUIsSUFXekIsQ0FBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixZQUFXO0FBQzNCLFFBQUksc0JBQUosQ0FBMkIsSUFBSSxTQUFKLENBQTNCLENBRDJCO0FBRTNCLFFBQUksV0FBSixDQUFnQixJQUFJLFNBQUosQ0FBaEIsQ0FGMkI7SUFBWCxDQUFqQixDQVh5QjtHQUFYLENBQWY7OztBQUZ5QixHQW9CekIsQ0FBRSxtQkFBRixFQUF1QixLQUF2QixDQUE2QixVQUFTLENBQVQsRUFBWTtBQUN4QyxPQUFJLGFBQUosQ0FBa0IsSUFBSSxTQUFKLENBQWxCLENBRHdDO0dBQVosQ0FBN0I7OztBQXBCeUIsR0F5QnpCLENBQUUsa0JBQUYsRUFBc0IsS0FBdEIsQ0FBNEIsVUFBUyxDQUFULEVBQVk7QUFDdkMsS0FBRSxjQUFG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QUFLLEVBQUwsQ0FBUixDQUFpQixXQUFqQixDQUE2QixRQUE3QixFQURlO0FBRWYsT0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEVBQUUsWUFBVyxTQUFYLEVBQWpCLEVBRmU7RUFBVjs7QUFLTixVQUFTLFlBQVU7QUFDbEIsSUFBRSxNQUFNLEtBQUssRUFBTCxDQUFSLENBQWlCLE1BQWpCLEdBRGtCO0FBRWxCLE9BQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxFQUFDLFlBQVcsU0FBWCxFQUFoQixFQUZrQjtFQUFWO0NBaENWOztBQXNDQSxPQUFPLE9BQVAsR0FBaUIsZUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIG1vZGFsID0gcmVxdWlyZSgnLi9qcy1tb2R1bGVzL21vZGFsLmpzJyk7XG5cbnZhciBhcHAgPSB7XG5cdHZpZGVvTW9kYWw6IG51bGwsXG5cdG5hdk9mZnNldDogbnVsbCxcblxuXHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmV2ZW50QmluZGluZ3MoKTtcblx0XHR0aGlzLmluaXRTbGlkZXJzKCk7XG5cdH0sXG5cblx0ZXZlbnRCaW5kaW5nczogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gT24gd2luZG93IGxvYWRcblx0XHQkKHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcblx0XHRcdGFwcC5uYXZPZmZzZXQgPSAkKCcuaGVyby0td3JhcHBlcicpLmlubmVySGVpZ2h0KCk7XG5cblx0XHRcdC8vIENoZWNrIG9uIHBhZ2UgbG9hZCB0byByZXBvc2l0aW9uIGhlYWRlciBpdGVtc1xuXHRcdFx0YXBwLnBhcmFsbGF4RWZmZWN0T25IZWFkZXIoYXBwLm5hdk9mZnNldCk7XG5cdFx0XHRhcHAuZml4TmF2VG9Ub3AoYXBwLm5hdk9mZnNldCk7XG5cblx0XHRcdC8vIFNob3cgaGVybyBmZWF0dXJlcyBzZWN0aW9uXG5cdFx0XHQkKCcqLmxvYWQtZGVsYXknKS5yZW1vdmVDbGFzcygnbG9hZC1kZWxheScpO1xuXG5cdFx0XHQvLyBPbiB3aW5kb3cgc2Nyb2xsXG5cdFx0XHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRhcHAucGFyYWxsYXhFZmZlY3RPbkhlYWRlcihhcHAubmF2T2Zmc2V0KTtcblx0XHRcdFx0YXBwLmZpeE5hdlRvVG9wKGFwcC5uYXZPZmZzZXQpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBPbiBzY3JvbGwgYnV0dG9uIGNsaWNrXG5cdFx0JCgnLmhlcm9fX3Njcm9sbC1idG4nKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRhcHAuc2Nyb2xsVG9Qb2ludChhcHAubmF2T2Zmc2V0KTtcblx0XHR9KTtcblxuXHRcdC8vIE9uICdSZXF1ZXN0IE1lZXRpbmcnIGNsaWNrXG5cdFx0JCgnLnJlcXVlc3QtbWVldGluZycpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0YXBwLnNob3dNb2RhbCgkKCcuZm9ybS1tb2RhbF9fcmVxdWVzdC1tZWV0aW5nJykpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gU2hvdyB2aWRlbyBmb3JtIGFuZCBtb2RhbCBvbiBjbGlja1xuXHRcdCQoJy52aWRlb19fY29udGFpbmVyJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRpZiAoIWFwcC52aWRlb01vZGFsKSB7XG5cdFx0XHRcdHZhciBzcmMgPSAkKHRoaXMpLmZpbmQoJ2EnKS5kYXRhKCdzb3VyY2UnKTtcblx0XHRcdFx0YXBwLmJ1aWxkVmlkZW9Nb2RhbChzcmMpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIXdpbmRvdy5zdWJtaXR0ZWRWaWRlb0Zvcm0pIHtcblx0XHRcdFx0YXBwLnNob3dNb2RhbCgkKCcuZm9ybS1tb2RhbF9fdmlkZW8nKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhcHAudmlkZW9Nb2RhbC5zaG93KCk7XG5cdFx0XHRcdCQoJy52aWRlby1tb2RhbCcpLmZpbmQoJ3ZpZGVvJylbMF0ucGxheSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gT24gUERGIGRvd25sb2FkIGxpbmtzIGNsaWNrXG5cdFx0JCgnLmFzc2V0c19fc2xpZGVyLS1pdGVtIGEnKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdHZhciAkcGRmU2xpZGUgPSAkKHRoaXMpLmNsb3Nlc3QoJy5hc3NldHNfX3NsaWRlci0taXRlbScpO1xuXHRcdFx0YXBwLnVwZGF0ZVBkZk1vZGFsQXNzZXRzKCRwZGZTbGlkZSk7XG5cdFx0fSk7XG5cblx0XHQvLyBGb3JtIG1vZGFsIGNsb3NlXG5cdFx0JCgnLmZvcm0tbW9kYWwtLWNsb3NlJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRhcHAuaGlkZU1vZGFsKCQodGhpcykuY2xvc2VzdCgnLm1vZGFsLS13cmFwcGVyJykpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdG1vZGFsRXZlbnRCaW5kaW5nczogZnVuY3Rpb24oKSB7XG5cdFx0JCgnLnZpZGVvLW1vZGFsX19jbG9zZScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGFwcC52aWRlb01vZGFsLmhpZGUoKTtcblx0XHRcdCQoJy52aWRlby1tb2RhbCcpLmZpbmQoJ3ZpZGVvJylbMF0ucGF1c2UoKTtcblx0XHR9KTtcblx0fSxcblxuXHRwYXJhbGxheEVmZmVjdE9uSGVhZGVyOiBmdW5jdGlvbihuYXZUb3ApIHtcblx0XHR2YXIgc3BlZWQgPSAkKCcuaGVyb19fY29udGVudC0td3JhcHBlcicpLmRhdGEoJ3NwZWVkJyksXG5cdFx0XHRvZmZzZXQgPSAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpKSAvIHNwZWVkO1xuXG5cdFx0aWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA8IG5hdlRvcCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2Nykge1xuXHRcdFx0JCgnLmhlcm9fX2NvbnRlbnQtLXdyYXBwZXInKS5jc3MoeyAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKDAsICcgKyBvZmZzZXQgKyAncHgsIDApJyB9KTtcblx0XHR9XG5cdH0sXG5cblx0c2Nyb2xsVG9Qb2ludDogZnVuY3Rpb24odmFsdWUpIHtcblx0XHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG5cdFx0XHRzY3JvbGxUb3A6IHZhbHVlXG5cdFx0fSwgJ3Nsb3cnKTtcblx0fSxcblxuXHRmaXhOYXZUb1RvcDogZnVuY3Rpb24ob2Zmc2V0KSB7XG5cdFx0Ly8gRml4IG5hdiB0byB0b3Bcblx0XHRpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gb2Zmc2V0KSB7XG5cdFx0XHRpZiAoJCgnLmZpeGVkLW5hdi0td3JhcHBlcicpLmhhc0NsYXNzKCdmaXhlZC10b3AnKSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkKCcuZml4ZWQtbmF2LS13cmFwcGVyJykuYWRkQ2xhc3MoJ2ZpeGVkLXRvcCcpO1xuXHRcdFx0XHQkKCcucGFydG5lci0td3JhcHBlcicpLmNzcyh7ICdtYXJnaW4tdG9wJzogKCQoJy5maXhlZC1uYXYtLXdyYXBwZXInKS5pbm5lckhlaWdodCgpIC0gMjgpICsgJ3B4JyB9KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCQoJy5maXhlZC10b3AnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdCQoJy5maXhlZC1uYXYtLXdyYXBwZXInKS5yZW1vdmVDbGFzcygnZml4ZWQtdG9wJyk7XG5cdFx0XHRcdCQoJy5wYXJ0bmVyLS13cmFwcGVyJykucmVtb3ZlQXR0cignc3R5bGUnKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0YnVpbGRWaWRlb01vZGFsOiBmdW5jdGlvbihzcmMpIHtcblx0XHQvLyBCdWlsZCB2aWRlbyBjb250ZW50c1xuXHRcdHZhciAkdmlkZW9XcmFwcGVyID0gJCgnPGRpdj4nKSxcblx0XHRcdCR2aWRlbyA9ICQoJzx2aWRlbz4nKSxcblx0XHRcdCR2aWRlb0Nsb3NlID0gJCgnPGRpdj4nKTtcblxuXHRcdCR2aWRlb1dyYXBwZXIuYWRkQ2xhc3MoJ3ZpZGVvLW1vZGFsLS1pbm5lcicpO1xuXHRcdCR2aWRlby5hZGRDbGFzcygndmlkZW8tbW9kYWxfX3ZpZGVvJyk7XG5cdFx0JHZpZGVvQ2xvc2UuYWRkQ2xhc3MoJ3ZpZGVvLW1vZGFsX19jbG9zZScpO1xuXG5cdFx0JHZpZGVvLmF0dHIoe1xuXHRcdFx0c3JjOiBzcmMsXG5cdFx0XHRjb250cm9sczogdHJ1ZVxuXHRcdH0pO1xuXG5cdFx0JHZpZGVvV3JhcHBlci5hcHBlbmQoJHZpZGVvKS5hcHBlbmQoJHZpZGVvQ2xvc2UpO1xuXG5cdFx0YXBwLnZpZGVvTW9kYWwgPSBuZXcgbW9kYWwoJ3ZpZGVvLW1vZGFsJyk7XG5cdFx0YXBwLnZpZGVvTW9kYWwuaW5pdChhcHAubW9kYWxFdmVudEJpbmRpbmdzLCBhcHApO1xuXG5cdFx0JCgnLm1vZGFsLWlubmVyJykuYXBwZW5kKCR2aWRlb1dyYXBwZXIpO1xuXG5cdFx0YXBwLm1vZGFsRXZlbnRCaW5kaW5ncygpO1xuXHR9LFxuXG5cdGluaXRTbGlkZXJzOiBmdW5jdGlvbigpIHtcblx0XHQkKCcudGVzdGltb25pYWxzX19zbGlkZXInKS5zbGljayh7XG5cdFx0XHRhcHBlbmRBcnJvd3M6ICQoJy50ZXN0aW1vbmlhbHNfX2Fycm93cycpXG5cdFx0fSk7XG5cblx0XHQkKCcuYXNzZXRzX19zbGlkZXInKS5zbGljayh7XG5cdFx0XHRhcHBlbmRBcnJvd3M6ICQoJy5hc3NldHNfX2Fycm93cycpLFxuXHRcdFx0c2xpZGVzVG9TaG93OiAzLFxuXHRcdFx0c2xpZGVzVG9TY3JvbGw6IDEsXG5cdFx0XHRyZXNwb25zaXZlOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRicmVha3BvaW50OiA3NjcsXG5cdFx0XHRcdFx0c2V0dGluZ3M6IHtcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogMlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGJyZWFrcG9pbnQ6IDUyNSxcblx0XHRcdFx0XHRzZXR0aW5nczoge1xuXHRcdFx0XHRcdFx0c2xpZGVzVG9TaG93OiAxXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSk7XG5cdH0sXG5cblx0dXBkYXRlUGRmTW9kYWxBc3NldHM6IGZ1bmN0aW9uKHNsaWRlKSB7XG5cdFx0dmFyIHBkZlRpdGxlID0gc2xpZGUuZmluZCgnLmFzc2V0c19fdGl0bGUnKS50ZXh0KCksXG5cdFx0XHRpbWFnZVNyYyA9IHNsaWRlLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpLFxuXHRcdFx0aW1hZ2VBbHQgPSBzbGlkZS5maW5kKCdpbWcnKS5hdHRyKCdhbHQnKSxcblx0XHRcdHNvdXJjZSA9IHNsaWRlLmRhdGEoJ3NvdXJjZScpO1xuXG5cdFx0Ly8gVXBkYXRlIHBkZiBpbWFnZSBpbiBtb2RhbFxuXHRcdCQoJy5mb3JtLW1vZGFsX19wZGYtZG93bmxvYWQnKS5maW5kKCcuZm9ybS1tb2RhbF9fcGRmLWltYWdlJylcblx0XHRcdC5hdHRyKCdzcmMnLCBpbWFnZVNyYylcblx0XHRcdC5hdHRyKCdhbHQnLCBpbWFnZUFsdClcblx0XHRcdC5kYXRhKCdzb3VyY2UnLCBzb3VyY2UpO1xuXG5cdFx0Ly8gVXBkYXRlICdEb3dubG9hZGVkIFBERicgaGlkZGVuIGZpZWxkXG5cdFx0JCgnLmZvcm0tbW9kYWxfX3BkZi1kb3dubG9hZCcpLmZpbmQoJ2lucHV0W25hbWU9XCJkb3dubG9hZGVkX3BkZlwiXScpXG5cdFx0XHQudmFsKHBkZlRpdGxlKVxuXHRcdFx0LmNoYW5nZSgpO1xuXG5cdFx0YXBwLnNob3dNb2RhbCgkKCcuZm9ybS1tb2RhbF9fcGRmLWRvd25sb2FkJykpO1xuXHR9LFxuXG5cdHNob3dNb2RhbDogZnVuY3Rpb24oJG1vZGFsKSB7XG5cdFx0JG1vZGFsLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHQkKCdib2R5JykuY3NzKHsgJ292ZXJmbG93JzogJ2hpZGRlbicgfSk7XG5cdH0sXG5cblx0aGlkZU1vZGFsOiBmdW5jdGlvbigkbW9kYWwpIHtcblx0XHQkbW9kYWwucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdCQoJ2JvZHknKS5jc3MoeyAnb3ZlcmZsb3cnOiAndmlzaWJsZScgfSk7XG5cdH1cbn1cblxuXG4kKGZ1bmN0aW9uKCkge1xuXHRhcHAuaW5pdCgpO1xufSk7IiwidmFyIG1vZGFsRnVsbHNjcmVlbiA9IGZ1bmN0aW9uKGlkKSB7XG5cdHRoaXMuaWQgPSBpZDtcblx0dGhpcy4kY29udGFpbmVyID0gbnVsbDtcblx0dGhpcy4kYm9keSA9ICQoJ2JvZHknKTtcbn1cblxubW9kYWxGdWxsc2NyZWVuLnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogbW9kYWxGdWxsc2NyZWVuLFxuXG5cdGluaXQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjYWxsYmFja09iail7XG5cdFx0dGhpcy5idWlsZChjYWxsYmFjaywgY2FsbGJhY2tPYmopO1xuXHR9LFxuXG5cdGJ1aWxkOiBmdW5jdGlvbihjYWxsYmFjaywgY2FsbGJhY2tPYmope1xuXHRcdHZhciAkbW9kYWxXcmFwcGVyID0gJCgnPGRpdj4nKSxcblx0XHRcdCRtb2RhbElubmVyID0gJCgnPGRpdj4nKTtcblxuXHRcdCRtb2RhbElubmVyLmFkZENsYXNzKCdtb2RhbC1pbm5lcicpO1xuXHRcdCRtb2RhbFdyYXBwZXIuYWRkQ2xhc3MoJ21vZGFsLS13cmFwcGVyICcgKyB0aGlzLmlkKTtcblx0XHQkbW9kYWxXcmFwcGVyLmFwcGVuZCgkbW9kYWxJbm5lcik7XG5cdFx0dGhpcy4kYm9keS5hcHBlbmQoJG1vZGFsV3JhcHBlcik7XG5cdFx0XG5cdFx0dGhpcy4kY29udGFpbmVyID0gJG1vZGFsV3JhcHBlcjtcblxuXHRcdGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrT2JqKTtcblx0fSxcblxuXHRzaG93OiBmdW5jdGlvbigpe1xuXHRcdCQoJy4nICsgdGhpcy5pZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdHRoaXMuJGJvZHkuY3NzKHsgJ292ZXJmbG93JzonaGlkZGVuJyB9KTtcblx0fSxcblxuXHRoaWRlOiBmdW5jdGlvbigpe1xuXHRcdCQoJy4nICsgdGhpcy5pZCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdHRoaXMuJGJvZHkuY3NzKHsgJ292ZXJmbG93JzondmlzaWJsZScgfSk7XG5cdH0sXG5cblx0ZGVzdHJveTogZnVuY3Rpb24oKXtcblx0XHQkKCcuJyArIHRoaXMuaWQpLnJlbW92ZSgpO1xuXHRcdHRoaXMuJGJvZHkuY3NzKHsnb3ZlcmZsb3cnOid2aXNpYmxlJ30pO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbW9kYWxGdWxsc2NyZWVuOyJdfQ==
