import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-review-score',
	templateUrl: './review-score.component.html',
	styleUrls: ['./review-score.component.scss']
})
export class ReviewScoreComponent {

	@Input() score: number;

	constructor() {

	}

}