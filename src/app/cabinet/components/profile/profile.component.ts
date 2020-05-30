import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, PatientService } from 'src/app/common/services';
import { Problem } from 'src/app/common/models';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public problems: Problem[];
    
    constructor(
        private authService: AuthService,
        private patientService: PatientService,
        private router: Router
    ) {
        
    }

    ngOnInit(): void {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (!logged) {
                    this.router.navigate(['/sign-in']);
                } else {
                    this.loadProblems();
                }
            });
    }

    private loadProblems() {
        this.patientService.getProblems()
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);

                    return;
                }

                this.problems = res.data;
            });
    }
}