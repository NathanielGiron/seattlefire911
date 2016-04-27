var url = window.location;
// Will only work if string in href matches with location
$('ul.nav a[href="'+ url +'"]').parent().addClass('active');

// Will also work for relative and absolute hrefs
$('ul.nav a').filter(function() {
    return this.href == url;
}).parent().addClass('active');

//GOOGLE MAP SCRIPT
var map;

$(document).ready(function() {
	$('button.btn-open-map').on('click',function() {

		var latitude = $(this).data('latitude');
		var longitude = $(this).data('longitude');
		var address = $(this).data('address');

		var myLatlng = new google.maps.LatLng(latitude,longitude);

		$('#myModal #myModalLabel').html(address);
	  if (!map) {
	  	console.log("first map")
	  	map = new google.maps.Map(document.getElementById('map'), {
	  		center: {lat: latitude, lng: longitude},
		    zoom: 17
		  });

		setTimeout(function(){
			map.setCenter({lat: latitude, lng: longitude});
		}, 1000);
			// console.log(latitude, longitude, longitude === map.getCenter().lng());
			// console.log(map.getCenter().lat(), map.getCenter().lng());
			// console.log('------');
	  }
	  map.setCenter({lat: latitude, lng: longitude});
		// console.log('yay');
		// console.log(latitude, longitude, latitude === map.getCenter().lat());
		// console.log(map.getCenter().lat(), map.getCenter().lng());
		// console.log('------');

		var marker = new google.maps.Marker({
	    position: myLatlng,
	    title:"Hello World!"
		});

		marker.setMap(map);
	});

	$('#myModal').on('shown.bs.modal',function() {
	  google.maps.event.trigger(map, "resize");
	});

});