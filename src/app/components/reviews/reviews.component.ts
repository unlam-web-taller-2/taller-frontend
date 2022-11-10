import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent {

  @Input()
  rate: number = 0;

  @Input()
  centerStars: Boolean = false

  constructor() { }

  rateRounded(): number {
    return Math.round(this.rate)
  }
}
