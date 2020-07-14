import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, PatientService } from 'src/app/common/services';
import { Problem, Session } from 'src/app/common/models';
import { AssetType } from './asset-type.enum';

@Component({
	selector: 'cabinet-problem-assets',
	templateUrl: './problem-assets.component.html',
	styleUrls: ['./problem-assets.component.scss']
})
export class ProblemAssetsComponent implements OnInit {

    public activeTab = AssetType.Images;

    public problem: Problem;
    public sessions: Session[];
    
    constructor(
        private authService: AuthService,
        private patientService: PatientService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        
    }

    ngOnInit(): void {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (!logged) {
                    this.router.navigate(['/sign-in']);

                    return;
                }

                this.route.params
                    .subscribe(params => {
                        if (!params['id']) {
                            this.router.navigate(['/profile']);

                            return;
                        }

                        this.loadProblem(params['id']);
                    });

                this.route.queryParams
                    .subscribe(params => {
                        if (!params['type']) {
                            this.activeTab = AssetType.Sessions;

                            return;
                        }

                        this.activeTab = AssetType[AssetType[params['type']]];
                    });
            });
    }

    private loadProblem(problemID: number) {
        this.patientService.getProblem(problemID)
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);

                    return;
                }

                this.problem = res.data;
                this.loadSessions();
            });
    }

    private loadSessions() {
        this.patientService.getSessions(this.problem.id)
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);

                    return;
                }

                this.sessions = res.data;
                console.log(this.sessions)
            });
    }

    setActiveTab(tab: AssetType) {
        this.activeTab = tab;
    }

    normalizeMonth(monthStr: string) {
        return monthStr.replace(".", "");
    }
}