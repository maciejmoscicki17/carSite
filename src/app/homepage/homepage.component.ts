import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ThemeService } from "../theme.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent {
  title = "carApp";
  isDarkTheme: boolean = this.themeService.isDarkMode();
  private themeChangeSubscription: Subscription;

  constructor(private themeService: ThemeService) {
    this.themeChangeSubscription = themeService.themeChange$.subscribe(
      (isDarkTheme) => {
        this.isDarkTheme = isDarkTheme;
      }
    );
  }
}
