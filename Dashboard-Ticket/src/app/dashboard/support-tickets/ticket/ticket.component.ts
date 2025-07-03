import { Component, input, output, signal } from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  date = input.required<Ticket>();
  detailsVisible = signal(true);
  close = output();

  onToggleDetails() {
    this.detailsVisible.update(x => !x);
  }
  onMarkAsCompleted() {
    this.close.emit();
  }
}
