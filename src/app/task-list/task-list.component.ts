import { Component, OnInit, inject } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { task } from '../models/task';
import { NewTaskComponent } from '../new-task/new-task.component';
import { ApiTaskServiceService } from '../services/api-task.service';
import { ApiUserService } from '../services/api-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  private http = inject(ApiTaskServiceService);
  user = inject(ApiUserService);
  router = inject(Router);
  size!: number;

  taskList!: task[];
  ngOnInit(): void {
    this.http.getTasks().subscribe((uneTask) => {
      this.taskList = uneTask;
      this.size = this.taskList.length;
    });
  }
  goLogin() {
    this.router.navigate(['/login']);
  }
}
