// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
	// Create hamburger menu button
	const nav = document.querySelector('nav');
	const navContainer = document.querySelector('.nav-container');
	const navMenu = document.querySelector('nav ul');

	// Create hamburger button
	const hamburger = document.createElement('button');
	hamburger.className = 'hamburger';
	hamburger.setAttribute('aria-label', 'Toggle navigation menu');
	hamburger.setAttribute('aria-expanded', 'false');
	hamburger.innerHTML = `
		<span class="hamburger-line"></span>
		<span class="hamburger-line"></span>
		<span class="hamburger-line"></span>
	`;

	// Insert hamburger after logo
	const logo = document.querySelector('.logo-main');
	logo.parentNode.insertBefore(hamburger, logo.nextSibling);

	// Toggle menu on hamburger click
	hamburger.addEventListener('click', function() {
		const isOpen = navMenu.classList.toggle('nav-open');
		hamburger.classList.toggle('active');
		hamburger.setAttribute('aria-expanded', isOpen);

		// Prevent body scroll when menu is open
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});

	// Close menu when clicking on a link
	const navLinks = navMenu.querySelectorAll('a');
	navLinks.forEach(link => {
		link.addEventListener('click', function() {
			navMenu.classList.remove('nav-open');
			hamburger.classList.remove('active');
			hamburger.setAttribute('aria-expanded', 'false');
			document.body.style.overflow = '';
		});
	});

	// Close menu when clicking outside
	document.addEventListener('click', function(event) {
		const isClickInsideNav = nav.contains(event.target);
		const isOpen = navMenu.classList.contains('nav-open');

		if (!isClickInsideNav && isOpen) {
			navMenu.classList.remove('nav-open');
			hamburger.classList.remove('active');
			hamburger.setAttribute('aria-expanded', 'false');
			document.body.style.overflow = '';
		}
	});

	// Handle window resize
	window.addEventListener('resize', function() {
		if (window.innerWidth > 768) {
			navMenu.classList.remove('nav-open');
			hamburger.classList.remove('active');
			hamburger.setAttribute('aria-expanded', 'false');
			document.body.style.overflow = '';
		}
	});
});
