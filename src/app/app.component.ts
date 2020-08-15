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
		private route: ActivatedRoute,
		private router: Router
	) {
		console.log(this.route)

		this.router.events.subscribe(event => {
			if (event instanceof ActivationEnd) {
				window.scroll(0, 0);
			}
			
			// filter `NavigationEnd` events
			if (event instanceof NavigationEnd) {

				// get current route without leading slash `/`
				const eventUrl = /(?<=\/).+/.exec(event.urlAfterRedirects);
				const currentRoute = (eventUrl || []).join('');
				
				// set bgClass property with the value of the current route
				if (!currentRoute.includes('/sign-in') && !currentRoute.includes('/sign-up')) {
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
