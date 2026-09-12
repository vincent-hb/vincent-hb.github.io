/*
	Read Only by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
(function($) {

	skel.init({
		reset: 'full',
		breakpoints: {
			global: { href: 'css/style.css', containers: '45em', grid: { gutters: ['2em', 0] } },
			xlarge: { media: '(max-width: 1680px)', href: 'css/style-xlarge.css' },
			large: { media: '(max-width: 1280px)', href: 'css/style-large.css', containers: '42em', grid: { gutters: ['1.5em', 0] }, viewport: { scalable: false } },
			medium: { media: '(max-width: 1024px)', href: 'css/style-medium.css', containers: '85%!' },
			small: { media: '(max-width: 736px)', href: 'css/style-small.css', containers: '90%!', grid: { gutters: ['1.25em', 0] } },
			xsmall: { media: '(max-width: 480px)', href: 'css/style-xsmall.css' }
		},
		plugins: {
			layers: {
				config: {
					mode: 'transform'
				},
				titleBar: {
					breakpoints: 'medium',
					width: '100%',
					height: 44,
					position: 'top-left',
					side: 'top',
					html: '<span class="toggle" data-action="toggleLayer" data-args="sidePanel"></span><span class="title" data-action="copyText" data-args="logo"></span>'
				},
				sidePanel: {
					breakpoints: 'medium',
					hidden: true,
					width: { small: 275, medium: '20em' },
					height: '100%',
					animation: 'pushX',
					position: 'top-left',
					side: 'left',
					orientation: 'vertical',
					clickToHide: true,
					html: '<div data-action="moveElement" data-args="header"></div>'
				}
			}
		}
	});

	$(function() {

		var $body = $('body'),
			$header = $('#header'),
			$nav = $('#nav'), $nav_a = $nav.find('a'),
			$wrapper = $('#wrapper');

		// Forms (IE<10).
			var $form = $('form');
			if ($form.length > 0) {

				$form.find('.form-button-submit')
					.on('click', function() {
						$(this).parents('form').submit();
						return false;
					});

				if (skel.vars.IEVersion < 10) {
					$.fn.n33_formerize=function(){var _fakes=new Array(),_form = $(this);_form.find('input[type=text],textarea').each(function() { var e = $(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = $(this); var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = $(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = $(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { $(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); $(this).find('select').val($('option:first').val()); $(this).find('input,textarea').each(function() { var e = $(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
					$form.n33_formerize();
				}

			}

		// Header.

			// Set up nav items.
				$nav_a
					.scrolly(1000, 20)
					.on('click', function(event) {

						var $this = $(this),
							href = $this.attr('href');

						// Not an internal link? Bail.
							if (href.charAt(0) != '#')
								return;

						// Prevent default behavior.
							event.preventDefault();

						// Remove the active class from the links in this list only, so that
						// picking a section in the sub-nav does not clear the active state of
						// the page link above it. The spy below then keeps it in step as the
						// smooth scroll runs.
							$this.closest('ul').find('a').removeClass('active');

						// Set active class on this link.
							$this.addClass('active');

					});

			// Track which section of the current page is on screen, and mark its
			// link in the sub-nav.
			//
			// This does not use scrollzer, which the template applied to whole
			// <section> elements: it treats each target's own height as the band
			// in which that target counts as current. Our targets are headings, so
			// that band is only one line tall and -- offset by scrollzer's pad --
			// sits above the heading, leaving most of the page matching nothing.
			// Measuring from one heading to the next is what we actually want.
				var $window = $(window),
					$sub_a = $nav.find('.subnav a'),
					sections = [];

				$sub_a.each(function() {

					var $this = $(this),
						$target = $(document.getElementById($this.attr('href').substring(1)));

					if ($target.length > 0)
						sections.push({ link: $this, target: $target });

				});

				if (sections.length > 0) {

					var syncSubnav = function() {

						var top = $window.scrollTop(),
							// A heading counts as current once it reaches just below
							// the top of the viewport. Keep this small: any section
							// shorter than the offset would be skipped over, and it
							// only has to clear the 20px that scrolly leaves above a
							// heading it has just jumped to.
							line = top + 80,
							current = null,
							i;

						// The last heading above the line wins. Nothing is marked
						// until the first heading is reached.
							for (i = 0; i < sections.length; i++)
								if (sections[i].target.offset().top <= line)
									current = sections[i];

						// Once the page bottom is reached there is nothing left to
						// scroll, so the last heading may never reach the line --
						// on every one of these pages the content below it is
						// shorter than a viewport. Give it the bottom of the page.
							if (top + $window.height() >= $(document).height() - 2)
								current = sections[sections.length - 1];

						$sub_a.removeClass('active');

						if (current)
							current.link.addClass('active');

					};

					// Also on load: at DOM-ready the banner and figures have no
					// height yet, so the headings measure too high up the page.
						$window.on('scroll resize load', syncSubnav);
						syncSubnav();

					// The sidebar is a fixed, scrolling column. On a short window the
					// section list can sit past its bottom edge, where the rows are
					// unreachable -- or worse, half-cut and awkward to even hover. If
					// that is the case, scroll the column so the whole list shows.
						var revealSubnav = function() {

							var $list = $sub_a.first().closest('.subnav'),
								overflow = $list[0].offsetTop + $list.outerHeight() - $header.height();

							if (overflow > 0)
								$header.scrollTop(overflow + 12);

						};

						$window.on('load', revealSubnav);
						revealSubnav();

				}

	});

})(jQuery);