var slider = {
	init: function() {
		$('.slider').slick({
			vertical: true,
			easing: 'swing'
		});
	}
}

$(function() {
	slider.init();
});