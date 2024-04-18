import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [],
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent {
  constructor(private router: Router) { }

  ngOnInit(){
    var token = localStorage.getItem("token");
    if(token == "null"){
      this.router.navigate(["login"]);    }
  }

  game() {
    this.router.navigate(['../game']);
  }
  kviz() {
    this.router.navigate(['../quiz']);
  }

  logout(){
    localStorage.setItem("token", null);
  }

}
