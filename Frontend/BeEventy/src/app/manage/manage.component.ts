import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  toggleActive(user: any): void {
    if (user.activeAccount) {
      this.userService.deactivateAccount(user.id).subscribe(() => {
        user.activeAccount = false;
      });
    } else {
      this.userService.activateAccount(user.id).subscribe(() => {
        user.activeAccount = true;
      });
    }
  }

  changePermission(user: any, accountType: number): void {
    this.userService.grantPermission(user.id, accountType).subscribe(() => {
      user.accountType = accountType;
    });
  }
}
