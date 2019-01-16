(function ($) {
    $(document).ready(function () {
        //Generate navigation
        const $navigation = $('<nav class="nav"></nav>');
        const $plugins = $('.plugin');
        $plugins.each(function () {
            const $this = $(this);
            const $href = $this.attr('id');
            const $name = $this.find('.plugin__link').text();
            // $navigation.append($('<a class="navigation__item" href=#'+href+'>'+name.text()+'</a>'));
            $navigation.append($(`<a class="nav__item" href="#${$href}">${$name}</a>`));
        });
        $navigation.prependTo($('body'));

        //Magnific Popup
        $('.zoom-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-with-zoom',
            gallery: {
                enabled: true
            },

            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function (e) {
                    return e.find('img');
                }
            }
        });

        //AOS
        AOS.init();

        //Smooth Scroll
        // Select all links with hashes
        $('a[href*="#"]')
            // Remove links that don't actually link to anything
            .not('[href="#"]')
            .not('[href="#0"]')
            .click(function (event) {
                // On-page links
                if (
                    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                    location.hostname == this.hostname
                ) {
                    // Figure out element to scroll to
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    // Does a scroll target exist?
                    if (target.length) {
                        // Only prevent default if animation is actually gonna happen
                        event.preventDefault();
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000, function () {
                            // Callback after animation
                            // Must change focus!
                            var $target = $(target);
                            $target.focus();
                            if ($target.is(":focus")) { // Checking if the target was focused
                                return false;
                            } else {
                                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                                $target.focus(); // Set focus again
                            };
                        });
                    }
                }
            });
    })
})(jQuery)