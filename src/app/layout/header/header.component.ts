import { Component } from '@angular/core';
import { AuthService, UsersService } from 'src/app/common/services';
import { User } from 'src/app/common/models';
import { StringHelper } from 'src/app/common/helpers';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	
	public isLoggedIn: boolean;
	public user: User;

	public isMobileNavExpanden = false;
	
    constructor(
		private authService: AuthService,
		private usersService: UsersService,
		private router: Router
	) {
		this.authService
			.isLoggedIn
			.subscribe(logged => {
				this.isLoggedIn = logged;

				if (logged) {
					this.loadUserInfo();
				}
			});
	}
	
	private loadUserInfo() {
		this.usersService
			.getUserInfo()
			.subscribe(user => {
				this.user = user;
			});
	}

	getAvatar() {
		return StringHelper.getFirstLetter(this.user.lastName);
	}

	getPhone() {
		return StringHelper.formatPhone(this.user.phoneNumber);
	}

	isCabinetRoute() {
		if (this.router.url.includes('profile')) {
			return true;
		}

		return false;
	}

	toggleMobileNav() {
		this.isMobileNavExpanden = !this.isMobileNavExpanden;
	}

	scrollToElement(elementID: string) {
        const element = document.querySelector(elementID);
		if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}