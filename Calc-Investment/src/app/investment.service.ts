import { Injectable, signal } from "@angular/core";
import { AnnualData, UserInput } from "./user-Intput.model";

@Injectable({ providedIn: 'root'})
export class InvestmentService {

  annualData=signal<AnnualData[]|undefined>(undefined);

  calculateInvestmentResults(data:UserInput) {
    const { initialInvestment, annualInvestment, expectedReturn, duration }= data;
    console.log('Calculating investment results with data:', data);
    let investmentValue = initialInvestment;
    let result : AnnualData[] = [];
    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      result.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
    this.annualData.set(result);
  }
}
