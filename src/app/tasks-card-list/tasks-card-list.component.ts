import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";
import {Task} from '../model/task';

@Component({
    selector: 'tasks-card-list',
    templateUrl: './tasks-card-list.component.html',
    styleUrls: ['./tasks-card-list.component.css']
})
export class TasksCardListComponent implements OnInit {

    @Input()
    tasks: Task[];

    constructor(private dialog: MatDialog) {
    }

    ngOnInit() {

    }

    editTask(task:Task) {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = task;

        this.dialog.open(TaskDialogComponent, dialogConfig);

    }

}









