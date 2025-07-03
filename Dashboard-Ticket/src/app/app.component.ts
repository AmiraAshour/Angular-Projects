import { Component } from '@angular/core';
import { HeaderComponent } from './dashboard/header/header.component';
import { ServerStatusComponent } from './dashboard/server-status/server-status.component';
import { TicketsComponent } from './dashboard/support-tickets/tickets.component';
import { TrafficComponent } from './dashboard/traffic/traffic.component';
import { DashboardItemComponent } from "./dashboard/dashboard-item/dashboard-item.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ServerStatusComponent,
    HeaderComponent,
    TicketsComponent,
    TrafficComponent,
    DashboardItemComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {

}
