import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, PatientService, SpecialistsService, UsersWalletsService, PaymentsService, RouterExtService } from 'src/app/common/services';
import { Problem, Specialist, UserWallet, Session } from 'src/app/common/models';
import { PaymentType } from 'src/app/common/enums';

@Component({
    selector: 'cabinet-pay-specialist',
    templateUrl: './pay-specialist.component.html',
    styleUrls: ['./pay-specialist.component.scss']
})
export class CabinetPaySpecialistComponent implements OnInit {

    public problemID: number;

    public specialist: Specialist;
    public activeSession: Session;
    public wallet: UserWallet;

    constructor(
        private authService: AuthService,
        private walletsService: UsersWalletsService,
        private specialistsService: SpecialistsService,
        private patientService: PatientService,
        private paymentsService: PaymentsService,
        private router: Router,
        private route: ActivatedRoute,
        private routerService: RouterExtService
    ) {

    }

    ngOnInit(): void {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (!logged) {
                    this.router.navigate(['/sign-in']);
                }

                this.loadWallet();

                this.route.params
                    .subscribe(params => {
                        if (params['specialistID']) {
                            this.loadSpecialist(params['specialistID']);
                        }

                        if (params['id']) {
                            this.problemID = params['id'];
                            this.loadSession(this.problemID);
                        }
                    });
            });
    }

    prevRoute() {
		this.router.navigate([this.routerService.getPreviousUrl()]);
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

    private loadWallet() {
        this.walletsService.getMyWallet()
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);

                    return;
                }

                this.wallet = res.data;
            });
    }

    private loadSession(problemID: number) {
        this.patientService.getActiveSession(problemID)
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);

                    return;
                }

                this.activeSession = res.data;
            });
    }

    createPayment() {
        this.paymentsService.createPayment({
            sessionID: this.activeSession.id,
            type: PaymentType.Deposit,
            amount: this.amountToDeposit()
        })
        .subscribe(res => {
            if (!res.success) {
                alert(res.message);

                return;
            }

            window.location.href = res.redirectUrl;
        });
    }

    startSession() {
        this.patientService.startSession(this.activeSession.problem.id, this.activeSession.id)
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);

                    return;
                }

                this.router.navigate(['/profile']);
            });
    }

    isBalanceEnough() {
        if ((this.wallet.balance - this.wallet.lockedBalance) < this.specialist.price) {
            return false;
        }

        return true;
    }

    amountToDeposit() {
        return this.specialist.price - (this.wallet.balance - this.wallet.lockedBalance);
    }
}