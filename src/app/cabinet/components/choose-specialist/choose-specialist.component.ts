import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, PatientService, SpecialistsService, UsersWalletsService } from 'src/app/common/services';
import { Problem, Specialist, UserWallet } from 'src/app/common/models';
import { SpecialistsSorter } from 'src/app/specialists/components/specialists/specialists-sorter.enum';
import { SortBy } from 'src/app/common/enums';
import { PaginationComponent } from 'src/app/layout/pagination/pagination.component';

@Component({
	selector: 'cabinet-choose-specialist',
	templateUrl: './choose-specialist.component.html',
	styleUrls: ['./choose-specialist.component.scss']
})
export class ChooseSpecialistComponent implements OnInit {
    
    public wallet: UserWallet;
    public specialists: Specialist[];
    public problem: Problem;

    public pageSize = 6;
	public pageNumber = 1;
	public totalPages = 1;

	public sorter: SpecialistsSorter;
	public sortBy: SortBy;

	@ViewChild(PaginationComponent) pagination: PaginationComponent;

    constructor(
        private authService: AuthService,
        private specialistsService: SpecialistsService,
        private usersWalletsService: UsersWalletsService,
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

                this.loadWallet();
                this.loadSpecialists(1, 6);
            });
    }
    
    private loadWallet() {
        this.usersWalletsService.getMyWallet()
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);

                    return;
                }

                this.wallet = res.data;
            });
    }

    chooseSpecialist(specialistID: number) {
        const specialist = this.specialists.find(x => x.id == specialistID);
        
        if (!specialist) {
            return;
        }

        if ((this.wallet.balance - this.wallet.lockedBalance) < specialist.price) {
            this.router.navigate([`/profile/problems/${this.problem.id}/choose-specialist/${specialistID}/pay`])

            return;
        }

        this.patientService.setProblemSpecialist({ specialistID }, this.problem.id)
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);

                    return;
                }

                this.router.navigate(['/profile']);
            })
    }

    private loadProblem(problemID: number) {
        this.patientService.getProblem(problemID)
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);

                    return;
                }

                this.problem = res.data;
            });
    }

    private loadSpecialists(pageNumber: number, pageSize: number) {
		this.specialistsService.getSpecialists({ pageNumber, pageSize })
			.subscribe(res => {
				if (!res.success) {
					alert(res.message);

					return;
				}

				this.pageNumber = res.currentPage;
				this.pageSize = res.pageSize;
				this.totalPages = res.totalPages;

				if (!this.sorter) {
					this.sorter = SpecialistsSorter.Price;
					this.sortBy = SortBy.ASC;

					this.specialists = res.data.sort((a, b) => {
						return a.price - b.price;
					});

					//window.scroll(0,0);

					return;
				}

				this.sortSpecialists(res.data);
			});
    }
    
    private sortSpecialists(specialists: Specialist[]) {
		if (this.sorter == SpecialistsSorter.Price) {
			if (this.sortBy == SortBy.ASC) {
				this.specialists = specialists.sort((a, b) => {
					return a.price - b.price;
				});

				//window.scroll(0,0);

				return;
			}
			
			if (this.sortBy == SortBy.DESC) {
				this.specialists = specialists.sort((a, b) => {
					return b.price - a.price;
				});

				//window.scroll(0,0);

				return;
			}

			return;
		}

		if (this.sorter == SpecialistsSorter.Rating) {
			if (this.sortBy == SortBy.ASC) {
				this.specialists = specialists.sort((a, b) => {
					return a.rating - b.rating;
				});

				//window.scroll(0,0);

				return;
			}
			
			if (this.sortBy == SortBy.DESC) {
				this.specialists = specialists.sort((a, b) => {
					return b.rating - a.rating;
				});

				//window.scroll(0,0);

				return;
			}

			return;
		}

		if (this.sorter == SpecialistsSorter.Reviews) {
			if (this.sortBy == SortBy.ASC) {
				this.specialists = specialists.sort((a, b) => {
					return a.reviews.length - b.reviews.length;
				});

				//window.scroll(0,0);

				return;
			}
			
			if (this.sortBy == SortBy.DESC) {
				this.specialists = specialists.sort((a, b) => {
					return b.reviews.length - a.reviews.length;
				});

				//window.scroll(0,0);

				return;
			}

			return;
		}

		return;
	}

	setPageSize(value: number) {
		this.loadSpecialists(1, Number(value));
	}

	setPageNumber(value: number) {
		window.scroll(0,0);
		this.loadSpecialists(value, this.pageSize);
	}

	setSorter(sorter: SpecialistsSorter) {
		if (sorter == this.sorter) {
			this.toggleSortDirection();

			return;
		}

		this.sorter = sorter;
		this.sortBy = SortBy.ASC;

		this.sortSpecialists(this.specialists);
	}

	toggleSortDirection() {
		if (this.sortBy == SortBy.ASC) {
			this.sortBy = SortBy.DESC;

			this.sortSpecialists(this.specialists);

			return;
		}

		if (this.sortBy == SortBy.DESC) {
			this.sortBy = SortBy.ASC;

			this.sortSpecialists(this.specialists);

			return;
		}

		return;
	}
}