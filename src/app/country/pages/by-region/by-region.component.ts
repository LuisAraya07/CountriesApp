import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [
    `
    button{
      margin-right: 2.5px;
    }
    
    `
  ]
})
export class ByRegionComponent{
  regions: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  countries: Country[] = [];
  activeRegion: string = '';
  isLoading: boolean = false;
  constructor(private countryService: CountryService) { }


  getClassCSS( region: string ){
    return (region === this.activeRegion) ? 'btn btn-primary' : 'btn btn-outline-primary';
  }

  // tslint:disable-next-line: typedef
  activateRegion( region: string ) {
    if(region === this.activeRegion){return;}
    this.isLoading = true;
    this.countries = [];
    this.activeRegion = region;
    this.countryService.searchRegion( this.activeRegion )
    // tslint:disable-next-line: deprecation
    .subscribe(
      (resp: Country[]) => {
        setTimeout(() => {
          this.countries = resp;
          this.isLoading = false;
        }, 300);
    });
  }
}
