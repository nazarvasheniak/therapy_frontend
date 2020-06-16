import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

	@Input('theme') public theme: string;

	constructor() {

	}

	scrollTop(): void {
		const element = document.querySelector(".main-banner");
		if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}