import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, ActivationEnd } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'therapy-frontend';

	constructor(
		private router: Router
	) {
		this.router.events.subscribe(event => {
			
			// filter `NavigationEnd` events
			if (event instanceof NavigationEnd) {

				// set bgClass property with the value of the current route
				if (!event.urlAfterRedirects.includes('sign-in') && !event.urlAfterRedirects.includes('sign-up')) {
					document.body.style.background = "#F0F6F3";
				}
			}
		});
	}

	onActivate(event) {
		//window.scroll(0, 0);
		//or document.body.scrollTop = 0;
		//or document.querySelector('body').scrollTo(0,0);
	}
}
