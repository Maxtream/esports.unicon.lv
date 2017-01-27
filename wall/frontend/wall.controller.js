angular.module('app')
.controller('WallController', ['$scope', '$http', '$interval', '$timeout', 'apiUrl', function ($scope, $http, $interval, $timeout, apiUrl) {
	$scope.promo = true;
	$scope.previous_id = 0;
	$scope.tweets = [];

	//Promo
	$timeout(function() {
		$scope.swapScreen(true);
	}, 120000);

	$interval(function() {
		$scope.getTweets();
	}, 15000);

	$interval(function() {
		$scope.getTweets();
	}, 7500);

	$scope.swapScreen = function(boolean) {
		if ($scope.promo === true) {
			$scope.promo = false;
		}
		else {
			$scope.promo = true;
		}

		$timeout(function() {
			$scope.swapScreen(boolean === true ? false : true);
		}, boolean === true ? 15000 : 120000);
	}

	$scope.getTweets = function() {
		$http.get(apiUrl + '&previous_id=' + $scope.previous_id ).then(function(response) {
			if (response.data.delete_id != 0) {
				$scope.removeTweet(response.data.delete_id);
			}

			if (response.data.count == 0) {
				return false;
			}

			if ($scope.previous_id === 0) {
				$scope.tweets = response.data.tweets;
				$scope.previous_id = response.data.previous_id;

				if (response.data.delete_id != 0) {
					$scope.removeTweet(response.data.delete_id);
				}

				$scope.promo = false;

				return false;
			}

			$scope.previous_id = response.data.previous_id;

			$scope.tweets.splice(response.data.limit - response.data.count, response.data.count);
			
			angular.forEach(response.data.tweets, function(value, key) {
				$scope.tweets.unshift(value);
			});
		});
	};

	$scope.getInstagrams = function() {
		$http.get(apiUrl + '&previous_id=' + $scope.previous_id ).then(function(response) {
			if (response.data.delete_id != 0) {
				$scope.removeTweet(response.data.delete_id);
			}

			if (response.data.count == 0) {
				return false;
			}

			if ($scope.previous_id === 0) {
				$scope.tweets = response.data.tweets;
				$scope.previous_id = response.data.previous_id;

				if (response.data.delete_id != 0) {
					$scope.removeTweet(response.data.delete_id);
				}

				$scope.promo = false;

				return false;
			}

			$scope.previous_id = response.data.previous_id;

			$scope.tweets.splice(response.data.limit - response.data.count, response.data.count);
			
			angular.forEach(response.data.tweets, function(value, key) {
				$scope.tweets.unshift(value);
			});
		});
	};

	$scope.removeTweet = function(id) {
		angular.forEach($scope.tweets, function(value, key) {
			if (value.id == id) {
				$scope.tweets[key].user_image = 'blank';
				$scope.tweets[key].image_url = 'blank';
				$scope.tweets[key].text = 'Removed';
			}
		});
	}

	$scope.getTweets();
	$scope.getInstagrams();
}]);