import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $: any;

@Component({
    selector: 'webinar-modal',
    templateUrl: './webinar-modal.component.html',
    styleUrls: ['./webinar-modal.component.scss']
})
export class WebinarModalComponent implements OnInit {

    @ViewChild("name") name: ElementRef;
    @ViewChild("email") email: ElementRef;
    @ViewChild("phone") phone: ElementRef;

    public webinarForm: FormGroup;

    constructor() { }

    ngOnInit(): void {
        this.initWebinarForm()
    }

    private initWebinarForm(): void {
        this.webinarForm = new FormGroup({
            name: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required]),
            phone: new FormControl(null, [Validators.required]),
            personalData: new FormControl(false)
        });

        $("#phone").mask("+7 (999) 999-99-99");
    }

    close() {
        let webinarModal = document.getElementById('webinar-modal')
        webinarModal.classList.remove('show')
        webinarModal.classList.add('hidden');
    }

    submitWebinarForm(form: FormGroup) {

    }

    labelClick(inputName: string) {
        this[inputName].nativeElement.focus();
    }

    inputEvent(name: string, event) {
        this.webinarForm.controls[name].setValue(event.target.value);
    }

    toggleWebinarFormCheckbox() {
        this.webinarForm.controls['personalData'].setValue(!this.webinarForm.value['personalData']);
    }
}