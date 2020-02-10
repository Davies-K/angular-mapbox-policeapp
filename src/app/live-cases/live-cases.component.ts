import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
// if not using * as, will cause MapboxGeocoder is undefined
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from '../../environments/environment';
import { DATA } from '../../assets/data/sweetgreen';
import { distance } from '@turf/turf';

import { Location } from '@angular/common';

@Component({
  selector: 'app-live-cases',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './live-cases.component.html',
  styleUrls: ['./live-cases.component.css']
})
export class LiveCasesComponent implements OnInit {
  storeData: any;
  map: mapboxgl.Map;
  selectedLink: number;

  constructor(private location: Location) { }

  ngOnInit() {

    this.storeData = DATA.features;
    this.selectedLink = null;
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-77.034084, 38.909671], // [lng, lat]
      zoom: 12, // starting zoom
      
    });

    this.map.addControl(new mapboxgl.FullscreenControl());

    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
  }));

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

    
  }

  

  flyToStore(currentFeature) {
    this.map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 18,
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
        `<h3>${currentFeature.properties.address}</h3><p>${currentFeature.properties.city}</p>`
      )
      .addTo(this.map);
  }

  moveAndShowInfo(currentFeature, index) {
    this.flyToStore(currentFeature);
    this.createPopUp(currentFeature);
    this.selectedLink = index;
  }

  goBack(): void {
    this.location.back();
  }


}
