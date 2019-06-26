import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {TasksService} from './services/tasks.service';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  isLoggedOut$:Observable<boolean>;

  user:Observable<any>;

  pictureUrl$: Observable<string>;

  constructor(private afAuth: AngularFireAuth, private userService: UserService) {


  }

  ngOnInit() {

    this.afAuth.authState.subscribe(user => console.log(user));


    this.isLoggedIn$ = this.afAuth.authState.pipe(
      map(user => !!user)
      , tap(whatever => console.log(whatever))
    );

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    this.pictureUrl$ =
      this.afAuth.authState.pipe(map(user => user ? user.photoURL: null));
  }

  logout() {

    this.afAuth.auth.signOut();

  }

}
