import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CardsComponent } from "./cards/cards.component";
import { DetailsComponent } from "./details/details.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { ResultsComponent } from "./results/results.component";
import { SearchComponent } from "./search/search.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "search",
    component: SearchComponent,
  },
  {
    path: "cards",
    component: CardsComponent,
  },
  {
    path: "home",
    component: HomepageComponent,
  },
  {
    path: "details",
    component: DetailsComponent,
  },
  {
    path: "results",
    component: ResultsComponent,
  },
  {
    path: "results/:make",
    component: ResultsComponent,
  },
  {
    path: "results/:make/:model",
    component: ResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
