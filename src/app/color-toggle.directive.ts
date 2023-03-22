import { Directive, HostBinding } from "@angular/core";
import { Subscription } from "rxjs";
import { ThemeService } from "./theme.service";

@Directive({
  selector: "[appColorToggle]",
})
export class ColorToggleDirective {
  themeServiceSubscription: Subscription;

  constructor(private themeService: ThemeService) {
    this.themeServiceSubscription = themeService.themeChange$.subscribe(
      (isDarkMode) => {
        console.log("caught");
        isDarkMode ? (this.invert = "invert") : (this.invert = "");
      }
    );
    this.invert = themeService.isDarkMode() ? "invert" : "";
  }

  @HostBinding("class") invert = "";
}
