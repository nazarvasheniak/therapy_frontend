import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LandingHeaderComponent } from './components/landing-header/landing-header.component';
import { LandingFooterComponent } from './components/landing-footer/landing-footer.component';
import { ModalComponent } from '../layout/modal/modal.component';
import { WebinarModalComponent } from './components/webinar-modal/webinar-modal.component';
import { SafePipe } from '../common/pipes';
import { MainComponent } from './components/main/main.component';
import { LayoutModule } from '../layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VideoReviewsComponent } from './components/video-reviews/video-reviews.component';

@NgModule({
    declarations: [
        MainComponent,
        LandingComponent,
        LandingHeaderComponent,
        LandingFooterComponent,
        ModalComponent,
        WebinarModalComponent,
        VideoReviewsComponent,
        SafePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        LayoutModule,
        NgbModule
    ],
    providers: [
        
    ]
})
export class MainModule { }