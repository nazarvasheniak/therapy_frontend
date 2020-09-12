import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, ActivationEnd } from '@angular/router';
import { AuthService, NotificationsService, UsersService } from './common/services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'therapy-frontend';

	constructor(
		private notificationsService: NotificationsService,
		private authService: AuthService,
		private usersService: UsersService,
		private router: Router
	) {
		this.authService.isLoggedIn
			.subscribe(logged => {
				if (logged) {
					this.usersService.getUserInfo()
						.subscribe(user => {
							this.notificationsService.openStream(user.id);
						});
				}
			});

		this.router.events.subscribe(event => {
			if (event instanceof ActivationEnd) {
				window.scroll(0, 0);
			}
			
			// filter `NavigationEnd` events
			if (event instanceof NavigationEnd) {

				// set bgClass property with the value of the current route
				if (!event.urlAfterRedirects.includes('sign-in') && !event.urlAfterRedirects.includes('sign-up')) {
					document.documentElement.style.background = "#F0F6F3";
				}
			}
		});
	}
}
