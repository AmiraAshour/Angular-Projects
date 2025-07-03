import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { UserInputComponent } from "./user-input/user-input.component";
import { InvestmentResultsComponent } from "./investment-results/investment-results.component";
import { HeaderComponent } from "./header/header.component";
import { FormsModule } from "@angular/forms";
import { UserInputModule } from "./user-input/user-input.module";

@NgModule({
  declarations: [AppComponent, InvestmentResultsComponent, HeaderComponent],
  imports: [BrowserModule ,UserInputModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
