angular.module("umbraco").controller("oHeroController", function ($scope, mediaResource) {
    $scope.block.data.mediaLinks = [];

    $scope.block.data.oGroupOfPictures.split(',').forEach(function (item) {
        mediaResource.getById(item).then(function (media) {
            $scope.block.data.mediaLinks.push(media.mediaLink);
        });
    });
});
