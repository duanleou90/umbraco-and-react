angular.module("umbraco").controller("oWhatAreWeDoingContainer", function ($scope, mediaResource) {
    $scope.block.data.oContent.contentData.forEach(function(item) {
        mediaResource.getById(item.oIcon).then(function (media) {
            item.resolvedMediaUrl = media.mediaLink;
        });
    });
});