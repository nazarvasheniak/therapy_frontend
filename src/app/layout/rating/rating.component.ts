import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-rating',
	templateUrl: './rating.component.html',
	styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

    @Input() score: number;
    @Input() single: boolean;

	constructor() {

    }
    
    ngOnInit() {
    }
}