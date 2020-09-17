import { Component, AfterViewInit } from '@angular/core';
import { UserRole } from 'src/app/common/enums';
import { AuthService, UsersService } from 'src/app/common/services';

@Component({
    selector: 'video-reviews',
    templateUrl: './video-reviews.component.html',
    styleUrls: ['./video-reviews.component.scss']
})
export class VideoReviewsComponent implements AfterViewInit {

    public isSpecialist = false;

    slidesCount: number;
    slides = [];
    currentSlide: number = 0;

    constructor(
    ) {
    }

    ngAfterViewInit() {
        this.slidesCount = document.querySelector(".swiper-wrapper").childElementCount;
        document.querySelector(".swiper-wrapper").childNodes.forEach(item => this.slides.push(item));

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

    setSlide(index: number) {
        this.currentSlide = index;
    }
}
