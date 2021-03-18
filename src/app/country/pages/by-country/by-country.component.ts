import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { tap } from 'rxjs/operators';

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
  suggestionsCountries: Country[] = [];
  showSuggestions: boolean = false;

  constructor( private countryService: CountryService ) { }


  search( term: string): void{
    this.showSuggestions = false;
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
    this.term = term;
    this.showSuggestions = true;
    this.countryService.searchCountry( term )
    .pipe(
      tap(console.log)
    )
      .subscribe(countries => {
        this.suggestionsCountries = countries.splice(0, 5);
      })
  }

  searchSuggestion( term: string ){
    this.search( term );
  }
}
