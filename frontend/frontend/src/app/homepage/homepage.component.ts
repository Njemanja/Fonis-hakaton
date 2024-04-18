import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/users';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(private router: Router) {}
  user: User;
  level: number;

  ngOnInit(){

    var token = localStorage.getItem("token");
      if(token == "null"){
        this.router.navigate(["login"]);   
      } else {
        this.user = JSON.parse(token);
      }
     this.level = Math.floor(this.user.points/5)+1;
  }
  game() {
    this.router.navigate(['../game']);
  }
  quiz() {
    this.router.navigate(['../quiz']);
  }

  connect() {
    this.router.navigate(['../connestions']);
  }
  logout() {
    localStorage.setItem("token", null);
  }
}
