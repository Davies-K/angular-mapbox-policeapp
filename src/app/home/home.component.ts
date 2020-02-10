import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  map: mapboxgl.Map;

  constructor() { }

  ngOnInit() {

    mapboxgl.accessToken = environment.mapbox.accessToken;

    


    this.map = new mapboxgl.Map({
  container: 'map',
  center : [ -1.622340, 6.692518],
  zoom :15,
  style: 'mapbox://styles/mapbox/streets-v10',
  pitch: 90,
  bearing: -67.6,
  
});


var geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [ 6.708459,-1.617018]
    },
    properties: {
      title: 'Mapbox',
      description: 'Washington, D.C.'
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [ 6.680091, -1.634781]
    },
    properties: {
      title: 'Mapbox',
      description: 'San Francisco, California'
    }
  }]
};



this.map.addControl(new mapboxgl.FullscreenControl());

this.map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
      enableHighAccuracy: true
  },
  trackUserLocation: true
}));





// Add zoom and rotation controls to the map.
this.map.addControl(new mapboxgl.NavigationControl());

  }

  

}
