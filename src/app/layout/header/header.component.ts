import { Component } from '@angular/core';
import { AuthService } from 'src/app/common/services';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	
	public isLoggedIn: boolean;
	
    constructor(
		private authService: AuthService
	) {
		this.authService
			.isLoggedIn
			.subscribe(logged => {
				this.isLoggedIn = logged;
			});
    }
}