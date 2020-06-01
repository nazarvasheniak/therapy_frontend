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

    constructor() {

    }

    ngAfterViewInit() {
        this.setSliderOffset();

        window.onresize = () => this.setSliderOffset();
    }

    setSliderOffset() {
        let element = document.querySelector("section.specialists .container");
        let style = window.getComputedStyle(element);
        let marginLeft = parseFloat(style.marginLeft) + 15;
        let marginRight = parseFloat(style.marginRight) + 15;
        
        this.config.slidesOffsetBefore = marginLeft;
        this.config.slidesOffsetAfter = marginRight;
    }
}
