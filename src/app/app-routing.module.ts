import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

  const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
      path: 'home',
      loadChildren: () =>
        import('./pages/page.module').then((m) => m.PageModule),
    },
    {
      path: 'auth',
      loadChildren: () =>
        import('./authentication/auth.module').then((m) => m.AuthModule),
    },
    {
      path: 'user',
      loadChildren: () =>
        import('./user/user.module').then((m) => m.UserModule),
      canActivate: [AuthGuard],
    },
    // { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
    // { path: 'not-found', component: NotFoundPageComponent },
  ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
