import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-profile-specialist',
	templateUrl: './profile-specialist.component.html',
	styleUrls: ['./profile-specialist.component.scss']
})
export class ProfileSpecialistComponent implements OnInit {
    
    constructor(
        private router: Router
    ) {

    }

    ngOnInit(): void {
        this.router.navigate(['/profile-specialist/articles']);
    }
}