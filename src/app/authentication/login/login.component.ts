import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { HelperService } from 'src/app/service/helper.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  showPassword = false;
  loading = false;
  loginForm!: FormGroup;
  userLocation: string | null = null;

  constructor(
    private router: Router,
    private helper: HelperService,
    private authService: AuthService,
    private fb: FormBuilder,
    private notify: ToastrService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Use Validators.email as an async validator inside an array
      password: ['', Validators.required],
    });

    // this.getUserLocation();
    
  }

  login() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      Swal.fire({
        title: 'Form Validation Error',
        text: 'Please fill in all required fields correctly.',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK',
        cancelButtonText: 'No',
        showClass: {
          popup: `
          animate__animated
          animate__fadeInDown
          animate__faster
        `,
        },
        hideClass: {
          popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
        },
      });
      return;
    } else {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('Response from server:', response);
          this.authService.setCredentials(response);
          Swal.fire({
            title: 'Login Successful',
            text: response.responseMessage,
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK',
            cancelButtonText: 'No',
            showClass: {
              popup: `
                animate__animated
                animate__fadeInDown
                animate__faster
              `,
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
            },
          });
          this.loading = false;
          this.router.navigate(['/user']);

        },
        (error) => {
          this.loading = false;
          // Handle HTTP error
          console.error('HTTP error:', error);
          this.notify.error(error.error);
        }
      );
    }
  }

  // getUserLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         // Handle successful location retrieval
  //         const latitude = position.coords.latitude;
  //         const longitude = position.coords.longitude;
  //         this.userLocation = `Latitude: ${latitude}, Longitude: ${longitude}`;
  //       },
  //       (error) => {
  //         // Handle location retrieval error
  //         console.error('Error getting location:', error);
  //         this.userLocation = 'Location not available';
  //       }
  //     );
  //   } else {
  //     // Browser doesn't support geolocation
  //     console.error('Geolocation is not supported by this browser.');
  //     this.userLocation = 'Geolocation not supported';
  //   }
  // }

  submitted: boolean = false;
  getErrorMessage(control: string, message: string) {
    return this.helper.getError(this.loginForm.get(control), message);
  }
  isInvalid(control: string) {
    return (
      (this.loginForm.get(control)?.touched &&
        this.loginForm.get(control)?.invalid) ||
      (this.submitted && this.loginForm.get(control)?.invalid)
    );
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
