export default () => {
	const $blockNavLinks = $('.block-nav__link');

	if ($blockNavLinks.length) {
		const pageLocation = document.location.pathname;
		$blockNavLinks.map((i, el) => {
			const elAttrHref = el.getAttribute('href');
			if (elAttrHref.indexOf(pageLocation) > -1) {
				$(el).addClass('active');
			}
		});
	}
}
