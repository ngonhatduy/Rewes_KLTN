//adapded from this example http://code.google.com/apis/maps/documentation/javascript/overlays.html#CustomOverlays

TxtOverlay.prototype = new google.maps.OverlayView();

//text overlays' constructor
function TxtOverlay(pos, txt, id, cls, map) {
	// Now initialize all properties.
	this.pos = pos;
    this.txt_ = txt;
    this.id_ = id;
	this.cls_ = cls;
	this.map_ = map;

	// We define a property to hold the image's
	// div. We'll actually create this div
	// upon receipt of the add() method so we'll
	// leave it null for now.
	this.div_ = null;

	// Explicitly call setMap() on this overlay
	this.setMap(map);
}

TxtOverlay.prototype.onAdd = function() {
	// Note: an overlay's receipt of onAdd() indicates that
	// the map's panes are now available for attaching
	// the overlay to the map via the DOM.

	// Create the DIV and set some basic attributes.
	var div = document.createElement('DIV');
    div.className = this.cls_;
    div.id = this.id_;
	div.innerHTML = this.txt_;

	// Set the overlay's div_ property to this DIV
	this.div_ = div;
	var overlayProjection = this.getProjection();
	var position = overlayProjection.fromLatLngToDivPixel(this.pos);
	div.style.left = position.x + 'px';
	div.style.top = position.y + 'px';
	// We add an overlay to a map via one of the map's panes.

	var panes = this.getPanes();
	panes.floatPane.appendChild(div);
}

TxtOverlay.prototype.draw = function() {
	var overlayProjection = this.getProjection();

	// Retrieve the southwest and northeast coordinates of this overlay
	// in latlngs and convert them to pixels coordinates.
	// We'll use these coordinates to resize the DIV.
	var position = overlayProjection.fromLatLngToDivPixel(this.pos);

	var div = this.div_;
	div.style.left = position.x + 'px';
	div.style.top = position.y + 'px';
}

// Detach the map from the DOM via toggleDOM().
// Note that if we later reattach the map, it will be visible again,
// because the containing <div> is recreated in the overlay's onAdd() method.
TxtOverlay.prototype.toggleDOM = function() {
	if (this.getMap()) {
		this.setMap(null);
	} else {
		this.setMap(this.map_);
	}
}

//Set map and maker
var map;
function initMap() {
    // set position map
	var latlng = new google.maps.LatLng(10.762639, 106.682027); 
	var myOptions = {
		zoom: 17,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map"), myOptions);
	
	//Set maker for position
	var marker = new google.maps.Marker({ 
		position: latlng,
		map: map,
	});
	
	// Display data
    new TxtOverlay(latlng, "", "markerTextBox", "customBox", map);
}

google.maps.event.addDomListener(window, 'load', initMap);