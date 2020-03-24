import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up.component';

import { AuthenticatedGuard } from '../../core/guards/authenticated.guard';

const routes: Routes = [
    {
        path: '',
        component: SignUpComponent,
        canActivate: [AuthenticatedGuard]
    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SignUpRoutingModule { }
