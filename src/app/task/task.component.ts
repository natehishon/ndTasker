import {Component, OnInit, HostListener} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Task} from '../model/task';
import {SubTask} from '../model/subTask';
import {TasksService} from '../services/tasks.service';
import {finalize, map, tap} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {TaskDialogComponent} from '../task-dialog/task-dialog.component';
import {SubTaskDialogComponent} from '../sub-task-dialog/sub-task-dialog.component';


@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {



  task: Task;

  subTasks: SubTask[];
  subs: AngularFirestoreCollection<SubTask>;

  lastPageLoaded = 0;

  loading = false;

  isAdmin = false;

  modalActive = false;

  slideConfig = {
    slidesToShow: 1
  };

  displayedColumns = ['seqNo', 'description'];

  user;



  constructor(
    private dialog: MatDialog, private db: AngularFirestore, private route: ActivatedRoute, private tasksService: TasksService, private afAuth: AngularFireAuth, private userService: UserService) {


  }


  ngOnInit() {

    this.task = this.route.snapshot.data['task'];

    this.subs = this.db.collection<SubTask>(`tasks/${this.task.id}/subTasks`);

    this.loading = true;

    this.tasksService.findSubTasks(this.task.id)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        subTasks => this.subTasks = subTasks
      );

    this.afAuth.authState.subscribe(user => {
      this.userService.findUser(user.uid).then(
        user2 => {
          this.user = user2.data();
        }
      )
    });



  }

  loadMore() {

    this.lastPageLoaded++;

    this.tasksService.findSubTasks(this.task.id, 'asc')
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(subTasks => this.subTasks = this.subTasks.concat(subTasks));

  }

  addTask() {



      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      dialogConfig.data = {};

      this.dialog.open(SubTaskDialogComponent, dialogConfig)
        .afterClosed()
        .subscribe(val => {
          if (val) {

            this.subs.add(val).then(whatever => {
              this.tasksService.findSubTasks(this.task.id)
                .pipe(
                  finalize(() => {
                    this.loading = false;
                    console.log("finalize")
                  }),
                  tap(() => {
                    this.windowEventLaunch();
                  })
                )
                .subscribe(
                  subTasks => {
                    this.subTasks = subTasks;

                  }
                );
              return whatever;
            });

          }
        });


  }

  toggleModal() {
    this.modalActive = !this.modalActive;
    window.dispatchEvent(new Event('resize'));
  }

  windowEventLaunch() {
    window.dispatchEvent(new Event('resize'));
  }





}
