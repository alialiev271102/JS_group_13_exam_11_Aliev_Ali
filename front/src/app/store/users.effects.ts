import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {
  loginUserFail,
  loginUserRequest,
  loginUserSuccess, logoutUser, logoutUserRequest,
  registerUserFail,
  registerUserRequest,
  registerUserSuccess
} from './users.actions';
import { map, mergeMap, NEVER, tap, withLatestFrom } from 'rxjs';
import { HelperService } from '../services/helper.service';
import { AppState } from './type';
import { Store } from '@ngrx/store';

@Injectable()
export class UsersEffects {
  constructor(
    private actions: Actions,
    private usersService: UserService,
    private router: Router,
    private helper: HelperService,
    private store: Store<AppState>
  ) {
  }
  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUserRequest),
    mergeMap(({userData}) => this.usersService.registerUser(userData).pipe(
      map(user => registerUserSuccess({user})),
      tap(() => {
        this.helper.openSnackbar('Register successful');
        void this.router.navigate(['/']);
      }),
      this.helper.catchServerError(registerUserFail)
    ))
  ))

  loginUser = createEffect(() => this.actions.pipe(
    ofType(loginUserRequest),
    mergeMap(({userData}) => this.usersService.login(userData).pipe(
      map(user => loginUserSuccess({user})),
      tap(() => {
        this.helper.openSnackbar('Login successful');
        void this.router.navigate(['/']);
      }),
      this.helper.catchServerError(loginUserFail)
    ))
  ))

  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutUserRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([action, user]) => {
      if(user) {
        return this.usersService.logout(user.token).pipe(
          map(() => logoutUser())
        )
      }
      return NEVER;
      }))
  )
}
