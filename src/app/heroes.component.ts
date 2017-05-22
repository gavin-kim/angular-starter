/**
 * Defiles the same AppComponent as the one in the QuickStart playground.
 * It's the root component of what will become a tree of nested components
 * as the application evolves
 *
 * {{}}: interpolation (one-way data binding)
 * [(ngModel)]="variable" (two-way data binding)
 * [class.selected]="hero === selectedHero" if it's true add the class or not remove it
 *
 * for dependency injection, providers in @Component and constructor with private property
 *
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';


@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [
    './heroes.component.css'
  ]
})

// : declare, = init
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;


  constructor(
    private router: Router,
    private heroService: HeroService
  ) { } // for dependency injection

  add(name: string): void {
    name = name.trim();
    if (!name) return;
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  getHeroes(): void {
    /** register a callback */
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero)
          this.selectedHero = null;
      });
  }

  ngOnInit(): void { // event method
    this.getHeroes();
  }
}
