import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpecialistService, AuthService, RouterExtService } from 'src/app/common/services';
import { ClientCard } from 'src/app/common/models';
import { StringHelper } from 'src/app/common/helpers';

@Component({
	selector: 'app-profile-specialist-client',
	templateUrl: './profile-specialist-client.component.html',
	styleUrls: ['./profile-specialist-client.component.scss']
})
export class ProfileSpecialistClientComponent implements OnInit {

    public client: ClientCard;

    constructor(
        private authService: AuthService,
        private specialistService: SpecialistService,
        private router: Router,
        private route: ActivatedRoute,
        private routerService: RouterExtService
    ) {

    }

    prevRoute() {
		this.router.navigate([this.routerService.getPreviousUrl()]);
	}

    private loadClient(clientID: number) {
        this.specialistService.getClient(clientID)
            .subscribe(client => {
                this.client = client;
            });
    }

    ngOnInit(): void {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (!logged) {
                    this.router.navigate(['/']);

                    return;
                }

                this.route.params
                    .subscribe(params => {
                        if (!params['id']) {
                            return;
                        }

                        this.loadClient(params['id']);
                    });
            });
    }

    getPhone() {
		return StringHelper.formatPhone(this.client.user.phoneNumber);
    }
    
    normalizeMonth(monthStr: string) {
        return monthStr.replace(".", "");
    }
}