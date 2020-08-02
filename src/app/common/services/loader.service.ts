import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoaderService {

	public isLoading = new BehaviorSubject(false);
	constructor() { }

	public showLoader() {
		this.isLoading.next(true);
	}

	public hideLoader() {
		/* setTimeout(() => {
			this.isLoading.next(false);
		}, 1000); */
		this.isLoading.next(false);
	}
}