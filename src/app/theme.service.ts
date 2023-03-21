import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  constructor() {
    this.isDarkTheme = this.isDarkModeEnabled();
    console.log("ts ctr: " + this.isDarkTheme);
    const theme = this.getThemeFromCookie();
    console.log(theme);
    if (theme) {
      this.setActiveTheme(theme);
    } else {
      this.setActiveTheme(this.isDarkTheme ? "dark" : "light");
    }
  }
  private activeTheme: string = "light-theme";
  private isDarkTheme;
  private themeChangeSubject = new Subject<boolean>();

  themeChange$ = this.themeChangeSubject.asObservable();

  public setActiveTheme(theme: string): void {
    console.log(theme);

    if (theme === "light") {
      document.documentElement.style.setProperty("--accent-color", "#1e1e1e");
      document.documentElement.style.setProperty(
        "--background-color",
        "#ebebe3"
      );
      document.documentElement.style.setProperty("--header-color", "#aab0b6");
    } else {
      document.documentElement.style.setProperty(
        "--background-color",
        "#1e1e1e"
      );
      document.documentElement.style.setProperty("--accent-color", "#ebebe3");
      document.documentElement.style.setProperty("--header-color", "#3b3b3b");
    }

    document.cookie = `theme=${theme};expires=${new Date(
      Date.now() + 31536000000
    ).toUTCString()};path=/`;

    this.activeTheme = theme;

    this.isDarkTheme = this.activeTheme === "dark";
    console.log("themeservice: " + this.activeTheme);
    this.themeChangeSubject.next(this.isDarkTheme);
  }

  public getActiveTheme(): string {
    return this.activeTheme;
  }

  public isDarkMode(): boolean {
    return this.activeTheme === "dark";
  }

  private getThemeFromCookie(): string | null {
    const match = document.cookie.match(/theme=(\w+)/);
    return match ? match[1] : null;
  }

  isDarkModeEnabled() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }
}
