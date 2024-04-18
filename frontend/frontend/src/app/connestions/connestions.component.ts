import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/users';
import { Connection } from '../models/Connection';

@Component({
  selector: 'app-connestions',
  templateUrl: './connestions.component.html',
  styleUrls: ['./connestions.component.css']
})
export class ConnestionsComponent {

  users: User[] = [];



  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('token') || '{}');
    this.userService.connestion(user.city, user.languages).subscribe((users: User[]) => {
      if (user) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].username == user.username) {
            users.splice(i, 1);
          }
        }
        this.users = users;
        this.userService.allMyConnections(user.username).subscribe((res: Connection[]) => {
          for (let i = 0; i < this.users.length; i++) {
            for (let j = 0; j < res.length; j++) {
              if (this.users[i].username == res[j].users[0] || this.users[i].username == res[j].users[1]) {
                this.users.splice(i, 1);
              }
            }
          }

        });
      }
    });


  }
  connect(username: string) {
    var user = JSON.parse(localStorage.getItem('token') || '{}');
    this.userService.connect(user.username, username).subscribe((res) => {
      alert("Connection request sent!")
      this.router.navigate(['/connections']);
    });
  }

  logout() {
    localStorage.setItem("token", null);
  }
}

