import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

	constructor() {

	}

	scrollTop(): void {
		const element = document.querySelector(".main-banner");
		if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}