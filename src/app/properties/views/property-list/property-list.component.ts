import { Component, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertyService } from 'src/app/properties/services/property.service';
import { IProperty } from 'src/app/properties/interfaces/IProperty';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit, OnDestroy {
  public searchFocus: boolean = false;
  public pageTitle: string = 'Your Properties';
  public isLoading: boolean;
  public filteredProperties: Array<IProperty>;
  public properties: Array<IProperty>;
  private propertiesSub: Subscription;
  constructor(private propertyService: PropertyService) {}
  @ViewChild('searchBar', { static: true }) searchBar;

  ngOnInit() {
    this.isLoading = true;
    this.propertyService
      .getAllProperties()
      .then((properties: Array<IProperty>) => {
        this.properties = properties;
        this.filteredProperties = properties;
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
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

  public setSearchFocus(active: boolean) {
    this.searchFocus = active;
  }

  public searchProperties(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.searchBar.nativeElement.value = '';
      this.searchBar.nativeElement.blur();
    }
    const filteredProps = this.properties.filter(property => {
      return property.name
        .toLowerCase()
        .includes((event.target as HTMLInputElement).value.toLowerCase());
    });
    console.log(filteredProps);

    this.filteredProperties = filteredProps;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.searchBar.nativeElement.focus();
  }
}