import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule,
} from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserListComponent } from './user/user-list/user-list.component';




@NgModule({
  declarations: [AppComponent, UserListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastNoAnimationModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
