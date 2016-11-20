import videoModal from './modules/_videoModal';
import blockNav from './modules/_blockNav';

$(() => {
	// If video media row is on page
	if ($('.media-row--video').length > 0) {
		videoModal.init();
	}

	blockNav();
});
