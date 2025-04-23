import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ResponsiveService } from '../services/responsive.service';
import { ApiTaskServiceService } from '../services/api-task.service';
import { TaskListComponent } from '../task-list/task-list.component';
import { concatMap } from 'rxjs';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-task',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss',
})
export class NewTaskComponent {
  private responsive = inject(ResponsiveService);
  private http = inject(ApiTaskServiceService);
  private list = inject(TaskListComponent);
  hover: boolean = false;
  isDesktop: boolean = this.responsive.isDesktop();
  formGroup = new FormGroup({
    description: new FormControl('', [Validators.required]),
  });

  addTask(): void {
    if (this.formGroup.invalid) {
      return;
    } else {
      this.http
        .addTask(this.formGroup.get('description')?.value)
        .pipe(concatMap(() => this.http.getTasks()))
        .subscribe((uneTask) => (this.list.taskList = uneTask));
    }
  }
}
