angular.module('app').controller('HsTournamentController', ['$scope', function ($scope) {
	$scope.parentObject.currentPage = '/games/hearthstone-tournament';
	
	var LatLng = new google.maps.LatLng(56.954776, 24.133885);

	var myOptions = {
	    zoom: 14,
	    center: LatLng,
	    disableDefaultUI: true,
	    panControl: true,
	    zoomControl: true,
	    scrollwheel: false,
	    zoomControlOptions: {
	        style: google.maps.ZoomControlStyle.DEFAULT
	    },
	    mapTypeControl: true,
	    mapTypeControlOptions: {
	        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
	    },
	    streetViewControl: true,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById('map'), myOptions);
	new google.maps.Marker({
	    position: LatLng,
	    map: map,
	    title: 'UniCon Cafe'
	});
}]);