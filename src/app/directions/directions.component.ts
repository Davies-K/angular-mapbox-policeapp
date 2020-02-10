import { Component,ViewEncapsulation, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// if not using * as, will cause MapboxGeocoder is undefined
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { distance } from '@turf/turf';
export interface Item { driverId: string; Coordinate; }


import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common';
@Component({
  selector: 'directions',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.css']
})
export class DirectionsComponent implements OnInit {

  map: mapboxgl.Map;
  selectedLink: number;
  fireData;
  dt;
  dt_cord;
 
  Valy;

    private itemsCollection: AngularFirestoreCollection<Item>;
  items;

  fireitems: Observable<any[]>;
  firethings;
  fa;

//   map;

//   geolocationPosition;
//   x;
//   y;

   ref = this.db.object('geolocations').valueChanges();
  constructor(private afs: AngularFirestore, private location: Location, private db: AngularFireDatabase) { 

    this.itemsCollection = afs.collection('driversLocation');
    this.items = this.itemsCollection.valueChanges();
    // this.fireitems = db.list('geolocations').valueChanges();
    
    // this.ref.subscribe(action => {

    //   let arr = Object.entries(action).map(e => Object.assign(e[1], { key: e[0] }, ));
    //   var reformattedArray = arr.map(obj => {
    //     var rObj =[obj.latitude, obj.longitude];
    //     // rObj;
    //     return rObj;
        
    //   })

    //   console.log(reformattedArray)

      // snapshotToArray(action).forEach(data => {

      //   if(data.uuid !== 'john'){

      //     console.log(data)

      //   }

      //   else {


      //   }
        
      // })
      // console.log(action.type);
      // console.log(action.key);
      // console.log(action.payload.child)
      // console.log(action.payload.val())
    // });
    
  }

  ngOnInit() {

    
    

    
    this.selectedLink = null;
    mapboxgl.accessToken = environment.mapbox.accessToken;

   
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/navigation-preview-day-v2',
      center : [ -0.186964, 5.603717],
      zoom: 12, // starting zoom
      pitch: 90,
     
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

 

  this.fireData = this.items.subscribe(
    item => {

      item.forEach((marker, index) => {
        const el = document.createElement('div');
        // Add a class called 'marker' to each div
        el.className = 'marker';
        // By default the image for your custom marker will be anchored
        // by its center. Adjust the position accordingly
        // Create the custom markers, set their position, and add to map
       
          
        new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(marker.Coordinate)
        .addTo(this.map);

      el.addEventListener('click', e => {
        const activeItem = document.getElementsByClassName('active');
        this.flyToStore(marker);
        this.createPopUp(marker);
        e.stopPropagation();
        this.selectedLink = index;
      });
    
       
      console.log(marker.Coordinate)
        
      });

      
    
    }
  )
  this.fa = this.ref.subscribe(action => {

    let arr = Object.entries(action).map(e => Object.assign(e[1], { key: e[0] }, ));
    var reformattedArray = arr.map(obj => {
      var rObj =[obj.longitude, obj.latitude];
      // rObj;
      return rObj;
      
    })
    console.log(reformattedArray);
    arr.forEach((marker,index) => {
      const el = document.createElement('div');
      // Add a class called 'marker' to each div
      el.className = 'marker';
      // By default the image for your custom marker will be anchored
      // by its center. Adjust the position accordingly
      // Create the custom markers, set their position, and add to map
     
        
      new mapboxgl.Marker(el, { offset: [0, -23] })
      .setLngLat(marker.reformattedArray)
      .addTo(this.map);
      

      el.addEventListener('click', e => {
        const activeItem = document.getElementsByClassName('active');
        this.flyToStore(marker);
        this.createPopUp(marker);
        e.stopPropagation();
        this.selectedLink = index;
      });

      console.log(marker.reformattedArray)
    

    })

    
    

    
  });

  
  
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

  // getfireData() {
  //   return this.fireData = this.items.subscribe(item => {
  //     this.dt = item;
  //     this.dt_cord = this.dt.map(a => a.Coordinate);
      
  //   })
  // }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};

