(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = {
	init: function () {
		// Init other vars
		pdfSlider.init();
		quoteSlider.init();

		// Fixed nav offset
		this.eventBindings();
	},

	eventBindings: function () {
		// On window load
		$(window).load(function () {
			var navOffset = $('.hero--wrapper').innerHeight();

			// On window scroll
			$(window).scroll(function () {
				app.fixNavToTop(navOffset);
			});
		});
	},

	fixNavToTop: function (offset) {
		// Fix nav to top
		if ($(window).scrollTop() > offset) {
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
};

var pdfSlider = {
	init: function () {
		//
	}
};

var quoteSlider = {
	init: function () {
		//
	}
};

$(function () {
	app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFJLE1BQU07QUFDVCxPQUFNLFlBQVc7O0FBRWhCLFlBQVUsSUFBVixHQUZnQjtBQUdoQixjQUFZLElBQVo7OztBQUhnQixNQU1oQixDQUFLLGFBQUwsR0FOZ0I7RUFBWDs7QUFTTixnQkFBZSxZQUFXOztBQUV6QixJQUFFLE1BQUYsRUFBVSxJQUFWLENBQWUsWUFBVztBQUN6QixPQUFJLFlBQVksRUFBRSxnQkFBRixFQUFvQixXQUFwQixFQUFaOzs7QUFEcUIsSUFJekIsQ0FBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixZQUFXO0FBQzNCLFFBQUksV0FBSixDQUFnQixTQUFoQixFQUQyQjtJQUFYLENBQWpCLENBSnlCO0dBQVgsQ0FBZixDQUZ5QjtFQUFYOztBQVlmLGNBQWEsVUFBUyxNQUFULEVBQWlCOztBQUU3QixNQUFJLEVBQUUsTUFBRixFQUFVLFNBQVYsS0FBd0IsTUFBeEIsRUFBZ0M7QUFDbkMsT0FBSSxFQUFFLHFCQUFGLEVBQXlCLFFBQXpCLENBQWtDLFdBQWxDLENBQUosRUFBb0Q7QUFDbkQsV0FBTyxLQUFQLENBRG1EO0lBQXBELE1BRU87QUFDTixNQUFFLHFCQUFGLEVBQXlCLFFBQXpCLENBQWtDLFdBQWxDLEVBRE07QUFFTixNQUFFLG1CQUFGLEVBQXVCLEdBQXZCLENBQTJCLEVBQUUsY0FBYyxFQUFFLHFCQUFGLEVBQXlCLFdBQXpCLEtBQXlDLElBQXpDLEVBQTNDLEVBRk07SUFGUDtHQURELE1BT087QUFDTixPQUFJLEVBQUUsWUFBRixFQUFnQixNQUFoQixHQUF5QixDQUF6QixFQUE0QjtBQUMvQixNQUFFLHFCQUFGLEVBQXlCLFdBQXpCLENBQXFDLFdBQXJDLEVBRCtCO0FBRS9CLE1BQUUsbUJBQUYsRUFBdUIsVUFBdkIsQ0FBa0MsT0FBbEMsRUFGK0I7SUFBaEM7R0FSRDtFQUZZO0NBdEJWOztBQXdDSixJQUFJLFlBQVk7QUFDZixPQUFNLFlBQVc7O0VBQVg7Q0FESDs7QUFNSixJQUFJLGNBQWM7QUFDakIsT0FBTSxZQUFXOztFQUFYO0NBREg7O0FBTUosRUFBRSxZQUFXO0FBQ1osS0FBSSxJQUFKLEdBRFk7Q0FBWCxDQUFGIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBhcHAgPSB7XG5cdGluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIEluaXQgb3RoZXIgdmFyc1xuXHRcdHBkZlNsaWRlci5pbml0KCk7XG5cdFx0cXVvdGVTbGlkZXIuaW5pdCgpO1xuXG5cdFx0Ly8gRml4ZWQgbmF2IG9mZnNldFxuXHRcdHRoaXMuZXZlbnRCaW5kaW5ncygpO1xuXHR9LFxuXG5cdGV2ZW50QmluZGluZ3M6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIE9uIHdpbmRvdyBsb2FkXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmF2T2Zmc2V0ID0gJCgnLmhlcm8tLXdyYXBwZXInKS5pbm5lckhlaWdodCgpO1xuXG5cdFx0XHQvLyBPbiB3aW5kb3cgc2Nyb2xsXG5cdFx0XHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRhcHAuZml4TmF2VG9Ub3AobmF2T2Zmc2V0KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9LFxuXG5cdGZpeE5hdlRvVG9wOiBmdW5jdGlvbihvZmZzZXQpIHtcblx0XHQvLyBGaXggbmF2IHRvIHRvcFxuXHRcdGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBvZmZzZXQpIHtcblx0XHRcdGlmICgkKCcuZml4ZWQtbmF2LS13cmFwcGVyJykuaGFzQ2xhc3MoJ2ZpeGVkLXRvcCcpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoJy5maXhlZC1uYXYtLXdyYXBwZXInKS5hZGRDbGFzcygnZml4ZWQtdG9wJyk7XG5cdFx0XHRcdCQoJy5wYXJ0bmVyLS13cmFwcGVyJykuY3NzKHsgJ21hcmdpbi10b3AnOiAkKCcuZml4ZWQtbmF2LS13cmFwcGVyJykuaW5uZXJIZWlnaHQoKSArICdweCcgfSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICgkKCcuZml4ZWQtdG9wJykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHQkKCcuZml4ZWQtbmF2LS13cmFwcGVyJykucmVtb3ZlQ2xhc3MoJ2ZpeGVkLXRvcCcpO1xuXHRcdFx0XHQkKCcucGFydG5lci0td3JhcHBlcicpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbnZhciBwZGZTbGlkZXIgPSB7XG5cdGluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIFxuXHR9XG59XG5cbnZhciBxdW90ZVNsaWRlciA9IHtcblx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gXG5cdH1cbn1cblxuJChmdW5jdGlvbigpIHtcblx0YXBwLmluaXQoKTtcbn0pOyJdfQ==
