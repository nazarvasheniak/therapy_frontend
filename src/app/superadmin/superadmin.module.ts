import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CustomersComponent } from './components/customers/customers.component';
import { SuperadminService } from './services';
import { CustomerComponent } from './components/customer/customer.component';
import { CountdownModule } from '../common/modules';
import { SuperadminReviewsComponent } from './components/reviews/reviews.component';
import { SuperadminVideoReviewsComponent } from './components/video-reviews/video-reviews.component';
import { SuperadminVideoReviewsCreateComponent } from './components/video-reviews-create/video-reviews-create.component';

@NgModule({
    declarations: [
        DashboardComponent,
        SidebarComponent,
        CustomersComponent,
        CustomerComponent,
        SuperadminReviewsComponent,
        SuperadminVideoReviewsComponent,
        SuperadminVideoReviewsCreateComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        LayoutModule,
        CountdownModule
    ],
    providers: [
        SuperadminService
    ]
})
export class SuperAdminModule { }