import { Component, computed, EventEmitter, input, Input, output, Output } from '@angular/core';
import { User } from './user.model';
import { Card } from "../shared/card/card";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [Card],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class UserComponent {

  user =input.required<User>();
  selected=input.required<boolean>();
  select =output<string>();

imagePath =computed(() => `users/${this.user().avatar}`);

  onSelectUser(): void {
    this.select.emit(this.user().id);
  }
}
