import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
  styles: [
  ]
})
export class ByCapitalComponent{

  term: string = '';
  isError: boolean = false;
  countries: Country[] = [];
  suggestionsCountries: Country[] = [];
  showSuggestions: boolean = false;
  constructor( private countryService: CountryService ) { }


  search( term: string): void{
    this.isError = false;
    this.term = term;
    this.countryService.searchCapital( this.term )
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
    this.countryService.searchCapital( term )
      .subscribe(countries => {
        this.suggestionsCountries = countries.splice(0, 5);
      })
  }

  searchSuggestion( term: string ){
    this.search( term );
  }

}
