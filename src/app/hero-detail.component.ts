import { Component, Input, OnInit } from '@angular/core'; // to define @Component and @Input
import { ActivatedRoute, Params }    from '@angular/router'; // ActivatedRoute
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap'; // import switchMap for Observable

import { Hero } from './hero';
import {HeroService} from './hero.service';



@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [
    './hero-detail.component.css'
  ]
})

export class HeroDetailComponent implements OnInit { // always export the component class to import
  @Input() hero: Hero; // declare hero is input property

  constructor(private heroService: HeroService, // dependency injections
              private route: ActivatedRoute,
              private location: Location) {}

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back(); // use CanDeactivate guard to prevent some issue
  }

  ngOnInit(): void {
    // if a user re-navigates to this component while a getHero request is still
    // processing switchMap cancels the old request and then calls HeroService.getHero() again
    // NOTE: subscriptions are cleaned up when the component is destroyed
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id'])) // maps the parameter to a number using (+)
      .subscribe(hero => this.hero = hero);
  }
}
