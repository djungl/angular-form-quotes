'use strict'

exnessTestApp.directive('exnessSelect', ['$document','$timeout', function ($document, $timeout) {

	return {
		restrict: 'AEC',
		require: 'ngModel',
		scope: {
			list: '='
		},
		templateUrl: 'views/exness-select.html',
		link: function(scope, element, attr, ctrl) {
		
			scope.expanded = false;
			scope.selection = "";
			scope.options = [];
			scope.element = element;

			// init dropdown
			if (scope.list) {
				scope.selection = scope.list.default;
				scope.options = scope.list.list;
			}

			// update model
			ctrl.$setViewValue(scope.selection);

			scope.expand = function () {
				scope.expanded = !scope.expanded;
			}

			scope.select_option = function (option) {
				scope.selection = option;
				scope.$parent.expanded = false;
				ctrl.$setViewValue(option);
			}

			scope.selected = function (option) {
				return option === scope.selection;
			}

			scope.closeDropdownOnOutClick = function (e) {
					
				var clickedElement = e.target,
					clickedElementParent = clickedElement.parentNode,
					scopeElement =  scope.element[0],
					closingNotNeeded = !scope.expanded || !clickedElement || clickedElement == scopeElement;

				if (closingNotNeeded) {
					return;
				}

				while (clickedElementParent && clickedElementParent != scopeElement) {
					clickedElementParent = clickedElementParent.parentNode;
				}

				if (clickedElementParent == scopeElement) {
					return;
				}

				// Scope element is not parent of clicked element, 
				// need to close dropdown
				e.stopPropagation();
				scope.expanded = false;
				scope.$apply();		
			}

			scope.closeDropdownOnEsc = function (e) {
				if (e.keyCode == 27) {
					scope.expanded = false;
					scope.$apply();
				}
			}

			$document.on('click', scope.closeDropdownOnOutClick);

			$document.on('touchend', scope.closeDropdownOnOutClick);

			// Close dropdown on ESC
			$document.on('keydown', scope.closeDropdownOnEsc);
		
		}
	};
}]);
