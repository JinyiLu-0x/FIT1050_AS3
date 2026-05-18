/*
	Alpha by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			wide:      ( '1281px',  '1680px' ),
			normal:    ( '981px',   '1280px' ),
			narrow:    ( '737px',   '980px'  ),
			narrower:  ( '737px',   '840px'  ),
			mobile:    ( '481px',   '736px'  ),
			mobilep:   ( null,      '480px'  )
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right'
		});

	// NavPanel.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Header.
		if (!browser.mobile
		&&	$header.hasClass('alt')
		&&	$banner.length > 0) {

			$window.on('load', function() {

				$banner.scrollex({
					bottom:		$header.outerHeight(),
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt reveal'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			});

		}

	// Photo gallery section
	// The auto-scrolling effect is adapted from reference code.
	// https://www.w3schools.com/howto/howto_css_image_gallery_scroll.asp
	// https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval
	// https://stackoverflow.com/questions/25685486/how-to-show-webkit-scrollbar-which-has-been-hidden-using-displaynone-css-proper

	(function() {

			var collectionWindow = document.getElementById('collection-window');
			var collectionTrack = document.querySelector('.collection-track');
			var collectionItems = document.querySelectorAll('.collection-item');
			var collectionModal = document.getElementById('collection-modal');
			var collectionModalImage = document.getElementById('collection-modal-image');
			var collectionModalClose = document.getElementById('collection-modal-close');
			var pauseCollection = false;

			if (collectionWindow && collectionTrack) {
				collectionWindow.addEventListener('mouseenter', function() {
					pauseCollection = true;
				});

				collectionWindow.addEventListener('mouseleave', function() {
					pauseCollection = false;
				});

				/* Auto-scroll function */
				window.setInterval(function() {
					if (pauseCollection)
						return;

					collectionWindow.scrollLeft += 1;

					if (collectionWindow.scrollLeft >= collectionWindow.scrollWidth - collectionWindow.clientWidth)
						collectionWindow.scrollLeft = 0;
				}, 30);
			}

			if (collectionItems.length === 0 || !collectionModal || !collectionModalImage || !collectionModalClose)
				return;

			// Click event for each collection item to open the modal
			collectionItems.forEach(function(item) {
				item.addEventListener('click', function() {
					var clickedImage = item.querySelector('img');

					if (!clickedImage)
						return;

					collectionModalImage.src = clickedImage.src;
					collectionModalImage.alt = clickedImage.alt;
					collectionModal.classList.add('is-visible');
					collectionModal.setAttribute('aria-hidden', 'false');
				});
			});

			collectionModalClose.addEventListener('click', function() {
				collectionModal.classList.remove('is-visible');
				collectionModal.setAttribute('aria-hidden', 'true');
			});

			collectionModal.addEventListener('click', function(event) {
				if (!event.target.closest('.collection-modal-inner')) {
					collectionModal.classList.remove('is-visible');
					collectionModal.setAttribute('aria-hidden', 'true');
				}
			});

		})();


})(jQuery);