import { Component, OnInit } from '@angular/core';
import { AuthService, NotificationsService, UsersWalletsService } from 'src/app/common/services';
import { UserWallet } from 'src/app/common/models';

@Component({
	selector: 'profile-specialist-sidebar',
	templateUrl: './profile-specialist-sidebar.component.html',
	styleUrls: ['./profile-specialist-sidebar.component.scss']
})
export class ProfileSpecialistSidebarComponent implements OnInit {
    
    public wallet: UserWallet;

    constructor(
        private authService: AuthService,
        private walletService: UsersWalletsService,
        private notificationsService: NotificationsService
    ) { }

    private loadWallet() {
        this.notificationsService.streamMessage
            .subscribe(msg => {
                console.log(msg);
            });

        this.walletService.getMyWallet()
            .subscribe(response => {
                this.wallet = response.data;
            });
    }

    ngOnInit(): void {
        this.loadWallet();
    }

    logout() {
        this.authService.logout().subscribe();
    }
}