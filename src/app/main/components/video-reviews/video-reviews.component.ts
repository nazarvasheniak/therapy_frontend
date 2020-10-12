import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserRole } from 'src/app/common/enums';
import { ClientVideoReview } from 'src/app/common/models';
import { AuthService, ReviewsService, UsersService } from 'src/app/common/services';

@Component({
    selector: 'video-reviews',
    templateUrl: './video-reviews.component.html',
    styleUrls: ['./video-reviews.component.scss']
})
export class VideoReviewsComponent implements AfterViewInit {

    public isSpecialist = false;

    public reviews: ClientVideoReview[];

    slidesCount: number;
    slides = [];
    currentSlide: number = 0;

    constructor(
        private reviewsService: ReviewsService,
        public _sanitizer: DomSanitizer
    ) { }

    private loadReviews() {
        this.reviewsService.getAllVideoReviews()
            .subscribe(reviews => {
                this.reviews = reviews;

                const wrapper = document.querySelector(".swiper-wrapper");

                if (!wrapper) {
                    return;
                }

                this.slidesCount = wrapper.childElementCount;
                document.querySelector(".swiper-wrapper").childNodes.forEach(item => this.slides.push(item));

                document.querySelector(".swiper-button-prev").addEventListener('click', () => {
                    this.prevSlide();
                });

                document.querySelector(".swiper-button-next").addEventListener('click', () => {
                    this.nextSlide();
                });
            });
    }

    getYouTubeSrcDoc(review: ClientVideoReview) {
        return `<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${review.linkYouTube}?autoplay=1><img src=https://img.youtube.com/vi/u0wJU3lhWoI/hqdefault.jpg><span>▶</span></a>`;
    }

    ngAfterViewInit() {
        this.loadReviews();
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
