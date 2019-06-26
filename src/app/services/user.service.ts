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
export class UserService {

  constructor(private db: AngularFirestore) {
  }

  findUser(userId:string): Promise<any> {

    return this.db.collection('users').doc(userId).ref.get();

  }

}
