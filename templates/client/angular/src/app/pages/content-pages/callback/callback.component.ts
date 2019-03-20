import { Component } from '@angular/core';
import {AuthService} from "../../../core/auth";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent {

  constructor(private authService: AuthService) {
    this.authService.handleAuthentication();
    this.authService.scheduleRenewal();
  }
}
