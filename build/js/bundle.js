(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var modal = require('./js-modules/modal.js');

var app = {
	videoModal: null,

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

		$('.video__container').click(function (e) {
			e.preventDefault();

			var src = $(this).find('source').attr('src');
			app.buildVideoModal(src);
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
		app.videoModal.show();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvanMtbW9kdWxlcy9tb2RhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksUUFBUSxRQUFRLHVCQUFSLENBQVI7O0FBRUosSUFBSSxNQUFNO0FBQ1QsYUFBWSxJQUFaOztBQUVBLE9BQU0sWUFBVzs7QUFFaEIsWUFBVSxJQUFWLEdBRmdCO0FBR2hCLGNBQVksSUFBWjs7O0FBSGdCLE1BTWhCLENBQUssYUFBTCxHQU5nQjtFQUFYOztBQVNOLGdCQUFlLFlBQVc7O0FBRXpCLElBQUUsTUFBRixFQUFVLElBQVYsQ0FBZSxZQUFXO0FBQ3pCLE9BQUksWUFBWSxFQUFFLGdCQUFGLEVBQW9CLFdBQXBCLEVBQVosQ0FEcUI7QUFFekIsT0FBSSxXQUFKLENBQWdCLFNBQWhCOzs7QUFGeUIsSUFLekIsQ0FBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixZQUFXO0FBQzNCLFFBQUksV0FBSixDQUFnQixTQUFoQixFQUQyQjtJQUFYLENBQWpCLENBTHlCO0dBQVgsQ0FBZjs7O0FBRnlCLEdBYXpCLENBQUUsbUJBQUYsRUFBdUIsU0FBdkIsQ0FBaUMsVUFBUyxDQUFULEVBQVk7QUFDNUMsS0FBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsRUFBc0IsQ0FBdEIsRUFBeUIsTUFBekIsR0FBa0MsQ0FBbEMsQ0FENEM7QUFFNUMsS0FBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsRUFBc0IsQ0FBdEIsRUFBeUIsSUFBekIsR0FGNEM7R0FBWixDQUFqQyxDQUdHLFFBSEgsQ0FHWSxVQUFTLENBQVQsRUFBWTtBQUN2QixLQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsT0FBYixFQUFzQixDQUF0QixFQUF5QixLQUF6QixHQUR1QjtHQUFaLENBSFosQ0FieUI7O0FBb0J6QixJQUFFLG1CQUFGLEVBQXVCLEtBQXZCLENBQTZCLFVBQVMsQ0FBVCxFQUFZO0FBQ3hDLEtBQUUsY0FBRixHQUR3Qzs7QUFHeEMsT0FBSSxNQUFNLEVBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxRQUFiLEVBQXVCLElBQXZCLENBQTRCLEtBQTVCLENBQU4sQ0FIb0M7QUFJeEMsT0FBSSxlQUFKLENBQW9CLEdBQXBCLEVBSndDO0dBQVosQ0FBN0IsQ0FwQnlCO0VBQVg7O0FBNEJmLHFCQUFvQixZQUFXO0FBQzlCLElBQUUscUJBQUYsRUFBeUIsS0FBekIsQ0FBK0IsVUFBUyxDQUFULEVBQVk7QUFDMUMsS0FBRSxjQUFGLEdBRDBDO0FBRTFDLE9BQUksVUFBSixDQUFlLE9BQWYsR0FGMEM7R0FBWixDQUEvQixDQUQ4QjtFQUFYOztBQU9wQixjQUFhLFVBQVMsTUFBVCxFQUFpQjs7QUFFN0IsTUFBSSxFQUFFLE1BQUYsRUFBVSxTQUFWLEtBQXdCLE1BQXhCLEVBQWdDO0FBQ25DLE9BQUksRUFBRSxxQkFBRixFQUF5QixRQUF6QixDQUFrQyxXQUFsQyxDQUFKLEVBQW9EO0FBQ25ELFdBQU8sS0FBUCxDQURtRDtJQUFwRCxNQUVPO0FBQ04sTUFBRSxxQkFBRixFQUF5QixRQUF6QixDQUFrQyxXQUFsQyxFQURNO0FBRU4sTUFBRSxtQkFBRixFQUF1QixHQUF2QixDQUEyQixFQUFFLGNBQWMsQ0FBQyxDQUFFLHFCQUFGLEVBQXlCLFdBQXpCLEtBQXlDLEVBQXpDLEdBQStDLElBQWhELEVBQTNDLEVBRk07SUFGUDtHQURELE1BT087QUFDTixPQUFJLEVBQUUsWUFBRixFQUFnQixNQUFoQixHQUF5QixDQUF6QixFQUE0QjtBQUMvQixNQUFFLHFCQUFGLEVBQXlCLFdBQXpCLENBQXFDLFdBQXJDLEVBRCtCO0FBRS9CLE1BQUUsbUJBQUYsRUFBdUIsVUFBdkIsQ0FBa0MsT0FBbEMsRUFGK0I7SUFBaEM7R0FSRDtFQUZZOztBQWlCYixrQkFBaUIsVUFBUyxHQUFULEVBQWM7O0FBRTlCLE1BQUksZ0JBQWdCLEVBQUUsT0FBRixDQUFoQjtNQUNILFNBQVMsRUFBRSxTQUFGLENBQVQ7TUFDQSxjQUFjLEVBQUUsT0FBRixDQUFkLENBSjZCOztBQU05QixnQkFBYyxRQUFkLENBQXVCLG9CQUF2QixFQU44QjtBQU85QixTQUFPLFFBQVAsQ0FBZ0Isb0JBQWhCLEVBUDhCO0FBUTlCLGNBQVksUUFBWixDQUFxQixvQkFBckIsRUFSOEI7O0FBVTlCLFNBQU8sSUFBUCxDQUFZO0FBQ1gsUUFBSyxHQUFMO0FBQ0EsYUFBVSxJQUFWO0FBQ0EsYUFBVSxJQUFWO0dBSEQsRUFWOEI7O0FBZ0I5QixnQkFBYyxNQUFkLENBQXFCLE1BQXJCLEVBQTZCLE1BQTdCLENBQW9DLFdBQXBDLEVBaEI4Qjs7QUFrQjlCLFVBQVEsR0FBUixDQUFZLGFBQVosRUFsQjhCOztBQW9COUIsTUFBSSxVQUFKLEdBQWlCLElBQUksS0FBSixDQUFVLGFBQVYsQ0FBakIsQ0FwQjhCO0FBcUI5QixNQUFJLFVBQUosQ0FBZSxJQUFmLENBQW9CLElBQUksa0JBQUosRUFBd0IsR0FBNUMsRUFyQjhCOztBQXVCOUIsSUFBRSxjQUFGLEVBQWtCLE1BQWxCLENBQXlCLGFBQXpCLEVBdkI4Qjs7QUF5QjlCLE1BQUksa0JBQUosR0F6QjhCO0FBMEI5QixNQUFJLFVBQUosQ0FBZSxJQUFmLEdBMUI4QjtFQUFkO0NBaEVkOztBQThGSixJQUFJLFlBQVk7QUFDZixPQUFNLFlBQVc7O0VBQVg7Q0FESDs7QUFNSixJQUFJLGNBQWM7QUFDakIsT0FBTSxZQUFXOztFQUFYO0NBREg7O0FBTUosRUFBRSxZQUFXO0FBQ1osS0FBSSxJQUFKLEdBRFk7Q0FBWCxDQUFGOzs7QUM1R0EsSUFBSSxrQkFBa0IsVUFBUyxFQUFULEVBQWE7QUFDbEMsTUFBSyxFQUFMLEdBQVUsRUFBVixDQURrQztBQUVsQyxNQUFLLFVBQUwsR0FBa0IsSUFBbEIsQ0FGa0M7QUFHbEMsTUFBSyxLQUFMLEdBQWEsRUFBRSxNQUFGLENBQWIsQ0FIa0M7Q0FBYjs7QUFNdEIsZ0JBQWdCLFNBQWhCLEdBQTRCOztBQUUzQixjQUFhLGVBQWI7O0FBRUEsT0FBTSxVQUFTLFFBQVQsRUFBbUIsV0FBbkIsRUFBK0I7QUFDcEMsT0FBSyxLQUFMLENBQVcsUUFBWCxFQUFxQixXQUFyQixFQURvQztFQUEvQjs7QUFJTixRQUFPLFVBQVMsUUFBVCxFQUFtQixXQUFuQixFQUErQjtBQUNyQyxNQUFJLGdCQUFnQixFQUFFLE9BQUYsQ0FBaEI7TUFDSCxjQUFjLEVBQUUsT0FBRixDQUFkLENBRm9DOztBQUlyQyxjQUFZLFFBQVosQ0FBcUIsYUFBckIsRUFKcUM7QUFLckMsZ0JBQWMsUUFBZCxDQUF1QixvQkFBb0IsS0FBSyxFQUFMLENBQTNDLENBTHFDO0FBTXJDLGdCQUFjLE1BQWQsQ0FBcUIsV0FBckIsRUFOcUM7QUFPckMsT0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixhQUFsQixFQVBxQzs7QUFTckMsT0FBSyxVQUFMLEdBQWtCLGFBQWxCLENBVHFDOztBQVdyQyxXQUFTLEtBQVQsQ0FBZSxXQUFmLEVBWHFDO0VBQS9COztBQWNQLE9BQU0sWUFBVTtBQUNmLElBQUUsTUFBTSxLQUFLLEVBQUwsQ0FBUixDQUFpQixRQUFqQixDQUEwQixRQUExQixFQURlO0FBRWYsT0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEVBQUUsWUFBVyxRQUFYLEVBQWpCLEVBRmU7RUFBVjs7QUFLTixPQUFNLFlBQVU7QUFDZixJQUFFLE1BQU0sS0FBSyxFQUFMLENBQVIsQ0FBaUIsV0FBakIsQ0FBNkIsUUFBN0IsRUFEZTtBQUVmLE9BQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxFQUFFLFlBQVcsU0FBWCxFQUFqQixFQUZlO0VBQVY7O0FBS04sVUFBUyxZQUFVO0FBQ2xCLElBQUUsTUFBTSxLQUFLLEVBQUwsQ0FBUixDQUFpQixNQUFqQixHQURrQjtBQUVsQixPQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsRUFBQyxZQUFXLFNBQVgsRUFBaEIsRUFGa0I7RUFBVjtDQWhDVjs7QUFzQ0EsT0FBTyxPQUFQLEdBQWlCLGVBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBtb2RhbCA9IHJlcXVpcmUoJy4vanMtbW9kdWxlcy9tb2RhbC5qcycpO1xuXG52YXIgYXBwID0ge1xuXHR2aWRlb01vZGFsOiBudWxsLFxuXG5cdGluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIEluaXQgb3RoZXIgdmFyc1xuXHRcdHBkZlNsaWRlci5pbml0KCk7XG5cdFx0cXVvdGVTbGlkZXIuaW5pdCgpO1xuXG5cdFx0Ly8gRml4ZWQgbmF2IG9mZnNldFxuXHRcdHRoaXMuZXZlbnRCaW5kaW5ncygpO1xuXHR9LFxuXG5cdGV2ZW50QmluZGluZ3M6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIE9uIHdpbmRvdyBsb2FkXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmF2T2Zmc2V0ID0gJCgnLmhlcm8tLXdyYXBwZXInKS5pbm5lckhlaWdodCgpO1xuXHRcdFx0YXBwLmZpeE5hdlRvVG9wKG5hdk9mZnNldCk7XG5cblx0XHRcdC8vIE9uIHdpbmRvdyBzY3JvbGxcblx0XHRcdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGFwcC5maXhOYXZUb1RvcChuYXZPZmZzZXQpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBBdXRvcGxheSB2aWRlbyBvbiBtb3VzZW92ZXJcblx0XHQkKCcudmlkZW9fX2NvbnRhaW5lcicpLm1vdXNlb3ZlcihmdW5jdGlvbihlKSB7XG5cdFx0XHQkKHRoaXMpLmZpbmQoJ3ZpZGVvJylbMF0udm9sdW1lID0gMDtcblx0XHRcdCQodGhpcykuZmluZCgndmlkZW8nKVswXS5wbGF5KCk7XG5cdFx0fSkubW91c2VvdXQoZnVuY3Rpb24oZSkge1xuXHRcdFx0JCh0aGlzKS5maW5kKCd2aWRlbycpWzBdLnBhdXNlKCk7XG5cdFx0fSk7XG5cblx0XHQkKCcudmlkZW9fX2NvbnRhaW5lcicpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0dmFyIHNyYyA9ICQodGhpcykuZmluZCgnc291cmNlJykuYXR0cignc3JjJyk7XG5cdFx0XHRhcHAuYnVpbGRWaWRlb01vZGFsKHNyYyk7XG5cdFx0fSk7XG5cdH0sXG5cblx0bW9kYWxFdmVudEJpbmRpbmdzOiBmdW5jdGlvbigpIHtcblx0XHQkKCcudmlkZW8tbW9kYWxfX2Nsb3NlJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0YXBwLnZpZGVvTW9kYWwuZGVzdHJveSgpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdGZpeE5hdlRvVG9wOiBmdW5jdGlvbihvZmZzZXQpIHtcblx0XHQvLyBGaXggbmF2IHRvIHRvcFxuXHRcdGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBvZmZzZXQpIHtcblx0XHRcdGlmICgkKCcuZml4ZWQtbmF2LS13cmFwcGVyJykuaGFzQ2xhc3MoJ2ZpeGVkLXRvcCcpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoJy5maXhlZC1uYXYtLXdyYXBwZXInKS5hZGRDbGFzcygnZml4ZWQtdG9wJyk7XG5cdFx0XHRcdCQoJy5wYXJ0bmVyLS13cmFwcGVyJykuY3NzKHsgJ21hcmdpbi10b3AnOiAoJCgnLmZpeGVkLW5hdi0td3JhcHBlcicpLmlubmVySGVpZ2h0KCkgLSAyOCkgKyAncHgnIH0pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoJCgnLmZpeGVkLXRvcCcpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0JCgnLmZpeGVkLW5hdi0td3JhcHBlcicpLnJlbW92ZUNsYXNzKCdmaXhlZC10b3AnKTtcblx0XHRcdFx0JCgnLnBhcnRuZXItLXdyYXBwZXInKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRidWlsZFZpZGVvTW9kYWw6IGZ1bmN0aW9uKHNyYykge1xuXHRcdC8vIEJ1aWxkIHZpZGVvIGNvbnRlbnRzXG5cdFx0dmFyICR2aWRlb1dyYXBwZXIgPSAkKCc8ZGl2PicpLFxuXHRcdFx0JHZpZGVvID0gJCgnPHZpZGVvPicpLFxuXHRcdFx0JHZpZGVvQ2xvc2UgPSAkKCc8ZGl2PicpO1xuXG5cdFx0JHZpZGVvV3JhcHBlci5hZGRDbGFzcygndmlkZW8tbW9kYWwtLWlubmVyJyk7XG5cdFx0JHZpZGVvLmFkZENsYXNzKCd2aWRlby1tb2RhbF9fdmlkZW8nKTtcblx0XHQkdmlkZW9DbG9zZS5hZGRDbGFzcygndmlkZW8tbW9kYWxfX2Nsb3NlJyk7XG5cblx0XHQkdmlkZW8uYXR0cih7XG5cdFx0XHRzcmM6IHNyYyxcblx0XHRcdGF1dG9wbGF5OiB0cnVlLFxuXHRcdFx0Y29udHJvbHM6IHRydWVcblx0XHR9KTtcblxuXHRcdCR2aWRlb1dyYXBwZXIuYXBwZW5kKCR2aWRlbykuYXBwZW5kKCR2aWRlb0Nsb3NlKTtcblxuXHRcdGNvbnNvbGUubG9nKCR2aWRlb1dyYXBwZXIpO1xuXG5cdFx0YXBwLnZpZGVvTW9kYWwgPSBuZXcgbW9kYWwoJ3ZpZGVvLW1vZGFsJyk7XG5cdFx0YXBwLnZpZGVvTW9kYWwuaW5pdChhcHAubW9kYWxFdmVudEJpbmRpbmdzLCBhcHApO1xuXG5cdFx0JCgnLm1vZGFsLWlubmVyJykuYXBwZW5kKCR2aWRlb1dyYXBwZXIpO1xuXG5cdFx0YXBwLm1vZGFsRXZlbnRCaW5kaW5ncygpO1xuXHRcdGFwcC52aWRlb01vZGFsLnNob3coKTtcblx0fVxufVxuXG52YXIgcGRmU2xpZGVyID0ge1xuXHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHQvLyBcblx0fVxufVxuXG52YXIgcXVvdGVTbGlkZXIgPSB7XG5cdGluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIFxuXHR9XG59XG5cbiQoZnVuY3Rpb24oKSB7XG5cdGFwcC5pbml0KCk7XG59KTsiLCJ2YXIgbW9kYWxGdWxsc2NyZWVuID0gZnVuY3Rpb24oaWQpIHtcblx0dGhpcy5pZCA9IGlkO1xuXHR0aGlzLiRjb250YWluZXIgPSBudWxsO1xuXHR0aGlzLiRib2R5ID0gJCgnYm9keScpO1xufVxuXG5tb2RhbEZ1bGxzY3JlZW4ucHJvdG90eXBlID0ge1xuXG5cdGNvbnN0cnVjdG9yOiBtb2RhbEZ1bGxzY3JlZW4sXG5cblx0aW5pdDogZnVuY3Rpb24oY2FsbGJhY2ssIGNhbGxiYWNrT2JqKXtcblx0XHR0aGlzLmJ1aWxkKGNhbGxiYWNrLCBjYWxsYmFja09iaik7XG5cdH0sXG5cblx0YnVpbGQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjYWxsYmFja09iail7XG5cdFx0dmFyICRtb2RhbFdyYXBwZXIgPSAkKCc8ZGl2PicpLFxuXHRcdFx0JG1vZGFsSW5uZXIgPSAkKCc8ZGl2PicpO1xuXG5cdFx0JG1vZGFsSW5uZXIuYWRkQ2xhc3MoJ21vZGFsLWlubmVyJyk7XG5cdFx0JG1vZGFsV3JhcHBlci5hZGRDbGFzcygnbW9kYWwtLXdyYXBwZXIgJyArIHRoaXMuaWQpO1xuXHRcdCRtb2RhbFdyYXBwZXIuYXBwZW5kKCRtb2RhbElubmVyKTtcblx0XHR0aGlzLiRib2R5LmFwcGVuZCgkbW9kYWxXcmFwcGVyKTtcblx0XHRcblx0XHR0aGlzLiRjb250YWluZXIgPSAkbW9kYWxXcmFwcGVyO1xuXG5cdFx0Y2FsbGJhY2suYXBwbHkoY2FsbGJhY2tPYmopO1xuXHR9LFxuXG5cdHNob3c6IGZ1bmN0aW9uKCl7XG5cdFx0JCgnLicgKyB0aGlzLmlkKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0dGhpcy4kYm9keS5jc3MoeyAnb3ZlcmZsb3cnOidoaWRkZW4nIH0pO1xuXHR9LFxuXG5cdGhpZGU6IGZ1bmN0aW9uKCl7XG5cdFx0JCgnLicgKyB0aGlzLmlkKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0dGhpcy4kYm9keS5jc3MoeyAnb3ZlcmZsb3cnOid2aXNpYmxlJyB9KTtcblx0fSxcblxuXHRkZXN0cm95OiBmdW5jdGlvbigpe1xuXHRcdCQoJy4nICsgdGhpcy5pZCkucmVtb3ZlKCk7XG5cdFx0dGhpcy4kYm9keS5jc3MoeydvdmVyZmxvdyc6J3Zpc2libGUnfSk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtb2RhbEZ1bGxzY3JlZW47Il19
