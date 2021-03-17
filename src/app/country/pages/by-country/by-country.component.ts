import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [
  ]
})
export class ByCountryComponent{

  term: string = '';
  isError: boolean = false;
  countries: Country[] = [];
  constructor( private countryService: CountryService ) { }


  search( term: string): void{
    this.isError = false;
    this.term = term;
    this.countryService.searchCountry( this.term )
    // tslint:disable-next-line: deprecation
    .subscribe(
      (resp: Country[]) => {
        this.countries = resp;
    },
      (err) => {
        this.isError = true;
        this.countries = [];
      });
  }

  suggestions( term: string){
    this.isError = false;
  }
}
