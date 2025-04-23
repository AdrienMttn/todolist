import { Injectable, inject } from '@angular/core';
import { task } from '../models/task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiTaskServiceService {
  private http = inject(HttpClient);
  readonly url = 'https://todolist.x10.mx/api/task/';

  getTasks() {
    return this.http.get<task[]>(`${this.url}getTask.php`, {
      withCredentials: true,
    });
  }

  addTask(description: string | null | undefined) {
    return this.http.post(
      `${this.url}addTask.php`,
      {
        description: description,
        Date: new Date(),
      },
      { withCredentials: true }
    );
  }

  rmTask(id: number) {
    return this.http.post(`${this.url}rmTask.php`, { taskId: id });
  }

  editTask(id: number, description: string) {
    return this.http.post(`${this.url}editTask.php`, {
      desc: description,
      taskId: id,
    });
  }

  checkTask(check: number, id: number) {
    return this.http.post(`${this.url}checkTask.php`, {
      check: check,
      taskId: id,
    });
  }

  importantTask(important: number, id: number) {
    return this.http.post(`${this.url}importantTask.php`, {
      important: important,
      taskId: id,
    });
  }
}
