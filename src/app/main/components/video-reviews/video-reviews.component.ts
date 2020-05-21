import { Component, AfterViewInit } from '@angular/core';
import { SwiperDirective } from 'ngx-swiper-wrapper';

@Component({
    selector: 'video-reviews',
    templateUrl: './video-reviews.component.html',
    styleUrls: ['./video-reviews.component.scss']
})
export class VideoReviewsComponent {

    currentSlide = 0;

    constructor() {
    }
}
