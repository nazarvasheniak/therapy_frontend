import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-auth-confirmation',
	templateUrl: './confirmation.component.html',
	styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

    @ViewChild("digit1") digit1: ElementRef;
    @ViewChild("digit2") digit2: ElementRef;
    @ViewChild("digit3") digit3: ElementRef;
    @ViewChild("digit4") digit4: ElementRef;

    constructor() {}

    ngOnInit(): void {

    }

    public nextDigit(event, currentDigit: number) {
        switch (currentDigit) {
            case 1:
                if (!event.target.value) {
                    this.digit1.nativeElement.focus();
                    break;
                } else {
                    this.digit2.nativeElement.focus();
                    break;
                }
            
            case 2:
                if (!event.target.value) {
                    this.digit1.nativeElement.focus();
                    break;
                } else {
                    this.digit3.nativeElement.focus();
                    break;
                }

            case 3:
                if (!event.target.value) {
                    this.digit2.nativeElement.focus();
                    break;
                } else {
                    this.digit4.nativeElement.focus();
                    break;
                }

            case 4:
                if (!event.target.value) {
                    this.digit3.nativeElement.focus();
                    break;
                }
        }
    }
}