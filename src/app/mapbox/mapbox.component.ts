import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
// if not using * as, will cause MapboxGeocoder is undefined
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from '../../environments/environment';
import { DATA } from '../../assets/data/ksipolice';

import { Location } from '@angular/common';


import { distance } from '@turf/turf';

@Component({
  selector: 'app-mapbox',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css'],
})
export class MapboxComponent implements OnInit {
  storeData: any;
  map: mapboxgl.Map;
  selectedLink: number;

  constructor(private location: Location) {
  }

  ngOnInit() {
    this.storeData = DATA.features;
    this.selectedLink = null;
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      // center: [-1.622340, 6.692518], // [lng, lat] for Kumasi
      center : [ -0.186964, 5.603717],
      zoom: 12, // starting zoom
      
     
      scrollZoom: true,
    });

    this.map.addControl(new mapboxgl.FullscreenControl());
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
  }));

    
    this.map.on('load', (e) => {
      this.map.addSource('places', {
        type: 'geojson',
        data: DATA,
      });
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        // comment below line will enlarge the range of search result
        // bbox: [-2.378295678835201,5.8838214947290055,-0.43951204520388387,7.48496617313603],
      });
      this.map.addControl(geocoder, 'top-left');
      this.map.addSource('single-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [], // Notice that initially there are no features
        },
      });
      this.map.addLayer({
        id: 'point',
        source: 'single-point',
        type: 'circle',
        
        paint: {
          'circle-radius': 10,
          'circle-color': '#007cbf',
          'circle-stroke-width': 3,
          'circle-stroke-color': '#fff',
        },
      });
      // evt handler when select search result from search bar
      geocoder.on('result', (ev) => {
        const searchResult = ev.result.geometry;
        this.map.getSource('single-point').setData(searchResult);
        this.buildLocationList(searchResult);
        this.sortLonLat(0, searchResult);
        this.createPopUp(this.storeData[0]);
      });
    });

    this.storeData.forEach((marker, index) => {
      const el = document.createElement('div');
      // Add a class called 'marker' to each div
      el.className = 'marker';
      // By default the image for your custom marker will be anchored
      // by its center. Adjust the position accordingly
      // Create the custom markers, set their position, and add to map
      new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(this.map);

      el.addEventListener('click', e => {
        const activeItem = document.getElementsByClassName('active');
        this.flyToStore(marker);
        this.createPopUp(marker);
        e.stopPropagation();
        this.selectedLink = index;
      });
    });

    console.log(this.storeData)
  }

  sortLonLat(storeIdentifier, searchResult) {
    const lats = [
      this.storeData[storeIdentifier].geometry.coordinates[1],
      searchResult.coordinates[1],
    ];
    const lngs = [
      this.storeData[storeIdentifier].geometry.coordinates[0],
      searchResult.coordinates[0],
    ];

    const sortedLngs = lngs.sort(function(a, b){
      if (a > b) { return 1; }
      if (a.distance < b.distance) { return -1; }
      return 0;
    });
    const sortedLats = lats.sort(function(a, b){
      if (a > b) { return 1; }
      if (a.distance < b.distance) { return -1; }
      return 0;
    });

    this.map.fitBounds([
      [sortedLngs[0], sortedLats[0]],
      [sortedLngs[1], sortedLats[1]],
    ], {
      padding: 100,
    });
  }

  buildLocationList(searchResult) {
    // add distance property to store data
    this.storeData.forEach((store) => {
      Object.defineProperty(store.properties, 'distance', {
        value: distance(searchResult, store.geometry),
        writable: true,
        enumerable: true,
        configurable: true
      });
      store.properties['distance'] = this.roundValue(store.properties['distance']);
    });
    // sort the location list
    this.storeData.sort((a, b) => {
      if (a.properties.distance > b.properties.distance) {
        return 1;
      }
      if (a.properties.distance < b.properties.distance) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }

  private roundValue(val) {
    return Math.round(val * 100) / 100;
  }

  flyToStore(currentFeature) {
    this.map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15,
    });
  }

  createPopUp(currentFeature) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    // Check if there is already a popup on the map and if so, remove it
    if (popUps[0]) {
      popUps[0].remove();
    }
    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `<h3>Location</h3><h4>${currentFeature.properties.address}</h4>`
      )
      .addTo(this.map);
  }

  goBack(): void {
    this.location.back();
  }

  moveAndShowInfo(currentFeature, index) {
    this.flyToStore(currentFeature);
    this.createPopUp(currentFeature);
    this.selectedLink = index;
  }

  

}
