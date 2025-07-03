import { Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();
  addTask(taskData: { title: string, description: string }) {
    let newTask: Task = { ...taskData, id: Math.random().toString(), status: 'OPEN' };
    this.tasks.update(tasks => {
      return [...tasks, newTask];
    });
  }
  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update(tasks => {
      return tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      })
    });
  }

}
