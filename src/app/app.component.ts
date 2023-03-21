import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ThemeService } from "./theme.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
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
  ngOnInit() {}
  ngOnDestroy() {
    this.themeChangeSubscription.unsubscribe();
  }
}
