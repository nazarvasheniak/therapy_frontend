import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services';

@Component({
	selector: 'profile-specialist-sidebar',
	templateUrl: './profile-specialist-sidebar.component.html',
	styleUrls: ['./profile-specialist-sidebar.component.scss']
})
export class ProfileSpecialistSidebarComponent implements OnInit {
    
    constructor(
        private authService: AuthService
    ) { }

    ngOnInit(): void {

    }

    logout() {
        this.authService.logout().subscribe();
    }
}