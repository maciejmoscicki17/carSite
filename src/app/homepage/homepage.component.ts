import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ThemeService } from "../theme.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent implements OnInit {
  title = "carApp";
  isDarkTheme: boolean = this.themeService.isDarkMode();
  private themeChangeSubscription: Subscription;
  isLoading: boolean = true;

  constructor(private themeService: ThemeService) {
    this.themeChangeSubscription = themeService.themeChange$.subscribe(
      (isDarkTheme) => {
        this.isDarkTheme = isDarkTheme;
      }
    );
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
