! function($) {
  var defaults = {
    openButton: "Menu",
    closeButton: "Close",
    animationSpeed: 80,
    animation: "fadeInUp"
  };
  $.fn.fullpageMenu = function(options) {
    var settings = $.extend({}, defaults, options),
      el = $(this),
      fired = false;
    $("body").addClass("fm-body")
    el.addClass("work-menu")
    el.find("nav").addClass("menu-nav");
    $.fn.closeMenu = function() {
      if (fired == false) {
        fired = true;
        if ($("body").hasClass("menu-active")) {
          $(".menu-nav.active > a").hide();
          $(".work-menu").removeClass("menu-animated")
          $("body").removeClass("menu-active")
          fired = false;
        }
      }
    }
    $.fn.openMenu = function() {
      if (!$("body").hasClass("menu-active")) {
        if (fired == false) {
          fired = true;
          $(".work-menu").addClass("menu-animated")
          $(".menu-overlay").fadeIn("fast", function() {
            $("body").addClass("menu-active")
            var animations = []
            $(".menu-nav.active > a").each(function() {
              animations.push({
                time: settings.animationSpeed,
                step: "animated " + settings.animation,
                selector: this,
              });
            });
            var timeline = 0;
            for (var i = 0; i < animations.length; i++) {
              timeline = parseInt(animations[i].time, 10) + parseInt(timeline, 10);
              runAnimation(i, timeline, animations);
            }
            fired = false;
          });
        }
      } else {
        el.closeMenu();
      }
    }
    if ($(".menu-overlay").length < 1) {
      $("<div class='menu-overlay fm-scrollable'></div>").hide().prependTo("body")
      var menu = $('.work-menu').clone()
      $('.work-menu').remove();
      $('.menu-overlay').html(menu);
    }


    function runAnimation(i, timeline, animations) {
      setTimeout(function() {
        if (animations[i].remove) {
          if (animations[i].hide == true) {
            $(animations[i].selector).removeClass(animations[i].remove).addClass(animations[i].step).on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
              $(this).hide()
            });
          } else {
            $(animations[i].selector).removeClass(animations[i].remove).addClass(animations[i].step).show();
          }
        } else {
          if (animations[i].hide == true) {
            $(animations[i].selector).addClass(animations[i].step).one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
              $(this).hide()
            });
          } else {
            $(animations[i].selector).addClass(animations[i].step).show()
          }
        }
      }, timeline);
    }
  }
}(window.jQuery);

$(document).ready(function() {
	$(".works").fullpageMenu();
	$("#open-menu").click(function() {
		$(".works").openMenu();
		return false;
	});
	$("#close-menu").click(function() {
		$(".works").closeMenu();
		return false;
	});

	//$(".header").headroom();
	/*$(".footer").headroom({
		classes: {
			// when element is initialised
			initial: "footroom",
			// when scrolling up
			pinned: "footroom--pinned",
			// when scrolling down
			unpinned: "footroom--unpinned",
			// when above offset
			top: "footroom--top",
			// when below offset
			notTop: "footroom--not-top"
		},
	});*/
});


var video = document.getElementById('video'),
    fraction = 0.8;

//window.addEventListener('scroll', checkScroll, false);
//window.addEventListener('resize', checkScroll, false);

//one time at the beginning, in case it starts in view
//checkScroll();

//as soon as we know the video dimensions
//video.addEventListener('loadedmetadata', checkScroll, false);