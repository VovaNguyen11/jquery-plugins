(function ($) {
    $(document).ready(function () {
        //Generate navigation
        const $navigation = $('<nav class="nav"></nav>');
        const $plugins = $('.plugin');
        $plugins.each(function () {
            const $this = $(this);
            const $href = $this.attr('id');
            const $name = $this.find('.plugin__link').text();
            $navigation.append($(`<a class="nav__item" href="#${$href}">${$name}</a>`));
        });
        $navigation.prependTo($('body'));

        //Magnific Popup
        $('.js-magnific-popup').magnificPopup({
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

        //Isotope
        //Inittialization
        const $isotopeGrid = $('.js-isotope-grid').isotope({
            itemSelector: '.element-item',
            layoutMode: 'fitRows',
            getSortData: {
                name: '.name',
                symbol: '.symbol',
                number: '.number parseInt',
                category: '[data-category]',
                weight: function (itemElem) {
                    const weight = $(itemElem).find('.weight').text();
                    return parseFloat(weight.replace(/[\(\)]/g, ''));
                }
            }
        });

        // filter functions
        const filterFns = {
            // show if name ends with -ium
            ium: function () {
                const name = $(this).find('.name').text();
                return name.match(/ium$/);
            }
        };

        // bind filter button click
        $('.js-isotope-filter').on('click', 'button', function () {
            let filterValue = $(this).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[filterValue] || filterValue;
            $isotopeGrid.isotope({
                filter: filterValue
            });
        });

        // bind sort button click
        $('.js-isotope-sort').on('click', 'button', function () {
            const sortByValue = $(this).attr('data-sort-by');
            $isotopeGrid.isotope({
                sortBy: sortByValue
            });
        });

        // change is-checked class on buttons
        $('.button-group').each(function (i, buttonGroup) {
            const $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'button', function () {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
            });
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