'use strict';

var app = angular.module('oneJointServices', []);

app.factory('GoogleMaps', function() {

  var map_id  = '#map';
  var lat     = 46.87916;
  var lng     = -3.32910;
  var zoom    = 15;
  var map     = initialize(map_id, lat, lng, zoom);

  return map;
});

function initialize(map_id, lat, lng, zoom) {
  var myOptions = {
    zoom : 8,
    center : new google.maps.LatLng(lat, lng),
    mapTypeId : google.maps.MapTypeId.ROADMAP
  };
  return new google.maps.Map($(map_id)[0], myOptions);
}