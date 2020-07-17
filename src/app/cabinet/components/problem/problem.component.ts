import { Component, Input, OnInit } from '@angular/core';
import { Problem, Session, UserWallet } from 'src/app/common/models';
import { PatientService, UsersWalletsService } from 'src/app/common/services';
import { SessionStatus } from 'src/app/common/enums';
import { Router } from '@angular/router';

@Component({
	selector: 'app-problem',
	templateUrl: './problem.component.html',
	styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

    @Input('problem') public problem: Problem;

    public sessions: Session[];
    public activeSession: Session;
    public lastSession: Session;

    constructor(
        private patientService: PatientService,
        private router: Router
    ) {
        
    }

    ngOnInit() {
        this.loadSessions();
    }

    private loadSessions() {
        this.patientService.getSessions(this.problem.id)
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);

                    return;
                }

                this.sessions = res.data;
                this.activeSession = res.data.find(x => x.status == SessionStatus.Started || x.status == SessionStatus.Waiting);
                
                if (res.data.length && (res.data[0].status == SessionStatus.Success || res.data[0].status == SessionStatus.Refund)) {
                    this.lastSession = res.data[0];
                }
            });
    }

    routeToChooseSpecialist() {
        if (this.activeSession) {
            this.router.navigate([`/profile/problems/${this.problem.id}/choose-specialist`], {
                queryParams: {
                    activeSession: this.activeSession.id
                }
            });

            return;
        }

        this.router.navigate([`/profile/problems/${this.problem.id}/choose-specialist`]);
    }

    routeToPay() {
        this.router.navigate([`/profile/problems/${this.problem.id}/choose-specialist/${this.activeSession.specialist.id}/pay`]);
    }

    closeSession() {
        this.patientService.closeSession(this.problem.id, this.activeSession.id)
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);

                    return;
                }

                this.router.navigate([`profile/problems/${this.problem.id}/sessions/${this.activeSession.id}/review`]);
            });
    }
}