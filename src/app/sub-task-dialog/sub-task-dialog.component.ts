import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Task} from '../model/task';
import {TasksService} from '../services/tasks.service';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {concatMap, last, tap} from 'rxjs/operators';
import {SubTask} from '../model/subTask';


@Component({
  selector: 'sub-task-dialog',
  templateUrl: './sub-task-dialog.component.html',
  styleUrls: ['./sub-task-dialog.component.scss']
})
export class SubTaskDialogComponent implements OnInit {

  form: FormGroup;
  subTask: SubTask;


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) subTask: SubTask,
    private taskService: TasksService,
    private storage: AngularFireStorage) {


    const desc = subTask.description;


    this.form = fb.group({
      description: [desc, Validators.required],
      seqNo: 0
    });

  }

  ngOnInit() {


  }

  save() {

    this.dialogRef.close(this.form.value);


  }

  close() {
    this.dialogRef.close();
  }

}






