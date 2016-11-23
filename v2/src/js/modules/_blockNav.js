export default () => {
	const blockNavLinks = document.getElementsByClassName('block-nav__link');

	if (blockNavLinks.length) {
		const pageLocation = document.location.pathname;
		for (let i = 0; i < blockNavLinks.length; i++) {
			const el = blockNavLinks[i],
				elClasses = el.className,
				elHref = el.getAttribute('href') || 'false';
			if (pageLocation.indexOf(elHref) > -1) {
				el.className = elClasses ? `${elClasses} active` : 'active';
				break;
			}
		}
	}
}
