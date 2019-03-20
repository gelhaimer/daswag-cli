import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, ReplaySubject, of, Observable} from 'rxjs';

import { User } from '../models';
import { distinctUntilChanged } from 'rxjs/operators';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser: Observable<User>;

  constructor (
    private http: HttpClient,
  ) {
    this.currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

}
