import {Injectable} from '@angular/core';
import {first, map, tap} from 'rxjs/operators';
import {Task} from '../model/task';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {convertSnaps} from './db-utils';
import OrderByDirection = firebase.firestore.OrderByDirection;
import {SubTask} from '../model/subTask';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private db: AngularFirestore) {
  }


  loadAllTasks(): Observable<Task[]> {
    console.log("loead");
    return this.db.collection('tasks',
      ref => ref.orderBy('description'))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Task>(snaps)),
        first()
      );
  }

  findTaskByUrl(taskUrl: string): Observable<Task> {

    return this.db.collection('tasks', ref => ref.where('url', '==', taskUrl))
      .snapshotChanges()
      .pipe(
        map(snaps => {
          const tasks = convertSnaps<Task>(snaps);
          return tasks.length === 1 ? tasks[0] : undefined;
        }),
        first());
  }


  findSubTasks(taskId:string, sortOrder: OrderByDirection = 'asc'):Observable<SubTask[]> {

    return this.db.collection(`tasks/${taskId}/subTasks`,
      ref => ref.orderBy('seqNo', sortOrder))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<SubTask>(snaps)),
        first(),
        tap(whatever => console.log(whatever))
      );

  }

  saveTask(taskId:string, changes: Partial<Task>): Observable<any> {
    console.log("changes");
    console.log(changes);
    return from (this.db.doc(`tasks/${taskId}`).update(changes));
  }

  newTask(changes: Partial<Task>): Observable<any> {
    return from (this.db.collection('tasks').add(changes));
  }

}
