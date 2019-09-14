import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/core/api/http.service';
import { IHttpResponse } from '../../core/api/interfaces/IHttpResponse';
import { IProperty } from '../../business/properties/interfaces/IProperty';
import { PropertyService } from 'src/app/business/properties/services/property.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public properties: Array<IProperty>;
  private propertiesSub: Subscription;
  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.propertyService
      .getAllProperties()
      .then((properties: Array<IProperty>) => {
        this.properties = properties;
      })
      .catch(err => {
        console.log(err);
      });

    this.propertiesSub = this.propertyService
      .getPostUpdateListener()
      .subscribe((properties: Array<IProperty>) => {
        this.properties = properties;
      });
  }

  ngOnDestroy() {
    this.propertiesSub.unsubscribe();
  }
}
