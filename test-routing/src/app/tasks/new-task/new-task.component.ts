import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  router = inject(Router)
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submitted = signal(false);
  private tasksService = inject(TasksService);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.submitted.set(true);
    this.router.navigate(['users', this.userId(), 'tasks'], {
      replaceUrl: true
    });
  }
}
export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component) => {
  if (component.submitted())
    return true;
  if (!component.enteredTitle() && !component.enteredSummary() && !component.enteredDate()) {
    return true; // Allow navigation if no data is entered
  }
  return window.confirm('Are you sure you want to leave?');
}
