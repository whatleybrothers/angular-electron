import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';

import { UnauthenticatedGuard } from '../../core/guards/unauthenticated.guard';

const routes: Routes = [
    {
        path: '',
        component: AnalyticsComponent,
        canActivate: [UnauthenticatedGuard]
    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
