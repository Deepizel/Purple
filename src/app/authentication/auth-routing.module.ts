import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full' // Add pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent, data: { title: 'Login' }
  },
  {
    path: 'admin-login', component: AdminLoginComponent, data: { title: 'Admin Login' }
  },
  {
    path: 'forget-password', component: ForgetPasswordComponent, data: { title: 'Forget Password' }
  },
  {
    path: 'reset-password', component: ResetPasswordComponent, data: { title: 'Reset Password' }
  },
  {
    path: 'change-password/:userId/:token', component: ChangePasswordComponent, data: { title: 'Change Password' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
