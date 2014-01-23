            var map,
                currentPosition,
                directionsDisplay, 
                directionsService;

            function initialize(lat, lon)
            {
                directionsDisplay = new google.maps.DirectionsRenderer(); 
                directionsService = new google.maps.DirectionsService();

                currentPosition = new google.maps.LatLng(lat, lon);

                map = new google.maps.Map(document.getElementById('map_canvas'), {
                   zoom: 15,
                   center: currentPosition,
                   mapTypeId: google.maps.MapTypeId.ROADMAP
                 });

                directionsDisplay.setMap(map);

                 var currentPositionMarker = new google.maps.Marker({
                    position: currentPosition,
                    map: map,
                    title: "Current position"
                });

                var infowindow = new google.maps.InfoWindow();
                google.maps.event.addListener(currentPositionMarker, 'click', function() {
                    infowindow.setContent("Current position: latitude: " + lat +" longitude: " + lon);
                    infowindow.open(map, currentPositionMarker);
                });
            }

            function locError(error) {
                // initialize map with a static predefined latitude, longitude
               initialize(59.3426606750, 18.0736160278);
            }

            function locSuccess(position) {
                initialize(59.3426606750, 18.0736160278);
                initialize(position.coords.latitude, position.coords.longitude);
            }

            function calculateRoute() {
               console.log("inside calculateRoute function");
                var targetDestination = $("#target-dest").val();
                if (currentPosition && currentPosition != '' && targetDestination && targetDestination != '') {
                    var request = {
                        origin:currentPosition, 
                        destination:targetDestination,
                        travelMode: google.maps.DirectionsTravelMode["DRIVING"]
                    };

                    directionsService.route(request, function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setPanel(document.getElementById("directions"));
                            directionsDisplay.setDirections(response); 

                            /*
                                var myRoute = response.routes[0].legs[0];
                                for (var i = 0; i < myRoute.steps.length; i++) {
                                    alert(myRoute.steps[i].instructions);
                                }
                            */
                            $("#results").show();
                        }
                        else {
                            $("#results").hide();
                        }
                    });
                }
                else {
                    $("#results").hide();
                }
            }
            
                 // PhoneGap is ready
             function onDeviceReady() {
                  console.log("Ready");
                  $(document).ready(function(){
                     $( document ).bind( "mobileinit", function() {
                           $.mobile.allowCrossDomainPages = true;
                     });
                     $(document).on("pagebeforeshow", function() {
                           navigator.geolocation.getCurrentPosition(locSuccess, locError);
                     });
                   $(document).on('click', '#directions-button', function(e){
                      e.preventDefault();
                      console.log("click");
                     calculateRoute();
                     });
                  }
               }
            document.addEventListener("deviceready", onDeviceReady, false);

            
