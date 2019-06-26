import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Task} from '../model/task';
import {TasksService} from '../services/tasks.service';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {concatMap, last} from 'rxjs/operators';


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

    console.log("changes");
    console.log(this.form.value);
    if (this.status == 'EDIT') {
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

    const file: File = event.target.files[0];

    const filePath = `tasks/${this.task.id}/${file.name}`;

    const task = this.storage.upload(filePath, file);

    this.uploadPercent$ = task.percentageChanges();

    this.downloadUrl$ = task.snapshotChanges()
      .pipe(
        last(),
        concatMap(() => this.storage.ref(filePath).getDownloadURL())
      );

    const saveUrl$ = this.downloadUrl$
      .pipe(
        concatMap(url => this.taskService.saveTask(this.task.id, {uploadedImageUrl: url}))
      );

    saveUrl$.subscribe("HEY");
    saveUrl$.subscribe(console.log);

  }

  close() {
    this.dialogRef.close();
  }

}






