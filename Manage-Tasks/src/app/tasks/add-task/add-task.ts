import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { newTask } from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css'
})
export class AddTaskComponent {
  @Input({required:true}) userId!: string;
  @Output() close=new EventEmitter();

  enteredTitle: string = '';
  enteredSummary: string = '';
  enteredDate: string = '';

  private tasksService = inject(TasksService);
onCancel() {
  this.close.emit();
}
onSubmit() {
  if (
    this.enteredTitle.trim().length === 0 ||
    this.enteredSummary.trim().length === 0 ||
    this.enteredDate.trim().length === 0
  ) {
    return;
  }
  const newTask = {
    title: this.enteredTitle,
    summary: this.enteredSummary,
    date: this.enteredDate,
  };

  this.tasksService.addTask(newTask, this.userId);
  this.onCancel();

}
}
