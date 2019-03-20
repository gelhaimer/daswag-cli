import { Component, OnInit } from '@angular/core';

import {AuthService, User, UserService} from '../../core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private profile: any;

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.loadProfile().then(profile => {
      this.profile = profile;
    });
  }
}
