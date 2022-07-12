import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CountriesActions, CountryActions } from 'src/app/store/actions';
import * as fromCountries from 'src/app/store/reducers';
import { Country } from 'src/app/models/country';
import { Region } from 'src/app/models/region';

@Component({
  selector: 'app-countries-container',
  templateUrl: './countries-container.component.html',
  styleUrls: ['./countries-container.component.scss']
})

export class CountriesContainerComponent implements OnInit {

  constructor(private store: Store) {
    this.regions$ = store.select(fromCountries.selectRegions);
  }

  regions$: Observable<Region[]>;
  countries$!: Observable<Country[]>;
  currentCountry$!: Observable<Country>;
  countryCurrencies$!: Observable<string[]>;
  currentOption: string = '';

  getCurrentOption(option: string) {
    if (option !== 'Asia' && option !== 'Europe' && option !== '') {
      this.getCountryDetails(option);
      this.getCurrencies();
    }
    else {
      this.getAllCountries(option);
    }
    this.currentOption = option;
  };

  getAllCountries(region: string) {
    this.store.dispatch(CountriesActions.getCountries({ region }));
    this.countries$ = this.store.select(fromCountries.selectCountries);
  };

  getCountryDetails(name: string) {
    this.store.dispatch(CountryActions.getCountry({ name }));
    this.currentCountry$ = this.store.select(fromCountries.selectSelectedCountry);
  };

  getCurrencies() {
    this.store.dispatch(CountryActions.getCountryCurrencies());
    this.countryCurrencies$ = this.store.select(fromCountries.selectCountryCurrencies);
  }
  getCurrent(option:any) {
    debugger;
    this.currentCountry$ = this.store.select(fromCountries.selectSelectedCountry);
    if (option !== 'Asia' && option !== 'Europe' && option !== '') {
      this.getCountryDetails(option);
      this.getCurrencies();
    }
    else {
      this.getAllCountries(option);
    }
    this.currentOption = option;
  }

  ngOnInit(): void {
  }
}
