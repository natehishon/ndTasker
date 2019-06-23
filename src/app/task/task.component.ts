import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Task} from '../model/task';
import {SubTask} from '../model/subTask';
import {TasksService} from '../services/tasks.service';
import {finalize} from 'rxjs/operators';


@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  task: Task;

  subTasks: SubTask[];

  lastPageLoaded =  0;

  loading = false;


  displayedColumns = ['seqNo', 'description'];


  constructor(
    private route: ActivatedRoute, private tasksService: TasksService) {


  }

  ngOnInit() {

    this.task = this.route.snapshot.data['task'];

    this.loading = true;

    this.tasksService.findSubTasks(this.task.id)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        subTasks => this.subTasks = subTasks
      );

  }

  loadMore() {

    this.lastPageLoaded++;

    this.tasksService.findSubTasks(this.task.id, 'asc',
      this.lastPageLoaded)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(subTasks => this.subTasks = this.subTasks.concat(subTasks));

  }


}
