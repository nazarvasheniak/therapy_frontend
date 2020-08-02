import { Component } from '@angular/core';
import { RouterExtService } from './common/services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'therapy-frontend';

	constructor(private routerService: RouterExtService) {
	}

	onActivate(event) {
		window.scroll(0,0);
		//or document.body.scrollTop = 0;
		//or document.querySelector('body').scrollTo(0,0)
	}
}
