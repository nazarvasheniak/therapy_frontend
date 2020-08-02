import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SignInComponent } from 'src/app/auth/components/sign-in/sign-in.component';

@Injectable({
	providedIn: 'root'
})
export class LoaderService {

	private readonly ignorableComponents = ['SignUpComponent', 'SignInComponent', 'ConfirmationComponent'];

	public isLoading = new BehaviorSubject(false);

	constructor(private route: ActivatedRoute) {
	}

	next(value: boolean) {
		if (this.route.snapshot.firstChild) {
			const componentName = this.route.snapshot.firstChild.component['name'];

			if (this.ignorableComponents.includes(componentName)) {
				console.log('ignorable' + componentName);
				return;
			}
		}
		
		this.isLoading.next(value);
	}
}