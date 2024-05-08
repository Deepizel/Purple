import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastyService } from 'ng-toasty';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showPassword = false;
  loading = false;
  loginForm!: FormGroup;

  constructor(private router: Router, private helper: HelperService, private authService: AuthService, private fb: FormBuilder, private notify: ToastyService) {

    this.loginForm = fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  login() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return;
    } else {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          if (response.responseCode === 200) {
            this.loading = false;
            this.authService.setCredentials(response?.data);
            this.notify.success(response.responseMessage, 4000);
          } else {
            this.loading = false;
            Swal.fire({
              title: response.errorMessage,
              text: '',
              icon: "error",
              showCancelButton: false,
              confirmButtonText: "OK",
              cancelButtonText: "No",
              showClass: {
                popup: `
                  animate__animated
                  animate__fadeInDown
                  animate__faster
                `
              },
              hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `
              }
            })
            // this.notify.danger(response.responseMessage, 7000);
          }
        },
        (error) => {
          this.loading = false;
          // Handle HTTP error
          console.error('HTTP error:', error);
          // this.notify.danger(error.error, 4000);
        }
      );
    }

  }

  submitted: boolean = false;
  getErrorMessage(control: string, message: string) {
    return this.helper.getError(this.loginForm.get(control), message);
  }
  isInvalid(control: string) {
    return (
      (this.loginForm.get(control)?.touched && this.loginForm.get(control)?.invalid) ||
      (this.submitted && this.loginForm.get(control)?.invalid)
    );
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


}
