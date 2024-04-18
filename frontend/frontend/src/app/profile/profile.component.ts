import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/users';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private router: Router, private userService: UserService) { }
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

  submitCity() {
    const citySelect = document.getElementById("citySelect") as HTMLSelectElement;
    let selectedCity = citySelect.value;
    this.userService.updateCurrentCity(this.user.username, selectedCity).subscribe((res: any) => {
      if (res) {
        alert("Visiting city updated!");
        this.user.currentCity = selectedCity;
        localStorage.setItem('token', JSON.stringify(this.user));
      }
    });
  }


  logout() {
    localStorage.setItem("token", null);
  }
}
