import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, PatientService } from 'src/app/common/services';
import { Problem } from 'src/app/common/models';

@Component({
	selector: 'cabinet-deposit',
	templateUrl: './deposit.component.html',
	styleUrls: ['./deposit.component.scss']
})
export class CabinetDepositComponent implements OnInit {

    
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
                }

                
            });
    }
}