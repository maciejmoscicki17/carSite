import { Component, HostListener, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ThemeService } from "../theme.service";

@Component({
  selector: "app-header",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.css"],
})
export class HeaderComponent implements OnDestroy {
  isMobile: boolean = false;
  showMenu: boolean = false;
  showMenuIcon: boolean = false;
  showMenuFlag: boolean = false;
  isDarkTheme: boolean = this.themeService.isDarkMode();
  private themeChangeSubscription: Subscription;

  constructor(private themeService: ThemeService) {
    this.themeChangeSubscription = this.themeService.themeChange$.subscribe(
      (isDarkTheme) => {
        console.log(isDarkTheme);
        this.isDarkTheme = isDarkTheme;
      }
    );
    this.checkScreenWidth();
  }

  toggleTheme() {
    let theme =
      this.themeService.getActiveTheme() === "dark" ? "light" : "dark";
    this.themeService.setActiveTheme(theme);
  }

  ngOnDestroy() {
    this.themeChangeSubscription.unsubscribe();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: Event) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.isMobile = window.innerWidth < 768;
  }

  openMenu() {
    if (this.showMenuFlag) {
      return;
    } else {
      this.showMenuFlag = true;
      setTimeout(() => {
        this.showMenuFlag = false;
      }, 1000);
    }
    this.showMenuIcon = !this.showMenuIcon;
    if (this.showMenu) {
      this.animateCSS("fullscreenDiv", "fadeOut");
    } else {
      this.showMenu = true;
    }
    //this.showMenu = !this.showMenu;
  }

  closeMenu() {
    this.showMenu = false;
  }

  disableScroll(event: Event) {
    event.preventDefault();
    console.log("caught");
  }

  animateCSS(element: string, animation: string, prefix = "animate__") {
    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      const node = document.getElementById(element) as HTMLElement;

      node.classList.add(`${prefix}animated`, animationName);

      // When the animation ends, we clean the classes and resolve the Promise
      const handleAnimationEnd = (event: Event) => {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve("Animation ended");
        this.showMenu = false;
      };

      node.addEventListener("animationend", handleAnimationEnd, { once: true });
    });
  }
}
