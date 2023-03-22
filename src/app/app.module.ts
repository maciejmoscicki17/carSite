import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { SearchComponent } from "./search/search.component";
import { CardsComponent } from "./cards/cards.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { DetailsComponent } from "./details/details.component";
import { ColorToggleDirective } from "./color-toggle.directive";
import { ResultsComponent } from "./results/results.component";
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    CardsComponent,
    HomepageComponent,
    DetailsComponent,
    ColorToggleDirective,
    ResultsComponent,
    SpinnerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
