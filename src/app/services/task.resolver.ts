


import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from 'rxjs';
import {Task} from '../model/task';
import {TasksService} from './tasks.service';



@Injectable()
export class TaskResolver implements Resolve<Task> {

    constructor(private tasksService:TasksService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task> {
        const taskUrl = route.paramMap.get('taskUrl');

        return this.tasksService.findTaskByUrl(taskUrl);
    }

}

