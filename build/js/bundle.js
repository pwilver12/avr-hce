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
			console.log('doing it');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvanMtbW9kdWxlcy9tb2RhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksUUFBUSxRQUFRLHVCQUFSLENBQVI7O0FBRUosSUFBSSxNQUFNO0FBQ1QsYUFBWSxJQUFaOztBQUVBLE9BQU0sWUFBVztBQUNoQixPQUFLLGFBQUwsR0FEZ0I7QUFFaEIsT0FBSyxXQUFMLEdBRmdCO0VBQVg7O0FBS04sZ0JBQWUsWUFBVzs7QUFFekIsSUFBRSxNQUFGLEVBQVUsSUFBVixDQUFlLFlBQVc7QUFDekIsT0FBSSxZQUFZLEVBQUUsZ0JBQUYsRUFBb0IsV0FBcEIsRUFBWjs7O0FBRHFCLE1BSXpCLENBQUksc0JBQUosQ0FBMkIsU0FBM0IsRUFKeUI7QUFLekIsT0FBSSxXQUFKLENBQWdCLFNBQWhCOzs7QUFMeUIsSUFRekIsQ0FBRSxjQUFGLEVBQWtCLFdBQWxCLENBQThCLFlBQTlCOzs7QUFSeUIsSUFXekIsQ0FBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixZQUFXO0FBQzNCLFFBQUksc0JBQUosQ0FBMkIsU0FBM0IsRUFEMkI7QUFFM0IsUUFBSSxXQUFKLENBQWdCLFNBQWhCLEVBRjJCO0lBQVgsQ0FBakIsQ0FYeUI7R0FBWCxDQUFmOzs7QUFGeUIsR0FvQnpCLENBQUUsbUJBQUYsRUFBdUIsU0FBdkIsQ0FBaUMsVUFBUyxDQUFULEVBQVk7QUFDNUMsS0FBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsRUFBc0IsQ0FBdEIsRUFBeUIsTUFBekIsR0FBa0MsQ0FBbEMsQ0FENEM7QUFFNUMsS0FBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsRUFBc0IsQ0FBdEIsRUFBeUIsSUFBekIsR0FGNEM7R0FBWixDQUFqQyxDQUdHLFFBSEgsQ0FHWSxVQUFTLENBQVQsRUFBWTtBQUN2QixL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QUEvQjs7QUFJTixRQUFPLFVBQVMsUUFBVCxFQUFtQixXQUFuQixFQUErQjtBQUNyQyxNQUFJLGdCQUFnQixFQUFFLE9BQUYsQ0FBaEI7TUFDSCxjQUFjLEVBQUUsT0FBRixDQUFkLENBRm9DOztBQUlyQyxjQUFZLFFBQVosQ0FBcUIsYUFBckIsRUFKcUM7QUFLckMsZ0JBQWMsUUFBZCxDQUF1QixvQkFBb0IsS0FBSyxFQUFMLENBQTNDLENBTHFDO0FBTXJDLGdCQUFjLE1BQWQsQ0FBcUIsV0FBckIsRUFOcUM7QUFPckMsT0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixhQUFsQixFQVBxQzs7QUFTckMsT0FBSyxVQUFMLEdBQWtCLGFBQWxCLENBVHFDOztBQVdyQyxXQUFTLEtBQVQsQ0FBZSxXQUFmLEVBWHFDO0VBQS9COztBQWNQLE9BQU0sWUFBVTtBQUNmLElBQUUsTUFBTSxLQUFLLEVBQUwsQ0FBUixDQUFpQixRQUFqQixDQUEwQixRQUExQixFQURlO0FBRWYsT0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEVBQUUsWUFBVyxRQUFYLEVBQWpCLEVBRmU7RUFBVjs7QUFLTixPQUFNLFlBQVU7QUFDZixJQUFFLE1BQU0sS0FBSyxFQUFMLENBQVIsQ0FBaUIsV0FBakIsQ0FBNkIsUUFBN0IsRUFEZTtBQUVmLE9BQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxFQUFFLFlBQVcsU0FBWCxFQUFqQixFQUZlO0VBQVY7O0FBS04sVUFBUyxZQUFVO0FBQ2xCLElBQUUsTUFBTSxLQUFLLEVBQUwsQ0FBUixDQUFpQixNQUFqQixHQURrQjtBQUVsQixPQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsRUFBQyxZQUFXLFNBQVgsRUFBaEIsRUFGa0I7RUFBVjtDQWhDVjs7QUFzQ0EsT0FBTyxPQUFQLEdBQWlCLGVBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBtb2RhbCA9IHJlcXVpcmUoJy4vanMtbW9kdWxlcy9tb2RhbC5qcycpO1xuXG52YXIgYXBwID0ge1xuXHR2aWRlb01vZGFsOiBudWxsLFxuXG5cdGluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuZXZlbnRCaW5kaW5ncygpO1xuXHRcdHRoaXMuaW5pdFNsaWRlcnMoKTtcblx0fSxcblxuXHRldmVudEJpbmRpbmdzOiBmdW5jdGlvbigpIHtcblx0XHQvLyBPbiB3aW5kb3cgbG9hZFxuXHRcdCQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5hdk9mZnNldCA9ICQoJy5oZXJvLS13cmFwcGVyJykuaW5uZXJIZWlnaHQoKTtcblxuXHRcdFx0Ly8gQ2hlY2sgb24gcGFnZSBsb2FkIHRvIHJlcG9zaXRpb24gaGVhZGVyIGl0ZW1zXG5cdFx0XHRhcHAucGFyYWxsYXhFZmZlY3RPbkhlYWRlcihuYXZPZmZzZXQpO1xuXHRcdFx0YXBwLmZpeE5hdlRvVG9wKG5hdk9mZnNldCk7XG5cblx0XHRcdC8vIFNob3cgaGVybyBmZWF0dXJlcyBzZWN0aW9uXG5cdFx0XHQkKCcqLmxvYWQtZGVsYXknKS5yZW1vdmVDbGFzcygnbG9hZC1kZWxheScpO1xuXG5cdFx0XHQvLyBPbiB3aW5kb3cgc2Nyb2xsXG5cdFx0XHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRhcHAucGFyYWxsYXhFZmZlY3RPbkhlYWRlcihuYXZPZmZzZXQpO1xuXHRcdFx0XHRhcHAuZml4TmF2VG9Ub3AobmF2T2Zmc2V0KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0Ly8gQXV0b3BsYXkgdmlkZW8gb24gbW91c2VvdmVyXG5cdFx0JCgnLnZpZGVvX19jb250YWluZXInKS5tb3VzZW92ZXIoZnVuY3Rpb24oZSkge1xuXHRcdFx0JCh0aGlzKS5maW5kKCd2aWRlbycpWzBdLnZvbHVtZSA9IDA7XG5cdFx0XHQkKHRoaXMpLmZpbmQoJ3ZpZGVvJylbMF0ucGxheSgpO1xuXHRcdH0pLm1vdXNlb3V0KGZ1bmN0aW9uKGUpIHtcblx0XHRcdCQodGhpcykuZmluZCgndmlkZW8nKVswXS5wYXVzZSgpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gU2hvdyB2aWRlbyBtb2RhbCBvbiBjbGlja1xuXHRcdCQoJy52aWRlb19fY29udGFpbmVyJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHR2YXIgc3JjID0gJCh0aGlzKS5maW5kKCdzb3VyY2UnKS5hdHRyKCdzcmMnKTtcblx0XHRcdGFwcC5idWlsZFZpZGVvTW9kYWwoc3JjKTtcblx0XHRcdGFwcC52aWRlb01vZGFsLnNob3coKTtcblx0XHR9KTtcblxuXHRcdC8vIE9uICdSZXF1ZXN0IE1lZXRpbmcnIGNsaWNrXG5cdFx0JCgnLnJlcXVlc3QtbWVldGluZycpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0JCgnLmZvcm0tbW9kYWxfX3JlcXVlc3QtbWVldGluZycpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHR9KTtcblxuXHRcdC8vIE9uIFBERiBkb3dubG9hZCBsaW5rcyBjbGlja1xuXHRcdCQoJy5hc3NldHNfX3NsaWRlci0taXRlbSBhJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHR2YXIgJHBkZlNsaWRlID0gJCh0aGlzKS5jbG9zZXN0KCcuYXNzZXRzX19zbGlkZXItLWl0ZW0nKTtcblx0XHRcdGFwcC51cGRhdGVQZGZNb2RhbEFzc2V0cygkcGRmU2xpZGUpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gRm9ybSBtb2RhbCBjbG9zZVxuXHRcdCQoJy5mb3JtLW1vZGFsLS1jbG9zZScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcubW9kYWwtLXdyYXBwZXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0fSk7XG5cdH0sXG5cblx0bW9kYWxFdmVudEJpbmRpbmdzOiBmdW5jdGlvbigpIHtcblx0XHQkKCcudmlkZW8tbW9kYWxfX2Nsb3NlJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0YXBwLnZpZGVvTW9kYWwuZGVzdHJveSgpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdHBhcmFsbGF4RWZmZWN0T25IZWFkZXI6IGZ1bmN0aW9uKG5hdlRvcCkge1xuXHRcdHZhciBzcGVlZCA9ICQoJy5oZXJvX19jb250ZW50LS13cmFwcGVyJykuZGF0YSgnc3BlZWQnKSxcblx0XHRcdG9mZnNldCA9ICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkpIC8gc3BlZWQ7XG5cblx0XHRpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpIDwgbmF2VG9wICYmICQod2luZG93KS53aWR0aCgpID4gNzY3KSB7XG5cdFx0XHQkKCcuaGVyb19fY29udGVudC0td3JhcHBlcicpLmNzcyh7ICd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoMCwgJyArIG9mZnNldCArICdweCwgMCknIH0pO1xuXHRcdFx0Y29uc29sZS5sb2coJ2RvaW5nIGl0Jyk7XG5cdFx0fVxuXHR9LFxuXG5cdGZpeE5hdlRvVG9wOiBmdW5jdGlvbihvZmZzZXQpIHtcblx0XHQvLyBGaXggbmF2IHRvIHRvcFxuXHRcdGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBvZmZzZXQpIHtcblx0XHRcdGlmICgkKCcuZml4ZWQtbmF2LS13cmFwcGVyJykuaGFzQ2xhc3MoJ2ZpeGVkLXRvcCcpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoJy5maXhlZC1uYXYtLXdyYXBwZXInKS5hZGRDbGFzcygnZml4ZWQtdG9wJyk7XG5cdFx0XHRcdCQoJy5wYXJ0bmVyLS13cmFwcGVyJykuY3NzKHsgJ21hcmdpbi10b3AnOiAoJCgnLmZpeGVkLW5hdi0td3JhcHBlcicpLmlubmVySGVpZ2h0KCkgLSAyOCkgKyAncHgnIH0pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoJCgnLmZpeGVkLXRvcCcpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0JCgnLmZpeGVkLW5hdi0td3JhcHBlcicpLnJlbW92ZUNsYXNzKCdmaXhlZC10b3AnKTtcblx0XHRcdFx0JCgnLnBhcnRuZXItLXdyYXBwZXInKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRidWlsZFZpZGVvTW9kYWw6IGZ1bmN0aW9uKHNyYykge1xuXHRcdC8vIEJ1aWxkIHZpZGVvIGNvbnRlbnRzXG5cdFx0dmFyICR2aWRlb1dyYXBwZXIgPSAkKCc8ZGl2PicpLFxuXHRcdFx0JHZpZGVvID0gJCgnPHZpZGVvPicpLFxuXHRcdFx0JHZpZGVvQ2xvc2UgPSAkKCc8ZGl2PicpO1xuXG5cdFx0JHZpZGVvV3JhcHBlci5hZGRDbGFzcygndmlkZW8tbW9kYWwtLWlubmVyJyk7XG5cdFx0JHZpZGVvLmFkZENsYXNzKCd2aWRlby1tb2RhbF9fdmlkZW8nKTtcblx0XHQkdmlkZW9DbG9zZS5hZGRDbGFzcygndmlkZW8tbW9kYWxfX2Nsb3NlJyk7XG5cblx0XHQkdmlkZW8uYXR0cih7XG5cdFx0XHRzcmM6IHNyYyxcblx0XHRcdGF1dG9wbGF5OiB0cnVlLFxuXHRcdFx0Y29udHJvbHM6IHRydWVcblx0XHR9KTtcblxuXHRcdCR2aWRlb1dyYXBwZXIuYXBwZW5kKCR2aWRlbykuYXBwZW5kKCR2aWRlb0Nsb3NlKTtcblxuXHRcdGNvbnNvbGUubG9nKCR2aWRlb1dyYXBwZXIpO1xuXG5cdFx0YXBwLnZpZGVvTW9kYWwgPSBuZXcgbW9kYWwoJ3ZpZGVvLW1vZGFsJyk7XG5cdFx0YXBwLnZpZGVvTW9kYWwuaW5pdChhcHAubW9kYWxFdmVudEJpbmRpbmdzLCBhcHApO1xuXG5cdFx0JCgnLm1vZGFsLWlubmVyJykuYXBwZW5kKCR2aWRlb1dyYXBwZXIpO1xuXG5cdFx0YXBwLm1vZGFsRXZlbnRCaW5kaW5ncygpO1xuXHR9LFxuXG5cdGluaXRTbGlkZXJzOiBmdW5jdGlvbigpIHtcblx0XHQkKCcudGVzdGltb25pYWxzX19zbGlkZXInKS5zbGljayh7XG5cdFx0XHRhcHBlbmRBcnJvd3M6ICQoJy50ZXN0aW1vbmlhbHNfX2Fycm93cycpXG5cdFx0fSk7XG5cblx0XHQkKCcuYXNzZXRzX19zbGlkZXInKS5zbGljayh7XG5cdFx0XHRhcHBlbmRBcnJvd3M6ICQoJy5hc3NldHNfX2Fycm93cycpLFxuXHRcdFx0c2xpZGVzVG9TaG93OiAzLFxuXHRcdFx0c2xpZGVzVG9TY3JvbGw6IDEsXG5cdFx0XHRyZXNwb25zaXZlOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRicmVha3BvaW50OiA3NjcsXG5cdFx0XHRcdFx0c2V0dGluZ3M6IHtcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogMlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGJyZWFrcG9pbnQ6IDUyNSxcblx0XHRcdFx0XHRzZXR0aW5nczoge1xuXHRcdFx0XHRcdFx0c2xpZGVzVG9TaG93OiAxXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSk7XG5cdH0sXG5cblx0dXBkYXRlUGRmTW9kYWxBc3NldHM6IGZ1bmN0aW9uKHNsaWRlKSB7XG5cdFx0dmFyIHBkZlRpdGxlID0gc2xpZGUuZmluZCgnLmFzc2V0c19fdGl0bGUnKS50ZXh0KCksXG5cdFx0XHRpbWFnZVNyYyA9IHNsaWRlLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpLFxuXHRcdFx0aW1hZ2VBbHQgPSBzbGlkZS5maW5kKCdpbWcnKS5hdHRyKCdhbHQnKSxcblx0XHRcdHNvdXJjZSA9IHNsaWRlLmRhdGEoJ3NvdXJjZScpO1xuXG5cdFx0Ly8gVXBkYXRlIHBkZiBpbWFnZSBpbiBtb2RhbFxuXHRcdCQoJy5mb3JtLW1vZGFsX19wZGYtZG93bmxvYWQnKS5maW5kKCcuZm9ybS1tb2RhbF9fcGRmLWltYWdlJylcblx0XHRcdC5hdHRyKCdzcmMnLCBpbWFnZVNyYylcblx0XHRcdC5hdHRyKCdhbHQnLCBpbWFnZUFsdClcblx0XHRcdC5kYXRhKCdzb3VyY2UnLCBzb3VyY2UpO1xuXG5cdFx0Ly8gVXBkYXRlICdEb3dubG9hZGVkIFBERicgaGlkZGVuIGZpZWxkXG5cdFx0JCgnLmZvcm0tbW9kYWxfX3BkZi1kb3dubG9hZCcpLmZpbmQoJ2lucHV0W25hbWU9XCJkb3dubG9hZGVkX3BkZlwiXScpXG5cdFx0XHQudmFsKHBkZlRpdGxlKVxuXHRcdFx0LmNoYW5nZSgpO1xuXG5cdFx0JCgnLmZvcm0tbW9kYWxfX3BkZi1kb3dubG9hZCcpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0fVxufVxuXG5cbiQoZnVuY3Rpb24oKSB7XG5cdGFwcC5pbml0KCk7XG59KTsiLCJ2YXIgbW9kYWxGdWxsc2NyZWVuID0gZnVuY3Rpb24oaWQpIHtcblx0dGhpcy5pZCA9IGlkO1xuXHR0aGlzLiRjb250YWluZXIgPSBudWxsO1xuXHR0aGlzLiRib2R5ID0gJCgnYm9keScpO1xufVxuXG5tb2RhbEZ1bGxzY3JlZW4ucHJvdG90eXBlID0ge1xuXG5cdGNvbnN0cnVjdG9yOiBtb2RhbEZ1bGxzY3JlZW4sXG5cblx0aW5pdDogZnVuY3Rpb24oY2FsbGJhY2ssIGNhbGxiYWNrT2JqKXtcblx0XHR0aGlzLmJ1aWxkKGNhbGxiYWNrLCBjYWxsYmFja09iaik7XG5cdH0sXG5cblx0YnVpbGQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjYWxsYmFja09iail7XG5cdFx0dmFyICRtb2RhbFdyYXBwZXIgPSAkKCc8ZGl2PicpLFxuXHRcdFx0JG1vZGFsSW5uZXIgPSAkKCc8ZGl2PicpO1xuXG5cdFx0JG1vZGFsSW5uZXIuYWRkQ2xhc3MoJ21vZGFsLWlubmVyJyk7XG5cdFx0JG1vZGFsV3JhcHBlci5hZGRDbGFzcygnbW9kYWwtLXdyYXBwZXIgJyArIHRoaXMuaWQpO1xuXHRcdCRtb2RhbFdyYXBwZXIuYXBwZW5kKCRtb2RhbElubmVyKTtcblx0XHR0aGlzLiRib2R5LmFwcGVuZCgkbW9kYWxXcmFwcGVyKTtcblx0XHRcblx0XHR0aGlzLiRjb250YWluZXIgPSAkbW9kYWxXcmFwcGVyO1xuXG5cdFx0Y2FsbGJhY2suYXBwbHkoY2FsbGJhY2tPYmopO1xuXHR9LFxuXG5cdHNob3c6IGZ1bmN0aW9uKCl7XG5cdFx0JCgnLicgKyB0aGlzLmlkKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0dGhpcy4kYm9keS5jc3MoeyAnb3ZlcmZsb3cnOidoaWRkZW4nIH0pO1xuXHR9LFxuXG5cdGhpZGU6IGZ1bmN0aW9uKCl7XG5cdFx0JCgnLicgKyB0aGlzLmlkKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0dGhpcy4kYm9keS5jc3MoeyAnb3ZlcmZsb3cnOid2aXNpYmxlJyB9KTtcblx0fSxcblxuXHRkZXN0cm95OiBmdW5jdGlvbigpe1xuXHRcdCQoJy4nICsgdGhpcy5pZCkucmVtb3ZlKCk7XG5cdFx0dGhpcy4kYm9keS5jc3MoeydvdmVyZmxvdyc6J3Zpc2libGUnfSk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtb2RhbEZ1bGxzY3JlZW47Il19
