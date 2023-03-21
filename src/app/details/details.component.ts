import { Component, HostListener, OnInit } from "@angular/core";

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

  constructor() {
    this.car = { make: "Toyota", model: "Supra", price: 200000 };
    this.currentImageSrc = this.imageSrcs[0];
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
      console.log("end");
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

  imageSrcs: string[] = [
    "../../assets/img/cars/pagani.jpg",
    "../../assets/img/cars/bugatti.jpg",
    "../../assets/img/cars/ferrari.jpg",
    "../../assets/img/cars/lambo.jpg",
    "../../assets/img/cars/skyline.jpg",
  ];
}
