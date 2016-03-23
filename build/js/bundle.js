(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = {
	fixedNavTop: null,

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
			app.fixedNavTop = app.fixedNavTop || $('.fixed-nav--wrapper').offset().top;

			// On window scroll
			$(window).scroll(function () {
				app.onScroll();
			});
		});
	},

	onScroll: function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFJLE1BQU07QUFDVCxjQUFhLElBQWI7O0FBRUEsT0FBTSxZQUFXOztBQUVoQixZQUFVLElBQVYsR0FGZ0I7QUFHaEIsY0FBWSxJQUFaOzs7QUFIZ0IsTUFNaEIsQ0FBSyxhQUFMLEdBTmdCO0VBQVg7O0FBU04sZ0JBQWUsWUFBVzs7QUFFekIsSUFBRSxNQUFGLEVBQVUsSUFBVixDQUFlLFlBQVc7QUFDekIsT0FBSSxXQUFKLEdBQWtCLElBQUksV0FBSixJQUFtQixFQUFFLHFCQUFGLEVBQXlCLE1BQXpCLEdBQWtDLEdBQWxDOzs7QUFEWixJQUl6QixDQUFFLE1BQUYsRUFBVSxNQUFWLENBQWlCLFlBQVc7QUFDM0IsUUFBSSxRQUFKLEdBRDJCO0lBQVgsQ0FBakIsQ0FKeUI7R0FBWCxDQUFmLENBRnlCO0VBQVg7O0FBWWYsV0FBVSxZQUFXOztBQUVwQixNQUFJLEVBQUUsTUFBRixFQUFVLFNBQVYsS0FBd0IsSUFBSSxXQUFKLEVBQWlCO0FBQzVDLE9BQUksRUFBRSxxQkFBRixFQUF5QixRQUF6QixDQUFrQyxXQUFsQyxDQUFKLEVBQW9EO0FBQ25ELFdBQU8sS0FBUCxDQURtRDtJQUFwRCxNQUVPO0FBQ04sTUFBRSxxQkFBRixFQUF5QixRQUF6QixDQUFrQyxXQUFsQyxFQURNO0FBRU4sTUFBRSxtQkFBRixFQUF1QixHQUF2QixDQUEyQixFQUFFLGNBQWMsRUFBRSxxQkFBRixFQUF5QixXQUF6QixLQUF5QyxJQUF6QyxFQUEzQyxFQUZNO0lBRlA7R0FERCxNQU9PO0FBQ04sT0FBSSxFQUFFLFlBQUYsRUFBZ0IsTUFBaEIsR0FBeUIsQ0FBekIsRUFBNEI7QUFDL0IsTUFBRSxxQkFBRixFQUF5QixXQUF6QixDQUFxQyxXQUFyQyxFQUQrQjtBQUUvQixNQUFFLG1CQUFGLEVBQXVCLFVBQXZCLENBQWtDLE9BQWxDLEVBRitCO0lBQWhDO0dBUkQ7RUFGUztDQXhCUDs7QUEwQ0osSUFBSSxZQUFZO0FBQ2YsT0FBTSxZQUFXOztFQUFYO0NBREg7O0FBTUosSUFBSSxjQUFjO0FBQ2pCLE9BQU0sWUFBVzs7RUFBWDtDQURIOztBQU1KLEVBQUUsWUFBVztBQUNaLEtBQUksSUFBSixHQURZO0NBQVgsQ0FBRiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgYXBwID0ge1xuXHRmaXhlZE5hdlRvcDogbnVsbCxcblxuXHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHQvLyBJbml0IG90aGVyIHZhcnNcblx0XHRwZGZTbGlkZXIuaW5pdCgpO1xuXHRcdHF1b3RlU2xpZGVyLmluaXQoKTtcblxuXHRcdC8vIEZpeGVkIG5hdiBvZmZzZXRcblx0XHR0aGlzLmV2ZW50QmluZGluZ3MoKTtcblx0fSxcblxuXHRldmVudEJpbmRpbmdzOiBmdW5jdGlvbigpIHtcblx0XHQvLyBPbiB3aW5kb3cgbG9hZFxuXHRcdCQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkge1xuXHRcdFx0YXBwLmZpeGVkTmF2VG9wID0gYXBwLmZpeGVkTmF2VG9wIHx8ICQoJy5maXhlZC1uYXYtLXdyYXBwZXInKS5vZmZzZXQoKS50b3A7XG5cblx0XHRcdC8vIE9uIHdpbmRvdyBzY3JvbGxcblx0XHRcdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGFwcC5vblNjcm9sbCgpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0b25TY3JvbGw6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIEZpeCBuYXYgdG8gdG9wXG5cdFx0aWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IGFwcC5maXhlZE5hdlRvcCkge1xuXHRcdFx0aWYgKCQoJy5maXhlZC1uYXYtLXdyYXBwZXInKS5oYXNDbGFzcygnZml4ZWQtdG9wJykpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JCgnLmZpeGVkLW5hdi0td3JhcHBlcicpLmFkZENsYXNzKCdmaXhlZC10b3AnKTtcblx0XHRcdFx0JCgnLnBhcnRuZXItLXdyYXBwZXInKS5jc3MoeyAnbWFyZ2luLXRvcCc6ICQoJy5maXhlZC1uYXYtLXdyYXBwZXInKS5pbm5lckhlaWdodCgpICsgJ3B4JyB9KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCQoJy5maXhlZC10b3AnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdCQoJy5maXhlZC1uYXYtLXdyYXBwZXInKS5yZW1vdmVDbGFzcygnZml4ZWQtdG9wJyk7XG5cdFx0XHRcdCQoJy5wYXJ0bmVyLS13cmFwcGVyJykucmVtb3ZlQXR0cignc3R5bGUnKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxudmFyIHBkZlNsaWRlciA9IHtcblx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gXG5cdH1cbn1cblxudmFyIHF1b3RlU2xpZGVyID0ge1xuXHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHQvLyBcblx0fVxufVxuXG4kKGZ1bmN0aW9uKCkge1xuXHRhcHAuaW5pdCgpO1xufSk7Il19
