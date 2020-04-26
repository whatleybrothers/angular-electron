import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Required components for which route services to be activated
import { PageNotFoundComponent } from './shared/components';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/sign-in',
        pathMatch: 'full'
    },
    {
        path: 'sign-in',
        loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule)
    },
    {
        path: 'sign-up',
        loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule)
    },
    {
        path: 'verify-email',
        loadChildren: () => import('./pages/verify-email/verify-email.module').then(m => m.VerifyEmailModule)
    },
    {
        path: 'forgot-password',
        loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
    },
    {
        path: 'work-space',
        loadChildren: () => import('./pages/work-space/work-space.module').then(m => m.WorkSpaceModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'diary',
        loadChildren: () => import('./pages/diary/diary.module').then(m => m.DiaryModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
    },
    {
        path: 'analytics',
        loadChildren: () => import('./pages/analytics/analytics.module').then(m => m.AnalyticsModule)
    },
    {
        path: 'schedule',
        loadChildren: () => import('./pages/schedule/schedule.module').then(m => m.ScheduleModule)
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
