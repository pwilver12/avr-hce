var $ = require('jquery');
var slick = require('./libs/slick.min.js');

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