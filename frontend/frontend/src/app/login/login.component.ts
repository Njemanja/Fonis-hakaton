import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/users';
import { UserService } from '../services/user.service';






@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string | undefined;
  password: string | undefined;
  message: string | undefined;




  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }
  register() {
    this.router.navigate(['/register']);
  }
  login() {
    if (!this.password || !this.username) {
      this.message = "Input all fields."
    } else {
      this.userService.login(this.username, this.password).subscribe((user: any)=>{
        if(user){
          /*const tokenPayload = { user: user }
          const token = btoa(JSON.stringify(tokenPayload)); */
          localStorage.setItem('token', JSON.stringify(user));
          this.router.navigate(["/homepage"]);
        } else {
          this.message = "Parameters are not valid."
        }
      });
    }
  }

}
