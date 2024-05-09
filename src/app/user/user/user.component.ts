import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  userId: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
      console.log('Userid', this.userId);
      this.getUserDetails(this.userId);
    });

    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  getUserDetails(userId: any): void {
    this.userService.getUserById(userId).subscribe(
      (res: any) => {
        console.log(res);
        this.form.patchValue({
          id: res.data.id || '', // Assuming itbId is a string
          first_name: res.data.first_name || '',
          last_name: res.data.last_name || '',
          email: res.data.email || '',
        });
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
  goBack() {
    this.router.navigate(['/user/users']);
  }
  updateUser() {
    if (this.form.valid) {
      // Assuming this is triggered by a form submission or button click
      const userId = 123; // Replace with the actual user ID
      const userData = this.form.value;
      this.userService.updateUser(userId, userData).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          Swal.fire({
            icon: 'success',
            title: 'User Updated',
            text: 'User information has been updated successfully.',
          });
          // return to previous page
        },
        (error) => {
          console.error('Error updating user:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update user information.',
          });
          // Handle error, show error message, etc.
        }
      );
    }
  }

  deleteUser(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUserById(this.userId).subscribe(
          () => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');

            // i should perform any other actions after successful deletion like routing later
          },
          (error: any) => {
            Swal.fire('Error!', 'Failed to delete user.', 'error');
            console.error('Error deleting user:', error);
            // show error message... what to do next now hmmm?
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'User deletion has been cancelled.', 'info');
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      // Process form submission (e.g., update user details)
    }
  }
}
