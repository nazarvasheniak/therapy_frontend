import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { ModalComponent } from '../layout/modal/modal.component';
import { WebinarModalComponent } from './components/webinar-modal/webinar-modal.component';
import { SafePipe } from '../common/pipes';

@NgModule({
    declarations: [
        MainComponent,
        HeaderComponent,
        FooterComponent,
        ModalComponent,
        WebinarModalComponent,
        SafePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    providers: [
        
    ]
})
export class MainModule { }