import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/users';
import { Connection } from '../models/Connection';

@Component({
  selector: 'app-my-connections',
  templateUrl: './my-connections.component.html',
  styleUrls: ['./my-connections.component.css']
})
export class MyConnectionsComponent {
  users: Connection[] = [];

  sliderValue: number = 1;


  constructor(private userService: UserService, private router: Router) { }
  ratee: number = 0;
  index: number = 0;
  items: { [key: string]: number }[] = [];
  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('token') || '{}');
    this.userService.allMyConnections(user.username).subscribe((users: Connection[]) => {
      this.users = users;
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].users[0] == user.username) {
          this.users[i].button = 0;
        } else {
          this.users[i].button = 1;
        }
        this.users[i].users = this.users[i].users.filter((user1: string) => user1 != user.username);
        this.items.push({ [this.users[i].users[0]]: 0 });
        this.myRate(this.users[i].users[0])


        // alert(this.items[0][this.users[i].users[0]]);
      }
    });


  }

  connect(username: string) {
    var user = JSON.parse(localStorage.getItem('token') || '{}');
    this.userService.connect(user.username, username).subscribe((res) => {

    });
  }

  logout() {
    localStorage.setItem("token", null);
  }

  rate(r, username) {
    var user = JSON.parse(localStorage.getItem('token') || '{}');
    this.userService.rate(username, user.username, r).subscribe((res) => {
      alert("You have rated this user!");
    });
  }

  myRate(username) {
    this.userService.myRate(username).subscribe((res: any) => {
      const targetItem = this.items.find(item => Object.keys(item)[0] === username);
      targetItem[username] = (res.rate / res.count) ? (res.rate / res.count) : 0;
    });
  }

}
