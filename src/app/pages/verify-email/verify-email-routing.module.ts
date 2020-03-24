import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VerifyEmailComponent } from './verify-email.component';

import { AuthenticatedGuard } from '../../core/guards/authenticated.guard';

const routes: Routes = [
    {
        path: '',
        component: VerifyEmailComponent,
        canActivate: [AuthenticatedGuard]
    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VerifyEmailRoutingModule { }
