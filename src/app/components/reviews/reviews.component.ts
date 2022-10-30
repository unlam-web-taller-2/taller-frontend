import { Component, Input } from '@angular/core';
import { Rating } from "../../interfaces/rating";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent {

  @Input()
  rating: Rating = {
    rate: 0,
    count: 0
  }

  @Input()
  centerStars: Boolean = false

  constructor() { }

  redondearPromedio(): number {
    return Math.round(this.rating.rate)
  }
}
