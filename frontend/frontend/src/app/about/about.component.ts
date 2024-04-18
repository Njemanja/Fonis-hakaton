import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(private router: Router) { }

  ngOnInit(){
    var token = localStorage.getItem("token");
    if(token == "null"){
      this.router.navigate(["login"]);    }
  }


  logout(){
    localStorage.setItem("token", null);
  }
}
