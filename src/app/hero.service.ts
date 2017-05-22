import { Injectable } from '@angular/core';
import { Headers, Http }       from '@angular/http';

/**
 * Angular Http service returns RxJS Observable of HTTP Response objects.
 * It is a powerful way to manage asynchronous data flows.
 * Basically Angular Observable doesn't have a toPromise function.
 * To use the toPromise function, you need to import RxJS library.
 *
 */
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

/**
 * Http returns Observable to HeroService
 * HeroService converts Observable into Promise and return Promise object
 */
@Injectable() // to inject other dependencies into this service
export class HeroService {

  private serverUrl = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getHero(id: number): Promise<Hero> {
    const url = `${this.serverUrl}/${id}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  /** Asynchronous service: return promise when it resolves */
  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.serverUrl)
      .toPromise() // Observable type to Promise type
      .then(response => response.json().data as Hero[]) // response JSON has a single data property, which hold the array of heroes
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.serverUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }


  update(hero: Hero): Promise<Hero> {
    const url = `${this.serverUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
