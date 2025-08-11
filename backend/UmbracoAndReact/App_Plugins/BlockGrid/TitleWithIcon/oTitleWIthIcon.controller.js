angular.module("umbraco").controller("oTitleWithIconController", function ($scope, mediaResource) {
    var imageUdi = $scope.item.oIcon;
    mediaResource.getById(imageUdi).then(function (media) {
        $scope.imageUrl = media.mediaLink;
    });
});