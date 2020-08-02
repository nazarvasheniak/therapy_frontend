import { Component, AfterViewInit, Input } from "@angular/core";
import { Specialist } from 'src/app/common/models';

@Component({
    selector: 'specialists-carousel',
	templateUrl: './specialists-carousel.component.html',
	styleUrls: ['./specialists-carousel.component.scss']
})
export class SpecialistsCarouselComponent implements AfterViewInit {

    @Input('specialists') specialists: Specialist[];

    config = {
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0
    };

    currentSlide = 0;

    constructor() {

    }

    ngAfterViewInit() {
        this.setSliderOffset();

        window.onresize = () => this.setSliderOffset();
    }

    setSliderOffset() {
        let element = document.querySelector("section.specialists .container");
        
        try {
            let style = window.getComputedStyle(element);

            let marginLeft = 0;
            let marginRight = 0;

            if (window.innerWidth > 991) {
                marginLeft = parseFloat(style.marginLeft);
                marginRight = parseFloat(style.marginRight);
            } else {
                marginLeft = parseFloat(style.paddingLeft);
                marginRight = parseFloat(style.paddingRight);
            }
            
            this.config.slidesOffsetBefore = marginLeft;
            this.config.slidesOffsetAfter = marginRight;
        } catch (e) {
            alert(e);
        }
    }

    nextSlide() {
        if (this.currentSlide == (this.specialists.length - 1)) {
            this.currentSlide = 0;

            return;
        }

        this.currentSlide++;
    }

    prevSlide() {
        if (this.currentSlide == 0) {
            this.currentSlide = this.specialists.length - 1;

            return;
        }

        this.currentSlide--;
    }
}
