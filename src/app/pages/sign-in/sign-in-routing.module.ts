import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in.component';

import { AuthenticatedGuard } from '../../core/guards/authenticated.guard';

const routes: Routes = [
    {
        path: '',
        component: SignInComponent,
        canActivate: [AuthenticatedGuard]
    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SignInRoutingModule { }
