import { Component, Input, OnInit } from '@angular/core';
import { Problem, Session, UserWallet, ProblemImage, ProblemResource } from 'src/app/common/models';
import { PatientService, UsersWalletsService } from 'src/app/common/services';
import { SessionStatus } from 'src/app/common/enums';
import { Router } from '@angular/router';

type AssetTab = "images" | "resources" | "sessions";

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
    public wallet: UserWallet;

    public images: ProblemImage[];
    public resources: ProblemResource[];

    constructor(
        private patientService: PatientService,
        private usersWalletsService: UsersWalletsService,
        private router: Router
    ) {
        
    }

    ngOnInit() {
        this.loadSessions();
        this.loadAssets();
        this.loadWallet();
    }

    private loadWallet() {
        this.usersWalletsService.getMyWallet()
            .subscribe(response => {
                this.wallet = response.data;
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
                this.activeSession = res.data.find(x => !x.isClientClose);
                
                if (res.data.length && (res.data[0].status == SessionStatus.Success || res.data[0].status == SessionStatus.Refund)) {
                    this.lastSession = res.data[res.data.length - 1];
                }
            });
    }

    private loadAssets() {
        this.patientService.getProblemAssets(this.problem.id)
            .subscribe(assets => {
                this.images = assets.images;
                this.resources = assets.resources;
            });
    }

    createNewSession() {
        this.patientService.createProblemSession({ specialistID: this.lastSession.specialist.id }, this.problem.id)
            .subscribe(createSessionResponse => {
                if (!createSessionResponse.success) {
                    alert(createSessionResponse.message);

                    return;
                }

                if ((this.wallet.balance - this.wallet.lockedBalance) < this.lastSession.specialist.price) {
                    this.router.navigate([`/profile/problems/${this.problem.id}/choose-specialist/${this.lastSession.specialist.id}/pay`]);
        
                    return;
                }

                this.patientService.startSession(this.problem.id, createSessionResponse.sessionID)
                    .subscribe(startSessionResponse => {
                        if (!startSessionResponse.success) {
                            alert(startSessionResponse.message);

                            return;
                        }

                        this.router.navigate(['/profile']);
                    });
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

    routeToAssets(tab: AssetTab) {
        if (tab == 'sessions' && !this.sessions.length) {
            return;
        }

        if (tab == 'resources' && !this.resources.length) {
            return;
        }

        if (tab == 'images' && !this.images.length) {
            return;
        }

        this.router.navigate(['/profile/problems', this.problem.id, 'assets'], {
            queryParams: {
                tab: tab
            }
        });
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

    refundSession() {
        this.router.navigate([`profile/problems/${this.problem.id}/sessions/${this.activeSession.id}/refund`]);
    }

    normalizeMonth(monthStr: string) {
        return monthStr.replace(".", "");
    }
}