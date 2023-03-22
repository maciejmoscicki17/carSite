import { Component, HostListener, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ThemeService } from "../theme.service";

interface Car {
  make: string;
  model: string;
  price: number;
}

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent implements OnInit {
  car: Car;
  currentImageSrc: string;
  isMobile: boolean = false;
  showImageFullscreen: boolean = false;
  themeChangeSubscription: Subscription;
  isDarkTheme: boolean = this.themeService.isDarkMode();

  constructor(private themeService: ThemeService) {
    this.car = { make: "Toyota", model: "Supra", price: 200000 };
    this.currentImageSrc = this.imageSrcs[0];
    this.themeChangeSubscription = themeService.themeChange$.subscribe(
      (isDarkTheme) => {
        this.isDarkTheme = isDarkTheme;
      }
    );
  }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  smallImageClicked(src: string) {
    if (src === this.currentImageSrc) return;
    const element = document.getElementById("bigImage") as HTMLImageElement;
    element.classList.remove("animate__fadeIn");
    element.classList.add("animate__fadeOut");
    const onAnimationEnd = () => {
      element.removeEventListener("animationend", onAnimationEnd);
      element.classList.remove("animate__fadeOut");
      this.currentImageSrc = src;
      element.classList.add("animate__fadeIn");
    };

    element.addEventListener("animationend", onAnimationEnd);
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  showFullScreen() {
    this.showImageFullscreen = true;
    if (this.showImageFullscreen) {
      document.documentElement.style.overflow = "hidden";
    }
  }

  closeFullscreen() {
    this.showImageFullscreen = false;

    document.documentElement.style.overflow = "auto";
  }

  imageSrcs: string[] = [
    "../../assets/img/cars/pagani.jpg",
    "../../assets/img/cars/bugatti.jpg",
    "../../assets/img/cars/ferrari.jpg",
    "../../assets/img/cars/lambo.jpg",
    "../../assets/img/cars/skyline.jpg",
  ];
}
