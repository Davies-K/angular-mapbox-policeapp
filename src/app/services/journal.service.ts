import { Injectable } from '@angular/core';

import { SAVED_ACTIVITIES }  from '../shared/activities';

export interface IActivity {
  id: number
  name: string
  date: Date
  comments?: string
  distance?: number
  gpxData: string
}

@Injectable()
export class ActivityService {

  constructor() { }

  getActivities(): IActivity[]{
    return SAVED_ACTIVITIES.slice(0);
  }

  getTotalActivities(allActivities: IActivity[]){
    return allActivities.length;
  }

  getTotalDistance(allActivities: IActivity[]){
    var totalDistance = 0;
    for(var i = 0; i < allActivities.length; i++){
      totalDistance += allActivities[i].distance;
    }
    return totalDistance;
  }

  getFirstDate(allActivities: IActivity[]){
    var earliestDate = new Date("01/01/9999");
    for(var i = 0; i < allActivities.length; i++){
      var currentDate = allActivities[i].date;
      if(currentDate < earliestDate){
        earliestDate = currentDate;
      }
    }
    return earliestDate;
  }







}
