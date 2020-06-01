import { Component, OnInit } from '@angular/core';
import { SpecialistsService } from 'src/app/common/services';
import { Specialist } from 'src/app/common/models';

@Component({
	selector: 'app-specialists',
	templateUrl: './specialists.component.html',
	styleUrls: ['./specialists.component.scss']
})
export class SpecialistsComponent implements OnInit {

	public specialists: Specialist[];

	constructor(
		private specialistsService: SpecialistsService
	) {

	}

	ngOnInit(): void {
		this.loadSpecialists();
	}

	private loadSpecialists() {
		this.specialistsService.getSpecialists()
			.subscribe(res => {
				if (!res.success) {
					alert(res.message);

					return;
				}

				this.specialists = res.data;
			})
	}
}