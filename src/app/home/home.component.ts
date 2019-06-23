import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Task} from '../model/task';
import {TasksService} from '../services/tasks.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tasks$: Observable<Task[]>;
  beginnerTasks$: Observable<Task[]>;
  advancedTasks$: Observable<Task[]>;

  constructor(private tasksService: TasksService) {

  }

  ngOnInit() {
    this.reloadTasks();

  }

  reloadTasks() {
    this.tasks$ = this.tasksService.loadAllTasks();


    this.beginnerTasks$ = this.tasks$.pipe(
      map(tasks => tasks.filter(
        task => task.categories.includes('BEGINNER')
      ))
    );

    this.advancedTasks$ = this.tasks$.pipe(
      map(tasks => tasks.filter(
        task => task.categories.includes('ADVANCED')
      ))
    );
  }


}
