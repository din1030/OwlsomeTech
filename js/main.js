$(document).ready(function() {
	var lazyLoadInstance = new LazyLoad({
		elements_selector: ".lazy"
		// ... more custom settings?
	});

	var typed1, typed2;
	// 物連網 particles
	particlesJS.load("particles-overlay", "./js/particle.json", function() {
		// console.log('callback - particles.js config loaded');
		typed1 = new Typed('.typed1', {
			// stringsElement: '#typed-strings'
			strings: ['為每一個領域的專家提供資料解決方案'],
			typeSpeed: 50,
			startDelay: 1000,
		});
		typed2 = new Typed('.typed2', {
			// stringsElement: '#typed-strings'
			strings: ['We provide AI solution for experts in all industry'],
			typeSpeed: 30,
			startDelay: 1000,
		});
	});

	var waiting = false;
	// header ＆ 進場動畫
	$(window).scroll(function(event) {
		if (waiting) {
			return;
		}
		waiting = true;
		scrollAnimations();
		setTimeout(function() {
			waiting = false;
		}, 200);
	});

	var winWidth = $(window).width();
	var $header = $('header');
	var headerHeight = $header.height();
	var $logoWord = $('#logo-word');

	var scrollAnimations = function() {
		if (winWidth > 767) {
			var y = $(window).scrollTop();
			if (y >= headerHeight) {
				$header.addClass('scrolling');
				$logoWord.fadeOut();
			} else {
				$header.removeClass('scrolling');
				$logoWord.fadeIn();
			}
		} else {
			$header.removeClass('scrolling');
		}

		if ($('#vision-scroll-target').visible(true)) {
			$('#vision-scroll-target .scale-enter-ele').addClass('scale-enter');
		}

		if ($('.animation-wrapper').eq(0).visible(true)) {
			$('.animation-wrapper:nth-child(1) .scale-enter-ele').addClass('scale-enter');
		}
		//
		// if ($('.animation-wrapper').eq(1).visible(true)) {
		// 	$('.animation-wrapper:nth-child(2) .scale-enter-ele').addClass('scale-enter');
		// 	$('.animation-wrapper:nth-child(2) .left-enter-ele').addClass('left-enter');
		// }
		//
		// if ($('.animation-wrapper').eq(2).visible(true)) {
		// 	$('.animation-wrapper:nth-child(3) .scale-enter-ele').addClass('scale-enter');
		// }

		if ($('#product-block').visible(true)) {
			$('#product-block .scale-enter-ele').addClass('scale-enter');
			$('#product-block .left-enter-ele').addClass('left-enter');
		}

		if ($('#team-block').visible(true)) {
			$('#team-block .scale-enter-ele').addClass('scale-enter');
		}

		if ($('#join-block').visible(true)) {
			$('#join-block .scale-enter-ele').addClass('scale-enter');
		}

		if ($('footer').visible(true)) {
			$('footer .bottom-enter-ele').addClass('bottom-enter');
		}
	}

	// mobile menu icon animation
	$('#menu-trigger').click(function() {
		$(this).toggleClass('open');
	});
	$('#mobile-menu').click(function() {
		$('#menu-trigger').removeClass('open');
	});

	// 區塊連結都用捲動的
	$('.scroll-link').click(function(event) {
		event.preventDefault();
		var target = $(this).attr('href');
		var top = $(target).position().top - 64;
		$(document).scrollTo(top, 800);
	});

	// slider setting
	var mySwiper = new Swiper('#main-slider', {
		// loop: true,
		speed: 1200,
		autoplay: {
			delay: 5000,
		},
		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
	mySwiper.on('slideChange', function() {
		console.log(mySwiper.realIndex);
		if (mySwiper.realIndex == 0) {
			typed1.reset(true);
			typed2.reset(true);
			typed1 = new Typed('.typed1', {
				strings: ['為每一個領域的專家提供資料解決方案'],
				typeSpeed: 50,
				startDelay: 1000,
			});
			typed2 = new Typed('.typed2', {
				strings: ['We provide AI solution for experts in all industry'],
				typeSpeed: 30,
				startDelay: 1000,
			});
		} else {
			// if (typed1) {
			// 	typed1.destroy();
			// 	typed2.destroy();
			// }
			$('.typed1, .typed2').empty();
			$('.typed-cursor').remove();
		}
	});
	// mySwiper.on('slideChangeTransitionEnd', function() {
	// 	console.log(mySwiper.activeIndex);
	// 	if (mySwiper.activeIndex == 1 || mySwiper.activeIndex == 4) {
	//
	// 		var typed1 = new Typed('.typed1', {
	// 			// stringsElement: '#typed-strings'
	// 			strings: ['為每一個領域的專家提供資料解決方案'],
	// 			typeSpeed: 50,
	// 			startDelay: 1000,
	// 		});
	// 		var typed2 = new Typed('.typed2', {
	// 			// stringsElement: '#typed-strings'
	// 			strings: ['We provide AI solution for experts in all industry'],
	// 			typeSpeed: 30,
	// 			startDelay: 1000,
	// 		});
	// 	}
	// });
	// parallax setting
	var images = [
		'../img/svg/stage1.svg',
		'../img/svg/stage2.svg',
		'../img/svg/stage3.svg'
	];
	// TweenMax can tween any property of any object. We use this object to cycle through the array
	var obj = {
		curImg: 0
	};
	var content = [
		"<div class='scale-enter-ele scale-enter-fast'>我們致力於打造完善的<br>資料科學應用方案</div>",
		"<div class='stage2 scale-enter-ele scale-enter-fast'>\
		<div class='mb-2'>讓每個領域的專家<br class='d-none d-md-block'>都能輕鬆運用</div>\
		<div class='mb-1'><img src='img/svg/s2-1.svg' alt='' />&emsp;數據的力量&emsp;</div>\
		<div class='mb-1'><img src='img/svg/s2-2.svg' alt='' />&emsp;改善既有效率</div>\
		<div class='mb-1'><img src='img/svg/s2-3.svg' alt='' />&emsp;挖掘創新價值</div></div>",
		"<div class='scale-enter-ele scale-enter-fast'>以資料為燃料<br>打造下一個改變世界的引擎</div>"
	];

	var prevImg;
	// create tween
	var tween = TweenMax.to(obj, 1, {
		curImg: images.length - 1, // animate propery curImg to number of images
		roundProps: "curImg", // only integers so it can be used as an array index
		immediateRender: true, // load first image automatically
		ease: Linear.easeNone, // show every image the same ammount of time
		onUpdate: function() {
			if (prevImg != obj.curImg) {
				$("#animation img").attr("src", images[obj.curImg]); // set the image source
				$(".parallax-text").html(content[obj.curImg]);
				prevImg = obj.curImg;
			}
		}
	});
	// init controller
	var controller = new ScrollMagic.Controller();

	// create a scene
	var scene = new ScrollMagic.Scene({
			triggerElement: '#animation-trigger',
			duration: 1000, // the scene should last for a scroll distance of 100px
			triggerHook: 0.01
		})
		.setTween(tween)
		.setPin("#animation")
		//.addIndicators() // add indicators (requires plugin)
		.addTo(controller);

	// our team hover change pics
	var originalSrc, srcset, no, $teamPic;
	var hoverPhoto = [
		'roger-hover@2x.png',
		'ken-hover@2x.png',
		'demi-hover@2x.png',
		'yoge-hover@2x.png',
		'owl-hover@2x.png'
	];
	$('.photo-wrapper').mouseenter(function(event) {
		no = $(this).data('no');
		$teamPic = $(this).find('img').eq(0);
		originalSrc = $teamPic.attr('src');
		$teamPic.attr('src', 'img/team/' + hoverPhoto[no]);
		srcset = $teamPic.attr('srcset');
		srcset = srcset.replace('@2x', '-hover@2x');
		srcset = srcset.replace('@3x', '-hover@3x');
		$teamPic.attr('srcset', srcset);
	});
	$('.photo-wrapper').mouseleave(function(event) {
		$teamPic.attr('src', originalSrc);
		srcset = srcset.replace('-hover@2x', '@2x');
		srcset = srcset.replace('-hover@3x', '@3x');
		$teamPic.attr('srcset', srcset);
	});

	// 右下 contact us
	var options = {
		line: "//owlsometech.gogodin-studio.com/img/svg/qrcode.svg", // Line QR code URL
		email: "service@owlsome.tech", // Email
		call_to_action: "Contact Us", // Call to action
		button_color: "#55D6D2", // Color of button
		position: "right", // Position may be 'right' or 'left'
		order: "line,email", // Order of buttons
	};
	var proto = document.location.protocol,
		host = "whatshelp.io",
		url = proto + "//static." + host;
	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.async = true;
	s.src = url + '/widget-send-button/js/init.js';
	s.onload = function() {
		WhWidgetSendButton.init(host, proto, options);
	};
	var x = document.getElementsByTagName('script')[0];
	x.parentNode.insertBefore(s, x);
});

// 判斷元件是否出現在 viewport
(function($) {
	/**
	 * Copyright 2012, Digital Fusion
	 * Licensed under the MIT license.
	 * http://teamdf.com/jquery-plugins/license/
	 *
	 * @author Sam Sehnert
	 * @desc A small plugin that checks whether elements are within
	 *     the user visible viewport of a web browser.
	 *     only accounts for vertical position, not horizontal.
	 */

	$.fn.visible = function(partial) {

		var $t = $(this),
			$w = $(window),
			viewTop = $w.scrollTop(),
			viewBottom = viewTop + $w.height(),
			_top = $t.offset().top,
			_bottom = _top + $t.height(),
			compareTop = partial === true ? _bottom : _top,
			compareBottom = partial === true ? _top : _bottom;

		return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

	};

})(jQuery);