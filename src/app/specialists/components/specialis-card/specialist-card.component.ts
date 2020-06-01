import { Component, OnInit, Input } from '@angular/core';
import { SpecialistsService } from 'src/app/common/services';
import { Specialist } from 'src/app/common/models';

@Component({
	selector: 'app-specialist-card',
	templateUrl: './specialist-card.component.html',
	styleUrls: ['./specialist-card.component.scss']
})
export class SpecialistCardComponent implements OnInit {

    @Input('specialist') public specialist: Specialist;

	constructor(
		private specialistsService: SpecialistsService
	) {

	}

	ngOnInit(): void {
        
	}
}