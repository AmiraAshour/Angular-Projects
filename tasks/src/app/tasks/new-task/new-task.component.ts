import { TasksService } from './../tasks.service';
import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  constructor(private tasksService: TasksService) { }

  onAddTask(title: string, description: string) {
    if (title.trim().length === 0 || description.trim().length === 0) {
      return;
    }
    this.tasksService.addTask({ title, description });
    this.formEl()?.nativeElement.reset();
  }
}
