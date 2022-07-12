import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { CountriesEffects } from './store/countries.effects';
import { reducers } from './store/reducers';
import { AppComponent } from './app.component';
import { CountriesContainerComponent } from './components/countries-container/countries-container.component';
import { CountriesSelectComponent } from './components/countries-select/countries-select.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryDetailsComponent,
    CountriesContainerComponent,
    CountriesSelectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        // strictStateImmutability and strictActionImmutability are enabled by default
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    !environment.production ? StoreDevtoolsModule.instrument({
      name: 'NgRx Demo App',
      maxAge: 25, logOnly: environment.production
    }) : [],

    EffectsModule.forRoot([CountriesEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
