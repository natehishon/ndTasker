import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Task} from '../model/task';
import {TasksService} from '../services/tasks.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../services/user.service';
import {TaskDialogComponent} from '../task-dialog/task-dialog.component';
import {TeamService} from '../services/team.service';
import {forEach} from '@angular/router/src/utils/collection';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tasks$: Observable<Task[]>;
  beginnerTasks$: Observable<Task[]>;
  accountingTasks$: Observable<Task[]>;
  hrTasks$: Observable<Task[]>;
  teams = [];
  accounting = false;
  hr = false;
  teamsObj = {};
  user;

  @Output()
  tasksEdited = new EventEmitter();

  constructor(private teamsService: TeamService, private tasksService: TasksService, private dialog: MatDialog, private afAuth: AngularFireAuth, private userService: UserService) {

  }

  ngOnInit() {


    this.afAuth.authState.subscribe(user1 => {
      this.userService.findUser(user1.uid).then(
        user2 => {
          this.user = user2.data();
        }
      ).then(() => {
        this.reloadTasks();
      });
    });

  }

  reloadTasks() {
    this.tasks$ = this.tasksService.loadAllTasks();


    if (this.user.teams.includes('ACCOUNTING')) {
      this.accounting = true;
    }

    if (this.user.teams.includes('HR')) {
      this.hr = true;
    }


    this.accountingTasks$ = this.tasks$.pipe(
      map(tasks => tasks.filter(
        task => task.category == 'ACCOUNTING'
      ))
    );

    this.hrTasks$ = this.tasks$.pipe(
      map(tasks => tasks.filter(
        task => task.category == 'HR'
      ))
    );
  }

  newTask() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {};

    this.dialog.open(TaskDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(val => {
        if (val) {

        }
      });
  }


}
