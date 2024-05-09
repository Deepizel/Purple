import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  users: any[] = [];
  currentPage = 1;
  perPage = 6;
  title: string = 'User List';
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers(this.currentPage, this.perPage).subscribe(
      (response: any) => {
        this.users = response.data;
        console.log(this.users); // Assuming API response contains a 'data' array
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  navigateToEdit(userId: number) {
    this.router.navigate(['/user/user', userId]);
  }

  deleteUser(id: any): void {
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
        this.userService.deleteUserById(id).subscribe(
          () => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            this.getUsers();

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
  loadMore() {
    this.currentPage++; // Increment page number to fetch the next page
    this.getUsers();
  }
}