(function ($) {
    $(document).ready(function () {
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
                opener: function(e) {
                    return e.find('img');
                }
            }
          });
    })
})(jQuery)