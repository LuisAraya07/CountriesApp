import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styles: [
    `
    li{
      cursor: pointer;
    }
    `
  ]
})
export class SuggestionsComponent{

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSearchSuggestion: EventEmitter<string> = new EventEmitter();
  @Input() showSuggestions: boolean = false;
  @Input() suggestionsCountries: Country[] = [];
  @Input() term: string = '';
  @Input() isCountry: boolean = false;
 
  constructor() { }

  searchSuggestion( term:string  ){
    this.onSearchSuggestion.emit( term );
  }

}
