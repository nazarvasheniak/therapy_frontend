import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { AuthService, SpecialistsService, UsersService } from 'src/app/common/services';
import { Specialist, Review } from 'src/app/common/models';
import { UserRole } from 'src/app/common/enums';

@Component({
	selector: 'app-specialist-card',
	templateUrl: './specialist-card.component.html',
	styleUrls: ['./specialist-card.component.scss']
})
export class SpecialistCardComponent implements OnChanges {

	public isSpecialist = false;

	@Input('specialist') public specialist: Specialist;
	
	@Output() choosed = new EventEmitter<number>();

	public positiveReviews: Review[];
    public neutralReviews: Review[];
	public negativeReviews: Review[];

	constructor(
		private authService: AuthService,
		private usersService: UsersService
	) {
		this.authService.isLoggedIn
			.subscribe(logged => {
				if (logged) {
					this.usersService.getUserInfo()
						.subscribe(user => {
							if (user.role == UserRole.Specialist) {
								this.isSpecialist = true

								return;
							}

							this.isSpecialist = false;
						});
				}
			});
	}

	ngOnChanges() {
		this.loadReviews();
	}

	chooseSpecialist() {
		this.choosed.emit(this.specialist.id);
	}

	private loadReviews() {
        this.positiveReviews = this.specialist.reviews.filter(x => x.score > 3);
        this.neutralReviews = this.specialist.reviews.filter(x => x.score == 3);
        this.negativeReviews = this.specialist.reviews.filter(x => x.score < 3);
    }
}