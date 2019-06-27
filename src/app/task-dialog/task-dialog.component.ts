import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Task} from '../model/task';
import {TasksService} from '../services/tasks.service';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {concatMap, last, tap} from 'rxjs/operators';


@Component({
  selector: 'task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {

  form: FormGroup;
  task: Task;
  uploadPercent$: Observable<number>;
  downloadUrl$: Observable<string>;
  status;
  tempUrl: string;
  category = [
    {
      name: 'Accounting',
      value: 'ACCOUNTING'
    },
    {
      name: 'HR',
      value: 'HR'
    }
    ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) task: Task,
    private taskService: TasksService,
    private storage: AngularFireStorage) {

    this.task = task;

    const desc = task.description;
    const long = task.longDescription;
    const cate = task.category;
    const upload = task.uploadedImageUrl;
    const url = task.url;


    if (!this.task.id) {
      this.status = 'NEW';
    } else {
      this.status = 'EDIT';
    }

    this.form = fb.group({
      description: [desc, Validators.required],
      longDescription: [long, Validators.required],
      category: [cate, Validators.required],
      uploadedImageUrl: [upload, Validators.required],
      url: [url, Validators.required]
    });

  }

  ngOnInit() {


  }

  save() {

    this.form.value.uploadedImageUrl = this.task.uploadedImageUrl;

    console.log("changes");
    console.log(this.form.value);
    if (this.status == 'EDIT') {
      console.log("EDIT");
      console.log(this.form.value);
      this.taskService.saveTask(this.task.id, this.form.value)
        .subscribe(
          () => this.dialogRef.close(this.form.value)
        );

      this.dialogRef.close(this.form.value);
    } else {
      this.taskService.newTask(this.form.value)
        .subscribe(
          () => this.dialogRef.close(this.form.value)
        );

      this.dialogRef.close(this.form.value);
    }


  }

  uploadFile(event) {

    console.log("running");

    const file: File = event.target.files[0];

    const filePath = `tasks/${this.task.id}/${file.name}`;

    const task = this.storage.upload(filePath, file);

    this.uploadPercent$ = task.percentageChanges();

    this.downloadUrl$ = task.snapshotChanges()
      .pipe(
        last(),
        concatMap(() => this.storage.ref(filePath).getDownloadURL())
        ,tap(whatever => {this.task.uploadedImageUrl = whatever})
      );

    const saveUrl$ = this.downloadUrl$
      .pipe(
        last(),
        concatMap(url => {
          console.log("url")
          console.log(url)
          this.tempUrl = url
        }))


  }

  close() {
    this.dialogRef.close();
  }

}






