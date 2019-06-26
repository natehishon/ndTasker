import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Task} from '../model/task';
import {first, map, tap} from 'rxjs/operators';
import {convertSnaps} from './db-utils';
import {SubTask} from '../model/subTask';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private db: AngularFirestore) {
  }

  loadAllTeams(): Observable<any[]> {
    return this.db.collection('teams',
      ref => ref.orderBy('name'))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<any>(snaps)),
        first()
      );
  }



}
