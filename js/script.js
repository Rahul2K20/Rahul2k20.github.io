$(window).on("load", function() {

	$(".loader .inner").fadeOut(500, function() {
		$(".loader").fadeOut(750);
	});

	$(".items").isotope({
		filter: '*',
		animationOptions: {
			duration: 1500,
			easing: 'linear',
			queue: false
		}
	});
});

$(document).ready(function() {

    // Reveal cards and sections with a fade-up the first time they scroll into view.
    var skillCards = document.querySelectorAll(".skillCard, .reveal");
    if ("IntersectionObserver" in window) {
        var cardObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        skillCards.forEach(function(card) { cardObserver.observe(card); });
    } else {
        skillCards.forEach(function(card) { card.classList.add("visible"); });
    }

    var startDate = new Date(2023, 8, 25);

    var today = new Date();

    var differenceInTime = today.getTime() - startDate.getTime();
    var experienceDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    $(".squareItem .counter").each(function() {
        if ($(this).next("h3").text().includes("Gen AI Experience Days")) {
            $(this).text(experienceDays);
        }
    });

    $('#slides').superslides({
        animation: 'fade',
        play: 5000,
        pagination: false
    });

    var typed = new Typed(".typed", {
        strings: ["AI Engineer.", "Software Developer.", "AWS Certified."],
        typeSpeed: 60,
        loop: true,
        startDelay: 1000,
        showCursor: false
    });

    var statsTopOffset = $(".statsSection").offset().top;
    var countUpFinished = false;

    $(window).scroll(function() {
        if (!countUpFinished && window.pageYOffset > statsTopOffset - $(window).height() + 200) {
            $(".counter").each(function() {
                var element = $(this);
                var endVal = parseInt(element.text());
                element.countup(endVal);
            });

            countUpFinished = true;
        }
    });

    $("#filters a").click(function() {
        $("#filters .current").removeClass("current");
        $(this).addClass("current");

        var selector = $(this).attr("data-filter");

        $(".items").isotope({
            filter: selector,
            animationOptions: {
                duration: 1500,
                easing: 'linear',
                queue: false
            }
        });

        return false;
    });

    $("#navigation li a, .borderBtn.scrollto").click(function(e) {
        e.preventDefault();
        var targetElement = $(this).attr("href");
        var targetPosition = $(targetElement).offset().top;
        $("html, body").animate({ scrollTop: targetPosition - 70 }, "slow");
    });

    $(".navbar-brand").click(function() {
        $("html").animate({ scrollTop: 0 }, "slow");
    });

    const nav = $("#navigation");
    const navTop = nav.offset().top;

    $(window).on("scroll", stickyNavigation);

    function stickyNavigation() {
        var body = $("body");

        if ($(window).scrollTop() >= navTop) {
            body.css("padding-top", nav.outerHeight() + "px");
            body.addClass("fixedNav");
        } else {
            body.css("padding-top", 0);
            body.removeClass("fixedNav");
        }
    }

    // Highlight the nav link for the section currently in view.
    var spySections = ["about", "experience", "skills", "stats", "portfolio"];

    $(window).on("scroll", function() {
        var pos = $(window).scrollTop() + 120;
        var currentId = "";

        spySections.forEach(function(id) {
            var el = $("#" + id);
            if (el.length && el.offset().top <= pos) {
                currentId = id;
            }
        });

        $("#navigation .nav-link").removeClass("active");
        if (currentId) {
            $("#navigation a[href='#" + currentId + "']").addClass("active");
        }
    });

});
