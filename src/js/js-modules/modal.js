var modalFullscreen = function(id) {
	this.id = id;
	this.$container = null;
	this.$body = $('body');
}

modalFullscreen.prototype = {

	constructor: modalFullscreen,

	init: function(callback, callbackObj){
		this.build(callback, callbackObj);
	},

	build: function(callback, callbackObj){
		var $modalWrapper = $('<div>'),
			$modalInner = $('<div>');

		$modalInner.addClass('modal-inner');
		$modalWrapper.addClass('modal--wrapper ' + this.id);
		$modalWrapper.append($modalInner);
		this.$body.append($modalWrapper);
		
		this.$container = $modalWrapper;

		callback.apply(callbackObj);
	},

	show: function(){
		$('.' + this.id).addClass('active');
		this.$body.css({ 'overflow':'hidden' });
	},

	hide: function(){
		$('.' + this.id).removeClass('active');
		this.$body.css({ 'overflow':'visible' });
	},

	destroy: function(){
		$('.' + this.id).remove();
		this.$body.css({'overflow':'visible'});
	}
}

module.exports = modalFullscreen;