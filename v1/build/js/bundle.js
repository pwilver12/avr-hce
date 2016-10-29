(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = {
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

			app.showModal($('.form-modal__video'));
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

			$('.pdf-form').hide();

			app.hideModal($(this).closest('.modal--wrapper'));
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

		// Show proper download form
		$('.form-modal__form').find('[data-source*="' + source + '"]').find('.pdf-form').show();

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFJLE1BQU07QUFDVCxZQUFXLElBQVg7O0FBRUEsT0FBTSxZQUFXO0FBQ2hCLE9BQUssYUFBTCxHQURnQjtBQUVoQixPQUFLLFdBQUwsR0FGZ0I7RUFBWDs7QUFLTixnQkFBZSxZQUFXOztBQUV6QixJQUFFLE1BQUYsRUFBVSxJQUFWLENBQWUsWUFBVztBQUN6QixPQUFJLFNBQUosR0FBZ0IsRUFBRSxnQkFBRixFQUFvQixXQUFwQixFQUFoQjs7O0FBRHlCLE1BSXpCLENBQUksc0JBQUosQ0FBMkIsSUFBSSxTQUFKLENBQTNCLENBSnlCO0FBS3pCLE9BQUksV0FBSixDQUFnQixJQUFJLFNBQUosQ0FBaEI7OztBQUx5QixJQVF6QixDQUFFLGNBQUYsRUFBa0IsV0FBbEIsQ0FBOEIsWUFBOUI7OztBQVJ5QixJQVd6QixDQUFFLE1BQUYsRUFBVSxNQUFWLENBQWlCLFlBQVc7QUFDM0IsUUFBSSxzQkFBSixDQUEyQixJQUFJLFNBQUosQ0FBM0IsQ0FEMkI7QUFFM0IsUUFBSSxXQUFKLENBQWdCLElBQUksU0FBSixDQUFoQixDQUYyQjtJQUFYLENBQWpCLENBWHlCO0dBQVgsQ0FBZjs7O0FBRnlCLEdBb0J6QixDQUFFLG1CQUFGLEVBQXVCLEtBQXZCLENBQTZCLFVBQVMsQ0FBVCxFQUFZO0FBQ3hDLE9BQUksYUFBSixDQUFrQixJQUFJLFNBQUosQ0FBbEIsQ0FEd0M7R0FBWixDQUE3Qjs7O0FBcEJ5QixHQXlCekIsQ0FBRSxrQkFBRixFQUFzQixLQUF0QixDQUE0QixVQUFTLENBQVQsRUFBWTtBQUN2QyxLQUFFLGNBQUYsR0FEdUM7O0FBR3ZDLE9BQUksU0FBSixDQUFjLEVBQUUsOEJBQUYsQ0FBZCxFQUh1QztHQUFaLENBQTVCOzs7QUF6QnlCLEdBZ0N6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RUFBZ0I7QUFDckMsTUFBSSxXQUFXLE1BQU0sSUFBTixDQUFXLGdCQUFYLEVBQTZCLElBQTdCLEVBQVg7TUFDSCxXQUFXLE1BQU0sSUFBTixDQUFXLEtBQVgsRUFBa0IsSUFBbEIsQ0FBdUIsS0FBdkIsQ0FBWDtNQUNBLFdBQVcsTUFBTSxJQUFOLENBQVcsS0FBWCxFQUFrQixJQUFsQixDQUF1QixLQUF2QixDQUFYO01BQ0EsU0FBUyxNQUFNLElBQU4sQ0FBVyxRQUFYLENBQVQ7OztBQUpvQyxHQU9yQyxDQUFFLDJCQUFGLEVBQStCLElBQS9CLENBQW9DLHdCQUFwQyxFQUNFLElBREYsQ0FDTyxLQURQLEVBQ2MsUUFEZCxFQUVFLElBRkYsQ0FFTyxLQUZQLEVBRWMsUUFGZCxFQUdFLElBSEYsQ0FHTyxRQUhQLEVBR2lCLE1BSGpCOzs7QUFQcUMsR0FhckMsQ0FBRSxtQkFBRixFQUF1QixJQUF2QixDQUE0QixvQkFBb0IsTUFBcEIsR0FBNkIsSUFBN0IsQ0FBNUIsQ0FBK0QsSUFBL0QsQ0FBb0UsV0FBcEUsRUFBaUYsSUFBakYsR0FicUM7O0FBZXJDLE1BQUksU0FBSixDQUFjLEVBQUUsMkJBQUYsQ0FBZCxFQWZxQztFQUFoQjs7QUFrQnRCLFlBQVcsVUFBUyxNQUFULEVBQWlCO0FBQzNCLFNBQU8sUUFBUCxDQUFnQixRQUFoQixFQUQyQjtBQUUzQixJQUFFLE1BQUYsRUFBVSxHQUFWLENBQWMsRUFBRSxZQUFZLFFBQVosRUFBaEIsRUFGMkI7RUFBakI7O0FBS1gsWUFBVyxVQUFTLE1BQVQsRUFBaUI7QUFDM0IsU0FBTyxXQUFQLENBQW1CLFFBQW5CLEVBRDJCO0FBRTNCLElBQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxFQUFFLFlBQVksU0FBWixFQUFoQixFQUYyQjtFQUFqQjtDQWpKUjs7QUF3SkosRUFBRSxZQUFXO0FBQ1osS0FBSSxJQUFKLEdBRFk7Q0FBWCxDQUFGIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBhcHAgPSB7XG5cdG5hdk9mZnNldDogbnVsbCxcblxuXHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmV2ZW50QmluZGluZ3MoKTtcblx0XHR0aGlzLmluaXRTbGlkZXJzKCk7XG5cdH0sXG5cblx0ZXZlbnRCaW5kaW5nczogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gT24gd2luZG93IGxvYWRcblx0XHQkKHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcblx0XHRcdGFwcC5uYXZPZmZzZXQgPSAkKCcuaGVyby0td3JhcHBlcicpLmlubmVySGVpZ2h0KCk7XG5cblx0XHRcdC8vIENoZWNrIG9uIHBhZ2UgbG9hZCB0byByZXBvc2l0aW9uIGhlYWRlciBpdGVtc1xuXHRcdFx0YXBwLnBhcmFsbGF4RWZmZWN0T25IZWFkZXIoYXBwLm5hdk9mZnNldCk7XG5cdFx0XHRhcHAuZml4TmF2VG9Ub3AoYXBwLm5hdk9mZnNldCk7XG5cblx0XHRcdC8vIFNob3cgaGVybyBmZWF0dXJlcyBzZWN0aW9uXG5cdFx0XHQkKCcqLmxvYWQtZGVsYXknKS5yZW1vdmVDbGFzcygnbG9hZC1kZWxheScpO1xuXG5cdFx0XHQvLyBPbiB3aW5kb3cgc2Nyb2xsXG5cdFx0XHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRhcHAucGFyYWxsYXhFZmZlY3RPbkhlYWRlcihhcHAubmF2T2Zmc2V0KTtcblx0XHRcdFx0YXBwLmZpeE5hdlRvVG9wKGFwcC5uYXZPZmZzZXQpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBPbiBzY3JvbGwgYnV0dG9uIGNsaWNrXG5cdFx0JCgnLmhlcm9fX3Njcm9sbC1idG4nKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRhcHAuc2Nyb2xsVG9Qb2ludChhcHAubmF2T2Zmc2V0KTtcblx0XHR9KTtcblxuXHRcdC8vIE9uICdSZXF1ZXN0IE1lZXRpbmcnIGNsaWNrXG5cdFx0JCgnLnJlcXVlc3QtbWVldGluZycpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0YXBwLnNob3dNb2RhbCgkKCcuZm9ybS1tb2RhbF9fcmVxdWVzdC1tZWV0aW5nJykpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gU2hvdyB2aWRlbyBmb3JtIGFuZCBtb2RhbCBvbiBjbGlja1xuXHRcdCQoJy52aWRlb19fY29udGFpbmVyJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRhcHAuc2hvd01vZGFsKCQoJy5mb3JtLW1vZGFsX192aWRlbycpKTtcblx0XHR9KTtcblxuXHRcdC8vIE9uIFBERiBkb3dubG9hZCBsaW5rcyBjbGlja1xuXHRcdCQoJy5hc3NldHNfX3NsaWRlci0taXRlbSBhJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHR2YXIgJHBkZlNsaWRlID0gJCh0aGlzKS5jbG9zZXN0KCcuYXNzZXRzX19zbGlkZXItLWl0ZW0nKTtcblx0XHRcdGFwcC51cGRhdGVQZGZNb2RhbEFzc2V0cygkcGRmU2xpZGUpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gRm9ybSBtb2RhbCBjbG9zZVxuXHRcdCQoJy5mb3JtLW1vZGFsLS1jbG9zZScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0JCgnLnBkZi1mb3JtJykuaGlkZSgpO1xuXG5cdFx0XHRhcHAuaGlkZU1vZGFsKCQodGhpcykuY2xvc2VzdCgnLm1vZGFsLS13cmFwcGVyJykpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdHBhcmFsbGF4RWZmZWN0T25IZWFkZXI6IGZ1bmN0aW9uKG5hdlRvcCkge1xuXHRcdHZhciBzcGVlZCA9ICQoJy5oZXJvX19jb250ZW50LS13cmFwcGVyJykuZGF0YSgnc3BlZWQnKSxcblx0XHRcdG9mZnNldCA9ICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkpIC8gc3BlZWQ7XG5cblx0XHRpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpIDwgbmF2VG9wICYmICQod2luZG93KS53aWR0aCgpID4gNzY3KSB7XG5cdFx0XHQkKCcuaGVyb19fY29udGVudC0td3JhcHBlcicpLmNzcyh7ICd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoMCwgJyArIG9mZnNldCArICdweCwgMCknIH0pO1xuXHRcdH1cblx0fSxcblxuXHRzY3JvbGxUb1BvaW50OiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdHNjcm9sbFRvcDogdmFsdWVcblx0XHR9LCAnc2xvdycpO1xuXHR9LFxuXG5cdGZpeE5hdlRvVG9wOiBmdW5jdGlvbihvZmZzZXQpIHtcblx0XHQvLyBGaXggbmF2IHRvIHRvcFxuXHRcdGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBvZmZzZXQpIHtcblx0XHRcdGlmICgkKCcuZml4ZWQtbmF2LS13cmFwcGVyJykuaGFzQ2xhc3MoJ2ZpeGVkLXRvcCcpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoJy5maXhlZC1uYXYtLXdyYXBwZXInKS5hZGRDbGFzcygnZml4ZWQtdG9wJyk7XG5cdFx0XHRcdCQoJy5wYXJ0bmVyLS13cmFwcGVyJykuY3NzKHsgJ21hcmdpbi10b3AnOiAoJCgnLmZpeGVkLW5hdi0td3JhcHBlcicpLmlubmVySGVpZ2h0KCkgLSAyOCkgKyAncHgnIH0pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoJCgnLmZpeGVkLXRvcCcpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0JCgnLmZpeGVkLW5hdi0td3JhcHBlcicpLnJlbW92ZUNsYXNzKCdmaXhlZC10b3AnKTtcblx0XHRcdFx0JCgnLnBhcnRuZXItLXdyYXBwZXInKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRpbml0U2xpZGVyczogZnVuY3Rpb24oKSB7XG5cdFx0JCgnLnRlc3RpbW9uaWFsc19fc2xpZGVyJykuc2xpY2soe1xuXHRcdFx0YXBwZW5kQXJyb3dzOiAkKCcudGVzdGltb25pYWxzX19hcnJvd3MnKVxuXHRcdH0pO1xuXG5cdFx0JCgnLmFzc2V0c19fc2xpZGVyJykuc2xpY2soe1xuXHRcdFx0YXBwZW5kQXJyb3dzOiAkKCcuYXNzZXRzX19hcnJvd3MnKSxcblx0XHRcdHNsaWRlc1RvU2hvdzogMyxcblx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHRcdFx0cmVzcG9uc2l2ZTogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YnJlYWtwb2ludDogNzY3LFxuXHRcdFx0XHRcdHNldHRpbmdzOiB7XG5cdFx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRicmVha3BvaW50OiA1MjUsXG5cdFx0XHRcdFx0c2V0dGluZ3M6IHtcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogMVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0pO1xuXHR9LFxuXG5cdHVwZGF0ZVBkZk1vZGFsQXNzZXRzOiBmdW5jdGlvbihzbGlkZSkge1xuXHRcdHZhciBwZGZUaXRsZSA9IHNsaWRlLmZpbmQoJy5hc3NldHNfX3RpdGxlJykudGV4dCgpLFxuXHRcdFx0aW1hZ2VTcmMgPSBzbGlkZS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnKSxcblx0XHRcdGltYWdlQWx0ID0gc2xpZGUuZmluZCgnaW1nJykuYXR0cignYWx0JyksXG5cdFx0XHRzb3VyY2UgPSBzbGlkZS5kYXRhKCdzb3VyY2UnKTtcblxuXHRcdC8vIFVwZGF0ZSBwZGYgaW1hZ2UgaW4gbW9kYWxcblx0XHQkKCcuZm9ybS1tb2RhbF9fcGRmLWRvd25sb2FkJykuZmluZCgnLmZvcm0tbW9kYWxfX3BkZi1pbWFnZScpXG5cdFx0XHQuYXR0cignc3JjJywgaW1hZ2VTcmMpXG5cdFx0XHQuYXR0cignYWx0JywgaW1hZ2VBbHQpXG5cdFx0XHQuZGF0YSgnc291cmNlJywgc291cmNlKTtcblxuXHRcdC8vIFNob3cgcHJvcGVyIGRvd25sb2FkIGZvcm1cblx0XHQkKCcuZm9ybS1tb2RhbF9fZm9ybScpLmZpbmQoJ1tkYXRhLXNvdXJjZSo9XCInICsgc291cmNlICsgJ1wiXScpLmZpbmQoJy5wZGYtZm9ybScpLnNob3coKTtcblxuXHRcdGFwcC5zaG93TW9kYWwoJCgnLmZvcm0tbW9kYWxfX3BkZi1kb3dubG9hZCcpKTtcblx0fSxcblxuXHRzaG93TW9kYWw6IGZ1bmN0aW9uKCRtb2RhbCkge1xuXHRcdCRtb2RhbC5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0JCgnYm9keScpLmNzcyh7ICdvdmVyZmxvdyc6ICdoaWRkZW4nIH0pO1xuXHR9LFxuXG5cdGhpZGVNb2RhbDogZnVuY3Rpb24oJG1vZGFsKSB7XG5cdFx0JG1vZGFsLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHQkKCdib2R5JykuY3NzKHsgJ292ZXJmbG93JzogJ3Zpc2libGUnIH0pO1xuXHR9XG59XG5cblxuJChmdW5jdGlvbigpIHtcblx0YXBwLmluaXQoKTtcbn0pOyJdfQ==
