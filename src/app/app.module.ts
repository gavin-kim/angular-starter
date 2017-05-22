/**
 * Root module that tells Angular how to assemble the application.
 *
 * -NgModule: decorator function that takes a single metadata object.
 * --properties:
 * ---declarations: the view classes (components, directives and pipes) that belong to this module
 * ---exports: the subset of declaration that should be visible and usable in the component templates of other modules
 * ---imports: other modules are needed by components templates in this module
 * ---providers: creators of services; they become accessible in all parts of the app
 * ---bootstrap: the main application view, called the root component. Only the root module should set bootstrap property
 */

import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }        from './app.component';
import { HeroesComponent }     from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { DashboardComponent }  from './dashboard.component';

import { HeroService } from './hero.service';
import {HeroSearchComponent} from './hero-search.component';
// asdf
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,     // to use [(ngModel)]
    HttpModule,      // angular additional http module
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule // custom routing module
  ],
  declarations: [ // components must be declared in a module before other components can reference it
    AppComponent, // Angular will recognize tags
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  providers: [ // provide singleton instances, available to all components of the app
    HeroService
  ],
  bootstrap:    [
    AppComponent  // root
  ]
})
export class AppModule { }


