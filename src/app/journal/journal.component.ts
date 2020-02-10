import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/journal.service'


export interface IActivity {
  id: number
  name: string
  date: Date
  comments?: string
  distance?: number
  gpxData: string
}

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

  activities: IActivity[];
  totalActivities: number
  totalDistance: number
  firstDate: Date

  constructor(private _activityService: ActivityService) { }

  ngOnInit() {
    this.activities = this._activityService.getActivities();
    this.totalActivities = this._activityService.getTotalActivities(this.activities);
    this.totalDistance = this._activityService.getTotalDistance(this.activities);
    this.firstDate = this._activityService.getFirstDate(this.activities);
  }

}
