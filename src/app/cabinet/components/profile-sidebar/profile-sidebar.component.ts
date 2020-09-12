import { Component, OnInit } from '@angular/core';
import { UsersWalletsService, AuthService, NotificationsService } from 'src/app/common/services';
import { UserWallet } from 'src/app/common/models';

@Component({
	selector: 'profile-sidebar',
	templateUrl: './profile-sidebar.component.html',
	styleUrls: ['./profile-sidebar.component.scss']
})
export class ProfileSidebarComponent implements OnInit {
    
    public wallet: UserWallet;

    constructor(
        private authService: AuthService,
        private usersWalletsService: UsersWalletsService,
        private notificationsService: NotificationsService
    ) {

    }

    ngOnInit(): void {
        this.loadWallet();

        this.notificationsService.streamMessage
            .subscribe(msg => {
                console.log(msg);
            });
    }

    logout() {
        this.authService.logout().subscribe();
    }

    private loadWallet() {
        this.usersWalletsService.getMyWallet()
            .subscribe(res => {
                if (!res.success) {
                    alert('load wallet error');

                    return;
                }

                this.wallet = res.data;
            });
    }
}