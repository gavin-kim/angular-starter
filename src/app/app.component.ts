/**
 * Router displays each components immediately below the <router-outlet>
 * as users navigate through the app.
 * routerLink triggers navigation to the value
 *
 * This component is called a router component.
 */


import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent {
  title = 'Tour of Heroes';
}
