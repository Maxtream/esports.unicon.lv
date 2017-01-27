angular.module('app', ['ngRoute', 'ngAnimate'])
.constant('LINKS', [
		{url: '/', value: 'Home', controller: 'HomeController'},
		{url: 'https://discord.gg/011uwa9mciv82pvmS', value: 'Our Discord Chat', external: true },
		/*{url: false, value: 'Upcoming events', subLinks: [
			{url: '/games/hearthstone-tournament', value: 'Hearthstone December Tournament', controller: 'HsTournamentController'}
			{url: '/games/hearthstone-gathering', value: 'Hearthstone November Fireside Gathering', controller: 'HsGatheringController'}
		]},*/
		{url: '/unicon-2016', value: 'UniCon 2016', controller: 'Uni16Controller', subLinks: [
			{url: '/unicon-2016/games/counterstrike', value: 'CS:GO', controller: 'Uni16CsController'},
			{url: '/unicon-2016/games/overwatch', value: 'Overwatch', controller: 'Uni16OwController'},
			{url: '/unicon-2016/games/hearthstone', value: 'Hearthstone', controller: 'Uni16HsController'}
		]},
		{url: 'http://www.unicon.lv', value: 'UniCon.Lv', external: true}
])
.config(['$routeProvider', '$locationProvider', 'LINKS', function($routeProvider, $locationProvider, LINKS) {
	var file = '';
	
	angular.forEach(LINKS, function(value, key) {
		//Checking if this is activeable link
		//If controller exists
		//If this is not external link
		if (value.url !== false && value.controller && !value.external) {
			//Changing slash to minus, for files to load properly
			file = value.url.replace(/\//g, '-').substring(1);

			//Home URL, exception
			if (value.url == '/') {
				file = 'home';
			}

			//Adding to router
			$routeProvider.when(value.url, {
				templateUrl: 'app/pages/' + file + '/view.html',
				controller: value.controller
			});
		}

		//Sublinks
		if (value.subLinks) {
			angular.forEach(value.subLinks, function(subValue, subKey) {
				//Changing slash to minus, for files to load properly
				file = subValue.url.replace(/\//g, '-').substring(1);

				//Adding to router
				$routeProvider.when(subValue.url, {
					templateUrl: 'app/pages/' + file + '/view.html',
					controller: subValue.controller
				});
			});
		}
	});
	$routeProvider.otherwise({ redirectTo: '/' });
	
	//Enabling html5 mode to not use hashtag
	$locationProvider.html5Mode(true);
}]);

//Scroll fix, on changing location we just hitting page up
angular.module('app').run(['$rootScope', '$anchorScroll', function($rootScope, $anchorScroll) {
	$rootScope.$on('$routeChangeSuccess', function() {
		$anchorScroll();
	});
}]);