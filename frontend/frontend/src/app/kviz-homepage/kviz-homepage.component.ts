import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/users';

@Component({
  selector: 'app-kviz-homepage',
  templateUrl: './kviz-homepage.component.html',
  styleUrls: ['./kviz-homepage.component.css']
})
export class KvizHomepageComponent {
  constructor(private router: Router) { }
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

  quiz(type: number){
    if(type === 1){
      sessionStorage.setItem("question_type", "w");
    }
    else if(type === 2){
      sessionStorage.setItem("question_type", "h");
    }
    else if(type === 3){
      sessionStorage.setItem("question_type", "e");
    }
    this.router.navigate(['/quiz/questions']);
  }
  logout(){
    localStorage.setItem("token", null);
  }
}
