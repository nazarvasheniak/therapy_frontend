import { Component } from '@angular/core';
import { AuthService, UsersService } from 'src/app/common/services';
import { User } from 'src/app/common/models';
import { StringHelper } from 'src/app/common/helpers';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	
	public isLoggedIn: boolean;
	public user: User;
	
    constructor(
		private authService: AuthService,
		private usersService: UsersService
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
}