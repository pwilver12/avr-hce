const videoModal = {
	init() {
		videoModal.eventBindings();
	},

	eventBindings() {
		const app = this;

		// On video cta click or poster image click
		$('.media-row__cta, .media-row__poster-wrapper').click((e) => {
			e.preventDefault();
			const $target = $(e.currentTarget);
			const modalTarget = $target.data('modal');
			const modalVideo = $(modalTarget).find('video')[0];

			// Reload and start modal video
			modalVideo.load();
			modalVideo.play();

			// Show video modal
			app.showVideoModal($(modalTarget));
		});

		$('.popup-modal__close').click((e) => {
			e.preventDefault();

			const $videoModal = $(e.target).closest('.popup-modal');
			const modalVideo = $videoModal.find('video')[0];

			// Pause video
			modalVideo.pause();

			// Hide video modal
			app.hideVideoModal($videoModal);
		});
	},

	showVideoModal($modal) {
		$modal.toggleClass('active');
		$('body').css({
			'overflow': 'hidden'
		});
	},

	hideVideoModal($modal) {
		$modal.toggleClass('active');
		$('body').css({
			'overflow': 'visible'
		});
	}
}

export default {
	init: videoModal.init
}