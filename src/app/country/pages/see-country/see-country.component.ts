import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-see-country',
  templateUrl: './see-country.component.html',
  styles: [
  ]
})
export class SeeCountryComponent implements OnInit {


  country!: Country;
  // Antes de que se inicialice el component
  constructor( private activatedRoute: ActivatedRoute,
               private countryService: CountryService) { }

  // despues de que se inicializo
  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(

        // tslint:disable-next-line: max-line-length
        // por medio del pipe recibe el id y de una vez busca el country con el id, en el siguiente suscribe ya se obtiene el observable del country
        // recibe un observable y retorna otro observable
        switchMap( ( { id } ) => this.countryService.getCountry( id )),

        //Recibe lo que devuelve en el switchMap y lo imprime
        tap(console.log)


      )
      .subscribe( country => this.country = country);


    // this.activatedRoute.params
    // .subscribe( ({ id }) => {
    //   this.countryService.getCountry( id )
    //     .subscribe( country => {
    //       console.log(country);
    //     });
    // });
  }

}
