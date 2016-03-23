var app = {
	init: function() {
		// Init other vars
		pdfSlider.init();
		quoteSlider.init();

		// Fixed nav offset
		this.eventBindings();
	},

	eventBindings: function() {
		// On window load
		$(window).load(function() {
			var navOffset = $('.hero--wrapper').innerHeight();

			// On window scroll
			$(window).scroll(function() {
				app.fixNavToTop(navOffset);
			});
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
	}
}

var pdfSlider = {
	init: function() {
		// 
	}
}

var quoteSlider = {
	init: function() {
		// 
	}
}

$(function() {
	app.init();
});