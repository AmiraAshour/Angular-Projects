import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {  UserComponent } from "./user/user";
import { DUMMY_USERS } from './dummy-users';
import { TasksComponent } from './tasks/tasks';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,HeaderComponent, RouterOutlet, UserComponent,TasksComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  users=DUMMY_USERS;
  selectUserId: string = '';
  get selectUser() {
    return this.users.find(user => user.id === this.selectUserId);
  }
  onSelectUser(id: string) {
    this.selectUserId = id;
  }
}
