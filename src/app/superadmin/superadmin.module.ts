import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CustomersComponent } from './components/customers/customers.component';
import { SuperadminService } from './services';

@NgModule({
    declarations: [
        DashboardComponent,
        SidebarComponent,
        CustomersComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        LayoutModule
    ],
    providers: [
        SuperadminService
    ]
})
export class SuperAdminModule { }