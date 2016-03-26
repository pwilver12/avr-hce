var modal = require('./js-modules/modal.js');

var app = {
	videoModal: null,

	init: function() {
		// Fixed nav offset
		this.eventBindings();
		this.initSliders();
	},

	eventBindings: function() {
		// On window load
		$(window).load(function() {
			var navOffset = $('.hero--wrapper').innerHeight();
			app.fixNavToTop(navOffset);

			// On window scroll
			$(window).scroll(function() {
				app.fixNavToTop(navOffset);
			});
		});

		// Autoplay video on mouseover
		$('.video__container').mouseover(function(e) {
			$(this).find('video')[0].volume = 0;
			$(this).find('video')[0].play();
		}).mouseout(function(e) {
			$(this).find('video')[0].pause();
		});

		// Show video modal on click
		$('.video__container').click(function(e) {
			e.preventDefault();

			var src = $(this).find('source').attr('src');
			app.buildVideoModal(src);
			app.videoModal.show();
		});

		// On 'Request Meeting' click
		$('.request-meeting').click(function(e) {
			e.preventDefault();

			$('.form-modal__request-meeting').addClass('active');
		});

		// On PDF download links click
		$('.assets__slider--item a').click(function(e) {
			e.preventDefault();

			$('.form-modal__pdf-download').addClass('active');
		});

		// Form modal close
		$('.form-modal--close').click(function(e) {
			e.preventDefault();

			$(this).closest('.modal--wrapper').removeClass('active');
		});
	},

	modalEventBindings: function() {
		$('.video-modal__close').click(function(e) {
			e.preventDefault();
			app.videoModal.destroy();
		});
	},

	fixNavToTop: function(offset) {
		// Fix nav to top
		if ($(window).scrollTop() > offset) {
			if ($('.fixed-nav--wrapper').hasClass('fixed-top')) {
				return false;
			} else {
				$('.fixed-nav--wrapper').addClass('fixed-top');
				$('.partner--wrapper').css({ 'margin-top': ($('.fixed-nav--wrapper').innerHeight() - 28) + 'px' });
			}
		} else {
			if ($('.fixed-top').length > 0) {
				$('.fixed-nav--wrapper').removeClass('fixed-top');
				$('.partner--wrapper').removeAttr('style');
			}
		}
	},

	buildVideoModal: function(src) {
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

	initSliders: function() {
		$('.testimonials__slider').slick({
			appendArrows: $('.testimonials__arrows')
		});

		$('.assets__slider').slick({
			appendArrows: $('.assets__arrows')
		});
	},

	showAssetsForm: function() {
		// 
	},

	redirectToAsset: function() {
		// 
	}
}


$(function() {
	app.init();
});