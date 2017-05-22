import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [
    './hero-search.component.css'
  ],
  providers: [
    HeroSearchService
  ]
})
export class HeroSearchComponent implements OnInit {
  /**
   * Subject is a producer of an observable event stream
   * searchTerms produces an Observable of strings. Subject is also Observable
   */
  private searchTerms = new Subject<string>();
  heroes: Observable<Hero[]>; // the result of

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router
  ) {}

  /**
   * Push a search term into the observable stream.
   * Each call to search() puts a new string into
   * this subject's observable stream by calling next()
   */
  search(term: string): void {
    this.searchTerms.next(term);
  }

  /**
   * Turns the stream of search terms into a stream of Hero arrays
   * and assign the result to the heroes property.
   *
   * Passing every user keystroke directly to HeroSearchService would create
   * an excessive amount of HTTP requests.
   *
   * Instead, Chaining Observable operators reduces the request flow
   * to the string Observable
   *
   * switchMap: like a flatMap, switches the latest request and
   *            focus on the response only for the request
   *
   * A1: Request  for `ABC`
   * A2: Response for `ABC`
   * B1: Request  for `ABCX`
   * B2: Response for `ABCX`
   *
   * --A1----------A2-->
   * ------B1--B2------>  result: 'ABCX'
   */
  ngOnInit(): void {
    this.heroes = this.searchTerms // Subject<string> is Observable
      .debounceTime(300)        // take the term only key stroke stops more than 300ms
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term ? // switch to new observable each time the term changes
        this.heroSearchService.search(term) : // if search the term (http request) and then returns result (Observable<Hero[]>)
        Observable.of<Hero[]>([]))            // if it's empty, don't make http request and return the observable of empty heroes
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
