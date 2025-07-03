import { Component, input } from '@angular/core';
import {  TaskComponent } from "./task/task";
import { AddTaskComponent } from "./add-task/add-task";
import { newTask } from './task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, AddTaskComponent],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class TasksComponent {
  name =input.required<string>();
  userId =input.required<string>();
  isAddingTask=false;

constructor( private taskeService:TasksService) {}

  get selectedUserTasks (){
    return this.taskeService.getUserTasks(this.userId());
  }
  onStartAddingTask() {
    this.isAddingTask = true;
  }

  onCloseAddingTask() {
    this.isAddingTask = false;
  }
}


