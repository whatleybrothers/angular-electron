import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

import { UnauthenticatedGuard } from '../../core/guards/unauthenticated.guard';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [UnauthenticatedGuard]
    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
