$(document).ready(function() {

	// 區塊連結都用捲動的
	$('.scroll-link').click(function(event) {
		event.preventDefault();
		var target = $(this).attr('href');
		var top = $(target).position().top - 120;
		console.log(top);
		$(document).scrollTo(top, 800);
	});

	// slider setting
	var mySwiper = new Swiper('#main-slider', {
		loop: true,
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
		"我們致力於打造完善的<br>資料科學應用方案",
		"讓每個領域的專家<br>都能輕鬆運用",
		"以資料為燃料<br>打造下一個改變世界的引擎"
	];

	// create tween
	var tween = TweenMax.to(obj, 1, {
		curImg: images.length - 1, // animate propery curImg to number of images
		roundProps: "curImg", // only integers so it can be used as an array index
		// repeat: 3, // repeat 3 times
		immediateRender: true, // load first image automatically
		ease: Linear.easeNone, // show every image the same ammount of time
		onUpdate: function() {
			$("#scroll-animation img").attr("src", images[obj.curImg]); // set the image source
			$("#parallax-text").html(content[obj.curImg]);
		}
	});
	// init controller
	var controller = new ScrollMagic.Controller();

	// create a scene
	var scene = new ScrollMagic.Scene({
			triggerElement: '#animation-trigger',
			duration: 1000, // the scene should last for a scroll distance of 100px
			triggerHook: 0.05
		})
		.setTween(tween)
		.setPin("#animation-wrapper")
		.addIndicators() // add indicators (requires plugin)
		.addTo(controller);

	// our team hover change pics
	var originalSrc, $teamPic;
	var hoverPhoto = [
		'roger-hover.png',
		'ken-hover.png',
		'owl-hover.svg',
		'owl-hover.svg'
	];
	$('.photo-wrapper').mouseenter(function(event) {
		var no = $(this).data('no') - 1;
		$teamPic = $(this).find('img').eq(0);
		originalSrc = $teamPic.attr('src');
		$teamPic.attr('src', 'img/team/' + hoverPhoto[no]);
	});
	$('.photo-wrapper').mouseleave(function(event) {
		$teamPic.attr('src', originalSrc);
	});

	particlesJS.load("particles-overlay", "./js/particle.json", function() {
		console.log('callback - particles.js config loaded');
	});

	$(window).scroll(function(event) {
		if (!$('#float-line').hasClass('animate') && $('#join-block').visible) {
			$('#float-line').addClass('animate');
		}
		if ($('#scroll-down-target').visible) {
			$('#scroll-down-target > *').addClass('anima-animate-enter54');
		}
		var y = $(window).scrollTop();
		if (y >= $('header').height()) {
			$('header').addClass('scrolling');
		} else {
			$('header').removeClass('scrolling');
		}
	});

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