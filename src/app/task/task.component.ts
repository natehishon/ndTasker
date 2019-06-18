import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Task} from '../model/task';
import {SubTask} from '../model/subTask';
import {TasksService} from '../services/tasks.service';


@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  task: Task;

  subTasks: SubTask[];

  displayedColumns = ['seqNo', 'description'];


  constructor(
    private route: ActivatedRoute, private tasksService: TasksService) {


  }

  ngOnInit() {

    this.task = this.route.snapshot.data['task'];

    console.log(this.task.id);

    this.tasksService.findSubTasks(this.task.id)
      .subscribe(
        subTasks => this.subTasks = subTasks
      );

  }

  loadMore() {

  }


}
