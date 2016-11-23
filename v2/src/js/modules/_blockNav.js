export default {
	init() {
		if (document.getElementsByClassName('block-nav').length) {
			this.setActiveNavItem();
			this.checkStatus();
			let e = $(window).width();
			$(window).resize(() => {
				if (e !== $(window).width()) {
					e = $(window).width();
					this.checkStatus();
				}
			});
		}
	},
	isMobile: !1,
	toggleIsMobile() {
		this.isMobile = !this.isMobile;
	},
	mobileBindings() {
		$('.block-nav__burger-wrapper').click((e) => {
			$('.block-nav__links-list').toggleClass('open');
		});
	},
	resetNav() {
		$('.block-nav__links-list').removeClass('open');
	},
	removeMobileBindings() {
		$('.block-nav__burger-wrapper').unbind();
	},
	checkStatus() {
		if ($(window).width() > 767) {
			if (this.isMobile) {
				this.resetNav();
				this.removeMobileBindings();
				this.toggleIsMobile();
			}
		} else {
			if (!this.isMobile) {
				this.mobileBindings();
				this.toggleIsMobile();
			}
			this.resetNav();
		}
	},
	setActiveNavItem() {
		const blockNavLinks = document.getElementsByClassName('block-nav__link');
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
