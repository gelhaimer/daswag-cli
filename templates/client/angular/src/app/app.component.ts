import { Component, OnInit } from '@angular/core';
import {AuthService, Logger} from "./core";
import {NavigationEnd, Router} from "@angular/router";

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {

  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
