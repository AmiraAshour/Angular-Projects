import { InvestmentService } from './../investment.service';
import { Component,  inject,  computed } from '@angular/core';

@Component({
  selector: 'app-investment-results',
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  private investmentService = inject(InvestmentService);

  annualData =computed(() => this.investmentService.annualData());
}
