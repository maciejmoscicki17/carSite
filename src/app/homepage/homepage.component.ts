import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ThemeService } from "../theme.service";
import { saveAs } from "file-saver";

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

  constructor(private themeService: ThemeService, private http: HttpClient) {
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
    // this.extractBrands();
  }

  extractBrands(): void {
    this.http.get<any>("assets/car-list.json").subscribe((data) => {
      const brands = data.map(
        (car: { brand: string; models: string[] }) => car.brand
      );
      const output = { brands };
      const blob = new Blob([JSON.stringify(output)], {
        type: "application/json",
      });
      const file = new File([blob], "brands.json", {
        type: "application/json",
      });
      saveAs(file);
    });
  }
}
