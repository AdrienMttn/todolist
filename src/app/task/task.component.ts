import { Component, inject, Input, OnInit } from '@angular/core';
import { task } from '../models/task';
import { DatePipe, NgClass } from '@angular/common';
import { ResponsiveService } from '../services/responsive.service';
import { ApiTaskServiceService } from '../services/api-task.service';
import { concatMap } from 'rxjs';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-task',
  imports: [NgClass, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  private responsive = inject(ResponsiveService);
  private http = inject(ApiTaskServiceService);
  private list = inject(TaskListComponent);

  @Input() uneTask!: task;
  trashHover!: boolean;
  checkHover!: boolean;
  isDesktop: boolean = this.responsive.isDesktop();

  ngOnInit(): void {
    this.trashHover = false;
    this.checkHover = false;
  }

  setCheck() {
    if (Number(this.uneTask.check) === 0) {
      this.http
        .checkTask(1, this.uneTask.id)
        .pipe(concatMap(() => this.http.getTasks()))
        .subscribe((uneTask) => (this.list.taskList = uneTask));
    } else {
      this.http
        .checkTask(0, this.uneTask.id)
        .pipe(concatMap(() => this.http.getTasks()))
        .subscribe((uneTask) => (this.list.taskList = uneTask));
    }
  }

  setImportant() {
    if (Number(this.uneTask.important) === 0) {
      this.http
        .importantTask(1, this.uneTask.id)
        .pipe(concatMap(() => this.http.getTasks()))
        .subscribe((uneTask) => (this.list.taskList = uneTask));
    } else {
      this.http
        .importantTask(0, this.uneTask.id)
        .pipe(concatMap(() => this.http.getTasks()))
        .subscribe((uneTask) => (this.list.taskList = uneTask));
    }
  }

  deleteTask(id: number) {
    this.http
      .rmTask(id)
      .pipe(concatMap(() => this.http.getTasks()))
      .subscribe((uneTask) => (this.list.taskList = uneTask));
  }
  editTask(id: number, description: string) {
    this.http
      .editTask(id, description)
      .pipe(concatMap(() => this.http.getTasks()))
      .subscribe((uneTask) => (this.list.taskList = uneTask));
  }
}
