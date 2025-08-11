angular.module("umbraco").controller("tableBlockController", function ($scope, $sce) {
    $scope.value = angular.copy($scope.block.data.oskiTable); 
    $scope.showBorders = $scope.block.data.oShowBorders;
    $scope.borderColor = $scope.block.data.oBorderColor.value;
    $scope.headerColor = $scope.block.data.oheaderColor.value;
    $scope.bodyColor = $scope.block.data.obodyColor.value;

    $scope.$watch('block.data.oskiTable', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.value = angular.copy(newVal); 

            if ($scope.value && $scope.value.cells) {
                $scope.value.cells.forEach(function (row) {
                    row.forEach(function (cell) {
                        if (typeof cell.value === 'string') {
                            cell.originalValue = cell.value;
                            cell.value = $sce.trustAsHtml(cell.value);
                        } else {
                            console.warn("Unexpected value type for cell:", cell.value);
                        }
                    });
                });
            }
        }
    }, true);
    $scope.getCellStyle = function () {
        return {
            'border': $scope.showBorders ? '1px solid #' + $scope.borderColor : 'none',
            'background-color': '#' + $scope.bodyColor
        };
    };

    $scope.getHeaderCellStyle = function () {
        return {
            'border': $scope.showBorders ? '1px solid #' + $scope.borderColor : 'none',
            'background-color': '#' + $scope.headerColor
        };
    };
});
