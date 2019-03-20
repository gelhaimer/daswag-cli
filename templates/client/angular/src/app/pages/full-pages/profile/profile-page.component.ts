import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../core/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  profile: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.loadProfile().then(profile => {
      this.profile = profile;
    });
  }
}
