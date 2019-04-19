(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
    },

    $WIN = $(window);

    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* Preloader
    * -------------------------------------------------- */
    var clPreloader = function() {
        
        $("html").addClass('cl-preload');

        $WIN.on('load', function() {

            //force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(100).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('cl-preload');
            $("html").addClass('cl-loaded');
        
        });
    };


   /* Menu on Scrolldown
    * ------------------------------------------------------ */
    var clMenuOnScrolldown = function() {
        
        var menuTrigger = $('.header-menu-toggle');

        $WIN.on('scroll', function() {
            if ($WIN.scrollTop() > 350) {
                menuTrigger.addClass('opaque');
            } else {
                menuTrigger.removeClass('opaque');
            }
        });
    };


   /* OffCanvas Menu
    * ------------------------------------------------------ */
    var clOffCanvas = function() {

        var menuTrigger     = $('.header-menu-toggle'),
            nav             = $('.header-nav'),
            closeButton     = nav.find('.header-nav__close'),
            siteBody        = $('body'),
            mainContents    = $('section, footer');

        // open-close menu by clicking on the menu icon
        menuTrigger.on('click', function(e){
            e.preventDefault();
            // menuTrigger.toggleClass('is-clicked');
            siteBody.toggleClass('menu-is-open');
        });

        // close menu by clicking the close button
        closeButton.on('click', function(e){
            e.preventDefault();
            menuTrigger.trigger('click');	
        });

        // close menu clicking outside the menu itself
        siteBody.on('click', function(e){
            if( !$(e.target).is('.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span') ) {
                // menuTrigger.removeClass('is-clicked');
                siteBody.removeClass('menu-is-open');
            }
        });

    };


   /* Smooth Scrolling
    * ------------------------------------------------------ */
    var clSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
            
                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };

   /* Alert Boxes
    * ------------------------------------------------------ */
    var clAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };


   /* Animate On Scroll
    * ------------------------------------------------------ */
    var clAOS = function() {
        AOS.init( {
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });
    };


   /* Back to Top -------------------------------------------------------- */
    var clBackToTop = function() {
        
        var pxShow  = 500,         // height on which the button will show
        fadeInTime  = 400,         // how slow/fast you want the button to show
        fadeOutTime = 400,         // how slow/fast you want the button to hide
        scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
        goTopButton = $(".go-top")
        
        // Show or hide the sticky footer button
        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                goTopButton.fadeIn(fadeInTime);
            } else {
                goTopButton.fadeOut(fadeOutTime);
            }
        });
    };

	
	/* Show Nav on Scroll up --------------------------------------------- */
	var clShowNavL = function () {
		var prevScrollpos = window.pageYOffset;
		window.onscroll = function() {
			var currentScrollPos = window.pageYOffset;
			if (prevScrollpos > currentScrollPos) {
				document.getElementById("navbar").style.top = "0px";
			} else {
				document.getElementById("navbar").style.top = "-100px";
			}
			prevScrollpos = currentScrollPos;
		}
	};
	
	/* Clean URL -------------------------------------------------------- */
	var clCleanURL = function() {
		// smoothscrolling without markup changes - handle links with @href started with '#' only
		$(document).on('click', 'a[href^="#"]', function(e) {
			// target element id
			var id = $(this).attr('href');
			// target element
			var $id = $(id);
			if ($id.length === 0) {
				return;
			}
			// prevent standard hash navigation (avoid blinking in IE)
			e.preventDefault();
			// top position relative to the document
			var pos = $id.offset().top;
			// animated top scrolling
			$('body, html').animate({scrollTop: pos});
		});
	};

	   /* Contact Form
    * ------------------------------------------------------ */
   var clContactForm = function() {
        
	$('#contactForm').validate({

		submitHandler: function(form) {

			var sLoader = $('.submit-loader');

			$.ajax({

				// type: "POST",
				// url: "inc/sendEmail.php",
				// data: $(form).serialize(),
				// beforeSend: function() { 
				// 	sLoader.slideDown("slow");
				// },
				success: function(msg) {
					// Message was sent
					if (msg == 'OK') {
						sLoader.slideUp("slow"); 
						$('.message-warning').fadeOut();
						$('#contactForm').fadeOut();
						$('.message-success').fadeIn();
					}
					// There was an error
					else {
						sLoader.slideUp("slow"); 
						$('.message-warning').html(msg);
						$('.message-warning').slideDown("slow");
					}
				},
				error: function() {
					sLoader.slideUp("slow"); 
					$('.message-warning').html("Something went wrong. Please try again.");
					$('.message-warning').slideDown("slow");
				}
			});
		}
	});
};

   /* Initialize ------------------------------------------------------ */
    (function ssInit() {
        clPreloader();
        clMenuOnScrolldown();
        clOffCanvas();
        clSmoothScroll();
        clAlertBoxes();
        clAOS();
        clBackToTop();
        clShowNavL();
		clCleanURL();
		clContactForm();
    })();
        
})(jQuery);