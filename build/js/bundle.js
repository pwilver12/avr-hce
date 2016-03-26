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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvanMtbW9kdWxlcy9tb2RhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksUUFBUSxRQUFRLHVCQUFSLENBQVI7O0FBRUosSUFBSSxNQUFNO0FBQ1QsYUFBWSxJQUFaOztBQUVBLE9BQU0sWUFBVzs7QUFFaEIsT0FBSyxhQUFMLEdBRmdCO0FBR2hCLE9BQUssV0FBTCxHQUhnQjtFQUFYOztBQU1OLGdCQUFlLFlBQVc7O0FBRXpCLElBQUUsTUFBRixFQUFVLElBQVYsQ0FBZSxZQUFXO0FBQ3pCLE9BQUksWUFBWSxFQUFFLGdCQUFGLEVBQW9CLFdBQXBCLEVBQVosQ0FEcUI7QUFFekIsT0FBSSxXQUFKLENBQWdCLFNBQWhCOzs7QUFGeUIsSUFLekIsQ0FBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixZQUFXO0FBQzNCLFFBQUksV0FBSixDQUFnQixTQUFoQixFQUQyQjtJQUFYLENBQWpCLENBTHlCO0dBQVgsQ0FBZjs7O0FBRnlCLEdBYXpCLENBQUUsbUJBQUYsRUFBdUIsU0FBdkIsQ0FBaUMsVUFBUyxDQUFULEVBQVk7QUFDNUMsS0FBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsRUFBc0IsQ0FBdEIsRUFBeUIsTUFBekIsR0FBa0MsQ0FBbEMsQ0FENEM7QUFFNUMsS0FBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsRUFBc0IsQ0FBdEIsRUFBeUIsSUFBekIsR0FGNEM7R0FBWixDQUFqQyxDQUdHLFFBSEgsQ0FHWSxVQUFTLENBQVQsRUFBWTtBQUN2QixLQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsT0FBYixFQUFzQixDQUF0QixFQUF5QixLQUF6QixHQUR1QjtHQUFaLENBSFo7OztBQWJ5QixHQXFCekIsQ0FBRSxtQkFBRixFQUF1QixLQUF2QixDQUE2QixVQUFTLENB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QUFYLENBQWUsRUFBQyxZQUFXLFNBQVgsRUFBaEIsRUFGa0I7RUFBVjtDQWhDVjs7QUFzQ0EsT0FBTyxPQUFQLEdBQWlCLGVBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBtb2RhbCA9IHJlcXVpcmUoJy4vanMtbW9kdWxlcy9tb2RhbC5qcycpO1xuXG52YXIgYXBwID0ge1xuXHR2aWRlb01vZGFsOiBudWxsLFxuXG5cdGluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIEZpeGVkIG5hdiBvZmZzZXRcblx0XHR0aGlzLmV2ZW50QmluZGluZ3MoKTtcblx0XHR0aGlzLmluaXRTbGlkZXJzKCk7XG5cdH0sXG5cblx0ZXZlbnRCaW5kaW5nczogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gT24gd2luZG93IGxvYWRcblx0XHQkKHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuYXZPZmZzZXQgPSAkKCcuaGVyby0td3JhcHBlcicpLmlubmVySGVpZ2h0KCk7XG5cdFx0XHRhcHAuZml4TmF2VG9Ub3AobmF2T2Zmc2V0KTtcblxuXHRcdFx0Ly8gT24gd2luZG93IHNjcm9sbFxuXHRcdFx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcblx0XHRcdFx0YXBwLmZpeE5hdlRvVG9wKG5hdk9mZnNldCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8vIEF1dG9wbGF5IHZpZGVvIG9uIG1vdXNlb3ZlclxuXHRcdCQoJy52aWRlb19fY29udGFpbmVyJykubW91c2VvdmVyKGZ1bmN0aW9uKGUpIHtcblx0XHRcdCQodGhpcykuZmluZCgndmlkZW8nKVswXS52b2x1bWUgPSAwO1xuXHRcdFx0JCh0aGlzKS5maW5kKCd2aWRlbycpWzBdLnBsYXkoKTtcblx0XHR9KS5tb3VzZW91dChmdW5jdGlvbihlKSB7XG5cdFx0XHQkKHRoaXMpLmZpbmQoJ3ZpZGVvJylbMF0ucGF1c2UoKTtcblx0XHR9KTtcblxuXHRcdC8vIFNob3cgdmlkZW8gbW9kYWwgb24gY2xpY2tcblx0XHQkKCcudmlkZW9fX2NvbnRhaW5lcicpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0dmFyIHNyYyA9ICQodGhpcykuZmluZCgnc291cmNlJykuYXR0cignc3JjJyk7XG5cdFx0XHRhcHAuYnVpbGRWaWRlb01vZGFsKHNyYyk7XG5cdFx0XHRhcHAudmlkZW9Nb2RhbC5zaG93KCk7XG5cdFx0fSk7XG5cdH0sXG5cblx0bW9kYWxFdmVudEJpbmRpbmdzOiBmdW5jdGlvbigpIHtcblx0XHQkKCcudmlkZW8tbW9kYWxfX2Nsb3NlJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0YXBwLnZpZGVvTW9kYWwuZGVzdHJveSgpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdGZpeE5hdlRvVG9wOiBmdW5jdGlvbihvZmZzZXQpIHtcblx0XHQvLyBGaXggbmF2IHRvIHRvcFxuXHRcdGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBvZmZzZXQpIHtcblx0XHRcdGlmICgkKCcuZml4ZWQtbmF2LS13cmFwcGVyJykuaGFzQ2xhc3MoJ2ZpeGVkLXRvcCcpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoJy5maXhlZC1uYXYtLXdyYXBwZXInKS5hZGRDbGFzcygnZml4ZWQtdG9wJyk7XG5cdFx0XHRcdCQoJy5wYXJ0bmVyLS13cmFwcGVyJykuY3NzKHsgJ21hcmdpbi10b3AnOiAoJCgnLmZpeGVkLW5hdi0td3JhcHBlcicpLmlubmVySGVpZ2h0KCkgLSAyOCkgKyAncHgnIH0pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoJCgnLmZpeGVkLXRvcCcpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0JCgnLmZpeGVkLW5hdi0td3JhcHBlcicpLnJlbW92ZUNsYXNzKCdmaXhlZC10b3AnKTtcblx0XHRcdFx0JCgnLnBhcnRuZXItLXdyYXBwZXInKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRidWlsZFZpZGVvTW9kYWw6IGZ1bmN0aW9uKHNyYykge1xuXHRcdC8vIEJ1aWxkIHZpZGVvIGNvbnRlbnRzXG5cdFx0dmFyICR2aWRlb1dyYXBwZXIgPSAkKCc8ZGl2PicpLFxuXHRcdFx0JHZpZGVvID0gJCgnPHZpZGVvPicpLFxuXHRcdFx0JHZpZGVvQ2xvc2UgPSAkKCc8ZGl2PicpO1xuXG5cdFx0JHZpZGVvV3JhcHBlci5hZGRDbGFzcygndmlkZW8tbW9kYWwtLWlubmVyJyk7XG5cdFx0JHZpZGVvLmFkZENsYXNzKCd2aWRlby1tb2RhbF9fdmlkZW8nKTtcblx0XHQkdmlkZW9DbG9zZS5hZGRDbGFzcygndmlkZW8tbW9kYWxfX2Nsb3NlJyk7XG5cblx0XHQkdmlkZW8uYXR0cih7XG5cdFx0XHRzcmM6IHNyYyxcblx0XHRcdGF1dG9wbGF5OiB0cnVlLFxuXHRcdFx0Y29udHJvbHM6IHRydWVcblx0XHR9KTtcblxuXHRcdCR2aWRlb1dyYXBwZXIuYXBwZW5kKCR2aWRlbykuYXBwZW5kKCR2aWRlb0Nsb3NlKTtcblxuXHRcdGNvbnNvbGUubG9nKCR2aWRlb1dyYXBwZXIpO1xuXG5cdFx0YXBwLnZpZGVvTW9kYWwgPSBuZXcgbW9kYWwoJ3ZpZGVvLW1vZGFsJyk7XG5cdFx0YXBwLnZpZGVvTW9kYWwuaW5pdChhcHAubW9kYWxFdmVudEJpbmRpbmdzLCBhcHApO1xuXG5cdFx0JCgnLm1vZGFsLWlubmVyJykuYXBwZW5kKCR2aWRlb1dyYXBwZXIpO1xuXG5cdFx0YXBwLm1vZGFsRXZlbnRCaW5kaW5ncygpO1xuXHR9LFxuXG5cdGluaXRTbGlkZXJzOiBmdW5jdGlvbigpIHtcblx0XHQkKCcudGVzdGltb25pYWxzX19zbGlkZXInKS5zbGljayh7XG5cdFx0XHRhcHBlbmRBcnJvd3M6ICQoJy50ZXN0aW1vbmlhbHNfX2Fycm93cycpXG5cdFx0fSk7XG5cblx0XHQkKCcuYXNzZXRzX19zbGlkZXInKS5zbGljayh7XG5cdFx0XHRhcHBlbmRBcnJvd3M6ICQoJy5hc3NldHNfX2Fycm93cycpXG5cdFx0fSk7XG5cdH0sXG5cblx0c2hvd0Fzc2V0c0Zvcm06IGZ1bmN0aW9uKCkge1xuXHRcdC8vIFxuXHR9LFxuXG5cdHJlZGlyZWN0VG9Bc3NldDogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gXG5cdH1cbn1cblxuXG4kKGZ1bmN0aW9uKCkge1xuXHRhcHAuaW5pdCgpO1xufSk7IiwidmFyIG1vZGFsRnVsbHNjcmVlbiA9IGZ1bmN0aW9uKGlkKSB7XG5cdHRoaXMuaWQgPSBpZDtcblx0dGhpcy4kY29udGFpbmVyID0gbnVsbDtcblx0dGhpcy4kYm9keSA9ICQoJ2JvZHknKTtcbn1cblxubW9kYWxGdWxsc2NyZWVuLnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogbW9kYWxGdWxsc2NyZWVuLFxuXG5cdGluaXQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjYWxsYmFja09iail7XG5cdFx0dGhpcy5idWlsZChjYWxsYmFjaywgY2FsbGJhY2tPYmopO1xuXHR9LFxuXG5cdGJ1aWxkOiBmdW5jdGlvbihjYWxsYmFjaywgY2FsbGJhY2tPYmope1xuXHRcdHZhciAkbW9kYWxXcmFwcGVyID0gJCgnPGRpdj4nKSxcblx0XHRcdCRtb2RhbElubmVyID0gJCgnPGRpdj4nKTtcblxuXHRcdCRtb2RhbElubmVyLmFkZENsYXNzKCdtb2RhbC1pbm5lcicpO1xuXHRcdCRtb2RhbFdyYXBwZXIuYWRkQ2xhc3MoJ21vZGFsLS13cmFwcGVyICcgKyB0aGlzLmlkKTtcblx0XHQkbW9kYWxXcmFwcGVyLmFwcGVuZCgkbW9kYWxJbm5lcik7XG5cdFx0dGhpcy4kYm9keS5hcHBlbmQoJG1vZGFsV3JhcHBlcik7XG5cdFx0XG5cdFx0dGhpcy4kY29udGFpbmVyID0gJG1vZGFsV3JhcHBlcjtcblxuXHRcdGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrT2JqKTtcblx0fSxcblxuXHRzaG93OiBmdW5jdGlvbigpe1xuXHRcdCQoJy4nICsgdGhpcy5pZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdHRoaXMuJGJvZHkuY3NzKHsgJ292ZXJmbG93JzonaGlkZGVuJyB9KTtcblx0fSxcblxuXHRoaWRlOiBmdW5jdGlvbigpe1xuXHRcdCQoJy4nICsgdGhpcy5pZCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdHRoaXMuJGJvZHkuY3NzKHsgJ292ZXJmbG93JzondmlzaWJsZScgfSk7XG5cdH0sXG5cblx0ZGVzdHJveTogZnVuY3Rpb24oKXtcblx0XHQkKCcuJyArIHRoaXMuaWQpLnJlbW92ZSgpO1xuXHRcdHRoaXMuJGJvZHkuY3NzKHsnb3ZlcmZsb3cnOid2aXNpYmxlJ30pO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbW9kYWxGdWxsc2NyZWVuOyJdfQ==
