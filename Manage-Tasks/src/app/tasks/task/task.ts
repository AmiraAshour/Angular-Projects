import { Component, inject, Input, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { task } from '../task.model';
import { Card } from "../../shared/card/card";
import { TasksService } from '../tasks.service';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [Card ,CommonModule],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class TaskComponent {

  task=input.required<task>();

  private tasksService = inject(TasksService);
  onCopleteTask(){
    this.tasksService.deleteTask(this.task().id);
  }
}
