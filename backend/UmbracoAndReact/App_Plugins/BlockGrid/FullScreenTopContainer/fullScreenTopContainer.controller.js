angular.module("umbraco").controller("fullScreenTopContainerController", function ($scope, mediaResource) {
    var imageUdi = $scope.block.data.oImageOrVideoDesktop;
    $scope.title = $scope.block.data.oTitle;
    $scope.fontColor = $scope.block.data.oFontColor?.value ?? "ffffff";
    if (imageUdi) {
        mediaResource.getById(imageUdi)
            .then(function(media) {
                $scope.image = media;
            });
    }

    var hexToRgba = function(hex, alpha) {
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
        return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
    };

    $scope.backgroundColor = $scope.block.data.oBackgroundColor
        ? hexToRgba($scope.block.data.oBackgroundColor.value, 0.5)
        : 'rgba(0,0,0,0)';
});