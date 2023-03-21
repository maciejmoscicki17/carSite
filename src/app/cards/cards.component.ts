import { AfterViewInit, Component, HostListener, OnInit } from "@angular/core";

@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.css"],
})
export class CardsComponent implements OnInit, AfterViewInit {
  constructor() {}

  // isLoading: boolean = true;
  isMobile: boolean = false;

  ngOnInit(): void {
    this.checkScreenSize();
  }

  ngAfterViewInit() {
    //spinner simulation
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 2000);
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  items = [
    {
      title: "Step 1",
      description:
        "Browse our inventory and choose a car that fits your needs and budget!",
      background:
        "radial-gradient(circle at 10% 20%, rgb(205, 33, 42) 0%,rgb(236, 95, 5) 90%);",
    },
    {
      title: "Step 2",
      description:
        "Schedule a test drive online or by phone to experience the car firsthand!",
      background:
        "radial-gradient(circle at 10% 20%, rgb(205, 33, 42) 0%,rgb(236, 95, 5) 90%);",
    },
    {
      title: "Step 3",
      description:
        "Apply for financing online or in-person to get approved for a loan!",
      background:
        "radial-gradient(circle at 10% 20%, rgb(205, 33, 42) 0%,rgb(236, 95, 5) 90%);",
    },
    {
      title: "Step 4",
      description:
        "Finalize the purchase and take delivery of your new car with our easy, hassle-free process!",
      background:
        "radial-gradient(circle at 10% 20%, rgb(205, 33, 42) 0%,rgb(236, 95, 5) 90%);",
    },
  ];
}
