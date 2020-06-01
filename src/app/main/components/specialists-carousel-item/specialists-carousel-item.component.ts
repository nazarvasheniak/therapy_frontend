import { Component, AfterViewInit, Input } from "@angular/core";
import { Specialist } from 'src/app/common/models';

@Component({
    selector: 'specialists-carousel-item',
	templateUrl: './specialists-carousel-item.component.html',
	styleUrls: ['./specialists-carousel-item.component.scss']
})
export class SpecialistsCarouselItemComponent implements AfterViewInit {

    @Input('specialist') specialist: Specialist;

    constructor() {

    }

    ngAfterViewInit() {

    }
}
