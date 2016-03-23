var app = {
	fixedNavTop: null,

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
			app.fixedNavTop = app.fixedNavTop || $('.fixed-nav--wrapper').offset().top;

			// On window scroll
			$(window).scroll(function() {
				app.onScroll();
			});
		});
	},

	onScroll: function() {
		// Fix nav to top
		if ($(window).scrollTop() > app.fixedNavTop) {
			if ($('.fixed-nav--wrapper').hasClass('fixed-top')) {
				return false;
			} else {
				$('.fixed-nav--wrapper').addClass('fixed-top');
				$('.partner--wrapper').css({ 'margin-top': $('.fixed-nav--wrapper').innerHeight() + 'px' });
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