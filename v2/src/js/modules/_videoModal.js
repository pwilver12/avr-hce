const videoModal = {
  init() {
    // If video media row is on page
    if ($('.media-row--video').length > 0) {
      videoModal.eventBindings();
    }
  },

  eventBindings() {
    const app = this;

    // On video cta click or poster image click
    $('.media-row [data-video=true]').click((e) => {
      e.preventDefault();

      const $target = $(e.currentTarget);
      const $modalTarget = $target.closest('.media-row').find('.media-row__video-modal');
      const modalVideo = $modalTarget.find('video')[0];

      // Reload and start modal video
      modalVideo.load();
      modalVideo.play();

      // Show video modal
      app.showVideoModal($modalTarget);
    });

    $('.popup-modal__close').click((e) => {
      e.preventDefault();

      const $modal = $(e.target).closest('.media-row__video-modal');
      const modalVideo = $modal.find('video')[0];

      // Pause video
      modalVideo.pause();

      // Hide video modal
      app.hideVideoModal($modal);
    });
  },

  showVideoModal($modal) {
    $modal.toggleClass('active');
    $('body').css({
      overflow: 'hidden'
    });
  },

  hideVideoModal($modal) {
    $modal.toggleClass('active');
    $('body').css({
      overflow: 'visible'
    });
  }
};

export default {
  init: videoModal.init
};
