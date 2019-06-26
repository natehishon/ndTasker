import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {TaskDialogComponent} from '../task-dialog/task-dialog.component';
import {Task} from '../model/task';
import {map, tap} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'tasks-card-list',
  templateUrl: './tasks-card-list.component.html',
  styleUrls: ['./tasks-card-list.component.scss']
})
export class TasksCardListComponent implements OnInit {

  @Input()
  tasks: Task[];

  @Output()
  tasksEdited = new EventEmitter();

  user;

  constructor(private dialog: MatDialog, private afAuth: AngularFireAuth, private userService: UserService) {
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user1 => {
      this.userService.findUser(user1.uid).then(
        user2 => {
          console.log(user2.data());
          this.user = user2.data();
        }
      );
    });

  }

  editTask(task: Task) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = task;

    this.dialog.open(TaskDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(val => {
        if (val) {
          console.log(val);
          this.tasksEdited.emit();
        }
      });
  }

}









