import { Component, OnInit } from '@angular/core';
import { UsersWalletsService } from 'src/app/common/services';
import { UserWallet } from 'src/app/common/models';

@Component({
	selector: 'profile-sidebar',
	templateUrl: './profile-sidebar.component.html',
	styleUrls: ['./profile-sidebar.component.scss']
})
export class ProfileSidebarComponent implements OnInit {
    
    public wallet: UserWallet;

    constructor(
        private usersWalletsService: UsersWalletsService
    ) {

    }

    ngOnInit(): void {
        this.loadWallet();
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