import { Component, AfterViewInit } from '@angular/core';

@Component({
    selector: 'video-reviews',
    templateUrl: './video-reviews.component.html',
    styleUrls: ['./video-reviews.component.scss']
})
export class VideoReviewsComponent implements AfterViewInit {

    slidesCount: number;
    currentSlide: number = 0;

    constructor() {
        
    }

    ngAfterViewInit() {
        this.slidesCount = document.querySelector(".swiper-wrapper").childElementCount;

        document.querySelector(".swiper-button-prev").addEventListener('click', () => {
            this.prevSlide();
        });

        document.querySelector(".swiper-button-next").addEventListener('click', () => {
            this.nextSlide();
        });
    }

    nextSlide() {
        if (this.currentSlide == (this.slidesCount - 1)) {
            this.currentSlide = 0;

            return;
        }

        this.currentSlide++;
    }

    prevSlide() {
        if (this.currentSlide == 0) {
            this.currentSlide = this.slidesCount - 1;

            return;
        }

        this.currentSlide--;
    }
}
