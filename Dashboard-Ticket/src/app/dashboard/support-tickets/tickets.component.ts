import { Component } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket.component";
import { Ticket } from './ticket.model';
import { TicketComponent } from "./ticket/ticket.component";

@Component({
  selector: 'app-support-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  tickets: Ticket[] = [];
  onAdd(ticket: { title: string, request: string }): void {
    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      title: ticket.title,
      request: ticket.request,
      status: 'open'
    };
    this.tickets.push(newTicket);
    console.log('New ticket added:', newTicket);
  }
  onCloseTicket(id: string): void {
    const ticketIndex = this.tickets.findIndex(ticket => ticket.id === id);
    this.tickets[ticketIndex].status = 'closed';
  }
}
