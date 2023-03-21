import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CardsComponent } from "./cards/cards.component";
import { DetailsComponent } from "./details/details.component";
import { HomepageComponent } from "./homepage/homepage.component";
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
