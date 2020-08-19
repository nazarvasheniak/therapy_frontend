import { Component } from '@angular/core';
import { UsersService, AuthService, SpecialistService } from 'src/app/common/services';
import { User, Specialist } from 'src/app/common/models';
import { UserRole } from 'src/app/common/enums';
import { StringHelper } from 'src/app/common/helpers';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

	public user: User;
	public specialist: Specialist;

	constructor(
		private authService: AuthService,
		private usersService: UsersService,
		private specialistService: SpecialistService
	) {
		this.authService.isLoggedIn
			.subscribe(logged => {
				if (logged) {
					this.loadUserInfo();
				}
			});
	}

	private loadUserInfo() {
		this.usersService.getUserInfo()
			.subscribe(user => {
				if (user.role == UserRole.Specialist) {
					this.loadSpecialistInfo();
				}

				this.user = user;
			});
	}

	private loadSpecialistInfo() {
		this.specialistService.getSpecialistInfo()
			.subscribe(specialist => this.specialist = specialist.data);
	}

	scrollTop(): void {
		const element = document.querySelector("header");
		if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	getAvatar() {
		return StringHelper.getFirstLetter(this.user.lastName);
	}
}