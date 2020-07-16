import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, PatientService, SpecialistsService } from 'src/app/common/services';
import { Problem, Specialist } from 'src/app/common/models';

@Component({
	selector: 'cabinet-pay-specialist',
	templateUrl: './pay-specialist.component.html',
	styleUrls: ['./pay-specialist.component.scss']
})
export class CabinetPaySpecialistComponent implements OnInit {

    public specialist: Specialist;
    
    constructor(
        private authService: AuthService,
        private patientService: PatientService,
        private specialistsService: SpecialistsService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        
    }

    ngOnInit(): void {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (!logged) {
                    this.router.navigate(['/sign-in']);
                }

                this.route.params
                    .subscribe(params => {
                        if (!params['specialistID']) {
                            return;
                        }

                        this.loadSpecialist(params['specialistID']);
                    });
            });
    }

    private loadSpecialist(specialistID: number) {
        this.specialistsService.getSpecialist(specialistID)
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);

                    return;
                }

                this.specialist = res.data;
            });
    }
}