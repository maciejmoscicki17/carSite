import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ThemeService } from "../theme.service";

interface Make {
  make: string;
  models: string[];
}

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit, OnDestroy {
  selectedMake?: Make;
  selectedModel?: string;

  isDarkTheme: boolean = this.themeService.getActiveTheme() === "dark";
  private themeChangeSubscription: Subscription;

  constructor(private themeService: ThemeService, private router: Router) {
    this.themeChangeSubscription = this.themeService.themeChange$.subscribe(
      (isDarkTheme) => {
        this.isDarkTheme = isDarkTheme;
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.themeChangeSubscription.unsubscribe();
  }

  btnClick(nr: number) {
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].clicked = nr === i + 1;
    }
  }

  public onMakeChange(event: Event) {
    const selectedIndex = (event.target as HTMLSelectElement).value;
    if (selectedIndex !== "-1") {
      this.selectedMake = this.cars[+selectedIndex];
    } else {
      this.selectedMake = undefined;
    }

    let modelSelect = document.getElementById(
      "modelSelect"
    ) as HTMLSelectElement;

    modelSelect.disabled = selectedIndex === "-1";
  }

  onModelChange(event: Event) {
    const selectedIndex = (event.target as HTMLSelectElement).value;
    if (selectedIndex !== "-1" && this.selectedMake !== undefined) {
      this.selectedModel = this.selectedMake.models[+selectedIndex];
    } else {
      this.selectedMake = undefined;
    }
  }

  showResults(): void {
    if (this.selectedMake !== undefined && this.selectedModel !== undefined) {
      this.router.navigate([
        "results",
        this.selectedMake.make,
        this.selectedModel,
      ]);
    }
  }

  buttons = [
    {
      number: 1,
      imageSrc: "../assets/icons/normal-car.svg",
      clicked: false,
      description: "Osobowe",
    },
    {
      number: 2,
      imageSrc: "../assets/icons/truck.svg",
      clicked: true,
      description: "Dostawcze",
    },
    {
      number: 3,
      imageSrc: "../assets/icons/moto.svg",
      clicked: false,
      description: "Motocykle",
    },
    {
      number: 4,
      imageSrc: "../assets/icons/other.svg",
      clicked: false,
      description: "Pozostałe",
    },
  ];

  cars: Make[] = [
    {
      make: "Toyota",
      models: ["Camry", "Corolla", "Rav4", "Highlander"],
    },
    {
      make: "Honda",
      models: ["Accord", "Civic", "CR-V", "Pilot"],
    },
    {
      make: "Ford",
      models: ["F-150", "Escape", "Explorer", "Mustang"],
    },
  ];
}
