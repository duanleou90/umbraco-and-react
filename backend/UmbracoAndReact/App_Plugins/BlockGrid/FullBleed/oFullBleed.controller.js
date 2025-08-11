angular.module("umbraco").controller("oFullBleed", function ($scope, mediaResource) {
    var imageUdi = $scope.block.data.oBackgroundImage;

    if (imageUdi !== undefined) {
        mediaResource.getById(imageUdi).then(function (media) {
            $scope.imageUrl = media.mediaLink;
        });
    }
});