import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styles: [
  ]
})
export class CountryInputComponent implements OnInit{

  
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Input() placeholder: string = '';
  // Observable especial
  debouncer: Subject<string> = new Subject();

  term: string = '';
  constructor() { }


  ngOnInit(): void {
    this.debouncer
    .pipe(
      // milesimas de segundo, se envia 300ms despues de no tocar ninguna tecla
      debounceTime(300)
    )
    .subscribe( value => {
      this.onDebounce.emit( value );
    })
  }

  


  search(): void {
    this.onEnter.emit( this.term );
  }


  pressKey( ){
    this.debouncer.next( this.term );
  }
}
