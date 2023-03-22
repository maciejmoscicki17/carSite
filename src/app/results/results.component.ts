import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { createApi } from "unsplash-js";

interface Make {
  make: string;
  models: string[];
}

class Car {
  make: string;
  model: string;

  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
  }
}

const unsplash = createApi({
  accessKey: "iBb_n-qlKtaoVkqBqLBw7EYokywRWoqPJ4KQqIw1usc",
});

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.css"],
})
export class ResultsComponent implements OnInit {
  make: string | null = null;
  model: string | null = null;
  results: Car[] | null = null;
  res: Array<Car> = [];
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.paramMap.subscribe((params) => {
      this.make = params.get("make");
      this.model = params.get("model");
      if (this.make != null && this.model != null) {
        this.res.push(new Car(this.make, this.model));
      }
      console.log(this.res);
    });
  }

  ngOnInit(): void {
    this.searchForCarPhoto();
  }

  carMake = "Dodge";
  carModel = "Dakota";
  carYear = "1999";
  imageUrl: string = "";
  searchForCarPhoto(): void {
    this.isLoading = true;
    unsplash.search
      .getPhotos({
        query: "toyota supra",
        page: 1,
        perPage: 1,
        orderBy: "relevant",
      })
      .then((result) => {
        if (result.errors) {
          console.error(result.errors[0]);
          this.isLoading = false;
        } else {
          unsplash.photos
            .get({ photoId: result.response.results[0].id })
            .then((result) => {
              this.isLoading = false;
              if (result.errors) {
                console.error(result.errors[0]);
              } else {
                const photo = result.response;
                this.imageUrl = photo.urls.full;
                console.log(photo);
              }
            });
        }
      });
  }

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
