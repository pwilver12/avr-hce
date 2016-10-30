import videoModal from './modules/_video-modal';

$(() => {
	// If media row is on page
	if ($('.media-row').length > 0) {
		videoModal.init();
	}

	// 
});