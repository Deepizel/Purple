import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { HelperService } from 'src/app/service/helper.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  showPassword = false;
  loading = false;
  Form!: FormGroup;

  constructor(
    private router: Router,
    private helper: HelperService,
    private authService: AuthService,
    private fb: FormBuilder,
    private notify: ToastrService
  ) {}
  ngOnInit(): void {
    this.Form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Use Validators.email as an async validator inside an array
      password: ['', Validators.required],
    });
  }

  

register() {
  if (this.Form.valid) {
    this.loading = true;
    this.authService.registerUser(this.Form.value).subscribe(
      (response) => {
        this.loading = false;
        console.log('Registration successful:', response);

        // Success case
        Swal.fire({
          title: 'Success!',
          text: 'Registration successful',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/auth']);
        });
      },
      (error: any) => {
        this.loading = false;
        console.error('Registration error:', error);

        // Error case
        Swal.fire({
          title: 'Error!',
          text: 'Registration failed. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}


  submitted: boolean = false;
  getErrorMessage(control: string, message: string) {
    return this.helper.getError(this.Form.get(control), message);
  }
  isInvalid(control: string) {
    return (
      (this.Form.get(control)?.touched && this.Form.get(control)?.invalid) ||
      (this.submitted && this.Form.get(control)?.invalid)
    );
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
