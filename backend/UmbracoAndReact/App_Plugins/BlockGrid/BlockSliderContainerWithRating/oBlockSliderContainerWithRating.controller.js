angular.module("umbraco").controller("oBlockSliderContainerWithRating", function ($scope, $element, $timeout, mediaResource) {
    $timeout(function () {
        $scope.getStarsArray = function (starsCount) {
            return new Array(parseInt(starsCount));
        };
        $scope.block.data.oSlidesWithRating.contentData.forEach(function (blockSlide) {
            mediaResource.getById(blockSlide.oStarLogo).then(function (media) {
                blockSlide.starLogoImage = media.mediaLink;
            });
            mediaResource.getById(blockSlide.oServiceLogo).then(function (media) {
                blockSlide.serviceLogoImage = media.mediaLink;
            });
        });

        $($element.find('.reviews__slider')).slick({
            infinite: true,
            slidesToShow: $element.find('.reviews__slider').data("slides-show"),
            slidesToScroll: 1,
            speed: 1000,
            dots: true,
            prevArrow: '<button type="button" class="reviews__arrow reviews__arrow--prev"><img src="../Content/images/slider-arrow-prev.svg" alt="Prev arrow"></button>',
            nextArrow: '<button type="button" class="reviews__arrow reviews__arrow--next"><img src="../Content/images/slider-arrow-next.svg" alt="Next arrow"></button>',
            responsive: [
                {
                    breakpoint: 993,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
    });
});